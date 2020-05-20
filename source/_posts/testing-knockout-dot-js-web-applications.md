---
layout: post
title: "Testing Knockout.js Web Applications"
date: 2015-02-28 21:33:24 +0100
comments: true
tags: [javascript, knockout.js]
---

I’ve been working with Knockout.js for a few months now. I’m impressed, but one thing I’ve found lacking is much community documentation on how to test Knockout apps. I thought I’d write an introductory post on testing Knockout.js applications for those new to the idea – like I myself was, a few moons ago.

<!-- more -->

# What’s our goal?

These days it seems that unit testing is more or less a prerequisite to any kind of serious JavaScript application development. But let’s remind ourselves what we’re trying to achieve here.

The key benefits of unit tests are that:

*   we can get **fast and precise feedback** that changes have broken functionality. End to end tests (automated tests that fire up an entire application, database and server, then interact with them through a browser) can’t do this – they take too long to run, and they don’t give many hints as to where things have gone wrong.
*   the test can encode the assumptions that the rest of an application makes about a particular class. This means developers can **confidently refactor** the class without worrying about whether they’ve created a bug in some obscure part of the application.
*   a class or function’s behaviour can be properly **documented**. Well-written unit tests provide a full specification of how something works, and unlike other kinds of documentation, unit tests can never fall out of date.
*   if written upfront, in a TDD-style approach, unit tests can force developers to **think about the interface of a class or a function before the implementation**. Of course, that’s not to say a thoughtful developer can’t design great interfaces and smooth abstractions without TDD, but it certainly does help.

The practical benefits in a Knockout MVVM application might include:

*   being confident that the values on a viewmodel are being calculated correctly
*   documenting exactly what a complicated custom binding will return in different cases
*   verifying that something that should return an observable really will do

# What tools will I need?

You don’t need any particular framework or helper libraries to test Knockout applications, though having a way of testing for DOM changes will be useful if you intend to write custom bindings. My personal experience is with using Jasmine for basic assertions and Jasmine-jQuery for testing bindings, so I’ll be using them for my examples. To use Jasmine, you’ll need to install Node and Karma on your machine (and CI setup, if applicable).

What you _will_ need, though, is to make sure that your code is easily _testable_. What this means in practice is that any class or function you intend to test is, amongst other things:

*   **isolatable:** you are not testing an entire application in one go (an end-to-end test), nor are you wiring up multiple parts of an application to check they work properly together (an integration test). A unit test should assert the specific behaviours of an isolated piece of code. It should therefore be possible for you to run your code in vacuum, passing in mock dependencies or stubbing them out.
*   **deterministic:** you cannot unit test anything that will not reliably give an output for any specific set of inputs. If your code is non-deterministic, you need to find a way to split out the parts which are predictable and make unreliable code extremely simple. For example: a piece of code that performs an AJAX request and then makes a decision based on its response could be split into a function that performs the logic (deterministic) and an object that performs the network request (non-deterministic).
*   **has a single concern:** if a function does many things or has several outputs, it’s going to be complicated for you to write a unit test that maps its inputs to outputs.
*   **not a singleton:** singletons are problematic for many reasons, but for testing purposes, their key problem is that they often hold state, and that resetting this state between tests is awkward at best. This can be a problem in Knockout applications where a simple object is used as a viewmodel (e.g. `ko.applyBindings({foo: ko.observable() ... }))`), but is fairly easy to refactor.
*   **has its dependencies injected:** if a function or class depends on other functions or classes, it’s much easier to test if its dependencies are passed to it. Otherwise, a unit test either has to implicitly test the dependencies work, or the test has to make an assumption about the dependencies and the way they’re being called, which is problematic. However, using such an ‘inversion of control’ pattern can be awkward in non-test code, so you usually need some kind of framework that provides functions with their dependencies ‘pre-injected’ for use in non-test code.

# What should and shouldn’t be tested?

Essentially: you want to test first-party logic.

