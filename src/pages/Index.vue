<template>
  <q-page>
    <div class="home">
      <div id="MainImg"></div>
      <div id="MainImgOverlay">
      </div>
      <div id="MainImgPlacholder">
        <h1 class="main-qoute">Die gr&ouml;&szlig;te Sehensw&uuml;rdigkeit, die es gibt, ist die Welt - sieh sie dir an.</h1>
        <span class="quote-author">Kurt Tucholsky</span>
        <q-select
          filled
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          label="Finde jetzt deine Traumreise..."
          :options="countryOptions"
          @filter="filterFn"
          class="main-search-bar"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Keine Ergebnisse
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="box-seperator">
        <h2>Entdecke dein Traumziel mit einer Rundreise die zu dir passt!</h2>
      </div>
      <div class="box-seperator-placholder"></div>
      <div class="card-container">
        <div class="card-wrap left">
          <a class="card">
            <div id="VietnamImg"></div>
            <h3>Vietnam</h3>
            <span>Erlebe einzigartige Landschaften</span>
          </a>
        </div>
        <div class="card-wrap">
          <a class="card">
            <div id="USAImg"></div>
            <h3>USA</h3>
            <span>Erlebe die Weltmetropole in den USA</span>
          </a>
        </div>
        <div class="card-wrap right">
          <router-link
            class="card"
            to="/rundreisen-details"
          >
            <div id="ItalyImg"></div>
            <h3>Italien</h3>
            <span>Erlebe la dolce Vita in Venedig</span>
          </router-link>
        </div>
      </div>
      <div class="section-img"></div>
      <div class="section-img-placeholder">
        <h2>Begebe dich jetzt auf die Suche nach der besten Rundreise f&uuml;r dein Traumland und entdecke neue Orte!</h2>
        <button>Zu den Rundreisen</button>
      </div>
    </div>
  </q-page>
</template>

<style lang="less">
@import "../css/home.less";
</style>

<script>
const stringOptions = [
  'Deutschland', 'Italien', 'Vietnam'
]

export default {
  name: 'PageIndex',
  data () {
    return {
      date: '2019/02/01',
      country: 'Finde jetzt deine Traumreise...',
      countryOptions: stringOptions
    }
  },
  methods: {
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
