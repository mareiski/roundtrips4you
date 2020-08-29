<template>
  <div>
    <MglMap
      :accessToken="accTo"
      :mapStyle.sync="mapStyle"
      style="height:500px;"
      :center="centerLocation"
      :zoom="6"
      :mapboxGl="mapbox"
      :attributionControl="false"
      @load="onMapLoaded"
    >
      <MglGeocoderControl
        :accessToken="accTo"
        :input.sync="defaultInput"
        @result="handleSearch"
        placeholder="Ort suchen"
        v-if="editor"
      />
      <MglFullscreenControl position="bottom-right" />
      <MglNavigationControl position="top-right" />
      <q-btn
        color="white"
        text-color="secondary"
        icon="layers"
        style="position:absolute; right:9px; top:175px;"
      >
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item
              clickable
              @click="switchMapStyle(null)"
              v-close-popup
            >
              <q-item-section>Standard</q-item-section>
            </q-item>
            <q-separator />

            <q-item
              clickable
              @click="switchMapStyle('nav')"
              v-close-popup
            >
              <q-item-section>Navigation</q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              @click="switchMapStyle('sat')"
              v-close-popup
            >
              <q-item-section>Satellit</q-item-section>
            </q-item>
            <q-separator />

            <q-item
              clickable
              @click="switchMapStyle('out')"
              v-close-popup
            >
              <q-item-section>Outdoor</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <MglMarker
        v-for="stop in stops"
        :key="stop.DocId"
        :coordinates="stop.HotelName && stop.HotelLocation && !isNaN(stop.HotelLocation.lat) ? [stop.HotelLocation.lat, stop.HotelLocation.lng] : [stop.Location.lng, stop.Location.lat]"
        color="#D56026"
        @click="onMarkerClicked($event)"
      >
        <MglPopup>
          <q-card>
            <q-img
              v-if="stop.StopImages"
              width="240px"
              height="135px"
              :src="stop.StopImages[0]"
            ></q-img>
            <q-card-section>
              <div class="text-h6">
                {{stop.Title}}
              </div>
              <div class="text-subtitle2">
                <p style="margin-bottom:5px;">
                  <q-icon name="location_on" />
                  <a
                    target="_blank"
                    :href="!stop.HotelName || !stop.HotelLocation ? 'https://www.google.com/maps/search/?api=1&query=' + stop.Location.label : 'https://www.google.com/maps/search/?api=1&query=' + stop.HotelLocation.label"
                  >{{stop.HotelName && stop.HotelLocation ? stop.HotelLocation.label : stop.Location.label}}</a>
                </p>
                <p v-if="stop.GeneralLink && stop.GeneralLink.length > 0">
                  <q-icon name="house" />
                  <a
                    :href="stop.GeneralLink"
                    target="blank"
                  >{{capitalize(stop.HotelName)}}</a>
                </p>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-chip
                icon="fab fa-bootstrap"
                v-if="stop.HotelName && typeof stop.HotelName !== 'undefined'"
                dense
                style="width:175px;"
                class="linkChip"
                clickable
                @click="openInNewTab('https://www.booking.com/searchresults.de.html?&ss=' + capitalize(stop.HotelName) + '&checkin_year=' + new Date(stop.InitDate.seconds * 1000).getFullYear() + '&checkin_month=' + new Date(stop.InitDate.seconds * 1000).getMonth() + '&checkin_monthday=' + new Date(stop.InitDate.seconds * 1000).getDay() + '&checkout_year=' + stop.CheckOutDate.split('.')[2] + '&checkout_month=' + stop.CheckOutDate.split('.')[1] + '&checkout_monthday=' + stop.CheckOutDate.split('.')[0] + '&group_adults=' + adults + getChildrenText() +  '&no_rooms=' + stop.Rooms + '&ac_langcode=de')"
              > Hotel auf booking.com</q-chip>
              <q-chip
                icon="house"
                v-if="stop.HotelName && typeof stop.HotelName !== 'undefined'"
                dense
                style="width:175px;"
                class="linkChip"
                clickable
                @click="openInNewTab('https://www.expedia.de/Hotel-Search?adults=' + adults + 'children=' + getExpediaChildrenText() + '%2C1_3&destination=' + capitalize(stop.HotelName) + '&endDate=' + stop.CheckOutDate.split(' ')[0].split('.')[2] + '-' + stop.CheckOutDate.split('.')[1] + '-' + stop.CheckOutDate.split('.')[0] + '&rooms=' + stop.rooms + '&sort=RECOMMENDED&startDate=' + new Date(stop.InitDate.seconds * 1000).getFullYear() + '-' + new Date(stop.InitDate.seconds * 1000).getMonth() + '-' + new Date(stop.InitDate.seconds * 1000).getDay() + '&theme=&useRewards=true')"
              > Hotel auf expedia</q-chip>
            </q-card-section>
          </q-card>
        </MglPopup>
      </MglMarker>
      <template v-for="stop in stops">
        <MglMarker
          v-for="dailyTrip in stop.DailyTrips"
          :key="dailyTrip.id"
          :coordinates="[dailyTrip.location.lng, dailyTrip.location.lat]"
          color="#D56026"
          @click="onMarkerClicked($event)"
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
                  {{dailyTrip.location.label.split(',')[0]}} - Tagesausflug von {{stop.Location.label.split(',')[0]}}
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
      <MglMarker
        :coordinates="lastClickCoordinates"
        color="#d56026a1"
        @click="onMarkerClicked($event)"
        v-if="editor"
        ref="addStopMarker"
      >
        <MglPopup>
          <q-card>
            <q-card-section class="row items-center">
              <span
                style="font-size:16px;"
                class="q-ml-sm"
              >{{title ? title : 'Diesen Stopp'}} zu deiner Reise hinzufügen?</span>
            </q-card-section>

            <q-input
              filled
              v-model="title"
              lazy-rules
              :rules="[val => val.length > 0 || 'Bitte gib einen Titel für diesen Stopp ein']"
              class="input-item"
              outlined
              label="Titel eingeben"
              style="margin:5px; width:auto;"
            >
            </q-input>

            <q-card-actions align="right">
              <q-btn
                flat
                label="Infos"
                @click="showSightDetails(title)"
                color="secondary"
                v-show="title"
              />
              <q-btn
                flat
                label="Punkt hinzufügen"
                @click="addStop"
                color="primary"
              />
            </q-card-actions>
          </q-card>
        </MglPopup>
      </MglMarker>
      <q-dialog v-model="sightDialog.showed">
        <q-card>
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
        </q-card>
      </q-dialog>
      <div
        v-for="stop in stops"
        :key="'StopContainer' + stop.DocId"
      >
        <MglMarker
          v-if="stop.Parking && typeof stop.Parking !== 'undefined' && !isNaN(stop.Parking.lng)"
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
                <p>{{ stop.parkingPlace && typeof stop.parkingPlace !== 'undefined' &&  stop.parkingPlace.label && typeof stop.parkingPlace.label !== 'undefined' ? stop.Parking.label.split(',')[0] : 'Parkplatz für ' + stop.Title}}</p>
              </q-card-section>
            </q-card>
          </MglPopup>
        </MglMarker>
      </div>
      <MglMarker
        v-for="(route, index) in addedRoutes"
        :key="route.id + index"
        :coordinates="route.location"
        :color="route.color"
        @click="onMarkerClicked($event)"
        :ref="route.id"
      >
        <q-icon
          slot="marker"
          :style="{'color': route.color, 'background-color': 'white', 'border-radius': '50%'}"
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
  </div>
