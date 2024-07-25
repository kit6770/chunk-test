/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 29336:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CE: () => (/* binding */ stringToBase),
/* harmony export */   CM: () => (/* binding */ removeDirectionOverrideChars),
/* harmony export */   FN: () => (/* binding */ prevString),
/* harmony export */   Fv: () => (/* binding */ normalize),
/* harmony export */   GP: () => (/* binding */ simpleRetryOperation),
/* harmony export */   GR: () => (/* binding */ downloadUrl),
/* harmony export */   HT: () => (/* binding */ promiseMapSeries),
/* harmony export */   Hh: () => (/* binding */ encodeUri),
/* harmony export */   JS: () => (/* binding */ decodeParams),
/* harmony export */   Jw: () => (/* binding */ nextString),
/* harmony export */   MB: () => (/* binding */ averageBetweenStrings),
/* harmony export */   MX: () => (/* binding */ getCrypto),
/* harmony export */   Oe: () => (/* binding */ ensureNoTrailingSlash),
/* harmony export */   PQ: () => (/* binding */ defer),
/* harmony export */   VP: () => (/* binding */ alphabetPad),
/* harmony export */   XW: () => (/* binding */ inherits),
/* harmony export */   Xk: () => (/* binding */ DEFAULT_ALPHABET),
/* harmony export */   Y3: () => (/* binding */ recursivelyAssign),
/* harmony export */   YY: () => (/* binding */ chunkPromises),
/* harmony export */   _v: () => (/* binding */ sleep),
/* harmony export */   bX: () => (/* binding */ removeElement),
/* harmony export */   cd: () => (/* binding */ deepSortedObjectEntries),
/* harmony export */   dm: () => (/* binding */ deepCompare),
/* harmony export */   hK: () => (/* binding */ encodeParams),
/* harmony export */   hj: () => (/* binding */ isNumber),
/* harmony export */   hr: () => (/* binding */ escapeRegExp),
/* harmony export */   "if": () => (/* binding */ removeHiddenChars),
/* harmony export */   l7: () => (/* binding */ extend),
/* harmony export */   le: () => (/* binding */ isNullOrUndefined),
/* harmony export */   m3: () => (/* binding */ globToRegexp),
/* harmony export */   mf: () => (/* binding */ isFunction),
/* harmony export */   p$: () => (/* binding */ deepCopy),
/* harmony export */   qu: () => (/* binding */ compare),
/* harmony export */   rI: () => (/* binding */ baseToString),
/* harmony export */   rl: () => (/* binding */ checkObjectHasKeys),
/* harmony export */   uC: () => (/* binding */ lexicographicCompare),
/* harmony export */   uV: () => (/* binding */ promiseTry)
/* harmony export */ });
/* unused harmony exports checkObjectHasNoAdditionalKeys, polyfillSuper, setCrypto */
/* harmony import */ var unhomoglyph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85067);
/* harmony import */ var unhomoglyph__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(unhomoglyph__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var p_retry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(942693);
/* harmony import */ var p_retry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(p_retry__WEBPACK_IMPORTED_MODULE_1__);
/*
Copyright 2015, 2016 OpenMarket Ltd
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

/**
 * This is an internal module.
 * @module utils
 */



/**
 * Encode a dictionary of query parameters.
 * @param {Object} params A dict of key/values to encode e.g.
 * {"foo": "bar", "baz": "taz"}
 * @return {string} The encoded string e.g. foo=bar&baz=taz
 */
function encodeParams(params) {
  return new URLSearchParams(params).toString();
}
/**
 * Decode a query string in `application/x-www-form-urlencoded` format.
 * @param {string} query A query string to decode e.g.
 * foo=bar&via=server1&server2
 * @return {Object} The decoded object, if any keys occurred multiple times
 * then the value will be an array of strings, else it will be an array.
 * This behaviour matches Node's qs.parse but is built on URLSearchParams
 * for native web compatibility
 */
function decodeParams(query) {
  const o = {};
  const params = new URLSearchParams(query);
  for (const key of params.keys()) {
    const val = params.getAll(key);
    o[key] = val.length === 1 ? val[0] : val;
  }
  return o;
}

/**
 * Encodes a URI according to a set of template variables. Variables will be
 * passed through encodeURIComponent.
 * @param {string} pathTemplate The path with template variables e.g. '/foo/$bar'.
 * @param {Object} variables The key/value pairs to replace the template
 * variables with. E.g. { "$bar": "baz" }.
 * @return {string} The result of replacing all template variables e.g. '/foo/baz'.
 */
function encodeUri(pathTemplate, variables) {
  for (const key in variables) {
    if (!variables.hasOwnProperty(key)) {
      continue;
    }
    pathTemplate = pathTemplate.replace(key, encodeURIComponent(variables[key]));
  }
  return pathTemplate;
}

/**
 * The removeElement() method removes the first element in the array that
 * satisfies (returns true) the provided testing function.
 * @param {Array} array The array.
 * @param {Function} fn Function to execute on each value in the array, with the
 * function signature <code>fn(element, index, array)</code>. Return true to
 * remove this element and break.
 * @param {boolean} reverse True to search in reverse order.
 * @return {boolean} True if an element was removed.
 */
function removeElement(array, fn, reverse) {
  let i;
  let removed;
  if (reverse) {
    for (i = array.length - 1; i >= 0; i--) {
      if (fn(array[i], i, array)) {
        removed = array[i];
        array.splice(i, 1);
        return removed;
      }
    }
  } else {
    for (i = 0; i < array.length; i++) {
      if (fn(array[i], i, array)) {
        removed = array[i];
        array.splice(i, 1);
        return removed;
      }
    }
  }
  return false;
}

/**
 * Checks if the given thing is a function.
 * @param {*} value The thing to check.
 * @return {boolean} True if it is a function.
 */
function isFunction(value) {
  return Object.prototype.toString.call(value) === "[object Function]";
}

/**
 * Checks that the given object has the specified keys.
 * @param {Object} obj The object to check.
 * @param {string[]} keys The list of keys that 'obj' must have.
 * @throws If the object is missing keys.
 */
// note using 'keys' here would shadow the 'keys' function defined above
function checkObjectHasKeys(obj, keys) {
  for (let i = 0; i < keys.length; i++) {
    if (!obj.hasOwnProperty(keys[i])) {
      throw new Error("Missing required key: " + keys[i]);
    }
  }
}

/**
 * Checks that the given object has no extra keys other than the specified ones.
 * @param {Object} obj The object to check.
 * @param {string[]} allowedKeys The list of allowed key names.
 * @throws If there are extra keys.
 */
function checkObjectHasNoAdditionalKeys(obj, allowedKeys) {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    if (allowedKeys.indexOf(key) === -1) {
      throw new Error("Unknown key: " + key);
    }
  }
}

/**
 * Deep copy the given object. The object MUST NOT have circular references and
 * MUST NOT have functions.
 * @param {Object} obj The object to deep copy.
 * @return {Object} A copy of the object without any references to the original.
 */
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Compare two objects for equality. The objects MUST NOT have circular references.
 *
 * @param {Object} x The first object to compare.
 * @param {Object} y The second object to compare.
 *
 * @return {boolean} true if the two objects are equal
 */
function deepCompare(x, y) {
  // Inspired by
  // http://stackoverflow.com/questions/1068834/object-comparison-in-javascript#1144249

  // Compare primitives and functions.
  // Also check if both arguments link to the same object.
  if (x === y) {
    return true;
  }
  if (typeof x !== typeof y) {
    return false;
  }

  // special-case NaN (since NaN !== NaN)
  if (typeof x === 'number' && isNaN(x) && isNaN(y)) {
    return true;
  }

  // special-case null (since typeof null == 'object', but null.constructor
  // throws)
  if (x === null || y === null) {
    return x === y;
  }

  // everything else is either an unequal primitive, or an object
  if (!(x instanceof Object)) {
    return false;
  }

  // check they are the same type of object
  if (x.constructor !== y.constructor || x.prototype !== y.prototype) {
    return false;
  }

  // special-casing for some special types of object
  if (x instanceof RegExp || x instanceof Date) {
    return x.toString() === y.toString();
  }

  // the object algorithm works for Array, but it's sub-optimal.
  if (x instanceof Array) {
    if (x.length !== y.length) {
      return false;
    }
    for (let i = 0; i < x.length; i++) {
      if (!deepCompare(x[i], y[i])) {
        return false;
      }
    }
  } else {
    // disable jshint "The body of a for in should be wrapped in an if
    // statement"
    /* jshint -W089 */

    // check that all of y's direct keys are in x
    let p;
    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      }
    }

    // finally, compare each of x's keys with y
    for (p in y) {
      // eslint-disable-line guard-for-in
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      }
      if (!deepCompare(x[p], y[p])) {
        return false;
      }
    }
  }
  /* jshint +W089 */
  return true;
}

// Dev note: This returns a tuple, but jsdoc doesn't like that. https://github.com/jsdoc/jsdoc/issues/1703
/**
 * Creates an array of object properties/values (entries) then
 * sorts the result by key, recursively. The input object must
 * ensure it does not have loops. If the input is not an object
 * then it will be returned as-is.
 * @param {*} obj The object to get entries of
 * @returns {Array} The entries, sorted by key.
 */
function deepSortedObjectEntries(obj) {
  if (typeof obj !== "object") return obj;

  // Apparently these are object types...
  if (obj === null || obj === undefined || Array.isArray(obj)) return obj;
  const pairs = [];
  for (const [k, v] of Object.entries(obj)) {
    pairs.push([k, deepSortedObjectEntries(v)]);
  }

  // lexicographicCompare is faster than localeCompare, so let's use that.
  pairs.sort((a, b) => lexicographicCompare(a[0], b[0]));
  return pairs;
}

/**
 * Copy properties from one object to another.
 *
 * All enumerable properties, included inherited ones, are copied.
 *
 * This is approximately equivalent to ES6's Object.assign, except
 * that the latter doesn't copy inherited properties.
 *
 * @param {Object} target  The object that will receive new properties
 * @param {...Object} source  Objects from which to copy properties
 *
 * @return {Object} target
 */
function extend(...restParams) {
  const target = restParams[0] || {};
  for (let i = 1; i < restParams.length; i++) {
    const source = restParams[i];
    if (!source) continue;
    for (const propName in source) {
      // eslint-disable-line guard-for-in
      target[propName] = source[propName];
    }
  }
  return target;
}

/**
 * Inherit the prototype methods from one constructor into another. This is a
 * port of the Node.js implementation with an Object.create polyfill.
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
function inherits(ctor, superCtor) {
  // Add util.inherits from Node.js
  // Source:
  // https://github.com/joyent/node/blob/master/lib/util.js
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
}

/**
 * Polyfills inheritance for prototypes by allowing different kinds of
 * super types. Typically prototypes would use `SuperType.call(this, params)`
 * though this doesn't always work in some environments - this function
 * falls back to using `Object.assign()` to clone a constructed copy
 * of the super type onto `thisArg`.
 * @param {any} thisArg The child instance. Modified in place.
 * @param {any} SuperType The type to act as a super instance
 * @param {any} params Arguments to supply to the super type's constructor
 */
function polyfillSuper(thisArg, SuperType, ...params) {
  try {
    SuperType.call(thisArg, ...params);
  } catch (e) {
    // fall back to Object.assign to just clone the thing
    const fakeSuper = new SuperType(...params);
    Object.assign(thisArg, fakeSuper);
  }
}

/**
 * Returns whether the given value is a finite number without type-coercion
 *
 * @param {*} value the value to test
 * @return {boolean} whether or not value is a finite number without type-coercion
 */
function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

/**
 * Removes zero width chars, diacritics and whitespace from the string
 * Also applies an unhomoglyph on the string, to prevent similar looking chars
 * @param {string} str the string to remove hidden characters from
 * @return {string} a string with the hidden characters removed
 */
function removeHiddenChars(str) {
  if (typeof str === "string") {
    return unhomoglyph__WEBPACK_IMPORTED_MODULE_0___default()(str.normalize('NFD').replace(removeHiddenCharsRegex, ''));
  }
  return "";
}

/**
 * Removes the direction override characters from a string
 * @param {string} input
 * @returns string with chars removed
 */
function removeDirectionOverrideChars(str) {
  if (typeof str === "string") {
    return str.replace(/[\u202d-\u202e]/g, '');
  }
  return "";
}
function normalize(str) {
  // Note: we have to match the filter with the removeHiddenChars() because the
  // function strips spaces and other characters (M becomes RN for example, in lowercase).
  return removeHiddenChars(str.toLowerCase())
  // Strip all punctuation
  .replace(/[\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~\u2000-\u206f\u2e00-\u2e7f]/g, "")
  // We also doubly convert to lowercase to work around oddities of the library.
  .toLowerCase();
}

// Regex matching bunch of unicode control characters and otherwise misleading/invisible characters.
// Includes:
// various width spaces U+2000 - U+200D
// LTR and RTL marks U+200E and U+200F
// LTR/RTL and other directional formatting marks U+202A - U+202F
// Arabic Letter RTL mark U+061C
// Combining characters U+0300 - U+036F
// Zero width no-break space (BOM) U+FEFF
// eslint-disable-next-line no-misleading-character-class
const removeHiddenCharsRegex = /[\u2000-\u200F\u202A-\u202F\u0300-\u036F\uFEFF\u061C\s]/g;
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function globToRegexp(glob, extended) {
  extended = typeof extended === 'boolean' ? extended : true;
  // From
  // https://github.com/matrix-org/synapse/blob/abbee6b29be80a77e05730707602f3bbfc3f38cb/synapse/push/__init__.py#L132
  // Because micromatch is about 130KB with dependencies,
  // and minimatch is not much better.
  let pat = escapeRegExp(glob);
  pat = pat.replace(/\\\*/g, '.*');
  pat = pat.replace(/\?/g, '.');
  if (extended) {
    pat = pat.replace(/\\\[(!|)(.*)\\]/g, function (match, p1, p2, offset, string) {
      const first = p1 && '^' || '';
      const second = p2.replace(/\\-/, '-');
      return '[' + first + second + ']';
    });
  }
  return pat;
}
function ensureNoTrailingSlash(url) {
  if (url && url.endsWith("/")) {
    return url.substr(0, url.length - 1);
  } else {
    return url;
  }
}

// Returns a promise which resolves with a given value after the given number of ms
function sleep(ms, value) {
  return new Promise(resolve => {
    setTimeout(resolve, ms, value);
  });
}
function isNullOrUndefined(val) {
  return val === null || val === undefined;
}
// Returns a Deferred
function defer() {
  let resolve;
  let reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    resolve,
    reject,
    promise
  };
}
async function promiseMapSeries(promises, fn) {
  for (const o of promises) {
    await fn(await o);
  }
}
function promiseTry(fn) {
  return new Promise(resolve => resolve(fn()));
}

// Creates and awaits all promises, running no more than `chunkSize` at the same time
async function chunkPromises(fns, chunkSize) {
  const results = [];
  for (let i = 0; i < fns.length; i += chunkSize) {
    results.push(...(await Promise.all(fns.slice(i, i + chunkSize).map(fn => fn()))));
  }
  return results;
}

/**
 * Retries the function until it succeeds or is interrupted. The given function must return
 * a promise which throws/rejects on error, otherwise the retry will assume the request
 * succeeded. The promise chain returned will contain the successful promise. The given function
 * should always return a new promise.
 * @param {Function} promiseFn The function to call to get a fresh promise instance. Takes an
 * attempt count as an argument, for logging/debugging purposes.
 * @returns {Promise<T>} The promise for the retried operation.
 */
function simpleRetryOperation(promiseFn) {
  return p_retry__WEBPACK_IMPORTED_MODULE_1___default()(attempt => {
    return promiseFn(attempt);
  }, {
    forever: true,
    factor: 2,
    minTimeout: 3000,
    // ms
    maxTimeout: 15000 // ms
  });
}

// We need to be able to access the Node.js crypto library from within the
// Matrix SDK without needing to `require("crypto")`, which will fail in
// browsers.  So `index.ts` will call `setCrypto` to store it, and when we need
// it, we can call `getCrypto`.
let crypto;
function setCrypto(c) {
  crypto = c;
}
function getCrypto() {
  return crypto;
}

// String averaging inspired by https://stackoverflow.com/a/2510816
// Dev note: We make the alphabet a string because it's easier to write syntactically
// than arrays. Thankfully, strings implement the useful parts of the Array interface
// anyhow.

/**
 * The default alphabet used by string averaging in this SDK. This matches
 * all usefully printable ASCII characters (0x20-0x7E, inclusive).
 */
const DEFAULT_ALPHABET = (() => {
  let str = "";
  for (let c = 0x20; c <= 0x7E; c++) {
    str += String.fromCharCode(c);
  }
  return str;
})();

/**
 * Pads a string using the given alphabet as a base. The returned string will be
 * padded at the end with the first character in the alphabet.
 *
 * This is intended for use with string averaging.
 * @param {string} s The string to pad.
 * @param {number} n The length to pad to.
 * @param {string} alphabet The alphabet to use as a single string.
 * @returns {string} The padded string.
 */
function alphabetPad(s, n, alphabet = DEFAULT_ALPHABET) {
  return s.padEnd(n, alphabet[0]);
}

/**
 * Converts a baseN number to a string, where N is the alphabet's length.
 *
 * This is intended for use with string averaging.
 * @param {bigint} n The baseN number.
 * @param {string} alphabet The alphabet to use as a single string.
 * @returns {string} The baseN number encoded as a string from the alphabet.
 */
function baseToString(n, alphabet = DEFAULT_ALPHABET) {
  // Developer note: the stringToBase() function offsets the character set by 1 so that repeated
  // characters (ie: "aaaaaa" in a..z) don't come out as zero. We have to reverse this here as
  // otherwise we'll be wrong in our conversion. Undoing a +1 before an exponent isn't very fun
  // though, so we rely on a lengthy amount of `x - 1` and integer division rules to reach a
  // sane state. This also means we have to do rollover detection: see below.

  const len = BigInt(alphabet.length);
  if (n <= len) {
    var _alphabet;
    return (_alphabet = alphabet[Number(n) - 1]) !== null && _alphabet !== void 0 ? _alphabet : "";
  }
  let d = n / len;
  let r = Number(n % len) - 1;

  // Rollover detection: if the remainder is negative, it means that the string needs
  // to roll over by 1 character downwards (ie: in a..z, the previous to "aaa" would be
  // "zz").
  if (r < 0) {
    d -= BigInt(Math.abs(r)); // abs() is just to be clear what we're doing. Could also `+= r`.
    r = Number(len) - 1;
  }
  return baseToString(d, alphabet) + alphabet[r];
}

/**
 * Converts a string to a baseN number, where N is the alphabet's length.
 *
 * This is intended for use with string averaging.
 * @param {string} s The string to convert to a number.
 * @param {string} alphabet The alphabet to use as a single string.
 * @returns {bigint} The baseN number.
 */
function stringToBase(s, alphabet = DEFAULT_ALPHABET) {
  const len = BigInt(alphabet.length);

  // In our conversion to baseN we do a couple performance optimizations to avoid using
  // excess CPU and such. To create baseN numbers, the input string needs to be reversed
  // so the exponents stack up appropriately, as the last character in the unreversed
  // string has less impact than the first character (in "abc" the A is a lot more important
  // for lexicographic sorts). We also do a trick with the character codes to optimize the
  // alphabet lookup, avoiding an index scan of `alphabet.indexOf(reversedStr[i])` - we know
  // that the alphabet and (theoretically) the input string are constrained on character sets
  // and thus can do simple subtraction to end up with the same result.

  // Developer caution: we carefully cast to BigInt here to avoid losing precision. We cannot
  // rely on Math.pow() (for example) to be capable of handling our insane numbers.

  let result = BigInt(0);
  for (let i = s.length - 1, j = BigInt(0); i >= 0; i--, j++) {
    const charIndex = s.charCodeAt(i) - alphabet.charCodeAt(0);

    // We add 1 to the char index to offset the whole numbering scheme. We unpack this in
    // the baseToString() function.
    result += BigInt(1 + charIndex) * len ** j;
  }
  return result;
}

/**
 * Averages two strings, returning the midpoint between them. This is accomplished by
 * converting both to baseN numbers (where N is the alphabet's length) then averaging
 * those before re-encoding as a string.
 * @param {string} a The first string.
 * @param {string} b The second string.
 * @param {string} alphabet The alphabet to use as a single string.
 * @returns {string} The midpoint between the strings, as a string.
 */
function averageBetweenStrings(a, b, alphabet = DEFAULT_ALPHABET) {
  const padN = Math.max(a.length, b.length);
  const baseA = stringToBase(alphabetPad(a, padN, alphabet), alphabet);
  const baseB = stringToBase(alphabetPad(b, padN, alphabet), alphabet);
  const avg = (baseA + baseB) / BigInt(2);

  // Detect integer division conflicts. This happens when two numbers are divided too close so
  // we lose a .5 precision. We need to add a padding character in these cases.
  if (avg === baseA || avg == baseB) {
    return baseToString(avg, alphabet) + alphabet[0];
  }
  return baseToString(avg, alphabet);
}

/**
 * Finds the next string using the alphabet provided. This is done by converting the
 * string to a baseN number, where N is the alphabet's length, then adding 1 before
 * converting back to a string.
 * @param {string} s The string to start at.
 * @param {string} alphabet The alphabet to use as a single string.
 * @returns {string} The string which follows the input string.
 */
function nextString(s, alphabet = DEFAULT_ALPHABET) {
  return baseToString(stringToBase(s, alphabet) + BigInt(1), alphabet);
}

/**
 * Finds the previous string using the alphabet provided. This is done by converting the
 * string to a baseN number, where N is the alphabet's length, then subtracting 1 before
 * converting back to a string.
 * @param {string} s The string to start at.
 * @param {string} alphabet The alphabet to use as a single string.
 * @returns {string} The string which precedes the input string.
 */
function prevString(s, alphabet = DEFAULT_ALPHABET) {
  return baseToString(stringToBase(s, alphabet) - BigInt(1), alphabet);
}

/**
 * Compares strings lexicographically as a sort-safe function.
 * @param {string} a The first (reference) string.
 * @param {string} b The second (compare) string.
 * @returns {number} Negative if the reference string is before the compare string;
 * positive if the reference string is after; and zero if equal.
 */
function lexicographicCompare(a, b) {
  // Dev note: this exists because I'm sad that you can use math operators on strings, so I've
  // hidden the operation in this function.
  return a < b ? -1 : a === b ? 0 : 1;
}
const collator = new Intl.Collator();
/**
 * Performant language-sensitive string comparison
 * @param a the first string to compare
 * @param b the second string to compare
 */
function compare(a, b) {
  return collator.compare(a, b);
}

/**
 * This function is similar to Object.assign() but it assigns recursively and
 * allows you to ignore nullish values from the source
 *
 * @param {Object} target
 * @param {Object} source
 * @returns the target object
 */
function recursivelyAssign(target, source, ignoreNullish = false) {
  for (const [sourceKey, sourceValue] of Object.entries(source)) {
    if (target[sourceKey] instanceof Object && sourceValue) {
      recursivelyAssign(target[sourceKey], sourceValue);
      continue;
    }
    if (sourceValue !== null && sourceValue !== undefined || !ignoreNullish) {
      target[sourceKey] = sourceValue;
      continue;
    }
  }
  return target;
}
const downloadUrl = (id, client) => {
  const str = localStorage.getItem("mx_Homeserver_Creds");
  const {
    homeserverUrl
  } = JSON.parse(str) || {};
  return `${homeserverUrl}/_file-service/download?id=${id}`;
};

/***/ }),

/***/ 245539:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZP: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   ec: () => (/* binding */ defaultDispatcher)
/* harmony export */ });
/* unused harmony export MatrixDispatcher */
/* harmony import */ var flux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(665203);
/* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(515807);
/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2017 New Vector Ltd
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




/**
 * A dispatcher for ActionPayloads (the default within the SDK).
 */
class MatrixDispatcher extends flux__WEBPACK_IMPORTED_MODULE_0__.Dispatcher {
  /**
   * Dispatches an event on the dispatcher's event bus.
   * @param {ActionPayload} payload Required. The payload to dispatch.
   * @param {boolean=false} sync Optional. Pass true to dispatch
   *        synchronously. This is useful for anything triggering
   *        an operation that the browser requires user interaction
   *        for. Default false (async).
   */
  dispatch(payload, sync = false) {
    if (payload instanceof _payloads__WEBPACK_IMPORTED_MODULE_1__/* .AsyncActionPayload */ .A) {
      payload.fn(action => {
        this.dispatch(action, sync);
      });
      return;
    }
    if (sync) {
      super.dispatch(payload);
    } else {
      // Unless the caller explicitly asked for us to dispatch synchronously,
      // we always set a timeout to do this: The flux dispatcher complains
      // if you dispatch from within a dispatch, so rather than action
      // handlers having to worry about not calling anything that might
      // then dispatch, we just do dispatches asynchronously.
      setTimeout(super.dispatch.bind(this, payload), 0);
    }
  }

  /**
   * Shorthand for dispatch({action: Action.WHATEVER}, sync). No additional
   * properties can be included with this version.
   * @param {Action} action The action to dispatch.
   * @param {boolean=false} sync Whether the dispatch should be sync or not.
   * @see dispatch(action: ActionPayload, sync: boolean)
   */
  fire(action, sync = false) {
    this.dispatch({
      action
    }, sync);
  }
}
const defaultDispatcher = new MatrixDispatcher();
const anyGlobal = __webpack_require__.g;
if (!anyGlobal.mxDispatcher) {
  anyGlobal.mxDispatcher = defaultDispatcher;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultDispatcher);

/***/ }),

/***/ 515807:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ AsyncActionPayload)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(225259);

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

/**
 * The base dispatch type exposed by our dispatcher.
 */

/**
 * The function the dispatcher calls when ready for an AsyncActionPayload. The
 * single argument is used to start a dispatch. First the dispatcher calls the
 * outer function, then when the called function is ready it calls the cb
 * function to issue the dispatch. It may call the callback repeatedly if needed.
 */

/**
 * An async version of ActionPayload
 */
class AsyncActionPayload {
  /**
   * @deprecated Not used on AsyncActionPayload.
   */
  get action() {
    return "NOT_USED";
  }

  /**
   * Create a new AsyncActionPayload with the given ready function.
   * @param {AsyncActionFn} readyFn The function to be called when the
   * dispatcher is ready.
   */
  constructor(readyFn) {
    /**
     * The function the dispatcher should call.
     */
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, "fn", void 0);
    this.fn = readyFn;
  }
}

/***/ }),

/***/ 58238:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FB: () => (/* binding */ abbreviateUrl),
/* harmony export */   Oh: () => (/* binding */ stringifyQuery),
/* harmony export */   eY: () => (/* binding */ getUrlParam),
/* harmony export */   mu: () => (/* binding */ getThumbUrl)
/* harmony export */ });
/* unused harmony exports unabbreviateUrl, parseQsFromFragment, parseQs, getQueryParam */
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30364);
/* harmony import */ var matrix_js_sdk_src_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29336);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(827601);
/*
Copyright 2019, 2021 The Matrix.org Foundation C.I.C.

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
 * If a url has no path component, etc. abbreviate it to just the hostname
 *
 * @param {string} u The url to be abbreviated
 * @returns {string} The abbreviated url
 */
function abbreviateUrl(u) {
  if (!u) return "";
  const parsedUrl = url__WEBPACK_IMPORTED_MODULE_0__.parse(u);
  // if it's something we can't parse as a url then just return it
  if (!parsedUrl) return u;
  if (parsedUrl.path === "/") {
    // we ignore query / hash parts: these aren't relevant for IS server URLs
    return parsedUrl.host;
  }
  return u;
}
function unabbreviateUrl(u) {
  if (!u) return "";
  let longUrl = u;
  if (!u.startsWith("https://")) longUrl = "https://" + u;
  const parsed = url.parse(longUrl);
  if (parsed.hostname === null) return u;
  return longUrl;
}

// We want to support some name / value pairs in the fragment
// so we're re-using query string like format
//
// returns {location, params}
function parseQsFromFragment(location) {
  // if we have a fragment, it will start with '#', which we need to drop.
  // (if we don't, this will return '').
  const fragment = location.hash.substring(1);

  // our fragment may contain a query-param-like section. we need to fish
  // this out *before* URI-decoding because the params may contain ? and &
  // characters which are only URI-encoded once.
  const hashparts = fragment.split("?");
  const result = {
    location: decodeURIComponent(hashparts[0]),
    params: {}
  };
  if (hashparts.length > 1) {
    result.params = decodeParams(hashparts[1]);
  }
  return result;
}
function parseQs(location) {
  return decodeParams(location.search.substring(1));
}

/**
 * query url params
 * @param url string
 * @param name param name
 * @returns result
 */
function getUrlParam(url, name) {
  const urlStr = url.split("?")[1];
  const urlSearchParams = new URLSearchParams(urlStr);
  const result = Object.fromEntries(urlSearchParams.entries());
  return result[name] ? result[name] : "";
}
const getQueryParam = param => {
  var rx = new RegExp("[?&]" + param + "=([^&]+).*$");
  var returnVal = window.location.search.match(rx);
  return returnVal === null ? "" : returnVal[1];
};
function stringifyQuery(params) {
  return Object.entries(params).filter(([k, v]) => !(0,lodash_es__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(v)).map(([k, v]) => {
    return `${k}=${encodeURIComponent(v)}`;
  }).join("&");
}
const getThumbUrl = url => {
  if (!url) return url;
  try {
    const _url = new URL(url);
    if (_url.pathname.startsWith('/linx-sdn/image/')) {
      url = url.replace('/linx-sdn/image/', '/linx-sdn/image/thumb/400/');
    }
  } catch (error) {
    console.error('sdn thumb image load failed', url);
  }
  return url;
};

/***/ }),

