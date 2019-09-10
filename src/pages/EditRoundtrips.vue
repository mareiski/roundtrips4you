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
          v-for="(stop, index) in stops"
          :key="stop"
          :title="stop.Title"
          :date="stop.InitDate"
          :icon="!stop.HotelStop ? 'location_on' : 'hotel'"
          :editor-placeholder="stop.Description"
          :editor="true"
          :doc-id="documentIds[index]"
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
          outlined
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
          v-model="category"
          :options="categoryOptions"
          label="Kategorie"
          lazy-rules
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
          lazy-rules
          label="Kurze Beschreibung"
          :rules="[val => val !== null && val !== '' || 'Bitte gib eine Beschreibung an',
          val => val.length > 10 && val.length < 150 || 'Bitte gib eine Beschreibung zwischen 10 und 150 Zeichen an' ]"
        />
        <q-input
          v-model="tag1"
          label="Reiseart"
          outlined
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Bitte gib eine Reiseart an']"
        />
        <q-input
          v-model="tag2"
          label="Reisemerkmal 1"
          outlined
          :rules="[val => val !== null && val !== '' || 'Bitte gib ein Reisemerkmal an']"
        />
        <q-input
          v-model="tag3"
          label="Reisemerkmal 2"
          outlined
          :rules="[val => val !== null && val !== '' || 'Bitte gib ein Reisemerkmal an']"
        />
        <div>
          <div
            class="uploader"
            :style="{ backgroundImage: 'url('+ titleImgUrl +')' }"
          >
            <q-btn
              round
              color="primary"
              icon="add"
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
            :style="{ backgroundImage: 'url('+ url +')' }"
          >
            <q-btn
              round
              color="primary"
              icon="add"
              style="transform:rotate(45deg)"
              @click="removeFile(index)"
            ></q-btn>
          </div>
          <div class="uploader">
            <q-btn
              round
              color="primary"
              icon="add"
              @click="() => $refs.galeryUpload.pickFiles()"
            ></q-btn>
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
              <q-spinner-puff />
            </template>
          </q-btn>
        </div>
      </q-list>
    </q-form>
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
          <q-spinner-puff />
        </template>
      </q-btn>
      <q-dialog
        persistent
        v-model="deleteDialog"
      >
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">Willst du wirklich diese Rundreise und alle enthaltenen Inhalte löschen. Dies kann nichtmehr rückgängig gemacht werden.</span>
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
let roundtrip = []
let roundtripDocId = ''
let galeryImgId = 0

const stringOptions = [
  'Deutschland', 'Italien', 'Vietnam'
]

export default {
  name: 'EditRoundtrips',
  components: {
    Stop
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
      countryOptions: stringOptions,
      stops: [],
      documentIds: [],
      titleImgUrl: null,
      galeryImgUrls: [],
      stars: 3,
      descriptionInput: null,
      tag1: null,
      tag2: null,
      tag3: null,
      deleteDialog: false
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
      this.loadRoundtripDetails(this.$route.params.id)

      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'fas fa-check-circle',
        message: 'Eintrag wurde erstellt'
      })
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

      let daysString = ''
      let days = 1
      if (this.stops.length > 1) {
        let initDates = []

        this.stops.forEach(stop => {
          if (!initDates.includes(new Date(stop.InitDate))) initDates.push(new Date(stop.InitDate))
        })

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
      this.saveData('Days', daysString)
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

      if (this.saveData('Public', this.publish) &&
        this.saveData('Location', this.country) &&
        this.saveData('Category', this.category) &&
        this.saveData('Stars', this.stars) &&
        this.saveData('Description', this.descriptionInput) &&
        this.saveData('Tags', [this.tag1, this.tag2, this.tag3])) {
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
          this.stars = roundtrip[0].Stars
          this.category = roundtrip[0].Category
          this.descriptionInput = roundtrip[0].Description
          this.tag1 = roundtrip[0].Tags[0]
          this.tag2 = roundtrip[0].Tags[1]
          this.tag3 = roundtrip[0].Tags[2]

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
        this.upload(files[x], kind, x + context.galeryImgUrls.length)
      })
      this.$refs.titleUpload.reset()
      this.$refs.galeryUpload.reset()
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
    }
  },
  created () {
    const RTId = this.$route.params.id
    this.loadRoundtripDetails(RTId)
    this.loadSingleRoundtrip(RTId)
  }
}
</script>
