// ==UserScript==
// @name         RedditDecrapifier
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove silly parts of reddit
// @author       Tim Misiak
// @match        https://old.reddit.com/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
  
    window.addEventListener('load', function() {
      document.querySelector(".listingsignupbar").remove();
      document.querySelector(".premium-banner-outer").remove();
    });  
})();
