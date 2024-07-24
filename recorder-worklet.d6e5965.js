/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
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
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/audio/consts.ts
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

const WORKLET_NAME = "mx-voice-worklet";
let PayloadEvent = /*#__PURE__*/function (PayloadEvent) {
  PayloadEvent["Timekeep"] = "timekeep";
  PayloadEvent["AmplitudeMark"] = "amplitude_mark";
  return PayloadEvent;
}({});
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/utils/numbers.ts
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
 * Returns the default number if the given value, i, is not a number. Otherwise
 * returns the given value.
 * @param {*} i The value to check.
 * @param {number} def The default value.
 * @returns {number} Either the value or the default value, whichever is a number.
 */
function defaultNumber(i, def) {
  return Number.isFinite(i) ? Number(i) : def;
}
function clamp(i, min, max) {
  return Math.min(Math.max(i, min), max);
}
function sum(...i) {
  return [...i].reduce((p, c) => c + p, 0);
}
function percentageWithin(pct, min, max) {
  return pct * (max - min) + min;
}
function percentageOf(val, min, max) {
  return (val - min) / (max - min);
}
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/matrix-react-sdk/src/audio/RecorderWorklet.ts

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




// from AudioWorkletGlobalScope: https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletGlobalScope

// declare const currentFrame: number;
// declare const sampleRate: number;

// We rate limit here to avoid overloading downstream consumers with amplitude information.
// The two major consumers are the voice message waveform thumbnail (resampled down to an
// appropriate length) and the live waveform shown to the user. Effectively, this controls
// the refresh rate of that live waveform and the number of samples the thumbnail has to
// work with.
const TARGET_AMPLITUDE_FREQUENCY = 16; // Hz

function roundTimeToTargetFreq(seconds) {
  // Epsilon helps avoid floating point rounding issues (1 + 1 = 1.999999, etc)
  return Math.round((seconds + Number.EPSILON) * TARGET_AMPLITUDE_FREQUENCY) / TARGET_AMPLITUDE_FREQUENCY;
}
function nextTimeForTargetFreq(roundedSeconds) {
  // The extra round is just to make sure we cut off any floating point issues
  return roundTimeToTargetFreq(roundedSeconds + 1 / TARGET_AMPLITUDE_FREQUENCY);
}
class MxVoiceWorklet extends AudioWorkletProcessor {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "nextAmplitudeSecond", 0);
    _defineProperty(this, "amplitudeIndex", 0);
  }
  process(inputs, outputs, parameters) {
    const currentSecond = roundTimeToTargetFreq(currentTime);
    // We special case the first ping because there's a fairly good chance that we'll miss the zeroth
    // update. Firefox for instance takes 0.06 seconds (roughly) to call this function for the first
    // time. Edge and Chrome occasionally lag behind too, but for the most part are on time.
    //
    // When this doesn't work properly we end up producing a waveform of nulls and no live preview
    // of the recorded message.
    if (currentSecond === this.nextAmplitudeSecond || this.nextAmplitudeSecond === 0) {
      // We're expecting exactly one mono input source, so just grab the very first frame of
      // samples for the analysis.
      const monoChan = inputs[0][0];

      // The amplitude of the frame's samples is effectively the loudness of the frame. This
      // translates into a bar which can be rendered as part of the whole recording clip's
      // waveform.
      //
      // We translate the amplitude down to 0-1 for sanity's sake.
      const minVal = Math.min(...monoChan);
      const maxVal = Math.max(...monoChan);
      const amplitude = percentageOf(maxVal, -1, 1) - percentageOf(minVal, -1, 1);
      this.port.postMessage({
        ev: PayloadEvent.AmplitudeMark,
        amplitude: amplitude,
        forIndex: this.amplitudeIndex++
      });
      this.nextAmplitudeSecond = nextTimeForTargetFreq(currentSecond);
    }

    // We mostly use this worklet to fire regular clock updates through to components
    this.port.postMessage({
      ev: PayloadEvent.Timekeep,
      timeSeconds: currentTime
    });

    // We're supposed to return false when we're "done" with the audio clip, but seeing as
    // we are acting as a passive processor we are never truly "done". The browser will clean
    // us up when it is done with us.
    return true;
  }
}
registerProcessor(WORKLET_NAME, MxVoiceWorklet);
/* harmony default export */ const RecorderWorklet = (null); // to appease module loaders (we never use the export)
/******/ })()
;
//# sourceMappingURL=recorder-worklet.d6e5965.js.map