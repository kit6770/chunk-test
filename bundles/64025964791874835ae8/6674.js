(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[6674,9254,1399],{

/***/ 541399:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ }),

/***/ 829254:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MessageViewAllButton)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(667294);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(867614);
/* harmony import */ var sendingme_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(602271);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(245539);
/* harmony import */ var _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(274057);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(473627);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2018 Michael Telatynski <7t3chguy@gmail.com>

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





// @replaceableComponent("views.messages.MessageViewAllButton")
class MessageViewAllButton extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(...args) {
    super(...args);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "handleViewAll", () => {
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP.dispatch({
        action: _dispatcher_actions__WEBPACK_IMPORTED_MODULE_6__/* .Action */ .a.SetRightPanelPhase,
        phase: _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_5__/* .RightPanelPhases */ .q4.MessageDetail,
        refireParams: {
          params: _objectSpread({}, this.props)
        }
      });
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP.dispatch({
        action: _dispatcher_actions__WEBPACK_IMPORTED_MODULE_6__/* .Action */ .a.ShowRightPanel
      });
    });
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "mx_MessageViewAllContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "mx_MessageViewAllButton",
      "aria-hidden": true,
      onClick: this.handleViewAll
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_2__._t)("View All")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(sendingme_ui__WEBPACK_IMPORTED_MODULE_3__.SdIcon, {
      icon: "RightOutlines"
    })), this.props.children);
  }
}

/***/ }),

/***/ 266674:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ TextualBody)
});

// NAMESPACE OBJECT: ./node_modules/matrix-react-sdk/src/components/views/rooms/preview_card/handles/twitter.ts
var twitter_namespaceObject = {};
__webpack_require__.r(twitter_namespaceObject);
__webpack_require__.d(twitter_namespaceObject, {
  onCardClick: () => (onCardClick),
  onContentClick: () => (onContentClick),
  onFooterClick: () => (onFooterClick),
  onHeaderClick: () => (onHeaderClick),
  onIconClick: () => (onIconClick)
});

// NAMESPACE OBJECT: ./node_modules/matrix-react-sdk/src/components/views/rooms/preview_card/handles/live.ts
var live_namespaceObject = {};
__webpack_require__.r(live_namespaceObject);
__webpack_require__.d(live_namespaceObject, {
  onCardClick: () => (live_onCardClick),
  onContentClick: () => (live_onContentClick),
  onFooterClick: () => (live_onFooterClick),
  onHeaderClick: () => (live_onHeaderClick),
  onIconClick: () => (live_onIconClick)
});

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(225259);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(973935);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/@types/event.ts
var _types_event = __webpack_require__(907977);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/HtmlUtils.tsx
var HtmlUtils = __webpack_require__(714813);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/DateUtils.ts
var DateUtils = __webpack_require__(466556);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Modal.tsx + 1 modules
var Modal = __webpack_require__(241648);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/dispatcher.ts
var dispatcher = __webpack_require__(245539);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/ContextMenu.tsx + 6 modules
var ContextMenu = __webpack_require__(760172);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/settings/SettingsStore.ts + 9 modules
var SettingsStore = __webpack_require__(571879);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/ReplyThread.tsx
var ReplyThread = __webpack_require__(980531);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/pushprocessor.ts
var pushprocessor = __webpack_require__(598775);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/MatrixClientPeg.ts + 3 modules
var MatrixClientPeg = __webpack_require__(933393);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Pill.js
var Pill = __webpack_require__(869397);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/permalinks/Permalinks.ts
var Permalinks = __webpack_require__(954105);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/utils/pillify.tsx
/*
Copyright 2019, 2020, 2021 The Matrix.org Foundation C.I.C.

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
 * Recurses depth-first through a DOM tree, converting matrix.to links
 * into pills based on the context of a given room.  Returns a list of
 * the resulting React nodes so they can be unmounted rather than leaking.
 *
 * @param {Element[]} nodes - a list of sibling DOM nodes to traverse to try
 *   to turn into pills.
 * @param {MatrixEvent} mxEvent - the matrix event which the DOM nodes are
 *   part of representing.
 * @param {Element[]} pills: an accumulator of the DOM nodes which contain
 *   React components which have been mounted as part of this.
 *   The initial caller should pass in an empty array to seed the accumulator.
 */
function pillifyLinks(nodes, mxEvent, pills) {
  const room = MatrixClientPeg/* MatrixClientPeg */.p.get().getRoom(mxEvent.getRoomId());
  const shouldShowPillAvatar = SettingsStore/* default */.C.getValue("Pill.shouldShowPillAvatar");
  let node = nodes[0];
  while (node) {
    let pillified = false;
    if (node.tagName === "A" && node.getAttribute("href")) {
      const href = node.getAttribute("href");
      const url = new URL(href);
      const parts = (0,Permalinks/* parseAppLocalLink */.OT)(url.hash);
      // If the link is a (localised) matrix.to link, replace it with a pill
      // We don't want to pill event permalinks, so those are ignored.
      if (parts && !parts.eventId) {
        const pillContainer = document.createElement('span');
        const pill = /*#__PURE__*/react.createElement(Pill/* default */.Z, {
          url: href,
          inMessage: true,
          room: room,
          mxEvent: mxEvent,
          shouldShowPillAvatar: shouldShowPillAvatar
        });
        react_dom.render(pill, pillContainer);
        node.parentNode.replaceChild(pillContainer, node);
        pills.push(pillContainer);
        // Pills within pills aren't going to go well, so move on
        pillified = true;

        // update the current node with one that's now taken its place
        node = pillContainer;
      }
    } else if (node.nodeType === Node.TEXT_NODE &&
    // as applying pills happens outside of react, make sure we're not doubly
    // applying @room pills here, as a rerender with the same content won't touch the DOM
    // to clear the pills from the last run of pillifyLinks
    !node.parentElement.classList.contains("mx_AtRoomPill")) {
      let currentTextNode = node;
      const roomNotifTextNodes = [];

      // Take a textNode and break it up to make all the instances of @room their
      // own textNode, adding those nodes to roomNotifTextNodes
      while (currentTextNode !== null) {
        const roomNotifPos = Pill/* default */.Z.roomNotifPos(currentTextNode.textContent);
        let nextTextNode = null;
        if (roomNotifPos > -1) {
          let roomTextNode = currentTextNode;
          if (roomNotifPos > 0) roomTextNode = roomTextNode.splitText(roomNotifPos);
          if (roomTextNode.textContent.length > Pill/* default */.Z.roomNotifLen()) {
            nextTextNode = roomTextNode.splitText(Pill/* default */.Z.roomNotifLen());
          }
          roomNotifTextNodes.push(roomTextNode);
        }
        currentTextNode = nextTextNode;
      }
      if (roomNotifTextNodes.length > 0) {
        const pushProcessor = new pushprocessor/* PushProcessor */.J(MatrixClientPeg/* MatrixClientPeg */.p.get());
        const atRoomRule = pushProcessor.getPushRuleById(".m.rule.roomnotif");
        if (atRoomRule && pushProcessor.ruleMatchesEvent(atRoomRule, mxEvent)) {
          // Now replace all those nodes with Pills
          for (const roomNotifTextNode of roomNotifTextNodes) {
            // Set the next node to be processed to the one after the node
            // we're adding now, since we've just inserted nodes into the structure
            // we're iterating over.
            // Note we've checked roomNotifTextNodes.length > 0 so we'll do this at least once
            node = roomNotifTextNode.nextSibling;
            const pillContainer = document.createElement('span');
            const pill = /*#__PURE__*/react.createElement(Pill/* default */.Z, {
              type: Pill/* default */.Z.TYPE_AT_ROOM_MENTION,
              inMessage: true,
              room: room,
              mxEvent: mxEvent,
              shouldShowPillAvatar: shouldShowPillAvatar
            });
            react_dom.render(pill, pillContainer);
            roomNotifTextNode.parentNode.replaceChild(pillContainer, roomNotifTextNode);
            pills.push(pillContainer);
          }
          // Nothing else to do for a text node (and we don't need to advance
          // the loop pointer because we did it above)
          continue;
        }
      }
    }
    if (node.childNodes && node.childNodes.length && !pillified) {
      pillifyLinks(node.childNodes, mxEvent, pills);
    }
    node = node.nextSibling;
  }
}

/**
 * Unmount all the pill containers from React created by pillifyLinks.
 *
 * It's critical to call this after pillifyLinks, otherwise
 * Pills will leak, leaking entire DOM trees via the event
 * emitter on BaseAvatar as per
 * https://github.com/vector-im/element-web/issues/12417
 *
 * @param {Element[]} pills - array of pill containers whose React
 *   components should be unmounted.
 */
function unmountPills(pills) {
  for (const pillContainer of pills) {
    react_dom.unmountComponentAtNode(pillContainer);
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/integrations/IntegrationManagers.ts + 6 modules
var IntegrationManagers = __webpack_require__(977376);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/strings.ts
var strings = __webpack_require__(653848);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AccessibleTooltipButton.tsx
var AccessibleTooltipButton = __webpack_require__(717919);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/UIStore.ts
var UIStore = __webpack_require__(563869);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/actions.ts
var actions = __webpack_require__(473627);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/context_menus/GenericTextContextMenu.tsx
var GenericTextContextMenu = __webpack_require__(877424);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Spoiler.js
/*
 Copyright 2019 Sorunome

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

// @replaceableComponent("views.elements.Spoiler")
class Spoiler extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  toggleVisible(e) {
    if (!this.state.visible) {
      // we are un-blurring, we don't want this click to propagate to potential child pills
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({
      visible: !this.state.visible
    });
  }
  render() {
    const reason = this.props.reason ? /*#__PURE__*/react.createElement("span", {
      className: "mx_EventTile_spoiler_reason"
    }, "(" + this.props.reason + ")") : null;
    // react doesn't allow appending a DOM node as child.
    // as such, we pass the this.props.contentHtml instead and then set the raw
    // HTML content. This is secure as the contents have already been parsed previously
    return /*#__PURE__*/react.createElement("span", {
      className: "mx_EventTile_spoiler" + (this.state.visible ? " visible" : ""),
      onClick: this.toggleVisible.bind(this)
    }, reason, "\xA0", /*#__PURE__*/react.createElement("span", {
      className: "mx_EventTile_spoiler_content",
      dangerouslySetInnerHTML: {
        __html: this.props.contentHtml
      }
    }));
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/QuestionDialog.js
var QuestionDialog = __webpack_require__(433773);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(45697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/index.js + 1 modules
var src = __webpack_require__(47185);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(294184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/diff-match-patch/index.js
var diff_match_patch = __webpack_require__(452027);
// EXTERNAL MODULE: ./node_modules/diff-dom/dist/index.js
var dist = __webpack_require__(718471);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/utils/MessageDiffUtils.tsx
/*
Copyright 2019 - 2021 The Matrix.org Foundation C.I.C.

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






const decodeEntities = function () {
  let textarea = null;
  return function (str) {
    if (!textarea) {
      textarea = document.createElement("textarea");
    }
    textarea.innerHTML = str;
    return textarea.value;
  };
}();
function textToHtml(text) {
  const container = document.createElement("div");
  container.textContent = text;
  return container.innerHTML;
}
function getSanitizedHtmlBody(content) {
  const opts = {
    stripReplyFallback: true,
    returnString: true
  };
  if (content.format === "org.matrix.custom.html") {
    return (0,HtmlUtils/* bodyToHtml */.GM)(content, null, opts);
  } else {
    // convert the string to something that can be safely
    // embedded in an html document, e.g. use html entities where needed
    // This is also needed so that DiffDOM wouldn't interpret something
    // as a tag when somebody types e.g. "</sarcasm>"

    // as opposed to bodyToHtml, here we also render
    // text messages with dangerouslySetInnerHTML, to unify
    // the code paths and because we need html to show differences
    return textToHtml((0,HtmlUtils/* bodyToHtml */.GM)(content, null, opts));
  }
}
function wrapInsertion(child) {
  const wrapper = document.createElement((0,HtmlUtils/* checkBlockNode */.TP)(child) ? "div" : "span");
  wrapper.className = "mx_EditHistoryMessage_insertion";
  wrapper.appendChild(child);
  return wrapper;
}
function wrapDeletion(child) {
  const wrapper = document.createElement((0,HtmlUtils/* checkBlockNode */.TP)(child) ? "div" : "span");
  wrapper.className = "mx_EditHistoryMessage_deletion";
  wrapper.appendChild(child);
  return wrapper;
}
function findRefNodes(root, route, isAddition = false) {
  let refNode = root;
  let refParentNode;
  const end = isAddition ? route.length - 1 : route.length;
  for (let i = 0; i < end; ++i) {
    refParentNode = refNode;
    refNode = refNode.childNodes[route[i]];
  }
  return {
    refNode,
    refParentNode
  };
}
function diffTreeToDOM(desc) {
  if (desc.nodeName === "#text") {
    return stringAsTextNode(desc.data);
  } else {
    const node = document.createElement(desc.nodeName);
    if (desc.attributes) {
      for (const [key, value] of Object.entries(desc.attributes)) {
        node.setAttribute(key, value);
      }
    }
    if (desc.childNodes) {
      for (const childDesc of desc.childNodes) {
        node.appendChild(diffTreeToDOM(childDesc));
      }
    }
    return node;
  }
}
function insertBefore(parent, nextSibling, child) {
  if (nextSibling) {
    parent.insertBefore(child, nextSibling);
  } else {
    parent.appendChild(child);
  }
}
function isRouteOfNextSibling(route1, route2) {
  // routes are arrays with indices,
  // to be interpreted as a path in the dom tree

  // ensure same parent
  for (let i = 0; i < route1.length - 1; ++i) {
    if (route1[i] !== route2[i]) {
      return false;
    }
  }
  // the route2 is only affected by the diff of route1
  // inserting an element if the index at the level of the
  // last element of route1 being larger
  // (e.g. coming behind route1 at that level)
  const lastD1Idx = route1.length - 1;
  return route2[lastD1Idx] >= route1[lastD1Idx];
}
function adjustRoutes(diff, remainingDiffs) {
  if (diff.action === "removeTextElement" || diff.action === "removeElement") {
    // as removed text is not removed from the html, but marked as deleted,
    // we need to readjust indices that assume the current node has been removed.
    const advance = 1;
    for (const rd of remainingDiffs) {
      if (isRouteOfNextSibling(diff.route, rd.route)) {
        rd.route[diff.route.length - 1] += advance;
      }
    }
  }
}
function stringAsTextNode(string) {
  return document.createTextNode(decodeEntities(string));
}
function renderDifferenceInDOM(originalRootNode, diff, diffMathPatch) {
  const {
    refNode,
    refParentNode
  } = findRefNodes(originalRootNode, diff.route);
  switch (diff.action) {
    case "replaceElement":
      {
        const container = document.createElement("span");
        const delNode = wrapDeletion(diffTreeToDOM(diff.oldValue));
        const insNode = wrapInsertion(diffTreeToDOM(diff.newValue));
        container.appendChild(delNode);
        container.appendChild(insNode);
        refNode.parentNode.replaceChild(container, refNode);
        break;
      }
    case "removeTextElement":
      {
        const delNode = wrapDeletion(stringAsTextNode(diff.value));
        refNode.parentNode.replaceChild(delNode, refNode);
        break;
      }
    case "removeElement":
      {
        const delNode = wrapDeletion(diffTreeToDOM(diff.element));
        refNode.parentNode.replaceChild(delNode, refNode);
        break;
      }
    case "modifyTextElement":
      {
        const textDiffs = diffMathPatch.diff_main(diff.oldValue, diff.newValue);
        diffMathPatch.diff_cleanupSemantic(textDiffs);
        const container = document.createElement("span");
        for (const [modifier, text] of textDiffs) {
          let textDiffNode = stringAsTextNode(text);
          if (modifier < 0) {
            textDiffNode = wrapDeletion(textDiffNode);
          } else if (modifier > 0) {
            textDiffNode = wrapInsertion(textDiffNode);
          }
          container.appendChild(textDiffNode);
        }
        refNode.parentNode.replaceChild(container, refNode);
        break;
      }
    case "addElement":
      {
        const insNode = wrapInsertion(diffTreeToDOM(diff.element));
        insertBefore(refParentNode, refNode, insNode);
        break;
      }
    case "addTextElement":
      {
        // XXX: sometimes diffDOM says insert a newline when there shouldn't be one
        // but we must insert the node anyway so that we don't break the route child IDs.
        // See https://github.com/fiduswriter/diffDOM/issues/100
        const insNode = wrapInsertion(stringAsTextNode(diff.value !== "\n" ? diff.value : ""));
        insertBefore(refParentNode, refNode, insNode);
        break;
      }
    // e.g. when changing a the href of a link,
    // show the link with old href as removed and with the new href as added
    case "removeAttribute":
    case "addAttribute":
    case "modifyAttribute":
      {
        const delNode = wrapDeletion(refNode.cloneNode(true));
        const updatedNode = refNode.cloneNode(true);
        if (diff.action === "addAttribute" || diff.action === "modifyAttribute") {
          updatedNode.setAttribute(diff.name, diff.newValue);
        } else {
          updatedNode.removeAttribute(diff.name);
        }
        const insNode = wrapInsertion(updatedNode);
        const container = document.createElement((0,HtmlUtils/* checkBlockNode */.TP)(refNode) ? "div" : "span");
        container.appendChild(delNode);
        container.appendChild(insNode);
        refNode.parentNode.replaceChild(container, refNode);
        break;
      }
    default:
      // Should not happen (modifyComment, ???)
      console.warn("MessageDiffUtils::editBodyDiffToHtml: diff action not supported atm", diff);
  }
}
function routeIsEqual(r1, r2) {
  return r1.length === r2.length && !r1.some((e, i) => e !== r2[i]);
}

// workaround for https://github.com/fiduswriter/diffDOM/issues/90
function filterCancelingOutDiffs(originalDiffActions) {
  const diffActions = originalDiffActions.slice();
  for (let i = 0; i < diffActions.length; ++i) {
    const diff = diffActions[i];
    if (diff.action === "removeTextElement") {
      const nextDiff = diffActions[i + 1];
      const cancelsOut = nextDiff && nextDiff.action === "addTextElement" && nextDiff.text === diff.text && routeIsEqual(nextDiff.route, diff.route);
      if (cancelsOut) {
        diffActions.splice(i, 2);
      }
    }
  }
  return diffActions;
}

/**
 * Renders a message with the changes made in an edit shown visually.
 * @param {object} originalContent the content for the base message
 * @param {object} editContent the content for the edit message
 * @return {object} a react element similar to what `bodyToHtml` returns
 */
function editBodyDiffToHtml(originalContent, editContent) {
  // wrap the body in a div, DiffDOM needs a root element
  const originalBody = `<div>${getSanitizedHtmlBody(originalContent)}</div>`;
  const editBody = `<div>${getSanitizedHtmlBody(editContent)}</div>`;
  const dd = new dist/* DiffDOM */._b();
  // diffActions is an array of objects with at least a `action` and `route`
  // property. `action` tells us what the diff object changes, and `route` where.
  // `route` is a path on the DOM tree expressed as an array of indices.
  const originaldiffActions = dd.diff(originalBody, editBody);
  // work around https://github.com/fiduswriter/diffDOM/issues/90
  const diffActions = filterCancelingOutDiffs(originaldiffActions);
  // for diffing text fragments
  const diffMathPatch = new diff_match_patch.diff_match_patch();
  // parse the base html message as a DOM tree, to which we'll apply the differences found.
  // fish out the div in which we wrapped the messages above with children[0].
  const originalRootNode = new DOMParser().parseFromString(originalBody, "text/html").body.children[0];
  for (let i = 0; i < diffActions.length; ++i) {
    const diff = diffActions[i];
    renderDifferenceInDOM(originalRootNode, diff, diffMathPatch);
    // DiffDOM assumes in subsequent diffs route path that
    // the action was applied (e.g. that a removeElement action removed the element).
    // This is not the case for us. We render differences in the DOM tree, and don't apply them.
    // So we need to adjust the routes of the remaining diffs to account for this.
    adjustRoutes(diff, diffActions.slice(i + 1));
  }
  // take the html out of the modified DOM tree again
  const safeBody = originalRootNode.innerHTML;
  const className = classnames_default()({
    'mx_EventTile_body': true,
    'markdown-body': true
  });
  return /*#__PURE__*/react.createElement("span", {
    key: "body",
    className: className,
    dangerouslySetInnerHTML: {
      __html: safeBody
    },
    dir: "auto"
  });
}
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/models/event.ts
var models_event = __webpack_require__(489777);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/messages/RedactedBody.tsx
var RedactedBody = __webpack_require__(576620);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/ViewSource.tsx
var ViewSource = __webpack_require__(473270);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ConfirmRedactDialog.tsx
var ConfirmRedactDialog = __webpack_require__(523677);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ErrorDialog.tsx
var ErrorDialog = __webpack_require__(705636);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/BaseDialog.js
var BaseDialog = __webpack_require__(308043);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Spinner.tsx
var Spinner = __webpack_require__(641542);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ConfirmAndWaitRedactDialog.tsx

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







/*
 * A dialog for confirming a redaction.
 * Also shows a spinner (and possible error) while the redaction is ongoing,
 * and only closes the dialog when the redaction is done or failed.
 *
 * This is done to prevent the edit history dialog racing with the redaction:
 * if this dialog closes and the MessageEditHistoryDialog is shown again,
 * it will fetch the relations again, which will race with the ongoing /redact request.
 * which will cause the edit to appear unredacted.
 *
 * To avoid this, we keep the dialog open as long as /redact is in progress.
 */
class ConfirmAndWaitRedactDialog extends react.PureComponent {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "onParentFinished", async proceed => {
      if (proceed) {
        this.setState({
          isRedacting: true
        });
        try {
          await this.props.redact();
          this.props.onFinished(true);
        } catch (error) {
          const code = error.errcode || error.statusCode;
          if (typeof code !== "undefined") {
            this.setState({
              redactionErrorCode: code
            });
          } else {
            this.props.onFinished(true);
          }
        }
      } else {
        this.props.onFinished(false);
      }
    });
    this.state = {
      isRedacting: false,
      redactionErrorCode: null
    };
  }
  render() {
    if (this.state.isRedacting) {
      if (this.state.redactionErrorCode) {
        const code = this.state.redactionErrorCode;
        return /*#__PURE__*/react.createElement(ErrorDialog/* default */.Z, {
          onFinished: this.props.onFinished,
          title: (0,languageHandler._t)('Error'),
          description: (0,languageHandler._t)('You cannot delete this message. (%(code)s)', {
            code
          })
        });
      } else {
        return /*#__PURE__*/react.createElement(BaseDialog/* default */.Z, {
          onFinished: this.props.onFinished,
          hasCancel: false,
          title: (0,languageHandler._t)("Removing…")
        }, /*#__PURE__*/react.createElement(Spinner/* default */.Z, null));
      }
    } else {
      return /*#__PURE__*/react.createElement(ConfirmRedactDialog/* default */.Z, {
        onFinished: this.onParentFinished
      });
    }
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/messages/EditHistoryMessage.js

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
















function getReplacedContent(event) {
  const originalContent = event.getOriginalContent();
  return originalContent["m.new_content"] || originalContent;
}
class EditHistoryMessage extends react.PureComponent {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "_onAssociatedStatusChanged", () => {
      this.setState({
        sendStatus: this.props.mxEvent.getAssociatedStatus()
      });
    });
    (0,defineProperty/* default */.Z)(this, "_onRedactClick", async () => {
      const event = this.props.mxEvent;
      const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
      Modal/* default */.Z.createTrackedDialog('Confirm Redact Dialog', 'Edit history', ConfirmAndWaitRedactDialog, {
        redact: () => cli.redactEvent(event.getRoomId(), event.getId())
      }, 'mx_Dialog_confirmredact');
    });
    (0,defineProperty/* default */.Z)(this, "_onViewSourceClick", () => {
      Modal/* default */.Z.createTrackedDialog('View Event Source', 'Edit history', ViewSource/* default */.Z, {
        mxEvent: this.props.mxEvent
      }, 'mx_Dialog_viewsource');
    });
    const _cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
    const {
      userId
    } = _cli.credentials;
    const _event = this.props.mxEvent;
    const room = _cli.getRoom(_event.getRoomId());
    if (_event.localRedactionEvent()) {
      _event.localRedactionEvent().on("status", this._onAssociatedStatusChanged);
    }
    const canRedact = room.currentState.maySendRedactionForEvent(_event, userId);
    this.state = {
      canRedact,
      sendStatus: _event.getAssociatedStatus()
    };
    this._content = /*#__PURE__*/(0,react.createRef)();
    this._pills = [];
  }
  pillifyLinks() {
    // not present for redacted events
    if (this._content.current) {
      pillifyLinks(this._content.current.children, this.props.mxEvent, this._pills);
    }
  }
  componentDidMount() {
    this.pillifyLinks();
  }
  componentWillUnmount() {
    unmountPills(this._pills);
    const event = this.props.mxEvent;
    if (event.localRedactionEvent()) {
      event.localRedactionEvent().off("status", this._onAssociatedStatusChanged);
    }
  }
  componentDidUpdate() {
    this.pillifyLinks();
  }
  _renderActionBar() {
    const AccessibleButton = src.getComponent('elements.AccessibleButton');
    // hide the button when already redacted
    let redactButton;
    if (!this.props.mxEvent.isRedacted() && !this.props.isBaseEvent && this.state.canRedact) {
      redactButton = /*#__PURE__*/react.createElement(AccessibleButton, {
        onClick: this._onRedactClick
      }, (0,languageHandler._t)("Remove"));
    }
    const viewSourceButton = /*#__PURE__*/react.createElement(AccessibleButton, {
      onClick: this._onViewSourceClick
    }, (0,languageHandler._t)("View Source"));
    // disabled remove button when not allowed
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_MessageActionBar"
    }, redactButton, viewSourceButton);
  }
  render() {
    const {
      mxEvent
    } = this.props;
    const content = getReplacedContent(mxEvent);
    let contentContainer;
    if (mxEvent.isRedacted()) {
      contentContainer = /*#__PURE__*/react.createElement(RedactedBody["default"], {
        mxEvent: this.props.mxEvent
      });
    } else {
      let contentElements;
      if (this.props.previousEdit) {
        contentElements = editBodyDiffToHtml(getReplacedContent(this.props.previousEdit), content);
      } else {
        contentElements = HtmlUtils/* bodyToHtml */.GM(content, null, {
          stripReplyFallback: true
        });
      }
      if (mxEvent.getContent().msgtype === "m.emote") {
        const name = mxEvent.sender ? mxEvent.sender.name : mxEvent.getSender();
        contentContainer = /*#__PURE__*/react.createElement("div", {
          className: "mx_EventTile_content",
          ref: this._content
        }, "*\xA0", /*#__PURE__*/react.createElement("span", {
          className: "mx_MEmoteBody_sender"
        }, name), "\xA0", contentElements);
      } else {
        contentContainer = /*#__PURE__*/react.createElement("div", {
          className: "mx_EventTile_content",
          ref: this._content
        }, contentElements);
      }
    }
    const timestamp = (0,DateUtils/* formatTime */.mr)(new Date(mxEvent.getTs()), this.props.isTwelveHour);
    const isSending = ['sending', 'queued', 'encrypting'].indexOf(this.state.sendStatus) !== -1;
    const classes = classnames_default()({
      "mx_EventTile": true,
      // Note: we keep the `sending` state class for tests, not for our styles
      "mx_EventTile_sending": isSending
    });
    return /*#__PURE__*/react.createElement("li", null, /*#__PURE__*/react.createElement("div", {
      className: classes
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_EventTile_line"
    }, /*#__PURE__*/react.createElement("span", {
      className: "mx_MessageTimestamp"
    }, timestamp), contentContainer, this._renderActionBar())));
  }
}
(0,defineProperty/* default */.Z)(EditHistoryMessage, "propTypes", {
  // the message event being edited
  mxEvent: prop_types_default().instanceOf(models_event/* MatrixEvent */.dC).isRequired,
  previousEdit: prop_types_default().instanceOf(models_event/* MatrixEvent */.dC),
  isBaseEvent: (prop_types_default()).bool
});
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/messages/DateSeparator.tsx
var DateSeparator = __webpack_require__(964586);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/ScrollPanel.tsx
var ScrollPanel = __webpack_require__(822507);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/MessageEditHistoryDialog.js

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








