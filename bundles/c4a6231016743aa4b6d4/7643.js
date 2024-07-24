"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[7643,355],{

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

/***/ 737643:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MKeyVerificationRequest)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(933393);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(867614);
/* harmony import */ var _utils_KeyVerificationStateObserver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(796607);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(245539);
/* harmony import */ var _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(274057);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(473627);
/* harmony import */ var _EventTileBubble__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(920355);
/* harmony import */ var _utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(90287);
/* harmony import */ var _elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(805035);

var _dec, _class;
/*
Copyright 2019, 2020 The Matrix.org Foundation C.I.C.

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











let MKeyVerificationRequest = (_dec = (0,_utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_8__/* .replaceableComponent */ .U)("views.messages.MKeyVerificationRequest"), _dec(_class = class MKeyVerificationRequest extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(...args) {
    super(...args);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(this, "openRequest", () => {
      const {
        verificationRequest
      } = this.props.mxEvent;
      const member = _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__/* .MatrixClientPeg */ .p.get().getUser(verificationRequest.otherUserId);
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP.dispatch({
        action: _dispatcher_actions__WEBPACK_IMPORTED_MODULE_6__/* .Action */ .a.SetRightPanelPhase,
        phase: _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_5__/* .RightPanelPhases */ .q4.EncryptionPanel,
        refireParams: {
          verificationRequest,
          member
        }
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(this, "onRequestChanged", () => {
      this.forceUpdate();
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(this, "onAcceptClicked", async () => {
      const request = this.props.mxEvent.verificationRequest;
      if (request) {
        try {
          this.openRequest();
          await request.accept();
        } catch (err) {
          console.error(err.message);
        }
      }
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(this, "onRejectClicked", async () => {
      const request = this.props.mxEvent.verificationRequest;
      if (request) {
        try {
          await request.cancel();
        } catch (err) {
          console.error(err.message);
        }
      }
    });
  }
  componentDidMount() {
    const request = this.props.mxEvent.verificationRequest;
    if (request) {
      request.on("change", this.onRequestChanged);
    }
  }
  componentWillUnmount() {
    const request = this.props.mxEvent.verificationRequest;
    if (request) {
      request.off("change", this.onRequestChanged);
    }
  }
  acceptedLabel(userId) {
    const client = _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__/* .MatrixClientPeg */ .p.get();
    const myUserId = client.getUserId();
    if (userId === myUserId) {
      return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("You accepted");
    } else {
      return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("%(name)s accepted", {
        name: (0,_utils_KeyVerificationStateObserver__WEBPACK_IMPORTED_MODULE_3__/* .getNameForEventRoom */ .$)(userId, this.props.mxEvent.getRoomId())
      });
    }
  }
  cancelledLabel(userId) {
    const client = _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__/* .MatrixClientPeg */ .p.get();
    const myUserId = client.getUserId();
    const {
      cancellationCode
    } = this.props.mxEvent.verificationRequest;
    const declined = cancellationCode === "m.user";
    if (userId === myUserId) {
      if (declined) {
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("You declined");
      } else {
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("You cancelled");
      }
    } else {
      if (declined) {
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("%(name)s declined", {
          name: (0,_utils_KeyVerificationStateObserver__WEBPACK_IMPORTED_MODULE_3__/* .getNameForEventRoom */ .$)(userId, this.props.mxEvent.getRoomId())
        });
      } else {
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("%(name)s cancelled", {
          name: (0,_utils_KeyVerificationStateObserver__WEBPACK_IMPORTED_MODULE_3__/* .getNameForEventRoom */ .$)(userId, this.props.mxEvent.getRoomId())
        });
      }
    }
  }
  render() {
    const {
      mxEvent
    } = this.props;
    const request = mxEvent.verificationRequest;
    if (!request || request.invalid) {
      return null;
    }
    let title;
    let subtitle;
    let stateNode;
    if (!request.canAccept) {
      let stateLabel;
      const accepted = request.ready || request.started || request.done;
      if (accepted) {
        stateLabel = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
          onClick: this.openRequest
        }, this.acceptedLabel(request.receivingUserId));
      } else if (request.cancelled) {
        stateLabel = this.cancelledLabel(request.cancellingUserId);
      } else if (request.accepting) {
        stateLabel = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("Accepting …");
      } else if (request.declining) {
        stateLabel = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("Declining …");
      }
      stateNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_cryptoEvent_state"
      }, stateLabel);
    }
    if (!request.initiatedByMe) {
      const name = (0,_utils_KeyVerificationStateObserver__WEBPACK_IMPORTED_MODULE_3__/* .getNameForEventRoom */ .$)(request.requestingUserId, mxEvent.getRoomId());
      title = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("%(name)s wants to verify", {
        name
      });
      subtitle = (0,_utils_KeyVerificationStateObserver__WEBPACK_IMPORTED_MODULE_3__/* .userLabelForEventRoom */ .s)(request.requestingUserId, mxEvent.getRoomId());
      if (request.canAccept) {
        stateNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "mx_cryptoEvent_buttons"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
          kind: "danger",
          onClick: this.onRejectClicked
        }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("Decline")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
          kind: "primary",
          onClick: this.onAcceptClicked
        }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("Accept")));
      }
    } else {
      // request sent by us
      title = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("You sent a verification request");
      subtitle = (0,_utils_KeyVerificationStateObserver__WEBPACK_IMPORTED_MODULE_3__/* .userLabelForEventRoom */ .s)(request.receivingUserId, mxEvent.getRoomId());
    }
    if (title) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_EventTileBubble__WEBPACK_IMPORTED_MODULE_7__["default"], {
        className: "mx_cryptoEvent mx_cryptoEvent_icon",
        title: title,
        subtitle: subtitle
      }, stateNode);
    }
    return null;
  }
}) || _class);


/***/ })

}]);
//# sourceMappingURL=7643.js.map