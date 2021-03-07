<template>
  <q-page style="overflow: hidden;">
    <div class="home q-px-xl q-pb-xl">
      <!-- <div
        id="flyingPlane"
        v-show="imgLoaded"
      >
        <router-link
          to="/meine-rundreisen"
          style="text-decoration:none;"
        >
          <q-btn class="banner">jetzt Reise planen</q-btn>
        </router-link>
        <span class="line"></span>
        <img
          class="plane"
          rel="preload"
          alt="flugzeug"
          @load="imgLoaded = true"
          src="../statics/plane.png"
        />
      </div> -->
      <div id="MainImg"></div>
      <div id="MainImgOverlay">
      </div>
      <div id="MainImgPlacholder">
        <h2 class="main-qoute">Damit deine Reise perfekt geplant und trotzdem individuell bleibt</h2>
        <span class="quote-subtext">
          Mit dem kostenlosen Reiseplaner Roundtrips4you kannst du deine eigene Reise selbst zusammenstellen
        </span>
        <div
          class="flex justify-around"
          id="OfferContainer"
        >
          <div>
            <p class="font-medium">Plane deine Reise jetzt kostenlos und starte ohne Registrierung</p>
            <!-- @click="$router.push('/registrieren')" -->
            <!-- <q-btn
              @click="sharedMethods.scrollToRef($refs['registerContainer'])"
              color="primary"
            >Los geht's</q-btn> -->
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
          @click="sharedMethods.scrollToRef($refs['sndSection'])"
        />
      </div>
      <div
        ref="sndSection"
        class="box-seperator"
      >
        <h1>Plane deine eigene Reise kostenlos & perfekt auf dich zugeschnitten</h1>
      </div>
      <div class="box-seperator-placholder"></div>
      <div class="card-container">
        <div
          class="card-wrap left"
          v-in-viewport.once
        >
          <div
            class="card cursor-pointer"
            @click="createDemoRTClicked()"
          >
            <q-icon name="fas fa-lightbulb" />
            <h3>Inspiration</h3>
            <span>Wir zeigen dir die besten Orte in deinem gewählten Reiseland. Zusätzlich kannst du dich von unserem Blog und vorgefertigten Reisen inspirieren lassen.</span>
          </div>
        </div>
        <div
          class="card-wrap"
          v-in-viewport.once
        >
          <div
            class="card cursor-pointer"
            @click="createDemoRTClicked"
          >
            <q-icon name="explore" />
            <h3>Individualität</h3>
            <span>Du planst deine Reise genau so wie du sie haben möchtest und bestimmst wann und wie du an einem bestimmten Ort sein möchtest.</span>
          </div>
        </div>
        <div
          class="card-wrap right"
          v-in-viewport.once
        >
          <div
            class="card cursor-pointer"
            @click="createDemoRTClicked()"
          >
            <q-icon name="edit" />
            <h3>Einfache Nutzung</h3>
            <span>Bei uns kannst du ganz schnell und kinderleicht deine eigene Reise zusammenstellen, genau wie eine Katalogreise nur individueller.</span>
          </div>
        </div>
      </div>
      <div
        ref="registerContainer"
        class="register-container"
      >
        <h4 style="text-align:center;">Beginne kostenlos und ohne Anmeldung mit der Planung deiner eigenen Reise</h4>
        <q-btn
          @click="createDemoRTClicked()"
          color="primary"
          style="font-size:18px;"
        >Reise selbst Planen</q-btn>
      </div>
      <!-- <div
        class="description-container"
        v-in-viewport.once
      >
        <p>Eine Reise selbst planen kann oft ganz schön anstrengend sein, aber bei Katalogreisen gibt es immer ein paar Orte die man lieber besucht hätte.</p>
        <p>Roundtrips4you verbindet das Beste aus beiden Konzepten miteinander:</p>
        <p>Mit unserem Reiseplaner kannst du deine Reise selbst zusammenstellen, somit entgeht dir kein Reiseziel mehr.</p>
        <p>Um dir die Planungsarbeit zu erleichtern, bietet dir Roundtrips4you einige Tools, die dich bei deiner Reiseplanung unterstützen.</p>
        <p>Somit ist deine Reise zu 100% individualisiert und trotzdem perfekt durchgeplant.</p>
        <p><b>Roundtrips4you</b> - deine Reiseplanungs App für deinen nächsten Urlaub.</p>
      </div> -->
      <h4 style="text-align:center; padding-top: 30px;">In diesen Schritten planst du deine Reise in kürzester Zeit</h4>
      <q-timeline
        color="secondary"
        id="HomeTimeLine"
      >
        <q-timeline-entry
          title="An-/Abreise"
          side="left"
          icon="commute"
        >
          <div>
            <p>Wir bieten dir die Möglichkeit, mit deinen Daten bei verschiedenen Fluganbietern einen Flug bzw. ein Hotel zu suchen.</p>
            <p>Du musst dafür nur einmal deine Präferenzen eingeben und kannst dir dafür die Angebote der verschieden Anbieter ansehen.</p>
            <p>Anschließend kannst du deinen Flug direkt auf der Seite des Anbieters buchen.</p>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Reiseziele wählen"
          side="right"
          icon="add"
        >
          <div>
            <p>Mit dem Klick auf eine Stadt auf der Karte kannst du diese sofort hinzufügen</p>
            <p>Außerdem werden dir automatisch die beliebtesten Städte vorgeschlagen, solltest du ein wenig inspiration brauchen.</p>
            <p>Zu jeder Stadt werden dir Bilder und die besten Sehenswürdigkeiten angezeigt, damit du alles auf einen Blick vergleichen kannst.</p>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Details eingeben"
          side="left"
          icon="create"
        >
          <div>
            <p>Wenn du einen Stopp hinzufügst kannst du ganz individuell alles rund um das Ziel anpassen.</p>
            <p>Natürlich kannst du hier auch ein Hotel hinzufügen, welches du bei den bekanntesten Anbietern buchen kannst.</p>
            <p>Die Daten für die Hotelsuche musst du nur einmal eingeben, so sparst du dir eine Menge Zeit!</p>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Reiseübersicht"
          side="right"
          icon="format_list_bulleted"
        >
          <div>
            <p>Am Schluss deiner Reiseplanung erhältst du eine übersichtliche Zusammenfassung deiner Reise mit all deinen Stopps und Routen.</p>
            <p>Du kannst dir auch automatisch die kürzeste Route errechnen lassen.</p>
            <p>Wenn du möchtest kannst du auch deine Reise auf Roundtrips4you veröffentlichen um sie der ganzen Welt zu zeigen.</p>
          </div>
        </q-timeline-entry>

      </q-timeline>

      <!-- <ol class="create-roundtrip-ol">
        <li v-in-viewport.once>
          <div>
            <h2>An-/Abreise</h2>
            <p>Wir bieten dir die Möglichkeit, mit deinen Daten bei verschiedenen Fluganbietern einen Flug bzw. ein Hotel zu suchen.</p>
            <p>Du musst dafür nur einmal deine Präferenzen eingeben und kannst dir dafür die Angebote der verschieden Anbieter ansehen.</p>
            <p>Anschließend kannst du deinen Flug direkt auf der Seite des Anbieters buchen.</p>
          </div>
          <div>
          </div>
        </li>
        <li v-in-viewport.once>
          <div>
            <h2>Reiseziele wählen</h2>
            <p>Mit dem Klick auf eine Stadt auf der Karte kannst du diese sofort hinzufügen</p>
            <p>Außerdem werden dir automatisch die beliebtesten Städte vorgeschlagen, solltest du ein wenig inspiration brauchen.</p>
            <p>Zu jeder Stadt werden dir Bilder und die besten Sehenswürdigkeiten angezeigt, damit du alles auf einen Blick vergleichen kannst.</p>
          </div>
           <div>
            <q-img
              style="width:1000px;"
              alt="Städtevorschläge"
              @click="createDemoRTClicked()"
              src="https://roundtrips4you.de/statics/cities.jpeg"
            />
          </div>
      </li>
      <li v-in-viewport.once>
        <div>
          <h2>Details eingeben</h2>
          <p>Wenn du einen Stopp hinzufügst kannst du ganz individuell alles rund um das Ziel anpassen.</p>
          <p>Natürlich kannst du hier auch ein Hotel hinzufügen, welches du bei den bekanntesten Anbietern buchen kannst.</p>
          <p>Die Daten für die Hotelsuche musst du nur einmal eingeben, so sparst du dir eine Menge Zeit!</p>
        </div>
        <div>
        </div>
      </li>
      <li v-in-viewport.once>
        <div>
          <h2>Reiseübersicht</h2>
          <p>Am Schluss deiner Reiseplanung erhältst du eine übersichtliche Zusammenfassung deiner Reise mit all deinen Stopps und Routen.</p>
          <p>Du kannst dir auch automatisch die kürzeste Route errechnen lassen.</p>
          <p>Wenn du möchtest kannst du auch deine Reise auf Roundtrips4you veröffentlichen um sie der ganzen Welt zu zeigen.</p>
        </div>
         <div>
            <q-img
              style="width:1000px;"
              alt="Vorschlag von Sehenswürdigkeiten"
              @click="createDemoRTClicked()"
              src="https://roundtrips4you.de/statics/pois.jpeg"
            />
          </div>
      </li>
      </ol> -->
      <div class="section-img"></div>
      <div class="section-img-placeholder">
        <h3>Plane jetzt gleich und ohne Anmeldung mit der deine ganz eigenen Reise</h3>
        <q-btn
          color="primary"
          v-in-viewport.once
          @click="createDemoRTClicked()"
          style="font-size:20px;"
        >Reise erstellen</q-btn>
      </div>
      <p style="text-align:center; font-size:20px; padding-top:40px;">Möchtest du erstmal ein paar Beispiele sehen?<br> Wähle ein Land und sehe dir von anderen Usern mit unserem Reiseplaner kostenlos und online erstellte Rundreisen an</p>
      <div class="card-container">
        <div
          class="card-wrap left"
          v-in-viewport.once
        >
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
        <div
          class="card-wrap"
          v-in-viewport.once
        >
          <router-link
            class="card"
            to="/rundreisen/Indonesien"
            itemtype="http://schema.org/Offer"
          >
            <div id="BaliImg"></div>
            <h3>Indonesien</h3>
            <span>Erlebe das Land der Tempel und Reisfelder</span>
          </router-link>
        </div>
        <div
          class="card-wrap right"
          v-in-viewport.once
        >
          <router-link
            class="card"
            to="/rundreisen/Italien"
            itemtype="http://schema.org/Offer"
          >
            <div id="ItalyImg"></div>
            <h3>Italien</h3>
            <span>Erlebe mediteranen Flair in antiken Städten</span>
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
    </div>
  </q-page>
</template>
<style lang="less">
@import url("../css/home.less");
</style>
<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll
import { auth } from '../firebaseInit.js'
import sharedMethods from '../sharedMethods'

export default {
  meta: {
    title: 'Reiseplaner',
    meta: {
      description: { name: 'description', content: 'Reise selbst planen & zusammenstellen, Reise planen kostenlos & online. Routenplaner und Reiseplaner mit vielen Tools für deinen Roadtrip' }
    }
  },
  name: 'PageIndex',
  data () {
    return {
      date: '2019/02/01',
      searchLocation: '',
      imgLoaded: false,
      title: 'Meine Reise'
    }
  },
  computed: {
    sharedMethods () {
      return sharedMethods
    }
  },
  methods: {
    scrollTo (refName) {
      var el = this.$refs[refName]
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 400
      setScrollPosition(target, offset, duration)
    },
    createDemoRTClicked () {
      if (!auth.user()) this.$store.commit('demoSession/setAsDemoSession')
      this.$router.push('/rundreisen-wizard')
    },
    createTempRTClicked () {
      if (this.$store.getters['demoSession/isInDemoSession']) {
        this.$router.push('/rundreisen-wizard/')
      }
    }
  }
}
</script>
