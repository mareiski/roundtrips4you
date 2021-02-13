(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ "38f5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/EditRoundtripComponents/dailyTrip.vue?vue&type=template&id=ab93963c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.newDailyTripDate)?_c('div',{staticClass:"divider"},[_c('hr'),_c('span',[_vm._v(_vm._s(_vm.dailyTrip.date.split(' ')[0]))])]):_vm._e(),_c('span',{staticClass:"duration-span"},[_vm._v(_vm._s(_vm.duration && _vm.duration.duration ? _vm.duration.duration + ' ' + _vm.duration.distance + ' ab ' + (_vm.newDailyTripDate ? _vm.duration.defaultCityLabel.split(',')[0] : _vm.duration.cityFromLabel.split(',')[0]) : ''))]),_c('q-list',{staticClass:"rounded-borders",attrs:{"bordered":""}},[_c('q-expansion-item',{attrs:{"expand-separator":""},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('q-item-section',{attrs:{"avatar":""}},[_c('q-avatar',{staticStyle:{"padding":"0"},attrs:{"icon":"location_on","color":"primary","text-color":"white"}})],1),_c('q-item-section',[_c('div',{staticClass:"q-item__label"},[_vm._v(_vm._s(_vm.dailyTrip.location.label.split(',')[0]))]),_c('div',{staticClass:"q-item__label q-item__label--caption text-caption"},[_vm._v(_vm._s(_vm.dailyTrip.date.split(' ')[1] + (_vm.dailyTrip.days ? ', ca. ' + _vm.dailyTrip.days.days + ' Aufenthalt': '')))])]),(_vm.editor)?_c('q-item-section',{attrs:{"side":""}},[_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"delete"},on:{"click":function($event){return _vm.deleteEntry()}}},[_c('q-tooltip',[_vm._v("Tagesausflug löschen")])],1)],1):_vm._e()]},proxy:true}])},[_c('q-card',[_c('q-card-section',[(_vm.editor)?_c('span',[(_vm.editor)?_c('q-popup-proxy',{ref:"qDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale","persistent":""}},[_c('q-date',{attrs:{"today-btn":"","mask":"DD.MM.YYYY HH:mm","options":_vm.dailyTripDateOptions},model:{value:(_vm.dailyTrip.date),callback:function ($$v) {_vm.$set(_vm.dailyTrip, "date", $$v)},expression:"dailyTrip.date"}}),_c('div',{staticClass:"flex justify-between",staticStyle:{"width":"100%"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticStyle:{"margin":"10px"},on:{"click":function($event){_vm.dailyTrip.date = _vm.oldDate}}},[_vm._v("abbrechen")]),_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticStyle:{"margin":"10px"},attrs:{"color":"primary"},on:{"click":function($event){[_vm.saveDate(false), _vm.$refs.qTimeProxy.show()]}}},[_vm._v("weiter")])],1)],1):_vm._e(),_vm._v("\n            Datum/Zeit ändern\n            "),(_vm.editor)?_c('q-icon',{attrs:{"size":"16px","name":"event"}}):_vm._e()],1):_vm._e(),_c('span',[(_vm.editor)?_c('q-popup-proxy',{ref:"qTimeProxy",attrs:{"transition-show":"scale","transition-hide":"scale","persistent":""}},[_c('q-time',{attrs:{"mask":"DD.MM.YYYY HH:mm","format24h":""},model:{value:(_vm.dailyTrip.date),callback:function ($$v) {_vm.$set(_vm.dailyTrip, "date", $$v)},expression:"dailyTrip.date"}}),_c('div',{staticClass:"flex justify-between",staticStyle:{"width":"100%"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticStyle:{"margin":"10px"},on:{"click":function($event){_vm.dailyTrip.date = _vm.oldDate}}},[_vm._v("abbrechen")]),_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticStyle:{"margin":"10px"},attrs:{"color":"primary"},on:{"click":function($event){return _vm.saveDate(true)}}},[_vm._v("fertig")])],1)],1):_vm._e()],1),(_vm.editor)?_c('div',[_c('q-select',{staticStyle:{"margin":"10px 10px 10px 0","width":"260px"},attrs:{"label":"Sehenswürdigkeiten","filled":"","use-input":"","use-chips":"","multiple":"","hide-dropdown-icon":"","input-debounce":"0","new-value-mode":"add-unique"},on:{"blur":function($event){return _vm.saveSights()}},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"add"},on:{"click":function($event){$event.stopPropagation();}}})]},proxy:true}],null,false,632044135),model:{value:(_vm.addedSights),callback:function ($$v) {_vm.addedSights=$$v},expression:"addedSights"}}),_c('q-editor',{ref:"editor_ref",staticStyle:{"margin-top":"10px","margin-bottom":"10px"},attrs:{"min-height":"5rem","toolbar":_vm.editorToolbar,"toolbar-toggle-color":"primary","fonts":_vm.editorFonts,"definitions":{
        format: {
        top: 'Formatierung bei Kopieren beibehaten',
        icon: _vm.$q.iconSet.editor.formatting,
        label: 'Format bei Kopie ' + (this.preventPasting ? 'aus' : 'an'),
        handler: _vm.formatOn
      }
      }},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.stopPropagation();},"blur":function($event){return _vm.saveWork()}},nativeOn:{"paste":function($event){return (function (evt) { return _vm.pasteCapture(evt); })($event)}},model:{value:(_vm.dailyTrip.descriptionInput),callback:function ($$v) {_vm.$set(_vm.dailyTrip, "descriptionInput", $$v)},expression:"dailyTrip.descriptionInput"}}),(_vm.dailyTrip.stopImages)?_c('div',{staticClass:"flex"},_vm._l((_vm.dailyTrip.stopImages),function(stopImage,index){return _c('div',{key:index,staticClass:"uploader",staticStyle:{"margin-right":"8px"}},[_c('q-img',{staticStyle:{"height":"100%"},attrs:{"src":stopImage}}),_c('q-btn',{staticStyle:{"position":"absolute","transform":"rotate(45deg)"},attrs:{"round":"","color":"primary","icon":"add"},on:{"click":function($event){return _vm.removeImg(index)}}}),_c('q-btn',{staticStyle:{"position":"absolute","margin-top":"-60px","margin-left":"65px"},attrs:{"round":"","color":"primary","icon":"filter"},on:{"click":function($event){return _vm.showImgDialog(stopImage)}}})],1)}),0):_vm._e(),_c('q-dialog',{model:{value:(_vm.imgDialogVisible),callback:function ($$v) {_vm.imgDialogVisible=$$v},expression:"imgDialogVisible"}},[_c('q-card',{staticStyle:{"width":"100%","max-width":"100vh","overflow":"hidden"}},[_c('q-card-section',{staticClass:"row flex justify-end q-pb-none",staticStyle:{"z-index":"100"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"icon":"close","flat":"","round":"","dense":""}})],1),_c('q-card-section',{staticStyle:{"margin-top":"-35px"}},[_c('q-img',{staticStyle:{"width":"100%"},attrs:{"src":_vm.dialogImgSrc}})],1)],1)],1),(_vm.editor)?_c('div',{staticClass:"uploader",staticStyle:{"margin-top":"10px"}},[_c('q-img',{staticStyle:{"height":"100%"},attrs:{"src":"/statics/dummy-image-landscape-1-150x150.jpg"}}),_c('q-btn',{staticStyle:{"position":"absolute"},attrs:{"round":"","color":"primary","icon":"add"},on:{"click":function($event){_vm.chooseImgDialog = true}}},[_c('q-tooltip',[_vm._v("Bilder hinzufügen")])],1)],1):_vm._e(),_c('q-dialog',{attrs:{"keep-alive":""},model:{value:(_vm.chooseImgDialog),callback:function ($$v) {_vm.chooseImgDialog=$$v},expression:"chooseImgDialog"}},[_c('q-card',[_c('q-card-section',{staticClass:"row items-center galeryImgUploaderContainer flex justify-between"},[_vm._l((_vm.galeryImgUrls),function(url,index){return _c('div',{key:index,staticClass:"uploader"},[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:(url),expression:"url"}],staticStyle:{"width":"100%"}}),_c('q-btn',{staticStyle:{"position":"absolute"},attrs:{"round":"","color":"primary","icon":"add"},on:{"click":function($event){return _vm.addImageToStop(url)}}})],1)}),(_vm.galeryImgUrls.length === 0)?_c('div',{staticClass:"flex"},[_c('div',[_c('q-img',{staticStyle:{"height":"148px","width":"148px"},attrs:{"src":__webpack_require__("51b8")}})],1),_c('div',{staticClass:"flex justify-center",staticStyle:{"max-width":"300px","padding-left":"10px","flex-direction":"column"}},[_vm._v("Wenn du ein Bild in den Einstellungen hochlädst kannst du es hier hinzufügen.")])]):_vm._e()],2),_c('q-card-section',{staticClass:"row items-center flex"},[_c('span',[_vm._v("Bitte verwende nur Bilder die für die Wiederverwendung eindeutig gekennzeichnet sind. "),_c('br'),_vm._v(" Ansonsten kann dein Account gesperrt werden. "),_c('br'),_c('br'),_c('a',{staticStyle:{"text-decoration":"underline"},on:{"click":function($event){return _vm.openInNewTab('https://www.google.com/search?q=' + _vm.dailyTrip.location.label  + '&tbm=isch&hl=de&hl=de&tbs=sur%3Af&rlz=1C1CHBF_deDE828DE828&ved=0CAQQpwVqFwoTCLCZ05jd2-cCFQAAAAAdAAAAABAD&biw=1903&bih=969')}}},[_vm._v("Vorschläge auf Google")]),_c('br'),_c('br')]),_c('div',{staticClass:"flex",staticStyle:{"width":"100%"}},[_c('q-input',{ref:"tempImgLinkInput",staticStyle:{"padding":"0","width":"80%","margin-bottom":"10px"},attrs:{"filled":"","label":"Bild per Link einfügen","rules":[function (val) { return _vm.validURL(val) || 'Bitte gib einen richtigen Link ein'; }],"lazy-rules":"","bottom-slots":"","outlined":""},model:{value:(_vm.tempImgLink),callback:function ($$v) {_vm.tempImgLink=$$v},expression:"tempImgLink"}}),_c('q-btn',{staticStyle:{"margin-left":"10px","margin-top":"5px","height":"45px"},attrs:{"round":"","color":"primary","icon":"add","disable":!_vm.validURL(_vm.tempImgLink)},on:{"click":function($event){return _vm.addImageToStop(_vm.tempImgLink)}}})],1)]),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"Fertig","color":"primary"}})],1)],1)],1)],1):_c('div',[(_vm.addedSights && typeof _vm.addedSights !== 'undefined' && _vm.addedSights.length > 0)?_c('div',[_c('b',{staticClass:"flex justify-center",staticStyle:{"flex-direction":"column"}},[_vm._v("Highlights:")]),_vm._l((_vm.addedSights),function(addedSight,index){return _c('q-chip',{key:index,attrs:{"clickable":""},on:{"click":function($event){_vm.openInNewTab('https://www.google.com/search?q=' + addedSight + ' ' + _vm.dailyTrip.location.label.split(',')[0])}}},[_vm._v(_vm._s(addedSight))])}),_c('a',{staticClass:"flex justify-center",staticStyle:{"flex-direction":"column","text-decoration":"none"},attrs:{"target":"_blank","href":'https://www.google.com/search?q=' + _vm.dailyTrip.location.label.split(',')[0] + ' Sehenswürdigkeiten'}},[_vm._v("weitere anzeigen")])],2):_vm._e(),_c('div',{domProps:{"innerHTML":_vm._s(_vm.dailyTrip.descriptionInput)}})])])],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/EditRoundtripComponents/dailyTrip.vue?vue&type=template&id=ab93963c&

