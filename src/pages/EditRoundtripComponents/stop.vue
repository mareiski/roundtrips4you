<template>
  <q-timeline-entry
    :subtitle="date"
    :icon="icon"
  >
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
    docId: String
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
      if (field === 'Title') {
        db.collection('RoundtripDetails').doc(this.docId).update({
          'Title': value
        })
      } else if (field === 'Description') {
        db.collection('RoundtripDetails').doc(this.docId).update({
          'Description': value
        })
      }
    }
  }
}
</script>
