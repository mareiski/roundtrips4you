<template>
  <div class="roundtrips">
    <div class="topic flex justify-center">
      <div style="display: flex;
    flex-direction: column;
    justify-content: center;">
        <router-link
          to="/rundreisen-uebersicht"
          style="text-decoration:none;"
        >
          <q-icon name="keyboard_arrow_left"></q-icon>
          zurück zu allen Ländern
        </router-link>
      </div>
      <h2>{{selectedCountry}}: {{roundtripCount}} Rundreise{{ roundtripCount === 1 ? null : 'n'}} gefunden</h2>
      <q-select
        outlined
        v-model="sort"
        input-debounce="0"
        :options="sortOptions"
        label="Sortieren"
        style="padding:0 10px 0 0"
        @input="sortRoundtrips($event)"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-select>
    </div>
    <div id="CardBackgroundImg"></div>
    <div id="RoundtripCardBackgroundImgPlaceholder">
      <div class="filter-container">
        <div class="filter-card">
          <h2>Suche</h2>
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
            v-model="OfferPeriod"
            label="Zeitraum"
            class="input-item rounded-borders"
            style="padding-bottom:20px;"
          >
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="OfferPeriod"
                today-btn
                mask="DD.MM.YYYY"
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
            v-model="dayModel"
            :options="dayOptions"
            label="Reisedauer"
            clearable
            class="input-item"
          >
            <template v-slot:prepend>
              <q-icon name="access_time" />
            </template>
          </q-select>
          <a
            class="button"
            @click="$router.push('/rundreisen/' + country); getRoundtrips(true); getRTCount()"
          >Suchen</a>
        </div>
        <div class="filter-card">
          <q-expansion-item
            label="Filter"
            bordered
            v-model="isNotMobile"
            class="rounded-borders filter-expansion-label"
          >
            <q-expansion-item
              label="Gesamtpreis pro Person"
              class="filter-expansion"
              default-opened
            >
              <q-range
                v-model="step"
                :min="0"
                :max="maxPrice"
                :step="10"
                :left-label-value="step.min + ' €'"
                :right-label-value="step.max + ' €'"
                label
                color="deep-orange"
                @input="filterRoundtrips()"
              />
              <p>
                Preis ab {{ step.min }} € bis {{ step.max }} €
              </p>
            </q-expansion-item>
            <!--<q-expansion-item
              class="filter-expansion"
              default-opened
            >
              <template v-slot:header>
                <q-item-section>
                  Region
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Die Region in der deine Reise stattfindet
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
              </template>
               <q-checkbox
                v-for="region in tripKind"
                :key="kind"
                :label="kind"
                v-model="filteredTripKinds"
                :val="kind"
                color="dark-orange"
                @input="filterRoundtrips()"
              />
            </q-expansion-item>-->
            <q-expansion-item
              class="filter-expansion"
              default-opened
            >
              <template v-slot:header>
                <q-item-section>
                  Reisemittel
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Das Reisemittel auf deiner Reise
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
              </template>
              <q-checkbox
                v-for="kind in tripKind"
                :key="kind"
                :label="kind"
                v-model="filteredTripKinds"
                :val="kind"
                color="dark-orange"
                @input="filterRoundtrips()"
              />
            </q-expansion-item>
            <q-expansion-item
              class="filter-expansion"
              default-opened
            >
              <template v-slot:header>
                <q-item-section>
                  Highlights
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Die Highlights deiner Reise
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
              </template>
              <q-checkbox
                v-for="(attr, index) in roundtripAttr"
                :key="index"
                :label="attr"
                v-model="filteredRoundtripAttr"
                :val="attr"
                color="dark-orange"
                @input="filterRoundtrips()"
              />
            </q-expansion-item>
            <q-expansion-item
              class="filter-expansion"
              default-opened
            >
              <template v-slot:header>
                <q-item-section>
                  Reisekategorie
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Die Kategorie der Reise
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
              </template>
              <q-checkbox
                v-for="category in roundtripCategories"
                :key="category"
                :label="category"
                v-model="filteredRoundtripCategories"
                :val="category"
                color="dark-orange"
                @input="filterRoundtrips()"
              />
            </q-expansion-item>
            <!--<q-expansion-item
              class="filter-expansion"
              default-opened
            >
              <template v-slot:header>
                <q-item-section>
                  Sehenswürdigkeiten
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Die Sehenswürdigkeiten auf deiner Reise
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
              </template>
              <q-checkbox
                label="Gruppenreise"
                v-model="orange"
                color="dark-orange"
              />
              <q-checkbox
                label="Gruppenreise"
                v-model="orange"
                color="dark-orange"
              />
            </q-expansion-item>
            <q-expansion-item
              class="filter-expansion"
              default-opened
            >
              <template v-slot:header>
                <q-item-section>
                  Veranstalter
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Der Veranstalter für deine Reise
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
              </template>
              <q-checkbox
                label="Gruppenreise"
                v-model="orange"
                color="dark-orange"
              />
              <q-checkbox
                label="Gruppenreise"
                v-model="orange"
                color="dark-orange"
              />
            </q-expansion-item>-->
          </q-expansion-item>
        </div>
      </div>
      <div
        class="roundtrip-cards-container"
        style="position: relative;"
      >
        <q-inner-loading :showing="visible">
          <q-spinner
            size="50px"
            color="primary"
          />
        </q-inner-loading>
        <div
          class="roundtrip-card-container"
          v-if="!visible && roundtripCount === 0"
        >
          <router-link
            class="roundtrip-card"
            :to="user ? { path: '/meine-rundreisen'} : { path: '/login'}"
          >
            <div
              class="card-center-col"
              style="justify-content:flex-start; width:auto;"
            >
              <div class="card-row">
                <div class="no-rt-title flex">
                  <q-icon name="warning" />
                  <span>Es wurden leider keine Rundreisen für {{selectedCountry}} gefunden</span>
                </div>
              </div>
              <div class="card-row">
                <span style="font-size:18px; padding-top:35px;">Aber das macht nichts, ertelle einfach selbst deine eigene Rundreise für {{selectedCountry}}</span>
              </div>
            </div>
            <div
              class="card-right-col"
              style="width:auto; justify-content:flex-end; min-width:190px;"
            >
              <div class="card-bottom-row">
                <router-link
                  class="button details-button"
                  :to="user ? { path: '/meine-rundreisen'} : { path: '/login'}"
                >Jetzt erstellen</router-link>
              </div>
            </div>
          </router-link>
        </div>
        <div
          class="roundtrip-card-container"
          v-for="roundtrip in roundtrips"
          :key="roundtrip.RTId"
        >
          <div
            class="edit-btn-container"
            v-if="user === null || user.uid !== roundtrip.UserId"
          >
            <q-btn
              round
              color="primary"
              icon="edit"
              @click="user ? editRTDialog = true : $router.push('/login')"
            >
              <q-tooltip>Diese Rundreise bearbeiten</q-tooltip>
            </q-btn>
            <q-dialog
              v-model="editRTDialog"
              persistent
            >
              <q-card style="min-width: 350px">
                <q-card-section>
                  <div class="text-h6">Rundreise bearbeiten</div>
                  <span>Diese Rundreise wird zu deinen eigenen Reisen hinzugefügt, damit du sie bearbeiten kannst. Bitte gib dafür den Titel der Rundreise ein.</span>
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
          <router-link
            class="roundtrip-card"
            :to="{ path: '/rundreisen-details/' + roundtrip.RTId + '&' + getParamsDate(OfferPeriod)}"
          >
            <div class="card-left-col">
              <q-img
                :alt="'Titelbild der Rundreise ' + roundtrip.Title"
                class="card-image"
                :src="TitleImgs[RTIds.indexOf(roundtrip.RTId)]"
              ></q-img>
            </div>
            <div class="card-center-col">
              <div
                class="card-row"
                style="height: 50px;"
              >
                <span
                  class="card-category"
                  style="font-size:13px;"
                >{{roundtrip.Category}}</span>
                <h2 class="country-title">{{roundtrip.Title}}</h2>
              </div>
              <div class="card-row">
                <q-rating
                  class="stars"
                  v-model="roundtrip.Stars"
                  size="15px"
                  color="gold"
                  readonly
                />
                <q-icon
                  name="location_on"
                  class="card-icon"
                >
                </q-icon>
                <span class="country-title">{{Array.isArray(roundtrip.Location) ? getLocationString(roundtrip.Location): roundtrip.Location}}{{ roundtrip.Region && typeof roundtrip.Region !== 'undefined' ? ', ' + roundtrip.Region : null}}</span>
              </div>
              <div class="card-row">
                <q-icon
                  class="card-icon"
                  name="commute"
                ></q-icon>
                <span>{{roundtrip.Profile}}</span>
              </div>
              <div class="card-row">
                <span class="card-days">{{roundtrip.Days}},</span>
                <span class="card-hotels">{{roundtrip.Hotels}} Hotel{{roundtrip.Hotels==1?null:'s'}}</span>
              </div>
              <div class="card-row description">
                <p class="card-description">{{roundtrip.Description}}</p>
              </div>
              <div
                class="card-bottom-row"
                style="padding-top:5px;"
              >
                <q-chip>{{roundtrip.Highlights[0]}}</q-chip>
                <q-chip>{{roundtrip.Highlights[1]}}</q-chip>
                <q-chip>{{roundtrip.Highlights[2]}}</q-chip>
              </div>
            </div>
            <div class="card-right-col">
              <div class="card-row">
                <a class="button price-button">
                  <span>&euro;</span>{{roundtrip.Price}}<span>p.P.</span>
                  <q-tooltip>Schätzwert des Reisenden, ohne Freizeitgestaltung</q-tooltip>
                </a>
                <router-link :to="'/benutzerprofil/' + roundtrip.UserId">
                  <q-avatar
                    size="50px"
                    style="width: 50px; margin:auto 10px auto 10px; padding-top:0;"
                  >
                    <q-img :src="userImages[RTIds.indexOf(roundtrip.RTId)]"></q-img>
                    <q-tooltip v-if="userNames[RTIds.indexOf(roundtrip.RTId)]">von {{userNames[RTIds.indexOf(roundtrip.RTId)]}}</q-tooltip>
                  </q-avatar>
                </router-link>
              </div>
              <div class="card-bottom-row">
                <router-link
                  class="button details-button"
                  :to="{ path: '/rundreisen-details/' + roundtrip.RTId + '&' + getParamsDate(OfferPeriod)}"
                >Details</router-link>
                <!--<a class="button price-button"><span>&euro;</span>{{roundtrip.Price}}<span>p.P.</span></a>-->
              </div>
            </div>
          </router-link>
        </div>
        <ins
          class="bookingaff"
          data-aid="1931644"
          data-target_aid="1931644"
          data-prod="banner"
          data-width="728"
          data-height="90"
          data-lang="de"
        >
          <!-- Anything inside will go away once widget is loaded. -->
          <a href="//www.booking.com?aid=1931644"></a>
        </ins>
        <div
          class="flex justify-center"
          style="padding-bottom:15px;"
        >
          <q-pagination
            class="pagination"
            v-if="paginationMax > 1"
            v-model="currentPage"
            color="primary"
            :max="paginationMax"
            :max-pages="6"
            :boundary-numbers="true"
            @input="getRoundtrips(false)"
          >
          </q-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import(/* webpackPrefetch: true */ '../css/roundtrips.less')
