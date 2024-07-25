"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[8673],{

/***/ 764608:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNetworkNodes: () => (/* binding */ getNetworkNodes),
/* harmony export */   loadApp: () => (/* binding */ loadApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var matrix_react_sdk_src_components_structures_MatrixChat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(925318);
/* harmony import */ var matrix_react_sdk_src_PlatformPeg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(311187);
/* harmony import */ var matrix_react_sdk_src_languageHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(867614);
/* harmony import */ var matrix_react_sdk_src_utils_AutoDiscoveryUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(940062);
/* harmony import */ var matrix_js_sdk_src_autodiscovery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(725111);
/* harmony import */ var matrix_react_sdk_src_Lifecycle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(729017);
/* harmony import */ var matrix_react_sdk_src_SdkConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(374312);
/* harmony import */ var _url_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(135103);
/* harmony import */ var matrix_js_sdk_src_matrix__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(540534);
/* harmony import */ var less__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(456111);
/* harmony import */ var less__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(less__WEBPACK_IMPORTED_MODULE_10__);
/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2017 Vector Creations Ltd
Copyright 2018, 2019 New Vector Ltd
Copyright 2019 Michael Telatynski <7t3chguy@gmail.com>
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


// add React and ReactPerf to the global namespace, to make them easier to access via the console
// this incidentally means we can forget our React imports in JSX files without penalty.
window.React = react__WEBPACK_IMPORTED_MODULE_0__;

// const MatrixChat  = React.lazy(() => import('matrix-react-sdk/src/components/structures/MatrixChat'))










let lastLocationHashSet = null;
console.log(`Application is running in ${"production"} mode`);

// Parse the given window.location and return parameters that can be used when calling
// MatrixChat.showScreen(screen, params)
function getScreenFromLocation(location) {
  const fragparts = (0,_url_utils__WEBPACK_IMPORTED_MODULE_8__/* .parseQsFromFragment */ .D)(location);
  return {
    screen: fragparts.location.substring(1),
    params: fragparts.params
  };
}

// Here, we do some crude URL analysis to allow
// deep-linking.
function routeUrl(location) {
  if (!window.matrixChat) return;
  console.log("Routing URL ", location.href);
  const s = getScreenFromLocation(location);
  window.matrixChat.showScreen(s.screen, s.params);
}
function onHashChange(ev) {
  if (decodeURIComponent(window.location.hash) === lastLocationHashSet) {
    // we just set this: no need to route it!
    return;
  }
  routeUrl(window.location);
}

// This will be called whenever the SDK changes screens,
// so a web page can update the URL bar appropriately.
function onNewScreen(screen, replaceLast = false) {
  console.log("newscreen " + screen);
  const hash = "#/" + screen;
  lastLocationHashSet = hash;

  // if the new hash is a substring of the old one then we are stripping fields e.g `via` so replace history
  if (screen.startsWith("room/") && window.location.hash.includes("/$") === hash.includes("/$") &&
  // only if both did or didn't contain event link
  window.location.hash.startsWith(hash)) {
    replaceLast = true;
  }
  if (replaceLast) {
    window.location.replace(hash);
  } else {
    window.location.assign(hash);
  }
}

// We use this to work out what URL the SDK should
// pass through when registering to allow the user to
// click back to the client having registered.
// It's up to us to recognise if we're loaded with
// this URL and tell MatrixClient to resume registration.
//
// If we're in electron, we should never pass through a file:// URL otherwise
// the identity server will try to 302 the browser to it, which breaks horribly.
// so in that instance, hardcode to use app.element.io for now instead.
function makeRegistrationUrl(params) {
  let url;
  if (window.location.protocol === "vector:") {
    url = "https://app.element.io/#/register";
  } else {
    url = window.location.protocol + "//" + window.location.host + window.location.pathname + "#/register";
  }
  const keys = Object.keys(params);
  for (let i = 0; i < keys.length; ++i) {
    if (i === 0) {
      url += "?";
    } else {
      url += "&";
    }
    const k = keys[i];
    url += k + "=" + encodeURIComponent(params[k]);
  }
  return url;
}
function onTokenLoginCompleted() {
  // if we did a token login, we're now left with the token, hs and is
  // url as query params in the url; a little nasty but let's redirect to
  // clear them.
  const url = new URL(window.location.href);
  url.searchParams.delete("loginToken");
  console.log(`Redirecting to ${url.href} to drop loginToken from queryparams`);
  window.history.replaceState(null, "", url.href);
}
async function loadApp(fragParams) {
  var _config$fedNodes;
  window.addEventListener("hashchange", onHashChange);
  const platform = matrix_react_sdk_src_PlatformPeg__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.get();
  const params = (0,_url_utils__WEBPACK_IMPORTED_MODULE_8__/* .parseQs */ .l)(window.location);
  if (window && "less" in window) {
    (less__WEBPACK_IMPORTED_MODULE_10___default().options).javascriptEnabled = true;
    window.less = (less__WEBPACK_IMPORTED_MODULE_10___default());
  }
  const urlWithoutQuery = window.location.protocol + "//" + window.location.host + window.location.pathname;
  console.log("Vector starting at " + urlWithoutQuery);
  platform.startUpdater();

  // Don't bother loading the app until the config is verified
  const config = await verifyServerConfig();

  // Before we continue, let's see if we're supposed to do an SSO redirect
  const [userId] = await matrix_react_sdk_src_Lifecycle__WEBPACK_IMPORTED_MODULE_6__/* .getStoredSessionOwner */ .nr();
  const hasPossibleToken = !!userId;
  const isReturningFromSso = !!params.loginToken;
  const autoRedirect = config["sso_immediate_redirect"] === true;
  if (!hasPossibleToken && !isReturningFromSso && autoRedirect) {
    console.log("Bypassing app load to redirect to SSO");
    const tempCli = (0,matrix_js_sdk_src_matrix__WEBPACK_IMPORTED_MODULE_9__.createClient)({
      baseUrl: config["validated_server_config"].hsUrl,
      idBaseUrl: config["validated_server_config"].isUrl
    });
    matrix_react_sdk_src_PlatformPeg__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.get().startSingleSignOn(tempCli, "sso", `/${getScreenFromLocation(window.location).screen}`);

    // We return here because startSingleSignOn() will asynchronously redirect us. We don't
    // care to wait for it, and don't want to show any UI while we wait (not even half a welcome
    // page). As such, just don't even bother loading the MatrixChat component.
    return;
  }

  // const MatrixChat = sdk.getComponent("structures.MatrixChat");
  return (
    /*#__PURE__*/
    // <React.Suspense fallback={<></>}>
    react__WEBPACK_IMPORTED_MODULE_0__.createElement(matrix_react_sdk_src_components_structures_MatrixChat__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP, {
      onNewScreen: onNewScreen,
      makeRegistrationUrl: makeRegistrationUrl,
      config: config,
      realQueryParams: params,
      startingFragmentQueryParams: fragParams,
      enableGuest: !config.disable_guests,
      onTokenLoginCompleted: onTokenLoginCompleted,
      initialScreenAfterLogin: getScreenFromLocation(window.location),
      defaultDeviceDisplayName: platform.getDefaultDeviceDisplayName(),
      networkNodes: (_config$fedNodes = config.fedNodes) !== null && _config$fedNodes !== void 0 ? _config$fedNodes : []
    })
    // </React.Suspense>
  );
}

async function verifyServerConfig() {
  let validatedConfig;
  try {
    console.log("Verifying homeserver configuration");

    // Note: the query string may include is_url and hs_url - we only respect these in the
    // context of email validation. Because we don't respect them otherwise, we do not need
    // to parse or consider them here.

    // Note: Although we throw all 3 possible configuration options through a .well-known-style
    // verification, we do not care if the servers are online at this point. We do moderately
    // care if they are syntactically correct though, so we shove them through the .well-known
    // validators for that purpose.

    const config = matrix_react_sdk_src_SdkConfig__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.get();
    let wkConfig = config["default_server_config"]; // overwritten later under some conditions
    const serverName = config["default_server_name"];
    const hsUrl = config["default_hs_url"];
    const isUrl = config["default_is_url"];
    const incompatibleOptions = [wkConfig, serverName, hsUrl].filter(i => !!i);
    if (incompatibleOptions.length > 1) {
      // noinspection ExceptionCaughtLocallyJS
      throw (0,matrix_react_sdk_src_languageHandler__WEBPACK_IMPORTED_MODULE_3__/* .newTranslatableError */ .ys)((0,matrix_react_sdk_src_languageHandler__WEBPACK_IMPORTED_MODULE_3__/* ._td */ .I8)("Invalid configuration: can only specify one of default_server_config, default_server_name, " + "or default_hs_url."));
    }
    if (incompatibleOptions.length < 1) {
      // noinspection ExceptionCaughtLocallyJS
      throw (0,matrix_react_sdk_src_languageHandler__WEBPACK_IMPORTED_MODULE_3__/* .newTranslatableError */ .ys)((0,matrix_react_sdk_src_languageHandler__WEBPACK_IMPORTED_MODULE_3__/* ._td */ .I8)("Invalid configuration: no default server specified."));
    }
    if (hsUrl) {
      console.log("Config uses a default_hs_url - constructing a default_server_config using this information");
      console.warn("DEPRECATED CONFIG OPTION: In the future, default_hs_url will not be accepted. Please use " + "default_server_config instead.");
      wkConfig = {
        "m.homeserver": {
          base_url: hsUrl
        }
      };
      if (isUrl) {
        wkConfig["m.identity_server"] = {
          base_url: isUrl
        };
      }
    }
    let discoveryResult = null;
    if (wkConfig) {
      console.log("Config uses a default_server_config - validating object");
      discoveryResult = await matrix_js_sdk_src_autodiscovery__WEBPACK_IMPORTED_MODULE_5__/* .AutoDiscovery */ .m.fromDiscoveryConfig(wkConfig);
    }
    if (serverName) {
      console.log("Config uses a default_server_name - doing .well-known lookup");
      console.warn("DEPRECATED CONFIG OPTION: In the future, default_server_name will not be accepted. Please " + "use default_server_config instead.");
      discoveryResult = await matrix_js_sdk_src_autodiscovery__WEBPACK_IMPORTED_MODULE_5__/* .AutoDiscovery */ .m.findClientConfig(serverName);
    }
    validatedConfig = matrix_react_sdk_src_utils_AutoDiscoveryUtils__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z.buildValidatedConfigFromDiscovery(serverName, discoveryResult, true);
  } catch (e) {
    const {
      hsUrl,
      isUrl,
      userId
    } = await matrix_react_sdk_src_Lifecycle__WEBPACK_IMPORTED_MODULE_6__/* .getStoredSessionVars */ .dI();
    if (hsUrl && userId) {
      console.error(e);
      console.warn("A session was found - suppressing config error and using the session's homeserver");
      console.log("Using pre-existing hsUrl and isUrl: ", {
        hsUrl,
        isUrl
      });
      validatedConfig = await matrix_react_sdk_src_utils_AutoDiscoveryUtils__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z.validateServerConfigWithStaticUrls(hsUrl, isUrl, true);
    } else {
      // the user is not logged in, so scream
      throw e;
    }
  }
  validatedConfig.isDefault = true;

  // Just in case we ever have to debug this
  console.log("Using homeserver config:", validatedConfig);

  // Add the newly built config to the actual config for use by the app
  console.log("Updating SdkConfig with validated discovery information");
  matrix_react_sdk_src_SdkConfig__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.add({
    validated_server_config: validatedConfig
  });
  try {
    const {
      feds
    } = await getNetworkNodes();
    matrix_react_sdk_src_SdkConfig__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.add({
      fedNodes: feds
    });
  } catch (error) {
    console.log('get fed list failed', error);
  }
  ;
  return matrix_react_sdk_src_SdkConfig__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.get();
}
async function getNetworkNodes() {
  // 接口文档地址： https://confluence.sding.me/pages/viewpage.action?spaceKey=~andrewli&title=fed-api
  const urlPrefix = /^https:\/\/chat\.sending\.me/.test(window.location.href) ? "https://p2p.sending.network" : "https://test-net.sending.network";
  const hsUrl = matrix_react_sdk_src_SdkConfig__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.get('validated_server_config.hsUrl');
  const res = await fetch(hsUrl + "/_api/client/get_fed_list");
  if (res.status === 200) {
    const nodes = await res.json();
    const feds = nodes.map(item => {
      var _item$name, _item$endpoint;
      const url = new URL(item.addrs[0]);
      return {
        name: (_item$name = item.name) !== null && _item$name !== void 0 ? _item$name : `${url.hostname.split(".")[0]} node`,
        endpoint: (_item$endpoint = item.endpoint) !== null && _item$endpoint !== void 0 ? _item$endpoint : url.origin,
        peer: item.peer
      };
    });
    return {
      feds
    };
  } else {
    return Promise.resolve({});
  }
}

/***/ })

}]);
//# sourceMappingURL=element-web-app.js.map