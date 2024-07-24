"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[7936],{

/***/ 967936:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MAnnouncement)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(90287);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(245539);
/* harmony import */ var _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(274057);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(473627);
/* harmony import */ var _messages_MessageTimestamp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(982820);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(867614);
/* harmony import */ var _elements_wysiwyg_components_FileItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(385479);
var _dec, _class;
/*
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









let MAnnouncement = (_dec = (0,_utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_1__/* .replaceableComponent */ .U)("views.messages.MAnnouncement"), _dec(_class = class MAnnouncement extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  get announcementInfo() {
    const data = this.props.mxEvent.getContent();
    return data;
  }
  handleClick() {
    _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP.dispatch({
      action: _dispatcher_actions__WEBPACK_IMPORTED_MODULE_4__/* .Action */ .a.SetRightPanelPhase,
      phase: _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_3__/* .RightPanelPhases */ .q4.Announcement,
      refireParams: {
        params: {
          announcement: this.announcementInfo.announcement,
          roomId: this.props.mxEvent.getRoomId()
        }
      }
    });
  }
  renderAnnouncement() {
    const timestamp = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_messages_MessageTimestamp__WEBPACK_IMPORTED_MODULE_5__["default"], {
      ts: this.props.mxEvent.getTs(),
      showHourMinute: true
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MAnnouncement",
      onClick: () => this.handleClick()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MAnnouncement_title"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_6__._t)("Room Notice")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MAnnouncement_ele",
      dangerouslySetInnerHTML: {
        __html: this.announcementInfo.announcement.content
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MAnnouncement_file_area"
    }, (this.announcementInfo.announcement.file_list || []).map(i => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_elements_wysiwyg_components_FileItem__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, i))), timestamp);
  }
  render() {
    return this.renderAnnouncement();
  }
}) || _class);


/***/ })

}]);
//# sourceMappingURL=7936.js.map