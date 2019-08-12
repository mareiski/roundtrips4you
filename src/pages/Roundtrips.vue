<template>
  <q-page>
    <div class="roundtrips">
      <h2 class="topic">Alle Rundreisen auf einen Blick</h2>
      <div id="CardBackgroundImg"></div>
      <div id="CardBackgroundImgPlaceholder">
        <div
          class="country-card-container"
          v-for="country in countries"
          :key="country"
        >
          <div
            class="country-card"
            :style="{ backgroundImage: 'url('+ require('../statics/' + country.imageUrl) +')' }"
          >
            <h2 class="country-title">{{country.title}}</h2>
            <router-link
              class="button"
              :to="country.link"
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
export default {
  data () {
    return {
      countries: [
        {
          title: 'Italien',
          imageUrl: 'venice.jpg',
          link: 'rundreisen-details'
        },
        {
          title: 'Vietnam',
          imageUrl: 'vietnam.jpg',
          link: 'rundreisen-details'
        },
        {
          title: 'USA',
          imageUrl: 'goldenGate.jpg',
          link: 'rundreisen-details'
        },
        {
          title: 'Italien',
          imageUrl: 'venice.jpg',
          link: 'rundreisen-details'
        },
        {
          title: 'Vietnam',
          imageUrl: 'vietnam.jpg',
          link: 'rundreisen-details'
        },
        {
          title: 'USA',
          imageUrl: 'goldenGate.jpg',
          link: 'rundreisen-details'
        }
      ]
    }
  },
  name: 'rundreisen'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
