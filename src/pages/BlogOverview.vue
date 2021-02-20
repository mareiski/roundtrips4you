<template>
  <q-page
    id="BlogOverview"
    class="q-px-lg q-pb-md"
  >
    <div id="TopContainer">
      <h3 class="topic">Roundtrips4you - Blog</h3>
      <p>Hier findet ihr aktuelle Reisetipps für die unterschiedlichsten Ziele auf der ganzen Welt</p>
    </div>
    <div id="BlogBackgroundImg"></div>
    <div id="BlogBackgroundImgPlaceholder">
      <div
        class="story-card-container"
        v-for="story in stories"
        :key="story.id"
      >
        <q-card
          class="story-card"
          v-if="story.first_published_at"
        >
          <q-card-section>
            <h3 class="story-title">{{story.name}}</h3>
            <div class="author-container">
              <p>von Roundtrips4you</p>
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
                    :key="index"
                  >
                    <div v-if="item.content && item.type === 'paragraph'">
                      <span
                        v-for="(subItem, index) in item.content"
                        :key="index"
                      >
                        <template v-if="subItem.type === 'text'">
                          <span>{{subItem.text}}</span>
                        </template>
                      </span>
                    </div>
                    <br>
                  </div>
                  <div
                    :key="'A' + index"
                    v-if="index === 4"
                  >
                    <router-link
                      :to="'/blog/' + story.slug"
                      style="text-decoration:none;"
                    >
                      <q-btn color="primary">weiterlesen</q-btn>
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
<style lang="less">
@import url("../css/blog.less");
</style>
<script>
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
    this.fetchAllPosts()
  },
  methods: {
    /**
     * Fetch all posts from storyblok
     */
    fetchAllPosts () {
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
