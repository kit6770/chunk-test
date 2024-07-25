(self["webpackChunkhisease_im_web"] = self["webpackChunkhisease_im_web"] || []).push([[2771],{

/***/ 232771:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  components: () => (/* binding */ components)
});

// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/avatars/RoomAvatar.tsx
var RoomAvatar = __webpack_require__(139319);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/avatars/BaseAvatar.tsx
var BaseAvatar = __webpack_require__(56607);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/BaseDialog.js
var BaseDialog = __webpack_require__(308043);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/InteractiveAuthDialog.js
var InteractiveAuthDialog = __webpack_require__(234478);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(225259);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./node_modules/matrix-js-sdk/src/utils.ts
var utils = __webpack_require__(29336);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/languageHandler.tsx
var languageHandler = __webpack_require__(867614);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/MatrixClientPeg.ts + 3 modules
var MatrixClientPeg = __webpack_require__(933393);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/dispatcher.ts
var dispatcher = __webpack_require__(245539);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/UserAddress.ts
var UserAddress = __webpack_require__(996625);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/stores/GroupStore.js
var GroupStore = __webpack_require__(152118);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/email.ts
var email = __webpack_require__(654776);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/IdentityAuthClient.js
var IdentityAuthClient = __webpack_require__(961427);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/IdentityServerUtils.ts
var IdentityServerUtils = __webpack_require__(450414);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/utils/UrlUtils.ts
var UrlUtils = __webpack_require__(58238);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/Keyboard.ts
var Keyboard = __webpack_require__(389310);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/dispatcher/actions.ts
var actions = __webpack_require__(473627);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(294184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/customisations/Media.ts + 1 modules
var Media = __webpack_require__(834208);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/res/img/icon-email-user.svg
var icon_email_user = __webpack_require__(240183);
var icon_email_user_default = /*#__PURE__*/__webpack_require__.n(icon_email_user);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AddressTile.tsx

/*
Copyright 2015, 2016 OpenMarket Ltd
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




// import { replaceableComponent } from "../../../utils/replaceableComponent";



// @replaceableComponent("views.elements.AddressTile")
class AddressTile extends react.Component {
  render() {
    const address = this.props.address;
    const name = address.displayName || address.address;
    const imgUrls = [];
    const isMatrixAddress = ['mx-user-id', 'mx-room-id'].includes(address.addressType);
    if (isMatrixAddress && address.avatarMxc) {
      imgUrls.push((0,Media/* mediaFromMxc */.TS)(address.avatarMxc).getSquareThumbnailHttp(25));
    } else if (address.addressType === 'email') {
      imgUrls.push((icon_email_user_default()));
    }
    const nameClasses = classnames_default()({
      "mx_AddressTile_name": true,
      "mx_AddressTile_justified": this.props.justified
    });
    let info;
    let error = false;
    if (isMatrixAddress && address.isKnown) {
      const idClasses = classnames_default()({
        "mx_AddressTile_id": true,
        "mx_AddressTile_justified": this.props.justified
      });
      info = /*#__PURE__*/react.createElement("div", {
        className: "mx_AddressTile_mx"
      }, /*#__PURE__*/react.createElement("div", {
        className: nameClasses
      }, name), this.props.showAddress ? /*#__PURE__*/react.createElement("div", {
        className: idClasses
      }, address.address) : /*#__PURE__*/react.createElement("div", null));
    } else if (isMatrixAddress) {
      const unknownMxClasses = classnames_default()({
        "mx_AddressTile_unknownMx": true,
        "mx_AddressTile_justified": this.props.justified
      });
      info = /*#__PURE__*/react.createElement("div", {
        className: unknownMxClasses
      }, this.props.address.address);
    } else if (address.addressType === "email") {
      const emailClasses = classnames_default()({
        "mx_AddressTile_email": true,
        "mx_AddressTile_justified": this.props.justified
      });
      let nameNode = null;
      if (address.displayName) {
        nameNode = /*#__PURE__*/react.createElement("div", {
          className: nameClasses
        }, address.displayName);
      }
      info = /*#__PURE__*/react.createElement("div", {
        className: "mx_AddressTile_mx"
      }, /*#__PURE__*/react.createElement("div", {
        className: emailClasses
      }, address.address), nameNode);
    } else {
      error = true;
      const unknownClasses = classnames_default()({
        "mx_AddressTile_unknown": true,
        "mx_AddressTile_justified": this.props.justified
      });
      info = /*#__PURE__*/react.createElement("div", {
        className: unknownClasses
      }, (0,languageHandler._t)("Unknown Address"));
    }
    const classes = classnames_default()({
      "mx_AddressTile": true,
      "mx_AddressTile_error": error
    });
    let dismiss;
    if (this.props.canDismiss) {
      dismiss = /*#__PURE__*/react.createElement("div", {
        className: "mx_AddressTile_dismiss",
        onClick: this.props.onDismissed
      }, /*#__PURE__*/react.createElement("img", {
        src: __webpack_require__(733926),
        width: "9",
        height: "9"
      }));
    }
    return /*#__PURE__*/react.createElement("div", {
      className: classes
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_AddressTile_avatar"
    }, /*#__PURE__*/react.createElement(BaseAvatar/* default */.Z, {
      defaultToInitialLetter: true,
      width: 25,
      height: 25,
      name: name,
      title: name,
      urls: imgUrls
    })), info, dismiss);
  }
}
(0,defineProperty/* default */.Z)(AddressTile, "defaultProps", {
  canDismiss: false,
  onDismissed: function () {},
  // NOP
  justified: false
});
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AddressSelector.tsx

