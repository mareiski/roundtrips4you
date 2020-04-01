<template>
  <div>
    <div
      class="divider"
      v-if="newDailyTripDate"
    >
      <hr>
      <span>{{dailyTrip.date.split(' ')[0]}}</span>
    </div>
    <span class="duration-span">{{duration && duration.duration ? duration.duration + ' ' + duration.distance + ' ab ' + (newDailyTripDate ? duration.defaultCityLabel.split(',')[0] : duration.cityFromLabel.split(',')[0]) : ''}}</span>
    <q-list
      bordered
      class="rounded-borders"
    >
      <q-expansion-item
        v-if="editor"
        expand-separator
        :label="dailyTrip.location.label.split(',')[0]"
        :caption="dailyTrip.date.split(' ')[1]"
      >
        <q-card>
          <q-card-section>
            <q-editor
              v-model="dailyTrip.descriptionInput"
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
          color: this.savedEditorContent !== dailyTrip.descriptionInput ? 'red' : '#707070',
          label: this.savedEditorContent !== dailyTrip.descriptionInput ? 'nicht gespeichert' : 'alles gespeichert',
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
          </q-card-section>
        </q-card>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar
              style="padding:0;"
              icon="location_on"
              color="primary"
              text-color="white"
            />
          </q-item-section>

          <q-item-section>
            <div class="q-item__label">{{dailyTrip.location.label.split(',')[0]}}</div>
            <div class="q-item__label q-item__label--caption text-caption">{{dailyTrip.date.split(' ')[1]}}</div>
          </q-item-section>

          <q-item-section side>
            <q-icon
              name="delete"
              class="cursor-pointer"
              @click="deleteEntry()"
            ></q-icon>
          </q-item-section>
        </template>
      </q-expansion-item>
      <div
        v-else
        class="q-expansion-item__container relative-position"
      >
        <div
          tabindex="0"
          class="q-item q-item-type row no-wrap q-link q-focusable q-hoverable"
        >
          <q-item-section avatar>
            <q-avatar
              style="padding:0;"
              icon="location_on"
              color="primary"
              text-color="white"
            />
          </q-item-section>

          <q-item-section>
            <div class="q-item__label">{{dailyTrip.location.label.split(',')[0]}}</div>
            <div class="q-item__label q-item__label--caption text-caption">{{dailyTrip.date.split(' ')[1]}}</div>
          </q-item-section>
        </div>
      </div>
    </q-list>
  </div>
</template>
<script>
export default {
  props: {
    dailyTrip: Object,
    editorToolbar: Array,
    editorFonts: Object,
    stopDocId: String,
    index: Number,
    newDailyTripDate: Boolean,
    duration: Object,
    editor: Boolean
  },
  data () {
    return {
      savedEditorContent: this.dailyTrip.descriptionInput,
      days: [],
      durations: [],
      preventPasting: true
    }
  },
  methods: {
    deleteEntry () {
      this.getParent('stop').deleteDailyTrip(this.index)
    },
    saveWork () {
      this.getParent('stop').saveDailyTrips(this.index, this.dailyTrip.descriptionInput)
      this.savedEditorContent = this.dailyTrip.descriptionInput
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
