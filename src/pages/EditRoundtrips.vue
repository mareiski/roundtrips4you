<template>
  <div class="edit-roundtrips q-px-lg q-pb-md">
    <router-link to="/meine-rundreisen">
      <q-icon name="keyboard_arrow_left"></q-icon>
      zurück zu meinen Rundreisen
    </router-link>
    <h3>{{title}}
      <q-popup-edit
        v-model="title"
        @save="saveData('Title', title)"
      >
        <q-input
          v-model="title"
          dense
          autofocus
        />
      </q-popup-edit>
    </h3>
    <q-timeline color="secondary">
      <q-timeline-entry heading>
        Reiseverlauf

      </q-timeline-entry>

      <div class="stop-list">
        <Stop
          v-for="(stop, index) in stops"
          :key="stop"
          :title="stop.Title"
          :date="stop.InitDate"
          :icon="!stop.HotelStop ? 'location_on' : 'hotel'"
          :editor-placeholder="stop.Description"
          :editor="true"
          :doc-id="documentIds[index]"
          :general-link="stop.GeneralLink"
          :location="stop.Location.label.split(',')[0]"
        ></Stop>
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
                        :options="dateOptions"
                      />
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
              <CitySearch @update="updateLocation($event)"></CitySearch>
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
            Wenn deine Rundreise veröffentlicht ist kann sie jeder ansehen.
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
        <q-select
          outlined
          v-model="category"
          :options="categoryOptions"
          label="Kategorie"
          use-input
          :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Kategorie']"
          clearable
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
          val => val.length > 10 && val.length < 150 || 'Bitte gib eine Beschreibung zwischen 10 und 150 Zeichen an' ]"
        > <template v-slot:prepend>
            <q-icon name="subject" />
          </template>
        </q-input>
        <q-input
          v-model="tag1"
          label="Reiseart"
          outlined
          :rules="[val => val !== null && val !== '' || 'Bitte gib eine Reiseart an']"
        > <template v-slot:prepend>
            <q-icon name="commute" />
          </template></q-input>
        <q-input
          v-model="tag2"
          label="Reisemerkmal 1"
          outlined
          :rules="[val => val !== null && val !== '' || 'Bitte gib ein Reisemerkmal an']"
        > <template v-slot:prepend>
            <q-icon name="turned_in" />
          </template></q-input>
        <q-input
          v-model="tag3"
          label="Reisemerkmal 2"
          outlined
          :rules="[val => val !== null && val !== '' || 'Bitte gib ein Reisemerkmal an']"
        > <template v-slot:prepend>
            <q-icon name="turned_in" />
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
              :options="dateOptions"
              @input="() => [$refs.qDateProxy1.hide(), OfferEndPeriod = OfferStartPeriod]"
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
              @click="() => $refs.titleUpload.pickFiles()"
            ></q-btn>
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
    <Map :stops="stops"></Map>
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
import { date } from 'quasar'
import Stop from '../pages/EditRoundtripComponents/stop'
import CitySearch from '../pages/Map/CitySearch'
import { auth, db, storage } from '../firebaseInit'
import { countries } from '../countries'
import Map from '../pages/Map/Map'

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
    Map
  },
  data () {
    return {
      options: ['Stop', 'Hotel'],
      category: null,
      categoryOptions: ['Kategorie1', 'Kategorie2'],
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
      stops: [],
      documentIds: [],
      titleImgUrl: null,
      galeryImgUrls: [],
      stars: 3,
      tempStars: 3,
      descriptionInput: null,
      tag1: null,
      tag2: null,
      tag3: null,
      deleteDialog: false,
      OfferStartPeriod: formattedScheduleDate,
      OfferEndPeriod: formattedScheduleDate,
      visible: false,
      urlReg: /^(http:\/\/|https:\/\/)/,
      generalTempLink: '',
      price: 0,
      location: {},
      wholeYearOffer: false
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
          icon: 'fas fa-check-circle',
          message: 'Eintrag wurde erstellt'
        })
      } catch (e) {
        console.log(e)
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
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
      this.location = {}

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
        Location
      })
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
          icon: 'fas fa-check-circle',
          message: 'Rundreise wurde gelöscht'
        })
        context.$router.push('/meine-rundreisen')
      }).catch(function (error) {
        console.log(error)
        context.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
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
        this.saveData('Tags', [this.tag1, this.tag2, this.tag3]) &&
        this.saveData('OfferStartPeriod', offerStartPeriod) &&
        this.saveData('OfferEndPeriod', offerEndPeriod) &&
        this.saveData('Price', this.price) &&
        this.saveData('OfferWholeYear', this.wholeYearOffer)) {
        this.submitting = false
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Rundreise wurde gespeichert'
        })
      } else {
        this.submitting = false
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
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
          this.tag1 = roundtrip[0].Tags[0]
          this.tag2 = roundtrip[0].Tags[1]
          this.tag3 = roundtrip[0].Tags[2]
          this.price = roundtrip[0].Price
          this.wholeYearOffer = roundtrip[0].OfferWholeYear

          let retrievedDate = new Date(roundtrip[0].OfferEndPeriod.seconds * 1000)
          this.OfferEndPeriod = date.formatDate(retrievedDate, 'DD.MM.YYYY')

          retrievedDate = new Date(roundtrip[0].OfferStartPeriod.seconds * 1000)
          this.OfferStartPeriod = date.formatDate(retrievedDate, 'DD.MM.YYYY')

          this.loadInitImgs()
        })
        .catch(err => {
          console.log('Error getting Roundtrip', err)
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Deine Rundreise konnte nicht geladen werden, bitte versuche es erneut'
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
        })
        .catch(err => {
          console.log('Error getting Roundtrips', err)
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Deine Rundreise konnte nicht geladen werden, bitte versuche es erneut'
          })
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
      let context = this
      Array.from(Array(files.length).keys()).map(x => {
        this.upload(files[x], kind, x + context.galeryImgUrls.length, x === files.length - 1)
      })
      this.$refs.titleUpload.reset()
      this.$refs.galeryUpload.reset()
    },
    upload (file, kind, count, lastItem) {
      this.visible = true
      let kindPath = 'Title/titleImg'
      const context = this
      if (kind === 'galery') {
        kindPath = 'Galery/galeryImg' + count
      }
      const fileRef = storage.ref().child('Images/Roundtrips/' + roundtripDocId + '/' + kindPath)

      fileRef.put(file).then(function (snapshot) {
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Bild wurde erfolgreich hochgeladen'
        })
        if (lastItem) context.visible = false
        fileRef.getDownloadURL().then(function (url) {
          if (kind === 'galery') {
            context.galeryImgUrls.push(url)
          } else if (kind === 'title') {
            context.titleImgUrl = url
          }
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
          icon: 'fas fa-check-circle',
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
    }
  },
  created () {
    auth.authRef().onAuthStateChanged((user) => {
      if (auth.user() === null) this.$router.push('/login')
      const RTId = this.$route.params.id
      let hasDisplayPermission = false

      let roundtripsRef = db.collection('Roundtrips')
        .where('RTId', '==', RTId)
        .where('UserId', '==', auth.user().uid)
        .limit(1)
      roundtripsRef.get()
        .then(snapshot => {
          hasDisplayPermission = Number(snapshot.size) === 1

          if (hasDisplayPermission) {
            this.loadRoundtripDetails(RTId)
            this.loadSingleRoundtrip(RTId)
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: 'Ooops da ist leider etwas schiefgelaufen'
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
