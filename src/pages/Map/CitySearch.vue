<template>
  <div>
    <q-select
      outlined=""
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      clearable
      ref="select"
      v-model="searchLocation"
      hide-dropdown-icon
      :label="!parkingPlaceSearch ? 'Ort suchen' : 'Parkplatz suchen (optional)'"
      :options="countryOptions"
      @filter="filterFn"
      @input="$emit('update', $event)"
      style="width:300px;"
      :rules="!parkingPlaceSearch ? [val => val !== null && val !== '' || 'Bitte wähle einen Ort'] : []"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            zu viele/keine Ergebnisse, bitte weitertippen
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:prepend>
        <q-icon :name="!parkingPlaceSearch ? 'location_on' : 'local_parking'" />
      </template>
    </q-select>
  </div>
</template>
<script>
import { OpenStreetMapProvider } from 'leaflet-geosearch'

const provider = new OpenStreetMapProvider()

export default {
  name: 'Map',
  props: {
    parkingPlaceSearch: Boolean,
    defaultLocation: String
  },
  data () {
    return {
      searchLocation: '',
      countryOptions: null
    }
  },
  methods: {
    filterFn (val, update, abort) {
      if (val.length < 2 && this.countryOptions != null) {
        abort()
        return
      }

      update(() => {
        provider.search({ query: val }).then((results) => {
          this.countryOptions = results
        })
      })
    },
    clear () {
      this.searchLocation = ''
      this.countryOptions = null
      this.$refs.select.resetValidation()
    }
  },
  created () {
    if (this.defaultLocation !== null) this.searchLocation = this.defaultLocation
  }
}

</script>
