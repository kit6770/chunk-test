"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[907],{

/***/ 250907:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SpaceInvaders)
/* harmony export */ });
/* unused harmony export DefaultOptions */
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(225259);
/* harmony import */ var _utils_arrays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(902232);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 Copyright 2021 The Matrix.org Foundation C.I.C.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */


const DefaultOptions = {
  maxCount: 50,
  gravity: 0.005
};
const KEY_FRAME_INTERVAL = 15; // 15ms, roughly
const GLYPH = "👾";
class SpaceInvaders {
  constructor(options) {
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "options", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "context", null);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "particles", []);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "lastAnimationTime", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "isRunning", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "start", async (canvas, timeout = 3000) => {
      if (!canvas) {
        return;
      }
      this.context = canvas.getContext('2d');
      this.particles = [];
      const count = this.options.maxCount;
      while (this.particles.length < count) {
        this.particles.push(this.resetParticle({}, canvas.width, canvas.height));
      }
      this.isRunning = true;
      requestAnimationFrame(this.renderLoop);
      if (timeout) {
        window.setTimeout(this.stop, timeout);
      }
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "stop", async () => {
      this.isRunning = false;
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "resetParticle", (particle, width, height) => {
      particle.x = Math.random() * width;
      particle.y = Math.random() * -height;
      particle.xCol = particle.x;
      particle.gravity = this.options.gravity + Math.random() * 6 + 4;
      return particle;
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "renderLoop", () => {
      if (!this.context || !this.context.canvas) {
        return;
      }
      if (this.particles.length === 0) {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      } else {
        const timeDelta = Date.now() - this.lastAnimationTime;
        if (timeDelta >= KEY_FRAME_INTERVAL || !this.lastAnimationTime) {
          // Clear the screen first
          this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
          this.lastAnimationTime = Date.now();
          this.animateAndRenderInvaders();
        }
        requestAnimationFrame(this.renderLoop);
      }
    });
    this.options = _objectSpread(_objectSpread({}, DefaultOptions), options);
  }
  animateAndRenderInvaders() {
    if (!this.context || !this.context.canvas) {
      return;
    }
    this.context.font = "50px Twemoji";
    for (const particle of (0,_utils_arrays__WEBPACK_IMPORTED_MODULE_1__/* .arrayFastClone */ .iP)(this.particles)) {
      particle.y += particle.gravity;
      this.context.save();
      this.context.fillText(GLYPH, particle.x, particle.y);
      this.context.restore();
    }
  }
}

/***/ })

}]);
//# sourceMappingURL=907.js.map