/// <reference path="server.js.js" />
'use strict';

chrome.runtime.onInstalled.addListener(function () {
   // set up database
});

chrome.app.runtime.onLaunched.addListener(function () {
   chrome.app.window.create('index.html', { id: "mainwin", outerBounds: { width: 500, height: 400 }, frame: 'none' });
});

chrome.runtime.onSuspend.addListener(function () {
   // Close open connections.
});