---
layout: post
title: "Octopress makes blogging about programming a cinch"
date: 2014-08-19 13:05:35 +0100
comments: true
tags: Octopress blogging
---

Are you a programmer? Do you want to blog about your ideas, but want it to be as simple as possible? Octopress might be the tool for you.

As a software engineer working on a particular problem or technology, you probably find yourself making observations about what does and doesn't work. But what happens to these insights? Writing them down in blog format can help consolidate your ideas, and it allows you to show your engagement to future potential employers. I want to talk a little about the blogging solution that I use, [Octopress](http://octopress.org/), and why I think it’s a great choice for software engineers in particular.<!-- more-->

##What is Octopress? Some kind of WordPress plugin?

No. Octopress has nothing to do with WordPress. Octopress is a blogging platform built upon [Jekyll](http://jekyllrb.com/), a Ruby-based static site generator that creates flat, static HTML, CSS and JavaScript files for deployment to a simple webserver, without any scripting or database dependencies. As a static site, an Octopress blog is incredibly simple to deploy (you can just FTP to an Apache instance), cheap to run (you can serve Octopress blogs for free through [Github pages](https://pages.github.com/); or at low cost through something like [Amazon's S3](http://aws.amazon.com/s3/)) and inherently robust, scalable and secure. You never have to worry about bots finding vulnerabilities in your CMS backend because you don't _have_ a backend.

##What's so good about Octopress?

I’ve been using Octopress for my own technical blog for a few months now, and it seems to be built for programming blogs first and foremost. Octopress features -

* Pygments syntax highlighting: Octopress comes with Python-based Pygments, which provides full, IDE-style highlights for code examples in pretty much every source language from ActionScript to YAML, which you can then customize with CSS. Escaping code blocks in WordPress is a massive pain, but with Octopress it’s _scarily trivial_. This is probably Octopress' killer feature
* Out of the box support for publishing straight to GitHub pages, which is free and simple to use
* Markdown based posts: Markdown is a pleasure to write in, has a very simple syntax, and makes your blog source intrinsically portable
* Octopress loves GitHub: Comes out of the box with Gist and repository sidebar plugins. This is a big plus.
* Very well designed default themes with responsive CSS. If you don't want to tinker with themes, Octopress' defaults will give you a mobile-friendly, professional-looking website.
* Built in support for third-party services like Google Analytics

##But why not Wordpress?

For me, it all boils down to this: using WordPress made me concentrate on running the blog rather than writing content. I didn't like the default themes and ended up writing my own (and I hate PHP); it made me manage brittle plugins and just wouldn't play nicely with code snippets, no matter what plugins I used. **Octopress' out of the box designs and developer-centered functionality let me concentrate on writing about technology and talking about code**.

The other issue is that security is a bit of an issue with Wordpress installations - in May, for instance, this site had over 3,000 GETs to a non-existent /wp-login page, attempting to brute-force their way in. Don't get me wrong, you can keep a WP instance safe - but you have to constantly update both the blogging engine and any plugins you use. And those plugins provide an increased surface of attack that you need to be careful about. I want to be spending my blogging time solving problems, not caretaking the platform.

##Aren't static sites less functional? What about comments and searching?

Whilst using static blog loses you a PHP/SQL backend, there’s still a lot you can do with JavaScript-based enhancements and services like Disqus or Facebook comments (that you may end up using in a WordPress installation anyway). Searching can be done with a simple Google site search if needs be.

Of course, some people won't feel comfortable with these compromises. A Google site search won't feel integrated with the rest of your site, and you might not like the idea of handing comments over to a third party. Personally, I think the advantages (below) far outweigh the costs. YMMV.

##Let’s say I’m interested… how would I use it?

Dependency-wise, you will need Ruby and Python on whatever local machine is used to generate the static files. If you’re working on Windows, use RubyInstaller – it’ll make your life much easier. You will also need to add relevant Ruby and Python entries to your system path. You can clone the Octopress project and then use the included bundler gem with Ruby to install and bootstrap everything. Once everything’s installed you can use rake to generate your files, deploy to GitHub pages / rsync / Heroku, etc. etc. Go read the [Octopress setup pages](http://octopress.org/docs/setup/) if you’re interested.

##Let's say I'm unconvinced. Who's reviewed Octopress alongside other solutions?

Let me give you some links...

+ [Matt Gemmell - Blogging with Octopress](http://mattgemmell.com/blogging-with-octopress/) - _Positive:_ "WordPress is excellent, but over-featured for what I need"
+ [Ryan Bosinger](http://www.ryanbosinger.com/boztown/2013/03/07/octopress-vs-wordpress/) - _Positive but with mixed feelings_ : "WordPress has become a full-on CMS. Octopress doesn’t have any of these features and that’s why some people like it - it's lightweight"
+ [Mike Rooney](http://mikerooney.rowk.com/2013/02/11/migrating-from-octopress-to-wordpress-really/) - _Negative:_ Mike lists his limitations. They're worth reading before you make the plunge.

Whatever you choose, why not come tell me about your new blog by sending me a tweet at [@jbreckmckye](https://twitter.com/jbreckmckye)?