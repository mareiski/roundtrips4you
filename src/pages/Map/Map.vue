<template>
  <div>
    <MglMap
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      style="height:500px;"
      :center="[stops[0].Location.lng, stops[0].Location.lat]"
      :zoom="6"
      :mapboxGl="mapbox-gl"
      :attributionControl="false"
      @load="onMapLoaded"
      @click="mapClicked($event)"
    >
      <MglNavigationControl position="top-right" />
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
      <div
        v-for="stop in stops"
        :key="'StopContainer' + stop.DocId"
        @click="onMarkerClicked($event)"
      >
        <MglMarker
          v-if="stop.Parking && typeof stop.Parking !== 'undefined' && !isNaN(stop.Parking.lng)"
          :key="'Stop' + stop.DocId"
          :coordinates="[stop.Parking.lng, stop.Parking.lat]"
          color="#D56026"
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
        :key="route.color"
        :coordinates="route.location"
        :color="route.color"
        @click="onMarkerClicked($event)"
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
              <div>{{route.duration}} bis {{route.destination}} {{ route[index -1] ? 'von ' + route[index - 1].destination : ''}} {{route.distance !== null ? '(' + route.distance + ')' : null}}</div>
              <a
                target="_blank"
                v-if="route.origin !== route.destination"
                :href="'https://www.google.com/maps/dir/?api=1&origin=' + route.origin + '&destination=' + route.destination"
              >auf Google ansehen</a>
            </q-card-section>
          </q-card>
          <q-card v-else>
            <q-card-section>
              <div>{{route.distance}} mit dem Flugzeug nach {{route.destination}} {{ route[index -1] ? 'von ' + route[index - 1].destination : ''}}</div>
            </q-card-section>
          </q-card>
        </MglPopup>
      </MglMarker>
    </MglMap>
    <q-dialog
      v-if="editor"
      v-model="addStopDialog"
    >
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Möchtest du diesen Punkt zu deiner Reise hinzufügen?</span>
        </q-card-section>

        <q-input
          filled
          v-model="title"
          lazy-rules
          :rules="[val => val.length > 0 || 'Bitte gib einen Titel für diesen Stop ein']"
          class="input-item"
          outlined
          label="Titel eingeben"
          style="width:300px; margin-left:12%;"
        >
        </q-input>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Abbrechen"
            color="primary"
            v-close-popup
          />
          <q-btn
            flat
            label="Punkt hinzufügen"
            @click="addStop"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import Mapbox from 'mapbox-gl'

import {
  MglMarker,
  MglNavigationControl,
  MglPopup
} from 'vue-mapbox'

