<template>
  <div class="login q-px-lg q-pb-md">
    <h2>Log in</h2>
    <p style="text-align:center; font-size:20px; padding-bottom:10px;">Willkommen zurück, logge dich ein um zu deinen Reisen zu kommen</p>
    <q-form
      @submit="onUserLogin"
      bordered
      class="q-gutter-md rounded-borders flex column"
      style="align-items:center;"
    >
      <q-input
        v-model="userEmail"
        outlined
        type="email"
        lazy-rules
        :rules="[val => val !== null && val !== '' || 'Bitte wähle gib eine Email an', val => reg.test(val) || 'Bitte gib eine richtige Email an']"
        label="Email"
      />
      <q-input
        v-model="password"
        outlined
        :type="isPwd ? 'password' : 'text'"
        label="Passwort"
        :rules="[val => val !== null && val !== '' || 'Bitte gib dein Passwort ein']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div style="padding:10px;">
        <q-btn
          type="submit"
          :loading="submitting"
          label="Login"
          class="q-mt-md"
          color="primary"
          text-color="white"
        >
          <template v-slot:loading>
            <q-spinner />
          </template>
        </q-btn>
      </div>
    </q-form>
    <div class="google-form">
      <span style="text-align:center;">oder</span><br>
      <q-btn
        :loading="googleLoading"
        label="mit google anmelden"
        class="q-mt-md google-btn"
        color="primary"
        text-color="white"
        @click="signUpWithGoogle"
      >
        <template v-slot:loading>
          <q-spinner />
        </template>
      </q-btn>
    </div>
    <br>
    <span style="font-size:18px;">Du hast noch gar keinen Account ? Dann <router-link to="/registrieren">registriere</router-link> dich noch heute !</span>
  </div>
</template>

<script>
import(/* webpackPrefetch: true */ '../css/login.less')
import { auth } from '../firebaseInit'
import firebase from 'firebase'

export default {
  meta: {
    title: 'Login',
    meta: {
      description: { name: 'description', content: 'Jetzt bei deinem Reiseplaner Roundtrips4you anmelden. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...' }
    }
  },
  name: 'login',
  data () {
    return {
      userEmail: '',
      password: '',
      passwordRepeat: '',
      isPwd: true,
      isPwdRepeat: true,
      submitting: false,
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  methods: {
    onUserLogin () {
      let context = this
      auth.authRef().signInWithEmailAndPassword(this.userEmail, this.password).then(function () {
        context.$router.replace({ path: '/meine-rundreisen' })
      }).catch(function (error) {
        console.log(error)
        if (error.code === 'auth/user-not-found') {
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Diesen Benutzer konnten wir nicht finden'
          })
        } else {
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Das Passwort oder der Benutzername ist leider falsch'
          })
        }
      })
    },
    signUpWithGoogle () {
      var provider = new firebase.auth.GoogleAuthProvider()
      let context = this
      auth.authRef().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken
        const credential = firebase.auth.GoogleAuthProvider().credential(token)

        // Sign in with credential from the Google user.
        auth.signInWithCredential(credential).then(function () {
          context.$router.replace('meine-rundreisen')
        }).catch(function (error) {
          console.log(error)
        })
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
