// ==UserScript==
// @name         Add gamepad support to hexanaut.io
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Maps gamepad analog stick to simulated mouse movement.
// @author       You
// @match        https://hexanaut.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    let sensitivity = 200; // Adjust for how fast the mouse moves with stick

    // Check for gamepad connection
    window.addEventListener("gamepadconnected", function(e) {
        console.log("Gamepad connected:", e.gamepad);
        startGamepadLoop();
    });

    window.addEventListener("gamepaddisconnected", function(e) {
        console.log("Gamepad disconnected:", e.gamepad);
    });

    function startGamepadLoop() {
        function gamepadLoop() {
            let gamepads = navigator.getGamepads();
            if (gamepads[0]) {
                let gamepad = gamepads[0];
                let leftStickX = gamepad.axes[0]; // Left stick horizontal axis (-1 to 1)
                let leftStickY = gamepad.axes[1]; // Left stick vertical axis (-1 to 1)
              
                let dist = Math.sqrt(leftStickX * leftStickX + leftStickY * leftStickY)
                if (dist > 0.5) {

                	// Calculate new mouse position
                	let newX = centerX + leftStickX * sensitivity;
                	let newY = centerY + leftStickY * sensitivity;
                  // Simulate mouse movement
                	simulateMouseMove(newX, newY);
                }
                
            }

            // Keep looping to read the gamepad state
            requestAnimationFrame(gamepadLoop);
        }

        gamepadLoop();
    }

    function simulateMouseMove(x, y) {
        const event = new MouseEvent('mousemove', {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y
        });
        document.dispatchEvent(event);
    }

    // Adjust center of the screen when window size changes
    window.addEventListener('resize', function() {
        centerX = window.innerWidth / 2;
        centerY = window.innerHeight / 2;
    });
})();
