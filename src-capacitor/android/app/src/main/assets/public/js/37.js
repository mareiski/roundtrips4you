(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "d843":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/User.vue?vue&type=template&id=bba5b648&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.user)?_c('div',{staticClass:"user q-px-lg q-pb-md"},[_c('q-tabs',{staticClass:"text-grey",staticStyle:{"padding-top":"40px"},attrs:{"dense":"","active-color":"primary","indicator-color":"primary","align":"justify","narrow-indicator":""},model:{value:(_vm.tab),callback:function ($$v) {_vm.tab=$$v},expression:"tab"}},[_c('q-tab',{attrs:{"name":"publicProfile","label":"Öffentliches Profil"}}),_c('q-tab',{attrs:{"name":"settings","label":"Einstellungen"}})],1),_c('q-separator'),_c('q-tab-panels',{attrs:{"keep-alive":"","animated":""},model:{value:(_vm.tab),callback:function ($$v) {_vm.tab=$$v},expression:"tab"}},[_c('q-tab-panel',{attrs:{"name":"publicProfile"}},[_c('public-user-profile')],1),_c('q-tab-panel',{attrs:{"name":"settings"}},[_c('h4',[_vm._v("Einstellungen")]),_c('q-form',{staticClass:"q-gutter-md rounded-borders",attrs:{"bordered":""},on:{"submit":_vm.onSaveUserSettings}},[_c('q-list',{staticClass:"rounded-borders",staticStyle:{"padding":"10px","margin-bottom":"30px"},attrs:{"bordered":""}},[_c('q-input',{attrs:{"outlined":"","rules":[function (val) { return val !== null && val !== '' && (_vm.user.displayName === val || _vm.uniqueUserName(val)) || 'Bitte wähle einen Benutzernamen'; }],"label":"Benutzername","lazy-rules":""},model:{value:(_vm.UserDisplayName),callback:function ($$v) {_vm.UserDisplayName=$$v},expression:"UserDisplayName"}}),(_vm.companyProfile)?_c('q-input',{attrs:{"outlined":"","clear-icon":"","rules":[function (val) { return !val || _vm.urlReg.test(val) || 'Bitte gib einen richtigen Link an'; }],"label":"Website","lazy-rules":""},model:{value:(_vm.CompanyWebsite),callback:function ($$v) {_vm.CompanyWebsite=$$v},expression:"CompanyWebsite"}}):_vm._e(),(_vm.companyProfile)?_c('q-input',{attrs:{"outlined":"","autogrow":"","label":"Unternehmensbeschreibung","rules":[function (val) { return val !== null && val !== '' || 'Bitte gib eine Beschreibung an'; },
        function (val) { return val.length > 10 && val.length < 160 || 'Bitte gib eine Beschreibung zwischen 10 und 160 Zeichen an'; } ]},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"subject"}})]},proxy:true}],null,false,823822416),model:{value:(_vm.companyDescription),callback:function ($$v) {_vm.companyDescription=$$v},expression:"companyDescription"}}):_vm._e(),_c('div',{staticClass:"flex"},[_c('div',[_c('div',{staticClass:"uploader",style:({ backgroundImage: 'url('+ _vm.titleImgUrl +')' })},[_c('q-btn',{attrs:{"round":"","color":"primary","icon":"add"},on:{"click":function () { return _vm.$refs.titleUpload.pickFiles(); }}})],1),_c('q-uploader',{ref:"titleUpload",staticStyle:{"max-width":"300px","display":"none"},attrs:{"url":"","label":"Titelbild hochladen","accept":".jpg, image/*","hide-upload-btn":""},on:{"added":function($event){return _vm.fileAdded($event)}}})],1)]),_c('div',{staticClass:"row"},[_c('q-btn',{staticClass:"q-mt-md",attrs:{"type":"submit","loading":_vm.submitting,"label":"Speichern","color":"primary","text-color":"white"},scopedSlots:_vm._u([{key:"loading",fn:function(){return [_c('q-spinner')]},proxy:true}],null,false,3173242255)})],1)],1)],1),_c('q-form',{staticClass:"q-gutter-md rounded-borders",attrs:{"bordered":""},on:{"submit":_vm.onSaveUserPass}},[_c('q-list',{staticClass:"rounded-borders",attrs:{"bordered":""}},[_c('q-expansion-item',{staticClass:"add-item",attrs:{"clickable":"","expand-separator":""},on:{"click":function($event){_vm.addButtonActive = !_vm.addButtonActive}},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('q-item-section',{staticStyle:{"align-items":"center"}},[_c('span',[_vm._v("Passwort ändern")])])]},proxy:true}],null,false,1439800149),model:{value:(_vm.addExpanded),callback:function ($$v) {_vm.addExpanded=$$v},expression:"addExpanded"}},[_c('div',{staticStyle:{"padding":"10px"}},[_c('q-input',{attrs:{"outlined":"","type":_vm.isPwd ? 'password' : 'text',"label":"neues Passwort","rules":[function (val) { return val !== null && val !== '' || 'Bitte gib dein neues Passwort ein'; }]},scopedSlots:_vm._u([{key:"append",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":_vm.isPwd ? 'visibility_off' : 'visibility'},on:{"click":function($event){_vm.isPwd = !_vm.isPwd}}})]},proxy:true}],null,false,3635466494),model:{value:(_vm.password),callback:function ($$v) {_vm.password=$$v},expression:"password"}}),_c('q-input',{attrs:{"outlined":"","type":_vm.isPwdRepeat ? 'password' : 'text',"label":"neues Passwort wiederholen","rules":[function (val) { return val !== null && val !== '' || 'Bitte wiederhole dein Passwort'; },
         function (val) { return val === _vm.password || 'Die beiden Passwörter stimmen nicht überein'; }]},scopedSlots:_vm._u([{key:"append",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":_vm.isPwdRepeat ? 'visibility_off' : 'visibility'},on:{"click":function($event){_vm.isPwdRepeat = !_vm.isPwdRepeat}}})]},proxy:true}],null,false,1612466441),model:{value:(_vm.passwordRepeat),callback:function ($$v) {_vm.passwordRepeat=$$v},expression:"passwordRepeat"}}),_c('div',{staticClass:"row"},[_c('q-btn',{staticClass:"q-mt-md",attrs:{"type":"submit","loading":_vm.submitting,"label":"Speichern","color":"primary","text-color":"white"},scopedSlots:_vm._u([{key:"loading",fn:function(){return [_c('q-spinner')]},proxy:true}],null,false,3173242255)})],1)],1)])],1)],1),_c('h4',[_vm._v("Danger Zone")]),_c('q-list',{staticClass:"rounded-borders",staticStyle:{"padding":"10px","border-color":"red"},attrs:{"bordered":""}},[_c('p',{staticStyle:{"font-size":"18px"}},[_vm._v("Dieses Konto und alle enthaltenen Inhalte löschen")]),_c('q-btn',{staticClass:"q-mt-md",attrs:{"loading":_vm.deleting,"label":"Löschen","color":"primary","text-color":"white"},on:{"click":function($event){_vm.deleteDialog = true;}},scopedSlots:_vm._u([{key:"loading",fn:function(){return [_c('q-spinner')]},proxy:true}],null,false,3173242255)}),_c('q-dialog',{attrs:{"persistent":""},model:{value:(_vm.deleteDialog),callback:function ($$v) {_vm.deleteDialog=$$v},expression:"deleteDialog"}},[_c('q-card',[_c('q-card-section',{staticClass:"row items-center"},[_c('span',{staticClass:"q-ml-sm"},[_vm._v("Willst du wirklich deinen Konto und alle deine Reisen löschen ? Dies kann nicht mehr rückgängig gemacht werden.")])]),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"Abbrechen","color":"primary"}}),_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":"Konto Löschen","color":"primary"},on:{"click":function($event){return _vm.deleteAccount()}}})],1)],1)],1)],1)],1)],1)],1):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/User.vue?vue&type=template&id=bba5b648&

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/User.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Uservue_type_script_lang_js_ = ({
  meta: {
    title: 'Profil',
    meta: {
      robot: {
        name: 'description',
        content: 'Dein Profil auf roundtrips4you. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...'
      }
    }
  },
  name: 'user',

  data() {
    return {
      UserDisplayName: '',
      UserEmail: '',
      submitting: false,
      titleImgUrl: '',
      password: '',
      isPwd: true,
      passwordRepeat: '',
      isPwdRepeat: true,
      deleteDialog: false,
      deleting: false,
      urlReg: /^(http:\/\/|https:\/\/)/,
      CompanyWebsite: null,
      companyProfile: false,
      companyDescription: null,
      tab: 'publicProfile',
      addExpanded: false
    };
  },

  components: {
    PublicUserProfile: () => __webpack_require__.e(/* import() */ 1).then(__webpack_require__.bind(null, "1b01"))
  },
  computed: {
    user() {
      return this.$store.getters['user/user'];
    }

  },
  methods: {
    logOut() {
      firebaseInit["a" /* auth */].logout(this.$router, this.$store);
    },

    fileAdded: function (event) {
      let files = event;
      this.upload(files[0]);
      this.$refs.titleUpload.reset();
    },

    upload(file) {
      const context = this;
      const fileRef = firebaseInit["c" /* storage */].ref().child('Images/Users/' + firebaseInit["a" /* auth */].user().uid + '/TitleImg');
      fileRef.put(file).then(function (snapshot) {
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Bild wurde erfolgreich hochgeladen'
        });
        fileRef.getDownloadURL().then(function (url) {
          context.titleImgUrl = url;
          context.onSaveUserSettings();
        });
      });
    },

    onSaveUserSettings() {
      let user = firebaseInit["a" /* auth */].user();

      if (user.displayName === this.UserDisplayName || this.uniqueUserName(this.UserDisplayName)) {
        let context = this;
        user.updateProfile({
          displayName: this.UserDisplayName,
          photoURL: this.titleImgUrl
        }).then(function () {
          // user.updateEmail(context.UserEmail).then(function () {
          context.updateDBEntry(user.uid); // Update successful

          context.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Einstellungen wurden erfolgreich gespeichert'
          });
          /* }).catch(function (error) {
            console.log(error)
            context.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: 'Es ist ein Fehler aufgetreten, bitte versuche es erneut'
            })
          }) */
        }).catch(function (error) {
          console.log(error);
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Es ist ein Fehler aufgetreten, bitte versuche es erneut'
          });
        });
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Bitte gib einen anderen Benutzernamen an'
        });
      }
    },

    updateDBEntry(uid) {
      let context = this;
      let roundtripsRef = firebaseInit["b" /* db */].collection('User').where('UserUID', '==', uid).limit(1);
      roundtripsRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          firebaseInit["b" /* db */].collection('User').doc(doc.id).update({
            UserImage: context.titleImgUrl,
            UserName: context.UserDisplayName,
            website: context.CompanyWebsite,
            companyDescription: context.companyDescription
          });
        });
      });
    },

    onSaveUserPass() {
      let context = this;
      firebaseInit["a" /* auth */].user().updatePassword(this.password).then(function () {
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Passwort wurde erfolgreich geändert'
        });
      }).catch(function (error) {
        console.log(error);

        if (error.code === 'auth/requires-recent-login') {
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Bitte melde dich erneut an, bevor du dein Passwort änderst'
          });
        } else {
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Es ist ein Fehler aufgetreten, bitte versuche es erneut'
          });
        }
      });
    },

    uniqueUserName(value) {
      return new Promise((resolve, reject) => {
        value = value.trim();
        let roundtripsRef = firebaseInit["b" /* db */].collection('User').where('UserName', '==', value).limit(1);
        roundtripsRef.get().then(snapshot => {
          resolve(snapshot.size === 0 || 'Dieser Name ist bereits vergeben');
        }).catch(function (error) {
          console.log('Error ' + error);
          resolve(null);
        });
      });
    },

    deleteAccount() {
      let context = this;
      firebaseInit["a" /* auth */].user().delete().then(function () {
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Schade, dein Konto wurde gelöscht'
        });
        context.$router.push('/');
      }).catch(function (error) {
        console.log(error);

        if (error.code === 'auth/requires-recent-login') {
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Bitte melde dich erneut an, bevor du dein Konto löscht'
          });
        } else {
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Es ist ein Fehler aufgetreten, dein Konto konnte nicht gelöscht werden'
          });
        }
      });
    }

  },

  created() {
    firebaseInit["a" /* auth */].authRef().onAuthStateChanged(user => {
      this.UserDisplayName = firebaseInit["a" /* auth */].user().displayName;
      this.UserEmail = firebaseInit["a" /* auth */].user().email;
      this.titleImgUrl = firebaseInit["a" /* auth */].user().photoURL;
      let userRef = firebaseInit["b" /* db */].collection('User').where('UserUID', '==', firebaseInit["a" /* auth */].user().uid).limit(1);
      userRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.companyProfile = !!doc.data().companyProfile;
          if (doc.data().website) this.CompanyWebsite = doc.data().website;
          if (doc.data().companyDescription) this.companyDescription = doc.data().companyDescription;
        });
      });
    });
  }

});
// CONCATENATED MODULE: ./src/pages/User.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Uservue_type_script_lang_js_ = (Uservue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/User.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_Uservue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var User = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=37.js.map