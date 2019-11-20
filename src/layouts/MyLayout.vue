<template>
  <q-layout view="lHh Lpr lFf">
    <div
      id="Header"
      ref="Header"
      v-click-outside="hideMenu"
    >
      <div class="top-row">
        <div class="left-col">
          <a href="/">
            <img
              alt="logo"
              src="../statics/headerSubmark.png"
            />
          </a>
          <span class="beta-span cursor-pointer">[beta]
            <q-tooltip>
              Wir befinden uns derzeit noch in der Beta Phase
            </q-tooltip>
          </span>
        </div>
        <div class="center-col">
          <a href="/">
            <img
              alt="text logo"
              src="../statics/textLogo.png"
            />
          </a>
        </div>
        <div class="right-col">
          <router-link
            class="header-page-link"
            to="/"
          >home</router-link>
          <router-link
            class="header-page-link"
            to="/rundreisen-uebersicht"
          >rundreisen</router-link>
          <router-link
            class="header-page-link"
            to="/ueber"
          >über uns</router-link>
          <span v-if="!user"></span>
          <q-avatar
            size="50px"
            style="width: 50px; margin:auto 10px auto 10px;"
            :style="user ? null : 'font-size:60px;'"
            :icon="user && user.photoURL !== null ? null : 'account_circle'"
            @click="user ? null : $router.push('/login')"
          >
            <img
              v-if="user && user.photoURL !== null"
              :src="user.photoURL"
            >
            <div
              v-if="user"
              style="pointer-events: none;"
            >
              <q-tooltip :value="showHelloTooltip">
                Hallo, {{user.displayName}}
              </q-tooltip>
            </div>
            <q-menu v-if="user">
              <q-list style="min-width: 100px">
                <q-item
                  clickable
                  v-close-popup
                  @click="$router.push('/profil')"
                >
                  <q-item-section>
                    Profil
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="$router.push('/meine-rundreisen')"
                >
                  <q-item-section>
                    Meine Rundreisen
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                >
                  <q-item-section @click="logOut">Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>
          <div id="BurgerMenu">
            <svg
              class="ham hamRotate ham7"
              viewBox="0 0 100 100"
              width="80"
              ref="svg"
              @click="[$refs.svg.classList.toggle('active'), $refs.Header.classList.toggle('active')]"
            >
              <path
                class="line top"
                d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"
              />
              <path
                class="line middle"
                d="m 70,50 h -40"
              />
              <path
                class="line bottom"
                d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40"
              />
            </svg>
            <div id="MobileMenu"></div>
          </div>
        </div>
      </div>
      <div class="bottom-row">
        <div @click="hideMenu()">
          <router-link
            class="mobile-header-page-link"
            to="/"
          >home</router-link>
        </div>
        <div @click="hideMenu()">
          <router-link
            class="mobile-header-page-link"
            to="/rundreisen-uebersicht"
          >rundreisen</router-link>
        </div>
        <div @click="hideMenu()">
          <router-link
            class="mobile-header-page-link"
            to="/ueber"
          >über uns</router-link>
        </div>
      </div>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
    <footer>
      <div class="left-footer-col">
        <a href="/">
          <img
            alt="logo"
            style="width:auto; max-height:200px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  border-radius: 50%;"
            src="../statics/submark.png"
          />
        </a>
      </div>
      <div class="right-footer-col">
        <div class="footer-menu">
          <h3 class="footer-title">Menü</h3>
          <router-link
            class="footer-link"
            to="/"
          >Home</router-link>
          <router-link
            class="footer-link"
            to="/rundreisen-uebersicht"
          >Rundreisen</router-link>
          <router-link
            class="footer-link"
            to="/ueber"
          >Über uns</router-link>
        </div>
        <div class="footer-infos">
          <h3 class="footer-title">Infos</h3>
          <router-link
            class="footer-link"
            to="/impressum"
          >Impressum</router-link>
          <router-link
            class="footer-link"
            to="/haftungsausschluss"
          >Haftungsausschluss</router-link>
          <router-link
            class="footer-link"
            to="/datenschutz"
          >Datenschutz</router-link>
        </div>
        <div class="footer-contact">
          <h3 class="footer-title">Kontakt</h3>
          <a class="footer-link contact-link-box">
            <span class="footer-text">roundtrips4you GbR</span>
            <span class="footer-text">Am See 20</span>
            <span class="footer-text">85077 Manching</span>
          </a>
          <a
            class="footer-link"
            href="mailto:hello@roundtrips4you.de"
          >hello@roundtrips4you.de</a>
        </div>
      </div>
      <CookieBanner></CookieBanner>
    </footer>
    <div
      v-if="showPreload"
      class="preloadOverlay"
    ></div>
    <back-to-top style="z-index:9600;">
      <q-btn
        round
        color="primary"
        icon="airplanemode_active"
      />
    </back-to-top>
  </q-layout>
