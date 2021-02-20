<template>
  <div
    style="overflow:hidden;"
    class="map"
  >
    <q-inner-loading
      :showing="loading"
      style="z-index: 1;"
    >
      <q-spinner
        size="42px"
        color="primary"
      >
      </q-spinner>
      <p
        class="font-medium"
        style="margin-top:10px;"
      >Karte wird geladen</p>
    </q-inner-loading>
    <MglMap
      v-if="accTo"
      :accessToken="accTo"
      :mapStyle.sync="mapStyle"
      :style="'height:' + (height ? height : '500px;')"
      :center="centerLocation"
      :zoom="6"
      :mapboxGl="mapbox"
      :attributionControl="false"
      logoPosition="bottom-left"
      keyboard
      doubleClickZoom
      @load="onMapLoaded"
    >
      <MglGeocoderControl
        :accessToken="accTo"
        @result="handleSearch"
        placeholder="Ort suchen"
        v-if="editor"
      />
      <MglNavigationControl position="top-right" />
      <MapLayerPlugin
        class="mapboxgl-ctrl"
        position="top-right"
      />

      <q-btn
        color="white"
        v-if="editor"
        text-color="secondary"
        icon="apartment"
        style="position:absolute; right:9px; top:220px;"
        @click="showSuggestionCountryDialog = true; showDrawerList = false; miniDisabled = true;"
      >
      </q-btn>
      <MglFullscreenControl position="bottom-right" />

      <!-- drawer is used on tablets and desktops only -->
      <!-- <q-drawer
        v-model="drawerLeft"
        show-if-above
        v-if="editor"
        :width="250"
        elevated
        :breakpoint="550"
        :mini="isTablet ? miniState : false"
        @mouseover="!miniDisabled ? miniState = false : null"
        @mouseout="!miniDisabled ? miniState = true : null"
        content-class="bg-secondary text-white"
      >
        <q-scroll-area
          class="fit"
          ref="DrawerScrollArea"
        >
          <q-list
            padding
            v-show="showDrawerList"
          >
            <q-item
              clickable
              v-ripple
              @click="showDrawerList = false; miniDisabled = true; showCityMarkers = true;"
            >
              <q-item-section avatar>
                <q-icon name="apartment" />
              </q-item-section>

              <q-item-section>
                Städte vorschlagen
              </q-item-section>
            </q-item>
          </q-list>

          <MapDrawerItem
            ref="MapDrawerItem"
            v-show="!showDrawerList"
            :alreadyAddedCities="stops"
            @update="update($event)"
          ></MapDrawerItem>
        </q-scroll-area>
      </q-drawer> -->

      <!-- city suggestion dialog -->
      <!-- <q-dialog
        v-model="suggestionDialogVisible"
        position="bottom"
        seamless
        full-width
      >
        <q-swipe-to-close v-model="suggestionDialogVisible">
          <q-card style="height:70vh;">
            <q-card-section class="scroll bg-secondary">
              <div class="flex justify-center">
                <q-icon
                  name="drag_handle"
                  color="white"
                  size="40px"
                />
              </div>
              <MapDrawerItem
                ref="MapDrawerItem"
                :alreadyAddedCities="stops"
                @update="update($event)"
              ></MapDrawerItem>
            </q-card-section>
          </q-card>
        </q-swipe-to-close>
      </q-dialog> -->

      <MglMarker
        v-for="stop in stops"
        :key="stop.DocId"
        :coordinates="stop.HotelName && stop.HotelLocation && !isNaN(stop.HotelLocation.lat) ? [stop.HotelLocation.lat, stop.HotelLocation.lng] : [stop.Location.lng, stop.Location.lat]"
        color="#D56026"
        :ref="'stopMarker' + stop.DocId"
        @click="onMarkerClicked($event, stop.HotelLocation ? stop.HotelLocation.label : stop.Location.label )"
      >
        <MglPopup>

          <q-card>
            <q-img
              v-if="stop.StopImages"
              width="240px"
              height="135px"
              :src="stop.StopImages[0]"
            ></q-img>
            <q-img
              width="240px"
              height="135px"
              :src="lastPOICityData.img && lastPOICityData.img.split('/')[0] === 'https:' ? lastPOICityData.img : lastPOICityData.imgSrc"
            ></q-img>
            <q-card-section>
              <div
                class="font-large"
                style="line-height:normal;"
              >
                {{stop.Title}}
              </div>
              <div style="font-size:13px;">
                {{ lastPOICityData.shortDescription }}
                <p v-if="stop.GeneralLink && stop.GeneralLink.length > 0">
                  <q-icon name="house" />
                  <a
                    :href="stop.GeneralLink"
                    target="blank"
                  >{{capitalize(stop.HotelName)}}</a>
                </p>
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                label="POIs"
                @click="showSightDetails(stop.Location.lat, stop.Location.lng)"
                color="secondary"
                v-show="stop"
              />
            </q-card-actions>
          </q-card>
        </MglPopup>
      </MglMarker>
      <template v-for="stop in stops">
        <MglMarker
          v-for="dailyTrip in stop.DailyTrips"
          :key="dailyTrip.id"
          :coordinates="[dailyTrip.location.lng, dailyTrip.location.lat]"
          color="#D56026"
          @click="onMarkerClicked($event, dailyTrip.location.label)"
        >
          <MglPopup>
            <q-card>
              <q-img
                v-if="dailyTrip.StopImages"
                width="240px"
                height="135px"
                :src="dailyTrip.StopImages[0]"
              ></q-img>
              <q-card-section>
                <div class="text-h6">
                  {{dailyTrip.location.label.split(',')[0]}} - Tagesausflug von {{stop.Location.label ? stop.Location.label.split(',')[0] : ''}}
                </div>
                <div class="text-subtitle2">
                  <p style="margin-bottom:5px;">
                    <q-icon name="location_on" />
                    <a
                      target="_blank"
                      :href="'https://www.google.com/maps/search/?api=1&query=' + dailyTrip.location.label"
                    >{{dailyTrip.location.label}}</a>
                  </p>
                </div>
              </q-card-section>
            </q-card>
          </MglPopup>
        </MglMarker>
      </template>
      <!-- last clicked marker -->
      <MglMarker
        :coordinates="lastClickCoordinates"
        color="#70707075"
        @click="onMarkerClicked($event, title)"
        v-if="editor"
        :offset="[5, 10]"
        ref="addStopMarker"
      >
        <MglPopup>
          <q-card>
            <q-img
              v-show="lastPOICityData.img"
              :src="lastPOICityData.img && lastPOICityData.img.split('/')[0] === 'https:' ? lastPOICityData.img : lastPOICityData.imgSrc"
            />
            <q-card-section style="padding-left:10px; padding-top:10px;">
              <span
                class="font-large"
                style="line-height:normal;"
              >{{title ? title : 'gesetzter Punkt'}}</span>
              <div style="font-size:13px;">
                {{ lastPOICityData.shortDescription }}
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                label="Infos"
                @click="showSightDetails(lastClickCoordinates[1], lastClickCoordinates[0])"
                color="secondary"
              />
              <q-btn
                flat
                label="Ort hinzufügen"
                @click="addStop"
                color="primary"
              />
            </q-card-actions>
          </q-card>
        </MglPopup>
      </MglMarker>
      <q-dialog v-model="showDetailsDialog">
        <div v-if="lastPOICityData">
          <q-card>
            <!-- todo change to slideshow -->
            <q-img :src="lastPOICityData.img" />
            <q-card-section>
              <div style="padding-left:10px; padding-top:10px;">
                <span class="font-large">{{lastPOICityData.title}}</span>
                <div>
                  {{ lastPOICityData.description }}
                </div>
                <div
                  class="font-medium"
                  style="padding-top:20px; padding-bottom:10px;"
                >{{suggestedPOIs.length}} Top Sehenswürdigkeiten</div>
              </div>
              <q-card
                class="city-card cursor-pointer"
                v-for="(poi, index) in suggestedPOIs"
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
                  </div>

                  <template v-if="isStopAlreadyAdded(lastPOICityData.title)">
                    <q-btn
                      class="sight-add-button"
                      v-show="!sightAlreadyAdded(poi.name, lastPOICityData.title)"
                      icon="bookmark"
                      color="primary"
                      round
                      @click="$emit('addSight', {poi: poi, cityName: lastPOICityData.title})"
                    >
                      <q-tooltip>Ort merken</q-tooltip>
                    </q-btn>
                    <q-btn
                      class="sight-add-button"
                      v-show="sightAlreadyAdded(poi.name, lastPOICityData.title)"
                      icon="done"
                      color="primary"
                      disable
                      round
                    >
                    </q-btn>
                  </template>

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
            </q-card-section>
          </q-card>
        </div>
        <!-- <q-card>
          <q-img
            :src="sightDialog.src"
            style="max-height:75vh;"
          >
            <div class="absolute-bottom">
              <div class="text-h6">{{sightDialog.title}}</div>
              <div class="text-subtitle2">{{sightDialog.description}}</div>
            </div>
          </q-img>

          <q-card-section>
            {{sightDialog.extract}}
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="zurück"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card> -->
      </q-dialog>
      <div
        v-for="(stop, index) in stops"
        :key="'StopContainer' + stop.DocId + index"
      >
        <MglMarker
          v-if="stop.Parking && !isNaN(stop.Parking.lng)"
          :key="'Stop' + stop.DocId"
          :coordinates="[stop.Parking.lng, stop.Parking.lat]"
          color="#D56026"
          @click="onMarkerClicked($event)"
        >
          <MglPopup>
            <q-card>
              <div style="width:100%; display:flex; justify-content:center; padding-top:5px;">
                <q-icon
                  name="fas fa-parking"
                  size="30px"
                />
              </div>
              <q-card-section>
                <p>{{ stop.parkingPlace &&  stop.parkingPlace.label && typeof stop.parkingPlace.label !== 'undefined' ? stop.Parking.label.split(',')[0] : 'Parkplatz für ' + stop.Title}}</p>
              </q-card-section>
            </q-card>
          </MglPopup>
        </MglMarker>
      </div>
      <!-- city markers -->
      <template v-if="showCityMarkers">
        <MglMarker
          v-for="(city, index) in suggestedCities"
          :key="city.name + index"
          :coordinates="[city.longitude, city.latitude]"
          :offset="[10, 5]"
          @click="onMarkerClicked($event, city.name); goToCity(city.name)"
          :ref="'cityMarker' + index"
        >
          <q-icon
            :ref="'cityMarkerIcon' + index"
            slot="marker"
            name="place"
            color="amber-14"
            size="30px"
          />
          <MglPopup>
            <q-card>
              <q-img
                v-show="lastPOICityData.img"
                :src="lastPOICityData.img && lastPOICityData.img.split('/')[0] === 'https:' ? lastPOICityData.img : lastPOICityData.imgSrc"
              />
              <q-card-section style="padding-left:10px; padding-top:10px;">
                <span
                  class="font-large"
                  style="line-height:normal;"
                >{{city.name ? city.name : 'gesetzter Punkt'}}</span>
                <div style="font-size:13px;">
                  {{ lastPOICityData.shortDescription }}
                  <br><br>
                  vorgeschlagen für {{suggestionCountry}}
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Infos"
                  @click="showSightDetails(city.latitude, city.longitude)"
                  color="secondary"
                />
                <q-btn
                  flat
                  v-if="!isStopAlreadyAdded(city.name)"
                  label="Ort hinzufügen"
                  @click="addStop"
                  color="primary"
                />
                <q-btn
                  v-else
                  label="Ort ansehen"
                  @click="$refs['stopMarker' + isStopAlreadyAdded(city.name).DocId][0].marker._popup.addTo(map); $refs['cityMarker' + index][0].marker._popup.remove()"
                  color="primary"
                />
              </q-card-actions>
            </q-card>
          </MglPopup>
        </MglMarker>
      </template>
      <!-- POI Markers -->
      <template v-if="showPOIMarkers">
        <MglMarker
          v-for="(poi, index) in suggestedPOIs"
          :key="poi.name + index"
          :coordinates="[poi.location.lng, poi.location.lat]"
          :offset="[10, 5]"
          @click="onMarkerClicked($event, poi.name); goToCity(poi.name)"
        >
          <q-icon
            :ref="'poiMarkerIcon' + index"
            slot="marker"
            name="place"
            color="amber-14"
            size="30px"
          />
          <MglPopup>
            <q-card>
              <q-card-section>
                <div class="text-h6">
                  {{poi.name}}
                </div>
                <p style="font-size: 14px">vorgeschlagener Ort für {{poi.location.label.substring(poi.location.label.lastIndexOf(',') + 1, poi.location.label.length)}}</p>
              </q-card-section>
            </q-card>
          </MglPopup>
        </MglMarker>
      </template>

      <MglMarker
        v-for="(route, index) in addedRoutes"
        :key="'route' + index"
        :coordinates="route.location"
        :color="route.color"
        @click="onMarkerClicked($event)"
        :ref="'route' + route.id"
      >
        <q-icon
          slot="marker"
          :style="{'color': route.color, 'background-color': 'white', 'border-radius': '50%'}"
          :ref="'speedMarker' + route.id"
          :class="'speedMarker' + index"
          name="speed"
        />
        <MglPopup>
          <q-card v-if="route.duration">
            <div style="width:100%; display:flex; justify-content:center; padding-top:5px;">
              <q-icon
                name="fas fa-route"
                size="30px"
              />
            </div>
            <q-card-section>
              <div>{{route.duration}} {{ route.origin ? 'von ' + route.origin : ''}} bis {{route.destination}} {{route.distance !== null ? '(' + route.distance + ')' : null}}</div>
              <a
                target="_blank"
                v-if="route.origin !== route.destination"
                :href="'https://www.google.com/maps/dir/?api=1&origin=' + route.origin + '&destination=' + route.destination"
              >auf Google ansehen</a>
            </q-card-section>
          </q-card>
          <q-card v-else>
            <q-card-section>
              <div>{{route.distance}} mit dem Flugzeug {{ addedRoutes[index -1] ? 'von ' + addedRoutes[index - 1].destination : ''}} nach {{route.destination}}</div>
            </q-card-section>
          </q-card>
        </MglPopup>
      </MglMarker>
    </MglMap>
    <q-dialog v-model="showSuggestionCountryDialog">
      <q-card>
        <q-card-section class="font-medium">
          <p>Land für Städtevorschläge wählen</p>

          <q-select
            outlined
            v-model="suggestionCountry"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="countryOptions"
            label="Land auswählen"
            bg-color="white"
            @filter="filterCountries"
            @input="showCitiesOnMap(); showSuggestionCountryDialog = false;"
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
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<style lang="less" scoped>
@import url("../../css/map.less");
.mapboxgl-marker-anchor-center {
  font-size: 40px;
  position: absolute;
}
</style>
<script>
const MglMap = () => import('vue-mapbox')
const MglGeocoderControl = () => import('vue-mapbox-geocoder')
const turf = () => import('@turf/turf')
import Mapbox from 'mapbox-gl'
import CitySuggestionMethods from '../CitySuggestion/CitySuggestionMethods.js'

