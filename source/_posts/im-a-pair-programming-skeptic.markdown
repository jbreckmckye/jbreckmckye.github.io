---
layout: post
title: "I'm a Pair-programming Skeptic"
date: 2016-08-09 15:45:50 +0100
comments: true
tags: [programming]
---

I’ve attempted pair-programming several times, including in an organization that (briefly) considered rolling it out as a mandatory process for all engineers (you can guess how well that idea panned out). Personally, I’m not a huge fan. In fact, I’ll go further than that – I’m a downright pair programming _skeptic_.<!--more-->

Of course I’ve always tried to keep an open mind – this is an industry ripe with innovation and continual churn in technologies and practices. You don’t have fun in this game unless you’re happy with habitual change and continuous improvement. But I am so far absolutely convinced that pair programming is kryptonite, at least in the ways I’ve seen it practiced.

The reasons I list below are only my subjective experiences, and I cannot ‘measure’ their impact in concrete terms. But these are the biggest issues I’ve faced:

Having a ‘navigator’ and a ‘driver’ only helps if the former is vocal and the latter will listen.
-------------------------------------------------------------------------------------------------

We’ve all met developers who are stubborn, zealous about some theoretical concern or pathologically unable – psychologically – to ‘throw away’ old work when someone suggests a problem with it. And we all know individuals too timid or diffident to raise concerns or suggest corner cases.

When these kinds of developers are paired, the navigator quickly takes a passive role, and what you end up with is sole-programming with an automatic code review. This is a monumental waste of resources.

Pairing prevents creativity.
----------------------------

Contrary to what was formerly felt about the value of ‘group brainstorming’, the consensus these days is that creative knowledge work requires independence and autonomy. When you’re working alone, you can quickly hack together some crazy idea to see if it’s actually feasible. You can wordlessly assemble some strange prototype, and if you fail, it doesn’t matter, because no-one knows.

Compare that to pairing: when I want to try out some new concept, I have to convince my partner, talk them through the implementation, step-by-step, and hope that they won’t judge me if it fails. That kind of environment is toxic to creating new ideas.

Lowest common denominator design.
---------------------------------

When a pair cannot spin up new ideas, as above, or when the individuals cannot agree on some fundamental principle of how a feature should be designed, what comes out is a muddled design that attempts to compromise and satisfies no-one.

If you pair a developer who builds wonderful, eloquent, skyward functional programming abstractions with a fast-and-dirty performance freak, the code they’ll together produce will typically be neither terribly elegant nor particularly fast.

Lack of autonomy and violent transparency.
------------------------------------------

Violent transparency is a phrase I’ve plucked from a moderately famous (and quite controversial) polemic against the Scrum methodology. It describes the way that some organisations infantilise developers and treat them with the suspicion normally reserved for non-professional workers.

Whatever you think about the ‘harms’ of making developers’ work entirely transparent (and you may not agree it is actually a harm), many individuals value their autonomy and their ability to work alone, trusted to do the right thing. It’s an important psychological need: privacy gives us social status, and to force developers into pairing (as I’ve seen happen in at least one shop) will leave employees dismayed, upset and alienated.

Some developers just don’t play nicely in pairs.
------------------------------------------------

Some people won’t or can’t conduct themselves appropriately in a paired environment. They may have bad hygiene, poor working habits, an abrasive personality, a ‘loud’ and ‘intense’ manner, or a whole host of other attributes that make them fine individual workers, but poor pair programmers.

Can you solve this? Not really. Changing personal behaviour is tough. A pair-programming shop needs to be very careful about hiring and invest a lot of time into seeing how someone works and whether they’ll be able to work well with their peers. Discriminating harder on personality, however, means that hiring will take longer unless you loosen your standards on skills and expertise.

The bottom line.
----------------

Look, I’m sure there are teams out there that make pairing work. I can see how it might in a corporate environment: having an extra set of eyes is probably worth it if you’re tiptoeing around hairy, unpredictable legacy systems that can be easily broken at a distance, or if you’re creating truly mission-critical code, for example.

But – if you need to solve some new problem creatively – if you need developers to try and push the envelope of what’s possible in a short deadline – if you want to motivate your staff with a sense of ownership, individualism and _trust_ rather than one of surveillance and low status – then I am so far surely convinced that pair programming does more harm than good, and that foisting it on your engineers will alienate your most experienced and independent staff.