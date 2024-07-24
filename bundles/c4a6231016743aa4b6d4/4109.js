"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[4109],{

/***/ 584109:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextualEvent)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _contexts_RoomContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(880133);
/* harmony import */ var _TextForEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(565597);
/* harmony import */ var _utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(90287);

var _dec, _class, _class2;
/*
Copyright 2015 - 2021 The Matrix.org Foundation C.I.C.

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





let TextualEvent = (_dec = (0,_utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_3__/* .replaceableComponent */ .U)("views.messages.TextualEvent"), _dec(_class = (_class2 = class TextualEvent extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  render() {
    var _this$context;
    const text = _TextForEvent__WEBPACK_IMPORTED_MODULE_2__/* .textForEvent */ .MW(this.props.mxEvent, true, (_this$context = this.context) === null || _this$context === void 0 ? void 0 : _this$context.showHiddenEventsInTimeline);
    if (!text) return null;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_TextualEvent"
    }, text);
  }
}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(_class2, "contextType", _contexts_RoomContext__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z), _class2)) || _class);


/***/ })

}]);
//# sourceMappingURL=4109.js.map