import { date } from 'quasar'
import { db, storage } from '../firebaseInit.js'
import { countries } from '../countries'

let timeStamp = Date.now()
let formattedDate = date.formatDate(timeStamp, 'DD.MM.YYYY')

let roundtripArr = []

const originalRoundtripArr = []
let createdAts = []

export default {
  meta () {
    return {
      title: 'Reisen für ' + this.$route.params.country,
      meta: {
        description: { name: 'description', content: 'Rundreise ' + this.$route.params.country + '. Routen und Tipps zu ' + this.$route.params.country + ' auf Roundtrips4you, dein Reiseplaner und Routenplaner' }
      }
    }
  },
  data () {
    return {
      OfferPeriod: formattedDate,
      country: this.$route.params.country,
      selectedCountry: '',
      dayModel: null,
      orange: false,
      visible: false,
      showSimulatedReturnData: false,
      dayOptions: [
        '< 5 Tage', '5-8 Tage', '9-11 Tage', '12-15 Tage', '> 15 Tage'
      ],
      step: {
        min: 0,
        max: 330
      },
      filteredRoundtripAttr: [],
      roundtripAttr: [],
      filteredTripKinds: [],
      tripKind: [],
      roundtripCategories: [],
      filteredRoundtripCategories: [],
      roundtrips: [],
      countryOptions: countries,
      filterRoundtripArr: [],
      TitleImgs: [],
      RTIds: [],
      maxPrice: 0,
      currentPage: 1,
      paginationMax: 1,
      roundtripCount: 0,
      sort: 'Erstellungsdatum',
      sortOptions: [
        'Preis aufsteigend', 'Preis absteigend', 'Hotelbewertung aufsteigend', 'Hotelbewertung absteigend', 'Erstellungsdatum'
      ],
      // 'Reisedauer aufsteigend', 'Reisedauer absteigend' missing in sort opt
      title: null,
      editRTDialog: false,
      disableEditBtn: true,
      userImages: [],
      userNames: []
    }
  },
  name: 'Roundtrips',
  computed: {
    user () {
      return this.$store.getters['user/user']
    },
    isNotMobile () {
      return !window.matchMedia('(max-width: 550px)').matches
    }
  },
  methods: {
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = countries.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    dateOptions (date) {
      const dateTimeParts = formattedDate.split(' ')
      const dateParts = dateTimeParts[0].split('.')
      const compareDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
      const currentDate = new Date(date)

      return currentDate >= compareDate
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
          }).catch(function (error) {
            console.log('Error ' + error)
            resolve(null)
          })
      })
    },
    checkDisableEditBtn (val) {
      this.isUniqueTitle(val).then(uniqueTitle => {
        if (uniqueTitle === 'Dieser Titel ist bereits vergeben') uniqueTitle = false
        this.disableEditBtn = val === null || val === '' || !uniqueTitle
      })
    },
    filterRoundtrips () {
      this.filterRoundtripArr = []
      this.roundtrips = []

      this.selectedCountry = this.country
      this.visible = true
      this.showSimulatedReturnData = false
      originalRoundtripArr.length = 0

      let dateParts = this.OfferPeriod.split('.')
      let offerPeriod = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], '00', '00', '00')

      let searchCreatedAt = createdAts[this.currentPage * 20 - 20]
      if (typeof searchCreatedAt === 'undefined' || searchCreatedAt === null) searchCreatedAt = 0

      let roundtripsRef = db.collection('Roundtrips')
        .where('Location', 'array-contains', this.country)
        .where('Public', '==', true)

      if (this.dayModel !== null && this.dayModel.length > 0) roundtripsRef = roundtripsRef.where('Days', '==', this.dayModel)

      if (this.filteredRoundtripAttr.length > 0) roundtripsRef = roundtripsRef.where('Highlights', 'array-contains-any', this.filteredRoundtripAttr)

      this.filteredTripKinds.forEach(profile => {
        roundtripsRef = roundtripsRef.where('Profile', '==', profile)
      })

      this.filteredRoundtripCategories.forEach(cat => {
        roundtripsRef = roundtripsRef.where('Category', '==', cat)
      })

      roundtripsRef = roundtripsRef.orderBy('createdAt')
      roundtripsRef = roundtripsRef.startAt(searchCreatedAt).limit(20)

      roundtripsRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().OfferWholeYear || (this.OfferPeriod !== null && this.OfferPeriod.length > 0 && doc.data().OfferStartPeriod.seconds * 1000 <= offerPeriod.getTime() && doc.data().OfferEndPeriod.seconds * 1000 >= offerPeriod.getTime())) {
              let roundtrip = doc.data()
              let isInPriceRange = this.step.max >= Number(roundtrip.Price) && this.step.min <= Number(roundtrip.Price)
              let isInFilter = this.includesArray(roundtrip.Highlights, this.filteredRoundtripAttr)

              if (isInFilter && isInPriceRange) this.filterRoundtripArr.push(roundtrip)
            }
          })

          this.roundtrips = []
          this.roundtrips = this.roundtrips.concat(this.filterRoundtripArr)
          this.roundtripCount = this.roundtrips.length

          this.visible = false
          this.showSimulatedReturnData = true
        })
    },
    includesArray (array1, array2) {
      if (array1.lenght === 0 || array2.length === 0) return true
      let returnVal = true
      array2.forEach(element => {
        if (!array1.includes(element)) returnVal = false
      })
      return returnVal
    },
    removeRoundtrip (roundtrip) {
      this.filterRoundtripArr.splice(this.filterRoundtripArr.indexOf(roundtrip), 1)
    },
    loadUserData (UserId) {
      let users = []
      let context = this
      let userRef = db.collection('User')
        .where('UserUID', '==', UserId)
        .limit(1)
      userRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            users.push(doc.data())
            context.userNames.push(users[0].UserName)
            context.userImages.push(users[0].UserImage)
          })
        })
    },
    loadTitleImg (docId, RTId) {
      let context = this
      storage.ref().child('Images/Roundtrips/' + docId + '/Title/titleImg').getDownloadURL().then(function (url) {
        context.TitleImgs.push(url)
        context.RTIds.push(RTId)
      })
    },
    getRoundtrips (initialLoad) {
      this.selectedCountry = this.country
      this.visible = true
      this.showSimulatedReturnData = false
      roundtripArr = []
      originalRoundtripArr.length = 0

      let dateParts = this.OfferPeriod.split('.')
      let offerPeriod = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], '00', '00', '00')

      let searchCreatedAt = createdAts[(this.currentPage * 20) - 20]
      if (typeof searchCreatedAt === 'undefined' || searchCreatedAt === null) searchCreatedAt = 0

      if (initialLoad) {
        searchCreatedAt = 0
      }

      let roundtripsRef = db.collection('Roundtrips')
        .where('Location', 'array-contains', this.country)
        .where('Public', '==', true)
        .orderBy('createdAt')
        .startAt(searchCreatedAt)
        .limit(20)

      if (this.dayModel !== null && this.dayModel.length > 0) {
        roundtripsRef = db.collection('Roundtrips')
          .where('Location', 'array-contains', this.country)
          .where('Public', '==', true)
          .where('Days', '==', this.dayModel)
          .orderBy('createdAt')
          .startAt(searchCreatedAt)
          .limit(20)
      }

      // reset filer
      this.filteredRoundtripAttr = []
      this.filteredTripKinds = []
      this.filteredRoundtripCategories = []

      // filter vars
      let price = 0
      let tripKind = []
      let roundtripAttr = []
      let category = []

      roundtripsRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().OfferWholeYear || (this.OfferPeriod !== null && this.OfferPeriod.length > 0 && doc.data().OfferStartPeriod.seconds * 1000 <= offerPeriod.getTime() && doc.data().OfferEndPeriod.seconds * 1000 >= offerPeriod.getTime())) {
              originalRoundtripArr.push(doc.data())
              originalRoundtripArr.reverse()
              this.loadTitleImg(doc.id, doc.data().RTId)

              // load user data
              this.loadUserData(doc.data().UserId)

              roundtripArr.push(doc.data())
              roundtripArr.reverse()
            }
          })

          // read all posible values for filter
          roundtripArr.forEach((roundtrip, index) => {
            if (price < parseInt(roundtrip.Price)) price = parseInt(roundtrip.Price)
            if (!tripKind.includes(roundtrip.Profile)) tripKind.push(roundtrip.Profile)
            if (!roundtripAttr.includes(roundtrip.Highlights[1])) roundtripAttr.push(roundtrip.Highlights[0])
            if (!roundtripAttr.includes(roundtrip.Highlights[1])) roundtripAttr.push(roundtrip.Highlights[1])
            if (!roundtripAttr.includes(roundtrip.Highlights[2])) roundtripAttr.push(roundtrip.Highlights[2])
            if (!category.includes(roundtrip.Category)) category.push(roundtrip.Category)
          })

          this.roundtrips = roundtripArr
          this.step.max = price
          this.maxPrice = price

          this.tripKind = tripKind
          this.roundtripAttr = roundtripAttr
          this.roundtripCategories = category

          this.visible = false
          this.showSimulatedReturnData = true
        })
        .catch(err => {
          console.log('Error getting Roundtrips', err)
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Es ist ein Fehler aufgetreten, bitte versuche es erneut'
          })
        })
    },
    getParamsDate (dateString) {
      let dateParts = dateString.split('.')
      return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], '00', '00', '00').getTime()
    },
    getRTCount () {
      const counterRef = db.collection('Roundtrips')
        .where('Location', 'array-contains', this.country)
        .where('Public', '==', true)
        .orderBy('createdAt')

      this.roundtripCount = 0

      counterRef.get().then(snapshot => {
        this.paginationMax = Math.ceil(snapshot.docs.length / 20)
        snapshot.forEach(doc => {
          this.roundtripCount++
          createdAts.push(doc.data().createdAt)
        })
      })
    },
    sortRoundtrips (value) {
      switch (value) {
        case 'Preis aufsteigend':
          this.roundtrips.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price))
          break
        case 'Preis absteigend':
          this.roundtrips.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price))
          break
        case 'Hotelbewertung aufsteigend':
          this.roundtrips.sort((a, b) => parseFloat(a.Stars) - parseFloat(b.Stars))
          break
        case 'Hotelbewertung absteigend':
          this.roundtrips.sort((a, b) => parseFloat(b.Stars) - parseFloat(a.Stars))
          break
        case 'Reisedauer aufsteigend':
          this.roundtrips.sort((a, b) => parseFloat(a.Days) - parseFloat(b.Days))
          break
        case 'Reisedauer absteigend':
          this.roundtrips.sort((a, b) => parseFloat(b.Days) - parseFloat(a.Days))
          break
        case 'Erstellungsdatum':
          this.roundtrips = []
          this.roundtrips = this.roundtrips.concat(originalRoundtripArr)
          break
      }
    },
    getLocationString (locations) {
      let locationString = ''
      locations.forEach((location, index) => {
        locationString = locationString + (index !== 0 ? ', ' : '') + location
      })
      return locationString
    },
    loadBookingComWidget () {
      (function (d, sc, u) {
        var s = d.createElement(sc), p = d.getElementsByTagName(sc)[0]
        s.type = 'text/javascript'
        s.async = true
        s.src = u + '?v=' + (+new Date())
        p.parentNode.insertBefore(s, p)
      })(document, 'script', '//aff.bstatic.com/static/affiliate_base/js/flexiproduct.js')
    }
  },
  created () {
    this.currentPage = 1
    this.getRoundtrips(true)
    this.getRTCount()
    // this.loadBookingComWidget()
  },
  mounted () {
    // this.loadBookingComWidget()
  }
}
</script>
