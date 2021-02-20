<template>
  <div class="q-px-lg">
    <div
      class="edit-btn-container"
      v-if="user !== null"
      style="position:fixed; z-index:1; right:0; padding: 10px"
    >
      <q-btn
        round
        color="primary"
        icon="visibility"
        @click="$router.push('/rundreise-ansehen/' + RTId)"
      >
        <q-tooltip>Reise ansehen</q-tooltip>
      </q-btn>
    </div>
    <h3 style="padding-top:10px;">Einstellungen</h3>
    <q-form
      bordered
      class="q-gutter-md rounded-borders"
    >
      <h4>Reise teilen</h4>
      <q-list
        bordered
        class="rounded-borders"
        style="padding:10px"
      >
        <q-item-label style="padding-bottom:5px;">Wenn deine Rundreise veröffentlicht ist kann sie jeder ansehen und kopieren.</q-item-label>
        <q-toggle
          v-model="publish"
          label="Rundreise veröffentlichen"
          icon="share"
          :disable="!user || !user.displayName"
          @input="onSaveRoundtrip"
        >
          <q-tooltip v-if="!user || !user.displayName">Bitte erstelle zuerst einen Benutzernamen</q-tooltip>
        </q-toggle>
        <!-- todo map widget is not working anymore -->
        <!-- <div
          v-show="publish"
          style="padding-bottom:20px;"
        >
          <b>Link zur Karte veröffentlichen</b>
          <p>Über den Folgenden Link kannst du die Karte deiner Reise veröffentlichen. Ebenso wird ein Link zu der ganzen Reise auf Roundtrips4you veröffentlicht.</p>
          <a :href="'https://roundtrips4you.de/MapWidget/' + RTId">https://roundtrips4you.de/MapWidget/{{RTId}}</a>
          <q-icon
            style="margin-left:10px;"
            size="25px;"
            name="file_copy"
            class="cursor-pointer"
            @click="copyShareLink('share-link')"
          />
          <input
            type="hidden"
            id="share-link"
            :value="shareLink"
          />
          <br />
          <br />
          <p>Dieser Link darf auch per Iframe in eine Website eingebettet werden. Dazu einfach den folgenden Code kopieren und an die entsprechende Stelle einfügen.</p>
          <span>&lt;iframe src='https://roundtrips4you.de/MapWidget/{{RTId}}'&gt;&lt;/iframe&gt;</span>
          <q-icon
            style="margin-left:10px;"
            size="25px;"
            name="file_copy"
            class="cursor-pointer"
            @click="copyShareLink('share-code')"
          />
          <input
            type="hidden"
            id="share-code"
            :value="shareCode"
          />
        </div> -->
        <q-select
          outlined
          v-model="category"
          :options="categoryOptions"
          label="Kategorie"
          use-input
          :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Kategorie']"
          class="input-item"
          @blur="onSaveRoundtrip"
        >
          <template v-slot:prepend>
            <q-icon name="access_time" />
          </template>
        </q-select>
        <div
          class="flex"
          style="padding-bottom:20px;"
        >
          <q-rating
            class="stars"
            v-model="stars"
            size="15px"
            color="gold"
            :readonly="!isNaN(hotelRatingAvg())"
            style="margin-right:10px;"
            @blur="onSaveRoundtrip"
          />
          <q-item-label>Durchschittliche Hotelbewertung {{!isNaN(hotelRatingAvg()) ? '(errechnet)' : ''}}</q-item-label>
        </div>
        <q-input
          v-model="descriptionInput"
          outlined
          autogrow
          label="Kurze Beschreibung"
          @blur="onSaveRoundtrip"
          :rules="[val => val !== null && val !== '' || 'Bitte gib eine Beschreibung an',
          val => val.length > 10 && val.length < 160 || 'Bitte gib eine Beschreibung zwischen 10 und 160 Zeichen an' ]"
        >
          <template v-slot:prepend>
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
          @blur="onSaveRoundtrip"
        >
          <template v-slot:prepend>
            <q-icon name="commute" />
          </template>
        </q-select>
        <q-input
          v-model="highlight1"
          label="Highlight 1"
          outlined
          @blur="onSaveRoundtrip"
          :rules="[val => val !== null && val !== '' || 'Bitte gib ein Highlight an']"
        >
          <template v-slot:prepend>
            <q-icon name="star" />
          </template>
        </q-input>
        <q-input
          v-model="highlight2"
          label="Highlight 2"
          outlined
          @blur="onSaveRoundtrip"
          :rules="[val => val !== null && val !== '' || 'Bitte gib ein Highlight an']"
        >
          <template v-slot:prepend>
            <q-icon name="star" />
          </template>
        </q-input>
        <q-input
          v-model="highlight3"
          label="Highlight 3"
          outlined
          :rules="[val => val !== null && val !== '' || 'Bitte gib ein Highlight an']"
          @blur="onSaveRoundtrip"
        >
          <template v-slot:prepend>
            <q-icon name="star" />
          </template>
        </q-input>
        <q-input
          @blur="onSaveRoundtrip"
          v-model="price"
          label="Pauschalpreis ohne Freizeitgestaltung"
          type="number"
          outlined
          :rules="[val => val !== null && val !== 0 && val > 0 || 'Bitte gib einen Preis an']"
        >
          <template v-slot:prepend>
            <q-icon name="euro"></q-icon>
          </template>
        </q-input>
        <q-item-label style="padding-bottom:5px; margin-top:10px;">Angebotszeitraum</q-item-label>
        <q-toggle
          v-model="wholeYearOffer"
          label="Ganzes Jahr"
          icon="event"
          @input="onSaveRoundtrip"
        ></q-toggle>
        <q-input
          :disable="wholeYearOffer"
          outlined
          v-model="OfferStartPeriod"
          label="von"
          class="q-field--with-bottom"
          @blur="onSaveRoundtrip"
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
          </q-popup-proxy>
          <template v-slot:prepend>
            <q-icon
              name="event"
              class="cursor-pointer"
            ></q-icon>
          </template>
        </q-input>
        <q-input
          @blur="onSaveRoundtrip"
          :disable="wholeYearOffer"
          outlined
          v-model="OfferEndPeriod"
          class="q-field--with-bottom"
          label="bis"
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
            ></q-icon>
          </template>
        </q-input>
        <RegionSearch
          v-if="countries.length === 1"
          :country="countries[0]"
          :defaultRegion="region"
          @update="updateRegion($event)"
          @blur="onSaveRoundtrip"
        ></RegionSearch>
      </q-list>
      <h4>Persönliche Informationen</h4>
      <q-list
        bordered
        class="rounded-borders"
        style="padding:10px"
      >
        <p style="margin-bottom:15px;">Diese werden nur dir angezeigt und auch beim Veröffentlichen nicht berücksichtigt.</p>
        <div>
          <q-input
            v-model="rooms"
            label="Zimmer"
            type="number"
            @blur="onSaveRoundtrip"
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
            @blur="onSaveRoundtrip"
            :rules="[val => val !== null &&  val !== '' && val > 0  || 'Bitte gib die Anzahl der Erwachsenen Reisenden an', val => val <= parseInt(rooms) * 9 || 'Bitte wähle mehr Zimmer']"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="group" />
            </template>
          </q-input>
          <q-input
            v-model="children"
            label="Kinder"
            type="number"
            @blur="parseInt(children) === 0 ? onSaveRoundtrip() : null"
            @input="childrenAges.length = parseInt(children)"
            :rules="[val => val !== null &&  val !== '' && val >= 0  && val <= 20|| 'Bitte gib die Anzahl der Kinder auf der Reise an']"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="child_friendly" />
            </template>
          </q-input>
          <div
            class="flex"
            v-if="parseInt(children) > 0  && parseInt(children) <= 20"
          >
            <q-input
              v-for="childNum in parseInt(children)"
              :key="childNum"
              v-model="childrenAges[childNum - 1]"
              :label="'Alter Kind ' + childNum"
              type="number"
              @blur="onSaveRoundtrip"
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
      </q-list>
      <h4>An-/Abreise</h4>
      <q-select
        outlined
        v-model="arrivalDepatureProfile"
        @blur="onSaveRoundtrip"
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
          @blur="onSaveRoundtrip"
          clearable
          ref="select"
          v-model="origin"
          hide-dropdown-icon
          label="Abflugsort"
          :options="originOptions"
          @filter="getOrigins"
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
          @blur="onSaveRoundtrip"
          v-model="destination"
          hide-dropdown-icon
          label="Ankunftsort"
          :options="destinationOptions"
          @filter="getDestinations"
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
          @blur="onSaveRoundtrip"
          class="input-item rounded-borders q-field--with-bottom"
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
          @blur="onSaveRoundtrip"
          class="input-item rounded-borders q-field--with-bottom"
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
          @blur="onSaveRoundtrip"
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
          @blur="onSaveRoundtrip"
          :options="['Ja', 'Nein']"
          label="Non Stop"
          :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Option']"
        >
          <template v-slot:prepend>
            <q-icon name="flight" />
          </template>
        </q-select>
      </div>
      <h4>Bilder</h4>
      <q-list
        bordered
        class="rounded-borders"
        style="padding:10px"
      >
        <div>
          <p>Bitte verwende nur Bilder die für die Wiederverwendung eindeutig gekennzeichnet sind.</p>
          <span>Titelbild</span>
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
                ></q-spinner>
              </q-inner-loading>
            </q-btn>
          </div>
          <q-uploader
            url
            label="Titelbild hochladen"
            accept=".jpg, image/*"
            style="max-width: 300px; display:none;"
            hide-upload-btn
            ref="titleUpload"
            @added="fileAdded($event, 'title')"
          />
        </div>
        <q-uploader
          url
          label="Weitere Bilder hochladen"
          multiple
          style="max-width: 300px; display:none;"
          hide-upload-btn
          ref="galeryUpload"
          @added="fileAdded($event, 'galery')"
        />
        <span>weitere Bilder</span>
        <div class="galeryImgUploaderContainer">
          <div
            class="uploader"
            v-for="(url, index) in galeryImgUrls"
            :key="index"
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
            ></q-btn>
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
                ></q-spinner>
              </q-inner-loading>
            </q-btn>
          </div>
        </div>
      </q-list>
    </q-form>
    <h4 v-if="companyProfile">Unternehmenseinstellungen</h4>
    <q-list
      v-if="companyProfile"
      bordered
      class="rounded-borders"
      style="padding:10px;"
    >
      <q-input
        v-model="tripWebsite"
        outlined
        clear-icon
        @blur="tripWebsite && urlReg.test(tripWebsite)  ? saveData('tripWebsite', tripWebsite) : null"
        :rules="[val => !val || urlReg.test(val) || 'Bitte gib einen richtigen Link an']"
        label="Link zu dieser Reise"
        lazy-rules
      />
    </q-list>
    <h4>Danger Zone</h4>
    <q-list
      bordered
      class="rounded-borders"
      style="padding:10px; border-color:red; margin-bottom:20px;"
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
              label="Rundreise Löschen"
              @click="deleteRoundtrip()"
              color="primary"
              v-close-popup
            />
            <q-btn
              flat
              label="Abbrechen"
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
import { db, auth, storage } from '../firebaseInit.js'
import sharedMethods from '../sharedMethods.js'
import axios from 'axios'

