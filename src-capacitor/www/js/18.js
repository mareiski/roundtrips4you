(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "0a2e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TripOverview_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d8fd");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TripOverview_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TripOverview_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TripOverview_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b595":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/TripOverview/TripOverview.vue?vue&type=template&id=a2d86d76&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"trip-overview"},[_c('q-drawer',{attrs:{"show-if-above":"","width":350,"elevated":"","breakpoint":550,"mini":_vm.isTablet ? _vm.miniState : false,"content-class":"bg-whit"},on:{"mouseover":function($event){!_vm.miniDisabled ? _vm.miniState = false : null},"mouseout":function($event){!_vm.miniDisabled ? _vm.miniState = true : null}},model:{value:(_vm.drawerLeft),callback:function ($$v) {_vm.drawerLeft=$$v},expression:"drawerLeft"}},[_c('q-scroll-area',{ref:"DrawerScrollArea",staticClass:"fit"},[_c('TripOverviewList',{attrs:{"addedStops":_vm.addedStops,"currentRoundtrip":_vm.currentRoundtrip},on:{"stopsDragged":function($event){return _vm.$emit('stopsDragged', $event);},"editStop":function($event){return _vm.$emit('editStop', $event);},"removeStop":function($event){return _vm.$emit('removeStop', $event);}}})],1)],1),(_vm.drawerInvisible)?_c('div',[_c('q-tabs',{staticClass:"text-grey",attrs:{"dense":"","active-color":"primary","indicator-color":"primary","align":"justify","narrow-indicator":""},model:{value:(_vm.tab),callback:function ($$v) {_vm.tab=$$v},expression:"tab"}},[_c('q-tab',{attrs:{"name":"map","label":"Karte"}}),_c('q-tab',{attrs:{"name":"list","label":"Liste"}})],1),_c('q-separator'),_c('q-tab-panels',{ref:"tabPanels",attrs:{"animated":"","keep-alive":""},model:{value:(_vm.tab),callback:function ($$v) {_vm.tab=$$v},expression:"tab"}},[_c('q-tab-panel',{attrs:{"name":"map"}},[_c('Map',{ref:"overviewMap",attrs:{"profile":_vm.addedStops[0] && _vm.addedStops[0].Profile ? _vm.addedStops[0].Profile : 'driving',"stops":_vm.addedStops,"childrenAges":_vm.currentRoundtrip.ChildrenAges,"rooms":Number(_vm.currentRoundtrip.Rooms),"adults":Number(_vm.currentRoundtrip.Adults),"editor":true,"height":"90vh;"},on:{"addStop":function($event){return _vm.$emit('addStop', $event)},"update":function($event){return _vm.$emit('update', $event)},"distanceUpdate":function($event){return _vm.$emit('distanceUpdate', $event)}}})],1),_c('q-tab-panel',{attrs:{"name":"list"}},[_c('TripOverviewList',{attrs:{"addedStops":_vm.addedStops,"currentRoundtrip":_vm.currentRoundtrip},on:{"stopsDragged":function($event){return _vm.$emit('stopsDragged', $event);},"editStop":function($event){return _vm.$emit('editStop', $event);},"removeStop":function($event){return _vm.$emit('removeStop', $event);}}})],1)],1)],1):_c('div',{style:('margin-left:' + (_vm.isEditMode ? '350px;' : '326px;'))},[_c('Map',{ref:"overviewMap",attrs:{"profile":_vm.addedStops[0] && _vm.addedStops[0].Profile ? _vm.addedStops[0].Profile : 'driving',"stops":_vm.addedStops,"childrenAges":_vm.currentRoundtrip.ChildrenAges,"rooms":Number(_vm.currentRoundtrip.Rooms),"adults":Number(_vm.currentRoundtrip.Adults),"editor":true,"height":"90vh;"},on:{"addStop":function($event){return _vm.$emit('addStop', $event)},"update":function($event){return _vm.$emit('update', $event)},"distanceUpdate":function($event){return _vm.$emit('distanceUpdate', $event)}}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/TripOverview/TripOverview.vue?vue&type=template&id=a2d86d76&

