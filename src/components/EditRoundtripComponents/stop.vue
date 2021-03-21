<template>
  <q-timeline-entry
    :ref="lastItem ? 'lastTimelineEntry' : null"
    icon="location_on"
  >
    <div class="stop-container">
      <h6
        class="q-timeline__title"
        style="margin-bottom:0;"
      >{{titleInput}}</h6>
      <div
        class="flex q-timeline__subtitle"
        style="padding-top:0;"
      >
        <a @click="editor ? editLocation = true : openInNewTab('https://www.google.com/maps/search/?api=1&query=' + location.label)">
          <q-icon name="location_on" />
          {{location && typeof location !== 'undefined' && location.label && typeof location.label !== 'undefined' ? location.label.split(',')[0] : ( editor ? 'Ort hinzufügen' : 'kein Ort angegeben')}}
          <q-tooltip v-if="location && location.label">{{location.label}}</q-tooltip>
        </a>
      </div>
      <Uploader
        :RTId="RTId"
        :stopImages="stopImages ? stopImages : null"
        :uploadDisabled="true"
      />
      <div
        v-if="addedSights && addedSights.length > 0"
        class="flex"
        style="margin-bottom:10px;"
      >
        <b
          class="flex justify-center"
          style="flex-direction:column;"
        >gemerkte Orte:</b>
        <q-chip
          v-for="(addedSight, index) in addedSights"
          :key="index"
          clickable
          @click="$refs.sightDialog.openSightDialog(addedSight)"
        >{{addedSight}}</q-chip>
      </div>
    </div>
    <SightDialog
      :addAble="false"
      ref="sightDialog"
    >
    </SightDialog>
    <q-list
      bordered
      class="rounded-borders"
    >
      <q-expansion-item
        expand-separator
        v-model="expanded"
        @input="$emit('expansionChanged', { expanded: expanded, docId: stopObject.DocId })"
        :label="(stopObject.HotelName ? '1 Hotel' : 'Weitere Infos') + (dailyTrips.length ? ' & ' + dailyTrips.length + (dailyTrips.length === 1 ? ' Tagesausflug' : ' Tagesausflüge') : '')"
        :caption="days !== null ?  'ca. ' + days + ' Aufenthalt' : ( firstStop || lastItem || stopObject.Profile === 'plane' ? '' : 'keine Verbleibende Zeit für den Aufenthalt')"
        :class="'stop-expansion-item ' + (days === null && !firstStop && !lastItem && stopObject.Profile !== 'plane' ? 'error-color' : '' )"
      >
        <div>
          <q-chip
            v-if="editor"
            icon="local_parking"
            :clickable="editor"
            @click="editParkingPlace = true"
          >{{ parkingPlace && typeof parkingPlace !== 'undefined' &&  parkingPlace.label && typeof parkingPlace.label !== 'undefined' ?  parkingPlace.label.split(',')[0] : 'Parkplatz hinzufügen'}}
            <!-- <q-icon
              v-if="editor"
              name="edit"
            /> -->
          </q-chip>
        </div>
        <div>
          <!-- <q-chip
            v-else-if="editor"
            clickable
            @click="searchSights()"
          >{{sights === 'error' ? 'keine POIs gefunden' : 'POIs anzeigen'}}
            <q-tooltip>Sehenswürdigkeiten anzeigen</q-tooltip>
          </q-chip> -->
          <!-- <div
            v-if="editor"
            class="flex"
            style="flex-wrap"
          >
            <q-select
              label="Sehenswürdigkeiten"
              filled
              v-model="addedSights"
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add-unique"
              style="margin:10px 10px 10px 0; width:260px;"
              @blur="saveSights()"
              ref="sightInput"
            >
              <template v-slot:prepend>
                <q-icon
                  name="add"
                  @click.stop
                />
              </template>
            </q-select>
          </div> -->
          <!-- <div
            class="flex"
            v-else-if="addedSights && typeof addedSights !== 'undefined' && addedSights.length > 0"
            style="padding-bottom:10px;"
          >
            <b
              class="flex justify-center"
              style="flex-direction:column;"
            >Highlights:</b>
            <q-chip
              v-for="(addedSight, index) in addedSights"
              :key="index"
              clickable
              @click="openInNewTab('https://www.google.com/search?q=' + addedSight + ' ' + location.label.split(',')[0])"
            >{{addedSight}}</q-chip>
            <a
              class="flex justify-center"
              style="flex-direction:column; text-decoration:none;"
              target="_blank"
              :href="'https://www.google.com/search?q=' + location.label.split(',')[0] + ' Sehenswürdigkeiten'"
            >weitere anzeigen</a>
          </div> -->
          <!-- Hotel data here -->
          <div>
            <q-list
              bordered
              padding
              dense
              class="rounded-borders"
              v-if="stopObject.HotelName"
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
                    <span style="padding-right:5px;">{{sharedMethods.capitalize(stopObject.HotelName)}}</span>
                    <q-rating
                      v-if="hotelStars && !isNaN(hotelStars)"
                      class="stars"
                      v-model="hotelStars"
                      readonly
                      size="15px"
                      color="gold"
                      style="margin-right:10px; padding-right:5px;"
                    />
                    <div
                      class="flex"
                      style="flex-wrap:wrap; white-space:normal;"
                    >
                      <span
                        v-if="stopObject.GuestRating"
                        class="raleway"
                      >
                        {{stopObject.GuestRating}},&nbsp;
                      </span>
                      <span v-if="stopObject.HotelPrice">
                        <span class="raleway">ca. € </span>
                        <span class="raleway">{{stopObject.HotelPrice}}</span>
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
                      @click="openInNewTab('https://www.google.com/maps/search/?api=1&query=' + capitalize(stopObject.HotelName + ', ' + stopObject.HotelLocation.label))"
                    >{{stopObject.HotelLocation && typeof stopObject.HotelLocation !== 'undefined' && stopObject.HotelLocation.label && typeof stopObject.HotelLocation.label !== 'undefined' ? capitalize(stopObject.HotelLocation.label) :  'kein Ort angegeben'}}</a>
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-btn
                    v-if="stopObject.TransportLocations && stopObject.TransportLocations.length > 0"
                    style="width:150px;"
                    @click="showTransportDialog = true"
                  >Transport
                  </q-btn>
                </q-item-section>
                <q-dialog v-model="showTransportDialog">
                  <q-card>
                    <q-card-section
                      class="row items-center flex"
                      style="flex-direction:column;"
                    >
                      <q-list>
                        <div
                          class="flex"
                          style="flex-direction:column;"
                          v-for="location in stopObject.TransportLocations"
                          :key="location"
                        >
                          <q-item
                            v-for="sublocation in location.locations"
                            :key="sublocation"
                            clickable
                            @click="openInNewTab('https://www.google.com/maps/search/?api=1&query=' + sublocation.name)"
                          >
                            <q-item-section>
                              <span>
                                <q-icon :name="getHotelTransportationIcon(location.category)" />
                                <span>{{sublocation.name}}</span>
                              </span>
                              <p>{{sublocation.distanceInTime}}</p>
                            </q-item-section>
                          </q-item>
                        </div>
                      </q-list>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn
                        flat
                        label="OK"
                        color="primary"
                        v-close-popup
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
                <q-item-section side>
                  <div v-if="stopObject.GeneralTempLink && stopObject.GeneralTempLink.length > 0">
                    <q-chip
                      icon="link"
                      dense
                      class="linkChip"
                      clickable
                      @click="openInNewTab(stopObject.GeneralTempLink)"
                    >Hotelwebsite</q-chip>
                  </div>
                  <q-chip
                    icon="launch"
                    v-if="stopObject.HotelName"
                    dense
                    style="width:117px;"
                    class="linkChip"
                    clickable
                    @click="openInNewTab('https://www.booking.com/searchresults.de.html?ss=' + capitalize(stopObject.HotelName) + '&checkin_year=' + date.split(' ')[0].split('.')[2] + '&checkin_month=' + date.split('.')[1] + '&checkin_monthday=' + date.split('.')[0] + '&checkout_year=' + checkOutDate.split('.')[2] + '&checkout_month=' + checkOutDate.split('.')[1] + '&checkout_monthday=' + checkOutDate.split('.')[0] + '&group_adults=' + adults + getChildrenText() +  '&no_rooms=' + rooms + '&ac_langcode=de')"
                  > booking.com
                    <q-tooltip>Hotel auf booking.com</q-tooltip>
                  </q-chip>
                  <q-chip
                    icon="launch"
                    v-if="stopObject.HotelName"
                    dense
                    style="width:117px;"
                    class="linkChip"
                    clickable
                    @click="openInNewTab('https://www.expedia.de/Hotel-Search?adults=' + adults + 'children=' + getExpediaChildrenText() + '%2C1_3&destination=' + capitalize(stopObject.HotelName) + '&endDate=' + checkOutDate.split(' ')[0].split('.')[2] + '-' + checkOutDate.split('.')[1] + '-' + checkOutDate.split('.')[0] + '&rooms=' + rooms + '&sort=RECOMMENDED&startDate=' + date.split(' ')[0].split('.')[2] + '-' + date.split('.')[1] + '-' + date.split('.')[0] + '&theme=&useRewards=true')"
                  > expedia
                    <q-tooltip>Hotel auf expedia</q-tooltip>
                  </q-chip>
                </q-item-section>
                <q-item-section
                  side
                  v-if="stopObject.HotelContact"
                >
                  <div class="hotel-contact">
                    <q-chip
                      v-if="stopObject.HotelContact.email"
                      icon="email"
                      clickable
                      @click="openInNewTab('mailto:' + stopObject.HotelContact.email)"
                    >{{ stopObject.HotelContact.email}}
                    </q-chip>
                    <q-chip
                      icon="phone"
                      v-if="stopObject.HotelContact.phone"
                      clickable
                      @click="openInNewTab('tel:' + stopObject.HotelContact.phone)"
                    >{{stopObject.HotelContact.phone}}
                    </q-chip>
                  </div>
                </q-item-section>

                <!-- <q-item-section
                  side
                  v-if="editor"
                >
                  <q-icon
                    name="clear"
                    color="primary"
                    @click="removeHotel()"
                  />
                </q-item-section> -->
              </q-item>
            </q-list>
          </div>
          <div
            style="margin-top:10px; margin-bottom:20px;"
            v-if="!editor"
            v-html="descriptionInput"
          ></div>
          <!-- <q-editor
            v-else
            v-model="descriptionInput"
            min-height="5rem"
            ref="editor_ref"
            @keyup.enter.stop
            :toolbar="editorToolbar"
            toolbar-toggle-color="primary"
            :fonts="editorFonts"
            @blur="saveWork()"
            @paste.native="evt => pasteCapture(evt)"
            style="margin-top:10px; margin-bottom:10px;"
            :definitions="{
        format: {
          top: 'Formatierung bei Kopieren beibehaten',
          icon: $q.iconSet.editor.formatting,
          label: 'Format bei Kopie ' + (this.preventPasting ? 'aus' : 'an'),
          handler: formatOn
        }
        }"
          /> -->

          <!-- <q-dialog
            keep-alive
            v-model="chooseImgDialog"
          >
            <q-card>
              <q-card-section class="row items-center galeryImgUploaderContainer flex justify-between">
                <div
                  class="uploader"
                  v-for="(url, index) in galeryImgUrls"
                  :key="index"
                >
                  <img
                    style="width:100%;"
                    v-lazy="url"
                  />
                  <q-btn
                    round
                    color="primary"
                    icon="add"
                    style="position: absolute;"
                    @click="addImageToStop(url)"
                  >
                  </q-btn>
                </div>
                <div
                  v-if="galeryImgUrls.length === 0"
                  class="flex"
                >
                  <div>
                    <q-img
                      src="../../statics/dummy-image-landscape-1.jpg"
                      style="height:148px; width:148px;"
                    ></q-img>
                  </div>
                  <div
                    class="flex justify-center"
                    style="max-width:300px; padding-left:10px; flex-direction:column;"
                  >Wenn du ein Bild in den Einstellungen hochlädst kannst du es hier hinzufügen.</div>
                </div>
              </q-card-section>
              <q-card-section class="row items-center flex">
                <span>Bitte verwende nur Bilder die für die Wiederverwendung eindeutig gekennzeichnet sind. <br> Ansonsten kann dein Account gesperrt werden. <br>
                  <br>
                  <a
                    style="text-decoration:underline;"
                    @click="openInNewTab('https://www.google.com/search?q=' + location.label  + '&tbm=isch&hl=de&hl=de&tbs=sur%3Af&rlz=1C1CHBF_deDE828DE828&ved=0CAQQpwVqFwoTCLCZ05jd2-cCFQAAAAAdAAAAABAD&biw=1903&bih=969')"
                  >Bildvorschläge auf Google</a>
                  <br>
                  <br>
                </span>
                <div
                  class="flex"
                  style="width:100%;"
                >
                  <q-input
                    filled
                    ref="tempImgLinkInput"
                    label="Bild per Link einfügen"
                    v-model="tempImgLink"
                    :rules="[val => validURL(val) || 'Bitte gib einen richtigen Link ein']"
                    lazy-rules
                    bottom-slots
                    outlined
                    style="padding:0; width:80%; margin-bottom:10px;"
                  ></q-input>
                  <q-btn
                    round
                    color="primary"
                    icon="add"
                    style="margin-left:10px; margin-top:5px; height:45px;"
                    :disable="!validURL(tempImgLink)"
                    @click="addImageToStop(tempImgLink)"
                  />
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Fertig"
                  color="primary"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog> -->
          <div
            v-if="expanded"
            class="daily-trip-container"
            v-show="dailyTrips.length"
          >
            <DailyTrip
              style="margin-top:10px;"
              v-for="(dailyTrip, index) in dailyTrips"
              :key="dailyTrip.id + index"
              :dailyTrip="dailyTrip"
              :editorToolbar="editorToolbar"
              :editorFonts="editorFonts"
              :stopDocId="stopObject.DocId"
              :index="index"
              :newDailyTripDate="dailyTrip.newDate ? dailyTrip.newDate : false"
              :duration="dailyTrip.duration"
              :editor="editor"
              :addedSights="dailyTrip.addedSights"
              :galeryImgUrls="galeryImgUrls"
              :dateOptions="dailyTripDateOptions"
            ></DailyTrip>
          </div>
          <!-- <div
            v-if="editor"
            class="flex justify-center"
            style="padding-top:30px;"
          >
            <q-btn
              class="add-daily-trip-button"
              side
              color="secondary"
              icon="add"
              @click="addDailyTripDialogVisible = true"
            >Tagesausflug
              <q-tooltip>Stopp ohne Übernachtung hinzufügen</q-tooltip>
            </q-btn>
          </div> -->
        </div>
        <!-- Place for add daily trip dialog -->
        <q-dialog v-model="addDailyTripDialogVisible">
          <q-card style="width:100%; max-width:100vh; overflow:hidden;">
            <q-card-section class="daily-trip-dialog-section">
              <q-input
                filled
                v-model="tempDailyTripDate"
                error-message="Bitte gib ein richtiges Datum an"
                :error="!sharedMethods.isDateTimeValid()"
                lazy-rules
                bottom-slots
                style="width:300px"
                class="input-item"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="event">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="tempDailyTripDate"
                        today-btn
                        mask="DD.MM.YYYY HH:mm"
                        :options="dailyTripDateOptions"
                      />
                    </q-popup-proxy>
                  </q-icon>
                  <q-tooltip>Datum ändern</q-tooltip>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="tempDailyTripDate"
                        mask="DD.MM.YYYY HH:mm"
                        format24h
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <CitySearch
                ref="citySearch"
                :parkingPlaceSearch="false"
                @update="updateDailyTripLocation($event)"
              ></CitySearch>
              <q-select
                outlined
                v-model="dailyTripProfile"
                :options="['zu Fuß', 'Fahrrad', 'Auto']"
                label="Reisemittel"
                use-input
                :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Reisemittel']"
                class="input-item"
              >
                <template v-slot:prepend>
                  <q-icon name="commute" />
                </template>
              </q-select>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                flat
                label="Abbrechen"
                color="primary"
                v-close-popup
              />
              <q-btn
                flat
                label="Hizufügen"
                color="primary"
                @click="addDailyTrip()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-expansion-item>
    </q-list>
    <template v-slot:subtitle>
      <span class="q-timeline__title">
        {{date !== null && typeof date !== 'undefined' && date.length > 0 ? date.split(' ')[0]: date}}
        <!-- <q-popup-proxy
          v-if="editor"
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
          persistent
        >
          <q-date
            v-model="date"
            today-btn
            mask="DD.MM.YYYY HH:mm"
          />
          <div
            class="flex justify-between"
            style="width:100%"
          >
            <q-btn
              style="margin:10px;"
              v-close-popup
              @click="date = oldDate"
            >abbrechen</q-btn>
            <q-btn
              color="primary"
              style="margin:10px;"
              @click="[saveDate(false), $refs.qTimeProxy.show()]"
              v-close-popup
            >weiter</q-btn>
          </div>
        </q-popup-proxy> -->
        <!-- <q-icon
          v-if="editor"
          size="16px"
          name="event"
        /> -->
      </span>
      <span
        class="q-timeline__title"
        style="padding-right:10px;"
      >
        {{date !== null && date.length > 0 ? date.split(' ')[1]: date}}
        <!-- <q-popup-proxy
          v-if="editor"
          ref="qTimeProxy"
          transition-show="scale"
          transition-hide="scale"
          persistent
        >
          <q-time
            v-model="date"
            mask="DD.MM.YYYY HH:mm"
            format24h
          />
          <br>
          <q-toggle
            v-model="changeAllDatesActive"
            label="Alle Daten ändern"
            icon="update"
          >
            <q-tooltip>
              Aktivieren um alle nachfolgenden Daten ebenfalls zu ändern
            </q-tooltip>
          </q-toggle>
          <div
            class="flex justify-between"
            style="width:100%"
          >
            <q-btn
              style="margin:10px;"
              v-close-popup
              @click="date = oldDate"
            >abbrechen</q-btn>
            <q-btn
              color="primary"
              style="margin:10px;"
              @click="saveDate(true)"
              v-close-popup
            >fertig</q-btn>
          </div>
        </q-popup-proxy> -->
        <!-- <q-icon
          v-if="editor"
          size="16px"
          name="access_time"
        /> -->
      </span>
      <!-- <span class="q-timeline__title">{{days !== null ?  'ca. ' + days + ' Aufenthalt' : ( firstStop || lastItem ? '' : 'keine Verbleibende Zeit für den Aufenthalt') }}</span> -->
    </template>
  </q-timeline-entry>
