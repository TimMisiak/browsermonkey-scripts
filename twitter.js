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
  
  	var inObserver = false;
  
  	function changeTitle() {
        let titleParts = document.title.split(" / ");
      	var newTitle = document.title;
        if (titleParts.length > 1) {
            newTitle = titleParts[0] + " / Twitter";
        } else if (document.title == "X") {
            newTitle = "Twitter";
        }
        if (newTitle != document.title) {
          document.title = newTitle;
        }
    }

    // Observe for title changes
    let titleObserver = new MutationObserver(function(mutations) {
      	if (inObserver) { return; }
        inObserver = true;

        mutations.forEach(function(mutation) {
          console.log("Title changed: " + document.title);
          changeTitle();
        });

        inObserver = false;
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
        const removePrem = () => {
        	const prem = document.querySelectorAll('aside[aria-label="Subscribe to Premium"]');
      		prem.forEach(e => e.parentElement.remove());
        };
      
      	removePrem();
        setTimeout(removePrem, 1000);
      
      	changeTitle();
      	const title = document.querySelector('title')
        console.log(title);
      console.log("Title : " + document.title);
        if (title) {
      		titleObserver.observe(title, { childList: true, characterData: true, subtree: true });
        }
    });

  
})();
