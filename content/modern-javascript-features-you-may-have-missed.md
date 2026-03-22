---
title: Modern JavaScript features you may have missed
date: 2019-10-26 12:17:23
tags: ["JavaScript", "software engineering"]
---

Despite writing JavaScript almost every working day for the past seven years, I have to admit I don't actually pay that much attention to ES language announcements. Major features like `async/await` and `Proxies` are one thing, but every year there's a steady stream of small, incremental improvements that go under the radar for me, as there's always something bigger to learn.

So in this post, I've collected some modern JS features that didn't get much airtime when they first came out. Some of these are just quality of life improvements, but others are genuinely handy and can save whole swathes of code. Here are a few you might have missed:

<!-- more -->

## ES2015

### Binary and octal literals

Binary manipulation isn't something one has to do very often in JavaScript, but every so often a problem rolls around that just can't be feasibly solved otherwise. You might be writing high perf code for lower power devices, squeezing bits into local storage, doing pixel RGB manipulation in the browser, or having to work on tightly packed binary data formats.

This can mean lots of work masking / merging binary numbers, which I've always felt is needlessly obscured  in decimal. Well, ES6 added a binary literal number format just for this purpose: `0b`

```javascript
const binaryZero = 0b0;
const binaryOne  = 0b1;
const binary255  = 0b11111111;
const binaryLong = 0b111101011101101;
```

This makes binary flags really easy:

```javascript
// Pizza toppings
const olives    = 0b0001;
const ham       = 0b0010;
const pineapple = 0b0100;
const artechoke = 0b1000;

const pizza_ham_pineapple = pineapple | ham;
const pizza_four_seasons  = olives | ham | artechoke;
```

Likewise for octal numbers. These are a bit niche in the JS world, but they're quite common in networking and certain file formats. You can now write an octal with the syntax `0o` .



### Number.isNaN()

Not to be confused with `window.isNaN()`, this is a new method with much more intuitive behaviour.

You see, the classic `isNaN` has some interesting quirks:

```javascript
isNaN(NaN)              === true
isNaN(null)             === false
isNaN(undefined)        === true
isNaN({})               === true
isNaN('0/0')            === true
isNaN('hello')          === true
```

What gives? Bar the first, none of those parameters are actually `NaN`. The problem, as usual, is everyone's "favourite" JavaScript feature: type coercion. Arguments to `window.isNaN` are coerced to numbers via the `Number` function.

Well, the new `Number.isNaN()` static method solves all that. It returns, definitively, once and for all, the equality of the argument you give it and `NaN`. It is utterly unambiguous:

```javascript
Number.isNaN(NaN)       === true
Number.isNaN(null)      === false
Number.isNaN(undefined) === false
Number.isNaN({})        === false
Number.isNaN('0/0')     === false
Number.isNaN('hello')   === false
```

_Signature:_ `Number.isNaN : (value: any) => boolean`



## ES2016

### Exponent (power) operator

This crops up now and again, so it's nice to have a literal syntax for powers:

```javascript
2**2 === 4
3**2 === 9
3**3 === 27
```