// EXTERNAL MODULE: ./src/sharedMethods.js
var sharedMethods = __webpack_require__("15c8");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/EditRoundtripComponents/dailyTrip.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var dailyTripvue_type_script_lang_js_ = ({
  props: {
    dailyTrip: Object,
    editorToolbar: Array,
    editorFonts: Object,
    stopDocId: String,
    index: Number,
    newDailyTripDate: Boolean,
    duration: Object,
    editor: Boolean,
    addedSights: Array,
    galeryImgUrls: Array
  },

  data() {
    return {
      savedEditorContent: this.dailyTrip.descriptionInput,
      durations: [],
      preventPasting: true,
      oldAddedSights: [],
      dialogImgSrc: null,
      imgDialogVisible: false,
      chooseImgDialog: false,
      tempImgLink: null,
      oldDate: null
    };
  },

  methods: {
    deleteEntry() {
      sharedMethods["a" /* default */].getParent('stop', this).deleteDailyTrip(this.index);
    },

    saveWork() {
      sharedMethods["a" /* default */].getParent('stop', this).saveDailyTrips(this.index, this.dailyTrip.descriptionInput, 'description');
      this.savedEditorContent = this.dailyTrip.descriptionInput;
    },

    saveDate() {
      sharedMethods["a" /* default */].getParent('stop', this).saveDailyTrips(this.index, this.dailyTrip.date, 'date');
      this.oldDate = this.dailyTrip.date;
    },

    formatOn() {
      this.preventPasting = !this.preventPasting;
    },

    dailyTripDateOptions(date) {
      return sharedMethods["a" /* default */].getParent('stop', this).dailyTripDateOptions(date);
    },

    validURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

      return !!pattern.test(str);
    },

    saveSights() {
      if (this.addedSights !== this.oldAddedSights) {
        this.oldAddedSights = this.addedSights;
        sharedMethods["a" /* default */].getParent('stop', this).saveDailyTrips(this.index, this.addedSights, 'sights');
      }
    },

    showImgDialog(src) {
      this.dialogImgSrc = src;
      this.imgDialogVisible = true;
    },

    addImageToStop(src) {
      if (!this.dailyTrip.stopImages) this.dailyTrip.stopImages = [];
      this.dailyTrip.stopImages.push(src);
      this.tempImgLink = '';
      this.$refs.tempImgLinkInput.resetValidation(); // let parentStops = this.getParent('EditRoundtrips').stops
      // parentStops[parentStops.findIndex(x => x.DocId === this.docId)].StopImages = this.stopImages

      sharedMethods["a" /* default */].getParent('stop', this).saveDailyTripImgs(this.index, this.dailyTrip.stopImages);
    },

    removeImg(index) {
      if (!this.dailyTrip.stopImages) return;
      this.dailyTrip.stopImages.splice(index, 1); // let parentStops = this.getParent('EditRoundtrips').stops
      // parentStops[parentStops.findIndex(x => x.DocId === this.docId)].StopImages = this.stopImages

      sharedMethods["a" /* default */].getParent('stop', this).saveDailyTripImgs(this.index, this.dailyTrip.stopImages);
    },

    openInNewTab(link) {
      window.open(link, '_blank');
    },

    pasteCapture(evt) {
      if (this.preventPasting) {
        let text, onPasteStripFormattingIEPaste;
        evt.preventDefault();

        if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
          text = evt.originalEvent.clipboardData.getData('text/plain');
          this.$refs.editor_ref.runCmd('insertText', text);
        } else if (evt.clipboardData && evt.clipboardData.getData()) {
          text = evt.clipboardData.getData('text/plain');
          this.$refs.editor_ref.runCmd('insertText', text);
        } else if (window.clipboardData && window.clipboardData.getData) {
          if (!onPasteStripFormattingIEPaste) {
            onPasteStripFormattingIEPaste = true;
            this.$refs.editor_ref.runCmd('ms-pasteTextOnly', text);
          }

          onPasteStripFormattingIEPaste = false;
        }
      }
    }

  },

  created() {
    this.oldAddedSights = this.addedSights;
    this.oldDate = this.dailyTrip.date;
  }

});
// CONCATENATED MODULE: ./src/pages/EditRoundtripComponents/dailyTrip.vue?vue&type=script&lang=js&
 /* harmony default export */ var EditRoundtripComponents_dailyTripvue_type_script_lang_js_ = (dailyTripvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/EditRoundtripComponents/dailyTrip.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  EditRoundtripComponents_dailyTripvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var dailyTrip = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=30.js.map