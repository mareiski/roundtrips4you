<template>
  <div class="login q-px-lg q-pb-md">
    <h2>Email bestätigen</h2>
    <span>Die wurde ein bestätigungslink geschickt. <br> Bitte öffne dein Postfach und klicke auf diesen Link, um zu beginnen.</span>
  </div>
</template>
<script>
import { auth } from '../firebaseInit'

var actionCodeSettings = {
  url: 'https://roundtrips4you.netlify.com/login',
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
            icon: 'fas fa-check-circle',
            message: 'Wir haben dir eine Bestätigungsmail gesendet'

          })
        }).catch(function (error) {
          console.log(error)
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Oh nein, wir konnten dir leider keine email senden, bitte versuche es manuell noch einmal'
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
