<template>
  <div class="roundtrips">
    <h2 class="topic">{{selectedCountry}}: {{roundtrips.length}} Rundreise{{roundtrips.length==1?null:'n'}} gefunden</h2>
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
            lazy-rules
            :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Land']"
          >
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
            v-model="date"
            label="Zeitraum"
            class="input-item rounded-borders"
          >
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="date"
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
            @click="$router.push('/rundreisen/' + country); loadRoundtrips()"
          >Suchen</a>
        </div>
        <div class="filter-card">
          <h2>Filter</h2>
          <q-list
            bordered
            class="rounded-borders"
          >
            <q-expansion-item
              label="Preis pro Person"
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
            <q-expansion-item
              class="filter-expansion"
              default-opened
            >
              <template v-slot:header>
                <q-item-section>
                  Reiseart
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Die Art deiner Reise
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
                  Reisemerkmal
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Die Merkmale deiner Reise
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
              </template>
              <q-checkbox
                v-for="attr in roundtripAttr"
                :key="attr"
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
            <!-- <q-expansion-item
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
          </q-list>
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
          v-for="(roundtrip, index) in roundtrips"
          :key="roundtrip"
        >
          <div class="roundtrip-card">
            <div class="card-left-col">
              <q-img
                class="card-image"
                :src="TitleImgs[RTIds.indexOf(roundtrip.RTId)]"
              ></q-img>
            </div>
            <div class="card-center-col">
              <div class="card-row">
                <span class="card-category">{{roundtrip.Category}}</span>
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
                  class="marker"
                >
                </q-icon>
                <span class="country-title">{{roundtrip.Location}}</span>
              </div>
              <div class="card-row">
                <span class="card-days">{{roundtrip.Days}},</span>
                <span class="card-hotels">{{roundtrip.Hotels}} Hotel{{roundtrip.Hotels==1?null:'s'}}</span>
              </div>
              <div class="card-row">
                <p class="card-description">{{roundtrip.Description}}</p>
              </div>
              <div class="card-bottom-row">
                <q-chip size="10px">{{roundtrip.Tags[0]}}</q-chip>
                <q-chip size="10px">{{roundtrip.Tags[1]}}</q-chip>
                <q-chip size="10px">{{roundtrip.Tags[2]}}</q-chip>
              </div>
            </div>
            <div class="card-right-col">
              <div class="card-row">
                <a class="button price-button"><span>&euro;</span>{{roundtrip.Price}}<span>p.P.</span></a>
                <q-img :src="userImages[index]"></q-img>
              </div>
              <div class="card-bottom-row">
                <router-link
                  class="button details-button"
                  :to="{ path: '/rundreisen-details/' + roundtrip.RTId}"
                >Details</router-link>
                <!--<a class="button price-button"><span>&euro;</span>{{roundtrip.Price}}<span>p.P.</span></a>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
@import "../css/roundtrips.less";
</style>
<script>
import { date } from 'quasar'
import { db, storage } from '../firebaseInit'

let timeStamp = Date.now()
let formattedDate = date.formatDate(timeStamp, 'DD.MM.YYYY')

let roundtripArr = []

const stringOptions = [
  'Deutschland', 'Italien', 'Vietnam'
]

const originalRoundtripArr = []