// import { replaceableComponent } from "../../../utils/replaceableComponent";




// @replaceableComponent("views.dialogs.MessageEditHistoryDialog")
class MessageEditHistoryDialog extends react.PureComponent {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "loadMoreEdits", async backwards => {
      if (backwards || !this.state.nextBatch && !this.state.isLoading) {
        // bail out on backwards as we only paginate in one direction
        return false;
      }
      const opts = {
        from: this.state.nextBatch
      };
      const roomId = this.props.mxEvent.getRoomId();
      const eventId = this.props.mxEvent.getId();
      const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
      let result;
      let resolve;
      let reject;
      const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      });
      try {
        result = await client.relations(roomId, eventId, "m.replace", "m.room.message", opts);
      } catch (error) {
        // log if the server returned an error
        if (error.errcode) {
          console.error("fetching /relations failed with error", error);
        }
        this.setState({
          error
        }, () => reject(error));
        return promise;
      }
      const newEvents = result.events;
      this._locallyRedactEventsIfNeeded(newEvents);
      this.setState({
        originalEvent: this.state.originalEvent || result.originalEvent,
        events: this.state.events.concat(newEvents),
        nextBatch: result.nextBatch,
        isLoading: false
      }, () => {
        const hasMoreResults = !!this.state.nextBatch;
        resolve(hasMoreResults);
      });
      return promise;
    });
    this.state = {
      originalEvent: null,
      error: null,
      events: [],
      nextBatch: null,
      isLoading: true,
      isTwelveHour: SettingsStore/* default */.C.getValue("showTwelveHourTimestamps")
    };
  }
  _locallyRedactEventsIfNeeded(newEvents) {
    const roomId = this.props.mxEvent.getRoomId();
    const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
    const room = client.getRoom(roomId);
    const pendingEvents = room.getPendingEvents();
    for (const e of newEvents) {
      const pendingRedaction = pendingEvents.find(pe => {
        return pe.getType() === "m.room.redaction" && pe.getAssociatedId() === e.getId();
      });
      if (pendingRedaction) {
        e.markLocallyRedacted(pendingRedaction);
      }
    }
  }
  componentDidMount() {
    this.loadMoreEdits();
  }
  _renderEdits() {
    const nodes = [];
    let lastEvent;
    let allEvents = this.state.events;
    // append original event when we've done last pagination
    if (this.state.originalEvent && !this.state.nextBatch) {
      allEvents = allEvents.concat(this.state.originalEvent);
    }
    const baseEventId = this.props.mxEvent.getId();
    allEvents.forEach((e, i) => {
      if (!lastEvent || (0,DateUtils/* wantsDateSeparator */.JC)(lastEvent.getDate(), e.getDate())) {
        nodes.push( /*#__PURE__*/react.createElement("li", {
          key: e.getTs() + "~"
        }, /*#__PURE__*/react.createElement(DateSeparator["default"], {
          ts: e.getTs()
        })));
      }
      const isBaseEvent = e.getId() === baseEventId;
      nodes.push( /*#__PURE__*/react.createElement(EditHistoryMessage, {
        key: e.getId(),
        previousEdit: !isBaseEvent ? allEvents[i + 1] : null,
        isBaseEvent: isBaseEvent,
        mxEvent: e,
        isTwelveHour: this.state.isTwelveHour
      }));
      lastEvent = e;
    });
    return nodes;
  }
  render() {
    let content;
    if (this.state.error) {
      const {
        error
      } = this.state;
      if (error.errcode === "M_UNRECOGNIZED") {
        content = /*#__PURE__*/react.createElement("p", {
          className: "mx_MessageEditHistoryDialog_error"
        }, (0,languageHandler._t)("Your homeserver doesn't seem to support this feature."));
      } else if (error.errcode) {
        // some kind of error from the homeserver
        content = /*#__PURE__*/react.createElement("p", {
          className: "mx_MessageEditHistoryDialog_error"
        }, (0,languageHandler._t)("Something went wrong!"));
      } else {
        content = /*#__PURE__*/react.createElement("p", {
          className: "mx_MessageEditHistoryDialog_error"
        }, (0,languageHandler._t)("Cannot reach homeserver"), /*#__PURE__*/react.createElement("br", null), (0,languageHandler._t)("Ensure you have a stable internet connection, or get in touch with the server admin"));
      }
    } else if (this.state.isLoading) {
      const Spinner = src.getComponent("elements.Spinner");
      content = /*#__PURE__*/react.createElement(Spinner, null);
    } else {
      content = /*#__PURE__*/react.createElement(ScrollPanel/* default */.Z, {
        className: "mx_MessageEditHistoryDialog_scrollPanel",
        onFillRequest: this.loadMoreEdits,
        stickyBottom: false,
        startAtBottom: false
      }, /*#__PURE__*/react.createElement("ul", {
        className: "mx_MessageEditHistoryDialog_edits"
      }, this._renderEdits()));
    }
    const BaseDialog = src.getComponent('views.dialogs.BaseDialog');
    return /*#__PURE__*/react.createElement(BaseDialog, {
      className: "mx_MessageEditHistoryDialog",
      hasCancel: true,
      onFinished: this.props.onFinished,
      title: (0,languageHandler._t)("Message edits")
    }, content);
  }
}
(0,defineProperty/* default */.Z)(MessageEditHistoryDialog, "propTypes", {
  mxEvent: (prop_types_default()).object.isRequired
});
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/editor/model.ts + 2 modules
var model = __webpack_require__(300252);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/editor/dom.ts
var dom = __webpack_require__(980680);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/editor/serialize.ts
var serialize = __webpack_require__(555461);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/EventUtils.ts
var EventUtils = __webpack_require__(26031);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/editor/deserialize.ts
var deserialize = __webpack_require__(906087);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/editor/parts.ts + 1 modules
var editor_parts = __webpack_require__(887403);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/BasicMessageComposer.tsx + 15 modules
var BasicMessageComposer = __webpack_require__(934735);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/contexts/MatrixClientContext.ts
var MatrixClientContext = __webpack_require__(311878);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/SlashCommands.tsx + 3 modules
var SlashCommands = __webpack_require__(662316);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/CountlyAnalytics.ts
var CountlyAnalytics = __webpack_require__(817826);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/KeyBindingsManager.ts + 1 modules
var KeyBindingsManager = __webpack_require__(481493);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/SendHistoryManager.ts
var SendHistoryManager = __webpack_require__(231124);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AccessibleButton.tsx
var AccessibleButton = __webpack_require__(805035);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/PermissionStore.ts
var PermissionStore = __webpack_require__(825291);
// EXTERNAL MODULE: ./node_modules/sendingme-ui/dist/index.js
var sendingme_ui_dist = __webpack_require__(602271);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/EditMessageComposer.tsx

/*
Copyright 2019 - 2021 The Matrix.org Foundation C.I.C.

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









function getHtmlReplyFallback(mxEvent) {
  const html = mxEvent.getContent().formatted_body;
  if (!html) {
    return "";
  }
  const rootNode = new DOMParser().parseFromString(html, "text/html").body;
  const mxReply = rootNode.querySelector("mx-reply");
  return mxReply && mxReply.outerHTML || "";
}
function getTextReplyFallback(mxEvent) {
  const body = mxEvent.getContent().body;
  const lines = body.split("\n").map(l => l.trim());
  if (lines.length > 2 && lines[0].startsWith("> ") && lines[1].length === 0) {
    return `${lines[0]}\n\n`;
  }
  return "";
}
function createEditContent(model, editedEvent) {
  const isEmote = (0,serialize/* containsEmote */.i$)(model);
  if (isEmote) {
    model = (0,serialize/* stripEmoteCommand */.b7)(model);
  }
  const isReply = !!editedEvent.replyEventId;
  let plainPrefix = "";
  let htmlPrefix = "";
  if (isReply) {
    plainPrefix = getTextReplyFallback(editedEvent);
    htmlPrefix = getHtmlReplyFallback(editedEvent);
  }
  const body = (0,serialize/* textSerialize */.$9)(model);
  let saveMessage;
  if (editedEvent.isSaveMessage()) {
    var _editedEvent$getConte;
    saveMessage = (_editedEvent$getConte = editedEvent.getContent()) === null || _editedEvent$getConte === void 0 ? void 0 : _editedEvent$getConte.save_message;
  }
  const newContent = {
    "msgtype": isEmote ? _types_event/* MsgType */.Zw.Emote : _types_event/* MsgType */.Zw.Text,
    "body": body
  };
  if (saveMessage) {
    newContent.save_message = saveMessage;
  }
  const contentBody = {
    msgtype: newContent.msgtype,
    body: `${plainPrefix} * ${body}`
  };
  const formattedBody = (0,serialize/* htmlSerializeIfNeeded */.Yi)(model, {
    forceHTML: isReply
  });
  if (formattedBody) {
    newContent.format = "org.matrix.custom.html";
    newContent.formatted_body = formattedBody;
    contentBody.format = newContent.format;
    contentBody.formatted_body = `${htmlPrefix} * ${formattedBody}`;
  }
  return Object.assign({
    "m.new_content": newContent,
    "m.relates_to": {
      "rel_type": "m.replace",
      "event_id": editedEvent.getId()
    }
  }, contentBody);
}
// @replaceableComponent("views.rooms.EditMessageComposer")
class EditMessageComposer extends react.Component {
  constructor(props, context) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "context", void 0);
    (0,defineProperty/* default */.Z)(this, "editorRef", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "dispatcherRef", void 0);
    (0,defineProperty/* default */.Z)(this, "model", null);
    (0,defineProperty/* default */.Z)(this, "onKeyDown", event => {
      var _this$editorRef$curre;
      // ignore any keypress while doing IME compositions
      if ((_this$editorRef$curre = this.editorRef.current) !== null && _this$editorRef$curre !== void 0 && _this$editorRef$curre.isComposing(event)) {
        return;
      }
      const action = (0,KeyBindingsManager/* getKeyBindingsManager */.zL)().getMessageComposerAction(event);
      switch (action) {
        case KeyBindingsManager/* MessageComposerAction */.XE.Send:
          this.sendEdit();
          event.preventDefault();
          break;
        case KeyBindingsManager/* MessageComposerAction */.XE.CancelEditing:
          this.cancelEdit();
          break;
        case KeyBindingsManager/* MessageComposerAction */.XE.EditPrevMessage:
          {
            var _this$editorRef$curre2, _this$editorRef$curre3;
            if ((_this$editorRef$curre2 = this.editorRef.current) !== null && _this$editorRef$curre2 !== void 0 && _this$editorRef$curre2.isModified() || !((_this$editorRef$curre3 = this.editorRef.current) !== null && _this$editorRef$curre3 !== void 0 && _this$editorRef$curre3.isCaretAtStart())) {
              return;
            }
            const previousEvent = (0,EventUtils/* findEditableEvent */.xJ)(this.getRoom(), false, this.props.editState.getEvent().getId());
            if (previousEvent) {
              dispatcher/* default */.ZP.dispatch({
                action: 'edit_event',
                event: previousEvent
              });
              event.preventDefault();
            }
            break;
          }
        case KeyBindingsManager/* MessageComposerAction */.XE.EditNextMessage:
          {
            var _this$editorRef$curre4, _this$editorRef$curre5;
            if ((_this$editorRef$curre4 = this.editorRef.current) !== null && _this$editorRef$curre4 !== void 0 && _this$editorRef$curre4.isModified() || !((_this$editorRef$curre5 = this.editorRef.current) !== null && _this$editorRef$curre5 !== void 0 && _this$editorRef$curre5.isCaretAtEnd())) {
              return;
            }
            const nextEvent = (0,EventUtils/* findEditableEvent */.xJ)(this.getRoom(), true, this.props.editState.getEvent().getId());
            if (nextEvent) {
              dispatcher/* default */.ZP.dispatch({
                action: 'edit_event',
                event: nextEvent
              });
            } else {
              this.clearStoredEditorState();
              dispatcher/* default */.ZP.dispatch({
                action: 'edit_event',
                event: null
              });
              dispatcher/* default */.ZP.fire(actions/* Action */.a.FocusSendMessageComposer);
            }
            event.preventDefault();
            break;
          }
      }
    });
    (0,defineProperty/* default */.Z)(this, "cancelEdit", () => {
      this.clearStoredEditorState();
      dispatcher/* default */.ZP.dispatch({
        action: "edit_event",
        event: null
      });
      dispatcher/* default */.ZP.fire(actions/* Action */.a.FocusSendMessageComposer);
    });
    (0,defineProperty/* default */.Z)(this, "saveStoredEditorState", () => {
      const item = SendHistoryManager/* default */.Z.createItem(this.model);
      this.clearPreviousEdit();
      localStorage.setItem(this.editorRoomKey, this.props.editState.getEvent().getId());
      localStorage.setItem(this.editorStateKey, JSON.stringify(item));
    });
    (0,defineProperty/* default */.Z)(this, "sendEdit", async () => {
      const room = this.getRoom();
      const slowModeCounting = room.slowModeCounting;
      const [canManageMessage] = PermissionStore/* default */.ZP.hasPermission(room.roomId, [PermissionStore/* PermissionMap */.$W.RoomManageMessage]);
      if (slowModeCounting && !canManageMessage) {
        this.cancelEdit();
        sendingme_ui_dist.SdMessage.warning("Sending too quickly");
        return;
      }
      const startTime = CountlyAnalytics/* default */.Z.getTimestamp();
      const editedEvent = this.props.editState.getEvent();

      // Replace emoticon at the end of the message
      if (SettingsStore/* default */.C.getValue('MessageComposerInput.autoReplaceEmoji')) {
        var _this$editorRef$curre6, _this$editorRef$curre7;
        const caret = (_this$editorRef$curre6 = this.editorRef.current) === null || _this$editorRef$curre6 === void 0 ? void 0 : _this$editorRef$curre6.getCaret();
        const position = this.model.positionForOffset(caret.offset, caret.atNodeEnd);
        (_this$editorRef$curre7 = this.editorRef.current) === null || _this$editorRef$curre7 === void 0 ? void 0 : _this$editorRef$curre7.replaceEmoticon(position, BasicMessageComposer/* REGEX_EMOTICON */.m);
      }
      const editContent = createEditContent(this.model, editedEvent);
      const newContent = editContent["m.new_content"];
      let shouldSend = true;

      // If content is modified then send an updated event into the room
      if (this.isContentModified(newContent)) {
        const roomId = editedEvent.getRoomId();
        if (!(0,serialize/* containsEmote */.i$)(this.model) && this.isSlashCommand()) {
          const [cmd, args, commandText] = this.getSlashCommand();
          if (cmd) {
            if (cmd.category === SlashCommands/* CommandCategories */.Mv.messages) {
              editContent["m.new_content"] = await this.runSlashCommand(cmd, args, roomId);
            } else {
              this.runSlashCommand(cmd, args, roomId);
              shouldSend = false;
            }
          } else {
            // ask the user if their unknown command should be sent as a message
            const {
              finished
            } = Modal/* default */.Z.createTrackedDialog("Unknown command", "", QuestionDialog/* default */.Z, {
              title: (0,languageHandler._t)("Unknown Command"),
              description: /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Unrecognised command: %(commandText)s", {
                commandText
              })), /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("You can use <code>/help</code> to list available commands. " + "Did you mean to send this as a message?", {}, {
                code: t => /*#__PURE__*/react.createElement("code", null, t)
              })), /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Hint: Begin your message with <code>//</code> to start it with a slash.", {}, {
                code: t => /*#__PURE__*/react.createElement("code", null, t)
              }))),
              button: (0,languageHandler._t)('Send as message')
            });
            const [sendAnyway] = await finished;
            // if !sendAnyway bail to let the user edit the composer and try again
            if (!sendAnyway) return;
          }
        }
        if (shouldSend) {
          this.cancelPreviousPendingEdit();
          const prom = this.context.sendMessage(roomId, editContent);
          this.clearStoredEditorState();
          dispatcher/* default */.ZP.dispatch({
            action: "message_sent"
          });
          CountlyAnalytics/* default */.Z.instance.trackSendMessage(startTime, prom, roomId, true, false, editContent);
        }
      }

      // close the event editing and focus composer
      dispatcher/* default */.ZP.dispatch({
        action: "edit_event",
        event: null
      });
      dispatcher/* default */.ZP.fire(actions/* Action */.a.FocusSendMessageComposer);
    });
    (0,defineProperty/* default */.Z)(this, "onChange", () => {
      var _this$editorRef$curre8;
      if (!this.state.saveDisabled || !((_this$editorRef$curre8 = this.editorRef.current) !== null && _this$editorRef$curre8 !== void 0 && _this$editorRef$curre8.isModified())) {
        return;
      }
      this.setState({
        saveDisabled: false
      });
    });
    (0,defineProperty/* default */.Z)(this, "onAction", payload => {
      if (payload.action === "edit_composer_insert" && this.editorRef.current) {
        if (payload.userId) {
          var _this$editorRef$curre9;
          (_this$editorRef$curre9 = this.editorRef.current) === null || _this$editorRef$curre9 === void 0 ? void 0 : _this$editorRef$curre9.insertMention(payload.userId);
        } else if (payload.event) {
          var _this$editorRef$curre10;
          (_this$editorRef$curre10 = this.editorRef.current) === null || _this$editorRef$curre10 === void 0 ? void 0 : _this$editorRef$curre10.insertQuotedMessage(payload.event);
        } else if (payload.text) {
          var _this$editorRef$curre11;
          (_this$editorRef$curre11 = this.editorRef.current) === null || _this$editorRef$curre11 === void 0 ? void 0 : _this$editorRef$curre11.insertPlaintext(payload.text);
        }
      } else if (payload.action === actions/* Action */.a.FocusEditMessageComposer && this.editorRef.current) {
        this.editorRef.current.focus();
      }
    });
    this.context = context; // otherwise React will only set it prior to render due to type def above

    const isRestored = this.createEditorModel();
    const ev = this.props.editState.getEvent();
    this.state = {
      saveDisabled: !isRestored || !this.isContentModified(createEditContent(this.model, ev)["m.new_content"])
    };
    window.addEventListener("beforeunload", this.saveStoredEditorState);
    this.dispatcherRef = dispatcher/* default */.ZP.register(this.onAction);
  }
  getRoom() {
    return this.context.getRoom(this.props.editState.getEvent().getRoomId());
  }
  get editorRoomKey() {
    return `mx_edit_room_${this.getRoom().roomId}`;
  }
  get editorStateKey() {
    return `mx_edit_state_${this.props.editState.getEvent().getId()}`;
  }
  get shouldSaveStoredEditorState() {
    return localStorage.getItem(this.editorRoomKey) !== null;
  }
  restoreStoredEditorState(partCreator) {
    const json = localStorage.getItem(this.editorStateKey);
    if (json) {
      try {
        const {
          parts: serializedParts
        } = JSON.parse(json);
        const parts = serializedParts.map(p => partCreator.deserializePart(p));
        return parts;
      } catch (e) {
        console.error("Error parsing editing state: ", e);
      }
    }
  }
  clearStoredEditorState() {
    localStorage.removeItem(this.editorRoomKey);
    localStorage.removeItem(this.editorStateKey);
  }
  clearPreviousEdit() {
    if (localStorage.getItem(this.editorRoomKey)) {
      localStorage.removeItem(`mx_edit_state_${localStorage.getItem(this.editorRoomKey)}`);
    }
  }
  isSlashCommand() {
    const parts = this.model.parts;
    const firstPart = parts[0];
    if (firstPart) {
      if (firstPart.type === editor_parts/* Type */.Dy.Command && firstPart.text.startsWith("/") && !firstPart.text.startsWith("//")) {
        return true;
      }
      if (firstPart.text.startsWith("/") && !firstPart.text.startsWith("//") && (firstPart.type === editor_parts/* Type */.Dy.Plain || firstPart.type === editor_parts/* Type */.Dy.PillCandidate)) {
        return true;
      }
    }
    return false;
  }
  isContentModified(newContent) {
    // if nothing has changed then bail
    const oldContent = this.props.editState.getEvent().getContent();
    if (oldContent["msgtype"] === newContent["msgtype"] && oldContent["body"] === newContent["body"] && oldContent["format"] === newContent["format"] && oldContent["formatted_body"] === newContent["formatted_body"]) {
      return false;
    }
    return true;
  }
  getSlashCommand() {
    const commandText = this.model.parts.reduce((text, part) => {
      // use mxid to textify user pills in a command
      if (part.type === editor_parts/* Type */.Dy.UserPill) {
        return text + part.resourceId;
      }
      return text + part.text;
    }, "");
    const {
      cmd,
      args
    } = (0,SlashCommands/* getCommand */.hW)(commandText);
    return [cmd, args, commandText];
  }
  async runSlashCommand(cmd, args, roomId) {
    const result = cmd.run(roomId, args, cmd.program);
    let messageContent;
    let error = result.error;
    if (result.promise) {
      try {
        if (cmd.category === SlashCommands/* CommandCategories */.Mv.messages) {
          messageContent = await result.promise;
        } else {
          await result.promise;
        }
      } catch (err) {
        error = err;
      }
    }
    if (error) {
      console.error("Command failure: %s", error);
      // assume the error is a server error when the command is async
      const isServerError = !!result.promise;
      const title = isServerError ? (0,languageHandler/* _td */.I8)("Server error") : (0,languageHandler/* _td */.I8)("Command error");
      let errText;
      if (typeof error === 'string') {
        errText = error;
      } else if (error.message) {
        errText = error.message;
      } else {
        errText = (0,languageHandler._t)("Server unavailable, overloaded, or something else went wrong.");
      }
      Modal/* default */.Z.createTrackedDialog(title, '', ErrorDialog/* default */.Z, {
        title: (0,languageHandler._t)(title),
        description: errText
      });
    } else {
      console.log("Command success.");
      if (messageContent) return messageContent;
    }
  }
  cancelPreviousPendingEdit() {
    const originalEvent = this.props.editState.getEvent();
    const previousEdit = originalEvent.replacingEvent();
    if (previousEdit && (previousEdit.status === models_event/* EventStatus */.N3.QUEUED || previousEdit.status === models_event/* EventStatus */.N3.NOT_SENT)) {
      this.context.cancelPendingEvent(previousEdit);
    }
  }
  componentWillUnmount() {
    // store caret and serialized parts in the
    // editorstate so it can be restored when the remote echo event tile gets rendered
    // in case we're currently editing a pending event
    const sel = document.getSelection();
    let caret;
    if (sel.focusNode) {
      var _this$editorRef$curre12;
      caret = (0,dom/* getCaretOffsetAndText */.Aq)((_this$editorRef$curre12 = this.editorRef.current) === null || _this$editorRef$curre12 === void 0 ? void 0 : _this$editorRef$curre12.editorRef.current, sel).caret;
    }
    const parts = this.model.serializeParts();
    // if caret is undefined because for some reason there isn't a valid selection,
    // then when mounting the editor again with the same editor state,
    // it will set the cursor at the end.
    this.props.editState.setEditorState(caret, parts);
    window.removeEventListener("beforeunload", this.saveStoredEditorState);
    if (this.shouldSaveStoredEditorState) {
      this.saveStoredEditorState();
    }
    dispatcher/* default */.ZP.unregister(this.dispatcherRef);
  }
  createEditorModel() {
    const {
      editState
    } = this.props;
    const room = this.getRoom();
    const partCreator = new editor_parts/* CommandPartCreator */.w8(room, this.context);
    let parts;
    let isRestored = false;
    if (editState.hasEditorState()) {
      // if restoring state from a previous editor,
      // restore serialized parts from the state
      parts = editState.getSerializedParts().map(p => partCreator.deserializePart(p));
    } else {
      // otherwise, either restore serialized parts from localStorage or parse the body of the event
      const restoredParts = this.restoreStoredEditorState(partCreator);
      parts = restoredParts || (0,deserialize/* parseEvent */.E)(editState.getEvent(), partCreator);
      isRestored = !!restoredParts;
    }
    this.model = new model/* default */.Z(parts, partCreator);
    this.saveStoredEditorState();
    return isRestored;
  }
  render() {
    return /*#__PURE__*/react.createElement("div", {
      className: classnames_default()("mx_EditMessageComposer", this.props.className),
      onKeyDown: this.onKeyDown
    }, /*#__PURE__*/react.createElement(BasicMessageComposer/* default */.Z, {
      ref: this.editorRef,
      model: this.model,
      room: this.getRoom(),
      initialCaret: this.props.editState.getCaret(),
      label: (0,languageHandler._t)("Edit message"),
      onChange: this.onChange
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_EditMessageComposer_buttons"
    }, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      kind: "secondary",
      onClick: this.cancelEdit
    }, (0,languageHandler._t)("Cancel")), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      kind: "primary",
      onClick: this.sendEdit,
      disabled: this.state.saveDisabled
    }, (0,languageHandler._t)("Save"))));
  }
}
(0,defineProperty/* default */.Z)(EditMessageComposer, "contextType", MatrixClientContext/* default */.Z);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/useStateToggle.ts
var useStateToggle = __webpack_require__(681638);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/useAsyncMemo.ts
var useAsyncMemo = __webpack_require__(348855);
// EXTERNAL MODULE: ./node_modules/@hiseas/react/dist/index.js
var react_dist = __webpack_require__(989638);
// EXTERNAL MODULE: ./node_modules/events/events.js
var events = __webpack_require__(717187);
var events_default = /*#__PURE__*/__webpack_require__.n(events);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/stores/NftFavoriteStore.ts

