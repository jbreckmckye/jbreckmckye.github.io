---
layout: post
title: "JavaScript function variables don't have to be anonymous"
date: 2014-06-21 23:16:03 +0000
comments: true
tags: [javascript, functional programming]
---

If you've used JavaScript much, you'll probably know one of its very convenient features &mdash; the ability to assign functions to variables, send them as arguments, and return them as values. This lets you write code like this, where functions themselves return other functions:

{% codeblock lang:javascript Anonymous function bonanza %}
/*
   This code creates a basic 'curry' function 
   (see my earlier post for an explanation)
   It relies heavily on function variables.
*/
 
var add = function(x, y) { // <- A function variable
    return x + y;
};
 
var curryUtil = {
    curry : function(functionToCurry, x) { // <- A function object property
        return function(y) {               // <- A function return value
            return functionToCurry(x,y);
        };
    }
};
 
var add7 = curryUtil.curry(add, 7);
add7(3); // returns 10
 
var double = curryUtil.curry(function(x,y){ // <- A function literal argument
   return x * y;
}, 2);
double(8); // returns 16

{% endcodeblock %}

The problem with this, however, is that all the functions in the above example are anonymous &mdash; they aren't named. Beyond making your code more obscure than it needs to be, this also makes debugging them a problem<!--more-->, because when you look at the browser's call stack, you're going to get something like this:

{% img center /images/2014/callStackAnonymousFunctions.png Now they're all named! %}

Yeah. Good luck with that.

However, you can remedy the issue quite easily &mdash because JavaScript lets you name your function variables:

{% codeblock lang:javascript Named function variables %}
var myFunction = function myFunction(x) {...}
 
var myObject = {
    myMethod : function myMethod(x) {...}
};

function returnSomeFunction() {
  return function myReturnedFunction() {...}  
}
{% endcodeblock %}

&hellip;name your function values&hellip; 

{% codeblock lang:javascript Named function values %}
compose(function someComposedFunction(x) {...} )
{% endcodeblock %}

&hellip;and name returned functions&hellip;

{% codeblock lang:javascript Named returned functions %}
function lambda() {
    return function returnedFunction(x) {...}
}
{% endcodeblock %}

We can apply this syntax to our curry example. Let's look again:

{% codeblock lang:javascript Named function variables in practice %}
/*
   Updated curry function
*/
 
var add = function add(x, y) {
    return x + y;
};
 
var curryUtil = {
    curry : function curry(functionToCurry, x) {
        return function curriedFunction(y) {
            return functionToCurry(x,y);
        };
    }
};
 
var add7 = curryUtil.curry(add, 7);
add7(3); // returns 10
 
var double = curryUtil.curry(function multiply(x,y){
   return x * y;
}, 2);
double(8); // returns 16
{% endcodeblock %}

Because the function variables are named, they'll now be much easier to debug:

{% img center /images/2014/callStackNamedFunctions.png Now they're all named! %}

Naming your function variables makes debugging much easier, takes little effort, and arguably can make for better readability too.
