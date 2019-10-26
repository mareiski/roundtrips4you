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
                :href="'https://maps.google.com/?q=' + stop.Location.lat + ',' + stop.Location.lng"
              >{{stop.Location.label}}</a>
            </p>
          </VCard>
        </MglPopup>
      </MglMarker>
      <MglPopup
        v-for="route in addedRoutes"
        :key="route"
        :coordinates="[0,0]"
        :showed="true"
        anchor="top"
      >
        <VCard>
          <div>Hello {{route.duration}} h</div>
        </VCard>
      </MglPopup>
    </MglMap>
  </div>
</template>
<style lang="css" scoped>
@import "https://cdn.jsdelivr.net/npm/leaflet@1.5.1/dist/leaflet.css";
</style>
<script>
// import * as L from 'leaflet'
// require('leaflet-routing-machine')
// import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import Mapbox from 'mapbox-gl'
import {
  MglMap,
  MglPopup,
  MglMarker,
  MglNavigationControl
} from 'vue-mapbox'

export default {
  name: 'Map',
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglNavigationControl
  },
  props: {
    stops: Array
  },
  data () {
    return {
      accessToken: 'pk.eyJ1IjoibWFyZWlza2kiLCJhIjoiY2pkaHBrd2ZnMDIyOTMzcDIyM2lra3M0eSJ9.wcM4BSKxfOmOzo67iW-nNg',
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      addedRoutes: []

    }
  },
  methods: {
    onMapLoaded (event) {
      const map = event.map
      map.setLayoutProperty('country-label', 'text-field', ['get', 'name_de'])
      map.setLayoutProperty('location-label', 'text-field', ['get', 'name_de'])

      let bounds = []
      this.stops.forEach((stop, index) => {
        if (index >= 1) this.getRoute([this.stops[index - 1].Location.lng, this.stops[index - 1].Location.lat], [stop.Location.lng, stop.Location.lat], map, index)
        bounds.push([stop.Location.lng, stop.Location.lat])
      })

      map.fitBounds(new Mapbox.LngLatBounds(bounds))
    },
    getRoute (startLocation, endLocation, map, index) {
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + startLocation[0] + ',' + startLocation[1] + ';' + endLocation[0] + ',' + endLocation[1] + '?geometries=geojson&access_token=' + this.accessToken
      let context = this

      // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
      var req = new XMLHttpRequest()
      req.responseType = 'json'
      req.open('GET', url, true)
      req.onload = function () {
        var data = req.response.routes[0]
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
        let color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)

        let firstRoute = route[index]
        let secondRoute = route[index - 1]
        let locationAvarage = [(firstRoute[0] + secondRoute[0]) / 2, (firstRoute[1] + secondRoute[1])]

        context.addedRoutes.push({ location: locationAvarage, duration: Math.floor(data.duration / 3600), id: id })
        console.log(context.addedRoutes)

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
      }
      req.send()
    }
  },
  created () {
    this.mapbox = Mapbox
  }
}

</script>