/***/ 772652:
/***/ (() => {

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

/**
 * This code is removed on production builds.
 *
 * Webpack's `string-replace-loader` searches for the `use theming` string
 * in this specific file, and replaces it with CSS requires statements that
 * are specific to the themes we have enabled.
 *
 * Without this workaround, webpack would import the CSS of all themes, which
 * would defeat the purpose of hot-reloading since all themes would be compiled,
 * which would result in compilation times on the order of 30s, even on a
 * powerful machine.
 *
 * For more details, see webpack.config.js:184 (string-replace-loader)
 */
if (false) {}

/***/ }),

/***/ 522147:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ getVectorConfig)
/* harmony export */ });
/* harmony import */ var browser_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(724770);
/* harmony import */ var browser_request__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(browser_request__WEBPACK_IMPORTED_MODULE_0__);
/*
Copyright 2018, 2020 New Vector Ltd

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



// Load the config file. First try to load up a domain-specific config of the
// form "config.$domain.json" and if that fails, fall back to config.json.
async function getVectorConfig(relativeLocation = '') {
  if (relativeLocation !== '' && !relativeLocation.endsWith('/')) relativeLocation += '/';
  const specificConfigPromise = getConfig(`${relativeLocation}config.${document.domain}.json`);
  const generalConfigPromise = getConfig(relativeLocation + "config.json");

  // Record the themes used by the previous account on the current device
  // The system default theme is the theme used by the last user
  const lastThemeUsedDevice = localStorage.getItem("last_theme_used_device");
  try {
    const configJson = await specificConfigPromise;
    // 404s succeed with an empty json config, so check that there are keys
    if (Object.keys(configJson).length === 0) {
      throw new Error(); // throw to enter the catch
    }

    if (lastThemeUsedDevice && ["light", "dark"].includes(lastThemeUsedDevice)) {
      configJson["default_theme"] = lastThemeUsedDevice;
    }
    return configJson;
  } catch (e) {
    const configJson = await generalConfigPromise;
    if (lastThemeUsedDevice && ["light", "dark"].includes(lastThemeUsedDevice)) {
      configJson["default_theme"] = lastThemeUsedDevice;
    }
    return configJson;
  }
}
function getConfig(configJsonFilename) {
  const config = new Promise(function (resolve, reject) {
    browser_request__WEBPACK_IMPORTED_MODULE_0___default()({
      method: "GET",
      url: configJsonFilename,
      qs: {
        cachebuster: Date.now()
      }
    }, (err, response, body) => {
      try {
        if (err || response.status < 200 || response.status >= 300) {
          // Lack of a config isn't an error, we should
          // just use the defaults.
          // Also treat a blank config as no config, assuming
          // the status code is 0, because we don't get 404s
          // from file: URIs so this is the only way we can
          // not fail if the file doesn't exist when loading
          // from a file:// URI.
          if (response) {
            if (response.status == 404 || response.status == 0 && body == '') {
              resolve({});
            }
          }
          reject({
            err: err,
            response: response
          });
          return;
        }

        // We parse the JSON ourselves rather than use the JSON
        // parameter, since this throws a parse error on empty
        // which breaks if there's no config.json and we're
        // loading from the filesystem (see above).
        resolve(JSON.parse(body));
      } catch (e) {
        reject({
          err: e
        });
      }
    });
  });
  return config;
}

/***/ }),

/***/ 318481:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// EXTERNAL MODULE: ./node_modules/query-string/index.js
var query_string = __webpack_require__(517563);
// EXTERNAL MODULE: ./src/vector/getconfig.ts
var getconfig = __webpack_require__(522147);
;// CONCATENATED MODULE: ./src/vector/mobile.ts

const _excluded = (/* unused pure expression or super */ null && (["sessionId"]));


const mobileAdapter = async config => {
  // don't try to redirect to the native apps if we're
  // verifying a 3pid (but after we've loaded the config)
  // or if the user is following a deep link
  // (https://github.com/vector-im/element-web/issues/7378)
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isAndroid = /Android/.test(navigator.userAgent);
  if (isIos || isAndroid) {
    const url = new URL(location.href);
    if (url.port) {
      url.port = "";
    }
    const {
      lite
    } = await getVectorConfig();
    url.host = lite || "m.sending.me";
    if (location.hash.startsWith("#/login/auth")) {
      const queryParams = queryString.parse(url.hash.substring(url.hash.indexOf("?")));
      const {
          sessionId
        } = queryParams,
        other = _objectWithoutProperties(queryParams, _excluded);
      const path = `/#/auth/${sessionId}/query/${queryString.stringify(other)}`;
      window.location.href = url.origin + path;
    } else {
      if (!window.location.search && !window.location.hash) {
        window.location.href = `https://${lite}`;
      } else {
        window.location.href = url.toString();
      }
    }
  }
};

// mobileAdapter({});
// EXTERNAL MODULE: ./src/vector/url_utils.ts
var url_utils = __webpack_require__(135103);
// EXTERNAL MODULE: ./src/vector/modernizr.js
var modernizr = __webpack_require__(426753);
// EXTERNAL MODULE: ./node_modules/setimmediate/setImmediate.js
var setImmediate = __webpack_require__(324889);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/UrlUtils.ts
var UrlUtils = __webpack_require__(58238);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/dispatcher.ts
var dispatcher = __webpack_require__(245539);
;// CONCATENATED MODULE: ./src/vector/collabLand.ts


const getCollabLandAeToken = () => {
  let aeToken = (0,UrlUtils/* getUrlParam */.eY)(location.href, 'aeToken');
  console.log("aeToken:", aeToken);
  if (aeToken !== '') {
    localStorage.setItem('aeToken', aeToken);
    console.log('action: collab_land_aeToken');
    dispatcher/* default */.ZP.dispatch({
      action: 'collab_land_aeToken'
    });
  } else {
    var _localStorage$getItem;
    const collab_land = (0,UrlUtils/* getUrlParam */.eY)(location.href, 'collab_land');
    aeToken = (_localStorage$getItem = localStorage.getItem('aeToken')) !== null && _localStorage$getItem !== void 0 ? _localStorage$getItem : '';
    if (collab_land === 'cancel') {
      dispatcher/* default */.ZP.dispatch({
        action: 'collab_land_cancel'
      });
    }
  }
};
;// CONCATENATED MODULE: ./src/vector/index.tsx
/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2017 Vector Creations Ltd
Copyright 2018, 2019 New Vector Ltd
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

// Require common CSS here; this will make webpack process it into bundle.css.
// Our own CSS (which is themed) is imported via separate webpack entry points
// in webpack.config.js


__webpack_require__(771777);
__webpack_require__(94987);
__webpack_require__(279726);

/**
 * This require is necessary only for purposes of CSS hot-reload, as otherwise
 * webpack has some incredible problems figuring out which CSS files should be
 * hot-reloaded, even with proper hints for the loader.
 *
 * On production build it's going to be an empty module, so don't worry about that.
 */
__webpack_require__(772652);
// These are things that can run before the skin loads - be careful not to reference the react-sdk though.




async function settled(...promises) {
  for (const prom of promises) {
    try {
      await prom;
    } catch (e) {
      console.error(e);
    }
  }
}
function checkBrowserFeatures() {
  if (!window.Modernizr) {
    console.error("Cannot check features - Modernizr global is missing.");
    return false;
  }

  // Custom checks atop Modernizr because it doesn't have ES2018/ES2019 checks
  // in it for some features we depend on.
  // Modernizr requires rules to be lowercase with no punctuation.
  // ES2018: http://262.ecma-international.org/9.0/#sec-promise.prototype.finally
  window.Modernizr.addTest("promiseprototypefinally", () => {
    var _window$Promise, _window$Promise$proto;
    return typeof ((_window$Promise = window.Promise) === null || _window$Promise === void 0 ? void 0 : (_window$Promise$proto = _window$Promise.prototype) === null || _window$Promise$proto === void 0 ? void 0 : _window$Promise$proto.finally) === "function";
  });
  // ES2020: http://262.ecma-international.org/#sec-promise.allsettled
  window.Modernizr.addTest("promiseallsettled", () => {
    var _window$Promise2;
    return typeof ((_window$Promise2 = window.Promise) === null || _window$Promise2 === void 0 ? void 0 : _window$Promise2.allSettled) === "function";
  });
  // ES2018: https://262.ecma-international.org/9.0/#sec-get-regexp.prototype.dotAll
  window.Modernizr.addTest("regexpdotall", () => {
    var _window$RegExp, _Object$getOwnPropert;
    return ((_window$RegExp = window.RegExp) === null || _window$RegExp === void 0 ? void 0 : _window$RegExp.prototype) && !!((_Object$getOwnPropert = Object.getOwnPropertyDescriptor(window.RegExp.prototype, "dotAll")) !== null && _Object$getOwnPropert !== void 0 && _Object$getOwnPropert.get);
  });
  // ES2019: http://262.ecma-international.org/10.0/#sec-object.fromentries
  window.Modernizr.addTest("objectfromentries", () => {
    var _window$Object;
    return typeof ((_window$Object = window.Object) === null || _window$Object === void 0 ? void 0 : _window$Object.fromEntries) === "function";
  });
  const featureList = Object.keys(window.Modernizr);
  let featureComplete = true;
  for (let i = 0; i < featureList.length; i++) {
    if (window.Modernizr[featureList[i]] === undefined) {
      console.error("Looked for feature '%s' but Modernizr has no results for this. " + "Has it been configured correctly?", featureList[i]);
      return false;
    }
    if (window.Modernizr[featureList[i]] === false) {
      console.error("Browser missing feature: '%s'", featureList[i]);
      // toggle flag rather than return early so we log all missing features rather than just the first.
      featureComplete = false;
    }
  }
  return featureComplete;
}
const supportedBrowser = checkBrowserFeatures();

// React depends on Map & Set which we check for using modernizr's es6collections
// if modernizr fails we may not have a functional react to show the error message.
// try in react but fallback to an `alert`
// We start loading stuff but don't block on it until as late as possible to allow
// the browser to use as much parallelism as it can.
// Load parallelism is based on research in https://github.com/vector-im/element-web/issues/12253
async function start() {
  // load init.ts async so that its code is not executed immediately and we can catch any exceptions
  const {
    rageshakePromise,
    setupLogStorage,
    preparePlatform,
    loadOlm,
    loadConfig,
    loadSkin,
    loadLanguage,
    loadTheme,
    loadApp,
    showError,
    checkUseLocalAppServer,
    showIncompatibleBrowser,
    loadSdmFlag,
    _t
  } = await Promise.all(/* import() | init */[__webpack_require__.e(532), __webpack_require__.e(8299), __webpack_require__.e(4410)]).then(__webpack_require__.bind(__webpack_require__, 645721));
  try {
    // set the platform for react sdk
    preparePlatform();
    // give rageshake a chance to load/fail, we don't actually assert rageshake loads, we allow it to fail if no IDB
    await settled(rageshakePromise);
    const fragparts = (0,url_utils/* parseQsFromFragment */.D)(window.location);
    const loadOlmPromise = loadOlm();

    // load config requires the platform to be ready
    const loadConfigPromise = loadConfig();
    await settled(loadConfigPromise); // wait for it to settle
    // keep initialising so that we can show any possible error with as many features (theme, i18n) as possible

    // now that the config is ready, try to persist logs
    const persistLogsPromise = setupLogStorage();

    // Load language after loading config.json so that settingsDefaults.language can be applied
    const loadLanguagePromise = loadLanguage();
    // as quickly as we possibly can, set a default theme...
    const loadThemePromise = loadTheme();
    const loadSkinPromise = loadSkin();

    // await things settling so that any errors we have to render have features like i18n running
    await settled(loadSkinPromise, loadThemePromise, loadLanguagePromise);
    let acceptBrowser = supportedBrowser;
    if (!acceptBrowser && window.localStorage) {
      acceptBrowser = Boolean(window.localStorage.getItem("mx_accepts_unsupported_browser"));
    }

    // ##########################
    // error handling begins here
    // ##########################
    if (!acceptBrowser) {
      await new Promise(resolve => {
        console.error("Browser is missing required features.");
        // take to a different landing page to AWOOOOOGA at the user
        hiddenLoad();
        showIncompatibleBrowser(() => {
          if (window.localStorage) {
            window.localStorage.setItem("mx_accepts_unsupported_browser", String(true));
          }
          console.log("User accepts the compatibility risks.");
          resolve();
        });
      });
    }
    try {
      // await config here
      await loadConfigPromise;
    } catch (error) {
      // Now that we've loaded the theme (CSS), display the config syntax error if needed.
      if (error.err && error.err instanceof SyntaxError) {
        // This uses the default brand since the app config is unavailable.
        return showError(_t("Your SendingMe is is misconfigured"), [_t("Your SendingMe is configuration contains invalid JSON. " + "Please correct the problem and reload the page."), _t("The message from the parser is: %(message)s", {
          message: error.err.message || _t("Invalid JSON")
        })]);
      }
      return showError(_t("Unable to load config file: please refresh the page to try again."));
    }

    // ##################################
    // app load critical path starts here
    // assert things started successfully
    // ##################################
    await loadOlmPromise;
    await loadSkinPromise;
    await loadThemePromise;
    await loadLanguagePromise;

    // We don't care if the log persistence made it through successfully, but we do want to
    // make sure it had a chance to load before we move on. It's prepared much higher up in
    // the process, making this the first time we check that it did something.
    await settled(persistLogsPromise);

    // check is use local app server, if yes, set local app server fed url
    const isUseLocalServer = await checkUseLocalAppServer();

    // waiting wasm live, and then to display page
    // if (!isMobile() && !isUseLocalServer) await checkWASMLive();

    // check is load from sdm domain site, if yes, clear all sdm data
    // await checkSDMSiteClear();

    // Finally, load the app. All of the other react-sdk imports are in this file which causes the skinner to
    // run on the components.
    await loadApp(fragparts.params);
    await loadSdmFlag();
  } catch (err) {
    console.error(err);
    // Like the compatibility page, AWOOOOOGA at the user
    // This uses the default brand since the app config is unavailable.
    hiddenLoad();
    await showError(_t("Your SendingMe is is misconfigured"), [err.translatedMessage || _t("Unexpected error preparing the app. See console for details.")]);
  } finally {
    hiddenLoad();
    /** collab land callback **/
    getCollabLandAeToken();
    /** collab land callback **/
  }
}

const hiddenLoad = () => {
  const logoAnimateState = localStorage.getItem("logoAnimateState");
  if (logoAnimateState != "loopComplete") {
    setTimeout(() => {
      hiddenLoad();
    }, 500);
    return;
  }
  const loading = document.querySelector(".mx_loading");
  const sendingMeAnimate = document.querySelector("#mx_login_animate");
  const matrixchatDom = document.querySelector("#matrixchat");
  if (loading) {
    loading.style.display = "none";
  }
  if (sendingMeAnimate) {
    var _window, _window$lottie;
    sendingMeAnimate.style.display = "none";
    (_window = window) === null || _window === void 0 ? void 0 : (_window$lottie = _window.lottie) === null || _window$lottie === void 0 ? void 0 : _window$lottie.destroy();
  }
  if (matrixchatDom) {
    matrixchatDom.style.visibility = "visible";
  }
};
start().catch(err => {
  console.error(err);
  hiddenLoad();
  // show the static error in an iframe to not lose any context / console data
  // with some basic styling to make the iframe full page
  delete document.body.style.height;
  const iframe = document.createElement("iframe");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - typescript seems to only like the IE syntax for iframe sandboxing
  iframe["sandbox"] = "";
  iframe.src = supportedBrowser ? "static/unable-to-load.html" : "static/incompatible-browser.html";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.position = "absolute";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.border = "0";
  document.getElementById("matrixchat").appendChild(iframe);
});

/***/ }),

/***/ 426753:
/***/ (() => {

/*! modernizr 3.11.7 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cors-cryptography-cssanimations-cssfilters-displaytable-es5date-es5function-es5object-es5undefined-es6array-es6collections-es6string-fetch-flexbox-json-localstorage-objectfit-promises-sandbox-svg-svgasimg-svgfilters-urlparser-urlsearchparams !*/
!function (e, t, n, r) {
  function o(e, t) {
    return typeof e === t;
  }
  function i(e, t) {
    return !!~("" + e).indexOf(t);
  }
  function s() {
    return "function" != typeof n.createElement ? n.createElement(arguments[0]) : O ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
  }
  function a() {
    var e = n.body;
    return e || (e = s(O ? "svg" : "body"), e.fake = !0), e;
  }
  function l(e, t, r, o) {
    var i,
      l,
      f,
      u,
      d = "modernizr",
      c = s("div"),
      p = a();
    if (parseInt(r, 10)) for (; r--;) f = s("div"), f.id = o ? o[r] : d + (r + 1), c.appendChild(f);
    return i = s("style"), i.type = "text/css", i.id = "s" + d, (p.fake ? p : c).appendChild(i), p.appendChild(c), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(n.createTextNode(e)), c.id = d, p.fake && (p.style.background = "", p.style.overflow = "hidden", u = x.style.overflow, x.style.overflow = "hidden", x.appendChild(p)), l = t(c, e), p.fake && p.parentNode ? (p.parentNode.removeChild(p), x.style.overflow = u, x.offsetHeight) : c.parentNode.removeChild(c), !!l;
  }
  function f(e) {
    return e.replace(/([A-Z])/g, function (e, t) {
      return "-" + t.toLowerCase();
    }).replace(/^ms-/, "-ms-");
  }
  function u(e, n, r) {
    var o;
    if ("getComputedStyle" in t) {
      o = getComputedStyle.call(t, e, n);
      var i = t.console;
      if (null !== o) r && (o = o.getPropertyValue(r));else if (i) {
        var s = i.error ? "error" : "log";
        i[s].call(i, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
      }
    } else o = !n && e.currentStyle && e.currentStyle[r];
    return o;
  }
  function d(e, n) {
    var o = e.length;
    if ("CSS" in t && "supports" in t.CSS) {
      for (; o--;) if (t.CSS.supports(f(e[o]), n)) return !0;
      return !1;
    }
    if ("CSSSupportsRule" in t) {
      for (var i = []; o--;) i.push("(" + f(e[o]) + ":" + n + ")");
      return i = i.join(" or "), l("@supports (" + i + ") { #modernizr { position: absolute; } }", function (e) {
        return "absolute" === u(e, null, "position");
      });
    }
    return r;
  }
  function c(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, t, n) {
      return t + n.toUpperCase();
    }).replace(/^-/, "");
  }
  function p(e, t, n, a) {
    function l() {
      u && (delete P.style, delete P.modElem);
    }
    if (a = !o(a, "undefined") && a, !o(n, "undefined")) {
      var f = d(e, n);
      if (!o(f, "undefined")) return f;
    }
    for (var u, p, y, m, g, h = ["modernizr", "tspan", "samp"]; !P.style && h.length;) u = !0, P.modElem = s(h.shift()), P.style = P.modElem.style;
    for (y = e.length, p = 0; p < y; p++) if (m = e[p], g = P.style[m], i(m, "-") && (m = c(m)), P.style[m] !== r) {
      if (a || o(n, "undefined")) return l(), "pfx" !== t || m;
      try {
        P.style[m] = n;
      } catch (e) {}
      if (P.style[m] !== g) return l(), "pfx" !== t || m;
    }
    return l(), !1;
  }
  function y(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }
  function m(e, t, n) {
    var r;
    for (var i in e) if (e[i] in t) return !1 === n ? e[i] : (r = t[e[i]], o(r, "function") ? y(r, n || t) : r);
    return !1;
  }
  function g(e, t, n, r, i) {
    var s = e.charAt(0).toUpperCase() + e.slice(1),
      a = (e + " " + _.join(s + " ") + s).split(" ");
    return o(t, "string") || o(t, "undefined") ? p(a, t, r, i) : (a = (e + " " + E.join(s + " ") + s).split(" "), m(a, t, n));
  }
  function h(e, t, n) {
    return g(e, r, r, t, n);
  }
  function v(e) {
    var t = x.className,
      n = Modernizr._config.classPrefix || "";
    if (O && (t = t.baseVal), Modernizr._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
      t = t.replace(r, "$1" + n + "js$2");
    }
    Modernizr._config.enableClasses && (e.length > 0 && (t += " " + n + e.join(" " + n)), O ? x.className.baseVal = t : x.className = t);
  }
  function S(e, t) {
    if ("object" == typeof e) for (var n in e) k(e, n) && S(n, e[n]);else {
      e = e.toLowerCase();
      var r = e.split("."),
        o = Modernizr[r[0]];
      if (2 === r.length && (o = o[r[1]]), void 0 !== o) return Modernizr;
      t = "function" == typeof t ? t() : t, 1 === r.length ? Modernizr[r[0]] = t : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = t), v([(t && !1 !== t ? "" : "no-") + r.join("-")]), Modernizr._trigger(e, t);
    }
    return Modernizr;
  }
  var b = [],
    w = {
      _version: "3.11.7",
      _config: {
        classPrefix: "",
        enableClasses: !1,
        enableJSClass: !0,
        usePrefixes: !0
      },
      _q: [],
      on: function (e, t) {
        var n = this;
        setTimeout(function () {
          t(n[e]);
        }, 0);
      },
      addTest: function (e, t, n) {
        b.push({
          name: e,
          fn: t,
          options: n
        });
      },
      addAsyncTest: function (e) {
        b.push({
          name: null,
          fn: e
        });
      }
    },
    Modernizr = function () {};
  Modernizr.prototype = w, Modernizr = new Modernizr();
  var T = [],
    C = "Moz O ms Webkit",
    _ = w._config.usePrefixes ? C.split(" ") : [];
  w._cssomPrefixes = _;
  var x = n.documentElement,
    O = "svg" === x.nodeName.toLowerCase(),
    j = {
      elem: s("modernizr")
    };
  Modernizr._q.push(function () {
    delete j.elem;
  });
  var P = {
    style: j.elem.style
  };
  Modernizr._q.unshift(function () {
    delete P.style;
  });
  var E = w._config.usePrefixes ? C.toLowerCase().split(" ") : [];
  w._domPrefixes = E, w.testAllProps = g, w.testAllProps = h, Modernizr.addTest("cssanimations", h("animationName", "a", !0)), (w.testStyles = l)("#modernizr{display: table; direction: ltr}#modernizr div{display: table-cell; padding: 10px}", function (e) {
    var t,
      n = e.childNodes;
    t = n[0].offsetLeft < n[1].offsetLeft, Modernizr.addTest("displaytable", t, {
      aliases: ["display-table"]
    });
  }, 2);
  var A = w._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
  w._prefixes = A;
  var N = "CSS" in t && "supports" in t.CSS,
    z = ("supportsCSS" in t);
  Modernizr.addTest("supports", N || z), Modernizr.addTest("cssfilters", function () {
    if (Modernizr.supports) return h("filter", "blur(2px)");
    var e = s("a");
    return e.style.cssText = A.join("filter:blur(2px); "), !!e.style.length && (n.documentMode === r || n.documentMode > 9);
  }), Modernizr.addTest("flexbox", h("flexBasis", "1px", !0));
  var L = function (e) {
    var n,
      o = A.length,
      i = t.CSSRule;
    if (void 0 === i) return r;
    if (!e) return !1;
    if (e = e.replace(/^@/, ""), (n = e.replace(/-/g, "_").toUpperCase() + "_RULE") in i) return "@" + e;
    for (var s = 0; s < o; s++) {
      var a = A[s];
      if (a.toUpperCase() + "_" + n in i) return "@-" + a.toLowerCase() + "-" + e;
    }
    return !1;
  };
  w.atRule = L;
  var R = w.prefixed = function (e, t, n) {
    return 0 === e.indexOf("@") ? L(e) : (-1 !== e.indexOf("-") && (e = c(e)), t ? g(e, t, n) : g(e, "pfx"));
  };
  Modernizr.addTest("objectfit", !!R("objectFit"), {
    aliases: ["object-fit"]
  }), Modernizr.addTest("es5date", function () {
    var e = !1;
    try {
      e = !!Date.parse("2013-04-12T06:06:37.307Z");
    } catch (e) {}
    return !!(Date.now && Date.prototype && Date.prototype.toISOString && Date.prototype.toJSON && e);
  }), Modernizr.addTest("es5function", function () {
    return !(!Function.prototype || !Function.prototype.bind);
  }), Modernizr.addTest("es5object", function () {
    return !!(Object.keys && Object.create && Object.getPrototypeOf && Object.getOwnPropertyNames && Object.isSealed && Object.isFrozen && Object.isExtensible && Object.getOwnPropertyDescriptor && Object.defineProperty && Object.defineProperties && Object.seal && Object.freeze && Object.preventExtensions);
  }), Modernizr.addTest("es5undefined", function () {
    var e, n;
    try {
      n = t.undefined, t.undefined = 12345, e = void 0 === t.undefined, t.undefined = n;
    } catch (e) {
      return !1;
    }
    return e;
  }), Modernizr.addTest("es6array", !!(Array.prototype && Array.prototype.copyWithin && Array.prototype.fill && Array.prototype.find && Array.prototype.findIndex && Array.prototype.keys && Array.prototype.entries && Array.prototype.values && Array.from && Array.of)), Modernizr.addTest("es6collections", !!(t.Map && t.Set && t.WeakMap && t.WeakSet)), Modernizr.addTest("promises", function () {
    return "Promise" in t && "resolve" in t.Promise && "reject" in t.Promise && "all" in t.Promise && "race" in t.Promise && function () {
      var e;
      return new t.Promise(function (t) {
        e = t;
      }), "function" == typeof e;
    }();
  }), Modernizr.addTest("es6string", !!(String.fromCodePoint && String.raw && String.prototype.codePointAt && String.prototype.repeat && String.prototype.startsWith && String.prototype.endsWith && String.prototype.includes)), Modernizr.addTest("svg", !!n.createElementNS && !!n.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
  var k;
  !function () {
    var e = {}.hasOwnProperty;
    k = o(e, "undefined") || o(e.call, "undefined") ? function (e, t) {
      return t in e && o(e.constructor.prototype[t], "undefined");
    } : function (t, n) {
      return e.call(t, n);
    };
  }(), w._l = {}, w.on = function (e, t) {
    this._l[e] || (this._l[e] = []), this._l[e].push(t), Modernizr.hasOwnProperty(e) && setTimeout(function () {
      Modernizr._trigger(e, Modernizr[e]);
    }, 0);
  }, w._trigger = function (e, t) {
    if (this._l[e]) {
      var n = this._l[e];
      setTimeout(function () {
        var e;
        for (e = 0; e < n.length; e++) (0, n[e])(t);
      }, 0), delete this._l[e];
    }
  }, Modernizr._q.push(function () {
    w.addTest = S;
  }), Modernizr.addTest("svgasimg", n.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")), Modernizr.addTest("svgfilters", function () {
    var e = !1;
    try {
      e = "SVGFEColorMatrixElement" in t && 2 === SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE;
    } catch (e) {}
    return e;
  }), Modernizr.addTest("urlparser", function () {
    var e;
    try {
      return e = new URL("http://modernizr.com/"), "http://modernizr.com/" === e.href;
    } catch (e) {
      return !1;
    }
  }), Modernizr.addTest("urlsearchparams", "URLSearchParams" in t), Modernizr.addTest("cors", "XMLHttpRequest" in t && "withCredentials" in new XMLHttpRequest());
  var M = R("crypto", t);
  Modernizr.addTest("crypto", !!R("subtle", M)), Modernizr.addTest("sandbox", "sandbox" in s("iframe")), Modernizr.addTest("json", "JSON" in t && "parse" in JSON && "stringify" in JSON), Modernizr.addTest("fetch", "fetch" in t), Modernizr.addTest("localstorage", function () {
    var e = "modernizr";
    try {
      return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
    } catch (e) {
      return !1;
    }
  }), function () {
    var e, t, n, r, i, s, a;
    for (var l in b) if (b.hasOwnProperty(l)) {
      if (e = [], t = b[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
      for (r = o(t.fn, "function") ? t.fn() : t.fn, i = 0; i < e.length; i++) s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = r : (Modernizr[a[0]] && (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean) || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = r), T.push((r ? "" : "no-") + a.join("-"));
    }
  }(), delete w.addTest, delete w.addAsyncTest;
  for (var V = 0; V < Modernizr._q.length; V++) Modernizr._q[V]();
  e.Modernizr = Modernizr;
}(window, window, document);

/***/ }),

/***/ 135103:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ parseQsFromFragment),
/* harmony export */   l: () => (/* binding */ parseQs)
/* harmony export */ });
/* harmony import */ var matrix_js_sdk_src_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29336);
/*
Copyright 2018, 2020 New Vector Ltd

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



// We want to support some name / value pairs in the fragment
// so we're re-using query string like format
//
// returns {location, params}
function parseQsFromFragment(location) {
  // if we have a fragment, it will start with '#', which we need to drop.
  // (if we don't, this will return '').
  const fragment = location.hash.substring(1);

  // our fragment may contain a query-param-like section. we need to fish
  // this out *before* URI-decoding because the params may contain ? and &
  // characters which are only URI-encoded once.
  const hashparts = fragment.split('?');
  const result = {
    location: decodeURIComponent(hashparts[0]),
    params: {}
  };
  if (hashparts.length > 1) {
    result.params = (0,matrix_js_sdk_src_utils__WEBPACK_IMPORTED_MODULE_0__/* .decodeParams */ .JS)(hashparts[1]);
  }
  return result;
}
function parseQs(location) {
  return (0,matrix_js_sdk_src_utils__WEBPACK_IMPORTED_MODULE_0__/* .decodeParams */ .JS)(location.search.substring(1));
}

