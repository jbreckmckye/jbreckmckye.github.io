---
layout: post
title: "JavaScript curry"
date: 2014-05-11 16:52:21 +0100
comments: true
tags: [front-end, javascript, functional programming, patterns]
---

If you've had much exposure to functional programming, you might have heard of 'currying'. This funny term refers to a kind of functional composition: taking a function that takes two (or more) parameters, and turning it into a function that takes less parameters, and automatically applies the other arguments, which have been 'baked' into it.

For example, let's say we have an 'add' function - `function add(x,y) { return x + y }`. I might have an instance where I want to add various numbers to a constant - say, 7. Rather than constantly calling `add(7, x)`, currying lets me create an 'add7' function. Whatever I pass, add7 always adds seven to it.
<!--more-->

A practical use case for front-end code might be a 'addClassX' function that curries jQuery's 'addClass' method.

I could do this with a simple curry that 'bakes' only one argument. This is pretty easy to write in JavaScript:

{% codeblock lang:javascript A simple curry %}
function curry(f, x) {
    return function curried(y) {
        return f(x,y);
    };
}
{% endcodeblock %}

This function takes a function, *f*, and a single argument, *x*, the first parameter to apply when the curried function is called. The usage is pretty simple:

{% codeblock lang:javascript Using the curry %}
function curry(f, x) {
    return function curried(y) {
        return f(x,y);
    };
}

function add(x,y) {
    return x + y;
}

var add7 = curry(add, 7);
add7(3); // returns 10
add7(11); // returns 18

function addClass(cssClass, element) {
    $(element).addClass(cssClass);
}

var addClearfix = curry(addClass, 'clearfix');
addClearfix(document.getElementByID('foo')); // #foo now has .clearfix
addClearfix($('.bar')); // .bar elements have .clearfix
{% endcodeblock %}

##Currying functions with more than one argument

Whilst it wouldn't be hard to write a curry for functions with specifically three arguments, it'd be much better if our curry supported the most general case - currying a function that takes *n* arguments. It'd be even better if it  didn't care how many of that number it had to 'bake' - that is, for a curried function taking three args, our curry wouldn't care if we were baking one or two parameters.

To do this, we're going to need to take the `arguments` object, manipulate it, and pass it with `apply`. Apply also demands that we pass a value for 'this'. As it happens, this is probably an argument we want to be able to specify, so we can curry an object method that internally might rely on `this`.

{% codeblock lang:javascript A better curry %}
function curry(f, thisValue, args) {
    // Put arguments 2+ into an array of arguments to curry
    var curriedArgs = [];    
    for (var i = 2; i < arguments.length; i++) { // we can't use splice, as 'arguments' isn't a proper array
        curriedArgs.push(arguments[i]);    
    }
    
    // We will later merge curriedArgs into the start of a *new* array
    // It has to be new - if we push to curriedArgs directly, those pushes will persist in the closure
    
    function mergeArraysIntoNew(arr1, arr2) {
        var mergedArray = [];
        for (var index1 in arr1) {
            mergedArray.push(arr1[index1]);
        }
        for (var index2 in arr2) {
            mergedArray.push(arr2[index2]);
        }
        return mergedArray;
    }

    return function curried(args) {
        var allArguments = mergeArraysIntoNew(curriedArgs, arguments);
        var appliedThis = thisValue || this; // in case 'thisValue' == undefined
        return f.apply(appliedThis, allArguments);
    }
    
}
{% endcodeblock %}

You can now curry functions with multiple parameters, and with different numbers of parameters curried:

{% codeblock lang:javascript Curry usage %}
function addThreeThings(x,y,z) {
    return x + y + z;
}

var addSevenAndTwoThings = curry(addThreeThings, this, 7);
addSevenAndTwoThings(3,4); // returns 14

var addSevenAndThreeAndSomething = curry(addThreeThings, this, 7, 3);
addSevenAndThreeAndSomething(4); // also returns 14
{% endcodeblock %}

##Some potential uses

Like most functional programming constructs, currying is rarely vital, but often subtly useful. Any case where you might be passing lots of repeat parameters could benefit from currying. So could anything that invites lots of value composition. Some ideas that come to my mind include:

- Creating validation functions, e.g. range checking with bounds parameters (you could curry the min and max values)
- Building filter functions up from multiple composable filters
- If I want to store parameters to run against a function later, currying might be a lot neater than maintaining lots of free variables on the heap. And it forces encapsulation of those values with their relevant functions, too.