<template>
  <q-timeline-entry :icon="icon">
    <div class="stop-container">
      <div class="flex">
        <h6 class="q-timeline__title">{{titleInput}}
          <q-popup-edit
            v-model="titleInput"
            v-if="editor"
            @save="saveData('Title', titleInput)"
          >
            <q-input
              v-model="titleInput"
              dense
              autofocus
            />
          </q-popup-edit>
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
    </div>
    <div>
      <div v-html="descriptionInput"></div>
      <q-popup-edit
        v-if="editor"
        @hide="saveData('Description', descriptionInput)"
      >
        <q-editor
          v-model="descriptionInput"
          min-height="5rem"
          @keyup.enter.stop
          :toolbar="editorToolbar"
          :fonts="editorFonts"
        />
      </q-popup-edit>
    </div>
    <template v-slot:subtitle>
      <span class="q-timeline__title">{{date}}
        <q-popup-proxy
          v-if="editor"
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
          @hide="() => [showDateEntry = true, showTimeEntry = false, saveDate(date)]"
        >
          <q-date
            v-model="date"
            today-btn
            mask="DD.MM.YYYY HH:mm"
            v-if="showDateEntry"
            @input="() => [showTimeEntry = true, showDateEntry = false]"
          />
          <q-time
            v-model="date"
            mask="DD.MM.YYYY HH:mm"
            v-if="showTimeEntry"
            @input="() => [showDateEntry = true, showTimeEntry = false, $refs.qDateProxy.hide()]"
            format24h
          />
        </q-popup-proxy>
      </span>
    </template>
  </q-timeline-entry>
</template>
<script>
import { db } from '../../firebaseInit'

export default {
  props: {
    title: String,
    date: String,
    icon: String,
    editorPlaceholder: String,
    editor: Boolean,
    docId: String,
    generalLink: String,
    location: String
  },
  data () {
    return {
      titleInput: this.title,
      descriptionInput: this.editorPlaceholder,
      generalLinkText: '',
      showDateEntry: true,
      showTimeEntry: false,
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
    },
    saveData (field, value) {
      console.log(this.docId)
      db.collection('RoundtripDetails').doc(this.docId).update({
        ['' + field]: value
      })
    },
    deleteEntry () {
      if (this.docId === null || this.docId === '' || this.docId === 'undefined') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Der Eintrag konnte nicht gelöscht werden'
        })
        return false
      }
      console.log(this.docId)
      const context = this
      db.collection('RoundtripDetails').doc(context.docId).delete().then(function () {
        context.getParent('EditRoundtrips').saveRoundtripDaysAndHotels()
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Eintrag wurde gelöscht'
        })
        context.getParent('EditRoundtrips').loadRoundtripDetails(context.$route.params.id)
      }).catch(function (error) {
        console.log(error)
        context.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
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