var _class;


class NftFavoriteStore extends (events_default()) {
  constructor(...args) {
    super(...args);
    (0,defineProperty/* default */.Z)(this, "statusMap", new Map());
  }
  getStatus(address, tokenId) {
    const key = `${address}_${tokenId}`;
    if (this.statusMap.has(key)) {
      return this.statusMap.get(key);
    }
    const promise = MatrixClientPeg/* MatrixClientPeg */.p.get().getNftCheck(address, tokenId).then(res => {
      return res.is_favorite;
    });
    this.statusMap.set(key, promise);
    return promise;
  }
  add(address, tokenId) {
    const key = `${address}_${tokenId}`;
    this.statusMap.delete(key);
    return MatrixClientPeg/* MatrixClientPeg */.p.get().addNft(address, tokenId).then(() => {
      this.emit('StatusChanged', address, tokenId, true);
    });
  }
  remove(address, tokenId) {
    const key = `${address}_${tokenId}`;
    this.statusMap.delete(key);
    return MatrixClientPeg/* MatrixClientPeg */.p.get().deleteNft([{
      address,
      tokenId
    }]).then(() => {
      this.emit('StatusChanged', address, tokenId, false);
    });
  }
  static get instance() {
    if (!NftFavoriteStore.internalInstance) {
      NftFavoriteStore.internalInstance = new NftFavoriteStore();
    }
    return NftFavoriteStore.internalInstance;
  }
}
_class = NftFavoriteStore;
(0,defineProperty/* default */.Z)(NftFavoriteStore, "internalInstance", void 0);
/* harmony default export */ const stores_NftFavoriteStore = (NftFavoriteStore);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/UserSettingsDialog.tsx + 47 modules
var UserSettingsDialog = __webpack_require__(449878);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/RightPanelStorePhases.ts
var RightPanelStorePhases = __webpack_require__(274057);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/SdkConfig.ts
var SdkConfig = __webpack_require__(374312);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/customisations/Media.ts + 1 modules
var Media = __webpack_require__(834208);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/token.ts
var token = __webpack_require__(732094);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/avatar.ts
var utils_avatar = __webpack_require__(9266);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/panelcontent/TokenGatedRequirement.tsx
var TokenGatedRequirement = __webpack_require__(872607);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/avatars/OverLapMembersAvatar.tsx
var OverLapMembersAvatar = __webpack_require__(486011);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/SdmCard.tsx


// import { replaceableComponent } from "../../../utils/replaceableComponent";







// @replaceableComponent("views.messages.SdmCard")
class SdmCard extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "onImageError", ({
      currentTarget
    }) => {
      currentTarget.onerror = null; // prevents looping
      currentTarget.src = "";
      currentTarget.style.display = "none";
      this.setState({
        imageError: true
      });
    });
    (0,defineProperty/* default */.Z)(this, "render", () => {
      var _this$props$descripti;
      let avatar;
      if (this.props.avatar) {
        avatar = (0,Media/* mediaFromMxc */.TS)(this.props.avatar).srcHttp;
      }
      const type = this.props.type;
      let walletAddress;
      if (type === "user") {
        walletAddress = (0,token/* formatWallet */.Tl)(this.props.description);
      }
      const template = this.props.template;
      const style = {};
      if (this.props.siteIcon) {
        style["--siteIcon"] = `url(${this.props.siteIcon})`;
      }
      let urls = [];
      if (this.props.members) {
        this.props.members.map(member => {
          if (member.avatar_url) {
            const avatarUrl = (0,Media/* mediaFromMxc */.TS)(member.avatar_url).srcHttp;
            urls.push({
              url: avatarUrl || member.avatar_url
            });
          } else {
            const defaultAvatarUrl = (0,utils_avatar/* getDefaultAvatar */.W)({
              id: member.user_id
            });
            urls.push({
              url: defaultAvatarUrl
            });
          }
        });
      }
      let description;
      description = (_this$props$descripti = this.props.description) === null || _this$props$descripti === void 0 ? void 0 : _this$props$descripti.replace(/\\n/g, "\n");
      let verticalSdmCardBg = /*#__PURE__*/react.createElement(react.Fragment, null, this.props.avatar && !this.state.imageError ? /*#__PURE__*/react.createElement("div", {
        className: "mx_SdmCard_avatar-bg",
        style: {
          backgroundImage: `url(${avatar || this.props.avatar})`
        }
      }) : null);
      let horizontalSdmCardBg = /*#__PURE__*/react.createElement(react.Fragment, null, this.props.avatar && !this.state.imageError ? /*#__PURE__*/react.createElement("div", {
        className: "mx_SdmCard_avatar_horizontal-bg",
        style: {
          backgroundImage: `url(${avatar || this.props.avatar})`
        }
      }) : null);
      let header;
      if (!template || template === "vertical") {
        var _this$props;
        header = /*#__PURE__*/react.createElement(react.Fragment, null, this.props.avatar && /*#__PURE__*/react.createElement("div", {
          className: classnames_default()({
            mx_SdmCard_avatar: true,
            nofill: this.props.isFill === false
          })
        }, /*#__PURE__*/react.createElement("img", {
          src: avatar || this.props.avatar,
          style: {
            borderRadius: "12px",
            zIndex: 2,
            width: "100%"
          },
          onError: this.onImageError
        })), !this.props.avatar && type === "room" && /*#__PURE__*/react.createElement("div", {
          className: classnames_default()({
            mx_SdmCard_avatar: true,
            nofill: this.props.isFill === false
          })
        }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdAvatar, {
          name: this.props.title,
          id: (_this$props = this.props) === null || _this$props === void 0 ? void 0 : _this$props.cardButton,
          type: "defined",
          size: this.props.isFill === false ? 210 : 240,
          radius: 12
        })), !this.props.avatar && this.props.app && !type && !this.state.imageError && /*#__PURE__*/react.createElement("div", {
          className: classnames_default()({
            mx_SdmCard_avatar: true,
            nofill: this.props.isFill === false
          })
        }, /*#__PURE__*/react.createElement("img", {
          src: this.props.app.app_logo,
          onError: this.onImageError,
          style: {
            borderRadius: "12px",
            zIndex: 2,
            width: "100%"
          }
        })), /*#__PURE__*/react.createElement("div", {
          className: classnames_default()({
            mx_SdmCard_title: true,
            ens: this.props.ens === 1
          })
        }, this.props.title), /*#__PURE__*/react.createElement(TokenGatedRequirement/* TokenGatedSdmCardDescription */.o, {
          description: walletAddress || description || this.props.description,
          type: type,
          link: this.props.link
        }), this.props.members ? /*#__PURE__*/react.createElement(OverLapMembersAvatar/* OverLapMembersAvatar */.l, {
          members: this.props.members,
          avatarSize: 26
        }) : null);
      } else if (template === "horizontal") {
        var _this$props2;
        header = /*#__PURE__*/react.createElement("div", {
          className: "mx_SdmCard_header"
        }, this.props.avatar && !this.state.imageError && /*#__PURE__*/react.createElement("div", {
          className: "mx_SdmCard_avatar_horizontal"
        }, /*#__PURE__*/react.createElement("img", {
          src: avatar || this.props.avatar,
          onError: this.onImageError,
          style: {
            borderRadius: "12px",
            zIndex: 2,
            width: "100%"
          }
        })), !this.props.avatar && type === "room" && /*#__PURE__*/react.createElement("div", {
          className: "mx_SdmCard_avatar_horizontal"
        }, /*#__PURE__*/react.createElement(sendingme_ui_dist.SdAvatar, {
          name: this.props.title,
          id: (_this$props2 = this.props) === null || _this$props2 === void 0 ? void 0 : _this$props2.cardButton,
          type: "defined",
          size: 83,
          radius: 12
        })), !this.props.avatar && this.props.app && !type && !this.state.imageError && /*#__PURE__*/react.createElement("div", {
          className: "mx_SdmCard_avatar_horizontal"
        }, /*#__PURE__*/react.createElement("img", {
          src: this.props.app.app_logo,
          onError: this.onImageError,
          style: {
            borderRadius: "12px",
            zIndex: 2,
            width: "100%"
          }
        })), /*#__PURE__*/react.createElement("div", {
          className: "mx_SdmCard_content"
        }, /*#__PURE__*/react.createElement("div", {
          className: classnames_default()({
            mx_SdmCard_title_horizontal: true,
            ens: this.props.ens === 1
          })
        }, this.props.title), /*#__PURE__*/react.createElement("div", {
          className: "mx_SdmCard_description_horizontal"
        }, walletAddress || description || this.props.description)));
      }
      let tag;
      if (this.props.tagIcon || this.props.tagDescription) {
        var _this$props$app;
        const isAvatar = this.props.avatar || ((_this$props$app = this.props.app) === null || _this$props$app === void 0 ? void 0 : _this$props$app.app_logo);
        tag = /*#__PURE__*/react.createElement("div", {
          className: classnames_default()("mx_SdmCard_tag", {
            mx_SdmCard_other_tag: !isAvatar,
            mx_SdmCard_avatar_tag: isAvatar
          })
        }, isAvatar ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("img", {
          src: this.props.tagIcon
        }), /*#__PURE__*/react.createElement("span", null, this.props.tagDescription)) : /*#__PURE__*/react.createElement("div", {
          className: "mx_SdmCard_tag_wrapped"
        }, /*#__PURE__*/react.createElement("img", {
          src: this.props.tagIcon
        }), /*#__PURE__*/react.createElement("span", null, this.props.tagDescription)));
      }
      let footer;
      let button;
      if (this.props.cardButton) {
        button = /*#__PURE__*/react.createElement("img", {
          onClick: this.props.onClick,
          src: this.props.cardButton,
          className: "mx_SdmCard_type_button"
        });
      }
      if (this.props.siteIcon && this.props.siteName) {
        footer = /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
          className: "mx_SdmCard_divider"
        }), /*#__PURE__*/react.createElement("div", {
          className: "mx_SdmCard_type"
        }, /*#__PURE__*/react.createElement("img", {
          src: this.props.siteIcon,
          className: "mx_SdmCard_type_icon"
        }), this.props.siteName, button));
      } else if (this.props.app) {
        footer = /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
          className: "mx_SdmCard_divider"
        }), /*#__PURE__*/react.createElement("div", {
          className: "mx_SdmCard_type"
        }, /*#__PURE__*/react.createElement("img", {
          src: this.props.app.app_logo,
          className: "mx_SdmCard_type_icon"
        }), this.props.app.app_name, button));
      }
      return /*#__PURE__*/react.createElement("div", {
        className: classnames_default()({
          mx_SdmCard: true,
          horizontal: template === "horizontal"
        }),
        onClick: this.props.onClick
      }, !template || template === "vertical" ? verticalSdmCardBg : template === "horizontal" ? horizontalSdmCardBg : null, tag, header, footer);
    });
    this.state = {
      imageError: false
    };
  }
}
/* harmony default export */ const rooms_SdmCard = (SdmCard);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(166644);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(992619);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/avatars/BaseAvatar.tsx
var avatars_BaseAvatar = __webpack_require__(56607);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/snapshot/SnapshotProposalItem.tsx





const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// 时间单位是秒
const getDateRange = (start, end) => {
  const _start = new Date(start * 1000);
  const _end = new Date(end * 1000);
  const startM = _start.getMonth();
  const startY = _start.getFullYear();
  const endM = _end.getMonth();
  const endY = _end.getFullYear();
  if (startM === endM && startY === endY) {
    return `${month[_start.getMonth()]} ${_start.getDate()}-${_end.getDate()}, ${startY}`;
  } else if (startM !== endM && startY === endY) {
    return `${month[_start.getMonth()]} ${_start.getDate()}-${month[_end.getMonth()]} ${_end.getDate()}, ${startY}`;
  } else {
    return `${month[_start.getMonth()]} ${_start.getDate()}, ${startY}-${month[_end.getMonth()]} ${_end.getDate()}, ${endY}`;
  }
};
const numberFormat = num => {
  if (num > 10000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num;
};
const firstUpperCase = str => {
  if (str) {
    return (str === null || str === void 0 ? void 0 : str.slice(0, 1).toUpperCase()) + (str === null || str === void 0 ? void 0 : str.slice(1));
  }
  return "";
};
const SnapshotProposlItem = props => {
  const {
    title,
    id,
    space,
    // eslint-disable-next-line camelcase
    author_profile,
    start,
    end,
    // eslint-disable-next-line camelcase
    vote_details = [],
    votes,
    state
  } = props;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "mx_Proposal_card_item",
    key: id,
    onClick: () => {
      dis.dispatch({
        action: Action.SetRightPanelPhase,
        phase: RightPanelPhases.IframeWidget,
        refireParams: {
          params: {
            src: `https://snapshot.sending.me/#/${space.id}/proposal/${id}`,
            title: "Snapshot"
          }
        }
      });
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "mx_Proposal_card_title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "mx_Proposal_card_publisher"
  }, /*#__PURE__*/React.createElement("img", {
    src: author_profile.avatar,
    alt: author_profile.name
  }), author_profile.name), /*#__PURE__*/React.createElement("p", {
    className: "mx_Proposal_card_date"
  }, getDateRange(start, end)), /*#__PURE__*/React.createElement("div", {
    className: "mx_Proposal_card_voter"
  }, vote_details.slice(0, 3).map(voter => /*#__PURE__*/React.createElement(BaseAvatar, {
    key: voter.voter,
    url: voter.avatar,
    name: voter.voter,
    width: 20,
    height: 20
  })), "\xA0", numberFormat(votes), " people voted"), /*#__PURE__*/React.createElement("span", {
    className: "mx_Proposal_card_status"
  }, firstUpperCase(state))));
};
/* harmony default export */ const SnapshotProposalItem = ((/* unused pure expression or super */ null && (SnapshotProposlItem)));
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/snapshot/SnapshotActivityCard.tsx


const _excluded = ["title", "proposalId", "spaceId", "authorName", "authorAvatar", "start", "end", "voteAvatars", "votes", "state", "siteName", "siteIcon"];


const SnapshotActivityCard = _ref => {
  let {
      title,
      proposalId,
      spaceId,
      authorName,
      authorAvatar,
      start,
      end,
      voteAvatars,
      votes,
      state,
      siteName,
      siteIcon
    } = _ref,
    resetProps = (0,objectWithoutProperties/* default */.Z)(_ref, _excluded);
  return /*#__PURE__*/react.createElement("div", (0,esm_extends/* default */.Z)({
    className: "mx_Proposal_card_item mx_Proposal_card_preview",
    key: proposalId
  }, resetProps), /*#__PURE__*/react.createElement("h3", {
    className: "mx_Proposal_card_title"
  }, title), /*#__PURE__*/react.createElement("p", {
    className: "mx_Proposal_card_publisher"
  }, /*#__PURE__*/react.createElement("img", {
    src: authorAvatar,
    alt: authorName
  }), authorName), /*#__PURE__*/react.createElement("p", {
    className: "mx_Proposal_card_date"
  }, getDateRange(start, end)), /*#__PURE__*/react.createElement("div", {
    className: "mx_Proposal_card_voter"
  }, voteAvatars.slice(0, 3).map(item => /*#__PURE__*/react.createElement("img", {
    key: item,
    src: item
  })), "\xA0", numberFormat(votes), " people voted"), /*#__PURE__*/react.createElement("span", {
    className: "mx_Proposal_card_status"
  }, firstUpperCase(state)), /*#__PURE__*/react.createElement("div", {
    className: "mx_Proposal_card_site_type"
  }, /*#__PURE__*/react.createElement("span", null, siteName)));
};
/* harmony default export */ const snapshot_SnapshotActivityCard = (SnapshotActivityCard);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/UrlUtils.ts
var UrlUtils = __webpack_require__(58238);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/GroupNoteCard.tsx


const GroupNoteCard = props => {
  const {
    base_info: baseInfo = {},
    joined_content_list: notes = []
  } = props.content || {};
  const renderContent = () => {
    return notes.map((item, index) => {
      return /*#__PURE__*/react.createElement("div", {
        key: index
      }, index + 1, ". ", item.content);
    });
  };
  return /*#__PURE__*/react.createElement("div", {
    key: "GroupNoteCard",
    className: "mx_GroupNoteCard"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_GroupNoteCard_content"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_GroupNoteCard_title"
  }, baseInfo.title || ""), /*#__PURE__*/react.createElement("div", {
    className: "mx_GroupNoteCard_description"
  }, baseInfo.description || "", baseInfo.layout ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("br", null), "EX. ", baseInfo.layout) : null), renderContent(), props.timestamp), /*#__PURE__*/react.createElement("div", {
    className: "mx_GroupNoteCard_action",
    onClick: props.onClick
  }, (0,languageHandler._t)("Join Group Note")));
};
/* harmony default export */ const rooms_GroupNoteCard = (GroupNoteCard);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/activity/zoom_view/util.ts
var util = __webpack_require__(781373);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/activity/zoom_view/ZoomPreviewCard.tsx


const ZoomPreviewCard = /*#__PURE__*/(0,react.memo)(props => {
  const {
    title,
    meetingNumber,
    url
  } = props;
  const _onJoinMeeting = () => {
    window.open(url, "_balnk");
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_ZoomPreviewCard"
  }, /*#__PURE__*/react.createElement("header", null, /*#__PURE__*/react.createElement("span", {
    className: "mx_ZoomPreviewCard-tag"
  }, "zoom")), /*#__PURE__*/react.createElement("h2", {
    className: "mx_ZoomPreviewCard-title"
  }, title), /*#__PURE__*/react.createElement("p", {
    className: "mx_ZoomPreviewCard-meetingNumber"
  }, "Code ", (0,util/* formatMeetingNumber */.Xy)(meetingNumber)), /*#__PURE__*/react.createElement("span", {
    role: "button",
    className: "mx_ZoomPreviewCard-button",
    onClick: _onJoinMeeting
  }, "Join Meeting"));
});
/* harmony default export */ const zoom_view_ZoomPreviewCard = (ZoomPreviewCard);
// EXTERNAL MODULE: ./node_modules/lodash-es/last.js
var last = __webpack_require__(200935);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/preview_card/handles/twitter.ts





function onCardClick(preview, mxEvent, link) {
  onIconClick(preview, mxEvent);
  const url = new URL(link);
  const spaceId = (0,last/* default */.Z)(url.pathname.split("/"));
  dispatcher/* default */.ZP.dispatch({
    action: actions/* Action */.a.SetRightPanelPhase,
    phase: RightPanelStorePhases/* RightPanelPhases */.q4.XSpace,
    refireParams: {
      params: {
        preview,
        xSpaceUrl: link,
        roomId: mxEvent === null || mxEvent === void 0 ? void 0 : mxEvent.getRoomId(),
        xSpaceId: spaceId
      }
    }
  });
}
function onHeaderClick(preview) {}
function onContentClick(preview) {}
function onFooterClick(preview) {}
async function onIconClick(preview, mxEvent) {
  const cardButton = preview["og:card_button"];
  const spaceId = preview["og:card_id"];
  const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
  if (cardButton) {
    client.getTwitterSpace(spaceId).then(res => {
      if (res !== null && res !== void 0 && res.source) {
        dispatcher/* default */.ZP.dispatch({
          action: "twitter_space_play",
          playerParams: {
            title: preview["og:title"],
            host: preview["og:host:name"],
            count: preview["og:participant:count"],
            url: preview["og:url"],
            streamParams: res,
            room: client.getRoom(mxEvent.getRoomId())
          }
        });
      } else {
        // message.error("This space has no audio source to play!");
      }
    }).catch(err => {
      // message.error("Sorry! We can't get the space audio source.");
    });
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/preview_card/handles/soshow.ts
var soshow = __webpack_require__(935423);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/preview_card/handles/live.ts

function live_onCardClick(preview, mxEvent, link) {
  live_onIconClick(preview, mxEvent);
  const roomUrl = preview["og:url"];
  const url = new URL(roomUrl);
  const roomId = url.hash.replace(/^#\/room\//, "");
  if (roomId === mxEvent.getRoomId()) {
    dispatcher/* default */.ZP.dispatch({
      action: "show_live_view",
      roomId: roomId
    });
  } else {
    dispatcher/* default */.ZP.dispatch({
      action: "view_room",
      room_id: roomId
    });
  }
}
function live_onHeaderClick(preview) {}
function live_onContentClick(preview) {}
function live_onFooterClick(preview) {}
async function live_onIconClick(preview, mxEvent) {}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/preview_card/eventHandles.ts



const eventHandles = {
  twitter: twitter_namespaceObject,
  soshow: soshow,
  "sdl live": live_namespaceObject
};
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/useUserAvatar.ts
var useUserAvatar = __webpack_require__(391952);
// EXTERNAL MODULE: ./node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(727484);
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);
// EXTERNAL MODULE: ./node_modules/lodash-es/upperFirst.js
var upperFirst = __webpack_require__(611288);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/preview_card/ActivityCard.tsx

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }







const ActivityCard = props => {
  const {
    preview,
    link,
    mxEvent,
    wrapClassName,
    style
  } = props;
  const tagIcon = preview["og:tag_icon"];
  const tagDescription = preview["og:tag_description"];
  const title = preview["og:title"];
  const hostName = preview["og:host:name"];
  const hostAvatar = preview["og:host:avatar"];
  const date = preview["og:date"];
  const location = preview["og:location"];
  const participantAvatar = preview["og:participant:avatar[]"];
  const participantCount = preview["og:participant:count"];
  const siteIcon = preview["og:site_icon"];
  const siteName = preview["og:site_name"];
  const cardButton = preview["og:card_button"];
  const bgImage = preview["og:background_image"];
  const handle = eventHandles[siteName.toLowerCase()];
  const isEnded = (tagDescription === null || tagDescription === void 0 ? void 0 : tagDescription.toLowerCase()) === "ended";
  const isLive = (tagDescription === null || tagDescription === void 0 ? void 0 : tagDescription.toLowerCase()) === "live";
  const isNotStart = !isEnded && !isLive;
  const defUserIcon = __webpack_require__(317523);
  const cardBtnImg = (0,useUserAvatar/* useImage */.d9)(cardButton);
  const cardBtnStyle = cardBtnImg.status === "success" ? {
    ["--sdm-preview-card-btn-icon"]: `url(${cardBtnImg.url})`
  } : {};
  const siteIconStyle = /twitter/i.test(siteName) ? {} : {
    "--sdm-preview-site-icon": `url(${siteIcon})`
  };
  const onCardClick = ev => {
    var _handle$onCardClick;
    ev.stopPropagation();
    handle === null || handle === void 0 ? void 0 : (_handle$onCardClick = handle.onCardClick) === null || _handle$onCardClick === void 0 ? void 0 : _handle$onCardClick.call(handle, preview, mxEvent, link);
  };
  let containerStyle = _objectSpread({}, style);
  if (bgImage) {
    containerStyle = _objectSpread(_objectSpread({}, style), {}, {
      background: `url(${bgImage}) center no-repeat`,
      backgroundSize: "cover"
    });
  }
  return /*#__PURE__*/react.createElement("div", {
    key: "activityCard",
    className: classnames_default()({
      mx_PreviewCard: true,
      mx_ActivityPreviewCard: true,
      mx_ActivityNotStart: isNotStart,
      mx_ActivityEnded: isEnded,
      [wrapClassName]: !!wrapClassName
    }),
    style: containerStyle,
    "data-area": "card",
    onClick: onCardClick
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_PreviewCard_header apc_header",
    "data-area": "header"
  }, (tagIcon || tagDescription) && /*#__PURE__*/react.createElement("div", {
    className: "tag"
  }, tagIcon || isLive && /*#__PURE__*/react.createElement("span", {
    className: "tag-icon",
    style: {
      maskImage: `url(${tagIcon || __webpack_require__(996344)})`
    }
  }), tagDescription === "scheduled" ? "Upcoming" : (0,upperFirst/* default */.Z)(tagDescription)), /*#__PURE__*/react.createElement("div", {
    className: "title"
  }, title)), /*#__PURE__*/react.createElement("div", {
    className: "mx_PreviewCard_content apc-content",
    "data-area": "content"
  }, /*#__PURE__*/react.createElement("div", {
    className: "host"
  }, /*#__PURE__*/react.createElement("img", {
    src: hostAvatar,
    loading: "lazy",
    onError: e => {
      e.target.src = defUserIcon;
    }
  }), /*#__PURE__*/react.createElement("span", null, hostName), /*#__PURE__*/react.createElement("span", {
    className: "host-tag"
  }, (0,languageHandler._t)("Host"))), !!date && /*#__PURE__*/react.createElement("div", {
    className: "date"
  }, dayjs_min_default()(date).format("YYYY-MM-DD HH:mm")), location && /*#__PURE__*/react.createElement("div", {
    className: "location"
  }, location), participantAvatar && !isNotStart && /*#__PURE__*/react.createElement("div", {
    className: "participate"
  }, participantAvatar.length > 0 && /*#__PURE__*/react.createElement("div", {
    className: "faces"
  }, participantAvatar.slice(0, 3).map(avatar => {
    return /*#__PURE__*/react.createElement("img", {
      key: avatar,
      src: avatar,
      loading: "lazy",
      onError: e => {
        e.target.src = defUserIcon;
      }
    });
  })), /*#__PURE__*/react.createElement("span", null, (0,languageHandler._t)("%(count)s listened", {
    count: participantCount !== null && participantCount !== void 0 ? participantCount : participantAvatar.length
  })))), /*#__PURE__*/react.createElement("div", {
    className: "mx_PreviewCard_footer apc-footer",
    "data-area": "footer"
  }, /*#__PURE__*/react.createElement("span", {
    className: classnames_default()({
      "site-icon": !/twitter/i.test(siteName)
    }),
    style: siteIconStyle
  }, /twitter/i.test(siteName) ? "X (twitter space)" : siteName), /twitter/i.test(siteName) && !isNotStart && cardButton && /*#__PURE__*/react.createElement("span", {
    className: "action-icon",
    style: cardBtnStyle
  }, isEnded ? (0,languageHandler._t)("Replay") : isLive ? (0,languageHandler._t)("Join") : ""), siteName.toLowerCase() === "sdl live" && !isEnded && /*#__PURE__*/react.createElement("span", {
    className: "action-icon",
    style: cardBtnStyle
  }, (0,languageHandler._t)("Join"))));
};
/* harmony default export */ const preview_card_ActivityCard = (/*#__PURE__*/(0,react.memo)(ActivityCard));
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/preview_link/util.ts
var preview_link_util = __webpack_require__(882579);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/preview_link/LinkPreviewGroup.tsx
/* eslint-disable camelcase */
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
























