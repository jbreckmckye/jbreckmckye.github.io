---
layout: post
title: "The JavaScript Single Var Style Is an Antipattern"
date: 2017-01-28 12:00:00 +0100
comments: true
tags: [javascript]
---

I _hate_ the single var style in JavaScript. For the sake of clarity, I’m talking about this:

{% codeblock %}
    var alpha = 1,
        beta = 2,
        gamma = 3;
{% endcodeblock %}

It’s awkward to write, annoying to debug, misleading to read, and utterly unnecessary in 2017. Allow me to explain why.
<!--more-->

As a declaration grows, it becomes ambiguous
--------------------------------------------

Here’s a slice of code. What does it signify?

{% codeblock %}
        peter: payPeter().toRob('paul'),
        simon: says(new Sayer()),
        alice: coop(3).r
    },
    alpha = new Beta(config),
    callback = new Maybe(fn).lift(iterable),
    self = this
    resolver = onError => {
        try {
            callback(self);
        } catch (e) {
             onError(e);
        }
    },
    bonus = {
{% endcodeblock %}

Well, _you_ know it’s a set of variables, because you know that’s what I’m writing about today. It’s not exactly obvious otherwise, though. At a glance, am I looking at variables or the fields of an object? In very large files it’s tough to say. And are these declared with `var`, `let` or `const`? This difference matters in ES6.

This style can also bury errors – the code above will leak global variables because I missed out a comma before the `resolver`. Subtle bugs are evil bugs.

Most debuggers can’t step over the individual declarations
----------------------------------------------------------

Most debuggers will treat code like `var x = a, y = b, ... = z;` as a single line, and won’t allow the developer to step over each individual assignment. This behaviour has changed in Chrome recently, but many other devtools environments will still treat the var operation as a single step.

Variables are declared out of context
-------------------------------------

One nice thing about free vars is that we can create them at the exact moment they are needed:

{% codeblock %}
    for (let i = 0; i < y; i++) {...}
{% endcodeblock %}

This makes them a little easier to name. It also makes it easy to delete variables as soon as they’re no longer needed – otherwise unused variables inevitably find their way through refactoring, hiding in the middle of a huge var statement at the top of the file.

It’s awkward to format
----------------------

Especially when using `const`. Do we indent successive vars using a single tab (easy to type, but looks ugly), or do we manually align each var with spaces?

{% codeblock %}
    const a = 12,
        b = 13,
        c = 14;
{% endcodeblock %}

And if we align the symbols, what happens when we mix `const` and `let`?

{% codeblock %}
    const a = 12,
          b = 13;
    let c = 14;
{% endcodeblock %}

However you format it, the whitespace remains ragged and inconsistent. And these aesthetics matter, because ugly code is a distraction that harms readability.

Changes add noise to pull requests
----------------------------------

Every time I add a variable to a function, I have to chop and change the position of a semicolon. PRs look more noisy than they need to be:

{% codeblock %}
    >>>
      y = 25;
    ===
      y = 25,
      z = 26;
    <<<
{% endcodeblock %}

It sounds trivial, but in large organizations where the PRs come thick, fast, and very often span several files, it’s noise and content that gets in the way of quickly and efficiently greenlighting changes.

It’s just not necessary any more
--------------------------------

The single-var rule was popularised by Douglas Crockford, who believed it was necessary to protect developers from the curious scoping behaviour of `var`. In most C-like languages variables are block scoped, but in JavaScript they are scoped to the function.

For instance, in the following loop, the iterator `i` exists and can be read outside the loop. This often surprises a developer coming from another language:

{% codeblock %}
    for (var i = 0; i < 10; i++) {}
    console.log(i); // prints 10!
{% endcodeblock %}

That wouldn’t work in C++, for instance:

{% codeblock %}
    #include <iostream>

    int main()
    {
      for(int i=0; i<10; ++i) {}
      std::cout << i;
    }

    // COMPILE ERROR
    // In function 'int main()':
    // 7:16: error: 'i' was not declared in this scope
{% endcodeblock %}

Because a C++ developer might assume JavaScript developers are block scoped too, putting all the vars at the top of the function seemed like a pragmatic way to ensure such a programmer would never ‘misread’ the scope and longevity of a var.

And that’s great. But we don’t live in the 90s any more. I wish we did – the music was better and in the UK you could actually buy houses – but the world has changed. Grunge is over. Side partings are no longer cool. Your beloved tamogochi is probably buried in the [Great Garbage Patch of the Pacific Ocean](https://www.theguardian.com/environment/2016/oct/04/great-pacific-garbage-patch-ocean-plastic-trash). Most importantly, though, we now have ES6 and its `let` and `const` keywords, both of which have ‘block scoping’ (like C) as opposed to the ‘function scoping’ of `var`:

{% codeblock %}
    for (let i = 0; i < 10; ++i) {};
    console.log(i); // ReferenceError: i is not defined
{% endcodeblock %}

The single var rule is an anachronism. It is a vestigial limb of JavaScript evolution. It was a plausibly useful style in the days of Yahoo! Answers and Internet Explorer 7, but has since been fossilized into ‘best practices’ that, like most dogma, usually have a historical seed of truth but are rarely revised as the world changes around them.

So put the single var style to _rest_, friend, and type the extra keywords. It might look odd if you’re not used to it, but I guarantee that within a week you’ll never understood how you ever wrote otherwise.