/***/ }),

/***/ 724770:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Browser Request
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// UMD HEADER START 
(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
// UMD HEADER END

var XHR = XMLHttpRequest
if (!XHR) throw new Error('missing XMLHttpRequest')
request.log = {
  'trace': noop, 'debug': noop, 'info': noop, 'warn': noop, 'error': noop
}

var DEFAULT_TIMEOUT = 3 * 60 * 1000 // 3 minutes

//
// request
//

function request(options, callback) {
  // The entry-point to the API: prep the options object and pass the real work to run_xhr.
  if(typeof callback !== 'function')
    throw new Error('Bad callback given: ' + callback)

  if(!options)
    throw new Error('No options given')

  var options_onResponse = options.onResponse; // Save this for later.

  if(typeof options === 'string')
    options = {'uri':options};
  else
    options = JSON.parse(JSON.stringify(options)); // Use a duplicate for mutating.

  options.onResponse = options_onResponse // And put it back.

  if (options.verbose) request.log = getLogger();

  if(options.url) {
    options.uri = options.url;
    delete options.url;
  }

  if(!options.uri && options.uri !== "")
    throw new Error("options.uri is a required argument");

  if(typeof options.uri != "string")
    throw new Error("options.uri must be a string");

  var unsupported_options = ['proxy', '_redirectsFollowed', 'maxRedirects', 'followRedirect']
  for (var i = 0; i < unsupported_options.length; i++)
    if(options[ unsupported_options[i] ])
      throw new Error("options." + unsupported_options[i] + " is not supported")

  options.callback = callback
  options.method = options.method || 'GET';
  options.headers = options.headers || {};
  options.body    = options.body || null
  options.timeout = options.timeout || request.DEFAULT_TIMEOUT

  if(options.headers.host)
    throw new Error("Options.headers.host is not supported");

  if(options.json) {
    options.headers.accept = options.headers.accept || 'application/json'
    if(options.method !== 'GET')
      options.headers['content-type'] = 'application/json'

    if(typeof options.json !== 'boolean')
      options.body = JSON.stringify(options.json)
    else if(typeof options.body !== 'string')
      options.body = JSON.stringify(options.body)
  }
  
  //BEGIN QS Hack
  var serialize = function(obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  
  if(options.qs){
    var qs = (typeof options.qs == 'string')? options.qs : serialize(options.qs);
    if(options.uri.indexOf('?') !== -1){ //no get params
        options.uri = options.uri+'&'+qs;
    }else{ //existing get params
        options.uri = options.uri+'?'+qs;
    }
  }
  //END QS Hack
  
  //BEGIN FORM Hack
  var multipart = function(obj) {
    //todo: support file type (useful?)
    var result = {};
    result.boundry = '-------------------------------'+Math.floor(Math.random()*1000000000);
    var lines = [];
    for(var p in obj){
        if (obj.hasOwnProperty(p)) {
            lines.push(
                '--'+result.boundry+"\n"+
                'Content-Disposition: form-data; name="'+p+'"'+"\n"+
                "\n"+
                obj[p]+"\n"
            );
        }
    }
    lines.push( '--'+result.boundry+'--' );
    result.body = lines.join('');
    result.length = result.body.length;
    result.type = 'multipart/form-data; boundary='+result.boundry;
    return result;
  }
  
  if(options.form){
    if(typeof options.form == 'string') throw('form name unsupported');
    if(options.method === 'POST'){
        var encoding = (options.encoding || 'application/x-www-form-urlencoded').toLowerCase();
        options.headers['content-type'] = encoding;
        switch(encoding){
            case 'application/x-www-form-urlencoded':
                options.body = serialize(options.form).replace(/%20/g, "+");
                break;
            case 'multipart/form-data':
                var multi = multipart(options.form);
                //options.headers['content-length'] = multi.length;
                options.body = multi.body;
                options.headers['content-type'] = multi.type;
                break;
            default : throw new Error('unsupported encoding:'+encoding);
        }
    }
  }
  //END FORM Hack

  // If onResponse is boolean true, call back immediately when the response is known,
  // not when the full request is complete.
  options.onResponse = options.onResponse || noop
  if(options.onResponse === true) {
    options.onResponse = callback
    options.callback = noop
  }

  // XXX Browsers do not like this.
  //if(options.body)
  //  options.headers['content-length'] = options.body.length;

  // HTTP basic authentication
  if(!options.headers.authorization && options.auth)
    options.headers.authorization = 'Basic ' + b64_enc(options.auth.username + ':' + options.auth.password);

  return run_xhr(options)
}

var req_seq = 0
function run_xhr(options) {
  var xhr = new XHR
    , timed_out = false
    , is_cors = is_crossDomain(options.uri)
    , supports_cors = ('withCredentials' in xhr)

  req_seq += 1
  xhr.seq_id = req_seq
  xhr.id = req_seq + ': ' + options.method + ' ' + options.uri
  xhr._id = xhr.id // I know I will type "_id" from habit all the time.

  if(is_cors && !supports_cors) {
    var cors_err = new Error('Browser does not support cross-origin request: ' + options.uri)
    cors_err.cors = 'unsupported'
    return options.callback(cors_err, xhr)
  }

  xhr.timeoutTimer = setTimeout(too_late, options.timeout)
  function too_late() {
    timed_out = true
    var er = new Error('ETIMEDOUT')
    er.code = 'ETIMEDOUT'
    er.duration = options.timeout

    request.log.error('Timeout', { 'id':xhr._id, 'milliseconds':options.timeout })
    return options.callback(er, xhr)
  }

  // Some states can be skipped over, so remember what is still incomplete.
  var did = {'response':false, 'loading':false, 'end':false}

  xhr.onreadystatechange = on_state_change
  xhr.open(options.method, options.uri, true) // asynchronous
  if(is_cors)
    xhr.withCredentials = !! options.withCredentials
  xhr.send(options.body)
  return xhr

  function on_state_change(event) {
    if(timed_out)
      return request.log.debug('Ignoring timed out state change', {'state':xhr.readyState, 'id':xhr.id})

    request.log.debug('State change', {'state':xhr.readyState, 'id':xhr.id, 'timed_out':timed_out})

    if(xhr.readyState === XHR.OPENED) {
      request.log.debug('Request started', {'id':xhr.id})
      for (var key in options.headers)
        xhr.setRequestHeader(key, options.headers[key])
    }

    else if(xhr.readyState === XHR.HEADERS_RECEIVED)
      on_response()

    else if(xhr.readyState === XHR.LOADING) {
      on_response()
      on_loading()
    }

    else if(xhr.readyState === XHR.DONE) {
      on_response()
      on_loading()
      on_end()
    }
  }

  function on_response() {
    if(did.response)
      return

    did.response = true
    request.log.debug('Got response', {'id':xhr.id, 'status':xhr.status})
    clearTimeout(xhr.timeoutTimer)
    xhr.statusCode = xhr.status // Node request compatibility

    // Detect failed CORS requests.
    if(is_cors && xhr.statusCode == 0) {
      var cors_err = new Error('CORS request rejected: ' + options.uri)
      cors_err.cors = 'rejected'

      // Do not process this request further.
      did.loading = true
      did.end = true

      return options.callback(cors_err, xhr)
    }

    options.onResponse(null, xhr)
  }

  function on_loading() {
    if(did.loading)
      return

    did.loading = true
    request.log.debug('Response body loading', {'id':xhr.id})
    // TODO: Maybe simulate "data" events by watching xhr.responseText
  }

  function on_end() {
    if(did.end)
      return

    did.end = true
    request.log.debug('Request done', {'id':xhr.id})

    xhr.body = xhr.responseText
    if(options.json) {
      try        { xhr.body = JSON.parse(xhr.responseText) }
      catch (er) { return options.callback(er, xhr)        }
    }

    options.callback(null, xhr, xhr.body)
  }

} // request

request.withCredentials = false;
request.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;

//
// defaults
//

request.defaults = function(options, requester) {
  var def = function (method) {
    var d = function (params, callback) {
      if(typeof params === 'string')
        params = {'uri': params};
      else {
        params = JSON.parse(JSON.stringify(params));
      }
      for (var i in options) {
        if (params[i] === undefined) params[i] = options[i]
      }
      return method(params, callback)
    }
    return d
  }
  var de = def(request)
  de.get = def(request.get)
  de.post = def(request.post)
  de.put = def(request.put)
  de.head = def(request.head)
  return de
}

//
// HTTP method shortcuts
//

var shortcuts = [ 'get', 'put', 'post', 'head' ];
shortcuts.forEach(function(shortcut) {
  var method = shortcut.toUpperCase();
  var func   = shortcut.toLowerCase();

  request[func] = function(opts) {
    if(typeof opts === 'string')
      opts = {'method':method, 'uri':opts};
    else {
      opts = JSON.parse(JSON.stringify(opts));
      opts.method = method;
    }

    var args = [opts].concat(Array.prototype.slice.apply(arguments, [1]));
    return request.apply(this, args);
  }
})

//
// CouchDB shortcut
//

request.couch = function(options, callback) {
  if(typeof options === 'string')
    options = {'uri':options}

  // Just use the request API to do JSON.
  options.json = true
  if(options.body)
    options.json = options.body
  delete options.body

  callback = callback || noop

  var xhr = request(options, couch_handler)
  return xhr

  function couch_handler(er, resp, body) {
    if(er)
      return callback(er, resp, body)

    if((resp.statusCode < 200 || resp.statusCode > 299) && body.error) {
      // The body is a Couch JSON object indicating the error.
      er = new Error('CouchDB error: ' + (body.error.reason || body.error.error))
      for (var key in body)
        er[key] = body[key]
      return callback(er, resp, body);
    }

    return callback(er, resp, body);
  }
}

//
// Utility
//

function noop() {}

function getLogger() {
  var logger = {}
    , levels = ['trace', 'debug', 'info', 'warn', 'error']
    , level, i

  for(i = 0; i < levels.length; i++) {
    level = levels[i]

    logger[level] = noop
    if(typeof console !== 'undefined' && console && console[level])
      logger[level] = formatted(console, level)
  }

  return logger
}

function formatted(obj, method) {
  return formatted_logger

  function formatted_logger(str, context) {
    if(typeof context === 'object')
      str += ' ' + JSON.stringify(context)

    return obj[method].call(obj, str)
  }
}

// Return whether a URL is a cross-domain request.
function is_crossDomain(url) {
  var rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/

  // jQuery #8138, IE may throw an exception when accessing
  // a field from window.location if document.domain has been set
  var ajaxLocation
  try { ajaxLocation = location.href }
  catch (e) {
    // Use the href attribute of an A element since IE will modify it given document.location
    ajaxLocation = document.createElement( "a" );
    ajaxLocation.href = "";
    ajaxLocation = ajaxLocation.href;
  }

  var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []
    , parts = rurl.exec(url.toLowerCase() )

  var result = !!(
    parts &&
    (  parts[1] != ajaxLocParts[1]
    || parts[2] != ajaxLocParts[2]
    || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))
    )
  )

  //console.debug('is_crossDomain('+url+') -> ' + result)
  return result
}

// MIT License from http://phpjs.org/functions/base64_encode:358
function b64_enc (data) {
    // Encodes string using MIME base64 algorithm
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc="", tmp_arr = [];

    if (!data) {
        return data;
    }

    // assume utf8 data
    // data = this.utf8_encode(data+'');

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1<<16 | o2<<8 | o3;

        h1 = bits>>18 & 0x3f;
        h2 = bits>>12 & 0x3f;
        h3 = bits>>6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch (data.length % 3) {
        case 1:
            enc = enc.slice(0, -2) + '==';
        break;
        case 2:
            enc = enc.slice(0, -1) + '=';
        break;
    }

    return enc;
}
    return request;
//UMD FOOTER START
}));
//UMD FOOTER END


/***/ }),

/***/ 444020:
/***/ ((module) => {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ 673759:
/***/ ((module) => {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (false) {}

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/***/ }),

/***/ 92806:
/***/ ((module) => {

"use strict";

module.exports = function (obj, predicate) {
	var ret = {};
	var keys = Object.keys(obj);
	var isArr = Array.isArray(predicate);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var val = obj[key];

		if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
			ret[key] = val;
		}
	}

	return ret;
};


/***/ }),

/***/ 665203:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = __webpack_require__(461063);


/***/ }),

/***/ 461063:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * 
 * @preventMunge
 */



exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = __webpack_require__(673759);

var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

  Dispatcher.prototype.register = function register(callback) {
    var id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   */

  Dispatcher.prototype.unregister = function unregister(id) {
    !this._callbacks[id] ?  false ? 0 : invariant(false) : undefined;
    delete this._callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */

  Dispatcher.prototype.waitFor = function waitFor(ids) {
    !this._isDispatching ?  false ? 0 : invariant(false) : undefined;
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this._isPending[id]) {
        !this._isHandled[id] ?  false ? 0 : invariant(false) : undefined;
        continue;
      }
      !this._callbacks[id] ?  false ? 0 : invariant(false) : undefined;
      this._invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   */

  Dispatcher.prototype.dispatch = function dispatch(payload) {
    !!this._isDispatching ?  false ? 0 : invariant(false) : undefined;
    this._startDispatching(payload);
    try {
      for (var id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   */

  Dispatcher.prototype.isDispatching = function isDispatching() {
    return this._isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */

  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
    for (var id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  };

  return Dispatcher;
})();

module.exports = Dispatcher;

/***/ }),

/***/ 435397:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.3.2 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));


/***/ }),

/***/ 30364:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(435397);
var util = __webpack_require__(803757);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(817673);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ 803757:
/***/ ((module) => {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ 771777:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 94987:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 279726:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 942693:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const retry = __webpack_require__(599353);

const networkErrorMsgs = [
	'Failed to fetch', // Chrome
	'NetworkError when attempting to fetch resource.', // Firefox
	'The Internet connection appears to be offline.', // Safari
	'Network request failed' // `cross-fetch`
];

class AbortError extends Error {
	constructor(message) {
		super();

		if (message instanceof Error) {
			this.originalError = message;
			({message} = message);
		} else {
			this.originalError = new Error(message);
			this.originalError.stack = this.stack;
		}

		this.name = 'AbortError';
		this.message = message;
	}
}

const decorateErrorWithCounts = (error, attemptNumber, options) => {
	// Minus 1 from attemptNumber because the first attempt does not count as a retry
	const retriesLeft = options.retries - (attemptNumber - 1);

	error.attemptNumber = attemptNumber;
	error.retriesLeft = retriesLeft;
	return error;
};

const isNetworkError = errorMessage => networkErrorMsgs.includes(errorMessage);

const pRetry = (input, options) => new Promise((resolve, reject) => {
	options = {
		onFailedAttempt: () => {},
		retries: 10,
		...options
	};

	const operation = retry.operation(options);

	operation.attempt(async attemptNumber => {
		try {
			resolve(await input(attemptNumber));
		} catch (error) {
			if (!(error instanceof Error)) {
				reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
				return;
			}

			if (error instanceof AbortError) {
				operation.stop();
				reject(error.originalError);
			} else if (error instanceof TypeError && !isNetworkError(error.message)) {
				operation.stop();
				reject(error);
			} else {
				decorateErrorWithCounts(error, attemptNumber, options);

				try {
					await options.onFailedAttempt(error);
				} catch (error) {
					reject(error);
					return;
				}

				if (!operation.retry(error)) {
					reject(operation.mainError());
				}
			}
		}
	});
});

module.exports = pRetry;
// TODO: remove this in the next major version
module.exports["default"] = pRetry;

module.exports.AbortError = AbortError;


/***/ }),

/***/ 734155:
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 517563:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const strictUriEncode = __webpack_require__(249264);
const decodeComponent = __webpack_require__(444020);
const splitOnFirst = __webpack_require__(480500);
const filterObject = __webpack_require__(92806);

const isNullOrUndefined = value => value === null || value === undefined;

const encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;

				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'colon-list-separator':
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), ':list='].join('')];
				}

				return [...result, [encode(key, options), ':list=', encode(value, options)].join('')];
			};

		case 'comma':
		case 'separator':
		case 'bracket-separator': {
			const keyValueSep = options.arrayFormat === 'bracket-separator' ?
				'[]=' :
				'=';

			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				// Translate null to an empty string so that it doesn't serialize as 'null'
				value = value === null ? '' : value;

				if (result.length === 0) {
					return [[encode(key, options), keyValueSep, encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
			};
		}

		default:
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'colon-list-separator':
			return (key, value, accumulator) => {
				result = /(:list)$/.exec(key);
				key = key.replace(/:list$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
		case 'separator':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
				const isEncodedArray = (typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator));
				value = isEncodedArray ? decode(value, options) : value;
				const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
				accumulator[key] = newValue;
			};

		case 'bracket-separator':
			return (key, value, accumulator) => {
				const isArray = /(\[\])$/.test(key);
				key = key.replace(/\[\]$/, '');

				if (!isArray) {
					accumulator[key] = value ? decode(value, options) : value;
					return;
				}

				const arrayValue = value === null ?
					[] :
					value.split(options.arrayFormatSeparator).map(item => decode(item, options));

				if (accumulator[key] === undefined) {
					accumulator[key] = arrayValue;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], arrayValue);
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function validateArrayFormatSeparator(value) {
	if (typeof value !== 'string' || value.length !== 1) {
		throw new TypeError('arrayFormatSeparator must be single character string');
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode(value, options) {
	if (options.decode) {
		return decodeComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function getHash(url) {
	let hash = '';
	const hashStart = url.indexOf('#');
	if (hashStart !== -1) {
		hash = url.slice(hashStart);
	}

	return hash;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(query, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ',',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof query !== 'string') {
		return ret;
	}

	query = query.trim().replace(/^[?#&]/, '');

	if (!query) {
		return ret;
	}

	for (const param of query.split('&')) {
		if (param === '') {
			continue;
		}

		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat) ? value : decode(value, options);
		formatter(decode(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ','
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const shouldFilter = key => (
		(options.skipNull && isNullOrUndefined(object[key])) ||
		(options.skipEmptyString && object[key] === '')
	);

	const formatter = encoderForArrayFormat(options);

	const objectCopy = {};

	for (const key of Object.keys(object)) {
		if (!shouldFilter(key)) {
			objectCopy[key] = object[key];
		}
	}

	const keys = Object.keys(objectCopy);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
				return encode(key, options) + '[]';
			}

			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (url, options) => {
	options = Object.assign({
		decode: true
	}, options);

	const [url_, hash] = splitOnFirst(url, '#');

	return Object.assign(
		{
			url: url_.split('?')[0] || '',
			query: parse(extract(url), options)
		},
		options && options.parseFragmentIdentifier && hash ? {fragmentIdentifier: decode(hash, options)} : {}
	);
};

exports.stringifyUrl = (object, options) => {
	options = Object.assign({
		encode: true,
		strict: true,
		[encodeFragmentIdentifier]: true
	}, options);

	const url = removeHash(object.url).split('?')[0] || '';
	const queryFromUrl = exports.extract(object.url);
	const parsedQueryFromUrl = exports.parse(queryFromUrl, {sort: false});

	const query = Object.assign(parsedQueryFromUrl, object.query);
	let queryString = exports.stringify(query, options);
	if (queryString) {
		queryString = `?${queryString}`;
	}

	let hash = getHash(object.url);
	if (object.fragmentIdentifier) {
		hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
	}

	return `${url}${queryString}${hash}`;
};

exports.pick = (input, filter, options) => {
	options = Object.assign({
		parseFragmentIdentifier: true,
		[encodeFragmentIdentifier]: false
	}, options);

	const {url, query, fragmentIdentifier} = exports.parseUrl(input, options);
	return exports.stringifyUrl({
		url,
		query: filterObject(query, filter),
		fragmentIdentifier
	}, options);
};

exports.exclude = (input, filter, options) => {
	const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);

	return exports.pick(input, exclusionFilter, options);
};


/***/ }),

/***/ 249264:
/***/ ((module) => {

"use strict";

module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);


/***/ }),

/***/ 762587:
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};


/***/ }),

/***/ 712361:
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};


/***/ }),

/***/ 817673:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.decode = exports.parse = __webpack_require__(762587);
exports.encode = exports.stringify = __webpack_require__(712361);


/***/ }),

/***/ 599353:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(71846);

/***/ }),

/***/ 71846:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var RetryOperation = __webpack_require__(541960);

exports.operation = function(options) {
  var timeouts = exports.timeouts(options);
  return new RetryOperation(timeouts, {
      forever: options && (options.forever || options.retries === Infinity),
      unref: options && options.unref,
      maxRetryTime: options && options.maxRetryTime
  });
};

exports.timeouts = function(options) {
  if (options instanceof Array) {
    return [].concat(options);
  }

  var opts = {
    retries: 10,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: Infinity,
    randomize: false
  };
  for (var key in options) {
    opts[key] = options[key];
  }

  if (opts.minTimeout > opts.maxTimeout) {
    throw new Error('minTimeout is greater than maxTimeout');
  }

  var timeouts = [];
  for (var i = 0; i < opts.retries; i++) {
    timeouts.push(this.createTimeout(i, opts));
  }

  if (options && options.forever && !timeouts.length) {
    timeouts.push(this.createTimeout(i, opts));
  }

  // sort the array numerically ascending
  timeouts.sort(function(a,b) {
    return a - b;
  });

  return timeouts;
};

exports.createTimeout = function(attempt, opts) {
  var random = (opts.randomize)
    ? (Math.random() + 1)
    : 1;

  var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
  timeout = Math.min(timeout, opts.maxTimeout);

  return timeout;
};

exports.wrap = function(obj, options, methods) {
  if (options instanceof Array) {
    methods = options;
    options = null;
  }

  if (!methods) {
    methods = [];
    for (var key in obj) {
      if (typeof obj[key] === 'function') {
        methods.push(key);
      }
    }
  }

  for (var i = 0; i < methods.length; i++) {
    var method   = methods[i];
    var original = obj[method];

    obj[method] = function retryWrapper(original) {
      var op       = exports.operation(options);
      var args     = Array.prototype.slice.call(arguments, 1);
      var callback = args.pop();

      args.push(function(err) {
        if (op.retry(err)) {
          return;
        }
        if (err) {
          arguments[0] = op.mainError();
        }
        callback.apply(this, arguments);
      });

      op.attempt(function() {
        original.apply(obj, args);
      });
    }.bind(obj, original);
    obj[method].options = options;
  }
};


/***/ }),

/***/ 541960:
/***/ ((module) => {

function RetryOperation(timeouts, options) {
  // Compatibility for the old (timeouts, retryForever) signature
  if (typeof options === 'boolean') {
    options = { forever: options };
  }

  this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
  this._timeouts = timeouts;
  this._options = options || {};
  this._maxRetryTime = options && options.maxRetryTime || Infinity;
  this._fn = null;
  this._errors = [];
  this._attempts = 1;
  this._operationTimeout = null;
  this._operationTimeoutCb = null;
  this._timeout = null;
  this._operationStart = null;
  this._timer = null;

  if (this._options.forever) {
    this._cachedTimeouts = this._timeouts.slice(0);
  }
}
module.exports = RetryOperation;

RetryOperation.prototype.reset = function() {
  this._attempts = 1;
  this._timeouts = this._originalTimeouts.slice(0);
}

RetryOperation.prototype.stop = function() {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }
  if (this._timer) {
    clearTimeout(this._timer);
  }

  this._timeouts       = [];
  this._cachedTimeouts = null;
};

RetryOperation.prototype.retry = function(err) {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }

  if (!err) {
    return false;
  }
  var currentTime = new Date().getTime();
  if (err && currentTime - this._operationStart >= this._maxRetryTime) {
    this._errors.push(err);
    this._errors.unshift(new Error('RetryOperation timeout occurred'));
    return false;
  }

  this._errors.push(err);

  var timeout = this._timeouts.shift();
  if (timeout === undefined) {
    if (this._cachedTimeouts) {
      // retry forever, only keep last error
      this._errors.splice(0, this._errors.length - 1);
      timeout = this._cachedTimeouts.slice(-1);
    } else {
      return false;
    }
  }

  var self = this;
  this._timer = setTimeout(function() {
    self._attempts++;

    if (self._operationTimeoutCb) {
      self._timeout = setTimeout(function() {
        self._operationTimeoutCb(self._attempts);
      }, self._operationTimeout);

      if (self._options.unref) {
          self._timeout.unref();
      }
    }

    self._fn(self._attempts);
  }, timeout);

  if (this._options.unref) {
      this._timer.unref();
  }

  return true;
};

RetryOperation.prototype.attempt = function(fn, timeoutOps) {
  this._fn = fn;

  if (timeoutOps) {
    if (timeoutOps.timeout) {
      this._operationTimeout = timeoutOps.timeout;
    }
    if (timeoutOps.cb) {
      this._operationTimeoutCb = timeoutOps.cb;
    }
  }

  var self = this;
  if (this._operationTimeoutCb) {
    this._timeout = setTimeout(function() {
      self._operationTimeoutCb();
    }, self._operationTimeout);
  }

  this._operationStart = new Date().getTime();

  this._fn(this._attempts);
};

RetryOperation.prototype.try = function(fn) {
  console.log('Using RetryOperation.try() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = function(fn) {
  console.log('Using RetryOperation.start() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = RetryOperation.prototype.try;

RetryOperation.prototype.errors = function() {
  return this._errors;
};

RetryOperation.prototype.attempts = function() {
  return this._attempts;
};

RetryOperation.prototype.mainError = function() {
  if (this._errors.length === 0) {
    return null;
  }

  var counts = {};
  var mainError = null;
  var mainErrorCount = 0;

  for (var i = 0; i < this._errors.length; i++) {
    var error = this._errors[i];
    var message = error.message;
    var count = (counts[message] || 0) + 1;

    counts[message] = count;

    if (count >= mainErrorCount) {
      mainError = error;
      mainErrorCount = count;
    }
  }

  return mainError;
};


/***/ }),

/***/ 324889:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var process = __webpack_require__(734155);
(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof __webpack_require__.g === "undefined" ? this : __webpack_require__.g : self));


/***/ }),

/***/ 480500:
/***/ ((module) => {

"use strict";


module.exports = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};


/***/ }),

/***/ 85067:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



var data = __webpack_require__(647873);

function escapeRegexp(str) {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}

var REPLACE_RE = RegExp(Object.keys(data).map(escapeRegexp).join('|'), 'g');

function replace_fn(match) {
  return data[match];
}

function unhomoglyph(str) {
  return str.replace(REPLACE_RE, replace_fn);
}

module.exports = unhomoglyph;


/***/ }),

/***/ 827601:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */
function isNil(value) {
  return value == null;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNil);


/***/ }),

