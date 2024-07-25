(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[8212],{

/***/ 628212:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Registration)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(225259);
/* harmony import */ var matrix_js_sdk_src_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(540534);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(667294);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(867614);
/* harmony import */ var _utils_ErrorUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(137117);
/* harmony import */ var _utils_AutoDiscoveryUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(940062);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(294184);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Lifecycle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(729017);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(933393);
/* harmony import */ var _views_auth_AuthPage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(200459);
/* harmony import */ var _Login__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(209316);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(245539);
/* harmony import */ var _views_elements_SSOButtons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(449579);
/* harmony import */ var _views_elements_ServerPicker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(585846);
/* harmony import */ var _views_auth_RegistrationForm__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(278126);
/* harmony import */ var _views_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(805035);
/* harmony import */ var _views_auth_AuthBody__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(489665);
/* harmony import */ var _views_auth_AuthHeader__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(685203);
/* harmony import */ var _InteractiveAuth__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(938645);
/* harmony import */ var _views_elements_Spinner__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(641542);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
Copyright 2015-2021 The Matrix.org Foundation C.I.C.

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






// @replaceableComponent("structures.auth.Registration")
class Registration extends react__WEBPACK_IMPORTED_MODULE_2__.Component {
  constructor(props) {
    super(props);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "loginLogic", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "onFormSubmit", async formVals => {
      this.setState({
        errorText: "",
        busy: true,
        formVals: formVals,
        doingUIAuth: true
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "requestEmailToken", (emailAddress, clientSecret, sendAttempt, sessionId) => {
      return this.state.matrixClient.requestRegisterEmailToken(emailAddress, clientSecret, sendAttempt, this.props.makeRegistrationUrl({
        client_secret: clientSecret,
        hs_url: this.state.matrixClient.getHomeserverUrl(),
        is_url: this.state.matrixClient.getIdentityServerUrl(),
        session_id: sessionId
      }));
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "onUIAuthFinished", async (success, response) => {
      if (!success) {
        let msg = response.message || response.toString();
        // can we give a better error message?
        if (response.errcode === 'M_RESOURCE_LIMIT_EXCEEDED') {
          const errorTop = (0,_utils_ErrorUtils__WEBPACK_IMPORTED_MODULE_4__/* .messageForResourceLimitError */ .L)(response.data.limit_type, response.data.admin_contact, {
            'monthly_active_user': (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__/* ._td */ .I8)("This homeserver has hit its Monthly Active User limit."),
            'hs_blocked': (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__/* ._td */ .I8)("This homeserver has been blocked by it's administrator."),
            '': (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__/* ._td */ .I8)("This homeserver has exceeded one of its resource limits.")
          });
          const errorDetail = (0,_utils_ErrorUtils__WEBPACK_IMPORTED_MODULE_4__/* .messageForResourceLimitError */ .L)(response.data.limit_type, response.data.admin_contact, {
            '': (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__/* ._td */ .I8)("Please <a>contact your service administrator</a> to continue using this service.")
          });
          msg = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", null, errorTop), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", null, errorDetail));
        } else if (response.required_stages && response.required_stages.indexOf('m.login.msisdn') > -1) {
          let msisdnAvailable = false;
          for (const flow of response.available_flows) {
            msisdnAvailable = msisdnAvailable || flow.stages.includes('m.login.msisdn');
          }
          if (!msisdnAvailable) {
            msg = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)('This server does not support authentication with a phone number.');
          }
        } else if (response.errcode === "M_USER_IN_USE") {
          msg = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("That username already exists, please try another.");
        }
        this.setState({
          busy: false,
          doingUIAuth: false,
          errorText: msg
        });
        return;
      }
      _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_8__/* .MatrixClientPeg */ .p.setJustRegisteredUserId(response.user_id);
      const newState = {
        doingUIAuth: false,
        registeredUsername: response.user_id,
        differentLoggedInUserId: null,
        completedNoSignin: false,
        // we're still busy until we get unmounted: don't show the registration form again
        busy: true
      };

      // The user came in through an email validation link. To avoid overwriting
      // their session, check to make sure the session isn't someone else, and
      // isn't a guest user since we'll usually have set a guest user session before
      // starting the registration process. This isn't perfect since it's possible
      // the user had a separate guest session they didn't actually mean to replace.
      const [sessionOwner, sessionIsGuest] = await _Lifecycle__WEBPACK_IMPORTED_MODULE_7__/* .getStoredSessionOwner */ .nr();
      if (sessionOwner && !sessionIsGuest && sessionOwner !== response.userId) {
        console.log(`Found a session for ${sessionOwner} but ${response.userId} has just registered.`);
        newState.differentLoggedInUserId = sessionOwner;
      }
      if (response.access_token) {
        await this.props.onLoggedIn({
          userId: response.user_id,
          deviceId: response.device_id,
          homeserverUrl: this.state.matrixClient.getHomeserverUrl(),
          identityServerUrl: this.state.matrixClient.getIdentityServerUrl(),
          accessToken: response.access_token
        }, this.state.formVals.password);
        this.setupPushers();
      } else {
        newState.busy = false;
        newState.completedNoSignin = true;
      }
      this.setState(newState);
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "onLoginClick", ev => {
      ev.preventDefault();
      ev.stopPropagation();
      this.props.onLoginClick();
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "onGoToFormClicked", ev => {
      ev.preventDefault();
      ev.stopPropagation();
      this.replaceClient(this.props.serverConfig);
      this.setState({
        busy: false,
        doingUIAuth: false
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "makeRegisterRequest", auth => {
      // We inhibit login if we're trying to register with an email address: this
      // avoids a lot of complex race conditions that can occur if we try to log
      // the user in one one or both of the tabs they might end up with after
      // clicking the email link.
      let inhibitLogin = Boolean(this.state.formVals.email);

      // Only send inhibitLogin if we're sending username / pw params
      // (Since we need to send no params at all to use the ones saved in the
      // session).
      if (!this.state.formVals.password) inhibitLogin = null;
      const registerParams = {
        username: this.state.formVals.username,
        password: this.state.formVals.password,
        initial_device_display_name: this.props.defaultDeviceDisplayName,
        auth: undefined,
        inhibit_login: undefined
      };
      if (auth) registerParams.auth = auth;
      if (inhibitLogin !== undefined && inhibitLogin !== null) registerParams.inhibit_login = inhibitLogin;
      return this.state.matrixClient.registerRequest(registerParams);
    });
    // Links to the login page shown after registration is completed are routed through this
    // which checks the user hasn't already logged in somewhere else (perhaps we should do
    // this more generally?)
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "onLoginClickWithCheck", async ev => {
      ev.preventDefault();
      const sessionLoaded = await _Lifecycle__WEBPACK_IMPORTED_MODULE_7__/* .loadSession */ .dF({
        ignoreGuest: true
      });
      if (!sessionLoaded) {
        // ok fine, there's still no session: really go to the login page
        this.props.onLoginClick();
      }
      return sessionLoaded;
    });
    this.state = {
      busy: false,
      errorText: null,
      formVals: {
        email: this.props.email
      },
      doingUIAuth: Boolean(this.props.sessionId),
      flows: null,
      completedNoSignin: false,
      serverIsAlive: true,
      serverErrorIsFatal: false,
      serverDeadError: ""
    };
    const {
      hsUrl,
      isUrl
    } = this.props.serverConfig;
    this.loginLogic = new _Login__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .ZP(hsUrl, isUrl, null, {
      defaultDeviceDisplayName: "Element login check" // We shouldn't ever be used
    });
  }

  componentDidMount() {
    this.replaceClient(this.props.serverConfig);
  }

  // TODO: [REACT-WARNING] Replace with appropriate lifecycle event
  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.serverConfig.hsUrl === this.props.serverConfig.hsUrl && newProps.serverConfig.isUrl === this.props.serverConfig.isUrl) return;
    this.replaceClient(newProps.serverConfig);
  }
  async replaceClient(serverConfig) {
    this.setState({
      errorText: null,
      serverDeadError: null,
      serverErrorIsFatal: false,
      // busy while we do liveness check (we need to avoid trying to render
      // the UI auth component while we don't have a matrix client)
      busy: true
    });

    // Do a liveliness check on the URLs
    try {
      await _utils_AutoDiscoveryUtils__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z.validateServerConfigWithStaticUrls(serverConfig.hsUrl, serverConfig.isUrl);
      this.setState({
        serverIsAlive: true,
        serverErrorIsFatal: false
      });
    } catch (e) {
      this.setState(_objectSpread({
        busy: false
      }, _utils_AutoDiscoveryUtils__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z.authComponentStateForError(e, "register")));
      if (this.state.serverErrorIsFatal) {
        return; // Server is dead - do not continue.
      }
    }

    const {
      hsUrl,
      isUrl
    } = serverConfig;
    const cli = (0,matrix_js_sdk_src_matrix__WEBPACK_IMPORTED_MODULE_1__.createClient)({
      baseUrl: hsUrl,
      idBaseUrl: isUrl
    });
    this.loginLogic.setHomeserverUrl(hsUrl);
    this.loginLogic.setIdentityServerUrl(isUrl);
    let ssoFlow;
    try {
      const loginFlows = await this.loginLogic.getFlows();
      ssoFlow = loginFlows.find(f => f.type === "m.login.sso" || f.type === "m.login.cas");
    } catch (e) {
      console.error("Failed to get login flows to check for SSO support", e);
    }
    this.setState({
      matrixClient: cli,
      ssoFlow,
      busy: false
    });
    const showGenericError = e => {
      this.setState({
        errorText: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Unable to query for supported registration methods."),
        // add empty flows array to get rid of spinner
        flows: []
      });
    };
    try {
      // We do the first registration request ourselves to discover whether we need to
      // do SSO instead. If we've already started the UI Auth process though, we don't
      // need to.
      if (!this.state.doingUIAuth) {
        await this.makeRegisterRequest(null);
        // This should never succeed since we specified no auth object.
        console.log("Expecting 401 from register request but got success!");
      }
    } catch (e) {
      if (e.httpStatus === 401) {
        this.setState({
          flows: e.data.flows
        });
      } else if (e.httpStatus === 403 || e.errcode === "M_FORBIDDEN") {
        // Check for 403 or M_FORBIDDEN, Synapse used to send 403 M_UNKNOWN but now sends 403 M_FORBIDDEN.
        // At this point registration is pretty much disabled, but before we do that let's
        // quickly check to see if the server supports SSO instead. If it does, we'll send
        // the user off to the login page to figure their account out.
        if (ssoFlow) {
          // Redirect to login page - server probably expects SSO only
          _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .ZP.dispatch({
            action: 'start_login'
          });
        } else {
          this.setState({
            serverErrorIsFatal: true,
            // fatal because user cannot continue on this server
            errorText: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Registration has been disabled on this homeserver."),
            // add empty flows array to get rid of spinner
            flows: []
          });
        }
      } else {
        console.log("Unable to query for supported registration methods.", e);
        showGenericError(e);
      }
    }
  }
  setupPushers() {
    if (!this.props.brand) {
      return Promise.resolve();
    }
    const matrixClient = _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_8__/* .MatrixClientPeg */ .p.get();
    return matrixClient.getPushers().then(resp => {
      const pushers = resp.pushers;
      for (let i = 0; i < pushers.length; ++i) {
        if (pushers[i].kind === 'email') {
          const emailPusher = pushers[i];
          emailPusher.data = {
            brand: this.props.brand
          };
          matrixClient.setPusher(emailPusher).then(() => {
            console.log("Set email branding to " + this.props.brand);
          }, error => {
            console.error("Couldn't set email branding: " + error);
          });
        }
      }
    }, error => {
      console.error("Couldn't get pushers: " + error);
    });
  }
  getUIAuthInputs() {
    return {
      emailAddress: this.state.formVals.email,
      phoneCountry: this.state.formVals.phoneCountry,
      phoneNumber: this.state.formVals.phoneNumber
    };
  }
  renderRegisterComponent() {
    if (this.state.matrixClient && this.state.doingUIAuth) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_InteractiveAuth__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z, {
        matrixClient: this.state.matrixClient,
        makeRequest: this.makeRegisterRequest,
        onAuthFinished: this.onUIAuthFinished,
        inputs: this.getUIAuthInputs(),
        requestEmailToken: this.requestEmailToken,
        sessionId: this.props.sessionId,
        clientSecret: this.props.clientSecret,
        emailSid: this.props.idSid,
        poll: true
      });
    } else if (!this.state.matrixClient && !this.state.busy) {
      return null;
    } else if (this.state.busy || !this.state.flows) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
        className: "mx_AuthBody_spinner"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_views_elements_Spinner__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .Z, null));
    } else if (this.state.flows.length) {
      let ssoSection;
      if (this.state.ssoFlow) {
        let continueWithSection;
        const providers = this.state.ssoFlow.identity_providers || [];
        // when there is only a single (or 0) providers we show a wide button with `Continue with X` text
        if (providers.length > 1) {
          // i18n: ssoButtons is a placeholder to help translators understand context
          continueWithSection = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("h3", {
            className: "mx_AuthBody_centered"
          }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Continue with %(ssoButtons)s", {
            ssoButtons: ""
          }).trim());
        }

        // i18n: ssoButtons & usernamePassword are placeholders to help translators understand context
        ssoSection = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, continueWithSection, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_views_elements_SSOButtons__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
          matrixClient: this.loginLogic.createTemporaryClient(),
          flow: this.state.ssoFlow,
          loginType: this.state.ssoFlow.type === "m.login.sso" ? "sso" : "cas",
          fragmentAfterLogin: this.props.fragmentAfterLogin
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("h3", {
          className: "mx_AuthBody_centered"
        }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("%(ssoButtons)s Or %(usernamePassword)s", {
          ssoButtons: "",
          usernamePassword: ""
        }).trim()));
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, ssoSection, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_views_auth_RegistrationForm__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
        defaultUsername: this.state.formVals.username,
        defaultEmail: this.state.formVals.email,
        defaultPhoneCountry: this.state.formVals.phoneCountry,
        defaultPhoneNumber: this.state.formVals.phoneNumber,
        defaultPassword: this.state.formVals.password,
        onRegisterClick: this.onFormSubmit,
        flows: this.state.flows,
        serverConfig: this.props.serverConfig,
        canSubmit: !this.state.serverErrorIsFatal
      }));
    }
  }
  render() {
    let errorText;
    const err = this.state.errorText;
    if (err) {
      errorText = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
        className: "mx_Login_error"
      }, err);
    }
    let serverDeadSection;
    if (!this.state.serverIsAlive) {
      const classes = classnames__WEBPACK_IMPORTED_MODULE_6___default()({
        "mx_Login_error": true,
        "mx_Login_serverError": true,
        "mx_Login_serverErrorNonFatal": !this.state.serverErrorIsFatal
      });
      serverDeadSection = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
        className: classes
      }, this.state.serverDeadError);
    }
    const signIn = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("span", {
      className: "mx_AuthBody_changeFlow"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Already have an account? <a>Sign in here</a>", {}, {
      a: sub => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("a", {
        onClick: this.onLoginClick,
        href: "#"
      }, sub)
    }));

    // Only show the 'go back' button if you're not looking at the form
    let goBack;
    if (this.state.doingUIAuth) {
      goBack = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("a", {
        className: "mx_AuthBody_changeFlow",
        onClick: this.onGoToFormClicked,
        href: "#"
      }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)('Go back'));
    }
    let body;
    if (this.state.completedNoSignin) {
      let regDoneText;
      if (this.state.differentLoggedInUserId) {
        regDoneText = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Your new account (%(newAccountId)s) is registered, but you're already " + "logged into a different account (%(loggedInUserId)s).", {
          newAccountId: this.state.registeredUsername,
          loggedInUserId: this.state.differentLoggedInUserId
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_views_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z, {
          element: "span",
          className: "mx_linkButton",
          onClick: async event => {
            const sessionLoaded = await this.onLoginClickWithCheck(event);
            if (sessionLoaded) {
              _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .ZP.dispatch({
                action: "view_welcome_page"
              });
            }
          }
        }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Continue with previous account"))));
      } else if (this.state.formVals.password) {
        // We're the client that started the registration
        regDoneText = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("h3", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("<a>Log in</a> to your new account.", {}, {
          a: sub => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("a", {
            href: "#/login",
            onClick: this.onLoginClickWithCheck
          }, sub)
        }));
      } else {
        // We're not the original client: the user probably got to us by clicking the
        // email validation link. We can't offer a 'go straight to your account' link
        // as we don't have the original creds.
        regDoneText = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("h3", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("You can now close this window or <a>log in</a> to your new account.", {}, {
          a: sub => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("a", {
            href: "#/login",
            onClick: this.onLoginClickWithCheck
          }, sub)
        }));
      }
      body = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("h2", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Registration Successful")), regDoneText);
    } else {
      body = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("h2", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)('Create account')), errorText, serverDeadSection, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_views_elements_ServerPicker__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
        title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Host account on"),
        dialogTitle: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Decide where your account is hosted"),
        serverConfig: this.props.serverConfig,
        onServerConfigChange: this.state.doingUIAuth ? undefined : config => {
          _Lifecycle__WEBPACK_IMPORTED_MODULE_7__/* .updateUserNetworkNode */ .lF("user_select", {
            peer: config.peer,
            name: config.hsName,
            endpoint: config.hsUrl
          });
          this.props.onServerConfigChange(config);
        }
      }), this.renderRegisterComponent(), goBack, signIn);
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_views_auth_AuthPage__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_views_auth_AuthHeader__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_views_auth_AuthBody__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z, null, body));
  }
}

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

"use strict";

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

/***/ 585846:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

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
//# sourceMappingURL=8212.js.map