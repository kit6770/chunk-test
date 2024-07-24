(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[1597],{

/***/ 631597:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ structures_LeftPanelContainer)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/menus/config.tsx
var config = __webpack_require__(244163);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(166644);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(992619);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(294184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/dispatcher.ts
var dispatcher = __webpack_require__(245539);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/MatrixClientPeg.ts + 3 modules
var MatrixClientPeg = __webpack_require__(933393);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/v2/hooks/useHasUnReadNotification.tsx


const useHasUnReadNotification = () => {
  const [hasUnreadState, setHasUnreadStateState] = (0,react.useState)(false);
  const fetchState = (0,react.useCallback)(async () => {
    try {
      var _state$unread;
      const state = await MatrixClientPeg/* MatrixClientPeg */.p.get().getHasUnreadNotificationState();
      // if(st)
      setHasUnreadStateState((_state$unread = state === null || state === void 0 ? void 0 : state.unread) !== null && _state$unread !== void 0 ? _state$unread : false);
    } catch {
      setHasUnreadStateState(false);
    }
  }, []);
  const markItRead = (0,react.useCallback)(() => {
    setHasUnreadStateState(false);
  }, []);
  (0,react.useEffect)(() => {
    fetchState();
  }, []);
  return (0,react.useMemo)(() => ({
    hasUnreadMessage: hasUnreadState,
    markItRead
  }), [hasUnreadState, fetchState]);
};
/* harmony default export */ const hooks_useHasUnReadNotification = (useHasUnReadNotification);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/SdkConfig.ts
var SdkConfig = __webpack_require__(374312);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/ContactStore.ts + 1 modules
var ContactStore = __webpack_require__(476979);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/notifications/SubMenuState.ts
var SubMenuState = __webpack_require__(487406);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/notifications/RoomNotificationStateStore.ts + 3 modules
var RoomNotificationStateStore = __webpack_require__(16033);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/room-list/invitationStore.ts
var invitationStore = __webpack_require__(206749);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/menus/AbilitySubMenu.tsx


const _excluded = ["className", "menuType", "subMenuType", "onSubMenuChange"];











// dispatch
// leftPanelStore
const AbilitySubMenu = _ref => {
  let {
      className,
      menuType,
      subMenuType,
      onSubMenuChange
    } = _ref,
    rest = (0,objectWithoutProperties/* default */.Z)(_ref, _excluded);
  let menuItems = config/* AbilitySubMenuMap */.ie[menuType];
  const {
    hasUnreadMessage,
    markItRead
  } = hooks_useHasUnReadNotification();
  const UNABLE_FUN_PERMISSION = SdkConfig/* default */.Z.get("UNABLE_FUN_PERMISSION");
  const hasFriendRequest = ContactStore["default"].instance.useContactStore(state => state.newFriendRequest);
  const newGroupInvitations = RoomNotificationStateStore/* RoomNotificationStateStore */.v.instance.useRoomInvitationNoticeState(state => state.newGroupInvitation);
  const newSquadInvitations = RoomNotificationStateStore/* RoomNotificationStateStore */.v.instance.useRoomInvitationNoticeState(state => state.newSquadInvitation);
  const groupInvitations = (0,invitationStore/* useInvitationStore */.F)(state => state.groups);
  // const workInvitations = useInvitationStore((state) => state.works);
  const squadInvitations = (0,invitationStore/* useInvitationStore */.F)(state => state.squad);
  if (!UNABLE_FUN_PERMISSION && menuType === config/* AbilityMenuType */.fL.Inbox) {
    menuItems = menuItems.filter(item => item.id !== config/* SubMenuType */.MN.Notification);
  }
  if (squadInvitations.length > 0 && menuType === config/* AbilityMenuType */.fL.Contact) {
    const squadMenu = config/* dynamicContactMenu */.uF.find(i => i.id === config/* SubMenuType */.MN.SquadInvitation);
    menuItems = [...menuItems, squadMenu];
  }
  if (groupInvitations.length > 0 && menuType === config/* AbilityMenuType */.fL.Contact) {
    const groupMenu = config/* dynamicContactMenu */.uF.find(i => i.id === config/* SubMenuType */.MN.GroupInvitation);
    menuItems = [...menuItems, groupMenu];
  }
  const handleClick = (action, id) => () => {
    dispatcher/* default */.ZP.dispatch({
      action,
      subMenuType: id
    });
    (0,SubMenuState/* updateMenuState */.I)({
      menu: action,
      subMenu: id
    });
    onSubMenuChange(id);
    if (id === config/* SubMenuType */.MN.Notification) {
      markItRead();
    }
  };
  const renderCount = item => {
    const {
      id
    } = item;
    let count = 0;
    if (id === config/* SubMenuType */.MN.FriendsRequest && hasFriendRequest > 0) {
      count = hasFriendRequest;
    } else if (id === config/* SubMenuType */.MN.GroupInvitation && newGroupInvitations > 0) {
      count = newGroupInvitations;
    } else if (id === config/* SubMenuType */.MN.SquadInvitation && newSquadInvitations > 0) {
      count = newSquadInvitations;
    }
    const classes = classnames_default()({
      'mx_NotificationBadge': true,
      'mx_NotificationBadge_visible': true,
      'mx_NotificationBadge_highlighted': true,
      //notification.hasMentions,
      'mx_NotificationBadge_2char': count > 0 && count <= 99,
      'mx_NotificationBadge_3char': count > 99
    });
    if (count > 0) {
      return /*#__PURE__*/react.createElement("div", {
        className: classes
      }, /*#__PURE__*/react.createElement("span", {
        className: "mx_NotificationBadge_count"
      }, count));
    }
    return null;
  };
  return /*#__PURE__*/react.createElement("div", {
    className: classnames_default()(className)
  }, /*#__PURE__*/react.createElement("h3", {
    className: "v2_mx_LeftPanel_submenu_title"
  }, (0,languageHandler._t)(config/* subMenuName */.q5[menuType])), /*#__PURE__*/react.createElement("ul", (0,esm_extends/* default */.Z)({
    className: "v2_mx_LeftPanel_submenu_list"
  }, rest), menuItems.map(menuItem => {
    const {
      icon,
      label,
      action,
      id
    } = menuItem;
    return /*#__PURE__*/react.createElement("li", {
      key: id,
      className: classnames_default()({
        "v2_mx_LeftPanel_submenu_list_item": true,
        "has-unread-msg": hasUnreadMessage && id === config/* SubMenuType */.MN.Notification,
        "active": subMenuType === id
      }),
      onClick: handleClick(action, id)
    }, /*#__PURE__*/react.createElement("div", {
      className: "v2_mx_LeftPanel_submenu_list_item_left"
    }, /*#__PURE__*/react.createElement("span", {
      className: "v2_mx_LeftPanel_submenu_list_icon"
    }, icon), (0,languageHandler._t)(label)), /*#__PURE__*/react.createElement("div", {
      className: "v2_mx_LeftPanel_submenu_list_item_right"
    }, renderCount(menuItem)));
  })));
};
/* harmony default export */ const menus_AbilitySubMenu = (AbilitySubMenu);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(225259);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/accessibility/RovingTabIndex.tsx + 3 modules
var RovingTabIndex = __webpack_require__(34625);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AccessibleButton.tsx
var AccessibleButton = __webpack_require__(805035);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/customisations/Media.ts + 1 modules
var Media = __webpack_require__(834208);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/token.ts
var token = __webpack_require__(732094);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/firebase_analytics.ts + 3 modules
var firebase_analytics = __webpack_require__(937139);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/context_menus/IconizedContextMenu.tsx
var IconizedContextMenu = __webpack_require__(882385);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/ContextMenu.tsx + 6 modules
var ContextMenu = __webpack_require__(760172);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ForwardDialog.tsx
var ForwardDialog = __webpack_require__(606510);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/permalinks/Permalinks.ts
var Permalinks = __webpack_require__(954105);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/actions.ts
var actions = __webpack_require__(473627);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/commonPointParams.ts
var commonPointParams = __webpack_require__(970698);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/LeftPanelStore.ts
var LeftPanelStore = __webpack_require__(290884);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/right_panel/UserInfo.tsx + 4 modules
var UserInfo = __webpack_require__(931363);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Modal.tsx + 1 modules
var Modal = __webpack_require__(241648);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ConfirmDeleteFriendDialog.tsx
var ConfirmDeleteFriendDialog = __webpack_require__(529015);
// EXTERNAL MODULE: ./node_modules/@sdm/react/dist/index.js
var dist = __webpack_require__(654384);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/room/avatar.ts
var avatar = __webpack_require__(720808);
// EXTERNAL MODULE: ./node_modules/sendingme-ui/dist/index.js
var sendingme_ui_dist = __webpack_require__(602271);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/ContactTile.tsx


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }









// import PresenceLabel from "./PresenceLabel";















let MenuKey = /*#__PURE__*/function (MenuKey) {
  MenuKey["DELETE_FAVORITE"] = "delete_favorite";
  return MenuKey;
}({});
const getImageUrls = mxImageUrl => {
  let oobAvatar;
  if (mxImageUrl) {
    oobAvatar = (0,Media/* mediaFromMxc */.TS)(mxImageUrl).getThumbnailOfSourceHttp(44, 44, "crop");
  }
  return [oobAvatar // highest priority
  ].filter(function (url) {
    return url !== null && url !== "";
  });
};
const contextMenuBelow = elementRect => {
  // align the context menu's icons with the icon which opened the context menu
  const left = elementRect.left + window.pageXOffset - 9;
  const top = elementRect.bottom + window.pageYOffset + 17;
  const chevronFace = ContextMenu/* ChevronFace */.N7.None;
  return {
    left,
    top,
    chevronFace
  };
};
const ContactTile = props => {
  const {
    contact,
    isMinimized,
    user
  } = props;
  const urls = getImageUrls(contact.avatarUrl);
  const contactTileRef = (0,react.useRef)();
  const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
  if (!user) return null;
  const [displayName, setDisplayName] = (0,react.useState)(user.displayName !== user.userId && user.displayName ? user.displayName : contact.displayName);
  const [generalMenuPosition, setGeneralMenuPosition] = (0,react.useState)(null);
  const [ignored, setIgnored] = (0,react.useState)(client.getIgnoredUsers().includes(props.contact.userId));
  const selected = (0,react.useMemo)(() => {
    var _props$contact, _props$selected;
    return (props === null || props === void 0 ? void 0 : (_props$contact = props.contact) === null || _props$contact === void 0 ? void 0 : _props$contact.userId) === (props === null || props === void 0 ? void 0 : (_props$selected = props.selected) === null || _props$selected === void 0 ? void 0 : _props$selected.userId);
  }, [props.contact, props.selected]);
  const contactAvatar = (0,react.useMemo)(() => {
    return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdAvatar, {
      name: displayName,
      id: user === null || user === void 0 ? void 0 : user.userId,
      src: (0,avatar/* transferAvatar2minimization */.g)(contact.avatarUrl)
      // size="large"
      ,
      size: 44
    }));
  }, [displayName, urls, user.userId, user.presence]);
  const buttonProps = {};
  const Button = AccessibleButton/* default */.Z;
  // if (isMinimized) {
  //     Button = AccessibleTooltipButton;
  //     buttonProps.title = displayName;
  //     // force the tooltip to hide whilst we are showing the context menu
  //     buttonProps.forceHide = !!generalMenuPosition;
  // }

  const onContextMenu = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    setIgnored(client.getIgnoredUsers().includes(props.contact.userId));
    setGeneralMenuPosition({
      left: ev.clientX,
      bottom: ev.clientY
    });
  };
  const classes = classnames_default()({
    mx_ContactTile: true,
    mx_ContactTile_selected: selected,
    mx_ContactTile_hasMenuOpen: generalMenuPosition
    // mx_ContactTile_minimized: isMinimized,
  });

  const nameClasses = classnames_default()({
    mx_ContactTile_name: true,
    mx_ContactTile_nameWithPreview: !!user.presence
    // "mx_ContactTile_nameHasUnreadEvents": this.notificationState.isUnread,
  });

  let innerName = displayName;
  if (user.ens) {
    innerName = /*#__PURE__*/react.createElement(dist.Text, null, displayName);
  }
  const nameContainer = /*#__PURE__*/react.createElement("div", {
    className: "mx_ContactTile_nameContainer"
  }, /*#__PURE__*/react.createElement("div", {
    title: displayName,
    className: nameClasses,
    tabIndex: -1,
    dir: "auto"
  }, user.ens && user.rawDisplayName === displayName ? /*#__PURE__*/react.createElement("img", {
    className: "mx_Profile_userName_ens",
    src: __webpack_require__(107467),
    height: "12",
    width: "12",
    alt: ""
  }) : null, innerName), /*#__PURE__*/react.createElement("div", {
    className: "mx_ContactTile_walletAddress"
  }, (0,token/* formatWallet */.Tl)(props.contact.walletAddress)));
  // if (props.isMinimized) nameContainer = null;

  const onTileClick = async ev => {
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.target.matches(".mx_ContactTile")) {
      onContextMenu(ev);
    } else {
      ContactStore["default"].instance.emit(ContactStore/* SELECT_FAVORITE_EVENT */.IL, props.contact);
      const dmRooms = client.getDmRoomByUserId(props.contact.userId);
      // const { dm_rooms: dmRooms } = await client.findDMRoomByUserId(
      //     props.contact.userId
      // );
      const lastRoom = dmRooms[dmRooms.length - 1];
      if (lastRoom) {
        dispatcher/* default */.ZP.dispatch({
          action: "view_room",
          room_id: lastRoom.roomId,
          should_peek: false,
          joining: false
        });
        LeftPanelStore/* default */.ZP.instance.updateSelected(LeftPanelStore/* HOME_TAB */.e9, true);
        dispatcher/* default */.ZP.dispatch({
          action: actions/* Action */.a.ShowRoomPanel
        });
      } else {
        (0,UserInfo/* openDMForUser */.Oz)({
          userId: props.contact.userId
        });
      }
    }
  };
  (0,react.useEffect)(() => {
    const handleDisplayName = () => {
      setDisplayName(user.displayName);
    };
    user.addListener("User.displayName", handleDisplayName);
    return () => {
      user.removeListener("User.displayName", handleDisplayName);
    };
  }, [user]);
  const getTargetId = () => {
    return props.contact.userId;
  };
  const onIgnoreToggle = () => {
    const ignoredUsers = client.getIgnoredUsers();
    const userId = props.contact.userId;
    const index = ignoredUsers.indexOf(userId);
    if (index !== -1) {
      ignoredUsers.splice(index, 1);
      setIgnored(false);
    } else {
      ignoredUsers.push(userId);
      setIgnored(true);
    }
    client.setIgnoredUsers(ignoredUsers);
  };
  const removeItem = async ev => {
    // done firebase : contact_cancel
    (0,firebase_analytics/* logEvent */.K)(firebase_analytics/* analytics */.c, "contact_cancel", _objectSpread(_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()), {}, {
      contact_cancel_user_Id: contact.userId,
      is_room: false
    }));
    ev.preventDefault();
    ev.stopPropagation();
    try {
      if (props.isFriend) {
        Modal/* default */.Z.createTrackedDialog("", "", ConfirmDeleteFriendDialog/* default */.Z, {
          userId: contact.userId,
          walletAddress: contact.walletAddress,
          name: contact.displayName
        });
      } else {
        ContactStore["default"].instance.removeFavourite(contact.userId, true);
      }
      // done firebase : contact_cancel_success
      (0,firebase_analytics/* logEvent */.K)(firebase_analytics/* analytics */.c, "contact_cancel_success", _objectSpread(_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()), {}, {
        contact_cancel_user_Id: contact.userId,
        is_room: false
      }));
    } catch (err) {
      // done firebase : contact_cancel_failed
      (0,firebase_analytics/* logEvent */.K)(firebase_analytics/* analytics */.c, "contact_cancel_failed", _objectSpread(_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()), {}, {
        contact_cancel_user_Id: contact.userId,
        is_room: false,
        error_code: err.httpStatus || err.errcode || 0,
        error_reason: err.name || err.message || err.stack
      }));
    }
    setGeneralMenuPosition(null);
  };
  const onShareUserLink = event => {
    event.stopPropagation();
    setGeneralMenuPosition(null);
    (0,ForwardDialog/* showForwardDialogWithContent */.H2)({
      msgtype: "user",
      body: (0,Permalinks/* shareUserPermalink */.G3)(props.contact.userId)
    }, "share");
  };
  const renderGeneralMenu = () => {
    if (!generalMenuPosition) return null;
    return /*#__PURE__*/react.createElement(IconizedContextMenu/* default */.ZP, (0,esm_extends/* default */.Z)({}, contextMenuBelow(generalMenuPosition), {
      onFinished: () => setGeneralMenuPosition(null),
      className: "mx_RoomTile_contextMenu",
      compact: true
    }), /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuOptionList */.I2, null, /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuOption */.$k, null, /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuItem */.XH, {
      onClick: event => onShareUserLink(event),
      label: (0,languageHandler._t)("Share Friend")
    })), /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuOption */.$k, null, /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuItem */.XH, {
      onClick: onIgnoreToggle,
      label: (0,languageHandler._t)(ignored ? "Unblock" : "Block")
    })), /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuOption */.$k, {
      topDivider: true
    }, /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuItem */.XH, {
      onClick: removeItem,
      label: (0,languageHandler._t)("Delete Friend")
    }))));
  };
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(RovingTabIndex/* RovingTabIndexWrapper */.S9, {
    inputRef: contactTileRef
  }, ({
    onFocus,
    isActive,
    ref
  }) => /*#__PURE__*/react.createElement(Button, (0,esm_extends/* default */.Z)({}, buttonProps, {
    onFocus: onFocus,
    tabIndex: isActive ? 0 : -1,
    inputRef: ref,
    className: classes,
    onClick: onTileClick,
    role: "treeitem"
    // aria-label={ariaLabel}
    ,
    "aria-selected": selected
  }), contactAvatar, nameContainer, renderGeneralMenu())));
};
const Badge = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: classNames("mx_ContactTile_avatar mx_Badge", props.className, props.presenceState)
  });
};
/* harmony default export */ const rooms_ContactTile = (ContactTile);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/AutoHideScrollbar.tsx
var AutoHideScrollbar = __webpack_require__(651070);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/browser-index.js
var browser_index = __webpack_require__(407637);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/lib/util.ts
var util = __webpack_require__(25654);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/ContactList.tsx







