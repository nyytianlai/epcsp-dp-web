<template>
  <div class="home">
    <!-- <page-num :data="state.pageNumData" /> -->

    <left-panel />
    <right-panel />
    <map-layer :ref="(el) => (mapLayerRef = el)" v-if="aircityObj"></map-layer>

    <div class="play-btn" @click="handlePlayVideo"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, inject, ref } from 'vue';
import { pageNumFun } from './config.js';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import PageNum from '@/components/page-num/index.vue';
import MapLayer from './components/map-layer.vue';
import LeftPanel from './components/left-panel/index.vue';
import RightPanel from './components/right-panel/index.vue';
const aircityObj = inject('aircityObj');
let mapLayerRef = ref(null);
const state = reactive({
  pageNumData: []
});
const store = useVisibleComponentStore();
// 头部累计数据
// 头部累计数据4个指标
const getOverTotalCount = async () => {
  // const res = await overTotalCount();
  // pageNumData.value = pageNumFun(res.data);
};
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
  right: 452px;
  z-index: 999;
}
</style>
