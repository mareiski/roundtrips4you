<template>
  <div class="public-users  q-px-lg q-pb-md">
    <q-list
      bordered
      padding
      class="rounded-borders"
    >
      <div v-if="showUser">
        <q-item
          clickable
          @click="$router.push('benutzerprofil/' + user.userUID)"
          v-ripple
          v-for="user in users"
          :key="user"
        >
          <q-item-section
            avatar
            top
          >
            <q-avatar
              color="primary"
              text-color="white"
            >
              <img :src="user.image">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{user.name}}</q-item-label>
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
</template>
<script>
import(/* webpackPrefetch: true */ '../css/public-users.less')
import { db } from '../firebaseInit'
import { date } from 'quasar'

export default {
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
              reputation: doc.data().Reputation
            }
            this.users.push(user)
          })
          this.showUser = true
          console.log(this.users)
        })
    },
    getCreatedAtDate (timeStamp) {
      return date.formatDate(new Date(timeStamp.seconds * 1000), 'DD.MM.YYYY')
    }
  }
}
</script>
