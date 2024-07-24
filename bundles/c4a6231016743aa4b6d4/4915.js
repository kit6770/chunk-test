(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[4915],{

/***/ 934915:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RoomView)
});

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(992619);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(225259);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(294184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/models/room.ts + 1 modules
var room = __webpack_require__(335435);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/shouldHideEvent.ts
var shouldHideEvent = __webpack_require__(870639);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/permalinks/Permalinks.ts
var Permalinks = __webpack_require__(954105);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/ContentMessages.tsx + 1 modules
var ContentMessages = __webpack_require__(601877);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Modal.tsx + 1 modules
var Modal = __webpack_require__(241648);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/CallHandler.tsx + 2 modules
var CallHandler = __webpack_require__(613431);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/dispatcher.ts
var dispatcher = __webpack_require__(245539);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Rooms.ts + 1 modules
var Rooms = __webpack_require__(286020);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/@types/search.ts
var search = __webpack_require__(411981);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/@types/event.ts
var _types_event = __webpack_require__(907977);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/indexing/EventIndexPeg.ts + 1 modules
var EventIndexPeg = __webpack_require__(377145);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/MatrixClientPeg.ts + 3 modules
var MatrixClientPeg = __webpack_require__(933393);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/Searching.ts
/*
Copyright 2019 - 2021 The Matrix.org Foundation C.I.C.

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





const SEARCH_LIMIT = 10;
async function serverSideSearch(term, roomId = undefined) {
  const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
  const filter = {
    limit: SEARCH_LIMIT
  };
  if (roomId !== undefined) filter.rooms = [roomId];
  const body = {
    search_categories: {
      room_events: {
        search_term: term,
        filter: filter,
        order_by: search/* SearchOrderBy */.V.Recent,
        event_context: {
          before_limit: 1,
          after_limit: 1,
          include_profile: true
        }
      }
    }
  };
  const response = await client.search({
    body: body
  });
  return {
    response,
    query: body
  };
}
async function serverSideSearchProcess(term, roomId = undefined) {
  const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
  const result = await serverSideSearch(term, roomId);

  // The js-sdk method backPaginateRoomEventsSearch() uses _query internally
  // so we're reusing the concept here since we want to delegate the
  // pagination back to backPaginateRoomEventsSearch() in some cases.
  const searchResults = {
    _query: result.query,
    results: [],
    highlights: []
  };
  return client.processRoomEventsSearch(searchResults, result.response);
}
function compareEvents(a, b) {
  const aEvent = a.result;
  const bEvent = b.result;
  if (aEvent.origin_server_ts > bEvent.origin_server_ts) return -1;
  if (aEvent.origin_server_ts < bEvent.origin_server_ts) return 1;
  return 0;
}
async function combinedSearch(searchTerm) {
  const client = MatrixClientPeg/* MatrixClientPeg */.p.get();

  // Create two promises, one for the local search, one for the
  // server-side search.
  const serverSidePromise = serverSideSearch(searchTerm);
  const localPromise = localSearch(searchTerm);

  // Wait for both promises to resolve.
  await Promise.all([serverSidePromise, localPromise]);

  // Get both search results.
  const localResult = await localPromise;
  const serverSideResult = await serverSidePromise;
  const serverQuery = serverSideResult.query;
  const serverResponse = serverSideResult.response;
  const localQuery = localResult.query;
  const localResponse = localResult.response;

  // Store our queries for later on so we can support pagination.
  //
  // We're reusing _query here again to not introduce separate code paths and
  // concepts for our different pagination methods. We're storing the
  // server-side next batch separately since the query is the json body of
  // the request and next_batch needs to be a query parameter.
  //
  // We can't put it in the final result that _processRoomEventsSearch()
  // returns since that one can be either a server-side one, a local one or a
  // fake one to fetch the remaining cached events. See the docs for
  // combineEvents() for an explanation why we need to cache events.
  const emptyResult = {
    seshatQuery: localQuery,
    _query: serverQuery,
    serverSideNextBatch: serverResponse.search_categories.room_events.next_batch,
    cachedEvents: [],
    oldestEventFrom: "server",
    results: [],
    highlights: []
  };

  // Combine our results.
  const combinedResult = combineResponses(emptyResult, localResponse, serverResponse.search_categories.room_events);

  // Let the client process the combined result.
  const response = {
    search_categories: {
      room_events: combinedResult
    }
  };
  const result = client.processRoomEventsSearch(emptyResult, response);

  // Restore our encryption info so we can properly re-verify the events.
  restoreEncryptionInfo(result.results);
  return result;
}
async function localSearch(searchTerm, roomId = undefined, processResult = true) {
  const eventIndex = EventIndexPeg/* default */.Z.get();
  const searchArgs = {
    search_term: searchTerm,
    before_limit: 1,
    after_limit: 1,
    limit: SEARCH_LIMIT,
    order_by_recency: true,
    room_id: undefined
  };
  if (roomId !== undefined) {
    searchArgs.room_id = roomId;
  }
  const localResult = await eventIndex.search(searchArgs);
  searchArgs.next_batch = localResult.next_batch;
  const result = {
    response: localResult,
    query: searchArgs
  };
  return result;
}
async function localSearchProcess(searchTerm, roomId = undefined) {
  const emptyResult = {
    results: [],
    highlights: []
  };
  if (searchTerm === "") return emptyResult;
  const result = await localSearch(searchTerm, roomId);
  emptyResult.seshatQuery = result.query;
  const response = {
    search_categories: {
      room_events: result.response
    }
  };
  const processedResult = MatrixClientPeg/* MatrixClientPeg */.p.get().processRoomEventsSearch(emptyResult, response);
  // Restore our encryption info so we can properly re-verify the events.
  restoreEncryptionInfo(processedResult.results);
  return processedResult;
}
async function localPagination(searchResult) {
  const eventIndex = EventIndexPeg/* default */.Z.get();
  const searchArgs = searchResult.seshatQuery;
  const localResult = await eventIndex.search(searchArgs);
  searchResult.seshatQuery.next_batch = localResult.next_batch;

  // We only need to restore the encryption state for the new results, so
  // remember how many of them we got.
  const newResultCount = localResult.results.length;
  const response = {
    search_categories: {
      room_events: localResult
    }
  };
  const result = MatrixClientPeg/* MatrixClientPeg */.p.get().processRoomEventsSearch(searchResult, response);

  // Restore our encryption info so we can properly re-verify the events.
  const newSlice = result.results.slice(Math.max(result.results.length - newResultCount, 0));
  restoreEncryptionInfo(newSlice);
  searchResult.pendingRequest = null;
  return result;
}
function compareOldestEvents(firstResults, secondResults) {
  try {
    const oldestFirstEvent = firstResults[firstResults.length - 1].result;
    const oldestSecondEvent = secondResults[secondResults.length - 1].result;
    if (oldestFirstEvent.origin_server_ts <= oldestSecondEvent.origin_server_ts) {
      return -1;
    } else {
      return 1;
    }
  } catch {
    return 0;
  }
}
function combineEventSources(previousSearchResult, response, a, b) {
  // Merge event sources and sort the events.
  const combinedEvents = a.concat(b).sort(compareEvents);
  // Put half of the events in the response, and cache the other half.
  response.results = combinedEvents.slice(0, SEARCH_LIMIT);
  previousSearchResult.cachedEvents = combinedEvents.slice(SEARCH_LIMIT);
}

/**
 * Combine the events from our event sources into a sorted result
 *
 * This method will first be called from the combinedSearch() method. In this
 * case we will fetch SEARCH_LIMIT events from the server and the local index.
 *
 * The method will put the SEARCH_LIMIT newest events from the server and the
 * local index in the results part of the response, the rest will be put in the
 * cachedEvents field of the previousSearchResult (in this case an empty search
 * result).
 *
 * Every subsequent call will be made from the combinedPagination() method, in
 * this case we will combine the cachedEvents and the next SEARCH_LIMIT events
 * from either the server or the local index.
 *
 * Since we have two event sources and we need to sort the results by date we
 * need keep on looking for the oldest event. We are implementing a variation of
 * a sliding window.
 *
 * The event sources are here represented as two sorted lists where the smallest
 * number represents the newest event. The two lists need to be merged in a way
 * that preserves the sorted property so they can be shown as one search result.
 * We first fetch SEARCH_LIMIT events from both sources.
 *
 * If we set SEARCH_LIMIT to 3:
 *
 *  Server events [01, 02, 04, 06, 07, 08, 11, 13]
 *                |01, 02, 04|
 *  Local events  [03, 05, 09, 10, 12, 14, 15, 16]
 *                |03, 05, 09|
 *
 *  We note that the oldest event is from the local index, and we combine the
 *  results:
 *
 *  Server window [01, 02, 04]
 *  Local window  [03, 05, 09]
 *
 *  Combined events [01, 02, 03, 04, 05, 09]
 *
 *  We split the combined result in the part that we want to present and a part
 *  that will be cached.
 *
 *  Presented events [01, 02, 03]
 *  Cached events    [04, 05, 09]
 *
 *  We slide the window for the server since the oldest event is from the local
 *  index.
 *
 *  Server events [01, 02, 04, 06, 07, 08, 11, 13]
 *                            |06, 07, 08|
 *  Local events  [03, 05, 09, 10, 12, 14, 15, 16]
 *                |XX, XX, XX|
 *  Cached events [04, 05, 09]
 *
 *  We note that the oldest event is from the server and we combine the new
 *  server events with the cached ones.
 *
 *  Cached events [04, 05, 09]
 *  Server events [06, 07, 08]
 *
 *  Combined events [04, 05, 06, 07, 08, 09]
 *
 *  We split again.
 *
 *  Presented events [04, 05, 06]
 *  Cached events    [07, 08, 09]
 *
 *  We slide the local window, the oldest event is on the server.
 *
 *  Server events [01, 02, 04, 06, 07, 08, 11, 13]
 *                            |XX, XX, XX|
 *  Local events  [03, 05, 09, 10, 12, 14, 15, 16]
 *                            |10, 12, 14|
 *
 *  Cached events [07, 08, 09]
 *  Local events  [10, 12, 14]
 *  Combined events [07, 08, 09, 10, 12, 14]
 *
 *  Presented events [07, 08, 09]
 *  Cached events    [10, 12, 14]
 *
 *  Next up we slide the server window again.
 *
 *  Server events [01, 02, 04, 06, 07, 08, 11, 13]
 *                                        |11, 13|
 *  Local events  [03, 05, 09, 10, 12, 14, 15, 16]
 *                            |XX, XX, XX|
 *
 *  Cached events [10, 12, 14]
 *  Server events [11, 13]
 *  Combined events [10, 11, 12, 13, 14]
 *
 *  Presented events [10, 11, 12]
 *  Cached events    [13, 14]
 *
 *  We have one source exhausted, we fetch the rest of our events from the other
 *  source and combine it with our cached events.
 *
 *
 * @param {object} previousSearchResult A search result from a previous search
 * call.
 * @param {object} localEvents An unprocessed search result from the event
 * index.
 * @param {object} serverEvents An unprocessed search result from the server.
 *
 * @return {object} A response object that combines the events from the
 * different event sources.
 *
 */
function combineEvents(previousSearchResult, localEvents = undefined, serverEvents = undefined) {
  const response = {};
  const cachedEvents = previousSearchResult.cachedEvents;
  let oldestEventFrom = previousSearchResult.oldestEventFrom;
  response.highlights = previousSearchResult.highlights;
  if (localEvents && serverEvents && serverEvents.results) {
    // This is a first search call, combine the events from the server and
    // the local index. Note where our oldest event came from, we shall
    // fetch the next batch of events from the other source.
    if (compareOldestEvents(localEvents.results, serverEvents.results) < 0) {
      oldestEventFrom = "local";
    }
    combineEventSources(previousSearchResult, response, localEvents.results, serverEvents.results);
    response.highlights = localEvents.highlights.concat(serverEvents.highlights);
  } else if (localEvents) {
    // This is a pagination call fetching more events from the local index,
    // meaning that our oldest event was on the server.
    // Change the source of the oldest event if our local event is older
    // than the cached one.
    if (compareOldestEvents(localEvents.results, cachedEvents) < 0) {
      oldestEventFrom = "local";
    }
    combineEventSources(previousSearchResult, response, localEvents.results, cachedEvents);
  } else if (serverEvents && serverEvents.results) {
    // This is a pagination call fetching more events from the server,
    // meaning that our oldest event was in the local index.
    // Change the source of the oldest event if our server event is older
    // than the cached one.
    if (compareOldestEvents(serverEvents.results, cachedEvents) < 0) {
      oldestEventFrom = "server";
    }
    combineEventSources(previousSearchResult, response, serverEvents.results, cachedEvents);
  } else {
    // This is a pagination call where we exhausted both of our event
    // sources, let's push the remaining cached events.
    response.results = cachedEvents;
    previousSearchResult.cachedEvents = [];
  }
  previousSearchResult.oldestEventFrom = oldestEventFrom;
  return response;
}

/**
 * Combine the local and server search responses
 *
 * @param {object} previousSearchResult A search result from a previous search
 * call.
 * @param {object} localEvents An unprocessed search result from the event
 * index.
 * @param {object} serverEvents An unprocessed search result from the server.
 *
 * @return {object} A response object that combines the events from the
 * different event sources.
 */
function combineResponses(previousSearchResult, localEvents = undefined, serverEvents = undefined) {
  // Combine our events first.
  const response = combineEvents(previousSearchResult, localEvents, serverEvents);

  // Our first search will contain counts from both sources, subsequent
  // pagination requests will fetch responses only from one of the sources, so
  // reuse the first count when we're paginating.
  if (previousSearchResult.count) {
    response.count = previousSearchResult.count;
  } else {
    response.count = localEvents.count + serverEvents.count;
  }

  // Update our next batch tokens for the given search sources.
  if (localEvents) {
    previousSearchResult.seshatQuery.next_batch = localEvents.next_batch;
  }
  if (serverEvents) {
    previousSearchResult.serverSideNextBatch = serverEvents.next_batch;
  }

  // Set the response next batch token to one of the tokens from the sources,
  // this makes sure that if we exhaust one of the sources we continue with
  // the other one.
  if (previousSearchResult.seshatQuery.next_batch) {
    response.next_batch = previousSearchResult.seshatQuery.next_batch;
  } else if (previousSearchResult.serverSideNextBatch) {
    response.next_batch = previousSearchResult.serverSideNextBatch;
  }

  // We collected all search results from the server as well as from Seshat,
  // we still have some events cached that we'll want to display on the next
  // pagination request.
  //
  // Provide a fake next batch token for that case.
  if (!response.next_batch && previousSearchResult.cachedEvents.length > 0) {
    response.next_batch = "cached";
  }
  return response;
}
function restoreEncryptionInfo(searchResultSlice = []) {
  for (let i = 0; i < searchResultSlice.length; i++) {
    const timeline = searchResultSlice[i].context.getTimeline();
    for (let j = 0; j < timeline.length; j++) {
      const mxEv = timeline[j];
      const ev = mxEv.event;
      if (ev.curve25519Key) {
        mxEv.makeEncrypted(_types_event/* EventType */.tw.RoomMessageEncrypted, {
          algorithm: ev.algorithm
        }, ev.curve25519Key, ev.ed25519Key);
        // @ts-ignore
        mxEv.forwardingCurve25519KeyChain = ev.forwardingCurve25519KeyChain;
        delete ev.curve25519Key;
        delete ev.ed25519Key;
        delete ev.algorithm;
        delete ev.forwardingCurve25519KeyChain;
      }
    }
  }
}
async function combinedPagination(searchResult) {
  const eventIndex = EventIndexPeg/* default */.Z.get();
  const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
  const searchArgs = searchResult.seshatQuery;
  const oldestEventFrom = searchResult.oldestEventFrom;
  let localResult;
  let serverSideResult;

  // Fetch events from the local index if we have a token for it and if it's
  // the local indexes turn or the server has exhausted its results.
  if (searchArgs.next_batch && (!searchResult.serverSideNextBatch || oldestEventFrom === "server")) {
    localResult = await eventIndex.search(searchArgs);
  }

  // Fetch events from the server if we have a token for it and if it's the
  // local indexes turn or the local index has exhausted its results.
  if (searchResult.serverSideNextBatch && (oldestEventFrom === "local" || !searchArgs.next_batch)) {
    const body = {
      body: searchResult._query,
      next_batch: searchResult.serverSideNextBatch
    };
    serverSideResult = await client.search(body);
  }
  let serverEvents;
  if (serverSideResult) {
    serverEvents = serverSideResult.search_categories.room_events;
  }

  // Combine our events.
  const combinedResult = combineResponses(searchResult, localResult, serverEvents);
  const response = {
    search_categories: {
      room_events: combinedResult
    }
  };
  const oldResultCount = searchResult.results ? searchResult.results.length : 0;

  // Let the client process the combined result.
  const result = client.processRoomEventsSearch(searchResult, response);

  // Restore our encryption info so we can properly re-verify the events.
  const newResultCount = result.results.length - oldResultCount;
  const newSlice = result.results.slice(Math.max(result.results.length - newResultCount, 0));
  restoreEncryptionInfo(newSlice);
  searchResult.pendingRequest = null;
  return result;
}
function eventIndexSearch(term, roomId = undefined) {
  let searchPromise;
  if (roomId !== undefined) {
    if (MatrixClientPeg/* MatrixClientPeg */.p.get().isRoomEncrypted(roomId)) {
      // The search is for a single encrypted room, use our local
      // search method.
      searchPromise = localSearchProcess(term, roomId);
    } else {
      // The search is for a single non-encrypted room, use the
      // server-side search.
      searchPromise = serverSideSearchProcess(term, roomId);
    }
  } else {
    // Search across all rooms, combine a server side search and a
    // local search.
    searchPromise = combinedSearch(term);
  }
  return searchPromise;
}
function eventIndexSearchPagination(searchResult) {
  const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
  const seshatQuery = searchResult.seshatQuery;
  const serverQuery = searchResult._query;
  if (!seshatQuery) {
    // This is a search in a non-encrypted room. Do the normal server-side
    // pagination.
    return client.backPaginateRoomEventsSearch(searchResult);
  } else if (!serverQuery) {
    // This is a search in a encrypted room. Do a local pagination.
    const promise = localPagination(searchResult);
    searchResult.pendingRequest = promise;
    return promise;
  } else {
    // We have both queries around, this is a search across all rooms so a
    // combined pagination needs to be done.
    const promise = combinedPagination(searchResult);
    searchResult.pendingRequest = promise;
    return promise;
  }
}
function searchPagination(searchResult) {
  const eventIndex = EventIndexPeg/* default */.Z.get();
  const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
  if (searchResult.pendingRequest) return searchResult.pendingRequest;
  if (eventIndex === null) return client.backPaginateRoomEventsSearch(searchResult);else return eventIndexSearchPagination(searchResult);
}
function eventSearch(term, roomId = undefined) {
  const eventIndex = EventIndexPeg/* default */.Z.get();
  if (eventIndex === null) return serverSideSearchProcess(term, roomId);else return eventIndexSearch(term, roomId);
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/MainSplit.tsx
var MainSplit = __webpack_require__(409957);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/RightPanel.tsx + 56 modules
var RightPanel = __webpack_require__(285243);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/RoomViewStore.tsx
var RoomViewStore = __webpack_require__(144332);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/stores/RoomScrollStateStore.ts

/*
Copyright 2017 New Vector Ltd

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
 * Stores where the user has scrolled to in each room
 */
class RoomScrollStateStore {
  constructor() {
    // A map from room id to scroll state.
    //
    // If there is no special scroll state (ie, we are following the live
    // timeline), the scroll state is null. Otherwise, it is an object with
    // the following properties:
    //
    //    focussedEvent: the ID of the 'focussed' event. Typically this is
    //        the last event fully visible in the viewport, though if we
    //        have done an explicit scroll to an explicit event, it will be
    //        that event.
    //
    //    pixelOffset: the number of pixels the window is scrolled down
    //        from the focussedEvent.
    (0,defineProperty/* default */.Z)(this, "scrollStateMap", new Map());
  }
  getScrollState(roomId) {
    return this.scrollStateMap.get(roomId);
  }
  setScrollState(roomId, scrollState) {
    this.scrollStateMap.set(roomId, scrollState);
  }
}
if (window.mxRoomScrollStateStore === undefined) {
  window.mxRoomScrollStateStore = new RoomScrollStateStore();
}
/* harmony default export */ const stores_RoomScrollStateStore = (window.mxRoomScrollStateStore);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/WidgetEchoStore.ts
var WidgetEchoStore = __webpack_require__(268129);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/settings/SettingsStore.ts + 9 modules
var SettingsStore = __webpack_require__(571879);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/settings/Layout.ts
var Layout = __webpack_require__(244088);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AccessibleButton.tsx
var AccessibleButton = __webpack_require__(805035);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/RightPanelStore.ts
var RightPanelStore = __webpack_require__(652458);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/EventTile.tsx + 7 modules
var EventTile = __webpack_require__(585340);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/contexts/RoomContext.ts
var RoomContext = __webpack_require__(880133);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/contexts/MatrixClientContext.ts
var MatrixClientContext = __webpack_require__(311878);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/ShieldUtils.ts
var ShieldUtils = __webpack_require__(399906);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/actions.ts
var actions = __webpack_require__(473627);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/ScrollPanel.tsx
var ScrollPanel = __webpack_require__(822507);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/TimelinePanel.tsx + 30 modules
var TimelinePanel = __webpack_require__(672214);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/ErrorBoundary.tsx
var ErrorBoundary = __webpack_require__(618675);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/SdkConfig.ts
var SdkConfig = __webpack_require__(374312);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/IdentityAuthClient.js
var IdentityAuthClient = __webpack_require__(961427);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/CommunityPrototypeStore.ts
var CommunityPrototypeStore = __webpack_require__(967521);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/AsyncStore.ts
var AsyncStore = __webpack_require__(10879);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/replaceableComponent.ts
var replaceableComponent = __webpack_require__(90287);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/HtmlUtils.tsx
var HtmlUtils = __webpack_require__(714813);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/InviteReason.tsx

var _dec, _class;
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






let InviteReason = (_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.elements.InviteReason"), _dec(_class = class InviteReason extends react.PureComponent {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "onViewClick", () => {
      this.setState({
        hidden: false
      });
    });
    this.state = {
      // We hide the reason for invitation by default, since it can be a
      // vector for spam/harassment.
      hidden: true
    };
  }
  render() {
    const classes = classnames_default()({
      "mx_InviteReason": true,
      "mx_InviteReason_hidden": this.state.hidden
    });
    return /*#__PURE__*/react.createElement("div", {
      className: classes
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_InviteReason_reason"
    }, this.props.htmlReason ? (0,HtmlUtils/* sanitizedHtmlNode */.mJ)(this.props.htmlReason) : this.props.reason), /*#__PURE__*/react.createElement("div", {
      className: "mx_InviteReason_view",
      onClick: this.onViewClick
    }, (0,languageHandler._t)("View message")));
  }
}) || _class);

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Spinner.tsx
var Spinner = __webpack_require__(641542);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/SpaceRoomView.tsx + 20 modules
var SpaceRoomView = __webpack_require__(102420);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/ExploreStore.ts
var ExploreStore = __webpack_require__(512892);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/avatars/RoomAvatar.tsx
var RoomAvatar = __webpack_require__(139319);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/RoomPreviewBar.tsx

var RoomPreviewBar_dec, RoomPreviewBar_class, _class2;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
Copyright 2015-2021 The Matrix.org Foundation C.I.C.

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



















