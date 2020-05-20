---
layout: post
title: "Spying on Third-party JavaScript"
date: 2015-12-13 15:55:09 +0000
comments: true
tags: [javascript, testing]
---

Very rarely, it is useful to intercept calls to hidden methods on third party scripts. I had recent need of this when I wanted to spy on calls to DFP’s undocumented `googletag.debug_log.log` method, so that I could report detailed advert timings. But working with undocumented APIs is always treacherous – those methods can change or disappear at any moment. We need a safe way to spy on third party code.<!--more-->

Ground rules
------------

Before we begin, we must establish some rules about spying on code we don’t control:

*   We cannot use it to build anything essential. Logging and error reporting are fine, but not user-facing features, because whatever we build may fail suddenly in production.
*   We must assume our spies can fail. That also means we must catch any exceptions they throw, and stop failures disrupting other functionality.
*   We should test their robustness. Unit tests written in Mocha or Jasmine make this easy.

Parts to the puzzle
-------------------

For something like a spy for `debug_log.log`, we need three things:

1.  A check to detect if the method still exists,
2.  A **spy function** to intercept calls on it safely,
3.  An **interceptor** to actually use the call’s data

Let’s think about them in turn.

### Checking the method still exists

Third party code can change all the time, and without warning. If the code we’re spying on disappears, our script will throw an exception and possibly break other functionality. Will `googletag.debug_log.log` still exist tomorrow? Nobody outside of Google knows.

That’s why we must always wrap our spy in a try-catch, and log any exceptions for good measure (so we can later reason why our logging has mysteriously stopped):

{% codeblock %}
    try {
        attachLogging(object);
    } catch (e) {
        someErrorLoggingFramework.report(e);
    }
{% endcodeblock %} 

The spy function
----------------

If you’ve written many JavaScript unit tests, you’ll no doubt be familiar with the idea of a ‘spy’. When we _spy_ on a method, we replace it with a function of our own that calls the target as normal, but silently does something with information about how it’s being called, using an _interceptor_. In my case, I wanted to get messages being passed to the googletag debug log, pull timing data off and send it up to my own analytics service.

We have a few considerations when writing our spy:

*   We have to make sure the original method is being called as normal, because we don’t know what does or will rely on it in future
*   We have to return whatever the original method outputs to whoever called it
*   Errors in the interceptor must be self-contained, because the interceptor could break when the third party code changes.
*   Errors in the interceptor should ideally be logged, so we can react quickly when things _do_ break.
*   If timing is a consideration, we have to make sure our interceptor doesn’t change the performance characteristics of the original code much

Such a spy might look like this:

{% codeblock %}
    function spyOnMethod(parent, name, interceptor) {
      var originalMethod = parent[name];
    
      parent[name] = function spy() {
          var args = Array.prototype.slice.call(arguments, 0);
          var binding = this;
          var result;
    
          window.setTimeout(function () {
              try {
                  interceptor(binding, args, result);
              } catch (e) {
                  someErrorLoggingFramework.report(e);
              }            
          }, 0);
    
          result = originalMethod.apply(binding, args);
          return result;
      };
    }
{% endcodeblock %}   

We’re doing a lot of stuff here. Let’s break it down:

1.  We grab a reference to the original method and keep it in a closure. This closure will be available to our substitute function and allow it to call `originalMethod`.
2.  We replace the original method with substitute named `spy`. Naming the function means it’ll be easier to debug if it later all goes wrong.
3.  The spy, once called, grabs the binding and arguments the original method is supposed to run under.
4.  We create a setTimeout that will call the interceptor, in a try-catch block. It has a timeout of zero, meaning it should run on the next tick.
5.  We run the original method and record what it outputs. We then return that output to whoever called the spy.
6.  On the next tick – when the original ‘thread’ or event completes – we call the interceptor with the original method’s parameters, binding, and result. If the interceptor throws an exception, our try-catch will log it.

Running the interceptor in a setTimeout is akin to running it in a separate thread, so it doesn’t slow down the execution of the original code.

Using the two functions we’ve defined, we can now attach a spy whenever we know the target exists:

{% codeblock %}
    try {
      spyOnMethod(googletag.debug_log, 'log', interceptor);
    } catch (e) {
        someLoggingFramework.report(e, 'could not attach logger to googletag');
    }
{% endcodeblock %}    

All we’re missing is the `interceptor` itself.

The interceptor
---------------

This is the final piece of the puzzle. It will receive data about the call and do something with it – typically log it. Because our spy function handles exceptions, our error handling doesn’t have to be watertight here.

{% codeblock %}
    // Log the time that various lifecycle events happen with an advert
    // This will give us data about the performance of our advertising code
    
    var lifecycleMappings = {
        3: 'fetch',
        4: 'receive',
        6: 'render'
    };
    
    function googletagLogSpy(binding, logArguments, result) {
        var time = window.performance.now();
        var lifecycleId = logArguments[1].getMessageId();
        var slotId = logArguments[3].getSlotId();
        var slotElementId = slotId.getDomId();
    
        var event = lifecycleMappings[lifecycleId];
        if (event) {
            log(event, slotElementId, time);
        }
    }
{% endcodeblock %}    

It’s still a little boilerplate-y, but it _is_ very safe. It’s never ideal to have to do this sort of work, of course, but at least with the approach above, I’ve made it a little less brittle and a little more sane for someone out there. Let me know if you use it.
