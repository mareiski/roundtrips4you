<template>
  <div v-if="user">
    <h1>Hello USER!</h1>
    <img
      :src="user.photoURL"
      width="100"
    > <br>
    <h3>{{user.displayName}}</h3>
    <p>{{user.email}}</p>
    <button @click="logOut">Log out</button>
    <br><br><br>
    <pre>{{user}}</pre>
  </div>
</template>

<script>
import auth from '../firebaseInit'

export default {
  name: 'auth-success',
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