const ContactList = props => {
  const {
    contacts
  } = props;
  const ref = (0,react.useRef)(null);
  // const [listHeight, setListHeight] = useState<number | string>("auto");
  const [sortList, setSortList] = (0,react.useState)({});
  // sort
  const _sortFriend = list => {
    let map = {};
    var c = 'A'.charCodeAt(0);
    for (; c <= 'Z'.charCodeAt(0); c++) {
      map[String.fromCharCode(c)] = [];
    }
    map['#'] = [];
    var firstCharUpper;
    list.forEach(function (item) {
      let displayName = item.user.displayName && item.user.displayName !== item.user.userId ? item.user.displayName : item.contact.displayName;
      // let displayName = item.contact.displayName && item.contact.displayName !== item.contact.userId ? item.contact.displayName : item.user.displayName
      if (displayName) {
        firstCharUpper = (0,util/* getFirstUpperChar */.jG)(displayName);
        if (map.hasOwnProperty(firstCharUpper)) {
          map[firstCharUpper].push(item);
        } else {
          map['#'].push(item);
        }
      } else {
        map['#'].push(item);
      }
    });
    for (let a in map) {
      if (!map[a].length) {
        delete map[a];
      }
    }
    return map;
  };
  (0,react.useMemo)(async () => {
    const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
    let contactList = [];
    for (let contact of contacts) {
      let user = cli.getUser(contact.userId);
      user = user ? user : new browser_index/* User */.n5(contact.userId);
      let newContact = {
        contact: contact,
        user: user
      };
      contactList.push(newContact);
    }
    const sortList = _sortFriend(contactList);
    setSortList(sortList);
  }, [contacts]);
  const tiles = (0,react.useMemo)(() => {
    const elementList = [];
    for (var key in sortList) {
      const rank = sortList[key];
      elementList.push( /*#__PURE__*/react.createElement("div", {
        className: "rank_title"
      }, key));
      for (var i = 0; i < rank.length; i++) {
        var _rank$i$user;
        elementList.push( /*#__PURE__*/react.createElement(rooms_ContactTile, {
          selected: props.selected,
          key: rank[i].contact.userId + ((_rank$i$user = rank[i].user) === null || _rank$i$user === void 0 ? void 0 : _rank$i$user.userId),
          contact: rank[i].contact,
          user: rank[i].user,
          isFriend: props.isFriend
        }));
      }
    }
    return elementList;
  }, [sortList, props.selected]);

  // useEffect(() => {
  //     const { top } = ref.current?.getBoundingClientRect();
  //     setListHeight(UIStore.instance.windowHeight - top);
  // }, [ref]);

  let content = null;
  if (contacts && contacts.length > 0) {
    content = tiles;
  }
  return /*#__PURE__*/react.createElement("div", {
    ref: ref
    // style={{ height: listHeight }}
    ,
    className: classnames_default()("mx_ContactList", {
      "mx_ContactList_empty": (contacts === null || contacts === void 0 ? void 0 : contacts.length) === 0
    })
  }, /*#__PURE__*/react.createElement(AutoHideScrollbar/* default */.Z, {
    style: {
      height: "100%"
    }
  }, content));
};
/* harmony default export */ const rooms_ContactList = (ContactList);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AccessibleTooltipButton.tsx
var AccessibleTooltipButton = __webpack_require__(717919);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/RoomName.tsx
var RoomName = __webpack_require__(75865);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/avatars/RoomAvatar.tsx
var RoomAvatar = __webpack_require__(139319);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/FavoriteRoomTile.tsx












let FavoriteRoomTile_MenuKey = /*#__PURE__*/function (MenuKey) {
  MenuKey["DELETE_FAVORITE"] = "delete_favorite";
  return MenuKey;
}({});
const FavoriteRoomTile_getImageUrls = mxImageUrl => {
  let oobAvatar;
  if (mxImageUrl) {
    oobAvatar = mediaFromMxc(mxImageUrl).getThumbnailOfSourceHttp(44, 44, "crop");
  }
  return [oobAvatar // highest priority
  ].filter(function (url) {
    return url !== null && url !== "";
  });
};
const FavoriteRoomTile = props => {
  const {
    room,
    isMinimized
  } = props;
  // const urls = getImageUrls(room.getMxcAvatarUrl());
  const FavoriteRoomTileRef = (0,react.useRef)();
  const selected = (0,react.useMemo)(() => {
    return props.room === props.selected;
  }, [props.room, props.selected]);
  const contactAvatar = (0,react.useMemo)(() => {
    return (
      /*#__PURE__*/
      // <BaseAvatar
      //     className="mx_FavoriteRoomTile_avatar"
      //     width={44}
      //     height={44}
      //     name={room.name}
      //     urls={urls}
      // />
      react.createElement(RoomAvatar/* default */.Z, {
        className: "mx_FavoriteRoomTile_avatar",
        room: room,
        size: "large"
      })
    );
  }, [room.name]);
  const buttonProps = {};
  let Button = AccessibleButton/* default */.Z;
  if (isMinimized) {
    Button = AccessibleTooltipButton/* default */.Z;
    buttonProps.title = room.name;
    // force the tooltip to hide whilst we are showing the context menu
    // buttonProps.forceHide = !!state.generalMenuPosition;
  }

  const classes = classnames_default()({
    mx_FavoriteRoomTile: true,
    mx_FavoriteRoomTile_selected: selected,
    // mx_FavoriteRoomTile_hasMenuOpen: !!state.generalMenuPosition,
    mx_FavoriteRoomTile_minimized: isMinimized
  });
  const nameClasses = classnames_default()({
    mx_FavoriteRoomTile_name: true
    // mx_FavoriteRoomTile_nameWithPreview: !!user.presence,
    // "mx_FavoriteRoomTile_nameHasUnreadEvents": this.notificationState.isUnread,
  });

  let nameContainer = /*#__PURE__*/react.createElement("div", {
    className: "mx_FavoriteRoomTile_nameContainer"
  }, /*#__PURE__*/react.createElement("div", {
    title: room.name,
    className: nameClasses,
    tabIndex: -1,
    dir: "auto"
  }, /*#__PURE__*/react.createElement(RoomName/* default */.Z, {
    room: room
  })));
  if (props.isMinimized) nameContainer = null;
  const onTileClick = async ev => {
    ev.preventDefault();
    ev.stopPropagation();
    ContactStore["default"].instance.emit(ContactStore/* SELECT_FAVORITE_EVENT */.IL, props.room);
    if (room) {
      dispatcher/* default */.ZP.dispatch({
        action: 'view_room',
        room_id: room.roomId,
        should_peek: false,
        joining: false
      });
    }
  };
  const iconButton = (0,react.useMemo)(() => {
    const handleMenuClick = async ev => {
      ev.preventDefault();
      ev.stopPropagation();
      ContactStore["default"].instance.removeFavourite(room.roomId, false);
    };
    return /*#__PURE__*/react.createElement(AccessibleTooltipButton/* default */.Z, {
      className: "mx_FavoriteRoomTile_removeButton",
      key: room.roomId,
      title: (0,languageHandler._t)("Remove"),
      onClick: handleMenuClick
    });
  }, [room.roomId]);
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(RovingTabIndex/* RovingTabIndexWrapper */.S9, {
    inputRef: FavoriteRoomTileRef
  }, ({
    onFocus,
    isActive,
    ref
  }) => /*#__PURE__*/react.createElement(Button, (0,esm_extends/* default */.Z)({}, buttonProps, {
    onFocus: onFocus,
    tabIndex: isActive ? 0 : -1,
    inputRef: ref,
    className: classes,
    onClick: onTileClick
    // onContextMenu={this.onContextMenu}
    ,
    role: "treeitem"
    // aria-label={ariaLabel}
    ,
    "aria-selected": selected
  }), contactAvatar, nameContainer, iconButton)));
};
/* harmony default export */ const rooms_FavoriteRoomTile = (FavoriteRoomTile);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/FavoriteRoomtList.tsx



const FavoriteRoomList = props => {
  const rooms = (props.rooms || []).filter(Boolean);
  let content = null;
  if (rooms && rooms.length > 0) {
    content = rooms.map(room => {
      return /*#__PURE__*/react.createElement(rooms_FavoriteRoomTile, {
        key: room.roomId,
        room: room,
        selected: props.selected,
        isMinimized: false
      });
    });
  }
  return /*#__PURE__*/react.createElement("div", {
    className: classnames_default()("mx_FavoriteRoomList")
  }, content);
};
/* harmony default export */ const FavoriteRoomtList = (FavoriteRoomList);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/FavoriteList.tsx








class FavoriteList extends react.PureComponent {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "componentDidMount", () => {
      ContactStore["default"].instance.on(ContactStore/* CONTACT_UPDATE_EVENT */.RX, this.onFresh);
      ContactStore["default"].instance.on(ContactStore/* FRIEND_UPDATE_EVENT */.rG, this.onFreshFriend);
      ContactStore["default"].instance.on(ContactStore/* SELECT_FAVORITE_EVENT */.IL, this.onSelected);
      this.onFresh();
    });
    (0,defineProperty/* default */.Z)(this, "componentWillUnmount", () => {
      ContactStore["default"].instance.off(ContactStore/* CONTACT_UPDATE_EVENT */.RX, this.onFresh);
      ContactStore["default"].instance.off(ContactStore/* FRIEND_UPDATE_EVENT */.rG, this.onFreshFriend);
      ContactStore["default"].instance.off(ContactStore/* SELECT_FAVORITE_EVENT */.IL, this.onSelected);
    });
    (0,defineProperty/* default */.Z)(this, "onSelectSpace", () => {
      if (localStorage && !location.hash.startsWith("#/recommendation")) {
        const roomId = localStorage.getItem("mx_space_context_Contacts");
        const room = MatrixClientPeg/* MatrixClientPeg */.p.get().getRoom(roomId);
        let selected = this.state.rooms.find(r => (r === null || r === void 0 ? void 0 : r.roomId) === roomId);
        if (room && room.isDmRoom()) {
          const userId = room.getDMAnotherMember();
          selected = this.state.contacts.find(c => c.userId === userId);
        }
        this.setState({
          selected
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onSelected", item => {
      ContactStore["default"].instance.selected = item;
      this.setState({
        selected: item
      });
    });
    (0,defineProperty/* default */.Z)(this, "onFresh", () => {
      const {
        contacts,
        rooms,
        selected,
        friends
      } = ContactStore["default"].instance;
      this.setState({
        contacts,
        rooms,
        selected,
        friends
      }, () => {
        this.onSelectSpace();
      });
    });
    (0,defineProperty/* default */.Z)(this, "onFreshFriend", () => {
      const {
        friends
      } = ContactStore["default"].instance;
      this.setState({
        friends: [...friends]
      });
    });
    (0,defineProperty/* default */.Z)(this, "render", () => {
      const roomsExpandedClasses = classnames_default()({
        mx_list_collapseBtn: true,
        mx_list_collapseBtn_collapsed: !this.state.isRoomsExpanded
      });
      const contactsExpandedClass = classnames_default()({
        mx_list_collapseBtn: true,
        mx_list_collapseBtn_collapsed: !this.state.isContactsExpanded
      });
      const {
        friends
      } = this.state;
      // if (this.state.contacts.length === 0 && this.state.rooms.length === 0) {
      //     return <div className="mx_ContactTile_skeletonUI" />;
      // }
      return /*#__PURE__*/react.createElement("div", {
        className: classnames_default()("mx_FavoriteList")
      }, friends.length > 0 && /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
        className: "mx_ContactList_stickable",
        onClick: () => {
          this.setState({
            isFriendsExpanded: !this.state.isFriendsExpanded
          });
        }
      }, /*#__PURE__*/react.createElement("span", {
        className: contactsExpandedClass
      }), /*#__PURE__*/react.createElement("span", null, (0,languageHandler._t)("Friends"))), /*#__PURE__*/react.createElement(rooms_ContactList, {
        selected: this.state.selected,
        contacts: this.state.isFriendsExpanded ? friends : [],
        isFriend: true
      })), this.state.rooms.length > 0 && /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
        className: "mx_RoomList_stickable",
        onClick: () => {
          this.setState({
            isRoomsExpanded: !this.state.isRoomsExpanded
          });
        }
      }, /*#__PURE__*/react.createElement("span", {
        className: roomsExpandedClasses
      }), /*#__PURE__*/react.createElement("span", null, (0,languageHandler._t)("Rooms"))), /*#__PURE__*/react.createElement(FavoriteRoomtList, {
        rooms: this.state.isRoomsExpanded ? this.state.rooms : [],
        selected: this.state.selected
      })));
    });
    const {
      friends: _friends,
      rooms: _rooms
    } = ContactStore["default"].instance;
    this.state = {
      contacts: [],
      rooms: _rooms,
      friends: _friends,
      isRoomsExpanded: true,
      isContactsExpanded: true,
      isFriendsExpanded: true
    };
    if (_friends.length === 0) {
      ContactStore["default"].instance.fetchFriendsList();
    }
    if (_rooms.length === 0) {
      ContactStore["default"].instance.fetchFavouriteList();
    }
  }
}
/* harmony default export */ const rooms_FavoriteList = (FavoriteList);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/LeftPanel.tsx + 5 modules
var LeftPanel = __webpack_require__(581915);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/SpaceStore.tsx + 2 modules
var SpaceStore = __webpack_require__(387579);
// EXTERNAL MODULE: ./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.cjs.js
var react_beautiful_dnd_cjs = __webpack_require__(323605);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/models/room.ts + 1 modules
var room = __webpack_require__(335435);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/stores/SpaceTreeLevelLayoutStore.ts

var _class;
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

const getSpaceCollapsedKey = (roomId, parents) => {
  const separator = "/";
  let path = "";
  if (parents) {
    for (const entry of parents.entries()) {
      path += entry + separator;
    }
  }
  return `mx_space_collapsed_${path + roomId}`;
};
class SpaceTreeLevelLayoutStore {
  static get instance() {
    if (!SpaceTreeLevelLayoutStore.internalInstance) {
      SpaceTreeLevelLayoutStore.internalInstance = new SpaceTreeLevelLayoutStore();
    }
    return SpaceTreeLevelLayoutStore.internalInstance;
  }
  setSpaceCollapsedState(roomId, parents, collapsed) {
    // XXX: localStorage doesn't allow booleans
    localStorage.setItem(getSpaceCollapsedKey(roomId, parents), collapsed.toString());
  }
  getSpaceCollapsedState(roomId, parents, fallback) {
    const collapsedLocalStorage = localStorage.getItem(getSpaceCollapsedKey(roomId, parents));
    // XXX: localStorage doesn't allow booleans
    return collapsedLocalStorage ? collapsedLocalStorage === "true" : fallback;
  }
}
_class = SpaceTreeLevelLayoutStore;
(0,defineProperty/* default */.Z)(SpaceTreeLevelLayoutStore, "internalInstance", void 0);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/NotificationBadge.tsx
var NotificationBadge = __webpack_require__(565839);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/accessibility/context_menu/ContextMenuTooltipButton.tsx
var ContextMenuTooltipButton = __webpack_require__(487827);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/contexts/MatrixClientContext.ts
var MatrixClientContext = __webpack_require__(311878);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/notifications/StaticNotificationState.ts
var StaticNotificationState = __webpack_require__(112544);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/notifications/NotificationColor.ts
var NotificationColor = __webpack_require__(634857);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/KeyBindingsManager.ts + 1 modules
var KeyBindingsManager = __webpack_require__(481493);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/context_menus/SpaceContextMenu.tsx
var SpaceContextMenu = __webpack_require__(100485);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/spaces/SpaceTreeLevel.tsx



const SpaceTreeLevel_excluded = ["space", "className", "selected", "onClick", "label", "contextMenuTooltip", "notificationState", "avatarSize", "isNarrow", "children", "ContextMenuComponent"],
  _excluded2 = ["space", "activeSpaces", "isNested", "isPanelCollapsed", "onExpand", "parents", "innerRef", "dragHandleProps"],
  _excluded3 = ["tabIndex"];
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




















