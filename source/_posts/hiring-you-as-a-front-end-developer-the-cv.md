---
layout: post
title: "Hiring You as a Front End Developer: Reading Your CV"
date: 2015-07-30 17:06:21 +0100
comments: true
tags: [opinion]
---
In the last few months, I’ve interviewed a lot of front end developers. I’ve also sat on the other side of the table, interviewing for new roles of my own. So I’ve lately thought a lot about how this process works – and how both sides often miss each others’ perspectives. In the next few posts, I want to give developers looking for new roles an insight into _my_ perspective as a hirer. In this one: what happens when you send your CV, and what happens when I read it.<!--more-->

You send your CV
----------------

If you’re applying to a large company, this will probably end up in the inbox of a recruiter. They’ll give it a quick look over and call you back. Their aim is to gather some basic info they can garnish your application with. They’ll also sometimes ask about salary expectations. This is normal: it filters out people we simply can’t afford and tells us what degree of competence or ‘value’ we expect for their pay. You should assume that anything you say to the recuiter can and will be given to the company, and you need to convince them that putting you forward will not end up reflecting badly on their credibility.

One thing you must always bear in mind that a recruiter works for the hiring company, not the candidate. They’re going to talk quite effusively about the role and do their utmost to sell it to you. If you’re lucky enough to get the job offer, they’re going to really push you to accept it, because that’s going to net them commission. I’m not saying recruiters are untrustworthy, but expect them to exert some pressure on you.

At some point, the CV will end up in the inbox of someone responsible for staffing. This person isn’t usually going to assess your CV in any depth, but hand it on to a developer. How this happens varies with the organization. In large companies, you may have a ‘pool’ of trusted developers responsible for processing applications at their convenience. These people will be busy – they’re having to cover the role you’re applying for, after all – so it might well be sat in an inbox for a while.

I take a look at it
-------------------

First things first: I have no qualifications to interview or screen anyone, and usually, neither does anyone else in this process. It is unusual for a company to invest in training its staff to interview others. I’ve gathered my interview techniques mostly through watching more experienced people and a little trial and error. Your interviewer isn’t infallible and might even appreciate it if you take the initiative to bring up your strengths.

Reading the summary
-------------------

If your resume is like 90% of those in the wild, it’ll start with some kind of self-summary or mission statement. In my experience, most of these aren’t really worth reading; they are typically rather bland and cliched. Sorry. Everyone is a ‘hard working and organized self-starter’ and a ‘great team player with strong communication skills’. (This one always puzzled me – if you’re such a great communicator, surely you wouldn’t need to tell me, no?).

I would really rather see a concise summary of your experience and skills, and maybe some indication of your values as a developer and preferences for an environment. Telling me your ‘attributes’ like your work ethic doesn’t add value unless you can substantiate them.

And that’s the biggest problem with self-description: you need to give me evidence. **Anything you write in your CV has to be either a bald fact, or backed up by bald facts.** It has to be something I can verify. Just promising me that you ‘pick up new skills quickly’ doesn’t leave me feeling convinced.

Reading your work experience
----------------------------

Mostly, I will be reading your first entry to see what level of expertise you’ve exercised and how long you’ve been up to it.

I don’t really pay much attention to job titles. They rarely correspond to experience across different companies. Sometimes it seems smaller shops love to hand out inflated titles: the sole dev who tries to exert some technical leadership will be given a ‘senior’ title quickly in the absence of any structure, and cash-strapped ‘start ups’ can be happy to offer meaningless senior titles in lieu of a pay rise. Some large companies, on the other hand, cap senior titles such that there is only one ‘lead’ developer per team. It’s pretty arbitrary, really.

What this means is that if you intend to pitch yourself as a senior developer, you must tell me what that means in quite concrete terms. Are you responsible for the growth and mentoring of others? How many of them, exactly? Do you make any architectural decisions alone? What sort of scale are we talking about? These are things I will press you on during the interview.

My next priority is to look at your previous jobs to see how long you’ve been working in each role. Having a couple of short stays here and there – under a year – isn’t going to raise any eyebrows, but having a string of them consistently will make me concerned somewhat. It won’t disqualify you by default, but I will be wondering why you would not – or could not – stay in one place for long.

