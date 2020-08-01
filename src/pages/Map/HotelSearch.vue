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
      :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Hotel']"
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
          @click="hotel !== null ? [hotelName = hotel.name, hideHotelList(), $emit('update', hotel)] : showAddHotelDialog = true"
          v-show="hotelListVisible"
          v-for="(hotel, index) in hotels"
          :key="hotel !== null ? hotel.geoId : index"
        >
          <div
            v-if="hotel !== null"
            v-html="hotel.caption"
          ></div>
          {{hotel !== null ? '' : 'Klicken um Hotel manuell hinzuzufügen'}}
        </q-item>
      </q-list>
    </q-card>
    <q-dialog v-model="showAddHotelDialog">
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
<style lang="less">
@import url("../../css/hotelRegionSearch.less");
</style>
<script>
const getAxios = () => import('axios')

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
    CitySearch: () => import('./CitySearch')
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
      this.getHotels(this.hotelName).then((results) => {
        if (results !== null) {
          this.hotels = results.data.suggestions[3].entities
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
        latitude: this.tempLocation.lat,
        longitude: this.tempLocation.lng,
        address: this.tempLocation.label,
        rating: this.hotelStars,
        name: this.hotelName,
        contact: { email: this.hotelEmail }
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
    getHotels (hotelName) {
      return new Promise((resolve, reject) => {
        getAxios().then(axios => {
          axios.get('https://hotels4.p.rapidapi.com/locations/search?locale=de_DE&query=' + hotelName, {
            headers: {
              'content-type': 'application/octet-stream',
              'x-rapidapi-host': 'hotels4.p.rapidapi.com',
              'x-rapidapi-key': '18b409d797msh45b84c0227df18cp1fea51jsne88847e3f3c8',
              'useQueryString': true
            }
          }).then((response) => {
            resolve(response)
          })
            .catch((error) => {
              console.log(error)
              resolve(null)
            })
        })
      })
    }
  }

}
</script>
