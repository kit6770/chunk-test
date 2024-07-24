/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 403:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var digitCharacters = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "#",
    "$",
    "%",
    "*",
    "+",
    ",",
    "-",
    ".",
    ":",
    ";",
    "=",
    "?",
    "@",
    "[",
    "]",
    "^",
    "_",
    "{",
    "|",
    "}",
    "~"
];
exports.decode83 = function (str) {
    var value = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str[i];
        var digit = digitCharacters.indexOf(c);
        value = value * 83 + digit;
    }
    return value;
};
exports.encode83 = function (n, length) {
    var result = "";
    for (var i = 1; i <= length; i++) {
        var digit = (Math.floor(n) / Math.pow(83, length - i)) % 83;
        result += digitCharacters[Math.floor(digit)];
    }
    return result;
};
//# sourceMappingURL=base83.js.map

/***/ }),

/***/ 55:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var base83_1 = __webpack_require__(403);
var utils_1 = __webpack_require__(96);
var error_1 = __webpack_require__(795);
/**
 * Returns an error message if invalid or undefined if valid
 * @param blurhash
 */
var validateBlurhash = function (blurhash) {
    if (!blurhash || blurhash.length < 6) {
        throw new error_1.ValidationError("The blurhash string must be at least 6 characters");
    }
    var sizeFlag = base83_1.decode83(blurhash[0]);
    var numY = Math.floor(sizeFlag / 9) + 1;
    var numX = (sizeFlag % 9) + 1;
    if (blurhash.length !== 4 + 2 * numX * numY) {
        throw new error_1.ValidationError("blurhash length mismatch: length is " + blurhash.length + " but it should be " + (4 + 2 * numX * numY));
    }
};
exports.isBlurhashValid = function (blurhash) {
    try {
        validateBlurhash(blurhash);
    }
    catch (error) {
        return { result: false, errorReason: error.message };
    }
    return { result: true };
};
var decodeDC = function (value) {
    var intR = value >> 16;
    var intG = (value >> 8) & 255;
    var intB = value & 255;
    return [utils_1.sRGBToLinear(intR), utils_1.sRGBToLinear(intG), utils_1.sRGBToLinear(intB)];
};
var decodeAC = function (value, maximumValue) {
    var quantR = Math.floor(value / (19 * 19));
    var quantG = Math.floor(value / 19) % 19;
    var quantB = value % 19;
    var rgb = [
        utils_1.signPow((quantR - 9) / 9, 2.0) * maximumValue,
        utils_1.signPow((quantG - 9) / 9, 2.0) * maximumValue,
        utils_1.signPow((quantB - 9) / 9, 2.0) * maximumValue
    ];
    return rgb;
};
var decode = function (blurhash, width, height, punch) {
    validateBlurhash(blurhash);
    punch = punch | 1;
    var sizeFlag = base83_1.decode83(blurhash[0]);
    var numY = Math.floor(sizeFlag / 9) + 1;
    var numX = (sizeFlag % 9) + 1;
    var quantisedMaximumValue = base83_1.decode83(blurhash[1]);
    var maximumValue = (quantisedMaximumValue + 1) / 166;
    var colors = new Array(numX * numY);
    for (var i = 0; i < colors.length; i++) {
        if (i === 0) {
            var value = base83_1.decode83(blurhash.substring(2, 6));
            colors[i] = decodeDC(value);
        }
        else {
            var value = base83_1.decode83(blurhash.substring(4 + i * 2, 6 + i * 2));
            colors[i] = decodeAC(value, maximumValue * punch);
        }
    }
    var bytesPerRow = width * 4;
    var pixels = new Uint8ClampedArray(bytesPerRow * height);
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var r = 0;
            var g = 0;
            var b = 0;
            for (var j = 0; j < numY; j++) {
                for (var i = 0; i < numX; i++) {
                    var basis = Math.cos((Math.PI * x * i) / width) *
                        Math.cos((Math.PI * y * j) / height);
                    var color = colors[i + j * numX];
                    r += color[0] * basis;
                    g += color[1] * basis;
                    b += color[2] * basis;
                }
            }
            var intR = utils_1.linearTosRGB(r);
            var intG = utils_1.linearTosRGB(g);
            var intB = utils_1.linearTosRGB(b);
            pixels[4 * x + 0 + y * bytesPerRow] = intR;
            pixels[4 * x + 1 + y * bytesPerRow] = intG;
            pixels[4 * x + 2 + y * bytesPerRow] = intB;
            pixels[4 * x + 3 + y * bytesPerRow] = 255; // alpha
        }
    }
    return pixels;
};
exports["default"] = decode;
//# sourceMappingURL=decode.js.map

/***/ }),

