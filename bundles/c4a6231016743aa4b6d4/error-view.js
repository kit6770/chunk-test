"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[4317],{

/***/ 328429:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var matrix_react_sdk_src_languageHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(867614);
/*
Copyright 2020 New Vector Ltd

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




// directly import the style here as this layer does not support rethemedex at this time so no matrix-react-sdk
// scss variables will be accessible.

const ErrorView = ({
  title,
  messages
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_ErrorView"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_ErrorView_container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_HomePage_header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "mx_HomePage_logo"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    height: "42",
    src: "themes/element/img/logos/element-logo.svg",
    alt: "Element"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, (0,matrix_react_sdk_src_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Failed to start"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_HomePage_col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_HomePage_row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    id: "step1_heading"
  }, title), messages && messages.map(msg => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    key: msg
  }, msg))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_HomePage_row mx_Center mx_Spacer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mx_Spacer"
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorView);

/***/ })

}]);
//# sourceMappingURL=error-view.js.map