<template>
  <q-page>
    <div class="roundtrips">
      <h2 class="topic">Alle Traumländer auf einen Blick</h2>
      <div id="CardBackgroundImg"></div>
      <div id="CardBackgroundImgPlaceholder">
        <div class="country-card-container">
          <router-link
            class="country-card"
            to="/meine-rundreisen/"
            :style="{ backgroundImage: 'url(https://roundtrips4you.netlify.com/statics/oldCard.jpg)' }"
          >
            <h2 class="country-title">Meine Rundreisen</h2>
            <div class="button">Zu meinen Reisen
            </div>
          </router-link>
        </div>
        <div
          class="country-card-container"
          v-for="country in countries"
          :key="country"
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
@import "../css/roundtrips.less";
</style>
<script>
import { db } from '../firebaseInit'
export default {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
