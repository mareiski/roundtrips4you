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
      <q-expansion-item expand-separator>
        <q-card>
          <q-card-section>
            <span v-if="editor">
              <q-popup-proxy
                v-if="editor"
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
                persistent
              >
                <q-date
                  v-model="dailyTrip.date"
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
                    @click="dailyTrip.date = oldDate"
                  >abbrechen</q-btn>
                  <q-btn
                    color="primary"
                    style="margin:10px;"
                    @click="[saveDate(false), $refs.qTimeProxy.show()]"
                    v-close-popup
                  >weiter</q-btn>
                </div>
              </q-popup-proxy>
              Datum/Zeit ändern
              <q-icon
                v-if="editor"
                size="16px"
                name="event"
              />
            </span>
            <span>
              <q-popup-proxy
                v-if="editor"
                ref="qTimeProxy"
                transition-show="scale"
                transition-hide="scale"
                persistent
              >
                <q-time
                  v-model="dailyTrip.date"
                  mask="DD.MM.YYYY HH:mm"
                  format24h
                />
                <div
                  class="flex justify-between"
                  style="width:100%"
                >
                  <q-btn
                    style="margin:10px;"
                    v-close-popup
                    @click="dailyTrip.date = oldDate"
                  >abbrechen</q-btn>
                  <q-btn
                    color="primary"
                    style="margin:10px;"
                    @click="saveDate(true)"
                    v-close-popup
                  >fertig</q-btn>
                </div>
              </q-popup-proxy>
              Zeit ändern
              <q-icon
                v-if="editor"
                size="16px"
                name="access_time"
              />
            </span>
            <div v-if="editor">
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
                @blur="saveSights()"
              />
              <q-editor
                v-model="dailyTrip.descriptionInput"
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
              />
              <div
                class="flex"
                v-if="dailyTrip.stopImages"
              >
                <div
                  class="uploader"
                  v-for="(stopImage, index) in dailyTrip.stopImages"
                  :key="index"
                  style="margin-right:8px;"
                >
                  <q-img
                    style="height:100%;"
                    :src="stopImage"
                  ></q-img>
                  <q-btn
                    round
                    color="primary"
                    icon="add"
                    style="position: absolute; transform: rotate(45deg)"
                    @click="removeImg(index)"
                  >
                  </q-btn>
                  <q-btn
                    round
                    color="primary"
                    icon="filter"
                    style="position: absolute; margin-top:-60px; margin-left:65px;"
                    @click="showImgDialog(stopImage)"
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
                v-if="editor"
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
                  <q-tooltip>Bilder hinzufügen</q-tooltip>
                </q-btn>
              </div>
              <q-dialog
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
                        @click="openInNewTab('https://www.google.com/search?q=' + dailyTrip.location.label  + '&tbm=isch&hl=de&hl=de&tbs=sur%3Af&rlz=1C1CHBF_deDE828DE828&ved=0CAQQpwVqFwoTCLCZ05jd2-cCFQAAAAAdAAAAABAD&biw=1903&bih=969')"
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
              </q-dialog>
            </div>
            <div v-else>
              <div v-if="addedSights && typeof addedSights !== 'undefined' && addedSights.length > 0">
                <b
                  class="flex justify-center"
                  style="flex-direction:column;"
                >Highlights:</b>
                <q-chip
                  v-for="(addedSight, index) in addedSights"
                  :key="index"
                  clickable
                  @click="openInNewTab('https://www.google.com/search?q=' + addedSight + ' ' + dailyTrip.location.label.split(',')[0])"
                >{{addedSight}}</q-chip>
                <a
                  class="flex justify-center"
                  style="flex-direction:column; text-decoration:none;"
                  target="_blank"
                  :href="'https://www.google.com/search?q=' + dailyTrip.location.label.split(',')[0] + ' sehenswürdigkeiten'"
                >weitere anzeigen</a>
              </div>
              <div v-html="dailyTrip.descriptionInput"></div>
            </div>
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
            <div class="q-item__label q-item__label--caption text-caption">{{dailyTrip.date.split(' ')[1] + (dailyTrip.days ? ', ca. ' + dailyTrip.days.days + ' Aufenthalt': '')}}</div>
          </q-item-section>

          <q-item-section
            side
            v-if="editor"
          >
            <q-icon
              name="delete"
              class="cursor-pointer"
              @click="deleteEntry()"
            >
              <q-tooltip>Tagesausflug löschen</q-tooltip>
            </q-icon>
          </q-item-section>
        </template>
      </q-expansion-item>
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
    editor: Boolean,
    addedSights: Array,
    galeryImgUrls: Array
  },
  data () {
    return {
      savedEditorContent: this.dailyTrip.descriptionInput,
      durations: [],
      preventPasting: true,
      oldAddedSights: [],
      dialogImgSrc: null,
      imgDialogVisible: false,
      chooseImgDialog: false,
      tempImgLink: null,
      oldDate: null
    }
  },
  methods: {
    deleteEntry () {
      this.getParent('stop').deleteDailyTrip(this.index)
    },
    saveWork () {
      this.getParent('stop').saveDailyTrips(this.index, this.dailyTrip.descriptionInput, 'description')
      this.savedEditorContent = this.dailyTrip.descriptionInput
    },
    saveDate () {
      this.getParent('stop').saveDailyTrips(this.index, this.dailyTrip.date, 'date')
      this.oldDate = this.dailyTrip.date
    },
    formatOn () {
      this.preventPasting = !this.preventPasting
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
    saveSights () {
      if (this.addedSights !== this.oldAddedSights) {
        this.oldAddedSights = this.addedSights

        this.getParent('stop').saveDailyTrips(this.index, this.addedSights, 'sights')
      }
    },
    showImgDialog (src) {
      this.dialogImgSrc = src
      this.imgDialogVisible = true
    },
    addImageToStop (src) {
      if (!this.dailyTrip.stopImages) this.dailyTrip.stopImages = []
      this.dailyTrip.stopImages.push(src)
      this.tempImgLink = ''
      this.$refs.tempImgLinkInput.resetValidation()

      // let parentStops = this.getParent('EditRoundtrips').stops
      // parentStops[parentStops.findIndex(x => x.DocId === this.docId)].StopImages = this.stopImages

      this.getParent('stop').saveDailyTripImgs(this.index, this.dailyTrip.stopImages)
    },
    removeImg (index) {
      if (!this.dailyTrip.stopImages) return
      this.dailyTrip.stopImages.splice(index, 1)

      // let parentStops = this.getParent('EditRoundtrips').stops
      // parentStops[parentStops.findIndex(x => x.DocId === this.docId)].StopImages = this.stopImages

      this.getParent('stop').saveDailyTripImgs(this.index, this.dailyTrip.stopImages)
    },
    openInNewTab (link) {
      window.open(link, '_blank')
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
  },
  created () {
    this.oldAddedSights = this.addedSights
    this.oldDate = this.dailyTrip.date
  }
}
</script>
