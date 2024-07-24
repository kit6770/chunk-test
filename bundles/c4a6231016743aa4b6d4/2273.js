"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[2273],{

/***/ 12273:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NewRecoveryMethodDialog)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47185);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(933393);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(245539);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(867614);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(241648);
/* harmony import */ var _components_views_dialogs_security_RestoreKeyBackupDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(854601);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(473627);

/*
Copyright 2018, 2019 New Vector Ltd
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










class NewRecoveryMethodDialog extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  constructor(...args) {
    super(...args);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)(this, "onOkClick", () => {
      this.props.onFinished();
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)(this, "onGoToSettingsClick", () => {
      this.props.onFinished();
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP.fire(_dispatcher_actions__WEBPACK_IMPORTED_MODULE_8__/* .Action */ .a.ViewUserSettings);
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)(this, "onSetupClick", async () => {
      _Modal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.createTrackedDialog('Restore Backup', '', _components_views_dialogs_security_RestoreKeyBackupDialog__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
        onFinished: this.props.onFinished
      }, null, /* priority = */false, /* static = */true);
    });
  }
  render() {
    const BaseDialog = _index__WEBPACK_IMPORTED_MODULE_2__.getComponent("views.dialogs.BaseDialog");
    const DialogButtons = _index__WEBPACK_IMPORTED_MODULE_2__.getComponent("views.elements.DialogButtons");
    const title = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_KeyBackupFailedDialog_title"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("New Recovery Method"));
    const newMethodDetected = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("A new Security Phrase and key for Secure Messages have been detected."));
    const hackWarning = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: "warning"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("If you didn't set the new recovery method, an " + "attacker may be trying to access your account. " + "Change your account password and set a new recovery " + "method immediately in Settings."));
    let content;
    if (_MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().getKeyBackupEnabled()) {
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, newMethodDetected, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("This session is encrypting history using the new recovery method.")), hackWarning, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogButtons, {
        primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("OK"),
        onPrimaryButtonClick: this.onOkClick,
        cancelButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Go to Settings"),
        onCancel: this.onGoToSettingsClick
      }));
    } else {
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, newMethodDetected, hackWarning, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogButtons, {
        primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Set up Secure Messages"),
        onPrimaryButtonClick: this.onSetupClick,
        cancelButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Go to Settings"),
        onCancel: this.onGoToSettingsClick
      }));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(BaseDialog, {
      className: "mx_KeyBackupFailedDialog",
      onFinished: this.props.onFinished,
      title: title
    }, content);
  }
}
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)(NewRecoveryMethodDialog, "propTypes", {
  // As returned by js-sdk getKeyBackupVersion()
  newVersionInfo: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  onFinished: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
});

/***/ })

}]);
//# sourceMappingURL=2273.js.map