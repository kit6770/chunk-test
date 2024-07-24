"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[2424],{

/***/ 132424:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ E2eSetup)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/AuthPage.tsx + 1 modules
var AuthPage = __webpack_require__(200459);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/CompleteSecurityBody.tsx
var CompleteSecurityBody = __webpack_require__(801403);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(225259);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/MatrixClientPeg.ts + 3 modules
var MatrixClientPeg = __webpack_require__(933393);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Modal.tsx + 1 modules
var Modal = __webpack_require__(241648);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/InteractiveAuthEntryComponents.tsx + 1 modules
var InteractiveAuthEntryComponents = __webpack_require__(630761);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/DialogButtons.js
var DialogButtons = __webpack_require__(804821);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/BaseDialog.js
var BaseDialog = __webpack_require__(308043);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Spinner.tsx
var Spinner = __webpack_require__(641542);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/InteractiveAuthDialog.js
var InteractiveAuthDialog = __webpack_require__(234478);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/replaceableComponent.ts
var replaceableComponent = __webpack_require__(90287);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/security/CreateCrossSigningDialog.tsx

var _dec, _class;
/*
Copyright 2018, 2019 New Vector Ltd
Copyright 2019, 2020 The Matrix.org Foundation C.I.C.

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











/*
 * Walks the user through the process of creating a cross-signing keys. In most
 * cases, only a spinner is shown, but for more complex auth like SSO, the user
 * may need to complete some steps to proceed.
 */
let CreateCrossSigningDialog = (_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.dialogs.security.CreateCrossSigningDialog"), _dec(_class = class CreateCrossSigningDialog extends react.PureComponent {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "doBootstrapUIAuth", async makeRequest => {
      if (this.state.canUploadKeysWithPasswordOnly && this.state.accountPassword) {
        await makeRequest({
          type: 'm.login.password',
          identifier: {
            type: 'm.id.user',
            user: MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId()
          },
          // TODO: Remove `user` once servers support proper UIA
          // See https://github.com/matrix-org/synapse/issues/5665
          user: MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId(),
          password: this.state.accountPassword
        });
      } else if (this.props.tokenLogin) {
        // We are hoping the grace period is active
        await makeRequest({});
      } else {
        const dialogAesthetics = {
          [InteractiveAuthEntryComponents/* SSOAuthEntry */.Rt.PHASE_PREAUTH]: {
            title: (0,languageHandler._t)("Use Single Sign On to continue"),
            body: (0,languageHandler._t)("To continue, use Single Sign On to prove your identity."),
            continueText: (0,languageHandler._t)("Single Sign On"),
            continueKind: "primary"
          },
          [InteractiveAuthEntryComponents/* SSOAuthEntry */.Rt.PHASE_POSTAUTH]: {
            title: (0,languageHandler._t)("Confirm encryption setup"),
            body: (0,languageHandler._t)("Click the button below to confirm setting up encryption."),
            continueText: (0,languageHandler._t)("Confirm"),
            continueKind: "primary"
          }
        };
        const {
          finished
        } = Modal/* default */.Z.createTrackedDialog('Cross-signing keys dialog', '', InteractiveAuthDialog/* default */.Z, {
          title: (0,languageHandler._t)("Setting up keys"),
          matrixClient: MatrixClientPeg/* MatrixClientPeg */.p.get(),
          makeRequest,
          aestheticsForStagePhases: {
            [InteractiveAuthEntryComponents/* SSOAuthEntry */.Rt.LOGIN_TYPE]: dialogAesthetics,
            [InteractiveAuthEntryComponents/* SSOAuthEntry */.Rt.UNSTABLE_LOGIN_TYPE]: dialogAesthetics
          }
        });
        const [confirmed] = await finished;
        if (!confirmed) {
          throw new Error("Cross-signing key upload auth canceled");
        }
      }
    });
    (0,defineProperty/* default */.Z)(this, "bootstrapCrossSigning", async () => {
      this.setState({
        error: null
      });
      const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
      try {
        await cli.bootstrapCrossSigning({
          authUploadDeviceSigningKeys: this.doBootstrapUIAuth
        });
        this.props.onFinished(true);
      } catch (e) {
        if (this.props.tokenLogin) {
          // ignore any failures, we are relying on grace period here
          this.props.onFinished(false);
          return;
        }
        this.setState({
          error: e
        });
        console.error("Error bootstrapping cross-signing", e);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onCancel", () => {
      this.props.onFinished(false);
    });
    this.state = {
      error: null,
      // Does the server offer a UI auth flow with just m.login.password
      // for /keys/device_signing/upload?
      // If we have an account password in memory, let's simplify and
      // assume it means password auth is also supported for device
      // signing key upload as well. This avoids hitting the server to
      // test auth flows, which may be slow under high load.
      canUploadKeysWithPasswordOnly: props.accountPassword ? true : null,
      accountPassword: props.accountPassword || ""
    };
    if (!this.state.accountPassword) {
      this.queryKeyUploadAuth();
    }
  }
  componentDidMount() {
    this.bootstrapCrossSigning();
  }
  async queryKeyUploadAuth() {
    try {
      await MatrixClientPeg/* MatrixClientPeg */.p.get().uploadDeviceSigningKeys(null, {});
      // We should never get here: the server should always require
      // UI auth to upload device signing keys. If we do, we upload
      // no keys which would be a no-op.
      console.log("uploadDeviceSigningKeys unexpectedly succeeded without UI auth!");
    } catch (error) {
      if (!error.data || !error.data.flows) {
        console.log("uploadDeviceSigningKeys advertised no flows!");
        return;
      }
      const canUploadKeysWithPasswordOnly = error.data.flows.some(f => {
        return f.stages.length === 1 && f.stages[0] === 'm.login.password';
      });
      this.setState({
        canUploadKeysWithPasswordOnly
      });
    }
  }
  render() {
    let content;
    if (this.state.error) {
      content = /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Unable to set up keys")), /*#__PURE__*/react.createElement("div", {
        className: "mx_Dialog_buttons"
      }, /*#__PURE__*/react.createElement(DialogButtons/* default */.Z, {
        primaryButton: (0,languageHandler._t)('Retry'),
        onPrimaryButtonClick: this.bootstrapCrossSigning,
        onCancel: this.onCancel
      })));
    } else {
      content = /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(Spinner/* default */.Z, null));
    }
    return /*#__PURE__*/react.createElement(BaseDialog/* default */.Z, {
      className: "mx_CreateCrossSigningDialog",
      onFinished: this.props.onFinished,
      title: (0,languageHandler._t)("Setting up keys"),
      hasCancel: false,
      fixedWidth: false
    }, /*#__PURE__*/react.createElement("div", null, content));
  }
}) || _class);

;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/auth/E2eSetup.tsx
var E2eSetup_dec, E2eSetup_class;
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






let E2eSetup = (E2eSetup_dec = (0,replaceableComponent/* replaceableComponent */.U)("structures.auth.E2eSetup"), E2eSetup_dec(E2eSetup_class = class E2eSetup extends react.Component {
  render() {
    return /*#__PURE__*/react.createElement(AuthPage/* default */.Z, null, /*#__PURE__*/react.createElement(CompleteSecurityBody/* default */.Z, null, /*#__PURE__*/react.createElement(CreateCrossSigningDialog, {
      onFinished: this.props.onFinished,
      accountPassword: this.props.accountPassword,
      tokenLogin: this.props.tokenLogin
    })));
  }
}) || E2eSetup_class);


/***/ }),

/***/ 200459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


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
//# sourceMappingURL=2424.js.map