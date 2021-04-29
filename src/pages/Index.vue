<template>
  <q-page>
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
      <div id="MainImgOverlay"></div>
      <div id="MainImgPlacholder">
        <div>
          <h2 class="main-qoute">Plane deine eigene Reise</h2>
          <h3 class="quote-subtext">
            Mit unserem Reiseplaner kannst du deine eigene Reise individuell zusammenstellen.
            Ganz einfach, perfekt geplant und ohne Einschränkungen.
          </h3>
          <q-btn
            @click="$router.push('/rundreisen-wizard')"
            color="primary"
            style="margin-top:40px;"
          >kostenlos starten</q-btn>
        </div>
        <div class="flex justify-center">
          <!-- <div
            class="flex justify-around"
            id="OfferContainer"
          >
            <div>
               <p class="font-medium">Erstelle jetzt deine erste Reise kostenlos und ohne Registrierung</p>
         @click="$router.push('/registrieren')"
        <q-btn
                @click="$router.push('/rundreisen-wizard')"
                color="primary"
                dense
              >kostenlos starten</q-btn>
            </div>
         <div>
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
          </div>
      </div>-->
          <q-icon
            class="scroll-down-icon cursor-pointer"
            name="keyboard_arrow_down"
            @click="sharedMethods.scrollToRef($refs['sndSection'])"
          />
        </div>
      </div>
      <div
        class="clouds"
        v-if="!isMobile"
      >
        <img
          v-for="index in 4"
          :key="index"
          :src="'../statics/cloud' + (index + 1) + '.png'"
          :style="'--i:' + (index + 1) + '; max-height: 350px;'"
        />
        <img
          v-for="index in 3"
          :key="index"
          :src="'../statics/cloud' + (index + 1) + '.png'"
          :style="'--i:' + (index + 6)+ '; max-height: 400px; left:100px;'"
        />
        <img
          v-for="index in 2"
          :key="index"
          :src="'../statics/cloud' + (index + 1) + '.png'"
          :style="'--i:' + (index + 9)+ '; max-height: 350px; left:100px;'"
        />
      </div>
      <div
        ref="sndSection"
        class="box-seperator"
      >
        <h1 style="z-index:2;">Plane deine eigene Reise kostenlos & perfekt auf dich zugeschnitten</h1>
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
      <!-- <div
        ref="registerContainer"
        class="register-container"
      >
        <h4 style="text-align:center;">Beginne kostenlos und ohne Anmeldung mit der Planung deiner eigenen Reise</h4>
        <q-btn
          @click="createDemoRTClicked()"
          color="primary"
          style="font-size:18px;"
        >Reise selbst Planen</q-btn>
      </div> -->
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
      <div
        class="flex"
        id="scroll-container"
      >
        <div class="scroll-col left-scroll-col flex justify-center">
          <Map
            profile="driving"
            :stops="demoStops"
            :childrenAges="[]"
            :rooms="1"
            :adults="2"
            :editor="true"
            height="70vh;"
            :isDemo="true"
            width="100%"
            v-show="scrollSectionVisibleIndex === 0"
          ></Map>
          <div v-show="scrollSectionVisibleIndex === 1">
            <q-list
              bordered
              padding
              dense
              class="rounded-borders"
            >
              <q-item class="hotel-list">
                <q-item-section
                  avatar
                  top
                >
                  <q-avatar
                    color="secondary"
                    text-color="white"
                    font-size="20px"
                    icon="hotel"
                  >
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label
                    lines="2"
                    class="flex"
                    style="flex-wrap:wrap; white-space:normal;"
                  >
                    <span style="padding-right:5px;">Hotel Lutetia</span>
                    <q-rating
                      class="stars"
                      v-model="demoStars"
                      readonly
                      size="15px"
                      color="gold"
                      style="margin-right:10px; padding-right:5px;"
                    />
                    <div
                      class="flex"
                      style="flex-wrap:wrap; white-space:normal;"
                    >
                      <span class="raleway">
                        8.9,&nbsp;
                      </span>
                      <span>
                        <span class="raleway">ca. € </span>
                        <span class="raleway">602</span>
                        <q-tooltip>ungefährer Durchschnittspreis pro Person & Nacht</q-tooltip>
                      </span>
                    </div>
                  </q-item-label>
                  <q-item-label
                    caption
                    style="overflow:hidden;"
                  >
                    <a
                      class="ellipsis"
                      @click="openInNewTab('https://www.google.com/maps/search/?api=1&query=Hotel Lutetia, Paris')"
                    >06. Arrondissement</a>
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div>
                    <q-chip
                      icon="link"
                      dense
                      class="linkChip"
                      clickable
                      @click="openInNewTab('https://www.hotellutetia.com/')"
                    >Hotelwebsite</q-chip>
                  </div>
                  <q-chip
                    icon="launch"
                    dense
                    style="width:117px;"
                    class="linkChip"
                    clickable
                    @click="openInNewTab('https://www.booking.com/hotel/fr/lutetia-paris12.de.html')"
                  > booking.com
                    <q-tooltip>Hotel auf booking.com</q-tooltip>
                  </q-chip>
                </q-item-section>

                <q-item-section side>
                  <q-icon
                    name="clear"
                    color="primary"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <TripOverviewList
            v-show="scrollSectionVisibleIndex === 2"
            :addedStops="demoStops"
            :currentRoundtrip="demoRoundtrip"
          ></TripOverviewList>
        </div>
        <div class="scroll-col right-scroll-col">
          <div class="section-1">
            <h5>Reiseziele wählen</h5>
            <p>Mit dem Klick auf eine Stadt auf der Karte kannst du diese sofort hinzufügen</p>
            <p>Außerdem kannst du dir automatisch die beliebtesten Städte vorgeschlagen lassen, solltest du ein wenig inspiration brauchen.</p>
            <p>Zu jeder Stadt werden dir Bilder und die besten Sehenswürdigkeiten angezeigt, damit du alles auf einen Blick vergleichen kannst.</p>
            <div
              class="flex"
              style="padding-top:20px;"
            >
              <a
                @click="$router.push('/rundreisen-wizard')"
                class="font-medium"
              >Zum Reiseplaner</a>
              <div
                class="flex justify-center"
                style="flex-direction:column;"
              >
                <q-icon
                  name="arrow_right_alt"
                  color="primary"
                  size="30px"
                />
              </div>
            </div>
          </div>
          <div class="section-2">
            <h5>Details eingeben</h5>
            <p>Wenn du einen Stopp hinzufügst kannst du ganz individuell alles rund um das Ziel anpassen.</p>
            <p>Natürlich kannst du hier auch ein Hotel hinzufügen, welches du bei den bekanntesten Anbietern buchen kannst.</p>
            <p>Die Daten für die Hotelsuche musst du nur einmal eingeben, so sparst du dir eine Menge Zeit!</p>
            <div
              class="flex"
              style="padding-top:20px;"
            >
              <a
                @click="$router.push('/rundreisen-wizard')"
                class="font-medium"
              >Zum Reiseplaner</a>
              <div
                class="flex justify-center"
                style="flex-direction:column;"
              >
                <q-icon
                  name="arrow_right_alt"
                  color="primary"
                  size="30px"
                />
              </div>
            </div>
          </div>
          <div class="section-3">
            <TripOverviewList
              style="margin-top:50px;"
              v-show="isMobile"
              :addedStops="demoStops"
              :currentRoundtrip="demoRoundtrip"
            ></TripOverviewList>
            <h5>Reiseübersicht</h5>
            <p>Am Schluss deiner Reiseplanung erhältst du eine übersichtliche Zusammenfassung deiner Reise mit all deinen Stopps und Routen.</p>
            <p>Du kannst dir auch automatisch die kürzeste Route errechnen lassen.</p>
            <p>Wenn du möchtest kannst du auch deine Reise auf Roundtrips4you veröffentlichen um sie der ganzen Welt zu zeigen.</p>
            <div
              class="flex"
              style="padding-top:20px;"
            >
              <a
                @click="$router.push('/rundreisen-wizard')"
                class="font-medium"
              >Zum Reiseplaner</a>
              <div
                class="flex justify-center"
                style="flex-direction:column;"
              >
                <q-icon
                  name="arrow_right_alt"
                  color="primary"
                  size="30px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

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
      description: { name: 'description', content: 'Orte planen, Hotels finden, Reisen teilen und die beste Route finden. Reise mit unserem Reiseplaner kostenlos erstellen & online planen' }
    }
  },
  name: 'PageIndex',
  data () {
    return {
      date: '2019/02/01',
      searchLocation: '',
      imgLoaded: false,
      title: 'Meine Reise',
      scrollSectionVisibleIndex: 0,
      demoStops: [
        {
          Title: 'Stopp in Paris',
          Description: 'Raum für Notizen, Beschreibungen...',
          Location: { lat: 48.856613, lng: 2.352222, label: 'Paris, Frankreich' },
          Sights: [],
          InitDate: '23.03.2021',
          Profile: 'driving',
          DayDuration: 1
        },
        {
          Title: 'Stopp in Straßburg',
          Description: 'Raum für Notizen, Beschreibungen...',
          Location: { lat: 48.582951, lng: 7.743750, label: 'Straßburg, Frankreich' },
          Sights: [],
          InitDate: '24.03.2021',
          Profile: 'driving',
          DayDuration: 1
        },
        {
          Title: 'Stopp in Lyon',
          Description: 'Raum für Notizen, Beschreibungen...',
          Location: { lat: 45.764042, lng: 4.835659, label: 'Lyon, Frankreich' },
          Sights: [],
          InitDate: '24.03.2021',
          Profile: 'driving',
          DayDuration: 1
        }],
      demoRoundtrip: { Title: 'Meine Reise' },
      demoStars: 5
    }
  },
  components: {
    Map: () => import('../components/Map/Map.vue'),
    TripOverviewList: () => import('../components/TripOverview/TripOverviewList.vue')
  },
  computed: {
    sharedMethods () {
      return sharedMethods
    },
    isMobile () {
      return window.matchMedia('(max-width: 550px)').matches
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    scrollTo (refName) {
      var el = this.$refs[refName]
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 400
      setScrollPosition(target, offset, duration)
    },
    openInNewTab (link) {
      window.open(link, '_blank')
    },
    /**
     * method checks which scroll section should be shown in scroll container
     * @returns the index of the section
     */
    handleScroll () {
      let leftScrollCol = document.getElementsByClassName('left-scroll-col')[0]
      let rightScrollCol = document.getElementsByClassName('right-scroll-col')[0]
      if (!rightScrollCol) return false

      let sections = rightScrollCol.children

      let offsets = []
      sections.forEach(section => {
        offsets.push(Math.abs(section.offsetTop - leftScrollCol.offsetTop))
      })

      let minOffset = Math.min.apply(null, offsets)

      this.scrollSectionVisibleIndex = offsets.indexOf(minOffset)
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
