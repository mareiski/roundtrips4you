(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

/***/ "810b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/MapWidget.vue?vue&type=template&id=791f79da&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"widgets"},[_c('Map',{directives:[{name:"show",rawName:"v-show",value:(_vm.mapLoaded),expression:"mapLoaded"}],attrs:{"profile":_vm.getProfile(_vm.inputProfile),"stops":_vm.stops,"childrenAges":[],"adults":2,"rooms":1}}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.mapLoaded),expression:"!mapLoaded"}],staticClass:"flex justify-center",staticStyle:{"position":"absolute","top":"250px","left":"48%"}},[_c('q-spinner',{attrs:{"size":"80px","color":"primary"}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/MapWidget.vue?vue&type=template&id=791f79da&

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/Loading.js
var Loading = __webpack_require__("f508");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/MapWidget.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


let roundtrip = [];
let details = [];
/* harmony default export */ var MapWidgetvue_type_script_lang_js_ = ({
  components: {
    Map: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, "4f6c"))
  },

  data() {
    return {
      stops: [],
      inputProfile: null,
      mapLoaded: false
    };
  },

  name: 'MapWidget',
  meta: {
    title: !roundtrip[0] ? 'MapWidget' : roundtrip[0].Title,
    meta: {
      robot: {
        name: 'robot',
        content: 'noIndex'
      }
    }
  },
  methods: {
    loadSingleRoundtrip(RTId) {
      let roundtripsRef = firebaseInit["b" /* db */].collection('Roundtrips').where('RTId', '==', RTId).limit(1);
      roundtripsRef.get().then(snapshot => {
        roundtrip = [];
        snapshot.forEach(doc => {
          roundtrip.push(doc.data());
        });

        if (roundtrip.Public) {
          this.inputProfile = roundtrip[0].Profile; // set default values to ensure privacy

          this.childrenAges = [];
          this.rooms = 1;
          this.adults = 2;
          roundtripsRef = firebaseInit["b" /* db */].collection('RoundtripDetails').where('RTId', '==', RTId).orderBy('InitDate');
          roundtripsRef.get().then(snapshot => {
            details = [];
            snapshot.forEach(doc => {
              details.push(doc.data());
              details[details.findIndex(x => x.docId === doc.data().DocId)].DocId = doc.id;
            });
            this.stops = details;
            this.mapLoaded = true;
          });
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Uuups, diese Karte ist leider privat'
          });
          this.$router.push('/');
        }
      }).catch(err => {
        console.log('Error getting Roundtrip', err);
      });
    },

    getProfile(profile) {
      switch (profile) {
        case 'zu Fuß':
          return 'walking';

        case 'Fahrrad':
          return 'cycling';

        case 'Flugzeug':
          return 'plane';

        default:
          return 'driving';
      }
    }

  },

  created() {
    let RTId = this.$route.params.id;
    this.loadSingleRoundtrip(RTId);
    Loading["a" /* default */].hide();
  }

});
// CONCATENATED MODULE: ./src/pages/MapWidget.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_MapWidgetvue_type_script_lang_js_ = (MapWidgetvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/MapWidget.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_MapWidgetvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MapWidget = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=34.js.map