<template>
  <div class="register q-px-lg q-pb-md">
    <h2>Registrieren</h2>
    <p style="text-align:center; font-size:20px; padding-bottom:10px;">Registriere dich jetzt und nutze alle unsere Funktionen komplett kostenlos</p>
    <q-form
      @submit="signUp"
      bordered
      class="q-gutter-md rounded-borders flex column"
      style="align-items:center;"
    >
      <q-input
        v-model="userEmail"
        outlined
        type="email"
        :rules="[val => val !== null && val !== '' || 'Bitte wähle gib eine Email an', val => reg.test(val) || 'Bitte gib eine richtige Email an']"
        label="Email"
      />
      <q-input
        v-model="password"
        outlined
        :type="isPwd ? 'password' : 'text'"
        label="neues Passwort"
        :rules="[val => val !== null && val !== '' || 'Bitte gib dein neues Passwort ein']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input
        v-model="passwordRepeat"
        outlined
        :type="isPwdRepeat ? 'password' : 'text'"
        label="neues Passwort wiederholen"
        :rules="[val => val !== null && val !== '' || 'Bitte wiederhole dein Passwort',
           val => val === password || 'Die beiden Passwörter stimmen nicht überein']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwdRepeat ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwdRepeat = !isPwdRepeat"
          />
        </template>
      </q-input>
      <div style="padding:10px;">
        <q-btn
          type="submit"
          :loading="submitting"
          label="Registrieren"
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
        label="mit google registrieren"
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
    <span style="font-size:18px;">Du hast bereits einen Account ? Dann <router-link to="/login">logge</router-link> dich jetzt ein.</span>
  </div>
</template>

<script>
import { auth, db } from '../firebaseInit'
import firebase from 'firebase'

export default {
  metaInfo: {
    meta: [
      { name: 'description', content: 'Registriere dich jetzt kostenlos bei roundtrips4you und erstelle selbst deine eigenen Reisen. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag...' }
    ]
  },
  name: 'Register',
  data () {
    return {
      userEmail: '',
      password: '',
      passwordRepeat: '',
      isPwd: true,
      isPwdRepeat: true,
      submitting: false,
      googleLoading: false,
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  methods: {
    signUp () {
      let context = this
      let mail = this.userEmail
      auth.authRef().createUserWithEmailAndPassword(mail, this.password).then(
        (user) => {
          this.createUserEntry(user)
          context.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Juhuuu dein Konto wurde erfolgreich erstellt'
          })
          context.$router.replace('email-bestaetigen')
        },
        (err) => {
          console.log(err)
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Oh nein, du konntest leider nicht registriert werden'
          })
        }
      )
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
    },
    createUserEntry (user) {
      console.log(user)
      db.collection('User').add({
        Reputation: 0,
        UserImage: user.photoURL,
        UserName: user.displayName,
        UserUID: user.uid
      })
    }
  }
}
</script>

<style>
@import "../css/login.less";
</style>
