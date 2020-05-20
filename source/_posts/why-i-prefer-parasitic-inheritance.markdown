---
layout: post
title: "Why I like parasitic inheritance"
date: 2014-05-29 23:03:07 +0100
comments: true
tags: [front-end, javascript, object-oriented programming, javascript OOP, prototypes]
---

When you're starting out with JavaScript, it doesn't take long for the question of object oriented programming to raise its head. As soon as you want to build anything non-trivial you're going to want some means of structuring your solution and imposing some kind of abstraction on your code. Most tutorials these days emphasise use of the prototype chain - either through `function.prototype` or the ECMAScript 4 `Object.create()` interface. I, however, am still fond of the more basic parasitic inheritance approach - where inheritance is basically a special case of composition - and I wanted to outline my reasons why.

<!--more-->

I'm aware that prototypical inheritance is quite popular, and I've no intention of telling developers that they're doing things wrong, that they must ditch `function.prototype` and follow The One True Path To JavaScript Enlightenment. I just want to suggest some reasons why I think parasitic inheritance can sometimes be more convenient.

##It's useful when you want private state or non-scalar values on your parent classes

If you use prototypes for implementing inheritance in JavaScript, you can't have state on your parent 'classes', nor can you use array or object members, without their contents being shared. That's because any assignments to reference values on the prototype (arrays or objects) or side effects in closures (like those used to emulate private variables in JavaScript) will be shared amongst all instances of children.

For example, let's say I start with the following class. It has private state - `myPrivateVariable` - and a non-scalar member - the array, `myArray[]`:

{% codeblock lang:javascript Prototypical inheritance - parent %}
function Parent() {
    var myPrivateVariable = false;
    
    this.flipPrivateVariable = function() {
        myPrivateVariable = true;
    };
    
    this.getPrivateVariable = function() {
        return myPrivateVariable;
    };
}

Parent.prototype.myArray = [];

{% endcodeblock %}

So our `Parent` object has a private variable, `myPrivateVariable`, that sits in the closure of the constructor function. Privileged methods in the same scope have the ability to manipulate it. Instances of `Parent` also come with an array, `myArray`. So far, so straightforward. Now let's say we want to extend it in some fashion. Let's use a prototype:

{% codeblock lang:javascript Prototypical inheritance - child %}
function Child() {
    // what goes in here doesn't matter
}

Child.prototype = new Parent();

var bob = new Child();
var mary = new Child();

{% endcodeblock %}

So we have two new child instances, Bob and Mary. To someone using these objects downstream, it might look like Mary and Bob aren't tied together. But that's not true:

{% codeblock lang:javascript Prototypical inheritance - usage %}
bob.flipPrivateVariable();
mary.getPrivateVariable(); // returns TRUE

mary.myArray[0] = 'I am Mary';
bob.myArray.pop(); // returns 'I am Mary'
{% endcodeblock %}

Flipping the private variable on Bob has changed the private variable on Mary. And adding elements to Mary's array has changed Bob's. This behaviour might not be obvious if you're using them downstream, and it might not be what we always want to happen.

Of course, once you know that they share a prototype, it's much clearer what's happening. Bob and Mary both have a delegate object, their prototype, which was set on the `Child` constructor. That object is shared between them. Therefore, there's only one closure around the privileged methods on that object. There's only 'one' `flipPrivateVariable` and it's flipping only one private variable. So if you want your child objects to inherit a parent's handling of private state, you can't really do it with prototypes.

As for the array access, this happens because when you set elements on the array, you're not shadowing the property. Normally, assignments to prototype properties causes them to be overwritten with a value 'local' to the specific object. But you're not overwriting anything when you access the array members - you're adding and overwriting the array's *members*. This happens with anything implemented as a reference value, including plain objects.

###How parasitic inheritance solves this problem

With parasitic inheritance, every `child` gets its own instance of `parent`. You can naively manipulate reference members without any workarounds, and you can extend objects with private state or reference members without having to do any refactoring. I think that's a lot more convenient. Here's how it works if you're unfamiliar with the approach:

{% codeblock lang:javascript Parasitic inheritance %}
function Parent() {
    var parent = new Object();
    
    var myPrivateVariable = false;
    
    parent.flipPrivateVariable = function() {
        myPrivateVariable = true;
    };
    
    parent.getPrivateVariable = function() {
        return myPrivateVariable;
    };
    
    parent.myArray = []; // we put this in the closure, not on a shared prototype
    
    parent.somePublicField = 'foo';
    
    return parent;
}

function Child() {
    var child = new Parent(); // you could also use Parent.apply(this), but this way
                              // you automatically avoid using 'this', which has problems
                              // with binding
    
    child.foo = 'foo';
    
    return child;
}

var bob = new Child();
var mary = new Child();

bob.somePublicField; // returns 'foo'

bob.flipPrivateVariable();
mary.getPrivateVariable(); // returns false

bob.myArray.push('I am Bob');
mary.myArray.pop(); // returns undefined
{% endcodeblock %}

Personally, I actually think it looks a bit cleaner and better encapsulated than having the prototype assignment outside the constructor. But style is always a matter of opinion. I'll leave it up to you to judge.

Doing this also makes your codebase much friendlier for developers who aren't so JavaScript-savvy and aren't in the habit of thinking about the shared nature of prototypes. If they think they act like superclasses in Java, for instance, they might introduce state bugs that only show up once you create more than one instance of a child class. That could be annoying.

That being said, I really should mention that parasitic inheritance certainly isn't the only way to extend objects with private state. One way to do it whilst still employing constructors is to use `function.apply(this)` to call the parent constructor in the body of the child constructor. This will create a new closure and a new set of privileged methods within the closure of the child object, so that are unique to the instance:

