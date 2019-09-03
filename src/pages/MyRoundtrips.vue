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
            <img :src="roundtrip.TitleImg">
          </q-avatar>
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
import { db, auth, storage } from '../firebaseInit'
import { date } from 'quasar'

let uid = auth.user().uid
let createdAtDatesArr = []
let roundtripCount = 0
let roundtripDocIds = []

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
            roundtripDocIds.push(doc.id)
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
    },
    loadTitleImgs () {
      const context = this
      let urlCount = 0
      roundtripDocIds.forEach((docId) => {
        var fileRef = storage.ref().child('Images/Roundtrips/' + docId + '/Title/titleImg')
        fileRef.getDownloadURL().then(function (url) {
          context.roundtrips[urlCount].TitleImg = url
          console.log(url)
          urlCount++
        })
      })
    }
  },
  created () {
    this.getUserRoundtrips()
    this.loadTitleImgs()
  }
}
</script>
