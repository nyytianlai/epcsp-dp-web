<template>
  <page-num :data="pageNumData" />
  <left-panel />
  <right-panel />
  <bottom-menu-tabs :data="bottomTabsData" @changeTab="changeButtomTab" />
  <map-layer v-if="aircityObj" :ref="(el) => (mapLayerRef = el)" />
</template>
<script lang="ts" setup>
import { onMounted, ref, inject } from 'vue';
import { overTotalCount } from './api.js';
import { pageNumFun, bottomTabDataFun } from './config.js';
import MapLayer from './components/map-layer.vue';
import PageNum from '@/components/page-num/index.vue';
import LeftPanel from './components/left-panel/index.vue';
import RightPanel from './components/right-panel/index.vue';
interface Aircity {
  value: object;
}
const aircityObj: Aircity = inject('aircityObj');
const mapLayerRef = ref(null);
// 头部累计数据
const pageNumData = ref(pageNumFun());
// 底部button
const bottomTabsData = ref(bottomTabDataFun());

const changeButtomTab = (item) => {
  console.log('底部切换', item);
  const value = item.code === 1 ? true : false;
  mapLayerRef.value.setRectBarVisibility(value);
  mapLayerRef.value.setHeatMapVisibility(!value);
};
// 总览上面4个指标
const getOverTotalCount = async () => {
  const res = await overTotalCount();
  pageNumData.value = pageNumFun(res.data);
};

onMounted(() => {
  getOverTotalCount();
});
</script>