(It's weird because I was *convinced* JavaScript already had this - I may have been thinking of Python)



### Array.prototype.includes()

This one was a little hard to miss, but if you've been spending the last three years writing `array.indexOf(x) !== -1`, rejoice in the new `includes` method:

```javascript
[1, 2, 3].includes(2)    === true
[1, 2, 3].includes(true) === false
```

`includes` uses the [Same Value Zero Algorithm](https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero), which is almost identical to the strict equality (`===`) check, except that it can handle `NaN` values. Like an equality check it will compare objects by reference rather than contents:

```javascript
const object1 = {};
const object2 = {};

const array = [object1, 78, NaN];

array.includes(object1) === true
array.includes(object2) === false
array.includes(NaN)     === true
```

`includes` can take a second parameter, `fromIndex`, which lets you provide an offset:

```javascript
// positions   0  1  2  3  4
const array = [1, 1, 1, 2, 2];

array.includes(1, 2) === true
array.includes(1, 3) === false
```

Handy.

_Signature:_ `Array.prototype.includes : (match: any, offset?: Int) => boolean`



## ES2017

### Shared Array Buffers & Atomics

This is a great pair of features that may prove invaluable if you're doing a lot of work with web workers. They allow you to directly share memory between processes, and set up locks to avoid race conditions.

They're both quite major features with fairly complex APIs, so there isn't space to give them an overview here, but take a look at this [Sitepen article](https://www.sitepen.com/blog/the-return-of-sharedarraybuffers-and-atomics/) to learn more. Browser support is still spotty but should hopefully improve over the next couple of years.



## ES2018

### Regex bonanza

ES2018 introduced a whole flurry of regular expression features:

#### Lookbehind matches (match on previous chars)

In runtimes that support it, you can now write a regex that looks for characters _before_ your match. For example, to find all numbers prepended by a dollar:

```javascript
const regex = /(?<=\$)\d+/;
const text  = 'This cost $400';
text.match(regex) === ['400']
```

The key is the new lookbehind group, evil twin to lookahead groups:

```
Look ahead:  (?=abc)
Look behind: (?<=abc)

Look ahead negative:  (?!abc)
Look behind negative: (?<!abc)
```

Unfortunately there isn't presently any way to transpile the new lookbehind syntax for older browsers, so you may be stuck to just using this on Node for the time being.

#### You can name capture groups

A really powerful feature of regex is the ability to pick out sub-matches and use them to do some simple parsing. But until recently we could only refer to sub-matches by number, e.g.

```javascript
const getNameParts  = /(\w+)\s+(\w+)/g;
const name          = "Weyland Smithers";
const subMatches    = getNameParts.exec(name);

subMatches[1]     === 'Weyland'
subMatches[2]     === 'Smithers'
```

But there's now a syntax to assign these sub-matches (or capture groups) names, by putting `?<title>` at the beginning of the parens for each group you want to name:

```javascript
const getNameParts  = /(?<first>\w+)\s(?<last>\w+)/g;
const name          = "Weyland Smithers";
const subMatches    = getNameParts.exec(name);

const {first, last} = subMatches.groups
first             === 'Weyland'
last              === 'Smithers'
```

Unfortunately this is Chrome- and Node-only for the moment.

#### Dots can now match newlines

You just have to provide the `/s` flag, e.g. `/someRegex./s`, `/anotherRegex./sg`.



## ES2019

### Array.prototype.flat() & flatMap()

I was so pleased to see these on MDN.

`flat()`, very simply, flattens a multi-dimensional array by a specified maximum `depth`:

```javascript
const multiDimensional = [
	[1, 2, 3],
    [4, 5, 6],
    [7,[8,9]]
];

multiDimensional.flat(2) === [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

`flatMap` is essentially a `map` followed by a `flat` of depth 1. It's handy when a mapping function returns an array but you don't want the result to be a nested data structure:

```javascript
const texts = ["Hello,", "today I", "will", "use FlatMap"];

// with a plain map
const mapped = texts.map(text => text.split(' '));
mapped === ['Hello', ['today', 'I'], 'will', ['use', 'FlatMap']];

// with flatmap
const flatMapped = texts.flatMap(text => text.split(' '));
flatMapped === ['Hello', 'today', 'I', 'will', 'use', 'FlatMap'];
```



### Unbound catches

You can now write try/catch statements without binding the thrown error:

```javascript
try {
  // something throws
} catch {
  // don't have to do catch(e)
}
```

Incidentally, catches where you don't care about the value of `e` are sometimes termed _Pokémon exception handling_. 'Cos you gotta catch 'em all!



### String trim methods

Pretty minor but a nicety:

```javascript
const padded         = '          Hello world   ';
padded.trimStart() === 'Hello world   ';
padded.trimEnd()   === '          Hello world';
```



## Next time...

If you liked this post, [let me know](https://twitter.com/jbreckmckye) and I might find the time to write up something similar for TypeScript!