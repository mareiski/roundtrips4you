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
      @click="cookiesAllowed = true"
      text-color="white"
    ></q-btn>
  </div>
</template>
<style lang="less" scoped>
@import url("../../css/cookie.less");
</style>
<script>
export default {
  data () {
    return {
      cookiesAllowed: false
    }
  }
}
</script>
