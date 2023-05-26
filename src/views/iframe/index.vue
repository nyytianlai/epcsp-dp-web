<template>
  <div class="iframe-box">
    <iframe
      frameborder="0"
      v-show="showIframe"
      scrolling="no"
      src="http://10.10.48.84:10011/"
      :onload="handleIframeLoaded"
    ></iframe>
    <div class="charging-station" @click="routerChange('/overall/allView')"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const showIframe = ref(false);
const routerChange = (path: string) => {
  router.push(path);
};
const handleIframeLoaded = () => {
  console.log('iframe loaded');
  showIframe.value = true;
};
</script>
<style lang="less" scoped>
.iframe-box {
  width: 100%;
  height: 100%;
  background: #010527;
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
</style>
