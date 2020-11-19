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
            <p>Plane deine Reise jetzt kostenlos und ohne Registrierung</p>
            <!-- @click="$router.push('/registrieren')" -->
            <q-btn
              @click="sharedMethods.scrollToRef($refs['tools'])"
              color="primary"
            >Los geht's</q-btn>
          </div>
          <q-dialog v-model="showCreateTempRTDialog">
            <q-card>
              <q-card-section class="row items-center">
                <span style="width:100%; text-align:center; font-size:18px;">Erstelle deine Reise ohne Anmeldung</span>
                <q-input
                  v-model="title"
                  :rules="[val => val !== null &&  val !== ''  || 'Bitte gib einen Titel an', val => isUniqueTitle(val), val => val[0] !== ' ' || 'Das erste Zeichen kann kein Leerzeichen sein']"
                  label="Titel der Reise"
                  outlined
                  ref="titleInput"
                  style="margin:auto; margin-top:20px; width:300px;"
                >
                  <template v-slot:prepend>
                    <q-icon name="title" />
                  </template>
                </q-input>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  label="Reise erstellen"
                  @click="createTempRT()"
                  color="primary"
                  v-close-popup
                />
                <q-btn
                  flat
                  label="Abbrechen"
                  color="primary"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
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
            @click="[showCreateTempRTDialog = true, createTempRTClicked()]"
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
            @click="[showCreateTempRTDialog = true, createTempRTClicked()]"
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
            @click="[showCreateTempRTDialog = true, createTempRTClicked()]"
          >
            <q-icon name="edit" />
            <h3>Einfache Nutzung</h3>
            <span>Bei uns kannst du ganz schnell und kinderleicht deine eigene Reise zusammenstellen, genau wie eine Katalogreise nur individueller.</span>
          </div>
        </div>
      </div>
      <div class="register-container">
        <h4 style="text-align:center;">Beginne kostenlos und ohne Anmeldung mit der Planung deiner eigenen Reise</h4>
        <q-btn
          @click="[showCreateTempRTDialog = true, createTempRTClicked()]"
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
      <h4
        ref="tools"
        style="text-align:center; padding-top: 30px;"
      >Mit diesen Tools planst du deine eigene Reise in kürzester Zeit</h4>
      <ol class="create-roundtrip-ol">
        <li v-in-viewport.once>
          <div>
            <h2>Flug- & Hotelsuche</h2>
            <p>Wir bieten dir die Möglichkeit, mit deinen Daten bei verschiedenen Flug- und Hotelanbietern einen Flug bzw. ein Hotel zu suchen.</p>
            <p>Du musst dafür nur einmal deine Präferenzen eingeben und kannst dir dafür die Angebote der verschieden Anbieter ansehen.</p>
            <p>Anschließend kannst du deinen Flug/Hotel direkt auf der Seite des Anbieters buchen.</p>
          </div>
          <div>
          </div>
        </li>
        <li v-in-viewport.once>
          <div>
            <h2>Städtevorschläge</h2>
            <p>Mit Roundtrips4you werden dir automatisch die schönsten und beliebtesten Städte in dem jeweiligen Land deiner Reise vorgeschlagen.</p>
            <p>Dadurch siehst du auf einen Blick welche Orte du unbedingt gesehen haben musst.</p>
            <p>Mit einem Klick kannst du diese zu deiner erstellten Reise hizufügen.</p>
          </div>
          <div>
            <q-img
              style="width:1000px;"
              alt="Städtevorschläge"
              @click="[showCreateTempRTDialog = true, createTempRTClicked()]"
              src="https://roundtrips4you.de/statics/cities.jpeg"
            />
          </div>
        </li>
        <li v-in-viewport.once>
          <div>
            <h2>Rundreise automatisch zusammenstellen</h2>
            <p>Nachdem du alle Ziele auf deiner Reise gefunden hast, kannst du dir automatisch die Route zu jedem Ort anzeigen lassen.</p>
            <p>Die Route wird so berechnet, dass du immer am wenigsten Zeit zwischen den Orten benötigst und somit mehr Zeit für die Besichtigung der Reiseziele bleibt.</p>
          </div>
          <div>
          </div>
        </li>
        <li v-in-viewport.once>
          <div>
            <h2>Vorschlag von Sehenswürdigkeiten</h2>
            <p>Die besten Sehenswürdigkeiten zu finden ist schwierig, deshalb unterstützen wir dich mit unseren automatischen Vorschlägen.</p>
            <p>Bei jedem Stopp auf deiner Reise kannst du dir die Points of Interest anzeigen lassen und diese in der Beschreibung des Ortes speichern, damit du sie immer parat hast.</p>
            <p>Mit einem Klick auf die jeweilige Sehenswürdigkeit kannst du dir genaue Informationen und Wissenswerte Tipps anzeigen lassen.</p>
          </div>
          <div>
            <q-img
              style="width:1000px;"
              alt="Vorschlag von Sehenswürdigkeiten"
              @click="[showCreateTempRTDialog = true, createTempRTClicked()]"
              src="https://roundtrips4you.de/statics/pois.jpeg"
            />
          </div>
        </li>
        <li
          v-in-viewport.once
          ref="map"
        >
          <div>
            <h2>Karte</h2>
            <p>Wenn du deine Reise auf einer Karte begutachten möchtest, musst du dafür nicht jeden Stopp einzeln zu einer Karte hinzufügen.</p>
            <p>Wir übernehmen die Kartenerstellung komplett für dich, sodass du nur auf den entsprechenden Reiter klicken musst um alle deine Stopps zu sehen.</p>
            <p>Natürlich zeichnen wir auch gleich die Route die zwischen den einzelnen Reisezielen liegt ein.</p>
            <p>Möchtest du deine Reise lieber komplett mit der Karte erstellen kannst du natürlich auch dort mit nur 1 Klick die einzelnen Stopps hinzufügen</p>
          </div>
          <div>
            <q-img
              style="width:1000px;"
              alt="Karte"
              @click="[showCreateTempRTDialog = true, createTempRTClicked()]"
              src="https://roundtrips4you.de/statics/map.jpeg"
            />
          </div>
        </li>
      </ol>
      <div class="section-img"></div>
      <div class="section-img-placeholder">
        <h3>Plane jetzt gleich und ohne Anmeldung mit der deine ganz eigenen Reise</h3>
        <q-btn
          color="primary"
          v-in-viewport.once
          @click="[showCreateTempRTDialog = true, createTempRTClicked()]"
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

