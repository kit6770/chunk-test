"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[4498],{

/***/ 214498:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ForgotPassword)
});

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(225259);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/index.js + 1 modules
var src = __webpack_require__(47185);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Modal.tsx + 1 modules
var Modal = __webpack_require__(241648);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/matrix.ts + 1 modules
var matrix = __webpack_require__(540534);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/PasswordReset.ts

/*
Copyright 2015, 2016 OpenMarket Ltd
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




/**
 * Allows a user to reset their password on a homeserver.
 *
 * This involves getting an email token from the identity server to "prove" that
 * the client owns the given email address, which is then passed to the password
 * API on the homeserver in question with the new password.
 */
class PasswordReset {
  /**
   * Configure the endpoints for password resetting.
   * @param {string} homeserverUrl The URL to the HS which has the account to reset.
   * @param {string} identityUrl The URL to the IS which has linked the email -> mxid mapping.
   */
  constructor(homeserverUrl, identityUrl) {
    (0,defineProperty/* default */.Z)(this, "client", void 0);
    (0,defineProperty/* default */.Z)(this, "clientSecret", void 0);
    (0,defineProperty/* default */.Z)(this, "identityServerDomain", void 0);
    (0,defineProperty/* default */.Z)(this, "password", void 0);
    (0,defineProperty/* default */.Z)(this, "sessionId", void 0);
    this.client = (0,matrix.createClient)({
      baseUrl: homeserverUrl,
      idBaseUrl: identityUrl
    });
    this.clientSecret = this.client.generateClientSecret();
    this.identityServerDomain = identityUrl ? identityUrl.split("://")[1] : null;
  }

  /**
   * Attempt to reset the user's password. This will trigger a side-effect of
   * sending an email to the provided email address.
   * @param {string} emailAddress The email address
   * @param {string} newPassword The new password for the account.
   * @return {Promise} Resolves when the email has been sent. Then call checkEmailLinkClicked().
   */
  resetPassword(emailAddress, newPassword) {
    this.password = newPassword;
    return this.client.requestPasswordEmailToken(emailAddress, this.clientSecret, 1).then(res => {
      this.sessionId = res.sid;
      return res;
    }, function (err) {
      if (err.errcode === 'M_THREEPID_NOT_FOUND') {
        err.message = (0,languageHandler._t)('This email address was not found');
      } else if (err.httpStatus) {
        err.message = err.message + ` (Status ${err.httpStatus})`;
      }
      throw err;
    });
  }

