<template>
  <q-page
    id="Blog"
    class="q-px-lg q-pb-md"
  >
    <div>
      <div v-if="!!story.content">
        <div
          id="TitleImg"
          :style="{'background-image': 'url(' + story.content.Bild + ')'}"
        ></div>
        <div id="TitleImgOverlay"></div>
        <div id="TitleImgPlacholder">
          <h1>{{story.content.Titel}}</h1>
        </div>
        <div v-if="story.content.Text">
          <div
            v-for="(item, index) in story.content.Text.content"
            :key="index"
          >
            <div v-if="item.content && item.type === 'paragraph'">
              <span
                v-for="(subItem, index) in item.content"
                :key="index"
              >
                <template v-if="subItem.type === 'text'">
                  <template v-if="subItem.marks && subItem.marks[0].type === 'link'">
                    <a
                      :href="subItem.marks[0].attrs.href"
                      :target="subItem.marks[0].attrs.target"
                    >
                      {{subItem.text}}
                    </a>
                  </template>
                  <template v-else>
                    <span :style="subItem.marks ? getStyle(subItem) : null">{{subItem.text}}</span>
                  </template>
                </template>
              </span>
            </div>
            <div v-else-if="item.content && item.type === 'heading'">
              <h1 v-if="item.attrs.level === 1">{{item.content[0].text}}</h1>
              <h2 v-else-if="item.attrs.level === 2">{{item.content[0].text}}</h2>
              <h3 v-else>{{item.content[0].text}}</h3>
            </div>
            <div v-else-if="item.content && (item.type === 'ordered_list' || item.type === 'bullet_list')">
              <ol v-if="item.type === 'ordered_list'">
                <li
                  v-for="(listItem, index) in item.content"
                  :key="index"
                >
                  {{listItem.content[0].content[0].text}}
                </li>
              </ol>
              <ul v-else>
                <li
                  v-for="(listItem, index) in item.content"
                  :key="index"
                >
                  {{listItem.content[0].content[0].text}}
                </li>
              </ul>
            </div>
            <hr v-if="item.type === 'horizontal_rule'" />
            <q-img
              v-if="item.type === 'blok' && item.attrs.body[0].component === 'image'"
              :src="item.attrs.body[0].image"
              :style="{'width': item.attrs.body[0].width + 'px'}"
            ></q-img>
            <q-img
              v-if="item.type === 'blok' && item.attrs.body[0].url && item.attrs.body[0].url.url"
              :src="item.attrs.body[0].url.url"
              style="max-width:800px; margin-bottom:40px;"
            ></q-img>
            <q-carousel
              v-if="item.type === 'blok' && item.attrs.body[0].Images"
              animated
              v-model="slide[index]"
              navigation
              infinite
              :autoplay="10000"
              swipeable
              control-color="primary"
              padding
              style="max-width:800px; margin-bottom:40px;"
              arrows
            >
              <q-carousel-slide
                v-for="(image, index) in item.attrs.body[0].Images"
                :key="index"
                style="padding:0;"
                :name="image.url.url"
              >
                <q-img
                  class="full-width full-height"
                  spinner-color="primary"
                  :src="image.url.url"
                  contain
                />
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<style lang="less">
@import url("../../css/blog.less");
</style>
<script>
export default {
  data () {
    return {
      story: {},
      loading: false,
      title: 'Blog',
      slide: []
    }
  },
  meta () {
    return {
      title: this.title,
      meta: {
        description: { name: 'description', content: this.title + ' auf Roundtrips4you. Die Besten Tipps und Tricks für deine nächste Reise.' }
      }
    }
  },
  created: function () {
    this.$storyblok.on('change', () => {
      this.fetchStory('draft')
    })
    this.$storyblok.on('published', () => {
      this.fetchStory('draft')
    })
    this.$storyblok.pingEditor(() => {
      this.fetchStory(this.$storyblok.inEditor ? 'draft' : 'published')
    })
  },
  methods: {
    /**
     * Load story for the current page url
     * @param {String} version only used for editing (eg. draft, published)
     */
    fetchStory (version) {
      this.loading = true
      this.$storyblok.get({
        slug: 'blog/' + this.$route.params.name,
        version: version
      }, (data) => {
        this.story = {
          content: {}
        }
        this.$nextTick(() => {
          this.story = data.story

          this.title = this.story.content.Titel
          this.loading = false
        })
      }, (error) => {
        console.log(error)
        this.loading = false
      })
    },
    /**
     * Get styles for single paragraph from abbreviations
     * @param {*} paragraph element with style to choose
     */
    getStyle (paragraph) {
      let style = paragraph.marks[0].type
      switch (style) {
        case 'bold':
          return { 'font-weight': 'bold' }
        case 'italic':
          return { 'font-style': 'italic' }
        case 'strike':
          return { 'text-decoration': 'line-through' }
        case 'underline':
          return { 'text-decoration': 'underline' }
      }

      return null
    }
  }
}
</script>
