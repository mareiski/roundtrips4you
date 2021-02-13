(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "2f91":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Roundtrips.vue?vue&type=template&id=2f1eede0&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"roundtrips"},[_c('div',{staticClass:"topic flex justify-center"},[_c('div',{staticStyle:{"display":"flex","flex-direction":"column","justify-content":"center"}},[_c('router-link',{staticStyle:{"text-decoration":"none"},attrs:{"to":"/rundreisen-uebersicht"}},[_c('q-icon',{attrs:{"name":"keyboard_arrow_left"}}),_vm._v("\n        zurück zu allen Ländern\n      ")],1)],1),_c('h2',[_vm._v(_vm._s(_vm.selectedCountry)+": "+_vm._s(_vm.roundtripCount)+" Rundreise"+_vm._s(_vm.roundtripCount === 1 ? null : 'n')+" gefunden")]),_c('q-select',{staticStyle:{"padding":"0 10px 0 0"},attrs:{"outlined":"","input-debounce":"0","options":_vm.sortOptions,"label":"Sortieren"},on:{"input":function($event){return _vm.sortRoundtrips($event)}},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"search"}})]},proxy:true}]),model:{value:(_vm.sort),callback:function ($$v) {_vm.sort=$$v},expression:"sort"}})],1),_c('div',{attrs:{"id":"CardBackgroundImg"}}),_c('div',{attrs:{"id":"RoundtripCardBackgroundImgPlaceholder"}},[_c('div',{staticClass:"filter-container"},[_c('div',{staticClass:"filter-card"},[_c('h2',[_vm._v("Suche")]),_c('q-select',{attrs:{"outlined":"","use-input":"","hide-selected":"","fill-input":"","input-debounce":"0","options":_vm.countryOptions,"label":"Land auswählen","rules":[function (val) { return val !== null && val !== '' || 'Bitte wähle ein Land'; }]},on:{"filter":_vm.filterFn},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"explore"}})]},proxy:true},{key:"no-option",fn:function(){return [_c('q-item',[_c('q-item-section',{staticClass:"text-grey"},[_vm._v("\n                Keine Ergebnisse\n              ")])],1)]},proxy:true}]),model:{value:(_vm.country),callback:function ($$v) {_vm.country=$$v},expression:"country"}}),_c('q-input',{staticClass:"input-item rounded-borders",staticStyle:{"padding-bottom":"20px"},attrs:{"outlined":"","label":"Zeitraum"},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"event"}})]},proxy:true}]),model:{value:(_vm.OfferPeriod),callback:function ($$v) {_vm.OfferPeriod=$$v},expression:"OfferPeriod"}},[_c('q-popup-proxy',{ref:"qDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[_c('q-date',{attrs:{"today-btn":"","mask":"DD.MM.YYYY","options":_vm.dateOptions},on:{"input":function () { return _vm.$refs.qDateProxy.hide(); }},model:{value:(_vm.OfferPeriod),callback:function ($$v) {_vm.OfferPeriod=$$v},expression:"OfferPeriod"}})],1)],1),_c('q-select',{staticClass:"input-item",attrs:{"outlined":"","options":_vm.dayOptions,"label":"Reisedauer","clearable":""},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"access_time"}})]},proxy:true}]),model:{value:(_vm.dayModel),callback:function ($$v) {_vm.dayModel=$$v},expression:"dayModel"}}),_c('a',{staticClass:"button",on:{"click":function($event){_vm.$router.push('/rundreisen/' + _vm.country); _vm.getRoundtrips(true); _vm.getRTCount()}}},[_vm._v("Suchen")])],1),_c('div',{staticClass:"filter-card"},[_c('q-expansion-item',{staticClass:"rounded-borders filter-expansion-label",attrs:{"label":"Filter","bordered":""},model:{value:(_vm.isNotMobile),callback:function ($$v) {_vm.isNotMobile=$$v},expression:"isNotMobile"}},[_c('q-expansion-item',{staticClass:"filter-expansion",attrs:{"label":"Gesamtpreis pro Person","default-opened":""}},[_c('q-range',{attrs:{"min":0,"max":_vm.maxPrice,"step":10,"left-label-value":_vm.step.min + ' €',"right-label-value":_vm.step.max + ' €',"label":"","color":"deep-orange"},on:{"input":function($event){return _vm.filterRoundtrips()}},model:{value:(_vm.step),callback:function ($$v) {_vm.step=$$v},expression:"step"}}),_c('p',[_vm._v("\n              Preis ab "+_vm._s(_vm.step.min)+" € bis "+_vm._s(_vm.step.max)+" €\n            ")])],1),_c('q-expansion-item',{staticClass:"filter-expansion",attrs:{"default-opened":""},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('q-item-section',[_vm._v("\n                Reisemittel\n              ")]),_c('q-item-section',{attrs:{"side":""}},[_c('q-icon',{attrs:{"name":"info"}},[_c('q-tooltip',[_vm._v("\n                    Das Reisemittel auf deiner Reise\n                  ")])],1)],1)]},proxy:true}])},_vm._l((_vm.tripKind),function(kind){return _c('q-checkbox',{key:kind,attrs:{"label":kind,"val":kind,"color":"dark-orange"},on:{"input":function($event){return _vm.filterRoundtrips()}},model:{value:(_vm.filteredTripKinds),callback:function ($$v) {_vm.filteredTripKinds=$$v},expression:"filteredTripKinds"}})}),1),_c('q-expansion-item',{staticClass:"filter-expansion",attrs:{"default-opened":""},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('q-item-section',[_vm._v("\n                Highlights\n              ")]),_c('q-item-section',{attrs:{"side":""}},[_c('q-icon',{attrs:{"name":"info"}},[_c('q-tooltip',[_vm._v("\n                    Die Highlights deiner Reise\n                  ")])],1)],1)]},proxy:true}])},_vm._l((_vm.roundtripAttr),function(attr,index){return _c('q-checkbox',{key:index,attrs:{"label":attr,"val":attr,"color":"dark-orange"},on:{"input":function($event){return _vm.filterRoundtrips()}},model:{value:(_vm.filteredRoundtripAttr),callback:function ($$v) {_vm.filteredRoundtripAttr=$$v},expression:"filteredRoundtripAttr"}})}),1),_c('q-expansion-item',{staticClass:"filter-expansion",attrs:{"default-opened":""},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('q-item-section',[_vm._v("\n                Reisekategorie\n              ")]),_c('q-item-section',{attrs:{"side":""}},[_c('q-icon',{attrs:{"name":"info"}},[_c('q-tooltip',[_vm._v("\n                    Die Kategorie der Reise\n                  ")])],1)],1)]},proxy:true}])},_vm._l((_vm.roundtripCategories),function(category){return _c('q-checkbox',{key:category,attrs:{"label":category,"val":category,"color":"dark-orange"},on:{"input":function($event){return _vm.filterRoundtrips()}},model:{value:(_vm.filteredRoundtripCategories),callback:function ($$v) {_vm.filteredRoundtripCategories=$$v},expression:"filteredRoundtripCategories"}})}),1)],1)],1)]),_c('div',{staticClass:"roundtrip-cards-container",staticStyle:{"position":"relative"}},[_c('q-inner-loading',{attrs:{"showing":_vm.visible}},[_c('q-spinner',{attrs:{"size":"50px","color":"primary"}})],1),(!_vm.visible && _vm.roundtripCount === 0)?_c('div',{staticClass:"roundtrip-card-container"},[_c('router-link',{staticClass:"roundtrip-card",attrs:{"to":_vm.user ? { path: '/meine-rundreisen'} : { path: '/login'}}},[_c('div',{staticClass:"card-center-col",staticStyle:{"justify-content":"flex-start","width":"auto"}},[_c('div',{staticClass:"card-row"},[_c('div',{staticClass:"no-rt-title flex"},[_c('q-icon',{attrs:{"name":"warning"}}),_c('span',[_vm._v("Es wurden leider keine Rundreisen für "+_vm._s(_vm.selectedCountry)+" gefunden")])],1)]),_c('div',{staticClass:"card-row"},[_c('span',{staticStyle:{"font-size":"18px","padding-top":"35px"}},[_vm._v("Aber das macht nichts, ertelle einfach selbst deine eigene Rundreise für "+_vm._s(_vm.selectedCountry))])])]),_c('div',{staticClass:"card-right-col",staticStyle:{"width":"auto","justify-content":"flex-end","min-width":"190px"}},[_c('div',{staticClass:"card-bottom-row"},[_c('router-link',{staticClass:"button details-button",attrs:{"to":_vm.user ? { path: '/meine-rundreisen'} : { path: '/login'}}},[_vm._v("Jetzt erstellen")])],1)])])],1):_vm._e(),_vm._l((_vm.roundtrips),function(roundtrip){return _c('div',{key:roundtrip.RTId,staticClass:"roundtrip-card-container"},[_c('router-link',{staticClass:"roundtrip-card",attrs:{"to":{ path: '/rundreise-ansehen/' + roundtrip.RTId + '&' + _vm.getParamsDate(_vm.OfferPeriod)}}},[_c('div',{staticClass:"card-left-col"},[_c('q-img',{staticClass:"card-image",attrs:{"alt":'Titelbild der Rundreise ' + roundtrip.Title,"src":_vm.TitleImgs[_vm.RTIds.indexOf(roundtrip.RTId)]}})],1),_c('div',{staticClass:"card-center-col"},[_c('div',{staticClass:"card-row",staticStyle:{"height":"50px"}},[_c('span',{staticClass:"card-category",staticStyle:{"font-size":"13px"}},[_vm._v(_vm._s(roundtrip.Category))]),_c('h2',{staticClass:"country-title"},[_vm._v(_vm._s(roundtrip.Title))])]),_c('div',{staticClass:"card-row"},[_c('q-rating',{staticClass:"stars",attrs:{"size":"15px","color":"gold","readonly":""},model:{value:(roundtrip.Stars),callback:function ($$v) {_vm.$set(roundtrip, "Stars", $$v)},expression:"roundtrip.Stars"}}),_c('q-icon',{staticClass:"card-icon",attrs:{"name":"location_on"}}),_c('span',{staticClass:"country-title"},[_vm._v(_vm._s(Array.isArray(roundtrip.Location) ? _vm.getLocationString(roundtrip.Location): roundtrip.Location)+_vm._s(roundtrip.Region && typeof roundtrip.Region !== 'undefined' ? ', ' + roundtrip.Region : null))])],1),_c('div',{staticClass:"card-row"},[_c('q-icon',{staticClass:"card-icon",attrs:{"name":"commute"}}),_c('span',[_vm._v(_vm._s(roundtrip.Profile))])],1),_c('div',{staticClass:"card-row"},[_c('span',{staticClass:"card-days"},[_vm._v(_vm._s(roundtrip.Days)+",")]),_c('span',{staticClass:"card-hotels"},[_vm._v(_vm._s(roundtrip.Hotels)+" Hotel"+_vm._s(roundtrip.Hotels==1?null:'s'))])]),_c('div',{staticClass:"card-row description"},[_c('p',{staticClass:"card-description"},[_vm._v(_vm._s(roundtrip.Description))])]),_c('div',{staticClass:"card-bottom-row",staticStyle:{"padding-top":"5px"}},[_c('q-chip',[_vm._v(_vm._s(roundtrip.Highlights[0]))]),_c('q-chip',[_vm._v(_vm._s(roundtrip.Highlights[1]))]),_c('q-chip',[_vm._v(_vm._s(roundtrip.Highlights[2]))])],1)]),_c('div',{staticClass:"card-right-col"},[_c('div',{staticClass:"card-row"},[_c('a',{staticClass:"button price-button"},[_c('span',[_vm._v("€")]),_vm._v(_vm._s(roundtrip.Price)),_c('span',[_vm._v("p.P.")]),_c('q-tooltip',[_vm._v("Schätzwert des Reisenden, ohne Freizeitgestaltung")])],1),_c('router-link',{attrs:{"to":'/benutzerprofil/' + roundtrip.UserId}},[_c('q-avatar',{staticStyle:{"width":"50px","margin":"auto 10px auto 10px","padding-top":"0"},attrs:{"size":"50px"}},[_c('q-img',{attrs:{"src":_vm.userImages[_vm.RTIds.indexOf(roundtrip.RTId)]}}),(_vm.userNames[_vm.RTIds.indexOf(roundtrip.RTId)])?_c('q-tooltip',[_vm._v("von "+_vm._s(_vm.userNames[_vm.RTIds.indexOf(roundtrip.RTId)]))]):_vm._e()],1)],1)],1),_c('div',{staticClass:"card-bottom-row"},[_c('router-link',{staticClass:"button details-button",attrs:{"to":{ path: '/rundreise-ansehen/' + roundtrip.RTId + '&' + _vm.getParamsDate(_vm.OfferPeriod)}}},[_vm._v("Details")])],1)])])],1)}),_vm._m(0),_c('div',{staticClass:"flex justify-center",staticStyle:{"padding-bottom":"15px"}},[(_vm.paginationMax > 1)?_c('q-pagination',{staticClass:"pagination",attrs:{"color":"primary","max":_vm.paginationMax,"max-pages":6,"boundary-numbers":true},on:{"input":function($event){return _vm.getRoundtrips(false)}},model:{value:(_vm.currentPage),callback:function ($$v) {_vm.currentPage=$$v},expression:"currentPage"}}):_vm._e()],1)],2)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ins',{staticClass:"bookingaff",attrs:{"data-aid":"1931644","data-target_aid":"1931644","data-prod":"banner","data-width":"728","data-height":"90","data-lang":"de"}},[_c('a',{attrs:{"href":"//www.booking.com?aid=1931644"}})])}]


// CONCATENATED MODULE: ./src/pages/Roundtrips.vue?vue&type=template&id=2f1eede0&

// EXTERNAL MODULE: ./node_modules/quasar/src/utils/date.js
var date = __webpack_require__("bd4c");

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// EXTERNAL MODULE: ./src/countries.js
var countries = __webpack_require__("e188");

// EXTERNAL MODULE: ./src/sharedMethods.js
var sharedMethods = __webpack_require__("15c8");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Roundtrips.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
__webpack_require__.e(/* import() */ 4).then(__webpack_require__.t.bind(null, "7225", 7));




let timeStamp = Date.now();
let formattedDate = date["b" /* default */].formatDate(timeStamp, 'DD.MM.YYYY');
let roundtripArr = [];
const originalRoundtripArr = [];
let createdAts = [];
/* harmony default export */ var Roundtripsvue_type_script_lang_js_ = ({
  meta() {
    return {
      title: 'Reisen für ' + this.$route.params.country,
      meta: {
        description: {
          name: 'description',
          content: 'Rundreise ' + this.$route.params.country + '. Routen und Tipps zu ' + this.$route.params.country + ' auf Roundtrips4you, dein Reiseplaner und Routenplaner'
        }
      }
    };
  },

  data() {
    return {
      OfferPeriod: formattedDate,
      country: this.$route.params.country,
      selectedCountry: '',
      dayModel: null,
      orange: false,
      visible: false,
      showSimulatedReturnData: false,
      dayOptions: ['< 5 Tage', '5-8 Tage', '9-11 Tage', '12-15 Tage', '> 15 Tage'],
      step: {
        min: 0,
        max: 330
      },
      filteredRoundtripAttr: [],
      roundtripAttr: [],
      filteredTripKinds: [],
      tripKind: [],
      roundtripCategories: [],
      filteredRoundtripCategories: [],
      roundtrips: [],
      countryOptions: countries["a" /* countries */],
      filterRoundtripArr: [],
      TitleImgs: [],
      RTIds: [],
      maxPrice: 0,
      currentPage: 1,
      paginationMax: 1,
      roundtripCount: 0,
      sort: 'Erstellungsdatum',
      sortOptions: ['Preis aufsteigend', 'Preis absteigend', 'Hotelbewertung aufsteigend', 'Hotelbewertung absteigend', 'Erstellungsdatum'],
      // 'Reisedauer aufsteigend', 'Reisedauer absteigend' missing in sort opt
      title: null,
      editRTDialog: false,
      disableEditBtn: true,
      userImages: [],
      userNames: []
    };
  },

  name: 'Roundtrips',
  computed: {
    user() {
      return this.$store.getters['user/user'];
    },

    isNotMobile() {
      return !window.matchMedia('(max-width: 550px)').matches;
    }

  },
  methods: {
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.countryOptions = countries["a" /* countries */].filter(v => v.toLowerCase().indexOf(needle) > -1);
      });
    },

    dateOptions(date) {
      const dateTimeParts = formattedDate.split(' ');
      const dateParts = dateTimeParts[0].split('.');
      const compareDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      const currentDate = new Date(date);
      return currentDate >= compareDate;
    },

    checkDisableEditBtn(val) {
      sharedMethods["a" /* default */].isUniqueTitle(val).then(uniqueTitle => {
        if (uniqueTitle === 'Dieser Titel ist bereits vergeben') uniqueTitle = false;
        this.disableEditBtn = val === null || val === '' || !uniqueTitle;
      });
    },

    filterRoundtrips() {
      this.filterRoundtripArr = [];
      this.roundtrips = [];
      this.selectedCountry = this.country;
      this.visible = true;
      this.showSimulatedReturnData = false;
      originalRoundtripArr.length = 0;
      let dateParts = this.OfferPeriod.split('.');
      let offerPeriod = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], '00', '00', '00');
      let searchCreatedAt = createdAts[this.currentPage * 20 - 20];
      if (typeof searchCreatedAt === 'undefined' || searchCreatedAt === null) searchCreatedAt = 0;
      let roundtripsRef = firebaseInit["b" /* db */].collection('Roundtrips').where('Location', 'array-contains', this.country).where('Public', '==', true);
      if (this.dayModel !== null && this.dayModel.length > 0) roundtripsRef = roundtripsRef.where('Days', '==', this.dayModel);
      if (this.filteredRoundtripAttr.length > 0) roundtripsRef = roundtripsRef.where('Highlights', 'array-contains-any', this.filteredRoundtripAttr);
      this.filteredTripKinds.forEach(profile => {
        roundtripsRef = roundtripsRef.where('Profile', '==', profile);
      });
      this.filteredRoundtripCategories.forEach(cat => {
        roundtripsRef = roundtripsRef.where('Category', '==', cat);
      });
      roundtripsRef = roundtripsRef.orderBy('createdAt');
      roundtripsRef = roundtripsRef.startAt(searchCreatedAt).limit(20);
      roundtripsRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().OfferWholeYear || this.OfferPeriod !== null && this.OfferPeriod.length > 0 && doc.data().OfferStartPeriod.seconds * 1000 <= offerPeriod.getTime() && doc.data().OfferEndPeriod.seconds * 1000 >= offerPeriod.getTime()) {
            let roundtrip = doc.data();
            let isInPriceRange = this.step.max >= Number(roundtrip.Price) && this.step.min <= Number(roundtrip.Price);
            let isInFilter = this.includesArray(roundtrip.Highlights, this.filteredRoundtripAttr);
            if (isInFilter && isInPriceRange) this.filterRoundtripArr.push(roundtrip);
          }
        });
        this.roundtrips = [];
        this.roundtrips = this.roundtrips.concat(this.filterRoundtripArr);
        this.roundtripCount = this.roundtrips.length;
        this.visible = false;
        this.showSimulatedReturnData = true;
      });
    },

    includesArray(array1, array2) {
      if (array1.lenght === 0 || array2.length === 0) return true;
      let returnVal = true;
      array2.forEach(element => {
        if (!array1.includes(element)) returnVal = false;
      });
      return returnVal;
    },

    removeRoundtrip(roundtrip) {
      this.filterRoundtripArr.splice(this.filterRoundtripArr.indexOf(roundtrip), 1);
    },

    loadUserData(UserId) {
      let users = [];
      let context = this;
      let userRef = firebaseInit["b" /* db */].collection('User').where('UserUID', '==', UserId).limit(1);
      userRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          users.push(doc.data());
          context.userNames.push(users[0].UserName);
          context.userImages.push(users[0].UserImage);
        });
      });
    },

    loadTitleImg(docId, RTId) {
      let context = this;
      firebaseInit["c" /* storage */].ref().child('Images/Roundtrips/' + docId + '/Title/titleImg').getDownloadURL().then(function (url) {
        context.TitleImgs.push(url);
        context.RTIds.push(RTId);
      });
    },

    getRoundtrips(initialLoad) {
      this.selectedCountry = this.country;
      this.visible = true;
      this.showSimulatedReturnData = false;
      roundtripArr = [];
      originalRoundtripArr.length = 0;
      let dateParts = this.OfferPeriod.split('.');
      let offerPeriod = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], '00', '00', '00');
      let searchCreatedAt = createdAts[this.currentPage * 20 - 20];
      if (typeof searchCreatedAt === 'undefined' || searchCreatedAt === null) searchCreatedAt = 0;

      if (initialLoad) {
        searchCreatedAt = 0;
      }

      let roundtripsRef = firebaseInit["b" /* db */].collection('Roundtrips').where('Location', 'array-contains', this.country).where('Public', '==', true).orderBy('createdAt').startAt(searchCreatedAt).limit(20);

      if (this.dayModel !== null && this.dayModel.length > 0) {
        roundtripsRef = firebaseInit["b" /* db */].collection('Roundtrips').where('Location', 'array-contains', this.country).where('Public', '==', true).where('Days', '==', this.dayModel).orderBy('createdAt').startAt(searchCreatedAt).limit(20);
      } // reset filer


      this.filteredRoundtripAttr = [];
      this.filteredTripKinds = [];
      this.filteredRoundtripCategories = []; // filter vars

      let price = 0;
      let tripKind = [];
      let roundtripAttr = [];
      let category = [];
      roundtripsRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().OfferWholeYear || this.OfferPeriod !== null && this.OfferPeriod.length > 0 && doc.data().OfferStartPeriod.seconds * 1000 <= offerPeriod.getTime() && doc.data().OfferEndPeriod.seconds * 1000 >= offerPeriod.getTime()) {
            originalRoundtripArr.push(doc.data());
            originalRoundtripArr.reverse();
            this.loadTitleImg(doc.id, doc.data().RTId); // load user data

            this.loadUserData(doc.data().UserId);
            roundtripArr.push(doc.data());
            roundtripArr.reverse();
          }
        }); // read all posible values for filter

        roundtripArr.forEach((roundtrip, index) => {
          if (price < parseInt(roundtrip.Price)) price = parseInt(roundtrip.Price);
          if (!tripKind.includes(roundtrip.Profile)) tripKind.push(roundtrip.Profile);
          if (!roundtripAttr.includes(roundtrip.Highlights[1])) roundtripAttr.push(roundtrip.Highlights[0]);
          if (!roundtripAttr.includes(roundtrip.Highlights[1])) roundtripAttr.push(roundtrip.Highlights[1]);
          if (!roundtripAttr.includes(roundtrip.Highlights[2])) roundtripAttr.push(roundtrip.Highlights[2]);
          if (!category.includes(roundtrip.Category)) category.push(roundtrip.Category);
        });
        this.roundtrips = roundtripArr;
        this.step.max = price;
        this.maxPrice = price;
        this.tripKind = tripKind;
        this.roundtripAttr = roundtripAttr;
        this.roundtripCategories = category;
        this.visible = false;
        this.showSimulatedReturnData = true;
      }).catch(err => {
        console.log('Error getting Roundtrips', err);
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Es ist ein Fehler aufgetreten, bitte versuche es erneut'
        });
      });
    },

    getParamsDate(dateString) {
      let dateParts = dateString.split('.');
      return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], '00', '00', '00').getTime();
    },

    getRTCount() {
      const counterRef = firebaseInit["b" /* db */].collection('Roundtrips').where('Location', 'array-contains', this.country).where('Public', '==', true).orderBy('createdAt');
      this.roundtripCount = 0;
      counterRef.get().then(snapshot => {
        this.paginationMax = Math.ceil(snapshot.docs.length / 20);
        snapshot.forEach(doc => {
          this.roundtripCount++;
          createdAts.push(doc.data().createdAt);
        });
      });
    },

    sortRoundtrips(value) {
      switch (value) {
        case 'Preis aufsteigend':
          this.roundtrips.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
          break;

        case 'Preis absteigend':
          this.roundtrips.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
          break;

        case 'Hotelbewertung aufsteigend':
          this.roundtrips.sort((a, b) => parseFloat(a.Stars) - parseFloat(b.Stars));
          break;

        case 'Hotelbewertung absteigend':
          this.roundtrips.sort((a, b) => parseFloat(b.Stars) - parseFloat(a.Stars));
          break;

        case 'Reisedauer aufsteigend':
          this.roundtrips.sort((a, b) => parseFloat(a.Days) - parseFloat(b.Days));
          break;

        case 'Reisedauer absteigend':
          this.roundtrips.sort((a, b) => parseFloat(b.Days) - parseFloat(a.Days));
          break;

        case 'Erstellungsdatum':
          this.roundtrips = [];
          this.roundtrips = this.roundtrips.concat(originalRoundtripArr);
          break;
      }
    },

    getLocationString(locations) {
      let locationString = '';
      locations.forEach((location, index) => {
        locationString = locationString + (index !== 0 ? ', ' : '') + location;
      });
      return locationString;
    },

    loadBookingComWidget() {
      (function (d, sc, u) {
        var s = d.createElement(sc),
            p = d.getElementsByTagName(sc)[0];
        s.type = 'text/javascript';
        s.async = true;
        s.src = u + '?v=' + +new Date();
        p.parentNode.insertBefore(s, p);
      })(document, 'script', '//aff.bstatic.com/static/affiliate_base/js/flexiproduct.js');
    }

  },

  created() {
    this.currentPage = 1;
    this.getRoundtrips(true);
    this.getRTCount(); // this.loadBookingComWidget()
  },

  mounted() {// this.loadBookingComWidget()
  }

});
// CONCATENATED MODULE: ./src/pages/Roundtrips.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Roundtripsvue_type_script_lang_js_ = (Roundtripsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/Roundtrips.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_Roundtripsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Roundtrips = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "9a37":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/roundtripDetails.vue?vue&type=template&id=6893d8de&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"roundtrip-details q-px-lg q-pb-md"},[(_vm.user !== null)?_c('div',{staticClass:"edit-btn-container",staticStyle:{"position":"fixed","z-index":"1","right":"0","padding":"10px"}},[(_vm.isUserCreator)?_c('q-btn',{attrs:{"round":"","color":"primary","icon":"edit"},on:{"click":function($event){return _vm.$router.push('/rundreisen-wizard/' + _vm.RTId)}}},[_c('q-tooltip',[_vm._v("Reise bearbeiten")])],1):_c('q-btn',{attrs:{"round":"","color":"primary","icon":"content_copy"},on:{"click":function($event){_vm.copyRTDialog = true}}},[_c('q-tooltip',[_vm._v("Reise bearbeiten")])],1),(_vm.isUserCreator)?_c('q-btn',{staticStyle:{"margin-left":"10px"},attrs:{"round":"","color":"primary","icon":"settings"},on:{"click":function($event){return _vm.$router.push('/rundreisen-einstellungen/' + _vm.RTId)}}},[_c('q-tooltip',[_vm._v("Reiseeinstellungen")])],1):_vm._e(),_c('q-dialog',{attrs:{"persistent":""},model:{value:(_vm.copyRTDialog),callback:function ($$v) {_vm.copyRTDialog=$$v},expression:"copyRTDialog"}},[_c('q-card',{staticStyle:{"min-width":"350px"}},[_c('q-card-section',[_c('div',{staticClass:"text-h6"},[_vm._v("Reise kopieren")]),_c('span',[_vm._v("Diese Reise wird kopiert und zu deinen eigenen Reisen hinzugefügt. "),_c('br'),_vm._v(" Bitte gib dafür den neuen Titel der Reise ein.")])]),_c('q-card-section',[_c('q-input',{staticStyle:{"text-transform":"capitalize"},attrs:{"autofocus":"","outlined":"","rules":[function (val) { return val !== null &&  val !== ''  || 'Bitte gib einen Titel an'; }, function (val) { return _vm.sharedMethods.isUniqueTitle(val); }, function (val) { return val[0] !== ' ' || 'Das erste Zeichen kann kein Leerzeichen sein'; }],"label":"Titel der Rundreise"},on:{"input":function($event){return _vm.checkDisableEditBtn($event)}},model:{value:(_vm.copyRTTitle),callback:function ($$v) {_vm.copyRTTitle=$$v},expression:"copyRTTitle"}})],1),_c('q-card-actions',{staticClass:"text-primary",attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"label":"Abbrechen","flat":""}}),_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"type":"submit","label":"Rundreise kopieren","flat":"","disable":_vm.disableEditBtn},on:{"click":function($event){return _vm.copyRoundtrip()}}})],1)],1)],1)],1):_vm._e(),_c('div',{staticClass:"back-link",staticStyle:{"padding-top":"10px","padding-left":"10px"}},[(!_vm.isUserCreator)?_c('a',{staticStyle:{"text-decoration":"none"},on:{"click":function($event){_vm.prevRouteParams && _vm.prevRouteParams.length > 0 ? _vm.$router.go(-1) : _vm.$router.push('/rundreisen/'  + _vm.roundtrip.Location[0])}}},[_c('q-icon',{attrs:{"name":"keyboard_arrow_left"}}),_vm._v("\n      alle Rundreisen\n    ")],1):_c('a',{staticStyle:{"text-decoration":"none"},on:{"click":function($event){return _vm.$router.push('/meine-rundreisen')}}},[_c('q-icon',{attrs:{"name":"keyboard_arrow_left"}}),_vm._v("\n      meine Rundreisen\n    ")],1)]),_c('q-tabs',{staticClass:"text-grey",staticStyle:{"padding-top":"50px"},attrs:{"dense":"","active-color":"primary","indicator-color":"primary","align":"justify","narrow-indicator":""},model:{value:(_vm.tab),callback:function ($$v) {_vm.tab=$$v},expression:"tab"}},[_c('q-tab',{attrs:{"name":"overview","label":"Übersicht"}}),_c('q-tab',{attrs:{"name":"map","label":"Karte"}}),(_vm.roundtrip.Public)?_c('q-tab',{attrs:{"name":"ratings","label":"Chat"}}):_vm._e()],1),_c('q-separator'),_c('q-tab-panels',{ref:"tabPanels",attrs:{"animated":"","keep-alive":""},model:{value:(_vm.tab),callback:function ($$v) {_vm.tab=$$v},expression:"tab"}},[_c('q-tab-panel',{attrs:{"name":"overview"}},[_c('q-timeline',{attrs:{"color":"secondary"}},[_c('q-timeline-entry',{attrs:{"heading":""}},[_c('div',{staticClass:"flex justify-between"},[_c('span',[_vm._v(_vm._s(_vm.roundtrip ? _vm.roundtrip.Title : 'Reiseverlauf'))]),_c('q-toggle',{staticStyle:{"font-size":"18px"},attrs:{"label":"Stopps ausklappen"},on:{"input":function($event){return _vm.sharedMethods.expandAllStops(_vm.getContext, _vm.stops)}},model:{value:(_vm.allStopsExpanded),callback:function ($$v) {_vm.allStopsExpanded=$$v},expression:"allStopsExpanded"}})],1),_c('div',{staticClass:"legal-description"},[(!_vm.creator.companyProfile)?_c('p',[_vm._v("Alle Stopps, Hotels, Sehenswürdigkeiten usw. sind von "+_vm._s(_vm.creator.UserName ? _vm.creator.UserName : ' dem Ersteller dieser Rundreise ')+" empfohlen.")]):_vm._e(),(!_vm.creator.companyProfile)?_c('p',[_vm._v("Diese Reise dient nur zur Veranschaulichung und Darstellung eines Reisevorschlags.")]):_vm._e(),(_vm.creator.UserName)?_c('span',[_vm._v("Diese Rundreise wurde von ")]):_vm._e(),(_vm.roundtrip)?_c('router-link',{attrs:{"to":'/benutzerprofil/' + _vm.roundtrip.UserId}},[_vm._v("\n              "+_vm._s(_vm.creator.UserName)),_c('q-tooltip',[_c('q-avatar',{staticStyle:{"width":"50px","margin":"0","padding":"0"},attrs:{"size":"50px"}},[_c('q-img',{attrs:{"src":_vm.creator.UserImage}})],1)],1)],1):_vm._e(),(_vm.creator.TrustedUser)?_c('q-badge',{staticStyle:{"border-radius":"50%","padding":"2px","padding-top":"2.5px","margin-left":"1px"},attrs:{"align":"top","color":"blue"}},[_c('q-icon',{attrs:{"name":"done","color":"white","size":"13px"}}),_c('q-tooltip',[_vm._v("Dies ist ein von Roundtrips4you anerkannter User")])],1):_vm._e(),(_vm.creator.UserName)?_c('span',[_vm._v(" erstellt")]):_vm._e(),_c('br'),(!!_vm.creator.companyProfile && _vm.creator.UserName && _vm.tripWebsite)?_c('q-btn',{staticStyle:{"margin-top":"20px"},on:{"click":function($event){return _vm.openInNewTab(_vm.tripWebsite)}}},[_vm._v("Bei "+_vm._s(_vm.creator.UserName)+" buchen")]):_vm._e()],1),_c('div',{staticClass:"details-desctiption-container"},[_c('p',[_vm._v(_vm._s(_vm.roundtrip.Description))])])]),(!_vm.stopsLoaded)?[_vm._l((2),function(n){return [_c('q-timeline-entry',{key:n,scopedSlots:_vm._u([{key:"subtitle",fn:function(){return [_c('q-skeleton',{staticStyle:{"margin-bottom":"10px"},attrs:{"width":"300px","height":"10px","type":"rect"}})]},proxy:true}],null,true)},[_c('div',{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[_c('q-skeleton',{staticStyle:{"margin-right":"10px"},attrs:{"width":"400px","height":"15px","type":"rect"}})],1),_c('q-skeleton',{attrs:{"width":"90%","height":"50px","type":"rect"}})],1),_c('q-timeline-entry',{key:'A' + n,attrs:{"icon":"speed"},scopedSlots:_vm._u([{key:"subtitle",fn:function(){return [_c('q-skeleton',{staticStyle:{"margin-bottom":"20px"},attrs:{"width":"300px","height":"10px","type":"rect"}})]},proxy:true}],null,true)},[_c('q-skeleton',{staticStyle:{"margin-bottom":"10px"},attrs:{"height":"25px","width":"60px","type":"QChip"}})],1)]})]:_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.stopsLoaded),expression:"stopsLoaded"}],staticClass:"stop-list"},[_vm._l((_vm.stops),function(stop,index){return [_c('Stop',{key:stop.DocId,ref:stop.DocId,refInFor:true,class:'stop' + stop.DocId,attrs:{"title":stop.Title,"date":typeof _vm.stops[index].InitDate === 'string' ? stop.InitDate : _vm.sharedMethods.getStringDateFromTimestamp(stop.InitDate),"nextStopDate":_vm.stops[index + 1] ? (typeof _vm.stops[index + 1].InitDate === 'string' ? _vm.stops[index + 1].InitDate : _vm.sharedMethods.getStringDateFromTimestamp(_vm.stops[index + 1].InitDate.seconds)) : null,"editor-placeholder":stop.Description,"editor":false,"docId":stop.DocId,"general-link":stop.GeneralLink,"location":stop.Location && typeof stop.Location !== 'undefined' && stop.Location ? stop.Location : null,"parkingPlace":stop.Parking && typeof stop.Parking !== 'undefined' && stop.Parking ? stop.Parking : null,"lastItem":index === _vm.stops.length -1,"hotelStars":parseInt(stop.HotelStars),"hotelName":stop.HotelName,"hotelPrice":stop.HotelPrice,"guestRating":stop.GuestRating,"transportLocations":stop.TransportLocations,"hotelLocation":stop.HotelLocation,"hotelContact":stop.HotelContact,"adults":parseInt(_vm.adults),"childrenAges":_vm.childrenAges,"rooms":parseInt(_vm.rooms),"firstStop":index === 0,"galeryImgUrls":_vm.galeryImgUrls,"stopImages":typeof stop.StopImages === 'undefined' ? null : stop.StopImages,"addedSights":stop.Sights ? stop.Sights : [],"days":_vm.days[_vm.days.findIndex(function (x) { return x.docId === stop.DocId; })] ? _vm.days[_vm.days.findIndex(function (x) { return x.docId === stop.DocId; })].days : null,"dailyTrips":stop.DailyTrips ? stop.DailyTrips : [],"expanded":stop.expanded,"profile":stop.Profile},on:{"expansionChanged":function($event){return _vm.sharedMethods.expansionChanged(_vm.getContext, $event)}}}),(index !== _vm.stops.length - 1 && _vm.durations[_vm.durations.findIndex(function (x) { return x.docId === stop.DocId; })] && _vm.durations[_vm.durations.findIndex(function (x) { return x.docId === stop.DocId; })].duration !== null)?_c('Duration',{key:'Stop' + stop.DocId,attrs:{"duration":_vm.durations[_vm.durations.findIndex(function (x) { return x.docId === stop.DocId; })].duration + _vm.durations[_vm.durations.findIndex(function (x) { return x.docId === stop.DocId; })].distance,"defaultProfile":stop.Profile ? _vm.getStringProfile(stop.Profile) : _vm.inputProfile,"roundtripProfile":_vm.inputProfile}}):_vm._e()]})],2)],2),_c('a',{staticClass:"panel-links",on:{"click":function($event){return _vm.$refs.tabPanels.goTo('map')}}},[_vm._v("zur Karte")])],1),_c('q-tab-panel',{attrs:{"name":"map"}},[_c('Map',{attrs:{"profile":_vm.getProfile(_vm.inputProfile),"stops":_vm.stops,"childrenAges":_vm.childrenAges,"adults":parseInt(_vm.adults),"rooms":parseInt(_vm.rooms)}}),_c('br'),_c('a',{on:{"click":function($event){return _vm.$refs.tabPanels.goTo('overview')}}},[_vm._v("zur Routenübersicht")])],1),_c('q-tab-panel',{attrs:{"name":"ratings"}},[_c('h3',[_vm._v("Chat")]),_c('div',{staticClass:"q-pa-md row"},[_c('div',{staticStyle:{"width":"100%"}},[(_vm.messages.length === 0)?_c('div',[_c('span',{staticStyle:{"font-size":"18px"}},[_vm._v("Momentan sind leider keine Kommentare oder Bewertungen vorhanden."),_c('br'),_vm._v("\n              "+_vm._s(!_vm.isUserCreator ? (_vm.user ? 'Sei der Erste und schreibe jetzt eine Bewertung!' : 'Melde dich an um die erste Bewertung abzugeben.') : ''))])]):_vm._e(),_vm._l((_vm.messages),function(message){return [_c('q-chat-message',{key:message.id,staticStyle:{"font-size":"16px"},attrs:{"name":message.Name + (!message.UID || _vm.user.uid !== message.UID ? '' : ' (Autor)' ),"sent":!message.UID || _vm.user.uid !== message.UID,"name-sanitize":"","text-sanitize":"","text":[message.Message],"bg-color":"secondary","text-color":"white","stamp":_vm.getStringDateFromTimestamp(message.Date)},scopedSlots:_vm._u([{key:"avatar",fn:function(){return [(message.Avatar)?_c('img',{class:'q-message-avatar ' + (!message.UID || _vm.user.uid !== message.UID ? 'q-message-avatar--sent' : 'q-message-avatar--received' ),attrs:{"src":message.Avatar}}):_c('q-icon',{class:'q-message-avatar ' + (!message.UID || _vm.user.uid !== message.UID ? 'q-message-avatar--sent' : 'q-message-avatar--received' ),attrs:{"name":"account_circle","size":"50px"}})]},proxy:true}],null,true)},[(message.Rating)?_c('q-rating',{staticClass:"stars",attrs:{"readonly":"","size":"15px","color":"gold"},model:{value:(message.Rating),callback:function ($$v) {_vm.$set(message, "Rating", $$v)},expression:"message.Rating"}}):_vm._e()],1)]})],2),(_vm.user && !_vm.isUserCreator)?_c('div',{staticClass:"flex",staticStyle:{"margin-top":"30px"}},[_c('div',{staticClass:"flex direction-column"},[_c('q-input',{staticStyle:{"width":"300px","margin-right":"20px","font-size":"18px"},attrs:{"placeholder":"Deine Nachricht"},model:{value:(_vm.tempMessage),callback:function ($$v) {_vm.tempMessage=$$v},expression:"tempMessage"}}),_c('q-toggle',{staticStyle:{"font-size":"18px","margin-right":"10px"},attrs:{"label":"mit Bewertung"},model:{value:(_vm.ratingEnabled),callback:function ($$v) {_vm.ratingEnabled=$$v},expression:"ratingEnabled"}}),_c('q-rating',{directives:[{name:"show",rawName:"v-show",value:(_vm.ratingEnabled),expression:"ratingEnabled"}],staticClass:"stars",staticStyle:{"margin-right":"15px"},attrs:{"size":"15px","color":"gold"},model:{value:(_vm.tempCommentStars),callback:function ($$v) {_vm.tempCommentStars=$$v},expression:"tempCommentStars"}})],1),_c('q-btn',{on:{"click":_vm.sendComment}},[_vm._v("Absenden")])],1):_vm._e()])])],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/roundtripDetails.vue?vue&type=template&id=6893d8de&

