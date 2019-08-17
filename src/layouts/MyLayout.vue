<template>
  <q-layout view="lHh Lpr lFf">
    <div id="Header">
      <div class="top-row">
        <div class="left-col">
          <a href="/">
            <img src="../statics/logo.png" />
          </a>
        </div>
        <div class="center-col">
          <a href="/">
            <img src="../statics/textLogo.png" />
          </a>
        </div>
        <div class="right-col">
          <router-link
            class="header-page-link"
            to="/"
          >home</router-link>
          <router-link
            class="header-page-link"
            to="/rundreisen"
          >rundreisen</router-link>
          <router-link
            class="header-page-link"
            to="/ueber"
          >über uns</router-link>
          <q-avatar
            size="50px"
            style="width: 50px; margin-top:5px;"
            :style="user ? null : 'font-size:60px;'"
            :icon="user ? null : 'account_circle'"
            @click="user ? null : $router.push('login')"
          >
            <img
              v-if="user"
              :src="user.photoURL"
            >
            <q-menu v-if="user">
              <q-list style="min-width: 100px">
                <q-item
                  clickable
                  v-close-popup
                >
                  <q-item-section>
                    <router-link to="/profil">Profil</router-link>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                >
                  <q-item-section>
                    <router-link to="/meine-rundreisen">Meine Rundreisen</router-link>
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
              onclick="this.classList.toggle('active'); document.getElementById('Header').classList.toggle('active');"
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
        <router-link
          class="mobile-header-page-link"
          to="/"
        >home</router-link>
        <router-link
          class="mobile-header-page-link"
          to="/rundreisen"
        >rundreisen</router-link>
        <router-link
          class="mobile-header-page-link"
          to="/ueber"
        >über uns</router-link>
      </div>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
    <footer>
      <div class="left-footer-col">
        <a href="/">
          <img src="../statics/logo.png" />
        </a>
      </div>
      <div class="right-footer-col">
        <div class="footer-menu">
          <h3 class="footer-title">Menü</h3>
          <router-link
            class="footer-link"
            to="/"
          >home</router-link>
          <router-link
            class="footer-link"
            to="/rundreisen"
          >rundreisen</router-link>
          <router-link
            class="footer-link"
            to="/ueber"
          >über uns</router-link>
        </div>
        <div class="footer-infos">
          <h3 class="footer-title">Infos</h3>
          <a class="footer-link">Impressum</a>
          <a class="footer-link">Haftungsauschluss</a>
          <a class="footer-link">Datenschutz</a>
          <a class="footer-link">AGBs</a>
          <a class="footer-link">Online Streitbeilegung</a>
        </div>
        <div class="footer-contact">
          <h3 class="footer-title">Kontakt</h3>
          <a class="footer-link contact-link-box">
            <span class="footer-text">roundtrips4you GbR</span>
            <span class="footer-text">Am See 20</span>
            <span class="footer-text">85077 Manching</span>
          </a>
          <a class="footer-link">hello@roundtrips4you.de</a>
        </div>
      </div>
    </footer>
  </q-layout>
</template>

<script>
import { auth } from '../firebaseInit'

export default {
  name: 'MyLayout',
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    logOut () {
      auth.logout()
    }
  }
}
</script>

<style lang="less">
@import "../css/site.less";
</style>