{% codeblock lang:javascript Prototypical inheritance with function.apply() %}
function Parent() {
    var myPrivateVariable = false;
    
    this.flipPrivateVariable = function() {
        myPrivateVariable = true;
    };
    
    this.getPrivateVariable = function() {
        return myPrivateVariable;
    };
    
    this.myArray = [];
}

Parent.prototype = {
    somePublicField : 'foo'
};

function Child() {
    Parent.apply(this); // calls the parent function, passing a value to use as 'this'.
                        // Parent will decorate the Child's 'this' value, so it will
                        // have its own copy of flipPrivateVariable / getPrivateVariable,
                        // and its own unique closure too, created by running Parent()
                        // once again
}

Child.prototype = new Parent(); // anything added by Parent.apply(this) will potentially
                                // shadow fields added on this prototype

var bob = new Child();
var mary = new Child();

bob.somePublicField; // returns 'foo'

bob.flipPrivateVariable();
mary.getPrivateVariable(); // returns false

bob.myArray.push('I am Bob');
mary.myArray.pop(); // returns undefined
{% endcodeblock %}

This technique is documented by [Ben Nadel](http://www.bennadel.com/blog/2181-private-variables-do-not-necessarily-break-prototypal-inheritance-in-javascript.htm). You still have to avoid using reference members, though.

##I think newbies find prototypes a bit tricky

This is obviously a matter of personal opinion, but I think newbies seem to have a real problem getting to grips with prototypes. Prototypes are quite unique to ECMAScript (the only other language I know properly uses them is Lua), add an extra layer of indirection, and at first glance, seem to be attached to the 'wrong' thing - the constructor rather than the instance.  One question on Stack Overflow, [How does JavaScript .prototype work?](http://stackoverflow.com/questions/572897/how-does-javascript-prototype-work/4778408#4778408), has about 300,000 views. I think that indicates somewhat they're at least not intuitive - though that could just be because people are used to classical inheritance.

##Parasitic inheritance stops developers misusing 'this'

Another issue that new JavaScript developers often fall into is misunderstanding the binding of `this`. They use `this` inside a method body, attach that method to an event handler, then wonder why they get a reference exception. But with a certain style of parasitic inheritance, `this` is nowhere to be found. Consider the first example I gave of the approach:

{% codeblock lang:javascript Parasitic inheritance %}
function Parent() {
    var parent = new Object();       
    return parent;
}

function Child() {
    var child = new Parent();
    
    child.foo = 'foo';

    child.bar = function bar() {
        return child.foo;
    };
    
    return child;
}
{% endcodeblock %}

Because I'm not using `this`, I don't even have to think about the context in which `bar` is going to be called, I don't have to worry about junior developers tripping up over function binding, and I don't need to use techniques like `var that = this;` or `function.prototype.bind()`. Personally I find both of those a bit awkward, but then again I'm sure some people would find my parasitic approach equally unwieldy. This might just be another personal preference. I have lots of weird preferences - I don't like tomatoes and I have a phobia of water tanks - so it's entirely possible I'm just a weirdo.

##The drawbacks don't bother me

I'm sure many readers can think of two obvious reasons not to use the parasitic approach: object typing and memory use. But whilst these concerns are valid, they're not a dealbreaker to me.

The issue with object typing is that the parasitic approach stops you from using `instanceof`. Everything is just an object; you can't detect its class taxonomy. But personally, I've probably only ever used instanceof a handful of times - in most projects I don't deal with objects of unknown pedigree, and I prefer duck-typing when I do anyway. Once again, [YMMV](http://tvtropes.org/pmwiki/pmwiki.php/Main/YMMV).

The other caveat is that because all the properties are duplicated, parasitic inheritance can potentially be memory inefficient if there are lot of large fields. This isn't normally the case unless you have a lot of objects with complex methods, however. If really needs be, it might be ameliorated by putting large functions on the Parent into some kind of closure surrounding it, and calling them by delegates. For example:

{% codeblock lang:javascript A more memory-efficient approach %}
var Parent = (function(){
    // we're using an IIFE to provide a closure for any big functions 
    // or STATIC fields that might live on Parent
    
    function somethingComplexAndHorrible(thisValue, options) {
        // The main body of the method lives here, and we pass it a 'this' value to work on
    }
        
    return function Parent() {
        var parent = new Object();
        
        var myPrivateVariable = 'false';        
        parent.myComplicatedMethod = function(options) {
            somethingComplexAndHorrible(parent, options);
            // this method gets duplicated, but it's quite small,
            // so the impact isn't too severe
        };
        
        return parent;
    };

})();

function Child() {
    var child = new Parent(); // Parent() gets called as normal    
    return child;
}
{% endcodeblock %}

You should only bother trying this if really necessary, though. We all know that [premature optimization is the root of all evil](http://c2.com/cgi/wiki?PrematureOptimization).

##This kind of flexibility is what I love about the language

Okay, this isn't really an argument in favour of parasitic inheritance. But it is a more general observation I've had writing JavaScript - that the ability to do things like this, and model the way classes and inheritance work however you like - is what I love about the language, and what I think will give it its enduring suitability for the many tasks people will throw at it. You can jury-rig almost any programming style into JS, and whilst it's best not to try and turn JavaScript into a different language, having the community experiment with styles and share approaches that work is what will allow future ECMA language standards add the right features in the right ways.

Agree? Disagree? I'm always willing to be persuaded I'm wrong. Come tell me on Twitter. [jbreckmckye](https://twitter.com/jbreckmckye).