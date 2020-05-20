---
layout: post
title: "Protected members in JavaScript"
date: 2014-07-10 22:43:06 +0100
comments: true
tags: [javascript, object-oriented programming, javascript OOP]
---

If you've done much OOP in JavaScript, you can probably already simulate private member variables, by putting variables in a constructor's closure (if not, go read this summary by [Douglas Crockford](http://javascript.crockford.com/private.html)). But you may not know that you can also emulate the `protected` status of C++ and Java &mdash; variables shared between parent and child classes, yet not exposed as `public`. This is occasionally useful, but is a little obscure to implement in JS if you don’t know how.

The basic idea is use the ‘parasitic constructor’ pattern &mdash; where a child constructor directly calls the parent constructor &mdash; and passing in an object defined in the context of the child constructor. The parent constructor decorates this object, and because JavaScript object arguments are effectively passed by reference, the members of this object are visible within the child constructor. As such, your child and parent constructors have a ‘shared secret’ object that effectively acts as a map of all the protected members.<!--more-->

&hellip;Maybe this would make more sense if I showed you some code:

{% codeblock lang:javascript Pseudo-protected member variables %}
function Parent(protecteds) {
    protecteds = protecteds || {};
    var alpha = 'private var';
    protecteds.beta = 'protected var';
    this.gamma = 'public var';
}
 
function Child() {
    var supers = {};
    var child = new Parent(supers); // parasitic constructor, to which we pass supers
 
    child.delta = 'public child var';
    child.getBeta = function() {
        return 'Accesses ' + supers.beta;
    };
 
return child;
}
 
var parent = new Parent(); // sole instance of parent
parent.beta; // returns undefined - it's not public
 
var child = new Child();
child.getBeta(); // returns 'Accesses protected var'
child.beta; // returns undefined - beta is still not directly exposed
child.gamma; // returns 'public var' - we have inherited from parent
{% endcodeblock %}

Hopefully, you can see what’s happening. Child() creates an object and passes it to Parent(), which it’s calling directly and decorating (the so-called ‘parasitic constructor’ pattern). JavaScript arguments are normally passed by value, but because ‘reference values’ like objects, functions and arrays are actually pointers, you’re effectively passing the object by reference. The parent is able to decorate ‘protecteds’ and therefore share semi-private members without exposing them to the outside world.

##Caveats

Most attempts at implementing Java/C++ style object-oriented programming in JavaScript usually involve some compromises. This is no exception:

- Any clients of your parent constructor can view and even expose its protected members. Bad child classes can totally explode your encapsulation, and you can’t see this is happening just by looking at the parent constructor. You might partially mitigate this by making the protecteds object immutable at the end of your parent constructor, using the new Object.freeze() method added in ECMAScript 5
- Because the protecteds object is first created by the child, it’s possible for a naive maintainer to introduce bi-directionality, and add things to the protecteds object that the parent then listens to. This would then mean that your parent has to know about the implementation of its various children, which could get messy.
- If you’re used to using protecteds in Java, you might be used to a Java quirk where protected members are accessible throughout the package where they’re defined. But this implementation doesn’t give access to protecteds beyond parent and child classes .
