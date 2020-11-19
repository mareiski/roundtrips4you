<template>
  <div class="public-user-profile  q-px-lg q-pb-md">
    <router-link to="/benutzer">{{!isOnPrivateUserPage ? 'zurück zu allen Nutzern' : 'User Ranking ansehen'}}</router-link>
    <h3 class="user-name">{{userName}} {{ !isNaN(reputation) ? '(Reputation: ' + reputation + ')' : ''}}
      <q-badge
        v-if="trustedUser"
        align="top"
        color="blue"
        style="border-radius:50%; border-radius: 50%; padding: 2px; padding-top: 2.5px;"
      >
        <q-icon
          name="done"
          color="white"
          size="18px"
        />
        <q-tooltip>Dies ist ein von Roundtrips4you anerkannter User</q-tooltip>
      </q-badge>
      <q-badge
        v-if="userName === 'Roundtrips4you'"
        align="top"
        color="primary"
        style="border-radius:50%; border-radius: 50%; padding: 2px; padding-top: 2.5px;"
      >
        <q-icon
          name="star"
          color="white"
          size="18px"
        />
        <q-tooltip>Dies ist der Account von Roundtrips4you : )</q-tooltip>
      </q-badge>
    </h3>
    <span v-if="userSince">Mitglied seit {{userSince}}</span>
    <br>
    <span v-if="companyWebsite">Unternehmenswebsite:
      <a @click="openInNewTab(companyWebsite)">{{companyWebsite}}</a>
    </span>
    <br>
    <span
      v-if="companyDescription"
      style="max-width:460px;"
    >
      {{companyDescription}}
    </span>
    <div
      style="margin-top:10px;"
      class="flex justify-between details-container"
    >
      <div>
        <h3>Reputation</h3>
        <ul>
          <li>100 für "Nutzer der 1. Stunde" Badge</li>
          <li>{{ publishedRoundtrips ? publishedRoundtrips * 50 : 0 }} für veröffentlichte Rundreisen</li>
          <!-- <li>für hilfreiche Kommentare</li> -->
          <!-- <li>für Bewertungen</li> -->
          <!-- <li>für folgende Nutzer</li> -->
          <li>{{ userRTEdited ? userRTEdited * 25 : 0}} für eigene Rundreisen die bearbeitet wurden</li>
        </ul>
      </div>
      <div>
        <h3>Inhalte</h3>
        <ul>
          <li>{{ publishedRoundtrips }} öffentliche Rundreise{{ publishedRoundtrips === 1 ? '' : 'n' }} erstellt</li>
          <!-- <li>hilfreiche Kommentare erstellt</li> -->
          <!-- <li>Bewertungen erstellt</li> -->
          <!-- <li>Follower</li> -->
          <li>{{ userRTEdited ? userRTEdited : 0 }}x wurden Reisen bereits bearbeitet</li>
        </ul>
      </div>
      <div>
        <h3></h3>
        <q-img
          width="100px"
          :src="userImage"
        />
      </div>
    </div>
    <div class="badge-container">
      <h3>Badges</h3>
      <b>Erste Schritte</b>
      <div>
        <q-badge color="secondary">Nutzer der 1. Stunde</q-badge>
        <!-- <q-badge color="secondary">Newbie</q-badge> -->
      </div>
      <b>Reisen</b>
      <div>
        <q-badge
          v-if="publishedRoundtrips < 5"
          :disabled="publishedRoundtrips < 1"
          color="secondary"
        >Reiseanfänger <q-tooltip>(min. 1 Reise veröffentlicht)</q-tooltip>
        </q-badge>
        <q-badge
          v-if="publishedRoundtrips <= 10"
          :disabled="publishedRoundtrips < 5"
          color="secondary"
        >Reiselustiger <q-tooltip>(min. 5 Reisen veröffentlicht)</q-tooltip>
        </q-badge>
        <q-badge
          :disabled="publishedRoundtrips <= 10"
          color="secondary"
        >Reiseexperte <q-tooltip>(mehr als 10 Reisen veröffentlicht)</q-tooltip>
        </q-badge>
        <q-badge
          :disabled="!userRTEdited || userRTEdited <= 5"
          color="secondary"
        >Reisevermittler <q-tooltip>(mehr als 5 eigene Rundreisen, die bearbeitet wurden)</q-tooltip>
        </q-badge>
        <!-- <q-badge color="secondary">DaFehltNochWas (mehr als 5 Reisen bearbeitet)</q-badge> -->
      </div>
      <!-- <b>Community</b>
      <div>
        <q-badge color="secondary">Ratgeber (mehr als 10 Kommentare verfasst)</q-badge>
        <q-badge color="secondary">Reisetester (mehr als 10 Bewertungen abgegeben)</q-badge>
        <q-badge color="secondary">Berühmtheit (mehr als 20 Follower)</q-badge>
      </div> -->
    </div>
    <div class="roundtrip-container">
      <h3>Veröffentlichte Reisen</h3>
      <q-list :bordered="createdRoundtrips.length > 0">
        <div v-if="showRoundtrips">
          <div v-if="createdRoundtrips.length === 0">
            <span style="font-size:18px;">{{userName}} hat leider noch keine Rundreisen veröffentlicht.</span>
          </div>
          <q-item
            clickable
            @click="$router.push('/rundreisen-details/' + roundtrip.RTId)"
            v-ripple
            v-for="(roundtrip, index) in createdRoundtrips"
            :key="roundtrip.RTId"
          >
            <q-item-section
              avatar
              top
            >
              <q-avatar
                color="primary"
                text-color="white"
                style="padding:0;"
              >
                <img :src="TitleImgs[index]">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{roundtrip.Title}} - {{Array.isArray(roundtrip.Location) ? getLocationString(roundtrip.Location): roundtrip.Location}}</q-item-label>
              <q-item-label
                caption
                style="width:100px;"
              >
                {{ getCreatedAtDate(roundtrip.createdAt) }}
                <q-tooltip>
                  Diese Rundreise wurde am {{ getCreatedAtDate(roundtrip.createdAt) }} erstellt
                </q-tooltip>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon
                name="keyboard_arrow_right"
                color="primary"
              />
            </q-item-section>
          </q-item>
        </div>
        <div v-else>
          <q-item
            v-for="n in 3"
            :key="n"
          >
            <q-item-section
              avatar
              top
              style="padding:8px 10px;"
            >
              <q-skeleton
                size="40px"
                type="QAvatar"
              />
            </q-item-section>

            <q-item-section>
              <q-skeleton
                width="300px"
                style="margin-bottom:10px;"
                type="rect"
              />
              <q-item-label caption>
                <q-skeleton
                  width="80px"
                  type="rect"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </div>
  </div>
