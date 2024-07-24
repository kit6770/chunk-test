(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[4410],{

/***/ 180649:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

(function (f) {
  var g;
  if (typeof window !== "undefined") {
    g = window;
  } else if (typeof __webpack_require__.g !== "undefined") {
    g = __webpack_require__.g;
  } else if (typeof self !== "undefined") {
    g = self;
  } else {
    g = this;
  }
  g.protocolCheck = f();
})(function () {
  var define, module, exports;
  return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = undefined;
          if (!u && a) return require(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = undefined;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  }({
    1: [function (require, module, exports) {
      function _registerEvent(target, eventType, cb) {
        if (target.addEventListener) {
          target.addEventListener(eventType, cb);
          return {
            remove: function () {
              target.removeEventListener(eventType, cb);
            }
          };
        } else {
          target.attachEvent(eventType, cb);
          return {
            remove: function () {
              target.detachEvent(eventType, cb);
            }
          };
        }
      }
      function _createHiddenIframe(target, uri) {
        var iframe = document.createElement("iframe");
        iframe.src = uri;
        iframe.id = "hiddenIframe";
        iframe.style.display = "none";
        target.appendChild(iframe);
        return iframe;
      }
      function openUriWithHiddenFrame(uri, failCb, successCb) {
        var timeout = setTimeout(function () {
          failCb();
          handler.remove();
        }, 1000);
        var iframe = document.querySelector("#hiddenIframe");
        if (!iframe) {
          iframe = _createHiddenIframe(document.body, "about:blank");
        }
        var handler = _registerEvent(window, "blur", onBlur);
        function onBlur() {
          clearTimeout(timeout);
          handler.remove();
          successCb();
        }
        iframe.contentWindow.location.href = uri;
      }
      function openUriWithTimeoutHack(uri, failCb, successCb) {
        var timeout = setTimeout(function () {
          failCb();
          handler.remove();
        }, 1000);

        //handle page running in an iframe (blur must be registered with top level window)
        var target = window;
        while (target != target.parent) {
          target = target.parent;
        }
        var handler = _registerEvent(target, "blur", onBlur);
        function onBlur() {
          clearTimeout(timeout);
          handler.remove();
          successCb();
        }
        window.location = uri;
      }
      function openUriUsingFirefox(uri, failCb, successCb) {
        var iframe = document.querySelector("#hiddenIframe");
        if (!iframe) {
          iframe = _createHiddenIframe(document.body, "about:blank");
        }
        try {
          iframe.contentWindow.location.href = uri;
          successCb();
        } catch (e) {
          if (e.name == "NS_ERROR_UNKNOWN_PROTOCOL") {
            alert("Un Kown!");
            failCb();
          }
        }
      }
      function openUriWithIE11UsingRegistry(uri, failCb, successCb) {
        var shell = new ActiveXObject("WScript.shell");
        try {
          var reg = shell.RegRead("HKEY_CLASSES_ROOT\\glcloud\\URL Protocol");
          if (reg) {
            console.log(reg);
            window.location.href = uri;
          }
          successCb();
        } catch (e) {
          failCb();
        }
      }
      function openUriUsingIEInOlderWindows(uri, failCb, successCb) {
        if (getInternetExplorerVersion() === 10) {
          openUriUsingIE10InWindows7(uri, failCb, successCb);
        } else if (getInternetExplorerVersion() === 9 || getInternetExplorerVersion() === 11) {
          /*openUriWithHiddenFrame(uri, failCb, successCb);*/
          openUriWithIE11UsingRegistry(uri, failCb, successCb);
        } else {
          openUriInNewWindowHack(uri, failCb, successCb);
        }
      }
      function openUriUsingIE10InWindows7(uri, failCb, successCb) {
        var timeout = setTimeout(failCb, 6000);
        window.addEventListener("blur", function () {
          clearTimeout(timeout);
          successCb();
        });
        var iframe = document.querySelector("#hiddenIframe");
        if (!iframe) {
          iframe = _createHiddenIframe(document.body, "about:blank");
        }
        try {
          iframe.contentWindow.location.href = uri;
        } catch (e) {
          failCb();
          clearTimeout(timeout);
        }
      }
      function openUriInNewWindowHack(uri, failCb, successCb) {
        var myWindow = window.open('', '', 'width=0,height=0');
        myWindow.document.write("<iframe src='" + uri + "'></iframe>");
        setTimeout(function () {
          try {
            myWindow.location.href;
            myWindow.setTimeout("window.close()", 1000);
            successCb();
          } catch (e) {
            myWindow.close();
            failCb();
          }
        }, 1000);
      }
      function openUriWithMsLaunchUri(uri, failCb, successCb) {
        navigator.msLaunchUri(uri, successCb, failCb);
      }
      function checkBrowser() {
        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        return {
          isOpera: isOpera,
          isFirefox: typeof InstallTrigger !== 'undefined',
          isSafari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
          isChrome: !!window.chrome && !isOpera,
          isIE: /*@cc_on!@*/ false || !!document.documentMode // At least IE6
        };
      }

      function getInternetExplorerVersion() {
        var rv = -1;
        if (navigator.appName === "Microsoft Internet Explorer") {
          var ua = navigator.userAgent;
          var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
          if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
        } else if (navigator.appName === "Netscape") {
          var ua = navigator.userAgent;
          var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
          if (re.exec(ua) != null) {
            rv = parseFloat(RegExp.$1);
          }
        }
        return rv;
      }
      module.exports = function (uri, failCb, successCb) {
        function failCallback() {
          failCb && failCb();
        }
        function successCallback() {
          successCb && successCb();
        }
        if (navigator.msLaunchUri) {
          //for IE and Edge in Win 8 and Win 10
          openUriWithMsLaunchUri(uri, failCb, successCb);
        } else {
          var browser = checkBrowser();
          if (browser.isFirefox) {
            openUriUsingFirefox(uri, failCallback, successCallback);
          } else if (browser.isChrome) {
            openUriWithTimeoutHack(uri, failCallback, successCallback);
          } else if (browser.isIE) {
            openUriUsingIEInOlderWindows(uri, failCallback, successCallback);
          } else {
            //not supported, implement please
          }
        }
      };
    }, {}]
  }, {}, [1])(1);
});

/***/ }),

/***/ 645721:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  _t: () => (/* binding */ _t),
  checkUseLocalAppServer: () => (/* binding */ checkUseLocalAppServer),
  loadApp: () => (/* binding */ loadApp),
  loadConfig: () => (/* binding */ loadConfig),
  loadLanguage: () => (/* binding */ loadLanguage),
  loadOlm: () => (/* binding */ loadOlm),
  loadSdmFlag: () => (/* binding */ loadSdmFlag),
  loadSkin: () => (/* binding */ loadSkin),
  loadTheme: () => (/* binding */ loadTheme),
  preparePlatform: () => (/* binding */ preparePlatform),
  rageshakePromise: () => (/* binding */ rageshakePromise),
  setupLogStorage: () => (/* binding */ setupLogStorage),
  showError: () => (/* binding */ showError),
  showIncompatibleBrowser: () => (/* binding */ showIncompatibleBrowser)
});

// UNUSED EXPORTS: checkSDMSiteClear

// EXTERNAL MODULE: ./node_modules/@matrix-org/olm/olm.wasm
var olm = __webpack_require__(80701);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(973935);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/settings/SettingsStore.ts + 9 modules
var SettingsStore = __webpack_require__(571879);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(204942);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/BasePlatform.ts
var BasePlatform = __webpack_require__(434415);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/indexing/BaseEventIndexManager.ts
var BaseEventIndexManager = __webpack_require__(205928);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/dispatcher.ts
var dispatcher = __webpack_require__(245539);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/SdkConfig.ts
var SdkConfig = __webpack_require__(374312);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/rageshake/rageshake.js
var rageshake = __webpack_require__(8850);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Modal.tsx + 1 modules
var Modal = __webpack_require__(241648);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/InfoDialog.tsx
var InfoDialog = __webpack_require__(786035);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Spinner.tsx
var Spinner = __webpack_require__(641542);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/accessibility/KeyboardShortcuts.tsx
var KeyboardShortcuts = __webpack_require__(770672);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Keyboard.ts
var Keyboard = __webpack_require__(389310);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/randomstring.ts
var randomstring = __webpack_require__(456645);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/actions.ts
var actions = __webpack_require__(473627);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/toasts/UpdateToast.tsx + 1 modules
var UpdateToast = __webpack_require__(881108);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/ToastStore.ts
var ToastStore = __webpack_require__(732638);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/toasts/GenericExpiringToast.tsx
var GenericExpiringToast = __webpack_require__(976807);
// EXTERNAL MODULE: ./src/vector/getconfig.ts
var getconfig = __webpack_require__(522147);
;// CONCATENATED MODULE: ./src/favicon.ts

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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

