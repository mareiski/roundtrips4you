<template>
  <div class="roundtrip-details q-px-lg q-pb-md">
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="10000"
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
        name="map"
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
      ref="tabPanels"
    >
      <q-tab-panel name="overview">
        <q-timeline color="secondary">
          <q-timeline-entry heading>
            Reiseverlauf
          </q-timeline-entry>
          <div class="stop-list">
            <template v-for="(stop, index) in stops">
              <Stop
                :key="stop"
                :title="stop.Title"
                :date="dates[index]"
                :icon="!stop.HotelStop ? 'location_on' : 'hotel'"
                :editor-placeholder="stop.Description"
                :general-link="stop.GeneralLink"
                :location="stop.Location && typeof stop.Location !== 'undefined' &&stop.Location.label ? stop.Location.label : null"
                :parkingPlace="stop.Parking && typeof stop.Parking !== 'undefined' && stop.Parking.label ? stop.Parking.label : null"
                :days="typeof days[days.findIndex(x => x.title === stop.Title)] !== 'undefined' ? days[days.findIndex(x => x.title === stop.Title)].days : null"
              ></Stop>
              <Duration
                :key="stop"
                v-if="index !== stops.length - 1 && durations[durations.findIndex(x => x.title === stop.Title)].duration !== null"
                :duration="durations[durations.findIndex(x => x.title === stop.Title)].duration + durations[durations.findIndex(x => x.title === stop.Title)].distance"
              ></Duration>
            </template>
          </div>
        </q-timeline>
        <a
          class="panel-links"
          @click="$refs.tabPanels.goTo('map')"
        >zur Karte</a>

      </q-tab-panel>

      <q-tab-panel name="map">
        <Map
          profile="driving"
          :stops="stops"
        ></Map>
        <br>
        <a @click="$refs.tabPanels.goTo('overview')">zur Rutenübersicht</a>
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
import Duration from '../pages/EditRoundtripComponents/duration'
import axios from 'axios'

let details = []
let roundtrip = []

let roundtripDocId = null

export default {
  components: {
    Stop,
    Map,
    Duration
  },
  data () {
    return {
      dates: [],
      stops: [],
      roundtrip: [],
      slide: null,
      galeryImgUrls: [],
      tab: 'overview',
      durations: [],
      accessToken: 'pk.eyJ1IjoibWFyZWlza2kiLCJhIjoiY2pkaHBrd2ZnMDIyOTMzcDIyM2lra3M0eSJ9.wcM4BSKxfOmOzo67iW-nNg',
      days: []

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

            if (index > 0) {
              const date1 = initDates[index - 1]
              const date2 = initDates[index]
              const diffTime = new Date(date2 - date1).getTime()

              const addedTime = retrievedDate.setTime(retrievedDate.getTime() + diffTime)
              const addedDate = new Date(addedTime)

              addedDate.setMinutes(initDate.getMinutes())
              addedDate.setHours(initDate.getHours())

              const returnDate = date.formatDate(addedDate, 'DD.MM.YYYY HH:mm')

              this.dates.splice(index, 0, returnDate)
            } else {
              this.dates.splice(index, 0, date.formatDate(retrievedDate, 'DD.MM.YYYY HH:mm'))
            }
          })
          this.stops = details

          this.stops.forEach((stop, index) => {
            if (index >= 1) this.getDuration([this.stops[index - 1].Location.lng, this.stops[index - 1].Location.lat], [stop.Location.lng, stop.Location.lat], this.stops[index - 1].Title, this.stops[index - 1], index - 1)
          })
        })
        .catch(err => {
          console.log('Error getting Roundtripdetails', err)
        })
    },
    getDuration (startLocation, endLocation, title, stop, index) {
      var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + startLocation[0] + ',' + startLocation[1] + ';' + endLocation[0] + ',' + endLocation[1] + '?geometries=geojson&access_token=' + this.accessToken
      let context = this

      axios.get(url)
        .then(response => {
          var data = response.data.routes[0]

          context.getDays(stop, index, data.duration * 1000, title)

          let duration = context.msToTime(data.duration * 1000)

          let distance = Math.floor(data.distance / 1000) > 0 ? Math.floor(data.distance / 1000) + ' km' : ''
          if (distance !== '') distance = ' (' + distance + ')'

          context.durations.splice(context.stops.findIndex(x => x.Title === title), 0, { duration: duration, distance: distance, title: title })
        })
    },
    msToTime (duration) {
      if (duration === 0) return null

      var minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

      let returnVal
      if (hours === 0 && minutes === 0) returnVal = null
      else if (hours === 0) returnVal = minutes + ' min'
      else if (minutes === 0) returnVal = hours + ' h'
      else returnVal = hours + ' h ' + minutes + ' min'

      return returnVal
    },
    getDays (stop, index, duration) {
      let days = null

      if (index < this.stops.length - 1) {
        let formattedDate = date.formatDate(new Date(stop.InitDate.seconds * 1000), 'DD.MM.YYYY HH:mm')
        let dateTimeParts = formattedDate.split(' ')
        let dateParts = dateTimeParts[0].split('.')
        let timeParts = dateTimeParts[1].split(':')
        let currentInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

        formattedDate = date.formatDate(new Date(this.stops[index + 1].InitDate.seconds * 1000), 'DD.MM.YYYY HH:mm')
        dateTimeParts = formattedDate.split(' ')
        dateParts = dateTimeParts[0].split('.')
        timeParts = dateTimeParts[1].split(':')
        let nextInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

        console.log(duration)

        let dateDistance = (nextInitDate.getTime() - currentInitDate.getTime()) - duration
        days = this.msToTime(dateDistance)
      }
      this.days.splice(this.stops.findIndex(x => x.Title === stop.Title), 0, { days: days, title: stop.Title })
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
