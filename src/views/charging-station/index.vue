<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 12:55:20
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-05 09:45:33
 * @FilePath: \epcsp-dp-web\src\views\overall\overview\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <page-num :data="pageNumData" />
  <left-panel />
  <right-panel />
  <bottom-menu-tabs :data="bottomTabsData" @changeTab="changeButtomTab" />
  <map-layer :ref="(el) => (mapLayerRef = el)" v-if="aircityObj"></map-layer>
</template>
<script lang="ts" setup>
import { onMounted, ref, inject } from 'vue';
import { overTotalCount, dayPower } from './api.js';
import { pageNumFun, bottomTabDataFun } from './config.js';
import MapLayer from './components/map-layer.vue';
import PageNum from '@/components/page-num/index.vue';
import LeftPanel from './components/left-panel/index.vue';
import RightPanel from './components/right-panel/index.vue';
interface Aircity {
  value: object;
}
// 左二图的tab
const aircityObj: Aircity = inject('aircityObj');
let mapLayerRef = ref(null);
// 头部累计数据
const pageNumData = ref(pageNumFun());
// 充电功率
const powerInfoNumData = ref(0);
//底部button
const bottomTabsData = ref(bottomTabDataFun());

const changeButtomTab = (item) => {
  console.log('底部切换', item);
  let value = item.code === 1 ? true : false;
  mapLayerRef.value.setRectBarVisibility(value);
  mapLayerRef.value.setHeatMapVisibility(!value);
};
// 总览上面4个指标
const getOverTotalCount = async () => {
  const res = await overTotalCount();
  pageNumData.value = pageNumFun(res.data);
};

//今日充电功率信息
const getDayPower = async () => {
  const res = await dayPower();
  powerInfoNumData.value = res.data;
};

onMounted(() => {
  getOverTotalCount();
});
</script>
