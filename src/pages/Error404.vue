<template>
  <div class="fixed-center text-center page-404">
    <!-- <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      > -->
    <div
      @mousemove="mouseMove($event)"
      class="island-img"
    >
    </div>
    <div
      v-for="cloud in clouds"
      :key="cloud"
    >
      <div
        class="cloud-circle"
        :style="'width:' + cloud.width + 'px; height:' + cloud.height + 'px; top:' + cloud.top + 'px; left:' + cloud.left + 'px;'"
        :top="cloud.top"
        :left="cloud.left"
      ></div>
      <svg
        width="0"
        height="0"
      >
        <filter id="filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".01"
            numOctaves="10"
          />
          <feDisplacementMap
            in="SourceGraphic"
            scale="180"
          />
        </filter>
      </svg>
    </div>
    <p class="text-faded">Oh nein, dieser Ort konnte nicht gefunden werden... <strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Zurück zum Start</q-btn>
  </div>
</template>
<style lang="less" scoped>
.page-404 {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.cloud-circle {
  border-radius: 50%;
  filter: url(#filter);
  box-shadow: 400px 400px 60px 0px #fff;
  position: absolute;
}

.island-img {
  height: 72vh;
  width: 80%;
  background: center url("../statics/tom-winckels-I7oLRdM9YIw-unsplash.jpg");
  box-shadow: inset 0px 0px 40px 40px #fff;
  background-size: cover;
}
</style>
<script>
import { Loading } from 'quasar'

export default {
  name: 'Error404',
  data () {
    return {
      clouds: [{ width: 400, height: 200, top: -320, left: -320 }, { width: 400, height: 200, top: -20, left: -320 }, { width: 300, height: 150, top: -120, left: 20 }, { width: 500, height: 250, top: -220, left: 500 }, { width: 400, height: 200, top: -400, left: 200 }]
    }
  },
  created () {
    Loading.hide()
  },
  methods: {
    mouseMove (event) {
      var width = window.outerWidth
      var height = window.outerHeight
      let offsetX = 0.5 - event.clientX / width
      let offsetY = 0.5 - event.clientY / height

      let cloudCircles = Array.from(document.getElementsByClassName('cloud-circle'))
      cloudCircles.forEach(function (el, index) {
        var offset = parseInt(el.offsetTop)
        let translate = 'translate3d(' + Math.round(offsetX * offset) + 'px,' + Math.round(offsetY * offset) + 'px,0px)'
        el.style.transform = translate
      })
    }
  },
  metaInfo: {
    meta: [
      { name: 'robot', content: 'noIndex' }
    ]
  }
}
</script>