const defaults = {
  bgColor: "#d00",
  textColor: "#fff",
  fontFamily: "sans-serif",
  // Arial,Verdana,Times New Roman,serif,sans-serif,...
  fontWeight: "bold",
  // normal,italic,oblique,bold,bolder,lighter,100,200,300,400,500,600,700,800,900

  isUp: false,
  isLeft: false
};

// Allows dynamic rendering of a circular badge atop the loaded favicon
// supports colour, font and basic positioning parameters.
// Based upon https://github.com/ejci/favico.js/blob/master/favico.js [MIT license]
class Favicon {
  constructor(params = {}) {
    (0,defineProperty/* default */.Z)(this, "browser", {
      ff: typeof window.InstallTrigger !== "undefined",
      opera: !!window.opera || navigator.userAgent.includes("Opera")
    });
    (0,defineProperty/* default */.Z)(this, "params", void 0);
    (0,defineProperty/* default */.Z)(this, "canvas", void 0);
    (0,defineProperty/* default */.Z)(this, "baseImage", void 0);
    (0,defineProperty/* default */.Z)(this, "context", void 0);
    (0,defineProperty/* default */.Z)(this, "icons", void 0);
    (0,defineProperty/* default */.Z)(this, "isReady", false);
    // callback to run once isReady is asserted, allows for a badge to be queued for when it can be shown
    (0,defineProperty/* default */.Z)(this, "readyCb", () => {});
    this.params = _objectSpread(_objectSpread({}, defaults), params);
    this.icons = Favicon.getIcons();
    // create work canvas
    this.canvas = document.createElement("canvas");
    // create clone of favicon as a base
    this.baseImage = document.createElement("img");
    const lastIcon = this.icons[this.icons.length - 1];
    if (lastIcon.hasAttribute("href")) {
      this.baseImage.setAttribute("crossOrigin", "anonymous");
      this.baseImage.onload = () => {
        // get height and width of the favicon
        this.canvas.height = this.baseImage.height > 0 ? this.baseImage.height : 32;
        this.canvas.width = this.baseImage.width > 0 ? this.baseImage.width : 32;
        this.context = this.canvas.getContext("2d");
        this.ready();
      };
      this.baseImage.setAttribute("src", lastIcon.getAttribute("href"));
    } else {
      this.canvas.height = this.baseImage.height = 32;
      this.canvas.width = this.baseImage.width = 32;
      this.context = this.canvas.getContext("2d");
      this.ready();
    }
  }
  reset() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.baseImage, 0, 0, this.canvas.width, this.canvas.height);
  }
  options(n, params) {
    const opt = {
      n: typeof n === "number" ? Math.abs(n) : n,
      len: ("" + n).length,
      // badge positioning constants as percentages
      x: 0.4,
      y: 0.4,
      w: 0.6,
      h: 0.6
    };

    // apply positional transformations
    if (params.isUp) {
      if (opt.y < 0.6) {
        opt.y = opt.y - 0.4;
      } else {
        opt.y = opt.y - 2 * opt.y + (1 - opt.w);
      }
    }
    if (params.isLeft) {
      if (opt.x < 0.6) {
        opt.x = opt.x - 0.4;
      } else {
        opt.x = opt.x - 2 * opt.x + (1 - opt.h);
      }
    }

    // scale the position to the canvas
    opt.x = this.canvas.width * opt.x;
    opt.y = this.canvas.height * opt.y;
    opt.w = this.canvas.width * opt.w;
    opt.h = this.canvas.height * opt.h;
    return opt;
  }
  circle(n, opts) {
    const params = _objectSpread(_objectSpread({}, this.params), opts);
    const opt = this.options(n, params);
    let more = false;
    if (opt.len === 2) {
      opt.x = opt.x - opt.w * 0.4;
      opt.w = opt.w * 1.4;
      more = true;
    } else if (opt.len >= 3) {
      opt.x = opt.x - opt.w * 0.65;
      opt.w = opt.w * 1.65;
      more = true;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.baseImage, 0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    const fontSize = Math.floor(opt.h * (opt.n > 99 ? 0.85 : 1)) + "px";
    this.context.font = `${params.fontWeight} ${fontSize} ${params.fontFamily}`;
    this.context.textAlign = "center";
    if (more) {
      this.context.moveTo(opt.x + opt.w / 2, opt.y);
      this.context.lineTo(opt.x + opt.w - opt.h / 2, opt.y);
      this.context.quadraticCurveTo(opt.x + opt.w, opt.y, opt.x + opt.w, opt.y + opt.h / 2);
      this.context.lineTo(opt.x + opt.w, opt.y + opt.h - opt.h / 2);
      this.context.quadraticCurveTo(opt.x + opt.w, opt.y + opt.h, opt.x + opt.w - opt.h / 2, opt.y + opt.h);
      this.context.lineTo(opt.x + opt.h / 2, opt.y + opt.h);
      this.context.quadraticCurveTo(opt.x, opt.y + opt.h, opt.x, opt.y + opt.h - opt.h / 2);
      this.context.lineTo(opt.x, opt.y + opt.h / 2);
      this.context.quadraticCurveTo(opt.x, opt.y, opt.x + opt.h / 2, opt.y);
    } else {
      this.context.arc(opt.x + opt.w / 2, opt.y + opt.h / 2, opt.h / 2, 0, 2 * Math.PI);
    }
    this.context.fillStyle = params.bgColor;
    this.context.fill();
    this.context.closePath();
    this.context.beginPath();
    this.context.stroke();
    this.context.fillStyle = params.textColor;
    if (typeof opt.n === "number" && opt.n > 999) {
      const count = (opt.n > 9999 ? 9 : Math.floor(opt.n / 1000)) + "k+";
      this.context.fillText(count, Math.floor(opt.x + opt.w / 2), Math.floor(opt.y + opt.h - opt.h * 0.2));
    } else {
      this.context.fillText("" + opt.n, Math.floor(opt.x + opt.w / 2), Math.floor(opt.y + opt.h - opt.h * 0.15));
    }
    this.context.closePath();
  }
  ready() {
    if (this.isReady) return;
    this.isReady = true;
    this.readyCb();
  }
  setIcon(canvas) {
    setImmediate(() => {
      this.setIconSrc(canvas.toDataURL("image/png"));
    });
  }
  setIconSrc(url) {
    // if is attached to fav icon
    if (this.browser.ff || this.browser.opera) {
      // for FF we need to "recreate" element, attach to dom and remove old <link>
      const old = this.icons[this.icons.length - 1];
      const newIcon = window.document.createElement("link");
      this.icons = [newIcon];
      newIcon.setAttribute("rel", "icon");
      newIcon.setAttribute("type", "image/png");
      window.document.getElementsByTagName("head")[0].appendChild(newIcon);
      newIcon.setAttribute("href", url);
      if (old.parentNode) {
        old.parentNode.removeChild(old);
      }
    } else {
      this.icons.forEach(icon => {
        icon.setAttribute("href", url);
      });
    }
  }
  badge(content, opts) {
    if (!this.isReady) {
      this.readyCb = () => {
        this.badge(content, opts);
      };
      return;
    }
    if (typeof content === "string" || content > 0) {
      this.circle(content, opts);
    } else {
      this.reset();
    }
    this.setIcon(this.canvas);
  }
  static getLinks() {
    const icons = [];
    const links = window.document.getElementsByTagName("head")[0].getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
      if (/(^|\s)icon(\s|$)/i.test(links[i].getAttribute("rel"))) {
        icons.push(links[i]);
      }
    }
    return icons;
  }
  static getIcons() {
    // get favicon link elements
    let elms = Favicon.getLinks();
    if (elms.length === 0) {
      elms = [window.document.createElement("link")];
      elms[0].setAttribute("rel", "icon");
      window.document.getElementsByTagName("head")[0].appendChild(elms[0]);
    }
    elms.forEach(item => {
      item.setAttribute("type", "image/png");
    });
    return elms;
  }
}
;// CONCATENATED MODULE: ./src/vector/platform/VectorBasePlatform.ts

