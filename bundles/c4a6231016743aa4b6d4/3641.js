"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[3641],{

/***/ 313641:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImportE2eKeysDialog)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var matrix_js_sdk_src_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(307788);
/* harmony import */ var _utils_MegolmExportEncryption__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(960221);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47185);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(867614);

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







function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      resolve(e.target.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
const PHASE_EDIT = 1;
const PHASE_IMPORTING = 2;
class ImportE2eKeysDialog extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "_onFormChange", ev => {
      const files = this._file.current.files || [];
      this.setState({
        enableSubmit: this._passphrase.current.value !== "" && files.length > 0
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "_onFormSubmit", ev => {
      ev.preventDefault();
      this._startImport(this._file.current.files[0], this._passphrase.current.value);
      return false;
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "_onCancelClick", ev => {
      ev.preventDefault();
      this.props.onFinished(false);
      return false;
    });
    this._unmounted = false;
    this._file = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this._passphrase = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this.state = {
      enableSubmit: false,
      phase: PHASE_EDIT,
      errStr: null
    };
  }
  componentWillUnmount() {
    this._unmounted = true;
  }
  _startImport(file, passphrase) {
    this.setState({
      errStr: null,
      phase: PHASE_IMPORTING
    });
    return readFileAsArrayBuffer(file).then(arrayBuffer => {
      return _utils_MegolmExportEncryption__WEBPACK_IMPORTED_MODULE_3__/* .decryptMegolmKeyFile */ .et(arrayBuffer, passphrase);
    }).then(keys => {
      return this.props.matrixClient.importRoomKeys(JSON.parse(keys));
    }).then(() => {
      // TODO: it would probably be nice to give some feedback about what we've imported here.
      this.props.onFinished(true);
    }).catch(e => {
      console.error("Error importing e2e keys:", e);
      if (this._unmounted) {
        return;
      }
      const msg = e.friendlyText || (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Unknown error');
      this.setState({
        errStr: msg,
        phase: PHASE_EDIT
      });
    });
  }
  render() {
    const BaseDialog = _index__WEBPACK_IMPORTED_MODULE_4__.getComponent('views.dialogs.BaseDialog');
    const disableForm = this.state.phase !== PHASE_EDIT;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(BaseDialog, {
      className: "mx_importE2eKeysDialog",
      onFinished: this.props.onFinished,
      title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Import room keys")
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
      onSubmit: this._onFormSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_Dialog_content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('This process allows you to import encryption keys ' + 'that you had previously exported from another Matrix ' + 'client. You will then be able to decrypt any ' + 'messages that the other client could decrypt.')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('The export file will be protected with a passphrase. ' + 'You should enter the passphrase here, to decrypt the file.')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "error"
    }, this.state.errStr), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_E2eKeysDialog_inputTable"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_E2eKeysDialog_inputRow"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_E2eKeysDialog_inputLabel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
      htmlFor: "importFile"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("File to import"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_E2eKeysDialog_inputCell"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
      ref: this._file,
      id: "importFile",
      type: "file",
      autoFocus: true,
      onChange: this._onFormChange,
      disabled: disableForm
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_E2eKeysDialog_inputRow"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_E2eKeysDialog_inputLabel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
      htmlFor: "passphrase"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Enter passphrase"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_E2eKeysDialog_inputCell"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
      ref: this._passphrase,
      id: "passphrase",
      size: "64",
      type: "password",
      onChange: this._onFormChange,
      disabled: disableForm
    }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_Dialog_buttons"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
      className: "mx_Dialog_primary",
      type: "submit",
      value: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Import'),
      disabled: !this.state.enableSubmit || disableForm
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      onClick: this._onCancelClick,
      disabled: disableForm
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Cancel")))));
  }
}
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(ImportE2eKeysDialog, "propTypes", {
  matrixClient: prop_types__WEBPACK_IMPORTED_MODULE_1___default().instanceOf(matrix_js_sdk_src_client__WEBPACK_IMPORTED_MODULE_2__/* .MatrixClient */ .Xj).isRequired,
  onFinished: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
});

/***/ })

}]);
//# sourceMappingURL=3641.js.map