</template>
<script>
import(/* webpackPrefetch: true */ '../css/publicUserProfile.less')
import { db, storage, auth } from '../firebaseInit.js'
import { date } from 'quasar'

export default {
  data () {
    return {
      userName: null,
      userImage: null,
      publishedRoundtrips: 0,
      reputation: 0,
      userRTEdited: 0,
      createdRoundtrips: [],
      showRoundtrips: false,
      TitleImgs: [],
      userSince: null,
      trustedUser: false,
      title: 'User',
      companyWebsite: null,
      companyDescription: null,
      isOnPrivateUserPage: false
    }
  },
  meta () {
    return {
      title: 'Profil von ' + this.title,
      meta: {
        description: { name: 'description', content: 'Profil von ' + this.title + ' auf roundtrips4you ansehen. Reise planen komplett kostenlos, online und unkompliziert. Dein kostenloser Reiseplaner' }
      }
    }
  },
  created () {
    // get user data
    let UserId = this.$route.params.id
    if (!UserId) {
      this.isOnPrivateUserPage = true
      UserId = auth.user().uid
    }
    console.log(UserId)
    if (UserId) {
      let userRef = db.collection('User')
        .where('UserUID', '==', UserId)
        .limit(1)
      userRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.userImage = doc.data().UserImage
            this.userName = doc.data().UserName
            this.userRTEdited = doc.data().RTEdited
            this.userSince = this.getCreatedAtDate(doc.data().createdAt)
            this.trustedUser = !!doc.data().TrustedUser
            this.companyWebsite = doc.data().website
            this.companyDescription = doc.data().companyDescription
            this.title = this.userName
          })
        })
      this.getPublishedRoundtrips(UserId)
    }
  },
  methods: {
    getPublishedRoundtrips (userId) {
      let roundtripsRef = db.collection('Roundtrips')
        .where('UserId', '==', userId)
        .where('Public', '==', true)
      roundtripsRef.get()
        .then(snapshot => {
          if (snapshot.empty) this.showRoundtrips = true
          snapshot.forEach(doc => {
            this.publishedRoundtrips += 1
            this.createdRoundtrips.push(doc.data())

            let roundtripDocIds = []
            roundtripDocIds.splice(this.createdRoundtrips.findIndex(x => x.RTId === doc.data().RTId), 0, doc.id)

            let context = this
            var fileRef = storage.ref().child('Images/Roundtrips/' + doc.id + '/Title/titleImg')
            fileRef.getDownloadURL().then(function (url) {
              context.TitleImgs.splice(roundtripDocIds.indexOf(doc.id), 0, url)
            }).catch(function (error) {
              console.log(error)
              context.TitleImgs.splice(roundtripDocIds.indexOf(doc.id), 0, '../statics/dummy-image-landscape-1-150x150.jpg')
            })

            this.showRoundtrips = true
          })
          this.getReputation(userId)
        }).catch(function (error) {
          console.log(error)
          this.showRoundtrips = true
        })
    },
    getReputation (userId) {
      let publicRT = this.publishedRoundtrips * 50
      let editedRT = this.userRTEdited * 25
      this.reputation = publicRT + editedRT + 100
    },
    getLocationString (locations) {
      let locationString = ''
      locations.forEach((location, index) => {
        locationString = locationString + (index !== 0 ? ', ' : '') + location
      })
      return locationString
    },
    getCreatedAtDate (timeStamp) {
      return date.formatDate(new Date(timeStamp.seconds * 1000), 'DD.MM.YYYY')
    }
  }
}
</script>
