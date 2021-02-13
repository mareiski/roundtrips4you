(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "7cbd":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9ce1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Map/RegionSearch.vue?vue&type=template&id=4c62fdae&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"flex region-search",staticStyle:{"flex-direction":"column"}},[_c('q-input',{staticStyle:{"width":"300px","padding":"0"},attrs:{"outlined":"","loading":_vm.searchingForRegions,"label":"Region (wenn vorhanden)"},on:{"click":function($event){_vm.regionListVisible ? _vm.regionListVisible = false : _vm.regionListVisible = true}},scopedSlots:_vm._u([{key:"append",fn:function(){return [_c('q-btn',{attrs:{"icon":"search","round":""},on:{"click":function($event){return _vm.searchRegion()}}})]},proxy:true}]),model:{value:(_vm.regionName),callback:function ($$v) {_vm.regionName=$$v},expression:"regionName"}}),_c('q-card',[_c('q-list',_vm._l((_vm.regions),function(region){return _c('q-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.regionListVisible),expression:"regionListVisible"}],key:region,attrs:{"clickable":region !== null},on:{"click":function($event){[_vm.regionName = region.name, _vm.hideHotelList(), _vm.$emit('update', _vm.regionName)]}}},[_vm._v("\n        "+_vm._s(region !== null ? region.name : 'Es konnten keine Regionen gefunden werden')+"\n      ")])}),1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Map/RegionSearch.vue?vue&type=template&id=4c62fdae&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Map/RegionSearch.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/* harmony default export */ var RegionSearchvue_type_script_lang_js_ = ({
  data() {
    return {
      regionName: '',
      regions: [],
      searchingForRegions: false,
      regionListVisible: false
    };
  },

  props: {
    country: String,
    defaultRegion: String
  },
  methods: {
    searchRegion() {
      this.searchingForRegions = true;
      this.getRegions(this.country, this.regionName).then(results => {
        if (results !== null) {
          this.regions = results.data.data;
          if (this.regions.length === 0) this.regions = {
            region: null
          };
        } else {
          this.regions = {
            region: null
          };
        }

        this.regionListVisible = true;
        this.searchingForRegions = false;
      });
    },

    hideHotelList() {
      this.regionListVisible = false;
    },

    clear() {
      this.hotelName = '';
      this.hotels = null;
      this.$refs.select.resetValidation();
    },

    getRegions(country, regionPref) {
      return new Promise((resolve, reject) => {
        getAxios().then(axios => {
          axios.get('https://wft-geo-db.p.mashape.com/v1/geo/countries?limit=5&offset=0&namePrefix=' + country + '&languageCode=de', {
            headers: {
              'X-RapidAPI-Key': '01861af771mshb4bcca217c978fdp12121ejsnd0c4ce2c275a'
            }
          }).then(function (response) {
            // wait 2 secs because only 1 request per sec is allowed
            setTimeout(function () {
              axios.get('https://wft-geo-db.p.mashape.com/v1/geo/countries/' + response.data.data[0].code + '/regions?limit=5&offset=0&languageCode=de&namePrefix=' + regionPref, {
                headers: {
                  'X-RapidAPI-Key': '01861af771mshb4bcca217c978fdp12121ejsnd0c4ce2c275a'
                }
              }).then(function (response) {
                resolve(response);
              }).catch(function (error) {
                console.log('Error' + error);
                resolve(null);
              });
            }, 2000);
          }).catch(function (error) {
            console.log('Error' + error);
            resolve(null);
          });
        }).catch(function (error) {
          console.log('Error ' + error);
          resolve(null);
        });
      });
    }

  },

  created() {
    this.regionName = this.defaultRegion;
  }

});
// CONCATENATED MODULE: ./src/pages/Map/RegionSearch.vue?vue&type=script&lang=js&
 /* harmony default export */ var Map_RegionSearchvue_type_script_lang_js_ = (RegionSearchvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/pages/Map/RegionSearch.vue?vue&type=style&index=0&id=4c62fdae&lang=less&scoped=true&
var RegionSearchvue_type_style_index_0_id_4c62fdae_lang_less_scoped_true_ = __webpack_require__("c81a");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/Map/RegionSearch.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Map_RegionSearchvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "4c62fdae",
  null
  
)

/* harmony default export */ var RegionSearch = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "c81a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RegionSearch_vue_vue_type_style_index_0_id_4c62fdae_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7cbd");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RegionSearch_vue_vue_type_style_index_0_id_4c62fdae_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RegionSearch_vue_vue_type_style_index_0_id_4c62fdae_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RegionSearch_vue_vue_type_style_index_0_id_4c62fdae_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

}]);
//# sourceMappingURL=15.js.map