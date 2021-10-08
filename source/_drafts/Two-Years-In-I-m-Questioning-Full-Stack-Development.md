---
title: 'Two Years In, I''m Questioning Full Stack Development'
date: 2021-08-30 11:30:08
tags: software engineering, full stack development, front end development, back end development
---

About two years ago I transitioned from front end development to a more full-stack career: building backend systems in Node and Haskell; frontend clients in React and TypeScript; and occasional forays into mobile with React Native. I thought full stack would broaden my horizons and finally make me a 'real' programmer.

Now I'm questioning whether wholly full stack teams are really the way forward. I'm starting to argue more and more for the value of specialists in an increasingly complex domain.

<!-- more -->

## What exactly is 'full stack'?

The term arose as a way to describe someone who works on both the client and server components of a system, at the point when that became unusual. I'd say I first heard it in 2014.

"Full stack" is a contentious term, though, because in practice its remit is highly porous. Does a full stack developer do _anything_ client related, or just work in a single framework? Can they work in several backend languages? Do they know how to work with a variety of databases? How much infrastructure and networking code do they write? Can they do mobile?

One thing I've observed is that different programmers come to this conversation with very different expectations, I suspect because in practice each team carves out its own subset of technologies and practices:

- in company A they write React and backend Node, with some MongoDB work. Deployment and infra is left to a separate team (ironically called a "devops team", despite only interacting with the engineers through JIRA tickets).
- in company B they are Java developers who work with lambdas and DynamoDB. Occasionally they make changes to a client written in Vue. The client code is hairy and no-one really likes touching it, but the devs do love their Terraform work and `atlantis apply`.
- in company C they are essentially traditional front end developers who work on Express servers. There is a separate group of back end specialists.
- in company D they do absolutely everything! Everyone is full stack at company D.

All of the above people get called "full stack software engineers".

In my own 'full stack' roles, the term has meant (examples not in historical order):

- backend Haskell and TypeScript; frontend React and React Native; occasional Java and Objective-C programming whilst working on native clients; some older systems in ReasonML (a compile-to-JS language based on OCaml)
- frontend vanilla JS and React dev with some backend Express (Node) work; 3D programming with Three.js; Android JNI work in C++
- frontend React with backend TypeScript lambdas; PHP microservices; MySQL and DynamoDB persistence; AWS and CloudFormation; Python bits here and there

That's a massive panoply of technologies. Which leads me to this conclusion:

## Full stack is too large: either you subset it, or you burn out

I chose the latter.

I remember my first, quite hellish PagerDuty rotation in a new company as a full stack developer. In the space of a few days I experienced:

- a mysterious reccuring dynamic linker error `Inconsistency detected by ld.so` blowing up a critical microservice
- bizarro crashes in a native-code MapBox extension on the iOS app distribution
- a poisoned message cascade in AMQP
- chasing a fix where no-one could release the front end app due to a Jest garbage collection bug
- a, shall we say, *deep-end-first* introduction to Kubernetes
- simultaneously having to code review a > 250 _file_ pull request rewriting another microservice, which was blocking a release with a hard deadline in two weeks. _Rapido rapido!_

Would this situation have been any less stressful if I'd only been working front-end, as I was accustomed? Maybe not less *stressful*, but the sheer surface area I had to cover meant I was always on the back foot. I had to approach each new problem from complete first principles.

A production issue is not the time to be asking "okay, so I've not used this kind of database before, I assume this is some kind of hash, I assume this is some kind of B-tree...". It's not the time to be going "okay, I've never used ReasonML before, but from the sparse docs I can find this resembles a monad stack, so I think the issue is...".

Being a full-stack _developer_ is doable inasmuch as you can do 80% of the work with a technology by learning 20% of its API / DSL / language / whatever. The problem is that software _engineers_ find themselves solving problems outside that happy path, which is what constitutes the other 80% of that knowledge.

Combining on-call with full-stack is exposing your developers to the hardest problems under the hardest constraints. Even if you don't care about their experience, surely, this isn't going to lead to the best _results_?

Going through those on-call rotations didn't leave me feeling 'empowered' or 'invigorated'. Maybe for the first few days. Before long I burned out. I still feel the pit of my stomach drop when someone puts me on on-call rotation.
