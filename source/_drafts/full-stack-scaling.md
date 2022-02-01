---
title: "After three years of full stack development - I'm not sure it scales"
date: 2022-01-09 20:43:19
tags: [software-engineering]
---

January marks the end of a three year stint as a "full stack" senior engineer, and over that time I've come to conclude that this way of working isn't scalable outside the specific usecase of startup development. The different layers of software engineering are simply too deeply complex for any one individual to master them all; and deep mastery is needed to be truly productive and - especially - perform on-call without burnout.

I'm now moving back to a focus on frontend - specifically front end tooling and metaprogramming - and I think this marks a good time to reflect on both the personal reasons for that move, and my general advice to CTOs, VPEngs, engineering managers and ICs alike who are considering the "full stack" model for their engineering teams.

<!-- more -->

## Being clear what we mean

To begin I'd like to clear up some terminology: "full stack" is a fuzzily-defined term, at best. I've been in some teams who use "full stack" to mean "our front end developers write occasional Node apps to serve the HTML and JavaScript", or "the backend devs update the React CRUD app once a year".

On the other end, I've _worked_ "full stack" jobs that have covered the full gamut of frontend, backend, infra, mobile, and data engineering simultaneously (there was even the dim threat of having to do embedded C++ as well, which mercifully never happened).

The closer you are to the left side of this equation, the less this post might apply to you - _right now_. But it might apply _later_ as your organisation grows, though, or as the kinds of software your team produces changes.

(If the idea of chasing segfaults from an Objective-C iOS module exploding on user's phones *whilst* resolving a Jest memory leak issue in CI *and also* battling a Haskell app that intermittently explodes in production with `ld.so` errors failing to allocate the function stack ... sounds like a challenging on-call rotation to you, you may have an idea why I'm not doing it any more.)

I'm going to split my argument into four main parts:

- What "full stack" promises - and where it delivers
- Experiencing "full stack" as a day-to-day developer
- How "full stack" on-call nearly led me to burnout
- How "full stack" let me down from a longer term view

Finally, I'll describe the situations where you might _start_ with the full stack model, and how you then migrate.

## What full stack promises

I've had a few conversations with engineering managers and technical leaders about why their teams are full stack, and the arguments often come down to

- If one person can build the client and server, there's less context to communicate
- If one person can fulfill multiple roles, there are fewer gaps in our planning
- We'd rather hire someone who can do half the job, and upskill them, than hire specialists

There's usually nothing to do with engineering quality or building great software for users here, and at the heart of it I think is the assumption that either the work being done is relatively easy (enough so to be interchangeable), or the hard work isn't going to be instrumental to the team's success. We'll come back to this.

In the idealised scenario, a single programmer could take on a whole feature to develop by themselves, writing everything from CloudFormation templates for ElastiCache nodes to high-performance database queries to well-designed DDD / IoC / FP microservice code down to an idiomatic React(Native) client that performs transactions on web, iOS and Android at a buttery smooth 60 frames per second with few GC pauses under adverse runtime conditions on a full range of devices.

Obviously, no person can actually do that, so a fallback may be to say the whole team can be "mobbed" onto the next highest development priority. "Mobbing" and pair programming (in theory) resolves any knowledge gaps because it's believed that two programmers on a dodgy WiFi Slack call explaining everything to each other twice can work with the same efficiency as one person who knows their domain.

For software engineers (or aspiring engineers) the promise is more opportunities for work. Everyone wants to be employable, and being full stack makes you down for everything. You see the same thing reflected in things like bootcamp programmes: most are centered on full stack or front end because that opens up the most jobs. It's human economics.

## What it's like day-to-day

The best and most terrible thing about full-stack as an individual contributor is the _variety_.

At its best, every day is an exciting opportunity to solve novel problems with new technologies that demand you engage with them from first principles to build a coherent mental model whilst also shipping well-rounded features that balance the concerns of client, server and infrastructure. It can, at first, be truly exciting and rewarding.

At its worst, every day is an arduous slog having to solve novel problems with technologies you barely know, that demand you engage with them from first principles under a tight deadline to learn _just enough_ to get a feature over the line with no idea if you've really built things the "right way" because there simply isn't the headspace to think it through. By the time you know what you're doing, you're shoved onto a completely new feature, sometimes in a completely unfamiliar programming language, and the cycle begins again.

Being a generalist makes you great at solving general problems, but the specifics don't stick. Remember how this Haskell _Servant_ app handled `OPTIONS` requests? Ah, was that before I got shunted onto the OCaml thing? Was it like _this_? No, I'm thinking of that horrible legacy PHP app written in _Lumen_. Can't remember! Back to the docs and first principles! etc.

Being a specialist gives you the chance to bed down knowledge with repetition and practice. It gives you enough exposure to a domain to gain a _feel_ for its patterns and antipatterns. You learn what good _looks like_ by force of recognition. Generalism doesn't get you that.

In the best-case scenario what actually happens is that an organisation alights on a very narrow vertical of the full stack, excludes mobile and data engineering, and asks its "generalist" developers to become specialists in that. So what you _actually_ are is a React + Express + PostgreSQL + in-house-subset-of-AWS developer, at least for this job, until you have to work on some legacy service or a new team wants to diverge from the stack.

And that's the worst of both: a specialism bounded enough to _just about_ master, but not directly transferrable to any other employer.

The other pattern I've seen - lamentably - is for "full stack" to mean "back end" with the client side treated as an afterthought. Web / mobile, the thinking goes, is just easy programming for babies putting together UI components, so we don't need any expertise in this. Naturally the front end / mobile app accumulates tech debt and before long degrades past the point of no return.

Of course, even working as a complete generalist, you can still _do_ the work. You learn the _transferrable_ skills and, well, transfer them. You aren't terribly productive, though. You don't recognise the libraries or understand the exceptions or remember that obscure Stack Overflow question you read on something simliar four years ago because - there isn't that level of depth. Depth forms intuition.

Productivity is the real sacrifice of full stack development, but the costs are hidden because it _looks_ like everyone on the team is fully utilised. A little knowledge is a dangerous thing and taking the full stack model makes everyone an amateur. In the long run, it effects scalability: the quality of code, the efficiency of developers, and non-functional requirements like performance. That's why I don't think it _scales_.

## What it's like on-call



## My disappointment with full stack





