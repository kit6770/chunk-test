(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[5553],{

/***/ 665553:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MStickerBody)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _MImageBody__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(910749);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47185);
/* harmony import */ var _ContentMessages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(601877);

/*
Copyright 2018 New Vector Ltd

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


// @replaceableComponent("views.messages.MStickerBody")
class MStickerBody extends _MImageBody__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(...args) {
    super(...args);
    // Mostly empty to prevent default behaviour of MImageBody
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(this, "onClick", ev => {
      ev.preventDefault();
      if (!this.state.showImage) {
        this.showImage();
      }
    });
  }
  // MStickerBody doesn't need a wrapping `<a href=...>`, but it does need extra padding
  // which is added by mx_MStickerBody_wrapper
  wrapImage(contentUrl, children) {
    let onClick = null;
    if (!this.state.showImage) {
      onClick = this.onClick;
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MStickerBody_wrapper",
      onClick: onClick
    }, " ", children, " ");
  }

  // Placeholder to show in place of the sticker image if
  // img onLoad hasn't fired yet.
  getPlaceholder(width, height) {
    var _this$props$mxEvent$g;
    if ((_this$props$mxEvent$g = this.props.mxEvent.getContent().info) !== null && _this$props$mxEvent$g !== void 0 && _this$props$mxEvent$g[_ContentMessages__WEBPACK_IMPORTED_MODULE_3__/* .BLURHASH_FIELD */ .kP]) return super.getPlaceholder(width, height);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
      src: __webpack_require__(548613),
      width: "75",
      height: "75"
    });
  }

  // Tooltip to show on mouse over
  getTooltip() {
    const content = this.props.mxEvent && this.props.mxEvent.getContent();
    if (!content || !content.body || !content.info || !content.info.w) return null;
    const Tooltip = _index__WEBPACK_IMPORTED_MODULE_2__.getComponent('elements.Tooltip');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      style: {
        left: content.info.w + 'px'
      },
      className: "mx_MStickerBody_tooltip"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Tooltip, {
      label: content.body
    }));
  }

  // Don't show "Download this_file.png ..."
  getFileBody() {
    return null;
  }
}

/***/ }),

/***/ 548613:
/***/ ((module) => {

module.exports = "img/icons-show-stickers.4e420bf.svg";

/***/ })

}]);
//# sourceMappingURL=5553.js.map