const getAxios = () => import('axios')
import { date } from 'quasar'

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
    MglNavigationControl
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
      accessToken: 'pk.eyJ1IjoibWFyZWlza2kiLCJhIjoiY2pkaHBrd2ZnMDIyOTMzcDIyM2lra3M0eSJ9.wcM4BSKxfOmOzo67iW-nNg',
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      addedRoutes: [],
      addStopDialog: false,
      lastClickLocation: {},
      markerClicked: false,
      title: null
    }
  },
  watch: {
    'stops': function (val, oldVal) {
      if (val !== oldVal) {
        this.loadMap(this.map)
      }
    }
  },
  methods: {
    onMapLoaded (event) {
      this.map = event.map
      this.loadMap(event.map)
    },
    mapClicked (event) {
      if (!this.markerClicked) {
        this.addStopDialog = true
        this.lastClickLocation = { lat: event.mapboxEvent.lngLat.lat, lng: event.mapboxEvent.lngLat.lng, label: 'unbekannter Ort' }
      }
      this.markerClicked = false
    },
    onMarkerClicked (event) {
      this.markerClicked = true
      event.map.flyTo({ center: event.component.marker._lngLat, speed: 0.5, curve: 1 })
    },
    addStop (event) {
      this.lastClickLocation.label = this.title

      const timeStamp = Date.now()
      const formattedDate = date.formatDate(timeStamp, 'DD.MM.YYYY HH:mm')

      this.getParent('EditRoundtrips').addStop(formattedDate, false, this.lastClickLocation, null, null).then(success => {
        this.loadMap(this.map).then(success => {
          this.map.flyTo({ center: this.lastClickLocation, zoom: 6, speed: 0.5, curve: 1 })
        })
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
    msToTime (duration) {
      var ms = duration % 1000
      duration = (duration - ms) / 1000

      var secs = duration % 60
      duration = (duration - secs) / 60

      var minutes = duration % 60
      var hours = (duration - minutes) / 60

      let returnVal
      if ((hours === 0 && minutes === 0) || (hours < 0 || minutes < 0)) returnVal = null
      else if (hours === 0) returnVal = minutes + ' min'
      else if (minutes === 0) returnVal = hours + ' h'
      else returnVal = hours + ' h ' + minutes + ' min'

      return returnVal
    },
    getRandomColor () {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    capitalize (s) {
      if (s) {
        s = s.toLowerCase()
        s = s.charAt(0).toUpperCase() + s.slice(1)
      }
      return s
    },
    loadMap (map) {
      return new Promise((resolve, reject) => {
        if (map === null) map = this.map

        // if map hasn't load yet don't do anything
        if (map) {
          let bounds = []

          // delete all routes
          // this.addedRoutes.forEach(route => {
          //   map.removeLayer(route.id)
          // })

          // this.addedRoutes = []

          this.stops.forEach((stop, index) => {
            let previousStopLng = 0
            let previousStopLat = 0

            if (index >= 1) {
              if (this.stops[index - 1].HotelName && this.stops[index - 1].HotelLocation) {
                previousStopLng = this.stops[index - 1].HotelLocation.lat
                previousStopLat = this.stops[index - 1].HotelLocation.lng
              } else {
                previousStopLat = this.stops[index - 1].Location.lat
                previousStopLng = this.stops[index - 1].Location.lng
              }
            }

            if (stop.HotelName && stop.HotelLocation) {
              if (index >= 1) this.getRoute([previousStopLng, previousStopLat], [stop.HotelLocation.lng, stop.HotelLocation.lat], map, index, this.stops[index - 1].Profile)

              bounds.push([parseFloat(stop.HotelLocation.lng), parseFloat(stop.HotelLocation.lat)])
            } else {
              if (index >= 1) this.getRoute([previousStopLng, previousStopLat], [stop.Location.lng, stop.Location.lat], map, index, this.stops[index - 1].Profile)
              bounds.push([parseFloat(stop.Location.lng), parseFloat(stop.Location.lat)])
            }
          })
          try {
            map.fitBounds(new Mapbox.LngLatBounds(bounds))
          } catch (e) {
            console.log(e)
          }

          resolve(true)
        }
      })
    },
    getDistanceFromLatLonInKm (lat1, lon1, lat2, lon2) {
      var R = 6371 // Radius of the earth in km
      var dLat = this.deg2rad(lat2 - lat1) // deg2rad below
      var dLon = this.deg2rad(lon2 - lon1)
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)

      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      var d = R * c // Distance in km
      return d
    },
    deg2rad (deg) {
      return deg * (Math.PI / 180)
    },
    getRoute (startLocation, endLocation, map, index, stopProfile) {
      let profile = this.profile
      if (stopProfile && stopProfile !== null && typeof stopProfile !== 'undefined') profile = stopProfile

      // get id for route
      let id = 'route' + index

      // get color for route
      let color = this.getRandomColor()

      if (profile !== 'plane') {
        var url = 'https://api.mapbox.com/directions/v5/mapbox/' + profile + '/' + startLocation[0] + ',' + startLocation[1] + ';' + endLocation[0] + ',' + endLocation[1] + '?geometries=geojson&access_token=' + this.accessToken
        let context = this

        getAxios().then(axios => {
          axios.get(url)
            .then(response => {
              var data = response.data.routes[0]
              var route = data.geometry.coordinates
              var geojson = {
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

              let duration = context.msToTime(data.duration * 1000)

              let distance = Math.floor(data.distance / 1000) > 0 ? Math.floor(data.distance / 1000) + ' km' : null

              // add route marker
              if (duration !== null) context.addedRoutes.push({ location: centerLocation, duration: duration, distance: distance, color: color, origin: context.stops[index - 1].Location.label.split(',')[0], destination: context.stops[index].Location.label.split(',')[0], id: id })

              // if the route already exists on the map, reset it using setData
              if (map.getSource(id)) {
                map.getSource(id).setData(geojson)
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
                    'line-cap': 'round'
                  },
                  'paint': {
                    'line-color': color,
                    'line-width': 5,
                    'line-opacity': 0.75
                  }
                })
                map.getSource(id).setData(geojson)
              }
            })
        })
      } else {
        var geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [[startLocation[0], startLocation[1]], [endLocation[0], endLocation[1]]]
          }
        }

        // calculate coordinates of route marker
        let geojsonCoords = geojson.geometry.coordinates
        let centerLocation = geojsonCoords[Math.floor(geojsonCoords.length / 2)]

        let distance = this.getDistanceFromLatLonInKm(startLocation[0], startLocation[1], endLocation[0], endLocation[1])
        let avgDistance = Math.floor(distance / 1000) > 0 ? Math.floor(distance / 1000) + ' km' : null

        // add route marker
        this.addedRoutes.push({ location: centerLocation, duration: null, distance: avgDistance, color: color, origin: this.stops[index - 1].Location.label.split(',')[0], destination: this.stops[index].Location.label.split(',')[0], id: id })

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
            'line-cap': 'round'
          },
          'paint': {
            'line-color': color,
            'line-width': 5,
            'line-opacity': 0.75
          }
        })
        map.getSource(id).setData(geojson)
      }
    }
  },
  created () {
    this.mapbox = this.Mapbox
    this.map = null
    console.log(this.stops)
  }
}

</script>
