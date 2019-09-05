<template>
  <div class="edit-roundtrips q-px-lg q-pb-md">
    <h3>Reiseverlauf</h3>
    <q-timeline color="secondary">
      <q-timeline-entry heading>
        {{title}}
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
      </q-timeline-entry>

      <div class="stop-list">
        <Stop
          v-for="stop in stops"
          :key="stop"
          :title="stop.Title"
          :date="stop.InitDate"
          :icon="!stop.HotelStop ? 'location_on' : 'hotel'"
          :editor-placeholder="stop.Description"
          :editor="true"
          :doc-id="getDocId()"
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
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="date"
                mask="date"
                lazy-rules
                :rules="['date']"
                class="input-item"
              >
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="date"
                    today-btn
                    :options="dateOptions"
                    @input="() => $refs.qDateProxy.hide()"
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
                v-model="selectedOption"
                :options="options"
                label="Eintrag"
                clearable
                class="input-item"
                lazy-rules
                :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Option']"
              >
                <template v-slot:prepend>
                  <q-icon name="list" />
                </template>
              </q-select>
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
          icon="publish"
        >
          <q-tooltip>
            Wenn deine Rundreise veröffentlicht ist kann sie jeder ansehen.
          </q-tooltip>
        </q-toggle>
        <q-select
          filled
          v-model="country"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="countryOptions"
          label="Land auswählen"
          @filter="filterFn"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Land']"
          style="width: 250px; padding-bottom: 32px"
        >
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
          v-model="time"
          :options="timeOptions"
          label="Zeitraum"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Bitte wähle einen Zeitraum']"
          clearable
          class="input-item"
        >
          <template v-slot:prepend>
            <q-icon name="access_time" />
          </template>
        </q-select>
        <q-uploader
          url=""
          label="Titelbild hochladen"
          accept=".jpg, image/*"
          style="max-width: 300px"
          hide-upload-btn
          @added="fileAdded($event, 'title')"
        />
        <img
          style="width:50px;"
          :src="titleImgUrl"
        >
        <q-uploader
          url=""
          label="Weitere Bilder hochladen"
          multiple
          style="max-width: 300px"
          hide-upload-btn
          @added="fileAdded($event, 'galery')"
        />
        <img
          style="width:50px;"
          v-for="url in galeryImgUrls"
          :key="url"
          :src="url"
        >
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
              <q-spinner-puff />
            </template>
          </q-btn>
        </div>
      </q-list>
    </q-form>
    <div class="row">
      <q-btn
        :loading="deleting"
        label="Löschen"
        class="q-mt-md"
        color="primary"
        text-color="white"
        @click="deleteRoundtrip()"
      >
        <template v-slot:loading>
          <q-spinner-puff />
        </template>
      </q-btn>
    </div>
  </div>
</template>
<style lang="less">
@import "../css/editRoundtrips.less";
</style>
<script>
import { date } from 'quasar'
import Stop from '../pages/EditRoundtripComponents/stop'
import { db, storage } from '../firebaseInit'

let timeStamp = Date.now()
let formattedDate = date.formatDate(timeStamp, 'YYYY/MM/DD')

// stop parameters
let BookingComLink = '',
  DateDistance = '',
  Description = 'Beschreibung',
  ExpediaLink = '',
  GeneralLink = '',
  ImageUrl = '',
  Price = 0,
  RTId = 0,
  Title = 'Titel'

let details = []
let documentIds = []
let docNum = 0
let roundtrip = []
let roundtripDocId = ''
let galeryImgId = 0

const stringOptions = [
  'Deutschland', 'Italien', 'Vietnam'
]

export default {
  components: {
    Stop
  },
  data () {
    return {
      options: ['Stop', 'Hotel'],
      timeOptions: [
        '< 5 Tage', '5-8 Tage', '9-11 Tage', '12-15 Tage', '> 15 Tage'
      ],
      time: null,
      selectedOption: null,
      date: formattedDate,
      addButtonActive: false,
      publish: false,
      addExpanded: false,
      title: '',
      country: '',
      submitting: false,
      countryOptions: stringOptions,
      stops: [],
      documentIds: [],
      titleImgUrl: null,
      galeryImgUrls: []
    }
  },
  methods: {
    dateOptions (date) {
      return date >= formattedDate
    },
    onAddEntry () {
      this.addExpanded = false
      this.addButtonActive = false

      this.addStop(this.date, this.selectedOption)
      this.stops.push({ Title: 'Titel', InitDate: this.date, HotelStop: this.selectedOption === 'Hotel', Description: 'Beschreibung' })

      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'fas fa-check-circle',
        message: 'Eintrag wurde erstellt'
      })
    },
    getDocId () {
      const returnVal = documentIds[docNum]
      docNum++
      return returnVal
    },
    addStop (DateString, HotelStop) {
      RTId = this.$route.params.id
      const InitDate = new Date(DateString)
      HotelStop = HotelStop === 'Hotel'
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
        Title
      })
    },
    deleteRoundtrip () {
      if (roundtripDocId === null || roundtripDocId === '' || roundtripDocId === 'undefined') return false
      const context = this
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
      // const ImageGalery = ['venice.png']

      if (this.saveData('Public', this.publish) &&
        this.saveData('Location', this.country) && this.saveData('Days', this.time)) {
        // this.saveData('ImageGalery', ImageGalery)

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
          this.title = roundtrip[0].Title
          this.publish = roundtrip[0].Public
          this.country = roundtrip[0].Location
          this.time = roundtrip[0].Days

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
            documentIds.push(doc.id)
          })

          console.log(documentIds)
          this.documentIds = documentIds

          // get dates
          details.forEach((detail) => {
            const initDate = new Date(detail.InitDate.seconds * 1000)
            detail.InitDate = date.formatDate(initDate, 'YYYY/MM/DD')
          })
          this.stops = details
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
      console.log(roundtripDocId)
      if (roundtripDocId === null || roundtripDocId === '' || roundtripDocId === 'undefined') return false
      try {
        if (field === 'Title') {
          db.collection('Roundtrips').doc(roundtripDocId).update({
            'Title': value
          })
        } else if (field === 'Public') {
          db.collection('Roundtrips').doc(roundtripDocId).update({
            'Public': value
          })
        } else if (field === 'Location') {
          db.collection('Roundtrips').doc(roundtripDocId).update({
            'Location': value
          })
        } else if (field === 'Days') {
          db.collection('Roundtrips').doc(roundtripDocId).update({
            'Days': value
          })
        }
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
      Array.from(Array(files.length).keys()).map(x => {
        this.upload(files[x], kind, x)
      })
    },
    upload (file, kind, count) {
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
          console.log(itemRef)
          fileRef = storage.ref().child(itemRef.fullPath)
          context.galeryImgUrls = []
          fileRef.getDownloadURL().then(function (url) {
            context.galeryImgUrls.push(url)
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