/*
Copyright 2016 Aviral Dasgupta
Copyright 2016 OpenMarket Ltd
Copyright 2018, 2020 New Vector Ltd
Copyright 2019 Michael Telatynski <7t3chguy@gmail.com>

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
 * Vector-specific extensions to the BasePlatform template
 */
class VectorBasePlatform extends BasePlatform/* default */.ZP {
  constructor(...args) {
    super(...args);
    (0,defineProperty/* default */.Z)(this, "_favicon", void 0);
  }
  async getConfig() {
    return (0,getconfig/* getVectorConfig */.v)();
  }
  getHumanReadableName() {
    return 'Vector Base Platform'; // no translation required: only used for analytics
  }

  /**
   * Delay creating the `Favicon` instance until first use (on the first notification) as
   * it uses canvas, which can trigger a permission prompt in Firefox's resist fingerprinting mode.
   * See https://github.com/vector-im/element-web/issues/9605.
   */
  get favicon() {
    if (this._favicon) {
      return this._favicon;
    }
    return this._favicon = new Favicon();
  }
  updateFavicon() {
    let bgColor = "#d00";
    let notif = this.notificationCount;
    if (this.errorDidOccur) {
      notif = notif || "×";
      bgColor = "#f00";
    }
    this.favicon.badge(notif, {
      bgColor
    });
  }
  setNotificationCount(count) {
    if (this.notificationCount === count) return;
    super.setNotificationCount(count);
    this.updateFavicon();
  }
  setErrorStatus(errorDidOccur) {
    if (this.errorDidOccur === errorDidOccur) return;
    super.setErrorStatus(errorDidOccur);
    this.updateFavicon();
  }

  /**
   * Begin update polling, if applicable
   */
  startUpdater() {}

  /**
   * Get a sensible default display name for the
   * device Vector is running on
   */
  getDefaultDeviceDisplayName() {
    return (0,languageHandler._t)("Unknown device");
  }
}
;// CONCATENATED MODULE: ./src/vector/platform/ElectronPlatform.tsx

function ElectronPlatform_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function ElectronPlatform_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ElectronPlatform_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ElectronPlatform_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
Copyright 2016 Aviral Dasgupta
Copyright 2016 OpenMarket Ltd
Copyright 2019 Michael Telatynski <7t3chguy@gmail.com>
Copyright 2018 - 2021 New Vector Ltd

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




















const electron = window.electron;
const isMac = navigator.platform.toUpperCase().includes('MAC');
function platformFriendlyName() {
  // used to use window.process but the same info is available here
  if (navigator.userAgent.includes('Macintosh')) {
    return 'macOS';
  } else if (navigator.userAgent.includes('FreeBSD')) {
    return 'FreeBSD';
  } else if (navigator.userAgent.includes('OpenBSD')) {
    return 'OpenBSD';
  } else if (navigator.userAgent.includes('SunOS')) {
    return 'SunOS';
  } else if (navigator.userAgent.includes('Windows')) {
    return 'Windows';
  } else if (navigator.userAgent.includes('Linux')) {
    return 'Linux';
  } else {
    return 'Unknown';
  }
}
function _onAction(payload) {
  // Whitelist payload actions, no point sending most across
  if (['call_state'].includes(payload.action)) {
    electron.send('app_onAction', payload);
  }
}
function getUpdateCheckStatus(status) {
  if (status === true) {
    return {
      status: BasePlatform/* UpdateCheckStatus */.Cr.Downloading
    };
  } else if (status === false) {
    return {
      status: BasePlatform/* UpdateCheckStatus */.Cr.NotAvailable
    };
  } else {
    return {
      status: BasePlatform/* UpdateCheckStatus */.Cr.Error,
      detail: status
    };
  }
}
class SeshatIndexManager extends BaseEventIndexManager/* default */.Z {
  constructor() {
    super();
    (0,defineProperty/* default */.Z)(this, "pendingIpcCalls", {});
    (0,defineProperty/* default */.Z)(this, "nextIpcCallId", 0);
    (0,defineProperty/* default */.Z)(this, "onIpcReply", (ev, payload) => {
      if (payload.id === undefined) {
        console.warn("Ignoring IPC reply with no ID");
        return;
      }
      if (this.pendingIpcCalls[payload.id] === undefined) {
        console.warn("Unknown IPC payload ID: " + payload.id);
        return;
      }
      const callbacks = this.pendingIpcCalls[payload.id];
      delete this.pendingIpcCalls[payload.id];
      if (payload.error) {
        callbacks.reject(payload.error);
      } else {
        callbacks.resolve(payload.reply);
      }
    });
    electron.on('seshatReply', this.onIpcReply);
  }
  async ipcCall(name, ...args) {
    // TODO this should be moved into the preload.js file.
    const ipcCallId = ++this.nextIpcCallId;
    return new Promise((resolve, reject) => {
      this.pendingIpcCalls[ipcCallId] = {
        resolve,
        reject
      };
      window.electron.send('seshat', {
        id: ipcCallId,
        name,
        args
      });
    });
  }
  async supportsEventIndexing() {
    return this.ipcCall('supportsEventIndexing');
  }
  async initEventIndex(userId, deviceId) {
    return this.ipcCall('initEventIndex', userId, deviceId);
  }
  async addEventToIndex(ev, profile) {
    return this.ipcCall('addEventToIndex', ev, profile);
  }
  async deleteEvent(eventId) {
    return this.ipcCall('deleteEvent', eventId);
  }
  async isEventIndexEmpty() {
    return this.ipcCall('isEventIndexEmpty');
  }
  async isRoomIndexed(roomId) {
    return this.ipcCall('isRoomIndexed', roomId);
  }
  async commitLiveEvents() {
    return this.ipcCall('commitLiveEvents');
  }
  async searchEventIndex(searchConfig) {
    return this.ipcCall('searchEventIndex', searchConfig);
  }
  async addHistoricEvents(events, checkpoint, oldCheckpoint) {
    return this.ipcCall('addHistoricEvents', events, checkpoint, oldCheckpoint);
  }
  async addCrawlerCheckpoint(checkpoint) {
    return this.ipcCall('addCrawlerCheckpoint', checkpoint);
  }
  async removeCrawlerCheckpoint(checkpoint) {
    return this.ipcCall('removeCrawlerCheckpoint', checkpoint);
  }
  async loadFileEvents(args) {
    return this.ipcCall('loadFileEvents', args);
  }
  async loadCheckpoints() {
    return this.ipcCall('loadCheckpoints');
  }
  async closeEventIndex() {
    return this.ipcCall('closeEventIndex');
  }
  async getStats() {
    return this.ipcCall('getStats');
  }
  async getUserVersion() {
    return this.ipcCall('getUserVersion');
  }
  async setUserVersion(version) {
    return this.ipcCall('setUserVersion', version);
  }
  async deleteEventIndex() {
    return this.ipcCall('deleteEventIndex');
  }
}
class ElectronPlatform extends VectorBasePlatform {
  constructor() {
    super();
    (0,defineProperty/* default */.Z)(this, "eventIndexManager", new SeshatIndexManager());
    (0,defineProperty/* default */.Z)(this, "pendingIpcCalls", {});
    (0,defineProperty/* default */.Z)(this, "nextIpcCallId", 0);
    // this is the opaque token we pass to the HS which when we get it in our callback we can resolve to a profile
    (0,defineProperty/* default */.Z)(this, "ssoID", (0,randomstring/* randomString */.O1)(32));
    (0,defineProperty/* default */.Z)(this, "onUpdateDownloaded", async (ev, {
      releaseNotes,
      releaseName
    }) => {
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.CheckUpdates,
        status: BasePlatform/* UpdateCheckStatus */.Cr.Ready
      });
      if (this.shouldShowUpdate(releaseName)) {
        (0,UpdateToast/* showToast */.C)(await this.getAppVersion(), releaseName, releaseNotes);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onIpcReply", (ev, payload) => {
      if (payload.id === undefined) {
        console.warn("Ignoring IPC reply with no ID");
        return;
      }
      if (this.pendingIpcCalls[payload.id] === undefined) {
        console.warn("Unknown IPC payload ID: " + payload.id);
        return;
      }
      const callbacks = this.pendingIpcCalls[payload.id];
      delete this.pendingIpcCalls[payload.id];
      if (payload.error) {
        callbacks.reject(payload.error);
      } else {
        callbacks.resolve(payload.reply);
      }
    });
    dispatcher/* default */.ZP.register(_onAction);
    /*
        IPC Call `check_updates` returns:
        true if there is an update available
        false if there is not
        or the error if one is encountered
     */
    electron.on('check_updates', (event, status) => {
      dispatcher/* default */.ZP.dispatch(ElectronPlatform_objectSpread({
        action: actions/* Action */.a.CheckUpdates
      }, getUpdateCheckStatus(status)));
    });