Now, I don’t look _too_ hard at your really early jobs, but I do like to see how you’ve been growing. Were you an intern who self-taught CSS and JavaScript to become a senior UI developer? Have you transitioned from a ‘broad-church’ CS background into front-end specialism? This relays your character as a developer and helps me imagine the sort of person I’ll be interviewing.

Technical skills
----------------

Next up, I will eyeball your list of technical skills, but I don’t set too much store in it. Anyone can add a bullet point claiming `AngularJS proficiency: Superior Expert Level++++++`. If you can qualify your familiarity with some actual evidence, I will pay a lot more attention.

In terms of the technologies themselves, I’d like to see exposure to some kind of MVC framework (which one really doesn’t matter). I am pleased to see references to functional programming, reactive programming and any kind of ‘hard’ low-level stuff (performance optimization, graphics programming, that kind of thing). Exposure to programming languages other than JavaScript is always interesting and gives me a clue about your priorities as a developer. Honestly, I am more excited to meet a JavaScript developer who’s been exposed to Scheme or Scala or C++ or Python or even assembler than someone who’s worked with fifteen different flavours of MVC.

Education
---------

I might also look at your education if you don’t have many years of experience. I don’t mind whether you did or didn’t go to university, and I don’t mind if you studied humanities, but I must admit I do respond very positively when I see a true computer science graduate from a respectable university. More than anything, I just want to see that you are smart.

Presentation
------------

I don’t mind whether your resume reaches over two pages and I don’t really care whether your _Key Skills_ segment comes before _Work Experience_. But I am somewhat fond of CVs that show some design attention; I like it when someone goes to a bit of effort; adding imagery, screenshots of prodcuts, thoughtful typography, applying a bit of common sense with the design and making it easy on the eye – it looks like you care. Just don’t go too radical.

Researching the candidate
-------------------------

Most developers who engage actively with the field will have a strong digital presence. Younger candidates seem to especially. But be very careful about what you do and don’t make public.

The first thing I’ll track down are any links you’ve provided in the CV itself. Blog links are particularly valuable; I will respond strongly and positively to someone who can write in an articulate, organized and professional way. You are going to be writing the documentation and release notes that I am going to be reading; you are going to be choosing variable names and commit descriptions and all sorts of handles other developers will rely on. If you can write a decent blog post, you’ve already convinced me you have this stuff in the bag.

Secondly, if you provide a GitHub profile, you can be fairly certain I’ll look at it. I will look for your most recent repository and jump into the highest-level piece of code I can find. I’m not looking in any great detail here; I just want to see how your code generally reads; whether you’ve written any documentation and whether you’ve got any tests. A great README.MD and a decent suite of unit tests will make me quite excited to meet you. Bitty code that’s hard to understand, big ball-of-mud files without well-defined responsibilities and non-existent documentation make me concerned – not that you don’t care, but that you might actually not know better.

Next up, I’ll take a look at any portfolio or example sites you’ve provided. I’ll probably crack open the element inspector and take a look at how you’ve built the page. How are you writing your CSS? Are you using an OOCSS methodology? Are you loading resources in a performant way? I’ll try and inspect a page of your current company’s website or products, too. Even if you didn’t implement it, it still tells me something about the minimum standards and expectations of where you’ve worked. I won’t necessarily hold a bad implementation against you, but I might ask you about it in the interview and see if you’ve any ideas for improvement.

Finally, I will usually Google your name. This often leads me to candidates’ twitter feeds, which can tell me a lot about their extra-curricular interests in programming and technology. It’s not foolproof, but it’s always worth a try. Very often I reach their Facebook profiles, too, which I don’t usually peruse in any detail, but usually reveal far more than you might like. Are you comfortable with me seeing how you voted in the election? Your religious disposition? Your rant about your previous employer? Tighten up those privacy controls. You might also consider creating a separate professional twitter account, and leave the personal stuff to the side.

We get back to you
------------------

And then begins the next stage of the saga: the coding test. I’ll talk about this next time!