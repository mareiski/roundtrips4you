<template>
  <div class="mapbox-ctrl mapbox-ctrl-group">
    <q-btn
      color="white"
      text-color="secondary"
      icon="layers"
      style="position:absolute; right:9px; top:175px;"
    >
      <q-tooltip>Kartendesign</q-tooltip>
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
  </div>
</template>

<script>
import sharedMethods from '../../sharedMethods.js'

export default {
  name: 'MapLayerPlugin',
  inject: ['mapbox', 'map', 'actions'],

  methods: {
    switchMapStyle (styleName) {
      let parent = sharedMethods.getParent('Map', this)
      switch (styleName) {
        case 'nav':
          parent.mapStyle = 'mapbox://styles/mareiski/ckcevjmf81b7t1imouvv52xrh'
          break
        case 'out':
          parent.mapStyle = 'mapbox://styles/mareiski/ckcew03vc12dy1imgq1eonlvt'
          break
        case 'sat':
          parent.mapStyle = 'mapbox://styles/mareiski/ckcevopcq123g1imgb36xu37s'
          break
        default:
          parent.mapStyle = 'mapbox://styles/mareiski/ck27d9xpx5a9s1co7c2golomn'
          break
      }
      parent.loadMap(this.map)
    }
  }
}
</script>
