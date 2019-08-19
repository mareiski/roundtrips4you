<template>
  <div class="edit-roundtrips q-px-lg q-pb-md">
    <q-timeline color="secondary">
      <q-timeline-entry heading>
        Reiseverlauf
      </q-timeline-entry>

      <q-timeline-entry
        subtitle="February 22, 1986"
        icon="location_on"
      >
        <h6 class="q-timeline__title">{{title}}
          <q-popup-edit v-model="title">
            <q-input
              v-model="title"
              dense
              autofocus
              counter
            />
          </q-popup-edit>
        </h6>
        <div>
          <div v-html="editor"></div>
          <q-popup-edit>
            <q-editor
              v-model="editor"
              min-height="5rem"
              @keyup.enter.stop
              :toolbar="editorToolbar"
              :fonts="editorFonts"
            />
          </q-popup-edit>
        </div>
      </q-timeline-entry>
      <q-timeline-entry
        subtitle="February 21, 1986"
        icon="hotel"
      >
        <h6 class="q-timeline__title">{{hotelTitle}}
          <q-popup-edit v-model="hotelTitle">
            <q-input
              v-model="hotelTitle"
              dense
              autofocus
              counter
            />
          </q-popup-edit>
        </h6>
        <div>
          <div v-html="hotelEditor"></div>
          <q-popup-edit>
            <q-editor
              v-model="hotelEditor"
              min-height="5rem"
              @keyup.enter.stop
              :toolbar="editorToolbar"
              :fonts="editorFonts"
            />
          </q-popup-edit>
        </div>
      </q-timeline-entry>
    </q-timeline>
    <q-list
      bordered
      class="rounded-borders"
    >
      <q-expansion-item
        clickable
        expand-separator
        @click="addButtonActive = !addButtonActive"
      >
        <template v-slot:header>
          <q-item-section style="align-items: center;">
            <q-btn
              class="add-button"
              side
              round
              color="primary"
              icon="add"
              :class="{ active: addButtonActive }"
            >
            </q-btn>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <q-input
              filled
              v-model="date"
              mask="date"
              :rules="['date']"
              class="input-item"
            >
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="date"
                  today-btn
                  :options="dateOptions"
                  @input="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
              <template v-slot:prepend>
                <q-icon
                  name="event"
                  class="cursor-pointer"
                >
                </q-icon>
              </template>
            </q-input>
          </q-card-section>
          <q-card-section>
            <q-select
              outlined
              v-model="selectOption"
              :options="options"
              label="Eintrag"
              clearable
              class="input-item"
            >
              <template v-slot:prepend>
                <q-icon name="list" />
              </template>
            </q-select>

          </q-card-section>
          <q-card-section>
            <q-btn
              round
              color="primary"
              icon="add"
            >
              <q-tooltip>
                Eintrag hinzufügen
              </q-tooltip>
            </q-btn>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>
<style lang="less">
@import "../css/editRoundtrips.less";
</style>
<script>
export default {
  data () {
    return {
      editor: 'Beschreibung des heutigen Stopps',
      title: 'Stop 1',
      hotelTitle: 'Hotel 1',
      hotelEditor: 'Beschreibung des Hotels',
      options: ['Stop', 'Hotel'],
      selectOption: null,
      addButtonActive: false,
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
  }
}
</script>
