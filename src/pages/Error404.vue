<template>
  <div class="fixed-center text-center page-404 full-height">
    <!-- <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      > -->
    <div
      @mousemove="mouseMove($event)"
      id="IslandImg"
      @mousedown="clicked($event)"
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
    <p class="text-404">Dieser Ort konnte nicht entdeckt werden...</p>
    <q-btn
      color="secondary"
      class="back-btn"
      @click="$router.push('/')"
    >Zurück zum Festland</q-btn>
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

#IslandImg {
  height: 90vh;
  width: 90%;
  position: absolute;
  background: center url("../statics/404.svg");
  box-shadow: inset 0px 0px 40px 40px #fff;
  background-size: cover;
}

.back-btn {
  width: 200px;
  position: absolute;
  bottom: 20px;
}

.text-404 {
  position: absolute;
  font-size: 30px;
  font-family: "Raleway";
  color: white;
  bottom: 80px;
}
</style>
<script>
import { Loading } from 'quasar'
import fireworks from 'fireworks'

let clickedTimes = 1

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
      cloudCircles.forEach(function (el) {
        var offset = parseInt(el.offsetTop)
        let translate = 'translate3d(' + Math.round(offsetX * offset) + 'px,' + Math.round(offsetY * offset) + 'px,0px)'
        el.style.transform = translate
      })
    },
    getRandomColor (step, numOfSteps) {
      var r, g, b
      var h = step / numOfSteps
      var i = ~~(h * 6)
      var f = h * 6 - i
      var q = 1 - f
      switch (i % 6) {
        case 0: r = 1; g = f; b = 0; break
        case 1: r = q; g = 1; b = 0; break
        case 2: r = 0; g = 1; b = f; break
        case 3: r = 0; g = q; b = 1; break
        case 4: r = f; g = 0; b = 1; break
        case 5: r = 1; g = 0; b = q; break
      }
      var c = '#' + ('00' + (~~(r * 255)).toString(16)).slice(-2) + ('00' + (~~(g * 255)).toString(16)).slice(-2) + ('00' + (~~(b * 255)).toString(16)).slice(-2)
      return (c)
    },
    clicked (event) {
      if (clickedTimes > 10) clickedTimes = 1
      clickedTimes++
      fireworks({
        x: event.clientX,
        y: event.clientY,
        colors: [this.getRandomColor(clickedTimes - 2, clickedTimes), this.getRandomColor(clickedTimes - 1, clickedTimes), '#D56026'],
        count: 90,
        bubbleSizeMaximum: 6,
        bubbleSizeMinimum: 1
      })
    }
  },
  meta: {
    title: '404',
    meta: {
      robot: { name: 'robot', content: 'noIndex' }

    }
  }
}
</script>
