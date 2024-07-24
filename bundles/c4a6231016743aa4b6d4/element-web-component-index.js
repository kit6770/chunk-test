"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[5802],{

/***/ 685671:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  components: () => (/* binding */ components)
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(204942);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var esm_defineProperty = __webpack_require__(225259);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/browser-request/index.js
var browser_request = __webpack_require__(724770);
var browser_request_default = /*#__PURE__*/__webpack_require__.n(browser_request);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/sanitize-html/index.js
var sanitize_html = __webpack_require__(391036);
var sanitize_html_default = /*#__PURE__*/__webpack_require__.n(sanitize_html);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/dispatcher.ts
var dispatcher = __webpack_require__(245539);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/MatrixClientPeg.ts + 3 modules
var MatrixClientPeg = __webpack_require__(933393);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(294184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/contexts/MatrixClientContext.ts
var MatrixClientContext = __webpack_require__(311878);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/AutoHideScrollbar.tsx
var AutoHideScrollbar = __webpack_require__(651070);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/EmbeddedPage.tsx

/*
Copyright 2016 OpenMarket Ltd
Copyright 2017 Vector Creations Ltd
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










class EmbeddedPage extends react.PureComponent {
  constructor(props, context) {
    super(props, context);
    (0,esm_defineProperty/* default */.Z)(this, "unmounted", false);
    (0,esm_defineProperty/* default */.Z)(this, "dispatcherRef", null);
    (0,esm_defineProperty/* default */.Z)(this, "onAction", payload => {
      // HACK: Workaround for the context's MatrixClient not being set up at render time.
      if (payload.action === 'client_started') {
        this.forceUpdate();
      }
    });
    this.state = {
      page: ''
    };
  }
  translate(s) {
    // default implementation - skins may wish to extend this
    return sanitize_html_default()((0,languageHandler._t)(s));
  }
  componentDidMount() {
    this.unmounted = false;
    if (!this.props.url) {
      return;
    }

    // we use request() to inline the page into the react component
    // so that it can inherit CSS and theming easily rather than mess around
    // with iframes and trying to synchronise document.stylesheets.

    browser_request_default()({
      method: "GET",
      url: this.props.url
    }, (err, response, body) => {
      if (this.unmounted) {
        return;
      }
      if (err || response.status < 200 || response.status >= 300) {
        console.warn(`Error loading page: ${err}`);
        this.setState({
          page: (0,languageHandler._t)("Couldn't load page")
        });
        return;
      }
      body = body.replace(/_t\(['"]([\s\S]*?)['"]\)/mg, (match, g1) => this.translate(g1));
      if (this.props.replaceMap) {
        Object.keys(this.props.replaceMap).forEach(key => {
          body = body.split(key).join(this.props.replaceMap[key]);
        });
      }
      this.setState({
        page: body
      });
    });
    this.dispatcherRef = dispatcher/* default */.ZP.register(this.onAction);
  }
  componentWillUnmount() {
    this.unmounted = true;
    if (this.dispatcherRef !== null) dispatcher/* default */.ZP.unregister(this.dispatcherRef);
  }
  render() {
    // HACK: Workaround for the context's MatrixClient not updating.
    const client = this.context || MatrixClientPeg/* MatrixClientPeg */.p.get();
    const isGuest = client ? client.isGuest() : true;
    const className = this.props.className;
    const classes = classnames_default()({
      [className]: true,
      [`${className}_guest`]: isGuest,
      [`${className}_loggedIn`]: !!client
    });
    const content = /*#__PURE__*/react.createElement("div", {
      className: `${className}_body`,
      dangerouslySetInnerHTML: {
        __html: this.state.page
      }
    });
    if (this.props.scrollbar) {
      return /*#__PURE__*/react.createElement(AutoHideScrollbar/* default */.Z, {
        className: classes
      }, content);
    } else {
      return /*#__PURE__*/react.createElement("div", {
        className: classes
      }, content);
    }
  }
}
(0,esm_defineProperty/* default */.Z)(EmbeddedPage, "contextType", MatrixClientContext/* default */.Z);
;// CONCATENATED MODULE: ./src/components/structures/VectorEmbeddedPage.tsx

/*
Copyright 2016 OpenMarket Ltd
Copyright 2017 Vector Creations Ltd
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




class VectorEmbeddedPage extends EmbeddedPage {
  // we're overriding the base component here, for Element-specific tweaks
  translate(s) {
    s = sanitize_html_default()((0,languageHandler._t)(s));
    // ugly fix for https://github.com/vector-im/element-web/issues/4243
    // eslint-disable-next-line max-len
    s = s.replace(/\[matrix\]/, '<a href="https://matrix.org" target="_blank" rel="noreferrer noopener"><img width="79" height="34" alt="Matrix" style="padding-left: 1px;vertical-align: middle" src="welcome/images/matrix.svg"/></a>');
    return s;
  }
}
(0,defineProperty/* default */.Z)(VectorEmbeddedPage, "replaces", 'EmbeddedPage');
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/SdkConfig.ts
var SdkConfig = __webpack_require__(374312);
;// CONCATENATED MODULE: ./src/components/views/auth/VectorAuthFooter.tsx
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



const VectorAuthFooter = () => {
  const brandingConfig = SdkConfig/* default */.Z.get().branding;
  let links = [{
    "text": "Blog",
    "url": "https://element.io/blog"
  }, {
    "text": "Twitter",
    "url": "https://twitter.com/element_hq"
  }, {
    "text": "GitHub",
    "url": "https://github.com/vector-im/element-web"
  }];
  if (brandingConfig && brandingConfig.authFooterLinks) {
    links = brandingConfig.authFooterLinks;
  }
  const authFooterLinks = [];
  for (const linkEntry of links) {
    authFooterLinks.push( /*#__PURE__*/react.createElement("a", {
      href: linkEntry.url,
      key: linkEntry.text,
      target: "_blank",
      rel: "noreferrer noopener"
    }, linkEntry.text));
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_AuthFooter"
  });
};
VectorAuthFooter.replaces = 'AuthFooter';
/* harmony default export */ const auth_VectorAuthFooter = (VectorAuthFooter);
;// CONCATENATED MODULE: ./src/components/views/auth/VectorAuthHeaderLogo.tsx

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