const soShowApiUrl = SdkConfig/* default */.Z.get()["activity"]["soshow_card_url"];
const soShowUrl = SdkConfig/* default */.Z.get()["activity"]["soshow_url"];
const INITIAL_NUM_PREVIEWS = 2;
const LinkPreviewGroup = ({
  root,
  links,
  mxEvent,
  onCancelClick,
  onHeightChanged,
  onNftProfileClick,
  onNftFavClick,
  timestamp,
  isReply,
  displayWebsiteLinkSetting,
  sdmCardRef
}) => {
  var _mxEvent$getContent;
  const cli = (0,react.useContext)(MatrixClientContext/* default */.Z);
  const [expanded, toggleExpanded] = (0,useStateToggle/* useStateToggle */.R)();
  const wrapper = (0,react.useRef)(null);
  const ts = mxEvent.getTs();
  const previews = (0,useAsyncMemo/* useAsyncMemo */.G)(async () => {
    const onClickVipLink = async event => {
      event.stopPropagation();
      event.preventDefault();
      SdkConfig/* default */.Z.get("permalinkPrefix");
      const link = event.currentTarget;
      const flag = await (0,preview_link_util/* innerLinkJump */.c)({
        link
      });
      if (flag) {
        return false;
      }
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.SetRightPanelPhase,
        phase: RightPanelStorePhases/* RightPanelPhases */.q4.IframeWidget,
        refireParams: {
          params: {
            src: link === null || link === void 0 ? void 0 : link.href,
            title: link === null || link === void 0 ? void 0 : link.title
          }
        }
      });
    };
    return Promise.all(links
    // .filter((link) => filterNotSocialSwap(link))
    .map(async link => {
      try {
        return [link, await cli.getUrlPreview(link, ts)];
      } catch (error) {
        console.error("Failed to get URL preview: " + error);
      }
    })).then(a => a.filter(Boolean)).then(links => {
      links.forEach(link => {
        var _resp$ogSite_name;
        const [name, resp] = link;
        if ((resp === null || resp === void 0 ? void 0 : (_resp$ogSite_name = resp["og:site_name"]) === null || _resp$ogSite_name === void 0 ? void 0 : _resp$ogSite_name.toLowerCase()) === "twitter") {
          return;
        }
        if (resp && "app" in resp && root) {
          var _root$current;
          const {
            app
          } = resp;
          const linkUrl = (_root$current = root.current) === null || _root$current === void 0 ? void 0 : _root$current.querySelector(`[href="${name}"]`);
          if (linkUrl) {
            linkUrl.dataset["partner"] = "true";
            linkUrl.title = app.app_name;
            linkUrl.removeEventListener("click", onClickVipLink);
            linkUrl.addEventListener("click", onClickVipLink);
          }
        }
      });
      return links;
    });
  }, [links, ts], []);
  (0,react.useEffect)(() => {
    onHeightChanged();
  }, [onHeightChanged, expanded, previews]);
  const showPreviews = expanded ? previews : previews.slice(0, INITIAL_NUM_PREVIEWS);
  let toggleButton;
  if (previews.length > INITIAL_NUM_PREVIEWS) {
    toggleButton = /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      onClick: toggleExpanded
    }, expanded ? (0,languageHandler._t)("Collapse") : (0,languageHandler._t)("Show %(count)s other previews", {
      count: previews.length - showPreviews.length
    }));
  }

  // DESC: 获取 soshowLink
  // why: 由于soshow只对 api.gjgj.fun 做了卡片解析，故soshow url 发在消息中的 需要转api.gjgj.fun
  //      而 api.gjgj.fun 点击了之后又重定向了 导致 postmate 通信有问题，故点击时又要替换成 bete.soshow
  // eg: https://api.gjgj.fun/get_space_topic?space=1dRKZMOLEwXxB
  // -> https://beta-sdm.soshow.io/#/?space=1BdxYyAArroxX
  const getSoShowLink = (link = "") => {
    const space = (0,UrlUtils/* getUrlParam */.eY)(link, "space");
    if (space) {
      return `${soShowUrl}/#/?space=${space}`;
    }
    return link;
  };
  const clickGroupNote = event => {
    event.stopPropagation();
    event.preventDefault();
    dispatcher/* default */.ZP.dispatch({
      action: actions/* Action */.a.SetRightPanelPhase,
      phase: RightPanelStorePhases/* RightPanelPhases */.q4.GroupNote,
      room: MatrixClientPeg/* MatrixClientPeg */.p.get().getRoom(mxEvent.getRoomId()),
      refireParams: {
        params: {
          content: mxEvent.getContent()["m.group_note"],
          eventId: mxEvent.getId()
        }
      }
    });
  };
  const renderGroupNote = wrapper => {
    const content = mxEvent.getContent();
    if (!content["m.group_note"] || !wrapper.current) {
      return null;
    }
    if (isReply) {
      return null;
    }
    const comp = /*#__PURE__*/react.createElement("div", {
      className: "mx_InternalActivityCard_wrapper mx_SdmCard_wrapper",
      style: {
        clear: "right"
      }
    }, /*#__PURE__*/react.createElement(rooms_GroupNoteCard, {
      onClick: clickGroupNote,
      sender: mxEvent.getSender(),
      content: content["m.group_note"],
      timestamp: timestamp
    }));
    // let renderContainer;
    // if (sdmCardRef && sdmCardRef.current) {
    //     renderContainer = sdmCardRef.current;
    // } else {
    //     renderContainer =
    //         wrapper.current.parentElement.parentElement.parentElement;
    // }
    // const renderContainer = getSdmCardContainer();
    const renderContainer = getSdmCardContainer();
    return /*#__PURE__*/react_dom.createPortal(comp, renderContainer);
  };
  const isHideLink = ((_mxEvent$getContent = mxEvent.getContent()) === null || _mxEvent$getContent === void 0 ? void 0 : _mxEvent$getContent.send_method) == "m.im.hidelink" && !displayWebsiteLinkSetting;
  const content = mxEvent === null || mxEvent === void 0 ? void 0 : mxEvent.getContent();
  //TODO
  // const bodyArr = (content.body as string).split("\n");
  // const url = bodyArr[bodyArr.length - 1];
  // const socialSwap = getSocialSwapObj(url);
  // if (socialSwap) {
  //     return <div
  //         className="mx_SdmCard_wrapper"
  //         style={{ clear: "right" }}
  //     >
  //         <SdmCard
  //             key={url}
  //             avatar={socialSwap.avatar}
  //             title={content["ps"]}
  //             siteIcon={content["site_icon"] || socialSwap.siteIcon}
  //             siteName={content["site_name"] || socialSwap?.siteName}
  //             description={
  //                 content["description"] ||
  //                 socialSwap.description
  //             }
  //             type="summary"
  //             template={socialSwap.template}
  //             onClick={() => {
  //                 defaultDispatcher.dispatch<SetRightPanelPhasePayload>({
  //                     action: Action.SetRightPanelPhase,
  //                     phase: RightPanelPhases.IframeWidget,
  //                     refireParams: {
  //                         params: {
  //                             src: url,
  //                             title: "",
  //                         },
  //                     },
  //                 });
  //             }}
  //         />
  //         <div className="mx_SdmCard_link_herf">
  //             socialswap.com
  //         </div>
  //     </div>
  // }
  const getSdmCardContainer = () => {
    var _EventTileElement$get;
    const EventTileElement = wrapper.current.parentElement.parentElement.parentElement;
    const EventTileLineEle = wrapper.current.parentElement.parentElement;
    const SdmCardContainer = (_EventTileElement$get = EventTileElement.getElementsByClassName("mx_SdmCard_container")) === null || _EventTileElement$get === void 0 ? void 0 : _EventTileElement$get[0];
    let renderContainer;
    if (sdmCardRef && sdmCardRef.current) {
      renderContainer = sdmCardRef.current;
    } else if (SdmCardContainer) {
      renderContainer = SdmCardContainer;
    } else {
      renderContainer = EventTileElement;
    }
    EventTileLineEle.className = EventTileLineEle.className + " mx_EventTile_line_hasSdmCard";
    return renderContainer;
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_LinkPreviewGroup",
    ref: wrapper
  }, renderGroupNote(wrapper), showPreviews.length === 0 && isHideLink ? /*#__PURE__*/react.createElement("div", {
    className: "mx_SdmCard",
    style: {
      height: "120px"
    }
  }) : null, showPreviews.map(([link, preview], i) => {
    var _preview$app, _preview$app2;
    if (preview && "nft" in preview && "app" in preview) {
      var _nft$price_json;
      const nft = preview.nft;
      const app = preview.app;
      return /*#__PURE__*/react.createElement(NftMsgCard, {
        preview: {
          name: nft.name,
          image_urls: nft.image_urls,
          collection_image_url: app.app_logo,
          collection_name: app.app_name,
          ethPrice: (_nft$price_json = nft.price_json) === null || _nft$price_json === void 0 ? void 0 : _nft$price_json.min_price_nft.eth_price,
          onSale: !!nft.on_sale
        },
        onClick: () => onNftProfileClick === null || onNftProfileClick === void 0 ? void 0 : onNftProfileClick(nft.contract_address, nft.token_id),
        onCollect: () => onNftFavClick === null || onNftFavClick === void 0 ? void 0 : onNftFavClick(),
        style: i === 0 ? {
          clear: "right"
        } : void 0,
        getContainer: () => wrapper.current.parentElement.parentElement.parentElement,
        tokenId: nft.token_id,
        address: nft.contract_address
      });
    }
    const onClickCard = async event => {
      var _preview$ogSite_name;
      event.stopPropagation();
      event.preventDefault();
      // Skin link click...
      if (preview.app && link.indexOf("share") > -1 && link.indexOf("skinId") > -1) {
        const payload = {
          action: actions/* Action */.a.ViewUserSettings,
          initialTabId: UserSettingsDialog/* UserTab */.oX.Appearance,
          isShotCut: true
        };
        dispatcher/* default */.ZP.dispatch(payload);
        return;
      }
      if ((preview === null || preview === void 0 ? void 0 : (_preview$ogSite_name = preview["og:site_name"]) === null || _preview$ogSite_name === void 0 ? void 0 : _preview$ogSite_name.toLowerCase()) === "twitter") {
        if (preview !== null && preview !== void 0 && preview["og:url"]) {
          window.open(preview["og:url"], "_blank");
        }
        return;
      }
      const innerLink = new DOMParser().parseFromString(link, "text/html");
      innerLink.href = link;
      const flag = await (0,preview_link_util/* innerLinkJump */.c)({
        link: innerLink
      });
      if (flag) {
        return;
      }
      const isShowApiUrl = link.search(soShowApiUrl) != -1;
      const soShowLink = getSoShowLink(link);
      if (preview.app) {
        dispatcher/* default */.ZP.dispatch({
          action: actions/* Action */.a.SetRightPanelPhase,
          phase: RightPanelStorePhases/* RightPanelPhases */.q4.IframeWidget,
          refireParams: {
            params: {
              src: isShowApiUrl ? soShowLink : link,
              title: preview["og:site_name"] || preview.app.app_name
            }
          }
        });
      } else {
        window.open(link, "_blank");
      }
    };
    if (preview["og:card_type"] && preview["og:card_type"] === "activity") {
      let comp;
      if (preview["og:site_name"] && `${preview["og:site_name"]}`.toLowerCase() === "snapshot") {
        comp = /*#__PURE__*/react.createElement("div", {
          className: "mx_InternalActivityCard_wrapper mx_SdmCard_wrapper",
          style: i === 0 ? {
            clear: "right"
          } : void 0
        }, /*#__PURE__*/react.createElement(snapshot_SnapshotActivityCard, {
          title: preview["og:title"],
          proposalId: "",
          spaceId: "",
          authorName: preview["og:host:name"],
          authorAvatar: preview["og:host:avatar"],
          start: preview["og:date"],
          end: preview["og:end_date"],
          voteAvatars: preview["og:participant:avatar[]"],
          votes: preview["og:participant:count"],
          state: preview["og:tag_description"],
          siteName: preview["og:site_name"],
          siteIcon: preview["og:site_icon"],
          onClick: onClickCard
        }));
      } else {
        comp = /*#__PURE__*/react.createElement("div", {
          className: "mx_InternalActivityCard_wrapper mx_SdmCard_wrapper",
          style: i === 0 ? {
            clear: "right"
          } : void 0
        }, /*#__PURE__*/react.createElement(preview_card_ActivityCard, {
          preview: preview,
          link: link,
          mxEvent: mxEvent
        }));
      }
      const renderContainer = getSdmCardContainer();
      return /*#__PURE__*/react_dom.createPortal(comp, renderContainer);
    }
    if ((preview === null || preview === void 0 ? void 0 : preview["og:type"]) === "zoom" && preview !== null && preview !== void 0 && preview["og:code"]) {
      const comp = /*#__PURE__*/react.createElement("div", {
        className: "mx_SdmCard_wrapper",
        style: i === 0 ? {
          clear: "right"
        } : void 0
      }, /*#__PURE__*/react.createElement(zoom_view_ZoomPreviewCard, {
        title: preview["og:description"],
        meetingNumber: preview["og:code"],
        url: preview["og:url"]
      }));
      const renderContainer = getSdmCardContainer();
      return /*#__PURE__*/react_dom.createPortal(comp, renderContainer);
    }
    const comp = /*#__PURE__*/react.createElement("div", {
      className: "mx_SdmCard_wrapper",
      style: i === 0 ? {
        clear: "right"
      } : void 0
    }, /*#__PURE__*/react.createElement(rooms_SdmCard, {
      key: link,
      link: link,
      tagIcon: preview["og:tag_icon"],
      tagDescription: preview["og:tag_description"],
      avatar: preview["og:image"],
      title: preview["og:title"],
      description: preview["og:description"],
      type: preview["og:card_type"],
      template: preview["og:image:template"],
      siteName: preview["og:site_name"],
      members: preview["og:image:members"],
      siteIcon: preview["og:site_icon"],
      ens: preview["og:ens"],
      isFill: preview["og:image:fill"],
      app: preview.app,
      onClick: onClickCard,
      cardButton: preview["og:card_button"]
    }), preview !== null && preview !== void 0 && (_preview$app = preview.app) !== null && _preview$app !== void 0 && _preview$app["url_top_domain"] ? /*#__PURE__*/react.createElement("div", {
      className: "mx_SdmCard_link_herf"
    }, preview === null || preview === void 0 ? void 0 : (_preview$app2 = preview.app) === null || _preview$app2 === void 0 ? void 0 : _preview$app2["url_top_domain"]) : null);
    const renderContainer = getSdmCardContainer();
    return /*#__PURE__*/react_dom.createPortal(comp, renderContainer);
  }), toggleButton);
};
const NftMsgCard = ({
  preview,
  onClick,
  style,
  getContainer,
  address,
  tokenId,
  onCollect
}) => {
  var _preview$image_urls, _preview$image_urls2;
  const [collected, setCollected] = (0,react.useState)(false);
  (0,react.useEffect)(() => {
    const updateCollected = () => {
      stores_NftFavoriteStore.instance.getStatus(address, tokenId).then(setCollected);
    };
    const handleStatusChanged = (_address, _tokenId) => {
      if (_address === address && _tokenId === tokenId) {
        updateCollected();
      }
    };
    stores_NftFavoriteStore.instance.on("StatusChanged", handleStatusChanged);
    updateCollected();
    return () => {
      stores_NftFavoriteStore.instance.off("StatusChanged", handleStatusChanged);
    };
  }, [address, tokenId]);
  const imageUrl = ((_preview$image_urls = preview.image_urls) === null || _preview$image_urls === void 0 ? void 0 : _preview$image_urls.image_preview_url) || ((_preview$image_urls2 = preview.image_urls) === null || _preview$image_urls2 === void 0 ? void 0 : _preview$image_urls2.image_url);
  return /*#__PURE__*/react.createElement(react_dist.PureMsgCard, {
    type: react_dist.MsgHandler.nft,
    cardProps: {
      imageUrl,
      name: preview.name,
      collectionName: preview.collection_name,
      collectionImageUrl: preview.collection_image_url,
      onClickProfile: onClick,
      onSale: preview.onSale,
      ethPrice: preview.ethPrice,
      style,
      collected,
      onCollected: v => {
        stores_NftFavoriteStore.instance[v ? "add" : "remove"](address, tokenId);
        setCollected(v);
        onCollect();
      }
    },
    getContainer: getContainer
  });
};
const filterNotSocialSwap = link => {
  return !getSocialSwapObj(link);
};
const socialSwapMap = {
  "share.socialswap.com/trans/order": {
    avatar: "",
    siteIcon: "https://transfer.socialswap.com/logo_icon_white.png",
    siteName: "Transfer",
    description: "",
    template: ""
  },
  "share.socialswap.com/box/receive": {
    avatar: "https://lucky.socialswap.com/image/gun/default_card.png",
    siteIcon: "https://lucky.socialswap.com/image/gun/logo_icon_white.png",
    siteName: "Money Gun",
    description: "Giveaway of tokens or NFTs. Limited quantity. You snooze you lose!",
    template: "horizontal"
  },
  "share.web3-tp.net/trans/order": {
    avatar: "",
    siteIcon: "https://transfer.socialswap.com/logo_icon_white.png",
    siteName: "Transfer",
    description: "",
    template: ""
  },
  "share.web3-tp.net/box/receive": {
    avatar: "https://lucky.socialswap.com/image/gun/default_card.png",
    siteIcon: "https://lucky.socialswap.com/image/gun/logo_icon_white.png",
    siteName: "Money Gun",
    description: "Giveaway of tokens or NFTs. Limited quantity. You snooze you lose!",
    template: "horizontal"
  }
};
const getSocialSwapObj = _url => {
  try {
    const url = new URL(_url);
    return get(socialSwapMap, url.host + url.pathname, undefined);
  } catch (error) {
    console.error("get social swap object failed", _url, error);
  }
};
/* harmony default export */ const preview_link_LinkPreviewGroup = (LinkPreviewGroup);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/PartnerStore.ts
var PartnerStore = __webpack_require__(456564);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/IframeWidget.tsx + 7 modules
var IframeWidget = __webpack_require__(731400);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/RightPanel.tsx + 56 modules
var RightPanel = __webpack_require__(285243);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/messages/MessageTimestamp.tsx
var MessageTimestamp = __webpack_require__(982820);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/messages/CombineForwardMessage.tsx
var CombineForwardMessage = __webpack_require__(541399);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/settings/GlobalConfig.ts
var GlobalConfig = __webpack_require__(2902);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/messages/MessageViewAllButton.tsx
var MessageViewAllButton = __webpack_require__(829254);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/messages/ReactionsRow.tsx
var ReactionsRow = __webpack_require__(470086);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/messages/TextualBody.tsx

function TextualBody_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function TextualBody_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? TextualBody_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : TextualBody_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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



// import highlight from "highlight.js";















// import { replaceableComponent } from "../../../utils/replaceableComponent";



















