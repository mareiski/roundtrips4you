<template>
  <div class="login q-px-lg q-pb-md">
    <h1>Anmelden</h1>
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
        :rules="[val => val !== null && val !== '' || 'Bitte gib eine Email an', val => reg.test(val) || 'Bitte gib eine richtige Email an']"
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
          style="width:300px;"
        >
          <template v-slot:loading>
            <q-spinner />
          </template>
        </q-btn>
      </div>
    </q-form>
    <div class="flex justify-center">
      <q-btn
        label="Passwort vergessen"
        class="q-mt-md"
        style="width:300px;"
        @click="showResetPasswordDialog = true"
      >
      </q-btn>
    </div>
    <q-dialog v-model="showResetPasswordDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-input
            v-model="userEmail"
            outlined
            type="email"
            lazy-rules
            :rules="[val => val !== null && val !== '' || 'Bitte gib eine Email an', val => reg.test(val) || 'Bitte gib eine richtige Email an']"
            label="Email"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Passwort zurücksetzen"
            @click="resetPassword()"
            color="primary"
            v-close-popup
          />
          <q-btn
            flat
            label="Abbrechen"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="google-form">
      <div class="form-option">oder</div>
      <q-btn
        :loading="googleLoading"
        label="google konto verwenden"
        class="q-mt-md google-btn"
        style="width:300px;"
        icon="fab fa-google"
        @click="signUpWithGoogle"
      >
        <template v-slot:loading>
          <q-spinner />
        </template>
      </q-btn>
    </div>
    <br>
    <div style="font-size:18px; text-align:center; width:100%;">Du hast noch kein Konto? <router-link to="/registrieren">Jetzt Registrieren</router-link>
    </div>
  </div>
</template>

<script>
import(/* webpackPrefetch: true */ '../css/login.less')
import { auth } from '../firebaseInit.js'
const getFirebase = () => import('firebase')

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
      googleLoading: false,
      showResetPasswordDialog: false,
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
    resetPassword () {
      let context = this
      auth.sendPasswordResetEmail(this.userEmail).then(function () {
        // Email sent.
        context.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Wir haben dir eine Email mit einem Resetlink gesendet'
        })
      }).catch(function (error) {
        console.log(error)

        // An error happened.
        context.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Ups da ist ein Fehler aufgetreten, versuch es noch einmal'
        })
      })
    },
    signUpWithGoogle () {
      getFirebase().then(firebase => {
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
      })
    }
  }
  // uncomment following to manually verfiy mail
  // created () {
  //   var actionCodeSettings = {
  //     url: 'https://roundtrips4you.de/login',
  //     // This must be true.
  //     handleCodeInApp: true
  //   }

  //   const email = 'jonas_eberwein@web.de'

  //   auth.authRef().sendSignInLinkToEmail(email, actionCodeSettings)
  //     .then(function () {
  //       // The link was successfully sent. Inform the user.
  //       // Save the email locally so you don't need to ask the user for it again
  //       // if they open the link on the same device.
  //       window.localStorage.setItem('emailForSignIn', email)
  //     })
  //     .catch(function (error) {
  //       // Some error occurred, you can inspect the code: error.code
  //       console.log(error)
  //     })
  // }
}
</script>
