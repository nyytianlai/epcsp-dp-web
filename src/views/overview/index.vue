<template>
  <div class="home">
    <!-- <page-num :data="state.pageNumData" /> -->
    <left-panel />
    <right-panel />
    <map-layer v-if="aircityObj" :ref="(el) => (mapLayerRef = el)" />
    <div class="play-btn" @click="handlePlayVideo" />
    <div class="specail-btn" @click="router.push('/super-charging/building')"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, inject, ref } from 'vue';
import { pageNumFun } from './config.js';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
// import PageNum from '@/components/page-num/index.vue';
import MapLayer from './components/map-layer.vue';
import LeftPanel from './components/left-panel/index.vue';
import RightPanel from './components/right-panel/index.vue';
import { useRouter } from 'vue-router';
const aircityObj = inject('aircityObj');
const router = useRouter();
const mapLayerRef = ref(null);
const state = reactive({
  pageNumData: []
});
const store = useVisibleComponentStore();
// 头部累计数据
// 头部累计数据4个指标
// const getOverTotalCount = async () => {
//   // const res = await overTotalCount();
//   // pageNumData.value = pageNumFun(res.data);
// };
const handlePlayVideo = () => {
  store.changeShowPromitionVideo(true);
};

onMounted(async () => {
  state.pageNumData = pageNumFun();
});
</script>

<style lang="less" scoped>
.play-btn {
  width: 36px;
  height: 36px;
  cursor: pointer;
  background-image: url('./images/icon-video.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  top: 148px;
  right: 23%;
  z-index: 999;
}

.specail-btn {
  width: 52px;
  height: 52px;
  cursor: pointer;
  background-image: url('./images/special-secene.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  top: 190px;
  right: 23%;
  z-index: 999;
  transform: translateX(8px);
}
</style>
