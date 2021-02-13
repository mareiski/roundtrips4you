(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "20e6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Map/HotelSearch.vue?vue&type=template&id=f35927b6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"flex hotel-search",staticStyle:{"flex-direction":"column"}},[_c('q-input',{staticStyle:{"width":"300px","padding":"0"},attrs:{"outlined":"","loading":_vm.searchingForHotels,"label":"Hotelname suchen","rules":[function (val) { return val !== null && val !== '' || 'Bitte wähle ein Hotel'; }]},on:{"click":function($event){_vm.hotelListVisible ? _vm.hotelListVisible = false : _vm.hotelListVisible = true}},scopedSlots:_vm._u([{key:"append",fn:function(){return [_c('q-btn',{attrs:{"icon":"search","round":""},on:{"click":function($event){return _vm.searchHotel()}}})]},proxy:true}]),model:{value:(_vm.hotelName),callback:function ($$v) {_vm.hotelName=$$v},expression:"hotelName"}}),_c('q-card',[_c('q-list',_vm._l((_vm.hotels),function(hotel,index){return _c('q-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.hotelListVisible),expression:"hotelListVisible"}],key:hotel !== null ? hotel.geoId : index,attrs:{"clickable":""},on:{"click":function($event){hotel !== null ? [_vm.hotelName = hotel.name, _vm.hideHotelList(), _vm.$emit('update', hotel)] : _vm.showAddHotelDialog = true}}},[(hotel !== null)?_c('div',{domProps:{"innerHTML":_vm._s(hotel.caption)}}):_vm._e(),_vm._v("\n        "+_vm._s(hotel !== null ? '' : 'Klicken um Hotel manuell hinzuzufügen')+"\n      ")])}),1)],1),_c('q-dialog',{model:{value:(_vm.showAddHotelDialog),callback:function ($$v) {_vm.showAddHotelDialog=$$v},expression:"showAddHotelDialog"}},[_c('q-stepper',{staticStyle:{"width":"400px"},attrs:{"vertical":"","color":"primary","animated":"","flat":"","keep-alive":""},model:{value:(_vm.step),callback:function ($$v) {_vm.step=$$v},expression:"step"}},[_c('q-step',{attrs:{"name":1,"title":"Name & Adresse angeben","icon":"settings","done":_vm.step > 1}},[_c('q-input',{staticStyle:{"margin":"auto","margin-top":"20px","margin-left":"0"},attrs:{"rules":[function (val) { return val !== null &&  val !== ''  || 'Bitte gib den Exakten Namen an'; }],"label":"Exakter Hotel Name","outlined":""},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"title"}})]},proxy:true}]),model:{value:(_vm.hotelName),callback:function ($$v) {_vm.hotelName=$$v},expression:"hotelName"}}),_c('CitySearch',{ref:"citySearch",attrs:{"parkingPlaceSearch":false,"defaultLocation":null},on:{"update":function($event){return _vm.updateLocation($event)}}}),_c('q-stepper-navigation',[_c('q-btn',{attrs:{"color":"primary","label":"Weiter","disable":!_vm.hotelName || !_vm.tempLocation},on:{"click":function($event){_vm.step = 2}}})],1)],1),_c('q-step',{attrs:{"name":2,"title":"Bewertung & Email eingeben","icon":"settings"}},[_c('q-rating',{staticClass:"stars",staticStyle:{"margin":"20px 0 15px 0"},attrs:{"size":"15px","color":"gold"},model:{value:(_vm.hotelStars),callback:function ($$v) {_vm.hotelStars=$$v},expression:"hotelStars"}}),_c('q-input',{attrs:{"outlined":"","type":"email","lazy-rules":"","rules":[function (val) { return _vm.reg.test(val) || 'Bitte gib eine richtige Email an'; }],"label":"Email des Hotels (optional)"},model:{value:(_vm.hotelEmail),callback:function ($$v) {_vm.hotelEmail=$$v},expression:"hotelEmail"}}),_c('q-stepper-navigation',[_c('q-btn',{attrs:{"color":"primary","label":"Fertig","disable":!_vm.hotelStars},on:{"click":function($event){return _vm.addHotel()}}}),_c('q-btn',{staticClass:"q-ml-sm",attrs:{"flat":"","color":"primary","label":"Zurück"},on:{"click":function($event){_vm.step = 1}}})],1)],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Map/HotelSearch.vue?vue&type=template&id=f35927b6&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Map/HotelSearch.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const getAxios = () => Promise.resolve(/* import() */).then(__webpack_require__.t.bind(null, "bc3a", 7));

/* harmony default export */ var HotelSearchvue_type_script_lang_js_ = ({
  data() {
    return {
      hotelName: '',
      hotels: [],
      searchingForHotels: false,
      hotelListVisible: false,
      showAddHotelDialog: false,
      tempLocation: {},
      hotelStars: 3,
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      hotelEmail: null,
      step: 1
    };
  },

  components: {
    CitySearch: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, "8ed1"))
  },
  props: {
    lat: String,
    long: String,
    checkInDate: String,
    checkOutDate: String,
    roomAmount: Number,
    adults: Number,
    childrenAges: Array
  },
  methods: {
    searchHotel() {
      this.searchingForHotels = true;
      this.getHotels(this.hotelName).then(results => {
        if (results !== null) {
          this.hotels = results.data.suggestions[3].entities;
          if (this.hotels.length === 0) this.hotels = {
            hotel: null
          };
        } else {
          this.hotels = {
            hotel: null
          };
        }

        this.hotelListVisible = true;
        this.searchingForHotels = false;
      });
    },

    addHotel() {
      let hotel = {
        latitude: this.tempLocation.lat,
        longitude: this.tempLocation.lng,
        address: this.tempLocation.label,
        rating: this.hotelStars,
        name: this.hotelName,
        contact: {
          email: this.hotelEmail
        }
      };
      this.$emit('update', hotel);
      this.hideHotelList();
      this.showAddHotelDialog = false;
      this.tempLocation = {};
      this.hotelStars = 3;
      this.hotelEmail = null;
      this.step = 1;
    },

    hideHotelList() {
      this.hotelListVisible = false;
    },

    updateLocation(event) {
      this.tempLocation = {
        lat: event.y,
        lng: event.x,
        label: event.label
      };
      console.log(event);
    },

    clear() {
      this.hotelName = '';
      this.hotels = null;
      this.$refs.select.resetValidation();
    },

    getHotels(hotelName) {
      return new Promise((resolve, reject) => {
        getAxios().then(axios => {
          axios.get('https://hotels4.p.rapidapi.com/locations/search?locale=de_DE&query=' + hotelName, {
            headers: {
              'content-type': 'application/octet-stream',
              'x-rapidapi-host': 'hotels4.p.rapidapi.com',
              'x-rapidapi-key': '18b409d797msh45b84c0227df18cp1fea51jsne88847e3f3c8',
              'useQueryString': true
            }
          }).then(response => {
            resolve(response);
          }).catch(error => {
            console.log(error);
            resolve(null);
          });
        }).catch(function (error) {
          console.log('Error ' + error);
          resolve(null);
        });
      });
    }

  }
});
// CONCATENATED MODULE: ./src/pages/Map/HotelSearch.vue?vue&type=script&lang=js&
 /* harmony default export */ var Map_HotelSearchvue_type_script_lang_js_ = (HotelSearchvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/pages/Map/HotelSearch.vue?vue&type=style&index=0&lang=less&
var HotelSearchvue_type_style_index_0_lang_less_ = __webpack_require__("5e84");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/Map/HotelSearch.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Map_HotelSearchvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var HotelSearch = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "5e84":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_HotelSearch_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("75c2");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_HotelSearch_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_HotelSearch_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_HotelSearch_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "75c2":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=14.js.map