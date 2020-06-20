import { auth } from 'app/src/firebaseInit'
const getLeaflet = () => import('leaflet')
import { AddressbarColor, Loading } from 'quasar'
import vue from 'vue'
import StoryblokVue from 'storyblok-vue'
import VueLazyload from 'vue-lazyload'
import inViewportDirective from 'vue-in-viewport-directive'
import VueTour from 'vue-tour'

const getClickOutside = () => import('v-click-outside')
// import(/* webpackPreload: true */ 'leaflet/dist/leaflet.css')

// "async" is optional
export default async ({ app, store, router }) => {
  Loading.show({ spinnerColor: 'primary' })
  auth.init(app, store, router)

  getLeaflet().then(L => {
    delete L.Icon.Default.prototype._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })
  })
  AddressbarColor.set('#D56026')

  getClickOutside().then(vClickOutside => vue.use(vClickOutside))
  vue.use(StoryblokVue)
  vue.use(VueLazyload)
  vue.use(VueTour)
  vue.directive('in-viewport', inViewportDirective)
}
