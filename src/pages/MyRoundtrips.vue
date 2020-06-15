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
          <q-item-label lines="2">Du hast leider noch keine Reisen erstellt. <br>
            Klicke einfach auf den Button unten um deine erste Rundreise zu erstellen.</q-item-label>
        </q-item-section>
      </q-item>
      <div v-if="showRoundtrips">
        <q-item
          clickable
          @click="$router.push('/rundreise-bearbeiten/' + roundtrip.RTId)"
          v-ripple
          v-for="(roundtrip, index) in roundtrips"
          :key="roundtrip.RTId"
        >
          <q-item-section
            avatar
            top
          >
            <q-avatar
              color="primary"
              text-color="white"
            >
              <img :src="TitleImgs[index]">
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
                Diese Rundreise wurde am {{ getCreatedAtDate(roundtrip.createdAt) }} erstellt
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
      </div>
      <div v-else>
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
    <q-list
      bordered
      class="rounded-borders"
      v-if="roundtrips.length < 20 && ((user && user.emailVerified) || roundtrips.length === 0)"
    >
      <q-expansion-item
        clickable
        expand-separator
        v-model="addExpanded"
        class="add-item"
        @click="[addButtonActive = !addButtonActive,  scrollOnAddButtonClicked()]"
      >
        <template v-slot:header>
          <q-item-section style="align-items: center;">
            <q-btn
              class="add-button"
              side
              round
              color="primary"
              icon="add"
              :class="{ active: addButtonActive }"
            >
            </q-btn>
          </q-item-section>
        </template>
        <q-card id="AddRTCard">
          <q-card-section>
            <q-form
              @submit="onAddRoundtrip"
              class="q-gutter-md"
              ref="addRoundtripForm"
            >
              <q-stepper
                v-model="step"
                vertical
                color="primary"
                animated
                flat
                keep-alive
              >
                <q-step
                  :name="1"
                  title="Titel & Land auswählen"
                  icon="settings"
                  :done="step > 1"
                >
                  <q-input
                    v-model="title"
                    :rules="[val => val !== null &&  val !== ''  || 'Bitte gib einen Titel an', val => isUniqueTitle(val), val => val[0] !== ' ' || 'Das erste Zeichen kann kein Leerzeichen sein']"
                    label="Titel"
                    outlined
                    ref="titleInput"
                    style="margin:auto; margin-top:20px;"
                  >
                    <template v-slot:prepend>
                      <q-icon name="title" />
                    </template>
                  </q-input>
                  <!-- <div
                    v-for="(countryNum, index) in parseInt(countryAmount)"
                    :key="countryNum"
                    class="flex"
                    style="justify-content:center;"
                  >
                    <q-select
                      @filter="filterFn"
                      outlined
                      v-model="countries[index]"
                      :options="countryOptions"
                      label="Land"
                      clearable
                      class="input-item"
                      use-input
                      :style="'margin-top:10px; ' + (parseInt(index) === 0 ? 'width:300px;' : 'width:255px;')"
                      :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Land']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="explore" />
                      </template>
                    </q-select>
                    <div class="add-country-container">
                      <q-btn
                        v-if="parseInt(index) !== 0"
                        @click="[countries.splice(index, 1), countryAmount = parseInt(countryAmount) - 1]"
                        round
                        icon="add"
                        side
                        style="transform:rotate(45deg)"
                      />
                    </div>
                  </div> -->
                  <!-- <q-btn
                    @click="countryAmount = parseInt(countryAmount) + 1"
                    label="Land hinzufügen"
                  /> -->
                  <q-stepper-navigation>
                    <q-btn
                      @click="step = 2"
                      color="primary"
                      label="Weiter"
                      :disable="!title"
                    />
                  </q-stepper-navigation>
                </q-step>
                <q-step
                  :name="2"
                  title="An-/Abreise planen"
                  icon="location_on"
                  :done="step > 2"
                >
                  <q-select
                    outlined
                    v-model="arrivalDepatureProfile"
                    input-debounce="0"
                    :options="['Flugzeug', 'Andere']"
                    label="Reisemittel"
                    :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Reisemittel']"
                    style="padding-bottom: 32px"
                  >
                    <template v-slot:prepend>
                      <q-icon name="commute" />
                    </template>
                  </q-select>
                  <div
                    v-if="arrivalDepatureProfile === 'Flugzeug'"
                    class="flight-container"
                  >
                    <q-select
                      outlined=""
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      clearable
                      ref="select"
                      v-model="origin"
                      hide-dropdown-icon
                      label="Abflugsort"
                      :options="originOptions"
                      @filter="getOrigins"
                      style="width:300px;"
                      :rules="[val => val !== null && val !== '' || 'Bitte wähle einen Ort']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            zu viele/keine Ergebnisse, bitte weitertippen
                          </q-item-section>
                        </q-item>
                      </template>
                      <template v-slot:prepend>
                        <q-icon name="flight_takeoff" />
                      </template>
                    </q-select>
                    <q-select
                      outlined=""
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      clearable
                      ref="select"
                      v-model="destination"
                      hide-dropdown-icon
                      label="Ankunftsort"
                      :options="destinationOptions"
                      @filter="getDestinations"
                      style="width:300px;"
                      @input="destinationChanged($event)"
                      :rules="[val => val !== null && val !== '' || 'Bitte wähle einen Ort']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            zu viele/keine Ergebnisse, bitte weitertippen
                          </q-item-section>
                        </q-item>
                      </template>
                      <template v-slot:prepend>
                        <q-icon name="flight_land" />
                      </template>
                    </q-select>
                    <q-input
                      outlined
                      v-model="depatureDate"
                      label="Abflugsdatum"
                      class="input-item rounded-borders"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="depatureDate"
                          today-btn
                          mask="DD.MM.YYYY"
                          @input="updateReturnDate()"
                        />
                      </q-popup-proxy>
                      <template v-slot:prepend>
                        <q-icon
                          name="event"
                          class="cursor-pointer"
                        >
                        </q-icon>
                      </template>
                    </q-input>
                    <q-input
                      outlined
                      v-model="returnDate"
                      label="Rückflugsdatum"
                      class="input-item rounded-borders"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="returnDate"
                          today-btn
                          mask="DD.MM.YYYY"
                        />
                      </q-popup-proxy>
                      <template v-slot:prepend>
                        <q-icon
                          name="event"
                          class="cursor-pointer"
                        >
                        </q-icon>
                      </template>
                    </q-input>
                    <q-select
                      outlined
                      v-model="travelClass"
                      input-debounce="0"
                      :options="['Economy', 'Premium Economy', 'Business', 'First']"
                      label="Reiseklasse auswählen"
                      :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Klasse']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="star" />
                      </template>
                    </q-select>
                    <q-select
                      outlined
                      v-model="nonStop"
                      input-debounce="0"
                      :options="['Ja', 'Nein']"
                      label="Non Stop"
                      :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Option']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="flight" />
                      </template>
                    </q-select>
                  </div>
                  <div v-else>
                    <p style="text-align:left;">Bei einem anderem Reisemittel können wir dir bei der Planung deiner An- und Abreise leider nicht helfen.</p>
                    <p style="text-align:left;">Bitte gib hier den Ersten Ort deiner Reise an</p>
                    <CitySearch
                      ref="citySearch"
                      :parkingPlaceSearch="false"
                      :defaultLocation="null"
                      @update="updateLocation($event)"
                      :rules="[val => val !== null && val !== '' || 'Bitte wähle einen Ort']"
                    ></CitySearch>
                  </div>
                  <q-stepper-navigation>
                    <q-btn
                      @click="step = 3"
                      color="primary"
                      :disable="(arrivalDepatureProfile === 'Flugzeug' && (!arrivalDepatureProfile || !origin || !destination || !depatureDate || !returnDate || !travelClass || !nonStop)) || (arrivalDepatureProfile === 'Andere' && !tempLocation)"
                      label="Weiter"
                    />
                    <q-btn
                      flat
                      @click="step = 1"
                      color="primary"
                      label="Zurück"
                      class="q-ml-sm"
                    />
                  </q-stepper-navigation>
                </q-step>
                <q-step
                  :name="3"
                  title="Reisende angeben"
                  icon="group"
                  :done="step > 3"
                >
                  <p
                    class="flex justify-center"
                    style="text-align:center; margin-bottom:15px;"
                  >Die folgenden Informationen werden nur dir angezeigt.</p>
                  <div>
                    <q-input
                      style="margin:auto; margin-top:20px;"
                      v-model="rooms"
                      label="Zimmer"
                      type="number"
                      :rules="[val => val !== null &&  val !== '' && val > 0  || 'Bitte gib eine Zimmeranzahl an']"
                      outlined
                    >
                      <template v-slot:prepend>
                        <q-icon name="house" />
                      </template>
                    </q-input>
                    <q-input
                      v-model="adults"
                      label="Erwachsene"
                      type="number"
                      :rules="[val => val !== null &&  val !== '' && val > 0  || 'Bitte gib die Anzahl der Erwachsenen Reisenden an', val => val <= parseInt(rooms) * 9 || 'Bitte wähle mehr Zimmer']"
                      outlined
                      style="margin:auto; margin-top:20px;"
                    >
                      <template v-slot:prepend>
                        <q-icon name="group" />
                      </template>
                    </q-input>
                    <q-input
                      v-model="children"
                      label="Kinder"
                      type="number"
                      @input="childrenAges.length = parseInt(children)"
                      :rules="[val => val !== null &&  val !== '' && val >= 0  && val <= 20|| 'Bitte gib die Anzahl der Kinder auf der Reise an']"
                      outlined
                      style="margin:auto; margin-top:20px;"
                    >
                      <template v-slot:prepend>
                        <q-icon name="child_friendly" />
                      </template>
                    </q-input>
                    <div
                      class="flex justify-center"
                      style="margin:auto; margin-top:20px;"
                      v-if="parseInt(children) > 0  && parseInt(children) <= 20"
                    >
                      <q-input
                        v-for="childNum in parseInt(children)"
                        :key="childNum"
                        v-model="childrenAges[childNum - 1]"
                        :label="'Alter Kind ' + childNum"
                        type="number"
                        style="margin-right:10px;"
                        :rules="[val => val !== null &&  val !== '' && val > 0 || 'Bitte gib das Alter des Kindes an']"
                        outlined
                      >
                        <template v-slot:prepend>
                          <q-icon name="child_friendly" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <q-stepper-navigation>
                    <q-btn
                      color="primary"
                      label="Fertig"
                      :disable="!rooms || !adults"
                      type="submit"
                    />
                    <q-btn
                      flat
                      @click="step = 2"
                      color="primary"
                      label="Zurück"
                      class="q-ml-sm"
                    />
                  </q-stepper-navigation>
                </q-step>
              </q-stepper>
            </q-form>
          </q-card-section>
        </q-card>

      </q-expansion-item>
    </q-list>
    <div v-if="user && !user.emailVerified">
      <span style="font-size:18px;">Deine Email Adresse wurde noch nicht bestätigt. Bitte bestätige diese {{ roundtrips.length > 0 ? 'bevor du eine weitere Reise erstellst' : 'sobald wie möglich'}}.</span>
      <br>
      <br>
      <q-btn
        color="primary"
        @click="verifyMail()"
      >Jetzt bestätigen</q-btn>
    </div>
  </div>
