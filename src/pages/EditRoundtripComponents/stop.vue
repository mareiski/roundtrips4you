<template>
  <q-timeline-entry :icon="icon">
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
              autofocus
            />
          </q-popup-edit>
          <q-icon
            v-if="editor"
            name="edit"
          />
        </h6>
        <div
          v-if="generalLink != null && generalLink.length > 0"
          @mouseover="generalLinkText = 'Hotel link'"
          @mouseleave="generalLinkText = ''"
        >
          <q-chip
            icon="link"
            size="1px"
            dense
            class="linkChip"
            clickable
            @click="openInNewTab(generalLink)"
          >{{generalLinkText}}</q-chip>
        </div>
      </div>
      <q-icon
        v-if="editor"
        name="delete"
        class="cursor-pointer"
        @click="deleteEntry()"
      ></q-icon>
    </div>
    <div>
      <q-chip
        icon="location_on"
        size="3px"
      >{{location}}</q-chip>
      <q-chip
        icon="local_parking"
        size="3px"
        clickable
        @click="editParkingPlace = true"
      >{{parkingPlace}}</q-chip>
      <q-dialog
        v-if="editor"
        v-model="editParkingPlace"
        persistent
      >
        <q-card-section>
          <CitySearch
            ref="citySearch"
            :parkingPlaceSearch="false"
            @update="updateLocation($event)"
          ></CitySearch>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-dialog>
    </div>
    <div>
      <div
        v-if="!editor"
        v-html="descriptionInput"
      ></div>
      <q-editor
        v-else
        v-model="descriptionInput"
        min-height="5rem"
        ref="editor_ref"
        @keyup.enter.stop
        :toolbar="editorToolbar"
        :fonts="editorFonts"
        @paste.native="evt => pasteCapture(evt)"
        style="margin-top:10px;"
        :definitions="{
        save: {
          tip: 'Die Beschreibung Speichern',
          icon: 'save',
          label: 'Speichern',
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
        {{date !== null && date.length > 0 ? date.split(' ')[1]: date}}{{days !== null && days > 0 && !editor ? ', ' + days + (days === '1' ? ' Tag' : ' Tage') + ' Aufenthalt' : null}}
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
    </template>
  </q-timeline-entry>
</template>
<script>
import { db } from '../../firebaseInit'
import CitySearch from '../Map/CitySearch'

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
    location: String,
    days: String,
    parkingPlace: String
  },
  data () {
    return {
      titleInput: this.title,
      descriptionInput: this.editorPlaceholder,
      generalLinkText: '',
      showDateEntry: true,
      showTimeEntry: false,
      preventPasting: true,
      editParkingPlace: false,

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
        ['format'],
        ['undo', 'redo']
      ]
    }
  },
  methods: {
    saveDate (value) {
      console.log(value)
      let dateTimeParts = value.split(' ')
      let dateParts = dateTimeParts[0].split('.')
      let timeParts = dateTimeParts[1].split(':')
      let initDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

      db.collection('RoundtripDetails').doc(this.docId).update({
        'InitDate': initDate
      })
    },
    saveData (field, value) {
      console.log(this.docId)
      db.collection('RoundtripDetails').doc(this.docId).update({
        ['' + field]: value
      })
    },
    saveWork () {
      this.$q.notify({
        message: 'Deine Beschreibung wurde gespeichert',
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle'
      })
      this.saveData('Description', this.descriptionInput)
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
        } else if (evt.clipboardData && evt.clipboardData.getData) {
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
        context.getParent('EditRoundtrips').loadRoundtripDetails(context.$route.params.id)
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
    }
  }
}
</script>
