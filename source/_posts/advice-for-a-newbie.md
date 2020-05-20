---
layout: post
title: "Advice for a Newbie"
date: 2016-01-12 15:45:50 +0100
comments: true
tags: [javascript, industry, opinion]
---

I recently received a question from a reader of this blog. I thought I’d share the exchange here.<!--more-->

{% codeblock %}
    If you don't mind, would you be willing to offer some 
    guidance to someone (me)trying to teach themselves 
    enough programming to launch/test a couple of MVP web 
    and/or mobile apps, and to possibly get a job in 
    programming one day?
    
    [...]
    
    I am happy to say that a lot of what I am learning is 
    making sense, but I can't help but look forward and 
    think that I am going to be totally lost amidst a sea 
    of platforms and frameworks if I stick with Javascript.
    
    As an example, I did a tutorial and launched a super 
    simple app on AWS's Elastic Beanstalk, and the tutorial 
    documents were written with Jade and Express.js. So, 
    I thought, well, I just need to learn Node, Jade and 
    Express and I'll be on my way...
    
    But what you're saying about skipping frameworks in your 
    blog post, and focusing on microlibraries really resonates 
    with me, if for no other reason than I think Jade and 
    Express might be obsolete by the time I finish learning 
    them.
    
    All of this has me very seriously considering giving up 
    Javascript and trying to learn Xcode and Swift, when at 
    the end of my experimenting with my own apps, I might have 
    a marketable skill to present to future employers.
    
    If you think I should stick with Javascript, what things 
    would you recommend I learn, and in what order?
    
    I really appreciate your help.
{% endcodeblock %}

My reply
--------

Hi. Sorry I didn’t reply sooner.

So, as I understand it, you’re looking to write web and mobile apps – becoming a software engineer as a career is secondary. That makes a lot of sense, really – writing apps is a great way to put to practice some concepts you’ve been thinking about, and gives you first-hand experience of what you’d be doing as a programmer in your day job. So I absolutely recommend having a real project to work on when learning how to program, and using your experience of that project to validate programming as a career.

I think your best option, then, is to choose an environment where you don’t have to make many choices about frameworks or build tools, but can instead concentrate on getting your ideas onto screen and getting feedback from users.

Right now, there’s much abuzz about the web as a platform. But as you’ve seen yourself – and as I wrote in that blog post – it’s all still a little immature. I think things have calmed down somewhat – developers are converging on React as the view technology of the future – but there are still big, wide open questions about how we write JavaScript applications that have yet to be solved. Do we use Flux? Do we use Reflux? Do we replace Flux and Reflux entirely with kind of FRP approach (e.g. Rx.js)? How do we build our apps? Do we use Gulp? Do we use Grunt? Do we use Webpack? JSPM? Rollup.js? Browserify? Plain npm tasks? Make? Which transpiler do we use? Babel? Traceur? And what plugins for all of these technologies? These are endless decisions that have to be made for even quite trivial applications, and as someone starting out, I can imagine this is really offputting.

I don’t know the iOS platform very well, but if you already own an Apple machine, you can try out Swift and XCode for free. I would be very tempted to look at that route, because I suspect you’ll find there are fewer decisions you have to make about packaging and frameworks – leaving you more free to concentrate on the code you actually want to write. I only have a passing familiarity with Swift, but it does look like a very well-designed language. I know Apple developer documentation tends to be really well-written, too (they invest a lot in their training resources, because developers keep their platform alive).

If you do decide to go down the web route – maybe you find that Swift doesn’t work for you – my advice would be to keep things really, really simple for your first app. ‘Simple’ in this context means:

*   no transpilation or module bundlers at this stage. You won’t be able to write ES6, which is a shame, but might be a blessing in disguise: you’re learning a smaller language that you can master much more quickly, and nothing you learn in ES5 is going to be obsolete when you do finally move on.
*   use a simple templating library for rendering your views. I wouldn’t worry about React or JSX at this stage. You should try and keep your model code and view code separate – for example, if you have a table of items in a shopping basket, don’t mix the code that adds items with the code that adds elements to the table. Make a change to your model code and then render the model using the templating library. You might find that underscore / lodash’s templates are good enough, and they’ll provide a lot of help with the model code, too.
*   avoid using jQuery; try and learn how to manipulate the DOM yourself. MDN (the Mozilla Developer Network) provide a great resource for web APIs.

Some people might really disagree with the above. They might say it’s imperative that you start with a framework, that it’s irresponsible to tell people not to learn ES6. I think these people have – very simply – forgotten their own journeys as front end developers. Working on the web, you already have to learn about CSS, the DOM, SVG, cookies, localStorage… a whole morass of disparate technologies. Worry about that first.

If you really want to get to grips with a particular technology for the sake of your CV, make it Jasmine or Mocha, and learn how to write tests for your code. That will have much more longevity than any kind of React/Angular/Vue/Mithril-fu.

Hope that’s some help – Jimmy

Over to you
-----------

Do you think I gave my correspondent good advice? Is there anything else you’d like to tell him?