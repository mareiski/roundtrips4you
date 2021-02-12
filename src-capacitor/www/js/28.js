(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "51b8":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/dummy-image-landscape-1.jpg";

/***/ }),

/***/ "ead2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/EditRoundtripComponents/stop.vue?vue&type=template&id=6919b9e0&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-timeline-entry',{ref:_vm.lastItem ? 'lastTimelineEntry' : null,attrs:{"icon":"location_on"},scopedSlots:_vm._u([{key:"subtitle",fn:function(){return [_c('span',{staticClass:"q-timeline__title"},[_vm._v("\n      "+_vm._s(_vm.date !== null && typeof _vm.date !== 'undefined' && _vm.date.length > 0 ? _vm.date.split(' ')[0]: _vm.date)+"\n      ")]),_c('span',{staticClass:"q-timeline__title",staticStyle:{"padding-right":"10px"}},[_vm._v("\n      "+_vm._s(_vm.date !== null && _vm.date.length > 0 ? _vm.date.split(' ')[1]: _vm.date)+"\n      ")])]},proxy:true}])},[_c('div',{staticClass:"stop-container"},[_c('div',{staticClass:"flex"},[_c('div',{staticClass:"flex"},[_c('h6',{staticClass:"q-timeline__title"},[_vm._v(_vm._s(_vm.titleInput)+"\n          ")])])])]),_c('q-list',{staticClass:"rounded-borders",attrs:{"bordered":""}},[_c('q-expansion-item',{class:'stop-expansion-item ' + (_vm.days === null && !_vm.firstStop && !_vm.lastItem && _vm.profile !== 'plane' ? 'error-color' : '' ),attrs:{"expand-separator":"","label":_vm.addedSights.length + (_vm.addedSights.length === 1 ? ' Sehenswürdigkeit' : ' Sehenswürdigkeiten') + (_vm.hotelName ? ' & 1 Hotel' : '') + (_vm.dailyTrips.length ? ' & ' + _vm.dailyTrips.length + (_vm.dailyTrips.length === 1 ? ' Tagesausflug' : ' Tagesausflüge') : ''),"caption":_vm.days !== null ?  'ca. ' + _vm.days + ' Aufenthalt' : ( _vm.firstStop || _vm.lastItem || _vm.profile === 'plane' ? '' : 'keine Verbleibende Zeit für den Aufenthalt')},on:{"input":function($event){return _vm.$emit('expansionChanged', { expanded: _vm.expanded, docId: _vm.docId })}},model:{value:(_vm.expanded),callback:function ($$v) {_vm.expanded=$$v},expression:"expanded"}},[_c('div',[_c('q-chip',{attrs:{"icon":"location_on","clickable":""},on:{"click":function($event){_vm.editor ? _vm.editLocation = true : _vm.openInNewTab('https://www.google.com/maps/search/?api=1&query=' + _vm.location.label)}}},[_vm._v(_vm._s(_vm.location && typeof _vm.location !== 'undefined' && _vm.location.label && typeof _vm.location.label !== 'undefined' ? _vm.location.label.split(',')[0] : ( _vm.editor ? 'Ort hinzufügen' : 'kein Ort angegeben'))+"\n          "),(_vm.location && _vm.location.label)?_c('q-tooltip',[_vm._v(_vm._s(_vm.location.label))]):_vm._e()],1),(_vm.parkingPlace || _vm.editor)?_c('q-chip',{attrs:{"icon":"local_parking","clickable":_vm.editor},on:{"click":function($event){_vm.editParkingPlace = true}}},[_vm._v(_vm._s(_vm.parkingPlace && typeof _vm.parkingPlace !== 'undefined' &&  _vm.parkingPlace.label && typeof _vm.parkingPlace.label !== 'undefined' ?  _vm.parkingPlace.label.split(',')[0] : 'Parkplatz hinzufügen')+"\n          ")]):_vm._e()],1),_c('div',[(_vm.sights && _vm.sights !== 'error')?_c('div',[_vm._l((_vm.sights),function(sight,index){return _c('span',{key:index,staticStyle:{"text-decoration":"none"},attrs:{"href":'https://www.google.com/search?q=' + sight.name + ' ' + _vm.location.label.split(',')[0],"target":"_blank"}})}),_c('a',{attrs:{"target":"_blank","href":'https://www.google.com/search?q=' + _vm.location.label.split(',')[0] + ' sehenswürdigkeiten'}},[_vm._v("weitere auf Google")]),_vm._v("\n          oder auf der Karte\n          "),_c('q-dialog',{model:{value:(_vm.sightDialog.showed),callback:function ($$v) {_vm.$set(_vm.sightDialog, "showed", $$v)},expression:"sightDialog.showed"}},[_c('q-card',[_c('q-card-section',{staticClass:"row flex justify-end q-pb-none",staticStyle:{"z-index":"100","width":"100%","position":"absolute","color":"white"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"icon":"close","flat":"","round":"","dense":""}})],1),_c('q-img',{staticStyle:{"max-height":"75vh"},attrs:{"src":_vm.sightDialog.imgSrc}},[_c('div',{staticClass:"absolute-bottom"},[_c('div',{staticClass:"text-h6"},[_vm._v(_vm._s(_vm.sightDialog.title))]),_c('div',{staticClass:"text-subtitle2"},[_vm._v(_vm._s(_vm.sightDialog.shortDescription))])])]),_c('q-card-section',[_vm._v("\n                "+_vm._s(_vm.sightDialog.description)+"\n              ")]),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"hinzufügen","color":"primary"},on:{"click":function($event){[_vm.$refs.sightInput.add(_vm.sightDialog.title, true), _vm.saveSights()]}}})],1)],1)],1)],2):(_vm.addedSights && typeof _vm.addedSights !== 'undefined' && _vm.addedSights.length > 0)?_c('div',{staticClass:"flex",staticStyle:{"padding-bottom":"10px"}},[_c('b',{staticClass:"flex justify-center",staticStyle:{"flex-direction":"column"}},[_vm._v("Highlights:")]),_vm._l((_vm.addedSights),function(addedSight,index){return _c('q-chip',{key:index,attrs:{"clickable":""},on:{"click":function($event){_vm.openInNewTab('https://www.google.com/search?q=' + addedSight + ' ' + _vm.location.label.split(',')[0])}}},[_vm._v(_vm._s(addedSight))])}),_c('a',{staticClass:"flex justify-center",staticStyle:{"flex-direction":"column","text-decoration":"none"},attrs:{"target":"_blank","href":'https://www.google.com/search?q=' + _vm.location.label.split(',')[0] + ' Sehenswürdigkeiten'}},[_vm._v("weitere anzeigen")])],2):_vm._e(),_c('div',[(_vm.hotelName)?_c('q-list',{staticClass:"rounded-borders",attrs:{"bordered":"","padding":"","dense":""}},[_c('q-item',{staticClass:"hotel-list"},[_c('q-item-section',{attrs:{"avatar":"","top":""}},[_c('q-avatar',{attrs:{"color":"secondary","text-color":"white","font-size":"20px","icon":"hotel"}})],1),_c('q-item-section',[_c('q-item-label',{staticClass:"flex",staticStyle:{"flex-wrap":"wrap","white-space":"normal"},attrs:{"lines":"2"}},[_c('span',{staticStyle:{"padding-right":"5px"}},[_vm._v(_vm._s(_vm.sharedMethods.capitalize(_vm.hotelName)))]),(_vm.hotelStars && !isNaN(_vm.hotelStars))?_c('q-rating',{staticClass:"stars",staticStyle:{"margin-right":"10px","padding-right":"5px"},attrs:{"readonly":"","size":"15px","color":"gold"},model:{value:(_vm.hotelStars),callback:function ($$v) {_vm.hotelStars=$$v},expression:"hotelStars"}}):_vm._e(),_c('div',{staticClass:"flex",staticStyle:{"flex-wrap":"wrap","white-space":"normal"}},[(_vm.guestRating)?_c('span',{staticClass:"raleway"},[_vm._v("\n                      "+_vm._s(_vm.guestRating)+", \n                    ")]):_vm._e(),(_vm.hotelPrice)?_c('span',[_c('span',{staticClass:"raleway"},[_vm._v("ca. € ")]),_c('span',{staticClass:"raleway"},[_vm._v(_vm._s(_vm.hotelPrice))]),_c('q-tooltip',[_vm._v("ungefährer Durchschnittspreis pro Person & Nacht")])],1):_vm._e()])],1),_c('q-item-label',{staticStyle:{"overflow":"hidden"},attrs:{"caption":""}},[_c('a',{staticClass:"ellipsis",on:{"click":function($event){_vm.openInNewTab('https://www.google.com/maps/search/?api=1&query=' + _vm.capitalize(_vm.hotelName + ', ' + _vm.hotelLocation.label))}}},[_vm._v(_vm._s(_vm.hotelLocation && typeof _vm.hotelLocation !== 'undefined' && _vm.hotelLocation.label && typeof _vm.hotelLocation.label !== 'undefined' ? _vm.capitalize(_vm.hotelLocation.label) :  'kein Ort angegeben'))])])],1),_c('q-item-section',[(_vm.transportLocations && _vm.transportLocations.lenght > 0)?_c('q-btn',{staticStyle:{"width":"150px"},on:{"click":function($event){_vm.showTransportDialog = true}}},[_vm._v("Transport\n                ")]):_vm._e()],1),_c('q-dialog',{model:{value:(_vm.showTransportDialog),callback:function ($$v) {_vm.showTransportDialog=$$v},expression:"showTransportDialog"}},[_c('q-card',[_c('q-card-section',{staticClass:"row items-center flex",staticStyle:{"flex-direction":"column"}},[_c('q-list',_vm._l((_vm.transportLocations),function(location){return _c('div',{key:location,staticClass:"flex",staticStyle:{"flex-direction":"column"}},_vm._l((location.locations),function(sublocation){return _c('q-item',{key:sublocation,attrs:{"clickable":""},on:{"click":function($event){return _vm.openInNewTab('https://www.google.com/maps/search/?api=1&query=' + sublocation.name)}}},[_c('q-item-section',[_c('span',[_c('q-icon',{attrs:{"name":_vm.getHotelTransportationIcon(location.category)}}),_c('span',[_vm._v(_vm._s(sublocation.name))])],1),_c('p',[_vm._v(_vm._s(sublocation.distanceInTime))])])],1)}),1)}),0)],1),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"OK","color":"primary"}})],1)],1)],1),_c('q-item-section',{attrs:{"side":""}},[(_vm.generalLink && _vm.generalLink.length > 0)?_c('div',[_c('q-chip',{staticClass:"linkChip",attrs:{"icon":"link","dense":"","clickable":""},on:{"click":function($event){return _vm.openInNewTab(_vm.generalLink)}}},[_vm._v("Hotelwebsite")])],1):_vm._e(),(_vm.hotelName)?_c('q-chip',{staticClass:"linkChip",staticStyle:{"width":"117px"},attrs:{"icon":"launch","dense":"","clickable":""},on:{"click":function($event){_vm.openInNewTab('https://www.booking.com/searchresults.de.html?ss=' + _vm.capitalize(_vm.hotelName) + '&checkin_year=' + _vm.date.split(' ')[0].split('.')[2] + '&checkin_month=' + _vm.date.split('.')[1] + '&checkin_monthday=' + _vm.date.split('.')[0] + '&checkout_year=' + _vm.checkOutDate.split('.')[2] + '&checkout_month=' + _vm.checkOutDate.split('.')[1] + '&checkout_monthday=' + _vm.checkOutDate.split('.')[0] + '&group_adults=' + _vm.adults + _vm.getChildrenText() +  '&no_rooms=' + _vm.rooms + '&ac_langcode=de')}}},[_vm._v(" booking.com\n                  "),_c('q-tooltip',[_vm._v("Hotel auf booking.com")])],1):_vm._e(),(_vm.hotelName)?_c('q-chip',{staticClass:"linkChip",staticStyle:{"width":"117px"},attrs:{"icon":"launch","dense":"","clickable":""},on:{"click":function($event){_vm.openInNewTab('https://www.expedia.de/Hotel-Search?adults=' + _vm.adults + 'children=' + _vm.getExpediaChildrenText() + '%2C1_3&destination=' + _vm.capitalize(_vm.hotelName) + '&endDate=' + _vm.checkOutDate.split(' ')[0].split('.')[2] + '-' + _vm.checkOutDate.split('.')[1] + '-' + _vm.checkOutDate.split('.')[0] + '&rooms=' + _vm.rooms + '&sort=RECOMMENDED&startDate=' + _vm.date.split(' ')[0].split('.')[2] + '-' + _vm.date.split('.')[1] + '-' + _vm.date.split('.')[0] + '&theme=&useRewards=true')}}},[_vm._v(" expedia\n                  "),_c('q-tooltip',[_vm._v("Hotel auf expedia")])],1):_vm._e()],1),(_vm.hotelContact)?_c('q-item-section',{attrs:{"side":""}},[_c('div',{staticClass:"hotel-contact"},[(_vm.hotelContact.email)?_c('q-chip',{attrs:{"icon":"email","clickable":""},on:{"click":function($event){return _vm.openInNewTab('mailto:' + _vm.hotelContact.email)}}},[_vm._v(_vm._s(_vm.hotelContact.email)+"\n                  ")]):_vm._e(),(_vm.hotelContact.phone)?_c('q-chip',{attrs:{"icon":"phone","clickable":""},on:{"click":function($event){return _vm.openInNewTab('tel:' + _vm.hotelContact.phone)}}},[_vm._v(_vm._s(_vm.hotelContact.phone)+"\n                  ")]):_vm._e()],1)]):_vm._e()],1)],1):_vm._e()],1),(!_vm.editor)?_c('div',{staticStyle:{"margin-top":"10px","margin-bottom":"20px"},domProps:{"innerHTML":_vm._s(_vm.descriptionInput)}}):_vm._e(),(_vm.stopImages)?_c('div',{staticClass:"flex"},_vm._l((_vm.stopImages),function(stopImage,index){return _c('div',{key:index,staticClass:"uploader",staticStyle:{"margin-right":"8px"}},[_c('q-img',{staticStyle:{"height":"100%"},attrs:{"src":stopImage}}),_c('q-btn',{staticStyle:{"position":"absolute","margin-top":"-113px","margin-left":"120px"},attrs:{"round":"","color":"primary","icon":"filter"},on:{"click":function($event){return _vm.showImgDialog(stopImage)}}})],1)}),0):_vm._e(),_c('q-dialog',{model:{value:(_vm.imgDialogVisible),callback:function ($$v) {_vm.imgDialogVisible=$$v},expression:"imgDialogVisible"}},[_c('q-card',{staticStyle:{"width":"100%","max-width":"100vh","overflow":"hidden"}},[_c('q-card-section',{staticClass:"row flex justify-end q-pb-none",staticStyle:{"z-index":"100","width":"100%","position":"absolute","color":"white"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"icon":"close","flat":"","round":"","dense":""}})],1),_c('q-card-section',[_c('q-img',{staticStyle:{"width":"100%"},attrs:{"src":_vm.dialogImgSrc}})],1)],1)],1),_c('q-dialog',{attrs:{"keep-alive":""},model:{value:(_vm.chooseImgDialog),callback:function ($$v) {_vm.chooseImgDialog=$$v},expression:"chooseImgDialog"}},[_c('q-card',[_c('q-card-section',{staticClass:"row items-center galeryImgUploaderContainer flex justify-between"},[_vm._l((_vm.galeryImgUrls),function(url,index){return _c('div',{key:index,staticClass:"uploader"},[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:(url),expression:"url"}],staticStyle:{"width":"100%"}}),_c('q-btn',{staticStyle:{"position":"absolute"},attrs:{"round":"","color":"primary","icon":"add"},on:{"click":function($event){return _vm.addImageToStop(url)}}})],1)}),(_vm.galeryImgUrls.length === 0)?_c('div',{staticClass:"flex"},[_c('div',[_c('q-img',{staticStyle:{"height":"148px","width":"148px"},attrs:{"src":__webpack_require__("51b8")}})],1),_c('div',{staticClass:"flex justify-center",staticStyle:{"max-width":"300px","padding-left":"10px","flex-direction":"column"}},[_vm._v("Wenn du ein Bild in den Einstellungen hochlädst kannst du es hier hinzufügen.")])]):_vm._e()],2),_c('q-card-section',{staticClass:"row items-center flex"},[_c('span',[_vm._v("Bitte verwende nur Bilder die für die Wiederverwendung eindeutig gekennzeichnet sind. "),_c('br'),_vm._v(" Ansonsten kann dein Account gesperrt werden. "),_c('br'),_c('br'),_c('a',{staticStyle:{"text-decoration":"underline"},on:{"click":function($event){return _vm.openInNewTab('https://www.google.com/search?q=' + _vm.location.label  + '&tbm=isch&hl=de&hl=de&tbs=sur%3Af&rlz=1C1CHBF_deDE828DE828&ved=0CAQQpwVqFwoTCLCZ05jd2-cCFQAAAAAdAAAAABAD&biw=1903&bih=969')}}},[_vm._v("Bildvorschläge auf Google")]),_c('br'),_c('br')]),_c('div',{staticClass:"flex",staticStyle:{"width":"100%"}},[_c('q-input',{ref:"tempImgLinkInput",staticStyle:{"padding":"0","width":"80%","margin-bottom":"10px"},attrs:{"filled":"","label":"Bild per Link einfügen","rules":[function (val) { return _vm.validURL(val) || 'Bitte gib einen richtigen Link ein'; }],"lazy-rules":"","bottom-slots":"","outlined":""},model:{value:(_vm.tempImgLink),callback:function ($$v) {_vm.tempImgLink=$$v},expression:"tempImgLink"}}),_c('q-btn',{staticStyle:{"margin-left":"10px","margin-top":"5px","height":"45px"},attrs:{"round":"","color":"primary","icon":"add","disable":!_vm.validURL(_vm.tempImgLink)},on:{"click":function($event){return _vm.addImageToStop(_vm.tempImgLink)}}})],1)]),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"Fertig","color":"primary"}})],1)],1)],1),(_vm.expanded)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.dailyTrips.length),expression:"dailyTrips.length"}],staticClass:"daily-trip-container"},_vm._l((_vm.dailyTrips),function(dailyTrip,index){return _c('DailyTrip',{key:dailyTrip.id + index,staticStyle:{"margin-top":"10px"},attrs:{"dailyTrip":dailyTrip,"editorToolbar":_vm.editorToolbar,"editorFonts":_vm.editorFonts,"stopDocId":_vm.docId,"index":index,"newDailyTripDate":dailyTrip.newDate ? dailyTrip.newDate : false,"duration":dailyTrip.duration,"editor":_vm.editor,"addedSights":dailyTrip.addedSights,"galeryImgUrls":_vm.galeryImgUrls,"dateOptions":_vm.dailyTripDateOptions}})}),1):_vm._e()],1),_c('q-dialog',{model:{value:(_vm.addDailyTripDialogVisible),callback:function ($$v) {_vm.addDailyTripDialogVisible=$$v},expression:"addDailyTripDialogVisible"}},[_c('q-card',{staticStyle:{"width":"100%","max-width":"100vh","overflow":"hidden"}},[_c('q-card-section',{staticClass:"daily-trip-dialog-section"},[_c('q-input',{staticClass:"input-item",staticStyle:{"width":"300px"},attrs:{"filled":"","error-message":"Bitte gib ein richtiges Datum an","error":!_vm.sharedMethods.isDateTimeValid(),"lazy-rules":"","bottom-slots":"","outlined":""},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"event"}},[_c('q-popup-proxy',{attrs:{"transition-show":"scale","transition-hide":"scale"}},[_c('q-date',{attrs:{"today-btn":"","mask":"DD.MM.YYYY HH:mm","options":_vm.dailyTripDateOptions},model:{value:(_vm.tempDailyTripDate),callback:function ($$v) {_vm.tempDailyTripDate=$$v},expression:"tempDailyTripDate"}})],1)],1),_c('q-tooltip',[_vm._v("Datum ändern")])]},proxy:true},{key:"append",fn:function(){return [_c('q-icon',{attrs:{"name":"access_time"}},[_c('q-popup-proxy',{attrs:{"transition-show":"scale","transition-hide":"scale"}},[_c('q-time',{attrs:{"mask":"DD.MM.YYYY HH:mm","format24h":""},model:{value:(_vm.tempDailyTripDate),callback:function ($$v) {_vm.tempDailyTripDate=$$v},expression:"tempDailyTripDate"}})],1)],1)]},proxy:true}]),model:{value:(_vm.tempDailyTripDate),callback:function ($$v) {_vm.tempDailyTripDate=$$v},expression:"tempDailyTripDate"}}),_c('CitySearch',{ref:"citySearch",attrs:{"parkingPlaceSearch":false},on:{"update":function($event){return _vm.updateDailyTripLocation($event)}}}),_c('q-select',{staticClass:"input-item",attrs:{"outlined":"","options":['zu Fuß', 'Fahrrad', 'Auto'],"label":"Reisemittel","use-input":"","rules":[function (val) { return val !== null && val !== '' || 'Bitte wähle ein Reisemittel'; }]},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"commute"}})]},proxy:true}]),model:{value:(_vm.dailyTripProfile),callback:function ($$v) {_vm.dailyTripProfile=$$v},expression:"dailyTripProfile"}})],1),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"Abbrechen","color":"primary"}}),_c('q-btn',{attrs:{"flat":"","label":"Hizufügen","color":"primary"},on:{"click":function($event){return _vm.addDailyTrip()}}})],1)],1)],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/EditRoundtripComponents/stop.vue?vue&type=template&id=6919b9e0&

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// EXTERNAL MODULE: ./node_modules/quasar/src/utils/date.js
var date = __webpack_require__("bd4c");

