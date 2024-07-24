/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

// EXTERNAL MODULE: ./node_modules/browser-request/index.js
var browser_request = __webpack_require__(724770);
var browser_request_default = /*#__PURE__*/__webpack_require__.n(browser_request);
;// CONCATENATED MODULE: ./src/vector/getconfig.ts
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
    browser_request_default()({
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
;// CONCATENATED MODULE: ./src/vector/mobile_guide/index.ts


// function onBackToElementClick(): void {
//     // Cookie should expire in 4 hours
//     document.cookie = 'element_mobile_redirect_to_guide=false;path=/;max-age=14400';
//     window.location.href = '../';
// }

function isIos() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// NEVER pass user-controlled content to this function! Hardcoded strings only please.
function renderConfigError(message) {
  const contactMsg = "If this is unexpected, please contact your system administrator " + "or technical support representative.";
  message = `<h2>Error loading SendingMe</h2><p>${message}</p><p>${contactMsg}</p>`;
  const toHide = document.getElementsByClassName("mx_HomePage_container");
  const errorContainers = document.getElementsByClassName("mx_HomePage_errorContainer");
  for (const e of toHide) {
    // We have to clear the content because .style.display='none'; doesn't work
    // due to an !important in the CSS.
    e.innerHTML = "";
  }
  for (const e of errorContainers) {
    e.style.display = "block";
    e.innerHTML = message;
  }
}
async function initPage() {
  const url = new URL(location.href);
  console.log("url", url);
  const iosTestflightLink = document.getElementById("iosUrlTestflight");
  const iosLink = document.getElementById("iosUrl");
  const androidLink = document.getElementById("androidUrl");
  const {
    host
  } = location;
  // const androidUrl = `https://${host}/andriod/release/linx.apk`;
  // const iosUrl = `itms-services://?action=download-manifest&url=https://${host}/ios/release/manifest.plist`;
  const config = await getVectorConfig("..");
  // TODO: update to google play
  //
  const androidUrl = `https://play.google.com/store/apps/details?id=me.sending.app`;
  const iosUrl = `itms-services://?action=download-manifest&url=https://${host}/ios/release/manifest.plist`;
  let iosTestflightUrl;
  const envDom = document.querySelector("#env");
  if (envDom) {
    envDom.classList.add(`mx_Env_content_${config["env"]}`);
    envDom.append(config["env"]);
  }

  // document.getElementById('back_to_element_button').onclick = onBackToElementClick;

  // We manually parse the config similar to how validateServerConfig works because
  // calling that function pulls in roughly 4mb of JS we don't use.

  if (iosLink) {
    iosLink.href = iosUrl;
    if (iosUrl === "") {
      document.getElementById("iosGoBlank").onclick = function () {
        // const newWindow = window.open('about:blank');
        // newWindow.document.write("<h1>coming soon</h1>");
        alert("coming soon");
        // console.log("111",document.getElementById("iosUrl"))
        // document.getElementById("iosUrl").
        return false;
      };
    }
  }
  if (androidLink) {
    androidLink.href = androidUrl;
  }
  if (iosTestflightLink) {
    iosTestflightLink.href = iosTestflightUrl;
  }

  // btn click after 3s
  setTimeout(() => {
    const isIOS = isIos();
    if (isIOS) {
      iosLink.click();
    } else {
      androidLink.click();
    }
    ;
  }, 3000);
  const wkConfig = config["default_server_config"]; // overwritten later under some conditions
  const serverName = config["default_server_name"];
  const defaultHsUrl = config["default_hs_url"];
  const defaultIsUrl = config["default_is_url"];
  const incompatibleOptions = [wkConfig, serverName, defaultHsUrl].filter(i => !!i);
  if (incompatibleOptions.length > 1) {
    return renderConfigError("Invalid configuration: can only specify one of default_server_config, default_server_name, " + "or default_hs_url.");
  }
  if (incompatibleOptions.length < 1) {
    return renderConfigError("Invalid configuration: no default server specified.");
  }
  let hsUrl = "";
  let isUrl = "";
  if (wkConfig && wkConfig["m.homeserver"]) {
    hsUrl = wkConfig["m.homeserver"]["base_url"];
    if (wkConfig["m.identity_server"]) {
      isUrl = wkConfig["m.identity_server"]["base_url"];
    }
  }
  if (serverName) {
    // We also do our own minimal .well-known validation to avoid pulling in the js-sdk
    try {
      const result = await fetch(`https://${serverName}/.well-known/matrix/client`);
      const wkConfig = await result.json();
      if (wkConfig && wkConfig["m.homeserver"]) {
        hsUrl = wkConfig["m.homeserver"]["base_url"];
        if (wkConfig["m.identity_server"]) {
          isUrl = wkConfig["m.identity_server"]["base_url"];
        }
      }
    } catch (e) {
      console.error(e);
      return renderConfigError("Unable to fetch homeserver configuration");
    }
  }
  if (defaultHsUrl) {
    hsUrl = defaultHsUrl;
    isUrl = defaultIsUrl;
  }
  if (!hsUrl) {
    return renderConfigError("Unable to locate homeserver");
  }
  if (hsUrl && !hsUrl.endsWith("/")) hsUrl += "/";
  if (isUrl && !isUrl.endsWith("/")) isUrl += "/";
  if (hsUrl !== "https://matrix.org/") {
    document.getElementById("configure_element_button").href = "https://mobile.element.io?hs_url=" + encodeURIComponent(hsUrl) + "&is_url=" + encodeURIComponent(isUrl);
    document.getElementById("step1_heading").innerHTML = "1: Install the app";
    document.getElementById("step2_container").style.display = "block";
    document.getElementById("hs_url").innerText = hsUrl;
    if (isUrl) {
      document.getElementById("custom_is").style.display = "block";
      document.getElementById("is_url").style.display = "block";
      document.getElementById("is_url").innerText = isUrl;
    }
  }
}
initPage();
})();

/******/ })()
;
//# sourceMappingURL=mobileguide.js.map