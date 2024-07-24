"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[2401,5381],{

/***/ 372401:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HiddenImagePlaceholder: () => (/* binding */ HiddenImagePlaceholder),
/* harmony export */   "default": () => (/* binding */ MGifBody)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var react_blurhash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(668288);
/* harmony import */ var react_blurhash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_blurhash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(241648);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(867614);
/* harmony import */ var _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(571879);
/* harmony import */ var _contexts_MatrixClientContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(311878);
/* harmony import */ var _elements_InlineSpinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(650193);
/* harmony import */ var _utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(90287);
/* harmony import */ var _customisations_Media__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(834208);
/* harmony import */ var _ContentMessages__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(601877);
/* harmony import */ var _elements_ImageView__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(95727);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(294184);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(681811);
/* harmony import */ var _MessageTimestamp__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(982820);
/* harmony import */ var _MGifStar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(615381);

var _dec, _class, _class2;















let MGifBody = (_dec = (0,_utils_replaceableComponent__WEBPACK_IMPORTED_MODULE_7__/* .replaceableComponent */ .U)("views.messages.MGifBody"), _dec(_class = (_class2 = class MGifBody extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)(this, "unmounted", true);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)(this, "image", /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)(this, "timeout", void 0);
    // FIXME: factor this out and apply it to MVideoBody and MAudioBody too!
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)(this, "onClientSync", (syncState, prevState) => {
      if (this.unmounted) return;
      // Consider the client reconnected if there is no error with syncing.
      // This means the state could be RECONNECTING, SYNCING, PREPARED or CATCHUP.
      const reconnected = syncState !== "ERROR" && prevState !== syncState;
      if (reconnected && this.state.imgError) {
        // Load the image again
        this.setState({
          imgError: false
        });
      }
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)(this, "onClick", ev => {
      if (ev.button === 0 && !ev.metaKey) {
        var _content$body;
        ev.preventDefault();
        if (!this.state.showImage) {
          this.showImage();
          return;
        }
        const content = this.props.mxEvent.getContent();
        const httpUrl = this.getContentUrl();
        const params = {
          src: httpUrl,
          srcThumb: this.getThumbUrl(),
          name: ((_content$body = content.body) === null || _content$body === void 0 ? void 0 : _content$body.length) > 0 ? content.body : (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)('Attachment'),
          mxEvent: this.props.mxEvent,
          permalinkCreator: this.props.permalinkCreator
        };
        if (content.info) {
          params.width = content.info.w;
          params.height = content.info.h;
          params.fileSize = content.info.size;
        }
        _Modal__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.createDialog(_elements_ImageView__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, params, "mx_Dialog_lightbox mx_ImageView_Dialog", null, false);
      }
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)(this, "isGif", () => {
      var _content$info;
      const content = this.props.mxEvent.getContent();
      return ((_content$info = content.info) === null || _content$info === void 0 ? void 0 : _content$info.mimetype) === "image/gif";
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)(this, "onImageEnter", e => {
      this.setState({
        hover: true
      });
      if (!this.state.showImage || !this.isGif() || _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .C.getValue("autoplayGifs")) {
        return;
      }
      const imgElement = e.currentTarget;
      imgElement.src = this.getContentUrl();
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)(this, "onImageLeave", e => {
      this.setState({
        hover: false
      });
      if (!this.state.showImage || !this.isGif() || _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .C.getValue("autoplayGifs")) {
        return;
      }
      const imgElement = e.currentTarget;
      imgElement.src = this.getThumbUrl();
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)(this, "onImageError", () => {
      this.clearBlurhashTimeout();
      this.setState({
        imgError: true
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)(this, "onImageLoad", () => {
      this.clearBlurhashTimeout();
      this.props.onHeightChanged();
      let loadedImageDimensions;
      if (this.image.current) {
        const {
          naturalWidth,
          naturalHeight
        } = this.image.current;
        // this is only used as a fallback in case content.info.w/h is missing
        loadedImageDimensions = {
          naturalWidth,
          naturalHeight
        };
      }
      this.setState({
        imgLoaded: true,
        loadedImageDimensions
      });
    });
    this.state = {
      decryptedUrl: null,
      decryptedThumbnailUrl: null,
      decryptedBlob: null,
      error: null,
      imgError: false,
      imgLoaded: false,
      loadedImageDimensions: null,
      hover: false,
      showImage: _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .C.getValue("showImages"),
      placeholder: 'no-image'
    };
  }
  showImage() {
    localStorage.setItem("mx_ShowImage_" + this.props.mxEvent.getId(), "true");
    this.setState({
      showImage: true
    });
    // this.downloadImage();
  }

  getContentUrl() {
    if (this.media.isEncrypted) {
      return this.state.decryptedUrl;
    } else {
      return this.media.srcHttp;
    }
  }
  get media() {
    return (0,_customisations_Media__WEBPACK_IMPORTED_MODULE_8__/* .mediaFromContent */ .z3)(this.props.mxEvent.getContent());
  }
  getThumbUrl() {
    // FIXME: we let images grow as wide as you like, rather than capped to 800x600.
    // So either we need to support custom timeline widths here, or reimpose the cap, otherwise the
    // thumbnail resolution will be unnecessarily reduced.
    // custom timeline widths seems preferable.
    const thumbWidth = 800;
    const thumbHeight = 600;
    const content = this.props.mxEvent.getContent();
    const media = (0,_customisations_Media__WEBPACK_IMPORTED_MODULE_8__/* .mediaFromContent */ .z3)(content);
    if (media.isEncrypted) {
      // Don't use the thumbnail for clients wishing to autoplay gifs.
      if (this.state.decryptedThumbnailUrl) {
        return this.state.decryptedThumbnailUrl;
      }
      return this.state.decryptedUrl;
    } else if (content.info && content.info.mimetype === "image/svg+xml" && media.hasThumbnail) {
      // special case to return clientside sender-generated thumbnails for SVGs, if any,
      // given we deliberately don't thumbnail them serverside to prevent
      // billion lol attacks and similar
      return media.getThumbnailHttp(thumbWidth, thumbHeight, 'scale');
    } else {
      // we try to download the correct resolution
      // for hi-res images (like retina screenshots).
      // synapse only supports 800x600 thumbnails for now though,
      // so we'll need to download the original image for this to work
      // well for now. First, let's try a few cases that let us avoid
      // downloading the original, including:
      //   - When displaying a GIF, we always want to thumbnail so that we can
      //     properly respect the user's GIF autoplay setting (which relies on
      //     thumbnailing to produce the static preview image)
      //   - On a low DPI device, always thumbnail to save bandwidth
      //   - If there's no sizing info in the event, default to thumbnail
      const info = content.info;
      if (this.isGif() || window.devicePixelRatio === 1.0 || !info || !info.w || !info.h || !info.size) {
        return media.getThumbnailOfSourceHttp(thumbWidth, thumbHeight);
      } else {
        // we should only request thumbnails if the image is bigger than 800x600
        // (or 1600x1200 on retina) otherwise the image in the timeline will just
        // end up resampled and de-retina'd for no good reason.
        // Ideally the server would pregen 1600x1200 thumbnails in order to provide retina
        // thumbnails, but we don't do this currently in synapse for fear of disk space.
        // As a compromise, let's switch to non-retina thumbnails only if the original
        // image is both physically too large and going to be massive to load in the
        // timeline (e.g. >1MB).

        const isLargerThanThumbnail = info.w > thumbWidth || info.h > thumbHeight;
        const isLargeFileSize = info.size > 1 * 1024 * 1024; // 1mb

        if (isLargeFileSize && isLargerThanThumbnail) {
          // image is too large physically and bytewise to clutter our timeline so
          // we ask for a thumbnail, despite knowing that it will be max 800x600
          // despite us being retina (as synapse doesn't do 1600x1200 thumbs yet).
          return media.getThumbnailOfSourceHttp(thumbWidth, thumbHeight);
        } else {
          // download the original image otherwise, so we can scale it client side
          // to take pixelRatio into account.
          return media.srcHttp;
        }
      }
    }
  }
  async downloadImage() {
    if (this.props.mediaEventHelper.media.isEncrypted && this.state.decryptedUrl === null) {
      try {
        const thumbnailUrl = await this.props.mediaEventHelper.thumbnailUrl.value;
        this.setState({
          decryptedUrl: await this.props.mediaEventHelper.sourceUrl.value,
          decryptedThumbnailUrl: thumbnailUrl,
          decryptedBlob: await this.props.mediaEventHelper.sourceBlob.value
        });
      } catch (err) {
        if (this.unmounted) return;
        console.warn("Unable to decrypt attachment: ", err);
        // Set a placeholder image when we can't decrypt the image.
        this.setState({
          error: err
        });
      }
    }
  }
  clearBlurhashTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }
  componentDidMount() {
    var _this$props$mxEvent$g;
    this.unmounted = false;
    this.context.on('sync', this.onClientSync);
    const showImage = this.state.showImage || localStorage.getItem("mx_ShowImage_" + this.props.mxEvent.getId()) === "true";
    if (showImage) {
      // noinspection JSIgnoredPromiseFromCall
      // this.downloadImage();
      this.setState({
        showImage: true
      });
    } // else don't download anything because we don't want to display anything.

    // Add a 150ms timer for blurhash to first appear.
    if ((_this$props$mxEvent$g = this.props.mxEvent.getContent().info) !== null && _this$props$mxEvent$g !== void 0 && _this$props$mxEvent$g[_ContentMessages__WEBPACK_IMPORTED_MODULE_9__/* .BLURHASH_FIELD */ .kP]) {
      this.clearBlurhashTimeout();
      this.timeout = setTimeout(() => {
        if (!this.state.imgLoaded || !this.state.imgError) {
          this.setState({
            placeholder: 'blurhash'
          });
        }
      }, 150);
    }
  }
  componentWillUnmount() {
    this.unmounted = true;
    this.context.removeListener('sync', this.onClientSync);
    this.clearBlurhashTimeout();
  }
  messageContent(contentUrl, thumbUrl, content, forcedHeight) {
    var _this$props$mxEvent$g2;
    let infoWidth;
    let infoHeight;
    if (content && content.info && content.info.w && content.info.h) {
      infoWidth = content.info.w;
      infoHeight = content.info.h;
    } else {
      // Whilst the image loads, display nothing. We also don't display a blurhash image
      // because we don't really know what size of image we'll end up with.
      //
      // Once loaded, use the loaded image dimensions stored in `loadedImageDimensions`.
      //
      // By doing this, the image "pops" into the timeline, but is still restricted
      // by the same width and height logic below.
      if (!this.state.loadedImageDimensions) {
        let imageElement;
        if (!this.state.showImage) {
          imageElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(HiddenImagePlaceholder, null);
        } else {
          imageElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
            style: {
              display: 'none'
            },
            src: thumbUrl,
            ref: this.image,
            alt: content.body,
            onError: this.onImageError,
            onLoad: this.onImageLoad
          });
        }
        return this.wrapImage(contentUrl, imageElement);
      }
      infoWidth = this.state.loadedImageDimensions.naturalWidth;
      infoHeight = this.state.loadedImageDimensions.naturalHeight;
    }

    // The maximum height of the thumbnail as it is rendered as an <img>
    const maxHeight = forcedHeight || Math.min(this.props.maxImageHeight || 600, infoHeight);
    // The maximum width of the thumbnail, as dictated by its natural
    // maximum height.
    const maxWidth = infoWidth * maxHeight / infoHeight;
    let img = null;
    let placeholder = null;
    let gifLabel = null;
    if (!this.state.imgLoaded) {
      placeholder = this.getPlaceholder(maxWidth, maxHeight);
    }
    let showPlaceholder = Boolean(placeholder);
    if (thumbUrl && !this.state.imgError) {
      // Restrict the width of the thumbnail here, otherwise it will fill the container
      // which has the same width as the timeline
      // mx_MImageBody_thumbnail resizes img to exactly container size
      img = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
        className: "mx_MImageBody_thumbnail",
        src: thumbUrl,
        ref: this.image
        // Force the image to be the full size of the container, even if the
        // pixel size is smaller. The problem here is that we don't know what
        // thumbnail size the HS is going to give us, but we have to commit to
        // a container size immediately and not change it when the image loads
        // or we'll get a scroll jump (or have to leave blank space).
        // This will obviously result in an upscaled image which will be a bit
        // blurry. The best fix would be for the HS to advertise what size thumbnails
        // it guarantees to produce.
        ,
        style: {
          height: '100%'
        },
        alt: content.body,
        onError: this.onImageError,
        onLoad: this.onImageLoad,
        onMouseEnter: this.onImageEnter,
        onMouseLeave: this.onImageLeave
      });
    }
    if (!this.state.showImage) {
      img = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(HiddenImagePlaceholder, {
        maxWidth: maxWidth
      });
      showPlaceholder = false; // because we're hiding the image, so don't show the placeholder.
    }

    if (this.isGif() && !_settings_SettingsStore__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .C.getValue("autoplayGifs") && !this.state.hover) {
      gifLabel = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "mx_MImageBody_gifLabel"
      }, "GIF");
    }
    const classes = classnames__WEBPACK_IMPORTED_MODULE_11___default()({
      'mx_MImageBody_thumbnail': true,
      'mx_MImageBody_thumbnail--blurhash': (_this$props$mxEvent$g2 = this.props.mxEvent.getContent().info) === null || _this$props$mxEvent$g2 === void 0 ? void 0 : _this$props$mxEvent$g2[_ContentMessages__WEBPACK_IMPORTED_MODULE_9__/* .BLURHASH_FIELD */ .kP]
    });

    // This has incredibly broken types.
    const C = react_transition_group__WEBPACK_IMPORTED_MODULE_15__/* .CSSTransition */ .Kv;
    const thumbnail = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MImageBody_thumbnail_container",
      style: {
        maxHeight: maxHeight,
        maxWidth: maxWidth,
        aspectRatio: `${infoWidth}/${infoHeight}`
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_15__/* .SwitchTransition */ .TL, {
      mode: "out-in"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(C, {
      classNames: "mx_rtg--fade",
      key: `img-${showPlaceholder}`,
      timeout: 300
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, showPlaceholder && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: classes,
      style: {
        // Constrain width here so that spinner appears central to the loaded thumbnail
        maxWidth: `min(100%, ${infoWidth}px)`,
        maxHeight: maxHeight,
        aspectRatio: `${infoWidth}/${infoHeight}`
      }
    }, placeholder)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      style: {
        height: '100%'
      }
    }, img, gifLabel), this.state.hover && this.getTooltip());
    return this.wrapImage(contentUrl, thumbnail);
  }

  // Overidden by MStickerBody
  wrapImage(contentUrl, children) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
      href: contentUrl,
      onClick: this.onClick
    }, children);
  }

  // Overidden by MStickerBody
  getPlaceholder(width, height) {
    var _this$props$mxEvent$g3;
    const blurhash = (_this$props$mxEvent$g3 = this.props.mxEvent.getContent().info) === null || _this$props$mxEvent$g3 === void 0 ? void 0 : _this$props$mxEvent$g3[_ContentMessages__WEBPACK_IMPORTED_MODULE_9__/* .BLURHASH_FIELD */ .kP];
    if (blurhash) {
      if (this.state.placeholder === 'no-image') {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "mx_no-image-placeholder",
          style: {
            width: width,
            height: height
          }
        });
      } else if (this.state.placeholder === 'blurhash') {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_blurhash__WEBPACK_IMPORTED_MODULE_1__.Blurhash, {
          className: "mx_Blurhash",
          hash: blurhash,
          width: width,
          height: height
        });
      }
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_elements_InlineSpinner__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
      w: 32,
      h: 32
    });
  }

  // Overidden by MStickerBody
  getTooltip() {
    return null;
  }

  // Overidden by MStickerBody
  getFileBody(content) {
    // We only ever need the download bar if we're appearing outside of the timeline
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_GifPicker_Category_detail"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MGifStar__WEBPACK_IMPORTED_MODULE_13__["default"], {
      content: content
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
      src: content.body.startsWith("https://") ? content.body : content.url
    }));
  }
  render() {
    const content = this.props.mxEvent.getContent();
    const timestamp = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MessageTimestamp__WEBPACK_IMPORTED_MODULE_12__["default"], {
      ts: this.props.mxEvent.getTs(),
      showHourMinute: true
    });
    if (this.state.error !== null) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_MImageBody"
      }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Error decrypting image"));
    }
    const fileBody = this.getFileBody(content);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MImageBody"
    }, fileBody, timestamp);
  }
}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)(_class2, "contextType", _contexts_MatrixClientContext__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z), _class2)) || _class);

class HiddenImagePlaceholder extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  render() {
    const maxWidth = this.props.maxWidth ? this.props.maxWidth + "px" : null;
    let className = 'mx_HiddenImagePlaceholder';
    if (this.props.hover) className += ' mx_HiddenImagePlaceholder_hover';
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: className,
      style: {
        maxWidth: `min(100%, ${maxWidth}px)`
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_HiddenImagePlaceholder_button"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_HiddenImagePlaceholder_eye"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_3__._t)("Show image"))));
  }
}

/***/ }),

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
//# sourceMappingURL=2401.js.map