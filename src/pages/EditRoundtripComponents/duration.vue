<template>
  <q-timeline-entry
    icon="speed"
    :subtitle="duration"
  >
  </q-timeline-entry>
</template>
<script>

export default {
  props: {
    duration: String
  }
}
</script>
