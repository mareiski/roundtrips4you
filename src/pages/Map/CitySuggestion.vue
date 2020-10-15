<template>
  <div
    class="flex city-suggestion"
    :style="cities.length === 0 ? 'flex-direction:row; justify-content:center;' : 'flex-direction:column;'"
  >
    <div
      class="flex justify-center"
      style="margin-bottom:20px;"
    >
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
        @input="getCities()"
        :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Land']"
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
      <!-- <q-btn
        color="primary"
        style="width:200px;"
        :loading="loading"
        @click="getCities()"
        :disable="!country"
      >Städte vorschlagen
        <template v-slot:loading>
          <q-spinner />
        </template>
      </q-btn> -->
    </div>
    <div class="flex justify-stretch cards-container">

      <q-card
        class="city-card"
        v-for="(city, index) in cities"
        :key="index"
      >
        <div>
          <div
            @click="openCityDialog(index)"
            class="cursor-pointer"
          >
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
              <q-tooltip>zur Reise hinzügen</q-tooltip>
            </q-btn>
          </div>

          <a
            :href="'https://www.google.com/maps/search/?api=1&query=' + city.name"
            target="_blank"
          >
            <q-card-section style="color:#707070;">
              <q-icon name="location_on" />
              {{city.name}}, {{ city.region }}
            </q-card-section>
          </a>
        </div>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Infos"
            color="secondary"
            @click="openCityDialog(index)"
          />
        </q-card-actions>
      </q-card>

      <q-dialog v-model="cityDialog.showed">
        <q-card>
          <q-card-section
            class="row flex justify-end q-pb-none"
            style="z-index:100; width:100%; position:absolute; color:white;"
          >
            <q-btn
              icon="close"
              flat
              round
              dense
              v-close-popup
            />
          </q-card-section>
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
import sharedMethods from '../../sharedMethods.js'
import { countries } from '../../countries.js'

export default {
  data () {
    return {
      cities: [],
      images: [],
      country: Array.isArray(countries) ? countries[0] : countries,
      countryOptions: countries,
      cityDialog: { showed: false, title: '', imgSrc: '', description: '', shortDescription: '' }
    }
  },
  props: {
    dates: Array,
    RTId: String
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
     * open the city dialog for city with index
     */
    openCityDialog (index) {
      let city = this.cities[index]
      this.cityDialog.title = city.name
      this.cityDialog.imgSrc = this.images[this.images.findIndex(x => x.cityName === city.name)].url

      let context = this

      // get city dialog content from wikivoyage
      sharedMethods.getWikivoyageData(city.name).then(result => {
        if (result !== null) {
          context.cityDialog.shortDescription = result.shortDescription
          context.cityDialog.description = result.description
          context.cityDialog.showed = true
        } else {
          context.cityDialog.shortDescription = ''
          context.cityDialog.description = 'Keine Informationen gefunden.'
          context.cityDialog.showed = true
        }
      })
    },
    /**
     * get all cities for country cities
     */
    getCities () {
      const context = this

      this.cities = []

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
            }).catch(function (error) {
              console.log(error)
            })
          }, 2000)
        }).catch(function (error) {
          console.log('Error' + error)
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
          }).catch(function (error) {
            console.log(error)
          })
        }
      })
    },
    openInNewTab (link) {
      window.open(link, '_blank')
    }
  },
  created () {
    this.getCities()
  }
}
</script>
