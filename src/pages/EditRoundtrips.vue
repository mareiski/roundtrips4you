<template>
  <div class="edit-roundtrips q-px-lg q-pb-md">
    <router-link
      style="text-decoration:none;"
      to="/meine-rundreisen"
    >
      <q-icon name="keyboard_arrow_left"></q-icon>
      zurück zu meinen Rundreisen
    </router-link>
    <h3>{{title}}
      <q-popup-edit
        v-model="title"
        buttons
        label-set="ok"
        @save="saveData('Title', title)"
      >
        <q-input
          v-model="title"
          :rules="[val => val !== null &&  val !== ''  || 'Bitte gib einen Titel an', val => isUniqueTitle(val), val =>  val.indexOf(' ') === -1 || 'Der Titel darf keine Leerzeichen enthalten']"
          dense
        />
      </q-popup-edit>
    </h3>
    <q-timeline color="secondary">
      <q-timeline-entry heading>
        Reiseverlauf

      </q-timeline-entry>

      <div class="stop-list">
        <template v-for="(stop, index) in stops">
          <Stop
            :key="index"
            :title="stop.Title"
            :date="stop.InitDate"
            :icon="!stop.HotelStop ? 'location_on' : 'hotel'"
            :editor-placeholder="stop.Description"
            :editor="true"
            :doc-id="documentIds[index]"
            :general-link="stop.GeneralLink"
            :location="stop.Location && typeof stop.Location !== 'undefined' && stop.Location ? stop.Location : null"
            :parkingPlace="stop.Parking && typeof stop.Parking !== 'undefined' && stop.Parking ? stop.Parking : null"
            :lastItem="index === stops.length -1"
          ></Stop>
          <Duration
            :key="stop"
            v-if="index !== stops.length - 1 && typeof durations[durations.findIndex(x => x.title === stop.Title)] !== 'undefined' && durations[durations.findIndex(x => x.title === stop.Title)].duration !== null"
            :duration="durations[durations.findIndex(x => x.title === stop.Title)].duration + durations[durations.findIndex(x => x.title === stop.Title)].distance"
            :editor="true"
            :defaultProfile="stop.Profile && typeof stop.Profile !== 'undefined' ? getStringProfile(stop.Profile) : inputProfile"
            :doc-id="documentIds[index]"
          ></Duration>
        </template>
      </div>
    </q-timeline>
    <q-list
      bordered
      class="rounded-borders"
    >
      <q-expansion-item
        clickable
        expand-separator
        v-model="addExpanded"
        class="add-item"
        @click="addButtonActive = !addButtonActive"
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
        <q-card>
          <q-card-section>
            <q-form
              @submit="onAddEntry"
              class="q-gutter-md addEntryForm"
            >
              <q-input
                filled
                v-model="date"
                error-message="Bitte gib ein richtiges Datum an"
                :error="!isDateTimeValid()"
                bottom-slots
                style="width:300px"
                class="input-item"
              >
                <template v-slot:prepend>
                  <q-icon
                    name="event"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="date"
                        today-btn
                        mask="DD.MM.YYYY HH:mm"
                      />
                      <!--  :options="dateOptions" -->
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon
                    name="access_time"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="date"
                        mask="DD.MM.YYYY HH:mm"
                        format24h
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-select
                outlined
                v-model="selectedOption"
                :options="options"
                label="Eintrag"
                class="input-item"
                :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Option']"
                style="width:300px"
              >
                <template v-slot:prepend>
                  <q-icon name="list" />
                </template>
              </q-select>
              <CitySearch
                ref="citySearch"
                :parkingPlaceSearch="false"
                :defaultLocation="null"
                @update="updateLocation($event)"
              ></CitySearch>
              <!-- <HotelSearch
                v-if="selectedOption === 'Hotel' && location.lat"
                :lat="location.lng"
                :long="location.lat"
                ref="hotelSearch"
              ></HotelSearch> -->
              <CitySearch
                ref="parkingPlaceSearch"
                :parkingPlaceSearch="true"
                @update="updateParkingPlace($event)"
                :defaultLocation="null"
              ></CitySearch>
              <div v-if="selectedOption === 'Hotel'">
                <q-input
                  v-model="generalTempLink"
                  ref="urlInput"
                  type="url"
                  style="width:300px;"
                  :rules="[val => urlReg.test(val)|| 'Bitte gib einen richtigen Link an']"
                  label="Hotel link"
                  outlined
                >
                  <template v-slot:prepend>
                    <q-icon name="link" />
                  </template>
                </q-input>
              </div>
              <!--<div
                v-if="selectedOption === 'Hotel'"
                class="flex"
              >
                <q-rating
                  class="stars"
                  v-model="tempStars"
                  size="15px"
                  color="gold"
                  style="margin-right:10px;"
                />
                <q-item-label>Durchschittliche Hotelbewertung</q-item-label>
              </div>-->
              <div>
                <q-btn
                  round
                  color="primary"
                  icon="add"
                  type="submit"
                >
                  <q-tooltip>
                    Eintrag hinzufügen
                  </q-tooltip>
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    <h4>Allgemeine Einstellungen</h4>
    <q-form
      @submit="onSaveRoundtrip"
      bordered
      class="q-gutter-md rounded-borders"
    >
      <q-list
        bordered
        class="rounded-borders"
        style="padding:10px"
      >
        <q-toggle
          v-model="publish"
          label="Rundreise veröffentlichen"
          icon="share"
        >
          <q-tooltip>
            Wenn deine Rundreise veröffentlicht ist kann sie jeder ansehen und bearbeiten
          </q-tooltip>
        </q-toggle>
        <q-select
          outlined
          v-model="country"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="countryOptions"
          label="Land auswählen"
          @filter="filterFn"
          :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Land']"
          style="padding-bottom: 32px"
        >
          <template v-slot:prepend>
            <q-icon name="explore" />
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Keine Ergebnisse
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input
          outlined
          v-model="region"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="regionOptions"
          label="Region (wenn vorhanden)"
        >
          <template v-slot:prepend>
            <q-icon name="location_on" />
          </template></q-input>
        <!-- <q-select
          outlined
          v-model="region"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="regionOptions"
          label="Region (wenn vorhanden)"
          @filter="filterRegions"
          style="padding-bottom: 32px"
        >
          <template v-slot:prepend>
            <q-icon name="location_on" />
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Keine Ergebnisse
              </q-item-section>
            </q-item>
          </template>
        </q-select> -->
        <q-select
          outlined
          v-model="category"
          :options="categoryOptions"
          label="Kategorie"
          use-input
          :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Kategorie']"
          class="input-item"
        >
          <template v-slot:prepend>
            <q-icon name="access_time" />
          </template>
        </q-select>
        <div class="flex">
          <q-rating
            class="stars"
            v-model="stars"
            size="15px"
            color="gold"
            style="margin-right:10px;"
          />
          <q-item-label>Durchschittliche Hotelbewertung</q-item-label>
        </div>
        <q-input
          v-model="descriptionInput"
          outlined
          autogrow
          label="Kurze Beschreibung"
          :rules="[val => val !== null && val !== '' || 'Bitte gib eine Beschreibung an',
          val => val.length > 10 && val.length < 160 || 'Bitte gib eine Beschreibung zwischen 10 und 160 Zeichen an' ]"
        > <template v-slot:prepend>
            <q-icon name="subject" />
          </template>
        </q-input>
        <q-select
          outlined
          v-model="inputProfile"
          :options="['zu Fuß', 'Fahrrad', 'Auto']"
          label="Reisemittel"
          use-input
          :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Reisemittel']"
          class="input-item"
          @input="getGeneralProfile()"
        >
          <template v-slot:prepend>
            <q-icon name="commute" />
          </template>
        </q-select>
        <q-input
          v-model="highlight1"
          label="Highlight 1"
          outlined
          :rules="[val => val !== null && val !== '' || 'Bitte gib ein Highlight an']"
        > <template v-slot:prepend>
            <q-icon name="star" />
          </template></q-input>
        <q-input
          v-model="highlight2"
          label="Highlight 2"
          outlined
          :rules="[val => val !== null && val !== '' || 'Bitte gib ein Highlight an']"
        > <template v-slot:prepend>
            <q-icon name="star" />
          </template></q-input>
        <q-input
          v-model="highlight3"
          label="Highlight 3"
          outlined
          :rules="[val => val !== null && val !== '' || 'Bitte gib ein Highlight an']"
        > <template v-slot:prepend>
            <q-icon name="star" />
          </template></q-input>
        <q-item-label>Angebotszeitraum</q-item-label>
        <q-toggle
          v-model="wholeYearOffer"
          label="Ganzes Jahr"
          icon="event"
        >
        </q-toggle>
        <q-input
          :disable="wholeYearOffer"
          outlined
          v-model="OfferStartPeriod"
          label="von"
          class="input-item rounded-borders"
        >
          <q-popup-proxy
            ref="qDateProxy1"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="OfferStartPeriod"
              today-btn
              mask="DD.MM.YYYY"
              @input="() => [$refs.qDateProxy1.hide(), OfferEndPeriod = OfferStartPeriod]"
            />
            <!-- :options="dateOptions" -->
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
          :disable="wholeYearOffer"
          outlined
          v-model="OfferEndPeriod"
          label="bis"
          class="input-item rounded-borders"
        >
          <q-popup-proxy
            ref="qDateProxy2"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="OfferEndPeriod"
              today-btn
              mask="DD.MM.YYYY"
              :options="scheduleDateOptions"
              @input="() => $refs.qDateProxy2.hide()"
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
          v-model="price"
          label="Preis"
          type="number"
          outlined
          :rules="[val => val !== null && val !== 0 && val > 0 || 'Bitte gib einen Preis an']"
        ><template v-slot:prepend>
            <q-icon name="euro">
            </q-icon>
          </template>
        </q-input>
        <div>
          <span>Bitte verwende nur Bilder die für die Wiederverwendung eindeutig gekennzeichnet sind. <br> Ansonsten kann dein Account gesperrt werden. <br></span>
          <br>
          <div class="uploader">
            <q-img
              style="height:100%;"
              :src="titleImgUrl"
            ></q-img>
            <q-btn
              round
              color="primary"
              icon="add"
              style="position: absolute;"
              :disable="titleUploadDisabled"
              @click="() => $refs.titleUpload.pickFiles()"
            >
              <q-inner-loading
                :showing="titleUploadDisabled"
                style="border-radius:50%"
              >
                <q-spinner
                  size="42px"
                  color="primary"
                >
                </q-spinner>
              </q-inner-loading>
            </q-btn>
          </div>
          <q-uploader
            url=""
            label="Titelbild hochladen"
            accept=".jpg, image/*"
            style="max-width: 300px; display:none;"
            hide-upload-btn
            ref="titleUpload"
            @added="fileAdded($event, 'title')"
          />
        </div>
        <q-uploader
          url=""
          label="Weitere Bilder hochladen"
          multiple
          style="max-width: 300px; display:none;"
          hide-upload-btn
          ref="galeryUpload"
          @added="fileAdded($event, 'galery')"
        />
        <div class="galeryImgUploaderContainer">
          <div
            class="uploader"
            v-for="(url, index) in galeryImgUrls"
            :key="url"
          >
            <q-img
              style="height:100%;"
              :src="url"
            ></q-img>
            <q-btn
              round
              color="primary"
              icon="add"
              style="transform:rotate(45deg); position: absolute;"
              @click="removeFile(index)"
            >
            </q-btn>
          </div>
          <div class="uploader">
            <q-btn
              round
              color="primary"
              icon="add"
              :disable="visible"
              @click="() => $refs.galeryUpload.pickFiles()"
              style="position:relative;"
            >
              <q-inner-loading
                :showing="visible"
                style="border-radius:50%"
              >
                <q-spinner
                  size="42px"
                  color="primary"
                >
                </q-spinner>
              </q-inner-loading>
            </q-btn>
          </div>
        </div>
        <div class="row justify-end">
          <q-btn
            type="submit"
            :loading="submitting"
            label="Speichern"
            class="q-mt-md"
            color="primary"
            text-color="white"
          >
            <template v-slot:loading>
              <q-spinner />
            </template>
          </q-btn>
        </div>
      </q-list>
    </q-form>
    <h4>Routenvorschau</h4>
    <Map
      :profile="profile"
      :stops="stops"
    ></Map>
    <h4>Danger Zone</h4>
    <q-list
      bordered
      class="rounded-borders"
      style="padding:10px; border-color:red;"
    >
      <p style="font-size:18px;">Diese Rundreise und alle enthaltenen Inhalte löschen</p>
      <q-btn
        :loading="deleting"
        label="Löschen"
        class="q-mt-md"
        color="primary"
        text-color="white"
        @click="deleteDialog = true;"
      >
        <template v-slot:loading>
          <q-spinner />
        </template>
      </q-btn>
      <q-dialog
        persistent
        v-model="deleteDialog"
      >
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">Willst du wirklich diese Rundreise und alle enthaltenen Inhalte löschen ? Dies kann nicht mehr rückgängig gemacht werden.</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Abbrechen"
              color="primary"
              v-close-popup
            />
            <q-btn
              flat
              label="Rundreise Löschen"
              @click="deleteRoundtrip()"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-list>
  </div>
