/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 864:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;

      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType || !storageKey) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;

    return defaultLogger;
}));


/***/ }),

/***/ 693:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const retry = __webpack_require__(353);

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

/***/ 353:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(846);

/***/ }),

/***/ 846:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var RetryOperation = __webpack_require__(960);

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

/***/ 960:
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

/***/ 67:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



var data = __webpack_require__(873);

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

/***/ 873:
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./node_modules/matrix-js-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
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
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/node_modules/loglevel/lib/loglevel.js
var loglevel = __webpack_require__(864);
var loglevel_default = /*#__PURE__*/__webpack_require__.n(loglevel);
;// CONCATENATED MODULE: ./node_modules/matrix-js-sdk/src/logger.ts
/*
Copyright 2018 André Jaenisch
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
 * @module logger
 */



// This is to demonstrate, that you can use any namespace you want.
// Namespaces allow you to turn on/off the logging for specific parts of the
// application.
// An idea would be to control this via an environment variable (on Node.js).
// See https://www.npmjs.com/package/debug to see how this could be implemented
// Part of #332 is introducing a logging library in the first place.
const DEFAULT_NAMESPACE = "matrix";

// because rageshakes in react-sdk hijack the console log, also at module load time,
// initializing the logger here races with the initialization of rageshakes.
// to avoid the issue, we override the methodFactory of loglevel that binds to the
// console methods at initialization time by a factory that looks up the console methods
// when logging so we always get the current value of console methods.
(loglevel_default()).methodFactory = function (methodName, logLevel, loggerName) {
  return function (...args) {
    /* eslint-disable @typescript-eslint/no-invalid-this */
    if (this.prefix) {
      args.unshift(this.prefix);
    }
    /* eslint-enable @typescript-eslint/no-invalid-this */
    const supportedByConsole = methodName === "error" || methodName === "warn" || methodName === "trace" || methodName === "info";
    /* eslint-disable no-console */
    if (supportedByConsole) {
      return console[methodName](...args);
    } else {
      return console.log(...args);
    }
    /* eslint-enable no-console */
  };
};

/**
 * Drop-in replacement for <code>console</code> using {@link https://www.npmjs.com/package/loglevel|loglevel}.
 * Can be tailored down to specific use cases if needed.
 */
