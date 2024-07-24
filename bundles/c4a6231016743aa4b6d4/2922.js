(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[2922],{

/***/ 882922:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ SoftLogout)
});

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(225259);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/dispatcher.ts
var dispatcher = __webpack_require__(245539);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Lifecycle.ts + 12 modules
var Lifecycle = __webpack_require__(729017);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Modal.tsx + 1 modules
var Modal = __webpack_require__(241648);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/MatrixClientPeg.ts + 3 modules
var MatrixClientPeg = __webpack_require__(933393);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Login.ts
var Login = __webpack_require__(209316);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/AuthPage.tsx + 1 modules
var AuthPage = __webpack_require__(200459);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/BasePlatform.ts
var BasePlatform = __webpack_require__(434415);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/SSOButtons.tsx
var SSOButtons = __webpack_require__(449579);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/replaceableComponent.ts
var replaceableComponent = __webpack_require__(90287);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/BaseDialog.js
var BaseDialog = __webpack_require__(308043);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/DialogButtons.js
var DialogButtons = __webpack_require__(804821);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ConfirmWipeDeviceDialog.tsx

var _dec, _class;
/*
Copyright 2019 The Matrix.org Foundation C.I.C.

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






let ConfirmWipeDeviceDialog = (_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.dialogs.ConfirmWipeDeviceDialog"), _dec(_class = class ConfirmWipeDeviceDialog extends react.Component {
  constructor(...args) {
    super(...args);
    (0,defineProperty/* default */.Z)(this, "onConfirm", () => {
      this.props.onFinished(true);
    });
    (0,defineProperty/* default */.Z)(this, "onDecline", () => {
      this.props.onFinished(false);
    });
  }
  render() {
    return /*#__PURE__*/react.createElement(BaseDialog/* default */.Z, {
      className: "mx_ConfirmWipeDeviceDialog",
      hasCancel: true,
      onFinished: this.props.onFinished,
      title: (0,languageHandler._t)("Clear all data in this session?")
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_ConfirmWipeDeviceDialog_content"
    }, /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Clearing all data from this session is permanent. Encrypted messages will be lost " + "unless their keys have been backed up."))), /*#__PURE__*/react.createElement(DialogButtons/* default */.Z, {
      primaryButton: (0,languageHandler._t)("Clear all data"),
      onPrimaryButtonClick: this.onConfirm,
      primaryButtonClass: "danger",
      cancelButton: (0,languageHandler._t)("Cancel"),
      onCancel: this.onDecline
    }));
  }
}) || _class);

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Field.tsx
var Field = __webpack_require__(455537);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AccessibleButton.tsx
var AccessibleButton = __webpack_require__(805035);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Spinner.tsx
var Spinner = __webpack_require__(641542);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/AuthHeader.tsx + 2 modules
var AuthHeader = __webpack_require__(685203);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/AuthBody.tsx
var AuthBody = __webpack_require__(489665);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/auth/SoftLogout.tsx

