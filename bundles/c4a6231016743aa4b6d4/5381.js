"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[5381],{

/***/ 615381:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MGifStar: () => (/* binding */ MGifStar),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(473627);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(245539);
/* harmony import */ var _emojipicker_collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(132622);
/* harmony import */ var _hooks_useDispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(694284);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(933393);






const MGifStar = content => {
  const [isCollected, setIsCollected] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setStarState();
  }, []);
  (0,_hooks_useDispatcher__WEBPACK_IMPORTED_MODULE_4__/* .useDispatcher */ .P)(_dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP, payload => {
    if (payload.action === _dispatcher_actions__WEBPACK_IMPORTED_MODULE_1__/* .Action */ .a.UpdateStarState) {
      if (content.content.body.startsWith("https://")) {
        if (payload.detail.media_formats) {
          if (payload.detail.media_formats.tinygif.url === content.content.body) {
            setIsCollected(payload.isCollected);
          }
        } else {
          if (payload.detail.url === content.content.body) {
            setIsCollected(payload.isCollected);
          }
        }
      } else {
        if (payload.detail.media_formats) {
          if (payload.detail.media_formats.tinygif.url === content.content.url) {
            setIsCollected(payload.isCollected);
          }
        } else {
          if (payload.detail.url === content.content.url) {
            setIsCollected(payload.isCollected);
          }
        }
      }
    }
  });
  const hasCollected = url => {
    if (_MatrixClientPeg__WEBPACK_IMPORTED_MODULE_5__/* .MatrixClientPeg */ .p.get().getAccountData('io.collect_gif')) {
      const collectedList = _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_5__/* .MatrixClientPeg */ .p.get().getAccountData('io.collect_gif').event.content.collected_gifs;
      return collectedList.some(gif => gif.url === url);
    } else {
      return false;
    }
  };
  const setStarState = () => {
    setIsCollected(hasCollected(content.content.body.startsWith("https://") ? content.content.body : content.content.url));
  };
  const setCollection = (e, content) => {
    e.stopPropagation();
    e.preventDefault();
    const collect = {
      url: content.content.url ? content.content.url : content.content.body,
      dims: content.content.info.dims ? content.content.info.dims : [content.content.info.w, content.content.info.h]
    };
    if (_emojipicker_collection__WEBPACK_IMPORTED_MODULE_3__/* .add */ .I(collect)) {
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP.dispatch({
        action: _dispatcher_actions__WEBPACK_IMPORTED_MODULE_1__/* .Action */ .a.UpdateStarState,
        detail: collect,
        isCollected: !isCollected
      });
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    onClick: e => setCollection(e, content),
    className: isCollected ? "mx_GifPicker_Category_collect_svg_selected" : "mx_GifPicker_Category_collect_svg"
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MGifStar);

/***/ }),

/***/ 132622:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ add),
/* harmony export */   U: () => (/* binding */ get)
/* harmony export */ });
/* harmony import */ var _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(571879);
/* harmony import */ var _settings_SettingLevel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(202385);
/* harmony import */ var sendingme_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(602271);



const SETTING_NAME = "collected_gifs";
const STORAGE_LIMIT = 50;

// TODO remove this after some time
function migrate() {
  const data = JSON.parse(window.localStorage.mx_reaction_count || "{}");
  const sorted = Object.entries(data).sort(([, [count1, date1]], [, [count2, date2]]) => date2 - date1);
  const newFormat = sorted.map(([emoji, [count, date]]) => [emoji, count]);
  SettingsStore.setValue(SETTING_NAME, null, SettingLevel.ACCOUNT, newFormat.slice(0, STORAGE_LIMIT));
}
function getCollectedGifs() {
  return _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .C.getValue(SETTING_NAME) || [];
}
function add(gif) {
  // clear data set
  // SettingsStore.setValue(SETTING_NAME, null, SettingLevel.ACCOUNT, []);
  // return []

  if (gif.url === "" || gif.url === undefined) {
    return;
  }
  const collections = getCollectedGifs();
  const i = collections.findIndex(c => {
    return c.url === gif.url;
  });
  if (i >= 0) {
    collections.splice(i, 1);
  } else {
    collections.unshift(gif);
  }
  if (collections.length > 50) {
    sendingme_ui__WEBPACK_IMPORTED_MODULE_2__.SdMessage.error("The maximum number has been reached");
    return;
  }
  _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .C.setValue(SETTING_NAME, null, _settings_SettingLevel__WEBPACK_IMPORTED_MODULE_1__/* .SettingLevel */ .R.ACCOUNT, collections.slice(0, STORAGE_LIMIT));
  return collections;
}
function get(limit = 50) {
  const collections = getCollectedGifs();
  return collections.slice(0, limit);
}

/***/ })

}]);
//# sourceMappingURL=5381.js.map