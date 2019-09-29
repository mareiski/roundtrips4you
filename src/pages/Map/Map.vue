<template>
  <div>
    <l-map
      ref="leafletMap"
      :zoom="zoom"
      :bounds="bounds"
      style="height:400px"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      ></l-tile-layer>
      <l-marker
        v-for="stop in stops"
        :key="stop"
        :lat-lng="[stop.Location.lat, stop.Location.lng]"
      >
        <l-popup>Hello!</l-popup>
      </l-marker>
    </l-map>
  </div>
</template>
<style lang="css" scoped>
@import "https://cdn.leafletjs.com/leaflet-0.7.5/leaflet.css";
</style>
<script>
import * as L from 'leaflet'
require('leaflet-routing-machine')
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  props: {
    stops: Array
  },
  data () {
    return {
      zoom: 13,
      center: [0, 0],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      bounds: L.latLngBounds([])
    }
  },
  methods: {
    removeMarker (index) {
      this.markers.splice(index, 1)
    },
    addMarker (event) {
      this.markers.push(event.latlng)
    },
    handleError (error) {
      alert(error)
    }
  },
  created () {
    let bounds = []

    this.stops.forEach((stop, index) => {
      bounds.push([stop.Location.lat, stop.Location.lng])
    })
    this.bounds = L.latLngBounds(bounds)
  },
  mounted () {
    L.Routing.control({
      waypoints: [
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949)
      ]
    }).addTo(this.$refs.leafletMap)
  }
}

</script>
