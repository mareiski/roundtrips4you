<template>
  <q-page style="overflow: hidden;">
    <div class="home q-px-lg q-pb-md">
      <div
        id="flyingPlane"
        v-show="imgLoaded"
      >
        <router-link
          to="/meine-rundreisen"
          style="text-decoration:none;"
        >
          <q-btn class="banner">Eigene Reise erstellen</q-btn>
        </router-link>
        <span class="line"></span>
        <img
          class="plane"
          rel="preload"
          alt="flugzeug"
          @load="imgLoaded = true"
          src="../statics/plane.png"
        />
      </div>
      <div id="MainImg"></div>
      <div id="MainImgOverlay">
      </div>
      <div id="MainImgPlacholder">
        <h2 class="main-qoute">Damit deine Reise perfekt geplant und trotzdem individuell bleibt</h2>
        <span class="quote-subtext">
          <span>Mit dem Reiseplaner Roundtrips4you kannst du deine Reise ganz leicht zusammenstellen</span>
          <span style="white-space:nowrap;"> - ganz egal wie besonders sie ist</span>
        </span>
        <div
          class="flex justify-around"
          id="OfferContainer"
        >
          <div>
            <p>Plane deine Reise jetzt kostenlos</p>
            <q-btn
              @click="$router.push('/registrieren')"
              color="primary"
              style="margin-top:10px;"
            >Los geht's</q-btn>
          </div>
          <!-- <div>
            <p>Lasse dich durch bereits erstellte Reisen anderer User inspirieren!</p>
            <q-select
              filled
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              v-model="searchLocation"
              hide-dropdown-icon
              label="Land suchen..."
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
          </div> -->
        </div>
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
        <h1>Plane deinen eigenen perfekt auf dich zugeschnittenen Roadtrip</h1>
      </div>
      <div class="box-seperator-placholder"></div>
      <div class="register-container">
        <h4 style="text-align:center;">Lästige Reiseplanung war gestern, registriere dich jetzt kostenlos und entdecke Roundtrips4you</h4>
        <q-btn
          @click="$router.push('/registrieren')"
          color="primary"
        >JETZT REGISTRIEREN</q-btn>
      </div>
      <div class="card-container">
        <div class="card-wrap left">
          <router-link
            class="card"
            to="/meine-rundreisen"
          >
            <q-icon name="share" />
            <h3>Teilen</h3>
            <span>Teile deine eigenen Rundreisen mit der ganzen Welt in einer übersichtlichen Ansicht</span>
          </router-link>
        </div>
        <div class="card-wrap">
          <router-link
            class="card"
            to="/meine-rundreisen"
          >
            <q-icon name="explore" />
            <h3>Planen</h3>
            <span>Plane deine Reise ganz professionell aber ohne Aufwand und in kürzester Zeit</span>
          </router-link>
        </div>
        <div class="card-wrap right">
          <router-link
            class="card"
            to="/rundreisen-uebersicht"
          >
            <q-icon name="edit" />
            <h3>Bearbeiten</h3>
            <span>Bearbeite vorgefertigte Reisen und schaffe somit deine ganz eigene Traumreise</span>
          </router-link>
        </div>
      </div>
      <div class="description-container">
        <p>Die eigene Reiseplanung kann oft ganz schön anstrengend sein, aber bei Katalogreisen gibt es immer ein paar Orte die dort gar nicht angefahren werden.</p>
        <p>Roundtrips4you verbindet beide Konzepte miteinander:</p>
        <p>Bei uns kannst du deine Reise komplett nach deinen eigenen Wünschen zusammenstellen, somit entgeht dir keine Sehenswürdigkeit mehr (und du sparst dir die ein oder andere nervige Person in der Reisegruppe).</p>
        <p>Um dir diese Planungsarbeit zu erleichtern, bietet dir Roundtrips4you einige Tools, die dich bei deiner Reiseplanung unterstützen.</p>
        <p>Somit ist deine Reise zu 100% individualisiert und trotzdem perfekt durchgeplant.</p>
      </div>
      <h4
        ref="tools"
        style="text-align:center;"
      >Mit diesen Tools planst du deine eigene Reise in unter 5 Minuten</h4>
      <ol class="create-roundtrip-ol">
        <li>
          <div>
            <h2>Flugsuche</h2>
            <p>Wir bieten dir die Möglichkeit, mit deinen Daten bei verschiedenen Fluganbietern einen Flug zu buchen.</p>
            <p>Du musst dafür nur einmal deine Daten eingeben und kannst dir dafür die verschieden Angebote der Anbieter ansehen.</p>
          </div>
          <div>
          </div>
        </li>
        <li>
          <div>
            <h2>Städtevorschläge</h2>
            <p>Zusätzlich schlagen dir automatisch die schönsten Städte in dem gewählten Land deine Reise vor.</p>
            <p>Dadurch siehst du auf einen Blick welche Orte du unbedingt gesehen haben musst und kannst diese mit einem Klick zu deiner Reise hizufügen.</p>
          </div>
          <div>
            <q-img
              style="width:1000px;"
              alt="Städtevorschläge"
              src="https://roundtrips4you.de/statics/cities.jpeg"
            />
          </div>
        </li>
        <li>
          <div>
            <h2>Rundreise automatisch zusammenstellen</h2>
            <p>Nachdem du die Städte deiner Reise gefunden hast, kannst du dir automatisch die Route zu jedem Ort anzeigen lassen.</p>
            <p>Die Route wird so berechnet, dass du immer am wenigsten Zeit zwischen den Orten benötigst.</p>
          </div>
          <div>
          </div>
        </li>
        <li>
          <div>
            <h2>Vorschlag von Sehenswürdigkeiten</h2>
            <p>Die besten Sehenswürdigkeiten zu finden ist schwierig, deshalb unterstützen wir dich mit unseren automatischen Vorschlägen.</p>
            <p>Bei jedem Stopp auf deiner Reise kannst du dir die Points of Interest anzeigen lassen und diese in der Beschreibung des Ortes speichern.</p>
          </div>
          <div>
            <q-img
              style="width:1000px;"
              alt="Vorschlag von Sehenswürdigkeiten"
              src="https://roundtrips4you.de/statics/pois.jpeg"
            />
          </div>
        </li>
        <li ref="map">
          <div>
            <h2>Karte</h2>
            <p>Wenn du deine Reise auf einer Karte begutachten möchtest, musst du dafür nicht jeden Stopp einzeln zu einer Karte hinzufügen.</p>
            <p>Wir übernehmen die Kartenerstellung komplett für dich, sodass du nur auf den entsprechenden Reiter klicken musst um alle deine Stopps zu sehen.</p>
          </div>
          <div>
            <q-img
              style="width:1000px;"
              alt="Karte"
              src="https://roundtrips4you.de/statics/map.jpeg"
            />
          </div>
        </li>
      </ol>
      <div class="section-img"></div>
      <div class="section-img-placeholder">
        <h3>Plane jetzt ganz einfach, kostenlos und online deine individuelle Traumreise nach deinen Wünschen!</h3>
        <router-link to="/registrieren">
          <button>Reise kostenlos planen</button>
        </router-link>
      </div>
      <p style="text-align:center; font-size:20px; padding-top:40px;">Wähle ein Land und sehe dir von anderen Usern mit unserem kostenlosen Reiseplaner erstellte Rundreisen an</p>
      <div class="card-container">
        <div class="card-wrap left">
          <router-link
            class="card"
            to="/rundreisen/Portugal"
            itemtype="http://schema.org/Offer"
          >
            <div id="PortugalImg"></div>
            <h3>Portugal</h3>
            <span>Erlebe einzigartige Landschaften und fazinierende Städte</span>
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
      <!-- <div class="description-container">
        <p>Wolltest du schon immer mal wissen wie viel Zeit dir in einem Ort zum besichtigen tatsächlich bleibt?</p>
        <p>Oder hast du dir schonmal überlegt ob deine Reiseroute überhaupt die kürzeste ist?</p>
        <p>Um alle diese Fragen musst du dich bei uns nicht mehr kümmern, denn wir berechnen dir mit unserem <a @click="scrollTo('tools')">Routenplaner</a> immer alles schon automatisch.</p>
        <p>Ob es deine Aufenthaltsdauer ist, welche Sehenswürdigkeiten am Schönsten sind oder auch welche Route am kürzesten ist.</p>
        <p>Zusätzlich erstellen wir automatisch zu deiner Reise eine interaktive <a @click="scrollTo('map')">Karte</a> mit Mapbox, die dir deine Route im Überblick zeigt.
          <p>Unser Ziel ist es deinen Planungsaufwand so zu minimieren, damit du mehr Zeit für das Wichtigste hast: Dem Reisen selbst!</p>
      </div> -->
      <div class="register-container">
        <h4 style="text-align:center;">Registriere dich jetzt und nutze den vollen Umfang unseres Routenplaners kostenlos</h4>
        <q-btn
          @click="$router.push('/registrieren')"
          color="primary"
        >JETZT REGISTRIEREN</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import(/* webpackPrefetch: true */ '../css/home.less')
import { countries } from '../countries'
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  meta: {
    title: 'Home',
    meta: {
      description: { name: 'description', content: 'Reise auf Roundtrips4you selbst planen und zusammenstellen, komplett kostenlos und online. Dein Routenplaner und Reiseplaner mit vielen tools für deinen Roadtrip' }
    }
  },
  name: 'PageIndex',
  data () {
    return {
      date: '2019/02/01',
      countryOptions: countries,
      searchLocation: '',
      imgLoaded: false
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
