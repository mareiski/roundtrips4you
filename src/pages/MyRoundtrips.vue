<template>
  <div class="my-roundtrips">
    <q-list
      bordered
      padding
      class="rounded-borders"
    >
      <q-item
        clickable
        @click="$router.push('rundreise-bearbeiten/' + roundtrip.RTId)"
        v-ripple
        v-for="roundtrip in roundtrips"
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
            <img :src="TitleImgs[RTIds.indexOf(roundtrip.RTId)]">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{roundtrip.Title}}</q-item-label>
          <q-item-label caption>
            {{ getCreatedAtDate() }}
            <q-tooltip>
              Diese Rundreise wurde am {{getCreatedAtDate()}} erstellt
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
              @submit="onAddRoundtrip"
              class="q-gutter-md"
            >
              <q-input
                v-model="title"
                lazy-rules
                :rules="[val => val !== null && val !== '' || 'Bitte gib einen Titel an']"
                label="Titel"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="title" />
                </template>
              </q-input>
              <q-select
                outlined
                v-model="selectedOption"
                :options="countryOptions"
                label="Land"
                clearable
                class="input-item"
                lazy-rules
                use-input
                :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Land']"
              >
                <template v-slot:prepend>
                  <q-icon name="location_on" />
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
                    Rundreise hinzufügen
                  </q-tooltip>
                </q-btn>
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
import { date } from 'quasar'

let uid = auth.user().uid
let createdAtDatesArr = []
let roundtripCount = 0
let roundtripDocIds = []
let roundtripArr = []

export default {
  name: 'myRoundtrips',
  data () {
    return {
      roundtrips: [],
      TitleImgs: [],
      title: '',
      addExpanded: false,
      addButtonActive: false,
      selectedOption: null,
      countryOptions: ['Deutschland', 'Italien', 'Vietnam'],
      RTIds: []
    }
  },
  methods: {
    onAddRoundtrip () {
      this.addExpanded = false
      this.addButtonActive = false

      if (this.addRoundtrip(this.title, this.selectedOption)) {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Rundreise wurde erstellt'
        })
      }
    },
    addRoundtrip (Title, Location) {
      try {
        let timeStamp = Date.now()
        db.collection('Roundtrips').add({
          Category: 'Kategorie',
          Days: '< 5 Tage',
          Description: 'Kurze Beschreibung deiner Rundreise',
          Hotels: '1',
          ImageGalery: [],
          Location: Location,
          Price: 0,
          Public: false,
          RTId: 3445340985430,
          Stars: 0,
          Tags: ['Tag1', 'Tag2', 'Tag3'],
          Title: Title,
          UserId: this.$store.getters['user/user'].uid,
          createdAt: new Date(timeStamp)
        })
        let roundtripsRef = db.collection('Roundtrips')
          .where('RTId', '==', 3445340985430)
          .limit(1)
        roundtripsRef.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              db.collection('Roundtrips').doc(doc.id).update({
                'RTId': doc.id
              })
              this.getUserRoundtrips()
            })
          })
      } catch (error) {
        console.log(error)
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
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
            roundtripDocIds.push(doc.id)

            var fileRef = storage.ref().child('Images/Roundtrips/' + doc.id + '/Title/titleImg')
            fileRef.getDownloadURL().then(function (url) {
              context.TitleImgs.push(url)
              context.RTIds.push(doc.data().RTId)
            })
          })
        })
      roundtripArr.forEach((roundtrip) => {
        createdAtDatesArr.push(date.formatDate(roundtrip.createdAt, 'YYYY/MM/DD'))
      })

      this.roundtrips = roundtripArr
    },
    getCreatedAtDate () {
      let returnValue = createdAtDatesArr[roundtripCount]
      roundtripCount++
      return returnValue
    }
  },
  created () {
    this.getUserRoundtrips()
  }
}
</script>
