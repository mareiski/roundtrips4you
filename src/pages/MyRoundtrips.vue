<template>
  <div class="my-roundtrips">
    <q-list
      bordered
      padding
      class="rounded-borders"
    >
      <q-item
        clickable
        @click="$router.push('rundreise-bearbeiten')"
        v-ripple
        v-for="roundtrip in roundtrips"
        :key="roundtrip"
      >

        <q-item-section
          avatar
          top
        >
          <q-avatar
            icon="location_on"
            color="primary"
            text-color="white"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{roundtrip.Title}}</q-item-label>
          <q-item-label caption>
            {{getCreatedAtDate()}}
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
  </div>
</template>
<style lang="less">
@import "../css/my-roundtrips.less";
</style>
<script>
import { db, auth } from '../firebaseInit'
import { date } from 'quasar'

let uid = auth.user().uid
let createdAtDatesArr = []
let roundtripCount = 0

export default {
  name: 'myRoundtrips',
  data () {
    return {
      roundtrips: []
    }
  },
  methods: {
    getUserRoundtrips () {
      let roundtripArr = []
      let roundtripsRef = db.collection('Roundtrips')
        .where('UserId', '==', uid)
        .orderBy('createdAt')
        .limit(20)
      roundtripsRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            roundtripArr.push(doc.data())
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