The ‘first party’ part means that you shouldn’t spend your time writing tests around third-party code. That code should already have its own tests (this is easy to verify in an open source project). So you don’t need to verify that Knockout is correctly printing strings in a `ko.observable()` to a span with `data-bind="text: ..."`, for example, or that a `ko.computed` will run whenever its dependencies change. That functionality is guaranteed by the library, so it doesn’t need unit testing (though it might still be worth covering in end-to-end and integration tests).

‘Logic’ is important, too. You should be focusing on code that makes decisions based on inputs, not simple configuration code. An example of configuration code might be an application bootstrap:

{% codeblock %}
    // Initialize an application using data the server has injected into the HTML
    var emailAppInitialData = {
      emailsList : getJSONFromPageElement('#messagesData'),
      addressBook : getJSONFromPageElement('#contactsData')
    };
    initializeApplication(emailAppInitialData);
{% endcodeblock %}

This code just uses another function to grab blobs of data from the page, stuffs it into a single object, and gives it to another function. There’s no logic – it’s just a piece of ‘wiring’ code. So long as `getJSONFromPageElement` and `initializeApplication` are sufficiently tested, it’s probably not worth testing this bootstrap code. Spend your time making sure those other functions are thorougly covered instead.

# Testing a simple Knockout application

So: we know that we want to test things, we know how to make code testable, and we know what not to test. How can we apply this knowledge to a simple Knockout application?

Let’s consider a very simple addressbook. Here’s a naive implementation. It’s simple, but it will need some work before it’s testable:

{% codeblock %}
    var addressBookViewModel = {
      entries : ko.observableArray([]),
      newEntryFirstName : ko.observable(),
      newEntrySurname : ko.observable()
        addNewEntry : function() {
            var newEntry = {
              firstName : this.newEntryFirstName(),
              surname : this.newEntrySurname()
          };
          this.entries.push(newEntry);
          // clear form
          this.newEntryFirstName('');
          this.newEntrySurname('');
      }
    };

    ko.applyBindings(addressBookViewModel);
{% endcodeblock %}

The user enters a firstname, a surname and clicks a button bound to `addNewEntry`. An entry is added (perhaps for display in a table using Knockout’s `foreach`) and the form is cleared. Straightforward stuff. But it needs some cleaning up before we can test it.

## Refactoring the singleton

Firstly, we don’t want singletons. We want classes we can instantiate instead. In this case, that’s a pretty simple refactor:

{% codeblock %}
    function AddressBookViewModel() {
      this.entries = ko.observableArray([]);
      this.newEntryFirstName = ko.observable();
      this.newEntrySurname = ko.observable();
      this.addNewEntry = function() {
          var newEntry = {
              firstName : this.newEntryFirstName(),
              surname : this.newEntrySurname()
          };
          this.entries.push(newEntry);
          // clear form
          this.newEntryFirstName('');
          this.newEntrySurname('');
      };
    }

    var addressBookViewModel = new AddressBookViewModel();
    ko.applyBindings(addressBookViewModel);
{% endcodeblock %}

Okay, it’s now a class. So any unit tests will be able to create a fresh viewmodel without having to worry about its state from prior tests.

## Separating concerns

We could write a unit test right now: we could assert that, if we set a firstname and a surname, then called addNewEntry, that the new entry’s data would appear at the end of the entries list and that the new name fields were cleared. But this is a bit much for a single test, and it hints that `addNewEntry` perhaps has too many responsibilities. The fact that the a block of code is annotated with the comment `// clear form` is a dead giveaway that clearing the fields should be extracted to a separate function, which could have its own tests.

Let’s rewrite the addressbook to see if we can improve it in this regard:

{% codeblock %}
    function AddressBookViewModel() {
      this.entries = ko.observableArray([]);
      this.newEntryFirstName = ko.observable();
      this.newEntrySurname = ko.observable();
      this.addNewEntry = function() {
          addAddressBookEntry(this.newEntryFirstName, this.newEntrySurname, this.entries);
          clearObservables([this.newEntryFirstName, this.newEntrySurname]);
      };
    }

    function addAddressBookEntry(firstName, surname, list) {
      var newEntry = {
          firstName : ko.toJS(firstName),
          surname : ko.toJS(surname)
      };
      list.push(newEntry);
    }

    function clearObservables(observables) {
      observables.forEach(function(observable){
          observable(null);
      });
    }

    var addressBookViewModel = new AddressBookViewModel();
    ko.applyBindings(addressBookViewModel);
{% endcodeblock %}

Now I can test the functions `clearObservables` and `addAddressBookEntry` in isolation, fairly easily. And because I’ve pulled them out into a fairly simple, testable little units, I can easily reuse them in other parts of my application – something we might not have thought to do if we hadn’t had to test them.

## Testing the functions

Let’s write a test for `addAddressBookEntry`. What do we want to verify? – that it adds an entry to the provided list – that this entry contains the supplied firstname and surname – that this entry is at the end of the list

Okay, fairly simple. Let’s write a test:
{% codeblock %}
    // I will comment Jasmine's syntax for anyone who isn't familiar with it

    // 'Describe' creates a Jasmine test. A describe block contains assertions, using the 'it' function.
    describe('addAddressBookEntry', function(){

      var newEntryFirstName, newEntryLastName, list;

      // 'beforeEach' performs setup before each 'it' test
      beforeEach(function(){
          newEntryFirstName = ko.observable('Peggy');
          newEntryLastName = ko.observable('Hill');
          list = ko.observableArray([]);
      });

      it('Adds an entry to the provided list', function(){       
          var initialListLength = list().length;
          addAddressBookEntry(newEntryFirstName, newEntryLastName, list);     
          var newListLength = list().length;

          // Jasmine uses the 'expect' function for assertions. Its format is very human-readable.
          // If an expection proves false, it will throw an exception and the assertion will be reported as failed.
          expect(newListLength).toBe(initialListLength + 1);
      });

      it('Adds an entry containing the supplied firstname and surname', function(){
          addAddressBookEntry(newEntryFirstName, newEntryLastName, list);
          var unwrappedList = list();
          var expectedNewEntry = {firstName: 'Peggy', surname: 'Hill'};
          // Jasmine's toContain will, amongst other things, test whether an array contains an object with fields matching a supplied object
          expect(unwrappedList).toContain(expectedNewEntry);
      });

      it('Adds the entry to the end of the list', function(){
          addAddressBookEntry(newEntryFirstName, newEntryLastName, list);
          var unwrappedList = list();
          var lastEntry = unwrappedList[unwrappedList.length - 1];

          // You can have multiple expectations in a Jasmine test
          expect(lastEntry.firstName).toBe('Peggy');
          expect(lastEntry.surname).toBe('Hill');
      });

    });
{% endcodeblock %}

## Back to the viewmodel

Arguably, our viewmodel is now so simple it’s arguably no longer worth testing. A side effect of unit testing is that our viewmodel is now extremely simple, because testing has forced us to extract logic into helper functions like `addAddressBookEntry`. If we really wanted to, though, we could rewrite our viewmodel constructor to accept those utils as parameters, and then use Jasmine’s `spy` functionality to mock them in our tests and verify that they were called correctly. We could also check that the viewmodel’s fields were all observables by using Knockout’s `ko.isObservable()` util.

At this point, however, we probably wouldn’t be testing anything especially useful. The viewmodel code is simple enough to be self-documenting; the only way a developer would be liable to break it would be in changing its actual behaviour – in which case, any unit test would have to be rewritten anyway.

## What’s next?

This is a very basic example, but hopefully this should give you an idea how you can start unit testing at least simple Knockout.js MVVM applications. In future posts, I’ll go over various aspects of testing in more detail, such as testing custom bindings, and verifying that variables are different kinds of observables.