</template>
<style lang="less">
@import "../css/editRoundtrips.less";
</style>
<script>
import { date, scroll, Loading } from 'quasar'
import Stop from '../pages/EditRoundtripComponents/stop'
import Duration from '../pages/EditRoundtripComponents/duration'
import CitySearch from '../pages/Map/CitySearch'
// import HotelSearch from '../pages/Map/HotelSearch'
import { auth, db, storage } from '../firebaseInit'
import { countries } from '../countries'
import Map from '../pages/Map/Map'
import axios from 'axios'

const { getScrollTarget, setScrollPosition } = scroll

let timeStamp = Date.now()
let formattedDate = date.formatDate(timeStamp, 'DD.MM.YYYY HH:mm')
let formattedScheduleDate = date.formatDate(timeStamp, 'DD.MM.YYYY')

// stop parameters
let BookingComLink = '',
  DateDistance = '',
  Description = 'Beschreibung',
  ExpediaLink = '',
  GeneralLink = '',
  ImageUrl = '',
  Price = 0,
  RTId = 0,
  Title = 'Titel',
  Location = {}

let details = []
let documentIds = []
let roundtrip = []
let roundtripDocId = ''
let galeryImgId = 0

export default {
  name: 'EditRoundtrips',
  components: {
    Stop,
    CitySearch,
    Map,
    Duration
    // HotelSearch
  },
  data () {
    return {
      options: ['Stopp', 'Hotel'],
      category: null,
      categoryOptions: [],
      selectedOption: null,
      date: formattedDate,
      addButtonActive: false,
      publish: false,
      addExpanded: false,
      title: '',
      country: '',
      submitting: false,
      deleting: false,
      countryOptions: countries,
      regionOptions: null,
      stops: [],
      documentIds: [],
      titleImgUrl: null,
      galeryImgUrls: [],
      stars: 3,
      tempStars: 3,
      descriptionInput: null,
      highlight1: null,
      highlight2: null,
      highlight3: null,
      inputProfile: null,
      deleteDialog: false,
      OfferStartPeriod: formattedScheduleDate,
      OfferEndPeriod: formattedScheduleDate,
      visible: false,
      titleUploadDisabled: false,
      urlReg: /^(http:\/\/|https:\/\/)/,
      generalTempLink: '',
      price: 0,
      location: {},
      wholeYearOffer: false,
      accessToken: 'pk.eyJ1IjoibWFyZWlza2kiLCJhIjoiY2pkaHBrd2ZnMDIyOTMzcDIyM2lra3M0eSJ9.wcM4BSKxfOmOzo67iW-nNg',
      durations: [],
      profile: '',
      region: null,
      parkingPlace: {},
      uploading: false,
      uploadIndex: 0
    }
  },
  methods: {
    dateOptions (date) {
      const dateTimeParts = formattedDate.split(' ')
      const dateParts = dateTimeParts[0].split('.')
      const timeParts = dateTimeParts[1].split(':')
      const compareDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0] - 1, timeParts[0], timeParts[1], '00')
      const currentDate = new Date(date)

      return currentDate >= compareDate
    },
    scheduleDateOptions (date) {
      const dateTimeParts = this.OfferStartPeriod.split(' ')
      const dateParts = dateTimeParts[0].split('.')
      const compareDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
      const currentDate = new Date(date)

      return currentDate > compareDate
    },
    onAddEntry () {
      if (!this.isDateTimeValid()) return false
      this.addExpanded = false
      this.addButtonActive = false

      try {
        this.addStop(this.date, this.selectedOption)
        this.loadRoundtripDetails(this.$route.params.id)

        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Eintrag wurde erstellt'
        })
      } catch (e) {
        console.log(e)
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht erstellt werden'
        })
      }
    },
    addStop (DateString, HotelStop) {
      RTId = this.$route.params.id

      const dateTimeParts = DateString.split(' ')
      const dateParts = dateTimeParts[0].split('.')
      const timeParts = dateTimeParts[1].split(':')

      let InitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

      GeneralLink = this.generalTempLink
      this.generalTempLink = null
      if (typeof this.$refs.urlInput !== 'undefined') this.$refs.urlInput.resetValidation()

      HotelStop = HotelStop === 'Hotel'

      Location = this.location

      db.collection('RoundtripDetails').add({
        BookingComLink,
        DateDistance,
        Description,
        ExpediaLink,
        GeneralLink,
        HotelStop,
        ImageUrl,
        InitDate,
        Price,
        RTId,
        Title,
        Location,
        Parking: this.parkingPlace
      })

      // clear all values
      this.selectedOption = null
      this.generalTempLink = null
      this.location = {}
      this.$refs.citySearch.clear()
      this.$refs.parkingPlaceSearch.clear()
    },
    saveRoundtripDaysAndHotels () {
      let daysString = ''
      let days = 1
      let initDates = []
      let hotelCount = 0

      this.stops.forEach(stop => {
        let dateTimeParts = stop.InitDate.split(' ')
        let dateParts = dateTimeParts[0].split('.')
        let timeParts = dateTimeParts[1].split(':')
        let initDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

        if (!initDates.includes(initDate)) initDates.push(initDate)
        if (stop.HotelStop) hotelCount++
      })

      if (initDates.length > 0) {
        let maxDate = new Date(Math.max.apply(null, initDates))
        let minDate = new Date(Math.min.apply(null, initDates))

        days = parseInt((maxDate.getTime() - minDate.getTime()) / (24 * 3600 * 1000))
      }

      if (isNaN(days)) days = 1
      if (isNaN(hotelCount)) hotelCount = 0

      if (days < 5) {
        daysString = '< 5 Tage'
      } else if (days >= 5 && days <= 8) {
        daysString = '5-8 Tage'
      } else if (days >= 9 && days <= 11) {
        daysString = '9-11 Tage'
      } else if (days >= 12 && days <= 15) {
        daysString = '12-15 Tage'
      } else if (days > 15) {
        daysString = '> 15 Tage'
      }
      if (daysString.length > 0) {
        this.saveData('Days', daysString)
      }
      this.saveData('Hotels', hotelCount)
    },
    deleteRoundtrip () {
      if (roundtripDocId === null || roundtripDocId === '' || roundtripDocId === 'undefined') return false
      const context = this
      let roundtripsRef = db.collection('RoundtripDetails')
        .where('RTId', '==', roundtripDocId)
      roundtripsRef.get()
        .then(snapshot => {
          details = []
          snapshot.forEach(doc => {
            db.collection('RoundtripDetails').doc(doc.id).delete()
          })
        })
      db.collection('Roundtrips').doc(roundtripDocId).delete().then(function () {
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Rundreise wurde gelöscht'
        })
        context.$router.push('/meine-rundreisen')
      }).catch(function (error) {
        console.log(error)
        context.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Die Rundreise konnte nicht gelöscht werden'
        })
      })
    },
    onSaveRoundtrip () {
      this.submitting = true

      let dateParts = this.OfferStartPeriod.split('.')
      let offerStartPeriod = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

      dateParts = this.OfferEndPeriod.split('.')
      let offerEndPeriod = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

      if (this.saveData('Public', this.publish) &&
        this.saveData('Location', this.country) &&
        this.saveData('Category', this.category) &&
        this.saveData('Stars', this.stars) &&
        this.saveData('Description', this.descriptionInput) &&
        this.saveData('Highlights', [this.highlight1, this.highlight2, this.highlight3]) &&
        this.saveData('Region', this.region) &&
        this.saveData('Profile', this.inputProfile) &&
        this.saveData('OfferStartPeriod', offerStartPeriod) &&
        this.saveData('OfferEndPeriod', offerEndPeriod) &&
        this.saveData('Price', this.price) &&
        this.saveData('OfferWholeYear', this.wholeYearOffer)) {
        this.submitting = false
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Rundreise wurde gespeichert'
        })
      } else {
        this.submitting = false
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Die Rundreise konnte nicht gespeichert werden'
        })
      }
    },
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = countries.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterRegions (val, update, abort) {
      if (val.length < 2 && this.regionOptions != null) {
        abort()
        return
      }

      update(() => {
        this.getRegions(this.country, val).then((results) => {
          this.regionOptions = results
        })
      })
    },
    getRegions (country, regionPref) {
      return new Promise((resolve, reject) => {
        axios.get('https://wft-geo-db.p.mashape.com/v1/geo/countries?limit=5&offset=0&namePrefix=' + country + '&languageCode=de', {
          headers: {
            'X-RapidAPI-Key': '01861af771mshb4bcca217c978fdp12121ejsnd0c4ce2c275a'
          }
        }).then(function (response) {
          console.log(response)
          axios.get('https://wft-geo-db.p.mashape.com/v1/geo/countries/' + response.code + '/regions?limit=5&offset=0&languageCode=de&namePrefix=' + regionPref, {
            headers: {
              'X-RapidAPI-Key': '01861af771mshb4bcca217c978fdp12121ejsnd0c4ce2c275a'
            }
          }).then(function (response) {
            resolve(response)
          }).catch(function (error) {
            console.log('Error' + error)
            resolve(null)
          })
        }).catch(function (error) {
          console.log('Error' + error)
          resolve(null)
        })
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
          this.title = roundtrip[0].Title
          this.publish = roundtrip[0].Public
          this.country = roundtrip[0].Location
          this.stars = roundtrip[0].Stars
          this.category = roundtrip[0].Category
          this.descriptionInput = roundtrip[0].Description
          this.highlight1 = roundtrip[0].Highlights[0]
          this.highlight2 = roundtrip[0].Highlights[1]
          this.highlight3 = roundtrip[0].Highlights[2]
          this.inputProfile = roundtrip[0].Profile
          this.region = roundtrip[0].Region
          this.price = roundtrip[0].Price
          this.wholeYearOffer = roundtrip[0].OfferWholeYear

          let retrievedDate = new Date(roundtrip[0].OfferEndPeriod.seconds * 1000)
          this.OfferEndPeriod = date.formatDate(retrievedDate, 'DD.MM.YYYY')

          retrievedDate = new Date(roundtrip[0].OfferStartPeriod.seconds * 1000)
          this.OfferStartPeriod = date.formatDate(retrievedDate, 'DD.MM.YYYY')

          this.getGeneralProfile()

          this.durations = []
          this.stops.forEach((stop, index) => {
            if (index >= 1) this.getDuration([this.stops[index - 1].Location.lng, this.stops[index - 1].Location.lat], [stop.Location.lng, stop.Location.lat], this.stops[index - 1].Title, stop.Profile)
          })

          this.loadInitImgs()
        })
        .catch(err => {
          console.log('Error getting Roundtrip', err)
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Deine Rundreise konnte nicht geladen werden, bitte versuche es erneut'
          })
        })
    },
    loadCategories () {
      let roundtripsRef = db.collection('Categories')
      roundtripsRef.get()
        .then(snapshot => {
          this.categoryOptions = []
          snapshot.forEach(doc => {
            this.categoryOptions.push(doc.data().Category)
          })
        })
    },
    updateLocation (event) {
      if (event !== null) {
        this.location = {
          lng: event.x,
          lat: event.y,
          label: event.label
        }
      } else {
        this.location = {}
      }
    },
    updateParkingPlace (event) {
      if (event !== null) {
        this.parkingPlace = {
          lng: event.x,
          lat: event.y,
          label: event.label
        }
      }
    },
    loadRoundtripDetails (RTId) {
      this.selectedCountry = this.country
      this.showSimulatedReturnData = false
      let roundtripsRef = db.collection('RoundtripDetails')
        .where('RTId', '==', RTId)
        .orderBy('InitDate')
      roundtripsRef.get()
        .then(snapshot => {
          details = []
          documentIds = []
          snapshot.forEach(doc => {
            details.push(doc.data())
            documentIds.push(doc.id)
          })

          this.documentIds = documentIds

          let daysString = ''
          let days = 1
          let initDates = []
          let hotelCount = 0

          // get dates
          details.forEach((stop) => {
            const initDate = new Date(stop.InitDate.seconds * 1000)
            stop.InitDate = date.formatDate(initDate, 'DD.MM.YYYY HH:mm')

            if (details.indexOf(stop) === details.length - 1) this.date = date.formatDate(initDate, 'DD.MM.YYYY HH:mm')

            if (stop.HotelStop) hotelCount++

            if (!initDates.includes(initDate)) initDates.push(initDate)
            if (stop.HotelStop) hotelCount++
          })

          if (initDates.length > 0) {
            let maxDate = new Date(Math.max.apply(null, initDates))
            let minDate = new Date(Math.min.apply(null, initDates))

            days = parseInt((maxDate.getTime() - minDate.getTime()) / (24 * 3600 * 1000))
          }

          if (days < 5) {
            daysString = '< 5 Tage'
          } else if (days >= 5 && days <= 8) {
            daysString = '5-8 Tage'
          } else if (days >= 9 && days <= 11) {
            daysString = '9-11 Tage'
          } else if (days >= 12 && days <= 15) {
            daysString = '12-15 Tage'
          } else if (days > 15) {
            daysString = '> 15 Tage'
          }

          // save days and hotels
          if (daysString.length > 0) {
            this.saveData('Days', daysString)
          }
          this.saveData('Hotels', hotelCount)

          this.stops = details

          this.saveRoundtripDaysAndHotels()
          Loading.hide()
        })
        .catch(err => {
          console.log('Error getting Roundtrips', err)
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Deine Rundreise konnte nicht geladen werden, bitte versuche es erneut'
          })
        })
    },
    msToTime (duration) {
      var minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

      let returnVal
      if (hours === 0 && minutes === 0) returnVal = null
      else if (hours === 0) returnVal = minutes + ' min'
      else if (minutes === 0) returnVal = hours + ' h'
      else returnVal = hours + ' h ' + minutes + ' min'

      return returnVal
    },
    getDuration (startLocation, endLocation, title, stopProfile) {
      let profile = this.profile
      if (stopProfile !== null && typeof stopProfile !== 'undefined') profile = stopProfile
      var url = 'https://api.mapbox.com/directions/v5/mapbox/' + profile + '/' + startLocation[0] + ',' + startLocation[1] + ';' + endLocation[0] + ',' + endLocation[1] + '?geometries=geojson&access_token=' + this.accessToken
      let context = this

      console.log(url)

      axios.get(url)
        .then(response => {
          var data = response.data.routes[0]

          if (data !== null && typeof data !== 'undefined') {
            let duration = context.msToTime(data.duration * 1000)
            let distance = Math.floor(data.distance / 1000) > 0 ? Math.floor(data.distance / 1000) + ' km' : ''
            if (distance !== '') distance = ' (' + distance + ')'

            context.durations.splice(context.stops.findIndex(x => x.Title === title), 0, { duration: duration, distance: distance, title: title })
          }
        })
    },
    saveData (field, value) {
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
    getGaleryImgId () {
      const returnVal = galeryImgId
      galeryImgId++
      return returnVal
    },
    fileAdded: function (event, kind) {
      let files = event

      // disable another upload
      if (kind === 'galery') this.visible = true
      else this.titleUploadDisabled = true
      this.uploadNext(files, kind)

      this.$refs.titleUpload.reset()
      this.$refs.galeryUpload.reset()
    },
    uploadNext (files, kind) {
      let context = this
      if (!this.uploading) {
        this.upload(files[this.uploadIndex], kind, this.uploadIndex + this.galeryImgUrls.length, this.uploadIndex === files.length - 1, files.length).then(function (success) {
          context.uploading = false
          context.uploadIndex++
          if (context.uploadIndex < files.length) context.uploadNext(files, kind)
        })
      }
    },
    upload (file, kind, count, lastItem, absoluteFiles) {
      return new Promise((resolve, reject) => {
        this.uploading = true

        let kindPath = 'Title/titleImg'
        const context = this
        if (kind === 'galery') {
          kindPath = 'Galery/galeryImg' + count
        }
        const fileRef = storage.ref().child('Images/Roundtrips/' + roundtripDocId + '/' + kindPath)

        fileRef.put(file).then(function (snapshot) {
          resolve(true)
          context.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Bild ' + (context.uploadIndex + 1) + ' von ' + absoluteFiles + ' wurde erfolgreich hochgeladen'
          })
          if (lastItem) {
            context.visible = false
            context.titleUploadDisabled = false
          }
          fileRef.getDownloadURL().then(function (url) {
            if (kind === 'galery') {
              context.galeryImgUrls.push(url)
            } else if (kind === 'title') {
              context.titleImgUrl = url
            }
          })
        }).catch(function (error) {
          resolve(false)
          console.log(error)
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Das Bild konnte nicht hochgeladen werden'
          })
        })
      })
    },
    loadInitImgs () {
      let context = this
      var fileRef = storage.ref().child('Images/Roundtrips/' + roundtripDocId + '/Title/titleImg')
      fileRef.getDownloadURL().then(function (url) {
        context.titleImgUrl = url
      })
      fileRef = storage.ref().child('Images/Roundtrips/' + roundtripDocId + '/Galery')
      fileRef.listAll().then(function (res) {
        res.items.forEach(function (itemRef) {
          fileRef = storage.ref().child(itemRef.fullPath)
          context.galeryImgUrls = []
          fileRef.getDownloadURL().then(function (url, index) {
            context.galeryImgUrls.push(url)
          })
        })
      }).catch(function (error) {
        console.log(error)
      })
    },
    removeFile (index) {
      let galeryImgNameArr = this.galeryImgUrls[index].split('Galery%2F')
      let galeryImgName = galeryImgNameArr[1]
      galeryImgName = galeryImgName.substring(0, galeryImgName.indexOf('?alt'))

      const fileRef = storage.ref().child('Images/Roundtrips/' + roundtripDocId + '/Galery/' + galeryImgName)
      let context = this
      fileRef.delete().then(function (snapshot) {
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Bild wurde erfolgreich gelöscht'
        })
        context.galeryImgUrls.splice(index, 1)
      })
    },
    hasDisplayPermission (RTId, userId) {
      let roundtripsRef = db.collection('Roundtrips')
        .where('RTId', '==', RTId)
        .where('UserId', '==', userId)
        .limit(1)
      roundtripsRef.get()
        .then(snapshot => {
          return Number(snapshot.size) === 1
        })
    },
    isDateTimeValid () {
      var testDate = this.date
      if (testDate === null || testDate.length === 0) return false
      var matches = testDate.match(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/)
      if (matches === null) return false
      var year = parseInt(matches[3], 10)
      var month = parseInt(matches[2], 10) - 1
      var day = parseInt(matches[1], 10)
      var hour = parseInt(matches[4], 10)
      var minute = parseInt(matches[5], 10)
      var date = new Date(year, month, day, hour, minute)
      if (date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day ||
        date.getHours() !== hour ||
        date.getMinutes() !== minute
      ) {
        return false
      } else {
        return true
      }
    },
    getGeneralProfile () {
      switch (this.inputProfile) {
        case 'zu Fuß':
          this.profile = 'walking'
          break
        case 'Fahrrad':
          this.profile = 'cycling'
          break
        default:
          this.profile = 'driving'
          break
      }
    },
    getStringProfile (profile) {
      switch (profile) {
        case 'walking':
          return 'zu Fuß'
        case 'cycling':
          return 'Fahrrad'
        default:
          return 'Auto'
      }
    },
    scrollTo (el) {
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 400
      setScrollPosition(target, offset, duration)
    },
    copyRT (originalRT, UserId, newTitle) {
      this.isUniqueTitle(newTitle).then(uniqueTitle => {
        if (newTitle === null || newTitle === '' || !uniqueTitle || newTitle.indexOf(' ') !== -1) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Ooops da ist wohl was schiefgelaufen'
          })
          this.$router.push('/meine-rundreisen')
          return false
        } else {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Rundreise wird zum bearbeiten kopiert...'
          })
        }

        let timeStamp = Date.now()
        let tempRTId = Math.floor(Math.random() * 10000000000000)
        db.collection('Roundtrips').add({
          Category: originalRT.Category,
          Days: originalRT.Days,
          Description: originalRT.Description,
          Hotels: originalRT.Hotels,
          Location: originalRT.Location,
          Region: originalRT.Region,
          Price: originalRT.Price,
          Public: false,
          RTId: tempRTId,
          Stars: originalRT.Stars,
          Profile: originalRT.Profile,
          Highlights: originalRT.Highlights,
          Title: newTitle,
          OfferEndPeriod: originalRT.OfferEndPeriod,
          OfferStartPeriod: originalRT.OfferStartPeriod,
          OfferWholeYear: originalRT.OfferWholeYear,
          UserId: UserId,
          createdAt: new Date(timeStamp)
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

              let roundtripDetailsRef = db.collection('RoundtripDetails')
                .where('RTId', '==', originalRT.RTId)
              roundtripDetailsRef.get()
                .then(detailsSnapshot => {
                  detailsSnapshot.forEach(detailDoc => {
                    let docData = detailDoc.data()

                    console.log(docData)

                    db.collection('RoundtripDetails').add({
                      BookingComLink: docData.BookingComLink,
                      DateDistance: docData.DateDistance,
                      Description: docData.Description,
                      ExpediaLink: docData.ExpediaLink,
                      GeneralLink: docData.GeneralLink,
                      HotelStop: docData.HotelStop,
                      ImageUrl: docData.ImageUrl,
                      InitDate: docData.InitDate,
                      Price: docData.Price,
                      RTId: doc.id,
                      Title: docData.Title,
                      Location: {
                        lng: docData.Location.lng,
                        lat: docData.Location.lat,
                        label: docData.Location.label
                      }
                    })

                    this.loadRoundtripDetails(doc.id)
                    this.loadSingleRoundtrip(doc.id)
                  })
                })
            })
          })
      }
      )
    },
    isUniqueTitle (value) {
      return new Promise((resolve, reject) => {
        value = value.toLowerCase()
        value = value.charAt(0).toUpperCase() + value.slice(1)
        value = value.replace(/ /g, '')
        let roundtripsRef = db.collection('Roundtrips')
          .where('Title', '==', value)
          .limit(1)
        roundtripsRef.get()
          .then(snapshot => {
            resolve(snapshot.size === 0)
          })
      })
    }
  },
  created () {
    auth.authRef().onAuthStateChanged((user) => {
      if (auth.user() === null) this.$router.push('/login')
      const params = this.$route.params.id
      let RTId = params
      let title = null

      if (params.includes('&')) {
        RTId = params.split('&')[0]
        title = params.split('&')[1]
      }

      let roundtripsRef = db.collection('Roundtrips')
        .where('RTId', '==', RTId)
        .limit(1)
      roundtripsRef.get()
        .then(snapshot => {
          let isCreator = auth.user().uid === snapshot.docs[0].data().UserId
          let isPublic = snapshot.docs[0].data().Public === true

          if (isCreator) {
            this.loadRoundtripDetails(RTId)
            this.loadSingleRoundtrip(RTId)
            this.loadCategories()
          } else if (isPublic) {
            console.log(title)
            this.copyRT(snapshot.docs[0].data(), auth.user().uid, title)
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: 'Ooops da ist leider etwas schiefgelaufen, diese Rundreise ist Privat'
            })
            this.$router.push('/meine-rundreisen')
          }
        })
    })
  },
  beforeDestroy () {
    this.saveRoundtripDaysAndHotels()
  }
}
</script>
