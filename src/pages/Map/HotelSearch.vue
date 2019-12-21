<template>
  <div>
    <q-select
      outlined
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      clearable
      ref="select"
      v-model="hotelName"
      hide-dropdown-icon
      label="Hotelname suchen"
      :options="hotels"
      @filter="filterFn"
      @input="$emit('update', $event)"
      style="width:300px;"
      :rules="val => val !== null && val !== '' || 'Bitte wähle ein Hotel'"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            zu viele/keine Ergebnisse, bitte weitertippen
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:append>
        <q-icon :name="!parkingPlaceSearch ? 'location_on' : 'local_parking'" />
      </template>
    </q-select>
  </div>
</template>
<script>
import axios from 'axios'
var querystring = require('querystring')

export default {
  data () {
    return {
      hotelName: '',
      hotels: null
    }
  },
  props: {
    lat: Number,
    long: Number
  },
  methods: {
    filterFn (val, update, abort) {
      if (val.length < 2 && this.countryOptions != null) {
        abort()
        return
      }

      update(() => {
        this.getHotels(this.hotelName, this.lat, this.long).then((results) => {
          this.hotels = results
        })
      })
    },
    clear () {
      this.hotelName = ''
      this.hotels = null
      this.$refs.select.resetValidation()
    },
    getHotels (hotelName, long, lat) {
      return new Promise((resolve, reject) => {
        const url = 'https://test.api.amadeus.com/v1/security/oauth2/token'

        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }

        const data = querystring.stringify({
          grant_type: 'client_credentials', // gave the values directly for testing
          client_id: 'NMNW1UbSmcYyd3UVUvGZ5NKUCAcOq2dp',
          client_secret: '5NLWAdMXnOyNxWnk'
        })

        axios.post(url, data, {
          headers: headers,
          form: {
            'grant_type': 'client_credentials',
            'client_id': 'NMNW1UbSmcYyd3UVUvGZ5NKUCAcOq2dp',
            'client_secret': '5NLWAdMXnOyNxWnk'
          }
        }).then(function (response) {
          let token = response.data.access_token
          const tokenString = 'Bearer ' + token

          axios.get('https://test.api.amadeus.com/v2/shopping/hotel-offers?latitude=' + lat + '&longitude=' + long + '&includeClosed=true&radius=10&currency=EUR&hotelName=' + hotelName + '&lang=de&view=NONE', {
            headers: {
              'Authorization': tokenString
            }
          }).then(function (response) {
            resolve(response)
          }).catch(function (error) {
            console.log('Error' + error)
            resolve(null)
          })
        }).catch(function (error) {
          console.log('Error on Authentication' + error)
          resolve(null)
        })
      })
    }
  }

}
</script>
