<template>
  <q-dialog v-model="sightDialog.showed">
    <q-card>
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
      <q-carousel
        animated
        v-model="slide"
        arrows
        infinite
        swipeable
        autoplay
      >
        <q-carousel-slide
          :name="index"
          class="column no-wrap"
          v-for="(img, index) in sightDialog.imgSrcs"
          :key="index"
          style="padding: 0;"
        >
          <q-img
            :src="img"
            style="max-height:75vh;"
          >
            <div class="absolute-bottom">
              <div class="text-h6">{{sightDialog.title}}</div>
              <div class="text-subtitle2">{{sightDialog.shortDescription}}</div>
            </div>
          </q-img>
        </q-carousel-slide>
      </q-carousel>

      <q-card-section>
        {{sightDialog.description}}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-if="addAble"
          flat
          label="hinzufügen"
          color="primary"
          v-close-popup
          @click="[$refs.sightInput.add(sightDialog.title, true), saveSights()]"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import sharedMethods from '../../sharedMethods.js'

export default {
  data () {
    return {
      sightDialog: { showed: false, title: '', imgSrcs: [], description: '', shortDescription: '' },
      slide: 0
    }
  },
  props: {
    addAble: Boolean
  },
  methods: {
    /**
* open sight dialog to show data from wikivoyage about sight name
*/
    openSightDialog (sight) {
      // get sight dialog content from wikivoyage
      const context = this
      sharedMethods.getWikivoyageData(sight).then(result => {
        console.log(result)
        if (result !== null) {
          context.sightDialog.title = result.title || sight
          context.sightDialog.description = result.description || 'Es konnten leider keine Informationen gefunden werden'
          context.sightDialog.shortDescription = result.shortDescription
          context.sightDialog.imgSrcs = result.imgSrcs
          context.sightDialog.showed = true
        } else {
          context.sightDialog.title = sight
          context.sightDialog.description = 'Es konnten leider keine Informationen gefunden werden'
          context.sightDialog.shortDescription = ''
          context.sightDialog.imgSrcs = []
          context.sightDialog.showed = true
        }
      })
    }
  }

}
</script>
