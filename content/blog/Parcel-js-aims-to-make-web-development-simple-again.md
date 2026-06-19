---
title: Parcel.js aims to make web development simple again
date: 2018-06-10 20:30:29
tags: [development, javascript]
---

In the beginning, there was HTML, and the tag was `<script type='application/javascript'>`. With this little incantation a website author - or 'webmaster' - had the power to launch his or her visitors on a fantastic journey to infoscapes hewn from pure imagination. Exhilarating games, virtual shopping malls, columns of animated flames and those little visitor counters you never see any more. All powered by the humble `<script>` tag.

OK, so the web of the 1990s and early 2000s wasn't terribly elegant. But it _was_ very easy to develop websites. All you had to do was plop some files on an Apache server and point a bit of XML at the appropriate resource. There was no notion of modules, or bundling, or minification, or code splitting. No Gulp or Grunt or Webpack or Broccoli. Just plain old HTML.

What if I told you there was a way to make webdev simple again?

<!--more-->

![](/images/2018/parcel.png)

Parcel.js is a web application bundler, a replacement to the likes of Webpack and Rollup. You give it a HTML file (or JavaScript file, if you prefer), it reasons about all the assets you need, and it outputs them all in a single, specified folder. Where Parcel differs from Webpack is that it requires no configuration whatsoever: no finangling to consume different assets or choose your sourcemap 'strategy'. Parcel just infers it from your code.

At a time of rapid churn and constant change in the JavaScript world, replacing something as fundamental as Webpack might seem like technological arson. But we cannot solve our present problems by doubling down on yesterday's tools. They are, at least partly, responsible for the issues we face. Webpack's plugin-based architecture means managing an enormous list of `devDependencies`, each one prone to change and obsolescence every time the wind turns.

> Is my career as a Webpack whisperer at an end?
> (cries tears of joy) 
> <footer>**conatus** <cite>HackerNews</cite></footer>

In comparison, Parcel simply infers as much as possible from the semantics of your HTML, CSS and JavaScript itself. Need a second HTML file? Use a hyperlink! Need content for an iframe? Set its `src`. Want code splitting? Use the official ES6 dynamic import syntax and everything just works.

Of course, modern web applications rely on much more exotic technologies than 2002 Geocities pages, and Parcel has you covered. It can consume TypeScript files, React templates and Vuefiles out of the box. It can handle your usual range of CSS preprocessors and the production build (passing a CLI flag) will minify, optimise and MD5-version-stamp your assets utterly without fuss.

Should you ever need extra functionality - and in my experience so far, it's been rare - just add a plugin to your `package.json`. Parcel will sniff it out and call it automatically. (Why can't other things be this simple?)

It's also very quick - almost an order of magnitude faster than Webpack 3.x builds, by my count - which is doubly remarkable: one, that builds taking thirty seconds now take three; and two, that this is somehow the least interesting of all Parcel's features.

It is not perfect. The bundler is very new and has a few beta-ish bugs; the documentation is sparse and so far tree-shaking is not supported (though is on the project radar). Nevertheless. Working with Parcel in three commercial projects has been an absolute joy, and has now become my go-to default for new projects. [Try it sometime](https://parceljs.org/)!