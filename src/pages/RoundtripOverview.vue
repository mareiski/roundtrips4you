<template>
  <q-page>
    <div class="roundtrips">
      <h2 class="topic">Alle Traumländer auf einen Blick</h2>
      <div id="CardBackgroundImg"></div>
      <div id="CardBackgroundImgPlaceholder">
        <div
          class="country-card-container"
          v-for="country in countries"
          :key="country"
        >
          <div
            class="country-card"
            :style="{ backgroundImage: 'url('+ country.ImageUrl +')' }"
          >
            <h2 class="country-title">{{country.Name}}</h2>
            <router-link
              class="button"
              :to="'/rundreisen/' + country.Name"
            >Zu den Rundreisen</router-link>
          </div>
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
