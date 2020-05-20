---
title: Why Take Home Tests Suck - And What To Replace Them With
date: 2019-05-26 14:47:32
tags: industry, opinion
---

Take home technical tests are bad for both candidates and employers. For candidates, they are large, high-risk investments of time, writing code against unclear criteria, before they can tell whether a job is worth persuing. For employers, they are time consuming, slow, and fail to assess applicants on the most relevant, real world skills. The purpose of this post is to try and convince hiring managers and technical leads that take home tests suck - and that there is a simple alternative that is much faster, much fairer, and better for all.

<!-- more -->

## What exactly are 'take-home tests'?

Sometimes termed 'homework projects', these tests are screener activities for software engineers, asking the applicant to build a piece of software or software component. The size of the task varies enormously, from (theoretically) two hour, highly streamlined tasks to full web applications taking over a week to build. They are typically used as a gateway before the candidate can come in for a face to face interview.

They are not exactly popular. A minority of employers use them to essentially collect free labour or crowdsource solutions for their proprietary problems; others set increasingly unrealistic demands. I personally have been burned by them several times, and nowadays choose not to complete them - and it appears I am not alone.

## What don't candidates like about them?

Developers typically have five basic objections to homework projects:

1. Unrealistic timelines
2. Capricious assessment criteria
3. High cost, low reward
4. Incompatible with care or overtime committments
5. An asymmetrical investment of time

### 1. Your 'three hour' coding test is more like eight

...and your 'two day' coding test is more like five.

In my experience, the parameters of take-home tests are typically set quite haphazardly, by people who might never take the test, and who will almost certainly never verify their assumptions about the feasibility or suitability of the project they are setting.

Developers are bad enough at estimating timelines for their own work, even under the rigor of rituals like planning poker and point projections. Ask them to estimate work for someone else without those tools and you can easily end up with a task that might require a full day's work from a on-staff engineer being revised down to 'two, maybe three hours tops'.

This puts applicants in an awkward position. If they stick to the timelines set, they will be outcompeted by those more able to sacrifice their free time. If they take longer, they are multiplying their risks and opportunity costs. And if they negotiate a truncated timeline, there's no guarantee the reviewer will even respect that.

The latter happened to me, the last time I accepted one of these homework tasks. A mid-sized company in London - let's call them _Zap_ - sent a test, with the promise it would take only 'two, maybe three hours'. Warily I accepted, only to open the README and read that I was expected to take 'eight or so hours'. I just didn't have the time for that - I was doing crunch for my existing job - and asked if three hours' work would be enough. _Zap_ replied in the affirmative, agreed to review just a subset of the work, then 48 hours later rejected my application because... I had only completed the subset of the work, the subset I had agreed with them.

It could be worse. A couple of years ago I corresponded with a company doing CRISPR applications who wanted me to spend at least a whole week building a full stack web app - containers, tests, front end, back end, database and all - before they'd even do a telephone interview. I politely declined.

### 2. Coding in the dark

Now, a three, six or even eight hour test can be countenanced so long as there is a decent return on investment. The problem is, most tests are assessed on entirely arbitrary criteria.

Some reviewers want you to blast through as many featues as possible, tests and documentation be damned. Others want tests and documentation, 'completeness' over sheer 'points shipped'. Some want you to be clever and build systems that are 'highly extensible' in ways totally overblown for the task, but which demonstrate key ideas. Others despise anything like that and call it 'overengineering' if you so much as `import Maybe from monad`. Some reviewers want to see ideas and design patterns. Others, particularly the more inexperienced ones, are obsessed with style and syntax, nitpicking and nibbling submissions to death.

But here's the rub: you will almost never know which standard you are being assessed against. Occasionally the brief will mention something, but who knows what the reviewers will actually judge on? I've seen projects that ask for tests over completeness rejected because they did exactly that. I've also seen reviewers completely disregard the brief when coming to their own conclusions. The assessment process in a lot of companies is fairly haphazard, so completing any of these projects is always a crapshoot.

### 3. A poor cost:reward ratio

### 4. High opportunity costs

### 5. Parent or carer? Doing overtime? Forget it.

### 6. An inbalanced relationship

## Why they fail for employers

1. Far too slow in a time-sensitive market
2. Don't measure real world skills
3. Painful to review
4. Bad for diversity
5. Delaying face-to-face interviews obscures your USPs
6. The best candidates won't do them

## An alternative: pair programming tests

### How they work

### Why they work

### How they solve problems for candidates

### How they solve problems for employers

### Making it happen at your company

