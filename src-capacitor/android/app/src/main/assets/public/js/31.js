(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "0a4c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/EditRoundtripComponents/duration.vue?vue&type=template&id=222cb009&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-timeline-entry',{attrs:{"icon":"speed"},scopedSlots:_vm._u([{key:"subtitle",fn:function(){return [(_vm.duration || _vm.duration === 0)?[_vm._v(_vm._s(_vm.duration)+" "+_vm._s(_vm.defaultProfile && typeof _vm.defaultProfile !== 'undefined' ? _vm.defaultProfile : (_vm.editor ? 'Reisemittel hinzufügen' : _vm.roundtripProfile)))]:[_c('q-skeleton',{attrs:{"width":"100px","height":"20px","type":"text"}})]]},proxy:true}])})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/EditRoundtripComponents/duration.vue?vue&type=template&id=222cb009&

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// EXTERNAL MODULE: ./src/sharedMethods.js
var sharedMethods = __webpack_require__("15c8");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/EditRoundtripComponents/duration.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var durationvue_type_script_lang_js_ = ({
  props: {
    duration: String,
    editor: Boolean,
    defaultProfile: String,
    roundtripProfile: String,
    origin: String,
    destination: String,
    docId: String
  },

  data() {
    return {
      editStopProfile: false,
      inputProfile: this.defaultProfile,
      profile: null
    };
  },

  methods: {
    getProfile() {
      switch (this.inputProfile) {
        case 'zu Fuß':
          this.profile = 'walking';
          break;

        case 'Fahrrad':
          this.profile = 'cycling';
          break;

        case 'Flugzeug':
          this.profile = 'plane';
          break;

        default:
          this.profile = 'driving';
          break;
      }
    },

    saveData(field, value) {
      if (!value) return;
      let context = this;

      try {
        firebaseInit["b" /* db */].collection('RoundtripDetails').doc(this.docId).update({
          ['' + field]: value
        }).then(function () {
          // context.$q.notify({
          //   message: 'Deine Änderungen wurde gespeichert',
          //   color: 'green-4',
          //   textColor: 'white',
          //   icon: 'check_circle'
          // })
          context.defaultProfile = context.inputProfile;
          let parent = sharedMethods["a" /* default */].getParent('EditRoundtrips', context);
          parent.getDataOutOfStops(false);
        });
      } catch (e) {
        console.log(e);
      }
    }

  }
});
// CONCATENATED MODULE: ./src/pages/EditRoundtripComponents/duration.vue?vue&type=script&lang=js&
 /* harmony default export */ var EditRoundtripComponents_durationvue_type_script_lang_js_ = (durationvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/EditRoundtripComponents/duration.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  EditRoundtripComponents_durationvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var duration = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=31.js.map