const NFT_PROFILE_HOST_URL = SdkConfig/* default */.Z.get()["dapp"]["fav_host_url"];
// // @replaceableComponent("views.messages.TextualBody")
class TextualBody extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "contentRef", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "unmounted", false);
    (0,defineProperty/* default */.Z)(this, "pills", []);
    (0,defineProperty/* default */.Z)(this, "onReactionsCreated", (relationType, eventType) => {
      if (relationType !== "m.annotation" || eventType !== "m.reaction") {
        return;
      }
      this.props.mxEvent.removeListener("Event.relationsCreated", this.onReactionsCreated);
      this.setState({
        reactions: this.getReactions()
      });
    });
    (0,defineProperty/* default */.Z)(this, "getReactions", () => {
      var _this$props, _this$props2;
      const eventId = this.props.mxEvent.getId();
      const reactions = (_this$props = this.props) !== null && _this$props !== void 0 && _this$props.getRelationsForEvent ? (_this$props2 = this.props) === null || _this$props2 === void 0 ? void 0 : _this$props2.getRelationsForEvent(eventId, "m.annotation", "m.reaction") : null;
      if (reactions) {
        reactions.on("Relations.add", this.onReactionsChange);
        reactions.on("Relations.remove", this.onReactionsChange);
        reactions.on("Relations.redaction", this.onReactionsChange);
      }
      return reactions;
    });
    (0,defineProperty/* default */.Z)(this, "onReactionsChange", () => {
      this.forceUpdate();
    });
    (0,defineProperty/* default */.Z)(this, "applyFormatting", async () => {
      if (!this.contentRef.current) {
        return;
      }
      const showLineNumbers = SettingsStore/* default */.C.getValue("showCodeLineNumbers");
      this.activateSpoilers([this.contentRef.current]);

      // pillifyLinks BEFORE linkifyElement because plain room/user URLs in the composer
      // are still sent as plaintext URLs. If these are ever pillified in the composer,
      // we should be pillify them here by doing the linkifying BEFORE the pillifying.
      pillifyLinks([this.contentRef.current], this.props.mxEvent, this.pills);
      HtmlUtils/* linkifyElement */.$5(this.contentRef.current);
      HtmlUtils/* partnerLinkFormat */.U8(this.contentRef.current, await PartnerStore/* default */.Z.instance.getPartners());
      HtmlUtils/* linkifySerena */.uP(this.findSerenaNodes([this.contentRef.current]));
      if (this.unmounted) {
        return;
      }
      this.calculateUrlPreview();
      if (this.props.mxEvent.getContent().format === "org.matrix.custom.html") {
        // Handle expansion and add buttons
        const pres = react_dom.findDOMNode(this).getElementsByTagName("pre");
        if (pres.length > 0) {
          for (let i = 0; i < pres.length; i++) {
            // If there already is a div wrapping the codeblock we want to skip this.
            // This happens after the codeblock was edited.
            if (pres[i].parentElement.className == "mx_EventTile_pre_container") continue;
            // Add code element if it's missing since we depend on it
            if (pres[i].getElementsByTagName("code").length == 0) {
              this.addCodeElement(pres[i]);
            }
            // Wrap a div around <pre> so that the copy button can be correctly positioned
            // when the <pre> overflows and is scrolled horizontally.
            const div = this.wrapInDiv(pres[i]);
            this.handleCodeBlockExpansion(pres[i]);
            this.addCodeExpansionButton(div, pres[i]);
            this.addCodeCopyButton(div);
            if (showLineNumbers) {
              this.addLineNumbers(pres[i]);
            }
          }
        }
        // Highlight code
        const codes = react_dom.findDOMNode(this).getElementsByTagName("code");
        if (codes.length > 0) {
          // Do this asynchronously: parsing code takes time and we don't
          // need to block the DOM update on it.
          setTimeout(() => {
            if (this.unmounted) return;
            for (let i = 0; i < codes.length; i++) {
              // If the code already has the hljs class we want to skip this.
              // This happens after the codeblock was edited.
              if (codes[i].className.includes("hljs")) continue;
              this.highlightCode(codes[i]);
            }
          }, 10);
        }
      }
      // if (this.contentRef.current) {
      //     this.contentRef.current.querySelectorAll('a[data-partner=true]').forEach(link=>{
      //         link.addEventListener('click', this.onClickVipLink);
      //     });
      // }
    });
    (0,defineProperty/* default */.Z)(this, "onCancelClick", () => {
      this.setState({
        widgetHidden: true
      });
      // FIXME: persist this somewhere smarter than local storage
      if (__webpack_require__.g.localStorage) {
        __webpack_require__.g.localStorage.setItem("hide_preview_" + this.props.mxEvent.getId(), "1");
      }
      this.forceUpdate();
    });
    (0,defineProperty/* default */.Z)(this, "onEmoteSenderClick", () => {
      const mxEvent = this.props.mxEvent;
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.ComposerInsert,
        userId: mxEvent.getSender()
      });
    });
    (0,defineProperty/* default */.Z)(this, "getEventTileOps", () => ({
      isWidgetHidden: () => {
        return this.state.widgetHidden;
      },
      unhideWidget: () => {
        this.setState({
          widgetHidden: false
        });
        if (__webpack_require__.g.localStorage) {
          __webpack_require__.g.localStorage.removeItem("hide_preview_" + this.props.mxEvent.getId());
        }
      }
    }));
    (0,defineProperty/* default */.Z)(this, "onStarterLinkClick", (starterLink, ev) => {
      ev.preventDefault();
      // We need to add on our scalar token to the starter link, but we may not have one!
      // In addition, we can't fetch one on click and then go to it immediately as that
      // is then treated as a popup!
      // We can get around this by fetching one now and showing a "confirmation dialog" (hurr hurr)
      // which requires the user to click through and THEN we can open the link in a new tab because
      // the window.open command occurs in the same stack frame as the onClick callback.

      const managers = IntegrationManagers/* IntegrationManagers */.B.sharedInstance();
      if (!managers.hasManager()) {
        managers.openNoManagerDialog();
        return;
      }

      // Go fetch a scalar token
      const integrationManager = managers.getPrimaryManager();
      const scalarClient = integrationManager.getScalarClient();
      scalarClient.connect().then(() => {
        const completeUrl = scalarClient.getStarterLink(starterLink);
        const integrationsUrl = integrationManager.uiUrl;
        Modal/* default */.Z.createTrackedDialog("Add an integration", "", QuestionDialog/* default */.Z, {
          title: (0,languageHandler._t)("Add an Integration"),
          description: /*#__PURE__*/react.createElement("div", null, (0,languageHandler._t)("You are about to be taken to a third-party site so you can " + "authenticate your account for use with %(integrationsUrl)s. " + "Do you wish to continue?", {
            integrationsUrl: integrationsUrl
          })),
          button: (0,languageHandler._t)("Continue"),
          onFinished(confirmed) {
            if (!confirmed) {
              return;
            }
            const width = window.screen.width > 1024 ? 1024 : window.screen.width;
            const height = window.screen.height > 800 ? 800 : window.screen.height;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;
            const features = `height=${height}, width=${width}, top=${top}, left=${left},`;
            const wnd = window.open(completeUrl, "_blank", features);
            wnd.opener = null;
          }
        });
      });
    });
    (0,defineProperty/* default */.Z)(this, "onNftProfileClick", (address, tokenId) => {
      const {
        accessToken,
        userId
      } = MatrixClientPeg/* MatrixClientPeg */.p.getCredentials();
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.SetRightPanelPhase,
        phase: RightPanelStorePhases/* RightPanelPhases */.q4.IframeWidget,
        refireParams: {
          params: {
            src: `${NFT_PROFILE_HOST_URL}/nft/${address}/${tokenId}?token=${accessToken}&userId=${userId}`,
            title: (0,languageHandler._t)("NFT Profile")
          }
        }
      });
    });
    (0,defineProperty/* default */.Z)(this, "onNftFavClick", () => {
      const {
        accessToken,
        userId
      } = MatrixClientPeg/* MatrixClientPeg */.p.getCredentials();
      if (RightPanel/* default */.Z.isShow()) {
        dispatcher/* default */.ZP.dispatch({
          action: IframeWidget/* IFrameAction */.O.Refresh
        });
      }
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.SetRightPanelPhase,
        phase: RightPanelStorePhases/* RightPanelPhases */.q4.IframeWidget,
        refireParams: {
          params: {
            src: `${NFT_PROFILE_HOST_URL}/fav?token=${accessToken}&userId=${userId}`,
            title: (0,languageHandler._t)("Cart")
          }
        }
      });
    });
    (0,defineProperty/* default */.Z)(this, "openHistoryDialog", async () => {
      Modal/* default */.Z.createDialog(MessageEditHistoryDialog, {
        mxEvent: this.props.mxEvent
      });
    });
    (0,defineProperty/* default */.Z)(this, "renderViewAllButton", () => {
      if (!this.props.interceptMessage) {
        return null;
      }
      const mxEvent = this.props.mxEvent;
      const content = mxEvent.getContent();
      let _body = content.body;
      let _formattedBody = content.formatted_body;
      let plainBody = typeof _body === "string" ? _body : "";
      let formattedBody = typeof _formattedBody === "string" ? _formattedBody : null;
      formattedBody = ReplyThread/* default */.Z.stripHTMLReply(formattedBody);
      plainBody = ReplyThread/* default */.Z.stripPlainReply(plainBody);
      const isHtmlMessage = content.format === "org.matrix.custom.html" && _formattedBody;
      const _bodyString = isHtmlMessage ? formattedBody : plainBody;
      const showViewAllBtn = _bodyString.length > GlobalConfig/* GlobalConfig */.Q.MaxShowTextLength;
      if (showViewAllBtn || this.state.reactions && this.state.reactions.getRelations().length > 0) {
        return /*#__PURE__*/react.createElement("div", {
          className: "mx_EventTile_action"
        }, /*#__PURE__*/react.createElement("div", {
          className: "mx_EventTile_action_left"
        }, showViewAllBtn ? /*#__PURE__*/react.createElement(MessageViewAllButton["default"], this.props) : null, /*#__PURE__*/react.createElement(ReactionsRow["default"], {
          className: "mx_ReactionsRow_inline",
          mxEvent: this.props.mxEvent,
          reactions: this.state.reactions,
          addReaction: false
        })), /*#__PURE__*/react.createElement(MessageTimestamp["default"], {
          ts: this.props.mxEvent.getTs(),
          showHourMinute: true
        }));
      } else {
        return /*#__PURE__*/react.createElement(MessageTimestamp["default"], {
          ts: this.props.mxEvent.getTs(),
          showHourMinute: true
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "currentContent", void 0);
    this.state = {
      links: [],
      widgetHidden: false,
      reactions: this.getReactions()
    };
  }

  // private onClickVipLink(event: MouseEvent) {
  //     event.stopPropagation();
  //     event.preventDefault();
  //     const link = event.currentTarget as HTMLLinkElement;
  //     dis.dispatch<SetRightPanelPhasePayload>({
  //         action: Action.SetRightPanelPhase,
  //         phase: RightPanelPhases.IframeWidget,
  //         refireParams: {
  //             params: {
  //                 src: link?.href,
  //                 title: link?.title,
  //             },

  //         },
  //     });
  // }

  componentDidMount() {
    if (!this.props.editState) {
      this.applyFormatting();
    }
    this.currentContent = this.props.mxEvent.getContent();
    this.props.mxEvent.on("Event.relationsCreated", this.onReactionsCreated);
  }
  addCodeElement(pre) {
    const code = document.createElement("code");
    code.append(...pre.childNodes);
    pre.appendChild(code);
  }
  addCodeExpansionButton(div, pre) {
    // Calculate how many percent does the pre element take up.
    // If it's less than 30% we don't add the expansion button.
    // We also round the number as it sometimes can be 29.99...
    const percentageOfViewport = Math.round(pre.offsetHeight / UIStore/* default */.Z.instance.windowHeight * 100);
    if (percentageOfViewport < 30) return;
    const button = document.createElement("span");
    button.className = "mx_EventTile_button ";
    if (pre.className == "mx_EventTile_collapsedCodeBlock") {
      button.className += "mx_EventTile_expandButton";
    } else {
      button.className += "mx_EventTile_collapseButton";
    }
    button.onclick = async () => {
      button.className = "mx_EventTile_button ";
      if (pre.className == "mx_EventTile_collapsedCodeBlock") {
        pre.className = "";
        button.className += "mx_EventTile_collapseButton";
      } else {
        pre.className = "mx_EventTile_collapsedCodeBlock";
        button.className += "mx_EventTile_expandButton";
      }

      // By expanding/collapsing we changed
      // the height, therefore we call this
      this.props.onHeightChanged();
    };
    div.appendChild(button);
  }
  addCodeCopyButton(div) {
    const button = document.createElement("span");
    button.className = "mx_EventTile_button mx_EventTile_copyButton ";

    // Check if expansion button exists. If so
    // we put the copy button to the bottom
    const expansionButtonExists = div.getElementsByClassName("mx_EventTile_button");
    if (expansionButtonExists.length > 0) button.className += "mx_EventTile_buttonBottom";
    button.onclick = async () => {
      const copyCode = button.parentElement.getElementsByTagName("code")[0];
      const successful = await (0,strings/* copyPlaintext */.RO)(copyCode.textContent);
      const buttonRect = button.getBoundingClientRect();
      const {
        close
      } = ContextMenu/* createMenu */.ZT(GenericTextContextMenu/* default */.Z, TextualBody_objectSpread(TextualBody_objectSpread({}, (0,ContextMenu/* toRightOf */.ip)(buttonRect, 2)), {}, {
        message: successful ? (0,languageHandler._t)("Copied!") : (0,languageHandler._t)("Failed to copy")
      }));
      button.onmouseleave = close;
    };
    div.appendChild(button);
  }
  wrapInDiv(pre) {
    const div = document.createElement("div");
    div.className = "mx_EventTile_pre_container";

    // Insert containing div in place of <pre> block
    pre.parentNode.replaceChild(div, pre);
    // Append <pre> block and copy button to container
    div.appendChild(pre);
    return div;
  }
  handleCodeBlockExpansion(pre) {
    if (!SettingsStore/* default */.C.getValue("expandCodeByDefault")) {
      pre.className = "mx_EventTile_collapsedCodeBlock";
    }
  }
  addLineNumbers(pre) {
    // Calculate number of lines in pre
    const number = pre.innerHTML.replace(/\n(<\/code>)?$/, "").split(/\n/).length;
    pre.innerHTML = '<span class="mx_EventTile_lineNumbers"></span>' + pre.innerHTML + "<span></span>";
    const lineNumbers = pre.getElementsByClassName("mx_EventTile_lineNumbers")[0];
    // Iterate through lines starting with 1 (number of the first line is 1)
    for (let i = 1; i <= number; i++) {
      lineNumbers.innerHTML += '<span class="mx_EventTile_lineNumber">' + i + "</span>";
    }
  }
  highlightCode(code) {
    // Auto-detect language only if enabled and only for codeblocks
    if (SettingsStore/* default */.C.getValue("enableSyntaxHighlightLanguageDetection") && code.parentElement instanceof HTMLPreElement) {
      __webpack_require__.e(/* import() */ 7869).then(__webpack_require__.t.bind(__webpack_require__, 577869, 23)).then(({
        highlightBlock
      }) => highlightBlock(code));
    } else {
      // Only syntax highlight if there's a class starting with language-
      const classes = code.className.split(/\s+/).filter(function (cl) {
        return cl.startsWith("language-") && !cl.startsWith("language-_");
      });
      if (classes.length != 0) {
        __webpack_require__.e(/* import() */ 7869).then(__webpack_require__.t.bind(__webpack_require__, 577869, 23)).then(({
          highlightBlock
        }) => highlightBlock(code));
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (!this.props.editState) {
      const stoppedEditing = prevProps.editState && !this.props.editState;
      const messageWasEdited = prevProps.replacingEventId !== this.props.replacingEventId;
      const contentChanged = this.props.mxEvent.getContent() !== this.currentContent;
      const linkVisableChange = prevProps.displayWebsiteLinkSetting !== this.props.displayWebsiteLinkSetting;
      if (messageWasEdited || stoppedEditing || contentChanged || linkVisableChange) {
        this.applyFormatting();
      }
    }
    this.currentContent = this.props.mxEvent.getContent();
  }
  componentWillUnmount() {
    this.unmounted = true;
    unmountPills(this.pills);
    // if (this.contentRef.current) {
    //     this.contentRef.current.querySelectorAll('a[data-partner=true]').forEach(link=>{
    //         link.removeEventListener('click', this.onClickVipLink);
    //     });
    // }
    if (this.state.reactions) {
      this.state.reactions.off("Relations.add", this.onReactionsChange);
      this.state.reactions.off("Relations.remove", this.onReactionsChange);
      this.state.reactions.off("Relations.redaction", this.onReactionsChange);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    //console.info("shouldComponentUpdate: ShowUrlPreview for %s is %s", this.props.mxEvent.getId(), this.props.showUrlPreview);

    // exploit that events are immutable :)
    return nextProps.mxEvent.getId() !== this.props.mxEvent.getId() || nextProps.highlights !== this.props.highlights || nextProps.replacingEventId !== this.props.replacingEventId || nextProps.highlightLink !== this.props.highlightLink || nextProps.showUrlPreview !== this.props.showUrlPreview || nextProps.editState !== this.props.editState || nextState.links !== this.state.links || nextState.widgetHidden !== this.state.widgetHidden || nextProps.mxEvent.getContent() !== this.currentContent || nextProps.displayWebsiteLinkSetting !== this.props.displayWebsiteLinkSetting;
  }
  calculateUrlPreview() {
    //console.info("calculateUrlPreview: ShowUrlPreview for %s is %s", this.props.mxEvent.getId(), this.props.showUrlPreview);
    if (!this.contentRef.current) {
      return;
    }
    let links = [];
    if (this.props.showUrlPreview) {
      // pass only the first child which is the event tile otherwise this recurses on edited events
      // let links = this.findLinks([this.contentRef.current]);
      const content = this.props.mxEvent.getContent();
      const regexp = /(https?:\/\/[^\s]+)/g;
      links = content.body.match(regexp);
      if (links && links.length) {
        // de-duplicate the links using a set here maintains the order
        links = Array.from(new Set(links));
        this.setState({
          links
        });

        // lazy-load the hidden state of the preview widget from localstorage
        if (window.localStorage) {
          const hidden = !!window.localStorage.getItem("hide_preview_" + this.props.mxEvent.getId());
          this.setState({
            widgetHidden: hidden
          });
        }
      } else if (this.state.links.length) {
        this.setState({
          links: []
        });
      }
    }
    return links;
  }
  activateSpoilers(nodes) {
    let node = nodes[0];
    while (node) {
      if (node.tagName === "SPAN" && typeof node.getAttribute("data-mx-spoiler") === "string") {
        const spoilerContainer = document.createElement("span");
        const reason = node.getAttribute("data-mx-spoiler");
        node.removeAttribute("data-mx-spoiler"); // we don't want to recurse
        const spoiler = /*#__PURE__*/react.createElement(Spoiler, {
          reason: reason,
          contentHtml: node.outerHTML
        });
        react_dom.render(spoiler, spoilerContainer);
        node.parentNode.replaceChild(spoilerContainer, node);
        node = spoilerContainer;
      }
      if (node.childNodes && node.childNodes.length) {
        this.activateSpoilers(node.childNodes);
      }
      node = node.nextSibling;
    }
  }
  findSerenaNodes(nodes) {
    let links = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node) {
        if (node.tagName === "A" && node.getAttribute("href")) {
          links.push(node);
        } else if (node.tagName === "PRE" || node.tagName === "CODE" || node.tagName === "BLOCKQUOTE") {
          continue;
        } else if (node.children && node.children.length) {
          links = links.concat(this.findSerenaNodes(node.children));
        }
      }
    }
    return links;
  }
  findLinks(nodes) {
    let links = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.tagName === "A" && node.getAttribute("href")) {
        if (this.isLinkPreviewable(node)) {
          links.push(node.getAttribute("href"));
        }
      } else if (node.tagName === "PRE" || node.tagName === "CODE" || node.tagName === "BLOCKQUOTE") {
        continue;
      } else if (node.children && node.children.length) {
        links = links.concat(this.findLinks(node.children));
      }
    }
    return links;
  }
  isLinkPreviewable(node) {
    // don't try to preview relative links
    if (!node.getAttribute("href").startsWith("http://") && !node.getAttribute("href").startsWith("https://")) {
      return false;
    }

    // as a random heuristic to avoid highlighting things like "foo.pl"
    // we require the linked text to either include a / (either from http://
    // or from a full foo.bar/baz style schemeless URL) - or be a markdown-style
    // link, in which case we check the target text differs from the link value.
    // TODO: make this configurable?
    if (node.textContent.indexOf("/") > -1) {
      return true;
    } else {
      const url = node.getAttribute("href");
      const host = url.match(/^https?:\/\/(.*?)(\/|$)/)[1];

      // never preview permalinks (if anything we should give a smart
      // preview of the room/user they point to: nobody needs to be reminded
      // what the matrix.to site looks like).
      if ((0,Permalinks/* isPermalinkHost */.M5)(host)) return false;
      if (node.textContent.toLowerCase().trim().startsWith(host.toLowerCase())) {
        // it's a "foo.pl" style link
        return false;
      } else {
        // it's a [foo bar](http://foo.com) style link
        return true;
      }
    }
  }
  renderEditedMarker() {
    const date = this.props.mxEvent.replacingEventDate();
    const dateString = date && (0,DateUtils/* formatDate */.p6)(date);
    const tooltip = /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("div", {
      className: "mx_Tooltip_title"
    }, (0,languageHandler._t)("Edited at %(date)s", {
      date: dateString
    })), /*#__PURE__*/react.createElement("div", {
      className: "mx_Tooltip_sub"
    }, (0,languageHandler._t)("Click to view edits")));
    return /*#__PURE__*/react.createElement(AccessibleTooltipButton/* default */.Z, {
      className: "mx_EventTile_edited",
      onClick: this.openHistoryDialog,
      title: (0,languageHandler._t)("Edited at %(date)s. Click to view edits.", {
        date: dateString
      }),
      tooltip: tooltip
    }, /*#__PURE__*/react.createElement("span", null, `(${(0,languageHandler._t)("edited")})`));
  }
  render() {
    var _this$props4;
    if (this.props.editState) {
      return /*#__PURE__*/react.createElement(EditMessageComposer, {
        editState: this.props.editState,
        className: "mx_EventTile_content"
      });
    }
    const mxEvent = this.props.mxEvent;
    const content = mxEvent.getContent();
    const timestamp = /*#__PURE__*/react.createElement(MessageTimestamp["default"], {
      ts: this.props.mxEvent.getTs(),
      showHourMinute: true
    });
    // only strip reply if this is the original replying event, edits thereafter do not have the fallback
    const stripReply = !mxEvent.replacingEvent() && !!ReplyThread/* default */.Z.getParentEventId(mxEvent) && this.props.stripReply;
    let body = HtmlUtils/* bodyToHtml */.GM(content, this.props.highlights, {
      disableBigEmoji: content.msgtype === _types_event/* MsgType */.Zw.Emote || !SettingsStore/* default */.C.getValue("TextualBody.enableBigEmoji"),
      // Part of Replies fallback support
      stripReplyFallback: stripReply,
      ref: this.contentRef,
      forComposerQuote: true,
      returnString: false,
      timestamp,
      displayWebsiteLinkSetting: this.props.displayWebsiteLinkSetting,
      interceptMessage: this.props.interceptMessage
    });
    if (body.props.className.includes("mx_EventTile_bigEmoji")) {
      var _this$props3, _this$props3$updateEx;
      (_this$props3 = this.props) === null || _this$props3 === void 0 ? void 0 : (_this$props3$updateEx = _this$props3.updateExtraProperty) === null || _this$props3$updateEx === void 0 ? void 0 : _this$props3$updateEx.call(_this$props3, {
        isBigEmoji: true
      });
    }
    if (this.props.replacingEventId) {
      body = /*#__PURE__*/react.createElement(react.Fragment, null, body, this.renderEditedMarker());
    }
    if (this.props.highlightLink) {
      body = /*#__PURE__*/react.createElement("a", {
        href: this.props.highlightLink
      }, body);
    } else if (content.data && typeof content.data["org.matrix.neb.starter_link"] === "string") {
      body = /*#__PURE__*/react.createElement("a", {
        href: "#",
        onClick: this.onStarterLinkClick.bind(this, content.data["org.matrix.neb.starter_link"])
      }, body);
    }
    const isEmptyBody = !body.props.children && !body.props.dangerouslySetInnerHTML;
    if (isEmptyBody && (_this$props4 = this.props) !== null && _this$props4 !== void 0 && _this$props4.setEmptyBody) {
      this.props.setEmptyBody(isEmptyBody);
    }
    let widgets;
    if (this.state.links.length && !this.state.widgetHidden && this.props.showUrlPreview || content["m.group_note"]) {
      widgets = /*#__PURE__*/react.createElement(preview_link_LinkPreviewGroup, {
        key: this.props.mxEvent.getId(),
        root: this.contentRef,
        links: this.state.links,
        mxEvent: this.props.mxEvent,
        onCancelClick: this.onCancelClick,
        onHeightChanged: this.props.onHeightChanged,
        onNftProfileClick: this.onNftProfileClick,
        onNftFavClick: this.onNftFavClick,
        timestamp: timestamp,
        isReply: this.props.isReply,
        displayWebsiteLinkSetting: this.props.displayWebsiteLinkSetting,
        sdmCardRef: this.props.sdmCardRef
      });
    }
    if ("m.forward" in content) {
      if (content["m.forward"].level > 1) {
        body = `[${(0,languageHandler._t)("Forward message")}]`;
      } else {
        const {
          event_id: eventIds,
          room_name: roomName
        } = content["m.forward"];
        return /*#__PURE__*/react.createElement(CombineForwardMessage.CombineForwardMessage, {
          eventIds: eventIds,
          content: content,
          roomId: this.props.mxEvent.getRoomId(),
          roomName: roomName,
          body: content.body,
          mxEvent: mxEvent,
          eventId: mxEvent.getId(),
          level: content["m.forward"].level || 0,
          reactions: this.state.reactions
        });
      }
    }
    switch (content.msgtype) {
      case _types_event/* MsgType */.Zw.Emote:
        return /*#__PURE__*/react.createElement("div", {
          className: "mx_MEmoteBody mx_EventTile_content"
        }, "*\xA0", /*#__PURE__*/react.createElement("span", {
          className: "mx_MEmoteBody_sender",
          onClick: this.onEmoteSenderClick
        }, mxEvent.sender ? mxEvent.sender.name : mxEvent.getSender()), "\xA0", body, widgets);
      case _types_event/* MsgType */.Zw.Notice:
        return /*#__PURE__*/react.createElement("div", {
          className: "mx_MNoticeBody mx_EventTile_content"
        }, body, widgets);
      default:
        // including "m.text"
        return /*#__PURE__*/react.createElement("div", {
          className: "mx_MTextBody mx_EventTile_content"
        }, body, this.renderViewAllButton(), widgets);
    }
  }
}

/***/ }),

