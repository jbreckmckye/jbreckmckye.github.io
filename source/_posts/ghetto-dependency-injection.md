---
layout: post
title: "Ghetto Dependency Injection"
date: 2015-10-25 15:55:09 +0000
comments: true
tags: [javascript, testing]
---

So, you’re writing a piece of JavaScript that you want to test, but it has dependencies you need to stub or mock out somehow. You know that [dependency injection](http://www.jamesshore.com/Blog/Dependency-Injection-Demystified.html) would be really handy, but you’re not sure how to do it. You might have heard about JavaScript IOC containers like [bottle](https://github.com/young-steveo/bottlejs) or [Intravenous](http://www.royjacobs.org/intravenous/). You may have also heard of [Jest](https://facebook.github.io/jest/docs/common-js-testing.html#content), which lets your tests inspect and override the behaviour of `require`.

Let’s say, however, that right now, it’s just not appropriate – you’re writing something small, you’re writing something quickly, or you’re writing something before you have the chance to evaluate those technologies. Or maybe, like me… you’re just a lazy programmer. Look, I’m not going to judge – at least you’re testing your code, right?

Whatever your reasoning, Ghetto Dependency Injection is here to help.<!--more-->

How does it work?
-----------------

The idea is really, really simple – we exploit the fact that JavaScript functions are objects, and can have properties. We use those properties to store our dependencies, and then overwrite them for the purposes of testing.

Here’s an example of a function we want to test. It compares the fields on two objects, and if there are any differences, sends them to the server to be saved. For the purposes of testing, it would be super-convenient if we could just isolate our logic into functions responsible for –

*   collecting all the differences between the two objects;
*   starting a request to the server if those differences are not nil;
*   making the XHR itself

Here’s how we’d write it without dependency injection:

{% codeblock %}
    const getDifferences = require('getDifferences.js');
    const postDifferences = require('postDifferences.js');
    
    function saveChanges(firstItem, secondItem) {
      const differences = getDifferences(firstItem, secondItem);
      if (differences !== null) {
          postDifferences(differences);
      }
    }
{% endcodeblock %}

Using Ghetto DI
---------------

Now let’s MacGyver a simple DI technique so we can test away:

{% codeblock %}
    // Production code:
    
    saveChanges._deps = {
      getDifferences : require('getDifferences.js'),
      postDifferences : require('postDifferences.js')
    };
    
    function saveChanges(firstItem, secondItem) {
      const deps = saveChanges._deps;
    
      const differences = deps.getDifferences(firstItem, secondItem);
      if (differences !== null) {
          deps.postDifferences(differences)
      }
    }
{% endcodeblock %}   

Injecting and manipulating dependencies in tests
------------------------------------------------

The function’s `_deps` property is completely public, so it’s very simple for tests to manipulate it:

{% codeblock %}
    // Test code:
    
    let saveChanges = require('saveChanges.js');
    
    describe('Save changes', ()=> {
      let differences = {};
    
      beforeEach(()=> {
          saveChanges._deps.getDifferences = ()=> differences;
          spyOn(saveChanges._deps, 'postDifferences');
      });
    
      it('Makes a call to the server when changes are detected', ()=> {
          differences = {firstName : 'Sally'}; // first name changed to sally
          saveChanges();
          expect(saveChanges._deps.postDifferences).toHaveBeenCalled();
      });
    
      it('Makes no calls to the server when no changes are detected', ()=> {
          differences = {};
          saveChanges();
          expect(saveChanges._deps.postDifferences).not.toHaveBeenCalled();
      });
    });
{% endcodeblock %}    

**Now, this is not a scalable solution for big projects**. Let me make that clear. It’s boilerplatey and it means making a compromise about encapsulation – that `_deps` property is fully public, even if its leading underscore should hopefully indicate it’s not to be messed with. If you’re building something substantial, I would really invest my time in one of the solutions I linked to above. But for a very small project, it might well be less hassle than a full D.I. container, or getting Jest up and running.

Anyway, there you have it. A super-simple D.I. approach for super-simple applications. Let me know if you find it handy.