let timeStamp = Date.now()
let formattedScheduleDate = date.formatDate(timeStamp, 'DD.MM.YYYY')

let context

export default {
  name: 'RoundtripSettings',
  components: {
    RegionSearch: () => import('../pages/Map/RegionSearch')
  },
  data () {
    return {
      stops: [],
      region: null,
      profile: null,
      inputProfile: null,
      RTId: null,
      OfferStartPeriod: formattedScheduleDate,
      OfferEndPeriod: formattedScheduleDate,
      countries: [],
      publish: false,
      stars: 3,
      descriptionInput: null,
      highlight1: null,
      highlight2: null,
      highlight3: null,
      wholeYearOffer: false,
      rooms: 0,
      adults: 0,
      children: 0,
      childrenAges: [],
      price: 0,
      category: 'Familienreise',
      categoryOptions: [],
      deleteDialog: false,
      companyProfile: false,
      tripWebsite: null,
      deleting: false,
      visible: false,
      titleImgUrl: null,
      galeryImgUrls: [],
      titleUploadDisabled: false,
      shareLink: null,
      shareCode: null,
      arrivalDepatureProfile: null,
      destination: null,
      travelClass: null,
      nonStop: null,
      originCode: null,
      origin: null,
      originOptions: [],
      destinationOptions: [],
      destinationCode: null,
      depatureDate: null,
      returnDate: null
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
    /**
       * Copy share link of roundtrip to clipboard
       * @param {String} elementId the id of the element, where the link to copy is
       * @example copyShareLink('share-link-element')
       */
    copyShareLink (elementId) {
      let testingCodeToCopy = document.querySelector('#' + elementId)
      testingCodeToCopy.setAttribute('type', 'text')
      testingCodeToCopy.select()

      try {
        document.execCommand('copy')
        sharedMethods.showSuccessNotification('Link wurde erfolgreich kopiert')
      } catch (err) {
        sharedMethods.showErrorNotification(
          'Oops da ist wohl was schiefgelaufen'
        )
      }

      // unselect the range
      testingCodeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    },
    getOrigins (val, update, abort) {
      sharedMethods.filterAirports(val, update, abort, this, 'originOptions')
    },
    getDestinations (val, update, abort) {
      sharedMethods.filterAirports(val, update, abort, this, 'destinationOptions')
    },
    /**
       * get the average hotel rating
       */
    hotelRatingAvg () {
      let sum = 0
      let count = 0

      this.stops.forEach((stop, index) => {
        if (stop.HotelName) {
          sum += parseInt(stop.HotelStars, 10)
          count++
        }
      })

      return sum / count
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
    getStops (RTId) {
      // get stops
      let roundtripsRef = db
        .collection('RoundtripDetails')
        .where('RTId', '==', RTId)
        .orderBy('InitDate')
      roundtripsRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          let stop = doc.data()

          if (typeof stop.InitDate !== 'string') {
            let initDate = new Date(stop.InitDate.seconds * 1000)
            stop.InitDate = date.formatDate(initDate, 'DD.MM.YYYY HH:mm')
          }

          if (!stop.DayDuration) stop.DayDuration = 0

          stop.DocId = doc.id

          this.stops.push(stop)
          this.stops.sort(this.compare)
        })
      })
    },
    /**
       * update region object witch region search results
       * @param event event from region search update callback
       */
    updateRegion (event) {
      if (event !== null) {
        this.region = event
      }
    },
    onSaveRoundtrip () {
      let dateParts = this.OfferStartPeriod.split('.')
      let offerStartPeriod = new Date(
        dateParts[2],
        dateParts[1] - 1,
        dateParts[0]
      )

      dateParts = this.OfferEndPeriod.split('.')
      let offerEndPeriod = new Date(
        dateParts[2],
        dateParts[1] - 1,
        dateParts[0]
      )

      db.collection('Roundtrips')
        .doc(this.RTId)
        .update({
          Public: this.publish,
          Location: this.countries,
          Category: this.category,
          Stars: this.stars,
          Description: this.descriptionInput,
          Highlights: [this.highlight1, this.highlight2, this.highlight3],
          Region: this.region,
          Profile: this.inputProfile,
          OfferStartPeriod: offerStartPeriod,
          OfferEndPeriod: offerEndPeriod,
          Price: this.price,
          OfferWholeYear: this.wholeYearOffer,
          Rooms: this.rooms,
          Adults: this.adults,
          ChildrenAges: this.childrenAges,
          TransportProfile: this.arrivalDepatureProfile,
          Origin: this.origin,
          Destination: this.destination,
          DepatureDate: sharedMethods.getDateFromString(this.depatureDate),
          ReturnDate: sharedMethods.getDateFromString(this.returnDate),
          TravelClass: this.travelClass,
          NonStop: this.nonStop
        })
        .catch((e) => {
          console.log(e)
          sharedMethods.showErrorNotification('Bitte überprüfe deine Angaben')
        })
    },
    /**
       * fetch trip countries and save them
       * @important don't remove or move to another file (this method is also called from stop file)
       */
    fetchAndSaveCountries () {
      let tempCountries = []
      let promiseList = []

      this.stops.forEach((stop, index) => {
        let url =
          'http://api.geonames.org/countryCodeJSON?lang=de&lat=' +
          stop.Location.lat +
          '&lng=' +
          stop.Location.lng +
          '&username=roundtrips4you'

        promiseList.push(
          axios
            .get(url)
            .then((response) => {
              if (!tempCountries.includes(response.data.countryName)) { tempCountries.push(response.data.countryName) }
            })
            .catch(function (error) {
              console.log(error)
            })
        )
      })

      Promise.all(promiseList).then((vals) => {
        this.countries = []
        this.countries = tempCountries

        // save countries
        this.saveData('Location', this.countries)
      })
    },
    /**
       * fetch all category options from firebase db
       */
    fetchCategories () {
      let roundtripsRef = db.collection('Categories')
      roundtripsRef.get().then((snapshot) => {
        this.categoryOptions = []
        snapshot.forEach((doc) => {
          this.categoryOptions.push(doc.data().Category)
        })
      })
    },
    /**
       * Quasar date options for offer period
       */
    scheduleDateOptions (date) {
      const dateTimeParts = this.OfferStartPeriod.split(' ')
      const dateParts = dateTimeParts[0].split('.')
      const compareDate = new Date(
        dateParts[2],
        dateParts[1] - 1,
        dateParts[0]
      )
      const currentDate = new Date(date)

      return currentDate > compareDate
    },
    /**
       * fetches data of the roundtrip for the given id
       * @param RTId the id of the roundtrip to fetch (current RT id)
       */
    fetchSingleRoundtrip (RTId) {
      if (this.isInDemoSession) {
        let roundtrip = this.$store.getters['demoSession/getRoundtrip']
        this.writeRoundtripIntoFields(roundtrip)
      } else {
        this.$store
          .dispatch('roundtrips/fetchSingleRoundtrip', RTId)
          .then((roundtrip) => {
            this.writeRoundtripIntoFields(roundtrip)
          })
          .catch((err) => {
            console.log('Error getting Roundtrip', err)

            // show this message only if it's not a user
            if (auth.user()) {
              sharedMethods.showErrorNotification(
                'Es gibt fehlende Angaben bei deiner Rundreise'
              )
            }
          })
      }
    },
    /**
       * Writes the current roundtrip data into local fields
       * @param roundtrip the roundtrip object that contains all data
       */
    writeRoundtripIntoFields (roundtrip) {
      this.shareLink = 'https://roundtrips4you.de/MapWidget/' + this.RTId
      this.shareCode =
        '<iframe src="https://roundtrips4you.de/MapWidget/' +
        this.RTId +
        '"></iframe>'

      this.title = roundtrip.Title
      this.publish = roundtrip.Public
      this.countries = roundtrip.Location
      this.stars = roundtrip.Stars
      this.category = roundtrip.Category
      this.descriptionInput = roundtrip.Description
      this.highlight1 = roundtrip.Highlights[0]
      this.highlight2 = roundtrip.Highlights[1]
      this.highlight3 = roundtrip.Highlights[2]
      this.inputProfile = roundtrip.Profile
      this.region = roundtrip.Region
      this.price = roundtrip.Price
      this.wholeYearOffer = roundtrip.OfferWholeYear
      this.rooms = roundtrip.Rooms
      this.adults = roundtrip.Adults
      this.children = roundtrip.ChildrenAges.length
      this.childrenAges = roundtrip.ChildrenAges

      if (roundtrip.tripWebsite) this.tripWebsite = roundtrip.tripWebsite

      this.pageTitle = this.title + ' bearbeiten'

      this.arrivalDepatureProfile = roundtrip.TransportProfile
        ? roundtrip.TransportProfile
        : 'Flugzeug'
      this.origin = roundtrip.Origin

      let retrievedDate = new Date(roundtrip.OfferEndPeriod.seconds * 1000)
      this.OfferEndPeriod = date.formatDate(retrievedDate, 'DD.MM.YYYY')

      retrievedDate = new Date(roundtrip.OfferStartPeriod.seconds * 1000)
      this.OfferStartPeriod = date.formatDate(retrievedDate, 'DD.MM.YYYY')

      if (this.arrivalDepatureProfile === 'Flugzeug') {
        this.destination = roundtrip.Destination
        this.travelClass = roundtrip.TravelClass
          ? roundtrip.TravelClass
          : 'Economy'
        this.nonStop = roundtrip.NonStop ? roundtrip.NonStop : 'Ja'
        this.originCode = roundtrip.OriginCode
        this.destinationCode = roundtrip.DestinationCode

        if (this.depatureDate && roundtrip.DepatureDate) {
          retrievedDate = new Date(roundtrip.DepatureDate.seconds * 1000)
          this.depatureDate = date.formatDate(retrievedDate, 'DD.MM.YYYY')
        } else {
          this.depatureDate = formattedScheduleDate
        }

        if (this.returnDate && roundtrip.ReturnDate) {
          retrievedDate = new Date(roundtrip.ReturnDate.seconds * 1000)
          this.returnDate = date.formatDate(retrievedDate, 'DD.MM.YYYY')
        } else {
          this.depatureDate = formattedScheduleDate
        }
      }

      // get the default profile of the roundtrip
      this.getGeneralProfile()

      this.loadInitImgs()
    },
    updateReturnDate () {
      let dateParts = this.depatureDate.split('.')
      let depatureDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
      let returnDate = depatureDate
      returnDate.setDate(depatureDate.getDate() + 1)

      this.returnDate = date.formatDate(returnDate, 'DD.MM.YYYY')
    },
    loadInitImgs () {
      var fileRef = storage
        .ref()
        .child('Images/Roundtrips/' + this.RTId + '/Title/titleImg')
      fileRef
        .getDownloadURL()
        .then(function (url) {
          context.titleImgUrl = url
        })
        .catch((e) => { })

      fileRef = storage
        .ref()
        .child('Images/Roundtrips/' + this.RTId + '/Galery')
      fileRef
        .listAll()
        .then(function (res) {
          res.items.forEach(function (itemRef) {
            fileRef = storage.ref().child(itemRef.fullPath)
            context.galeryImgUrls = []
            fileRef.getDownloadURL().then(function (url, index) {
              context.galeryImgUrls.push(url)
            })
          })
        })
        .catch(function () { })
    },
    fileAdded (event, kind) {
      let files = event
      let uploadIndex = 0

      // disable another upload
      if (kind === 'galery') this.visible = true
      else this.titleUploadDisabled = true
      this.uploadNext(files, kind, uploadIndex)

      this.$refs.titleUpload.reset()
      this.$refs.galeryUpload.reset()
    },
    uploadNext (files, kind, uploadIndex) {
      if (!this.uploading) {
        this.upload(
          files[uploadIndex],
          kind,
          uploadIndex + this.galeryImgUrls.length,
          uploadIndex === files.length - 1,
          files.length,
          uploadIndex
        ).then(function (success) {
          context.uploading = false
          uploadIndex++
          if (uploadIndex < files.length) { context.uploadNext(files, kind, uploadIndex) }
        })
      }
    },
    upload (file, kind, count, lastItem, absoluteFiles, uploadIndex) {
      this.uploading = true

      return new Promise((resolve, reject) => {
        let kindPath = 'Title/titleImg'
        if (kind === 'galery') {
          kindPath = 'Galery/galeryImg' + count
        }
        const fileRef = storage
          .ref()
          .child('Images/Roundtrips/' + this.RTId + '/' + kindPath)

        fileRef
          .put(file)
          .then(function (snapshot) {
            sharedMethods.showSuccessNotification(
              'Bild ' +
              (uploadIndex + 1) +
              ' von ' +
              absoluteFiles +
              ' wurde erfolgreich hochgeladen'
            )
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
            resolve(true)
          })
          .catch(function (error) {
            console.log(error)
            sharedMethods.showErrorNotification(
              'Das Bild konnte nicht hochgeladen werden'
            )

            context.visible = false
            context.titleUploadDisabled = false
            resolve(false)
          })
      })
    },
    /**
       * delete the current roundtrip
       */
    deleteRoundtrip () {
      if (this.RTId === null || this.RTId === '' || this.RTId === 'undefined') { return false }
      try {
        this.$store
          .dispatch('roundtrips/deleteRoundtrip', this.RTId)
          .then((success) => {
            if (success) {
              sharedMethods.showSuccessNotification('Rundreise wurde gelöscht')
              context.$router.push('/meine-rundreisen')
            } else {
              sharedMethods.showErrorNotification(
                'Die Rundreise konnte nicht gelöscht werden'
              )
            }
          })
      } catch (error) {
        console.log(error)
        sharedMethods.showErrorNotification(
          'Die Rundreise konnte nicht gelöscht werden'
        )
      }
    }
  },
  created () {
    let RTId = this.$route.params.id
    this.RTId = RTId

    context = this

    if (RTId) {
      this.getStops(RTId)
      this.fetchCategories()
      this.fetchSingleRoundtrip(RTId)
    } else {
      sharedMethods.showErrorNotification(
        'Oops die Einstellungen konnten nicht geladen werden.'
      )
      this.$router.push('/meine-rundreisen')
    }
  }
}
</script>
