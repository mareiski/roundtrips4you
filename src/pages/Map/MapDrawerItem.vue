<template>
  <div>
    <q-icon
      class="cursor-pointer"
      name="arrow_back_ios"
      size="18px"
      style="padding-left:20px; padding-top:20px; margin-bottom:25px;"
      @click="switchToList()"
    ></q-icon>
    <CitySuggestion
      ref="CitySuggestion"
      @update="update($event)"
      :alreadyAddedCities="alreadyAddedCities"
      :isInSuggestionMode="isInSuggestionMode"
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
    alreadyAddedCities: Array,
    isInSuggestionMode: Boolean
  },
  methods: {
    switchToList () {
      sharedMethods.getParent('Map', this).switchDrawerToList()
    },
    update (event) {
      this.$emit('update', event)
    }
  }
}
</script>
