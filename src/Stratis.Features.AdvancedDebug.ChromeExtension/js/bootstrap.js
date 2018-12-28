'use strict';

window.app = {};

window.onload = function () {
   var server = new Server(500);
   server.initialize();

   var titleBar = new TitleBar('#titlebar', 'img/button_close.png', 'img/button_close_hover.png');
   titleBar.initialize();
};