export default {
  data () {
    return {
      date: formattedDate,
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
      countryOptions: stringOptions,
      filterRoundtripArr: [],
      TitleImgs: [],
      RTIds: [],
      userImages: [],
      maxPrice: 0
    }
  },
  name: 'Roundtrips',
  methods: {
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    dateOptions (date) {
      const dateTimeParts = formattedDate.split(' ')
      const dateParts = dateTimeParts[0].split('.')
      const compareDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
      const currentDate = new Date(date)

      return currentDate >= compareDate
    },
    filterRoundtrips () {
      this.filterRoundtripArr = []
      this.filterRoundtripArr = this.filterRoundtripArr.concat(originalRoundtripArr)
      originalRoundtripArr.forEach((roundtrip) => {
        let attrLeng = this.filteredRoundtripAttr.length
        if (attrLeng > 0) {
          if (attrLeng === 1) {
            if (!this.filteredRoundtripAttr.includes(roundtrip.Tags[1]) && !this.filteredRoundtripAttr.includes(roundtrip.Tags[2])) this.removeRoundtrip(roundtrip)
            else if (this.filteredTripKinds.length > 0 && !this.filteredTripKinds.includes(roundtrip.Tags[0])) this.removeRoundtrip(roundtrip)
            else if (this.filteredRoundtripCategories.length > 0 && !this.filteredRoundtripCategories.includes(roundtrip.Category)) this.removeRoundtrip(roundtrip)
            else if (this.step.max < Number(roundtrip.Price) || this.step.min > Number(roundtrip.Price)) this.removeRoundtrip(roundtrip)
            else console.log('nothing')
          } else if (attrLeng > 1) {
            if (!this.filteredRoundtripAttr.includes(roundtrip.Tags[1]) || !this.filteredRoundtripAttr.includes(roundtrip.Tags[2])) this.removeRoundtrip(roundtrip)
            else if (this.filteredTripKinds.length > 0 && !this.filteredTripKinds.includes(roundtrip.Tags[0])) this.removeRoundtrip(roundtrip)
            else if (this.filteredRoundtripCategories.length > 0 && !this.filteredRoundtripCategories.includes(roundtrip.Category)) this.removeRoundtrip(roundtrip)
            else if (this.step.max < Number(roundtrip.Price) || this.step.min > Number(roundtrip.Price)) this.removeRoundtrip(roundtrip)
            else console.log('nothing')
          }
        } else {
          if (this.filteredTripKinds.length > 0 && !this.filteredTripKinds.includes(roundtrip.Tags[0])) this.removeRoundtrip(roundtrip)
          else if (this.filteredRoundtripCategories.length > 0 && !this.filteredRoundtripCategories.includes(roundtrip.Category)) this.removeRoundtrip(roundtrip)
          else if (this.step.max < Number(roundtrip.Price) || this.step.min > Number(roundtrip.Price)) this.removeRoundtrip(roundtrip)
          else console.log('nothing')
        }
      })
      this.roundtrips = []
      this.roundtrips = this.roundtrips.concat(this.filterRoundtripArr)
    },
    removeRoundtrip (roundtrip) {
      this.filterRoundtripArr.splice(this.filterRoundtripArr.indexOf(roundtrip), 1)
    },
    loadUserImage (UserId) {
      let users = []
      let userRef = db.collection('User')
        .where('UserUID', '==', UserId)
        .limit(1)
      userRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            users.push(doc.data())
            return users[0].UserImage
          })
        })
    },
    loadTitleImg (docId, RTId) {
      let context = this
      storage.ref().child('Images/Roundtrips/' + docId + '/Title/titleImg').getDownloadURL().then(function (url) {
        console.log(url)
        context.TitleImgs.push(url)
        context.RTIds.push(RTId)
      })
    },
    loadRoundtrips () {
      this.selectedCountry = this.country
      this.visible = true
      this.showSimulatedReturnData = false
      roundtripArr = []
      originalRoundtripArr.length = 0
      let roundtripsRef = db.collection('Roundtrips')
        .where('Location', '==', this.country)
        .where('Public', '==', true)
        .orderBy('createdAt')
        .limit(20)
      if (this.dayModel !== null && this.dayModel.length > 0) {
        roundtripsRef = db.collection('Roundtrips')
          .where('Location', '==', this.country)
          .where('Public', '==', true)
          .where('Days', '==', this.dayModel)
          .orderBy('createdAt')
          .limit(20)
      }
      roundtripsRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            roundtripArr.push(doc.data())
            originalRoundtripArr.push(doc.data())
            this.loadTitleImg(doc.id, doc.data().RTId)
          })
          this.roundtrips = roundtripArr

          // load filter
          let price = 0
          let tripKind = []
          let roundtripAttr = []
          let category = []

          // read all posible values for filter
          roundtripArr.forEach((roundtrip) => {
            if (price < roundtrip.Price) price = roundtrip.Price
            if (!tripKind.includes(roundtrip.Tags[0])) tripKind.push(roundtrip.Tags[0])
            if (!roundtripAttr.includes(roundtrip.Tags[1])) roundtripAttr.push(roundtrip.Tags[1])
            if (!roundtripAttr.includes(roundtrip.Tags[2])) roundtripAttr.push(roundtrip.Tags[2])
            if (!category.includes(roundtrip.Category)) category.push(roundtrip.Category)

            // load userImages
            this.userImages.push(this.loadUserImage(roundtrip.UserId))
          })

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
            icon: 'fas fa-exclamation-triangle',
            message: 'Es ist ein Fehler aufgetreten, bitte versuche es erneut'
          })
        })
    }
  },
  created () {
    this.loadRoundtrips()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
