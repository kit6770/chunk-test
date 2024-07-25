"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[7699],{

/***/ 158205:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZP: () => (/* binding */ CallEventGrouper),
/* harmony export */   kE: () => (/* binding */ CustomCallState),
/* harmony export */   pN: () => (/* binding */ CallEventGrouperEvent)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(225259);
/* harmony import */ var matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(907977);
/* harmony import */ var matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(160193);
/* harmony import */ var _CallHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(613431);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(717187);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(933393);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(245539);

/*
Copyright 2021 Šimon Brandner <simon.bra.ag@gmail.com>

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







let CallEventGrouperEvent = /*#__PURE__*/function (CallEventGrouperEvent) {
  CallEventGrouperEvent["StateChanged"] = "state_changed";
  CallEventGrouperEvent["SilencedChanged"] = "silenced_changed";
  CallEventGrouperEvent["LengthChanged"] = "length_changed";
  return CallEventGrouperEvent;
}({});
const CONNECTING_STATES = [matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallState */ .OX.Connecting, matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallState */ .OX.WaitLocalMedia, matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallState */ .OX.CreateOffer, matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallState */ .OX.CreateAnswer];
const SUPPORTED_STATES = [matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallState */ .OX.Connected, matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallState */ .OX.Ringing];
let CustomCallState = /*#__PURE__*/function (CustomCallState) {
  CustomCallState["Missed"] = "missed";
  return CustomCallState;
}({});
class CallEventGrouper extends events__WEBPACK_IMPORTED_MODULE_3__.EventEmitter {
  constructor() {
    super();
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "events", new Set());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "call", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "state", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "onSilencedCallsChanged", () => {
      const newState = _CallHandler__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP.sharedInstance().isCallSilenced(this.callId);
      this.emit(CallEventGrouperEvent.SilencedChanged, newState);
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "onLengthChanged", length => {
      this.emit(CallEventGrouperEvent.LengthChanged, length);
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "answerCall", () => {
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP.dispatch({
        action: 'answer',
        room_id: this.roomId
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "rejectCall", () => {
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP.dispatch({
        action: 'reject',
        room_id: this.roomId
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "callBack", () => {
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP.dispatch({
        action: 'place_call',
        type: this.isVoice ? matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallType */ .rf.Voice : matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallType */ .rf.Video,
        room_id: this.roomId
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "toggleSilenced", () => {
      const silenced = _CallHandler__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP.sharedInstance().isCallSilenced(this.callId);
      silenced ? _CallHandler__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP.sharedInstance().unSilenceCall(this.callId) : _CallHandler__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP.sharedInstance().silenceCall(this.callId);
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "setState", () => {
      var _this$call, _this$call2;
      if (CONNECTING_STATES.includes((_this$call = this.call) === null || _this$call === void 0 ? void 0 : _this$call.state)) {
        this.state = matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallState */ .OX.Connecting;
      } else if (SUPPORTED_STATES.includes((_this$call2 = this.call) === null || _this$call2 === void 0 ? void 0 : _this$call2.state)) {
        this.state = this.call.state;
      } else {
        if (this.callWasMissed) this.state = CustomCallState.Missed;else if (this.reject) this.state = matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallState */ .OX.Ended;else if (this.hangup) this.state = matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallState */ .OX.Ended;else if (this.invite && this.call) this.state = matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallState */ .OX.Connecting;
      }
      this.emit(CallEventGrouperEvent.StateChanged, this.state);
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(this, "setCall", () => {
      if (this.call) return;
      this.call = _CallHandler__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP.sharedInstance().getCallById(this.callId);
      this.setCallListeners();
      this.setState();
    });
    _CallHandler__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP.sharedInstance().addListener(_CallHandler__WEBPACK_IMPORTED_MODULE_2__/* .CallHandlerEvent */ .Tj.CallsChanged, this.setCall);
    _CallHandler__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP.sharedInstance().addListener(_CallHandler__WEBPACK_IMPORTED_MODULE_2__/* .CallHandlerEvent */ .Tj.SilencedCallsChanged, this.onSilencedCallsChanged);
  }
  get invite() {
    return [...this.events].find(event => event.getType() === matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_0__/* .EventType */ .tw.CallInvite);
  }
  get hangup() {
    return [...this.events].find(event => event.getType() === matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_0__/* .EventType */ .tw.CallHangup);
  }
  get reject() {
    return [...this.events].find(event => event.getType() === matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_0__/* .EventType */ .tw.CallReject);
  }
  get selectAnswer() {
    return [...this.events].find(event => event.getType() === matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_0__/* .EventType */ .tw.CallSelectAnswer);
  }
  get isVoice() {
    var _invite$getContent, _invite$getContent$of, _invite$getContent$of2;
    const invite = this.invite;
    if (!invite) return;

    // FIXME: Find a better way to determine this from the event?
    if (((_invite$getContent = invite.getContent()) === null || _invite$getContent === void 0 ? void 0 : (_invite$getContent$of = _invite$getContent.offer) === null || _invite$getContent$of === void 0 ? void 0 : (_invite$getContent$of2 = _invite$getContent$of.sdp) === null || _invite$getContent$of2 === void 0 ? void 0 : _invite$getContent$of2.indexOf('m=video')) !== -1) return false;
    return true;
  }
  get hangupReason() {
    var _this$hangup, _this$hangup$getConte;
    return (_this$hangup = this.hangup) === null || _this$hangup === void 0 ? void 0 : (_this$hangup$getConte = _this$hangup.getContent()) === null || _this$hangup$getConte === void 0 ? void 0 : _this$hangup$getConte.reason;
  }
  get rejectParty() {
    var _this$reject;
    return (_this$reject = this.reject) === null || _this$reject === void 0 ? void 0 : _this$reject.getSender();
  }
  get gotRejected() {
    return Boolean(this.reject);
  }
  get duration() {
    if (!this.hangup || !this.selectAnswer) return;
    return new Date(this.hangup.getDate().getTime() - this.selectAnswer.getDate().getTime());
  }

  /**
   * Returns true if there are only events from the other side - we missed the call
   */
  get callWasMissed() {
    return ![...this.events].some(event => {
      var _event$sender;
      return ((_event$sender = event.sender) === null || _event$sender === void 0 ? void 0 : _event$sender.userId) === _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_4__/* .MatrixClientPeg */ .p.get().getUserId();
    });
  }
  get callId() {
    var _, _$getContent;
    return (_ = [...this.events][0]) === null || _ === void 0 ? void 0 : (_$getContent = _.getContent()) === null || _$getContent === void 0 ? void 0 : _$getContent.call_id;
  }
  get roomId() {
    var _2;
    return (_2 = [...this.events][0]) === null || _2 === void 0 ? void 0 : _2.getRoomId();
  }
  setCallListeners() {
    if (!this.call) return;
    this.call.addListener(matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallEvent */ .nP.State, this.setState);
    this.call.addListener(matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_1__/* .CallEvent */ .nP.LengthChanged, this.onLengthChanged);
  }
  add(event) {
    this.events.add(event);
    this.setCall();
  }
}

/***/ }),

/***/ 757699:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CallEvent)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(867614);
/* harmony import */ var _avatars_MemberAvatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6156);
/* harmony import */ var _structures_CallEventGrouper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(158205);
/* harmony import */ var _elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(805035);
/* harmony import */ var matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(160193);
/* harmony import */ var _elements_InfoTooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(583733);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(294184);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _elements_AccessibleTooltipButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(717919);
/* harmony import */ var _DateUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(466556);
/* harmony import */ var _audio_messages_Clock__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(634847);

/*
Copyright 2021 Šimon Brandner <simon.bra.ag@gmail.com>

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












const MAX_NON_NARROW_WIDTH = 450 / 70 * 100;
class CallEvent extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  constructor(props) {
    super(props);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)(this, "wrapperElement", /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)(this, "resizeObserver", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)(this, "onLengthChanged", length => {
      this.setState({
        length
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)(this, "resizeObserverCallback", entries => {
      const wrapperElementEntry = entries.find(entry => entry.target === this.wrapperElement.current);
      if (!wrapperElementEntry) return;
      this.setState({
        narrow: wrapperElementEntry.contentRect.width < MAX_NON_NARROW_WIDTH
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)(this, "onSilencedChanged", newState => {
      this.setState({
        silenced: newState
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)(this, "onStateChanged", newState => {
      this.setState({
        callState: newState
      });
    });
    this.state = {
      callState: this.props.callEventGrouper.state,
      silenced: false,
      narrow: false,
      length: 0
    };
  }
  componentDidMount() {
    this.props.callEventGrouper.addListener(_structures_CallEventGrouper__WEBPACK_IMPORTED_MODULE_3__/* .CallEventGrouperEvent */ .pN.StateChanged, this.onStateChanged);
    this.props.callEventGrouper.addListener(_structures_CallEventGrouper__WEBPACK_IMPORTED_MODULE_3__/* .CallEventGrouperEvent */ .pN.SilencedChanged, this.onSilencedChanged);
    this.props.callEventGrouper.addListener(_structures_CallEventGrouper__WEBPACK_IMPORTED_MODULE_3__/* .CallEventGrouperEvent */ .pN.LengthChanged, this.onLengthChanged);
    this.resizeObserver = new ResizeObserver(this.resizeObserverCallback);
    this.resizeObserver.observe(this.wrapperElement.current);
  }
  componentWillUnmount() {
    this.props.callEventGrouper.removeListener(_structures_CallEventGrouper__WEBPACK_IMPORTED_MODULE_3__/* .CallEventGrouperEvent */ .pN.StateChanged, this.onStateChanged);
    this.props.callEventGrouper.removeListener(_structures_CallEventGrouper__WEBPACK_IMPORTED_MODULE_3__/* .CallEventGrouperEvent */ .pN.SilencedChanged, this.onSilencedChanged);
    this.props.callEventGrouper.removeListener(_structures_CallEventGrouper__WEBPACK_IMPORTED_MODULE_3__/* .CallEventGrouperEvent */ .pN.LengthChanged, this.onLengthChanged);
    this.resizeObserver.disconnect();
  }
  renderCallBackButton(text) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
      className: "mx_CallEvent_content_button mx_CallEvent_content_button_callBack",
      onClick: this.props.callEventGrouper.callBack,
      kind: "primary"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, " ", text, " "));
  }
  renderSilenceIcon() {
    const silenceClass = classnames__WEBPACK_IMPORTED_MODULE_7___default()({
      "mx_CallEvent_iconButton": true,
      "mx_CallEvent_unSilence": this.state.silenced,
      "mx_CallEvent_silence": !this.state.silenced
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_elements_AccessibleTooltipButton__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
      className: silenceClass,
      onClick: this.props.callEventGrouper.toggleSilenced,
      title: this.state.silenced ? (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Sound on") : (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Silence call")
    });
  }
  renderContent(state) {
    if (state === matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__/* .CallState */ .OX.Ringing) {
      let silenceIcon;
      if (!this.state.narrow) {
        silenceIcon = this.renderSilenceIcon();
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_CallEvent_content"
      }, silenceIcon, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        className: "mx_CallEvent_content_button mx_CallEvent_content_button_reject",
        onClick: this.props.callEventGrouper.rejectCall,
        kind: "danger"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, " ", (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Decline"), " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        className: "mx_CallEvent_content_button mx_CallEvent_content_button_answer",
        onClick: this.props.callEventGrouper.answerCall,
        kind: "primary"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, " ", (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Accept"), " ")));
    }
    if (state === matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__/* .CallState */ .OX.Ended) {
      const hangupReason = this.props.callEventGrouper.hangupReason;
      const gotRejected = this.props.callEventGrouper.gotRejected;
      if (gotRejected) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "mx_CallEvent_content"
        }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Call declined"), this.renderCallBackButton((0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Call back")));
      } else if ([matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__/* .CallErrorCode */ .We.UserHangup, "user hangup"].includes(hangupReason) || !hangupReason) {
        // workaround for https://github.com/vector-im/element-web/issues/5178
        // it seems Android randomly sets a reason of "user hangup" which is
        // interpreted as an error code :(
        // https://github.com/vector-im/riot-android/issues/2623
        // Also the correct hangup code as of VoIP v1 (with underscore)
        // Also, if we don't have a reason
        const duration = this.props.callEventGrouper.duration;
        let text = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Call ended");
        if (duration) {
          text += " • " + (0,_DateUtils__WEBPACK_IMPORTED_MODULE_9__/* .formatCallTime */ .ul)(duration);
        }
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "mx_CallEvent_content"
        }, text);
      } else if (hangupReason === matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__/* .CallErrorCode */ .We.InviteTimeout) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "mx_CallEvent_content"
        }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("No answer"), this.renderCallBackButton((0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Call back")));
      }
      let reason;
      if (hangupReason === matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__/* .CallErrorCode */ .We.IceFailed) {
        // We couldn't establish a connection at all
        reason = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Could not connect media");
      } else if (hangupReason === "ice_timeout") {
        // We established a connection but it died
        reason = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Connection failed");
      } else if (hangupReason === matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__/* .CallErrorCode */ .We.NoUserMedia) {
        // The other side couldn't open capture devices
        reason = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Their device couldn't start the camera or microphone");
      } else if (hangupReason === "unknown_error") {
        // An error code the other side doesn't have a way to express
        // (as opposed to an error code they gave but we don't know about,
        // in which case we show the error code)
        reason = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("An unknown error occurred");
      } else if (hangupReason === matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__/* .CallErrorCode */ .We.UserBusy) {
        reason = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("The user you called is busy.");
      } else {
        reason = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Unknown failure: %(reason)s', {
          reason: hangupReason
        });
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_CallEvent_content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_elements_InfoTooltip__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
        tooltip: reason,
        className: "mx_CallEvent_content_tooltip",
        kind: _elements_InfoTooltip__WEBPACK_IMPORTED_MODULE_6__/* .InfoTooltipKind */ .e.Warning
      }), (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Connection failed"), this.renderCallBackButton((0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Retry")));
    }
    if (state === matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__/* .CallState */ .OX.Connected) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_CallEvent_content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_audio_messages_Clock__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
        seconds: this.state.length
      }));
    }
    if (state === matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__/* .CallState */ .OX.Connecting) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_CallEvent_content"
      }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Connecting"));
    }
    if (state === _structures_CallEventGrouper__WEBPACK_IMPORTED_MODULE_3__/* .CustomCallState */ .kE.Missed) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_CallEvent_content"
      }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Missed call"), this.renderCallBackButton((0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Call back")));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CallEvent_content"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("The call is in an unknown state!"));
  }
  render() {
    const event = this.props.mxEvent;
    const sender = event.sender ? event.sender.name : event.getSender();
    const isVoice = this.props.callEventGrouper.isVoice;
    const callType = isVoice ? (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Voice call") : (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Video call");
    const callState = this.state.callState;
    const hangupReason = this.props.callEventGrouper.hangupReason;
    const content = this.renderContent(callState);
    const className = classnames__WEBPACK_IMPORTED_MODULE_7___default()("mx_CallEvent", {
      mx_CallEvent_voice: isVoice,
      mx_CallEvent_video: !isVoice,
      mx_CallEvent_narrow: this.state.narrow,
      mx_CallEvent_missed: callState === _structures_CallEventGrouper__WEBPACK_IMPORTED_MODULE_3__/* .CustomCallState */ .kE.Missed,
      mx_CallEvent_noAnswer: callState === matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__/* .CallState */ .OX.Ended && hangupReason === matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__/* .CallErrorCode */ .We.InviteTimeout,
      mx_CallEvent_rejected: callState === matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__/* .CallState */ .OX.Ended && this.props.callEventGrouper.gotRejected
    });
    let silenceIcon;
    if (this.state.narrow && this.state.callState === matrix_js_sdk_src_webrtc_call__WEBPACK_IMPORTED_MODULE_5__/* .CallState */ .OX.Ringing) {
      silenceIcon = this.renderSilenceIcon();
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CallEvent_wrapper",
      ref: this.wrapperElement
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: className
    }, silenceIcon, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CallEvent_info"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_avatars_MemberAvatar__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
      member: event.sender,
      size: 32
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CallEvent_info_basic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CallEvent_sender"
    }, sender), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CallEvent_type"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CallEvent_type_icon"
    }), callType))), content));
  }
}

/***/ })

}]);
//# sourceMappingURL=7699.js.map