const SpaceButton = _ref => {
  let {
      space,
      className,
      selected,
      onClick,
      label,
      contextMenuTooltip,
      notificationState,
      avatarSize,
      isNarrow,
      children,
      ContextMenuComponent
    } = _ref,
    props = (0,objectWithoutProperties/* default */.Z)(_ref, SpaceTreeLevel_excluded);
  const [menuDisplayed, ref, openMenu, closeMenu] = (0,ContextMenu/* useContextMenu */.av)();
  const [onFocus, isActive, handle] = (0,RovingTabIndex/* useRovingTabIndex */.XZ)(ref);
  const tabIndex = isActive ? 0 : -1;
  let avatar = /*#__PURE__*/react.createElement("div", {
    className: "mx_SpaceButton_avatarPlaceholder"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_SpaceButton_icon"
  }));
  if (space) {
    avatar = /*#__PURE__*/react.createElement(RoomAvatar/* default */.Z, {
      size: avatarSize,
      room: space
    });
  }
  let notifBadge;
  if (notificationState) {
    let ariaLabel = (0,languageHandler._t)("Jump to first unread room.");
    if ((space === null || space === void 0 ? void 0 : space.getMyMembership()) === "invite") {
      ariaLabel = (0,languageHandler._t)("Jump to first invite.");
    }
    notifBadge = /*#__PURE__*/react.createElement("div", {
      className: "mx_SpacePanel_badgeContainer"
    }, /*#__PURE__*/react.createElement(NotificationBadge/* default */.Z, {
      onClick: () => SpaceStore/* default */.ZP.instance.setActiveRoomInSpace(space || null),
      forceCount: false,
      notification: notificationState,
      "aria-label": ariaLabel,
      tabIndex: tabIndex,
      showUnsentTooltip: true
    }));
  }
  let contextMenu;
  if (menuDisplayed && ContextMenuComponent) {
    var _handle$current;
    ContextMenuComponent.displayName = "ContextMenuComponent";
    contextMenu = /*#__PURE__*/react.createElement(ContextMenuComponent, (0,esm_extends/* default */.Z)({}, (0,ContextMenu/* toRightOf */.ip)((_handle$current = handle.current) === null || _handle$current === void 0 ? void 0 : _handle$current.getBoundingClientRect(), 0), {
      space: space,
      onFinished: closeMenu
    }));
  }
  return /*#__PURE__*/react.createElement(sendingme_ui_dist.SdTooltip, {
    title: label,
    placement: "right",
    overlayClassName: "mx_SpaceButton_tooltip",
    overlayStyle: {
      opacity: !isNarrow || menuDisplayed ? 0 : 1
    }
  }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdButton, (0,esm_extends/* default */.Z)({}, props, {
    className: classnames_default()("mx_SpaceButton", className, {
      mx_SpaceButton_active: selected,
      mx_SpaceButton_hasMenuOpen: menuDisplayed,
      mx_SpaceButton_narrow: isNarrow
    }),
    type: "associate",
    onClick: onClick,
    onContextMenu: openMenu,
    ref: handle,
    tabIndex: tabIndex,
    onFocus: onFocus
  }), children, /*#__PURE__*/react.createElement("div", {
    className: "mx_SpaceButton_selectionWrapper"
  }, avatar, !isNarrow && /*#__PURE__*/react.createElement("span", {
    className: "mx_SpaceButton_name"
  }, label), notifBadge, ContextMenuComponent && /*#__PURE__*/react.createElement(ContextMenuTooltipButton/* ContextMenuTooltipButton */.J, {
    className: "mx_SpaceButton_menuButton",
    onClick: openMenu,
    title: contextMenuTooltip,
    isExpanded: menuDisplayed
  }), contextMenu)));
};
class SpaceItem extends react.PureComponent {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "buttonRef", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "onSpaceUpdate", () => {
      this.setState({
        childSpaces: this.childSpaces
      });
    });
    (0,defineProperty/* default */.Z)(this, "toggleCollapse", evt => {
      if (this.props.onExpand && this.isCollapsed) {
        this.props.onExpand();
      }
      const newCollapsedState = !this.isCollapsed;
      SpaceTreeLevelLayoutStore.instance.setSpaceCollapsedState(this.props.space.roomId, this.props.parents, newCollapsedState);
      this.setState({
        collapsed: newCollapsedState
      });
      // don't bubble up so encapsulating button for space
      // doesn't get triggered
      evt.stopPropagation();
    });
    (0,defineProperty/* default */.Z)(this, "onKeyDown", ev => {
      var _this$state$childSpac;
      let handled = true;
      const action = (0,KeyBindingsManager/* getKeyBindingsManager */.zL)().getRoomListAction(ev);
      const hasChildren = (_this$state$childSpac = this.state.childSpaces) === null || _this$state$childSpac === void 0 ? void 0 : _this$state$childSpac.length;
      switch (action) {
        case KeyBindingsManager/* RoomListAction */._4.CollapseSection:
          if (hasChildren && !this.isCollapsed) {
            this.toggleCollapse(ev);
          } else {
            var _this$buttonRef, _this$buttonRef$curre, _this$buttonRef$curre2;
            const parentItem = (_this$buttonRef = this.buttonRef) === null || _this$buttonRef === void 0 ? void 0 : (_this$buttonRef$curre = _this$buttonRef.current) === null || _this$buttonRef$curre === void 0 ? void 0 : (_this$buttonRef$curre2 = _this$buttonRef$curre.parentElement) === null || _this$buttonRef$curre2 === void 0 ? void 0 : _this$buttonRef$curre2.parentElement;
            const parentButton = parentItem === null || parentItem === void 0 ? void 0 : parentItem.previousElementSibling;
            parentButton === null || parentButton === void 0 ? void 0 : parentButton.focus();
          }
          break;
        case KeyBindingsManager/* RoomListAction */._4.ExpandSection:
          if (hasChildren) {
            if (this.isCollapsed) {
              this.toggleCollapse(ev);
            } else {
              var _this$buttonRef2, _this$buttonRef2$curr, _firstSpaceItemChild$;
              const childLevel = (_this$buttonRef2 = this.buttonRef) === null || _this$buttonRef2 === void 0 ? void 0 : (_this$buttonRef2$curr = _this$buttonRef2.current) === null || _this$buttonRef2$curr === void 0 ? void 0 : _this$buttonRef2$curr.nextElementSibling;
              const firstSpaceItemChild = childLevel === null || childLevel === void 0 ? void 0 : childLevel.querySelector(".mx_SpaceItem");
              firstSpaceItemChild === null || firstSpaceItemChild === void 0 ? void 0 : (_firstSpaceItemChild$ = firstSpaceItemChild.querySelector(".mx_SpaceButton")) === null || _firstSpaceItemChild$ === void 0 ? void 0 : _firstSpaceItemChild$.focus();
            }
          }
          break;
        default:
          handled = false;
      }
      if (handled) {
        ev.stopPropagation();
        ev.preventDefault();
      }
    });
    (0,defineProperty/* default */.Z)(this, "onClick", ev => {
      ev.preventDefault();
      ev.stopPropagation();
      const isInvite = this.props.space.getMyMembership() === "invite";
      SpaceStore/* default */.ZP.instance.setActiveSpace(this.props.space);
      if (isInvite) {
        // for h5 adapter
        dispatcher/* default */.ZP.dispatch({
          action: actions/* Action */.a.ShowRoomPanel
        });
      }
    });
    const collapsed = SpaceTreeLevelLayoutStore.instance.getSpaceCollapsedState(props.space.roomId, this.props.parents, !props.isNested // default to collapsed for root items
    );

    this.state = {
      collapsed: collapsed,
      childSpaces: this.childSpaces
    };
    SpaceStore/* default */.ZP.instance.on(this.props.space.roomId, this.onSpaceUpdate);
  }
  componentWillUnmount() {
    SpaceStore/* default */.ZP.instance.off(this.props.space.roomId, this.onSpaceUpdate);
  }
  get childSpaces() {
    return SpaceStore/* default */.ZP.instance.getChildSpaces(this.props.space.roomId).filter(s => {
      var _this$props$parents;
      return !((_this$props$parents = this.props.parents) !== null && _this$props$parents !== void 0 && _this$props$parents.has(s.roomId));
    });
  }
  get isCollapsed() {
    return this.state.collapsed || this.props.isPanelCollapsed;
  }
  render() {
    var _this$state$childSpac2, _this$state$childSpac3;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _this$props = this.props,
      {
        space,
        activeSpaces,
        isNested,
        isPanelCollapsed,
        onExpand,
        parents,
        innerRef,
        dragHandleProps
      } = _this$props,
      otherProps = (0,objectWithoutProperties/* default */.Z)(_this$props, _excluded2);
    const collapsed = this.isCollapsed;
    const itemClasses = classnames_default()(this.props.className, {
      mx_SpaceItem: true,
      mx_SpaceItem_narrow: isPanelCollapsed,
      collapsed: collapsed,
      hasSubSpaces: (_this$state$childSpac2 = this.state.childSpaces) === null || _this$state$childSpac2 === void 0 ? void 0 : _this$state$childSpac2.length
    });
    const isInvite = space.getMyMembership() === "invite";
    const notificationState = isInvite ? StaticNotificationState/* StaticNotificationState */.Z.forSymbol("!", NotificationColor/* NotificationColor */.v.Red) : SpaceStore/* default */.ZP.instance.getNotificationState(space.roomId);
    const hasChildren = (_this$state$childSpac3 = this.state.childSpaces) === null || _this$state$childSpac3 === void 0 ? void 0 : _this$state$childSpac3.length;
    let childItems;
    if (hasChildren && !collapsed) {
      childItems = /*#__PURE__*/react.createElement(SpaceTreeLevel, {
        spaces: this.state.childSpaces,
        activeSpaces: activeSpaces,
        isNested: true,
        parents: new Set(parents).add(space.roomId)
      });
    }
    const toggleCollapseButton = hasChildren ? /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: "mx_SpaceButton_toggleCollapse",
      onClick: this.toggleCollapse,
      tabIndex: -1,
      "aria-label": collapsed ? (0,languageHandler._t)("Expand") : (0,languageHandler._t)("Collapse")
    }) : null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ref2 = dragHandleProps || {},
      {
        tabIndex
      } = _ref2,
      restDragHandleProps = (0,objectWithoutProperties/* default */.Z)(_ref2, _excluded3);
    return /*#__PURE__*/react.createElement("li", (0,esm_extends/* default */.Z)({}, otherProps, {
      className: itemClasses,
      ref: innerRef,
      "aria-expanded": hasChildren ? !collapsed : undefined,
      role: "treeitem"
    }), /*#__PURE__*/react.createElement(SpaceButton, (0,esm_extends/* default */.Z)({}, restDragHandleProps, {
      space: space,
      className: isInvite ? "mx_SpaceButton_invite" : undefined,
      selected: activeSpaces.includes(space),
      label: space.name,
      contextMenuTooltip: (0,languageHandler._t)("Squad options"),
      notificationState: notificationState,
      isNarrow: isPanelCollapsed,
      avatarSize: isNested ? 24 : 38,
      onClick: this.onClick,
      onKeyDown: this.onKeyDown,
      ContextMenuComponent: this.props.space.getMyMembership() === "join" ? SpaceContextMenu/* default */.Z : undefined
    }), toggleCollapseButton), childItems);
  }
}
(0,defineProperty/* default */.Z)(SpaceItem, "contextType", MatrixClientContext/* default */.Z);
const SpaceTreeLevel = ({
  spaces,
  activeSpaces,
  isNested,
  parents
}) => {
  return /*#__PURE__*/react.createElement("ul", {
    className: "mx_SpaceTreeLevel",
    role: "group"
  }, spaces.map(s => {
    return /*#__PURE__*/react.createElement(SpaceItem, {
      key: s.roomId,
      activeSpaces: activeSpaces,
      space: s,
      isNested: isNested,
      parents: parents
    });
  }));
};
/* harmony default export */ const spaces_SpaceTreeLevel = ((/* unused pure expression or super */ null && (SpaceTreeLevel)));
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/useEventEmitter.ts
var useEventEmitter = __webpack_require__(457771);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Keyboard.ts
var Keyboard = __webpack_require__(389310);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/UIStore.ts
var UIStore = __webpack_require__(563869);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/AsyncStore.ts
var AsyncStore = __webpack_require__(10879);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/@types/event.ts
var _types_event = __webpack_require__(907977);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/theme/useGetThemeConfig.ts
var useGetThemeConfig = __webpack_require__(155298);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/spaces/SpacePanel.tsx

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





















const useLeftPanelState = () => {
  return (0,useEventEmitter/* useEventEmitterState */.k)(LeftPanelStore/* default */.ZP.instance, AsyncStore/* UPDATE_EVENT */.aY, () => {
    return LeftPanelStore/* default */.ZP.instance.getState();
  });
};
const HomeButton = ({
  selected,
  isPanelCollapsed
}) => {
  const scene = MatrixClientPeg/* MatrixClientPeg */.p.get().getChatScene();
  const [usingThemeSkin] = (0,useGetThemeConfig/* useIsUsingThemeSkin */.Gj)();
  return /*#__PURE__*/react.createElement("li", {
    className: classnames_default()("mx_SpaceItem", {
      collapsed: isPanelCollapsed
    }),
    role: "treeitem"
  }, /*#__PURE__*/react.createElement(SpaceButton, {
    className: classnames_default()("mx_SpaceButton_home", {
      "mx_SpaceButton_home-ape": usingThemeSkin
    }),
    onClick: () => {
      // SettingsStore.setValue(
      //     "Spaces.allRoomsInHome",
      //     null,
      //     SettingLevel.ACCOUNT,
      //     true
      // );

      LeftPanelStore/* default */.ZP.instance.updateSelected(scene === browser_index/* ChatScene */.rw.Community ? LeftPanelStore/* COMMUNITY_HOME_TAB */.Sh : LeftPanelStore/* WORK_HOME_TAB */.Jv);
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.HideRoomPanel
      });
    },
    selected: selected,
    label: (0,languageHandler._t)("Home"),
    notificationState: SpaceStore/* default */.ZP.instance.getNotificationState(scene === browser_index/* ChatScene */.rw.Community ? SpaceStore/* COMMUNITY_HOME_SPACE */.xl : SpaceStore/* WORK_HOME_SPACE */.Iz)
    // allRoomsInHome
    //     ? RoomNotificationStateStore.instance.globalState
    //     : SpaceStore.instance.getNotificationState(HOME_SPACE)
    ,

    isNarrow: isPanelCollapsed
    // ContextMenuComponent={HomeButtonContextMenu}
    // contextMenuTooltip={_t("Options")}
  }));
};

// Optimisation based on https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md#recommended-droppable--performance-optimisation
const InnerSpacePanel = /*#__PURE__*/react.memo(({
  children,
  isPanelCollapsed,
  setPanelCollapsed,
  scene
}) => {
  const {
    invites,
    spaces,
    selected
  } = useLeftPanelState();
  let activeSpaces = selected instanceof room/* Room */.du ? [selected] : [];
  let avilableSpaces = spaces;
  let avilableInvites = (invites !== null && invites !== void 0 ? invites : []).filter(room => {
    const {
      type,
      space_type
    } = room.currentState.getStateEvents(_types_event/* EventType */.tw.RoomCreate, "").getContent();
    if (scene === browser_index/* ChatScene */.rw.Work) {
      return "m.work" === space_type;
    } else {
      return "m.work" !== space_type;
    }
  });
  if (scene === browser_index/* ChatScene */.rw.Community) {
    avilableSpaces = SpaceStore/* default */.ZP.instance.communitySpace;
  } else if (scene === browser_index/* ChatScene */.rw.Work) {
    avilableSpaces = SpaceStore/* default */.ZP.instance.workSpace;
  }
  activeSpaces = selected instanceof room/* Room */.du && avilableSpaces.includes(selected) ? [selected] : [];
  return /*#__PURE__*/react.createElement("ul", {
    className: "mx_SpaceTreeLevel"
  }, /*#__PURE__*/react.createElement(HomeButton, {
    selected: typeof selected === "symbol" && selected.description.includes("Home"),
    isPanelCollapsed: isPanelCollapsed
  }), avilableSpaces.map((s, i) => /*#__PURE__*/react.createElement(react_beautiful_dnd_cjs/* Draggable */._l, {
    key: s.roomId,
    draggableId: s.roomId,
    index: i
  }, (provided, snapshot) => /*#__PURE__*/react.createElement(SpaceItem, (0,esm_extends/* default */.Z)({}, provided.draggableProps, {
    dragHandleProps: provided.dragHandleProps,
    key: s.roomId,
    innerRef: provided.innerRef,
    className: snapshot.isDragging ? "mx_SpaceItem_dragging" : undefined,
    space: s,
    activeSpaces: activeSpaces,
    isPanelCollapsed: isPanelCollapsed,
    onExpand: () => setPanelCollapsed(false)
  })))), children);
});
InnerSpacePanel.displayName = "InnerSpacePanel";
const SpacePanel = ({
  scene
}) => {
  const [isPanelCollapsed, setPanelCollapsed] = (0,react.useState)(true);
  const ref = (0,react.useRef)();
  // useLayoutEffect(() => {
  //     UIStore.instance.trackElementDimensions("SpacePanel", ref.current);
  //     return () =>
  //         UIStore.instance.stopTrackingElementDimensions("SpacePanel");
  // }, []);

  const onKeyDown = ev => {
    if (ev.defaultPrevented) return;
    let handled = true;
    switch (ev.key) {
      case Keyboard/* Key */.sr.ARROW_UP:
        onMoveFocus(ev.target, true);
        break;
      case Keyboard/* Key */.sr.ARROW_DOWN:
        onMoveFocus(ev.target, false);
        break;
      default:
        handled = false;
    }
    if (handled) {
      // consume all other keys in context menu
      ev.stopPropagation();
      ev.preventDefault();
    }
  };
  const onMoveFocus = (element, up) => {
    let descending = false; // are we currently descending or ascending through the DOM tree?
    let classes;
    do {
      const child = up ? element.lastElementChild : element.firstElementChild;
      const sibling = up ? element.previousElementSibling : element.nextElementSibling;
      if (descending) {
        if (child) {
          element = child;
        } else if (sibling) {
          element = sibling;
        } else {
          descending = false;
          element = element.parentElement;
        }
      } else {
        if (sibling) {
          element = sibling;
          descending = true;
        } else {
          element = element.parentElement;
        }
      }
      if (element) {
        if (element.classList.contains("mx_ContextualMenu")) {
          // we hit the top
          element = up ? element.lastElementChild : element.firstElementChild;
          descending = true;
        }
        classes = element.classList;
      }
    } while (element && !classes.contains("mx_SpaceButton"));
    if (element) {
      element.focus();
    }
  };
  (0,react.useEffect)(() => {
    dispatcher/* default */.ZP.dispatch({
      action: actions/* Action */.a.SpacePanelExpand,
      expand: !isPanelCollapsed
    });
  }, [isPanelCollapsed]);
  return /*#__PURE__*/react.createElement("div", {
    style: UIStore/* default */.Z.instance.windowWidth <= 640 ? {
      display: "flex",
      position: "relative",
      width: "70px"
    } : {},
    className: classnames_default()("mx_SpacePanel_wrapper", {
      mx_SpacePanel_expand: !isPanelCollapsed
    })
  }, /*#__PURE__*/react.createElement(react_beautiful_dnd_cjs/* DragDropContext */.Z5, {
    onDragEnd: result => {
      if (!result.destination) return; // dropped outside the list
      SpaceStore/* default */.ZP.instance.moveRootSpace(result.source.index, result.destination.index);
    }
  }, /*#__PURE__*/react.createElement(RovingTabIndex/* RovingTabIndexProvider */.uP, {
    handleHomeEnd: true,
    onKeyDown: onKeyDown
  }, ({
    onKeyDownHandler
  }) => /*#__PURE__*/react.createElement("div", {
    className: classnames_default()("mx_SpacePanel", {
      collapsed: isPanelCollapsed
    }),
    onKeyDown: onKeyDownHandler,
    role: "tree",
    "aria-label": (0,languageHandler._t)("Squads"),
    ref: ref
  }, /*#__PURE__*/react.createElement(react_beautiful_dnd_cjs/* Droppable */.bK, {
    droppableId: "top-level-spaces"
  }, (provided, snapshot) => /*#__PURE__*/react.createElement(AutoHideScrollbar/* default */.Z, (0,esm_extends/* default */.Z)({}, provided.droppableProps, {
    wrappedRef: provided.innerRef,
    className: "mx_SpacePanel_spaceTreeWrapper",
    style: snapshot.isDraggingOver ? {
      pointerEvents: "none"
    } : undefined
  }), /*#__PURE__*/react.createElement(InnerSpacePanel, {
    isPanelCollapsed: isPanelCollapsed,
    setPanelCollapsed: setPanelCollapsed,
    scene: scene
  }, provided.placeholder)))))));
};
/* harmony default export */ const spaces_SpacePanel = (SpacePanel);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/ScenePanel.tsx




const ScenePanel = ({
  scene
}) => {
  return SpaceStore/* default */.ZP.spacesEnabled ? /*#__PURE__*/react.createElement("div", {
    className: "mx_ScencePanel"
  }, /*#__PURE__*/react.createElement(spaces_SpacePanel, {
    scene: scene
  }), /*#__PURE__*/react.createElement("div", {
    className: "mx_ScencePanel_roomlist_wrapper"
  }, /*#__PURE__*/react.createElement(LeftPanel/* default */.Z, {
    key: scene,
    scene: scene
  }))) : null;
};
/* harmony default export */ const structures_ScenePanel = (/*#__PURE__*/(0,react.memo)(ScenePanel));
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/room-list/RoomListStore.ts + 12 modules
var RoomListStore = __webpack_require__(109660);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/room-list/models.ts + 1 modules
var models = __webpack_require__(103619);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/spaces/SpaceCreateDialog.tsx
var SpaceCreateDialog = __webpack_require__(636499);
// EXTERNAL MODULE: ./node_modules/antd/lib/index.js
var lib = __webpack_require__(769215);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/layout/components/NotificationManagerProvider.tsx
var NotificationManagerProvider = __webpack_require__(46751);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/RoomSubLists/stores/useNotificationViewTileStore.ts
var useNotificationViewTileStore = __webpack_require__(628357);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/NotificationBadge3In1.tsx






