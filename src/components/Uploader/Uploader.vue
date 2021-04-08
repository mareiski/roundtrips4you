 <template>
  <div>
    <div
      :style="stopImages ? 'padding:20px 0;' : ''"
      @mouseenter="stopImages && stopImages.length >= 2 ? disablePageScrolling() : null"
      @mouseleave="enablePageScrolling()"
    >
      <horizontal-scroll
        :style="(!stopImages || stopImages.length <= 1 ? 'overflow-x:auto;' : '') + ' white-space:nowrap;'"
        class="full-width"
      >
        <q-btn
          round
          color="primary"
          icon="upload"
          v-if="!uploadDisabled"
          v-show="!visible"
          @click="() => $refs.galeryUpload.pickFiles()"
          style="position:relative; margin: 10px; width:42px;"
        >
        </q-btn>
        <p v-if="!uploadDisabled && (!stopImages || stopImages.length < 1)">Bild hochladen</p>
        <q-circular-progress
          :value="uploadProgress"
          v-show="visible"
          :indeterminate="uploadProgress === 100"
          show-value
          size="42px"
          color="primary"
          class="q-ma-md"
        >{{ uploadProgress }}%</q-circular-progress>

        <!-- <q-btn
          round
          color="primary"
          icon="images"
          @click="showGalery = !showGalery"
          style="position:relative; margin: 10px;"
        >
        </q-btn> -->
        <template v-if="stopImages && !showGalery">
          <span
            v-for="(stopImage, index) in stopImages"
            :key="index"
          >
            <q-img
              style="height:200px; width:55%; margin:10px; margin-right:-20px;"
              class="rounded-borders"
              :src="stopImage"
              @click="showImgDialog(stopImage)"
            ></q-img>
            <q-btn
              round
              v-if="!uploadDisabled"
              color="primary"
              icon="delete"
              style="right: 10px; top: -88px;"
              @click="deleteImage(stopImage)"
            >
            </q-btn>
            <q-btn
              v-else
              round
              color="primary"
              icon="filter"
              style="right: 10px; top: -88px;"
              @click="showImgDialog(stopImage)"
            >
            </q-btn>
          </span>
        </template>
        <!-- <template v-if="showGalery">
          <span
            v-for="(stopImage, index) in stopGaleryImages"
            :key="index"
          >
            <template v-if="!stopImages || !stopImages.includes(stopImage)">
              <q-img
                style="height:200px; width:55%; margin:10px; margin-right:-20px;"
                class="rounded-borders"
                :src="stopImage"
              ></q-img>
              <q-btn
                round
                color="primary"
                icon="add"
                style="right: 30px; top: -88px;"
                @click="$emit('imageAdded', stopImage)"
              >
              </q-btn>
              <q-btn
                round
                color="primary"
                icon="delete"
                style="right: 10px; top: -88px;"
                @click="deleteImage(stopImage)"
              >
              </q-btn>
            </template>
          </span>
        </template> -->
      </horizontal-scroll>
    </div>
    <!-- will be invisible -->
    <q-uploader
      url=""
      label="Weitere Bilder hochladen"
      multiple
      style="max-width: 300px; display:none;"
      hide-upload-btn
      ref="galeryUpload"
      @added="fileAdded($event, 'galery')"
    />
    <q-dialog v-model="imgDialogVisible">
      <q-card style="width:100%; max-width:100vh; overflow:hidden;">
        <q-card-section
          class="row flex justify-end q-pb-none"
          style="z-index:100; width:100%; position:absolute; color:white;"
        >
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
          />
        </q-card-section>
        <q-card-section>
          <q-img
            style="width:100%;"
            :src="dialogImgSrc"
          ></q-img>
        </q-card-section>
      </q-card>

    </q-dialog>
    <q-dialog
      keep-alive
      v-model="chooseImgDialog"
    >
      <q-card>
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
              :rules="[val => sharedMethods.validURL(val) || 'Bitte gib einen richtigen Link ein']"
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
              :disable="() => !sharedMethods.validURL(tempImgLink)"
              @click="$emit('imageAdded', tempImgLink)"
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
</template>
<script>
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'
import sharedMethods from '../../sharedMethods.js'
export default {
  data () {
    return {
      imgDialogVisible: false,
      chooseImgDialog: false,
      tempImgLink: null,
      dialogImgSrc: null,
      visible: false,
      slide: 0,
      showGalery: false
    }
  },
  props: {
    RTId: String,
    stopImages: Array,
    uploadDisabled: Boolean
  },
  components: {
    HorizontalScroll: () => import('vue-horizontal-scroll')
  },
  computed: {
    stopGaleryImages () {
      let stopImages = this.$store.getters['images/getGaleryImgUrls'](this.RTId)
      return stopImages
    },
    uploadProgress () {
      return this.$store.getters['images/getUploadProgress']
    }
  },
  methods: {
    disablePageScrolling () {
      document.documentElement.style.overflow = 'hidden'
      document.getElementById('editStopDialogCard').style.overflow = 'hidden'
    },
    fileAdded (event, kind) {
      sharedMethods.fileAdded(event, kind, this, this.RTId)
    },
    enablePageScrolling () {
      try {
        document.documentElement.style.overflow = 'auto'
        document.getElementById('editStopDialogCard').style.overflow = 'auto'
      } catch (e) {
        console.log(e)
      }
    },
    deleteImage (imageUrl) {
      this.$store.dispatch('images/deleteImage', { RTId: this.RTId, url: imageUrl })
      this.$emit('imageDeleted', imageUrl)
    },
    showImgDialog (src) {
      this.dialogImgSrc = src
      this.imgDialogVisible = true
    }
  }
}
</script>
