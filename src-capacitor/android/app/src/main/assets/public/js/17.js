(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "5236":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7810":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/RoundtripWizard.vue?vue&type=template&id=0b05921c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:!_vm.isRTEditMode ? 'q-px-lg q-pb-md' : '',style:(!_vm.isRTEditMode ? 'padding-top:20px;' : ''),attrs:{"id":"roundtripWizard"}},[(_vm.user !== null)?_c('div',{staticClass:"edit-btn-container",staticStyle:{"position":"fixed","z-index":"101","right":"0","padding":"10px"}},[(_vm.$route.params.id)?_c('q-btn',{attrs:{"round":"","color":"primary","icon":"visibility"},on:{"click":function($event){_vm.unsavedChanges ? _vm.showCancelDialog = true : _vm.$router.push('/rundreise-ansehen/' + _vm.$route.params.id)}}},[_c('q-tooltip',[_vm._v("Reise ansehen")])],1):_vm._e()],1):_vm._e(),_c('q-dialog',{attrs:{"persistent":""},model:{value:(_vm.showCancelDialog),callback:function ($$v) {_vm.showCancelDialog=$$v},expression:"showCancelDialog"}},[_c('q-card',{staticStyle:{"min-width":"350px"}},[_c('q-card-section',[_c('div',{staticClass:"text-h6"},[_vm._v("Ungesicherte Änderungen")]),_c('span',[_vm._v("Wenn du jetzt zurück gehst werden deine Änderungen werden verworfen! "),_c('br'),_vm._v(" Möchtest du trotzdem zurück?")])]),_c('q-card-actions',{staticClass:"text-primary",attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"label":"Änderungen verwerfen","flat":""},on:{"click":function($event){return _vm.$router.push('/rundreise-ansehen/' + _vm.$route.params.id)}}}),_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"type":"submit","label":"Abbrechen","flat":""}})],1)],1)],1),(!_vm.$store.getters['demoSession/isInDemoSession'])?_c('div',{staticStyle:{"margin-bottom":"20px"}},[_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.isRTEditMode),expression:"!isRTEditMode"}],on:{"click":function($event){return _vm.$router.push('/meine-rundreisen')}}},[_c('q-icon',{attrs:{"name":"keyboard_arrow_left"}}),_vm._v("\n      meine Rundreisen\n    ")],1)]):_vm._e(),(!_vm.isRTEditMode)?_c('q-stepper',{ref:"stepper",attrs:{"header-nav":"","color":"primary","contracted":_vm.isMobile,"animated":"","keep-alive":""},scopedSlots:_vm._u([{key:"navigation",fn:function(){return [_c('div',{staticStyle:{"height":"80px"}})]},proxy:true},{key:"message",fn:function(){return [_c('div',{staticClass:"sticky-navigation",style:(!_vm.isRTEditMode ? 'top: 93vh;' : '')},[_c('q-stepper-navigation',{staticClass:"flex justify-end"},[(_vm.step === 1)?[_c('q-btn',{attrs:{"color":"primary","disable":!_vm.currentRoundtrip.Title || !_vm.currentRoundtrip.Rooms || !_vm.currentRoundtrip.Adults,"label":"weiter"},on:{"click":function($event){_vm.step = 2}}})]:(_vm.step === 2)?[_c('q-btn',{staticClass:"q-ml-sm",attrs:{"flat":"","color":"primary","label":"Zurück"},on:{"click":function($event){_vm.step = 1}}}),_c('q-btn',{attrs:{"color":"primary","disable":_vm.currentRoundtrip.TransportProfile === 'Reisemittel wählen' || (_vm.currentRoundtrip.TransportProfile === 'Flugzeug' && (!_vm.currentRoundtrip.TransportProfile || !_vm.currentRoundtrip.Origin || !_vm.currentRoundtrip.Destination || !_vm.currentRoundtrip.DepatureDate || !_vm.currentRoundtrip.ReturnDate || !_vm.currentRoundtrip.TravelClass || !_vm.currentRoundtrip.NonStop)),"label":"Weiter"},on:{"click":function($event){_vm.step = 3}}})]:(_vm.step === 3)?[(!_vm.isRTEditMode)?_c('q-btn',{staticClass:"q-ml-sm",attrs:{"flat":"","color":"primary","label":"zurück"},on:{"click":function($event){_vm.step = 2}}}):_vm._e(),_c('q-btn',{staticClass:"q-ml-sm",attrs:{"flat":"","color":"primary","disable":_vm.addedStops.length <= 1,"label":_vm.unsavedChanges ? (!_vm.isRTEditMode ? 'Reise fertigstellen' : 'Reise speichern') : 'Reise ansehen',"loading":_vm.saving},on:{"click":function($event){_vm.unsavedChanges ? _vm.createTrip() : _vm.$router.push('/rundreise-ansehen/' + _vm.$route.params.id)}}})]:_vm._e()],2)],1)]},proxy:true}],null,false,3141146287),model:{value:(_vm.step),callback:function ($$v) {_vm.step=$$v},expression:"step"}},[(!_vm.isRTEditMode)?_c('q-step',{attrs:{"name":1,"title":"Allgemeine Infos","icon":"settings","done":_vm.step > 1,"header-nav":_vm.step > 1}},[_c('q-input',{ref:"titleInput",attrs:{"rules":[function (val) { return val !== null &&  val !== ''  || 'Bitte gib einen Titel an'; }, function (val) { return _vm.isUniqueTitle(val); }, function (val) { return val[0] !== ' ' || 'Das erste Zeichen kann kein Leerzeichen sein'; }],"label":"Titel","outlined":""},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"title"}})]},proxy:true}],null,false,490390316),model:{value:(_vm.currentRoundtrip.Title),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip, "Title", $$v)},expression:"currentRoundtrip.Title"}}),_c('div',[_c('p',[_vm._v("Die folgenden Infos benötigen wir, um bei der Hotelsuche bereits alle Daten für dich einzugeben. "),_c('br'),_vm._v(" Du kannst dies auch später noch ändern")]),_c('q-input',{attrs:{"label":"Zimmer","type":"number","rules":[function (val) { return val !== null &&  val !== '' && val > 0  || 'Bitte gib eine Zimmeranzahl an'; }],"outlined":""},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"house"}})]},proxy:true}],null,false,2617713096),model:{value:(_vm.currentRoundtrip.Rooms),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip, "Rooms", $$v)},expression:"currentRoundtrip.Rooms"}}),_c('q-input',{attrs:{"label":"Erwachsene","type":"number","rules":[function (val) { return val !== null &&  val !== '' && val > 0  || 'Bitte gib die Anzahl der Erwachsenen Reisenden an'; }, function (val) { return val <= parseInt(_vm.currentRoundtrip.Rooms) * 9 || 'Bitte wähle mehr Zimmer'; }],"outlined":""},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"group"}})]},proxy:true}],null,false,1028831827),model:{value:(_vm.currentRoundtrip.Adults),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip, "Adults", $$v)},expression:"currentRoundtrip.Adults"}}),_c('q-input',{attrs:{"label":"Kinder","type":"number","rules":[function (val) { return val !== null &&  val !== '' && val >= 0  && val <= 20|| 'Bitte gib die Anzahl der Kinder auf der Reise an'; }],"outlined":""},on:{"input":function($event){_vm.currentRoundtrip.ChildrenAges.length = parseInt(_vm.currentRoundtrip.ChildrenAges)}},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"child_friendly"}})]},proxy:true}],null,false,1135801950),model:{value:(_vm.currentRoundtrip.Children),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip, "Children", $$v)},expression:"currentRoundtrip.Children"}}),(parseInt(_vm.currentRoundtrip.Children) > 0  && parseInt(_vm.currentRoundtrip.Children) <= 20)?_c('div',{staticClass:"flex justify-center",staticStyle:{"margin":"auto","margin-top":"20px"}},_vm._l((parseInt(_vm.currentRoundtrip.Children)),function(childNum){return _c('q-input',{key:childNum,staticStyle:{"margin-right":"10px"},attrs:{"label":'Alter Kind ' + childNum,"type":"number","rules":[function (val) { return val !== null &&  val !== '' && val > 0 || 'Bitte gib das Alter des Kindes an'; }],"outlined":""},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"child_friendly"}})]},proxy:true}],null,true),model:{value:(_vm.currentRoundtrip.ChildrenAges[childNum - 1]),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip.ChildrenAges, childNum - 1, $$v)},expression:"currentRoundtrip.ChildrenAges[childNum - 1]"}})}),1):_vm._e()],1),_c('p',[_vm._v("Wenn du das genaue Datum noch nicht weißt, kannst du es auch später noch ändern.")]),_c('q-input',{staticClass:"input-item",attrs:{"filled":"","error-message":"Bitte gib ein richtiges Datum an","error":!_vm.isDateTimeValid(),"lazy-rules":"","bottom-slots":"","outlined":"","label":"Startdatum"},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"event"}},[_c('q-popup-proxy',{attrs:{"transition-show":"scale","transition-hide":"scale"}},[_c('q-date',{attrs:{"today-btn":"","mask":"DD.MM.YYYY HH:mm"},model:{value:(_vm.currentStop.InitDate),callback:function ($$v) {_vm.$set(_vm.currentStop, "InitDate", $$v)},expression:"currentStop.InitDate"}})],1)],1)]},proxy:true},{key:"append",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"access_time"}},[_c('q-popup-proxy',{attrs:{"transition-show":"scale","transition-hide":"scale"}},[_c('q-time',{attrs:{"mask":"DD.MM.YYYY HH:mm","format24h":""},model:{value:(_vm.currentStop.InitDate),callback:function ($$v) {_vm.$set(_vm.currentStop, "InitDate", $$v)},expression:"currentStop.InitDate"}})],1)],1)]},proxy:true}],null,false,1420779139),model:{value:(_vm.currentStop.InitDate),callback:function ($$v) {_vm.$set(_vm.currentStop, "InitDate", $$v)},expression:"currentStop.InitDate"}})],1):_vm._e(),(!_vm.isRTEditMode)?_c('q-step',{attrs:{"name":2,"title":"An-/Abreise","icon":"flight","done":_vm.step > 2,"header-nav":_vm.step > 2}},[_c('q-select',{staticStyle:{"padding-bottom":"32px"},attrs:{"outlined":"","input-debounce":"0","options":['Flugzeug', 'Andere'],"label":"Reisemittel","rules":[function (val) { return val !== null && val !== '' || 'Bitte wähle ein Reisemittel'; }]},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"commute"}})]},proxy:true}],null,false,1230678660),model:{value:(_vm.currentRoundtrip.TransportProfile),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip, "TransportProfile", $$v)},expression:"currentRoundtrip.TransportProfile"}}),(_vm.currentRoundtrip.TransportProfile === 'Flugzeug')?_c('div',{staticClass:"flight-container"},[_c('q-select',{ref:"select",attrs:{"outlined":"","use-input":"","hide-selected":"","fill-input":"","input-debounce":"0","clearable":"","hide-dropdown-icon":"","label":"Abflugsort","options":_vm.originOptions,"rules":[function (val) { return val !== null && val !== '' || 'Bitte wähle einen Ort'; }]},on:{"filter":_vm.getOrigins},scopedSlots:_vm._u([{key:"no-option",fn:function(){return [_c('q-item',[_c('q-item-section',{staticClass:"text-grey"},[_vm._v("\n                zu viele/keine Ergebnisse, bitte weitertippen\n              ")])],1)]},proxy:true},{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"flight_takeoff"}})]},proxy:true}],null,false,248680868),model:{value:(_vm.currentRoundtrip.Origin),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip, "Origin", $$v)},expression:"currentRoundtrip.Origin"}}),_c('q-select',{ref:"select",attrs:{"outlined":"","use-input":"","hide-selected":"","fill-input":"","input-debounce":"0","clearable":"","hide-dropdown-icon":"","label":"Ankunftsort","options":_vm.destinationOptions,"rules":[function (val) { return val !== null && val !== '' || 'Bitte wähle einen Ort'; }]},on:{"filter":_vm.getDestinations,"input":function($event){return _vm.destinationChanged($event)}},scopedSlots:_vm._u([{key:"no-option",fn:function(){return [_c('q-item',[_c('q-item-section',{staticClass:"text-grey"},[_vm._v("\n                zu viele/keine Ergebnisse, bitte weitertippen\n              ")])],1)]},proxy:true},{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"flight_land"}})]},proxy:true}],null,false,137916215),model:{value:(_vm.currentRoundtrip.Destination),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip, "Destination", $$v)},expression:"currentRoundtrip.Destination"}}),_c('q-input',{staticClass:"input-item rounded-borders q-field--with-bottom",attrs:{"outlined":"","label":"Abflugsdatum"},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"event"}})]},proxy:true}],null,false,991951772),model:{value:(_vm.currentRoundtrip.DepatureDate),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip, "DepatureDate", $$v)},expression:"currentRoundtrip.DepatureDate"}},[_c('q-popup-proxy',{attrs:{"transition-show":"scale","transition-hide":"scale"}},[_c('q-date',{attrs:{"today-btn":"","mask":"DD.MM.YYYY"},on:{"input":function($event){return _vm.updateReturnDate()}},model:{value:(_vm.currentRoundtrip.DepatureDate),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip, "DepatureDate", $$v)},expression:"currentRoundtrip.DepatureDate"}})],1)],1),_c('q-input',{staticClass:"input-item rounded-borders q-field--with-bottom",attrs:{"outlined":"","label":"Rückflugsdatum"},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"event"}})]},proxy:true}],null,false,991951772),model:{value:(_vm.currentRoundtrip.ReturnDate),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip, "ReturnDate", $$v)},expression:"currentRoundtrip.ReturnDate"}},[_c('q-popup-proxy',{attrs:{"transition-show":"scale","transition-hide":"scale"}},[_c('q-date',{attrs:{"today-btn":"","mask":"DD.MM.YYYY"},model:{value:(_vm.currentRoundtrip.ReturnDate),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip, "ReturnDate", $$v)},expression:"currentRoundtrip.ReturnDate"}})],1)],1),_c('q-select',{attrs:{"outlined":"","input-debounce":"0","options":['Economy', 'Premium Economy', 'Business', 'First'],"label":"Reiseklasse auswählen","rules":[function (val) { return val !== null && val !== '' || 'Bitte wähle eine Klasse'; }]},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"star"}})]},proxy:true}],null,false,2365783000),model:{value:(_vm.currentRoundtrip.TravelClass),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip, "TravelClass", $$v)},expression:"currentRoundtrip.TravelClass"}}),_c('q-select',{attrs:{"outlined":"","input-debounce":"0","options":['Ja', 'Nein'],"label":"Non Stop","rules":[function (val) { return val !== null && val !== '' || 'Bitte wähle eine Option'; }]},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"flight"}})]},proxy:true}],null,false,2782165300),model:{value:(_vm.currentRoundtrip.NonStop),callback:function ($$v) {_vm.$set(_vm.currentRoundtrip, "NonStop", $$v)},expression:"currentRoundtrip.NonStop"}})],1):(_vm.currentRoundtrip.TransportProfile === 'Andere')?_c('div',[_c('p',{staticStyle:{"text-align":"left"}},[_vm._v("Bei einem anderem Reisemittel können wir dir bei der Planung deiner An- und Abreise aktuell leider nicht helfen.")]),_c('p',{staticStyle:{"text-align":"left"}},[_vm._v("Du kannst dafür sofort mit der Reiseplanung beginnen!")])]):_vm._e()],1):_vm._e(),_c('q-step',{attrs:{"name":3,"title":"Reise erstellen","icon":"place","done":_vm.step > 3,"header-nav":_vm.step > 3}},[_c('TripOverview',{ref:"tripOverview",attrs:{"addedStops":_vm.addedStops,"currentRoundtrip":_vm.currentRoundtrip,"isEditMode":_vm.isRTEditMode},on:{"stopsDragged":function($event){return _vm.onStopsDragged($event)},"editStop":function($event){return _vm.editStop($event);},"removeStop":function($event){return _vm.removeStop($event)},"addStop":function($event){return _vm.handleAddStopFromMap($event)},"update":function($event){return _vm.updateFromSuggestedCity($event)},"distanceUpdate":function($event){return _vm.updateTotalTripDistance($event)}}})],1)],1):_c('div',[_c('TripOverview',{attrs:{"addedStops":_vm.addedStops,"currentRoundtrip":_vm.currentRoundtrip,"isEditMode":_vm.isRTEditMode},on:{"stopsDragged":function($event){return _vm.onStopsDragged($event)},"editStop":function($event){return _vm.editStop($event);},"removeStop":function($event){return _vm.removeStop($event)},"addStop":function($event){return _vm.handleAddStopFromMap($event)},"update":function($event){return _vm.updateFromSuggestedCity($event)},"distanceUpdate":function($event){return _vm.updateTotalTripDistance($event)}}}),_c('div',{staticClass:"sticky-navigation"},[_c('q-btn',{staticClass:"q-ml-sm",attrs:{"flat":"","color":"primary","label":_vm.unsavedChanges ? (!_vm.isRTEditMode ? 'Reise fertigstellen' : 'Reise speichern') : 'Reise ansehen',"loading":_vm.saving},on:{"click":function($event){_vm.unsavedChanges ? _vm.createTrip() : _vm.$router.push('/rundreise-ansehen/' + _vm.$route.params.id)}}})],1)],1),_c('q-dialog',{staticClass:"bg-white",model:{value:(_vm.showAddStopDialog),callback:function ($$v) {_vm.showAddStopDialog=$$v},expression:"showAddStopDialog"}},[_c('q-card',[_c('q-card-section',[_c('q-input',{staticStyle:{"font-family":"Raleway","font-size":"1.25rem"},attrs:{"rules":[function (val) { return val !== null &&  val !== ''  || 'Bitte gib einen Titel an'; }],"autofocus":"","label":"Titel","label-color":"secondary","filled":"","lazy-rules":""},model:{value:(_vm.currentStop.Title),callback:function ($$v) {_vm.$set(_vm.currentStop, "Title", $$v)},expression:"currentStop.Title"}}),_c('q-input',{attrs:{"type":"number","filled":"","label":"Dauer in Tagen","rules":[function (val) { return val !== null &&  val !== '' && val > 0 || 'Bitte gib eine Anzahl von Tagen ein'; }],"lazy-rules":""},model:{value:(_vm.currentStop.DayDuration),callback:function ($$v) {_vm.$set(_vm.currentStop, "DayDuration", _vm._n($$v))},expression:"currentStop.DayDuration"}}),_c('div',{staticStyle:{"margin-bottom":"20px"}},[_c('span',[_vm._v("Ankunftszeit:")]),_c('span',{staticClass:"cursor-pointer font-medium"},[_vm._v("\n            "+_vm._s(_vm.currentStop.InitDate.split(' ')[1])+"\n            "),_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"access_time"}}),_c('q-popup-proxy',{attrs:{"transition-show":"scale","transition-hide":"scale"}},[_c('q-time',{attrs:{"mask":"DD.MM.YYYY HH:mm","format24h":""},model:{value:(_vm.currentStop.InitDate),callback:function ($$v) {_vm.$set(_vm.currentStop, "InitDate", $$v)},expression:"currentStop.InitDate"}},[_c('div',{staticClass:"row items-center justify-end"},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"label":"Fertig","color":"primary","flat":""}})],1)])],1)],1)])],1),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"label":"Abbrechen"}}),_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"color":"primary","disable":!_vm.currentStop.Title && _vm.currentStop.DayDuration <= 0,"label":"hinzufügen"},on:{"click":function () { _vm.addStop() }}})],1)],1)],1),_c('q-dialog',{model:{value:(_vm.showEditStopDialog),callback:function ($$v) {_vm.showEditStopDialog=$$v},expression:"showEditStopDialog"}},[_c('q-card',[_c('q-card-section',[_c('q-input',{staticStyle:{"font-family":"Raleway","font-size":"1.25rem"},attrs:{"rules":[function (val) { return val !== null &&  val !== ''  || 'Bitte gib einen Titel an'; }],"autofocus":"","label":"Titel","label-color":"secondary","filled":"","lazy-rules":""},model:{value:(_vm.currentStop.Title),callback:function ($$v) {_vm.$set(_vm.currentStop, "Title", $$v)},expression:"currentStop.Title"}}),_c('q-input',{attrs:{"type":"number","filled":"","label":"Dauer in Tagen","rules":[function (val) { return val !== null &&  val !== '' && val > 0 || 'Bitte gib eine Anzahl von Tagen ein'; }],"lazy-rules":""},model:{value:(_vm.currentStop.DayDuration),callback:function ($$v) {_vm.$set(_vm.currentStop, "DayDuration", _vm._n($$v))},expression:"currentStop.DayDuration"}}),_c('div',{staticStyle:{"margin-bottom":"20px"}},[_c('span',[_vm._v("Ankunft:")]),_c('span',{staticClass:"cursor-pointer font-medium"},[_vm._v("\n            "+_vm._s(_vm.currentStop.InitDate.split(' ')[1])+"\n            "),_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"access_time"}}),_c('q-popup-proxy',{attrs:{"transition-show":"scale","transition-hide":"scale"}},[_c('q-time',{attrs:{"mask":"DD.MM.YYYY HH:mm","format24h":""},model:{value:(_vm.currentStop.InitDate),callback:function ($$v) {_vm.$set(_vm.currentStop, "InitDate", $$v)},expression:"currentStop.InitDate"}},[_c('div',{staticClass:"row items-center justify-end"},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"label":"Fertig","color":"primary","flat":""}})],1)])],1)],1)]),_c('q-select',{staticClass:"input-item",attrs:{"outlined":"","options":['zu Fuß', 'Fahrrad', 'Auto'],"label":"Reisemittel ab Ort","use-input":"","rules":[function (val) { return val !== null && val !== '' || 'Bitte wähle ein Reisemittel'; }]},on:{"input":function($event){return _vm.getGeneralProfile()}},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"commute"}})]},proxy:true}]),model:{value:(_vm.inputProfile),callback:function ($$v) {_vm.inputProfile=$$v},expression:"inputProfile"}}),(!_vm.hotelName)?_c('div',{staticStyle:{"margin-bottom":"30px"}},[_c('q-btn',{attrs:{"size":"20","icon":"add"},on:{"click":function($event){_vm.addHotel = true}}},[_vm._v("Hotel hinzufügen\n          ")])],1):_vm._e(),_c('div',{staticStyle:{"margin-bottom":"20px"}},[(_vm.hotelName)?_c('q-list',{staticClass:"rounded-borders",attrs:{"bordered":"","padding":"","dense":""}},[_c('q-item',{staticClass:"hotel-list"},[_c('q-item-section',{attrs:{"avatar":"","top":""}},[_c('q-avatar',{attrs:{"color":"secondary","text-color":"white","font-size":"20px","icon":"hotel"}})],1),_c('q-item-section',[_c('q-item-label',{staticClass:"flex",staticStyle:{"flex-wrap":"wrap","white-space":"normal"},attrs:{"lines":"2"}},[_c('span',{staticStyle:{"padding-right":"5px"}},[_vm._v(_vm._s(_vm.capitalize(_vm.hotelName)))]),(_vm.hotelStars && !isNaN(_vm.hotelStars))?_c('q-rating',{staticClass:"stars",staticStyle:{"margin-right":"10px","padding-right":"5px"},attrs:{"readonly":"","size":"15px","color":"gold"},model:{value:(_vm.hotelStars),callback:function ($$v) {_vm.hotelStars=$$v},expression:"hotelStars"}}):_vm._e(),_c('div',{staticClass:"flex",staticStyle:{"flex-wrap":"wrap","white-space":"normal"}},[(_vm.guestRating)?_c('span',{staticClass:"raleway"},[_vm._v("\n                      "+_vm._s(_vm.guestRating)+", \n                    ")]):_vm._e(),(_vm.hotelPrice)?_c('span',[_c('span',{staticClass:"raleway"},[_vm._v("ca. € ")]),_c('span',{staticClass:"raleway"},[_vm._v(_vm._s(_vm.hotelPrice))]),_c('q-tooltip',[_vm._v("ungefährer Durchschnittspreis pro Person & Nacht")])],1):_vm._e()])],1),_c('q-item-label',{staticStyle:{"overflow":"hidden"},attrs:{"caption":""}},[_c('a',{staticClass:"ellipsis",on:{"click":function($event){_vm.openInNewTab('https://www.google.com/maps/search/?api=1&query=' + _vm.capitalize(_vm.hotelName + ', ' + _vm.hotelLocation.label))}}},[_vm._v(_vm._s(_vm.hotelLocation && typeof _vm.hotelLocation !== 'undefined' && _vm.hotelLocation.label && typeof _vm.hotelLocation.label !== 'undefined' ? _vm.capitalize(_vm.hotelLocation.label) :  'kein Ort angegeben'))])])],1),_c('q-item-section',[(_vm.transportLocations && _vm.transportLocations.lenght > 0)?_c('q-btn',{staticStyle:{"width":"150px"},on:{"click":function($event){_vm.showTransportDialog = true}}},[_vm._v("Transport\n                ")]):_vm._e()],1),_c('q-dialog',{model:{value:(_vm.showTransportDialog),callback:function ($$v) {_vm.showTransportDialog=$$v},expression:"showTransportDialog"}},[_c('q-card',[_c('q-card-section',{staticClass:"row items-center flex",staticStyle:{"flex-direction":"column"}},[_c('q-list',_vm._l((_vm.transportLocations),function(location){return _c('div',{key:location,staticClass:"flex",staticStyle:{"flex-direction":"column"}},_vm._l((location.locations),function(sublocation){return _c('q-item',{key:sublocation,attrs:{"clickable":""},on:{"click":function($event){return _vm.openInNewTab('https://www.google.com/maps/search/?api=1&query=' + sublocation.name)}}},[_c('q-item-section',[_c('span',[_c('q-icon',{attrs:{"name":_vm.getHotelTransportationIcon(location.category)}}),_c('span',[_vm._v(_vm._s(sublocation.name))])],1),_c('p',[_vm._v(_vm._s(sublocation.distanceInTime))])])],1)}),1)}),0)],1),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"OK","color":"primary"}})],1)],1)],1),_c('q-item-section',{attrs:{"side":""}},[(_vm.generalTempLink && _vm.generalTempLink.length > 0)?_c('div',[_c('q-chip',{staticClass:"linkChip",attrs:{"icon":"link","dense":"","clickable":""},on:{"click":function($event){return _vm.openInNewTab(_vm.generalTempLink)}}},[_vm._v("Hotelwebsite")])],1):_vm._e(),(_vm.hotelName && typeof _vm.hotelName !== 'undefined'
                   )?_c('q-chip',{staticClass:"linkChip",staticStyle:{"width":"117px"},attrs:{"icon":"launch","dense":"","clickable":""},on:{"click":function($event){_vm.openInNewTab('https://www.booking.com/searchresults.de.html?ss=' + _vm.capitalize(_vm.hotelName) + '&checkin_year=' + _vm.date.split(' ')[0].split('.')[2] + '&checkin_month=' + _vm.date.split('.')[1] + '&checkin_monthday=' + _vm.date.split('.')[0] + '&checkout_year=' + _vm.checkOutDate.split('.')[2] + '&checkout_month=' + _vm.checkOutDate.split('.')[1] + '&checkout_monthday=' + _vm.checkOutDate.split('.')[0] + '&group_adults=' + _vm.adults + _vm.getChildrenText() +  '&no_rooms=' + _vm.rooms + '&ac_langcode=de')}}},[_vm._v(" booking.com\n                  "),_c('q-tooltip',[_vm._v("Hotel auf booking.com")])],1):_vm._e(),(_vm.hotelName && typeof _vm.hotelName !== 'undefined'
                  )?_c('q-chip',{staticClass:"linkChip",staticStyle:{"width":"117px"},attrs:{"icon":"launch","dense":"","clickable":""},on:{"click":function($event){_vm.openInNewTab('https://www.expedia.de/Hotel-Search?adults=' + _vm.adults + 'children=' + _vm.getExpediaChildrenText() + '%2C1_3&destination=' + _vm.capitalize(_vm.hotelName) + '&endDate=' + _vm.checkOutDate.split(' ')[0].split('.')[2] + '-' + _vm.checkOutDate.split('.')[1] + '-' + _vm.checkOutDate.split('.')[0] + '&rooms=' + _vm.rooms + '&sort=RECOMMENDED&startDate=' + _vm.date.split(' ')[0].split('.')[2] + '-' + _vm.date.split('.')[1] + '-' + _vm.date.split('.')[0] + '&theme=&useRewards=true')}}},[_vm._v(" expedia\n                  "),_c('q-tooltip',[_vm._v("Hotel auf expedia")])],1):_vm._e()],1),(_vm.hotelContact && typeof _vm.hotelContact !== 'undefined'
                )?_c('q-item-section',{attrs:{"side":""}},[_c('div',{staticClass:"hotel-contact"},[(_vm.hotelContact.email && typeof _vm.hotelContact.email !== 'undefined'
                    )?_c('q-chip',{attrs:{"icon":"email","clickable":""},on:{"click":function($event){return _vm.openInNewTab('mailto:' + _vm.hotelContact.email)}}},[_vm._v(_vm._s(_vm.hotelContact.email)+"\n                  ")]):_vm._e(),(_vm.hotelContact.phone && typeof _vm.hotelContact.phone !== 'undefined'
                    )?_c('q-chip',{attrs:{"icon":"phone","clickable":""},on:{"click":function($event){return _vm.openInNewTab('tel:' + _vm.hotelContact.phone)}}},[_vm._v(_vm._s(_vm.hotelContact.phone)+"\n                  ")]):_vm._e()],1)]):_vm._e(),_c('q-item-section',{attrs:{"side":""}},[_c('q-icon',{attrs:{"name":"clear","color":"primary"},on:{"click":function($event){return _vm.removeHotel()}}})],1)],1)],1):_vm._e()],1),_c('q-dialog',{model:{value:(_vm.addHotel),callback:function ($$v) {_vm.addHotel=$$v},expression:"addHotel"}},[_c('q-card',[_c('q-card-section',[_c('h6',{staticStyle:{"margin":"0"}},[_vm._v("Hotels auf booking.com ansehen:")]),(_vm.currentStop.Location)?_c('q-chip',{staticClass:"linkChip",staticStyle:{"width":"117px","margin-bottom":"40px"},attrs:{"icon":"launch","dense":"","clickable":""},on:{"click":function($event){_vm.openInNewTab('https://www.booking.com/searchresults.de.html?ss=' + _vm.currentStop.Location.label.split(',')[0] + '&checkin_year=' + _vm.currentStop.InitDate.split(' ')[0].split('.')[2] + '&checkin_month=' + _vm.currentStop.InitDate.split('.')[1] + '&checkin_monthday=' + _vm.currentStop.InitDate.split('.')[0] + '&checkout_year=' + _vm.getCheckOutDate().split('.')[2] + '&checkout_month=' + _vm.getCheckOutDate().split('.')[1] + '&checkout_monthday=' + _vm.getCheckOutDate().split('.')[0] + '&group_adults=' + _vm.currentRoundtrip.Adults + _vm.getChildrenText() +  '&no_rooms=' + _vm.currentRoundtrip.Rooms + '&ac_langcode=de')}}},[_vm._v(" booking.com\n              ")]):_vm._e(),_c('h6',{staticStyle:{"margin":"0"}},[_vm._v("Hotel hinzufügen:")]),(_vm.currentStop.Location && _vm.currentStop.Location.lat)?_c('HotelSearch',{ref:"hotelSearch",attrs:{"disabled":!_vm.getCheckOutDate(),"lat":_vm.currentStop.Location.lat.toString(),"long":_vm.currentStop.Location.lng.toString(),"checkInDate":_vm.currentStop.InitDate,"checkOutDate":_vm.getCheckOutDate(),"roomAmount":parseInt(_vm.currentRoundtrip.Rooms),"adults":parseInt(_vm.currentRoundtrip.Adults),"childrenAges":_vm.currentRoundtrip.ChildrenAges},on:{"update":function($event){return _vm.updateHotelData($event)}}}):_vm._e()],1),_c('q-card-section',[_c('q-input',{ref:"urlInput",attrs:{"type":"url","rules":[function (val) { return !val || _vm.urlReg.test(val) || 'Bitte gib einen richtigen Link an'; }],"label":"Hotel link (optional)","outlined":""},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"link"}})]},proxy:true}]),model:{value:(_vm.generalTempLink),callback:function ($$v) {_vm.generalTempLink=$$v},expression:"generalTempLink"}})],1),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"Abbrechen","color":"primary"},on:{"click":function($event){return _vm.removeHotel()}}}),_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"Hotel hinzufügen","color":"primary","disable":_vm.addHotelDisabled},on:{"click":function($event){return _vm.addHotelToStop()}}})],1)],1)],1),(_vm.suggestedSights && _vm.suggestedSights !== 'error')?_c('div',[_vm._l((_vm.suggestedSights),function(sight,index){return _c('span',{key:index,staticStyle:{"text-decoration":"none"},attrs:{"href": true ? _vm.currentStop.Location.label.split(',')[0] : undefined,"target":"_blank"}},[_c('q-chip',{attrs:{"clickable":"","icon":sight.category === 'SIGHTS' ? 'account_balance' : 'location_on'},on:{"click":function($event){return _vm.openSightDialog(sight)}}},[_vm._v(_vm._s(sight.name)+"\n            ")])],1)}),(_vm.currentStop.Location)?_c('a',{attrs:{"target":"_blank","href":'https://www.google.com/search?q=' +  _vm.currentStop.Location.label.split(',')[0] + ' Sehenswürdigkeiten'}},[_vm._v("weitere auf Google")]):_vm._e(),_c('q-dialog',{model:{value:(_vm.sightDialog.showed),callback:function ($$v) {_vm.$set(_vm.sightDialog, "showed", $$v)},expression:"sightDialog.showed"}},[_c('q-card',[_c('q-card-section',{staticClass:"row flex justify-end q-pb-none",staticStyle:{"z-index":"100","width":"100%","position":"absolute","color":"white"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"icon":"close","flat":"","round":"","dense":""}})],1),_c('q-img',{staticStyle:{"max-height":"75vh"},attrs:{"src":_vm.sightDialog.imgSrc}},[_c('div',{staticClass:"absolute-bottom"},[_c('div',{staticClass:"text-h6"},[_vm._v(_vm._s(_vm.sightDialog.title))]),_c('div',{staticClass:"text-subtitle2"},[_vm._v(_vm._s(_vm.sightDialog.shortDescription))])])]),_c('q-card-section',[_vm._v("\n                "+_vm._s(_vm.sightDialog.description)+"\n              ")]),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"hinzufügen","color":"primary"},on:{"click":function($event){[_vm.$refs.sightInput.add(_vm.sightDialog.title, true), _vm.saveSights()]}}})],1)],1)],1)],2):_c('q-chip',{attrs:{"clickable":""},on:{"click":function($event){return _vm.searchSights()}}},[_vm._v(_vm._s(_vm.suggestedSights === 'error' ? 'keine POIs gefunden' : 'POIs anzeigen')+"\n          "),_c('q-tooltip',[_vm._v("Sehenswürdigkeiten anzeigen")])],1),_c('q-select',{ref:"sightInput",staticStyle:{"margin":"10px 10px 10px 0"},attrs:{"label":"Sehenswürdigkeiten","filled":"","use-input":"","use-chips":"","multiple":"","hide-dropdown-icon":"","input-debounce":"0","new-value-mode":"add-unique"},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"add"},on:{"click":function($event){$event.stopPropagation();}}})]},proxy:true}]),model:{value:(_vm.currentStop.Sights),callback:function ($$v) {_vm.$set(_vm.currentStop, "Sights", $$v)},expression:"currentStop.Sights"}}),_c('q-editor',{ref:"editor_ref",staticStyle:{"margin-top":"10px","margin-bottom":"10px"},attrs:{"min-height":"5rem","toolbar":_vm.editorToolbar,"toolbar-toggle-color":"primary","fonts":_vm.editorFonts,"definitions":{
      format: {
        top: 'Formatierung bei Kopieren beibehaten',
        icon: _vm.$q.iconSet.editor.formatting,
        label: 'Format bei Kopie ' + (this.preventPasting ? 'aus' : 'an'),
        handler: _vm.formatOn
      }
      }},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.stopPropagation();}},nativeOn:{"paste":function($event){return (function (evt) { return _vm.pasteCapture(evt); })($event)}},model:{value:(_vm.currentStop.Description),callback:function ($$v) {_vm.$set(_vm.currentStop, "Description", $$v)},expression:"currentStop.Description"}})],1),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"Abbrechen","color":"primary"}}),_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"label":"Speichern","color":"primary","disable":!_vm.currentStop.DayDuration || _vm.currentStop.DayDuration <= 0},on:{"click":function () { _vm.addStop() }}})],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/RoundtripWizard.vue?vue&type=template&id=0b05921c&

