<template>
  <q-layout view="lHh Lpr lFf">
    <div
      id="Header"
      ref="Header"
      :class="{ 'header-hidden': !showHeader }"
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
          >reisen</router-link>
          <router-link
            class="header-page-link"
            to="/blog"
          >blog</router-link>
          <router-link
            v-if="!user && !isInTrialMode"
            class="header-page-link"
            to="/login"
          >anmelden</router-link>
          <router-link
            v-if="!user"
            :to="isInTrialMode ? { name: 'Register', params: { RTId: RTId } } : '/registrieren'"
            class="flex justify-center register-header-link"
            style="flex-direction:column; text-decoration:none;"
          >
            <q-btn color="primary">{{isInTrialMode ? 'Speichern' : 'registrieren'}}</q-btn>
          </router-link>
          <q-avatar
            v-else
            size="50px"
            style="width: 50px; margin:auto 10px auto 10px;"
            :style="user ? 'padding:0;' : 'font-size:60px;'"
            :icon="user && user.photoURL !== null ? null : 'account_circle'"
            @click="[user ? null : $router.push('/login'), showWelcomeTooltip = false]"
          >
            <q-badge
              style="top:-1px; right:-3px; width:auto;"
              color="primary"
              floating
            >{{undreadNotifications}}</q-badge>
            <img
              v-if="user && user.photoURL !== null"
              :src="user.photoURL"
            >
            <div style="pointer-events: none;">
              <q-tooltip
                self="center middle"
                anchor="center middle"
                :value="showWelcomeTooltip"
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
                  @click="[drawer = !drawer, markAllMessagesSeen()]"
                >
                  <q-item-section>
                    <span>Nachrichten
                      <q-badge
                        style="top:4px; right:7px;"
                        color="primary"
                        floating
                      >{{undreadNotifications}}</q-badge>
                    </span>
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
          >reisen</router-link>
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
    <q-drawer
      v-if="user"
      v-model="drawer"
      :width="300"
      :breakpoint="500"
      side="right"
      overlay
      bordered
      content-class="bg-grey-3"
    >
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>
          Benachrichtigungen
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="close"
          @click="drawer = false"
        />
      </q-toolbar>

      <q-scroll-area class="fit">
        <router-link
          v-for="message in messages"
          :key="message.id"
          :to="message.Link"
          style="text-decoration:none;"
        >
          <q-card class="notification-card cursor-pointer">
            <q-card-section class="created-at">
              {{ getStringDateFromTimestamp(message.createdAt) }}
            </q-card-section>
            <q-card-section class="message">
              {{ message.Message }}
            </q-card-section>
            <q-card-section class="tag">
              <q-icon
                :name="message.Icon"
                color="primary"
                style="font-size:16px;"
              /> {{ message.Tag }}
            </q-card-section>
          </q-card>
        </router-link>

        <!-- <q-list
          v-for="message in messages"
          :key="message.id"
        >

          <q-item
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon :name="message.Icon" />
            </q-item-section>
            <q-item-section>
              {{ message.Message }}
            </q-item-section>
          </q-item>

          <q-separator />
        </q-list> -->
      </q-scroll-area>
    </q-drawer>
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
              to="/faq"
            >FAQs</router-link>
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
            <!-- Begin Mailchimp Signup Form -->
            <div
              style="margin-top:10px;"
              id="mc_embed_signup"
            >
              <form
                action="https://roundtrips4you.us18.list-manage.com/subscribe/post?u=ca8f607f808c8e5a9812aec8f&amp;id=c64c971288"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                class="validate"
                target="_blank"
                novalidate
              >
                <div id="mc_embed_signup_scroll">
                  <label
                    for="mce-EMAIL"
                    style="font-size:18px"
                  >Newsletter</label>
                  <input
                    type="email"
                    value=""
                    name="EMAIL"
                    class="email"
                    id="mce-EMAIL"
                    placeholder="Email Adresse"
                    required
                  >
                  <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                  <div
                    style="position: absolute; left: -5000px;"
                    aria-hidden="true"
                  ><input
                      type="text"
                      name="b_ca8f607f808c8e5a9812aec8f_c64c971288"
                      tabindex="-1"
                      value=""
                    ></div>
                  <div class="clear">
                    <q-btn
                      type="submit"
                      value="Subscribe"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      color="primary"
                      style="margin-top:5px;"
                    >Anmelden</q-btn>
                  </div>
                </div>
              </form>
            </div>

            <!--End mc_embed_signup-->
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
    <!-- <div
      class="register-btn"
      v-if="!user && !isInTrialMode && $router.currentRoute.fullPath !== '/registrieren'"
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
    </div> -->
  </q-layout>
</template>
<style lang="less">
@import "../css/site.less";
</style>
<script>
// import(/* webpackPrefetch: true */ '../css/site.less')
import { auth, db } from '../firebaseInit.js'
import { Loading, date } from 'quasar'

