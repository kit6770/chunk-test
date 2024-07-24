"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[6742],{

/***/ 556742:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(769215);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _avatars_BaseAvatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56607);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(245539);




const Stranger = props => {
  const toLogin = () => {
    _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP.dispatch({
      action: 'start_login'
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_Stranger_wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_Stranger_modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_Stranger_body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_Stranger_title"
  }, "Join the conversation with an account\uFF1F"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_avatars_BaseAvatar__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
    className: "mx_Stranger_avatar",
    name: props.name,
    width: props.size,
    height: props.size
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_Stranger_name"
  }, props.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_Stranger_address"
  }, "0x3132c19b145f79a62b03484e884be9057e3ac781")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "mx_Stranger_login_button",
    size: "large",
    type: "primary",
    onClick: toLogin
  }, "Login")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Stranger);

/***/ })

}]);
//# sourceMappingURL=6742.js.map