'use strict';

class TitleBar {
   constructor(id, closeImage, closeImageHover) {
      this._$titleBar = document.querySelector(id);
      this._closeImage = closeImage;
      this._closeImageHover = closeImageHover;
   }

   initialize() {
      this._initializeCloseButton();
   }

   _initializeCloseButton() {
      var closeButton = this._$titleBar.querySelector("#titlebar-close-button");

      closeButton.onclick = function () {
         window.close();
      };

      closeButton.onmouseover = function (ev) {
         ev.target.src = this._closeImageHover;
      }.bind(this);

      closeButton.onmouseout = function (ev) {
         ev.target.src = this._closeImage;
      }.bind(this);
   }
}