(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "15c8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var quasar_src_plugins_Notify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a19");
/* harmony import */ var quasar_src_utils_scroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0831");
/* harmony import */ var quasar_src_utils_date_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("bd4c");
/* harmony import */ var _firebaseInit_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("1261");
/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4272");
/* eslint-disable indent */

/**
 *  This class contains all methods shared between the pages and components
 *  (mostly used for EditRoundtrips and RoundtripDetails & their components)
 */
let getAxios = () => __webpack_require__.e(/* import() */ 0).then(__webpack_require__.t.bind(null, "bc3a", 7));

var querystring = __webpack_require__("b383");




const {
  setScrollPosition,
  getScrollTarget
} = quasar_src_utils_scroll_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"];


/* harmony default export */ __webpack_exports__["a"] = ({
  /**
   * @returns a date from a date string in format dd.mm.yy MM:hh
   * @param {String} string date string to get date from
   */
  getDateFromString(string) {
    let dateParts;
    let timeParts = ['00', '00'];

    if (string.includes(' ')) {
      const dateTimeParts = string.split(' ');
      dateParts = dateTimeParts[0].split('.');
      timeParts = dateTimeParts[1].split(':');
    } else {
      dateParts = string.split('.');
    }

    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00');
  },

  /**
   * check if a date time string is valid
   * @param {String} testDate date to check
   */
  isDateTimeValid(testDate) {
    if (!testDate || testDate === null || testDate.length === 0) return false;
    var matches = testDate.match(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/);
    if (matches === null) return false;
    var year = parseInt(matches[3], 10);
    var month = parseInt(matches[2], 10) - 1;
    var day = parseInt(matches[1], 10);
    var hour = parseInt(matches[4], 10);
    var minute = parseInt(matches[5], 10);
    var date = new Date(year, month, day, hour, minute);

    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day || date.getHours() !== hour || date.getMinutes() !== minute) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * Sets all expansion states of all stops to true (expanded)
   * @param {*} context context of file
   * @param {array} stops list of all stops
   */
  expandAllStops(context, stops) {
    stops.forEach(stop => {
      if (context.allStopsExpanded) {
        if (context.$refs[stop.DocId]) context.$refs[stop.DocId][0].changeExpansion(true);
      } else context.$refs[stop.DocId][0].changeExpansion(context.currentExpansionStates[context.currentExpansionStates.findIndex(x => x.docId === stop.DocId)].expanded);
    });
  },

  /**
   * Change the expansion of one stop
   * @param {*} context context of file
   * @param {*} event event called from expansion item
   */
  expansionChanged(context, event) {
    context.allStopsExpanded = false;
    context.currentExpansionStates[context.currentExpansionStates.findIndex(x => x.docId === event.docId)].expanded = event.expanded;
  },

  /**
   * Filter airport suggestions for select element
   * @param {String} val search term
   * @param {boolean} originSearch search for origin or depature
   * @param {*} context context of file
   */
  filterAirports(val, update, abort, originSearch, context) {
    if (val.length < 3) {
      abort();
      return;
    }

    if (val.length >= 3) {
      this.fetchAirports(val).then(results => {
        update(() => {
          if (!results) return false;

          if (originSearch) {
            context.originOptions = [];
            context.originCodes = [];
          } else {
            context.destinationOptions = [];
            context.destinationCodes = [];
          }

          results.data.data.forEach(city => {
            if (originSearch) {
              context.originOptions.push(this.capitalize(city.address.cityName) + ' (' + city.iataCode + ')');
              context.originCodes.push(city.iataCode);
            } else {
              context.destinationOptions.push(this.capitalize(city.address.cityName) + ' (' + city.iataCode + ')');
              context.destinationCodes.push(city.iataCode);
            }
          });
        }).catch(e => {
          return false;
        });
      });
    }
  },

  /**
   * Fetch ariport suggestions for a search term
   * @param {*} val search term
   */
  fetchAirports(val) {
    return new Promise((resolve, reject) => {
      getAxios().then(axios => {
        const url = 'https://api.amadeus.com/v1/security/oauth2/token';
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        const data = querystring.stringify({
          grant_type: 'client_credentials',
          client_id: 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
          client_secret: 'lHQlUheyyAZtGQDA'
        });
        axios.post(url, data, {
          headers: headers,
          form: {
            'grant_type': 'client_credentials',
            'client_id': 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
            'client_secret': 'lHQlUheyyAZtGQDA'
          }
        }).then(function (response) {
          let token = response.data.access_token;
          const tokenString = 'Bearer ' + token;
          axios.get('https://api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&view=LIGHT&keyword=' + val, {
            headers: {
              'Authorization': tokenString
            }
          }).then(function (response) {
            resolve(response);
          }).catch(function (error) {
            console.log('Error' + error);
            resolve(null);
          });
        }).catch(function (error) {
          console.log('Error on Authentication' + error);
          resolve(null);
        });
      }).catch(function (error) {
        console.log('Error ' + error);
        resolve(null);
      });
    });
  },

  /**
   * @return a string date from given timestamp
   */
  getStringDateFromTimestamp(timestamp) {
    const initDate = new Date(timestamp.seconds * 1000);
    return quasar_src_utils_date_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"].formatDate(initDate, 'DD.MM.YYYY HH:mm');
  },

  /**
   * Capitalizes the given string
   */
  capitalize(s) {
    s = s.toLowerCase();
    s = s.charAt(0).toUpperCase() + s.slice(1);
    return s;
  },

  /**
   * Display a quasar notify error message
   */
  showErrorNotification(message) {
    quasar_src_plugins_Notify_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].create({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: message
    });
  },

  /**
   * Display a quasar notify success message
   */
  showSuccessNotification(message) {
    quasar_src_plugins_Notify_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].create({
      color: 'green-4',
      textColor: 'white',
      icon: 'check_circle',
      message: message
    });
  },

  /**
   * Scroll to a specific offset
   * @param {Number} offset numer in pixels from top
   */
  scrollToOffset(offset) {
    setScrollPosition(document.documentElement, offset, 400);
  },

  /**
   * Scrolls to a element
   * @param refName element get via $refs
   */
  scrollToRef(el) {
    const target = getScrollTarget(el);
    const offset = el.offsetTop;
    setScrollPosition(target, offset, 400);
  },

  /**
   * creates a string from milliseconds (fontmat: 5h 10min)
   * @param duration the milliseconds to format
   */
  msToTime(duration) {
    var ms = duration % 1000;
    duration = (duration - ms) / 1000;
    var secs = duration % 60;
    duration = (duration - secs) / 60;
    var minutes = duration % 60;
    duration = (duration - minutes) / 60;
    var hours = duration % 24;
    duration = (duration - hours) / 24;
    var days = duration % 24;
    let returnVal = '';
    if (days === 0 && hours === 0 && minutes === 0) returnVal = 0;else if (days < 0 || hours < 0 || minutes < 0) returnVal = null;
    if (days && days > 0) returnVal += days + ' Tag ';
    if (hours && hours > 0) returnVal += hours + 'h ';
    if (minutes && minutes > 0) returnVal += minutes + 'min ';
    return returnVal;
  },

  /**
   * gets data from wikivoyage for a given page name
   * @param {string} pageName the page name to get data from
   * @returns {object} object that contains title, shortDescription, description and imgSrc for the given page
   */
  getWikivoyageData(pageName) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json; charset=UTF-8'
      };
      let returnData = {};
      getAxios().then(axios => {
        axios.get('https://de.wikipedia.org/w/api.php?action=query&origin=*&format=json&exsentences=2&prop=description%7Cextracts%7Cpageimages&titles=' + pageName + '&exintro=1&explaintext=1&piprop=name%7Coriginal', {
          headers: headers
        }).then(function (response) {
          const pages = response.data.query.pages;
          const firstPageName = Object.keys(pages)[0];
          returnData.title = pages[firstPageName].title;
          returnData.shortDescription = pages[firstPageName].description;
          returnData.description = pages[firstPageName].extract;
          returnData.imgSrc = pages[firstPageName].original ? pages[firstPageName].original.source : '';
          resolve(returnData);
        }).catch(function (error) {
          console.log('Error' + error);
          resolve(null);
        });
      }).catch(function (error) {
        console.log('Error ' + error);
        resolve(null);
      });
    });
  },

  getGooglePlacesData(lat, lng) {
    return new Promise((resolve, reject) => {
      const loader = new _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_4__[/* Loader */ "a"]({
        apiKey: 'AIzaSyBVkBCl3dY49g3lyX8ns1SYsErNdkCO8sc',
        version: 'weekly',
        libraries: ['places']
      }); // google is available here

      loader.load().then(() => {
        // eslint-disable-next-line no-undef
        let map = new google.maps.Map(document.createElement('div'), {}); // eslint-disable-next-line no-undef

        let service = new google.maps.places.PlacesService(map);
        let request = {
          radius: 5000,
          language: 'de',
          type: 'tourist_attraction',
          location: {
            'lat': parseFloat(lat),
            'lng': parseFloat(lng)
          }
        };
        service.nearbySearch(request, response => {
          let returnDataArr = [];
          response.forEach(poi => {
            let returnData = {};
            returnData.name = poi.name;
            returnData.photoUrl = poi.photos[0].getUrl();
            returnData.placeId = poi.place_id;
            returnData.rating = poi.rating;
            returnData.totalRatings = poi.user_ratings_total;
            returnData.location = poi.geometry.location;
            returnData.location.lat = returnData.location.lat();
            returnData.location.lng = returnData.location.lng();
            returnData.nowOpen = poi.opening_hours ? poi.opening_hours.open_now : false;
            returnData.location.label = poi.vicinity;
            returnData.tags = poi.types;
            returnDataArr.push(returnData);
          });
          resolve(returnDataArr);
        });
      }); //     const headers = {
      //         'Content-Type': 'application/json; charset=UTF-8'
      //     }
      //     getAxios().then(axios => {
      //         axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=5000&language=de&type=tourist_attraction&key=AIzaSyBVkBCl3dY49g3lyX8ns1SYsErNdkCO8sc',
      //             { headers: headers })
      //             .then(function (response) {
      //                 console.log(response)
      //                 let returnDataArr = []
      //                 const results = response.data.results
      //                 results.forEach(poi => {
      //                     let returnData = {}
      //                     returnData.name = poi.name
      //                     returnData.photoReference = poi.photos[0].photo_reference
      //                     returnData.placeId = poi.place_id
      //                     returnData.rating = poi.rating
      //                     returnData.totalRatings = poi.user_ratings_total
      //                     returnData.location = poi.geometry.location
      //                     returnData.location.label = poi.vicinity
      //                     returnData.tags = poi.types
      //                     returnDataArr.push(returnData)
      //                 })
      //                 resolve(returnDataArr)
      //             }).catch(function (error) {
      //                 console.log('Error' + error)
      //                 resolve(null)
      //             })
      //     }).catch(function (error) {
      //         console.log('Error ' + error)
      //         resolve(null)
      //     })
    });
  },

  /**
   * check if there is no other roundtrip with given name
   */
  isUniqueTitle(value) {
    return new Promise((resolve, reject) => {
      value = value.toLowerCase();
      value = value.charAt(0).toUpperCase() + value.slice(1);
      value = value.trim();
      let roundtripsRef = _firebaseInit_js__WEBPACK_IMPORTED_MODULE_3__[/* db */ "b"].collection('Roundtrips').where('Title', '==', value).limit(1);
      roundtripsRef.get().then(snapshot => {
        resolve(snapshot.size === 0 || 'Dieser Titel ist bereits vergeben');
      }).catch(function (error) {
        console.log('Error ' + error);
        resolve(null);
      });
    });
  },

  /**
   * gets a parent component
   * @param {String} name name of the parent to get
   */
  getParent(name, context) {
    let p = context.$parent;

    while (typeof p !== 'undefined') {
      if (p.$options.name === name) {
        return p;
      } else {
        p = p.$parent;
      }
    }

    return false;
  },

  /**
   * gets suggested sights from amadeus api for given coordinates
   */
  getSights(long, lat) {
    return new Promise((resolve, reject) => {
      const url = 'https://api.amadeus.com/v1/security/oauth2/token';
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      const data = querystring.stringify({
        grant_type: 'client_credentials',
        // gave the values directly for testing
        client_id: 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
        client_secret: 'lHQlUheyyAZtGQDA'
      });
      getAxios().then(axios => {
        axios.post(url, data, {
          headers: headers,
          form: {
            'grant_type': 'client_credentials',
            'client_id': 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
            'client_secret': 'lHQlUheyyAZtGQDA'
          }
        }).then(function (response) {
          let token = response.data.access_token;
          const tokenString = 'Bearer ' + token;
          console.log(token);
          axios.get('https://api.amadeus.com/v1/reference-data/locations/pois?latitude=' + lat + '&longitude=' + long + '&radius=10&page[limit]=5&page[offset]=0&categories=SIGHTS', {
            headers: {
              'Authorization': tokenString
            }
          }).then(function (response) {
            resolve(response);
          }).catch(function (error) {
            console.log('Error' + error);
            resolve(null);
          });
        }).catch(function (error) {
          console.log('Error on Authentication' + error);
          resolve(null);
        });
      });
    });
  }

});