const mapUnreadKey2String = {
  [browser_index/* ChatScene */.rw.Friend]: "hasUnreadFriendNotification",
  [browser_index/* ChatScene */.rw.Community]: "hasUnreadCommunityNotification",
  [browser_index/* ChatScene */.rw.Work]: "hasUnreadWorkNotification"
};
const mapInviteKey2String = {
  [browser_index/* ChatScene */.rw.Friend]: "newGroupInvitation",
  [browser_index/* ChatScene */.rw.Community]: "newSquadInvitation",
  [browser_index/* ChatScene */.rw.Work]: "newWorksInvitation"
};
const NotificationBadge3In1 = ({
  type,
  children
}) => {
  const hasUnreadMessages = (0,NotificationManagerProvider/* useUnreadNotification */.rv)(state => state[mapUnreadKey2String[type]]);
  const newInvitations = RoomNotificationStateStore/* RoomNotificationStateStore */.v.instance.useRoomInvitationNoticeState(state => state[mapInviteKey2String[type]]);
  const hasUnread = (0,useNotificationViewTileStore/* useNotificationViewTileStore */.X4)(state => state.hasUnread);
  return /*#__PURE__*/react.createElement(lib.Badge, {
    size: "small",
    color: "#FC774B",
    dot: hasUnreadMessages || Boolean(newInvitations) || type === browser_index/* ChatScene */.rw.Friend && hasUnread
  }, children);
};
/* harmony default export */ const rooms_NotificationBadge3In1 = (NotificationBadge3In1);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/common/iconContextMenu/index.tsx




const IconContextMenuWrapper = ({
  children,
  menuEle,
  wrappedRef,
  trigger,
  placement,
  className,
  zIndex,
  menuList
}) => {
  const tooltipRef = (0,react.useRef)();
  react.useEffect(() => {
    if (tooltipRef.current) {
      wrappedRef && wrappedRef(tooltipRef.current);
    }
  }, [tooltipRef, tooltipRef === null || tooltipRef === void 0 ? void 0 : tooltipRef.current]);
  function handleClick(i) {
    var _tooltipRef$current;
    if (i.disabled) return;
    // @ts-ignore
    tooltipRef === null || tooltipRef === void 0 ? void 0 : (_tooltipRef$current = tooltipRef.current) === null || _tooltipRef$current === void 0 ? void 0 : _tooltipRef$current.setPopupVisible(false);
    i === null || i === void 0 ? void 0 : i.action();
  }
  function renderTitle() {
    if (menuList && menuList.length > 0) {
      return /*#__PURE__*/react.createElement("div", {
        className: "mx_IconMenu_Actions_inner"
      }, menuList.map(i => {
        return /*#__PURE__*/react.createElement("div", {
          className: classnames_default()({
            "mx_IconMenu_Actions_inner_item": true,
            "mx_IconMenu_Actions_inner_item_disabled": i === null || i === void 0 ? void 0 : i.disabled // TODO: no style
          }),

          onClick: () => handleClick(i)
        }, /*#__PURE__*/react.createElement("div", {
          className: "mx_IconMenu_Actions_inner_item_icon_wrapper"
        }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
          style: {
            fontSize: i.iconSize ? `${i.iconSize}px` : "18px"
          },
          className: "mx_IconMenu_Actions_inner_item_icon",
          icon: i === null || i === void 0 ? void 0 : i.icon
        })), /*#__PURE__*/react.createElement("span", {
          className: "mx_IconMenu_Actions_inner_item_title"
        }, i === null || i === void 0 ? void 0 : i.title));
      }));
    }
    return menuEle || null;
  }

  // can't use SdTooltip, please use antd Tooltip
  // SdTooltip not have fn: setPopupVisible ...
  return /*#__PURE__*/react.createElement(lib.Tooltip, {
    placement: placement,
    trigger: trigger,
    title: renderTitle(),
    zIndex: zIndex,
    overlayClassName: classnames_default()("mx_IconMenu_Actions_wrapper", className),
    ref: tooltipRef
  }, children);
};
IconContextMenuWrapper.defaultProps = {
  trigger: ['click'],
  placement: "bottom",
  zIndex: 5000,
  menuList: []
};
/* harmony default export */ const iconContextMenu = (IconContextMenuWrapper);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/invite/ChatInvite.tsx + 11 modules
var ChatInvite = __webpack_require__(92451);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/V2LeftPanelContent.tsx
























const V2LeftPanelContent_useLeftPanelState = () => {
  return (0,useEventEmitter/* useEventEmitterState */.k)(LeftPanelStore/* default */.ZP.instance, AsyncStore/* UPDATE_EVENT */.aY, () => {
    return LeftPanelStore/* default */.ZP.instance.getState();
  });
};
const V2LeftPanelContent = ({
  menuType,
  subMenuType,
  onSubMenuChange
}) => {
  const {
    invites,
    selected
  } = V2LeftPanelContent_useLeftPanelState();
  const [currentChatScene, setCurrentChatScene] = (0,react.useState)(browser_index/* ChatScene */.rw.Friend);
  const [showChatInviteModal, setShowChatInviteModal] = (0,react.useState)(false);
  const [showChatGroupModal, setShowChatGroupModal] = (0,react.useState)(false);
  const dmInvites = RoomListStore/* default */.ZP.instance.orderedLists[models/* DefaultTagID */.lL.Invite];
  const matrixClient = (0,react.useContext)(MatrixClientContext/* default */.Z);
  const workRooms = [];
  const communityRooms = [];
  const iconMenuRef = (0,react.useRef)(null);
  [...(invites !== null && invites !== void 0 ? invites : []), ...(dmInvites !== null && dmInvites !== void 0 ? dmInvites : [])].map(room => {
    var _room$currentState$ge, _room$currentState, _room$currentState$ge2;
    const {
      space_type
    } = (_room$currentState$ge = (_room$currentState = room.currentState) === null || _room$currentState === void 0 ? void 0 : (_room$currentState$ge2 = _room$currentState.getStateEvents(_types_event/* EventType */.tw.RoomCreate, "")) === null || _room$currentState$ge2 === void 0 ? void 0 : _room$currentState$ge2.getContent()) !== null && _room$currentState$ge !== void 0 ? _room$currentState$ge : {};
    if ("m.work" === space_type) {
      workRooms.push(room);
    } else if ("m.community" === space_type || room.hasSpaceParent()) {
      communityRooms.push(room);
    }
  });
  const communityRoomCount = SpaceStore/* default */.ZP.instance.communitySpace.length + communityRooms.length;
  const workRoomCount = SpaceStore/* default */.ZP.instance.workSpace.length + workRooms.length;
  (0,react.useEffect)(() => {
    if (selected instanceof browser_index/* Room */.du) {
      const [evContent] = selected.currentState.getStateEvents(_types_event/* EventType */.tw.RoomCreate).map(ev => ev.getContent());
      const {
        type,
        space_type
      } = evContent;
      if (type === "m.space" && (space_type === "m.community" || !space_type)) {
        setCurrentChatScene(browser_index/* ChatScene */.rw.Community);
        matrixClient.setChatScene(browser_index/* ChatScene */.rw.Community);
      } else if (type === "m.space" && space_type === "m.work") {
        setCurrentChatScene(browser_index/* ChatScene */.rw.Work);
        matrixClient.setChatScene(browser_index/* ChatScene */.rw.Work);
      }
    } else if ((selected === null || selected === void 0 ? void 0 : selected.description) === "WorkHome" || (selected === null || selected === void 0 ? void 0 : selected.description) === "Work") {
      setCurrentChatScene(browser_index/* ChatScene */.rw.Work);
      matrixClient.setChatScene(browser_index/* ChatScene */.rw.Work);
    } else if ((selected === null || selected === void 0 ? void 0 : selected.description) === "Community" || (selected === null || selected === void 0 ? void 0 : selected.description) === "CommunityHome") {
      setCurrentChatScene(browser_index/* ChatScene */.rw.Community);
      matrixClient.setChatScene(browser_index/* ChatScene */.rw.Community);
    }
  }, [selected]);
  (0,react.useEffect)(() => {
    if (currentChatScene === browser_index/* ChatScene */.rw.Community && communityRoomCount === 0 || currentChatScene === browser_index/* ChatScene */.rw.Work && workRoomCount === 0) {
      onChange(browser_index/* ChatScene */.rw.Friend);
    }
  }, [communityRoomCount, workRoomCount, currentChatScene]);
  const onChange = chatScene => {
    setCurrentChatScene(chatScene);
    matrixClient.setChatScene(chatScene);
    if (chatScene === browser_index/* ChatScene */.rw.Friend) {
      LeftPanelStore/* default */.ZP.instance.updateSelected(LeftPanelStore/* HOME_TAB */.e9);
    } else if (chatScene === browser_index/* ChatScene */.rw.Community) {
      LeftPanelStore/* default */.ZP.instance.updateSelected(LeftPanelStore/* COMMUNITY_HOME_TAB */.Sh);
    } else if (chatScene === browser_index/* ChatScene */.rw.Work) {
      LeftPanelStore/* default */.ZP.instance.updateSelected(LeftPanelStore/* WORK_HOME_TAB */.Jv);
    }
    dispatcher/* default */.ZP.dispatch({
      action: actions/* Action */.a.HideRightPanel
    });
    dispatcher/* default */.ZP.dispatch({
      action: actions/* Action */.a.RightPanelHide
    });
    RoomListStore/* default */.ZP.instance.emit(RoomListStore/* LISTS_UPDATE_EVENT */.N);
  };
  const startCreateSpace = () => {
    Modal/* default */.Z.createDialog(SpaceCreateDialog/* default */.Z, {
      onFinished: () => {}
    }, "mx_SpaceCreate_dialog_wrapper");
  };
  const handleNewChat = () => {
    setShowChatInviteModal(true);
  };
  const handleNewGroup = () => {
    setShowChatGroupModal(true);
  };
  const actionMenuList = (0,react.useMemo)(() => {
    return [{
      icon: "MessageOutlined",
      title: (0,languageHandler._t)("New Group"),
      action: () => handleNewGroup(),
      iconSize: 20
    }, {
      icon: "AdduserOutlines",
      title: (0,languageHandler._t)("Add Friends"),
      action: () => handleNewChat(),
      iconSize: 20
    }, {
      icon: "PlanetOutlines",
      title: (0,languageHandler._t)("New Squad"),
      action: () => startCreateSpace()
    }];
  }, []);
  let content = null;
  const labelStyle = {
    position: "relative",
    // width: "76px",
    boxSizing: "border-box",
    textAlign: "center"
  };
  if (menuType === config/* AbilityMenuType */.fL.Chat) {
    const items = [{
      key: browser_index/* ChatScene */.rw.Friend,
      label: /*#__PURE__*/react.createElement(rooms_NotificationBadge3In1, {
        type: browser_index/* ChatScene */.rw.Friend
      }, /*#__PURE__*/react.createElement("div", {
        style: labelStyle
      }, (0,languageHandler._t)("Friends"))),
      children: /*#__PURE__*/react.createElement(LeftPanel/* default */.Z, {
        key: browser_index/* ChatScene */.rw.Friend,
        scene: browser_index/* ChatScene */.rw.Friend,
        onSubMenuChange: onSubMenuChange
      })
    }, (SpaceStore/* default */.ZP.instance.communitySpace.length > 0 || communityRooms.length > 0) && {
      key: browser_index/* ChatScene */.rw.Community,
      label: /*#__PURE__*/react.createElement(rooms_NotificationBadge3In1, {
        type: browser_index/* ChatScene */.rw.Community
      }, /*#__PURE__*/react.createElement("div", {
        style: labelStyle
      }, (0,languageHandler._t)("Community"))),
      children: /*#__PURE__*/react.createElement(structures_ScenePanel, {
        scene: browser_index/* ChatScene */.rw.Community
      })
    }, (SpaceStore/* default */.ZP.instance.workSpace.length > 0 || workRooms.length > 0) && {
      key: browser_index/* ChatScene */.rw.Work,
      label: /*#__PURE__*/react.createElement(rooms_NotificationBadge3In1, {
        type: browser_index/* ChatScene */.rw.Work
      }, /*#__PURE__*/react.createElement("div", {
        style: labelStyle
      }, (0,languageHandler._t)("Work"))),
      children: /*#__PURE__*/react.createElement(structures_ScenePanel, {
        scene: browser_index/* ChatScene */.rw.Work
      })
    }].filter(Boolean);
    content = /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(iconContextMenu, {
      menuList: actionMenuList,
      placement: "bottomRight",
      wrappedRef: ref => iconMenuRef.current = ref
    }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
      icon: "AddOutlines",
      className: "create-space"
    })), /*#__PURE__*/react.createElement(sendingme_ui_dist.SdTabs, {
      defaultActiveKey: browser_index/* ChatScene */.rw.Friend,
      activeKey: currentChatScene,
      items: items,
      onChange: onChange,
      animated: true,
      tabBarGutter: 9
    }));
  } else {
    content = /*#__PURE__*/react.createElement("div", {
      className: "v2_mx_LeftPanel_ability"
    }, /*#__PURE__*/react.createElement(menus_AbilitySubMenu, {
      menuType: menuType,
      subMenuType: subMenuType,
      onSubMenuChange: onSubMenuChange,
      className: "v2_mx_LeftPanel_submenu"
    }), menuType === config/* AbilityMenuType */.fL.Contact && /*#__PURE__*/react.createElement(rooms_FavoriteList, null));
  }
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
    className: "v2_mx_LeftPanel_content"
  }, content), (showChatInviteModal || showChatGroupModal) && /*#__PURE__*/react.createElement(ChatInvite/* default */.Z, {
    close: () => {
      setShowChatInviteModal(false);
      setShowChatGroupModal(false);
    },
    defaultViewType: showChatGroupModal ? ChatInvite/* TabName */.e.NewGroup : ChatInvite/* TabName */.e.AddFriend
  }));
};
/* harmony default export */ const structures_V2LeftPanelContent = (V2LeftPanelContent);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/v2/buttons/ButtonSearch.tsx


const ButtonSearch_excluded = ["label", "className"];



const ButtonSearch = _ref => {
  let {
      label,
      className
    } = _ref,
    rest = (0,objectWithoutProperties/* default */.Z)(_ref, ButtonSearch_excluded);
  return /*#__PURE__*/react.createElement("div", (0,esm_extends/* default */.Z)({
    className: classnames_default()(className)
  }, rest), /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
    icon: "SearchOutlines"
  }));
};
/* harmony default export */ const buttons_ButtonSearch = (ButtonSearch);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/UserMenu.tsx + 6 modules
var UserMenu = __webpack_require__(127251);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/replaceableComponent.ts
var replaceableComponent = __webpack_require__(90287);
// EXTERNAL MODULE: ./node_modules/rc-virtual-list/lib/index.js
var rc_virtual_list_lib = __webpack_require__(727032);
// EXTERNAL MODULE: ./node_modules/lodash-es/debounce.js
var debounce = __webpack_require__(453434);
// EXTERNAL MODULE: ./node_modules/lodash-es/noop.js
var noop = __webpack_require__(442054);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/autocomplete/QueryMatcher.ts
var QueryMatcher = __webpack_require__(745590);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/avatar.ts
var utils_avatar = __webpack_require__(9266);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var esm_defineProperty = __webpack_require__(383551);
// EXTERNAL MODULE: ./node_modules/lodash-es/toPairs.js
var toPairs = __webpack_require__(440471);
// EXTERNAL MODULE: ./node_modules/lodash-es/uniqBy.js
var uniqBy = __webpack_require__(87783);
// EXTERNAL MODULE: ./node_modules/lodash-es/groupBy.js
var groupBy = __webpack_require__(515643);
// EXTERNAL MODULE: ./node_modules/lodash-es/orderBy.js
var orderBy = __webpack_require__(803695);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/store/search/OPFSStore.ts
var OPFSStore = __webpack_require__(31752);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/store/search/util.ts
var search_util = __webpack_require__(802598);
;// CONCATENATED MODULE: ./node_modules/matrix-js-sdk/src/store/search/FlexDocumentSerach.ts




// import { Document } from 'flexsearch-ts'

// class SearchResultAggregator {

//     readonly result: MessageDocument[] = [];
//     private readonly docMap: Map<Id[], IndexedItem<MessageDocument>> = new Map<Id[], IndexedItem<MessageDocument>>();

//     constructor(readonly highlight: HighlightFunction) {
//     }

//     public merge(resultSet: EnrichedDocumentSearchResultSetUnit<MessageDocument>) {
//         const field = resultSet.field as IndexFields;
//         for (let i = 0; i < resultSet.result.length; ++i) {
//             const item = resultSet.result[i];
//             log('???')
//             log(item)
//             let match: IndexedItem<MessageDocument>;
//             if (this.docMap.has(item.id)) {
//                 match = this.docMap.get(item.id)!;
//             } else {
//                 match = {
//                     index: this.result.length,
//                     item: { ...item.doc }
//                 }
//                 this.result.push(match.item);
//             }
//             match.item = this.highlight(field, match.item);
//             this.result[match.index] = match.item;
//             this.docMap.set(item.id, match);
//         }
//         return this;
//     }
// }
class FlexDocumentSearch {
  constructor(name) {
    this.name = name;
    // public index: Document<MessageDocument, true>;
    (0,esm_defineProperty/* default */.Z)(this, "index", void 0);
    (0,esm_defineProperty/* default */.Z)(this, "opfsStore", void 0);
  } // this.index = new Document({
  //     // worker: true,
  //     // tokenize: 'full',
  //     cache: true,
  //     document: {
  //         id: 'eventId',
  //         field: ['content', 'roomId', 'sender', 'originServerTs'],
  //         index: ['content'],
  //         store: true
  //     },
  //     encode: (str: string) => `${str}`.split(""),
  // });

  async init() {
    this.opfsStore = OPFSStore/* default */.Z.instance;
    if (!this.index) {
      await this.createIndex();
    }
  }
  async createIndex() {
    for (let [, handle] of (0,toPairs/* default */.Z)(this.opfsStore.fileHandle)) {
      if (handle) {
        var _this$index;
        const file = await handle.getFile();
        const fileContent = await file.text();
        const docs = (0,search_util/* fileParse */.px)(fileContent);
        // this.betchAdd(docs);
        this.index = (0,uniqBy/* default */.Z)([...((_this$index = this.index) !== null && _this$index !== void 0 ? _this$index : []), ...docs], "eventId");
      }
    }
  }

  // public betchAdd(docs: MessageDocument[]) {
  //     const len = docs.length;
  //     for (let i = 0; i < len; i++) {
  //         const doc = docs[i];
  //         this.index.add(doc);
  //     }
  // }

