<template>
  <div class="iframe-box">
    <iframe
      frameborder="0"
      v-show="showIframe"
      scrolling="no"
      src="http://10.10.2.63:9109/"
      :onload="handleIframeLoaded"
    ></iframe>
    <div class="ue-list" @click="handlePlayUeVideo"></div>
    <div class="play-btn" @click="handlePlayVideo"></div>
    <div class="charging-station" @click="routerChange('/overall/allView')"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
const router = useRouter();
const store = useVisibleComponentStore();
const showIframe = ref(false);
const routerChange = (path: string) => {
  router.push(path);
};
const handleIframeLoaded = () => {
  console.log('iframe loaded');
  showIframe.value = true;
};
const handlePlayVideo = () => {
  store.changeShowPromitionVideo(true);
};
const handlePlayUeVideo = () => {
  store.changeShowUeVideo(true);
};
</script>
<style lang="less" scoped>
.iframe-box {
  width: 100%;
  height: 100%;
  background: #010527;
  // position: relative;
}
iframe {
  width: 100%;
  height: 100%;
  background: #010527;
}
.charging-station {
  cursor: pointer;
  position: absolute;
  left: 794px;
  top: 952px;
  width: 100px;
  height: 100px;
  z-index: 10;
}
.play-btn {
  width: 36px;
  height: 36px;
  cursor: pointer;
  background-image: url('./images/icon-video.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  top: 148px;
  right: 452px;
  z-index: 10;
}
.ue-list {
  width: 400px;
  height: 200px;
  cursor: pointer;
  position: absolute;
  left: 24px;
  bottom: 89px;
  z-index: 10;
}
</style>
