<template>
  <div class="iframe-box">
    <iframe
      frameborder="0"
      v-show="showIframe"
      scrolling="no"
      src="http://10.10.2.63:9109/"
      :onload="handleIframeLoaded"
    ></iframe>
    <div class="ue-list-box">
      <div class="ue-list">
        <div
          class="ue-item"
          v-for="item in stationList"
          :key="item.id"
          @click="handlePlayUeVideo(item.name)"
        ></div>
      </div>
    </div>
    <div class="play-btn" @click="handlePlayVideo"></div>
    <div class="charging-station" @click="routerChange('/overall/allView')"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { useUeStore } from '@/stores/ue';
import bus from '@/utils/bus';
const router = useRouter();
const store = useVisibleComponentStore();
const uestore = useUeStore();
const showIframe = ref(false);
const stationList = [
  {
    id: 1,
    name: '民乐站'
  },
  {
    id: 2,
    name: '莲花村地铁站'
  },
  {
    id: 3,
    name: '红荔西5g站'
  },
  {
    id: 4,
    name: '特来电深圳国际低碳城站'
  },
  {
    id: 5,
    name: '奥特迅综合性充电站'
  },
  {
    id: 6,
    name: '南方电网深圳宝能储能电站'
  }
];
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
const handlePlayUeVideo = (station: string) => {
  uestore.changeShowUeVideo(true);
  bus.emit('changeStation', station);
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
.ue-list-box {
  width: 400px;
  height: 200px;
  position: absolute;
  left: 24px;
  bottom: 89px;
  z-index: 10;
  .ue-list {
    display: flex;
    flex-wrap: wrap;
  }
  .ue-item {
    width: 128px;
    height: 104px;
    margin-right: 8px;
    margin-bottom: 12px;
    cursor: pointer;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>
