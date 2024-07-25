(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[2172],{

/***/ 822172:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MFilePinnedBody)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(867614);


class MFilePinnedBody extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  get content() {
    return this.props.mxEvent.getContent();
  }
  get fileName() {
    return this.content.body && this.content.body.length > 0 ? this.content.body : (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Attachment");
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody_info"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody_sender"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Pinned Message"), " #", this.props.pindedIndex + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody_content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
      className: "mx_MPinnedBody_icon",
      src: __webpack_require__(533769),
      alt: ""
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_MPinnedBody_text"
    }, this.fileName))));
  }
}

/***/ }),

/***/ 533769:
/***/ ((module) => {

module.exports = "img/element-icons/message/file-message-icon.a8b0724.png";

/***/ })

}]);
//# sourceMappingURL=2172.js.map