/***/ }),

/***/ "1b01":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/PublicUserProfile.vue?vue&type=template&id=4f1955dc&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"public-user-profile  q-px-lg q-pb-md"},[_c('router-link',{attrs:{"to":"/benutzer"}},[_vm._v(_vm._s(!_vm.isOnPrivateUserPage ? 'zurück zu allen Nutzern' : 'User Ranking ansehen'))]),_c('h3',{staticClass:"user-name"},[_vm._v(_vm._s(_vm.userName)+" "+_vm._s(!isNaN(_vm.reputation) ? '(Reputation: ' + _vm.reputation + ')' : '')+"\n    "),(_vm.trustedUser)?_c('q-badge',{staticStyle:{"border-radius":"50%","padding":"2px","padding-top":"2.5px"},attrs:{"align":"top","color":"blue"}},[_c('q-icon',{attrs:{"name":"done","color":"white","size":"18px"}}),_c('q-tooltip',[_vm._v("Dies ist ein von Roundtrips4you anerkannter User")])],1):_vm._e(),(_vm.userName === 'Roundtrips4you')?_c('q-badge',{staticStyle:{"border-radius":"50%","padding":"2px","padding-top":"2.5px"},attrs:{"align":"top","color":"primary"}},[_c('q-icon',{attrs:{"name":"star","color":"white","size":"18px"}}),_c('q-tooltip',[_vm._v("Dies ist der Account von Roundtrips4you : )")])],1):_vm._e()],1),(_vm.userSince)?_c('span',[_vm._v("Mitglied seit "+_vm._s(_vm.userSince))]):_vm._e(),_c('br'),(_vm.companyWebsite)?_c('span',[_vm._v("Unternehmenswebsite:\n    "),_c('a',{on:{"click":function($event){return _vm.openInNewTab(_vm.companyWebsite)}}},[_vm._v(_vm._s(_vm.companyWebsite))])]):_vm._e(),_c('br'),(_vm.companyDescription)?_c('span',{staticStyle:{"max-width":"460px"}},[_vm._v("\n    "+_vm._s(_vm.companyDescription)+"\n  ")]):_vm._e(),_c('div',{staticClass:"flex justify-between details-container",staticStyle:{"margin-top":"10px"}},[_c('div',[_c('h3',[_vm._v("Reputation")]),_c('ul',[_c('li',[_vm._v("100 für \"Nutzer der 1. Stunde\" Badge")]),_c('li',[_vm._v(_vm._s(_vm.publishedRoundtrips ? _vm.publishedRoundtrips * 50 : 0)+" für veröffentlichte Rundreisen")]),_c('li',[_vm._v(_vm._s(_vm.userRTEdited ? _vm.userRTEdited * 25 : 0)+" für eigene Rundreisen die bearbeitet wurden")])])]),_c('div',[_c('h3',[_vm._v("Inhalte")]),_c('ul',[_c('li',[_vm._v(_vm._s(_vm.publishedRoundtrips)+" öffentliche Rundreise"+_vm._s(_vm.publishedRoundtrips === 1 ? '' : 'n')+" erstellt")]),_c('li',[_vm._v(_vm._s(_vm.userRTEdited ? _vm.userRTEdited : 0)+"x wurden Reisen bereits bearbeitet")])])]),_c('div',[_c('h3'),_c('q-img',{attrs:{"width":"100px","src":_vm.userImage}})],1)]),_c('div',{staticClass:"badge-container"},[_c('h3',[_vm._v("Badges")]),_c('b',[_vm._v("Erste Schritte")]),_c('div',[_c('q-badge',{attrs:{"color":"secondary"}},[_vm._v("Nutzer der 1. Stunde")])],1),_c('b',[_vm._v("Reisen")]),_c('div',[(_vm.publishedRoundtrips < 5)?_c('q-badge',{attrs:{"disabled":_vm.publishedRoundtrips < 1,"color":"secondary"}},[_vm._v("Reiseanfänger "),_c('q-tooltip',[_vm._v("(min. 1 Reise veröffentlicht)")])],1):_vm._e(),(_vm.publishedRoundtrips <= 10)?_c('q-badge',{attrs:{"disabled":_vm.publishedRoundtrips < 5,"color":"secondary"}},[_vm._v("Reiselustiger "),_c('q-tooltip',[_vm._v("(min. 5 Reisen veröffentlicht)")])],1):_vm._e(),_c('q-badge',{attrs:{"disabled":_vm.publishedRoundtrips <= 10,"color":"secondary"}},[_vm._v("Reiseexperte "),_c('q-tooltip',[_vm._v("(mehr als 10 Reisen veröffentlicht)")])],1),_c('q-badge',{attrs:{"disabled":!_vm.userRTEdited || _vm.userRTEdited <= 5,"color":"secondary"}},[_vm._v("Reisevermittler "),_c('q-tooltip',[_vm._v("(mehr als 5 eigene Rundreisen, die bearbeitet wurden)")])],1)],1)]),_c('div',{staticClass:"roundtrip-container"},[_c('h3',[_vm._v("Veröffentlichte Reisen")]),_c('q-list',{attrs:{"bordered":_vm.createdRoundtrips.length > 0}},[(_vm.showRoundtrips)?_c('div',[(_vm.createdRoundtrips.length === 0)?_c('div',[_c('span',{staticStyle:{"font-size":"18px"}},[_vm._v(_vm._s(_vm.userName)+" hat leider noch keine Rundreisen veröffentlicht.")])]):_vm._e(),_vm._l((_vm.createdRoundtrips),function(roundtrip,index){return _c('q-item',{directives:[{name:"ripple",rawName:"v-ripple"}],key:roundtrip.RTId,attrs:{"clickable":""},on:{"click":function($event){return _vm.$router.push('/rundreise-ansehen/' + roundtrip.RTId)}}},[_c('q-item-section',{attrs:{"avatar":"","top":""}},[_c('q-avatar',{staticStyle:{"padding":"0"},attrs:{"color":"primary","text-color":"white"}},[_c('img',{attrs:{"src":_vm.TitleImgs[index]}})])],1),_c('q-item-section',[_c('q-item-label',{attrs:{"lines":"1"}},[_vm._v(_vm._s(roundtrip.Title)+" - "+_vm._s(Array.isArray(roundtrip.Location) ? _vm.getLocationString(roundtrip.Location): roundtrip.Location))]),_c('q-item-label',{staticStyle:{"width":"100px"},attrs:{"caption":""}},[_vm._v("\n              "+_vm._s(_vm.getCreatedAtDate(roundtrip.createdAt))+"\n              "),_c('q-tooltip',[_vm._v("\n                Diese Rundreise wurde am "+_vm._s(_vm.getCreatedAtDate(roundtrip.createdAt))+" erstellt\n              ")])],1)],1),_c('q-item-section',{attrs:{"side":""}},[_c('q-icon',{attrs:{"name":"keyboard_arrow_right","color":"primary"}})],1)],1)})],2):_c('div',_vm._l((3),function(n){return _c('q-item',{key:n},[_c('q-item-section',{staticStyle:{"padding":"8px 10px"},attrs:{"avatar":"","top":""}},[_c('q-skeleton',{attrs:{"size":"40px","type":"QAvatar"}})],1),_c('q-item-section',[_c('q-skeleton',{staticStyle:{"margin-bottom":"10px"},attrs:{"width":"300px","type":"rect"}}),_c('q-item-label',{attrs:{"caption":""}},[_c('q-skeleton',{attrs:{"width":"80px","type":"rect"}})],1)],1)],1)}),1)])],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/PublicUserProfile.vue?vue&type=template&id=4f1955dc&

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// EXTERNAL MODULE: ./node_modules/quasar/src/utils/date.js
var date = __webpack_require__("bd4c");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/PublicUserProfile.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
__webpack_require__.e(/* import() */ 26).then(__webpack_require__.t.bind(null, "5d80", 7));


/* harmony default export */ var PublicUserProfilevue_type_script_lang_js_ = ({
  data() {
    return {
      userName: null,
      userImage: null,
      publishedRoundtrips: 0,
      reputation: 0,
      userRTEdited: 0,
      createdRoundtrips: [],
      showRoundtrips: false,
      TitleImgs: [],
      userSince: null,
      trustedUser: false,
      title: 'User',
      companyWebsite: null,
      companyDescription: null,
      isOnPrivateUserPage: false
    };
  },

  meta() {
    return {
      title: 'Profil von ' + this.title,
      meta: {
        description: {
          name: 'description',
          content: 'Profil von ' + this.title + ' auf roundtrips4you ansehen. Reise planen komplett kostenlos, online und unkompliziert. Dein kostenloser Reiseplaner'
        }
      }
    };
  },

  created() {
    // get user data
    let UserId = this.$route.params.id;

    if (!UserId) {
      this.isOnPrivateUserPage = true;
      UserId = firebaseInit["a" /* auth */].user().uid;
    }

    console.log(UserId);

    if (UserId) {
      let userRef = firebaseInit["b" /* db */].collection('User').where('UserUID', '==', UserId).limit(1);
      userRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.userImage = doc.data().UserImage;
          this.userName = doc.data().UserName;
          this.userRTEdited = doc.data().RTEdited;
          this.userSince = this.getCreatedAtDate(doc.data().createdAt);
          this.trustedUser = !!doc.data().TrustedUser;
          this.companyWebsite = doc.data().website;
          this.companyDescription = doc.data().companyDescription;
          this.title = this.userName;
        });
      });
      this.getPublishedRoundtrips(UserId);
    }
  },

  methods: {
    getPublishedRoundtrips(userId) {
      let roundtripsRef = firebaseInit["b" /* db */].collection('Roundtrips').where('UserId', '==', userId).where('Public', '==', true);
      roundtripsRef.get().then(snapshot => {
        if (snapshot.empty) this.showRoundtrips = true;
        snapshot.forEach(doc => {
          this.publishedRoundtrips += 1;
          this.createdRoundtrips.push(doc.data());
          let roundtripDocIds = [];
          roundtripDocIds.splice(this.createdRoundtrips.findIndex(x => x.RTId === doc.data().RTId), 0, doc.id);
          let context = this;
          var fileRef = firebaseInit["c" /* storage */].ref().child('Images/Roundtrips/' + doc.id + '/Title/titleImg');
          fileRef.getDownloadURL().then(function (url) {
            context.TitleImgs.splice(roundtripDocIds.indexOf(doc.id), 0, url);
          }).catch(function (error) {
            console.log(error);
            context.TitleImgs.splice(roundtripDocIds.indexOf(doc.id), 0, '../statics/dummy-image-landscape-1-150x150.jpg');
          });
          this.showRoundtrips = true;
        });
        this.getReputation(userId);
      }).catch(function (error) {
        console.log(error);
        this.showRoundtrips = true;
      });
    },

    getReputation(userId) {
      let publicRT = this.publishedRoundtrips * 50;
      let editedRT = this.userRTEdited * 25;
      this.reputation = publicRT + editedRT + 100;
    },

    getLocationString(locations) {
      let locationString = '';
      locations.forEach((location, index) => {
        locationString = locationString + (index !== 0 ? ', ' : '') + location;
      });
      return locationString;
    },

    getCreatedAtDate(timeStamp) {
      return date["b" /* default */].formatDate(new Date(timeStamp.seconds * 1000), 'DD.MM.YYYY');
    }

  }
});
// CONCATENATED MODULE: ./src/pages/PublicUserProfile.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_PublicUserProfilevue_type_script_lang_js_ = (PublicUserProfilevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/PublicUserProfile.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_PublicUserProfilevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PublicUserProfile = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "204c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_style_index_0_id_4942ad0a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ba35");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_style_index_0_id_4942ad0a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_style_index_0_id_4942ad0a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_style_index_0_id_4942ad0a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "4f6c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Map/Map.vue?vue&type=template&id=4942ad0a&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"map",staticStyle:{"overflow":"hidden"}},[_c('q-inner-loading',{staticStyle:{"z-index":"1"},attrs:{"showing":_vm.loading}},[_c('q-spinner',{attrs:{"size":"42px","color":"primary"}}),_c('p',{staticClass:"font-medium",staticStyle:{"margin-top":"10px"}},[_vm._v("Karte wird geladen")])],1),_c('MglMap',{style:('height:' + (_vm.height ? _vm.height : '500px;')),attrs:{"accessToken":_vm.accTo,"mapStyle":_vm.mapStyle,"center":_vm.centerLocation,"zoom":6,"mapboxGl":_vm.mapbox,"attributionControl":false,"logoPosition":"bottom-left","keyboard":"","doubleClickZoom":""},on:{"update:mapStyle":function($event){_vm.mapStyle=$event},"update:map-style":function($event){_vm.mapStyle=$event},"load":_vm.onMapLoaded}},[(_vm.editor)?_c('MglGeocoderControl',{attrs:{"accessToken":_vm.accTo,"placeholder":"Ort suchen"},on:{"result":_vm.handleSearch}}):_vm._e(),_c('MglNavigationControl',{attrs:{"position":"top-right"}}),_c('MapLayerPlugin',{staticClass:"mapboxgl-ctrl",attrs:{"position":"top-right"}}),_c('q-btn',{staticStyle:{"position":"absolute","right":"9px","top":"220px"},attrs:{"color":"white","text-color":"secondary","icon":"apartment"},on:{"click":function($event){_vm.showSuggestionCountryDialog = true; _vm.showDrawerList = false; _vm.miniDisabled = true;}}}),_c('MglFullscreenControl',{attrs:{"position":"bottom-right"}}),_vm._l((_vm.stops),function(stop){return _c('MglMarker',{key:stop.DocId,ref:"stopMarker",refInFor:true,attrs:{"coordinates":stop.HotelName && stop.HotelLocation && !isNaN(stop.HotelLocation.lat) ? [stop.HotelLocation.lat, stop.HotelLocation.lng] : [stop.Location.lng, stop.Location.lat],"color":"#D56026"},on:{"click":function($event){return _vm.onMarkerClicked($event, stop.HotelLocation ? stop.HotelLocation.label : stop.Location.label )}}},[_c('MglPopup',[_c('q-card',[(stop.StopImages)?_c('q-img',{attrs:{"width":"240px","height":"135px","src":stop.StopImages[0]}}):_vm._e(),_c('q-img',{attrs:{"width":"240px","height":"135px","src":_vm.lastPOICityData.img && _vm.lastPOICityData.img.split('/')[0] === 'https:' ? _vm.lastPOICityData.img : _vm.lastPOICityData.imgSrc}}),_c('q-card-section',[_c('div',{staticClass:"font-large",staticStyle:{"line-height":"normal"}},[_vm._v("\n              "+_vm._s(stop.Title)+"\n            ")]),_c('div',{staticStyle:{"font-size":"13px"}},[_vm._v("\n              "+_vm._s(_vm.lastPOICityData.shortDescription)+"\n              "),(stop.GeneralLink && stop.GeneralLink.length > 0)?_c('p',[_c('q-icon',{attrs:{"name":"house"}}),_c('a',{attrs:{"href":stop.GeneralLink,"target":"blank"}},[_vm._v(_vm._s(_vm.capitalize(stop.HotelName)))])],1):_vm._e()])]),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"show",rawName:"v-show",value:(stop),expression:"stop"}],attrs:{"flat":"","label":"POIs","color":"secondary"},on:{"click":function($event){return _vm.showSightDetails(stop.Location.lat, stop.Location.lng)}}})],1)],1)],1)],1)}),_vm._l((_vm.stops),function(stop){return _vm._l((stop.DailyTrips),function(dailyTrip){return _c('MglMarker',{key:dailyTrip.id,attrs:{"coordinates":[dailyTrip.location.lng, dailyTrip.location.lat],"color":"#D56026"},on:{"click":function($event){return _vm.onMarkerClicked($event, dailyTrip.location.label)}}},[_c('MglPopup',[_c('q-card',[(dailyTrip.StopImages)?_c('q-img',{attrs:{"width":"240px","height":"135px","src":dailyTrip.StopImages[0]}}):_vm._e(),_c('q-card-section',[_c('div',{staticClass:"text-h6"},[_vm._v("\n                "+_vm._s(dailyTrip.location.label.split(',')[0])+" - Tagesausflug von "+_vm._s(stop.Location.label ? stop.Location.label.split(',')[0] : '')+"\n              ")]),_c('div',{staticClass:"text-subtitle2"},[_c('p',{staticStyle:{"margin-bottom":"5px"}},[_c('q-icon',{attrs:{"name":"location_on"}}),_c('a',{attrs:{"target":"_blank","href":'https://www.google.com/maps/search/?api=1&query=' + dailyTrip.location.label}},[_vm._v(_vm._s(dailyTrip.location.label))])],1)])])],1)],1)],1)})}),(_vm.editor)?_c('MglMarker',{ref:"addStopMarker",attrs:{"coordinates":_vm.lastClickCoordinates,"color":"#70707075","offset":[5, 10]},on:{"click":function($event){return _vm.onMarkerClicked($event, _vm.title)}}},[_c('MglPopup',[_c('q-card',[_c('q-img',{directives:[{name:"show",rawName:"v-show",value:(_vm.lastPOICityData.img),expression:"lastPOICityData.img"}],attrs:{"src":_vm.lastPOICityData.img && _vm.lastPOICityData.img.split('/')[0] === 'https:' ? _vm.lastPOICityData.img : _vm.lastPOICityData.imgSrc}}),_c('q-card-section',{staticStyle:{"padding-left":"10px","padding-top":"10px"}},[_c('span',{staticClass:"font-large",staticStyle:{"line-height":"normal"}},[_vm._v(_vm._s(_vm.title ? _vm.title : 'gesetzter Punkt'))]),_c('div',{staticStyle:{"font-size":"13px"}},[_vm._v("\n              "+_vm._s(_vm.lastPOICityData.shortDescription)+"\n            ")])]),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{attrs:{"flat":"","label":"Infos","color":"secondary"},on:{"click":function($event){return _vm.showSightDetails(_vm.lastClickCoordinates[1], _vm.lastClickCoordinates[0])}}}),_c('q-btn',{attrs:{"flat":"","label":"Ort hinzufügen","color":"primary"},on:{"click":_vm.addStop}})],1)],1)],1)],1):_vm._e(),_c('q-dialog',{model:{value:(_vm.showDetailsDialog),callback:function ($$v) {_vm.showDetailsDialog=$$v},expression:"showDetailsDialog"}},[(_vm.lastPOICityData)?_c('div',[_c('q-card',[_c('q-img',{attrs:{"src":_vm.lastPOICityData.img}}),_c('q-card-section',[_c('div',{staticStyle:{"padding-left":"10px","padding-top":"10px"}},[_c('span',{staticClass:"font-large"},[_vm._v(_vm._s(_vm.lastPOICityData.title))]),_c('div',[_vm._v("\n                "+_vm._s(_vm.lastPOICityData.description)+"\n              ")]),_c('div',{staticClass:"font-medium",staticStyle:{"padding-top":"20px","padding-bottom":"10px"}},[_vm._v(_vm._s(_vm.suggestedPOIs.length)+" Top Sehenswürdigkeiten")])]),_vm._l((_vm.suggestedPOIs),function(poi,index){return _c('q-card',{key:index,staticClass:"city-card cursor-pointer",attrs:{"id":'POI' + poi.name},on:{"mouseover":function($event){return _vm.markPOIOnMap(poi)},"mouseleave":function($event){return _vm.hidePOIOnMap(poi)},"click":function($event){return _vm.flyTo(poi.location.lat, poi.location.lng)}}},[_c('div',[_c('div',[(poi.photoUrl)?_c('q-img',{staticStyle:{"height":"170px"},attrs:{"alt":'Bild von'  + poi.name,"src":poi.photoUrl,"placeholder-src":"statics/dummy-image-landscape-1-150x150.jpg"}},[_c('div',{staticClass:"absolute-bottom text-h6 ellipsis"},[_vm._v(_vm._s(poi.name)+"\n                      "),_c('q-tooltip',[_vm._v(_vm._s(poi.name))])],1)]):_vm._e()],1),_c('div',{staticClass:"rating-text"},[_vm._v("\n                  "+_vm._s(poi.rating)+"\n                  "),_c('q-rating',{staticClass:"stars",staticStyle:{"margin-right":"10px"},attrs:{"value":poi.rating,"size":"15px","color":"gold","readonly":""}}),_vm._v("\n                  ("+_vm._s(poi.totalRatings)+")\n                ")],1),_c('a',{attrs:{"href":'https://www.google.com/maps/search/?api=1&query=' + poi.name,"target":"_blank"}},[_c('q-card-section',{staticStyle:{"color":"#707070"}},[_c('q-icon',{attrs:{"name":"location_on"}}),_vm._v("\n                    "+_vm._s(poi.location.label)+"\n                  ")],1)],1)])])})],2)],1)],1):_vm._e()]),_vm._l((_vm.stops),function(stop,index){return _c('div',{key:'StopContainer' + stop.DocId + index},[(stop.Parking && typeof stop.Parking !== 'undefined' && !isNaN(stop.Parking.lng))?_c('MglMarker',{key:'Stop' + stop.DocId,attrs:{"coordinates":[stop.Parking.lng, stop.Parking.lat],"color":"#D56026"},on:{"click":function($event){return _vm.onMarkerClicked($event)}}},[_c('MglPopup',[_c('q-card',[_c('div',{staticStyle:{"width":"100%","display":"flex","justify-content":"center","padding-top":"5px"}},[_c('q-icon',{attrs:{"name":"fas fa-parking","size":"30px"}})],1),_c('q-card-section',[_c('p',[_vm._v(_vm._s(stop.parkingPlace && typeof stop.parkingPlace !== 'undefined' &&  stop.parkingPlace.label && typeof stop.parkingPlace.label !== 'undefined' ? stop.Parking.label.split(',')[0] : 'Parkplatz für ' + stop.Title))])])],1)],1)],1):_vm._e()],1)}),(_vm.showCityMarkers)?_vm._l((_vm.suggestedCities),function(city,index){return _c('MglMarker',{key:city.name + index,attrs:{"coordinates":[city.longitude, city.latitude],"offset":[10, 5]},on:{"click":function($event){_vm.onMarkerClicked($event, city.name); _vm.goToCity(city.name)}}},[_c('q-icon',{ref:'cityMarkerIcon' + index,refInFor:true,attrs:{"slot":"marker","name":"place","color":"amber-14","size":"30px"},slot:"marker"}),_c('MglPopup',[_c('q-card',[_c('q-img',{directives:[{name:"show",rawName:"v-show",value:(_vm.lastPOICityData.img),expression:"lastPOICityData.img"}],attrs:{"src":_vm.lastPOICityData.img && _vm.lastPOICityData.img.split('/')[0] === 'https:' ? _vm.lastPOICityData.img : _vm.lastPOICityData.imgSrc}}),_c('q-card-section',{staticStyle:{"padding-left":"10px","padding-top":"10px"}},[_c('span',{staticClass:"font-large",staticStyle:{"line-height":"normal"}},[_vm._v(_vm._s(city.name ? city.name : 'gesetzter Punkt'))]),_c('div',{staticStyle:{"font-size":"13px"}},[_vm._v("\n                "+_vm._s(_vm.lastPOICityData.shortDescription)+"\n                "),_c('br'),_c('br'),_vm._v("\n                vorgeschlagen für "+_vm._s(_vm.suggestionCountry)+"\n              ")])]),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{attrs:{"flat":"","label":"Infos","color":"secondary"},on:{"click":function($event){return _vm.showSightDetails(city.latitude, city.longitude)}}}),_c('q-btn',{attrs:{"flat":"","label":"Ort hinzufügen","color":"primary"},on:{"click":_vm.addStop}})],1)],1)],1)],1)}):_vm._e(),(_vm.showPOIMarkers)?_vm._l((_vm.suggestedPOIs),function(poi,index){return _c('MglMarker',{key:poi.name + index,attrs:{"coordinates":[poi.location.lng, poi.location.lat],"offset":[10, 5]},on:{"click":function($event){_vm.onMarkerClicked($event, poi.name); _vm.goToCity(poi.name)}}},[_c('q-icon',{ref:'poiMarkerIcon' + index,refInFor:true,attrs:{"slot":"marker","name":"place","color":"amber-14","size":"30px"},slot:"marker"}),_c('MglPopup',[_c('q-card',[_c('q-card-section',[_c('div',{staticClass:"text-h6"},[_vm._v("\n                "+_vm._s(poi.name)+"\n              ")]),_c('p',{staticStyle:{"font-size":"14px"}},[_vm._v("vorgeschlagener Ort für "+_vm._s(poi.location.label.substring(poi.location.label.lastIndexOf(',') + 1, poi.location.label.length)))])])],1)],1)],1)}):_vm._e(),_vm._l((_vm.addedRoutes),function(route,index){return _c('MglMarker',{key:route.id + index,ref:route.id,refInFor:true,attrs:{"coordinates":route.location,"color":route.color},on:{"click":function($event){return _vm.onMarkerClicked($event)}}},[_c('q-icon',{style:({'color': route.color, 'background-color': 'white', 'border-radius': '50%'}),attrs:{"slot":"marker","name":"speed"},slot:"marker"}),_c('MglPopup',[(route.duration)?_c('q-card',[_c('div',{staticStyle:{"width":"100%","display":"flex","justify-content":"center","padding-top":"5px"}},[_c('q-icon',{attrs:{"name":"fas fa-route","size":"30px"}})],1),_c('q-card-section',[_c('div',[_vm._v(_vm._s(route.duration)+" "+_vm._s(route.origin ? 'von ' + route.origin : '')+" bis "+_vm._s(route.destination)+" "+_vm._s(route.distance !== null ? '(' + route.distance + ')' : null))]),(route.origin !== route.destination)?_c('a',{attrs:{"target":"_blank","href":'https://www.google.com/maps/dir/?api=1&origin=' + route.origin + '&destination=' + route.destination}},[_vm._v("auf Google ansehen")]):_vm._e()])],1):_c('q-card',[_c('q-card-section',[_c('div',[_vm._v(_vm._s(route.distance)+" mit dem Flugzeug "+_vm._s(_vm.addedRoutes[index -1] ? 'von ' + _vm.addedRoutes[index - 1].destination : '')+" nach "+_vm._s(route.destination))])])],1)],1)],1)})],2),_c('q-dialog',{model:{value:(_vm.showSuggestionCountryDialog),callback:function ($$v) {_vm.showSuggestionCountryDialog=$$v},expression:"showSuggestionCountryDialog"}},[_c('q-card',[_c('q-card-section',{staticClass:"font-medium"},[_c('p',[_vm._v("Land für Städtevorschläge wählen")]),_c('q-select',{attrs:{"outlined":"","use-input":"","hide-selected":"","fill-input":"","input-debounce":"0","options":_vm.countryOptions,"label":"Land auswählen","bg-color":"white","rules":[function (val) { return val !== null && val !== '' || 'Bitte wähle ein Land'; }]},on:{"filter":_vm.filterCountries,"input":function($event){_vm.showCitiesOnMap(); _vm.showSuggestionCountryDialog = false;}},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"explore"}})]},proxy:true},{key:"no-option",fn:function(){return [_c('q-item',[_c('q-item-section',{staticClass:"text-grey"},[_vm._v("\n                Keine Ergebnisse\n              ")])],1)]},proxy:true}]),model:{value:(_vm.suggestionCountry),callback:function ($$v) {_vm.suggestionCountry=$$v},expression:"suggestionCountry"}})],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Map/Map.vue?vue&type=template&id=4942ad0a&scoped=true&

