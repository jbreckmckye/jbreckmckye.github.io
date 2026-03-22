---
layout: post
title: "The State of JavaScript in 2015"
date: 2014-12-01 21:33:24 +0100
comments: true
tags: [javascript]
---

The JavaScript world seems to be entering a crisis of churn rate. Frameworks and technologies are being pushed out and burned through at an unsustainable speed. But I think the community will adapt and adopt new practices in response. Developers will move, I believe, from monolithic frameworks like Angular.js and Ember to a ‘pick n mix’ of small, dedicated libraries to mitigate the risk of churn and to allow solutions to different concerns to compete separately.

Obviously, this post has big red ‘opinion’ stickers over it. But hear me out.

<!-- more -->

## Churn

At the close of 2014, it’s difficult as a JavaScript developer to back a particular library or technology with confidence. Even the mighty Angular, which seemed set to establish itself as the One True Framework of Single Page Applications, looks destabilized by recent events.

Let me explain.

In case you haven’t been paying much attention to the `<ng-community>`, October saw the 2014 ng-europe conference, where the Angular developer team revealed significant updates about the roadmap for Angular 2.0\. One of the more controversial revelations was that NG2.0 would be backwards-incompatible with existing Angular code. In fact, several key concepts would be shelved in favour of a brand new architecture. Angular developers would effectively have to get to grips with an entirely new framework.

Understandably, this has upset a lot of people. Rightly or wrongly, the perception was that the knowledge, practices and code that Angular developers had worked so hard on over the last two years had now been arbitrarily deprecated. Worse, the replacement wasn’t even around the corner – it was supposed to be twelve months away. New projects, the naysayers felt, were effectively going to be ‘born to die’ once Angular 2.0 was released in late 2015.

