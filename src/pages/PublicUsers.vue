<template>
  <div class="public-users  q-px-lg q-pb-md">
    <q-list
      bordered
      padding
      class="rounded-borders"
    >
      <div v-if="showUser">
        <q-item
          v-for="(user, index) in users"
          :key="user"
          :clickable="!!user.name"
          @click="$router.push('/benutzerprofil/' + user.userUID)"
          v-ripple
        >
          <q-item-section
            avatar
            top
          >
            <q-avatar
              color="primary"
              text-color="white"
            >
              <img :src="user.image ? user.image : '../statics/dummy-image-landscape-1-150x150.jpg'">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">#{{index + 1}} {{user.name ? user.name : 'Anonymer Nutzer'}} {{user.reputation ? '(' + user.reputation + ')' : ''}}</q-item-label>
            <q-item-label
              caption
              style="width:100px;"
            >
              {{ user.userSince }}
              <q-tooltip>
                Dieser Account wurde am {{ user.userSince }} erstellt
              </q-tooltip>
            </q-item-label>
          </q-item-section>

          <q-item-section
            side
            v-if="user.name"
          >
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
</template>
<script>
import(/* webpackPrefetch: true */ '../css/public-users.less')
import { db } from '../firebaseInit.js'
import { date } from 'quasar'

export default {
  meta: {
    title: 'Users',
    meta: {
      description: { name: 'description', content: 'Reise selbst planen & zusammenstellen, Reise planen kostenlos & online. Routenplaner und Reiseplaner online mit vielen Tools für deinen Roadtrip' }
    }
  },
  data () {
    return {
      users: [],
      showUser: false
    }
  },
  created () {
    this.getAllUsers()
  },
  methods: {
    getAllUsers () {
      let userRef = db.collection('User')
      let context = this
      userRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let user = {
              image: doc.data().UserImage,
              name: doc.data().UserName,
              userSince: context.getCreatedAtDate(doc.data().createdAt),
              trustedUser: !!doc.data().TrustedUser,
              userUID: doc.data().UserUID,
              roundtripsEdited: doc.data().RTEdited ? doc.data().RTEdited : 0
            }
            this.users.push(user)
            this.getPublishedRoundtrips(user)
          })
        })
    },
    getPublishedRoundtrips (user) {
      let roundtripsRef = db.collection('Roundtrips')
        .where('UserId', '==', user.userUID)
        .where('Public', '==', true)
      roundtripsRef.get()
        .then(snapshot => {
          let publishedRoundtrips = snapshot.size ? snapshot.size : 0
          this.getReputation(user, publishedRoundtrips)
        }).catch(function (error) {
          console.log(error)
          this.showRoundtrips = true
        })
    },
    getReputation (user, publishedRoundtrips) {
      let publicRT = publishedRoundtrips * 50
      let editedRT = user.roundtripsEdited * 25
      user.reputation = publicRT + editedRT + 100

      // resort after end of the array
      if (this.users.indexOf(user) === this.users.length - 1) {
        this.users.sort((a, b) => Number(b.reputation) - Number(a.reputation))
        this.showUser = true
      }
    },
    getCreatedAtDate (timeStamp) {
      return date.formatDate(new Date(timeStamp.seconds * 1000), 'DD.MM.YYYY')
    }
  }
}
</script>