  async search(query, options) {
    if (query) {
      const results = this.index.filter(item => {
        var _item$content;
        return (_item$content = item.content) === null || _item$content === void 0 ? void 0 : _item$content.toLowerCase().includes(query.toLowerCase());
      });
      return (0,groupBy/* default */.Z)((0,orderBy/* default */.Z)(results, "originServerTs", "desc"), "roomId");
    }
    return {};

    // const result = this.index.search(query);
    // log(result);
    // const highlight = createHighlightMatcher(query);
    // return this.index.searchAsync(query, { ...(options ?? {}), enrich: true }).then((result) => {
    //     return result.reduce((accu, curr) => {
    //         // NOTICE: If a document was matched in multiple field, multiple result might yield.
    //         // Don't know how "limit" "offset" work in this condition
    //         // This demo will just return all possible matches from all possible fields.
    //         return accu.merge(curr);
    //     }, new SearchResultAggregator(highlight)).result;
    // });
    // const result = this.index.search(query, 100, {enrich: true });
    // log('>>>>>')
    // log(result)
    // const _r = result.reduce((accu, curr) => {
    // NOTICE: If a document was matched in multiple field, multiple result might yield.
    // Don't know how "limit" "offset" work in this condition
    // This demo will just return all possible matches from all possible fields.
    //     return accu.merge(curr);
    // }, new SearchResultAggregator(highlight)).result;
    // log(_r);
    // return groupBy(_r, 'roomId');
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/DateUtils.ts
var DateUtils = __webpack_require__(466556);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/settings/SettingsStore.ts + 9 modules
var SettingsStore = __webpack_require__(571879);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/avatars/MemberAvatar.tsx
var MemberAvatar = __webpack_require__(6156);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ChatHistorySearchDialog.tsx















const HISTORY_SEARCH = "HISTORY_SEARCH";
const replaceAll = (org, word) => {
  return org ? org.replace(new RegExp(word, "gi"), content => `<strong>${content}</strong>`) : "";
};
const truncateString = query => str => {
  const target = `<strong>${query.trim()}</strong>`;
  const len = target.length;
  const index = str.indexOf(target);
  if (index >= 0) {
    return index - 5 <= 0 ? `${str === null || str === void 0 ? void 0 : str.slice(0, len + index + 5)}...` : `...${str === null || str === void 0 ? void 0 : str.slice(index - 5, len + index + 5)}...`;
  } else {
    return str;
  }
};
const renderSearchItem = ({
  cItem,
  formatFn,
  onResultItemClick,
  isTab
}) => {
  let name = cItem.name;
  return /*#__PURE__*/react.createElement("div", {
    className: classnames_default()({
      "mx_ChatSearch_Result_item": true,
      "mx_ChatSearch_Result_filter_item": isTab
    }),
    key: cItem.org.roomId,
    onClick: () => onResultItemClick === null || onResultItemClick === void 0 ? void 0 : onResultItemClick(cItem)
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_ChatSearch_Result_avatar"
  }, /*#__PURE__*/react.createElement(RoomAvatar/* default */.Z, {
    room: cItem.org,
    size: 48
  })), /*#__PURE__*/react.createElement("div", {
    className: "mx_ChatSearch_Result_desc"
  }, /*#__PURE__*/react.createElement("p", {
    className: "mx_ChatSearch_Result_name",
    dangerouslySetInnerHTML: {
      __html: name
    }
  }), cItem.parent && /*#__PURE__*/react.createElement("p", {
    className: "mx_ChatSearch_Result_parent",
    dangerouslySetInnerHTML: {
      __html: cItem.parent
    }
  }), cItem.children && /*#__PURE__*/react.createElement("p", {
    className: "mx_ChatSearch_Result_children",
    dangerouslySetInnerHTML: {
      __html: typeof formatFn === "function" ? formatFn(cItem.children) : cItem.children
    }
  })));
};
const renderResultDetail = (item, query) => {
  const {
    roomId,
    sender,
    eventId,
    content
  } = item.message;
  const context = MatrixClientPeg/* MatrixClientPeg */.p.get();
  const room = context.getRoom(roomId);
  const roomMember = room === null || room === void 0 ? void 0 : room.getMember(sender);
  return roomMember ? /*#__PURE__*/react.createElement("div", {
    className: "mx_ChatSearch_Result_item",
    key: eventId
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_ChatSearch_Result_avatar"
  }, /*#__PURE__*/react.createElement(MemberAvatar/* default */.Z, {
    member: roomMember
  })), /*#__PURE__*/react.createElement("div", {
    className: "mx_ChatSearch_Result_desc"
  }, /*#__PURE__*/react.createElement("p", {
    className: "mx_ChatSearch_Result_name",
    dangerouslySetInnerHTML: {
      __html: roomMember.name
    }
  }), /*#__PURE__*/react.createElement("div", {
    className: "mx_ChatSearch_Result_children",
    dangerouslySetInnerHTML: {
      __html: replaceAll(content, query).split("\n").map(item => `<p style="margin-bottom: 0; word-break: break-all;">${item}</p>`).join("")
    }
  }))) : renderSearchItem({
    cItem: item
  });
};
const resetHistorySearch = ({
  clear,
  query
}) => {
  const historyString = localStorage.getItem(HISTORY_SEARCH);
  let historySearch = historyString ? historyString.split(",") : [];
  if (clear) {
    historySearch = [];
    localStorage.removeItem(HISTORY_SEARCH);
  } else if (query) {
    const index = historySearch.indexOf(query);
    if (index !== -1) {
      historySearch.splice(index, 1);
    }
    historySearch.unshift(query);
    if (historySearch.length > 20) {
      historySearch.pop();
    }
    localStorage.setItem(HISTORY_SEARCH, historySearch.join(","));
  }
};
const TabContent = ({
  contents,
  query,
  onFinished
}) => {
  const resultData = contents.map(({
    roomId,
    content,
    sender,
    eventId,
    originServerTs
  }) => {
    var _room$getParentRoom;
    const room = MatrixClientPeg/* MatrixClientPeg */.p.get().getRoom(roomId);
    return {
      name: room.name,
      parent: (_room$getParentRoom = room.getParentRoom()) === null || _room$getParentRoom === void 0 ? void 0 : _room$getParentRoom.name,
      children: replaceAll(content, query),
      org: room,
      message: {
        roomId,
        content,
        sender,
        eventId,
        originServerTs
      }
    };
  });
  const onSearchItemClick = item => {
    let viewRoom = true;
    if (item.org.hasSpaceParent()) {
      SpaceStore/* default */.ZP.instance.setActiveSpace(item.org.getParentRoom(), false);
    } else if (SpaceStore/* default */.ZP.instance.activeSpace) {
      LeftPanelStore/* default */.ZP.instance.updateSelected(null);
    }
    if (viewRoom) {
      dispatcher/* default */.ZP.dispatch({
        action: "view_room",
        room_id: item.org.roomId,
        show_room_tile: true,
        event_id: item.message.eventId,
        highlighted: true
      }, true);
      onFinished === null || onFinished === void 0 ? void 0 : onFinished();
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.ShowRoomPanel
      });
      dispatcher/* default */.ZP.fire(actions/* Action */.a.FocusSendMessageComposer);
    }
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_ChatSearch_Result_list"
  }, resultData.map(item => {
    return /*#__PURE__*/react.createElement("div", {
      style: {
        position: "relative"
      },
      key: item.message.eventId,
      onClick: () => onSearchItemClick(item)
    }, renderResultDetail(item, query), /*#__PURE__*/react.createElement("span", {
      className: "mx_Message_ts"
    }, (0,DateUtils/* formatDate */.p6)(new Date(item.message.originServerTs), SettingsStore/* default */.C.getValue("showTwelveHourTimestamps"))), /*#__PURE__*/react.createElement(lib.Divider, null));
  }));
};
const normalize = (record, query) => {
  const list = [];
  for (let [roomId, data] of Object.entries(record)) {
    var _room$getParentRoom2;
    const room = MatrixClientPeg/* MatrixClientPeg */.p.get().getRoom(roomId);
    room && list.push({
      name: room.name,
      parent: (_room$getParentRoom2 = room.getParentRoom()) === null || _room$getParentRoom2 === void 0 ? void 0 : _room$getParentRoom2.name,
      children: data.length > 1 ? `${data.length} related chat history` : replaceAll(data[0].content, query),
      org: room,
      contents: data
    });
  }
  return list;
};
const SearchHistory = ({
  onHistorySelected
}) => {
  const historyString = localStorage.getItem(HISTORY_SEARCH);
  const [historySearch, setHistorySearch] = (0,react.useState)(historyString ? historyString.split(",") : []);
  const deleteSearchHistory = str => {
    const historyString = localStorage.getItem(HISTORY_SEARCH);
    let historySearch = historyString ? historyString.split(",") : [];
    const index = historySearch.indexOf(str);
    if (index !== -1) {
      historySearch.splice(index, 1);
      localStorage.setItem(HISTORY_SEARCH, historySearch.join(","));
      setHistorySearch(historySearch);
    }
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_RoomSearch_Content_History mx_ChatSearch_history_list"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_RoomSearch_Content_History_header"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_RoomSearch_Content_History_title"
  }, (0,languageHandler._t)("Search history")), /*#__PURE__*/react.createElement("div", {
    className: "mx_RoomSearch_Content_History_remove",
    onMouseDown: () => resetHistorySearch({
      clear: true
    })
  })), /*#__PURE__*/react.createElement(lib.Divider, null), historySearch.map(item => /*#__PURE__*/react.createElement("div", {
    className: "mx_RoomSearch_Content_History_item",
    key: `history-${item}`,
    "data-word": item,
    onMouseDown: () => onHistorySelected(item)
  }, /*#__PURE__*/react.createElement("img", {
    src: __webpack_require__(891306),
    width: "16",
    height: "16"
  }), item, /*#__PURE__*/react.createElement("div", {
    className: "mx_RoomSearch_Content_History_item_remove",
    onMouseDown: e => {
      e.preventDefault();
      e.stopPropagation();
      deleteSearchHistory(item);
    },
    "data-word": item
  }))), historySearch.length ? null : /*#__PURE__*/react.createElement("div", {
    className: "mx_RoomSearch_Content_empty"
  }, (0,languageHandler._t)("No results")));
};
const ChatHistorySearchDialog = ({
  query,
  result,
  flexDocSearch,
  roomId,
  onFinished
}) => {
  var _tabData$0$org$roomId, _tabData$, _inputRef$current$inp2, _inputRef$current4;
  const [tabData, setTabData] = (0,react.useState)([]);
  const [shouldShowSearchHistory, setShouldShowSearchHistory] = (0,react.useState)(false);
  const inputRef = (0,react.useRef)(null);
  const [_value, setValue] = (0,react.useState)(query);
  const [showChatDetail, setShowChatDetail] = (0,react.useState)(false);
  const [details, setDetails] = (0,react.useState)([]);
  let _roomId = roomId;
  const onSearch = async value => {
    _roomId = "";
    resetHistorySearch({
      clear: false,
      query: value
    });
    const chats = await flexDocSearch.search(value);
    setShouldShowSearchHistory(false);
    setTabData(normalize(chats, value));
  };
  const onChange = (0,react.useCallback)(ev => {
    setValue(ev.target.value);
    if (!ev.target.value.trim()) {
      setTabData([]);
      return;
    }
    (0,debounce/* default */.Z)(async ev => {
      onSearch(ev.value.trim());
    }, 1000)(ev.target);
  }, []);
  const onBlur = () => {
    setShouldShowSearchHistory(false);
  };
  const selectSearchHistroy = str => {
    setValue(str);
    onSearch(str);
  };
  const onResultItemClick = item => {
    setShowChatDetail(true);
    setDetails(item.contents);
  };
  (0,react.useEffect)(() => {
    if (result) {
      setTabData(normalize(result, query));
    }
  }, [result, query]);
  const onTabChange = () => {
    document.getElementsByClassName("mx_ChatSearch_Result_container")[0].getElementsByClassName("ant-tabs-content-holder")[0].scrollTop = 0;
  };
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
    className: "mx_ChatSearch_Result_container"
  }, /*#__PURE__*/react.createElement("h4", null, "Chat history"), /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(lib.Input, {
    size: "large",
    allowClear: true,
    ref: inputRef,
    defaultValue: query,
    onChange: onChange,
    onFocus: () => setShouldShowSearchHistory(true),
    onBlur: onBlur,
    value: _value
  }), shouldShowSearchHistory && /*#__PURE__*/react.createElement(SearchHistory, {
    onHistorySelected: selectSearchHistroy
  })), tabData.length > 0 ? UIStore/* default */.Z.instance.windowWidth > 640 ? /*#__PURE__*/react.createElement(lib.Tabs, {
    key: query,
    tabPosition: "left",
    defaultActiveKey: _roomId || ((_tabData$0$org$roomId = (_tabData$ = tabData[0]) === null || _tabData$ === void 0 ? void 0 : _tabData$.org.roomId) !== null && _tabData$0$org$roomId !== void 0 ? _tabData$0$org$roomId : ""),
    destroyInactiveTabPane: true,
    onChange: onTabChange,
    items: tabData === null || tabData === void 0 ? void 0 : tabData.map(item => {
      var _inputRef$current, _inputRef$current$inp, _inputRef$current2;
      return {
        label: renderSearchItem({
          cItem: item,
          formatFn: truncateString((_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.input.value),
          isTab: true
        }),
        children: /*#__PURE__*/react.createElement(TabContent, {
          contents: item.contents,
          query: (_inputRef$current$inp = (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.input.value) !== null && _inputRef$current$inp !== void 0 ? _inputRef$current$inp : query,
          onFinished: onFinished
        }),
        key: item.org.roomId
      };
    })
  }) : /*#__PURE__*/react.createElement("div", {
    className: "mx_ChatHistory_result--mobile"
  }, tabData === null || tabData === void 0 ? void 0 : tabData.map(item => {
    var _inputRef$current3;
    return renderSearchItem({
      cItem: item,
      formatFn: truncateString((_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 ? void 0 : _inputRef$current3.input.value),
      onResultItemClick
    });
  })) : /*#__PURE__*/react.createElement(lib.Empty, null), /*#__PURE__*/react.createElement("span", {
    className: "mx_ChatSearch_close",
    onClick: () => onFinished()
  })), showChatDetail && /*#__PURE__*/react.createElement("div", {
    className: "mx_ChatSearch_Result_container mx_ChatSearch_Result_container--mobile"
  }, /*#__PURE__*/react.createElement("h4", null, "Chat history"), /*#__PURE__*/react.createElement(TabContent, {
    contents: details,
    query: (_inputRef$current$inp2 = (_inputRef$current4 = inputRef.current) === null || _inputRef$current4 === void 0 ? void 0 : _inputRef$current4.input.value) !== null && _inputRef$current$inp2 !== void 0 ? _inputRef$current$inp2 : query,
    onFinished: onFinished
  }), /*#__PURE__*/react.createElement("span", {
    className: "mx_ChatSearch_close",
    onClick: () => setShowChatDetail(false)
  })));
};
/* harmony default export */ const dialogs_ChatHistorySearchDialog = (ChatHistorySearchDialog);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Spinner.tsx
var Spinner = __webpack_require__(641542);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/common/emptyWidget/EmptyWidget.tsx
var EmptyWidget = __webpack_require__(167455);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/common/emptyWidget/def.ts
var def = __webpack_require__(952469);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/@types/user.ts
var _types_user = __webpack_require__(650540);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/utils/TimeCalc.ts

class TimeCalc {
  constructor() {
    (0,defineProperty/* default */.Z)(this, "start", void 0);
    this.start = Date.now();
  }
  show(str) {
    const now = Date.now();
    const value = now - this.start;
    console.log(str, 'elapsed processing time:', value);
    this.start = now;
  }
}
/* harmony default export */ const utils_TimeCalc = (TimeCalc);
// EXTERNAL MODULE: ./node_modules/@hiseas/react/dist/index.js
var react_dist = __webpack_require__(989638);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/room/getRoomScene.ts
var getRoomScene = __webpack_require__(827337);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/RoomSearch.tsx

var _dec, RoomSearch_class;
function RoomSearch_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function RoomSearch_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? RoomSearch_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : RoomSearch_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
Copyright 2020, 2021 The Matrix.org Foundation C.I.C.

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
































