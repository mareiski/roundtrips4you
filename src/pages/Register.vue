<template>
  <div class="register q-px-lg q-pb-md">
    <h1>Registrieren</h1>
    <p style="text-align:center; font-size:20px; padding-bottom:10px;">{{!isInDemoSession ? 'Starte jetzt durch und nutze all unsere Funktionen komplett kostenlos' : 'Registriere dich jetzt um deine erstellte Rundreise zu speichern'}}</p>
    <q-form
      @submit="signUp"
      bordered
      class="q-gutter-md rounded-borders flex column"
      style="align-items:center;"
      method="post"
      target="_blank"
      action="https://roundtrips4you.us18.list-manage.com/subscribe/post?u=ca8f607f808c8e5a9812aec8f&id=c64c971288&gdpr[71542]=true"
    >
      <q-input
        v-model="userEmail"
        outlined
        type="email"
        :rules="[val => val !== null && val !== '' || 'Bitte gib eine Email an', val => reg.test(val) || 'Bitte gib eine richtige Email an']"
        label="Email"
        lazy-rules
        name="EMAIL"
      />
      <q-input
        v-model="password"
        outlined
        :type="isPwd ? 'password' : 'text'"
        label="neues Passwort"
        lazy-rules
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
        lazy-rules
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
          style="width:300px;"
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
    <p style="text-align:center;">Mit der Registrierung stimmst du zu das wir dir Emails an deine angegebene Adresse senden dürfen.</p>
    <br>
    <div class="legal-container">
      <q-list bordered>
        <q-expansion-item label=" Warum muss man sich bei Roundtrips4you registrieren?">
          <q-card>
            <q-card-section>
              <p>Bei uns musst du dich nur Registrieren, damit wir deine Reisen auch dir zuordnen können.</p>
              <p>Leider geht dies nur wenn du einen Account hast der eindeutig zu dir gehört (deshalb brauchen wir deine Email Adresse).</p>
              <p>Nach der Registrierung musst du allerdings gar keine weiteren Daten angeben, wenn du das nicht möchtest.</p>
              <p>Natürlich kannst du uns auch jederzeit unter <a href="mailto:hello@roundtrips4you.de">hello@roundtrips4you.de</a> Fragen zum Datenschutz stellen oder einfach in der Datenschutzerklärung nachlesen.</p>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
    <br>
    <div style="font-size:18px; text-align:center;">Du hast bereits einen Account? <router-link to="/login">Jetzt Anmelden</router-link>
    </div>
  </div>
</template>

<script>
import(/* webpackPrefetch: true */ '../css/login.less')
import { auth, db } from '../firebaseInit.js'
const getFirebase = () => import('firebase')
import sharedMethods from '../sharedMethods.js'

let timeStamp = Date.now()
var actionCodeSettings = {
  url: 'https://roundtrips4you.de/login',
  // This must be true.
  handleCodeInApp: true
}

export default {
  meta: {
    title: 'Registrieren',
    meta: {
      description: { name: 'description', content: 'Registriere dich jetzt kostenlos bei roundtrips4you und erstelle selbst deine eigenen Reisen. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag...' }
    }
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
  computed: {
    isInDemoSession () {
      return this.$store.getters['demoSession/isInDemoSession']
    }
  },
  methods: {
    signUp (evt) {
      let context = this
      let mail = this.userEmail

      auth.authRef().createUserWithEmailAndPassword(mail, this.password).then(
        (user) => {
          context.createUserEntry(user)
          if (context.isInDemoSession) context.$store.dispatch('demoSession/saveRoundtrip', user.user.uid)
          context.$store.commit('demoSession/resetRoundtrip')
          sharedMethods.showSuccessNotification('Juhuuu dein Konto wurde erfolgreich erstellt')

          evt.target.submit()
          context.$router.replace('meine-rundreisen')
        },
        (err) => {
          console.log(err)
          sharedMethods.showErrorNotification('Oh nein, du konntest leider nicht registriert werden')
        }
      )
    },
    signUpWithGoogle () {
      getFirebase().then(firebase => {
        var provider = new firebase.auth.GoogleAuthProvider()
        let context = this
        auth.authRef().signInWithPopup(provider).then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken
          const credential = firebase.auth.GoogleAuthProvider().credential(token)

          context.createUserEntry(result.user)

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
    },
    verifyMail (user) {
      if (!user.emailVerified) {
        user.sendEmailVerification(actionCodeSettings).then(function () {
          sharedMethods.showSuccessNotification('Wir haben dir eine Bestätigungsmail für deine Email gesendet')
        }).catch(function (error) {
          console.log(error)
          sharedMethods.showErrorNotification('Oh nein, wir konnten dir leider keine email senden, bitte kontaktiere uns unter hello@roundtrips4you.de')
        })
      }
    },
    createUserEntry (user) {
      db.collection('User').add({
        Reputation: 0,
        UserImage: user.user.photoURL,
        UserName: user.user.displayName,
        UserUID: user.user.uid,
        createdAt: new Date(timeStamp)
      })

      this.verifyMail(user.user)
    }
  }
}
</script>