var SoftLogout_dec, SoftLogout_class;
/*
Copyright 2019-2021 The Matrix.org Foundation C.I.C.

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


















const LOGIN_VIEW = {
  LOADING: 1,
  PASSWORD: 2,
  CAS: 3,
  // SSO, but old
  SSO: 4,
  UNSUPPORTED: 5
};
const FLOWS_TO_VIEWS = {
  "m.login.password": LOGIN_VIEW.PASSWORD,
  "m.login.cas": LOGIN_VIEW.CAS,
  "m.login.sso": LOGIN_VIEW.SSO
};
let SoftLogout = (SoftLogout_dec = (0,replaceableComponent/* replaceableComponent */.U)("structures.auth.SoftLogout"), SoftLogout_dec(SoftLogout_class = class SoftLogout extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "onClearAll", () => {
      Modal/* default */.Z.createTrackedDialog('Clear Data', 'Soft Logout', ConfirmWipeDeviceDialog, {
        onFinished: wipeData => {
          if (!wipeData) return;
          console.log("Clearing data from soft-logged-out session");
          Lifecycle/* logout */.kS();
        }
      });
    });
    (0,defineProperty/* default */.Z)(this, "onPasswordChange", ev => {
      this.setState({
        password: ev.target.value
      });
    });
    (0,defineProperty/* default */.Z)(this, "onForgotPassword", () => {
      dispatcher/* default */.ZP.dispatch({
        action: 'start_password_recovery'
      });
    });
    (0,defineProperty/* default */.Z)(this, "onPasswordLogin", async ev => {
      ev.preventDefault();
      ev.stopPropagation();
      this.setState({
        busy: true
      });
      const hsUrl = MatrixClientPeg/* MatrixClientPeg */.p.get().getHomeserverUrl();
      const isUrl = MatrixClientPeg/* MatrixClientPeg */.p.get().getIdentityServerUrl();
      const loginType = "m.login.password";
      const loginParams = {
        identifier: {
          type: "m.id.user",
          user: MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId()
        },
        password: this.state.password,
        device_id: MatrixClientPeg/* MatrixClientPeg */.p.get().getDeviceId()
      };
      let credentials = null;
      try {
        credentials = await (0,Login/* sendLoginRequest */.HA)(hsUrl, isUrl, loginType, loginParams);
      } catch (e) {
        let errorText = (0,languageHandler._t)("Failed to re-authenticate due to a homeserver problem");
        if (e.errcode === "M_FORBIDDEN" && (e.httpStatus === 401 || e.httpStatus === 403)) {
          errorText = (0,languageHandler._t)("Incorrect password");
        }
        this.setState({
          busy: false,
          errorText: errorText
        });
        return;
      }
      Lifecycle/* hydrateSession */.vm(credentials).catch(e => {
        console.error(e);
        this.setState({
          busy: false,
          errorText: (0,languageHandler._t)("Failed to re-authenticate")
        });
      });
    });
    this.state = {
      loginView: LOGIN_VIEW.LOADING,
      keyBackupNeeded: true,
      // assume we do while we figure it out (see componentDidMount)
      busy: false,
      password: "",
      errorText: "",
      flows: []
    };
  }
  componentDidMount() {
    // We've ended up here when we don't need to - navigate to login
    if (!Lifecycle/* isSoftLogout */.QQ()) {
      dispatcher/* default */.ZP.dispatch({
        action: "start_login"
      });
      return;
    }
    this.initLogin();
    const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
    if (cli.isCryptoEnabled()) {
      cli.countSessionsNeedingBackup().then(remaining => {
        this.setState({
          keyBackupNeeded: remaining > 0
        });
      });
    }
  }
  async initLogin() {
    const queryParams = this.props.realQueryParams;
    const hasAllParams = queryParams && queryParams['loginToken'];
    if (hasAllParams) {
      this.setState({
        loginView: LOGIN_VIEW.LOADING
      });
      this.trySsoLogin();
      return;
    }

    // Note: we don't use the existing Login class because it is heavily flow-based. We don't
    // care about login flows here, unless it is the single flow we support.
    const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
    const flows = (await client.loginFlows()).flows;
    const loginViews = flows.map(f => FLOWS_TO_VIEWS[f.type]);
    const chosenView = loginViews.filter(f => !!f)[0] || LOGIN_VIEW.UNSUPPORTED;
    this.setState({
      flows,
      loginView: chosenView
    });
  }
  async trySsoLogin() {
    this.setState({
      busy: true
    });
    const hsUrl = localStorage.getItem(BasePlatform/* SSO_HOMESERVER_URL_KEY */.lc);
    const isUrl = localStorage.getItem(BasePlatform/* SSO_ID_SERVER_URL_KEY */.xV) || MatrixClientPeg/* MatrixClientPeg */.p.get().getIdentityServerUrl();
    const loginType = "m.login.token";
    const loginParams = {
      token: this.props.realQueryParams['loginToken'],
      device_id: MatrixClientPeg/* MatrixClientPeg */.p.get().getDeviceId()
    };
    let credentials = null;
    try {
      credentials = await (0,Login/* sendLoginRequest */.HA)(hsUrl, isUrl, loginType, loginParams);
    } catch (e) {
      console.error(e);
      this.setState({
        busy: false,
        loginView: LOGIN_VIEW.UNSUPPORTED
      });
      return;
    }
    Lifecycle/* hydrateSession */.vm(credentials).then(() => {
      if (this.props.onTokenLoginCompleted) this.props.onTokenLoginCompleted();
    }).catch(e => {
      console.error(e);
      this.setState({
        busy: false,
        loginView: LOGIN_VIEW.UNSUPPORTED
      });
    });
  }
  renderSignInSection() {
    if (this.state.loginView === LOGIN_VIEW.LOADING) {
      return /*#__PURE__*/react.createElement(Spinner/* default */.Z, null);
    }
    let introText = null; // null is translated to something area specific in this function
    if (this.state.keyBackupNeeded) {
      introText = (0,languageHandler._t)("Regain access to your account and recover encryption keys stored in this session. " + "Without them, you won’t be able to read all of your secure messages in any session.");
    }
    if (this.state.loginView === LOGIN_VIEW.PASSWORD) {
      let error = null;
      if (this.state.errorText) {
        error = /*#__PURE__*/react.createElement("span", {
          className: "mx_Login_error"
        }, this.state.errorText);
      }
      if (!introText) {
        introText = (0,languageHandler._t)("Enter your password to sign in and regain access to your account.");
      } // else we already have a message and should use it (key backup warning)

      return /*#__PURE__*/react.createElement("form", {
        onSubmit: this.onPasswordLogin
      }, /*#__PURE__*/react.createElement("p", null, introText), error, /*#__PURE__*/react.createElement(Field/* default */.Z, {
        type: "password",
        label: (0,languageHandler._t)("Password"),
        onChange: this.onPasswordChange,
        value: this.state.password,
        disabled: this.state.busy
      }), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
        onClick: this.onPasswordLogin,
        kind: "primary",
        type: "submit",
        disabled: this.state.busy
      }, (0,languageHandler._t)("Sign In")), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
        onClick: this.onForgotPassword,
        kind: "link"
      }, (0,languageHandler._t)("Forgotten your password?")));
    }
    if (this.state.loginView === LOGIN_VIEW.SSO || this.state.loginView === LOGIN_VIEW.CAS) {
      if (!introText) {
        introText = (0,languageHandler._t)("Sign in and regain access to your account.");
      } // else we already have a message and should use it (key backup warning)

      const loginType = this.state.loginView === LOGIN_VIEW.CAS ? "cas" : "sso";
      const flow = this.state.flows.find(flow => flow.type === "m.login." + loginType);
      return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("p", null, introText), /*#__PURE__*/react.createElement(SSOButtons/* default */.Z, {
        matrixClient: MatrixClientPeg/* MatrixClientPeg */.p.get(),
        flow: flow,
        loginType: loginType,
        fragmentAfterLogin: this.props.fragmentAfterLogin,
        primary: !this.state.flows.find(flow => flow.type === "m.login.password")
      }));
    }

    // Default: assume unsupported/error
    return /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("You cannot sign in to your account. Please contact your " + "homeserver admin for more information."));
  }
  render() {
    return /*#__PURE__*/react.createElement(AuthPage/* default */.Z, null, /*#__PURE__*/react.createElement(AuthHeader/* default */.Z, null), /*#__PURE__*/react.createElement(AuthBody/* default */.Z, null, /*#__PURE__*/react.createElement("h2", null, (0,languageHandler._t)("You're signed out")), /*#__PURE__*/react.createElement("h3", null, (0,languageHandler._t)("Sign in")), /*#__PURE__*/react.createElement("div", null, this.renderSignInSection()), /*#__PURE__*/react.createElement("h3", null, (0,languageHandler._t)("Clear personal data")), /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Warning: Your personal data (including encryption keys) is still stored " + "in this session. Clear it if you're finished using this session, or want to sign " + "in to another account.")), /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      onClick: this.onClearAll,
      kind: "danger"
    }, (0,languageHandler._t)("Clear all data")))));
  }
}) || SoftLogout_class);


