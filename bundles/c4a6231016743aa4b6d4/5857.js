"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[5857],{

/***/ 675857:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CompleteSecurity)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(867614);
/* harmony import */ var _stores_SetupEncryptionStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(119127);
/* harmony import */ var _SetupEncryptionBody__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(203694);
/* harmony import */ var _utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(90287);
/* harmony import */ var _views_auth_AuthBody__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(489665);
/* harmony import */ var _views_auth_CompleteSecurityBody__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(801403);

var _dec, _class;
/*
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








let CompleteSecurity = (_dec = (0,_utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_4__/* .replaceableComponent */ .U)("structures.auth.CompleteSecurity"), _dec(_class = class CompleteSecurity extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(this, "onStoreUpdate", () => {
      const store = _stores_SetupEncryptionStore__WEBPACK_IMPORTED_MODULE_2__/* .SetupEncryptionStore */ .x.sharedInstance();
      this.setState({
        phase: store.phase
      });
    });
    const _store = _stores_SetupEncryptionStore__WEBPACK_IMPORTED_MODULE_2__/* .SetupEncryptionStore */ .x.sharedInstance();
    _store.on("update", this.onStoreUpdate);
    _store.start();
    this.state = {
      phase: _store.phase
    };
  }
  componentWillUnmount() {
    const store = _stores_SetupEncryptionStore__WEBPACK_IMPORTED_MODULE_2__/* .SetupEncryptionStore */ .x.sharedInstance();
    store.off("update", this.onStoreUpdate);
    store.stop();
  }
  render() {
    const {
      phase
    } = this.state;
    let icon;
    let title;
    if (phase === _stores_SetupEncryptionStore__WEBPACK_IMPORTED_MODULE_2__/* .Phase */ .n.Loading) {
      return null;
    } else if (phase === _stores_SetupEncryptionStore__WEBPACK_IMPORTED_MODULE_2__/* .Phase */ .n.Intro) {
      icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "mx_CompleteSecurity_headerIcon mx_E2EIcon_warning"
      });
      title = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Verify this login");
    } else if (phase === _stores_SetupEncryptionStore__WEBPACK_IMPORTED_MODULE_2__/* .Phase */ .n.Done) {
      icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "mx_CompleteSecurity_headerIcon mx_E2EIcon_verified"
      });
      title = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Session verified");
    } else if (phase === _stores_SetupEncryptionStore__WEBPACK_IMPORTED_MODULE_2__/* .Phase */ .n.ConfirmSkip) {
      icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "mx_CompleteSecurity_headerIcon mx_E2EIcon_warning"
      });
      title = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Are you sure?");
    } else if (phase === _stores_SetupEncryptionStore__WEBPACK_IMPORTED_MODULE_2__/* .Phase */ .n.Busy) {
      icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "mx_CompleteSecurity_headerIcon mx_E2EIcon_warning"
      });
      title = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Verify this login");
    } else {
      throw new Error(`Unknown phase ${phase}`);
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_views_auth_AuthBody__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_views_auth_CompleteSecurityBody__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
      className: "mx_CompleteSecurity_header"
    }, icon, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CompleteSecurity_body"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_SetupEncryptionBody__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
      onFinished: this.props.onFinished
    }))));
  }
}) || _class);


/***/ }),

/***/ 489665:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ AuthBody)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/*
Copyright 2019 New Vector Ltd

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


class AuthBody extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_AuthBody"
    }, this.props.children);
  }
}

/***/ }),

/***/ 801403:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ CompleteSecurityBody)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/*
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


class CompleteSecurityBody extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CompleteSecurityBody"
    }, this.props.children);
  }
}

/***/ })

}]);
//# sourceMappingURL=5857.js.map