> I honestly didn’t think it was possible for the Angular team to do anything in the 2.0 release that would turn me off. All of the talk of offline first capabilities and dropping support for old browsers to make way for new things sounded great.
> 
> This is a mess. The syntax looks like hot shit, and the huge gap between this and 1.3 means those of us with real jobs where projects live for years and years have to back off. I can’t tell my boss that we’re going to build something incredible, but that we need to plan for a code only, no new features rewrite in 18 months.
> 
> <footer>**jbarkett, Reddit** <cite>[Response to the Announcement on Reddit’s R/programming Board](http://www.reddit.com/r/programming/comments/2kl88s/angular_20_drastically_different/clmi8px)</cite></footer>

There’s a lot of umbrage in that thread directed towards Angular and Google specifically – some of it fair, some perhaps less so. But one of the highest upvoted comments wasn’t about Angular at all – it was targetted towards the whole JavaScript environment:

> As many others here have observed, fashionable webdev now is beyond a joke; I’m seriously glad I got out of it when I did. Once you’re forced to actually deal with this nonsense you either run screaming for the exits or go insane. It’s not even fragmentation, it’s fragmentation cubed. I’ve lost count of the number of MVmumble frameworks I’ve seen pitched as “a framework using Foo, Bar and Baz”, where Foo turns out to be a event library you’ve never heard of with 3% usage share, Bar is a templating library you’ve never heard of with 2% share and Baz is a databinding library you’ve never heard of with 1%, making the combination useful to… I dunno, the author, maybe, for the next five minutes until he switches to a new set of libraries.
> 
> I don’t understand. I don’t understand why anyone thinks this is a good idea. I’ve seen code produced by people using this stuff, and it’s just unbelievably awful, because nobody has time to understand anything when it changes every thirty seconds.
> 
> <footer>**othermike, Reddit** <cite>[Another Response to the Selfsame Post](http://www.reddit.com/r/programming/comments/2kl88s/angular_20_drastically_different/clml1hj)</cite></footer>

Othermike’s issues seem to me really to be issues of _churn_. There are just too damn many JavaScript frameworks, and they’re changing too damn fast too.

Two years ago, JavaScript was ablaze in its own Renaissance, fuelled by a move towards more modern, more standardized browsers (i.e. not Internet Explorer) and the discovery of Node.js as a technology for powering front end build tools. All manner of new technologies came forth. As little as twelve months ago is seemed a fait accompli that the modern web would be dominated by Backbone.js (maybe using Marionette), with Grunt as a task runner, Require.js and Handlebars-based templating. Yet six months later, these technologies had all apparently been replaced, if the blogosphere was anything to go by – now, it was all about Angular, Gulp and Browserify. And then suddenly this stack seems questionable too.

## Is this pace of change sustainable?

> I’m frankly overwhelmed of being exposed to new technologies.
> 
> <footer>**noname123** <cite>HackerNews</cite></footer>

Innovation is great, but this kind of churn rate seems excessive. It’s just not possible for developers to make large, upfront investments of time in getting to grips with new frameworks and technologies when there’s no guarantee of their longevity. Programmers want to program – they want to build things, and be masters of their craft. But how can we get anything done when we’re spending most of our time learning? How can we feel like craftsmen when we’re scrabbling in the dark with unfamilar tech?

Once, corporate sponsorship or the backing of a large organization might have provided a beacon. We could look at a framework built by Google, Adobe or Microsoft, and believe that their support meant a long lifespan and careful stewardship. After the crises of Flex and Silverlight, that time is past.

It’s not just the prospect of our tools being deprecated that’s worrying, though. It’s the idea that we might make the wrong bet; get in bed with a technology only to discover that something new and substantially better is coming over the horizon. If it’s now ‘obviously’ a non-starter to use Grunt, or Backbone, or Require, who’s to say that it won’t be ‘obviously’ a non-starter to use whatever tech we’re considering today six months’ down the line?

## It’s not hopeless

So the situation is difficult. But people are clever, developers are resourceful, and the demand to write new apps isn’t going to let anyone give up. So what are we going to do?

I think there are three key lessons we can adopt:

1.  **Treat new technology with healthy scepticism.** Be wary about pushing that cool new Github project into production. Wait until something is commonly used, has lots of bugfixes and is generally proven beyond doubt to be mature. Wait until the inevitable horror stories (_all_ technologies have horror stories) and tales from the trenches about the use of X or Y in production.

2.  **Be less trustful of corporate backing.** This isn’t the first time Google have pulled the rug out from under the feet of developers reliant on its ecosystem. Go ask anyone who’s had to deal with their web APIs. Companies act in irrational and self-harmful ways all the time. And their interests may not always be the same as yours.

3.  **Prefer dedicated libraries to monolithic frameworks**. When you choose a framework, you make a large, long term committment. You sign up to learn about the framework’s various inner workings and strange behaviours. You also sign up to a period of ineffectiveness whilst you’re getting to grips with things. If the framework turns out to be the wrong bet, you lose a lot. But if you pick and choose from libraries, you can afford to replace one part of your front end stack whilst retaining the rest.

I think this third practice is already underway.

## Libraries > frameworks?

In the aftermath of the Angular controversy, another Reddit thread asked [what technologies JavaScript developers felt like migrating to](http://www.reddit.com/r/javascript/comments/2lif0z/now_that_angularjs_has_gone_down_a_bit_of_a_weird/).

Here’s what r/javascript had to say:

*   React.js with Flux (a view-only library and an eventing module)
*   Ember.js (a full MVC framework)
*   Knockout.js (view-only library)
*   Backbone.js (full MVC framework)
*   Meteor (full isomorphic framework)
*   Mithril (full MVC framework)
*   Ember (full MVC framework)
*   ‘No framework; just lots of libraries’
*   Vue.js (view-only library)
*   Breeze.js (model-only library)
*   Ractive (view-only library)

What’s interesting is how many of the options aren’t full-fledged frameworks at all, but specialized libraries – mostly for data binding to the DOM. One person suggested “no monolithic framework but modular components that do one thing well”. Here’s how one person responded:

> I really think this is the best answer. There will never be a perfect framework so you can just hack the most relevant features together using npm. I find the documentation of these small components is often really simple. Any problems and there’s no waiting for the next release of the entire framework, you simply throw up an issue, the authors fix it, push it and then bam it’s on npm for everyone else and no other components have been disturbed.
> 
> If you find you don’t like the templating language or error handling, you don’t have to rethink the entire project, you just hot-swap the component for another and you’re on your way again.
> 
> <footer>**krazyjaykee, Reddit** <cite>[Now That AngularJS Has Gone Down a Bit of a Weird Route, What Are Some Good Alternatives?](http://www.reddit.com/r/javascript/comments/2lif0z/now_that_angularjs_has_gone_down_a_bit_of_a_weird/clvbzu1)</cite></footer>

I feel this way too. By using small libraries – components with a dedicated purpose and a small surface area – it becomes possible to pick and mix, to swap parts of our front end stack out if and when they are superceded. New projects can replace only the parts that matter, whilst core functionality whose designs are settled – routing APIs, say – can stay exactly the same between the years.

Libraries stop being an all-or-nothing proposition. What if you like Angular’s inversion of control containers, but hate its data binding? No problem – you can just choose what you like from NPM and get going right away. You can move your legacy projects (read: the ones that make your employer money) to new technologies incrementally, rather than rewriting everything, providing you stick to good practices and wrap those libraries carefully.

What’s more, when different problems are answered by different libraries, their solutions can compete directly. If Framework A does X well and Y badly, compared to Framework B’s great Y and shaky X, you’re stuck. But if Library A and B both try and do X, they can compete in a direct fashion in discrete and measurable ways.

## tl;dr

*   The churn rate of front end JavaScript technologies is problematic
*   People are starting to feel burned out and alienated by the pace of change
*   The answer might be to eschew monolithic frameworks in favour of microlibraries

Of course, we’ll see how much of this actually happens in 2015\. It’s entirely possible that Angular’s dominance will remain stable despite the wailing and gnashing of teeth – it is, after all, popular for a very good reason. If so, Angular’s position could be secured in an industry looking for standards and stability amongst the turbulence of the last two years. It’s also possible that another monolith might take Angular’s place. An informal combination of React, Flux and Browserify seems the obvious candidate.

Whatever happens, it’s hard to see the technology slowing down. Let’s see what happens. Come tell me what you reckon on [Twitter](https://twitter.com/jbreckmckye). (_Note: due to popular demand, I have now enabled comments on this blog. So get typing!_)