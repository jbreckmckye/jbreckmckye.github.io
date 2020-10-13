---
title: 'TypeScript: accessing members of a union type'
date: 2020-10-13 23:43:28
tags: [javascript, typescript]
---

If you write TypeScript day to day you probably use unions quite a bit. But have you ever found yourself writing a type and wanting to access the _members_ of a union, be that one passed in as a type parameter, or defined elsewhere?

It's not something that comes up a lot, but every so often it's sorely missed. Like when you want two function parameters to follow the same 'branch' of a union.

Well, there's a neat 'trick' involving conditional types that makes this easy.

<!-- more -->

## The problem

Let's set up an example usecase to show what I mean. It's a contrived example but should serve to make the concepts clear.

Imagine we have a type representing different events.

```typescript
type Events =
  | { kind: 'loading', data: void }
  | { kind: 'error', data: Error }
  | { kind: 'success', data: string }
```

(If you didn't know, this pattern - a union of structs with a discriminating string key - is called 'discriminated unions'. In the Haskell world we call them 'tagged unions')

And imagine we have a function that sends events

```typescript
function sendEvent (kind: string, data: any) {
  someBus.send(kind, data);
}
```

But we want to type the `sendEvent` function better so that

- the "kind" is a correct event kind
- the "data" is the *right* data for the *kind* of event

Of course, in reality the simplest solution would just be to take an `event` of type `Events`, which would force the caller to pass a consistently formatted object. For the sake of example, though, let's say this is our preferred design for `sendEvent`.

## Our first attempt

Typing the kind string is easy

```typescript
function sendEvent (kind: Events['kind'], data: any) {}
```

What about data? Well, I could type it the same way as my `kind`

```typescript
function sendEvent (kind: Events['kind'], data: Events['data']) {}
```

But now I have a problem! My `kind` and my `data` can mismatch:

```typescript
sendEvent('error', 'a string, not an Error'); // no type errors!
```

This is no good. What we want is to ensure that both `kind` and `data` use the same 'branch' of the union.

## An idea

So here's the trick. What I need to do is create a type mapping that uses a type condition. Any type condition will do, even a check to `extends any`:

```typescript
type NarrowByKind <Kind, Items extends { kind: string }> = Items extends any
    ? Items['kind'] extends Kind
      ? Items
      : never
    : never;
```

This lets us pick an item out of a collection of discriminated unions using `kind` as the discriminant. This is the first step. 

The way this works is that `Items extends any ? ... : ...` makes TS consider each member of the union "individually" inside the conditional type. Then, when we check whether the `kind` matches and return `Items`, we're only returning the "individual" item.

For all other conditions, we return `never`. This makes `NarrowByKind` return a union itself, of `Item | never`, which gets normalised down to just `Item`.

### Why does TypeScript do this?

The TS docs call this behaviour [distributive conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types), but the explanation is a little obscure:

```
Conditional types in which the checked type is a naked type parameter are called distributive conditional types.
Distributive conditional types are automatically distributed over union types during instantiation. For example,
an instantiation of T extends U ? X : Y with the type argument A | B | C for T is resolved as
(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y).
```

This is one of those explanations, I think, where the terminology makes absolutely no sense until you have it explained some other way, at which point it suddenly appears obvious.

A better way to understand might be to imagine if this behaviour *didn't* work - imagine if a union wasn't "split up" when we compared it to another type with `extends ... ? ...`.

Take this example. What should `Foo` be?

```typescript
type SomePrimitives = boolean | string | number;

type IsNumeric<T> = T extends number ? 'yep' : 'nope';

type Foo = IsNumeric<SomePrimitives>
```

If we compare whether the union `(boolean | string | number)` extends `number`, the answer is false, meaning `Foo = 'nope`. However, if we could 'map' the comparison over members of the union instead, like mapping a function over an array, we'd get the much more intuitive (and I'd say, useful) result `('nope' | 'nope' | 'yep')`.

To do that, though, we need to 'distribute' the conditional type 'over' the union. We only do that when the union is a 'naked' type parameter, i.e. not wrapped in a more complex construct like an `Array` or a `Promise`.

### Applying the science

Now we know the 'trick', let's create a type helper for our events.

```typescript
type EventData <Kind, Event extends { data: any } =
  NarrowByKind<Kind, Events>> = Event['data']
```

Which we can supply to our function:

```typescript
function sendEvent <K extends Events['kind'], D extends EventData<K>> (
  kind: K, data: D
) {
  someBus.send(kind, data);
}
```

This leads to the following type checks, all demonstrating what we'd expect:

```typescript
// Check that success -> payload == string
sendEvent('success', 'yeah'); // ✅

// Check that success -> payload != boolean
sendEvent('success', false); // ❌ Argument of type 'boolean' is not assignable to parameter of type 'string'.

// Check that error -> payload == Error
sendEvent('error', new Error('this is fine')); // ✅

// Check that error -> payload != number
sendEvent('error', -Infinity); // ❌ Argument of type 'number' is not assignable to parameter of type 'Error'.

// Check that loading -> payload != string
sendEvent('loading', 'unwanted'); // ❌ Argument of type 'string' is not assignable to parameter of type 'void'.

// Check that event names are still checked OK
sendEvent('succ3ss', false); // ❌ Argument of type '"succ3ss"' is not assignable to parameter of type '"loading" | "error" | "success"'.
```

Easy!
