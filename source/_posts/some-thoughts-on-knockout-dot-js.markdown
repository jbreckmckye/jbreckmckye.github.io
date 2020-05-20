---
layout: post
title: "Some Thoughts on Knockout.js"
date: 2014-11-16 21:33:24 +0100
comments: true
tags: [javascript, knockout.js]
---

I’ve been working with Knockout.js on a commercial project for a couple of months now and think I have a decent sense of its capabilities. However, I’ve never worked with any other web application frameworks before and wondered how others felt Knockout compared to them.

<!-- more -->

So far I’ve been really impressed, but I’m not certain how much that is to do with Knockout and how much that is to do with not having to use jQuery to perform templating and update a ‘model’ that’s actually just a bunch of scattered global variables. Obviously, I’d been trying to keep a model – view distinction even with just jQuery, but the data binding alone is extremely onerous when you’re doing it manually.

## Things I (think) I like about Knockout:

*   The declarative syntax. It’s obvious how a part of my template relates to my functionality when you look at it. There’s no magic scripts running unbeknownst that tie everything together. There’s a viewmodel and there’s a blob of HTML. I like that a lot.
*   The fact that anything that can be bound to the DOM has to be a public method. That effectively means there’s no reason I can’t wrap my functionality with a unit test. If developers could mutate the document through a chain of private functions, potentially I’d have to test the functionality with a slow and awkward functional test (Selenium or whatever).
*   The ease with which you can transform observables into plain data and vice versa.
*   If you use visibility bindings to switch on or off content, you can place all your markup for conditional content in the HTML itself rather than have things being injected by mysterious functions. That’s a nice design and one that Knockout lends itself to.
*   Custom bindings make it easy for me to implement custom components in a nice way, where the component code only deals with the business of turning a model variable into a blob of styled HTML and back again.
*   The binding syntax is quite clear and easy to pick up.
*   It’s fairly small down the wire (20kb minified and GZipped).
*   The computed observables work quite well and you can potentially be quite naive about circular references and, if you use pure computeds, memory usage.
*   The lack of architecture outside the data bindings and viewmodel mean you are free to implement any design you wish. This isn’t an unambiguous plus point, though.

## What I (think) I don’t like:

*   There’s not a lot you get out of the box except data binding and some utils for translating data into and out of a Knockout viewmodel. Version 3 does add routing though.
*   It’s quite hard to debug. Error messages are often quite cryptic, and the only clue you really have is the fact that Knockout stopped binding your model at a certain part of the document.
*   Knockout doesn’t really ‘lay the rails’ of your architecture, and the fact you can usually implement something in many ways makes it quite tricky to choose the right solution if you’ve never done this sort of web application work before (like me).
*   The documentation is okay, but it’s not amazing. I would have liked a proper set of API docs. You have to do a lot of reading and rooting around in the documentation to clear up some key concepts.

Perhaps over Christmas I’ll take a look at React and Meteor. Maybe then I’ll have a better sense of where I stand. I could also take a brief look at Angular, which – AFAIK – also uses data binds specified directly in the DOM.

What do others think about Knockout? Send me a tweet at @jbreckmckye.