// EXTERNAL MODULE: ./node_modules/mapbox-gl/dist/mapbox-gl.js
var mapbox_gl = __webpack_require__("e192");
var mapbox_gl_default = /*#__PURE__*/__webpack_require__.n(mapbox_gl);

// EXTERNAL MODULE: ./node_modules/axios/index.js
var node_modules_axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(node_modules_axios);

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// CONCATENATED MODULE: ./src/pages/CitySuggestion/CitySuggestionMethods.js
/* eslint-disable indent */


/* harmony default export */ var CitySuggestionMethods = ({
  /**
    * @returns an array of cities
    */
  getCities(country) {
    return new Promise((resolve, reject) => {
      const context = this;
      context.fetchDBSuggestions(country).then(function (response) {
        if (response.length > 0) {
          resolve(response);
        } else {
          context.fetchAPISuggestions(country).then(function (apiResponse) {
            resolve(apiResponse);
          }).catch(function (error) {
            console.log('Error' + error);
            resolve(null);
          });
        }
      }).catch(function (error) {
        console.log('Error' + error);
        resolve(null);
      });
    });
  },

  /**
    * fetch city suggestions from the database
    */
  fetchDBSuggestions(country) {
    return new Promise((resolve, reject) => {
      let tempCities = [];
      let roundtripsRef = firebaseInit["b" /* db */].collection('SuggestedCities').where('Country', '==', country).limit(1);
      roundtripsRef.get().then(snapshot => {
        if (snapshot.empty) resolve(tempCities);
        snapshot.forEach(doc => {
          let cities = doc.data().Cities;
          if (cities.length === 0) resolve(tempCities);
          cities.forEach(city => {
            let cityObject = {
              name: city.name,
              region: city.region,
              longitude: city.location ? city.location.lng : null,
              latitude: city.location ? city.location.lat : null,
              country: doc.data().Country
            };
            tempCities.push(cityObject);

            if (cities.indexOf(city) === cities.length - 1) {
              resolve(tempCities);
            }
          });
        });
      });
    });
  },

  /**
    * fetch city suggestions from geo db api
    */
  fetchAPISuggestions(country) {
    let context = this;
    return new Promise((resolve, reject) => {
      axios_default.a.get('https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=5&offset=0&namePrefix=' + country + '&languageCode=de', {
        headers: {
          'X-RapidAPI-Key': '01861af771mshb4bcca217c978fdp12121ejsnd0c4ce2c275a'
        }
      }).then(function (response) {
        // wait 2 secs because only 1 request per sec is allowed
        setTimeout(function () {
          axios_default.a.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=' + response.data.data[0].code + '&minPopulation=70000&sort=-population&languageCode=de&types=CITY', {
            headers: {
              'X-RapidAPI-Key': '01861af771mshb4bcca217c978fdp12121ejsnd0c4ce2c275a'
            }
          }).then(function (response) {
            context.writeInDB(response.data.data);
            resolve(response.data.data);
          }).catch(function (error) {
            console.log(error);
          });
        }, 2000);
      }).catch(function (error) {
        console.log('Error' + error);
      });
    });
  },

  /**
    * writes a fetched stop into the db
    */
  writeInDB(response) {
    let newCityObject = {};
    newCityObject.Cities = [];
    response.forEach((city, index) => {
      newCityObject.Country = city.country;
      if (!newCityObject.Cities.includes(city.name)) newCityObject.Cities.push({
        name: city.name,
        region: city.region,
        location: {
          lng: city.longitude,
          lat: city.latitude
        }
      });
    });
    firebaseInit["b" /* db */].collection('SuggestedCities').add(newCityObject);
  },

  /**
   * gets a image from pixabay for given city name
   */
  getCityImage(cityName, cityCountry) {
    return new Promise((resolve, reject) => {
      axios_default.a.get('https://pixabay.com/api/?key=14851178-b5e8b2cd21896ed0fc8b90fa0&lang=de&category=buildings&image_type=photo&orientation=horizontal&safesearch=true&min_height=40&per_page=3&q=' + cityName + ' ' + cityCountry, {}).then(function (response) {
        if (response.data.hits[0]) resolve({
          url: response.data.hits[0].webformatURL,
          cityName: cityName
        });else {
          axios_default.a.get('https://pixabay.com/api/?key=14851178-b5e8b2cd21896ed0fc8b90fa0&lang=de&category=buildings&image_type=photo&orientation=horizontal&safesearch=true&min_height=40&per_page=3&q=' + cityName, {}).then(function (response) {
            if (response.data.hits[0]) resolve({
              url: response.data.hits[0].webformatURL,
              cityName: cityName
            });else {
              resolve({
                url: '../../statics/dummy-image-landscape-1-150x150.jpg',
                cityName: cityName
              });
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
        resolve({
          url: '../../statics/dummy-image-landscape-1-150x150.jpg',
          cityName: cityName
        });
      });
    });
  }

});
// EXTERNAL MODULE: ./node_modules/vue-mapbox/src/main.js + 36 modules
var main = __webpack_require__("3f3d");

// EXTERNAL MODULE: ./node_modules/quasar/src/utils/date.js
var date = __webpack_require__("bd4c");

// EXTERNAL MODULE: ./src/sharedMethods.js
var sharedMethods = __webpack_require__("15c8");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Map/MapLayerPlugin.vue?vue&type=template&id=78c54d9f&
var MapLayerPluginvue_type_template_id_78c54d9f_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mapbox-ctrl mapbox-ctrl-group"},[_c('q-btn',{staticStyle:{"position":"absolute","right":"9px","top":"175px"},attrs:{"color":"white","text-color":"secondary","icon":"layers"}},[_c('q-menu',[_c('q-list',{staticStyle:{"min-width":"100px"}},[_c('q-item',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"clickable":""},on:{"click":function($event){return _vm.switchMapStyle(null)}}},[_c('q-item-section',[_vm._v("Standard")])],1),_c('q-separator'),_c('q-item',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"clickable":""},on:{"click":function($event){return _vm.switchMapStyle('nav')}}},[_c('q-item-section',[_vm._v("Navigation")])],1),_c('q-separator'),_c('q-item',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"clickable":""},on:{"click":function($event){return _vm.switchMapStyle('sat')}}},[_c('q-item-section',[_vm._v("Satellit")])],1),_c('q-separator'),_c('q-item',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"clickable":""},on:{"click":function($event){return _vm.switchMapStyle('out')}}},[_c('q-item-section',[_vm._v("Outdoor")])],1)],1)],1)],1)],1)}
var MapLayerPluginvue_type_template_id_78c54d9f_staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Map/MapLayerPlugin.vue?vue&type=template&id=78c54d9f&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Map/MapLayerPlugin.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var MapLayerPluginvue_type_script_lang_js_ = ({
  name: 'MapLayerPlugin',
  inject: ['mapbox', 'map', 'actions'],
  methods: {
    switchMapStyle(styleName) {
      let parent = sharedMethods["a" /* default */].getParent('Map', this);

      switch (styleName) {
        case 'nav':
          parent.mapStyle = 'mapbox://styles/mareiski/ckcevjmf81b7t1imouvv52xrh';
          break;

        case 'out':
          parent.mapStyle = 'mapbox://styles/mareiski/ckcew03vc12dy1imgq1eonlvt';
          break;

        case 'sat':
          parent.mapStyle = 'mapbox://styles/mareiski/ckcevopcq123g1imgb36xu37s';
          break;

        default:
          parent.mapStyle = 'mapbox://styles/mareiski/ck27d9xpx5a9s1co7c2golomn';
          break;
      }

      parent.loadMap(this.map);
    }

  }
});
// CONCATENATED MODULE: ./src/pages/Map/MapLayerPlugin.vue?vue&type=script&lang=js&
 /* harmony default export */ var Map_MapLayerPluginvue_type_script_lang_js_ = (MapLayerPluginvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/Map/MapLayerPlugin.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Map_MapLayerPluginvue_type_script_lang_js_,
  MapLayerPluginvue_type_template_id_78c54d9f_render,
  MapLayerPluginvue_type_template_id_78c54d9f_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MapLayerPlugin = (component.exports);
// EXTERNAL MODULE: ./src/countries.js
var countries = __webpack_require__("e188");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Map/Map.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const MglMap = () => Promise.resolve(/* import() */).then(__webpack_require__.bind(null, "3f3d"));

const MglGeocoderControl = () => __webpack_require__.e(/* import() */ 0).then(__webpack_require__.bind(null, "4133"));

const Mapvue_type_script_lang_js_turf = () => __webpack_require__.e(/* import() */ 0).then(__webpack_require__.t.bind(null, "595b", 7));



let Mapvue_type_script_lang_js_bounds = [];

__webpack_require__.e(/* import() */ 23).then(__webpack_require__.t.bind(null, "da58", 7));

const getAxios = () => Promise.resolve(/* import() */).then(__webpack_require__.t.bind(null, "bc3a", 7));





let hoveredStateId = null;
/* harmony default export */ var Mapvue_type_script_lang_js_ = ({
  meta: {
    link: {
      material: {
        rel: 'stylesheet',
        href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css'
      }
    }
  },
  name: 'Map',
  components: {
    MglMap,
    MglMarker: main["MglMarker"],
    MglPopup: main["MglPopup"],
    MglNavigationControl: main["MglNavigationControl"],
    MglFullscreenControl: main["MglFullscreenControl"],
    MglGeocoderControl,
    MapLayerPlugin: MapLayerPlugin
  },
  props: {
    stops: Array,
    // fallback profile if stop has nothing set
    profile: String,
    childrenAges: Array,
    adults: Number,
    rooms: Number,
    editor: Boolean,
    defaultInitDate: String,
    height: String
  },
  computed: {
    isMobile() {
      return window.matchMedia('(max-width: 550px)').matches;
    } // isTablet () {
    //   return window.matchMedia('(max-width: 958px)').matches
    // }


  },

  data() {
    return {
      accTo: 'pk.eyJ1IjoibWFyZWlza2kiLCJhIjoiY2pkaHBrd2ZnMDIyOTMzcDIyM2lra3M0eSJ9.wcM4BSKxfOmOzo67iW-nNg',
      mapStyle: 'mapbox://styles/mareiski/ck27d9xpx5a9s1co7c2golomn',
      addedRoutes: [],
      showAddStopMarker: false,
      lastClickCoordinates: [0, 0],
      lastClickLocation: {},
      title: null,
      mapbox: null,
      whitelistedLabels: ['airport-label', 'place-label', 'state-label', 'poi-label', 'settlement-label', 'natural-point-label'],
      // 'country-label',
      centerLocation: [0, 0],
      markerClicked: false,
      showDetailsDialog: false,
      drawerLeft: false,
      miniState: true,
      showDrawerList: true,
      miniDisabled: false,
      suggestedCities: [],
      showCityMarkers: false,
      showPOIMarkers: false,
      suggestedPOIs: [],
      suggestionDialogVisible: false,
      lastPOICityData: {},
      lastSightDetailsLat: 0,
      lastSightDetailsLng: 0,
      suggestionCountry: null,
      showSuggestionCountryDialog: false,
      countryOptions: countries["a" /* countries */],
      loading: true
    };
  },

  watch: {
    stops: function (val, oldVal) {
      if (val !== oldVal) {
        this.loadMap(this.map);
      }
    }
  },
  methods: {
    update(event) {
      this.$emit('update', event);
    },

    /**
     * filter countries method used in filter method of quasar select component
     */
    filterCountries(val, update, _abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.countryOptions = countries["a" /* countries */].filter(v => v.toLowerCase().indexOf(needle) > -1);
      });
    },

    onMapLoaded(event) {
      console.log('onmaploaded');
      this.loading = false;
      this.map = event.map;
      let context = this;
      this.loadMap(event.map).then(_e => {
        // wait 1 second to ensure map is realy loaded
        setTimeout(function () {
          context.fitToBounds(Mapvue_type_script_lang_js_bounds);
        }, 1000);
      });
    },

    fitToBounds(bounds) {
      try {
        if (bounds.length > 1) {
          Mapvue_type_script_lang_js_turf().then(turf => {
            var line = turf.lineString(bounds);
            var bbox = turf.bbox(line);
            this.map.fitBounds(new mapbox_gl_default.a.LngLatBounds(bbox), {
              padding: 80
            });
          });
        }
      } catch (e) {
        console.log(e);
      }
    },

    markCityOnMap(location) {
      this.changeCityMarkerSize('50px', location);
    },

    hideCityOnMap(location) {
      this.changeCityMarkerSize('30px', location);
    },

    /**
     * changes the size of the city marker for given location
     */
    changeCityMarkerSize(size, location) {
      const context = this;
      this.suggestedCities.forEach((city, index) => {
        const currentLocation = [city.latitude, city.longitude];

        if (location[0] === currentLocation[0] && location[1] === currentLocation[1]) {
          context.$refs['cityMarkerIcon' + index][0].size = size;
        }
      });
    },

    markPOIOnMap(location) {
      this.changePOIMarkerSize('50px', location);
    },

    hidePOIOnMap(location) {
      this.changePOIMarkerSize('30px', location);
    },

    /**
     * changes the size of the city marker for given location
     */
    changePOIMarkerSize(size, location) {
      const context = this;
      this.suggestedPOIs.forEach((poi, index) => {
        const currentLocation = [poi.location.lat, poi.location.lng];

        if (location[0] === currentLocation[0] && location[1] === currentLocation[1]) {
          context.$refs['poiMarkerIcon' + index][0].size = size;
        }
      });
    },

    /**
     * gets suggested cities and shows markers
     */
    showCitiesOnMap() {
      CitySuggestionMethods.getCities(this.suggestionCountry).then(response => {
        if (!response) return;
        this.suggestedCities = response;

        if (this.showPOIMarkers) {
          this.showPOIMarkers = false;
          this.showCityMarkers = true;
        } // set map to city boundaries


        let cityBounds = [];
        this.suggestedCities.forEach(city => {
          cityBounds.push([city.longitude, city.latitude]);
        });
        this.fitToBounds(cityBounds);
        this.showCityMarkers = true;
      });
    },

    goToCity(name) {
      const drawerScrollArea = this.$refs['DrawerScrollArea'];
      const el = document.getElementById('CitySuggestion' + name);
      const offset = el.offsetTop;
      drawerScrollArea.setScrollPosition(offset - 20, 400);
    },

    /**
     * shows the given pois on map
     */
    showPOIsOnMap(pois) {
      this.showCityMarkers = false;
      this.suggestedPOIs = pois;
      this.showPOIMarkers = true; // set map to city boundaries

      let poisBounds = [];
      this.suggestedPOIs.forEach(poi => {
        poisBounds.push([poi.location.lng, poi.location.lat]);
      });
      this.fitToBounds(poisBounds);
    },

    /**
    * switches the map drawer back to list (called from MapDrawerItem)
    */
    switchDrawerToList() {
      this.miniDisabled = false;
      this.miniState = true;
      this.showDrawerList = true;
      this.showCityMarkers = false;
    },

    handleSearch(event) {
      let result = event.result;

      if (!this.markerClicked) {
        this.lastClickCoordinates = result.geometry.coordinates;
        let placeName = result.place_name;
        if (placeName.includes(',')) placeName = placeName.split(',')[0];
        this.title = placeName;
        this.showAddStopMarker = true;
        this.loadMarkerInfos(placeName);
        let context = this; // we never want to hide the popup

        if (!context.$refs.addStopMarker.marker._popup.options.showed) {
          setTimeout(function () {
            context.$refs.addStopMarker.togglePopup();
          }, 100);
        }
      }

      this.markerClicked = false;
    },

    onMarkerClicked(event, title) {
      // reset the marker popup
      this.lastPOICityData = {
        title: title,
        description: '',
        shortDescription: '',
        img: '',
        imgSrc: ''
      };
      this.loadMarkerInfos(title);
      event.map.flyTo({
        center: event.component.marker._lngLat,
        speed: 0.5,
        curve: 1
      });
      this.markerClicked = true;
    },

    showSightDetails(lat, lng) {
      if (lat !== this.lastSightDetailsLat || lng !== this.lastSightDetailsLng) {
        sharedMethods["a" /* default */].getGooglePlacesData(lat, lng).then(POIArr => {
          this.suggestedPOIs = POIArr;
          this.showDetailsDialog = true;
        }).catch(e => {
          console.log(e);
        });
        this.lastSightDetailsLat = lat;
        this.lastSightDetailsLng = lng;
      } // const headers = {
      //   'Content-Type': 'application/json; charset=UTF-8'
      // }
      // let context = this
      // getAxios().then(axios => {
      //   axios.get('https://de.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=description%7Cextracts%7Cpageimages&titles=' + name + '&exintro=1&explaintext=1&piprop=name%7Coriginal',
      //     { headers: headers })
      //     .then(function (response) {
      //       const pages = response.data.query.pages
      //       const firstPageName = Object.keys(pages)[0]
      //       const title = pages[firstPageName].title
      //       const description = pages[firstPageName].description
      //       const extract = pages[firstPageName].extract
      //       const src = pages[firstPageName].original ? pages[firstPageName].original.source : ''
      //       context.sightDialog = { title: title || name, showed: true, description: description, extract: extract || 'Es konnten leider keine Informationen gefunden werden', src: src }
      //     }).catch(function (error) {
      //       console.log('Error' + error)
      //       context.sightDialog = { title: name, showed: true, description: '', extract: 'Es konnten leider keine Informationen gefunden werden', src: '' }
      //     })
      // })

    },

    addStop() {
      this.showAddStopMarker = false;
      this.lastClickLocation.label = this.title;
      this.lastClickLocation.lat = this.lastClickCoordinates[1];
      this.lastClickLocation.lng = this.lastClickCoordinates[0];

      if (this.stops[this.stops.length - 1] && this.stops[this.stops.length - 1].InitDate) {
        const initDate = this.stops[this.stops.length - 1].InitDate;
        let currentInitDate = sharedMethods["a" /* default */].getDateFromString(initDate);
        const defaultCheckOutDate = currentInitDate;
        defaultCheckOutDate.setDate(currentInitDate.getDate() + 1);
        const formattedDate = date["b" /* default */].formatDate(defaultCheckOutDate, 'DD.MM.YYYY HH:mm'); // need this json stringify to prevent update of location when the click location changes

        this.$emit('addStop', {
          date: formattedDate,
          location: JSON.parse(JSON.stringify(this.lastClickLocation))
        });
      } else {
        this.$emit('addStop', {
          date: null,
          location: JSON.parse(JSON.stringify(this.lastClickLocation))
        });
      } // reload map and fly to coords


      this.lastClickCoordinates = [0, 0];
      this.loadMap(this.map).then(_success => {
        this.map.flyTo({
          center: this.lastClickLocation,
          zoom: 6,
          speed: 0.5,
          curve: 1
        }); // we only want to hide the popup

        this.$refs.addStopMarker.marker._popup.remove();
      });
    },

    getChildrenText() {
      let text = '&group_children=' + this.childrenAges.length;
      this.childrenAges.forEach(child => {
        text += '&age=' + child;
      });
      return text;
    },

    getExpediaChildrenText() {
      let text = null;
      this.childrenAges.forEach((childAge, index) => {
        text += (index !== 0 ? '_' : '') + childAge;
      });
      return text;
    },

    getRandomColor(step, numOfSteps) {
      var r, g, b;
      var h = step / numOfSteps;
      var i = ~~(h * 6);
      var f = h * 6 - i;
      var q = 1 - f;

      switch (i % 6) {
        case 0:
          r = 1;
          g = f;
          b = 0;
          break;

        case 1:
          r = q;
          g = 1;
          b = 0;
          break;

        case 2:
          r = 0;
          g = 1;
          b = f;
          break;

        case 3:
          r = 0;
          g = q;
          b = 1;
          break;

        case 4:
          r = f;
          g = 0;
          b = 1;
          break;

        case 5:
          r = 1;
          g = 0;
          b = q;
          break;
      }

      var c = '#' + ('00' + (~~(r * 255)).toString(16)).slice(-2) + ('00' + (~~(g * 255)).toString(16)).slice(-2) + ('00' + (~~(b * 255)).toString(16)).slice(-2);
      return c;
    },

    capitalize(s) {
      if (s) {
        s = s.toLowerCase();
        s = s.charAt(0).toUpperCase() + s.slice(1);
      }

      return s;
    },

    loadMap(map, stops) {
      return new Promise(resolve => {
        if (map === null) map = this.map; // if we have stops given than copy them

        if (stops) this.stops = stops; // if map hasn't load yet don't do anything

        if (map) {
          // delete all routes
          this.addedRoutes.forEach(route => {
            map.setLayoutProperty(route.id, 'visibility', 'none');
          });
          this.addedRoutes = []; // reset total trip count

          this.$emit('distanceUpdate', -1);
          this.stops.forEach((stop, index) => {
            if (index >= 1) {
              this.getRoute(this.stops[index - 1].Location, stop.Location, map, index, this.stops[index - 1].Profile, false);
            }

            if (stop.DailyTrips) {
              stop.DailyTrips.forEach((dailyTrip, dailyTripIndex) => {
                // if its not the first item calculate from last to this one
                if (dailyTripIndex >= 1) {
                  if (!dailyTrip.newDate) {
                    // its not a new date calculate from last stop
                    this.getRoute(stop.DailyTrips[dailyTripIndex - 1].location, dailyTrip.location, map, index + dailyTripIndex, stop.Profile, true);
                  } else {
                    // it starts from origin stop, calculate from there
                    this.getRoute(stop.Location, dailyTrip.location, map, index + dailyTripIndex, stop.Profile, true); // also calculate route back to origin from the last daily trip

                    this.getRoute(stop.DailyTrips[dailyTripIndex - 1].location, stop.Location, map, index + index + dailyTripIndex, stop.Profile, true);
                  }
                } else {
                  // its the first item calculate from origin stop
                  this.getRoute(stop.Location, dailyTrip.location, map, index + dailyTripIndex, stop.Profile, true);
                } // it its the last daily trip calculate route back to origin


                if (dailyTripIndex === stop.DailyTrips.length - 1) this.getRoute(dailyTrip.location, stop.Location, map, dailyTripIndex + index, stop.Profile, true);
              });
            }

            if (Mapvue_type_script_lang_js_bounds.length !== 0) {
              Mapvue_type_script_lang_js_bounds.forEach((coordinateArray, index) => {
                const currentStopLng = parseFloat(stop.Location.lng);
                const currentStopLat = parseFloat(stop.Location.lat);
                if (coordinateArray[0] === currentStopLng && coordinateArray[1] === currentStopLat) return false;

                if (index === Mapvue_type_script_lang_js_bounds.length - 1) {
                  Mapvue_type_script_lang_js_bounds.push([currentStopLng, currentStopLat]);
                  return true;
                }
              });
            } else {
              Mapvue_type_script_lang_js_bounds.push([parseFloat(stop.Location.lng), parseFloat(stop.Location.lat)]);
            }
          });
          let context = this;
          map.on('click', function (e) {
            if (!context.markerClicked) {
              // reset the marker popup
              context.lastPOICityData = {
                title: 'Laden...',
                description: '',
                shortDescription: '',
                img: '',
                imgSrc: ''
              };
              var features = map.queryRenderedFeatures(e.point);
              var displayProperties = ['properties', 'id', 'layer', 'geometry'];
              var displayFeatures = features.map(function (feat) {
                var displayFeat = {};
                displayProperties.forEach(function (prop) {
                  displayFeat[prop] = feat[prop];
                });
                return displayFeat;
              });
              displayFeatures.forEach(feature => {
                if (context.whitelistedLabels.includes(feature.layer.id) && !context.markerClicked) {
                  context.lastClickCoordinates = feature.geometry.coordinates;
                  context.title = feature.properties.name_de;
                  context.showAddStopMarker = true;
                  map.flyTo({
                    center: feature.geometry.coordinates,
                    speed: 0.5,
                    curve: 1
                  }); // we never want to hide the popup

                  if (!context.$refs.addStopMarker.marker._popup.options.showed) {
                    setTimeout(function () {
                      if (!context.$refs.addStopMarker.marker._popup.options.showed) context.$refs.addStopMarker.marker._popup.addTo(map);
                    }, 100);
                  }
                }
              });
              context.loadMarkerInfos(context.title);
            }

            context.markerClicked = false;
          }); // map.on('move', () => {
          // var features = map.queryRenderedFeatures(map.getCenter())
          // var displayProperties = [
          //   'properties'd
          // ]
          // var displayFeatures = features.map(function (feat) {
          //   var displayFeat = {}
          //   displayProperties.forEach(function (prop) {
          //     displayFeat[prop] = feat[prop]
          //   })
          //   return displayFeat
          // })
          // displayFeatures.forEach(feature => {
          //   if (feature.layer.id === 'country-label') console.log(feature.properties.name_de)
          // })
          // })

          resolve(true);
        }
      });
    },

    loadMarkerInfos(title) {
      let context = this;

      if (title) {
        if (title.includes(',')) title = title.split(',')[0]; // load additional infos for marker

        sharedMethods["a" /* default */].getWikivoyageData(title).then(result => {
          CitySuggestionMethods.getCityImage(title, '').then(image => {
            result.img = image.url;
            context.lastPOICityData = result;
          });
        }).catch(e => {
          console.log(e);
        });
      }
    },

    flyToPointOnMap(lat, lng) {
      let context = this;
      setTimeout(function () {
        console.log('fly to');
        context.map.flyTo({
          center: [lng, lat],
          speed: 0.8,
          curve: 1,
          zoom: 12
        });
      }, context.map == null ? 3000 : 100);
    },

    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },

    getRoute(startLocation, endLocation, map, index, stopProfile, dailyTrip) {
      let profile = this.profile;
      if (stopProfile && stopProfile !== null && typeof stopProfile !== 'undefined') profile = stopProfile; // get id for route

      let id = (dailyTrip ? 1 : '') + 5 + index; // get random color for route

      let color = this.getRandomColor(index, this.stops.length);

      if (profile !== 'plane') {
        // create url for the duration request
        var url = 'https://api.mapbox.com/directions/v5/mapbox/' + profile + '/' + startLocation.lng + ',' + startLocation.lat + ';' + endLocation.lng + ',' + endLocation.lat + '?geometries=geojson&access_token=' + this.accTo;
        let context = this; // retrieve data from mapbox

        getAxios().then(axios => {
          axios.get(url).then(response => {
            var data = response.data.routes[0];
            var route = data.geometry.coordinates;
            var geojson = {
              id: id,
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: route
              }
            }; // calculate coordinates of route marker

            let geojsonCoords = geojson.geometry.coordinates;
            let centerLocation = geojsonCoords[Math.floor(geojsonCoords.length / 2)]; // get duration

            let duration = sharedMethods["a" /* default */].msToTime(data.duration * 1000);
            let rawDistance = Math.floor(data.distance / 1000) > 0 ? Math.floor(data.distance / 1000) : 0;
            let distance = rawDistance > 0 ? rawDistance + ' km' : null;
            this.$emit('distanceUpdate', rawDistance); // add route marker

            if (duration !== null) context.addedRoutes.push({
              location: centerLocation,
              duration: duration,
              distance: distance,
              color: color,
              origin: startLocation.label.split(',')[0],
              destination: endLocation.label.split(',')[0],
              id: id
            }); // if the route already exists on the map, reset it using setData

            if (map.getSource(id)) {
              map.getSource(id).setData(geojson);
              map.setPaintProperty(id, 'line-color', color);
              map.setLayoutProperty(id, 'visibility', 'visible');
            } else {
              // otherwise, make a new request
              map.addLayer({
                'id': id,
                'type': 'line',
                'source': {
                  'type': 'geojson',
                  'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                      'type': 'LineString',
                      'coordinates': geojson
                    }
                  }
                },
                'layout': {
                  'line-join': 'round',
                  'line-cap': 'round',
                  'visibility': 'visible'
                },
                'paint': {
                  'line-color': color,
                  'line-width': 5,
                  'line-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.75, 0.4]
                }
              });
              map.on('click', id, function (_e) {
                // close all popups
                context.closeAllPopups();
                if (!context.markerClicked) context.$refs[id][0].togglePopup();
              });
              map.getSource(id).setData(geojson);
            }
          }).catch(function (error) {
            console.log(error);
          });
        });
      } else {
        let coordinates = [[startLocation.lng, startLocation.lat], [endLocation.lng, endLocation.lat]];
        var route = {
          'type': 'FeatureCollection',
          'features': [{
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': coordinates
            }
          }]
        };
        map.addSource('route', {
          'type': 'geojson',
          'data': route
        });
        map.addLayer({
          'id': id,
          'source': 'route',
          'type': 'line',
          'paint': {
            'line-width': 2,
            'line-color': color
          }
        }); // calculate coordinates of route marker

        const avgLng = Math.floor((Number(startLocation.lng) + Number(endLocation.lng)) / 2);
        const avgLat = Math.floor((Number(startLocation.lat) + Number(endLocation.lat)) / 2);
        let centerLocation = [avgLng, avgLat]; // add route marker

        this.addedRoutes.push({
          location: centerLocation,
          duration: null,
          distance: null,
          color: color,
          origin: this.stops[index - 1].Location.label.split(',')[0],
          destination: this.stops[index].Location.label.split(',')[0],
          id: id
        });
      } // When the user moves their mouse over the route, we'll update the
      // feature state for the feature under the mouse.


      map.on('mousemove', id, function (e) {
        if (e.features.length > 0) {
          if (hoveredStateId && typeof hoveredStateId !== 'undefined') {
            map.setFeatureState({
              id: hoveredStateId
            }, {
              hover: false
            });
          }

          if (e.features[0].layer.id && typeof e.features[0].layer.id !== 'undefined') {
            hoveredStateId = e.features[0].layer.id;
            map.setFeatureState({
              source: hoveredStateId,
              id: hoveredStateId
            }, {
              hover: true
            });
          }
        }
      }); // When the mouse leaves the route, update the feature state of the
      // previously hovered feature.

      map.on('mouseleave', id, function () {
        if (hoveredStateId && typeof hoveredStateId !== 'undefined') {
          map.setFeatureState({
            source: hoveredStateId,
            id: hoveredStateId
          }, {
            hover: false
          });
        }

        hoveredStateId = null;
      });
    },

    closeAllPopups() {
      const popups = document.getElementsByClassName('mapboxgl-popup');
      console.log(popups);

      for (let i = 0; i < popups.length; i++) {
        console.log(popups[i]);
        popups[i].remove();
      }
    }

  },

  created() {
    Mapvue_type_script_lang_js_bounds = [];
    this.centerLocation = [10.451526, 51.165691];

    if (this.stops[0] && this.stops[0].Location) {
      this.centerLocation = [this.stops[0].Location.lng, this.stops[0].Location.lat];
    }

    this.mapbox = mapbox_gl_default.a;
    this.map = null;
  }

});
// CONCATENATED MODULE: ./src/pages/Map/Map.vue?vue&type=script&lang=js&
 /* harmony default export */ var Map_Mapvue_type_script_lang_js_ = (Mapvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/pages/Map/Map.vue?vue&type=style&index=0&id=4942ad0a&lang=less&scoped=true&
var Mapvue_type_style_index_0_id_4942ad0a_lang_less_scoped_true_ = __webpack_require__("204c");

// CONCATENATED MODULE: ./src/pages/Map/Map.vue






/* normalize component */

var Map_component = Object(componentNormalizer["a" /* default */])(
  Map_Mapvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "4942ad0a",
  null
  
)

/* harmony default export */ var Map = __webpack_exports__["default"] = (Map_component.exports);

/***/ }),

