<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">Oh nein, da ist wohl was verloren gegangen...<strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Zurück zum Start</q-btn>
  </div>
</template>

<script>
import { Loading } from 'quasar'

export default {
  name: 'Error404',
  created () {
    Loading.hide()
  }
}
</script>
