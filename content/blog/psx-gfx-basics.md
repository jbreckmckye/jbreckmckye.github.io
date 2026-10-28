---
layout: blog
title: "How did PSOne graphics work?"
date: 2026-10-14 15:45:50 +0100
archived: true
comments: true
tags: [videogames, playstation]
---

# How did PSOne graphics work?

The 1994 PlayStation was an icon of design and technology. Whether you were Team Sony or Team Nintendo (or holding out for the Sega Saturn) the PlayStation was inescapable - a cultural phenomenon. PSX games had a distinct aesthetic that made them easy to identify - low polygon models, crunchy textures, certain kinds of warping and jitter due to the peculiarities of the hardware

(image: siphon filter / ffvii / ridge racer / mgs)

As a technically-minded PlayStation fan (or a curious techie) you might have wondered how the console's graphics _worked_ - what it was about the hardware that led to the "PSX aesthetic".

Well, as luck should have it, that's exactly the blog post you've clicked on.

## We gotta understand the hardware

The PlayStation was a fifth generation console, along with the Saturn and N64. What made this generation different was dedicated 3D hardware - chips that could do specialised 3D maths far faster than any ordinary CPU. Like the graphics card in your PC, these worked in tandem with the CPU and owned most of the "pixel pipeline".

Really this was a continuation of a trend that started in the 80s. Very old consoles had "monolithic" designs where the CPU controlled pretty much everything, even generating the video signal. Gradually designs shifted to be more _distributed_, with responsibilities separated across components. Even as late as the Super Nintendo, the CPU was still very much _involved_ - manipulating individual video scanlines to create interesting visual effects. But this became prohibitive, as the amount of graphics processing necessary exceeded the bandwidth of CPUs and memory.

So the PlayStation splits responsibilities over four sub-systems, and these will be the main characters of our story:

- Graphics Processing Unit
- Video RAM
- CPU
- Main RAM

(image: highlight on the board)

To understand how they work together, it might be helpful to work _backwards_ from the TV right back to the CPU.

## Working backwards from the video

The signal to your TV comes from the **Video Encoder** which is a part of the GPU. Its job is to read digital pixel data in VRAM and generate an analog video signal.

The pixel data is a _raster_, a grid of numbers representing the colour of each pixel. The PSX supports multiple resolutions, but a typical raster might be 320x240.

(diagram)

Where does the raster come from? Well, _also_ the GPU. The heart of the GPU is about **drawing** where it takes a series of _commands_ - triangle here, texture there - and follows them to produce pixels.

These commands (also called packets) are completely 2D. They will be things like "draw a line from (10,15) to (206, 201)". Or "load this texture for the next shape". They're processed in order, making the GPU a very fast but slightly dumb "pixel factory".

(diagram)

So you can see that the GPU can work in a _drawing_ mode and in a _display_ mode. As such there are usually two rasters in VRAM at any time. Every frame, they swap, so the display and drawing happen independently without stepping on each others' toes. This is called _dual buffer rendering_.

(diagram)

We said the GPU processes commands / packets. These generally come from the main RAM, or they can be sent directly from the CPU itself.

### Nitty gritty section: memory mapped IO

> The next couple of paragraphs go into the nitty gritty of how the memory goes from the CPU to other components. Actually if you were a real PlayStation programmer in the 90s you wouldn't strictly need to know this! You would in fact be using an **SDK** that would abstract away a lot of these details. However, if you are reading this article, you're probably a curious person, so I figured you might be curious how this part works.

### Okay... what about 3D?


## The whole pixel pipeline

## Limitations of the system

### Jitter & wobble

### Texture warping

## A little bit of PSX programming

## Making it look nice

### Pre-rendered backgrounds

### Texture compression

### GTE tuning

## Further reading