  /**
   * Checks if the email link has been clicked by attempting to change the password
   * for the mxid linked to the email.
   * @return {Promise} Resolves if the password was reset. Rejects with an object
   * with a "message" property which contains a human-readable message detailing why
   * the reset failed, e.g. "There is no mapped matrix user ID for the given email address".
   */
  async checkEmailLinkClicked() {
    const creds = {
      sid: this.sessionId,
      client_secret: this.clientSecret
    };
    try {
      await this.client.setPassword({
        // Note: Though this sounds like a login type for identity servers only, it
        // has a dual purpose of being used for homeservers too.
        type: "m.login.email.identity",
        // TODO: Remove `threepid_creds` once servers support proper UIA
        // See https://github.com/matrix-org/synapse/issues/5665
        // See https://github.com/matrix-org/matrix-doc/issues/2220
        threepid_creds: creds,
        threepidCreds: creds
      }, this.password);
    } catch (err) {
      if (err.httpStatus === 401) {
        err.message = (0,languageHandler._t)('Failed to verify email address: make sure you clicked the link in the email');
      } else if (err.httpStatus === 404) {
        err.message = (0,languageHandler._t)('Your email address does not appear to be associated with a Matrix ID on this Homeserver.');
      } else if (err.httpStatus) {
        err.message += ` (Status ${err.httpStatus})`;
      }
      throw err;
    }
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/AutoDiscoveryUtils.tsx + 1 modules
var AutoDiscoveryUtils = __webpack_require__(940062);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(294184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/AuthPage.tsx + 1 modules
var AuthPage = __webpack_require__(200459);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/CountlyAnalytics.ts
var CountlyAnalytics = __webpack_require__(817826);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/ServerPicker.tsx + 1 modules
var ServerPicker = __webpack_require__(585846);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/PassphraseField.tsx
var PassphraseField = __webpack_require__(229049);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/RegistrationForm.tsx + 3 modules
var RegistrationForm = __webpack_require__(278126);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/InlineSpinner.tsx
var InlineSpinner = __webpack_require__(650193);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/AuthHeader.tsx + 2 modules
var AuthHeader = __webpack_require__(685203);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/AuthBody.tsx
var AuthBody = __webpack_require__(489665);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Field.tsx
var Field = __webpack_require__(455537);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/auth/ForgotPassword.tsx

/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2017, 2018, 2019 New Vector Ltd
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












// import { replaceableComponent } from "../../../utils/replaceableComponent";





var Phase = /*#__PURE__*/function (Phase) {
  Phase[Phase["Forgot"] = 1] = "Forgot";
  Phase[Phase["SendingEmail"] = 2] = "SendingEmail";
  Phase[Phase["EmailSent"] = 3] = "EmailSent";
  Phase[Phase["Done"] = 4] = "Done";
  return Phase;
}(Phase || {});
// @replaceableComponent("structures.auth.ForgotPassword")
class ForgotPassword extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "reset", void 0);
    (0,defineProperty/* default */.Z)(this, "state", {
      phase: Phase.Forgot,
      email: "",
      password: "",
      password2: "",
      errorText: null,
      // We perform liveliness checks later, but for now suppress the errors.
      // We also track the server dead errors independently of the regular errors so
      // that we can render it differently, and override any other error the user may
      // be seeing.
      serverIsAlive: true,
      serverErrorIsFatal: false,
      serverDeadError: "",
      passwordFieldValid: false
    });
    (0,defineProperty/* default */.Z)(this, "onVerify", async ev => {
      ev.preventDefault();
      if (!this.reset) {
        console.error("onVerify called before submitPasswordReset!");
        return;
      }
      if (this.state.currentHttpRequest) return;
      try {
        await this.handleHttpRequest(this.reset.checkEmailLinkClicked());
        this.setState({
          phase: Phase.Done
        });
      } catch (err) {
        this.showErrorDialog(err.message);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onSubmitForm", async ev => {
      ev.preventDefault();
      if (this.state.currentHttpRequest) return;

      // refresh the server errors, just in case the server came back online
      await this.handleHttpRequest(this.checkServerLiveliness(this.props.serverConfig));
      await this['password_field'].validate({
        allowEmpty: false
      });
      if (!this.state.email) {
        this.showErrorDialog((0,languageHandler._t)('The email address linked to your account must be entered.'));
      } else if (!this.state.password || !this.state.password2) {
        this.showErrorDialog((0,languageHandler._t)('A new password must be entered.'));
      } else if (!this.state.passwordFieldValid) {
        this.showErrorDialog((0,languageHandler._t)('Please choose a strong password'));
      } else if (this.state.password !== this.state.password2) {
        this.showErrorDialog((0,languageHandler._t)('New passwords must match each other.'));
      } else {
        const QuestionDialog = src.getComponent("dialogs.QuestionDialog");
        Modal/* default */.Z.createTrackedDialog('Forgot Password Warning', '', QuestionDialog, {
          title: (0,languageHandler._t)('Warning!'),
          description: /*#__PURE__*/react.createElement("div", null, (0,languageHandler._t)("Changing your password will reset any end-to-end encryption keys " + "on all of your sessions, making encrypted chat history unreadable. Set up " + "Key Backup or export your room keys from another session before resetting your " + "password.")),
          button: (0,languageHandler._t)('Continue'),
          onFinished: confirmed => {
            if (confirmed) {
              this.submitPasswordReset(this.state.email, this.state.password);
            }
          }
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onInputChanged", (stateKey, ev) => {
      this.setState({
        [stateKey]: ev.currentTarget.value
      });
    });
    (0,defineProperty/* default */.Z)(this, "onLoginClick", ev => {
      ev.preventDefault();
      ev.stopPropagation();
      this.props.onLoginClick();
    });
    CountlyAnalytics/* default */.Z.instance.track("onboarding_forgot_password_begin");
  }
  componentDidMount() {
    this.reset = null;
    this.checkServerLiveliness(this.props.serverConfig);
  }

  // TODO: [REACT-WARNING] Replace with appropriate lifecycle event
  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.serverConfig.hsUrl === this.props.serverConfig.hsUrl && newProps.serverConfig.isUrl === this.props.serverConfig.isUrl) return;

    // Do a liveliness check on the new URLs
    this.checkServerLiveliness(newProps.serverConfig);
  }
  async checkServerLiveliness(serverConfig) {
    try {
      await AutoDiscoveryUtils/* default */.Z.validateServerConfigWithStaticUrls(serverConfig.hsUrl, serverConfig.isUrl);
      this.setState({
        serverIsAlive: true
      });
    } catch (e) {
      this.setState(AutoDiscoveryUtils/* default */.Z.authComponentStateForError(e, "forgot_password"));
    }
  }
  submitPasswordReset(email, password) {
    this.setState({
      phase: Phase.SendingEmail
    });
    this.reset = new PasswordReset(this.props.serverConfig.hsUrl, this.props.serverConfig.isUrl);
    this.reset.resetPassword(email, password).then(() => {
      this.setState({
        phase: Phase.EmailSent
      });
    }, err => {
      this.showErrorDialog((0,languageHandler._t)('Failed to send email') + ": " + err.message);
      this.setState({
        phase: Phase.Forgot
      });
    });
  }
  showErrorDialog(description, title) {
    const ErrorDialog = src.getComponent("dialogs.ErrorDialog");
    Modal/* default */.Z.createTrackedDialog('Forgot Password Error', '', ErrorDialog, {
      title,
      description
    });
  }
  onPasswordValidate(result) {
    this.setState({
      passwordFieldValid: result.valid
    });
  }
  handleHttpRequest(request) {
    this.setState({
      currentHttpRequest: request
    });
    return request.finally(() => {
      this.setState({
        currentHttpRequest: undefined
      });
    });
  }
  renderForgot() {
    let errorText = null;
    const err = this.state.errorText;
    if (err) {
      errorText = /*#__PURE__*/react.createElement("div", {
        className: "mx_Login_error"
      }, err);
    }
    let serverDeadSection;
    if (!this.state.serverIsAlive) {
      const classes = classnames_default()({
        "mx_Login_error": true,
        "mx_Login_serverError": true,
        "mx_Login_serverErrorNonFatal": !this.state.serverErrorIsFatal
      });
      serverDeadSection = /*#__PURE__*/react.createElement("div", {
        className: classes
      }, this.state.serverDeadError);
    }
    return /*#__PURE__*/react.createElement("div", null, errorText, serverDeadSection, /*#__PURE__*/react.createElement(ServerPicker/* default */.Z, {
      serverConfig: this.props.serverConfig,
      onServerConfigChange: this.props.onServerConfigChange
    }), /*#__PURE__*/react.createElement("form", {
      onSubmit: this.onSubmitForm
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthBody_fieldRow"
    }, /*#__PURE__*/react.createElement(Field/* default */.Z, {
      name: "reset_email" // define a name so browser's password autofill gets less confused
      ,
      type: "text",
      label: (0,languageHandler._t)('Email'),
      value: this.state.email,
      onChange: this.onInputChanged.bind(this, "email"),
      autoFocus: true,
      onFocus: () => CountlyAnalytics/* default */.Z.instance.track("onboarding_forgot_password_email_focus"),
      onBlur: () => CountlyAnalytics/* default */.Z.instance.track("onboarding_forgot_password_email_blur")
    })), /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthBody_fieldRow"
    }, /*#__PURE__*/react.createElement(PassphraseField/* default */.Z, {
      name: "reset_password",
      type: "password",
      label: (0,languageHandler/* _td */.I8)('New Password'),
      value: this.state.password,
      minScore: RegistrationForm/* PASSWORD_MIN_SCORE */.H,
      onChange: this.onInputChanged.bind(this, "password"),
      fieldRef: field => this['password_field'] = field,
      onValidate: result => this.onPasswordValidate(result),
      onFocus: () => CountlyAnalytics/* default */.Z.instance.track("onboarding_forgot_password_newPassword_focus"),
      onBlur: () => CountlyAnalytics/* default */.Z.instance.track("onboarding_forgot_password_newPassword_blur"),
      autoComplete: "new-password"
    }), /*#__PURE__*/react.createElement(Field/* default */.Z, {
      name: "reset_password_confirm",
      type: "password",
      label: (0,languageHandler._t)('Confirm'),
      value: this.state.password2,
      onChange: this.onInputChanged.bind(this, "password2"),
      onFocus: () => CountlyAnalytics/* default */.Z.instance.track("onboarding_forgot_password_newPassword2_focus"),
      onBlur: () => CountlyAnalytics/* default */.Z.instance.track("onboarding_forgot_password_newPassword2_blur"),
      autoComplete: "new-password"
    })), /*#__PURE__*/react.createElement("span", null, (0,languageHandler._t)('A verification email will be sent to your inbox to confirm ' + 'setting your new password.')), /*#__PURE__*/react.createElement("input", {
      className: "mx_Login_submit",
      type: "submit",
      value: (0,languageHandler._t)('Send Reset Email')
    })), /*#__PURE__*/react.createElement("a", {
      className: "mx_AuthBody_changeFlow",
      onClick: this.onLoginClick,
      href: "#"
    }, (0,languageHandler._t)('Sign in instead')));
  }
  renderSendingEmail() {
    const Spinner = src.getComponent("elements.Spinner");
    return /*#__PURE__*/react.createElement(Spinner, null);
  }
  renderEmailSent() {
    return /*#__PURE__*/react.createElement("div", null, (0,languageHandler._t)("An email has been sent to %(emailAddress)s. Once you've followed the " + "link it contains, click below.", {
      emailAddress: this.state.email
    }), /*#__PURE__*/react.createElement("br", null), /*#__PURE__*/react.createElement("input", {
      className: "mx_Login_submit",
      type: "button",
      onClick: this.onVerify,
      value: (0,languageHandler._t)('I have verified my email address')
    }), this.state.currentHttpRequest && /*#__PURE__*/react.createElement("div", {
      className: "mx_Login_spinner"
    }, /*#__PURE__*/react.createElement(InlineSpinner/* default */.Z, {
      w: 64,
      h: 64
    })));
  }
  renderDone() {
    return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Your password has been reset.")), /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("You have been logged out of all sessions and will no longer receive " + "push notifications. To re-enable notifications, sign in again on each " + "device.")), /*#__PURE__*/react.createElement("input", {
      className: "mx_Login_submit",
      type: "button",
      onClick: this.props.onComplete,
      value: (0,languageHandler._t)('Return to login screen')
    }));
  }
  render() {
    let resetPasswordJsx;
    switch (this.state.phase) {
      case Phase.Forgot:
        resetPasswordJsx = this.renderForgot();
        break;
      case Phase.SendingEmail:
        resetPasswordJsx = this.renderSendingEmail();
        break;
      case Phase.EmailSent:
        resetPasswordJsx = this.renderEmailSent();
        break;
      case Phase.Done:
        resetPasswordJsx = this.renderDone();
        break;
      default:
        resetPasswordJsx = /*#__PURE__*/react.createElement("div", {
          className: "mx_Login_spinner"
        }, /*#__PURE__*/react.createElement(InlineSpinner/* default */.Z, {
          w: 64,
          h: 64
        }));
    }
    return /*#__PURE__*/react.createElement(AuthPage/* default */.Z, null, /*#__PURE__*/react.createElement(AuthHeader/* default */.Z, null), /*#__PURE__*/react.createElement(AuthBody/* default */.Z, null, /*#__PURE__*/react.createElement("h2", null, " ", (0,languageHandler._t)('Set a new password'), " "), resetPasswordJsx));
  }
}

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