const RoomSearch_HISTORY_SEARCH = "HISTORY_SEARCH";
const RoomSearch_replaceAll = (org, word) => {
  return org ? org.replace(new RegExp(word, "gi"), content => `<strong>${content}</strong>`) : "";
};
const matchWord = (org, word) => {
  return org && org.indexOf(word) !== -1;
};
const RoomSearch_getImageUrls = mxImageUrl => {
  let oobAvatar;
  if (mxImageUrl) {
    oobAvatar = mediaFromMxc(mxImageUrl).getThumbnailOfSourceHttp(48, 48, "crop");
  }
  return [oobAvatar // highest priority
  ].filter(function (url) {
    return url !== null && url !== "";
  });
};
var SearchCategory = /*#__PURE__*/function (SearchCategory) {
  SearchCategory["Chats"] = "Chats";
  SearchCategory["Groups"] = "Groups";
  SearchCategory["Channels"] = "Channels";
  SearchCategory["Squads"] = "Squads";
  SearchCategory["Message"] = "Message";
  return SearchCategory;
}(SearchCategory || {});
let RoomSearch = (_dec = (0,replaceableComponent/* replaceableComponent */.U)("structures.RoomSearch"), _dec(RoomSearch_class = class RoomSearch extends react.PureComponent {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "dispatcherRef", void 0);
    (0,defineProperty/* default */.Z)(this, "historySearch", void 0);
    (0,defineProperty/* default */.Z)(this, "inputRef", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "matcher", void 0);
    (0,defineProperty/* default */.Z)(this, "flexDocSearch", void 0);
    (0,defineProperty/* default */.Z)(this, "onAction", payload => {
      if (payload.action === "view_room" && payload.clear_search) {
        this.clearInput();
      } else if (payload.action === "focus_room_filter" && this.inputRef.current) {
        this.inputRef.current.focus();
      }
    });
    (0,defineProperty/* default */.Z)(this, "clearInput", () => {
      if (!this.inputRef.current) return;
      this.inputRef.current.input.value = "";
      this.onChange();
    });
    (0,defineProperty/* default */.Z)(this, "openSearch", () => {
      dispatcher/* default */.ZP.dispatch({
        action: "show_left_panel"
      });
      dispatcher/* default */.ZP.dispatch({
        action: "focus_room_filter"
      });
    });
    (0,defineProperty/* default */.Z)(this, "onChange", e => {
      if (!this.inputRef.current) return;
      if (e) {
        this.inputRef.current.input.value = e.currentTarget.value;
      }
      this.setState({
        valueInput: this.inputRef.current.input.value,
        searching: !!this.inputRef.current.input.value.trim()
      }, () => {
        (0,debounce/* default */.Z)(async ev => {
          const value = this.inputRef.current.input.value.trim();
          this.setState({
            query: value,
            historySearching: true
          });
          const prom = this.calcSearch(value);
          prom.then(data => {
            const {
              results,
              chats
            } = data;
            this.setState({
              moreIndex: value !== this.state.query ? -1 : this.state.moreIndex,
              searchResult: results,
              chitHistory: chats,
              searching: false
            });
            return data;
          }).then(async data => {
            const {
              query
            } = this.state;
            const {
              results
            } = data;
            await this.flexDocSearch.init();
            const chats = await this.flexDocSearch.search(query);
            for (let [roomId, data] of Object.entries(chats)) {
              var _room$getParentRoom;
              const room = MatrixClientPeg/* MatrixClientPeg */.p.get().getRoom(roomId);
              room && results[4].data.push({
                name: room.name,
                parent: (_room$getParentRoom = room.getParentRoom()) === null || _room$getParentRoom === void 0 ? void 0 : _room$getParentRoom.name,
                children: data.length > 1 ? `${data.length} related chat history` : truncateString(query)(RoomSearch_replaceAll(data[0].content, query)),
                org: room,
                contents: data
              });
            }
            this.setState({
              searchResult: results,
              chitHistory: chats,
              historySearching: false
            });
          }).catch(error => {
            this.setState({
              searching: false,
              historySearching: false
            });
            console.error("global search failed", error);
          });
        }, 500)(this.inputRef.current);
      });
    });
    (0,defineProperty/* default */.Z)(this, "onFocus", ev => {
      this.getLocalHistory();
      this.setState({
        focused: true,
        showMenu: true
      });
      // ev.target.select();
      // if (ev.target.value !== this.state.valueInput) {
      //     this.onChange();
      // }
    });
    (0,defineProperty/* default */.Z)(this, "onClick", () => {
      this.setState({
        focused: true,
        showMenu: true
      });
    });
    (0,defineProperty/* default */.Z)(this, "onBlur", ev => {
      this.setState({
        focused: false
      });
    });
    (0,defineProperty/* default */.Z)(this, "clickContent", e => {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        var _this$inputRef$curren;
        (_this$inputRef$curren = this.inputRef.current) === null || _this$inputRef$curren === void 0 ? void 0 : _this$inputRef$curren.focus();
      }, 100);
    });
    (0,defineProperty/* default */.Z)(this, "showMore", (e, tab) => {
      e.preventDefault();
      e.stopPropagation();
      if (tab === (0,languageHandler._t)("Chat History")) {
        this.showChatHistorySearchDialog();
      } else {
        var _e$target, _e$target$dataset;
        setTimeout(() => {
          var _this$inputRef$curren2;
          (_this$inputRef$curren2 = this.inputRef.current) === null || _this$inputRef$curren2 === void 0 ? void 0 : _this$inputRef$curren2.focus();
        }, 100);
        this.setState({
          showMenu: true,
          moreIndex: Number.parseInt(((_e$target = e.target) === null || _e$target === void 0 ? void 0 : (_e$target$dataset = _e$target.dataset) === null || _e$target$dataset === void 0 ? void 0 : _e$target$dataset.index) || -1)
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "hideMore", () => {
      this.setState({
        moreIndex: -1
      });
    });
    (0,defineProperty/* default */.Z)(this, "onFinishMenu", () => {
      var _this$props;
      setTimeout(() => {
        var _this$inputRef$curren3;
        (_this$inputRef$curren3 = this.inputRef.current) === null || _this$inputRef$curren3 === void 0 ? void 0 : _this$inputRef$curren3.blur();
      }, 100);
      this.clearInput();
      this.setState({
        showMenu: false,
        focused: false,
        moreIndex: -1,
        query: "",
        valueInput: ""
      });
      (_this$props = this.props) === null || _this$props === void 0 ? void 0 : _this$props.close();
    });
    (0,defineProperty/* default */.Z)(this, "clickSearchItem", (item, itemKey) => {
      let viewRoom = true;
      if (itemKey === "chatHistory") {
        viewRoom = false;
        this.showChatHistorySearchDialog(item.org.roomId);
      } else if (itemKey === "contact") {
        viewRoom = false;
        if (SpaceStore/* default */.ZP.instance.activeSpace) {
          LeftPanelStore/* default */.ZP.instance.updateSelected(LeftPanelStore/* HOME_TAB */.e9);
        }
        this.handleDmRoomClick(item.org);
      } else if (itemKey === "channel") {
        if (SpaceStore/* default */.ZP.instance.activeSpace) {
          LeftPanelStore/* default */.ZP.instance.updateSelected(LeftPanelStore/* HOME_TAB */.e9);
        }
      } else if (itemKey === "groups") {
        // if (item.org.isDmRoom()) {
        //     viewRoom = false;
        //     this.handleDmRoomClick(item.org);
        // }
        if (item.org.hasSpaceParent()) {
          SpaceStore/* default */.ZP.instance.setActiveSpace(item.org.getParentRoom(), false);
        }
      }
      if (viewRoom) {
        dispatcher/* default */.ZP.dispatch({
          action: "view_room",
          room_id: item.org.roomId,
          show_room_tile: true
        }, true);
        dispatcher/* default */.ZP.dispatch({
          action: actions/* Action */.a.ShowRoomPanel
        });
      }
      this.resetHistorySearch(false);
      setTimeout(this.onFinishMenu, 200);
    });
    (0,defineProperty/* default */.Z)(this, "handleDmRoomClick", user => {
      const userShip = ContactStore["default"].instance.getUserShip(user.userId);
      if (userShip.includes(_types_user/* UserShip */.J.Friend) || userShip.includes(_types_user/* UserShip */.J.Colleague)) {
        (0,UserInfo/* openDMForUser */.Oz)({
          userId: user.userId,
          isJump: true,
          showRoomTile: true
        });
      } else {
        dispatcher/* default */.ZP.dispatch({
          action: "view_add_friend_apply",
          applyFriendsInfo: {
            userId: user.userId
          }
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "getAddress", (user, client) => {
      var _client$getUser;
      if (user) {
        return "";
      }
      const address = user.getWalletAddress ? user.getWalletAddress() : ((_client$getUser = client.getUser(user.userId)) === null || _client$getUser === void 0 ? void 0 : _client$getUser.getWalletAddress()) || "";
      if (address) {
        return address;
      }
      return user.userId.split(":")[0].split("@")[1] || "";
    });
    (0,defineProperty/* default */.Z)(this, "processMatch", (item, query) => {
      this.matcher.setObjects([item]);
      return this.matcher.match(query).length > 0; // matchWord(user.name, query)
    });
    (0,defineProperty/* default */.Z)(this, "matchMember", (user, query, client, justName = false) => {
      if (!user) {
        return null;
      }
      const remark = user.name && user.name !== user.rawDisplayName;
      const nameMatch = this.processMatch({
        displayName: user.name
      }, query); // matchWord(user.name, query)
      if (justName) {
        return nameMatch ? {
          name: RoomSearch_replaceAll(user.name, query)
        } : null;
      }
      const item = RoomSearch_objectSpread(RoomSearch_objectSpread({}, user), {}, {
        displayName: user.name,
        userAddress: this.getAddress(user, client)
      });
      if (this.processMatch(item, query)) {
        const name = RoomSearch_replaceAll(user.name || user.rawDisplayName, query);
        return {
          item: {
            name: remark ? `${name}(${RoomSearch_replaceAll(user.rawDisplayName, query)})` : name,
            showEns: !remark && user.ens === 1,
            children: RoomSearch_replaceAll(item.userAddress, query),
            org: user
          },
          name: nameMatch ? name : ""
        };
      }
    });
    (0,defineProperty/* default */.Z)(this, "resetHistorySearch", clear => {
      if (clear) {
        this.historySearch = [];
        localStorage.removeItem(RoomSearch_HISTORY_SEARCH);
      } else {
        const query = this.state.query;
        const index = this.historySearch.indexOf(query);
        if (index !== -1) {
          this.historySearch.splice(index, 1);
        }
        this.historySearch.unshift(query);
        if (this.historySearch.length > 20) {
          this.historySearch.pop();
        }
        localStorage.setItem(RoomSearch_HISTORY_SEARCH, this.historySearch.join(","));
      }
    });
    (0,defineProperty/* default */.Z)(this, "clickHistoryItem", (e, itemValue) => {
      e.preventDefault();
      e.stopPropagation();
      const value = e.target.dataset.word || itemValue;
      this.setState({
        showMenu: true,
        valueInput: value,
        query: value
      });
      setTimeout(() => {
        var _this$inputRef$curren4;
        (_this$inputRef$curren4 = this.inputRef.current) === null || _this$inputRef$curren4 === void 0 ? void 0 : _this$inputRef$curren4.focus();
        this.onChange();
      }, 100);
    });
    (0,defineProperty/* default */.Z)(this, "clickHistoryItemDelete", e => {
      e.preventDefault();
      e.stopPropagation();
      const index = this.historySearch.indexOf(e.target.dataset.word);
      if (index !== -1) {
        this.historySearch.splice(index, 1);
        localStorage.setItem(RoomSearch_HISTORY_SEARCH, this.historySearch.join(","));
      }
      setTimeout(() => {
        var _this$inputRef$curren5;
        (_this$inputRef$curren5 = this.inputRef.current) === null || _this$inputRef$curren5 === void 0 ? void 0 : _this$inputRef$curren5.focus();
      }, 100);
    });
    (0,defineProperty/* default */.Z)(this, "renderSearchItem", (cItem, itemKey) => {
      var _cItem$org$user, _cItem$org$user2;
      const isContact = itemKey === "contact";
      const isBot = cItem.org.userId && (SdkConfig/* default */.Z.get("bot") || []).includes(cItem.org.userId);
      let name = cItem.name;
      if (isContact && cItem.showEns) {
        name = `<img
                class="mx_Profile_userName_ens"
                src="${__webpack_require__(107467)}"
                height="12"
                width="12"
                alt=""
             /> <span>${name}</span>`;
      }
      let avatarUrl = cItem.avatarUrl || ((_cItem$org$user = cItem.org.user) === null || _cItem$org$user === void 0 ? void 0 : _cItem$org$user.avatarUrl);
      const target = cItem.org;
      if (target instanceof browser_index/* RoomMember */.T2) {
        var _target$getMxcAvatarU;
        let memberAvatarUrl = (_target$getMxcAvatarU = target.getMxcAvatarUrl) === null || _target$getMxcAvatarU === void 0 ? void 0 : _target$getMxcAvatarU.call(target);
        if (!memberAvatarUrl) {
          var _target$events, _target$events$member, _target$events$member2;
          const profileCardId = (_target$events = target.events) === null || _target$events === void 0 ? void 0 : (_target$events$member = _target$events.member) === null || _target$events$member === void 0 ? void 0 : (_target$events$member2 = _target$events$member.getContent()) === null || _target$events$member2 === void 0 ? void 0 : _target$events$member2.profile_card_id;
          if (profileCardId) {
            memberAvatarUrl = (0,utils_avatar/* getDefaultAvatar */.W)({
              id: profileCardId
            });
          }
        }
        if (memberAvatarUrl) {
          avatarUrl = memberAvatarUrl;
        }
      }
      return /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_Result_item",
        key: cItem.org.roomId || cItem.org.userId,
        onClick: () => this.clickSearchItem(cItem, itemKey)
      }, /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_Result_avatar"
      }, isContact ?
      /*#__PURE__*/
      // <BaseAvatar
      //     className="v2_mx_RoomSearch_Content_Result_avatar"
      //     width={48}
      //     height={48}
      //     name={cItem.org.name || cItem.org.displayName}
      //     idName={cItem.org[isContact ? "userId" : "roomId"]}
      //     urls={getImageUrls(avatarUrl)}
      // />
      react.createElement(sendingme_ui_dist.SdAvatar, {
        key: cItem.org[isContact ? "userId" : "roomId"],
        id: cItem.org[isContact ? "userId" : "roomId"],
        name: cItem.org.name || cItem.org.displayName,
        src: cItem.avatarUrl || ((_cItem$org$user2 = cItem.org.user) === null || _cItem$org$user2 === void 0 ? void 0 : _cItem$org$user2.avatarUrl),
        size: "large"
      }) : /*#__PURE__*/react.createElement(RoomAvatar/* default */.Z, {
        room: cItem.org,
        size: "large"
      })), /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_Result_desc"
      }, /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_Result_name"
      }, /*#__PURE__*/react.createElement("p", {
        dangerouslySetInnerHTML: {
          __html: name
        }
      })), isContact ? /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_tag"
      }, isBot && /*#__PURE__*/react.createElement("p", {
        className: "v2_mx_RoomSearch_Content_Bot_tag"
      }, "Bot"), cItem !== null && cItem !== void 0 && cItem.isRecent ? /*#__PURE__*/react.createElement("p", {
        className: "v2_mx_RoomSearch_Content_Recent_tag"
      }, "Recent") : null, cItem !== null && cItem !== void 0 && cItem.isFriend ? /*#__PURE__*/react.createElement("p", {
        className: "v2_mx_RoomSearch_Content_Friend_tag"
      }, "Friend") : null, cItem !== null && cItem !== void 0 && cItem.isColleague ? /*#__PURE__*/react.createElement("p", {
        className: "v2_mx_RoomSearch_Content_Colleague_tag"
      }, "Colleague") : null) : null, cItem.parent && /*#__PURE__*/react.createElement("p", {
        className: "v2_mx_RoomSearch_Content_Result_parent",
        dangerouslySetInnerHTML: {
          __html: cItem.parent
        }
      }), cItem.children && (!isContact ? /*#__PURE__*/react.createElement("p", {
        className: "v2_mx_RoomSearch_Content_Result_children",
        dangerouslySetInnerHTML: {
          __html: cItem.children
        }
      }) : /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_Result_address",
        dangerouslySetInnerHTML: {
          __html: cItem.children
        }
      }))));
    });
    (0,defineProperty/* default */.Z)(this, "onActivekeyChange", key => {
      this.setState({
        categoryTab: key
      });
    });
    (0,defineProperty/* default */.Z)(this, "handleRecommendClick", item => {
      var _recommendSearch$, _recommendSearch$2, _recommendSearch$3, _recommendSearch$4, _recommendSearch$5;
      const {
        categoryTab,
        recommendSearch
      } = this.state;
      let viewRoom = true;
      if ((_recommendSearch$ = recommendSearch[0]) !== null && _recommendSearch$ !== void 0 && _recommendSearch$.data.includes(item)) {
        // Friends
        viewRoom = false;
        if (SpaceStore/* default */.ZP.instance.activeSpace) {
          LeftPanelStore/* default */.ZP.instance.updateSelected(LeftPanelStore/* HOME_TAB */.e9);
        }
        this.handleDmRoomClick(item.org);
      } else if ((_recommendSearch$2 = recommendSearch[1]) !== null && _recommendSearch$2 !== void 0 && _recommendSearch$2.data.includes(item)) {
        // Channel
        if (SpaceStore/* default */.ZP.instance.activeSpace) {
          LeftPanelStore/* default */.ZP.instance.updateSelected(LeftPanelStore/* HOME_TAB */.e9);
        }
      } else if ((_recommendSearch$3 = recommendSearch[2]) !== null && _recommendSearch$3 !== void 0 && _recommendSearch$3.data.includes(item)) {
        // Groups
        if (item.hasSpaceParent()) {
          SpaceStore/* default */.ZP.instance.setActiveSpace(item.getParentRoom(), false);
        }
      } else if ((_recommendSearch$4 = recommendSearch[3]) !== null && _recommendSearch$4 !== void 0 && _recommendSearch$4.data.includes(item)) {
        const isWork = (0,getRoomScene/* isWorkRoom */.PI)(item);
        // Squads
        LeftPanelStore/* default */.ZP.instance.updateSelected(isWork ? LeftPanelStore/* WORK_HOME_TAB */.Jv : LeftPanelStore/* COMMUNITY_HOME_TAB */.Sh);
        dispatcher/* default */.ZP.dispatch({
          action: actions/* Action */.a.HideRoomPanel
        });
      } else if ((_recommendSearch$5 = recommendSearch[4]) !== null && _recommendSearch$5 !== void 0 && _recommendSearch$5.data.includes(item)) {
        // chat history
        viewRoom = false;
        this.showChatHistorySearchDialog(item.roomId);
      }
      if (viewRoom) {
        dispatcher/* default */.ZP.dispatch({
          action: "view_room",
          room_id: item.roomId,
          show_room_tile: true
        }, true);
        dispatcher/* default */.ZP.dispatch({
          action: actions/* Action */.a.ShowRoomPanel
        });
      }
      setTimeout(this.onFinishMenu, 200);
    });
    (0,defineProperty/* default */.Z)(this, "renderRecommendItem", () => {
      var _data;
      const {
        recommendSearch,
        categoryTab
      } = this.state;
      if (!recommendSearch) return;
      let data;
      switch (categoryTab) {
        case SearchCategory.Chats:
          data = recommendSearch[0].data || [];
          break;
        case SearchCategory.Channels:
          data = recommendSearch[1].data || [];
          break;
        case SearchCategory.Groups:
          data = recommendSearch[2].data || [];
          break;
        case SearchCategory.Squads:
          data = recommendSearch[3].data || [];
          break;
        case SearchCategory.Message:
          data = recommendSearch[4].data || [];
          break;
        default:
          data = [];
          break;
      }
      if (!data || ((_data = data) === null || _data === void 0 ? void 0 : _data.length) === 0) return null;
      const isContact = categoryTab === SearchCategory.Chats;
      return /*#__PURE__*/react.createElement("div", {
        className: "mx_global_search_tabs_content_wrapper"
      }, data.map(i => {
        var _i$org, _i$org2, _i$org3;
        let avatarUrl = isContact && (i.avatarUrl || ((_i$org = i.org) === null || _i$org === void 0 ? void 0 : _i$org.avatarUrl));
        return /*#__PURE__*/react.createElement("div", {
          className: "mx_global_search_recommend_wrapper",
          onClick: () => this.handleRecommendClick(i)
        }, isContact ?
        /*#__PURE__*/
        // <BaseAvatar
        //     key={i?.org?.userId}
        //     className="mx_global_search_recommend_item_avatar"
        //     width={54}
        //     height={54}
        //     name={i.org.name || i.org.displayName}
        //     idName={
        //         i.org[isContact ? "userId" : "roomId"]
        //     }
        //     urls={getImageUrls(avatarUrl)}
        // />
        react.createElement(sendingme_ui_dist.SdAvatar, {
          key: i === null || i === void 0 ? void 0 : (_i$org2 = i.org) === null || _i$org2 === void 0 ? void 0 : _i$org2.userId,
          id: i.org[isContact ? "userId" : "roomId"],
          name: i.org.name || i.org.displayName,
          size: "large",
          src: isContact && (i.avatarUrl || ((_i$org3 = i.org) === null || _i$org3 === void 0 ? void 0 : _i$org3.avatarUrl))
        }) : /*#__PURE__*/react.createElement(RoomAvatar/* default */.Z, {
          key: i === null || i === void 0 ? void 0 : i.roomId,
          room: i,
          size: "large"
        }), /*#__PURE__*/react.createElement("div", {
          className: "mx_global_search_recommend_item_name",
          title: i === null || i === void 0 ? void 0 : i.name
        }, i === null || i === void 0 ? void 0 : i.name));
      }));
    });
    (0,defineProperty/* default */.Z)(this, "renderUnSearchContent", () => {
      const tabs = [SearchCategory.Chats, SearchCategory.Groups, SearchCategory.Channels, SearchCategory.Squads, SearchCategory.Message];
      return /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_History mx_AutoHideScrollbar",
        onClick: this.clickContent
      }, /*#__PURE__*/react.createElement(react_dist.Tabs, {
        classNames: classnames_default()(["mx_global_search_tabs"]),
        value: this.state.categoryTab,
        tabs: tabs.map(i => {
          return {
            value: i,
            title: i === SearchCategory.Chats ? (0,languageHandler._t)("All") : (0,languageHandler._t)(i),
            action: () => this.onActivekeyChange(i),
            children: this.renderRecommendItem()
          };
        }).filter(Boolean),
        barWidth: 60
      }), /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_History_header"
      }, /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_History_title"
      }, (0,languageHandler._t)("History")), /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_History_remove",
        onClick: this.resetHistorySearch
      }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
        icon: "DeleteOutLines"
      }))), /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_History_item_wrapper"
      }, this.historySearch.map(item => /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_History_item",
        key: `history-${item}`,
        "data-word": item,
        onClick: e => this.clickHistoryItem(e, item)
      }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
        icon: "ClockOutlines"
      }), /*#__PURE__*/react.createElement("span", {
        className: "v2_mx_RoomSearch_Content_History_item_text"
      }, item), /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_History_item_remove",
        onClick: this.clickHistoryItemDelete,
        "data-word": item
      }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
        icon: "CloseOutlines"
      }))))));
    });
    (0,defineProperty/* default */.Z)(this, "findSearchResultByKey", () => {});
    (0,defineProperty/* default */.Z)(this, "renderSearchResultItemArea", () => {
      const {
        categoryTab,
        searchResult,
        searching
      } = this.state;
      if (searching) {
        return /*#__PURE__*/react.createElement(Spinner/* default */.Z, null);
      }
      let data = [];
      switch (categoryTab) {
        case SearchCategory.Chats:
          data.push(...searchResult);
          break;
        case SearchCategory.Channels:
          data.push(searchResult.find(i => i.key === "channel"));
          break;
        case SearchCategory.Groups:
          data.push(searchResult.find(i => i.key === "groups"));
          break;
        case SearchCategory.Squads:
          data.push(searchResult.find(i => i.key === "squads"));
          break;
        case SearchCategory.Message:
          data.push(searchResult.find(i => i.key === "chatHistory"));
          break;
        default:
          data = [];
          break;
      }
      const sum = data.filter(Boolean).reduce((pre, cur) => {
        var _cur$data;
        return pre + (cur === null || cur === void 0 ? void 0 : (_cur$data = cur.data) === null || _cur$data === void 0 ? void 0 : _cur$data.length);
      }, 0);
      if (!sum || (sum === null || sum === void 0 ? void 0 : sum.length) === 0) {
        return /*#__PURE__*/react.createElement("div", {
          style: {
            marginTop: "60px",
            width: "100%"
          }
        }, /*#__PURE__*/react.createElement(EmptyWidget/* default */.Z, {
          coverType: def/* EmptyCoverType */.t.DATA,
          content: (0,languageHandler._t)("No records found")
        }));
      }
      return this.renderSearchContent(data.filter(Boolean));
    });
    (0,defineProperty/* default */.Z)(this, "renderSearchResultContent", () => {
      const tabs = [SearchCategory.Chats, SearchCategory.Groups, SearchCategory.Channels, SearchCategory.Squads, SearchCategory.Message];
      return /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_History mx_AutoHideScrollbar"
      }, /*#__PURE__*/react.createElement(react_dist.Tabs, {
        classNames: classnames_default()(["mx_global_search_result_tabs"]),
        value: this.state.categoryTab,
        tabs: tabs.map(i => {
          return {
            value: i,
            title: i === SearchCategory.Chats ? (0,languageHandler._t)("All") : (0,languageHandler._t)(i),
            action: () => this.onActivekeyChange(i),
            children: this.renderSearchResultItemArea()
          };
        }).filter(Boolean),
        barWidth: 60
      }));
    });
    this.state = {
      query: "",
      valueInput: "",
      focused: false,
      showMenu: false,
      moreIndex: -1,
      searchResult: [],
      chitHistory: {},
      searching: false,
      historySearching: true,
      categoryTab: SearchCategory.Chats
    };
    this.dispatcherRef = dispatcher/* default */.ZP.register(this.onAction);
    // clear filter when changing spaces, in future we may wish to maintain a filter per-space
    LeftPanelStore/* default */.ZP.instance.on(LeftPanelStore/* SELECTED_CHANGED */.NM, this.clearInput);
    this.getLocalHistory();
    this.matcher = new QueryMatcher/* default */.Z([], {
      keys: ["displayName", "rawDisplayName", "userAddress"],
      shouldMatchWordsOnly: false,
      fuzzy: false
    });
    this.flexDocSearch = new FlexDocumentSearch(MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId());
  }
  componentDidMount() {
    setTimeout(() => {
      var _this$inputRef$curren6;
      (_this$inputRef$curren6 = this.inputRef.current) === null || _this$inputRef$curren6 === void 0 ? void 0 : _this$inputRef$curren6.focus();
    }, 100);
    this.initRecommendSearch();
  }
  componentWillUnmount() {
    dispatcher/* default */.ZP.unregister(this.dispatcherRef);
    LeftPanelStore/* default */.ZP.instance.off(LeftPanelStore/* SELECTED_CHANGED */.NM, this.clearInput);
  }
  getLocalHistory() {
    const historyString = localStorage.getItem(RoomSearch_HISTORY_SEARCH);
    this.historySearch = historyString ? historyString.split(",") : [];
  }
  showChatHistorySearchDialog(roomId) {
    Modal/* default */.Z.createDialog(dialogs_ChatHistorySearchDialog, {
      query: this.state.query,
      result: this.state.chitHistory,
      flexDocSearch: this.flexDocSearch,
      roomId,
      onFinished: noop/* default */.Z
    }, "mx_ChatSearch_Result_dialog");
    setTimeout(this.onFinishMenu, 200);
  }
  initFriends() {
    const query = "";
    const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
    const selfUserId = MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId();
    const {
      friends
    } = ContactStore["default"].instance;
    const resultList = [];
    friends.forEach(contactItem => {
      var _room$;
      const user = client.getUser(contactItem.userId);
      if (!user) {
        return;
      }
      const remark = user.displayName && user.displayName !== user.rawDisplayName;
      const item = RoomSearch_objectSpread(RoomSearch_objectSpread({}, user), {}, {
        userAddress: this.getAddress(user, client)
      });
      const name = user.displayName || user.rawDisplayName;
      const room = client.getDmRoomByUserId(item.userId);
      let lastMessageTime = (room === null || room === void 0 ? void 0 : (_room$ = room[0]) === null || _room$ === void 0 ? void 0 : _room$.getLastMessageTimestamp()) || 0;
      lastMessageTime = lastMessageTime > 0 ? lastMessageTime : 0;
      const userShip = ContactStore["default"].instance.getUserShip(item.userId);
      resultList.push({
        name: remark ? `${name}(${user.rawDisplayName})` : name,
        showEns: !remark && user.ens === 1,
        children: RoomSearch_replaceAll(item.userAddress, query),
        org: user,
        avatarUrl: user.avatarUrl || contactItem.avatarUrl,
        lastMessagesTimestamp: lastMessageTime,
        isRecent: room.length > 0,
        isFriend: true,
        isColleague: userShip.includes(_types_user/* UserShip */.J.Colleague)
      });
    });
    const sortFriendList = resultList.sort((a, b) => {
      return (b === null || b === void 0 ? void 0 : b.lastMessagesTimestamp) - (a === null || a === void 0 ? void 0 : a.lastMessagesTimestamp);
    });
    return sortFriendList;
  }
  initRecommendSearch() {
    let results = [{
      tab: (0,languageHandler._t)("Friends"),
      key: "contact",
      data: [],
      keyWeight: 100
    }, {
      tab: (0,languageHandler._t)("Channel"),
      key: "channel",
      data: [],
      keyWeight: 3
    }, {
      tab: (0,languageHandler._t)("Groups"),
      key: "groups",
      data: [],
      keyWeight: 2
    }, {
      tab: (0,languageHandler._t)("Squads"),
      key: "squads",
      data: [],
      keyWeight: 1
    }, {
      tab: (0,languageHandler._t)("Chat History"),
      key: "chatHistory",
      data: [],
      keyWeight: 0
    }];
    const friends = this.initFriends();
    const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
    const selfUserId = MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId();
    const allRooms = MatrixClientPeg/* MatrixClientPeg */.p.get().getRooms();
    const chats = [];
    const squads = [];
    const channel = [];
    // group
    const groups = allRooms.filter(item => {
      const member = item.getMember(selfUserId);
      if (!member || member.membership !== "join") {
        return false;
      }
      if (item.isDmRoom()) {
        chats.push(item);
        return false;
      }
      // squad
      if (item.isSpaceRoom()) {
        squads.push(item);
        return false;
      }
      // channel
      if (item.hasSpaceParent()) {
        channel.push(item);
        return false;
      }
      return true;
    });
    const sliceFriends = friends === null || friends === void 0 ? void 0 : friends.slice(0, 30);
    const sortChannelRooms = this.sortRoomByLastMessageTimestamp(channel, 30);
    const sortGroupRooms = this.sortRoomByLastMessageTimestamp(groups, 30);
    const sortSquadRooms = this.sortRoomByLastMessageTimestamp(squads, 30);
    results[0].data.push(...sliceFriends);
    results[1].data.push(...sortChannelRooms);
    results[2].data.push(...sortGroupRooms);
    results[3].data.push(...sortSquadRooms);
    this.setState({
      recommendSearch: results
    });
  }
  sortRoomByLastMessageTimestamp(rooms, max) {
    const sortRes = rooms.sort((a, b) => {
      const timeA = a.getLastMessageTimestamp() > 0 ? a.getLastMessageTimestamp() : 0;
      const timeB = b.getLastMessageTimestamp() > 0 ? b.getLastMessageTimestamp() : 0;
      return timeB - timeA;
    });
    if (max) {
      return sortRes.slice(0, max);
    }
    return sortRes;
  }
  async calcSearch(query) {
    const timeCalc = new utils_TimeCalc();
    let results = [{
      tab: (0,languageHandler._t)("Friends"),
      key: "contact",
      data: [],
      keyWeight: 100
    }, {
      tab: (0,languageHandler._t)("Channel"),
      key: "channel",
      data: [],
      keyWeight: 3
    }, {
      tab: (0,languageHandler._t)("Groups"),
      key: "groups",
      data: [],
      keyWeight: 2
    }, {
      tab: (0,languageHandler._t)("Squads"),
      key: "squads",
      data: [],
      keyWeight: 1
    }, {
      tab: (0,languageHandler._t)("Chat History"),
      key: "chatHistory",
      data: [],
      keyWeight: 0
    }];
    timeCalc.show("calcSearch");
    const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
    const selfUserId = MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId();
    const {
      friends
    } = ContactStore["default"].instance;
    const contactIds = [];
    friends.forEach(contactItem => {
      const user = client.getUser(contactItem.userId);
      if (!user) {
        return;
      }
      const remark = user.displayName && user.displayName !== user.rawDisplayName;
      const item = RoomSearch_objectSpread(RoomSearch_objectSpread({}, user), {}, {
        userAddress: this.getAddress(user, client)
      });
      if (this.processMatch(item, query)) {
        var _room$2;
        const name = RoomSearch_replaceAll(user.displayName || user.rawDisplayName, query);
        const room = client.getDmRoomByUserId(item.userId);
        let lastMessageTime = (room === null || room === void 0 ? void 0 : (_room$2 = room[0]) === null || _room$2 === void 0 ? void 0 : _room$2.getLastMessageTimestamp()) || 0;
        lastMessageTime = lastMessageTime > 0 ? lastMessageTime : 0;
        const userShip = ContactStore["default"].instance.getUserShip(item.userId);
        results[0].data.push({
          name: remark ? `${name}(${RoomSearch_replaceAll(user.rawDisplayName, query)})` : name,
          showEns: !remark && user.ens === 1,
          children: RoomSearch_replaceAll(item.userAddress, query),
          org: user,
          avatarUrl: user.avatarUrl || contactItem.avatarUrl,
          lastMessagesTimestamp: lastMessageTime,
          isRecent: room.length > 0,
          isFriend: true,
          isColleague: userShip.includes(_types_user/* UserShip */.J.Colleague)
        });
        contactIds.push(contactItem.userId);
      }
    });
    timeCalc.show("friends.forEach");
    const allRooms = MatrixClientPeg/* MatrixClientPeg */.p.get().getVisibleRooms();
    const squads = [];
    const squadRooms = [];
    const groups = allRooms.filter(item => {
      const member = item.getMember(selfUserId);
      if (!member || member.membership !== "join") {
        return false;
      }
      if (item.isDmRoom()) {
        return false;
      }
      if (item.isSpaceRoom()) {
        squads.push(item);
        return false;
      }
      if (item.hasSpaceParent()) {
        squadRooms.push(item);
        return false;
      }
      return true;
    });
    timeCalc.show("groups filter");

    // channel
    squadRooms.forEach(roomItem => {
      var _roomItem$currentStat;
      const memberMatched = [];
      let lastMessageTime = (roomItem === null || roomItem === void 0 ? void 0 : roomItem.getLastMessageTimestamp()) || 0;
      lastMessageTime = lastMessageTime > 0 ? lastMessageTime : 0;
      const roomNameMatch = this.processMatch({
        displayName: roomItem.name
      }, query);
      const keyWeight = roomNameMatch ? 1000 : 0;
      Object.values(((_roomItem$currentStat = roomItem.currentState) === null || _roomItem$currentStat === void 0 ? void 0 : _roomItem$currentStat.members) || {}).forEach(roomUser => {
        const result = this.matchMember(roomUser, query, client, true);
        if (result) {
          if (result.name && memberMatched.length < 4) {
            memberMatched.push(result.name);
          }
        }
      });
      const hasChildren = memberMatched.length;
      if (hasChildren || roomNameMatch) {
        var _roomItem$getParentRo;
        results[1].data.push({
          name: RoomSearch_replaceAll(roomItem.name, query),
          parent: (_roomItem$getParentRo = roomItem.getParentRoom()) === null || _roomItem$getParentRo === void 0 ? void 0 : _roomItem$getParentRo.name,
          children: hasChildren ? `${(0,languageHandler._t)("Contain")}: ${memberMatched.join(", ")}` : "",
          org: roomItem,
          keyWeight: keyWeight,
          lastMessageTime: lastMessageTime
        });
      }
      if (roomNameMatch) {
        results[1].keyWeight = 10 + 3;
      }
    });
    timeCalc.show("squadRooms forEach");

    // group
    groups.forEach(groupItem => {
      var _groupItem$currentSta;
      const memberMatched = [];
      let lastMessageTime = (groupItem === null || groupItem === void 0 ? void 0 : groupItem.getLastMessageTimestamp()) || 0;
      lastMessageTime = lastMessageTime > 0 ? lastMessageTime : 0;
      const roomNameMatch = this.processMatch({
        displayName: groupItem.name
      }, query);
      const keyWeight = roomNameMatch ? 1000 : 0;
      Object.values(((_groupItem$currentSta = groupItem.currentState) === null || _groupItem$currentSta === void 0 ? void 0 : _groupItem$currentSta.members) || {}).forEach(groupUser => {
        const result = this.matchMember(groupUser, query, client);
        if (result) {
          if (result.name && memberMatched.length < 4) {
            memberMatched.push(result.name);
          }
          // if (contactIds.indexOf(groupUser.userId) === -1) {
          //     const room = client.getDmRoomByUserId(
          //         groupUser.userId,
          //     );
          //     const userShip: UserShip[] =
          //         ContactStore.instance.getUserShip(
          //             groupUser.userId,
          //         );
          //     if (results[0].data.length <= 1) {
          //         if (groupItem.isDmRoom()) {
          //             results[0].data.push({
          //                 ...result.item,
          //                 isRecent: room.length > 0,
          //                 isFriend: userShip.includes(
          //                     UserShip.Friend,
          //                 ),
          //                 isColleague: userShip.includes(
          //                     UserShip.Colleague,
          //                 ),
          //                 lastMessagesTimestamp: lastMessageTime,
          //             });
          //         } else {
          //             results[0].data.push({
          //                 ...result.item,
          //                 isRecent: room.length > 0,
          //                 isFriend: userShip.includes(
          //                     UserShip.Friend,
          //                 ),
          //                 isColleague: userShip.includes(
          //                     UserShip.Colleague,
          //                 ),
          //                 lastMessagesTimestamp: 0,
          //             });
          //         }
          //     }
          //     contactIds.push(groupUser.userId);
          // }
        }
      });

      const hasChildren = memberMatched.length;
      if (hasChildren || roomNameMatch) {
        results[2].data.push({
          name: RoomSearch_replaceAll(groupItem.name, query),
          children: hasChildren ? `${(0,languageHandler._t)("Contain")}: ${memberMatched.join(", ")}` : "",
          org: groupItem,
          keyWeight: keyWeight,
          lastMessageTime: lastMessageTime
        });
      }
      if (roomNameMatch) {
        results[2].keyWeight = 10 + 2;
      }
    });
    timeCalc.show("groups forEach");

    // squad
    squads.forEach(squadItem => {
      var _squadItem$currentSta;
      const memberMatched = [];
      let lastMessageTime = (squadItem === null || squadItem === void 0 ? void 0 : squadItem.getLastMessageTimestamp()) || 0;
      lastMessageTime = lastMessageTime > 0 ? lastMessageTime : 0;
      const roomNameMatch = this.processMatch({
        displayName: squadItem.name
      }, query);
      const keyWeight = roomNameMatch ? 1000 : 0;
      Object.values(((_squadItem$currentSta = squadItem.currentState) === null || _squadItem$currentSta === void 0 ? void 0 : _squadItem$currentSta.members) || {}).forEach(squadUser => {
        const result = this.matchMember(squadUser, query, client);
        if (result) {
          if (result.name && memberMatched.length < 4) {
            memberMatched.push(result.name);
          }
          // if (contactIds.indexOf(squadUser.userId) === -1) {
          //     const room = client.getDmRoomByUserId(
          //         squadUser.userId,
          //     );
          //     const userShip: UserShip[] =
          //         ContactStore.instance.getUserShip(
          //             squadUser.userId,
          //         );
          //     if (results[0].data.length <= 1) {
          //         results[0].data.push({
          //             ...result.item,
          //             isRecent: room.length > 0,
          //             isFriend: userShip.includes(
          //                 UserShip.Friend,
          //             ),
          //             isColleague: userShip.includes(
          //                 UserShip.Colleague,
          //             ),
          //             lastMessagesTimestamp: lastMessageTime,
          //         });
          //     }
          //     contactIds.push(squadUser.userId);
          // }
        }
      });

      const hasChildren = memberMatched.length;
      if (hasChildren || roomNameMatch) {
        results[3].data.push({
          name: RoomSearch_replaceAll(squadItem.name, query),
          children: hasChildren ? `${(0,languageHandler._t)("Contain")}: ${memberMatched.join(", ")}` : "",
          org: squadItem,
          keyWeight: keyWeight,
          lastMessageTime: lastMessageTime
        });
      }
      if (roomNameMatch) {
        results[3].keyWeight = 10 + 1;
      }
    });
    timeCalc.show("squads forEach");
    // sort members
    results[0].data = results[0].data.sort((a, b) => {
      return b.lastMessagesTimestamp - a.lastMessagesTimestamp;
    });

    // sort channel
    results[1].data = results[1].data.sort((a, b) => {
      if (a.keyWeight === b.keyWeight) {
        return b.lastMessageTime - a.lastMessageTime;
      }
      return b.keyWeight - a.keyWeight;
    });

    // sort groups
    results[2].data = results[2].data.sort((a, b) => {
      if (a.keyWeight === b.keyWeight) {
        return b.lastMessageTime - a.lastMessageTime;
      }
      return b.keyWeight - a.keyWeight;
    });
    // sort squad
    results[3].data = results[3].data.sort((a, b) => {
      if (a.keyWeight === b.keyWeight) {
        return b.lastMessageTime - a.lastMessageTime;
      }
      return b.keyWeight - a.keyWeight;
    });

    // sort modal
    results = results.sort((a, b) => {
      return b.keyWeight - a.keyWeight;
    });
    timeCalc.show("result sort");
    // await this.flexDocSearch.init();
    // const chats = await this.flexDocSearch.search(query);
    // for (let [roomId, data] of Object.entries(chats)) {
    //     const room = MatrixClientPeg.get().getRoom(roomId);
    //     room &&
    //         results[4].data.push({
    //             name: room.name,
    //             parent: room.getParentRoom()?.name,
    //             children:
    //                 data.length > 1
    //                     ? `${data.length} related chat history`
    //                     : truncateString(query)(
    //                         replaceAll(data[0].content, query)
    //                     ),
    //             org: room,
    //             contents: data,
    //         });
    // }

    return {
      results
    };
  }
  renderSearchContent(results) {
    var _pItem$data;
    const {
      moreIndex,
      historySearching,
      categoryTab
    } = this.state;
    const pItem = results[moreIndex];
    if (((pItem === null || pItem === void 0 ? void 0 : (_pItem$data = pItem.data) === null || _pItem$data === void 0 ? void 0 : _pItem$data.length) || 0) <= 3) {
      return /*#__PURE__*/react.createElement("div", {
        className: "v2_mx_RoomSearch_Content_Result",
        onClick: this.clickContent
      }, results.map((item, index) => {
        if (item.data.length === 0 && index > 0) return null;
        return /*#__PURE__*/react.createElement(react.Fragment, {
          key: item.tab + this.state.query
        }, categoryTab === SearchCategory.Chats && /*#__PURE__*/react.createElement("div", {
          className: "v2_mx_RoomSearch_Content_Result_header"
        }, item.tab, item.key && item.key !== "contact" && /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
          icon: "RightOutlines",
          className: "result_header_icon",
          onClick: () => {
            const typeObj = {
              contact: SearchCategory.Chats,
              channel: SearchCategory.Channels,
              groups: SearchCategory.Groups,
              squads: SearchCategory.Squads,
              chatHistory: SearchCategory.Message
            };
            const currentType = typeObj[item.key];
            currentType && this.setState({
              categoryTab: currentType
            });
          }
        })), item.data.length === 0 ? /*#__PURE__*/react.createElement("div", {
          className: "v2_mx_RoomSearch_tab_Content_empty"
        }, " ", (0,languageHandler._t)("No results")) : (item.data || []).map((cItem, cIndex) => {
          // When categoryTab = Chats, squad, channel, group will only show up to 3 items.
          if (categoryTab === SearchCategory.Chats && cIndex > 2 && ["channel", "groups", "squads"].includes(item.key)) {
            return null;
          }
          if (!cItem) {
            return null;
          }
          return this.renderSearchItem(cItem, item.key);
        }).filter(Boolean));
      }));
    }
    return /*#__PURE__*/react.createElement("div", {
      className: "v2_mx_RoomSearch_Content_Result v2_mx_RoomSearch_Content_Result_More",
      onClick: this.clickContent
    }, /*#__PURE__*/react.createElement("div", {
      className: "v2_mx_RoomSearch_Content_Result_header"
    }, pItem.tab), /*#__PURE__*/react.createElement(rc_virtual_list_lib["default"], {
      data: pItem.data,
      itemKey: item => item.org.userId || item.org.roomId,
      height: 68
    }, cItem => {
      return this.renderSearchItem(cItem, pItem.key);
    }), /*#__PURE__*/react.createElement("div", {
      className: "v2_mx_RoomSearch_Content_Result_footer",
      onClick: this.hideMore
    }, (0,languageHandler._t)("Collapse")));
  }
  render() {
    const {
      focused,
      query,
      valueInput,
      searchResult
    } = this.state;
    const classes = classnames_default()({
      v2_mx_RoomSearch_search_context: true,
      v2_mx_RoomSearch_hasQuery: valueInput,
      v2_mx_RoomSearch_focused: focused
    });
    let contextMenu = null;
    let searchContent = null;
    if (!query) {
      searchContent = this.renderUnSearchContent();
    } else {
      searchContent = this.renderSearchResultContent();
    }
    const positionData = {
      left: 56,
      top: 72,
      width: 150
    };
    if (this.inputRef.current) {
      const elementRect = this.inputRef.current.input.getBoundingClientRect();
      positionData.left = elementRect.left - 20;
      positionData.top = elementRect.bottom;
      positionData.width = elementRect.width;
    }
    contextMenu = /*#__PURE__*/react.createElement("div", {
      className: "v2_mx_RoomSearch_Content"
    }, searchContent);
    return /*#__PURE__*/react.createElement("div", {
      className: "v2_mx_RoomSearch_container"
    }, /*#__PURE__*/react.createElement("div", {
      className: classes
    }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdInput, {
      ref: this.inputRef,
      className: "v2_mx_RoomSearch_search_context_inner",
      allowClear: true,
      prefix: /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
        icon: "SearchOutlines",
        style: {
          fontSize: "20px"
        }
      })
      // className={inputClasses}
      ,
      value: valueInput,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onClick: this.onClick,
      onChange: this.onChange,
      placeholder: (0,languageHandler._t)("Search"),
      autoComplete: "off"
    }), /*#__PURE__*/react.createElement(sendingme_ui_dist.SdTooltip, {
      title: (0,languageHandler._t)("Close search"),
      placement: "right"
    }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
      icon: "CloseOutlines",
      className: "v2_mx_RoomSearch_close",
      onClick: () => this.props.close()
    }))), contextMenu);
  }
}) || RoomSearch_class);

