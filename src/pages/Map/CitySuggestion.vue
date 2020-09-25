<template>
  <div
    class="flex city-suggestion"
    :style="cities.length === 0 ? 'flex-direction:row; justify-content:center;' : 'flex-direction:column;'"
  >
    <div
      class="flex justify-center"
      style="margin-bottom:20px;"
    >
      <q-btn
        color="primary"
        style="width:200px;"
        :loading="loading"
        @click="getCities()"
        :disable="!country"
      >Städte vorschlagen
        <template v-slot:loading>
          <q-spinner />
        </template>
      </q-btn>
    </div>
    <div class="flex justify-stretch cards-container">
      <div
        v-for="(city, index) in cities"
        :key="index"
        @click="openCityDialog(index)"
        class="cursor-pointer"
      >
        <q-card class="city-card">
          <q-img
            :alt="'Bild von'  + city.name"
            v-if="images[images.findIndex(x => x.cityName === city.name)]"
            :src="images[images.findIndex(x => x.cityName === city.name)].url"
            style="height:170px;"
            placeholder-src="statics/dummy-image-landscape-1-150x150.jpg"
          >
            <div class="absolute-bottom text-h6">{{city.name}}
            </div>
          </q-img>

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
          </q-card-section>

        </q-card>
      </div>
      <q-dialog v-model="cityDialog.showed">
        <q-card>
          <q-img
            :src="cityDialog.imgSrc"
            style="max-height:75vh;"
          >
            <div class="absolute-bottom">
              <div class="text-h6">{{cityDialog.title}}</div>
              <div class="text-subtitle2">{{cityDialog.shortDescription}}</div>
            </div>
          </q-img>

          <q-card-section>
            <!-- <a
                :href="'https://www.google.com/maps/search/?api=1&query=' + city.name"
                target="_blank"
              ></a> -->
            {{cityDialog.description}}
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="OK"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
import { db } from '../../firebaseInit.js'

export default {
  data () {
    return {
      cities: [],
      images: [],
      loading: false,
      cityDialog: { showed: false, title: '', imgSrc: '', description: '', shortDescription: '' }
    }
  },
  props: {
    country: String,
    dates: Array,
    RTId: String
  },
  methods: {
    openCityDialog (index) {
      let city = this.cities[index]
      this.cityDialog.title = city.name
      this.cityDialog.imgSrc = this.images[this.images.findIndex(x => x.cityName === city.name)].url

      const headers = {
        'Content-Type': 'application/json; charset=UTF-8'
      }

      // get city dialog content
      const context = this
      axios.get('https://de.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=description%7Cextracts%7Cpageimages&titles=' + city.name + '&exintro=1&explaintext=1&piprop=name%7Coriginal',
        { headers: headers })
        .then(function (response) {
          const pages = response.data.query.pages
          const firstPageName = Object.keys(pages)[0]

          context.cityDialog.shortDescription = pages[firstPageName].description
          context.cityDialog.description = pages[firstPageName].extract
          context.cityDialog.showed = true
        }).catch(function (error) {
          console.log('Error' + error)
          context.cityDialog.shortDescription = ''
          context.cityDialog.description = 'Keine Informationen gefunden.'
          context.cityDialog.showed = true
        })
    },
    getCities () {
      this.loading = true
      const context = this

      this.cityDialog.showed = false

      context.fetchDBSuggestions().then(function (response) {
        if (response.length > 0) {
          context.handleFetchedSuggestions(response)
        } else {
          context.fetchAPISuggestions().then(function (apiResponse) {
            context.handleFetchedSuggestions(apiResponse)
          })
        }
      }).catch(function (error) {
        console.log('Error' + error)
        this.loading = true
      })
    },
    /**
     * handles the city suggestion results
     */
    handleFetchedSuggestions (tempCities) {
      let context = this
      tempCities.forEach((city, index) => {
        if (city.name.includes('Metropolitanstadt')) city.name = city.name.slice(city.name.indexOf('Metropolitanstadt') + 17)
        setTimeout(function () {
          context.getCityImage(city.name, city.country)
        }, 1000)
      })

      let uniqueCities = []

      tempCities.forEach((city, index) => {
        let cityObject = {
          name: city.name,
          country: city.country,
          region: city.region
        }

        if (uniqueCities.length === 0) uniqueCities.push(cityObject)
        for (let i = 0; i < uniqueCities.length; i++) {
          if (city.name === uniqueCities[i].name) break
          if (i === uniqueCities.length - 1) uniqueCities.push(cityObject)
        }
      })

      this.cities = uniqueCities

      this.loading = false
    },
    /**
     * fetch city suggestions from geo db api
     */
    fetchAPISuggestions () {
      let context = this
      return new Promise((resolve, reject) => {
        axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=5&offset=0&namePrefix=' + this.country + '&languageCode=de', {
          headers: {
            'X-RapidAPI-Key': '01861af771mshb4bcca217c978fdp12121ejsnd0c4ce2c275a'
          }
        }).then(function (response) {
          // wait 2 secs because only 1 request per sec is allowed
          setTimeout(function () {
            axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=' + response.data.data[0].code + '&minPopulation=70000&sort=-population&languageCode=de&types=CITY', {
              headers: {
                'X-RapidAPI-Key': '01861af771mshb4bcca217c978fdp12121ejsnd0c4ce2c275a'
              }
            }).then(function (response) {
              context.writeInDB(response.data.data)
              resolve(response.data.data)
            })
          }, 2000)
        }).catch(function (error) {
          console.log('Error' + error)
          this.loading = true
        })
      })
    },
    /**
     * fetch city suggestions from the database
     */
    fetchDBSuggestions () {
      return new Promise((resolve, reject) => {
        let tempCities = []
        let roundtripsRef = db.collection('SuggestedCities')
          .where('Country', '==', this.country)
          .limit(1)
        roundtripsRef.get()
          .then(snapshot => {
            if (snapshot.empty) resolve(tempCities)
            snapshot.forEach(doc => {
              let cities = doc.data().Cities
              if (cities.length === 0) resolve(tempCities)
              cities.forEach(city => {
                let cityObject = {
                  name: city.name,
                  region: city.region,
                  country: doc.data().Country
                }
                tempCities.push(cityObject)

                if (cities.indexOf(city) === cities.length - 1) {
                  resolve(tempCities)
                }
              })
            })
          })
      })
    },
    writeInDB (response) {
      let newCityObject = {}
      newCityObject.Cities = []

      response.forEach((city, index) => {
        newCityObject.Country = city.country
        if (!newCityObject.Cities.includes(city.name)) newCityObject.Cities.push({ name: city.name, region: city.region })
      })

      db.collection('SuggestedCities').add(newCityObject)
    },
    addStop (city) {
      let initDate = null
      Date(Math.max.apply(null, this.dates.map(function (e) {
        initDate = e
      })))

      // initDate.setDate(initDate.getDate() + 1)

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
