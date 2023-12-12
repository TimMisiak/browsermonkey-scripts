// ==UserScript==
// @name         TweetSweep
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove parts of Twitter that are silly
// @author       Tim Misiak
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
  
  	function changeTitle() {
        let titleParts = document.title.split(" / ");
        if (titleParts.length > 1) {
            document.title = titleParts[0] + " / Twitter";
        }
    }

    // Observe for title changes
    let titleObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          console.log("Title changed: " + document.title);
          changeTitle();
        });
    });

    window.addEventListener('load', function() {
        var links = document.querySelectorAll('a[href="/i/grok"]');
        links.forEach(link => link.remove());
        links = document.querySelectorAll('a[href="/i/verified-choose"]');
        links.forEach(link => link.remove());
        links = document.querySelectorAll('a[href="/i/explore"]');
        links.forEach(link => link.remove());
        const xlink = document.querySelectorAll('a[aria-label="X"]');
        xlink.forEach(link => link.remove());
        const prem = document.querySelectorAll('aside[aria-label="Subscribe to Premium"]');
      	prem.forEach(e => e.parentElement.remove());
      
      	changeTitle();
      	titleObserver.observe(document.querySelector('title'), { childList: true, characterData: true, subtree: true });
    });

  
})();