<script>
import(/* webpackPrefetch: true */ '../css/home.less')
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
      showCreateTempRTDialog: false,
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
    createTempRTClicked () {
      if (this.$store.getters['demoSession/isInDemoSession']) {
        this.$router.push('/rundreise-bearbeiten/' + this.$store.getters['demoSession/getRoundtripId'])
      }
    },
    createTempRT () {
      if (!this.title) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Bitte überprüfe deine Angaben'
        })
        return false
      }

      let Title = this.title

      // set as default country (will be overitten)
      Title = Title.charAt(0).toUpperCase() + Title.slice(1)
      Title = Title.trim()

      if (auth.user() !== null) {
        try {
          this.$store.dispatch({ type: 'roundtrips/addRoundtrip', title: Title, uid: auth.user().uid, rooms: 1, adults: 2, childrenAges: [], tempLocation: null, depatureDate: null }).then(docId => {
            if (docId && docId !== null) {
              this.$router.push('/rundreise-bearbeiten/' + docId)
            } else {
              sharedMethods.showErrorNotification('Deine Rundreise konnte nicht erstellt werden, bitte versuche es erneut')
            }
          })
        } catch (error) {
          console.log(error)
          sharedMethods.showErrorNotification('Deine Rundreise konnte nicht erstellt werden, bitte versuche es erneut')
        }
      } else {
        this.$store.dispatch('demoSession/createRoundtrip', Title).then(docId => {
          this.$router.push('/rundreise-bearbeiten/' + docId)
        })
      }
      // try {
      //   let tempRTId = Math.floor(Math.random() * 10000000000000)
      //   let timeStamp = Date.now()

      //   db.collection('Roundtrips').add({
      //     Category: 'Gruppenreise',
      //     Days: '< 5 Tage',
      //     Description: 'Kurze Beschreibung deiner Rundreise',
      //     Hotels: '0',
      //     Location: Location,
      //     Region: null,
      //     Price: 100,
      //     Public: false,
      //     RTId: tempRTId,
      //     Stars: 3,
      //     Profile: 'Auto',
      //     Highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3'],
      //     Title: Title,
      //     OfferEndPeriod: new Date(timeStamp),
      //     OfferStartPeriod: new Date(timeStamp),
      //     OfferWholeYear: true,
      //     createdAt: new Date(timeStamp)
      //   })

      //   let roundtripsRef = db.collection('Roundtrips')
      //     .where('RTId', '==', tempRTId)
      //     .limit(1)
      //   roundtripsRef.get()
      //     .then(snapshot => {
      //       snapshot.forEach(doc => {
      //         db.collection('Roundtrips').doc(doc.id).update({
      //           'RTId': doc.id
      //         })

      //         // todo save doc id in store
      //         db.collection('RoundtripDetails').add({
      //           BookingComLink: '',
      //           DateDistance: '',
      //           Description: 'Beschreibung dieses Stopps',
      //           ExpediaLink: '',
      //           GeneralLink: '',
      //           ImageUrl: '',
      //           InitDate: new Date(timeStamp),
      //           Price: 0,
      //           RTId: doc.id,
      //           Title: 'Titel des 1. Stopps',
      //           Location: {
      //             lng: '13.3888599',
      //             lat: '52.5170365',
      //             label: 'Berlin, 10117, Germany'
      //           }
      //         })
      //         this.$router.push('/rundreise-bearbeiten/' + doc.id)
      //       })
      //     })
      //   this.title = ''
      // } catch (error) {
      //   console.log(error)
      //   this.$q.notify({
      //     color: 'red-5',
      //     textColor: 'white',
      //     icon: 'error',
      //     message: 'Deine Rundreise konnte nicht erstellt werden, bitte versuche es erneut'
      //   })
      //   return false
      // }
      // return true
    }
  }
}
</script>