/*
Copyright 2015, 2016 OpenMarket Ltd
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



// import { replaceableComponent } from "../../../utils/replaceableComponent";


// @replaceableComponent("views.elements.AddressSelector")
class AddressSelector extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "scrollElement", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "addressListElement", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "moveSelectionTop", () => {
      if (this.state.selected > 0) {
        this.setState({
          selected: 0,
          hover: false
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "moveSelectionUp", () => {
      if (this.state.selected > 0) {
        this.setState({
          selected: this.state.selected - 1,
          hover: false
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "moveSelectionDown", () => {
      if (this.state.selected < this.maxSelected(this.props.addressList)) {
        this.setState({
          selected: this.state.selected + 1,
          hover: false
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "chooseSelection", () => {
      this.selectAddress(this.state.selected);
    });
    (0,defineProperty/* default */.Z)(this, "onClick", index => {
      this.selectAddress(index);
    });
    (0,defineProperty/* default */.Z)(this, "onMouseEnter", index => {
      this.setState({
        selected: index,
        hover: true
      });
    });
    (0,defineProperty/* default */.Z)(this, "onMouseLeave", () => {
      this.setState({
        hover: false
      });
    });
    (0,defineProperty/* default */.Z)(this, "selectAddress", index => {
      // Only try to select an address if one exists
      if (this.props.addressList.length !== 0) {
        this.props.onSelected(index);
        this.setState({
          hover: false
        });
      }
    });
    this.state = {
      selected: this.props.selected === undefined ? 0 : this.props.selected,
      hover: false
    };
  }

  // TODO: [REACT-WARNING] Replace with appropriate lifecycle event
  UNSAFE_componentWillReceiveProps(props) {
    // eslint-disable-line
    // Make sure the selected item isn't outside the list bounds
    const selected = this.state.selected;
    const maxSelected = this.maxSelected(props.addressList);
    if (selected > maxSelected) {
      this.setState({
        selected: maxSelected
      });
    }
  }
  componentDidUpdate() {
    // As the user scrolls with the arrow keys keep the selected item
    // at the top of the window.
    if (this.scrollElement.current && this.props.addressList.length > 0 && !this.state.hover) {
      const elementHeight = this.addressListElement.current.getBoundingClientRect().height;
      this.scrollElement.current.scrollTop = this.state.selected * elementHeight - elementHeight;
    }
  }
  createAddressListTiles() {
    const maxSelected = this.maxSelected(this.props.addressList);
    const addressList = [];

    // Only create the address elements if there are address
    if (this.props.addressList.length > 0) {
      for (let i = 0; i <= maxSelected; i++) {
        const classes = classnames_default()({
          "mx_AddressSelector_addressListElement": true,
          "mx_AddressSelector_selected": this.state.selected === i
        });

        // NOTE: Defaulting to "vector" as the network, until the network backend stuff is done.
        // Saving the addressListElement so we can use it to work out, in the componentDidUpdate
        // method, how far to scroll when using the arrow keys
        addressList.push( /*#__PURE__*/react.createElement("div", {
          className: classes,
          onClick: this.onClick.bind(this, i),
          onMouseEnter: this.onMouseEnter.bind(this, i),
          onMouseLeave: this.onMouseLeave,
          key: this.props.addressList[i].addressType + "/" + this.props.addressList[i].address,
          ref: this.addressListElement
        }, /*#__PURE__*/react.createElement(AddressTile, {
          address: this.props.addressList[i],
          showAddress: this.props.showAddress,
          justified: true
        })));
      }
    }
    return addressList;
  }
  maxSelected(list) {
    const listSize = list.length === 0 ? 0 : list.length - 1;
    const maxSelected = listSize > this.props.truncateAt - 1 ? this.props.truncateAt - 1 : listSize;
    return maxSelected;
  }
  render() {
    const classes = classnames_default()({
      "mx_AddressSelector": true,
      "mx_AddressSelector_empty": this.props.addressList.length === 0
    });
    return /*#__PURE__*/react.createElement("div", {
      className: classes,
      ref: this.scrollElement
    }, this.props.header, this.createAddressListTiles());
  }
}
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/DialogButtons.js
var DialogButtons = __webpack_require__(804821);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/AddressPickerDialog.tsx