// EXTERNAL MODULE: ./src/pages/Map/Map.vue + 10 modules
var Map = __webpack_require__("4f6c");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/TripOverview/TripOverviewList.vue?vue&type=template&id=29e0c00c&
var TripOverviewListvue_type_template_id_29e0c00c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"min-height":"40vh"}},[_c('q-list',{directives:[{name:"show",rawName:"v-show",value:(_vm.addedStops.length > 0),expression:"addedStops.length > 0"}],staticClass:"rounded-borders",attrs:{"bordered":""}},[_c('q-item-label',{staticClass:"text-weight-bold",attrs:{"header":""}},[_vm._v(_vm._s(_vm.currentRoundtrip.Title))]),_c('q-separator'),_c('draggable',{attrs:{"handle":".handle"},on:{"end":function($event){return _vm.emitOnDragged($event)}},model:{value:(_vm.addedStops),callback:function ($$v) {_vm.addedStops=$$v},expression:"addedStops"}},[_c('transition-group',{attrs:{"name":"flip-list"}},_vm._l((_vm.addedStops),function(stop,index){return _c('q-item',{directives:[{name:"ripple",rawName:"v-ripple"}],key:stop,staticStyle:{"padding-left":"8px","padding-right":"5px"},attrs:{"clickable":""}},[_c('q-item-section',{attrs:{"avatar":""}},[_c('q-icon',{staticClass:"cursor-DandD handle",attrs:{"color":"primary","name":"drag_indicator"}})],1),_c('q-item-section',{on:{"click":function($event){return _vm.$emit('editStop', index);}}},[_c('q-item-label',{attrs:{"lines":"1"}},[_vm._v(_vm._s(stop.Title))]),_c('q-item-label',{staticStyle:{"max-width":"400px"},attrs:{"caption":"","lines":"1"}},[_c('q-icon',{attrs:{"name":"location_on"}}),_vm._v("\n              "+_vm._s(stop.Location.label.split(',')[0])+"\n              ")],1)],1),_c('q-item-section',{attrs:{"side":"","top":""},on:{"click":function($event){return _vm.$emit('editStop', index);}}},[_c('div',{staticClass:"flex justify-center",staticStyle:{"flex-direction":"column","height":"100%"}},[_vm._v("\n              "+_vm._s(stop.InitDate.split(' ')[0])+"\n            ")])]),_c('q-item-section',{staticStyle:{"padding":"0"},attrs:{"side":"","top":""}},[_c('div',[_c('q-btn',{attrs:{"flat":"","round":"","size":"13px","icon":"edit"},on:{"click":function($event){return _vm.$emit('editStop', index);}}},[_c('q-tooltip',[_vm._v("Stopp bearbeiten")])],1)],1)]),_c('q-item-section',{staticStyle:{"padding":"0"},attrs:{"side":"","top":""}},[_c('div',[_c('q-btn',{attrs:{"flat":"","round":"","size":"13px","icon":"delete"},on:{"click":function($event){return _vm.$emit('removeStop', index)}}},[_c('q-tooltip',[_vm._v("Stopp löschen")])],1)],1)])],1)}),1)],1),_c('q-separator',{attrs:{"inset":"item"}})],1),(_vm.addedStops.length === 0)?_c('div',{staticStyle:{"padding":"0 10px 0 10px"}},[_c('span',{staticClass:"font-medium"},[_vm._v("Klicke auf einen Ort auf der Karte um ihn hinzuzufügen oder benutze die Suche oben rechts.")])]):_vm._e()],1)}
var TripOverviewListvue_type_template_id_29e0c00c_staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/TripOverview/TripOverviewList.vue?vue&type=template&id=29e0c00c&

// EXTERNAL MODULE: ./node_modules/vuedraggable/dist/vuedraggable.umd.js
var vuedraggable_umd = __webpack_require__("b76a");
var vuedraggable_umd_default = /*#__PURE__*/__webpack_require__.n(vuedraggable_umd);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/TripOverview/TripOverviewList.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var TripOverviewListvue_type_script_lang_js_ = ({
  name: 'TripOverviewList',
  components: {
    draggable: vuedraggable_umd_default.a
  },
  props: {
    addedStops: Array,
    currentRoundtrip: Object
  },
  methods: {
    emitOnDragged(event) {
      event.addedStops = this.addedStops;
      this.$emit('stopsDragged', event);
    }

  }
});
// CONCATENATED MODULE: ./src/pages/TripOverview/TripOverviewList.vue?vue&type=script&lang=js&
 /* harmony default export */ var TripOverview_TripOverviewListvue_type_script_lang_js_ = (TripOverviewListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/TripOverview/TripOverviewList.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  TripOverview_TripOverviewListvue_type_script_lang_js_,
  TripOverviewListvue_type_template_id_29e0c00c_render,
  TripOverviewListvue_type_template_id_29e0c00c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TripOverviewList = (component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/TripOverview/TripOverview.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var TripOverviewvue_type_script_lang_js_ = ({
  name: 'TripOverview',
  components: {
    Map: Map["default"],
    TripOverviewList: TripOverviewList
  },

  data() {
    return {
      drawerLeft: false,
      miniState: true,
      miniDisabled: false,
      tab: 'map'
    };
  },

  methods: {
    refreshMap() {
      if (this.$refs.overviewMap) this.$refs.overviewMap.loadMap(null, this.addedStops);
    }

  },
  props: {
    addedStops: Array,
    currentRoundtrip: Object,
    isEditMode: Boolean
  },
  computed: {
    isTablet() {
      return window.matchMedia('(max-width: 958px)').matches;
    },

    drawerInvisible() {
      return window.matchMedia('(max-width: 550px)').matches;
    }

  }
});
// CONCATENATED MODULE: ./src/pages/TripOverview/TripOverview.vue?vue&type=script&lang=js&
 /* harmony default export */ var TripOverview_TripOverviewvue_type_script_lang_js_ = (TripOverviewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/pages/TripOverview/TripOverview.vue?vue&type=style&index=0&lang=less&
var TripOverviewvue_type_style_index_0_lang_less_ = __webpack_require__("0a2e");

// CONCATENATED MODULE: ./src/pages/TripOverview/TripOverview.vue






/* normalize component */

var TripOverview_component = Object(componentNormalizer["a" /* default */])(
  TripOverview_TripOverviewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TripOverview = __webpack_exports__["default"] = (TripOverview_component.exports);

/***/ }),

/***/ "d8fd":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},0,[23]]);
//# sourceMappingURL=18.js.map