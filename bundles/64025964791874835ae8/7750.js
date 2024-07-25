"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[7750],{

/***/ 527750:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MImagePinnedBody)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _MImageBody__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(910749);
/* harmony import */ var matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(907977);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(867614);

/*
Copyright 2020-2021 Tulir Asokan <tulir@maunium.net>

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





const FORCED_IMAGE_HEIGHT = 40;
class MImagePinnedBody extends _MImageBody__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(...args) {
    super(...args);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(this, "onClick", ev => {
      ev.preventDefault();
    });
  }
  wrapImage(contentUrl, children) {
    return children;
  }
  render() {
    var _content$info;
    if (this.state.error !== null) {
      return super.render();
    }
    const content = this.props.mxEvent.getContent();
    const msgtype = content.msgtype;
    const contentUrl = this.getContentUrl();
    const thumbnail = this.messageContent(contentUrl, this.getThumbUrl(), content, FORCED_IMAGE_HEIGHT);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody"
    }, thumbnail, msgtype === matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_2__/* .MsgType */ .Zw.Image || msgtype === matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_2__/* .MsgType */ .Zw.Video ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody_info"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody_sender"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Pinned Message"), " #", this.props.pindedIndex + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody_filename"
    }, msgtype === matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_2__/* .MsgType */ .Zw.Image ? "Photo" : msgtype === matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_2__/* .MsgType */ .Zw.Video ? "Video" : null)) : null, msgtype === matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_2__/* .MsgType */ .Zw.Sticker ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody_info"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody_sender"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Pinned Message"), " #", this.props.pindedIndex + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody_content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_MPinnedBody_icon"
    }, (_content$info = content.info) === null || _content$info === void 0 ? void 0 : _content$info.emoji), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_MPinnedBody_text"
    }, "Sticker"))) : null);
  }
}

/***/ })

}]);
//# sourceMappingURL=7750.js.map