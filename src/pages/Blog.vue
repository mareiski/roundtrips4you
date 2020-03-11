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
        <div
          v-for="item in story.content.Text.content"
          :key="item"
        >
          <div v-if="item.content && item.type === 'paragraph' && item.content[0].type === 'text'">
            <div v-if="item.content[0].marks && item.content[0].marks[0].type === 'link'">
              <a
                :href="item.content[0].marks[0].attrs.href"
                :target="item.content[0].marks[0].attrs.target"
              >
                {{item.content[0].text}}
              </a>
            </div>
            <div v-else>
              <span
                v-for="paragraph in item.content"
                :key="paragraph"
                :style="paragraph.marks ? getStyle(paragraph) : null"
              >{{paragraph.text}}</span>
            </div>
          </div>
          <div v-else-if="item.content && item.type === 'heading'">
            <h1 v-if="item.attrs.level === 1">{{item.content[0].text}}</h1>
            <h2 v-else-if="item.attrs.level === 2">{{item.content[0].text}}</h2>
            <h3 v-else>{{item.content[0].text}}</h3>
          </div>
          <div v-else-if="item.content && (item.type === 'ordered_list' || item.type === 'bullet_list')">
            <ol v-if="item.type === 'ordered_list'">
              <li
                v-for="listItem in item.content"
                :key="listItem"
              >
                {{listItem.content[0].content[0].text}}
              </li>
            </ol>
            <ul v-else>
              <li
                v-for="listItem in item.content"
                :key="listItem"
              >
                {{listItem.content[0].content[0].text}}
              </li>
            </ul>
          </div>
          <q-img
            v-if="item.type === 'blok' && item.attrs.body[0].component === 'image'"
            :src="item.attrs.body[0].image"
            :style="{'width': item.attrs.body[0].width + 'px'}"
          ></q-img>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="less" >
@import url("../css/blog.less");
</style>

<script>
export default {
  data () {
    return {
      story: {},
      loading: false,
      title: 'Blog'
    }
  },
  meta () {
    return {
      title: this.title,
      meta: {
        description: { name: 'description', content: 'Reise auf Roundtrips4you selbst erstellen, komplett kostenlos, online und unkompliziert. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...' }
      }
    }
  },
  created: function () {
    this.$storyblok.on('change', () => {
      this.loadStory('draft')
    })
    this.$storyblok.on('published', () => {
      this.loadStory('draft')
    })

    this.$storyblok.pingEditor(() => {
      this.loadStory(this.$storyblok.inEditor ? 'draft' : 'published')
    })
  },
  methods: {
    loadStory (version) {
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
