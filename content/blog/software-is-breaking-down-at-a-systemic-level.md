---
layout: blog
title: Software is breaking down at a systemic level
date: 2026-11-15 15:45:50 +0100
archived: true
comments: true
tags: [opinion, software, ai]
---

Software hasn't been working too well lately, has it?

This weekend we saw the double-whammy of a 2 day global Microsoft outage that affected anyone reliant on Outlook, then an FAA ground-stop that halted all flights in the United States.

Can you believe it's only been four weeks since the PHP2Shell vulnerability? A critical exploit in PHP, powering an estimated 70% of the world's websites, with sites taken completely offline as engineers frantically patched their systems.

And there was the eMudhra fiasco, where thousands of SSL certificates - the way we secure HTTPS websites and internet traffic - were compromised by a private key so weak, it was almost comical.

Maybe you heard about a Europe-wide hack of industrial fridges, of all things. Possibly an attack orchestrated by Iran. It won't be the last.

What exactly is going on here?

You might be tempted to blame AI, and you wouldn't be completely wrong. Artificial intelligence models are definitely a part of this. Even if companies like Microsoft don't divulge whether broken systems were built with AI, we do know that hackers and researchers can now use AI technology to find complicated exploits in a matter of hours.

But AI is both a cause and a symptom of the problem here. What we are seeing is software breaking down at a systemic level. This problem is insidious because it is not only the software itself that is broken, but the entire way we've come to build it.

## What does it mean for a failure to be systemic?

Look at the recent crises in software reliability and you'll notice they don't share immediate causes - that we know of - yet they look uncannily _similar_ to each other.

### Microsoft