/***/ }),

/***/ 489665:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 685203:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ AuthHeader)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/replaceableComponent.ts
var replaceableComponent = __webpack_require__(90287);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/AuthHeaderLogo.tsx
var _dec, _class;
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



let AuthHeaderLogo = (_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.auth.AuthHeaderLogo"), _dec(_class = class AuthHeaderLogo extends react.PureComponent {
  render() {
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthHeaderLogo"
    }, "Matrix");
  }
}) || _class);

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/SdkConfig.ts
var SdkConfig = __webpack_require__(374312);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/settings/SettingsStore.ts + 9 modules
var SettingsStore = __webpack_require__(571879);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/PlatformPeg.ts
var PlatformPeg = __webpack_require__(311187);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/settings/SettingLevel.ts
var SettingLevel = __webpack_require__(202385);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/LanguageDropdown.tsx
var LanguageDropdown = __webpack_require__(595619);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/LanguageSelector.tsx
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








function onChange(newLang) {
  if ((0,languageHandler/* getCurrentLanguage */.Wx)() !== newLang) {
    SettingsStore/* default */.C.setValue("language", null, SettingLevel/* SettingLevel */.R.DEVICE, newLang);
    PlatformPeg/* default */.Z.get().reload();
  }
}
function LanguageSelector({
  disabled
}) {
  if (SdkConfig/* default */.Z.get()['disable_login_language_selector']) return /*#__PURE__*/react.createElement("div", null);
  return /*#__PURE__*/react.createElement(LanguageDropdown/* default */.Z, {
    className: "mx_AuthBody_language",
    onOptionChange: onChange,
    value: (0,languageHandler/* getCurrentLanguage */.Wx)(),
    disabled: disabled
  });
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/AuthHeader.tsx
/*
Copyright 2015, 2016 OpenMarket Ltd
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




class AuthHeader extends react.Component {
  render() {
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthHeader"
    }, /*#__PURE__*/react.createElement(AuthHeaderLogo, null), /*#__PURE__*/react.createElement(LanguageSelector, {
      disabled: this.props.disableLanguageSelector
    }));
  }
}

