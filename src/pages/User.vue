<template>
  <div v-if="user">
    <h3>Hallo {{user.displayName}}!</h3>
    <img
      :src="user.photoURL"
      width="100"
    > <br>
    <p>{{user.email}}</p>
    <br><br><br>
    <pre>{{user}}</pre>
  </div>
</template>

<script>
import { auth } from '../firebaseInit'

export default {
  name: 'user',
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