    // try to flush the rageshake logs to indexeddb before quit.
    electron.on('before-quit', function () {
      console.log('element-desktop closing');
      rageshake/* flush */.yl();
    });
    electron.on('ipcReply', this.onIpcReply);
    electron.on('update-downloaded', this.onUpdateDownloaded);
    electron.on('preferences', () => {
      dispatcher/* default */.ZP.fire(actions/* Action */.a.ViewUserSettings);
    });
    electron.on('userDownloadCompleted', (ev, {
      path,
      name
    }) => {
      const key = `DOWNLOAD_TOAST_${path}`;
      const onAccept = () => {
        electron.send('userDownloadOpen', {
          path
        });
        ToastStore/* default */.Z.sharedInstance().dismissToast(key);
      };
      ToastStore/* default */.Z.sharedInstance().addOrReplaceToast({
        key,
        title: (0,languageHandler._t)("Download Completed"),
        props: {
          description: name,
          acceptLabel: (0,languageHandler._t)("Open"),
          onAccept,
          dismissLabel: (0,languageHandler._t)("Dismiss"),
          numSeconds: 10
        },
        component: GenericExpiringToast/* default */.Z,
        priority: 99
      });
    });

    // register OS-specific shortcuts
    (0,KeyboardShortcuts/* registerShortcut */.B5)(KeyboardShortcuts/* Categories */.Rj.NAVIGATION, {
      keybinds: [{
        modifiers: [KeyboardShortcuts/* CMD_OR_CTRL */.dY],
        key: KeyboardShortcuts/* DIGITS */.jd
      }],
      description: (0,languageHandler/* _td */.I8)("Switch to space by number")
    });
    if (isMac) {
      (0,KeyboardShortcuts/* registerShortcut */.B5)(KeyboardShortcuts/* Categories */.Rj.NAVIGATION, {
        keybinds: [{
          modifiers: [KeyboardShortcuts/* Modifiers */.qn.COMMAND],
          key: Keyboard/* Key */.sr.COMMA
        }],
        description: (0,languageHandler/* _td */.I8)("Open user settings")
      });
      (0,KeyboardShortcuts/* registerShortcut */.B5)(KeyboardShortcuts/* Categories */.Rj.NAVIGATION, {
        keybinds: [{
          modifiers: [KeyboardShortcuts/* Modifiers */.qn.COMMAND],
          key: Keyboard/* Key */.sr.SQUARE_BRACKET_LEFT
        }, {
          modifiers: [KeyboardShortcuts/* Modifiers */.qn.COMMAND],
          key: Keyboard/* Key */.sr.SQUARE_BRACKET_RIGHT
        }],
        description: (0,languageHandler/* _td */.I8)("Previous/next recently visited room or community")
      });
    } else {
      (0,KeyboardShortcuts/* registerShortcut */.B5)(KeyboardShortcuts/* Categories */.Rj.NAVIGATION, {
        keybinds: [{
          modifiers: [KeyboardShortcuts/* Modifiers */.qn.ALT],
          key: Keyboard/* Key */.sr.ARROW_LEFT
        }, {
          modifiers: [KeyboardShortcuts/* Modifiers */.qn.ALT],
          key: Keyboard/* Key */.sr.ARROW_RIGHT
        }],
        description: (0,languageHandler/* _td */.I8)("Previous/next recently visited room or community")
      });
    }
    this.ipcCall("startSSOFlow", this.ssoID);
  }
  async getConfig() {
    return this.ipcCall('getConfig');
  }
  getHumanReadableName() {
    return 'Electron Platform'; // no translation required: only used for analytics
  }

  /**
   * Return true if platform supports multi-language
   * spell-checking, otherwise false.
   */
  supportsMultiLanguageSpellCheck() {
    // Electron uses OS spell checking on macOS, so no need for in-app options
    if (isMac) return false;
    return true;
  }
  setNotificationCount(count) {
    if (this.notificationCount === count) return;
    super.setNotificationCount(count);
    electron.send('setBadgeCount', count);
  }
  supportsNotifications() {
    return true;
  }
  maySendNotifications() {
    return true;
  }
  displayNotification(title, msg, avatarUrl, room) {
    // GNOME notification spec parses HTML tags for styling...
    // Electron Docs state all supported linux notification systems follow this markup spec
    // https://github.com/electron/electron/blob/master/docs/tutorial/desktop-environment-integration.md#linux
    // maybe we should pass basic styling (italics, bold, underline) through from MD
    // we only have to strip out < and > as the spec doesn't include anything about things like &amp;
    // so we shouldn't assume that all implementations will treat those properly. Very basic tag parsing is done.
    if (navigator.userAgent.includes('Linux')) {
      msg = msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Notifications in Electron use the HTML5 notification API
    const notifBody = {
      body: msg,
      silent: true // we play our own sounds
    };

    if (avatarUrl) notifBody['icon'] = avatarUrl;
    const notification = new window.Notification(title, notifBody);
    notification.onclick = () => {
      dispatcher/* default */.ZP.dispatch({
        action: 'view_room',
        room_id: room.roomId
      });
      window.focus();
      this.ipcCall('focusWindow');
    };
    return notification;
  }
  loudNotification(ev, room) {
    electron.send('loudNotification');
  }
  async getAppVersion() {
    return this.ipcCall('getAppVersion');
  }
  supportsAutoLaunch() {
    return true;
  }
  async getAutoLaunchEnabled() {
    return this.ipcCall('getAutoLaunchEnabled');
  }
  async setAutoLaunchEnabled(enabled) {
    return this.ipcCall('setAutoLaunchEnabled', enabled);
  }
  supportsWarnBeforeExit() {
    return true;
  }
  async shouldWarnBeforeExit() {
    return this.ipcCall('shouldWarnBeforeExit');
  }
  async setWarnBeforeExit(enabled) {
    return this.ipcCall('setWarnBeforeExit', enabled);
  }
  supportsAutoHideMenuBar() {
    // This is irelevant on Mac as Menu bars don't live in the app window
    return !isMac;
  }
  async getAutoHideMenuBarEnabled() {
    return this.ipcCall('getAutoHideMenuBarEnabled');
  }
  async setAutoHideMenuBarEnabled(enabled) {
    return this.ipcCall('setAutoHideMenuBarEnabled', enabled);
  }
  supportsMinimizeToTray() {
    // Things other than Mac support tray icons
    return !isMac;
  }
  async getMinimizeToTrayEnabled() {
    return this.ipcCall('getMinimizeToTrayEnabled');
  }
  async setMinimizeToTrayEnabled(enabled) {
    return this.ipcCall('setMinimizeToTrayEnabled', enabled);
  }
  async canSelfUpdate() {
    const feedUrl = await this.ipcCall('getUpdateFeedUrl');
    return Boolean(feedUrl);
  }
  startUpdateCheck() {
    super.startUpdateCheck();
    electron.send('check_updates');
  }
  installUpdate() {
    // IPC to the main process to install the update, since quitAndInstall
    // doesn't fire the before-quit event so the main process needs to know
    // it should exit.
    electron.send('install_update');
  }
  getDefaultDeviceDisplayName() {
    const brand = SdkConfig/* default */.Z.get().brand;
    return (0,languageHandler._t)('%(brand)s Desktop (%(platformName)s)', {
      brand,
      platformName: platformFriendlyName()
    });
  }
  screenCaptureErrorString() {
    return null;
  }
  requestNotificationPermission() {
    return Promise.resolve('granted');
  }
  reload() {
    // we used to remote to the main process to get it to
    // reload the webcontents, but in practice this is unnecessary:
    // the normal way works fine.
    window.location.reload(false);
  }
  async ipcCall(name, ...args) {
    const ipcCallId = ++this.nextIpcCallId;
    return new Promise((resolve, reject) => {
      this.pendingIpcCalls[ipcCallId] = {
        resolve,
        reject
      };
      window.electron.send('ipcCall', {
        id: ipcCallId,
        name,
        args
      });
      // Maybe add a timeout to these? Probably not necessary.
    });
  }

  getEventIndexingManager() {
    return this.eventIndexManager;
  }
  async setLanguage(preferredLangs) {
    return this.ipcCall('setLanguage', preferredLangs);
  }
  setSpellCheckLanguages(preferredLangs) {
    this.ipcCall('setSpellCheckLanguages', preferredLangs).catch(error => {
      console.log("Failed to send setSpellCheckLanguages IPC to Electron");
      console.error(error);
    });
  }
  async getSpellCheckLanguages() {
    return this.ipcCall('getSpellCheckLanguages');
  }
  async getAvailableSpellCheckLanguages() {
    return this.ipcCall('getAvailableSpellCheckLanguages');
  }
  getSSOCallbackUrl(fragmentAfterLogin) {
    const url = super.getSSOCallbackUrl(fragmentAfterLogin);
    url.protocol = "element";
    url.searchParams.set("element-desktop-ssoid", this.ssoID);
    return url;
  }
  startSingleSignOn(mxClient, loginType, fragmentAfterLogin, idpId) {
    // this will get intercepted by electron-main will-navigate
    super.startSingleSignOn(mxClient, loginType, fragmentAfterLogin, idpId);
    Modal/* default */.Z.createTrackedDialog('Electron', 'SSO', InfoDialog/* default */.Z, {
      title: (0,languageHandler._t)("Go to your browser to complete Sign In"),
      description: /*#__PURE__*/react.createElement(Spinner/* default */.Z, null)
    });
  }
  navigateForwardBack(back) {
    this.ipcCall(back ? "navigateBack" : "navigateForward");
  }
  navigateToSpace(num) {
    dispatcher/* default */.ZP.dispatch({
      action: actions/* Action */.a.SwitchSpace,
      num
    });
  }
  onKeyDown(ev) {
    let handled = false;
    switch (ev.key) {
      case Keyboard/* Key */.sr.SQUARE_BRACKET_LEFT:
      case Keyboard/* Key */.sr.SQUARE_BRACKET_RIGHT:
        if (isMac && ev.metaKey && !ev.altKey && !ev.ctrlKey && !ev.shiftKey) {
          this.navigateForwardBack(ev.key === Keyboard/* Key */.sr.SQUARE_BRACKET_LEFT);
          handled = true;
        }
        break;
      case Keyboard/* Key */.sr.ARROW_LEFT:
      case Keyboard/* Key */.sr.ARROW_RIGHT:
        if (!isMac && ev.altKey && !ev.metaKey && !ev.ctrlKey && !ev.shiftKey) {
          this.navigateForwardBack(ev.key === Keyboard/* Key */.sr.ARROW_LEFT);
          handled = true;
        }
        break;
    }
    if (!handled &&
    // ideally we would use SpaceStore.spacesEnabled here but importing SpaceStore in this platform
    // breaks skinning as the platform is instantiated prior to the skin being loaded
    !SettingsStore/* default */.C.getValue("showCommunitiesInsteadOfSpaces") && ev.code.startsWith("Digit") && ev.code !== "Digit0" &&
    // this is the shortcut for reset zoom, don't override it
    (0,Keyboard/* isOnlyCtrlOrCmdKeyEvent */.Hy)(ev)) {
      const spaceNumber = ev.code.slice(5); // Cut off the first 5 characters - "Digit"
      this.navigateToSpace(parseInt(spaceNumber, 10));
      handled = true;
    }
    return handled;
  }
  async getPickleKey(userId, deviceId) {
    try {
      return await this.ipcCall('getPickleKey', userId, deviceId);
    } catch (e) {
      // if we can't connect to the password storage, assume there's no
      // pickle key
      return null;
    }
  }
  async createPickleKey(userId, deviceId) {
    try {
      return await this.ipcCall('createPickleKey', userId, deviceId);
    } catch (e) {
      // if we can't connect to the password storage, assume there's no
      // pickle key
      return null;
    }
  }
  async destroyPickleKey(userId, deviceId) {
    try {
      await this.ipcCall('destroyPickleKey', userId, deviceId);
    } catch (e) {}
  }
}
// EXTERNAL MODULE: ./node_modules/browser-request/index.js
var browser_request = __webpack_require__(724770);
var browser_request_default = /*#__PURE__*/__webpack_require__.n(browser_request);
// EXTERNAL MODULE: ./node_modules/ua-parser-js/src/ua-parser.js
var ua_parser = __webpack_require__(42238);
var ua_parser_default = /*#__PURE__*/__webpack_require__.n(ua_parser);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/units.ts
var units = __webpack_require__(612559);
;// CONCATENATED MODULE: ./src/vector/platform/WebPlatform.ts

