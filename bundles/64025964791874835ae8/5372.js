"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[5372],{

/***/ 165372:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Fireworks)
/* harmony export */ });
/* unused harmony export DefaultOptions */
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(225259);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 Copyright 2020 Nurjin Jafar
 Copyright 2020 Nordeck IT + Consulting GmbH.

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
  maxCount: 500,
  gravity: 0.05
};
class Fireworks {
  constructor(options) {
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "options", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "context", null);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "supportsAnimationFrame", window.requestAnimationFrame);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "particles", []);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "isRunning", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "start", async (canvas, timeout = 3000) => {
      if (!canvas) {
        return;
      }
      this.isRunning = true;
      this.context = canvas.getContext('2d');
      this.supportsAnimationFrame.call(window, this.updateWorld);
      if (timeout) {
        window.setTimeout(this.stop, timeout);
      }
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "updateWorld", () => {
      if (!this.isRunning && this.particles.length === 0) return;
      this.update();
      this.paint();
      this.supportsAnimationFrame.call(window, this.updateWorld);
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "update", () => {
      if (this.particles.length < this.options.maxCount && this.isRunning) {
        this.createFirework();
      }
      const alive = [];
      for (let i = 0; i < this.particles.length; i++) {
        if (this.move(this.particles[i])) {
          alive.push(this.particles[i]);
        }
      }
      this.particles = alive;
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "paint", () => {
      if (!this.context || !this.context.canvas) return;
      this.context.globalCompositeOperation = 'destination-out';
      this.context.fillStyle = "rgba(0,0,0,0.5)";
      this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      this.context.globalCompositeOperation = 'lighter';
      for (let i = 0; i < this.particles.length; i++) {
        this.drawParticle(this.particles[i]);
      }
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "createFirework", () => {
      if (!this.context || !this.context.canvas) return;
      const width = this.context.canvas.width;
      const height = this.context.canvas.height;
      const xPoint = Math.random() * (width - 200) + 100;
      const yPoint = Math.random() * (height - 200) + 100;
      const nFire = Math.random() * 50 + 100;
      const color = "rgb(" + ~~(Math.random() * 200 + 55) + "," + ~~(Math.random() * 200 + 55) + "," + ~~(Math.random() * 200 + 55) + ")";
      for (let i = 0; i < nFire; i++) {
        const particle = {};
        particle.color = color;
        particle.w = particle.h = Math.random() * 4 + 1;
        particle.x = xPoint - particle.w / 2;
        particle.y = yPoint - particle.h / 2;
        particle.vx = (Math.random() - 0.5) * 10;
        particle.vy = (Math.random() - 0.5) * 10;
        particle.alpha = Math.random() * .5 + .5;
        const vy = Math.sqrt(25 - particle.vx * particle.vx);
        if (Math.abs(particle.vy) > vy) {
          particle.vy = particle.vy > 0 ? vy : -vy;
        }
        this.particles.push(particle);
      }
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "stop", async () => {
      this.isRunning = false;
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "drawParticle", particle => {
      if (!this.context || !this.context.canvas) {
        return;
      }
      this.context.save();
      this.context.beginPath();
      this.context.translate(particle.x + particle.w / 2, particle.y + particle.h / 2);
      this.context.arc(0, 0, particle.w, 0, Math.PI * 2);
      this.context.fillStyle = particle.color;
      this.context.globalAlpha = particle.alpha;
      this.context.closePath();
      this.context.fill();
      this.context.restore();
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "move", particle => {
      particle.x += particle.vx;
      particle.vy += this.options.gravity;
      particle.y += particle.vy;
      particle.alpha -= 0.01;
      return !(particle.x <= -particle.w || particle.x >= screen.width || particle.y >= screen.height || particle.alpha <= 0);
    });
    this.options = _objectSpread(_objectSpread({}, DefaultOptions), options);
  }
}

/***/ })

}]);
//# sourceMappingURL=5372.js.map