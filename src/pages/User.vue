<template>
  <div
    class="user q-px-lg q-pb-md"
    v-if="user"
  >
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      style="padding-top:40px;"
    >
      <q-tab
        name="publicProfile"
        label="Öffentliches Profil"
      >
      </q-tab>
      <q-tab
        name="settings"
        label="Einstellungen"
      />
    </q-tabs>
    <q-separator />

    <q-tab-panels
      v-model="tab"
      keep-alive
      animated
    >
      <q-tab-panel name="publicProfile">
        <public-user-profile></public-user-profile>
      </q-tab-panel>
      <q-tab-panel name="settings">
        <h4>Einstellungen</h4>
        <q-form
          @submit="onSaveUserSettings"
          bordered
          class="q-gutter-md rounded-borders"
        >
          <q-list
            bordered
            class="rounded-borders"
            style="padding:10px; margin-bottom:30px;"
          >
            <q-input
              v-model="UserDisplayName"
              outlined
              :rules="[val => val !== null && val !== '' && (user.displayName === val || uniqueUserName(val)) || 'Bitte wähle einen Benutzernamen']"
              label="Benutzername"
              lazy-rules
            />
            <q-input
              v-model="CompanyWebsite"
              v-if="companyProfile"
              outlined
              clear-icon
              :rules="[val => !val || urlReg.test(val) || 'Bitte gib einen richtigen Link an']"
              label="Website"
              lazy-rules
            />
            <q-input
              v-model="companyDescription"
              v-if="companyProfile"
              outlined
              autogrow
              label="Unternehmensbeschreibung"
              :rules="[val => val !== null && val !== '' || 'Bitte gib eine Beschreibung an',
          val => val.length > 10 && val.length < 160 || 'Bitte gib eine Beschreibung zwischen 10 und 160 Zeichen an' ]"
            > <template v-slot:prepend>
                <q-icon name="subject" />
              </template>
            </q-input>
            <!--
        <q-input
          v-model="UserEmail"
          outlined
          clearable
          :rules="[val => val !== null && val !== '' || 'Bitte gib eine Email Adresse an']"
          label="Email Adresse"
        />-->
            <div class="flex">
              <div>
                <div
                  class="uploader"
                  :style="{ backgroundImage: 'url('+ titleImgUrl +')' }"
                >
                  <q-btn
                    round
                    color="primary"
                    icon="add"
                    @click="() => $refs.titleUpload.pickFiles()"
                  ></q-btn>
                </div>
                <q-uploader
                  url=""
                  label="Titelbild hochladen"
                  accept=".jpg, image/*"
                  style="max-width: 300px; display:none;"
                  hide-upload-btn
                  ref="titleUpload"
                  @added="fileAdded($event)"
                />
              </div>
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
                  <q-spinner />
                </template>
              </q-btn>
            </div>
          </q-list>
        </q-form>
        <q-form
          @submit="onSaveUserPass"
          bordered
          class="q-gutter-md rounded-borders"
        >
          <q-list
            bordered
            class="rounded-borders"
          >
            <q-expansion-item
              clickable
              expand-separator
              v-model="addExpanded"
              class="add-item"
              @click="addButtonActive = !addButtonActive"
            >
              <template v-slot:header>
                <q-item-section style="align-items: center;">
                  <span>Passwort ändern</span>
                </q-item-section>
              </template>
              <div style="padding:10px;">
                <q-input
                  v-model="password"
                  outlined
                  :type="isPwd ? 'password' : 'text'"
                  label="neues Passwort"
                  :rules="[val => val !== null && val !== '' || 'Bitte gib dein neues Passwort ein']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <q-input
                  v-model="passwordRepeat"
                  outlined
                  :type="isPwdRepeat ? 'password' : 'text'"
                  label="neues Passwort wiederholen"
                  :rules="[val => val !== null && val !== '' || 'Bitte wiederhole dein Passwort',
           val => val === password || 'Die beiden Passwörter stimmen nicht überein']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwdRepeat ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwdRepeat = !isPwdRepeat"
                    />
                  </template>
                </q-input>
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
                      <q-spinner />
                    </template>
                  </q-btn>
                </div>
              </div>
            </q-expansion-item>
          </q-list>
        </q-form>
        <h4>Danger Zone</h4>
        <q-list
          bordered
          class="rounded-borders"
          style="padding:10px; border-color:red;"
        >
          <p style="font-size:18px;">Dieses Konto und alle enthaltenen Inhalte löschen</p>
          <q-btn
            :loading="deleting"
            label="Löschen"
            class="q-mt-md"
            color="primary"
            text-color="white"
            @click="deleteDialog = true;"
          >
            <template v-slot:loading>
              <q-spinner />
            </template>
          </q-btn>
          <q-dialog
            persistent
            v-model="deleteDialog"
          >
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm">Willst du wirklich deinen Konto und alle deine Reisen löschen ? Dies kann nicht mehr rückgängig gemacht werden.</span>
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
                  label="Konto Löschen"
                  @click="deleteAccount()"
                  color="primary"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { auth, storage, db } from '../firebaseInit.js'

