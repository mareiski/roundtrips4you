<template>
  <div
    class="flex hotel-search"
    style="flex-direction:column;"
  >
    <q-input
      v-model="hotelName"
      outlined
      :loading="searchingForHotels"
      label="Hotelname suchen"
      style="width:300px; padding:0;"
      @click="hotelListVisible ? hotelListVisible = false : hotelListVisible = true"
      :rules="val => val !== null && val !== '' || 'Bitte wähle ein Hotel'"
    >
      <template v-slot:append>
        <q-btn
          icon="search"
          @click="searchHotel()"
          round
        ></q-btn>
      </template>
    </q-input>
    <q-card>
      <q-list>
        <q-item
          clickable
          @click="[hotelName = hotel.hotel.name, hideHotelList()]"
          v-show="hotelListVisible"
          v-for="hotel in hotels"
          :key="hotel"
        >
          {{hotel != null ? hotel.hotel.name : 'Es konnten keine Hotels gefunden werden'}}
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>
<style lang="less" scoped>
@import url("../../css/hotelSearch.less");
</style>
<script>
import axios from 'axios'
var querystring = require('querystring')

export default {
  data () {
    return {
      hotelName: '',
      hotels: [],
      searchingForHotels: false,
      hotelListVisible: false
    }
  },
  props: {
    lat: String,
    long: String
  },
  methods: {
    searchHotel () {
      this.searchingForHotels = true
      this.getHotels(this.hotelName, this.lat, this.long).then((results) => {
        if (results !== null) {
          this.hotels = results.data.data
          if (this.hotels.length === 0) this.hotels = { hotel: null }
        } else {
          this.hotels = { hotel: null }
        }
        this.hotelListVisible = true
        this.searchingForHotels = false
      })
    },
    hideHotelList () {
      this.hotelListVisible = false
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

          axios.get('https://test.api.amadeus.com/v2/shopping/hotel-offers?latitude=' + lat + '&longitude=' + long + '&includeClosed=true&radius=50&currency=EUR&hotelName=' + hotelName + '&lang=de&view=NONE', {
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