class VectorAuthHeaderLogo extends react.PureComponent {
  render() {
    const brandingConfig = SdkConfig/* default */.Z.get().branding;
    let logoUrl = "themes/element/img/logos/element-logo.svg";
    if (brandingConfig && brandingConfig.authHeaderLogoUrl) {
      logoUrl = brandingConfig.authHeaderLogoUrl;
    }
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthHeaderLogo"
    }, /*#__PURE__*/react.createElement("img", {
      src: logoUrl,
      alt: "SendingMe"
    }));
  }
}
(0,defineProperty/* default */.Z)(VectorAuthHeaderLogo, "replaces", 'AuthHeaderLogo');
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/index.js + 1 modules
var src = __webpack_require__(47185);
;// CONCATENATED MODULE: ./src/components/views/auth/VectorAuthPage.tsx

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
Copyright 2019, 2020 New Vector Ltd

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




class VectorAuthPage extends react.PureComponent {
  // cache the url as a static to prevent it changing without refreshing
  static getWelcomeBackgroundUrl() {
    if (VectorAuthPage.welcomeBackgroundUrl) return VectorAuthPage.welcomeBackgroundUrl;
    const brandingConfig = SdkConfig/* default */.Z.get().branding;
    VectorAuthPage.welcomeBackgroundUrl = "themes/element/img/backgrounds/lake.jpg";
    if (brandingConfig && brandingConfig.welcomeBackgroundUrl) {
      if (Array.isArray(brandingConfig.welcomeBackgroundUrl)) {
        const index = Math.floor(Math.random() * brandingConfig.welcomeBackgroundUrl.length);
        VectorAuthPage.welcomeBackgroundUrl = brandingConfig.welcomeBackgroundUrl[index];
      } else {
        VectorAuthPage.welcomeBackgroundUrl = brandingConfig.welcomeBackgroundUrl;
      }
    }
    return VectorAuthPage.welcomeBackgroundUrl;
  }
  render() {
    const AuthFooter = src.getComponent('auth.AuthFooter');
    const pageStyle = {
      backgroundImage: 'url(vector-icons/loading-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
    const modalStyle = {
      position: 'relative',
      background: 'initial'
    };
    const blurStyle = _objectSpread({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      filter: 'blur(40px)'
    }, pageStyle);
    const modalContentStyle = {
      display: 'flex',
      zIndex: 1,
      background: 'rgba(255, 255, 255, 0.59)',
      borderRadius: '8px'
    };
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthPage",
      style: pageStyle
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthPage_modal",
      style: modalStyle
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthPage_modalBlur",
      style: blurStyle
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_AuthPage_modalContent",
      style: modalContentStyle
    }, this.props.children)));
  }
}
(0,defineProperty/* default */.Z)(VectorAuthPage, "replaces", 'AuthPage');
(0,defineProperty/* default */.Z)(VectorAuthPage, "welcomeBackgroundUrl", void 0);
;// CONCATENATED MODULE: ./src/component-index.js
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

/*
 * THIS FILE IS AUTO-GENERATED
 * You can edit it you like, but your changes will be overwritten,
 * so you'd just be trying to swim upstream like a salmon.
 * You are not a salmon.
 */

let components = {};

VectorEmbeddedPage && (components['structures.VectorEmbeddedPage'] = VectorEmbeddedPage);

auth_VectorAuthFooter && (components['views.auth.VectorAuthFooter'] = auth_VectorAuthFooter);

VectorAuthHeaderLogo && (components['views.auth.VectorAuthHeaderLogo'] = VectorAuthHeaderLogo);

VectorAuthPage && (components['views.auth.VectorAuthPage'] = VectorAuthPage);


/***/ })

}]);
//# sourceMappingURL=element-web-component-index.js.map