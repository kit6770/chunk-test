(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[1255],{

/***/ 851255:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExportE2eKeysDialog)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(225259);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(293162);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(667294);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(45697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(867614);
/* harmony import */ var matrix_js_sdk_src_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(307788);
/* harmony import */ var _utils_MegolmExportEncryption__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(960221);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(47185);

/*
Copyright 2017 Vector Creations Ltd

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








const PHASE_EDIT = 1;
const PHASE_EXPORTING = 2;
class ExportE2eKeysDialog extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(this, "_onPassphraseFormSubmit", ev => {
      ev.preventDefault();
      const passphrase = this._passphrase1.current.value;
      if (passphrase !== this._passphrase2.current.value) {
        this.setState({
          errStr: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)('Passphrases must match')
        });
        return false;
      }
      if (!passphrase) {
        this.setState({
          errStr: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)('Passphrase must not be empty')
        });
        return false;
      }
      this._startExport(passphrase);
      return false;
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(this, "_onCancelClick", ev => {
      ev.preventDefault();
      this.props.onFinished(false);
      return false;
    });
    this._unmounted = false;
    this._passphrase1 = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this._passphrase2 = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this.state = {
      phase: PHASE_EDIT,
      errStr: null
    };
  }
  componentWillUnmount() {
    this._unmounted = true;
  }
  _startExport(passphrase) {
    // extra Promise.resolve() to turn synchronous exceptions into
    // asynchronous ones.
    Promise.resolve().then(() => {
      return this.props.matrixClient.exportRoomKeys();
    }).then(k => {
      return _utils_MegolmExportEncryption__WEBPACK_IMPORTED_MODULE_5__/* .encryptMegolmKeyFile */ .cV(JSON.stringify(k), passphrase);
    }).then(f => {
      const blob = new Blob([f], {
        type: 'text/plain;charset=us-ascii'
      });
      file_saver__WEBPACK_IMPORTED_MODULE_0___default().saveAs(blob, 'element-keys.txt');
      this.props.onFinished(true);
    }).catch(e => {
      console.error("Error exporting e2e keys:", e);
      if (this._unmounted) {
        return;
      }
      const msg = e.friendlyText || (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)('Unknown error');
      this.setState({
        errStr: msg,
        phase: PHASE_EDIT
      });
    });
    this.setState({
      errStr: null,
      phase: PHASE_EXPORTING
    });
  }
  render() {
    const BaseDialog = _index__WEBPACK_IMPORTED_MODULE_6__.getComponent('views.dialogs.BaseDialog');
    const disableForm = this.state.phase === PHASE_EXPORTING;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(BaseDialog, {
      className: "mx_exportE2eKeysDialog",
      onFinished: this.props.onFinished,
      title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Export room keys")
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("form", {
      onSubmit: this._onPassphraseFormSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "mx_Dialog_content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)('This process allows you to export the keys for messages ' + 'you have received in encrypted rooms to a local file. You ' + 'will then be able to import the file into another Matrix ' + 'client in the future, so that client will also be able to ' + 'decrypt these messages.')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)('The exported file will allow anyone who can read it to decrypt ' + 'any encrypted messages that you can see, so you should be ' + 'careful to keep it secure. To help with this, you should enter ' + 'a passphrase below, which will be used to encrypt the exported ' + 'data. It will only be possible to import the data by using the ' + 'same passphrase.')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "error"
    }, this.state.errStr), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "mx_E2eKeysDialog_inputTable"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "mx_E2eKeysDialog_inputRow"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "mx_E2eKeysDialog_inputLabel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", {
      htmlFor: "passphrase1"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Enter passphrase"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "mx_E2eKeysDialog_inputCell"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", {
      ref: this._passphrase1,
      id: "passphrase1",
      autoFocus: true,
      size: "64",
      type: "password",
      disabled: disableForm
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "mx_E2eKeysDialog_inputRow"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "mx_E2eKeysDialog_inputLabel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", {
      htmlFor: "passphrase2"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Confirm passphrase"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "mx_E2eKeysDialog_inputCell"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", {
      ref: this._passphrase2,
      id: "passphrase2",
      size: "64",
      type: "password",
      disabled: disableForm
    }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "mx_Dialog_buttons"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", {
      className: "mx_Dialog_primary",
      type: "submit",
      value: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)('Export'),
      disabled: disableForm
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
      onClick: this._onCancelClick,
      disabled: disableForm
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Cancel")))));
  }
}
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(ExportE2eKeysDialog, "propTypes", {
  matrixClient: prop_types__WEBPACK_IMPORTED_MODULE_2___default().instanceOf(matrix_js_sdk_src_client__WEBPACK_IMPORTED_MODULE_4__/* .MatrixClient */ .Xj).isRequired,
  onFinished: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired
});

/***/ }),

/***/ 293162:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof __webpack_require__.g&&__webpack_require__.g.global===__webpack_require__.g?__webpack_require__.g:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map

/***/ })

}]);
//# sourceMappingURL=1255.js.map