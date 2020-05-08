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
            <q-tooltip @click="$event.show()">
              Wir befinden uns derzeit in der Beta Phase, deshalb kann es leider noch zu bugs kommen
            </q-tooltip>
          </span>
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
            to="/blog"
          >blog</router-link>
          <router-link
            v-if="!user"
            class="header-page-link"
            to="/login"
          >anmelden</router-link>
          <router-link
            v-if="!user"
            to="/registrieren"
            class="flex justify-center register-header-link"
            style="flex-direction:column; text-decoration:none;"
          >
            <q-btn color="primary">registrieren</q-btn>
          </router-link>
          <q-avatar
            v-else
            size="50px"
            style="width: 50px; margin:auto 10px auto 10px;"
            :style="user ? 'padding:0;' : 'font-size:60px;'"
            :icon="user && user.photoURL !== null ? null : 'account_circle'"
            @click="user ? null : $router.push('/login')"
          >
            <img
              v-if="user && user.photoURL !== null"
              :src="user.photoURL"
            >
            <div style="pointer-events: none;">
              <q-tooltip
                self="center middle"
                anchor="center middle"
                :value="true"
                content-style="font-size: 14px;"
                content-class="tooltip"
              >
                {{user && user.displayName ? 'Hallo, ' + user.displayName : 'Anmelden'}}
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
                    Meine Reisen
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
            to="/blog"
          >blog</router-link>
        </div>
        <div
          @click="hideMenu()"
          class="flex justify-end"
        >
          <router-link
            v-if="!user"
            class="mobile-header-page-link"
            to="/login"
          >anmelden</router-link>
          <router-link
            v-if="!user"
            to="/registrieren"
            class="flex justify-center"
            style="flex-direction:column; text-decoration:none; margin-right:5px;"
          >
            <q-btn color="primary">registrieren</q-btn>
          </router-link>
        </div>
      </div>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
    <footer>
      <div
        id="SocialMediaContainer"
        class="flex"
      >
        <q-icon
          style="color: #1f892f"
          name="fab fa-tripadvisor"
          @click="openInNewTab('https://www.tripadvisor.de/Profile/Roundtrips4you')"
        />
        <q-icon
          style="color: #d73532"
          name="fab fa-pinterest-p"
          @click="openInNewTab('https://www.pinterest.de/roundtrips4you/')"
        />
        <q-icon
          style="color: #C13584"
          name="fab fa-instagram"
          @click="openInNewTab('https://www.instagram.com/roundtrips4you/')"
        />
        <q-icon
          style="color: #3b5999"
          name="fab fa-facebook-f"
          @click="openInNewTab('https://www.facebook.com/roundtrips4you/')"
        />
      </div>
      <div class="main-footer">
        <div class="left-footer-col">
          <a href="/">
            <img
              alt="logo"
              style="width:auto; max-height:200px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  border-radius: 50%;"
              src="../statics/submark.jpeg"
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
            >Reisen</router-link>
            <router-link
              class="footer-link"
              to="/blog"
            >Blog</router-link>
            <router-link
              class="footer-link"
              to="/ueber"
            >Über uns</router-link>
          </div>
          <div class="footer-infos">
            <h3 class="footer-title">Infos</h3>
            <router-link
              v-if="!isOnNetlifyPage"
              class="footer-link"
              rel="nofollow"
              to="/impressum"
            >Impressum</router-link>
            <router-link
              v-if="!isOnNetlifyPage"
              rel="nofollow"
              class="footer-link"
              to="/haftungsausschluss"
            >Haftungsausschluss</router-link>
            <router-link
              v-if="!isOnNetlifyPage"
              class="footer-link"
              rel="nofollow"
              to="/datenschutz"
            >Datenschutz</router-link>
          </div>
          <div class="footer-contact">
            <h3 class="footer-title">Kontakt</h3>
            <a
              class="footer-link contact-link-box"
              v-if="!isOnNetlifyPage"
              href="https://roundtrips4you.de"
            >
              <span class="footer-text">roundtrips4you</span>
            </a>
            <a
              class="footer-link"
              href="mailto:hello@roundtrips4you.de"
            >hello@roundtrips4you.de</a>
            <div
              class="fb-like"
              data-href="https://facebook.com/roundtrips4you"
              data-width="100"
              data-layout="button"
              data-action="like"
              data-size="small"
              data-share="true"
              style="margin-top:10px;"
            ></div>
          </div>
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
      >
        <q-tooltip>
          Nach oben
        </q-tooltip>
      </q-btn>
    </back-to-top>
    <div
      class="register-btn"
      v-if="!user && $router.currentRoute.fullPath !== '/registrieren'"
    >
      <router-link
        class="footer-link"
        to="/registrieren"
        style="text-decoration:none;"
      >
        <q-btn
          color="primary"
          icon="account_circle"
          label="Registrieren"
        />
      </router-link>
    </div>
  </q-layout>
</template>
<style lang="less">
@import "../css/site.less";
</style>
<script>
// import(/* webpackPrefetch: true */ '../css/site.less')
import { auth } from '../firebaseInit'
import { Loading } from 'quasar'

let forEachCalled = false
let redirected = false

export default {
  name: 'MyLayout',
  components: {
    CookieBanner: () => import('../pages/CookieBanner/CookieBanner'),
    BackToTop: () => import('vue-backtotop')
  },
  data () {
    return {
      showPreload: true,
      onLine: navigator.onLine,
      isOnNetlifyPage: false
    }
  },
  meta () {
    return {
      title: 'Home',
      titleTemplate: title => `${title} | Roundtrips4you - der kostenlose Reiseplaner | Route, Reise online planen`,
      meta: {
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
      }
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
    },
    hideLoading () {
      redirected = false
      this.showPreload = false
      Loading.hide()
    },
    updateOnlineStatus (e) {
      const {
        type
      } = e
      this.onLine = type === 'online'
    },
    getHost () {
      return location.host
    },
    openInNewTab (link) {
      window.open(link, '_blank')
    },
    leaving () {
      window.addEventListener('beforeunload', (event) => {
        if (this.user && (document.activeElement.tagName === 'INPUT' || document.activeElement.classList.contains('q-editor__content'))) {
          // any element is still in focus
          event.returnValue = 'You have unfinished changes!'
        }
      })
    }
  },
  watch: {
    onLine (v) {
      if (v) {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Verbindung wieder hergestellt'
        })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Bitte überprüfe deine Internetverbindung'
        })
      }
    }
  },
  mounted () {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
  },
  beforeDestroy () {
    window.removeEventListener('online', this.updateOnlineStatus)
    window.removeEventListener('offline', this.updateOnlineStatus)
  },

  created () {
    this.leaving()
    this.$storyblok.init({
      accessToken: 'TQjWhoJBE25KdjlauQ5rYgtt'
    })
    this.isOnNetlifyPage = (this.getHost() === 'roundtrips4you.netlify.app' || this.getHost === 'www.roundtrips4you.netlify.app')

    auth.authRef().onAuthStateChanged((user) => {
      this.$router.beforeEach((to, from, next) => {
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

      let isOnDetailsPage = false
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

        isOnDetailsPage = currentRoute.fullPath.split('/')[1] === 'rundreisen-details'
        redirected = true
      }

      if (redirected && !isOnDetailsPage) {
        redirected = false
        this.showPreload = false
        Loading.hide()
      }
    })
  }
}
</script>
