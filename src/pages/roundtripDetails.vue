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
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      style="padding-top:20px;"
    >
      <q-tab
        name="overview"
        label="Übersicht"
      />
      <q-tab
        name="card"
        label="Karte"
      />
      <!--<q-tab
        name="ratings"
        label="Bewertungen"
      />-->
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel name="overview">
        <q-timeline color="secondary">
          <q-timeline-entry heading>
            Reiseverlauf
          </q-timeline-entry>
          <div class="stop-list">
            <Stop
              v-for="(stop, index) in stops"
              :key="stop"
              :title="stop.Title"
              :date="dates[index]"
              :icon="!stop.HotelStop ? 'location_on' : 'hotel'"
              :editor-placeholder="stop.Description"
              :general-link="stop.GeneralLink"
              :location="stop.Location.label.split(',')[0]"
            ></Stop>
          </div>
        </q-timeline>
      </q-tab-panel>

      <q-tab-panel name="card">
        <Map :stops="stops"></Map>
      </q-tab-panel>

      <q-tab-panel name="ratings">
        <div class="text-h6">Bewertungen</div>
        <div class="q-pa-md row justify-center">
          <div style="width: 100%; max-width: 400px">
            <q-chat-message label="Sunday, 19th" />
            <q-chat-message
              name="me"
              avatar="https://cdn.quasar.dev/img/avatar4.jpg"
              :text="['hey, how are you?']"
            >
              <q-rating
                class="stars"
                v-model="tempStars"
                size="15px"
                color="gold"
                style="margin-right:10px;"
              />
            </q-chat-message>
            <q-chat-message
              name="Jane"
              avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              :text="[`doing fine, how r you?`]"
            />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>

  </div>
</template>
<style lang="less">
@import "../css/editRoundtrips.less";
</style>
<script>
import { date } from 'quasar'
import Stop from '../pages/EditRoundtripComponents/stop'
import { db, storage } from '../firebaseInit'
import Map from '../pages/Map/Map'

let details = []
let roundtrip = []

let roundtripDocId = null

export default {
  components: {
    Stop,
    Map
  },
  data () {
    return {
      dates: [],
      stops: [],
      roundtrip: [],
      slide: null,
      galeryImgUrls: [],
      tab: 'overview'
    }
  },
  methods: {
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
    loadRoundtripDetails (RTId, retrievedDate) {
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

          let initDates = []
          // get dates
          details.forEach((detail, index) => {
            const initDate = new Date(detail.InitDate.seconds * 1000)
            initDates.splice(index, 0, initDate)

            retrievedDate = new Date(retrievedDate)
            retrievedDate.setMinutes(initDate.getMinutes())
            retrievedDate.setHours(initDate.getHours())

            console.log('receivedDate' + retrievedDate)

            if (index > 0) {
              const date1 = initDates[index - 1]
              const date2 = initDates[index]
              const diffTime = new Date(date2 - date1).getTime()

              const addedTime = retrievedDate.setTime(retrievedDate.getTime() + diffTime)

              const returnDate = date.formatDate(new Date(addedTime), 'DD.MM.YYYY HH:mm')

              this.dates.splice(index, 0, returnDate)
            } else {
              this.dates.splice(index, 0, date.formatDate(retrievedDate, 'DD.MM.YYYY HH:mm'))
            }
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
    const params = this.$route.params.id
    let RTId = params
    let userDate = null

    if (params.includes('&')) {
      RTId = params.split('&')[0]
      userDate = params.split('&')[1]
    }

    this.loadRoundtripDetails(RTId, parseInt(userDate))
    this.loadSingleRoundtrip(RTId)
  }
}
</script>
