---
layout: post
title: "Human Vision for UI Designers"
date: 2012-08-15 15:55:09 +0000
comments: true
tags: [ux]
---

*This post was rescued from my old UX blog*

With rare exception, the interfaces we design rely on graphical output. They use text, colour, layout and motion to communicate messages and respond to user activity. Working with a primarily visual medium, then, it’s vital that we understand the capacities and limitations of human vision. <!--more-->

##The capabilities of human vision

###Two types of vision
Broadly speaking, humans have two kinds of vision: foveal, or central vision, and peripheral vision. The fovea is a tiny focal point in our retinas, sat at the centre of our vision, densely packed with light processing cells. The fovea covers the central 3 degrees of our sight – for most users set at a monitor, a circle of 2.5cm diameter on screen. Everything outside this point counts as peripheral vision, with sight cells becoming progressively sparser further away from the fovea.

As you might expect, the biggest consequence is that central vision can resolve detail much better than peripheral, with outer vision becoming increasingly blurred. But there are other differences, too.

###Peripheral vision is colour blind
You may know that vision cells are divided into those sensitive to brightness and those sensitive to colour – rods and cones respectively. What you may not know is that they are distributed unevenly across the retina, with colour cells focused in the fovea and sparse in the periphery. The result is that the further away from the fovea we go, the poorer peripheral vision is at resolving colour. At the outer edges of our vision, in fact, we’re practically colour-blind.

###Foveal vision is brightness-blind
Obversely, foveal vision has very few rod cells. That means that whilst our focal vision is great at spotting differences in hue, it is poorer at seeing differences in lightness. Of course, focusing on extremely bright objects can still harm the vision cells.

###Peripheral vision is motion sensitive, detail insensitive
It’s not just the sight cells that are different in the periphery, but the nerve cells, too. Peripheral vision is dominated by so-called ‘Y’ cells, that are more responsive to rapid changes than sustained stimuli. The result is that peripheral vision is extremely motion sensitive – good for early humans when a rapid motion on the flank might be a hungry predator approaching. The tradeoff, however, is that peripheral vision can’t resolve detail or shape as well as the fovea, whose ‘X’ cells are more sensitive to sustained signals, giving it more precision.

###Humans have poor blue acuity
Humans have very few blue-sensitive cones, but compensate by making these blue cells extra-responsive. The limitation, however, is that whilst blues and cyans can look extremely bright, they cannot be seen in high detail. Slight blue lines and delicate blue shapes will appear slightly blurred.

##The Consequences for Designers

###Peripheral animation is distracting
Animation in sidebars and outside of the user’s focus is extremely distracting. This will be doubly the case if the animation is a particulary magnetic one, like a tracking motion (where an object moves into and out of vision) or a ‘rush toward’ animation. This means scrolling carousels and pulsing buttons in secondary content areas are a big no-no.

###Colour won’t work in the periphery
Humans can’t see colour differences well outside the point they focus upon. Therefore, if a user is likely to be looking in a particular location, then elements far away from that point should not use colour alone as a signifier. Elements ‘out of the way’ – in sidebars or persistent upper toolbars – should not signify updates by changing colour.

If you have an urgent update in a sidebar that a user must see, use animation to draw attention to it for the reasons listed above.

###Users shouldn’t need to use detail or colour vision to discover things
Whenever a user encounters a page, there will be one element that he or she looks at first, before proceeding to evaluate other interesting objects on-screen. But those other objects will be judged as ‘interesting’ or not by the peripheral vision. That means objects the user will not look at first should not require detailed or coloured vision to be understood.

###Avoid blue for elements requiring detail, or text
Blue lines and fine objects will always appear more blurry than their red or green counterparts. So blue is a bad choice for important notification text, or small icons. On the web, blue is also already associated with hyperlinks, so non-linked text in blue is confusing as well as hard-to-see.

##Read More

- *Human-Computer Interaction*; Dix, Finlay, Abowd, Beale; 2004
- *What Is Peripheral Vision?*; Van Rymenant, 2008 [link](http://www.simplifyinginterfaces.com/2008/10/what-is-peripheral-vision/)
- *Color-vision mechanisms in the peripheral retinas of normal and dichromatic observers*; Wooten , Wald; 1974