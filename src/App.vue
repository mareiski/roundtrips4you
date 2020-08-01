<template>
  <div id="q-app">
    <router-view />
    <span
      id="notSupportedBrowserSpan"
      style="display:none;"
    >Dein Browser wird leider nicht unterstützt. Bitte füre ein Update durch.</span>
  </div>
</template>

<script>
const supportedBrowsers = require('../supportedBrowsers')

if (!supportedBrowsers.test(navigator.userAgent)) {
  alert('Dein browser wird leider nicht nicht unterstützt.')
}
export default {
  name: 'App'
}
</script>
