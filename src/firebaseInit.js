import Vue from 'vue'
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'

Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyBVkBCl3dY49g3lyX8ns1SYsErNdkCO8sc',
  authDomain: 'roundtrips4you.firebaseapp.com',
  databaseURL: 'https://roundtrips4you.firebaseio.com',
  projectId: 'roundtrips4you',
  storageBucket: '',
  messagingSenderId: '295257024914',
  appId: '1:295257024914:web:11432138a1faf186'
}

const auth = {
  context: null,
  uiConfig: null,
  ui: null,

  init (context) {
    this.context = context

    firebase.initializeApp(config)
    this.uiConfig = {
      signInSuccessUrl: 'user',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    this.ui = new firebaseui.auth.AuthUI(firebase.auth())

    firebase.auth().onAuthStateChanged((user) => {
      this.context.$store.dispatch('user/setCurrentUser')

      let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth)
      let guestOnly = this.context.$route.matched.some(record => record.meta.guestOnly)

      if (requireAuth && !user) this.context.$router.push('login')
      else if (guestOnly && user) this.context.$router.push('user')
    })
  },
  authForm (container) {
    this.ui.start(container, this.uiConfig)
  },
  user () {
    return this.context ? firebase.auth().currentUser : null
  },
  logout () {
    firebase.auth().signOut()
  }
}

export default auth