/***/ 685203:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ AuthHeader)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/AuthHeaderLogo.tsx
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


// import { replaceableComponent } from "../../../utils/replaceableComponent";

// @replaceableComponent("views.auth.AuthHeaderLogo")
class AuthHeaderLogo extends react.PureComponent {
  render() {
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthHeaderLogo"
    }, "Matrix");
  }
}
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


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ AuthPage)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/auth/AuthFooter.tsx
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



// import { replaceableComponent } from "../../../utils/replaceableComponent";

// @replaceableComponent("views.auth.AuthFooter")
class AuthFooter extends react.Component {
  render() {
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthFooter"
    }, /*#__PURE__*/react.createElement("a", {
      href: "https://matrix.org",
      target: "_blank",
      rel: "noreferrer noopener"
    }, (0,languageHandler._t)("powered by Matrix")));
  }
}
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

/***/ 585846:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ elements_ServerPicker)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AccessibleButton.tsx
var AccessibleButton = __webpack_require__(805035);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/TextWithTooltip.tsx + 3 modules
var TextWithTooltip = __webpack_require__(852240);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/SdkConfig.ts
var SdkConfig = __webpack_require__(374312);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Modal.tsx + 1 modules
var Modal = __webpack_require__(241648);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(225259);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/autodiscovery.ts
var autodiscovery = __webpack_require__(725111);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/AutoDiscoveryUtils.tsx + 1 modules
var AutoDiscoveryUtils = __webpack_require__(940062);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/BaseDialog.js
var BaseDialog = __webpack_require__(308043);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Field.tsx
var Field = __webpack_require__(455537);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/StyledRadioButton.tsx
var StyledRadioButton = __webpack_require__(861766);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Validation.tsx
var Validation = __webpack_require__(997038);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ServerPickerDialog.tsx

