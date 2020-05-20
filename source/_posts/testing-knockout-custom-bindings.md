---
title: Testing Knockout Custom Bindings
date: 2015-03-23 14:46:10
tags: [javascript, knockout.js]
---

In my last post, [Testing Knockout.js Web Applications](http://www.breck-mckye.com/blog/2015/02/testing-knockout-dot-js-web-applications/), I explained how to unit test a simple viewmodel using Karma and Jasmine, so you could validate the values and methods on the viewmodel bound to the DOM.

This is all very well and good, but what happens when we want to bind our model data to the document in novel ways? If we can’t use the standard Knockout bindings, we need to write our own. Using custom bindings to handle view concerns is a good pattern for keeping viewmodels manageable and making view code reusable. But how can we test them?

<!-- more -->

I’m going to show you a simple example of a currency binding. This binding is going to take a numerical model value and then express it as dollars and cents. Any fractional cents will be rounded up, so the value ‘123.456’ will be outputted as ‘$123.46’.

Later on I’ll show you how to test a binding that takes input as well as expressing output, but for now, let’s keep things simple.

If you’re unfamiliar with Knockout custom bindings, you might want to read their [documentation](http://knockoutjs.com/documentation/custom-bindings.html) before going any further.

What are we trying to do again?
-------------------------------

Let’s recap on the primary benefits of unit testing:

*   we get fast feedback if we break the binding as we maintain it
*   we document our code’s behaviour in tests
*   we force ourselves to decouple and break up code in our quest to make it testable

What does our binding need to do?
---------------------------------

The basic requirements are that

*   the binding receives a model value
*   we assume that model value is numeric
*   that number should be formatted as currency
*   the formatted number is printed to the element we’re bound to

The binding, then, comprises two basic operations: formatting the number and printing the string. This provides a clue that we might want to decompose these actions.

Making things testable
----------------------

The further we decompose our code, the easier it is to test, because our unit tests then cover discrete units with a small range of inputs and outputs. If we split our code into a component that formats a number into a currency string, and a component that passes a model value to a formatter and prints the result, we have two such highly testable units. We can also look and see if there are any generic or third party solutions for either of these jobs, which then eliminates the need to test those code paths.

As it happens, we’re in luck. So long as we’re using evergreen browsers, we can perform the number formatting with the browser’s native `Number.toLocaleString()`. According to [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString), formatting a number as US currency is fairly straightforward, if perhaps a little graceless:

{% codeblock %}
function formatNumberAsDollars(number) {
  return number.toLocaleString('en-US',{style: 'currency', currency: 'USD', maximumFractionDigits: 2});
}

var dollars = formatNumberAsDollars(123.456);
dollars; // returns '$123.46'
{% endcodeblock %}

Being simply a facade for native code, we shouldn’t really need to test this. Of course, if we wanted to provide a shim for legacy browsers, then perhaps this code would become more complex, and a unit test might be a worthwhile endeavour. But for the moment, let’s leave it be and think about the code that will call this new function.

Our custom binding will be an object with a solitary `update` method. We don’t need an `init` method as there shouldn’t be any specific setup we need our binding to perform before it can print to the DOM. Therefore our second component can be a constructor that takes a formatter function and wraps it to create a custom binding:

{% codeblock %}
    function FormatterBinding(formatter) {
      this.update = function update(element, valueAccessor) {
          var newModelValue = ko.unwrap(valueAccessor());
          var formattedText = formatter(newModelValue);
          // let's assume we don't need to support IE8
          element.textContent = formattedText;
      };
    }
{% endcodeblock %}

Our unit test is going to focus on the update method, verifying that it pushes values into a formatter and prints whatever that function returns. Because the formatter is now injected via a strategy pattern, our test should be nice and short.

Writing our tests
-----------------

Now that we’ve split our FormatterBinding constructor out, we can test that:

*   that the update method calls the formatter
*   that the formatter is passed the value
*   that the element has its text mutated to the output of the formatter
*   that update does not attempt to perform caching on behalf of the formatter
*   that the way we mutate the element’s text escapes script tags, so as to prevent cross-site scripting attacks

### Should we test for the update method itself?

Probably not – it’s not usually worth testing the existence of fields and methods. Whilst it’s true that someone could (catastrophically) break our FormatterBinding by, say, renaming the update method, I’m not terribly convinced that a unit test will really help. Yes, it will break, but so what? The developer still has no clues as to _why_ the method is useful without running some kind of integration test.

If you really must, though, you can test for a method’s presence using the Jasmine assertion `expect(someMethod).toBeDefined()`.

How do we test that the update method calls the formatter?
----------------------------------------------------------

[Spies](http://jasmine.github.io/2.0/introduction.html#section-Spies) are Jasmine’s implementation of function doubles, although Jasmine’s definition of a spy is slightly at odds with the traditional sense, insofar as a Jasmine spy does not fall through to the real function unless told to explicitly.

In any case, let’s use a Spy formatter and make sure `update()` calls it using Jasmine’s very straightforward `toHaveBeenCalled` method:

{% codeblock %}
    it('Calls the formatter as part of the update method', function(){
      var mockFormatter = jasmine.createSpy('mockFormatter');
      var customBinding = new FormatterBinding(mockFormatter);
      var mockElement = document.createElement('p');
      var mockValueAccessor = function() {
          return ko.observable('someMockValue');
      }
    
      customBinding.update(mockElement, mockValueAccessor);
      expect(mockFormatter).toHaveBeenCalled();
    });
{% endcodeblock %}

### What about the parameters of the formatter?

This one’s pretty simple, too – Jasmine provides a handy spy method named `toHaveBeenCalledWith`.

{% codeblock %}
    it('Calls the formatter with the value in the valueAccessor', function(){
      // let's assume we've created all our mocks as part of a Jasmine 
      // beforeEach block that runs before each set of assertions
    
      customBinding.update(mockElement, mockValueAccessor);
      expect(mockFormatter).toHaveBeenCalledWith('someMockValue');
    });
{% endcodeblock %}

### And the text?

We’re going to need to create a mock formatter that actually returns something this time. Doing this with Jasmine spies is a little bit awkward, because we need to make the formatter a method of an object, and then ask Jasmine to `spyOn` it. But once we’ve done that, we can easily query that the formatter’s output has been printed to the element by just using the native DOM API:

{% codeblock %}
    it('Prints the output of the formatter to the element', function(){
      // Setting up the spy is a little bit awkward
      var mockFunctions = {
          mockFormatter : function() { return 'I am the mockFormatter return value';}
      };
      spyOn(mockFunctons, 'mockFormatter');
    
      // But everything else is dead easy
      var customBinding = new FormatterBinding(mockFunctions.mockFormatter);
      customBinding.update(mockElement, mockValueAccessor);
      var mockElementContent = mockElement.textContent;
      expect(mockElementContent).toBe('I am the mockFormatter return value');
    });
{% endcodeblock %}

### Testing for the absence of caching

We don’t want the formatterBinding to perform any caching on behalf of the formatter, because there’s no guarantee that the formatter is deterministic – only the formatter itself should know about that. So we want to add a simple test to ensure that, if even if `update` is called multiple times with the same value, the formatter is still run each time all the same.

To test how many times a spy has been called, we can access its `calls.count()` getter:

{% codeblock %}
    it('Does not perform caching on behalf of the formatter', function(){
      var callsToPerform = 3;
      for (var i = 0; i < callsToPerform; i++) {
          customBinding.update(mockElement, mockValueAccessor);
      }
    
      expect(mockFormatter.calls.count()).toBe(callsToPerform);
    }
{% endcodeblock %}

### Testing for XSS vulnerabilities

[Cross-site scripting](https://www.owasp.org/index.php/Cross-site_Scripting_%28XSS%29) is an attack vector where a malicious user inputs strings that are executed as scripts for a different user. A good example might be a user comment field, where one user enters text that is then displayed for other users to read. If the comment box allows `<script>` tags, a malicious user can effectively inject a script that runs on other users’ machines. At best, these kind of attacks are a nuisance, but at worst, in some environments, they can pose major security risks.

Because our binding uses the native `.textContent` field, any script tags should automatically escaped along with any other HTML. However, it’s always possible that another developer, feeling helpful, might change the implementation to make our binding compatible with older browsers that don’t support `textContent`. If we’re not careful, they could create a vulnerability in our application.

The simplest way for us to test this behaviour is to create a mockFormatter that returns a string with an embedded script tag. If we can extract the unescaped script from the binding’s element, we know we have a problem.

{% codeblock %}
    it('Escapes script tags returned by the formatter', function(){
      var evilString = 'I am an <script>evilScriptTag()</script>';
      var evilFormatter = function() {
          return evilString;
      }
    
      var atRiskBinding = new FormatterBinding(evilFormatter);
      atRiskBinding.update(mockElement, mockValueAccessor);
    
      // Use querySelectorAll to get all 'script' matches in mock element
      var insertedScripts = mockElement.querySelectorAll('script');
      // querySelectorAll should return an empty array
      expect(insertedScripts.length).toBe(0);
    }
{% endcodeblock %}

Our test now covers everything! Let’s actually put it together.

### Assembling the components

It’s now easy to create a currency binding:

{% codeblock %}
	ko.bindingHandlers.currencyUSD = new FormatterBinding(formatNumberAsDollars);
{% endcodeblock %}

And not only is everything tested, but the code is much more extensible as a result. Now, we can write any kind of formatterBinding we want, and all we have to do is write unit tests for the formatter itself (which should always be simple), and we still have fully tested code. The formatters themselves can be simple, agnostic blocks of code that can be reused throughout our application. So if we choose to create a `currencyYen` binding, we can compose it from a `formatNumberAsYen` function that we might then use elsewhere.

Of course, if we want to make our Knockout applications truly testable, we need a way of validating two-way custom bindings too. But that’s a matter for another time.