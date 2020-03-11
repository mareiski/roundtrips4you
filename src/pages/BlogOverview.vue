<template>
  <q-page
    id="BlogOverview"
    class="q-px-lg q-pb-md"
  >
    <div id="BlogBackgroundImg"></div>
    <div id="BlogBackgroundImgPlaceholder">
      <div
        class="story-card-container"
        v-for="story in stories"
        :key="story"
      >
        <!-- :style="{ backgroundImage: 'url('+ country.ImageUrl +')' }" -->
        <router-link
          class="story-card"
          :to="'/blog/' + story.slug"
          :style="story.content.TitelBild ? { backgroundImage: 'url('+ story.content.TitelBild +')' } : null"
        >
          <h2 class="story-title">{{story.name}}</h2>
          <span class="story-date">{{story.first_published_at.split('T')[0]}}</span>
          <span class="story-author">{{story.content.Country}}</span>
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<style lang="less">
@import "../css/blog.less";
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
