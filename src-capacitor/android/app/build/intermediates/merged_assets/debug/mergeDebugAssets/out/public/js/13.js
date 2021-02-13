(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "c463":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Error404_vue_vue_type_style_index_0_id_1fe979d3_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ecd9");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Error404_vue_vue_type_style_index_0_id_1fe979d3_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Error404_vue_vue_type_style_index_0_id_1fe979d3_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Error404_vue_vue_type_style_index_0_id_1fe979d3_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e51e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Error404.vue?vue&type=template&id=1fe979d3&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fixed-center text-center page-404"},[_c('div',{staticClass:"island-img",on:{"mousemove":function($event){return _vm.mouseMove($event)}}}),_vm._l((_vm.clouds),function(cloud){return _c('div',{key:cloud},[_c('div',{staticClass:"cloud-circle",style:('width:' + cloud.width + 'px; height:' + cloud.height + 'px; top:' + cloud.top + 'px; left:' + cloud.left + 'px;'),attrs:{"top":cloud.top,"left":cloud.left}}),_c('svg',{attrs:{"width":"0","height":"0"}},[_c('filter',{attrs:{"id":"filter"}},[_c('feTurbulence',{attrs:{"type":"fractalNoise","baseFrequency":".01","numOctaves":"10"}}),_c('feDisplacementMap',{attrs:{"in":"SourceGraphic","scale":"180"}})],1)])])}),_vm._m(0),_c('q-btn',{staticStyle:{"width":"200px"},attrs:{"color":"secondary"},on:{"click":function($event){return _vm.$router.push('/')}}},[_vm._v("Zurück zum Start")])],2)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',{staticClass:"text-faded"},[_vm._v("Oh nein, dieser Ort konnte nicht gefunden werden... "),_c('strong',[_vm._v("(404)")])])}]


// CONCATENATED MODULE: ./src/pages/Error404.vue?vue&type=template&id=1fe979d3&scoped=true&

// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/Loading.js
var Loading = __webpack_require__("f508");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Error404.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Error404vue_type_script_lang_js_ = ({
  name: 'Error404',

  data() {
    return {
      clouds: [{
        width: 400,
        height: 200,
        top: -320,
        left: -320
      }, {
        width: 400,
        height: 200,
        top: -20,
        left: -320
      }, {
        width: 300,
        height: 150,
        top: -120,
        left: 20
      }, {
        width: 500,
        height: 250,
        top: -220,
        left: 500
      }, {
        width: 400,
        height: 200,
        top: -400,
        left: 200
      }]
    };
  },

  created() {
    Loading["a" /* default */].hide();
  },

  methods: {
    mouseMove(event) {
      var width = window.outerWidth;
      var height = window.outerHeight;
      let offsetX = 0.5 - event.clientX / width;
      let offsetY = 0.5 - event.clientY / height;
      let cloudCircles = Array.from(document.getElementsByClassName('cloud-circle'));
      cloudCircles.forEach(function (el, index) {
        var offset = parseInt(el.offsetTop);
        let translate = 'translate3d(' + Math.round(offsetX * offset) + 'px,' + Math.round(offsetY * offset) + 'px,0px)';
        el.style.transform = translate;
      });
    }

  },
  meta: {
    title: '404',
    meta: {
      robot: {
        name: 'robot',
        content: 'noIndex'
      }
    }
  }
});
// CONCATENATED MODULE: ./src/pages/Error404.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Error404vue_type_script_lang_js_ = (Error404vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/pages/Error404.vue?vue&type=style&index=0&id=1fe979d3&lang=less&scoped=true&
var Error404vue_type_style_index_0_id_1fe979d3_lang_less_scoped_true_ = __webpack_require__("c463");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/Error404.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_Error404vue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "1fe979d3",
  null
  
)

/* harmony default export */ var Error404 = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "ecd9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=13.js.map