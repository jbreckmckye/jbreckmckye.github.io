---
title: Setting up a static site and personal email - without paying for hosting
date: 2020-05-22 11:22:51
tags:
---

I've recently moved this site and my personal email domain handling off a paid webhost. Now, everything is handled by Github pages, Google Domains and Gmail, and the only
thing I pay for is the DNS registration. Here's how you can set this up yourself.

<!-- more -->

## Step 1: move your site to Github pages

- Create a Github repository named `[username].github.io`. Github will serve whatever content is on master under that URL.
- Create a `src` branch - this will contain the source content of your static site
- Sign up for a TravisCI free account
- Add a `.travis.yml` file to the root of `src` and configure your build (details below)
- Go to Travis and give it access to your new repository
- Create a personal access token with the `repo` scope and note the value
- Go to the Travis build settings for `[username].github.io` and add an environment variable for `GH_TOKEN` equal to the access token
- Travis should now be able to build from `src` and output the result to `master`

### Configuration files:

The `.travis.yml` file is needed to configure CI:

```yml
sudo: false
language: node_js
node_js:
  - 10 # use nodejs v10 LTS
cache: npm
branches:
  only:
    - src # build from src branch
script:
  - chmod +x ./build.sh
  - ./build.sh
deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GH_TOKEN
  keep-history: true
  target_branch: master
  fqdn: # you MUST enter your domain here
  on:
    branch: src
  local-dir: public
```

(The `fqdn` property is needed so that master will contain a `CNAME` file, needed to resolve your Github pages site for a custom domain)

The `build.sh` script will need to be written for whatever static site generator you use. In my case I'm using Hexo with a theme I've shared on Github:

```shell
#!/bin/bash

mkdir themes
git clone https://github.com/jbreckmckye/hexo-theme-octo.git themes/octo
cp _config.theme.yml ./themes/octo/_config.yml

hexo generate
```

### Checking it has all worked

- Make sure the Travis build is passing
- Verify content is being written to `master` with an `index.html` and a `CNAME` file at root
- Navigate to `[your-username].github.io` and see your lovely content

## Step 2: Set up Google Domains

Google Domains is fairly cheap (a dotcom address is about £10 a year) and highly convenient, but most importantly, it lets you forward emails
for a custom domain to Gmail without paying for GSuite. If you want to use another domain registrar, you'll probably have to sort out an
alternative webmail provider.

Signing up to Google Domains is very quick though - the only holdup will be if you're transferring an existing domain, in which case you'll need to jump through
a couple of hoops handing over an EPP code and (typically) replying to some emails from your old registar.

Once done, Google Domains provides a UI for managing email forwarding via your custom domain to any email your choose. You don't even have to write any MX records.

At this point, you should be able to send an email to e.g. `me@yourcooldomain.com` and have it land in your Gmail inbox.

## Step 3: Set up replying from gmail

So you can receive emails to your custom address, but how do you reply with the same address? You need to set up Gmail aliases.

Rather helpfully, Google have written a [guide to do just that](https://support.google.com/domains/answer/9437157?hl=en-GB). You will need to have 2FA enabled on
your account.

## Step 4: Pointing your domain at Github Pages

Head to Google Domains / your domain registrar and get ready to write some DNS entries. We'll need two:

1. An `A` record for name `@` (meaning: the current domain) pointing to these IP addresses:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

2. A `CNAME` record for name `www` (your subdomain) pointing to `[your-username].github.io.` (note the dot at the end)

Save the changes, wait a short while, and check the DNS entries are resolving correctly by clearing your DNS cache (Google how to do this for your OS)
and using `dig` (*nix) or `nslookup` (Windows) to check the IP resolution for your domain.

Sometimes DNS propagation can take a while - if it's been more than an hour and things still don't seem right, try a tool like [https://www.whatsmydns.net/]
that will make DNS lookups on your behalf using servers across the globe. It's highly possible things are still being cached on your end.

Once this clears everything should be sorted - you'll be able to see your static website at `www.mycooldomain.com` and send/receive emails from your custom
domain too. And all for the low yearly cost of a DNS registration.
