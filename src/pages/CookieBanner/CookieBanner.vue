<template>
  <div
    class="cookie-banner"
    v-if="!cookiesAllowed"
  >
    <span>Diese Seite benutzt Cookies. Mit der benutzung dieser Seite erklärst du dich damit einverstanden.</span>
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
import(/* webpackPreload: true */ '../../css/cookie.less')
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