const logger = loglevel_default().getLogger(DEFAULT_NAMESPACE);
logger.setLevel((loglevel_default()).levels.DEBUG, false);
function extendLogger(logger) {
  logger.withPrefix = function (prefix) {
    const existingPrefix = this.prefix || "";
    return getPrefixedLogger(existingPrefix + prefix);
  };
}
extendLogger(logger);
function getPrefixedLogger(prefix) {
  const prefixLogger = loglevel_default().getLogger(`${DEFAULT_NAMESPACE}-${prefix}`);
  if (prefixLogger.prefix !== prefix) {
    // Only do this setup work the first time through, as loggers are saved by name.
    extendLogger(prefixLogger);
    prefixLogger.prefix = prefix;
    prefixLogger.setLevel((loglevel_default()).levels.DEBUG, false);
  }
  return prefixLogger;
}
// EXTERNAL MODULE: ./node_modules/unhomoglyph/index.js
var node_modules_unhomoglyph = __webpack_require__(67);
// EXTERNAL MODULE: ./node_modules/p-retry/index.js
var p_retry = __webpack_require__(693);
;// CONCATENATED MODULE: ./node_modules/matrix-js-sdk/src/utils.ts
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
    return unhomoglyph(str.normalize('NFD').replace(removeHiddenCharsRegex, ''));
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
  return promiseRetry(attempt => {
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
let utils_crypto;
function setCrypto(c) {
  utils_crypto = c;
}
function getCrypto() {
  return utils_crypto;
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
;// CONCATENATED MODULE: ./node_modules/matrix-js-sdk/src/sync-accumulator.ts

/*
Copyright 2017 - 2021 The Matrix.org Foundation C.I.C.

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
 * This is an internal module. See {@link SyncAccumulator} for the public class.
 * @module sync-accumulator
 */




/* eslint-disable camelcase */

/* eslint-enable camelcase */

let Category = /*#__PURE__*/function (Category) {
  Category["Invite"] = "invite";
  Category["Leave"] = "leave";
  Category["Join"] = "join";
  return Category;
}({});
/**
 * The purpose of this class is to accumulate /sync responses such that a
 * complete "initial" JSON response can be returned which accurately represents
 * the sum total of the /sync responses accumulated to date. It only handles
 * room data: that is, everything under the "rooms" top-level key.
 *
 * This class is used when persisting room data so a complete /sync response can
 * be loaded from disk and incremental syncs can be performed on the server,
 * rather than asking the server to do an initial sync on startup.
 */
class SyncAccumulator {
  /**
   * @param {Object} opts
   * @param {Number=} opts.maxTimelineEntries The ideal maximum number of
   * timeline entries to keep in the sync response. This is best-effort, as
   * clients do not always have a back-pagination token for each event, so
   * it's possible there may be slightly *less* than this value. There will
   * never be more. This cannot be 0 or else it makes it impossible to scroll
   * back in a room. Default: 50.
   */
  constructor(opts = {}) {
    this.opts = opts;
    _defineProperty(this, "accountData", {});
    // $event_type: Object
    _defineProperty(this, "inviteRooms", {});
    // $roomId: { ... sync 'invite' json data ... }
    _defineProperty(this, "joinRooms", {});
    // the /sync token which corresponds to the last time rooms were
    // accumulated. We remember this so that any caller can obtain a
    // coherent /sync response and know at what point they should be
    // streaming from without losing events.
    _defineProperty(this, "nextBatch", null);
    // { ('invite'|'join'|'leave'): $groupId: { ... sync 'group' data } }
    _defineProperty(this, "groups", {
      invite: {},
      join: {},
      leave: {}
    });
    this.opts.maxTimelineEntries = this.opts.maxTimelineEntries || 50;
  }
  accumulate(syncResponse, fromDatabase = false) {
    this.accumulateRooms(syncResponse, fromDatabase);
    this.accumulateGroups(syncResponse);
    this.accumulateAccountData(syncResponse);
    this.nextBatch = syncResponse.next_batch;
  }
  accumulateAccountData(syncResponse) {
    if (!syncResponse.account_data || !syncResponse.account_data.events) {
      return;
    }
    // Clobbers based on event type.
    syncResponse.account_data.events.forEach(e => {
      this.accountData[e.type] = e;
    });
  }

  /**
   * Accumulate incremental /sync room data.
   * @param {Object} syncResponse the complete /sync JSON
   * @param {boolean} fromDatabase True if the sync response is one saved to the database
   */
  accumulateRooms(syncResponse, fromDatabase = false) {
    if (!syncResponse.rooms) {
      return;
    }
    if (syncResponse.rooms.invite) {
      Object.keys(syncResponse.rooms.invite).forEach(roomId => {
        this.accumulateRoom(roomId, Category.Invite, syncResponse.rooms.invite[roomId], fromDatabase);
      });
    }
    if (syncResponse.rooms.join) {
      Object.keys(syncResponse.rooms.join).forEach(roomId => {
        this.accumulateRoom(roomId, Category.Join, syncResponse.rooms.join[roomId], fromDatabase);
      });
    }
    if (syncResponse.rooms.leave) {
      Object.keys(syncResponse.rooms.leave).forEach(roomId => {
        this.accumulateRoom(roomId, Category.Leave, syncResponse.rooms.leave[roomId], fromDatabase);
      });
    }
  }
  accumulateRoom(roomId, category, data, fromDatabase = false) {
    // Valid /sync state transitions
    //       +--------+ <======+            1: Accept an invite
    //   +== | INVITE |        | (5)        2: Leave a room
    //   |   +--------+ =====+ |            3: Join a public room previously
    //   |(1)            (4) | |               left (handle as if new room)
    //   V         (2)       V |            4: Reject an invite
    // +------+ ========> +--------+         5: Invite to a room previously
    // | JOIN |    (3)    | LEAVE* |            left (handle as if new room)
    // +------+ <======== +--------+
    //
    // * equivalent to "no state"
    switch (category) {
      case Category.Invite:
        // (5)
        this.accumulateInviteState(roomId, data);
        break;
      case Category.Join:
        if (this.inviteRooms[roomId]) {
          // (1)
          // was previously invite, now join. We expect /sync to give
          // the entire state and timeline on 'join', so delete previous
          // invite state
          delete this.inviteRooms[roomId];
        }
        // (3)
        this.accumulateJoinState(roomId, data, fromDatabase);
        break;
      case Category.Leave:
        if (this.inviteRooms[roomId]) {
          // (4)
          delete this.inviteRooms[roomId];
        } else {
          // (2)
          delete this.joinRooms[roomId];
        }
        break;
      default:
        logger.error("Unknown cateogory: ", category);
    }
  }
  accumulateInviteState(roomId, data) {
    if (!data.invite_state || !data.invite_state.events) {
      // no new data
      return;
    }
    if (!this.inviteRooms[roomId]) {
      this.inviteRooms[roomId] = {
        invite_state: data.invite_state
      };
      return;
    }
    // accumulate extra keys for invite->invite transitions
    // clobber based on event type / state key
    // We expect invite_state to be small, so just loop over the events
    const currentData = this.inviteRooms[roomId];
    data.invite_state.events.forEach(e => {
      let hasAdded = false;
      for (let i = 0; i < currentData.invite_state.events.length; i++) {
        const current = currentData.invite_state.events[i];
        if (current.type === e.type && current.state_key == e.state_key) {
          currentData.invite_state.events[i] = e; // update
          hasAdded = true;
        }
      }
      if (!hasAdded) {
        currentData.invite_state.events.push(e);
      }
    });
  }

  // Accumulate timeline and state events in a room.
  accumulateJoinState(roomId, data, fromDatabase = false) {
    // We expect this function to be called a lot (every /sync) so we want
    // this to be fast. /sync stores events in an array but we often want
    // to clobber based on type/state_key. Rather than convert arrays to
    // maps all the time, just keep private maps which contain
    // the actual current accumulated sync state, and array-ify it when
    // getJSON() is called.

    // State resolution:
    // The 'state' key is the delta from the previous sync (or start of time
    // if no token was supplied), to the START of the timeline. To obtain
    // the current state, we need to "roll forward" state by reading the
    // timeline. We want to store the current state so we can drop events
    // out the end of the timeline based on opts.maxTimelineEntries.
    //
    //      'state'     'timeline'     current state
    // |-------x<======================>x
    //          T   I   M   E
    //
    // When getJSON() is called, we 'roll back' the current state by the
    // number of entries in the timeline to work out what 'state' should be.

    // Back-pagination:
    // On an initial /sync, the server provides a back-pagination token for
    // the start of the timeline. When /sync deltas come down, they also
    // include back-pagination tokens for the start of the timeline. This
    // means not all events in the timeline have back-pagination tokens, as
    // it is only the ones at the START of the timeline which have them.
    // In order for us to have a valid timeline (and back-pagination token
    // to match), we need to make sure that when we remove old timeline
    // events, that we roll forward to an event which has a back-pagination
    // token. This means we can't keep a strict sliding-window based on
    // opts.maxTimelineEntries, and we may have a few less. We should never
    // have more though, provided that the /sync limit is less than or equal
    // to opts.maxTimelineEntries.

    if (!this.joinRooms[roomId]) {
      // Create truly empty objects so event types of 'hasOwnProperty' and co
      // don't cause this code to break.
      this.joinRooms[roomId] = {
        _currentState: Object.create(null),
        _timeline: [],
        _accountData: Object.create(null),
        _unreadNotifications: {},
        _summary: {},
        _readReceipts: {}
      };
    }
    const currentData = this.joinRooms[roomId];
    if (data.account_data && data.account_data.events) {
      // clobber based on type
      data.account_data.events.forEach(e => {
        currentData._accountData[e.type] = e;
      });
    }

    // these probably clobber, spec is unclear.
    if (data.unread_notifications) {
      currentData._unreadNotifications = data.unread_notifications;
    }
    if (data.summary) {
      const HEROES_KEY = "m.heroes";
      const INVITED_COUNT_KEY = "m.invited_member_count";
      const JOINED_COUNT_KEY = "m.joined_member_count";
      const acc = currentData._summary;
      const sum = data.summary;
      acc[HEROES_KEY] = sum[HEROES_KEY] || acc[HEROES_KEY];
      acc[JOINED_COUNT_KEY] = sum[JOINED_COUNT_KEY] || acc[JOINED_COUNT_KEY];
      acc[INVITED_COUNT_KEY] = sum[INVITED_COUNT_KEY] || acc[INVITED_COUNT_KEY];
    }
    if (data.ephemeral && data.ephemeral.events) {
      data.ephemeral.events.forEach(e => {
        // We purposefully do not persist m.typing events.
        // Technically you could refresh a browser before the timer on a
        // typing event is up, so it'll look like you aren't typing when
        // you really still are. However, the alternative is worse. If
        // we do persist typing events, it will look like people are
        // typing forever until someone really does start typing (which
        // will prompt Synapse to send down an actual m.typing event to
        // clobber the one we persisted).
        if (e.type !== "m.receipt" || !e.content) {
          // This means we'll drop unknown ephemeral events but that
          // seems okay.
          return;
        }
        // Handle m.receipt events. They clobber based on:
        //   (user_id, receipt_type)
        // but they are keyed in the event as:
        //   content:{ $event_id: { $receipt_type: { $user_id: {json} }}}
        // so store them in the former so we can accumulate receipt deltas
        // quickly and efficiently (we expect a lot of them). Fold the
        // receipt type into the key name since we only have 1 at the
        // moment (m.read) and nested JSON objects are slower and more
        // of a hassle to work with. We'll inflate this back out when
        // getJSON() is called.
        Object.keys(e.content).forEach(eventId => {
          if (!e.content[eventId]["m.read"]) {
            return;
          }
          Object.keys(e.content[eventId]["m.read"]).forEach(userId => {
            // clobber on user ID
            currentData._readReceipts[userId] = {
              data: e.content[eventId]["m.read"][userId],
              eventId: eventId
            };
          });
        });
      });
    }

    // if we got a limited sync, we need to remove all timeline entries or else
    // we will have gaps in the timeline.
    if (data.timeline && data.timeline.limited) {
      currentData._timeline = [];
    }

    // Work out the current state. The deltas need to be applied in the order:
    // - existing state which didn't come down /sync.
    // - State events under the 'state' key.
    // - State events in the 'timeline'.
    if (data.state && data.state.events) {
      data.state.events.forEach(e => {
        setState(currentData._currentState, e);
      });
    }
    if (data.timeline && data.timeline.events) {
      data.timeline.events.forEach((e, index) => {
        // this nops if 'e' isn't a state event
        setState(currentData._currentState, e);
        // append the event to the timeline. The back-pagination token
        // corresponds to the first event in the timeline
        let transformedEvent;
        if (!fromDatabase) {
          transformedEvent = Object.assign({}, e);
          if (transformedEvent.unsigned !== undefined) {
            transformedEvent.unsigned = Object.assign({}, transformedEvent.unsigned);
          }
          const age = e.unsigned ? e.unsigned.age : e.age;
          if (age !== undefined) transformedEvent._localTs = Date.now() - age;
        } else {
          transformedEvent = e;
        }
        const hasEvent = currentData._timeline.find(e => e.event.event_id === transformedEvent.event_id);
        if (!hasEvent) {
          currentData._timeline.push({
            event: transformedEvent,
            token: index === 0 ? data.timeline.prev_batch : null
          });
        }
      });
    }

    // attempt to prune the timeline by jumping between events which have
    // pagination tokens.
    if (currentData._timeline.length > this.opts.maxTimelineEntries) {
      const startIndex = currentData._timeline.length - this.opts.maxTimelineEntries;
      for (let i = startIndex; i < currentData._timeline.length; i++) {
        if (currentData._timeline[i].token) {
          // keep all events after this, including this one
          currentData._timeline = currentData._timeline.slice(i, currentData._timeline.length);
          break;
        }
      }
    }
  }

  /**
   * Accumulate incremental /sync group data.
   * @param {Object} syncResponse the complete /sync JSON
   */
  accumulateGroups(syncResponse) {
    if (!syncResponse.groups) {
      return;
    }
    if (syncResponse.groups.invite) {
      Object.keys(syncResponse.groups.invite).forEach(groupId => {
        this.accumulateGroup(groupId, Category.Invite, syncResponse.groups.invite[groupId]);
      });
    }
    if (syncResponse.groups.join) {
      Object.keys(syncResponse.groups.join).forEach(groupId => {
        this.accumulateGroup(groupId, Category.Join, syncResponse.groups.join[groupId]);
      });
    }
    if (syncResponse.groups.leave) {
      Object.keys(syncResponse.groups.leave).forEach(groupId => {
        this.accumulateGroup(groupId, Category.Leave, syncResponse.groups.leave[groupId]);
      });
    }
  }
  accumulateGroup(groupId, category, data) {
    for (const cat of [Category.Invite, Category.Leave, Category.Join]) {
      delete this.groups[cat][groupId];
    }
    this.groups[category][groupId] = data;
  }

  /**
   * Return everything under the 'rooms' key from a /sync response which
   * represents all room data that should be stored. This should be paired
   * with the sync token which represents the most recent /sync response
   * provided to accumulate().
   * @param {boolean} forDatabase True to generate a sync to be saved to storage
   * @return {Object} An object with a "nextBatch", "roomsData" and "accountData"
   * keys.
   * The "nextBatch" key is a string which represents at what point in the
   * /sync stream the accumulator reached. This token should be used when
   * restarting a /sync stream at startup. Failure to do so can lead to missing
   * events. The "roomsData" key is an Object which represents the entire
   * /sync response from the 'rooms' key onwards. The "accountData" key is
   * a list of raw events which represent global account data.
   */
  getJSON(forDatabase = false) {
    const data = {
      join: {},
      invite: {},
      // always empty. This is set by /sync when a room was previously
      // in 'invite' or 'join'. On fresh startup, the client won't know
      // about any previous room being in 'invite' or 'join' so we can
      // just omit mentioning it at all, even if it has previously come
      // down /sync.
      // The notable exception is when a client is kicked or banned:
      // we may want to hold onto that room so the client can clearly see
      // why their room has disappeared. We don't persist it though because
      // it is unclear *when* we can safely remove the room from the DB.
      // Instead, we assume that if you're loading from the DB, you've
      // refreshed the page, which means you've seen the kick/ban already.
      leave: {}
    };
    Object.keys(this.inviteRooms).forEach(roomId => {
      data.invite[roomId] = this.inviteRooms[roomId];
    });
    Object.keys(this.joinRooms).forEach(roomId => {
      const roomData = this.joinRooms[roomId];
      const roomJson = {
        ephemeral: {
          events: []
        },
        account_data: {
          events: []
        },
        state: {
          events: []
        },
        timeline: {
          events: [],
          prev_batch: null
        },
        unread_notifications: roomData._unreadNotifications,
        summary: roomData._summary
      };
      // Add account data
      Object.keys(roomData._accountData).forEach(evType => {
        roomJson.account_data.events.push(roomData._accountData[evType]);
      });

      // Add receipt data
      const receiptEvent = {
        type: "m.receipt",
        room_id: roomId,
        content: {
          // $event_id: { "m.read": { $user_id: $json } }
        }
      };
      Object.keys(roomData._readReceipts).forEach(userId => {
        const receiptData = roomData._readReceipts[userId];
        if (!receiptEvent.content[receiptData.eventId]) {
          receiptEvent.content[receiptData.eventId] = {
            "m.read": {}
          };
        }
        receiptEvent.content[receiptData.eventId]["m.read"][userId] = receiptData.data;
      });
      // add only if we have some receipt data
      if (Object.keys(receiptEvent.content).length > 0) {
        roomJson.ephemeral.events.push(receiptEvent);
      }

      // Add timeline data
      roomData._timeline.forEach(msgData => {
        if (!roomJson.timeline.prev_batch) {
          // the first event we add to the timeline MUST match up to
          // the prev_batch token.
          if (!msgData.token) {
            return; // this shouldn't happen as we prune constantly.
          }

          roomJson.timeline.prev_batch = msgData.token;
        }
        let transformedEvent;
        if (!forDatabase && msgData.event["_localTs"]) {
          // This means we have to copy each event so we can fix it up to
          // set a correct 'age' parameter whilst keeping the local timestamp
          // on our stored event. If this turns out to be a bottleneck, it could
          // be optimised either by doing this in the main process after the data
          // has been structured-cloned to go between the worker & main process,
          // or special-casing data from saved syncs to read the local timestamp
          // directly rather than turning it into age to then immediately be
          // transformed back again into a local timestamp.
          transformedEvent = Object.assign({}, msgData.event);
          if (transformedEvent.unsigned !== undefined) {
            transformedEvent.unsigned = Object.assign({}, transformedEvent.unsigned);
          }
          delete transformedEvent._localTs;
          transformedEvent.unsigned = transformedEvent.unsigned || {};
          transformedEvent.unsigned.age = Date.now() - msgData.event["_localTs"];
        } else {
          transformedEvent = msgData.event;
        }
        roomJson.timeline.events.push(transformedEvent);
      });

      // Add state data: roll back current state to the start of timeline,
      // by "reverse clobbering" from the end of the timeline to the start.
      // Convert maps back into arrays.
      const rollBackState = Object.create(null);
      for (let i = roomJson.timeline.events.length - 1; i >= 0; i--) {
        const timelineEvent = roomJson.timeline.events[i];
        if (timelineEvent.state_key === null || timelineEvent.state_key === undefined) {
          continue; // not a state event
        }
        // since we're going back in time, we need to use the previous
        // state value else we'll break causality. We don't have the
        // complete previous state event, so we need to create one.
        const prevStateEvent = deepCopy(timelineEvent);
        if (prevStateEvent.unsigned) {
          if (prevStateEvent.unsigned.prev_content) {
            prevStateEvent.content = prevStateEvent.unsigned.prev_content;
          }
          if (prevStateEvent.unsigned.prev_sender) {
            prevStateEvent.sender = prevStateEvent.unsigned.prev_sender;
          }
        }
        setState(rollBackState, prevStateEvent);
      }
      Object.keys(roomData._currentState).forEach(evType => {
        Object.keys(roomData._currentState[evType]).forEach(stateKey => {
          let ev = roomData._currentState[evType][stateKey];
          if (rollBackState[evType] && rollBackState[evType][stateKey]) {
            // use the reverse clobbered event instead.
            ev = rollBackState[evType][stateKey];
          }
          roomJson.state.events.push(ev);
        });
      });
      data.join[roomId] = roomJson;
    });

    // Add account data
    const accData = [];
    Object.keys(this.accountData).forEach(evType => {
      accData.push(this.accountData[evType]);
    });
    return {
      nextBatch: this.nextBatch,
      roomsData: data,
      groupsData: this.groups,
      accountData: accData
    };
  }
  getNextBatchToken() {
    return this.nextBatch;
  }
}
function setState(eventMap, event) {
  if (event.state_key === null || event.state_key === undefined || !event.type) {
    return;
  }
  if (!eventMap[event.type]) {
    eventMap[event.type] = Object.create(null);
  }
  eventMap[event.type][event.state_key] = event;
}
;// CONCATENATED MODULE: ./node_modules/matrix-js-sdk/src/indexeddb-helpers.ts
/*
Copyright 2019 New Vector Ltd

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
 * Check if an IndexedDB database exists. The only way to do so is to try opening it, so
 * we do that and then delete it did not exist before.
 *
 * @param {Object} indexedDB The `indexedDB` interface
 * @param {string} dbName The database name to test for
 * @returns {boolean} Whether the database exists
 */
function exists(indexedDB, dbName) {
  return new Promise((resolve, reject) => {
    let exists = true;
    const req = indexedDB.open(dbName);
    req.onupgradeneeded = () => {
      // Since we did not provide an explicit version when opening, this event
      // should only fire if the DB did not exist before at any version.
      exists = false;
    };
    req.onblocked = () => reject(req.error);
    req.onsuccess = () => {
      const db = req.result;
      db.close();
      if (!exists) {
        // The DB did not exist before, but has been created as part of this
        // existence check. Delete it now to restore previous state. Delete can
        // actually take a while to complete in some browsers, so don't wait for
        // it. This won't block future open calls that a store might issue next to
        // properly set up the DB.
        indexedDB.deleteDatabase(dbName);
      }
      resolve(exists);
    };
    req.onerror = ev => reject(req.error);
  });
}
;// CONCATENATED MODULE: ./node_modules/matrix-js-sdk/src/store/indexeddb-local-backend.ts

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
Copyright 2017 - 2021 The Matrix.org Foundation C.I.C.

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





const VERSION = 5;
function createDatabase(db) {
  // Make user store, clobber based on user ID. (userId property of User objects)
  db.createObjectStore("users", {
    keyPath: ["userId"]
  });

  // Make account data store, clobber based on event type.
  // (event.type property of MatrixEvent objects)
  db.createObjectStore("accountData", {
    keyPath: ["type"]
  });

  // Make /sync store (sync tokens, room data, etc), always clobber (const key).
  db.createObjectStore("sync", {
    keyPath: ["clobber"]
  });

  // Make friends store
  db.createObjectStore("friends", {
    keyPath: ["userId"]
  });
}
function upgradeSchemaV2(db) {
  const oobMembersStore = db.createObjectStore("oob_membership_events", {
    keyPath: ["room_id", "state_key"]
  });
  oobMembersStore.createIndex("room", "room_id");
}
function upgradeSchemaV3(db) {
  db.createObjectStore("client_options", {
    keyPath: ["clobber"]
  });
}
function upgradeSchemaV5(db) {
  if (db.objectStoreNames.contains("assets")) {
    db.deleteObjectStore("assets");
  }
  db.createObjectStore("assets");
}

/**
 * Helper method to collect results from a Cursor and promiseify it.
 * @param {ObjectStore|Index} store The store to perform openCursor on.
 * @param {IDBKeyRange=} keyRange Optional key range to apply on the cursor.
 * @param {Function} resultMapper A function which is repeatedly called with a
 * Cursor.
 * Return the data you want to keep.
 * @return {Promise<T[]>} Resolves to an array of whatever you returned from
 * resultMapper.
 */
function selectQuery(store, keyRange, resultMapper) {
  const query = store.openCursor(keyRange);
  return new Promise((resolve, reject) => {
    const results = [];
    query.onerror = () => {
      reject(new Error("Query failed: " + query.error));
    };
    // collect results
    query.onsuccess = () => {
      const cursor = query.result;
      if (!cursor) {
        resolve(results);
        return; // end of results
      }

      results.push(resultMapper(cursor));
      cursor.continue();
    };
  });
}
function txnAsPromise(txn) {
  return new Promise((resolve, reject) => {
    txn.oncomplete = function (event) {
      resolve(event);
    };
    txn.onerror = function () {
      reject(txn.error);
    };
  });
}
function reqAsEventPromise(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = function (event) {
      resolve(event);
    };
    req.onerror = function () {
      reject(req.error);
    };
  });
}
function reqAsPromise(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req);
    req.onerror = err => reject(err);
  });
}
function reqAsCursorPromise(req) {
  return reqAsEventPromise(req).then(event => req.result);
}
class LocalIndexedDBStoreBackend {
  static exists(indexedDB, dbName) {
    dbName = "matrix-js-sdk:" + (dbName || "default");
    return exists(indexedDB, dbName);
  }
  /**
   * Does the actual reading from and writing to the indexeddb
   *
   * Construct a new Indexed Database store backend. This requires a call to
   * <code>connect()</code> before this store can be used.
   * @constructor
   * @param {Object} indexedDB The Indexed DB interface e.g
   * <code>window.indexedDB</code>
   * @param {string=} dbName Optional database name. The same name must be used
   * to open the same database.
   */
  constructor(indexedDB, dbName) {
    this.indexedDB = indexedDB;
    _defineProperty(this, "dbName", void 0);
    _defineProperty(this, "syncAccumulator", void 0);
    _defineProperty(this, "db", null);
    _defineProperty(this, "disconnected", true);
    _defineProperty(this, "_isNewlyCreated", false);
    this.dbName = "matrix-js-sdk:" + (dbName || "default");
    this.syncAccumulator = new SyncAccumulator();
  }

