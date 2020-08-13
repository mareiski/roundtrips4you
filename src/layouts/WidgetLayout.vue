<template>
  <q-layout view="lHh Lpr lFf">
    <q-toolbar
      class="bg-secondary text-white glossery"
      style="padding-right:0;"
    >
      <q-toolbar-title style="min-width:150px;">
        <a
          :href="'https://roundtrips4you.de/rundreisen-details/' + RTId + '&' + 1590184800000"
          target="_blank"
          style="text-decoration:none; color:white;"
          class="cursor-pointer"
        >
          {{title}}
        </a>
      </q-toolbar-title>
      <span
        style="font-size:16px; padding-right:10px;"
        class="ellipsis trip-days"
      >{{hotelDays}}</span>
      <a
        href="https://roundtrips4you.de"
        target="_blank"
        style="font-size:20px; padding:10px; text-decoration:none; color:white;"
        class="cursor-pointer bg-primary ellipsis"
      >
        Roundtrips4you - dein Reiseplaner
      </a>
    </q-toolbar>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style lang="less">
@mobile: ~"only screen and (min-width: 0px) and (max-width: 719px)";

@media @mobile {
  .trip-days {
    display: none;
  }
}
</style>
<script>
import { db } from '../firebaseInit.js'

let roundtrip = []

export default {
  name: 'WidgetLayout',
  data () {
    return {
      RTId: null,
      currentTimeMillis: Date.now(),
      title: null,
      hotelDays: null
    }
  },
  methods: {
    loadSingleRoundtrip (RTId) {
      let roundtripsRef = db.collection('Roundtrips')
        .where('RTId', '==', RTId)
        .limit(1)
      roundtripsRef.get()
        .then(snapshot => {
          roundtrip = []
          snapshot.forEach(doc => {
            roundtrip.push(doc.data())
          })
          this.title = roundtrip[0].Title
          this.hotelDays = roundtrip[0].Days + '/' + roundtrip[0].Hotels + ' Hotels'
        })
        .catch(err => {
          console.log('Error getting Roundtrip', err)
        })
    }
  },
  created () {
    this.RTId = this.$route.params.id
    this.loadSingleRoundtrip(this.RTId)
  }
}
</script>
