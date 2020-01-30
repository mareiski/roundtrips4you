<template>
  <q-page style="overflow: hidden;">
    <div class="home q-px-lg q-pb-md">
      <div id="flyingPlane">
        <router-link to="/meine-rundreisen">
          <q-btn class="banner">Eigene Reise erstellen</q-btn>
        </router-link>
        <span class="line"></span>
        <img
          class="plane"
          rel="preload"
          src="../statics/plane.png"
        />
      </div>
      <div id="MainImg"></div>
      <div id="MainImgOverlay">
      </div>
      <div id="MainImgPlacholder">
        <h2 class="main-qoute">Die gr&ouml;&szlig;te Sehensw&uuml;rdigkeit, die es gibt, ist die Welt - sieh sie dir an.</h2>
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
        <span
          class="create-own-btn"
          style="margin-top:10px; color:white;"
        >oder</span>
        <q-btn
          @click="$router.push('/registrieren')"
          color="primary"
          style="margin-top:10px;"
          class="create-own-btn"
        >erstelle deine eigene reise einfach selbst...</q-btn>
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
        <h1>Erstelle deine eigene Reise mit einem Reiseplaner der zu dir passt!</h1>
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
            itemtype="http://schema.org/Offer"
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
            itemtype="http://schema.org/Offer"
          >
            <div id="USAImg"></div>
            <h3>USA</h3>
            <span>Erlebe das Land der unbegrenzten Möglichkeiten</span>
          </router-link>
        </div>
        <div class="card-wrap right">
          <router-link
            class="card"
            to="/rundreisen/Italien"
            itemtype="http://schema.org/Offer"
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
            to="/rundreisen-uebersicht"
          >
            <q-icon name="compare_arrows" />
            <h3>Vergleichen</h3>
            <span>Vergleiche eine Vielzahl von top Reisen auf der ganzen Welt mit wenigen Klicks</span>
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
            to="/rundreisen-uebersicht"
          >
            <q-icon name="edit" />
            <h3>Bearbeiten</h3>
            <span>Bearbeite vorgefertigte Rundreisen und schaffe somit deine ganz eigene Traumreise</span>
          </router-link>
        </div>
      </div>
      <h4 style="text-align:center;">Deine eigene Rundreise erstellen: so einfach geht's!</h4>
      <ol class="create-roundtrip-ol">
        <li>
          <q-icon name="info" />
          <h2>Allgemeine Infos angeben</h2>
          <p>Gib als Erstes das Land, den Titel und die Anzahl der Reisenden auf deiner Rundreise an.</p>
          <p>Damit hast du auch schon das Grundgerüst für deine eigene Traumreise fertiggestellt.</p>
        </li>
        <li>
          <q-icon name="location_on" />
          <h2>Orte und Art der Stopps festlegen</h2>
          <p>Nun kannst du jeden einzelnen Ort auf deine Reise anlegen und die Art des Stopps (Zwischenstopp oder Hotel) auswählen.</p>
          <p>Solltest du noch hilfe bei der Auswahl der Orte brauchen, kannst du dich von unseren Städtevorschlägen inspirieren lassen.</p>
        </li>
        <li>
          <q-icon name="build" />
          <h2>Lass dich von unseren Tools unterstützen</h2>
          <p>Durch eine Vielzahl von Funktionen, wie der automatischen Kartenerstellung und Routenberechnung unterstützen wir dich bei deiner Planung.</p>
          <p>Zusätzlich zeigen wir dir wichtige Informationen, wie z.B. die Kontaktdaten und Adresse deines Hotels.</p>
        </li>

        <li>
          <q-icon name="share" />
          <h2>Teile deine Rundreise</h2>
          <p>Schmücke deine Rundreise mit Bildern, Highlights und vielen weiteren Informationen aus, um deine Rundreise mit der Welt zu teilen.</p>
        </li>
      </ol>
      <!-- Unsere automatisierten Funktionen -->
      <div class="register-container">
        <h4 style="text-align:center;">Registriere dich jetzt und nutze unser ganzes Angebot komplett kostenlos</h4>
        <q-btn
          @click="$router.push('/registrieren')"
          color="primary"
        >JETZT REGISTRIEREN</q-btn>
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