/***/ }),

/***/ 200459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ AuthPage)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/replaceableComponent.ts
var replaceableComponent = __webpack_require__(90287);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/AuthFooter.tsx
var _dec, _class;
/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2019 New Vector Ltd
Copyright 2019 The Matrix.org Foundation C.I.C.

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




let AuthFooter = (_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.auth.AuthFooter"), _dec(_class = class AuthFooter extends react.Component {
  render() {
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthFooter"
    }, /*#__PURE__*/react.createElement("a", {
      href: "https://matrix.org",
      target: "_blank",
      rel: "noreferrer noopener"
    }, (0,languageHandler._t)("powered by Matrix")));
  }
}) || _class);

;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/AuthPage.tsx
/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2019 New Vector Ltd
Copyright 2019 The Matrix.org Foundation C.I.C.

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



class AuthPage extends react.PureComponent {
  render() {
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthPage"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthPage_modal"
    }, this.props.children), /*#__PURE__*/react.createElement(AuthFooter, null));
  }
}

/***/ }),

/***/ 449579:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(166644);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(992619);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(523282);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(294184);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PlatformPeg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(311187);
/* harmony import */ var _AccessibleButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(805035);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(867614);
/* harmony import */ var _Login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(209316);
/* harmony import */ var _AccessibleTooltipButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(717919);
/* harmony import */ var _customisations_Media__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(834208);


const _excluded = ["matrixClient", "loginType", "fragmentAfterLogin", "idp", "primary", "mini"];
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










