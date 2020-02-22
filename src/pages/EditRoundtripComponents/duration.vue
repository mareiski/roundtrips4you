<template>
  <q-timeline-entry
    icon="speed"
    :subtitle="duration"
  >
    <q-chip
      icon="commute"
      size="3px"
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
            :options="['zu Fuß', 'Fahrrad', 'Auto']"
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
      console.log(value)
      try {
        db.collection('RoundtripDetails').doc(this.docId).update({
          ['' + field]: value
        })
        this.$q.notify({
          message: 'Deine Änderungen wurde gespeichert',
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle'
        })
        let parent = this.getParent('EditRoundtrips')
        parent.loadRoundtripDetails(this.$route.params.id, false)
        parent.loadSingleRoundtrip(this.$route.params.id)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
