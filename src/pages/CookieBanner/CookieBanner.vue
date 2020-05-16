<template>
  <div
    class="cookie-banner"
    v-if="!cookiesAllowed"
  >
    <span>Wir benutzen Cookies und Analyse tools. Mit der Benutzung dieser Seite erklärst du dich damit einverstanden.</span>
    <q-btn
      label="Ok"
      class="q-mt-md"
      color="primary"
      @click="[cookiesAllowed = true, setAllowedCookie()]"
      text-color="white"
    ></q-btn>
  </div>
</template>
<script>
import(/* webpackPrefetch: true */ '../../css/cookie.less')
export default {
  data () {
    return {
      cookiesAllowed: false
    }
  },
  methods: {
    setAllowedCookie () {
      this.$q.cookies.set('cookies_allowed', true, { expires: 10 })
    }
  },
  created () {
    let cookiesAllowedCookie = this.$q.cookies.get('cookies_allowed')
    if (cookiesAllowedCookie) {
      this.cookiesAllowed = true
    }
  }
}
</script>
