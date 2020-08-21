<template>
  <div id="q-app">
    <router-view />
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
