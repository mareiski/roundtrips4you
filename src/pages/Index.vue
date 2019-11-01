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
          v-model="searchLocation"
          hide-dropdown-icon
          label="Finde jetzt deine Traumreise..."
          :options="countryOptions"
          @filter="filterFn"
          @input="$router.push('/rundreisen/' + searchLocation)"
          class="main-search-bar"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Keine Ergebnisse
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-select>
        <q-icon
          class="scroll-down-icon cursor-pointer"
          name="keyboard_arrow_down"
          @click="scrollTo('sndSection')"
        />
      </div>
      <div
        ref="sndSection"
        class="box-seperator"
      >
        <h2>Entdecke dein Traumziel mit einer Rundreise die zu dir passt!</h2>
      </div>
      <div class="box-seperator-placholder"></div>
      <div class="register-container">
        <h4 style="text-align:center;">Registriere dich jetzt und nutze unser ganzes Angebot komplett kostenlos</h4>
        <q-btn
          @click="$router.push('/registrieren')"
          color="primary"
        >JETZT REGISTRIEREN</q-btn>
      </div>
      <div class="card-container">
        <div class="card-wrap left">
          <router-link
            class="card"
            to="/rundreisen/Vietnam"
          >
            <div id="VietnamImg"></div>
            <h3>Vietnam</h3>
            <span>Erlebe einzigartige Landschaften</span>
          </router-link>
        </div>
        <div class="card-wrap">
          <router-link
            class="card"
            to="/rundreisen/USA"
          >
            <div id="USAImg"></div>
            <h3>USA</h3>
            <span>Erlebe die Weltmetropole in den USA</span>
          </router-link>
        </div>
        <div class="card-wrap right">
          <router-link
            class="card"
            to="/rundreisen/Italien"
          >
            <div id="ItalyImg"></div>
            <h3>Italien</h3>
            <span>Erlebe la dolce Vita in Venedig</span>
          </router-link>
        </div>
      </div>
      <div class="section-img"></div>
      <div class="section-img-placeholder">
        <h3>Begebe dich jetzt auf die Suche nach der besten Rundreise f&uuml;r dein Traumland oder erstelle einfach selbst deine individuelle Traumreise!</h3>
        <button>Zu den Rundreisen</button>
      </div>
      <h4 style="text-align:center;">Noch nicht überzeugt ? <br> Hier sind unsere Features:</h4>
      <div class="card-container">
        <div class="card-wrap left">
          <router-link
            class="card"
            to="/rundreisen-übersicht"
          >
            <q-icon name="compare_arrows" />
            <h3>Vergleichen</h3>
            <span>Vergleiche eine Vielzahl von top Reisen auf der ganzen Welt mit wenigen klicks</span>
          </router-link>
        </div>
        <div class="card-wrap">
          <router-link
            class="card"
            to="/meine-rundreisen"
          >
            <q-icon name="add_circle_outline" />
            <h3>Erstellen</h3>
            <span>Erstelle deine eigene individuelle Rundreise und teile sie mit der ganzen Welt</span>
          </router-link>
        </div>
        <div class="card-wrap right">
          <router-link
            class="card"
            to="/meine-rundreisen"
          >
            <q-icon name="edit" />
            <h3>Bearbeiten</h3>
            <span>Bearbeite vorgefertigte Rundreisen und schaffe somit deine ganz eigene Traumreise</span>
          </router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="less">
@import "../css/home.less";
</style>

<script>
import { countries } from '../countries'
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  name: 'PageIndex',
  data () {
    return {
      date: '2019/02/01',
      countryOptions: countries,
      searchLocation: ''
    }
  },
  methods: {
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = countries.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    scrollTo (refName) {
      var el = this.$refs[refName]
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 400
      setScrollPosition(target, offset, duration)
    }
  }
}
</script>