function WebPlatform_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function WebPlatform_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? WebPlatform_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : WebPlatform_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
Copyright 2016 Aviral Dasgupta
Copyright 2016 OpenMarket Ltd
Copyright 2017-2020 New Vector Ltd

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










const POKE_RATE_MS = 10 * 60 * 1000; // 10 min
const SW_RATE_MS = 3 * 60 * 1000; // 3 min
const SW_LIVE_CHECK_RATE_MS = 10 * 1000; // 3 seconds
let SW_LIVE_COUNT = 0;
let SW_LIVE_INTERVAL = null;
let POKE_INTERVAL = null;
let SW_VERSION_INTERVAL = null;
class WebPlatform extends VectorBasePlatform {
  constructor() {
    super();
    // Register service worker if available on this platform
    // const appServerNode = localStorage.getItem('app_server_node') || null;
    // if ('serviceWorker' in navigator && !isMobile() && !appServerNode) {
    //     navigator.serviceWorker.register('sw.js')
    //         .then((registration) => {
    //             console.log('serviceWorker was registed', registration);
    //             SW_LIVE_COUNT = 0;
    //             this.bindSwToastEvent(registration);
    //             this.checkSwUpdate();

    //             // if (registration.active && registration.active.state && registration.active.state === 'activated') {
    //             //     this.swLiveCheck(registration)
    //             // } else {
    //             //     registration.addEventListener('updatefound', () => {
    //             //         const newWorker = registration.installing || registration.waiting;
    //             //         newWorker.addEventListener('statechange', () => {
    //             //             switch (newWorker.state) {
    //             //                 case 'activated': this.swLiveCheck(registration);
    //             //                 break;
    //             //             }
    //             //         });
    //             //     });
    //             // }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    // this.getPeerId();
    (0,defineProperty/* default */.Z)(this, "runningVersion", null);
    (0,defineProperty/* default */.Z)(this, "newSwVersion", null);
    (0,defineProperty/* default */.Z)(this, "swLiveCheck", reg => {
      async function fetchWithTimeout(resource, options = {}) {
        const {
          timeout = 5000
        } = options;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(resource, WebPlatform_objectSpread(WebPlatform_objectSpread({}, options), {}, {
          signal: controller.signal
        }));
        clearTimeout(id);
        return response;
      }
      const checkSwHealth = async () => {
        try {
          const res = await fetchWithTimeout('http://localhost/_api/client/monitor/health', {
            timeout: 2500
          });
          if (res && res.status === 200) {
            console.log('sw health 200', res);
            SW_LIVE_COUNT = 0;
          } else {
            console.log('sw health throw self');
            throw "sw health fail";
          }
        } catch (error) {
          if (!reg) {
            SW_LIVE_COUNT = 0;
            return;
          }
          if (SW_LIVE_COUNT >= 5) {
            reg.unregister().then(() => {
              console.log('sw health unregister');
              if (SW_LIVE_INTERVAL) {
                clearInterval(SW_LIVE_INTERVAL);
              }
              ;
              SW_LIVE_COUNT = 0;
              window.location.reload();
            }).catch(err => {
              console.log('swLiveCheck in err', err);
              SW_LIVE_COUNT = 0;
            });
          } else {
            console.log('sw health ++', error);
            SW_LIVE_COUNT++;
          }
        }
      };
      SW_LIVE_INTERVAL = setInterval(checkSwHealth, SW_LIVE_CHECK_RATE_MS);
    });
    (0,defineProperty/* default */.Z)(this, "bindSwToastEvent", reg => {
      const self = this;
      document.getElementById('sw-snackbar-close').addEventListener('click', function () {
        const snackbar = document.getElementById('sw-snackbar');
        snackbar.className = '';
      });
      document.getElementById('sw-snackbar-reload').addEventListener('click', function () {
        reg.unregister().then(() => {
          localStorage.setItem('sw_js_version', self.newSwVersion);
          window.location.reload();
        });
      });
    });
    (0,defineProperty/* default */.Z)(this, "checkSwUpdate", () => {
      const oldVer = localStorage.getItem('sw_js_version');
      this.getSwVersion().then(ver => {
        this.newSwVersion = ver;
        if (!oldVer) {
          localStorage.setItem('sw_js_version', ver);
        } else if (ver !== oldVer) {
          const snackbar = document.getElementById('sw-snackbar');
          snackbar.className = 'show';
        } else {
          const snackbar = document.getElementById('sw-snackbar');
          snackbar && (snackbar.className = '');
        }
      });
    });
    (0,defineProperty/* default */.Z)(this, "pollForUpdate", () => {
      return this.getVersion().then(ver => {
        if (this.runningVersion === null) {
          this.runningVersion = ver;
        } else if (this.runningVersion !== ver) {
          if (this.shouldShowUpdate(ver)) {
            (0,UpdateToast/* showToast */.C)(this.runningVersion, ver);
          }
          return {
            status: BasePlatform/* UpdateCheckStatus */.Cr.Ready
          };
        } else {
          (0,UpdateToast/* hideToast */.P)();
        }
        return {
          status: BasePlatform/* UpdateCheckStatus */.Cr.NotAvailable
        };
      }, err => {
        console.error("Failed to poll for update", err);
        return {
          status: BasePlatform/* UpdateCheckStatus */.Cr.Error,
          detail: err.message || err.status ? err.status.toString() : 'Unknown Error'
        };
      });
    });
    if ((0,units/* isMobile */.tq)() && document.getElementById('sw-snackbar')) {
      document.getElementById('sw-snackbar').style.display = 'none';
    }
  }