</template>
<style lang="less" scoped>
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

let bounds = []

import {
  MglMarker,
  MglNavigationControl,
  MglPopup,
  MglFullscreenControl
} from 'vue-mapbox'

import(/* webpackPrefetch: true */ '../../css/map.less')

const getAxios = () => import('axios')
import { date } from 'quasar'
import sharedMethods from '../../sharedMethods'

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
    MglGeocoderControl
  },
  props: {
    stops: Array,
    profile: String,
    childrenAges: Array,
    adults: Number,
    rooms: Number,
    editor: Boolean
  },
  data () {
    return {
      accTo: 'pk.eyJ1IjoibWFyZWlza2kiLCJhIjoiY2pkaHBrd2ZnMDIyOTMzcDIyM2lra3M0eSJ9.wcM4BSKxfOmOzo67iW-nNg',
      mapStyle: 'mapbox://styles/mareiski/ck27d9xpx5a9s1co7c2golomn',
      addedRoutes: [],
      showAddStopMarker: false,
      lastClickCoordinates: [0, 0],
      lastClickLocation: {},
      title: null,
      mapbox: null,
      defaultInput: null,
      whitelistedLabels: ['airport-label', 'place-label', 'country-label', 'state-label', 'poi-label', 'settlement-label', 'natural-point-label'],
      centerLocation: [0, 0],
      markerClicked: false,
      sightDialog: {}
    }
  },
  watch: {
    stops: function (val, oldVal) {
      if (val !== oldVal) {
        this.loadMap(this.map)
      }
    }
  },
  methods: {
    switchMapStyle (styleName) {
      switch (styleName) {
        case 'nav':
          this.mapStyle = 'mapbox://styles/mareiski/ckcevjmf81b7t1imouvv52xrh'
          break
        case 'out':
          this.mapStyle = 'mapbox://styles/mareiski/ckcew03vc12dy1imgq1eonlvt'
          break
        case 'sat':
          this.mapStyle = 'mapbox://styles/mareiski/ckcevopcq123g1imgb36xu37s'
          break
        default:
          this.mapStyle = 'mapbox://styles/mareiski/ck27d9xpx5a9s1co7c2golomn'
          break
      }
      this.loadMap(this.map)
    },
    onMapLoaded (event) {
      this.map = event.map
      this.loadMap(event.map).then(e => {
        // wait 1 second to ensure map is realy loaded
        setTimeout(function () {
          try {
            if (bounds.length > 1) {
              turf().then(turf => {
                var line = turf.lineString(bounds)
                var bbox = turf.bbox(line)
                event.map.fitBounds(new Mapbox.LngLatBounds(bbox), { padding: 70 })
              })
            }
          } catch (e) {
            console.log(e)
          }
        }, 1000)
      })
    },
    handleSearch (event) {
      let result = event.result

      if (!this.markerClicked) {
        this.lastClickCoordinates = result.geometry.coordinates
        this.title = result.place_name
        this.showAddStopMarker = true

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
    onMarkerClicked (event) {
      event.map.flyTo({ center: event.component.marker._lngLat, speed: 0.5, curve: 1 })
      this.markerClicked = true
    },
    showSightDetails (name) {
      const headers = {
        'Content-Type': 'application/json; charset=UTF-8'
      }

      let context = this
      getAxios().then(axios => {
        axios.get('https://de.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=description%7Cextracts%7Cpageimages&titles=' + name + '&exintro=1&explaintext=1&piprop=name%7Coriginal',
          { headers: headers })
          .then(function (response) {
            const pages = response.data.query.pages
            const firstPageName = Object.keys(pages)[0]

            const title = pages[firstPageName].title
            const description = pages[firstPageName].description
            const extract = pages[firstPageName].extract
            const src = pages[firstPageName].original ? pages[firstPageName].original.source : ''

            context.sightDialog = { title: title || name, showed: true, description: description, extract: extract || 'Es konnten leider keine Informationen gefunden werden', src: src }
          }).catch(function (error) {
            console.log('Error' + error)
            context.sightDialog = { title: name, showed: true, description: '', extract: 'Es konnten leider keine Informationen gefunden werden', src: '' }
          })
      })
    },
    addStop (event) {
      this.showAddStopMarker = false
      this.lastClickLocation.label = this.title
      this.lastClickLocation.lat = this.lastClickCoordinates[1]
      this.lastClickLocation.lng = this.lastClickCoordinates[0]

      const initDate = this.stops[this.stops.length - 1].InitDate

      let dateTimeParts = initDate.split(' ')
      let dateParts = dateTimeParts[0].split('.')
      let timeParts = dateTimeParts[1].split(':')
      let currentInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

      const defaultCheckOutDate = currentInitDate
      defaultCheckOutDate.setDate(currentInitDate.getDate() + 1)

      const formattedDate = date.formatDate(defaultCheckOutDate, 'DD.MM.YYYY HH:mm')

      // need this json stringify to prevent update of location when the click location changes
      this.$root.$emit('addStop', formattedDate, JSON.parse(JSON.stringify(this.lastClickLocation)))

      // reload map and fly to coords
      this.lastClickCoordinates = [0, 0]
      this.loadMap(this.map).then(success => {
        this.map.flyTo({ center: this.lastClickLocation, zoom: 6, speed: 0.5, curve: 1 })

        // we only want to hide the popup
        this.$refs.addStopMarker.marker._popup.remove()
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
    openInNewTab (link) {
      window.open(link, '_blank')
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
      return new Promise((resolve, reject) => {
        if (map === null) map = this.map

        // if we have stops given than copy them
        if (stops) this.stops = stops

        // if map hasn't load yet don't do anything
        if (map) {
          // delete all routes
          this.addedRoutes.forEach(route => {
            map.setLayoutProperty(route.id, 'visibility', 'none')
          })

          this.addedRoutes = []

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
            }
            context.markerClicked = false
          })
          resolve(true)
        }
      })
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

              let distance = Math.floor(data.distance / 1000) > 0 ? Math.floor(data.distance / 1000) + ' km' : null

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

                map.on('click', id, function (e) {
                  context.$refs[id][0].togglePopup()
                })
                map.getSource(id).setData(geojson)
              }
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
    }
  },
  created () {
    bounds = []
    this.centerLocation = [0, 0]
    if (this.stops[0] && this.stops[0].Location) {
      this.centerLocation = [this.stops[0].Location.lng, this.stops[0].Location.lat]
    }
    this.mapbox = Mapbox
    this.map = null
  }
}

</script>
