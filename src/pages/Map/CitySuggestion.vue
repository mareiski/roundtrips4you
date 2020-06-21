<template>
  <div
    class="flex city-suggestion"
    :style="cities.length === 0 ? 'flex-direction:row; justify-content:center;' : 'flex-direction:column;'"
  >
    <q-btn
      v-if="cities.length === 0"
      color="primary"
      style="width:200px;"
      :loading="loading"
      @click="getCities(country)"
    >Städte vorschlagen
      <template v-slot:loading>
        <q-spinner />
      </template>
    </q-btn>
    <div class="flex justify-stretch cards-container">
      <q-card
        class="city-card"
        v-for="(city, index) in cities"
        :key="index"
      >
        <a
          :href="'https://www.google.com/maps/search/?api=1&query=' + city.name"
          target="_blank"
        >

          <q-img
            :alt="'Bild von'  + city.name"
            v-if="images[images.findIndex(x => x.cityName === city.name)]"
            :src="images[images.findIndex(x => x.cityName === city.name)].url"
            style="height:170px;"
            placeholder-src="statics/dummy-image-landscape-1-150x150.jpg"
            basic
          >
            <div class="absolute-bottom text-h6">{{city.name}}
            </div>
          </q-img>
        </a>

        <q-btn
          round
          color="primary"
          class="add-to-rt"
          icon="add"
          @click="addStop(city)"
        >
        </q-btn>

        <q-card-section>
          {{ city.region }}, {{city.country}}
          <br>
          <br>
          Photo from <a
            style="color:black;"
            href="https://pixabay.com"
          >pixabay</a>
        </q-card-section>
      </q-card>
    </div>
    <q-btn
      v-if="cities && cities.length > 0"
      @click="openInNewTab('https://www.google.de/search?q=' + country)"
    >weitere Städte auf Google</q-btn>
  </div>
</template>
<style lang="less" scoped>
@import url("../../css/citySuggestion.less");
</style>
<script>
import axios from 'axios'
import { db } from '../../firebaseInit'

export default {
  data () {
    return {
      cities: [],
      images: [],
      loading: false
    }
  },
  props: {
    country: String,
    dates: Array,
    RTId: String
  },
  methods: {
    getCities (country) {
      this.loading = true
      const context = this
      axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=5&offset=0&namePrefix=' + country + '&languageCode=de', {
        headers: {
          'X-RapidAPI-Key': '01861af771mshb4bcca217c978fdp12121ejsnd0c4ce2c275a'
        }
      }).then(function (response) {
        // wait 2 secs because only 1 request per sec is allowed
        setTimeout(function () {
          axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&countryIds=' + response.data.data[0].code + '&minPopulation=100000&sort=-population&languageCode=de&types=CITY', {
            headers: {
              'X-RapidAPI-Key': '01861af771mshb4bcca217c978fdp12121ejsnd0c4ce2c275a'
            }
          }).then(function (response) {
            context.cities = response.data.data
            context.cities.forEach(city => {
              console.log(city.name)
              console.log(city.name.includes('Metropolitanstadt'))
              if (city.name.includes('Metropolitanstadt')) city.name = city.name.slice(city.name.indexOf('Metropolitanstadt') + 17)
              setTimeout(function () {
                context.getCityImage(city.name, city.country)
              }, 1000)
            })
            this.loading = true
          }).catch(function (error) {
            console.log('Error' + error)
            this.loading = true
          })
        }, 2000)
      }).catch(function (error) {
        console.log('Error' + error)
        this.loading = true
      })
    },
    addStop (city) {
      let initDate = null
      Date(Math.max.apply(null, this.dates.map(function (e) {
        initDate = e
      })))

      initDate.setDate(initDate.getDate() + 1)

      let cityName = city.name

      db.collection('RoundtripDetails').add({
        DateDistance: '',
        Description: 'Beschreibung über ' + cityName,
        GeneralLink: null,
        ImageUrl: null,
        InitDate: initDate,
        Price: 0,
        RTId: this.RTId,
        Title: cityName,
        Location: {
          lng: city.longitude,
          lat: city.latitude,
          label: city.name
        },
        Parking: null,
        HotelLocation: null,
        HotelStars: null,
        HotelContact: null,
        HotelName: null
      })
      this.getParent('EditRoundtrips').loadRoundtripDetails(this.RTId)

      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle',
        message: 'Zur Reise hinzugefügt'
      })
    },
    getParent (name) {
      let p = this.$parent
      while (typeof p !== 'undefined') {
        if (p.$options.name === name) {
          return p
        } else {
          p = p.$parent
        }
      }
      return false
    },
    getCityImage (cityName, cityCountry) {
      let context = this
      axios.get('https://pixabay.com/api/?key=14851178-b5e8b2cd21896ed0fc8b90fa0&lang=de&category=buildings&image_type=photo&orientation=horizontal&safesearch=true&min_height=40&per_page=3&q=' + cityName + ' ' + cityCountry, {}
      ).then(function (response) {
        if (response.data.hits[0]) context.images.splice(context.cities.findIndex(x => x.name === cityName), 0, { url: response.data.hits[0].webformatURL, cityName: cityName })
        else {
          axios.get('https://pixabay.com/api/?key=14851178-b5e8b2cd21896ed0fc8b90fa0&lang=de&category=buildings&image_type=photo&orientation=horizontal&safesearch=true&min_height=40&per_page=3&q=' + cityName, {}
          ).then(function (response) {
            if (response.data.hits[0]) context.images.splice(context.cities.findIndex(x => x.name === cityName), 0, { url: response.data.hits[0].webformatURL, cityName: cityName })
            else {
              context.images.splice(context.cities.findIndex(x => x.name === cityName), 0, { url: '../../statics/dummy-image-landscape-1-150x150.jpg', cityName: cityName })
            }
          })
        }
      })
    },
    openInNewTab (link) {
      window.open(link, '_blank')
    }
  }
}
</script>
