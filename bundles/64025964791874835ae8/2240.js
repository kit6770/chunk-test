"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[2240],{

/***/ 92240:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(166644);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(992619);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var matrix_js_sdk_src_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(540534);
/* harmony import */ var matrix_js_sdk_src_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(101461);
/* harmony import */ var _contexts_MatrixClientContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(311878);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(867614);
/* harmony import */ var _TextForEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(565597);
/* harmony import */ var _MPollBody__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(796226);


const _excluded = ["mxEvent"];







const getRelatedPollStartEventId = event => {
  const relation = event.getRelation();
  return relation === null || relation === void 0 ? void 0 : relation.event_id;
};

/**
 * Attempt to retrieve the related poll start event for this end event
 * If the event already exists in the rooms timeline, return it
 * Otherwise try to fetch the event from the server
 * @param event
 * @returns
 */
const usePollStartEvent = event => {
  const matrixClient = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_MatrixClientContext__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);
  const [pollStartEvent, setPollStartEvent] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [isLoadingPollStartEvent, setIsLoadingPollStartEvent] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const pollStartEventId = getRelatedPollStartEventId(event);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _timelineSet$getTimel;
    const room = matrixClient.getRoom(event.getRoomId());
    const fetchPollStartEvent = async (roomId, pollStartEventId) => {
      setIsLoadingPollStartEvent(true);
      try {
        var _room$processPollEven;
        const startEventJson = await matrixClient.fetchRoomEvent(roomId, pollStartEventId);
        const startEvent = new matrix_js_sdk_src_matrix__WEBPACK_IMPORTED_MODULE_1__.MatrixEvent(startEventJson);
        // add the poll to the room polls state
        room === null || room === void 0 ? void 0 : (_room$processPollEven = room.processPollEvents) === null || _room$processPollEven === void 0 ? void 0 : _room$processPollEven.call(room, [startEvent, event]);

        // end event is not a valid end to the related start event
        // if not sent by the same user
        if (startEvent.getSender() === event.getSender()) {
          setPollStartEvent(startEvent);
        }
      } catch (error) {
        matrix_js_sdk_src_logger__WEBPACK_IMPORTED_MODULE_2__/* .logger */ .k.error("Failed to fetch related poll start event", error);
      } finally {
        setIsLoadingPollStartEvent(false);
      }
    };
    if (pollStartEvent || !room || !pollStartEventId) {
      return;
    }
    const timelineSet = room.getUnfilteredTimelineSet();
    const localEvent = timelineSet === null || timelineSet === void 0 ? void 0 : (_timelineSet$getTimel = timelineSet.getTimelineForEvent(pollStartEventId)) === null || _timelineSet$getTimel === void 0 ? void 0 : _timelineSet$getTimel.getEvents().find(e => e.getId() === pollStartEventId);
    if (localEvent) {
      // end event is not a valid end to the related start event
      // if not sent by the same user
      if (localEvent.getSender() === event.getSender()) {
        setPollStartEvent(localEvent);
      }
    } else {
      // pollStartEvent is not in the current timeline,
      // fetch it
      fetchPollStartEvent(room.roomId, pollStartEventId);
    }
  }, [event, pollStartEventId, pollStartEvent, matrixClient]);
  return {
    pollStartEvent,
    isLoadingPollStartEvent
  };
};
const MPollEndBody = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((_ref, ref) => {
  let {
      mxEvent
    } = _ref,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(_ref, _excluded);
  const {
    pollStartEvent,
    isLoadingPollStartEvent
  } = usePollStartEvent(mxEvent);
  if (!pollStartEvent) {
    const pollEndFallbackMessage = mxEvent.getContent()["m.text"] || (0,_TextForEvent__WEBPACK_IMPORTED_MODULE_5__/* .textForEvent */ .MW)(mxEvent);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MPollEndBody_icon"
    }), !isLoadingPollStartEvent && pollEndFallbackMessage);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "mx_Caption"
  }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("Ended a poll")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MPollBody__WEBPACK_IMPORTED_MODULE_6__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)({
    mxEvent: pollStartEvent
  }, props)));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MPollEndBody);

/***/ })

}]);
//# sourceMappingURL=2240.js.map