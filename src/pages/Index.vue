<template>
  <q-page style="overflow: hidden;">
    <div class="home q-px-lg q-pb-md">
      <div
        id="flyingPlane"
        v-show="imgLoaded"
      >
        <router-link to="/meine-rundreisen">
          <q-btn class="banner">Eigene Reise erstellen</q-btn>
        </router-link>
        <span class="line"></span>
        <img
          class="plane"
          rel="preload"
          @load="imgLoaded = true"
          src="../statics/plane.png"
        />
      </div>
      <div id="MainImg"></div>
      <div id="MainImgOverlay">
      </div>
      <div id="MainImgPlacholder">
        <h2 class="main-qoute">Die gr&ouml;&szlig;te Sehensw&uuml;rdigkeit, die es gibt, ist die Welt - sieh sie dir an.</h2>
        <span class="quote-author">Kurt Tucholsky</span>
        <div
          class="flex justify-around"
          id="OfferContainer"
        >
          <div>
            <p>Starte jetzt in dein eigenes Abenteuer und erstelle kostenlos deine eigene Reise!</p>
            <q-btn
              @click="$router.push('/registrieren')"
              color="primary"
              style="margin-top:10px;"
            >Los geht's</q-btn>
          </div>
          <div>
            <p>Lasse dich durch bereits erstellte Reisen inspirieren!</p>
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
          </div>
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
        <h1>Erstelle deine eigene Reise mit einem Routenplaner der zu dir passt!</h1>
      </div>
      <div class="box-seperator-placholder"></div>
      <div class="register-container">
        <h4 style="text-align:center;">Registriere dich jetzt und nutze unser ganzes <a
            style="text-decoration:underline;"
            @click="scrollTo('tools')"
          >Angebot</a> komplett kostenlos</h4>
        <q-btn
          @click="$router.push('/registrieren')"
          color="primary"
        >JETZT REGISTRIEREN</q-btn>
      </div>
      <p style="text-align:center; font-size:20px; padding-top:40px;">Wähle ein Land und sehe dir mit unserem kostenlosen Reiseplaner erstellte Rundreisen an</p>
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
      <h4
        ref="tools"
        style="text-align:center;"
      >Diese Tools helfen dir bei der Planung deiner Reise</h4>
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
              src="/src/statics/cities.png"
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
              src="../statics/pois.png"
            />
          </div>
        </li>

        <li>
          <div>
            <h2>Karte</h2>
            <p>Wenn du deine Reise auf einer Karte begutachten möchtest, musst du dafür nicht jeden Stopp einzeln zu einer Karte hinzufügen.</p>
            <p>Wir übernehmen die Kartenerstellung komplett für dich, sodass du nur auf den entsprechenden Reiter klicken musst um alle deine Stopps zu sehen.</p>
          </div>
          <div>
            <q-img
              style="width:1000px;"
              src="../statics/map.png"
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
            <span>Bearbeite vorgefertigte Reisen und schaffe somit deine ganz eigene Traumreise</span>
          </router-link>
        </div>
      </div>
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

<style lang="less">
@import "../css/home.less";
</style>

<script>
import { countries } from '../countries'
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  metaInfo: {
    meta: [
      { name: 'description', content: 'Reise auf roundtrips4you selbst erstellen, komplett kostenlos, online und unkompliziert. Dein Routenplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...' }
    ]
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