let forEachCalled = false
let redirected = false
let messages = []

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
      isOnNetlifyPage: false,
      isInTrialMode: false,
      RTId: null,
      drawer: false,
      messages: [],
      showWelcomeTooltip: true,
      undreadNotifications: 0,
      showHeader: true,
      lastScrollPosition: 0
    }
  },
  meta () {
    return {
      title: 'Reiseplaner',
      titleTemplate: title => `${title} | Roundtrips4you - Reise kostenlos planen | Route, Reise zusammenstellen`,
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
      auth.logout(this.$router, this.$store)
    },
    hideMenu () {
      this.$refs.svg.classList.remove('active')
      this.$refs.Header.classList.remove('active')
    },
    getStringDateFromTimestamp (timestamp) {
      const initDate = new Date(timestamp.seconds * 1000)
      return date.formatDate(initDate, 'DD.MM.YYYY HH:mm')
    },
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return
      }
      if (window.matchMedia('(max-width: 550px)').matches) this.showHeader = currentScrollPosition < this.lastScrollPosition

      let stickyEls = document.getElementsByClassName('sticky')
      if (stickyEls.length > 0) {
        if (window.pageYOffset + stickyEls[0].getBoundingClientRect().top >= 350) {
          this.showHeader ? stickyEls[0].classList.remove('at-top') : stickyEls[0].classList.add('at-top')
        } else {
          stickyEls[0].classList.add('at-top')
        }
      }

      this.lastScrollPosition = currentScrollPosition
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
    getRTId () {
      if (this.RTId === null) {
        const params = this.$route.params.id
        let RTId = params

        if (params.includes('&')) {
          RTId = params.split('&')[0]
        }
        this.RTId = RTId
      }
    },
    leaving () {
      window.addEventListener('beforeunload', (event) => {
        if ((this.user && (document.activeElement.tagName === 'INPUT' || document.activeElement.classList.contains('q-editor__content'))) || this.isInTrialMode) {
          // any element is still in focus or user is in trial mode
          event.returnValue = 'You have unfinished changes!'
        }
      })
    },
    getNotifications () {
      if (auth.user()) {
        let roundtripsRef = db.collection('PushNotifications')
          .orderBy('createdAt', 'desc')
        roundtripsRef.get()
          .then(snapshot => {
            messages = []
            snapshot.forEach(doc => {
              if (!doc.data().UserUID || doc.data().UserUID === auth.user().uid) {
                let index = messages.push(doc.data()) - 1
                messages[index].id = doc.id
              }
            })
            this.messages = messages
            this.setUnreadNotifications()
          })
      }
    },
    setUnreadNotifications () {
      let userRef = db.collection('User')
        .where('UserUID', '==', auth.user().uid)
        .limit(1)
      userRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let count = 0
            this.messages.forEach(message => {
              if ((message.UserUID && !message.AlreadySeen) || (message.SeenUsers && !Array.from(message.SeenUsers).includes(auth.user().uid))) {
                if (doc.data().createdAt < message.createdAt) count++
              }
            })
            this.undreadNotifications = count
          })
        }).catch(ex => {
          console.log(ex)
        })
    },
    // getDateFromTimestamp (timestamp) {
    //   return new Date(timestamp.seconds * 1000)
    // },
    markAllMessagesSeen () {
      let context = this
      this.messages.forEach(message => {
        if (message.UserUID && !message.AlreadySeen) {
          db.collection('PushNotifications').doc(message.id).update({
            'AlreadySeen': true
          }).then(results => {
            if (context.undreadNotifications !== 0) context.undreadNotifications--
          }).catch(ex => {
            console.log(ex)
          })
        } else if (message.SeenUsers && !message.SeenUsers.includes(auth.user().uid)) {
          let updatedSeenUsers = Array.from(message.SeenUsers)
          updatedSeenUsers.push(auth.user().uid)

          db.collection('PushNotifications').doc(message.id).update({
            'SeenUsers': updatedSeenUsers
          }).then(results => {
            if (context.undreadNotifications !== 0) context.undreadNotifications--
          }).catch(ex => {
            console.log(ex)
          })
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
          message: 'Verbindung wiederhergestellt'
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
  beforeRouteUpdate (to, from, next) {
    // lock all other pages except register
    if (this.isInTrialMode && to.path !== '/registrieren') {
      const answer = window.confirm('Willst du diese Seite wirklich verlassen, deine Rundreise ist nicht gespeichert!')
      if (answer) {
        this.isInTrialMode = false
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }

    if (to.path.split('/')[1] === 'rundreise-bearbeiten' && auth.user() === null) {
      this.isInTrialMode = true
      this.getRTId()
    }
  },
  mounted () {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('online', this.updateOnlineStatus)
    window.removeEventListener('offline', this.updateOnlineStatus)
    window.removeEventListener('scroll', this.onScroll)
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
        // let verified = auth.user() ? auth.user().emailVerified : false
        forEachCalled = true
        let requireAuth = to.matched.some(record => record.meta.requireAuth)
        let guestOnly = to.matched.some(record => record.meta.guestOnly)
        let isOnLoginPage = to.path === '/login'
        let isOnRoundtripsPage = to.path === '/meine-rundreisen'

        if (!isOnLoginPage && requireAuth && !loggedIn) next('login')
        else if (!isOnRoundtripsPage && guestOnly && loggedIn) next('meine-rundreisen')
        else next()

        redirected = true
      })

      let isOnDetailsPage = false
      if (!forEachCalled) {
        let loggedIn = auth.user() !== null
        let currentRoute = this.$router.currentRoute
        let requireAuth = currentRoute.matched.some(record => record.meta.requireAuth)
        let guestOnly = currentRoute.matched.some(record => record.meta.guestOnly)
        let isOnLoginPage = currentRoute.fullPath === '/login'
        let isOnRoundtripsPage = currentRoute.fullPath === '/meine-rundreisen'

        if (!isOnLoginPage && requireAuth && !loggedIn) this.$router.replace('login')
        else if (!isOnRoundtripsPage && guestOnly && loggedIn) this.$router.replace('meine-rundreisen')

        isOnDetailsPage = currentRoute.fullPath.split('/')[1] === 'rundreisen-details'
        redirected = true
      }

      this.getNotifications()

      if (redirected && !isOnDetailsPage) {
        redirected = false
        this.showPreload = false
        Loading.hide()
      }
    })
  }
}
</script>
