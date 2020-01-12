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
    >
      <MglNavigationControl position="top-right" />
      <MglMarker
        v-for="stop in stops"
        :key="stop"
        :coordinates="[stop.Location.lng, stop.Location.lat]"
        color="#D56026"
      >
        <MglPopup>
          <VCard>
            <a
              v-if="stop.HotelStop"
              :href="stop.GeneralLink"
              target="_blank"
            >{{stop.Title}}</a>
            <p v-if="!stop.HotelStop">{{stop.Title}}</p>
            <p>
              <a
                target="_blank"
                :href="'https://www.google.com/maps/search/?api=1&query=' + stop.Location.label"
              >{{stop.Location.label}}</a>
            </p>
          </VCard>
        </MglPopup>
      </MglMarker>
      <MglMarker
        v-for="route in addedRoutes"
        :key="route"
        :coordinates="route.location"
        :color="route.color"
      >
        <q-icon
          slot="marker"
          :style="{'color': route.color, 'background-color': 'white', 'border-radius': '50%'}"
          name="speed"
        />
        <MglPopup>
          <VCard>
            <div>{{route.duration}} bis {{route.destination}} {{route.distance !== null ? '(' + route.distance + ')' : null}}</div>
            <a
              target="_blank"
              :href="'https://www.google.com/maps/dir/?api=1&origin=' + route.origin + '&destination=' + route.destination"
            >auf Google ansehen</a>
          </VCard>
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

import Mapbox from 'mapbox-gl'
import {
  MglMap,
  MglPopup,
  MglMarker,
  MglNavigationControl
} from 'vue-mapbox'
import axios from 'axios'

export default {
  name: 'Map',
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglNavigationControl
  },
  props: {
    stops: Array,
    profile: String
  },
  data () {
    return {
      accessToken: 'pk.eyJ1IjoibWFyZWlza2kiLCJhIjoiY2pkaHBrd2ZnMDIyOTMzcDIyM2lra3M0eSJ9.wcM4BSKxfOmOzo67iW-nNg',
      mapStyle: 'mapbox://styles/mareiski/ck27d9xpx5a9s1co7c2golomn',
      addedRoutes: []
    }
  },
  methods: {
    onMapLoaded (event) {
      const map = event.map

      let bounds = []
      this.stops.forEach((stop, index) => {
        if (index >= 1) this.getRoute([this.stops[index - 1].Location.lng, this.stops[index - 1].Location.lat], [stop.Location.lng, stop.Location.lat], map, index, stop.Profile)
        bounds.push([stop.Location.lng, stop.Location.lat])
      })

      map.fitBounds(new Mapbox.LngLatBounds(bounds))
    },
    msToTime (duration) {
      var minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

      let returnVal
      if (hours === 0 && minutes === 0) returnVal = null
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
    getRoute (startLocation, endLocation, map, index, stopProfile) {
      let profile = this.profile
      if (stopProfile && stop.Profile !== null && typeof stopProfile !== 'undefined') profile = stopProfile
      var url = 'https://api.mapbox.com/directions/v5/mapbox/' + profile + '/' + startLocation[0] + ',' + startLocation[1] + ';' + endLocation[0] + ',' + endLocation[1] + '?geometries=geojson&access_token=' + this.accessToken
      let context = this

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

          let id = 'route' + index
          let color = this.getRandomColor()

          let geojsonCoords = geojson.geometry.coordinates
          let centerLocation = geojsonCoords[Math.floor(geojsonCoords.length / 2)]

          let duration = context.msToTime(data.duration * 1000)

          let distance = Math.floor(data.distance / 1000) > 0 ? Math.floor(data.distance / 1000) + ' km' : null

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
          // add turn instructions here at the end
        })
    }
  },
  created () {
    this.mapbox = Mapbox
  }
}

</script>