const MemberEventHtmlReasonField = "io.element.html_reason";
var MessageCase = /*#__PURE__*/function (MessageCase) {
  MessageCase["NotLoggedIn"] = "NotLoggedIn";
  MessageCase["Joining"] = "Joining";
  MessageCase["Loading"] = "Loading";
  MessageCase["Rejecting"] = "Rejecting";
  MessageCase["Kicked"] = "Kicked";
  MessageCase["Banned"] = "Banned";
  MessageCase["OtherThreePIDError"] = "OtherThreePIDError";
  MessageCase["InvitedEmailNotFoundInAccount"] = "InvitedEmailNotFoundInAccount";
  MessageCase["InvitedEmailNoIdentityServer"] = "InvitedEmailNoIdentityServer";
  MessageCase["InvitedEmailMismatch"] = "InvitedEmailMismatch";
  MessageCase["Invite"] = "Invite";
  MessageCase["ViewingRoom"] = "ViewingRoom";
  MessageCase["RoomNotFound"] = "RoomNotFound";
  MessageCase["OtherError"] = "OtherError";
  MessageCase["DeleteRoom"] = "DeleteRoom";
  MessageCase["DeleteSquad"] = "DeleteSquad";
  return MessageCase;
}(MessageCase || {});
let RoomPreviewBar = (RoomPreviewBar_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.rooms.RoomPreviewBar"), RoomPreviewBar_dec(RoomPreviewBar_class = (_class2 = class RoomPreviewBar extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "lastMessageCase", void 0);
    (0,defineProperty/* default */.Z)(this, "dispatcherRef", void 0);
    (0,defineProperty/* default */.Z)(this, "onAction", payload => {
      if (payload.action === "token_qualified_error") {
        this.setState({
          roomInfo: _objectSpread(_objectSpread({}, this.state.roomInfo), {}, {
            joinParams: payload.content.join_params,
            joinAdvance: payload.content.join_advance
          })
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onCommunityUpdate", roomId => {
      if (this.props.room && this.props.room.roomId !== roomId) {
        return;
      }
      this.forceUpdate(); // we have nothing to update
    });
    (0,defineProperty/* default */.Z)(this, "onLoginClick", () => {
      dispatcher/* default */.ZP.dispatch({
        action: "start_login",
        screenAfterLogin: this.makeScreenAfterLogin()
      });
    });
    (0,defineProperty/* default */.Z)(this, "onRegisterClick", () => {
      dispatcher/* default */.ZP.dispatch({
        action: "start_registration",
        screenAfterLogin: this.makeScreenAfterLogin()
      });
    });
    (0,defineProperty/* default */.Z)(this, "onClose", () => {
      const room = this.props.room;
      if (room.hasSpaceParent()) {
        const spaceId = room.getParentRoom().roomId;
        dispatcher/* default */.ZP.dispatch({
          action: "view_room",
          room_id: spaceId
        });
      } else if (room.isSpaceRoom) {
        dispatcher/* default */.ZP.dispatch({
          action: "view_home_page"
        });
      }
    });
    this.state = {
      busy: false,
      roomInfo: {}
    };
  }
  componentDidMount() {
    this.checkInvitedEmail();
    CommunityPrototypeStore/* CommunityPrototypeStore */.Z.instance.on(AsyncStore/* UPDATE_EVENT */.aY, this.onCommunityUpdate);
    this.dispatcherRef = dispatcher/* default */.ZP.register(this.onAction);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.invitedEmail !== prevProps.invitedEmail || this.props.inviterName !== prevProps.inviterName) {
      this.checkInvitedEmail();
    }
    if ((prevProps.loading || prevState.busy) && this.getMessageCase() === MessageCase.ViewingRoom) {
      const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
      const roomId = RoomViewStore/* default */.Z.getRoomId();
      Promise.all([cli.getSdnSquadInfo$$(roomId), cli.getRoomDetail(roomId)]).then(([shareRes, baseRes]) => {
        if (shareRes !== null && shareRes !== void 0 && shareRes.join_rules) {
          var _shareRes$members;
          this.setState({
            roomInfo: _objectSpread(_objectSpread({}, shareRes), {}, {
              memberCount: (_shareRes$members = shareRes.members) === null || _shareRes$members === void 0 ? void 0 : _shareRes$members.length
            })
          });
        } else {
          const item = ExploreStore/* default */.Z.resolveItem(baseRes);
          this.setState({
            roomInfo: {
              room_id: item.id,
              name: item.name,
              background: item.bg,
              avatar: item.avatar,
              join_rules: item.auth,
              public: item.auth === "Public",
              topic: item.desc,
              urls: item.urls,
              type: item.type,
              space: item.space,
              memberCount: item.member,
              joinParams: item.joinParams,
              joinAdvance: item.joinAdvance
            }
          });
        }
      });
      // MatrixClientPeg.get()
      //     .getSdnSquadInfo(RoomViewStore.getRoomId())
      //     .then((res) => {
      //         this.setState({
      //             roomInfo: {
      //                 ...res,
      //                 avatar: res.avatar,
      //                 join_rules: res.join_rules,
      //                 name: res.name,
      //                 public: res.public,
      //                 room_id: res.room_id,
      //             },
      //         });
      //     });
    }
    // const messageCase = this.getMessageCase();
    // if (
    //     (prevProps.loading || prevState.busy) &&
    //     (messageCase === MessageCase.ViewingRoom ||
    //         (messageCase === MessageCase.Invite && !this.isDMInvite())) &&
    //     this.props.room
    // ) {
    //     MatrixClientPeg.get()
    //         .getRoomDetail(RoomViewStore.getRoomId())
    //         .then((res) => {
    //             const item = ExploreStore.resolveItem(res);
    //             this.setState({
    //                 roomInfo: {
    //                     room_id: item.id,
    //                     name: item.name,
    //                     background: item.bg,
    //                     avatar: item.avatar,
    //                     join_rules: item.auth,
    //                     public: item.auth === "Public",
    //                     topic: item.desc,
    //                     urls: item.urls,
    //                     type: item.type,
    //                     space: item.space,
    //                     memberCount: item.member,
    //                     joinParams: item.joinParams,
    //                     joinAdvance: item.joinAdvance,
    //                 },
    //             });
    //         });
    // }
  }

  componentWillUnmount() {
    CommunityPrototypeStore/* CommunityPrototypeStore */.Z.instance.off(AsyncStore/* UPDATE_EVENT */.aY, this.onCommunityUpdate);
    dispatcher/* default */.ZP.unregister(this.dispatcherRef);
  }
  async checkInvitedEmail() {
    // If this is an invite and we've been told what email address was
    // invited, fetch the user's account emails and discovery bindings so we
    // can check them against the email that was invited.
    if (this.props.inviterName && this.props.invitedEmail) {
      this.setState({
        busy: true
      });
      try {
        // Gather the account 3PIDs
        const account3pids = await MatrixClientPeg/* MatrixClientPeg */.p.get().getThreePids();
        this.setState({
          accountEmails: account3pids.threepids.filter(b => b.medium === "email").map(b => b.address)
        });
        // If we have an IS connected, use that to lookup the email and
        // check the bound MXID.
        if (!MatrixClientPeg/* MatrixClientPeg */.p.get().getIdentityServerUrl()) {
          this.setState({
            busy: false
          });
          return;
        }
        const authClient = new IdentityAuthClient/* default */.Z();
        const identityAccessToken = await authClient.getAccessToken();
        const result = await MatrixClientPeg/* MatrixClientPeg */.p.get().lookupThreePid("email", this.props.invitedEmail, undefined /* callback */, identityAccessToken);
        this.setState({
          invitedEmailMxid: result.mxid
        });
      } catch (err) {
        this.setState({
          threePidFetchError: err
        });
      }
      this.setState({
        busy: false
      });
    }
  }
  getMessageCase() {
    const isGuest = MatrixClientPeg/* MatrixClientPeg */.p.get().isGuest();
    if (isGuest) {
      return MessageCase.NotLoggedIn;
    }
    const myMember = this.getMyMember();
    if (myMember) {
      if (myMember.isKicked()) {
        return MessageCase.Invite;
      } else if (myMember.membership === "ban") {
        return MessageCase.Banned;
      } else if (myMember.isDeleted() && this.props.room.hasSpaceParent()) {
        return MessageCase.DeleteRoom;
      } else if (myMember.isDeleted() && this.props.room.isSpaceRoom()) {
        return MessageCase.DeleteSquad;
      }
    }
    let result = null;
    if (this.props.inviterName) {
      if (this.props.invitedEmail) {
        if (this.state.threePidFetchError) {
          result = MessageCase.OtherThreePIDError;
        } else if (this.state.accountEmails && !this.state.accountEmails.includes(this.props.invitedEmail)) {
          result = MessageCase.InvitedEmailNotFoundInAccount;
        } else if (!MatrixClientPeg/* MatrixClientPeg */.p.get().getIdentityServerUrl()) {
          result = MessageCase.InvitedEmailNoIdentityServer;
        } else if (this.state.invitedEmailMxid != MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId()) {
          result = MessageCase.InvitedEmailMismatch;
        }
      }
      result = MessageCase.Invite;
    }
    if (this.props.joining) {
      if (result === MessageCase.Invite) {
        return result;
      }
      if (this.state.roomInfo.room_id || this.lastMessageCase === MessageCase.ViewingRoom) {
        return MessageCase.ViewingRoom;
      }
      return MessageCase.Joining;
    } else if (this.props.rejecting) {
      return MessageCase.Rejecting;
    } else if (this.props.loading || this.state.busy) {
      return MessageCase.Loading;
    }
    if (this.props.inviterName) {
      return result;
    } else if (this.props.error) {
      if (this.props.error.errcode == "M_NOT_FOUND") {
        return MessageCase.RoomNotFound;
      } else {
        return MessageCase.OtherError;
      }
    } else {
      return MessageCase.ViewingRoom;
    }
  }
  getKickOrBanInfo() {
    const myMember = this.getMyMember();
    if (!myMember) {
      return {};
    }
    const kickerMember = this.props.room.currentState.getMember(myMember.events.member.getSender());
    const memberName = kickerMember ? kickerMember.name : myMember.events.member.getSender();
    const reason = myMember.events.member.getContent().reason;
    return {
      memberName,
      reason
    };
  }
  joinRule() {
    var _this$props$room, _this$props$room$curr;
    return (_this$props$room = this.props.room) === null || _this$props$room === void 0 ? void 0 : (_this$props$room$curr = _this$props$room.currentState.getStateEvents(_types_event/* EventType */.tw.RoomJoinRules, "")) === null || _this$props$room$curr === void 0 ? void 0 : _this$props$room$curr.getContent().join_rule;
  }
  communityProfile() {
    if (this.props.room) return CommunityPrototypeStore/* CommunityPrototypeStore */.Z.instance.getInviteProfile(this.props.room.roomId);
    return {
      displayName: null,
      avatarMxc: null
    };
  }
  roomName(atStart = false) {
    let name = this.props.room ? this.props.room.name : this.props.roomAlias;
    const profile = this.communityProfile();
    if (profile.displayName) name = profile.displayName;
    if (name) {
      return name;
    } else if (atStart) {
      return (0,languageHandler._t)("This room");
    } else {
      return (0,languageHandler._t)("this room");
    }
  }
  getMyMember() {
    var _this$props$room2;
    return (_this$props$room2 = this.props.room) === null || _this$props$room2 === void 0 ? void 0 : _this$props$room2.getMember(MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId());
  }
  getInviteMember() {
    const {
      room
    } = this.props;
    if (!room) {
      return;
    }
    const myUserId = MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId();
    return room.currentState.getMember(myUserId);
    // if (!inviteEvent) {
    //     return;
    // }
    // const inviterUserId = inviteEvent.events.member.getSender();
    // return room.currentState.getMember(inviterUserId);
  }

  isDMInvite() {
    const myMember = this.getMyMember();
    if (!myMember) {
      return false;
    }
    const memberEvent = myMember.events.member;
    const memberContent = memberEvent.getContent();
    return memberContent.membership === "invite" && memberContent.is_direct;
  }
  makeScreenAfterLogin() {
    return {
      screen: "room",
      params: {
        email: this.props.invitedEmail,
        signurl: this.props.signUrl,
        room_name: this.props.oobData ? this.props.oobData.room_name : null,
        room_avatar_url: this.props.oobData ? this.props.oobData.avatarUrl : null,
        inviter_name: this.props.oobData ? this.props.oobData.inviterName : null
      }
    };
  }
  isDeleted() {
    const myMember = this.getMyMember();
    if (myMember) {
      return myMember.isDeleted();
    }
    return false;
  }
  render() {
    const brand = SdkConfig/* default */.Z.get().brand;
    let showSpinner = false;
    let title;
    let subTitle;
    let reasonElement;
    let primaryActionHandler;
    let primaryActionLabel;
    let secondaryActionHandler;
    let secondaryActionLabel;
    let footer;
    const extraComponents = [];
    const messageCase = this.getMessageCase();
    this.lastMessageCase = messageCase;
    if (messageCase === MessageCase.Invite && !this.isDMInvite()) {
      // return this.state.roomInfo.room_id ? (
      return /*#__PURE__*/react.createElement(SpaceRoomView/* SpacePreview */.T_, {
        key: "MessageCase.Invite",
        space: this.props.room,
        oobData: this.props.oobData,
        roomInfo: this.state.roomInfo,
        onJoinButtonClicked: this.props.onJoinClick,
        onRejectButtonClicked: this.props.onRejectClick,
        onRejectAndIgnoreClick: this.props.onRejectAndIgnoreClick
      });
      // ) : null;
    }

    switch (messageCase) {
      case MessageCase.Joining:
        {
          var _this$props$oobData;
          title = ((_this$props$oobData = this.props.oobData) === null || _this$props$oobData === void 0 ? void 0 : _this$props$oobData.roomType) === _types_event/* RoomType */.nW.Space ? (0,languageHandler._t)("Joining squad …") : (0,languageHandler._t)("Joining room …");
          showSpinner = true;
          break;
        }
      case MessageCase.Loading:
        {
          title = (0,languageHandler._t)("Loading …");
          showSpinner = true;
          break;
        }
      case MessageCase.Rejecting:
        {
          title = (0,languageHandler._t)("Rejecting invite …");
          showSpinner = true;
          break;
        }
      case MessageCase.NotLoggedIn:
        {
          title = (0,languageHandler._t)("Join the conversation with an account");
          primaryActionLabel = (0,languageHandler._t)("Sign Up");
          primaryActionHandler = this.onRegisterClick;
          secondaryActionLabel = (0,languageHandler._t)("Sign In");
          secondaryActionHandler = this.onLoginClick;
          if (this.props.previewLoading) {
            footer = /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(Spinner/* default */.Z, {
              w: 20,
              h: 20
            }), (0,languageHandler._t)("Loading room preview"));
          }
          break;
        }
      case MessageCase.Kicked:
        {
          const {
            memberName,
            reason
          } = this.getKickOrBanInfo();
          title = (0,languageHandler._t)("You were kicked from %(roomName)s by %(memberName)s", {
            memberName,
            roomName: this.roomName()
          });
          subTitle = reason ? (0,languageHandler._t)("Reason: %(reason)s", {
            reason
          }) : null;
          if (this.joinRule() === "invite") {
            primaryActionLabel = (0,languageHandler._t)("Forget this room");
            primaryActionHandler = this.props.onForgetClick;
          } else {
            primaryActionLabel = (0,languageHandler._t)("Re-join");
            primaryActionHandler = this.props.onJoinClick;
            secondaryActionLabel = (0,languageHandler._t)("Forget this room");
            secondaryActionHandler = this.props.onForgetClick;
          }
          break;
        }
      case MessageCase.Banned:
        {
          const {
            memberName,
            reason
          } = this.getKickOrBanInfo();
          title = (0,languageHandler._t)("You were banned from %(roomName)s by %(memberName)s", {
            memberName,
            roomName: this.roomName()
          });
          subTitle = reason ? (0,languageHandler._t)("Reason: %(reason)s", {
            reason
          }) : null;
          primaryActionLabel = (0,languageHandler._t)("Forget this room");
          primaryActionHandler = this.props.onForgetClick;
          break;
        }
      case MessageCase.DeleteRoom:
        {
          title = (0,languageHandler._t)("The room has been dissolved");
          primaryActionLabel = (0,languageHandler._t)("Close");
          primaryActionHandler = this.onClose;
          break;
        }
      case MessageCase.DeleteSquad:
        {
          title = (0,languageHandler._t)("The squad has been dissolved");
          primaryActionLabel = (0,languageHandler._t)("Close");
          primaryActionHandler = this.onClose;
          break;
        }
      case MessageCase.OtherThreePIDError:
        {
          title = (0,languageHandler._t)("Something went wrong with your invite to %(roomName)s", {
            roomName: this.roomName()
          });
          const joinRule = this.joinRule();
          const errCodeMessage = (0,languageHandler._t)("An error (%(errcode)s) was returned while trying to validate your " + "invite. You could try to pass this information on to a room admin.", {
            errcode: this.state.threePidFetchError.errcode || (0,languageHandler._t)("unknown error code")
          });
          switch (joinRule) {
            case "invite":
              subTitle = [(0,languageHandler._t)("You can only join it with a working invite."), errCodeMessage];
              primaryActionLabel = (0,languageHandler._t)("Try to join anyway");
              primaryActionHandler = this.props.onJoinClick;
              break;
            case "public":
              subTitle = (0,languageHandler._t)("You can still join it because this is a public room.");
              primaryActionLabel = (0,languageHandler._t)("Join the discussion");
              primaryActionHandler = this.props.onJoinClick;
              break;
            default:
              subTitle = errCodeMessage;
              primaryActionLabel = (0,languageHandler._t)("Try to join anyway");
              primaryActionHandler = this.props.onJoinClick;
              break;
          }
          break;
        }
      case MessageCase.InvitedEmailNotFoundInAccount:
        {
          title = (0,languageHandler._t)("This invite to %(roomName)s was sent to %(email)s which is not " + "associated with your account", {
            roomName: this.roomName(),
            email: this.props.invitedEmail
          });
          subTitle = (0,languageHandler._t)("Link this email with your account in Settings to receive invites " + "directly in %(brand)s.", {
            brand
          });
          primaryActionLabel = (0,languageHandler._t)("Join the discussion");
          primaryActionHandler = this.props.onJoinClick;
          break;
        }
      case MessageCase.InvitedEmailNoIdentityServer:
        {
          title = (0,languageHandler._t)("This invite to %(roomName)s was sent to %(email)s", {
            roomName: this.roomName(),
            email: this.props.invitedEmail
          });
          subTitle = (0,languageHandler._t)("Use an identity server in Settings to receive invites directly in %(brand)s.", {
            brand
          });
          primaryActionLabel = (0,languageHandler._t)("Join the discussion");
          primaryActionHandler = this.props.onJoinClick;
          break;
        }
      case MessageCase.InvitedEmailMismatch:
        {
          title = (0,languageHandler._t)("This invite to %(roomName)s was sent to %(email)s", {
            roomName: this.roomName(),
            email: this.props.invitedEmail
          });
          subTitle = (0,languageHandler._t)("Share this email in Settings to receive invites directly in %(brand)s.", {
            brand
          });
          primaryActionLabel = (0,languageHandler._t)("Join the discussion");
          primaryActionHandler = this.props.onJoinClick;
          break;
        }
      case MessageCase.Invite:
        {
          var _inviteMember$events$, _inviteMember$events, _inviteMember$events$2;
          const isDM = this.isDMInvite();
          const inviteMember = this.getInviteMember();
          const {
            content: {
              sender_display_name = "",
              sender_avatar_url = ""
            },
            sender
          } = (_inviteMember$events$ = inviteMember === null || inviteMember === void 0 ? void 0 : (_inviteMember$events = inviteMember.events) === null || _inviteMember$events === void 0 ? void 0 : (_inviteMember$events$2 = _inviteMember$events.member) === null || _inviteMember$events$2 === void 0 ? void 0 : _inviteMember$events$2.event) !== null && _inviteMember$events$ !== void 0 ? _inviteMember$events$ : {};
          const oobData = Object.assign({}, this.props.oobData, {
            avatarUrl: isDM ? sender_avatar_url : this.communityProfile().avatarMxc
          });
          const avatar = /*#__PURE__*/react.createElement(RoomAvatar/* default */.Z, {
            room: this.props.room,
            oobData: oobData,
            size: "middle"
          });
          let inviterElement;
          if (inviteMember) {
            inviterElement = /*#__PURE__*/react.createElement("span", null, /*#__PURE__*/react.createElement("span", {
              className: "mx_RoomPreviewBar_inviter"
            }, sender_display_name), " ", "(", sender, ")");
          } else {
            inviterElement = /*#__PURE__*/react.createElement("span", {
              className: "mx_RoomPreviewBar_inviter"
            }, sender_display_name);
          }
          if (isDM) {
            title = (0,languageHandler._t)("Do you want to chat with %(user)s?", {
              user: sender_display_name
            });
            subTitle = [avatar, (0,languageHandler._t)("<userName/> wants to chat", {}, {
              userName: () => inviterElement
            })];
            primaryActionLabel = inviteMember ? (0,languageHandler._t)("Start chatting") : "";
          } else {
            title = (0,languageHandler._t)("Do you want to join %(roomName)s?", {
              roomName: this.roomName()
            });
            subTitle = [avatar, (0,languageHandler._t)("<userName/> invited you", {}, {
              userName: () => inviterElement
            })];
            primaryActionLabel = (0,languageHandler._t)("Accept");
          }
          const myUserId = MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId();
          const memberEventContent = this.props.room.currentState.getMember(myUserId).events.member.getContent();
          if (memberEventContent.reason) {
            reasonElement = /*#__PURE__*/react.createElement(InviteReason, {
              reason: memberEventContent.reason,
              htmlReason: memberEventContent[MemberEventHtmlReasonField]
            });
          }
          primaryActionHandler = this.props.onJoinClick;
          secondaryActionLabel = (0,languageHandler._t)("Reject");
          secondaryActionHandler = this.props.onRejectClick;
          if (this.props.onRejectAndIgnoreClick) {
            extraComponents.push( /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
              kind: "link",
              onClick: this.props.onRejectAndIgnoreClick,
              key: "ignore"
            }, (0,languageHandler._t)("Reject & Ignore user")));
          }
          break;
        }
      case MessageCase.ViewingRoom:
        {
          if (this.props.room || this.state.roomInfo.room_id) {
            return this.state.roomInfo.room_id ? /*#__PURE__*/react.createElement(SpaceRoomView/* SpacePreview */.T_, {
              key: "MessageCase.ViewingRoom",
              space: this.props.room,
              oobData: this.props.oobData,
              onRejectButtonClicked: this.props.onRejectClick,
              roomInfo: this.state.roomInfo,
              onJoinButtonClicked: this.props.onJoinClick
            }) : null;
          }
          title = (0,languageHandler._t)("Loading …");
          showSpinner = true;
          break;
        }
      case MessageCase.RoomNotFound:
        {
          title = (0,languageHandler._t)("%(roomName)s does not exist.", {
            roomName: this.roomName(true)
          });
          subTitle = (0,languageHandler._t)("This room doesn't exist. Are you sure you're at the right place?");
          break;
        }
      case MessageCase.OtherError:
        {
          title = (0,languageHandler._t)("%(roomName)s is not accessible at this time.", {
            roomName: this.roomName(true)
          });
          subTitle = [(0,languageHandler._t)("Try again later, or ask a room admin to check if you have access."), (0,languageHandler._t)("%(errcode)s was returned while trying to access the room. " + "If you think you're seeing this message in error, please " + "<issueLink>submit a bug report</issueLink>.", {
            errcode: this.props.error.errcode
          }, {
            issueLink: label => /*#__PURE__*/react.createElement("a", {
              // href="https://github.com/vector-im/element-web/issues/new/choose"
              target: "_blank",
              rel: "noreferrer noopener"
            }, label)
          })];
          break;
        }
    }
    let subTitleElements;
    if (subTitle) {
      if (!Array.isArray(subTitle)) {
        subTitle = [subTitle];
      }
      subTitleElements = subTitle.map((t, i) => /*#__PURE__*/react.createElement("p", {
        key: `subTitle${i}`
      }, t));
    }
    let titleElement;
    if (showSpinner) {
      titleElement = /*#__PURE__*/react.createElement("h3", {
        className: "mx_RoomPreviewBar_spinnerTitle"
      }, /*#__PURE__*/react.createElement(Spinner/* default */.Z, null), title);
    } else {
      titleElement = /*#__PURE__*/react.createElement("h3", null, title);
    }
    let primaryButton;
    if (primaryActionHandler) {
      primaryButton = primaryActionLabel ? /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
        kind: "primary",
        onClick: primaryActionHandler
      }, primaryActionLabel) : null;
    }
    let secondaryButton;
    if (secondaryActionHandler) {
      secondaryButton = /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
        kind: "secondary",
        onClick: secondaryActionHandler
      }, secondaryActionLabel);
    }
    const classes = classnames_default()("mx_RoomPreviewBar", "dark-panel", `mx_RoomPreviewBar_${messageCase}`, {
      mx_RoomPreviewBar_panel: this.props.canPreview,
      mx_RoomPreviewBar_dialog: !this.props.canPreview || this.isDeleted()
    });
    return /*#__PURE__*/react.createElement("div", {
      className: classes
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomPreviewBar_message"
    }, titleElement, subTitleElements), reasonElement, /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomPreviewBar_actions"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomPreviewBar_actions_join_buttons"
    }, secondaryButton, primaryButton), extraComponents), /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomPreviewBar_footer"
    }, footer));
  }
}, (0,defineProperty/* default */.Z)(_class2, "defaultProps", {
  onJoinClick() {}
}), _class2)) || RoomPreviewBar_class);

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Keyboard.ts
var Keyboard = __webpack_require__(389310);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/UserSettingsDialog.tsx + 47 modules
var UserSettingsDialog = __webpack_require__(449878);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/DesktopBuildsNotice.tsx
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








let WarningKind = /*#__PURE__*/function (WarningKind) {
  WarningKind[WarningKind["Files"] = 0] = "Files";
  WarningKind[WarningKind["Search"] = 1] = "Search";
  return WarningKind;
}({});
function DesktopBuildsNotice({
  isRoomEncrypted,
  kind
}) {
  if (!isRoomEncrypted) return null;
  if (EventIndexPeg/* default */.Z.get()) return null;
  if (EventIndexPeg/* default */.Z.error) {
    return /*#__PURE__*/react.createElement(react.Fragment, null, (0,languageHandler._t)("Message search initialisation failed, check <a>your settings</a> for more information", {}, {
      a: sub => /*#__PURE__*/react.createElement("a", {
        onClick: evt => {
          evt.preventDefault();
          dispatcher/* default */.ZP.dispatch({
            action: actions/* Action */.a.ViewUserSettings,
            initialTabId: UserSettingsDialog/* UserTab */.oX.Security
          });
        }
      }, sub)
    }));
  }
  const {
    desktopBuilds,
    brand
  } = SdkConfig/* default */.Z.get();
  let text = null;
  let logo = null;
  if (desktopBuilds.available) {
    logo = /*#__PURE__*/react.createElement("img", {
      src: desktopBuilds.logo,
      width: 24,
      height: 24
    });
    switch (kind) {
      case WarningKind.Files:
        // text = _t("Use the <a>Desktop app</a> to see all encrypted files", {}, {
        //     a: sub => (<a href={desktopBuilds.url} target="_blank" rel="noreferrer noopener">{ sub }</a>),
        // });
        text = (0,languageHandler._t)("Use the <a>Desktop app</a> to see all encrypted files", {}, {
          a: sub => sub
        });
        break;
      case WarningKind.Search:
        text = (0,languageHandler._t)("Use the <a>Desktop app</a> to search encrypted messages", {}, {
          a: sub => sub
        });
        break;
    }
  } else {
    switch (kind) {
      case WarningKind.Files:
        text = (0,languageHandler._t)("This version of %(brand)s does not support viewing some encrypted files", {
          brand
        });
        break;
      case WarningKind.Search:
        text = (0,languageHandler._t)("This version of %(brand)s does not support searching encrypted messages", {
          brand
        });
        break;
    }
  }

  // for safety
  if (!text) {
    console.warn("Unknown desktop builds warning kind: ", kind);
    return null;
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_DesktopBuildsNotice"
  }, logo, /*#__PURE__*/react.createElement("span", null, text));
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/SearchBar.tsx

var SearchBar_dec, SearchBar_class;
/*
Copyright 2015, 2016 OpenMarket Ltd
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








let SearchScope = /*#__PURE__*/function (SearchScope) {
  SearchScope["Room"] = "Room";
  SearchScope["All"] = "All";
  return SearchScope;
}({});
let SearchBar = (SearchBar_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.rooms.SearchBar"), SearchBar_dec(SearchBar_class = class SearchBar extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "searchTerm", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "onThisRoomClick", () => {
      this.setState({
        scope: SearchScope.Room
      }, () => this.searchIfQuery());
    });
    (0,defineProperty/* default */.Z)(this, "onAllRoomsClick", () => {
      this.setState({
        scope: SearchScope.All
      }, () => this.searchIfQuery());
    });
    (0,defineProperty/* default */.Z)(this, "onSearchChange", e => {
      switch (e.key) {
        case Keyboard/* Key */.sr.ENTER:
          this.onSearch();
          break;
        case Keyboard/* Key */.sr.ESCAPE:
          this.props.onCancelClick();
          break;
      }
    });
    (0,defineProperty/* default */.Z)(this, "onSearch", () => {
      this.props.onSearch(this.searchTerm.current.value, this.state.scope);
    });
    this.state = {
      scope: SearchScope.Room
    };
  }
  searchIfQuery() {
    if (this.searchTerm.current.value) {
      this.onSearch();
    }
  }
  render() {
    const searchButtonClasses = classnames_default()("mx_SearchBar_searchButton", {
      mx_SearchBar_searching: this.props.searchInProgress
    });
    const thisRoomClasses = classnames_default()("mx_SearchBar_button", {
      mx_SearchBar_unselected: this.state.scope !== SearchScope.Room
    });
    const allRoomsClasses = classnames_default()("mx_SearchBar_button", {
      mx_SearchBar_unselected: this.state.scope !== SearchScope.All
    });
    return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
      className: "mx_SearchBar"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_SearchBar_buttons",
      role: "radiogroup"
    }, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: thisRoomClasses,
      onClick: this.onThisRoomClick,
      "aria-checked": this.state.scope === SearchScope.Room,
      role: "radio"
    }, (0,languageHandler._t)("This Room"))), /*#__PURE__*/react.createElement("div", {
      className: "mx_SearchBar_input mx_textinput"
    }, /*#__PURE__*/react.createElement("input", {
      ref: this.searchTerm,
      type: "text",
      autoFocus: true,
      placeholder: (0,languageHandler._t)("Search…"),
      onKeyDown: this.onSearchChange
    }), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: searchButtonClasses,
      onClick: this.onSearch
    })), /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      className: "mx_SearchBar_cancel",
      onClick: this.props.onCancelClick
    })), /*#__PURE__*/react.createElement(DesktopBuildsNotice, {
      isRoomEncrypted: this.props.isRoomEncrypted,
      kind: WarningKind.Search
    }));
  }
}) || SearchBar_class);

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/RoomUpgradeDialog.tsx
var RoomUpgradeDialog = __webpack_require__(659148);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/RoomUpgradeWarningBar.tsx

var RoomUpgradeWarningBar_dec, RoomUpgradeWarningBar_class;
/*
Copyright 2018-2021 The Matrix.org Foundation C.I.C.

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








let RoomUpgradeWarningBar = (RoomUpgradeWarningBar_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.rooms.RoomUpgradeWarningBar"), RoomUpgradeWarningBar_dec(RoomUpgradeWarningBar_class = class RoomUpgradeWarningBar extends react.PureComponent {
  constructor(...args) {
    super(...args);
    (0,defineProperty/* default */.Z)(this, "onStateEvents", (event, state) => {
      if (!this.props.room || event.getRoomId() !== this.props.room.roomId) {
        return;
      }
      if (event.getType() !== "m.room.tombstone") return;
      const tombstone = this.props.room.currentState.getStateEvents("m.room.tombstone", "");
      this.setState({
        upgraded: tombstone && tombstone.getContent().replacement_room
      });
    });
    (0,defineProperty/* default */.Z)(this, "onUpgradeClick", () => {
      Modal/* default */.Z.createTrackedDialog('Upgrade Room Version', '', RoomUpgradeDialog/* default */.Z, {
        room: this.props.room
      });
    });
  }
  componentDidMount() {
    const tombstone = this.props.room.currentState.getStateEvents("m.room.tombstone", "");
    this.setState({
      upgraded: tombstone && tombstone.getContent().replacement_room
    });
    MatrixClientPeg/* MatrixClientPeg */.p.get().on("RoomState.events", this.onStateEvents);
  }
  componentWillUnmount() {
    const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
    if (cli) {
      cli.removeListener("RoomState.events", this.onStateEvents);
    }
  }
  render() {
    var _this$state;
    let doUpgradeWarnings = /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomUpgradeWarningBar_body"
    }, /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("Upgrading this room will shut down the current instance of the room and create " + "an upgraded room with the same name.")), /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("<b>Warning</b>: Upgrading a room will <i>not automatically migrate room members " + "to the new version of the room.</i> We'll post a link to the new room in the old " + "version of the room - room members will have to click this link to join the new room.", {}, {
      "b": sub => /*#__PURE__*/react.createElement("b", null, sub),
      "i": sub => /*#__PURE__*/react.createElement("i", null, sub)
    }))), /*#__PURE__*/react.createElement("p", {
      className: "mx_RoomUpgradeWarningBar_upgradelink"
    }, /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
      onClick: this.onUpgradeClick
    }, (0,languageHandler._t)("Upgrade this room to the recommended room version"))));
    if ((_this$state = this.state) !== null && _this$state !== void 0 && _this$state.upgraded) {
      doUpgradeWarnings = /*#__PURE__*/react.createElement("div", {
        className: "mx_RoomUpgradeWarningBar_body"
      }, /*#__PURE__*/react.createElement("p", null, (0,languageHandler._t)("This room has already been upgraded.")));
    }
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomUpgradeWarningBar"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomUpgradeWarningBar_wrapped"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomUpgradeWarningBar_header"
    }, (0,languageHandler._t)("This room is running room version <roomVersion />, which this homeserver has " + "marked as <i>unstable</i>.", {}, {
      "roomVersion": () => /*#__PURE__*/react.createElement("code", null, this.props.room.getVersion()),
      "i": sub => /*#__PURE__*/react.createElement("i", null, sub)
    })), doUpgradeWarnings, /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomUpgradeWarningBar_small"
    }, (0,languageHandler._t)("Only room administrators will see this warning"))));
  }
}) || RoomUpgradeWarningBar_class);

// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/utils.ts
var utils = __webpack_require__(29336);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(45697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/re-resizable/lib/index.es5.js
var index_es5 = __webpack_require__(715170);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AppTile.js + 16 modules
var AppTile = __webpack_require__(659210);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/index.js + 1 modules
var src = __webpack_require__(47185);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/ScalarMessaging.js
var ScalarMessaging = __webpack_require__(468397);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/WidgetUtils.ts
var WidgetUtils = __webpack_require__(434596);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/integrations/IntegrationManagers.ts + 6 modules
var IntegrationManagers = __webpack_require__(977376);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/ResizeNotifier.ts
var ResizeNotifier = __webpack_require__(650715);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/ResizeHandle.tsx
 // eslint-disable-line no-unused-vars

//see src/resizer for the actual resizing code, this is just the DOM for the resize handle
const ResizeHandle = ({
  vertical,
  reverse,
  id,
  passRef
}) => {
  const classNames = ['mx_ResizeHandle'];
  if (vertical) {
    classNames.push('mx_ResizeHandle_vertical');
  } else {
    classNames.push('mx_ResizeHandle_horizontal');
  }
  if (reverse) {
    classNames.push('mx_ResizeHandle_reverse');
  }
  return /*#__PURE__*/react.createElement("div", {
    ref: passRef,
    className: classNames.join(' '),
    "data-id": id
  }, /*#__PURE__*/react.createElement("div", null));
};
/* harmony default export */ const elements_ResizeHandle = (ResizeHandle);
// EXTERNAL MODULE: ./node_modules/lodash-es/throttle.js
var throttle = __webpack_require__(300111);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/resizer/resizer.ts

/*
Copyright 2018 - 2020 The Matrix.org Foundation C.I.C.

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


class Resizer {
  // TODO move vertical/horizontal to config option/container class
  // as it doesn't make sense to mix them within one container/Resizer
  constructor(container, distributorCtor, config) {
    this.container = container;
    this.distributorCtor = distributorCtor;
    this.config = config;
    (0,defineProperty/* default */.Z)(this, "classNames", void 0);
    (0,defineProperty/* default */.Z)(this, "onMouseDown", event => {
      var _this$config;
      // use closest in case the resize handle contains
      // child dom nodes that can be the target
      const resizeHandle = event.target && event.target.closest(`.${this.classNames.handle}`);
      const hasHandler = this === null || this === void 0 ? void 0 : (_this$config = this.config) === null || _this$config === void 0 ? void 0 : _this$config.handler;
      if (!resizeHandle || !hasHandler && resizeHandle.parentElement !== this.container) {
        return;
      }
      // prevent starting a drag operation
      event.preventDefault();

      // mark as currently resizing
      if (this.classNames.resizing) {
        this.container.classList.add(this.classNames.resizing);
      }
      if (this.config.onResizeStart) {
        this.config.onResizeStart();
      }
      const {
        sizer,
        distributor
      } = this.createSizerAndDistributor(resizeHandle);
      distributor.start();
      const onMouseMove = event => {
        const offset = sizer.offsetFromEvent(event);
        distributor.resizeFromContainerOffset(offset);
      };
      const body = document.body;
      const finishResize = () => {
        if (this.classNames.resizing) {
          this.container.classList.remove(this.classNames.resizing);
        }
        distributor.finish();
        if (this.config.onResizeStop) {
          this.config.onResizeStop();
        }
        body.removeEventListener("mouseup", finishResize, false);
        document.removeEventListener("mouseleave", finishResize, false);
        body.removeEventListener("mousemove", onMouseMove, false);
      };
      body.addEventListener("mouseup", finishResize, false);
      document.addEventListener("mouseleave", finishResize, false);
      body.addEventListener("mousemove", onMouseMove, false);
    });
    (0,defineProperty/* default */.Z)(this, "onResize", (0,throttle/* default */.Z)(() => {
      const distributors = this.getDistributors();

      // relax all items if they had any overconstrained flexboxes
      distributors.forEach(d => d.start());
      distributors.forEach(d => d.finish());
    }, 100, {
      trailing: true,
      leading: true
    }));
    (0,defineProperty/* default */.Z)(this, "getDistributors", () => {
      return this.getResizeHandles().map(handle => {
        const {
          distributor
        } = this.createSizerAndDistributor(handle);
        return distributor;
      });
    });
    if (!container) {
      throw new Error("Resizer requires a non-null `container` arg");
    }
    this.classNames = {
      handle: "resizer-handle",
      reverse: "resizer-reverse",
      vertical: "resizer-vertical",
      resizing: "resizer-resizing"
    };
  }
  setClassNames(classNames) {
    this.classNames = classNames;
  }
  attach() {
    var _this$config$handler$, _this$config2, _this$config2$handler;
    const attachment = (_this$config$handler$ = this === null || this === void 0 ? void 0 : (_this$config2 = this.config) === null || _this$config2 === void 0 ? void 0 : (_this$config2$handler = _this$config2.handler) === null || _this$config2$handler === void 0 ? void 0 : _this$config2$handler.parentElement) !== null && _this$config$handler$ !== void 0 ? _this$config$handler$ : this.container;
    attachment.addEventListener("mousedown", this.onMouseDown, false);
    window.addEventListener("resize", this.onResize);
  }
  detach() {
    var _this$config$handler$2, _this$config3, _this$config3$handler;
    const attachment = (_this$config$handler$2 = this === null || this === void 0 ? void 0 : (_this$config3 = this.config) === null || _this$config3 === void 0 ? void 0 : (_this$config3$handler = _this$config3.handler) === null || _this$config3$handler === void 0 ? void 0 : _this$config3$handler.parentElement) !== null && _this$config$handler$2 !== void 0 ? _this$config$handler$2 : this.container;
    attachment.removeEventListener("mousedown", this.onMouseDown, false);
    window.removeEventListener("resize", this.onResize);
  }

  /**
  Gives the distributor for a specific resize handle, as if you would have started
  to drag that handle. Can be used to manipulate the size of an item programmatically.
  @param {number} handleIndex the index of the resize handle in the container
  @return {FixedDistributor} a new distributor for the given handle
  */
  forHandleAt(handleIndex) {
    const handles = this.getResizeHandles();
    const handle = handles[handleIndex];
    if (handle) {
      const {
        distributor
      } = this.createSizerAndDistributor(handle);
      return distributor;
    }
  }
  forHandleWithId(id) {
    const handles = this.getResizeHandles();
    const handle = handles.find(h => h.getAttribute("data-id") === id);
    if (handle) {
      const {
        distributor
      } = this.createSizerAndDistributor(handle);
      return distributor;
    }
  }
  isReverseResizeHandle(el) {
    return el && el.classList.contains(this.classNames.reverse);
  }
  isResizeHandle(el) {
    return el && el.classList.contains(this.classNames.handle);
  }
  createSizerAndDistributor(resizeHandle) {
    const vertical = resizeHandle.classList.contains(this.classNames.vertical);
    const reverse = this.isReverseResizeHandle(resizeHandle);
    const Distributor = this.distributorCtor;
    const useItemContainer = this.config && this.config.handler ? this.container : undefined;
    const sizer = Distributor.createSizer(this.container, vertical, reverse);
    const item = Distributor.createItem(resizeHandle, this, sizer, useItemContainer);
    const distributor = new Distributor(item);
    return {
      sizer,
      distributor
    };
  }
  getResizeHandles() {
    var _this$config4;
    if (this !== null && this !== void 0 && (_this$config4 = this.config) !== null && _this$config4 !== void 0 && _this$config4.handler) {
      return [this.config.handler];
    }
    if (!this.container.children) return [];
    return Array.from(this.container.querySelectorAll(`.${this.classNames.handle}`));
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/resizer/sizer.ts
/*
Copyright 2018 - 2020 The Matrix.org Foundation C.I.C.

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
implements DOM/CSS operations for resizing.
The sizer determines what CSS mechanism is used for sizing items, like flexbox, ...
*/
class Sizer {
  constructor(container, vertical, reverse) {
    this.container = container;
    this.vertical = vertical;
    this.reverse = reverse;
  }

  /**
      @param {Element} item the dom element being resized
      @return {number} how far the edge of the item is from the edge of the container
  */
  getItemOffset(item) {
    const offset = (this.vertical ? item.offsetTop : item.offsetLeft) - this.getOffset();
    if (this.reverse) {
      return this.getTotalSize() - (offset + this.getItemSize(item));
    } else {
      return offset;
    }
  }

  /**
      @param {Element} item the dom element being resized
      @return {number} the width/height of an item in the container
  */
  getItemSize(item) {
    return this.vertical ? item.offsetHeight : item.offsetWidth;
  }

  /** @return {number} the width/height of the container */
  getTotalSize() {
    return this.vertical ? this.container.offsetHeight : this.container.offsetWidth;
  }

  /** @return {number} container offset to offsetParent */
  getOffset() {
    return this.vertical ? this.container.offsetTop : this.container.offsetLeft;
  }

  /** @return {number} container offset to document */
  getPageOffset() {
    let element = this.container;
    let offset = 0;
    while (element) {
      const pos = this.vertical ? element.offsetTop : element.offsetLeft;
      offset = offset + pos;
      element = element.offsetParent;
    }
    return offset;
  }
  getDesiredItemSize(item) {
    if (this.vertical) {
      return item.style.height;
    } else {
      return item.style.width;
    }
  }
  setItemSize(item, size) {
    if (this.vertical) {
      item.style.height = size;
    } else {
      item.style.width = size;
    }
  }
  clearItemSize(item) {
    if (this.vertical) {
      item.style.height = null;
    } else {
      item.style.width = null;
    }
  }
  start(item) {}
  finish(item) {}

  /**
      @param {MouseEvent} event the mouse event
      @return {number} the distance between the cursor and the edge of the container,
          along the applicable axis (vertical or horizontal)
  */
  offsetFromEvent(event) {
    const pos = this.vertical ? event.pageY : event.pageX;
    if (this.reverse) {
      return this.getPageOffset() + this.getTotalSize() - pos;
    } else {
      return pos - this.getPageOffset();
    }
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/resizer/item.ts

/*
Copyright 2019 - 2020 The Matrix.org Foundation C.I.C.

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

class ResizeItem {
  constructor(handle, resizer, sizer, container) {
    this.resizer = resizer;
    this.sizer = sizer;
    this.container = container;
    (0,defineProperty/* default */.Z)(this, "domNode", void 0);
    (0,defineProperty/* default */.Z)(this, "id", void 0);
    (0,defineProperty/* default */.Z)(this, "reverse", void 0);
    this.reverse = resizer.isReverseResizeHandle(handle);
    if (container) {
      this.domNode = container;
    } else {
      this.domNode = this.reverse ? handle.nextElementSibling : handle.previousElementSibling;
    }
    this.id = handle.getAttribute("data-id");
  }
  copyWith(handle, resizer, sizer, container) {
    const Ctor = this.constructor;
    return new Ctor(handle, resizer, sizer, container);
  }
  advance(forwards) {
    // opposite direction from fromResizeHandle to get back to handle
    let handle = this.reverse ? this.domNode.previousElementSibling : this.domNode.nextElementSibling;
    const moveNext = forwards !== this.reverse; // xor
    // iterate at least once to avoid infinite loop
    do {
      if (moveNext) {
        handle = handle.nextElementSibling;
      } else {
        handle = handle.previousElementSibling;
      }
    } while (handle && !this.resizer.isResizeHandle(handle));
    if (handle) {
      const nextHandle = this.copyWith(handle, this.resizer, this.sizer);
      nextHandle.reverse = this.reverse;
      return nextHandle;
    }
  }
  next() {
    return this.advance(true);
  }
  previous() {
    return this.advance(false);
  }
  size() {
    return this.sizer.getItemSize(this.domNode);
  }
  offset() {
    return this.sizer.getItemOffset(this.domNode);
  }
  start() {
    this.sizer.start(this.domNode);
  }
  finish() {
    this.sizer.finish(this.domNode);
  }
  getSize() {
    return this.sizer.getDesiredItemSize(this.domNode);
  }
  setRawSize(size) {
    this.sizer.setItemSize(this.domNode, size);
  }
  setSize(size) {
    this.setRawSize(`${Math.round(size)}px`);
    const callback = this.resizer.config.onResized;
    if (callback) {
      callback(size, this.id, this.domNode);
    }
  }
  clearSize() {
    this.sizer.clearItemSize(this.domNode);
    const callback = this.resizer.config.onResized;
    if (callback) {
      callback(null, this.id, this.domNode);
    }
  }
  first() {
    const firstHandle = Array.from(this.domNode.parentElement.children).find(el => {
      return this.resizer.isResizeHandle(el);
    });
    if (firstHandle) {
      return this.copyWith(firstHandle, this.resizer, this.sizer);
    }
  }
  last() {
    const lastHandle = Array.from(this.domNode.parentElement.children).reverse().find(el => {
      return this.resizer.isResizeHandle(el);
    });
    if (lastHandle) {
      return this.copyWith(lastHandle, this.resizer, this.sizer);
    }
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/resizer/distributors/fixed.ts

/*
Copyright 2019 - 2020 The Matrix.org Foundation C.I.C.

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
distributors translate a moving cursor into
CSS/DOM changes by calling the sizer

they have two methods:
    `resize` receives then new item size
    `resizeFromContainerOffset` receives resize handle location
        within the container bounding box. For internal use.
        This method usually ends up calling `resize` once the start offset is subtracted.
*/
class FixedDistributor {
  static createItem(resizeHandle, resizer, sizer) {
    return new ResizeItem(resizeHandle, resizer, sizer);
  }
  static createSizer(containerElement, vertical, reverse) {
    return new Sizer(containerElement, vertical, reverse);
  }
  constructor(item) {
    this.item = item;
    (0,defineProperty/* default */.Z)(this, "beforeOffset", void 0);
    this.beforeOffset = item.offset();
  }
  get size() {
    return this.item.getSize();
  }
  set size(size) {
    this.item.setRawSize(size);
  }
  resize(size) {
    this.item.setSize(size);
  }
  resizeFromContainerOffset(offset) {
    this.resize(offset - this.beforeOffset);
  }
  start() {
    this.item.start();
  }
  finish() {
    this.item.finish();
  }
}
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/resizer/distributors/percentage.ts
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



class PercentageSizer extends Sizer {
  start(item) {
    if (this.vertical) {
      item.style.minHeight = null;
    } else {
      item.style.minWidth = null;
    }
  }
  finish(item) {
    const parent = item.offsetParent;
    if (!parent) return;
    if (this.vertical) {
      const p = (item.offsetHeight / parent.offsetHeight * 100).toFixed(2) + "%";
      item.style.minHeight = p;
      item.style.height = p;
    } else {
      const p = (item.offsetWidth / parent.offsetWidth * 100).toFixed(2) + "%";
      item.style.minWidth = p;
      item.style.width = p;
    }
  }
}
class PercentageDistributor extends FixedDistributor {
  static createSizer(containerElement, vertical, reverse) {
    return new PercentageSizer(containerElement, vertical, reverse);
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/widgets/WidgetLayoutStore.ts
var WidgetLayoutStore = __webpack_require__(90625);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/numbers.ts
var numbers = __webpack_require__(944752);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/hooks/useStateCallback.ts
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



// Hook to simplify interactions with a store-backed state values
// Returns value and method to change the state value
const useStateCallback = (initialValue, callback) => {
  const [value, setValue] = (0,react.useState)(initialValue);
  const interceptSetValue = newVal => {
    setValue(newVal);
    callback(newVal);
  };
  return [value, interceptSetValue];
};
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/UIStore.ts
var UIStore = __webpack_require__(563869);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/AppsDrawer.js

var AppsDrawer_dec, AppsDrawer_class, AppsDrawer_class2;
/*
Copyright 2017 Vector Creations Ltd
Copyright 2018 New Vector Ltd

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






















let AppsDrawer = (AppsDrawer_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.rooms.AppsDrawer"), AppsDrawer_dec(AppsDrawer_class = (AppsDrawer_class2 = class AppsDrawer extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "onIsResizing", resizing => {
      // This one is the vertical, ie. change height of apps drawer
      this.setState({
        resizingVertical: resizing
      });
      if (!resizing) {
        this._relaxResizer();
      }
    });
    (0,defineProperty/* default */.Z)(this, "_collectResizer", ref => {
      if (this._resizeContainer) {
        this.resizer.detach();
      }
      if (ref) {
        this.resizer.container = ref;
        this.resizer.attach();
      }
      this._resizeContainer = ref;
      this._loadResizerPreferences();
    });
    (0,defineProperty/* default */.Z)(this, "_getAppsHash", apps => apps.map(app => app.id).join("~"));
    (0,defineProperty/* default */.Z)(this, "_relaxResizer", () => {
      const distributors = this.resizer.getDistributors();
      console.log(distributors);
      // relax all items if they had any overconstrained flexboxes
      distributors.forEach(d => d.start());
      distributors.forEach(d => d.finish());
    });
    (0,defineProperty/* default */.Z)(this, "_loadResizerPreferences", () => {
      const distributions = WidgetLayoutStore/* WidgetLayoutStore */.z3.instance.getResizerDistributions(this.props.room, WidgetLayoutStore/* Container */.W2.Top);
      if (this.state.apps && this.state.apps.length - 1 === distributions.length) {
        distributions.forEach((size, i) => {
          const distributor = this.resizer.forHandleAt(i);
          if (distributor) {
            distributor.size = size;
            distributor.finish();
          }
        });
      } else if (this.state.apps) {
        const distributors = this.resizer.getDistributors();
        distributors.forEach(d => d.item.clearSize());
        distributors.forEach(d => d.start());
        distributors.forEach(d => d.finish());
      }
    });
    (0,defineProperty/* default */.Z)(this, "onAction", action => {
      const hideWidgetKey = this.props.room.roomId + '_hide_widget_drawer';
      switch (action.action) {
        case 'appsDrawer':
          // Note: these booleans are awkward because localstorage is fundamentally
          // string-based. We also do exact equality on the strings later on.
          if (action.show) {
            localStorage.setItem(hideWidgetKey, "false");
          } else {
            // Store hidden state of widget
            // Don't show if previously hidden
            localStorage.setItem(hideWidgetKey, "true");
          }
          break;
      }
    });
    (0,defineProperty/* default */.Z)(this, "_getApps", () => WidgetLayoutStore/* WidgetLayoutStore */.z3.instance.getContainerWidgets(this.props.room, WidgetLayoutStore/* Container */.W2.Top));
    (0,defineProperty/* default */.Z)(this, "_updateApps", () => {
      this.setState({
        apps: this._getApps()
      });
    });
    this.state = {
      apps: this._getApps(),
      resizingVertical: false,
      // true when changing the height of the apps drawer
      resizingHorizontal: false // true when chagning the distribution of the width between widgets
    };

    this._resizeContainer = null;
    this.resizer = this._createResizer();
    this.props.resizeNotifier.on("isResizing", this.onIsResizing);
  }
  componentDidMount() {
    ScalarMessaging/* startListening */.Bl();
    WidgetLayoutStore/* WidgetLayoutStore */.z3.instance.on(WidgetLayoutStore/* WidgetLayoutStore */.z3.emissionForRoom(this.props.room), this._updateApps);
    this.dispatcherRef = dispatcher/* default */.ZP.register(this.onAction);
  }
  componentWillUnmount() {
    ScalarMessaging/* stopListening */.pI();
    WidgetLayoutStore/* WidgetLayoutStore */.z3.instance.off(WidgetLayoutStore/* WidgetLayoutStore */.z3.emissionForRoom(this.props.room), this._updateApps);
    if (this.dispatcherRef) dispatcher/* default */.ZP.unregister(this.dispatcherRef);
    if (this._resizeContainer) {
      this.resizer.detach();
    }
    this.props.resizeNotifier.off("isResizing", this.onIsResizing);
  }
  _createResizer() {
    // This is the horizontal one, changing the distribution of the width between the app tiles
    // (ie. a vertical resize handle because, the handle itself is vertical...)
    const classNames = {
      handle: "mx_ResizeHandle",
      vertical: "mx_ResizeHandle_vertical",
      reverse: "mx_ResizeHandle_reverse"
    };
    const collapseConfig = {
      onResizeStart: () => {
        this._resizeContainer.classList.add("mx_AppsDrawer_resizing");
        this.setState({
          resizingHorizontal: true
        });
      },
      onResizeStop: () => {
        this._resizeContainer.classList.remove("mx_AppsDrawer_resizing");
        WidgetLayoutStore/* WidgetLayoutStore */.z3.instance.setResizerDistributions(this.props.room, WidgetLayoutStore/* Container */.W2.Top, this.state.apps.slice(1).map((_, i) => this.resizer.forHandleAt(i).size));
        this.setState({
          resizingHorizontal: false
        });
      }
    };
    // pass a truthy container for now, we won't call attach until we update it
    const resizer = new Resizer({}, PercentageDistributor, collapseConfig);
    resizer.setClassNames(classNames);
    return resizer;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId || prevProps.room !== this.props.room) {
      // Room has changed, update apps
      this._updateApps();
    } else if (this._getAppsHash(this.state.apps) !== this._getAppsHash(prevState.apps)) {
      this._loadResizerPreferences();
    }
  }
  isResizing() {
    return this.state.resizingVertical || this.state.resizingHorizontal;
  }
  _launchManageIntegrations() {
    if (SettingsStore/* default */.C.getValue("feature_many_integration_managers")) {
      IntegrationManagers/* IntegrationManagers */.B.sharedInstance().openAll();
    } else {
      IntegrationManagers/* IntegrationManagers */.B.sharedInstance().getPrimaryManager().open(this.props.room, 'add_integ');
    }
  }
  render() {
    if (!this.props.showApps) return /*#__PURE__*/react.createElement("div", null);
    const apps = this.state.apps.map((app, index, arr) => {
      return /*#__PURE__*/react.createElement(AppTile/* default */.Z, {
        key: app.id,
        app: app,
        fullWidth: arr.length < 2,
        room: this.props.room,
        userId: this.props.userId,
        creatorUserId: app.creatorUserId,
        widgetPageTitle: WidgetUtils/* default */.Z.getWidgetDataTitle(app),
        waitForIframeLoad: app.waitForIframeLoad,
        pointerEvents: this.isResizing() ? 'none' : undefined
      });
    });
    if (apps.length === 0) {
      return /*#__PURE__*/react.createElement("div", null);
    }
    let spinner;
    if (apps.length === 0 && WidgetEchoStore/* default */.Z.roomHasPendingWidgets(this.props.room.roomId, WidgetUtils/* default */.Z.getRoomWidgets(this.props.room))) {
      const Loader = src.getComponent("elements.Spinner");
      spinner = /*#__PURE__*/react.createElement(Loader, null);
    }
    const classes = classnames_default()({
      mx_AppsDrawer: true,
      mx_AppsDrawer_fullWidth: apps.length < 2,
      mx_AppsDrawer_resizing: this.state.resizing,
      mx_AppsDrawer_2apps: apps.length === 2,
      mx_AppsDrawer_3apps: apps.length === 3
    });
    return /*#__PURE__*/react.createElement("div", {
      className: classes
    }, /*#__PURE__*/react.createElement(PersistentVResizer, {
      room: this.props.room,
      minHeight: 100,
      maxHeight: this.props.maxHeight ? this.props.maxHeight - 50 : undefined,
      handleClass: "mx_AppsContainer_resizerHandle",
      handleWrapperClass: "mx_AppsContainer_resizerHandleContainer",
      className: "mx_AppsContainer_resizer",
      resizeNotifier: this.props.resizeNotifier
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_AppsContainer",
      ref: this._collectResizer
    }, apps.map((app, i) => {
      if (i < 1) return app;
      return /*#__PURE__*/react.createElement(react.Fragment, {
        key: app.key
      }, /*#__PURE__*/react.createElement(elements_ResizeHandle, {
        reverse: i > apps.length / 2
      }), app);
    }))), spinner);
  }
}, (0,defineProperty/* default */.Z)(AppsDrawer_class2, "propTypes", {
  userId: (prop_types_default()).string.isRequired,
  room: (prop_types_default()).object.isRequired,
  resizeNotifier: prop_types_default().instanceOf(ResizeNotifier/* default */.Z).isRequired,
  showApps: (prop_types_default()).bool // Should apps be rendered
}), (0,defineProperty/* default */.Z)(AppsDrawer_class2, "defaultProps", {
  showApps: true
}), AppsDrawer_class2)) || AppsDrawer_class);

const PersistentVResizer = ({
  room,
  minHeight,
  maxHeight,
  className,
  handleWrapperClass,
  handleClass,
  resizeNotifier,
  children
}) => {
  let defaultHeight = WidgetLayoutStore/* WidgetLayoutStore */.z3.instance.getContainerHeight(room, WidgetLayoutStore/* Container */.W2.Top);

  // Arbitrary defaults to avoid NaN problems. 100 px or 3/4 of the visible window.
  if (!minHeight) minHeight = 100;
  if (!maxHeight) maxHeight = UIStore/* default */.Z.instance.windowHeight / 4 * 3;

  // Convert from percentage to height. Note that the default height is 280px.
  if (defaultHeight) {
    defaultHeight = (0,numbers/* clamp */.uZ)(defaultHeight, 0, 100);
    defaultHeight = (0,numbers/* percentageWithin */.no)(defaultHeight / 100, minHeight, maxHeight);
  } else {
    defaultHeight = 280;
  }
  const [height, setHeight] = useStateCallback(defaultHeight, newHeight => {
    newHeight = (0,numbers/* percentageOf */.Gc)(newHeight, minHeight, maxHeight) * 100;
    WidgetLayoutStore/* WidgetLayoutStore */.z3.instance.setContainerHeight(room, WidgetLayoutStore/* Container */.W2.Top, newHeight);
  });
  return /*#__PURE__*/react.createElement(index_es5/* Resizable */.e, {
    size: {
      height: Math.min(height, maxHeight)
    },
    minHeight: minHeight,
    maxHeight: maxHeight,
    onResizeStart: () => {
      resizeNotifier.startResizing();
    },
    onResize: () => {
      resizeNotifier.notifyTimelineHeightChanged();
    },
    onResizeStop: (e, dir, ref, d) => {
      setHeight(height + d.height);
      resizeNotifier.stopResizing();
    },
    handleWrapperClass: handleWrapperClass,
    handleClasses: {
      bottom: handleClass
    },
    className: className,
    enable: {
      bottom: true
    }
  }, children);
};
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/AutoHideScrollbar.tsx
var AutoHideScrollbar = __webpack_require__(651070);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/settings/UIFeature.ts
var UIFeature = __webpack_require__(187565);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/webrtc/call.ts
var webrtc_call = __webpack_require__(160193);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/CallView.tsx + 7 modules
var CallView = __webpack_require__(37667);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/voip/CallViewForRoom.tsx

var CallViewForRoom_dec, CallViewForRoom_class;
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








/*
 * Wrapper for CallView that always display the call in a given room,
 * or nothing if there is no call in that room.
 */
let CallViewForRoom = (CallViewForRoom_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.voip.CallViewForRoom"), CallViewForRoom_dec(CallViewForRoom_class = class CallViewForRoom extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "dispatcherRef", void 0);
    (0,defineProperty/* default */.Z)(this, "onAction", payload => {
      switch (payload.action) {
        case "call_state":
          {
            this.updateCall();
            break;
          }
      }
    });
    (0,defineProperty/* default */.Z)(this, "updateCall", () => {
      const newCall = this.getCall();
      if (newCall !== this.state.call) {
        this.setState({
          call: newCall
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onResizeStart", () => {
      this.props.resizeNotifier.startResizing();
    });
    (0,defineProperty/* default */.Z)(this, "onResize", () => {
      this.props.resizeNotifier.notifyTimelineHeightChanged();
    });
    (0,defineProperty/* default */.Z)(this, "onResizeStop", () => {
      this.props.resizeNotifier.stopResizing();
    });
    this.state = {
      call: this.getCall()
    };
  }
  componentDidMount() {
    this.dispatcherRef = dispatcher/* default */.ZP.register(this.onAction);
    CallHandler/* default */.ZP.sharedInstance().addListener(CallHandler/* CallHandlerEvent */.Tj.CallChangeRoom, this.updateCall);
  }
  componentWillUnmount() {
    dispatcher/* default */.ZP.unregister(this.dispatcherRef);
    CallHandler/* default */.ZP.sharedInstance().removeListener(CallHandler/* CallHandlerEvent */.Tj.CallChangeRoom, this.updateCall);
  }
  getCall() {
    const call = CallHandler/* default */.ZP.sharedInstance().getCallForRoom(this.props.roomId);
    if (call && [webrtc_call/* CallState */.OX.Ended, webrtc_call/* CallState */.OX.Ringing].includes(call.state)) return null;
    return call;
  }
  render() {
    var _window$VideoJSPlayer;
    if (!this.state.call) return null;
    (_window$VideoJSPlayer = window.VideoJSPlayer) === null || _window$VideoJSPlayer === void 0 ? void 0 : _window$VideoJSPlayer.pause();
    // We subtract 8 as it the margin-bottom of the mx_CallViewForRoom_ResizeWrapper
    const maxHeight = this.props.maxVideoHeight - 8;
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_CallViewForRoom"
    }, /*#__PURE__*/react.createElement(index_es5/* Resizable */.e, {
      minHeight: 380,
      maxHeight: maxHeight,
      enable: {
        top: false,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      },
      onResizeStart: this.onResizeStart,
      onResize: this.onResize,
      onResizeStop: this.onResizeStop,
      className: "mx_CallViewForRoom_ResizeWrapper",
      handleClasses: {
        bottom: "mx_CallViewForRoom_ResizeHandle"
      }
    }, /*#__PURE__*/react.createElement(CallView/* default */.Z, {
      call: this.state.call,
      pipMode: false
    })));
  }
}) || CallViewForRoom_class);

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/objects.ts
var objects = __webpack_require__(608660);
// EXTERNAL MODULE: ./node_modules/antd/lib/index.js
var lib = __webpack_require__(769215);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/avatars/DecoratedRoomAvatar.tsx + 1 modules
var DecoratedRoomAvatar = __webpack_require__(795776);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/P2PInvite.tsx

var P2PInvite_dec, P2PInvite_class;






let P2PInvite = (P2PInvite_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.rooms.P2PInvite"), P2PInvite_dec(P2PInvite_class = class P2PInvite extends react.Component {
  constructor(...args) {
    super(...args);
    (0,defineProperty/* default */.Z)(this, "isIFrame", input => input !== null && input.tagName === "IFRAME");
    (0,defineProperty/* default */.Z)(this, "sendToP2P", () => {
      const frame = document.getElementById("P2PWeb");
      if (this.isIFrame(frame) && frame.contentWindow) {
        frame.contentWindow.postMessage({
          method: "sendOtherPeer",
          key: "otherPeer",
          value: this.props.P2PModalInfo
        }, "*");
      }
    });
    (0,defineProperty/* default */.Z)(this, "accept", async () => {
      const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
      const {
        roomId,
        myUserId: userId
      } = this.props.room;
      const {
        rawDisplayName: displayName,
        user
      } = this.props.room.getMember(userId);
      const {
        avatarUrl
      } = user;
      try {
        // eslint-disable-next-line camelcase
        const peerId = localStorage.getItem("peerId");
        const body = JSON.stringify({
          roomId,
          displayName,
          peerId,
          userId,
          avatarUrl,
          type: "P2P Accept"
        });
        this.sendToP2P();
        cli.sendHtmlNotice(roomId, body, `${displayName} accepted P2P private conversation invitation。 Please Switch to P2P Network`);
        dispatcher/* default */.ZP.dispatch({
          action: "changeP2PModalType",
          type: 0
        });
        // window.open(`https://p2p.sending.me/#/home`);
      } catch (error) {
        console.log(error);
      }
    });
    (0,defineProperty/* default */.Z)(this, "reject", () => {
      const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
      const {
        roomId,
        name,
        myUserId
      } = this.props.room;
      const {
        rawDisplayName
      } = this.props.room.getMember(myUserId);
      const body = JSON.stringify({
        roomId,
        type: "P2P Refuse"
      });
      cli.sendHtmlNotice(roomId, body, `${rawDisplayName} Refuse P2P private conversation invitation`);
      dispatcher/* default */.ZP.dispatch({
        action: "changeP2PModalType",
        type: 0
      });
    });
    (0,defineProperty/* default */.Z)(this, "switch", () => {
      this.sendToP2P();
      const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
      const {
        roomId,
        myUserId
      } = this.props.room;
      const {
        rawDisplayName
      } = this.props.room.getMember(myUserId);
      dispatcher/* default */.ZP.dispatch({
        action: "changeP2PModalType",
        type: 0
      });
      const body = JSON.stringify({
        roomId,
        type: "P2P Switch"
      });
      cli.sendHtmlNotice(roomId, body, `${rawDisplayName} switch to P2P Network`);
      // window.open(`https://p2p.sending.me/#/home`);
    });
  }

  render() {
    if (this.props.P2PModalType === 2) {
      return /*#__PURE__*/react.createElement("div", {
        className: "mx_RoomView_P2P_accept"
      }, /*#__PURE__*/react.createElement(DecoratedRoomAvatar/* default */.Z, {
        room: this.props.room,
        size: 34
      }), /*#__PURE__*/react.createElement("div", {
        className: "text"
      }, "Invitation accepted, Please switch to P2P network."), /*#__PURE__*/react.createElement(lib.Button, {
        type: "primary",
        className: "accept",
        onClick: this.switch
      }, "Switch P2P Network"));
    }
    if (this.props.P2PModalType === 1) {
      return /*#__PURE__*/react.createElement("div", {
        className: "mx_RoomView_P2P_invite"
      }, /*#__PURE__*/react.createElement(DecoratedRoomAvatar/* default */.Z, {
        room: this.props.room,
        size: 68
      }), /*#__PURE__*/react.createElement("div", {
        className: "Bob-invites-you"
      }, this.props.room.name, " invites you"), /*#__PURE__*/react.createElement("div", {
        className: "into-P2P-private-con"
      }, "into P2P private conversation"), /*#__PURE__*/react.createElement(lib.Button, {
        type: "primary",
        className: "accept",
        onClick: this.accept
      }, "Accept and Switch P2P Network"), /*#__PURE__*/react.createElement(lib.Button, {
        type: "link",
        className: "reject",
        onClick: this.reject
      }, "Refuse invitation"), /*#__PURE__*/react.createElement("div", {
        className: "title"
      }, "What is P2P \uFF1F"), /*#__PURE__*/react.createElement("div", {
        className: "text"
      }, "Peer-to-peer (P2P) is a decentralized communications model in which each party has the same capabilities and either party can initiate a communication session.the P2P network model allows each node to function as both a client and server"));
    }
    return null;
  }
}) || P2PInvite_class);

;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/AuxPanel.tsx