/***/ 718471:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;
function e(t,o,n){var s;return"#text"===t.nodeName?s=n.document.createTextNode(t.data):"#comment"===t.nodeName?s=n.document.createComment(t.data):(o?s=n.document.createElementNS("http://www.w3.org/2000/svg",t.nodeName):"svg"===t.nodeName.toLowerCase()?(s=n.document.createElementNS("http://www.w3.org/2000/svg","svg"),o=!0):s=n.document.createElement(t.nodeName),t.attributes&&Object.entries(t.attributes).forEach((function(e){var t=e[0],o=e[1];return s.setAttribute(t,o)})),t.childNodes&&t.childNodes.forEach((function(t){return s.appendChild(e(t,o,n))})),n.valueDiffing&&(t.value&&(s.value=t.value),t.checked&&(s.checked=t.checked),t.selected&&(s.selected=t.selected))),s}function t(e,t){for(t=t.slice();t.length>0;){if(!e.childNodes)return!1;var o=t.splice(0,1)[0];e=e.childNodes[o]}return e}function o(o,n,s){var i,a,l,c,r=t(o,n[s._const.route]),u={diff:n,node:r};if(s.preDiffApply(u))return!0;switch(n[s._const.action]){case s._const.addAttribute:if(!r||!r.setAttribute)return!1;r.setAttribute(n[s._const.name],n[s._const.value]);break;case s._const.modifyAttribute:if(!r||!r.setAttribute)return!1;r.setAttribute(n[s._const.name],n[s._const.newValue]),"INPUT"===r.nodeName&&"value"===n[s._const.name]&&(r.value=n[s._const.newValue]);break;case s._const.removeAttribute:if(!r||!r.removeAttribute)return!1;r.removeAttribute(n[s._const.name]);break;case s._const.modifyTextElement:if(!r||3!==r.nodeType)return!1;s.textDiff(r,r.data,n[s._const.oldValue],n[s._const.newValue]);break;case s._const.modifyValue:if(!r||void 0===r.value)return!1;r.value=n[s._const.newValue];break;case s._const.modifyComment:if(!r||void 0===r.data)return!1;s.textDiff(r,r.data,n[s._const.oldValue],n[s._const.newValue]);break;case s._const.modifyChecked:if(!r||void 0===r.checked)return!1;r.checked=n[s._const.newValue];break;case s._const.modifySelected:if(!r||void 0===r.selected)return!1;r.selected=n[s._const.newValue];break;case s._const.replaceElement:r.parentNode.replaceChild(e(n[s._const.newValue],"http://www.w3.org/2000/svg"===r.namespaceURI,s),r);break;case s._const.relocateGroup:Array.apply(void 0,new Array(n.groupLength)).map((function(){return r.removeChild(r.childNodes[n[s._const.from]])})).forEach((function(e,t){0===t&&(a=r.childNodes[n[s._const.to]]),r.insertBefore(e,a||null)}));break;case s._const.removeElement:r.parentNode.removeChild(r);break;case s._const.addElement:c=(l=n[s._const.route].slice()).splice(l.length-1,1)[0],(r=t(o,l)).insertBefore(e(n[s._const.element],"http://www.w3.org/2000/svg"===r.namespaceURI,s),r.childNodes[c]||null);break;case s._const.removeTextElement:if(!r||3!==r.nodeType)return!1;r.parentNode.removeChild(r);break;case s._const.addTextElement:if(c=(l=n[s._const.route].slice()).splice(l.length-1,1)[0],i=s.document.createTextNode(n[s._const.value]),!(r=t(o,l))||!r.childNodes)return!1;r.insertBefore(i,r.childNodes[c]||null);break;default:console.log("unknown action")}return u.newNode=i,s.postDiffApply(u),!0}function n(e,t,o){var n=e[t];e[t]=e[o],e[o]=n}function s(e,t,s){t.length||(t=[t]),(t=t.slice()).reverse(),t.forEach((function(t){!function(e,t,s){switch(t[s._const.action]){case s._const.addAttribute:t[s._const.action]=s._const.removeAttribute,o(e,t,s);break;case s._const.modifyAttribute:n(t,s._const.oldValue,s._const.newValue),o(e,t,s);break;case s._const.removeAttribute:t[s._const.action]=s._const.addAttribute,o(e,t,s);break;case s._const.modifyTextElement:case s._const.modifyValue:case s._const.modifyComment:case s._const.modifyChecked:case s._const.modifySelected:case s._const.replaceElement:n(t,s._const.oldValue,s._const.newValue),o(e,t,s);break;case s._const.relocateGroup:n(t,s._const.from,s._const.to),o(e,t,s);break;case s._const.removeElement:t[s._const.action]=s._const.addElement,o(e,t,s);break;case s._const.addElement:t[s._const.action]=s._const.removeElement,o(e,t,s);break;case s._const.removeTextElement:t[s._const.action]=s._const.addTextElement,o(e,t,s);break;case s._const.addTextElement:t[s._const.action]=s._const.removeTextElement,o(e,t,s);break;default:console.log("unknown action")}}(e,t,s)}))}__webpack_unused_export__ = ({value:!0});var i=function(e){var t=this;void 0===e&&(e={}),Object.entries(e).forEach((function(e){var o=e[0],n=e[1];return t[o]=n}))};function a(e){var t=[];return t.push(e.nodeName),"#text"!==e.nodeName&&"#comment"!==e.nodeName&&e.attributes&&(e.attributes.class&&t.push(e.nodeName+"."+e.attributes.class.replace(/ /g,".")),e.attributes.id&&t.push(e.nodeName+"#"+e.attributes.id)),t}function l(e){var t={},o={};return e.forEach((function(e){a(e).forEach((function(e){var n=e in t;n||e in o?n&&(delete t[e],o[e]=!0):t[e]=!0}))})),t}function c(e,t){var o=l(e),n=l(t),s={};return Object.keys(o).forEach((function(e){n[e]&&(s[e]=!0)})),s}function r(e){return delete e.outerDone,delete e.innerDone,delete e.valueDone,!e.childNodes||e.childNodes.every(r)}function u(e,t){if(!["nodeName","value","checked","selected","data"].every((function(o){return e[o]===t[o]})))return!1;if(Boolean(e.attributes)!==Boolean(t.attributes))return!1;if(Boolean(e.childNodes)!==Boolean(t.childNodes))return!1;if(e.attributes){var o=Object.keys(e.attributes),n=Object.keys(t.attributes);if(o.length!==n.length)return!1;if(!o.every((function(o){return e.attributes[o]===t.attributes[o]})))return!1}if(e.childNodes){if(e.childNodes.length!==t.childNodes.length)return!1;if(!e.childNodes.every((function(e,o){return u(e,t.childNodes[o])})))return!1}return!0}function d(e,t,o,n,s){if(!e||!t)return!1;if(e.nodeName!==t.nodeName)return!1;if("#text"===e.nodeName)return!!s||e.data===t.data;if(e.nodeName in o)return!0;if(e.attributes&&t.attributes){if(e.attributes.id){if(e.attributes.id!==t.attributes.id)return!1;if(e.nodeName+"#"+e.attributes.id in o)return!0}if(e.attributes.class&&e.attributes.class===t.attributes.class)if(e.nodeName+"."+e.attributes.class.replace(/ /g,".")in o)return!0}if(n)return!0;var i=e.childNodes?e.childNodes.slice().reverse():[],a=t.childNodes?t.childNodes.slice().reverse():[];if(i.length!==a.length)return!1;if(s)return i.every((function(e,t){return e.nodeName===a[t].nodeName}));var l=c(i,a);return i.every((function(e,t){return d(e,a[t],l,!0,!0)}))}function h(e){return JSON.parse(JSON.stringify(e))}function f(e,t,o,n){var s=0,i=[],l=e.length,r=t.length,u=Array.apply(void 0,new Array(l+1)).map((function(){return[]})),h=c(e,t),f=l===r;f&&e.some((function(e,o){var n=a(e),s=a(t[o]);return n.length!==s.length?(f=!1,!0):(n.some((function(e,t){if(e!==s[t])return f=!1,!0})),!f||void 0)}));for(var p=0;p<l;p++)for(var m=e[p],_=0;_<r;_++){var V=t[_];o[p]||n[_]||!d(m,V,h,f)?u[p+1][_+1]=0:(u[p+1][_+1]=u[p][_]?u[p][_]+1:1,u[p+1][_+1]>=s&&(s=u[p+1][_+1],i=[p+1,_+1]))}return 0!==s&&{oldValue:i[0]-s,newValue:i[1]-s,length:s}}function p(e,t){return Array.apply(void 0,new Array(e)).map((function(){return t}))}i.prototype.toString=function(){return JSON.stringify(this)},i.prototype.setValue=function(e,t){return this[e]=t,this};var m=function(){this.list=[]};function _(e,t){var o,n,s=e;for(t=t.slice();t.length>0;){if(!s.childNodes)return!1;n=t.splice(0,1)[0],o=s,s=s.childNodes[n]}return{node:s,parentNode:o,nodeIndex:n}}function V(e,t,o){return t.forEach((function(t){!function(e,t,o){var n,s,i,a=_(e,t[o._const.route]),l=a.node,c=a.parentNode,r=a.nodeIndex,u=[],d={diff:t,node:l};if(o.preVirtualDiffApply(d))return!0;switch(t[o._const.action]){case o._const.addAttribute:l.attributes||(l.attributes={}),l.attributes[t[o._const.name]]=t[o._const.value],"checked"===t[o._const.name]?l.checked=!0:"selected"===t[o._const.name]?l.selected=!0:"INPUT"===l.nodeName&&"value"===t[o._const.name]&&(l.value=t[o._const.value]);break;case o._const.modifyAttribute:l.attributes[t[o._const.name]]=t[o._const.newValue];break;case o._const.removeAttribute:delete l.attributes[t[o._const.name]],0===Object.keys(l.attributes).length&&delete l.attributes,"checked"===t[o._const.name]?l.checked=!1:"selected"===t[o._const.name]?delete l.selected:"INPUT"===l.nodeName&&"value"===t[o._const.name]&&delete l.value;break;case o._const.modifyTextElement:l.data=t[o._const.newValue];break;case o._const.modifyValue:l.value=t[o._const.newValue];break;case o._const.modifyComment:l.data=t[o._const.newValue];break;case o._const.modifyChecked:l.checked=t[o._const.newValue];break;case o._const.modifySelected:l.selected=t[o._const.newValue];break;case o._const.replaceElement:(n=h(t[o._const.newValue])).outerDone=!0,n.innerDone=!0,n.valueDone=!0,c.childNodes[r]=n;break;case o._const.relocateGroup:l.childNodes.splice(t[o._const.from],t.groupLength).reverse().forEach((function(e){return l.childNodes.splice(t[o._const.to],0,e)})),l.subsets&&l.subsets.forEach((function(e){if(t[o._const.from]<t[o._const.to]&&e.oldValue<=t[o._const.to]&&e.oldValue>t[o._const.from]){e.oldValue-=t.groupLength;var n=e.oldValue+e.length-t[o._const.to];n>0&&(u.push({oldValue:t[o._const.to]+t.groupLength,newValue:e.newValue+e.length-n,length:n}),e.length-=n)}else if(t[o._const.from]>t[o._const.to]&&e.oldValue>t[o._const.to]&&e.oldValue<t[o._const.from]){e.oldValue+=t.groupLength;var s=e.oldValue+e.length-t[o._const.to];s>0&&(u.push({oldValue:t[o._const.to]+t.groupLength,newValue:e.newValue+e.length-s,length:s}),e.length-=s)}else e.oldValue===t[o._const.from]&&(e.oldValue=t[o._const.to])}));break;case o._const.removeElement:c.childNodes.splice(r,1),c.subsets&&c.subsets.forEach((function(e){e.oldValue>r?e.oldValue-=1:e.oldValue===r?e.delete=!0:e.oldValue<r&&e.oldValue+e.length>r&&(e.oldValue+e.length-1===r?e.length--:(u.push({newValue:e.newValue+r-e.oldValue,oldValue:r,length:e.length-r+e.oldValue-1}),e.length=r-e.oldValue))})),l=c;break;case o._const.addElement:s=t[o._const.route].slice(),i=s.splice(s.length-1,1)[0],l=_(e,s).node,(n=h(t[o._const.element])).outerDone=!0,n.innerDone=!0,n.valueDone=!0,l.childNodes||(l.childNodes=[]),i>=l.childNodes.length?l.childNodes.push(n):l.childNodes.splice(i,0,n),l.subsets&&l.subsets.forEach((function(e){if(e.oldValue>=i)e.oldValue+=1;else if(e.oldValue<i&&e.oldValue+e.length>i){var t=e.oldValue+e.length-i;u.push({newValue:e.newValue+e.length-t,oldValue:i+1,length:t}),e.length-=t}}));break;case o._const.removeTextElement:c.childNodes.splice(r,1),"TEXTAREA"===c.nodeName&&delete c.value,c.subsets&&c.subsets.forEach((function(e){e.oldValue>r?e.oldValue-=1:e.oldValue===r?e.delete=!0:e.oldValue<r&&e.oldValue+e.length>r&&(e.oldValue+e.length-1===r?e.length--:(u.push({newValue:e.newValue+r-e.oldValue,oldValue:r,length:e.length-r+e.oldValue-1}),e.length=r-e.oldValue))})),l=c;break;case o._const.addTextElement:s=t[o._const.route].slice(),i=s.splice(s.length-1,1)[0],(n={}).nodeName="#text",n.data=t[o._const.value],(l=_(e,s).node).childNodes||(l.childNodes=[]),i>=l.childNodes.length?l.childNodes.push(n):l.childNodes.splice(i,0,n),"TEXTAREA"===l.nodeName&&(l.value=t[o._const.newValue]),l.subsets&&l.subsets.forEach((function(e){if(e.oldValue>=i&&(e.oldValue+=1),e.oldValue<i&&e.oldValue+e.length>i){var t=e.oldValue+e.length-i;u.push({newValue:e.newValue+e.length-t,oldValue:i+1,length:t}),e.length-=t}}));break;default:console.log("unknown action")}l.subsets&&(l.subsets=l.subsets.filter((function(e){return!e.delete&&e.oldValue!==e.newValue})),u.length&&(l.subsets=l.subsets.concat(u))),d.newNode=n,o.postVirtualDiffApply(d)}(e,t,o)})),!0}function g(e,t){void 0===t&&(t={});var o={};if(o.nodeName=e.nodeName,"#text"===o.nodeName||"#comment"===o.nodeName)o.data=e.data;else{if(e.attributes&&e.attributes.length>0)o.attributes={},Array.prototype.slice.call(e.attributes).forEach((function(e){return o.attributes[e.name]=e.value}));if("TEXTAREA"===o.nodeName)o.value=e.value;else if(e.childNodes&&e.childNodes.length>0){o.childNodes=[],Array.prototype.slice.call(e.childNodes).forEach((function(e){return o.childNodes.push(g(e,t))}))}t.valueDiffing&&(void 0!==e.checked&&e.type&&["radio","checkbox"].includes(e.type.toLowerCase())?o.checked=e.checked:void 0!==e.value&&(o.value=e.value),void 0!==e.selected&&(o.selected=e.selected))}return o}m.prototype.add=function(e){var t;(t=this.list).push.apply(t,e)},m.prototype.forEach=function(e){this.list.forEach((function(t){return e(t)}))};var v=/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g,N=Object.create?Object.create(null):{},b=/\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;function w(e){return e.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")}var y={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuItem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};function E(e){var t={nodeName:"",attributes:{}},o=e.match(/<\/?([^\s]+?)[/\s>]/);if(o&&(t.nodeName=o[1].toUpperCase(),(y[o[1].toLowerCase()]||"/"===e.charAt(e.length-2))&&(t.voidElement=!0),t.nodeName.startsWith("!--"))){var n=e.indexOf("--\x3e");return{type:"comment",data:-1!==n?e.slice(4,n):""}}for(var s=new RegExp(b),i=null,a=!1;!a;)if(null===(i=s.exec(e)))a=!0;else if(i[0].trim())if(i[1]){var l=i[1].trim(),c=[l,""];l.indexOf("=")>-1&&(c=l.split("=")),t.attributes[c[0]]=c[1],s.lastIndex--}else i[2]&&(t.attributes[i[2]]=i[3].trim().substring(1,i[3].length-1));return t}function k(e){return function e(t){return delete t.voidElement,t.childNodes&&t.childNodes.forEach((function(t){return e(t)})),t}(function(e,t){void 0===t&&(t={components:N});var o,n=[],s=-1,i=[],a=!1;return e.replace(v,(function(l,c){if(a){if(l!=="</"+o.nodeName+">")return;a=!1}var r,u="/"!==l.charAt(1),d=l.startsWith("\x3c!--"),h=c+l.length,f=e.charAt(h);if(d){var p=E(l);return s<0?(n.push(p),n):((r=i[s])&&(r.childNodes||(r.childNodes=[]),r.childNodes.push(p)),n)}if(u&&(o=E(l),s++,"tag"===o.type&&t.components[o.nodeName]&&(o.type="component",a=!0),o.voidElement||a||!f||"<"===f||(o.childNodes||(o.childNodes=[]),o.childNodes.push({nodeName:"#text",data:w(e.slice(h,e.indexOf("<",h)))})),0===s&&n.push(o),(r=i[s-1])&&(r.childNodes||(r.childNodes=[]),r.childNodes.push(o)),i[s]=o),(!u||o.voidElement)&&(s--,!a&&"<"!==f&&f)){r=-1===s?n:i[s].childNodes||[];var m=e.indexOf("<",h),_=w(e.slice(h,-1===m?void 0:m));r.push({nodeName:"#text",data:_})}})),n[0]}(e))}var x=function(e,t,o){this.options=o,this.t1=e instanceof HTMLElement?g(e,this.options):"string"==typeof e?k(e,this.options):JSON.parse(JSON.stringify(e)),this.t2=t instanceof HTMLElement?g(t,this.options):"string"==typeof t?k(t,this.options):JSON.parse(JSON.stringify(t)),this.diffcount=0,this.foundAll=!1,this.debug&&(this.t1Orig=g(e,this.options),this.t2Orig=g(t,this.options)),this.tracker=new m};x.prototype.init=function(){return this.findDiffs(this.t1,this.t2)},x.prototype.findDiffs=function(e,t){var o;do{if(this.options.debug&&(this.diffcount+=1,this.diffcount>this.options.diffcap))throw window.diffError=[this.t1Orig,this.t2Orig],new Error("surpassed diffcap:"+JSON.stringify(this.t1Orig)+" -> "+JSON.stringify(this.t2Orig));0===(o=this.findNextDiff(e,t,[])).length&&(u(e,t)||(this.foundAll?console.error("Could not find remaining diffs!"):(this.foundAll=!0,r(e),o=this.findNextDiff(e,t,[])))),o.length>0&&(this.foundAll=!1,this.tracker.add(o),V(e,o,this.options))}while(o.length>0);return this.tracker.list},x.prototype.findNextDiff=function(e,t,o){var n,s;if(this.options.maxDepth&&o.length>this.options.maxDepth)return[];if(!e.outerDone){if(n=this.findOuterDiff(e,t,o),this.options.filterOuterDiff&&(s=this.options.filterOuterDiff(e,t,n))&&(n=s),n.length>0)return e.outerDone=!0,n;e.outerDone=!0}if(!e.innerDone){if((n=this.findInnerDiff(e,t,o)).length>0)return n;e.innerDone=!0}if(this.options.valueDiffing&&!e.valueDone){if((n=this.findValueDiff(e,t,o)).length>0)return e.valueDone=!0,n;e.valueDone=!0}return[]},x.prototype.findOuterDiff=function(e,t,o){var n,s,a,l,c,r,u=[];if(e.nodeName!==t.nodeName){if(!o.length)throw new Error("Top level nodes have to be of the same kind.");return[(new i).setValue(this.options._const.action,this.options._const.replaceElement).setValue(this.options._const.oldValue,h(e)).setValue(this.options._const.newValue,h(t)).setValue(this.options._const.route,o)]}if(o.length&&this.options.maxNodeDiffCount<Math.abs((e.childNodes||[]).length-(t.childNodes||[]).length))return[(new i).setValue(this.options._const.action,this.options._const.replaceElement).setValue(this.options._const.oldValue,h(e)).setValue(this.options._const.newValue,h(t)).setValue(this.options._const.route,o)];if(e.data!==t.data)return"#text"===e.nodeName?[(new i).setValue(this.options._const.action,this.options._const.modifyTextElement).setValue(this.options._const.route,o).setValue(this.options._const.oldValue,e.data).setValue(this.options._const.newValue,t.data)]:[(new i).setValue(this.options._const.action,this.options._const.modifyComment).setValue(this.options._const.route,o).setValue(this.options._const.oldValue,e.data).setValue(this.options._const.newValue,t.data)];for(s=e.attributes?Object.keys(e.attributes).sort():[],a=t.attributes?Object.keys(t.attributes).sort():[],l=s.length,r=0;r<l;r++)n=s[r],-1===(c=a.indexOf(n))?u.push((new i).setValue(this.options._const.action,this.options._const.removeAttribute).setValue(this.options._const.route,o).setValue(this.options._const.name,n).setValue(this.options._const.value,e.attributes[n])):(a.splice(c,1),e.attributes[n]!==t.attributes[n]&&u.push((new i).setValue(this.options._const.action,this.options._const.modifyAttribute).setValue(this.options._const.route,o).setValue(this.options._const.name,n).setValue(this.options._const.oldValue,e.attributes[n]).setValue(this.options._const.newValue,t.attributes[n])));for(l=a.length,r=0;r<l;r++)n=a[r],u.push((new i).setValue(this.options._const.action,this.options._const.addAttribute).setValue(this.options._const.route,o).setValue(this.options._const.name,n).setValue(this.options._const.value,t.attributes[n]));return u},x.prototype.findInnerDiff=function(e,t,o){var n=e.childNodes?e.childNodes.slice():[],s=t.childNodes?t.childNodes.slice():[],a=Math.max(n.length,s.length),l=Math.abs(n.length-s.length),c=[],r=0;if(!this.options.maxChildCount||a<this.options.maxChildCount){var d=e.subsets&&e.subsetsAge--,m=d?e.subsets:e.childNodes&&t.childNodes?function(e,t){for(var o=e.childNodes?e.childNodes:[],n=t.childNodes?t.childNodes:[],s=p(o.length,!1),i=p(n.length,!1),a=[],l=!0,c=function(){return arguments[1]};l;){if(l=f(o,n,s,i))a.push(l),Array.apply(void 0,new Array(l.length)).map(c).forEach((function(e){return t=e,s[l.oldValue+t]=!0,void(i[l.newValue+t]=!0);var t}))}return e.subsets=a,e.subsetsAge=100,a}(e,t):[];if(m.length>0&&(c=this.attemptGroupRelocation(e,t,m,o,d)).length>0)return c}for(var _=0;_<a;_+=1){var V=n[_],g=s[_];l&&(V&&!g?"#text"===V.nodeName?(c.push((new i).setValue(this.options._const.action,this.options._const.removeTextElement).setValue(this.options._const.route,o.concat(r)).setValue(this.options._const.value,V.data)),r-=1):(c.push((new i).setValue(this.options._const.action,this.options._const.removeElement).setValue(this.options._const.route,o.concat(r)).setValue(this.options._const.element,h(V))),r-=1):g&&!V&&("#text"===g.nodeName?c.push((new i).setValue(this.options._const.action,this.options._const.addTextElement).setValue(this.options._const.route,o.concat(r)).setValue(this.options._const.value,g.data)):c.push((new i).setValue(this.options._const.action,this.options._const.addElement).setValue(this.options._const.route,o.concat(r)).setValue(this.options._const.element,h(g))))),V&&g&&(!this.options.maxChildCount||a<this.options.maxChildCount?c=c.concat(this.findNextDiff(V,g,o.concat(r))):u(V,g)||(n.length>s.length?("#text"===V.nodeName?c.push((new i).setValue(this.options._const.action,this.options._const.removeTextElement).setValue(this.options._const.route,o.concat(r)).setValue(this.options._const.value,V.data)):c.push((new i).setValue(this.options._const.action,this.options._const.removeElement).setValue(this.options._const.element,h(V)).setValue(this.options._const.route,o.concat(r))),n.splice(_,1),_-=1,r-=1,l-=1):n.length<s.length?(c=c.concat([(new i).setValue(this.options._const.action,this.options._const.addElement).setValue(this.options._const.element,h(g)).setValue(this.options._const.route,o.concat(r))]),n.splice(_,0,{}),l-=1):c=c.concat([(new i).setValue(this.options._const.action,this.options._const.replaceElement).setValue(this.options._const.oldValue,h(V)).setValue(this.options._const.newValue,h(g)).setValue(this.options._const.route,o.concat(r))]))),r+=1}return e.innerDone=!0,c},x.prototype.attemptGroupRelocation=function(e,t,o,n,s){for(var a,l,c,r,u,f,m=function(e,t,o){var n=e.childNodes?p(e.childNodes.length,!0):[],s=t.childNodes?p(t.childNodes.length,!0):[],i=0;return o.forEach((function(e){for(var t=e.oldValue+e.length,o=e.newValue+e.length,a=e.oldValue;a<t;a+=1)n[a]=i;for(var l=e.newValue;l<o;l+=1)s[l]=i;i+=1})),{gaps1:n,gaps2:s}}(e,t,o),_=m.gaps1,V=m.gaps2,g=Math.min(_.length,V.length),v=[],N=0,b=0;N<g;b+=1,N+=1)if(!s||!0!==_[N]&&!0!==V[N]){if(!0===_[N])if("#text"===(r=e.childNodes[b]).nodeName)if("#text"===t.childNodes[N].nodeName){if(r.data!==t.childNodes[N].data){for(f=b;e.childNodes.length>f+1&&"#text"===e.childNodes[f+1].nodeName;)if(f+=1,t.childNodes[N].data===e.childNodes[f].data){u=!0;break}if(!u)return v.push((new i).setValue(this.options._const.action,this.options._const.modifyTextElement).setValue(this.options._const.route,n.concat(N)).setValue(this.options._const.oldValue,r.data).setValue(this.options._const.newValue,t.childNodes[N].data)),v}}else v.push((new i).setValue(this.options._const.action,this.options._const.removeTextElement).setValue(this.options._const.route,n.concat(N)).setValue(this.options._const.value,r.data)),_.splice(N,1),g=Math.min(_.length,V.length),N-=1;else v.push((new i).setValue(this.options._const.action,this.options._const.removeElement).setValue(this.options._const.route,n.concat(N)).setValue(this.options._const.element,h(r))),_.splice(N,1),g=Math.min(_.length,V.length),N-=1;else if(!0===V[N])"#text"===(r=t.childNodes[N]).nodeName?(v.push((new i).setValue(this.options._const.action,this.options._const.addTextElement).setValue(this.options._const.route,n.concat(N)).setValue(this.options._const.value,r.data)),_.splice(N,0,!0),g=Math.min(_.length,V.length),b-=1):(v.push((new i).setValue(this.options._const.action,this.options._const.addElement).setValue(this.options._const.route,n.concat(N)).setValue(this.options._const.element,h(r))),_.splice(N,0,!0),g=Math.min(_.length,V.length),b-=1);else if(_[N]!==V[N]){if(v.length>0)return v;if(c=o[_[N]],(l=Math.min(c.newValue,e.childNodes.length-c.length))!==c.oldValue){a=!1;for(var w=0;w<c.length;w+=1)d(e.childNodes[l+w],e.childNodes[c.oldValue+w],[],!1,!0)||(a=!0);if(a)return[(new i).setValue(this.options._const.action,this.options._const.relocateGroup).setValue("groupLength",c.length).setValue(this.options._const.from,c.oldValue).setValue(this.options._const.to,l).setValue(this.options._const.route,n)]}}}else;return v},x.prototype.findValueDiff=function(e,t,o){var n=[];return e.selected!==t.selected&&n.push((new i).setValue(this.options._const.action,this.options._const.modifySelected).setValue(this.options._const.oldValue,e.selected).setValue(this.options._const.newValue,t.selected).setValue(this.options._const.route,o)),(e.value||t.value)&&e.value!==t.value&&"OPTION"!==e.nodeName&&n.push((new i).setValue(this.options._const.action,this.options._const.modifyValue).setValue(this.options._const.oldValue,e.value||"").setValue(this.options._const.newValue,t.value||"").setValue(this.options._const.route,o)),e.checked!==t.checked&&n.push((new i).setValue(this.options._const.action,this.options._const.modifyChecked).setValue(this.options._const.oldValue,e.checked).setValue(this.options._const.newValue,t.checked).setValue(this.options._const.route,o)),n};var A={debug:!1,diffcap:10,maxDepth:!1,maxChildCount:50,valueDiffing:!0,textDiff:function(e,t,o,n){e.data=n},preVirtualDiffApply:function(){},postVirtualDiffApply:function(){},preDiffApply:function(){},postDiffApply:function(){},filterOuterDiff:null,compress:!1,_const:!1,document:!(!window||!window.document)&&window.document},D=function(e){var t=this;if(void 0===e&&(e={}),this.options=e,Object.entries(A).forEach((function(e){var o=e[0],n=e[1];Object.prototype.hasOwnProperty.call(t.options,o)||(t.options[o]=n)})),!this.options._const){var o=["addAttribute","modifyAttribute","removeAttribute","modifyTextElement","relocateGroup","removeElement","addElement","removeTextElement","addTextElement","replaceElement","modifyValue","modifyChecked","modifySelected","modifyComment","action","route","oldValue","newValue","element","group","from","to","name","value","data","attributes","nodeName","childNodes","checked","selected"];this.options._const={},this.options.compress?o.forEach((function(e,o){return t.options._const[e]=o})):o.forEach((function(e){return t.options._const[e]=e}))}this.DiffFinder=x};D.prototype.apply=function(e,t){return function(e,t,n){return t.every((function(t){return o(e,t,n)}))}(e,t,this.options)},D.prototype.undo=function(e,t){return s(e,t,this.options)},D.prototype.diff=function(e,t){return new this.DiffFinder(e,t,this.options).init()};var O=function(e){var t=this;void 0===e&&(e={}),this.pad="│   ",this.padding="",this.tick=1,this.messages=[];var o=function(e,o){var n=e[o];e[o]=function(){for(var s=[],i=arguments.length;i--;)s[i]=arguments[i];t.fin(o,Array.prototype.slice.call(s));var a=n.apply(e,s);return t.fout(o,a),a}};for(var n in e)"function"==typeof e[n]&&o(e,n);this.log("┌ TRACELOG START")};O.prototype.fin=function(e,t){this.padding+=this.pad,this.log("├─> entering "+e,t)},O.prototype.fout=function(e,t){this.log("│<──┘ generated return value",t),this.padding=this.padding.substring(0,this.padding.length-this.pad.length)},O.prototype.format=function(e,t){return function(e){for(e=""+e;e.length<4;)e="0"+e;return e}(t)+"> "+this.padding+e},O.prototype.log=function(){var e=Array.prototype.slice.call(arguments),t=function(e){return e?"string"==typeof e?e:e instanceof HTMLElement?e.outerHTML||"<empty>":e instanceof Array?"["+e.map(t).join(",")+"]":e.toString()||e.valueOf()||"<unknown>":"<falsey>"};e=e.map(t).join(", "),this.messages.push(this.format(e,this.tick++))},O.prototype.toString=function(){for(var e="└───";e.length<=this.padding.length+this.pad.length;)e+="×   ";var t=this.padding;return this.padding="",e=this.format(e,this.tick),this.padding=t,this.messages.join("\n")+"\n"+e},exports._b=D,__webpack_unused_export__=O,__webpack_unused_export__=g,__webpack_unused_export__=k;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 452027:
/***/ ((module) => {

/**
 * Diff Match and Patch
 * Copyright 2018 The diff-match-patch Authors.
 * https://github.com/google/diff-match-patch
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Computes the difference between two texts to create a patch.
 * Applies the patch onto another text, allowing for errors.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * Class containing the diff, match and patch methods.
 * @constructor
 */
var diff_match_patch = function() {

  // Defaults.
  // Redefine these in your program to override the defaults.

  // Number of seconds to map a diff before giving up (0 for infinity).
  this.Diff_Timeout = 1.0;
  // Cost of an empty edit operation in terms of edit characters.
  this.Diff_EditCost = 4;
  // At what point is no match declared (0.0 = perfection, 1.0 = very loose).
  this.Match_Threshold = 0.5;
  // How far to search for a match (0 = exact location, 1000+ = broad match).
  // A match this many characters away from the expected location will add
  // 1.0 to the score (0.0 is a perfect match).
  this.Match_Distance = 1000;
  // When deleting a large block of text (over ~64 characters), how close do
  // the contents have to be to match the expected contents. (0.0 = perfection,
  // 1.0 = very loose).  Note that Match_Threshold controls how closely the
  // end points of a delete need to match.
  this.Patch_DeleteThreshold = 0.5;
  // Chunk size for context length.
  this.Patch_Margin = 4;

  // The number of bits in an int.
  this.Match_MaxBits = 32;
};


//  DIFF FUNCTIONS


/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;

/**
 * Class representing one diff tuple.
 * ~Attempts to look like a two-element array (which is what this used to be).~
 * Constructor returns an actual two-element array, to allow destructing @JackuB
 * See https://github.com/JackuB/diff-match-patch/issues/14 for details
 * @param {number} op Operation, one of: DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL.
 * @param {string} text Text to be deleted, inserted, or retained.
 * @constructor
 */
diff_match_patch.Diff = function(op, text) {
  return [op, text];
};

/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {boolean=} opt_checklines Optional speedup flag. If present and false,
 *     then don't run a line-level diff first to identify the changed areas.
 *     Defaults to true, which does a faster, slightly less optimal diff.
 * @param {number=} opt_deadline Optional time when the diff should be complete
 *     by.  Used internally for recursive calls.  Users should set DiffTimeout
 *     instead.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 */
diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines,
    opt_deadline) {
  // Set a deadline by which time the diff must be complete.
  if (typeof opt_deadline == 'undefined') {
    if (this.Diff_Timeout <= 0) {
      opt_deadline = Number.MAX_VALUE;
    } else {
      opt_deadline = (new Date).getTime() + this.Diff_Timeout * 1000;
    }
  }
  var deadline = opt_deadline;

  // Check for null inputs.
  if (text1 == null || text2 == null) {
    throw new Error('Null input. (diff_main)');
  }

  // Check for equality (speedup).
  if (text1 == text2) {
    if (text1) {
      return [new diff_match_patch.Diff(DIFF_EQUAL, text1)];
    }
    return [];
  }

  if (typeof opt_checklines == 'undefined') {
    opt_checklines = true;
  }
  var checklines = opt_checklines;

  // Trim off common prefix (speedup).
  var commonlength = this.diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = this.diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  var diffs = this.diff_compute_(text1, text2, checklines, deadline);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, commonprefix));
  }
  if (commonsuffix) {
    diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, commonsuffix));
  }
  this.diff_cleanupMerge(diffs);
  return diffs;
};