/***/ "ba35":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e188":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return countries; });
const countries = ['Deutschland', 'Österreich', 'Schweiz', 'Luxemburg', 'Afghanistan', 'Ägypten', 'Åland', 'Albanien', 'Algerien', 'Amerikanisch-Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarktis', 'Antigua/Barbuda', 'Äquatorialguinea', 'Argentinien', 'Armenien', 'Aruba', 'Aserbaidschan', 'Äthiopien', 'Australien', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belgien', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivien', 'Bosnien/Herzegowina', 'Botsuana', 'Bouvetinsel', 'Brasilien', 'Brunei Darussalam', 'Bulgarien', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Chile', 'China', 'Cookinseln', 'Costa Rica', 'Cuba', 'Dominica', 'Dominikanische Republik', 'Dschibuti', 'Dänemark', 'Ecuador', 'El Salvador', 'Elfenbeinküste', 'Eritrea', 'Estland', 'Falklandinseln', 'Fidschi', 'Finnland', 'Frankreich', 'Französisch-Guayana', 'Französisch-Polynesien', 'Französische Südpolarterritorien', 'Färöer', 'Gabun', 'Gambia', 'Georgien', 'Ghana', 'Gibraltar', 'Grenada', 'Griechenland', 'Vereinigtes Königreich', 'Grönland', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea-Bissau', 'Guinea', 'Guyana', 'Haiti', 'Heard und McDonaldinseln', 'Honduras', 'Hong Kong', 'Indien', 'Indonesien', 'Irak', 'Iran', 'Irland', 'Island', 'Isle Of Man', 'Israel', 'Italien', 'Jamaika', 'Japan', 'Jemen', 'Jersey', 'Jordanien', 'Jungferninseln, Amerikanische', 'Jungferninseln, Britische', 'Kaimaninseln', 'Kambodscha', 'Kamerun', 'Kanada', 'Kasachstan', 'Kenia', 'Kirgisistan', 'Kiribati', 'Kokosinseln', 'Kolumbien', 'Komoren', 'Kongo', 'Kroatien', 'Kuwait', 'Laos', 'Lesotho', 'Lettland', 'Libanon', 'Liberia', 'Libyen', 'Liechtenstein', 'Litauen', 'Macao', 'Madagaskar', 'Malawi', 'Malaysia', 'Maldiven', 'Mali', 'Malta', 'Marshallinseln', 'Martinique', 'Mauretanien', 'Mauritius', 'Mayotte', 'Mazedonien', 'Mexiko', 'Mikronesien', 'Moldawien', 'Monaco', 'Mongolei', 'Montenegro', 'Montserrat', 'Morokko', 'Mosambik', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Neukaledonien', 'Neuseeland', 'Nicaragua', 'Niederlande', 'Niederländische Antillen', 'Nigeria', 'Niger', 'Niue', 'Nordkorea', 'Norfolkinsel', 'Norwegen', 'Nördliche Marianen', 'Oman', 'Pakistan', 'Palau', 'Palestina', 'Panama', 'Papua-Neuguinea', 'Paraguay', 'Peru', 'Philippinen', 'Pitcairninseln', 'Polen', 'Portugal', 'Puerto Rico', 'Qatar', 'Ruanda', 'Rumänien', 'Russland', 'Réunion', 'Salomonen', 'Sambia', 'Samoa', 'San Marino', 'Saudi-Arabien', 'Schweden', 'Senegal', 'Serbien', 'Seychellen', 'Sierra Leone', 'Simbabwe', 'Singapur', 'Slowakische Republik', 'Slowenien', 'Somalia', 'Spanien', 'Sri Lanka', 'St. Barthélemy', 'St. Helena', 'St. Kitts/Nevis', 'St. Lucia', 'St. Martin', 'St. Pierre/Miquelon', 'St. Vincent/Die Grenadinen', 'Sudan', 'Surinam', 'Svalbard/Jan Mayen', 'Swasiland', 'Syrien', 'São Tomé/Príncipe', 'Südafrika', 'Südgeorgien/Südlichen Sandwichinseln', 'Südkorea', 'Tadschikistan', 'Taiwan', 'Tansania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad und Tobago', 'Tschad', 'Tschechien', 'Tunisien', 'Turkmenistan', 'Turks- und Caicosinseln', 'Tuvalu', 'Türkei', 'Uganda', 'Ukraine', 'Ungarn', 'United States Minor Islands', 'Uruguay', 'USA', 'Usbekistan', 'Vanuatu', 'Vatikanstadt', 'Venezuela', 'Vereinigte Arabische Emirate', 'Vietnam', 'Wallis/Futuna', 'Weihnachtsinsel', 'Weißrussland', 'Westsahara', 'Zentralafrikanische Republik', 'Zypern'];

/***/ })

},0,[23,26]]);
//# sourceMappingURL=chunk-common.js.map