export default {
  meta: {
    title: 'Profil',
    meta: {
      robot: { name: 'description', content: 'Dein Profil auf roundtrips4you. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...' }

    }
  },
  name: 'user',
  data () {
    return {
      UserDisplayName: '',
      UserEmail: '',
      submitting: false,
      titleImgUrl: '',
      password: '',
      isPwd: true,
      passwordRepeat: '',
      isPwdRepeat: true,
      deleteDialog: false,
      deleting: false,
      urlReg: /^(http:\/\/|https:\/\/)/,
      CompanyWebsite: null,
      companyProfile: false,
      companyDescription: null,
      tab: 'publicProfile',
      addExpanded: false
    }
  },
  components: {
    PublicUserProfile: () => import('../pages/PublicUserProfile.vue')
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    logOut () {
      auth.logout(this.$router, this.$store)
    },
    fileAdded: function (event) {
      let files = event
      this.upload(files[0])
      this.$refs.titleUpload.reset()
    },
    upload (file) {
      const context = this
      const fileRef = storage.ref().child('Images/Users/' + auth.user().uid + '/TitleImg')
      fileRef.put(file).then(function (snapshot) {
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Bild wurde erfolgreich hochgeladen'
        })
        fileRef.getDownloadURL().then(function (url) {
          context.titleImgUrl = url
          context.onSaveUserSettings()
        })
      })
    },
    onSaveUserSettings () {
      let user = auth.user()
      if (user.displayName === this.UserDisplayName || this.uniqueUserName(this.UserDisplayName)) {
        let context = this
        user.updateProfile({
          displayName: this.UserDisplayName,
          photoURL: this.titleImgUrl
        }).then(function () {
          // user.updateEmail(context.UserEmail).then(function () {

          context.updateDBEntry(user.uid)
          // Update successful
          context.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Einstellungen wurden erfolgreich gespeichert'
          })
          /* }).catch(function (error) {
            console.log(error)
            context.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: 'Es ist ein Fehler aufgetreten, bitte versuche es erneut'
            })
          }) */
        }).catch(function (error) {
          console.log(error)
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Es ist ein Fehler aufgetreten, bitte versuche es erneut'
          })
        })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Bitte gib einen anderen Benutzernamen an'
        })
      }
    },
    updateDBEntry (uid) {
      let context = this
      let roundtripsRef = db.collection('User')
        .where('UserUID', '==', uid)
        .limit(1)
      roundtripsRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            db.collection('User').doc(doc.id).update({
              UserImage: context.titleImgUrl,
              UserName: context.UserDisplayName,
              website: context.CompanyWebsite,
              companyDescription: context.companyDescription
            })
          })
        })
    },
    onSaveUserPass () {
      let context = this
      auth.user().updatePassword(this.password).then(function () {
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Passwort wurde erfolgreich geändert'
        })
      }).catch(function (error) {
        console.log(error)
        if (error.code === 'auth/requires-recent-login') {
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Bitte melde dich erneut an, bevor du dein Passwort änderst'
          })
        } else {
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Es ist ein Fehler aufgetreten, bitte versuche es erneut'
          })
        }
      })
    },
    uniqueUserName (value) {
      return new Promise((resolve, reject) => {
        value = value.trim()

        let roundtripsRef = db.collection('User')
          .where('UserName', '==', value)
          .limit(1)
        roundtripsRef.get()
          .then(snapshot => {
            resolve(snapshot.size === 0 || 'Dieser Name ist bereits vergeben')
          })
      })
    },
    deleteAccount () {
      let context = this
      auth.user().delete().then(function () {
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Schade, dein Konto wurde gelöscht'
        })
        context.$router.push('/')
      }).catch(function (error) {
        console.log(error)
        if (error.code === 'auth/requires-recent-login') {
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Bitte melde dich erneut an, bevor du dein Konto löscht'
          })
        } else {
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Es ist ein Fehler aufgetreten, dein Konto konnte nicht gelöscht werden'
          })
        }
      })
    }
  },
  created () {
    auth.authRef().onAuthStateChanged((user) => {
      this.UserDisplayName = auth.user().displayName
      this.UserEmail = auth.user().email
      this.titleImgUrl = auth.user().photoURL

      let userRef = db.collection('User')
        .where('UserUID', '==', auth.user().uid)
        .limit(1)
      userRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.companyProfile = !!doc.data().companyProfile
            if (doc.data().website) this.CompanyWebsite = doc.data().website
            if (doc.data().companyDescription) this.companyDescription = doc.data().companyDescription
          })
        })
    })
  }
}
</script>
