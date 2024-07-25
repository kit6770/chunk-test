"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[7311],{

/***/ 667311:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TileErrorBoundary)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(294184);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(867614);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(241648);
/* harmony import */ var _SdkConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(374312);
/* harmony import */ var _dialogs_BugReportDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(758795);

/*
Copyright 2020 - 2021 The Matrix.org Foundation C.I.C.

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

// @replaceableComponent("views.messages.TileErrorBoundary")
class TileErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "onBugReport", () => {
      _Modal__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.createTrackedDialog('Bug Report Dialog', '', _dialogs_BugReportDialog__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
        label: 'react-soft-crash-tile',
        error: this.state.error
      });
    });
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    // Side effects are not permitted here, so we only update the state so
    // that the next render shows an error message.
    return {
      error
    };
  }
  render() {
    if (this.state.error) {
      const {
        mxEvent
      } = this.props;
      const classes = {
        mx_EventTile: true,
        mx_EventTile_info: true,
        mx_EventTile_content: true,
        mx_EventTile_tileError: true
      };
      let submitLogsButton;
      if (_SdkConfig__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z.get().bug_report_endpoint_url) {
        submitLogsButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
          onClick: this.onBugReport,
          href: "#"
        }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("Submit logs"));
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(classes)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_EventTile_line"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("Can't load this message"), mxEvent && ` (${mxEvent.getType()})`, submitLogsButton)));
    }
    return this.props.children;
  }
}

/***/ })

}]);
//# sourceMappingURL=7311.js.map