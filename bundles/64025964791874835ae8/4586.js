"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[4586],{

/***/ 964586:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DateSeparator)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(867614);
/* harmony import */ var _DateUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(466556);
/*
Copyright 2018 Michael Telatynski <7t3chguy@gmail.com>
Copyright 2015 - 2021 The Matrix.org Foundation C.I.C.

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




function getDaysArray() {
  return [(0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Sunday'), (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Monday'), (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Tuesday'), (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Wednesday'), (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Thursday'), (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Friday'), (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Saturday')];
}
class DateSeparator extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  getLabel() {
    const date = new Date(this.props.ts);
    const today = new Date();
    const yesterday = new Date();
    const days = getDaysArray();
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) {
      return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Today');
    } else if (date.toDateString() === yesterday.toDateString()) {
      return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Yesterday');
    } else if (today.getTime() - date.getTime() < 6 * 24 * 60 * 60 * 1000) {
      return days[date.getDay()];
    } else {
      return (0,_DateUtils__WEBPACK_IMPORTED_MODULE_2__/* .formatFullDateNoTime */ .D5)(date);
    }
  }
  render() {
    // ARIA treats <hr/>s as separators, here we abuse them slightly so manually treat this entire thing as one
    // tab-index=-1 to allow it to be focusable but do not add tab stop for it, primarily for screen readers
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
      className: "mx_DateSeparator",
      role: "separator",
      tabIndex: -1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("hr", {
      role: "none"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, this.getLabel()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("hr", {
      role: "none"
    }));
  }
}

/***/ })

}]);
//# sourceMappingURL=4586.js.map