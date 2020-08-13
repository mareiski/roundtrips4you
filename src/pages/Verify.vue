<template>
  <div class="login q-px-lg q-pb-md">
    <h2>Email bestätigen</h2>
    <h4>Gleich geschafft!</h4>
    <div class="flex">
      <q-icon
        size="40px"
        name="email"
        style="margin-right:20px;"
      />
      <span>Dir wurde ein Bestätigungslink an deine Email-Adresse geschickt. <br> Bitte öffne dein Postfach und klicke auf den Link, um dich anzumelden.</span>
    </div>
  </div>
</template>
<script>
import { auth } from '../firebaseInit.js'

var actionCodeSettings = {
  url: 'https://roundtrips4you.de/login',
  // This must be true.
  handleCodeInApp: true
}

export default {
  name: 'Register',
  data () {
    return {}
  },
  methods: {
    verifyMail () {
      let context = this
      if (!auth.user().emailVerified) {
        auth.user().sendEmailVerification(actionCodeSettings).then(function () {
          context.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Wir haben dir eine Bestätigungsmail gesendet'

          })
        }).catch(function (error) {
          console.log(error)
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Oh nein, wir konnten dir leider keine email senden, bitte Kontaktiere uns unter hello@roundtrips4you.de'
          })
        })
      }
    }
  },
  created () {
    this.verifyMail()
  }
}
</script>
