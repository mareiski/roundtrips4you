(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "2bf3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/WidgetLayout.vue?vue&type=template&id=856df2f6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-layout',{attrs:{"view":"lHh Lpr lFf"}},[_c('q-toolbar',{staticClass:"bg-secondary text-white glossery",staticStyle:{"padding-right":"0"}},[_c('q-toolbar-title',{staticStyle:{"min-width":"150px"}},[_c('a',{staticClass:"cursor-pointer",staticStyle:{"text-decoration":"none","color":"white"},attrs:{"href":'https://roundtrips4you.de/rundreise-ansehen/' + _vm.RTId + '&' + 1590184800000,"target":"_blank"}},[_vm._v("\n        "+_vm._s(_vm.title)+"\n      ")])]),_c('span',{staticClass:"ellipsis trip-days",staticStyle:{"font-size":"16px","padding-right":"10px"}},[_vm._v(_vm._s(_vm.hotelDays))]),_c('a',{staticClass:"cursor-pointer bg-primary ellipsis",staticStyle:{"font-size":"20px","padding":"10px","text-decoration":"none","color":"white"},attrs:{"href":"https://roundtrips4you.de","target":"_blank"}},[_vm._v("\n      Roundtrips4you - dein Reiseplaner\n    ")])],1),_c('q-page-container',[_c('router-view')],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/layouts/WidgetLayout.vue?vue&type=template&id=856df2f6&

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/WidgetLayout.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
/* harmony default export */ var WidgetLayoutvue_type_script_lang_js_ = ({
  name: 'WidgetLayout',

  data() {
    return {
      RTId: null,
      currentTimeMillis: Date.now(),
      title: null,
      hotelDays: null
    };
  },

  methods: {
    loadSingleRoundtrip(RTId) {
      let roundtripsRef = firebaseInit["b" /* db */].collection('Roundtrips').where('RTId', '==', RTId).limit(1);
      roundtripsRef.get().then(snapshot => {
        roundtrip = [];
        snapshot.forEach(doc => {
          roundtrip.push(doc.data());
        });
        this.title = roundtrip[0].Title;
        this.hotelDays = roundtrip[0].Days + '/' + roundtrip[0].Hotels + ' Hotels';
      }).catch(err => {
        console.log('Error getting Roundtrip', err);
      });
    }

  },

  created() {
    this.RTId = this.$route.params.id;
    this.loadSingleRoundtrip(this.RTId);
  }

});
// CONCATENATED MODULE: ./src/layouts/WidgetLayout.vue?vue&type=script&lang=js&
 /* harmony default export */ var layouts_WidgetLayoutvue_type_script_lang_js_ = (WidgetLayoutvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/layouts/WidgetLayout.vue?vue&type=style&index=0&lang=less&
var WidgetLayoutvue_type_style_index_0_lang_less_ = __webpack_require__("2f81");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/layouts/WidgetLayout.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  layouts_WidgetLayoutvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var WidgetLayout = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "2f81":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_WidgetLayout_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b83a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_WidgetLayout_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_WidgetLayout_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_WidgetLayout_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b83a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=12.js.map