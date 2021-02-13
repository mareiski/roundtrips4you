(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[36],{

/***/ "56b4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Register.vue?vue&type=template&id=d15543ae&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"register q-px-lg q-pb-md"},[_c('h1',[_vm._v("Registrieren")]),_c('p',{staticStyle:{"text-align":"center","font-size":"20px","padding-bottom":"10px"}},[_vm._v(_vm._s(!_vm.isInDemoSession ? 'Starte jetzt durch und nutze all unsere Funktionen komplett kostenlos' : 'Registriere dich jetzt um deine erstellte Rundreise zu speichern'))]),_c('q-form',{staticClass:"q-gutter-md rounded-borders flex column",staticStyle:{"align-items":"center"},attrs:{"bordered":"","method":"post","target":"_blank"},on:{"submit":_vm.signUp}},[_c('q-input',{attrs:{"outlined":"","type":"email","rules":[function (val) { return val !== null && val !== '' || 'Bitte gib eine Email an'; }, function (val) { return _vm.reg.test(val) || 'Bitte gib eine richtige Email an'; }],"label":"Email","lazy-rules":"","name":"EMAIL"},model:{value:(_vm.userEmail),callback:function ($$v) {_vm.userEmail=$$v},expression:"userEmail"}}),_c('q-input',{attrs:{"outlined":"","type":_vm.isPwd ? 'password' : 'text',"label":"neues Passwort","lazy-rules":"","rules":[function (val) { return val !== null && val !== '' || 'Bitte gib dein neues Passwort ein'; }]},scopedSlots:_vm._u([{key:"append",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":_vm.isPwd ? 'visibility_off' : 'visibility'},on:{"click":function($event){_vm.isPwd = !_vm.isPwd}}})]},proxy:true}]),model:{value:(_vm.password),callback:function ($$v) {_vm.password=$$v},expression:"password"}}),_c('q-input',{attrs:{"outlined":"","type":_vm.isPwdRepeat ? 'password' : 'text',"label":"neues Passwort wiederholen","lazy-rules":"","rules":[function (val) { return val !== null && val !== '' || 'Bitte wiederhole dein Passwort'; },
         function (val) { return val === _vm.password || 'Die beiden Passwörter stimmen nicht überein'; }]},scopedSlots:_vm._u([{key:"append",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":_vm.isPwdRepeat ? 'visibility_off' : 'visibility'},on:{"click":function($event){_vm.isPwdRepeat = !_vm.isPwdRepeat}}})]},proxy:true}]),model:{value:(_vm.passwordRepeat),callback:function ($$v) {_vm.passwordRepeat=$$v},expression:"passwordRepeat"}}),_c('div',{staticStyle:{"padding":"10px"}},[_c('q-btn',{staticClass:"q-mt-md",staticStyle:{"width":"300px"},attrs:{"type":"submit","loading":_vm.submitting,"label":"Registrieren","color":"primary","text-color":"white"},scopedSlots:_vm._u([{key:"loading",fn:function(){return [_c('q-spinner')]},proxy:true}])})],1)],1),_c('div',{staticClass:"google-form"},[_c('span',{staticStyle:{"text-align":"center"}},[_vm._v("oder")]),_c('br'),_c('q-btn',{staticClass:"q-mt-md google-btn",staticStyle:{"width":"300px"},attrs:{"loading":_vm.googleLoading,"label":"google konto verwenden","icon":"fab fa-google"},on:{"click":_vm.signUpWithGoogle},scopedSlots:_vm._u([{key:"loading",fn:function(){return [_c('q-spinner')]},proxy:true}])})],1),_c('p',{staticStyle:{"text-align":"center"}},[_vm._v("Mit der Registrierung stimmst du zu das wir dir Emails an deine angegebene Adresse senden dürfen.")]),_c('br'),_c('div',{staticClass:"legal-container"},[_c('q-list',{attrs:{"bordered":""}},[_c('q-expansion-item',{attrs:{"label":" Warum muss man sich bei Roundtrips4you registrieren?"}},[_c('q-card',[_c('q-card-section',[_c('p',[_vm._v("Bei uns musst du dich nur Registrieren, damit wir deine Reisen auch dir zuordnen können.")]),_c('p',[_vm._v("Leider geht dies nur wenn du einen Account hast der eindeutig zu dir gehört (deshalb brauchen wir deine Email Adresse).")]),_c('p',[_vm._v("Nach der Registrierung musst du allerdings gar keine weiteren Daten angeben, wenn du das nicht möchtest.")]),_c('p',[_vm._v("Natürlich kannst du uns auch jederzeit unter "),_c('a',{attrs:{"href":"mailto:hello@roundtrips4you.de"}},[_vm._v("hello@roundtrips4you.de")]),_vm._v(" Fragen zum Datenschutz stellen oder einfach in der Datenschutzerklärung nachlesen.")])])],1)],1)],1)],1),_c('br'),_c('div',{staticStyle:{"font-size":"18px","text-align":"center"}},[_vm._v("Du hast bereits einen Account? "),_c('router-link',{attrs:{"to":"/login"}},[_vm._v("Jetzt Anmelden")])],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Register.vue?vue&type=template&id=d15543ae&

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// EXTERNAL MODULE: ./src/sharedMethods.js
var sharedMethods = __webpack_require__("15c8");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Register.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
__webpack_require__.e(/* import() */ 3).then(__webpack_require__.t.bind(null, "6ce9", 7));


const getFirebase = () => Promise.resolve(/* import() */).then(__webpack_require__.t.bind(null, "8aa5", 7));


let timeStamp = Date.now();
var actionCodeSettings = {
  url: 'https://roundtrips4you.de/login',
  // This must be true.
  handleCodeInApp: true
};
/* harmony default export */ var Registervue_type_script_lang_js_ = ({
  meta: {
    title: 'Registrieren',
    meta: {
      description: {
        name: 'description',
        content: 'Registriere dich jetzt kostenlos bei roundtrips4you und erstelle selbst deine eigenen Reisen. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag...'
      }
    }
  },
  name: 'Register',

  data() {
    return {
      userEmail: '',
      password: '',
      passwordRepeat: '',
      isPwd: true,
      isPwdRepeat: true,
      submitting: false,
      googleLoading: false,
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },

  computed: {
    isInDemoSession() {
      return this.$store.getters['demoSession/isInDemoSession'];
    }

  },
  methods: {
    signUp(evt) {
      let context = this;
      let mail = this.userEmail;
      firebaseInit["a" /* auth */].authRef().createUserWithEmailAndPassword(mail, this.password).then(user => {
        context.createUserEntry(user);
        sharedMethods["a" /* default */].showSuccessNotification('Juhuuu dein Konto wurde erfolgreich erstellt');

        if (context.isInDemoSession) {
          context.$store.dispatch('demoSession/saveRoundtrip', user.user.uid).then(newRTId => {
            evt.target.submit();
            context.$router.replace('rundreise-ansehen/' + newRTId);
          });
        } else {
          evt.target.submit();
          context.$router.replace('meine-rundreisen');
        }
      }, err => {
        console.log(err);
        sharedMethods["a" /* default */].showErrorNotification('Oh nein, du konntest leider nicht registriert werden, schreibe uns bitte ein email');
      });
    },

    signUpWithGoogle() {
      getFirebase().then(firebase => {
        var provider = new firebase.auth.GoogleAuthProvider();
        let context = this;
        firebaseInit["a" /* auth */].authRef().signInWithPopup(provider).then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          const credential = firebase.auth.GoogleAuthProvider().credential(token);
          context.createUserEntry(result.user); // Sign in with credential from the Google user.

          firebaseInit["a" /* auth */].signInWithCredential(credential).then(function () {
            context.$router.replace('meine-rundreisen');
          }).catch(function (error) {
            console.log(error);
          });
        }).catch(function (error) {
          console.log(error);
        });
      });
    },

    verifyMail(user) {
      if (!user.emailVerified) {
        user.sendEmailVerification(actionCodeSettings).then(function () {
          sharedMethods["a" /* default */].showSuccessNotification('Wir haben dir eine Bestätigungsmail für deine Email gesendet');
        }).catch(function (error) {
          console.log(error);
          sharedMethods["a" /* default */].showErrorNotification('Oh nein, wir konnten dir leider keine email senden, bitte kontaktiere uns unter hello@roundtrips4you.de');
        });
      }
    },

    createUserEntry(user) {
      firebaseInit["b" /* db */].collection('User').add({
        Reputation: 0,
        UserImage: user.user.photoURL,
        UserName: user.user.displayName,
        UserUID: user.user.uid,
        createdAt: new Date(timeStamp)
      });
      this.verifyMail(user.user);
    }

  }
});
// CONCATENATED MODULE: ./src/pages/Register.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Registervue_type_script_lang_js_ = (Registervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/Register.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_Registervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Register = __webpack_exports__["default"] = (component.exports);

/***/ })

},0,[3]]);
//# sourceMappingURL=36.js.map