/***/ 225259:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ 647873:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"0":"O","1":"l","֭":"֖","֮":"֘","֨":"֙","֤":"֚","᪴":"ۛ","⃛":"ۛ","ؙ":"̓","ࣳ":"̓","̓":"̓","̕":"̓","ُ":"̓","ٝ":"̔","֜":"́","֝":"́","ؘ":"́","݇":"́","́":"́","॔":"́","َ":"́","̀":"̀","॓":"̀","̌":"̆","꙼":"̆","٘":"̆","ٚ":"̆","ͮ":"̆","ۨ":"̆̇","̐":"̆̇","ँ":"̆̇","ঁ":"̆̇","ઁ":"̆̇","ଁ":"̆̇","ఀ":"̆̇","ಁ":"̆̇","ഁ":"̆̇","𑒿":"̆̇","᳐":"̂","̑":"̂","ٛ":"̂","߮":"̂","꛰":"̂","֯":"̊","۟":"̊","៓":"̊","゚":"̊","ْ":"̊","ஂ":"̊","ံ":"̊","ំ":"̊","𑌀":"̊","ํ":"̊","ໍ":"̊","ͦ":"̊","ⷪ":"̊","࣫":"̈","߳":"̈","ً":"̋","ࣰ":"̋","͂":"̃","ٓ":"̃","ׄ":"̇","۬":"̇","݀":"̇","࣪":"̇","݁":"̇","͘":"̇","ֹ":"̇","ֺ":"̇","ׂ":"̇","ׁ":"̇","߭":"̇","ं":"̇","ਂ":"̇","ં":"̇","்":"̇","̷":"̸","᪷":"̨","̢":"̨","ͅ":"̨","᳒":"̄","̅":"̄","ٙ":"̄","߫":"̄","꛱":"̄","᳚":"̎","ٗ":"̒","͗":"͐","ࣿ":"͐","ࣸ":"͐","ऀ":"͒","᳭":"̖","᳜":"̩","ٖ":"̩","᳕":"̫","͇":"̳","ࣹ":"͔","ࣺ":"͕","゛":"ﾞ","゜":"ﾟ","̶":"̵","〬":"̉","ׅ":"̣","࣭":"̣","᳝":"̣","ִ":"̣","ٜ":"̣","़":"̣","়":"̣","਼":"̣","઼":"̣","଼":"̣","𑇊":"̣","𑓃":"̣","𐨺":"̣","࣮":"̤","᳞":"̤","༷":"̥","〭":"̥","̧":"̦","̡":"̦","̹":"̦","᳙":"̭","᳘":"̮","॒":"̱","̠":"̱","ࣱ":"ٌ","ࣨ":"ٌ","ࣥ":"ٌ","ﱞ":"ﹲّ","ࣲ":"ٍ","ﱟ":"ﹴّ","ﳲ":"ﹷّ","ﱠ":"ﹶّ","ﳳ":"ﹹّ","ﱡ":"ﹸّ","ؚ":"ِ","̗":"ِ","ﳴ":"ﹻّ","ﱢ":"ﹺّ","ﱣ":"ﹼٰ","ٟ":"ٕ","̍":"ٰ","݂":"ܼ","ਃ":"ঃ","ః":"ঃ","ಃ":"ঃ","ഃ":"ঃ","ඃ":"ঃ","း":"ঃ","𑓁":"ঃ","់":"่","່":"่","້":"้","໊":"๊","໋":"๋","꙯":"⃩","\\u2028":" ","\\u2029":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" ","ߺ":"_","﹍":"_","﹎":"_","﹏":"_","‐":"-","‑":"-","‒":"-","–":"-","﹘":"-","۔":"-","⁃":"-","˗":"-","−":"-","➖":"-","Ⲻ":"-","⨩":"-̓","⸚":"-̈","﬩":"-̇","∸":"-̇","⨪":"-̣","꓾":"-.","～":"〜","؍":",","٫":",","‚":",","¸":",","ꓹ":",","⸲":"،","٬":"،",";":";","⸵":"؛","ः":":","ઃ":":","：":":","։":":","܃":":","܄":":","᛬":":","︰":":","᠃":":","᠉":":","⁚":":","׃":":","˸":":","꞉":":","∶":":","ː":":","ꓽ":":","⩴":"::=","⧴":":→","！":"!","ǃ":"!","ⵑ":"!","‼":"!!","⁉":"!?","ʔ":"?","Ɂ":"?","ॽ":"?","Ꭾ":"?","ꛫ":"?","⁈":"?!","⁇":"??","⸮":"؟","𝅭":".","․":".","܁":".","܂":".","꘎":".","𐩐":".","٠":".","۰":".","ꓸ":".","ꓻ":".,","‥":"..","ꓺ":"..","…":"...","꛴":"꛳꛳","・":"·","･":"·","᛫":"·","·":"·","⸱":"·","𐄁":"·","•":"·","‧":"·","∙":"·","⋅":"·","ꞏ":"·","ᐧ":"·","⋯":"···","ⵈ":"···","ᑄ":"·<","⋗":"·>","ᐷ":"·>","ᑀ":"·>","ᔯ":"·4","ᑾ":"·b","ᒀ":"·ḃ","ᑺ":"·d","ᒘ":"·J","ᒶ":"·L","ᑶ":"·P","ᑗ":"·U","ᐺ":"·V","ᐼ":"·Ʌ","ᒮ":"·Γ","ᐎ":"·Δ","ᑙ":"·Ո","ᐌ":"·ᐁ","ᐐ":"·ᐄ","ᐒ":"·ᐅ","ᐔ":"·ᐆ","ᐗ":"·ᐊ","ᐙ":"·ᐋ","ᐾ":"·ᐲ","ᑂ":"·ᐴ","ᑆ":"·ᐹ","ᑛ":"·ᑏ","ᑔ":"·ᑐ","ᑝ":"·ᑐ","ᑟ":"·ᑑ","ᑡ":"·ᑕ","ᑣ":"·ᑖ","ᑴ":"·ᑫ","ᑸ":"·ᑮ","ᑼ":"·ᑰ","ᒒ":"·ᒉ","ᒔ":"·ᒋ","ᒖ":"·ᒌ","ᒚ":"·ᒎ","ᒜ":"·ᒐ","ᒞ":"·ᒑ","ᒬ":"·ᒣ","ᒰ":"·ᒦ","ᒲ":"·ᒧ","ᒴ":"·ᒨ","ᒸ":"·ᒫ","ᓉ":"·ᓀ","ᣆ":"·ᓂ","ᣈ":"·ᓃ","ᣊ":"·ᓄ","ᣌ":"·ᓅ","ᓋ":"·ᓇ","ᓍ":"·ᓈ","ᓜ":"·ᓓ","ᓞ":"·ᓕ","ᓠ":"·ᓖ","ᓢ":"·ᓗ","ᓤ":"·ᓘ","ᓦ":"·ᓚ","ᓨ":"·ᓛ","ᓶ":"·ᓭ","ᓸ":"·ᓯ","ᓺ":"·ᓰ","ᓼ":"·ᓱ","ᓾ":"·ᓲ","ᔀ":"·ᓴ","ᔂ":"·ᓵ","ᔗ":"·ᔐ","ᔙ":"·ᔑ","ᔛ":"·ᔒ","ᔝ":"·ᔓ","ᔟ":"·ᔔ","ᔡ":"·ᔕ","ᔣ":"·ᔖ","ᔱ":"·ᔨ","ᔳ":"·ᔩ","ᔵ":"·ᔪ","ᔷ":"·ᔫ","ᔹ":"·ᔭ","ᔻ":"·ᔮ","ᣎ":"·ᕃ","ᣏ":"·ᕆ","ᣐ":"·ᕇ","ᣑ":"·ᕈ","ᣒ":"·ᕉ","ᣓ":"·ᕋ","ᕎ":"·ᕌ","ᕛ":"·ᕚ","ᕨ":"·ᕧ","ᢳ":"·ᢱ","ᢶ":"·ᢴ","ᢹ":"·ᢸ","ᣂ":"·ᣀ","꠰":"।","॥":"।।","᰼":"᰻᰻","။":"၊၊","᪩":"᪨᪨","᪫":"᪪᪨","᭟":"᭞᭞","𐩗":"𐩖𐩖","𑑌":"𑑋𑑋","𑙂":"𑙁𑙁","𑱂":"𑱁𑱁","᱿":"᱾᱾","՝":"\'","＇":"\'","‘":"\'","’":"\'","‛":"\'","′":"\'","‵":"\'","՚":"\'","׳":"\'","`":"\'","`":"\'","｀":"\'","´":"\'","΄":"\'","´":"\'","᾽":"\'","᾿":"\'","῾":"\'","ʹ":"\'","ʹ":"\'","ˈ":"\'","ˊ":"\'","ˋ":"\'","˴":"\'","ʻ":"\'","ʽ":"\'","ʼ":"\'","ʾ":"\'","ꞌ":"\'","י":"\'","ߴ":"\'","ߵ":"\'","ᑊ":"\'","ᛌ":"\'","𖽑":"\'","𖽒":"\'","᳓":"\'\'","\\"":"\'\'","＂":"\'\'","“":"\'\'","”":"\'\'","‟":"\'\'","″":"\'\'","‶":"\'\'","〃":"\'\'","״":"\'\'","˝":"\'\'","ʺ":"\'\'","˶":"\'\'","ˮ":"\'\'","ײ":"\'\'","‴":"\'\'\'","‷":"\'\'\'","⁗":"\'\'\'\'","Ɓ":"\'B","Ɗ":"\'D","ŉ":"\'n","Ƥ":"\'P","Ƭ":"\'T","Ƴ":"\'Y","［":"(","❨":"(","❲":"(","〔":"(","﴾":"(","⸨":"((","㈠":"(ー)","⑵":"(2)","⒇":"(2O)","⑶":"(3)","⑷":"(4)","⑸":"(5)","⑹":"(6)","⑺":"(7)","⑻":"(8)","⑼":"(9)","⒜":"(a)","🄐":"(A)","⒝":"(b)","🄑":"(B)","⒞":"(c)","🄒":"(C)","⒟":"(d)","🄓":"(D)","⒠":"(e)","🄔":"(E)","⒡":"(f)","🄕":"(F)","⒢":"(g)","🄖":"(G)","⒣":"(h)","🄗":"(H)","⒤":"(i)","⒥":"(j)","🄙":"(J)","⒦":"(k)","🄚":"(K)","⑴":"(l)","🄘":"(l)","⒧":"(l)","🄛":"(L)","⑿":"(l2)","⒀":"(l3)","⒁":"(l4)","⒂":"(l5)","⒃":"(l6)","⒄":"(l7)","⒅":"(l8)","⒆":"(l9)","⑾":"(ll)","⑽":"(lO)","🄜":"(M)","⒩":"(n)","🄝":"(N)","⒪":"(o)","🄞":"(O)","⒫":"(p)","🄟":"(P)","⒬":"(q)","🄠":"(Q)","⒭":"(r)","🄡":"(R)","⒨":"(rn)","⒮":"(s)","🄢":"(S)","🄪":"(S)","⒯":"(t)","🄣":"(T)","⒰":"(u)","🄤":"(U)","⒱":"(v)","🄥":"(V)","⒲":"(w)","🄦":"(W)","⒳":"(x)","🄧":"(X)","⒴":"(y)","🄨":"(Y)","⒵":"(z)","🄩":"(Z)","㈀":"(ᄀ)","㈎":"(가)","㈁":"(ᄂ)","㈏":"(나)","㈂":"(ᄃ)","㈐":"(다)","㈃":"(ᄅ)","㈑":"(라)","㈄":"(ᄆ)","㈒":"(마)","㈅":"(ᄇ)","㈓":"(바)","㈆":"(ᄉ)","㈔":"(사)","㈇":"(ᄋ)","㈕":"(아)","㈝":"(오전)","㈞":"(오후)","㈈":"(ᄌ)","㈖":"(자)","㈜":"(주)","㈉":"(ᄎ)","㈗":"(차)","㈊":"(ᄏ)","㈘":"(카)","㈋":"(ᄐ)","㈙":"(타)","㈌":"(ᄑ)","㈚":"(파)","㈍":"(ᄒ)","㈛":"(하)","㈦":"(七)","㈢":"(三)","🉁":"(三)","㈨":"(九)","㈡":"(二)","🉂":"(二)","㈤":"(五)","㈹":"(代)","㈽":"(企)","㉁":"(休)","㈧":"(八)","㈥":"(六)","㈸":"(労)","🉇":"(勝)","㈩":"(十)","㈿":"(協)","㈴":"(名)","㈺":"(呼)","㈣":"(四)","㈯":"(土)","㈻":"(学)","🉃":"(安)","🉅":"(打)","🉈":"(敗)","㈰":"(日)","㈪":"(月)","㈲":"(有)","㈭":"(木)","🉀":"(本)","㈱":"(株)","㈬":"(水)","㈫":"(火)","🉄":"(点)","㈵":"(特)","🉆":"(盗)","㈼":"(監)","㈳":"(社)","㈷":"(祝)","㉀":"(祭)","㉂":"(自)","㉃":"(至)","㈶":"(財)","㈾":"(資)","㈮":"(金)","］":")","❩":")","❳":")","〕":")","﴿":")","⸩":"))","❴":"{","𝄔":"{","❵":"}","〚":"⟦","〛":"⟧","⟨":"❬","〈":"❬","〈":"❬","㇛":"❬","く":"❬","𡿨":"❬","⟩":"❭","〉":"❭","〉":"❭","＾":"︿","⸿":"¶","⁎":"*","٭":"*","∗":"*","𐌟":"*","᜵":"/","⁁":"/","∕":"/","⁄":"/","╱":"/","⟋":"/","⧸":"/","𝈺":"/","㇓":"/","〳":"/","Ⳇ":"/","ノ":"/","丿":"/","⼃":"/","⧶":"/̄","⫽":"//","⫻":"///","＼":"\\\\","﹨":"\\\\","∖":"\\\\","⟍":"\\\\","⧵":"\\\\","⧹":"\\\\","𝈏":"\\\\","𝈻":"\\\\","㇔":"\\\\","丶":"\\\\","⼂":"\\\\","⳹":"\\\\\\\\","⑊":"\\\\\\\\","⟈":"\\\\ᑕ","ꝸ":"&","૰":"॰","𑂻":"॰","𑇇":"॰","⚬":"॰","𑇛":"꣼","៙":"๏","៕":"๚","៚":"๛","༌":"་","༎":"།།","˄":"^","ˆ":"^","꙾":"ˇ","˘":"ˇ","‾":"ˉ","﹉":"ˉ","﹊":"ˉ","﹋":"ˉ","﹌":"ˉ","¯":"ˉ","￣":"ˉ","▔":"ˉ","ъ":"ˉb","ꙑ":"ˉbi","͵":"ˏ","˻":"˪","꜖":"˪","꜔":"˫","。":"˳","⸰":"°","˚":"°","∘":"°","○":"°","◦":"°","⍜":"°̲","⍤":"°̈","℃":"°C","℉":"°F","௵":"௳","༛":"༚༚","༟":"༚༝","࿎":"༝༚","༞":"༝༝","Ⓒ":"©","Ⓡ":"®","Ⓟ":"℗","𝈛":"⅄","⯬":"↞","⯭":"↟","⯮":"↠","⯯":"↡","↵":"↲","⥥":"⇃⇂","⥯":"⇃ᛚ","𝛛":"∂","𝜕":"∂","𝝏":"∂","𝞉":"∂","𝟃":"∂","𞣌":"∂","𞣍":"∂̵","ð":"∂̵","⌀":"∅","𝛁":"∇","𝛻":"∇","𝜵":"∇","𝝯":"∇","𝞩":"∇","𑢨":"∇","⍢":"∇̈","⍫":"∇̴","█":"∎","■":"∎","⨿":"∐","᛭":"+","➕":"+","𐊛":"+","⨣":"+̂","⨢":"+̊","⨤":"+̃","∔":"+̇","⨥":"+̣","⨦":"+̰","⨧":"+₂","➗":"÷","‹":"<","❮":"<","˂":"<","𝈶":"<","ᐸ":"<","ᚲ":"<","⋖":"<·","Ⲵ":"<·","ᑅ":"<·","≪":"<<","⋘":"<<<","᐀":"=","⹀":"=","゠":"=","꓿":"=","≚":"=̆","≙":"=̂","≗":"=̊","≐":"=̇","≑":"=̣̇","⩮":"=⃰","⩵":"==","⩶":"===","≞":"=ͫ","›":">","❯":">","˃":">","𝈷":">","ᐳ":">","𖼿":">","ᑁ":">·","⪥":"><","≫":">>","⨠":">>","⋙":">>>","⁓":"~","˜":"~","῀":"~","∼":"~","⍨":"~̈","⸞":"~̇","⩪":"~̇","⸟":"~̣","𞣈":"∠","⋀":"∧","∯":"∮∮","∰":"∮∮∮","⸫":"∴","⸪":"∵","⸬":"∷","𑇞":"≈","♎":"≏","🝞":"≏","≣":"≡","⨃":"⊍","⨄":"⊎","𝈸":"⊏","𝈹":"⊐","⨅":"⊓","⨆":"⊔","⨂":"⊗","⍟":"⊛","🝱":"⊠","🝕":"⊡","◁":"⊲","▷":"⊳","⍣":"⋆̈","︴":"⌇","◠":"⌒","⨽":"⌙","⌥":"⌤","⧇":"⌻","◎":"⌾","⦾":"⌾","⧅":"⍂","⦰":"⍉","⏃":"⍋","⏂":"⍎","⏁":"⍕","⏆":"⍭","☸":"⎈","︵":"⏜","︶":"⏝","︷":"⏞","︸":"⏟","︹":"⏠","︺":"⏡","▱":"⏥","⏼":"⏻","︱":"│","｜":"│","┃":"│","┏":"┌","┣":"├","▐":"▌","▗":"▖","▝":"▘","☐":"□","￭":"▪","▸":"▶","►":"▶","⳩":"☧","🜊":"☩","🌒":"☽","🌙":"☽","⏾":"☾","🌘":"☾","⧙":"⦚","🜺":"⧟","⨾":"⨟","𐆠":"⳨","♩":"𝅘𝅥","♪":"𝅘𝅥𝅮","⓪":"🄍","↺":"🄎","˙":"ॱ","ൎ":"ॱ","－":"ー","—":"ー","―":"ー","─":"ー","━":"ー","㇐":"ー","ꟷ":"ー","ᅳ":"ー","ㅡ":"ー","一":"ー","⼀":"ー","ᆖ":"ーー","ힹ":"ーᅡ","ힺ":"ーᅥ","ힻ":"ーᅥ丨","ힼ":"ーᅩ","ᆕ":"ーᅮ","ᅴ":"ー丨","ㅢ":"ー丨","ᆗ":"ー丨ᅮ","🄏":"$⃠","₤":"£","〒":"₸","〶":"₸","᭜":"᭐","꧆":"꧐","𑓑":"১","೧":"౧","ၥ":"၁","①":"➀","⑩":"➉","⏨":"₁₀","𝟐":"2","𝟚":"2","𝟤":"2","𝟮":"2","𝟸":"2","🯲":"2","Ꝛ":"2","Ƨ":"2","Ϩ":"2","Ꙅ":"2","ᒿ":"2","ꛯ":"2","ꧏ":"٢","۲":"٢","૨":"२","𑓒":"২","೨":"౨","②":"➁","ƻ":"2̵","🄃":"2,","⒉":"2.","㏵":"22日","㍮":"22点","㏶":"23日","㍯":"23点","㏷":"24日","㍰":"24点","㏸":"25日","㏹":"26日","㏺":"27日","㏻":"28日","㏼":"29日","㏴":"2l日","㍭":"2l点","⒛":"2O.","㏳":"2O日","㍬":"2O点","෩":"෨ා","෯":"෨ී","㏡":"2日","㋁":"2月","㍚":"2点","𝈆":"3","𝟑":"3","𝟛":"3","𝟥":"3","𝟯":"3","𝟹":"3","🯳":"3","Ɜ":"3","Ȝ":"3","Ʒ":"3","Ꝫ":"3","Ⳍ":"3","З":"3","Ӡ":"3","𖼻":"3","𑣊":"3","۳":"٣","𞣉":"٣","૩":"३","③":"➂","Ҙ":"3̦","🄄":"3,","⒊":"3.","㏾":"3l日","㏽":"3O日","㏢":"3日","㋂":"3月","㍛":"3点","𝟒":"4","𝟜":"4","𝟦":"4","𝟰":"4","𝟺":"4","🯴":"4","Ꮞ":"4","𑢯":"4","۴":"٤","૪":"४","④":"➃","🄅":"4,","⒋":"4.","ᔰ":"4·","㏣":"4日","㋃":"4月","㍜":"4点","𝟓":"5","𝟝":"5","𝟧":"5","𝟱":"5","𝟻":"5","🯵":"5","Ƽ":"5","𑢻":"5","⑤":"➄","🄆":"5,","⒌":"5.","㏤":"5日","㋄":"5月","㍝":"5点","𝟔":"6","𝟞":"6","𝟨":"6","𝟲":"6","𝟼":"6","🯶":"6","Ⳓ":"6","б":"6","Ꮾ":"6","𑣕":"6","۶":"٦","𑓖":"৬","⑥":"➅","🄇":"6,","⒍":"6.","㏥":"6日","㋅":"6月","㍞":"6点","𝈒":"7","𝟕":"7","𝟟":"7","𝟩":"7","𝟳":"7","𝟽":"7","🯷":"7","𐓒":"7","𑣆":"7","⑦":"➆","🄈":"7,","⒎":"7.","㏦":"7日","㋆":"7月","㍟":"7点","ଃ":"8","৪":"8","੪":"8","𞣋":"8","𝟖":"8","𝟠":"8","𝟪":"8","𝟴":"8","𝟾":"8","🯸":"8","ȣ":"8","Ȣ":"8","𐌚":"8","૮":"८","⑧":"➇","🄉":"8,","⒏":"8.","㏧":"8日","㋇":"8月","㍠":"8点","੧":"9","୨":"9","৭":"9","൭":"9","𝟗":"9","𝟡":"9","𝟫":"9","𝟵":"9","𝟿":"9","🯹":"9","Ꝯ":"9","Ⳋ":"9","𑣌":"9","𑢬":"9","𑣖":"9","१":"٩","𑣤":"٩","۹":"٩","೯":"౯","⑨":"➈","🄊":"9,","⒐":"9.","㏨":"9日","㋈":"9月","㍡":"9点","⍺":"a","ａ":"a","𝐚":"a","𝑎":"a","𝒂":"a","𝒶":"a","𝓪":"a","𝔞":"a","𝕒":"a","𝖆":"a","𝖺":"a","𝗮":"a","𝘢":"a","𝙖":"a","𝚊":"a","ɑ":"a","α":"a","𝛂":"a","𝛼":"a","𝜶":"a","𝝰":"a","𝞪":"a","а":"a","ⷶ":"ͣ","Ａ":"A","𝐀":"A","𝐴":"A","𝑨":"A","𝒜":"A","𝓐":"A","𝔄":"A","𝔸":"A","𝕬":"A","𝖠":"A","𝗔":"A","𝘈":"A","𝘼":"A","𝙰":"A","Α":"A","𝚨":"A","𝛢":"A","𝜜":"A","𝝖":"A","𝞐":"A","А":"A","Ꭺ":"A","ᗅ":"A","ꓮ":"A","𖽀":"A","𐊠":"A","⍶":"a̲","ǎ":"ă","Ǎ":"Ă","ȧ":"å","Ȧ":"Å","ẚ":"ả","℀":"a/c","℁":"a/s","ꜳ":"aa","Ꜳ":"AA","æ":"ae","ӕ":"ae","Æ":"AE","Ӕ":"AE","ꜵ":"ao","Ꜵ":"AO","🜇":"AR","ꜷ":"au","Ꜷ":"AU","ꜹ":"av","ꜻ":"av","Ꜹ":"AV","Ꜻ":"AV","ꜽ":"ay","Ꜽ":"AY","ꭺ":"ᴀ","∀":"Ɐ","𝈗":"Ɐ","ᗄ":"Ɐ","ꓯ":"Ɐ","𐐟":"Ɒ","𝐛":"b","𝑏":"b","𝒃":"b","𝒷":"b","𝓫":"b","𝔟":"b","𝕓":"b","𝖇":"b","𝖻":"b","𝗯":"b","𝘣":"b","𝙗":"b","𝚋":"b","Ƅ":"b","Ь":"b","Ꮟ":"b","ᑲ":"b","ᖯ":"b","Ｂ":"B","ℬ":"B","𝐁":"B","𝐵":"B","𝑩":"B","𝓑":"B","𝔅":"B","𝔹":"B","𝕭":"B","𝖡":"B","𝗕":"B","𝘉":"B","𝘽":"B","𝙱":"B","Ꞵ":"B","Β":"B","𝚩":"B","𝛣":"B","𝜝":"B","𝝗":"B","𝞑":"B","В":"B","Ᏼ":"B","ᗷ":"B","ꓐ":"B","𐊂":"B","𐊡":"B","𐌁":"B","ɓ":"b̔","ᑳ":"ḃ","ƃ":"b̄","Ƃ":"b̄","Б":"b̄","ƀ":"b̵","ҍ":"b̵","Ҍ":"b̵","ѣ":"b̵","Ѣ":"b̵","ᑿ":"b·","ᒁ":"ḃ·","ᒈ":"b\'","Ы":"bl","в":"ʙ","ᏼ":"ʙ","ｃ":"c","ⅽ":"c","𝐜":"c","𝑐":"c","𝒄":"c","𝒸":"c","𝓬":"c","𝔠":"c","𝕔":"c","𝖈":"c","𝖼":"c","𝗰":"c","𝘤":"c","𝙘":"c","𝚌":"c","ᴄ":"c","ϲ":"c","ⲥ":"c","с":"c","ꮯ":"c","𐐽":"c","ⷭ":"ͨ","🝌":"C","𑣲":"C","𑣩":"C","Ｃ":"C","Ⅽ":"C","ℂ":"C","ℭ":"C","𝐂":"C","𝐶":"C","𝑪":"C","𝒞":"C","𝓒":"C","𝕮":"C","𝖢":"C","𝗖":"C","𝘊":"C","𝘾":"C","𝙲":"C","Ϲ":"C","Ⲥ":"C","С":"C","Ꮯ":"C","ꓚ":"C","𐊢":"C","𐌂":"C","𐐕":"C","𐔜":"C","¢":"c̸","ȼ":"c̸","₡":"C⃫","🅮":"C⃠","ç":"c̦","ҫ":"c̦","Ç":"C̦","Ҫ":"C̦","Ƈ":"C\'","℅":"c/o","℆":"c/u","🅭":"㏄\\t⃝","⋴":"ꞓ","ɛ":"ꞓ","ε":"ꞓ","ϵ":"ꞓ","𝛆":"ꞓ","𝛜":"ꞓ","𝜀":"ꞓ","𝜖":"ꞓ","𝜺":"ꞓ","𝝐":"ꞓ","𝝴":"ꞓ","𝞊":"ꞓ","𝞮":"ꞓ","𝟄":"ꞓ","ⲉ":"ꞓ","є":"ꞓ","ԑ":"ꞓ","ꮛ":"ꞓ","𑣎":"ꞓ","𐐩":"ꞓ","€":"Ꞓ","Ⲉ":"Ꞓ","Є":"Ꞓ","⍷":"ꞓ̲","ͽ":"ꜿ","Ͽ":"Ꜿ","ⅾ":"d","ⅆ":"d","𝐝":"d","𝑑":"d","𝒅":"d","𝒹":"d","𝓭":"d","𝔡":"d","𝕕":"d","𝖉":"d","𝖽":"d","𝗱":"d","𝘥":"d","𝙙":"d","𝚍":"d","ԁ":"d","Ꮷ":"d","ᑯ":"d","ꓒ":"d","Ⅾ":"D","ⅅ":"D","𝐃":"D","𝐷":"D","𝑫":"D","𝒟":"D","𝓓":"D","𝔇":"D","𝔻":"D","𝕯":"D","𝖣":"D","𝗗":"D","𝘋":"D","𝘿":"D","𝙳":"D","Ꭰ":"D","ᗞ":"D","ᗪ":"D","ꓓ":"D","ɗ":"d̔","ɖ":"d̨","ƌ":"d̄","đ":"d̵","Đ":"D̵","Ð":"D̵","Ɖ":"D̵","₫":"ḏ̵","ꝺ":"Ꝺ","ᑻ":"d·","ᒇ":"d\'","ʤ":"dȝ","ǳ":"dz","ʣ":"dz","ǲ":"Dz","Ǳ":"DZ","ǆ":"dž","ǅ":"Dž","Ǆ":"DŽ","ʥ":"dʑ","ꭰ":"ᴅ","⸹":"ẟ","δ":"ẟ","𝛅":"ẟ","𝛿":"ẟ","𝜹":"ẟ","𝝳":"ẟ","𝞭":"ẟ","ծ":"ẟ","ᕷ":"ẟ","℮":"e","ｅ":"e","ℯ":"e","ⅇ":"e","𝐞":"e","𝑒":"e","𝒆":"e","𝓮":"e","𝔢":"e","𝕖":"e","𝖊":"e","𝖾":"e","𝗲":"e","𝘦":"e","𝙚":"e","𝚎":"e","ꬲ":"e","е":"e","ҽ":"e","ⷷ":"ͤ","⋿":"E","Ｅ":"E","ℰ":"E","𝐄":"E","𝐸":"E","𝑬":"E","𝓔":"E","𝔈":"E","𝔼":"E","𝕰":"E","𝖤":"E","𝗘":"E","𝘌":"E","𝙀":"E","𝙴":"E","Ε":"E","𝚬":"E","𝛦":"E","𝜠":"E","𝝚":"E","𝞔":"E","Е":"E","ⴹ":"E","Ꭼ":"E","ꓰ":"E","𑢦":"E","𑢮":"E","𐊆":"E","ě":"ĕ","Ě":"Ĕ","ɇ":"e̸","Ɇ":"E̸","ҿ":"ę","ꭼ":"ᴇ","ə":"ǝ","ә":"ǝ","∃":"Ǝ","ⴺ":"Ǝ","ꓱ":"Ǝ","ɚ":"ǝ˞","ᴔ":"ǝo","ꭁ":"ǝo̸","ꭂ":"ǝo̵","Ә":"Ə","𝈡":"Ɛ","ℇ":"Ɛ","Ԑ":"Ɛ","Ꮛ":"Ɛ","𖼭":"Ɛ","𐐁":"Ɛ","ᶟ":"ᵋ","ᴈ":"ɜ","з":"ɜ","ҙ":"ɜ̦","𐑂":"ɞ","ꞝ":"ʚ","𐐪":"ʚ","𝐟":"f","𝑓":"f","𝒇":"f","𝒻":"f","𝓯":"f","𝔣":"f","𝕗":"f","𝖋":"f","𝖿":"f","𝗳":"f","𝘧":"f","𝙛":"f","𝚏":"f","ꬵ":"f","ꞙ":"f","ſ":"f","ẝ":"f","ք":"f","𝈓":"F","ℱ":"F","𝐅":"F","𝐹":"F","𝑭":"F","𝓕":"F","𝔉":"F","𝔽":"F","𝕱":"F","𝖥":"F","𝗙":"F","𝘍":"F","𝙁":"F","𝙵":"F","Ꞙ":"F","Ϝ":"F","𝟊":"F","ᖴ":"F","ꓝ":"F","𑣂":"F","𑢢":"F","𐊇":"F","𐊥":"F","𐔥":"F","ƒ":"f̦","Ƒ":"F̦","ᵮ":"f̴","℻":"FAX","ﬀ":"ff","ﬃ":"ffi","ﬄ":"ffl","ﬁ":"fi","ﬂ":"fl","ʩ":"fŋ","ᖵ":"Ⅎ","ꓞ":"Ⅎ","𝈰":"ꟻ","ᖷ":"ꟻ","ｇ":"g","ℊ":"g","𝐠":"g","𝑔":"g","𝒈":"g","𝓰":"g","𝔤":"g","𝕘":"g","𝖌":"g","𝗀":"g","𝗴":"g","𝘨":"g","𝙜":"g","𝚐":"g","ɡ":"g","ᶃ":"g","ƍ":"g","ց":"g","𝐆":"G","𝐺":"G","𝑮":"G","𝒢":"G","𝓖":"G","𝔊":"G","𝔾":"G","𝕲":"G","𝖦":"G","𝗚":"G","𝘎":"G","𝙂":"G","𝙶":"G","Ԍ":"G","Ꮐ":"G","Ᏻ":"G","ꓖ":"G","ᶢ":"ᵍ","ɠ":"g̔","ǧ":"ğ","Ǧ":"Ğ","ǵ":"ģ","ǥ":"g̵","Ǥ":"G̵","Ɠ":"G\'","ԍ":"ɢ","ꮐ":"ɢ","ᏻ":"ɢ","ｈ":"h","ℎ":"h","𝐡":"h","𝒉":"h","𝒽":"h","𝓱":"h","𝔥":"h","𝕙":"h","𝖍":"h","𝗁":"h","𝗵":"h","𝘩":"h","𝙝":"h","𝚑":"h","һ":"h","հ":"h","Ꮒ":"h","Ｈ":"H","ℋ":"H","ℌ":"H","ℍ":"H","𝐇":"H","𝐻":"H","𝑯":"H","𝓗":"H","𝕳":"H","𝖧":"H","𝗛":"H","𝘏":"H","𝙃":"H","𝙷":"H","Η":"H","𝚮":"H","𝛨":"H","𝜢":"H","𝝜":"H","𝞖":"H","Ⲏ":"H","Н":"H","Ꮋ":"H","ᕼ":"H","ꓧ":"H","𐋏":"H","ᵸ":"ᴴ","ɦ":"h̔","ꚕ":"h̔","Ᏺ":"h̔","Ⱨ":"H̩","Ң":"H̩","ħ":"h̵","ℏ":"h̵","ћ":"h̵","Ħ":"H̵","Ӊ":"H̦","Ӈ":"H̦","н":"ʜ","ꮋ":"ʜ","ң":"ʜ̩","ӊ":"ʜ̦","ӈ":"ʜ̦","Ԋ":"Ƕ","ꮀ":"ⱶ","Ͱ":"Ⱶ","Ꭸ":"Ⱶ","Ꮀ":"Ⱶ","ꚱ":"Ⱶ","ꞕ":"ꜧ","˛":"i","⍳":"i","ｉ":"i","ⅰ":"i","ℹ":"i","ⅈ":"i","𝐢":"i","𝑖":"i","𝒊":"i","𝒾":"i","𝓲":"i","𝔦":"i","𝕚":"i","𝖎":"i","𝗂":"i","𝗶":"i","𝘪":"i","𝙞":"i","𝚒":"i","ı":"i","𝚤":"i","ɪ":"i","ɩ":"i","ι":"i","ι":"i","ͺ":"i","𝛊":"i","𝜄":"i","𝜾":"i","𝝸":"i","𝞲":"i","і":"i","ꙇ":"i","ӏ":"i","ꭵ":"i","Ꭵ":"i","𑣃":"i","ⓛ":"Ⓘ","⍸":"i̲","ǐ":"ĭ","Ǐ":"Ĭ","ɨ":"i̵","ᵻ":"i̵","ᵼ":"i̵","ⅱ":"ii","ⅲ":"iii","ĳ":"ij","ⅳ":"iv","ⅸ":"ix","ｊ":"j","ⅉ":"j","𝐣":"j","𝑗":"j","𝒋":"j","𝒿":"j","𝓳":"j","𝔧":"j","𝕛":"j","𝖏":"j","𝗃":"j","𝗷":"j","𝘫":"j","𝙟":"j","𝚓":"j","ϳ":"j","ј":"j","Ｊ":"J","𝐉":"J","𝐽":"J","𝑱":"J","𝒥":"J","𝓙":"J","𝔍":"J","𝕁":"J","𝕵":"J","𝖩":"J","𝗝":"J","𝘑":"J","𝙅":"J","𝙹":"J","Ʝ":"J","Ϳ":"J","Ј":"J","Ꭻ":"J","ᒍ":"J","ꓙ":"J","ɉ":"j̵","Ɉ":"J̵","ᒙ":"J·","𝚥":"ȷ","յ":"ȷ","ꭻ":"ᴊ","𝐤":"k","𝑘":"k","𝒌":"k","𝓀":"k","𝓴":"k","𝔨":"k","𝕜":"k","𝖐":"k","𝗄":"k","𝗸":"k","𝘬":"k","𝙠":"k","𝚔":"k","K":"K","Ｋ":"K","𝐊":"K","𝐾":"K","𝑲":"K","𝒦":"K","𝓚":"K","𝔎":"K","𝕂":"K","𝕶":"K","𝖪":"K","𝗞":"K","𝘒":"K","𝙆":"K","𝙺":"K","Κ":"K","𝚱":"K","𝛫":"K","𝜥":"K","𝝟":"K","𝞙":"K","Ⲕ":"K","К":"K","Ꮶ":"K","ᛕ":"K","ꓗ":"K","𐔘":"K","ƙ":"k̔","Ⱪ":"K̩","Қ":"K̩","₭":"K̵","Ꝁ":"K̵","Ҟ":"K̵","Ƙ":"K\'","׀":"l","|":"l","∣":"l","⏽":"l","￨":"l","١":"l","۱":"l","𐌠":"l","𞣇":"l","𝟏":"l","𝟙":"l","𝟣":"l","𝟭":"l","𝟷":"l","🯱":"l","I":"l","Ｉ":"l","Ⅰ":"l","ℐ":"l","ℑ":"l","𝐈":"l","𝐼":"l","𝑰":"l","𝓘":"l","𝕀":"l","𝕴":"l","𝖨":"l","𝗜":"l","𝘐":"l","𝙄":"l","𝙸":"l","Ɩ":"l","ｌ":"l","ⅼ":"l","ℓ":"l","𝐥":"l","𝑙":"l","𝒍":"l","𝓁":"l","𝓵":"l","𝔩":"l","𝕝":"l","𝖑":"l","𝗅":"l","𝗹":"l","𝘭":"l","𝙡":"l","𝚕":"l","ǀ":"l","Ι":"l","𝚰":"l","𝛪":"l","𝜤":"l","𝝞":"l","𝞘":"l","Ⲓ":"l","І":"l","Ӏ":"l","ו":"l","ן":"l","ا":"l","𞸀":"l","𞺀":"l","ﺎ":"l","ﺍ":"l","ߊ":"l","ⵏ":"l","ᛁ":"l","ꓲ":"l","𖼨":"l","𐊊":"l","𐌉":"l","𝈪":"L","Ⅼ":"L","ℒ":"L","𝐋":"L","𝐿":"L","𝑳":"L","𝓛":"L","𝔏":"L","𝕃":"L","𝕷":"L","𝖫":"L","𝗟":"L","𝘓":"L","𝙇":"L","𝙻":"L","Ⳑ":"L","Ꮮ":"L","ᒪ":"L","ꓡ":"L","𖼖":"L","𑢣":"L","𑢲":"L","𐐛":"L","𐔦":"L","ﴼ":"l̋","ﴽ":"l̋","ł":"l̸","Ł":"L̸","ɭ":"l̨","Ɨ":"l̵","ƚ":"l̵","ɫ":"l̴","إ":"lٕ","ﺈ":"lٕ","ﺇ":"lٕ","ٳ":"lٕ","ŀ":"l·","Ŀ":"l·","ᒷ":"l·","🄂":"l,","⒈":"l.","ױ":"l\'","⒓":"l2.","㏫":"l2日","㋋":"l2月","㍤":"l2点","⒔":"l3.","㏬":"l3日","㍥":"l3点","⒕":"l4.","㏭":"l4日","㍦":"l4点","⒖":"l5.","㏮":"l5日","㍧":"l5点","⒗":"l6.","㏯":"l6日","㍨":"l6点","⒘":"l7.","㏰":"l7日","㍩":"l7点","⒙":"l8.","㏱":"l8日","㍪":"l8点","⒚":"l9.","㏲":"l9日","㍫":"l9点","ǉ":"lj","Ĳ":"lJ","ǈ":"Lj","Ǉ":"LJ","‖":"ll","∥":"ll","Ⅱ":"ll","ǁ":"ll","װ":"ll","𐆙":"l̵l̵","⒒":"ll.","Ⅲ":"lll","𐆘":"l̵l̵S̵","㏪":"ll日","㋊":"ll月","㍣":"ll点","Ю":"lO","⒑":"lO.","㏩":"lO日","㋉":"lO月","㍢":"lO点","ʪ":"ls","₶":"lt","Ⅳ":"lV","Ⅸ":"lX","ɮ":"lȝ","ʫ":"lz","أ":"lٴ","ﺄ":"lٴ","ﺃ":"lٴ","ٲ":"lٴ","ٵ":"lٴ","ﷳ":"lكبر","ﷲ":"lللّٰo","㏠":"l日","㋀":"l月","㍙":"l点","ⳑ":"ʟ","ꮮ":"ʟ","𐑃":"ʟ","Ｍ":"M","Ⅿ":"M","ℳ":"M","𝐌":"M","𝑀":"M","𝑴":"M","𝓜":"M","𝔐":"M","𝕄":"M","𝕸":"M","𝖬":"M","𝗠":"M","𝘔":"M","𝙈":"M","𝙼":"M","Μ":"M","𝚳":"M","𝛭":"M","𝜧":"M","𝝡":"M","𝞛":"M","Ϻ":"M","Ⲙ":"M","М":"M","Ꮇ":"M","ᗰ":"M","ᛖ":"M","ꓟ":"M","𐊰":"M","𐌑":"M","Ӎ":"M̦","🝫":"MB","ⷨ":"ᷟ","𝐧":"n","𝑛":"n","𝒏":"n","𝓃":"n","𝓷":"n","𝔫":"n","𝕟":"n","𝖓":"n","𝗇":"n","𝗻":"n","𝘯":"n","𝙣":"n","𝚗":"n","ո":"n","ռ":"n","Ｎ":"N","ℕ":"N","𝐍":"N","𝑁":"N","𝑵":"N","𝒩":"N","𝓝":"N","𝔑":"N","𝕹":"N","𝖭":"N","𝗡":"N","𝘕":"N","𝙉":"N","𝙽":"N","Ν":"N","𝚴":"N","𝛮":"N","𝜨":"N","𝝢":"N","𝞜":"N","Ⲛ":"N","ꓠ":"N","𐔓":"N","𐆎":"N̊","ɳ":"n̨","ƞ":"n̩","η":"n̩","𝛈":"n̩","𝜂":"n̩","𝜼":"n̩","𝝶":"n̩","𝞰":"n̩","Ɲ":"N̦","ᵰ":"n̴","ǌ":"nj","ǋ":"Nj","Ǌ":"NJ","№":"No","ͷ":"ᴎ","и":"ᴎ","𐑍":"ᴎ","ņ":"ɲ","ం":"o","ಂ":"o","ം":"o","ං":"o","०":"o","੦":"o","૦":"o","௦":"o","౦":"o","೦":"o","൦":"o","๐":"o","໐":"o","၀":"o","٥":"o","۵":"o","ｏ":"o","ℴ":"o","𝐨":"o","𝑜":"o","𝒐":"o","𝓸":"o","𝔬":"o","𝕠":"o","𝖔":"o","𝗈":"o","𝗼":"o","𝘰":"o","𝙤":"o","𝚘":"o","ᴏ":"o","ᴑ":"o","ꬽ":"o","ο":"o","𝛐":"o","𝜊":"o","𝝄":"o","𝝾":"o","𝞸":"o","σ":"o","𝛔":"o","𝜎":"o","𝝈":"o","𝞂":"o","𝞼":"o","ⲟ":"o","о":"o","ჿ":"o","օ":"o","ס":"o","ه":"o","𞸤":"o","𞹤":"o","𞺄":"o","ﻫ":"o","ﻬ":"o","ﻪ":"o","ﻩ":"o","ھ":"o","ﮬ":"o","ﮭ":"o","ﮫ":"o","ﮪ":"o","ہ":"o","ﮨ":"o","ﮩ":"o","ﮧ":"o","ﮦ":"o","ە":"o","ഠ":"o","ဝ":"o","𐓪":"o","𑣈":"o","𑣗":"o","𐐬":"o","߀":"O","০":"O","୦":"O","〇":"O","𑓐":"O","𑣠":"O","𝟎":"O","𝟘":"O","𝟢":"O","𝟬":"O","𝟶":"O","🯰":"O","Ｏ":"O","𝐎":"O","𝑂":"O","𝑶":"O","𝒪":"O","𝓞":"O","𝔒":"O","𝕆":"O","𝕺":"O","𝖮":"O","𝗢":"O","𝘖":"O","𝙊":"O","𝙾":"O","Ο":"O","𝚶":"O","𝛰":"O","𝜪":"O","𝝤":"O","𝞞":"O","Ⲟ":"O","О":"O","Օ":"O","ⵔ":"O","ዐ":"O","ଠ":"O","𐓂":"O","ꓳ":"O","𑢵":"O","𐊒":"O","𐊫":"O","𐐄":"O","𐔖":"O","⁰":"º","ᵒ":"º","ǒ":"ŏ","Ǒ":"Ŏ","ۿ":"ô","Ő":"Ö","ø":"o̸","ꬾ":"o̸","Ø":"O̸","ⵁ":"O̸","Ǿ":"Ó̸","ɵ":"o̵","ꝋ":"o̵","ө":"o̵","ѳ":"o̵","ꮎ":"o̵","ꮻ":"o̵","⊖":"O̵","⊝":"O̵","⍬":"O̵","𝈚":"O̵","🜔":"O̵","Ɵ":"O̵","Ꝋ":"O̵","θ":"O̵","ϑ":"O̵","𝛉":"O̵","𝛝":"O̵","𝜃":"O̵","𝜗":"O̵","𝜽":"O̵","𝝑":"O̵","𝝷":"O̵","𝞋":"O̵","𝞱":"O̵","𝟅":"O̵","Θ":"O̵","ϴ":"O̵","𝚯":"O̵","𝚹":"O̵","𝛩":"O̵","𝛳":"O̵","𝜣":"O̵","𝜭":"O̵","𝝝":"O̵","𝝧":"O̵","𝞗":"O̵","𝞡":"O̵","Ө":"O̵","Ѳ":"O̵","ⴱ":"O̵","Ꮎ":"O̵","Ꮻ":"O̵","ꭴ":"ơ","ﳙ":"oٰ","🄁":"O,","🄀":"O.","ơ":"o\'","Ơ":"O\'","Ꭴ":"O\'","%":"º/₀","٪":"º/₀","⁒":"º/₀","‰":"º/₀₀","؉":"º/₀₀","‱":"º/₀₀₀","؊":"º/₀₀₀","œ":"oe","Œ":"OE","ɶ":"oᴇ","∞":"oo","ꝏ":"oo","ꚙ":"oo","Ꝏ":"OO","Ꚙ":"OO","ﳗ":"oج","ﱑ":"oج","ﳘ":"oم","ﱒ":"oم","ﶓ":"oمج","ﶔ":"oمم","ﱓ":"oى","ﱔ":"oى","ൟ":"oരo","တ":"oာ","㍘":"O点","ↄ":"ɔ","ᴐ":"ɔ","ͻ":"ɔ","𐑋":"ɔ","Ↄ":"Ɔ","Ͻ":"Ɔ","ꓛ":"Ɔ","𐐣":"Ɔ","ꬿ":"ɔ̸","ꭢ":"ɔe","𐐿":"ɷ","⍴":"p","ｐ":"p","𝐩":"p","𝑝":"p","𝒑":"p","𝓅":"p","𝓹":"p","𝔭":"p","𝕡":"p","𝖕":"p","𝗉":"p","𝗽":"p","𝘱":"p","𝙥":"p","𝚙":"p","ρ":"p","ϱ":"p","𝛒":"p","𝛠":"p","𝜌":"p","𝜚":"p","𝝆":"p","𝝔":"p","𝞀":"p","𝞎":"p","𝞺":"p","𝟈":"p","ⲣ":"p","р":"p","Ｐ":"P","ℙ":"P","𝐏":"P","𝑃":"P","𝑷":"P","𝒫":"P","𝓟":"P","𝔓":"P","𝕻":"P","𝖯":"P","𝗣":"P","𝘗":"P","𝙋":"P","𝙿":"P","Ρ":"P","𝚸":"P","𝛲":"P","𝜬":"P","𝝦":"P","𝞠":"P","Ⲣ":"P","Р":"P","Ꮲ":"P","ᑭ":"P","ꓑ":"P","𐊕":"P","ƥ":"p̔","ᵽ":"p̵","ᑷ":"p·","ᒆ":"P\'","ᴩ":"ᴘ","ꮲ":"ᴘ","φ":"ɸ","ϕ":"ɸ","𝛗":"ɸ","𝛟":"ɸ","𝜑":"ɸ","𝜙":"ɸ","𝝋":"ɸ","𝝓":"ɸ","𝞅":"ɸ","𝞍":"ɸ","𝞿":"ɸ","𝟇":"ɸ","ⲫ":"ɸ","ф":"ɸ","𝐪":"q","𝑞":"q","𝒒":"q","𝓆":"q","𝓺":"q","𝔮":"q","𝕢":"q","𝖖":"q","𝗊":"q","𝗾":"q","𝘲":"q","𝙦":"q","𝚚":"q","ԛ":"q","գ":"q","զ":"q","ℚ":"Q","𝐐":"Q","𝑄":"Q","𝑸":"Q","𝒬":"Q","𝓠":"Q","𝔔":"Q","𝕼":"Q","𝖰":"Q","𝗤":"Q","𝘘":"Q","𝙌":"Q","𝚀":"Q","ⵕ":"Q","ʠ":"q̔","🜀":"QE","ᶐ":"ɋ","ᴋ":"ĸ","κ":"ĸ","ϰ":"ĸ","𝛋":"ĸ","𝛞":"ĸ","𝜅":"ĸ","𝜘":"ĸ","𝜿":"ĸ","𝝒":"ĸ","𝝹":"ĸ","𝞌":"ĸ","𝞳":"ĸ","𝟆":"ĸ","ⲕ":"ĸ","к":"ĸ","ꮶ":"ĸ","қ":"ĸ̩","ҟ":"ĸ̵","𝐫":"r","𝑟":"r","𝒓":"r","𝓇":"r","𝓻":"r","𝔯":"r","𝕣":"r","𝖗":"r","𝗋":"r","𝗿":"r","𝘳":"r","𝙧":"r","𝚛":"r","ꭇ":"r","ꭈ":"r","ᴦ":"r","ⲅ":"r","г":"r","ꮁ":"r","𝈖":"R","ℛ":"R","ℜ":"R","ℝ":"R","𝐑":"R","𝑅":"R","𝑹":"R","𝓡":"R","𝕽":"R","𝖱":"R","𝗥":"R","𝘙":"R","𝙍":"R","𝚁":"R","Ʀ":"R","Ꭱ":"R","Ꮢ":"R","𐒴":"R","ᖇ":"R","ꓣ":"R","𖼵":"R","ɽ":"r̨","ɼ":"r̩","ɍ":"r̵","ғ":"r̵","ᵲ":"r̴","ґ":"r\'","𑣣":"rn","m":"rn","ⅿ":"rn","𝐦":"rn","𝑚":"rn","𝒎":"rn","𝓂":"rn","𝓶":"rn","𝔪":"rn","𝕞":"rn","𝖒":"rn","𝗆":"rn","𝗺":"rn","𝘮":"rn","𝙢":"rn","𝚖":"rn","𑜀":"rn","₥":"rn̸","ɱ":"rn̦","ᵯ":"rn̴","₨":"Rs","ꭱ":"ʀ","ꮢ":"ʀ","я":"ᴙ","ᵳ":"ɾ̴","℩":"ɿ","ｓ":"s","𝐬":"s","𝑠":"s","𝒔":"s","𝓈":"s","𝓼":"s","𝔰":"s","𝕤":"s","𝖘":"s","𝗌":"s","𝘀":"s","𝘴":"s","𝙨":"s","𝚜":"s","ꜱ":"s","ƽ":"s","ѕ":"s","ꮪ":"s","𑣁":"s","𐑈":"s","Ｓ":"S","𝐒":"S","𝑆":"S","𝑺":"S","𝒮":"S","𝓢":"S","𝔖":"S","𝕊":"S","𝕾":"S","𝖲":"S","𝗦":"S","𝘚":"S","𝙎":"S","𝚂":"S","Ѕ":"S","Տ":"S","Ꮥ":"S","Ꮪ":"S","ꓢ":"S","𖼺":"S","𐊖":"S","𐐠":"S","ʂ":"s̨","ᵴ":"s̴","ꞵ":"ß","β":"ß","ϐ":"ß","𝛃":"ß","𝛽":"ß","𝜷":"ß","𝝱":"ß","𝞫":"ß","Ᏸ":"ß","🝜":"sss","ﬆ":"st","∫":"ʃ","ꭍ":"ʃ","∑":"Ʃ","⅀":"Ʃ","Σ":"Ʃ","𝚺":"Ʃ","𝛴":"Ʃ","𝜮":"Ʃ","𝝨":"Ʃ","𝞢":"Ʃ","ⵉ":"Ʃ","∬":"ʃʃ","∭":"ʃʃʃ","⨌":"ʃʃʃʃ","𝐭":"t","𝑡":"t","𝒕":"t","𝓉":"t","𝓽":"t","𝔱":"t","𝕥":"t","𝖙":"t","𝗍":"t","𝘁":"t","𝘵":"t","𝙩":"t","𝚝":"t","⊤":"T","⟙":"T","🝨":"T","Ｔ":"T","𝐓":"T","𝑇":"T","𝑻":"T","𝒯":"T","𝓣":"T","𝔗":"T","𝕋":"T","𝕿":"T","𝖳":"T","𝗧":"T","𝘛":"T","𝙏":"T","𝚃":"T","Τ":"T","𝚻":"T","𝛵":"T","𝜯":"T","𝝩":"T","𝞣":"T","Ⲧ":"T","Т":"T","Ꭲ":"T","ꓔ":"T","𖼊":"T","𑢼":"T","𐊗":"T","𐊱":"T","𐌕":"T","ƭ":"t̔","⍡":"T̈","Ⱦ":"T̸","Ț":"Ţ","Ʈ":"T̨","Ҭ":"T̩","₮":"T⃫","ŧ":"t̵","Ŧ":"T̵","ᵵ":"t̴","Ⴀ":"Ꞇ","Ꜩ":"T3","ʨ":"tɕ","℡":"TEL","ꝷ":"tf","ʦ":"ts","ʧ":"tʃ","ꜩ":"tȝ","τ":"ᴛ","𝛕":"ᴛ","𝜏":"ᴛ","𝝉":"ᴛ","𝞃":"ᴛ","𝞽":"ᴛ","т":"ᴛ","ꭲ":"ᴛ","ҭ":"ᴛ̩","ţ":"ƫ","ț":"ƫ","Ꮏ":"ƫ","𝐮":"u","𝑢":"u","𝒖":"u","𝓊":"u","𝓾":"u","𝔲":"u","𝕦":"u","𝖚":"u","𝗎":"u","𝘂":"u","𝘶":"u","𝙪":"u","𝚞":"u","ꞟ":"u","ᴜ":"u","ꭎ":"u","ꭒ":"u","ʋ":"u","υ":"u","𝛖":"u","𝜐":"u","𝝊":"u","𝞄":"u","𝞾":"u","ս":"u","𐓶":"u","𑣘":"u","∪":"U","⋃":"U","𝐔":"U","𝑈":"U","𝑼":"U","𝒰":"U","𝓤":"U","𝔘":"U","𝕌":"U","𝖀":"U","𝖴":"U","𝗨":"U","𝘜":"U","𝙐":"U","𝚄":"U","Ս":"U","ሀ":"U","𐓎":"U","ᑌ":"U","ꓴ":"U","𖽂":"U","𑢸":"U","ǔ":"ŭ","Ǔ":"Ŭ","ᵾ":"u̵","ꮜ":"u̵","Ʉ":"U̵","Ꮜ":"U̵","ᑘ":"U·","ᑧ":"U\'","ᵫ":"ue","ꭣ":"uo","ṃ":"ꭑ","պ":"ɰ","ሣ":"ɰ","℧":"Ʊ","ᘮ":"Ʊ","ᘴ":"Ʊ","ᵿ":"ʊ̵","∨":"v","⋁":"v","ｖ":"v","ⅴ":"v","𝐯":"v","𝑣":"v","𝒗":"v","𝓋":"v","𝓿":"v","𝔳":"v","𝕧":"v","𝖛":"v","𝗏":"v","𝘃":"v","𝘷":"v","𝙫":"v","𝚟":"v","ᴠ":"v","ν":"v","𝛎":"v","𝜈":"v","𝝂":"v","𝝼":"v","𝞶":"v","ѵ":"v","ט":"v","𑜆":"v","ꮩ":"v","𑣀":"v","𝈍":"V","٧":"V","۷":"V","Ⅴ":"V","𝐕":"V","𝑉":"V","𝑽":"V","𝒱":"V","𝓥":"V","𝔙":"V","𝕍":"V","𝖁":"V","𝖵":"V","𝗩":"V","𝘝":"V","𝙑":"V","𝚅":"V","Ѵ":"V","ⴸ":"V","Ꮩ":"V","ᐯ":"V","ꛟ":"V","ꓦ":"V","𖼈":"V","𑢠":"V","𐔝":"V","𐆗":"V̵","ᐻ":"V·","🝬":"VB","ⅵ":"vi","ⅶ":"vii","ⅷ":"viii","Ⅵ":"Vl","Ⅶ":"Vll","Ⅷ":"Vlll","🜈":"Vᷤ","ᴧ":"ʌ","𐓘":"ʌ","٨":"Ʌ","۸":"Ʌ","Λ":"Ʌ","𝚲":"Ʌ","𝛬":"Ʌ","𝜦":"Ʌ","𝝠":"Ʌ","𝞚":"Ʌ","Л":"Ʌ","ⴷ":"Ʌ","𐒰":"Ʌ","ᐱ":"Ʌ","ꛎ":"Ʌ","ꓥ":"Ʌ","𖼽":"Ʌ","𐊍":"Ʌ","Ӆ":"Ʌ̦","ᐽ":"Ʌ·","ɯ":"w","𝐰":"w","𝑤":"w","𝒘":"w","𝓌":"w","𝔀":"w","𝔴":"w","𝕨":"w","𝖜":"w","𝗐":"w","𝘄":"w","𝘸":"w","𝙬":"w","𝚠":"w","ᴡ":"w","ѡ":"w","ԝ":"w","ա":"w","𑜊":"w","𑜎":"w","𑜏":"w","ꮃ":"w","𑣯":"W","𑣦":"W","𝐖":"W","𝑊":"W","𝑾":"W","𝒲":"W","𝓦":"W","𝔚":"W","𝕎":"W","𝖂":"W","𝖶":"W","𝗪":"W","𝘞":"W","𝙒":"W","𝚆":"W","Ԝ":"W","Ꮃ":"W","Ꮤ":"W","ꓪ":"W","ѽ":"w҆҇","𑓅":"ẇ","₩":"W̵","ꝡ":"w̦","ᴍ":"ʍ","м":"ʍ","ꮇ":"ʍ","ӎ":"ʍ̦","᙮":"x","×":"x","⤫":"x","⤬":"x","⨯":"x","ｘ":"x","ⅹ":"x","𝐱":"x","𝑥":"x","𝒙":"x","𝓍":"x","𝔁":"x","𝔵":"x","𝕩":"x","𝖝":"x","𝗑":"x","𝘅":"x","𝘹":"x","𝙭":"x","𝚡":"x","х":"x","ᕁ":"x","ᕽ":"x","ⷯ":"ͯ","᙭":"X","╳":"X","𐌢":"X","𑣬":"X","Ｘ":"X","Ⅹ":"X","𝐗":"X","𝑋":"X","𝑿":"X","𝒳":"X","𝓧":"X","𝔛":"X","𝕏":"X","𝖃":"X","𝖷":"X","𝗫":"X","𝘟":"X","𝙓":"X","𝚇":"X","Ꭓ":"X","Χ":"X","𝚾":"X","𝛸":"X","𝜲":"X","𝝬":"X","𝞦":"X","Ⲭ":"X","Х":"X","ⵝ":"X","ᚷ":"X","ꓫ":"X","𐊐":"X","𐊴":"X","𐌗":"X","𐔧":"X","⨰":"ẋ","Ҳ":"X̩","𐆖":"X̵","ⅺ":"xi","ⅻ":"xii","Ⅺ":"Xl","Ⅻ":"Xll","ɣ":"y","ᶌ":"y","ｙ":"y","𝐲":"y","𝑦":"y","𝒚":"y","𝓎":"y","𝔂":"y","𝔶":"y","𝕪":"y","𝖞":"y","𝗒":"y","𝘆":"y","𝘺":"y","𝙮":"y","𝚢":"y","ʏ":"y","ỿ":"y","ꭚ":"y","γ":"y","ℽ":"y","𝛄":"y","𝛾":"y","𝜸":"y","𝝲":"y","𝞬":"y","у":"y","ү":"y","ყ":"y","𑣜":"y","Ｙ":"Y","𝐘":"Y","𝑌":"Y","𝒀":"Y","𝒴":"Y","𝓨":"Y","𝔜":"Y","𝕐":"Y","𝖄":"Y","𝖸":"Y","𝗬":"Y","𝘠":"Y","𝙔":"Y","𝚈":"Y","Υ":"Y","ϒ":"Y","𝚼":"Y","𝛶":"Y","𝜰":"Y","𝝪":"Y","𝞤":"Y","Ⲩ":"Y","У":"Y","Ү":"Y","Ꭹ":"Y","Ꮍ":"Y","ꓬ":"Y","𖽃":"Y","𑢤":"Y","𐊲":"Y","ƴ":"y̔","ɏ":"y̵","ұ":"y̵","¥":"Y̵","Ɏ":"Y̵","Ұ":"Y̵","ʒ":"ȝ","ꝫ":"ȝ","ⳍ":"ȝ","ӡ":"ȝ","ჳ":"ȝ","𝐳":"z","𝑧":"z","𝒛":"z","𝓏":"z","𝔃":"z","𝔷":"z","𝕫":"z","𝖟":"z","𝗓":"z","𝘇":"z","𝘻":"z","𝙯":"z","𝚣":"z","ᴢ":"z","ꮓ":"z","𑣄":"z","𐋵":"Z","𑣥":"Z","Ｚ":"Z","ℤ":"Z","ℨ":"Z","𝐙":"Z","𝑍":"Z","𝒁":"Z","𝒵":"Z","𝓩":"Z","𝖅":"Z","𝖹":"Z","𝗭":"Z","𝘡":"Z","𝙕":"Z","𝚉":"Z","Ζ":"Z","𝚭":"Z","𝛧":"Z","𝜡":"Z","𝝛":"Z","𝞕":"Z","Ꮓ":"Z","ꓜ":"Z","𑢩":"Z","ʐ":"z̨","ƶ":"z̵","Ƶ":"Z̵","ȥ":"z̦","Ȥ":"Z̦","ᵶ":"z̴","ƿ":"þ","ϸ":"þ","Ϸ":"Þ","𐓄":"Þ","⁹":"ꝰ","ᴤ":"ƨ","ϩ":"ƨ","ꙅ":"ƨ","ь":"ƅ","ꮟ":"ƅ","ы":"ƅi","ꭾ":"ɂ","ˤ":"ˁ","ꛍ":"ʡ","⊙":"ʘ","☉":"ʘ","⨀":"ʘ","Ꙩ":"ʘ","ⵙ":"ʘ","𐓃":"ʘ","ℾ":"Γ","𝚪":"Γ","𝛤":"Γ","𝜞":"Γ","𝝘":"Γ","𝞒":"Γ","Ⲅ":"Γ","Г":"Γ","Ꮁ":"Γ","ᒥ":"Γ","𖼇":"Γ","Ғ":"Γ̵","ᒯ":"Γ·","Ґ":"Γ\'","∆":"Δ","△":"Δ","🜂":"Δ","𝚫":"Δ","𝛥":"Δ","𝜟":"Δ","𝝙":"Δ","𝞓":"Δ","Ⲇ":"Δ","ⵠ":"Δ","ᐃ":"Δ","𖼚":"Δ","𐊅":"Δ","𐊣":"Δ","⍙":"Δ̲","ᐏ":"Δ·","ᐬ":"Δᐠ","𝟋":"ϝ","𝛇":"ζ","𝜁":"ζ","𝜻":"ζ","𝝵":"ζ","𝞯":"ζ","ⳤ":"ϗ","𝛌":"λ","𝜆":"λ","𝝀":"λ","𝝺":"λ","𝞴":"λ","Ⲗ":"λ","𐓛":"λ","µ":"μ","𝛍":"μ","𝜇":"μ","𝝁":"μ","𝝻":"μ","𝞵":"μ","𝛏":"ξ","𝜉":"ξ","𝝃":"ξ","𝝽":"ξ","𝞷":"ξ","𝚵":"Ξ","𝛯":"Ξ","𝜩":"Ξ","𝝣":"Ξ","𝞝":"Ξ","ϖ":"π","ℼ":"π","𝛑":"π","𝛡":"π","𝜋":"π","𝜛":"π","𝝅":"π","𝝕":"π","𝝿":"π","𝞏":"π","𝞹":"π","𝟉":"π","ᴨ":"π","п":"π","∏":"Π","ℿ":"Π","𝚷":"Π","𝛱":"Π","𝜫":"Π","𝝥":"Π","𝞟":"Π","Ⲡ":"Π","П":"Π","ꛛ":"Π","𐊭":"Ϙ","𐌒":"Ϙ","ϛ":"ς","𝛓":"ς","𝜍":"ς","𝝇":"ς","𝞁":"ς","𝞻":"ς","𝚽":"Φ","𝛷":"Φ","𝜱":"Φ","𝝫":"Φ","𝞥":"Φ","Ⲫ":"Φ","Ф":"Φ","Փ":"Φ","ቀ":"Φ","ᛰ":"Φ","𐊳":"Φ","ꭓ":"χ","ꭕ":"χ","𝛘":"χ","𝜒":"χ","𝝌":"χ","𝞆":"χ","𝟀":"χ","ⲭ":"χ","𝛙":"ψ","𝜓":"ψ","𝝍":"ψ","𝞇":"ψ","𝟁":"ψ","ѱ":"ψ","𐓹":"ψ","𝚿":"Ψ","𝛹":"Ψ","𝜳":"Ψ","𝝭":"Ψ","𝞧":"Ψ","Ⲯ":"Ψ","Ѱ":"Ψ","𐓑":"Ψ","ᛘ":"Ψ","𐊵":"Ψ","⍵":"ω","ꞷ":"ω","𝛚":"ω","𝜔":"ω","𝝎":"ω","𝞈":"ω","𝟂":"ω","ⲱ":"ω","ꙍ":"ω","Ω":"Ω","𝛀":"Ω","𝛺":"Ω","𝜴":"Ω","𝝮":"Ω","𝞨":"Ω","ᘯ":"Ω","ᘵ":"Ω","𐊶":"Ω","⍹":"ω̲","ώ":"ῴ","☰":"Ⲷ","Ⳝ":"Ϭ","җ":"ж̩","Җ":"Ж̩","𝈋":"И","Ͷ":"И","ꚡ":"И","𐐥":"И","Й":"Ѝ","Ҋ":"Ѝ̦","ѝ":"й","ҋ":"й̦","𐒼":"Ӄ","ᴫ":"л","ӆ":"л̦","ꭠ":"љ","𐓫":"ꙩ","ᷮ":"ⷬ","𐓍":"Ћ","𝈂":"Ӿ","𝈢":"Ѡ","Ꮗ":"Ѡ","ᗯ":"Ѡ","Ѽ":"Ѡ҆҇","ᣭ":"Ѡ·","Ꞷ":"Ꙍ","ӌ":"ҷ","Ӌ":"Ҷ","Ҿ":"Ҽ̨","ⲽ":"ш","Ⲽ":"Ш","Ꙑ":"Ъl","℈":"Э","🜁":"Ꙙ","𖼜":"Ꙙ","ꦒ":"ⰿ","և":"եւ","ኔ":"ձ","ﬔ":"մե","ﬕ":"մի","ﬗ":"մխ","ﬓ":"մն","∩":"Ո","⋂":"Ո","𝉅":"Ո","በ":"Ո","ᑎ":"Ո","ꓵ":"Ո","ᑚ":"Ո·","ᑨ":"Ո\'","ﬖ":"վն","₽":"Ք","˓":"ՙ","ʿ":"ՙ","ℵ":"א","ﬡ":"א","אָ":"אַ","אּ":"אַ","ﭏ":"אל","ℶ":"ב","ℷ":"ג","ℸ":"ד","ﬢ":"ד","ﬣ":"ה","יּ":"יִ","ﬤ":"כ","ﬥ":"ל","ﬦ":"ם","ﬠ":"ע","ﬧ":"ר","שׂ":"שׁ","שּ":"שׁ","שּׂ":"שּׁ","ﬨ":"ת","ﺀ":"ء","۽":"ء͈","ﺂ":"آ","ﺁ":"آ","ﭑ":"ٱ","ﭐ":"ٱ","𞸁":"ب","𞸡":"ب","𞹡":"ب","𞺁":"ب","𞺡":"ب","ﺑ":"ب","ﺒ":"ب","ﺐ":"ب","ﺏ":"ب","ݑ":"بۛ","ࢶ":"بۢ","ࢡ":"بٔ","ﲠ":"بo","ﳢ":"بo","ﲜ":"بج","ﰅ":"بج","ﲝ":"بح","ﰆ":"بح","ﷂ":"بحى","ﲞ":"بخ","ﰇ":"بخ","ﳒ":"بخ","ﱋ":"بخ","ﶞ":"بخى","ﱪ":"بر","ﱫ":"بز","ﲟ":"بم","ﳡ":"بم","ﱬ":"بم","ﰈ":"بم","ﱭ":"بن","ﱮ":"بى","ﰉ":"بى","ﱯ":"بى","ﰊ":"بى","ﭔ":"ٻ","ﭕ":"ٻ","ﭓ":"ٻ","ﭒ":"ٻ","ې":"ٻ","ﯦ":"ٻ","ﯧ":"ٻ","ﯥ":"ٻ","ﯤ":"ٻ","ﭜ":"ڀ","ﭝ":"ڀ","ﭛ":"ڀ","ﭚ":"ڀ","ࢩ":"ݔ","ݧ":"ݔ","⍥":"ة","ö":"ة","ﺔ":"ة","ﺓ":"ة","ۃ":"ة","𞸕":"ت","𞸵":"ت","𞹵":"ت","𞺕":"ت","𞺵":"ت","ﺗ":"ت","ﺘ":"ت","ﺖ":"ت","ﺕ":"ت","ﲥ":"تo","ﳤ":"تo","ﲡ":"تج","ﰋ":"تج","ﵐ":"تجم","ﶠ":"تجى","ﶟ":"تجى","ﲢ":"تح","ﰌ":"تح","ﵒ":"تحج","ﵑ":"تحج","ﵓ":"تحم","ﲣ":"تخ","ﰍ":"تخ","ﵔ":"تخم","ﶢ":"تخى","ﶡ":"تخى","ﱰ":"تر","ﱱ":"تز","ﲤ":"تم","ﳣ":"تم","ﱲ":"تم","ﰎ":"تم","ﵕ":"تمج","ﵖ":"تمح","ﵗ":"تمخ","ﶤ":"تمى","ﶣ":"تمى","ﱳ":"تن","ﱴ":"تى","ﰏ":"تى","ﱵ":"تى","ﰐ":"تى","ﭠ":"ٺ","ﭡ":"ٺ","ﭟ":"ٺ","ﭞ":"ٺ","ﭤ":"ٿ","ﭥ":"ٿ","ﭣ":"ٿ","ﭢ":"ٿ","𞸂":"ج","𞸢":"ج","𞹂":"ج","𞹢":"ج","𞺂":"ج","𞺢":"ج","ﺟ":"ج","ﺠ":"ج","ﺞ":"ج","ﺝ":"ج","ﲧ":"جح","ﰕ":"جح","ﶦ":"جحى","ﶾ":"جحى","ﷻ":"جل جلlلo","ﲨ":"جم","ﰖ":"جم","ﵙ":"جمح","ﵘ":"جمح","ﶧ":"جمى","ﶥ":"جمى","ﴝ":"جى","ﴁ":"جى","ﴞ":"جى","ﴂ":"جى","ﭸ":"ڃ","ﭹ":"ڃ","ﭷ":"ڃ","ﭶ":"ڃ","ﭴ":"ڄ","ﭵ":"ڄ","ﭳ":"ڄ","ﭲ":"ڄ","ﭼ":"چ","ﭽ":"چ","ﭻ":"چ","ﭺ":"چ","ﮀ":"ڇ","ﮁ":"ڇ","ﭿ":"ڇ","ﭾ":"ڇ","𞸇":"ح","𞸧":"ح","𞹇":"ح","𞹧":"ح","𞺇":"ح","𞺧":"ح","ﺣ":"ح","ﺤ":"ح","ﺢ":"ح","ﺡ":"ح","څ":"حۛ","ځ":"حٔ","ݲ":"حٔ","ﲩ":"حج","ﰗ":"حج","ﶿ":"حجى","ﲪ":"حم","ﰘ":"حم","ﵛ":"حمى","ﵚ":"حمى","ﴛ":"حى","ﳿ":"حى","ﴜ":"حى","ﴀ":"حى","𞸗":"خ","𞸷":"خ","𞹗":"خ","𞹷":"خ","𞺗":"خ","𞺷":"خ","ﺧ":"خ","ﺨ":"خ","ﺦ":"خ","ﺥ":"خ","ﲫ":"خج","ﰙ":"خج","ﰚ":"خح","ﲬ":"خم","ﰛ":"خم","ﴟ":"خى","ﴃ":"خى","ﴠ":"خى","ﴄ":"خى","𐋡":"د","𞸃":"د","𞺃":"د","𞺣":"د","ﺪ":"د","ﺩ":"د","ڈ":"دؕ","ﮉ":"دؕ","ﮈ":"دؕ","ڎ":"دۛ","ﮇ":"دۛ","ﮆ":"دۛ","ۮ":"د̂","ࢮ":"د̤̣","𞸘":"ذ","𞺘":"ذ","𞺸":"ذ","ﺬ":"ذ","ﺫ":"ذ","ﱛ":"ذٰ","ڋ":"ڊؕ","ﮅ":"ڌ","ﮄ":"ڌ","ﮃ":"ڍ","ﮂ":"ڍ","𞸓":"ر","𞺓":"ر","𞺳":"ر","ﺮ":"ر","ﺭ":"ر","ڑ":"رؕ","ﮍ":"رؕ","ﮌ":"رؕ","ژ":"رۛ","ﮋ":"رۛ","ﮊ":"رۛ","ڒ":"ر̆","ࢹ":"ر̆̇","ۯ":"ر̂","ݬ":"رٔ","ﱜ":"رٰ","ﷶ":"رسول","﷼":"رىlل","𞸆":"ز","𞺆":"ز","𞺦":"ز","ﺰ":"ز","ﺯ":"ز","ࢲ":"ز̂","ݱ":"ڗؕ","𞸎":"س","𞸮":"س","𞹎":"س","𞹮":"س","𞺎":"س","𞺮":"س","ﺳ":"س","ﺴ":"س","ﺲ":"س","ﺱ":"س","ش":"سۛ","𞸔":"سۛ","𞸴":"سۛ","𞹔":"سۛ","𞹴":"سۛ","𞺔":"سۛ","𞺴":"سۛ","ﺷ":"سۛ","ﺸ":"سۛ","ﺶ":"سۛ","ﺵ":"سۛ","ݾ":"س̂","ﴱ":"سo","ﳨ":"سo","ﴲ":"سۛo","ﳪ":"سۛo","ﲭ":"سج","ﴴ":"سج","ﰜ":"سج","ﴭ":"سۛج","ﴷ":"سۛج","ﴥ":"سۛج","ﴉ":"سۛج","ﵝ":"سجح","ﵞ":"سجى","ﵩ":"سۛجى","ﲮ":"سح","ﴵ":"سح","ﰝ":"سح","ﴮ":"سۛح","ﴸ":"سۛح","ﴦ":"سۛح","ﴊ":"سۛح","ﵜ":"سحج","ﵨ":"سۛحم","ﵧ":"سۛحم","ﶪ":"سۛحى","ﲯ":"سخ","ﴶ":"سخ","ﰞ":"سخ","ﴯ":"سۛخ","ﴹ":"سۛخ","ﴧ":"سۛخ","ﴋ":"سۛخ","ﶨ":"سخى","ﷆ":"سخى","ﴪ":"سر","ﴎ":"سر","ﴩ":"سۛر","ﴍ":"سۛر","ﲰ":"سم","ﳧ":"سم","ﰟ":"سم","ﴰ":"سۛم","ﳩ":"سۛم","ﴨ":"سۛم","ﴌ":"سۛم","ﵡ":"سمج","ﵠ":"سمح","ﵟ":"سمح","ﵫ":"سۛمخ","ﵪ":"سۛمخ","ﵣ":"سمم","ﵢ":"سمم","ﵭ":"سۛمم","ﵬ":"سۛمم","ﴗ":"سى","ﳻ":"سى","ﴘ":"سى","ﳼ":"سى","ﴙ":"سۛى","ﳽ":"سۛى","ﴚ":"سۛى","ﳾ":"سۛى","𐋲":"ص","𞸑":"ص","𞸱":"ص","𞹑":"ص","𞹱":"ص","𞺑":"ص","𞺱":"ص","ﺻ":"ص","ﺼ":"ص","ﺺ":"ص","ﺹ":"ص","ڞ":"صۛ","ࢯ":"ص̤̣","ﲱ":"صح","ﰠ":"صح","ﵥ":"صحح","ﵤ":"صحح","ﶩ":"صحى","ﲲ":"صخ","ﴫ":"صر","ﴏ":"صر","ﷵ":"صلعم","ﷹ":"صلى","ﷰ":"صلى","ﷺ":"صلى lللo علىo وسلم","ﲳ":"صم","ﰡ":"صم","ﷅ":"صمم","ﵦ":"صمم","ﴡ":"صى","ﴅ":"صى","ﴢ":"صى","ﴆ":"صى","𞸙":"ض","𞸹":"ض","𞹙":"ض","𞹹":"ض","𞺙":"ض","𞺹":"ض","ﺿ":"ض","ﻀ":"ض","ﺾ":"ض","ﺽ":"ض","ﲴ":"ضج","ﰢ":"ضج","ﲵ":"ضح","ﰣ":"ضح","ﵮ":"ضحى","ﶫ":"ضحى","ﲶ":"ضخ","ﰤ":"ضخ","ﵰ":"ضخم","ﵯ":"ضخم","ﴬ":"ضر","ﴐ":"ضر","ﲷ":"ضم","ﰥ":"ضم","ﴣ":"ضى","ﴇ":"ضى","ﴤ":"ضى","ﴈ":"ضى","𐋨":"ط","𞸈":"ط","𞹨":"ط","𞺈":"ط","𞺨":"ط","ﻃ":"ط","ﻄ":"ط","ﻂ":"ط","ﻁ":"ط","ڟ":"طۛ","ﲸ":"طح","ﰦ":"طح","ﴳ":"طم","ﴺ":"طم","ﰧ":"طم","ﵲ":"طمح","ﵱ":"طمح","ﵳ":"طمم","ﵴ":"طمى","ﴑ":"طى","ﳵ":"طى","ﴒ":"طى","ﳶ":"طى","𞸚":"ظ","𞹺":"ظ","𞺚":"ظ","𞺺":"ظ","ﻇ":"ظ","ﻈ":"ظ","ﻆ":"ظ","ﻅ":"ظ","ﲹ":"ظم","ﴻ":"ظم","ﰨ":"ظم","؏":"ع","𞸏":"ع","𞸯":"ع","𞹏":"ع","𞹯":"ع","𞺏":"ع","𞺯":"ع","ﻋ":"ع","ﻌ":"ع","ﻊ":"ع","ﻉ":"ع","ﲺ":"عج","ﰩ":"عج","ﷄ":"عجم","ﵵ":"عجم","ﷷ":"علىo","ﲻ":"عم","ﰪ":"عم","ﵷ":"عمم","ﵶ":"عمم","ﵸ":"عمى","ﶶ":"عمى","ﴓ":"عى","ﳷ":"عى","ﴔ":"عى","ﳸ":"عى","𞸛":"غ","𞸻":"غ","𞹛":"غ","𞹻":"غ","𞺛":"غ","𞺻":"غ","ﻏ":"غ","ﻐ":"غ","ﻎ":"غ","ﻍ":"غ","ﲼ":"غج","ﰫ":"غج","ﲽ":"غم","ﰬ":"غم","ﵹ":"غمم","ﵻ":"غمى","ﵺ":"غمى","ﴕ":"غى","ﳹ":"غى","ﴖ":"غى","ﳺ":"غى","𞸐":"ف","𞸰":"ف","𞹰":"ف","𞺐":"ف","𞺰":"ف","ﻓ":"ف","ﻔ":"ف","ﻒ":"ف","ﻑ":"ف","ڧ":"ف","ﲾ":"فج","ﰭ":"فج","ﲿ":"فح","ﰮ":"فح","ﳀ":"فخ","ﰯ":"فخ","ﵽ":"فخم","ﵼ":"فخم","ﳁ":"فم","ﰰ":"فم","ﷁ":"فمى","ﱼ":"فى","ﰱ":"فى","ﱽ":"فى","ﰲ":"فى","𞸞":"ڡ","𞹾":"ڡ","ࢻ":"ڡ","ٯ":"ڡ","𞸟":"ڡ","𞹟":"ڡ","ࢼ":"ڡ","ڤ":"ڡۛ","ﭬ":"ڡۛ","ﭭ":"ڡۛ","ﭫ":"ڡۛ","ﭪ":"ڡۛ","ڨ":"ڡۛ","ࢤ":"ڢۛ","ﭰ":"ڦ","ﭱ":"ڦ","ﭯ":"ڦ","ﭮ":"ڦ","𞸒":"ق","𞸲":"ق","𞹒":"ق","𞹲":"ق","𞺒":"ق","𞺲":"ق","ﻗ":"ق","ﻘ":"ق","ﻖ":"ق","ﻕ":"ق","ﳂ":"قح","ﰳ":"قح","ﷱ":"قلى","ﳃ":"قم","ﰴ":"قم","ﶴ":"قمح","ﵾ":"قمح","ﵿ":"قمم","ﶲ":"قمى","ﱾ":"قى","ﰵ":"قى","ﱿ":"قى","ﰶ":"قى","𞸊":"ك","𞸪":"ك","𞹪":"ك","ﻛ":"ك","ﻜ":"ك","ﻚ":"ك","ﻙ":"ك","ک":"ك","ﮐ":"ك","ﮑ":"ك","ﮏ":"ك","ﮎ":"ك","ڪ":"ك","ڭ":"كۛ","ﯕ":"كۛ","ﯖ":"كۛ","ﯔ":"كۛ","ﯓ":"كۛ","ݣ":"كۛ","ﲀ":"كl","ﰷ":"كl","ﳄ":"كج","ﰸ":"كج","ﳅ":"كح","ﰹ":"كح","ﳆ":"كخ","ﰺ":"كخ","ﳇ":"كل","ﳫ":"كل","ﲁ":"كل","ﰻ":"كل","ﳈ":"كم","ﳬ":"كم","ﲂ":"كم","ﰼ":"كم","ﷃ":"كمم","ﶻ":"كمم","ﶷ":"كمى","ﲃ":"كى","ﰽ":"كى","ﲄ":"كى","ﰾ":"كى","ݢ":"ڬ","ﮔ":"گ","ﮕ":"گ","ﮓ":"گ","ﮒ":"گ","ࢰ":"گ","ڴ":"گۛ","ﮜ":"ڱ","ﮝ":"ڱ","ﮛ":"ڱ","ﮚ":"ڱ","ﮘ":"ڳ","ﮙ":"ڳ","ﮗ":"ڳ","ﮖ":"ڳ","𞸋":"ل","𞸫":"ل","𞹋":"ل","𞺋":"ل","𞺫":"ل","ﻟ":"ل","ﻠ":"ل","ﻞ":"ل","ﻝ":"ل","ڷ":"لۛ","ڵ":"ل̆","ﻼ":"لl","ﻻ":"لl","ﻺ":"لlٕ","ﻹ":"لlٕ","ﻸ":"لlٴ","ﻷ":"لlٴ","ﳍ":"لo","ﻶ":"لآ","ﻵ":"لآ","ﳉ":"لج","ﰿ":"لج","ﶃ":"لجج","ﶄ":"لجج","ﶺ":"لجم","ﶼ":"لجم","ﶬ":"لجى","ﳊ":"لح","ﱀ":"لح","ﶵ":"لحم","ﶀ":"لحم","ﶂ":"لحى","ﶁ":"لحى","ﳋ":"لخ","ﱁ":"لخ","ﶆ":"لخم","ﶅ":"لخم","ﳌ":"لم","ﳭ":"لم","ﲅ":"لم","ﱂ":"لم","ﶈ":"لمح","ﶇ":"لمح","ﶭ":"لمى","ﲆ":"لى","ﱃ":"لى","ﲇ":"لى","ﱄ":"لى","𞸌":"م","𞸬":"م","𞹬":"م","𞺌":"م","𞺬":"م","ﻣ":"م","ﻤ":"م","ﻢ":"م","ﻡ":"م","ࢧ":"مۛ","۾":"م͈","ﲈ":"مl","ﳎ":"مج","ﱅ":"مج","ﶌ":"مجح","ﶒ":"مجخ","ﶍ":"مجم","ﷀ":"مجى","ﳏ":"مح","ﱆ":"مح","ﶉ":"محج","ﶊ":"محم","ﷴ":"محمد","ﶋ":"محى","ﳐ":"مخ","ﱇ":"مخ","ﶎ":"مخج","ﶏ":"مخم","ﶹ":"مخى","ﳑ":"مم","ﲉ":"مم","ﱈ":"مم","ﶱ":"ممى","ﱉ":"مى","ﱊ":"مى","𞸍":"ن","𞸭":"ن","𞹍":"ن","𞹭":"ن","𞺍":"ن","𞺭":"ن","ﻧ":"ن","ﻨ":"ن","ﻦ":"ن","ﻥ":"ن","ݨ":"نؕ","ݩ":"ن̆","ﳖ":"نo","ﳯ":"نo","ﶸ":"نجح","ﶽ":"نجح","ﶘ":"نجم","ﶗ":"نجم","ﶙ":"نجى","ﷇ":"نجى","ﳓ":"نح","ﱌ":"نح","ﶕ":"نحم","ﶖ":"نحى","ﶳ":"نحى","ﳔ":"نخ","ﱍ":"نخ","ﲊ":"نر","ﲋ":"نز","ﳕ":"نم","ﳮ":"نم","ﲌ":"نم","ﱎ":"نم","ﶛ":"نمى","ﶚ":"نمى","ﲍ":"نن","ﲎ":"نى","ﱏ":"نى","ﲏ":"نى","ﱐ":"نى","ۂ":"ۀ","ﮥ":"ۀ","ﮤ":"ۀ","𐋤":"و","𞸅":"و","𞺅":"و","𞺥":"و","ﻮ":"و","ﻭ":"و","ࢱ":"و","ۋ":"وۛ","ﯟ":"وۛ","ﯞ":"وۛ","ۇ":"و̓","ﯘ":"و̓","ﯗ":"و̓","ۆ":"و̆","ﯚ":"و̆","ﯙ":"و̆","ۉ":"و̂","ﯣ":"و̂","ﯢ":"و̂","ۈ":"وٰ","ﯜ":"وٰ","ﯛ":"وٰ","ؤ":"وٴ","ﺆ":"وٴ","ﺅ":"وٴ","ٶ":"وٴ","ٷ":"و̓ٴ","ﯝ":"و̓ٴ","ﷸ":"وسلم","ﯡ":"ۅ","ﯠ":"ۅ","ٮ":"ى","𞸜":"ى","𞹼":"ى","ں":"ى","𞸝":"ى","𞹝":"ى","ﮟ":"ى","ﮞ":"ى","ࢽ":"ى","ﯨ":"ى","ﯩ":"ى","ﻰ":"ى","ﻯ":"ى","ي":"ى","𞸉":"ى","𞸩":"ى","𞹉":"ى","𞹩":"ى","𞺉":"ى","𞺩":"ى","ﻳ":"ى","ﻴ":"ى","ﻲ":"ى","ﻱ":"ى","ی":"ى","ﯾ":"ى","ﯿ":"ى","ﯽ":"ى","ﯼ":"ى","ے":"ى","ﮯ":"ى","ﮮ":"ى","ٹ":"ىؕ","ﭨ":"ىؕ","ﭩ":"ىؕ","ﭧ":"ىؕ","ﭦ":"ىؕ","ڻ":"ىؕ","ﮢ":"ىؕ","ﮣ":"ىؕ","ﮡ":"ىؕ","ﮠ":"ىؕ","پ":"ىۛ","ﭘ":"ىۛ","ﭙ":"ىۛ","ﭗ":"ىۛ","ﭖ":"ىۛ","ث":"ىۛ","𞸖":"ىۛ","𞸶":"ىۛ","𞹶":"ىۛ","𞺖":"ىۛ","𞺶":"ىۛ","ﺛ":"ىۛ","ﺜ":"ىۛ","ﺚ":"ىۛ","ﺙ":"ىۛ","ڽ":"ىۛ","ۑ":"ىۛ","ؿ":"ىۛ","ࢷ":"ىۛۢ","ݖ":"ى̆","ێ":"ى̆","ࢺ":"ى̆̇","ؽ":"ى̂","ࢨ":"ىٔ","ﲐ":"ىٰ","ﱝ":"ىٰ","ﳞ":"ىo","ﳱ":"ىo","ﳦ":"ىۛo","ئ":"ىٴ","ﺋ":"ىٴ","ﺌ":"ىٴ","ﺊ":"ىٴ","ﺉ":"ىٴ","ٸ":"ىٴ","ﯫ":"ىٴl","ﯪ":"ىٴl","ﲛ":"ىٴo","ﳠ":"ىٴo","ﯭ":"ىٴo","ﯬ":"ىٴo","ﯸ":"ىٴٻ","ﯷ":"ىٴٻ","ﯶ":"ىٴٻ","ﲗ":"ىٴج","ﰀ":"ىٴج","ﲘ":"ىٴح","ﰁ":"ىٴح","ﲙ":"ىٴخ","ﱤ":"ىٴر","ﱥ":"ىٴز","ﲚ":"ىٴم","ﳟ":"ىٴم","ﱦ":"ىٴم","ﰂ":"ىٴم","ﱧ":"ىٴن","ﯯ":"ىٴو","ﯮ":"ىٴو","ﯱ":"ىٴو̓","ﯰ":"ىٴو̓","ﯳ":"ىٴو̆","ﯲ":"ىٴو̆","ﯵ":"ىٴوٰ","ﯴ":"ىٴوٰ","ﯻ":"ىٴى","ﯺ":"ىٴى","ﱨ":"ىٴى","ﯹ":"ىٴى","ﰃ":"ىٴى","ﱩ":"ىٴى","ﰄ":"ىٴى","ﳚ":"ىج","ﱕ":"ىج","ﰑ":"ىۛج","ﶯ":"ىجى","ﳛ":"ىح","ﱖ":"ىح","ﶮ":"ىحى","ﳜ":"ىخ","ﱗ":"ىخ","ﲑ":"ىر","ﱶ":"ىۛر","ﲒ":"ىز","ﱷ":"ىۛز","ﳝ":"ىم","ﳰ":"ىم","ﲓ":"ىم","ﱘ":"ىم","ﲦ":"ىۛم","ﳥ":"ىۛم","ﱸ":"ىۛم","ﰒ":"ىۛم","ﶝ":"ىمم","ﶜ":"ىمم","ﶰ":"ىمى","ﲔ":"ىن","ﱹ":"ىۛن","ﲕ":"ىى","ﱙ":"ىى","ﲖ":"ىى","ﱚ":"ىى","ﱺ":"ىۛى","ﰓ":"ىۛى","ﱻ":"ىۛى","ﰔ":"ىۛى","ﮱ":"ۓ","ﮰ":"ۓ","𐊸":"ⵀ","⁞":"ⵂ","⸽":"ⵂ","⦙":"ⵂ","︙":"ⵗ","⁝":"ⵗ","⋮":"ⵗ","Մ":"ሆ","Ռ":"ቡ","Ի":"ኮ","Պ":"ጣ","आ":"अा","ऒ":"अाॆ","ओ":"अाे","औ":"अाै","ऄ":"अॆ","ऑ":"अॉ","ऍ":"एॅ","ऎ":"एॆ","ऐ":"एे","ई":"र्इ","ઽ":"ऽ","𑇜":"ꣻ","𑇋":"ऺ","ુ":"ु","ૂ":"ू","ੋ":"ॆ","੍":"्","્":"्","আ":"অা","ৠ":"ঋৃ","ৡ":"ঋৃ","𑒒":"ঘ","𑒔":"চ","𑒖":"জ","𑒘":"ঞ","𑒙":"ট","𑒛":"ড","𑒪":"ণ","𑒞":"ত","𑒟":"থ","𑒠":"দ","𑒡":"ধ","𑒢":"ন","𑒣":"প","𑒩":"ব","𑒧":"ম","𑒨":"য","𑒫":"র","𑒝":"ল","𑒭":"ষ","𑒮":"স","𑓄":"ঽ","𑒰":"া","𑒱":"ি","𑒹":"ে","𑒼":"ো","𑒾":"ৌ","𑓂":"্","𑒽":"ৗ","ਉ":"ੳੁ","ਊ":"ੳੂ","ਆ":"ਅਾ","ਐ":"ਅੈ","ਔ":"ਅੌ","ਇ":"ੲਿ","ਈ":"ੲੀ","ਏ":"ੲੇ","આ":"અા","ઑ":"અાૅ","ઓ":"અાે","ઔ":"અાૈ","ઍ":"અૅ","એ":"અે","ઐ":"અૈ","ଆ":"ଅା","௮":"அ","ர":"ஈ","ா":"ஈ","௫":"ஈு","௨":"உ","ഉ":"உ","ஊ":"உள","ഊ":"உൗ","௭":"எ","௷":"எவ","ஜ":"ஐ","ജ":"ஐ","௧":"க","௪":"ச","௬":"சு","௲":"சூ","ഺ":"டி","ണ":"ண","௺":"நீ","௴":"மீ","௰":"ய","ഴ":"ழ","ௗ":"ள","ை":"ன","ശ":"ஶ","௸":"ஷ","ി":"ி","ീ":"ி","ொ":"ெஈ","ௌ":"ெள","ோ":"ேஈ","ಅ":"అ","ಆ":"ఆ","ಇ":"ఇ","ౠ":"ఋా","ౡ":"ఌా","ಒ":"ఒ","ఔ":"ఒౌ","ಔ":"ఒౌ","ఓ":"ఒౕ","ಓ":"ఒౕ","ಜ":"జ","ಞ":"ఞ","ఢ":"డ̣","ಣ":"ణ","థ":"ధּ","భ":"బ̣","ಯ":"య","ఠ":"రּ","ಱ":"ఱ","ಲ":"ల","ష":"వ̣","హ":"వా","మ":"వు","ూ":"ుా","ౄ":"ృా","ೡ":"ಌಾ","ഈ":"ഇൗ","ഐ":"എെ","ഓ":"ഒാ","ഔ":"ഒൗ","ൡ":"ഞ","൫":"ദ്ര","൹":"നു","ഌ":"നു","ങ":"നു","൯":"ന്","ൻ":"ന്","൬":"ന്ന","൚":"ന്മ","റ":"ര","൪":"ര്","ർ":"ര്","൮":"വ്ര","൶":"ഹ്മ","ൂ":"ു","ൃ":"ു","ൈ":"െെ","෪":"ජ","෫":"ද","𑐓":"𑐴𑑂𑐒","𑐙":"𑐴𑑂𑐘","𑐤":"𑐴𑑂𑐣","𑐪":"𑐴𑑂𑐩","𑐭":"𑐴𑑂𑐬","𑐯":"𑐴𑑂𑐮","𑗘":"𑖂","𑗙":"𑖂","𑗚":"𑖃","𑗛":"𑖄","𑗜":"𑖲","𑗝":"𑖳","ฃ":"ข","ด":"ค","ต":"ค","ม":"ฆ","ຈ":"จ","ซ":"ช","ฏ":"ฎ","ท":"ฑ","ບ":"บ","ປ":"ป","ຝ":"ฝ","ພ":"พ","ຟ":"ฟ","ฦ":"ภ","ຍ":"ย","។":"ฯ","ๅ":"า","ำ":"̊า","ិ":"ิ","ី":"ี","ឹ":"ึ","ឺ":"ื","ຸ":"ุ","ູ":"ู","แ":"เเ","ໜ":"ຫນ","ໝ":"ຫມ","ຳ":"̊າ","༂":"འུྂཿ","༃":"འུྂ༔","ཪ":"ར","ༀ":"ཨོཾ","ཷ":"ྲཱྀ","ཹ":"ླཱྀ","𑲲":"𑲪","ႁ":"ဂှ","က":"ဂာ","ၰ":"ဃှ","ၦ":"ပှ","ဟ":"ပာ","ၯ":"ပာှ","ၾ":"ၽှ","ဩ":"သြ","ဪ":"သြော်","႞":"ႃ̊","ឣ":"អ","᧐":"ᦞ","᧑":"ᦱ","᪀":"ᩅ","᪐":"ᩅ","꩓":"ꨁ","꩖":"ꨣ","᭒":"ᬍ","᭓":"ᬑ","᭘":"ᬨ","ꦣ":"ꦝ","ᢖ":"ᡜ","ᡕ":"ᠵ","ῶ":"Ꮿ","ᐍ":"ᐁ·","ᐫ":"ᐁᐠ","ᐑ":"ᐄ·","ᐓ":"ᐅ·","ᐭ":"ᐅᐠ","ᐕ":"ᐆ·","ᐘ":"ᐊ·","ᐮ":"ᐊᐠ","ᐚ":"ᐋ·","ᣝ":"ᐞᣟ","ᓑ":"ᐡ","ᕀ":"ᐩ","ᐿ":"ᐲ·","ᑃ":"ᐴ·","⍩":"ᐵ","ᑇ":"ᐹ·","ᑜ":"ᑏ·","⸧":"ᑐ","⊃":"ᑐ","ᑞ":"ᑐ·","ᑩ":"ᑐ\'","⟉":"ᑐ/","⫗":"ᑐᑕ","ᑠ":"ᑑ·","⸦":"ᑕ","⊂":"ᑕ","ᑢ":"ᑕ·","ᑪ":"ᑕ\'","ᑤ":"ᑖ·","ᑵ":"ᑫ·","ᒅ":"ᑫ\'","ᑹ":"ᑮ·","ᑽ":"ᑰ·","ᘃ":"ᒉ","ᒓ":"ᒉ·","ᒕ":"ᒋ·","ᒗ":"ᒌ·","ᒛ":"ᒎ·","ᘂ":"ᒐ","ᒝ":"ᒐ·","ᒟ":"ᒑ·","ᒭ":"ᒣ·","ᒱ":"ᒦ·","ᒳ":"ᒧ·","ᒵ":"ᒨ·","ᒹ":"ᒫ·","ᓊ":"ᓀ·","ᣇ":"ᓂ·","ᣉ":"ᓃ·","ᣋ":"ᓄ·","ᣍ":"ᓅ·","ᓌ":"ᓇ·","ᓎ":"ᓈ·","ᘄ":"ᓓ","ᓝ":"ᓓ·","ᓟ":"ᓕ·","ᓡ":"ᓖ·","ᓣ":"ᓗ·","ᓥ":"ᓘ·","ᘇ":"ᓚ","ᓧ":"ᓚ·","ᓩ":"ᓛ·","ᓷ":"ᓭ·","ᓹ":"ᓯ·","ᓻ":"ᓰ·","ᓽ":"ᓱ·","ᓿ":"ᓲ·","ᔁ":"ᓴ·","ᔃ":"ᓵ·","ᔌ":"ᔋ<","ᔎ":"ᔋb","ᔍ":"ᔋᑕ","ᔏ":"ᔋᒐ","ᔘ":"ᔐ·","ᔚ":"ᔑ·","ᔜ":"ᔒ·","ᔞ":"ᔓ·","ᔠ":"ᔔ·","ᔢ":"ᔕ·","ᔤ":"ᔖ·","ᔲ":"ᔨ·","ᔴ":"ᔩ·","ᔶ":"ᔪ·","ᔸ":"ᔫ·","ᔺ":"ᔭ·","ᔼ":"ᔮ·","ᘢ":"ᕃ","ᣠ":"ᕃ·","ᘣ":"ᕆ","ᘤ":"ᕊ","ᕏ":"ᕌ·","ᖃ":"ᕐb","ᖄ":"ᕐḃ","ᖁ":"ᕐd","ᕿ":"ᕐP","ᙯ":"ᕐᑫ","ᕾ":"ᕐᑬ","ᖀ":"ᕐᑮ","ᖂ":"ᕐᑰ","ᖅ":"ᕐᒃ","ᕜ":"ᕚ·","ᣣ":"ᕞ·","ᣤ":"ᕦ·","ᕩ":"ᕧ·","ᣥ":"ᕫ·","ᣨ":"ᖆ·","ᖑ":"ᖕJ","ᙰ":"ᖕᒉ","ᖎ":"ᖕᒊ","ᖏ":"ᖕᒋ","ᖐ":"ᖕᒌ","ᖒ":"ᖕᒎ","ᖓ":"ᖕᒐ","ᖔ":"ᖕᒑ","ᙳ":"ᖖJ","ᙱ":"ᖖᒋ","ᙲ":"ᖖᒌ","ᙴ":"ᖖᒎ","ᙵ":"ᖖᒐ","ᙶ":"ᖖᒑ","ᣪ":"ᖗ·","ᙷ":"ᖧ·","ᙸ":"ᖨ·","ᙹ":"ᖩ·","ᙺ":"ᖪ·","ᙻ":"ᖫ·","ᙼ":"ᖬ·","ᙽ":"ᖭ·","⪫":"ᗒ","⪪":"ᗕ","ꓷ":"ᗡ","ᣰ":"ᗴ·","ᣲ":"ᘛ·","ᶻ":"ᙆ","ꓭ":"ᙠ","ᶺ":"ᣔ","ᴾ":"ᣖ","ᣜ":"ᣟᐞ","ˡ":"ᣳ","ʳ":"ᣴ","ˢ":"ᣵ","ᣛ":"ᣵ","ꚰ":"ᚹ","ᛡ":"ᚼ","⍿":"ᚽ","ᛂ":"ᚽ","𝈿":"ᛋ","↑":"ᛏ","↿":"ᛐ","⥮":"ᛐ⇂","⥣":"ᛐᛚ","ⵣ":"ᛯ","↾":"ᛚ","⨡":"ᛚ","⋄":"ᛜ","◇":"ᛜ","◊":"ᛜ","♢":"ᛜ","🝔":"ᛜ","𑢷":"ᛜ","𐊔":"ᛜ","⍚":"ᛜ̲","⋈":"ᛞ","⨝":"ᛞ","𐓐":"ᛦ","↕":"ᛨ","𐳼":"𐲂","𐳺":"𐲥","ㄱ":"ᄀ","ᆨ":"ᄀ","ᄁ":"ᄀᄀ","ㄲ":"ᄀᄀ","ᆩ":"ᄀᄀ","ᇺ":"ᄀᄂ","ᅚ":"ᄀᄃ","ᇃ":"ᄀᄅ","ᇻ":"ᄀᄇ","ᆪ":"ᄀᄉ","ㄳ":"ᄀᄉ","ᇄ":"ᄀᄉᄀ","ᇼ":"ᄀᄎ","ᇽ":"ᄀᄏ","ᇾ":"ᄀᄒ","ㄴ":"ᄂ","ᆫ":"ᄂ","ᄓ":"ᄂᄀ","ᇅ":"ᄂᄀ","ᄔ":"ᄂᄂ","ㅥ":"ᄂᄂ","ᇿ":"ᄂᄂ","ᄕ":"ᄂᄃ","ㅦ":"ᄂᄃ","ᇆ":"ᄂᄃ","ퟋ":"ᄂᄅ","ᄖ":"ᄂᄇ","ᅛ":"ᄂᄉ","ᇇ":"ᄂᄉ","ㅧ":"ᄂᄉ","ᅜ":"ᄂᄌ","ᆬ":"ᄂᄌ","ㄵ":"ᄂᄌ","ퟌ":"ᄂᄎ","ᇉ":"ᄂᄐ","ᅝ":"ᄂᄒ","ᆭ":"ᄂᄒ","ㄶ":"ᄂᄒ","ᇈ":"ᄂᅀ","ㅨ":"ᄂᅀ","ㄷ":"ᄃ","ᆮ":"ᄃ","ᄗ":"ᄃᄀ","ᇊ":"ᄃᄀ","ᄄ":"ᄃᄃ","ㄸ":"ᄃᄃ","ퟍ":"ᄃᄃ","ퟎ":"ᄃᄃᄇ","ᅞ":"ᄃᄅ","ᇋ":"ᄃᄅ","ꥠ":"ᄃᄆ","ꥡ":"ᄃᄇ","ퟏ":"ᄃᄇ","ꥢ":"ᄃᄉ","ퟐ":"ᄃᄉ","ퟑ":"ᄃᄉᄀ","ꥣ":"ᄃᄌ","ퟒ":"ᄃᄌ","ퟓ":"ᄃᄎ","ퟔ":"ᄃᄐ","ㄹ":"ᄅ","ᆯ":"ᄅ","ꥤ":"ᄅᄀ","ᆰ":"ᄅᄀ","ㄺ":"ᄅᄀ","ꥥ":"ᄅᄀᄀ","ퟕ":"ᄅᄀᄀ","ᇌ":"ᄅᄀᄉ","ㅩ":"ᄅᄀᄉ","ퟖ":"ᄅᄀᄒ","ᄘ":"ᄅᄂ","ᇍ":"ᄅᄂ","ꥦ":"ᄅᄃ","ᇎ":"ᄅᄃ","ㅪ":"ᄅᄃ","ꥧ":"ᄅᄃᄃ","ᇏ":"ᄅᄃᄒ","ᄙ":"ᄅᄅ","ᇐ":"ᄅᄅ","ퟗ":"ᄅᄅᄏ","ꥨ":"ᄅᄆ","ᆱ":"ᄅᄆ","ㄻ":"ᄅᄆ","ᇑ":"ᄅᄆᄀ","ᇒ":"ᄅᄆᄉ","ퟘ":"ᄅᄆᄒ","ꥩ":"ᄅᄇ","ᆲ":"ᄅᄇ","ㄼ":"ᄅᄇ","ퟙ":"ᄅᄇᄃ","ꥪ":"ᄅᄇᄇ","ᇓ":"ᄅᄇᄉ","ㅫ":"ᄅᄇᄉ","ꥫ":"ᄅᄇᄋ","ᇕ":"ᄅᄇᄋ","ퟚ":"ᄅᄇᄑ","ᇔ":"ᄅᄇᄒ","ꥬ":"ᄅᄉ","ᆳ":"ᄅᄉ","ㄽ":"ᄅᄉ","ᇖ":"ᄅᄉᄉ","ᄛ":"ᄅᄋ","ퟝ":"ᄅᄋ","ꥭ":"ᄅᄌ","ꥮ":"ᄅᄏ","ᇘ":"ᄅᄏ","ᆴ":"ᄅᄐ","ㄾ":"ᄅᄐ","ᆵ":"ᄅᄑ","ㄿ":"ᄅᄑ","ᄚ":"ᄅᄒ","ㅀ":"ᄅᄒ","ᄻ":"ᄅᄒ","ᆶ":"ᄅᄒ","ퟲ":"ᄅᄒ","ᇗ":"ᄅᅀ","ㅬ":"ᄅᅀ","ퟛ":"ᄅᅌ","ᇙ":"ᄅᅙ","ㅭ":"ᄅᅙ","ퟜ":"ᄅᅙᄒ","ㅁ":"ᄆ","ᆷ":"ᄆ","ꥯ":"ᄆᄀ","ᇚ":"ᄆᄀ","ퟞ":"ᄆᄂ","ퟟ":"ᄆᄂᄂ","ꥰ":"ᄆᄃ","ᇛ":"ᄆᄅ","ퟠ":"ᄆᄆ","ᄜ":"ᄆᄇ","ㅮ":"ᄆᄇ","ᇜ":"ᄆᄇ","ퟡ":"ᄆᄇᄉ","ꥱ":"ᄆᄉ","ᇝ":"ᄆᄉ","ㅯ":"ᄆᄉ","ᇞ":"ᄆᄉᄉ","ᄝ":"ᄆᄋ","ㅱ":"ᄆᄋ","ᇢ":"ᄆᄋ","ퟢ":"ᄆᄌ","ᇠ":"ᄆᄎ","ᇡ":"ᄆᄒ","ᇟ":"ᄆᅀ","ㅰ":"ᄆᅀ","ㅂ":"ᄇ","ᆸ":"ᄇ","ᄞ":"ᄇᄀ","ㅲ":"ᄇᄀ","ᄟ":"ᄇᄂ","ᄠ":"ᄇᄃ","ㅳ":"ᄇᄃ","ퟣ":"ᄇᄃ","ᇣ":"ᄇᄅ","ퟤ":"ᄇᄅᄑ","ퟥ":"ᄇᄆ","ᄈ":"ᄇᄇ","ㅃ":"ᄇᄇ","ퟦ":"ᄇᄇ","ᄬ":"ᄇᄇᄋ","ㅹ":"ᄇᄇᄋ","ᄡ":"ᄇᄉ","ㅄ":"ᄇᄉ","ᆹ":"ᄇᄉ","ᄢ":"ᄇᄉᄀ","ㅴ":"ᄇᄉᄀ","ᄣ":"ᄇᄉᄃ","ㅵ":"ᄇᄉᄃ","ퟧ":"ᄇᄉᄃ","ᄤ":"ᄇᄉᄇ","ᄥ":"ᄇᄉᄉ","ᄦ":"ᄇᄉᄌ","ꥲ":"ᄇᄉᄐ","ᄫ":"ᄇᄋ","ㅸ":"ᄇᄋ","ᇦ":"ᄇᄋ","ᄧ":"ᄇᄌ","ㅶ":"ᄇᄌ","ퟨ":"ᄇᄌ","ᄨ":"ᄇᄎ","ퟩ":"ᄇᄎ","ꥳ":"ᄇᄏ","ᄩ":"ᄇᄐ","ㅷ":"ᄇᄐ","ᄪ":"ᄇᄑ","ᇤ":"ᄇᄑ","ꥴ":"ᄇᄒ","ᇥ":"ᄇᄒ","ㅅ":"ᄉ","ᆺ":"ᄉ","ᄭ":"ᄉᄀ","ㅺ":"ᄉᄀ","ᇧ":"ᄉᄀ","ᄮ":"ᄉᄂ","ㅻ":"ᄉᄂ","ᄯ":"ᄉᄃ","ㅼ":"ᄉᄃ","ᇨ":"ᄉᄃ","ᄰ":"ᄉᄅ","ᇩ":"ᄉᄅ","ᄱ":"ᄉᄆ","ퟪ":"ᄉᄆ","ᄲ":"ᄉᄇ","ㅽ":"ᄉᄇ","ᇪ":"ᄉᄇ","ᄳ":"ᄉᄇᄀ","ퟫ":"ᄉᄇᄋ","ᄊ":"ᄉᄉ","ㅆ":"ᄉᄉ","ᆻ":"ᄉᄉ","ퟬ":"ᄉᄉᄀ","ퟭ":"ᄉᄉᄃ","ꥵ":"ᄉᄉᄇ","ᄴ":"ᄉᄉᄉ","ᄵ":"ᄉᄋ","ᄶ":"ᄉᄌ","ㅾ":"ᄉᄌ","ퟯ":"ᄉᄌ","ᄷ":"ᄉᄎ","ퟰ":"ᄉᄎ","ᄸ":"ᄉᄏ","ᄹ":"ᄉᄐ","ퟱ":"ᄉᄐ","ᄺ":"ᄉᄑ","ퟮ":"ᄉᅀ","ㅇ":"ᄋ","ᆼ":"ᄋ","ᅁ":"ᄋᄀ","ᇬ":"ᄋᄀ","ᇭ":"ᄋᄀᄀ","ᅂ":"ᄋᄃ","ꥶ":"ᄋᄅ","ᅃ":"ᄋᄆ","ᅄ":"ᄋᄇ","ᅅ":"ᄋᄉ","ᇱ":"ᄋᄉ","ㆂ":"ᄋᄉ","ᅇ":"ᄋᄋ","ㆀ":"ᄋᄋ","ᇮ":"ᄋᄋ","ᅈ":"ᄋᄌ","ᅉ":"ᄋᄎ","ᇯ":"ᄋᄏ","ᅊ":"ᄋᄐ","ᅋ":"ᄋᄑ","ꥷ":"ᄋᄒ","ᅆ":"ᄋᅀ","ᇲ":"ᄋᅀ","ㆃ":"ᄋᅀ","ㅈ":"ᄌ","ᆽ":"ᄌ","ퟷ":"ᄌᄇ","ퟸ":"ᄌᄇᄇ","ᅍ":"ᄌᄋ","ᄍ":"ᄌᄌ","ㅉ":"ᄌᄌ","ퟹ":"ᄌᄌ","ꥸ":"ᄌᄌᄒ","ㅊ":"ᄎ","ᆾ":"ᄎ","ᅒ":"ᄎᄏ","ᅓ":"ᄎᄒ","ㅋ":"ᄏ","ᆿ":"ᄏ","ㅌ":"ᄐ","ᇀ":"ᄐ","ꥹ":"ᄐᄐ","ㅍ":"ᄑ","ᇁ":"ᄑ","ᅖ":"ᄑᄇ","ᇳ":"ᄑᄇ","ퟺ":"ᄑᄉ","ᅗ":"ᄑᄋ","ㆄ":"ᄑᄋ","ᇴ":"ᄑᄋ","ퟻ":"ᄑᄐ","ꥺ":"ᄑᄒ","ㅎ":"ᄒ","ᇂ":"ᄒ","ᇵ":"ᄒᄂ","ᇶ":"ᄒᄅ","ᇷ":"ᄒᄆ","ᇸ":"ᄒᄇ","ꥻ":"ᄒᄉ","ᅘ":"ᄒᄒ","ㆅ":"ᄒᄒ","ᄽ":"ᄼᄼ","ᄿ":"ᄾᄾ","ㅿ":"ᅀ","ᇫ":"ᅀ","ퟳ":"ᅀᄇ","ퟴ":"ᅀᄇᄋ","ㆁ":"ᅌ","ᇰ":"ᅌ","ퟵ":"ᅌᄆ","ퟶ":"ᅌᄒ","ᅏ":"ᅎᅎ","ᅑ":"ᅐᅐ","ㆆ":"ᅙ","ᇹ":"ᅙ","ꥼ":"ᅙᅙ","ㅤ":"ᅠ","ㅏ":"ᅡ","ᆣ":"ᅡー","ᅶ":"ᅡᅩ","ᅷ":"ᅡᅮ","ᅢ":"ᅡ丨","ㅐ":"ᅡ丨","ㅑ":"ᅣ","ᅸ":"ᅣᅩ","ᅹ":"ᅣᅭ","ᆤ":"ᅣᅮ","ᅤ":"ᅣ丨","ㅒ":"ᅣ丨","ㅓ":"ᅥ","ᅼ":"ᅥー","ᅺ":"ᅥᅩ","ᅻ":"ᅥᅮ","ᅦ":"ᅥ丨","ㅔ":"ᅥ丨","ㅕ":"ᅧ","ᆥ":"ᅧᅣ","ᅽ":"ᅧᅩ","ᅾ":"ᅧᅮ","ᅨ":"ᅧ丨","ㅖ":"ᅧ丨","ㅗ":"ᅩ","ᅪ":"ᅩᅡ","ㅘ":"ᅩᅡ","ᅫ":"ᅩᅡ丨","ㅙ":"ᅩᅡ丨","ᆦ":"ᅩᅣ","ᆧ":"ᅩᅣ丨","ᅿ":"ᅩᅥ","ᆀ":"ᅩᅥ丨","ힰ":"ᅩᅧ","ᆁ":"ᅩᅧ丨","ᆂ":"ᅩᅩ","ힱ":"ᅩᅩ丨","ᆃ":"ᅩᅮ","ᅬ":"ᅩ丨","ㅚ":"ᅩ丨","ㅛ":"ᅭ","ힲ":"ᅭᅡ","ힳ":"ᅭᅡ丨","ᆄ":"ᅭᅣ","ㆇ":"ᅭᅣ","ᆆ":"ᅭᅣ","ᆅ":"ᅭᅣ丨","ㆈ":"ᅭᅣ丨","ힴ":"ᅭᅥ","ᆇ":"ᅭᅩ","ᆈ":"ᅭ丨","ㆉ":"ᅭ丨","ㅜ":"ᅮ","ᆉ":"ᅮᅡ","ᆊ":"ᅮᅡ丨","ᅯ":"ᅮᅥ","ㅝ":"ᅮᅥ","ᆋ":"ᅮᅥー","ᅰ":"ᅮᅥ丨","ㅞ":"ᅮᅥ丨","ힵ":"ᅮᅧ","ᆌ":"ᅮᅧ丨","ᆍ":"ᅮᅮ","ᅱ":"ᅮ丨","ㅟ":"ᅮ丨","ힶ":"ᅮ丨丨","ㅠ":"ᅲ","ᆎ":"ᅲᅡ","ힷ":"ᅲᅡ丨","ᆏ":"ᅲᅥ","ᆐ":"ᅲᅥ丨","ᆑ":"ᅲᅧ","ㆊ":"ᅲᅧ","ᆒ":"ᅲᅧ丨","ㆋ":"ᅲᅧ丨","ힸ":"ᅲᅩ","ᆓ":"ᅲᅮ","ᆔ":"ᅲ丨","ㆌ":"ᅲ丨","ㆍ":"ᆞ","ퟅ":"ᆞᅡ","ᆟ":"ᆞᅥ","ퟆ":"ᆞᅥ丨","ᆠ":"ᆞᅮ","ᆢ":"ᆞᆞ","ᆡ":"ᆞ丨","ㆎ":"ᆞ丨","ヘ":"へ","⍁":"〼","⧄":"〼","꒞":"ꁊ","꒬":"ꁐ","꒜":"ꃀ","꒨":"ꄲ","꒿":"ꉙ","꒾":"ꊱ","꒔":"ꋍ","꓀":"ꎫ","꓂":"ꎵ","꒺":"ꎿ","꒰":"ꏂ","꒧":"ꑘ","⊥":"ꓕ","⟂":"ꓕ","𝈜":"ꓕ","Ʇ":"ꓕ","Ꞟ":"ꓤ","⅁":"ꓨ","⅂":"ꓶ","𝈕":"ꓶ","𝈫":"ꓶ","𖼦":"ꓶ","𐐑":"ꓶ","⅃":"𖼀","𑫦":"𑫥𑫯","𑫨":"𑫥𑫥","𑫩":"𑫥𑫥𑫯","𑫪":"𑫥𑫥𑫰","𑫧":"𑫥𑫰","𑫴":"𑫳𑫯","𑫶":"𑫳𑫳","𑫷":"𑫳𑫳𑫯","𑫸":"𑫳𑫳𑫰","𑫵":"𑫳𑫰","𑫬":"𑫫𑫯","𑫭":"𑫫𑫫","𑫮":"𑫫𑫫𑫯","⊕":"𐊨","⨁":"𐊨","🜨":"𐊨","Ꚛ":"𐊨","▽":"𐊼","𝈔":"𐊼","🜄":"𐊼","⧖":"𐋀","ꞛ":"𐐺","Ꞛ":"𐐒","𐒠":"𐒆","𐏑":"𐎂","𐏓":"𐎓","𒀸":"𐎚","☥":"𐦞","𓋹":"𐦞","〹":"卄","不":"不","丽":"丽","並":"並","⎜":"丨","⎟":"丨","⎢":"丨","⎥":"丨","⎪":"丨","⎮":"丨","㇑":"丨","ᅵ":"丨","ㅣ":"丨","⼁":"丨","ᆜ":"丨ー","ᆘ":"丨ᅡ","ᆙ":"丨ᅣ","ힽ":"丨ᅣᅩ","ힾ":"丨ᅣ丨","ힿ":"丨ᅧ","ퟀ":"丨ᅧ丨","ᆚ":"丨ᅩ","ퟁ":"丨ᅩ丨","ퟂ":"丨ᅭ","ᆛ":"丨ᅮ","ퟃ":"丨ᅲ","ᆝ":"丨ᆞ","ퟄ":"丨丨","串":"串","丸":"丸","丹":"丹","乁":"乁","㇠":"乙","⼄":"乙","㇟":"乚","⺃":"乚","㇖":"乛","⺂":"乛","⻲":"亀","亂":"亂","㇚":"亅","⼅":"亅","了":"了","ニ":"二","⼆":"二","𠄢":"𠄢","⼇":"亠","亮":"亮","⼈":"人","イ":"亻","⺅":"亻","什":"什","仌":"仌","令":"令","你":"你","倂":"併","倂":"併","侀":"侀","來":"來","例":"例","侮":"侮","侮":"侮","侻":"侻","便":"便","值":"値","倫":"倫","偺":"偺","備":"備","像":"像","僚":"僚","僧":"僧","僧":"僧","㒞":"㒞","⼉":"儿","兀":"兀","⺎":"兀","充":"充","免":"免","免":"免","兔":"兔","兤":"兤","⼊":"入","內":"內","全":"全","兩":"兩","ハ":"八","⼋":"八","六":"六","具":"具","𠔜":"𠔜","𠔥":"𠔥","冀":"冀","㒹":"㒹","⼌":"冂","再":"再","𠕋":"𠕋","冒":"冒","冕":"冕","㒻":"㒻","最":"最","⼍":"冖","冗":"冗","冤":"冤","⼎":"冫","冬":"冬","况":"况","况":"况","冷":"冷","凉":"凉","凌":"凌","凜":"凜","凞":"凞","⼏":"几","𠘺":"𠘺","凵":"凵","⼐":"凵","⼑":"刀","⺉":"刂","刃":"刃","切":"切","切":"切","列":"列","利":"利","㓟":"㓟","刺":"刺","刻":"刻","剆":"剆","割":"割","剷":"剷","劉":"劉","𠠄":"𠠄","カ":"力","力":"力","⼒":"力","劣":"劣","㔕":"㔕","劳":"劳","勇":"勇","勇":"勇","勉":"勉","勉":"勉","勒":"勒","勞":"勞","勤":"勤","勤":"勤","勵":"勵","⼓":"勹","勺":"勺","勺":"勺","包":"包","匆":"匆","𠣞":"𠣞","⼔":"匕","北":"北","北":"北","⼕":"匚","⼖":"匸","匿":"匿","⼗":"十","〸":"十","〺":"卅","卉":"卉","࿖":"卍","࿕":"卐","卑":"卑","卑":"卑","博":"博","ト":"卜","⼘":"卜","⼙":"卩","⺋":"㔾","即":"即","卵":"卵","卽":"卽","卿":"卿","卿":"卿","卿":"卿","⼚":"厂","𠨬":"𠨬","⼛":"厶","參":"參","⼜":"又","及":"及","叟":"叟","𠭣":"𠭣","ロ":"口","⼝":"口","囗":"口","⼞":"口","句":"句","叫":"叫","叱":"叱","吆":"吆","吏":"吏","吝":"吝","吸":"吸","呂":"呂","呈":"呈","周":"周","咞":"咞","咢":"咢","咽":"咽","䎛":"㖈","哶":"哶","唐":"唐","啓":"啓","啟":"啓","啕":"啕","啣":"啣","善":"善","善":"善","喇":"喇","喙":"喙","喙":"喙","喝":"喝","喝":"喝","喫":"喫","喳":"喳","嗀":"嗀","嗂":"嗂","嗢":"嗢","嘆":"嘆","嘆":"嘆","噑":"噑","噴":"噴","器":"器","囹":"囹","圖":"圖","圗":"圗","⼟":"土","士":"土","⼠":"土","型":"型","城":"城","㦳":"㘽","埴":"埴","堍":"堍","報":"報","堲":"堲","塀":"塀","塚":"塚","塚":"塚","塞":"塞","填":"塡","壿":"墫","墬":"墬","墳":"墳","壘":"壘","壟":"壟","𡓤":"𡓤","壮":"壮","売":"売","壷":"壷","⼡":"夂","夆":"夆","⼢":"夊","タ":"夕","⼣":"夕","多":"多","夢":"夢","⼤":"大","奄":"奄","奈":"奈","契":"契","奔":"奔","奢":"奢","女":"女","⼥":"女","𡚨":"𡚨","𡛪":"𡛪","姘":"姘","姬":"姬","娛":"娛","娧":"娧","婢":"婢","婦":"婦","嬀":"媯","㛮":"㛮","㛼":"㛼","媵":"媵","嬈":"嬈","嬨":"嬨","嬾":"嬾","嬾":"嬾","⼦":"子","⼧":"宀","宅":"宅","𡧈":"𡧈","寃":"寃","寘":"寘","寧":"寧","寧":"寧","寧":"寧","寮":"寮","寳":"寳","𡬘":"𡬘","⼨":"寸","寿":"寿","将":"将","⼩":"小","尢":"尢","⺐":"尢","⼪":"尢","⺏":"尣","㞁":"㞁","⼫":"尸","尿":"尿","屠":"屠","屢":"屢","層":"層","履":"履","屮":"屮","屮":"屮","⼬":"屮","𡴋":"𡴋","⼭":"山","峀":"峀","岍":"岍","𡷤":"𡷤","𡷦":"𡷦","崙":"崙","嵃":"嵃","嵐":"嵐","嵫":"嵫","嵮":"嵮","嵼":"嵼","嶲":"嶲","嶺":"嶺","⼮":"巛","巢":"巢","エ":"工","⼯":"工","⼰":"己","⺒":"巳","㠯":"㠯","巽":"巽","⼱":"巾","帲":"帡","帨":"帨","帽":"帽","幩":"幩","㡢":"㡢","𢆃":"𢆃","⼲":"干","年":"年","𢆟":"𢆟","⺓":"幺","⼳":"幺","⼴":"广","度":"度","㡼":"㡼","庰":"庰","庳":"庳","庶":"庶","廊":"廊","廊":"廊","廉":"廉","廒":"廒","廓":"廓","廙":"廙","廬":"廬","⼵":"廴","廾":"廾","⼶":"廾","𢌱":"𢌱","𢌱":"𢌱","弄":"弄","⼷":"弋","⼸":"弓","弢":"弢","弢":"弢","⼹":"彐","⺔":"彑","当":"当","㣇":"㣇","⼺":"彡","形":"形","彩":"彩","彫":"彫","⼻":"彳","律":"律","㣣":"㣣","徚":"徚","復":"復","徭":"徭","⼼":"心","⺖":"忄","⺗":"㣺","忍":"忍","志":"志","念":"念","忹":"忹","怒":"怒","怜":"怜","恵":"恵","㤜":"㤜","㤺":"㤺","悁":"悁","悔":"悔","悔":"悔","惇":"惇","惘":"惘","惡":"惡","𢛔":"𢛔","愈":"愈","慨":"慨","慄":"慄","慈":"慈","慌":"慌","慌":"慌","慎":"慎","慎":"慎","慠":"慠","慺":"慺","憎":"憎","憎":"憎","憎":"憎","憐":"憐","憤":"憤","憯":"憯","憲":"憲","𢡄":"𢡄","𢡊":"𢡊","懞":"懞","懲":"懲","懲":"懲","懲":"懲","懶":"懶","懶":"懶","戀":"戀","⼽":"戈","成":"成","戛":"戛","戮":"戮","戴":"戴","⼾":"戶","戸":"戶","⼿":"手","⺘":"扌","扝":"扝","抱":"抱","拉":"拉","拏":"拏","拓":"拓","拔":"拔","拼":"拼","拾":"拾","𢬌":"𢬌","挽":"挽","捐":"捐","捨":"捨","捻":"捻","掃":"掃","掠":"掠","掩":"掩","揄":"揄","揤":"揤","摒":"摒","𢯱":"𢯱","搜":"搜","搢":"搢","揅":"揅","摩":"摩","摷":"摷","摾":"摾","㨮":"㨮","搉":"㩁","撚":"撚","撝":"撝","擄":"擄","㩬":"㩬","⽀":"支","⽁":"攴","⺙":"攵","敏":"敏","敏":"敏","敖":"敖","敬":"敬","數":"數","𣀊":"𣀊","⽂":"文","⻫":"斉","⽃":"斗","料":"料","⽄":"斤","⽅":"方","旅":"旅","⽆":"无","⺛":"旡","既":"既","旣":"旣","⽇":"日","易":"易","曶":"㫚","㫤":"㫤","晉":"晉","晩":"晚","晴":"晴","晴":"晴","暑":"暑","暑":"暑","暈":"暈","㬈":"㬈","暜":"暜","暴":"暴","曆":"曆","㬙":"㬙","𣊸":"𣊸","⽈":"曰","更":"更","書":"書","⽉":"月","𣍟":"𣍟","肦":"朌","胐":"朏","胊":"朐","脁":"朓","胶":"㬵","朗":"朗","朗":"朗","朗":"朗","脧":"朘","望":"望","望":"望","幐":"㬺","䐠":"㬻","𣎓":"𣎓","膧":"朣","𣎜":"𣎜","⽊":"木","李":"李","杓":"杓","杖":"杖","杞":"杞","𣏃":"𣏃","柿":"杮","杻":"杻","枅":"枅","林":"林","㭉":"㭉","𣏕":"𣏕","柳":"柳","柺":"柺","栗":"栗","栟":"栟","桒":"桒","𣑭":"𣑭","梁":"梁","梅":"梅","梅":"梅","梎":"梎","梨":"梨","椔":"椔","楂":"楂","㮝":"㮝","㮝":"㮝","槩":"㮣","樧":"榝","榣":"榣","槪":"槪","樂":"樂","樂":"樂","樂":"樂","樓":"樓","𣚣":"𣚣","檨":"檨","櫓":"櫓","櫛":"櫛","欄":"欄","㰘":"㰘","⽋":"欠","次":"次","𣢧":"𣢧","歔":"歔","㱎":"㱎","⽌":"止","⻭":"歯","歲":"歲","歷":"歷","歹":"歹","⽍":"歹","⺞":"歺","殟":"殟","殮":"殮","⽎":"殳","殺":"殺","殺":"殺","殺":"殺","殻":"殻","𣪍":"𣪍","⽏":"毋","⺟":"母","𣫺":"𣫺","⽐":"比","⽑":"毛","⽒":"氏","⺠":"民","⽓":"气","⽔":"水","⺡":"氵","⺢":"氺","汎":"汎","汧":"汧","沈":"沈","沿":"沿","泌":"泌","泍":"泍","泥":"泥","𣲼":"𣲼","洛":"洛","洞":"洞","洴":"洴","派":"派","流":"流","流":"流","流":"流","洖":"洖","浩":"浩","浪":"浪","海":"海","海":"海","浸":"浸","涅":"涅","𣴞":"𣴞","淋":"淋","淚":"淚","淪":"淪","淹":"淹","渚":"渚","港":"港","湮":"湮","潙":"溈","滋":"滋","滋":"滋","溜":"溜","溺":"溺","滇":"滇","滑":"滑","滛":"滛","㴳":"㴳","漏":"漏","漢":"漢","漢":"漢","漣":"漣","𣻑":"𣻑","潮":"潮","𣽞":"𣽞","𣾎":"𣾎","濆":"濆","濫":"濫","濾":"濾","瀛":"瀛","瀞":"瀞","瀞":"瀞","瀹":"瀹","灊":"灊","㶖":"㶖","⽕":"火","⺣":"灬","灰":"灰","灷":"灷","災":"災","炙":"炙","炭":"炭","烈":"烈","烙":"烙","煮":"煮","煮":"煮","𤉣":"𤉣","煅":"煅","煉":"煉","𤋮":"𤋮","熜":"熜","燎":"燎","燐":"燐","𤎫":"𤎫","爐":"爐","爛":"爛","爨":"爨","⽖":"爪","爫":"爫","⺤":"爫","爵":"爵","爵":"爵","⽗":"父","⽘":"爻","⺦":"丬","⽙":"爿","⽚":"片","牐":"牐","⽛":"牙","𤘈":"𤘈","⽜":"牛","牢":"牢","犀":"犀","犕":"犕","⽝":"犬","⺨":"犭","犯":"犯","狀":"狀","𤜵":"𤜵","狼":"狼","猪":"猪","猪":"猪","𤠔":"𤠔","獵":"獵","獺":"獺","⽞":"玄","率":"率","率":"率","⽟":"玉","王":"王","㺬":"㺬","玥":"玥","玲":"玲","㺸":"㺸","㺸":"㺸","珞":"珞","琉":"琉","理":"理","琢":"琢","瑇":"瑇","瑜":"瑜","瑩":"瑩","瑱":"瑱","瑱":"瑱","璅":"璅","璉":"璉","璘":"璘","瓊":"瓊","⽠":"瓜","⽡":"瓦","㼛":"㼛","甆":"甆","⽢":"甘","⽣":"生","甤":"甤","⽤":"用","⽥":"田","画":"画","甾":"甾","𤰶":"𤰶","留":"留","略":"略","異":"異","異":"異","𤲒":"𤲒","⽦":"疋","⽧":"疒","痢":"痢","瘐":"瘐","瘟":"瘟","瘝":"瘝","療":"療","癩":"癩","⽨":"癶","⽩":"白","𤾡":"𤾡","𤾸":"𤾸","⽪":"皮","⽫":"皿","𥁄":"𥁄","㿼":"㿼","益":"益","益":"益","盛":"盛","盧":"盧","䀈":"䀈","⽬":"目","直":"直","直":"直","𥃲":"𥃲","𥃳":"𥃳","省":"省","䀘":"䀘","𥄙":"𥄙","眞":"眞","真":"真","真":"真","𥄳":"𥄳","着":"着","睊":"睊","睊":"睊","鿃":"䀹","䀹":"䀹","䀹":"䀹","晣":"䀿","䁆":"䁆","瞋":"瞋","𥉉":"𥉉","瞧":"瞧","⽭":"矛","⽮":"矢","⽯":"石","䂖":"䂖","𥐝":"𥐝","硏":"研","硎":"硎","硫":"硫","碌":"碌","碌":"碌","碑":"碑","磊":"磊","磌":"磌","磌":"磌","磻":"磻","䃣":"䃣","礪":"礪","⽰":"示","⺭":"礻","礼":"礼","社":"社","祈":"祈","祉":"祉","𥘦":"𥘦","祐":"祐","祖":"祖","祖":"祖","祝":"祝","神":"神","祥":"祥","視":"視","視":"視","祿":"祿","𥚚":"𥚚","禍":"禍","禎":"禎","福":"福","福":"福","𥛅":"𥛅","禮":"禮","⽱":"禸","⽲":"禾","秊":"秊","䄯":"䄯","秫":"秫","稜":"稜","穊":"穊","穀":"穀","穀":"穀","穏":"穏","⽳":"穴","突":"突","𥥼":"𥥼","窱":"窱","立":"立","⽴":"立","⻯":"竜","𥪧":"𥪧","𥪧":"𥪧","竮":"竮","⽵":"竹","笠":"笠","節":"節","節":"節","䈂":"䈂","𥮫":"𥮫","篆":"篆","䈧":"䈧","築":"築","𥲀":"𥲀","𥳐":"𥳐","簾":"簾","籠":"籠","⽶":"米","类":"类","粒":"粒","精":"精","糒":"糒","糖":"糖","糨":"糨","䊠":"䊠","糣":"糣","糧":"糧","⽷":"糸","⺯":"糹","𥾆":"𥾆","紀":"紀","紐":"紐","索":"索","累":"累","絶":"絕","絣":"絣","絛":"絛","綠":"綠","綾":"綾","緇":"緇","練":"練","練":"練","練":"練","縂":"縂","䌁":"䌁","縉":"縉","縷":"縷","繁":"繁","繅":"繅","𦇚":"𦇚","䌴":"䌴","⽸":"缶","𦈨":"𦈨","缾":"缾","𦉇":"𦉇","⽹":"网","⺫":"罒","⺲":"罒","⺱":"罓","䍙":"䍙","署":"署","𦋙":"𦋙","罹":"罹","罺":"罺","羅":"羅","𦌾":"𦌾","⽺":"羊","羕":"羕","羚":"羚","羽":"羽","⽻":"羽","翺":"翺","老":"老","⽼":"老","⺹":"耂","者":"者","者":"者","者":"者","⽽":"而","𦓚":"𦓚","⽾":"耒","𦔣":"𦔣","⽿":"耳","聆":"聆","聠":"聠","𦖨":"𦖨","聯":"聯","聰":"聰","聾":"聾","⾀":"聿","⺺":"肀","⾁":"肉","肋":"肋","肭":"肭","育":"育","䏕":"䏕","䏙":"䏙","腁":"胼","脃":"脃","脾":"脾","䐋":"䐋","朡":"朡","𦞧":"𦞧","𦞵":"𦞵","朦":"䑃","臘":"臘","⾂":"臣","臨":"臨","⾃":"自","臭":"臭","⾄":"至","⾅":"臼","舁":"舁","舁":"舁","舄":"舄","⾆":"舌","舘":"舘","⾇":"舛","⾈":"舟","䑫":"䑫","⾉":"艮","良":"良","⾊":"色","⾋":"艸","艹":"艹","艹":"艹","⺾":"艹","⺿":"艹","⻀":"艹","芋":"芋","芑":"芑","芝":"芝","花":"花","芳":"芳","芽":"芽","若":"若","若":"若","苦":"苦","𦬼":"𦬼","茶":"茶","荒":"荒","荣":"荣","茝":"茝","茣":"茣","莽":"莽","荓":"荓","菉":"菉","菊":"菊","菌":"菌","菜":"菜","菧":"菧","華":"華","菱":"菱","著":"著","著":"著","𦰶":"𦰶","莭":"莭","落":"落","葉":"葉","蔿":"蒍","𦳕":"𦳕","𦵫":"𦵫","蓮":"蓮","蓱":"蓱","蓳":"蓳","蓼":"蓼","蔖":"蔖","䔫":"䔫","蕤":"蕤","𦼬":"𦼬","藍":"藍","䕝":"䕝","𦾱":"𦾱","䕡":"䕡","藺":"藺","蘆":"蘆","䕫":"䕫","蘒":"蘒","蘭":"蘭","𧃒":"𧃒","虁":"蘷","蘿":"蘿","⾌":"虍","⻁":"虎","虐":"虐","虜":"虜","虜":"虜","虧":"虧","虩":"虩","⾍":"虫","蚩":"蚩","蚈":"蚈","蛢":"蛢","蜎":"蜎","蜨":"蜨","蝫":"蝫","蟡":"蟡","蝹":"蝹","蝹":"蝹","螆":"螆","䗗":"䗗","𧏊":"𧏊","螺":"螺","蠁":"蠁","䗹":"䗹","蠟":"蠟","⾎":"血","行":"行","⾏":"行","衠":"衠","衣":"衣","⾐":"衣","⻂":"衤","裂":"裂","𧙧":"𧙧","裏":"裏","裗":"裗","裞":"裞","裡":"裡","裸":"裸","裺":"裺","䘵":"䘵","褐":"褐","襁":"襁","襤":"襤","⾑":"襾","⻄":"西","⻃":"覀","覆":"覆","見":"見","⾒":"見","𧢮":"𧢮","⻅":"见","⾓":"角","⾔":"言","𧥦":"𧥦","詽":"訮","訞":"䚶","䚾":"䚾","䛇":"䛇","誠":"誠","說":"說","說":"說","調":"調","請":"請","諒":"諒","論":"論","諭":"諭","諭":"諭","諸":"諸","諸":"諸","諾":"諾","諾":"諾","謁":"謁","謁":"謁","謹":"謹","謹":"謹","識":"識","讀":"讀","讏":"讆","變":"變","變":"變","⻈":"讠","⾕":"谷","⾖":"豆","豈":"豈","豕":"豕","⾗":"豕","豣":"豜","⾘":"豸","𧲨":"𧲨","⾙":"貝","貫":"貫","賁":"賁","賂":"賂","賈":"賈","賓":"賓","贈":"贈","贈":"贈","贛":"贛","⻉":"贝","⾚":"赤","⾛":"走","起":"起","趆":"赿","𧻓":"𧻓","𧼯":"𧼯","⾜":"足","跋":"跋","趼":"趼","跺":"跥","路":"路","跰":"跰","躛":"躗","⾝":"身","車":"車","⾞":"車","軔":"軔","輧":"軿","輦":"輦","輪":"輪","輸":"輸","輸":"輸","輻":"輻","轢":"轢","⻋":"车","⾟":"辛","辞":"辞","辰":"辰","⾠":"辰","⾡":"辵","辶":"辶","⻌":"辶","⻍":"辶","巡":"巡","連":"連","逸":"逸","逸":"逸","遲":"遲","遼":"遼","𨗒":"𨗒","𨗭":"𨗭","邏":"邏","⾢":"邑","邔":"邔","郎":"郎","郞":"郎","郞":"郎","郱":"郱","都":"都","𨜮":"𨜮","鄑":"鄑","鄛":"鄛","⾣":"酉","酪":"酪","醙":"醙","醴":"醴","⾤":"釆","里":"里","⾥":"里","量":"量","金":"金","⾦":"金","鈴":"鈴","鈸":"鈸","鉶":"鉶","鋗":"鋗","鋘":"鋘","鉼":"鉼","錄":"錄","鍊":"鍊","鎮":"鎭","鏹":"鏹","鐕":"鐕","𨯺":"𨯺","⻐":"钅","⻑":"長","⾧":"長","⻒":"镸","⻓":"长","⾨":"門","開":"開","䦕":"䦕","閭":"閭","閷":"閷","𨵷":"𨵷","⻔":"门","⾩":"阜","⻏":"阝","⻖":"阝","阮":"阮","陋":"陋","降":"降","陵":"陵","陸":"陸","陼":"陼","隆":"隆","隣":"隣","䧦":"䧦","⾪":"隶","隷":"隷","隸":"隷","隸":"隷","⾫":"隹","雃":"雃","離":"離","難":"難","難":"難","⾬":"雨","零":"零","雷":"雷","霣":"霣","𩅅":"𩅅","露":"露","靈":"靈","⾭":"靑","⻘":"青","靖":"靖","靖":"靖","𩇟":"𩇟","⾮":"非","⾯":"面","𩈚":"𩈚","⾰":"革","䩮":"䩮","䩶":"䩶","⾱":"韋","韛":"韛","韠":"韠","⻙":"韦","⾲":"韭","𩐊":"𩐊","⾳":"音","響":"響","響":"響","⾴":"頁","䪲":"䪲","頋":"頋","頋":"頋","頋":"頋","領":"領","頩":"頩","𩒖":"𩒖","頻":"頻","頻":"頻","類":"類","⻚":"页","⾵":"風","𩖶":"𩖶","⻛":"风","⾶":"飛","⻜":"飞","⻝":"食","⾷":"食","⻟":"飠","飢":"飢","飯":"飯","飼":"飼","䬳":"䬳","館":"館","餩":"餩","⻠":"饣","⾸":"首","⾹":"香","馧":"馧","⾺":"馬","駂":"駂","駱":"駱","駾":"駾","驪":"驪","⻢":"马","⾻":"骨","䯎":"䯎","⾼":"高","⾽":"髟","𩬰":"𩬰","鬒":"鬒","鬒":"鬒","⾾":"鬥","⾿":"鬯","⿀":"鬲","⿁":"鬼","⻤":"鬼","⿂":"魚","魯":"魯","鱀":"鱀","鱗":"鱗","⻥":"鱼","⿃":"鳥","鳽":"鳽","䳎":"䳎","鵧":"鵧","䳭":"䳭","𪃎":"𪃎","鶴":"鶴","𪄅":"𪄅","䳸":"䳸","鷺":"鷺","𪈎":"𪈎","鸞":"鸞","鹃":"鹂","⿄":"鹵","鹿":"鹿","⿅":"鹿","𪊑":"𪊑","麗":"麗","麟":"麟","⿆":"麥","⻨":"麦","麻":"麻","⿇":"麻","𪎒":"𪎒","⿈":"黃","⻩":"黄","⿉":"黍","黎":"黎","䵖":"䵖","⿊":"黑","黒":"黑","墨":"墨","黹":"黹","⿋":"黹","⿌":"黽","鼅":"鼅","黾":"黾","⿍":"鼎","鼏":"鼏","⿎":"鼓","鼖":"鼖","⿏":"鼠","鼻":"鼻","⿐":"鼻","齃":"齃","⿑":"齊","⻬":"齐","⿒":"齒","𪘀":"𪘀","⻮":"齿","龍":"龍","⿓":"龍","龎":"龎","⻰":"龙","龜":"龜","龜":"龜","龜":"龜","⿔":"龜","⻳":"龟","⿕":"龠"}');

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd define */
/******/ 	(() => {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk preload function */
/******/ 	(() => {
/******/ 		__webpack_require__.H = {};
/******/ 		__webpack_require__.G = (chunkId) => {
/******/ 			Object.keys(__webpack_require__.H).map((key) => {
/******/ 				__webpack_require__.H[key](chunkId);
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "bundles/" + __webpack_require__.h() + "/" + ({"532":"styles","2640":"compatibility-view","4317":"error-view","4410":"init","5802":"element-web-component-index","8673":"element-web-app"}[chunkId] || chunkId) + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames not based on template
/******/ 			if (chunkId === 4296) return "bundles/" + __webpack_require__.h() + "/bundle.css";
/******/ 			// return url for filenames based on template
/******/ 			return "bundles/" + __webpack_require__.h() + "/" + ({"532":"styles","2640":"compatibility-view","4317":"error-view","4410":"init","5802":"element-web-component-index","8673":"element-web-app"}[chunkId] || chunkId) + ".css";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("64025964791874835ae8")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "hisease-im-web:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		var createStylesheet = (fullhref, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			linkTag.onload = resolve;
/******/ 			linkTag.onerror = function(event) {
/******/ 				var request = event && event.target && event.target.src || fullhref;
/******/ 				var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 				err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 				err.request = request;
/******/ 				linkTag.parentNode.removeChild(linkTag)
/******/ 				reject(err);
/******/ 			};
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			var head = document.getElementsByTagName("head")[0];
/******/ 			head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// object to store loaded CSS chunks
/******/ 		var installedCssChunks = {
/******/ 			4296: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.miniCss = (chunkId, promises) => {
/******/ 			var cssChunks = {"532":1,"2640":1,"4317":1};
/******/ 			if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 			else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 				promises.push(installedCssChunks[chunkId] = loadStylesheet(chunkId).then(() => {
/******/ 					installedCssChunks[chunkId] = 0;
/******/ 				}, (e) => {
/******/ 					delete installedCssChunks[chunkId];
/******/ 					throw e;
/******/ 				}));
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no hmr
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			4296: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		__webpack_require__.H.j = (chunkId) => {
/******/ 			if((!__webpack_require__.o(installedChunks, chunkId) || installedChunks[chunkId] === undefined) && true) {
/******/ 				installedChunks[chunkId] = null;
/******/ 				var link = document.createElement('link');
/******/ 		
/******/ 				link.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					link.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				link.rel = "preload";
/******/ 				link.as = "script";
/******/ 				link.href = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 				document.head.appendChild(link);
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk preload trigger */
/******/ 	(() => {
/******/ 		var chunkToChildrenMap = {
/******/ 			"4410": [
/******/ 				6111,
/******/ 				8673,
/******/ 				5802
/******/ 			]
/******/ 		};
/******/ 		__webpack_require__.f.preload = (chunkId) => {
/******/ 			var chunks = chunkToChildrenMap[chunkId];
/******/ 			Array.isArray(chunks) && chunks.map(__webpack_require__.G);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(__webpack_require__.s = 318481);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map