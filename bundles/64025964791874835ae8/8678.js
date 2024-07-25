"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[8678],{

/***/ 58678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReactionsRowButtonTooltip)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _HtmlUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(714813);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(867614);
/* harmony import */ var _utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(960882);
/* harmony import */ var _elements_Tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(578413);
/* harmony import */ var _contexts_MatrixClientContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(311878);

/*
Copyright 2019, 2021 The Matrix.org Foundation C.I.C.

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


// @replaceableComponent("views.messages.ReactionsRowButtonTooltip")
class ReactionsRowButtonTooltip extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  render() {
    const {
      content,
      reactionEvents,
      mxEvent,
      visible
    } = this.props;
    const room = this.context.getRoom(mxEvent.getRoomId());
    let tooltipLabel;
    if (room) {
      const senders = [];
      for (const reactionEvent of reactionEvents) {
        const member = room.getMember(reactionEvent.getSender());
        const name = member ? member.name : reactionEvent.getSender();
        senders.push(name);
      }
      const shortName = (0,_HtmlUtils__WEBPACK_IMPORTED_MODULE_1__/* .unicodeToShortcode */ .w3)(content);
      tooltipLabel = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("<reactors/><reactedWith>reacted with %(shortName)s</reactedWith>", {
        shortName
      }, {
        reactors: () => {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
            className: "mx_Tooltip_title"
          }, (0,_utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_3__/* .formatCommaSeparatedList */ .Tg)(senders, 6));
        },
        reactedWith: sub => {
          if (!shortName) {
            return null;
          }
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
            className: "mx_Tooltip_sub"
          }, sub);
        }
      }));
    }
    let tooltip;
    if (tooltipLabel) {
      tooltip = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_elements_Tooltip__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        visible: visible,
        label: tooltipLabel
      });
    }
    return tooltip;
  }
}
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(ReactionsRowButtonTooltip, "contextType", _contexts_MatrixClientContext__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z);

/***/ })

}]);
//# sourceMappingURL=8678.js.map