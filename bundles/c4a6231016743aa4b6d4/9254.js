"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[9254],{

/***/ 829254:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MessageViewAllButton)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(667294);
/* harmony import */ var _utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(90287);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(867614);
/* harmony import */ var sendingme_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(602271);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(245539);
/* harmony import */ var _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(274057);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(473627);

var _dec, _class;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2018 Michael Telatynski <7t3chguy@gmail.com>

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








let MessageViewAllButton = (_dec = (0,_utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_2__/* .replaceableComponent */ .U)("views.messages.MessageViewAllButton"), _dec(_class = class MessageViewAllButton extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(...args) {
    super(...args);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "handleViewAll", () => {
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP.dispatch({
        action: _dispatcher_actions__WEBPACK_IMPORTED_MODULE_7__/* .Action */ .a.SetRightPanelPhase,
        phase: _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_6__/* .RightPanelPhases */ .q4.MessageDetail,
        refireParams: {
          params: _objectSpread({}, this.props)
        }
      });
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP.dispatch({
        action: _dispatcher_actions__WEBPACK_IMPORTED_MODULE_7__/* .Action */ .a.ShowRightPanel
      });
    });
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "mx_MessageViewAllContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "mx_MessageViewAllButton",
      "aria-hidden": true,
      onClick: this.handleViewAll
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("View All")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(sendingme_ui__WEBPACK_IMPORTED_MODULE_4__.SdIcon, {
      icon: "RightOutlines"
    })), this.props.children);
  }
}) || _class);


/***/ })

}]);
//# sourceMappingURL=9254.js.map