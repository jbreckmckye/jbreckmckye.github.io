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

We want to type the `sendEvent` function better so that

- the "kind" is a correct event kind
- the "data" is the *right* data for the *kind* of event

Of course, in reality the simplest solution would just be to take an `event` of type `Events`, which would force the caller to pass a consistently formatted object. But let's ignore that for the sake of our example.

## Our first attempt

Typing the `kind` string is easy

```typescript
function sendEvent (kind: Events['kind'], data: any) {}
```

What about `data`? Well, I could type it the same way as `kind`

```typescript
function sendEvent (kind: Events['kind'], data: Events['data']) {}
```

But now I have a problem. My `kind` and my `data` can mismatch:

```typescript
sendEvent('error', 'a string, not an Error'); // no type errors!
```

This is no good! What we want is to ensure that both `kind` and `data` use the same 'branch' of the `Events` union, i.e. refer to the same event.

## An idea

So here's the trick. What I need to do is create a type mapping that uses a conditional type - i.e. `Foo extends Bar ? Baz : Bam`

Any type condition will do, even a check to `extends any`:

```typescript
type NarrowByKind <Kind, Items extends { kind: string }> = Items extends any
    ? Items['kind'] extends Kind
      ? Items
      : never
    : never;
```

This lets us pick an item out of a collection of discriminated unions using `kind` as the discriminant. If I `NarrowByKind('success')` I get the struct `{ kind: 'success', data: string }`. This is our first step. 

The way this works is that `Items extends any ? ... : ...` makes TS consider each member of `Items` union "individually". Then, when we check whether the `kind` matches and return `Items`, we're only returning that "individual" item.

For all other conditions, we return `never`. This makes `NarrowByKind` return a union itself, of `Item | never | never`, which gets normalised down to just `Item`.

### Why does TypeScript do this?

The TS docs call this behaviour [distributive conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types), and it's described thusly. You'll be forgiving for struggling with the explanation though.

```
Conditional types in which the checked type is a naked type parameter are called distributive conditional types.
Distributive conditional types are automatically distributed over union types during instantiation. For example,
an instantiation of T extends U ? X : Y with the type argument A | B | C for T is resolved as
(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y).
```

This is quite a dense description and involves some less-than-obvious terminology. A better way to understand might be to imagine if the behaviour *didn't* work - imagine if a union wasn't "split up" inside a conditional type.

Take this example. What should `Foo` be?

```typescript
type SomePrimitives = boolean | string | number;

type IsNumeric<T> = T extends number ? 'yep' : 'nope';

type Foo = IsNumeric<SomePrimitives>
```

If we compare whether the whole union `(boolean | string | number)` extends `number`, then the answer is false, meaning `Foo = 'nope`. A comparison like this will almost always be false, because unions are heterogenous (that's the point of them), so they'll rarely reliably `extend` *anything*.

However, what if we could 'map' the comparison over members of the union instead, like mapping a function over an array? Then we'd get a much more intuitive (and I'd say, useful) result `('nope' | 'nope' | 'yep')`.

To do that, though, we need to 'distribute' the conditional type 'over' the union. And we only want to do that when the union is a 'naked' type parameter, i.e. not wrapped in a more complex construct like an `Array` or a `Promise`. Now the TS docs make a little more sense.

### Applying the science

Knowing the 'trick', we can now create a type helper for our events.

```typescript
type EventData <Kind, Event extends { data: any } =
  NarrowByKind<Kind, Events>> = Event['data']
```

Let's supply this to our `sendEvent` function:

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

Easy! Now when someone asks you if you know `TypeScript distributive conditional types` , you can answer with confidence: I do!