let bounds = []

import {
  MglMarker,
  MglNavigationControl,
  MglPopup,
  MglFullscreenControl
} from 'vue-mapbox'

const getAxios = () => import('axios')
import { date } from 'quasar'
import sharedMethods from '../../sharedMethods.js'
import MapLayerPlugin from './MapLayerPlugin.vue'
import { countries } from '../../countries.js'

let hoveredStateId = null

export default {
  meta: {
    link: {
      material: { rel: 'stylesheet', href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' }
    }
  },
  name: 'Map',
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglNavigationControl,
    MglFullscreenControl,
    MglGeocoderControl,
    MapLayerPlugin
  },
  props: {
    stops: Array,

    // fallback profile if stop has nothing set
    profile: String,
    childrenAges: Array,
    adults: Number,
    rooms: Number,
    editor: Boolean,
    defaultInitDate: String,
    height: String
  },
  computed: {
    isMobile () {
      return window.matchMedia('(max-width: 550px)').matches
    },
    accTo () {
      return this.$store.getters['api/getMapboxKey']
    }
    // isTablet () {
    //   return window.matchMedia('(max-width: 958px)').matches
    // }
  },
  data () {
    return {
      mapStyle: 'mapbox://styles/mareiski/ck27d9xpx5a9s1co7c2golomn',
      addedRoutes: [],
      showAddStopMarker: false,
      lastClickCoordinates: [0, 0],
      lastClickLocation: {},
      title: null,
      mapbox: null,
      whitelistedLabels: ['airport-label', 'place-label', 'state-label', 'poi-label', 'settlement-label', 'natural-point-label'], // 'country-label',
      centerLocation: [0, 0],
      markerClicked: false,
      showDetailsDialog: false,
      drawerLeft: false,
      miniState: true,
      showDrawerList: true,
      miniDisabled: false,
      suggestedCities: [],
      showCityMarkers: false,
      showPOIMarkers: false,
      suggestedPOIs: [],
      suggestionDialogVisible: false,
      lastPOICityData: {},
      lastSightDetailsLat: 0,
      lastSightDetailsLng: 0,
      suggestionCountry: null,
      showSuggestionCountryDialog: false,
      countryOptions: countries,
      loading: true
    }
  },
  watch: {
    stops: function (val, oldVal) {
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        this.loadMap(this.map)
      }
    }
  },
  methods: {
    update (event) {
      this.$emit('update', event)
    },
    /**
     * filter countries method used in filter method of quasar select component
     */
    filterCountries (val, update, _abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = countries.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    /**
     * checks if a given cityName was already added as a stop
     */
    isStopAlreadyAdded (cityName) {
      return this.stops[this.stops.findIndex(x => x.Location.label === cityName)]
    },
    /**
     * checks if a sight was already added to the stop for given city name
     */
    sightAlreadyAdded (poiName, cityName) {
      let stopToCheck = this.stops[this.stops.findIndex(x => x.Location.label === cityName)]
      return stopToCheck && stopToCheck.Sights.includes(poiName)
    },
    onMapLoaded (event) {
      console.log('onmaploaded')
      this.loading = false

      this.map = event.map
      let context = this

      this.loadMap(event.map).then(_e => {
        // wait 1 second to ensure map is realy loaded
        setTimeout(function () {
          context.fitToBounds(bounds)
        }, 1000)
      })
    },
    fitToBounds (bounds) {
      try {
        if (bounds.length > 1) {
          turf().then(turf => {
            var line = turf.lineString(bounds)
            var bbox = turf.bbox(line)
            this.map.fitBounds(new Mapbox.LngLatBounds(bbox), { padding: 80 })
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    markCityOnMap (location) {
      this.changeCityMarkerSize('50px', location)
    },
    hideCityOnMap (location) {
      this.changeCityMarkerSize('30px', location)
    },
    /**
     * changes the size of the city marker for given location
     */
    changeCityMarkerSize (size, location) {
      const context = this
      this.suggestedCities.forEach((city, index) => {
        const currentLocation = [city.latitude, city.longitude]
        if (location[0] === currentLocation[0] && location[1] === currentLocation[1]) {
          context.$refs['cityMarkerIcon' + index][0].size = size
        }
      })
    },
    markPOIOnMap (location) {
      this.changePOIMarkerSize('50px', location)
    },
    hidePOIOnMap (location) {
      this.changePOIMarkerSize('30px', location)
    },
    /**
     * changes the size of the city marker for given location
     */
    changePOIMarkerSize (size, location) {
      const context = this
      this.suggestedPOIs.forEach((poi, index) => {
        const currentLocation = [poi.location.lat, poi.location.lng]
        if (location[0] === currentLocation[0] && location[1] === currentLocation[1]) {
          context.$refs['poiMarkerIcon' + index][0].size = size
        }
      })
    },
    /**
     * gets suggested cities and shows markers
     */
    showCitiesOnMap () {
      CitySuggestionMethods.getCities(this.suggestionCountry).then(response => {
        if (!response) return

        this.suggestedCities = response

        if (this.showPOIMarkers) {
          this.showPOIMarkers = false
          this.showCityMarkers = true
        }

        // set map to city boundaries
        let cityBounds = []
        this.suggestedCities.forEach(city => {
          cityBounds.push([city.longitude, city.latitude])
        })

        this.fitToBounds(cityBounds)
        this.showCityMarkers = true
      })
    },
    goToCity (name) {
      const drawerScrollArea = this.$refs['DrawerScrollArea']

      const el = document.getElementById('CitySuggestion' + name)

      const offset = el.offsetTop

      drawerScrollArea.setScrollPosition(offset - 20, 400)
    },
    /**
     * shows the given pois on map
     */
    showPOIsOnMap (pois) {
      this.showCityMarkers = false
      this.suggestedPOIs = pois
      this.showPOIMarkers = true

      // set map to city boundaries
      let poisBounds = []
      this.suggestedPOIs.forEach(poi => {
        poisBounds.push([poi.location.lng, poi.location.lat])
      })

      this.fitToBounds(poisBounds)
    },
    /**
    * switches the map drawer back to list (called from MapDrawerItem)
    */
    switchDrawerToList () {
      this.miniDisabled = false
      this.miniState = true
      this.showDrawerList = true
      this.showCityMarkers = false
    },
    handleSearch (event) {
      let result = event.result

      if (!this.markerClicked) {
        this.lastClickCoordinates = result.geometry.coordinates
        let placeName = result.place_name

        if (placeName.includes(',')) placeName = placeName.split(',')[0]

        this.title = placeName
        this.showAddStopMarker = true

        this.loadMarkerInfos(placeName)

        let context = this
        // we never want to hide the popup
        if (!context.$refs.addStopMarker.marker._popup.options.showed) {
          setTimeout(function () {
            context.$refs.addStopMarker.togglePopup()
          }, 100)
        }
      }
      this.markerClicked = false
    },
    onMarkerClicked (event, title) {
      // reset the marker popup
      this.lastPOICityData = {
        title: title,
        description: '',
        shortDescription: '',
        img: '',
        imgSrc: ''
      }

      this.loadMarkerInfos(title)

      event.map.flyTo({ center: event.component.marker._lngLat, speed: 0.5, curve: 1 })
      this.markerClicked = true
    },
    showSightDetails (lat, lng) {
      if (lat !== this.lastSightDetailsLat || lng !== this.lastSightDetailsLng) {
        sharedMethods.getGooglePlacesData(lat, lng).then(POIArr => {
          this.suggestedPOIs = POIArr
          this.showDetailsDialog = true
        }).catch((e) => {
          console.log(e)
        })
        this.lastSightDetailsLat = lat
        this.lastSightDetailsLng = lng
      } else {
        this.showDetailsDialog = true
      }
      // const headers = {
      //   'Content-Type': 'application/json; charset=UTF-8'
      // }

      // let context = this
      // getAxios().then(axios => {
      //   axios.get('https://de.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=description%7Cextracts%7Cpageimages&titles=' + name + '&exintro=1&explaintext=1&piprop=name%7Coriginal',
      //     { headers: headers })
      //     .then(function (response) {
      //       const pages = response.data.query.pages
      //       const firstPageName = Object.keys(pages)[0]

      //       const title = pages[firstPageName].title
      //       const description = pages[firstPageName].description
      //       const extract = pages[firstPageName].extract
      //       const src = pages[firstPageName].original ? pages[firstPageName].original.source : ''

      //       context.sightDialog = { title: title || name, showed: true, description: description, extract: extract || 'Es konnten leider keine Informationen gefunden werden', src: src }
      //     }).catch(function (error) {
      //       console.log('Error' + error)
      //       context.sightDialog = { title: name, showed: true, description: '', extract: 'Es konnten leider keine Informationen gefunden werden', src: '' }
      //     })
      // })
    },
    addStop () {
      this.showAddStopMarker = false
      this.lastClickLocation.label = this.title
      this.lastClickLocation.lat = this.lastClickCoordinates[1]
      this.lastClickLocation.lng = this.lastClickCoordinates[0]

      if (this.stops[this.stops.length - 1] && this.stops[this.stops.length - 1].InitDate) {
        const initDate = this.stops[this.stops.length - 1].InitDate

        let currentInitDate = sharedMethods.getDateFromString(initDate)

        const defaultCheckOutDate = currentInitDate
        defaultCheckOutDate.setDate(currentInitDate.getDate() + 1)

        const formattedDate = date.formatDate(defaultCheckOutDate, 'DD.MM.YYYY HH:mm')

        // need this json stringify to prevent update of location when the click location changes
        this.$emit('addStop', { date: formattedDate, location: JSON.parse(JSON.stringify(this.lastClickLocation)) })
      } else {
        this.$emit('addStop', { date: null, location: JSON.parse(JSON.stringify(this.lastClickLocation)) })
      }

      // reload map and fly to coords
      this.lastClickCoordinates = [0, 0]
      this.loadMap(this.map).then(_success => {
        this.map.flyTo({ center: this.lastClickLocation, zoom: 6, speed: 0.5, curve: 1 })

        // we only want to hide the popup
        this.$refs.addStopMarker.marker._popup.remove()
      })
    },
    getChildrenText () {
      let text = '&group_children=' + this.childrenAges.length
      this.childrenAges.forEach(child => {
        text += '&age=' + child
      })
      return text
    },
    getExpediaChildrenText () {
      let text = null
      this.childrenAges.forEach((childAge, index) => {
        text += (index !== 0 ? '_' : '') + childAge
      })
      return text
    },
    getRandomColor (step, numOfSteps) {
      var r, g, b
      var h = step / numOfSteps
      var i = ~~(h * 6)
      var f = h * 6 - i
      var q = 1 - f
      switch (i % 6) {
        case 0: r = 1; g = f; b = 0; break
        case 1: r = q; g = 1; b = 0; break
        case 2: r = 0; g = 1; b = f; break
        case 3: r = 0; g = q; b = 1; break
        case 4: r = f; g = 0; b = 1; break
        case 5: r = 1; g = 0; b = q; break
      }
      var c = '#' + ('00' + (~~(r * 255)).toString(16)).slice(-2) + ('00' + (~~(g * 255)).toString(16)).slice(-2) + ('00' + (~~(b * 255)).toString(16)).slice(-2)
      return (c)
    },
    capitalize (s) {
      if (s) {
        s = s.toLowerCase()
        s = s.charAt(0).toUpperCase() + s.slice(1)
      }
      return s
    },
    loadMap (map, stops) {
      return new Promise((resolve) => {
        if (map === null) map = this.map

        // if we have stops given than copy them
        if (stops) this.stops = stops

        // if map hasn't load yet don't do anything
        if (map) {
          // delete all routes
          this.addedRoutes.forEach(route => {
            // if (this.$refs['route' + route.id]) this.$delete(this.$refs['speedMarker' + route.id])
            map.setLayoutProperty(route.id, 'visibility', 'none')
          })

          this.addedRoutes = []

          // reset total trip count
          this.$emit('distanceUpdate', -1)

          this.stops.forEach((stop, index) => {
            if (index >= 1) {
              this.getRoute(this.stops[index - 1].Location, stop.Location, map, index, this.stops[index - 1].Profile, false)
            }
            if (stop.DailyTrips) {
              stop.DailyTrips.forEach((dailyTrip, dailyTripIndex) => {
                // if its not the first item calculate from last to this one
                if (dailyTripIndex >= 1) {
                  if (!dailyTrip.newDate) {
                    // its not a new date calculate from last stop
                    this.getRoute(stop.DailyTrips[dailyTripIndex - 1].location, dailyTrip.location, map, index + dailyTripIndex, stop.Profile, true)
                  } else {
                    // it starts from origin stop, calculate from there
                    this.getRoute(stop.Location, dailyTrip.location, map, index + dailyTripIndex, stop.Profile, true)

                    // also calculate route back to origin from the last daily trip
                    this.getRoute(stop.DailyTrips[dailyTripIndex - 1].location, stop.Location, map, index + index + dailyTripIndex, stop.Profile, true)
                  }
                } else {
                  // its the first item calculate from origin stop
                  this.getRoute(stop.Location, dailyTrip.location, map, index + dailyTripIndex, stop.Profile, true)
                }
                // it its the last daily trip calculate route back to origin
                if (dailyTripIndex === stop.DailyTrips.length - 1) this.getRoute(dailyTrip.location, stop.Location, map, dailyTripIndex + index, stop.Profile, true)
              })
            }

            if (bounds.length !== 0) {
              bounds.forEach((coordinateArray, index) => {
                const currentStopLng = parseFloat(stop.Location.lng)
                const currentStopLat = parseFloat(stop.Location.lat)
                if (coordinateArray[0] === currentStopLng && coordinateArray[1] === currentStopLat) return false
                if (index === bounds.length - 1) {
                  bounds.push([currentStopLng, currentStopLat])
                  return true
                }
              })
            } else {
              bounds.push([parseFloat(stop.Location.lng), parseFloat(stop.Location.lat)])
            }
          })

          let context = this
          map.on('click', function (e) {
            if (!context.markerClicked) {
              // reset the marker popup
              context.lastPOICityData = {
                title: 'Laden...',
                description: '',
                shortDescription: '',
                img: '',
                imgSrc: ''
              }

              var features = map.queryRenderedFeatures(e.point)
              var displayProperties = [
                'properties',
                'id',
                'layer',
                'geometry'
              ]

              var displayFeatures = features.map(function (feat) {
                var displayFeat = {}
                displayProperties.forEach(function (prop) {
                  displayFeat[prop] = feat[prop]
                })
                return displayFeat
              })

              displayFeatures.forEach(feature => {
                if (context.whitelistedLabels.includes(feature.layer.id) && !context.markerClicked) {
                  context.lastClickCoordinates = feature.geometry.coordinates
                  context.title = feature.properties.name_de

                  // check if this stop has already a popup on map
                  let stop = context.isStopAlreadyAdded(context.title)
                  if (stop) {
                    context.$refs['stopMarker' + stop.DocId][0].marker._popup.addTo(map)
                    return
                  }

                  context.showAddStopMarker = true
                  map.flyTo({ center: feature.geometry.coordinates, speed: 0.5, curve: 1 })

                  // we never want to hide the popup
                  if (!context.$refs.addStopMarker.marker._popup.options.showed) {
                    setTimeout(function () {
                      if (!context.$refs.addStopMarker.marker._popup.options.showed) context.$refs.addStopMarker.marker._popup.addTo(map)
                    }, 100)
                  }
                }
              })

              context.loadMarkerInfos(context.title)
            }
            context.markerClicked = false
          })

          // map.on('move', () => {
          // var features = map.queryRenderedFeatures(map.getCenter())
          // var displayProperties = [
          //   'properties'd
          // ]

          // var displayFeatures = features.map(function (feat) {
          //   var displayFeat = {}
          //   displayProperties.forEach(function (prop) {
          //     displayFeat[prop] = feat[prop]
          //   })
          //   return displayFeat
          // })

          // displayFeatures.forEach(feature => {
          //   if (feature.layer.id === 'country-label') console.log(feature.properties.name_de)
          // })
          // })
          resolve(true)
        }
      })
    },
    loadMarkerInfos (title) {
      let context = this

      if (title) {
        if (title.includes(',')) title = title.split(',')[0]

        // load additional infos for marker
        sharedMethods.getWikivoyageData(title).then(result => {
          CitySuggestionMethods.getCityImage(title, '').then(image => {
            if (result) {
              result.img = image.url
              context.lastPOICityData = result
            }
          })
        }).catch((e) => {
          console.log(e)
        })
      }
    },
    flyToPointOnMap (lat, lng) {
      let context = this
      setTimeout(function () {
        console.log('fly to')
        context.map.flyTo({ center: [lng, lat], speed: 0.8, curve: 1, zoom: 12 })
      }, context.map == null ? 3000 : 100)
    },
    deg2rad (deg) {
      return deg * (Math.PI / 180)
    },
    getRoute (startLocation, endLocation, map, index, stopProfile, dailyTrip) {
      let profile = this.profile
      if (stopProfile && stopProfile !== null && typeof stopProfile !== 'undefined') profile = stopProfile

      // get id for route
      let id = (dailyTrip ? 1 : '') + 5 + index

      // get random color for route
      let color = this.getRandomColor(index, this.stops.length)

      if (profile !== 'plane') {
        // create url for the duration request
        var url = 'https://api.mapbox.com/directions/v5/mapbox/' + profile + '/' + startLocation.lng + ',' + startLocation.lat + ';' + endLocation.lng + ',' + endLocation.lat + '?geometries=geojson&access_token=' + this.accTo
        let context = this

        // retrieve data from mapbox
        getAxios().then(axios => {
          axios.get(url)
            .then(response => {
              var data = response.data.routes[0]
              var route = data.geometry.coordinates

              var geojson = {
                id: id,
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: route
                }
              }

              // calculate coordinates of route marker
              let geojsonCoords = geojson.geometry.coordinates
              let centerLocation = geojsonCoords[Math.floor(geojsonCoords.length / 2)]

              // get duration
              let duration = sharedMethods.msToTime(data.duration * 1000)

              let rawDistance = Math.floor(data.distance / 1000) > 0 ? Math.floor(data.distance / 1000) : 0
              let distance = rawDistance > 0 ? rawDistance + ' km' : null

              this.$emit('distanceUpdate', rawDistance)

              // add route marker
              if (duration !== null) context.addedRoutes.push({ location: centerLocation, duration: duration, distance: distance, color: color, origin: startLocation.label.split(',')[0], destination: endLocation.label.split(',')[0], id: id })

              // if the route already exists on the map, reset it using setData
              if (map.getSource(id)) {
                map.getSource(id).setData(geojson)
                map.setPaintProperty(id, 'line-color', color)
                map.setLayoutProperty(id, 'visibility', 'visible')
              } else { // otherwise, make a new request
                map.addLayer({
                  'id': id,
                  'type': 'line',
                  'source': {
                    'type': 'geojson',
                    'data': {
                      'type': 'Feature',
                      'properties': {},
                      'geometry': {
                        'type': 'LineString',
                        'coordinates': geojson
                      }
                    }
                  },
                  'layout': {
                    'line-join': 'round',
                    'line-cap': 'round',
                    'visibility': 'visible'
                  },
                  'paint': {
                    'line-color': color,
                    'line-width': 5,
                    'line-opacity': [
                      'case',
                      ['boolean', ['feature-state', 'hover'], false],
                      0.75,
                      0.4
                    ]
                  }
                })

                map.on('click', id, function (_e) {
                  // close all popups
                  context.closeAllPopups()
                  if (!context.markerClicked) context.$refs[id][0].togglePopup()
                })
                map.getSource(id).setData(geojson)
              }
            }).catch(function (error) {
              console.log(error)
            })
        })
      } else {
        let coordinates = [[startLocation.lng, startLocation.lat], [endLocation.lng, endLocation.lat]]

        var route = {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'LineString',
                'coordinates': coordinates
              }
            }
          ]
        }

        map.addSource('route', {
          'type': 'geojson',
          'data': route
        })

        map.addLayer({
          'id': id,
          'source': 'route',
          'type': 'line',
          'paint': {
            'line-width': 2,
            'line-color': color
          }
        })

        // calculate coordinates of route marker
        const avgLng = Math.floor((Number(startLocation.lng) + Number(endLocation.lng)) / 2)
        const avgLat = Math.floor((Number(startLocation.lat) + Number(endLocation.lat)) / 2)

        let centerLocation = [avgLng, avgLat]

        // add route marker
        this.addedRoutes.push({ location: centerLocation, duration: null, distance: null, color: color, origin: this.stops[index - 1].Location.label.split(',')[0], destination: this.stops[index].Location.label.split(',')[0], id: id })
      }

      // When the user moves their mouse over the route, we'll update the
      // feature state for the feature under the mouse.
      map.on('mousemove', id, function (e) {
        if (e.features.length > 0) {
          if (hoveredStateId && typeof hoveredStateId !== 'undefined') {
            map.setFeatureState(
              { id: hoveredStateId },
              { hover: false }
            )
          }
          if (e.features[0].layer.id && typeof e.features[0].layer.id !== 'undefined') {
            hoveredStateId = e.features[0].layer.id
            map.setFeatureState(
              { source: hoveredStateId, id: hoveredStateId },
              { hover: true }
            )
          }
        }
      })

      // When the mouse leaves the route, update the feature state of the
      // previously hovered feature.
      map.on('mouseleave', id, function () {
        if (hoveredStateId && typeof hoveredStateId !== 'undefined') {
          map.setFeatureState(
            { source: hoveredStateId, id: hoveredStateId },
            { hover: false }
          )
        }
        hoveredStateId = null
      })
    },
    closeAllPopups () {
      const popups = document.getElementsByClassName('mapboxgl-popup')

      console.log(popups)
      for (let i = 0; i < popups.length; i++) {
        console.log(popups[i])
        popups[i].remove()
      }
    }
  },
  created () {
    bounds = []
    this.centerLocation = [10.451526, 51.165691]
    if (this.stops[0] && this.stops[0].Location) {
      this.centerLocation = [this.stops[0].Location.lng, this.stops[0].Location.lat]
    }
    this.mapbox = Mapbox
    this.map = null
  }
}

</script>