const getIcon = brand => {
  switch (brand) {
    case _Login__WEBPACK_IMPORTED_MODULE_5__/* .IdentityProviderBrand */ .TD.Apple:
      return __webpack_require__(842292);
    case _Login__WEBPACK_IMPORTED_MODULE_5__/* .IdentityProviderBrand */ .TD.Facebook:
      return __webpack_require__(901952);
    case _Login__WEBPACK_IMPORTED_MODULE_5__/* .IdentityProviderBrand */ .TD.Github:
      return __webpack_require__(635194);
    case _Login__WEBPACK_IMPORTED_MODULE_5__/* .IdentityProviderBrand */ .TD.Gitlab:
      return __webpack_require__(734343);
    case _Login__WEBPACK_IMPORTED_MODULE_5__/* .IdentityProviderBrand */ .TD.Google:
      return __webpack_require__(965546);
    case _Login__WEBPACK_IMPORTED_MODULE_5__/* .IdentityProviderBrand */ .TD.Twitter:
      return __webpack_require__(940712);
    default:
      return null;
  }
};
const SSOButton = _ref => {
  let {
      matrixClient,
      loginType,
      fragmentAfterLogin,
      idp,
      primary,
      mini
    } = _ref,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)(_ref, _excluded);
  const label = idp ? (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("Continue with %(provider)s", {
    provider: idp.name
  }) : (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("Sign in with single sign-on");
  const onClick = () => {
    _PlatformPeg__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.get().startSingleSignOn(matrixClient, loginType, fragmentAfterLogin, idp === null || idp === void 0 ? void 0 : idp.id);
  };
  let icon;
  let brandClass;
  const brandIcon = idp ? getIcon(idp.brand) : null;
  if (brandIcon) {
    const brandName = idp.brand.split(".").pop();
    brandClass = `mx_SSOButton_brand_${brandName}`;
    icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
      src: brandIcon,
      height: "24",
      width: "24",
      alt: brandName
    });
  } else if (typeof (idp === null || idp === void 0 ? void 0 : idp.icon) === "string" && idp.icon.startsWith("mxc://")) {
    const src = (0,_customisations_Media__WEBPACK_IMPORTED_MODULE_7__/* .mediaFromMxc */ .TS)(idp.icon, matrixClient).getSquareThumbnailHttp(24);
    icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
      src: src,
      height: "24",
      width: "24",
      alt: idp.name
    });
  }
  const classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()("mx_SSOButton", {
    [brandClass]: brandClass,
    mx_SSOButton_mini: mini,
    mx_SSOButton_default: !idp,
    mx_SSOButton_primary: primary
  });
  if (mini) {
    // TODO fallback icon
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_AccessibleTooltipButton__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)({}, props, {
      title: label,
      className: classes,
      onClick: onClick
    }), icon);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_AccessibleButton__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)({}, props, {
    className: classes,
    onClick: onClick
  }), icon, label);
};
const MAX_PER_ROW = 6;
const SSOButtons = ({
  matrixClient,
  flow,
  loginType,
  fragmentAfterLogin,
  primary
}) => {
  const providers = flow.identity_providers || [];
  if (providers.length < 2) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_SSOButtons"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SSOButton, {
      matrixClient: matrixClient,
      loginType: loginType,
      fragmentAfterLogin: fragmentAfterLogin,
      idp: providers[0],
      primary: primary
    }));
  }
  const rows = Math.ceil(providers.length / MAX_PER_ROW);
  const size = Math.ceil(providers.length / rows);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_SSOButtons"
  }, (0,lodash_es__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(providers, size).map(chunk => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    key: chunk[0].id,
    className: "mx_SSOButtons_row"
  }, chunk.map(idp => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SSOButton, {
    key: idp.id,
    matrixClient: matrixClient,
    loginType: loginType,
    fragmentAfterLogin: fragmentAfterLogin,
    idp: idp,
    mini: true,
    primary: primary
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SSOButtons);

/***/ }),

/***/ 842292:
/***/ ((module) => {

module.exports = "img/element-icons/brands/apple.5160971.svg";

/***/ }),

/***/ 901952:
/***/ ((module) => {

module.exports = "img/element-icons/brands/facebook.c3243cf.svg";

/***/ }),

/***/ 635194:
/***/ ((module) => {

module.exports = "img/element-icons/brands/github.bf60283.svg";

/***/ }),

/***/ 734343:
/***/ ((module) => {

module.exports = "img/element-icons/brands/gitlab.d4ee177.svg";

/***/ }),

/***/ 965546:
/***/ ((module) => {

module.exports = "img/element-icons/brands/google.04f5e48.svg";

/***/ })

}]);
//# sourceMappingURL=2922.js.map