/*
Copyright 2015, 2016 OpenMarket Ltd
Copyright 2017, 2018, 2019 New Vector Ltd
Copyright 2019 Michael Telatynski <7t3chguy@gmail.com>
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














// import { replaceableComponent } from "../../../utils/replaceableComponent";




const TRUNCATE_QUERY_LIST = 40;
const QUERY_USER_DIRECTORY_DEBOUNCE_MS = 200;
const addressTypeName = {
  'mx-user-id': (0,languageHandler/* _td */.I8)("Matrix ID"),
  'mx-room-id': (0,languageHandler/* _td */.I8)("Matrix Room ID"),
  'email': (0,languageHandler/* _td */.I8)("email address")
};
// @replaceableComponent("views.dialogs.AddressPickerDialog")
class AddressPickerDialog extends react.Component {
  constructor(props) {
    super(props);
    (0,defineProperty/* default */.Z)(this, "textinput", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "addressSelector", /*#__PURE__*/(0,react.createRef)());
    (0,defineProperty/* default */.Z)(this, "queryChangedDebouncer", void 0);
    (0,defineProperty/* default */.Z)(this, "cancelThreepidLookup", void 0);
    (0,defineProperty/* default */.Z)(this, "onButtonClick", () => {
      let selectedList = this.state.selectedList.slice();
      // Check the text input field to see if user has an unconverted address
      // If there is and it's valid add it to the local selectedList
      if (this.textinput.current.value !== '') {
        selectedList = this.addAddressesToList([this.textinput.current.value]);
        if (selectedList === null) return;
      }
      this.props.onFinished(true, selectedList);
    });
    (0,defineProperty/* default */.Z)(this, "onCancel", () => {
      this.props.onFinished(false);
    });
    (0,defineProperty/* default */.Z)(this, "onKeyDown", e => {
      const textInput = this.textinput.current ? this.textinput.current.value : undefined;
      if (e.key === Keyboard/* Key */.sr.ESCAPE) {
        e.stopPropagation();
        e.preventDefault();
        this.props.onFinished(false);
      } else if (e.key === Keyboard/* Key */.sr.ARROW_UP) {
        e.stopPropagation();
        e.preventDefault();
        if (this.addressSelector.current) this.addressSelector.current.moveSelectionUp();
      } else if (e.key === Keyboard/* Key */.sr.ARROW_DOWN) {
        e.stopPropagation();
        e.preventDefault();
        if (this.addressSelector.current) this.addressSelector.current.moveSelectionDown();
      } else if (this.state.suggestedList.length > 0 && [Keyboard/* Key */.sr.COMMA, Keyboard/* Key */.sr.ENTER, Keyboard/* Key */.sr.TAB].includes(e.key)) {
        e.stopPropagation();
        e.preventDefault();
        if (this.addressSelector.current) this.addressSelector.current.chooseSelection();
      } else if (textInput.length === 0 && this.state.selectedList.length && e.key === Keyboard/* Key */.sr.BACKSPACE) {
        e.stopPropagation();
        e.preventDefault();
        this.onDismissed(this.state.selectedList.length - 1)();
      } else if (e.key === Keyboard/* Key */.sr.ENTER) {
        e.stopPropagation();
        e.preventDefault();
        if (textInput === '') {
          // if there's nothing in the input box, submit the form
          this.onButtonClick();
        } else {
          this.addAddressesToList([textInput]);
        }
      } else if (textInput && (e.key === Keyboard/* Key */.sr.COMMA || e.key === Keyboard/* Key */.sr.TAB)) {
        e.stopPropagation();
        e.preventDefault();
        this.addAddressesToList([textInput]);
      }
    });
    (0,defineProperty/* default */.Z)(this, "onQueryChanged", ev => {
      const query = ev.target.value;
      if (this.queryChangedDebouncer) {
        clearTimeout(this.queryChangedDebouncer);
      }
      // Only do search if there is something to search
      if (query.length > 0 && query !== '@' && query.length >= 2) {
        this.queryChangedDebouncer = setTimeout(() => {
          if (this.props.pickerType === 'user') {
            if (this.props.groupId) {
              this.doNaiveGroupSearch(query);
            } else if (this.state.serverSupportsUserDirectory) {
              this.doUserDirectorySearch(query);
            } else {
              this.doLocalSearch(query);
            }
          } else if (this.props.pickerType === 'room') {
            if (this.props.groupId) {
              this.doNaiveGroupRoomSearch(query);
            } else {
              this.doRoomSearch(query);
            }
          } else {
            console.error('Unknown pickerType', this.props.pickerType);
          }
        }, QUERY_USER_DIRECTORY_DEBOUNCE_MS);
      } else {
        this.setState({
          suggestedList: [],
          query: "",
          searchError: null
        });
      }
    });
    (0,defineProperty/* default */.Z)(this, "onDismissed", index => () => {
      const selectedList = this.state.selectedList.slice();
      selectedList.splice(index, 1);
      this.setState({
        selectedList,
        suggestedList: [],
        query: ""
      });
      if (this.cancelThreepidLookup) this.cancelThreepidLookup();
    });
    (0,defineProperty/* default */.Z)(this, "onSelected", index => {
      const selectedList = this.state.selectedList.slice();
      selectedList.push(this.getFilteredSuggestions()[index]);
      this.setState({
        selectedList,
        suggestedList: [],
        query: ""
      });
      if (this.cancelThreepidLookup) this.cancelThreepidLookup();
    });
    (0,defineProperty/* default */.Z)(this, "onPaste", e => {
      // Prevent the text being pasted into the textarea
      e.preventDefault();
      const text = e.clipboardData.getData("text");
      // Process it as a list of addresses to add instead
      this.addAddressesToList(text.split(/[\s,]+/));
    });
    (0,defineProperty/* default */.Z)(this, "onUseDefaultIdentityServerClick", e => {
      e.preventDefault();

      // Update the IS in account data. Actually using it may trigger terms.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      (0,IdentityServerUtils/* useDefaultIdentityServer */.e8)();

      // Add email as a valid address type.
      const {
        validAddressTypes
      } = this.state;
      validAddressTypes.push(UserAddress/* AddressType */.DL.Email);
      this.setState({
        validAddressTypes
      });
    });
    (0,defineProperty/* default */.Z)(this, "onManageSettingsClick", e => {
      e.preventDefault();
      dispatcher/* default */.ZP.fire(actions/* Action */.a.ViewUserSettings);
      this.onCancel();
    });
    let _validAddressTypes = this.props.validAddressTypes;
    // Remove email from validAddressTypes if no IS is configured. It may be added at a later stage by the user
    if (!MatrixClientPeg/* MatrixClientPeg */.p.get().getIdentityServerUrl() && _validAddressTypes.includes(UserAddress/* AddressType */.DL.Email)) {
      _validAddressTypes = _validAddressTypes.filter(type => type !== UserAddress/* AddressType */.DL.Email);
    }
    this.state = {
      invalidAddressError: false,
      selectedList: [],
      busy: false,
      searchError: null,
      serverSupportsUserDirectory: true,
      query: "",
      suggestedList: [],
      validAddressTypes: _validAddressTypes
    };
  }
  componentDidMount() {
    if (this.props.focus) {
      // Set the cursor at the end of the text input
      this.textinput.current.value = this.props.value;
    }
  }
  getPlaceholder() {
    const {
      placeholder
    } = this.props;
    if (typeof placeholder === "string") {
      return placeholder;
    }
    // Otherwise it's a function, as checked by prop types.
    return placeholder(this.state.validAddressTypes);
  }
  doNaiveGroupSearch(query) {
    const lowerCaseQuery = query.toLowerCase();
    this.setState({
      busy: true,
      query,
      searchError: null
    });
    MatrixClientPeg/* MatrixClientPeg */.p.get().getGroupUsers(this.props.groupId).then(resp => {
      const results = [];
      resp.chunk.forEach(u => {
        const userIdMatch = u.user_id.toLowerCase().includes(lowerCaseQuery);
        const displayNameMatch = (u.displayname || '').toLowerCase().includes(lowerCaseQuery);
        if (!(userIdMatch || displayNameMatch)) {
          return;
        }
        results.push({
          user_id: u.user_id,
          avatar_url: u.avatar_url,
          display_name: u.displayname
        });
      });
      this.processResults(results, query);
    }).catch(err => {
      console.error('Error whilst searching group rooms: ', err);
      this.setState({
        searchError: err.errcode ? err.message : (0,languageHandler._t)('Something went wrong!')
      });
    }).then(() => {
      this.setState({
        busy: false
      });
    });
  }
  doNaiveGroupRoomSearch(query) {
    const lowerCaseQuery = query.toLowerCase();
    const results = [];
    GroupStore/* default */.ZP.getGroupRooms(this.props.groupId).forEach(r => {
      const nameMatch = (r.name || '').toLowerCase().includes(lowerCaseQuery);
      const topicMatch = (r.topic || '').toLowerCase().includes(lowerCaseQuery);
      const aliasMatch = (r.canonical_alias || '').toLowerCase().includes(lowerCaseQuery);
      if (!(nameMatch || topicMatch || aliasMatch)) {
        return;
      }
      results.push({
        room_id: r.room_id,
        avatar_url: r.avatar_url,
        name: r.name || r.canonical_alias
      });
    });
    this.processResults(results, query);
    this.setState({
      busy: false
    });
  }
  doRoomSearch(query) {
    const lowerCaseQuery = query.toLowerCase();
    const rooms = MatrixClientPeg/* MatrixClientPeg */.p.get().getRooms();
    const results = [];
    rooms.forEach(room => {
      let rank = Infinity;
      const nameEvent = room.currentState.getStateEvents('m.room.name', '');
      const name = nameEvent ? nameEvent.getContent().name : '';
      const canonicalAlias = room.getCanonicalAlias();
      const aliasEvents = room.currentState.getStateEvents('m.room.aliases');
      const aliases = aliasEvents.map(ev => ev.getContent().aliases).reduce((a, b) => {
        return a.concat(b);
      }, []);
      const nameMatch = (name || '').toLowerCase().includes(lowerCaseQuery);
      let aliasMatch = false;
      let shortestMatchingAliasLength = Infinity;
      aliases.forEach(alias => {
        if ((alias || '').toLowerCase().includes(lowerCaseQuery)) {
          aliasMatch = true;
          if (shortestMatchingAliasLength > alias.length) {
            shortestMatchingAliasLength = alias.length;
          }
        }
      });
      if (!(nameMatch || aliasMatch)) {
        return;
      }
      if (aliasMatch) {
        // A shorter matching alias will give a better rank
        rank = shortestMatchingAliasLength;
      }
      const avatarEvent = room.currentState.getStateEvents('m.room.avatar', '');
      const avatarUrl = avatarEvent ? avatarEvent.getContent().url : undefined;
      results.push({
        rank,
        room_id: room.roomId,
        avatar_url: avatarUrl,
        name: name || canonicalAlias || aliases[0] || (0,languageHandler._t)('Unnamed Room')
      });
    });

    // Sort by rank ascending (a high rank being less relevant)
    const sortedResults = results.sort((a, b) => {
      return a.rank - b.rank;
    });
    this.processResults(sortedResults, query);
    this.setState({
      busy: false
    });
  }
  doUserDirectorySearch(query) {
    this.setState({
      busy: true,
      query,
      searchError: null
    });
    MatrixClientPeg/* MatrixClientPeg */.p.get().searchUserDirectory({
      term: query
    }).then(resp => {
      // The query might have changed since we sent the request, so ignore
      // responses for anything other than the latest query.
      if (this.state.query !== query) {
        return;
      }
      this.processResults(resp.results, query);
    }).catch(err => {
      console.error('Error whilst searching user directory: ', err);
      this.setState({
        searchError: err.errcode ? err.message : (0,languageHandler._t)('Something went wrong!')
      });
      if (err.errcode === 'M_UNRECOGNIZED') {
        this.setState({
          serverSupportsUserDirectory: false
        });
        // Do a local search immediately
        this.doLocalSearch(query);
      }
    }).then(() => {
      this.setState({
        busy: false
      });
    });
  }
  doLocalSearch(query) {
    this.setState({
      query,
      searchError: null
    });
    const queryLowercase = query.toLowerCase();
    const results = [];
    MatrixClientPeg/* MatrixClientPeg */.p.get().getUsers().forEach(user => {
      if (user.userId.toLowerCase().indexOf(queryLowercase) === -1 && user.displayName.toLowerCase().indexOf(queryLowercase) === -1) {
        return;
      }

      // Put results in the format of the new API
      results.push({
        user_id: user.userId,
        display_name: user.displayName,
        avatar_url: user.avatarUrl
      });
    });
    this.processResults(results, query);
  }
  processResults(results, query) {
    const suggestedList = [];
    results.forEach(result => {
      if (result.room_id) {
        const client = MatrixClientPeg/* MatrixClientPeg */.p.get();
        const room = client.getRoom(result.room_id);
        if (room) {
          const tombstone = room.currentState.getStateEvents('m.room.tombstone', '');
          if (tombstone && tombstone.getContent() && tombstone.getContent()["replacement_room"]) {
            const replacementRoom = client.getRoom(tombstone.getContent()["replacement_room"]);

            // Skip rooms with tombstones where we are also aware of the replacement room.
            if (replacementRoom) return;
          }
        }
        suggestedList.push({
          addressType: 'mx-room-id',
          address: result.room_id,
          displayName: result.name,
          avatarMxc: result.avatar_url,
          isKnown: true
        });
        return;
      }
      if (!this.props.includeSelf && result.user_id === MatrixClientPeg/* MatrixClientPeg */.p.get().credentials.userId) {
        return;
      }

      // Return objects, structure of which is defined
      // by UserAddressType
      suggestedList.push({
        addressType: 'mx-user-id',
        address: result.user_id,
        displayName: result.display_name,
        avatarMxc: result.avatar_url,
        isKnown: true
      });
    });

    // If the query is a valid address, add an entry for that
    // This is important, otherwise there's no way to invite
    // a perfectly valid address if there are close matches.
    const addrType = (0,UserAddress/* getAddressType */.hZ)(query);
    if (this.state.validAddressTypes.includes(addrType)) {
      if (addrType === 'email' && !email/* looksValid */.s(query)) {
        this.setState({
          searchError: (0,languageHandler._t)("That doesn't look like a valid email address")
        });
        return;
      }
      suggestedList.unshift({
        addressType: addrType,
        address: query,
        isKnown: false
      });
      if (this.cancelThreepidLookup) this.cancelThreepidLookup();
      if (addrType === 'email') {
        this.lookupThreepid(addrType, query);
      }
    }
    this.setState({
      suggestedList,
      invalidAddressError: false
    }, () => {
      if (this.addressSelector.current) this.addressSelector.current.moveSelectionTop();
    });
  }
  addAddressesToList(addressTexts) {
    const selectedList = this.state.selectedList.slice();
    let hasError = false;
    addressTexts.forEach(addressText => {
      addressText = addressText.trim();
      const addrType = (0,UserAddress/* getAddressType */.hZ)(addressText);
      const addrObj = {
        addressType: addrType,
        address: addressText,
        isKnown: false
      };
      if (!this.state.validAddressTypes.includes(addrType)) {
        hasError = true;
      } else if (addrType === 'mx-user-id') {
        const user = MatrixClientPeg/* MatrixClientPeg */.p.get().getUser(addrObj.address);
        if (user) {
          addrObj.displayName = user.displayName;
          addrObj.avatarMxc = user.avatarUrl;
          addrObj.isKnown = true;
        }
      } else if (addrType === 'mx-room-id') {
        const room = MatrixClientPeg/* MatrixClientPeg */.p.get().getRoom(addrObj.address);
        if (room) {
          addrObj.displayName = room.name;
          addrObj.isKnown = true;
        }
      }
      selectedList.push(addrObj);
    });
    this.setState({
      selectedList,
      suggestedList: [],
      query: "",
      invalidAddressError: hasError ? true : this.state.invalidAddressError
    });
    if (this.cancelThreepidLookup) this.cancelThreepidLookup();
    return hasError ? null : selectedList;
  }
  async lookupThreepid(medium, address) {
    let cancelled = false;
    // Note that we can't safely remove this after we're done
    // because we don't know that it's the same one, so we just
    // leave it: it's replacing the old one each time so it's
    // not like they leak.
    this.cancelThreepidLookup = function () {
      cancelled = true;
    };

    // wait a bit to let the user finish typing
    await (0,utils/* sleep */._v)(500);
    if (cancelled) return null;
    try {
      const authClient = new IdentityAuthClient/* default */.Z();
      const identityAccessToken = await authClient.getAccessToken();
      if (cancelled) return null;
      const lookup = await MatrixClientPeg/* MatrixClientPeg */.p.get().lookupThreePid(medium, address, undefined /* callback */, identityAccessToken);
      if (cancelled || lookup === null || !lookup.mxid) return null;
      const profile = await MatrixClientPeg/* MatrixClientPeg */.p.get().getProfileInfo(lookup.mxid);
      if (cancelled || profile === null) return null;
      this.setState({
        suggestedList: [{
          // a UserAddressType
          addressType: medium,
          address: address,
          displayName: profile.displayname,
          avatarMxc: profile.avatar_url,
          isKnown: true
        }]
      });
    } catch (e) {
      console.error(e);
      this.setState({
        searchError: (0,languageHandler._t)('Something went wrong!')
      });
    }
  }
  getFilteredSuggestions() {
    // map addressType => set of addresses to avoid O(n*m) operation
    const selectedAddresses = {};
    this.state.selectedList.forEach(({
      address,
      addressType
    }) => {
      if (!selectedAddresses[addressType]) selectedAddresses[addressType] = new Set();
      selectedAddresses[addressType].add(address);
    });

    // Filter out any addresses in the above already selected addresses (matching both type and address)
    return this.state.suggestedList.filter(({
      address,
      addressType
    }) => {
      return !(selectedAddresses[addressType] && selectedAddresses[addressType].has(address));
    });
  }
  render() {
    let inputLabel;
    if (this.props.description) {
      inputLabel = /*#__PURE__*/react.createElement("div", {
        className: "mx_AddressPickerDialog_label"
      }, /*#__PURE__*/react.createElement("label", {
        htmlFor: "textinput"
      }, this.props.description));
    }
    const query = [];
    // create the invite list
    if (this.state.selectedList.length > 0) {
      for (let i = 0; i < this.state.selectedList.length; i++) {
        query.push( /*#__PURE__*/react.createElement(AddressTile, {
          key: i,
          address: this.state.selectedList[i],
          canDismiss: true,
          onDismissed: this.onDismissed(i),
          showAddress: this.props.pickerType === 'user'
        }));
      }
    }

    // Add the query at the end
    query.push( /*#__PURE__*/react.createElement("textarea", {
      key: this.state.selectedList.length,
      onPaste: this.onPaste,
      rows: 1,
      id: "textinput",
      ref: this.textinput,
      className: "mx_AddressPickerDialog_input",
      onChange: this.onQueryChanged,
      placeholder: this.getPlaceholder(),
      defaultValue: this.props.value,
      autoFocus: this.props.focus
    }));
    const filteredSuggestedList = this.getFilteredSuggestions();
    let error;
    let addressSelector;
    if (this.state.invalidAddressError) {
      const validTypeDescriptions = this.state.validAddressTypes.map(t => (0,languageHandler._t)(addressTypeName[t]));
      error = /*#__PURE__*/react.createElement("div", {
        className: "mx_AddressPickerDialog_error"
      }, (0,languageHandler._t)("You have entered an invalid address."), /*#__PURE__*/react.createElement("br", null), (0,languageHandler._t)("Try using one of the following valid address types: %(validTypesList)s.", {
        validTypesList: validTypeDescriptions.join(", ")
      }));
    } else if (this.state.searchError) {
      error = /*#__PURE__*/react.createElement("div", {
        className: "mx_AddressPickerDialog_error"
      }, this.state.searchError);
    } else if (this.state.query.length > 0 && filteredSuggestedList.length === 0 && !this.state.busy) {
      error = /*#__PURE__*/react.createElement("div", {
        className: "mx_AddressPickerDialog_error"
      }, (0,languageHandler._t)("No results"));
    } else {
      addressSelector = /*#__PURE__*/react.createElement(AddressSelector, {
        ref: this.addressSelector,
        addressList: filteredSuggestedList,
        showAddress: this.props.pickerType === 'user',
        onSelected: this.onSelected,
        truncateAt: TRUNCATE_QUERY_LIST
      });
    }
    let identityServer;
    // If picker cannot currently accept e-mail but should be able to
    if (this.props.pickerType === 'user' && !this.state.validAddressTypes.includes(UserAddress/* AddressType */.DL.Email) && this.props.validAddressTypes.includes(UserAddress/* AddressType */.DL.Email)) {
      const defaultIdentityServerUrl = (0,IdentityServerUtils/* getDefaultIdentityServerUrl */.P_)();
      if (defaultIdentityServerUrl) {
        identityServer = /*#__PURE__*/react.createElement("div", {
          className: "mx_AddressPickerDialog_identityServer"
        }, (0,languageHandler._t)("Use an identity server to invite by email. " + "<default>Use the default (%(defaultIdentityServerName)s)</default> " + "or manage in <settings>Settings</settings>.", {
          defaultIdentityServerName: (0,UrlUtils/* abbreviateUrl */.FB)(defaultIdentityServerUrl)
        }, {
          default: sub => /*#__PURE__*/react.createElement("a", {
            href: "#",
            onClick: this.onUseDefaultIdentityServerClick
          }, sub),
          settings: sub => /*#__PURE__*/react.createElement("a", {
            href: "#",
            onClick: this.onManageSettingsClick
          }, sub)
        }));
      } else {
        identityServer = /*#__PURE__*/react.createElement("div", {
          className: "mx_AddressPickerDialog_identityServer"
        }, (0,languageHandler._t)("Use an identity server to invite by email. " + "Manage in <settings>Settings</settings>.", {}, {
          settings: sub => /*#__PURE__*/react.createElement("a", {
            href: "#",
            onClick: this.onManageSettingsClick
          }, sub)
        }));
      }
    }
    return /*#__PURE__*/react.createElement(BaseDialog/* default */.Z, {
      className: "mx_AddressPickerDialog",
      onKeyDown: this.onKeyDown,
      onFinished: this.props.onFinished,
      title: this.props.title
    }, inputLabel, /*#__PURE__*/react.createElement("div", {
      className: "mx_Dialog_content"
    }, /*#__PURE__*/react.createElement("div", {
      className: "mx_AddressPickerDialog_inputContainer"
    }, query), error, addressSelector, this.props.extraNode, identityServer), /*#__PURE__*/react.createElement(DialogButtons/* default */.Z, {
      primaryButton: this.props.button,
      onPrimaryButtonClick: this.onButtonClick,
      onCancel: this.onCancel
    }));
  }
}
(0,defineProperty/* default */.Z)(AddressPickerDialog, "defaultProps", {
  value: "",
  focus: true,
  validAddressTypes: UserAddress/* addressTypes */.vE,
  pickerType: 'user',
  includeSelf: false
});
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/QuestionDialog.js
var QuestionDialog = __webpack_require__(433773);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/ErrorDialog.tsx
var ErrorDialog = __webpack_require__(705636);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/dialogs/BugReportDialog.tsx
var BugReportDialog = __webpack_require__(758795);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/AccessibleButton.tsx
var AccessibleButton = __webpack_require__(805035);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Field.tsx
var Field = __webpack_require__(455537);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Tooltip.tsx
var Tooltip = __webpack_require__(578413);
// EXTERNAL MODULE: ./node_modules/matrix-react-sdk/src/components/views/elements/Spinner.tsx
var Spinner = __webpack_require__(641542);
;// CONCATENATED MODULE: ./node_modules/matrix-react-sdk/src/common-components.js













