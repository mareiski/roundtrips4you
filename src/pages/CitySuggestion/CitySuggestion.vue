<template>
  <div
    class="flex city-suggestion"
    style="flex-direction:column;"
  >
    <div
      class="flex justify-center"
      style="margin-bottom:20px;"
    >
      <q-select
        v-show="!POIMode"
        outlined
        v-model="country"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="countryOptions"
        label="Land auswählen"
        bg-color="white"
        style="padding-left:10px; padding-right:10px; width:250px;"
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
    <div
      class="flex justify-stretch cards-container"
      style="min-heigth:20px;"
    >
      <div v-show="!POIMode">
        <q-card
          class="city-card cursor-pointer"
          v-for="(city, index) in cities"
          :key="index"
          :id="'CitySuggestion' + city.name"
          @mouseover="markCityOnMap(city)"
          @mouseleave="hideCityOnMap(city)"
          @click="switchToPOIMode(city)"
        >
          <div>
            <div>
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

              <!-- <q-btn
              round
              color="primary"
              class="city-info"
              icon="info"
              @click="openCityDialog(index)"
            >
            </q-btn> -->
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
              v-if="cityAlreadyAdded(city)"
              label="Hinzugefügt"
              outline
              dense
              disable
              color="primary"
            />
            <q-btn
              v-else
              label="Hinzufügen"
              outline
              dense
              color="primary"
              @click="addStop(city)"
            />
          </q-card-actions>
        </q-card>
      </div>

      <div v-show="POIMode">
        <div v-if="lastPOICityData">
          <q-img :src="lastPOICityData.img" />
          <div style="padding-left:10px; padding-top:10px;">
            <span class="font-large">{{lastPOICityData.title}}</span>
            <div>
              {{ lastPOICityData.shortDescription }}
            </div>
            <div
              class="font-medium"
              style="padding-top:20px; padding-bottom:10px;"
            >{{POIs.length}} Top Sehenswürdigkeiten</div>
          </div>
          <q-card
            class="city-card cursor-pointer"
            v-for="(poi, index) in POIs"
            :key="index"
            :id="'POI' + poi.name"
            @mouseover="markPOIOnMap(poi)"
            @mouseleave="hidePOIOnMap(poi)"
            @click="flyTo(poi.location.lat, poi.location.lng)"
          >
            <div>
              <div>
                <q-img
                  :alt="'Bild von'  + poi.name"
                  v-if="poi.photoUrl"
                  :src="poi.photoUrl"
                  style="height:170px;"
                  placeholder-src="statics/dummy-image-landscape-1-150x150.jpg"
                >
                  <div class="absolute-bottom text-h6 ellipsis">{{poi.name}}
                    <q-tooltip>{{poi.name}}</q-tooltip>
                  </div>
                </q-img>

                <!-- <q-btn
              round
              color="primary"
              class="city-info"
              icon="info"
              @click="openCityDialog(index)"
            >
            </q-btn> -->
              </div>

              <div class="rating-text">
                {{poi.rating}}
                <q-rating
                  class="stars"
                  :value="poi.rating"
                  size="15px"
                  color="gold"
                  readonly
                  style="margin-right:10px;"
                />
                ({{ poi.totalRatings }})
              </div>
              <a
                :href="'https://www.google.com/maps/search/?api=1&query=' + poi.name"
                target="_blank"
              >
                <q-card-section style="color:#707070;">
                  <q-icon name="location_on" />
                  {{poi.location.label}}
                </q-card-section>
              </a>
            </div>
          </q-card>
        </div>

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

      <!-- <div class="flex justify-center">
      <q-btn
        color="white"
        text-color="secondary"
        v-if="cities && cities.length > 0"
        style="width:245px; margin-top:20px;"
        @click="openInNewTab('https://www.google.de/search?q=' + country)"
      >weitere Städte auf Google</q-btn>

      <h5 style="padding-left:10px; text-align:center;">Ort direkt zur Reise hinzufügen</h5>
    </div>

    <div class="flex">
      <CitySearch
        ref="citySearch"
        :parkingPlaceSearch="false"
        :defaultLocation="null"
        @update="updateLocation($event)"
        style="margin-right:10px;"
      ></CitySearch>
      <q-btn
        :disable="directSetCity == {}"
        @click="addStop(directSetCity)"
        style="height: 40px; margin-top:10px;"
      >Ort hinzufügen</q-btn>
    </div> -->

    </div>
  </div>
</template>
<style lang="less" scoped>
@import url("../../css/citySuggestion.less");
</style>
<script>
import { db } from '../../firebaseInit.js'
import sharedMethods from '../../sharedMethods.js'
import { countries } from '../../countries.js'
import CitySuggestionMethods from './CitySuggestionMethods.js'

