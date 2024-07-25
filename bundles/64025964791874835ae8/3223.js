"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[3223,355],{

/***/ 920355:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(294184);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
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



const EventTileBubble = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  className,
  title,
  subtitle,
  children,
  titlePrefix
}, ref) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("mx_EventTileBubble", className),
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_EventTileBubble_title"
  }, titlePrefix, title), subtitle && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_EventTileBubble_subtitle"
  }, subtitle), children);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventTileBubble);

/***/ }),

/***/ 623223:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MJitsiWidgetEvent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(867614);
/* harmony import */ var _stores_WidgetStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(548226);
/* harmony import */ var _EventTileBubble__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(920355);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(933393);
/* harmony import */ var _stores_widgets_WidgetLayoutStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(90625);
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







// import { replaceableComponent } from "../../../utils/replaceableComponent";

// @replaceableComponent("views.messages.MJitsiWidgetEvent")
class MJitsiWidgetEvent extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    var _this$props$mxEvent$s;
    const url = this.props.mxEvent.getContent()['url'];
    const prevUrl = this.props.mxEvent.getPrevContent()['url'];
    const senderName = ((_this$props$mxEvent$s = this.props.mxEvent.sender) === null || _this$props$mxEvent$s === void 0 ? void 0 : _this$props$mxEvent$s.name) || this.props.mxEvent.getSender();
    const room = _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_4__/* .MatrixClientPeg */ .p.get().getRoom(this.props.mxEvent.getRoomId());
    const widgetId = this.props.mxEvent.getStateKey();
    const widget = _stores_WidgetStore__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.instance.getRoom(room.roomId, true).widgets.find(w => w.id === widgetId);
    let joinCopy = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Join the conference at the top of this room');
    if (widget && _stores_widgets_WidgetLayoutStore__WEBPACK_IMPORTED_MODULE_5__/* .WidgetLayoutStore */ .z3.instance.isInContainer(room, widget, _stores_widgets_WidgetLayoutStore__WEBPACK_IMPORTED_MODULE_5__/* .Container */ .W2.Right)) {
      joinCopy = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Join the conference from the room information card on the right');
    } else if (!widget) {
      joinCopy = null;
    }
    if (!url) {
      // removed
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_EventTileBubble__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: "mx_MJitsiWidgetEvent",
        title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Video conference ended by %(senderName)s', {
          senderName
        })
      });
    } else if (prevUrl) {
      // modified
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_EventTileBubble__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: "mx_MJitsiWidgetEvent",
        title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Video conference updated by %(senderName)s', {
          senderName
        }),
        subtitle: joinCopy
      });
    } else {
      // assume added
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_EventTileBubble__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: "mx_MJitsiWidgetEvent",
        title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Video conference started by %(senderName)s", {
          senderName
        }),
        subtitle: joinCopy
      });
    }
  }
}

/***/ })

}]);
//# sourceMappingURL=3223.js.map