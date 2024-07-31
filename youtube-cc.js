// ==UserScript==
// @name         YouTube Copy CC Button
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Add a button to copy closed captions on YouTube
// @author       Tim Misiak
// @match        *://*.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to add custom styles to the document
    function addCustomStyles() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            #copyCcButton {
                position: fixed;
                top: 50px;
                right: 10px;
                z-index: 9999;
                background-color: #ff0000;
                color: #fff;
                border: none;
                padding: 10px;
                cursor: pointer;
                border-radius: 5px;
                font-size: 16px;
            }
            #copyCcButton:hover {
                background-color: #cc0000;
            }
        `;
        document.head.appendChild(style);
    }

    // Function to add the button to the page
    function addButton() {
        if (!document.querySelector('#copyCcButton')) {
            const button = document.createElement('button');
            button.id = 'copyCcButton';
            button.innerText = 'copy cc';
            document.body.appendChild(button);

            button.addEventListener('click', async () => {
                const captionsElement = document.querySelector('.captions-text');
                if (captionsElement) {
                    const captionsText = captionsElement.innerText;
                    try {
                        await navigator.clipboard.writeText(captionsText);
                        console.log('Captions copied to clipboard!');
                    } catch (err) {
                        console.error('Failed to copy captions:', err);
                    }
                } else {
                    console.log('Captions not found!');
                }
            });
        }
    }

    // Observe changes to the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                addButton();
            }
        });
    });

    const observerConfig = {
        childList: true,
        subtree: true,
    };

    // Wait for the page to fully load
    window.addEventListener('load', () => {
        addCustomStyles();
        observer.observe(document.body, observerConfig);
        addButton();
    });
})();