The Microsoft outage likely emerged from a [network configuration failure](https://x.com/tomwarren/status/2121212124508885175) that stopped MS datacenters communicating with each other. Exactly what happened next remains confidential, but it seems to have triggered a cascading failure where no service could be restored into a valid state long enough to bear traffic.

How come? Back in March, Axel Rischin published this [scathing criticism of how Microsoft mismanaged its Azure cloud platform](https://isolveproblems.substack.com/p/how-microsoft-vaporized-a-trillion):

> Microsoft rushed Azure out of the gates under intense competitive pressure. Corners were cut. Fundamental principles of reliability and operational simplicity were quietly abandoned.

> Instead of going back to the drawing board to tackle the growing technical debt, Microsoft relied on quick fixes: layers of automation running mitigation scripts, a growing team of on-call staff, and, when automation was not enough, manual repairs.

His article depicts a highly complex system made of low quality parts, where nobody can make sense of the whole picture.

### The PHP event

On October 21st, security research firm Wiz [proudly shared an exploit that could execute arbitrary code on any PHP website](https://www.wiz.io/blog/php2shell-php-rce). Called PHP2Shell, Wiz trumpeted the power of AI tools to achieve exploits far beyond the skills of human attackers.

It turns out the PHP runtime had several complex memory bookkeeping bugs for over a decade. PHP is used extensively in e-commerce and particularly in Wordpress, which was once the go-to for cheaply building simple websites. 

PHP2Shell depicts an internet dependent on a long chain of dependencies, hiding vulnerabilities too complex for any human to identify.

### Shai Hulud attack, May 2026

Most people outside of tech won't have heard of this, but back in May we had a minor crisis when an attacker compromised some important packages in the JavaScript ecosystem (NPM).

These packages used GitHub Actions to perform Continuous Integration - automated tests, releases, etc. - and had a crucial misconfiguration that meant anyone who forked their projects could insert compromised code back upstream, into the caches used by CI.

When the next Continuous Integration build ran, it would retrieve libraries from the cache. The JavaScript package manager, NPM, allows these packages to contain scripts. The scripts are intended for housekeeping tasks, but here, they were used to hijack the projects' private tokens.

The JavaScript ecosystem has long been criticised for poor security. NPM projects are complicated chains of dependencies calling dependencies calling dependencies. Any dependency may carry scripts. Any dependency author was just one slip away from allowing their code to be compromised - all they had to do was copy-paste the wrong code.

In other words: a highly complex system made of low quality parts, where a single error can compromise everything.

## How we lost control

It wasn’t always like this. Only 12 years ago, tech was a different industry.

Building software was hard. Computer programs comprise millions of tiny instructions, and turning these into a workable system is like constructing a watch by hand, with hundreds of interacting components. Except, unlike a watch, each computer program must do something completely new and different.

It was the most fun I'd had as an adult. You had to be able to hold everything in your head at once: visualise how all the tiny parts could be orchestrated into a cohesive whole. I recommend anyone, even those outside of tech, the adventure of writing a computer program by hand.

But, it was less fun if you were a manager. Not many people can write computer programs well, and it's very hard to scale human beings. Getting them to communicate without misunderstandings is hard. Many projects failed. You can find programmers who know how to manage the complexity, but they want to be paid lots of money.

Different movements attempted to solve the core problem. Some people thought that software development practices could help, like if you turned programming into highly structured templates of "best practices". Or if you used management styles like SCRUM to keep the complexity under control. But they only ever helped so much.

About ten years ago, two small revolutions happened in our industry, whilst the rest of the world paid little attention. They were cloud computing, and open source libraries.

Cloud computing was about substituting your hardware and infrastructure with virtualised infra you could rent from someone like Amazon Web Services. You could click a button in AWS or Azure and it was like a server just popped into existence by magic.

Companies loved Cloud because it allowed them to remove sysadmins and ops people from the equation. You didn't have to wait for someone to actually go to a site and install a rack in a datacenter. The promise was that your software could _move as fast as code_ and not long after, a movement called DevOps essentially ended up merging developers and ops.

Around the same time, GitHub happened.

It was always possible to reuse code from other places - programmers sharing snippets on forums or sites like StackOverflow - but when NPM hit the scene in 2014, it really felt like a gamechanger. You could just add a line to your `package.json`, hit `npm install` and - whoosh - now you could reuse code written by any stranger on the internet.

Teams loved NPM because now they didn't have to solve any hard problems if someone else had solved it first. All of the little components in a program - the cogs and wheels in my watchmaker analogy - were once crafted by hand. Now you could get cogs and wheels and whole mechanisms, for free, forever.

This meant that the programmers could focus less on the details. Instead of figuring out the nitty gritty of, say, spinning up your own database, or writing the code needed to check someone's password, you could just ask AWS and NPM to take care of it.

Open source was great because you had a small number of passionate, unpaid developers, building code that everyone else depended on. You could make millions of dollars from their code, and you didn't even have to be particularly nice to them. People weren't.

Because there were fewer details to take care of, tech professionals began to lose their specialisms. You didn't need a team of ops people, a team of backend developers, a team of mobile developers, a team of testers. You could flatten them into generalists.

And that changed the balance of power between workers and management. Imagine a building site where there is a plumber, a builder, and an electrician. If any one of them threatens to quit, you have a problem, because you need each of them to get the project done. Whereas if you can make everyone a mix of plumber-builder-electrician, they lose that leverage.

But the cost is that nobody really knows the details. You've had to give away control. If AWS increases their prices, or an NPM package is compromised, or your SaaS provider goes out of business, you're in trouble.

The [left-pad incident](https://en.wikipedia.org/wiki/Npm_left-pad_incident) was an early warning of where we were going. Everyone was being made into a JavaScript programmer, whether they liked it or not, and JavaScript was a tangled mess of dependencies. It only took one library author to take down his packages, for the entire ecosystem to break.

People laughed at JavaScript, especially those contemptuous of "web developers", but NPM was just a harbinger of where we were all going.

### And then AI came in

...And, yes, then AI.

A lot has been written about how AI systems are inherently non-deterministic, a kind of slot machine that only creates simulacra of work. Acting like a stochastic parrot, AI generated code will always be prone to hallucinations and bugs.

And there's truth to that. But I think the danger in the present moment is the opposite. It's not so much that the model outputs are crap and unreliable. They're actually pretty good at doing what you ask them to do (though I suspect that only works because Anthropic spends much more on compute than it gets back in revenue).

I think the real AI threat is _decoherence_.

Kristen Maevyn wrote an essay named [The Decoherence Trap](https://maevyn.codes/decoherence) which talks about a problem where the individual parts of a system may look fine in isolation, but don't make sense as part of a larger system.

> Decoherence: the accumulation of locally valid but mutually incompatible or redundant models within a system, such that the cost of change is dominated by translating among those models and preventing unintended side-effects.

Software engineers, as I've seen them working over the last year, have all but turned over all their work to AI agents. It started with small tasks like writing tests, functions, and individual components. But now it's everything - not only the components, but the design, the orchestration, the whole concept.

Programming was the activity of translating ideas and intents from the messy human world into code so crystalline, so precise and pedantic, that even a _computer_ could execute it. It was fundamentally the act of distilling complexity into order, making something real out of nothing, seeing the whole mechanism operate in your mind.

This activity is basically dead. It no longer happens in most tech companies.

Most SWEs now are unable to tackle engineering problems without some form of AI assistance. That's not because they're incompetent - they just can’t keep on top of the complexity. Even if they could once, they now face a tsunami of AI generated code. This is affecting everyone - we are all fighting the tide of small, incoherent changes that look rational in isolation but do not make sense as a whole.

Kristen writes:

> Decoherence grows relative to the rate of change of a system, and it increases faster the more decoherent a system is, resulting in runaway exponential growth. It is not a new phenomenon, and humans have always countered it through carefully finding ways to do more with less, unifying disparate patterns and models into a cohesive whole. However, the widespread use of AI is currently producing it at a rate that is unsustainable.

A form of learned helplessness has emerged, along with a paradoxical false confidence, caused by the ways LLMs provide the illusion of work without actually engendering the heart of the work itself.

This de-skilling of software engineers has shifted the balance of power even further away from employees. AI turns tech workers into generalist "prompt engineers" who, in practice, need only know enough to review and occasionally correct the AI model into producing something that looks like work.

That generalisation reduces their leverage. Whether or not you believe it's a problem if workers lack power - politics aside - it has the crucial effect of silencing the only people in the organisation who can say where things are going wrong.

And it's not just programmers. It's the whole chain, top to bottom. Everyone is using AI.

Claude generates code because the engineer wrote a prompt. The prompt comes from a ticket that was written with Claude. The project manager wrote the ticket based on a summary of a document, that was written by, and then summarised back, by Claude. The document uses statistics from a calculation, by Claude. The statistics pertain to a feature customers want because of something they've heard, about the threat of AI. The business entertains the customer because it is on, or intends to enter, the stock market, and the stock market prioritises short term trends and irrational memes over serious work.

**I believe that tech companies risk losing their "organisational cognition"** - their ability to think and respond as a coherent unit.

This is the real threat: a scenario where nothing in the system is done with intent, and nobody in the system has control. Even the CEOs and the leadership are often having to react to an irrational stock market, or panic about AI making businesses obsolete. I don’t think they are pantomime villains in this situation. They are all swept up in the same force.

Look at all the problems I've outlined. They are about systems of excessive complexity, made of parts that need to work perfectly or else there are calamitous results. And these parts are being individually corroded by cost-cutting, corner-cutting, AI, and - I fear - learned helplessness amongst the people who build digital infrastructure.

Things fall apart. More exploits and outages happen because the complexity is out of control. Fixing them takes longer and longer as the workers have lost oversight of their systems.

This is a threat to all of us. The tech industry is now critical to everyday life. It's the software that controls your flights, your banking, your petrol pumps, your TV, your payroll. It's what allows you to navigate roads and find your friends. It's how you date and how you eat. It's probably how you get your healthcare.

Society has extended trust, too much trust, into technical systems that are now demonstrating wide-scale deterioration. I do not think society, government, or institutions are prepared for a world where the incidents and outages of 2026 become commonplace. I do think the situation will get worse before it gets better.