  /**
   * Attempt to connect to the database. This can fail if the user does not
   * grant permission.
   * @return {Promise} Resolves if successfully connected.
   */
  connect() {
    if (!this.disconnected) {
      logger.log(`LocalIndexedDBStoreBackend.connect: already connected or connecting`);
      return Promise.resolve();
    }
    this.disconnected = false;
    logger.log(`LocalIndexedDBStoreBackend.connect: connecting...`);
    const req = this.indexedDB.open(this.dbName, VERSION);
    req.onupgradeneeded = ev => {
      const db = req.result;
      const oldVersion = ev.oldVersion;
      logger.log(`LocalIndexedDBStoreBackend.connect: upgrading from ${oldVersion}`);
      if (oldVersion < 1) {
        // The database did not previously exist.
        this._isNewlyCreated = true;
        createDatabase(db);
      }
      if (oldVersion < 2) {
        upgradeSchemaV2(db);
      }
      if (oldVersion < 3) {
        upgradeSchemaV3(db);
      }
      if (oldVersion < 5) {
        upgradeSchemaV5(db);
      }
      // Expand as needed.
    };

    req.onblocked = () => {
      logger.log(`can't yet open LocalIndexedDBStoreBackend because it is open elsewhere`);
    };
    logger.log(`LocalIndexedDBStoreBackend.connect: awaiting connection...`);
    return reqAsEventPromise(req).then(() => {
      logger.log(`LocalIndexedDBStoreBackend.connect: connected`);
      this.db = req.result;

      // add a poorly-named listener for when deleteDatabase is called
      // so we can close our db connections.
      this.db.onversionchange = () => {
        this.db.close();
      };
      return this.init();
    });
  }