const components = {
  'avatars.RoomAvatar': RoomAvatar/* default */.Z,
  'avatars.BaseAvatar': BaseAvatar/* default */.Z,
  'dialogs.BaseDialog': BaseDialog/* default */.Z,
  'dialogs.InteractiveAuthDialog': InteractiveAuthDialog/* default */.Z,
  'dialogs.AddressPickerDialog': AddressPickerDialog,
  'dialogs.QuestionDialog': QuestionDialog/* default */.Z,
  'dialogs.ErrorDialog': ErrorDialog/* default */.Z,
  'dialogs.BugReportDialog': BugReportDialog/* default */.Z,
  // 'emojipicker.ReactionPicker': 1,

  'elements.Field': Field/* default */.Z,
  'elements.AccessibleButton': AccessibleButton/* default */.Z,
  'elements.Tooltip': Tooltip/* default */.Z,
  'elements.Spinner': Spinner/* default */.Z,
  'elements.DialogButtons': DialogButtons/* default */.Z
};

/***/ }),

/***/ 733926:
/***/ ((module) => {

module.exports = "img/icon-address-delete.40c8a04.svg";

/***/ }),

/***/ 240183:
/***/ ((module) => {

module.exports = "img/icon-email-user.af133ff.svg";

/***/ })

}]);
//# sourceMappingURL=2771.js.map