</template>

<style lang="less">
@import url("../css/site.less");
</style>

<script>
import { auth } from '../firebaseInit'
import { Loading } from 'quasar'
import CookieBanner from '../pages/CookieBanner/CookieBanner'
import BackToTop from 'vue-backtotop'

let forEachCalled = false
let redirected = false

export default {
  name: 'MyLayout',
  components: {
    CookieBanner,
    BackToTop
  },
  data () {
    return {
      showPreload: true,
      showHelloTooltip: true
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    logOut () {
      auth.logout(this.$router)
    },
    hideMenu () {
      this.$refs.svg.classList.remove('active')
      this.$refs.Header.classList.remove('active')
    }
  },
  created () {
    this.$storyblok.init({
      accessToken: 'TQjWhoJBE25KdjlauQ5rYgtt'
    })
    auth.authRef().onAuthStateChanged((user) => {
      let title
      if (this.$router.currentRoute.path.substr(1)) {
        title = this.$router.currentRoute.path.substr(1) + ' | roundtrips4you'
        if (title.includes('rundreisen/')) title = title.substr(title.indexOf('/') + 1, title.length)
        else if (title.includes('rundreisen-details/')) title = 'rundreisen-details'
        else if (title.includes('rundreise-bearbeiten/')) title = 'rundreise-bearbeiten'
      } else {
        title = 'roundtrips4you'
      }
      document.title = title

      this.$router.beforeEach((to, from, next) => {
        if (to.path.substr(1)) {
          title = to.path.substr(1) + ' | roundtrips4you'
          if (title.includes('rundreisen/')) title = title.substr(title.indexOf('/') + 1, title.length)
          else if (title.includes('rundreisen-details/')) title = 'rundreisen-details'
          else if (title.includes('rundreise-bearbeiten/')) title = 'rundreise-bearbeiten'
        } else {
          title = 'roundtrips4you'
        }

        document.title = title

        let loggedIn = auth.user() !== null
        let verified = auth.user() ? auth.user().emailVerified : false
        forEachCalled = true
        let requireAuth = to.matched.some(record => record.meta.requireAuth)
        let guestOnly = to.matched.some(record => record.meta.guestOnly)
        let isOnLoginPage = to.path === '/login'
        let isOnRoundtripsPage = to.path === '/meine-rundreisen'
        let isOnVerifyPage = to.path === '/email-bestaetigen'

        if (!isOnLoginPage && requireAuth && !loggedIn) next('login')
        else if (!isOnVerifyPage && requireAuth && loggedIn && !verified) next('email-bestaetigen')
        else if (!isOnRoundtripsPage && guestOnly && loggedIn && verified) next('meine-rundreisen')
        else if (!isOnVerifyPage && guestOnly && loggedIn && !verified) next('email-bestaetigen')
        else if (!isOnRoundtripsPage && isOnVerifyPage && loggedIn && verified) next('meine-rundreisen')
        else next()

        redirected = true
      })

      if (!forEachCalled) {
        let loggedIn = auth.user() !== null
        let verified = auth.user() ? auth.user().emailVerified : false
        let currentRoute = this.$router.currentRoute
        let requireAuth = currentRoute.matched.some(record => record.meta.requireAuth)
        let guestOnly = currentRoute.matched.some(record => record.meta.guestOnly)
        let isOnLoginPage = currentRoute.fullPath === '/login'
        let isOnRoundtripsPage = currentRoute.fullPath === '/meine-rundreisen'
        let isOnVerifyPage = currentRoute.fullPath === '/email-bestaetigen'

        if (!isOnLoginPage && requireAuth && !loggedIn) this.$router.replace('login')
        else if (!isOnVerifyPage && requireAuth && loggedIn && !verified) this.$router.replace('email-bestaetigen')
        else if (!isOnRoundtripsPage && guestOnly && loggedIn && verified) this.$router.replace('meine-rundreisen')
        else if (!isOnVerifyPage && guestOnly && loggedIn && !verified) this.$router.replace('email-bestaetigen')
        else if (!isOnRoundtripsPage && isOnVerifyPage && loggedIn && verified) this.$router.replace('meine-rundreisen')

        redirected = true
      }

      if (redirected) {
        redirected = false
        this.showPreload = false
        Loading.hide()
        let context = this
        setTimeout(function () {
          context.showHelloTooltip = false
        }, 5000)
      }
    })
  }
}
</script>
