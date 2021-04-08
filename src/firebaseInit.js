import Vue from 'vue'
import firebase from 'firebase'
import { firestorePlugin } from 'vuefire'
Vue.config.productionTip = false

Vue.use(firestorePlugin)

let db = null
let storage = null

const auth = {
  context: null,
  uiConfig: null,
  ui: null,

  init (context, store, router) {
    this.context = context

    let config = {
      'apiKey': process.env.FIREBASE_KEY,
      'authDomain': 'roundtrips4you.firebaseapp.com',
      'databaseURL': 'https://roundtrips4you.firebaseio.com',
      'projectId': 'roundtrips4you',
      'storageBucket': 'gs://roundtrips4you.appspot.com',
      'messagingSenderId': '295257024914',
      'appId': '1:295257024914:web:11432138a1faf186'
    }

    firebase.initializeApp(config)
    this.uiConfig = {
      signInSuccessUrl: '/#/meine-rundreisen',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    db = firebase.firestore()
    storage = firebase.storage()

    // enables offline usage of data
    db.enablePersistence()
      .catch((err) => {
        console.log('firebase persistence failed')
        if (err.code === 'failed-precondition') {
          console.log('multiple tabs opened')
        } else if (err.code === 'unimplemented') {
          console.log('browser too old')
        }
      })

    firebase.auth().onAuthStateChanged((user) => {
      store.dispatch('user/setCurrentUser')

      if (this.context.$route) {
        let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth)
        let guestOnly = this.context.$route.matched.some(record => record.meta.guestOnly)

        if (requireAuth && !user) router.push('/login')
        else if (guestOnly && user) router.push('/meine-rundreisen')
      }
    })
  },
  user () {
    return this.context ? firebase.auth().currentUser : null
  },
  logout (router, store) {
    firebase.auth().signOut().then(r => {
      store.dispatch('roundtrips/resetAllRoundtrips')
      router.push('/')
    })
  },
  authRef () {
    return firebase.auth()
  }
}

export { auth, db, storage }
