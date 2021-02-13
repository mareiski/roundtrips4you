(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "013f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Login.vue?vue&type=template&id=5c1f6aa3&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"login q-px-lg q-pb-md"},[_c('h1',[_vm._v("Anmelden")]),_c('p',{staticStyle:{"text-align":"center","font-size":"20px","padding-bottom":"10px"}},[_vm._v("Willkommen zurück, logge dich ein um zu deinen Reisen zu kommen")]),_c('q-form',{staticClass:"q-gutter-md rounded-borders flex column",staticStyle:{"align-items":"center"},attrs:{"bordered":""},on:{"submit":_vm.onUserLogin}},[_c('q-input',{attrs:{"outlined":"","type":"email","lazy-rules":"","rules":[function (val) { return val !== null && val !== '' || 'Bitte gib eine Email an'; }, function (val) { return _vm.reg.test(val) || 'Bitte gib eine richtige Email an'; }],"label":"Email"},model:{value:(_vm.userEmail),callback:function ($$v) {_vm.userEmail=$$v},expression:"userEmail"}}),_c('q-input',{attrs:{"outlined":"","type":_vm.isPwd ? 'password' : 'text',"label":"Passwort","rules":[function (val) { return val !== null && val !== '' || 'Bitte gib dein Passwort ein'; }]},scopedSlots:_vm._u([{key:"append",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":_vm.isPwd ? 'visibility_off' : 'visibility'},on:{"click":function($event){_vm.isPwd = !_vm.isPwd}}})]},proxy:true}]),model:{value:(_vm.password),callback:function ($$v) {_vm.password=$$v},expression:"password"}}),_c('div',{staticStyle:{"padding":"10px"}},[_c('q-btn',{staticClass:"q-mt-md",staticStyle:{"width":"300px"},attrs:{"type":"submit","loading":_vm.submitting,"label":"Login","color":"primary","text-color":"white"},scopedSlots:_vm._u([{key:"loading",fn:function(){return [_c('q-spinner')]},proxy:true}])})],1)],1),_c('div',{staticClass:"flex justify-center"},[_c('q-btn',{staticClass:"q-mt-md",staticStyle:{"width":"300px"},attrs:{"label":"Passwort vergessen"},on:{"click":function($event){_vm.showResetPasswordDialog = true}}})],1),_c('q-dialog',{model:{value:(_vm.showResetPasswordDialog),callback:function ($$v) {_vm.showResetPasswordDialog=$$v},expression:"showResetPasswordDialog"}},[_c('q-card',[_c('q-card-section',{staticClass:"row items-center"},[_c('q-input',{attrs:{"outlined":"","type":"email","lazy-rules":"","rules":[function (val) { return val !== null && val !== '' || 'Bitte gib eine Email an'; }, function (val) { return _vm.reg.test(val) || 'Bitte gib eine richtige Email an'; }],"label":"Email"},model:{value:(_vm.userEmail),callback:function ($$v) {_vm.userEmail=$$v},expression:"userEmail"}})],1),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"Passwort zurücksetzen","color":"primary"},on:{"click":function($event){return _vm.resetPassword()}}}),_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"Abbrechen","color":"primary"}})],1)],1)],1),_c('div',{staticClass:"google-form"},[_c('div',{staticClass:"form-option"},[_vm._v("oder")]),_c('q-btn',{staticClass:"q-mt-md google-btn",staticStyle:{"width":"300px","text-transform":"none","font-family":"roboto"},attrs:{"loading":_vm.googleLoading,"label":"Anmelden mit Google","icon":"fab fa-google"},on:{"click":_vm.signUpWithGoogle},scopedSlots:_vm._u([{key:"loading",fn:function(){return [_c('q-spinner')]},proxy:true}])})],1),_c('br'),_c('div',{staticStyle:{"font-size":"18px","text-align":"center","width":"100%"}},[_vm._v("Du hast noch kein Konto? "),_c('router-link',{attrs:{"to":"/registrieren"}},[_vm._v("Jetzt Registrieren")])],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Login.vue?vue&type=template&id=5c1f6aa3&

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Login.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/* harmony default export */ var Loginvue_type_script_lang_js_ = ({
  meta: {
    title: 'Login',
    meta: {
      description: {
        name: 'description',
        content: 'Jetzt bei deinem Reiseplaner Roundtrips4you anmelden. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...'
      }
    }
  },
  name: 'login',

  data() {
    return {
      userEmail: '',
      password: '',
      passwordRepeat: '',
      isPwd: true,
      isPwdRepeat: true,
      submitting: false,
      googleLoading: false,
      showResetPasswordDialog: false,
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },

  methods: {
    onUserLogin() {
      let context = this;
      firebaseInit["a" /* auth */].authRef().signInWithEmailAndPassword(this.userEmail, this.password).then(function () {
        context.$store.commit('demoSession/resetRoundtrip');
        context.$router.replace({
          path: '/meine-rundreisen'
        });
      }).catch(function (error) {
        console.log(error);

        if (error.code === 'auth/user-not-found') {
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Diesen Benutzer konnten wir nicht finden'
          });
        } else {
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Das Passwort oder der Benutzername ist leider falsch'
          });
        }
      });
    },

    resetPassword() {
      let context = this;
      firebaseInit["a" /* auth */].sendPasswordResetEmail(this.userEmail).then(function () {
        // Email sent.
        context.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Wir haben dir eine Email mit einem Resetlink gesendet'
        });
      }).catch(function (error) {
        console.log(error); // An error happened.

        context.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Ups da ist ein Fehler aufgetreten, versuch es noch einmal'
        });
      });
    },

    signUpWithGoogle() {
      getFirebase().then(firebase => {
        var provider = new firebase.auth.GoogleAuthProvider();
        let context = this;
        firebaseInit["a" /* auth */].authRef().signInWithPopup(provider).then(function (result) {
          context.$router.replace('meine-rundreisen'); // This gives you a Google Access Token. You can use it to access the Google API.

          var token = result.credential.accessToken;
          const credential = firebase.auth.GoogleAuthProvider().credential(token); // Sign in with credential from the Google user.

          firebaseInit["a" /* auth */].signInWithCredential(credential).then(function () {}).catch(function (error) {
            console.log(error);
          });
        }).catch(function (error) {
          console.log(error);
        });
      });
    }

  } // uncomment following to manually verfiy mail
  // created () {
  //   var actionCodeSettings = {
  //     url: 'https://roundtrips4you.de/login',
  //     // This must be true.
  //     handleCodeInApp: true
  //   }
  //   const email = 'jonas_eberwein@web.de'
  //   auth.authRef().sendSignInLinkToEmail(email, actionCodeSettings)
  //     .then(function () {
  //       // The link was successfully sent. Inform the user.
  //       // Save the email locally so you don't need to ask the user for it again
  //       // if they open the link on the same device.
  //       window.localStorage.setItem('emailForSignIn', email)
  //     })
  //     .catch(function (error) {
  //       // Some error occurred, you can inspect the code: error.code
  //       console.log(error)
  //     })
  // }

});
// CONCATENATED MODULE: ./src/pages/Login.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Loginvue_type_script_lang_js_ = (Loginvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/Login.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_Loginvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Login = __webpack_exports__["default"] = (component.exports);

/***/ })

},0,[3]]);
//# sourceMappingURL=33.js.map