  // getPeerId() {
  //     window.addEventListener("message", function(e) {
  //         const { method, key, value } = e.data;
  //         if (method === "sendPeerId") {
  //             localStorage.setItem(key, value);
  //         }
  //     });
  // }

  componentWillUnmount() {
    if (SW_LIVE_INTERVAL) {
      clearInterval(SW_LIVE_INTERVAL);
    }
    if (POKE_INTERVAL) {
      clearInterval(POKE_INTERVAL);
    }
    if (SW_VERSION_INTERVAL) {
      clearInterval(SW_VERSION_INTERVAL);
    }
  }
  getHumanReadableName() {
    return 'Web Platform'; // no translation required: only used for analytics
  }

  /**
   * Returns true if the platform supports displaying
   * notifications, otherwise false.
   */
  supportsNotifications() {
    return Boolean(window.Notification);
  }

  /**
   * Returns true if the application currently has permission
   * to display notifications. Otherwise false.
   */
  maySendNotifications() {
    return window.Notification.permission === 'granted';
  }

  /**
   * Requests permission to send notifications. Returns
   * a promise that is resolved when the user has responded
   * to the request. The promise has a single string argument
   * that is 'granted' if the user allowed the request or
   * 'denied' otherwise.
   */
  requestNotificationPermission() {
    // annoyingly, the latest spec says this returns a
    // promise, but this is only supported in Chrome 46
    // and Firefox 47, so adapt the callback API.
    return new Promise(function (resolve, reject) {
      window.Notification.requestPermission(result => {
        resolve(result);
      });
    });
  }
  displayNotification(title, msg, avatarUrl, room) {
    const notifBody = {
      body: msg,
      tag: "vector",
      silent: true // we play our own sounds
    };

    if (avatarUrl) notifBody['icon'] = avatarUrl;
    const notification = new window.Notification(title, notifBody);
    notification.onclick = function () {
      dispatcher/* default */.ZP.dispatch({
        action: 'view_room',
        room_id: room.roomId
      });
      window.focus();
      notification.close();
    };
    return notification;
  }
  getVersion() {
    // We add a cachebuster to the request to make sure that we know about
    // the most recent version on the origin server. That might not
    // actually be the version we'd get on a reload (particularly in the
    // presence of intermediate caching proxies), but still: we're trying
    // to tell the user that there is a new version.

    return new Promise(function (resolve, reject) {
      browser_request_default()({
        method: "GET",
        url: "version",
        qs: {
          cachebuster: Date.now()
        }
      }, (err, response, body) => {
        if (err || response.status < 200 || response.status >= 300) {
          if (err === null) err = {
            status: response.status
          };
          reject(err);
          return;
        }
        const ver = body.trim();
        resolve(ver);
      });
    });
  }
  getSwVersion() {
    // get sw.js version and notify users to update
    return new Promise(function (resolve, reject) {
      browser_request_default()({
        method: "GET",
        url: "swVersion.js",
        qs: {
          cachebuster: Date.now()
        },
        cache: 'no-cache'
      }, (err, response, body) => {
        if (err || response.status < 200 || response.status >= 300) {
          if (err === null) err = {
            status: response.status
          };
          reject(err);
          return;
        }
        const ver = body.trim();
        resolve(ver);
      });
    });
  }
  getAppVersion() {
    if (this.runningVersion !== null) {
      return Promise.resolve(this.runningVersion);
    }
    return this.getVersion();
  }
  startUpdater() {
    this.pollForUpdate();
    POKE_INTERVAL = setInterval(this.pollForUpdate, POKE_RATE_MS);
    SW_VERSION_INTERVAL = setInterval(this.checkSwUpdate, SW_RATE_MS);
  }
  async canSelfUpdate() {
    return true;
  }
  startUpdateCheck() {
    super.startUpdateCheck();
    this.pollForUpdate().then(updateState => {
      dispatcher/* default */.ZP.dispatch(WebPlatform_objectSpread({
        action: actions/* Action */.a.CheckUpdates
      }, updateState));
    });
  }
  installUpdate() {
    window.location.reload();
  }
  getDefaultDeviceDisplayName() {
    // strip query-string and fragment from uri
    const url = new URL(window.location.href);

    // `appName` in the format `develop.element.io/abc/xyz`
    const appName = [url.host, url.pathname.replace(/\/$/, "") // Remove trailing slash if present
    ].join("");
    const ua = new (ua_parser_default())();
    const browserName = ua.getBrowser().name || "unknown browser";
    let osName = ua.getOS().name || "unknown OS";
    // Stylise the value from the parser to match Apple's current branding.
    if (osName === "Mac OS") osName = "macOS";
    return (0,languageHandler._t)('%(appName)s (%(browserName)s, %(osName)s)', {
      appName,
      browserName,
      osName
    });
  }
  screenCaptureErrorString() {
    // it won't work at all if you're not on HTTPS so whine whine whine
    if (window.location.protocol !== "https:") {
      return (0,languageHandler._t)("You need to be using HTTPS to place a screen-sharing call.");
    }
    return null;
  }
  reload() {
    // forceReload=false since we don't really need new HTML/JS files
    // we just need to restart the JS runtime.
    window.location.reload();
  }
}
;// CONCATENATED MODULE: ./src/vector/platform/PWAPlatform.ts
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


