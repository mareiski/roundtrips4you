(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[29],{

/***/ "2042":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/CookieBanner/CookieBanner.vue?vue&type=template&id=39fe256a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.cookiesAllowed)?_c('div',{staticClass:"cookie-banner"},[_c('span',[_vm._v("Wir benutzen Cookies und Analyse tools. Mit der Benutzung dieser Seite erklärst du dich damit einverstanden.")]),_c('q-btn',{staticClass:"q-mt-md",attrs:{"label":"Ok","color":"primary","text-color":"white"},on:{"click":function($event){[_vm.cookiesAllowed = true, _vm.setAllowedCookie()]}}})],1):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/CookieBanner/CookieBanner.vue?vue&type=template&id=39fe256a&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/CookieBanner/CookieBanner.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
__webpack_require__.e(/* import() */ 20).then(__webpack_require__.t.bind(null, "df57", 7));
/* harmony default export */ var CookieBannervue_type_script_lang_js_ = ({
  data() {
    return {
      cookiesAllowed: false
    };
  },

  methods: {
    setAllowedCookie() {
      this.$q.cookies.set('cookies_allowed', true, {
        expires: 10
      });
    }

  },

  created() {
    let cookiesAllowedCookie = this.$q.cookies.get('cookies_allowed');

    if (cookiesAllowedCookie) {
      this.cookiesAllowed = true;
    }
  }

});
// CONCATENATED MODULE: ./src/pages/CookieBanner/CookieBanner.vue?vue&type=script&lang=js&
 /* harmony default export */ var CookieBanner_CookieBannervue_type_script_lang_js_ = (CookieBannervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/CookieBanner/CookieBanner.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  CookieBanner_CookieBannervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CookieBanner = __webpack_exports__["default"] = (component.exports);

/***/ })

},0,[20]]);
//# sourceMappingURL=29.js.map