(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "8ed1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Map/CitySearch.vue?vue&type=template&id=4392309f&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('q-select',{ref:"select",attrs:{"outlined":"","use-input":"","hide-selected":"","fill-input":"","input-debounce":"0","clearable":"","hide-dropdown-icon":"","label":!_vm.parkingPlaceSearch ? 'Ort suchen' : 'Parkplatz suchen (optional)',"options":_vm.countryOptions,"lazy-rules":"","rules":!_vm.parkingPlaceSearch ? [function (val) { return val !== null && val !== '' || 'Bitte wähle einen Ort'; }] : []},on:{"filter":_vm.filterFn,"input":function($event){return _vm.$emit('update', $event)}},scopedSlots:_vm._u([{key:"no-option",fn:function(){return [_c('q-item',[_c('q-item-section',{staticClass:"text-grey"},[_vm._v("\n          zu viele/keine Ergebnisse, bitte weitertippen\n        ")])],1)]},proxy:true},{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":!_vm.parkingPlaceSearch ? 'location_on' : 'local_parking'}})]},proxy:true}]),model:{value:(_vm.searchLocation),callback:function ($$v) {_vm.searchLocation=$$v},expression:"searchLocation"}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Map/CitySearch.vue?vue&type=template&id=4392309f&

// EXTERNAL MODULE: ./node_modules/leaflet-geosearch/lib/index.js
var lib = __webpack_require__("c6e0");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Map/CitySearch.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const provider = new lib["OpenStreetMapProvider"]();
/* harmony default export */ var CitySearchvue_type_script_lang_js_ = ({
  name: 'Map',
  props: {
    parkingPlaceSearch: Boolean,
    defaultLocation: String
  },

  data() {
    return {
      searchLocation: '',
      countryOptions: null
    };
  },

  methods: {
    filterFn(val, update, abort) {
      if (val.length < 2 && this.countryOptions != null) {
        abort();
        return;
      }

      provider.search({
        query: val
      }).then(results => {
        update(() => {
          if (!results) return false;
          this.countryOptions = results;
        });
      }).catch(e => {
        return false;
      });
    },

    clear() {
      this.searchLocation = '';
      this.countryOptions = null;
      this.$refs.select.resetValidation();
    }

  },

  created() {
    if (this.defaultLocation !== null) this.searchLocation = this.defaultLocation;
  }

});
// CONCATENATED MODULE: ./src/pages/Map/CitySearch.vue?vue&type=script&lang=js&
 /* harmony default export */ var Map_CitySearchvue_type_script_lang_js_ = (CitySearchvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/Map/CitySearch.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Map_CitySearchvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CitySearch = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=5.js.map