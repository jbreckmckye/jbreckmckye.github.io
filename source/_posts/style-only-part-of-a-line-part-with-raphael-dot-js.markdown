---
layout: post
title: "Style only part of a line path with Raphael.js"
date: 2014-09-21 18:24:31 +0100
comments: true
tags: [Raphael.js, vector graphics, javascript, front-end]
---

If you have a vector line path in Raphael.js and would like to style part of it - highlighting a section of a line graph, for example - you can achieve this easily using the `path.getSubPath()` interface to get part of your path, then adding a new shape on top based on that pathstring.<!--more-->

For example, let's say we had a squiggly line:

{% img center /images/2014/raphael-curve.png A squiggle %}

The line itself is fairly easy to create with Raphael's `paper.path()` method:

{% codeblock lang:javascript Creating a basic path in Raphael.js %}
var paper = Raphael('paper', 640, 480);
var pathString = "M10,10R20,70 30,40 40,80 50,10 60,50 70,20 80,30 90,90";
var squiggle = paper.path(pathString);
{% endcodeblock %}

Now let's say we want to highlight only part of it:

{% img center /images/2014/raphael-curve-highlight.png A squiggle... with a highlight %}

This is pretty simple:

{% codeblock lang:javascript Highlighting part of the path %}
var paper = Raphael('paper', 640, 480);
var pathString = "M10,10R20,70 30,40 40,80 50,10 60,50 70,20 80,30 90,90";
var squiggle = paper.path(pathString);

var subpathString = squiggle.getSubpath(20, 50);
var squiggleHighlight = paper.path(subpathString);
squiggleHighlight.attr('stroke-width' : '2', 'stroke' : '#dd0000'); // make our highlight thick and red
{% endcodeblock %}

The getSubPath method gets us a path string that we can pass to `paper.path()` just like any other. By default, new vector elements are drawn at the front, so it'll appear on top of the original line. If you need to coerce this for whatever reason, there's an `element.toFront()` interface that does just that.

Now let's say we wanted to only highlight the last 20 pixels of the line. I say pixels; pixels on SVG elements are actually arbitrary units based on the size of the viewbox rather than pixels in the browser. But let's assume we're not doing any scaling, so there's a 1:1 mapping between pixels in our viewbox and pixels in our browser. We can highlight the last 20 pixels by simply subtracting twenty from the total line length, which we can obtain with `element.getTotalLength()`, then passing that to `element.getSubpath`.

{% codeblock lang:javascript Highlighting the end of the path %}
var paper = Raphael('paper', 640, 480);
var pathString = "M10,10R20,70 30,40 40,80 50,10 60,50 70,20 80,30 90,90";
var squiggle = paper.path(pathString);

var totalPathLength = squiggle.getTotalLength();
var hightlightPoints = {
	start : totalPathLength - 20,
	end : totalPathLength
};

var subpathString = mainpath.getSubpath(highlightPoints.start, highlightPoints.end);
var squiggleHighlight = paper.path(subpathString);
squiggleHighlight.attr('stroke-width' : '2', 'stroke' : '#dd0000'); // make our highlight thick and red
{% endcodeblock %}

Pretty easy, isn't it? Raphael is a firm favourite of mine.