/*
Copyright 2020-2021 The Matrix.org Foundation C.I.C.

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

// @replaceableComponent("views.dialogs.ServerPickerDialog")
class ServerPickerDialog extends react.PureComponent {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "defaultServer", void 0);
    (0,defineProperty/* default */.Z)(this, "fieldRef", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "validatedConf", void 0);
    (0,defineProperty/* default */.Z)(this, "onDefaultChosen", () => {
      this.setState({
        defaultChosen: true
      });
    });
    (0,defineProperty/* default */.Z)(this, "onOtherChosen", () => {
      this.setState({
        defaultChosen: false
      });
    });
    (0,defineProperty/* default */.Z)(this, "onHomeserverChange", ev => {
      this.setState({
        otherHomeserver: ev.target.value
      });
    });
    // TODO: Do we want to support .well-known lookups here?
    // If for some reason someone enters "matrix.org" for a URL, we could do a lookup to
    // find their homeserver without demanding they use "https://matrix.org"
    (0,defineProperty/* default */.Z)(this, "validate", (0,Validation/* default */.Z)({
      deriveData: async ({
        value
      }) => {
        let hsUrl = value.trim(); // trim to account for random whitespace

        // if the URL has no protocol, try validate it as a serverName via well-known
        if (!hsUrl.includes("://")) {
          try {
            const discoveryResult = await autodiscovery/* AutoDiscovery */.m.findClientConfig(hsUrl);
            this.validatedConf = AutoDiscoveryUtils/* default */.Z.buildValidatedConfigFromDiscovery(hsUrl, discoveryResult);
            return {}; // we have a validated config, we don't need to try the other paths
          } catch (e) {
            console.error(`Attempted ${hsUrl} as a server_name but it failed`, e);
          }
        }

        // if we got to this stage then either the well-known failed or the URL had a protocol specified,
        // so validate statically only. If the URL has no protocol, default to https.
        if (!hsUrl.includes("://")) {
          hsUrl = "https://" + hsUrl;
        }
        try {
          this.validatedConf = await AutoDiscoveryUtils/* default */.Z.validateServerConfigWithStaticUrls(hsUrl);
          return {};
        } catch (e) {
          console.error(e);
          const stateForError = AutoDiscoveryUtils/* default */.Z.authComponentStateForError(e);
          if (stateForError.serverErrorIsFatal) {
            let error = (0,languageHandler._t)("Unable to validate homeserver");
            if (e.translatedMessage) {
              error = e.translatedMessage;
            }
            return {
              error
            };
          }

          // try to carry on anyway
          try {
            this.validatedConf = await AutoDiscoveryUtils/* default */.Z.validateServerConfigWithStaticUrls(hsUrl, null, true);
            return {};
          } catch (e) {
            console.error(e);
            return {
              error: (0,languageHandler._t)("Invalid URL")
            };
          }
        }
      },
      rules: [{
        key: "required",
        test: ({
          value,
          allowEmpty
        }) => allowEmpty || !!value,
        invalid: () => (0,languageHandler._t)("Specify a homeserver")
      }, {
        key: "valid",
        test: async function ({
          value
        }, {
          error
        }) {
          if (!value) return true;
          return !error;
        },
        invalid: function ({
          error
        }) {
          return error;
        }
      }]
    }));
    (0,defineProperty/* default */.Z)(this, "onHomeserverValidate", fieldState => this.validate(fieldState));
    (0,defineProperty/* default */.Z)(this, "onSubmit", async ev => {
      ev.preventDefault();
      const valid = await this.fieldRef.current.validate({
        allowEmpty: false
      });
      if (!valid && !this.state.defaultChosen) {
        this.fieldRef.current.focus();
        this.fieldRef.current.validate({
          allowEmpty: false,
          focused: true
        });
        return;
      }
      this.props.onFinished(this.state.defaultChosen ? this.defaultServer : this.validatedConf);
    });
    const config = SdkConfig/* default */.Z.get();
    this.defaultServer = config["validated_server_config"];
    const {
      serverConfig
    } = this.props;
    let otherHomeserver = "";
    if (!serverConfig.isDefault) {
      if (serverConfig.isNameResolvable && serverConfig.hsName) {
        otherHomeserver = serverConfig.hsName;
      } else {
        otherHomeserver = serverConfig.hsUrl;
      }
    }
    this.state = {
      defaultChosen: serverConfig.isDefault,
      otherHomeserver
    };
  }
  render() {
    let text;
    if (this.defaultServer.hsName === "matrix.org") {
      text = (0,languageHandler._t)("Matrix.org is the biggest public homeserver in the world, so it’s a good place for many.");
    }
    let defaultServerName = this.defaultServer.hsName;
    if (this.defaultServer.hsNameIsDifferent) {
      defaultServerName = /*#__PURE__*/react.createElement(TextWithTooltip/* default */.Z, {
        class: "mx_Login_underlinedServerName",
        tooltip: this.defaultServer.hsUrl
      }, this.defaultServer.hsName);
    }
    return /*#__PURE__*/react.createElement(BaseDialog/* default */.Z, {
      title: this.props.title || (0,languageHandler._t)("Sign into your homeserver"),
      className: "mx_ServerPickerDialog",
      contentId: "mx_ServerPickerDialog",
      onFinished: this.props.onFinished,
      fixedWidth: false,
      hasCancel: true
    }, /*#__PURE__*/react.createElement("form", {
      className: "mx_Dialog_content",
      id: "mx_ServerPickerDialog",
      onSubmit: this.onSubmit
    }, /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("We call the places where you can host your account ‘homeservers’."), " ", text), /*#__PURE__*/react.createElement(StyledRadioButton/* default */.Z, {
      name: "defaultChosen",
      value: "true",
      checked: this.state.defaultChosen,
      onChange: this.onDefaultChosen
    }, defaultServerName), /*#__PURE__*/react.createElement(StyledRadioButton/* default */.Z, {
      name: "defaultChosen",
      value: "false",
      className: "mx_ServerPickerDialog_otherHomeserverRadio",
      checked: !this.state.defaultChosen,
      onChange: this.onOtherChosen,
      childrenInLabel: false
    }, /*#__PURE__*/react.createElement(Field/* default */.Z, {
      type: "text",
      className: "mx_ServerPickerDialog_otherHomeserver",
      label: (0,languageHandler._t)("Other homeserver"),
      onChange: this.onHomeserverChange,
      onFocus: this.onOtherChosen,
      ref: this.fieldRef,
      onValidate: this.onHomeserverValidate,
      value: this.state.otherHomeserver,
      validateOnChange: false,
      validateOnFocus: false,
      id: "mx_homeserverInput"
    })), /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Use your preferred Matrix homeserver if you have one, or host your own.")), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: "mx_ServerPickerDialog_continue",
      kind: "primary",
      onClick: this.onSubmit
    }, (0,languageHandler._t)("Continue")), /*#__PURE__*/react.createElement("h4", null, (0,languageHandler._t)("Learn more")), /*#__PURE__*/react.createElement("a", {
      href: "https://matrix.org/faq/#what-is-a-homeserver%3F",
      target: "_blank",
      rel: "noreferrer noopener"
    }, (0,languageHandler._t)("About homeservers"))));
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/InfoDialog.tsx
var InfoDialog = __webpack_require__(786035);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/ServerPicker.tsx
/*
Copyright 2020-2021 The Matrix.org Foundation C.I.C.

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









const showPickerDialog = (title, serverConfig, onFinished) => {
  Modal/* default */.Z.createTrackedDialog("Server Picker", "", ServerPickerDialog, {
    title,
    serverConfig,
    onFinished
  });
};
const onHelpClick = () => {
  Modal/* default */.Z.createTrackedDialog('Custom Server Dialog', '', InfoDialog/* default */.Z, {
    title: (0,languageHandler._t)("Server Options"),
    description: (0,languageHandler._t)("You can use the custom server options to sign into other Matrix servers by specifying " + "a different homeserver URL. This allows you to use Element with an existing Matrix account on " + "a different homeserver."),
    button: (0,languageHandler._t)("Dismiss"),
    hasCloseButton: false,
    fixedWidth: false
  }, "mx_ServerPicker_helpDialog");
};
const ServerPicker = ({
  title,
  dialogTitle,
  serverConfig,
  onServerConfigChange
}) => {
  let editBtn;
  if (!SdkConfig/* default */.Z.get()["disable_custom_urls"] && onServerConfigChange) {
    const onClick = () => {
      showPickerDialog(dialogTitle, serverConfig, config => {
        if (config) {
          onServerConfigChange(config);
        }
      });
    };
    editBtn = /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: "mx_ServerPicker_change",
      kind: "link",
      onClick: onClick
    }, (0,languageHandler._t)("Edit"));
  }
  let serverName = serverConfig.isNameResolvable ? serverConfig.hsName : serverConfig.hsUrl;
  if (serverConfig.hsNameIsDifferent) {
    serverName = /*#__PURE__*/react.createElement(TextWithTooltip/* default */.Z, {
      class: "mx_Login_underlinedServerName",
      tooltip: serverConfig.hsUrl
    }, serverConfig.hsName);
  }
  let desc;
  if (serverConfig.hsName === "matrix.org") {
    desc = /*#__PURE__*/react.createElement("span", {
      className: "mx_ServerPicker_desc"
    }, (0,languageHandler._t)("Join millions for free on the largest public server"));
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_ServerPicker"
  }, /*#__PURE__*/react.createElement("h3", null, title || (0,languageHandler._t)("Homeserver")), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
    className: "mx_ServerPicker_help",
    onClick: onHelpClick
  }), /*#__PURE__*/react.createElement("span", {
    className: "mx_ServerPicker_server"
  }, serverName), editBtn, desc);
};
/* harmony default export */ const elements_ServerPicker = (ServerPicker);

/***/ })

}]);
//# sourceMappingURL=4498.js.map