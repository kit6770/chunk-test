"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[5012],{

/***/ 715012:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RecoveryMethodRemovedDialog)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47185);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(245539);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(867614);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(241648);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(473627);

/*
Copyright 2019 New Vector Ltd
Copyright 2020 The Matrix.org Foundation C.I.C.

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








class RecoveryMethodRemovedDialog extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  constructor(...args) {
    super(...args);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(this, "onGoToSettingsClick", () => {
      this.props.onFinished();
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP.fire(_dispatcher_actions__WEBPACK_IMPORTED_MODULE_6__/* .Action */ .a.ViewUserSettings);
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(this, "onSetupClick", () => {
      this.props.onFinished();
      _Modal__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z.createTrackedDialogAsync("Key Backup", "Key Backup", __webpack_require__.e(/* import() */ 6305).then(__webpack_require__.bind(__webpack_require__, 736305)), null, null, /* priority = */false, /* static = */true);
    });
  }
  render() {
    const BaseDialog = _index__WEBPACK_IMPORTED_MODULE_2__.getComponent("views.dialogs.BaseDialog");
    const DialogButtons = _index__WEBPACK_IMPORTED_MODULE_2__.getComponent("views.elements.DialogButtons");
    const title = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_KeyBackupFailedDialog_title"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("Recovery Method Removed"));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(BaseDialog, {
      className: "mx_KeyBackupFailedDialog",
      onFinished: this.props.onFinished,
      title: title
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("This session has detected that your Security Phrase and key " + "for Secure Messages have been removed.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("If you did this accidentally, you can setup Secure Messages on " + "this session which will re-encrypt this session's message " + "history with a new recovery method.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: "warning"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("If you didn't remove the recovery method, an " + "attacker may be trying to access your account. " + "Change your account password and set a new recovery " + "method immediately in Settings.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogButtons, {
      primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("Set up Secure Messages"),
      onPrimaryButtonClick: this.onSetupClick,
      cancelButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("Go to Settings"),
      onCancel: this.onGoToSettingsClick
    })));
  }
}
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(RecoveryMethodRemovedDialog, "propTypes", {
  onFinished: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
});

/***/ })

}]);
//# sourceMappingURL=5012.js.map