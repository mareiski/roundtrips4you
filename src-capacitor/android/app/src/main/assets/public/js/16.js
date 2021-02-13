(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "884a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RoundtripSettings_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ae79");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RoundtripSettings_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RoundtripSettings_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RoundtripSettings_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ae79":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c21a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/RoundtripSettings.vue?vue&type=template&id=c8be6bde&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-px-lg"},[(_vm.user !== null)?_c('div',{staticClass:"edit-btn-container",staticStyle:{"position":"fixed","z-index":"1","right":"0","padding":"10px"}},[_c('q-btn',{attrs:{"round":"","color":"primary","icon":"visibility"},on:{"click":function($event){return _vm.$router.push('/rundreise-ansehen/' + _vm.RTId)}}},[_c('q-tooltip',[_vm._v("Reise ansehen")])],1)],1):_vm._e(),_c('h3',{staticStyle:{"padding-top":"10px"}},[_vm._v("Einstellungen")]),_c('q-form',{staticClass:"q-gutter-md rounded-borders",attrs:{"bordered":""}},[_c('h4',[_vm._v("Reise teilen")]),_c('q-list',{staticClass:"rounded-borders",staticStyle:{"padding":"10px"},attrs:{"bordered":""}},[_c('q-item-label',{staticStyle:{"padding-bottom":"5px"}},[_vm._v("Wenn deine Rundreise veröffentlicht ist kann sie jeder ansehen und kopieren.")]),_c('q-toggle',{attrs:{"label":"Rundreise veröffentlichen","icon":"share","disable":!_vm.user || !_vm.user.displayName},on:{"input":_vm.onSaveRoundtrip},model:{value:(_vm.publish),callback:function ($$v) {_vm.publish=$$v},expression:"publish"}},[(!_vm.user || !_vm.user.displayName)?_c('q-tooltip',[_vm._v("Bitte erstelle zuerst einen Benutzernamen")]):_vm._e()],1),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.publish),expression:"publish"}],staticStyle:{"padding-bottom":"20px"}},[_c('b',[_vm._v("Link zur Karte veröffentlichen")]),_c('p',[_vm._v("Über den Folgenden Link kannst du die Karte deiner Reise veröffentlichen. Ebenso wird ein Link zu der ganzen Reise auf Roundtrips4you veröffentlicht.")]),_c('a',{attrs:{"href":'https://roundtrips4you.de/MapWidget/' + _vm.RTId}},[_vm._v("https://roundtrips4you.de/MapWidget/"+_vm._s(_vm.RTId))]),_c('q-icon',{staticClass:"cursor-pointer",staticStyle:{"margin-left":"10px"},attrs:{"size":"25px;","name":"file_copy"},on:{"click":function($event){return _vm.copyShareLink('share-link')}}}),_c('input',{attrs:{"type":"hidden","id":"share-link"},domProps:{"value":_vm.shareLink}}),_c('br'),_c('br'),_c('p',[_vm._v("Dieser Link darf auch per Iframe in eine Website eingebettet werden. Dazu einfach den folgenden Code kopieren und an die entsprechende Stelle einfügen.")]),_c('span',[_vm._v("<iframe src='https://roundtrips4you.de/MapWidget/"+_vm._s(_vm.RTId)+"'></iframe>")]),_c('q-icon',{staticClass:"cursor-pointer",staticStyle:{"margin-left":"10px"},attrs:{"size":"25px;","name":"file_copy"},on:{"click":function($event){return _vm.copyShareLink('share-code')}}}),_c('input',{attrs:{"type":"hidden","id":"share-code"},domProps:{"value":_vm.shareCode}})],1),_c('q-select',{staticClass:"input-item",attrs:{"outlined":"","options":_vm.categoryOptions,"label":"Kategorie","use-input":"","rules":[function (val) { return val !== null && val !== '' || 'Bitte wähle eine Kategorie'; }]},on:{"blur":_vm.onSaveRoundtrip},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"access_time"}})]},proxy:true}]),model:{value:(_vm.category),callback:function ($$v) {_vm.category=$$v},expression:"category"}}),_c('div',{staticClass:"flex",staticStyle:{"padding-bottom":"20px"}},[_c('q-rating',{staticClass:"stars",staticStyle:{"margin-right":"10px"},attrs:{"size":"15px","color":"gold","readonly":!isNaN(_vm.hotelRatingAvg())},on:{"blur":_vm.onSaveRoundtrip},model:{value:(_vm.stars),callback:function ($$v) {_vm.stars=$$v},expression:"stars"}}),_c('q-item-label',[_vm._v("Durchschittliche Hotelbewertung "+_vm._s(!isNaN(_vm.hotelRatingAvg()) ? '(errechnet)' : ''))])],1),_c('q-input',{attrs:{"outlined":"","autogrow":"","label":"Kurze Beschreibung","rules":[function (val) { return val !== null && val !== '' || 'Bitte gib eine Beschreibung an'; },
        function (val) { return val.length > 10 && val.length < 160 || 'Bitte gib eine Beschreibung zwischen 10 und 160 Zeichen an'; } ]},on:{"blur":_vm.onSaveRoundtrip},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"subject"}})]},proxy:true}]),model:{value:(_vm.descriptionInput),callback:function ($$v) {_vm.descriptionInput=$$v},expression:"descriptionInput"}}),_c('q-select',{staticClass:"input-item",attrs:{"outlined":"","options":['zu Fuß', 'Fahrrad', 'Auto'],"label":"Reisemittel","use-input":"","rules":[function (val) { return val !== null && val !== '' || 'Bitte wähle ein Reisemittel'; }]},on:{"input":function($event){return _vm.getGeneralProfile()},"blur":_vm.onSaveRoundtrip},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"commute"}})]},proxy:true}]),model:{value:(_vm.inputProfile),callback:function ($$v) {_vm.inputProfile=$$v},expression:"inputProfile"}}),_c('q-input',{attrs:{"label":"Highlight 1","outlined":"","rules":[function (val) { return val !== null && val !== '' || 'Bitte gib ein Highlight an'; }]},on:{"blur":_vm.onSaveRoundtrip},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"star"}})]},proxy:true}]),model:{value:(_vm.highlight1),callback:function ($$v) {_vm.highlight1=$$v},expression:"highlight1"}}),_c('q-input',{attrs:{"label":"Highlight 2","outlined":"","rules":[function (val) { return val !== null && val !== '' || 'Bitte gib ein Highlight an'; }]},on:{"blur":_vm.onSaveRoundtrip},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"star"}})]},proxy:true}]),model:{value:(_vm.highlight2),callback:function ($$v) {_vm.highlight2=$$v},expression:"highlight2"}}),_c('q-input',{attrs:{"label":"Highlight 3","outlined":"","rules":[function (val) { return val !== null && val !== '' || 'Bitte gib ein Highlight an'; }]},on:{"blur":_vm.onSaveRoundtrip},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"star"}})]},proxy:true}]),model:{value:(_vm.highlight3),callback:function ($$v) {_vm.highlight3=$$v},expression:"highlight3"}}),_c('q-input',{attrs:{"label":"Pauschalpreis ohne Freizeitgestaltung","type":"number","outlined":"","rules":[function (val) { return val !== null && val !== 0 && val > 0 || 'Bitte gib einen Preis an'; }]},on:{"blur":_vm.onSaveRoundtrip},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"euro"}})]},proxy:true}]),model:{value:(_vm.price),callback:function ($$v) {_vm.price=$$v},expression:"price"}}),_c('q-item-label',{staticStyle:{"padding-bottom":"5px","margin-top":"10px"}},[_vm._v("Angebotszeitraum")]),_c('q-toggle',{attrs:{"label":"Ganzes Jahr","icon":"event"},on:{"input":_vm.onSaveRoundtrip},model:{value:(_vm.wholeYearOffer),callback:function ($$v) {_vm.wholeYearOffer=$$v},expression:"wholeYearOffer"}}),_c('q-input',{staticClass:"q-field--with-bottom",attrs:{"disable":_vm.wholeYearOffer,"outlined":"","label":"von"},on:{"blur":_vm.onSaveRoundtrip},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"event"}})]},proxy:true}]),model:{value:(_vm.OfferStartPeriod),callback:function ($$v) {_vm.OfferStartPeriod=$$v},expression:"OfferStartPeriod"}},[_c('q-popup-proxy',{ref:"qDateProxy1",attrs:{"transition-show":"scale","transition-hide":"scale"}},[_c('q-date',{attrs:{"today-btn":"","mask":"DD.MM.YYYY"},on:{"input":function () { return [_vm.$refs.qDateProxy1.hide(), _vm.OfferEndPeriod = _vm.OfferStartPeriod]; }},model:{value:(_vm.OfferStartPeriod),callback:function ($$v) {_vm.OfferStartPeriod=$$v},expression:"OfferStartPeriod"}})],1)],1),_c('q-input',{staticClass:"q-field--with-bottom",attrs:{"disable":_vm.wholeYearOffer,"outlined":"","label":"bis"},on:{"blur":_vm.onSaveRoundtrip},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"event"}})]},proxy:true}]),model:{value:(_vm.OfferEndPeriod),callback:function ($$v) {_vm.OfferEndPeriod=$$v},expression:"OfferEndPeriod"}},[_c('q-popup-proxy',{ref:"qDateProxy2",attrs:{"transition-show":"scale","transition-hide":"scale"}},[_c('q-date',{attrs:{"today-btn":"","mask":"DD.MM.YYYY","options":_vm.scheduleDateOptions},on:{"input":function () { return _vm.$refs.qDateProxy2.hide(); }},model:{value:(_vm.OfferEndPeriod),callback:function ($$v) {_vm.OfferEndPeriod=$$v},expression:"OfferEndPeriod"}})],1)],1),(_vm.countries.length === 1)?_c('RegionSearch',{attrs:{"country":_vm.countries[0],"defaultRegion":_vm.region},on:{"update":function($event){return _vm.updateRegion($event)},"blur":_vm.onSaveRoundtrip}}):_vm._e()],1),_c('h4',[_vm._v("Persönliche Informationen")]),_c('q-list',{staticClass:"rounded-borders",staticStyle:{"padding":"10px"},attrs:{"bordered":""}},[_c('p',{staticStyle:{"margin-bottom":"15px"}},[_vm._v("Diese werden nur dir angezeigt und auch beim Veröffentlichen nicht berücksichtigt.")]),_c('div',[_c('q-input',{attrs:{"label":"Zimmer","type":"number","rules":[function (val) { return val !== null &&  val !== '' && val > 0  || 'Bitte gib eine Zimmeranzahl an'; }],"outlined":""},on:{"blur":_vm.onSaveRoundtrip},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"house"}})]},proxy:true}]),model:{value:(_vm.rooms),callback:function ($$v) {_vm.rooms=$$v},expression:"rooms"}}),_c('q-input',{attrs:{"label":"Erwachsene","type":"number","rules":[function (val) { return val !== null &&  val !== '' && val > 0  || 'Bitte gib die Anzahl der Erwachsenen Reisenden an'; }, function (val) { return val <= parseInt(_vm.rooms) * 9 || 'Bitte wähle mehr Zimmer'; }],"outlined":""},on:{"blur":_vm.onSaveRoundtrip},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"group"}})]},proxy:true}]),model:{value:(_vm.adults),callback:function ($$v) {_vm.adults=$$v},expression:"adults"}}),_c('q-input',{attrs:{"label":"Kinder","type":"number","rules":[function (val) { return val !== null &&  val !== '' && val >= 0  && val <= 20|| 'Bitte gib die Anzahl der Kinder auf der Reise an'; }],"outlined":""},on:{"blur":function($event){parseInt(_vm.children) === 0 ? _vm.onSaveRoundtrip() : null},"input":function($event){_vm.childrenAges.length = parseInt(_vm.children)}},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"child_friendly"}})]},proxy:true}]),model:{value:(_vm.children),callback:function ($$v) {_vm.children=$$v},expression:"children"}}),(parseInt(_vm.children) > 0  && parseInt(_vm.children) <= 20)?_c('div',{staticClass:"flex"},_vm._l((parseInt(_vm.children)),function(childNum){return _c('q-input',{key:childNum,staticStyle:{"margin-right":"10px"},attrs:{"label":'Alter Kind ' + childNum,"type":"number","rules":[function (val) { return val !== null &&  val !== '' && val > 0 || 'Bitte gib das Alter des Kindes an'; }],"outlined":""},on:{"blur":_vm.onSaveRoundtrip},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"child_friendly"}})]},proxy:true}],null,true),model:{value:(_vm.childrenAges[childNum - 1]),callback:function ($$v) {_vm.$set(_vm.childrenAges, childNum - 1, $$v)},expression:"childrenAges[childNum - 1]"}})}),1):_vm._e()],1)]),_c('h4',[_vm._v("Bilder")]),_c('q-list',{staticClass:"rounded-borders",staticStyle:{"padding":"10px"},attrs:{"bordered":""}},[_c('div',[_c('p',[_vm._v("Bitte verwende nur Bilder die für die Wiederverwendung eindeutig gekennzeichnet sind.")]),_c('span',[_vm._v("Titelbild")]),_c('div',{staticClass:"uploader"},[_c('q-img',{staticStyle:{"height":"100%"},attrs:{"src":_vm.titleImgUrl}}),_c('q-btn',{staticStyle:{"position":"absolute"},attrs:{"round":"","color":"primary","icon":"add","disable":_vm.titleUploadDisabled},on:{"click":function () { return _vm.$refs.titleUpload.pickFiles(); }}},[_c('q-inner-loading',{staticStyle:{"border-radius":"50%"},attrs:{"showing":_vm.titleUploadDisabled}},[_c('q-spinner',{attrs:{"size":"42px","color":"primary"}})],1)],1)],1),_c('q-uploader',{ref:"titleUpload",staticStyle:{"max-width":"300px","display":"none"},attrs:{"url":"","label":"Titelbild hochladen","accept":".jpg, image/*","hide-upload-btn":""},on:{"added":function($event){return _vm.fileAdded($event, 'title')}}})],1),_c('q-uploader',{ref:"galeryUpload",staticStyle:{"max-width":"300px","display":"none"},attrs:{"url":"","label":"Weitere Bilder hochladen","multiple":"","hide-upload-btn":""},on:{"added":function($event){return _vm.fileAdded($event, 'galery')}}}),_c('span',[_vm._v("weitere Bilder")]),_c('div',{staticClass:"galeryImgUploaderContainer"},[_vm._l((_vm.galeryImgUrls),function(url,index){return _c('div',{key:index,staticClass:"uploader"},[_c('q-img',{staticStyle:{"height":"100%"},attrs:{"src":url}}),_c('q-btn',{staticStyle:{"transform":"rotate(45deg)","position":"absolute"},attrs:{"round":"","color":"primary","icon":"add"},on:{"click":function($event){return _vm.removeFile(index)}}})],1)}),_c('div',{staticClass:"uploader"},[_c('q-btn',{staticStyle:{"position":"relative"},attrs:{"round":"","color":"primary","icon":"add","disable":_vm.visible},on:{"click":function () { return _vm.$refs.galeryUpload.pickFiles(); }}},[_c('q-inner-loading',{staticStyle:{"border-radius":"50%"},attrs:{"showing":_vm.visible}},[_c('q-spinner',{attrs:{"size":"42px","color":"primary"}})],1)],1)],1)],2)],1)],1),(_vm.companyProfile)?_c('h4',[_vm._v("Unternehmenseinstellungen")]):_vm._e(),(_vm.companyProfile)?_c('q-list',{staticClass:"rounded-borders",staticStyle:{"padding":"10px"},attrs:{"bordered":""}},[_c('q-input',{attrs:{"outlined":"","clear-icon":"","rules":[function (val) { return !val || _vm.urlReg.test(val) || 'Bitte gib einen richtigen Link an'; }],"label":"Link zu dieser Reise","lazy-rules":""},on:{"blur":function($event){_vm.tripWebsite && _vm.urlReg.test(_vm.tripWebsite)  ? _vm.saveData('tripWebsite', _vm.tripWebsite) : null}},model:{value:(_vm.tripWebsite),callback:function ($$v) {_vm.tripWebsite=$$v},expression:"tripWebsite"}})],1):_vm._e(),_c('h4',[_vm._v("Danger Zone")]),_c('q-list',{staticClass:"rounded-borders",staticStyle:{"padding":"10px","border-color":"red","margin-bottom":"20px"},attrs:{"bordered":""}},[_c('p',{staticStyle:{"font-size":"18px"}},[_vm._v("Diese Rundreise und alle enthaltenen Inhalte löschen")]),_c('q-btn',{staticClass:"q-mt-md",attrs:{"loading":_vm.deleting,"label":"Löschen","color":"primary","text-color":"white"},on:{"click":function($event){_vm.deleteDialog = true;}},scopedSlots:_vm._u([{key:"loading",fn:function(){return [_c('q-spinner')]},proxy:true}])}),_c('q-dialog',{attrs:{"persistent":""},model:{value:(_vm.deleteDialog),callback:function ($$v) {_vm.deleteDialog=$$v},expression:"deleteDialog"}},[_c('q-card',[_c('q-card-section',{staticClass:"row items-center"},[_c('span',{staticClass:"q-ml-sm"},[_vm._v("Willst du wirklich diese Rundreise und alle enthaltenen Inhalte löschen ? Dies kann nicht mehr rückgängig gemacht werden.")])]),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"Rundreise Löschen","color":"primary"},on:{"click":function($event){return _vm.deleteRoundtrip()}}}),_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"Abbrechen","color":"primary"}})],1)],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/RoundtripSettings.vue?vue&type=template&id=c8be6bde&

