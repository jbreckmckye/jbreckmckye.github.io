---
layout: post
title: "Slideshow: Breaking the 1000ms 'time to glass' mobile barrier"
date: 2014-08-05 19:41:19 +0100
comments: true
tags: [front-end, performance, links]
---

I found a nice slideshow by Google’s Ilya Grigorik a few weeks ago, taking an overview of the essential issues in optimizing initial web page render time.<!--more-->

The talk was mobile-oriented, but many of the same concerns apply to desktop sites. You can find the slides on [Ilya Grigorik's blog](https://www.igvita.com/slides/2013/breaking-1s-mobile-barrier.pdf)

Some key points:

+ 4G is not a 'magic bullet' for mobile performance problems. Our customers are going to be stuck with 3G for quite some time, and TCP-slow-start imposes harsh bottlenecks.
+ Waking up the radio on mobile devices is slow. Radio is typically turned off after idling for 100ms; subsequent requests suffer a significant warm-up penalty, even on 3G (where it can be up to 2.5 seconds)
+ Rendering is blocked as the browser constructs the DOM and CSSOM. Inlining ATF (above-the-fold) styles and bootstrapping further styles asynchronously may be a useful strategy
+ Inlining styles for above-the-fold content might be a wise strategy
