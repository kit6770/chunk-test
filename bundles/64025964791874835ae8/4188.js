"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[4188],{

/***/ 964188:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MVoiceOrAudioBody)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _MAudioBody__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(891209);
/* harmony import */ var _MVoiceMessageBody__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(877449);
/* harmony import */ var _utils_EventUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26031);
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



// import { replaceableComponent } from "../../../utils/replaceableComponent";



// @replaceableComponent("views.messages.MVoiceOrAudioBody")
class MVoiceOrAudioBody extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  render() {
    if ((0,_utils_EventUtils__WEBPACK_IMPORTED_MODULE_3__/* .isVoiceMessage */ .CZ)(this.props.mxEvent)) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MVoiceMessageBody__WEBPACK_IMPORTED_MODULE_2__["default"], this.props);
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MAudioBody__WEBPACK_IMPORTED_MODULE_1__["default"], this.props);
    }
  }
}

/***/ })

}]);
//# sourceMappingURL=4188.js.map