// EXTERNAL MODULE: ./node_modules/quasar/src/utils/date.js
var date = __webpack_require__("bd4c");

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// EXTERNAL MODULE: ./src/sharedMethods.js
var sharedMethods = __webpack_require__("15c8");

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/RoundtripSettings.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




let timeStamp = Date.now();
let formattedScheduleDate = date["b" /* default */].formatDate(timeStamp, 'DD.MM.YYYY');
let context;
/* harmony default export */ var RoundtripSettingsvue_type_script_lang_js_ = ({
  name: 'RoundtripSettings',
  components: {
    RegionSearch: () => __webpack_require__.e(/* import() */ 15).then(__webpack_require__.bind(null, "9ce1"))
  },

  data() {
    return {
      stops: [],
      region: null,
      profile: null,
      inputProfile: null,
      RTId: null,
      OfferStartPeriod: formattedScheduleDate,
      OfferEndPeriod: formattedScheduleDate,
      countries: [],
      publish: false,
      stars: 3,
      descriptionInput: null,
      highlight1: null,
      highlight2: null,
      highlight3: null,
      wholeYearOffer: false,
      rooms: 0,
      adults: 0,
      children: 0,
      childrenAges: [],
      price: 0,
      category: 'Familienreise',
      categoryOptions: [],
      deleteDialog: false,
      companyProfile: false,
      tripWebsite: null,
      deleting: false,
      visible: false,
      titleImgUrl: null,
      galeryImgUrls: [],
      titleUploadDisabled: false,
      shareLink: null,
      shareCode: null
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
    /**
       * Copy share link of roundtrip to clipboard
       * @param {String} elementId the id of the element, where the link to copy is
       * @example copyShareLink('share-link-element')
       */
    copyShareLink(elementId) {
      let testingCodeToCopy = document.querySelector('#' + elementId);
      testingCodeToCopy.setAttribute('type', 'text');
      testingCodeToCopy.select();

      try {
        document.execCommand('copy');
        sharedMethods["a" /* default */].showSuccessNotification('Link wurde erfolgreich kopiert');
      } catch (err) {
        sharedMethods["a" /* default */].showErrorNotification('Oops da ist wohl was schiefgelaufen');
      } // unselect the range


      testingCodeToCopy.setAttribute('type', 'hidden');
      window.getSelection().removeAllRanges();
    },

    /**
       * get the average hotel rating
       */
    hotelRatingAvg() {
      let sum = 0;
      let count = 0;
      this.stops.forEach((stop, index) => {
        if (stop.HotelName) {
          sum += parseInt(stop.HotelStars, 10);
          count++;
        }
      });
      return sum / count;
    },

    getGeneralProfile() {
      switch (this.inputProfile) {
        case 'zu Fuß':
          this.profile = 'walking';
          break;

        case 'Fahrrad':
          this.profile = 'cycling';
          break;

        default:
          this.profile = 'driving';
          break;
      }
    },

    getStops(RTId) {
      // get stops
      let roundtripsRef = firebaseInit["b" /* db */].collection('RoundtripDetails').where('RTId', '==', RTId).orderBy('InitDate');
      roundtripsRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          let stop = doc.data();

          if (typeof stop.InitDate !== 'string') {
            let initDate = new Date(stop.InitDate.seconds * 1000);
            stop.InitDate = date["b" /* default */].formatDate(initDate, 'DD.MM.YYYY HH:mm');
          }

          if (!stop.DayDuration) stop.DayDuration = 0;
          stop.DocId = doc.id;
          this.stops.push(stop);
          this.stops.sort(this.compare);
        });
      });
    },

    /**
       * update region object witch region search results
       * @param event event from region search update callback
       */
    updateRegion(event) {
      if (event !== null) {
        this.region = event;
      }
    },

    onSaveRoundtrip() {
      let dateParts = this.OfferStartPeriod.split('.');
      let offerStartPeriod = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      dateParts = this.OfferEndPeriod.split('.');
      let offerEndPeriod = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      firebaseInit["b" /* db */].collection('Roundtrips').doc(this.RTId).update({
        Public: this.publish,
        Location: this.countries,
        Category: this.category,
        Stars: this.stars,
        Description: this.descriptionInput,
        Highlights: [this.highlight1, this.highlight2, this.highlight3],
        Region: this.region,
        Profile: this.inputProfile,
        OfferStartPeriod: offerStartPeriod,
        OfferEndPeriod: offerEndPeriod,
        Price: this.price,
        OfferWholeYear: this.wholeYearOffer,
        Rooms: this.rooms,
        Adults: this.adults,
        ChildrenAges: this.childrenAges
      }).catch(e => {
        console.log(e);
        sharedMethods["a" /* default */].showErrorNotification('Bitte überprüfe deine Angaben');
      });
    },

    /**
       * fetch trip countries and save them
       * @important don't remove or move to another file (this method is also called from stop file)
       */
    fetchAndSaveCountries() {
      let tempCountries = [];
      let promiseList = [];
      this.stops.forEach((stop, index) => {
        let url = 'http://api.geonames.org/countryCodeJSON?lang=de&lat=' + stop.Location.lat + '&lng=' + stop.Location.lng + '&username=roundtrips4you';
        promiseList.push(axios_default.a.get(url).then(response => {
          if (!tempCountries.includes(response.data.countryName)) {
            tempCountries.push(response.data.countryName);
          }
        }).catch(function (error) {
          console.log(error);
        }));
      });
      Promise.all(promiseList).then(vals => {
        this.countries = [];
        this.countries = tempCountries; // save countries

        this.saveData('Location', this.countries);
      });
    },

    /**
       * fetch all category options from firebase db
       */
    fetchCategories() {
      let roundtripsRef = firebaseInit["b" /* db */].collection('Categories');
      roundtripsRef.get().then(snapshot => {
        this.categoryOptions = [];
        snapshot.forEach(doc => {
          this.categoryOptions.push(doc.data().Category);
        });
      });
    },

    /**
       * Quasar date options for offer period
       */
    scheduleDateOptions(date) {
      const dateTimeParts = this.OfferStartPeriod.split(' ');
      const dateParts = dateTimeParts[0].split('.');
      const compareDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      const currentDate = new Date(date);
      return currentDate > compareDate;
    },

    /**
       * fetches data of the roundtrip for the given id
       * @param RTId the id of the roundtrip to fetch (current RT id)
       */
    fetchSingleRoundtrip(RTId) {
      if (this.isInDemoSession) {
        let roundtrip = this.$store.getters['demoSession/getRoundtrip'];
        this.writeRoundtripIntoFields(roundtrip);
      } else {
        this.$store.dispatch('roundtrips/fetchSingleRoundtrip', RTId).then(roundtrip => {
          this.writeRoundtripIntoFields(roundtrip);
        }).catch(err => {
          console.log('Error getting Roundtrip', err); // show this message only if it's not a user

          if (firebaseInit["a" /* auth */].user()) {
            sharedMethods["a" /* default */].showErrorNotification('Es gibt fehlende Angaben bei deiner Rundreise');
          }
        });
      }
    },

    /**
       * Writes the current roundtrip data into local fields
       * @param roundtrip the roundtrip object that contains all data
       */
    writeRoundtripIntoFields(roundtrip) {
      this.shareLink = 'https://roundtrips4you.de/MapWidget/' + this.RTId;
      this.shareCode = '<iframe src="https://roundtrips4you.de/MapWidget/' + this.RTId + '"></iframe>';
      this.title = roundtrip.Title;
      this.publish = roundtrip.Public;
      this.countries = roundtrip.Location;
      this.stars = roundtrip.Stars;
      this.category = roundtrip.Category;
      this.descriptionInput = roundtrip.Description;
      this.highlight1 = roundtrip.Highlights[0];
      this.highlight2 = roundtrip.Highlights[1];
      this.highlight3 = roundtrip.Highlights[2];
      this.inputProfile = roundtrip.Profile;
      this.region = roundtrip.Region;
      this.price = roundtrip.Price;
      this.wholeYearOffer = roundtrip.OfferWholeYear;
      this.rooms = roundtrip.Rooms;
      this.adults = roundtrip.Adults;
      this.children = roundtrip.ChildrenAges.length;
      this.childrenAges = roundtrip.ChildrenAges;
      if (roundtrip.tripWebsite) this.tripWebsite = roundtrip.tripWebsite;
      this.pageTitle = this.title + ' bearbeiten';
      this.arrivalDepatureProfile = roundtrip.TransportProfile ? roundtrip.TransportProfile : 'Flugzeug';
      this.origin = roundtrip.Origin;
      let retrievedDate = new Date(roundtrip.OfferEndPeriod.seconds * 1000);
      this.OfferEndPeriod = date["b" /* default */].formatDate(retrievedDate, 'DD.MM.YYYY');
      retrievedDate = new Date(roundtrip.OfferStartPeriod.seconds * 1000);
      this.OfferStartPeriod = date["b" /* default */].formatDate(retrievedDate, 'DD.MM.YYYY');

      if (this.arrivalDepatureProfile === 'Flugzeug') {
        this.destination = roundtrip.Destination;
        this.travelClass = roundtrip.TravelClass ? roundtrip.TravelClass : 'Economy';
        this.nonStop = roundtrip.NonStop ? roundtrip.NonStop : 'Ja';
        this.originCode = roundtrip.OriginCode;
        this.destinationCode = roundtrip.DestinationCode;

        if (this.depatureDate && roundtrip.DepatureDate) {
          retrievedDate = new Date(roundtrip.DepatureDate.seconds * 1000);
          this.depatureDate = date["b" /* default */].formatDate(retrievedDate, 'DD.MM.YYYY');
        } else {
          this.depatureDate = formattedScheduleDate;
        }

        if (this.returnDate && roundtrip.ReturnDate) {
          retrievedDate = new Date(roundtrip.ReturnDate.seconds * 1000);
          this.returnDate = date["b" /* default */].formatDate(retrievedDate, 'DD.MM.YYYY');
        } else {
          this.depatureDate = formattedScheduleDate;
        }
      } // get the default profile of the roundtrip


      this.getGeneralProfile();
      this.loadInitImgs();
    },

    loadInitImgs() {
      var fileRef = firebaseInit["c" /* storage */].ref().child('Images/Roundtrips/' + this.RTId + '/Title/titleImg');
      fileRef.getDownloadURL().then(function (url) {
        context.titleImgUrl = url;
      }).catch(e => {});
      fileRef = firebaseInit["c" /* storage */].ref().child('Images/Roundtrips/' + this.RTId + '/Galery');
      fileRef.listAll().then(function (res) {
        res.items.forEach(function (itemRef) {
          fileRef = firebaseInit["c" /* storage */].ref().child(itemRef.fullPath);
          context.galeryImgUrls = [];
          fileRef.getDownloadURL().then(function (url, index) {
            context.galeryImgUrls.push(url);
          });
        });
      }).catch(function () {});
    },

    fileAdded(event, kind) {
      let files = event;
      let uploadIndex = 0; // disable another upload

      if (kind === 'galery') this.visible = true;else this.titleUploadDisabled = true;
      this.uploadNext(files, kind, uploadIndex);
      this.$refs.titleUpload.reset();
      this.$refs.galeryUpload.reset();
    },

    uploadNext(files, kind, uploadIndex) {
      if (!this.uploading) {
        this.upload(files[uploadIndex], kind, uploadIndex + this.galeryImgUrls.length, uploadIndex === files.length - 1, files.length, uploadIndex).then(function (success) {
          context.uploading = false;
          uploadIndex++;

          if (uploadIndex < files.length) {
            context.uploadNext(files, kind, uploadIndex);
          }
        });
      }
    },

    upload(file, kind, count, lastItem, absoluteFiles, uploadIndex) {
      this.uploading = true;
      return new Promise((resolve, reject) => {
        let kindPath = 'Title/titleImg';

        if (kind === 'galery') {
          kindPath = 'Galery/galeryImg' + count;
        }

        const fileRef = firebaseInit["c" /* storage */].ref().child('Images/Roundtrips/' + this.RTId + '/' + kindPath);
        fileRef.put(file).then(function (snapshot) {
          sharedMethods["a" /* default */].showSuccessNotification('Bild ' + (uploadIndex + 1) + ' von ' + absoluteFiles + ' wurde erfolgreich hochgeladen');

          if (lastItem) {
            context.visible = false;
            context.titleUploadDisabled = false;
          }

          fileRef.getDownloadURL().then(function (url) {
            if (kind === 'galery') {
              context.galeryImgUrls.push(url);
            } else if (kind === 'title') {
              context.titleImgUrl = url;
            }
          });
          resolve(true);
        }).catch(function (error) {
          console.log(error);
          sharedMethods["a" /* default */].showErrorNotification('Das Bild konnte nicht hochgeladen werden');
          context.visible = false;
          context.titleUploadDisabled = false;
          resolve(false);
        });
      });
    },

    /**
       * delete the current roundtrip
       */
    deleteRoundtrip() {
      if (this.RTId === null || this.RTId === '' || this.RTId === 'undefined') {
        return false;
      }

      try {
        this.$store.dispatch('roundtrips/deleteRoundtrip', this.RTId).then(success => {
          if (success) {
            sharedMethods["a" /* default */].showSuccessNotification('Rundreise wurde gelöscht');
            context.$router.push('/meine-rundreisen');
          } else {
            sharedMethods["a" /* default */].showErrorNotification('Die Rundreise konnte nicht gelöscht werden');
          }
        });
      } catch (error) {
        console.log(error);
        sharedMethods["a" /* default */].showErrorNotification('Die Rundreise konnte nicht gelöscht werden');
      }
    }

  },

  created() {
    let RTId = this.$route.params.id;
    this.RTId = RTId;
    context = this;

    if (RTId) {
      this.getStops(RTId);
      this.fetchCategories();
      this.fetchSingleRoundtrip(RTId);
    } else {
      sharedMethods["a" /* default */].showErrorNotification('Oops die Einstellungen konnten nicht geladen werden.');
      this.$router.push('/meine-rundreisen');
    }
  }

});
// CONCATENATED MODULE: ./src/pages/RoundtripSettings.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_RoundtripSettingsvue_type_script_lang_js_ = (RoundtripSettingsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/pages/RoundtripSettings.vue?vue&type=style&index=0&lang=less&
var RoundtripSettingsvue_type_style_index_0_lang_less_ = __webpack_require__("884a");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/RoundtripSettings.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_RoundtripSettingsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var RoundtripSettings = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=16.js.map