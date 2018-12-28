'use strict';

chrome.runtime.onInstalled.addListener(function () {
    // set up database
});

chrome.app.runtime.onLaunched.addListener(function () {
   chrome.app.window.create('window.html', {
      id: 'main',
      'outerBounds': {
         'width': 400,
         'height': 500
      }
   });
});

chrome.runtime.onSuspend.addListener(function () {
   // Close open connections.
});