</template>
<script>
import { db } from '../../firebaseInit.js'
import { date, scroll } from 'quasar'
import axios from 'axios'
import sharedMethods from '../../sharedMethods'

const { setScrollPosition } = scroll

let timeStamp = Date.now()
let lastDailyTripDate = null

export default {
  name: 'stop',
  components: {
    CitySearch: () => import('../Map/CitySearch'),
    // HotelSearch: () => import('../Map/HotelSearch'),
    DailyTrip: () => import('./dailyTrip'),
    Uploader: () => import('../Uploader/Uploader.vue'),
    SightDialog: () => import('../CitySuggestion/SightDialog.vue')
  },
  computed: {
    sharedMethods () {
      return sharedMethods
    }
  },
  props: {
    RTId: String,
    stopObject: Object,
    date: String,
    editor: Boolean,
    location: Object,
    days: String,
    parkingPlace: Object,
    lastItem: Boolean,
    hotelStars: Number,
    checkOutDate: String,
    adults: Number,
    childrenAges: Array,
    rooms: Number,
    firstStop: Boolean,
    galeryImgUrls: Array,
    stopImages: Array,
    addedSights: Array,
    dailyTrips: Array,
    nextStopDate: String,
    profile: String
  },
  watch: {
    date: function (newVal, oldVal) {
      this.tempDailyTripDate = this.date
    }
  },
  data () {
    return {
      titleInput: this.stopObject.Title,
      descriptionInput: this.stopObject.Description,
      showDateEntry: true,
      showTimeEntry: false,
      preventPasting: false,
      editParkingPlace: false,
      tempParkingPlace: {},
      editLocation: false,
      tempLocation: {},
      savedEditorContent: this.stopObject.Description,
      sights: null,
      chooseImgDialog: false,
      tempImgLink: null,
      dialogImgSrc: null,
      imgDialogVisible: false,
      oldAddedSights: [],
      addHotel: false,
      generalTempLink: '',
      formattedDate: date.formatDate(timeStamp, 'DD.MM.YYYY'),
      addDailyTripDialogVisible: false,
      tempDailyTripLocation: null,
      tempDailyTripDate: this.date,
      dailyTripProfile: 'Auto',
      expanded: false,
      changeAllDatesActive: false,
      oldDate: null,
      showTransportDialog: false,
      addHotelDisabled: true,

      editorFonts: {
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      },
      editorToolbar: [
        [
          {
            label: '',
            icon: this.$q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['fullscreen'],
        [
          {
            label: 'Größe',
            icon: this.$q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: 'Schrift',
            icon: this.$q.iconSet.editor.font,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          }
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['format', 'image'],
        ['undo', 'redo']
      ]
    }
  },
  methods: {
    isDateTimeValid () {
      return sharedMethods.isDateTimeValid(this.tempDailyTripDate)
    },
    saveDate (refresh) {
      const lastScrollPos = document.documentElement.scrollTop
      let newInitDate = sharedMethods.getDateFromString(this.date)

      // time entry also has changed
      if (refresh) {
        if (this.changeAllDatesActive) this.changeAllDates()
        else this.oldDate = this.date
      }

      let context = this
      db.collection('RoundtripDetails').doc(this.stopObject.DocId).update({
        'InitDate': newInitDate
      }).then(function () {
        if (refresh && !context.changeAllDatesActive) {
          // resort stops and prepare views with new array
          context.getParent('EditRoundtrips').resortAndPrepareStops(newInitDate, context.stopObject.DocId)
        }
        setTimeout(function () {
          sharedMethods.scrollToOffset(lastScrollPos)
        }, 500)
      })
    },
    getDailyTripDuration (startLocation, endLocation, dailyStopProfile, index, cityFromLabel, defaultCityLabel, trip) {
      var url = 'https://api.mapbox.com/directions/v5/mapbox/' + dailyStopProfile + '/' + startLocation[0] + ',' + startLocation[1] + ';' + endLocation[0] + ',' + endLocation[1] + '?geometries=geojson&access_token=' + this.$store.getters['api/getMapboxKey']

      axios.get(url)
        .then(response => {
          var data = response.data.routes[0]

          if (data !== null && typeof data !== 'undefined') {
            let duration = sharedMethods.msToTime(data.duration * 1000)

            let distance = Math.floor(data.distance / 1000) > 0 ? Math.floor(data.distance / 1000) + ' km' : ''
            if (distance !== '') distance = ' (' + distance + ')'

            this.dailyTrips[index].duration = { duration: duration, distance: distance, cityFromLabel: cityFromLabel, defaultCityLabel: defaultCityLabel }
            if (this.dailyTrips[index + 1] && !this.dailyTrips[index + 1].newDate) this.getDailyTripDays(trip, index, data.duration)
            else if (index === this.dailyTrips.length - 1) this.dailyTrips.sort(this.compare)
            else {
              // if its the last item resort daily trips to force a refresh
              if (index === this.dailyTrips.length - 1) this.dailyTrips.sort(this.compare)
            }
          } else {
            this.dailyTrips[index].duration = { duration: null, distance: null, cityFromLabel: null, defaultCityLabel: null }
            if (this.dailyTrips[index + 1]) this.getDailyTripDays(trip, index, null)
          }
        }).catch(exception => {
          console.log(exception)
          this.dailyTrips[index].duration = { duration: null, distance: null, cityFromLabel: null, defaultCityLabel: null }
        })
    },
    getDailyTripDays (trip, index, duration) {
      let dailyTripDays = null

      let dateTimeParts = trip.date.split(' ')
      let dateParts = dateTimeParts[0].split('.')
      let timeParts = dateTimeParts[1].split(':')
      let currentInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

      dateTimeParts = this.dailyTrips[index + 1].date.split(' ')
      dateParts = dateTimeParts[0].split('.')
      timeParts = dateTimeParts[1].split(':')
      let nextInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

      let dateDistance = 0
      if (duration) dateDistance = (nextInitDate.valueOf() - currentInitDate.valueOf()) - duration
      else dateDistance = nextInitDate.valueOf() - currentInitDate.valueOf()

      dailyTripDays = sharedMethods.msToTime(dateDistance)

      this.dailyTrips[this.dailyTrips.findIndex(x => x.id === trip.id)].days = { days: dailyTripDays, id: trip.id }
    },
    validURL (str) {
      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
      return !!pattern.test(str)
    },
    getChildrenText () {
      let text = '&group_children=' + this.childrenAges.length
      this.childrenAges.forEach(child => {
        text += '&age=' + child
      })
      return text
    },
    getExpediaChildrenText () {
      let text = null
      this.childrenAges.forEach((childAge, index) => {
        text += (index !== 0 ? '_' : '') + childAge
      })
      return text
    },
    updateHotelData (event) {
      if (event !== null) {
        this.addHotelDisabled = true
        let hotelLat = event.latitude
        let hotelLng = event.longitude

        this.stopObject.HotelName = event.name

        if (event.destinationId) {
          axios.get('https://hotels4.p.rapidapi.com/properties/get-details?locale=de_DE&currency=EUR&id=' + event.destinationId, {
            headers: {
              'content-type': 'application/octet-stream',
              'x-rapidapi-host': 'hotels4.p.rapidapi.com',
              'x-rapidapi-key': this.$store.getters['api/getHotels4Key'],
              'useQueryString': true
            }
          })
            .then((response) => {
              console.log(response)

              let body = response.data.data.body
              let propertyDescription = body.propertyDescription

              let label = propertyDescription.address.fullAddress

              let avgPrice = propertyDescription.featuredPrice.currentPrice.plain

              let guestRating = body.guestReviews.brands.formattedRating + ' ' + body.guestReviews.brands.badgeText

              let transportLocations = response.data.transportation.transportLocations

              this.writeHotelData(label, hotelLat, hotelLng, propertyDescription.starRating, avgPrice, guestRating, transportLocations)
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.writeHotelData(event.label, hotelLat, hotelLng, null, null, null, null)
        }
      }
    },
    writeHotelData (label, lat, lng, rating, price, guestRating, transportLocations) {
      this.stopObject.HotelLocation = {
        lng: lat,
        lat: lng,
        label: label
      }

      price && typeof price !== 'undefined' ? this.stopObject.HotelPrice = price : this.stopObject.HotelPrice = null

      guestRating && typeof guestRating !== 'undefined' ? this.stopObject.GuestRating = guestRating : this.stopObject.GuestRating = null

      typeof transportLocations !== 'undefined' ? this.stopObject.TransportLocations = transportLocations : this.stopObject.TransportLocations = null

      rating && typeof rating !== 'undefined' ? this.hotelStars = rating : this.hotelStars = null

      this.addHotelDisabled = false

      // if (contact) this.hotelContact = contact
    },
    getHotelTransportationIcon (category) {
      switch (category) {
        case 'airport':
          return 'flight'
        case 'train-station':
          return 'train'
        case 'metro':
          return 'subway'
        default:
          return 'cummute'
      }
    },
    changeExpansion (expanded) {
      this.expanded = expanded
    },
    addHotelToStop () {
      console.log(this.stopObject.TransportLocations)
      db.collection('RoundtripDetails').doc(this.stopObject.DocId).update({
        HotelLocation: this.stopObject.HotelLocation,
        HotelStars: this.hotelStars,
        HotelContact: this.stopObject.HotelContact,
        HotelName: this.stopObject.HotelName,
        GeneralLink: this.stopObject.GeneralTempLink,
        CheckOutDate: this.checkOutDate,
        HotelPrice: this.stopObject.HotelPrice,
        GuestRating: this.stopObject.GuestRating,
        TransportLocations: this.stopObject.TransportLocations

      }).then(results => {
        this.generalLink = this.stopObject.GeneralTempLink

        let parentStops = this.getParent('EditRoundtrips').stops
        let parentStop = parentStops[parentStops.findIndex(x => x.DocId === this.stopObject.DocId)]
        parentStop.HotelLocation = this.stopObject.HotelLocation
        parentStop.HotelStars = this.hotelStars
        parentStop.HotelContact = this.stopObject.HotelContact
        parentStop.HotelName = this.stopObject.HotelName
        parentStop.GeneralLink = this.stopObject.GeneralTempLink
        parentStop.CheckOutDate = this.checkOutDate
        parentStop.HotelPrice = this.stopObject.HotelPrice
        parentStop.GuestRating = this.stopObject.GuestRating

        console.log(parentStops.TransportLocations)
        console.log(this.stopObject.TransportLocations)
        parentStops.TransportLocations = this.stopObject.TransportLocations

        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Hotel wurde hinzugefügt'
        })
      })
    },
    removeHotel () {
      db.collection('RoundtripDetails').doc(this.stopObject.DocId).update({
        HotelLocation: null,
        HotelStars: null,
        HotelContact: null,
        HotelName: null,
        GeneralLink: null,
        HotelPrice: null,
        GuestRating: null,
        TransportLocations: null

      }).then(results => {
        this.stopObject.HotelName = null

        let parentStops = this.getParent('EditRoundtrips').stops
        let parentStop = parentStops[parentStops.findIndex(x => x.DocId === this.stopObject.DocId)]
        parentStop.HotelLocation = null
        parentStop.HotelStars = null
        parentStop.HotelContact = null
        parentStop.HotelName = null
        parentStop.GeneralLink = null
        parentStop.CheckOutDate = null
        parentStop.HotelPrice = null
        parentStop.GuestRating = null
        parentStop.TransportLocations = null

        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Hotel wurde entfernt'
        })
      })
    },
    addDailyTrip () {
      let context = this
      if (this.tempDailyTripDate && this.tempDailyTripLocation && this.dailyTripProfile) {
        context.addDailyTripDialogVisible = false
        let createdStop = { id: this.dailyTrips.length, date: this.tempDailyTripDate, location: this.tempDailyTripLocation, descriptionInput: 'Tagesausflug nach ' + this.tempDailyTripLocation.label.split(',')[0], profile: this.getDailyTripProfile() }
        this.dailyTrips.push(createdStop)

        this.dailyTrips.sort(this.compare)
        this.dailyTrips.forEach((dailyTrip, index) => {
          dailyTrip.newDate = this.newDailyTripDate(dailyTrip.date)

          if (index === 0) {
            this.getDailyTripDuration([this.location.lng, this.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, 0, this.location.label, this.location.label, dailyTrip)
          } else {
            this.getDailyTripDuration([this.dailyTrips[index - 1].location.lng, dailyTrip.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.dailyTrips[index - 1].location.label, this.location.label, dailyTrip)
          }
        })

        db.collection('RoundtripDetails').doc(this.stopObject.DocId).update({
          DailyTrips: this.dailyTrips

        }).then(results => {
          sharedMethods.showSuccessNotification('Tagesausflug wurde hinzugefügt')
        })
      } else {
        sharedMethods.showErrorNotification('Bitte überprüfe deine Angaben')
      }
    },
    changeAllDates () {
      let millis = sharedMethods.getDateFromString(this.date).valueOf() - sharedMethods.getDateFromString(this.oldDate).valueOf()
      this.oldDate = this.date
      this.getParent('EditRoundtrips').changeAllFollowingStopDates(this.stopObject.DocId, millis, sharedMethods.getDateFromString(this.date))
    },
    openInNewTab (link) {
      window.open(link, '_blank')
    },
    deleteDailyTrip (index) {
      if (this.stopObject.DocId === null || this.stopObject.DocId === '' || this.stopObject.DocId === 'undefined') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht gelöscht werden'
        })
        return false
      }

      this.dailyTrips.splice(index, 1)

      this.dailyTrips.sort(this.compare)
      this.dailyTrips.forEach((dailyTrip, index) => {
        dailyTrip.newDate = this.newDailyTripDate(dailyTrip.date)

        if (index === 0) {
          this.getDailyTripDuration([this.location.lng, this.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.location.label, this.location.label, dailyTrip)
        } else {
          this.getDailyTripDuration([this.dailyTrips[index - 1].location.lng, dailyTrip.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.dailyTrips[index - 1].location.label, this.location.label, dailyTrip)
        }
      })

      db.collection('RoundtripDetails').doc(this.stopObject.DocId).update({
        DailyTrips: this.dailyTrips

      }).then(results => {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Tagesausflug wurde gelöscht'
        })
        return true
      })
    },
    saveSights () {
      if (this.addedSights !== this.oldAddedSights) {
        this.oldAddedSights = this.addedSights

        let parentStops = this.getParent('EditRoundtrips').stops
        parentStops[parentStops.findIndex(x => x.DocId === this.stopObject.DocId)].Sights = this.addedSights

        this.saveData('Sights', this.addedSights, false)
      }
    },
    newDailyTripDate (dateToCheck) {
      if (!lastDailyTripDate || dateToCheck.split(' ')[0] !== lastDailyTripDate.split(' ')[0]) {
        lastDailyTripDate = dateToCheck
        return true
      }
      return false
    },
    saveDailyTrips (index, value, field) {
      if (field === 'description') this.dailyTrips[index].descriptionInput = value
      else if (field === 'sights') this.dailyTrips[index].addedSights = value
      else if (field === 'date') this.dailyTrips[index].date = value

      this.saveData('DailyTrips', this.dailyTrips, false)
    },
    saveDailyTripImgs (index, images) {
      this.dailyTrips[index].stopImages = images
      this.saveData('DailyTrips', this.dailyTrips, false)
    },
    saveData (field, value, updateParent) {
      try {
        let context = this
        db.collection('RoundtripDetails').doc(this.stopObject.DocId).update({
          ['' + field]: value
        }).then(function () {
          if (field === 'Location') context.getParent('EditRoundtrips').fetchAndSaveCountries()
          if (updateParent) context.getParent('EditRoundtrips').fetchRoundtripStops(context.$route.params.id, false)
        })
      } catch (e) {
        console.log(e)
      }
    },
    scrollTo (offset) {
      const duration = 400
      setScrollPosition(document.documentElement, offset, duration)
    },
    saveWork () {
      this.saveSights()

      this.saveData('Description', this.descriptionInput, false)

      let parentStops = this.getParent('EditRoundtrips').stops
      parentStops[parentStops.findIndex(x => x.DocId === this.stopObject.DocId)].Description = this.descriptionInput

      this.savedEditorContent = this.descriptionInput
    },
    updateLocation (event) {
      if (event !== null && this.location.label !== event.label) {
        this.tempLocation = {
          lng: event.x,
          lat: event.y,
          label: event.label
        }
      }
    },
    updateParkLocation (event) {
      if (event !== null) {
        this.tempParkingPlace = {
          lng: event.x,
          lat: event.y,
          label: event.label
        }
      }
    },
    updateDailyTripLocation (event) {
      if (event !== null) {
        this.tempDailyTripLocation = {
          lng: event.x,
          lat: event.y,
          label: event.label
        }
      } else {
        this.tempDailyTripLocation = null
      }
    },
    getDailyTripProfile () {
      switch (this.dailyTripProfile) {
        case 'zu Fuß':
          return 'walking'
        case 'Fahrrad':
          return 'cycling'
        default:
          return 'driving'
      }
    },
    capitalize (s) {
      s = s.toLowerCase()
      s = s.charAt(0).toUpperCase() + s.slice(1)
      return s
    },
    formatOn () {
      this.preventPasting = !this.preventPasting
    },
    pasteCapture (evt) {
      if (this.preventPasting) {
        let text, onPasteStripFormattingIEPaste
        evt.preventDefault()
        if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
          text = evt.originalEvent.clipboardData.getData('text/plain')
          this.$refs.editor_ref.runCmd('insertText', text)
        } else if (evt.clipboardData && evt.clipboardData.getData()) {
          text = evt.clipboardData.getData('text/plain')
          this.$refs.editor_ref.runCmd('insertText', text)
        } else if (window.clipboardData && window.clipboardData.getData) {
          if (!onPasteStripFormattingIEPaste) {
            onPasteStripFormattingIEPaste = true
            this.$refs.editor_ref.runCmd('ms-pasteTextOnly', text)
          }
          onPasteStripFormattingIEPaste = false
        }
      }
    },
    showImgDialog (src) {
      this.dialogImgSrc = src
      this.imgDialogVisible = true
    },
    addImageToStop (src) {
      if (!this.stopImages) this.stopImages = []
      this.stopImages.push(src)
      this.tempImgLink = ''
      this.$refs.tempImgLinkInput.resetValidation()

      let parentStops = this.getParent('EditRoundtrips').stops
      parentStops[parentStops.findIndex(x => x.DocId === this.stopObject.DocId)].StopImages = this.stopImages

      db.collection('RoundtripDetails').doc(this.stopObject.DocId).update({
        'StopImages': this.stopImages
      }).catch(function (error) {
        sharedMethods.showErrorNotification('Das Bild konnte nicht hinzugefügt werden')
        console.log(error)
      })
    },
    removeImg (index) {
      if (!this.stopImages) return
      this.stopImages.splice(index, 1)

      let parentStops = this.getParent('EditRoundtrips').stops
      parentStops[parentStops.findIndex(x => x.DocId === this.stopObject.DocId)].StopImages = this.stopImages

      db.collection('RoundtripDetails').doc(this.stopObject.DocId).update({
        'StopImages': this.stopImages
      }).catch(function (error) {
        sharedMethods.showErrorNotification('Der Eintrag konnte nicht gelöscht werden')
        console.log(error)
      })
    },
    deleteEntry () {
      if (this.stopObject.DocId === null || this.stopObject.DocId === '' || this.stopObject.DocId === 'undefined') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht gelöscht werden'
        })
        return false
      }

      this.getParent('EditRoundtrips').removeStop(this.stopObject.DocId)

      if (!this.$store.getters['demoSession/isInDemoSession']) {
        const context = this
        db.collection('RoundtripDetails').doc(context.docId).delete().then(function () {
          sharedMethods.showSuccessNotification('Eintrag wurde gelöscht')
        }).catch(function (error) {
          console.log(error)
          sharedMethods.showErrorNotification('Der Eintrag konnte nicht gelöscht werden')
        })
      } else {
        this.$store.commit('demoSession/removeStop', this.stopObject.DocId)
      }
    },
    /**
     * options for the daily trip quasar date component
     * @param date the current date to check (set by quasar automatically)
     */
    dailyTripDateOptions (date) {
      if (this.date && this.date.length > 0) {
        let dateTimeParts = this.date.split(' ')
        let dateParts = dateTimeParts[0].split('.')
        const currentStopDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

        const currentDate = new Date(date)

        if (this.nextStopDate && this.nextStopDate.length > 0) {
          dateTimeParts = this.nextStopDate.split(' ')
          dateParts = dateTimeParts[0].split('.')
          const nextStopDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

          // date must be between current and next stop date
          return currentDate >= currentStopDate && currentDate <= nextStopDate
        } else {
          return currentDate >= currentStopDate
        }
      }
      return null
    },
    getParent (name) {
      let p = this.$parent
      while (typeof p !== 'undefined') {
        if (p.$options.name === name) {
          return p
        } else {
          p = p.$parent
        }
      }
      return false
    },
    searchSights () {
      if (this.location.lng && this.location.lat) {
        sharedMethods.getSights(this.location.lng, this.location.lat).then((results) => {
          if (results !== null) {
            this.sights = results.data.data
          } else {
            this.sights = 'error'
          }
        })
      }
    },
    compare (a, b) {
      const dateA = sharedMethods.getDateFromString(a.date)
      const dateB = sharedMethods.getDateFromString(b.date)

      if (dateA > dateB) return 1
      if (dateB > dateA) return -1

      return 0
    }
  },
  created () {
    this.oldAddedSights = this.addedSights
    this.oldDate = this.date

    this.dailyTrips.sort(this.compare)
    this.dailyTrips.forEach((dailyTrip, index) => {
      dailyTrip.newDate = this.newDailyTripDate(dailyTrip.date)
      if (index === 0) {
        this.getDailyTripDuration([this.location.lng, this.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.location.label, this.location.label, dailyTrip)
      } else {
        this.getDailyTripDuration([this.dailyTrips[index - 1].location.lng, dailyTrip.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.dailyTrips[index - 1].location.label, this.location.label, dailyTrip)
      }
    })
  },
  mounted () {
    if (this.lastItem) {
      sharedMethods.scrollToOffset(this.$refs.lastTimelineEntry)
    }
  }
}
</script>
