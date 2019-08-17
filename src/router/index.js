import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebaseInit'

import routes from './routes'

require('../firebaseInit.js')

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  router.beforeEach((to, from, next) => {
    let currentUser = auth.user()
    let requireAuth = to.matched.some(record => record.meta.requireAuth)
    let guestOnly = to.matched.some(record => record.meta.guestOnly)

    if (requireAuth && !currentUser) next('login')
    else if (guestOnly && currentUser) next('profil')
    else next()
  })

  return router
}
