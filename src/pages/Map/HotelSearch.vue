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
          @click="hotel !== null ? [hotelName = hotel.hotel.name, hideHotelList(), $emit('update', hotel)] : showAddHotelDialog = true"
          v-show="hotelListVisible"
          v-for="hotel in hotels"
          :key="hotel"
        >
          {{hotel !== null ? hotel.hotel.name : 'Keine Ergebnisse. Klicken um dieses Hotel hinzuzufügen'}}
        </q-item>
      </q-list>
    </q-card>
    <q-dialog
      persistent
      v-model="showAddHotelDialog"
    >
      <q-stepper
        v-model="step"
        vertical
        color="primary"
        animated
        flat
        style="width:400px"
        keep-alive
      >
        <q-step
          :name="1"
          title="Name & Adresse angeben"
          icon="settings"
          :done="step > 1"
        >
          <q-input
            v-model="hotelName"
            :rules="[val => val !== null &&  val !== ''  || 'Bitte gib den Exakten Namen an']"
            label="Exakter Hotel Name"
            outlined
            style="margin:auto; margin-top:20px; margin-left:0;"
          >
            <template v-slot:prepend>
              <q-icon name="title" />
            </template>
          </q-input>
          <CitySearch
            ref="citySearch"
            :parkingPlaceSearch="false"
            :defaultLocation="null"
            @update="updateLocation($event)"
          ></CitySearch>
          <q-stepper-navigation>
            <q-btn
              @click="step = 2"
              color="primary"
              label="Weiter"
              :disable="!hotelName || !tempLocation"
            />
          </q-stepper-navigation>
        </q-step>
        <q-step
          :name="2"
          title="Bewertung & Email eingeben"
          icon="settings"
        >
          <q-rating
            class="stars"
            v-model="hotelStars"
            size="15px"
            color="gold"
            style="margin:20px 0 15px 0;"
          />
          <q-input
            v-model="hotelEmail"
            outlined
            type="email"
            lazy-rules
            :rules="[val => reg.test(val) || 'Bitte gib eine richtige Email an']"
            label="Email des Hotels (optional)"
          />
          <q-stepper-navigation>
            <q-btn
              color="primary"
              label="Fertig"
              :disable="!hotelStars"
              @click="addHotel()"
            />
            <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Zurück"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-dialog>
  </div>
</template>
<style lang="less" scoped>
@import url("../../css/hotelRegionSearch.less");
</style>
<script>
import axios from 'axios'
import CitySearch from './CitySearch'
var querystring = require('querystring')

export default {
  data () {
    return {
      hotelName: '',
      hotels: [],
      searchingForHotels: false,
      hotelListVisible: false,
      showAddHotelDialog: false,
      tempLocation: {},
      hotelStars: 3,
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      hotelEmail: null,
      step: 1
    }
  },
  components: {
    CitySearch
  },
  props: {
    lat: String,
    long: String,
    checkInDate: String,
    checkOutDate: String,
    roomAmount: Number,
    adults: Number,
    childrenAges: Array
  },
  methods: {
    searchHotel () {
      this.searchingForHotels = true
      this.getHotels(this.hotelName, this.lat, this.long, this.checkInDate, this.checkOutDate, this.roomAmount, this.adults, this.childrenAges).then((results) => {
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
    addHotel () {
      let hotel = {
        hotel: {
          latitude: this.tempLocation.lat,
          longitude: this.tempLocation.lng,
          address: {
            lines: [this.tempLocation.label]
          },
          rating: this.hotelStars,
          name: this.hotelName,
          contact: { email: this.hotelEmail }
        }
      }
      this.$emit('update', hotel)
      this.hideHotelList()
      this.showAddHotelDialog = false
      this.tempLocation = {}
      this.hotelStars = 3
      this.hotelEmail = null
      this.step = 1
    },
    hideHotelList () {
      this.hotelListVisible = false
    },
    updateLocation (event) {
      this.tempLocation = {
        lat: event.y,
        lng: event.x,
        label: event.label
      }
      console.log(event)
    },
    clear () {
      this.hotelName = ''
      this.hotels = null
      this.$refs.select.resetValidation()
    },
    getHotels (hotelName, long, lat, checkInDate, checkOutDate, roomAmount, adults, childrenAges) {
      return new Promise((resolve, reject) => {
        const url = 'https://api.amadeus.com/v1/security/oauth2/token'

        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }

        const data = querystring.stringify({
          grant_type: 'client_credentials', // gave the values directly for testing
          client_id: 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
          client_secret: 'lHQlUheyyAZtGQDA'
        })

        const dateTimeParts = checkInDate.split(' ')
        let dateParts = dateTimeParts[0].split('.')
        console.log(dateParts)
        const formattedCheckInDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]

        dateParts = checkOutDate.split('.')
        const formattedCheckOutDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]

        axios.post(url, data, {
          headers: headers,
          form: {
            'grant_type': 'client_credentials',
            'client_id': 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
            'client_secret': 'lHQlUheyyAZtGQDA'
          }
        }).then(function (response) {
          let token = response.data.access_token
          const tokenString = 'Bearer ' + token

          const offerUrl = 'https://api.amadeus.com/v2/shopping/hotel-offers?latitude=' + lat + '&longitude=' + long + '&hotelName=' +
            hotelName + '&checkInDate=' + formattedCheckInDate + '&chechOutDate=' + formattedCheckOutDate + '&roomQuantity=' + roomAmount + '&adults=' +
            adults + '&childAges' + childrenAges + '&includeClosed=true&radius=50&currency=EUR&lang=de&view=LIGHT'

          axios.get(offerUrl, {
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
