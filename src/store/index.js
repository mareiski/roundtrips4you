import Vue from 'vue'
import Vuex from 'vuex'

// import extern modules
import user from './user'
import roundtrips from './roundtrips'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  // locally declared modules
  // const sharedMethods = {
  //   actions: {
  //     capitalize (s) {
  //       s = s.toLowerCase()
  //       s = s.charAt(0).toUpperCase() + s.slice(1)
  //       return s
  //     }
  //   }
  // }

  const Store = new Vuex.Store({

    // modules to reference
    modules: {
      user,
      roundtrips
    }

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  })

  /*
  if we want some HMR magic for it, we handle
  the hot update like below. Notice we guard this
  code with "process.env.DEV" -- so this doesn't
  get into our production build (and it shouldn't).
*/

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./user'], () => {
      const newShowcase = require('./user').default
      Store.hotUpdate({ modules: { showcase: newShowcase } })
    })
  }

  return Store
}
