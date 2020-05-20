---
layout: post
title: "A simple group checkbox for Knockout.js"
date: 2014-10-04 15:45:50 +0100
comments: true
tags: [knockoutjs, javascript]
---

I've been using Knockout for the first time on a new project and have been pretty impressed. Recently, I had a need to implement a simple 'group checkbox'. The Knockout documentation already provided an example of a 'select / deselect all' checkbox, but the behaviour I wanted was slightly different. I wanted a checkbox that would be unchecked when its children were disabled, checked when any were enabled and would select / deselect all if I toggled it. With a little research into 'computed properties', it turned out this is quite easy to do.<!--more-->

The implementation is really straightfoward. We simply look up the childrens' checked state in our `read` method (so we subscribe to their changes), and we have our `write` method simply set all our childrens' states to our own. If a child gets checked, we get checked. If we get checked or unchecked, our children do. You might think that this would create a circular chain - that if a child gets checked, we get checked, so *all* the children do, not just the one originally checked. But that's not how Knockout works. Computeds do not get evaluated more than once per 'flow'. So you **don't have to worry about calls to `read` triggering calls to** `write`. I wish that was documented more clearly.

As such, the group checkbox implementation becomes dead simple.

{% codeblock lang:html Example HTML %}
<input type="checkbox" data-bind="checked: fruitGroup"/>
<label>Group</label>

<hr/>

<div data-bind="foreach: fruits">
    <div>
        <input type="checkbox" data-bind="checked: selected, attr: {id: name}"/>
        <label data-bind="text: name, attr: {for: name}">Fruit</label>
    </div>    
</div>
{% endcodeblock %}

{% codeblock lang:javascript Example JavaScript %}
function AppViewModel() {
    var that = this;
    
    // These our our fruits. They're going to have a group checkbox.
    this.fruits = ko.observableArray([
        {name : 'Apple', selected : ko.observable(true)},
        {name : 'Banana', selected : ko.observable(true)},
        {name : 'Coconut', selected : ko.observable(false)}
    ]);
    
    // Let's build a group checkbox that can be used to select / deselect all, and 
    // becomes selected when a child is selected
    this.fruitGroup = ko.computed({
        read : function() {
            // Get selected when dependent children are selected
            var someSelected = false;
            var fruitsArray = that.fruits();
            fruitsArray.forEach(function(fruit){
                if (fruit.selected()) {
                    someSelected = true;
                }         
            });
            return someSelected;
        },
        write : function(newState) {
            // If checked / unchecked, propagate this change to children. This isn't called if we're only
            // only checking the group checkbox because of a change to a dependent.
            var fruitsArray = that.fruits();
            fruitsArray.forEach(function (fruit){
                fruit.selected(newState);
            });
        }
    });
 
}
 
ko.applyBindings(new AppViewModel());
{% endcodeblock %}

You can play with a demo [here](http://jsfiddle.net/bgzzLa42/5/). It should work on everything up from IE9 (IE8 won't like the `array.forEach` call, but you can shim that if needs be).

I'm really impressed with Knockout. With its design-agnostic approach and focus on doing basic data binding extremely well, I'd certainly recommend it if you're looking for something lightweight in a simple web application.