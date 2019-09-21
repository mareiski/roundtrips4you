<template>
  <div class="roundtrip-details q-px-lg q-pb-md">

    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      autoplay
      swipeable
      control-color="white"
      padding
      arrows
    >
      <q-carousel-slide
        v-for="url in galeryImgUrls"
        :key="url"
        :name="url"
        :img-src="url"
      />
    </q-carousel>
    <div class="carousel-placeholder">
      <h3>{{roundtrip[0].Title}}</h3>
    </div>
    <q-timeline color="secondary">
      <q-timeline-entry heading>
        Reiseverlauf
      </q-timeline-entry>
      <div class="stop-list">
        <Stop
          v-for="stop in stops"
          :key="stop"
          :title="stop.Title"
          :date="date"
          :icon="!stop.HotelStop ? 'location_on' : 'hotel'"
          :editor-placeholder="stop.Description"
          :general-link="stop.GeneralLink"
          :location="stop.Location"
        ></Stop>
      </div>
    </q-timeline>
  </div>
</template>
<style lang="less">
@import "../css/editRoundtrips.less";
</style>
<script>
import { date } from 'quasar'
import Stop from '../pages/EditRoundtripComponents/stop'
import { db, storage } from '../firebaseInit'

let details = []
let roundtrip = []

let timeStamp = Date.now()
let formattedDate = date.formatDate(timeStamp, 'DD.MM.YYYY HH:mm')

let roundtripDocId = null

const stringOptions = [
  'Deutschland', 'Italien', 'Vietnam'
]

export default {
  components: {
    Stop
  },
  data () {
    return {
      date: formattedDate,
      countryOptions: stringOptions,
      stops: [],
      roundtrip: [],
      slide: null,
      galeryImgUrls: []
    }
  },
  methods: {
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    loadSingleRoundtrip (RTId) {
      let roundtripsRef = db.collection('Roundtrips')
        .where('RTId', '==', RTId)
        .limit(1)
      roundtripsRef.get()
        .then(snapshot => {
          roundtrip = []
          snapshot.forEach(doc => {
            roundtrip.push(doc.data())
            roundtripDocId = doc.id
          })
          this.roundtrip = roundtrip
          this.loadGaleryImgs()
        })
        .catch(err => {
          console.log('Error getting Roundtrip', err)
        })
    },
    loadRoundtripDetails (RTId) {
      this.selectedCountry = this.country
      this.visible = true
      this.showSimulatedReturnData = false
      let roundtripsRef = db.collection('RoundtripDetails')
        .where('RTId', '==', RTId)
        .orderBy('InitDate')
      roundtripsRef.get()
        .then(snapshot => {
          details = []
          snapshot.forEach(doc => {
            details.push(doc.data())
          })
          this.stops = details

          // get dates
          details.forEach((detail) => {
            const initDate = new Date(detail.InitDate.seconds * 1000)
            this.date = date.formatDate(initDate, 'DD.MM.YYYY HH:mm')
          })
          this.stops = details
        })
        .catch(err => {
          console.log('Error getting Roundtripdetails', err)
        })
    },
    loadGaleryImgs () {
      const context = this
      let fileRef = storage.ref().child('Images/Roundtrips/' + roundtripDocId + '/Galery')
      fileRef.listAll().then(function (res) {
        res.items.forEach(function (itemRef) {
          fileRef = storage.ref().child(itemRef.fullPath)
          context.galeryImgUrls = []
          fileRef.getDownloadURL().then(function (url) {
            console.log(context.galeryImgUrls)
            context.galeryImgUrls.push(url)
            if (context.galeryImgUrls.length === 1) context.slide = url
          })
        })
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  created () {
    const RTId = this.$route.params.id
    this.loadRoundtripDetails(RTId)
    this.loadSingleRoundtrip(RTId)
  }
}
</script>
