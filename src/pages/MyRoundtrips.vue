<template>
  <div class="my-roundtrips  q-px-lg q-pb-md">
    <h3 id="Title">Meine Reisen</h3>
    <q-list
      bordered
      padding
      class="rounded-borders"
    >
      <q-item v-if="showNoRoundtripsText">
        <q-item-section
          avatar
          top
        >
          <q-avatar
            color="primary"
            text-color="white"
            font-size="30px"
            icon="info"
          >
          </q-avatar>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="2">Wenn du eine Reise erstellst erscheint sie hier. <br>
            Klicke einfach auf den Button unten um deine erste Reise zu erstellen.</q-item-label>
        </q-item-section>
      </q-item>
      <div v-if="showRoundtrips">
        <q-intersection
          v-for="roundtrip in roundtrips"
          :key="roundtrip.RTId"
          once
          transition="flip-right"
        >
          <q-item
            clickable
            @click="$router.push('/rundreise-ansehen/' + roundtrip.RTId)"
            v-ripple
          >
            <q-item-section
              avatar
              top
            >
              <q-avatar
                color="primary"
                text-color="white"
              >
                <img :src="TitleImgs[TitleImgs.findIndex(x => x.RTId === roundtrip.RTId)] ? TitleImgs[TitleImgs.findIndex(x => x.RTId === roundtrip.RTId)].src : '../statics/dummy-image-landscape-1-150x150.jpg'">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{roundtrip.Title}} - {{Array.isArray(roundtrip.Location) ? getLocationString(roundtrip.Location): roundtrip.Location}}</q-item-label>
              <q-item-label
                caption
                style="width:100px;"
              >
                {{ getCreatedAtDate(roundtrip.createdAt) }}
                <q-tooltip>
                  erstellt am {{ getCreatedAtDate(roundtrip.createdAt) }}
                </q-tooltip>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label
                lines="1"
                :style="[roundtrip.Public ? {'color': 'green'} : {'color': 'red'}]"
              >{{roundtrip.Public ? 'veröffentlicht' : 'privat'}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon
                name="keyboard_arrow_right"
                color="primary"
              />
            </q-item-section>
          </q-item>
        </q-intersection>
      </div>
      <div v-else-if="!showNoRoundtripsText">
        <q-item
          v-for="n in 3"
          :key="n"
        >
          <q-item-section
            avatar
            top
            style="padding:8px 10px;"
          >
            <q-skeleton
              size="40px"
              type="QAvatar"
            />
          </q-item-section>

          <q-item-section>
            <q-skeleton
              class="title-skeleton"
              width="300px"
              style="margin-bottom:10px;"
              type="rect"
            />
            <q-item-label caption>
              <q-skeleton
                width="80px"
                type="rect"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
    <span ref="AddRoundtripExpansionItem"></span>
    <div
      style="align-items: center; flex-direction:row; margin-bottom:20px;"
      class="flex cursor-pointer"
      @click="$router.push('/rundreisen-wizard')"
      v-if="user && (user.emailVerified || roundtrips.length === 0)"
    >
      <q-btn
        class="add-button"
        side
        round
        color="primary"
        icon="add"
      >
      </q-btn>
      <span style="font-size:20px;">Reise hinzufügen</span>
    </div>
    <div v-if="user && !user.emailVerified">
      <span style="font-size:18px;">Deine Email Adresse wurde noch nicht bestätigt. Bitte bestätige diese {{ roundtrips.length > 0 ? 'bevor du eine weitere Reise erstellst' : 'sobald wie möglich'}}.</span>
      <br>
      <br>
      <q-btn @click="verifyMail()">Email erneut senden</q-btn>
    </div>
  </div>
</template>
<style lang="less">
@import url("../css/my-roundtrips.less");
</style>
<script>
import { db, auth } from '../firebaseInit.js'
import { date } from 'quasar'
import sharedMethods from '../sharedMethods'

import axios from 'axios'

let timeStamp = Date.now()
let formattedScheduleDate = date.formatDate(timeStamp, 'DD.MM.YYYY')

var actionCodeSettings = {
  url: 'https://roundtrips4you.de/login',
  // This must be true.
  handleCodeInApp: true
}

export default {
  meta: {
    title: 'Meine Rundreisen',
    meta: {
      description: { name: 'description', content: 'Deine Reisen auf roundtrips4you bearbeiten, komplett kostenlos, online und unkompliziert. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...' }
    }
  },
  name: 'myRoundtrips',
  data () {
    return {
      roundtrips: [],
      TitleImgs: [],
      title: '',
      addExpanded: false,
      addButtonActive: false,
      // countries: [],
      // countryOptions: countries,
      showNoRoundtripsText: false,
      rooms: 1,
      adults: 1,
      children: 0,
      childrenAges: [],
      step: 1,
      arrivalDepatureProfile: 'Flugzeug',
      origin: null,
      destination: null,
      depatureDate: formattedScheduleDate,
      returnDate: formattedScheduleDate,
      travelClass: 'Economy',
      nonStop: 'Ja',
      originOptions: [],
      destinationOptions: [],
      originCodes: [],
      destinationCodes: [],
      originCode: null,
      destinationCode: null,
      destinationAddresses: [],
      countryAmount: 1,
      showRoundtrips: false,
      tempLocation: null
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    },
    sharedMethods () {
      return sharedMethods
    }
  },
  methods: {
    verifyMail () {
      let context = this
      if (!auth.user().emailVerified) {
        auth.user().sendEmailVerification(actionCodeSettings).then(function () {
          context.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Wir haben dir eine Bestätigungsmail gesendet'

          })
        }).catch(function (error) {
          console.log(error)
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Oh nein, wir konnten dir leider keine email senden, bitte Kontaktiere uns unter hello@roundtrips4you.de'
          })
        })
      } else {
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Deine Email wurde bestätigt'
        })
      }
    },
    destinationChanged (val) {
      this.getLocationFromIataCode(this.destinationCodes[this.destinationOptions.indexOf(val)], this.destinationAddresses[this.destinationOptions.indexOf(val)])
    },
    scrollOnAddButtonClicked () {
      if (this.addExpanded) sharedMethods.scrollToRef(this.$refs['AddRoundtripExpansionItem'])
    },
    updateLocation (event) {
      this.tempLocation = {
        lat: event.y,
        lng: event.x,
        label: event.label
      }
    },
    getLocationFromIataCode (code, countryName) {
      let context = this
      axios.get('http://iatageo.com/getLatLng/' + code
      ).then(function (response) {
        context.tempLocation = {
          lat: response.data.latitude,
          lng: response.data.longitude,
          label: countryName
        }
      }).catch(function (error) {
        console.log('Error' + error)
      })
    },
    updateReturnDate () {
      let dateParts = this.depatureDate.split('.')
      let depatureDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
      let returnDate = depatureDate
      returnDate.setDate(depatureDate.getDate() + 1)

      this.returnDate = date.formatDate(returnDate, 'DD.MM.YYYY')
    },
    saveArrivalDepature (RTDocId) {
      this.submitting = true

      if (this.arrivalDepatureProfile === 'Flugzeug') {
        let dateParts = this.depatureDate.split('.')
        let depatureDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

        dateParts = this.returnDate.split('.')
        let returnDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

        if (this.saveData('TransportProfile', this.arrivalDepatureProfile, RTDocId) &&
          this.saveData('Origin', this.origin, RTDocId) &&
          this.saveData('OriginCode', this.originCodes[this.originOptions.indexOf(this.origin)] ? this.originCodes[this.originOptions.indexOf(this.origin)] : this.originCode, RTDocId) &&
          this.saveData('Destination', this.destination, RTDocId) &&
          this.saveData('DestinationCode', this.destinationCodes[this.destinationOptions.indexOf(this.destination)] ? this.destinationCodes[this.destinationOptions.indexOf(this.destination)] : this.destinationCode, RTDocId) &&
          this.saveData('DepatureDate', depatureDate, RTDocId) &&
          this.saveData('ReturnDate', returnDate, RTDocId) &&
          this.saveData('TravelClass', this.travelClass, RTDocId) &&
          this.saveData('NonStop', this.nonStop, RTDocId)
        ) {
          return true
        } else {
          return false
        }
      } else {
        if (this.saveData('TransportProfile', this.arrivalDepatureProfile, RTDocId)) {
          return true
        } else {
          return false
        }
      }
    },
    getLocationString (locations) {
      let locationString = ''
      locations.forEach((location, index) => {
        locationString = locationString + (index !== 0 ? ', ' : '') + location
      })
      return locationString
    },
    saveData (field, value, roundtripDocId) {
      if (roundtripDocId === null || roundtripDocId === '' || roundtripDocId === 'undefined') return false
      try {
        db.collection('Roundtrips').doc(roundtripDocId).update({
          ['' + field]: value
        })
      } catch (error) {
        console.log(error)
        return false
      }
      return true
    },
    getCreatedAtDate (timeStamp) {
      return date.formatDate(new Date(timeStamp.seconds * 1000), 'DD.MM.YYYY')
    }
    // filterFn (val, update, abort) {
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.countryOptions = countries.filter(v => v.toLowerCase().indexOf(needle) > -1)
    //   })
    // },
  },
  created () {
    auth.authRef().onAuthStateChanged((user) => {
      this.$store.dispatch('roundtrips/fetchAllRoundtrips', auth.user().uid).then(result => {
        if (typeof result === 'undefined' || !result || !result.roundtrips || result.roundtrips === null || result.roundtrips.length === 0) {
          this.showNoRoundtripsText = true
          this.showRoundtrips = true
          this.addExpanded = true
        } else {
          this.showRoundtrips = true
          this.roundtrips = result.roundtrips
          this.TitleImgs = result.titleImages
        }
      })
    })
  }
}
</script>