### Doing it already? Get it touch








But all this assumes the test is even reviewed in the first place. Some companies don't even give candidates the courtesy of a reply, turn them down for some reason unrelated to the submission, or decide to simply close the position half way through the process, by which time one may have invested tens of hours into the application. Others take weeks to review the work, by which time the developer is already interviewing elsewhere. The result of which is an extremely poor cost-reward ratio for the candidate, who must not only guess whether he or she will pass, or what arbitrary standards they will be assessed against, but whether there'll even _be_ an outcome after all.

Compare this to portfolio work, or open source contributions: yes, it's labour outside of work; yes, they can be assessed in unfair ways; and yes, absolutely the open source community has its own problems - but at least writing a Github project is more or less a one-time investment.

## Why they suck for companies

### They're too slow

If you're a hiring manager and you only take one idea from this post, make it this one: Recruiting software engineers is incredibly time sensitive, with good people receiving job offers within just a couple of weeks, but take-home tests are one of the slowest mechanisms you have to assay prospective employees. By the time a candidate has secured time to write their submission, written it, sent it, and you've been able to get two+ of your current staff to spend several hours apiece reviewing it and writing up their notes, a week will have passed _at best_. That's just too slow when your competitors can go from phone interview to face-to-face to final offer in the same time. And if those competitors are offering the same or better money, the same or better work, the same or better comp, you're smoked.

In a seller's market, one of your biggest competitive advantages is the speed and convenience of your recruitment process.

### They don't measure what they promise to

If you're a hiring manager and you only take _two_ ideas from this post, here's the second: take-home tests aren't actually all that good at measuring developers on the things that matter. They typically ask developers to design software from scratch without peer input, changing requirements, challenging feedback, refactoring, operability or guidelines on what success looks like. As such they have almost no commonalities with real-world software jobs except the relatively rare roles of solo developer or R&D engineer.

Architecting apps from scratch with absolutely zero peer feedback is not actually something most developers do day to day. And - if your hiring process is optimised for people headstrong and self-reliant enough to thrive in those conditions, and then you slot those people into non-lead positions where they don't get to do just that, you will end up only hiring people who find themselves bored at your company. (If you find that the people who ace your take-home test inevitably seem to leave twelve months' down the line, looking for challenges and technologies new, you might there have your reason why.)

### The best candidates won't do them

Take a moment to think about your ideal applicant. A senior developer with bags of commercial experience; great technical skills and either a solid academic background or an impressive history as a self-taught engineer. Now think about what happens when she goes hunting for jobs.

A _deluge_. A _snowstorm_. An absolute _tsunami_ of job specs, LinkedIn messages, contract briefs, phone calls, voicemails, emails, and tweets from recruiters. A blizzard of _extremely_ similar looking roles, in extremely similar technologies, working at extremely similar companies doing what appear to be extremely similar things. Because let's be honest - most software engineering jobs will be, at least within a given stack and seniority level.

So what tool does she have to recognise the employer who will give her the most interesting work, the best environment, the most opportunities? Only a face-to-face interview, 90% of the time, but if you're using a take-home project, chances are you won't meet with her until after she's submitted it. Which leads to something of a paradox: she can't tell if your job is interesting until after she's done your test, but she can't tell if your test is worth doing until she knows your job is interesting.

Meanwhile another company, with a similar looking job spec, invites her for a face-to-face immediately. Which do you think she'll choose?

Even if you hold off on the test until after she's met in person, there's still a question of opportunity cost. In the time she's writing a test submission our ideal developer could be applying for _dozens_ of jobs.

It's not simply that good engineers are so in demand, they don't have to complete homework projects. That's a factor, but it's not the decider. It's that as a competent developer, the biggest struggle isn't simply finding work so much as identifying what work is really worth doing. Yet take-home tests make that process more difficult, and it's rarely worth completing them to find gems amongst the rough, because (to be absolutely brutal) most jobs on offer aren't really all that special.

### Not great for diversity

I have touched on this before: if your hiring process demands too much time, it will tend to exclude candidates with the heaviest childrearing and care requirements (disproportionately women); candidates in poor health (disproportionately disabled); and candidates with second jobs or high overtime requirements (disproportionately less well-off). This is somewhat ironic, because take-home tests seem to have originated as an alternative to divisive whiteboarding tests that were originally panned for being exclusionary, yet your well-intended take-home test might actually be stymieing your diversity efforts.

## The alternative is pair programming


### Remote pairing is a cheap way to assess candidates

### Making it pleasant

### Designing a good pairing test

## It isn't easy