</template>
<script>
import(/* webpackPrefetch: true */ '../css/my-roundtrips.less')
import { db, auth, storage } from '../firebaseInit'
import { date, scroll } from 'quasar'
// import { countries } from '../countries'

let uid = null
import axios from 'axios'
var querystring = require('querystring')

const { getScrollTarget, setScrollPosition } = scroll

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
  components: {
    CitySearch: () => import('./Map/CitySearch')
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
      RTIds: [],
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
    }
  },
  methods: {
    onAddRoundtrip () {
      if (this.roundtrips.length < 20) {
        this.addButtonActive = false
        this.showNoRoundtripsText = false

        if (this.title && this.arrivalDepatureProfile && this.rooms && this.adults) {
          if (this.arrivalDepatureProfile === 'Flugzeug' && !this.origin && !this.destination && !this.depatureDate && !this.returnDate && !this.travelClass && !this.nonStop) {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: 'Bitte überprüfe deine Angaben'
            })
          } else {
            if (this.addRoundtrip(this.title)) {
              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'check_circle',
                message: 'Rundreise wurde erstellt'
              })
              this.addExpanded = false
            } else {
              this.$q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'error',
                message: 'Oh nein, da ist wohl etwas schief gelaufen, bitte versuche es erneut'
              })
            }
          }
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Bitte überprüfe deine Angaben'
          })
        }
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Du kannst momentan leider nur maximal 20 Rundreisen erstellen'
        })
      }
    },
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
          message: 'Deine Email wurde bereits bestätigt'
        })
      }
    },
    destinationChanged (val) {
      this.getLocationFromIataCode(this.destinationCodes[this.destinationOptions.indexOf(val)], this.destinationAddresses[this.destinationOptions.indexOf(val)])
    },
    scrollOnAddButtonClicked () {
      this.addExpanded ? scrollTo(document.getElementById('AddRTCard')) : scrollTo(document.getElementById('Title'))
    },
    scrollTo (el) {
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 400
      setScrollPosition(target, offset, duration)
    },
    updateLocation (event) {
      this.tempLocation = {
        lat: event.y,
        lng: event.x,
        label: event.label
      }
    },
    addRoundtrip (Title) {
      Title = Title.charAt(0).toUpperCase() + Title.slice(1)
      // Title = Title.replace(/ /g, '')
      Title = Title.trim()

      try {
        let timeStamp = Date.now()
        let tempRTId = Math.floor(Math.random() * 10000000000000)

        db.collection('Roundtrips').add({
          Category: 'Gruppenreise',
          Days: '< 5 Tage',
          Description: 'Kurze Beschreibung deiner Rundreise',
          Hotels: '0',

          // set as default country (will be overitten)
          Location: ['Deutschland'],
          Region: null,
          Price: 100,
          Public: false,
          RTId: tempRTId,
          Stars: 3,
          Profile: 'Autoreise',
          Highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3'],
          Title: Title,
          OfferEndPeriod: new Date(timeStamp),
          OfferStartPeriod: new Date(timeStamp),
          OfferWholeYear: true,
          UserId: this.$store.getters['user/user'].uid,
          createdAt: new Date(timeStamp),
          Rooms: this.rooms,
          Adults: this.adults,
          ChildrenAges: this.childrenAges
        })

        let roundtripsRef = db.collection('Roundtrips')
          .where('RTId', '==', tempRTId)
          .limit(1)
        roundtripsRef.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              db.collection('Roundtrips').doc(doc.id).update({
                'RTId': doc.id
              })

              let dateParts = this.depatureDate.split('.')
              let depatureDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

              db.collection('RoundtripDetails').add({
                BookingComLink: '',
                DateDistance: '',
                Description: 'Beschreibung dieses Stopps',
                ExpediaLink: '',
                GeneralLink: '',
                ImageUrl: '',
                InitDate: depatureDate || new Date(timeStamp),
                Price: 0,
                RTId: doc.id,
                Title: this.tempLocation ? 'Start in ' + this.tempLocation.label : 'Titel des 1. Stopps',
                Location: this.tempLocation ? this.tempLocation : {
                  lng: '13.3888599',
                  lat: '52.5170365',
                  label: 'Berlin, 10117, Germany'
                }
              })
              this.saveArrivalDepature(doc.id)
              this.getUserRoundtrips()
              this.$router.push('/rundreise-bearbeiten/' + doc.id)
            })
          })
        this.$refs.addRoundtripForm.reset()
        this.title = ''
        // this.countries = []
        this.$refs.titleInput.resetValidation()
      } catch (error) {
        console.log(error)
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Deine Rundreise konnte nicht erstellt werden, bitte versuche es erneut'
        })
        return false
      }
      return true
    },
    getUserRoundtrips () {
      let roundtripArr = []
      let roundtripDocIds = []
      this.roundtrips = []

      var context = this
      let roundtripsRef = db.collection('Roundtrips')
        .where('UserId', '==', uid)
        .orderBy('createdAt')
        .limit(20)
      roundtripsRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            roundtripArr.push(doc.data())
            roundtripDocIds.splice(roundtripArr.findIndex(x => x.RTId === doc.data().RTId), 0, doc.id)

            var fileRef = storage.ref().child('Images/Roundtrips/' + doc.id + '/Title/titleImg')
            fileRef.getDownloadURL().then(function (url) {
              context.TitleImgs.splice(roundtripDocIds.indexOf(doc.id), 0, url)
              context.RTIds.push(doc.data().RTId)
            }).catch(function (error) {
              console.log(error)
              context.TitleImgs.splice(roundtripDocIds.indexOf(doc.id), 0, '../statics/dummy-image-landscape-1-150x150.jpg')
            })
          })
          this.showNoRoundtripsText = snapshot.docs.length === 0
          this.showRoundtrips = true
        }).catch(function (error) {
          console.log(error)
        })

      this.roundtrips = roundtripArr
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
    isUniqueTitle (value) {
      return new Promise((resolve, reject) => {
        value = value.toLowerCase()
        value = value.charAt(0).toUpperCase() + value.slice(1)
        value = value.trim()
        // value = value.replace(/ /g, '')
        let roundtripsRef = db.collection('Roundtrips')
          .where('Title', '==', value)
          .limit(1)
        roundtripsRef.get()
          .then(snapshot => {
            resolve(snapshot.size === 0 || 'Dieser Titel ist bereits vergeben')
          })
      })
    },
    getCreatedAtDate (timeStamp) {
      return date.formatDate(new Date(timeStamp.seconds * 1000), 'DD.MM.YYYY')
    },
    // filterFn (val, update, abort) {
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.countryOptions = countries.filter(v => v.toLowerCase().indexOf(needle) > -1)
    //   })
    // },
    getOrigins (val, update, abort) {
      this.filterAirports(val, update, abort, true)
    },
    getDestinations (val, update, abort) {
      this.filterAirports(val, update, abort, false)
    },
    filterAirports (val, update, abort, originSearch) {
      if (val.length < 3) {
        abort()
        return
      }
      if (val.length >= 3) {
        this.getAirports(val).then((results) => {
          update(() => {
            if (!results) return false
            if (originSearch) {
              this.originOptions = []
              this.originCodes = []
            } else {
              this.destinationOptions = []
              this.destinationCodes = []
            }

            results.data.data.forEach(city => {
              if (originSearch) {
                this.originOptions.push(this.capitalize(city.address.cityName) + ' (' + city.iataCode + ')')
                this.originCodes.push(city.iataCode)
              } else {
                this.destinationOptions.push(this.capitalize(city.address.cityName) + ' (' + city.iataCode + ')')
                this.destinationCodes.push(city.iataCode)
                this.destinationAddresses.push(this.capitalize(city.address.cityName))
              }
            })
          }).catch(e => {
            return false
          })
        })
      }
    },
    capitalize (s) {
      s = s.toLowerCase()
      s = s.charAt(0).toUpperCase() + s.slice(1)
      return s
    },
    getAirports (val) {
      return new Promise((resolve, reject) => {
        const url = 'https://api.amadeus.com/v1/security/oauth2/token'

        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }

        const data = querystring.stringify({
          grant_type: 'client_credentials',
          client_id: 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
          client_secret: 'lHQlUheyyAZtGQDA'
        })

        axios.post(url, data, {
          headers: headers,
          form: {
            'grant_type': 'client_credentials',
            'client_id': 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
            'client_secret': 'lHQlUheyyAZtGQDA'
          }
        }).then(function (response) {
          let token = response.data.access_token
          const tokenString = 'Bearer ' + token

          axios.get('https://api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&view=LIGHT&keyword=' + val, {
            headers: {
              'Authorization': tokenString
            }
          }).then(function (response) {
            resolve(response)
          }).catch(function (error) {
            console.log('Error' + error)
            resolve(null)
          })
        }).catch(function (error) {
          console.log('Error on Authentication' + error)
          resolve(null)
        })
      })
    }
  },
  created () {
    auth.authRef().onAuthStateChanged((user) => {
      uid = auth.user().uid
      this.getUserRoundtrips()
    })
  }
}
</script>