;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/LeftPanelHeader.tsx




const LeftPanelHeader = () => {
  const [startSearch, setStartSearch] = (0,react.useState)(false);
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
    className: "v2_mx_LeftPanel_header"
  }, /*#__PURE__*/react.createElement(UserMenu/* default */.Z, null), /*#__PURE__*/react.createElement(buttons_ButtonSearch, {
    className: "v2_mx_LeftPanel_header_search",
    onClick: () => setStartSearch(true)
  })), startSearch && /*#__PURE__*/react.createElement(RoomSearch, {
    close: () => setStartSearch(false)
  }));
};
/* harmony default export */ const structures_LeftPanelHeader = (LeftPanelHeader);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/menus/AbilityMenu.tsx


const AbilityMenu_excluded = ["className", "onSwitchMenu"];

// import IconContact from "../../icons/IconContact";
// import IconChat from "../../icons/IconChat";
// import IconInbox from "../../icons/IconInbox";
// import IconDiscover from "../../icons/IconDiscover";
// import IconExplore from "../../icons/IconExplore";












let menuItems = [{
  menuType: config/* AbilityMenuType */.fL.Chat,
  icon: /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
    icon: "SdmFilled"
  }),
  defaultSubMenu: config/* SubMenuType */.MN.All,
  title: (0,languageHandler._t)("Chat")
}, {
  menuType: config/* AbilityMenuType */.fL.Contact,
  icon: /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
    icon: "ContactFilled"
  }),
  defaultSubMenu: config/* SubMenuType */.MN.Recommendation,
  title: (0,languageHandler._t)("Contact")
},
// {
//     menuType: AbilityMenuType.Inbox,
//     icon: <IconInbox />,
//     defaultSubMenu: SubMenuType.Mention,
// },
{
  menuType: config/* AbilityMenuType */.fL.Discover,
  icon: /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
    icon: "MarketFilled"
  }),
  defaultSubMenu: config/* SubMenuType */.MN.All,
  title: (0,languageHandler._t)("Discover")
}, {
  menuType: config/* AbilityMenuType */.fL.Explore,
  icon: /*#__PURE__*/react.createElement(sendingme_ui_dist.SdIcon, {
    icon: "ExploreFilled"
  }),
  defaultSubMenu: config/* SubMenuType */.MN.Home,
  title: (0,languageHandler._t)("Explore")
}];
const AbilityMenu = /*#__PURE__*/(0,react.memo)(_ref => {
  let {
      className,
      onSwitchMenu
    } = _ref,
    rest = (0,objectWithoutProperties/* default */.Z)(_ref, AbilityMenu_excluded);
  // const selected = LeftPanelStore.instance.getState().selected;
  const selected = LeftPanelStore/* default */.ZP.instance.useLeftPanelStore(state => state.selected);
  const hasUnreadGlobalState = (0,NotificationManagerProvider/* useUnreadNotification */.rv)(state => state.hasUnreadGlobalNotification);
  const allNewInvitations = RoomNotificationStateStore/* RoomNotificationStateStore */.v.instance.useRoomInvitationNoticeState(state => state.allInvitations);
  const newGroupInvitations = RoomNotificationStateStore/* RoomNotificationStateStore */.v.instance.useRoomInvitationNoticeState(state => state.newGroupInvitation);
  const newSquadInvitations = RoomNotificationStateStore/* RoomNotificationStateStore */.v.instance.useRoomInvitationNoticeState(state => state.newSquadInvitation);
  const hasUnread = (0,useNotificationViewTileStore/* useNotificationViewTileStore */.X4)(state => state.hasUnread);
  const newFriends = ContactStore["default"].instance.useContactStore(state => state.newFriendRequest);
  const badgeCount = newFriends + newGroupInvitations + newSquadInvitations;
  const [currentMenu, setCurrentMenu] = (0,react.useState)();
  const [usingThemeSkin] = (0,useGetThemeConfig/* useIsUsingThemeSkin */.Gj)();
  const [themeConfig] = (0,useGetThemeConfig/* useGetThemeAssetConfig */.Ye)();
  (0,react.useEffect)(() => {
    setCurrentMenu(typeof selected === "symbol" ? config/* Tabs2AbilityMenuMap */.bR[selected] : config/* AbilityMenuType */.fL.Chat);
  }, [selected]);
  const handleClick = (menuType, defaultSubMenu) => () => {
    setCurrentMenu(menuType);
    onSwitchMenu(menuType, defaultSubMenu);
    (0,SubMenuState/* updateMenuState */.I)({
      menu: menuType,
      subMenu: defaultSubMenu
    });
  };
  return /*#__PURE__*/react.createElement("div", (0,esm_extends/* default */.Z)({
    className: classnames_default()(className)
  }, rest), menuItems.map(({
    menuType,
    icon,
    defaultSubMenu,
    title
  }) => {
    const IBadge = menuType === config/* AbilityMenuType */.fL.Contact ? lib.Badge : react.Fragment;
    return /*#__PURE__*/react.createElement(sendingme_ui_dist.SdTooltip, {
      placement: "top",
      title: title,
      key: title
    }, /*#__PURE__*/react.createElement(IBadge, {
      count: badgeCount
    }, /*#__PURE__*/react.createElement("div", {
      key: menuType,
      className: classnames_default()({
        active: menuType === currentMenu,
        "has-unread-msg": (hasUnreadGlobalState || allNewInvitations || hasUnread) && menuType === config/* AbilityMenuType */.fL.Chat
      }),
      onClick: handleClick(menuType, defaultSubMenu)
    }, usingThemeSkin ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("img", {
      style: {
        width: "24px",
        height: "24px",
        display: menuType === currentMenu ? "none" : "block"
      },
      src: themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.leftIcons[menuType]
    }), /*#__PURE__*/react.createElement("img", {
      style: {
        width: "24px",
        height: "24px",
        display: menuType === currentMenu ? "block" : "none"
      },
      src: themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.leftIcons[`${menuType}Active`]
    })) : icon)));
  }));
});
AbilityMenu.displayName = "AbilityMenu";
/* harmony default export */ const menus_AbilityMenu = (AbilityMenu);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/LeftPanelFooter.tsx