class PWAPlatform extends WebPlatform {
  setNotificationCount(count) {
    if (!navigator.setAppBadge) return super.setNotificationCount(count);
    if (this.notificationCount === count) return;
    this.notificationCount = count;
    navigator.setAppBadge(count).catch(e => {
      console.error("Failed to update PWA app badge", e);
    });
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/PlatformPeg.ts
var PlatformPeg = __webpack_require__(311187);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/theme.js
var theme = __webpack_require__(301710);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/rageshake/submit-rageshake.ts
var submit_rageshake = __webpack_require__(634898);
;// CONCATENATED MODULE: ./src/vector/rageshakesetup.ts
/*
Copyright 2018 New Vector Ltd
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

/*
 * Separate file that sets up rageshake logging when imported.
 * This is necessary so that rageshake logging is set up before
 * anything else. Webpack puts all import statements at the top
 * of the file before any code, so imports will always be
 * evaluated first. Other imports can cause other code to be
 * evaluated (eg. the loglevel library in js-sdk, which if set
 * up before rageshake causes some js-sdk logging to be missing
 * from the rageshake.)
 */




function initRageshake() {
  // we manually check persistence for rageshakes ourselves
  const prom = rageshake/* init */.S1( /*setUpPersistence=*/false);
  prom.then(() => {
    console.log("Initialised rageshake.");
    console.log("To fix line numbers in Chrome: " + "Meatball menu → Settings → Ignore list → Add /rageshake\\.js$");
    window.addEventListener('beforeunload', e => {
      console.log('element-web closing');
      // try to flush the logs to indexeddb
      rageshake/* flush */.yl();
    });
    rageshake/* cleanup */.Eq();
  }, err => {
    console.error("Failed to initialise rageshake: " + err);
  });
  return prom;
}
function initRageshakeStore() {
  return rageshake/* tryInitStorage */.b4();
}
window.mxSendRageshake = function (text, withLogs) {
  const url = SdkConfig/* default */.Z.get().bug_report_endpoint_url;
  if (!url) {
    console.error("Cannot send a rageshake - no bug_report_endpoint_url configured");
    return;
  }
  if (withLogs === undefined) withLogs = true;
  if (!text || !text.trim()) {
    console.error("Cannot send a rageshake without a message - please tell us what went wrong");
    return;
  }
  (0,submit_rageshake/* default */.ZP)(url, {
    userText: text,
    sendLogs: withLogs,
    progressCallback: console.log.bind(console)
  }).then(() => {
    console.log("Bug report sent!");
  }, err => {
    console.error(err);
  });
};
// EXTERNAL MODULE: ./src/vector/acceleratorcheck.js
var acceleratorcheck = __webpack_require__(180649);
;// CONCATENATED MODULE: ./src/vector/init.tsx
/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2017 Vector Creations Ltd
Copyright 2019 Michael Telatynski <7t3chguy@gmail.com>
Copyright 2018 - 2021 New Vector Ltd

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

// import Olm from "@matrix-org/olm";













const rageshakePromise = initRageshake();
function preparePlatform() {
  if (window.electron) {
    console.log("Using Electron platform");
    PlatformPeg/* default */.Z.set(new ElectronPlatform());
  } else if (window.matchMedia("(display-mode: standalone)").matches) {
    console.log("Using PWA platform");
    PlatformPeg/* default */.Z.set(new PWAPlatform());
  } else {
    console.log("Using Web platform");
    PlatformPeg/* default */.Z.set(new WebPlatform());
  }
}
function setupLogStorage() {
  if (SdkConfig/* default */.Z.get().bug_report_endpoint_url) {
    return initRageshakeStore();
  }
  console.warn("No bug report endpoint set - logs will not be persisted");
  return Promise.resolve();
}
async function loadConfig() {
  // XXX: We call this twice, once here and once in MatrixChat as a prop. We call it here to ensure
  // granular settings are loaded correctly and to avoid duplicating the override logic for the theme.
  //
  // Note: this isn't called twice for some wrappers, like the Jitsi wrapper.
  SdkConfig/* default */.Z.put((await PlatformPeg/* default */.Z.get().getConfig()) || {});
}
async function loadOlm() {
  /* Load Olm. We try the WebAssembly version first, and then the legacy,
   * asm.js version if that fails. For this reason we need to wait for this
   * to finish before continuing to load the rest of the app. In future
   * we could somehow pass a promise down to react-sdk and have it wait on
   * that so olm can be loading in parallel with the rest of the app.
   *
   * We also need to tell the Olm js to look for its wasm file at the same
   * level as index.html. It really should be in the same place as the js,
   * ie. in the bundle directory, but as far as I can tell this is
   * completely impossible with webpack. We do, however, use a hashed
   * filename to avoid caching issues.
   */
  const {
    init: OlmInit
  } = await __webpack_require__.e(/* import() */ 228).then(__webpack_require__.t.bind(__webpack_require__, 560228, 23));
  return OlmInit({
    locateFile: () => olm/* default */.Z
  }).then(() => {
    console.log("Using WebAssembly Olm");
  }).catch(e => {
    console.log("Failed to load Olm: trying legacy version", e);
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "olm_legacy.js"; // XXX: This should be cache-busted too
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    }).then(() => {
      // Init window.Olm, ie. the one just loaded by the script tag,
      // not 'Olm' which is still the failed wasm version.
      return window.Olm.init();
    }).then(() => {
      console.log("Using legacy Olm");
    }).catch(e => {
      console.log("Both WebAssembly and asm.js Olm failed!", e);
    });
  });
}
async function loadSdmFlag() {
  const isSdn = SdkConfig/* default */.Z.get("is_sdn");
  if (!isSdn) {
    localStorage.setItem("is_sdm", "1");
  }
}
async function loadLanguage() {
  const prefLang = SettingsStore/* default */.C.getValue("language", null, /*excludeDefault=*/true);
  let langs = [];
  if (!prefLang) {
    languageHandler/* getLanguagesFromBrowser */.ZO().forEach(l => {
      langs.push(...languageHandler/* getNormalizedLanguageKeys */.b2(l));
    });
  } else {
    langs = [prefLang];
  }
  try {
    await languageHandler/* setLanguage */.m0(langs);
    document.documentElement.setAttribute("lang", languageHandler/* getCurrentLanguage */.Wx());
  } catch (e) {
    console.error("Unable to set language", e);
  }
}
async function loadSkin() {
  // Ensure the skin is the very first thing to load for the react-sdk. We don't even want to reference
  // the SDK until we have to in imports.
  console.log("Loading skin...");
  // load these async so that its code is not executed immediately and we can catch any exceptions
  const [sdk, skin] = await Promise.all([Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 47185)), __webpack_require__.e(/* import() | element-web-component-index */ 5802).then(__webpack_require__.bind(__webpack_require__, 685671))]);
  sdk.loadSkin(skin);
  // document.querySelector('#percentText').innerHTML = '98%';
  console.log("Skin loaded!");
}
async function loadTheme() {
  // fixme: default theme is light;
  // When a user theme is stored on the computer, use the user theme
  // let defaultTheme = "light";
  // Record the themes used by the previous account on the current device
  // The system default theme is the theme used by the last user
  const lastThemeUsedDevice = localStorage.getItem("last_theme_used_device");
  if (lastThemeUsedDevice) {
    (0,theme/* setTheme */.Dc)(lastThemeUsedDevice);
  } else {
    (0,theme/* setTheme */.Dc)();
  }
}
async function checkSDMSiteClear() {
  const sdmFlag = localStorage.getItem('is_sdm');
  console.log('sdmFlag is: ', sdmFlag);
  if (sdmFlag) {
    clearSDMSiteData();
  }
}
async function checkUseLocalAppServer() {
  const getQueryValue = key => {
    var match = location.search.match(new RegExp(key + '=([^&]*)'));
    return match && match[1] || '';
  };
  const port = getQueryValue('useAppServer');
  if (port) {
    localStorage.setItem('app_server_node', `http://localhost:${port}`);
    return true;
  } else {
    localStorage.removeItem('app_server_node');
    return false;
  }
}
async function loadApp(fragParams) {
  // load app.js async so that its code is not executed immediately and we can catch any exceptions
  const module = await Promise.all(/* import() | element-web-app */[__webpack_require__.e(6111), __webpack_require__.e(8673)]).then(__webpack_require__.bind(__webpack_require__, 764608));
  window.matrixChat = react_dom.render(await module.loadApp(fragParams), document.getElementById("matrixchat"));
}
async function showError(title, messages) {
  const ErrorView = (await __webpack_require__.e(/* import() | error-view */ 4317).then(__webpack_require__.bind(__webpack_require__, 328429))).default;
  window.matrixChat = react_dom.render( /*#__PURE__*/react.createElement(ErrorView, {
    title: title,
    messages: messages
  }), document.getElementById("matrixchat"));
}
async function showIncompatibleBrowser(onAccept) {
  const CompatibilityView = (await __webpack_require__.e(/* import() | compatibility-view */ 2640).then(__webpack_require__.bind(__webpack_require__, 435433))).default;
  window.matrixChat = react_dom.render( /*#__PURE__*/react.createElement(CompatibilityView, {
    onAccept: onAccept
  }), document.getElementById("matrixchat"));
}
const _t = languageHandler._t;

/***/ }),

/***/ 406097:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "i18n/languages.80fae11.json");

/***/ }),

