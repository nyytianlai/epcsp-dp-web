<template>
  <div class="ue-box" ref="ueRef">
    <div class="close" @click="handleCloseVideo">x</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import './peer-stream';
const ueView = ref(null);
const ueRef = ref(null);

const store = useVisibleComponentStore();
const handleCloseVideo = () => {
  store.changeShowUeVideo(false);
};
// 默认ip配置
const WsConfig = {
  TunnelWS: 'ws://10.10.50.11'
};
// 测试加载时间
let startLoadTime = new Date().getTime();
const isUEReady = () => {
  if (ps.readyState == 4) {
    console.log('time', 'isUEReady', new Date().getTime() - startLoadTime);
  } else {
    setTimeout(() => {
      isUEReady();
    }, 500);
  }
};
/**初始化UE */
const initUE_Module = () => {
  return new Promise((resolve) => {
    const ps = document.createElement('video', { is: 'peer-stream' });
    ps.style.width = '100%';
    ps.style.height = '100%';
    ueView.value = ps;
    ps.id = WsConfig.TunnelWS;
    appendUEVideo();
  });
};
// 挂载ue video dom
const appendUEVideo = () => {
  return new Promise((resolve) => {
    ps.id = WsConfig.TunnelWS;
    ueRef.value.append(ps);
    resolve();
  });
};
// 挂载
onMounted(() => {
  console.log('time', 'startLoadTime onMounted', new Date().getTime() - startLoadTime);
  console.log('time', 'initTimelineBar', new Date().getTime() - startLoadTime);
  initUE_Module().then(() => {
    console.log('time', 'initUE_Module', new Date().getTime() - startLoadTime);
    nextTick(() => {
      isUEReady();
      console.log('time', 'nextTick', new Date().getTime() - startLoadTime);
    });
  });
  console.log('time', 'onMounted', new Date().getTime() - startLoadTime);
});
</script>

<style lang="less" scoped>
.ue-box {
  width: 100%;
  height: 100%;
  background: #010527;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .close {
    width: 36px;
    height: 36px;
    line-height: 36px;
    border-radius: 50%;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 18px;
    text-align: center;
    position: absolute;
    z-index: 10;
    top: 20px;
    right: 20px;
  }
}
</style>
