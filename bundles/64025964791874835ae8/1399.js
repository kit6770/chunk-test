"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[1399],{

/***/ 541399:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CombineForwardMessage: () => (/* binding */ CombineForwardMessage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(473627);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(245539);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(867614);
/* harmony import */ var _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(274057);
/* harmony import */ var _ReactionsRow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(470086);






const CombineForwardMessage = props => {
  const body = props.body.replace(/(\n|\r|\r\n|↵)/g, "<br/>");
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_CombineForward",
    onClick: () => {
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP.dispatch({
        action: _dispatcher_actions__WEBPACK_IMPORTED_MODULE_1__/* .Action */ .a.SetRightPanelPhase,
        phase: _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_4__/* .RightPanelPhases */ .q4.ChatHistory,
        refireParams: {
          params: {
            roomId: props.roomId,
            eventId: props.eventId,
            roomName: props.roomName,
            level: props.level,
            content: props.content
          }
        }
      });
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_CombineForward_content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_CombineForward_content_title"
  }, props.roomName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_CombineForward_content_message",
    dangerouslySetInnerHTML: {
      __html: body
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_CombineForward_footer"
  }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Forward message")), props.reactions ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ReactionsRow__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "mx_ReactionsRow_inline",
    mxEvent: props.mxEvent,
    reactions: props.reactions,
    addReaction: false
  }) : null);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CombineForwardMessage);

/***/ })

}]);
//# sourceMappingURL=1399.js.map