/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {boolean} checklines Speedup flag.  If false, then don't run a
 *     line-level diff first to identify the changed areas.
 *     If true, then run a faster, slightly less optimal diff.
 * @param {number} deadline Time when the diff should be complete by.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines,
    deadline) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [new diff_match_patch.Diff(DIFF_INSERT, text2)];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [new diff_match_patch.Diff(DIFF_DELETE, text1)];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i != -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(0, i)),
             new diff_match_patch.Diff(DIFF_EQUAL, shorttext),
             new diff_match_patch.Diff(DIFF_INSERT,
                 longtext.substring(i + shorttext.length))];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length == 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [new diff_match_patch.Diff(DIFF_DELETE, text1),
            new diff_match_patch.Diff(DIFF_INSERT, text2)];
  }

  // Check to see if the problem can be split in two.
  var hm = this.diff_halfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
    var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
    // Merge the results.
    return diffs_a.concat([new diff_match_patch.Diff(DIFF_EQUAL, mid_common)],
                          diffs_b);
  }

  if (checklines && text1.length > 100 && text2.length > 100) {
    return this.diff_lineMode_(text1, text2, deadline);
  }

  return this.diff_bisect_(text1, text2, deadline);
};


/**
 * Do a quick line-level diff on both strings, then rediff the parts for
 * greater accuracy.
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} deadline Time when the diff should be complete by.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
  // Scan the text on a line-by-line basis first.
  var a = this.diff_linesToChars_(text1, text2);
  text1 = a.chars1;
  text2 = a.chars2;
  var linearray = a.lineArray;

  var diffs = this.diff_main(text1, text2, false, deadline);

  // Convert the diff back to original text.
  this.diff_charsToLines_(diffs, linearray);
  // Eliminate freak matches (e.g. blank lines)
  this.diff_cleanupSemantic(diffs);

  // Rediff any replacement blocks, this time character-by-character.
  // Add a dummy entry at the end.
  diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ''));
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete >= 1 && count_insert >= 1) {
          // Delete the offending records and add the merged ones.
          diffs.splice(pointer - count_delete - count_insert,
                       count_delete + count_insert);
          pointer = pointer - count_delete - count_insert;
          var subDiff =
              this.diff_main(text_delete, text_insert, false, deadline);
          for (var j = subDiff.length - 1; j >= 0; j--) {
            diffs.splice(pointer, 0, subDiff[j]);
          }
          pointer = pointer + subDiff.length;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
    pointer++;
  }
  diffs.pop();  // Remove the dummy entry at the end.

  return diffs;
};


/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} deadline Time at which to bail if not yet complete.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = (delta % 2 != 0);
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    // Bail out if deadline is reached.
    if ((new Date()).getTime() > deadline) {
      break;
    }

    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (x1 < text1_length && y1 < text2_length &&
             text1.charAt(x1) == text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2_length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
          // Mirror x2 onto top-left coordinate system.
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            // Overlap detected.
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (x2 < text1_length && y2 < text2_length &&
             text1.charAt(text1_length - x2 - 1) ==
             text2.charAt(text2_length - y2 - 1)) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2_length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1_length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [new diff_match_patch.Diff(DIFF_DELETE, text1),
          new diff_match_patch.Diff(DIFF_INSERT, text2)];
};


/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} x Index of split point in text1.
 * @param {number} y Index of split point in text2.
 * @param {number} deadline Time at which to bail if not yet complete.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y,
    deadline) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  // Compute both diffs serially.
  var diffs = this.diff_main(text1a, text2a, false, deadline);
  var diffsb = this.diff_main(text1b, text2b, false, deadline);

  return diffs.concat(diffsb);
};


/**
 * Split two texts into an array of strings.  Reduce the texts to a string of
 * hashes where each Unicode character represents one line.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
 *     An object containing the encoded text1, the encoded text2 and
 *     the array of unique strings.
 *     The zeroth element of the array of unique strings is intentionally blank.
 * @private
 */
diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
  var lineArray = [];  // e.g. lineArray[4] == 'Hello\n'
  var lineHash = {};   // e.g. lineHash['Hello\n'] == 4

  // '\x00' is a valid character, but various debuggers don't like it.
  // So we'll insert a junk entry to avoid generating a null character.
  lineArray[0] = '';

  /**
   * Split a text into an array of strings.  Reduce the texts to a string of
   * hashes where each Unicode character represents one line.
   * Modifies linearray and linehash through being a closure.
   * @param {string} text String to encode.
   * @return {string} Encoded string.
   * @private
   */
  function diff_linesToCharsMunge_(text) {
    var chars = '';
    // Walk the text, pulling out a substring for each line.
    // text.split('\n') would would temporarily double our memory footprint.
    // Modifying text would create many large strings to garbage collect.
    var lineStart = 0;
    var lineEnd = -1;
    // Keeping our own length variable is faster than looking it up.
    var lineArrayLength = lineArray.length;
    while (lineEnd < text.length - 1) {
      lineEnd = text.indexOf('\n', lineStart);
      if (lineEnd == -1) {
        lineEnd = text.length - 1;
      }
      var line = text.substring(lineStart, lineEnd + 1);

      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) :
          (lineHash[line] !== undefined)) {
        chars += String.fromCharCode(lineHash[line]);
      } else {
        if (lineArrayLength == maxLines) {
          // Bail out at 65535 because
          // String.fromCharCode(65536) == String.fromCharCode(0)
          line = text.substring(lineStart);
          lineEnd = text.length;
        }
        chars += String.fromCharCode(lineArrayLength);
        lineHash[line] = lineArrayLength;
        lineArray[lineArrayLength++] = line;
      }
      lineStart = lineEnd + 1;
    }
    return chars;
  }
  // Allocate 2/3rds of the space for text1, the rest for text2.
  var maxLines = 40000;
  var chars1 = diff_linesToCharsMunge_(text1);
  maxLines = 65535;
  var chars2 = diff_linesToCharsMunge_(text2);
  return {chars1: chars1, chars2: chars2, lineArray: lineArray};
};


/**
 * Rehydrate the text in a diff from a string of line hashes to real lines of
 * text.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @param {!Array.<string>} lineArray Array of unique strings.
 * @private
 */
diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
  for (var i = 0; i < diffs.length; i++) {
    var chars = diffs[i][1];
    var text = [];
    for (var j = 0; j < chars.length; j++) {
      text[j] = lineArray[chars.charCodeAt(j)];
    }
    diffs[i][1] = text.join('');
  }
};


/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */
diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: https://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) ==
        text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */
diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 ||
      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: https://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine if the suffix of one string is the prefix of another.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of the first
 *     string and the start of the second string.
 * @private
 */
diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  // Eliminate the null case.
  if (text1_length == 0 || text2_length == 0) {
    return 0;
  }
  // Truncate the longer string.
  if (text1_length > text2_length) {
    text1 = text1.substring(text1_length - text2_length);
  } else if (text1_length < text2_length) {
    text2 = text2.substring(0, text1_length);
  }
  var text_length = Math.min(text1_length, text2_length);
  // Quick check for the worst case.
  if (text1 == text2) {
    return text_length;
  }

  // Start by looking for a single character match
  // and increase length until no match is found.
  // Performance analysis: https://neil.fraser.name/news/2010/11/04/
  var best = 0;
  var length = 1;
  while (true) {
    var pattern = text1.substring(text_length - length);
    var found = text2.indexOf(pattern);
    if (found == -1) {
      return best;
    }
    length += found;
    if (found == 0 || text1.substring(text_length - length) ==
        text2.substring(0, length)) {
      best = length;
      length++;
    }
  }
};


/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {Array.<string>} Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 * @private
 */
diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
  if (this.Diff_Timeout <= 0) {
    // Don't risk returning a non-optimal diff if we have unlimited time.
    return null;
  }
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;  // Pointless.
  }
  var dmp = this;  // 'this' becomes 'window' in a closure.

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {string} longtext Longer string.
   * @param {string} shorttext Shorter string.
   * @param {number} i Start index of quarter length substring within longtext.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
   *     of shorttext and the common middle.  Or null if there was no match.
   * @private
   */
  function diff_halfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
      var prefixLength = dmp.diff_commonPrefix(longtext.substring(i),
                                               shorttext.substring(j));
      var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i),
                                               shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(j - suffixLength, j) +
            shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [best_longtext_a, best_longtext_b,
              best_shorttext_a, best_shorttext_b, best_common];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};


/**
 * Reduce the number of edits by eliminating semantically trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  /** @type {?string} */
  var lastEquality = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
  var pointer = 0;  // Index of current position.
  // Number of characters that changed prior to the equality.
  var length_insertions1 = 0;
  var length_deletions1 = 0;
  // Number of characters that changed after the equality.
  var length_insertions2 = 0;
  var length_deletions2 = 0;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
      equalities[equalitiesLength++] = pointer;
      length_insertions1 = length_insertions2;
      length_deletions1 = length_deletions2;
      length_insertions2 = 0;
      length_deletions2 = 0;
      lastEquality = diffs[pointer][1];
    } else {  // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_INSERT) {
        length_insertions2 += diffs[pointer][1].length;
      } else {
        length_deletions2 += diffs[pointer][1].length;
      }
      // Eliminate an equality that is smaller or equal to the edits on both
      // sides of it.
      if (lastEquality && (lastEquality.length <=
          Math.max(length_insertions1, length_deletions1)) &&
          (lastEquality.length <= Math.max(length_insertions2,
                                           length_deletions2))) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        // Throw away the equality we just deleted.
        equalitiesLength--;
        // Throw away the previous equality (it needs to be reevaluated).
        equalitiesLength--;
        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
        length_insertions1 = 0;  // Reset the counters.
        length_deletions1 = 0;
        length_insertions2 = 0;
        length_deletions2 = 0;
        lastEquality = null;
        changes = true;
      }
    }
    pointer++;
  }

  // Normalize the diff.
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
  this.diff_cleanupSemanticLossless(diffs);

  // Find any overlaps between deletions and insertions.
  // e.g: <del>abcxxx</del><ins>xxxdef</ins>
  //   -> <del>abc</del>xxx<ins>def</ins>
  // e.g: <del>xxxabc</del><ins>defxxx</ins>
  //   -> <ins>def</ins>xxx<del>abc</del>
  // Only extract an overlap if it is as big as the edit ahead or behind it.
  pointer = 1;
  while (pointer < diffs.length) {
    if (diffs[pointer - 1][0] == DIFF_DELETE &&
        diffs[pointer][0] == DIFF_INSERT) {
      var deletion = diffs[pointer - 1][1];
      var insertion = diffs[pointer][1];
      var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
      var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
      if (overlap_length1 >= overlap_length2) {
        if (overlap_length1 >= deletion.length / 2 ||
            overlap_length1 >= insertion.length / 2) {
          // Overlap found.  Insert an equality and trim the surrounding edits.
          diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL,
              insertion.substring(0, overlap_length1)));
          diffs[pointer - 1][1] =
              deletion.substring(0, deletion.length - overlap_length1);
          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
          pointer++;
        }
      } else {
        if (overlap_length2 >= deletion.length / 2 ||
            overlap_length2 >= insertion.length / 2) {
          // Reverse overlap found.
          // Insert an equality and swap and trim the surrounding edits.
          diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL,
              deletion.substring(0, overlap_length2)));
          diffs[pointer - 1][0] = DIFF_INSERT;
          diffs[pointer - 1][1] =
              insertion.substring(0, insertion.length - overlap_length2);
          diffs[pointer + 1][0] = DIFF_DELETE;
          diffs[pointer + 1][1] =
              deletion.substring(overlap_length2);
          pointer++;
        }
      }
      pointer++;
    }
    pointer++;
  }
};


/**
 * Look for single edits surrounded on both sides by equalities
 * which can be shifted sideways to align the edit to a word boundary.
 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
  /**
   * Given two strings, compute a score representing whether the internal
   * boundary falls on logical boundaries.
   * Scores range from 6 (best) to 0 (worst).
   * Closure, but does not reference any external variables.
   * @param {string} one First string.
   * @param {string} two Second string.
   * @return {number} The score.
   * @private
   */
  function diff_cleanupSemanticScore_(one, two) {
    if (!one || !two) {
      // Edges are the best.
      return 6;
    }

    // Each port of this function behaves slightly differently due to
    // subtle differences in each language's definition of things like
    // 'whitespace'.  Since this function's purpose is largely cosmetic,
    // the choice has been made to use each language's native features
    // rather than force total conformity.
    var char1 = one.charAt(one.length - 1);
    var char2 = two.charAt(0);
    var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
    var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
    var whitespace1 = nonAlphaNumeric1 &&
        char1.match(diff_match_patch.whitespaceRegex_);
    var whitespace2 = nonAlphaNumeric2 &&
        char2.match(diff_match_patch.whitespaceRegex_);
    var lineBreak1 = whitespace1 &&
        char1.match(diff_match_patch.linebreakRegex_);
    var lineBreak2 = whitespace2 &&
        char2.match(diff_match_patch.linebreakRegex_);
    var blankLine1 = lineBreak1 &&
        one.match(diff_match_patch.blanklineEndRegex_);
    var blankLine2 = lineBreak2 &&
        two.match(diff_match_patch.blanklineStartRegex_);

    if (blankLine1 || blankLine2) {
      // Five points for blank lines.
      return 5;
    } else if (lineBreak1 || lineBreak2) {
      // Four points for line breaks.
      return 4;
    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
      // Three points for end of sentences.
      return 3;
    } else if (whitespace1 || whitespace2) {
      // Two points for whitespace.
      return 2;
    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
      // One point for non-alphanumeric.
      return 1;
    }
    return 0;
  }

  var pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      var equality1 = diffs[pointer - 1][1];
      var edit = diffs[pointer][1];
      var equality2 = diffs[pointer + 1][1];

      // First, shift the edit as far left as possible.
      var commonOffset = this.diff_commonSuffix(equality1, edit);
      if (commonOffset) {
        var commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset);
        edit = commonString + edit.substring(0, edit.length - commonOffset);
        equality2 = commonString + equality2;
      }

      // Second, step character by character right, looking for the best fit.
      var bestEquality1 = equality1;
      var bestEdit = edit;
      var bestEquality2 = equality2;
      var bestScore = diff_cleanupSemanticScore_(equality1, edit) +
          diff_cleanupSemanticScore_(edit, equality2);
      while (edit.charAt(0) === equality2.charAt(0)) {
        equality1 += edit.charAt(0);
        edit = edit.substring(1) + equality2.charAt(0);
        equality2 = equality2.substring(1);
        var score = diff_cleanupSemanticScore_(equality1, edit) +
            diff_cleanupSemanticScore_(edit, equality2);
        // The >= encourages trailing rather than leading whitespace on edits.
        if (score >= bestScore) {
          bestScore = score;
          bestEquality1 = equality1;
          bestEdit = edit;
          bestEquality2 = equality2;
        }
      }

      if (diffs[pointer - 1][1] != bestEquality1) {
        // We have an improvement, save it back to the diff.
        if (bestEquality1) {
          diffs[pointer - 1][1] = bestEquality1;
        } else {
          diffs.splice(pointer - 1, 1);
          pointer--;
        }
        diffs[pointer][1] = bestEdit;
        if (bestEquality2) {
          diffs[pointer + 1][1] = bestEquality2;
        } else {
          diffs.splice(pointer + 1, 1);
          pointer--;
        }
      }
    }
    pointer++;
  }
};

// Define some regex patterns for matching boundaries.
diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
diff_match_patch.whitespaceRegex_ = /\s/;
diff_match_patch.linebreakRegex_ = /[\r\n]/;
diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;

/**
 * Reduce the number of edits by eliminating operationally trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  /** @type {?string} */
  var lastEquality = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
  var pointer = 0;  // Index of current position.
  // Is there an insertion operation before the last equality.
  var pre_ins = false;
  // Is there a deletion operation before the last equality.
  var pre_del = false;
  // Is there an insertion operation after the last equality.
  var post_ins = false;
  // Is there a deletion operation after the last equality.
  var post_del = false;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
      if (diffs[pointer][1].length < this.Diff_EditCost &&
          (post_ins || post_del)) {
        // Candidate found.
        equalities[equalitiesLength++] = pointer;
        pre_ins = post_ins;
        pre_del = post_del;
        lastEquality = diffs[pointer][1];
      } else {
        // Not a candidate, and can never become one.
        equalitiesLength = 0;
        lastEquality = null;
      }
      post_ins = post_del = false;
    } else {  // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_DELETE) {
        post_del = true;
      } else {
        post_ins = true;
      }
      /*
       * Five types to be split:
       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
       * <ins>A</ins>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<ins>C</ins>
       * <ins>A</del>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<del>C</del>
       */
      if (lastEquality && ((pre_ins && pre_del && post_ins && post_del) ||
                           ((lastEquality.length < this.Diff_EditCost / 2) &&
                            (pre_ins + pre_del + post_ins + post_del) == 3))) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        equalitiesLength--;  // Throw away the equality we just deleted;
        lastEquality = null;
        if (pre_ins && pre_del) {
          // No changes made which could affect previous entry, keep going.
          post_ins = post_del = true;
          equalitiesLength = 0;
        } else {
          equalitiesLength--;  // Throw away the previous equality.
          pointer = equalitiesLength > 0 ?
              equalities[equalitiesLength - 1] : -1;
          post_ins = post_del = false;
        }
        changes = true;
      }
    }
    pointer++;
  }

  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
  // Add a dummy entry at the end.
  diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ''));
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete + count_insert > 1) {
          if (count_delete !== 0 && count_insert !== 0) {
            // Factor out any common prefixies.
            commonlength = this.diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if ((pointer - count_delete - count_insert) > 0 &&
                  diffs[pointer - count_delete - count_insert - 1][0] ==
                  DIFF_EQUAL) {
                diffs[pointer - count_delete - count_insert - 1][1] +=
                    text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, new diff_match_patch.Diff(DIFF_EQUAL,
                    text_insert.substring(0, commonlength)));
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixies.
            commonlength = this.diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] = text_insert.substring(text_insert.length -
                  commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length -
                  commonlength);
              text_delete = text_delete.substring(0, text_delete.length -
                  commonlength);
            }
          }
          // Delete the offending records and add the merged ones.
          pointer -= count_delete + count_insert;
          diffs.splice(pointer, count_delete + count_insert);
          if (text_delete.length) {
            diffs.splice(pointer, 0,
                new diff_match_patch.Diff(DIFF_DELETE, text_delete));
            pointer++;
          }
          if (text_insert.length) {
            diffs.splice(pointer, 0,
                new diff_match_patch.Diff(DIFF_INSERT, text_insert));
            pointer++;
          }
          pointer++;
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();  // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length -
          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
            diffs[pointer][1].substring(0, diffs[pointer][1].length -
                                        diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
          diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
            diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * loc is a location in text1, compute and return the equivalent location in
 * text2.
 * e.g. 'The cat' vs 'The big cat', 1->1, 5->8
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @param {number} loc Location within text1.
 * @return {number} Location within text2.
 */
diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
  var chars1 = 0;
  var chars2 = 0;
  var last_chars1 = 0;
  var last_chars2 = 0;
  var x;
  for (x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {  // Equality or deletion.
      chars1 += diffs[x][1].length;
    }
    if (diffs[x][0] !== DIFF_DELETE) {  // Equality or insertion.
      chars2 += diffs[x][1].length;
    }
    if (chars1 > loc) {  // Overshot the location.
      break;
    }
    last_chars1 = chars1;
    last_chars2 = chars2;
  }
  // Was the location was deleted?
  if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
    return last_chars2;
  }
  // Add the remaining character length.
  return last_chars2 + (loc - last_chars1);
};


/**
 * Convert a diff array into a pretty HTML report.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} HTML representation.
 */
diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
  var html = [];
  var pattern_amp = /&/g;
  var pattern_lt = /</g;
  var pattern_gt = />/g;
  var pattern_para = /\n/g;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];    // Operation (insert, delete, equal)
    var data = diffs[x][1];  // Text of change.
    var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
        .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
    switch (op) {
      case DIFF_INSERT:
        html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
        break;
      case DIFF_DELETE:
        html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
        break;
      case DIFF_EQUAL:
        html[x] = '<span>' + text + '</span>';
        break;
    }
  }
  return html.join('');
};


/**
 * Compute and return the source text (all equalities and deletions).
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Source text.
 */
diff_match_patch.prototype.diff_text1 = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};


/**
 * Compute and return the destination text (all equalities and insertions).
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Destination text.
 */
diff_match_patch.prototype.diff_text2 = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_DELETE) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};


/**
 * Compute the Levenshtein distance; the number of inserted, deleted or
 * substituted characters.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {number} Number of changes.
 */
diff_match_patch.prototype.diff_levenshtein = function(diffs) {
  var levenshtein = 0;
  var insertions = 0;
  var deletions = 0;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];
    var data = diffs[x][1];
    switch (op) {
      case DIFF_INSERT:
        insertions += data.length;
        break;
      case DIFF_DELETE:
        deletions += data.length;
        break;
      case DIFF_EQUAL:
        // A deletion and an insertion is one substitution.
        levenshtein += Math.max(insertions, deletions);
        insertions = 0;
        deletions = 0;
        break;
    }
  }
  levenshtein += Math.max(insertions, deletions);
  return levenshtein;
};


/**
 * Crush the diff into an encoded string which describes the operations
 * required to transform text1 into text2.
 * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.
 * Operations are tab-separated.  Inserted text is escaped using %xx notation.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Delta text.
 */
