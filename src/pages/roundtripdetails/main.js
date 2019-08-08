import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkerAlt, faChevronDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '../../styles/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'


import {
    Quasar,
    QDate,
    QRange,
    QInput,
    QIcon,
    QPopupProxy,
    ClosePopup,
    QBtn,
    QBanner,
    QMenu,
    QDialog,
    QExpansionItem,
    QCard,
    QCardSection,
    QCardActions,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QField,
    QRating,
    LoadingBar
} from 'quasar'


Vue.use(Quasar, {
    components: {
        QInput,
        QDate,
        QRange,
        QIcon,
        QPopupProxy,
        QBtn,
        QBanner,
        QMenu,
        QDialog,
        QExpansionItem,
        QCard,
        QCardSection,
        QCardActions,
        QList,
        QItem,
        QItemSection,
        QItemLabel,
        QField,
        QRating,
        extras: [
            'material-icons'
        ],
        plugins: {
            LoadingBar,
        },
        config: {
            loadingBar: { }
        }
    },
    directives: {
        ClosePopup
    }
})

LoadingBar.setDefaults({
    color: 'purple',
    size: '15px',
    position: 'bottom'
})

LoadingBar.start()
LoadingBar.increment(1)

library.add(faMapMarkerAlt, faChevronDown)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')