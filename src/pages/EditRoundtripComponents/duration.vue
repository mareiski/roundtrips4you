<template>
  <q-timeline-entry icon="speed">
    <q-chip
      icon="commute"
      :clickable="editor"
      @click="editStopProfile = true"
    >{{defaultProfile && typeof defaultProfile !== 'undefined' ? defaultProfile : (editor ? 'Reisemittel hinzufügen' : roundtripProfile) }}</q-chip>
    <q-dialog
      v-if="editor"
      v-model="editStopProfile"
      persistent
    >
      <q-card>
        <q-card-section>
          <q-select
            outlined
            v-model="inputProfile"
            :options="['zu Fuß', 'Fahrrad', 'Auto', 'Flugzeug']"
            label="Reisemittel"
            use-input
            :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Reisemittel']"
            class="input-item"
            @input="getProfile()"
          >
            <template v-slot:prepend>
              <q-icon name="commute" />
            </template>
          </q-select>
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
            @click="saveData('Profile', profile)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <template v-slot:subtitle>
      <template v-if="duration || duration === 0 || duration === null">{{duration}}</template>
      <template v-else>
        <q-skeleton
          width="100px"
          height="20px"
          type="text"
        />
      </template>
    </template>
  </q-timeline-entry>
</template>
<script>
import { db } from '../../firebaseInit'
export default {
  props: {
    duration: String,
    editor: Boolean,
    defaultProfile: String,
    roundtripProfile: String,
    docId: String
  },
  data () {
    return {
      editStopProfile: false,
      inputProfile: this.defaultProfile,
      profile: null
    }
  },
  methods: {
    getProfile () {
      switch (this.inputProfile) {
        case 'zu Fuß':
          this.profile = 'walking'
          break
        case 'Fahrrad':
          this.profile = 'cycling'
          break
        case 'Flugzeug':
          this.profile = 'plane'
          break
        default:
          this.profile = 'driving'
          break
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
    },
    saveData (field, value) {
      if (!value) return
      let context = this
      try {
        db.collection('RoundtripDetails').doc(this.docId).update({
          ['' + field]: value
        }).then(function () {
          context.$q.notify({
            message: 'Deine Änderungen wurde gespeichert',
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle'
          })
          context.defaultProfile = context.inputProfile
          let parent = context.getParent('EditRoundtrips')
          parent.loadRoundtripDetails(context.$route.params.id, false)
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
