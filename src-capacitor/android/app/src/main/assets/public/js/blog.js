(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "4837":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/BlogOverview.vue?vue&type=template&id=7c991e1e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-page',{staticClass:"q-px-lg q-pb-md",attrs:{"id":"BlogOverview"}},[_c('div',{attrs:{"id":"TopContainer"}},[_c('h3',{staticClass:"topic"},[_vm._v("Roundtrips4you - Blog")]),_c('p',[_vm._v("Hier findet ihr aktuelle Reisetipps für die unterschiedlichsten Ziele auf der ganzen Welt")])]),_c('div',{attrs:{"id":"BlogBackgroundImg"}}),_c('div',{attrs:{"id":"BlogBackgroundImgPlaceholder"}},_vm._l((_vm.stories),function(story){return _c('div',{key:story.id,staticClass:"story-card-container"},[(story.first_published_at)?_c('q-card',{staticClass:"story-card"},[_c('q-card-section',[_c('h3',{staticClass:"story-title"},[_vm._v(_vm._s(story.name))]),_c('div',{staticClass:"author-container"},[_c('p',[_vm._v("von Roundtrips4you")]),_c('p',[_c('span',{staticClass:"story-date"},[_vm._v(_vm._s(story.first_published_at.split('T')[0]))]),_c('span',{staticClass:"story-author"},[_vm._v(" aus "+_vm._s(story.content.Country))])])]),_c('div',{staticClass:"card-row"},[_c('div',[_c('q-img',{attrs:{"src":story.content.TitelBild}})],1),_c('div',{staticStyle:{"padding-left":"15px"}},[_vm._l((story.content.Text.content),function(item,index){return [(index < 3)?_c('div',{key:index},[(item.content && item.type === 'paragraph')?_c('div',_vm._l((item.content),function(subItem,index){return _c('span',{key:index},[(subItem.type === 'text')?[_c('span',[_vm._v(_vm._s(subItem.text))])]:_vm._e()],2)}),0):_vm._e(),_c('br')]):_vm._e(),(index === 4)?_c('div',{key:'A' + index},[_c('router-link',{staticStyle:{"text-decoration":"none"},attrs:{"to":'/blog/' + story.slug}},[_c('q-btn',{attrs:{"color":"primary"}},[_vm._v("weiterlesen")])],1)],1):_vm._e()]})],2)])])],1):_vm._e()],1)}),0)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/BlogOverview.vue?vue&type=template&id=7c991e1e&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/BlogOverview.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
__webpack_require__.e(/* import() */ 2).then(__webpack_require__.t.bind(null, "2af5", 7));
/* harmony default export */ var BlogOverviewvue_type_script_lang_js_ = ({
  meta: {
    title: 'Blog',
    meta: {
      description: {
        name: 'description',
        content: 'Reise auf roundtrips4you selbst erstellen, komplett kostenlos, online und unkompliziert. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...'
      }
    }
  },

  data() {
    return {
      stories: []
    };
  },

  created: function () {
    this.fetchAllPosts();
  },
  methods: {
    /**
     * Fetch all posts from storyblok
     */
    fetchAllPosts() {
      this.$storyblok.get({
        slug: '/',
        starts_with: 'blog',
        version: 'draft'
      }, data => {
        this.stories = data.stories;
        console.log(this.stories);
      });
    }

  }
});
// CONCATENATED MODULE: ./src/pages/BlogOverview.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_BlogOverviewvue_type_script_lang_js_ = (BlogOverviewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/BlogOverview.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_BlogOverviewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var BlogOverview = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "f2d6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Blog.vue?vue&type=template&id=737483d8&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-page',{staticClass:"q-px-lg q-pb-md",attrs:{"id":"Blog"}},[_c('div',[(!!_vm.story.content)?_c('div',[_c('div',{style:({'background-image': 'url(' + _vm.story.content.Bild + ')'}),attrs:{"id":"TitleImg"}}),_c('div',{attrs:{"id":"TitleImgOverlay"}}),_c('div',{attrs:{"id":"TitleImgPlacholder"}},[_c('h1',[_vm._v(_vm._s(_vm.story.content.Titel))])]),(_vm.story.content.Text)?_c('div',_vm._l((_vm.story.content.Text.content),function(item,index){return _c('div',{key:index},[(item.content && item.type === 'paragraph')?_c('div',_vm._l((item.content),function(subItem,index){return _c('span',{key:index},[(subItem.type === 'text')?[(subItem.marks && subItem.marks[0].type === 'link')?[_c('a',{attrs:{"href":subItem.marks[0].attrs.href,"target":subItem.marks[0].attrs.target}},[_vm._v("\n                    "+_vm._s(subItem.text)+"\n                  ")])]:[_c('span',{style:(subItem.marks ? _vm.getStyle(subItem) : null)},[_vm._v(_vm._s(subItem.text))])]]:_vm._e()],2)}),0):(item.content && item.type === 'heading')?_c('div',[(item.attrs.level === 1)?_c('h1',[_vm._v(_vm._s(item.content[0].text))]):(item.attrs.level === 2)?_c('h2',[_vm._v(_vm._s(item.content[0].text))]):_c('h3',[_vm._v(_vm._s(item.content[0].text))])]):(item.content && (item.type === 'ordered_list' || item.type === 'bullet_list'))?_c('div',[(item.type === 'ordered_list')?_c('ol',_vm._l((item.content),function(listItem,index){return _c('li',{key:index},[_vm._v("\n                "+_vm._s(listItem.content[0].content[0].text)+"\n              ")])}),0):_c('ul',_vm._l((item.content),function(listItem,index){return _c('li',{key:index},[_vm._v("\n                "+_vm._s(listItem.content[0].content[0].text)+"\n              ")])}),0)]):_vm._e(),(item.type === 'horizontal_rule')?_c('hr'):_vm._e(),(item.type === 'blok' && item.attrs.body[0].component === 'image')?_c('q-img',{style:({'width': item.attrs.body[0].width + 'px'}),attrs:{"src":item.attrs.body[0].image}}):_vm._e(),(item.type === 'blok' && item.attrs.body[0].url && item.attrs.body[0].url.url)?_c('q-img',{staticStyle:{"max-width":"800px","margin-bottom":"40px"},attrs:{"src":item.attrs.body[0].url.url}}):_vm._e(),(item.type === 'blok' && item.attrs.body[0].Images)?_c('q-carousel',{staticStyle:{"max-width":"800px","margin-bottom":"40px"},attrs:{"animated":"","navigation":"","infinite":"","autoplay":10000,"swipeable":"","control-color":"primary","padding":"","arrows":""},model:{value:(_vm.slide[index]),callback:function ($$v) {_vm.$set(_vm.slide, index, $$v)},expression:"slide[index]"}},_vm._l((item.attrs.body[0].Images),function(image,index){return _c('q-carousel-slide',{key:index,staticStyle:{"padding":"0"},attrs:{"name":image.url.url}},[_c('q-img',{staticClass:"full-width full-height",attrs:{"spinner-color":"primary","src":image.url.url,"contain":""}})],1)}),1):_vm._e()],1)}),0):_vm._e()]):_vm._e()])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Blog.vue?vue&type=template&id=737483d8&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Blog.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
__webpack_require__.e(/* import() */ 2).then(__webpack_require__.t.bind(null, "2af5", 7));
/* harmony default export */ var Blogvue_type_script_lang_js_ = ({
  data() {
    return {
      story: {},
      loading: false,
      title: 'Blog',
      slide: []
    };
  },

  meta() {
    return {
      title: this.title,
      meta: {
        description: {
          name: 'description',
          content: this.title + ' auf Roundtrips4you. Die Besten Tipps und Tricks für deine nächste Reise.'
        }
      }
    };
  },

  created: function () {
    this.$storyblok.on('change', () => {
      this.fetchStory('draft');
    });
    this.$storyblok.on('published', () => {
      this.fetchStory('draft');
    });
    this.$storyblok.pingEditor(() => {
      this.fetchStory(this.$storyblok.inEditor ? 'draft' : 'published');
    });
  },
  methods: {
    /**
     * Load story for the current page url
     * @param {String} version only used for editing (eg. draft, published)
     */
    fetchStory(version) {
      this.loading = true;
      this.$storyblok.get({
        slug: 'blog/' + this.$route.params.name,
        version: version
      }, data => {
        this.story = {
          content: {}
        };
        this.$nextTick(() => {
          this.story = data.story;
          this.title = this.story.content.Titel;
          this.loading = false;
        });
      }, error => {
        console.log(error);
        this.loading = false;
      });
    },

    /**
     * Get styles for single paragraph from abbreviations
     * @param {*} paragraph element with style to choose
     */
    getStyle(paragraph) {
      let style = paragraph.marks[0].type;

      switch (style) {
        case 'bold':
          return {
            'font-weight': 'bold'
          };

        case 'italic':
          return {
            'font-style': 'italic'
          };

        case 'strike':
          return {
            'text-decoration': 'line-through'
          };

        case 'underline':
          return {
            'text-decoration': 'underline'
          };
      }

      return null;
    }

  }
});
// CONCATENATED MODULE: ./src/pages/Blog.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Blogvue_type_script_lang_js_ = (Blogvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/Blog.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_Blogvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Blog = __webpack_exports__["default"] = (component.exports);

/***/ })

},0,[2]]);
//# sourceMappingURL=blog.js.map