diff_match_patch.prototype.diff_toDelta = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    switch (diffs[x][0]) {
      case DIFF_INSERT:
        text[x] = '+' + encodeURI(diffs[x][1]);
        break;
      case DIFF_DELETE:
        text[x] = '-' + diffs[x][1].length;
        break;
      case DIFF_EQUAL:
        text[x] = '=' + diffs[x][1].length;
        break;
    }
  }
  return text.join('\t').replace(/%20/g, ' ');
};


/**
 * Given the original text1, and an encoded string which describes the
 * operations required to transform text1 into text2, compute the full diff.
 * @param {string} text1 Source string for the diff.
 * @param {string} delta Delta text.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @throws {!Error} If invalid input.
 */
diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
  var diffs = [];
  var diffsLength = 0;  // Keeping our own length var is faster in JS.
  var pointer = 0;  // Cursor in text1
  var tokens = delta.split(/\t/g);
  for (var x = 0; x < tokens.length; x++) {
    // Each token begins with a one character parameter which specifies the
    // operation of this token (delete, insert, equality).
    var param = tokens[x].substring(1);
    switch (tokens[x].charAt(0)) {
      case '+':
        try {
          diffs[diffsLength++] =
              new diff_match_patch.Diff(DIFF_INSERT, decodeURI(param));
        } catch (ex) {
          // Malformed URI sequence.
          throw new Error('Illegal escape in diff_fromDelta: ' + param);
        }
        break;
      case '-':
        // Fall through.
      case '=':
        var n = parseInt(param, 10);
        if (isNaN(n) || n < 0) {
          throw new Error('Invalid number in diff_fromDelta: ' + param);
        }
        var text = text1.substring(pointer, pointer += n);
        if (tokens[x].charAt(0) == '=') {
          diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_EQUAL, text);
        } else {
          diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_DELETE, text);
        }
        break;
      default:
        // Blank tokens are ok (from a trailing \t).
        // Anything else is an error.
        if (tokens[x]) {
          throw new Error('Invalid diff operation in diff_fromDelta: ' +
                          tokens[x]);
        }
    }
  }
  if (pointer != text1.length) {
    throw new Error('Delta length (' + pointer +
        ') does not equal source text length (' + text1.length + ').');
  }
  return diffs;
};


//  MATCH FUNCTIONS


/**
 * Locate the best instance of 'pattern' in 'text' near 'loc'.
 * @param {string} text The text to search.
 * @param {string} pattern The pattern to search for.
 * @param {number} loc The location to search around.
 * @return {number} Best match index or -1.
 */
diff_match_patch.prototype.match_main = function(text, pattern, loc) {
  // Check for null inputs.
  if (text == null || pattern == null || loc == null) {
    throw new Error('Null input. (match_main)');
  }

  loc = Math.max(0, Math.min(loc, text.length));
  if (text == pattern) {
    // Shortcut (potentially not guaranteed by the algorithm)
    return 0;
  } else if (!text.length) {
    // Nothing to match.
    return -1;
  } else if (text.substring(loc, loc + pattern.length) == pattern) {
    // Perfect match at the perfect spot!  (Includes case of null pattern)
    return loc;
  } else {
    // Do a fuzzy compare.
    return this.match_bitap_(text, pattern, loc);
  }
};


/**
 * Locate the best instance of 'pattern' in 'text' near 'loc' using the
 * Bitap algorithm.
 * @param {string} text The text to search.
 * @param {string} pattern The pattern to search for.
 * @param {number} loc The location to search around.
 * @return {number} Best match index or -1.
 * @private
 */
diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
  if (pattern.length > this.Match_MaxBits) {
    throw new Error('Pattern too long for this browser.');
  }

  // Initialise the alphabet.
  var s = this.match_alphabet_(pattern);

  var dmp = this;  // 'this' becomes 'window' in a closure.

  /**
   * Compute and return the score for a match with e errors and x location.
   * Accesses loc and pattern through being a closure.
   * @param {number} e Number of errors in match.
   * @param {number} x Location of match.
   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
   * @private
   */
  function match_bitapScore_(e, x) {
    var accuracy = e / pattern.length;
    var proximity = Math.abs(loc - x);
    if (!dmp.Match_Distance) {
      // Dodge divide by zero error.
      return proximity ? 1.0 : accuracy;
    }
    return accuracy + (proximity / dmp.Match_Distance);
  }

  // Highest score beyond which we give up.
  var score_threshold = this.Match_Threshold;
  // Is there a nearby exact match? (speedup)
  var best_loc = text.indexOf(pattern, loc);
  if (best_loc != -1) {
    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
    // What about in the other direction? (speedup)
    best_loc = text.lastIndexOf(pattern, loc + pattern.length);
    if (best_loc != -1) {
      score_threshold =
          Math.min(match_bitapScore_(0, best_loc), score_threshold);
    }
  }

  // Initialise the bit arrays.
  var matchmask = 1 << (pattern.length - 1);
  best_loc = -1;

  var bin_min, bin_mid;
  var bin_max = pattern.length + text.length;
  var last_rd;
  for (var d = 0; d < pattern.length; d++) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from 'loc' we can stray at this
    // error level.
    bin_min = 0;
    bin_mid = bin_max;
    while (bin_min < bin_mid) {
      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
        bin_min = bin_mid;
      } else {
        bin_max = bin_mid;
      }
      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
    }
    // Use the result from this iteration as the maximum for the next.
    bin_max = bin_mid;
    var start = Math.max(1, loc - bin_mid + 1);
    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;

    var rd = Array(finish + 2);
    rd[finish + 1] = (1 << d) - 1;
    for (var j = finish; j >= start; j--) {
      // The alphabet (s) is a sparse hash, so the following line generates
      // warnings.
      var charMatch = s[text.charAt(j - 1)];
      if (d === 0) {  // First pass: exact match.
        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
      } else {  // Subsequent passes: fuzzy match.
        rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) |
                (((last_rd[j + 1] | last_rd[j]) << 1) | 1) |
                last_rd[j + 1];
      }
      if (rd[j] & matchmask) {
        var score = match_bitapScore_(d, j - 1);
        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (score <= score_threshold) {
          // Told you so.
          score_threshold = score;
          best_loc = j - 1;
          if (best_loc > loc) {
            // When passing loc, don't exceed our current distance from loc.
            start = Math.max(1, 2 * loc - best_loc);
          } else {
            // Already passed loc, downhill from here on in.
            break;
          }
        }
      }
    }
    // No hope for a (better) match at greater error levels.
    if (match_bitapScore_(d + 1, loc) > score_threshold) {
      break;
    }
    last_rd = rd;
  }
  return best_loc;
};


/**
 * Initialise the alphabet for the Bitap algorithm.
 * @param {string} pattern The text to encode.
 * @return {!Object} Hash of character locations.
 * @private
 */
diff_match_patch.prototype.match_alphabet_ = function(pattern) {
  var s = {};
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] = 0;
  }
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
  }
  return s;
};


//  PATCH FUNCTIONS


/**
 * Increase the context until it is unique,
 * but don't let the pattern expand beyond Match_MaxBits.
 * @param {!diff_match_patch.patch_obj} patch The patch to grow.
 * @param {string} text Source text.
 * @private
 */
diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
  if (text.length == 0) {
    return;
  }
  if (patch.start2 === null) {
    throw Error('patch not initialized');
  }
  var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
  var padding = 0;

  // Look for the first and last matches of pattern in text.  If two different
  // matches are found, increase the pattern length.
  while (text.indexOf(pattern) != text.lastIndexOf(pattern) &&
         pattern.length < this.Match_MaxBits - this.Patch_Margin -
         this.Patch_Margin) {
    padding += this.Patch_Margin;
    pattern = text.substring(patch.start2 - padding,
                             patch.start2 + patch.length1 + padding);
  }
  // Add one chunk for good luck.
  padding += this.Patch_Margin;

  // Add the prefix.
  var prefix = text.substring(patch.start2 - padding, patch.start2);
  if (prefix) {
    patch.diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, prefix));
  }
  // Add the suffix.
  var suffix = text.substring(patch.start2 + patch.length1,
                              patch.start2 + patch.length1 + padding);
  if (suffix) {
    patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, suffix));
  }

  // Roll back the start points.
  patch.start1 -= prefix.length;
  patch.start2 -= prefix.length;
  // Extend the lengths.
  patch.length1 += prefix.length + suffix.length;
  patch.length2 += prefix.length + suffix.length;
};


/**
 * Compute a list of patches to turn text1 into text2.
 * Use diffs if provided, otherwise compute it ourselves.
 * There are four ways to call this function, depending on what data is
 * available to the caller:
 * Method 1:
 * a = text1, b = text2
 * Method 2:
 * a = diffs
 * Method 3 (optimal):
 * a = text1, b = diffs
 * Method 4 (deprecated, use method 3):
 * a = text1, b = text2, c = diffs
 *
 * @param {string|!Array.<!diff_match_patch.Diff>} a text1 (methods 1,3,4) or
 * Array of diff tuples for text1 to text2 (method 2).
 * @param {string|!Array.<!diff_match_patch.Diff>=} opt_b text2 (methods 1,4) or
 * Array of diff tuples for text1 to text2 (method 3) or undefined (method 2).
 * @param {string|!Array.<!diff_match_patch.Diff>=} opt_c Array of diff tuples
 * for text1 to text2 (method 4) or undefined (methods 1,2,3).
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 */
diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {
  var text1, diffs;
  if (typeof a == 'string' && typeof opt_b == 'string' &&
      typeof opt_c == 'undefined') {
    // Method 1: text1, text2
    // Compute diffs from text1 and text2.
    text1 = /** @type {string} */(a);
    diffs = this.diff_main(text1, /** @type {string} */(opt_b), true);
    if (diffs.length > 2) {
      this.diff_cleanupSemantic(diffs);
      this.diff_cleanupEfficiency(diffs);
    }
  } else if (a && typeof a == 'object' && typeof opt_b == 'undefined' &&
      typeof opt_c == 'undefined') {
    // Method 2: diffs
    // Compute text1 from diffs.
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(a);
    text1 = this.diff_text1(diffs);
  } else if (typeof a == 'string' && opt_b && typeof opt_b == 'object' &&
      typeof opt_c == 'undefined') {
    // Method 3: text1, diffs
    text1 = /** @type {string} */(a);
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_b);
  } else if (typeof a == 'string' && typeof opt_b == 'string' &&
      opt_c && typeof opt_c == 'object') {
    // Method 4: text1, text2, diffs
    // text2 is not used.
    text1 = /** @type {string} */(a);
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_c);
  } else {
    throw new Error('Unknown call format to patch_make.');
  }

  if (diffs.length === 0) {
    return [];  // Get rid of the null case.
  }
  var patches = [];
  var patch = new diff_match_patch.patch_obj();
  var patchDiffLength = 0;  // Keeping our own length var is faster in JS.
  var char_count1 = 0;  // Number of characters into the text1 string.
  var char_count2 = 0;  // Number of characters into the text2 string.
  // Start with text1 (prepatch_text) and apply the diffs until we arrive at
  // text2 (postpatch_text).  We recreate the patches one by one to determine
  // context info.
  var prepatch_text = text1;
  var postpatch_text = text1;
  for (var x = 0; x < diffs.length; x++) {
    var diff_type = diffs[x][0];
    var diff_text = diffs[x][1];

    if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
      // A new patch starts here.
      patch.start1 = char_count1;
      patch.start2 = char_count2;
    }

    switch (diff_type) {
      case DIFF_INSERT:
        patch.diffs[patchDiffLength++] = diffs[x];
        patch.length2 += diff_text.length;
        postpatch_text = postpatch_text.substring(0, char_count2) + diff_text +
                         postpatch_text.substring(char_count2);
        break;
      case DIFF_DELETE:
        patch.length1 += diff_text.length;
        patch.diffs[patchDiffLength++] = diffs[x];
        postpatch_text = postpatch_text.substring(0, char_count2) +
                         postpatch_text.substring(char_count2 +
                             diff_text.length);
        break;
      case DIFF_EQUAL:
        if (diff_text.length <= 2 * this.Patch_Margin &&
            patchDiffLength && diffs.length != x + 1) {
          // Small equality inside a patch.
          patch.diffs[patchDiffLength++] = diffs[x];
          patch.length1 += diff_text.length;
          patch.length2 += diff_text.length;
        } else if (diff_text.length >= 2 * this.Patch_Margin) {
          // Time for a new patch.
          if (patchDiffLength) {
            this.patch_addContext_(patch, prepatch_text);
            patches.push(patch);
            patch = new diff_match_patch.patch_obj();
            patchDiffLength = 0;
            // Unlike Unidiff, our patch lists have a rolling context.
            // https://github.com/google/diff-match-patch/wiki/Unidiff
            // Update prepatch text & pos to reflect the application of the
            // just completed patch.
            prepatch_text = postpatch_text;
            char_count1 = char_count2;
          }
        }
        break;
    }

    // Update the current character count.
    if (diff_type !== DIFF_INSERT) {
      char_count1 += diff_text.length;
    }
    if (diff_type !== DIFF_DELETE) {
      char_count2 += diff_text.length;
    }
  }
  // Pick up the leftover patch if not empty.
  if (patchDiffLength) {
    this.patch_addContext_(patch, prepatch_text);
    patches.push(patch);
  }

  return patches;
};


/**
 * Given an array of patches, return another array that is identical.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 */
diff_match_patch.prototype.patch_deepCopy = function(patches) {
  // Making deep copies is hard in JavaScript.
  var patchesCopy = [];
  for (var x = 0; x < patches.length; x++) {
    var patch = patches[x];
    var patchCopy = new diff_match_patch.patch_obj();
    patchCopy.diffs = [];
    for (var y = 0; y < patch.diffs.length; y++) {
      patchCopy.diffs[y] =
          new diff_match_patch.Diff(patch.diffs[y][0], patch.diffs[y][1]);
    }
    patchCopy.start1 = patch.start1;
    patchCopy.start2 = patch.start2;
    patchCopy.length1 = patch.length1;
    patchCopy.length2 = patch.length2;
    patchesCopy[x] = patchCopy;
  }
  return patchesCopy;
};


/**
 * Merge a set of patches onto the text.  Return a patched text, as well
 * as a list of true/false values indicating which patches were applied.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @param {string} text Old text.
 * @return {!Array.<string|!Array.<boolean>>} Two element Array, containing the
 *      new text and an array of boolean values.
 */
diff_match_patch.prototype.patch_apply = function(patches, text) {
  if (patches.length == 0) {
    return [text, []];
  }

  // Deep copy the patches so that no changes are made to originals.
  patches = this.patch_deepCopy(patches);

  var nullPadding = this.patch_addPadding(patches);
  text = nullPadding + text + nullPadding;

  this.patch_splitMax(patches);
  // delta keeps track of the offset between the expected and actual location
  // of the previous patch.  If there are patches expected at positions 10 and
  // 20, but the first patch was found at 12, delta is 2 and the second patch
  // has an effective expected position of 22.
  var delta = 0;
  var results = [];
  for (var x = 0; x < patches.length; x++) {
    var expected_loc = patches[x].start2 + delta;
    var text1 = this.diff_text1(patches[x].diffs);
    var start_loc;
    var end_loc = -1;
    if (text1.length > this.Match_MaxBits) {
      // patch_splitMax will only provide an oversized pattern in the case of
      // a monster delete.
      start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits),
                                  expected_loc);
      if (start_loc != -1) {
        end_loc = this.match_main(text,
            text1.substring(text1.length - this.Match_MaxBits),
            expected_loc + text1.length - this.Match_MaxBits);
        if (end_loc == -1 || start_loc >= end_loc) {
          // Can't find valid trailing context.  Drop this patch.
          start_loc = -1;
        }
      }
    } else {
      start_loc = this.match_main(text, text1, expected_loc);
    }
    if (start_loc == -1) {
      // No match found.  :(
      results[x] = false;
      // Subtract the delta for this failed patch from subsequent patches.
      delta -= patches[x].length2 - patches[x].length1;
    } else {
      // Found a match.  :)
      results[x] = true;
      delta = start_loc - expected_loc;
      var text2;
      if (end_loc == -1) {
        text2 = text.substring(start_loc, start_loc + text1.length);
      } else {
        text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
      }
      if (text1 == text2) {
        // Perfect match, just shove the replacement text in.
        text = text.substring(0, start_loc) +
               this.diff_text2(patches[x].diffs) +
               text.substring(start_loc + text1.length);
      } else {
        // Imperfect match.  Run a diff to get a framework of equivalent
        // indices.
        var diffs = this.diff_main(text1, text2, false);
        if (text1.length > this.Match_MaxBits &&
            this.diff_levenshtein(diffs) / text1.length >
            this.Patch_DeleteThreshold) {
          // The end points match, but the content is unacceptably bad.
          results[x] = false;
        } else {
          this.diff_cleanupSemanticLossless(diffs);
          var index1 = 0;
          var index2;
          for (var y = 0; y < patches[x].diffs.length; y++) {
            var mod = patches[x].diffs[y];
            if (mod[0] !== DIFF_EQUAL) {
              index2 = this.diff_xIndex(diffs, index1);
            }
            if (mod[0] === DIFF_INSERT) {  // Insertion
              text = text.substring(0, start_loc + index2) + mod[1] +
                     text.substring(start_loc + index2);
            } else if (mod[0] === DIFF_DELETE) {  // Deletion
              text = text.substring(0, start_loc + index2) +
                     text.substring(start_loc + this.diff_xIndex(diffs,
                         index1 + mod[1].length));
            }
            if (mod[0] !== DIFF_DELETE) {
              index1 += mod[1].length;
            }
          }
        }
      }
    }
  }
  // Strip the padding off.
  text = text.substring(nullPadding.length, text.length - nullPadding.length);
  return [text, results];
};


/**
 * Add some padding on text start and end so that edges can match something.
 * Intended to be called only from within patch_apply.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {string} The padding string added to each side.
 */
diff_match_patch.prototype.patch_addPadding = function(patches) {
  var paddingLength = this.Patch_Margin;
  var nullPadding = '';
  for (var x = 1; x <= paddingLength; x++) {
    nullPadding += String.fromCharCode(x);
  }

  // Bump all the patches forward.
  for (var x = 0; x < patches.length; x++) {
    patches[x].start1 += paddingLength;
    patches[x].start2 += paddingLength;
  }

  // Add some padding on start of first diff.
  var patch = patches[0];
  var diffs = patch.diffs;
  if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
    // Add nullPadding equality.
    diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
    patch.start1 -= paddingLength;  // Should be 0.
    patch.start2 -= paddingLength;  // Should be 0.
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[0][1].length) {
    // Grow first equality.
    var extraLength = paddingLength - diffs[0][1].length;
    diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
    patch.start1 -= extraLength;
    patch.start2 -= extraLength;
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  // Add some padding on end of last diff.
  patch = patches[patches.length - 1];
  diffs = patch.diffs;
  if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
    // Add nullPadding equality.
    diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[diffs.length - 1][1].length) {
    // Grow last equality.
    var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  return nullPadding;
};


/**
 * Look through the patches and break up any which are longer than the maximum
 * limit of the match algorithm.
 * Intended to be called only from within patch_apply.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 */
diff_match_patch.prototype.patch_splitMax = function(patches) {
  var patch_size = this.Match_MaxBits;
  for (var x = 0; x < patches.length; x++) {
    if (patches[x].length1 <= patch_size) {
      continue;
    }
    var bigpatch = patches[x];
    // Remove the big old patch.
    patches.splice(x--, 1);
    var start1 = bigpatch.start1;
    var start2 = bigpatch.start2;
    var precontext = '';
    while (bigpatch.diffs.length !== 0) {
      // Create one of several smaller patches.
      var patch = new diff_match_patch.patch_obj();
      var empty = true;
      patch.start1 = start1 - precontext.length;
      patch.start2 = start2 - precontext.length;
      if (precontext !== '') {
        patch.length1 = patch.length2 = precontext.length;
        patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, precontext));
      }
      while (bigpatch.diffs.length !== 0 &&
             patch.length1 < patch_size - this.Patch_Margin) {
        var diff_type = bigpatch.diffs[0][0];
        var diff_text = bigpatch.diffs[0][1];
        if (diff_type === DIFF_INSERT) {
          // Insertions are harmless.
          patch.length2 += diff_text.length;
          start2 += diff_text.length;
          patch.diffs.push(bigpatch.diffs.shift());
          empty = false;
        } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 &&
                   patch.diffs[0][0] == DIFF_EQUAL &&
                   diff_text.length > 2 * patch_size) {
          // This is a large deletion.  Let it pass in one chunk.
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          empty = false;
          patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
          bigpatch.diffs.shift();
        } else {
          // Deletion or equality.  Only take as much as we can stomach.
          diff_text = diff_text.substring(0,
              patch_size - patch.length1 - this.Patch_Margin);
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          if (diff_type === DIFF_EQUAL) {
            patch.length2 += diff_text.length;
            start2 += diff_text.length;
          } else {
            empty = false;
          }
          patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
          if (diff_text == bigpatch.diffs[0][1]) {
            bigpatch.diffs.shift();
          } else {
            bigpatch.diffs[0][1] =
                bigpatch.diffs[0][1].substring(diff_text.length);
          }
        }
      }
      // Compute the head context for the next patch.
      precontext = this.diff_text2(patch.diffs);
      precontext =
          precontext.substring(precontext.length - this.Patch_Margin);
      // Append the end context for this patch.
      var postcontext = this.diff_text1(bigpatch.diffs)
                            .substring(0, this.Patch_Margin);
      if (postcontext !== '') {
        patch.length1 += postcontext.length;
        patch.length2 += postcontext.length;
        if (patch.diffs.length !== 0 &&
            patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
          patch.diffs[patch.diffs.length - 1][1] += postcontext;
        } else {
          patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, postcontext));
        }
      }
      if (!empty) {
        patches.splice(++x, 0, patch);
      }
    }
  }
};


/**
 * Take a list of patches and return a textual representation.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {string} Text representation of patches.
 */
diff_match_patch.prototype.patch_toText = function(patches) {
  var text = [];
  for (var x = 0; x < patches.length; x++) {
    text[x] = patches[x];
  }
  return text.join('');
};


/**
 * Parse a textual representation of patches and return a list of Patch objects.
 * @param {string} textline Text representation of patches.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 * @throws {!Error} If invalid input.
 */
diff_match_patch.prototype.patch_fromText = function(textline) {
  var patches = [];
  if (!textline) {
    return patches;
  }
  var text = textline.split('\n');
  var textPointer = 0;
  var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
  while (textPointer < text.length) {
    var m = text[textPointer].match(patchHeader);
    if (!m) {
      throw new Error('Invalid patch string: ' + text[textPointer]);
    }
    var patch = new diff_match_patch.patch_obj();
    patches.push(patch);
    patch.start1 = parseInt(m[1], 10);
    if (m[2] === '') {
      patch.start1--;
      patch.length1 = 1;
    } else if (m[2] == '0') {
      patch.length1 = 0;
    } else {
      patch.start1--;
      patch.length1 = parseInt(m[2], 10);
    }

    patch.start2 = parseInt(m[3], 10);
    if (m[4] === '') {
      patch.start2--;
      patch.length2 = 1;
    } else if (m[4] == '0') {
      patch.length2 = 0;
    } else {
      patch.start2--;
      patch.length2 = parseInt(m[4], 10);
    }
    textPointer++;

    while (textPointer < text.length) {
      var sign = text[textPointer].charAt(0);
      try {
        var line = decodeURI(text[textPointer].substring(1));
      } catch (ex) {
        // Malformed URI sequence.
        throw new Error('Illegal escape in patch_fromText: ' + line);
      }
      if (sign == '-') {
        // Deletion.
        patch.diffs.push(new diff_match_patch.Diff(DIFF_DELETE, line));
      } else if (sign == '+') {
        // Insertion.
        patch.diffs.push(new diff_match_patch.Diff(DIFF_INSERT, line));
      } else if (sign == ' ') {
        // Minor equality.
        patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, line));
      } else if (sign == '@') {
        // Start of next patch.
        break;
      } else if (sign === '') {
        // Blank line?  Whatever.
      } else {
        // WTF?
        throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
      }
      textPointer++;
    }
  }
  return patches;
};


/**
 * Class representing one patch operation.
 * @constructor
 */
diff_match_patch.patch_obj = function() {
  /** @type {!Array.<!diff_match_patch.Diff>} */
  this.diffs = [];
  /** @type {?number} */
  this.start1 = null;
  /** @type {?number} */
  this.start2 = null;
  /** @type {number} */
  this.length1 = 0;
  /** @type {number} */
  this.length2 = 0;
};


/**
 * Emulate GNU diff's format.
 * Header: @@ -382,8 +481,9 @@
 * Indices are printed as 1-based, not 0-based.
 * @return {string} The GNU diff string.
 */
diff_match_patch.patch_obj.prototype.toString = function() {
  var coords1, coords2;
  if (this.length1 === 0) {
    coords1 = this.start1 + ',0';
  } else if (this.length1 == 1) {
    coords1 = this.start1 + 1;
  } else {
    coords1 = (this.start1 + 1) + ',' + this.length1;
  }
  if (this.length2 === 0) {
    coords2 = this.start2 + ',0';
  } else if (this.length2 == 1) {
    coords2 = this.start2 + 1;
  } else {
    coords2 = (this.start2 + 1) + ',' + this.length2;
  }
  var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];
  var op;
  // Escape the body of the patch with %xx notation.
  for (var x = 0; x < this.diffs.length; x++) {
    switch (this.diffs[x][0]) {
      case DIFF_INSERT:
        op = '+';
        break;
      case DIFF_DELETE:
        op = '-';
        break;
      case DIFF_EQUAL:
        op = ' ';
        break;
    }
    text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';
  }
  return text.join('').replace(/%20/g, ' ');
};


// The following export code was added by @ForbesLindesay
module.exports = diff_match_patch;
module.exports.diff_match_patch = diff_match_patch;
module.exports.DIFF_DELETE = DIFF_DELETE;
module.exports.DIFF_INSERT = DIFF_INSERT;
module.exports.DIFF_EQUAL = DIFF_EQUAL;

/***/ })

}]);
//# sourceMappingURL=6674.js.map