// EXTERNAL MODULE: ./node_modules/quasar/src/utils/scroll.js
var utils_scroll = __webpack_require__("0831");

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// EXTERNAL MODULE: ./src/sharedMethods.js
var sharedMethods = __webpack_require__("15c8");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/EditRoundtripComponents/stop.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





const {
  setScrollPosition
} = utils_scroll["a" /* default */];
let timeStamp = Date.now();
let lastDailyTripDate = null;
/* harmony default export */ var stopvue_type_script_lang_js_ = ({
  name: 'stop',
  components: {
    CitySearch: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, "8ed1")),
    // HotelSearch: () => import('../Map/HotelSearch'),
    DailyTrip: () => __webpack_require__.e(/* import() */ 30).then(__webpack_require__.bind(null, "38f5"))
  },
  computed: {
    sharedMethods() {
      return sharedMethods["a" /* default */];
    }

  },
  props: {
    title: String,
    date: String,
    editorPlaceholder: String,
    editor: Boolean,
    docId: String,
    generalLink: String,
    location: Object,
    days: String,
    parkingPlace: Object,
    lastItem: Boolean,
    hotelStars: Number,
    hotelName: String,
    hotelPrice: Number,
    guestRating: String,
    transportLocations: Array,
    hotelLocation: Object,
    hotelContact: Object,
    checkOutDate: String,
    adults: Number,
    childrenAges: Array,
    rooms: Number,
    firstStop: Boolean,
    galeryImgUrls: Array,
    stopImages: Array,
    addedSights: Array,
    dailyTrips: Array,
    nextStopDate: String,
    profile: String
  },
  watch: {
    date: function (newVal, oldVal) {
      this.tempDailyTripDate = this.date;
    }
  },

  data() {
    return {
      titleInput: this.title,
      descriptionInput: this.editorPlaceholder,
      showDateEntry: true,
      showTimeEntry: false,
      preventPasting: false,
      editParkingPlace: false,
      tempParkingPlace: {},
      editLocation: false,
      tempLocation: {},
      savedEditorContent: this.editorPlaceholder,
      sights: null,
      chooseImgDialog: false,
      tempImgLink: null,
      dialogImgSrc: null,
      imgDialogVisible: false,
      oldAddedSights: [],
      addHotel: false,
      generalTempLink: '',
      formattedDate: date["b" /* default */].formatDate(timeStamp, 'DD.MM.YYYY'),
      addDailyTripDialogVisible: false,
      tempDailyTripLocation: null,
      tempDailyTripDate: this.date,
      dailyTripProfile: 'Auto',
      accessToken: 'pk.eyJ1IjoibWFyZWlza2kiLCJhIjoiY2pkaHBrd2ZnMDIyOTMzcDIyM2lra3M0eSJ9.wcM4BSKxfOmOzo67iW-nNg',
      expanded: false,
      changeAllDatesActive: false,
      oldDate: null,
      sightDialog: {
        showed: false,
        title: '',
        imgSrc: '',
        description: '',
        shortDescription: ''
      },
      showTransportDialog: false,
      addHotelDisabled: true,
      editorFonts: {
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      },
      editorToolbar: [[{
        label: '',
        icon: this.$q.iconSet.editor.align,
        fixedLabel: true,
        list: 'only-icons',
        options: ['left', 'center', 'right', 'justify']
      }], ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'], ['token', 'hr', 'link', 'custom_btn'], ['fullscreen'], [{
        label: 'Größe',
        icon: this.$q.iconSet.editor.fontSize,
        fixedLabel: true,
        fixedIcon: true,
        list: 'no-icons',
        options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
      }, {
        label: 'Schrift',
        icon: this.$q.iconSet.editor.font,
        fixedLabel: true,
        fixedIcon: true,
        list: 'no-icons',
        options: ['default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
      }], ['quote', 'unordered', 'ordered', 'outdent', 'indent'], ['format', 'image'], ['undo', 'redo']]
    };
  },

  methods: {
    isDateTimeValid() {
      return sharedMethods["a" /* default */].isDateTimeValid(this.tempDailyTripDate);
    },

    saveDate(refresh) {
      const lastScrollPos = document.documentElement.scrollTop;
      let newInitDate = sharedMethods["a" /* default */].getDateFromString(this.date); // time entry also has changed

      if (refresh) {
        if (this.changeAllDatesActive) this.changeAllDates();else this.oldDate = this.date;
      }

      let context = this;
      firebaseInit["b" /* db */].collection('RoundtripDetails').doc(this.docId).update({
        'InitDate': newInitDate
      }).then(function () {
        if (refresh && !context.changeAllDatesActive) {
          // resort stops and prepare views with new array
          context.getParent('EditRoundtrips').resortAndPrepareStops(newInitDate, context.docId);
        }

        setTimeout(function () {
          sharedMethods["a" /* default */].scrollToOffset(lastScrollPos);
        }, 500);
      });
    },

    getDailyTripDuration(startLocation, endLocation, dailyStopProfile, index, cityFromLabel, defaultCityLabel, trip) {
      var url = 'https://api.mapbox.com/directions/v5/mapbox/' + dailyStopProfile + '/' + startLocation[0] + ',' + startLocation[1] + ';' + endLocation[0] + ',' + endLocation[1] + '?geometries=geojson&access_token=' + this.accessToken;
      axios_default.a.get(url).then(response => {
        var data = response.data.routes[0];

        if (data !== null && typeof data !== 'undefined') {
          let duration = sharedMethods["a" /* default */].msToTime(data.duration * 1000);
          let distance = Math.floor(data.distance / 1000) > 0 ? Math.floor(data.distance / 1000) + ' km' : '';
          if (distance !== '') distance = ' (' + distance + ')';
          this.dailyTrips[index].duration = {
            duration: duration,
            distance: distance,
            cityFromLabel: cityFromLabel,
            defaultCityLabel: defaultCityLabel
          };
          if (this.dailyTrips[index + 1] && !this.dailyTrips[index + 1].newDate) this.getDailyTripDays(trip, index, data.duration);else if (index === this.dailyTrips.length - 1) this.dailyTrips.sort(this.compare);else {
            // if its the last item resort daily trips to force a refresh
            if (index === this.dailyTrips.length - 1) this.dailyTrips.sort(this.compare);
          }
        } else {
          this.dailyTrips[index].duration = {
            duration: null,
            distance: null,
            cityFromLabel: null,
            defaultCityLabel: null
          };
          if (this.dailyTrips[index + 1]) this.getDailyTripDays(trip, index, null);
        }
      }).catch(exception => {
        console.log(exception);
        this.dailyTrips[index].duration = {
          duration: null,
          distance: null,
          cityFromLabel: null,
          defaultCityLabel: null
        };
      });
    },

    getDailyTripDays(trip, index, duration) {
      let dailyTripDays = null;
      let dateTimeParts = trip.date.split(' ');
      let dateParts = dateTimeParts[0].split('.');
      let timeParts = dateTimeParts[1].split(':');
      let currentInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00');
      dateTimeParts = this.dailyTrips[index + 1].date.split(' ');
      dateParts = dateTimeParts[0].split('.');
      timeParts = dateTimeParts[1].split(':');
      let nextInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00');
      let dateDistance = 0;
      if (duration) dateDistance = nextInitDate.valueOf() - currentInitDate.valueOf() - duration;else dateDistance = nextInitDate.valueOf() - currentInitDate.valueOf();
      dailyTripDays = sharedMethods["a" /* default */].msToTime(dateDistance);
      this.dailyTrips[this.dailyTrips.findIndex(x => x.id === trip.id)].days = {
        days: dailyTripDays,
        id: trip.id
      };
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

    getChildrenText() {
      let text = '&group_children=' + this.childrenAges.length;
      this.childrenAges.forEach(child => {
        text += '&age=' + child;
      });
      return text;
    },

    getExpediaChildrenText() {
      let text = null;
      this.childrenAges.forEach((childAge, index) => {
        text += (index !== 0 ? '_' : '') + childAge;
      });
      return text;
    },

    updateHotelData(event) {
      if (event !== null) {
        this.addHotelDisabled = true;
        let hotelLat = event.latitude;
        let hotelLng = event.longitude;
        this.hotelName = event.name;

        if (event.destinationId) {
          axios_default.a.get('https://hotels4.p.rapidapi.com/properties/get-details?locale=de_DE&currency=EUR&id=' + event.destinationId, {
            headers: {
              'content-type': 'application/octet-stream',
              'x-rapidapi-host': 'hotels4.p.rapidapi.com',
              'x-rapidapi-key': '18b409d797msh45b84c0227df18cp1fea51jsne88847e3f3c8',
              'useQueryString': true
            }
          }).then(response => {
            console.log(response);
            let body = response.data.data.body;
            let propertyDescription = body.propertyDescription;
            let label = propertyDescription.address.fullAddress;
            let avgPrice = propertyDescription.featuredPrice.currentPrice.plain;
            let guestRating = body.guestReviews.brands.formattedRating + ' ' + body.guestReviews.brands.badgeText;
            let transportLocations = response.data.transportation.transportLocations;
            this.writeHotelData(label, hotelLat, hotelLng, propertyDescription.starRating, avgPrice, guestRating, transportLocations);
          }).catch(error => {
            console.log(error);
          });
        } else {
          this.writeHotelData(event.label, hotelLat, hotelLng, null, null, null, null);
        }
      }
    },

    writeHotelData(label, lat, lng, rating, price, guestRating, transportLocations) {
      this.hotelLocation = {
        lng: lat,
        lat: lng,
        label: label
      };
      price && typeof price !== 'undefined' ? this.hotelPrice = price : this.hotelPrice = null;
      guestRating && typeof guestRating !== 'undefined' ? this.guestRating = guestRating : this.guestRating = null;
      typeof transportLocations !== 'undefined' ? this.transportLocations = transportLocations : this.transportLocations = null;
      rating && typeof rating !== 'undefined' ? this.hotelStars = rating : this.hotelStars = null;
      this.addHotelDisabled = false; // if (contact) this.hotelContact = contact
    },

    getHotelTransportationIcon(category) {
      switch (category) {
        case 'airport':
          return 'flight';

        case 'train-station':
          return 'train';

        case 'metro':
          return 'subway';

        default:
          return 'cummute';
      }
    },

    changeExpansion(expanded) {
      this.expanded = expanded;
    },

    addHotelToStop() {
      console.log(this.transportLocations);
      firebaseInit["b" /* db */].collection('RoundtripDetails').doc(this.docId).update({
        HotelLocation: this.hotelLocation,
        HotelStars: this.hotelStars,
        HotelContact: this.hotelContact,
        HotelName: this.hotelName,
        GeneralLink: this.generalTempLink,
        CheckOutDate: this.checkOutDate,
        HotelPrice: this.hotelPrice,
        GuestRating: this.guestRating,
        TransportLocations: this.transportLocations
      }).then(results => {
        this.generalLink = this.generalTempLink;
        let parentStops = this.getParent('EditRoundtrips').stops;
        let parentStop = parentStops[parentStops.findIndex(x => x.DocId === this.docId)];
        parentStop.HotelLocation = this.hotelLocation;
        parentStop.HotelStars = this.hotelStars;
        parentStop.HotelContact = this.hotelContact;
        parentStop.HotelName = this.hotelName;
        parentStop.GeneralLink = this.generalTempLink;
        parentStop.CheckOutDate = this.checkOutDate;
        parentStop.HotelPrice = this.hotelPrice;
        parentStop.GuestRating = this.guestRating;
        console.log(parentStops.TransportLocations);
        console.log(this.transportLocations);
        parentStops.TransportLocations = this.transportLocations;
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Hotel wurde hinzugefügt'
        });
      });
    },

    removeHotel() {
      firebaseInit["b" /* db */].collection('RoundtripDetails').doc(this.docId).update({
        HotelLocation: null,
        HotelStars: null,
        HotelContact: null,
        HotelName: null,
        GeneralLink: null,
        HotelPrice: null,
        GuestRating: null,
        TransportLocations: null
      }).then(results => {
        this.hotelName = null;
        let parentStops = this.getParent('EditRoundtrips').stops;
        let parentStop = parentStops[parentStops.findIndex(x => x.DocId === this.docId)];
        parentStop.HotelLocation = null;
        parentStop.HotelStars = null;
        parentStop.HotelContact = null;
        parentStop.HotelName = null;
        parentStop.GeneralLink = null;
        parentStop.CheckOutDate = null;
        parentStop.HotelPrice = null;
        parentStop.GuestRating = null;
        parentStop.TransportLocations = null;
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Hotel wurde entfernt'
        });
      });
    },

    addDailyTrip() {
      let context = this;

      if (this.tempDailyTripDate && this.tempDailyTripLocation && this.dailyTripProfile) {
        context.addDailyTripDialogVisible = false;
        let createdStop = {
          id: this.dailyTrips.length,
          date: this.tempDailyTripDate,
          location: this.tempDailyTripLocation,
          descriptionInput: 'Tagesausflug nach ' + this.tempDailyTripLocation.label.split(',')[0],
          profile: this.getDailyTripProfile()
        };
        this.dailyTrips.push(createdStop);
        this.dailyTrips.sort(this.compare);
        this.dailyTrips.forEach((dailyTrip, index) => {
          dailyTrip.newDate = this.newDailyTripDate(dailyTrip.date);

          if (index === 0) {
            this.getDailyTripDuration([this.location.lng, this.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, 0, this.location.label, this.location.label, dailyTrip);
          } else {
            this.getDailyTripDuration([this.dailyTrips[index - 1].location.lng, dailyTrip.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.dailyTrips[index - 1].location.label, this.location.label, dailyTrip);
          }
        });
        firebaseInit["b" /* db */].collection('RoundtripDetails').doc(this.docId).update({
          DailyTrips: this.dailyTrips
        }).then(results => {
          sharedMethods["a" /* default */].showSuccessNotification('Tagesausflug wurde hinzugefügt');
        });
      } else {
        sharedMethods["a" /* default */].showErrorNotification('Bitte überprüfe deine Angaben');
      }
    },

    changeAllDates() {
      let millis = sharedMethods["a" /* default */].getDateFromString(this.date).valueOf() - sharedMethods["a" /* default */].getDateFromString(this.oldDate).valueOf();
      this.oldDate = this.date;
      this.getParent('EditRoundtrips').changeAllFollowingStopDates(this.docId, millis, sharedMethods["a" /* default */].getDateFromString(this.date));
    },

    openInNewTab(link) {
      window.open(link, '_blank');
    },

    deleteDailyTrip(index) {
      if (this.docId === null || this.docId === '' || this.docId === 'undefined') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht gelöscht werden'
        });
        return false;
      }

      this.dailyTrips.splice(index, 1);
      this.dailyTrips.sort(this.compare);
      this.dailyTrips.forEach((dailyTrip, index) => {
        dailyTrip.newDate = this.newDailyTripDate(dailyTrip.date);

        if (index === 0) {
          this.getDailyTripDuration([this.location.lng, this.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.location.label, this.location.label, dailyTrip);
        } else {
          this.getDailyTripDuration([this.dailyTrips[index - 1].location.lng, dailyTrip.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.dailyTrips[index - 1].location.label, this.location.label, dailyTrip);
        }
      });
      firebaseInit["b" /* db */].collection('RoundtripDetails').doc(this.docId).update({
        DailyTrips: this.dailyTrips
      }).then(results => {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Tagesausflug wurde gelöscht'
        });
        return true;
      });
    },

    saveSights() {
      if (this.addedSights !== this.oldAddedSights) {
        this.oldAddedSights = this.addedSights;
        let parentStops = this.getParent('EditRoundtrips').stops;
        parentStops[parentStops.findIndex(x => x.DocId === this.docId)].Sights = this.addedSights;
        this.saveData('Sights', this.addedSights, false);
      }
    },

    newDailyTripDate(dateToCheck) {
      if (!lastDailyTripDate || dateToCheck.split(' ')[0] !== lastDailyTripDate.split(' ')[0]) {
        lastDailyTripDate = dateToCheck;
        return true;
      }

      return false;
    },

    saveDailyTrips(index, value, field) {
      if (field === 'description') this.dailyTrips[index].descriptionInput = value;else if (field === 'sights') this.dailyTrips[index].addedSights = value;else if (field === 'date') this.dailyTrips[index].date = value;
      this.saveData('DailyTrips', this.dailyTrips, false);
    },

    saveDailyTripImgs(index, images) {
      this.dailyTrips[index].stopImages = images;
      this.saveData('DailyTrips', this.dailyTrips, false);
    },

    saveData(field, value, updateParent) {
      try {
        let context = this;
        firebaseInit["b" /* db */].collection('RoundtripDetails').doc(this.docId).update({
          ['' + field]: value
        }).then(function () {
          if (field === 'Location') context.getParent('EditRoundtrips').fetchAndSaveCountries();
          if (updateParent) context.getParent('EditRoundtrips').fetchRoundtripStops(context.$route.params.id, false);
        });
      } catch (e) {
        console.log(e);
      }
    },

    scrollTo(offset) {
      const duration = 400;
      setScrollPosition(document.documentElement, offset, duration);
    },

    saveWork() {
      this.saveSights();
      this.saveData('Description', this.descriptionInput, false);
      let parentStops = this.getParent('EditRoundtrips').stops;
      parentStops[parentStops.findIndex(x => x.DocId === this.docId)].Description = this.descriptionInput;
      this.savedEditorContent = this.descriptionInput;
    },

    updateLocation(event) {
      if (event !== null && this.location.label !== event.label) {
        this.tempLocation = {
          lng: event.x,
          lat: event.y,
          label: event.label
        };
      }
    },

    updateParkLocation(event) {
      if (event !== null) {
        this.tempParkingPlace = {
          lng: event.x,
          lat: event.y,
          label: event.label
        };
      }
    },

    updateDailyTripLocation(event) {
      if (event !== null) {
        this.tempDailyTripLocation = {
          lng: event.x,
          lat: event.y,
          label: event.label
        };
      } else {
        this.tempDailyTripLocation = null;
      }
    },

    getDailyTripProfile() {
      switch (this.dailyTripProfile) {
        case 'zu Fuß':
          return 'walking';

        case 'Fahrrad':
          return 'cycling';

        default:
          return 'driving';
      }
    },

    capitalize(s) {
      s = s.toLowerCase();
      s = s.charAt(0).toUpperCase() + s.slice(1);
      return s;
    },

    formatOn() {
      this.preventPasting = !this.preventPasting;
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
    },

    showImgDialog(src) {
      this.dialogImgSrc = src;
      this.imgDialogVisible = true;
    },

    addImageToStop(src) {
      if (!this.stopImages) this.stopImages = [];
      this.stopImages.push(src);
      this.tempImgLink = '';
      this.$refs.tempImgLinkInput.resetValidation();
      let parentStops = this.getParent('EditRoundtrips').stops;
      parentStops[parentStops.findIndex(x => x.DocId === this.docId)].StopImages = this.stopImages;
      let context = this;
      firebaseInit["b" /* db */].collection('RoundtripDetails').doc(this.docId).update({
        'StopImages': this.stopImages
      }).catch(function (error) {
        context.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht gelöscht werden'
        });
        console.log(error);
      });
    },

    removeImg(index) {
      if (!this.stopImages) return;
      this.stopImages.splice(index, 1);
      let parentStops = this.getParent('EditRoundtrips').stops;
      parentStops[parentStops.findIndex(x => x.DocId === this.docId)].StopImages = this.stopImages;
      let context = this;
      firebaseInit["b" /* db */].collection('RoundtripDetails').doc(this.docId).update({
        'StopImages': this.stopImages
      }).catch(function (error) {
        context.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht gelöscht werden'
        });
        console.log(error);
      });
    },

    deleteEntry() {
      if (this.docId === null || this.docId === '' || this.docId === 'undefined') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht gelöscht werden'
        });
        return false;
      }

      this.getParent('EditRoundtrips').removeStop(this.docId);

      if (!this.$store.getters['demoSession/isInDemoSession']) {
        const context = this;
        firebaseInit["b" /* db */].collection('RoundtripDetails').doc(context.docId).delete().then(function () {
          sharedMethods["a" /* default */].showSuccessNotification('Eintrag wurde gelöscht');
        }).catch(function (error) {
          console.log(error);
          sharedMethods["a" /* default */].showErrorNotification('Der Eintrag konnte nicht gelöscht werden');
        });
      } else {
        this.$store.commit('demoSession/removeStop', this.docId);
      }
    },

    /**
     * options for the daily trip quasar date component
     * @param date the current date to check (set by quasar automatically)
     */
    dailyTripDateOptions(date) {
      if (this.date && this.date.length > 0) {
        let dateTimeParts = this.date.split(' ');
        let dateParts = dateTimeParts[0].split('.');
        const currentStopDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        const currentDate = new Date(date);

        if (this.nextStopDate && this.nextStopDate.length > 0) {
          dateTimeParts = this.nextStopDate.split(' ');
          dateParts = dateTimeParts[0].split('.');
          const nextStopDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // date must be between current and next stop date

          return currentDate >= currentStopDate && currentDate <= nextStopDate;
        } else {
          return currentDate >= currentStopDate;
        }
      }

      return null;
    },

    getParent(name) {
      let p = this.$parent;

      while (typeof p !== 'undefined') {
        if (p.$options.name === name) {
          return p;
        } else {
          p = p.$parent;
        }
      }

      return false;
    },

    openSightDialog(sight) {
      // get sight dialog content from wikivoyage
      const context = this;
      sharedMethods["a" /* default */].getWikivoyageData(sight.name).then(result => {
        if (result !== null) {
          context.sightDialog.title = result.title || sight.name;
          context.sightDialog.description = result.description || 'Es konnten leider keine Informationen gefunden werden';
          context.sightDialog.shortDescription = result.shortDescription;
          context.sightDialog.imgSrc = result.imgSrc;
          context.sightDialog.showed = true;
        } else {
          context.sightDialog.title = sight.name;
          context.sightDialog.description = 'Es konnten leider keine Informationen gefunden werden';
          context.sightDialog.shortDescription = '';
          context.sightDialog.imgSrc = '';
          context.sightDialog.showed = true;
        }
      });
    },

    searchSights() {
      if (this.location.lng && this.location.lat) {
        sharedMethods["a" /* default */].getSights(this.location.lng, this.location.lat).then(results => {
          if (results !== null) {
            this.sights = results.data.data;
          } else {
            this.sights = 'error';
          }
        });
      }
    },

    compare(a, b) {
      const dateA = sharedMethods["a" /* default */].getDateFromString(a.date);
      const dateB = sharedMethods["a" /* default */].getDateFromString(b.date);
      if (dateA > dateB) return 1;
      if (dateB > dateA) return -1;
      return 0;
    }

  },

  created() {
    this.oldAddedSights = this.addedSights;
    this.oldDate = this.date;
    this.dailyTrips.sort(this.compare);
    this.dailyTrips.forEach((dailyTrip, index) => {
      dailyTrip.newDate = this.newDailyTripDate(dailyTrip.date);

      if (index === 0) {
        this.getDailyTripDuration([this.location.lng, this.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.location.label, this.location.label, dailyTrip);
      } else {
        this.getDailyTripDuration([this.dailyTrips[index - 1].location.lng, dailyTrip.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.dailyTrips[index - 1].location.label, this.location.label, dailyTrip);
      }
    });
  },

  mounted() {
    if (this.lastItem) {
      sharedMethods["a" /* default */].scrollToOffset(this.$refs.lastTimelineEntry);
    }
  }

});
// CONCATENATED MODULE: ./src/pages/EditRoundtripComponents/stop.vue?vue&type=script&lang=js&
 /* harmony default export */ var EditRoundtripComponents_stopvue_type_script_lang_js_ = (stopvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/EditRoundtripComponents/stop.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  EditRoundtripComponents_stopvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var stop = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=28.js.map