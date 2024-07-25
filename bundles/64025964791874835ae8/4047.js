"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[4047],{

/***/ 474047:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MVideoBody)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(166644);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var blurhash__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(213060);
/* harmony import */ var blurhash__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(blurhash__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(867614);
/* harmony import */ var _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(571879);
/* harmony import */ var _elements_InlineSpinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(650193);
/* harmony import */ var _customisations_Media__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(834208);
/* harmony import */ var _ContentMessages__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(601877);
/* harmony import */ var _MFileBody__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(393562);
/* harmony import */ var _MessageTimestamp__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(982820);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(241648);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(769215);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(933393);
/* harmony import */ var _elements_ImageView__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(95727);
/* harmony import */ var _rooms_EventTile__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(585340);
/* harmony import */ var react_blurhash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(668288);
/* harmony import */ var react_blurhash__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_blurhash__WEBPACK_IMPORTED_MODULE_12__);


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






// import { replaceableComponent } from "../../../utils/replaceableComponent";










// @replaceableComponent("views.messages.MVideoBody")
class MVideoBody extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  constructor(props) {
    super(props);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z)(this, "videoRef", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z)(this, "init", async () => {
      const autoplay = _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .C.getValue("autoplayVideo");
      const mediaEventHelper = this.props.mediaEventHelper;
      if (mediaEventHelper && mediaEventHelper.media.isEncrypted && this.state.decryptedUrl === null) {
        try {
          const thumbnailUrl = await mediaEventHelper.thumbnailUrl.value;
          if (autoplay) {
            console.log("Preloading video");
            this.setState({
              decryptedThumbnailUrl: thumbnailUrl
            });
            this.setState({
              decryptedUrl: await mediaEventHelper.sourceUrl.value,
              decryptedBlob: await mediaEventHelper.sourceBlob.value
            });
            this.props.onHeightChanged();
          } else {
            var _content$info, _content$info2;
            console.log("NOT preloading video");
            const content = this.props.mxEvent.getContent();
            this.setState({
              // For Chrome and Electron, we need to set some non-empty `src` to
              // enable the play button. Firefox does not seem to care either
              // way, so it's fine to do for all browsers.
              decryptedUrl: `data:${content === null || content === void 0 ? void 0 : (_content$info = content.info) === null || _content$info === void 0 ? void 0 : _content$info.mimetype},`,
              decryptedThumbnailUrl: thumbnailUrl || `data:${content === null || content === void 0 ? void 0 : (_content$info2 = content.info) === null || _content$info2 === void 0 ? void 0 : _content$info2.mimetype},`,
              decryptedBlob: null
            });
          }
        } catch (err) {
          console.warn("Unable to decrypt attachment: ", err);
          // Set a placeholder image when we can't decrypt the image.
          this.setState({
            error: err
          });
        }
      }
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z)(this, "videoOnPlay", async () => {
      if (this.hasContentUrl() || this.state.fetchingData || this.state.error) {
        // We have the file, we are fetching the file, or there is an error.
        return;
      }
      this.setState({
        // To stop subsequent download attempts
        fetchingData: true
      });
      if (!this.props.mediaEventHelper.media.isEncrypted) {
        this.setState({
          error: "No file given in content"
        });
        return;
      }
      this.setState({
        decryptedUrl: await this.props.mediaEventHelper.sourceUrl.value,
        decryptedBlob: await this.props.mediaEventHelper.sourceBlob.value,
        fetchingData: false
      }, () => {
        if (!this.videoRef.current) return;
        this.videoRef.current.play();
      });
      this.props.onHeightChanged();
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z)(this, "handleClick", () => {
      const content = this.props.mxEvent.getContent();
      // const thumbUrl = this.getThumbUrl();
      const params = {
        src: this.getContentUrl(),
        srcThumb: this.getThumbUrl(),
        name: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Attachment"),
        mxEvent: this.props.mxEvent,
        permalinkCreator: this.props.permalinkCreator
      };

      // let height = null;
      // let width = null;
      // let poster = null;
      let preload = "metadata";
      if (content.info) {
        const scale = this.thumbScale(content.info.w, content.info.h);
        if (scale) {
          params.width = Math.floor(content.info.w * scale);
          params.height = Math.floor(content.info.h * scale);
        }

        // if (thumbUrl) {
        //     poster = thumbUrl;
        //     preload = "none";
        // }
      }

      _Modal__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z.createDialog(_elements_ImageView__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, params, "mx_Dialog_lightbox mx_ImageView_Dialog", null, false);
    });
    this.state = {
      fetchingData: false,
      decryptedUrl: null,
      decryptedThumbnailUrl: null,
      decryptedBlob: null,
      error: null,
      posterLoading: false,
      blurhashUrl: null,
      isPreviewOpen: false
    };
    this.checkMessageStatus();
  }
  async checkMessageStatus() {
    const status = this.props.mxEvent.status;
    const content = this.props.mxEvent.getContent();
    const matrixClient = _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_9__/* .MatrixClientPeg */ .p.get();
    if (status === "sending" && content.prepContent) {
      try {
        const {
          thumbnail
        } = content.prepContent;
        const eventId = content.prepContent.uploadEventId;
        const upload = _ContentMessages__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP.sharedInstance().getUploadPromise(eventId);
        // upload thumbnail
        const uploadResult = await (0,_ContentMessages__WEBPACK_IMPORTED_MODULE_5__/* .uploadParts */ .Mj)(matrixClient, this.props.mxEvent.getRoomId(), thumbnail);
        content.info["thumbnail_url"] = uploadResult.url;
        content.info["thumbnail_file"] = uploadResult.file;

        // upload video
        if (!upload || !(upload !== null && upload !== void 0 && upload.onProgress)) {
          const onProgress = ev => {
            const progress = Math.floor(ev.loaded / ev.total * 100);
            this.setState({
              progress
            });
          };
          const complete = ev => {
            this.setState({
              progress: 100
            });
          };
          _ContentMessages__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP.sharedInstance().uploadFileMessage(this.props.mxEvent, _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_9__/* .MatrixClientPeg */ .p.get(), onProgress, complete);
        } else {
          upload.onProgress = ev => {
            const progress = Math.floor(ev.loaded / ev.total * 100);
            this.setState({
              progress
            });
          };
        }
      } catch (err) {
        console.error(err);
        this.props.mxEvent.emit("Event.cancelSent", this.props.mxEvent);
        throw new _ContentMessages__WEBPACK_IMPORTED_MODULE_5__/* .UploadCanceledError */ .I0();
      }
    }
  }
  thumbScale(fullWidth, fullHeight, thumbWidth = 480, thumbHeight = 360) {
    if (!fullWidth || !fullHeight) {
      // Cannot calculate thumbnail height for image: missing w/h in metadata. We can't even
      // log this because it's spammy
      return undefined;
    }
    if (fullWidth < thumbWidth && fullHeight < thumbHeight) {
      // no scaling needs to be applied
      return 1;
    }
    const widthMulti = thumbWidth / fullWidth;
    const heightMulti = thumbHeight / fullHeight;
    if (widthMulti < heightMulti) {
      // width is the dominant dimension so scaling will be fixed on that
      return widthMulti;
    } else {
      // height is the dominant dimension so scaling will be fixed on that
      return heightMulti;
    }
  }
  getContentUrl() {
    var _content$prepContent, _content$prepContent2;
    const content = this.props.mxEvent.getContent();
    if (Boolean(content === null || content === void 0 ? void 0 : (_content$prepContent = content.prepContent) === null || _content$prepContent === void 0 ? void 0 : _content$prepContent.file) && (content === null || content === void 0 ? void 0 : (_content$prepContent2 = content.prepContent) === null || _content$prepContent2 === void 0 ? void 0 : _content$prepContent2.file) instanceof File) {
      return URL.createObjectURL(content.prepContent.file);
    }
    const media = (0,_customisations_Media__WEBPACK_IMPORTED_MODULE_4__/* .mediaFromContent */ .z3)(this.props.mxEvent.getContent());
    if (media.isEncrypted) {
      return this.state.decryptedUrl;
    } else {
      return media.srcHttp;
    }
  }
  hasContentUrl() {
    const url = this.getContentUrl();
    return url && !url.startsWith("data:");
  }
  getThumbUrl() {
    var _content$prepContent3, _content$prepContent4;
    const content = this.props.mxEvent.getContent();
    if (Boolean(content === null || content === void 0 ? void 0 : (_content$prepContent3 = content.prepContent) === null || _content$prepContent3 === void 0 ? void 0 : (_content$prepContent4 = _content$prepContent3.info) === null || _content$prepContent4 === void 0 ? void 0 : _content$prepContent4.thumbnail_url)) {
      return content.prepContent.info.thumbnail_url;
    }
    const media = (0,_customisations_Media__WEBPACK_IMPORTED_MODULE_4__/* .mediaFromContent */ .z3)(content);
    if (media.isEncrypted && this.state.decryptedThumbnailUrl) {
      return this.state.decryptedThumbnailUrl;
    } else if (this.state.posterLoading) {
      return this.state.blurhashUrl;
    } else if (media.hasThumbnail) {
      return media.thumbnailHttp;
    } else {
      return null;
    }
  }
  loadBlurhash() {
    var _content$prepContent5, _content$prepContent6;
    const content = this.props.mxEvent.getContent();
    if (Boolean(content === null || content === void 0 ? void 0 : (_content$prepContent5 = content.prepContent) === null || _content$prepContent5 === void 0 ? void 0 : (_content$prepContent6 = _content$prepContent5.info) === null || _content$prepContent6 === void 0 ? void 0 : _content$prepContent6.thumbnail_url)) {
      this.setState({
        blurhashUrl: content.prepContent.info.thumbnail_url,
        posterLoading: false
      });
      return;
    }
    const info = content.info;
    if (!info[_ContentMessages__WEBPACK_IMPORTED_MODULE_5__/* .BLURHASH_FIELD */ .kP]) return;
    const canvas = document.createElement("canvas");
    let width = info.w;
    let height = info.h;
    const scale = this.thumbScale(info.w, info.h);
    if (scale) {
      width = Math.floor(info.w * scale);
      height = Math.floor(info.h * scale);
    }
    canvas.width = width;
    canvas.height = height;
    const pixels = (0,blurhash__WEBPACK_IMPORTED_MODULE_14__.decode)(info[_ContentMessages__WEBPACK_IMPORTED_MODULE_5__/* .BLURHASH_FIELD */ .kP], width, height);
    const ctx = canvas.getContext("2d");
    const imgData = ctx.createImageData(width, height);
    imgData.data.set(pixels);
    ctx.putImageData(imgData, 0, 0);
    this.setState({
      blurhashUrl: canvas.toDataURL(),
      posterLoading: true
    });
    const media = (0,_customisations_Media__WEBPACK_IMPORTED_MODULE_4__/* .mediaFromContent */ .z3)(content);
    if (media.hasThumbnail) {
      const image = new Image();
      image.onload = () => {
        this.setState({
          posterLoading: false
        });
      };
      image.src = media.thumbnailHttp;
    }
  }
  componentDidMount() {
    this.loadBlurhash();
    this.init();
  }
  handleCancelUpload() {
    const mxEvent = this.props.mxEvent;
    const uploadEventId = mxEvent.getContent().prepContent.uploadEventId;
    mxEvent.emit("Event.cancelSent", mxEvent);
    _ContentMessages__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP.sharedInstance().cancelUpload(uploadEventId, _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_9__/* .MatrixClientPeg */ .p.get());
  }
  revokeObjectUrl(objectUrl) {
    URL.revokeObjectURL(objectUrl);
  }
  renderPreview(autoplay) {
    const timestamp = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MessageTimestamp__WEBPACK_IMPORTED_MODULE_7__["default"], {
      ts: this.props.mxEvent.getTs(),
      showHourMinute: true
    });
    const content = this.props.mxEvent.getContent();
    const status = this.props.mxEvent.status;
    const {
      thumbnail_url,
      w,
      h
    } = content.prepContent.info;
    const content_url = URL.createObjectURL(content.prepContent.file);
    let preload = "metadata";
    let maxHeight = Math.min(600, h);
    let maxWidth = w * maxHeight / h;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MImageBody"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MImageBody_thumbnail_container",
      style: {
        maxWidth: `min(100%, ${maxHeight}px)`,
        maxHeight: `min(100%, ${maxWidth}px)`,
        minWidth: 80,
        minHeight: 80,
        aspectRatio: `${w}/${h}`
      }
    }, this.state.progress === 100 && content !== null && content !== void 0 && content.url ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MVideoBody",
      style: {
        width: "100%",
        height: "100%",
        display: "block"
      },
      onClick: this.handleClick
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("video", {
      style: {
        pointerEvents: "none"
      },
      controls: true,
      className: "mx_MVideoBody",
      poster: thumbnail_url,
      ref: this.videoRef,
      src: content_url,
      title: content.body,
      preload: preload,
      muted: Boolean(autoplay),
      autoPlay: Boolean(autoplay),
      height: "100%",
      width: "100%",
      onPlay: this.videoOnPlay,
      onLoadedMetadata: this.videoOnPlay
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
      src: thumbnail_url,
      style: {
        height: "100%"
      },
      onLoad: () => {
        this.revokeObjectUrl(thumbnail_url);
      },
      alt: ""
    }), this.state.progress !== 100 && status === "sending" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_MImageBody_progress",
      onClick: () => {
        this.handleCancelUpload();
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_15__.Progress, {
      type: "circle",
      percent: this.state.progress,
      showInfo: false,
      strokeWidth: 10,
      strokeColor: "white"
    })) : null, timestamp));
  }
  render() {
    var _content$prepContent7, _content$prepContent8;
    const content = this.props.mxEvent.getContent();
    const autoplay = _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .C.getValue("autoplayVideo");
    const timestamp = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MessageTimestamp__WEBPACK_IMPORTED_MODULE_7__["default"], {
      ts: this.props.mxEvent.getTs(),
      showHourMinute: true
    });
    const status = this.props.mxEvent.status;
    if (this.state.error !== null) {
      if (this.props.tileShape === _rooms_EventTile__WEBPACK_IMPORTED_MODULE_11__/* .TileShape */ .GO.ImageGrid) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_blurhash__WEBPACK_IMPORTED_MODULE_12__.Blurhash, {
          className: "mx_Blurhash",
          hash: "LKN]Rv%2Tw=w]~RBVZRi};RPxuwH"
        });
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_EventTile_media_error mx_MTextBody mx_EventTile_content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "mx_EventTile_body",
        dir: "auto"
      }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Error decrypting video")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MessageTimestamp__WEBPACK_IMPORTED_MODULE_7__["default"], {
        ts: this.props.mxEvent.getTs(),
        showHourMinute: true
      }));
    }
    if (status === "sending" && Boolean(content === null || content === void 0 ? void 0 : (_content$prepContent7 = content.prepContent) === null || _content$prepContent7 === void 0 ? void 0 : _content$prepContent7.file) && (content === null || content === void 0 ? void 0 : (_content$prepContent8 = content.prepContent) === null || _content$prepContent8 === void 0 ? void 0 : _content$prepContent8.file) instanceof File) {
      return this.renderPreview(autoplay);
    }

    // Important: If we aren't autoplaying and we haven't decrypred it yet, show a video with a poster.
    if (content.file !== undefined && this.state.decryptedThumbnailUrl === null && autoplay) {
      // Need to decrypt the attachment
      // The attachment is decrypted in componentDidMount.
      // For now add an img tag with a spinner.
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_MVideoBody"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_MImageBody_thumbnail mx_MImageBody_thumbnail_spinner"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_elements_InlineSpinner__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, null)));
    }
    const contentUrl = this.getContentUrl();
    const thumbUrl = this.getThumbUrl();
    let poster = null;
    let preload = "metadata";
    if (thumbUrl) {
      poster = thumbUrl;
      preload = "none";
    }
    const {
      w,
      h
    } = content.info;
    let maxHeight = Math.min(600, h);
    let maxWidth = w * maxHeight / h;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MVideoBody",
      onClick: this.handleClick,
      style: {
        maxHeight: maxHeight,
        maxWidth: maxWidth,
        minWidth: 80,
        minHeight: 80,
        aspectRatio: `${w}/${h}`
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("video", {
      style: {
        pointerEvents: "none"
      },
      controls: true,
      className: "mx_MVideoBody",
      poster: poster,
      ref: this.videoRef,
      src: contentUrl,
      title: content.body,
      preload: preload,
      muted: Boolean(autoplay),
      autoPlay: Boolean(autoplay),
      width: "100%",
      height: "100%",
      onPlay: this.videoOnPlay,
      onLoadedMetadata: this.videoOnPlay
    }), this.props.tileShape && this.props.tileShape !== _rooms_EventTile__WEBPACK_IMPORTED_MODULE_11__/* .TileShape */ .GO.ImageGrid && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MFileBody__WEBPACK_IMPORTED_MODULE_6__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z)({}, this.props, {
      showGenericPlaceholder: false
    })), this.props.tileShape !== _rooms_EventTile__WEBPACK_IMPORTED_MODULE_11__/* .TileShape */ .GO.ImageGrid && timestamp);
  }
}

/***/ })

}]);
//# sourceMappingURL=4047.js.map