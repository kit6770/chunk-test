"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[8938],{

/***/ 68938:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ViewSourceEvent)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(294184);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(90287);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(933393);

var _dec, _class;
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





let ViewSourceEvent = (_dec = (0,_utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_2__/* .replaceableComponent */ .U)("views.messages.ViewSourceEvent"), _dec(_class = class ViewSourceEvent extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  constructor(props) {
    super(props);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(this, "onToggle", ev => {
      ev.preventDefault();
      const {
        expanded
      } = this.state;
      this.setState({
        expanded: !expanded
      });
    });
    this.state = {
      expanded: false
    };
  }
  componentDidMount() {
    const {
      mxEvent
    } = this.props;
    const client = _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get();
    client.decryptEventIfNeeded(mxEvent);
    if (mxEvent.isBeingDecrypted()) {
      mxEvent.once("Event.decrypted", () => this.forceUpdate());
    }
  }
  render() {
    const {
      mxEvent
    } = this.props;
    const {
      expanded
    } = this.state;
    let content;
    if (expanded) {
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("pre", null, JSON.stringify(mxEvent, null, 4));
    } else {
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", null, `{ "type": ${mxEvent.getType()} }`);
    }
    const classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()("mx_ViewSourceEvent mx_EventTile_content", {
      mx_ViewSourceEvent_expanded: expanded
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: classes
    }, content, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
      className: "mx_ViewSourceEvent_toggle",
      href: "#",
      onClick: this.onToggle
    }));
  }
}) || _class);


/***/ })

}]);
//# sourceMappingURL=8938.js.map