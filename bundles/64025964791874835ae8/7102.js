(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[7102],{

/***/ 416147:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);

const IconMore = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M2.99609 5.99728H21.0036",
    stroke: "#838791",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M17.0019 12.0002H2.99609",
    stroke: "#838791",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M2.99609 18.0022H13.0003",
    stroke: "#838791",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconMore);

/***/ }),

/***/ 46751:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZP: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   rv: () => (/* binding */ useUnreadNotification)
/* harmony export */ });
/* unused harmony export UnreadNotificationContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(300111);
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(830270);
/* harmony import */ var zustand_middleware_immer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(118753);
/* harmony import */ var matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(907977);
/* harmony import */ var matrix_js_sdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(407637);
/* harmony import */ var _stores_notifications_RoomNotificationStateStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16033);
/* harmony import */ var _contexts_MatrixClientContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(311878);
/* harmony import */ var ahooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(924737);
/* harmony import */ var ahooks__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ahooks__WEBPACK_IMPORTED_MODULE_8__);









const INIT_STATE = {
  hasUnreadGlobalNotification: false,
  hasUnreadFriendNotification: false,
  hasUnreadCommunityNotification: false,
  hasUnreadWorkNotification: false
};
/**
 * i recommend `useNotificationContext` because it better than `NotificationContext`,
 * if u prefer `Context style`, it is ok.
 */
const useUnreadNotification = (0,zustand__WEBPACK_IMPORTED_MODULE_5__/* .create */ .Ue)((0,zustand_middleware_immer__WEBPACK_IMPORTED_MODULE_6__/* .immer */ .n)(() => INIT_STATE));
const UnreadNotificationContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(INIT_STATE);
const THROTTLE_TIME_OUT = 1000;
const calculateUnread = (0,lodash_es__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(() => {
  // i have no idea, but this is the only way to resolve problem that i known.
  // fuck long process event!
  // no await no yield
  // funcking matrix js event process make every thing fuck up!
  setTimeout(() => {
    Promise.resolve().then(() => {
      const hasFriendUnread = _stores_notifications_RoomNotificationStateStore__WEBPACK_IMPORTED_MODULE_3__/* .RoomNotificationStateStore */ .v.instance.getSceneState(matrix_js_sdk__WEBPACK_IMPORTED_MODULE_2__/* .ChatScene */ .rw.Friend).hasUnreadCount;
      const hasCommunityUnread = _stores_notifications_RoomNotificationStateStore__WEBPACK_IMPORTED_MODULE_3__/* .RoomNotificationStateStore */ .v.instance.getSceneState(matrix_js_sdk__WEBPACK_IMPORTED_MODULE_2__/* .ChatScene */ .rw.Community).hasUnreadCount;
      const hasWorksUnread = _stores_notifications_RoomNotificationStateStore__WEBPACK_IMPORTED_MODULE_3__/* .RoomNotificationStateStore */ .v.instance.getSceneState(matrix_js_sdk__WEBPACK_IMPORTED_MODULE_2__/* .ChatScene */ .rw.Work).hasUnreadCount;
      useUnreadNotification.setState(draft => {
        draft.hasUnreadFriendNotification = hasFriendUnread;
        draft.hasUnreadCommunityNotification = hasCommunityUnread;
        draft.hasUnreadWorkNotification = hasWorksUnread;
        draft.hasUnreadGlobalNotification = hasFriendUnread || hasCommunityUnread || hasWorksUnread;
      });
    });
  });
}, THROTTLE_TIME_OUT, {
  trailing: true,
  leading: true
});

/**
 * manage room unread message & invitations
 */
const NotificationManagerProvider = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(({
  children
}) => {
  const client = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_MatrixClientContext__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z);
  const unreadState = useUnreadNotification(state => state);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    calculateUnread();
    return () => null;
  }, []);
  (0,ahooks__WEBPACK_IMPORTED_MODULE_8__.useMount)(() => {
    if (client) {
      client.on(matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_1__/* .EventType */ .tw.FullyRead, calculateUnread);
      client.on("Room.read_marker", calculateUnread);
      client.on("Room.timeline", calculateUnread);
    }
  });
  (0,ahooks__WEBPACK_IMPORTED_MODULE_8__.useUnmount)(() => {
    if (client) {
      client.off(matrix_js_sdk_src_types_event__WEBPACK_IMPORTED_MODULE_1__/* .EventType */ .tw.FullyRead, calculateUnread);
      client.off("Room.read_marker", calculateUnread);
      client.off("Room.timeline", calculateUnread);
    }
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(UnreadNotificationContext.Provider, {
    value: unreadState
  }, children);
});
NotificationManagerProvider.displayName = "NotificationManagerProvider";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotificationManagerProvider);

/***/ }),

/***/ 917102:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ structures_LoggedInView)
});

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(225259);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Keyboard.ts
var Keyboard = __webpack_require__(389310);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/PageTypes.js
var PageTypes = __webpack_require__(513962);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/MediaDeviceHandler.ts
var MediaDeviceHandler = __webpack_require__(710008);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/FontManager.ts
var FontManager = __webpack_require__(169860);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/dispatcher.ts
var dispatcher = __webpack_require__(245539);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/MatrixClientPeg.ts + 3 modules
var MatrixClientPeg = __webpack_require__(933393);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/settings/SettingsStore.ts + 9 modules
var SettingsStore = __webpack_require__(571879);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/contexts/MatrixClientContext.ts
var MatrixClientContext = __webpack_require__(311878);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/accessibility/KeyboardShortcuts.tsx
var KeyboardShortcuts = __webpack_require__(770672);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/PlatformPeg.ts
var PlatformPeg = __webpack_require__(311187);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/room-list/models.ts + 1 modules
var models = __webpack_require__(103619);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/toasts/GenericToast.tsx
var GenericToast = __webpack_require__(261221);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/ToastStore.ts
var ToastStore = __webpack_require__(732638);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/ErrorUtils.tsx
var ErrorUtils = __webpack_require__(137117);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/toasts/ServerLimitToast.tsx
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






const TOAST_KEY = "serverlimit";
const showToast = (limitType, onHideToast, adminContact, syncError) => {
  const errorText = (0,ErrorUtils/* messageForResourceLimitError */.L)(limitType, adminContact, {
    'monthly_active_user': (0,languageHandler/* _td */.I8)("Your homeserver has exceeded its user limit."),
    'hs_blocked': (0,languageHandler/* _td */.I8)("This homeserver has been blocked by it's administrator."),
    '': (0,languageHandler/* _td */.I8)("Your homeserver has exceeded one of its resource limits.")
  });
  const contactText = (0,ErrorUtils/* messageForResourceLimitError */.L)(limitType, adminContact, {
    '': (0,languageHandler/* _td */.I8)("Contact your <a>server admin</a>.")
  });
  ToastStore/* default */.Z.sharedInstance().addOrReplaceToast({
    key: TOAST_KEY,
    title: (0,languageHandler._t)("Warning"),
    props: {
      description: /*#__PURE__*/react.createElement(react.Fragment, null, errorText, " ", contactText),
      acceptLabel: (0,languageHandler._t)("Ok"),
      onAccept: () => {
        hideToast();
        if (onHideToast) onHideToast();
      }
    },
    component: GenericToast/* default */.Z,
    priority: 70
  });
};
const hideToast = () => {
  ToastStore/* default */.Z.sharedInstance().dismissToast(TOAST_KEY);
};
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/actions.ts
var actions = __webpack_require__(473627);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/CallView.tsx + 7 modules
var CallView = __webpack_require__(37667);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/RoomViewStore.tsx
var RoomViewStore = __webpack_require__(144332);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/CallHandler.tsx + 2 modules
var CallHandler = __webpack_require__(613431);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/ActiveWidgetStore.js
var ActiveWidgetStore = __webpack_require__(902296);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/WidgetUtils.ts
var WidgetUtils = __webpack_require__(434596);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/index.js + 1 modules
var src = __webpack_require__(47185);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AppTile.js + 16 modules
var AppTile = __webpack_require__(659210);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/PersistentApp.js

/*
Copyright 2018 New Vector Ltd
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







// import { replaceableComponent } from "../../../utils/replaceableComponent";


// @replaceableComponent("views.elements.PersistentApp")
class PersistentApp extends react.Component {
  constructor(...args) {
    super(...args);
    (0,defineProperty/* default */.Z)(this, "state", {
      roomId: RoomViewStore/* default */.Z.getRoomId(),
      persistentWidgetId: ActiveWidgetStore/* default */.Z.getPersistentWidgetId()
    });
    (0,defineProperty/* default */.Z)(this, "_onRoomViewStoreUpdate", payload => {
      if (RoomViewStore/* default */.Z.getRoomId() === this.state.roomId) return;
      this.setState({
        roomId: RoomViewStore/* default */.Z.getRoomId()
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onActiveWidgetStoreUpdate", () => {
      this.setState({
        persistentWidgetId: ActiveWidgetStore/* default */.Z.getPersistentWidgetId()
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onMyMembership", async (room, membership) => {
      const persistentWidgetInRoomId = ActiveWidgetStore/* default */.Z.getRoomId(this.state.persistentWidgetId);
      if (membership !== "join") {
        // we're not in the room anymore - delete
        if (room.roomId === persistentWidgetInRoomId) {
          ActiveWidgetStore/* default */.Z.destroyPersistentWidget(this.state.persistentWidgetId);
        }
      }
    });
  }
  componentDidMount() {
    this._roomStoreToken = RoomViewStore/* default */.Z.addListener(this._onRoomViewStoreUpdate);
    ActiveWidgetStore/* default */.Z.on('update', this._onActiveWidgetStoreUpdate);
    MatrixClientPeg/* MatrixClientPeg */.p.get().on("Room.myMembership", this._onMyMembership);
  }
  componentWillUnmount() {
    if (this._roomStoreToken) {
      this._roomStoreToken.remove();
    }
    ActiveWidgetStore/* default */.Z.removeListener('update', this._onActiveWidgetStoreUpdate);
    if (MatrixClientPeg/* MatrixClientPeg */.p.get()) {
      MatrixClientPeg/* MatrixClientPeg */.p.get().removeListener("Room.myMembership", this._onMyMembership);
    }
  }
  render() {
    if (this.state.persistentWidgetId) {
      const persistentWidgetInRoomId = ActiveWidgetStore/* default */.Z.getRoomId(this.state.persistentWidgetId);
      const persistentWidgetInRoom = MatrixClientPeg/* MatrixClientPeg */.p.get().getRoom(persistentWidgetInRoomId);

      // Sanity check the room - the widget may have been destroyed between render cycles, and
      // thus no room is associated anymore.
      if (!persistentWidgetInRoom) return null;
      const myMembership = persistentWidgetInRoom.getMyMembership();
      if (this.state.roomId !== persistentWidgetInRoomId && myMembership === "join") {
        // get the widget data
        const appEvent = WidgetUtils/* default */.Z.getRoomWidgets(persistentWidgetInRoom).find(ev => {
          return ev.getStateKey() === ActiveWidgetStore/* default */.Z.getPersistentWidgetId();
        });
        const app = WidgetUtils/* default */.Z.makeAppConfig(appEvent.getStateKey(), appEvent.getContent(), appEvent.getSender(), persistentWidgetInRoomId, appEvent.getId());
        return /*#__PURE__*/react.createElement(AppTile/* default */.Z, {
          key: app.id,
          app: app,
          fullWidth: true,
          room: persistentWidgetInRoom,
          userId: MatrixClientPeg/* MatrixClientPeg */.p.get().credentials.userId,
          creatorUserId: app.creatorUserId,
          widgetPageTitle: WidgetUtils/* default */.Z.getWidgetDataTitle(app),
          waitForIframeLoad: app.waitForIframeLoad,
          miniMode: true,
          showMenubar: false
        });
      }
    }
    return null;
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/webrtc/call.ts
var call = __webpack_require__(160193);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/UIStore.ts
var UIStore = __webpack_require__(563869);
// EXTERNAL MODULE: ./node_modules/lodash-es/clamp.js
var clamp = __webpack_require__(743913);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/utils/AnimationUtils.ts
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



/**
 * This method linearly interpolates between two points (start, end). This is
 * most commonly used to find a point some fraction of the way along a line
 * between two endpoints (e.g. to move an object gradually between those
 * points).
 * @param {number} start the starting point
 * @param {number} end the ending point
 * @param {number} amt the interpolant
 * @returns
 */
function lerp(start, end, amt) {
  amt = (0,clamp/* default */.Z)(amt, 0, 1);
  return (1 - amt) * start + amt * end;
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/MarkedExecution.ts
var MarkedExecution = __webpack_require__(396274);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/PictureInPictureDragger.tsx

/*
Copyright 2021 New Vector Ltd

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





// import { replaceableComponent } from '../../../utils/replaceableComponent';

const PIP_VIEW_WIDTH = 336;
const PIP_VIEW_HEIGHT = 232;
const MOVING_AMT = 0.2;
const SNAPPING_AMT = 0.1;
const PADDING = {
  top: 58,
  bottom: 58,
  left: 76,
  right: 8
};
/**
 * PictureInPictureDragger shows a small version of CallView hovering over the UI in 'picture-in-picture'
 * (PiP mode). It displays the call(s) which is *not* in the room the user is currently viewing.
 */ // @replaceableComponent("views.voip.PictureInPictureDragger")
class PictureInPictureDragger extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "callViewWrapper", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "initX", 0);
    (0,defineProperty/* default */.Z)(this, "initY", 0);
    (0,defineProperty/* default */.Z)(this, "desiredTranslationX", UIStore/* default */.Z.instance.windowWidth - PADDING.right - PIP_VIEW_WIDTH);
    (0,defineProperty/* default */.Z)(this, "desiredTranslationY", UIStore/* default */.Z.instance.windowHeight - PADDING.bottom - PIP_VIEW_HEIGHT);
    (0,defineProperty/* default */.Z)(this, "moving", false);
    (0,defineProperty/* default */.Z)(this, "scheduledUpdate", new MarkedExecution/* MarkedExecution */.x(() => this.animationCallback(), () => requestAnimationFrame(() => this.scheduledUpdate.trigger())));
    (0,defineProperty/* default */.Z)(this, "animationCallback", () => {
      // If the PiP isn't being dragged and there is only a tiny difference in
      // the desiredTranslation and translation, quit the animationCallback
      // loop. If that is the case, it means the PiP has snapped into its
      // position and there is nothing to do. Not doing this would cause an
      // infinite loop
      if (!this.moving && Math.abs(this.state.translationX - this.desiredTranslationX) <= 1 && Math.abs(this.state.translationY - this.desiredTranslationY) <= 1) return;
      const amt = this.moving ? MOVING_AMT : SNAPPING_AMT;
      this.setState({
        translationX: lerp(this.state.translationX, this.desiredTranslationX, amt),
        translationY: lerp(this.state.translationY, this.desiredTranslationY, amt)
      });
      this.scheduledUpdate.mark();
    });
    (0,defineProperty/* default */.Z)(this, "onResize", () => {
      this.snap(false);
    });
    (0,defineProperty/* default */.Z)(this, "snap", (animate = false) => {
      var _this$callViewWrapper, _this$callViewWrapper2;
      const translationX = this.desiredTranslationX;
      const translationY = this.desiredTranslationY;
      // We subtract the PiP size from the window size in order to calculate
      // the position to snap to from the PiP center and not its top-left
      // corner
      const windowWidth = UIStore/* default */.Z.instance.windowWidth - (((_this$callViewWrapper = this.callViewWrapper.current) === null || _this$callViewWrapper === void 0 ? void 0 : _this$callViewWrapper.clientWidth) || PIP_VIEW_WIDTH);
      const windowHeight = UIStore/* default */.Z.instance.windowHeight - (((_this$callViewWrapper2 = this.callViewWrapper.current) === null || _this$callViewWrapper2 === void 0 ? void 0 : _this$callViewWrapper2.clientHeight) || PIP_VIEW_HEIGHT);
      if (translationX >= windowWidth / 2 && translationY >= windowHeight / 2) {
        this.desiredTranslationX = windowWidth - PADDING.right;
        this.desiredTranslationY = windowHeight - PADDING.bottom;
      } else if (translationX >= windowWidth / 2 && translationY <= windowHeight / 2) {
        this.desiredTranslationX = windowWidth - PADDING.right;
        this.desiredTranslationY = PADDING.top;
      } else if (translationX <= windowWidth / 2 && translationY >= windowHeight / 2) {
        this.desiredTranslationX = PADDING.left;
        this.desiredTranslationY = windowHeight - PADDING.bottom;
      } else {
        this.desiredTranslationX = PADDING.left;
        this.desiredTranslationY = PADDING.top;
      }

      // We start animating here because we want the PiP to move when we're
      // resizing the window
      this.scheduledUpdate.mark();
      if (animate) {
        // We start animating here because we want the PiP to move when we're
        // resizing the window
        this.scheduledUpdate.mark();
      } else {
        this.setState({
          translationX: this.desiredTranslationX,
          translationY: this.desiredTranslationY
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onStartMoving", event => {
      event.preventDefault();
      event.stopPropagation();
      this.moving = true;
      this.initX = event.pageX - this.desiredTranslationX;
      this.initY = event.pageY - this.desiredTranslationY;
      this.scheduledUpdate.mark();
    });
    (0,defineProperty/* default */.Z)(this, "onMoving", event => {
      if (!this.moving) return;
      event.preventDefault();
      event.stopPropagation();
      this.setTranslation(event.pageX - this.initX, event.pageY - this.initY);
    });
    (0,defineProperty/* default */.Z)(this, "onEndMoving", () => {
      this.moving = false;
      this.snap(true);
    });
    this.state = {
      translationX: UIStore/* default */.Z.instance.windowWidth - PADDING.right - PIP_VIEW_WIDTH,
      translationY: UIStore/* default */.Z.instance.windowHeight - PADDING.bottom - PIP_VIEW_HEIGHT
    };
  }
  componentDidMount() {
    document.addEventListener("mousemove", this.onMoving);
    document.addEventListener("mouseup", this.onEndMoving);
    window.addEventListener("resize", this.onResize);
  }
  componentWillUnmount() {
    document.removeEventListener("mousemove", this.onMoving);
    document.removeEventListener("mouseup", this.onEndMoving);
    window.removeEventListener("resize", this.onResize);
  }
  setTranslation(inTranslationX, inTranslationY) {
    var _this$callViewWrapper3, _this$callViewWrapper4;
    const width = ((_this$callViewWrapper3 = this.callViewWrapper.current) === null || _this$callViewWrapper3 === void 0 ? void 0 : _this$callViewWrapper3.clientWidth) || PIP_VIEW_WIDTH;
    const height = ((_this$callViewWrapper4 = this.callViewWrapper.current) === null || _this$callViewWrapper4 === void 0 ? void 0 : _this$callViewWrapper4.clientHeight) || PIP_VIEW_HEIGHT;

    // Avoid overflow on the x axis
    if (inTranslationX + width >= UIStore/* default */.Z.instance.windowWidth) {
      this.desiredTranslationX = UIStore/* default */.Z.instance.windowWidth - width;
    } else if (inTranslationX <= 0) {
      this.desiredTranslationX = 0;
    } else {
      this.desiredTranslationX = inTranslationX;
    }

    // Avoid overflow on the y axis
    if (inTranslationY + height >= UIStore/* default */.Z.instance.windowHeight) {
      this.desiredTranslationY = UIStore/* default */.Z.instance.windowHeight - height;
    } else if (inTranslationY <= 0) {
      this.desiredTranslationY = 0;
    } else {
      this.desiredTranslationY = inTranslationY;
    }
  }
  render() {
    const translatePixelsX = this.state.translationX + "px";
    const translatePixelsY = this.state.translationY + "px";
    const style = {
      transform: `translateX(${translatePixelsX})
                        translateY(${translatePixelsY})`
    };
    return /*#__PURE__*/react.createElement("div", {
      className: this.props.className,
      style: this.props.draggable ? style : undefined,
      ref: this.callViewWrapper
    }, /*#__PURE__*/react.createElement(react.Fragment, null, this.props.children({
      onStartMoving: this.onStartMoving,
      onResize: this.onResize
    })));
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/CallPreview.tsx

/*
Copyright 2017, 2018 New Vector Ltd
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










// import { replaceableComponent } from "../../../utils/replaceableComponent";


const SHOW_CALL_IN_STATES = [call/* CallState */.OX.Connected, call/* CallState */.OX.InviteSent, call/* CallState */.OX.Connecting, call/* CallState */.OX.CreateAnswer, call/* CallState */.OX.CreateOffer, call/* CallState */.OX.WaitLocalMedia];
// Splits a list of calls into one 'primary' one and a list
// (which should be a single element) of other calls.
// The primary will be the one not on hold, or an arbitrary one
// if they're all on hold)
function getPrimarySecondaryCalls(calls) {
  let primary = null;
  let secondaries = [];
  for (const call of calls) {
    if (!SHOW_CALL_IN_STATES.includes(call.state)) continue;
    if (!call.isRemoteOnHold() && primary === null) {
      primary = call;
    } else {
      secondaries.push(call);
    }
  }
  if (primary === null && secondaries.length > 0) {
    primary = secondaries[0];
    secondaries = secondaries.slice(1);
  }
  if (secondaries.length > 1) {
    // We should never be in more than two calls so this shouldn't happen
    console.log("Found more than 1 secondary call! Other calls will not be shown.");
  }
  return [primary, secondaries];
}

/**
 * CallPreview shows a small version of CallView hovering over the UI in 'picture-in-picture'
 * (PiP mode). It displays the call(s) which is *not* in the room the user is currently viewing.
 */
// @replaceableComponent("views.voip.CallPreview")
class CallPreview extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "roomStoreToken", void 0);
    (0,defineProperty/* default */.Z)(this, "dispatcherRef", void 0);
    (0,defineProperty/* default */.Z)(this, "settingsWatcherRef", void 0);
    (0,defineProperty/* default */.Z)(this, "onRoomViewStoreUpdate", () => {
      if (RoomViewStore/* default */.Z.getRoomId() === this.state.roomId) return;
      const roomId = RoomViewStore/* default */.Z.getRoomId();
      const [primaryCall, secondaryCalls] = getPrimarySecondaryCalls(CallHandler/* default */.ZP.sharedInstance().getAllActiveCallsNotInRoom(roomId));
      this.setState({
        roomId,
        primaryCall: primaryCall,
        secondaryCall: secondaryCalls[0]
      });
    });
    (0,defineProperty/* default */.Z)(this, "onAction", payload => {
      switch (payload.action) {
        case 'call_state':
          {
            // listen for call state changes to prod the render method, which
            // may hide the global CallView if the call it is tracking is dead

            this.updateCalls();
            break;
          }
      }
    });
    (0,defineProperty/* default */.Z)(this, "updateCalls", () => {
      const [primaryCall, secondaryCalls] = getPrimarySecondaryCalls(CallHandler/* default */.ZP.sharedInstance().getAllActiveCallsNotInRoom(this.state.roomId));
      this.setState({
        primaryCall: primaryCall,
        secondaryCall: secondaryCalls[0]
      });
    });
    (0,defineProperty/* default */.Z)(this, "onCallRemoteHold", () => {
      const [primaryCall, secondaryCalls] = getPrimarySecondaryCalls(CallHandler/* default */.ZP.sharedInstance().getAllActiveCallsNotInRoom(this.state.roomId));
      this.setState({
        primaryCall: primaryCall,
        secondaryCall: secondaryCalls[0]
      });
    });
    const _roomId = RoomViewStore/* default */.Z.getRoomId();
    const [_primaryCall, _secondaryCalls] = getPrimarySecondaryCalls(CallHandler/* default */.ZP.sharedInstance().getAllActiveCallsNotInRoom(_roomId));
    this.state = {
      roomId: _roomId,
      primaryCall: _primaryCall,
      secondaryCall: _secondaryCalls[0]
    };
  }
  componentDidMount() {
    CallHandler/* default */.ZP.sharedInstance().addListener(CallHandler/* CallHandlerEvent */.Tj.CallChangeRoom, this.updateCalls);
    this.roomStoreToken = RoomViewStore/* default */.Z.addListener(this.onRoomViewStoreUpdate);
    this.dispatcherRef = dispatcher/* default */.ZP.register(this.onAction);
    MatrixClientPeg/* MatrixClientPeg */.p.get().on(call/* CallEvent */.nP.RemoteHoldUnhold, this.onCallRemoteHold);
  }
  componentWillUnmount() {
    CallHandler/* default */.ZP.sharedInstance().removeListener(CallHandler/* CallHandlerEvent */.Tj.CallChangeRoom, this.updateCalls);
    MatrixClientPeg/* MatrixClientPeg */.p.get().removeListener(call/* CallEvent */.nP.RemoteHoldUnhold, this.onCallRemoteHold);
    if (this.roomStoreToken) {
      this.roomStoreToken.remove();
    }
    dispatcher/* default */.ZP.unregister(this.dispatcherRef);
    SettingsStore/* default */.C.unwatchSetting(this.settingsWatcherRef);
  }
  render() {
    const pipMode = true;
    if (this.state.primaryCall) {
      return /*#__PURE__*/react.createElement(PictureInPictureDragger, {
        className: "mx_CallPreview",
        draggable: pipMode
      }, ({
        onStartMoving,
        onResize
      }) => /*#__PURE__*/react.createElement(CallView/* default */.Z, {
        onMouseDownOnHeader: onStartMoving,
        call: this.state.primaryCall,
        secondaryCall: this.state.secondaryCall,
        pipMode: pipMode,
        onResize: onResize
      }));
    }
    return /*#__PURE__*/react.createElement(PersistentApp, null);
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/CallContainer.tsx
/*
Copyright 2020 The Matrix.org Foundation C.I.C.
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



// import { replaceableComponent } from "../../../utils/replaceableComponent";

// @replaceableComponent("views.voip.CallContainer")
class CallContainer extends react.PureComponent {
  render() {
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_CallContainer"
    }, /*#__PURE__*/react.createElement(CallPreview, null));
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/room-list/RoomListStore.ts + 12 modules
var RoomListStore = __webpack_require__(109660);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/NonUrgentToastStore.ts
var NonUrgentToastStore = __webpack_require__(533138);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/AsyncStore.ts
var AsyncStore = __webpack_require__(10879);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/NonUrgentToastContainer.tsx

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




// import { replaceableComponent } from "../../utils/replaceableComponent";

// @replaceableComponent("structures.NonUrgentToastContainer")
class NonUrgentToastContainer extends react.PureComponent {
  constructor(props, context) {
    super(props, context);
    (0,defineProperty/* default */.Z)(this, "onUpdateToasts", () => {
      this.setState({
        toasts: NonUrgentToastStore/* default */.Z.instance.components
      });
    });
    this.state = {
      toasts: NonUrgentToastStore/* default */.Z.instance.components
    };
    NonUrgentToastStore/* default */.Z.instance.on(AsyncStore/* UPDATE_EVENT */.aY, this.onUpdateToasts);
  }
  componentWillUnmount() {
    NonUrgentToastStore/* default */.Z.instance.off(AsyncStore/* UPDATE_EVENT */.aY, this.onUpdateToasts);
  }
  render() {
    const toasts = this.state.toasts.map((t, i) => {
      return /*#__PURE__*/react.createElement("div", {
        className: "mx_NonUrgentToastContainer_toast",
        key: `toast-${i}`
      }, /*#__PURE__*/react.createElement(t, {}));
    });
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_NonUrgentToastContainer",
      role: "alert"
    }, toasts);
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Modal.tsx + 1 modules
var Modal = __webpack_require__(241648);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AccessibleButton.tsx
var AccessibleButton = __webpack_require__(805035);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/PersistedElement.js
var PersistedElement = __webpack_require__(685312);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/QuestionDialog.js
var QuestionDialog = __webpack_require__(433773);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/SdkConfig.ts
var SdkConfig = __webpack_require__(374312);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(294184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/HostSignupStore.ts
var HostSignupStore = __webpack_require__(77959);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/OwnProfileStore.ts
var OwnProfileStore = __webpack_require__(580089);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/HostSignupDialogTypes.ts
/*
Copyright 2021 The Matrix.org Foundation C.I.C.

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

let PostmessageAction = /*#__PURE__*/function (PostmessageAction) {
  PostmessageAction["CloseDialog"] = "close_dialog";
  PostmessageAction["HostSignupAccountDetails"] = "host_signup_account_details";
  PostmessageAction["HostSignupAccountDetailsRequest"] = "host_signup_account_details_request";
  PostmessageAction["Minimize"] = "host_signup_minimize";
  PostmessageAction["Maximize"] = "host_signup_maximize";
  PostmessageAction["SetupComplete"] = "setup_complete";
  return PostmessageAction;
}({});
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/HostSignupDialog.tsx

/*
Copyright 2021 The Matrix.org Foundation C.I.C.

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

const HOST_SIGNUP_KEY = "host_signup";
// @replaceableComponent("views.dialogs.HostSignupDialog")
class HostSignupDialog extends react.PureComponent {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "iframeRef", /*#__PURE__*/react.createRef());
    (0,defineProperty/* default */.Z)(this, "config", void 0);
    (0,defineProperty/* default */.Z)(this, "messageHandler", async message => {
      if (!this.config.url.startsWith(message.origin)) {
        return;
      }
      switch (message.data.action) {
        case PostmessageAction.HostSignupAccountDetailsRequest:
          this.onAccountDetailsRequest();
          break;
        case PostmessageAction.Maximize:
          this.setState({
            minimized: false
          });
          break;
        case PostmessageAction.Minimize:
          this.setState({
            minimized: true
          });
          break;
        case PostmessageAction.SetupComplete:
          this.setState({
            completed: true
          });
          break;
        case PostmessageAction.CloseDialog:
          return this.closeDialog();
      }
    });
    (0,defineProperty/* default */.Z)(this, "maximizeDialog", () => {
      this.setState({
        minimized: false
      });
      // Send this action to the iframe so it can act accordingly
      this.sendMessage({
        action: PostmessageAction.Maximize
      });
    });
    (0,defineProperty/* default */.Z)(this, "minimizeDialog", () => {
      this.setState({
        minimized: true
      });
      // Send this action to the iframe so it can act accordingly
      this.sendMessage({
        action: PostmessageAction.Minimize
      });
    });
    (0,defineProperty/* default */.Z)(this, "closeDialog", async () => {
      window.removeEventListener("message", this.messageHandler);
      // Ensure we destroy the host signup persisted element
      PersistedElement/* default */.Z.destroyElement("host_signup");
      // Finally clear the flag in
      return HostSignupStore/* HostSignupStore */.O.instance.setHostSignupActive(false);
    });
    (0,defineProperty/* default */.Z)(this, "onCloseClick", async () => {
      if (this.state.completed) {
        // We're done, close
        return this.closeDialog();
      } else {
        Modal/* default */.Z.createDialog(QuestionDialog/* default */.Z, {
          title: (0,languageHandler._t)("Confirm abort of host creation"),
          description: (0,languageHandler._t)("Are you sure you wish to abort creation of the host? The process cannot be continued."),
          button: (0,languageHandler._t)("Abort"),
          onFinished: result => {
            if (result) {
              return this.closeDialog();
            }
          }
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "sendMessage", message => {
      this.iframeRef.current.contentWindow.postMessage(message, this.config.url);
    });
    (0,defineProperty/* default */.Z)(this, "onAccountDetailsDialogFinished", async result => {
      if (result) {
        return this.sendAccountDetails();
      }
      return this.closeDialog();
    });
    (0,defineProperty/* default */.Z)(this, "onAccountDetailsRequest", () => {
      const textComponent = /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Continuing temporarily allows the %(hostSignupBrand)s setup process to access your " + "account to fetch verified email addresses. This data is not stored.", {
        hostSignupBrand: this.config.brand
      })), /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Learn more in our <privacyPolicyLink />, <termsOfServiceLink /> and <cookiePolicyLink />.", {}, {
        cookiePolicyLink: () => /*#__PURE__*/react.createElement("a", {
          href: this.config.cookiePolicyUrl,
          target: "_blank",
          rel: "noreferrer noopener"
        }, (0,languageHandler._t)("Cookie Policy")),
        privacyPolicyLink: () => /*#__PURE__*/react.createElement("a", {
          href: this.config.privacyPolicyUrl,
          target: "_blank",
          rel: "noreferrer noopener"
        }, (0,languageHandler._t)("Privacy Policy")),
        termsOfServiceLink: () => /*#__PURE__*/react.createElement("a", {
          href: this.config.termsOfServiceUrl,
          target: "_blank",
          rel: "noreferrer noopener"
        }, (0,languageHandler._t)("Terms of Service"))
      })));
      Modal/* default */.Z.createDialog(QuestionDialog/* default */.Z, {
        title: (0,languageHandler._t)("You should know"),
        description: textComponent,
        button: (0,languageHandler._t)("Continue"),
        onFinished: this.onAccountDetailsDialogFinished
      });
    });
    this.state = {
      completed: false,
      error: null,
      minimized: false
    };
    this.config = SdkConfig/* default */.Z.get().hostSignup;
  }
  async sendAccountDetails() {
    const openIdToken = await MatrixClientPeg/* MatrixClientPeg */.p.get().getOpenIdToken();
    if (!openIdToken || !openIdToken.access_token) {
      console.warn("Failed to connect to homeserver for OpenID token.");
      this.setState({
        completed: true,
        error: (0,languageHandler._t)("Failed to connect to your homeserver. Please close this dialog and try again.")
      });
      return;
    }
    this.sendMessage({
      action: PostmessageAction.HostSignupAccountDetails,
      account: {
        accessToken: await MatrixClientPeg/* MatrixClientPeg */.p.get().getAccessToken(),
        name: OwnProfileStore.OwnProfileStore.instance.displayName,
        openIdToken: openIdToken.access_token,
        serverName: await MatrixClientPeg/* MatrixClientPeg */.p.get().getDomain(),
        userLocalpart: await MatrixClientPeg/* MatrixClientPeg */.p.get().getUserIdLocalpart(),
        termsAccepted: true
      }
    });
  }
  componentDidMount() {
    window.addEventListener("message", this.messageHandler);
  }
  componentWillUnmount() {
    if (HostSignupStore/* HostSignupStore */.O.instance.isHostSignupActive) {
      // Run the close dialog actions if we're still active, otherwise good to go
      return this.closeDialog();
    }
  }
  render() {
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_HostSignup_persisted"
    }, /*#__PURE__*/react.createElement(PersistedElement/* default */.Z, {
      key: HOST_SIGNUP_KEY,
      persistKey: HOST_SIGNUP_KEY
    }, /*#__PURE__*/react.createElement("div", {
      className: classnames_default()({
        "mx_Dialog_wrapper": !this.state.minimized
      })
    }, /*#__PURE__*/react.createElement("div", {
      className: classnames_default()("mx_Dialog", {
        "mx_HostSignupDialog_minimized": this.state.minimized,
        "mx_HostSignupDialog": !this.state.minimized
      })
    }, this.state.minimized && /*#__PURE__*/react.createElement("div", {
      className: "mx_Dialog_header mx_Dialog_headerWithButton"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_Dialog_title"
    }, (0,languageHandler._t)("%(hostSignupBrand)s Setup", {
      hostSignupBrand: this.config.brand
    })), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: "mx_HostSignup_maximize_button",
      onClick: this.maximizeDialog,
      "aria-label": (0,languageHandler._t)("Maximize dialog"),
      title: (0,languageHandler._t)("Maximize dialog")
    })), !this.state.minimized && /*#__PURE__*/react.createElement("div", {
      className: "mx_Dialog_header mx_Dialog_headerWithCancel"
    }, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      onClick: this.minimizeDialog,
      className: "mx_HostSignup_minimize_button",
      "aria-label": (0,languageHandler._t)("Minimize dialog"),
      title: (0,languageHandler._t)("Minimize dialog")
    }), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      onClick: this.onCloseClick,
      className: "mx_Dialog_cancelButton",
      "aria-label": (0,languageHandler._t)("Close dialog"),
      title: (0,languageHandler._t)("Close dialog")
    })), this.state.error && /*#__PURE__*/react.createElement("div", null, this.state.error), !this.state.error && /*#__PURE__*/react.createElement("iframe", {
      src: this.config.url,
      ref: this.iframeRef,
      sandbox: "allow-forms allow-scripts allow-same-origin allow-popups"
    })))));
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/useEventEmitter.ts
var useEventEmitter = __webpack_require__(457771);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/host_signup/HostSignupContainer.tsx
/*
Copyright 2021 The Matrix.org Foundation C.I.C.

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






const HostSignupContainer = () => {
  const [isActive, setIsActive] = (0,react.useState)(HostSignupStore/* HostSignupStore */.O.instance.isHostSignupActive);
  (0,useEventEmitter/* useEventEmitter */.x)(HostSignupStore/* HostSignupStore */.O.instance, AsyncStore/* UPDATE_EVENT */.aY, () => {
    setIsActive(HostSignupStore/* HostSignupStore */.O.instance.isHostSignupActive);
  });
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_HostSignupContainer"
  }, isActive && /*#__PURE__*/react.createElement(HostSignupDialog, null));
};
/* harmony default export */ const host_signup_HostSignupContainer = (HostSignupContainer);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/KeyBindingsManager.ts + 1 modules
var KeyBindingsManager = __webpack_require__(481493);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/webrtc/callFeed.ts
var callFeed = __webpack_require__(140734);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/logger.ts
var logger = __webpack_require__(101461);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/AudioFeed.tsx

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





class AudioFeed extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "element", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "onAudioOutputChanged", audioOutput => {
      const element = this.element.current;
      if (audioOutput) {
        try {
          // This seems quite unreliable in Chrome, although I haven't yet managed to make a jsfiddle where
          // it fails.
          // It seems reliable if you set the sink ID after setting the srcObject and then set the sink ID
          // back to the default after the call is over - Dave
          element.setSinkId(audioOutput);
        } catch (e) {
          console.error("Couldn't set requested audio output device: using default", e);
          logger/* logger */.k.warn("Couldn't set requested audio output device: using default", e);
        }
      }
    });
    (0,defineProperty/* default */.Z)(this, "onNewStream", () => {
      this.setState({
        audioMuted: this.props.feed.isAudioMuted()
      });
      this.playMedia();
    });
    this.state = {
      audioMuted: this.props.feed.isAudioMuted()
    };
  }
  componentDidMount() {
    MediaDeviceHandler/* default */.ZP.instance.addListener(MediaDeviceHandler/* MediaDeviceHandlerEvent */.Ug.AudioOutputChanged, this.onAudioOutputChanged);
    this.props.feed.addListener(callFeed/* CallFeedEvent */.E.NewStream, this.onNewStream);
    this.playMedia();
  }
  componentWillUnmount() {
    MediaDeviceHandler/* default */.ZP.instance.removeListener(MediaDeviceHandler/* MediaDeviceHandlerEvent */.Ug.AudioOutputChanged, this.onAudioOutputChanged);
    this.props.feed.removeListener(callFeed/* CallFeedEvent */.E.NewStream, this.onNewStream);
    this.stopMedia();
  }
  async playMedia() {
    const element = this.element.current;
    if (!element) return;
    this.onAudioOutputChanged(MediaDeviceHandler/* default */.ZP.getAudioOutput());
    element.muted = false;
    element.srcObject = this.props.feed.stream;
    element.autoplay = true;
    try {
      // A note on calling methods on media elements:
      // We used to have queues per media element to serialise all calls on those elements.
      // The reason given for this was that load() and play() were racing. However, we now
      // never call load() explicitly so this seems unnecessary. However, serialising every
      // operation was causing bugs where video would not resume because some play command
      // had got stuck and all media operations were queued up behind it. If necessary, we
      // should serialise the ones that need to be serialised but then be able to interrupt
      // them with another load() which will cancel the pending one, but since we don't call
      // load() explicitly, it shouldn't be a problem. - Dave
      await element.load();
    } catch (e) {
      logger/* logger */.k.info("Failed to play media element with feed", this.props.feed, e);
    }
  }
  stopMedia() {
    const element = this.element.current;
    if (!element) return;
    element.pause();
    element.src = null;

    // As per comment in componentDidMount, setting the sink ID back to the
    // default once the call is over makes setSinkId work reliably. - Dave
    // Since we are not using the same element anymore, the above doesn't
    // seem to be necessary - Šimon
  }

  render() {
    // Do not render the audio element if there is no audio track
    if (this.state.audioMuted) return null;
    return /*#__PURE__*/react.createElement("audio", {
      ref: this.element
    });
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/AudioFeedArrayForCall.tsx

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




class AudioFeedArrayForCall extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "onFeedsChanged", () => {
      this.setState({
        feeds: this.props.call.getRemoteFeeds()
      });
    });
    this.state = {
      feeds: this.props.call.getRemoteFeeds()
    };
  }
  componentDidMount() {
    this.props.call.addListener(call/* CallEvent */.nP.FeedsChanged, this.onFeedsChanged);
  }
  componentWillUnmount() {
    this.props.call.removeListener(call/* CallEvent */.nP.FeedsChanged, this.onFeedsChanged);
  }
  render() {
    return this.state.feeds.map((feed, i) => {
      return /*#__PURE__*/react.createElement(AudioFeed, {
        feed: feed,
        key: i
      });
    });
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/ToastContainer.tsx

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




// import { replaceableComponent } from "../../utils/replaceableComponent";

// @replaceableComponent("structures.ToastContainer")
class ToastContainer extends react.Component {
  constructor(props, context) {
    super(props, context);
    (0,defineProperty/* default */.Z)(this, "onToastStoreUpdate", () => {
      this.setState({
        toasts: ToastStore/* default */.Z.sharedInstance().getToasts(),
        countSeen: ToastStore/* default */.Z.sharedInstance().getCountSeen()
      });
    });
    this.state = {
      toasts: ToastStore/* default */.Z.sharedInstance().getToasts(),
      countSeen: ToastStore/* default */.Z.sharedInstance().getCountSeen()
    };

    // Start listening here rather than in componentDidMount because
    // toasts may dismiss themselves in their didMount if they find
    // they're already irrelevant by the time they're mounted, and
    // our own componentDidMount is too late.
    ToastStore/* default */.Z.sharedInstance().on('update', this.onToastStoreUpdate);
  }
  componentWillUnmount() {
    ToastStore/* default */.Z.sharedInstance().removeListener('update', this.onToastStoreUpdate);
  }
  render() {
    const totalCount = this.state.toasts.length;
    const isStacked = totalCount > 1;
    let toast;
    let containerClasses;
    if (totalCount !== 0) {
      const topToast = this.state.toasts[0];
      const {
        title,
        icon,
        key,
        component,
        className,
        bodyClassName,
        props
      } = topToast;
      const bodyClasses = classnames_default()("mx_Toast_body", bodyClassName);
      const toastClasses = classnames_default()("mx_Toast_toast", className, {
        "mx_Toast_hasIcon": icon,
        [`mx_Toast_icon_${icon}`]: icon
      });
      const toastProps = Object.assign({}, props, {
        key,
        toastKey: key
      });
      const content = /*#__PURE__*/react.createElement(component, toastProps);
      let countIndicator;
      if (title && isStacked || this.state.countSeen > 0) {
        countIndicator = ` (${this.state.countSeen + 1}/${this.state.countSeen + totalCount})`;
      }
      let titleElement;
      if (title) {
        titleElement = /*#__PURE__*/react.createElement("div", {
          className: "mx_Toast_title"
        }, /*#__PURE__*/react.createElement("h2", null, title), /*#__PURE__*/react.createElement("span", null, countIndicator));
      }
      toast = /*#__PURE__*/react.createElement("div", {
        className: toastClasses
      }, titleElement, /*#__PURE__*/react.createElement("div", {
        className: bodyClasses
      }, content));
      containerClasses = classnames_default()("mx_ToastContainer", {
        "mx_ToastContainer_stacked": isStacked
      });
    }
    return toast ? /*#__PURE__*/react.createElement("div", {
      className: containerClasses,
      role: "alert"
    }, toast) : null;
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/AutoHideScrollbar.tsx
var AutoHideScrollbar = __webpack_require__(651070);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/SimpleRoomHeader.tsx
/*
Copyright 2016-2021 The Matrix.org Foundation C.I.C.

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


/*
 * A stripped-down room header used for things like the user settings
 * and room directory.
 */
class SimpleRoomHeader extends react.PureComponent {
  render() {
    let icon;
    if (this.props.icon) {
      icon = /*#__PURE__*/react.createElement("img", {
        className: "mx_RoomHeader_icon",
        src: this.props.icon,
        width: "25",
        height: "25"
      });
    }
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomHeader mx_RoomHeader_wrapper"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomHeader_simpleHeader"
    }, icon, this.props.title));
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/groups/GroupTile.js
var GroupTile = __webpack_require__(262361);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/MyGroups.js

/*
Copyright 2017 Vector Creations Ltd
Copyright 2019 Michael Telatynski <7t3chguy@gmail.com>
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









// import { replaceableComponent } from "../../utils/replaceableComponent";



// @replaceableComponent("structures.MyGroups")
class MyGroups extends react.Component {
  constructor(...args) {
    super(...args);
    (0,defineProperty/* default */.Z)(this, "state", {
      groups: null,
      error: null
    });
    (0,defineProperty/* default */.Z)(this, "_onCreateGroupClick", () => {
      dispatcher/* default */.ZP.dispatch({
        action: 'view_create_group'
      });
    });
  }
  componentDidMount() {
    this._fetch();
  }
  _fetch() {
    this.context.getJoinedGroups().then(result => {
      this.setState({
        groups: result.groups,
        error: null
      });
    }, err => {
      if (err.errcode === 'M_GUEST_ACCESS_FORBIDDEN') {
        // Indicate that the guest isn't in any groups (which should be true)
        this.setState({
          groups: [],
          error: null
        });
        return;
      }
      this.setState({
        groups: null,
        error: err
      });
    });
  }
  render() {
    const brand = SdkConfig/* default */.Z.get().brand;
    const Loader = src.getComponent("elements.Spinner");
    let content;
    let contentHeader;
    if (this.state.groups) {
      const groupNodes = [];
      this.state.groups.forEach(g => {
        groupNodes.push( /*#__PURE__*/react.createElement(GroupTile/* default */.Z, {
          key: g,
          groupId: g
        }));
      });
      contentHeader = groupNodes.length > 0 ? /*#__PURE__*/react.createElement("h3", null, (0,languageHandler._t)('Your Communities')) : /*#__PURE__*/react.createElement("div", null);
      content = groupNodes.length > 0 ? /*#__PURE__*/react.createElement(AutoHideScrollbar/* default */.Z, {
        className: "mx_MyGroups_scrollable"
      }, /*#__PURE__*/react.createElement("div", {
        className: "mx_MyGroups_microcopy"
      }, /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Did you know: you can use communities to filter your %(brand)s experience!", {
        brand
      })), /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("You can click on an avatar in the " + "filter panel at any time to see only the rooms and people associated " + "with that community."))), /*#__PURE__*/react.createElement("div", {
        className: "mx_MyGroups_joinedGroups"
      }, groupNodes)) : /*#__PURE__*/react.createElement("div", {
        className: "mx_MyGroups_placeholder"
      }, (0,languageHandler._t)("You're not currently a member of any communities."));
    } else if (this.state.error) {
      content = /*#__PURE__*/react.createElement("div", {
        className: "mx_MyGroups_error"
      }, (0,languageHandler._t)('Error whilst fetching joined communities'));
    } else {
      content = /*#__PURE__*/react.createElement(Loader, null);
    }
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_MyGroups"
    }, /*#__PURE__*/react.createElement(SimpleRoomHeader, {
      title: (0,languageHandler._t)("Communities"),
      icon: __webpack_require__(291782)
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_MyGroups_header"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_MyGroups_headerCard"
    }, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: "mx_MyGroups_headerCard_button",
      onClick: this._onCreateGroupClick
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_MyGroups_headerCard_content"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_MyGroups_headerCard_header"
    }, (0,languageHandler._t)('Create a new community')), (0,languageHandler._t)('Create a community to group together users and rooms! ' + 'Build a custom homepage to mark out your squad in the Matrix universe.')))), /*#__PURE__*/react.createElement("div", {
      className: "mx_MyGroups_content"
    }, contentHeader, content));
  }
}
(0,defineProperty/* default */.Z)(MyGroups, "contextType", MatrixClientContext/* default */.Z);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/models/event.ts
var models_event = __webpack_require__(489777);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/models/room-member.ts
var room_member = __webpack_require__(69694);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ErrorDialog.tsx
var ErrorDialog = __webpack_require__(705636);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/MainSplit.tsx
var MainSplit = __webpack_require__(409957);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/RightPanel.tsx + 56 modules
var RightPanel = __webpack_require__(285243);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Spinner.tsx
var Spinner = __webpack_require__(641542);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/avatars/MemberAvatar.tsx
var MemberAvatar = __webpack_require__(6156);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/strings.ts
var strings = __webpack_require__(653848);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/Recommendations.tsx + 2 modules
var Recommendations = __webpack_require__(974184);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/UserView.tsx
/*
Copyright 2019 New Vector Ltd
Copyright 2019 Michael Telatynski <7t3chguy@gmail.com>

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





// import { replaceableComponent } from "../../utils/replaceableComponent";











const ChatAfterDialog = ({
  member,
  userId
}) => {
  var _member$events, _member$events$member;
  const okClick = () => {
    dispatcher/* default */.ZP.dispatch({
      action: "view_user_info",
      userId: userId,
      subAction: "chat"
    });
  };
  const inviter = member === null || member === void 0 ? void 0 : (_member$events = member.events) === null || _member$events === void 0 ? void 0 : (_member$events$member = _member$events.member) === null || _member$events$member === void 0 ? void 0 : _member$events$member.getContent();
  let realId = userId.split(":")[1];
  // if (realId.startsWith("@sdn_")) {
  //     realId = realId.substring(1);
  // }

  return /*#__PURE__*/react.createElement("div", {
    className: "mx_Dialog mx_UserView_ChatAfter"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_UserView_ChatAfter_Welcome"
  }, (0,languageHandler._t)("Do you want to join in this conversation")), inviter.avatar ? /*#__PURE__*/react.createElement("img", {
    src: inviter.avatar,
    width: 20,
    height: 20,
    alt: ""
  }) : /*#__PURE__*/react.createElement(MemberAvatar/* default */.Z, {
    member: member,
    fallbackUserId: userId,
    size: 20
  }), /*#__PURE__*/react.createElement("div", {
    className: "mx_UserView_ChatAfter_Name"
  }, (inviter === null || inviter === void 0 ? void 0 : inviter.display_name) || (0,strings/* getDisplayUserId */.RL)(realId)), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
    className: "mx_UserView_ChatAfter_btn",
    kind: "primary",
    onClick: okClick
  }, (0,languageHandler._t)("Join")));
};

// @replaceableComponent("structures.UserView")
class UserView extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    if (this.props.userId) {
      this.loadProfileInfo();
    }
  }
  componentDidUpdate(prevProps) {
    // XXX: We shouldn't need to null check the userId here, but we declare
    // it as optional and MatrixChat sometimes fires in a way which results
    // in an NPE when we try to update the profile info.
    if (prevProps.userId !== this.props.userId && this.props.userId) {
      this.loadProfileInfo();
    }
  }
  async loadProfileInfo() {
    const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
    this.setState({
      loading: true
    });
    let profileInfo;
    try {
      profileInfo = await cli.getSdnProfileInfo(this.props.userId);
    } catch (err) {
      Modal/* default */.Z.createTrackedDialog((0,languageHandler._t)("Could not load user profile"), "", ErrorDialog/* default */.Z, {
        title: (0,languageHandler._t)("Could not load user profile"),
        description: err && err.message ? err.message : (0,languageHandler._t)("Operation failed")
      });
      this.setState({
        loading: false
      });
      return;
    }
    const fakeEvent = new models_event/* MatrixEvent */.dC({
      type: "m.room.member",
      content: profileInfo
    });
    const member = new room_member/* RoomMember */.T(null, this.props.userId);
    member.setMembershipEvent(fakeEvent);
    this.setState({
      member,
      loading: false
    });
  }
  render() {
    var _this$state$member;
    if (this.state.loading) {
      return /*#__PURE__*/react.createElement(Spinner/* default */.Z, null);
    } else if ((_this$state$member = this.state.member) !== null && _this$state$member !== void 0 && _this$state$member.user) {
      const panel = /*#__PURE__*/react.createElement(RightPanel/* default */.Z, {
        user: this.state.member.user,
        resizeNotifier: this.props.resizeNotifier
      });
      return /*#__PURE__*/react.createElement(MainSplit/* default */.Z, {
        panel: panel,
        resizeNotifier: this.props.resizeNotifier
      }, /*#__PURE__*/react.createElement(Recommendations["default"], {
        resizeNotifier: this.props.resizeNotifier
      }));
    } else if (this.props.roomId === "chat_after") {
      return /*#__PURE__*/react.createElement(ChatAfterDialog, {
        member: this.state.member,
        userId: this.props.userId
      });
    } else {
      return /*#__PURE__*/react.createElement("div", null);
    }
  }
}
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(45697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/HostingLink.js
var HostingLink = __webpack_require__(190941);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/HtmlUtils.tsx
var HtmlUtils = __webpack_require__(714813);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/right_panel/HeaderButton.tsx
var HeaderButton = __webpack_require__(763456);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/right_panel/HeaderButtons.tsx
var HeaderButtons = __webpack_require__(757667);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/RightPanelStorePhases.ts
var RightPanelStorePhases = __webpack_require__(274057);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/right_panel/GroupHeaderButtons.tsx

/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2017 Vector Creations Ltd
Copyright 2017 New Vector Ltd
Copyright 2018 New Vector Ltd
Copyright 2019 The Matrix.org Foundation C.I.C.

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

const GROUP_PHASES = [RightPanelStorePhases/* RightPanelPhases */.q4.GroupMemberInfo, RightPanelStorePhases/* RightPanelPhases */.q4.GroupMemberList];
const ROOM_PHASES = [RightPanelStorePhases/* RightPanelPhases */.q4.GroupRoomList, RightPanelStorePhases/* RightPanelPhases */.q4.GroupRoomInfo];
// @replaceableComponent("views.right_panel.GroupHeaderButtons")
class GroupHeaderButtons extends HeaderButtons/* default */.Z {
  constructor(props) {
    super(props, HeaderButtons/* HeaderKind */.h.Group);
    (0,defineProperty/* default */.Z)(this, "onMembersClicked", () => {
      if (this.state.phase === RightPanelStorePhases/* RightPanelPhases */.q4.GroupMemberInfo) {
        // send the active phase to trigger a toggle
        this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.GroupMemberInfo);
      } else {
        // This toggles for us, if needed
        this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.GroupMemberList);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onRoomsClicked", () => {
      // This toggles for us, if needed
      this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.GroupRoomList);
    });
  }
  onAction(payload) {
    if (payload.action === actions/* Action */.a.ViewUser) {
      if (payload.member) {
        this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.RoomMemberInfo, {
          member: payload.member
        });
      } else {
        this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.GroupMemberList);
      }
    } else if (payload.action === "view_group") {
      this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.GroupMemberList);
    } else if (payload.action === "view_group_room") {
      this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.GroupRoomInfo, {
        groupRoomId: payload.groupRoomId,
        groupId: payload.groupId
      });
    } else if (payload.action === "view_group_room_list") {
      this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.GroupRoomList);
    } else if (payload.action === "view_group_member_list") {
      this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.GroupMemberList);
    } else if (payload.action === "view_group_user") {
      this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.GroupMemberInfo, {
        member: payload.member
      });
    }
  }
  renderButtons() {
    return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(HeaderButton/* default */.Z, {
      name: "groupMembersButton",
      title: (0,languageHandler._t)('Members'),
      isHighlighted: this.isPhase(GROUP_PHASES),
      onClick: this.onMembersClicked,
      analytics: ['Right Panel', 'Group Member List Button', 'click']
    }), /*#__PURE__*/react.createElement(HeaderButton/* default */.Z, {
      name: "roomsButton",
      title: (0,languageHandler._t)('Rooms'),
      isHighlighted: this.isPhase(ROOM_PHASES),
      onClick: this.onRoomsClicked,
      analytics: ['Right Panel', 'Group Room List Button', 'click']
    }));
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/GroupStore.js
var GroupStore = __webpack_require__(152118);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/FlairStore.js
var FlairStore = __webpack_require__(971698);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/GroupAddressPicker.js
var GroupAddressPicker = __webpack_require__(185675);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/permalinks/Permalinks.ts
var Permalinks = __webpack_require__(954105);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/models/group.js
var group = __webpack_require__(896882);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/utils.ts
var utils = __webpack_require__(29336);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/RightPanelStore.ts
var RightPanelStore = __webpack_require__(652458);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/customisations/Media.ts + 1 modules
var Media = __webpack_require__(834208);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/space.tsx + 4 modules
var space = __webpack_require__(568542);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Rooms.ts + 1 modules
var Rooms = __webpack_require__(286020);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/RoomDetailRow.js

/*
Copyright 2017-2021 The Matrix.org Foundation C.I.C.

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


function getDisplayAliasForRoom(room) {
  return (0,Rooms/* getDisplayAliasForAliasSet */.AH)(room.canonicalAlias, room.aliases);
}
const roomShape = prop_types_default().shape({
  name: (prop_types_default()).string,
  topic: (prop_types_default()).string,
  roomId: (prop_types_default()).string,
  avatarUrl: (prop_types_default()).string,
  numJoinedMembers: (prop_types_default()).number,
  canonicalAlias: (prop_types_default()).string,
  aliases: prop_types_default().arrayOf((prop_types_default()).string),
  worldReadable: (prop_types_default()).bool,
  guestCanJoin: (prop_types_default()).bool
});

// @replaceableComponent("views.rooms.RoomDetailRow")
class RoomDetailRow extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "onClick", ev => {
      ev.preventDefault();
      if (this.props.onClick) {
        this.props.onClick(ev, this.props.room);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onTopicClick", ev => {
      // When clicking a link in the topic, prevent the event being propagated
      // to `onClick`.
      ev.stopPropagation();
    });
    this._topic = /*#__PURE__*/(0,react.createRef)();
  }
  componentDidMount() {
    this._linkifyTopic();
  }
  componentDidUpdate() {
    this._linkifyTopic();
  }
  _linkifyTopic() {
    if (this._topic.current) {
      (0,HtmlUtils/* linkifyElement */.$5)(this._topic.current);
    }
  }
  render() {
    const BaseAvatar = src.getComponent('avatars.BaseAvatar');
    const room = this.props.room;
    const name = room.name || getDisplayAliasForRoom(room) || (0,languageHandler._t)('Unnamed room');
    const guestRead = room.worldReadable ? /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomDirectory_perm"
    }, (0,languageHandler._t)('World readable')) : /*#__PURE__*/react.createElement("div", null);
    const guestJoin = room.guestCanJoin ? /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomDirectory_perm"
    }, (0,languageHandler._t)('Guests can join')) : /*#__PURE__*/react.createElement("div", null);
    const perms = guestRead || guestJoin ? /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomDirectory_perms"
    }, guestRead, "\xA0", guestJoin) : /*#__PURE__*/react.createElement("div", null);
    let avatarUrl = null;
    if (room.avatarUrl) avatarUrl = (0,Media/* mediaFromMxc */.TS)(room.avatarUrl).getSquareThumbnailHttp(24);
    return /*#__PURE__*/react.createElement("tr", {
      key: room.roomId,
      onClick: this.onClick,
      onMouseDown: this.props.onMouseDown
    }, /*#__PURE__*/react.createElement("td", {
      className: "mx_RoomDirectory_roomAvatar"
    }, /*#__PURE__*/react.createElement(BaseAvatar, {
      width: 24,
      height: 24,
      resizeMethod: "crop",
      name: name,
      idName: name,
      defaultToImageAvatar: false,
      url: avatarUrl
    })), /*#__PURE__*/react.createElement("td", {
      className: "mx_RoomDirectory_roomDescription"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomDirectory_name"
    }, name), "\xA0", perms, /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomDirectory_topic",
      ref: this._topic,
      onClick: this.onTopicClick
    }, room.topic), /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomDirectory_alias"
    }, getDisplayAliasForRoom(room))), /*#__PURE__*/react.createElement("td", {
      className: "mx_RoomDirectory_roomMemberCount"
    }, room.numJoinedMembers));
  }
}
(0,defineProperty/* default */.Z)(RoomDetailRow, "propTypes", {
  room: roomShape,
  // passes ev, room as args
  onClick: (prop_types_default()).func,
  onMouseDown: (prop_types_default()).func
});
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/RoomDetailList.tsx

/*
Copyright 2017 New Vector Ltd.

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






class RoomDetailList extends react.Component {
  constructor(...args) {
    super(...args);
    (0,defineProperty/* default */.Z)(this, "onDetailsClick", (ev, room) => {
      dispatcher/* default */.ZP.dispatch({
        action: 'view_room',
        room_id: room.roomId,
        room_alias: room.getCanonicalAlias() || (room.getAltAliases() || [])[0]
      });
    });
  }
  getRows() {
    if (!this.props.rooms) return [];
    return this.props.rooms.map((room, index) => {
      return /*#__PURE__*/react.createElement(RoomDetailRow, {
        key: index,
        room: room,
        onClick: this.onDetailsClick
      });
    });
  }
  render() {
    const rows = this.getRows();
    let rooms;
    if (rows.length === 0) {
      rooms = /*#__PURE__*/react.createElement("i", null, (0,languageHandler._t)('No rooms to show'));
    } else {
      rooms = /*#__PURE__*/react.createElement("table", {
        className: "mx_RoomDirectory_table"
      }, /*#__PURE__*/react.createElement("tbody", null, this.getRows()));
    }
    return /*#__PURE__*/react.createElement("div", {
      className: classnames_default()("mx_RoomDetailList", this.props.className)
    }, rooms);
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Tooltip.tsx
var Tooltip = __webpack_require__(578413);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/TooltipButton.tsx

/*
Copyright 2017 New Vector Ltd.
Copyright 2019 The Matrix.org Foundation C.I.C.

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



class TooltipButton extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "onMouseOver", () => {
      this.setState({
        hover: true
      });
    });
    (0,defineProperty/* default */.Z)(this, "onMouseLeave", () => {
      this.setState({
        hover: false
      });
    });
    this.state = {
      hover: false
    };
  }
  render() {
    const tip = this.state.hover ? /*#__PURE__*/react.createElement(Tooltip/* default */.Z, {
      className: "mx_TooltipButton_container",
      tooltipClassName: "mx_TooltipButton_helpText",
      label: this.props.helpText
    }) : /*#__PURE__*/react.createElement("div", null);
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_TooltipButton",
      onMouseOver: this.onMouseOver,
      onMouseLeave: this.onMouseLeave
    }, "?", tip);
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ShareDialog.tsx
var ShareDialog = __webpack_require__(836066);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/InlineSpinner.tsx
var InlineSpinner = __webpack_require__(650193);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/avatars/GroupAvatar.tsx
var GroupAvatar = __webpack_require__(218722);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/EditableText.js
var EditableText = __webpack_require__(944839);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/GroupView.js

/*
Copyright 2017 Vector Creations Ltd.
Copyright 2017, 2018 New Vector Ltd.
Copyright 2019 The Matrix.org Foundation C.I.C.

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
























// import { replaceableComponent } from "../../utils/replaceableComponent";










const LONG_DESC_PLACEHOLDER = (0,languageHandler/* _td */.I8)(`<h1>HTML for your community's page</h1>
<p>
    Use the long description to introduce new members to the community, or distribute
    some important <a href="foo">links</a>
</p>
<p>
    You can even add images with Matrix URLs <img src="mxc://url" />
</p>
`);
const RoomSummaryType = prop_types_default().shape({
  room_id: (prop_types_default()).string.isRequired,
  profile: prop_types_default().shape({
    name: (prop_types_default()).string,
    avatar_url: (prop_types_default()).string,
    canonical_alias: (prop_types_default()).string
  }).isRequired
});
const UserSummaryType = prop_types_default().shape({
  summaryInfo: prop_types_default().shape({
    user_id: (prop_types_default()).string.isRequired,
    role_id: (prop_types_default()).string,
    avatar_url: (prop_types_default()).string,
    displayname: (prop_types_default()).string
  }).isRequired
});
class CategoryRoomList extends react.Component {
  constructor(...args) {
    super(...args);
    (0,defineProperty/* default */.Z)(this, "onAddRoomsToSummaryClicked", ev => {
      ev.preventDefault();
      const AddressPickerDialog = src.getComponent("dialogs.AddressPickerDialog");
      Modal/* default */.Z.createTrackedDialog('Add Rooms to Group Summary', '', AddressPickerDialog, {
        title: (0,languageHandler._t)('Add rooms to the community summary'),
        description: (0,languageHandler._t)("Which rooms would you like to add to this summary?"),
        placeholder: (0,languageHandler._t)("Room name or address"),
        button: (0,languageHandler._t)("Add to summary"),
        pickerType: 'room',
        validAddressTypes: ['mx-room-id'],
        groupId: this.props.groupId,
        onFinished: (success, addrs) => {
          if (!success) return;
          const errorList = [];
          Promise.allSettled(addrs.map(addr => {
            return GroupStore/* default */.ZP.addRoomToGroupSummary(this.props.groupId, addr.address).catch(() => {
              errorList.push(addr.address);
            });
          })).then(() => {
            if (errorList.length === 0) {
              return;
            }
            const ErrorDialog = src.getComponent("dialogs.ErrorDialog");
            Modal/* default */.Z.createTrackedDialog('Failed to add the following room to the group summary', '', ErrorDialog, {
              title: (0,languageHandler._t)("Failed to add the following rooms to the summary of %(groupId)s:", {
                groupId: this.props.groupId
              }),
              description: errorList.join(", ")
            });
          });
        }
      }, /*className=*/null, /*isPriority=*/false, /*isStatic=*/true);
    });
  }
  render() {
    const addButton = this.props.editing ? /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: "mx_GroupView_featuredThings_addButton",
      onClick: this.onAddRoomsToSummaryClicked
    }, /*#__PURE__*/react.createElement("img", {
      src: __webpack_require__(100151),
      width: "64",
      height: "64"
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_featuredThings_addButton_label"
    }, (0,languageHandler._t)('Add a Room'))) : /*#__PURE__*/react.createElement("div", null);
    const roomNodes = this.props.rooms.map(r => {
      return /*#__PURE__*/react.createElement(FeaturedRoom, {
        key: r.room_id,
        groupId: this.props.groupId,
        editing: this.props.editing,
        summaryInfo: r
      });
    });
    let catHeader = /*#__PURE__*/react.createElement("div", null);
    if (this.props.category && this.props.category.profile) {
      catHeader = /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_featuredThings_category"
      }, this.props.category.profile.name);
    }
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_featuredThings_container"
    }, catHeader, roomNodes, addButton);
  }
}
(0,defineProperty/* default */.Z)(CategoryRoomList, "propTypes", {
  rooms: prop_types_default().arrayOf(RoomSummaryType).isRequired,
  category: prop_types_default().shape({
    profile: prop_types_default().shape({
      name: (prop_types_default()).string
    }).isRequired
  }),
  groupId: (prop_types_default()).string.isRequired,
  // Whether the list should be editable
  editing: (prop_types_default()).bool.isRequired
});
class FeaturedRoom extends react.Component {
  constructor(...args) {
    super(...args);
    (0,defineProperty/* default */.Z)(this, "onClick", e => {
      e.preventDefault();
      e.stopPropagation();
      dispatcher/* default */.ZP.dispatch({
        action: 'view_room',
        room_alias: this.props.summaryInfo.profile.canonical_alias,
        room_id: this.props.summaryInfo.room_id
      });
    });
    (0,defineProperty/* default */.Z)(this, "onDeleteClicked", e => {
      e.preventDefault();
      e.stopPropagation();
      GroupStore/* default */.ZP.removeRoomFromGroupSummary(this.props.groupId, this.props.summaryInfo.room_id).catch(err => {
        console.error('Error whilst removing room from group summary', err);
        const roomName = this.props.summaryInfo.name || this.props.summaryInfo.canonical_alias || this.props.summaryInfo.room_id;
        const ErrorDialog = src.getComponent("dialogs.ErrorDialog");
        Modal/* default */.Z.createTrackedDialog('Failed to remove room from group summary', '', ErrorDialog, {
          title: (0,languageHandler._t)("Failed to remove the room from the summary of %(groupId)s", {
            groupId: this.props.groupId
          }),
          description: (0,languageHandler._t)("The room '%(roomName)s' could not be removed from the summary.", {
            roomName
          })
        });
      });
    });
  }
  render() {
    const RoomAvatar = src.getComponent("avatars.RoomAvatar");
    const roomName = this.props.summaryInfo.profile.name || this.props.summaryInfo.profile.canonical_alias || (0,languageHandler._t)("Unnamed Room");
    const oobData = {
      roomId: this.props.summaryInfo.room_id,
      avatarUrl: this.props.summaryInfo.profile.avatar_url,
      name: roomName
    };
    let permalink = null;
    if (this.props.summaryInfo.profile && this.props.summaryInfo.profile.canonical_alias) {
      permalink = (0,Permalinks/* makeGroupPermalink */.I4)(this.props.summaryInfo.profile.canonical_alias);
    }
    let roomNameNode = null;
    if (permalink) {
      roomNameNode = /*#__PURE__*/react.createElement("a", {
        href: permalink,
        onClick: this.onClick
      }, roomName);
    } else {
      roomNameNode = /*#__PURE__*/react.createElement("span", null, roomName);
    }
    const deleteButton = this.props.editing ? /*#__PURE__*/react.createElement("img", {
      className: "mx_GroupView_featuredThing_deleteButton",
      src: __webpack_require__(184170),
      width: "14",
      height: "14",
      alt: "Delete",
      onClick: this.onDeleteClicked
    }) : /*#__PURE__*/react.createElement("div", null);
    return /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: "mx_GroupView_featuredThing",
      onClick: this.onClick
    }, /*#__PURE__*/react.createElement(RoomAvatar, {
      oobData: oobData,
      size: "large"
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_featuredThing_name"
    }, roomNameNode), deleteButton);
  }
}
(0,defineProperty/* default */.Z)(FeaturedRoom, "propTypes", {
  summaryInfo: RoomSummaryType.isRequired,
  editing: (prop_types_default()).bool.isRequired,
  groupId: (prop_types_default()).string.isRequired
});
class RoleUserList extends react.Component {
  constructor(...args) {
    super(...args);
    (0,defineProperty/* default */.Z)(this, "onAddUsersClicked", ev => {
      ev.preventDefault();
      const AddressPickerDialog = src.getComponent("dialogs.AddressPickerDialog");
      Modal/* default */.Z.createTrackedDialog('Add Users to Group Summary', '', AddressPickerDialog, {
        title: (0,languageHandler._t)('Add users to the community summary'),
        description: (0,languageHandler._t)("Who would you like to add to this summary?"),
        placeholder: (0,languageHandler._t)("Name or Matrix ID"),
        button: (0,languageHandler._t)("Add to summary"),
        validAddressTypes: ['mx-user-id'],
        groupId: this.props.groupId,
        shouldOmitSelf: false,
        onFinished: (success, addrs) => {
          if (!success) return;
          const errorList = [];
          Promise.allSettled(addrs.map(addr => {
            return GroupStore/* default */.ZP.addUserToGroupSummary(addr.address).catch(() => {
              errorList.push(addr.address);
            });
          })).then(() => {
            if (errorList.length === 0) {
              return;
            }
            const ErrorDialog = src.getComponent("dialogs.ErrorDialog");
            Modal/* default */.Z.createTrackedDialog('Failed to add the following users to the community summary', '', ErrorDialog, {
              title: (0,languageHandler._t)("Failed to add the following users to the summary of %(groupId)s:", {
                groupId: this.props.groupId
              }),
              description: errorList.join(", ")
            });
          });
        }
      }, /*className=*/null, /*isPriority=*/false, /*isStatic=*/true);
    });
  }
  render() {
    const addButton = this.props.editing ? /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: "mx_GroupView_featuredThings_addButton",
      onClick: this.onAddUsersClicked
    }, /*#__PURE__*/react.createElement("img", {
      src: __webpack_require__(100151),
      width: "64",
      height: "64"
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_featuredThings_addButton_label"
    }, (0,languageHandler._t)('Add a User'))) : /*#__PURE__*/react.createElement("div", null);
    const userNodes = this.props.users.map(u => {
      return /*#__PURE__*/react.createElement(FeaturedUser, {
        key: u.user_id,
        summaryInfo: u,
        editing: this.props.editing,
        groupId: this.props.groupId
      });
    });
    let roleHeader = /*#__PURE__*/react.createElement("div", null);
    if (this.props.role && this.props.role.profile) {
      roleHeader = /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_featuredThings_category"
      }, this.props.role.profile.name);
    }
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_featuredThings_container"
    }, roleHeader, userNodes, addButton);
  }
}
(0,defineProperty/* default */.Z)(RoleUserList, "propTypes", {
  users: prop_types_default().arrayOf(UserSummaryType).isRequired,
  role: prop_types_default().shape({
    profile: prop_types_default().shape({
      name: (prop_types_default()).string
    }).isRequired
  }),
  groupId: (prop_types_default()).string.isRequired,
  // Whether the list should be editable
  editing: (prop_types_default()).bool.isRequired
});
class FeaturedUser extends react.Component {
  constructor(...args) {
    super(...args);
    (0,defineProperty/* default */.Z)(this, "onClick", e => {
      e.preventDefault();
      e.stopPropagation();
      dispatcher/* default */.ZP.dispatch({
        action: 'view_start_chat_or_reuse',
        user_id: this.props.summaryInfo.user_id
      });
    });
    (0,defineProperty/* default */.Z)(this, "onDeleteClicked", e => {
      e.preventDefault();
      e.stopPropagation();
      GroupStore/* default */.ZP.removeUserFromGroupSummary(this.props.groupId, this.props.summaryInfo.user_id).catch(err => {
        console.error('Error whilst removing user from group summary', err);
        const displayName = this.props.summaryInfo.displayname || this.props.summaryInfo.user_id;
        const ErrorDialog = src.getComponent("dialogs.ErrorDialog");
        Modal/* default */.Z.createTrackedDialog('Failed to remove user from community summary', '', ErrorDialog, {
          title: (0,languageHandler._t)("Failed to remove a user from the summary of %(groupId)s", {
            groupId: this.props.groupId
          }),
          description: (0,languageHandler._t)("The user '%(displayName)s' could not be removed from the summary.", {
            displayName
          })
        });
      });
    });
  }
  render() {
    const BaseAvatar = src.getComponent("avatars.BaseAvatar");
    const name = this.props.summaryInfo.displayname || this.props.summaryInfo.user_id;
    const permalink = (0,Permalinks/* makeUserPermalink */.KU)(this.props.summaryInfo.user_id);
    const userNameNode = /*#__PURE__*/react.createElement("a", {
      href: permalink,
      onClick: this.onClick
    }, name);
    const httpUrl = (0,Media/* mediaFromMxc */.TS)(this.props.summaryInfo.avatar_url).getSquareThumbnailHttp(64);
    const deleteButton = this.props.editing ? /*#__PURE__*/react.createElement("img", {
      className: "mx_GroupView_featuredThing_deleteButton",
      src: __webpack_require__(184170),
      width: "14",
      height: "14",
      alt: "Delete",
      onClick: this.onDeleteClicked
    }) : /*#__PURE__*/react.createElement("div", null);
    return /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: "mx_GroupView_featuredThing",
      onClick: this.onClick
    }, /*#__PURE__*/react.createElement(BaseAvatar, {
      name: name,
      url: httpUrl,
      width: 64,
      height: 64
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_featuredThing_name"
    }, userNameNode), deleteButton);
  }
}
(0,defineProperty/* default */.Z)(FeaturedUser, "propTypes", {
  summaryInfo: UserSummaryType.isRequired,
  editing: (prop_types_default()).bool.isRequired,
  groupId: (prop_types_default()).string.isRequired
});
const GROUP_JOINPOLICY_OPEN = "open";
const GROUP_JOINPOLICY_INVITE = "invite";
const UPGRADE_NOTICE_LS_KEY = "mx_hide_community_upgrade_notice";

// @replaceableComponent("structures.GroupView")
class GroupView extends react.Component {
  constructor(...args) {
    super(...args);
    (0,defineProperty/* default */.Z)(this, "state", {
      summary: null,
      isGroupPublicised: null,
      isUserPrivileged: null,
      groupRooms: null,
      groupRoomsLoading: null,
      error: null,
      editing: false,
      saving: false,
      uploadingAvatar: false,
      avatarChanged: false,
      membershipBusy: false,
      publicityBusy: false,
      inviterProfile: null,
      showRightPanel: RightPanelStore/* default */.Z.getSharedInstance().isOpenForGroup,
      showUpgradeNotice: !localStorage.getItem(UPGRADE_NOTICE_LS_KEY)
    });
    (0,defineProperty/* default */.Z)(this, "_onRightPanelStoreUpdate", () => {
      this.setState({
        showRightPanel: RightPanelStore/* default */.Z.getSharedInstance().isOpenForGroup
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onGroupMyMembership", group => {
      if (this._unmounted || group.groupId !== this.props.groupId) return;
      if (group.myMembership === 'leave') {
        // Leave settings - the user might have clicked the "Leave" button
        this._closeSettings();
      }
      this.setState({
        membershipBusy: false
      });
    });
    (0,defineProperty/* default */.Z)(this, "onGroupStoreUpdated", firstInit => {
      if (this._unmounted) return;
      const summary = GroupStore/* default */.ZP.getSummary(this.props.groupId);
      if (summary.profile) {
        // Default profile fields should be "" for later sending to the server (which
        // requires that the fields are strings, not null)
        ["avatar_url", "long_description", "name", "short_description"].forEach(k => {
          summary.profile[k] = summary.profile[k] || "";
        });
      }
      this.setState({
        summary,
        summaryLoading: !GroupStore/* default */.ZP.isStateReady(this.props.groupId, GroupStore/* default */.ZP.STATE_KEY.Summary),
        isGroupPublicised: GroupStore/* default */.ZP.getGroupPublicity(this.props.groupId),
        isUserPrivileged: GroupStore/* default */.ZP.isUserPrivileged(this.props.groupId),
        groupRooms: GroupStore/* default */.ZP.getGroupRooms(this.props.groupId),
        groupRoomsLoading: !GroupStore/* default */.ZP.isStateReady(this.props.groupId, GroupStore/* default */.ZP.STATE_KEY.GroupRooms),
        isUserMember: GroupStore/* default */.ZP.getGroupMembers(this.props.groupId).some(m => m.userId === this._matrixClient.credentials.userId)
      });
      // XXX: This might not work but this.props.groupIsNew unused anyway
      if (this.props.groupIsNew && firstInit) {
        this._onEditClick();
      }
    });
    (0,defineProperty/* default */.Z)(this, "_onEditClick", () => {
      this.setState({
        editing: true,
        profileForm: Object.assign({}, this.state.summary.profile),
        joinableForm: {
          policyType: this.state.summary.profile.is_openly_joinable ? GROUP_JOINPOLICY_OPEN : GROUP_JOINPOLICY_INVITE
        }
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onShareClick", () => {
      Modal/* default */.Z.createTrackedDialog('share community dialog', '', ShareDialog/* default */.Z, {
        target: this._matrixClient.getGroup(this.props.groupId) || new group/* Group */.Z(this.props.groupId)
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onCancelClick", () => {
      this._closeSettings();
    });
    (0,defineProperty/* default */.Z)(this, "_onAction", payload => {
      switch (payload.action) {
        // NOTE: close_settings is an app-wide dispatch; as it is dispatched from MatrixChat
        case 'close_settings':
          this.setState({
            editing: false,
            profileForm: null
          });
          break;
        default:
          break;
      }
    });
    (0,defineProperty/* default */.Z)(this, "_closeSettings", () => {
      dispatcher/* default */.ZP.dispatch({
        action: 'close_settings'
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onNameChange", value => {
      const newProfileForm = Object.assign(this.state.profileForm, {
        name: value
      });
      this.setState({
        profileForm: newProfileForm
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onShortDescChange", value => {
      const newProfileForm = Object.assign(this.state.profileForm, {
        short_description: value
      });
      this.setState({
        profileForm: newProfileForm
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onLongDescChange", e => {
      const newProfileForm = Object.assign(this.state.profileForm, {
        long_description: e.target.value
      });
      this.setState({
        profileForm: newProfileForm
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onAvatarSelected", ev => {
      const file = ev.target.files[0];
      if (!file) return;
      this.setState({
        uploadingAvatar: true
      });
      this._matrixClient.uploadContent(file).then(url => {
        const newProfileForm = Object.assign(this.state.profileForm, {
          avatar_url: url
        });
        this.setState({
          uploadingAvatar: false,
          profileForm: newProfileForm,
          // Indicate that FlairStore needs to be poked to show this change
          // in TagTile (GroupFilterPanel), Flair and GroupTile (MyGroups).
          avatarChanged: true
        });
      }).catch(e => {
        this.setState({
          uploadingAvatar: false
        });
        const ErrorDialog = src.getComponent("dialogs.ErrorDialog");
        console.error("Failed to upload avatar image", e);
        Modal/* default */.Z.createTrackedDialog('Failed to upload image', '', ErrorDialog, {
          title: (0,languageHandler._t)('Error'),
          description: (0,languageHandler._t)('Failed to upload image')
        });
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onJoinableChange", ev => {
      this.setState({
        joinableForm: {
          policyType: ev.target.value
        }
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onSaveClick", () => {
      this.setState({
        saving: true
      });
      const savePromise = this.state.isUserPrivileged ? this._saveGroup() : Promise.resolve();
      savePromise.then(result => {
        this.setState({
          saving: false,
          editing: false,
          summary: null
        });
        this._initGroupStore(this.props.groupId);
        if (this.state.avatarChanged) {
          // XXX: Evil - poking a store should be done from an async action
          FlairStore/* default */.Z.refreshGroupProfile(this._matrixClient, this.props.groupId);
        }
      }).catch(e => {
        this.setState({
          saving: false
        });
        const ErrorDialog = src.getComponent("dialogs.ErrorDialog");
        console.error("Failed to save community profile", e);
        Modal/* default */.Z.createTrackedDialog('Failed to update group', '', ErrorDialog, {
          title: (0,languageHandler._t)('Error'),
          description: (0,languageHandler._t)('Failed to update community')
        });
      }).finally(() => {
        this.setState({
          avatarChanged: false
        });
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onAcceptInviteClick", async () => {
      this.setState({
        membershipBusy: true
      });

      // Wait 500ms to prevent flashing. Do this before sending a request otherwise we risk the
      // spinner disappearing after we have fetched new group data.
      await (0,utils/* sleep */._v)(500);
      GroupStore/* default */.ZP.acceptGroupInvite(this.props.groupId).then(() => {
        // don't reset membershipBusy here: wait for the membership change to come down the sync
      }).catch(e => {
        this.setState({
          membershipBusy: false
        });
        const ErrorDialog = src.getComponent("dialogs.ErrorDialog");
        Modal/* default */.Z.createTrackedDialog('Error accepting invite', '', ErrorDialog, {
          title: (0,languageHandler._t)("Error"),
          description: (0,languageHandler._t)("Unable to accept invite")
        });
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onRejectInviteClick", async () => {
      this.setState({
        membershipBusy: true
      });

      // Wait 500ms to prevent flashing. Do this before sending a request otherwise we risk the
      // spinner disappearing after we have fetched new group data.
      await (0,utils/* sleep */._v)(500);
      GroupStore/* default */.ZP.leaveGroup(this.props.groupId).then(() => {
        // don't reset membershipBusy here: wait for the membership change to come down the sync
      }).catch(e => {
        this.setState({
          membershipBusy: false
        });
        const ErrorDialog = src.getComponent("dialogs.ErrorDialog");
        Modal/* default */.Z.createTrackedDialog('Error rejecting invite', '', ErrorDialog, {
          title: (0,languageHandler._t)("Error"),
          description: (0,languageHandler._t)("Unable to reject invite")
        });
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onJoinClick", async () => {
      if (this._matrixClient.isGuest()) {
        dispatcher/* default */.ZP.dispatch({
          action: 'require_registration',
          screen_after: {
            screen: `group/${this.props.groupId}`
          }
        });
        return;
      }
      this.setState({
        membershipBusy: true
      });

      // Wait 500ms to prevent flashing. Do this before sending a request otherwise we risk the
      // spinner disappearing after we have fetched new group data.
      await (0,utils/* sleep */._v)(500);
      GroupStore/* default */.ZP.joinGroup(this.props.groupId).then(() => {
        // don't reset membershipBusy here: wait for the membership change to come down the sync
      }).catch(e => {
        this.setState({
          membershipBusy: false
        });
        const ErrorDialog = src.getComponent("dialogs.ErrorDialog");
        Modal/* default */.Z.createTrackedDialog('Error joining room', '', ErrorDialog, {
          title: (0,languageHandler._t)("Error"),
          description: (0,languageHandler._t)("Unable to join community")
        });
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onLeaveClick", () => {
      const QuestionDialog = src.getComponent("dialogs.QuestionDialog");
      const warnings = this._leaveGroupWarnings();
      Modal/* default */.Z.createTrackedDialog('Leave Group', '', QuestionDialog, {
        title: (0,languageHandler._t)("Leave Community"),
        description: /*#__PURE__*/react.createElement("span", null, (0,languageHandler._t)("Leave %(groupName)s?", {
          groupName: this.props.groupId
        }), warnings),
        button: (0,languageHandler._t)("Leave"),
        danger: this.state.isUserPrivileged,
        onFinished: async confirmed => {
          if (!confirmed) return;
          this.setState({
            membershipBusy: true
          });

          // Wait 500ms to prevent flashing. Do this before sending a request otherwise we risk the
          // spinner disappearing after we have fetched new group data.
          await (0,utils/* sleep */._v)(500);
          GroupStore/* default */.ZP.leaveGroup(this.props.groupId).then(() => {
            // don't reset membershipBusy here: wait for the membership change to come down the sync
          }).catch(e => {
            this.setState({
              membershipBusy: false
            });
            const ErrorDialog = src.getComponent("dialogs.ErrorDialog");
            Modal/* default */.Z.createTrackedDialog('Error leaving community', '', ErrorDialog, {
              title: (0,languageHandler._t)("Error"),
              description: (0,languageHandler._t)("Unable to leave community")
            });
          });
        }
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onAddRoomsClick", () => {
      (0,GroupAddressPicker/* showGroupAddRoomDialog */.A)(this.props.groupId);
    });
    (0,defineProperty/* default */.Z)(this, "_dismissUpgradeNotice", () => {
      localStorage.setItem(UPGRADE_NOTICE_LS_KEY, "true");
      this.setState({
        showUpgradeNotice: false
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onCreateSpaceClick", () => {
      (0,space/* createSpaceFromCommunity */.eA)(this._matrixClient, this.props.groupId);
    });
    (0,defineProperty/* default */.Z)(this, "_onAdminsLinkClick", () => {
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.SetRightPanelPhase,
        phase: RightPanelStorePhases/* RightPanelPhases */.q4.GroupMemberList
      });
    });
  }
  componentDidMount() {
    this._unmounted = false;
    this._matrixClient = MatrixClientPeg/* MatrixClientPeg */.p.get();
    this._matrixClient.on("Group.myMembership", this._onGroupMyMembership);
    this._initGroupStore(this.props.groupId, true);
    this._dispatcherRef = dispatcher/* default */.ZP.register(this._onAction);
    this._rightPanelStoreToken = RightPanelStore/* default */.Z.getSharedInstance().addListener(this._onRightPanelStoreUpdate);
  }
  componentWillUnmount() {
    this._unmounted = true;
    this._matrixClient.removeListener("Group.myMembership", this._onGroupMyMembership);
    dispatcher/* default */.ZP.unregister(this._dispatcherRef);

    // Remove RightPanelStore listener
    if (this._rightPanelStoreToken) {
      this._rightPanelStoreToken.remove();
    }
  }

  // TODO: [REACT-WARNING] Replace with appropriate lifecycle event
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.props.groupId !== newProps.groupId) {
      this.setState({
        summary: null,
        error: null
      }, () => {
        this._initGroupStore(newProps.groupId);
      });
    }
  }
  _initGroupStore(groupId, firstInit) {
    const group = this._matrixClient.getGroup(groupId);
    if (group && group.inviter && group.inviter.userId) {
      this._fetchInviterProfile(group.inviter.userId);
    }
    GroupStore/* default */.ZP.registerListener(groupId, this.onGroupStoreUpdated.bind(this, firstInit));
    let willDoOnboarding = false;
    // XXX: This should be more fluxy - let's get the error from GroupStore .getError or something
    GroupStore/* default */.ZP.on('error', (err, errorGroupId, stateKey) => {
      if (this._unmounted || groupId !== errorGroupId) return;
      if (err.errcode === 'M_GUEST_ACCESS_FORBIDDEN' && !willDoOnboarding) {
        dispatcher/* default */.ZP.dispatch({
          action: 'do_after_sync_prepared',
          deferred_action: {
            action: 'view_group',
            group_id: groupId
          }
        });
        dispatcher/* default */.ZP.dispatch({
          action: 'require_registration',
          screen_after: {
            screen: `group/${groupId}`
          }
        });
        willDoOnboarding = true;
      }
      if (stateKey === GroupStore/* default */.ZP.STATE_KEY.Summary) {
        this.setState({
          summary: null,
          error: err,
          editing: false
        });
      }
    });
  }
  _fetchInviterProfile(userId) {
    this.setState({
      inviterProfileBusy: true
    });
    this._matrixClient.getProfileInfo(userId).then(resp => {
      if (this._unmounted) return;
      this.setState({
        inviterProfile: {
          avatarUrl: resp.avatar_url,
          displayName: resp.displayname
        }
      });
    }).catch(e => {
      console.error('Error getting group inviter profile', e);
    }).finally(() => {
      if (this._unmounted) return;
      this.setState({
        inviterProfileBusy: false
      });
    });
  }
  async _saveGroup() {
    await this._matrixClient.setGroupProfile(this.props.groupId, this.state.profileForm);
    await this._matrixClient.setGroupJoinPolicy(this.props.groupId, {
      type: this.state.joinableForm.policyType
    });
  }
  _leaveGroupWarnings() {
    const warnings = [];
    if (this.state.isUserPrivileged) {
      warnings.push( /*#__PURE__*/react.createElement("span", {
        className: "warning"
      }, " " /* Whitespace, otherwise the sentences get smashed together */, (0,languageHandler._t)("You are an administrator of this community. You will not be " + "able to rejoin without an invite from another administrator.")));
    }
    return warnings;
  }
  _getGroupSection() {
    const groupSettingsSectionClasses = classnames_default()({
      "mx_GroupView_group": this.state.editing,
      "mx_GroupView_group_disabled": this.state.editing && !this.state.isUserPrivileged
    });
    const header = this.state.editing ? /*#__PURE__*/react.createElement("h2", null, " ", (0,languageHandler._t)('Community Settings'), " ") : /*#__PURE__*/react.createElement("div", null);
    const hostingSignupLink = (0,HostingLink/* getHostingLink */.Y)('community-settings');
    let hostingSignup = null;
    if (hostingSignupLink && this.state.isUserPrivileged) {
      hostingSignup = /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_hostingSignup"
      }, (0,languageHandler._t)("Want more than a community? <a>Get your own server</a>", {}, {
        a: sub => /*#__PURE__*/react.createElement("a", {
          href: hostingSignupLink,
          target: "_blank",
          rel: "noreferrer noopener"
        }, sub)
      }), /*#__PURE__*/react.createElement("a", {
        href: hostingSignupLink,
        target: "_blank",
        rel: "noreferrer noopener"
      }, /*#__PURE__*/react.createElement("img", {
        src: __webpack_require__(773780),
        width: "11",
        height: "10",
        alt: ""
      })));
    }
    const changeDelayWarning = this.state.editing && this.state.isUserPrivileged ? /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_changeDelayWarning"
    }, (0,languageHandler._t)('Changes made to your community <bold1>name</bold1> and <bold2>avatar</bold2> ' + 'might not be seen by other users for up to 30 minutes.', {}, {
      'bold1': sub => /*#__PURE__*/react.createElement("b", null, " ", sub, " "),
      'bold2': sub => /*#__PURE__*/react.createElement("b", null, " ", sub, " ")
    })) : /*#__PURE__*/react.createElement("div", null);
    let communitiesUpgradeNotice;
    if (this.state.showUpgradeNotice) {
      let text;
      if (this.state.isUserPrivileged) {
        text = (0,languageHandler._t)("You can create a Squad from this community <a>here</a>.", {}, {
          a: sub => /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
            onClick: this._onCreateSpaceClick,
            kind: "link"
          }, sub)
        });
      } else {
        text = (0,languageHandler._t)("Ask the <a>admins</a> of this community to make it into a Squad " + "and keep a look out for the invite.", {}, {
          a: sub => /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
            onClick: this._onAdminsLinkClick,
            kind: "link"
          }, sub)
        });
      }
      communitiesUpgradeNotice = /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_spaceUpgradePrompt"
      }, /*#__PURE__*/react.createElement("h2", null, (0,languageHandler._t)("Communities can now be made into Squads")), /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Squads are a new way to make a community, with new features coming."), "\xA0", text, "\xA0", (0,languageHandler._t)("Communities won't receive further updates.")), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
        className: "mx_GroupView_spaceUpgradePrompt_close",
        onClick: this._dismissUpgradeNotice
      }));
    }
    return /*#__PURE__*/react.createElement("div", {
      className: groupSettingsSectionClasses
    }, header, hostingSignup, changeDelayWarning, communitiesUpgradeNotice, this._getJoinableNode(), this._getLongDescriptionNode(), this._getRoomsNode());
  }
  _getRoomsNode() {
    const AccessibleButton = src.getComponent('elements.AccessibleButton');
    const Spinner = src.getComponent('elements.Spinner');
    const roomsHelpNode = this.state.editing ? /*#__PURE__*/react.createElement(TooltipButton, {
      helpText: (0,languageHandler._t)('These rooms are displayed to community members on the community page. ' + 'Community members can join the rooms by clicking on them.')
    }) : /*#__PURE__*/react.createElement("div", null);
    const addRoomRow = this.state.editing ? /*#__PURE__*/react.createElement(AccessibleButton, {
      className: "mx_GroupView_rooms_header_addRow",
      onClick: this._onAddRoomsClick
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_rooms_header_addRow_button"
    }, /*#__PURE__*/react.createElement("img", {
      src: __webpack_require__(960375),
      width: "24",
      height: "24"
    })), /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_rooms_header_addRow_label"
    }, (0,languageHandler._t)('Add rooms to this community'))) : /*#__PURE__*/react.createElement("div", null);
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_rooms"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_rooms_header"
    }, /*#__PURE__*/react.createElement("h3", null, (0,languageHandler._t)('Rooms'), roomsHelpNode), addRoomRow), this.state.groupRoomsLoading ? /*#__PURE__*/react.createElement(Spinner, null) : /*#__PURE__*/react.createElement(RoomDetailList, {
      rooms: this.state.groupRooms
    }));
  }
  _getFeaturedRoomsNode() {
    const summary = this.state.summary;
    const defaultCategoryRooms = [];
    const categoryRooms = {};
    summary.rooms_section.rooms.forEach(r => {
      if (r.category_id === null) {
        defaultCategoryRooms.push(r);
      } else {
        let list = categoryRooms[r.category_id];
        if (list === undefined) {
          list = [];
          categoryRooms[r.category_id] = list;
        }
        list.push(r);
      }
    });
    const defaultCategoryNode = /*#__PURE__*/react.createElement(CategoryRoomList, {
      rooms: defaultCategoryRooms,
      groupId: this.props.groupId,
      editing: this.state.editing
    });
    const categoryRoomNodes = Object.keys(categoryRooms).map(catId => {
      const cat = summary.rooms_section.categories[catId];
      return /*#__PURE__*/react.createElement(CategoryRoomList, {
        key: catId,
        rooms: categoryRooms[catId],
        category: cat,
        groupId: this.props.groupId,
        editing: this.state.editing
      });
    });
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_featuredThings"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_featuredThings_header"
    }, (0,languageHandler._t)('Featured Rooms:')), defaultCategoryNode, categoryRoomNodes);
  }
  _getFeaturedUsersNode() {
    const summary = this.state.summary;
    const noRoleUsers = [];
    const roleUsers = {};
    summary.users_section.users.forEach(u => {
      if (u.role_id === null) {
        noRoleUsers.push(u);
      } else {
        let list = roleUsers[u.role_id];
        if (list === undefined) {
          list = [];
          roleUsers[u.role_id] = list;
        }
        list.push(u);
      }
    });
    const noRoleNode = /*#__PURE__*/react.createElement(RoleUserList, {
      users: noRoleUsers,
      groupId: this.props.groupId,
      editing: this.state.editing
    });
    const roleUserNodes = Object.keys(roleUsers).map(roleId => {
      const role = summary.users_section.roles[roleId];
      return /*#__PURE__*/react.createElement(RoleUserList, {
        key: roleId,
        users: roleUsers[roleId],
        role: role,
        groupId: this.props.groupId,
        editing: this.state.editing
      });
    });
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_featuredThings"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_featuredThings_header"
    }, (0,languageHandler._t)('Featured Users:')), noRoleNode, roleUserNodes);
  }
  _getMembershipSection() {
    const Spinner = src.getComponent("elements.Spinner");
    const BaseAvatar = src.getComponent("avatars.BaseAvatar");
    const group = this._matrixClient.getGroup(this.props.groupId);
    if (group && group.myMembership === 'invite') {
      if (this.state.membershipBusy || this.state.inviterProfileBusy) {
        return /*#__PURE__*/react.createElement("div", {
          className: "mx_GroupView_membershipSection"
        }, /*#__PURE__*/react.createElement(Spinner, null));
      }
      const httpInviterAvatar = this.state.inviterProfile && this.state.inviterProfile.avatarUrl ? (0,Media/* mediaFromMxc */.TS)(this.state.inviterProfile.avatarUrl).getSquareThumbnailHttp(36) : null;
      const inviter = group.inviter || {};
      let inviterName = inviter.userId;
      if (this.state.inviterProfile) {
        inviterName = this.state.inviterProfile.displayName || (0,strings/* getDisplayUserId */.RL)(inviter.userId);
      }
      return /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_membershipSection mx_GroupView_membershipSection_invited"
      }, /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_membershipSubSection"
      }, /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_membershipSection_description"
      }, /*#__PURE__*/react.createElement(BaseAvatar, {
        url: httpInviterAvatar,
        name: inviterName,
        width: 36,
        height: 36,
        idName: inviter.userId
      }), (0,languageHandler._t)("%(inviter)s has invited you to join this community", {
        inviter: inviterName || (0,languageHandler._t)("Someone")
      })), /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_membership_buttonContainer"
      }, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
        className: "mx_GroupView_textButton mx_RoomHeader_textButton",
        onClick: this._onAcceptInviteClick
      }, (0,languageHandler._t)("Accept")), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
        className: "mx_GroupView_textButton mx_RoomHeader_textButton",
        onClick: this._onRejectInviteClick
      }, (0,languageHandler._t)("Decline")))));
    }
    let membershipContainerExtraClasses;
    let membershipButtonExtraClasses;
    let membershipButtonTooltip;
    let membershipButtonText;
    let membershipButtonOnClick;

    // User is not in the group
    if ((!group || group.myMembership === 'leave') && this.state.summary && this.state.summary.profile && Boolean(this.state.summary.profile.is_openly_joinable)) {
      membershipButtonText = (0,languageHandler._t)("Join this community");
      membershipButtonOnClick = this._onJoinClick;
      membershipButtonExtraClasses = 'mx_GroupView_joinButton';
      membershipContainerExtraClasses = 'mx_GroupView_membershipSection_leave';
    } else if (group && group.myMembership === 'join' && this.state.editing) {
      membershipButtonText = (0,languageHandler._t)("Leave this community");
      membershipButtonOnClick = this._onLeaveClick;
      membershipButtonTooltip = this.state.isUserPrivileged ? (0,languageHandler._t)("You are an administrator of this community") : (0,languageHandler._t)("You are a member of this community");
      membershipButtonExtraClasses = {
        'mx_GroupView_leaveButton': true,
        'mx_RoomHeader_textButton_danger': this.state.isUserPrivileged
      };
      membershipContainerExtraClasses = 'mx_GroupView_membershipSection_joined';
    } else {
      return null;
    }
    const membershipButtonClasses = classnames_default()(['mx_RoomHeader_textButton', 'mx_GroupView_textButton'], membershipButtonExtraClasses);
    const membershipContainerClasses = classnames_default()('mx_GroupView_membershipSection', membershipContainerExtraClasses);
    return /*#__PURE__*/react.createElement("div", {
      className: membershipContainerClasses
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_membershipSubSection"
    }, this.state.membershipBusy ? /*#__PURE__*/react.createElement(Spinner, null) : /*#__PURE__*/react.createElement("div", null), /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_membership_buttonContainer"
    }, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: membershipButtonClasses,
      onClick: membershipButtonOnClick,
      title: membershipButtonTooltip
    }, membershipButtonText))));
  }
  _getJoinableNode() {
    return this.state.editing ? /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("h3", null, (0,languageHandler._t)('Who can join this community?'), this.state.groupJoinableLoading ? /*#__PURE__*/react.createElement(InlineSpinner/* default */.Z, null) : /*#__PURE__*/react.createElement("div", null)), /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("label", null, /*#__PURE__*/react.createElement("input", {
      type: "radio",
      value: GROUP_JOINPOLICY_INVITE,
      checked: this.state.joinableForm.policyType === GROUP_JOINPOLICY_INVITE,
      onChange: this._onJoinableChange
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_label_text"
    }, (0,languageHandler._t)('Only people who have been invited')))), /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("label", null, /*#__PURE__*/react.createElement("input", {
      type: "radio",
      value: GROUP_JOINPOLICY_OPEN,
      checked: this.state.joinableForm.policyType === GROUP_JOINPOLICY_OPEN,
      onChange: this._onJoinableChange
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_label_text"
    }, (0,languageHandler._t)('Everyone'))))) : null;
  }
  _getLongDescriptionNode() {
    const summary = this.state.summary;
    let description = null;
    if (summary.profile && summary.profile.long_description) {
      description = (0,HtmlUtils/* sanitizedHtmlNode */.mJ)(summary.profile.long_description);
    } else if (this.state.isUserPrivileged) {
      description = /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_groupDesc_placeholder",
        onClick: this._onEditClick
      }, (0,languageHandler._t)('Your community hasn\'t got a Long Description, a HTML page to show to community members.<br />' + 'Click here to open settings and give it one!', {}, {
        'br': /*#__PURE__*/react.createElement("br", null)
      }));
    }
    const groupDescEditingClasses = classnames_default()({
      "mx_GroupView_groupDesc": true,
      "mx_GroupView_groupDesc_disabled": !this.state.isUserPrivileged
    });
    return this.state.editing ? /*#__PURE__*/react.createElement("div", {
      className: groupDescEditingClasses
    }, /*#__PURE__*/react.createElement("h3", null, " ", (0,languageHandler._t)("Long Description (HTML)"), " "), /*#__PURE__*/react.createElement("textarea", {
      value: this.state.profileForm.long_description,
      placeholder: (0,languageHandler._t)(LONG_DESC_PLACEHOLDER),
      onChange: this._onLongDescChange,
      tabIndex: "4",
      key: "editLongDesc"
    })) : /*#__PURE__*/react.createElement("div", {
      className: "mx_GroupView_groupDesc"
    }, description);
  }
  render() {
    const Spinner = src.getComponent("elements.Spinner");
    if (this.state.summaryLoading && this.state.error === null || this.state.saving) {
      return /*#__PURE__*/react.createElement(Spinner, null);
    } else if (this.state.summary && !this.state.error) {
      const summary = this.state.summary;
      let avatarNode;
      let nameNode;
      let shortDescNode;
      const rightButtons = [];
      if (this.state.editing && this.state.isUserPrivileged) {
        let avatarImage;
        if (this.state.uploadingAvatar) {
          avatarImage = /*#__PURE__*/react.createElement(Spinner, null);
        } else {
          avatarImage = /*#__PURE__*/react.createElement(GroupAvatar/* default */.Z, {
            groupId: this.props.groupId,
            groupName: this.state.profileForm.name,
            groupAvatarUrl: this.state.profileForm.avatar_url,
            width: 28,
            height: 28,
            resizeMethod: "crop"
          });
        }
        avatarNode = /*#__PURE__*/react.createElement("div", {
          className: "mx_GroupView_avatarPicker"
        }, /*#__PURE__*/react.createElement("label", {
          htmlFor: "avatarInput",
          className: "mx_GroupView_avatarPicker_label"
        }, avatarImage), /*#__PURE__*/react.createElement("div", {
          className: "mx_GroupView_avatarPicker_edit"
        }, /*#__PURE__*/react.createElement("label", {
          htmlFor: "avatarInput",
          className: "mx_GroupView_avatarPicker_label"
        }, /*#__PURE__*/react.createElement("img", {
          src: __webpack_require__(758826),
          alt: (0,languageHandler._t)("Upload avatar"),
          title: (0,languageHandler._t)("Upload avatar"),
          width: "17",
          height: "15"
        })), /*#__PURE__*/react.createElement("input", {
          id: "avatarInput",
          className: "mx_GroupView_uploadInput",
          type: "file",
          onChange: this._onAvatarSelected
        })));
        nameNode = /*#__PURE__*/react.createElement(EditableText/* default */.Z, {
          className: "mx_GroupView_editable",
          placeholderClassName: "mx_GroupView_placeholder",
          placeholder: (0,languageHandler._t)('Community Name'),
          blurToCancel: false,
          initialValue: this.state.profileForm.name,
          onValueChanged: this._onNameChange,
          tabIndex: "0",
          dir: "auto"
        });
        shortDescNode = /*#__PURE__*/react.createElement(EditableText/* default */.Z, {
          className: "mx_GroupView_editable",
          placeholderClassName: "mx_GroupView_placeholder",
          placeholder: (0,languageHandler._t)("Description"),
          blurToCancel: false,
          initialValue: this.state.profileForm.short_description,
          onValueChanged: this._onShortDescChange,
          tabIndex: "0",
          dir: "auto"
        });
      } else {
        const onGroupHeaderItemClick = this.state.isUserMember ? this._onEditClick : null;
        const groupAvatarUrl = summary.profile ? summary.profile.avatar_url : null;
        const groupName = summary.profile ? summary.profile.name : null;
        avatarNode = /*#__PURE__*/react.createElement(GroupAvatar/* default */.Z, {
          groupId: this.props.groupId,
          groupAvatarUrl: groupAvatarUrl,
          groupName: groupName,
          onClick: onGroupHeaderItemClick,
          width: 28,
          height: 28
        });
        if (summary.profile && summary.profile.name) {
          nameNode = /*#__PURE__*/react.createElement("div", {
            onClick: onGroupHeaderItemClick
          }, /*#__PURE__*/react.createElement("span", null, summary.profile.name), /*#__PURE__*/react.createElement("span", {
            className: "mx_GroupView_header_groupid"
          }, "(", this.props.groupId, ")"));
        } else {
          nameNode = /*#__PURE__*/react.createElement("span", {
            onClick: onGroupHeaderItemClick
          }, this.props.groupId);
        }
        if (summary.profile && summary.profile.short_description) {
          shortDescNode = /*#__PURE__*/react.createElement("span", {
            onClick: onGroupHeaderItemClick
          }, summary.profile.short_description);
        }
      }
      if (this.state.editing) {
        rightButtons.push( /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
          className: "mx_GroupView_textButton mx_RoomHeader_textButton",
          key: "_saveButton",
          onClick: this._onSaveClick
        }, (0,languageHandler._t)('Save')));
        rightButtons.push( /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
          className: "mx_RoomHeader_cancelButton",
          key: "_cancelButton",
          onClick: this._onCancelClick
        }, /*#__PURE__*/react.createElement("img", {
          src: __webpack_require__(531497),
          className: "mx_filterFlipColor",
          width: "18",
          height: "18",
          alt: (0,languageHandler._t)("Cancel")
        })));
      } else {
        if (summary.user && summary.user.membership === 'join') {
          rightButtons.push( /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
            className: "mx_GroupHeader_button mx_GroupHeader_editButton",
            key: "_editButton",
            onClick: this._onEditClick,
            title: (0,languageHandler._t)("Community Settings")
          }));
        }
        rightButtons.push( /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
          className: "mx_GroupHeader_button mx_GroupHeader_shareButton",
          key: "_shareButton",
          onClick: this._onShareClick,
          title: (0,languageHandler._t)('Share Community')
        }));
      }
      const rightPanel = this.state.showRightPanel ? /*#__PURE__*/react.createElement(RightPanel/* default */.Z, {
        groupId: this.props.groupId
      }) : undefined;
      const headerClasses = {
        "mx_GroupView_header": true,
        "light-panel": true,
        "mx_GroupView_header_view": !this.state.editing,
        "mx_GroupView_header_isUserMember": this.state.isUserMember
      };
      return /*#__PURE__*/react.createElement("main", {
        className: "mx_GroupView"
      }, /*#__PURE__*/react.createElement("div", {
        className: classnames_default()(headerClasses)
      }, /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_header_leftCol"
      }, /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_header_avatar"
      }, avatarNode), /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_header_info"
      }, /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_header_name"
      }, nameNode), /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_header_shortDesc"
      }, shortDescNode))), /*#__PURE__*/react.createElement("div", {
        className: "mx_GroupView_header_rightCol"
      }, rightButtons), /*#__PURE__*/react.createElement(GroupHeaderButtons, null)), /*#__PURE__*/react.createElement(MainSplit/* default */.Z, {
        panel: rightPanel,
        resizeNotifier: this.props.resizeNotifier
      }, /*#__PURE__*/react.createElement(AutoHideScrollbar/* default */.Z, {
        className: "mx_GroupView_body"
      }, this._getMembershipSection(), this._getGroupSection())));
    } else if (this.state.error) {
      if (this.state.error.httpStatus === 404) {
        return /*#__PURE__*/react.createElement("div", {
          className: "mx_GroupView_error"
        }, (0,languageHandler._t)('Community %(groupId)s not found', {
          groupId: this.props.groupId
        }));
      } else {
        let extraText;
        if (this.state.error.errcode === 'M_UNRECOGNIZED') {
          extraText = /*#__PURE__*/react.createElement("div", null, (0,languageHandler._t)('This homeserver does not support communities'));
        }
        return /*#__PURE__*/react.createElement("div", {
          className: "mx_GroupView_error"
        }, (0,languageHandler._t)('Failed to load %(groupId)s', {
          groupId: this.props.groupId
        }), extraText);
      }
    } else {
      console.error("Invalid state for GroupView");
      return /*#__PURE__*/react.createElement("div", null);
    }
  }
}
(0,defineProperty/* default */.Z)(GroupView, "propTypes", {
  groupId: (prop_types_default()).string.isRequired,
  // Whether this is the first time the group admin is viewing the group
  groupIsNew: (prop_types_default()).bool
});
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/SpaceStore.tsx + 2 modules
var SpaceStore = __webpack_require__(387579);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/ErrorBoundary.tsx
var ErrorBoundary = __webpack_require__(618675);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/useAsyncMemo.ts
var useAsyncMemo = __webpack_require__(348855);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/UserSettingsDialog.tsx + 47 modules
var UserSettingsDialog = __webpack_require__(449878);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/LegacyCommunityPreview.tsx
/*
Copyright 2021 The Matrix.org Foundation C.I.C.

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













const onSwapClick = () => {
  dispatcher/* default */.ZP.dispatch({
    action: actions/* Action */.a.ViewUserSettings,
    initialTabId: UserSettingsDialog/* UserTab */.oX.Preferences
  });
};

// XXX: temporary community migration component, reuses SpaceRoomView & SpacePreview classes for simplicity
const LegacyCommunityPreview = ({
  groupId
}) => {
  var _groupSummary$user;
  const cli = (0,react.useContext)(MatrixClientContext/* default */.Z);
  const groupSummary = (0,useAsyncMemo/* useAsyncMemo */.G)(() => cli.getGroupSummary(groupId), [cli, groupId]);
  if (!groupSummary) {
    return /*#__PURE__*/react.createElement("main", {
      className: "mx_SpaceRoomView"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_MainSplit"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_SpaceRoomView_preview"
    }, /*#__PURE__*/react.createElement(Spinner/* default */.Z, null))));
  }
  let visibilitySection;
  if (groupSummary.profile.is_public) {
    visibilitySection = /*#__PURE__*/react.createElement("span", {
      className: "mx_SpaceRoomView_info_public"
    }, (0,languageHandler._t)("Public community"));
  } else {
    visibilitySection = /*#__PURE__*/react.createElement("span", {
      className: "mx_SpaceRoomView_info_private"
    }, (0,languageHandler._t)("Private community"));
  }
  return /*#__PURE__*/react.createElement("main", {
    className: "mx_SpaceRoomView"
  }, /*#__PURE__*/react.createElement(ErrorBoundary/* default */.Z, null, /*#__PURE__*/react.createElement("div", {
    className: "mx_MainSplit"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_SpaceRoomView_preview"
  }, /*#__PURE__*/react.createElement(GroupAvatar/* default */.Z, {
    groupId: groupId,
    groupName: groupSummary.profile.name,
    groupAvatarUrl: groupSummary.profile.avatar_url,
    height: 80,
    width: 80,
    resizeMethod: "crop"
  }), /*#__PURE__*/react.createElement("h1", {
    className: "mx_SpaceRoomView_preview_name"
  }, groupSummary.profile.name), /*#__PURE__*/react.createElement("div", {
    className: "mx_SpaceRoomView_info"
  }, visibilitySection), /*#__PURE__*/react.createElement("div", {
    className: "mx_SpaceRoomView_preview_topic",
    ref: e => e && (0,HtmlUtils/* linkifyElement */.$5)(e)
  }, groupSummary.profile.short_description), /*#__PURE__*/react.createElement("div", {
    className: "mx_SpaceRoomView_preview_spaceBetaPrompt"
  }, ((_groupSummary$user = groupSummary.user) === null || _groupSummary$user === void 0 ? void 0 : _groupSummary$user.membership) === "join" ? (0,languageHandler._t)("To view %(communityName)s, swap to communities in your <a>preferences</a>", {
    communityName: groupSummary.profile.name
  }, {
    a: sub => /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      onClick: onSwapClick,
      kind: "link"
    }, sub)
  }) : (0,languageHandler._t)("To join %(communityName)s, swap to communities in your <a>preferences</a>", {
    communityName: groupSummary.profile.name
  }, {
    a: sub => /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      onClick: onSwapClick,
      kind: "link"
    }, sub)
  }))))));
};
/* harmony default export */ const structures_LegacyCommunityPreview = (LegacyCommunityPreview);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/LeftPanelStore.ts
var LeftPanelStore = __webpack_require__(290884);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(166644);
// EXTERNAL MODULE: ./node_modules/lodash-es/omit.js + 1 modules
var omit = __webpack_require__(273415);
// EXTERNAL MODULE: ./node_modules/antd/lib/index.js
var lib = __webpack_require__(769215);
// EXTERNAL MODULE: ./node_modules/@ant-design/icons/lib/index.js
var icons_lib = __webpack_require__(639389);
// EXTERNAL MODULE: ./node_modules/@hiseas/react/dist/index.js
var dist = __webpack_require__(989638);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/panelcontent/Squad.tsx
var Squad = __webpack_require__(241358);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/panelcontent/Group.tsx
var Group = __webpack_require__(836342);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/panelcontent/Explore.tsx
var Explore = __webpack_require__(470912);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/HomeButton.tsx
var HomeButton = __webpack_require__(508380);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/TimelinePanel.tsx + 30 modules
var TimelinePanel = __webpack_require__(672214);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/EventTile.tsx + 7 modules
var EventTile = __webpack_require__(585340);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/settings/Layout.ts
var Layout = __webpack_require__(244088);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/menus/config.tsx
var config = __webpack_require__(244163);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/inbox/hooks/useCommonNotify.tsx
var useCommonNotify = __webpack_require__(493095);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/inbox/components/NotificationItem.tsx + 1 modules
var NotificationItem = __webpack_require__(323874);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/inbox/hooks/useInfinity.tsx
var useInfinity = __webpack_require__(56235);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/icons/IconEmptyList.tsx

const IconEmptyList = () => {
  return /*#__PURE__*/react.createElement("svg", {
    width: "125",
    height: "77",
    viewBox: "0 0 125 77",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react.createElement("g", {
    clipPath: "url(#clip0_11616_27434)"
  }, /*#__PURE__*/react.createElement("path", {
    d: "M79.4662 68.2976H35.6747C33.6824 68.2956 31.7724 67.5033 30.3637 66.0946C28.9549 64.6858 28.1626 62.7758 28.1606 60.7836V16.9946C28.1626 15.0021 28.9549 13.0918 30.3635 11.6827C31.7721 10.2735 33.6822 9.48069 35.6747 9.47803H79.4662C81.4586 9.48069 83.3687 10.2735 84.7773 11.6827C86.186 13.0918 86.9782 15.0021 86.9802 16.9946V60.7836C86.9782 62.7758 86.1859 64.6858 84.7772 66.0946C83.3685 67.5033 81.4584 68.2956 79.4662 68.2976ZM35.6747 9.98097C33.8156 9.98364 32.0335 10.7235 30.7191 12.0383C29.4048 13.3531 28.6656 15.1355 28.6636 16.9946V60.7836C28.6656 62.6424 29.4049 64.4245 30.7193 65.7389C32.0337 67.0533 33.8158 67.7926 35.6747 67.7946H79.4662C81.325 67.7926 83.1071 67.0533 84.4215 65.7389C85.7359 64.4245 86.4752 62.6424 86.4772 60.7836V16.9946C86.4752 15.1355 85.736 13.3531 84.4217 12.0383C83.1074 10.7235 81.3252 9.98364 79.4662 9.98097H35.6747Z",
    fill: "#B27AFF"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M65.7006 5.41173C65.0294 3.80851 63.8993 2.43945 62.4523 1.47658C61.0053 0.513712 59.306 0 57.568 0C55.8299 0 54.1306 0.513712 52.6836 1.47658C51.2366 2.43945 50.1065 3.80851 49.4353 5.41173H46.6364C46.3476 5.4114 46.0615 5.46801 45.7946 5.57831C45.5276 5.68862 45.285 5.85046 45.0807 6.05459C44.8763 6.25871 44.7142 6.50111 44.6036 6.76794C44.493 7.03476 44.436 7.32077 44.436 7.60961V10.4714C44.436 11.0549 44.6679 11.6146 45.0805 12.0273C45.4932 12.4399 46.0528 12.6718 46.6364 12.6718H68.5146C69.0982 12.6718 69.6578 12.4399 70.0705 12.0273C70.4831 11.6146 70.715 11.0549 70.715 10.4714V7.60961C70.715 7.32077 70.658 7.03476 70.5474 6.76794C70.4368 6.50111 70.2747 6.25871 70.0703 6.05459C69.866 5.85046 69.6234 5.68862 69.3564 5.57831C69.0895 5.46801 68.8034 5.4114 68.5146 5.41173H65.7006Z",
    fill: "#B27AFF"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M89.6736 76.9233H45.8846C43.9218 76.924 42.0376 76.1526 40.6388 74.7757C40.5609 74.7003 40.4226 74.5544 40.3874 74.5242L30.1499 65.8685L30.4743 65.4863L40.7419 74.1671C40.7419 74.1671 40.9054 74.3407 40.9934 74.4186C42.2975 75.7069 44.0565 76.4296 45.8896 76.4304H89.6736C91.5348 76.4284 93.3191 75.6874 94.6343 74.3704C95.9494 73.0534 96.6878 71.268 96.6871 69.4068V25.6178C96.6853 24.6367 96.4781 23.6669 96.0788 22.7708C95.6794 21.8747 95.0969 21.0721 94.3686 20.4148C94.2076 20.2689 93.8656 19.9948 93.8656 19.9923L84.6064 12.2369L84.9283 11.8496L94.1674 19.6151C94.1674 19.6151 94.527 19.8967 94.7005 20.0527C95.4814 20.7574 96.1063 21.6177 96.535 22.5783C96.9638 23.5388 97.1869 24.5784 97.1901 25.6303V69.4068C97.1874 71.3994 96.3947 73.3098 94.9856 74.7188C93.5766 76.1278 91.6662 76.9206 89.6736 76.9233Z",
    fill: "#B27AFF"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M77.7942 29.7266H37.3447V30.2295H77.7942V29.7266Z",
    fill: "white"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M77.7942 38.6035H37.3447V39.1065H77.7942V38.6035Z",
    fill: "white"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M77.7942 47.4805H37.3447V47.9834H77.7942V47.4805Z",
    fill: "white"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M77.7942 56.3574H37.3447V56.8604H77.7942V56.3574Z",
    fill: "white"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M8.59355 41.7295L10.3815 48.552L16.7564 50.2796L10.3539 51.9393L8.59355 58.7768L6.97406 51.9393L0.428223 50.2796L6.6044 48.552L8.59355 41.7295Z",
    fill: "#DAC2FB"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M8.59359 58.8898C8.5691 58.8889 8.54557 58.8801 8.52652 58.8647C8.50747 58.8493 8.49395 58.8281 8.48797 58.8043L6.88106 52.0296L0.400602 50.3875C0.377491 50.3804 0.357273 50.366 0.342911 50.3466C0.32855 50.3271 0.320801 50.3036 0.320801 50.2794C0.320801 50.2552 0.32855 50.2316 0.342911 50.2122C0.357273 50.1927 0.377491 50.1784 0.400602 50.1712L6.51643 48.4612L8.48797 41.6991C8.49499 41.6759 8.50928 41.6555 8.52875 41.641C8.54822 41.6265 8.57184 41.6187 8.59611 41.6187C8.62038 41.619 8.64386 41.6273 8.66295 41.6423C8.68204 41.6573 8.69566 41.6781 8.70173 41.7016L10.4771 48.4612L16.7891 50.1712C16.8125 50.1779 16.8331 50.1921 16.8477 50.2116C16.8623 50.2312 16.8699 50.255 16.8696 50.2794C16.8694 50.304 16.8612 50.3278 16.8462 50.3473C16.8312 50.3669 16.8103 50.381 16.7866 50.3875L10.4444 52.0296L8.69921 58.8043C8.69362 58.8283 8.6802 58.8497 8.66107 58.8652C8.64194 58.8807 8.6182 58.8893 8.59359 58.8898ZM0.860798 50.2744L6.99925 51.831C7.01904 51.8357 7.03719 51.8457 7.0518 51.8598C7.0664 51.874 7.07692 51.8918 7.08224 51.9114L8.59108 58.3139L10.2407 51.9114C10.2453 51.8919 10.2553 51.874 10.2695 51.8598C10.2837 51.8456 10.3016 51.8356 10.3212 51.831L16.3163 50.2769L10.3489 48.6574C10.33 48.6528 10.3127 48.6431 10.2989 48.6294C10.2852 48.6156 10.2755 48.5983 10.2709 48.5794L8.58605 42.1467L6.71006 48.5819C6.70508 48.6 6.69551 48.6164 6.68229 48.6296C6.66907 48.6428 6.65264 48.6524 6.63462 48.6574L0.860798 50.2744Z",
    fill: "#DAC2FB"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M117.3 44.3575C117.254 44.3575 117.209 44.3389 117.176 44.3059C117.143 44.2729 117.124 44.2281 117.124 44.1815C117.124 37.7488 115.193 33.7579 113.571 31.5449C111.811 29.1459 110.038 28.2557 110.02 28.2456C109.979 28.2246 109.948 28.1883 109.933 28.1446C109.919 28.1009 109.922 28.0532 109.942 28.0117C109.952 27.991 109.966 27.9724 109.983 27.9571C110 27.9418 110.02 27.93 110.042 27.9225C110.064 27.915 110.087 27.912 110.11 27.9135C110.133 27.915 110.155 27.921 110.176 27.9313C110.251 27.969 112.034 28.8592 113.84 31.3186C115.5 33.5819 117.474 37.6406 117.474 44.1815C117.474 44.2045 117.47 44.2273 117.461 44.2486C117.453 44.27 117.44 44.2894 117.424 44.3058C117.408 44.3222 117.388 44.3352 117.367 44.344C117.346 44.3529 117.323 44.3575 117.3 44.3575Z",
    fill: "#DAC2FB"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M110.098 28.2632C110.065 28.2634 110.033 28.2543 110.006 28.2369C109.978 28.2195 109.956 28.1946 109.942 28.1651C109.922 28.1237 109.919 28.076 109.933 28.0322C109.948 27.9885 109.979 27.9522 110.02 27.9312C110.038 27.9312 111.816 27.0309 113.571 24.6319C115.193 22.4189 117.124 18.4281 117.124 11.9954C117.121 11.9707 117.124 11.9456 117.131 11.9218C117.138 11.8981 117.151 11.8762 117.167 11.8576C117.184 11.8389 117.204 11.824 117.227 11.8138C117.249 11.8036 117.274 11.7983 117.299 11.7983C117.324 11.7983 117.348 11.8036 117.371 11.8138C117.394 11.824 117.414 11.8389 117.431 11.8576C117.447 11.8762 117.46 11.8981 117.467 11.9218C117.474 11.9456 117.477 11.9707 117.474 11.9954C117.474 18.5337 115.5 22.6 113.84 24.8607C112.034 27.3176 110.251 28.2104 110.176 28.2456C110.152 28.2576 110.125 28.2636 110.098 28.2632Z",
    fill: "#DAC2FB"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M117.3 44.3575C117.253 44.3575 117.209 44.3389 117.176 44.3059C117.143 44.2729 117.124 44.2281 117.124 44.1815C117.124 37.6432 119.101 33.5768 120.758 31.3186C122.563 28.8592 124.349 27.969 124.424 27.9313C124.445 27.921 124.467 27.915 124.49 27.9135C124.513 27.912 124.536 27.915 124.558 27.9225C124.58 27.93 124.6 27.9418 124.617 27.9571C124.634 27.9724 124.648 27.991 124.658 28.0117C124.678 28.0535 124.681 28.1014 124.666 28.1452C124.651 28.189 124.619 28.225 124.578 28.2456C124.56 28.2456 122.782 29.1459 121.027 31.5449C119.407 33.7579 117.474 37.7488 117.474 44.1815C117.474 44.2045 117.47 44.2273 117.461 44.2486C117.453 44.27 117.44 44.2894 117.424 44.3058C117.408 44.3222 117.388 44.3352 117.367 44.344C117.346 44.3529 117.323 44.3575 117.3 44.3575Z",
    fill: "#DAC2FB"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M124.5 28.2632C124.474 28.2636 124.448 28.2576 124.425 28.2456C124.349 28.2104 122.564 27.3176 120.758 24.8607C119.101 22.5975 117.124 18.5362 117.124 11.9954C117.121 11.9707 117.124 11.9456 117.131 11.9218C117.138 11.8981 117.151 11.8762 117.167 11.8576C117.184 11.8389 117.204 11.824 117.227 11.8138C117.25 11.8036 117.274 11.7983 117.299 11.7983C117.324 11.7983 117.349 11.8036 117.371 11.8138C117.394 11.824 117.414 11.8389 117.431 11.8576C117.447 11.8762 117.46 11.8981 117.467 11.9218C117.475 11.9456 117.477 11.9707 117.474 11.9954C117.474 24.3176 124.515 27.896 124.578 27.9312C124.619 27.9518 124.651 27.9879 124.666 28.0316C124.681 28.0754 124.678 28.1234 124.658 28.1651C124.644 28.1948 124.622 28.2198 124.594 28.2372C124.565 28.2546 124.533 28.2636 124.5 28.2632Z",
    fill: "#DAC2FB"
  })), /*#__PURE__*/react.createElement("defs", null, /*#__PURE__*/react.createElement("clipPath", {
    id: "clip0_11616_27434"
  }, /*#__PURE__*/react.createElement("rect", {
    width: "124.358",
    height: "76.9231",
    fill: "white",
    transform: "translate(0.320801)"
  }))));
};
/* harmony default export */ const icons_IconEmptyList = (IconEmptyList);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/inbox/components/CommonNotificationList.tsx

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }









const DEFAULT_LIMIT = 5;
const emptyStr = "The void is real, but so are your possibilities. What's next?";
/**
 * -----
 * ```tsx
 * <list>
 *      <item>
 *          <card/>
 *      </item>
 *      ...
 * </list>
 * ```
 * @returns jsx
 */
const CommonNotificationList = ({
  clientId
}) => {
  const [query, setQueryState] = (0,react.useState)({
    offset: 0,
    limit: DEFAULT_LIMIT,
    client_id: clientId
  });
  const [removed, setRemovedState] = (0,react.useState)([]);
  const [isRemoving, setRemovingState] = (0,react.useState)(false);
  const {
    data,
    isLoading,
    isFinished
  } = (0,useCommonNotify/* default */.Z)(query);
  const renderList = (0,react.useMemo)(() => {
    return data.filter(item => !removed.some(inner => inner === item.user_relation_id));
    // return [];
  }, [data, removed]);
  const handleFetchMore = (0,react.useCallback)(() => {
    if (isLoading) {
      return;
    }
    setQueryState(prev => _objectSpread(_objectSpread({}, prev), {}, {
      offset: prev.offset + DEFAULT_LIMIT
    }));
  }, [isLoading]);
  const {
    setTargetState
  } = (0,useInfinity/* default */.Z)(handleFetchMore);
  const handleRemove = async id => {
    try {
      setRemovingState(true);
      const result = await MatrixClientPeg/* MatrixClientPeg */.p.get().removeNotification({
        id
      });
      setRemovedState(prev => [...prev, id]);
    } finally {
      setRemovingState(false);
    }
  };
  return /*#__PURE__*/react.createElement(AutoHideScrollbar/* default */.Z, {
    className: "mx_inbox_notification"
  }, renderList.map(item => {
    var _item$app_info, _item$app_info2;
    return /*#__PURE__*/react.createElement(NotificationItem/* default */.Z, {
      key: item.notice_id,
      showExternal: true,
      showAction: !((item === null || item === void 0 ? void 0 : (_item$app_info = item.app_info) === null || _item$app_info === void 0 ? void 0 : _item$app_info.app_name) === "Official information" || (item === null || item === void 0 ? void 0 : (_item$app_info2 = item.app_info) === null || _item$app_info2 === void 0 ? void 0 : _item$app_info2.app_name) === "SendingMe"),
      data: item,
      onRemove: handleRemove,
      isRemoving: isRemoving
    });
  }), isFinished && !isLoading && !Boolean(renderList.length) && /*#__PURE__*/react.createElement("div", {
    className: "mx_inbox_notification_empty"
  }, /*#__PURE__*/react.createElement(icons_IconEmptyList, null), /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)(emptyStr))), !isFinished && /*#__PURE__*/react.createElement("div", {
    ref: setTargetState
  }, isLoading && /*#__PURE__*/react.createElement(Spinner/* default */.Z, null)), /*#__PURE__*/react.createElement("div", {
    style: {
      height: "24px"
    }
  }));
};
/* harmony default export */ const components_CommonNotificationList = (CommonNotificationList);
// EXTERNAL MODULE: ./node_modules/sendingme-ui/dist/index.js
var sendingme_ui_dist = __webpack_require__(602271);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/common/emptyWidget/def.ts
var def = __webpack_require__(952469);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/common/emptyWidget/EmptyWidget.tsx
var EmptyWidget = __webpack_require__(167455);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/NotificationPanel.tsx

/*
Copyright 2016, 2019, 2021 The Matrix.org Foundation C.I.C.

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




// import { replaceableComponent } from "../../utils/replaceableComponent";



// import { MatrixEvent } from "matrix-js-sdk";
// import PinnedEventTile from "../views/rooms/PinnedEventTile";





// let lastActiveTab = "mention";

/*
 * Component which shows the global notification list using a TimelinePanel
 */ // @replaceableComponent("structures.NotificationPanel")
class NotificationPanel extends react.PureComponent {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "disposers", []);
  }
  componentDidMount() {
    const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
    cli.getRooms().filter(room => room.isAnnouncementRoom() && room.getMyMembership() === "join").forEach(room => {
      const forceUpdate = () => this.forceUpdate();
      room.on("Room.timeline", forceUpdate);
      this.disposers.push(() => room.off("Room.timeline", forceUpdate));
    });
  }
  componentWillUnmount() {
    this.disposers.forEach(d => d());
  }
  render() {
    const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
    const emptyState = /*#__PURE__*/react.createElement(sendingme_ui_dist.SdEmpty, {
      className: "mx_NotificationPanel_empty",
      image: /*#__PURE__*/react.createElement(EmptyWidget/* default */.Z, {
        coverType: def/* EmptyCoverType */.t.NOTICE
      }),
      description: (0,languageHandler._t)("You have no visible notification"),
      footer: null
    });
    let mentionContent;
    const timelineSet = cli.getNotifTimelineSet();
    if (timelineSet) {
      // wrap a TimelinePanel with the jump-to-event bits turned off.
      mentionContent = /*#__PURE__*/react.createElement(TimelinePanel/* default */.Z, {
        manageReadReceipts: false,
        manageReadMarkers: false,
        timelineSet: timelineSet,
        showUrlPreview: false,
        tileShape: EventTile/* TileShape */.GO.Notif,
        empty: emptyState,
        alwaysShowTimestamps: true,
        layout: Layout/* Layout */.A.Group
      });
    } else {
      console.error("No notifTimelineSet available!");
      // mentionContent = <Spinner />;
    }

    const notificationListContent = /*#__PURE__*/react.createElement(components_CommonNotificationList, null);
    const tabs = {
      [config/* SubMenuType */.MN.Mention]: mentionContent,
      [config/* SubMenuType */.MN.Notification]: notificationListContent
    };
    return tabs[this.props.activeTab];
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/v2/InboxContent.tsx




const InboxContent = ({
  activeTab
}) => {
  const [currentTab, setCurrentTab] = (0,react.useState)(activeTab !== null && activeTab !== void 0 ? activeTab : config/* SubMenuType */.MN.Mention);
  // const hasUnread = useHasUnReadNotification();

  (0,react.useEffect)(() => {
    const onTabChange = payload => {
      if (payload.action === config/* AbilityMenuType */.fL.Inbox) {
        setCurrentTab(payload.subMenuType);
      }
    };
    const flag = dispatcher/* default */.ZP.register(onTabChange);
    return () => {
      dispatcher/* default */.ZP.unregister(flag);
    };
  }, []);
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_NotificationPanel"
  }, /*#__PURE__*/react.createElement(NotificationPanel, {
    activeTab: currentTab
  }));
};
/* harmony default export */ const v2_InboxContent = (InboxContent);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/icons/IconDiscover.tsx

const IconDiscover = () => {
  return /*#__PURE__*/react.createElement("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react.createElement("path", {
    d: "M13.3967 1.66797H16.2183C17.3869 1.66797 18.3338 2.62285 18.3338 3.80127V6.64674C18.3338 7.82517 17.3869 8.78004 16.2183 8.78004H13.3967C12.2281 8.78004 11.2812 7.82517 11.2812 6.64674V3.80127C11.2812 2.62285 12.2281 1.66797 13.3967 1.66797"
  }), /*#__PURE__*/react.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3.78243 1.66797H6.60407C7.77262 1.66797 8.7195 2.62285 8.7195 3.80127V6.64674C8.7195 7.82517 7.77262 8.78004 6.60407 8.78004H3.78243C2.61387 8.78004 1.66699 7.82517 1.66699 6.64674V3.80127C1.66699 2.62285 2.61387 1.66797 3.78243 1.66797ZM3.78243 11.2226H6.60407C7.77262 11.2226 8.7195 12.1774 8.7195 13.3559V16.2013C8.7195 17.379 7.77262 18.3346 6.60407 18.3346H3.78243C2.61387 18.3346 1.66699 17.379 1.66699 16.2013V13.3559C1.66699 12.1774 2.61387 11.2226 3.78243 11.2226ZM16.2182 11.2226H13.3966C12.228 11.2226 11.2811 12.1774 11.2811 13.3559V16.2013C11.2811 17.379 12.228 18.3346 13.3966 18.3346H16.2182C17.3868 18.3346 18.3337 17.379 18.3337 16.2013V13.3559C18.3337 12.1774 17.3868 11.2226 16.2182 11.2226Z"
  }));
};
/* harmony default export */ const icons_IconDiscover = (IconDiscover);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/icons/IconExplore.tsx

const IconExplore = () => {
  return /*#__PURE__*/react.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/react.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2 12.5C2 9.71523 3.10625 7.04451 5.07538 5.07538C7.04451 3.10625 9.71523 2 12.5 2C15.2848 2 17.9555 3.10625 19.9246 5.07538C21.8938 7.04451 23 9.71523 23 12.5C23 15.2848 21.8938 17.9555 19.9246 19.9246C17.9555 21.8938 15.2848 23 12.5 23C9.71523 23 7.04451 21.8938 5.07538 19.9246C3.10625 17.9555 2 15.2848 2 12.5ZM11.12 9.2708C9.99975 10.1921 9.25117 11.4881 9.0128 12.9188L8.2244 17.6576C8.0432 18.7508 9.3152 19.4852 10.1708 18.7808L13.88 15.7292C15.0002 14.8079 15.7488 13.5119 15.9872 12.0812L16.7744 7.3424C16.9568 6.2492 15.6848 5.5148 14.8292 6.2192L11.12 9.2708Z"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M11 12.5C11 12.1022 11.158 11.7206 11.4393 11.4393C11.7206 11.158 12.1022 11 12.5 11C12.8978 11 13.2794 11.158 13.5607 11.4393C13.842 11.7206 14 12.1022 14 12.5C14 12.8978 13.842 13.2794 13.5607 13.5607C13.2794 13.842 12.8978 14 12.5 14C12.1022 14 11.7206 13.842 11.4393 13.5607C11.158 13.2794 11 12.8978 11 12.5Z"
  }));
};
/* harmony default export */ const icons_IconExplore = (IconExplore);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/icons/IconInbox.tsx

const IconInbox = () => {
  return /*#__PURE__*/react.createElement("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.5362 1.66797C15.2391 1.66791 15.8605 2.12459 16.0703 2.79543L17.5803 7.62832C17.6772 7.93865 17.7265 8.26189 17.7265 8.58702V16.1329C17.7265 16.5591 17.5572 16.9679 17.2558 17.2694C16.9544 17.5708 16.5456 17.7401 16.1193 17.7401H4.06522C3.63896 17.7401 3.23016 17.5708 2.92875 17.2694C2.62734 16.9679 2.45801 16.5591 2.45801 16.1329V8.58702C2.458 8.26189 2.50731 7.93865 2.60426 7.62832L4.11504 2.79543C4.32477 2.12487 4.94574 1.66826 5.64832 1.66797H14.5362ZM12.5028 10.5072H7.68116C7.23738 10.5073 6.87767 10.867 6.87767 11.3108C6.87767 11.7546 7.23738 12.1144 7.68116 12.1144H12.5028C12.9466 12.1144 13.3063 11.7546 13.3063 11.3108C13.3063 10.867 12.9466 10.5073 12.5028 10.5072ZM6.16367 3.67648H14.0213C14.3111 3.67683 14.5648 3.87099 14.6409 4.15061L15.7177 8.09632H4.46726L5.54329 4.15061L5.57142 4.06864C5.67214 3.83083 5.9054 3.67637 6.16367 3.67648Z"
  }));
};
/* harmony default export */ const icons_IconInbox = (IconInbox);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/IframeWidget.tsx + 7 modules
var IframeWidget = __webpack_require__(731400);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/PartnerStore.ts
var PartnerStore = __webpack_require__(456564);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/ExploreStore.ts
var ExploreStore = __webpack_require__(512892);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/lib/constants.ts
var constants = __webpack_require__(877294);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/inbox/components/NotificationDrawer.tsx + 6 modules
var NotificationDrawer = __webpack_require__(461951);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/inbox/useLeftPanelState.tsx
var useLeftPanelState = __webpack_require__(685070);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/icons/IconMore.tsx
var IconMore = __webpack_require__(416147);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/inbox/def.ts
var inbox_def = __webpack_require__(842456);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/browser-index.js
var browser_index = __webpack_require__(407637);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/ContactStore.ts + 1 modules
var ContactStore = __webpack_require__(476979);
// EXTERNAL MODULE: ./node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(727484);
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/autocomplete/QueryMatcher.ts
var QueryMatcher = __webpack_require__(745590);
// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__(496486);
// EXTERNAL MODULE: ./node_modules/ahooks/lib/index.js
var ahooks_lib = __webpack_require__(924737);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/layout/components/FriendRequestManagerProvider.tsx
var FriendRequestManagerProvider = __webpack_require__(873514);
// EXTERNAL MODULE: ./node_modules/rc-virtual-list/lib/index.js
var rc_virtual_list_lib = __webpack_require__(727032);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/avatar.ts
var avatar = __webpack_require__(9266);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/@types/user.ts
var _types_user = __webpack_require__(650540);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/mainContent/contact/RequestItem.tsx











let RequestCategory = /*#__PURE__*/function (RequestCategory) {
  RequestCategory["PENDING"] = "Pending";
  RequestCategory["PROCESSED"] = "Processed";
  RequestCategory["IN_THREE_DAYS"] = "InThreeDays";
  RequestCategory["OVER_THREE_DAYS"] = "OverThreeDays";
  return RequestCategory;
}({});
const RequestItem = /*#__PURE__*/(0,react.forwardRef)((props, ref) => {
  if (props.type) {
    const {
      type,
      count
    } = props;
    let header = null;
    if (type === RequestCategory.PENDING) {
      header = `Pending Request （${count}）`;
    } else if (type === RequestCategory.PROCESSED) {
      header = `Processed Request`;
    } else if (RequestCategory.IN_THREE_DAYS === type) {
      header = "Last 3 days";
    } else if (RequestCategory.OVER_THREE_DAYS === type) {
      header = "Over 3 days ago";
    }
    return /*#__PURE__*/react.createElement("div", {
      ref: ref
    }, header);
  }
  const user = props;
  const userAvater = user.avatar_url ? user.avatar_url : (0,avatar/* getDefaultAvatar */.W)({
    id: user.contact_id
  });
  const handleFriendRequestClick = () => {
    const _user = new browser_index/* User */.n5(user.contact_id);
    // ContactStore.instance.friendRequestSelect = user;
    // setSelect(user);

    dispatcher/* default */.ZP.dispatch({
      action: actions/* Action */.a.SetRightPanelPhase,
      phase: RightPanelStorePhases/* RightPanelPhases */.q4.UserProfile,
      refireParams: {
        member: _user
      }
    });
  };
  return /*#__PURE__*/react.createElement("div", {
    ref: ref,
    onClick: handleFriendRequestClick
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_friends_request_item",
    key: user.id
  }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdAvatar, {
    name: user.displayname,
    id: user === null || user === void 0 ? void 0 : user.contact_id,
    src: userAvater,
    size: "middle",
    className: "user_avatar"
  }), /*#__PURE__*/react.createElement("div", {
    className: "user_info"
  }, /*#__PURE__*/react.createElement("div", {
    className: "name"
  }, user.displayname), /*#__PURE__*/react.createElement(UserAssetTags, {
    user: user
  }), user !== null && user !== void 0 && user.request_message ? /*#__PURE__*/react.createElement("div", {
    className: "remarks"
  }, user.self ? "Me:" : "", user === null || user === void 0 ? void 0 : user.request_message) : null), /*#__PURE__*/react.createElement(RequestStatus, {
    stateCode: user.state,
    self: user.self
  })));
});
/* harmony default export */ const contact_RequestItem = (RequestItem);
function Tag(props) {
  const {
    assetTag
  } = props;
  let tag = null;
  let level = null;
  let type = null;
  switch (assetTag) {
    case "asset_level_3":
      tag = "$>1000";
      level = 3;
      type = "asset";
      break;
    case "asset_level_2":
      tag = "$>10000";
      level = 2;
      type = "asset";
      break;
    case "asset_level_1":
      tag = "Whale";
      level = 1;
      type = "asset";
      break;
    case "nft_level_1":
      tag = "Blue chip";
      level = 1;
      type = "nft";
      break;
    case "colleague":
      tag = "Colleague";
      level = 1;
      type = "colleague";
      break;
    default:
      break;
  }
  if (!level) return null;
  return /*#__PURE__*/react.createElement("div", {
    className: classnames_default()({
      asset_tag: true,
      [`asset_tag_type_${type}`]: type,
      [`asset_tag_level_${type}_${level}`]: level
    })
  }, tag);
}
function UserAssetTags(props) {
  var _tags;
  const {
    user
  } = props;
  const userShip = ContactStore["default"].instance.getUserShip(user.contact_id);
  const isColleague = userShip.includes(_types_user/* UserShip */.J.Colleague);
  let tags = [];
  if (user.self) {
    var _user$extend_json;
    tags = ((_user$extend_json = user.extend_json) === null || _user$extend_json === void 0 ? void 0 : _user$extend_json.reciever_tags) || [];
  } else {
    var _user$extend_json2;
    tags = ((_user$extend_json2 = user.extend_json) === null || _user$extend_json2 === void 0 ? void 0 : _user$extend_json2.sender_tags) || [];
  }
  if (!Array.isArray(tags) && !isColleague) return null;
  if (((_tags = tags) === null || _tags === void 0 ? void 0 : _tags.length) === 0 && !isColleague) return null;
  return /*#__PURE__*/react.createElement("div", {
    className: "asset_tag_area"
  }, isColleague && /*#__PURE__*/react.createElement(Tag, {
    assetTag: "colleague"
  }), tags.map(t => /*#__PURE__*/react.createElement(Tag, {
    assetTag: t,
    key: t
  })));
}
function RequestStatus(props) {
  const {
    stateCode,
    self
  } = props;
  switch (stateCode) {
    case 1:
      if (self) {
        return /*#__PURE__*/react.createElement("div", {
          className: "request_status"
        }, "Request sent");
      } else {
        return /*#__PURE__*/react.createElement("div", {
          className: "request_status"
        }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdButton, {
          type: "default"
        }, (0,languageHandler._t)("View")));
      }
    case 2:
      return /*#__PURE__*/react.createElement("div", {
        className: "request_status"
      }, "Declined");
    case 3:
      return /*#__PURE__*/react.createElement("div", {
        className: "request_status"
      }, "Accepted");
    case 4:
      return /*#__PURE__*/react.createElement("div", {
        className: "request_status"
      }, "Rejected");
    case 5:
      return /*#__PURE__*/react.createElement("div", {
        className: "request_status"
      }, "Delete");
  }
}
// EXTERNAL MODULE: ./node_modules/lodash-es/orderBy.js
var orderBy = __webpack_require__(803695);
// EXTERNAL MODULE: ./node_modules/lodash-es/flatten.js
var flatten = __webpack_require__(727961);
// EXTERNAL MODULE: ./node_modules/lodash-es/partition.js
var partition = __webpack_require__(943382);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/mainContent/contact/FriendsRequest.tsx














const FriendsRequest = /*#__PURE__*/(0,react.memo)(() => {
  var _ref$current;
  const [requestsList, setRequestsList] = (0,react.useState)([]);
  const [select, setSelect] = (0,react.useState)();
  const [spin, setSpin] = (0,react.useState)(false);
  const [valueInput, setValueInput] = (0,react.useState)();
  const searchRef = (0,react.useRef)();
  const ref = (0,react.useRef)();
  (0,ahooks_lib.useMount)(() => {
    const allRequests = ContactStore["default"].instance.useContactStore.getState().friendRequestList;
    (0,FriendRequestManagerProvider/* markFriendRequests */.I7)(allRequests.map(item => item.id));
    (0,FriendRequestManagerProvider/* calculateNewFriendRequest */.RH)();
  });
  (0,react.useEffect)(() => {
    ContactStore["default"].instance.on(ContactStore/* FRIEND_REQUEST_UPDATE_EVENT */.ZI, handFriendRequestUpdate);
    const {
      friendRequestSelect,
      friendRequestList
    } = ContactStore["default"].instance;
    setRequestsList(friendRequestList);
    if (friendRequestList.length === 0) {
      setSpin(true);
      ContactStore["default"].instance.fetchFriendRequestList();
    }
    setSelect(friendRequestSelect);
    return () => {
      ContactStore["default"].instance.off(ContactStore/* FRIEND_REQUEST_UPDATE_EVENT */.ZI, handFriendRequestUpdate);
    };
  }, []);
  const handFriendRequestUpdate = () => {
    let friendRequestList = ContactStore["default"].instance.friendRequestList;
    setSpin(false);
    setRequestsList([...friendRequestList]);
  };
  const data = (0,react.useMemo)(() => {
    // const pendingRequestList = [];
    // const processedRequests = [];
    const inThreeDaysRequests = [];
    const overThreeDaysRequests = [];
    let queryResultList = requestsList;
    if (valueInput) {
      queryResultList = new QueryMatcher/* default */.Z(requestsList, {
        keys: ["displayname", "wallet_address"],
        shouldMatchWordsOnly: false
      }).match(valueInput);
    }

    // for (let i = 0; i < queryResultList.length; i++) {
    //     if (queryResultList[i].state === 1 && !queryResultList[i].self) {
    //         pendingRequestList.push(queryResultList[i])
    //     } else {
    //         processedRequests.push(queryResultList[i])
    //     }
    // }

    for (let i = 0; i < queryResultList.length; i++) {
      const createDate = dayjs_min_default()(queryResultList[i].created_at);
      const now = dayjs_min_default()(Date.now());
      const diffInDays = now.diff(createDate, "day");
      if (diffInDays <= 3) {
        inThreeDaysRequests.push(queryResultList[i]);
      } else {
        overThreeDaysRequests.push(queryResultList[i]);
      }
    }

    // {renderFirendListArea(RequestCategory.IN_THREE_DAYS)}
    //                     {renderFirendListArea(RequestCategory.OVER_THREE_DAYS)}

    return [inThreeDaysRequests.length > 0 && {
      type: RequestCategory.IN_THREE_DAYS,
      id: RequestCategory.IN_THREE_DAYS,
      count: inThreeDaysRequests.length
    }, ...(0,orderBy/* default */.Z)((0,flatten/* default */.Z)((0,partition/* default */.Z)(inThreeDaysRequests, ["self", false])), ["state", "create_at"], ["asc", "desc"]), overThreeDaysRequests.length > 0 && {
      type: RequestCategory.OVER_THREE_DAYS,
      id: RequestCategory.OVER_THREE_DAYS,
      count: overThreeDaysRequests.length
    }, ...(0,orderBy/* default */.Z)((0,flatten/* default */.Z)((0,partition/* default */.Z)(overThreeDaysRequests, ["self", false])), ["state", "create_at"], ["asc", "desc"])].filter(Boolean);

    // return {
    //     pendingRequestList,
    //     processedRequests,
    //     inThreeDaysRequests,
    //     overThreeDaysRequests,
    // };
  }, [requestsList, valueInput]);
  function renderSearchArea() {
    const placeholder = (0,languageHandler._t)("Search");
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_friends_request_search_wrapper"
    }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
      icon: "SearchOutlines",
      className: "search_icon"
    }), /*#__PURE__*/react.createElement("input", {
      ref: searchRef,
      type: "text",
      className: "search_input",
      onChange: (0,lodash.debounce)(e => {
        setValueInput(e.target.value);
      }, 300),
      placeholder: placeholder,
      autoComplete: "off"
    }), valueInput && /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      tabIndex: -1,
      title: (0,languageHandler._t)("Clear filter"),
      className: "search_clear",
      onClick: () => {
        searchRef.current && (searchRef.current.value = "");
        setValueInput("");
      }
    }));
  }
  if (spin) {
    return /*#__PURE__*/react.createElement(ErrorBoundary/* default */.Z, null, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdSkeleton.SimpleList, {
      rows: 8,
      active: true,
      style: {
        width: "600px"
      }
    }));
  }
  return /*#__PURE__*/react.createElement(ErrorBoundary/* default */.Z, null, /*#__PURE__*/react.createElement("div", {
    className: "mx_friends_request"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_friends_request_left"
  }, renderSearchArea(), /*#__PURE__*/react.createElement("div", {
    className: "mx_friends_request_list_wrapper",
    ref: ref
  }, /*#__PURE__*/react.createElement(rc_virtual_list_lib["default"], {
    "aria-disabled": true,
    data: data,
    itemKey: "id",
    height: ((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.clientHeight) || 600,
    itemHeight: 97,
    style: {
      maxWidth: 612
    }
  }, item => /*#__PURE__*/react.createElement(contact_RequestItem, item))))));
});
FriendsRequest.displayName = 'FriendsRequest';
/* harmony default export */ const contact_FriendsRequest = (FriendsRequest);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/room-list/invitationStore.ts
var invitationStore = __webpack_require__(206749);
// EXTERNAL MODULE: ./node_modules/zustand/esm/index.mjs + 1 modules
var esm = __webpack_require__(830270);
// EXTERNAL MODULE: ./node_modules/zustand/esm/middleware/immer.mjs
var immer = __webpack_require__(118753);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/stores/OfficialSquadStateStore.ts



const INIT_TIME_STAMP_STATE = {
  dataSet: new Set(),
  data: []
};
const useOfficialSquadStore = (0,esm/* create */.Ue)((0,immer/* immer */.n)(() => INIT_TIME_STAMP_STATE));
const RefreshOfficialSquadData = async () => {
  try {
    const data = await MatrixClientPeg/* MatrixClientPeg */.p.get().fetchFullOfficialSquadList();
    // console.log({ data });
    useOfficialSquadStore.setState(draft => {
      draft.data = data;
      draft.dataSet = new Set(data);
    });
  } catch (error) {
    console.log("error for fetch official squad account:", error);
  }
};
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/right_panel/InviteGroupPanel.tsx
var InviteGroupPanel = __webpack_require__(289791);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/icons/IconOfficial.tsx
var IconOfficial = __webpack_require__(65246);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/invite/InvitationListItem.tsx











const InvitationListItem = props => {
  if (props.data.type) {
    return /*#__PURE__*/react.createElement(CategoryHeader, props.data);
  }
  return /*#__PURE__*/react.createElement(ListItem, props);
};
/* harmony default export */ const invite_InvitationListItem = (InvitationListItem);
function CategoryHeader(props) {
  const {
    type
  } = props;
  let header = null;
  if (RequestCategory.IN_THREE_DAYS === type) {
    header = "Last 3 days";
  } else if (RequestCategory.OVER_THREE_DAYS === type) {
    header = "Over 3 days ago";
  }
  return /*#__PURE__*/react.createElement("div", null, header);
}
function ListItem(props) {
  var _inviteMember$events$, _inviteMember$events$2, _inviteMember$events, _inviteMember$events$3;
  const {
    data,
    className,
    onClick
  } = props;
  const room = data;
  const cli = (0,react.useContext)(MatrixClientContext/* default */.Z);
  const officialSquadDataSet = useOfficialSquadStore(state => state.dataSet);
  const {
    data: roomDetails,
    loading
  } = (0,ahooks_lib.useRequest)(() => cli.getSdnSquadInfo$$(room.roomId));
  if (!room) {
    return null;
  }
  const inviteMember = room.getMember(cli.getUserId());
  const inviteSender = inviteMember === null || inviteMember === void 0 ? void 0 : (_inviteMember$events$ = inviteMember.events.member) === null || _inviteMember$events$ === void 0 ? void 0 : _inviteMember$events$.getSender();
  const {
    content: {
      sender_display_name = ""
    }
  } = (_inviteMember$events$2 = inviteMember === null || inviteMember === void 0 ? void 0 : (_inviteMember$events = inviteMember.events) === null || _inviteMember$events === void 0 ? void 0 : (_inviteMember$events$3 = _inviteMember$events.member) === null || _inviteMember$events$3 === void 0 ? void 0 : _inviteMember$events$3.event) !== null && _inviteMember$events$2 !== void 0 ? _inviteMember$events$2 : {};
  if (loading) {
    return /*#__PURE__*/react.createElement(lib.Skeleton, {
      style: {
        maxWidth: "650px",
        marginTop: "10px"
      },
      avatar: true,
      paragraph: {
        rows: 1
      }
    });
  }
  return /*#__PURE__*/react.createElement("div", {
    key: room.roomId,
    className: classnames_default()(`mx_NotificationPanel_GroupInvitation_item`, className),
    onClick: onClick(room)
  }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdAvatar, {
    name: (roomDetails === null || roomDetails === void 0 ? void 0 : roomDetails.name) || room.name,
    id: room.roomId,
    src: room.getAvatarUrl(),
    size: 48,
    type: "round"
  }), /*#__PURE__*/react.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/react.createElement(lib.Typography.Text, {
    type: "secondary"
  }, /*#__PURE__*/react.createElement("b", null, sender_display_name), /*#__PURE__*/react.createElement("span", null, ` (${(0,strings/* getDisplayAddress */.yd)(inviteSender)}) `), (0,languageHandler._t)(`invites you to join ${room.isGroup() ? "Group" : room.isSpaceRoom() ? "squad" : room.isDmRoom() ? "DM" : "channel"}`)), /*#__PURE__*/react.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }
  }, officialSquadDataSet.has(room.roomId) ? /*#__PURE__*/react.createElement("div", {
    style: {
      display: "flex",
      marginBottom: "-3px"
    }
  }, /*#__PURE__*/react.createElement(IconOfficial/* default */.Z, null)) : null, /*#__PURE__*/react.createElement(lib.Typography.Title, {
    ellipsis: true,
    level: 5,
    style: {
      margin: 0
    }
  }, (roomDetails === null || roomDetails === void 0 ? void 0 : roomDetails.name) || room.name))), /*#__PURE__*/react.createElement(sendingme_ui_dist.SdButton, {
    type: "default"
  }, (0,languageHandler._t)("View")));
}
// EXTERNAL MODULE: ./node_modules/lodash-es/sortBy.js
var sortBy = __webpack_require__(898697);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/notifications/RoomNotificationStateStore.ts + 3 modules
var RoomNotificationStateStore = __webpack_require__(16033);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/invite/utils/roomMarkerTools.ts


const ROOM_GROUP_INVITATION_KEY = "ROOM_GROUP_INVITATION_KEY";
const ROOM_SQUAD_INVITATION_KEY = "ROOM_SQUAD_INVITATION_KEY";
const ROOM_WORKS_INVITATION_KEY = "ROOM_WORKS_INVITATION_KEY";
function transfer(str) {
  return typeof str === 'string' && str.length > 0 ? str.split(',') : [];
}
const readGroupMark = () => {
  const result = window.localStorage.getItem(ROOM_GROUP_INVITATION_KEY);
  return transfer(result);
};
const readSquadMark = () => {
  const result = window.localStorage.getItem(ROOM_SQUAD_INVITATION_KEY);
  return transfer(result);
};
const readWorksMark = () => {
  const result = window.localStorage.getItem(ROOM_WORKS_INVITATION_KEY);
  return transfer(result);
};

// ----

const markRoom2Storage = (type, str) => {
  window.localStorage.setItem(type, str);
};
const markGroupRoomInvitations = rooms => {
  const ids = rooms.map(room => room.roomId);
  markRoom2Storage(ROOM_GROUP_INVITATION_KEY, ids.toString());
};
const markSquadRoomInvitation = rooms => {
  const ids = rooms.map(room => room.roomId);
  markRoom2Storage(ROOM_SQUAD_INVITATION_KEY, ids.toString());
};
const markWorkRoomInvitation = rooms => {
  const ids = rooms.map(room => room.roomId);
  markRoom2Storage(ROOM_WORKS_INVITATION_KEY, ids.toString());
};

// ----

const forceAddNewCommunityRoom = roomId => {
  const squads = readSquadMark();
  const res = squads.filter(room => room !== roomId);
  markRoom2Storage(ROOM_SQUAD_INVITATION_KEY, res.toString());
};
const forceAddNewWorkRoom = roomId => {
  const works = readWorksMark();
  const res = works.filter(room => room !== roomId);
  markRoom2Storage(ROOM_WORKS_INVITATION_KEY, res.toString());
};
const forceAddNewGroupRoom = roomId => {
  const groups = readGroupMark();
  const res = groups.filter(room => room !== roomId);
  markRoom2Storage(ROOM_GROUP_INVITATION_KEY, res.toString());
};

// ----

const calculateNewInvitations = () => {
  const groups = new Set(readGroupMark());
  const squads = new Set(readSquadMark());
  const works = new Set(readWorksMark());
  const groupInvitations = invitationStore/* useInvitationStore */.F.getState().groups;
  const squadInvitations = invitationStore/* useInvitationStore */.F.getState().squad;
  const workInvitations = invitationStore/* useInvitationStore */.F.getState().works;
  const newGroups = groupInvitations.filter(room => !groups.has(room.roomId));
  const newSquads = squadInvitations.filter(room => !squads.has(room.roomId));
  const newWorks = workInvitations.filter(room => !works.has(room.roomId));
  console.log('%c echo calculateNewInvitations', 'color: red;');
  RoomNotificationStateStore/* RoomNotificationStateStore */.v.instance.useRoomInvitationNoticeState.setState(draft => {
    draft.newGroupInvitation = newGroups.length;
    draft.newSquadInvitation = newSquads.length;
    draft.newWorksInvitation = newWorks.length;
    draft.allInvitations = newGroups.length + newSquads.length + newWorks.length;
  });
};
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/invite/InvitationRoom.tsx




















const InvitationRoom = ({
  resizeNotifier,
  defaultScene
}) => {
  var _ref$current;
  const cli = (0,react.useContext)(MatrixClientContext/* default */.Z);
  const currentScene = defaultScene || (cli === null || cli === void 0 ? void 0 : cli.getChatScene());
  const ref = (0,react.useRef)();
  (0,ahooks_lib.useRequest)(RefreshOfficialSquadData);
  const groupInvitations = (0,invitationStore/* useInvitationStore */.F)(state => state.groups);
  const workInvitations = (0,invitationStore/* useInvitationStore */.F)(state => state.works);
  const squadInvitations = (0,invitationStore/* useInvitationStore */.F)(state => state.squad);
  const [select, setSelect] = (0,react.useState)();
  const renderList = (0,react.useMemo)(() => {
    if (currentScene === browser_index/* ChatScene */.rw.Friend) {
      return groupInvitations;
    } else if (currentScene === browser_index/* ChatScene */.rw.Community) {
      return squadInvitations;
    } else {
      return workInvitations;
    }
  }, [currentScene, groupInvitations, squadInvitations, workInvitations]);
  const data = (0,react.useMemo)(() => {
    const inThreeDaysRequests = [];
    const overThreeDaysRequests = [];
    let queryResultList = (0,sortBy/* default */.Z)(renderList, room => {
      var _room$getMembers, _room$getMembers$find, _room$getMembers$find2, _room$getMembers$find3, _room$getMembers$find4;
      return -(room === null || room === void 0 ? void 0 : (_room$getMembers = room.getMembers()) === null || _room$getMembers === void 0 ? void 0 : (_room$getMembers$find = _room$getMembers.find(member => (member === null || member === void 0 ? void 0 : member.userId) === MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId() && (member === null || member === void 0 ? void 0 : member.membership) === "invite")) === null || _room$getMembers$find === void 0 ? void 0 : (_room$getMembers$find2 = _room$getMembers$find.events) === null || _room$getMembers$find2 === void 0 ? void 0 : (_room$getMembers$find3 = _room$getMembers$find2.member) === null || _room$getMembers$find3 === void 0 ? void 0 : (_room$getMembers$find4 = _room$getMembers$find3.event) === null || _room$getMembers$find4 === void 0 ? void 0 : _room$getMembers$find4.origin_server_ts);
    });
    for (let i = 0; i < queryResultList.length; i++) {
      var _queryResultList$i$ge, _queryResultList$i$ge2, _queryResultList$i$ge3, _queryResultList$i$ge4;
      const invateDate = (_queryResultList$i$ge = queryResultList[i].getMembers().find(member => member.userId === MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId() && member.membership === "invite")) === null || _queryResultList$i$ge === void 0 ? void 0 : (_queryResultList$i$ge2 = _queryResultList$i$ge.events) === null || _queryResultList$i$ge2 === void 0 ? void 0 : (_queryResultList$i$ge3 = _queryResultList$i$ge2.member) === null || _queryResultList$i$ge3 === void 0 ? void 0 : (_queryResultList$i$ge4 = _queryResultList$i$ge3.event) === null || _queryResultList$i$ge4 === void 0 ? void 0 : _queryResultList$i$ge4.origin_server_ts;
      if (!invateDate) {
        overThreeDaysRequests.push(queryResultList[i]);
        continue;
      }
      const createDate = dayjs_min_default()(invateDate);
      const now = dayjs_min_default()(Date.now());
      const diffInDays = now.diff(createDate, "day");
      if (diffInDays <= 3) {
        inThreeDaysRequests.push(queryResultList[i]);
      } else {
        overThreeDaysRequests.push(queryResultList[i]);
      }
    }
    return [inThreeDaysRequests.length > 0 && {
      type: RequestCategory.IN_THREE_DAYS,
      roomId: RequestCategory.IN_THREE_DAYS,
      count: inThreeDaysRequests.length
    }, ...inThreeDaysRequests, overThreeDaysRequests.length > 0 && {
      type: RequestCategory.OVER_THREE_DAYS,
      roomId: RequestCategory.OVER_THREE_DAYS,
      count: overThreeDaysRequests.length
    }, ...overThreeDaysRequests].filter(Boolean);
  }, [renderList]);
  const sider = select !== null && select !== void 0 && select.roomId ? /*#__PURE__*/react.createElement("aside", {
    className: "mx_RightPanel mx_RightPanel_Room_invitation",
    id: "mx_RightPanel"
  }, /*#__PURE__*/react.createElement(InviteGroupPanel/* default */.Z, {
    room: select,
    onClose: () => {
      setSelect(null);
    }
  })) : null;
  const handleClick = room => () => {
    handleClickContent(room);
    // defaultDispatcher.dispatch({
    //     action: "view_room",
    //     show_room_tile: true, // make sure the room is visible in the list
    //     room_id: room.roomId,
    //     clear_search: true,
    //     tag: "",
    // });
  };

  const handleClickContent = room => {
    setSelect(room);
  };
  (0,react.useEffect)(() => {
    if (currentScene === browser_index/* ChatScene */.rw.Friend) {
      markGroupRoomInvitations(invitationStore/* useInvitationStore */.F.getState().groups);
    }
    if (currentScene === browser_index/* ChatScene */.rw.Community) {
      markSquadRoomInvitation(invitationStore/* useInvitationStore */.F.getState().squad);
    }
    if (currentScene === browser_index/* ChatScene */.rw.Work) {
      markWorkRoomInvitation(invitationStore/* useInvitationStore */.F.getState().works);
    }
    calculateNewInvitations();
    return () => null;
  }, [currentScene]);
  if (!data) {
    return /*#__PURE__*/react.createElement(ErrorBoundary/* default */.Z, null, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdSkeleton.SimpleList, {
      rows: 8,
      active: true,
      style: {
        width: "600px"
      }
    }));
  }
  return /*#__PURE__*/react.createElement(MainSplit/* default */.Z, {
    resizeNotifier: resizeNotifier
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_LeftPanelContent"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_LeftPanelContent_header"
  }, /*#__PURE__*/react.createElement(HomeButton/* default */.Z, {
    title: (0,languageHandler._t)(`${currentScene === browser_index/* ChatScene */.rw.Friend ? "Group" : "Squad"} Invitation ${renderList !== null && renderList !== void 0 && renderList.length ? `(${renderList.length})` : ""}`)
  })), /*#__PURE__*/react.createElement("div", {
    className: "mx_LeftPanelContent_content"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_NotificationPanel"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_NotificationPanel_GroupInvitation_container"
  }, /*#__PURE__*/react.createElement(rc_virtual_list_lib["default"], {
    "aria-disabled": true,
    data: data,
    itemKey: "roomId",
    height: ((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.clientHeight) || 600,
    itemHeight: 97,
    style: {
      maxWidth: 612
    }
  }, item => /*#__PURE__*/react.createElement(invite_InvitationListItem, {
    data: item,
    className: classnames_default()({
      mx_NotificationPanel_GroupInvitation_item_selected: (item === null || item === void 0 ? void 0 : item.roomId) === (select === null || select === void 0 ? void 0 : select.roomId)
    }),
    onClick: handleClick
  }))), sider))));
};
/* harmony default export */ const invite_InvitationRoom = (InvitationRoom);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/mainContent/contact/ContactPanel.tsx

/*
Copyright 2016, 2019, 2021 The Matrix.org Foundation C.I.C.

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



// import { replaceableComponent } from "../../../../utils/replaceableComponent";




// let lastActiveTab = "mention";

/*
 * Component which shows the global notification list using a TimelinePanel
 */ // @replaceableComponent("structures.ContactPanel")
class ContactPanel extends react.PureComponent {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "disposers", []);
  }
  componentWillUnmount() {
    this.disposers.forEach(d => d());
  }
  render() {
    const recommendation = /*#__PURE__*/react.createElement(Recommendations["default"], {
      key: "contact",
      contactPage: true,
      resizeNotifier: this.props.resizeNotifier,
      withWrapper: true
    });
    const groupInvitation = /*#__PURE__*/react.createElement(invite_InvitationRoom, {
      key: config/* SubMenuType */.MN.GroupInvitation,
      resizeNotifier: this.props.resizeNotifier,
      defaultScene: browser_index/* ChatScene */.rw.Friend
    });
    const squadInvitation = /*#__PURE__*/react.createElement(invite_InvitationRoom, {
      key: config/* SubMenuType */.MN.SquadInvitation,
      resizeNotifier: this.props.resizeNotifier,
      defaultScene: browser_index/* ChatScene */.rw.Community
    });
    const tabs = {
      [config/* SubMenuType */.MN.Recommendation]: recommendation,
      [config/* SubMenuType */.MN.FriendsRequest]: /*#__PURE__*/react.createElement(contact_FriendsRequest, null),
      [config/* SubMenuType */.MN.GroupInvitation]: groupInvitation,
      [config/* SubMenuType */.MN.SquadInvitation]: squadInvitation
    };
    return tabs[this.props.activeTab];
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/notifications/SubMenuState.ts
var SubMenuState = __webpack_require__(487406);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/mainContent/contact/ContactContent.tsx





const ContactContent = ({
  activeTab,
  resizeNotifier
}) => {
  const subSelected = (0,SubMenuState/* useMenuStateStore */.x)(state => state.SubMenuType);
  const isContactSubSelected = ["Friend Requests", "Recommendation", "Group Invitation", "Squad Invitation"].includes(subSelected);
  const hiddenComponentWrapper = ["Group Invitation", "Squad Invitation"].includes(subSelected);
  const [currentTab, setCurrentTab] = (0,react.useState)(() => {
    return isContactSubSelected ? subSelected : activeTab !== null && activeTab !== void 0 ? activeTab : config/* SubMenuType */.MN.Recommendation;
  });
  // const hasUnread = useHasUnReadNotification();

  (0,react.useEffect)(() => {
    const onTabChange = payload => {
      if (payload.action === config/* AbilityMenuType */.fL.Contact) {
        setCurrentTab(payload.subMenuType);
      }
    };
    const flag = dispatcher/* default */.ZP.register(onTabChange);
    return () => {
      dispatcher/* default */.ZP.unregister(flag);
    };
  }, []);
  if (hiddenComponentWrapper) {
    return /*#__PURE__*/react.createElement(ContactPanel, {
      resizeNotifier: resizeNotifier,
      activeTab: currentTab
    });
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_ContactPanel"
  }, /*#__PURE__*/react.createElement(ContactPanel, {
    resizeNotifier: resizeNotifier,
    activeTab: currentTab
  }));
};
/* harmony default export */ const contact_ContactContent = (ContactContent);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/right_panel/SeaUserProfile/SeaUserProfile.tsx + 3 modules
var SeaUserProfile = __webpack_require__(128370);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/LeftPanelContent.tsx


function LeftPanelContent_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function LeftPanelContent_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? LeftPanelContent_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : LeftPanelContent_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }





































const treatUrl = url => {
  let clientId = "";
  try {
    const Url = new URL(url);
    clientId = Url.hostname.split(".").join("-");
  } catch (e) {
    clientId = (url.split("//")[1] || url).split(".").join("-");
  }
  return clientId;
};
const DAppContent = () => {
  const [data, setData] = (0,react.useState)([]);
  const [loading, setLoading] = (0,react.useState)(true);
  const [currentSelectedState, setCurrentSelected] = (0,react.useState)('');
  const uiStateForTab = LeftPanelStore/* default */.ZP.instance.useLeftPanelStore.getState().uiStateForTab;
  const state = uiStateForTab[LeftPanelStore/* DAPP_TAB */.bJ];
  const handlerSelected = data => {
    const clientId = treatUrl(data.url);
    setCurrentSelected(data.name);
    dispatcher/* default */.ZP.dispatch({
      action: LeftPanelStore/* CHANGE_LEFT_PANEL_UI_STATE */.Us,
      target: LeftPanelStore/* DAPP_TAB */.bJ,
      value: {
        clientId,
        openPanel: treatUrl(data.url) === (state === null || state === void 0 ? void 0 : state.clientId) ? !(state !== null && state !== void 0 && state.openPanel) : true
      }
    });
  };
  (0,react.useEffect)(() => {
    PartnerStore/* default */.Z.instance.getPartners().then(() => {
      setData(PartnerStore/* default */.Z.instance.partners);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);
  let polygon = data === null || data === void 0 ? void 0 : data.find(d => d.url.indexOf("https://w3w.ai") > -1);
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_LeftPanelContent_content_inner"
  }, loading ? /*#__PURE__*/react.createElement(Spinner/* default */.Z, null) : /*#__PURE__*/react.createElement(dist.Dapp.Group, null, polygon && /*#__PURE__*/react.createElement(PolygonView, {
    polygon: polygon,
    onClick: handlerSelected
  }), data.filter(d => d.url !== (polygon === null || polygon === void 0 ? void 0 : polygon.url)).map(data => /*#__PURE__*/react.createElement(dist.Dapp.Item, (0,esm_extends/* default */.Z)({}, data, {
    key: data.url,
    active: data.name === currentSelectedState,
    id: data.id ? data.id + "" : "",
    onClick: () => handlerSelected(data)
  })))));
};
const PolygonIcon = () => /*#__PURE__*/react.createElement("svg", {
  width: "58",
  height: "58",
  viewBox: "0 0 58 58",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/react.createElement("rect", {
  x: "0.698975",
  y: "0.698975",
  width: "57.301",
  height: "57.301",
  rx: "10",
  fill: "url(#paint0_linear_7201_116140)"
}), /*#__PURE__*/react.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M18.3486 28.0764H15.4675C14.4928 28.0764 13.7 27.2835 13.7 26.3089V15.7675C13.7 14.7929 14.4928 14 15.4675 14H26.0088C26.9834 14 27.7764 14.7929 27.7764 15.7675V22.9329C27.7742 22.9588 27.7731 22.9849 27.7731 23.0112V34.0643L24.1134 36.2319L20.4538 34.0643V29.7276L24.1134 27.56L26.5268 28.9907V26.0815L24.561 24.9156C24.4258 24.8358 24.2704 24.7928 24.1134 24.7928C23.9565 24.7928 23.8011 24.8358 23.6659 24.9156L18.4476 28.0082C18.4129 28.0288 18.3799 28.0516 18.3486 28.0764ZM30.2 21.0422L33.439 19.1226C33.7141 18.9599 34.0575 18.9583 34.3341 19.1226L39.5524 22.2153C39.8291 22.3796 40 22.6842 40 23.0112V28.2258H42.508C43.4831 28.2258 44.2764 27.4328 44.2764 26.4582V15.9169C44.2764 14.9423 43.4831 14.1494 42.508 14.1494H31.9667C30.9925 14.1494 30.2 14.9423 30.2 15.9169V21.0422ZM39.5396 30L34.3341 33.085H34.3326C34.0575 33.2477 33.7141 33.2477 33.4375 33.085L31.4747 31.9223V29.0131L33.885 30.4406L37.5447 28.273V23.9363L33.885 21.7687L30.2922 23.898L30.2269 23.9363V34.9894C30.2269 35.0655 30.2176 35.1404 30.2 35.2125V42.3088C30.2 43.2834 30.9924 44.0764 31.9667 44.0764H42.508C43.483 44.0764 44.2763 43.2835 44.2763 42.3088V31.7676C44.2763 30.7929 43.483 30 42.508 30H39.5396ZM27.7765 36.9723V42.2324C27.7765 43.2071 26.9835 44 26.0089 44H15.4676C14.493 44 13.7 43.2071 13.7 42.2324V31.6912C13.7 30.7166 14.493 29.9236 15.4676 29.9236H18V34.9894C18 35.3164 18.1709 35.621 18.4476 35.7853L23.6659 38.878C23.9425 39.0407 24.2844 39.0407 24.561 38.878L27.7765 36.9723Z",
  fill: "white"
}), /*#__PURE__*/react.createElement("defs", null, /*#__PURE__*/react.createElement("linearGradient", {
  id: "paint0_linear_7201_116140",
  x1: "1",
  y1: "60.5",
  x2: "62.5",
  y2: "6",
  gradientUnits: "userSpaceOnUse"
}, /*#__PURE__*/react.createElement("stop", {
  "stop-color": "#A428C4"
}), /*#__PURE__*/react.createElement("stop", {
  offset: "1",
  "stop-color": "#703CCD"
}))));
const PolygonView = props => {
  var _props$polygon;
  const style = {};
  if ((_props$polygon = props.polygon) !== null && _props$polygon !== void 0 && _props$polygon.avatar) {
    style["--avatar"] = `url(${props.polygon.avatar})`;
  }
  const onClick = () => {
    if (props.onClick) {
      props.onClick(LeftPanelContent_objectSpread({}, props.polygon));
    }
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "dapp_item mx_Dapp_polygon",
    onClick: onClick
  }, /*#__PURE__*/react.createElement("div", {
    className: "dapp_item_bg",
    style: style
  }), /*#__PURE__*/react.createElement("div", {
    className: "mx_Dapp_polygon_left"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_Dapp_polygon_item"
  }, /*#__PURE__*/react.createElement(lib.Avatar, {
    shape: "square",
    size: 58,
    src: /*#__PURE__*/react.createElement(PolygonIcon, null)
  }), /*#__PURE__*/react.createElement("div", {
    className: "mx_Dapp_polygon_item_content"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_Dapp_polygon_item_content_title"
  }, "Dapps Discovery"), /*#__PURE__*/react.createElement("div", null, "Build with", /*#__PURE__*/react.createElement("span", {
    className: "mx_polygon_icon"
  }, " Polygon "), "Dapp Store Kit")))), /*#__PURE__*/react.createElement("div", {
    className: "mx_Dapp_polygon_right"
  }, /*#__PURE__*/react.createElement(lib.Avatar, {
    icon: /*#__PURE__*/react.createElement(icons_lib.EllipsisOutlined, null)
  })));
};
const ExploreContent = () => {
  const [squads, setSquads] = (0,react.useState)({
    total: 0,
    data: []
  });
  const [query, setQuery] = (0,react.useState)("");
  const [showClear, setShowClear] = (0,react.useState)(false);
  const [scrollFLag, setScrollFLag] = (0,react.useState)(1);
  const state = (0,useLeftPanelState/* useLeftPanelState */.JO)();
  const exploreRef = (0,react.useRef)(null);
  ExploreStore/* default */.Z.instance.setListRefresh(() => {
    setScrollFLag(scrollFLag > 0 ? scrollFLag + 1 : scrollFLag - 1);
  });
  (0,react.useEffect)(() => {
    ExploreStore/* default */.Z.instance.fetchSquads({
      clear: true,
      query: ""
    }).then(res => {
      if (res && res.data) {
        setSquads(res);
      }
    });
  }, []);
  const handlerSelected = data => {
    console.log("🚀 ~ file: LeftPanelContent.tsx:117 ~ handlerSelected ~ data:", data);
    const clientId = data.id;
    dispatcher/* default */.ZP.dispatch({
      action: LeftPanelStore/* CHANGE_LEFT_PANEL_UI_STATE */.Us,
      target: LeftPanelStore/* EXPLORE_TAB */.bA,
      value: {
        // ...state,
        clientId,
        openPanel: data.id === (state === null || state === void 0 ? void 0 : state.clientId) ? !(state !== null && state !== void 0 && state.openPanel) : true,
        isOfficial: data.is_official
      }
    });
  };
  const clearInput = () => {
    if (exploreRef !== null && exploreRef !== void 0 && exploreRef.current) {
      exploreRef.current.value = "";
      setShowClear(false);
      if (!query) {
        return;
      }
      setScrollFLag(1);
      setQuery("");
      setSquads({
        total: 0,
        data: []
      });
      ExploreStore/* default */.Z.instance.fetchSquads({
        clear: true,
        query: ""
      }).then(res => {
        if (res && res.data) {
          setSquads(res);
        }
      });
    }
  };
  const inputChange = ev => {
    setShowClear(!!ev.target.value);
  };
  const confirmSearch = () => {
    if (exploreRef !== null && exploreRef !== void 0 && exploreRef.current) {
      const value = exploreRef.current.value;
      if (!value.trim()) {
        return clearInput();
      }
      setQuery(value);
      setScrollFLag(1);
      const searchRes = squads.data.filter(squad => squad.name.trim().toLowerCase().includes(value.trim().toLowerCase()));
      setSquads({
        total: searchRes.length,
        data: searchRes
      });
      // setQuery(value);
      // setScrollFLag(1);
      // setSquads({ total: 0, data: [] });
      // ExploreStore.instance
      //     .fetchSquads({ clear: true, query: value.trim() })
      //     .then((res) => {
      //         if (res && res.data) {
      //             setSquads(res);
      //         }
      //     });
    }
  };

  const enterKey = ev => {
    if (ev.key === "Enter") {
      confirmSearch();
    }
  };
  const onscroll = ev => {
    const target = ev.target;
    if (target.scrollHeight - target.clientHeight - target.scrollTop < 40) {
      if (ExploreStore/* default */.Z.instance.getLoading()) {
        return;
      }
      if (scrollFLag > 0) {
        setScrollFLag(scrollFLag + 1);
      }
      ExploreStore/* default */.Z.instance.fetchSquads({
        clear: false,
        query: query
      }).then(res => {
        if (res) {
          if (res.data) {
            setSquads(res);
          } else {
            setScrollFLag(-1);
          }
        }
      });
    }

    // const bottomEdge = list.offsetHeight + list.scrollTop;
    // const list = ev.target as HTMLDivElement;
    // this.handleStickyHeaders(list);
  };

  const searchQuery = query.trim();
  // const result = searchQuery ? squads.filter(item => item.auth === 'public' && item.name.includes(searchQuery)) : squads;

  const loading = ExploreStore/* default */.Z.instance.getLoading();
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_LeftPanelContent_content_inner",
    onScroll: scrollFLag > 0 ? onscroll : () => {}
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_RightPanel_Explore_Title"
  }, "Dive into a world of vibrant Squads!"), /*#__PURE__*/react.createElement("div", {
    className: "mx_RightPanel_Explore_Search_Wrap"
  }, /*#__PURE__*/react.createElement("input", {
    ref: exploreRef,
    onKeyDown: enterKey,
    onChange: inputChange
  }), showClear && /*#__PURE__*/react.createElement("div", {
    className: "mx_RightPanel_Explore_Button mx_RightPanel_Explore_Button_Clear",
    onClick: clearInput
  }), /*#__PURE__*/react.createElement("div", {
    className: "mx_RightPanel_Explore_Button mx_RightPanel_Explore_Button_Search",
    onClick: confirmSearch
  })), searchQuery && (squads.total || !loading) ? /*#__PURE__*/react.createElement("div", {
    className: "mx_RightPanel_Explore_Result_Tag"
  }, /*#__PURE__*/react.createElement("span", {
    onClick: clearInput
  }, "<"), `${squads.total} ${(0,languageHandler._t)("squads for")} "${searchQuery}"`) : null, squads.total || loading ? null : /*#__PURE__*/react.createElement("div", {
    className: "mx_RightPanel_Explore_Empty"
  }, (0,languageHandler._t)("No results")), /*#__PURE__*/react.createElement(Group/* default */.Z, null, squads.data.map(data => /*#__PURE__*/react.createElement(Explore/* default */.Z, (0,esm_extends/* default */.Z)({}, data, {
    key: data.id,
    active: data.id === (state === null || state === void 0 ? void 0 : state.clientId),
    onClick: () => handlerSelected(data)
  })))), loading && /*#__PURE__*/react.createElement(sendingme_ui_dist.SdSkeleton.Block, {
    active: true,
    aspectRatio: "358 / 332",
    cols: 3,
    colGap: 20,
    rowGap: 20,
    childrenStyle: {
      borderRadius: "20px"
    }
  }), !loading && scrollFLag < 0 && /*#__PURE__*/react.createElement("div", {
    className: "mx_RightPanel_Explore_Nomore"
  }, (0,languageHandler._t)("No more results")));
};
const CommonSider = ({
  children,
  className
}) => {
  return /*#__PURE__*/react.createElement("aside", {
    className: `mx_RightPanel dark-panel ${className || ""}`
  }, children);
};
const DAppSider = () => {
  var _PartnerStore$instanc;
  const [loading, setLoading] = (0,react.useState)(true);
  const state = (0,useLeftPanelState/* useLeftPanelState */.JO)();
  (0,react.useEffect)(() => {
    PartnerStore/* default */.Z.instance.getPartners().finally(() => {
      setLoading(false);
    });
  }, []);
  const partner = (_PartnerStore$instanc = PartnerStore/* default */.Z.instance.partners) === null || _PartnerStore$instanc === void 0 ? void 0 : _PartnerStore$instanc.find(partner => treatUrl(partner.url) === (state === null || state === void 0 ? void 0 : state.clientId));
  if (state !== null && state !== void 0 && state.url) {
    return /*#__PURE__*/react.createElement(CommonSider, {
      className: "mx_dapp_container"
    }, /*#__PURE__*/react.createElement(IframeWidget/* default */.Z, {
      src: `${state.url}${(0,constants/* addTimestamp */.g0)(state.url)}`,
      onClose: () => {
        dispatcher/* default */.ZP.dispatch({
          action: LeftPanelStore/* CHANGE_LEFT_PANEL_UI_STATE */.Us,
          target: LeftPanelStore/* DAPP_TAB */.bJ,
          value: {
            openPanel: false,
            clientId: undefined
          }
        });
      },
      title: (partner === null || partner === void 0 ? void 0 : partner.name) || ""
    }));
  }
  let param = Object.keys((0,omit/* default */.Z)(state, ["clientId", "openPanel", "url"])).reduce((acc, key) => {
    acc.push(`${key}=${state[key]}`);
    return acc;
  }, []).join("&");
  param = param.length ? `?${param}` : "";
  const src = `${partner === null || partner === void 0 ? void 0 : partner.url}${param}`;
  return /*#__PURE__*/react.createElement(CommonSider, {
    className: "mx_dapp_container"
  }, loading ? /*#__PURE__*/react.createElement(Spinner/* default */.Z, null) : partner ? /*#__PURE__*/react.createElement(IframeWidget/* default */.Z, {
    src: `${src}${(0,constants/* addTimestamp */.g0)(src)}`,
    onClose: () => {
      dispatcher/* default */.ZP.dispatch({
        action: LeftPanelStore/* CHANGE_LEFT_PANEL_UI_STATE */.Us,
        target: LeftPanelStore/* DAPP_TAB */.bJ,
        value: {
          openPanel: false,
          clientId: undefined
        }
      });
    },
    title: partner.name
  }) : null);
};
const ExploreSider = () => {
  const target = LeftPanelStore/* default */.ZP.instance.useLeftPanelStore(state => state.selected);
  const uiStateForTab = LeftPanelStore/* default */.ZP.instance.useLeftPanelStore(state => state.uiStateForTab);
  const state = uiStateForTab[LeftPanelStore/* EXPLORE_TAB */.bA];
  const {
    data,
    loading,
    refresh
  } = (0,ahooks_lib.useRequest)(state !== null && state !== void 0 && state.clientId ? async () => ExploreStore/* default */.Z.instance.fetchSquadDetail(state === null || state === void 0 ? void 0 : state.clientId) : () => Promise.resolve());
  const squad = data;
  return /*#__PURE__*/react.createElement(CommonSider, {
    className: "mx_explore_container"
  }, loading && /*#__PURE__*/react.createElement(Spinner/* default */.Z, null), !loading && squad && /*#__PURE__*/react.createElement(Squad/* default */.Z, {
    detail: squad,
    key: squad === null || squad === void 0 ? void 0 : squad.id,
    onClose: () => {
      dispatcher/* default */.ZP.dispatch({
        action: LeftPanelStore/* CHANGE_LEFT_PANEL_UI_STATE */.Us,
        target: target,
        value: {
          openPanel: false,
          clientId: undefined
        }
      });
    },
    isOfficial: squad.isOfficial,
    refresh: refresh,
    from: "Explore"
  }), !loading && !squad && /*#__PURE__*/react.createElement(EmptyWidget/* default */.Z, null));
};
const FriendRequestSider = () => {
  const friendRequestSelect = ContactStore["default"].instance.friendRequestSelect;
  return /*#__PURE__*/react.createElement(react.Fragment, null, friendRequestSelect ? /*#__PURE__*/react.createElement(SeaUserProfile/* default */.Z, {
    user: null,
    userId: friendRequestSelect.userId,
    feedNode: null
  }) : null);
};
const LeftPanelContent = /*#__PURE__*/(0,react.memo)(props => {
  const selected = (0,useLeftPanelState/* useSelected */.vt)();
  const state = (0,useLeftPanelState/* useLeftPanelState */.JO)();
  const notificationState = (0,useLeftPanelState/* useInboxNotificationState */.L8)();
  const subSelected = (0,SubMenuState/* useMenuStateStore */.x)(draft => draft.SubMenuType);
  const [rightPanel, setRigthPanel] = (0,react.useState)(null);
  const {
    content,
    sider,
    hasResizer
  } = (0,react.useMemo)(() => {
    switch (selected) {
      case LeftPanelStore/* DAPP_TAB */.bJ:
        {
          return {
            content: /*#__PURE__*/react.createElement(DAppContent, null),
            sider: state !== null && state !== void 0 && state.openPanel ? /*#__PURE__*/react.createElement(DAppSider, null) : null,
            hasResizer: false
          };
        }
      case LeftPanelStore/* EXPLORE_TAB */.bA:
        {
          return {
            content: /*#__PURE__*/react.createElement(ExploreContent, null),
            sider: state !== null && state !== void 0 && state.openPanel ? /*#__PURE__*/react.createElement(ExploreSider, {
              key: state === null || state === void 0 ? void 0 : state.clientId
            }) : null,
            hasResizer: false
          };
        }
      case LeftPanelStore/* INBOX_TAB */.J9:
        {
          // !!!! watch here we are using `notificationState` for some reason

          return {
            content: /*#__PURE__*/react.createElement(v2_InboxContent, {
              activeTab: config/* SubMenuType */.MN.Mention
            }),
            sider: notificationState !== null && notificationState !== void 0 && notificationState.openPanel ? /*#__PURE__*/react.createElement(NotificationDrawer/* default */.Z, null) : null,
            hasResizer: false
          };
        }
      case LeftPanelStore/* CONTACT_TAB */.YJ:
        {
          return {
            content: /*#__PURE__*/react.createElement(contact_ContactContent, {
              resizeNotifier: props.resizeNotifier,
              activeTab: config/* SubMenuType */.MN.Recommendation
            }),
            sider: state !== null && state !== void 0 && state.openPanel ? /*#__PURE__*/react.createElement(FriendRequestSider, null) : null,
            hasResizer: false
          };
        }
      default:
        {
          return {
            content: null,
            sider: null,
            hasResizer: false
          };
        }
    }
  }, [state, selected, notificationState, subSelected]);
  const needUseLayout = (0,react.useMemo)(() => {
    if (typeof selected !== "symbol") {
      return true;
    }
    const notUseLayoutList = [LeftPanelStore/* CONTACT_TAB */.YJ];
    const notUseLayoutSubList = [config/* SubMenuType */.MN.SquadInvitation, config/* SubMenuType */.MN.GroupInvitation];
    if (notUseLayoutList.includes(selected) && notUseLayoutSubList.includes(subSelected)) {
      return false;
    }
    return true;
  }, [selected, subSelected]);
  const handleClick = () => {
    dispatcher/* default */.ZP.dispatch({
      action: LeftPanelStore/* CHANGE_LEFT_PANEL_UI_STATE */.Us,
      target: LeftPanelStore/* INBOX_NOTIFICATION */.mB,
      value: {
        openPanel: true,
        instanceId: "",
        type: inbox_def/* NotificationDrawerType */.M.DISPLAY_INSTANCE_LIST,
        data: null
      }
    });
  };
  const labelMap = {
    [LeftPanelStore/* DAPP_TAB */.bJ]: {
      tag: "DApps",
      name: "DApps",
      showIcon: true,
      icon: /*#__PURE__*/react.createElement(icons_IconDiscover, null),
      submenu: {
        [config/* SubMenuType */.MN.All]: {
          label: config/* SubMenuType */.MN.All,
          tag: config/* SubMenuType */.MN.All,
          secondary: null
        }
      }
    },
    [LeftPanelStore/* EXPLORE_TAB */.bA]: {
      tag: "Explore",
      name: "Explore",
      icon: /*#__PURE__*/react.createElement(icons_IconExplore, null),
      submenu: {
        [config/* SubMenuType */.MN.Home]: {
          label: config/* SubMenuType */.MN.Home,
          tag: config/* SubMenuType */.MN.Home,
          secondary: null
        }
      }
    },
    [LeftPanelStore/* INBOX_TAB */.J9]: {
      tag: "inbox",
      name: "Inbox",
      icon: /*#__PURE__*/react.createElement(icons_IconInbox, null),
      submenu: {
        [config/* SubMenuType */.MN.Notification]: {
          label: config/* SubMenuType */.MN.Notification,
          tag: config/* SubMenuType */.MN.Notification,
          secondary: /*#__PURE__*/react.createElement("div", {
            className: "mx_LeftPanelContent_header_secondary",
            onClick: handleClick
          }, /*#__PURE__*/react.createElement(IconMore/* default */.Z, null))
        },
        [config/* SubMenuType */.MN.Mention]: {
          label: config/* SubMenuType */.MN.Mention,
          tag: config/* SubMenuType */.MN.Mention,
          secondary: null
        }
      }
    },
    [LeftPanelStore/* CONTACT_TAB */.YJ]: {
      tag: "Contact",
      name: "Contact",
      icon: /*#__PURE__*/react.createElement(icons_IconInbox, null),
      submenu: {
        [config/* SubMenuType */.MN.Recommendation]: {
          label: config/* SubMenuType */.MN.Recommendation,
          tag: config/* SubMenuType */.MN.Recommendation,
          secondary: null
        },
        [config/* SubMenuType */.MN.FriendsRequest]: {
          label: config/* SubMenuType */.MN.FriendsRequest,
          tag: config/* SubMenuType */.MN.FriendsRequest,
          secondary: null
        }
      }
    }
  };
  const headerInfo = (0,react.useMemo)(() => {
    var _currentItem$submenu$, _currentItem$submenu$2;
    const empty = {
      label: "",
      tag: "",
      secondary: null
    };
    if (typeof selected !== "symbol" || !(selected in labelMap)) {
      return empty;
    }
    const currentItem = labelMap[selected];
    return {
      label: subSelected ? (_currentItem$submenu$ = currentItem.submenu[subSelected]) === null || _currentItem$submenu$ === void 0 ? void 0 : _currentItem$submenu$.label : currentItem.name,
      tag: currentItem.tag,
      secondary: subSelected ? (_currentItem$submenu$2 = currentItem.submenu[subSelected]) === null || _currentItem$submenu$2 === void 0 ? void 0 : _currentItem$submenu$2.secondary : null
    };
  }, [state, selected, subSelected, handleClick]);
  (0,react.useEffect)(() => {
    // to remove drawer in inbox
    if (selected !== LeftPanelStore/* INBOX_TAB */.J9) {
      dispatcher/* default */.ZP.dispatch({
        action: LeftPanelStore/* CHANGE_LEFT_PANEL_UI_STATE */.Us,
        target: LeftPanelStore/* INBOX_TAB */.J9,
        value: {
          openPanel: false,
          type: "",
          instanceId: "",
          data: null
        }
      });
    }
  }, [selected]);
  (0,react.useEffect)(() => {
    const onAction = payload => {
      if (payload.action === actions/* Action */.a.SetRightPanelPhase) {
        if ([RightPanelStorePhases/* RightPanelPhases */.q4.PointsTask, RightPanelStorePhases/* RightPanelPhases */.q4.UserProfile, RightPanelStorePhases/* RightPanelPhases */.q4.IframeWidget, RightPanelStorePhases/* RightPanelPhases */.q4.AssetsMore].includes(payload.phase)) {
          setRigthPanel( /*#__PURE__*/react.createElement(RightPanel/* default */.Z, {
            resizeNotifier: props.resizeNotifier,
            onClose: () => setRigthPanel(null)
          }));
        }
      }
    };
    const id = dispatcher/* default */.ZP.register(onAction);
    return () => {
      dispatcher/* default */.ZP.unregister(id);
    };
  }, []);
  if (typeof selected !== "symbol") {
    return null;
  }
  if (!needUseLayout) {
    return content;
  }
  return /*#__PURE__*/react.createElement(MainSplit/* default */.Z, {
    resizeNotifier: props.resizeNotifier,
    panel: sider || rightPanel || null
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_LeftPanelContent"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_LeftPanelContent_header"
  }, /*#__PURE__*/react.createElement(HomeButton/* default */.Z, {
    title: headerInfo.label,
    tag: headerInfo.tag,
    secondary: headerInfo.secondary
  })), /*#__PURE__*/react.createElement("div", {
    className: "mx_LeftPanelContent_content"
  }, content)));
});
LeftPanelContent.displayName = "LeftPanelContent";
/* harmony default export */ const structures_LeftPanelContent = (LeftPanelContent);
// EXTERNAL MODULE: crypto (ignored)
var crypto_ignored_ = __webpack_require__(907420);
var crypto_ignored_namespaceObject = /*#__PURE__*/__webpack_require__.t(crypto_ignored_, 2);
;// CONCATENATED MODULE: ./node_modules/@noble/ed25519/lib/esm/index.js
/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */

const _0n = BigInt(0);
const _1n = BigInt(1);
const _2n = BigInt(2);
const CU_O = BigInt('7237005577332262213973186563042994240857116359379907606001950938285454250989');
const CURVE = Object.freeze({
    a: BigInt(-1),
    d: BigInt('37095705934669439343138083508754565189542113879843219016388785533085940283555'),
    P: BigInt('57896044618658097711785492504343953926634992332820282019728792003956564819949'),
    l: CU_O,
    n: CU_O,
    h: BigInt(8),
    Gx: BigInt('15112221349535400772501151409588531511454012693041857206046113283949847762202'),
    Gy: BigInt('46316835694926478169428394003475163141307993866256225615783033603165251855960'),
});

const POW_2_256 = BigInt('0x10000000000000000000000000000000000000000000000000000000000000000');
const SQRT_M1 = BigInt('19681161376707505956807079304988542015446066515923890162744021073123829784752');
const SQRT_D = BigInt('6853475219497561581579357271197624642482790079785650197046958215289687604742');
const SQRT_AD_MINUS_ONE = BigInt('25063068953384623474111414158702152701244531502492656460079210482610430750235');
const INVSQRT_A_MINUS_D = BigInt('54469307008909316920995813868745141605393597292927456921205312896311721017578');
const ONE_MINUS_D_SQ = BigInt('1159843021668779879193775521855586647937357759715417654439879720876111806838');
const D_MINUS_ONE_SQ = BigInt('40440834346308536858101042469323190826248399146238708352240133220865137265952');
class ExtendedPoint {
    constructor(x, y, z, t) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.t = t;
    }
    static fromAffine(p) {
        if (!(p instanceof Point)) {
            throw new TypeError('ExtendedPoint#fromAffine: expected Point');
        }
        if (p.equals(Point.ZERO))
            return ExtendedPoint.ZERO;
        return new ExtendedPoint(p.x, p.y, _1n, mod(p.x * p.y));
    }
    static toAffineBatch(points) {
        const toInv = invertBatch(points.map((p) => p.z));
        return points.map((p, i) => p.toAffine(toInv[i]));
    }
    static normalizeZ(points) {
        return this.toAffineBatch(points).map(this.fromAffine);
    }
    equals(other) {
        assertExtPoint(other);
        const { x: X1, y: Y1, z: Z1 } = this;
        const { x: X2, y: Y2, z: Z2 } = other;
        const X1Z2 = mod(X1 * Z2);
        const X2Z1 = mod(X2 * Z1);
        const Y1Z2 = mod(Y1 * Z2);
        const Y2Z1 = mod(Y2 * Z1);
        return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
    }
    negate() {
        return new ExtendedPoint(mod(-this.x), this.y, this.z, mod(-this.t));
    }
    double() {
        const { x: X1, y: Y1, z: Z1 } = this;
        const { a } = CURVE;
        const A = mod(X1 * X1);
        const B = mod(Y1 * Y1);
        const C = mod(_2n * mod(Z1 * Z1));
        const D = mod(a * A);
        const x1y1 = X1 + Y1;
        const E = mod(mod(x1y1 * x1y1) - A - B);
        const G = D + B;
        const F = G - C;
        const H = D - B;
        const X3 = mod(E * F);
        const Y3 = mod(G * H);
        const T3 = mod(E * H);
        const Z3 = mod(F * G);
        return new ExtendedPoint(X3, Y3, Z3, T3);
    }
    add(other) {
        assertExtPoint(other);
        const { x: X1, y: Y1, z: Z1, t: T1 } = this;
        const { x: X2, y: Y2, z: Z2, t: T2 } = other;
        const A = mod((Y1 - X1) * (Y2 + X2));
        const B = mod((Y1 + X1) * (Y2 - X2));
        const F = mod(B - A);
        if (F === _0n)
            return this.double();
        const C = mod(Z1 * _2n * T2);
        const D = mod(T1 * _2n * Z2);
        const E = D + C;
        const G = B + A;
        const H = D - C;
        const X3 = mod(E * F);
        const Y3 = mod(G * H);
        const T3 = mod(E * H);
        const Z3 = mod(F * G);
        return new ExtendedPoint(X3, Y3, Z3, T3);
    }
    subtract(other) {
        return this.add(other.negate());
    }
    precomputeWindow(W) {
        const windows = 1 + 256 / W;
        const points = [];
        let p = this;
        let base = p;
        for (let window = 0; window < windows; window++) {
            base = p;
            points.push(base);
            for (let i = 1; i < 2 ** (W - 1); i++) {
                base = base.add(p);
                points.push(base);
            }
            p = base.double();
        }
        return points;
    }
    wNAF(n, affinePoint) {
        if (!affinePoint && this.equals(ExtendedPoint.BASE))
            affinePoint = Point.BASE;
        const W = (affinePoint && affinePoint._WINDOW_SIZE) || 1;
        if (256 % W) {
            throw new Error('Point#wNAF: Invalid precomputation window, must be power of 2');
        }
        let precomputes = affinePoint && pointPrecomputes.get(affinePoint);
        if (!precomputes) {
            precomputes = this.precomputeWindow(W);
            if (affinePoint && W !== 1) {
                precomputes = ExtendedPoint.normalizeZ(precomputes);
                pointPrecomputes.set(affinePoint, precomputes);
            }
        }
        let p = ExtendedPoint.ZERO;
        let f = ExtendedPoint.ZERO;
        const windows = 1 + 256 / W;
        const windowSize = 2 ** (W - 1);
        const mask = BigInt(2 ** W - 1);
        const maxNumber = 2 ** W;
        const shiftBy = BigInt(W);
        for (let window = 0; window < windows; window++) {
            const offset = window * windowSize;
            let wbits = Number(n & mask);
            n >>= shiftBy;
            if (wbits > windowSize) {
                wbits -= maxNumber;
                n += _1n;
            }
            if (wbits === 0) {
                let pr = precomputes[offset];
                if (window % 2)
                    pr = pr.negate();
                f = f.add(pr);
            }
            else {
                let cached = precomputes[offset + Math.abs(wbits) - 1];
                if (wbits < 0)
                    cached = cached.negate();
                p = p.add(cached);
            }
        }
        return ExtendedPoint.normalizeZ([p, f])[0];
    }
    multiply(scalar, affinePoint) {
        return this.wNAF(normalizeScalar(scalar, CURVE.l), affinePoint);
    }
    multiplyUnsafe(scalar) {
        let n = normalizeScalar(scalar, CURVE.l, false);
        const G = ExtendedPoint.BASE;
        const P0 = ExtendedPoint.ZERO;
        if (n === _0n)
            return P0;
        if (this.equals(P0) || n === _1n)
            return this;
        if (this.equals(G))
            return this.wNAF(n);
        let p = P0;
        let d = this;
        while (n > _0n) {
            if (n & _1n)
                p = p.add(d);
            d = d.double();
            n >>= _1n;
        }
        return p;
    }
    isSmallOrder() {
        return this.multiplyUnsafe(CURVE.h).equals(ExtendedPoint.ZERO);
    }
    isTorsionFree() {
        return this.multiplyUnsafe(CURVE.l).equals(ExtendedPoint.ZERO);
    }
    toAffine(invZ = invert(this.z)) {
        const { x, y, z } = this;
        const ax = mod(x * invZ);
        const ay = mod(y * invZ);
        const zz = mod(z * invZ);
        if (zz !== _1n)
            throw new Error('invZ was invalid');
        return new Point(ax, ay);
    }
    fromRistrettoBytes() {
        legacyRist();
    }
    toRistrettoBytes() {
        legacyRist();
    }
    fromRistrettoHash() {
        legacyRist();
    }
}
ExtendedPoint.BASE = new ExtendedPoint(CURVE.Gx, CURVE.Gy, _1n, mod(CURVE.Gx * CURVE.Gy));
ExtendedPoint.ZERO = new ExtendedPoint(_0n, _1n, _1n, _0n);
function assertExtPoint(other) {
    if (!(other instanceof ExtendedPoint))
        throw new TypeError('ExtendedPoint expected');
}
function assertRstPoint(other) {
    if (!(other instanceof RistrettoPoint))
        throw new TypeError('RistrettoPoint expected');
}
function legacyRist() {
    throw new Error('Legacy method: switch to RistrettoPoint');
}
class RistrettoPoint {
    constructor(ep) {
        this.ep = ep;
    }
    static calcElligatorRistrettoMap(r0) {
        const { d } = CURVE;
        const r = mod(SQRT_M1 * r0 * r0);
        const Ns = mod((r + _1n) * ONE_MINUS_D_SQ);
        let c = BigInt(-1);
        const D = mod((c - d * r) * mod(r + d));
        let { isValid: Ns_D_is_sq, value: s } = uvRatio(Ns, D);
        let s_ = mod(s * r0);
        if (!edIsNegative(s_))
            s_ = mod(-s_);
        if (!Ns_D_is_sq)
            s = s_;
        if (!Ns_D_is_sq)
            c = r;
        const Nt = mod(c * (r - _1n) * D_MINUS_ONE_SQ - D);
        const s2 = s * s;
        const W0 = mod((s + s) * D);
        const W1 = mod(Nt * SQRT_AD_MINUS_ONE);
        const W2 = mod(_1n - s2);
        const W3 = mod(_1n + s2);
        return new ExtendedPoint(mod(W0 * W3), mod(W2 * W1), mod(W1 * W3), mod(W0 * W2));
    }
    static hashToCurve(hex) {
        hex = ensureBytes(hex, 64);
        const r1 = bytes255ToNumberLE(hex.slice(0, 32));
        const R1 = this.calcElligatorRistrettoMap(r1);
        const r2 = bytes255ToNumberLE(hex.slice(32, 64));
        const R2 = this.calcElligatorRistrettoMap(r2);
        return new RistrettoPoint(R1.add(R2));
    }
    static fromHex(hex) {
        hex = ensureBytes(hex, 32);
        const { a, d } = CURVE;
        const emsg = 'RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint';
        const s = bytes255ToNumberLE(hex);
        if (!equalBytes(numberTo32BytesLE(s), hex) || edIsNegative(s))
            throw new Error(emsg);
        const s2 = mod(s * s);
        const u1 = mod(_1n + a * s2);
        const u2 = mod(_1n - a * s2);
        const u1_2 = mod(u1 * u1);
        const u2_2 = mod(u2 * u2);
        const v = mod(a * d * u1_2 - u2_2);
        const { isValid, value: I } = invertSqrt(mod(v * u2_2));
        const Dx = mod(I * u2);
        const Dy = mod(I * Dx * v);
        let x = mod((s + s) * Dx);
        if (edIsNegative(x))
            x = mod(-x);
        const y = mod(u1 * Dy);
        const t = mod(x * y);
        if (!isValid || edIsNegative(t) || y === _0n)
            throw new Error(emsg);
        return new RistrettoPoint(new ExtendedPoint(x, y, _1n, t));
    }
    toRawBytes() {
        let { x, y, z, t } = this.ep;
        const u1 = mod(mod(z + y) * mod(z - y));
        const u2 = mod(x * y);
        const u2sq = mod(u2 * u2);
        const { value: invsqrt } = invertSqrt(mod(u1 * u2sq));
        const D1 = mod(invsqrt * u1);
        const D2 = mod(invsqrt * u2);
        const zInv = mod(D1 * D2 * t);
        let D;
        if (edIsNegative(t * zInv)) {
            let _x = mod(y * SQRT_M1);
            let _y = mod(x * SQRT_M1);
            x = _x;
            y = _y;
            D = mod(D1 * INVSQRT_A_MINUS_D);
        }
        else {
            D = D2;
        }
        if (edIsNegative(x * zInv))
            y = mod(-y);
        let s = mod((z - y) * D);
        if (edIsNegative(s))
            s = mod(-s);
        return numberTo32BytesLE(s);
    }
    toHex() {
        return bytesToHex(this.toRawBytes());
    }
    toString() {
        return this.toHex();
    }
    equals(other) {
        assertRstPoint(other);
        const a = this.ep;
        const b = other.ep;
        const one = mod(a.x * b.y) === mod(a.y * b.x);
        const two = mod(a.y * b.y) === mod(a.x * b.x);
        return one || two;
    }
    add(other) {
        assertRstPoint(other);
        return new RistrettoPoint(this.ep.add(other.ep));
    }
    subtract(other) {
        assertRstPoint(other);
        return new RistrettoPoint(this.ep.subtract(other.ep));
    }
    multiply(scalar) {
        return new RistrettoPoint(this.ep.multiply(scalar));
    }
    multiplyUnsafe(scalar) {
        return new RistrettoPoint(this.ep.multiplyUnsafe(scalar));
    }
}
RistrettoPoint.BASE = new RistrettoPoint(ExtendedPoint.BASE);
RistrettoPoint.ZERO = new RistrettoPoint(ExtendedPoint.ZERO);
const pointPrecomputes = new WeakMap();
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    _setWindowSize(windowSize) {
        this._WINDOW_SIZE = windowSize;
        pointPrecomputes.delete(this);
    }
    static fromHex(hex, strict = true) {
        const { d, P } = CURVE;
        hex = ensureBytes(hex, 32);
        const normed = hex.slice();
        normed[31] = hex[31] & ~0x80;
        const y = bytesToNumberLE(normed);
        if (strict && y >= P)
            throw new Error('Expected 0 < hex < P');
        if (!strict && y >= POW_2_256)
            throw new Error('Expected 0 < hex < 2**256');
        const y2 = mod(y * y);
        const u = mod(y2 - _1n);
        const v = mod(d * y2 + _1n);
        let { isValid, value: x } = uvRatio(u, v);
        if (!isValid)
            throw new Error('Point.fromHex: invalid y coordinate');
        const isXOdd = (x & _1n) === _1n;
        const isLastByteOdd = (hex[31] & 0x80) !== 0;
        if (isLastByteOdd !== isXOdd) {
            x = mod(-x);
        }
        return new Point(x, y);
    }
    static async fromPrivateKey(privateKey) {
        return (await getExtendedPublicKey(privateKey)).point;
    }
    toRawBytes() {
        const bytes = numberTo32BytesLE(this.y);
        bytes[31] |= this.x & _1n ? 0x80 : 0;
        return bytes;
    }
    toHex() {
        return bytesToHex(this.toRawBytes());
    }
    toX25519() {
        const { y } = this;
        const u = mod((_1n + y) * invert(_1n - y));
        return numberTo32BytesLE(u);
    }
    isTorsionFree() {
        return ExtendedPoint.fromAffine(this).isTorsionFree();
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    negate() {
        return new Point(mod(-this.x), this.y);
    }
    add(other) {
        return ExtendedPoint.fromAffine(this).add(ExtendedPoint.fromAffine(other)).toAffine();
    }
    subtract(other) {
        return this.add(other.negate());
    }
    multiply(scalar) {
        return ExtendedPoint.fromAffine(this).multiply(scalar, this).toAffine();
    }
}
Point.BASE = new Point(CURVE.Gx, CURVE.Gy);
Point.ZERO = new Point(_0n, _1n);
class Signature {
    constructor(r, s) {
        this.r = r;
        this.s = s;
        this.assertValidity();
    }
    static fromHex(hex) {
        const bytes = ensureBytes(hex, 64);
        const r = Point.fromHex(bytes.slice(0, 32), false);
        const s = bytesToNumberLE(bytes.slice(32, 64));
        return new Signature(r, s);
    }
    assertValidity() {
        const { r, s } = this;
        if (!(r instanceof Point))
            throw new Error('Expected Point instance');
        normalizeScalar(s, CURVE.l, false);
        return this;
    }
    toRawBytes() {
        const u8 = new Uint8Array(64);
        u8.set(this.r.toRawBytes());
        u8.set(numberTo32BytesLE(this.s), 32);
        return u8;
    }
    toHex() {
        return bytesToHex(this.toRawBytes());
    }
}

function concatBytes(...arrays) {
    if (!arrays.every((a) => a instanceof Uint8Array))
        throw new Error('Expected Uint8Array list');
    if (arrays.length === 1)
        return arrays[0];
    const length = arrays.reduce((a, arr) => a + arr.length, 0);
    const result = new Uint8Array(length);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
        const arr = arrays[i];
        result.set(arr, pad);
        pad += arr.length;
    }
    return result;
}
const hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, '0'));
function bytesToHex(uint8a) {
    if (!(uint8a instanceof Uint8Array))
        throw new Error('Uint8Array expected');
    let hex = '';
    for (let i = 0; i < uint8a.length; i++) {
        hex += hexes[uint8a[i]];
    }
    return hex;
}
function hexToBytes(hex) {
    if (typeof hex !== 'string') {
        throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
    }
    if (hex.length % 2)
        throw new Error('hexToBytes: received invalid unpadded hex');
    const array = new Uint8Array(hex.length / 2);
    for (let i = 0; i < array.length; i++) {
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0)
            throw new Error('Invalid byte sequence');
        array[i] = byte;
    }
    return array;
}
function numberTo32BytesBE(num) {
    const length = 32;
    const hex = num.toString(16).padStart(length * 2, '0');
    return hexToBytes(hex);
}
function numberTo32BytesLE(num) {
    return numberTo32BytesBE(num).reverse();
}
function edIsNegative(num) {
    return (mod(num) & _1n) === _1n;
}
function bytesToNumberLE(uint8a) {
    if (!(uint8a instanceof Uint8Array))
        throw new Error('Expected Uint8Array');
    return BigInt('0x' + bytesToHex(Uint8Array.from(uint8a).reverse()));
}
const MAX_255B = BigInt('0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
function bytes255ToNumberLE(bytes) {
    return mod(bytesToNumberLE(bytes) & MAX_255B);
}
function mod(a, b = CURVE.P) {
    const res = a % b;
    return res >= _0n ? res : b + res;
}
function invert(number, modulo = CURVE.P) {
    if (number === _0n || modulo <= _0n) {
        throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
    }
    let a = mod(number, modulo);
    let b = modulo;
    let x = _0n, y = _1n, u = _1n, v = _0n;
    while (a !== _0n) {
        const q = b / a;
        const r = b % a;
        const m = x - u * q;
        const n = y - v * q;
        b = a, a = r, x = u, y = v, u = m, v = n;
    }
    const gcd = b;
    if (gcd !== _1n)
        throw new Error('invert: does not exist');
    return mod(x, modulo);
}
function invertBatch(nums, p = CURVE.P) {
    const tmp = new Array(nums.length);
    const lastMultiplied = nums.reduce((acc, num, i) => {
        if (num === _0n)
            return acc;
        tmp[i] = acc;
        return mod(acc * num, p);
    }, _1n);
    const inverted = invert(lastMultiplied, p);
    nums.reduceRight((acc, num, i) => {
        if (num === _0n)
            return acc;
        tmp[i] = mod(acc * tmp[i], p);
        return mod(acc * num, p);
    }, inverted);
    return tmp;
}
function pow2(x, power) {
    const { P } = CURVE;
    let res = x;
    while (power-- > _0n) {
        res *= res;
        res %= P;
    }
    return res;
}
function pow_2_252_3(x) {
    const { P } = CURVE;
    const _5n = BigInt(5);
    const _10n = BigInt(10);
    const _20n = BigInt(20);
    const _40n = BigInt(40);
    const _80n = BigInt(80);
    const x2 = (x * x) % P;
    const b2 = (x2 * x) % P;
    const b4 = (pow2(b2, _2n) * b2) % P;
    const b5 = (pow2(b4, _1n) * x) % P;
    const b10 = (pow2(b5, _5n) * b5) % P;
    const b20 = (pow2(b10, _10n) * b10) % P;
    const b40 = (pow2(b20, _20n) * b20) % P;
    const b80 = (pow2(b40, _40n) * b40) % P;
    const b160 = (pow2(b80, _80n) * b80) % P;
    const b240 = (pow2(b160, _80n) * b80) % P;
    const b250 = (pow2(b240, _10n) * b10) % P;
    const pow_p_5_8 = (pow2(b250, _2n) * x) % P;
    return { pow_p_5_8, b2 };
}
function uvRatio(u, v) {
    const v3 = mod(v * v * v);
    const v7 = mod(v3 * v3 * v);
    const pow = pow_2_252_3(u * v7).pow_p_5_8;
    let x = mod(u * v3 * pow);
    const vx2 = mod(v * x * x);
    const root1 = x;
    const root2 = mod(x * SQRT_M1);
    const useRoot1 = vx2 === u;
    const useRoot2 = vx2 === mod(-u);
    const noRoot = vx2 === mod(-u * SQRT_M1);
    if (useRoot1)
        x = root1;
    if (useRoot2 || noRoot)
        x = root2;
    if (edIsNegative(x))
        x = mod(-x);
    return { isValid: useRoot1 || useRoot2, value: x };
}
function invertSqrt(number) {
    return uvRatio(_1n, number);
}
function modlLE(hash) {
    return mod(bytesToNumberLE(hash), CURVE.l);
}
function equalBytes(b1, b2) {
    if (b1.length !== b2.length) {
        return false;
    }
    for (let i = 0; i < b1.length; i++) {
        if (b1[i] !== b2[i]) {
            return false;
        }
    }
    return true;
}
function ensureBytes(hex, expectedLength) {
    const bytes = hex instanceof Uint8Array ? Uint8Array.from(hex) : hexToBytes(hex);
    if (typeof expectedLength === 'number' && bytes.length !== expectedLength)
        throw new Error(`Expected ${expectedLength} bytes`);
    return bytes;
}
function normalizeScalar(num, max, strict = true) {
    if (!max)
        throw new TypeError('Specify max value');
    if (typeof num === 'number' && Number.isSafeInteger(num))
        num = BigInt(num);
    if (typeof num === 'bigint' && num < max) {
        if (strict) {
            if (_0n < num)
                return num;
        }
        else {
            if (_0n <= num)
                return num;
        }
    }
    throw new TypeError('Expected valid scalar: 0 < scalar < max');
}
function adjustBytes25519(bytes) {
    bytes[0] &= 248;
    bytes[31] &= 127;
    bytes[31] |= 64;
    return bytes;
}
function decodeScalar25519(n) {
    return bytesToNumberLE(adjustBytes25519(ensureBytes(n, 32)));
}
function checkPrivateKey(key) {
    key =
        typeof key === 'bigint' || typeof key === 'number'
            ? numberTo32BytesBE(normalizeScalar(key, POW_2_256))
            : ensureBytes(key);
    if (key.length !== 32)
        throw new Error(`Expected 32 bytes`);
    return key;
}
function getKeyFromHash(hashed) {
    const head = adjustBytes25519(hashed.slice(0, 32));
    const prefix = hashed.slice(32, 64);
    const scalar = modlLE(head);
    const point = Point.BASE.multiply(scalar);
    const pointBytes = point.toRawBytes();
    return { head, prefix, scalar, point, pointBytes };
}
let _sha512Sync;
function sha512s(...m) {
    if (typeof _sha512Sync !== 'function')
        throw new Error('utils.sha512Sync must be set to use sync methods');
    return _sha512Sync(...m);
}
async function getExtendedPublicKey(key) {
    return getKeyFromHash(await esm_utils.sha512(checkPrivateKey(key)));
}
function getExtendedPublicKeySync(key) {
    return getKeyFromHash(sha512s(checkPrivateKey(key)));
}
async function getPublicKey(privateKey) {
    return (await getExtendedPublicKey(privateKey)).pointBytes;
}
function getPublicKeySync(privateKey) {
    return getExtendedPublicKeySync(privateKey).pointBytes;
}
async function sign(message, privateKey) {
    message = ensureBytes(message);
    const { prefix, scalar, pointBytes } = await getExtendedPublicKey(privateKey);
    const r = modlLE(await esm_utils.sha512(prefix, message));
    const R = Point.BASE.multiply(r);
    const k = modlLE(await esm_utils.sha512(R.toRawBytes(), pointBytes, message));
    const s = mod(r + k * scalar, CURVE.l);
    return new Signature(R, s).toRawBytes();
}
function signSync(message, privateKey) {
    message = ensureBytes(message);
    const { prefix, scalar, pointBytes } = getExtendedPublicKeySync(privateKey);
    const r = modlLE(sha512s(prefix, message));
    const R = Point.BASE.multiply(r);
    const k = modlLE(sha512s(R.toRawBytes(), pointBytes, message));
    const s = mod(r + k * scalar, CURVE.l);
    return new Signature(R, s).toRawBytes();
}
function prepareVerification(sig, message, publicKey) {
    message = ensureBytes(message);
    if (!(publicKey instanceof Point))
        publicKey = Point.fromHex(publicKey, false);
    const { r, s } = sig instanceof Signature ? sig.assertValidity() : Signature.fromHex(sig);
    const SB = ExtendedPoint.BASE.multiplyUnsafe(s);
    return { r, s, SB, pub: publicKey, msg: message };
}
function finishVerification(publicKey, r, SB, hashed) {
    const k = modlLE(hashed);
    const kA = ExtendedPoint.fromAffine(publicKey).multiplyUnsafe(k);
    const RkA = ExtendedPoint.fromAffine(r).add(kA);
    return RkA.subtract(SB).multiplyUnsafe(CURVE.h).equals(ExtendedPoint.ZERO);
}
async function verify(sig, message, publicKey) {
    const { r, SB, msg, pub } = prepareVerification(sig, message, publicKey);
    const hashed = await esm_utils.sha512(r.toRawBytes(), pub.toRawBytes(), msg);
    return finishVerification(pub, r, SB, hashed);
}
function verifySync(sig, message, publicKey) {
    const { r, SB, msg, pub } = prepareVerification(sig, message, publicKey);
    const hashed = sha512s(r.toRawBytes(), pub.toRawBytes(), msg);
    return finishVerification(pub, r, SB, hashed);
}
const sync = {
    getExtendedPublicKey: getExtendedPublicKeySync,
    getPublicKey: getPublicKeySync,
    sign: signSync,
    verify: verifySync,
};
async function getSharedSecret(privateKey, publicKey) {
    const { head } = await getExtendedPublicKey(privateKey);
    const u = Point.fromHex(publicKey).toX25519();
    return curve25519.scalarMult(head, u);
}
Point.BASE._setWindowSize(8);
function cswap(swap, x_2, x_3) {
    const dummy = mod(swap * (x_2 - x_3));
    x_2 = mod(x_2 - dummy);
    x_3 = mod(x_3 + dummy);
    return [x_2, x_3];
}
function montgomeryLadder(pointU, scalar) {
    const { P } = CURVE;
    const u = normalizeScalar(pointU, P);
    const k = normalizeScalar(scalar, P);
    const a24 = BigInt(121665);
    const x_1 = u;
    let x_2 = _1n;
    let z_2 = _0n;
    let x_3 = u;
    let z_3 = _1n;
    let swap = _0n;
    let sw;
    for (let t = BigInt(255 - 1); t >= _0n; t--) {
        const k_t = (k >> t) & _1n;
        swap ^= k_t;
        sw = cswap(swap, x_2, x_3);
        x_2 = sw[0];
        x_3 = sw[1];
        sw = cswap(swap, z_2, z_3);
        z_2 = sw[0];
        z_3 = sw[1];
        swap = k_t;
        const A = x_2 + z_2;
        const AA = mod(A * A);
        const B = x_2 - z_2;
        const BB = mod(B * B);
        const E = AA - BB;
        const C = x_3 + z_3;
        const D = x_3 - z_3;
        const DA = mod(D * A);
        const CB = mod(C * B);
        const dacb = DA + CB;
        const da_cb = DA - CB;
        x_3 = mod(dacb * dacb);
        z_3 = mod(x_1 * mod(da_cb * da_cb));
        x_2 = mod(AA * BB);
        z_2 = mod(E * (AA + mod(a24 * E)));
    }
    sw = cswap(swap, x_2, x_3);
    x_2 = sw[0];
    x_3 = sw[1];
    sw = cswap(swap, z_2, z_3);
    z_2 = sw[0];
    z_3 = sw[1];
    const { pow_p_5_8, b2 } = pow_2_252_3(z_2);
    const xp2 = mod(pow2(pow_p_5_8, BigInt(3)) * b2);
    return mod(x_2 * xp2);
}
function encodeUCoordinate(u) {
    return numberTo32BytesLE(mod(u, CURVE.P));
}
function decodeUCoordinate(uEnc) {
    const u = ensureBytes(uEnc, 32);
    u[31] &= 127;
    return bytesToNumberLE(u);
}
const curve25519 = {
    BASE_POINT_U: '0900000000000000000000000000000000000000000000000000000000000000',
    scalarMult(privateKey, publicKey) {
        const u = decodeUCoordinate(publicKey);
        const p = decodeScalar25519(privateKey);
        const pu = montgomeryLadder(u, p);
        if (pu === _0n)
            throw new Error('Invalid private or public key received');
        return encodeUCoordinate(pu);
    },
    scalarMultBase(privateKey) {
        return curve25519.scalarMult(privateKey, curve25519.BASE_POINT_U);
    },
};
const esm_crypto = {
    node: crypto_ignored_namespaceObject,
    web: typeof self === 'object' && 'crypto' in self ? self.crypto : undefined,
};
const esm_utils = {
    bytesToHex,
    hexToBytes,
    concatBytes,
    getExtendedPublicKey,
    mod,
    invert,
    TORSION_SUBGROUP: [
        '0100000000000000000000000000000000000000000000000000000000000000',
        'c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a',
        '0000000000000000000000000000000000000000000000000000000000000080',
        '26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05',
        'ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f',
        '26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85',
        '0000000000000000000000000000000000000000000000000000000000000000',
        'c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa',
    ],
    hashToPrivateScalar: (hash) => {
        hash = ensureBytes(hash);
        if (hash.length < 40 || hash.length > 1024)
            throw new Error('Expected 40-1024 bytes of private key as per FIPS 186');
        return mod(bytesToNumberLE(hash), CURVE.l - _1n) + _1n;
    },
    randomBytes: (bytesLength = 32) => {
        if (esm_crypto.web) {
            return esm_crypto.web.getRandomValues(new Uint8Array(bytesLength));
        }
        else if (esm_crypto.node) {
            const { randomBytes } = esm_crypto.node;
            return new Uint8Array(randomBytes(bytesLength).buffer);
        }
        else {
            throw new Error("The environment doesn't have randomBytes function");
        }
    },
    randomPrivateKey: () => {
        return esm_utils.randomBytes(32);
    },
    sha512: async (...messages) => {
        const message = concatBytes(...messages);
        if (esm_crypto.web) {
            const buffer = await esm_crypto.web.subtle.digest('SHA-512', message.buffer);
            return new Uint8Array(buffer);
        }
        else if (esm_crypto.node) {
            return Uint8Array.from(esm_crypto.node.createHash('sha512').update(message).digest());
        }
        else {
            throw new Error("The environment doesn't have sha512 function");
        }
    },
    precompute(windowSize = 8, point = Point.BASE) {
        const cached = point.equals(Point.BASE) ? point : new Point(point.x, point.y);
        cached._setWindowSize(windowSize);
        cached.multiply(_2n);
        return cached;
    },
    sha512Sync: undefined,
};
Object.defineProperties(esm_utils, {
    sha512Sync: {
        configurable: false,
        get() {
            return _sha512Sync;
        },
        set(val) {
            if (!_sha512Sync)
                _sha512Sync = val;
        },
    },
});

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/commonPointParams.ts
var commonPointParams = __webpack_require__(970698);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/firebase_analytics.ts + 3 modules
var firebase_analytics = __webpack_require__(937139);
// EXTERNAL MODULE: ./node_modules/lodash-es/get.js
var get = __webpack_require__(216423);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/third_auth/util.ts

function util_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function util_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? util_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : util_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


function getThirdAuthContent() {
  try {
    const content = JSON.parse(localStorage.getItem("third_auth"));
    return content;
  } catch (err) {
    return null;
  }
}
function editUserNameStart() {
  (0,firebase_analytics/* logEvent */.K)(firebase_analytics/* analytics */.c, "edit_user_name", util_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()));
}
function editUserNameSuccess() {
  (0,firebase_analytics/* logEvent */.K)(firebase_analytics/* analytics */.c, "edit_user_name_success", util_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()));
}
function editUserNameFailed(err) {
  (0,firebase_analytics/* logEvent */.K)(firebase_analytics/* analytics */.c, "edit_user_name_failed", util_objectSpread(util_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()), {}, {
    error_code: err.httpStatus || err.errcode || 0,
    error_reason: err.name || err.message || err.stack
  }));
}
const log = {
  editUserNameStart,
  editUserNameSuccess,
  editUserNameFailed
};
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/StereoButton.tsx
var StereoButton = __webpack_require__(274184);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/units.ts
var units = __webpack_require__(612559);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/utils/room/autoJoin.ts



async function autoJoinRoom(isNewUser) {
  const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
  const roomIds = await cli.getToBeJoinedRooms();
  if (Array.isArray(roomIds)) {
    roomIds.forEach(roomId => {
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.JoinRoom,
        outsideRoom: true,
        roomId: roomId,
        skipError: true,
        isNewUser
      });
    });
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/BoardingDialog.tsx

function BoardingDialog_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function BoardingDialog_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? BoardingDialog_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : BoardingDialog_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }











class BoardingDialog extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "setStep", step => {
      this.setState({
        step
      }, () => {
        localStorage.setItem("mx_guide_state", step + "");
      });
    });
    (0,defineProperty/* default */.Z)(this, "init", async () => {
      this.setState({
        loading: true
      });
      try {
        const address = localStorage.getItem("mx_profile_wallet_address");
        const res = await MatrixClientPeg/* MatrixClientPeg */.p.get().getPreviewProfile(address.toLowerCase());
        if (res && res.data) {
          const ens = (0,get/* default */.Z)(res.data, "show_ens.name", "");
          const nftImage = (0,get/* default */.Z)(res.data, "show_nft.image_url", "");
          if (ens) {
            this.setState({
              defaultValues: {
                ens,
                nft: nftImage
              }
            });
          }
        }
      } catch (error) {
        console.error(error, "get preview profile failed");
        this.setState({
          loading: false
        });
      }
      this.setState({
        loading: false
      });
    });
    const thirdAuth = getThirdAuthContent();
    this.state = {
      step: +localStorage.getItem("mx_guide_state"),
      displayName: "",
      loading: false,
      defaultValues: {
        ens: (thirdAuth === null || thirdAuth === void 0 ? void 0 : thirdAuth.username) || (thirdAuth === null || thirdAuth === void 0 ? void 0 : thirdAuth.name),
        nft: ""
      }
    };
  }
  componentDidMount() {
    this.init();
  }
  render() {
    var _this$state$defaultVa, _this$state$defaultVa2;
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_BoardingDialog"
    }, this.state.step !== 1 && /*#__PURE__*/react.createElement(DisplayNameByEns, {
      onContinue: this.setStep,
      defaultValueName: (_this$state$defaultVa = this.state.defaultValues) === null || _this$state$defaultVa === void 0 ? void 0 : _this$state$defaultVa.ens,
      defaultValueAvatar: (_this$state$defaultVa2 = this.state.defaultValues) === null || _this$state$defaultVa2 === void 0 ? void 0 : _this$state$defaultVa2.nft,
      onFinish: this.props.onFinish,
      isNewUser: this.props.isNewUser
    }));
  }
}
const DisplayNameByEns = ({
  onContinue,
  onFinish,
  defaultValueName,
  defaultValueAvatar,
  isNewUser
}) => {
  const [enses, setEnses] = (0,react.useState)(null);
  const [displayName, setDisplayName] = (0,react.useState)(() => {
    return defaultValueName;
  });
  const [usingEns, setUsingEns] = (0,react.useState)(false);
  const [saving, setSaving] = (0,react.useState)(false);
  const [style, setStyle] = (0,react.useState)({});
  (0,react.useEffect)(() => {
    if (defaultValueName) {
      setDisplayName(defaultValueName);
    }
  }, [defaultValueName]);
  (0,react.useEffect)(() => {
    const getEns = async () => {
      const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
      const walletAddress = localStorage.getItem("mx_profile_wallet_address");
      client.getProfileNameServices(walletAddress).then(res => {
        setEnses(res.name ? [res.name] : []);
      });
    };
    getEns();
  }, []);
  const onChangeValue = event => {
    var _event$target;
    if (usingEns) {
      setUsingEns(false);
      setDisplayName("");
      return;
    }
    setDisplayName(event === null || event === void 0 ? void 0 : (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value);
  };
  const onSaveAvatar = async () => {
    const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
    if (defaultValueAvatar) {
      const url = await client.convertNftImageUrl(defaultValueAvatar);
      await client.setAvatarUrl(url);
    }
    await client.setAccountGuide(1);
    onFinish(1);
  };
  const onSaveDisplayName = async () => {
    if (!displayName) {
      sendingme_ui_dist.SdMessage.warning((0,languageHandler._t)("Please entry display name"));
      return;
    }
    try {
      const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
      setSaving(true);
      //done firebase : edit_user_name
      (0,firebase_analytics/* logEvent */.K)(firebase_analytics/* analytics */.c, "edit_user_name", BoardingDialog_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()));
      await Promise.all([client.setDisplayName(displayName, usingEns), onSaveAvatar()]);
      //done firebase : edit_user_name_success
      (0,firebase_analytics/* logEvent */.K)(firebase_analytics/* analytics */.c, "edit_user_name_success", BoardingDialog_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()));
      // new user join rooms

      autoJoinRoom(isNewUser);
    } catch (err) {
      setSaving(false);
      //done firebase : edit_user_name_failed
      (0,firebase_analytics/* logEvent */.K)(firebase_analytics/* analytics */.c, "edit_user_name_failed", BoardingDialog_objectSpread(BoardingDialog_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()), {}, {
        error_code: err.httpStatus || err.errcode || 0,
        error_reason: err.name || err.message || err.stack
      }));
    } finally {
      setSaving(false);
    }
    if (onContinue) {
      onContinue(4);
    }
  };
  const onFocus = () => {
    if ((0,units/* isMobile */.tq)()) {
      setStyle({
        height: "50%"
      });
    }
  };
  const onBlur = () => {
    if ((0,units/* isMobile */.tq)()) {
      setStyle({});
    }
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_SetName",
    style: style
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_DisplayName_title"
  }, (0,languageHandler._t)("Account Profile")), /*#__PURE__*/react.createElement("div", {
    className: "mx_DisplayName_title_desc"
  }, "It can be modified later on the setting page"), /*#__PURE__*/react.createElement("div", {
    className: "mx_DisplayName_value"
  }, usingEns ? /*#__PURE__*/react.createElement("div", {
    className: "mx_ens_name"
  }, /*#__PURE__*/react.createElement("img", {
    src: __webpack_require__(107467),
    height: "24",
    width: "24",
    alt: ""
  }), enses[0]) : null, /*#__PURE__*/react.createElement("input", {
    className: "mx_DisplayName_value_input",
    placeholder: (0,languageHandler._t)("What is your name?"),
    value: displayName,
    onChange: onChangeValue
    // onFocus={onFocus}
    // onBlur={onBlur}
  })), /*#__PURE__*/react.createElement("div", {
    className: "mx_Continue_button"
  }, /*#__PURE__*/react.createElement(StereoButton/* default */.Z, {
    onClick: onSaveDisplayName
  }, `Next`)));
};
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/token.ts
var token = __webpack_require__(732094);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/third_auth/AccountProfile.tsx










const AccountProfile = props => {
  const {
    onNext,
    nftAvatar
  } = props;
  const [saving, setSaving] = (0,react.useState)(false);
  const ref = (0,react.useRef)(null);
  const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
  const thirdAuth = getThirdAuthContent();
  const displayName = (thirdAuth === null || thirdAuth === void 0 ? void 0 : thirdAuth.username) || (thirdAuth === null || thirdAuth === void 0 ? void 0 : thirdAuth.name);
  const walletAddress = OwnProfileStore.OwnProfileStore.instance.walletAddress;
  const onSaveProfile = async () => {
    if (saving) {
      return;
    }
    const onSetDisplayName = async () => {
      try {
        log.editUserNameStart();
        await client.setDisplayName(displayName);
        log.editUserNameSuccess();
      } catch (err) {
        log.editUserNameFailed(err);
        throw err;
      }
    };
    const onSetAvatar = async () => {
      try {
        if (nftAvatar) {
          const url = await client.convertNftImageUrl(nftAvatar);
          await client.setAvatarUrl(url || nftAvatar);
        }
      } catch (err) {
        throw err;
      }
    };
    setSaving(true);
    try {
      await Promise.all([onSetDisplayName(), onSetAvatar()]);
      setSaving(false);
      onNext(2);
    } catch {
      setSaving(false);
      sendingme_ui_dist.SdMessage.error("set displayname or avatar failed!");
    }
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_AuthProfile",
    ref: ref
  }, /*#__PURE__*/react.createElement("h2", {
    className: "view-title"
  }, "Account Profile"), /*#__PURE__*/react.createElement("p", {
    className: "view-desc"
  }, "It can be modified later on the setting page"), /*#__PURE__*/react.createElement("img", {
    src: nftAvatar,
    alt: displayName,
    className: "view-avatar"
  }), /*#__PURE__*/react.createElement("div", {
    className: "view-username"
  }, displayName), /*#__PURE__*/react.createElement("div", {
    className: "view-wallet"
  }, "Particle Wallet\uFF1A", /*#__PURE__*/react.createElement("span", {
    className: "view-wallet-address"
  }, (0,token/* formatWallet */.Tl)(walletAddress))), /*#__PURE__*/react.createElement(StereoButton/* default */.Z, {
    className: classnames_default()(["mx_AuthProfile_btn", {
      mx_AuthProfile_disabled: saving
    }]),
    onClick: onSaveProfile
  }, /*#__PURE__*/react.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, saving && /*#__PURE__*/react.createElement(Spinner/* default */.Z, {
    w: 26,
    h: 26
  }), (0,languageHandler._t)("NEXT"))));
};
/* harmony default export */ const third_auth_AccountProfile = (/*#__PURE__*/(0,react.memo)(AccountProfile));
// EXTERNAL MODULE: ./node_modules/html2canvas/dist/html2canvas.js
var html2canvas = __webpack_require__(461120);
var html2canvas_default = /*#__PURE__*/__webpack_require__.n(html2canvas);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/useUserAvatar.ts
var useUserAvatar = __webpack_require__(391952);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/third_auth/SendTweet.tsx













const SendTweet = props => {
  const {
    onFinish,
    nftAvatar,
    isNewUser
  } = props;
  const [sending, setSending] = (0,react.useState)(false);
  const [loading, setLoading] = (0,react.useState)(true);
  const [summaryCardUrl, setSummaryCardUrl] = (0,react.useState)("");
  const cardRef = (0,react.useRef)(null);
  const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
  const userId = client.getUserId();
  const url = new URL((0,Permalinks/* shareUserPermalink */.G3)(userId));
  const host = url.origin === "https://chat.sending.me" ? "https://dapp.sending.me" : "https://dapp-alpha.sending.me";
  const imgProxy = url.origin === "https://chat.sending.me" ? "https://chat.sending.me" : "https://chat-alpha.sending.me";
  const twitterContent = [`🌟 #SendingMe`, `Hey! 🐦 Elevate our chats on SendingMe – it's where the cool crowd hangs out. 🚀 Join me here:`, `${host}/share${url.search}&domain=${url.host}`].join("\n");
  const displayName = OwnProfileStore.OwnProfileStore.instance.displayName;
  const walletAddress = OwnProfileStore.OwnProfileStore.instance.walletAddress;
  const userAvatar = (0,useUserAvatar/* useImage */.d9)(`${url.origin}/imageUrl/?url=${nftAvatar}`);
  const cardBg = (0,useUserAvatar/* useImage */.d9)(__webpack_require__(957827));
  const avatarBg = __webpack_require__(112092);
  const onSendTweet = (0,react.useCallback)(async () => {
    if (sending) {
      return;
    }
    try {
      setSending(true);
      await client.updateSdnUserToSdm({
        user_id: userId,
        display_name: displayName,
        wallet_address: walletAddress,
        avatar: nftAvatar || "",
        ens: OwnProfileStore.OwnProfileStore.instance.isEns,
        source: "web",
        summary_card_url: summaryCardUrl
      });
      await Promise.all([client.sendTwitter(twitterContent), !localStorage.getItem("account.guide") ? client.setAccountGuide(1) : ""]);
      autoJoinRoom(isNewUser);
      localStorage.removeItem("third_auth");
      setSending(false);
      onFinish === null || onFinish === void 0 ? void 0 : onFinish(1);
    } catch {
      sendingme_ui_dist.SdMessage.error("send twitter error!");
      setSending(false);
    }
  }, [summaryCardUrl]);
  (0,react.useEffect)(() => {
    if (userAvatar.status === "success" && cardBg.status == "success") {
      html2canvas_default()(cardRef.current).then(canvas => {
        canvas.toBlob(async bolb => {
          try {
            const url = await client.uploadContent(bolb, {
              downloadType: 0
            });
            setSummaryCardUrl(url);
          } catch {}
          setLoading(false);
        });
      });
    }
  }, [userAvatar, cardBg]);
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_SendTwiter"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_SendTwiter_title"
  }, (0,languageHandler._t)("Post to X")), /*#__PURE__*/react.createElement("div", {
    className: "mx_SendTwiter_subTitle"
  }, (0,languageHandler._t)("Invite your x friends to SendingMe")), /*#__PURE__*/react.createElement("div", {
    className: "mx_SendTwiter_tw"
  }, /*#__PURE__*/react.createElement("div", null, "\uD83C\uDF1F #SendingMe"), /*#__PURE__*/react.createElement("div", null, "Hey! \uD83D\uDC26 Elevate our chats on SendingMe \u2013 it's where the cool crowd hangs out. \uD83D\uDE80 Join me here:"), loading ? /*#__PURE__*/react.createElement(Spinner/* default */.Z, {
    message: "Creating you own summary card..."
  }) : /*#__PURE__*/react.createElement("img", {
    src: summaryCardUrl,
    className: "mx_SendTwiter_summaryaCard"
  })), /*#__PURE__*/react.createElement(StereoButton/* default */.Z, {
    className: classnames_default()(["mx_SendTwiter_btn", {
      mx_SendTwiter_disabled: sending || loading
    }]),
    onClick: onSendTweet
  }, /*#__PURE__*/react.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, sending && /*#__PURE__*/react.createElement(Spinner/* default */.Z, {
    w: 26,
    h: 26
  }), (0,languageHandler._t)("Post to X(twitter）"))), /*#__PURE__*/react.createElement("div", {
    className: "mx_SummaryLargeCard",
    ref: cardRef
  }, /*#__PURE__*/react.createElement("img", {
    src: cardBg.url,
    className: "card-bg"
  }), /*#__PURE__*/react.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/react.createElement("div", {
    className: "user-avatar-wrapper",
    style: {
      background: `url(${avatarBg}) no-repeat center/100%`
    }
  }, /*#__PURE__*/react.createElement("img", {
    src: `${imgProxy}/imageUrl/?url=${nftAvatar}`,
    className: "user-avatar",
    alt: displayName
  })), /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("div", {
    className: "user-name"
  }, displayName, "d"), /*#__PURE__*/react.createElement("div", {
    className: "user-wallet"
  }, (0,token/* formatWallet */.Tl)(walletAddress))))));
};
/* harmony default export */ const third_auth_SendTweet = (SendTweet);
// EXTERNAL MODULE: ./node_modules/lodash-es/isEmpty.js
var isEmpty = __webpack_require__(479697);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/third_auth/AuthView.tsx








const AuthView = props => {
  const {
    onFinish,
    isNewUser
  } = props;
  const thirdAuth = getThirdAuthContent();
  const [step, setStep] = (0,react.useState)(1);
  const [nftAvatar, setNftAvatar] = (0,react.useState)();
  const [loading, setLoading] = (0,react.useState)(!!thirdAuth);
  const defAvatar = (0,avatar/* getDefaultAvatar */.W)({
    size: 120,
    id: localStorage.getItem("mx_profile_wallet_address")
  });
  (0,react.useEffect)(() => {
    let didCancel = false;
    if (thirdAuth !== null && thirdAuth !== void 0 && thirdAuth.username) {
      const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
      Promise.all([client.bindTwitter({
        twitter_access_token: thirdAuth === null || thirdAuth === void 0 ? void 0 : thirdAuth.twitter_access_token,
        twitter_user_base_info: thirdAuth === null || thirdAuth === void 0 ? void 0 : thirdAuth.twitter_user_base_info
      }), client.getTwitterNft(thirdAuth.username)]).then(([, res]) => {
        if (!(0,isEmpty/* default */.Z)(res) && !didCancel) {
          var _res$image_urls;
          setNftAvatar((_res$image_urls = res.image_urls) === null || _res$image_urls === void 0 ? void 0 : _res$image_urls.image_url);
        }
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
    return () => {
      didCancel = true;
    };
  }, [thirdAuth === null || thirdAuth === void 0 ? void 0 : thirdAuth.username]);
  if (loading) {
    return /*#__PURE__*/react.createElement(Spinner/* default */.Z, null);
  }
  if (step === 1) {
    return /*#__PURE__*/react.createElement(third_auth_AccountProfile, {
      onNext: setStep,
      nftAvatar: nftAvatar || defAvatar
    });
  }
  if (step === 2) {
    return /*#__PURE__*/react.createElement(third_auth_SendTweet, {
      onFinish: onFinish,
      nftAvatar: nftAvatar || defAvatar,
      isNewUser: isNewUser
    });
  }
  return null;
};
/* harmony default export */ const third_auth_AuthView = (/*#__PURE__*/(0,react.memo)(AuthView));
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/BoardingContainer.tsx





const BoardingContainer = /*#__PURE__*/(0,react.memo)(({
  onClose,
  isNewUser
}) => {
  const guideState = localStorage.getItem("mx_guide_state");
  const thirdAuth = getThirdAuthContent();
  const onFinish = next => {
    localStorage.setItem("mx_guide_state", `${next}`);
    if (next === 1) {
      onClose();
    }
  };
  if (guideState !== "0" && guideState !== "3") {
    return null;
  }
  let modalContent = thirdAuth !== null && thirdAuth !== void 0 && thirdAuth.twitter_id ? /*#__PURE__*/react.createElement(third_auth_AuthView, {
    onFinish: onFinish,
    isNewUser: isNewUser
  }) : /*#__PURE__*/react.createElement(BoardingDialog, {
    onFinish: onFinish,
    isNewUser: isNewUser
  });
  return /*#__PURE__*/react.createElement(lib.Modal, {
    className: "mx_BoardingDialog_modal",
    closable: false,
    open: true,
    footer: false,
    width: 460
  }, modalContent);
});
/* harmony default export */ const structures_BoardingContainer = (BoardingContainer);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(992619);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/floating_modal/config.ts
var floating_modal_config = __webpack_require__(371377);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/FloatingWidgetStorePhases.ts
var FloatingWidgetStorePhases = __webpack_require__(693901);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/floating_modal/FloatingWidgetToolBar.tsx


const _excluded = ["title", "visible", "setWidgetStatus"];
/**
 * @file 游戏悬浮窗, 顶部 bar
 */






const FloatingWidgetToolBar = _ref => {
  let {
      title,
      visible,
      setWidgetStatus
    } = _ref,
    restProps = (0,objectWithoutProperties/* default */.Z)(_ref, _excluded);
  const [screenSize, setScreenSize] = (0,react.useState)(floating_modal_config/* OprationType */.Xo.Init);
  if (!visible) {
    return null;
  }
  const onScreenSizeChange = opType => {
    setScreenSize(opType);
    setWidgetStatus(opType);
  };
  const closeButton = /*#__PURE__*/react.createElement("button", {
    key: "close",
    type: "button",
    className: "mx_FloatingWidget_button close",
    onClick: () => {
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.SetFloatingWidget,
        phase: FloatingWidgetStorePhases/* FloatingWidgetPhase */.Z.FloatingWidget,
        showFloatingWidget: false
      });
    }
  });
  const reductionButton = /*#__PURE__*/react.createElement("button", {
    key: "reduction",
    type: "button",
    className: "mx_FloatingWidget_button reduction",
    onClick: () => onScreenSizeChange(floating_modal_config/* OprationType */.Xo.Init)
  });
  const miniButton = /*#__PURE__*/react.createElement("button", {
    key: "mini",
    type: "button",
    className: "mx_FloatingWidget_button mini_screen",
    onClick: () => onScreenSizeChange(floating_modal_config/* OprationType */.Xo.MiniScreen)
  });
  const fullButton = /*#__PURE__*/react.createElement("button", {
    key: "full",
    type: "button",
    className: "mx_FloatingWidget_button full_screen",
    onClick: () => onScreenSizeChange(floating_modal_config/* OprationType */.Xo.FullScreen)
  });
  let oprateBtns = [reductionButton, closeButton];
  if (screenSize === floating_modal_config/* OprationType */.Xo.MiniScreen) {
    oprateBtns.unshift(fullButton);
  } else if (screenSize === floating_modal_config/* OprationType */.Xo.FullScreen) {
    oprateBtns.unshift(miniButton);
  } else {
    oprateBtns.unshift(fullButton);
    oprateBtns.unshift(miniButton);
  }
  return /*#__PURE__*/react.createElement("div", (0,esm_extends/* default */.Z)({
    className: "mx_FloatingWidget_toolBar"
  }, restProps), /*#__PURE__*/react.createElement("h5", {
    className: "mx_FloatingWidget_title"
  }, title), /*#__PURE__*/react.createElement("div", {
    className: "mx_FloatingWidget_toolBar_btns"
  }, oprateBtns));
};
/* harmony default export */ const floating_modal_FloatingWidgetToolBar = (FloatingWidgetToolBar);
// EXTERNAL MODULE: ./node_modules/lodash-es/throttle.js
var throttle = __webpack_require__(300111);
// EXTERNAL MODULE: ./node_modules/postmate/build/postmate.js
var postmate = __webpack_require__(842404);
var postmate_default = /*#__PURE__*/__webpack_require__.n(postmate);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ForwardDialog.tsx
var ForwardDialog = __webpack_require__(606510);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/floating_modal/FloatingWidget.tsx

function FloatingWidget_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function FloatingWidget_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? FloatingWidget_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : FloatingWidget_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * @file 游戏悬浮窗
 */












const H_ASPECT_RATIO = 16 / 9;
const V_ASPECT_RATIO = 9 / 16;
const BORDER_WIDTH = 4 + 4;
const MINI_WIDTH = 280 - BORDER_WIDTH;
const V_WIDTH = 390;
const V_CONTENT_WIDTH = V_WIDTH - BORDER_WIDTH;

/**
 * 获取浮动元素的初始宽度，在此宽度时，高度不超过 roomBody 高度的一半
 */
function getFloadingWidgetInitSize(aspectRatio) {
  const roomBody = document.querySelector(".mx_RoomView_body");
  const rect = roomBody.getBoundingClientRect();
  if (rect) {
    if (aspectRatio > 1) {
      const {
        width,
        height
      } = rect;
      const _h = width / aspectRatio;
      if (_h * 2 >= height) {
        return {
          height: height / 2,
          width: aspectRatio * (height / 2)
        };
      }
      return {
        height: _h,
        width
      };
    } else {
      const {
        height
      } = rect;
      const _w = V_CONTENT_WIDTH;
      const _h = _w / aspectRatio;
      return {
        width: _w,
        height: _h > height ? height : _h
      };
    }
  }
}
function getRightPanelWidth() {
  var _document$querySelect;
  return (_document$querySelect = document.querySelector(".mx_RightPanel_ResizeWrapper")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.clientWidth;
}
const FloatingWidget = ({
  title,
  src,
  type
}) => {
  const direction = (0,floating_modal_config/* isVerticalWidget */.NR)(src) ? floating_modal_config/* WidgetDirection */.kE.Vertical : floating_modal_config/* WidgetDirection */.kE.Horizontal;
  const frameRef = (0,react.useRef)();
  const [rightPanelIsOpen, setRightPanelIsOpen] = (0,react.useState)(RightPanelStore/* default */.Z.getSharedInstance().hasOpen);
  const [spacePanelIsOpen, setSpacePanelIsOpen] = (0,react.useState)(SpaceStore/* default */.ZP.instance.isOpenSpacePannel);
  const [loading, setLoading] = (0,react.useState)(true);
  const [floatingStyle, setFloatingStyle] = (0,react.useState)({});
  const [widgetStatus, setWidgetStatus] = (0,react.useState)();
  const [showTools, setShowTools] = (0,react.useState)(false);
  const startPoint = (0,react.useRef)();
  const widgetPoint = (0,react.useRef)();
  const widgetSize = (0,react.useRef)();
  const resizing = (0,react.useRef)(false);
  const dragStatus = (0,react.useRef)(floating_modal_config/* DragStatus */.LN.End);
  const lock = (0,react.useRef)(false);
  const aspectRatio = direction === floating_modal_config/* WidgetDirection */.kE.Horizontal ? H_ASPECT_RATIO : V_ASPECT_RATIO;
  const onLoad = () => setLoading(false);
  const onMouseUp = () => {
    unbindEvents();
    resizing.current = false;
    dragStatus.current = floating_modal_config/* DragStatus */.LN.End;
  };
  const onMouseMove = (0,throttle/* default */.Z)((0,react.useCallback)(event => {
    const winHeight = (window.innerHeight || document.body.clientHeight) - 50;
    const winWidth = (window.innerWidth || document.body.clientWidth) - 50;
    if (floating_modal_config/* DragStatus */.LN.Start === dragStatus.current) {
      const left = event.clientX - startPoint.current.x + widgetPoint.current.left;
      const top = event.clientY - startPoint.current.y + widgetPoint.current.top;
      if (top > 0 && left > 0 && top < winHeight && left < winWidth) {
        widgetPoint.current = {
          top: top,
          left
        };
        startPoint.current = {
          x: event.clientX,
          y: event.clientY
        };
        setFloatingStyle(FloatingWidget_objectSpread(FloatingWidget_objectSpread({}, floatingStyle), widgetPoint.current));
      }
    } else if (resizing.current) {
      const x = event.clientX - startPoint.current.x;
      const y = event.clientY - startPoint.current.y;
      let w = 0,
        h = 0;
      if (x / y >= aspectRatio) {
        h = widgetSize.current.height + y;
        w = h * aspectRatio;
      } else {
        w = widgetSize.current.width + x;
        h = w / aspectRatio;
      }
      if (w >= 50) {
        setFloatingStyle(FloatingWidget_objectSpread(FloatingWidget_objectSpread({}, floatingStyle), {}, {
          width: w,
          height: h
        }));
        widgetSize.current = {
          height: h,
          width: w
        };
        startPoint.current = {
          x: event.clientX,
          y: event.clientY
        };
      }
    }
  }, [floatingStyle]), 50);
  const bindEvents = () => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseUp);
  };
  const unbindEvents = () => {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseleave", onMouseUp);
  };
  const onResize = event => {
    event.stopPropagation();
    event.preventDefault();
    resizing.current = true;
    startPoint.current = {
      x: event.clientX,
      y: event.clientY
    };
    setWidgetStatus(floating_modal_config/* OprationType */.Xo.Free);
    bindEvents();
  };
  const onDargStart = event => {
    event.stopPropagation();
    event.preventDefault();
    dragStatus.current = floating_modal_config/* DragStatus */.LN.Start;
    startPoint.current = {
      x: event.clientX,
      y: event.clientY
    };
    setWidgetStatus(floating_modal_config/* OprationType */.Xo.Free);
    bindEvents();
  };
  const showScaleIcon = floating_modal_config/* OprationType */.Xo.FullScreen !== widgetStatus && dragStatus.current !== floating_modal_config/* DragStatus */.LN.Start && !lock.current && (resizing.current || showTools);
  (0,react.useEffect)(() => {
    if (floating_modal_config/* OprationType */.Xo.Free !== widgetStatus) {
      lock.current = false;
      if (floating_modal_config/* OprationType */.Xo.MiniScreen === widgetStatus) {
        var _document$querySelect2;
        lock.current = true;
        const rect = (_document$querySelect2 = document.querySelector(".mx_SpacePanel")) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.getBoundingClientRect();
        widgetSize.current = {
          width: MINI_WIDTH,
          height: MINI_WIDTH / H_ASPECT_RATIO
        };
        widgetPoint.current = {
          left: spacePanelIsOpen && rect ? rect.width : 70,
          top: (window.innerHeight || document.body.clientHeight) - MINI_WIDTH / H_ASPECT_RATIO - BORDER_WIDTH
        };
      } else if (floating_modal_config/* OprationType */.Xo.FullScreen === widgetStatus) {
        widgetSize.current = {
          width: (window.innerWidth || document.body.clientWidth) - BORDER_WIDTH,
          height: (window.innerHeight || document.body.clientHeight) - 41 - BORDER_WIDTH
        };
        widgetPoint.current = {
          left: 0,
          top: 0
        };
      } else {
        const size = getFloadingWidgetInitSize(aspectRatio);
        widgetSize.current = {
          width: size.width,
          height: size.height
        };
        widgetPoint.current = {
          left: direction === floating_modal_config/* WidgetDirection */.kE.Horizontal ? (window.innerWidth || document.body.clientWidth) - (rightPanelIsOpen ? getRightPanelWidth() : 0) - size.width - BORDER_WIDTH : (window.innerWidth || document.body.clientWidth) - V_WIDTH,
          top: 50
        };
      }
      setFloatingStyle(FloatingWidget_objectSpread(FloatingWidget_objectSpread({}, widgetSize.current), widgetPoint.current));
    }
  }, [rightPanelIsOpen, spacePanelIsOpen, widgetStatus]);
  (0,react.useEffect)(() => {
    const postmateRef = new (postmate_default())({
      url: src,
      container: frameRef.current,
      classListArray: ["floating_iframe"]
    });
    const iframe = frameRef.current.children.item(0);
    iframe.src = src;
    iframe.allow = "clipboard-read; clipboard-write; camera; microphone";
    iframe === null || iframe === void 0 ? void 0 : iframe.addEventListener("load", onLoad);
    const rightPanelStoreToken = RightPanelStore/* default */.Z.getSharedInstance().addListener(() => {
      setRightPanelIsOpen(RightPanelStore/* default */.Z.getSharedInstance().hasOpen);
    });
    const onSpacePanelExpand = expand => {
      setSpacePanelIsOpen(expand);
    };
    SpaceStore/* default */.ZP.instance.on(SpaceStore/* EXPAND_SPACE_PANEL */._0, onSpacePanelExpand);
    let childRef = null;
    postmateRef.then(child => {
      childRef = child;
      child.on("forward", data => {
        (0,ForwardDialog/* showForwardDialogWithContent */.H2)(data, "share");
      });
    });
    return () => {
      var _frameRef$current, _childRef;
      (_frameRef$current = frameRef.current) === null || _frameRef$current === void 0 ? void 0 : _frameRef$current.removeEventListener("load", onLoad);
      rightPanelStoreToken.remove();
      SpaceStore/* default */.ZP.instance.off(SpaceStore/* EXPAND_SPACE_PANEL */._0, onSpacePanelExpand);
      (_childRef = childRef) === null || _childRef === void 0 ? void 0 : _childRef.destroy();
    };
  }, [src, type]);
  const widgetClasses = classnames_default()({
    mx_FloatingWidget: true,
    mx_FloatingWidget_mini: lock.current
  });
  return /*#__PURE__*/react.createElement("div", {
    className: widgetClasses,
    style: floatingStyle,
    onMouseEnter: () => setShowTools(true),
    onMouseLeave: () => setShowTools(false)
  }, /*#__PURE__*/react.createElement(floating_modal_FloatingWidgetToolBar, {
    title: title,
    visible: true,
    setWidgetStatus: setWidgetStatus,
    onMouseDown: onDargStart
  }), loading && /*#__PURE__*/react.createElement(Spinner/* default */.Z, null), /*#__PURE__*/react.createElement("div", {
    ref: frameRef,
    className: "mx_FloatingWidget_iframe_container",
    style: {
      visibility: loading ? "hidden" : "visible"
    }
  }), resizing.current && /*#__PURE__*/react.createElement("div", {
    className: "mx_FloatingWidget_mask"
  }), showScaleIcon && /*#__PURE__*/react.createElement("div", {
    className: "scale_button",
    onMouseDown: onResize
  }));
};
/* harmony default export */ const floating_modal_FloatingWidget = (FloatingWidget);
// EXTERNAL MODULE: ./node_modules/flux/utils.js
var flux_utils = __webpack_require__(783462);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/stores/FloatingWidgetStore.ts

var _class;
/*
Copyright 2019 The Matrix.org Foundation C.I.C.

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




const INITIAL_STATE = {
  showFloatingWidget: false,
  phaseParams: {}
};

/**
 * A class for tracking the state of the right panel between layouts and
 * sessions.
 */
class FloatingWidgetStore extends flux_utils.Store {
  constructor() {
    super(dispatcher/* default */.ZP);

    // Initialise state
    (0,defineProperty/* default */.Z)(this, "state", void 0);
    this.state = INITIAL_STATE;
  }
  get isOpen() {
    return this.state.showFloatingWidget;
  }
  get floatingWidgetPhaseParams() {
    return this.state.phaseParams || {};
  }
  setState(newState) {
    this.state = Object.assign(this.state, newState);
    this.__emitChange();
  }
  __onDispatch(payload) {
    // eslint-disable-line @typescript-eslint/naming-convention
    if (payload.action === actions/* Action */.a.SetFloatingWidget) {
      this.setState({
        showFloatingWidget: payload.showFloatingWidget,
        phaseParams: payload.refireParams
      });
    }
  }
  static getSharedInstance() {
    if (!FloatingWidgetStore.instance) {
      FloatingWidgetStore.instance = new FloatingWidgetStore();
    }
    return FloatingWidgetStore.instance;
  }
}
_class = FloatingWidgetStore;
(0,defineProperty/* default */.Z)(FloatingWidgetStore, "instance", void 0);
window.mxFloatingWidgetStore = FloatingWidgetStore.getSharedInstance();
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/OpenGuid.tsx


const openUrl = url => {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_self";
  document.body.appendChild(a);
  a.click();
  a.remove();
};
const OpenGuid = () => {
  const [open, setOpen] = (0,react.useState)(true);
  const onDownLoad = () => {
    if ((0,units/* isIos */.s)()) {
      openUrl(`itms-apps://itunes.apple.com/app/SendingMe/id1644853605?mt=8`);
    } else if ((0,units/* isAndroid */.Dt)()) {
      openUrl("https://play.google.com/store/apps/details?id=me.sending.app");
    }
  };
  if (!open) {
    return null;
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_Open_guid",
    role: "button",
    onClick: onDownLoad
  }, "OPEN APP", /*#__PURE__*/react.createElement("span", {
    className: "close-btn",
    onClick: ev => {
      ev.stopPropagation();
      setOpen(false);
    }
  }));
};
/* harmony default export */ const views_OpenGuid = (OpenGuid);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/BaseDialog.js
var BaseDialog = __webpack_require__(308043);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/points_task/WelcomeDialog.tsx







const WelcomeDialog = ({
  onFinished
}) => {
  const isAlpha = location.origin.includes("chat-alpha") || location.origin.includes("localhost");
  const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
  const openPointsPanel = async () => {
    // 注释的内容在上线的时候放开
    if (isAlpha) {
      const path = await client.validMintPass();
      const socialminigUrl = SdkConfig/* default */.Z.get("socialswap").socialmining;
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.SetRightPanelPhase,
        phase: RightPanelStorePhases/* RightPanelPhases */.q4.IframeWidget,
        refireParams: {
          params: {
            src: `${socialminigUrl}/${path.startsWith("dashboard") ? path : ""}`,
            title: "Social Mining"
          }
        }
      });
    } else {
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.SetRightPanelPhase,
        phase: RightPanelStorePhases/* RightPanelPhases */.q4.PointsTask,
        refireParams: {
          params: {
            title: "Points"
          }
        }
      });
    }
    dispatcher/* default */.ZP.dispatch({
      action: "change_recommendtion_right_panel"
    });
    dispatcher/* default */.ZP.dispatch({
      action: actions/* Action */.a.ShowRightPanel
    });
    onFinished();
  };
  return /*#__PURE__*/react.createElement(BaseDialog/* default */.Z, {
    className: "mx_PointWelcome_Dialog_inner",
    hasCancel: true,
    onFinished: onFinished
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_PointWelcome_Dialog_content"
  }, /*#__PURE__*/react.createElement("h5", null, "Welcome to SendingMe"), /*#__PURE__*/react.createElement("p", {
    className: "sub-title"
  }, "You have obtained"), /*#__PURE__*/react.createElement("p", {
    className: "points"
  }, "10"), /*#__PURE__*/react.createElement("p", {
    className: "text-points"
  }, "Points"), /*#__PURE__*/react.createElement("span", {
    className: "btn",
    role: "button",
    onClick: openPointsPanel
  }, "Check & Claim")));
};
/* harmony default export */ const points_task_WelcomeDialog = (WelcomeDialog);
// EXTERNAL MODULE: ./node_modules/firebase/analytics/dist/esm/index.esm.js + 1 modules
var index_esm = __webpack_require__(472133);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/appWizard/appWizard.tsx





const APP_WIZARD_READ = "app_wizard_read";
const AppWizard = /*#__PURE__*/(0,react.memo)(({
  onSkipUserGuid
}) => {
  const guideState = localStorage.getItem("mx_guide_state");
  if (guideState !== "0" && guideState !== "3") {
    return null;
  }
  const [currentSlide, setCurrentSlide] = (0,react.useState)(0);
  const theme = SettingsStore/* default */.C.getValue("theme") === "light" ? "light" : "dark";
  const carouselRef = (0,react.useRef)();
  (0,react.useEffect)(() => {
    const userId = localStorage.getItem("mx_user_id");
    const isRead = !!localStorage.getItem(APP_WIZARD_READ);
    if (userId || isRead) {
      const dom = document.querySelector("#app-wizard");
      if (dom) {
        dom.remove();
      }
    }
  }, []);
  const onChange = currentSlide => {
    setCurrentSlide(currentSlide);
  };
  const onNext = () => {
    setCurrentSlide(currentSlide + 1);
    if (currentSlide === 2) {
      onSkip();
    } else if (carouselRef.current) {
      carouselRef.current.next();
    }
  };
  const onSkip = () => {
    onSkipUserGuid();
  };
  return /*#__PURE__*/react.createElement(lib.Modal, {
    className: "mx_AppWizarDialog_modal",
    closable: false,
    width: 424,
    open: true,
    footer: false
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_content"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_skip"
  }, /*#__PURE__*/react.createElement(lib.Button, {
    type: "link",
    onClick: onSkip
  }, "Skip"), /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_dots"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_dot"
  }), /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_dot"
  }), /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_dot"
  }))), /*#__PURE__*/react.createElement(lib.Carousel, {
    lazyLoad: "progressive",
    dots: false,
    ref: carouselRef,
    afterChange: onChange
  }, /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_title"
  }, "Own Your Data"), /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_subTitle"
  }, "Only you have access to your accounts and data.You always choose what to share and what to keep private."), /*#__PURE__*/react.createElement("img", {
    className: "mx_App_Wizard_image",
    src: theme === "light" ? "/themes/element/img/backgrounds/wizard-light-1.svg" : "/themes/element/img/backgrounds/wizard-1.svg",
    alt: "wizard-1"
  })), /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_title"
  }, "Private and Secure"), /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_subTitle"
  }, "End-to-end message encryption from the decentralized network. We can't read your messages or listen to your calls, and no one else can either."), /*#__PURE__*/react.createElement("img", {
    className: "mx_App_Wizard_image",
    src: theme === "light" ? "/themes/element/img/backgrounds/wizard-light-2.svg" : "/themes/element/img/backgrounds/wizard-2.svg",
    alt: "wizard-3"
  })), /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_title"
  }, "All-In-One APP"), /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_subTitle"
  }, "Chat, Socialize and Trade in one place. SendingMe equips you with an instant messenger, social DID and token gated platform \u2014 everything you need for the Web3 IM."), /*#__PURE__*/react.createElement("img", {
    className: "mx_App_Wizard_image",
    src: theme === "light" ? "/themes/element/img/backgrounds/wizard-light-3.svg" : "/themes/element/img/backgrounds/wizard-3.svg",
    alt: "wizard-3"
  })))), /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_footer"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_skip"
  }, /*#__PURE__*/react.createElement(lib.Button, {
    type: "link",
    onClick: onSkip
  }, "Skip"), /*#__PURE__*/react.createElement("div", {
    className: "mx_App_Wizard_dots"
  }, [0, 1, 2].map(i => {
    return /*#__PURE__*/react.createElement("div", {
      className: classnames_default()({
        "mx_App_Wizard_dot": true,
        "mx_App_Wizard_dot_selected": currentSlide == i
      }),
      onClick: () => {
        var _carouselRef$current;
        onChange(i);
        (_carouselRef$current = carouselRef.current) === null || _carouselRef$current === void 0 ? void 0 : _carouselRef$current.goTo(i);
      }
    });
  }))), /*#__PURE__*/react.createElement(StereoButton/* default */.Z, {
    className: "mx_App_Wizard_next_button",
    onClick: onNext
  }, `Next >`))));
});
/* harmony default export */ const appWizard = (AppWizard);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/ThemeSkinStore.ts
var ThemeSkinStore = __webpack_require__(216904);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Field.tsx
var Field = __webpack_require__(455537);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/invite/FriendApply.tsx





// import { replaceableComponent } from "../../../utils/replaceableComponent";


















// @replaceableComponent("views.invite.FriendApply")
class FriendApply extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "getOwnerAssetsTags", async () => {
      const myUserId = OwnProfileStore.OwnProfileStore.instance.userId;
      const ownerAssetsTags = await this.getAssetsTagsByUserId(myUserId);
      this.setState({
        ownerAssetsTags: ownerAssetsTags || []
      });
    });
    (0,defineProperty/* default */.Z)(this, "getRecieverAssetsTags", async () => {
      const userId = this.state.userId;
      const recieverAssetsTags = await this.getAssetsTagsByUserId(userId);
      this.setState({
        recieverAssetsTags: recieverAssetsTags || []
      });
    });
    (0,defineProperty/* default */.Z)(this, "getAssetsTagsByUserId", async userId => {
      const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
      const assetsTags = await client.getUserAssetsTags(userId);
      return assetsTags || [];
    });
    (0,defineProperty/* default */.Z)(this, "getFriendsPermissionSetting", () => {
      MatrixClientPeg/* MatrixClientPeg */.p.get().getFriendsPermissionSetting().then(result => {
        this.setState({
          permissionRule: result.relation_type,
          permissionLoading: false
        });
        ContactStore["default"].instance.friendPermission = result.relation_type;
      }).catch(err => {
        this.setState({
          permissionRule: ContactStore/* PermissionRule */.dt.Public,
          permissionLoading: false
        });
        ContactStore["default"].instance.friendPermission = ContactStore/* PermissionRule */.dt.Public;
      });
    });
    (0,defineProperty/* default */.Z)(this, "onRemarkNameChanged", e => {
      this.setState({
        remarkName: e.target.value
      });
    });
    (0,defineProperty/* default */.Z)(this, "onNoteChanged", e => {
      this.setState({
        note: e.target.value
      });
    });
    (0,defineProperty/* default */.Z)(this, "onRequestMarkChanged", e => {
      this.setState({
        requestMessage: e.target.value
      });
    });
    (0,defineProperty/* default */.Z)(this, "onSendRequest", async () => {
      const {
        userId,
        ownerAssetsTags,
        recieverAssetsTags
      } = this.state;
      const {
        note,
        remarkName,
        requestMessage
      } = this.state;
      const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
      client.sendFriendsRequest({
        userId: userId,
        note: note,
        remark_name: remarkName,
        request_message: requestMessage,
        extend_json: {
          sender_tags: ownerAssetsTags,
          reciever_tags: recieverAssetsTags
        }
      }).then(res => {
        if (res.ok) {
          client.pointReport({
            action_type: "add_contact"
          });
          sendingme_ui_dist.SdMessage.success("Sent friend request");
          LeftPanelStore/* default */.ZP.instance.updateSelected(LeftPanelStore/* CONTACT_TAB */.YJ);
          LeftPanelStore/* default */.ZP.instance.updateSubSelected(config/* SubMenuType */.MN.FriendsRequest);
          dispatcher/* default */.ZP.dispatch({
            action: actions/* Action */.a.ShowRoomPanel
          });
          dispatcher/* default */.ZP.dispatch({
            action: actions/* Action */.a.HideLeftPanel
          });
          dispatcher/* default */.ZP.dispatch({
            action: config/* SubMenuType */.MN.Contact,
            subMenuType: config/* SubMenuType */.MN.FriendsRequest
          });
          const user = new browser_index/* User */.n5(userId);
          ContactStore["default"].instance.friendRequestSelect = user;
          (0,SubMenuState/* updateMenuState */.I)({
            menu: config/* AbilityMenuType */.fL.Contact,
            subMenu: config/* SubMenuType */.MN.FriendsRequest
          });
          // this.onCancel();
          // update remark
          browser_index/* RemarkStore */.Tq.get().setUserRemarkMap(userId, {
            name: remarkName,
            note: note
          });
        } else {
          const reason = res.reason;
          let errorMessage;
          switch (reason) {
            case "not allowed":
              errorMessage = "The user has disabled friend request";
              break;
            case "the user is friend":
              errorMessage = "The user is already friend";
              break;
            case "request has been sent":
              errorMessage = "Friend request has been sent";
              break;
            case "This wallet address is not an SendingMe user yet":
              errorMessage = "This wallet address is not an SendingMe user";
              break;
          }
          sendingme_ui_dist.SdModal.createDialog({
            title: (0,languageHandler._t)("Add Faild"),
            children: /*#__PURE__*/react.createElement("span", null, errorMessage),
            showCancel: false,
            okText: (0,languageHandler._t)("OK"),
            onOk: close => {
              close === null || close === void 0 ? void 0 : close();
            }
          });
        }
      }).catch(err => {
        const {
          close
        } = sendingme_ui_dist.SdModal.createDialog({
          title: (0,languageHandler._t)("Send Request failed"),
          children: err !== null && err !== void 0 && err.reason ? /*#__PURE__*/react.createElement("span", null, err === null || err === void 0 ? void 0 : err.reason) : null,
          showCancel: false,
          okText: (0,languageHandler._t)("OK"),
          onOk: () => close()
        });
      });
    });
    (0,defineProperty/* default */.Z)(this, "onCancel", () => {
      dispatcher/* default */.ZP.dispatch({
        action: "view_room",
        room_id: localStorage.getItem("mx_last_room_id")
      });
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.SetRightPanelPhase,
        phase: RightPanelStorePhases/* RightPanelPhases */.q4.RoomSummary
      });
    });
    (0,defineProperty/* default */.Z)(this, "jumpToRequestSetting", () => {
      const payload = {
        action: actions/* Action */.a.ViewUserSettings,
        initialTabId: UserSettingsDialog/* UserTab */.oX.FriendsPermission,
        isShotCut: true
      };
      dispatcher/* default */.ZP.dispatch(payload);
    });
    (0,defineProperty/* default */.Z)(this, "getApplyContent", () => {
      if (this.state.permissionRule === ContactStore/* PermissionRule */.dt.Reject) {
        return /*#__PURE__*/react.createElement("div", {
          className: "unable_apply_content"
        }, /*#__PURE__*/react.createElement("img", {
          src: __webpack_require__(59258),
          alt: ""
        }), /*#__PURE__*/react.createElement("div", {
          className: "apply_content_desc"
        }, "Unable to add each other as a friend,"), /*#__PURE__*/react.createElement("div", {
          className: "apply_content_desc"
        }, "please change your friend", /*#__PURE__*/react.createElement("span", {
          onClick: this.jumpToRequestSetting
        }, " ", "request setting")), /*#__PURE__*/react.createElement("div", {
          className: "apply_form_footer"
        }, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
          kind: "secondary",
          onClick: this.onCancel
        }, (0,languageHandler._t)("Cancel"))));
      } else {
        return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
          className: "apply_form_content"
        }, /*#__PURE__*/react.createElement(Field/* default */.Z, {
          label: "Send Friend Request",
          type: "text",
          autoComplete: "off",
          element: "textarea",
          value: this.state.requestMessage,
          onChange: this.onRequestMarkChanged
        }), /*#__PURE__*/react.createElement(Field/* default */.Z, {
          label: (0,languageHandler._t)("Remark"),
          type: "text",
          name: (0,languageHandler._t)("Add Remark"),
          placeholder: (0,languageHandler._t)("Add Remark"),
          autoComplete: "off",
          value: this.state.remarkName,
          onChange: this.onRemarkNameChanged
        }), /*#__PURE__*/react.createElement(Field/* default */.Z, {
          id: "profileTopic",
          label: "Note",
          type: "text",
          value: this.state.note,
          autoComplete: "off",
          onChange: this.onNoteChanged,
          element: "textarea"
        })), /*#__PURE__*/react.createElement("div", {
          className: "apply_form_footer"
        }, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
          kind: "primary",
          onClick: this.onSendRequest
        }, (0,languageHandler._t)("Send Request")), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
          kind: "secondary",
          onClick: this.onCancel
        }, (0,languageHandler._t)("Cancel"))));
      }
    });
    const {
      userId: _userId,
      room
    } = this.props.applyFriendsInfo;
    const myDisplayName = OwnProfileStore.OwnProfileStore.instance.displayName;
    let _requestMessage;
    if (room) {
      if (room.isDmRoom()) {
        _requestMessage = `Hi! I'm ${myDisplayName}. Found you! Let's be friends.`;
      } else {
        if (room.hasSpaceParent()) {
          _requestMessage = `Hey roomies! I'm  ${myDisplayName} from "${room.name} Squad"`;
        } else {
          _requestMessage = `Hey roomies! I'm ${myDisplayName} from "${room.name} group"`;
        }
      }
    } else {
      _requestMessage = `Hi! I'm ${myDisplayName}. Found you! Let's be friends.`;
    }
    this.state = {
      remarkName: "",
      note: "",
      requestMessage: _requestMessage,
      permissionRule: ContactStore["default"].instance.friendPermission,
      avatarUrl: "",
      displayName: "",
      walletAddress: "",
      userId: _userId,
      room: room,
      infoLoading: true,
      permissionLoading: true,
      ownerAssetsTags: [],
      recieverAssetsTags: []
    };
    this.getOwnerAssetsTags();
    this.getRecieverAssetsTags();
    this.getUserProfile();
    this.getFriendsPermissionSetting();
  }
  getUserProfile() {
    const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
    const userId = this.state.userId;
    const user = client.getUser(userId);
    client.getProfileInfo(userId).then(res => {
      this.setState({
        avatarUrl: res.avatar_url,
        displayName: (user === null || user === void 0 ? void 0 : user.displayName) || res.displayname,
        walletAddress: res.wallet_address,
        infoLoading: false
      });
    });
  }
  render() {
    var _this$state;
    const {
      avatarUrl,
      displayName,
      walletAddress,
      userId
    } = this.state;
    const rightPanel = /*#__PURE__*/react.createElement("aside", {
      className: classnames_default()({
        mx_RightPanel: true,
        "dark-panel": true,
        mx_RightPanel_User_Profile: true
      }),
      id: "mx_RightPanel"
    }, /*#__PURE__*/react.createElement(SeaUserProfile/* default */.Z, {
      room: (_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.room,
      user: null,
      userId: userId,
      feedNode: null
    }));
    // const userAvater = avatarUrl
    //     ? avatarUrl
    //     : getDefaultAvatar({ id: userId });
    return /*#__PURE__*/react.createElement(ErrorBoundary/* default */.Z, null, this.state.infoLoading && this.state.permissionLoading ? /*#__PURE__*/react.createElement(Spinner/* default */.Z, null) : /*#__PURE__*/react.createElement(MainSplit/* default */.Z, {
      panel: rightPanel,
      resizeNotifier: this.props.resizeNotifier
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_AddFriendApply"
    }, /*#__PURE__*/react.createElement("div", {
      className: "user_info"
    }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdAvatar, {
      id: userId,
      src: avatarUrl,
      name: displayName,
      size: "middle"
    }), /*#__PURE__*/react.createElement("div", {
      className: "user_name"
    }, displayName), /*#__PURE__*/react.createElement("div", {
      className: "user_wallet_address"
    }, walletAddress)), this.state.permissionRule ? this.getApplyContent() : null)));
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/notifications/NotificationState.ts
var NotificationState = __webpack_require__(610954);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/room-list/MessagePreviewStore.ts + 8 modules
var MessagePreviewStore = __webpack_require__(686821);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/inbox/components/NotificationHeader.tsx
var NotificationHeader = __webpack_require__(190968);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/inbox/components/NotificationRoom.tsx

const NotificationRoom_excluded = ["resizeNotifier", "room", "clientId"];











const NotificationRoom = _ref => {
  let {
      resizeNotifier,
      room,
      clientId
    } = _ref,
    props = (0,objectWithoutProperties/* default */.Z)(_ref, NotificationRoom_excluded);
  const [showRightPanel, setShowRightPanel] = (0,react.useState)(false);
  const state = (0,useLeftPanelState/* useInboxNotificationState */.L8)();
  const onRightPanelStoreUpdate = () => {
    setShowRightPanel(RightPanelStore/* default */.Z.getSharedInstance().isOpenForRoom);
  };
  const rightPanelStoreToken = RightPanelStore/* default */.Z.getSharedInstance().addListener(onRightPanelStoreUpdate);
  (0,react.useEffect)(() => {
    return () => {
      if (rightPanelStoreToken) {
        rightPanelStoreToken.remove && rightPanelStoreToken.remove();
      }
    };
  }, [rightPanelStoreToken]);
  (0,react.useEffect)(() => {
    if (room) {
      const events = room.timeline;
      MatrixClientPeg/* MatrixClientPeg */.p.get().setRoomReadMarkers(room.roomId, "", events !== null && events !== void 0 && events.length ? events[events.length - 1] : null, {
        hidden: false
      }).then(() => {
        RoomNotificationStateStore/* RoomNotificationStateStore */.v.instance.getRoomState(room).clearUnRead();
        MessagePreviewStore/* MessagePreviewStore */.z.instance.dispatchPreviewChange(room);
        RoomNotificationStateStore/* RoomNotificationStateStore */.v.instance.emit(NotificationState/* NOTIFICATION_STATE_UPDATE */.QW);
      }).catch(e => {
        console.error(e);
      });
    }
  }, [room]);
  const _rightPanel = showRightPanel ? /*#__PURE__*/react.createElement(RightPanel/* default */.Z, {
    resizeNotifier: resizeNotifier,
    room: room
  }) : null;
  return /*#__PURE__*/react.createElement("main", {
    className: "mx_RoomView"
  }, /*#__PURE__*/react.createElement(NotificationHeader/* NotificationRoomHeaderWrapper */.QG, null, /*#__PURE__*/react.createElement(NotificationHeader/* NotificationRoomHeader */.oZ, {
    room: room
  })), /*#__PURE__*/react.createElement(MainSplit/* default */.Z, {
    resizeNotifier: resizeNotifier,
    panel: (state === null || state === void 0 ? void 0 : state.openPanel) && _rightPanel
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_LeftPanelContent"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_LeftPanelContent_content"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_NotificationPanel"
  }, /*#__PURE__*/react.createElement(components_CommonNotificationList, {
    clientId: clientId
  }))))));
};
/* harmony default export */ const components_NotificationRoom = (NotificationRoom);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/login_components/stepViews/CreateView.tsx
var CreateView = __webpack_require__(485807);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/MegolmExportEncryption.ts
var MegolmExportEncryption = __webpack_require__(960221);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/login_components/SendingPassportDialog.tsx




const SendingPassportDialog = props => {
  const {
    onFinished
  } = props;
  const [walletMnemonic, setWalletMnemonic] = (0,react.useState)();
  const _walletMnemonic = localStorage.getItem("current_wallet");
  (0,react.useEffect)(() => {
    if (_walletMnemonic) {
      const enc = new TextEncoder().encode(_walletMnemonic).buffer;
      (0,MegolmExportEncryption/* decryptMegolmKeyFile */.et)(enc, "SendingMe").then(text => {
        setWalletMnemonic(text);
      });
    }
  }, [_walletMnemonic]);
  if (!_walletMnemonic) {
    onFinished();
  }
  return /*#__PURE__*/react.createElement(BaseDialog/* default */.Z, {
    hasCancel: true,
    onFinished: onFinished
  }, /*#__PURE__*/react.createElement(CreateView/* default */.Z, {
    mnemonic: walletMnemonic,
    onFinished: onFinished
  }));
};
/* harmony default export */ const login_components_SendingPassportDialog = (SendingPassportDialog);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ActivityNotificationDialog.tsx





const NEVER_DISPLAY_ACT_DIALOG_KEY = "NEVER_DISPLAY_ACT_DIALOG_KEY";
const ONLY_ONCE_EVENT_TAG_KEY = "ONLY_ONCE_EVENT_TAG_KEY";
const ActivityNotificationDialog = /*#__PURE__*/(0,react.memo)(() => {
  const cli = (0,react.useContext)(MatrixClientContext/* default */.Z);
  const {
    data
  } = (0,ahooks_lib.useRequest)(() => cli.fetchGlobalActivityState());
  const [isModalOpen, {
    setTrue: setModalOpen,
    setFalse: setModalClose
  }] = (0,ahooks_lib.useBoolean)(false);
  const isUserDisabledDialogImageTag = localStorage.getItem(NEVER_DISPLAY_ACT_DIALOG_KEY);

  // never display the same event
  const onDialogDisplaySet = ev => {
    if (ev.target.checked) {
      localStorage.setItem(NEVER_DISPLAY_ACT_DIALOG_KEY, data === null || data === void 0 ? void 0 : data.image_url);
    } else {
      localStorage.removeItem(NEVER_DISPLAY_ACT_DIALOG_KEY);
    }
  };

  // if it is a special event that just need display once
  const onOnceEventMark = () => {
    if ((data === null || data === void 0 ? void 0 : data.frequency) === 1) {
      localStorage.setItem(ONLY_ONCE_EVENT_TAG_KEY, data === null || data === void 0 ? void 0 : data.image_url);
    }
  };
  const handleClose = () => {
    setModalClose();
    onOnceEventMark();
  };
  (0,react.useEffect)(() => {
    if (!data) {
      return;
    }
    if ((data === null || data === void 0 ? void 0 : data.enable) !== 1) {
      return;
    }
    // hide modal. unless event changed
    if (isUserDisabledDialogImageTag && isUserDisabledDialogImageTag === (data === null || data === void 0 ? void 0 : data.image_url)) {
      return;
    }
    if (!(data !== null && data !== void 0 && data.expiry_time)) {
      return;
    }
    // danger! do not trust the local time
    if (new Date().getTime() > (data === null || data === void 0 ? void 0 : data.expiry_time)) {
      return;
    }
    // only once & displayed. then do not need display again.
    if ((data === null || data === void 0 ? void 0 : data.frequency) === 1 && localStorage.getItem(ONLY_ONCE_EVENT_TAG_KEY) === (data === null || data === void 0 ? void 0 : data.image_url)) {
      return;
    }
    setModalOpen();
  }, [data, isUserDisabledDialogImageTag]);
  if (isModalOpen) {
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_ActivityNotifyDialog"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_ActivityNotifyDialog_dialog"
    }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
      icon: "CloseOutlines",
      className: "mx_ActivityNotifyDialog_dialog_close",
      onClick: handleClose
    }), (data === null || data === void 0 ? void 0 : data.image_url) && /*#__PURE__*/react.createElement("img", {
      src: data === null || data === void 0 ? void 0 : data.image_url,
      className: "mx_ActivityNotifyDialog_poster"
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_ActivityNotifyDialog_footer"
    }, /*#__PURE__*/react.createElement(lib.Checkbox, {
      onChange: onDialogDisplaySet,
      className: "mx_ActivityNotifyDialog_footer_checkbox"
    }, "Don't show any more"), (data === null || data === void 0 ? void 0 : data.link) && /*#__PURE__*/react.createElement("a", {
      target: "_blank",
      href: data === null || data === void 0 ? void 0 : data.link,
      className: "link-btn",
      onClick: handleClose
    }, "GO"))));
  }
  return null;
});
ActivityNotificationDialog.displayName = "ActivityNotificationDialog";
/* harmony default export */ const dialogs_ActivityNotificationDialog = (ActivityNotificationDialog);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/floating_modal/LiveFloatingWidget.tsx

function LiveFloatingWidget_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function LiveFloatingWidget_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? LiveFloatingWidget_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : LiveFloatingWidget_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * @file 直播悬浮窗
 */







const LiveFloatingWidget_H_ASPECT_RATIO = 16 / 9;
const LiveFloatingWidget_BORDER_WIDTH = 4 + 4;
const LiveFloatingWidget_MINI_WIDTH = 280 - LiveFloatingWidget_BORDER_WIDTH;
const LiveFloatingWidget_V_WIDTH = 390;
const LiveFloatingWidget_V_CONTENT_WIDTH = LiveFloatingWidget_V_WIDTH - LiveFloatingWidget_BORDER_WIDTH;
const backIcon = /*#__PURE__*/react.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "19",
  height: "18",
  viewBox: "0 0 19 18",
  fill: "none"
}, /*#__PURE__*/react.createElement("rect", {
  opacity: "0.01",
  x: "0.25",
  width: "18",
  height: "18",
  fill: "black"
}), /*#__PURE__*/react.createElement("rect", {
  x: "1.64453",
  y: "1.45703",
  width: "15",
  height: "15",
  rx: "3.5",
  stroke: "#858790"
}), /*#__PURE__*/react.createElement("path", {
  d: "M10.8516 13.052L7.71649 9.68056C7.34624 9.2824 7.34624 8.63088 7.71649 8.23272L10.8516 4.86133",
  stroke: "#858790",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}));
function LiveFloatingWidget_getFloadingWidgetInitSize(aspectRatio) {
  const roomBody = document.querySelector(".mx_RoomView");
  const rect = roomBody.getBoundingClientRect();
  const hx = 1;
  if (rect) {
    if (aspectRatio > 1) {
      const {
        width,
        height
      } = rect;
      const _h = width / aspectRatio;
      if (_h / hx >= height) {
        return {
          height: height * hx,
          width: aspectRatio * (height * hx)
        };
      }
      return {
        height: _h,
        width
      };
    } else {
      const {
        height
      } = rect;
      const _w = LiveFloatingWidget_V_CONTENT_WIDTH;
      const _h = _w / aspectRatio;
      return {
        width: _w,
        height: _h > height ? height : _h
      };
    }
  }
}
const LiveFloatingWidget = props => {
  const {
    title,
    type,
    children,
    onResized,
    onClickRoom,
    checkBigScreen
  } = props;
  const [floatingStyle, setFloatingStyle] = (0,react.useState)({});
  const [widgetStatus, setWidgetStatus] = (0,react.useState)();
  const [showTools, setShowTools] = (0,react.useState)(false);
  const startPoint = (0,react.useRef)();
  const widgetPoint = (0,react.useRef)();
  const widgetSize = (0,react.useRef)();
  const resizing = (0,react.useRef)(false);
  const dragStatus = (0,react.useRef)(floating_modal_config/* DragStatus */.LN.End);
  const lock = (0,react.useRef)(false);
  const aspectRatio = LiveFloatingWidget_H_ASPECT_RATIO;
  const showBack = props.sameRoom && widgetStatus !== floating_modal_config/* OprationType */.Xo.FullScreen;
  const pushResized = (0,react.useCallback)(() => {
    var _widgetSize$current, _widgetSize$current2;
    onResized(widgetStatus, (_widgetSize$current = widgetSize.current) === null || _widgetSize$current === void 0 ? void 0 : _widgetSize$current.width, (_widgetSize$current2 = widgetSize.current) === null || _widgetSize$current2 === void 0 ? void 0 : _widgetSize$current2.height);
  }, [onResized, widgetStatus]);
  (0,react.useEffect)(() => {
    const handleMouseUp = () => {
      if (resizing.current) {
        pushResized();
      }
    };
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [pushResized]);
  const onMouseUp = () => {
    unbindEvents();
    resizing.current = false;
    dragStatus.current = floating_modal_config/* DragStatus */.LN.End;
  };
  const onMouseMove = (0,throttle/* default */.Z)((0,react.useCallback)(event => {
    const winHeight = (window.innerHeight || document.body.clientHeight) - 50;
    const winWidth = (window.innerWidth || document.body.clientWidth) - 50;
    if (floating_modal_config/* DragStatus */.LN.Start === dragStatus.current) {
      const left = event.clientX - startPoint.current.x + widgetPoint.current.left;
      const top = event.clientY - startPoint.current.y + widgetPoint.current.top;
      if (top > 0 && left > 0 && top < winHeight && left < winWidth) {
        widgetPoint.current = {
          top: top,
          left
        };
        startPoint.current = {
          x: event.clientX,
          y: event.clientY
        };
        setFloatingStyle(LiveFloatingWidget_objectSpread(LiveFloatingWidget_objectSpread({}, floatingStyle), widgetPoint.current));
      }
    } else if (resizing.current) {
      const x = event.clientX - startPoint.current.x;
      const y = event.clientY - startPoint.current.y;
      let w = 0,
        h = 0;
      if (x / y >= aspectRatio) {
        h = widgetSize.current.height + y;
        w = h * aspectRatio;
      } else {
        w = widgetSize.current.width + x;
        h = w / aspectRatio;
      }
      if (w >= 50) {
        setFloatingStyle(LiveFloatingWidget_objectSpread(LiveFloatingWidget_objectSpread({}, floatingStyle), {}, {
          width: w,
          height: h
        }));
        widgetSize.current = {
          height: h,
          width: w
        };
        startPoint.current = {
          x: event.clientX,
          y: event.clientY
        };
      }
    }
  }, [floatingStyle]), 50);
  const bindEvents = () => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseUp);
  };
  const unbindEvents = () => {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseleave", onMouseUp);
  };
  const onResize = event => {
    event.stopPropagation();
    event.preventDefault();
    resizing.current = true;
    startPoint.current = {
      x: event.clientX,
      y: event.clientY
    };
    setWidgetStatus(floating_modal_config/* OprationType */.Xo.Free);
    bindEvents();
  };
  const onDargStart = event => {
    event.stopPropagation();
    event.preventDefault();
    dragStatus.current = floating_modal_config/* DragStatus */.LN.Start;
    startPoint.current = {
      x: event.clientX,
      y: event.clientY
    };
    setWidgetStatus(floating_modal_config/* OprationType */.Xo.Free);
    bindEvents();
  };

  // const showScaleIcon = 
  // OprationType.FullScreen !== widgetStatus &&
  // dragStatus.current !== DragStatus.Start &&
  // !lock.current &&
  // (resizing.current || showTools);

  (0,react.useEffect)(() => {
    if (floating_modal_config/* OprationType */.Xo.Free !== widgetStatus) {
      lock.current = false;
      if (floating_modal_config/* OprationType */.Xo.MiniScreen === widgetStatus) {
        var _document$querySelect;
        lock.current = true;
        const rect = (_document$querySelect = document.querySelector(".mx_SpacePanel")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getBoundingClientRect();
        widgetSize.current = {
          width: LiveFloatingWidget_MINI_WIDTH,
          height: LiveFloatingWidget_MINI_WIDTH / LiveFloatingWidget_H_ASPECT_RATIO
        };
        widgetPoint.current = {
          left: 70,
          top: (window.innerHeight || document.body.clientHeight) - LiveFloatingWidget_MINI_WIDTH / LiveFloatingWidget_H_ASPECT_RATIO - LiveFloatingWidget_BORDER_WIDTH
        };
      } else if (floating_modal_config/* OprationType */.Xo.FullScreen === widgetStatus) {
        widgetSize.current = {
          width: (window.innerWidth || document.body.clientWidth) - LiveFloatingWidget_BORDER_WIDTH,
          height: (window.innerHeight || document.body.clientHeight) - 41 - LiveFloatingWidget_BORDER_WIDTH
        };
        widgetPoint.current = {
          left: 0,
          top: 0
        };
      } else {
        const size = LiveFloatingWidget_getFloadingWidgetInitSize(aspectRatio);
        widgetSize.current = {
          width: size.width,
          height: size.height
        };
        widgetPoint.current = {
          left: (window.innerWidth || document.body.clientWidth) - size.width - LiveFloatingWidget_BORDER_WIDTH,
          top: 50
        };
      }
      setFloatingStyle(LiveFloatingWidget_objectSpread(LiveFloatingWidget_objectSpread({}, widgetSize.current), widgetPoint.current));
      pushResized();
    }
  }, [widgetStatus]);
  const widgetClasses = classnames_default()({
    mx_FloatingWidget: true,
    mx_FloatingWidget_mini: lock.current,
    hide_back: !showBack
  });
  (0,react.useEffect)(() => {
    checkBigScreen(Number(floatingStyle.height) > 240 && Number(floatingStyle.width) > 430);
  }, [floatingStyle]);
  (0,react.useEffect)(() => {
    if (props.miniFlag) {
      setWidgetStatus(floating_modal_config/* OprationType */.Xo.MiniScreen);
    }
  }, [props.miniFlag]);
  (0,react.useEffect)(() => {
    if (props.initFlag) {
      setWidgetStatus(floating_modal_config/* OprationType */.Xo.Init);
    }
  }, [props.initFlag]);
  return /*#__PURE__*/react.createElement("div", {
    className: widgetClasses,
    style: floatingStyle,
    onMouseEnter: () => setShowTools(true),
    onMouseLeave: () => setShowTools(false)
  }, /*#__PURE__*/react.createElement(floating_modal_FloatingWidgetToolBar, {
    title: title,
    visible: true,
    setWidgetStatus: setWidgetStatus,
    onMouseDown: onDargStart
  }), showBack && /*#__PURE__*/react.createElement("div", {
    className: "mx_FloatingWidget_room_btn",
    onClick: onClickRoom
  }, backIcon), /*#__PURE__*/react.createElement("div", {
    className: "mx_FloatingWidget_iframe_container"
  }, children), /*#__PURE__*/react.createElement("div", {
    className: "scale_button",
    onMouseDown: onResize
  }));
};
/* harmony default export */ const floating_modal_LiveFloatingWidget = (LiveFloatingWidget);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/room/getPermissionStuffState.ts
var getPermissionStuffState = __webpack_require__(369012);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/live/LiveView.tsx








// import LiveSDK from "live-sdk";
// import "live-sdk/lib/index.min.css";


const CloseDialog = props => {
  return /*#__PURE__*/react.createElement(QuestionDialog/* default */.Z, {
    hasCancelButton: true,
    title: (0,languageHandler._t)("Live"),
    description: /*#__PURE__*/react.createElement("div", null, props.desc || (0,languageHandler._t)("Are you sure you want to leave the stream?")),
    button: props.okText || (0,languageHandler._t)("Close"),
    onFinished: props.onFinished
  });
};
const LiveView = props => {
  const [LiveSDK, setLiveSDK] = (0,react.useState)(null);
  const {
    roomId,
    client
  } = props;
  const [room, setRoom] = (0,react.useState)();
  const title = (room === null || room === void 0 ? void 0 : room.name) || roomId;
  const [show, setShow] = (0,react.useState)(false);
  const [showStamp, setShowStamp] = (0,react.useState)(0);
  const [delayShow, setDelayShow] = (0,react.useState)(false);
  const [miniFlag, setMiniFlag] = (0,react.useState)(0);
  const [initFlag, setInitFlag] = (0,react.useState)(0);
  const isShow = (0,react.useRef)(false);
  const isMini = (0,react.useRef)(false);
  const liveRoomId = (0,react.useRef)("");
  const versionRef = (0,react.useRef)("");
  const [resizeTag, setResizeTag] = (0,react.useState)(0);
  const [showSchedule, setShowSchedule] = (0,react.useState)(false);
  const [scheduleSender, setScheduleSender] = (0,react.useState)(null);
  const [showBullet, setShowBullet] = (0,react.useState)(true);
  const [scheduleTime, setSchedulerTime] = (0,react.useState)(0);
  const [isBigScreen, setIsBigScreen] = (0,react.useState)(true);
  (0,react.useEffect)(() => {
    let v = "";
    let link;
    let script;
    fetch("https://live.sending.network/api/site/sdm/sdk-version").then(res => {
      return res.json();
    }).then(res => {
      const remoteVersion = res.data;
      versionRef.current = remoteVersion;
      if (remoteVersion) {
        v = `?v=${remoteVersion}`;
        try {
          localStorage.setItem("live_sdk_version", remoteVersion);
        } catch (error) {}
      } else {
        v = `?v=${Date.now()}`;
      }
    }).catch(e => {
      v = `?v=${Date.now()}`;
    }).finally(() => {
      script = document.createElement('script');
      script.src = `https://live.sending.me/res/live-sdk/index.js${v}`;
      script.async = true;
      script.onload = () => {
        var _window$LiveSdk;
        const sdk = (_window$LiveSdk = window.LiveSdk) === null || _window$LiveSdk === void 0 ? void 0 : _window$LiveSdk.default;
        setLiveSDK(sdk);
      };
      document.body.appendChild(script);
      link = document.createElement('link');
      link.href = `https://live.sending.me/res/live-sdk/index.min.css${v}`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
    const dispatcherRef = dispatcher/* default */.ZP.register(onAction);
    return () => {
      if (link) {
        document.head.removeChild(link);
      }
      if (script) {
        document.body.removeChild(script);
      }
      LiveSDK === null || LiveSDK === void 0 ? void 0 : LiveSDK.closeApp();
      dispatcher/* default */.ZP.dispatch({
        action: "closeLive"
      });
      dispatcher/* default */.ZP.unregister(dispatcherRef);
    };
  }, []);
  (0,react.useEffect)(() => {
    if (LiveSDK) {
      LiveSDK.init({
        root: 'live-root',
        version: versionRef.current
      });
      LiveSDK.tokenLogin();
      LiveSDK.getLiveStateNodeToken();
    }
  }, [LiveSDK]);
  (0,react.useEffect)(() => {
    if (!LiveSDK) return;
    if (show) {
      isShow.current = true;
      setDelayShow(true);
    } else {
      isShow.current = false;
      liveRoomId.current = "";
      LiveSDK === null || LiveSDK === void 0 ? void 0 : LiveSDK.closeApp();
      setDelayShow(false);
      setMiniFlag(0);
      setInitFlag(0);
    }
  }, [show, LiveSDK]);
  (0,react.useEffect)(() => {
    if (delayShow && room) {
      const self = room.getMember(client.getUserId());
      let owner = room.getMember(room.getOwner());
      if (!owner) {
        const parent = room.getParentRoom();
        if (parent) {
          owner = parent.getMember(parent.getOwner());
        }
      }
      LiveSDK.bindView();
      const user = {
        id: self.userId,
        address: self.walletAddress,
        name: self.rawDisplayName,
        avatar: self.getMxcAvatarUrl() || '',
        data: self
      };
      const liveRoom = {
        id: room.roomId,
        name: room.name,
        ownerId: room.getOwner(),
        data: room
      };
      const liveOwner = {
        id: owner.userId,
        address: owner.walletAddress,
        name: owner.rawDisplayName,
        avatar: owner.getMxcAvatarUrl() || '',
        data: owner
      };
      let role = 2;
      if (user.id === liveOwner.id) {
        role = 1;
      } else {
        const admin = (0,getPermissionStuffState/* getHostLivePermission */.No)({
          roomId: room.roomId
        });
        if (admin) {
          role = 3;
        }
      }
      liveRoomId.current = room.roomId;
      setTimeout(() => {
        LiveSDK.openApp({
          user: user,
          room: liveRoom,
          owner: liveOwner,
          role: role,
          hosts: room.getMembers(),
          assistants: [],
          uploadImage: function (file) {
            return null;
          }
        });
      }, 100);
    }
  }, [delayShow]);
  (0,react.useEffect)(() => {
    if (!delayShow) {
      return;
    }
    if (room && room.roomId !== roomId && !isMini.current) {
      setMiniFlag(Date.now());
    } else {
      setMiniFlag(0);
    }
  }, [room === null || room === void 0 ? void 0 : room.roomId, roomId]);

  // useEffect(() => {
  //     if (delayShow && !room) {
  //         setShow(false);
  //     }
  // }, [room]);

  const onAction = payload => {
    switch (payload.action) {
      case "show_live_view":
        if (isShow.current) {
          if (liveRoomId.current === payload.roomId) {
            setInitFlag(Date.now());
          } else {
            Modal/* default */.Z.createDialog(CloseDialog, {
              desc: "Would you like to switch to the current live stream?",
              okText: "Switch",
              onFinished: close => {
                if (close) {
                  setShow(false);
                  setTimeout(() => {
                    onAction(payload);
                  }, 100);
                }
              }
            });
          }
        } else {
          setShow(true);
          if (client && payload.roomId) {
            setRoom(client.getRoom(payload.roomId));
          }
        }
        break;
      case actions/* Action */.a.SetFloatingWidget:
        if (payload.phase === FloatingWidgetStorePhases/* FloatingWidgetPhase */.Z.FloatingWidget && payload.showFloatingWidget === false && isShow.current) {
          Modal/* default */.Z.createDialog(CloseDialog, {
            onFinished: close => {
              if (close) {
                setShow(false);
                setShowSchedule(false);
              }
            }
          });
        }
        break;
      case "show_schedule_view":
        setSchedulerTime(payload.startedTime);
        setScheduleSender(payload.sender);
        setShowSchedule(true);
        break;
      case "hidden_schedule_view":
        setSchedulerTime(0);
        setScheduleSender(null);
        setShowSchedule(false);
        break;
    }
  };
  const onResized = (type, width, height) => {
    let liveScreenType = 'default';
    if (type === floating_modal_config/* OprationType */.Xo.MiniScreen) {
      liveScreenType = 'mini';
      isMini.current = true;
    } else {
      isMini.current = false;
    }
    LiveSDK.onResize({
      type: liveScreenType,
      width: width,
      height: height
    });
  };
  const onClickRoom = () => {
    if (room) {
      dispatcher/* default */.ZP.dispatch({
        action: "view_room",
        room_id: room.roomId
      });
    }
  };
  const checkBigScreen = flag => {
    setIsBigScreen(flag);
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "live_view_cont"
  }, delayShow && /*#__PURE__*/react.createElement(floating_modal_LiveFloatingWidget, {
    title: title,
    onResized: onResized,
    onClickRoom: onClickRoom,
    checkBigScreen: checkBigScreen,
    miniFlag: miniFlag,
    initFlag: initFlag,
    sameRoom: (room === null || room === void 0 ? void 0 : room.roomId) !== roomId
  }, /*#__PURE__*/react.createElement("div", {
    id: "live-root"
  })));
};
/* harmony default export */ const live_LiveView = (LiveView);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/room/getRoomScene.ts
var getRoomScene = __webpack_require__(827337);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/invite/hooks/useInvitationManager.tsx







const generateInvitationRooms = (0,lodash.debounce)(() => {
  const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
  if (!cli) {
    return;
  }
  const groups = [];
  const squad = [];
  const works = [];
  const allInvites = [];
  const allRooms = cli.getVisibleRooms() || [];
  allRooms.forEach(room => {
    if (room.getMyMembership() === "invite") {
      allInvites.push(room);
      if ((0,getRoomScene/* isCommunityRoom */.eg)(room)) {
        squad.push(room);
      }
      if ((0,getRoomScene/* isWorkRoom */.PI)(room) && !room.isDmRoom()) {
        works.push(room);
      }
      if (!room.isSpaceRoom() && !room.hasSpaceParent() && !room.isDmRoom()) {
        groups.push(room);
      }
    }
  });
  (0,invitationStore/* updateInvitationList */.i)({
    groups,
    squad,
    works,
    allInvites
  });
  calculateNewInvitations();
}, 2000, {
  trailing: true
});

/**
 * manage and calculate invite count state when `loggedInView` rendered & `ON_INVITE_LISTS_UPDATE_EVENT` triggered
 * 当 `loggedInView` 组件渲染 以及 `ON_INVITE_LISTS_UPDATE_EVENT` 事件触发时重新计算邀请数量
 */
const useInvitationManager = () => {
  (0,react.useEffect)(() => {
    generateInvitationRooms();
    // noop
    RoomListStore/* default */.ZP.instance.on(RoomListStore/* ON_INVITE_LISTS_UPDATE_EVENT */.VE, generateInvitationRooms);
    return () => {
      RoomListStore/* default */.ZP.instance.off(RoomListStore/* ON_INVITE_LISTS_UPDATE_EVENT */.VE, generateInvitationRooms);
    };
  }, []);
};
/* harmony default export */ const hooks_useInvitationManager = (useInvitationManager);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/layout/components/InviteManagerProvider.tsx



/**
 * calculate & manage invitation state
 */
const InviteManagerProvider = /*#__PURE__*/(0,react.memo)(({
  children
}) => {
  hooks_useInvitationManager();
  return /*#__PURE__*/react.createElement(react.Fragment, null, children);
});
InviteManagerProvider.displayName = 'InviteManagerProvider';
/* harmony default export */ const components_InviteManagerProvider = (InviteManagerProvider);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/layout/components/NotificationManagerProvider.tsx
var NotificationManagerProvider = __webpack_require__(46751);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/SceneStore.tsx
var SceneStore = __webpack_require__(38255);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/layout/components/AppSingleInstanceContext.tsx


const AppContext = /*#__PURE__*/(0,react.createContext)({
  AppSceneStore: SceneStore/* default */.ZP.instance
});
const useAppContext = () => {
  const appContext = useContext(AppContext);
  return useMemo(() => appContext, [appContext]);
};

/**
 * manage all stories & single class instance here
 */
const AppSingleInstanceContextProvider = /*#__PURE__*/(0,react.memo)(({
  children
}) => {
  // must be a single instance !!!
  const appContextRef = (0,react.useRef)({
    AppSceneStore: SceneStore/* default */.ZP.instance
    // other data that u needs....
  });

  (0,react.useEffect)(() => {
    // i noticed some data may initialed before user interface displayed
    appContextRef.current.AppSceneStore.channelIdInitial();
    return () => null;
  }, []);
  return /*#__PURE__*/react.createElement(AppContext.Provider, {
    key: "AppContext.Provider",
    value: appContextRef.current
  }, children);
});
/* harmony default export */ const AppSingleInstanceContext = (AppSingleInstanceContextProvider);
// EXTERNAL MODULE: ./node_modules/lodash-es/debounce.js
var debounce = __webpack_require__(453434);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/RoomSubLists/stores/useNotificationViewTileStore.ts
var useNotificationViewTileStore = __webpack_require__(628357);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/RoomSubLists/components/NotificationRegister.tsx






/**
 * check if no `m.notification` event room
 */
const NotificationRegister = /*#__PURE__*/(0,react.memo)(() => {
  const cli = (0,react.useContext)(MatrixClientContext/* default */.Z);
  (0,react.useEffect)(() => {
    const callback = (0,debounce/* default */.Z)(event => {
      try {
        const content = event === null || event === void 0 ? void 0 : event.getContent();
        if ('m.notification' in content) {
          // new event
          (0,useNotificationViewTileStore/* fetchNotificationViewTileState */.Jd)().finally(() => {
            RoomListStore/* default */.ZP.instance.emit(RoomListStore/* LISTS_UPDATE_EVENT */.N);
          });
        }
      } catch (error) {
        // pass
      }
    }, 500);
    cli.on('Room.timeline', callback);
    (0,useNotificationViewTileStore/* fetchNotificationViewTileState */.Jd)();
    return () => {
      cli.removeListener('Room.timeline', callback);
    };
  }, [cli]);
  return /*#__PURE__*/react.createElement(react.Fragment, null);
});
NotificationRegister.displayName = 'NotificationRegister';
/* harmony default export */ const components_NotificationRegister = (NotificationRegister);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/layout/index.tsx







// i wonder what if we can manage all global state here!
// create global event bus here
// resister global event listener here
// and update all state here
// then consumer take the state what they needs
// 在最顶层对事件总线/状态进行管理，
// 渲染组件不再使用快照
// 而是作为 state consumer
const AppLayout = /*#__PURE__*/(0,react.memo)(({
  children
}) => {
  return /*#__PURE__*/react.createElement(AppSingleInstanceContext, {
    key: "AppSingleInstanceContextProvider"
  }, /*#__PURE__*/react.createElement(components_InviteManagerProvider, {
    key: "InviteManagerProvider"
  }, /*#__PURE__*/react.createElement(NotificationManagerProvider/* default */.ZP, {
    key: "NotificationManagerProvider"
  }, /*#__PURE__*/react.createElement(FriendRequestManagerProvider/* default */.ZP, {
    key: "FriendRequestManagerProvider"
  }, children, /*#__PURE__*/react.createElement(components_NotificationRegister, null)))));
});
AppLayout.displayName = "AppLayout";
/* harmony default export */ const layout = (AppLayout);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/LoggedInView.tsx

function LoggedInView_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function LoggedInView_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? LoggedInView_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : LoggedInView_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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











// import HomePage from "./HomePage";











// import { replaceableComponent } from "../../utils/replaceableComponent";




// import RoomView from "./RoomView";
const RoomView = /*#__PURE__*/(0,react.lazy)(() => Promise.all(/* import() */[__webpack_require__.e(4915), __webpack_require__.e(3520)]).then(__webpack_require__.bind(__webpack_require__, 934915)));














// import FavoritePage from './FavoritePage';



// import Recommendations from "./Recommendations";
const LoggedInView_Recommendations = /*#__PURE__*/(0,react.lazy)(() => Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 974184)));
// import LeftPanelContainer from "./LeftPanelContainer";
const LeftPanelContainer = /*#__PURE__*/(0,react.lazy)(() => __webpack_require__.e(/* import() */ 1597).then(__webpack_require__.bind(__webpack_require__, 631597)));
















// We need to fetch each pinned message individually (if we don't already have it)
// so each pinned message may trigger a request. Limit the number per room for sanity.
// NB. this is just for server notices rather than pinned messages in general.
const MAX_PINNED_NOTICES_PER_ROOM = 2;
let durationInterval = 0;
const INTERVAL = 30 * 1000;
function canElementReceiveInput(el) {
  return el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || !!el.getAttribute("contenteditable");
}
/**
 * This is what our MatrixChat shows when we are logged in. The precise view is
 * determined by the page_type property.
 *
 * Currently it's very tightly coupled with MatrixChat. We should try to do
 * something about that.
 *
 * Components mounted below us can access the matrix client via the react context.
 */ // @replaceableComponent("structures.LoggedInView")
class LoggedInView extends react.PureComponent {
  constructor(props, context) {
    var _props$currentRoomId;
    super(props, context);
    (0,defineProperty/* default */.Z)(this, "dispatcherRef", void 0);
    (0,defineProperty/* default */.Z)(this, "toggleSize", 85);
    (0,defineProperty/* default */.Z)(this, "_matrixClient", void 0);
    (0,defineProperty/* default */.Z)(this, "_roomView", void 0);
    // protected readonly _resizeContainer: React.RefObject<HTMLDivElement>;
    // protected readonly resizeHandler: React.RefObject<HTMLDivElement>;
    (0,defineProperty/* default */.Z)(this, "compactLayoutWatcherRef", void 0);
    (0,defineProperty/* default */.Z)(this, "backgroundImageWatcherRef", void 0);
    (0,defineProperty/* default */.Z)(this, "resizer", void 0);
    (0,defineProperty/* default */.Z)(this, "rightPanelStoreToken", void 0);
    (0,defineProperty/* default */.Z)(this, "saveMessage", event => {
      this._matrixClient.opfsStore.addMessage({
        roomId: event.event.room_id,
        content: event.event.content.body,
        sender: event.event.sender,
        eventId: event.event.event_id,
        originServerTs: event.event.origin_server_ts,
        event
      });
    });
    (0,defineProperty/* default */.Z)(this, "handleLeftPanelVisible", () => {
      const selected = LeftPanelStore/* default */.ZP.instance.getState().selected;
      if (typeof selected !== "symbol" || selected === LeftPanelStore/* CONTACT_TAB */.YJ || selected === LeftPanelStore/* HOME_TAB */.e9) {
        this.setState({
          leftPanelVisible: true
        });
      } else {
        this.setState({
          leftPanelVisible: false
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "refreshBackgroundImage", async () => {
      let backgroundImage = SettingsStore/* default */.C.getValue("RoomList.backgroundImage");
      if (backgroundImage) {
        // convert to http before going much further
        backgroundImage = (0,Media/* mediaFromMxc */.TS)(backgroundImage).srcHttp;
      } else {
        backgroundImage = OwnProfileStore.OwnProfileStore.instance.getHttpAvatarUrl();
      }
      this.setState({
        backgroundImage
      });
    });
    (0,defineProperty/* default */.Z)(this, "onRightPanelStoreUpdate", () => {
      this.setState({
        showFloatingWidget: FloatingWidgetStore.getSharedInstance().isOpen,
        phaseParams: FloatingWidgetStore.getSharedInstance().floatingWidgetPhaseParams
      });
    });
    (0,defineProperty/* default */.Z)(this, "onAction", payload => {
      switch (payload.action) {
        case "call_state":
          {
            const activeCalls = CallHandler/* default */.ZP.sharedInstance().getAllActiveCalls();
            if (activeCalls !== this.state.activeCalls) {
              this.setState({
                activeCalls
              });
            }
            break;
          }
        case actions/* Action */.a.ShowLeftPanel:
          this.setState({
            shouldHideLeftPanel: false
          });
          break;
        case actions/* Action */.a.HideLeftPanel:
          this.setState({
            shouldHideLeftPanel: true
          });
          break;
        case actions/* Action */.a.ShowRoomPanel:
          this.setState({
            roomViewVisble: true,
            shouldHideLeftPanel: true
          });
          break;
        case actions/* Action */.a.HideRoomPanel:
          this.setState({
            roomViewVisble: false
          });
          dispatcher/* default */.ZP.dispatch({
            action: actions/* Action */.a.HideRightPanel
          });
          break;
        // case "three_pid_update":
        //     if (payload?.params.threePid === "twitter") {
        //         this.setState({
        //             justFinishOnBoarding: true,
        //         });
        //     }
      }
    });
    (0,defineProperty/* default */.Z)(this, "canResetTimelineInRoom", roomId => {
      if (!this._roomView.current) {
        return true;
      }
      return this._roomView.current.canResetTimeline();
    });
    (0,defineProperty/* default */.Z)(this, "onAccountData", event => {
      if (event.getType() === "m.ignored_user_list") {
        dispatcher/* default */.ZP.dispatch({
          action: "ignore_state_changed"
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onCompactLayoutChanged", (setting, roomId, level, valueAtLevel, newValue) => {
      this.setState({
        useCompactLayout: valueAtLevel
      });
    });
    (0,defineProperty/* default */.Z)(this, "onSync", (syncState, oldSyncState, data) => {
      const oldErrCode = this.state.syncErrorData && this.state.syncErrorData.error && this.state.syncErrorData.error.errcode;
      const newErrCode = data && data.error && data.error.errcode;
      if (syncState === oldSyncState && oldErrCode === newErrCode) return;
      if (syncState === "ERROR") {
        this.setState({
          syncErrorData: data
        });
      } else {
        this.setState({
          syncErrorData: undefined
        });
      }
      if (oldSyncState === "PREPARED" && syncState === "SYNCING") {
        this.updateServerNoticeEvents();
      } else {
        this.calculateServerLimitToast(this.state.syncErrorData, this.state.usageLimitEventContent);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onRoomStateEvents", (ev, state) => {
      const serverNoticeList = RoomListStore/* default */.ZP.instance.orderedLists[models/* DefaultTagID */.lL.ServerNotice];
      if (serverNoticeList && serverNoticeList.some(r => r.roomId === ev.getRoomId())) {
        this.updateServerNoticeEvents();
      }
    });
    (0,defineProperty/* default */.Z)(this, "onUsageLimitDismissed", () => {
      this.setState({
        usageLimitDismissed: true
      });
    });
    (0,defineProperty/* default */.Z)(this, "updateServerNoticeEvents", async () => {
      const serverNoticeList = RoomListStore/* default */.ZP.instance.orderedLists[models/* DefaultTagID */.lL.ServerNotice];
      if (!serverNoticeList) return [];
      const events = [];
      let pinnedEventTs = 0;
      for (const room of serverNoticeList) {
        const pinStateEvent = room.currentState.getStateEvents("m.room.pinned_events", "");
        if (!pinStateEvent || !pinStateEvent.getContent().pinned) continue;
        pinnedEventTs = pinStateEvent.getTs();
        const pinnedEventIds = pinStateEvent.getContent().pinned.slice(0, MAX_PINNED_NOTICES_PER_ROOM);
        for (const eventId of pinnedEventIds) {
          const timeline = await this._matrixClient.getEventTimeline(room.getUnfilteredTimelineSet(), eventId);
          const event = timeline.getEvents().find(ev => ev.getId() === eventId);
          if (event) events.push(event);
        }
      }
      if (pinnedEventTs && this.state.usageLimitEventTs > pinnedEventTs) {
        // We've processed a newer event than this one, so ignore it.
        return;
      }
      const usageLimitEvent = events.find(e => {
        return e && e.getType() === "m.room.message" && e.getContent()["server_notice_type"] === "m.server_notice.usage_limit_reached";
      });
      const usageLimitEventContent = usageLimitEvent && usageLimitEvent.getContent();
      this.calculateServerLimitToast(this.state.syncErrorData, usageLimitEventContent);
      this.setState({
        usageLimitEventContent,
        usageLimitEventTs: pinnedEventTs,
        // This is a fresh toast, we can show toasts again
        usageLimitDismissed: false
      });
    });
    (0,defineProperty/* default */.Z)(this, "onPaste", ev => {
      let canReceiveInput = false;
      let element = ev.target;
      // test for all parents because the target can be a child of a contenteditable element
      while (!canReceiveInput && element) {
        canReceiveInput = canElementReceiveInput(element);
        element = element.parentElement;
      }
      if (!canReceiveInput) {
        // refocusing during a paste event will make the
        // paste end up in the newly focused element,
        // so dispatch synchronously before paste happens
        dispatcher/* default */.ZP.fire(actions/* Action */.a.FocusSendMessageComposer, true);
      }
    });
    /*
    SOME HACKERY BELOW:
    React optimizes event handlers, by always attaching only 1 handler to the document for a given type.
    It then internally determines the order in which React event handlers should be called,
    emulating the capture and bubbling phases the DOM also has.
     But, as the native handler for React is always attached on the document,
    it will always run last for bubbling (first for capturing) handlers,
    and thus React basically has its own event phases, and will always run
    after (before for capturing) any native other event handlers (as they tend to be attached last).
     So ideally one wouldn't mix React and native event handlers to have bubbling working as expected,
    but we do need a native event handler here on the document,
    to get keydown events when there is no focused element (target=body).
     We also do need bubbling here to give child components a chance to call `stopPropagation()`,
    for keydown events it can handle itself, and shouldn't be redirected to the composer.
     So we listen with React on this component to get any events on focused elements, and get bubbling working as expected.
    We also listen with a native listener on the document to get keydown events when no element is focused.
    Bubbling is irrelevant here as the target is the body element.
    */
    (0,defineProperty/* default */.Z)(this, "onReactKeyDown", ev => {
      // events caught while bubbling up on the root element
      // of this component, so something must be focused.
      this.onKeyDown(ev);
    });
    (0,defineProperty/* default */.Z)(this, "onNativeKeyDown", ev => {
      // only pass this if there is no focused element.
      // if there is, onKeyDown will be called by the
      // react keydown handler that respects the react bubbling order.
      if (ev.target === document.body) {
        this.onKeyDown(ev);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onKeyDown", ev => {
      let handled = false;
      const roomAction = (0,KeyBindingsManager/* getKeyBindingsManager */.zL)().getRoomAction(ev);
      switch (roomAction) {
        case KeyBindingsManager/* RoomAction */.P1.ScrollUp:
        case KeyBindingsManager/* RoomAction */.P1.RoomScrollDown:
        case KeyBindingsManager/* RoomAction */.P1.JumpToFirstMessage:
        case KeyBindingsManager/* RoomAction */.P1.JumpToLatestMessage:
          // pass the event down to the scroll panel
          this.onScrollKeyPressed(ev);
          handled = true;
          break;
        case KeyBindingsManager/* RoomAction */.P1.FocusSearch:
          dispatcher/* default */.ZP.dispatch({
            action: "focus_search"
          });
          handled = true;
          break;
      }
      if (handled) {
        ev.stopPropagation();
        ev.preventDefault();
        return;
      }
      const navAction = (0,KeyBindingsManager/* getKeyBindingsManager */.zL)().getNavigationAction(ev);
      switch (navAction) {
        case KeyBindingsManager/* NavigationAction */.Lo.FocusRoomSearch:
          dispatcher/* default */.ZP.dispatch({
            action: "focus_room_filter"
          });
          handled = true;
          break;
        case KeyBindingsManager/* NavigationAction */.Lo.ToggleUserMenu:
          dispatcher/* default */.ZP.fire(actions/* Action */.a.ToggleUserMenu);
          handled = true;
          break;
        case KeyBindingsManager/* NavigationAction */.Lo.ToggleShortCutDialog:
          KeyboardShortcuts/* toggleDialog */.a3();
          handled = true;
          break;
        case KeyBindingsManager/* NavigationAction */.Lo.GoToHome:
          dispatcher/* default */.ZP.dispatch({
            action: "view_home_page"
          });
          Modal/* default */.Z.closeCurrentModal("homeKeyboardShortcut");
          handled = true;
          break;
        case KeyBindingsManager/* NavigationAction */.Lo.ToggleRoomSidePanel:
          if (this.props.page_type === "room_view" || this.props.page_type === "group_view") {
            dispatcher/* default */.ZP.dispatch({
              action: actions/* Action */.a.ToggleRightPanel,
              type: this.props.page_type === "room_view" ? "room" : "group"
            });
            handled = true;
          }
          break;
        case KeyBindingsManager/* NavigationAction */.Lo.SelectPrevRoom:
          dispatcher/* default */.ZP.dispatch({
            action: actions/* Action */.a.ViewRoomDelta,
            delta: -1,
            unread: false
          });
          handled = true;
          break;
        case KeyBindingsManager/* NavigationAction */.Lo.SelectNextRoom:
          dispatcher/* default */.ZP.dispatch({
            action: actions/* Action */.a.ViewRoomDelta,
            delta: 1,
            unread: false
          });
          handled = true;
          break;
        case KeyBindingsManager/* NavigationAction */.Lo.SelectPrevUnreadRoom:
          dispatcher/* default */.ZP.dispatch({
            action: actions/* Action */.a.ViewRoomDelta,
            delta: -1,
            unread: true
          });
          break;
        case KeyBindingsManager/* NavigationAction */.Lo.SelectNextUnreadRoom:
          dispatcher/* default */.ZP.dispatch({
            action: actions/* Action */.a.ViewRoomDelta,
            delta: 1,
            unread: true
          });
          break;
        default:
          // if we do not have a handler for it, pass it to the platform which might
          handled = PlatformPeg/* default */.Z.get().onKeyDown(ev);
      }
      if (handled) {
        ev.stopPropagation();
        ev.preventDefault();
        return;
      }
      const isModifier = ev.key === Keyboard/* Key */.sr.ALT || ev.key === Keyboard/* Key */.sr.CONTROL || ev.key === Keyboard/* Key */.sr.META || ev.key === Keyboard/* Key */.sr.SHIFT;
      if (!isModifier && !ev.ctrlKey && !ev.metaKey) {
        // The above condition is crafted to _allow_ characters with Shift
        // already pressed (but not the Shift key down itself).
        const isClickShortcut = ev.target !== document.body && (ev.key === Keyboard/* Key */.sr.SPACE || ev.key === Keyboard/* Key */.sr.ENTER);

        // We explicitly allow alt to be held due to it being a common accent modifier.
        // XXX: Forwarding Dead keys in this way does not work as intended but better to at least
        // move focus to the composer so the user can re-type the dead key correctly.
        const isPrintable = ev.key.length === 1 || ev.key === "Dead";

        // If the user is entering a printable character outside of an input field
        // redirect it to the composer for them.
        if (!isClickShortcut && isPrintable && !canElementReceiveInput(ev.target)) {
          // synchronous dispatch so we focus before key generates input
          dispatcher/* default */.ZP.fire(actions/* Action */.a.FocusSendMessageComposer, true);
          ev.stopPropagation();
          // we should *not* preventDefault() here as that would prevent typing in the now-focused composer
        }
      }
    });
    /**
     * dispatch a page-up/page-down/etc to the appropriate component
     * @param {Object} ev The key event
     */
    (0,defineProperty/* default */.Z)(this, "onScrollKeyPressed", ev => {
      if (this._roomView.current) {
        this._roomView.current.handleScrollKey(ev);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onFinishBoarding", () => {
      var _this$props$initialSc, _this$props$initialSc2;
      if (!(0,units/* isMobile */.tq)() || !((_this$props$initialSc = this.props.initialScreenAfterLogin) !== null && _this$props$initialSc !== void 0 && (_this$props$initialSc2 = _this$props$initialSc.screen) !== null && _this$props$initialSc2 !== void 0 && _this$props$initialSc2.startsWith("room"))) {
        this.setState({
          justFinishOnBoarding: true
        }, () => {
          Modal/* default */.Z.createDialog(points_task_WelcomeDialog, {
            onFinished: () => {}
          }, "mx_PointWelcome_Dialog");
        });
      }
      this.setState({
        justFinishOnBoarding: true
      }, () => {
        Modal/* default */.Z.createDialog(login_components_SendingPassportDialog, {
          onFinished: () => {}
        }, "mx_SendingPassport_Dialog");
      });
    });
    (0,defineProperty/* default */.Z)(this, "onSkipUserGuid", () => {
      this.setState({
        isSkipUserGuid: true
      });
    });
    const _room = MatrixClientPeg/* MatrixClientPeg */.p.get().getRoom((_props$currentRoomId = props.currentRoomId) !== null && _props$currentRoomId !== void 0 ? _props$currentRoomId : "");
    this.state = {
      syncErrorData: undefined,
      // use compact timeline view
      useCompactLayout: SettingsStore/* default */.C.getValue("useCompactLayout"),
      usageLimitDismissed: false,
      activeCalls: CallHandler/* default */.ZP.sharedInstance().getAllActiveCalls(),
      leftPanelVisible: true,
      showFloatingWidget: FloatingWidgetStore.getSharedInstance().isOpen,
      phaseParams: FloatingWidgetStore.getSharedInstance().floatingWidgetPhaseParams,
      // leftPanelClasses: ["mx_LeftPanel_wrapper"],
      roomViewVisble: ["explore", "markets"].includes(props.initialScreenAfterLogin.screen) || props.currentRoomId && !_room || (0,units/* isMobile */.tq)(),
      shouldHideLeftPanel: true,
      justFinishOnBoarding: false,
      isSkipUserGuid: false
    };
    this.rightPanelStoreToken = FloatingWidgetStore.getSharedInstance().addListener(this.onRightPanelStoreUpdate);
    this._matrixClient = Object.assign(this.props.matrixClient);

    // stash the MatrixClient in case we log out before we are unmounted
    MediaDeviceHandler/* default */.ZP.loadDevices();
    (0,FontManager/* fixupColorFonts */.T)();
    this._roomView = /*#__PURE__*/react.createRef();
    this.getUserShareCode();
    // this._resizeContainer = React.createRef();
    // this.resizeHandler = React.createRef();
  }

  componentWillMount() {
    this.getUserThemeInfo();
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onNativeKeyDown, false);
    this.dispatcherRef = dispatcher/* default */.ZP.register(this.onAction);
    this.updateServerNoticeEvents();
    this._matrixClient.on("accountData", this.onAccountData);
    this._matrixClient.on("sync", this.onSync);
    // Call `onSync` with the current state as well
    this.onSync(this._matrixClient.getSyncState(), null, this._matrixClient.getSyncStateData());
    this._matrixClient.on("RoomState.events", this.onRoomStateEvents);
    // this._matrixClient.on("Room.timeline", this.saveMessage);

    this.compactLayoutWatcherRef = SettingsStore/* default */.C.watchSetting("useCompactLayout", null, this.onCompactLayoutChanged);
    this.backgroundImageWatcherRef = SettingsStore/* default */.C.watchSetting("RoomList.backgroundImage", null, this.refreshBackgroundImage);
    OwnProfileStore.OwnProfileStore.instance.on(AsyncStore/* UPDATE_EVENT */.aY, this.refreshBackgroundImage);
    this.refreshBackgroundImage();
    LeftPanelStore/* default */.ZP.instance.on(LeftPanelStore/* SELECTED_CHANGED */.NM, this.handleLeftPanelVisible);
    this.handleLeftPanelVisible();
    // this.bindResizer();
    this.loadResizerPreferences();
    this.createKey();
    durationInterval = setInterval(() => {
      this.sendOnlineDuration();
    }, INTERVAL);
    (0,index_esm/* logEvent */.Kz)(firebase_analytics/* analytics */.c, "area_change", LoggedInView_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()));
    this.getofficialBotList();
  }
  componentDidUpdate() {
    // this.bindResizer();
    this.loadResizerPreferences();
  }
  componentWillUnmount() {
    var _this$resizer;
    document.removeEventListener("keydown", this.onNativeKeyDown, false);
    dispatcher/* default */.ZP.unregister(this.dispatcherRef);
    this._matrixClient.off("accountData", this.onAccountData);
    this._matrixClient.off("sync", this.onSync);
    this._matrixClient.off("RoomState.events", this.onRoomStateEvents);
    // this._matrixClient.removeListener("Room.timeline", this.saveMessage);
    OwnProfileStore.OwnProfileStore.instance.off(AsyncStore/* UPDATE_EVENT */.aY, this.refreshBackgroundImage);
    SettingsStore/* default */.C.unwatchSetting(this.compactLayoutWatcherRef);
    SettingsStore/* default */.C.unwatchSetting(this.backgroundImageWatcherRef);
    LeftPanelStore/* default */.ZP.instance.off(LeftPanelStore/* SELECTED_CHANGED */.NM, this.handleLeftPanelVisible);
    (_this$resizer = this.resizer) === null || _this$resizer === void 0 ? void 0 : _this$resizer.detach();
    this.rightPanelStoreToken.remove();
    clearInterval(durationInterval);
  }
  getofficialBotList() {
    this._matrixClient.getofficialBotList().then(res => {
      SdkConfig/* default */.Z.add({
        bot: res
      });
    });
  }
  getUserShareCode() {
    this._matrixClient.getUserShareCode().then(res => {
      if (res.user_share_code) {
        localStorage.setItem("mx_user_share_code", res.user_share_code);
      }
    }).catch(() => {
      console.error("get user share code error");
    });
  }
  sendOnlineDuration() {
    MatrixClientPeg/* MatrixClientPeg */.p.get().pointReport({
      action_type: "online_duration"
    });
  }
  unit8ArrayToHex(unit8Array) {
    return Array.prototype.map.call(unit8Array, x => ("00" + x.toString(16)).slice(-2)).join("");
  }
  async createKey() {
    const privateKey = esm_utils.randomPrivateKey();
    const publicKey = await getPublicKey(privateKey);
    const peerId = this.unit8ArrayToHex(publicKey);
    console.log(peerId, "publicKey");
    console.log(privateKey, "privateKey");
  }
  bindResizer() {
    if (this.state.leftPanelVisible && !this.resizer) {
      // this.resizer = this.createResizer();
      this.resizer.attach();
    }
    if (!this.state.leftPanelVisible && this.resizer) {
      this.resizer.detach();
      delete this.resizer;
    }
  }
  createResizer() {
    let panelSize;
    let panelCollapsed;
    const collapseConfig = {
      // TODO decrease this once Spaces launches as it'll no longer need to include the 56px Community Panel
      toggleSize: this.toggleSize,
      onCollapsed: collapsed => {
        panelCollapsed = collapsed;
        if (collapsed) {
          dispatcher/* default */.ZP.dispatch({
            action: "hide_left_panel"
          });
          window.localStorage.setItem("mx_lhs_size", "0");
        } else {
          dispatcher/* default */.ZP.dispatch({
            action: "show_left_panel"
          });
        }
      },
      onResized: size => {
        panelSize = size;
        this.props.resizeNotifier.notifyLeftHandleResized();
      },
      onResizeStart: () => {
        this.props.resizeNotifier.startResizing();
      },
      onResizeStop: () => {
        if (!panelCollapsed) window.localStorage.setItem("mx_lhs_size", "" + panelSize);
        this.props.resizeNotifier.stopResizing();
      },
      isItemCollapsed: domNode => {
        return domNode.classList.contains("mx_LeftPanel_minimized");
      }
      // handler: this.resizeHandler.current,
    };
    // const resizer = new Resizer(
    //     this._resizeContainer.current,
    //     CollapseDistributor,
    //     collapseConfig
    // );
    // resizer.setClassNames({
    //     handle: "mx_ResizeHandle",
    //     vertical: "mx_ResizeHandle_vertical",
    //     reverse: "mx_ResizeHandle_reverse",
    // });
    // return resizer;
  }

  loadResizerPreferences() {
    // if (!this.resizer) {
    //     return;
    // }
    // let lhsSize = parseInt(window.localStorage.getItem("mx_lhs_size"), 10);
    // if (isNaN(lhsSize)) {
    //     lhsSize = 280;
    // }
    // if (lhsSize > this.toggleSize) {
    //     this.resizer.forHandleWithId("lp-resizer").resize(lhsSize);
    // }
  }
  calculateServerLimitToast(syncError, usageLimitEventContent) {
    const error = syncError && syncError.error && syncError.error.errcode === "M_RESOURCE_LIMIT_EXCEEDED";
    if (error) {
      usageLimitEventContent = syncError.error.data;
    }

    // usageLimitDismissed is true when the user has explicitly hidden the toast
    // and it will be reset to false if a *new* usage alert comes in.
    if (usageLimitEventContent && this.state.usageLimitDismissed) {
      showToast(usageLimitEventContent.limit_type, this.onUsageLimitDismissed, usageLimitEventContent.admin_contact, error);
    } else {
      hideToast();
    }
  }
  // user's skin setting info
  getUserThemeInfo() {
    ThemeSkinStore/* default */.ZP.instance.initThemeSkinId();
  }
  render() {
    var _this$props$initialSc3, _this$props$initialSc4, _this$props$initialSc5, _this$props$initialSc6;
    let pageElement;
    switch (this.props.page_type) {
      case PageTypes/* default */.Z.RoomView:
        pageElement = /*#__PURE__*/react.createElement(RoomView, {
          ref: this._roomView,
          onRegistered: this.props.onRegistered,
          threepidInvite: this.props.threepidInvite,
          oobData: this.props.roomOobData,
          key: this.props.currentRoomId || "roomview",
          resizeNotifier: this.props.resizeNotifier,
          justCreatedOpts: this.props.roomJustCreatedOpts,
          roomId: this.props.currentRoomId
        });
        break;
      case PageTypes/* default */.Z.MyGroups:
        pageElement = /*#__PURE__*/react.createElement(MyGroups, null);
        break;
      case PageTypes/* default */.Z.RoomDirectory:
        // handled by MatrixChat for now
        break;
      case PageTypes/* default */.Z.HomePage:
        pageElement = /*#__PURE__*/react.createElement("div", {
          className: "mx_RoomView_HomePage"
        }, /*#__PURE__*/react.createElement("div", {
          className: "mx_LeftPanelContent_header"
        }, /*#__PURE__*/react.createElement(HomeButton/* default */.Z, {
          title: "Recommendation"
        })), /*#__PURE__*/react.createElement(LoggedInView_Recommendations, {
          key: "home",
          justRegistered: this.state.justFinishOnBoarding,
          authCode: this.props.authCode,
          resizeNotifier: this.props.resizeNotifier,
          withWrapper: true
        }));
        break;
      case PageTypes/* default */.Z.RecommendationPage:
        pageElement = /*#__PURE__*/react.createElement(LoggedInView_Recommendations, {
          key: "contact",
          contactPage: true,
          resizeNotifier: this.props.resizeNotifier
        });
        break;
      case PageTypes/* default */.Z.FavouriteView:
        //     pageElement = <FavoritePage justRegistered={this.props.justRegistered} />;
        break;
      case PageTypes/* default */.Z.UserView:
        pageElement = /*#__PURE__*/react.createElement(UserView, {
          userId: this.props.currentUserId,
          roomId: this.props.currentRoomId,
          resizeNotifier: this.props.resizeNotifier
        });
        break;
      case PageTypes/* default */.Z.GroupView:
        if (SpaceStore/* default */.ZP.spacesEnabled) {
          pageElement = /*#__PURE__*/react.createElement(structures_LegacyCommunityPreview, {
            groupId: this.props.currentGroupId
          });
        } else {
          pageElement = /*#__PURE__*/react.createElement(GroupView, {
            groupId: this.props.currentGroupId,
            isNew: this.props.currentGroupIsNew,
            resizeNotifier: this.props.resizeNotifier
          });
        }
        break;
      case PageTypes/* default */.Z.LeftPanelContent:
        pageElement = /*#__PURE__*/react.createElement(structures_LeftPanelContent, {
          resizeNotifier: this.props.resizeNotifier
        });
        break;
      case PageTypes/* default */.Z.FriendsRequest:
        pageElement = /*#__PURE__*/react.createElement(FriendApply, {
          applyFriendsInfo: this.props.applyFriendsInfo,
          resizeNotifier: this.props.resizeNotifier
        });
        break;
      case PageTypes/* default */.Z.NotificationsView:
        {
          pageElement = /*#__PURE__*/react.createElement(components_NotificationRoom, {
            clientId: "",
            resizeNotifier: this.props.resizeNotifier
          });
          break;
        }
      case PageTypes/* default */.Z.InvitationView:
        {
          pageElement = /*#__PURE__*/react.createElement(invite_InvitationRoom, {
            resizeNotifier: this.props.resizeNotifier
          });
        }
    }
    const wrapperClasses = classnames_default()({
      mx_MatrixChat_wrapper: true,
      mx_MatrixChat_useCompactLayout: this.state.useCompactLayout
    });
    const bodyClasses = classnames_default()({
      mx_MatrixChat: true,
      "mx_MatrixChat--with-avatar": this.state.backgroundImage
    });
    const audioFeedArraysForCalls = this.state.activeCalls.map(call => {
      return /*#__PURE__*/react.createElement(AudioFeedArrayForCall, {
        call: call,
        key: call.callId
      });
    });
    const zIndexStyle = [LeftPanelStore/* DAPP_TAB */.bJ, LeftPanelStore/* EXPLORE_TAB */.bA].includes(LeftPanelStore/* default */.ZP.instance.getState().selected) && !this.state.shouldHideLeftPanel ? {
      zIndex: 6
    } : {};
    const step = localStorage.getItem("mx_guide_state");
    const displayName = OwnProfileStore.OwnProfileStore.instance.displayName;
    return /*#__PURE__*/react.createElement(MatrixClientContext/* default */.Z.Provider, {
      value: this._matrixClient
    }, /*#__PURE__*/react.createElement(layout, {
      key: "AppLayout"
    }, /*#__PURE__*/react.createElement("div", {
      onPaste: this.onPaste,
      onKeyDown: this.onReactKeyDown,
      className: wrapperClasses,
      "aria-hidden": this.props.hideToSRUsers
    }, step !== "1" || !displayName ? this.state.isSkipUserGuid ? /*#__PURE__*/react.createElement(structures_BoardingContainer, {
      onClose: this.onFinishBoarding,
      isNewUser: !!((_this$props$initialSc3 = this.props.initialScreenAfterLogin) !== null && _this$props$initialSc3 !== void 0 && (_this$props$initialSc4 = _this$props$initialSc3.screen) !== null && _this$props$initialSc4 !== void 0 && _this$props$initialSc4.startsWith("room") || (_this$props$initialSc5 = this.props.initialScreenAfterLogin) !== null && _this$props$initialSc5 !== void 0 && (_this$props$initialSc6 = _this$props$initialSc5.screen) !== null && _this$props$initialSc6 !== void 0 && _this$props$initialSc6.startsWith("user"))
    }) : /*#__PURE__*/react.createElement(appWizard, {
      onSkipUserGuid: this.onSkipUserGuid
    }) : null, /*#__PURE__*/react.createElement(ToastContainer, null), /*#__PURE__*/react.createElement(dialogs_ActivityNotificationDialog, null), /*#__PURE__*/react.createElement("div", {
      className: bodyClasses
    }, /*#__PURE__*/react.createElement(LeftPanelContainer, {
      key: "LeftPanelContainer"
    }), /*#__PURE__*/react.createElement("div", {
      className: classnames_default()(["mx_RoomView_wrapper", {
        "mx_RoomView_wrapper--mobile": this.state.roomViewVisble
      }])
    }, pageElement))), /*#__PURE__*/react.createElement(CallContainer, null), /*#__PURE__*/react.createElement(live_LiveView, {
      roomId: this.props.currentRoomId,
      client: this.props.matrixClient
    }), /*#__PURE__*/react.createElement(NonUrgentToastContainer, null), /*#__PURE__*/react.createElement(host_signup_HostSignupContainer, null), audioFeedArraysForCalls, this.state.showFloatingWidget && /*#__PURE__*/react.createElement(floating_modal_FloatingWidget, this.state.phaseParams.params), (0,units/* isMobile */.tq)() && /*#__PURE__*/react.createElement(views_OpenGuid, null)));
  }
}
(0,defineProperty/* default */.Z)(LoggedInView, "displayName", "LoggedInView");
/* harmony default export */ const structures_LoggedInView = (LoggedInView);

/***/ }),

/***/ 974184:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ structures_Recommendations)
});

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(225259);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(166644);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/@hiseas/react/dist/index.js
var dist = __webpack_require__(989638);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(294184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/ContactStore.ts + 1 modules
var ContactStore = __webpack_require__(476979);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/RecommendationStore.ts
var RecommendationStore = __webpack_require__(459535);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/ErrorBoundary.tsx
var ErrorBoundary = __webpack_require__(618675);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/MainSplit.tsx
var MainSplit = __webpack_require__(409957);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/RightPanel.tsx + 56 modules
var RightPanel = __webpack_require__(285243);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/LinkWallet.tsx + 2 modules
var LinkWallet = __webpack_require__(103041);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/MatrixClientPeg.ts + 3 modules
var MatrixClientPeg = __webpack_require__(933393);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/ExploreStore.ts
var ExploreStore = __webpack_require__(512892);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/panelcontent/Group.tsx
var Group = __webpack_require__(836342);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/panelcontent/Explore.tsx
var Explore = __webpack_require__(470912);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/LeftPanelStore.ts
var LeftPanelStore = __webpack_require__(290884);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/AutoHideScrollbar.tsx
var AutoHideScrollbar = __webpack_require__(651070);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/dispatcher.ts
var dispatcher = __webpack_require__(245539);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/right_panel/UserInfo.tsx + 4 modules
var UserInfo = __webpack_require__(931363);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/ContextMenu.tsx + 6 modules
var ContextMenu = __webpack_require__(760172);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/ActivityStore.ts
var ActivityStore = __webpack_require__(182445);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/spaces/ActivityCard.tsx
var ActivityCard = __webpack_require__(161732);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/EmptyContent.tsx



const EmptyContent = ({
  content,
  className,
  children,
  style
}) => {
  return /*#__PURE__*/react.createElement("div", {
    className: classnames_default()("mx_Empty_wrap", className),
    style: style
  }, /*#__PURE__*/react.createElement("img", {
    src: __webpack_require__(594864),
    width: "132",
    height: "132"
  }), /*#__PURE__*/react.createElement("p", null, content || (0,languageHandler._t)("No result found")), children);
};
/* harmony default export */ const elements_EmptyContent = (EmptyContent);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/actions.ts
var actions = __webpack_require__(473627);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/useDispatcher.ts
var useDispatcher = __webpack_require__(694284);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/plugins/telegram/TelegramUtil.ts
var TelegramUtil = __webpack_require__(692091);
// EXTERNAL MODULE: ./node_modules/antd/lib/index.js
var lib = __webpack_require__(769215);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/BaseDialog.js
var BaseDialog = __webpack_require__(308043);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AccessibleButton.tsx
var AccessibleButton = __webpack_require__(805035);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/SdkConfig.ts
var SdkConfig = __webpack_require__(374312);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Field.tsx
var Field = __webpack_require__(455537);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/SocialInvitationDialog.tsx






const SocialInvitationDialog = props => {
  const {
    socialAppName,
    roomId,
    messagePrefix,
    roomType,
    messageSendMethod,
    onFinished,
    message
  } = props;
  const [sending, setSending] = (0,react.useState)(false);
  const [willSend, setWillSend] = (0,react.useState)(message !== null && message !== void 0 ? message : `${messagePrefix}\x0a${SdkConfig/* default */.Z.get("permalinkPrefix")}/share?${roomType}=${roomId}&usc=${localStorage.getItem("mx_user_share_code")}`);
  const onClose = () => {
    onFinished === null || onFinished === void 0 ? void 0 : onFinished();
  };
  const sendMessage = (0,react.useCallback)(async () => {
    const ret = await messageSendMethod(willSend);
    setSending(ret);
    onFinished === null || onFinished === void 0 ? void 0 : onFinished(true);
  }, [willSend]);
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_SocialInvitationDialog_bg"
  }, /*#__PURE__*/react.createElement(BaseDialog/* default */.Z, {
    className: "mx_SocialInvitationDialog",
    onFinished: onClose,
    title: (0,languageHandler._t)("Invite Friend")
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_SocialInvitationDialog_body"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_SocialInvitationDialog_desc"
  }, (0,languageHandler._t)(`Send an invite message to ${socialAppName} DM`)), /*#__PURE__*/react.createElement(Field/* default */.Z, {
    element: "textarea",
    value: willSend,
    onChange: e => setWillSend(e.target.value.trim()),
    rows: 6
  }), /*#__PURE__*/react.createElement("div", {
    className: "mx_SocialInvitationDialog_buttons"
  }, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
    kind: "secondary",
    onClick: onClose
  }, (0,languageHandler._t)("Cancel")), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
    kind: "primary",
    onClick: sendMessage
  }, (0,languageHandler._t)(sending ? "Sending..." : "Send"))))));
};
/* harmony default export */ const dialogs_SocialInvitationDialog = (SocialInvitationDialog);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/token.ts
var token = __webpack_require__(732094);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/plugins/telegram/UserItem.tsx
var UserItem = __webpack_require__(213019);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/browser-index.js
var browser_index = __webpack_require__(407637);
// EXTERNAL MODULE: ./node_modules/@sdm/react/dist/index.js
var react_dist = __webpack_require__(654384);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/plugins/telegram/TelegramLoginButton.tsx
var TelegramLoginButton = __webpack_require__(633706);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/theme/useGetThemeConfig.ts
var useGetThemeConfig = __webpack_require__(155298);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/common/emptyWidget/EmptyWidget.tsx
var EmptyWidget = __webpack_require__(167455);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/common/emptyWidget/def.ts
var def = __webpack_require__(952469);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/units.ts
var units = __webpack_require__(612559);
// EXTERNAL MODULE: ./node_modules/sendingme-ui/dist/index.js
var sendingme_ui_dist = __webpack_require__(602271);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/right_panel/Explore.tsx
var right_panel_Explore = __webpack_require__(746487);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/room/avatar.ts
var avatar = __webpack_require__(720808);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/RightPanelStorePhases.ts
var RightPanelStorePhases = __webpack_require__(274057);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/Recommendations.tsx


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }










































const ExploreRecommend = () => {
  const [squads, setSquads] = (0,react.useState)([]);
  const [loading, setLoading] = (0,react.useState)(true);
  const [usingThemeSkin] = (0,useGetThemeConfig/* useIsUsingThemeSkin */.Gj)();
  const [imageUrl] = (0,useGetThemeConfig/* useGetThemeImageUrl */.EG)({
    type: useGetThemeConfig/* TypeEnum */.oY.BG_BANNER
  });
  (0,react.useEffect)(() => {
    const squads = ExploreStore/* default */.Z.instance.squads;
    setSquads(squads);
    if (squads.length > 0) {
      setLoading(false);
    }
    ExploreStore/* default */.Z.instance.fetchSquads({
      clear: true,
      query: "",
      size: 6
    }).then(res => {
      if (res.data) {
        setSquads(res.data);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, []);
  // const handlerSelected = (data: ISquad) => {
  //     location.href = `${location.origin}/#/room/${data.alias || data.id}`;
  // };
  const handlerSelected = data => {
    dispatcher/* default */.ZP.dispatch({
      action: LeftPanelStore/* LEFT_PANEL_CONTENT_CHANGED */.Li,
      params: {
        clientId: data.id
      }
    });
  };

  // const loading = ExploreStore.instance.getLoading();
  if (loading) {
    return /*#__PURE__*/react.createElement(sendingme_ui_dist.SdSkeleton.Block, {
      active: true,
      aspectRatio: "358 / 332",
      cols: 3,
      colGap: 20,
      rowGap: 20,
      childrenStyle: {
        borderRadius: "20px"
      }
    });
  }
  if (squads.length === 0 && !loading) {
    return /*#__PURE__*/react.createElement(elements_EmptyContent, null);
  }
  const renderBanner = () => {
    let isShowBanner = Boolean(localStorage && localStorage.getItem("mx_home_page_banner")) || true;
    return isShowBanner ? /*#__PURE__*/react.createElement("div", {
      className: "mx_Recommendation_banner_container"
    }, usingThemeSkin && /*#__PURE__*/react.createElement("div", {
      className: "mx_Recommendation_banner_title"
    }, /*#__PURE__*/react.createElement("div", {
      className: "title"
    }, (0,languageHandler._t)("Welcome to SendingMe"))), /*#__PURE__*/react.createElement("img", {
      className: "mx_Recommendation_banner",
      src: usingThemeSkin ? imageUrl : __webpack_require__(837069),
      alt: ""
    })) : null;
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_Recommendation_explore_wrap"
  }, /*#__PURE__*/react.createElement(Group/* default */.Z, null, renderBanner(), squads === null || squads === void 0 ? void 0 : squads.map(data => /*#__PURE__*/react.createElement(Explore/* default */.Z, (0,esm_extends/* default */.Z)({}, data, {
    key: data.id,
    onClick: () => handlerSelected(data)
  })))), (squads === null || squads === void 0 ? void 0 : squads.length) > 0 ? /*#__PURE__*/react.createElement("div", {
    className: "mx_Recommendation_explore_link",
    onClick: () => LeftPanelStore/* default */.ZP.instance.updateSelected(LeftPanelStore/* EXPLORE_TAB */.bA)
  }, (0,languageHandler._t)("EXPLORE")) : null);
};
const EventRecommend = ({
  setDetail
}) => {
  const [events, setEvents] = (0,react.useState)({
    more: 0,
    data: []
  });
  (0,react.useEffect)(() => {
    const list = ActivityStore/* default */.Z.instance.getList();
    setEvents({
      more: 0,
      data: list
    });
    ActivityStore/* default */.Z.instance.fetchList(null, {
      recommend: true,
      clear: true,
      filter: ""
    }).then(res => {
      if (res && res.data) {
        setEvents(res);
      }
    });
  }, []);
  const clickCard = data => {
    setDetail({
      data,
      showSider: true,
      joined: 2,
      flag: Date.now()
    });
  };
  const loading = ExploreStore/* default */.Z.instance.getLoading();
  if (events.data.length === 0 && loading) {
    // return <Spinner />;
    return /*#__PURE__*/react.createElement(sendingme_ui_dist.SdSkeleton.Block, {
      active: true,
      aspectRatio: "358 / 332",
      cols: 3,
      colGap: 20,
      rowGap: 20,
      childrenStyle: {
        borderRadius: "20px"
      }
    });
  }
  if (events.more !== 0 && events.data.length === 0 && !loading) {
    return /*#__PURE__*/react.createElement(sendingme_ui_dist.SdEmpty, {
      image: /*#__PURE__*/react.createElement(EmptyWidget/* default */.Z, {
        coverType: def/* EmptyCoverType */.t.TEXT
      }),
      description: "No records found",
      footer: null
    });
  }
  const array = ActivityStore/* default */.Z.instance.getInterests();
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_Recommendation_explore_wrap"
  }, /*#__PURE__*/react.createElement(Group/* default */.Z, null, events.data.map(data => {
    var _data$roomInfo, _data$roomInfo2;
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_Recommendation_group_event",
      onClick: () => clickCard(data)
    }, /*#__PURE__*/react.createElement(ActivityCard/* default */.Z, (0,esm_extends/* default */.Z)({
      key: data.id
    }, data, {
      disClickable: true,
      interested: array.includes(data.id)
    })), /*#__PURE__*/react.createElement("div", {
      className: "mx_Recommendation_group_event_squad"
    }, /*#__PURE__*/react.createElement("img", {
      src: data === null || data === void 0 ? void 0 : (_data$roomInfo = data.roomInfo) === null || _data$roomInfo === void 0 ? void 0 : _data$roomInfo.avatar
    }), data === null || data === void 0 ? void 0 : (_data$roomInfo2 = data.roomInfo) === null || _data$roomInfo2 === void 0 ? void 0 : _data$roomInfo2.name));
  })));
};
const UserRecommend = ({
  setDetail
}) => {
  const [tab, setTab] = (0,react.useState)(() => {
    return RecommendationStore/* default */.Z.instance.currentTab;
  });
  const [loading, setLoading] = (0,react.useState)(true);
  const [invite, setInvite] = (0,react.useState)({});
  // const [twitterInfo, setTwitterInfo] = useState<any>({});
  const [list, setList] = (0,react.useState)({
    more: 0,
    data: []
  });
  // const [refreshFlag, setRefreshFlag] = useState<number>(0);
  const [isTeleAuthorized, setIsTeleAuthorized] = (0,react.useState)(false);
  const userId = MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId();
  const [filterText, setFilterText] = (0,react.useState)("");
  (0,react.useEffect)(() => {
    if (tab !== "telegram") {
      setLoading(true);
      setList({
        more: 0,
        data: []
      });
      RecommendationStore/* default */.Z.instance.fetchList({
        clear: true,
        tab
      }).then(res => {
        if (res && res.data) {
          setList(res);
        }
      }).finally(() => setLoading(false));
    }
  }, [tab]);
  (0,react.useEffect)(() => {
    if (tab === "telegram") {
      setLoading(true);
      setList({
        more: 0,
        data: []
      });
      (0,RecommendationStore/* getTelegramUsers */.E)().then(res => {
        if (res && res.data) {
          setList(res);
        }
      }).catch(() => {
        setIsTeleAuthorized(false);
      }).finally(() => setLoading(false));
    }
  }, [tab, isTeleAuthorized]);
  (0,react.useEffect)(() => {
    TelegramUtil/* default */.ZP.instance.isUserAuthorized().then(r => {
      setIsTeleAuthorized(r);
      dispatcher/* defaultDispatcher */.ec.dispatch({
        action: "three_pid_update",
        params: {
          linked: true,
          threePid: "telegram"
        }
      });
    });
    RecommendationStore/* default */.Z.instance.on("change_current_tab", setTab);
    return () => {
      RecommendationStore/* default */.Z.instance.off("change_current_tab", setTab);
    };
  }, []);

  // useEffect(() => {
  //     const refresh = () => {
  //         setRefreshFlag(refreshFlag + 1);
  //     };
  //     ContactStore.instance.on(CONTACT_UPDATE_EVENT, refresh);
  //     return () => {
  //         ContactStore.instance.off(CONTACT_UPDATE_EVENT, refresh);
  //     };
  // }, [refreshFlag]);

  const optAction = (e, item, joined) => {
    e.stopPropagation();
    e.preventDefault();
    if (!item) {
      return;
    }
    // if (joined) {
    //     ContactStore.instance[
    //         addedContact ? "removeFavourite" : "addFavourite"
    //     ](item.id, true);
    // }
    if (!joined && tab === "twitter") {
      setInvite({
        id: item.twitterId,
        type: "Twitter"
      });
    }
  };
  const startSendMsg = (0,react.useCallback)(async message => {
    const userId = MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId();
    try {
      // if (invite.type === "Twitter") {
      //     await RecommendationStore.sendTwitterMessage(
      //         invite.id,
      //         shareUserPermalink(userId)
      //     );
      // } else
      if (invite.type === "Telegram") {
        await TelegramUtil/* default */.ZP.instance.sendMessage(invite.id, message);
      }
      setInvite({});
      return true;
    } catch {
      return false;
    }
  }, [invite]);
  const showDetail = ({
    data = {},
    type = "",
    showSider = false,
    joined = 0,
    newUrl = ""
  } = {}) => {
    if (type === "twitter") {
      // && !joined) {
      window.open(newUrl);
      return;
    }
    setDetail({
      data,
      showSider,
      joined,
      flag: Date.now()
    });
  };
  const renderItem = (item, isFriend, joined = 1) => {
    if (tab !== "telegram") {
      let desc = null;
      if (!!joined) {
        desc = /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
          className: "mx_Recommendation_room_item_name"
        }, item.user.ens ? /*#__PURE__*/react.createElement(react_dist.Text, null, item.name) : item.name), /*#__PURE__*/react.createElement("div", {
          className: "mx_Recommendation_room_item_desc"
        }, !!joined ? (0,token/* formatWallet */.Tl)((0,token/* formatUserIdToAddress */.Yj)(item.id)) : (0,languageHandler._t)("invite friends to join")), /*#__PURE__*/react.createElement("div", {
          className: classnames_default()("mx_Recommendation_room_item_contact", {
            contacted: isFriend
          })
          // onClick={(e) => optAction(e, item, joined)}
          ,
          onClick: () => showDetail({
            data: item,
            type: item.type,
            showSider: true,
            joined,
            newUrl: item.twitterHome
          })
        }));
      } else {
        desc = /*#__PURE__*/react.createElement("div", {
          className: "mx_Recommendation_room_item_id"
        }, item.realId);
      }
      return /*#__PURE__*/react.createElement("div", {
        key: item.id,
        className: classnames_default()("mx_Recommendation_room_item", {
          circleImg: !joined && tab === "twitter"
        }),
        onClick: () => showDetail({
          data: item,
          type: item.type,
          showSider: true,
          joined,
          newUrl: item.twitterHome
        })
      }, /*#__PURE__*/react.createElement("div", {
        className: "mx_Recommendation_room_item_tag",
        style: {
          color: item.tag.color
        }
      }, item.tag.label), /*#__PURE__*/react.createElement(sendingme_ui_dist.SdAvatar, {
        size: "middle",
        src: (0,avatar/* transferAvatar2minimization */.g)(item.avatarUrl),
        id: item === null || item === void 0 ? void 0 : item.id,
        name: item.name
      }), desc);
    }
  };
  const renderEmpty = (0,react.useCallback)((list1, list2) => {
    if (loading || list1.length || list2.length) {
      return null;
    }
    if (tab === "transaction") {
      return /*#__PURE__*/react.createElement("div", {
        className: "mx_Recommendation_wallet_wrapper"
      }, /*#__PURE__*/react.createElement(LinkWallet/* default */.ZP, {
        step: LinkWallet/* WalletStep */.Ww.LINK_WALLET,
        desc: (0,languageHandler._t)("No wallet contact found, Try linking other wallets"),
        onClose: () => {}
      }));
    }
    if (tab === "telegram" && !isTeleAuthorized) {
      return /*#__PURE__*/react.createElement(TelegramLoginButton/* default */.Z, {
        btnStyle: "bind",
        onLoginSuccess: async () => {
          setIsTeleAuthorized(true);
          dispatcher/* defaultDispatcher */.ec.dispatch({
            action: "three_pid_update",
            params: {
              linked: true,
              threePid: "telegram"
            }
          });
        }
      });
    }
    return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(EmptyWidget/* default */.Z, {
      coverType: def/* EmptyCoverType */.t.TEXT,
      content: /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("div", null, (0,languageHandler._t)("No records found")))
    }));
  }, [tab, isTeleAuthorized]);
  const onInvite = user => {
    setInvite({
      type: "Telegram",
      id: user.id.toString()
    });
  };
  const renderContent = (0,react.useCallback)(tab => {
    if (loading) {
      // return <Spinner />;
      return /*#__PURE__*/react.createElement(sendingme_ui_dist.SdSkeleton.Block, {
        active: true,
        aspectRatio: "361 / 114",
        cols: 3,
        colGap: 20,
        rowGap: 20,
        childrenStyle: {
          borderRadius: "12px"
        }
      });
    }
    const friends = ContactStore["default"].instance.friends;
    const list1 = list.data[0] || [];
    const list2 = list.data[1] || [];
    let content = null;
    if (tab === "telegram") {
      const _list1 = (list.data[0] || []).filter(item => {
        var _item$iuser, _item$iuser$username, _item$iuser2, _item$iuser2$display_;
        return ((_item$iuser = item.iuser) === null || _item$iuser === void 0 ? void 0 : (_item$iuser$username = _item$iuser.username) === null || _item$iuser$username === void 0 ? void 0 : _item$iuser$username.includes(filterText)) || ((_item$iuser2 = item.iuser) === null || _item$iuser2 === void 0 ? void 0 : (_item$iuser2$display_ = _item$iuser2.display_name) === null || _item$iuser2$display_ === void 0 ? void 0 : _item$iuser2$display_.includes(filterText));
      }
      // item.iuser?.wallet?.includes(filterText)
      );

      const _list2 = (list.data[1] || []).filter(item => {
        var _item$username, _item$firstName;
        return ((_item$username = item.username) === null || _item$username === void 0 ? void 0 : _item$username.includes(filterText)) || ((_item$firstName = item.firstName) === null || _item$firstName === void 0 ? void 0 : _item$firstName.includes(filterText));
      }
      // item.lastName?.includes(filterText)
      );

      content = isTeleAuthorized ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
        className: "tele-search-input"
      }, /*#__PURE__*/react.createElement("div", {
        className: "tele-search-icon"
      }), /*#__PURE__*/react.createElement("input", {
        type: "text",
        placeholder: "Search",
        autoFocus: true,
        autoComplete: "off",
        value: filterText,
        onChange: ev => setFilterText(ev.target.value.trim())
      })), /*#__PURE__*/react.createElement("div", {
        className: "tele-search-result"
      }, _list1.length > 0 && /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
        className: "mx_Recommendation_room_label"
      }, (0,languageHandler._t)("They are active on SendingMe. Start to chat now!")), /*#__PURE__*/react.createElement("div", {
        className: "mx_Recommendation_room_item_wrap",
        style: {
          flexDirection: "column",
          flexWrap: "nowrap"
        }
      }, _list1.map(item => {
        return /*#__PURE__*/react.createElement(UserItem/* default */.Z, {
          user: item.user,
          suser: item.iuser,
          matchText: filterText
        });
      }))), _list2.length > 0 && /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
        className: "mx_Recommendation_room_label"
      }, (0,languageHandler._t)("They are looking forward to talking safely with you!")), /*#__PURE__*/react.createElement("div", {
        className: "mx_Recommendation_room_item_wrap",
        style: {
          flexDirection: "column"
        }
      }, _list2.map(item => /*#__PURE__*/react.createElement(UserItem/* default */.Z, {
        user: item,
        onInvite: onInvite,
        matchText: filterText
      })))), _list1.length === 0 && _list2.length === 0 && /*#__PURE__*/react.createElement(lib.Empty, {
        style: {
          maxWidth: "400px",
          marginTop: "10px"
        },
        image: __webpack_require__(160050),
        description: (0,languageHandler._t)("No result found")
      }))) : null;
    } else {
      content = /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
        className: "mx_Recommendation_room_item_wrap"
      }, list1.map(item => {
        return renderItem(item, friends.find(c => item.id === c.userId));
      })), list2.length > 0 && /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
        className: "mx_Recommendation_room_label"
      }, (0,languageHandler._t)("The contacts has not joined")), /*#__PURE__*/react.createElement("div", {
        className: "mx_Recommendation_room_item_wrap"
      }, list2.map(item => {
        return renderItem(item, friends.find(c => item.id === c.userId), 0);
      }))));
    }
    return /*#__PURE__*/react.createElement(react.Fragment, null, content, renderEmpty(list1, list2), invite.type && /*#__PURE__*/react.createElement(dialogs_SocialInvitationDialog, {
      socialAppName: invite.type,
      messagePrefix: "I've discovered an interesting social platform named SendingMe. Let's engage in more secure and private conversations there!",
      roomId: userId,
      roomType: "user",
      messageSendMethod: startSendMsg,
      onFinished: () => setInvite({})
    }));
  }, [loading, invite, filterText, isTeleAuthorized]);
  return /*#__PURE__*/react.createElement(dist.Tabs, {
    classNames: "mx_Recommendation_tabs",
    tabs: [{
      title: (0,languageHandler._t)("All"),
      value: "all",
      action: () => setTab("all"),
      children: renderContent()
    }, {
      title: /*#__PURE__*/react.createElement(TelegramTitle, {
        linked: isTeleAuthorized
      }),
      value: "telegram",
      action: () => setTab("telegram"),
      children: renderContent("telegram")
    }, {
      title: (0,languageHandler._t)("Similar collections"),
      value: "collection",
      action: () => setTab("collection"),
      children: renderContent()
    }, {
      title: (0,languageHandler._t)("Active user"),
      value: "active",
      action: () => setTab("active"),
      children: renderContent()
    }],
    value: tab || "all",
    barWidth: 48
  });
};
const HomeMenu = () => {
  const neverGuide = localStorage.getItem("mx_recommend_guide") !== "1";
  const [showMenu, setShowMenu] = (0,react.useState)(neverGuide ? 0 : -1); // -1 no menu 0 init  1 wallet 2 twitter
  const [menuData, setMenuData] = (0,react.useState)([]);
  (0,react.useEffect)(() => {
    RecommendationStore/* default */.Z.instance.fetchMenus(showMenu !== -1).then(res => {
      const [tele, recommend] = res;
      if (recommend !== null && recommend !== void 0 && recommend.length && neverGuide) {
        setMenuData(res);
        setShowMenu(1);
      } else if (!(tele !== null && tele !== void 0 && tele.telegram_id)) {
        setShowMenu(2);
      }
    });
  }, []);
  const hideContextMenu = () => {
    setShowMenu(-1);
    localStorage.setItem("mx_recommend_guide", "1");
  };
  const toSayHi = () => {
    const context = MatrixClientPeg/* MatrixClientPeg */.p.get();
    menuData.forEach((item, index) => {
      (0,UserInfo/* openDMForUser */.Oz)({
        userId: item.id,
        isJump: index === menuData.length - 1
      }).then(res => {
        context.sendMessage(res, {
          body: "Hi!",
          msgtype: "m.text"
        });
      });
    });
    LeftPanelStore/* default */.ZP.instance.updateSelected(null, true);
  };
  const toRecommendation = (e, tab = "") => {
    localStorage.setItem("mx_recommend_guide", "1");
    LeftPanelStore/* default */.ZP.instance.updateSelected(LeftPanelStore/* CONTACT_TAB */.YJ, true);
    dispatcher/* default */.ZP.dispatch({
      action: "view_recommendation",
      subAction: tab
    }, true);
  };
  if (!neverGuide) {
    return null;
  }
  let contextMenu = null;
  if (showMenu === 2) {
    contextMenu = /*#__PURE__*/react.createElement(ContextMenu/* ContextMenu */.xV, {
      className: "mx_HomePage_ContextualMenu mx_HomePage_ContextualMenu_twitter",
      chevronFace: ContextMenu/* ChevronFace */.N7.Left,
      left: 72,
      top: 16
      // hasBackground={false}
      ,
      onFinished: hideContextMenu
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_HomePage_Menu_wrap"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_HomePage_Menu_close",
      onClick: hideContextMenu
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_HomePage_Menu_title"
    }, (0,languageHandler._t)("Find Your Friends")), /*#__PURE__*/react.createElement("div", {
      className: "mx_HomePage_Menu_desc"
    }, (0,languageHandler._t)("You can link the social app accounts and maybe discover your friends' traces on Sending.me")), /*#__PURE__*/react.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_HomePage_Menu_item_social",
      onClick: e => toRecommendation(e, "telegram")
    }, /*#__PURE__*/react.createElement("div", null), /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Telegram"))), /*#__PURE__*/react.createElement("div", {
      className: "mx_HomePage_Menu_item_social",
      style: {
        display: "none"
      }
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_discord"
    }), /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Discord"))))));
  } else if (menuData.length) {
    contextMenu = /*#__PURE__*/react.createElement(ContextMenu/* ContextMenu */.xV, {
      className: "mx_HomePage_ContextualMenu",
      chevronFace: ContextMenu/* ChevronFace */.N7.Left,
      left: 72,
      top: 16
      // hasBackground={false}
      ,
      onFinished: hideContextMenu
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_HomePage_Menu_wrap"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_HomePage_Menu_close",
      onClick: hideContextMenu
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_HomePage_Menu_title"
    }, (0,languageHandler._t)("New Contacts")), /*#__PURE__*/react.createElement("div", {
      className: "mx_HomePage_Menu_desc"
    }, (0,languageHandler._t)("You have known each other for a long time but have never said Hi")), menuData.map((item, index) => {
      return index < 4 ? /*#__PURE__*/react.createElement("div", {
        className: "mx_HomePage_Menu_user",
        key: item.id
      }, /*#__PURE__*/react.createElement("img", {
        src: item.avatarUrl
      }), /*#__PURE__*/react.createElement("p", null, item.name)) : null;
    }), /*#__PURE__*/react.createElement("br", null), menuData.map((item, index) => {
      return index < 4 ? /*#__PURE__*/react.createElement("div", {
        key: index,
        className: "mx_HomePage_Menu_user mx_HomePage_Menu_user_disabled"
      }) : null;
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_HomePage_Menu_btn",
      onClick: toSayHi
    }, (0,languageHandler._t)("Say Hi")), /*#__PURE__*/react.createElement("div", {
      className: "mx_HomePage_Menu_tips",
      onClick: e => toRecommendation(e, "telegram")
    }, (0,languageHandler._t)("Check it out"))));
  }
  return contextMenu;
};
const Recommendations = ({
  resizeNotifier,
  justRegistered = true,
  authCode = "",
  contactPage = false,
  withWrapper = false
}) => {
  const [label, setLabel] = (0,react.useState)(contactPage ? "user" : "squad");
  const [detail, setDetail] = (0,react.useState)({
    data: {},
    showSider: false,
    joined: 0,
    flag: 0
  });
  const [showSuccess, setShowSuccess] = (0,react.useState)(false);
  const [rightPanel, setRightPanel] = (0,react.useState)(null);
  const onClose = () => {
    setDetailData({});
    setRightPanel(null);
  };
  (0,react.useEffect)(() => {
    const onAction = payload => {
      if (payload.action === "change_recommendtion_right_panel") {
        setRightPanel( /*#__PURE__*/react.createElement(RightPanel/* default */.Z, {
          key: detail.flag,
          room: null
          // user={detail.data?.user}
          ,
          resizeNotifier: resizeNotifier
          // recommendation={detail}
          ,
          onClose: onClose
        }));
      } else if (payload.action === "recommendtion_userprofile_right_panel") {
        setRightPanel( /*#__PURE__*/react.createElement(RightPanel/* default */.Z, {
          room: null,
          user: new browser_index/* User */.n5(payload.suser.user_id),
          recommendation: {
            data: _objectSpread({
              type: "telegram"
            }, payload.suser)
          },
          resizeNotifier: resizeNotifier,
          onClose: onClose
        }));
      } else if (payload.action === LeftPanelStore/* LEFT_PANEL_CONTENT_CHANGED */.Li) {
        setRightPanel( /*#__PURE__*/react.createElement(right_panel_Explore/* default */.Z, {
          clientId: payload === null || payload === void 0 ? void 0 : payload.params.clientId,
          onClose: onClose
        }));
      }
    };
    const id = dispatcher/* default */.ZP.register(onAction);
    RecommendationStore/* default */.Z.instance.on("change_current_label", setLabel);
    return () => {
      RecommendationStore/* default */.Z.instance.off("change_current_label", setLabel);
      dispatcher/* default */.ZP.unregister(id);
    };
  }, []);

  // useEffect(() => {
  //     setRightPanel(
  //         detail.showSider ? (
  //             <RightPanel
  //                 key={detail.flag}
  //                 room={null}
  //                 user={detail.data?.user}
  //                 resizeNotifier={resizeNotifier}
  //                 recommendation={detail}
  //                 onClose={onClose}
  //             />
  //         ) : null,
  //     );
  // }, [detail]);

  (0,react.useEffect)(() => {
    const onAction = payload => {
      if (payload.action === actions/* Action */.a.SetRightPanelPhase) {
        if ([
        // RightPanelPhases.PointsTask,
        RightPanelStorePhases/* RightPanelPhases */.q4.UserProfile, RightPanelStorePhases/* RightPanelPhases */.q4.IframeWidget].includes(payload.phase)) {
          setRightPanel( /*#__PURE__*/react.createElement(RightPanel/* default */.Z, {
            resizeNotifier: resizeNotifier,
            onClose: () => setRightPanel(null)
          }));
        }
      }
    };
    const id = dispatcher/* default */.ZP.register(onAction);
    return () => {
      dispatcher/* default */.ZP.unregister(id);
    };
  }, []);
  const setDetailData = data => {
    // setDetail(data);
    if (data.showSider) {
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.SetRightPanelPhase,
        phase: RightPanelStorePhases/* RightPanelPhases */.q4.UserProfile,
        refireParams: {
          member: data.data.user
        }
      });
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.ShowRightPanel
      });
    }
  };
  const WrappEle = label === "squad" ? MainSplit/* default */.Z : react.Fragment;
  const changeLabel = item => {
    if (item.key === label) {
      return;
    }
    RecommendationStore/* default */.Z.instance.currentTab = "all";
    setDetailData({});
    setLabel(item.key);
  };
  const renderContent = () => {
    if (label === "user") {
      return /*#__PURE__*/react.createElement(UserRecommend, {
        setDetail: setDetailData
      });
    }
    return /*#__PURE__*/react.createElement(AutoHideScrollbar/* default */.Z, {
      className: "mx_Recommendation_inner_scroll"
    }, label === "event" && /*#__PURE__*/react.createElement(EventRecommend, {
      setDetail: setDetailData
    }), label === "squad" && /*#__PURE__*/react.createElement(ExploreRecommend, null));
  };
  const labels = [{
    text: (0,languageHandler._t)("Squad"),
    key: "squad"
  }, {
    text: (0,languageHandler._t)("User"),
    key: "user"
  }, {
    text: (0,languageHandler._t)("Event"),
    key: "event"
  }];
  return /*#__PURE__*/react.createElement("main", {
    className: classnames_default()("mx_Recommendation", {
      showSider: detail.showSider
    })
  }, /*#__PURE__*/react.createElement(ErrorBoundary/* default */.Z, null, /*#__PURE__*/react.createElement(WrappEle, {
    panel: withWrapper ? rightPanel : null,
    resizeNotifier: withWrapper ? resizeNotifier : null
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_Recommendation_content"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_Recommendation_labels"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_Recommendation_labels_inner"
  }, labels.map(item => {
    return /*#__PURE__*/react.createElement("div", {
      className: classnames_default()("mx_Recommendation_label", {
        active: label === item.key
      }),
      onClick: () => changeLabel(item)
    }, item.text);
  }))), showSuccess && /*#__PURE__*/react.createElement("div", {
    className: "mx_HomePage_notify"
  }, (0,languageHandler._t)("Twitter account has been linked")), renderContent(), justRegistered && !(0,units/* isMobile */.tq)() && /*#__PURE__*/react.createElement(HomeMenu, null)))));
};
/* harmony default export */ const structures_Recommendations = (Recommendations);

// const TwitterTitle: React.FC<TwitterTitleProps> = (props) => {
//     const [linked, setLinked] = useState(false);
//     useDispatcher(defaultDispatcher, (payload: ActionPayload) => {
//         if (
//             payload.action === "three_pid_update" &&
//             payload?.params?.threePid === "twitter"
//         ) {
//             setLinked(payload?.params?.linked);
//         }
//     });
//     return (
//         <div className="mx_ThreePid_linked">
//             Twitter
//             {!linked && (
//                 <span className="mx_ThreePid_linked_status">Link Now</span>
//             )}
//         </div>
//     );
// };
const TelegramTitle = () => {
  const [linked, setLinked] = (0,react.useState)(true);
  (0,useDispatcher/* useDispatcher */.P)(dispatcher/* defaultDispatcher */.ec, payload => {
    var _payload$params;
    if (payload.action === "three_pid_update" && (payload === null || payload === void 0 ? void 0 : (_payload$params = payload.params) === null || _payload$params === void 0 ? void 0 : _payload$params.threePid) === "telegram") {
      var _payload$params2;
      setLinked(payload === null || payload === void 0 ? void 0 : (_payload$params2 = payload.params) === null || _payload$params2 === void 0 ? void 0 : _payload$params2.linked);
    }
  });
  (0,react.useEffect)(() => {
    MatrixClientPeg/* MatrixClientPeg */.p.get().checkTelegramStatus().then(({
      username,
      telegram_id
    }) => {
      setLinked(!!(username || telegram_id));
    });
  }, []);
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_ThreePid_linked"
  }, "Telegram", !linked && /*#__PURE__*/react.createElement("span", {
    className: "mx_ThreePid_linked_status"
  }));
};

/***/ }),

/***/ 190968:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QG: () => (/* binding */ NotificationRoomHeaderWrapper),
/* harmony export */   oZ: () => (/* binding */ NotificationRoomHeader)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _HomeButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(508380);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(867614);
/* harmony import */ var _icons_IconMore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(416147);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(245539);
/* harmony import */ var _stores_LeftPanelStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(290884);
/* harmony import */ var _def__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(842456);
/* harmony import */ var _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(274057);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(473627);









const NotificationRoomHeader = ({
  room,
  showSecondary = true
}) => {
  const handleClick = () => {
    _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP.dispatch({
      action: _dispatcher_actions__WEBPACK_IMPORTED_MODULE_8__/* .Action */ .a.SetRightPanelPhase,
      phase: _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_7__/* .RightPanelPhases */ .q4.NotificationDrawer,
      refireParams: {}
    });
    _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP.dispatch({
      action: _stores_LeftPanelStore__WEBPACK_IMPORTED_MODULE_5__/* .CHANGE_LEFT_PANEL_UI_STATE */ .Us,
      target: _stores_LeftPanelStore__WEBPACK_IMPORTED_MODULE_5__/* .INBOX_NOTIFICATION */ .mB,
      phase: _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_7__/* .RightPanelPhases */ .q4.NotificationDrawer,
      value: {
        openPanel: true,
        instanceId: "",
        type: _def__WEBPACK_IMPORTED_MODULE_6__/* .NotificationDrawerType */ .M.DISPLAY_INSTANCE_LIST,
        data: null
      }
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_HomeButton__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
    title: (room === null || room === void 0 ? void 0 : room.name) || (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("Notification"),
    secondary: showSecondary ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_LeftPanelContent_header_secondary",
      onClick: handleClick
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_icons_IconMore__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, null)) : null
  });
};
const NotificationRoomHeaderWrapper = ({
  children
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx_LeftPanelContent_header mx_LeftPanelContent_notification_header"
  }, children);
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({});

/***/ }),

/***/ 470912:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(166644);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(992619);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _hiseas_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989638);
/* harmony import */ var _icons_IconOfficial__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65246);
/* harmony import */ var _avatars_OverLapMembersAvatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(486011);


const _excluded = ["id", "name", "avatar", "bg", "desc", "member", "members", "className", "active", "urls", "joinRules", "isOfficial"];




const ExploreBannerBg = (bg, avatar) => {
  return bg || avatar ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "explore_item_banner_bg",
    style: {
      backgroundImage: `url(${bg || avatar})`
    }
  }) : null;
};
const Explore = _ref => {
  let {
      id,
      name,
      avatar,
      bg,
      desc,
      member,
      members,
      className,
      active,
      urls,
      joinRules,
      isOfficial
    } = _ref,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(_ref, _excluded);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)({
    className: `explore_item ${className || ""}${active ? " active" : ""}`
  }, props), bg || avatar ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    className: "explore_item_bg",
    src: bg || avatar
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_hiseas_react__WEBPACK_IMPORTED_MODULE_1__.CombineAvatar, {
    width: 296,
    height: 136,
    avatars: urls,
    className: "explore_item_bg explore_item_bg_combine"
  }), !bg && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "explore_item_bg_mask"
  }), avatar ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "explore_item_avatar_container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: avatar,
    className: "explore_item_avatar"
  })) : urls ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "explore_item_avatar_container"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_hiseas_react__WEBPACK_IMPORTED_MODULE_1__.CombineAvatar, {
    width: 48,
    height: 48,
    avatars: urls,
    className: "explore_item_avatar"
  })) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "explore_item_info"
  }, ExploreBannerBg(bg, avatar), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }
  }, isOfficial ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_icons_IconOfficial__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, null) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "explore_item_name"
  }, name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "explore_item_member"
  }, member, " members"), members ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_avatars_OverLapMembersAvatar__WEBPACK_IMPORTED_MODULE_3__/* .OverLapMembersAvatar */ .l, {
    members: members,
    avatarSize: 26
  }) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "explore_item_desc"
  }, desc)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Explore);

/***/ }),

/***/ 836342:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);

const Group = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: `explore_group ${props.className || ''}`
  }, props.children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Group);

/***/ }),

/***/ 763456:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ HeaderButton)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(166644);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(992619);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(294184);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(835389);
/* harmony import */ var sendingme_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(602271);



const _excluded = ["isHighlighted", "onClick", "analytics", "name", "title"];
/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2017 Vector Creations Ltd
Copyright 2017 New Vector Ltd
Copyright 2018 New Vector Ltd
Copyright 2019 The Matrix.org Foundation C.I.C.

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


// TODO: replace this, the composer buttons and the right panel buttons with a unified representation
// @replaceableComponent("views.right_panel.HeaderButton")
class HeaderButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(...args) {
    super(...args);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(this, "onClick", e => {
      _Analytics__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.trackEvent(...this.props.analytics);
      this.props.onClick(e);
    });
  }
  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _this$props = this.props,
      {
        isHighlighted,
        onClick,
        analytics,
        name,
        title
      } = _this$props,
      props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)(_this$props, _excluded);
    const classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      mx_RightPanel_headerButton: true,
      mx_RightPanel_headerButton_highlight: isHighlighted,
      [`mx_RightPanel_${name}`]: true
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(sendingme_ui__WEBPACK_IMPORTED_MODULE_3__.SdTooltip, {
      title: title,
      placement: "bottom"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(sendingme_ui__WEBPACK_IMPORTED_MODULE_3__.SdButton, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)({}, props, {
      "aria-selected": isHighlighted,
      role: "tab",
      className: classes,
      onClick: this.onClick
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(sendingme_ui__WEBPACK_IMPORTED_MODULE_3__.SdIcon, {
      icon: name
    })));
  }
}

/***/ }),

/***/ 757667:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ HeaderButtons),
/* harmony export */   h: () => (/* binding */ HeaderKind)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(245539);
/* harmony import */ var _stores_RightPanelStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(652458);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(473627);

/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2017 Vector Creations Ltd
Copyright 2017 New Vector Ltd
Copyright 2018 New Vector Ltd
Copyright 2019 The Matrix.org Foundation C.I.C.

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

let HeaderKind = /*#__PURE__*/function (HeaderKind) {
  HeaderKind["Room"] = "room";
  HeaderKind["Group"] = "group";
  return HeaderKind;
}({});
// @replaceableComponent("views.right_panel.HeaderButtons")
class HeaderButtons extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props, kind) {
    super(props);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(this, "storeToken", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(this, "dispatcherRef", void 0);
    const rps = _stores_RightPanelStore__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.getSharedInstance();
    this.state = {
      headerKind: kind,
      phase: kind === HeaderKind.Room ? rps.visibleRoomPanelPhase : rps.visibleGroupPanelPhase
    };
  }
  componentDidMount() {
    this.storeToken = _stores_RightPanelStore__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.getSharedInstance().addListener(this.onRightPanelUpdate.bind(this));
    this.dispatcherRef = _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP.register(this.onAction.bind(this)); // used by subclasses
  }

  componentWillUnmount() {
    if (this.storeToken) this.storeToken.remove();
    if (this.dispatcherRef) _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP.unregister(this.dispatcherRef);
  }
  getState() {
    return this.state;
  }
  setPhase(phase, extras) {
    _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP.dispatch({
      action: _dispatcher_actions__WEBPACK_IMPORTED_MODULE_3__/* .Action */ .a.SetRightPanelPhase,
      phase: phase,
      refireParams: extras
    });
  }
  isPhase(phases) {
    if (Array.isArray(phases)) {
      return phases.includes(this.state.phase);
    } else {
      return phases === this.state.phase;
    }
  }
  onRightPanelUpdate() {
    const rps = _stores_RightPanelStore__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.getSharedInstance();
    if (this.state.headerKind === HeaderKind.Room) {
      this.setState({
        phase: rps.visibleRoomPanelPhase
      });
    } else if (this.state.headerKind === HeaderKind.Group) {
      this.setState({
        phase: rps.visibleGroupPanelPhase
      });
    }
  }

  // XXX: Make renderButtons a prop

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_HeaderButtons"
    }, this.renderButtons());
  }
}

/***/ }),

/***/ 37667:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ CallView)
});

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(225259);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/dispatcher.ts
var dispatcher = __webpack_require__(245539);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/CallHandler.tsx + 2 modules
var CallHandler = __webpack_require__(613431);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/MatrixClientPeg.ts + 3 modules
var MatrixClientPeg = __webpack_require__(933393);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(294184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/settings/SettingsStore.ts + 9 modules
var SettingsStore = __webpack_require__(571879);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/webrtc/callFeed.ts
var callFeed = __webpack_require__(140734);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/logger.ts
var logger = __webpack_require__(101461);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/avatars/MemberAvatar.tsx
var MemberAvatar = __webpack_require__(6156);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/webrtc/callEventTypes.ts
var callEventTypes = __webpack_require__(145537);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/VideoFeed.tsx

/*
Copyright 2015, 2016, 2019 The Matrix.org Foundation C.I.C.

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

// @replaceableComponent("views.voip.VideoFeed")
class VideoFeed extends react.PureComponent {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "element", void 0);
    (0,defineProperty/* default */.Z)(this, "setElementRef", element => {
      if (!element) {
        var _this$element;
        (_this$element = this.element) === null || _this$element === void 0 ? void 0 : _this$element.removeEventListener('resize', this.onResize);
        return;
      }
      this.element = element;
      element.addEventListener('resize', this.onResize);
    });
    (0,defineProperty/* default */.Z)(this, "onNewStream", () => {
      this.setState({
        audioMuted: this.props.feed.isAudioMuted(),
        videoMuted: this.props.feed.isVideoMuted()
      });
    });
    (0,defineProperty/* default */.Z)(this, "onMuteStateChanged", () => {
      this.setState({
        audioMuted: this.props.feed.isAudioMuted(),
        videoMuted: this.props.feed.isVideoMuted()
      });
    });
    (0,defineProperty/* default */.Z)(this, "onSpeaking", speaking => {
      this.setState({
        speaking
      });
    });
    (0,defineProperty/* default */.Z)(this, "onResize", e => {
      if (this.props.onResize && !this.props.feed.isLocal()) {
        this.props.onResize(e);
      }
    });
    this.state = {
      audioMuted: this.props.feed.isAudioMuted(),
      videoMuted: this.props.feed.isVideoMuted(),
      speaking: false
    };
  }
  componentDidMount() {
    this.updateFeed(null, this.props.feed);
    this.playMedia();
  }
  componentWillUnmount() {
    this.updateFeed(this.props.feed, null);
  }
  componentDidUpdate(prevProps, prevState) {
    this.updateFeed(prevProps.feed, this.props.feed);
    // If the mutes state has changed, we try to playMedia()
    if (prevState.videoMuted !== this.state.videoMuted || prevProps.feed.stream !== this.props.feed.stream) {
      this.playMedia();
    }
  }
  static getDerivedStateFromProps(props) {
    return {
      audioMuted: props.feed.isAudioMuted(),
      videoMuted: props.feed.isVideoMuted()
    };
  }
  updateFeed(oldFeed, newFeed) {
    if (oldFeed === newFeed) return;
    if (oldFeed) {
      this.props.feed.removeListener(callFeed/* CallFeedEvent */.E.NewStream, this.onNewStream);
      this.props.feed.removeListener(callFeed/* CallFeedEvent */.E.MuteStateChanged, this.onMuteStateChanged);
      if (this.props.feed.purpose === callEventTypes/* SDPStreamMetadataPurpose */.K.Usermedia) {
        this.props.feed.removeListener(callFeed/* CallFeedEvent */.E.Speaking, this.onSpeaking);
        this.props.feed.measureVolumeActivity(false);
      }
      this.stopMedia();
    }
    if (newFeed) {
      this.props.feed.addListener(callFeed/* CallFeedEvent */.E.NewStream, this.onNewStream);
      this.props.feed.addListener(callFeed/* CallFeedEvent */.E.MuteStateChanged, this.onMuteStateChanged);
      if (this.props.feed.purpose === callEventTypes/* SDPStreamMetadataPurpose */.K.Usermedia) {
        this.props.feed.addListener(callFeed/* CallFeedEvent */.E.Speaking, this.onSpeaking);
        this.props.feed.measureVolumeActivity(true);
      }
      this.playMedia();
    }
  }
  async playMedia() {
    const element = this.element;
    if (!element) return;
    // We play audio in AudioFeed, not here
    element.muted = true;
    element.srcObject = this.props.feed.stream;
    element.autoplay = true;
    try {
      // A note on calling methods on media elements:
      // We used to have queues per media element to serialise all calls on those elements.
      // The reason given for this was that load() and play() were racing. However, we now
      // never call load() explicitly so this seems unnecessary. However, serialising every
      // operation was causing bugs where video would not resume because some play command
      // had got stuck and all media operations were queued up behind it. If necessary, we
      // should serialise the ones that need to be serialised but then be able to interrupt
      // them with another load() which will cancel the pending one, but since we don't call
      // load() explicitly, it shouldn't be a problem. - Dave
      await element.play();
    } catch (e) {
      logger/* logger */.k.info("Failed to play media element with feed", this.props.feed, e);
    }
  }
  stopMedia() {
    const element = this.element;
    if (!element) return;
    element.pause();
    element.src = null;

    // As per comment in componentDidMount, setting the sink ID back to the
    // default once the call is over makes setSinkId work reliably. - Dave
    // Since we are not using the same element anymore, the above doesn't
    // seem to be necessary - Šimon
  }

  render() {
    const {
      pipMode,
      primary,
      feed
    } = this.props;
    const wrapperClasses = classnames_default()("mx_VideoFeed", {
      mx_VideoFeed_voice: this.state.videoMuted,
      mx_VideoFeed_speaking: this.state.speaking
    });
    const micIconClasses = classnames_default()("mx_VideoFeed_mic", {
      mx_VideoFeed_mic_muted: this.state.audioMuted,
      mx_VideoFeed_mic_unmuted: !this.state.audioMuted
    });
    let micIcon;
    if (feed.purpose !== callEventTypes/* SDPStreamMetadataPurpose */.K.Screenshare && !pipMode) {
      micIcon = /*#__PURE__*/react.createElement("div", {
        className: micIconClasses
      });
    }
    let content;
    if (this.state.videoMuted) {
      const member = this.props.feed.getMember();
      let avatarSize;
      if (pipMode && primary) avatarSize = 76;else if (pipMode && !primary) avatarSize = 16;else if (!pipMode && primary) avatarSize = 160;else ; // TBD

      content = /*#__PURE__*/react.createElement(MemberAvatar/* default */.Z, {
        member: member,
        size: avatarSize
      });
    } else {
      const videoClasses = classnames_default()("mx_VideoFeed_video", {
        mx_VideoFeed_video_mirror: this.props.feed.isLocal() && this.props.feed.purpose === callEventTypes/* SDPStreamMetadataPurpose */.K.Usermedia && SettingsStore/* default */.C.getValue('VideoView.flipVideoHorizontally')
      });
      content = /*#__PURE__*/react.createElement("video", {
        className: videoClasses,
        ref: this.setElementRef
      });
    }
    return /*#__PURE__*/react.createElement("div", {
      className: wrapperClasses
    }, micIcon, content);
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/avatars/RoomAvatar.tsx
var RoomAvatar = __webpack_require__(139319);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/webrtc/call.ts
var call = __webpack_require__(160193);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AccessibleButton.tsx
var AccessibleButton = __webpack_require__(805035);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Keyboard.ts
var Keyboard = __webpack_require__(389310);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Avatar.ts
var Avatar = __webpack_require__(161992);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/BaseDialog.js
var BaseDialog = __webpack_require__(308043);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/DialogButtons.js
var DialogButtons = __webpack_require__(804821);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/TabbedView.tsx
var TabbedView = __webpack_require__(793821);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/DesktopCapturerSourcePicker.tsx

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







// import { replaceableComponent } from "../../../utils/replaceableComponent";

function getDesktopCapturerSources() {
  const options = {
    thumbnailSize: {
      height: 176,
      width: 312
    },
    types: ["screen", "window"]
  };
  return window.electron.getDesktopCapturerSources(options);
}
let Tabs = /*#__PURE__*/function (Tabs) {
  Tabs["Screens"] = "screen";
  Tabs["Windows"] = "window";
  return Tabs;
}({});
class ExistingSource extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "onClick", () => {
      this.props.onSelect(this.props.source);
    });
  }
  render() {
    const thumbnailClasses = classnames_default()({
      mx_desktopCapturerSourcePicker_source_thumbnail: true,
      mx_desktopCapturerSourcePicker_source_thumbnail_selected: this.props.selected
    });
    return /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: "mx_desktopCapturerSourcePicker_source",
      title: this.props.source.name,
      onClick: this.onClick
    }, /*#__PURE__*/react.createElement("img", {
      className: thumbnailClasses,
      src: this.props.source.thumbnailURL
    }), /*#__PURE__*/react.createElement("span", {
      className: "mx_desktopCapturerSourcePicker_source_name"
    }, this.props.source.name));
  }
}
// @replaceableComponent("views.elements.DesktopCapturerSourcePicker")
class DesktopCapturerSourcePicker extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "interval", void 0);
    (0,defineProperty/* default */.Z)(this, "onSelect", source => {
      this.setState({
        selectedSource: source
      });
    });
    (0,defineProperty/* default */.Z)(this, "onShare", () => {
      this.props.onFinished(this.state.selectedSource.id);
    });
    (0,defineProperty/* default */.Z)(this, "onTabChange", () => {
      this.setState({
        selectedSource: null
      });
    });
    (0,defineProperty/* default */.Z)(this, "onCloseClick", () => {
      this.props.onFinished(null);
    });
    this.state = {
      selectedTab: Tabs.Screens,
      sources: [],
      selectedSource: null
    };
  }
  async componentDidMount() {
    // setInterval() first waits and then executes, therefore
    // we call getDesktopCapturerSources() here without any delay.
    // Otherwise the dialog would be left empty for some time.
    this.setState({
      sources: await getDesktopCapturerSources()
    });

    // We update the sources every 500ms to get newer thumbnails
    this.interval = setInterval(async () => {
      this.setState({
        sources: await getDesktopCapturerSources()
      });
    }, 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getTab(type, label) {
    const sources = this.state.sources.filter(source => source.id.startsWith(type)).map(source => {
      var _this$state$selectedS;
      return /*#__PURE__*/react.createElement(ExistingSource, {
        selected: ((_this$state$selectedS = this.state.selectedSource) === null || _this$state$selectedS === void 0 ? void 0 : _this$state$selectedS.id) === source.id,
        source: source,
        onSelect: this.onSelect,
        key: source.id
      });
    });
    return new TabbedView/* Tab */.OK(type, label, null, /*#__PURE__*/react.createElement("div", {
      className: "mx_desktopCapturerSourcePicker_tab"
    }, sources));
  }
  render() {
    const tabs = [this.getTab("screen", (0,languageHandler._t)("Share entire screen")), this.getTab("window", (0,languageHandler._t)("Application window"))];
    return /*#__PURE__*/react.createElement(BaseDialog/* default */.Z, {
      className: "mx_desktopCapturerSourcePicker",
      onFinished: this.onCloseClick,
      title: (0,languageHandler._t)("Share content")
    }, /*#__PURE__*/react.createElement(TabbedView/* default */.ZP, {
      tabs: tabs,
      tabLocation: TabbedView/* TabLocation */.oq.TOP,
      onChange: this.onTabChange
    }), /*#__PURE__*/react.createElement(DialogButtons/* default */.Z, {
      primaryButton: (0,languageHandler._t)("Share"),
      hasCancel: true,
      onCancel: this.onCloseClick,
      onPrimaryButtonClick: this.onShare,
      primaryDisabled: !this.state.selectedSource
    }));
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Modal.tsx + 1 modules
var Modal = __webpack_require__(241648);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/CallViewSidebar.tsx
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




class CallViewSidebar extends react.Component {
  render() {
    const feeds = this.props.feeds.map(feed => {
      return /*#__PURE__*/react.createElement(VideoFeed, {
        key: feed.stream.id,
        feed: feed,
        call: this.props.call,
        primary: false,
        pipMode: this.props.pipMode
      });
    });
    const className = classnames_default()("mx_CallViewSidebar", {
      mx_CallViewSidebar_pipMode: this.props.pipMode
    });
    return /*#__PURE__*/react.createElement("div", {
      className: className
    }, feeds);
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AccessibleTooltipButton.tsx
var AccessibleTooltipButton = __webpack_require__(717919);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/CallView/CallViewHeader.tsx
/*
Copyright 2021 New Vector Ltd

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









const callTypeTranslationByType = {
  [call/* CallType */.rf.Video]: (0,languageHandler/* _td */.I8)("Video Call"),
  [call/* CallType */.rf.Voice]: (0,languageHandler/* _td */.I8)("Voice Call")
};
const onRoomAvatarClick = roomId => {
  dispatcher/* default */.ZP.dispatch({
    action: 'view_room',
    room_id: roomId
  });
};
const onFullscreenClick = () => {
  dispatcher/* default */.ZP.dispatch({
    action: 'video_fullscreen',
    fullscreen: true
  });
};
const onExpandClick = roomId => {
  dispatcher/* default */.ZP.dispatch({
    action: 'view_room',
    room_id: roomId
  });
};
const CallViewHeaderControls = ({
  pipMode = false,
  type,
  roomId
}) => {
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_CallViewHeader_controls"
  }, !pipMode && /*#__PURE__*/react.createElement(AccessibleTooltipButton/* default */.Z, {
    className: "mx_CallViewHeader_button mx_CallViewHeader_button_fullscreen",
    onClick: onFullscreenClick,
    title: (0,languageHandler._t)("Fill Screen")
  }), pipMode && /*#__PURE__*/react.createElement(AccessibleTooltipButton/* default */.Z, {
    className: "mx_CallViewHeader_button mx_CallViewHeader_button_expand",
    onClick: () => onExpandClick(roomId),
    title: (0,languageHandler._t)("Return to call")
  }));
};
const SecondaryCallInfo = ({
  callRoom
}) => {
  return /*#__PURE__*/react.createElement("span", {
    className: "mx_CallViewHeader_secondaryCallInfo"
  }, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
    element: "span",
    onClick: () => onRoomAvatarClick(callRoom.roomId)
  }, /*#__PURE__*/react.createElement(RoomAvatar/* default */.Z, {
    room: callRoom,
    size: 16
  }), /*#__PURE__*/react.createElement("span", {
    className: "mx_CallView_secondaryCall_roomName"
  }, (0,languageHandler._t)("%(name)s on hold", {
    name: callRoom.name
  }))));
};
const CallTypeIcon = ({
  type
}) => {
  const classes = classnames_default()({
    'mx_CallViewHeader_callTypeIcon': true,
    'mx_CallViewHeader_callTypeIcon_video': type === call/* CallType */.rf.Video,
    'mx_CallViewHeader_callTypeIcon_voice': type === call/* CallType */.rf.Voice
  });
  return /*#__PURE__*/react.createElement("div", {
    className: classes
  });
};
const CallViewHeader = ({
  type,
  pipMode = false,
  callRooms = [],
  onPipMouseDown
}) => {
  const [callRoom, onHoldCallRoom] = callRooms;
  const callTypeText = (0,languageHandler._t)(callTypeTranslationByType[type]);
  const callRoomName = callRoom.name;
  const {
    roomId
  } = callRoom;
  if (!pipMode) {
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_CallViewHeader"
    }, /*#__PURE__*/react.createElement(CallTypeIcon, {
      type: type
    }), /*#__PURE__*/react.createElement("span", {
      className: "mx_CallViewHeader_callType"
    }, callTypeText), /*#__PURE__*/react.createElement(CallViewHeaderControls, {
      roomId: roomId,
      pipMode: pipMode,
      type: type
    }));
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_CallViewHeader",
    onMouseDown: onPipMouseDown
  }, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
    onClick: () => onRoomAvatarClick(roomId)
  }, /*#__PURE__*/react.createElement(RoomAvatar/* default */.Z, {
    room: callRoom,
    size: 32
  })), /*#__PURE__*/react.createElement("div", {
    className: "mx_CallViewHeader_callInfo"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_CallViewHeader_roomName"
  }, callRoomName), /*#__PURE__*/react.createElement("div", {
    className: "mx_CallViewHeader_callTypeSmall"
  }, callTypeText, onHoldCallRoom && /*#__PURE__*/react.createElement(SecondaryCallInfo, {
    callRoom: onHoldCallRoom
  }))), /*#__PURE__*/react.createElement(CallViewHeaderControls, {
    roomId: roomId,
    pipMode: pipMode,
    type: type
  }));
};
/* harmony default export */ const CallView_CallViewHeader = (CallViewHeader);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(166644);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(45697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/ContextMenu.tsx + 6 modules
var ContextMenu = __webpack_require__(760172);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/InviteDialog.tsx + 2 modules
var InviteDialog = __webpack_require__(97845);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/context_menus/CallContextMenu.tsx

/*
Copyright 2020 New Vector Ltd

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

// @replaceableComponent("views.context_menus.CallContextMenu")
class CallContextMenu extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "onHoldClick", () => {
      this.props.call.setRemoteOnHold(true);
      this.props.onFinished();
    });
    (0,defineProperty/* default */.Z)(this, "onUnholdClick", () => {
      CallHandler/* default */.ZP.sharedInstance().setActiveCallRoomId(this.props.call.roomId);
      this.props.onFinished();
    });
    (0,defineProperty/* default */.Z)(this, "onTransferClick", () => {
      // Modal.createTrackedDialog(
      //     'Transfer Call', '', InviteDialog, { kind: KIND_CALL_TRANSFER, call: this.props.call },
      //     /*className=*/"mx_InviteDialog_transferWrapper", /*isPriority=*/false, /*isStatic=*/true,
      // );
      InviteDialog/* default */.ZP.createDialog({
        kind: InviteDialog/* KIND_CALL_TRANSFER */.a$,
        call: this.props.call
      });
      this.props.onFinished();
    });
  }
  render() {
    const holdUnholdCaption = this.props.call.isRemoteOnHold() ? (0,languageHandler._t)("Resume") : (0,languageHandler._t)("Hold");
    const handler = this.props.call.isRemoteOnHold() ? this.onUnholdClick : this.onHoldClick;
    let transferItem;
    if (this.props.call.opponentCanBeTransferred()) {
      transferItem = /*#__PURE__*/react.createElement(ContextMenu/* MenuItem */.sN, {
        className: "mx_CallContextMenu_item",
        onClick: this.onTransferClick
      }, (0,languageHandler._t)("Transfer"));
    }
    return /*#__PURE__*/react.createElement(ContextMenu/* ContextMenu */.xV, this.props, /*#__PURE__*/react.createElement(ContextMenu/* MenuItem */.sN, {
      className: "mx_CallContextMenu_item",
      onClick: handler
    }, holdUnholdCaption), transferItem);
  }
}
(0,defineProperty/* default */.Z)(CallContextMenu, "propTypes", {
  // js-sdk User object. Not required because it might not exist.
  user: (prop_types_default()).object
});
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Field.tsx
var Field = __webpack_require__(455537);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/DialPad.tsx
var DialPad = __webpack_require__(836515);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/context_menus/DialpadContextMenu.tsx

/*
Copyright 2021 The Matrix.org Foundation C.I.C.

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

// @replaceableComponent("views.context_menus.DialpadContextMenu")
class DialpadContextMenu extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "numberEntryFieldRef", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "onDigitPress", (digit, ev) => {
      this.props.call.sendDtmfDigit(digit);
      this.setState({
        value: this.state.value + digit
      });

      // Keep the number field focused so that keyboard entry is still available
      // However, don't focus if this wasn't the result of directly clicking on the button,
      // i.e someone using keyboard navigation.
      if (ev.type === "click") {
        var _this$numberEntryFiel;
        (_this$numberEntryFiel = this.numberEntryFieldRef.current) === null || _this$numberEntryFiel === void 0 ? void 0 : _this$numberEntryFiel.focus();
      }
    });
    (0,defineProperty/* default */.Z)(this, "onCancelClick", () => {
      this.props.onFinished();
    });
    (0,defineProperty/* default */.Z)(this, "onKeyDown", ev => {
      // Prevent Backspace and Delete keys from functioning in the entry field
      if (ev.code === "Backspace" || ev.code === "Delete") {
        ev.preventDefault();
      }
    });
    (0,defineProperty/* default */.Z)(this, "onChange", ev => {
      this.setState({
        value: ev.target.value
      });
    });
    this.state = {
      value: ''
    };
  }
  render() {
    return /*#__PURE__*/react.createElement(ContextMenu/* ContextMenu */.xV, this.props, /*#__PURE__*/react.createElement("div", {
      className: "mx_DialPadContextMenuWrapper"
    }, /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: "mx_DialPadContextMenu_cancel",
      onClick: this.onCancelClick
    })), /*#__PURE__*/react.createElement("div", {
      className: "mx_DialPadContextMenu_header"
    }, /*#__PURE__*/react.createElement(Field/* default */.Z, {
      ref: this.numberEntryFieldRef,
      className: "mx_DialPadContextMenu_dialled",
      value: this.state.value,
      autoFocus: true,
      onKeyDown: this.onKeyDown,
      onChange: this.onChange
    })), /*#__PURE__*/react.createElement("div", {
      className: "mx_DialPadContextMenu_dialPad"
    }, /*#__PURE__*/react.createElement(DialPad/* default */.Z, {
      onDigitPress: this.onDigitPress,
      hasDial: false
    }))));
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Tooltip.tsx
var Tooltip = __webpack_require__(578413);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/CallView/CallViewButtons.tsx


/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2019 - 2021 The Matrix.org Foundation C.I.C.
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










// Height of the header duplicated from CSS because we need to subtract it from our max
// height to get the max height of the video
const CONTEXT_MENU_VPADDING = 8; // How far the context menu sits above the button (px)

const TOOLTIP_Y_OFFSET = -24;
const CONTROLS_HIDE_DELAY = 2000;
class CallViewButtons extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "dialpadButton", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "contextMenuButton", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "controlsHideTimer", null);
    (0,defineProperty/* default */.Z)(this, "onControlsHideTimer", () => {
      if (this.state.hoveringControls || this.state.showDialpad || this.state.showMoreMenu) return;
      this.controlsHideTimer = null;
      this.setState({
        visible: false
      });
    });
    (0,defineProperty/* default */.Z)(this, "onMouseEnter", () => {
      this.setState({
        hoveringControls: true
      });
    });
    (0,defineProperty/* default */.Z)(this, "onMouseLeave", () => {
      this.setState({
        hoveringControls: false
      });
    });
    (0,defineProperty/* default */.Z)(this, "onDialpadClick", () => {
      if (!this.state.showDialpad) {
        this.setState({
          showDialpad: true
        });
        this.showControls();
      } else {
        this.setState({
          showDialpad: false
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onMoreClick", () => {
      this.setState({
        showMoreMenu: true
      });
      this.showControls();
    });
    (0,defineProperty/* default */.Z)(this, "closeDialpad", () => {
      this.setState({
        showDialpad: false
      });
    });
    (0,defineProperty/* default */.Z)(this, "closeContextMenu", () => {
      this.setState({
        showMoreMenu: false
      });
    });
    this.state = {
      showDialpad: false,
      hoveringControls: false,
      showMoreMenu: false,
      visible: true
    };
  }
  componentDidMount() {
    this.showControls();
  }
  showControls() {
    if (this.state.showMoreMenu || this.state.showDialpad) return;
    if (!this.state.visible) {
      this.setState({
        visible: true
      });
    }
    if (this.controlsHideTimer !== null) {
      clearTimeout(this.controlsHideTimer);
    }
    this.controlsHideTimer = window.setTimeout(this.onControlsHideTimer, CONTROLS_HIDE_DELAY);
  }
  render() {
    const micClasses = classnames_default()("mx_CallViewButtons_button", {
      mx_CallViewButtons_button_micOn: !this.props.buttonsState.micMuted,
      mx_CallViewButtons_button_micOff: this.props.buttonsState.micMuted
    });
    const vidClasses = classnames_default()("mx_CallViewButtons_button", {
      mx_CallViewButtons_button_vidOn: !this.props.buttonsState.vidMuted,
      mx_CallViewButtons_button_vidOff: this.props.buttonsState.vidMuted
    });
    const screensharingClasses = classnames_default()("mx_CallViewButtons_button", {
      mx_CallViewButtons_button_screensharingOn: this.props.buttonsState.screensharing,
      mx_CallViewButtons_button_screensharingOff: !this.props.buttonsState.screensharing
    });
    const sidebarButtonClasses = classnames_default()("mx_CallViewButtons_button", {
      mx_CallViewButtons_button_sidebarOn: this.props.buttonsState.sidebarShown,
      mx_CallViewButtons_button_sidebarOff: !this.props.buttonsState.sidebarShown
    });

    // Put the other states of the mic/video icons in the document to make sure they're cached
    // (otherwise the icon disappears briefly when toggled)
    const micCacheClasses = classnames_default()("mx_CallViewButtons_button", "mx_CallViewButtons_button_invisible", {
      mx_CallViewButtons_button_micOn: this.props.buttonsState.micMuted,
      mx_CallViewButtons_button_micOff: !this.props.buttonsState.micMuted
    });
    const vidCacheClasses = classnames_default()("mx_CallViewButtons_button", "mx_CallViewButtons_button_invisible", {
      mx_CallViewButtons_button_vidOn: this.props.buttonsState.micMuted,
      mx_CallViewButtons_button_vidOff: !this.props.buttonsState.micMuted
    });
    const callControlsClasses = classnames_default()("mx_CallViewButtons", {
      mx_CallViewButtons_hidden: !this.state.visible
    });
    let vidMuteButton;
    if (this.props.buttonsVisibility.vidMute) {
      vidMuteButton = /*#__PURE__*/react.createElement(AccessibleTooltipButton/* default */.Z, {
        className: vidClasses,
        onClick: this.props.handlers.onVidMuteClick,
        title: this.props.buttonsState.vidMuted ? (0,languageHandler._t)("Start the camera") : (0,languageHandler._t)("Stop the camera"),
        alignment: Tooltip/* Alignment */.v.Top,
        yOffset: TOOLTIP_Y_OFFSET
      });
    }
    let screensharingButton;
    if (this.props.buttonsVisibility.screensharing) {
      screensharingButton = /*#__PURE__*/react.createElement(AccessibleTooltipButton/* default */.Z, {
        className: screensharingClasses,
        onClick: this.props.handlers.onScreenshareClick,
        title: this.props.buttonsState.screensharing ? (0,languageHandler._t)("Stop sharing your screen") : (0,languageHandler._t)("Start sharing your screen"),
        alignment: Tooltip/* Alignment */.v.Top,
        yOffset: TOOLTIP_Y_OFFSET
      });
    }
    let sidebarButton;
    if (this.props.buttonsVisibility.sidebar) {
      sidebarButton = /*#__PURE__*/react.createElement(AccessibleTooltipButton/* default */.Z, {
        className: sidebarButtonClasses,
        onClick: this.props.handlers.onToggleSidebarClick,
        title: this.props.buttonsState.sidebarShown ? (0,languageHandler._t)("Hide sidebar") : (0,languageHandler._t)("Show sidebar"),
        alignment: Tooltip/* Alignment */.v.Top,
        yOffset: TOOLTIP_Y_OFFSET
      });
    }
    let contextMenuButton;
    if (this.props.buttonsVisibility.contextMenu) {
      contextMenuButton = /*#__PURE__*/react.createElement(ContextMenu/* ContextMenuTooltipButton */.JY, {
        className: "mx_CallViewButtons_button mx_CallViewButtons_button_more",
        onClick: this.onMoreClick,
        inputRef: this.contextMenuButton,
        isExpanded: this.state.showMoreMenu,
        title: (0,languageHandler._t)("More"),
        alignment: Tooltip/* Alignment */.v.Top,
        yOffset: TOOLTIP_Y_OFFSET
      });
    }
    let dialpadButton;
    if (this.props.buttonsVisibility.dialpad) {
      dialpadButton = /*#__PURE__*/react.createElement(ContextMenu/* ContextMenuTooltipButton */.JY, {
        className: "mx_CallViewButtons_button mx_CallViewButtons_dialpad",
        inputRef: this.dialpadButton,
        onClick: this.onDialpadClick,
        isExpanded: this.state.showDialpad,
        title: (0,languageHandler._t)("Dialpad"),
        alignment: Tooltip/* Alignment */.v.Top,
        yOffset: TOOLTIP_Y_OFFSET
      });
    }
    let dialPad;
    if (this.state.showDialpad) {
      dialPad = /*#__PURE__*/react.createElement(DialpadContextMenu, (0,esm_extends/* default */.Z)({}, (0,ContextMenu/* alwaysAboveRightOf */.xT)(this.dialpadButton.current.getBoundingClientRect(), ContextMenu/* ChevronFace */.N7.None, CONTEXT_MENU_VPADDING), {
        // We mount the context menus as a as a child typically in order to include the
        // context menus when fullscreening the call content.
        // However, this does not work as well when the call is embedded in a
        // picture-in-picture frame. Thus, only mount as child when we are *not* in PiP.
        mountAsChild: !this.props.pipMode,
        onFinished: this.closeDialpad,
        call: this.props.call
      }));
    }
    let contextMenu;
    if (this.state.showMoreMenu) {
      contextMenu = /*#__PURE__*/react.createElement(CallContextMenu, (0,esm_extends/* default */.Z)({}, (0,ContextMenu/* alwaysAboveLeftOf */.Wr)(this.contextMenuButton.current.getBoundingClientRect(), ContextMenu/* ChevronFace */.N7.None, CONTEXT_MENU_VPADDING), {
        mountAsChild: !this.props.pipMode,
        onFinished: this.closeContextMenu,
        call: this.props.call
      }));
    }
    return /*#__PURE__*/react.createElement("div", {
      className: callControlsClasses,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    }, dialPad, contextMenu, dialpadButton, /*#__PURE__*/react.createElement(AccessibleTooltipButton/* default */.Z, {
      className: micClasses,
      onClick: this.props.handlers.onMicMuteClick,
      title: this.props.buttonsState.micMuted ? (0,languageHandler._t)("Unmute the microphone") : (0,languageHandler._t)("Mute the microphone"),
      alignment: Tooltip/* Alignment */.v.Top,
      yOffset: TOOLTIP_Y_OFFSET
    }), vidMuteButton, /*#__PURE__*/react.createElement("div", {
      className: micCacheClasses
    }), /*#__PURE__*/react.createElement("div", {
      className: vidCacheClasses
    }), screensharingButton, sidebarButton, contextMenuButton, /*#__PURE__*/react.createElement(AccessibleTooltipButton/* default */.Z, {
      className: "mx_CallViewButtons_button mx_CallViewButtons_button_hangup",
      onClick: this.props.handlers.onHangupClick,
      title: (0,languageHandler._t)("Hangup"),
      alignment: Tooltip/* Alignment */.v.Top,
      yOffset: TOOLTIP_Y_OFFSET
    }));
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/CallView.tsx

/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2019 - 2021 The Matrix.org Foundation C.I.C.
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













// import { replaceableComponent } from "../../../utils/replaceableComponent";






function getFullScreenElement() {
  return document.fullscreenElement ||
  // moz omitted because firefox supports this unprefixed now (webkit here for safari)
  document.webkitFullscreenElement || document.msFullscreenElement;
}
function requestFullscreen(element) {
  const method = element.requestFullscreen ||
  // moz omitted since firefox supports unprefixed now
  element.webkitRequestFullScreen || element.msRequestFullscreen;
  if (method) method.call(element);
}
function exitFullscreen() {
  const exitMethod = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
  if (exitMethod) exitMethod.call(document);
}

// @replaceableComponent("views.voip.CallView")
class CallView extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "dispatcherRef", void 0);
    (0,defineProperty/* default */.Z)(this, "contentRef", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "buttonsRef", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "onAction", payload => {
      switch (payload.action) {
        case 'video_fullscreen':
          {
            if (!this.contentRef.current) {
              return;
            }
            if (payload.fullscreen) {
              requestFullscreen(this.contentRef.current);
            } else if (getFullScreenElement()) {
              exitFullscreen();
            }
            break;
          }
      }
    });
    (0,defineProperty/* default */.Z)(this, "onCallState", state => {
      this.setState({
        callState: state
      });
    });
    (0,defineProperty/* default */.Z)(this, "onFeedsChanged", newFeeds => {
      const {
        primary,
        secondary
      } = CallView.getOrderedFeeds(newFeeds);
      this.setState({
        primaryFeed: primary,
        secondaryFeeds: secondary
      });
    });
    (0,defineProperty/* default */.Z)(this, "onCallLocalHoldUnhold", () => {
      this.setState({
        isLocalOnHold: this.props.call.isLocalOnHold()
      });
    });
    (0,defineProperty/* default */.Z)(this, "onCallRemoteHoldUnhold", () => {
      this.setState({
        isRemoteOnHold: this.props.call.isRemoteOnHold(),
        // update both here because isLocalOnHold changes when we hold the call too
        isLocalOnHold: this.props.call.isLocalOnHold()
      });
    });
    (0,defineProperty/* default */.Z)(this, "onMouseMove", () => {
      var _this$buttonsRef$curr;
      (_this$buttonsRef$curr = this.buttonsRef.current) === null || _this$buttonsRef$curr === void 0 ? void 0 : _this$buttonsRef$curr.showControls();
    });
    (0,defineProperty/* default */.Z)(this, "onMicMuteClick", () => {
      const newVal = !this.state.micMuted;
      this.props.call.setMicrophoneMuted(newVal);
      this.setState({
        micMuted: newVal
      });
    });
    (0,defineProperty/* default */.Z)(this, "onVidMuteClick", () => {
      const newVal = !this.state.vidMuted;
      this.props.call.setLocalVideoMuted(newVal);
      this.setState({
        vidMuted: newVal
      });
    });
    (0,defineProperty/* default */.Z)(this, "onScreenshareClick", async () => {
      let isScreensharing;
      if (this.state.screensharing) {
        isScreensharing = await this.props.call.setScreensharingEnabled(false);
      } else {
        var _window$electron;
        if ((_window$electron = window.electron) !== null && _window$electron !== void 0 && _window$electron.getDesktopCapturerSources) {
          const {
            finished
          } = Modal/* default */.Z.createDialog(DesktopCapturerSourcePicker);
          const [source] = await finished;
          isScreensharing = await this.props.call.setScreensharingEnabled(true, source);
        } else {
          isScreensharing = await this.props.call.setScreensharingEnabled(true);
        }
      }
      this.setState({
        sidebarShown: true,
        screensharing: isScreensharing
      });
    });
    // we register global shortcuts here, they *must not conflict* with local shortcuts elsewhere or both will fire
    // Note that this assumes we always have a CallView on screen at any given time
    // CallHandler would probably be a better place for this
    (0,defineProperty/* default */.Z)(this, "onNativeKeyDown", ev => {
      let handled = false;
      const ctrlCmdOnly = (0,Keyboard/* isOnlyCtrlOrCmdKeyEvent */.Hy)(ev);
      switch (ev.key) {
        case Keyboard/* Key */.sr.D:
          if (ctrlCmdOnly) {
            var _this$buttonsRef$curr2;
            this.onMicMuteClick();
            // show the controls to give feedback
            (_this$buttonsRef$curr2 = this.buttonsRef.current) === null || _this$buttonsRef$curr2 === void 0 ? void 0 : _this$buttonsRef$curr2.showControls();
            handled = true;
          }
          break;
        case Keyboard/* Key */.sr.E:
          if (ctrlCmdOnly) {
            var _this$buttonsRef$curr3;
            this.onVidMuteClick();
            // show the controls to give feedback
            (_this$buttonsRef$curr3 = this.buttonsRef.current) === null || _this$buttonsRef$curr3 === void 0 ? void 0 : _this$buttonsRef$curr3.showControls();
            handled = true;
          }
          break;
      }
      if (handled) {
        ev.stopPropagation();
        ev.preventDefault();
      }
    });
    (0,defineProperty/* default */.Z)(this, "onCallResumeClick", () => {
      const userFacingRoomId = CallHandler/* default */.ZP.sharedInstance().roomIdForCall(this.props.call);
      CallHandler/* default */.ZP.sharedInstance().setActiveCallRoomId(userFacingRoomId);
    });
    (0,defineProperty/* default */.Z)(this, "onTransferClick", () => {
      const transfereeCall = CallHandler/* default */.ZP.sharedInstance().getTransfereeForCallId(this.props.call.callId);
      this.props.call.transferToCall(transfereeCall);
    });
    (0,defineProperty/* default */.Z)(this, "onHangupClick", () => {
      dispatcher/* default */.ZP.dispatch({
        action: 'hangup',
        room_id: CallHandler/* default */.ZP.sharedInstance().roomIdForCall(this.props.call)
      });
    });
    (0,defineProperty/* default */.Z)(this, "onToggleSidebar", () => {
      this.setState({
        sidebarShown: !this.state.sidebarShown
      });
    });
    const {
      primary: _primary,
      secondary: _secondary
    } = CallView.getOrderedFeeds(this.props.call.getFeeds());
    this.state = {
      isLocalOnHold: this.props.call.isLocalOnHold(),
      isRemoteOnHold: this.props.call.isRemoteOnHold(),
      micMuted: this.props.call.isMicrophoneMuted(),
      vidMuted: this.props.call.isLocalVideoMuted(),
      screensharing: this.props.call.isScreensharing(),
      callState: this.props.call.state,
      controlsVisible: true,
      hoveringControls: false,
      showMoreMenu: false,
      showDialpad: false,
      primaryFeed: _primary,
      secondaryFeeds: _secondary,
      sidebarShown: true
    };
    this.updateCallListeners(null, this.props.call);
  }
  componentDidMount() {
    this.dispatcherRef = dispatcher/* default */.ZP.register(this.onAction);
    document.addEventListener('keydown', this.onNativeKeyDown);
  }
  componentWillUnmount() {
    if (getFullScreenElement()) {
      exitFullscreen();
    }
    document.removeEventListener("keydown", this.onNativeKeyDown);
    this.updateCallListeners(this.props.call, null);
    dispatcher/* default */.ZP.unregister(this.dispatcherRef);
  }
  static getDerivedStateFromProps(props) {
    const {
      primary,
      secondary
    } = CallView.getOrderedFeeds(props.call.getFeeds());
    return {
      primaryFeed: primary,
      secondaryFeeds: secondary
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.call === prevProps.call) return;
    this.setState({
      isLocalOnHold: this.props.call.isLocalOnHold(),
      isRemoteOnHold: this.props.call.isRemoteOnHold(),
      micMuted: this.props.call.isMicrophoneMuted(),
      vidMuted: this.props.call.isLocalVideoMuted(),
      callState: this.props.call.state
    });
    this.updateCallListeners(null, this.props.call);
  }
  updateCallListeners(oldCall, newCall) {
    if (oldCall === newCall) return;
    if (oldCall) {
      oldCall.removeListener(call/* CallEvent */.nP.State, this.onCallState);
      oldCall.removeListener(call/* CallEvent */.nP.LocalHoldUnhold, this.onCallLocalHoldUnhold);
      oldCall.removeListener(call/* CallEvent */.nP.RemoteHoldUnhold, this.onCallRemoteHoldUnhold);
      oldCall.removeListener(call/* CallEvent */.nP.FeedsChanged, this.onFeedsChanged);
    }
    if (newCall) {
      newCall.on(call/* CallEvent */.nP.State, this.onCallState);
      newCall.on(call/* CallEvent */.nP.LocalHoldUnhold, this.onCallLocalHoldUnhold);
      newCall.on(call/* CallEvent */.nP.RemoteHoldUnhold, this.onCallRemoteHoldUnhold);
      newCall.on(call/* CallEvent */.nP.FeedsChanged, this.onFeedsChanged);
    }
  }
  static getOrderedFeeds(feeds) {
    let primary;

    // Try to use a screensharing as primary, a remote one if possible
    const screensharingFeeds = feeds.filter(feed => feed.purpose === callEventTypes/* SDPStreamMetadataPurpose */.K.Screenshare);
    primary = screensharingFeeds.find(feed => !feed.isLocal()) || screensharingFeeds[0];
    // If we didn't find remote screen-sharing stream, try to find any remote stream
    if (!primary) {
      primary = feeds.find(feed => !feed.isLocal());
    }
    const secondary = [...feeds];
    // Remove the primary feed from the array
    if (primary) secondary.splice(secondary.indexOf(primary), 1);
    secondary.sort((a, b) => {
      if (a.isLocal() && !b.isLocal()) return -1;
      if (!a.isLocal() && b.isLocal()) return 1;
      return 0;
    });
    return {
      primary,
      secondary
    };
  }
  renderCallControls() {
    var _this$state$primaryFe;
    // We don't support call upgrades (yet) so hide the video mute button in voice calls
    const vidMuteButtonShown = this.props.call.type === call/* CallType */.rf.Video;
    // Screensharing is possible, if we can send a second stream and
    // identify it using SDPStreamMetadata or if we can replace the already
    // existing usermedia track by a screensharing track. We also need to be
    // connected to know the state of the other side
    const screensharingButtonShown = (this.props.call.opponentSupportsSDPStreamMetadata() || this.props.call.type === call/* CallType */.rf.Video) && this.props.call.state === call/* CallState */.OX.Connected;
    // To show the sidebar we need secondary feeds, if we don't have them,
    // we can hide this button. If we are in PiP, sidebar is also hidden, so
    // we can hide the button too
    const sidebarButtonShown = ((_this$state$primaryFe = this.state.primaryFeed) === null || _this$state$primaryFe === void 0 ? void 0 : _this$state$primaryFe.purpose) === callEventTypes/* SDPStreamMetadataPurpose */.K.Screenshare || this.props.call.isScreensharing();
    // The dial pad & 'more' button actions are only relevant in a connected call
    const contextMenuButtonShown = this.state.callState === call/* CallState */.OX.Connected;
    const dialpadButtonShown = this.state.callState === call/* CallState */.OX.Connected && this.props.call.opponentSupportsDTMF();
    return /*#__PURE__*/react.createElement(CallViewButtons, {
      ref: this.buttonsRef,
      call: this.props.call,
      pipMode: this.props.pipMode,
      handlers: {
        onToggleSidebarClick: this.onToggleSidebar,
        onScreenshareClick: this.onScreenshareClick,
        onHangupClick: this.onHangupClick,
        onMicMuteClick: this.onMicMuteClick,
        onVidMuteClick: this.onVidMuteClick
      },
      buttonsState: {
        micMuted: this.state.micMuted,
        vidMuted: this.state.vidMuted,
        sidebarShown: this.state.sidebarShown,
        screensharing: this.state.screensharing
      },
      buttonsVisibility: {
        vidMute: vidMuteButtonShown,
        screensharing: screensharingButtonShown,
        sidebar: sidebarButtonShown,
        contextMenu: contextMenuButtonShown,
        dialpad: dialpadButtonShown
      }
    });
  }
  render() {
    const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
    const callRoomId = CallHandler/* default */.ZP.sharedInstance().roomIdForCall(this.props.call);
    const secondaryCallRoomId = CallHandler/* default */.ZP.sharedInstance().roomIdForCall(this.props.secondaryCall);
    const callRoom = client.getRoom(callRoomId);
    const secCallRoom = this.props.secondaryCall ? client.getRoom(secondaryCallRoomId) : null;
    const avatarSize = this.props.pipMode ? 76 : 160;
    const transfereeCall = CallHandler/* default */.ZP.sharedInstance().getTransfereeForCallId(this.props.call.callId);
    const isOnHold = this.state.isLocalOnHold || this.state.isRemoteOnHold;
    const isScreensharing = this.props.call.isScreensharing();
    const sidebarShown = this.state.sidebarShown;
    const someoneIsScreensharing = this.props.call.getFeeds().some(feed => {
      return feed.purpose === callEventTypes/* SDPStreamMetadataPurpose */.K.Screenshare;
    });
    const isVideoCall = this.props.call.type === call/* CallType */.rf.Video;
    let contentView;
    let holdTransferContent;
    if (transfereeCall) {
      const transferTargetRoom = MatrixClientPeg/* MatrixClientPeg */.p.get().getRoom(CallHandler/* default */.ZP.sharedInstance().roomIdForCall(this.props.call));
      const transferTargetName = transferTargetRoom ? transferTargetRoom.name : (0,languageHandler._t)("unknown person");
      const transfereeRoom = MatrixClientPeg/* MatrixClientPeg */.p.get().getRoom(CallHandler/* default */.ZP.sharedInstance().roomIdForCall(transfereeCall));
      const transfereeName = transfereeRoom ? transfereeRoom.name : (0,languageHandler._t)("unknown person");
      holdTransferContent = /*#__PURE__*/react.createElement("div", {
        className: "mx_CallView_holdTransferContent"
      }, (0,languageHandler._t)("Consulting with %(transferTarget)s. <a>Transfer to %(transferee)s</a>", {
        transferTarget: transferTargetName,
        transferee: transfereeName
      }, {
        a: sub => /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
          kind: "link",
          onClick: this.onTransferClick
        }, sub)
      }));
    } else if (isOnHold) {
      let onHoldText = null;
      if (this.state.isRemoteOnHold) {
        const holdString = CallHandler/* default */.ZP.sharedInstance().hasAnyUnheldCall() ? (0,languageHandler/* _td */.I8)("You held the call <a>Switch</a>") : (0,languageHandler/* _td */.I8)("You held the call <a>Resume</a>");
        onHoldText = (0,languageHandler._t)(holdString, {}, {
          a: sub => /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
            kind: "link",
            onClick: this.onCallResumeClick
          }, sub)
        });
      } else if (this.state.isLocalOnHold) {
        onHoldText = (0,languageHandler._t)("%(peerName)s held the call", {
          peerName: this.props.call.getOpponentMember().name
        });
      }
      holdTransferContent = /*#__PURE__*/react.createElement("div", {
        className: "mx_CallView_holdTransferContent"
      }, onHoldText);
    }
    let sidebar;
    if (!isOnHold && !transfereeCall && sidebarShown && (isVideoCall || someoneIsScreensharing)) {
      sidebar = /*#__PURE__*/react.createElement(CallViewSidebar, {
        feeds: this.state.secondaryFeeds,
        call: this.props.call,
        pipMode: this.props.pipMode
      });
    }

    // This is a bit messy. I can't see a reason to have two onHold/transfer screens
    if (isOnHold || transfereeCall) {
      if (isVideoCall) {
        const containerClasses = classnames_default()({
          mx_CallView_content: true,
          mx_CallView_video: true,
          mx_CallView_video_hold: isOnHold
        });
        let onHoldBackground = null;
        const backgroundStyle = {};
        const backgroundAvatarUrl = (0,Avatar/* avatarUrlForMember */.xj)(
        // is it worth getting the size of the div to pass here?
        this.props.call.getOpponentMember(), 1024, 1024, 'crop');
        backgroundStyle.backgroundImage = 'url(' + backgroundAvatarUrl + ')';
        onHoldBackground = /*#__PURE__*/react.createElement("div", {
          className: "mx_CallView_video_holdBackground",
          style: backgroundStyle
        });
        contentView = /*#__PURE__*/react.createElement("div", {
          className: containerClasses,
          ref: this.contentRef,
          onMouseMove: this.onMouseMove
        }, onHoldBackground, holdTransferContent, this.renderCallControls());
      } else {
        const classes = classnames_default()({
          mx_CallView_content: true,
          mx_CallView_voice: true,
          mx_CallView_voice_hold: isOnHold
        });
        contentView = /*#__PURE__*/react.createElement("div", {
          className: classes,
          onMouseMove: this.onMouseMove
        }, /*#__PURE__*/react.createElement("div", {
          className: "mx_CallView_voice_avatarsContainer"
        }, /*#__PURE__*/react.createElement("div", {
          className: "mx_CallView_voice_avatarContainer",
          style: {
            width: avatarSize,
            height: avatarSize
          }
        }, /*#__PURE__*/react.createElement(RoomAvatar/* default */.Z, {
          room: callRoom,
          size: avatarSize
        }))), holdTransferContent, this.renderCallControls());
      }
    } else if (this.props.call.noIncomingFeeds()) {
      // Here we're reusing the css classes from voice on hold, because
      // I am lazy. If this gets merged, the CallView might be subject
      // to change anyway - I might take an axe to this file in order to
      // try to get other things working
      const classes = classnames_default()({
        mx_CallView_content: true,
        mx_CallView_voice: true
      });

      // Saying "Connecting" here isn't really true, but the best thing
      // I can come up with, but this might be subject to change as well
      contentView = /*#__PURE__*/react.createElement("div", {
        className: classes,
        onMouseMove: this.onMouseMove
      }, sidebar, /*#__PURE__*/react.createElement("div", {
        className: "mx_CallView_voice_avatarsContainer"
      }, /*#__PURE__*/react.createElement("div", {
        className: "mx_CallView_voice_avatarContainer",
        style: {
          width: avatarSize,
          height: avatarSize
        }
      }, /*#__PURE__*/react.createElement(RoomAvatar/* default */.Z, {
        room: callRoom,
        size: avatarSize
      }))), /*#__PURE__*/react.createElement("div", {
        className: "mx_CallView_holdTransferContent"
      }, (0,languageHandler._t)("Connecting")), this.renderCallControls());
    } else {
      const containerClasses = classnames_default()({
        mx_CallView_content: true,
        mx_CallView_video: true
      });
      let toast;
      if (someoneIsScreensharing) {
        const presentingClasses = classnames_default()({
          mx_CallView_presenting: true,
          mx_CallView_presenting_hidden: !this.state.controlsVisible
        });
        const sharerName = this.state.primaryFeed.getMember().name;
        let text = isScreensharing ? (0,languageHandler._t)("You are presenting") : (0,languageHandler._t)('%(sharerName)s is presenting', {
          sharerName
        });
        if (!this.state.sidebarShown && isVideoCall) {
          text += " • " + (this.props.call.isLocalVideoMuted() ? (0,languageHandler._t)("Your camera is turned off") : (0,languageHandler._t)("Your camera is still enabled"));
        }
        toast = /*#__PURE__*/react.createElement("div", {
          className: presentingClasses
        }, text);
      }
      contentView = /*#__PURE__*/react.createElement("div", {
        className: containerClasses,
        ref: this.contentRef,
        onMouseMove: this.onMouseMove
      }, toast, sidebar, /*#__PURE__*/react.createElement(VideoFeed, {
        feed: this.state.primaryFeed,
        call: this.props.call,
        pipMode: this.props.pipMode,
        onResize: this.props.onResize,
        primary: true
      }), this.renderCallControls());
    }
    const myClassName = this.props.pipMode ? 'mx_CallView_pip' : 'mx_CallView_large';
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_CallView " + myClassName
    }, /*#__PURE__*/react.createElement(CallView_CallViewHeader, {
      onPipMouseDown: this.props.onMouseDownOnHeader,
      pipMode: this.props.pipMode,
      type: this.props.call.type,
      callRooms: [callRoom, secCallRoom]
    }), contentView);
  }
}

/***/ }),

/***/ 758826:
/***/ ((module) => {

module.exports = "img/camera.2f271b6.svg";

/***/ }),

/***/ 184170:
/***/ ((module) => {

module.exports = "img/cancel-small.495f44c.svg";

/***/ }),

/***/ 59258:
/***/ ((module) => {

module.exports = "img/element-icons/room/unable_apply_friend_place.5c4b747.svg";

/***/ }),

/***/ 594864:
/***/ ((module) => {

module.exports = "img/empty-result.2607141.png";

/***/ }),

/***/ 837069:
/***/ ((module) => {

module.exports = "img/home-page/home_page_banner.23b1342.png";

/***/ }),

/***/ 100151:
/***/ ((module) => {

module.exports = "img/icons-create-room.817ede2.svg";

/***/ }),

/***/ 291782:
/***/ ((module) => {

module.exports = "img/icons-groups.29180b0.svg";

/***/ }),

/***/ 960375:
/***/ ((module) => {

module.exports = "img/icons-room-add.bd36e26.svg";

/***/ }),

/***/ 957827:
/***/ ((module) => {

module.exports = "img/user_summary_card_bg.814f979.png";

/***/ })

}]);
//# sourceMappingURL=7102.js.map