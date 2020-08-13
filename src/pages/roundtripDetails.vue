<template>
  <div class="roundtrip-details q-px-lg q-pb-md">
    <div
      class="edit-btn-container"
      v-if="user !== null && (!roundtrip || user.uid !== roundtrip.UserId)"
      style="position:absolute; z-index:1; right:0; padding: 10px"
    >
      <q-btn
        round
        color="primary"
        icon="edit"
        @click="editRTDialog = true"
      >
        <q-tooltip>Diese Reise bearbeiten</q-tooltip>
      </q-btn>
      <q-dialog
        v-model="editRTDialog"
        persistent
      >
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Reise bearbeiten</div>
            <span>Diese Reise wird zu deinen eigenen Reisen hinzugefügt, damit du sie bearbeiten kannst. Bitte gib dafür den Titel der Rundreise ein.</span>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="title"
              autofocus
              outlined
              @input="checkDisableEditBtn($event)"
              :rules="[val => val !== null &&  val !== ''  || 'Bitte gib einen Titel an', val => isUniqueTitle(val), val => val[0] !== ' ' || 'Das erste Zeichen kann kein Leerzeichen sein']"
              label="Titel der Rundreise"
              style="text-transform:capitalize;"
            />
          </q-card-section>

          <q-card-actions
            align="right"
            class="text-primary"
          >
            <q-btn
              label="Abbrechen"
              v-close-popup
              flat
            />
            <q-btn
              type="submit"
              label="Rundreise bearbeiten"
              flat
              v-close-popup
              :disable="disableEditBtn"
              @click=" $router.push('/rundreise-bearbeiten/' + roundtrip.RTId +'&' + title)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="back-link">
      <a
        @click="prevRouteParams && prevRouteParams.length > 0 ? $router.go(-1) : $router.push('/rundreisen/'  + roundtrip.Location[0])"
        style="text-decoration:none;"
      >
        <q-icon name="keyboard_arrow_left"></q-icon>
        zurück zu allen Rundreisen
      </a>
    </div>
    <q-carousel
      animated
      v-model="slide"
      infinite
      :autoplay="10000"
      swipeable
      padding
      arrows
    >
      <q-carousel-slide
        v-for="(url, index) in galeryImgUrls"
        :key="index"
        style="padding:0;"
        :name="url"
      >
        <q-img
          class="full-width full-height"
          spinner-color="primary"
          :src="url"
        />
      </q-carousel-slide>
    </q-carousel>
    <div class="carousel-placeholder">
      <h1>{{roundtrip ? roundtrip.Title : null}}</h1>
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
      <q-tab
        name="ratings"
        label="Bewertungen"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
      ref="tabPanels"
      keep-alive
    >
      <q-tab-panel name="overview">
        <q-timeline color="secondary">
          <q-timeline-entry heading>
            <div class="flex justify-between">
              <span>Reiseverlauf {{roundtrip ? '- ' + roundtrip.Title : null}}</span>
              <q-toggle
                style="font-size:18px"
                @input="sharedMethods.expandAllStops(getContext, stops)"
                v-model="allStopsExpanded"
                label="Stopps ausklappen"
              ></q-toggle>
            </div>
            <div class="legal-description">
              <p v-if="!creator.companyProfile">Alle Stopps, Hotels, Sehenswürdigkeiten usw. sind von {{ creator.UserName ? creator.UserName : ' dem Ersteller dieser Rundreise ' }} empfohlen.</p>
              <p v-if="!creator.companyProfile">Diese Reise dient nur zur Veranschaulichung und Darstellung eines Reisevorschlags.</p>
              <span v-if="creator.UserName">Diese Rundreise wurde von </span>
              <router-link
                v-if="roundtrip"
                :to="'/benutzerprofil/' + roundtrip.UserId"
              >
                {{creator.UserName}}<q-tooltip>
                  <q-avatar
                    size="50px"
                    style="width: 50px; margin:0; padding:0;"
                  >
                    <q-img :src="creator.UserImage"></q-img>
                  </q-avatar>
                </q-tooltip>
              </router-link>
              <q-badge
                v-if="creator.TrustedUser"
                align="top"
                color="blue"
                style="border-radius:50%; border-radius: 50%; padding: 2px; padding-top: 2.5px; margin-left:1px;"
              >
                <q-icon
                  name="done"
                  color="white"
                  size="13px"
                />
                <q-tooltip>Dies ist ein von Roundtrips4you anerkannter User</q-tooltip>
              </q-badge>
              <span v-if="creator.UserName"> erstellt</span>
              <br>
              <q-btn
                style="margin-top:20px;"
                v-if="!!creator.companyProfile && creator.UserName && tripWebsite"
                @click="openInNewTab(tripWebsite)"
              >Bei {{creator.UserName}} buchen</q-btn>
            </div>
            <div class="details-desctiption-container">
              <p>{{roundtrip.Description}}</p>
            </div>
          </q-timeline-entry>
          <template v-if="!stopsLoaded">
            <template v-for="n in 2">
              <q-timeline-entry :key="n">
                <template v-slot:subtitle>
                  <q-skeleton
                    width="300px"
                    height="10px"
                    type="rect"
                    style="margin-bottom:10px;"
                  />
                </template>
                <div
                  class="flex"
                  style="margin-bottom:10px;"
                >
                  <q-skeleton
                    width="400px"
                    height="15px"
                    type="rect"
                    style="margin-right:10px;"
                  />
                </div>
                <q-skeleton
                  width="90%"
                  height="50px"
                  type="rect"
                />
              </q-timeline-entry>

              <q-timeline-entry
                icon="speed"
                :key="'A' + n"
              >
                <template v-slot:subtitle>
                  <q-skeleton
                    width="300px"
                    height="10px"
                    type="rect"
                    style="margin-bottom:20px;"
                  />
                </template>
                <q-skeleton
                  height="25px"
                  width="60px"
                  type="QChip"
                  style="margin-bottom:10px;"
                />
              </q-timeline-entry>
            </template>
          </template>

          <div
            class="stop-list"
            v-show="stopsLoaded"
          >
            <template v-for="(stop, index) in stops">
              <Stop
                :key="stop.DocId"
                :title="stop.Title"
                :date="dates[index]"
                :editor-placeholder="stop.Description"
                :general-link="stop.GeneralLink"
                :location="stop.Location && typeof stop.Location !== 'undefined' && stop.Location ? stop.Location : null"
                :parkingPlace="stop.Parking && typeof stop.Parking !== 'undefined' && stop.Parking.label ? stop.Parking : null"
                :days="typeof days[days.findIndex(x => x.docId === stop.DocId)] !== 'undefined' ? days[days.findIndex(x => x.docId === stop.DocId)].days : null"
                :hotelStars="parseInt(stop.HotelStars)"
                :hotelName="stop.HotelName"
                :hotelPrice="stop.hotelPrice"
                :guestRating="stop.guestRating"
                :transportLocations="stop.transportLocations"
                :hotelLocation="stop.HotelLocation"
                :hotelContact="stop.HotelContact"
                :checkOutDate="dates[index + 1] ? dates[index + 1] : dates[index]"
                :adults="parseInt(adults)"
                :childrenAges="childrenAges"
                :rooms="parseInt(rooms)"
                :galeryImgUrls="galeryImgUrls"
                :stopImages="typeof stop.StopImages === 'undefined' ? null : stop.StopImages"
                :addedSights="stop.Sights ? stop.Sights : []"
                :dailyTrips="stop.DailyTrips ? stop.DailyTrips : []"
                @expansionChanged="sharedMethods.expansionChanged(getContext, $event)"
                :doc-id="stop.DocId"
                :profile="stop.Profile"
                :lastItem="index === stops.length -1"
                :firstStop="index === 0"
                :ref="stop.DocId"
              ></Stop>
              <Duration
                :key="'Stop' + stop.DocId"
                v-if="index !== stops.length - 1 && typeof durations[durations.findIndex(x => x.docId === stop.DocId)] !== 'undefined' && durations[durations.findIndex(x => x.docId === stop.DocId)].duration !== null"
                :duration="durations[durations.findIndex(x => x.docId === stop.DocId)].duration + durations[durations.findIndex(x => x.docId === stop.DocId)].distance"
                :defaultProfile="stop.Profile && typeof stop.Profile !== 'undefined' ? getStringProfile(stop.Profile) : inputProfile"
                :roundtripProfile="inputProfile"
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
          :profile="getProfile(inputProfile)"
          :stops="stops"
          :childrenAges="childrenAges"
          :adults="parseInt(adults)"
          :rooms="parseInt(rooms)"
        ></Map>
        <br>
        <a @click="$refs.tabPanels.goTo('overview')">zur Routenübersicht</a>
      </q-tab-panel>
      <q-tab-panel name="ratings">
        <h3>Bewertungen</h3>
        <div class="q-pa-md row">
          <div style="width: 100%;">
            <div v-if="messages.length === 0">
              <span style="font-size:18px;">Momentan sind leider keine Kommentare oder Bewertungen vorhanden.<br>
                {{ user ? 'Sei der Erste und schreibe jetzt eine Bewertung!' : 'Melde dich an um die erste Bewertung abzugeben.'}}</span>
            </div>
            <template v-for="message in messages">
              <!-- <q-chat-message
                v-if="!message[index -1] || getStringDateFromTimestamp(message[index -1].Date) !== getStringDateFromTimestamp(message.Date)"
                :key="'date' + message.id"
                :label="getStringDateFromTimestamp(message.Date)"
              /> -->
              <!-- <q-chat-message
              name="me"
              :text="['hey, how are you?']"
            >
              <q-rating
                class="stars"
                v-model="tempStars"
                size="15px"
                color="gold"
                style="margin-right:10px;"
              />
            </q-chat-message> -->
              <q-chat-message
                :key="message.id"
                :name="message.Name + (!message.UID || user.uid !== message.UID ? '' : ' (Autor)' )"
                :sent="!message.UID || user.uid !== message.UID"
                name-sanitize
                text-sanitize
                :text="[message.Message]"
                bg-color="secondary"
                text-color="white"
                style="font-size:16px;"
                :stamp="getStringDateFromTimestamp(message.Date)"
              >
                <q-rating
                  v-if="message.Rating"
                  class="stars"
                  v-model="message.Rating"
                  readonly
                  size="15px"
                  color="gold"
                />
                <template v-slot:avatar>
                  <img
                    v-if="message.Avatar"
                    :class="'q-message-avatar ' + (!message.UID || user.uid !== message.UID ? 'q-message-avatar--sent' : 'q-message-avatar--received' ) "
                    :src="message.Avatar"
                  >
                  <q-icon
                    v-else
                    :class="'q-message-avatar ' + (!message.UID || user.uid !== message.UID ? 'q-message-avatar--sent' : 'q-message-avatar--received' ) "
                    name="account_circle"
                    size="50px"
                  />
                </template>
              </q-chat-message>
            </template>

          </div>
          <div
            v-if="user"
            class="flex"
            style="margin-top:30px;"
          >
            <div class="flex direction-column">
              <q-input
                v-model="tempMessage"
                style="width:300px; margin-right:20px; font-size:18px;"
                placeholder="Deine Nachricht"
              />
              <q-toggle
                v-model="ratingEnabled"
                style="font-size:18px; margin-right:10px;"
                label="mit Bewertung"
              ></q-toggle>
              <q-rating
                v-show="ratingEnabled"
                class="stars"
                v-model="tempCommentStars"
                size="15px"
                color="gold"
                style="margin-right:15px;"
              />
            </div>
            <q-btn @click="sendComment">Absenden</q-btn>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
