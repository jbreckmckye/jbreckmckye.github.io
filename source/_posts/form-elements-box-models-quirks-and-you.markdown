---
layout: post
title: "Styling form elements"
date: 2014-03-15 17:27:04 +0000
comments: true
tags: [front-end, forms, css, pixel-perfection]
---

Form elements are notoriously difficult to style. Even apparently simple tasks like horizontally aligning different types of input can prove a headache for experienced developers. Only by understanding how form elements are laid out can we master them. <!--more-->

## A simple task

Let’s say you’ve been asked to implement a simple HTML contact form for a new client. They’ve handed you a Balsamiq mockup – it all looks simple enough.

{% img center /images/2014/formMockup.png Mockup of a HTML form with four inputs of various types, all lined up %}

An input, a select, a textarea and a button. The markup is dead simple:

{% codeblock lang:html Form markup %}
<form>
    <label for="name">Name</label><input id="name" type="text" />
    <label for="type">Type of enquiry</label>
    <select id="type">
        <option>I want to buy your stuff</option>
        <option>I want to complain about your stuff</option>
    </select>
    <label for="comment">Your comment</label>
    <textarea></textarea>
    <input type="submit" value="Send your message!" />
</form>
{% endcodeblock %}

The CSS should be straightforward, right? Let’s hardcode the widths to keep things really easy:

{% codeblock lang:css Form CSS %}
form { 
    width: 600px; 
    padding: 5px; 
    border: 1px solid #ccc;
}

label {
    display: block;
}

input, select, textarea {
    display: block;
    width: auto;
    padding: 4px;
    border: 1px solid #aaa;
}
{% endcodeblock %}

But this doesn't work. Instead, you get something like [this](http://jsfiddle.net/jbreckmckye/kTMak/):

{% img center /images/2014/formFail1.png Above markup in a browser. The form elements do not line up %}

It doesn’t seem to make sense. After all, the form elements were all `display:block`, and I gave them `width:auto` for good measure. Shouldn’t they expand to take the full width of the container?

##Form elements have intrinsic ‘auto’ widths

Forms elements are 'replaced'. This is a term you might have encountered when reading about images. Essentially, 'replaced elements' are items ‘alien’ to the browser items, displayed within it. Replaced items have their own intrinsic dimensions, and this defines their ‘auto’ values for width and height. Think of how display:block images don’t expand to fill their containers unless you give them width:100%. The same applies to `<input>`, `<select>`, `<button>` and `<textarea>`. They come from the operating system, so their ‘auto’ width is the OS default.

Though replaced elements have unexpected ‘auto’ width values, they can still be resized – again, just like `<img>` elements.

We can’t just put width:100% on our form elements, however, as they have padding and borders. We need to set a width smaller than our container, such that when the padding and border widths are added to it, it fits snugly into the form. That's okay, though, we're using hardcoded widths for this, so we can just set an arbitrary value of 590px to compensate.

Let's [try it again](http://jsfiddle.net/jbreckmckye/69ZUJ/).

{% img center /images/2014/formFail2.png But even with explicit widths, the alignment's still not right  %}

Almost – but the form elements don’t quite align. The dropdown and button are a good five or six pixels shorter than the input and textarea. What gives?

##Some form elements use the IE5 'quirks' box model

As a front-end developer, you’ll be used to the W3C box model (so-called ‘content-box’). The ‘width’ property defines the inner box, with padding and borders added on top of that. You’ve probably also heard of the ‘quirks’ or ‘border-box’ model, where the width property defines the width of everything, borders and padding included. The quirks box model is usually dismissed as a historical artefact, last seen on Internet Explorer 5. Surprisingly enough, however, **today’s browsers still use the border-box model for several form elements**, due to historical reasons (and because the standards never really insisted otherwise). The misalignment above is the result of these two conflicting types of layout.

**Form elements that use border-box include selects and buttons, whilst content-box (the traditional model) is used by textareas and text inputs.** The content-box model is also used by the new HTML5 text input subtypes, like number and date. The only strange exception to this rule is `input[type="search"]`, which takes a border-box model at the time of writing – but only in Webkit. Weird.

The fact that buttons use border-box is particularly irritating when they have to be horizontally aligned with buttons that are actually hyperlinks, and use content-box. The result is a shark-tooth effect that looks sloppy.

##CSS3 Box-sizing to the (cross-browser) rescue!

Use the `box-sizing` CSS property. `Box-sizing` lets you determine whether the selected item is laid out according to the traditional standards-compliant mode (‘content-box’), or the old-fashioned ‘quirky’ behaviour (‘border-box’). By setting form inputs to use content-box, pretty much everything from Internet Explorer 8 upwards will lay form elements out consistently, whilst older browsers will gracefully degrade to having a few form elements slightly shorter than others.

Knowing this, let's try it [one final time](http://jsfiddle.net/jbreckmckye/9jAst/):

{% img center /images/2014/formSuccess.png Perfect!  %}

Sorted! The form elements line up perfectly.

##The box-sizing syntax

Here’s the cross-browser CSS:

{% codeblock lang:css Box-sizing reset %}
.selector { 
    box-sizing : content-box; 
    /* Internet Explorer 8+, Chrome 10+, Firefox 29+, Safari 5+ (including iOS), Android 4+, 
    Opera 9.5+, Opera Mobile, Opera Mini 5+ */
    
    -moz-box-sizing : content-box;
    /* Firefox 1.0-28.0 */

    -webkit-box-sizing : content-box;
    /* Chrome 1.0-9.0, Safari 3.0-5.0 (inc. iOS), Android 2.1-3.0 */ 
}
{% endcodeblock %}

My advice? Place it to your next form reset stylesheet.
