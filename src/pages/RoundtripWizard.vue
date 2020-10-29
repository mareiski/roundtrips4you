<template>
  <div class="roundtrip-wizard  q-px-lg q-pb-md">
    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Reiseziel wählen"
        icon="settings"
        :done="step > 1"
        :header-nav="step > 1"
      >

        <div class="flex justify-around">
          <q-card bordered>
            <q-card-section>
              <div class="text-h6">Land wählen</div>
              <p>Wähle ein Land aus, damit dir Städte vorgeschlagen werden können</p>
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <q-select
                outlined
                v-model="country"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="countryOptions"
                label="Land auswählen"
                @filter="filterCountries"
                @input="step = 2"
                :rules="[val => val !== null && val !== '' && val !== 'Land wählen' || 'Bitte wähle ein Land']"
              >
                <template v-slot:prepend>
                  <q-icon name="explore" />
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Keine Ergebnisse
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

            </q-card-section>
          </q-card>

          <q-card bordered>
            <q-card-section>
              <div class="text-h6">Ort direkt hinzufügen</div>
              <p>Wähle einen Ort aus um in direkt zur Reise hinzuzufügen</p>

            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <CitySearch
                ref="citySearch"
                :parkingPlaceSearch="false"
                :defaultLocation="location"
                @update="updateLocation($event)"
              ></CitySearch>
            </q-card-section>
          </q-card>
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Inspiration"
        icon="create_new_folder"
        :done="step > 2"
        :header-nav="step > 2"
      >

        <CitySuggestion
          :dates="null"
          :RTId="$route.params.id"
          :predefinedCountry="country"
        ></CitySuggestion>
      </q-step>

      <q-step
        :name="3"
        title="Details hinzufügen"
        icon="add_comment"
        :done="step > 3"
        :header-nav="step > 3"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.

        <q-stepper-navigation>
          <q-btn
            color="primary"
            @click="() => { done3 = true; step = 4 }"
            label="Weiter"
          />
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Reiseübersicht"
        icon="add_comment"
        :header-nav="step > 4"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.

        <q-stepper-navigation>
          <q-btn
            color="primary"
            @click="done4 = true"
            label="Finish"
          />
          <q-btn
            flat
            @click="step = 3"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>
<script>
import { countries } from '../countries.js'

export default {
  components: {
    CitySearch: () => import('../pages/Map/CitySearch.vue'),
    CitySuggestion: () => import('../pages/Map/CitySuggestion.vue')
  },
  data () {
    return {
      step: 1,
      countryOptions: countries,
      country: 'Land wählen',
      location: null
    }
  },
  methods: {
    /**
     * filter countries method used in filter method of quasar select component
     */
    filterCountries (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = countries.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    /**
   * update location object witch city search results
   * @param event event from city search update callback
   */
    updateLocation (event) {
      if (event !== null) {
        this.location = {
          lng: event.x,
          lat: event.y,
          label: event.label
        }
        this.step = 3
      } else {
        this.location = null
      }
    }
  }
}
</script>