const tabMap = {
  [config/* AbilityMenuType */.fL.Explore]: LeftPanelStore/* EXPLORE_TAB */.bA,
  [config/* AbilityMenuType */.fL.Discover]: LeftPanelStore/* DAPP_TAB */.bJ,
  [config/* AbilityMenuType */.fL.Inbox]: LeftPanelStore/* INBOX_TAB */.J9,
  [config/* AbilityMenuType */.fL.Contact]: LeftPanelStore/* CONTACT_TAB */.YJ
};
const LeftPanelFooter = ({
  onMenuChange
}) => {
  const onSwitchMenu = (menuType, subMenuType) => {
    onMenuChange(menuType, subMenuType);
    switch (menuType) {
      case config/* AbilityMenuType */.fL.Explore:
      case config/* AbilityMenuType */.fL.Discover:
      case config/* AbilityMenuType */.fL.Inbox:
      case config/* AbilityMenuType */.fL.Contact:
        LeftPanelStore/* default */.ZP.instance.updateSubSelected(subMenuType);
        LeftPanelStore/* default */.ZP.instance.updateSelected(tabMap[menuType]);
        dispatcher/* default */.ZP.dispatch({
          action: actions/* Action */.a.ShowRoomPanel
        });
        dispatcher/* default */.ZP.dispatch({
          action: actions/* Action */.a.HideLeftPanel
        });
        break;
      default:
        LeftPanelStore/* default */.ZP.instance.updateSelected(LeftPanelStore/* HOME_TAB */.e9);
        dispatcher/* default */.ZP.dispatch({
          action: "view_room",
          room_id: localStorage.getItem("mx_last_room_id")
        });
    }
  };
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(menus_AbilityMenu, {
    className: "v2_mx_LeftPanel_footer",
    onSwitchMenu: onSwitchMenu
  }));
};
/* harmony default export */ const structures_LeftPanelFooter = (LeftPanelFooter);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/LeftPanelContainer.tsx









const LeftPanelContainer = () => {
  const selected = LeftPanelStore/* default */.ZP.instance.getState().selected;
  const [menuType, setMenuType] = (0,react.useState)(config/* AbilityMenuType */.fL.Chat);
  const [subMenuType, setSubMenuType] = (0,react.useState)(null);
  const [backgroundStyle] = (0,useGetThemeConfig/* useGetThemeBackgroundStyle */.Bz)({
    type: useGetThemeConfig/* TypeEnum */.oY.BG_SIDEBAR
  });
  const onMenuChange = (menuType, subMenuType) => {
    setMenuType(menuType);
    setSubMenuType(subMenuType);
    LeftPanelStore/* default */.ZP.instance.updateSubSelected(subMenuType);
    if (menuType === config/* AbilityMenuType */.fL.Chat) {
      LeftPanelStore/* default */.ZP.instance.updateSelected(LeftPanelStore/* HOME_TAB */.e9);
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.HideRoomPanel
      });
    } else {
      LeftPanelStore/* default */.ZP.instance.updateSelected(config/* AbilityMenu2TabMap */.rO[menuType]);
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.ShowRoomPanel
      });
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.HideLeftPanel
      });
      // clear inbox notification
      dispatcher/* default */.ZP.dispatch({
        action: LeftPanelStore/* CHANGE_LEFT_PANEL_UI_STATE */.Us,
        target: LeftPanelStore/* INBOX_NOTIFICATION */.mB,
        value: {
          openPanel: false,
          instanceId: "",
          type: null,
          data: null
        }
      });
    }
  };
  const handleSubMenuChange = subMenuType => {
    setSubMenuType(subMenuType);
    LeftPanelStore/* default */.ZP.instance.updateSubSelected(subMenuType);
    // if mobile
    dispatcher/* default */.ZP.dispatch({
      action: actions/* Action */.a.ShowRoomPanel
    });
    dispatcher/* default */.ZP.dispatch({
      action: actions/* Action */.a.HideLeftPanel
    });
  };

  // useEffect(() => {
  //     const subSelected = LeftPanelStore.instance.getState().subSelected;
  //     setSubMenuType(subSelected as SubMenuType);
  // }, [menuType]);

  (0,react.useEffect)(() => {
    setMenuType(typeof selected === "symbol" ? config/* Tabs2AbilityMenuMap */.bR[selected] : config/* AbilityMenuType */.fL.Chat);
  }, [selected]);
  return /*#__PURE__*/react.createElement("div", {
    className: "v2_mx_LeftPanel",
    style: backgroundStyle
  }, /*#__PURE__*/react.createElement(structures_LeftPanelHeader, null), /*#__PURE__*/react.createElement(structures_V2LeftPanelContent, {
    menuType: menuType,
    subMenuType: subMenuType,
    onSubMenuChange: handleSubMenuChange
  }), /*#__PURE__*/react.createElement(structures_LeftPanelFooter, {
    onMenuChange: onMenuChange
  }));
};
/* harmony default export */ const structures_LeftPanelContainer = (LeftPanelContainer);

/***/ }),

/***/ 891306:
/***/ ((module) => {

module.exports = "img/history.59d816a.svg";

/***/ })

}]);
//# sourceMappingURL=1597.js.map