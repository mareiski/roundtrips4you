<template>
  <div class="my-roundtrips  q-px-lg q-pb-md">
    <h3 id="Title">Meine Rundreisen</h3>
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
          <q-item-label lines="2">Du hast leider noch keine Rundreisen erstellt. <br>
            Klicke einfach auf den Button unten um deine erste Rundreise zu erstellen.</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        @click="$router.push('rundreise-bearbeiten/' + roundtrip.RTId)"
        v-ripple
        v-for="(roundtrip, index) in roundtrips"
        :key="roundtrip"
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
          <q-item-label lines="1">{{roundtrip.Title}} - {{roundtrip.Location}}</q-item-label>
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
    </q-list>
    <q-list
      bordered
      class="rounded-borders"
      v-if="roundtrips.length < 20"
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
            >
              <div>
                <q-input
                  v-model="title"
                  :rules="[val => val !== null &&  val !== ''  || 'Bitte gib einen Titel an', val => isUniqueTitle(val), val =>  val.indexOf(' ') === -1 || 'Der Titel darf keine Leerzeichen enthalten']"
                  label="Titel"
                  outlined
                  ref="titleInput"
                  style="margin:auto; margin-top:20px;"
                >
                  <template v-slot:prepend>
                    <q-icon name="title" />
                  </template>
                </q-input>
                <q-select
                  @filter="filterFn"
                  outlined
                  v-model="selectedOption"
                  :options="countryOptions"
                  label="Land"
                  clearable
                  class="input-item"
                  use-input
                  ref="countrySelect"
                  style="margin:auto; margin-top:10px;"
                  :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Land']"
                >
                  <template v-slot:prepend>
                    <q-icon name="explore" />
                  </template>
                </q-select>
                <span
                  class="flex justify-center"
                  style="text-align:center;"
                >Bitte gib hier deinen Startort ein. <br> (Du kannst diesen später bearbeiten)</span>
                <CitySearch
                  class="flex justify-center"
                  style="margin:auto; margin-top:10px;"
                  ref="citySearch"
                  :parkingPlaceSearch="false"
                  :defaultLocation="null"
                  @update="updateLocation($event)"
                ></CitySearch>
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
                <div>
                  <q-btn
                    round
                    color="primary"
                    icon="add"
                    type="submit"
                  >
                    <q-tooltip>
                      Rundreise hinzufügen
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>
<style lang="less">
@import "../css/my-roundtrips.less";
</style>
<script>
import { db, auth, storage } from '../firebaseInit'
import { date, scroll } from 'quasar'
import { countries } from '../countries'
import CitySearch from './Map/CitySearch'

let uid = null
let roundtripDocIds = []
let roundtripArr = []

const { getScrollTarget, setScrollPosition } = scroll

export default {
  name: 'myRoundtrips',
  components: {
    CitySearch
  },
  data () {
    return {
      roundtrips: [],
      TitleImgs: [],
      title: '',
      addExpanded: false,
      addButtonActive: false,
      selectedOption: null,
      countryOptions: countries,
      RTIds: [],
      showNoRoundtripsText: false,
      tempLocation: {},
      rooms: 1,
      adults: 1,
      children: 0,
      childrenAges: []
    }
  },
  methods: {
    onAddRoundtrip () {
      if (this.roundtrips.length < 20) {
        this.addExpanded = false
        this.addButtonActive = false
        this.showNoRoundtripsText = false

        if (this.addRoundtrip(this.title, this.selectedOption)) {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Rundreise wurde erstellt'
          })
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Du kannst momentan leider nur maximal 20 Rundreisen erstellen'
          })
        }
      }
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
    addRoundtrip (Title, Location) {
      Title = Title.toLowerCase()
      Title = Title.charAt(0).toUpperCase() + Title.slice(1)
      Title = Title.replace(/ /g, '')

      try {
        let timeStamp = Date.now()
        let tempRTId = Math.floor(Math.random() * 10000000000000)
        db.collection('Roundtrips').add({
          Category: 'Gruppenreise',
          Days: '< 5 Tage',
          Description: 'Kurze Beschreibung deiner Rundreise',
          Hotels: '0',
          Location: Location,
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
              db.collection('RoundtripDetails').add({
                BookingComLink: '',
                DateDistance: '',
                Description: 'Beschreibung dieses Stopps',
                ExpediaLink: '',
                GeneralLink: '',
                HotelStop: false,
                ImageUrl: '',
                InitDate: new Date(timeStamp),
                Price: 0,
                RTId: doc.id,
                Title: 'Titel des 1. Stopps',
                Location: this.tempLocation ? this.tempLocation : {
                  lng: '13.3888599',
                  lat: '52.5170365',
                  label: 'Berlin, 10117, Germany'
                }
              })
              this.getUserRoundtrips()
              this.$router.push('/rundreise-bearbeiten/' + doc.id)
            })
          })
        this.title = ''
        this.selectedOption = null
        this.$refs.titleInput.resetValidation()
        this.$refs.countrySelect.resetValidation()
        this.$refs.citySearch.clear()
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
      roundtripArr = []
      roundtripDocIds = []

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
        }).catch(function (error) {
          console.log(error)
        })

      this.roundtrips = roundtripArr
    },
    updateLocation (event) {
      if (event !== null) {
        this.tempLocation = {
          lng: event.x,
          lat: event.y,
          label: event.label
        }
      }
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
            resolve(snapshot.size === 0 || 'Dieser Titel ist bereits vergeben')
          })
      })
    },
    getCreatedAtDate (timeStamp) {
      return date.formatDate(new Date(timeStamp.seconds * 1000), 'DD.MM.YYYY')
    },
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = countries.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    isUniqueTitel (value) {
      return new Promise((resolve, reject) => {
        value = value.charAt(0).toUpperCase() + value.slice(1)
        value = value.replace(/ /g, '')
        let roundtripsRef = db.collection('Roundtrips')
          .where('Title', '==', value)
          .limit(1)
        roundtripsRef.get()
          .then(snapshot => {
            resolve(snapshot.size === 0 || 'Dieser Titel ist bereits vergeben')
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
