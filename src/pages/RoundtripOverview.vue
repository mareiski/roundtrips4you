<template>
  <q-page>
    <div class="roundtrips">
      <div class="overview-topic">
        <h1>Eigene Reise erstellen</h1>
        <span>Beginne damit deine eigene Reise nach deinen Wünschen zusammenzutellen</span>
      </div>
      <div id="CardBackgroundImg"></div>
      <div
        id="CardBackgroundImgPlaceholder"
        style="height:515px; min-height:unset;"
      >
        <div class="country-card-container">
          <router-link
            class="country-card"
            to="/meine-rundreisen/"
            :style="{ backgroundImage: 'url(https://roundtrips4you.de/statics/oldCard.jpg)' }"
          >
            <h2 class="country-title">Meine Reisen</h2>
            <div class="button">Zu meinen Reisen
            </div>
          </router-link>
        </div>
      </div>
      <div class="overview-topic">
        <h2>Vorgefertigte Reisen</h2>
        <span>Lasse dich hier von den Reisen anderer User inspirieren, oder bearbeite diese wenn du für dich etwas ändern möchtest</span>
      </div>
      <div id="CardBackgroundImg"></div>
      <div id="CardBackgroundImgPlaceholder">
        <div
          class="country-card-container"
          v-for="country in countries"
          :key="country.Name"
        >
          <router-link
            class="country-card"
            :to="'/rundreisen/' + country.Name"
            :style="{ backgroundImage: 'url('+ country.ImageUrl +')' }"
          >
            <h2 class="country-title">{{country.Name}}</h2>
            <div
              class="button"
              :to="'/rundreisen/' + country.Name"
            >Zu den Rundreisen
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>
<style lang="less">
@import url("../css/roundtrips.less");
</style>
<script>
import { db } from '../firebaseInit.js'
export default {
  meta: {
    title: 'Rundreisen',
    meta: {
      description: { name: 'description', content: 'Länder auf roundtrips4you ansehen, komplett kostenlos, online und unkompliziert. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...' }

    }
  },
  data () {
    return {
      countries: []
    }
  },
  name: 'RoundtripOverview',
  methods: {
    loadCountries () {
      let countriesRef = db.collection('Countries')
        .orderBy('Name')
        .limit(200)

      countriesRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.countries.push(doc.data())
          })
        })
    }
  },
  created () {
    this.loadCountries()
  }
}
</script>