  /** @return {boolean} whether or not the database was newly created in this session. */
  isNewlyCreated() {
    return Promise.resolve(this._isNewlyCreated);
  }

  /**
   * Having connected, load initial data from the database and prepare for use
   * @return {Promise} Resolves on success
   */
  init() {
    return Promise.all([this.loadAccountData(), this.loadSyncData()]).then(([accountData, syncData]) => {
      logger.log(`LocalIndexedDBStoreBackend: loaded initial data`);
      this.syncAccumulator.accumulate({
        next_batch: syncData.nextBatch,
        rooms: syncData.roomsData,
        groups: syncData.groupsData,
        account_data: {
          events: accountData
        }
      }, true);
    });
  }
  getRoomMembersToken(roomId) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(["oob_membership_events"], "readonly");
      const store = tx.objectStore("oob_membership_events");
      const roomIndex = store.index("room");
      const range = IDBKeyRange.only(roomId);
      const request = roomIndex.openCursor(range);
      let token;
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) {
          // Unknown room
          if (!token) {
            return resolve(null);
          }
          return resolve(token);
        }
        const record = cursor.value;
        if (record.state_key === 0) {
          token = {
            from: record.from,
            offset: record.offset,
            to: record.to
          };
        }
        cursor.continue();
      };
      request.onerror = err => {
        reject(err);
      };
    }).then(token => {
      return token;
    });
  }
  async setRoomMembersToken(roomId, token) {
    const tx = this.db.transaction(["oob_membership_events"], "readwrite");
    const store = tx.objectStore("oob_membership_events");
    // aside from all the events, we also write a marker object to the store
    // to mark the fact that OOB members have been written for this room.
    // It's possible that 0 members need to be written as all where previously know
    // but we still need to know whether to return null or [] from getOutOfBandMembers
    // where null means out of band members haven't been stored yet for this room
    const markerObject = _objectSpread({
      room_id: roomId,
      oob_written: true,
      state_key: 0
    }, token);
    store.put(markerObject);
    await txnAsPromise(tx);
    logger.log(`LL: backend done storing for ${roomId}!`);
  }

  /**
   * Returns the out-of-band membership events for this room that
   * were previously loaded.
   * @param {string} roomId
   * @returns {Promise<event[]>} the events, potentially an empty array if OOB loading didn't yield any new members
   * @returns {null} in case the members for this room haven't been stored yet
   */
  getOutOfBandMembers(roomId) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(["oob_membership_events"], "readonly");
      const store = tx.objectStore("oob_membership_events");
      const roomIndex = store.index("room");
      const range = IDBKeyRange.only(roomId);
      const request = roomIndex.openCursor(range);
      const membershipEvents = [];
      // did we encounter the oob_written marker object
      // amongst the results? That means OOB member
      // loading already happened for this room
      // but there were no members to persist as they
      // were all known already
      let oobWritten = false;
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) {
          // Unknown room
          if (!membershipEvents.length && !oobWritten) {
            return resolve(null);
          }
          return resolve(membershipEvents);
        }
        const record = cursor.value;
        if (record.oob_written) {
          oobWritten = true;
        } else {
          membershipEvents.push(record);
        }
        cursor.continue();
      };
      request.onerror = err => {
        reject(err);
      };
    }).then(events => {
      logger.log(`LL: got ${events && events.length} membershipEvents from storage for room ${roomId} ...`);
      return events;
    });
  }

  /**
   * Stores the out-of-band membership events for this room. Note that
   * it still makes sense to store an empty array as the OOB status for the room is
   * marked as fetched, and getOutOfBandMembers will return an empty array instead of null
   * @param {string} roomId
   * @param {event[]} membershipEvents the membership events to store
   */
  async setOutOfBandMembers(roomId, membershipEvents) {
    logger.log(`LL: backend about to store ${membershipEvents.length}` + ` members for ${roomId}`);
    const tx = this.db.transaction(["oob_membership_events"], "readwrite");
    const store = tx.objectStore("oob_membership_events");
    membershipEvents.forEach(e => {
      store.put(e);
    });
    // aside from all the events, we also write a marker object to the store
    // to mark the fact that OOB members have been written for this room.
    // It's possible that 0 members need to be written as all where previously know
    // but we still need to know whether to return null or [] from getOutOfBandMembers
    // where null means out of band members haven't been stored yet for this room
    const markerObject = {
      room_id: roomId,
      oob_written: true,
      state_key: 0
    };
    store.put(markerObject);
    await txnAsPromise(tx);
    logger.log(`LL: backend done storing for ${roomId}!`);
  }
  async clearOutOfBandMembers(roomId) {
    // the approach to delete all members for a room
    // is to get the min and max state key from the index
    // for that room, and then delete between those
    // keys in the store.
    // this should be way faster than deleting every member
    // individually for a large room.
    const readTx = this.db.transaction(["oob_membership_events"], "readonly");
    const store = readTx.objectStore("oob_membership_events");
    const roomIndex = store.index("room");
    const roomRange = IDBKeyRange.only(roomId);
    const minStateKeyProm = reqAsCursorPromise(roomIndex.openKeyCursor(roomRange, "next")).then(cursor => cursor && cursor.primaryKey[1]);
    const maxStateKeyProm = reqAsCursorPromise(roomIndex.openKeyCursor(roomRange, "prev")).then(cursor => cursor && cursor.primaryKey[1]);
    const [minStateKey, maxStateKey] = await Promise.all([minStateKeyProm, maxStateKeyProm]);
    const writeTx = this.db.transaction(["oob_membership_events"], "readwrite");
    const writeStore = writeTx.objectStore("oob_membership_events");
    const membersKeyRange = IDBKeyRange.bound([roomId, minStateKey], [roomId, maxStateKey]);
    logger.log(`LL: Deleting all users + marker in storage for room ${roomId}, with key range:`, [roomId, minStateKey], [roomId, maxStateKey]);
    await reqAsPromise(writeStore.delete(membersKeyRange));
  }

  /**
   * Clear the entire database. This should be used when logging out of a client
   * to prevent mixing data between accounts.
   * @return {Promise} Resolved when the database is cleared.
   */
  clearDatabase() {
    return new Promise(resolve => {
      logger.log(`Removing indexeddb instance: ${this.dbName}`);
      const req = this.indexedDB.deleteDatabase(this.dbName);
      req.onblocked = () => {
        logger.log(`can't yet delete indexeddb ${this.dbName} because it is open elsewhere`);
      };
      req.onerror = () => {
        // in firefox, with indexedDB disabled, this fails with a
        // DOMError. We treat this as non-fatal, so that we can still
        // use the app.
        logger.warn(`unable to delete js-sdk store indexeddb: ${req.error}`);
        resolve();
      };
      req.onsuccess = () => {
        logger.log(`Removed indexeddb instance: ${this.dbName}`);
        resolve();
      };
    });
  }

  /**
   * @param {boolean=} copy If false, the data returned is from internal
   * buffers and must not be mutated. Otherwise, a copy is made before
   * returning such that the data can be safely mutated. Default: true.
   *
   * @return {Promise} Resolves with a sync response to restore the
   * client state to where it was at the last save, or null if there
   * is no saved sync data.
   */
  getSavedSync(copy = true) {
    const data = this.syncAccumulator.getJSON();
    if (!data.nextBatch) return Promise.resolve(null);
    if (copy) {
      // We must deep copy the stored data so that the /sync processing code doesn't
      // corrupt the internal state of the sync accumulator (it adds non-clonable keys)
      return Promise.resolve(deepCopy(data));
    } else {
      return Promise.resolve(data);
    }
  }
  getNextBatchToken() {
    return Promise.resolve(this.syncAccumulator.getNextBatchToken());
  }
  setSyncData(syncData) {
    return Promise.resolve().then(() => {
      this.syncAccumulator.accumulate(syncData);
    });
  }
  async syncToDatabase(userTuples) {
    const syncData = this.syncAccumulator.getJSON(true);
    await Promise.all([this.persistUserPresenceEvents(userTuples), this.persistAccountData(syncData.accountData), this.persistSyncData(syncData.nextBatch, syncData.roomsData, syncData.groupsData)]);
  }

  /**
   * Persist rooms /sync data along with the next batch token.
   * @param {string} nextBatch The next_batch /sync value.
   * @param {Object} roomsData The 'rooms' /sync data from a SyncAccumulator
   * @param {Object} groupsData The 'groups' /sync data from a SyncAccumulator
   * @return {Promise} Resolves if the data was persisted.
   */
  persistSyncData(nextBatch, roomsData, groupsData) {
    logger.log("Persisting sync data up to", nextBatch, Date.now());
    return promiseTry(() => {
      const txn = this.db.transaction(["sync"], "readwrite");
      const store = txn.objectStore("sync");
      store.put({
        clobber: "-",
        // constant key so will always clobber
        nextBatch,
        roomsData,
        groupsData
      }); // put == UPSERT
      return txnAsPromise(txn).then();
    });
  }

  /**
   * Persist a list of account data events. Events with the same 'type' will
   * be replaced.
   * @param {Object[]} accountData An array of raw user-scoped account data events
   * @return {Promise} Resolves if the events were persisted.
   */
  persistAccountData(accountData) {
    return promiseTry(() => {
      const txn = this.db.transaction(["accountData"], "readwrite");
      const store = txn.objectStore("accountData");
      for (let i = 0; i < accountData.length; i++) {
        store.put(accountData[i]); // put == UPSERT
      }

      return txnAsPromise(txn).then();
    });
  }

  /**
   * Persist a list of [user id, presence event] they are for.
   * Users with the same 'userId' will be replaced.
   * Presence events should be the event in its raw form (not the Event
   * object)
   * @param {Object[]} tuples An array of [userid, event] tuples
   * @return {Promise} Resolves if the users were persisted.
   */
  persistUserPresenceEvents(tuples) {
    return promiseTry(() => {
      const txn = this.db.transaction(["users"], "readwrite");
      const store = txn.objectStore("users");
      for (const tuple of tuples) {
        store.put({
          userId: tuple[0],
          event: tuple[1]
        }); // put == UPSERT
      }

      return txnAsPromise(txn).then();
    });
  }

  /**
   * Load all user presence events from the database. This is not cached.
   * FIXME: It would probably be more sensible to store the events in the
   * sync.
   * @return {Promise<Object[]>} A list of presence events in their raw form.
   */
  getUserPresenceEvents() {
    return promiseTry(() => {
      const txn = this.db.transaction(["users"], "readonly");
      const store = txn.objectStore("users");
      return selectQuery(store, undefined, cursor => {
        return [cursor.value.userId, cursor.value.event];
      });
    });
  }

  /**
   * Load all the account data events from the database. This is not cached.
   * @return {Promise<Object[]>} A list of raw global account events.
   */
  loadAccountData() {
    logger.log(`LocalIndexedDBStoreBackend: loading account data...`);
    return promiseTry(() => {
      const txn = this.db.transaction(["accountData"], "readonly");
      const store = txn.objectStore("accountData");
      return selectQuery(store, undefined, cursor => {
        return cursor.value;
      }).then(result => {
        logger.log(`LocalIndexedDBStoreBackend: loaded account data`);
        return result;
      });
    });
  }

  /**
   * Load the sync data from the database.
   * @return {Promise<Object>} An object with "roomsData" and "nextBatch" keys.
   */
  loadSyncData() {
    logger.log(`LocalIndexedDBStoreBackend: loading sync data...`);
    return promiseTry(() => {
      const txn = this.db.transaction(["sync"], "readonly");
      const store = txn.objectStore("sync");
      return selectQuery(store, undefined, cursor => {
        return cursor.value;
      }).then(results => {
        logger.log(`LocalIndexedDBStoreBackend: loaded sync data`);
        if (results.length > 1) {
          logger.warn("loadSyncData: More than 1 sync row found.");
        }
        return results.length > 0 ? results[0] : {};
      });
    });
  }
  getClientOptions() {
    return Promise.resolve().then(() => {
      const txn = this.db.transaction(["client_options"], "readonly");
      const store = txn.objectStore("client_options");
      return selectQuery(store, undefined, cursor => {
        if (cursor.value && cursor.value && cursor.value.options) {
          return cursor.value.options;
        }
      }).then(results => results[0]);
    });
  }
  async storeClientOptions(options) {
    const txn = this.db.transaction(["client_options"], "readwrite");
    const store = txn.objectStore("client_options");
    store.put({
      clobber: "-",
      // constant key so will always clobber
      options: options
    }); // put == UPSERT
    await txnAsPromise(txn);
  }
  getAssets(address) {
    return Promise.resolve().then(() => {
      const txn = this.db.transaction(["assets"], "readonly");
      const store = txn.objectStore("assets");
      return selectQuery(store, address, cursor => {
        if (cursor.value) {
          return cursor.value;
        }
      }).then(results => results[0]);
    });
  }
  persistFriendsList(friends) {
    return promiseTry(() => {
      const txn = this.db.transaction(["friends"], "readwrite");
      const store = txn.objectStore("friends");
      for (let i = 0; i < friends.length; i++) {
        store.put(friends[i]); // put == UPSERT
      }

      return txnAsPromise(txn).then();
    });
  }
  deletefriend(friends) {
    return promiseTry(() => {
      const txn = this.db.transaction(["friends"], "readwrite");
      const store = txn.objectStore("friends");
      for (let i = 0; i < friends.length; i++) {
        store.delete([friends[i].userId]); // put == UPSERT
      }

      return txnAsPromise(txn).then();
    });
  }
  getFriendsList() {
    return Promise.resolve().then(() => {
      const txn = this.db.transaction(["friends"], "readonly");
      const store = txn.objectStore("friends");
      return selectQuery(store, null, cursor => {
        if (cursor.value) {
          return cursor.value;
        }
      }).then(results => results);
    });
  }
  async storeAssets(assets, address) {
    const txn = this.db.transaction(["assets"], "readwrite");
    const store = txn.objectStore("assets");
    store.put(assets, address);
    await txnAsPromise(txn);
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-js-sdk/src/store/indexeddb-store-worker.ts

/*
Copyright 2017 - 2021 The Matrix.org Foundation C.I.C.

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
 * This class lives in the webworker and drives a LocalIndexedDBStoreBackend
 * controlled by messages from the main process.
 *
 * It should be instantiated by a web worker script provided by the application
 * in a script, for example:
 *
 * import {IndexedDBStoreWorker} from 'matrix-js-sdk/lib/indexeddb-worker.js';
 * const remoteWorker = new IndexedDBStoreWorker(postMessage);
 * onmessage = remoteWorker.onMessage;
 *
 * Note that it is advisable to import this class by referencing the file directly to
 * avoid a dependency on the whole js-sdk.
 *
 */
class IndexedDBStoreWorker {
  /**
   * @param {function} postMessage The web worker postMessage function that
   * should be used to communicate back to the main script.
   */
  constructor(postMessage) {
    this.postMessage = postMessage;
    _defineProperty(this, "backend", null);
    /**
     * Passes a message event from the main script into the class. This method
     * can be directly assigned to the web worker `onmessage` variable.
     *
     * @param {Object} ev The message event
     */
    _defineProperty(this, "onMessage", ev => {
      const msg = ev.data;
      let prom;
      switch (msg.command) {
        case '_setupWorker':
          // this is the 'indexedDB' global (where global != window
          // because it's a web worker and there is no window).
          this.backend = new LocalIndexedDBStoreBackend(indexedDB, msg.args[0]);
          prom = Promise.resolve();
          break;
        case 'connect':
          prom = this.backend.connect();
          break;
        case 'isNewlyCreated':
          prom = this.backend.isNewlyCreated();
          break;
        case 'clearDatabase':
          prom = this.backend.clearDatabase();
          break;
        case 'getSavedSync':
          prom = this.backend.getSavedSync(false);
          break;
        case 'setSyncData':
          prom = this.backend.setSyncData(msg.args[0]);
          break;
        case 'syncToDatabase':
          prom = this.backend.syncToDatabase(msg.args[0]);
          break;
        case 'getUserPresenceEvents':
          prom = this.backend.getUserPresenceEvents();
          break;
        case 'getNextBatchToken':
          prom = this.backend.getNextBatchToken();
          break;
        case 'getRoomMembersToken':
          prom = this.backend.getRoomMembersToken(msg.args[0]);
          break;
        case 'setRoomMembersToken':
          prom = this.backend.setRoomMembersToken(msg.args[0], msg.args[1]);
          break;
        case 'getOutOfBandMembers':
          prom = this.backend.getOutOfBandMembers(msg.args[0]);
          break;
        case 'clearOutOfBandMembers':
          prom = this.backend.clearOutOfBandMembers(msg.args[0]);
          break;
        case 'setOutOfBandMembers':
          prom = this.backend.setOutOfBandMembers(msg.args[0], msg.args[1]);
          break;
        case 'getClientOptions':
          prom = this.backend.getClientOptions();
          break;
        case 'storeClientOptions':
          prom = this.backend.storeClientOptions(msg.args[0]);
          break;
        case 'getAssets':
          prom = this.backend.getAssets(msg.args[0]);
          break;
        case 'storeAssets':
          prom = this.backend.storeAssets(msg.args[0], msg.args[1]);
          break;
        case 'persistFriendsList':
          prom = this.backend.persistFriendsList(msg.args[0]);
          break;
        case 'deletefriend':
          prom = this.backend.deletefriend(msg.args[0]);
          break;
        case 'getFriendsList':
          prom = this.backend.getFriendsList();
          break;
      }
      if (prom === undefined) {
        this.postMessage({
          command: 'cmd_fail',
          seq: msg.seq,
          // Can't be an Error because they're not structured cloneable
          error: "Unrecognised command"
        });
        return;
      }
      prom.then(ret => {
        this.postMessage.call(null, {
          command: 'cmd_success',
          seq: msg.seq,
          result: ret
        });
      }, err => {
        logger.error("Error running command: " + msg.command);
        logger.error(err);
        this.postMessage.call(null, {
          command: 'cmd_fail',
          seq: msg.seq,
          // Just send a string because Error objects aren't cloneable
          error: {
            message: err.message,
            name: err.name
          }
        });
      });
    });
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-js-sdk/src/indexeddb-worker.ts
/*
Copyright 2017 Vector Creations Ltd
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
 * Separate exports file for the indexeddb web worker, which is designed
 * to be used separately
 */

/** The {@link module:indexeddb-store-worker~IndexedDBStoreWorker} class. */

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??ruleSet[1].rules[1]!./node_modules/matrix-react-sdk/src/workers/indexeddb.worker.ts
/*
Copyright 2017 Vector Creations Ltd

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
const remoteWorker = new IndexedDBStoreWorker(ctx.postMessage);
ctx.onmessage = remoteWorker.onMessage;
})();

/******/ })()
;
//# sourceMappingURL=0888de9b4c67e8b0d86b.worker.js.map