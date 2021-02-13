(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[35],{

/***/ "8550":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/MyRoundtrips.vue?vue&type=template&id=3929310c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"my-roundtrips  q-px-lg q-pb-md"},[_c('h3',{attrs:{"id":"Title"}},[_vm._v("Meine Reisen")]),_c('q-list',{staticClass:"rounded-borders",attrs:{"bordered":"","padding":""}},[(_vm.showNoRoundtripsText)?_c('q-item',[_c('q-item-section',{attrs:{"avatar":"","top":""}},[_c('q-avatar',{attrs:{"color":"primary","text-color":"white","font-size":"30px","icon":"info"}})],1),_c('q-item-section',{attrs:{"side":""}},[_c('q-item-label',{attrs:{"lines":"2"}},[_vm._v("Wenn du eine Reise erstellst erscheint sie hier. "),_c('br'),_vm._v("\n          Klicke einfach auf den Button unten um deine erste Reise zu erstellen.")])],1)],1):_vm._e(),(_vm.showRoundtrips)?_c('div',_vm._l((_vm.roundtrips),function(roundtrip){return _c('q-intersection',{key:roundtrip.RTId,attrs:{"once":"","transition":"flip-right"}},[_c('q-item',{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{"clickable":""},on:{"click":function($event){return _vm.$router.push('/rundreise-ansehen/' + roundtrip.RTId)}}},[_c('q-item-section',{attrs:{"avatar":"","top":""}},[_c('q-avatar',{attrs:{"color":"primary","text-color":"white"}},[_c('img',{attrs:{"src":_vm.TitleImgs[_vm.TitleImgs.findIndex(function (x) { return x.RTId === roundtrip.RTId; })] ? _vm.TitleImgs[_vm.TitleImgs.findIndex(function (x) { return x.RTId === roundtrip.RTId; })].src : '../statics/dummy-image-landscape-1-150x150.jpg'}})])],1),_c('q-item-section',[_c('q-item-label',{attrs:{"lines":"1"}},[_vm._v(_vm._s(roundtrip.Title)+" - "+_vm._s(Array.isArray(roundtrip.Location) ? _vm.getLocationString(roundtrip.Location): roundtrip.Location))]),_c('q-item-label',{staticStyle:{"width":"100px"},attrs:{"caption":""}},[_vm._v("\n              "+_vm._s(_vm.getCreatedAtDate(roundtrip.createdAt))+"\n              "),_c('q-tooltip',[_vm._v("\n                Diese Rundreise wurde am "+_vm._s(_vm.getCreatedAtDate(roundtrip.createdAt))+" erstellt\n              ")])],1)],1),_c('q-item-section',{attrs:{"side":""}},[_c('q-item-label',{style:([roundtrip.Public ? {'color': 'green'} : {'color': 'red'}]),attrs:{"lines":"1"}},[_vm._v(_vm._s(roundtrip.Public ? 'veröffentlicht' : 'privat'))])],1),_c('q-item-section',{attrs:{"side":""}},[_c('q-icon',{attrs:{"name":"keyboard_arrow_right","color":"primary"}})],1)],1)],1)}),1):(!_vm.showNoRoundtripsText)?_c('div',_vm._l((3),function(n){return _c('q-item',{key:n},[_c('q-item-section',{staticStyle:{"padding":"8px 10px"},attrs:{"avatar":"","top":""}},[_c('q-skeleton',{attrs:{"size":"40px","type":"QAvatar"}})],1),_c('q-item-section',[_c('q-skeleton',{staticClass:"title-skeleton",staticStyle:{"margin-bottom":"10px"},attrs:{"width":"300px","type":"rect"}}),_c('q-item-label',{attrs:{"caption":""}},[_c('q-skeleton',{attrs:{"width":"80px","type":"rect"}})],1)],1)],1)}),1):_vm._e()],1),_c('span',{ref:"AddRoundtripExpansionItem"}),(_vm.user && (_vm.user.emailVerified || _vm.roundtrips.length === 0))?_c('div',{staticClass:"flex cursor-pointer",staticStyle:{"align-items":"center","flex-direction":"row","margin-bottom":"20px"},on:{"click":function($event){return _vm.$router.push('/rundreisen-wizard')}}},[_c('q-btn',{staticClass:"add-button",attrs:{"side":"","round":"","color":"primary","icon":"add"}}),_c('span',{staticStyle:{"font-size":"20px"}},[_vm._v("Reise hinzufügen")])],1):_vm._e(),(_vm.user && !_vm.user.emailVerified)?_c('div',[_c('span',{staticStyle:{"font-size":"18px"}},[_vm._v("Deine Email Adresse wurde noch nicht bestätigt. Bitte bestätige diese "+_vm._s(_vm.roundtrips.length > 0 ? 'bevor du eine weitere Reise erstellst' : 'sobald wie möglich')+".")]),_c('br'),_c('br'),_c('q-btn',{on:{"click":function($event){return _vm.verifyMail()}}},[_vm._v("Email erneut senden")])],1):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/MyRoundtrips.vue?vue&type=template&id=3929310c&

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// EXTERNAL MODULE: ./node_modules/quasar/src/utils/date.js
var date = __webpack_require__("bd4c");

// EXTERNAL MODULE: ./src/sharedMethods.js
var sharedMethods = __webpack_require__("15c8");

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/MyRoundtrips.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
__webpack_require__.e(/* import() */ 24).then(__webpack_require__.t.bind(null, "4a0e", 7));




let MyRoundtripsvue_type_script_lang_js_timeStamp = Date.now();
let formattedScheduleDate = date["b" /* default */].formatDate(MyRoundtripsvue_type_script_lang_js_timeStamp, 'DD.MM.YYYY');
var actionCodeSettings = {
  url: 'https://roundtrips4you.de/login',
  // This must be true.
  handleCodeInApp: true
};
/* harmony default export */ var MyRoundtripsvue_type_script_lang_js_ = ({
  meta: {
    title: 'Meine Rundreisen',
    meta: {
      description: {
        name: 'description',
        content: 'Deine Reisen auf roundtrips4you bearbeiten, komplett kostenlos, online und unkompliziert. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...'
      }
    }
  },
  name: 'myRoundtrips',

  data() {
    return {
      roundtrips: [],
      TitleImgs: [],
      title: '',
      addExpanded: false,
      addButtonActive: false,
      // countries: [],
      // countryOptions: countries,
      showNoRoundtripsText: false,
      rooms: 1,
      adults: 1,
      children: 0,
      childrenAges: [],
      step: 1,
      arrivalDepatureProfile: 'Flugzeug',
      origin: null,
      destination: null,
      depatureDate: formattedScheduleDate,
      returnDate: formattedScheduleDate,
      travelClass: 'Economy',
      nonStop: 'Ja',
      originOptions: [],
      destinationOptions: [],
      originCodes: [],
      destinationCodes: [],
      originCode: null,
      destinationCode: null,
      destinationAddresses: [],
      countryAmount: 1,
      showRoundtrips: false,
      tempLocation: null
    };
  },

  computed: {
    user() {
      return this.$store.getters['user/user'];
    },

    sharedMethods() {
      return sharedMethods["a" /* default */];
    }

  },
  methods: {
    verifyMail() {
      let context = this;

      if (!firebaseInit["a" /* auth */].user().emailVerified) {
        firebaseInit["a" /* auth */].user().sendEmailVerification(actionCodeSettings).then(function () {
          context.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Wir haben dir eine Bestätigungsmail gesendet'
          });
        }).catch(function (error) {
          console.log(error);
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Oh nein, wir konnten dir leider keine email senden, bitte Kontaktiere uns unter hello@roundtrips4you.de'
          });
        });
      } else {
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Deine Email wurde bestätigt'
        });
      }
    },

    destinationChanged(val) {
      this.getLocationFromIataCode(this.destinationCodes[this.destinationOptions.indexOf(val)], this.destinationAddresses[this.destinationOptions.indexOf(val)]);
    },

    scrollOnAddButtonClicked() {
      if (this.addExpanded) sharedMethods["a" /* default */].scrollToRef(this.$refs['AddRoundtripExpansionItem']);
    },

    updateLocation(event) {
      this.tempLocation = {
        lat: event.y,
        lng: event.x,
        label: event.label
      };
    },

    getLocationFromIataCode(code, countryName) {
      let context = this;
      axios_default.a.get('http://iatageo.com/getLatLng/' + code).then(function (response) {
        context.tempLocation = {
          lat: response.data.latitude,
          lng: response.data.longitude,
          label: countryName
        };
      }).catch(function (error) {
        console.log('Error' + error);
      });
    },

    updateReturnDate() {
      let dateParts = this.depatureDate.split('.');
      let depatureDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      let returnDate = depatureDate;
      returnDate.setDate(depatureDate.getDate() + 1);
      this.returnDate = date["b" /* default */].formatDate(returnDate, 'DD.MM.YYYY');
    },

    saveArrivalDepature(RTDocId) {
      this.submitting = true;

      if (this.arrivalDepatureProfile === 'Flugzeug') {
        let dateParts = this.depatureDate.split('.');
        let depatureDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        dateParts = this.returnDate.split('.');
        let returnDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

        if (this.saveData('TransportProfile', this.arrivalDepatureProfile, RTDocId) && this.saveData('Origin', this.origin, RTDocId) && this.saveData('OriginCode', this.originCodes[this.originOptions.indexOf(this.origin)] ? this.originCodes[this.originOptions.indexOf(this.origin)] : this.originCode, RTDocId) && this.saveData('Destination', this.destination, RTDocId) && this.saveData('DestinationCode', this.destinationCodes[this.destinationOptions.indexOf(this.destination)] ? this.destinationCodes[this.destinationOptions.indexOf(this.destination)] : this.destinationCode, RTDocId) && this.saveData('DepatureDate', depatureDate, RTDocId) && this.saveData('ReturnDate', returnDate, RTDocId) && this.saveData('TravelClass', this.travelClass, RTDocId) && this.saveData('NonStop', this.nonStop, RTDocId)) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.saveData('TransportProfile', this.arrivalDepatureProfile, RTDocId)) {
          return true;
        } else {
          return false;
        }
      }
    },

    getLocationString(locations) {
      let locationString = '';
      locations.forEach((location, index) => {
        locationString = locationString + (index !== 0 ? ', ' : '') + location;
      });
      return locationString;
    },

    saveData(field, value, roundtripDocId) {
      if (roundtripDocId === null || roundtripDocId === '' || roundtripDocId === 'undefined') return false;

      try {
        firebaseInit["b" /* db */].collection('Roundtrips').doc(roundtripDocId).update({
          ['' + field]: value
        });
      } catch (error) {
        console.log(error);
        return false;
      }

      return true;
    },

    getCreatedAtDate(timeStamp) {
      return date["b" /* default */].formatDate(new Date(timeStamp.seconds * 1000), 'DD.MM.YYYY');
    },

    // filterFn (val, update, abort) {
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.countryOptions = countries.filter(v => v.toLowerCase().indexOf(needle) > -1)
    //   })
    // },
    getOrigins(val, update, abort) {
      sharedMethods["a" /* default */].filterAirports(val, update, abort, true, this);
    },

    getDestinations(val, update, abort) {
      sharedMethods["a" /* default */].filterAirports(val, update, abort, false, this);
    }

  },

  created() {
    firebaseInit["a" /* auth */].authRef().onAuthStateChanged(user => {
      this.$store.dispatch('roundtrips/fetchAllRoundtrips', firebaseInit["a" /* auth */].user().uid).then(result => {
        if (typeof result === 'undefined' || !result || !result.roundtrips || result.roundtrips === null || result.roundtrips.length === 0) {
          this.showNoRoundtripsText = true;
          this.showRoundtrips = true;
          this.addExpanded = true;
        } else {
          this.showRoundtrips = true;
          this.roundtrips = result.roundtrips;
          this.TitleImgs = result.titleImages;
        }
      });
    });
  }

});
// CONCATENATED MODULE: ./src/pages/MyRoundtrips.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_MyRoundtripsvue_type_script_lang_js_ = (MyRoundtripsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/MyRoundtrips.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_MyRoundtripsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MyRoundtrips = __webpack_exports__["default"] = (component.exports);

/***/ })

},0,[24]]);
//# sourceMappingURL=35.js.map