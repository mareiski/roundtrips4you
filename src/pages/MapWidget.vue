<template>
  <div class="widgets">
    <Map
      v-show="mapLoaded"
      :profile="getProfile(inputProfile)"
      :stops="stops"
      :childrenAges="[]"
      :adults="2"
      :rooms="1"
    ></Map>
    <div
      v-show="!mapLoaded"
      class="flex justify-center"
      style="position:absolute; top:250px; left:48%"
    >
      <q-spinner
        size="80px"
        color="primary"
      >
      </q-spinner>
    </div>
  </div>
</template>
<style lang="less">
.q-page-container {
  margin-top: 0 !important;
}
</style>
<script>
import { db } from '../firebaseInit.js'
import { Loading } from 'quasar'
import sharedMethods from '../sharedMethods.js'

let roundtrip = []
let details = []

export default {
  components: {
    Map: () => import('../pages/Map/Map')
  },
  data () {
    return {
      stops: [],
      inputProfile: null,
      mapLoaded: false
    }
  },
  name: 'MapWidget',
  meta: {
    title: !roundtrip[0] ? 'MapWidget' : roundtrip[0].Title,
    meta: {
      robot: { name: 'robot', content: 'noIndex' }

    }
  },
  methods: {
    loadSingleRoundtrip (RTId) {
      let roundtrip
      let roundtripsRef = db.collection('Roundtrips')
        .where('RTId', '==', RTId)
        .limit(1)
      roundtripsRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            roundtrip = doc.data()
          })

          if (roundtrip.Public) {
            this.inputProfile = roundtrip.Profile

            // set default values to ensure privacy
            this.childrenAges = []
            this.rooms = 1
            this.adults = 2

            roundtripsRef = db.collection('RoundtripDetails')
              .where('RTId', '==', RTId)
              .orderBy('InitDate')
            roundtripsRef.get()
              .then(snapshot => {
                details = []
                snapshot.forEach(doc => {
                  details.push(doc.data())
                  details[details.findIndex(x => x.docId === doc.data().DocId)].DocId = doc.id
                })
                this.stops = details
                this.mapLoaded = true
              })
          } else {
            sharedMethods.showErrorNotification('Uuups, diese Karte ist leider privat')
            this.$router.push('/')
          }
        })
        .catch(err => {
          console.log('Error getting Roundtrip', err)
        })
    },
    getProfile (profile) {
      switch (profile) {
        case 'zu Fuß':
          return 'walking'
        case 'Fahrrad':
          return 'cycling'
        case 'Flugzeug':
          return 'plane'
        default:
          return 'driving'
      }
    }
  },
  created () {
    let RTId = this.$route.params.id
    this.loadSingleRoundtrip(RTId)
    Loading.hide()
  }
}
</script>
