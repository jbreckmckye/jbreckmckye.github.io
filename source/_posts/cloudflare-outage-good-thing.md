---
title: "The Cloudflare outage was a good thing"
date: 2025-11-18 21:09:48
tags: opinion
---

Cloudflare, the CDN provider, suffered a massive outage today. Some of the world's most popular apps and web services were left inaccessible for serveral hours whilst the Cloudflare team scrambled to fix a whole swathe of the internet.

And that might be a good thing.

<!-- more -->

The proximate cause of the outage was pretty mundane: [a bad config file triggered a latent bug in one of Cloudflare's services](https://x.com/dok2001/status/1990791419653484646). The file was too large (details still hazy) and this led to a cascading failure across Cloudflare operations. Probably there is some useful post-morteming about canary releases and staged rollouts.

But the bigger problem, the ultimate cause, behind today's chaos is the creeping centralisation of the internet and a society that is sleepwalking into assuming the net is **always on** and **always working**.

It's not just "trivial" stuff like Twitter and _League of Legends_ that were affected, either. A friend of mine remarked caustically about his experience this morning

> I couldn't get air for my tyres at two garages because of cloudflare going down.
> Bloody love the lack of resilience that goes into the design when the machine says "cash only" and there's no cash slot.
> So flat tires for everyone! Brilliant.

We are living in a society where every part of our lives is increasingly mediated through the internet: work, banking, retail, education, entertainment, dating, family, government ID and credit checks. And the internet is increasingly tied up in [fewer and fewer points of failure](https://arstechnica.com/gadgets/2025/10/a-single-point-of-failure-triggered-the-amazon-outage-affecting-millions/).

It's ironic because the internet was actually designed for decentralisation, a system that governments could use to coordinate their response in the event of nuclear war. But due to the economics of the internet, the challenges of things like bots and scrapers, more of more web services are holed up in citadels like AWS or behind content distribution networks like Cloudflare.

Outages like today's are a good thing because they're a _warning_. They can force redundancy and resilience into systems. They can make the pillars of our society - governments, businesses, banks - provide reliable alternatives when things go wrong.

(Ideally ones that are completely offline)

You can draw a parallel to how COVID-19 shook up global supply chains: the logic up until 2020 was that you wanted your system to be as lean and efficient as possible, even if it meant relying totally on international supplies or keeping as little spare inventory as possible. After 2020 businesses realised they needed to diversify and build slack in the system to tolerate shocks.

In the same way that growing one kind of banana, [nearly resulted in bananas going extinct](https://www.treehugger.com/extinct-banana-5201723), we're drifing towards a society that can't survive without digital infrastructure; and a digital infrastructure that can't operate without two or three key players. One day there's going to be an outage, a bug, or cyberattack from a hostile state, that demonstrates how fragile that system is.

Embrace outages, and build redundancy.