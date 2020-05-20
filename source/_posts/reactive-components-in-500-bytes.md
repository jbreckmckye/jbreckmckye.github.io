---
layout: post
title: "Reactive Views in 500 Bytes"
date: 2016-03-05 15:45:50 +0100
comments: true
tags: [javascript]
---

If you can use ES6 template strings, you can write reactive, componentized views using less than 500 bytes of helper code.

Let me be clear. This approach isn’t intended as a serious replacement for React+Redux/RxJS. It doesn’t re-render views very quickly and the way it handles events is verbose. It’s simply an experimental way to write light, simple applications that need to load fast, without the hassle of transpiling JSX or rendering on the server. I’m sharing it as a curiosity more than anything else.<!--more-->

The idea
--------

*   We store our state in _observables_ – objects that let us subscribe to their changes with callbacks.
*   We create HTML for each component in _computed observables_ – observables that read other observables, and automatically update with them.
*   We generate our view with a ‘master’ computed observable that read all the components’ computeds.
*   When that master observable changes, we update the DOM.
*   We make the observables and computeds work using a reactive microlibrary. [Trkl](https://github.com/jbreckmckye/trkl/blob/master/trkl.js), minified and gzipped, does the job in a little over 400 bytes.

That’s a lot to take in. Let’s first take a moment to understand these _observables_ and _computed observables_, so we can then see how they fit together.

Understanding ‘observables’
---------------------------

Observables are values whose changes we can subscribe to with callbacks. When the observable changes, the callbacks are run.

{% codeblock %}
    x.subscribe(change => console.log(change));
    
    x.set(1); // The console prints '1'
    x.set(2); // The console prints '2'
{% endcodeblock %}

If we store our application’s model in observables, we can then read it with _computed observables_.

Understanding ‘computed observables’
------------------------------------

A computed observable is an observable that runs a function, takes note of the observables that function reads, and re-runs the function whenever they change – updating itself in the process. A computed is an observable itself, and it can be subscribed to by other computeds.

{% codeblock %}
    let x = observable();
    x.set(1);
    
    let y = computedObservable(()=> {
      const newVal = x.get() * 2;
      console.log('New Y value is: ' + newVal)
      return newVal;
    });
    // The console prints 'New Y value is 2'
    
    x.set(5);
    // The console prints 'New Y value is 10'
    
    y.get(); // returns 10
    
    let z = computedObservable(()=> {
      return y.get() * 3;
    });
    
    x.set(10);
    // y's value is 20
    // z's value is 60
{% endcodeblock %}    

How computed observables work is a little out of the scope of this post. Essentially, whenever we run an computed, we set a flag that tells any observables being read that they must subscribe the computed to their changes. When those observables next change, the computed gets re-run automatically.

Don’t worry if you’re still fuzzy on exactly how they work. The most important idea to grasp is that if our model is written with observables, our view can be written as a computed that is always updated when the model changes.

Here’s a simple example:

{% codeblock %}
    const outputDiv = document.getElementById('output')
    let firstname = observable().set('Crash');
    let lastname = observable().set('Bandicoot');
    
    let view = computedObservable(()=> {
      const html = firstname.get() + ' ' + lastname.get();
      outputDiv.innerHTML = html;
    });
    
    // Our HTML is now 'Crash Bandicoot';
    
    firstname.setValue('Coco');
    
    // Our HTML is now 'Coco Bandicoot'
{% endcodeblock %}    

This works, but remains too unwieldy to use on anything beyond the simplest views. We need to refine it.

Template strings
----------------

If we can use [ES6 template strings](http://www.2ality.com/2015/01/template-strings-html.html) – if we don’t care about anything beyond bleeding-edge browsers, or if we’re willing to transpile our code – we can embed HTML markup directly in our view function.

{% codeblock %}
    let view = computedObservable(()=> {
      outputDiv.innerHTML = `
          <h1>My name is:</h1>
          <p>${firstname.get()} ${lastname.get()}</p>
      `;
    });
{% endcodeblock %}    

Much better!

Sub-views
---------

Now, that’s fine for two lines of HTML, but what if our view gets more complex? We hardly want to write all our markup in a single function. Won’t it grow out of control after five or six lines? And what if we want to reuse the same component in multiple places? We need to separate different parts of the view, rendering each component in its own computed, and subscribing to each computed in our ‘root’ view:

{% codeblock %}
    let heading = computedObservable(()=> {
      return `<h1>My name is:</h1>`;
    });
    let para = computedObservable(()=> {
      return `<p>${firstname.get()} ${lastname.get()}</p>`;
    });
    
    let view = computedObservable(()=> {
      outputDiv.innerHTML = `
          ${heading.get()}
          ${para.get()}
      `;
    });
{% endcodeblock %}    

Now, when `firstname` or `lastname` changes, `para` will update. `Para` is an observable like any other, so the view can subscribe to it.

Ignore redundant re-renders
---------------------------

If we change `firstname` and `lastname` at the same time, our view will render twice – one time with the first changed property, and another time with both. This is expensive, because every time we render the HTML, we force the browser to reparse the entire view’s HTML.

Some observables libraries are smart enough to handle this problem for us. [Trkl](https://github.com/jbreckmckye/trkl/blob/master/trkl.js) – which I wrote – isn’t. It simply does the minimum necessary in the minimum bytes – that’s why it’s small. But we can still throttle redraws in a very simple way: whenever the view needs to change, we put our new markup in a variable, and then queue a redraw for the next frame if we haven’t already. On subsequent updates, we just update the variable, so that the queued-up redraw will output that, instead. This means the DOM only changes once.

{% codeblock %}
    let nextHTML = '';
    let queuedRedraw = false;
    
    let view = computedObservable(()=> {
      return `
          ${heading.get()}
          ${para.get()}
      `;
    });
    
    let drawView = computedObservable(()=> {
      nextHTML = view.get();
      if (!queuedRedraw) {
          window.requestAnimationFrame(()=> {
              queuedRedraw = false;
              outputDiv.innerHTML = nextHTML;
          });
          queuedRedraw = true;
      }
    });
{% endcodeblock %}    

Handling events
---------------

One shortcoming of only dealing with HTML strings, rather than actual DOM objects, is that we can only add events by adding inline event handlers to our markup. This is verbose and only allows events to call functions that are globally accessible on `window`. I have to admit that this is a real shortcoming of the approach. Still, if you’re building something basic enough, you might decide you can bear it.

Here’s what a form input might look like:

{% codeblock %}
    let form = computedObservable(()=> {
      return `
          <form>
              <label for='firstname'>First name:</label>
              <input type='text' id='firstname' onchange='setFirstName(this)'>
          </form>
      `;
    });
    
    window.setFirstName = inputEl => {
      firstname.set(inputEl.value);
    };
{% endcodeblock %}    

Be careful how many events you attach. Remember that because the entire view is redrawn each time, every re-render means tearing down the existing event handlers and recreating new ones.

Putting it all together
-----------------------

You can see an example of this approach in a recent experiment of mine – a [hands-free recipe app](https://github.com/jbreckmckye/hands-free-website/blob/master/src/js/overlay.js) that uses computed observables and template strings to render the view. When the model is mutated, the view responds instantly, and without requiring any templating library or heavy dependencies.

Tempted to give it a try yourself? Have a go in your next experiment, and tell me how you get on in the comments below!