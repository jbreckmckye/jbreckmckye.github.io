---
layout: post
title: "Writing a Non-blocking JavaScript Quicksort"
date: 2015-06-09 17:06:21 +0100
comments: true
tags: [javascript]
---

I’ve recently had some fun writing a browser quicksort.<!--more-->

As part of a recent project, I had to implement a Knockout table component that could sort and filter its entries in realtime. This would normally have been straightforward, except for a handful of use-cases where the table would contain upwards of three thousand entries – possibly more. Calling a native array `sort()` on such a large set with a particularly complex comparator would force IE8 to freeze for several seconds and throw a long running script error.

Server-side sorting was awkward for various reasons, and we weren’t terribly keen on the complications that AJAX imposed. What we _really_ wanted was a non-blocking JavaScript sort.

Investigating the long running script exception
-----------------------------------------------

If you’ve done any heavy lifting with JavaScript in IE8, you’ve probably seen the following exception:

!["A script on this page is causing Internet Explorer to run slowly. If it continues to run, your computer may become unresponsive."](/images/2015/long-running-script.png ""A script on this page is causing Internet Explorer to run slowly. If it continues to run, your computer may become unresponsive."")

The exception is triggered by a maximum statement count. When the IE8 JavaScript engine executes over [five million statements](http://www.nczonline.net/blog/2009/01/05/what-determines-that-a-script-is-long-running/) as part of an event thread, it tells the user that “A script on this page is causing Internet Explorer to run slowly”. The user is invited to stop the thread and resume control. Stopping the thread doesn’t throw an error, so anything relying on the sort completing is left hanging.

Stopping it from appearing
--------------------------

The real purpose of the exception is to stop JavaScript operations from hogging the UI thread in an environment where all events and user actions need to run in serial. This is a goal we should respect. So the most obvious solution would be to find a way to perform the sort asynchronously, yield the thread periodically and effectively only run the sort whilst the UI thread was idle.

Actually, that’s a lie – the most obvious solution would be to double check that we _really_ needed to perform such a massive operation on the client and see if we could pass it to the server instead. But for us this was undesirable, if not impossible, and it seemed worthwhile to try and solve the problem just through client-side JavaScript.

My immediate thought was to write a quicksort.

Asynchronous quicksort
----------------------

Quicksort is particularly suitable for non-blocking code, because it can be implemented recursively, and recursion calls are a great opportunity to yield the thread. It’s fast, fairly well-understood and relatively easy to understand.

The idea is simple: we perform a ‘partition’ operation on an array, taking its last member as a ‘pivot’ and iterating through the others left to right, comparing each to the pivot as we go. If the member is larger or equal to the pivot, we put it to the right hand side. If not, we leave it on the left and try the next member. What we’re left with is an array where all the items lower than the pivot are to its left and all the items larger are to the right. We can then partition the left and right sets recursively until our set is completely sorted.

![](/images/2015/sorting_quicksort_anim.gif)

_(A handy animation straight from Wikipedia)_

Technically, this isn’t the only way to perform a partition – it’s the _Lomuto Partition_, and you can find others documented online, but the basic algorithm doesn’t differ: partition the array, then partition the sub-partitions in turn until there’s no more partitioning to be done.

We can write our partition as follows:

{% codeblock %}
    function partition(array, partitionSliceStart, partitionSliceEnd, valueComparator) {
      // Partition a sub-array for e.g. a quicksort
      //
      // We start processing from the leftmost element (I), and use the rightmost as the pivot (P). We also track the item to
      // the left of the pivot (L), such that we end up with
      // I . . . L P
      // We then compare I with P. If I is less than P, we leave it where is and increment the processing index, so that we have
      // < I . . L P
      // (where ' // Then, if I is larger than P, we swap the positions such that
      // < L . . P I
      // We then continue processing from L,
      // < I . . P >
      // ... and continue until we end up with all lower elements on the left, all greater than / equal elements on the right
      // < < < P > >
      // Doing it this way means we can partition our array in-place, which makes things a lot more performant.
    
      var pIndex = partitionSliceEnd;
      var iIndex = partitionSliceStart;
      var lIndex = pIndex - 1;
      var pValue = array[pIndex];
      var iValue = array[iIndex];
    
      while (iIndex < pIndex) {
          if (valueComparator(iValue, pValue) === -1) {
              // If I < P, leave I where it is and move the I index further right 
              iIndex++;
          } else {
              // If I >= P, move I to the right of P, and put L in I's original place.
              // We swap I and L, then L and P. We don't increment I's index; we process L next instead.
              arraySwap(array, iIndex, lIndex);
              arraySwap(array, lIndex, pIndex);
              pIndex--;
              lIndex--;
          }
          // Update values based on changed indices
          iValue = array[iIndex];
          pValue = array[pIndex];
      }
    
      return pIndex; // return the pivot point so we can recursively process the left and right hand sides
    }
{% endcodeblock %}

Forgive me for the C-like variable prefixes; it simply seemed the easiest way to associate the variables with the ‘diagram’ in my comments.

Once we had the partition operation, it was just a matter of finding a way to yield the UI thread between the operation calls.

process.nextTick in the browser
-------------------------------

If you’re a Node.js developer, you’ve likely encountered [process.nextTick()](https://nodejs.org/api/process.html#process_process_nexttick_callback). It yields the thread, allowing other queued callbacks to fire, before we resume our operation. Historically client-side JavaScript developers have emulated this behaviour with a zeroed setTimeout :

{% codeblock %}
    function yieldingOperation(fn) {
      window.setTimeout(fn, 0);
    }
{% endcodeblock %}  

This works well enough for ocassionally yielding a thread in the middle of a long operation, but it fails when we pass a high volume of callbacks, because the timeout value doesn’t _really_ end up being zero. In prctice, most browsers don’t run the callback in less than 10 milliseconds.

This restriction is partly down to the [HTML5 specification throttling the timeout to no less than 4ms](https://html.spec.whatwg.org/multipage/webappapis.html#timers) \[1\], but also partly down to the way the browser relies on the OS’ default system timer, as explained at length by [Nicholas Zakas](http://www.nczonline.net/blog/2011/12/14/timer-resolution-in-browsers/). Windows’ timer has a granularity of 15ms – that is, the timer is only updated every 15ms – so it’s possible for a setTimeout to wait the full length of that period.

When each operation takes a millisecond and then waits 14 milliseconds to spawn its child operations, that’s grossly inefficient. Profiling the sort confirmed these suspicions – Chrome would make excellent headway whilst processing the larger partitions, but then slow to a crawl as it processed the long tail of small subpartitions.

setImmediate to the rescue
--------------------------

But not to fear! setTimeout is not the only option we have. A new API, `window.setImmediate`, was introduced by Microsoft through Internet Explorer 10 and 11. It works much like `process.nextTick` – we pass a callback, yield the thread, run any queued events and pick the callback up again as soon as possible. There’s no 15ms throttling.

setImmediate isn’t a standardized API yet, though, and isn’t implemented in Gecko or Webkit \[2\]. Fortunately, a [Katochimoto’s setImmediate shim](https://github.com/Katochimoto/setImmediate) is available that provides the same functionality in other browsers, and even fixes certain bugs in IE10/11’s native setImmediate \[3\].

It now becomes possible to recursively partition our array in a non-blocking way:

{% codeblock %}
    function nonBlockingQuicksortOperation(array, subArrayStart, subArrayEnd, valueComparator) {
      var sortedAreaLength = (subArrayEnd - subArrayStart) + 1;
      if (sortedAreaLength > 1) {
          var pivotLocation = partition(array, subArrayStart, subArrayEnd, valueComparator);
    
          // Process elements to the left of the pivot
          var lowPartitionEnd = pivotLocation - 1;
          setImmediate(function(){
              nonBlockingQuicksortOperation(array, subArrayStart, lowPartitionEnd, valueComparator);
          });
    
          // Process elements to the right of the pivot
          var highPartitionStart = pivotLocation + 1;
          setImmediate(function(){
              nonBlockingQuicksortOperation(array, subArrayStart, highPartitionStart, valueComparator);
          });
      }
    }
{% endcodeblock %}    

There’s just one problem – now we’ve made the function asynchronous, how do we know when it has finished?

Monitoring progress
-------------------

Whenever we complete a partition, we know that we’ve finalized the position of the pivot. We only further process its neighbours. So we can trigger a finalization callback that increments a counter, and when the counter reaches the length of the array, we know that the array is stable.

We could perhaps implement this like so:

{% codeblock %}
    function nonBlockingQuicksortOperation(array, subArrayStart, subArrayEnd, valueComparator, onElementLocationFinalized) {
      var sortedAreaLength = (subArrayEnd - subArrayStart) + 1;
      if (sortedAreaLength > 1) {
          var pivotLocation = partition(array, subArrayStart, subArrayEnd, valueComparator);
    
          // Process elements to the left of the pivot
          var lowPartitionEnd = pivotLocation - 1;
          setImmediate(function(){
              nonBlockingQuicksortOperation(array, subArrayStart, lowPartitionEnd, valueComparator, onElementLocationFinalized);
          });
    
          // Process elements to the right of the pivot
          var highPartitionStart = pivotLocation + 1;
          setImmediate(function(){
              nonBlockingQuicksortOperation(array, subArrayStart, highPartitionStart, valueComparator, onElementLocationFinalized);
          });
    
          // The pivot's location is finalized, so we can trigger the event
          onElementLocationFinalized();
      } else if (sortedAreaLength === 1) {
          // Only one item, so we skip the partition and just trigger the event
          onElementLocationFinalized();
      }
    }
{% endcodeblock %}   

{% codeblock %}
    function nonBlockingQuicksort(array, valueComparator, onFinishCallback) {
      var finalizations = 0;
    
      var arrayEnd = array.length - 1;
      nonBlockingQuicksortOperation(array, 0, arrayEnd, valueComparator, onElementLocationFinalized);
    
      function onElementLocationFinalized() {
          finalizations++;
          if (finalizations === array.length) {
              onFinishCallback();
          }
      }
    }
{% endcodeblock %}    

Prioritizing native sort
------------------------

The `nonBlockingQuicksort` we’ve written is great, but it’ll always have the disadvantage of not being native code. Granted, many browsers implement their sort directly through JavaScript (you can see how Chrome does it in plain JS in the [V8 source](https://github.com/v8/v8/blob/master/src/array.js)), but browser developers will always have the advantage of being able to optimize for their own engines and drop into compiled code where necessary. So whilst our quicksort rids us of our IE8 woes, it’s still better to prefer native sort for smaller sets on more modern browsers.

Our approach was simply to prefer the native implementation unless working in IE8 or with arrays over a thousand items.

Lessons learned
---------------

If nothing else, writing a non-blocking quicksort was a great educational exercise. The key points being:

1.  Doing heavy lifting with JavaScript in IE8 is just not fun.
2.  If you’re going to have to do it, be mindful of UI responsiveness and see if you can write your procedure in a non-blocking manner, using setImmediate and its shims where necessary
3.  Sorting algorithms aren’t black magic and don’t have to be scary if you don’t have a CS background (like me)
4.  setTimeout and browser timing are deceptive and shouldn’t be wholly trusted

At some point, I’ll probably rewrite an open source version of the code above, with a few performance tweaks and optimizations. I’ll probably post about it when I do so.

### Notes

\[1\] Apparently, this is because running a timer with high resolution means the CPU can’t enter low power modes. This was determined to be a problem for battery life in mobile devices, so the 4ms was agreed as a compromise between efficiency and accuracy.

\[2\] Currently it faces some opposition from Google and Apple. It’s possible that the API might be deprecated in future, so using the setImmediate shim is probably a good insurance policy in case MS ever withdraws the API.

\[3\] You can find out how it actually performs the shim in the project’s README. It’s quite interesting.