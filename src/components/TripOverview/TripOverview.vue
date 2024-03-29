<template>
  <div class="trip-overview">
    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="350"
      elevated
      :breakpoint="550"
      :mini="isTablet ? miniState : false"
      @mouseover="!miniDisabled ? miniState = false : null"
      @mouseout="!miniDisabled ? miniState = true : null"
      content-class="bg-whit"
    >
      <q-scroll-area
        class="fit"
        ref="DrawerScrollArea"
      >
        <TripOverviewList
          :addedStops="addedStops"
          :currentRoundtrip="currentRoundtrip"
          @stopsDragged="$emit('stopsDragged', $event);"
          @editStop="$emit('editStop', $event);"
          @removeStop="$emit('removeStop', $event);"
        ></TripOverviewList>
      </q-scroll-area>
    </q-drawer>
    <div v-if="drawerInvisible">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          name="map"
          label="Karte"
        />
        <q-tab
          name="list"
          label="Liste"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
        ref="tabPanels"
        keep-alive
      >
        <q-tab-panel name="map">
          <Map
            :profile="addedStops[0] && addedStops[0].Profile ? addedStops[0].Profile : 'driving'"
            :stops="addedStops"
            :childrenAges="currentRoundtrip.ChildrenAges"
            :rooms="Number(currentRoundtrip.Rooms)"
            :adults="Number(currentRoundtrip.Adults)"
            :editor="true"
            @addStop="$emit('addStop', $event)"
            @update="$emit('update', $event)"
            @distanceUpdate="$emit('distanceUpdate', $event)"
            @addSight="$emit('addSight', $event)"
            @editStop="$emit('editStop', $event)"
            ref="overviewMap"
            height="90vh;"
          ></Map>
        </q-tab-panel>
        <q-tab-panel name="list">
          <TripOverviewList
            :addedStops="addedStops"
            :currentRoundtrip="currentRoundtrip"
            @stopsDragged="$emit('stopsDragged', $event);"
            @editStop="$emit('editStop', $event);"
            @removeStop="$emit('removeStop', $event);"
          ></TripOverviewList>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div
      v-else
      :style="'margin-left:' + (isEditMode ? '350px;' : '326px;')"
    >
      <Map
        :profile="addedStops[0] && addedStops[0].Profile ? addedStops[0].Profile : 'driving'"
        :stops="addedStops"
        :childrenAges="currentRoundtrip.ChildrenAges"
        :rooms="Number(currentRoundtrip.Rooms)"
        :adults="Number(currentRoundtrip.Adults)"
        :editor="true"
        @addStop="$emit('addStop', $event)"
        @update="$emit('update', $event)"
        @distanceUpdate="$emit('distanceUpdate', $event)"
        @addSight="$emit('addSight', $event)"
        @editStop="$emit('editStop', $event)"
        ref="overviewMap"
        height="90vh;"
      ></Map>
    </div>
  </div>
</template>

<script>
import sharedMethods from '../../sharedMethods'
import Map from '../Map/Map.vue'
import TripOverviewList from './TripOverviewList.vue'

export default {
  name: 'TripOverview',
  components: {
    Map,
    TripOverviewList
  },
  data () {
    return {
      drawerLeft: false,
      miniState: true,
      miniDisabled: false,
      tab: 'map'
    }
  },
  methods: {
    refreshMap () {
      console.log('refresh')
      if (this.$refs.overviewMap) this.$refs.overviewMap.loadMap(null, this.addedStops)
    }
  },
  props: {
    addedStops: Array,
    currentRoundtrip: Object,
    isEditMode: Boolean
  },
  computed: {
    isTablet () {
      return window.matchMedia('(max-width: 958px)').matches
    },
    drawerInvisible () {
      return window.matchMedia('(max-width: 550px)').matches
    }
  },
  mounted () {
    // do not use this.currentRoundtrip !
    this.$store.dispatch('roundtrips/fetchSingleRoundtrip', this.$route.params.id).then(roundtrip => {
      if (roundtrip.TransportProfile === 'Flugzeug') {
        if (roundtrip.Origin) {
          sharedMethods.getAdditionalAirportData(roundtrip.Origin).then(data => {
            let location = { lat: data.latitude, lng: data.longitude, label: data.name }
            this.$refs.overviewMap.addArrivalDepartureMarker(location, true)
          })
        }

        if (roundtrip.Destination) {
          sharedMethods.getAdditionalAirportData(roundtrip.Destination).then(data => {
            let location = { lat: data.latitude, lng: data.longitude, label: data.name }
            this.$refs.overviewMap.addArrivalDepartureMarker(location, false)
          })
        }
      }
    })
  }
}
</script>

<style lang="less">
.q-drawer {
  z-index: 2 !important;
  height: 90vh;
}
</style>