/***/ 796:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var base83_1 = __webpack_require__(403);
var utils_1 = __webpack_require__(96);
var error_1 = __webpack_require__(795);
var bytesPerPixel = 4;
var multiplyBasisFunction = function (pixels, width, height, basisFunction) {
    var r = 0;
    var g = 0;
    var b = 0;
    var bytesPerRow = width * bytesPerPixel;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var basis = basisFunction(x, y);
            r +=
                basis * utils_1.sRGBToLinear(pixels[bytesPerPixel * x + 0 + y * bytesPerRow]);
            g +=
                basis * utils_1.sRGBToLinear(pixels[bytesPerPixel * x + 1 + y * bytesPerRow]);
            b +=
                basis * utils_1.sRGBToLinear(pixels[bytesPerPixel * x + 2 + y * bytesPerRow]);
        }
    }
    var scale = 1 / (width * height);
    return [r * scale, g * scale, b * scale];
};
var encodeDC = function (value) {
    var roundedR = utils_1.linearTosRGB(value[0]);
    var roundedG = utils_1.linearTosRGB(value[1]);
    var roundedB = utils_1.linearTosRGB(value[2]);
    return (roundedR << 16) + (roundedG << 8) + roundedB;
};
var encodeAC = function (value, maximumValue) {
    var quantR = Math.floor(Math.max(0, Math.min(18, Math.floor(utils_1.signPow(value[0] / maximumValue, 0.5) * 9 + 9.5))));
    var quantG = Math.floor(Math.max(0, Math.min(18, Math.floor(utils_1.signPow(value[1] / maximumValue, 0.5) * 9 + 9.5))));
    var quantB = Math.floor(Math.max(0, Math.min(18, Math.floor(utils_1.signPow(value[2] / maximumValue, 0.5) * 9 + 9.5))));
    return quantR * 19 * 19 + quantG * 19 + quantB;
};
var encode = function (pixels, width, height, componentX, componentY) {
    if (componentX < 1 || componentX > 9 || componentY < 1 || componentY > 9) {
        throw new error_1.ValidationError("BlurHash must have between 1 and 9 components");
    }
    if (width * height * 4 !== pixels.length) {
        throw new error_1.ValidationError("Width and height must match the pixels array");
    }
    var factors = [];
    var _loop_1 = function (y) {
        var _loop_2 = function (x) {
            var normalisation = x == 0 && y == 0 ? 1 : 2;
            var factor = multiplyBasisFunction(pixels, width, height, function (i, j) {
                return normalisation *
                    Math.cos((Math.PI * x * i) / width) *
                    Math.cos((Math.PI * y * j) / height);
            });
            factors.push(factor);
        };
        for (var x = 0; x < componentX; x++) {
            _loop_2(x);
        }
    };
    for (var y = 0; y < componentY; y++) {
        _loop_1(y);
    }
    var dc = factors[0];
    var ac = factors.slice(1);
    var hash = "";
    var sizeFlag = componentX - 1 + (componentY - 1) * 9;
    hash += base83_1.encode83(sizeFlag, 1);
    var maximumValue;
    if (ac.length > 0) {
        var actualMaximumValue = Math.max.apply(Math, ac.map(function (val) { return Math.max.apply(Math, val); }));
        var quantisedMaximumValue = Math.floor(Math.max(0, Math.min(82, Math.floor(actualMaximumValue * 166 - 0.5))));
        maximumValue = (quantisedMaximumValue + 1) / 166;
        hash += base83_1.encode83(quantisedMaximumValue, 1);
    }
    else {
        maximumValue = 1;
        hash += base83_1.encode83(0, 1);
    }
    hash += base83_1.encode83(encodeDC(dc), 4);
    ac.forEach(function (factor) {
        hash += base83_1.encode83(encodeAC(factor, maximumValue), 2);
    });
    return hash;
};
exports["default"] = encode;
//# sourceMappingURL=encode.js.map

/***/ }),

/***/ 795:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "ValidationError";
        _this.message = message;
        return _this;
    }
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
//# sourceMappingURL=error.js.map

/***/ }),

/***/ 60:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", ({ value: true }));
var decode_1 = __webpack_require__(55);
exports.decode = decode_1.default;
exports.isBlurhashValid = decode_1.isBlurhashValid;
var encode_1 = __webpack_require__(796);
exports.encode = encode_1.default;
__export(__webpack_require__(795));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 96:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sRGBToLinear = function (value) {
    var v = value / 255;
    if (v <= 0.04045) {
        return v / 12.92;
    }
    else {
        return Math.pow((v + 0.055) / 1.055, 2.4);
    }
};
exports.linearTosRGB = function (value) {
    var v = Math.max(0, Math.min(1, value));
    if (v <= 0.0031308) {
        return Math.round(v * 12.92 * 255 + 0.5);
    }
    else {
        return Math.round((1.055 * Math.pow(v, 1 / 2.4) - 0.055) * 255 + 0.5);
    }
};
exports.sign = function (n) { return (n < 0 ? -1 : 1); };
exports.signPow = function (val, exp) {
    return exports.sign(val) * Math.pow(Math.abs(val), exp);
};
//# sourceMappingURL=utils.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/* harmony import */ var blurhash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60);
/* harmony import */ var blurhash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(blurhash__WEBPACK_IMPORTED_MODULE_0__);
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


const ctx = self;
ctx.addEventListener("message", event => {
  const {
    seq,
    imageData
  } = event.data;
  const blurhash = (0,blurhash__WEBPACK_IMPORTED_MODULE_0__.encode)(imageData.data, imageData.width, imageData.height,
  // use 4 components on the longer dimension, if square then both
  imageData.width >= imageData.height ? 4 : 3, imageData.height >= imageData.width ? 4 : 3);
  ctx.postMessage({
    seq,
    blurhash
  });
});
})();

/******/ })()
;
//# sourceMappingURL=691f7738772a1ef751de.worker.js.map