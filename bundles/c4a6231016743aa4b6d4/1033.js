"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[1033],{

/***/ 291033:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CardBody)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(166644);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(667294);
/* harmony import */ var _utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(90287);
/* harmony import */ var _hiseas_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(989638);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(245539);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(473627);
/* harmony import */ var _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(274057);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(867614);
/* harmony import */ var _SdkConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(374312);


var _dec, _class;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }








const NFT_PROFILE_HOST_URL = _SdkConfig__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z.get()['dapp']['fav_host_url'];
let CardBody = (_dec = (0,_utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_2__/* .replaceableComponent */ .U)("views.messages.CardBody"), _dec(_class = class CardBody extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(...args) {
    super(...args);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "msgParser", msg => {
      const content = msg.getContent();
      if (content.body) {
        try {
          const body = JSON.parse(content.body);
          const handler = body.handler;
          switch (handler) {
            case _hiseas_react__WEBPACK_IMPORTED_MODULE_3__.MsgHandler.token:
              return Promise.resolve(_objectSpread(_objectSpread({}, body), {}, {
                props: _objectSpread(_objectSpread({}, body.props), {}, {
                  updateTime: '1D',
                  updateTitle: '24H',
                  onClick: () => {
                    body.props.slug && _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP.dispatch({
                      action: _dispatcher_actions__WEBPACK_IMPORTED_MODULE_5__/* .Action */ .a.SetRightPanelPhase,
                      phase: _stores_RightPanelStorePhases__WEBPACK_IMPORTED_MODULE_6__/* .RightPanelPhases */ .q4.IframeWidget,
                      refireParams: {
                        params: {
                          src: `${NFT_PROFILE_HOST_URL}/token/profile/${body.props.slug}`,
                          title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_7__._t)('Crypto Profile')
                        }
                      }
                    });
                  }
                })
              }));
            default:
              break;
          }
        } catch (error) {
          console.error('parse card msg error', error);
        }
      }
      return Promise.resolve({
        handler: null
      });
    });
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_hiseas_react__WEBPACK_IMPORTED_MODULE_3__.MsgCard, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)({
      msg: this.props.mxEvent,
      msgParser: this.msgParser
    }, this.props.cardProps));
  }
}) || _class);


/***/ })

}]);
//# sourceMappingURL=1033.js.map