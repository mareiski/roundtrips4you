<template>
  <q-timeline-entry
    :ref="lastItem ? 'lastTimelineEntry' : null"
    :icon="icon"
  >
    <div class="stop-container">
      <div class="flex">
        <h6 class="q-timeline__title">{{titleInput}}
          <q-popup-edit
            v-model="titleInput"
            v-if="editor"
            @save="saveData('Title', titleInput)"
            buttons
            label-set="ok"
          >
            <q-input
              v-model="titleInput"
              dense
            />
          </q-popup-edit>
          <q-icon
            v-if="editor"
            name="edit"
          />
        </h6>
        <div
          @mouseover="generalLinkText = 'Hotel link'"
          @mouseleave="generalLinkText = ''"
          v-if="generalLink && generalLink.length > 0"
        >
          <q-chip
            icon="link"
            size="1px"
            dense
            class="linkChip"
            clickable
            @click="openInNewTab(generalLink)"
          >{{ generalLinkText}}</q-chip>
        </div>
        <q-chip
          icon="hotel"
          v-if="hotelName && typeof hotelName !== 'undefined'"
          size="1px"
          dense
          class="linkChip"
          clickable
          @click="openInNewTab('https://www.booking.com/searchresults.de.html?aid=1632674&ss=' + capitalize(hotelName) + '&checkin_year=' + date.split(' ')[0].split('.')[2] + '&checkin_month=' + date.split('.')[1] + '&checkin_monthday=' + date.split('.')[0] + '&checkout_year=' + checkOutDate.split('.')[2] + '&checkout_month=' + checkOutDate.split('.')[1] + '&checkout_monthday=' + checkOutDate.split('.')[0] + '&group_adults=' + adults + getChildrenText() +  '&no_rooms=' + rooms + '&ac_langcode=de')"
        >auf booking.com ansehen</q-chip>
      </div>
      <q-icon
        v-if="editor && !firstStop"
        name="delete"
        class="cursor-pointer"
        @click="deleteEntry()"
      ></q-icon>
    </div>
    <div>
      <q-chip
        v-if="!hotelLocation ||  typeof hotelLocation === 'undefined'"
        icon="location_on"
        clickable
        @click="editor ? editLocation = true : openInNewTab('https://www.google.com/maps/search/?api=1&query=' + location.label)"
      >{{location && typeof location !== 'undefined' && location.label && typeof location.label !== 'undefined' ? location.label.split(',')[0] : ( editor ? 'Ort hinzufügen' : 'kein Ort angegeben')}}
        <q-tooltip v-if="location && typeof location !== 'undefined' && location.label && typeof location.label !== 'undefined'">{{location.label}}</q-tooltip>
      </q-chip>
      <q-chip
        v-else
        icon="house"
        :clickable="hotelLocation && typeof hotelLocation !== 'undefined' && hotelLocation.label && typeof hotelLocation.label !== 'undefined'"
        @click="openInNewTab('https://www.google.com/maps/search/?api=1&query=' + capitalize(hotelName + ', ' + hotelLocation.label))"
      >{{hotelLocation && typeof hotelLocation !== 'undefined' && hotelLocation.label && typeof hotelLocation.label !== 'undefined' ? capitalize(hotelName + ', ' + hotelLocation.label) :  'kein Ort angegeben'}}
      </q-chip>
      <q-dialog
        v-if="editor"
        v-model="editLocation"
      >
        <q-card>
          <q-card-section class="editLocationCard">
            <CitySearch
              ref="citySearch"
              :parkingPlaceSearch="false"
              :defaultLocation="location"
              @update="updateLocation($event)"
            ></CitySearch>
            <p>oder</p>
            <q-btn
              color="primary"
              @click="openInNewTab('https://www.google.com/maps/search/?api=1&query=' + location.label)"
            >auf google anzeigen</q-btn>
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
              label="OK"
              color="primary"
              @click="saveData('Location', tempLocation, true)"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-chip
        v-if="parkingPlace || editor"
        icon="local_parking"
        :clickable="editor"
        @click="editParkingPlace = true"
      >{{ parkingPlace && typeof parkingPlace !== 'undefined' &&  parkingPlace.label && typeof parkingPlace.label !== 'undefined' ?  parkingPlace.label.split(',')[0] : 'Parkplatz hinzufügen'}}</q-chip>
      <q-dialog
        v-if="editor"
        v-model="editParkingPlace"
        persistent
      >
        <q-card>
          <q-card-section>
            <CitySearch
              ref="parkingPlaceSearch"
              :parkingPlaceSearch="true"
              :defaultLocation="parkingPlace"
              @update="updateParkLocation($event)"
            ></CitySearch>
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
              label="OK"
              color="primary"
              @click="saveData('Parking', tempParkingPlace)"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-rating
        v-if="hotelStars && !isNaN(hotelStars)"
        class="stars"
        v-model="hotelStars"
        readonly
        size="15px"
        color="gold"
        style="margin-right:10px;"
      />
    </div>
    <div v-if="hotelContact && typeof hotelContact !== 'undefined'">
      <q-chip
        v-if="hotelContact.email && typeof hotelContact.email !== 'undefined'"
        icon="email"
        clickable
        @click="openInNewTab('mailto:' + hotelContact.email)"
      >{{ hotelContact.email}}
      </q-chip>
      <q-chip
        icon="phone"
        v-if="hotelContact.phone && typeof hotelContact.phone !== 'undefined'"
        clickable
        @click="openInNewTab('tel:' + hotelContact.phone)"
      >{{hotelContact.phone}}
      </q-chip>
    </div>
    <div>
      <div v-if="sights && typeof sights !== 'undefined' && sights !== 'error'">
        <a
          v-for="sight in sights"
          :key="sight"
          :href="'https://www.google.com/search?q=' + sight.name + ' ' + location.label.split(',')[0]"
          target="_blank"
          style="text-decoration:none;"
        >
          <q-chip
            v-if="editor"
            clickable
            :icon="sight.category === 'SIGHTS' ? 'account_balance' : 'location_on'"
          >{{sight.name}}
          </q-chip>
        </a>
        <a
          target="_blank"
          style="text-decoration:none;"
          :href="'https://www.google.com/search?q=' + location.label.split(',')[0] + ' sehenswürdigkeiten'"
        >weitere anzeigen</a>
      </div>
      <q-chip
        v-else-if="editor && (!hotelName || typeof hotelName === 'undefined')"
        clickable
        @click="searchSights()"
      >{{sights === 'error' ? 'keine POIs gefunden' : 'POIs anzeigen'}}</q-chip>
      <div
        v-if="editor"
        class="flex"
        style="flex-wrap"
      >
        <q-select
          label="Sehenswürdigkeiten hinzufügen"
          filled
          v-model="addedSights"
          use-input
          use-chips
          multiple
          hide-dropdown-icon
          input-debounce="0"
          new-value-mode="add-unique"
          style="margin:10px 10px 10px 0; width:260px;"
        />
        <div
          class="flex justify-center"
          style="flex-direction:column;"
        >
          <q-btn
            color="primary"
            @click="saveSights()"
            label="Speichern"
          />
        </div>
      </div>
      <div
        class="flex"
        v-else-if="addedSights && typeof addedSights !== 'undefined' && addedSights.length > 0"
      >
        <b
          class="flex justify-center"
          style="flex-direction:column;"
        >Highlights:</b>
        <q-chip
          v-for="sight in addedSights"
          :key="sight"
          clickable
          @click="openInNewTab('https://www.google.com/search?q=' + sight + ' ' + location.label.split(',')[0])"
        >{{sight}}</q-chip>
        <a
          class="flex justify-center"
          style="flex-direction:column; text-decoration:none;"
          target="_blank"
          :href="'https://www.google.com/search?q=' + location.label.split(',')[0] + ' sehenswürdigkeiten'"
        >weitere anzeigen</a>
      </div>
      <div
        style="margin-top:10px;"
        v-if="!editor"
        v-html="descriptionInput"
      ></div>
      <q-editor
        v-else-if="!hotelName"
        v-model="descriptionInput"
        min-height="5rem"
        ref="editor_ref"
        @keyup.enter.stop
        :toolbar="editorToolbar"
        toolbar-toggle-color="primary"
        :fonts="editorFonts"
        @paste.native="evt => pasteCapture(evt)"
        style="margin-top:10px; margin-bottom:10px;"
        :definitions="{
        save: {
          tip: 'Die Beschreibung Speichern',
          icon: 'save',
          color: this.savedEditorContent !== descriptionInput ? 'red' : '#707070',
          label: this.savedEditorContent !== descriptionInput ? 'nicht gespeichert' : 'alles gespeichert',
          handler: saveWork
        },
        format: {
          top: 'Formatierung bei Kopieren beibehaten',
          icon: $q.iconSet.editor.formatting,
          label: 'Format bei Kopie ' + (this.preventPasting ? 'aus' : 'an'),
          handler: formatOn
        }
        }"
      />
      <div
        class="flex"
        v-if="stopImages"
      >
        <div
          class="uploader"
          v-for="url in stopImages"
          :key="url"
          style="margin-right:8px;"
        >
          <q-img
            style="height:100%;"
            :src="url"
          ></q-img>
          <q-btn
            round
            color="primary"
            icon="add"
            style="position: absolute; transform: rotate(45deg)"
            @click="removeImg()"
          >
          </q-btn>
          <q-btn
            round
            color="primary"
            icon="filter"
            style="position: absolute; margin-top:-60px; margin-left:65px;"
            @click="showImgDialog(url)"
          >
          </q-btn>
        </div>
      </div>
      <q-dialog v-model="imgDialogVisible">
        <q-card style="width:100%; max-width:100vh; overflow:hidden;">
          <q-card-section
            class="row flex justify-end q-pb-none"
            style="z-index:100;"
          >
            <q-btn
              icon="close"
              flat
              round
              dense
              v-close-popup
            />
          </q-card-section>
          <q-card-section style="margin-top:-35px;">
            <q-img
              style="width:100%;"
              :src="dialogImgSrc"
            ></q-img>
          </q-card-section>
        </q-card>

      </q-dialog>
      <div
        style="margin-top:10px;"
        class="uploader"
        v-if="galeryImgUrls.length > 0 && editor"
      >
        <q-img
          style="height:100%;"
          src="/statics/dummy-image-landscape-1-150x150.jpg"
        ></q-img>
        <q-btn
          round
          color="primary"
          icon="add"
          style="position: absolute;"
          @click="chooseImgDialog = true"
        >
        </q-btn>
      </div>
      <q-dialog
        v-if="galeryImgUrls.length > 0"
        v-model="chooseImgDialog"
      >
        <q-card>
          <q-card-section class="row items-center">
            <div
              class="uploader"
              v-for="url in galeryImgUrls"
              :key="url"
            >
              <q-img
                style="height:100%;"
                :src="url"
              ></q-img>
              <q-btn
                round
                color="primary"
                icon="add"
                style="position: absolute;"
                @click="addImageToStop(url)"
              >
              </q-btn>
            </div>
          </q-card-section>
          <q-card-section class="row items-center flex">
            <span>Bitte verwende nur Bilder die für die Wiederverwendung eindeutig gekennzeichnet sind. <br> Ansonsten kann dein Account gesperrt werden. <br>
              <br>
              <a
                style="text-decoration:underline;"
                @click="openInNewTab('https://www.google.com/search?q=' + (!hotelLocation ||  typeof hotelLocation === 'undefined' ?  location.label : capitalize(hotelName + ', ' + hotelLocation.label)) + '&tbm=isch&hl=de&hl=de&tbs=sur%3Af&rlz=1C1CHBF_deDE828DE828&ved=0CAQQpwVqFwoTCLCZ05jd2-cCFQAAAAAdAAAAABAD&biw=1903&bih=969')"
              >Vorschläge auf Google</a>
              <br>
              <br>
            </span>
            <div
              class="flex"
              style="width:100%;"
            >
              <q-input
                filled
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
      </q-dialog>
    </div>
    <template v-slot:subtitle>
      <span class="q-timeline__title">
        {{date !== null && date.length > 0 ? date.split(' ')[0]: date}}
        <q-popup-proxy
          v-if="editor"
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-model="date"
            today-btn
            @input="saveDate($event)"
            mask="DD.MM.YYYY HH:mm"
          />
        </q-popup-proxy>
        <q-icon
          v-if="editor"
          size="16px"
          name="event"
        />
      </span>
      <span
        class="q-timeline__title"
        style="padding-right:10px;"
      >
        {{date !== null && date.length > 0 ? date.split(' ')[1]: date}}
        <q-popup-proxy
          v-if="editor"
          ref="qTimeProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-time
            v-model="date"
            mask="DD.MM.YYYY HH:mm"
            format24h
            @input="saveDate($event)"
          />
        </q-popup-proxy>
        <q-icon
          v-if="editor"
          size="16px"
          name="access_time"
        />
      </span>
      <span class="q-timeline__title">{{days !== null ?  'ca. ' + days + ' Aufenthalt' : ( firstStop || lastItem ? '' : 'keine Verbleibende Zeit für den Aufenthalt') }}</span>
    </template>
  </q-timeline-entry>