// EXTERNAL MODULE: ./node_modules/quasar/src/utils/date.js
var date = __webpack_require__("bd4c");

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// EXTERNAL MODULE: ./node_modules/cwait/dist/umd/index.js
var umd = __webpack_require__("4ddc");

// EXTERNAL MODULE: ./src/sharedMethods.js
var sharedMethods = __webpack_require__("15c8");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/roundtripDetails.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
__webpack_require__.e(/* import() */ 21).then(__webpack_require__.t.bind(null, "07b3", 7));



const getAxios = () => __webpack_require__.e(/* import() */ 0).then(__webpack_require__.t.bind(null, "bc3a", 7));



let details = [];
let messages = []; // context of the vue app (set in mounted)

let roundtripDetailsvue_type_script_lang_js_context;
/* harmony default export */ var roundtripDetailsvue_type_script_lang_js_ = ({
  components: {
    Stop: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(28)]).then(__webpack_require__.bind(null, "ead2")),
    Map: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, "4f6c")),
    Duration: () => __webpack_require__.e(/* import() */ 31).then(__webpack_require__.bind(null, "0a4c"))
  },

  data() {
    return {
      dates: [],
      stops: [],
      roundtrip: [],
      slide: null,
      galeryImgUrls: [],
      tab: 'overview',
      durations: [],
      accessToken: 'pk.eyJ1IjoibWFyZWlza2kiLCJhIjoiY2pkaHBrd2ZnMDIyOTMzcDIyM2lra3M0eSJ9.wcM4BSKxfOmOzo67iW-nNg',
      days: [],
      copyRTDialog: false,
      copyRTTitle: null,
      inputProfile: null,
      childrenAges: [],
      adults: 0,
      rooms: 0,
      Profile: '',
      checkOutDate: null,
      pageTitle: 'User',
      prevRouteParams: null,
      disableEditBtn: false,
      allStopsExpanded: false,
      currentExpansionStates: [],
      firstLoad: true,
      stopsLoaded: false,
      creator: {},
      tripWebsite: null,
      messages: [],
      tempMessage: null,
      RTId: null,
      tempCommentStars: 3,
      ratingEnabled: true,
      isUserCreator: false
    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRouteParams = from.params;
    });
  },

  computed: {
    user() {
      return this.$store.getters['user/user'];
    },

    sharedMethods() {
      return sharedMethods["a" /* default */];
    },

    getContext() {
      return roundtripDetailsvue_type_script_lang_js_context;
    }

  },

  meta() {
    return {
      title: 'Reise ansehen',
      meta: {
        description: {
          name: 'description',
          content: 'Reise auf roundtrips4you ansehen, komplett kostenlos, online und unkompliziert. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...'
        }
      }
    };
  },

  methods: {
    loadSingleRoundtrip(RTId) {
      this.$store.dispatch('roundtrips/fetchSingleRoundtrip', RTId).then(roundtrip => {
        this.roundtrip = roundtrip;

        if ((!firebaseInit["a" /* auth */].user() || firebaseInit["a" /* auth */].user().uid !== roundtrip.UserId) && !roundtrip.Public) {
          sharedMethods["a" /* default */].showErrorNotification('Diese Reise wurde nicht veröffentlicht');
          this.$router.push('/rundreisen/' + roundtrip.Location[0]);
        } else {
          if (firebaseInit["a" /* auth */].user() && firebaseInit["a" /* auth */].user().uid === roundtrip.UserId) this.isUserCreator = true;
        }

        this.loadUserData(roundtrip.UserId);
        this.inputProfile = roundtrip.Profile; // set default values to ensure privacy

        this.childrenAges = [];
        this.rooms = 1;
        this.adults = 2;
        this.roundtrip = roundtrip;
        this.profile = this.getProfile(roundtrip.Profile);
        this.tripWebsite = roundtrip.tripWebsite;
        this.loadGaleryImgs();
        this.getUserRatings(RTId);
      }).catch(err => {
        console.log('Error getting Roundtrip', err);
      });
    },

    getDefaultCheckOutDate(stop) {
      let initDate = null;
      if (stop.InitDate.seconds) initDate = new Date(stop.InitDate.seconds * 1000);else initDate = sharedMethods["a" /* default */].getDateFromString(stop.InitDate); // add one day

      const defaultCheckOutDate = initDate;
      defaultCheckOutDate.setDate(initDate.getDate() + 1);
      return date["b" /* default */].formatDate(defaultCheckOutDate, 'DD.MM.YYYY');
    },

    getStringDateFromTimestamp(timestamp) {
      const initDate = new Date(timestamp.seconds * 1000);
      return date["b" /* default */].formatDate(initDate, 'DD.MM.YYYY HH:mm');
    },

    getUserRatings(RTId) {
      let roundtripsRef = firebaseInit["b" /* db */].collection('Comments').where('RTId', '==', RTId).orderBy('Date');
      roundtripsRef.get().then(snapshot => {
        messages = [];
        snapshot.forEach(doc => {
          let index = messages.push(doc.data()) - 1;
          messages[index].id = doc.id;
        });
        this.messages = messages;
      });
    },

    sendComment() {
      firebaseInit["b" /* db */].collection('Comments').add({
        Date: new Date(Date.now()),
        Message: this.tempMessage,
        Name: firebaseInit["a" /* auth */].user().displayName,
        Avatar: firebaseInit["a" /* auth */].user().photoURL,
        UID: firebaseInit["a" /* auth */].user().uid,
        RTId: this.RTId,
        Rating: this.ratingEnabled ? this.tempCommentStars : null
      }).then(results => {
        this.getUserRatings(this.RTId);
        this.tempMessage = null;
      });
    },

    loadUserData(UserId) {
      let context = this;
      let userRef = firebaseInit["b" /* db */].collection('User').where('UserUID', '==', UserId).limit(1);
      userRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          context.creator = doc.data();
        });
      });
    },

    loadRoundtripDetails(RTId, retrievedDate) {
      this.selectedCountry = this.country;
      this.visible = true;
      this.showSimulatedReturnData = false;
      let roundtripsRef = firebaseInit["b" /* db */].collection('RoundtripDetails').where('RTId', '==', RTId).orderBy('InitDate');
      roundtripsRef.get().then(snapshot => {
        details = [];
        snapshot.forEach(doc => {
          let index = details.push(doc.data()) - 1;
          details[index].DocId = doc.id;
        });
        this.stops = details;
        this.stops.sort(this.compare);
        let initDates = []; // get dates

        details.forEach((detail, index) => {
          const initDate = new Date(detail.InitDate.seconds * 1000);
          initDates.splice(index, 0, initDate);
          retrievedDate = new Date(retrievedDate);
          retrievedDate.setMinutes(initDate.getMinutes());
          retrievedDate.setHours(initDate.getHours());

          if (index > 0) {
            const date1 = initDates[index - 1];
            const date2 = initDates[index];
            const diffTime = new Date(date2 - date1).getTime();
            const addedTime = retrievedDate.setTime(retrievedDate.getTime() + diffTime);
            const addedDate = new Date(addedTime);
            addedDate.setMinutes(initDate.getMinutes());
            addedDate.setHours(initDate.getHours());
            const returnDate = date["b" /* default */].formatDate(addedDate, 'DD.MM.YYYY HH:mm');
            this.dates.splice(index, 0, returnDate);
          } else {
            this.dates.splice(index, 0, date["b" /* default */].formatDate(retrievedDate, 'DD.MM.YYYY HH:mm'));
          }

          if (details.indexOf(stop) === details.length - 1) {
            // add one day
            const defaultCheckOutDate = new Date();
            defaultCheckOutDate.setDate(initDate.getDate() + 1);
            this.checkOutDate = date["b" /* default */].formatDate(defaultCheckOutDate, 'DD.MM.YYYY');
          }
        });
        this.stops = details;
        let tempUrls = [];
        let tempUrlDocObjects = [];
        getAxios().then(axios => {
          this.stops.forEach((stop, index) => {
            if (index >= 1) {
              let url = this.getDurationUrl([this.stops[index - 1].Location.lng, this.stops[index - 1].Location.lat], [stop.Location.lng, stop.Location.lat], index !== this.stops.length ? this.stops[index - 1].DocId : this.stops[index].DocId, index !== this.stops.length ? this.stops[index - 1].Profile : this.stops[index].Profile, index !== this.stops.length ? this.stops[index - 1] : this.stops[index], index !== this.stops.length ? index - 1 : index);

              if (url) {
                tempUrls.push(url);
                tempUrlDocObjects.push({
                  id: this.stops[index - 1].DocId,
                  url: url
                });
              }
            } // if its the last stop


            if (index === this.stops.length - 1) {
              this.stopsLoaded = true; // get durations

              const urls = tempUrls;
              const queue = new umd["TaskQueue"](Promise, 5);
              Promise.all(urls.map(queue.wrap(async url => axios.get(url)))).then(results => {
                results.forEach((result, resultIndex) => {
                  const docId = tempUrlDocObjects[tempUrlDocObjects.findIndex(x => x.url === result.config.url)].id;
                  this.writeDuration(result.data.routes[0], docId);
                });
              }).catch(function (error) {
                console.log(error);
              });
            }
          });
        }); // this.stops.forEach((stop, index) => {
        //   if (index >= 1) this.getDuration([this.stops[index - 1].Location.lng, this.stops[index - 1].Location.lat], [stop.Location.lng, stop.Location.lat], this.stops[index - 1].Title, this.stops[index - 1], index - 1, this.stops[index - 1].Profile)
        // })

        let context = this;
        setTimeout(function () {
          context.stops.forEach(stop => {
            if (context.firstLoad || !context.currentExpansionStates) {
              if (context.$refs[stop.DocId]) context.$refs[stop.DocId][0].changeExpansion(false);
              context.currentExpansionStates.push({
                docId: stop.DocId,
                expanded: false
              });
            } else {
              if (context.currentExpansionStates[context.currentExpansionStates.findIndex(x => x.docId === stop.DocId)]) {
                context.$refs[stop.DocId][0].changeExpansion(context.currentExpansionStates[context.currentExpansionStates.findIndex(x => x.docId === stop.DocId)].expanded);
              } else {
                // this stop was not already added
                context.$refs[stop.DocId][0].changeExpansion(false);
              }
            }
          });
          this.firstLoad = false;
        }, 500);
      }).catch(err => {
        console.log('Error getting Roundtripdetails', err);
      });
    },

    /**
     * copies the current trip and adds it to current user
     */
    copyRoundtrip() {
      if (!this.isUserCreator) {
        const originalRT = this.roundtrip;
        const UserId = firebaseInit["a" /* auth */].user().uid;
        const newTitle = this.copyRTTitle;
        sharedMethods["a" /* default */].isUniqueTitle(newTitle).then(uniqueTitle => {
          if (newTitle === null || newTitle === '' || uniqueTitle === 'Dieser Titel ist bereits vergeben') {
            sharedMethods["a" /* default */].showErrorNotification('Bitte überprüfe den Titel deiner Reise');
            return false;
          } else {
            sharedMethods["a" /* default */].showSuccessNotification('Rundreise wird zum kopiert...');
          }

          let timeStamp = Date.now(); // create a temporary random id for rtid

          let tempRTId = Math.floor(Math.random() * 10000000000000);
          let newRoundtrip = {};
          let originalRTId = originalRT.RTId; // copy all values

          newRoundtrip = originalRT; // change all different values here

          newRoundtrip.RTId = tempRTId;
          newRoundtrip.UserId = UserId;
          newRoundtrip.Public = false;
          newRoundtrip.Title = newTitle;
          newRoundtrip.createdAt = new Date(timeStamp); // create new document with original rt data

          firebaseInit["b" /* db */].collection('Roundtrips').add(newRoundtrip).then(result => {
            console.log(originalRTId);
            const newRTId = result.id; // remove temp RTId and update it with doc id

            firebaseInit["b" /* db */].collection('Roundtrips').doc(newRTId).update({
              'RTId': newRTId
            }).catch(ex => {
              console.log(ex);
            }); // get roundtrip details and update with original rt data

            let roundtripDetailsRef = firebaseInit["b" /* db */].collection('RoundtripDetails').where('RTId', '==', originalRTId);
            roundtripDetailsRef.get().then(detailsSnapshot => {
              detailsSnapshot.forEach(detailDoc => {
                let docData = detailDoc.data(); // copy all original values

                let newRoundtripDetails = docData; // change different values here

                newRoundtripDetails.RTId = newRTId;
                firebaseInit["b" /* db */].collection('RoundtripDetails').add(newRoundtripDetails).then(() => {
                  // -- everything succeeded --
                  // add new copy entry to user
                  let userRef = firebaseInit["b" /* db */].collection('User').where('UserUID', '==', UserId).limit(1);
                  userRef.get().then(snapshot => {
                    snapshot.forEach(doc => {
                      let userRTEdited = doc.data().RTEdited;
                      firebaseInit["b" /* db */].collection('User').doc(UserId).update({
                        'RTEdited': userRTEdited + 1
                      });
                    });
                  }).catch(ex => {
                    console.log(ex);
                  }); // refresh page

                  this.$router.push('/rundreise-ansehen/' + newRTId);
                  this.isUserCreator = true;
                }).catch(ex => {
                  console.log(ex);
                });
              });
            });
          }).catch(ex => {
            console.log(ex);
          });
        });
      }
    },

    /**
    * sorts trip stops after their init dates (must be placed in sort())
    */
    compare(a, b) {
      const initDateA = typeof a.InitDate === 'string' ? sharedMethods["a" /* default */].getDateFromString(a.InitDate) : new Date(a.InitDate.seconds * 1000);
      const initDateB = typeof b.InitDate === 'string' ? sharedMethods["a" /* default */].getDateFromString(b.InitDate) : new Date(b.InitDate.seconds * 1000);
      if (initDateA > initDateB) return 1;
      if (initDateB > initDateA) return -1;
      return 0;
    },

    checkDisableEditBtn(val) {
      sharedMethods["a" /* default */].isUniqueTitle(val).then(uniqueTitle => {
        if (uniqueTitle === 'Dieser Titel ist bereits vergeben') uniqueTitle = false;
        this.disableEditBtn = val === null || val === '' || !uniqueTitle;
      });
    },

    getDurationUrl(startLocation, endLocation, docId, stopProfile, stop, index) {
      let profile = this.profile;
      if (stopProfile !== null && typeof stopProfile !== 'undefined' && stopProfile.length > 0) profile = stopProfile;

      if (profile !== 'plane') {
        return 'https://api.mapbox.com/directions/v5/mapbox/' + profile + '/' + startLocation[0] + ',' + startLocation[1] + ';' + endLocation[0] + ',' + endLocation[1] + '?geometries=geojson&access_token=' + this.accessToken;
      } else {
        return null;
      }
    },

    writeDuration(result, docId) {
      if (result !== null && typeof result !== 'undefined') {
        let duration = sharedMethods["a" /* default */].msToTime(result.duration * 1000);
        let distance = Math.floor(result.distance / 1000) > 0 ? Math.floor(result.distance / 1000) : '';

        if (distance !== '') {
          this.tripDistance = this.tripDistance + distance;
          distance = ' (' + distance + 'km)';
        }

        this.durations.splice(this.stops.findIndex(x => x.DocId === docId), 0, {
          duration: duration,
          durationInMs: result.duration * 1000,
          distance: distance,
          docId: docId
        });
        this.getDays(this.stops[this.stops.findIndex(x => x.DocId === docId)], result.duration * 1000);
      } else {
        this.durations.splice(this.stops.findIndex(x => x.DocId === docId), 0, {
          duration: null,
          distance: null,
          docId: docId
        });
        if (this.stops.indexOf(stop) === this.stops.length - 2) this.stopsLoaded = true;
      }
    },

    getProfile(profile) {
      switch (profile) {
        case 'zu Fuß':
          return 'walking';

        case 'Fahrrad':
          return 'cycling';

        case 'Flugzeug':
          return 'plane';

        default:
          return 'driving';
      }
    },

    getStringProfile(profile) {
      switch (profile) {
        case 'walking':
          return 'zu Fuß';

        case 'cycling':
          return 'Fahrrad';

        case 'plane':
          return 'Flugzeug';

        default:
          return 'Auto';
      }
    },

    getDays(stop, duration) {
      let days = null;

      if (this.stops.indexOf(stop) < this.stops.length - 1) {
        let formattedDate = stop.InitDate;

        if (typeof stop.InitDate !== 'string') {
          formattedDate = date["b" /* default */].formatDate(new Date(stop.InitDate.seconds * 1000), 'DD.MM.YYYY HH:mm');
        }

        let dateTimeParts = formattedDate.split(' ');
        let dateParts = dateTimeParts[0].split('.');
        let timeParts = dateTimeParts[1].split(':');
        let currentInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00');

        if (typeof stop.InitDate !== 'string') {
          formattedDate = date["b" /* default */].formatDate(new Date(this.stops[this.stops.indexOf(stop) + 1].InitDate.seconds * 1000), 'DD.MM.YYYY HH:mm');
        } else {
          formattedDate = this.stops[this.stops.indexOf(stop) + 1].InitDate;
        }

        dateTimeParts = formattedDate.split(' ');
        dateParts = dateTimeParts[0].split('.');
        timeParts = dateTimeParts[1].split(':');
        let nextInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00');
        let dateDistance = nextInitDate.getTime() - currentInitDate.getTime() - duration;
        days = sharedMethods["a" /* default */].msToTime(dateDistance);
      }

      this.days.splice(this.stops.findIndex(x => x.DocId === stop.docId), 0, {
        days: days,
        docId: stop.DocId
      });
      if (this.stops.indexOf(stop) === this.stops.length - 2) this.stopsLoaded = true;
    },

    loadGaleryImgs() {
      const context = this;
      let fileRef = firebaseInit["c" /* storage */].ref().child('Images/Roundtrips/' + context.roundtrip.docId + '/Galery');
      fileRef.listAll().then(function (res) {
        res.items.forEach(function (itemRef) {
          fileRef = firebaseInit["c" /* storage */].ref().child(itemRef.fullPath);
          context.galeryImgUrls = [];
          fileRef.getDownloadURL().then(function (url) {
            context.galeryImgUrls.push(url);
            if (context.galeryImgUrls.length === 1) context.slide = url;
          });
        });
      }).catch(function (error) {
        console.log(error);
      });
    }

  },

  mounted() {
    roundtripDetailsvue_type_script_lang_js_context = this;
  },

  created() {
    const params = this.$route.params.id;
    let RTId = params;
    let userDate = null;

    if (params.includes('&')) {
      RTId = params.split('&')[0];
      userDate = params.split('&')[1];
    }

    this.RTId = RTId;
    this.loadSingleRoundtrip(RTId);
    this.loadRoundtripDetails(RTId, parseInt(userDate));
  }

});
// CONCATENATED MODULE: ./src/pages/roundtripDetails.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_roundtripDetailsvue_type_script_lang_js_ = (roundtripDetailsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/roundtripDetails.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_roundtripDetailsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var roundtripDetails = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "b601":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/RoundtripOverview.vue?vue&type=template&id=9437760c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-page',[_c('div',{staticClass:"roundtrips"},[_c('div',{staticClass:"overview-topic"},[_c('h1',[_vm._v("Eigene Reise erstellen")]),_c('span',[_vm._v("Beginne damit deine eigene Reise nach deinen Wünschen zusammenzutellen")])]),_c('div',{attrs:{"id":"CardBackgroundImg"}}),_c('div',{staticStyle:{"height":"515px","min-height":"unset"},attrs:{"id":"CardBackgroundImgPlaceholder"}},[_c('div',{staticClass:"country-card-container"},[_c('router-link',{staticClass:"country-card",style:({ backgroundImage: 'url(https://roundtrips4you.de/statics/oldCard.jpg)' }),attrs:{"to":"/meine-rundreisen/"}},[_c('h2',{staticClass:"country-title"},[_vm._v("Meine Reisen")]),_c('div',{staticClass:"button"},[_vm._v("Zu meinen Reisen\n          ")])])],1)]),_c('div',{staticClass:"overview-topic"},[_c('h2',[_vm._v("Vorgefertigte Reisen")]),_c('span',[_vm._v("Lasse dich hier von den Reisen anderer User inspirieren, oder bearbeite diese wenn du für dich etwas ändern möchtest")])]),_c('div',{attrs:{"id":"CardBackgroundImg"}}),_c('div',{attrs:{"id":"CardBackgroundImgPlaceholder"}},_vm._l((_vm.countries),function(country){return _c('div',{key:country.Name,staticClass:"country-card-container"},[_c('router-link',{staticClass:"country-card",style:({ backgroundImage: 'url('+ country.ImageUrl +')' }),attrs:{"to":'/rundreisen/' + country.Name}},[_c('h2',{staticClass:"country-title"},[_vm._v(_vm._s(country.Name))]),_c('div',{staticClass:"button",attrs:{"to":'/rundreisen/' + country.Name}},[_vm._v("Zu den Rundreisen\n          ")])])],1)}),0)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/RoundtripOverview.vue?vue&type=template&id=9437760c&

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/RoundtripOverview.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
__webpack_require__.e(/* import() */ 4).then(__webpack_require__.t.bind(null, "7225", 7));

/* harmony default export */ var RoundtripOverviewvue_type_script_lang_js_ = ({
  meta: {
    title: 'Rundreisen',
    meta: {
      description: {
        name: 'description',
        content: 'Länder auf roundtrips4you ansehen, komplett kostenlos, online und unkompliziert. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...'
      }
    }
  },

  data() {
    return {
      countries: []
    };
  },

  name: 'RoundtripOverview',
  methods: {
    loadCountries() {
      let countriesRef = firebaseInit["b" /* db */].collection('Countries').orderBy('Name').limit(200);
      countriesRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.countries.push(doc.data());
        });
      });
    }

  },

  created() {
    this.loadCountries();
  }

});
// CONCATENATED MODULE: ./src/pages/RoundtripOverview.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_RoundtripOverviewvue_type_script_lang_js_ = (RoundtripOverviewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/RoundtripOverview.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_RoundtripOverviewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var RoundtripOverview = __webpack_exports__["default"] = (component.exports);

/***/ })

},0,[21,4]]);
//# sourceMappingURL=roundtrips.js.map