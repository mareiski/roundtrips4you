<template>
  <div class="fixed-center text-center page-404">
    <!-- <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      > -->
    <div class="island-img">
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
    <p class="text-faded">Oh nein, da ist wohl was verloren gegangen...<strong>(404)</strong></p>
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
      clouds: [{ width: 400, height: 200, top: -320, left: -320 }, { width: 300, height: 150, top: -120, left: 20 }]
    }
  },
  created () {
    Loading.hide()
  },
  metaInfo: {
    meta: [
      { name: 'robot', content: 'noIndex' }
    ]
  }
}
</script>
