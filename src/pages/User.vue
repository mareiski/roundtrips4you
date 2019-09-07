<template>
  <div
    class="user q-px-lg q-pb-md"
    v-if="user"
  >
    <h3>Hallo {{user.displayName}}!</h3>
    <h4>Allgemeine Einstellungen</h4>
    <q-form
      @submit="onSaveUserSettings"
      bordered
      class="q-gutter-md rounded-borders"
    >
      <q-list
        bordered
        class="rounded-borders"
        style="padding:10px"
      >
        <q-input
          v-model="UserDisplayName"
          dense
          autofocus
          clearable
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Bitte wähle einen Benutzernamen']"
          label="Benutzername"
        />
        <q-input
          v-model="UserEmail"
          dense
          autofocus
          clearable
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Bitte gib eine Email Adresse an']"
          label="Email Adresse"
        />
        <div class="flex">
          <q-uploader
            url="http://localhost:8080/statics/upload/"
            auto-upload
            label="Profilbild hochladen"
            accept=".jpg, image/*"
            style="max-width: 300px"
          />
          <q-avatar
            size="50px"
            style="width: 50px; margin-left:5px;"
          >
            <q-img :src="user.photoURL"></q-img>
          </q-avatar>
        </div>
        <div class="row justify-end">
          <q-btn
            type="submit"
            :loading="submitting"
            label="Speichern"
            class="q-mt-md"
            color="primary"
            text-color="white"
          >
            <template v-slot:loading>
              <q-spinner-puff />
            </template>
          </q-btn>
        </div>
      </q-list>
    </q-form>
    <pre>{{user}}</pre>
  </div>
</template>

<script>
import { auth } from '../firebaseInit'

export default {
  name: 'user',
  data () {
    return {
      UserDisplayName: '',
      UserEmail: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    logOut () {
      auth.logout()
    }
  },
  created () {
    this.UserDisplayName = auth.user().displayName
    this.UserEmail = auth.user().email
  }
}
</script>
