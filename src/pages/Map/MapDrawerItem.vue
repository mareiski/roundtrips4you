<template>
  <div>
    <div style="position:fixed; background: #707070; width:100%; z-index:1; heigth:38px;">
      <q-icon
        class="cursor-pointer"
        name="arrow_back_ios"
        size="18px"
        style="padding-left:20px; padding-top:20px; margin-bottom:25px; "
        @click="switchToList()"
      ></q-icon>
    </div>
    <CitySuggestion
      ref="CitySuggestion"
      @update="update($event)"
      :alreadyAddedCities="alreadyAddedCities"
      style="padding-top:50px;"
    ></CitySuggestion>
  </div>
</template>

<script>
import sharedMethods from '../../sharedMethods.js'
import CitySuggestion from '../CitySuggestion/CitySuggestion.vue'

export default {
  name: 'MapDrawerItem',
  components: {
    CitySuggestion
  },
  props: {
    alreadyAddedCities: Array
  },
  methods: {
    switchToList () {
      if (!this.$refs.CitySuggestion.POIMode) sharedMethods.getParent('Map', this).switchDrawerToList()
      else this.$refs.CitySuggestion.switchToCountryMode()
    },
    update (event) {
      this.$emit('update', event)
    }
  }
}
</script>
