<template>
  <q-timeline-entry
    :subtitle="date"
    :icon="icon"
  >
    <div class="stop-container">
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
      <q-rating
        class="stars"
        v-model="stars"
        size="15px"
        color="gold"
        readonly
      />
      <q-icon
        v-if="editor"
        name="delete"
        class="cursor-pointer"
        @click="deleteEntry()"
      ></q-icon>
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
    stars: Number
  },
  data () {
    return {
      titleInput: this.title,
      descriptionInput: this.editorPlaceholder,
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
    saveData (field, value) {
      console.log(this.docId)
      db.collection('RoundtripDetails').doc(this.docId).update({
        ['' + field]: value
      })
    },
    deleteEntry () {
      if (this.docId === null || this.docId === '' || this.docId === 'undefined') return false
      console.log(this.docId)
      const context = this
      db.collection('RoundtripDetails').doc(context.docId).delete().then(function () {
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
