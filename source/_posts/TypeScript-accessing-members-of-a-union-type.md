---
title: 'TypeScript: accessing members of a union type'
date: 2020-10-13 23:43:28
tags: [javascript, typescript]
---

If you write TypeScript day to day you probably use unions quite a bit. But have you ever found yourself writing a type
and wanting to access the _members_ of a union, be that one passed in as a type parameter, or defined elsewhere?

It's not something that comes up a lot, but every so often it's sorely missed. Like when you want two function parameters
to follow the same 'branch' of a union.

Well, there's a neat 'trick' involving conditional types that makes this easy.

<!-- more -->

### The problem

Let's set up an example usecase to show what I mean. It's a contrived example but should serve to make the concepts clear.

Imagine we have a type representing different events.

```typescript
type Events =
  | { kind: 'loading', data: void }
  | { kind: 'error', data: Error }
  | { kind: 'success', data: string }
```

(If you didn't know, this pattern - a union of structs with a discriminating string key - is called 'discriminated unions'.
In the Haskell world we call them 'tagged unions')

And imagine we have a function that sends events

```typescript
function sendEvent (kind: string, data: any) {
  someBus.send(kind, data);
}
```

But we want to type the `sendEvent` function better so that

- the "kind" is a correct event kind
- the "data" is the *right* data for the *kind* of event

Of course, in reality the simplest solution would just be to take an `event` of type `Events`, which would force the
caller to pass a consistently formatted object. For the sake of example, though, let's say this is our preferred design
for `sendEvent`.

### Our first attempt

Typing the kind string is easy

```typescript
function sendEvent (kind: Events['kind'], data: any) {}
```

What about data? Well, I could type it the same way as my `kind`

```typescript
function sendEvent (kind: Events['kind'], data: Events['data']) {}
```

But now I have a problem: my `kind` and my `data` can mismatch:

```typescript
sendEvent('error', 'a string, not an Error'); // no type errors!
```

### An idea

Well. What I need to do is create a type mapping that uses a type condition. Any type condition will do.

```typescript
type NarrowByKind <Kind, Items extends { kind: string }> = Items extends any
    ? Items['kind'] extends Kind
      ? Items
      : never
    : never;
```

This lets us pick an item out of a collection of discriminated unions using `kind` as the discriminant. This is the first
step. 

The way it works is that `Items extends any ? ... : ...` makes TS consider each member of the union individually in the
branches of the type condition. Then, when we check whether the `kind` matches and return `Items`, we're only returning
the individual item.

For all other conditions, we return `never`. This makes `NarrowByKind` return a union itself of `Item | never`,
which gets normalised down to just `Item`.

Why does TS 'decompose' the union in *this specific instance*? Well, think about it. If it didn't, a construct like this

```typescript
type SomePrimitives = boolean | string | number;

type IsNumeric<T> = T extends number ? 'yep' : 'nope';

type Foo = IsNumeric<SomePrimitives>
```

...would result in `Foo` equalling `'nope'` instead of the union `'nope' | 'nope' | 'yep'`. It would mean we were asking
if a whole union `extends` something, which is usually going to be false, as unions are heterogenous.

Decomposing the union allows conditional types to be a lot more useful.

### Applying the science

Now let's create a type helper for our events.

```typescript
type EventData <Kind, Event extends { data: any } = NarrowByKind<Kind, Events>> = Event['data']
```

Which we can supply to our function:

```typescript
function sendEvent <K extends Events['kind'], D extends EventData<K>> (kind: K, data: D) {
  someBus.send(kind, data);
}
```

Which leads to the following type checks:

```typescript
sendEvent('success', 'yeah'); // ✅

sendEvent('success', false); // ❌ Argument of type 'boolean' is not assignable to parameter of type 'string'.

sendEvent('error', new Error('this is fine')); // ✅

sendEvent('error', -Infinity); // ❌ Argument of type 'number' is not assignable to parameter of type 'Error'.

sendEvent('loading', 'unwanted'); // ❌ Argument of type 'string' is not assignable to parameter of type 'void'.

sendEvent('succ3ss', false); // ❌ Argument of type '"succ3ss"' is not assignable to parameter of type '"loading" | "error" | "success"'.
```

Simple!
