---
layout: post
title: "Disabling Firefox Safe Mode"
date: 2014-04-08 22:10:54 +0100
comments: true
tags: [functional tests, test automation, firefox, selenium]
---

A couple of weeks ago I faced a problem where Firefox's "Enter Safe Mode" dialog was causing problems for a Selenium test suite I was trying to run.<!--more-->

Basically, Firefox would sometimes throw the dialog and my test framework (naturally) wouldn't be able to dismiss it without my help. This meant the Firefox instance stayed open, so if I tried running the suite again, I'd get an exception:

{% codeblock %}
org.openqa.selenium.WebDriverException: Unable to bind to locking port 7054 within 45000 ms
{% endcodeblock %}

Annoying. To me, it seemed the simplest solution was to merely disable Safe Mode entirely, as I would never need it during a test. Rummaging around in Stack Overflow and the Mozilla bugtracker, I found [this](https://bugzilla.mozilla.org/show_bug.cgi?id=745154) ticket that proposed I could either:

- set an environment variable, `MOZ_DISABLE_SAFE_MODE`, or
- pass a config setting, `maxResumedCrashes = -1` to about:flags or a user profile

According to the [webdriver documentation](https://code.google.com/p/selenium/wiki/TipsAndTricks), you can set a custom user profile flag fairly easily with `profile.setPreferences("key","value")`

Disabling Safe Mode was simple:

{% codeblock %}
profile.setPreferences("toolkit.startup.max_resumed_crashes", "-1");
{% endcodeblock %}

If you've got the same problem, you might want to give it a try.