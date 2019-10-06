import { auth } from 'app/src/firebaseInit'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { AddressbarColor, Loading } from 'quasar'
import vClickOutside from 'v-click-outside'
import vue from 'vue'

// "async" is optional
export default async ({ app, store, router }) => {
  Loading.show({ spinnerColor: 'primary' })
  auth.init(app, store, router)

  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  })
  AddressbarColor.set('#D56026')
  vue.use(vClickOutside)
}