</template>
<script>
import { db } from '../../firebaseInit'
import CitySearch from '../Map/CitySearch'
var querystring = require('querystring')
import axios from 'axios'

export default {
  components: {
    CitySearch
  },
  props: {
    title: String,
    date: String,
    icon: String,
    editorPlaceholder: String,
    editor: Boolean,
    docId: String,
    generalLink: String,
    location: Object,
    days: String,
    parkingPlace: String,
    lastItem: Boolean,
    hotelStars: Number,
    hotelName: String,
    hotelLocation: Object,
    hotelContact: Object,
    checkOutDate: String,
    adults: Number,
    childrenAges: Array,
    rooms: Number,
    firstStop: Boolean,
    galeryImgUrls: Array,
    stopImages: Array,
    addedSights: Array
  },
  data () {
    return {
      titleInput: this.title,
      descriptionInput: this.editorPlaceholder,
      generalLinkText: '',
      showDateEntry: true,
      showTimeEntry: false,
      preventPasting: false,
      editParkingPlace: false,
      tempParkingPlace: {},
      editLocation: false,
      tempLocation: {},
      savedEditorContent: this.editorPlaceholder,
      sights: null,
      chooseImgDialog: false,
      tempImgLink: null,
      dialogImgSrc: null,
      imgDialogVisible: false,

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
            label: this.$q.lang.editor.align,
            icon: this.$q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['save'],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['fullscreen'],
        [
          {
            label: this.$q.lang.editor.formatting,
            icon: this.$q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6'
            ]
          },
          {
            label: this.$q.lang.editor.fontSize,
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
            label: this.$q.lang.editor.defaultFont,
            icon: this.$q.iconSet.editor.font,
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
    saveDate (value) {
      let dateTimeParts = value.split(' ')
      let dateParts = dateTimeParts[0].split('.')
      let timeParts = dateTimeParts[1].split(':')
      let initDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

      db.collection('RoundtripDetails').doc(this.docId).update({
        'InitDate': initDate
      })
      this.getParent('EditRoundtrips').loadRoundtripDetails(this.$route.params.id, true)
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
    saveSights () {
      this.saveData('Sights', this.addedSights, false)
    },
    saveData (field, value, updateParent) {
      try {
        db.collection('RoundtripDetails').doc(this.docId).update({
          ['' + field]: value
        })
        this.$q.notify({
          message: 'Deine Änderungen wurde gespeichert',
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle'
        })
        if (updateParent) this.getParent('EditRoundtrips').loadRoundtripDetails(this.$route.params.id, false)
      } catch (e) {
        console.log(e)
      }
    },
    saveWork () {
      this.saveData('Description', this.descriptionInput, true)
      this.savedEditorContent = this.descriptionInput
    },
    updateLocation (event) {
      if (event !== null) {
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
      db.collection('RoundtripDetails').doc(this.docId).update({
        'StopImages': this.stopImages
      })
      this.getParent('EditRoundtrips').loadRoundtripDetails(this.$route.params.id, false)
    },
    removeImg (src) {
      if (!this.stopImages) return
      this.stopImages.splice(this.stopImages.indexOf(src) - 1, 1)
      db.collection('RoundtripDetails').doc(this.docId).update({
        'StopImages': this.stopImages
      })
      this.getParent('EditRoundtrips').loadRoundtripDetails(this.$route.params.id, false)
    },
    deleteEntry () {
      if (this.docId === null || this.docId === '' || this.docId === 'undefined') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht gelöscht werden'
        })
        return false
      }
      const context = this
      db.collection('RoundtripDetails').doc(context.docId).delete().then(function () {
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Eintrag wurde gelöscht'
        })
        context.getParent('EditRoundtrips').loadRoundtripDetails(context.$route.params.id, true)
      }).catch(function (error) {
        console.log(error)
        context.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht gelöscht werden'
        })
      })
    },
    openInNewTab (link) {
      window.open(link, '_blank')
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
        this.getSights(this.location.lng, this.location.lat).then((results) => {
          if (results !== null) {
            this.sights = results.data.data
          } else {
            this.sights = 'error'
          }
        })
      }
    },
    getSights (long, lat) {
      return new Promise((resolve, reject) => {
        const url = 'https://api.amadeus.com/v1/security/oauth2/token'

        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }

        const data = querystring.stringify({
          grant_type: 'client_credentials', // gave the values directly for testing
          client_id: 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
          client_secret: 'lHQlUheyyAZtGQDA'
        })

        axios.post(url, data, {
          headers: headers,
          form: {
            'grant_type': 'client_credentials',
            'client_id': 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
            'client_secret': 'lHQlUheyyAZtGQDA'
          }
        }).then(function (response) {
          let token = response.data.access_token
          const tokenString = 'Bearer ' + token

          console.log(token)

          axios.get('https://api.amadeus.com/v1/reference-data/locations/pois?latitude=' + lat + '&longitude=' + long + '&radius=10&page[limit]=5&page[offset]=0&categories=SIGHTS', {
            headers: {
              'Authorization': tokenString
            }
          }).then(function (response) {
            resolve(response)
          }).catch(function (error) {
            console.log('Error' + error)
            resolve(null)
          })
        }).catch(function (error) {
          console.log('Error on Authentication' + error)
          resolve(null)
        })
      })
    }
  },
  mounted () {
    if (this.lastItem) {
      this.getParent('EditRoundtrips').scrollTo(this.$refs.lastTimelineEntry)
    }
  }
}
</script>