import(/* webpackPrefetch: true */ '../css/editRoundtrips.less')
import { date } from 'quasar'
import { db, storage, auth } from '../firebaseInit.js'
const getAxios = () => import('axios')
import { TaskQueue } from 'cwait'
import sharedMethods from '../sharedMethods'

let details = []
let messages = []

// context of the vue app (set in mounted)
let context

export default {
  components: {
    Stop: () => import('../pages/EditRoundtripComponents/stop'),
    Map: () => import('../pages/Map/Map'),
    Duration: () => import('../pages/EditRoundtripComponents/duration')
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
      days: [],
      editRTDialog: false,
      title: null,
      inputProfile: null,
      childrenAges: [],
      adults: 0,
      rooms: 0,
      Profile: '',
      checkOutDate: null,
      pageTitle: 'User',
      prevRouteParams: null,
      disableEditBtn: false,
      allStopsExpanded: false,
      currentExpansionStates: [],
      firstLoad: true,
      stopsLoaded: false,
      creator: {},
      tripWebsite: null,
      messages: [],
      tempMessage: null,
      RTId: null,
      tempCommentStars: 3,
      ratingEnabled: true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRouteParams = from.params
    })
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    },
    sharedMethods () {
      return sharedMethods
    },
    getContext () {
      return context
    }
  },
  meta () {
    return {
      title: 'Reise ansehen',
      meta: {
        description: { name: 'description', content: 'Reise auf roundtrips4you ansehen, komplett kostenlos, online und unkompliziert. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...' }
      }
    }
  },
  methods: {
    loadSingleRoundtrip (RTId) {
      this.$store.dispatch('roundtrips/fetchSingleRoundtrip', RTId).then(roundtrip => {
        this.roundtrip = roundtrip
        this.loadUserData(roundtrip.UserId)
        this.inputProfile = roundtrip.Profile

        // set default values to ensure privacy
        this.childrenAges = []
        this.rooms = 1
        this.adults = 2
        this.roundtrip = roundtrip
        this.profile = this.getProfile(roundtrip.Profile)
        this.tripWebsite = roundtrip.tripWebsite

        this.loadGaleryImgs()
        this.getUserRatings(RTId)
      }).catch(err => {
        console.log('Error getting Roundtrip', err)
      })
    },
    getStringDateFromTimestamp (timestamp) {
      const initDate = new Date(timestamp.seconds * 1000)
      return date.formatDate(initDate, 'DD.MM.YYYY HH:mm')
    },
    getUserRatings (RTId) {
      let roundtripsRef = db.collection('Comments')
        .where('RTId', '==', RTId)
        .orderBy('Date')
      roundtripsRef.get()
        .then(snapshot => {
          messages = []
          snapshot.forEach(doc => {
            let index = messages.push(doc.data()) - 1
            messages[index].id = doc.id
          })
          this.messages = messages
        })
    },
    sendComment () {
      db.collection('Comments').add({
        Date: new Date(Date.now()),
        Message: this.tempMessage,
        Name: auth.user().displayName,
        Avatar: auth.user().photoURL,
        UID: auth.user().uid,
        RTId: this.RTId,
        Rating: this.ratingEnabled ? this.tempCommentStars : null
      }).then(results => {
        this.getUserRatings(this.RTId)
        this.tempMessage = null
      })
    },
    loadUserData (UserId) {
      let context = this
      let userRef = db.collection('User')
        .where('UserUID', '==', UserId)
        .limit(1)
      userRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            context.creator = doc.data()
          })
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
            let index = details.push(doc.data()) - 1
            details[index].DocId = doc.id
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

            if (details.indexOf(stop) === details.length - 1) {
              // add one day
              const defaultCheckOutDate = new Date()
              defaultCheckOutDate.setDate(initDate.getDate() + 1)

              this.checkOutDate = date.formatDate(defaultCheckOutDate, 'DD.MM.YYYY')
            }
          })
          this.stops = details

          let tempUrls = []
          let tempUrlDocObjects = []

          getAxios().then(axios => {
            this.stops.forEach((stop, index) => {
              if (index >= 1) {
                let url = this.getDurationUrl([this.stops[index - 1].Location.lng, this.stops[index - 1].Location.lat],
                  [stop.Location.lng, stop.Location.lat], index !== this.stops.length ? this.stops[index - 1].DocId : this.stops[index].DocId,
                  index !== this.stops.length ? this.stops[index - 1].Profile : this.stops[index].Profile, index !== this.stops.length ? this.stops[index - 1] : this.stops[index], index !== this.stops.length ? index - 1 : index)

                if (url) {
                  tempUrls.push(url)

                  tempUrlDocObjects.push({ id: this.stops[index - 1].DocId, url: url })
                }
              }

              // if its the last stop
              if (index === this.stops.length - 1) {
                this.stopsLoaded = true

                // get durations
                const urls = tempUrls
                const queue = new TaskQueue(Promise, 5)
                Promise.all(urls.map(queue.wrap(async url => axios.get(url)))).then(results => {
                  results.forEach((result, resultIndex) => {
                    const docId = tempUrlDocObjects[tempUrlDocObjects.findIndex(x => x.url === result.config.url)].id

                    this.writeDuration(result.data.routes[0], docId)
                  })
                })
              }
            })
          })

          // this.stops.forEach((stop, index) => {
          //   if (index >= 1) this.getDuration([this.stops[index - 1].Location.lng, this.stops[index - 1].Location.lat], [stop.Location.lng, stop.Location.lat], this.stops[index - 1].Title, this.stops[index - 1], index - 1, this.stops[index - 1].Profile)
          // })

          let context = this
          setTimeout(function () {
            context.stops.forEach(stop => {
              if (context.firstLoad || !context.currentExpansionStates) {
                if (context.$refs[stop.DocId]) context.$refs[stop.DocId][0].changeExpansion(false)
                context.currentExpansionStates.push({ docId: stop.DocId, expanded: false })
              } else {
                if (context.currentExpansionStates[context.currentExpansionStates.findIndex(x => x.docId === stop.DocId)]) {
                  context.$refs[stop.DocId][0].changeExpansion(context.currentExpansionStates[context.currentExpansionStates.findIndex(x => x.docId === stop.DocId)].expanded)
                } else {
                  // this stop was not already added
                  context.$refs[stop.DocId][0].changeExpansion(false)
                }
              }
            })
            context.getParent('MyLayout').hideLoading()
            this.firstLoad = false
          }, 500)
        })
        .catch(err => {
          this.getParent('MyLayout').hideLoading()
          console.log('Error getting Roundtripdetails', err)
        })
    },
    isUniqueTitle (value) {
      return new Promise((resolve, reject) => {
        value = value.toLowerCase()
        value = value.charAt(0).toUpperCase() + value.slice(1)
        value = value.trim()
        let roundtripsRef = db.collection('Roundtrips')
          .where('Title', '==', value)
          .limit(1)
        roundtripsRef.get()
          .then(snapshot => {
            resolve(snapshot.size === 0 || 'Dieser Titel ist bereits vergeben')
          })
      })
    },
    checkDisableEditBtn (val) {
      this.isUniqueTitle(val).then(uniqueTitle => {
        if (uniqueTitle === 'Dieser Titel ist bereits vergeben') uniqueTitle = false
        this.disableEditBtn = val === null || val === '' || !uniqueTitle
      }
      )
    },
    getDurationUrl (startLocation, endLocation, docId, stopProfile, stop, index) {
      let profile = this.profile
      if (stopProfile !== null && typeof stopProfile !== 'undefined' && stopProfile.length > 0) profile = stopProfile

      if (profile !== 'plane') {
        return 'https://api.mapbox.com/directions/v5/mapbox/' + profile + '/' + startLocation[0] + ',' + startLocation[1] + ';' + endLocation[0] + ',' + endLocation[1] + '?geometries=geojson&access_token=' + this.accessToken
      } else {
        return null
      }
    },
    writeDuration (result, docId) {
      if (result !== null && typeof result !== 'undefined') {
        let duration = this.msToTime(result.duration * 1000)

        let distance = Math.floor(result.distance / 1000) > 0 ? Math.floor(result.distance / 1000) : ''
        if (distance !== '') {
          this.tripDistance = this.tripDistance + distance
          distance = ' (' + distance + 'km)'
        }

        this.durations.splice(this.stops.findIndex(x => x.DocId === docId), 0, { duration: duration, durationInMs: result.duration * 1000, distance: distance, docId: docId })

        this.getDays(this.stops[this.stops.findIndex(x => x.DocId === docId)], result.duration * 1000)
      } else {
        this.durations.splice(this.stops.findIndex(x => x.DocId === docId), 0, { duration: null, distance: null, docId: docId })
        if (this.stops.indexOf(stop) === this.stops.length - 2) this.stopsLoaded = true
      }
    },
    openInNewTab (link) {
      window.open(link, '_blank')
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
    },
    getStringProfile (profile) {
      switch (profile) {
        case 'walking':
          return 'zu Fuß'
        case 'cycling':
          return 'Fahrrad'
        case 'plane':
          return 'Flugzeug'
        default:
          return 'Auto'
      }
    },
    getDays (stop, duration) {
      let days = null

      if (this.stops.indexOf(stop) < this.stops.length - 1) {
        let formattedDate = date.formatDate(new Date(stop.InitDate.seconds * 1000), 'DD.MM.YYYY HH:mm')
        let dateTimeParts = formattedDate.split(' ')
        let dateParts = dateTimeParts[0].split('.')
        let timeParts = dateTimeParts[1].split(':')
        let currentInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

        formattedDate = date.formatDate(new Date(this.stops[this.stops.indexOf(stop) + 1].InitDate.seconds * 1000), 'DD.MM.YYYY HH:mm')
        dateTimeParts = formattedDate.split(' ')
        dateParts = dateTimeParts[0].split('.')
        timeParts = dateTimeParts[1].split(':')
        let nextInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

        let dateDistance = (nextInitDate.getTime() - currentInitDate.getTime()) - duration
        days = this.msToTime(dateDistance)
      }
      this.days.splice(this.stops.findIndex(x => x.DocId === stop.docId), 0, { days: days, docId: stop.DocId })
      if (this.stops.indexOf(stop) === this.stops.length - 2) this.stopsLoaded = true
    },
    loadGaleryImgs () {
      const context = this
      let fileRef = storage.ref().child('Images/Roundtrips/' + context.roundtrip.docId + '/Galery')
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
    }
  },
  mounted () {
    context = this
  },
  created () {
    const params = this.$route.params.id
    let RTId = params
    let userDate = null

    if (params.includes('&')) {
      RTId = params.split('&')[0]
      userDate = params.split('&')[1]
    }

    this.RTId = RTId

    this.loadSingleRoundtrip(RTId)
    this.loadRoundtripDetails(RTId, parseInt(userDate))
  }
}
</script>