var AuxPanel_dec, AuxPanel_class, AuxPanel_class2;
/*
Copyright 2015, 2016, 2017, 2020 The Matrix.org Foundation C.I.C.

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














let AuxPanel = (AuxPanel_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.rooms.AuxPanel"), AuxPanel_dec(AuxPanel_class = (AuxPanel_class2 = class AuxPanel extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "rateLimitedUpdate", (0,throttle/* default */.Z)(() => {
      this.setState({
        counters: this.computeCounters()
      });
    }, 500, {
      leading: true,
      trailing: true
    }));
    this.state = {
      counters: this.computeCounters()
    };
  }
  componentDidMount() {
    const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
    if (SettingsStore/* default */.C.getValue("feature_state_counters")) {
      cli.on("RoomState.events", this.rateLimitedUpdate);
    }
  }
  componentWillUnmount() {
    const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
    if (cli && SettingsStore/* default */.C.getValue("feature_state_counters")) {
      cli.removeListener("RoomState.events", this.rateLimitedUpdate);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (0,objects/* objectHasDiff */.U0)(this.props, nextProps) || (0,objects/* objectHasDiff */.U0)(this.state, nextState);
  }
  componentDidUpdate(prevProps, prevState) {
    // most changes are likely to cause a resize
    if (this.props.onResize) {
      this.props.onResize();
    }
  }
  computeCounters() {
    const counters = [];
    if (this.props.room && SettingsStore/* default */.C.getValue("feature_state_counters")) {
      const stateEvs = this.props.room.currentState.getStateEvents("re.jki.counter");
      stateEvs.sort((a, b) => (0,utils/* lexicographicCompare */.uC)(a.getStateKey(), b.getStateKey()));
      for (const ev of stateEvs) {
        const title = ev.getContent().title;
        const value = ev.getContent().value;
        const link = ev.getContent().link;
        const severity = ev.getContent().severity || "normal";
        const stateKey = ev.getStateKey();

        // We want a non-empty title but can accept falsey values (e.g.
        // zero)
        if (title && value !== undefined) {
          counters.push({
            title,
            value,
            link,
            severity,
            stateKey
          });
        }
      }
    }
    return counters;
  }
  render() {
    const callView = /*#__PURE__*/react.createElement(CallViewForRoom, {
      roomId: this.props.room.roomId,
      maxVideoHeight: this.props.maxHeight,
      resizeNotifier: this.props.resizeNotifier
    });
    let appsDrawer;
    if (SettingsStore/* default */.C.getValue(UIFeature/* UIFeature */.H.Widgets)) {
      appsDrawer = /*#__PURE__*/react.createElement(AppsDrawer, {
        room: this.props.room,
        userId: this.props.userId,
        maxHeight: this.props.maxHeight,
        showApps: this.props.showApps,
        resizeNotifier: this.props.resizeNotifier
      });
    }
    let stateViews = null;
    if (this.state.counters && SettingsStore/* default */.C.getValue("feature_state_counters")) {
      const counters = [];
      this.state.counters.forEach((counter, idx) => {
        const title = counter.title;
        const value = counter.value;
        const link = counter.link;
        const severity = counter.severity;
        const stateKey = counter.stateKey;
        let span = /*#__PURE__*/react.createElement("span", null, title, ": ", value);
        if (link) {
          span = /*#__PURE__*/react.createElement("a", {
            href: link,
            target: "_blank",
            rel: "noreferrer noopener"
          }, span);
        }
        span = /*#__PURE__*/react.createElement("span", {
          className: "m_RoomView_auxPanel_stateViews_span",
          "data-severity": severity,
          key: "x-" + stateKey
        }, span);
        counters.push(span);
        counters.push( /*#__PURE__*/react.createElement("span", {
          className: "m_RoomView_auxPanel_stateViews_delim",
          key: "delim" + idx
        }, " ", "\u2500", " "));
      });
      if (counters.length > 0) {
        counters.pop(); // remove last deliminator
        stateViews = /*#__PURE__*/react.createElement("div", {
          className: "m_RoomView_auxPanel_stateViews"
        }, counters);
      }
    }
    const classes = classnames_default()({
      mx_RoomView_auxPanel: true,
      mx_RoomView_auxPanel_fullHeight: this.props.fullHeight
    });
    const style = {};
    if (!this.props.fullHeight) {
      style.maxHeight = this.props.maxHeight;
    }
    let P2PInviteModel = null;
    if (this.props.room.isDmRoom()) {
      P2PInviteModel = /*#__PURE__*/react.createElement(P2PInvite, {
        P2PModalType: this.props.P2PModalType,
        P2PModalInfo: this.props.P2PModalInfo,
        room: this.props.room,
        userId: this.props.userId
      });
    }
    return /*#__PURE__*/react.createElement(AutoHideScrollbar/* default */.Z, {
      className: classes,
      style: style
    }, P2PInviteModel, stateViews, appsDrawer, callView, this.props.children);
  }
}, (0,defineProperty/* default */.Z)(AuxPanel_class2, "defaultProps", {
  showApps: true,
  P2PModalType: 0,
  P2PModalInfo: null
}), AuxPanel_class2)) || AuxPanel_class);

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/right_panel/HeaderButton.tsx
var HeaderButton = __webpack_require__(763456);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/right_panel/HeaderButtons.tsx
var HeaderButtons = __webpack_require__(757667);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/RightPanelStorePhases.ts
var RightPanelStorePhases = __webpack_require__(274057);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/context_menus/IconizedContextMenu.tsx
var IconizedContextMenu = __webpack_require__(882385);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/InfoDialog.tsx
var InfoDialog = __webpack_require__(786035);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/ContactStore.ts + 1 modules
var ContactStore = __webpack_require__(476979);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/feature/isFeatureEnabled.ts
var isFeatureEnabled = __webpack_require__(94948);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/@types/user.ts
var user = __webpack_require__(650540);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/defenderSettings/settingsStore.ts
var settingsStore = __webpack_require__(650478);
// EXTERNAL MODULE: ./node_modules/sendingme-ui/dist/index.js
var dist = __webpack_require__(602271);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/right_panel/RoomHeaderButtons.tsx

var RoomHeaderButtons_dec, RoomHeaderButtons_class;
function RoomHeaderButtons_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function RoomHeaderButtons_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? RoomHeaderButtons_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : RoomHeaderButtons_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2017 Vector Creations Ltd
Copyright 2017 New Vector Ltd
Copyright 2018 New Vector Ltd
Copyright 2019, 2020 The Matrix.org Foundation C.I.C.

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




















const ROOM_INFO_PHASES = [RightPanelStorePhases/* RightPanelPhases */.q4.RoomSummary, RightPanelStorePhases/* RightPanelPhases */.q4.Widget, RightPanelStorePhases/* RightPanelPhases */.q4.FilePanel, RightPanelStorePhases/* RightPanelPhases */.q4.TopicSummaryPanel, RightPanelStorePhases/* RightPanelPhases */.q4.RoomMemberList, RightPanelStorePhases/* RightPanelPhases */.q4.RoomMemberInfo, RightPanelStorePhases/* RightPanelPhases */.q4.EncryptionPanel, RightPanelStorePhases/* RightPanelPhases */.q4.Room3pidMemberInfo];
let RoomHeaderButtons = (RoomHeaderButtons_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.right_panel.RoomHeaderButtons"), RoomHeaderButtons_dec(RoomHeaderButtons_class = class RoomHeaderButtons extends HeaderButtons/* default */.Z {
  constructor(props) {
    super(props, HeaderButtons/* HeaderKind */.h.Room);
    (0,defineProperty/* default */.Z)(this, "onRoomSummaryClicked", () => {
      // use roomPanelPhase rather than this.state.phase as it remembers the latest one if we close
      // const lastPhase = RightPanelStore.getSharedInstance().roomPanelPhase;
      // if (ROOM_INFO_PHASES.includes(lastPhase)) {
      //     if (this.state.phase === lastPhase) {
      //         this.setPhase(lastPhase);
      //     } else {
      //         this.setPhase(
      //             lastPhase,
      //             RightPanelStore.getSharedInstance().roomPanelPhaseParams,
      //         );
      //     }
      // } else {
      //     // This toggles for us, if needed
      //     if (this.props.room.isDmRoom()) {
      //         const member = this.props.room.getMember(this.props.room.getDMAnotherMember());
      //         // dis.dispatch<SetRightPanelPhasePayload>({
      //         //     action: Action.SetRightPanelPhase,
      //         //     phase: RightPanelPhases.UserProfile,
      //         //     refireParams: { member: member },
      //         // });
      //         this.setPhase(RightPanelPhases.UserProfile,{ member: member });
      //     } else {
      //         this.setPhase(RightPanelPhases.RoomSummary);
      //     }

      // }
      // This toggles for us, if needed
      if (this.props.room.isDmRoom()) {
        const member = this.props.room.getMember(this.props.room.getDMAnotherMember());
        // dis.dispatch<SetRightPanelPhasePayload>({
        //     action: Action.SetRightPanelPhase,
        //     phase: RightPanelPhases.UserProfile,
        //     refireParams: { member: member },
        // });
        this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.UserProfile, {
          member: member
        });
      } else {
        this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.RoomSummary);
      }
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.ShowRightPanel
      });
    });
    (0,defineProperty/* default */.Z)(this, "showMenu", e => {
      const {
        left,
        top
      } = e.target.getBoundingClientRect();
      this.setState({
        showMenu: {
          left,
          top
        }
      });
      this.refreshIgnore();
    });
    (0,defineProperty/* default */.Z)(this, "hideMenu", () => {
      this.setState({
        showMenu: null
      });
    });
    (0,defineProperty/* default */.Z)(this, "onOpenRoomSettings", ev => {
      ev.preventDefault();
      ev.stopPropagation();
      dispatcher/* default */.ZP.dispatch({
        action: "open_room_settings",
        room_id: this.props.room.roomId
      });
      this.hideMenu();
    });
    (0,defineProperty/* default */.Z)(this, "onNotificationsClicked", () => {
      // This toggles for us, if needed
      this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.NotificationPanel);
      this.hideMenu();
    });
    (0,defineProperty/* default */.Z)(this, "onOpenP2PClicked", async () => {
      const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
      const {
        roomId,
        name,
        myUserId: userId
      } = this.props.room;
      const {
        rawDisplayName: displayName,
        user
      } = this.props.room.getMember(userId);
      const {
        avatarUrl
      } = user;
      try {
        // eslint-disable-next-line camelcase
        const peerId = localStorage.getItem("peerId");
        const body = JSON.stringify({
          roomId,
          displayName,
          peerId,
          userId,
          avatarUrl,
          type: "P2P Invite"
        });
        cli.sendHtmlNotice(roomId, body, `<div>${displayName} invites ${name} into P2P Private Mode</div>`);
      } catch (error) {
        console.log(error);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onCloseP2PClicked", () => {
      console.log("离开P2P模式");
    });
    (0,defineProperty/* default */.Z)(this, "renderOperations", () => {
      const isDMRoom = this.props.room.isDmRoom();
      // only one feature - defend mode in setting
      if (isDMRoom && (0,isFeatureEnabled/* default */.Z)() || !isDMRoom) {
        return /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuOption */.$k, null, /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuItem */.XH, {
          onClick: this.onOpenRoomSettings,
          label: (0,languageHandler._t)("Settings"),
          iconClassName: "SettingOutlines"
        }));
      }
      return null;
    });
    (0,defineProperty/* default */.Z)(this, "isActionProtected", () => {
      const {
        settings: protectStateMap
      } = settingsStore/* useDefendSettingsStore */.IO.getState() || {};
      const protectState = protectStateMap === null || protectStateMap === void 0 ? void 0 : protectStateMap.get(this.props.room.roomId);
      if (protectState !== null && protectState !== void 0 && protectState.forwarding) {
        return true;
      }
      return false;
    });
    (0,defineProperty/* default */.Z)(this, "onShareClick", () => {
      const isProtectStateEnabled = this.isActionProtected();
      if (isProtectStateEnabled) {
        let tip = this.props.room.isDmRoom() ? "This chat cannot be saved due to application limitations" : "Disabled, please contact the administrator";
        dist.SdMessage.warning(tip);
        return;
      }
      dispatcher/* default */.ZP.dispatch({
        action: actions/* Action */.a.TurnOnMultiSelection,
        initialSelected: [],
        openSelectorPanel: true
      });
      this.hideMenu();
    });
    this.state = RoomHeaderButtons_objectSpread(RoomHeaderButtons_objectSpread({}, super.getState()), {}, {
      showMenu: null
    });
  }
  componentDidMount() {
    var _this$props$setRoomSu, _this$props, _this$props$setNotifi, _this$props2, _this$props$setOpenP, _this$props3, _this$props$setCloseP, _this$props4;
    super.componentDidMount();
    (_this$props$setRoomSu = (_this$props = this.props).setRoomSummaryClickHandler) === null || _this$props$setRoomSu === void 0 ? void 0 : _this$props$setRoomSu.call(_this$props, this.onRoomSummaryClicked);
    (_this$props$setNotifi = (_this$props2 = this.props).setNotificationsClick) === null || _this$props$setNotifi === void 0 ? void 0 : _this$props$setNotifi.call(_this$props2, this.onNotificationsClicked);
    (_this$props$setOpenP = (_this$props3 = this.props).setOpenP2PClick) === null || _this$props$setOpenP === void 0 ? void 0 : _this$props$setOpenP.call(_this$props3, this.onOpenP2PClicked);
    (_this$props$setCloseP = (_this$props4 = this.props).setCloseP2PClick) === null || _this$props$setCloseP === void 0 ? void 0 : _this$props$setCloseP.call(_this$props4, this.onCloseP2PClicked);
    this.refreshIgnore();
  }
  onAction(payload) {
    if (payload.action === actions/* Action */.a.ViewUser) {
      if (payload.member) {
        this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.RoomMemberInfo, {
          member: payload.member
        });
      } else {
        this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.RoomMemberList);
      }
    } else if (payload.action === actions/* Action */.a.ViewToken) {
      if (payload.token) {
        this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.TokenPanel, {
          token: payload.token
        });
      }
    } else if (payload.action === "view_3pid_invite") {
      if (payload.event) {
        this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.Room3pidMemberInfo, {
          event: payload.event
        });
      } else {
        this.setPhase(RightPanelStorePhases/* RightPanelPhases */.q4.RoomMemberList);
      }
    }
  }
  refreshIgnore() {
    if (this.props.room.isDmRoom()) {
      const members = this.props.room.getMembers();
      const he = members.find(member => member.userId !== this.props.room.myUserId);
      if (!he) {
        return;
      }
      this.setState({
        isIgnored: MatrixClientPeg/* MatrixClientPeg */.p.get().getIgnoredUsers().includes(he.userId)
      });
    }
  }
  // private onPinnedMessagesClicked = () => {
  //     // This toggles for us, if needed
  //     this.setPhase(RightPanelPhases.PinnedMessages);
  // };
  displayInfoDialogAboutScreensharing() {
    Modal/* default */.Z.createDialog(InfoDialog/* default */.Z, {
      title: (0,languageHandler._t)("Screen sharing is here!"),
      description: (0,languageHandler._t)('You can now share your screen by pressing the "screen share" ' + "button during a call. You can even do this in audio calls if both sides support it!")
    });
  }
  onCallPlaced(v) {
    this.props.onCallPlaced(v);
    this.hideMenu();
  }
  renderButtons() {
    let videoCall;
    let canCall = false;
    if (this.props.room.isDmRoom()) {
      const members = this.props.room.getMembers();
      const he = members.find(member => member.userId !== this.props.room.myUserId);
      if (he) {
        const userShip = ContactStore["default"].instance.getUserShip(he.userId);
        canCall = userShip.includes(user/* UserShip */.J.Friend) || userShip.includes(user/* UserShip */.J.Colleague);
      }
    } else {
      canCall = true;
    }
    if (this.props.inRoom && SettingsStore/* default */.C.getValue("showCallButtonsInComposer") && canCall) {
      videoCall = /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuOption */.$k, null, /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuItem */.XH, {
        iconClassName: "VideoOutlines",
        onClick: ev => ev.shiftKey ? this.displayInfoDialogAboutScreensharing() : this.onCallPlaced(CallHandler/* PlaceCallType */.gr.Video),
        label: (0,languageHandler._t)("Video call")
      }));
    }
    const selectBtn = /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuOption */.$k, null, /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuItem */.XH, {
      iconClassName: "SelectOutlines",
      onClick: this.onShareClick,
      label: (0,languageHandler._t)("Select")
    }));
    return /*#__PURE__*/react.createElement(react.Fragment, null, !this.props.room.isSaveMessageRoom() ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(HeaderButton/* default */.Z, {
      name: "MoreOutlines",
      title: (0,languageHandler._t)("More options"),
      isHighlighted: !!this.state.showMenu,
      onClick: this.showMenu,
      analytics: ["More options", "click"]
    }), this.state.showMenu ? /*#__PURE__*/react.createElement(IconizedContextMenu/* default */.ZP, {
      left: this.state.showMenu.left - 161,
      top: this.state.showMenu.top + 30,
      onFinished: this.hideMenu,
      wrapperClassName: "mx_RoomHeader_Menu"
    }, /*#__PURE__*/react.createElement(IconizedContextMenu/* IconizedContextMenuOptionList */.I2, null, videoCall, selectBtn, this.renderOperations())) : null) : null);
  }
}) || RoomHeaderButtons_class);

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AccessibleTooltipButton.tsx
var AccessibleTooltipButton = __webpack_require__(717919);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/RoomTopic.tsx
var RoomTopic = __webpack_require__(756810);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/RoomName.tsx
var RoomName = __webpack_require__(75865);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/useEventEmitter.ts
var useEventEmitter = __webpack_require__(457771);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/LeftPanelStore.ts
var LeftPanelStore = __webpack_require__(290884);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/DialogButtons.js
var DialogButtons = __webpack_require__(804821);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Dropdown.tsx
var Dropdown = __webpack_require__(893683);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/BaseDialog.js
var BaseDialog = __webpack_require__(308043);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/room-list/algorithms/tag-sorting/RecentAlgorithm.ts
var RecentAlgorithm = __webpack_require__(400001);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/SelectFollowRoomDialog.tsx











const useLeftPanelState = () => {
  return (0,useEventEmitter/* useEventEmitterState */.k)(LeftPanelStore/* default */.ZP.instance, AsyncStore/* UPDATE_EVENT */.aY, () => {
    return LeftPanelStore/* default */.ZP.instance.getState().spaces;
  });
};
function SelectFollowRoomDialog(props) {
  const spaces = useLeftPanelState();
  const [space, selectSpace] = (0,react.useState)('');
  const [room, selectRoom] = (0,react.useState)('');
  const spaceOptions = (0,react.useMemo)(() => {
    return spaces.map(space => /*#__PURE__*/react.createElement("div", {
      key: space.roomId,
      className: "mx_SelectFollowRoomDialog_space_opt"
    }, /*#__PURE__*/react.createElement(RoomAvatar/* default */.Z, {
      className: "mx_SelectFollowRoomDialog_space_opt_icon",
      size: 22,
      room: space
    }), /*#__PURE__*/react.createElement("span", null, space.name)));
  }, [spaces]);
  const roomOptions = (0,react.useMemo)(() => {
    const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
    return (0,RecentAlgorithm/* sortRooms */.yu)(cli.getVisibleRooms().filter(room => {
      var _room$getParentRoom, _room$currentState$me;
      const id = room.myUserId;
      return room.getMyMembership() === "join" && ((_room$getParentRoom = room.getParentRoom()) === null || _room$getParentRoom === void 0 ? void 0 : _room$getParentRoom.roomId) === space && !room.isAnnouncementRoom() && ((_room$currentState$me = room.currentState.members[id]) === null || _room$currentState$me === void 0 ? void 0 : _room$currentState$me.powerLevel) >= 100;
    })).map(room => /*#__PURE__*/react.createElement("div", {
      key: room.roomId,
      className: "mx_SelectFollowRoomDialog_space_opt"
    }, /*#__PURE__*/react.createElement(RoomAvatar/* default */.Z, {
      className: "mx_SelectFollowRoomDialog_space_opt_icon",
      size: 22,
      room: room
    }), /*#__PURE__*/react.createElement("span", null, room.name)));
  }, [space]);
  return /*#__PURE__*/react.createElement(BaseDialog/* default */.Z, {
    className: "mx_SelectFollowRoomDialog",
    onFinished: props.onFinished,
    title: "",
    hasCancel: false,
    fixedWidth: false
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_SelectFollowRoomDialog_title"
  }, "Add this room\u2019s updates to your squad"), /*#__PURE__*/react.createElement("div", {
    className: "mx_SelectFollowRoomDialog_des"
  }, "Select where you want these updates to go. You can remove this at any time in squad settings"), /*#__PURE__*/react.createElement("label", {
    className: "mx_SelectFollowRoomDialog_label"
  }, "Send to"), /*#__PURE__*/react.createElement(Dropdown/* default */.Z, {
    id: "mx_SelectFollowRoomDialog_space",
    className: "mx_SelectFollowRoomDialog_space",
    onOptionChange: selectSpace,
    value: space,
    label: "Send to",
    menuWidth: 382
  }, spaceOptions), /*#__PURE__*/react.createElement("label", {
    className: "mx_SelectFollowRoomDialog_label"
  }, "Select room"), /*#__PURE__*/react.createElement(Dropdown/* default */.Z, {
    id: "mx_SelectFollowRoomDialog_room",
    className: "mx_SelectFollowRoomDialog_room",
    onOptionChange: selectRoom,
    value: room,
    label: "Select room",
    menuWidth: 382
  }, roomOptions), /*#__PURE__*/react.createElement(DialogButtons/* default */.Z, {
    primaryButton: (0,languageHandler._t)('Follow'),
    onPrimaryButtonClick: () => {
      var _props$onFinished;
      return (_props$onFinished = props.onFinished) === null || _props$onFinished === void 0 ? void 0 : _props$onFinished.call(props, true, space, room);
    },
    onCancel: () => {
      var _props$onFinished2;
      return (_props$onFinished2 = props.onFinished) === null || _props$onFinished2 === void 0 ? void 0 : _props$onFinished2.call(props, false);
    },
    primaryDisabled: !space || !room
  }));
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/HomeButton.tsx
var HomeButton = __webpack_require__(508380);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/activity/EventTag.tsx
var EventTag = __webpack_require__(819768);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/settings/tabs/user/ModesUserSettingsTab.tsx
var ModesUserSettingsTab = __webpack_require__(289868);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/icons/securityAndPrivacy/Screenshot.tsx
var Screenshot = __webpack_require__(250931);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/icons/securityAndPrivacy/Forwarding.tsx
var Forwarding = __webpack_require__(133699);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/icons/securityAndPrivacy/WaterMark.tsx
var WaterMark = __webpack_require__(902798);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/icons/securityAndPrivacy/Disappear.tsx
var Disappear = __webpack_require__(851527);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/icons/securityAndPrivacy/FlashChat.tsx
var FlashChat = __webpack_require__(141469);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/RoomHeaderProtectionStateBar.tsx








const RoomHeaderProtectionStateBar = ({
  roomId
}) => {
  const settingsMap = (0,settingsStore/* useDefendSettingsStore */.IO)(state => state.settings);
  const {
    screenshot,
    forwarding,
    watermark,
    messageAliveSecond,
    roomAliveTimestamps
  } = (settingsMap === null || settingsMap === void 0 ? void 0 : settingsMap.get(roomId)) || {};
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_RoomHeader_protection_bar"
  }, screenshot && /*#__PURE__*/react.createElement(dist.SdTooltip, {
    title: "Screenshot protection enabled"
  }, /*#__PURE__*/react.createElement("div", {
    style: {
      zIndex: 10
    }
  }, /*#__PURE__*/react.createElement(Screenshot/* default */.Z, null))), forwarding && /*#__PURE__*/react.createElement(dist.SdTooltip, {
    title: "Forwarding protection enabled"
  }, /*#__PURE__*/react.createElement("div", {
    style: {
      zIndex: 10
    }
  }, /*#__PURE__*/react.createElement(Forwarding/* default */.Z, null))), watermark && /*#__PURE__*/react.createElement(dist.SdTooltip, {
    title: "WaterMark enabled"
  }, /*#__PURE__*/react.createElement("div", {
    style: {
      zIndex: 10
    }
  }, /*#__PURE__*/react.createElement(WaterMark/* default */.Z, null))), messageAliveSecond > 0 && /*#__PURE__*/react.createElement(dist.SdTooltip, {
    title: "Disappearing messages enabled"
  }, /*#__PURE__*/react.createElement("div", {
    style: {
      zIndex: 10
    }
  }, /*#__PURE__*/react.createElement(Disappear/* default */.Z, null))), roomAliveTimestamps > 0 && /*#__PURE__*/react.createElement(dist.SdTooltip, {
    title: "FlashChat24 enabled"
  }, /*#__PURE__*/react.createElement("div", {
    style: {
      zIndex: 10
    }
  }, /*#__PURE__*/react.createElement(FlashChat/* default */.Z, null))));
};
/* harmony default export */ const rooms_RoomHeaderProtectionStateBar = (RoomHeaderProtectionStateBar);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/features/FeatureWrapper/index.tsx
var FeatureWrapper = __webpack_require__(158340);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Lifecycle.ts + 12 modules
var Lifecycle = __webpack_require__(729017);
// EXTERNAL MODULE: ./node_modules/@sdm/react/dist/index.js
var react_dist = __webpack_require__(654384);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/units.ts
var units = __webpack_require__(612559);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(166644);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/BackButton.tsx



const BackButton = props => {
  return /*#__PURE__*/react.createElement(dist.SdButton, (0,esm_extends/* default */.Z)({}, props, {
    className: "mx_BackButton",
    icon: "ArrowLeftOutlines"
  }));
};
/* harmony default export */ const views_BackButton = (BackButton);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/RoomHeader.tsx