// EXTERNAL MODULE: ./src/countries.js
var src_countries = __webpack_require__("e188");

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// EXTERNAL MODULE: ./src/sharedMethods.js
var sharedMethods = __webpack_require__("15c8");

// EXTERNAL MODULE: ./node_modules/quasar/src/utils/date.js
var date = __webpack_require__("bd4c");

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/RoundtripWizard.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



 // import draggable from 'vuedraggable'


let timeStamp = Date.now();
let formattedScheduleDate = date["b" /* default */].formatDate(timeStamp, 'DD.MM.YYYY');
/* harmony default export */ var RoundtripWizardvue_type_script_lang_js_ = ({
  components: {
    HotelSearch: () => __webpack_require__.e(/* import() */ 14).then(__webpack_require__.bind(null, "20e6")),
    // draggable,
    TripOverview: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(18)]).then(__webpack_require__.bind(null, "b595"))
  },
  computed: {
    isMobile() {
      return window.matchMedia('(max-width: 550px)').matches;
    },

    user() {
      return firebaseInit["a" /* auth */].user();
    }

  },

  data() {
    return {
      step: 1,
      countryOptions: src_countries["a" /* countries */],
      country: 'Land wählen',
      preventPasting: false,
      originOptions: [],
      destinationOptions: [],
      unsavedChanges: false,
      currentRoundtrip: {
        Title: '',
        Rooms: 1,
        Adults: 2,
        ChildrenAges: [],
        Children: 0,
        TransportProfile: 'Reisemittel wählen',
        Origin: null,
        Destination: null,
        DepatureDate: formattedScheduleDate,
        ReturnDate: formattedScheduleDate,
        TravelClass: 'Economy',
        NonStop: 'Ja'
      },
      currentStop: {
        Title: 'neuer Stopp',
        Description: 'Raum für Notizen, Beschreibungen...',
        Location: null,
        Sights: [],
        InitDate: formattedScheduleDate + ' 10:00',
        Profile: 'driving',
        DayDuration: 1
      },
      // leave this outside of current stop to avoid to much fields in db (will only be added to current stop if need to)
      hotelLocation: {},
      hotelStars: 0,
      hotelContact: {},
      hotelName: null,
      generalTempLink: null,
      hotelPrice: 0,
      guestRating: 0,
      transportLocations: [],
      showCancelDialog: false,
      addedStops: [],
      suggestedSights: null,
      sightDialog: {
        showed: false,
        title: '',
        imgSrc: '',
        description: '',
        shortDescription: ''
      },
      addHotel: false,
      addHotelDisabled: true,
      inputProfile: 'Auto',
      showAutoRoutedialog: false,
      isRTEditMode: false,
      saving: false,
      totalTripDuration: 0,
      totalTripDistance: 0,
      // -1 if no stop to edit (normal mode) else put index of stop to edit
      stopToEdit: -1,
      showAddStopDialog: false,
      showEditStopDialog: false,
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
    /**
     * adds the current stop to the stops array
     */
    addStop() {
      this.unsavedChanges = true; // remove placeholder if not changed

      if (this.currentStop.Description === 'Raum für Notizen, Beschreibungen...') this.currentStop.Description = ''; // add days of current stop to current date to get next stop init date

      let currentDate = sharedMethods["a" /* default */].getDateFromString(this.currentStop.InitDate);
      currentDate.setDate(currentDate.getDate() + this.currentStop.DayDuration); // this stop was already added to addedStops (edit mode)

      if (this.stopToEdit > -1) {
        if (this.addedStops[this.stopToEdit].DayDuration !== this.currentStop.DayDuration) {
          const dayDistance = this.currentStop.DayDuration - this.addedStops[this.stopToEdit].DayDuration; // update dates of all following stops

          for (let i = this.stopToEdit + 1; i < this.addedStops.length; i++) {
            const currentStopDate = sharedMethods["a" /* default */].getDateFromString(this.addedStops[i].InitDate);
            currentStopDate.setDate(currentStopDate.getDate() + dayDistance);
            this.addedStops[i].InitDate = date["b" /* default */].formatDate(currentStopDate, 'DD.MM.YYYY HH:mm');
          }
        }

        this.addedStops[this.stopToEdit] = this.currentStop; // set next stop init date to last stops one

        currentDate = sharedMethods["a" /* default */].getDateFromString(this.addedStops[this.addedStops.length - 1].InitDate);
        currentDate.setDate(currentDate.getDate() + this.addedStops[this.addedStops.length - 1].DayDuration);
        this.stopToEdit = -1;
      } else {
        this.addedStops.push(this.currentStop);
      }

      this.currentStop = {
        Title: 'neuer Stopp',
        Description: 'Raum für Notizen, Beschreibungen...',
        Location: null,
        Sights: [],
        InitDate: date["b" /* default */].formatDate(currentDate, 'DD.MM.YYYY HH:mm'),
        Profile: 'driving',
        DayDuration: 1
      }; // reload map

      if (this.$refs.tripOverview) this.$refs.tripOverview.refreshMap();
      this.updateTotalTripDuration();
    },

    /**
     * Set roundtrip to shortest route possible (get it from getShortestRoute & reset init dates)
     * @see getShortestRoute()
     */
    setTripToShortestRoute() {
      let suggestedStops = this.getShortestRoute();
      let initDate = sharedMethods["a" /* default */].getDateFromString(this.addedStops[0].InitDate);
      suggestedStops.forEach((stop, index) => {
        stop.InitDate = date["b" /* default */].formatDate(initDate, 'DD.MM.YYYY HH:mm');
        initDate.setDate(initDate.getDate() + 1);
        if (index === suggestedStops.length - 1) this.addedStops = suggestedStops;
      });
      this.updateTotalTripDuration();
    },

    /**
     * Get shortest route in comparing the distances between every stop
     * @see getShortestDistance()
     */
    getShortestRoute() {
      let stopsTaken = [this.addedStops[0]];
      this.addedStops.forEach((stop, index) => {
        if (index > 0) {
          let foundStop = this.getShortestDistance(stopsTaken[stopsTaken.length - 1], stopsTaken);

          if (foundStop !== null) {
            stopsTaken.push(foundStop);
          }
        }
      });
      return stopsTaken;
    },

    /**
     * Get shortest distance between two stops
     * @param originStop the origin to start from
     * @param {Array} stopsTaken array of stops already in suggested route
     * @see getDinstanceFromLatLonInKm()
     */
    getShortestDistance(originStop, stopsTaken) {
      let distances = [];
      let stop = null;
      this.addedStops.forEach(stop => {
        if (!stopsTaken.includes(stop)) {
          distances.push({
            distance: this.getDistanceFromLatLonInKm(originStop.Location.lng, originStop.Location.lat, stop.Location.lng, stop.Location.lat),
            stop: stop
          });
        }
      });

      if (distances.length > 0) {
        let distanceValues = [];
        distances.forEach(distanceArr => {
          distanceValues.push(distanceArr.distance);
        });
        let minVal = Math.min.apply(null, distanceValues);
        stop = distances[distances.findIndex(x => x.distance === minVal)].stop;
      }

      return stop;
    },

    /**
     * Get the distance between two lat lng positions in km
     * @example getDistanceFromLatLonInKm(42.2, 11.2, 42.6, 11.6)
     */
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km

      var dLat = this.deg2rad(lat2 - lat1); // deg2rad below

      var dLon = this.deg2rad(lon2 - lon1);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km

      return d;
    },

    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },

    /**
     *  removes the stop with the given index
     */
    removeStop(index) {
      this.unsavedChanges = true; // all following dates of deleted stop must be updated
      // following stop of deleted stop gets deleted stops date
      // get date of stop to delete

      const deletedStopDate = this.addedStops[index].InitDate; // delete this stop from db

      if (this.addedStops[index].DocId) firebaseInit["b" /* db */].collection('RoundtripDetails').doc(this.addedStops[index].DocId).delete(); // delete stop

      this.addedStops.splice(index, 1); // set following date to delete stop date

      this.addedStops[index].InitDate = deletedStopDate;

      for (let i = index + 1; i < this.addedStops.length; i++) {
        let previousStopDate = sharedMethods["a" /* default */].getDateFromString(this.addedStops[i - 1].InitDate);
        previousStopDate.setDate(previousStopDate.getDate() + this.addedStops[i - 1].DayDuration);
        this.addedStops[i].InitDate = date["b" /* default */].formatDate(previousStopDate, 'DD.MM.YYYY');
      }

      let lastStop = this.addedStops[this.addedStops.length - 1];
      let currentDate = sharedMethods["a" /* default */].getDateFromString(lastStop.InitDate);
      currentDate.setDate(currentDate.getDate() + lastStop.DayDuration);
      this.currentStop.InitDate = date["b" /* default */].formatDate(currentDate, 'DD.MM.YYYY HH:mm'); // reload map

      if (this.$refs.tripOverview) this.$refs.tripOverview.refreshMap();
      if (this.addedStops.length === 0) this.step = 3;
      this.updateTotalTripDuration();
    },

    /**
     * creates the roundtrip (write the temp data into db)
     */
    createTrip() {
      if (!this.unsavedChanges) this.$router.push('/rundreise-ansehen/' + this.$route.params.id); // need this json stringify to prevent update of location when the click location changes

      let stops = JSON.parse(JSON.stringify(this.addedStops)); // make all date strings to real dates

      stops.forEach((stop, index) => {
        stop.InitDate = sharedMethods["a" /* default */].getDateFromString(this.addedStops[index].InitDate);
      });
      this.currentRoundtrip.Title = this.currentRoundtrip.Title.charAt(0).toUpperCase() + this.currentRoundtrip.Title.slice(1);
      this.currentRoundtrip.Title = this.currentRoundtrip.Title.trim();
      let tripDuration = this.getTripDuration();
      let daysString = '< 5 Tage';

      if (tripDuration < 5) {
        daysString = '< 5 Tage';
      } else if (tripDuration >= 5 && tripDuration <= 8) {
        daysString = '5-8 Tage';
      } else if (tripDuration >= 9 && tripDuration <= 11) {
        daysString = '9-11 Tage';
      } else if (tripDuration >= 12 && tripDuration <= 15) {
        daysString = '12-15 Tage';
      } else if (tripDuration > 15) {
        daysString = '> 15 Tage';
      }

      this.currentRoundtrip.Days = daysString;
      this.getRoundtripCountries().then(countries => {
        if (this.$store.getters['demoSession/isInDemoSession'] && firebaseInit["a" /* auth */].user() === null) {
          this.$store.dispatch({
            type: 'demoSession/addRoundtrip',
            roundtripObject: this.currentRoundtrip,
            tempLocation: countries,
            originCode: null,
            destinationCode: null,
            stops: stops
          }).then(() => {
            this.$router.push('/registrieren');
          });
        } else if (this.isRTEditMode) {
          let promiseList = []; // update existing roundtrip

          this.addedStops.forEach(stop => {
            if (stop.DocId) {
              // this stop is existing
              promiseList.push(firebaseInit["b" /* db */].collection('RoundtripDetails').doc(stop.DocId).update(stop));
            } else {
              // this is a new stop
              stop.RTId = this.$route.params.id;
              promiseList.push(firebaseInit["b" /* db */].collection('RoundtripDetails').add(stop));
            }
          });
          this.saving = true;
          Promise.all(promiseList).then(() => {
            this.saving = false;
            sharedMethods["a" /* default */].showSuccessNotification('Reise wurde gespeichert');
            setTimeout(function () {
              this.$router.push('/rundreise-ansehen/' + this.$route.params.id);
            }, 1000);
          });
        } else {
          // add roundtrip normally
          this.saving = true;

          try {
            this.$store.dispatch({
              type: 'roundtrips/addRoundtrip',
              title: this.currentRoundtrip.Title,
              days: daysString,
              uid: firebaseInit["a" /* auth */].user().uid,
              rooms: this.currentRoundtrip.Rooms,
              adults: this.currentRoundtrip.Adults,
              childrenAges: this.currentRoundtrip.ChildrenAges,
              tempLocation: countries,
              depatureDate: this.currentRoundtrip.DepatureDate,
              transportProfile: this.currentRoundtrip.TransportProfile,
              origin: this.currentRoundtrip.Origin,
              originCode: null,
              destination: this.currentRoundtrip.Destination,
              destinationCode: null,
              returnDate: this.currentRoundtrip.ReturnDate,
              travelClass: this.currentRoundtrip.TravelClass,
              nonStop: this.currentRoundtrip.NonStop,
              stops: stops
            }).then(docId => {
              if (docId && docId !== null) {
                let context = this; // wait to ensure roundtrip is fully added

                setTimeout(function () {
                  this.saving = false;
                  console.log(docId);
                  context.$router.push('/rundreise-ansehen/' + docId);
                }, 500);
              } else {
                this.saving = false;
                sharedMethods["a" /* default */].showErrorNotification('Deine Rundreise konnte nicht erstellt werden, bitte versuche es erneut');
              }
            });
          } catch (error) {
            console.log(error);
            this.saving = false;
            sharedMethods["a" /* default */].showErrorNotification('Deine Rundreise konnte nicht erstellt werden, bitte versuche es erneut');
            return false;
          }
        }
      });
    },

    /**
     * updates total trip duration
     */
    updateTotalTripDuration() {
      let startDate = sharedMethods["a" /* default */].getDateFromString(this.addedStops[0].InitDate);
      let stopDate = sharedMethods["a" /* default */].getDateFromString(this.addedStops[this.addedStops.length - 1].InitDate);
      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.round(Math.abs((startDate - stopDate) / oneDay));
      this.totalTripDuration = diffDays + this.addedStops[this.addedStops.length - 1].DayDuration;
    },

    /**
     * called from map
     * resets amount if -1 will be passed
     */
    updateTotalTripDistance(distance) {
      console.log(distance);
      if (distance === -1) this.totalTripDistance = 0;else this.totalTripDistance += distance;
    },

    getRoundtripCountries() {
      return new Promise(resolve => {
        let tempCountries = [];
        let promiseList = [];
        this.addedStops.forEach((stop, index) => {
          let url = 'http://api.geonames.org/countryCodeJSON?lang=de&lat=' + stop.Location.lat + '&lng=' + stop.Location.lng + '&username=roundtrips4you';
          promiseList.push(axios_default.a.get(url).then(response => {
            if (!tempCountries.includes(response.data.countryName)) tempCountries.push(response.data.countryName);
          }).catch(function (error) {
            console.log(error);
          }));
        });
        Promise.all(promiseList).then(vals => {
          resolve(tempCountries);
        });
      });
    },

    getTripDuration() {
      let startDate = sharedMethods["a" /* default */].getDateFromString(this.addedStops[0].InitDate);
      let stopDate = sharedMethods["a" /* default */].getDateFromString(this.addedStops[this.addedStops.length - 1].InitDate);
      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.round(Math.abs((startDate - stopDate) / oneDay));
      this.tripDuration = diffDays;
    },

    onStopsDragged(event) {
      this.unsavedChanges = true; // dont do anything if stop was not moved

      if (event.newIndex === event.oldIndex) return; // know this is messy but only solution to update added stop with right value

      let newAddedStops = JSON.parse(JSON.stringify(event.addedStops)); // stop was moved > recalculate dates
      // set dragged stop date to dragged on stop
      // set next date to this date + dragged stop date days etc.
      // set previous date to this date - previos date days etc.

      let draggedStop = newAddedStops[event.newIndex];
      let draggedUp = event.oldIndex > event.newIndex;
      let draggedOnStop = newAddedStops[event.newIndex - 1];
      if (draggedUp) draggedOnStop = newAddedStops[event.newIndex + 1]; // set dragged stop date to dragged on stop date

      draggedStop.InitDate = JSON.parse(JSON.stringify(draggedOnStop.InitDate)); // set all following dates to previous date +  previous date day duration

      for (let i = event.newIndex + 1; i < newAddedStops.length; i++) {
        let previousStopDate = sharedMethods["a" /* default */].getDateFromString(newAddedStops[i - 1].InitDate);
        previousStopDate.setDate(previousStopDate.getDate() + newAddedStops[i - 1].DayDuration);
        newAddedStops[i].InitDate = date["b" /* default */].formatDate(previousStopDate, 'DD.MM.YYYY HH:mm');
      } // set all previous dates to following date - previous date day duration


      for (let i = event.newIndex - 1; i >= 0; i--) {
        let followingStopDate = sharedMethods["a" /* default */].getDateFromString(newAddedStops[i + 1].InitDate);
        followingStopDate.setDate(followingStopDate.getDate() - newAddedStops[i].DayDuration);
        console.log(followingStopDate);
        newAddedStops[i].InitDate = date["b" /* default */].formatDate(followingStopDate, 'DD.MM.YYYY HH:mm');
      }

      this.addedStops = newAddedStops; // reload map

      if (this.$refs.tripOverview) this.$refs.tripOverview.refreshMap();
    },

    /**
     * called when a user clicks on a stop to edit it
     */
    editStop(index) {
      this.currentStop = JSON.parse(JSON.stringify(this.addedStops[index]));
      console.log(this.currentStop);
      this.stopToEdit = index;
      this.showEditStopDialog = true;
    },

    isUniqueTitle(val) {
      return sharedMethods["a" /* default */].isUniqueTitle(val);
    },

    getChildrenText() {
      let text = '&group_children=' + this.currentRoundtrip.ChildrenAges.length;
      this.currentRoundtrip.ChildrenAges.forEach(child => {
        text += '&age=' + child;
      });
      return text;
    },

    capitalize(value) {
      return sharedMethods["a" /* default */].capitalize(value);
    },

    addHotelToStop() {
      this.currentStop.HotelLocation = this.hotelLocation;
      this.currentStop.HotelStars = this.hotelStars;
      this.currentStop.HotelContact = this.hotelContact;
      this.currentStop.HotelName = this.hotelName;
      this.currentStop.GeneralLink = this.generalTempLink;
      this.currentStop.CheckOutDate = this.getCheckOutDate();
      this.currentStop.HotelPrice = this.hotelPrice;
      this.currentStop.GuestRating = this.guestRating;
      this.currentStop.TransportLocations = this.transportLocations;
    },

    removeHotel() {
      this.hotelName = null;
      delete this.currentStop.HotelLocation;
      delete this.currentStop.HotelStars;
      delete this.currentStop.HotelContact;
      delete this.currentStop.HotelName;
      delete this.currentStop.GeneralLink;
      delete this.currentStop.CheckOutDate;
      delete this.currentStop.HotelPrice;
      delete this.currentStop.GuestRating;
      delete this.currentStop.TransportLocations;
    },

    /**
     * gets the check out date (add duration of days to init date)
     */
    getCheckOutDate() {
      // add days of current stop to current date
      let checkOutDate = sharedMethods["a" /* default */].getDateFromString(this.currentStop.InitDate);
      checkOutDate.setDate(checkOutDate.getDate() + this.currentStop.DayDuration);
      checkOutDate = date["b" /* default */].formatDate(checkOutDate, 'DD.MM.YYYY');
      return checkOutDate;
    },

    isDateTimeValid() {
      return sharedMethods["a" /* default */].isDateTimeValid(this.currentStop.InitDate);
    },

    /**
     * filter countries method used in filter method of quasar select component
     */
    filterCountries(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.countryOptions = src_countries["a" /* countries */].filter(v => v.toLowerCase().indexOf(needle) > -1);
      });
    },

    getGeneralProfile() {
      switch (this.inputProfile) {
        case 'zu Fuß':
          this.currentStop.Profile = 'walking';
          break;

        case 'Fahrrad':
          this.currentStop.Profile = 'cycling';
          break;

        default:
          this.currentStop.Profile = 'driving';
          break;
      }
    },

    openInNewTab(link) {
      window.open(link, '_blank');
    },

    /**
     * called from city suggestions, when user adds a new city
     */
    updateFromSuggestedCity(event) {
      this.unsavedChanges = true;
      this.currentStop.Location = {
        lng: event.longitude,
        lat: event.latitude,
        label: event.name
      };
      this.currentStop.Title = 'Stopp in ' + event.name.split(',')[0];
      this.step = 5;
    },

    /**
    * update location object with location serch results
    * @param event event from location search update callback
    */
    updateLocation(event) {
      if (event !== null) {
        this.currentStop.Location = {
          lng: event.x,
          lat: event.y,
          label: event.label
        };
        this.currentStop.Title = 'Stopp in ' + event.label.split(',')[0];
        this.step = 5;
      } else {
        this.currentStop.Location = null;
      }
    },

    formatOn() {
      this.preventPasting = !this.preventPasting;
    },

    /**
     * method for q-editor
     */
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

    /**
     * open sight dialog to show data from wikivoyage about sight
     */
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

    /**
     * search the sights for current location
     */
    searchSights() {
      if (this.currentStop.Location.lng && this.currentStop.Location.lat) {
        sharedMethods["a" /* default */].getSights(this.currentStop.Location.lng, this.currentStop.Location.lat).then(results => {
          if (results !== null) {
            this.suggestedSights = results.data.data;
          } else {
            this.suggestedSights = 'error';
          }
        });
      }
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

    destinationChanged(val) {
      // todo destination codes are not defined
      this.getLocationFromIataCode(this.destinationCodes[this.destinationOptions.indexOf(val)], this.destinationAddresses[this.destinationOptions.indexOf(val)]);
    },

    getLocationFromIataCode(code, countryName) {
      let context = this;
      axios_default.a.get('http://iatageo.com/getLatLng/' + code).then(function (response) {
        context.tempLocation = {
          lat: response.data.latitude,
          lng: response.data.longitude,
          label: countryName
        };
      }).catch(function (error) {
        console.log('Error' + error);
      });
    },

    getOrigins(val, update, abort) {
      sharedMethods["a" /* default */].filterAirports(val, update, abort, true, this);
    },

    getDestinations(val, update, abort) {
      sharedMethods["a" /* default */].filterAirports(val, update, abort, false, this);
    },

    getLocationString(locations) {
      let locationString = '';
      locations.forEach((location, index) => {
        locationString = locationString + (index !== 0 ? ', ' : '') + location;
      });
      return locationString;
    },

    updateReturnDate() {
      let dateParts = this.currentRoundtrip.DepatureDate.split('.');
      let depatureDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      let returnDate = depatureDate;
      returnDate.setDate(depatureDate.getDate() + 1);
      this.currentRoundtrip.ReturnDate = date["b" /* default */].formatDate(returnDate, 'DD.MM.YYYY');
    },

    handleAddStopFromMap(event) {
      this.unsavedChanges = true;
      let lastDate = this.currentStop.InitDate; // check if we didn't add this stop before

      if (this.currentStop.Location !== event.location) {
        this.currentStop = {
          Title: 'Stopp in ' + event.location.label,
          Description: 'Raum für Notizen, Beschreibungen...',
          Location: event.location,
          Sights: [],
          InitDate: lastDate,
          Profile: 'driving',
          DayDuration: 1
        };
        this.showAddStopDialog = true; // this.step = 5
      }
    },

    /**
    * sorts trip stops after their init dates (must be placed in sort())
    */
    compare(a, b) {
      const initDateA = sharedMethods["a" /* default */].getDateFromString(a.InitDate);
      const initDateB = sharedMethods["a" /* default */].getDateFromString(b.InitDate);
      if (initDateA > initDateB) return 1;
      if (initDateB > initDateA) return -1;
      return 0;
    }

  },

  created() {
    firebaseInit["a" /* auth */].authRef().onAuthStateChanged(user => {
      if (!this.$store.getters['demoSession/isInDemoSession'] && !firebaseInit["a" /* auth */].user()) {
        this.$store.commit('demoSession/setAsDemoSession');
      } else {
        let RTId = this.$route.params.id;

        if (RTId) {
          // we are in edit rt mode
          this.isRTEditMode = true;
          this.step = 6;
          this.currentRoundtrip.Title = 'Laden...';
          this.$store.dispatch('roundtrips/fetchSingleRoundtrip', RTId).then(roundtrip => {
            this.currentRoundtrip = roundtrip;
          }); // get stops

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
              this.addedStops.push(stop);
              this.addedStops.sort(this.compare);
              this.updateTotalTripDuration();
            });
          });
        }
      }
    });
  }

});
// CONCATENATED MODULE: ./src/pages/RoundtripWizard.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_RoundtripWizardvue_type_script_lang_js_ = (RoundtripWizardvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/pages/RoundtripWizard.vue?vue&type=style&index=0&lang=less&
var RoundtripWizardvue_type_style_index_0_lang_less_ = __webpack_require__("cde2");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/RoundtripWizard.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_RoundtripWizardvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var RoundtripWizard = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "cde2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RoundtripWizard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5236");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RoundtripWizard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RoundtripWizard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_2_2_node_modules_less_loader_dist_cjs_js_ref_9_oneOf_2_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RoundtripWizard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

}]);
//# sourceMappingURL=17.js.map