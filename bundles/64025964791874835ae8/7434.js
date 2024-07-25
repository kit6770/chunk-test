"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[7434],{

/***/ 144957:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MVoicePinnedBody)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(867614);
/* harmony import */ var matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(907977);
/* harmony import */ var _utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(960882);
/* harmony import */ var _HtmlUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(714813);
/* harmony import */ var _elements_ReplyThread__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(980531);






class MVoicePinnedBody extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  get content() {
    return this.props.mxEvent.getContent();
  }
  get eventType() {
    return this.props.mxEvent.getType();
  }
  getMessageContetnt() {
    const {
      mxEvent
    } = this.props;
    const {
      body,
      format,
      formatted_body: formattedBody
    } = this.content;
    let content = body;
    let icon = "";
    let tag = "";
    if (mxEvent.getWireContent()["m.forward"]) {
      tag = `[${(0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Forward message")}]`;
      content = "";
    }
    if (this.eventType === matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_2__/* .EventType */ .tw.PollStart || this.eventType === matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_2__/* .EventType */ .tw.PollEnd) {
      var _this$content$this$ev;
      tag = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Poll");
      content = ((_this$content$this$ev = this.content[this.eventType]) === null || _this$content$this$ev === void 0 ? void 0 : _this$content$this$ev.question["m.text"]) || "";
      icon = "📊";
    }
    if (this.eventType === matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_2__/* .EventType */ .tw.RoomAnnouncement) {
      var _mxEvent$getContent$a;
      tag = `[${(0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Room Notice")}]`;
      content = (0,_utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_3__/* .parseHtmlString */ .PS)((_mxEvent$getContent$a = mxEvent.getContent()["announcement"]) === null || _mxEvent$getContent$a === void 0 ? void 0 : _mxEvent$getContent$a.content) || "";
      icon = "📢";
    }
    const mRelatesTo = mxEvent.getWireContent()["m.relates_to"];
    if (mRelatesTo && mRelatesTo["m.in_reply_to"]) {
      tag = `[${(0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Reply")}]`;
      const hasHtml = format === "org.matrix.custom.html" && formattedBody;
      if (hasHtml) {
        content = (0,_HtmlUtils__WEBPACK_IMPORTED_MODULE_4__/* .getHtmlText */ .JS)((_elements_ReplyThread__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z.stripHTMLReply(formattedBody) || "").trim());
      } else {
        content = (_elements_ReplyThread__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z.stripPlainReply(content) || "").trim();
      }
      if (!content) {
        content = "";
      }
    }
    return {
      tag,
      icon,
      content
    };
  }
  render() {
    const {
      tag,
      content,
      icon
    } = this.getMessageContetnt();
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody_info"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody_sender"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Pinned Message"), " #", this.props.pindedIndex + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPinnedBody_content"
    }, icon ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_MPinnedBody_icon mx_MTextPinnedBody_icon"
    }, icon) : null, tag ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_MPinnedBody_text mx_MPinnedBody_tag"
    }, tag) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_MPinnedBody_text"
    }, content))));
  }
}

/***/ })

}]);
//# sourceMappingURL=7434.js.map