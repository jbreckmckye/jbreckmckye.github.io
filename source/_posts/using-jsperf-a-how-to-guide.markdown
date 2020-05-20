---
layout: post
title: "Using jsPerf: a how-to guide"
date: 2014-08-05 19:55:28 +0100
comments: true
tags: [tools, performance, javascript, high-performance-JavaScript]
---

If you’re interested in testing the performance of a particular piece of JavaScript, you might be interested in [jsPerf](http://jsperf.com/).

jsPerf allows you to run and compare the speed of arbitrary snippets of JavaScript against a blob of HTML of your choice. This means you can test not just pure JavaScript, but DOM manipulation and jQuery calls too.<!--more-->

##An example

For example, let’s say we we want to compare the following blocks of code:

**Some code before refactoring:**

{% codeblock lang:javascript Slow code %}
var paragraphs = $('p');
 
for (var i = 0; i < paragraphs.length; i++) {
    if ($(paragraphs[i]).attr('class') == 'makeBlue') {
        $(paragraphs[i]).css({color : 'blue'});
    }
}
{% endcodeblock %}

and...

**Some code after refactoring:**

{% codeblock lang:javascript Faster code %}
var paragraphs = $('p');
var paragraphsNumber = paragraphs.length;
 
for (var i = 0; i < paragraphsNumber; i++) {
    var thisParagraph = paragraphs[i];
    if (thisParagraph.className == 'yes') {
        thisParagraph.style.color = 'red';
    }
}
{% endcodeblock %}

The second snippet should be faster, because we cache the paragraph.length and node lookups, and use the native DOM interface for accessing style / class data. But how much faster? jsPerf can tell us.

##Setting up a jsPerf test

The procedure is pretty simple:

+ You enter a name for your test
+ You add the HTML to test against, along with linking to whatever libraries you want to test. You can skip this if you’re testing ‘pure’ JavaScript
+ You can specify some setup / teardown JS for each test (the time to run this will be excluded from the recorded time for each test)
+ You add however many snippets you want to compare
+ You save the test (which gives you a shareable URL - this is important)

When you’re done, you can hit ‘run’, and the JavaScript is run in your browser.

Let’s see the results ([http://jsperf.com/rm-demo](http://jsperf.com/rm-demo)):

{% img center /images/2014/jsperf1.jpg Test results show a dramatic improvement in the refactored code %}

Pretty dramatic. But what if I want to test in other browsers? I can revisit the page in another browser, run the test again, and – *this is the best thing* – compare results between browsers, which are saved every time. For example, let’s run this test again in IE7:

{% img center /images/2014/jsperf2.jpg Test results show a dramatic improvement in the refactored code %}

Much slower, but we can see the optimization isn’t browser specific. And we can see that with a browser as slow as IE7, this is probably an optimization worth using again in future.

Obviously, we shouldn’t be in the business of optimizing our code prematurely, but if you’re doing something performance critical (animation or manipulating a really large DOM), jsPerf can be a really handy tool for answering those tricky questions and giving you some hard numbers. Definitely worth a bookmark.