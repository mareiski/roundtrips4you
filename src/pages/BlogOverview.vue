<template>
  <q-page
    id="BlogOverview"
    class="q-px-lg q-pb-md"
  >
    <div id="TopContainer">
      <h2 class="topic">Roundtrips4you - Blog</h2>
      <p>Hier findet ihr aktuelle Reisetipps für die unterschiedlichsten Ziele auf die ganze Welt</p>
    </div>
    <div id="BlogBackgroundImg"></div>
    <div id="BlogBackgroundImgPlaceholder">
      <div
        class="story-card-container"
        v-for="story in stories"
        :key="story"
      >
        <q-card class="story-card">
          <q-card-section>
            <h2 class="story-title">{{story.name}}</h2>
            <div class="author-container">
              <p>Von Roundtrips4you</p>
              <p>
                <span class="story-date">{{story.first_published_at.split('T')[0]}}</span>
                <span class="story-author"> aus {{story.content.Country}}</span>
              </p>
            </div>
            <div class="card-row">
              <div>
                <q-img :src="story.content.TitelBild" />
              </div>
              <div style="padding-left:15px;">
                <template v-for="(item, index) in story.content.Text.content">
                  <div
                    v-if="index < 3"
                    :key="item"
                  >
                    <div v-if="item.content && item.type === 'paragraph'">
                      <span
                        v-for="subItem in item.content"
                        :key="subItem"
                      >
                        <template v-if="subItem.type === 'text'">
                          <span>{{subItem.text}}</span>
                        </template>
                      </span>
                    </div>
                    <br>
                  </div>
                  <div
                    :key="'A' + item"
                    v-if="index === 4"
                  >
                    <router-link :to="'/blog/' + story.slug">
                      <q-btn
                        color="primary"
                        style="text-decoration:none;"
                      >weiterlesen</q-btn>
                    </router-link>
                  </div>
                </template>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import(/* webpackPrefetch: true */ '../css/blog.less')
export default {
  meta: {
    title: 'Blog',
    meta: {
      description: { name: 'description', content: 'Reise auf roundtrips4you selbst erstellen, komplett kostenlos, online und unkompliziert. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...' }

    }
  },
  data () {
    return {
      stories: []
    }
  },
  created: function () {
    this.getAllPosts()
  },
  methods: {
    getAllPosts () {
      this.$storyblok.get({
        slug: '/',
        starts_with: 'blog',
        version: 'draft'
      }, (data) => {
        this.stories = data.stories
        console.log(this.stories)
      })
    }
  }
}
</script>