var RoomHeader_dec, RoomHeader_class, RoomHeader_class2;
/*
Copyright 2015, 2016 OpenMarket Ltd
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


































const signalIcon = __webpack_require__(792734);
const SIGNAL_RATE_MS = 30 * 1000; // 30 seconds
let signalInterval = null;
let RoomHeader = (RoomHeader_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.rooms.RoomHeader"), RoomHeader_dec(RoomHeader_class = (RoomHeader_class2 = class RoomHeader extends react.PureComponent {
  constructor(props, context) {
    super(props, context);
    (0,defineProperty/* default */.Z)(this, "onRoomStateEvents", (event, state) => {
      if (!this.props.room || event.getRoomId() !== this.props.room.roomId) {
        return;
      }

      // redisplay the room name, topic, etc.
      this.rateLimitedUpdate();
    });
    (0,defineProperty/* default */.Z)(this, "onFollowClicked", async () => {
      const modal = Modal/* default */.Z.createDialog(SelectFollowRoomDialog, {}, "mx_SelectFollowRoomDialog_wrapper");
      const [shouldCreate,, roomId] = await modal.finished;
      if (shouldCreate && this.props.room) {
        try {
          const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
          await cli.followRoom(this.props.room.roomId, roomId);
          dist.SdMessage.success("Followed successfully");
        } catch (error) {
          dist.SdMessage.error(error.message);
        }
      }
    });
    (0,defineProperty/* default */.Z)(this, "rateLimitedUpdate", (0,throttle/* default */.Z)(() => {
      this.forceUpdate();
    }, 500, {
      leading: true,
      trailing: true
    }));
    (0,defineProperty/* default */.Z)(this, "onRoomSummaryClicked", void 0);
    (0,defineProperty/* default */.Z)(this, "onNotificationsClicked", void 0);
    (0,defineProperty/* default */.Z)(this, "onOpenP2PClicked", void 0);
    (0,defineProperty/* default */.Z)(this, "onCloseP2PClicked", void 0);
    (0,defineProperty/* default */.Z)(this, "getSignalLevel", async () => {
      const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
      try {
        const res = await client.getSignalLevel();
        const {
          level
        } = JSON.parse(res || "");
        this.setState({
          level: Number(level)
        });
        if (level) {
          let signalIconStyle = {
            backgroundPosition: "left center"
          };
          switch (level) {
            case "1":
              signalIconStyle = {
                backgroundPosition: "-33px center"
              };
              break;
            case "2":
              signalIconStyle = {
                backgroundPosition: "-66px center"
              };
              break;
            case "3":
              signalIconStyle = {
                backgroundPosition: "-99px center"
              };
              break;
            case "100":
              signalIconStyle = {
                backgroundPosition: "-132px center"
              };
              break;
            default:
              break;
          }
          this.setState({
            signalIconStyle
          });
          dispatcher/* default */.ZP.dispatch({
            action: "signal_level_updated",
            signalLevel: level
          });
        }
      } catch (error) {
        console.log("get signal level error:", error);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onSettingsOpen", (tabId, isShotCut) => {
      const payload = {
        action: actions/* Action */.a.ViewUserSettings,
        initialTabId: tabId,
        isShotCut
      };
      dispatcher/* default */.ZP.dispatch(payload);
    });
    (0,defineProperty/* default */.Z)(this, "getMembersCount", () => {
      return this.props.room.getRoomMemberCount();
    });
    (0,defineProperty/* default */.Z)(this, "renderBackButton", () => {
      const {
        forwardPhase
      } = this.context;
      if (!forwardPhase) return /*#__PURE__*/react.createElement(HomeButton/* HomeButton */.u, null);
      const lastRoomId = RightPanelStore/* default */.Z.getSharedInstance().lastRoomId;
      if (lastRoomId === this.props.room.roomId) return /*#__PURE__*/react.createElement(HomeButton/* HomeButton */.u, null);
      return /*#__PURE__*/react.createElement(views_BackButton, {
        onClick: this.onBackClick
      });
    });
    (0,defineProperty/* default */.Z)(this, "onBackClick", () => {
      const lastRoomId = RightPanelStore/* default */.Z.getSharedInstance().lastRoomId;
      dispatcher/* default */.ZP.dispatch({
        action: "view_room",
        room_id: lastRoomId
      });
    });
    this.state = {
      signalIconStyle: {},
      level: 0
    };
  }
  componentDidMount() {
    const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
    cli.on("RoomState.events", this.onRoomStateEvents);
    this.getSignalLevel();
    signalInterval = setInterval(this.getSignalLevel, SIGNAL_RATE_MS);
  }
  componentWillUnmount() {
    const cli = MatrixClientPeg/* MatrixClientPeg */.p.get();
    if (cli) {
      cli.off("RoomState.events", this.onRoomStateEvents);
    }
    clearInterval(signalInterval);
  }
  render() {
    var _this$props$room$curr, _networkNode;
    const {
      signalIconStyle
    } = this.state;
    const {
      url,
      activityType: eventType
    } = this.props.room.getPinnedActivityEventContent();

    // let searchStatus = null;

    // don't display the search count until the search completes and
    // gives us a valid (possibly zero) searchCount.
    // if (this.props.searchInfo &&
    //     this.props.searchInfo.searchCount !== undefined &&
    //     this.props.searchInfo.searchCount !== null) {
    //     searchStatus = <div className="mx_RoomHeader_searchStatus">&nbsp;
    //         { _t("(~%(count)s results)", { count: this.props.searchInfo.searchCount }) }
    //     </div>;
    // }

    // XXX: this is a bit inefficient - we could just compare room.name for 'Empty room'...
    let settingsHint = false;
    const members = this.props.room ? this.props.room.getJoinedMembers() : undefined;
    const memberName = {
      rawDisplayName: "",
      ens: 0
    };
    if (members) {
      if (members.length === 1 && members[0].userId === MatrixClientPeg/* MatrixClientPeg */.p.get().credentials.userId) {
        const nameEvent = this.props.room.currentState.getStateEvents("m.room.name", "");
        if (!nameEvent || !nameEvent.getContent().name) {
          settingsHint = true;
        }
      }
      if (this.props.room.isDmRoom()) {
        members.forEach(item => {
          if (MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId() !== item.userId) {
            memberName.ens = item.ens;
            memberName.rawDisplayName = item.rawDisplayName;
          }
        });
      }
    }
    const he = members.find(v => v.userId !== this.props.room.myUserId);
    let oobName = (0,languageHandler._t)("Join Room");
    if (this.props.oobData && this.props.oobData.name) {
      oobName = this.props.oobData.name;
    }
    const textClasses = classnames_default()("mx_RoomHeader_nametext", {
      mx_RoomHeader_settingsHint: settingsHint
    });
    const isAnnouncementRoom = this.props.room.isAnnouncementRoom();
    const hasAnnouncementPermission = ((_this$props$room$curr = this.props.room.currentState.members[this.props.room.myUserId]) === null || _this$props$room$curr === void 0 ? void 0 : _this$props$room$curr.powerLevel) >= 100;
    let followButton = null;
    if (isAnnouncementRoom && hasAnnouncementPermission) {
      followButton = /*#__PURE__*/react.createElement(AccessibleTooltipButton/* default */.Z, {
        className: "mx_RoomHeader_button mx_RoomHeader_followButton",
        tooltipClassName: "mx_RoomHeader_button_tooltip",
        onClick: this.onFollowClicked,
        title: (0,languageHandler._t)("Follow")
      }, (0,languageHandler._t)("Follow"));
    }
    const name = /*#__PURE__*/react.createElement("div", {
      className: classnames_default()("mx_RoomHeader_name", {
        mx_RoomHeader_name_announcement: isAnnouncementRoom && hasAnnouncementPermission
      }),
      onClick: e => {
        if (e.target.closest(".mx_RoomHeader_followButton") === null) {
          this.onRoomSummaryClicked();
        }
      }
    }, /*#__PURE__*/react.createElement(RoomName/* default */.Z, {
      room: this.props.room
    }, (name, remark) => {
      const roomName = remark || name || oobName;
      return /*#__PURE__*/react.createElement("div", {
        dir: "auto",
        className: textClasses,
        title: roomName
      }, memberName.ens && memberName.rawDisplayName === roomName ? /*#__PURE__*/react.createElement(react_dist.Text, null, roomName) : /*#__PURE__*/react.createElement("span", null, roomName));
    }), /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomHeader_roomStatus_wrapper"
    }, !this.props.room.isSaveMessageRoom() ? !this.props.room.isDmRoom() && (isAnnouncementRoom && hasAnnouncementPermission ? null : /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomHeader_roomStatus"
    }, (0,languageHandler._t)("Members"), " ", this.getMembersCount(), this.props.room.hasPinnedActivityEvent() && /*#__PURE__*/react.createElement(EventTag/* default */.Z, {
      room: this.props.room,
      tagPosition: "roomHeader",
      eventType: eventType,
      url: url
    }))) : null, /*#__PURE__*/react.createElement(FeatureWrapper/* default */.Z, null, /*#__PURE__*/react.createElement(rooms_RoomHeaderProtectionStateBar, {
      roomId: this.props.room.roomId
    }))), followButton);
    const topicElement = /*#__PURE__*/react.createElement(RoomTopic/* default */.Z, {
      room: this.props.room
    }, (topic, ref) => /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomHeader_topic",
      ref: ref,
      title: topic,
      dir: "auto"
    }, topic ? /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomHeader_line"
    }) : null, topic));
    let roomAvatar;
    if (this.props.room) {
      roomAvatar = /*#__PURE__*/react.createElement(DecoratedRoomAvatar/* default */.Z, {
        room: this.props.room,
        oobData: this.props.oobData,
        size: "middle"
      });
    }
    let searchButton;
    let roomInfoButton;
    if (this.onRoomSummaryClicked && this.props.inRoom && !this.props.room.isDmRoom()) {
      roomInfoButton = /*#__PURE__*/react.createElement(dist.SdTooltip, {
        title: this.props.room.hasSpaceParent() ? (0,languageHandler._t)("Channel info") : (0,languageHandler._t)("Group info"),
        placement: "bottom"
      }, /*#__PURE__*/react.createElement(dist.SdButton, {
        className: "mx_RoomHeader_button mx_RoomHeader_roomInfoButton",
        onClick: this.onRoomSummaryClicked
      }, /*#__PURE__*/react.createElement(dist.SdIcon, {
        icon: "GroupmembersOutlines"
      })));
    }
    const level = this.state.level;
    let networkNode;
    try {
      networkNode = (0,Lifecycle/* getUserNetworkNode */.JI)(MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId());
    } catch {}
    const netNode = !networkNode || (_networkNode = networkNode) !== null && _networkNode !== void 0 && _networkNode.endpoint.includes("localhost") ? ModesUserSettingsTab/* NetMode */.Q.Def : ModesUserSettingsTab/* NetMode */.Q.Delegate;
    let signalButton = /*#__PURE__*/react.createElement(dist.SdTooltip, {
      title: /*#__PURE__*/react.createElement("div", null, (0,languageHandler._t)("The network is congested?"), /*#__PURE__*/react.createElement("span", {
        className: "text-primary"
      }, (0,languageHandler._t)("Try switch modes"))),
      placement: "bottom",
      overlayStyle: {
        maxWidth: 320
      }
    }, /*#__PURE__*/react.createElement(dist.SdButton, {
      type: "associate",
      className: "mx_RoomHeader_button_signal",
      onClick: e => this.onSettingsOpen(UserSettingsDialog/* UserTab */.oX.Mode, true),
      title: (0,languageHandler._t)("Signal")
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_network_buttons"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_network_edge_mode" + " " + (netNode === ModesUserSettingsTab/* NetMode */.Q.Def ? "active" : "")
    }, /*#__PURE__*/react.createElement(dist.SdIcon, {
      icon: "ModeOutlines",
      className: "mx_network_edge_mode_icon"
    })), /*#__PURE__*/react.createElement("div", {
      className: "mx_network_fed_mode" + " " + (netNode === ModesUserSettingsTab/* NetMode */.Q.Delegate ? "active" : "")
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_network_fed_mode_icon"
    }, /*#__PURE__*/react.createElement("span", {
      className: level > 0 ? "active" : ""
    }), /*#__PURE__*/react.createElement("span", {
      className: level > 1 ? "active" : ""
    }), /*#__PURE__*/react.createElement("span", {
      className: level > 2 ? "active" : ""
    }), /*#__PURE__*/react.createElement("span", {
      className: level > 3 ? "active" : ""
    }))))));
    // let P2PButton;
    // if (this.props.inRoom && this.props.room.isDmRoom()) {
    //     P2PButton = (
    //         <AccessibleTooltipButton
    //             className="mx_RoomHeader_button mx_RoomHeader_P2PButton"
    //             tooltipClassName="mx_RoomHeader_button_tooltip"
    //             onClick={this.onOpenP2PClicked}
    //             title='open P2P'
    //         />
    //     );
    // }
    let voiceCallButton;
    let canCall = false;
    if (this.props.room.isSaveMessageRoom()) {
      canCall = false;
    } else {
      if (this.props.room.isDmRoom()) {
        const members = this.props.room.getMembers();
        const he = members.find(member => member.userId !== this.props.room.myUserId);
        if (he) {
          const userShip = ContactStore["default"].instance.getUserShip(he.userId);
          canCall = userShip.includes(user/* UserShip */.J.Friend) || userShip.includes(user/* UserShip */.J.Colleague);
        }
      } else {
        canCall = true;
      }
    }
    if (this.props.inRoom && SettingsStore/* default */.C.getValue("showCallButtonsInComposer") && canCall) {
      voiceCallButton = /*#__PURE__*/react.createElement(dist.SdTooltip, {
        placement: "bottom",
        title: (0,languageHandler._t)("Voice call")
      }, /*#__PURE__*/react.createElement(dist.SdButton, {
        className: "mx_RoomHeader_button",
        type: "associate",
        onClick: () => this.props.onCallPlaced(CallHandler/* PlaceCallType */.gr.Voice)
      }, /*#__PURE__*/react.createElement(dist.SdIcon, {
        icon: "PhoneOutlines"
      })));
    }
    const rightRow = /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomHeader_buttons"
    }, SdkConfig/* default */.Z.get("WHITE_LIST_PERMISSION") && !units/* isMobile */.tq ? signalButton : null, searchButton, roomInfoButton, voiceCallButton);

    // const e2eIcon = this.props.e2eStatus ? <E2EIcon status={this.props.e2eStatus} /> : undefined;

    return /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomHeader light-panel"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomHeader_wrapper",
      "aria-owns": "mx_RightPanel"
    }, this.renderBackButton(), /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomHeader_avatar",
      onClick: this.onRoomSummaryClicked
    }, roomAvatar), name, topicElement, rightRow, /*#__PURE__*/react.createElement(RoomHeaderButtons, {
      onCallPlaced: this.props.onCallPlaced,
      room: this.props.room,
      inRoom: this.props.inRoom,
      setRoomSummaryClickHandler: v => this.onRoomSummaryClicked = v,
      setNotificationsClick: v => this.onNotificationsClicked = v,
      setOpenP2PClick: v => this.onOpenP2PClicked = v,
      setCloseP2PClick: v => this.onCloseP2PClicked = v
    })));
  }
}, (0,defineProperty/* default */.Z)(RoomHeader_class2, "defaultProps", {
  editing: false,
  inRoom: false
}), (0,defineProperty/* default */.Z)(RoomHeader_class2, "contextType", RoomContext/* default */.Z), RoomHeader_class2)) || RoomHeader_class);

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/effects/index.ts
var effects = __webpack_require__(410603);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/EffectsOverlay.tsx
/*
 Copyright 2020 Nurjin Jafar
 Copyright 2020 Nordeck IT + Consulting GmbH.

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




const EffectsOverlay = ({
  roomWidth
}) => {
  const canvasRef = (0,react.useRef)(null);
  const effectsRef = (0,react.useRef)(new Map());
  const lazyLoadEffectModule = async name => {
    if (!name) return null;
    let effect = effectsRef.current[name] || null;
    if (effect === null) {
      var _CHAT_EFFECTS$find;
      const options = (_CHAT_EFFECTS$find = effects/* CHAT_EFFECTS */.b.find(e => e.command === name)) === null || _CHAT_EFFECTS$find === void 0 ? void 0 : _CHAT_EFFECTS$find.options;
      try {
        const {
          default: Effect
        } = await __webpack_require__(813520)(`./${name}`);
        effect = new Effect(options);
        effectsRef.current[name] = effect;
      } catch (err) {
        console.warn(`Unable to load effect module at '../../../effects/${name}.`, err);
      }
    }
    return effect;
  };
  (0,react.useEffect)(() => {
    const resize = () => {
      var _canvasRef$current;
      if (canvasRef.current && ((_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.height) !== UIStore/* default */.Z.instance.windowHeight) {
        canvasRef.current.height = UIStore/* default */.Z.instance.windowHeight;
      }
    };
    const onAction = payload => {
      const actionPrefix = 'effects.';
      if (payload.action.indexOf(actionPrefix) === 0) {
        const effect = payload.action.substr(actionPrefix.length);
        lazyLoadEffectModule(effect).then(module => module === null || module === void 0 ? void 0 : module.start(canvasRef.current));
      }
    };
    const dispatcherRef = dispatcher/* default */.ZP.register(onAction);
    const canvas = canvasRef.current;
    canvas.height = UIStore/* default */.Z.instance.windowHeight;
    UIStore/* default */.Z.instance.on(UIStore/* UI_EVENTS */.Q.Resize, resize);
    return () => {
      dispatcher/* default */.ZP.unregister(dispatcherRef);
      UIStore/* default */.Z.instance.off(UIStore/* UI_EVENTS */.Q.Resize, resize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const currentEffects = effectsRef.current; // this is not a react node ref, warning can be safely ignored
      for (const effect in currentEffects) {
        const effectModule = currentEffects[effect];
        if (effectModule && effectModule.isRunning) {
          effectModule.stop();
        }
      }
    };
  }, []);
  return /*#__PURE__*/react.createElement("canvas", {
    ref: canvasRef,
    width: roomWidth,
    style: {
      display: 'block',
      zIndex: 999999,
      pointerEvents: 'none',
      position: 'fixed',
      top: 0,
      right: 0
    }
  });
};
/* harmony default export */ const elements_EffectsOverlay = (EffectsOverlay);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/effects/utils.ts
var effects_utils = __webpack_require__(458372);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/WidgetStore.ts
var WidgetStore = __webpack_require__(548226);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Notifier.ts
var Notifier = __webpack_require__(753687);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/toasts/DesktopNotificationsToast.ts
var DesktopNotificationsToast = __webpack_require__(419376);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/notifications/RoomNotificationStateStore.ts + 3 modules
var RoomNotificationStateStore = __webpack_require__(16033);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/KeyBindingsManager.ts + 1 modules
var KeyBindingsManager = __webpack_require__(481493);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/utils/EditorStateTransfer.ts

/*
Copyright 2019 - 2021 The Matrix.org Foundation C.I.C.

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
 * Used while editing, to pass the event, and to preserve editor state
 * from one editor instance to another when remounting the editor
 * upon receiving the remote echo for an unsent event.
 */
class EditorStateTransfer {
  constructor(event) {
    this.event = event;
    (0,defineProperty/* default */.Z)(this, "serializedParts", null);
    (0,defineProperty/* default */.Z)(this, "caret", null);
  }
  setEditorState(caret, serializedParts) {
    this.caret = caret;
    this.serializedParts = serializedParts;
  }
  hasEditorState() {
    return !!this.serializedParts;
  }
  getSerializedParts() {
    return this.serializedParts;
  }
  getCaret() {
    return this.caret;
  }
  getEvent() {
    return this.event;
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ErrorDialog.tsx
var ErrorDialog = __webpack_require__(705636);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/messages/DateSeparator.tsx
var DateSeparator = __webpack_require__(964586);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/SearchResultTile.tsx

var SearchResultTile_dec, SearchResultTile_class, SearchResultTile_class2;
/*
Copyright 2015 OpenMarket Ltd
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









let SearchResultTile = (SearchResultTile_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.rooms.SearchResultTile"), SearchResultTile_dec(SearchResultTile_class = (SearchResultTile_class2 = class SearchResultTile extends react.Component {
  render() {
    const result = this.props.searchResult;
    const mxEv = result.context.getEvent();
    const eventId = mxEv.getId();
    const ts1 = mxEv.getTs();
    const ret = [/*#__PURE__*/react.createElement(DateSeparator["default"], {
      key: ts1 + "-search",
      ts: ts1
    })];
    const layout = SettingsStore/* default */.C.getValue("layout");
    const isTwelveHour = SettingsStore/* default */.C.getValue("showTwelveHourTimestamps");
    const alwaysShowTimestamps = SettingsStore/* default */.C.getValue("alwaysShowTimestamps");
    const enableFlair = SettingsStore/* default */.C.getValue(UIFeature/* UIFeature */.H.Flair);
    const timeline = result.context.getTimeline();
    for (let j = 0; j < timeline.length; j++) {
      var _this$context;
      const ev = timeline[j];
      let highlights;
      const contextual = j != result.context.getOurEventIndex();
      if (!contextual) {
        highlights = this.props.searchHighlights;
      }
      if ((0,EventTile/* haveTileForEvent */.K3)(ev, (_this$context = this.context) === null || _this$context === void 0 ? void 0 : _this$context.showHiddenEventsInTimeline)) {
        ret.push( /*#__PURE__*/react.createElement(EventTile/* default */.ZP, {
          forceAvatar: true,
          key: `${eventId}+${j}`,
          mxEvent: ev,
          layout: Layout/* Layout */.A.Bubble,
          contextual: contextual,
          highlights: highlights,
          permalinkCreator: this.props.permalinkCreator,
          highlightLink: this.props.resultLink,
          onHeightChanged: this.props.onHeightChanged,
          isTwelveHour: isTwelveHour,
          alwaysShowTimestamps: alwaysShowTimestamps,
          enableFlair: enableFlair
        }));
      }
    }
    return /*#__PURE__*/react.createElement("li", {
      "data-scroll-tokens": eventId
    }, ret);
  }
}, (0,defineProperty/* default */.Z)(SearchResultTile_class2, "contextType", RoomContext/* default */.Z), SearchResultTile_class2)) || SearchResultTile_class);

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/RoomStatusBar.tsx
var RoomStatusBar = __webpack_require__(67078);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/MessageComposer.tsx + 18 modules
var MessageComposer = __webpack_require__(539315);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/JumpToBottomButton.tsx
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





const JumpToBottomButton = props => {
  const className = classnames_default()({
    mx_JumpToBottomButton: true,
    mx_JumpToBottomButton_highlight: props.highlight
  });
  let badge;
  if (props.numUnreadMessages) {
    badge = /*#__PURE__*/react.createElement("div", {
      className: "mx_JumpToBottomButton_badge"
    }, props.numUnreadMessages);
  }
  return /*#__PURE__*/react.createElement("div", {
    className: className
  }, /*#__PURE__*/react.createElement(dist.SdButton, {
    className: "mx_JumpToBottomButton_scrollDown",
    title: (0,languageHandler._t)("Scroll to most recent messages"),
    onClick: props.onScrollToBottomClick,
    icon: "ToDownOutlines"
  }), badge);
};
/* harmony default export */ const rooms_JumpToBottomButton = (JumpToBottomButton);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/TopUnreadMessagesBar.tsx
var TopUnreadMessagesBar_dec, TopUnreadMessagesBar_class;
/*
Copyright 2016 - 2021 The Matrix.org Foundation C.I.C.

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





let TopUnreadMessagesBar = (TopUnreadMessagesBar_dec = (0,replaceableComponent/* replaceableComponent */.U)("views.rooms.TopUnreadMessagesBar"), TopUnreadMessagesBar_dec(TopUnreadMessagesBar_class = class TopUnreadMessagesBar extends react.PureComponent {
  render() {
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_TopUnreadMessagesBar"
    }, /*#__PURE__*/react.createElement(dist.SdButton, {
      className: "mx_TopUnreadMessagesBar_scrollUp",
      title: (0,languageHandler._t)("Jump to first unread message."),
      onClick: this.props.onScrollUpClick,
      icon: "ToTopOutlines"
    }), /*#__PURE__*/react.createElement(dist.SdButton, {
      className: "mx_TopUnreadMessagesBar_markAsRead",
      title: (0,languageHandler._t)("Mark all as read"),
      onClick: this.props.onCloseClick,
      icon: "CloseOutlines"
    }));
  }
}) || TopUnreadMessagesBar_class);

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/SpaceStore.tsx + 2 modules
var SpaceStore = __webpack_require__(387579);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/room-list/RoomListStore.ts + 12 modules
var RoomListStore = __webpack_require__(109660);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/room-list/models.ts + 1 modules
var models = __webpack_require__(103619);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/PinnedMsgBar.tsx + 8 modules
var PinnedMsgBar = __webpack_require__(832227);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/firebase_analytics.ts + 3 modules
var firebase_analytics = __webpack_require__(937139);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/useMount.ts
var useMount = __webpack_require__(301098);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/useTimeout.ts
var useTimeout = __webpack_require__(727605);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/UrlUtils.ts
var UrlUtils = __webpack_require__(58238);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/lib/constants.ts
var constants = __webpack_require__(877294);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/audio_player/AudioPlayerCard.tsx






// TODO: variable bg color
//const cardBgMap = {
//    0: 'linear-gradient(90deg, #E15050 0%, #BF4646 100%)',
//    1: 'linear-gradient(90deg, #32A69F 0%, #24908A 100%)',
//    2: 'linear-gradient(90deg, #94BD60 0%, #81AB4C 100%)',
//    3: 'linear-gradient(90deg, #5EAD4A 0%, #4F973D 100%)',
//    4: 'linear-gradient(90deg, #5072C7 0%, #4262B2 100%)',
//    5: 'linear-gradient(90deg, #8156C6 0%, #6A43AA 100%)',
//    6: 'linear-gradient(90deg, #C25999 0%, #AA4683 100%)',
//    7: 'linear-gradient(90deg, #DB8A4E 0%, #CB7A3F 100%)',
//    8: 'linear-gradient(90deg, #47AB81 0%, #389970 100%)',
//    9: 'linear-gradient(90deg, #417ACE 0%, #3067B9 100%)',
//};
const getAudioId = url => {
  return (0,UrlUtils/* getUrlParam */.eY)(url, 'space');
};
const AudioPlayerCard = ({
  actInfo,
  onPlay
}) => {
  const {
    title,
    url,
    host_avatar: hostAvatar,
    host
  } = actInfo;
  const [onlinePeople, setOnlinePeople] = (0,react.useState)([]);
  const idRef = (0,react.useRef)(undefined);
  idRef.current = getAudioId(url);
  const getOnlinePeople = async () => {
    const url = `${constants/* SOSHOW_API */.U6}/open/get_space?space=${idRef.current}`;
    const res = await fetch(url, {
      method: 'GET'
    }).then(response => response.json());
    const {
      data,
      errorcode,
      message: msg
    } = res;
    if (errorcode === 0 && data) {
      setOnlinePeople(data.speaker_users || []);
    } else {
      console.log(`online api is error ${msg}`);
    }
  };
  (0,useMount/* default */.Z)(() => getOnlinePeople());
  (0,useTimeout/* useInterval */.Yz)(() => getOnlinePeople(), 10000);
  return /*#__PURE__*/react.createElement("div", {
    className: "mx_audio_player_card"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_track_info"
  }, /*#__PURE__*/react.createElement("div", {
    className: "net_meeting_container"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_net_meeting_container_left"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_title"
  }, /*#__PURE__*/react.createElement("span", {
    className: "mx_icon mx_audio_player_card_button"
  }), /*#__PURE__*/react.createElement("span", {
    className: "title"
  }, title)), /*#__PURE__*/react.createElement("div", {
    className: "mx_tag_host_container"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mx_tag_host_left"
  }, /*#__PURE__*/react.createElement("span", {
    className: "mx_tag_host_img"
  }, /*#__PURE__*/react.createElement("img", {
    src: hostAvatar
  })), /*#__PURE__*/react.createElement("span", {
    className: "mx_tag_host_title"
  }, host), /*#__PURE__*/react.createElement("span", {
    className: "mx_tag_host_host"
  }, "Host")), /*#__PURE__*/react.createElement("div", {
    className: "mx_members"
  }, /*#__PURE__*/react.createElement("span", {
    className: "mx_image_members"
  }, onlinePeople.slice(0, 4).map(item => /*#__PURE__*/react.createElement("img", {
    className: "mx_img_mr_4",
    src: item.profile_image_url,
    key: item.id
  }))), /*#__PURE__*/react.createElement("div", {
    className: "mx_members_people_text"
  }, /*#__PURE__*/react.createElement("span", {
    className: "mx_mr_5 mx_ml_5"
  }, onlinePeople.length), /*#__PURE__*/react.createElement("span", null, "people joined"))))), /*#__PURE__*/react.createElement("div", {
    className: "mx_net_meeting_container_right"
  }, /*#__PURE__*/react.createElement("span", {
    className: "listen_button",
    onClick: () => onPlay(actInfo === null || actInfo === void 0 ? void 0 : actInfo.url)
  }, "Listen Live")))));
};
/* harmony default export */ const audio_player_AudioPlayerCard = (AudioPlayerCard);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/AudioPlayerStore.ts
var AudioPlayerStore = __webpack_require__(210060);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/WalletStore.ts
var WalletStore = __webpack_require__(644764);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/commonPointParams.ts
var commonPointParams = __webpack_require__(970698);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/structures/space_home/DappButtons.tsx + 1 modules
var DappButtons = __webpack_require__(249135);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/hooks/theme/useGetThemeConfig.ts
var useGetThemeConfig = __webpack_require__(155298);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/rooms/preview_card/handles/soshow.ts
var soshow = __webpack_require__(935423);
// EXTERNAL MODULE: ./node_modules/ahooks/lib/index.js
var ahooks_lib = __webpack_require__(924737);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/defender/DefenderSettingsAnchor.tsx

function DefenderSettingsAnchor_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function DefenderSettingsAnchor_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? DefenderSettingsAnchor_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : DefenderSettingsAnchor_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }







/**
 * init security & privacy state
 * dep on room id
 *
 * @param roomId {String} - effect dep on room id and refresh value when it is changes
 * @returns
 */
const DefenderSettingsAnchor = /*#__PURE__*/(0,react.memo)(({
  roomId
}) => {
  const cli = (0,react.useContext)(MatrixClientContext/* default */.Z);
  (0,ahooks_lib.useRequest)(() => cli.getSecurityAndPrivacyState(roomId), {
    onSuccess(data) {
      (0,settingsStore/* updateDefendSettings */.BA)({
        roomID: roomId,
        value: DefenderSettingsAnchor_objectSpread(DefenderSettingsAnchor_objectSpread({}, settingsStore/* DEFAULT_SETTINGS */.Z), data)
      });
    },
    onError() {
      (0,settingsStore/* updateDefendSettings */.BA)({
        roomID: roomId,
        value: DefenderSettingsAnchor_objectSpread({}, settingsStore/* DEFAULT_SETTINGS */.Z)
      });
    }
  });
  (0,react.useEffect)(() => {
    const room = cli.getRoom(roomId);
    const onEventsAction = event => {
      if (event.getType() === _types_event/* EventType */.tw.securityAndPrivacy && event.getRoomId() === roomId) {
        (0,settingsStore/* updateDefendSettings */.BA)({
          roomID: roomId,
          value: DefenderSettingsAnchor_objectSpread(DefenderSettingsAnchor_objectSpread({}, settingsStore/* DEFAULT_SETTINGS */.Z), event.getContent())
        });
      }
    };
    room.client.on("RoomState.events", onEventsAction);
    return () => {
      room.client.off("RoomState.events", onEventsAction);
    };
  }, [roomId]);
  return /*#__PURE__*/react.createElement(react.Fragment, null);
});
/* harmony default export */ const defender_DefenderSettingsAnchor = (DefenderSettingsAnchor);
// EXTERNAL MODULE: ./node_modules/antd/lib/modal/Modal.js
var modal_Modal = __webpack_require__(583663);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/defender/ScreenshotGuard.tsx





const ScreenshotGuard = ({
  roomId
}) => {
  const settingsMap = (0,settingsStore/* useDefendSettingsStore */.IO)(state => state.settings);
  const {
    screenshot: isScreenshotEnabled
  } = (settingsMap === null || settingsMap === void 0 ? void 0 : settingsMap.get(roomId)) || {};
  const [isDefend, {
    setTrue,
    setFalse
  }] = (0,ahooks_lib.useBoolean)(false);
  (0,react.useEffect)(() => {
    if (!isScreenshotEnabled) {
      return () => null;
    }
    let keysPressed = {};
    const defender = () => {
      setTrue();
    };
    const keyCombinations = {
      "meta+shift": defender,
      "control+shift": defender
    };
    const handleKeyDown = event => {
      keysPressed[event.key] = true;
      const keyCombination = Object.keys(keysPressed).sort().join("+").toLowerCase();
      if (keyCombinations[keyCombination]) {
        keyCombinations[keyCombination]();
      }
    };
    const handleKeyUp = event => {
      delete keysPressed[event.key];
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        keysPressed = {};
      }
    };
    const handleBlur = () => {
      keysPressed = {};
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isScreenshotEnabled]);
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(modal_Modal["default"], {
    open: isDefend,
    onCancel: setFalse,
    centered: true,
    maskStyle: {
      backgroundColor: "#000"
    },
    footer: null
  }, /*#__PURE__*/react.createElement("p", {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      gap: "12px",
      padding: "24px"
    }
  }, /*#__PURE__*/react.createElement(Screenshot/* default */.Z, null), " This interface cannot be screenshot due to application limitations")));
};
/* harmony default export */ const defender_ScreenshotGuard = (ScreenshotGuard);
// EXTERNAL MODULE: ./node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(727484);
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/defender/WaterMarkGuard.tsx




const width = 400;
const height = 300;
const rowHeight = 20;
const offsetLeft = 10;
const createSVGElement = (tagName, attributes) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  return element;
};
const createTextElement = (text, attributes) => {
  const textElement = createSVGElement("text", attributes);
  textElement.textContent = text;
  return textElement;
};
const createSVGWaterMarkUrl = ({
  ele
}) => {
  if (!ele) {
    return "";
  }
  try {
    const svgData = new XMLSerializer().serializeToString(ele);
    const img = `data:image/svg+xml;base64,${btoa(decodeURIComponent(encodeURIComponent(svgData)))}`;
    return img;
  } catch (error) {
    return "";
  }
};
const WaterMarkGuard = ({
  name,
  token,
  roomId
}) => {
  const cli = (0,react.useContext)(MatrixClientContext/* default */.Z);
  const room = cli.getRoom(roomId);
  const [ele, setEleState] = (0,react.useState)(null);
  const settingsMap = (0,settingsStore/* useDefendSettingsStore */.IO)(state => state.settings);
  const {
    watermark: isWatermarkEnabled
  } = (settingsMap === null || settingsMap === void 0 ? void 0 : settingsMap.get(roomId)) || {};
  const waterMark = (0,react.useMemo)(() => {
    try {
      const mysvg = createSVGElement("svg", {
        style: "position: absolute; z-index: -1;",
        viewBox: `0 0 ${width} ${height}`,
        fill: "none",
        width: width,
        height: height
      });

      // const text1 = createTextElement("", {
      //     width: width,
      //     height: rowHeight,
      //     x: offsetLeft,
      //     y: height - rowHeight * 2,
      //     fill: "#FC774B26",
      //     transform: `rotate(-30 0 ${height - rowHeight * 2})`,
      // });

      const text2 = createTextElement(`${name} ${dayjs_min_default()().format("YYYY-MM-DD")}`, {
        width: width,
        height: rowHeight,
        x: rowHeight / 2 + offsetLeft,
        y: height - rowHeight,
        "font-size": "24px",
        fill: "#FC774B26",
        transform: `rotate(-30 ${rowHeight / 2} ${height - rowHeight})`
      });
      const text3 = createTextElement(token, {
        width: width,
        height: rowHeight,
        x: rowHeight + offsetLeft,
        y: height,
        fill: "#FC774B26",
        transform: `rotate(-30 ${rowHeight} ${height})`
      });

      // mysvg.appendChild(text1);
      mysvg.appendChild(text2);
      mysvg.appendChild(text3);
      return createSVGWaterMarkUrl({
        ele: mysvg
      });
    } catch (error) {
      return "";
    }
  }, [name, token]);
  if (!isWatermarkEnabled) {
    return null;
  }
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
    style: {
      position: "absolute",
      zIndex: 1,
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      pointerEvents: "none",
      background: `url(${waterMark}) left top`
    }
  }));
};
/* harmony default export */ const defender_WaterMarkGuard = (WaterMarkGuard);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/OwnProfileStore.ts
var OwnProfileStore = __webpack_require__(580089);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/defenderSettings/countingTimeStampStore.ts
var countingTimeStampStore = __webpack_require__(421643);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/defender/CounterAnchor.tsx


