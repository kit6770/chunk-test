"use strict";
(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[3741],{

/***/ 43741:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MLocationBody)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(225259);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(877294);

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


// @replaceableComponent("views.messages.MLocationBody")
class MLocationBody extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(this, "IMAGE_WIDTH", 240);
    // snapshot width
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(this, "IMAGE_HEIGHT", 160);
    // snapshot height
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(this, "ZOOM_IN", 13);
    this.state = {};
  }
  get content() {
    const content = this.props.mxEvent.getContent();
    this.parseGeoUrl(content.geo_uri);
    return content;
  }
  parseGeoUrl(geoUrl) {
    const match = geoUrl.match(/geo:([-+]?\d*\.\d+),([-+]?\d*\.\d+)/);
    if (match) {
      const latitude = parseFloat(match[2]);
      const longitude = parseFloat(match[1]);
      const geoInfo = {
        latitude,
        longitude
      };
      this.setState({
        geoInfo: geoInfo
      }, () => {
        this.getImage();
      });
      return geoInfo;
    } else {
      // Error
      return null;
    }
  }

  // Get current street information
  // The ”description“ data format is 'siteName-streetName';
  parseGeoInfo() {
    try {
      var _this$content$mLocat;
      const description = (_this$content$mLocat = this.content["m.location"]) === null || _this$content$mLocat === void 0 ? void 0 : _this$content$mLocat.description;
      const locationArray = description.split('-');
      this.setState({
        siteName: locationArray[0],
        streetName: locationArray[1]
      });
    } catch (e) {
      //
      console.error('error location', e);
    }
  }

  // Get map snapshot according to mapbox API
  async getImage() {
    const latitude = this.state.geoInfo.latitude;
    const longitude = this.state.geoInfo.longitude;
    const markers = `color:red|label:S|${longitude},${latitude}`;
    // const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l-embassy+f74e4e(${latitude},${longitude})/${latitude},${longitude},${this.ZOOM_IN}/${this.IMAGE_WIDTH}x${this.IMAGE_HEIGHT}?access_token=${MAPBOX_ACCESS_TOKEN}`
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${longitude},${latitude}` + `&zoom=${this.ZOOM_IN}` + `&size=${this.IMAGE_WIDTH}x${this.IMAGE_HEIGHT}` + `&maptype=roadmap` + `&scale=2` + `&markers=${encodeURIComponent(markers)}` + `&key=${_lib_constants__WEBPACK_IMPORTED_MODULE_1__/* .GOOCLE_MAPS_ACCESS_TOKEN */ .rk}`;
    await fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch image. Status: ${response.status}`);
      }
      return response.blob();
    }).then(blob => {
      const imageUrlObject = URL.createObjectURL(blob);
      this.setState({
        mapSnapshot: imageUrlObject
      });
    }).catch(error => {
      console.error('Error fetching image:', error);
    });
    ;
  }

  // Jump to Google Maps...
  gotoGoogelMap() {
    window.open(`https://www.google.com/maps?q=${this.state.geoInfo.longitude},${this.state.geoInfo.latitude}`);
  }
  componentDidMount() {
    var _this$content;
    if ((_this$content = this.content) !== null && _this$content !== void 0 && _this$content.geo_uri) {
      this.parseGeoUrl(this.content.geo_uri);
      this.parseGeoInfo();
    }
  }
  renderLocation() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_MLocationBody"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_location_wrapper"
    }, this.state.mapSnapshot && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
      className: "mx_location_snapshot",
      src: this.state.mapSnapshot,
      onClick: () => this.gotoGoogelMap()
    }), this.state.siteName && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_location_info",
      style: {
        maxWidth: this.IMAGE_WIDTH
      }
    }, this.state.siteName, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_location_info mx_location_info_streetName",
      style: {
        maxWidth: this.IMAGE_WIDTH
      }
    }, this.state.streetName)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_location_extra"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_location_extra_icon"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_location_extra_title"
    }, "Location"))));
  }
  render() {
    return this.renderLocation();
  }
}

/***/ })

}]);
//# sourceMappingURL=3741.js.map