(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "8b24":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Index.vue?vue&type=template&id=1ecc8a11&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-page',{staticStyle:{"overflow":"hidden"}},[_c('div',{staticClass:"home q-px-xl q-pb-xl"},[_c('div',{attrs:{"id":"MainImg"}}),_c('div',{attrs:{"id":"MainImgOverlay"}}),_c('div',{attrs:{"id":"MainImgPlacholder"}},[_c('h2',{staticClass:"main-qoute"},[_vm._v("Damit deine Reise perfekt geplant und trotzdem individuell bleibt")]),_c('span',{staticClass:"quote-subtext"},[_vm._v("\n        Mit dem kostenlosen Reiseplaner Roundtrips4you kannst du deine eigene Reise selbst zusammenstellen\n      ")]),_c('div',{staticClass:"flex justify-around",attrs:{"id":"OfferContainer"}},[_c('div',[_c('p',[_vm._v("Plane deine Reise jetzt kostenlos und ohne Registrierung")]),_c('q-btn',{attrs:{"color":"primary"},on:{"click":function($event){return _vm.sharedMethods.scrollToRef(_vm.$refs['registerContainer'])}}},[_vm._v("Los geht's")])],1)]),_c('q-icon',{staticClass:"scroll-down-icon cursor-pointer",attrs:{"name":"keyboard_arrow_down"},on:{"click":function($event){return _vm.sharedMethods.scrollToRef(_vm.$refs['sndSection'])}}})],1),_c('div',{ref:"sndSection",staticClass:"box-seperator"},[_c('h1',[_vm._v("Plane deine eigene Reise kostenlos & perfekt auf dich zugeschnitten")])]),_c('div',{staticClass:"box-seperator-placholder"}),_c('div',{staticClass:"card-container"},[_c('div',{directives:[{name:"in-viewport",rawName:"v-in-viewport.once",modifiers:{"once":true}}],staticClass:"card-wrap left"},[_c('div',{staticClass:"card cursor-pointer",on:{"click":function($event){return _vm.createDemoRTClicked()}}},[_c('q-icon',{attrs:{"name":"fas fa-lightbulb"}}),_c('h3',[_vm._v("Inspiration")]),_c('span',[_vm._v("Wir zeigen dir die besten Orte in deinem gewählten Reiseland. Zusätzlich kannst du dich von unserem Blog und vorgefertigten Reisen inspirieren lassen.")])],1)]),_c('div',{directives:[{name:"in-viewport",rawName:"v-in-viewport.once",modifiers:{"once":true}}],staticClass:"card-wrap"},[_c('div',{staticClass:"card cursor-pointer",on:{"click":_vm.createDemoRTClicked}},[_c('q-icon',{attrs:{"name":"explore"}}),_c('h3',[_vm._v("Individualität")]),_c('span',[_vm._v("Du planst deine Reise genau so wie du sie haben möchtest und bestimmst wann und wie du an einem bestimmten Ort sein möchtest.")])],1)]),_c('div',{directives:[{name:"in-viewport",rawName:"v-in-viewport.once",modifiers:{"once":true}}],staticClass:"card-wrap right"},[_c('div',{staticClass:"card cursor-pointer",on:{"click":function($event){return _vm.createDemoRTClicked()}}},[_c('q-icon',{attrs:{"name":"edit"}}),_c('h3',[_vm._v("Einfache Nutzung")]),_c('span',[_vm._v("Bei uns kannst du ganz schnell und kinderleicht deine eigene Reise zusammenstellen, genau wie eine Katalogreise nur individueller.")])],1)])]),_c('div',{ref:"registerContainer",staticClass:"register-container"},[_c('h4',{staticStyle:{"text-align":"center"}},[_vm._v("Beginne kostenlos und ohne Anmeldung mit der Planung deiner eigenen Reise")]),_c('q-btn',{staticStyle:{"font-size":"18px"},attrs:{"color":"primary"},on:{"click":function($event){return _vm.createDemoRTClicked()}}},[_vm._v("Reise selbst Planen")])],1),_c('h4',{staticStyle:{"text-align":"center","padding-top":"30px"}},[_vm._v("In diesen Schritten planst du deine Reise in kürzester Zeit")]),_c('q-timeline',{attrs:{"color":"secondary","id":"HomeTimeLine"}},[_c('q-timeline-entry',{attrs:{"title":"An-/Abreise","side":"left","icon":"commute"}},[_c('div',[_c('p',[_vm._v("Wir bieten dir die Möglichkeit, mit deinen Daten bei verschiedenen Fluganbietern einen Flug bzw. ein Hotel zu suchen.")]),_c('p',[_vm._v("Du musst dafür nur einmal deine Präferenzen eingeben und kannst dir dafür die Angebote der verschieden Anbieter ansehen.")]),_c('p',[_vm._v("Anschließend kannst du deinen Flug direkt auf der Seite des Anbieters buchen.")])])]),_c('q-timeline-entry',{attrs:{"title":"Reiseziele wählen","side":"right","icon":"add"}},[_c('div',[_c('p',[_vm._v("Mit dem Klick auf eine Stadt auf der Karte kannst du diese sofort hinzufügen")]),_c('p',[_vm._v("Außerdem werden dir automatisch die beliebtesten Städte vorgeschlagen, solltest du ein wenig inspiration brauchen.")]),_c('p',[_vm._v("Zu jeder Stadt werden dir Bilder und die besten Sehenswürdigkeiten angezeigt, damit du alles auf einen Blick vergleichen kannst.")])])]),_c('q-timeline-entry',{attrs:{"title":"Details eingeben","side":"left","icon":"create"}},[_c('div',[_c('p',[_vm._v("Wenn du einen Stopp hinzufügst kannst du ganz individuell alles rund um das Ziel anpassen.")]),_c('p',[_vm._v("Natürlich kannst du hier auch ein Hotel hinzufügen, welches du bei den bekanntesten Anbietern buchen kannst.")]),_c('p',[_vm._v("Die Daten für die Hotelsuche musst du nur einmal eingeben, so sparst du dir eine Menge Zeit!")])])]),_c('q-timeline-entry',{attrs:{"title":"Reiseübersicht","side":"right","icon":"format_list_bulleted"}},[_c('div',[_c('p',[_vm._v("Am Schluss deiner Reiseplanung erhältst du eine übersichtliche Zusammenfassung deiner Reise mit all deinen Stopps und Routen.")]),_c('p',[_vm._v("Du kannst dir auch automatisch die kürzeste Route errechnen lassen.")]),_c('p',[_vm._v("Wenn du möchtest kannst du auch deine Reise auf Roundtrips4you veröffentlichen um sie der ganzen Welt zu zeigen.")])])])],1),_c('div',{staticClass:"section-img"}),_c('div',{staticClass:"section-img-placeholder"},[_c('h3',[_vm._v("Plane jetzt gleich und ohne Anmeldung mit der deine ganz eigenen Reise")]),_c('q-btn',{directives:[{name:"in-viewport",rawName:"v-in-viewport.once",modifiers:{"once":true}}],staticStyle:{"font-size":"20px"},attrs:{"color":"primary"},on:{"click":function($event){return _vm.createDemoRTClicked()}}},[_vm._v("Reise erstellen")])],1),_c('p',{staticStyle:{"text-align":"center","font-size":"20px","padding-top":"40px"}},[_vm._v("Möchtest du erstmal ein paar Beispiele sehen?"),_c('br'),_vm._v(" Wähle ein Land und sehe dir von anderen Usern mit unserem Reiseplaner kostenlos und online erstellte Rundreisen an")]),_c('div',{staticClass:"card-container"},[_c('div',{directives:[{name:"in-viewport",rawName:"v-in-viewport.once",modifiers:{"once":true}}],staticClass:"card-wrap left"},[_c('router-link',{staticClass:"card",attrs:{"to":"/rundreisen/Portugal","itemtype":"http://schema.org/Offer"}},[_c('div',{attrs:{"id":"PortugalImg"}}),_c('h3',[_vm._v("Portugal")]),_c('span',[_vm._v("Erlebe einzigartige Landschaften und fazinierende Städte")])])],1),_c('div',{directives:[{name:"in-viewport",rawName:"v-in-viewport.once",modifiers:{"once":true}}],staticClass:"card-wrap"},[_c('router-link',{staticClass:"card",attrs:{"to":"/rundreisen/Indonesien","itemtype":"http://schema.org/Offer"}},[_c('div',{attrs:{"id":"BaliImg"}}),_c('h3',[_vm._v("Indonesien")]),_c('span',[_vm._v("Erlebe das Land der Tempel und Reisfelder")])])],1),_c('div',{directives:[{name:"in-viewport",rawName:"v-in-viewport.once",modifiers:{"once":true}}],staticClass:"card-wrap right"},[_c('router-link',{staticClass:"card",attrs:{"to":"/rundreisen/Italien","itemtype":"http://schema.org/Offer"}},[_c('div',{attrs:{"id":"ItalyImg"}}),_c('h3',[_vm._v("Italien")]),_c('span',[_vm._v("Erlebe mediteranen Flair in antiken Städten")])])],1)])],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Index.vue?vue&type=template&id=1ecc8a11&

// EXTERNAL MODULE: ./node_modules/quasar/src/utils/scroll.js
var utils_scroll = __webpack_require__("0831");

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// EXTERNAL MODULE: ./src/sharedMethods.js
var sharedMethods = __webpack_require__("15c8");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
__webpack_require__.e(/* import() */ 22).then(__webpack_require__.t.bind(null, "02fc", 7));

const {
  getScrollTarget,
  setScrollPosition
} = utils_scroll["a" /* default */];


/* harmony default export */ var Indexvue_type_script_lang_js_ = ({
  meta: {
    title: 'Reiseplaner',
    meta: {
      description: {
        name: 'description',
        content: 'Reise selbst planen & zusammenstellen, Reise planen kostenlos & online. Routenplaner und Reiseplaner mit vielen Tools für deinen Roadtrip'
      }
    }
  },
  name: 'PageIndex',

  data() {
    return {
      date: '2019/02/01',
      searchLocation: '',
      imgLoaded: false,
      title: 'Meine Reise'
    };
  },

  computed: {
    sharedMethods() {
      return sharedMethods["a" /* default */];
    }

  },
  methods: {
    scrollTo(refName) {
      var el = this.$refs[refName];
      const target = getScrollTarget(el);
      const offset = el.offsetTop;
      const duration = 400;
      setScrollPosition(target, offset, duration);
    },

    createDemoRTClicked() {
      if (!firebaseInit["a" /* auth */].user()) this.$store.commit('demoSession/setAsDemoSession');
      this.$router.push('/rundreisen-wizard');
    },

    createTempRTClicked() {
      if (this.$store.getters['demoSession/isInDemoSession']) {
        this.$router.push('/rundreisen-wizard/');
      }
    }

  }
});
// CONCATENATED MODULE: ./src/pages/Index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Indexvue_type_script_lang_js_ = (Indexvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/Index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_Indexvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Index = __webpack_exports__["default"] = (component.exports);

/***/ })

},0,[22]]);
//# sourceMappingURL=32.js.map