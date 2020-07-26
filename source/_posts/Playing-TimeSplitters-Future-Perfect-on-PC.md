---
title: 'Playing TimeSplitters: Future Perfect on PC'
date: 2020-07-26 16:54:23
tags: gaming
---

Like the *TimeSplitters* series? What if I told you it's possible to play TimeSplitters 2 _and_ Future Perfect on PC _with_ mouse and keyboard support to boot. All you need is the Dolphin Gamecube emulator and a helpful controller plugin.

![](/images/2020/ts3-1.png)

<!-- more -->

## Get Dolphin

First, you're going to need an emulator. [Dolphin](https://dolphin-emu.org/) is a reliable, fast, well-supported GameCube and Wii emulator with support for PC, Mac and Linux. You will need to use the Windows build to get mouse and keyboard support (as far as I know), but if you're on another platform you can still play with a joypad.

I used version 5.0 to play the game and was fine.

## Get the game

Dolphin isn't able to play GC games straight off of disk, so you'll need an ISO of a disk backup. Obviously, I can't really provide one. Either you can use a Wii to extract a backup image, or, I suppose you could search the internet for an ISO. Not that I would condone such a thing, of course.

## Get the mouse injector

The mouse injector is a Windows program that intercepts both your mouse and your running Dolphin and translates inputs from one to the other.

### Download

You can either download it from [here](/downloads/mouse-injector-dolphin-50.7z) or the [GitHub repository](https://github.com/carnivoroussociety/MouseInjector).

It's written by a developer named [CarnivorousSociety](https://github.com/carnivoroussociety). If you use this project and have a GitHub account, I'd suggest you star the repo.

### Installation

Unzip the folder and copy the contents into your Dolphin installation folder. You'll notice it overrides the Dolphin.exe file - this is needed so the injector can discover your game.

Open Dolphin and go to the controller settings - make sure the controller profile is set to TimeSplitters.

## Get playing

To make the mouse injector work you have to follow a few steps in order. Don't worry, it's not too complicated:

1. Start the Dolphin.exe you've just copied into the Dolphin folder
2. Start the game from your ISO
3. At the TS2 / TS3 startup screen, load the existing profile called `Player`
4. Run MouseInjector.exe. It should detect the running Dolphin.exe
5. Use the 4 key on your keyboard to switch on mouse input. This will lock your pointer (on your desktop) until you hit 4 again.
6. Get blasting!

![](/images/2020/ts3-2.png)

## Limitations & Troubleshooting

The MouseInjector works pretty well, but there are a couple of moments you might get stuck, at least in Future Perfect

1. On the level `Khallos Express` (the train level with Harry Tipper), you can't defuse the bomb with the default mouse and keyboard controls. Instead you need to:
   1. Save a state
   2. Switch off the Mouse Injector
   3. Switch back to the default controller profile in Dolphin
   4. In TimeSplitters, go back to the default controller setup
   5. Solve the puzzle with the default keymappings for Dolphin
   6. Put the TS controller setup back
   7. Put the Dolphin controller profile back
   8. Re-enable Mouse Injector
2. During the level `Machine Wars` (set in the future, with R-110), during the section where you have to control the tank's cannon, you can't move the aim up and down. You can still beat the section, you just have to be exact with your timings and hit the spacecraft as they fly straight overhead. It is annoying though.