const CountingTimeStampAnchor = () => {
  const timerRef = (0,react.useRef)(null);
  (0,react.useEffect)(() => {
    timerRef.current = setInterval(() => {
      (0,countingTimeStampStore/* countingCurrentTimeStamp */.h)();
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);
  return /*#__PURE__*/react.createElement(react.Fragment, null);
};
/* harmony default export */ const CounterAnchor = (CountingTimeStampAnchor);
// EXTERNAL MODULE: ./node_modules/dayjs/plugin/duration.js
var duration = __webpack_require__(201646);
var duration_default = /*#__PURE__*/__webpack_require__.n(duration);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/defender/FlashRoomCover.tsx






dayjs_min_default().extend((duration_default()));
const DURATION = 24 * 60 * 60000;
const oneHour = 60000 * 60;
const FlashRoomCover = ({
  roomId
}) => {
  const cli = (0,react.useContext)(MatrixClientContext/* default */.Z);
  const settingsMap = (0,settingsStore/* useDefendSettingsStore */.IO)(state => state.settings);
  const {
    roomAliveTimestamps
  } = (settingsMap === null || settingsMap === void 0 ? void 0 : settingsMap.get(roomId)) || {};
  const currentStamp = (0,countingTimeStampStore/* useTimeStampStore */.J)(state => state.stamp);
  const remainingTime = roomAliveTimestamps + DURATION - currentStamp;
  const remaining = dayjs_min_default().duration(remainingTime).format("HH:mm:ss");
  (0,react.useEffect)(() => {
    if (!Boolean(roomAliveTimestamps)) {
      return;
    }
    if (currentStamp > roomAliveTimestamps + DURATION) {
      cli.deleteRoom(roomId);
    }
  }, [roomAliveTimestamps, currentStamp, roomId]);
  if (roomAliveTimestamps && roomAliveTimestamps > 0 && remainingTime > 0) {
    return /*#__PURE__*/react.createElement("div", {
      className: "mx_flashRoom_cover",
      style: {
        ["--flashCover-Color"]: remainingTime < oneHour ? "#ff0000" : "#FC774B"
      }
    }, /*#__PURE__*/react.createElement("div", {
      className: "counting"
    }, `${remaining}`));
  }
  return null;
};
/* harmony default export */ const defender_FlashRoomCover = (FlashRoomCover);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/PermissionStore.ts
var PermissionStore = __webpack_require__(825291);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/inbox/components/NotificationHeader.tsx
var NotificationHeader = __webpack_require__(190968);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/structures/RoomView.tsx


const _excluded = ["type"],
  _excluded2 = ["upgradeRecommendation"],
  _excluded3 = ["upgradeRecommendation"];
var RoomView_dec, RoomView_class, RoomView_class2;
function RoomView_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function RoomView_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? RoomView_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : RoomView_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2017 Vector Creations Ltd
Copyright 2018, 2019 New Vector Ltd
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

// TODO: This component is enormous! There's several things which could stand-alone:
//  - Search results component
//  - Drag and drop






















































































const DEBUG = false;
let debuglog = function (msg) {};
const BROWSER_SUPPORTS_SANDBOX = ("sandbox" in document.createElement("iframe"));
if (DEBUG) {
  // using bind means that we get to keep useful line numbers in the console
  debuglog = console.log.bind(console);
}
let RoomView = (RoomView_dec = (0,replaceableComponent/* replaceableComponent */.U)("structures.RoomView"), RoomView_dec(RoomView_class = (RoomView_class2 = class RoomView extends react.Component {
  constructor(props, context) {
    super(props, context);
    (0,defineProperty/* default */.Z)(this, "dispatcherRef", void 0);
    (0,defineProperty/* default */.Z)(this, "roomStoreToken", void 0);
    (0,defineProperty/* default */.Z)(this, "rightPanelStoreToken", void 0);
    (0,defineProperty/* default */.Z)(this, "settingWatchers", void 0);
    (0,defineProperty/* default */.Z)(this, "unmounted", false);
    (0,defineProperty/* default */.Z)(this, "permalinkCreators", {});
    (0,defineProperty/* default */.Z)(this, "searchId", void 0);
    (0,defineProperty/* default */.Z)(this, "roomView", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "searchResultsPanel", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "messagePanel", void 0);
    (0,defineProperty/* default */.Z)(this, "watchShowMessageBodyBackgroundId", void 0);
    (0,defineProperty/* default */.Z)(this, "onWidgetStoreUpdate", () => {
      if (this.state.room) {
        this.checkWidgets(this.state.room);
      }
    });
    (0,defineProperty/* default */.Z)(this, "checkWidgets", room => {
      this.setState({
        hasPinnedWidgets: WidgetLayoutStore/* WidgetLayoutStore */.z3.instance.getContainerWidgets(room, WidgetLayoutStore/* Container */.W2.Top).length > 0,
        showApps: this.shouldShowApps(room)
      });
    });
    (0,defineProperty/* default */.Z)(this, "onReadReceiptsChange", () => {
      this.setState({
        showReadReceipts: SettingsStore/* default */.C.getValue("showReadReceipts", this.state.roomId)
      });
    });
    (0,defineProperty/* default */.Z)(this, "onRoomViewStoreUpdate", initial => {
      if (this.unmounted) {
        return;
      }
      if (!initial && this.state.roomId !== RoomViewStore/* default */.Z.getRoomId()) {
        // RoomView explicitly does not support changing what room
        // is being viewed: instead it should just be re-mounted when
        // switching rooms. Therefore, if the room ID changes, we
        // ignore this. We either need to do this or add code to handle
        // saving the scroll position (otherwise we end up saving the
        // scroll position against the wrong room).

        // Given that doing the setState here would cause a bunch of
        // unnecessary work, we just ignore the change since we know
        // that if the current room ID has changed from what we thought
        // it was, it means we're about to be unmounted.
        return;
      }
      const roomId = RoomViewStore/* default */.Z.getRoomId();
      const newState = {
        roomId,
        roomAlias: RoomViewStore/* default */.Z.getRoomAlias(),
        roomLoading: RoomViewStore/* default */.Z.isRoomLoading(),
        roomLoadError: RoomViewStore/* default */.Z.getRoomLoadError(),
        joining: RoomViewStore/* default */.Z.isJoining(),
        initialEventId: RoomViewStore/* default */.Z.getInitialEventId(),
        isInitialEventHighlighted: RoomViewStore/* default */.Z.isInitialEventHighlighted(),
        replyToEvent: RoomViewStore/* default */.Z.getQuotingEvent(),
        // we should only peek once we have a ready client
        shouldPeek: this.state.matrixClientIsReady && RoomViewStore/* default */.Z.shouldPeek(),
        showReadReceipts: SettingsStore/* default */.C.getValue("showReadReceipts", roomId),
        showRedactions: SettingsStore/* default */.C.getValue("showRedactions", roomId),
        showJoinLeaves: SettingsStore/* default */.C.getValue("showJoinLeaves", roomId),
        showAvatarChanges: SettingsStore/* default */.C.getValue("showAvatarChanges", roomId),
        showDisplaynameChanges: SettingsStore/* default */.C.getValue("showDisplaynameChanges", roomId),
        wasContextSwitch: RoomViewStore/* default */.Z.getWasContextSwitch()
      };

      // Add watchers for each of the settings we just looked up
      this.settingWatchers = this.settingWatchers.concat([SettingsStore/* default */.C.watchSetting("showReadReceipts", roomId, (...[,,, value]) => this.setState({
        showReadReceipts: value
      })), SettingsStore/* default */.C.watchSetting("showRedactions", roomId, (...[,,, value]) => this.setState({
        showRedactions: value
      })), SettingsStore/* default */.C.watchSetting("showJoinLeaves", roomId, (...[,,, value]) => this.setState({
        showJoinLeaves: value
      })), SettingsStore/* default */.C.watchSetting("showAvatarChanges", roomId, (...[,,, value]) => this.setState({
        showAvatarChanges: value
      })), SettingsStore/* default */.C.watchSetting("showDisplaynameChanges", roomId, (...[,,, value]) => this.setState({
        showDisplaynameChanges: value
      }))]);
      if (!initial && this.state.shouldPeek && !newState.shouldPeek) {
        // Stop peeking because we have joined this room now
        this.context.stopPeeking();
      }

      // Temporary logging to diagnose https://github.com/vector-im/element-web/issues/4307
      console.log("RVS update:", newState.roomId, newState.roomAlias, "loading?", newState.roomLoading, "joining?", newState.joining, "initial?", initial, "shouldPeek?", newState.shouldPeek);

      // NB: This does assume that the roomID will not change for the lifetime of
      // the RoomView instance
      if (initial) {
        newState.room = this.context.getRoom(newState.roomId);
        if (newState.room) {
          newState.showApps = this.shouldShowApps(newState.room);
          this.onRoomLoaded(newState.room);
        }
      }
      if (this.state.roomId === null && newState.roomId !== null) {
        // Get the scroll state for the new room

        // If an event ID wasn't specified, default to the one saved for this room
        // in the scroll state store. Assume initialEventPixelOffset should be set.
        if (!newState.initialEventId) {
          const roomScrollState = stores_RoomScrollStateStore.getScrollState(newState.roomId);
          if (roomScrollState) {
            newState.initialEventId = roomScrollState.focussedEvent;
            newState.initialEventPixelOffset = roomScrollState.pixelOffset;
          } else if (newState.room) {
            // const room = newState.room as Room;
            // const readMarker = room.getAccountData("m.fully_read");
            // if(readMarker){
            //     newState.initialEventId = readMarker.getContent().event_id;
            // }else{
            //     const myUserId = this.context.getUserId()
            //     const readEventId = room.getEventReadUpTo(
            //         myUserId,
            //         false,
            //     )
            //     if(readEventId){
            //         newState.initialEventId = readEventId;
            //     }
            // }
          }
        }
      }

      // Clear the search results when clicking a search result (which changes the
      // currently scrolled to event, this.state.initialEventId).
      if (this.state.initialEventId !== newState.initialEventId) {
        newState.searchResults = null;
      }
      this.setState(newState);
      // At this point, newState.roomId could be null (e.g. the alias might not
      // have been resolved yet) so anything called here must handle this case.

      // We pass the new state into this function for it to read: it needs to
      // observe the new state but we don't want to put it in the setState
      // callback because this would prevent the setStates from being batched,
      // ie. cause it to render RoomView twice rather than the once that is necessary.
      if (initial) {
        this.setupRoom(newState.room, newState.roomId, newState.joining, newState.shouldPeek);
      }
    });
    (0,defineProperty/* default */.Z)(this, "getRoomId", () => {
      // According to `onRoomViewStoreUpdate`, `state.roomId` can be null
      // if we have a room alias we haven't resolved yet. To work around this,
      // first we'll try the room object if it's there, and then fallback to
      // the bare room ID. (We may want to update `state.roomId` after
      // resolving aliases, so we could always trust it.)
      return this.state.room ? this.state.room.roomId : this.state.roomId;
    });
    (0,defineProperty/* default */.Z)(this, "onWidgetEchoStoreUpdate", () => {
      if (!this.state.room) return;
      this.setState({
        hasPinnedWidgets: WidgetLayoutStore/* WidgetLayoutStore */.z3.instance.getContainerWidgets(this.state.room, WidgetLayoutStore/* Container */.W2.Top).length > 0,
        showApps: this.shouldShowApps(this.state.room)
      });
    });
    (0,defineProperty/* default */.Z)(this, "onWidgetLayoutChange", () => {
      this.onWidgetEchoStoreUpdate(); // we cheat here by calling the thing that matters
    });
    (0,defineProperty/* default */.Z)(this, "onUserScroll", () => {
      if (this.state.initialEventId && this.state.isInitialEventHighlighted) {
        dispatcher/* default */.ZP.dispatch({
          action: "view_room",
          room_id: this.state.room.roomId,
          event_id: this.state.initialEventId,
          highlighted: false,
          replyingToEvent: this.state.replyToEvent
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onRightPanelStoreUpdate", () => {
      this.setState({
        showRightPanel: RightPanelStore/* default */.Z.getSharedInstance().isOpenForRoom,
        forwardPhase: RightPanelStore/* default */.Z.getSharedInstance().forwardPhase
      });
    });
    (0,defineProperty/* default */.Z)(this, "onPageUnload", event => {
      if (ContentMessages/* default */.ZP.sharedInstance().getCurrentUploads().length > 0) {
        return event.returnValue = (0,languageHandler._t)("You seem to be uploading files, are you sure you want to quit?");
      } else if (this.getCallForRoom() && this.state.callState !== "ended") {
        return event.returnValue = (0,languageHandler._t)("You seem to be in a call, are you sure you want to quit?");
      }
    });
    (0,defineProperty/* default */.Z)(this, "onReactKeyDown", ev => {
      let handled = false;
      const action = (0,KeyBindingsManager/* getKeyBindingsManager */.zL)().getRoomAction(ev);
      switch (action) {
        case KeyBindingsManager/* RoomAction */.P1.DismissReadMarker:
          this.messagePanel.forgetReadMarker();
          this.jumpToLiveTimeline();
          handled = true;
          break;
        case KeyBindingsManager/* RoomAction */.P1.JumpToOldestUnread:
          this.jumpToReadMarker();
          handled = true;
          break;
        case KeyBindingsManager/* RoomAction */.P1.UploadFile:
          dispatcher/* default */.ZP.dispatch({
            action: "upload_file"
          }, true);
          handled = true;
          break;
      }
      if (handled) {
        ev.stopPropagation();
        ev.preventDefault();
      }
    });
    (0,defineProperty/* default */.Z)(this, "onAction", payload => {
      var _this$messagePanel2;
      switch (payload.action) {
        case "message_sent":
          this.checkDesktopNotifications();
          break;
        case "post_sticker_message":
          this.injectSticker(payload.data.content.url, payload.data.content.info, payload.data.description || payload.data.name);
          break;
        case "picture_snapshot":
          ContentMessages/* default */.ZP.sharedInstance().sendContentListToRoom([payload.file], this.state.room.roomId, this.context);
          break;
        case "notifier_enabled":
        case actions/* Action */.a.UploadStarted:
        case actions/* Action */.a.UploadFinished:
        case actions/* Action */.a.UploadCanceled:
          this.forceUpdate();
          break;
        case "call_state":
          {
            // don't filter out payloads for room IDs other than props.room because
            // we may be interested in the conf 1:1 room

            if (!payload.room_id) {
              return;
            }
            const call = this.getCallForRoom();
            this.setState({
              callState: call ? call.state : null
            });
            break;
          }
        case "appsDrawer":
          this.setState({
            showApps: payload.show
          });
          break;
        case "changeP2PModalType":
          // eslint-disable-next-line no-case-declarations
          const otherP2P = localStorage.getItem(`OTHER-P2P-${payload.roomId}`);
          // eslint-disable-next-line no-case-declarations
          const myP2P = localStorage.getItem(`MY-P2P-${payload.roomId}`);
          if (!myP2P && !otherP2P) {
            this.setState({
              P2PModalType: 0,
              P2PModalInfo: null
            });
          }
          if (myP2P) {
            this.setState({
              P2PModalType: 0,
              P2PModalInfo: null
            });
          }
          if (otherP2P) {
            const _JSON$parse = JSON.parse(otherP2P),
              {
                type
              } = _JSON$parse,
              other = (0,objectWithoutProperties/* default */.Z)(_JSON$parse, _excluded);
            if (type === "P2P Invite") {
              this.setState({
                P2PModalType: 1,
                P2PModalInfo: other
              });
            }
            if (type === "P2P Accept") {
              this.setState({
                P2PModalType: 2,
                P2PModalInfo: other
              });
            }
          }
          break;
        case "reply_to_event":
          if (this.state.searchResults && payload.event.getRoomId() === this.state.roomId && !this.unmounted) {
            this.onCancelSearchClick();
          }
          break;
        case "quote":
          if (this.state.searchResults) {
            const roomId = payload.event.getRoomId();
            if (roomId === this.state.roomId) {
              this.onCancelSearchClick();
            }
            setImmediate(() => {
              dispatcher/* default */.ZP.dispatch({
                action: "view_room",
                room_id: roomId,
                deferred_action: payload
              });
            });
          }
          break;
        case "sync_state":
          if (!this.state.matrixClientIsReady) {
            this.setState({
              matrixClientIsReady: this.context && this.context.isInitialSyncComplete()
            }, () => {
              // send another "initial" RVS update to trigger peeking if needed
              this.onRoomViewStoreUpdate(true);
            });
          }
          break;
        // case "focus_search":
        //     this.onSearchClick();
        //     break;

        case "edit_event":
          {
            const editState = payload.event ? new EditorStateTransfer(payload.event) : null;
            this.setState({
              editState
            }, () => {
              if (payload.event) {
                var _this$messagePanel;
                (_this$messagePanel = this.messagePanel) === null || _this$messagePanel === void 0 ? void 0 : _this$messagePanel.scrollToEventIfNeeded(payload.event.getId());
              }
            });
            break;
          }
        case actions/* Action */.a.ComposerInsert:
          {
            // re-dispatch to the correct composer
            dispatcher/* default */.ZP.dispatch(RoomView_objectSpread(RoomView_objectSpread({}, payload), {}, {
              action: this.state.editState ? "edit_composer_insert" : "send_composer_insert"
            }));
            break;
          }
        case actions/* Action */.a.FocusAComposer:
          {
            // re-dispatch to the correct composer
            dispatcher/* default */.ZP.fire(this.state.editState ? actions/* Action */.a.FocusEditMessageComposer : actions/* Action */.a.FocusSendMessageComposer);
            break;
          }
        case "scroll_to_bottom":
          (_this$messagePanel2 = this.messagePanel) === null || _this$messagePanel2 === void 0 ? void 0 : _this$messagePanel2.jumpToLiveTimeline();
          break;
        case "signal_level_updated":
          {
            console.log("in RoomStatusBar roomview=", payload);
            const isLost = payload.signalLevel === "100" ? true : false;
            this.setState({
              isSignalLoss: isLost
            });
            break;
          }
        case "change_recommendtion_right_panel":
          this.setState({
            rightPanel: /*#__PURE__*/react.createElement(RightPanel/* default */.Z, {
              room: null
              // user={detail.data?.user}
              ,
              resizeNotifier: this.props.resizeNotifier
              // recommendation={detail}
              ,
              onClose: this.onClose
            })
          });
          break;
      }
    });
    (0,defineProperty/* default */.Z)(this, "onClose", () => {
      this.setState({
        rightPanel: null
      });
    });
    (0,defineProperty/* default */.Z)(this, "getSignalLevel", async () => {
      const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
      try {
        const res = await client.getSignalLevel();
        const {
          level
        } = JSON.parse(res || "");
        if (level) {
          const isLost = level === "100" ? true : false;
          this.setState({
            isSignalLoss: isLost
          });
        }
      } catch (error) {
        console.log("get signal level error:", error);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onRoomTimeline", (ev, room, toStartOfTimeline, removed, data) => {
      var _this$state$room;
      if (this.unmounted) return;

      // ignore events for other rooms
      if (!room || room.roomId !== ((_this$state$room = this.state.room) === null || _this$state$room === void 0 ? void 0 : _this$state$room.roomId)) return;

      // ignore events from filtered timelines
      if (data.timeline.getTimelineSet() !== room.getUnfilteredTimelineSet()) return;
      if (ev.getType() === "org.matrix.room.preview_urls") {
        this.updatePreviewUrlVisibility(room);
      }
      if (ev.getType() === "m.room.encryption") {
        this.updateE2EStatus(room);
      }

      // ignore anything but real-time updates at the end of the room:
      // updates from pagination will happen when the paginate completes.
      if (toStartOfTimeline || !data || !data.liveEvent) return;

      // no point handling anything while we're waiting for the join to finish:
      // we'll only be showing a spinner.
      if (this.state.joining) return;
      if (!ev.isBeingDecrypted() && !ev.isDecryptionFailure()) {
        this.handleEffects(ev);
      }
      if (ev.getSender() !== this.context.credentials.userId) {
        // update unread count when scrolled up
        if (!this.state.searchResults && this.state.atEndOfLiveTimeline) {
          // no change
        } else if (!(0,shouldHideEvent/* default */.Z)(ev, this.state)) {
          this.setState((state, props) => {
            return {
              numUnreadMessages: state.numUnreadMessages + 1
            };
          });
        }
      }
    });
    (0,defineProperty/* default */.Z)(this, "onEventDecrypted", ev => {
      if (!this.state.room || !this.state.matrixClientIsReady) return; // not ready at all
      if (ev.getRoomId() !== this.state.room.roomId) return; // not for us
      if (ev.isDecryptionFailure()) return;
      this.handleEffects(ev);
    });
    (0,defineProperty/* default */.Z)(this, "handleEffects", ev => {
      const notifState = RoomNotificationStateStore/* RoomNotificationStateStore */.v.instance.getRoomState(this.state.room);
      if (!notifState.isUnread) return;
      effects/* CHAT_EFFECTS */.b.forEach(effect => {
        if ((0,effects_utils/* containsEmoji */.R)(ev.getContent(), effect.emojis) || ev.getContent().msgtype === effect.msgType) {
          dispatcher/* default */.ZP.dispatch({
            action: `effects.${effect.command}`
          });
        }
      });
    });
    (0,defineProperty/* default */.Z)(this, "onRoomName", room => {
      if (this.state.room && room.roomId == this.state.room.roomId) {
        this.forceUpdate();
      }
    });
    (0,defineProperty/* default */.Z)(this, "onKeyBackupStatus", () => {
      // Key backup status changes affect whether the in-room recovery
      // reminder is displayed.
      this.forceUpdate();
    });
    (0,defineProperty/* default */.Z)(this, "canResetTimeline", () => {
      if (!this.messagePanel) {
        return true;
      }
      return this.messagePanel.canResetTimeline();
    });
    // called when state.room is first initialised (either at initial load,
    // after a successful peek, or after we join the room).
    (0,defineProperty/* default */.Z)(this, "onRoomLoaded", room => {
      if (this.unmounted) return;
      // Attach a widget store listener only when we get a room
      WidgetLayoutStore/* WidgetLayoutStore */.z3.instance.on(WidgetLayoutStore/* WidgetLayoutStore */.z3.emissionForRoom(room), this.onWidgetLayoutChange);
      this.onWidgetLayoutChange(); // provoke an update

      this.calculatePeekRules(room);
      this.updatePreviewUrlVisibility(room);
      this.loadMembersIfJoined(room);
      this.calculateRecommendedVersion(room);
      this.updateE2EStatus(room);
      this.updatePermissions(room);
      this.checkWidgets(room);
      if (room.hasSpaceParent()) {
        var _room$getParentRoom;
        (_room$getParentRoom = room.getParentRoom()) === null || _room$getParentRoom === void 0 ? void 0 : _room$getParentRoom.loopMembersIfNeeded();
      }
    });
    (0,defineProperty/* default */.Z)(this, "onRoom", room => {
      if (!room || room.roomId !== this.state.roomId) {
        return;
      }

      // Detach the listener if the room is changing for some reason
      if (this.state.room) {
        WidgetLayoutStore/* WidgetLayoutStore */.z3.instance.off(WidgetLayoutStore/* WidgetLayoutStore */.z3.emissionForRoom(this.state.room), this.onWidgetLayoutChange);
      }
      this.setState({
        room: room
      }, () => {
        this.onRoomLoaded(room);
      });
    });
    (0,defineProperty/* default */.Z)(this, "onDeviceVerificationChanged", (userId, device) => {
      const room = this.state.room;
      if (!room.currentState.getMember(userId)) {
        return;
      }
      this.updateE2EStatus(room);
    });
    (0,defineProperty/* default */.Z)(this, "onUserVerificationChanged", (userId, trustStatus) => {
      const room = this.state.room;
      if (!room || !room.currentState.getMember(userId)) {
        return;
      }
      this.updateE2EStatus(room);
    });
    (0,defineProperty/* default */.Z)(this, "onCrossSigningKeysChanged", () => {
      const room = this.state.room;
      if (room) {
        this.updateE2EStatus(room);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onAccountData", event => {
      const type = event.getType();
      if ((type === "org.matrix.preview_urls" || type === "im.vector.web.settings") && this.state.room) {
        // non-e2ee url previews are stored in legacy event type `org.matrix.room.preview_urls`
        this.updatePreviewUrlVisibility(this.state.room);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onRoomAccountData", (event, room) => {
      if (room.roomId == this.state.roomId) {
        const type = event.getType();
        if (type === "org.matrix.room.preview_urls" || type === "im.vector.web.settings") {
          // non-e2ee url previews are stored in legacy event type `org.matrix.room.preview_urls`
          this.updatePreviewUrlVisibility(room);
        } else if (type === "m.tag" || this.state.lastTag.includes(models/* DefaultTagID */.lL.Invisible) || RoomListStore/* default */.ZP.instance.getTagsForRoom(room).includes(models/* DefaultTagID */.lL.Invisible)) {
          this.forceUpdate();
        }
      }
    });
    (0,defineProperty/* default */.Z)(this, "onRoomStateEvents", (ev, state) => {
      // ignore if we don't have a room yet
      if (!this.state.room || this.state.room.roomId !== state.roomId) {
        return;
      }
      this.updatePermissions(this.state.room);
    });
    (0,defineProperty/* default */.Z)(this, "onRoomStateMember", (ev, state, member) => {
      // ignore if we don't have a room yet
      if (!this.state.room) {
        return;
      }

      // ignore members in other rooms
      if (member.roomId !== this.state.room.roomId) {
        return;
      }
      this.updateRoomMembers();
    });
    (0,defineProperty/* default */.Z)(this, "onMyMembership", (room, membership, oldMembership) => {
      var _this$context$getRoom, _this$context;
      // when sync trigger event of room.member.leave
      // new logic, when myMember upgraded, check if leave
      // TODO: when current room id === room.id. then invoke dispatch;

      if (((_this$context$getRoom = (_this$context = this.context).getRoomId) === null || _this$context$getRoom === void 0 ? void 0 : _this$context$getRoom.call(_this$context)) === room.roomId && (room === null || room === void 0 ? void 0 : room.getMyMembership()) === "leave") {
        dispatcher/* default */.ZP.dispatch({
          action: "view_home_page"
        });
        return;
      }
      if (room.roomId === this.state.roomId) {
        this.forceUpdate();
        this.loadMembersIfJoined(room);
        this.updatePermissions(room);
      }
    });
    // rate limited because a power level change will emit an event for every member in the room.
    (0,defineProperty/* default */.Z)(this, "updateRoomMembers", (0,throttle/* default */.Z)(() => {
      this.updateDMState();
      this.updateE2EStatus(this.state.room);
    }, 500, {
      leading: true,
      trailing: true
    }));
    (0,defineProperty/* default */.Z)(this, "onSearchResultsFillRequest", backwards => {
      if (!backwards) {
        return Promise.resolve(false);
      }
      if (this.state.searchResults.next_batch) {
        debuglog("requesting more search results");
        const searchPromise = searchPagination(this.state.searchResults);
        return this.handleSearchResult(searchPromise);
      } else {
        debuglog("no more search results");
        return Promise.resolve(false);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onInviteButtonClick", () => {
      // call AddressPickerDialog
      dispatcher/* default */.ZP.dispatch({
        action: "view_invite",
        roomId: this.state.room.roomId
      });
    });
    (0,defineProperty/* default */.Z)(this, "onJoinButtonClicked", (roomId, outsideRoom, inviteSender, squadId) => {
      //done firebase : room_invite_accept
      (0,firebase_analytics/* logEvent */.K)(firebase_analytics/* analytics */.c, "room_invite_accept", RoomView_objectSpread(RoomView_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()), {}, {
        room_id: this.state.roomId.split(":")[0],
        invite_user_id: inviteSender || "unknown",
        invite_room_id: this.state.roomId.split(":")[0]
      }));
      // If the user is a ROU, allow them to transition to a PWLU
      if (this.context && this.context.isGuest()) {
        // Join this room once the user has registered and logged in
        // (If we failed to peek, we may not have a valid room object.)
        dispatcher/* default */.ZP.dispatch({
          action: "do_after_sync_prepared",
          deferred_action: {
            action: "view_room",
            room_id: this.getRoomId()
          }
        });
        dispatcher/* default */.ZP.dispatch({
          action: "require_registration"
        });
      } else {
        return Promise.resolve().then(() => {
          var _this$props$threepidI;
          const signUrl = (_this$props$threepidI = this.props.threepidInvite) === null || _this$props$threepidI === void 0 ? void 0 : _this$props$threepidI.signUrl;
          dispatcher/* default */.ZP.dispatch({
            action: actions/* Action */.a.JoinRoom,
            roomId: (outsideRoom ? roomId : "") || this.getRoomId(),
            outsideRoom,
            opts: {
              inviteSignUrl: signUrl,
              squadId
            },
            _type: "unknown",
            // TODO: instrumentation
            inviteSender: inviteSender
          });
          return Promise.resolve({
            roomId: (outsideRoom ? roomId : "") || this.getRoomId()
          });
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onMessageListScroll", ev => {
      var _this$state$room2, _this$state$room2$cur, _this$state$room2$cur2, _this$state$room2$cur3;
      const {
        type: roomTypeOfCreateEvent
      } = ((_this$state$room2 = this.state.room) === null || _this$state$room2 === void 0 ? void 0 : (_this$state$room2$cur = _this$state$room2.currentState) === null || _this$state$room2$cur === void 0 ? void 0 : (_this$state$room2$cur2 = _this$state$room2$cur.getStateEvents) === null || _this$state$room2$cur2 === void 0 ? void 0 : (_this$state$room2$cur3 = _this$state$room2$cur2.call(_this$state$room2$cur, _types_event/* EventType */.tw.RoomCreate, "")) === null || _this$state$room2$cur3 === void 0 ? void 0 : _this$state$room2$cur3.getContent()) || {};
      const isNotificationRoom = roomTypeOfCreateEvent === "m.notification";
      if (isNotificationRoom) {
        return;
      }
      if (this.messagePanel.isAtEndOfLiveTimeline()) {
        this.setState({
          numUnreadMessages: 0,
          atEndOfLiveTimeline: true
        });
      } else {
        this.setState({
          atEndOfLiveTimeline: false
        });
      }
      this.updateTopUnreadMessagesBar();
    });
    (0,defineProperty/* default */.Z)(this, "onDragEnter", ev => {
      ev.stopPropagation();
      ev.preventDefault();
      // We always increment the counter no matter the types, because dragging is
      // still happening. If we didn't, the drag counter would get out of sync.
      this.setState({
        dragCounter: this.state.dragCounter + 1
      });

      // See:
      // https://docs.w3cub.com/dom/datatransfer/types
      // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types#file
      if (ev.dataTransfer.types.includes("Files") || ev.dataTransfer.types.includes("application/x-moz-file")) {
        this.setState({
          draggingFile: true
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onDragLeave", ev => {
      ev.stopPropagation();
      ev.preventDefault();
      this.setState({
        dragCounter: this.state.dragCounter - 1
      });
      if (this.state.dragCounter === 0) {
        this.setState({
          draggingFile: false
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onDragOver", ev => {
      ev.stopPropagation();
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "none";

      // See:
      // https://docs.w3cub.com/dom/datatransfer/types
      // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types#file
      if (ev.dataTransfer.types.includes("Files") || ev.dataTransfer.types.includes("application/x-moz-file")) {
        ev.dataTransfer.dropEffect = "copy";
      }
    });
    (0,defineProperty/* default */.Z)(this, "onDrop", ev => {
      ev.stopPropagation();
      ev.preventDefault();
      const {
        room
      } = this.state;
      if (room) {
        const slowModeCounting = room.slowModeCounting;
        const [canManageMessage] = PermissionStore/* default */.ZP.hasPermission(room.roomId, [PermissionStore/* PermissionMap */.$W.RoomManageMessage]);
        if (slowModeCounting && !canManageMessage) {
          dist.SdMessage.warning("Sending too quickly");
          this.setState({
            draggingFile: false
          });
          return;
        }
      }
      ContentMessages/* default */.ZP.sharedInstance().sendContentListToRoom(ev.dataTransfer.files, this.state.room.roomId, this.context);
      dispatcher/* default */.ZP.fire(actions/* Action */.a.FocusSendMessageComposer);
      this.setState({
        draggingFile: false,
        dragCounter: this.state.dragCounter - 1
      });
    });
    (0,defineProperty/* default */.Z)(this, "onSearch", (term, scope) => {
      this.setState({
        searchTerm: term,
        searchScope: scope,
        searchResults: {},
        searchHighlights: []
      });

      // if we already have a search panel, we need to tell it to forget
      // about its scroll state.
      if (this.searchResultsPanel.current) {
        this.searchResultsPanel.current.resetScrollState();
      }

      // make sure that we don't end up showing results from
      // an aborted search by keeping a unique id.
      //
      // todo: should cancel any previous search requests.
      this.searchId = new Date().getTime();
      let roomId;
      if (scope === SearchScope.Room) roomId = this.state.room.roomId;
      debuglog("sending search request");
      const searchPromise = eventSearch(term, roomId);
      this.handleSearchResult(searchPromise);
    });
    (0,defineProperty/* default */.Z)(this, "onCallPlaced", type => {
      dispatcher/* default */.ZP.dispatch({
        action: "place_call",
        type: type,
        room_id: this.state.room.roomId
      });
    });
    (0,defineProperty/* default */.Z)(this, "onSettingsClick", () => {
      dispatcher/* default */.ZP.dispatch({
        action: "open_room_settings"
      });
    });
    (0,defineProperty/* default */.Z)(this, "onAppsClick", () => {
      dispatcher/* default */.ZP.dispatch({
        action: "appsDrawer",
        show: !this.state.showApps
      });
    });
    (0,defineProperty/* default */.Z)(this, "onForgetClick", () => {
      dispatcher/* default */.ZP.dispatch({
        action: "forget_room",
        room_id: this.state.room.roomId
      });
    });
    (0,defineProperty/* default */.Z)(this, "onRejectButtonClicked", inviteSender => {
      this.setState({
        rejecting: true
      });
      //done firebase : room_invite_reject
      (0,firebase_analytics/* logEvent */.K)(firebase_analytics/* analytics */.c, "room_invite_reject", RoomView_objectSpread(RoomView_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()), {}, {
        invite_user_id: inviteSender || "unknown",
        room_id: this.state.roomId.split(":")[0]
      }));
      return this.context.leave(this.state.roomId).then(() => {
        // done firebase : room_invite_reject_success
        (0,firebase_analytics/* logEvent */.K)(firebase_analytics/* analytics */.c, "room_invite_reject_success", RoomView_objectSpread(RoomView_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()), {}, {
          invite_user_id: inviteSender || "unknown",
          room_id: this.state.roomId.split(":")[0]
        }));
        dispatcher/* default */.ZP.dispatch({
          action: "view_home_page"
        });
        this.setState({
          rejecting: false
        });
      }, error => {
        const msg1 = (0,languageHandler._t)("Oops! Something went wrong with the server. Please try again later.");
        const msg2 = (0,languageHandler._t)("Oops! Your request is invalid. Please try again.");
        const msg = (error === null || error === void 0 ? void 0 : error.status) === 403 ? msg2 : msg1;
        Modal/* default */.Z.createTrackedDialog("Failed to reject invite", "", ErrorDialog/* default */.Z, {
          title: (0,languageHandler._t)("Failed to reject invite"),
          description: msg,
          onFinished: () => {
            this.setState({
              rejecting: false
            });
          }
        });

        // done firebase : room_invite_reject_failed
        (0,firebase_analytics/* logEvent */.K)(firebase_analytics/* analytics */.c, "room_invite_reject_failed", RoomView_objectSpread(RoomView_objectSpread({}, (0,commonPointParams/* getCommonPointParams */.I)()), {}, {
          invite_user_id: inviteSender || "unknown",
          room_id: this.state.roomId.split(":")[0]
        }));
        this.setState({
          rejecting: false,
          rejectError: error
        });
      }).finally(() => {
        this.setState({
          rejecting: false
        });
      });
    });
    (0,defineProperty/* default */.Z)(this, "onRejectAndIgnoreClick", async () => {
      this.setState({
        rejecting: true
      });
      try {
        const myMember = this.state.room.getMember(this.context.getUserId());
        const inviteEvent = myMember.events.member;
        const ignoredUsers = this.context.getIgnoredUsers();
        ignoredUsers.push(inviteEvent.getSender()); // de-duped internally in the js-sdk
        await this.context.setIgnoredUsers(ignoredUsers);
        await this.context.leave(this.state.roomId);
        dispatcher/* default */.ZP.dispatch({
          action: "view_home_page"
        });
        this.setState({
          rejecting: false
        });
      } catch (error) {
        console.error("Failed to reject invite: %s", error);
        const msg = error.message ? error.message : JSON.stringify(error);
        Modal/* default */.Z.createTrackedDialog("Failed to reject invite", "", ErrorDialog/* default */.Z, {
          title: (0,languageHandler._t)("Failed to reject invite"),
          description: msg
        });
        this.setState({
          rejecting: false,
          rejectError: error
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onRejectThreepidInviteButtonClicked", () => {
      // We can reject 3pid invites in the same way that we accept them,
      // using /leave rather than /join. In the short term though, we
      // just ignore them.
      // https://github.com/vector-im/vector-web/issues/1134
      dispatcher/* default */.ZP.fire(actions/* Action */.a.ViewRoomDirectory);
    });
    (0,defineProperty/* default */.Z)(this, "onSearchClick", () => {
      this.setState({
        searching: !this.state.searching
      });
    });
    (0,defineProperty/* default */.Z)(this, "onCancelSearchClick", () => {
      this.setState({
        searching: false,
        searchResults: null
      });
    });
    // jump down to the bottom of this room, where new events are arriving
    (0,defineProperty/* default */.Z)(this, "jumpToLiveTimeline", () => {
      if (this.state.initialEventId && this.state.isInitialEventHighlighted) {
        // If we were viewing a highlighted event, firing view_room without
        // an event will take care of both clearing the URL fragment and
        // jumping to the bottom
        dispatcher/* default */.ZP.dispatch({
          action: "view_room",
          room_id: this.state.room.roomId
        });
      } else {
        // Otherwise we have to jump manually
        this.messagePanel.jumpToLiveTimeline();
        dispatcher/* default */.ZP.fire(actions/* Action */.a.FocusSendMessageComposer);
      }
    });
    // jump up to wherever our read marker is
    (0,defineProperty/* default */.Z)(this, "jumpToReadMarker", () => {
      var _this$messagePanel3;
      (_this$messagePanel3 = this.messagePanel) === null || _this$messagePanel3 === void 0 ? void 0 : _this$messagePanel3.jumpToReadMarker();
    });
    // update the read marker to match the read-receipt
    (0,defineProperty/* default */.Z)(this, "forgetReadMarker", ev => {
      ev.stopPropagation();
      this.messagePanel.forgetReadMarker();
    });
    // decide whether or not the top 'unread messages' bar should be shown
    (0,defineProperty/* default */.Z)(this, "updateTopUnreadMessagesBar", () => {
      if (!this.messagePanel) {
        return;
      }
      const showBar = this.messagePanel.canJumpToReadMarker();
      if (this.state.showTopUnreadMessagesBar != showBar) {
        this.setState({
          showTopUnreadMessagesBar: showBar
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onReadMarkerUpdated", () => {
      if (!this.messagePanel) {
        return;
      }
      const showBar = this.messagePanel.canJumpToReadMarker();
      if (showBar) {
        this.messagePanel.jumpToReadMarker();
      }
    });
    (0,defineProperty/* default */.Z)(this, "onResize", () => {
      // It seems flexbox doesn't give us a way to constrain the auxPanel height to have
      // a minimum of the height of the video element, whilst also capping it from pushing out the page
      // so we have to do it via JS instead.  In this implementation we cap the height by putting
      // a maxHeight on the underlying remote video tag.

      // header + footer + status + give us at least 120px of scrollback at all times.
      let auxPanelMaxHeight = UIStore/* default */.Z.instance.windowHeight - (54 +
      // height of RoomHeader
      36 +
      // height of the status area
      51 +
      // minimum height of the message composer
      120); // amount of desired scrollback

      // XXX: this is a bit of a hack and might possibly cause the video to push out the page anyway
      // but it's better than the video going missing entirely
      if (auxPanelMaxHeight < 50) auxPanelMaxHeight = 50;
      if (this.state.auxPanelMaxHeight !== auxPanelMaxHeight) {
        this.setState({
          auxPanelMaxHeight
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onStatusBarVisible", () => {
      if (this.unmounted || this.state.statusBarVisible) return;
      this.setState({
        statusBarVisible: true
      });
    });
    (0,defineProperty/* default */.Z)(this, "onStatusBarHidden", () => {
      // This is currently not desired as it is annoying if it keeps expanding and collapsing
      if (this.unmounted || !this.state.statusBarVisible) return;
      this.setState({
        statusBarVisible: false
      });
    });
    /**
     * called by the parent component when PageUp/Down/etc is pressed.
     *
     * We pass it down to the scroll panel.
     */
    (0,defineProperty/* default */.Z)(this, "handleScrollKey", ev => {
      let panel;
      if (this.searchResultsPanel.current) {
        panel = this.searchResultsPanel.current;
      } else if (this.messagePanel) {
        panel = this.messagePanel;
      }
      if (panel) {
        panel.handleScrollKey(ev);
      }
    });
    // this has to be a proper method rather than an unnamed function,
    // otherwise react calls it with null on each update.
    (0,defineProperty/* default */.Z)(this, "gatherTimelinePanelRef", r => {
      this.messagePanel = r;
    });
    (0,defineProperty/* default */.Z)(this, "onFollowClicked", async () => {
      const modal = Modal/* default */.Z.createDialog(SelectFollowRoomDialog, {}, "mx_SelectFollowRoomDialog_wrapper");
      const [shouldCreate,, roomId] = await modal.finished;
      if (shouldCreate && this.state.room) {
        try {
          await this.context.followRoom(this.state.room.roomId, roomId);
          dist.SdMessage.success("Followed successfully");
        } catch (error) {
          dist.SdMessage.error(error.message);
        }
      }
    });
    (0,defineProperty/* default */.Z)(this, "onHiddenHighlightsClick", () => {
      const oldRoom = this.getOldRoom();
      if (!oldRoom) return;
      dispatcher/* default */.ZP.dispatch({
        action: "view_room",
        room_id: oldRoom.roomId
      });
    });
    const llMembers = this.context.hasLazyLoadMembersEnabled();
    this.state = {
      roomId: null,
      roomLoading: true,
      peekLoading: false,
      shouldPeek: true,
      membersLoaded: !llMembers,
      numUnreadMessages: 0,
      draggingFile: false,
      searching: false,
      searchResults: null,
      callState: null,
      guestsCanJoin: false,
      canPeek: false,
      showApps: false,
      isPeeking: false,
      showRightPanel: RightPanelStore/* default */.Z.getSharedInstance().isOpenForRoom,
      forwardPhase: RightPanelStore/* default */.Z.getSharedInstance().forwardPhase,
      joining: false,
      atEndOfLiveTimeline: true,
      atEndOfLiveTimelineInit: false,
      showTopUnreadMessagesBar: false,
      statusBarVisible: false,
      canReact: false,
      canReply: false,
      // layout: Layout.Bubble, // SettingsStore.getValue("layout"),
      layout: SettingsStore/* default */.C.getValue("bubbleMode") ? Layout/* Layout */.A.Bubble : Layout/* Layout */.A.Group,
      // SettingsStore.getValue("layout"),
      lowBandwidth: SettingsStore/* default */.C.getValue("lowBandwidth"),
      alwaysShowTimestamps: SettingsStore/* default */.C.getValue("alwaysShowTimestamps"),
      showTwelveHourTimestamps: SettingsStore/* default */.C.getValue("showTwelveHourTimestamps"),
      readMarkerInViewThresholdMs: SettingsStore/* default */.C.getValue("readMarkerInViewThresholdMs"),
      readMarkerOutOfViewThresholdMs: SettingsStore/* default */.C.getValue("readMarkerOutOfViewThresholdMs"),
      showHiddenEventsInTimeline: SettingsStore/* default */.C.getValue("showHiddenEventsInTimeline"),
      showMessageBodyBackground: SettingsStore/* default */.C.getValue("showMessageBodyBackground"),
      showReadReceipts: true,
      showRedactions: true,
      showJoinLeaves: true,
      showAvatarChanges: true,
      showDisplaynameChanges: true,
      matrixClientIsReady: this.context && this.context.isInitialSyncComplete(),
      dragCounter: 0,
      P2PModalType: 0,
      P2PModalInfo: null,
      lastTag: "",
      showAudioPlayerCard: false,
      // is show audio player card
      actInfo: null,
      // current act
      audioSource: undefined,
      isSignalLoss: false,
      dappItems: [],
      rightPanel: null
    };
    this.dispatcherRef = dispatcher/* default */.ZP.register(this.onAction);
    this.context.on("Room", this.onRoom);
    this.context.on("Room.timeline", this.onRoomTimeline);
    this.context.on("Room.name", this.onRoomName);
    this.context.on("Room.accountData", this.onRoomAccountData);
    this.context.on("RoomState.events", this.onRoomStateEvents);
    this.context.on("RoomState.members", this.onRoomStateMember);
    this.context.on("Room.myMembership", this.onMyMembership);
    this.context.on("accountData", this.onAccountData);
    this.context.on("crypto.keyBackupStatus", this.onKeyBackupStatus);
    this.context.on("deviceVerificationChanged", this.onDeviceVerificationChanged);
    this.context.on("userTrustStatusChanged", this.onUserVerificationChanged);
    this.context.on("crossSigning.keysChanged", this.onCrossSigningKeysChanged);
    this.context.on("Event.decrypted", this.onEventDecrypted);
    // Start listening for RoomViewStore updates
    this.roomStoreToken = RoomViewStore/* default */.Z.addListener(this.onRoomViewStoreUpdate);
    this.rightPanelStoreToken = RightPanelStore/* default */.Z.getSharedInstance().addListener(this.onRightPanelStoreUpdate);
    WidgetEchoStore/* default */.Z.on(AsyncStore/* UPDATE_EVENT */.aY, this.onWidgetEchoStoreUpdate);
    WidgetStore/* default */.Z.instance.on(AsyncStore/* UPDATE_EVENT */.aY, this.onWidgetStoreUpdate);
    this.settingWatchers = [
    // SettingsStore.watchSetting("layout", null, (...[, , , value]) =>
    //     this.setState({ layout: value as Layout }),
    // ),
    SettingsStore/* default */.C.watchSetting("bubbleMode", null, (...[,,, value]) => this.setState({
      layout: value ? Layout/* Layout */.A.Bubble : Layout/* Layout */.A.Group
    })), SettingsStore/* default */.C.watchSetting("lowBandwidth", null, (...[,,, value]) => this.setState({
      lowBandwidth: value
    })), SettingsStore/* default */.C.watchSetting("alwaysShowTimestamps", null, (...[,,, value]) => this.setState({
      alwaysShowTimestamps: value
    })), SettingsStore/* default */.C.watchSetting("showTwelveHourTimestamps", null, (...[,,, value]) => this.setState({
      showTwelveHourTimestamps: value
    })), SettingsStore/* default */.C.watchSetting("readMarkerInViewThresholdMs", null, (...[,,, value]) => this.setState({
      readMarkerInViewThresholdMs: value
    })), SettingsStore/* default */.C.watchSetting("readMarkerOutOfViewThresholdMs", null, (...[,,, value]) => this.setState({
      readMarkerOutOfViewThresholdMs: value
    })), SettingsStore/* default */.C.watchSetting("showHiddenEventsInTimeline", null, (...[,,, value]) => this.setState({
      showHiddenEventsInTimeline: value
    })), SettingsStore/* default */.C.watchSetting("showMessageBodyBackground", null, (...[,,, value]) => this.setState({
      showMessageBodyBackground: value
    }))];
  }
  getPermalinkCreatorForRoom(room) {
    if (this.permalinkCreators[room.roomId]) return this.permalinkCreators[room.roomId];
    this.permalinkCreators[room.roomId] = new Permalinks/* RoomPermalinkCreator */.w6(room);
    if (this.state.room && room.roomId === this.state.room.roomId) {
      // We want to watch for changes in the creator for the primary room in the view, but
      // don't need to do so for search results.
      this.permalinkCreators[room.roomId].start();
    } else {
      this.permalinkCreators[room.roomId].load();
    }
    return this.permalinkCreators[room.roomId];
  }
  stopAllPermalinkCreators() {
    if (!this.permalinkCreators) return;
    for (const roomId of Object.keys(this.permalinkCreators)) {
      this.permalinkCreators[roomId].stop();
    }
  }
  setupRoom(room, roomId, joining, shouldPeek) {
    // if this is an unknown room then we're in one of three states:
    // - This is a room we can peek into (search engine) (we can /peek)
    // - This is a room we can publicly join or were invited to. (we can /join)
    // - This is a room we cannot join at all. (no action can help us)
    // We can't try to /join because this may implicitly accept invites (!)
    // We can /peek though. If it fails then we present the join UI. If it
    // succeeds then great, show the preview (but we still may be able to /join!).
    // Note that peeking works by room ID and room ID only, as opposed to joining
    // which must be by alias or invite wherever possible (peeking currently does
    // not work over federation).

    // NB. We peek if we have never seen the room before (i.e. js-sdk does not know
    // about it). We don't peek in the historical case where we were joined but are
    // now not joined because the js-sdk peeking API will clobber our historical room,
    // making it impossible to indicate a newly joined room.
    if (!joining && roomId) {
      if (!room && shouldPeek) {
        console.info("Attempting to peek into room %s", roomId);
        this.setState({
          peekLoading: true,
          isPeeking: true // this will change to false if peeking fails
        });

        this.context.peekInRoom(roomId).then(room => {
          if (this.unmounted) {
            return;
          }
          this.setState({
            room: room,
            peekLoading: false
          });
          this.onRoomLoaded(room);
        }).catch(err => {
          if (this.unmounted) {
            return;
          }

          // Stop peeking if anything went wrong
          this.setState({
            isPeeking: false
          });

          // This won't necessarily be a MatrixError, but we duck-type
          // here and say if it's got an 'errcode' key with the right value,
          // it means we can't peek.
          if (err.errcode === "M_GUEST_ACCESS_FORBIDDEN" || err.errcode === "M_FORBIDDEN") {
            // This is fine: the room just isn't peekable (we assume).
            this.setState({
              peekLoading: false
            });
          } else {
            throw err;
          }
        });
      } else if (room) {
        // Stop peeking because we have joined this room previously
        this.context.stopPeeking();
        this.setState({
          isPeeking: false
        });
      }
    }
  }
  shouldShowApps(room) {
    if (!BROWSER_SUPPORTS_SANDBOX || !room) return false;

    // Check if user has previously chosen to hide the app drawer for this
    // room. If so, do not show apps
    const hideWidgetDrawer = localStorage.getItem(room.roomId + "_hide_widget_drawer");

    // This is confusing, but it means to say that we default to the tray being
    // hidden unless the user clicked to open it.
    const isManuallyShown = hideWidgetDrawer === "false";
    const widgets = WidgetLayoutStore/* WidgetLayoutStore */.z3.instance.getContainerWidgets(room, WidgetLayoutStore/* Container */.W2.Top);
    return widgets.length > 0 || isManuallyShown;
  }
  getDappItemsL1() {
    const fetchDapps = async () => {
      const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
      const roomId = RoomViewStore/* default */.Z.getRoomId();
      let dappRoomType;
      if (roomId) {
        const room = MatrixClientPeg/* MatrixClientPeg */.p.get().getRoom(roomId);
        const roomType = await (room === null || room === void 0 ? void 0 : room.getRoomType());
        if (["squad", "room"].includes(roomType)) {
          dappRoomType = "squad_chat";
        } else if (roomType === "dm") {
          dappRoomType = "trusted_private_chat";
        } else {
          dappRoomType = "group_chat";
        }
      }
      try {
        const result = await MatrixClientPeg/* MatrixClientPeg */.p.getDapps(DappButtons/* DisplayPosition */.n.CHAT_BOX_L1);
        this.setState({
          dappItems: result
        });
      } catch (error) {
        this.setState({
          dappItems: []
        });
      }
    };
    fetchDapps();
  }
  componentDidMount() {
    this.onRoomViewStoreUpdate(true);
    const call = this.getCallForRoom();
    const callState = call ? call.state : null;
    this.setState({
      callState: callState
    });
    window.addEventListener("beforeunload", this.onPageUnload);
    if (this.props.resizeNotifier) {
      this.props.resizeNotifier.on("middlePanelResized", this.onResize);
    }
    this.onResize();
    this.getDappItemsL1();
    const backgroundStyle = (0,useGetThemeConfig/* getThemeBackgroundStyle */.XX)({
      type: useGetThemeConfig/* TypeEnum */.oY.BG_CHAT
    });
    this.setState({
      backgroundStyle: backgroundStyle
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.backgroundStyle && (0,objects/* objectHasDiff */.U0)((0,useGetThemeConfig/* getThemeBackgroundStyle */.XX)({
      type: useGetThemeConfig/* TypeEnum */.oY.BG_CHAT
    }), this.state.backgroundStyle)) {
      return true;
    }
    const hasPropsDiff = (0,objects/* objectHasDiff */.U0)(this.props, nextProps);
    const _this$state = this.state,
      {
        upgradeRecommendation
      } = _this$state,
      state = (0,objectWithoutProperties/* default */.Z)(_this$state, _excluded2);
    const {
        upgradeRecommendation: newUpgradeRecommendation
      } = nextState,
      newState = (0,objectWithoutProperties/* default */.Z)(nextState, _excluded3);
    const hasStateDiff = (newUpgradeRecommendation === null || newUpgradeRecommendation === void 0 ? void 0 : newUpgradeRecommendation.needsUpgrade) !== (upgradeRecommendation === null || upgradeRecommendation === void 0 ? void 0 : upgradeRecommendation.needsUpgrade) || (0,objects/* objectHasDiff */.U0)(state, newState);
    return hasPropsDiff || hasStateDiff;
  }
  componentDidUpdate() {
    if (this.roomView.current) {
      const roomView = this.roomView.current;
      if (!roomView.ondrop) {
        roomView.addEventListener("drop", this.onDrop);
        roomView.addEventListener("dragover", this.onDragOver);
        roomView.addEventListener("dragenter", this.onDragEnter);
        roomView.addEventListener("dragleave", this.onDragLeave);
      }
    }
    const backgroundStyle = (0,useGetThemeConfig/* getThemeBackgroundStyle */.XX)({
      type: useGetThemeConfig/* TypeEnum */.oY.BG_CHAT
    });
    if (this.state.backgroundStyle && (0,objects/* objectHasDiff */.U0)(backgroundStyle, this.state.backgroundStyle)) {
      this.setState({
        backgroundStyle: backgroundStyle
      });
    }

    // Note: We check the ref here with a flag because componentDidMount, despite
    // documentation, does not define our messagePanel ref. It looks like our spinner
    // in render() prevents the ref from being set on first mount, so we try and
    // catch the messagePanel when it does mount. Because we only want the ref once,
    // we use a boolean flag to avoid duplicate work.
    if (this.messagePanel && !this.state.atEndOfLiveTimelineInit) {
      this.setState({
        atEndOfLiveTimelineInit: true,
        atEndOfLiveTimeline: this.messagePanel.isAtEndOfLiveTimeline()
      });
    }
  }
  componentWillUnmount() {
    // set a boolean to say we've been unmounted, which any pending
    // promises can use to throw away their results.
    //
    // (We could use isMounted, but facebook have deprecated that.)
    this.unmounted = true;

    // update the scroll map before we get unmounted
    if (this.state.roomId) {
      stores_RoomScrollStateStore.setScrollState(this.state.roomId, this.getScrollState());
    }
    if (this.state.shouldPeek) {
      this.context.stopPeeking();
    }

    // stop tracking room changes to format permalinks
    this.stopAllPermalinkCreators();
    if (this.roomView.current) {
      // disconnect the D&D event listeners from the room view. This
      // is really just for hygiene - we're going to be
      // deleted anyway, so it doesn't matter if the event listeners
      // don't get cleaned up.
      const roomView = this.roomView.current;
      roomView.removeEventListener("drop", this.onDrop);
      roomView.removeEventListener("dragover", this.onDragOver);
      roomView.removeEventListener("dragenter", this.onDragEnter);
      roomView.removeEventListener("dragleave", this.onDragLeave);
    }
    dispatcher/* default */.ZP.unregister(this.dispatcherRef);
    if (this.context) {
      this.context.removeListener("Room", this.onRoom);
      this.context.removeListener("Room.timeline", this.onRoomTimeline);
      this.context.removeListener("Room.name", this.onRoomName);
      this.context.removeListener("Room.accountData", this.onRoomAccountData);
      this.context.removeListener("RoomState.events", this.onRoomStateEvents);
      this.context.removeListener("Room.myMembership", this.onMyMembership);
      this.context.removeListener("RoomState.members", this.onRoomStateMember);
      this.context.removeListener("accountData", this.onAccountData);
      this.context.removeListener("crypto.keyBackupStatus", this.onKeyBackupStatus);
      this.context.removeListener("deviceVerificationChanged", this.onDeviceVerificationChanged);
      this.context.removeListener("userTrustStatusChanged", this.onUserVerificationChanged);
      this.context.removeListener("crossSigning.keysChanged", this.onCrossSigningKeysChanged);
      this.context.removeListener("Event.decrypted", this.onEventDecrypted);
    }
    window.removeEventListener("beforeunload", this.onPageUnload);
    if (this.props.resizeNotifier) {
      this.props.resizeNotifier.removeListener("middlePanelResized", this.onResize);
    }

    // Remove RoomStore listener
    if (this.roomStoreToken) {
      this.roomStoreToken.remove();
    }
    // Remove RightPanelStore listener
    if (this.rightPanelStoreToken) {
      this.rightPanelStoreToken.remove();
    }
    WidgetEchoStore/* default */.Z.removeListener(AsyncStore/* UPDATE_EVENT */.aY, this.onWidgetEchoStoreUpdate);
    WidgetStore/* default */.Z.instance.removeListener(AsyncStore/* UPDATE_EVENT */.aY, this.onWidgetStoreUpdate);
    if (this.state.room) {
      WidgetLayoutStore/* WidgetLayoutStore */.z3.instance.off(WidgetLayoutStore/* WidgetLayoutStore */.z3.emissionForRoom(this.state.room), this.onWidgetLayoutChange);
    }

    // cancel any pending calls to the throttled updated
    this.updateRoomMembers.cancel();
    for (const watcher of this.settingWatchers) {
      SettingsStore/* default */.C.unwatchSetting(watcher);
    }
  }
  async calculateRecommendedVersion(room) {
    const upgradeRecommendation = await room.getRecommendedVersion();
    if (this.unmounted) return;
    this.setState({
      upgradeRecommendation
    });
  }
  async loadMembersIfJoined(room) {
    // lazy load members if enabled
    if (this.context.hasLazyLoadMembersEnabled()) {
      if (room && room.getMyMembership() === "join") {
        try {
          await room.loopMembersIfNeeded();
          if (!this.unmounted) {
            this.setState({
              membersLoaded: true
            });
          }
        } catch (err) {
          const errorMessage = `Fetching room members for ${room.roomId} failed.` + " Room members will appear incomplete.";
          console.error(errorMessage);
          console.error(err);
        }
      }
    }
  }
  calculatePeekRules(room) {
    const guestAccessEvent = room.currentState.getStateEvents("m.room.guest_access", "");
    if (guestAccessEvent && guestAccessEvent.getContent().guest_access === "can_join") {
      this.setState({
        guestsCanJoin: true
      });
    }
    const historyVisibility = room.currentState.getStateEvents("m.room.history_visibility", "");
    if (historyVisibility && historyVisibility.getContent().history_visibility === "world_readable") {
      this.setState({
        canPeek: true
      });
    }
  }
  updatePreviewUrlVisibility({
    roomId
  }) {
    // URL Previews in E2EE rooms can be a privacy leak so use a different setting which is per-room explicit
    const key = this.context.isRoomEncrypted(roomId) ? "urlPreviewsEnabled_e2ee" : "urlPreviewsEnabled";
    this.setState({
      showUrlPreview: SettingsStore/* default */.C.getValue(key, roomId)
    });
  }
  async updateE2EStatus(room) {
    if (!this.context.isRoomEncrypted(room.roomId)) return;

    // If crypto is not currently enabled, we aren't tracking devices at all,
    // so we don't know what the answer is. Let's error on the safe side and show
    // a warning for this case.
    let e2eStatus = ShieldUtils/* E2EStatus */._.Warning;
    if (this.context.isCryptoEnabled()) {
      /* At this point, the user has encryption on and cross-signing on */
      e2eStatus = await (0,ShieldUtils/* shieldStatusForRoom */.b)(this.context, room);
    }
    if (this.unmounted) return;
    this.setState({
      e2eStatus
    });
  }
  updatePermissions(room) {
    if (room) {
      const me = this.context.getUserId();
      const canReact = room.getMyMembership() === "join" && room.currentState.maySendEvent("m.reaction", me);
      const canReply = room.maySendMessage();
      this.setState({
        canReact,
        canReply
      });
    }
  }
  checkDesktopNotifications() {
    const memberCount = this.state.room.getJoinedMemberCount() + this.state.room.getInvitedMemberCount();
    // if they are not alone prompt the user about notifications so they don't miss replies
    if (memberCount > 1 && Notifier["default"].shouldShowPrompt()) {
      (0,DesktopNotificationsToast/* showToast */.C)(true);
    }
  }
  updateDMState() {
    const room = this.state.room;
    if (room.getMyMembership() != "join") {
      return;
    }
    const dmInviter = room.getDMInviter();
    if (dmInviter) {
      Rooms/* setDMRoom */.T8(room.roomId, dmInviter);
    }
  }
  injectSticker(url, info, text, package_id) {
    if (this.context.isGuest()) {
      dispatcher/* default */.ZP.dispatch({
        action: "require_registration"
      });
      return;
    }
    ContentMessages/* default */.ZP.sharedInstance().sendStickerContentToRoom({
      url: url,
      roomId: this.state.room.roomId,
      info: info,
      text: text,
      matrixClient: this.context,
      package_id: package_id
    }).then(undefined, error => {
      if (error.name === "UnknownDeviceError") {
        // Let the staus bar handle this
        return;
      }
    });
  }
  handleSearchResult(searchPromise) {
    // keep a record of the current search id, so that if the search terms
    // change before we get a response, we can ignore the results.
    const localSearchId = this.searchId;
    this.setState({
      searchInProgress: true
    });
    return searchPromise.then(results => {
      debuglog("search complete");
      if (this.unmounted || !this.state.searching || this.searchId != localSearchId) {
        console.error("Discarding stale search results");
        return false;
      }

      // postgres on synapse returns us precise details of the strings
      // which actually got matched for highlighting.
      //
      // In either case, we want to highlight the literal search term
      // whether it was used by the search engine or not.

      let highlights = results.highlights;
      if (highlights.indexOf(this.state.searchTerm) < 0) {
        highlights = highlights.concat(this.state.searchTerm);
      }

      // For overlapping highlights,
      // favour longer (more specific) terms first
      highlights = highlights.sort(function (a, b) {
        return b.length - a.length;
      });
      this.setState({
        searchHighlights: highlights,
        searchResults: results
      });
    }, error => {
      console.error("Search failed", error);
      Modal/* default */.Z.createTrackedDialog("Search failed", "", ErrorDialog/* default */.Z, {
        title: (0,languageHandler._t)("Search failed"),
        description: error && error.message ? error.message : (0,languageHandler._t)("Server may be unavailable, overloaded, or search timed out :(")
      });
      return false;
    }).finally(() => {
      this.setState({
        searchInProgress: false
      });
    });
  }
  getSearchResultTiles() {
    // XXX: todo: merge overlapping results somehow?
    // XXX: why doesn't searching on name work?

    const ret = [];
    if (this.state.searchInProgress) {
      ret.push( /*#__PURE__*/react.createElement("li", {
        key: "search-spinner"
      }, /*#__PURE__*/react.createElement(Spinner/* default */.Z, null)));
    }
    if (!this.state.searchResults.next_batch) {
      var _this$state$searchRes, _this$state$searchRes2;
      if (!((_this$state$searchRes = this.state.searchResults) !== null && _this$state$searchRes !== void 0 && (_this$state$searchRes2 = _this$state$searchRes.results) !== null && _this$state$searchRes2 !== void 0 && _this$state$searchRes2.length)) {
        ret.push( /*#__PURE__*/react.createElement("li", {
          key: "search-top-marker"
        }, /*#__PURE__*/react.createElement("h2", {
          className: "mx_RoomView_topMarker"
        }, (0,languageHandler._t)("No results"))));
      } else {
        ret.push( /*#__PURE__*/react.createElement("li", {
          key: "search-top-marker"
        }, /*#__PURE__*/react.createElement("h2", {
          className: "mx_RoomView_topMarker"
        }, (0,languageHandler._t)("No more results"))));
      }
    }

    // once dynamic content in the search results load, make the scrollPanel check
    // the scroll offsets.
    const onHeightChanged = () => {
      const scrollPanel = this.searchResultsPanel.current;
      if (scrollPanel) {
        scrollPanel.checkScroll();
      }
    };
    let lastRoomId;
    for (let i = (((_this$state$searchRes3 = this.state.searchResults) === null || _this$state$searchRes3 === void 0 ? void 0 : (_this$state$searchRes4 = _this$state$searchRes3.results) === null || _this$state$searchRes4 === void 0 ? void 0 : _this$state$searchRes4.length) || 0) - 1; i >= 0; i--) {
      var _this$state$searchRes3, _this$state$searchRes4;
      const result = this.state.searchResults.results[i];
      const mxEv = result.context.getEvent();
      const roomId = mxEv.getRoomId();
      const room = this.context.getRoom(roomId);
      if (!room) {
        // if we do not have the room in js-sdk stores then hide it as we cannot easily show it
        // As per the spec, an all rooms search can create this condition,
        // it happens with Seshat but not Synapse.
        // It will make the result count not match the displayed count.
        console.log("Hiding search result from an unknown room", roomId);
        continue;
      }
      if (!(0,EventTile/* haveTileForEvent */.K3)(mxEv, this.state.showHiddenEventsInTimeline)) {
        // XXX: can this ever happen? It will make the result count
        // not match the displayed count.
        continue;
      }
      if (this.state.searchScope === "All") {
        if (roomId !== lastRoomId) {
          ret.push( /*#__PURE__*/react.createElement("li", {
            key: mxEv.getId() + "-room"
          }, /*#__PURE__*/react.createElement("h2", null, (0,languageHandler._t)("Room"), ": ", room.name)));
          lastRoomId = roomId;
        }
      }
      const resultLink = "#/room/" + roomId + "/" + mxEv.getId();
      ret.push( /*#__PURE__*/react.createElement(SearchResultTile, {
        key: mxEv.getId(),
        searchResult: result,
        searchHighlights: this.state.searchHighlights,
        resultLink: resultLink,
        permalinkCreator: this.getPermalinkCreatorForRoom(room),
        onHeightChanged: onHeightChanged
      }));
    }
    return ret;
  }
  // get the current scroll position of the room, so that it can be
  // restored when we switch back to it.
  //
  getScrollState() {
    const messagePanel = this.messagePanel;
    if (!messagePanel) return null;

    // if we're following the live timeline, we want to return null; that
    // means that, if we switch back, we will jump to the read-up-to mark.
    //
    // That should be more intuitive than slavishly preserving the current
    // scroll state, in the case where the room advances in the meantime
    // (particularly in the case that the user reads some stuff on another
    // device).
    //
    if (this.state.atEndOfLiveTimeline) {
      return null;
    }
    const scrollState = messagePanel.getScrollState();

    // getScrollState on TimelinePanel *may* return null, so guard against that
    if (!scrollState || scrollState.stuckAtBottom) {
      // we don't really expect to be in this state, but it will
      // occasionally happen when no scroll state has been set on the
      // messagePanel (ie, we didn't have an initial event (so it's
      // probably a new room), there has been no user-initiated scroll, and
      // no read-receipts have arrived to update the scroll position).
      //
      // Return null, which will cause us to scroll to last unread on
      // reload.
      return null;
    }
    return {
      focussedEvent: scrollState.trackedScrollToken,
      pixelOffset: scrollState.pixelOffset
    };
  }
  /**
   * get any current call for this room
   */
  getCallForRoom() {
    if (!this.state.room) {
      return null;
    }
    return CallHandler/* default */.ZP.sharedInstance().getCallForRoom(this.state.room.roomId);
  }
  getOldRoom() {
    const createEvent = this.state.room.currentState.getStateEvents("m.room.create", "");
    if (!createEvent || !createEvent.getContent()["predecessor"]) return null;
    return this.context.getRoom(createEvent.getContent()["predecessor"]["room_id"]);
  }
  async getWalletList() {
    const userId = MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId();
    WalletStore/* default */.ZP.instance.getWalletList(userId, true);
  }

  // get act info
  async getActivity(type = "live") {
    const roomId = RoomViewStore/* default */.Z.getRoomId();
    const room = MatrixClientPeg/* MatrixClientPeg */.p.get().getRoom(roomId);
    if (room !== null && room !== void 0 && room.hasSpaceParent()) {
      var _room$getParentRoom2, _MatrixClientPeg$get;
      const spaceId = room === null || room === void 0 ? void 0 : (_room$getParentRoom2 = room.getParentRoom()) === null || _room$getParentRoom2 === void 0 ? void 0 : _room$getParentRoom2.roomId;
      const acts = await ((_MatrixClientPeg$get = MatrixClientPeg/* MatrixClientPeg */.p.get()) === null || _MatrixClientPeg$get === void 0 ? void 0 : _MatrixClientPeg$get.getActivityOfSpace(spaceId));
      // eslint-disable-next-line camelcase
      const actList = acts.slice(0, 3).filter(item => item.tag_text.toLowerCase() === type);
      console.log("🚀 ~ file: RoomView.tsx:1792 ~ RoomView ~ getActivity ~ actList:", actList);
      if (actList && actList.length) {
        const actInfo = actList[actList.length - 1];
        this.setState({
          actInfo,
          showAudioPlayerCard: true
        });
      }
    }
  }
  async getAudioInfo(id) {
    const url = `${constants/* SOSHOW_API */.U6}/open/get_space_stream?space=${id}`;
    return fetch(url, {
      method: "GET"
    }).then(response => response.json());
  }
  getHiddenHighlightCount() {
    const oldRoom = this.getOldRoom();
    if (!oldRoom) return 0;
    return oldRoom.getUnreadNotificationCount("highlight");
  }
  render() {
    var _this$state$room3, _this$state$room4, _this$state$room4$cur, _this$state$room4$cur2, _this$state$room4$cur3, _this$state$room$curr, _Object$keys;
    if (!this.state.room) {
      const loading = !this.state.matrixClientIsReady || this.state.roomLoading || this.state.peekLoading;
      if (loading) {
        // Assume preview loading if we don't have a ready client or a room ID (still resolving the alias)
        const previewLoading = !this.state.matrixClientIsReady || !this.state.roomId || this.state.peekLoading;
        return /*#__PURE__*/react.createElement("div", {
          className: "mx_RoomView"
        }, UIStore/* default */.Z.instance.windowWidth <= 640 && /*#__PURE__*/react.createElement("div", {
          style: {
            flex: "0 0 50px",
            display: "flex",
            alignItems: "center"
          }
        }, /*#__PURE__*/react.createElement(HomeButton/* HomeButton */.u, null)), /*#__PURE__*/react.createElement(ErrorBoundary/* default */.Z, null, /*#__PURE__*/react.createElement(MainSplit/* default */.Z, {
          panel: this.state.rightPanel,
          resizeNotifier: this.props.resizeNotifier,
          layout: this.state.layout
        }, /*#__PURE__*/react.createElement(RoomPreviewBar, {
          canPreview: false,
          previewLoading: previewLoading && !this.state.roomLoadError,
          error: this.state.roomLoadError,
          loading: loading,
          joining: this.state.joining,
          oobData: this.props.oobData
        }))));
      } else {
        var _this$props$threepidI2, _this$props$threepidI3;
        let inviterName = undefined;
        if (this.props.oobData) {
          inviterName = this.props.oobData.inviterName;
        }
        const invitedEmail = (_this$props$threepidI2 = this.props.threepidInvite) === null || _this$props$threepidI2 === void 0 ? void 0 : _this$props$threepidI2.toEmail;

        // We have no room object for this room, only the ID.
        // We've got to this room by following a link, possibly a third party invite.
        const roomAlias = this.state.roomAlias;
        return /*#__PURE__*/react.createElement("div", {
          className: "mx_RoomView"
        }, UIStore/* default */.Z.instance.windowWidth <= 640 && /*#__PURE__*/react.createElement("div", {
          style: {
            flex: "0 0 50px",
            display: "flex",
            alignItems: "center"
          }
        }, /*#__PURE__*/react.createElement(HomeButton/* HomeButton */.u, null)), /*#__PURE__*/react.createElement(ErrorBoundary/* default */.Z, null, /*#__PURE__*/react.createElement(MainSplit/* default */.Z, {
          panel: this.state.rightPanel,
          resizeNotifier: this.props.resizeNotifier,
          layout: this.state.layout
        }, /*#__PURE__*/react.createElement(RoomPreviewBar, {
          onJoinClick: this.onJoinButtonClicked,
          onForgetClick: this.onForgetClick,
          onRejectClick: this.onRejectButtonClicked,
          onRejectAndIgnoreClick: this.onRejectAndIgnoreClick,
          canPreview: false,
          error: this.state.roomLoadError,
          roomAlias: roomAlias,
          joining: this.state.joining,
          inviterName: inviterName,
          invitedEmail: invitedEmail,
          oobData: this.props.oobData,
          signUrl: (_this$props$threepidI3 = this.props.threepidInvite) === null || _this$props$threepidI3 === void 0 ? void 0 : _this$props$threepidI3.signUrl,
          room: this.state.room
        }))));
      }
    }
    // if (RoomListStore.instance.getTagsForRoom(this.state.room).includes(DefaultTagID.Invisible)) {
    //     return null;
    // }
    const myMembership = this.state.room.getMyMembership();
    // SpaceRoomView handles invites itself
    if (myMembership === "invite" && (!SpaceStore/* default */.ZP.spacesEnabled || !this.state.room.isSpaceRoom())) {
      const myUserId = this.context.credentials.userId;
      const myMember = this.state.room.getMember(myUserId);
      const inviteEvent = myMember ? myMember.events.member : null;
      let inviterName = (0,languageHandler._t)("Unknown");
      if (inviteEvent) {
        inviterName = inviteEvent.sender ? inviteEvent.sender.name : inviteEvent.getSender();
      }
      // We deliberately don't try to peek into invites, even if we have permission to peek
      // as they could be a spam vector.
      // XXX: in future we could give the option of a 'Preview' button which lets them view anyway.

      // We have a regular invite for this room.
      return /*#__PURE__*/react.createElement("div", {
        className: "mx_RoomView"
      }, UIStore/* default */.Z.instance.windowWidth <= 640 && /*#__PURE__*/react.createElement("div", {
        style: {
          flex: "0 0 50px",
          display: "flex",
          alignItems: "center"
        }
      }, /*#__PURE__*/react.createElement(HomeButton/* HomeButton */.u, null)), /*#__PURE__*/react.createElement(ErrorBoundary/* default */.Z, null, /*#__PURE__*/react.createElement(MainSplit/* default */.Z, {
        panel: this.state.rightPanel,
        resizeNotifier: this.props.resizeNotifier,
        layout: this.state.layout
      }, /*#__PURE__*/react.createElement(RoomPreviewBar, {
        onJoinClick: this.onJoinButtonClicked,
        onForgetClick: this.onForgetClick,
        onRejectClick: this.onRejectButtonClicked,
        onRejectAndIgnoreClick: this.onRejectAndIgnoreClick,
        inviterName: inviterName,
        canPreview: false,
        joining: this.state.joining,
        room: this.state.room
      }))));
    }
    let fileDropTarget = null;
    if (this.state.draggingFile) {
      fileDropTarget = /*#__PURE__*/react.createElement("div", {
        className: "mx_RoomView_fileDropTarget"
      }, /*#__PURE__*/react.createElement("img", {
        src: __webpack_require__(659693),
        className: "mx_RoomView_fileDropTarget_image"
      }), (0,languageHandler._t)("Drop file here to upload"));
    }

    // We have successfully loaded this room, and are not previewing.
    // Display the "normal" room view.

    let activeCall = null;
    {
      // New block because this variable doesn't need to hang around for the rest of the function
      const call = this.getCallForRoom();
      if (call && this.state.callState !== "ended" && this.state.callState !== "ringing") {
        activeCall = call;
      }
    }
    const scrollheaderClasses = classnames_default()({
      mx_RoomView_scrollheader: true
    });
    let statusBar;
    let isStatusAreaExpanded = true;
    if (!this.state.searchResults) {
      isStatusAreaExpanded = this.state.statusBarVisible;
      statusBar = /*#__PURE__*/react.createElement(RoomStatusBar/* default */.Z, {
        room: this.state.room,
        isSignalLoss: this.state.isSignalLoss,
        isPeeking: myMembership !== "join",
        onInviteClick: this.onInviteButtonClick,
        onVisible: this.onStatusBarVisible,
        onHidden: this.onStatusBarHidden
      });
    }
    const statusBarAreaClass = classnames_default()("mx_RoomView_statusArea", {
      mx_RoomView_statusArea_expanded: isStatusAreaExpanded
    });

    // if statusBar does not exist then statusBarArea is blank and takes up unnecessary space on the screen
    // show statusBarArea only if statusBar is present
    const statusBarArea = statusBar && /*#__PURE__*/react.createElement("div", {
      className: statusBarAreaClass
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomView_statusAreaBox"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_RoomView_statusAreaBox_line"
    }), statusBar));
    const roomVersionRecommendation = this.state.upgradeRecommendation;
    const showRoomUpgradeBar = roomVersionRecommendation && roomVersionRecommendation.needsUpgrade && this.state.room.userMayUpgradeRoom(this.context.credentials.userId);
    const hiddenHighlightCount = this.getHiddenHighlightCount();
    let aux = null;
    let previewBar;
    if (this.state.searching) {
      aux = /*#__PURE__*/react.createElement(SearchBar, {
        searchInProgress: this.state.searchInProgress,
        onCancelClick: this.onCancelSearchClick,
        onSearch: this.onSearch,
        isRoomEncrypted: this.context.isRoomEncrypted(this.state.room.roomId)
      });
    } else if (showRoomUpgradeBar) {
      aux = /*#__PURE__*/react.createElement(RoomUpgradeWarningBar, {
        room: this.state.room
      });
    } else if (myMembership !== "join") {
      var _this$props$threepidI4;
      // We do have a room object for this room, but we're not currently in it.
      // We may have a 3rd party invite to it.
      let inviterName = undefined;
      if (this.props.oobData) {
        inviterName = this.props.oobData.inviterName;
      }
      const invitedEmail = (_this$props$threepidI4 = this.props.threepidInvite) === null || _this$props$threepidI4 === void 0 ? void 0 : _this$props$threepidI4.toEmail;
      return /*#__PURE__*/react.createElement("div", {
        className: "mx_RoomView"
      }, UIStore/* default */.Z.instance.windowWidth <= 640 && /*#__PURE__*/react.createElement("div", {
        style: {
          flex: "0 0 50px",
          display: "flex",
          alignItems: "center"
        }
      }, /*#__PURE__*/react.createElement(HomeButton/* HomeButton */.u, null)), /*#__PURE__*/react.createElement(ErrorBoundary/* default */.Z, null, /*#__PURE__*/react.createElement(MainSplit/* default */.Z, {
        panel: this.state.rightPanel,
        resizeNotifier: this.props.resizeNotifier,
        layout: this.state.layout
      }, /*#__PURE__*/react.createElement(RoomPreviewBar, {
        onJoinClick: this.onJoinButtonClicked,
        onForgetClick: this.onForgetClick,
        onRejectClick: this.onRejectButtonClicked,
        onRejectAndIgnoreClick: this.onRejectAndIgnoreClick,
        joining: this.state.joining,
        inviterName: inviterName,
        invitedEmail: invitedEmail,
        oobData: this.props.oobData,
        canPreview: this.state.canPeek,
        room: this.state.room
      }))));
    } else if (hiddenHighlightCount > 0) {
      aux = /*#__PURE__*/react.createElement(AccessibleButton/* default */.Z, {
        element: "div",
        className: "mx_RoomView_auxPanel_hiddenHighlights",
        onClick: this.onHiddenHighlightsClick
      }, (0,languageHandler._t)("You have %(count)s unread notifications in a prior version of this room.", {
        count: hiddenHighlightCount
      }));
    }

    // space room return case
    if ((_this$state$room3 = this.state.room) !== null && _this$state$room3 !== void 0 && _this$state$room3.isSpaceRoom()) {
      return /*#__PURE__*/react.createElement(SpaceRoomView/* default */.ZP, {
        space: this.state.room,
        justCreatedOpts: this.props.justCreatedOpts,
        resizeNotifier: this.props.resizeNotifier,
        onJoinButtonClicked: this.onJoinButtonClicked,
        onRejectAndIgnoreClick: this.onRejectAndIgnoreClick
        // TODO: handle function error
        ,
        onRejectButtonClicked: this.props.threepidInvite ? this.onRejectThreepidInviteButtonClicked : this.onRejectButtonClicked
      });
    }

    // notification room return case
    const {
      type: roomTypeOfCreateEvent,
      client_id
    } = ((_this$state$room4 = this.state.room) === null || _this$state$room4 === void 0 ? void 0 : (_this$state$room4$cur = _this$state$room4.currentState) === null || _this$state$room4$cur === void 0 ? void 0 : (_this$state$room4$cur2 = _this$state$room4$cur.getStateEvents) === null || _this$state$room4$cur2 === void 0 ? void 0 : (_this$state$room4$cur3 = _this$state$room4$cur2.call(_this$state$room4$cur, _types_event/* EventType */.tw.RoomCreate, "")) === null || _this$state$room4$cur3 === void 0 ? void 0 : _this$state$room4$cur3.getContent()) || {};
    const isNotificationRoom = roomTypeOfCreateEvent === "m.notification";

    // if (roomTypeOfCreateEvent === "m.notification") {
    //     dis.dispatch({
    //         action: CHANGE_LEFT_PANEL_UI_STATE,
    //         target: INBOX_NOTIFICATION,
    //         value: {
    //             openPanel: false,
    //             instanceId: "",
    //             type: null,
    //             data: null,
    //         },
    //     });

    //     return (
    //         <NotificationRoom
    //             clientId={client_id}
    //             resizeNotifier={this.props.resizeNotifier}
    //             room={this.state.room}
    //         />
    //     );
    // }

    const auxPanel = /*#__PURE__*/react.createElement(AuxPanel, {
      room: this.state.room,
      fullHeight: false,
      userId: this.context.credentials.userId,
      maxHeight: this.state.auxPanelMaxHeight,
      showApps: this.state.showApps,
      P2PModalType: this.state.P2PModalType,
      P2PModalInfo: this.state.P2PModalInfo,
      onResize: this.onResize,
      resizeNotifier: this.props.resizeNotifier
    }, aux);
    let messageComposer;
    let searchInfo;
    let followBar;
    const isAnnouncement = this.state.room.isAnnouncementRoom();
    const hasAnnouncementPermission = ((_this$state$room$curr = this.state.room.currentState.members[this.state.room.myUserId]) === null || _this$state$room$curr === void 0 ? void 0 : _this$state$room$curr.powerLevel) >= 100;
    const canSpeak =
    // joined and not showing search results
    myMembership === "join" && !this.state.searchResults && (!isAnnouncement || hasAnnouncementPermission);
    if (canSpeak && !this.state.isSignalLoss && !isNotificationRoom) {
      messageComposer = /*#__PURE__*/react.createElement(MessageComposer/* default */.ZP, {
        room: this.state.room,
        e2eStatus: this.state.e2eStatus,
        resizeNotifier: this.props.resizeNotifier,
        replyToEvent: this.state.replyToEvent,
        permalinkCreator: this.getPermalinkCreatorForRoom(this.state.room),
        dappItems: this.state.dappItems,
        forwardPhase: this.state.forwardPhase
      });
    }
    if (isAnnouncement && !hasAnnouncementPermission) {
      followBar = /*#__PURE__*/react.createElement("div", {
        className: "mx_RoomView_followBar"
      }, "Follow to get this room\u2019s updates in your own room", /*#__PURE__*/react.createElement("button", {
        onClick: this.onFollowClicked
      }, (0,languageHandler._t)("Follow")));
    }

    // TODO: Why aren't we storing the term/scope/count in this format
    // in this.state if this is what RoomHeader desires?
    if (this.state.searchResults) {
      searchInfo = {
        searchTerm: this.state.searchTerm,
        searchScope: this.state.searchScope,
        searchCount: this.state.searchResults.count
      };
    }

    // if we have search results, we keep the messagepanel (so that it preserves its
    // scroll state), but hide it.
    let searchResultsPanel;
    let hideMessagePanel = false;
    if (this.state.searchResults) {
      // show searching spinner
      if (this.state.searchResults.count === undefined) {
        searchResultsPanel = /*#__PURE__*/react.createElement("div", {
          className: "mx_RoomView_messagePanel mx_RoomView_messagePanelSearchSpinner"
        });
      } else {
        searchResultsPanel = /*#__PURE__*/react.createElement(ScrollPanel/* default */.Z, {
          ref: this.searchResultsPanel,
          className: "mx_RoomView_messagePanel mx_RoomView_searchResultsPanel mx_GroupLayout",
          onFillRequest: this.onSearchResultsFillRequest,
          resizeNotifier: this.props.resizeNotifier
        }, /*#__PURE__*/react.createElement("li", {
          className: scrollheaderClasses
        }), this.getSearchResultTiles());
      }
      hideMessagePanel = true;
    }
    let highlightedEventId = null;
    if (this.state.isInitialEventHighlighted) {
      highlightedEventId = this.state.initialEventId;
    }
    const messagePanelClassNames = classnames_default()("mx_RoomView_messagePanel", {
      mx_IRCLayout: this.state.layout == Layout/* Layout */.A.IRC,
      mx_GroupLayout: this.state.layout == Layout/* Layout */.A.Group
    });

    // console.info("ShowUrlPreview for %s is %s", this.state.room.roomId, this.state.showUrlPreview);
    const messagePanel = /*#__PURE__*/react.createElement(TimelinePanel/* default */.Z, {
      ref: this.gatherTimelinePanelRef,
      timelineSet: this.state.room.getUnfilteredTimelineSet()
      // showReadReceipts={this.state.showReadReceipts}
      ,
      showReadReceipts: false,
      manageReadReceipts: !this.state.isPeeking,
      sendReadReceiptOnLoad: !this.state.wasContextSwitch,
      manageReadMarkers: !this.state.isPeeking,
      hidden: hideMessagePanel,
      highlightedEventId: highlightedEventId,
      eventId: this.state.initialEventId,
      eventPixelOffset: this.state.initialEventPixelOffset,
      onScroll: this.onMessageListScroll,
      onUserScroll: this.onUserScroll,
      onReadMarkerUpdated: this.onReadMarkerUpdated,
      showUrlPreview: this.state.showUrlPreview,
      className: messagePanelClassNames,
      membersLoaded: this.state.membersLoaded,
      permalinkCreator: this.getPermalinkCreatorForRoom(this.state.room),
      resizeNotifier: this.props.resizeNotifier,
      showReactions: true,
      editState: this.state.editState,
      layout: isNotificationRoom ? Layout/* Layout */.A.Bubble : this.state.layout,
      tileShape: isNotificationRoom ? EventTile/* TileShape */.GO.NotifyV2 : EventTile/* TileShape */.GO.Default
    });

    //const showAudioPlayer = () => {
    //    this.setState({
    //        showNetMeeting: true,
    //    });
    //};

    const getActInfo = () => {
      return {
        url: this.state.actInfo.url,
        title: this.state.actInfo.title,
        host_avatar: this.state.actInfo.host_avatar,
        host: this.state.actInfo.host,
        tag_text: this.state.actInfo.tag_text
      };
    };
    const onListenLiving = async url => {
      const audioId = (0,UrlUtils/* getUrlParam */.eY)(url, "space");
      // use audioId fetch audioInfo
      await this.getAudioInfo(audioId).then(audioInfo => {
        const {
          errorcode,
          data,
          message: msg
        } = audioInfo;
        let audioSource;
        if (errorcode === 0 && data) {
          audioSource = data.source.location;
          (0,soshow.invokeJoinSpace)(audioId);

          // 停止当前播放的音频， 并且传入新的音频
          this.setState({
            audioSource: audioSource
          });
          const dispatckActionData = {};
          const currentActInfo = getActInfo();
          Object.assign(dispatckActionData, {
            actInfo: currentActInfo
          });
          Object.assign(dispatckActionData, {
            actionType: "audio-small",
            playerType: "small",
            audioSource,
            isPlaying: false,
            audioRef: undefined
          });
          AudioPlayerStore/* AudioPlayerDispatcher */.iF.dispatch(dispatckActionData);
        } else {
          dist.SdMessage.error(msg || "Fail load audio resource");
        }
      });
    };
    const audioPlayerCard = this.state.showAudioPlayerCard ? /*#__PURE__*/react.createElement(audio_player_AudioPlayerCard, {
      actInfo: this.state.actInfo,
      onPlay: onListenLiving
    }) : null;
    let topUnreadMessagesBar = null;
    // Do not show TopUnreadMessagesBar if we have search results showing, it makes no sense
    if (this.state.showTopUnreadMessagesBar && !this.state.searchResults) {
      topUnreadMessagesBar = /*#__PURE__*/react.createElement(TopUnreadMessagesBar, {
        onScrollUpClick: this.jumpToReadMarker,
        onCloseClick: this.forgetReadMarker
      });
    }
    let jumpToBottom;
    // Do not show JumpToBottomButton if we have search results showing, it makes no sense
    if (!this.state.atEndOfLiveTimeline && !this.state.searchResults) {
      jumpToBottom = /*#__PURE__*/react.createElement(rooms_JumpToBottomButton, {
        highlight: this.state.room.getUnreadNotificationCount(room/* NotificationCountType */.mf.Highlight) > 0,
        numUnreadMessages: this.state.numUnreadMessages,
        onScrollToBottomClick: this.jumpToLiveTimeline
      });
    }
    const showRightPanel = this.state.room && this.state.showRightPanel;
    const _rightPanel = showRightPanel ? /*#__PURE__*/react.createElement(RightPanel/* default */.Z, {
      room: this.state.room,
      resizeNotifier: this.props.resizeNotifier,
      permalinkCreator: this.getPermalinkCreatorForRoom(this.state.room),
      e2eStatus: this.state.e2eStatus
    }) : null;
    const timelineClasses = classnames_default()("mx_RoomView_timeline", {
      mx_RoomView_timeline_rr_enabled: this.state.showReadReceipts
    });
    const mainClasses = classnames_default()("mx_RoomView", {
      mx_RoomView_inCall: Boolean(activeCall)
    });
    const showChatEffects = SettingsStore/* default */.C.getValue("showChatEffects");
    return /*#__PURE__*/react.createElement(ErrorBoundary/* default */.Z, null, /*#__PURE__*/react.createElement(RoomContext/* default */.Z.Provider, {
      value: this.state
    }, /*#__PURE__*/react.createElement("main", {
      className: mainClasses,
      ref: this.roomView,
      onKeyDown: this.onReactKeyDown,
      "data-layout": this.state.layout
    }, /*#__PURE__*/react.createElement("div", {
      style: RoomView_objectSpread(RoomView_objectSpread({}, this.state.backgroundStyle), {}, {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1
      })
    }), /*#__PURE__*/react.createElement(FeatureWrapper/* default */.Z, null, /*#__PURE__*/react.createElement(defender_DefenderSettingsAnchor, {
      roomId: this.state.roomId
    }), /*#__PURE__*/react.createElement(CounterAnchor, null), /*#__PURE__*/react.createElement(defender_ScreenshotGuard, {
      roomId: this.state.roomId
    }), /*#__PURE__*/react.createElement(defender_FlashRoomCover, {
      roomId: this.state.roomId
    }), /*#__PURE__*/react.createElement(defender_WaterMarkGuard, {
      name: MatrixClientPeg/* MatrixClientPeg */.p.get().getUser(MatrixClientPeg/* MatrixClientPeg */.p.get().getUserId()).displayName,
      roomId: this.state.roomId,
      token: OwnProfileStore.OwnProfileStore.instance.walletAddress
    })), showChatEffects && this.roomView.current && /*#__PURE__*/react.createElement(elements_EffectsOverlay, {
      roomWidth: this.roomView.current.offsetWidth
    }), isNotificationRoom ? /*#__PURE__*/react.createElement(NotificationHeader/* NotificationRoomHeaderWrapper */.QG, null, /*#__PURE__*/react.createElement(NotificationHeader/* NotificationRoomHeader */.oZ, {
      room: this.state.room,
      showSecondary: false
    })) : /*#__PURE__*/react.createElement(RoomHeader, {
      room: this.state.room,
      searchInfo: searchInfo,
      oobData: this.props.oobData,
      inRoom: myMembership === "join",
      onSearchClick: this.onSearchClick,
      onSettingsClick: this.onSettingsClick,
      onForgetClick: myMembership === "leave" ? this.onForgetClick : null,
      e2eStatus: this.state.e2eStatus,
      onAppsClick: this.state.hasPinnedWidgets ? this.onAppsClick : null,
      appsShown: this.state.showApps,
      onCallPlaced: this.onCallPlaced
    }), /*#__PURE__*/react.createElement(MainSplit/* default */.Z, {
      panel: _rightPanel,
      resizeNotifier: this.props.resizeNotifier,
      layout: this.state.layout
    }, /*#__PURE__*/react.createElement("div", {
      className: classnames_default()("mx_RoomView_body", {
        mx_RoomView_body_background: this.state.showMessageBodyBackground,
        mx_RoomView_body_background_customer_theme: this.state.showMessageBodyBackground && ((_Object$keys = Object.keys(this.state.backgroundStyle)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length) > 0
      })
    }, auxPanel, /*#__PURE__*/react.createElement(PinnedMsgBar/* PinnedContainer */.VA, {
      className: classnames_default()({
        "mx_GroupLayout": this.state.layout === Layout/* Layout */.A.Group
      }),
      room: this.state.room
    }), /*#__PURE__*/react.createElement("div", {
      className: timelineClasses,
      "data-layout": this.state.layout
    }, fileDropTarget, topUnreadMessagesBar, jumpToBottom, audioPlayerCard, messagePanel, searchResultsPanel), statusBarArea, messageComposer, followBar)))));
  }
}, (0,defineProperty/* default */.Z)(RoomView_class2, "contextType", MatrixClientContext/* default */.Z), RoomView_class2)) || RoomView_class);


/***/ }),

/***/ 792734:
/***/ ((module) => {

module.exports = "img/element-icons/signal.b0aed43.png";

/***/ }),

/***/ 659693:
/***/ ((module) => {

module.exports = "img/upload-big.cdac3ea.svg";

/***/ })

}]);
//# sourceMappingURL=4915.js.map