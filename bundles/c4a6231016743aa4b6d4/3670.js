"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[3670,355],{

/***/ 773670:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(867614);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(933393);
/* harmony import */ var _EventTileBubble__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(920355);
/* harmony import */ var _contexts_MatrixClientContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(311878);
/* harmony import */ var _utils_DMRoomMap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(332506);
/* harmony import */ var _utils_objects__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(608660);
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








const ALGORITHM = "m.megolm.v1.aes-sha2";
const EncryptionEvent = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  mxEvent
}, ref) => {
  const cli = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_MatrixClientContext__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z);
  const roomId = mxEvent.getRoomId();
  const isRoomEncrypted = _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_2__/* .MatrixClientPeg */ .p.get().isRoomEncrypted(roomId);
  const prevContent = mxEvent.getPrevContent();
  const content = mxEvent.getContent();

  // if no change happened then skip rendering this, a shallow check is enough as all known fields are top-level.
  if (!(0,_utils_objects__WEBPACK_IMPORTED_MODULE_6__/* .objectHasDiff */ .U0)(prevContent, content)) return null; // nop

  if (content.algorithm === ALGORITHM && isRoomEncrypted) {
    let subtitle;
    const dmPartner = _utils_DMRoomMap__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z.shared().getUserIdForRoomId(roomId);
    if (prevContent.algorithm === ALGORITHM) {
      subtitle = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Some encryption parameters have been changed.");
    } else if (dmPartner) {
      var _cli$getRoom, _cli$getRoom$getMembe;
      const displayName = (cli === null || cli === void 0 ? void 0 : (_cli$getRoom = cli.getRoom(roomId)) === null || _cli$getRoom === void 0 ? void 0 : (_cli$getRoom$getMembe = _cli$getRoom.getMember(dmPartner)) === null || _cli$getRoom$getMembe === void 0 ? void 0 : _cli$getRoom$getMembe.rawDisplayName) || dmPartner;
      subtitle = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Messages here are end-to-end encrypted. " + "Verify %(displayName)s in their profile - tap on their avatar.", {
        displayName
      });
    } else {
      subtitle = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Messages in this room are end-to-end encrypted. " + "When people join, you can verify them in their profile, just tap on their avatar.");
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_EventTileBubble__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: "mx_cryptoEvent",
      title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Encryption enabled"),
      subtitle: subtitle,
      titlePrefix: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "mx_cryptoEvent_title_prefix"
      })
    });
  }
  if (isRoomEncrypted) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_EventTileBubble__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: "mx_cryptoEvent",
      title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Encryption enabled"),
      subtitle: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Ignored attempt to disable encryption"),
      titlePrefix: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "mx_cryptoEvent_title_prefix"
      })
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_EventTileBubble__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "mx_cryptoEvent mx_cryptoEvent_icon_warning",
    title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Encryption not enabled"),
    subtitle: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("The encryption used by this room isn't supported."),
    titlePrefix: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_cryptoEvent_title_prefix"
    }),
    ref: ref
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EncryptionEvent);

/***/ }),

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

/***/ })

}]);
//# sourceMappingURL=3670.js.map