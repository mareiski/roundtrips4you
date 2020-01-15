<template>
  <div
    class="flex city-suggestion"
    style="flex-direction:column;"
  >
    <q-btn
      v-if="cities.length === 0"
      @click="getCities(country)"
    >Städte vorschlagen</q-btn>
    <div class="flex justify-between cards-container">
      <q-card
        class="city-card"
        v-for="city in cities"
        :key="city"
      >
        <a
          :href="'https://www.google.com/maps/search/?api=1&query=' + city.name"
          target="_blank"
        >

          <q-img
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

        <q-card-section>
          {{ city.region }}, {{city.country}} <br> <br>
          Photo from <a
            style="color:black;"
            href="https://pixabay.com"
          >pixabay</a>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import url("../../css/citySuggestion.less");
</style>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      cities: [],
      images: []
    }
  },
  props: {
    country: String
  },
  methods: {
    getCities (country) {
      const context = this
      axios.get('https://wft-geo-db.p.mashape.com/v1/geo/countries?limit=5&offset=0&namePrefix=' + country + '&languageCode=de', {
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
              setTimeout(function () {
                context.getCityImage(city.name, city.country)
              }, 1000)
            })
          }).catch(function (error) {
            console.log('Error' + error)
          })
        }, 2000)
      }).catch(function (error) {
        console.log('Error' + error)
      })
    },
    getCityImage (cityName, cityCountry) {
      let context = this
      axios.get('https://pixabay.com/api/?key=14851178-b5e8b2cd21896ed0fc8b90fa0&lang=de&category=buildings&image_type=photo&orientation=horizontal&safesearch=true&min_height=40&per_page=3&q=' + cityName + ' ' + cityCountry, {}
      ).then(function (response) {
        context.images.splice(context.cities.findIndex(x => x.name === cityName), 0, { url: response.data.hits[0].webformatURL, cityName: cityName })
      })
    }
  }
}
</script>
