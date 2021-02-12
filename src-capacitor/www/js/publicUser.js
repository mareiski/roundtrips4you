(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "9ab9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/PublicUsers.vue?vue&type=template&id=33795604&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"public-users  q-px-lg q-pb-md"},[_c('q-list',{staticClass:"rounded-borders",attrs:{"bordered":"","padding":""}},[(_vm.showUser)?_c('div',_vm._l((_vm.users),function(user,index){return _c('q-item',{directives:[{name:"ripple",rawName:"v-ripple"}],key:user,attrs:{"clickable":!!user.name},on:{"click":function($event){return _vm.$router.push('/benutzerprofil/' + user.userUID)}}},[_c('q-item-section',{attrs:{"avatar":"","top":""}},[_c('q-avatar',{attrs:{"color":"primary","text-color":"white"}},[_c('img',{attrs:{"src":user.image ? user.image : '../statics/dummy-image-landscape-1-150x150.jpg'}})])],1),_c('q-item-section',[_c('q-item-label',{attrs:{"lines":"1"}},[_vm._v("#"+_vm._s(index + 1)+" "+_vm._s(user.name ? user.name : 'Anonymer Nutzer')+" "+_vm._s(user.reputation ? '(' + user.reputation + ')' : ''))]),_c('q-item-label',{staticStyle:{"width":"100px"},attrs:{"caption":""}},[_vm._v("\n            "+_vm._s(user.userSince)+"\n            "),_c('q-tooltip',[_vm._v("\n              Dieser Account wurde am "+_vm._s(user.userSince)+" erstellt\n            ")])],1)],1),(user.name)?_c('q-item-section',{attrs:{"side":""}},[_c('q-icon',{attrs:{"name":"keyboard_arrow_right","color":"primary"}})],1):_vm._e()],1)}),1):_c('div',_vm._l((3),function(n){return _c('q-item',{key:n},[_c('q-item-section',{staticStyle:{"padding":"8px 10px"},attrs:{"avatar":"","top":""}},[_c('q-skeleton',{attrs:{"size":"40px","type":"QAvatar"}})],1),_c('q-item-section',[_c('q-skeleton',{staticStyle:{"margin-bottom":"10px"},attrs:{"width":"300px","type":"rect"}}),_c('q-item-label',{attrs:{"caption":""}},[_c('q-skeleton',{attrs:{"width":"80px","type":"rect"}})],1)],1)],1)}),1)])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/PublicUsers.vue?vue&type=template&id=33795604&

// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// EXTERNAL MODULE: ./node_modules/quasar/src/utils/date.js
var date = __webpack_require__("bd4c");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/PublicUsers.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
__webpack_require__.e(/* import() */ 25).then(__webpack_require__.t.bind(null, "93de", 7));


/* harmony default export */ var PublicUsersvue_type_script_lang_js_ = ({
  meta: {
    title: 'Users',
    meta: {
      description: {
        name: 'description',
        content: 'Reise selbst planen & zusammenstellen, Reise planen kostenlos & online. Routenplaner und Reiseplaner online mit vielen Tools für deinen Roadtrip'
      }
    }
  },

  data() {
    return {
      users: [],
      showUser: false
    };
  },

  created() {
    this.getAllUsers();
  },

  methods: {
    getAllUsers() {
      let userRef = firebaseInit["b" /* db */].collection('User');
      let context = this;
      userRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          let user = {
            image: doc.data().UserImage,
            name: doc.data().UserName,
            userSince: context.getCreatedAtDate(doc.data().createdAt),
            trustedUser: !!doc.data().TrustedUser,
            userUID: doc.data().UserUID,
            roundtripsEdited: doc.data().RTEdited ? doc.data().RTEdited : 0
          };
          this.users.push(user);
          this.getPublishedRoundtrips(user);
        });
      });
    },

    getPublishedRoundtrips(user) {
      let roundtripsRef = firebaseInit["b" /* db */].collection('Roundtrips').where('UserId', '==', user.userUID).where('Public', '==', true);
      roundtripsRef.get().then(snapshot => {
        let publishedRoundtrips = snapshot.size ? snapshot.size : 0;
        this.getReputation(user, publishedRoundtrips);
      }).catch(function (error) {
        console.log(error);
        this.showRoundtrips = true;
      });
    },

    getReputation(user, publishedRoundtrips) {
      let publicRT = publishedRoundtrips * 50;
      let editedRT = user.roundtripsEdited * 25;
      user.reputation = publicRT + editedRT + 100; // resort after end of the array

      if (this.users.indexOf(user) === this.users.length - 1) {
        this.users.sort((a, b) => Number(b.reputation) - Number(a.reputation));
        this.showUser = true;
      }
    },

    getCreatedAtDate(timeStamp) {
      return date["b" /* default */].formatDate(new Date(timeStamp.seconds * 1000), 'DD.MM.YYYY');
    }

  }
});
// CONCATENATED MODULE: ./src/pages/PublicUsers.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_PublicUsersvue_type_script_lang_js_ = (PublicUsersvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/PublicUsers.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_PublicUsersvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PublicUsers = __webpack_exports__["default"] = (component.exports);

/***/ })

},0,[25,26]]);
//# sourceMappingURL=publicUser.js.map