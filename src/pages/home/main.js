import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    mounted: function () {
        document.body.removeClass("preload");
    },
    render: h => h(App)    
}).$mount('#app')