<template>
  <div>
    <q-select
      outlined=""
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      clearable
      v-model="searchLocation"
      hide-dropdown-icon
      label="Stadt suchen"
      :options="countryOptions"
      @filter="filterFn"
      @filter-abort="abortFilterFn"
      @input="$emit('update', $event)"
      style="width:300px;"
      :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Stadt']"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            Keine Ergebnisse, bitte weitertippen
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-select>
  </div>
</template>
<script>
import { OpenStreetMapProvider } from 'leaflet-geosearch'

const provider = new OpenStreetMapProvider()

export default {
  name: 'Map',
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
    abortFilterFn () {
      // console.log('delayed filter aborted')
    }
  }
}

</script>