/***/ 255066:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": 857142,
	"./af.js": 857142,
	"./ar": 444386,
	"./ar-dz": 829037,
	"./ar-dz.js": 829037,
	"./ar-kw": 990124,
	"./ar-kw.js": 990124,
	"./ar-ly": 749275,
	"./ar-ly.js": 749275,
	"./ar-ma": 681054,
	"./ar-ma.js": 681054,
	"./ar-sa": 339912,
	"./ar-sa.js": 339912,
	"./ar-tn": 529402,
	"./ar-tn.js": 529402,
	"./ar.js": 444386,
	"./az": 10544,
	"./az.js": 10544,
	"./be": 729642,
	"./be.js": 729642,
	"./bg": 558857,
	"./bg.js": 558857,
	"./bm": 55935,
	"./bm.js": 55935,
	"./bn": 72039,
	"./bn-bd": 698425,
	"./bn-bd.js": 698425,
	"./bn.js": 72039,
	"./bo": 141594,
	"./bo.js": 141594,
	"./br": 43384,
	"./br.js": 43384,
	"./bs": 313502,
	"./bs.js": 313502,
	"./ca": 366277,
	"./ca.js": 366277,
	"./cs": 706121,
	"./cs.js": 706121,
	"./cv": 240964,
	"./cv.js": 240964,
	"./cy": 318079,
	"./cy.js": 318079,
	"./da": 57303,
	"./da.js": 57303,
	"./de": 922384,
	"./de-at": 392754,
	"./de-at.js": 392754,
	"./de-ch": 681437,
	"./de-ch.js": 681437,
	"./de.js": 922384,
	"./dv": 625063,
	"./dv.js": 625063,
	"./el": 402134,
	"./el.js": 402134,
	"./en-au": 976629,
	"./en-au.js": 976629,
	"./en-ca": 604024,
	"./en-ca.js": 604024,
	"./en-gb": 886407,
	"./en-gb.js": 886407,
	"./en-ie": 382721,
	"./en-ie.js": 382721,
	"./en-il": 495848,
	"./en-il.js": 495848,
	"./en-in": 134775,
	"./en-in.js": 134775,
	"./en-nz": 763942,
	"./en-nz.js": 763942,
	"./en-sg": 244222,
	"./en-sg.js": 244222,
	"./eo": 260343,
	"./eo.js": 260343,
	"./es": 799781,
	"./es-do": 570047,
	"./es-do.js": 570047,
	"./es-mx": 834253,
	"./es-mx.js": 834253,
	"./es-us": 291342,
	"./es-us.js": 291342,
	"./es.js": 799781,
	"./et": 962723,
	"./et.js": 962723,
	"./eu": 869464,
	"./eu.js": 869464,
	"./fa": 728167,
	"./fa.js": 728167,
	"./fi": 481201,
	"./fi.js": 481201,
	"./fil": 447418,
	"./fil.js": 447418,
	"./fo": 424219,
	"./fo.js": 424219,
	"./fr": 423510,
	"./fr-ca": 856335,
	"./fr-ca.js": 856335,
	"./fr-ch": 104071,
	"./fr-ch.js": 104071,
	"./fr.js": 423510,
	"./fy": 167915,
	"./fy.js": 167915,
	"./ga": 628101,
	"./ga.js": 628101,
	"./gd": 854775,
	"./gd.js": 854775,
	"./gl": 193012,
	"./gl.js": 193012,
	"./gom-deva": 349780,
	"./gom-deva.js": 349780,
	"./gom-latn": 718783,
	"./gom-latn.js": 718783,
	"./gu": 809402,
	"./gu.js": 809402,
	"./he": 593121,
	"./he.js": 593121,
	"./hi": 77446,
	"./hi.js": 77446,
	"./hr": 350293,
	"./hr.js": 350293,
	"./hu": 420377,
	"./hu.js": 420377,
	"./hy-am": 201822,
	"./hy-am.js": 201822,
	"./id": 492328,
	"./id.js": 492328,
	"./is": 495361,
	"./is.js": 495361,
	"./it": 592817,
	"./it-ch": 182469,
	"./it-ch.js": 182469,
	"./it.js": 592817,
	"./ja": 960512,
	"./ja.js": 960512,
	"./jv": 921237,
	"./jv.js": 921237,
	"./ka": 423659,
	"./ka.js": 423659,
	"./kk": 517496,
	"./kk.js": 517496,
	"./km": 365583,
	"./km.js": 365583,
	"./kn": 228614,
	"./kn.js": 228614,
	"./ko": 255917,
	"./ko.js": 255917,
	"./ku": 111685,
	"./ku.js": 111685,
	"./ky": 714689,
	"./ky.js": 714689,
	"./lb": 789959,
	"./lb.js": 789959,
	"./lo": 307809,
	"./lo.js": 307809,
	"./lt": 207006,
	"./lt.js": 207006,
	"./lv": 375238,
	"./lv.js": 375238,
	"./me": 201065,
	"./me.js": 201065,
	"./mi": 917643,
	"./mi.js": 917643,
	"./mk": 775536,
	"./mk.js": 775536,
	"./ml": 719993,
	"./ml.js": 719993,
	"./mn": 427797,
	"./mn.js": 427797,
	"./mr": 57039,
	"./mr.js": 57039,
	"./ms": 85452,
	"./ms-my": 745748,
	"./ms-my.js": 745748,
	"./ms.js": 85452,
	"./mt": 41494,
	"./mt.js": 41494,
	"./my": 22055,
	"./my.js": 22055,
	"./nb": 111538,
	"./nb.js": 111538,
	"./ne": 450642,
	"./ne.js": 450642,
	"./nl": 54353,
	"./nl-be": 468607,
	"./nl-be.js": 468607,
	"./nl.js": 54353,
	"./nn": 542849,
	"./nn.js": 542849,
	"./oc-lnc": 139682,
	"./oc-lnc.js": 139682,
	"./pa-in": 940489,
	"./pa-in.js": 940489,
	"./pl": 484626,
	"./pl.js": 484626,
	"./pt": 268826,
	"./pt-br": 201004,
	"./pt-br.js": 201004,
	"./pt.js": 268826,
	"./ro": 48289,
	"./ro.js": 48289,
	"./ru": 679260,
	"./ru.js": 679260,
	"./sd": 66680,
	"./sd.js": 66680,
	"./se": 769364,
	"./se.js": 769364,
	"./si": 654511,
	"./si.js": 654511,
	"./sk": 855752,
	"./sk.js": 855752,
	"./sl": 643239,
	"./sl.js": 643239,
	"./sq": 264262,
	"./sq.js": 264262,
	"./sr": 831625,
	"./sr-cyrl": 349808,
	"./sr-cyrl.js": 349808,
	"./sr.js": 831625,
	"./ss": 720026,
	"./ss.js": 720026,
	"./sv": 233491,
	"./sv.js": 233491,
	"./sw": 747210,
	"./sw.js": 747210,
	"./ta": 61975,
	"./ta.js": 61975,
	"./te": 324519,
	"./te.js": 324519,
	"./tet": 140557,
	"./tet.js": 140557,
	"./tg": 404363,
	"./tg.js": 404363,
	"./th": 977113,
	"./th.js": 977113,
	"./tk": 645169,
	"./tk.js": 645169,
	"./tl-ph": 476285,
	"./tl-ph.js": 476285,
	"./tlh": 811560,
	"./tlh.js": 811560,
	"./tr": 770023,
	"./tr.js": 770023,
	"./tzl": 735556,
	"./tzl.js": 735556,
	"./tzm": 965154,
	"./tzm-latn": 415716,
	"./tzm-latn.js": 415716,
	"./tzm.js": 965154,
	"./ug-cn": 753573,
	"./ug-cn.js": 753573,
	"./uk": 204045,
	"./uk.js": 204045,
	"./ur": 713076,
	"./ur.js": 713076,
	"./uz": 955658,
	"./uz-latn": 23345,
	"./uz-latn.js": 23345,
	"./uz.js": 955658,
	"./vi": 771991,
	"./vi.js": 771991,
	"./x-pseudo": 896307,
	"./x-pseudo.js": 896307,
	"./yo": 719712,
	"./yo.js": 719712,
	"./zh-cn": 221544,
	"./zh-cn.js": 221544,
	"./zh-hk": 964309,
	"./zh-hk.js": 964309,
	"./zh-mo": 791019,
	"./zh-mo.js": 791019,
	"./zh-tw": 607351,
	"./zh-tw.js": 607351
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 255066;

/***/ }),

/***/ 88677:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 258522:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 735883:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 680950:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 446601:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 989214:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 308623:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 842480:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 507748:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 85568:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 889519:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 445443:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 356619:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 963818:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 824654:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 77108:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 752361:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 394616:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 275347:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 831777:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 634017:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 159905:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 464604:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 175042:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 865644:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 55024:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 611734:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 967647:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 255896:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 187500:
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=init.js.map