export default {
  data () {
    return {
      cities: [],
      images: [],
      country: Array.isArray(countries) ? countries[0] : countries,
      countryOptions: countries,
      cityDialog: { showed: false, title: '', imgSrc: '', description: '', shortDescription: '' },
      directSetCity: {},
      POIMode: false,
      POIs: [],
      lastPOICity: null,
      lastPOICityData: null
    }
  },
  props: {
    dates: Array,
    RTId: String,
    predefinedCountry: String,
    alreadyAddedCities: Array,
    shouldAddCity: Boolean,
    isInSuggestionMode: Boolean
  },
  metaInfo () {
    return {
      script: [{
        src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBVkBCl3dY49g3lyX8ns1SYsErNdkCO8sc&libraries=places`,
        async: true,
        defer: true,
        callback: () => this.MapsInit() // will declare it in methods
      }]
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
     * marks the hovered city on the map (if its parent)
     */
    markCityOnMap (city) {
      sharedMethods.getParent('Map', this).markCityOnMap([city.latitude, city.longitude])
    },
    hideCityOnMap (city) {
      sharedMethods.getParent('Map', this).hideCityOnMap([city.latitude, city.longitude])
    },
    /**
     * marks the hovered city on the map (if its parent)
     */
    markPOIOnMap (poi) {
      sharedMethods.getParent('Map', this).markPOIOnMap([poi.location.lat, poi.location.lng])
    },
    hidePOIOnMap (poi) {
      sharedMethods.getParent('Map', this).hidePOIOnMap([poi.location.lat, poi.location.lng])
    },
    /**
     * sets poi mode to true
     */
    switchToPOIMode (city) {
      if (this.lastPOICity !== city) {
        sharedMethods.getGooglePlacesData(city.latitude, city.longitude).then((POIArr) => {
          this.POIs = POIArr
          sharedMethods.getParent('Map', this).showPOIsOnMap(this.POIs)
        }).catch((e) => {
          console.log(e)
        })

        sharedMethods.getWikivoyageData(city.name).then(result => {
          this.lastPOICityData = result
          this.lastPOICityData.img = this.images[this.images.findIndex(x => x.cityName === city.name)].url
        }).catch((e) => {
          console.log(e)
        })
      }

      this.POIMode = true
      this.lastPOICity = city
    },
    /**
     * switch back to country mode
     */
    // switchToCountryMode () {
    //   this.POIMode = false
    //   sharedMethods.getParent('Map', this).showCitiesOnMap(this.cities)
    // },
    /**
     * get all cities for country cities
     */
    getCities () {
      const context = this

      this.cities = []

      this.cityDialog.showed = false

      CitySuggestionMethods.getCities(this.country).then(response => {
        if (response) context.handleFetchedSuggestions(response)
      })
    },
    /**
     * handles the city suggestion results
     */
    handleFetchedSuggestions (tempCities) {
      let context = this
      tempCities.forEach((city) => {
        setTimeout(function () {
          CitySuggestionMethods.getCityImage(city.name, city.country).then(image => {
            context.images.splice(context.cities.findIndex(x => x.name === city.name), 0, image)
          })
        }, 1000)
      })

      let uniqueCities = []

      tempCities.forEach((city) => {
        let cityObject = {
          name: city.name,
          country: city.country,
          region: city.region,
          longitude: city.longitude ? city.longitude : null,
          latitude: city.latitude ? city.latitude : null,
          added: false
        }

        if (uniqueCities.length === 0) uniqueCities.push(cityObject)
        for (let i = 0; i < uniqueCities.length; i++) {
          if (city.name === uniqueCities[i].name) break
          if (i === uniqueCities.length - 1) uniqueCities.push(cityObject)
        }
      })

      this.cities = uniqueCities
      // sharedMethods.getParent('Map', this).showCitiesOnMap(uniqueCities)
    },
    cityAlreadyAdded (city) {
      if (this.alreadyAddedCities) {
        for (let i = 0; i < this.alreadyAddedCities.length; i++) {
          const addedCity = this.alreadyAddedCities[i]

          if (addedCity.Location.lat === city.latitude && addedCity.Location.lng === city.longitude) {
            return true
          }
        }
      }
      return false
    },
    /**
     * update location object witch city search results
     * @param event event from city search update callback
     */
    updateLocation (event) {
      if (event !== null) {
        this.directSetCity = {
          name: event.label,
          longitude: event.x,
          latitude: event.y
        }
      } else {
        this.directSetCity = {}
      }
    },
    flyTo (lat, lng) {
      sharedMethods.getParent('Map', this).flyToPointOnMap(lat, lng)
    },
    addStop (city) {
      if (!this.shouldAddCity) {
        this.$emit('update', city)
        return
      }

      let initDate = new Date()
      Date(Math.max.apply(null, this.dates.map(function (e) {
        initDate = e
      })))

      // add one day
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
        Title: 'Zwischenstopp in ' + cityName,
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

      sharedMethods.getParent('EditRoundtrips', this).fetchRoundtripStops(this.RTId, false)

      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle',
        message: 'Zur Reise hinzugefügt'
      })
    }
  },
  created () {
    if (this.predefinedCountry) this.country = this.predefinedCountry
    this.getCities()
  }
}
</script>
