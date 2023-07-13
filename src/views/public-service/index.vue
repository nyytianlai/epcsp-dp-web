<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 11:33:28
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-23 10:03:27
 * @FilePath: \epcsp-dp-web\src\views\public-service\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <page-num :data="pageNumData" />
  <left-panel />
  <right-panel />
  <map-layer v-if="aircityObj" />
</template>
<script lang="ts" setup>
import { ref, onMounted, inject, watch, nextTick } from 'vue';
import { overTotalCount } from './api.js';
import { pageNumFun } from './config.js';
// import ScrollTable from './components/scroll-table.vue';
import MapLayer from './components/map-layer.vue';
import LeftPanel from './components/left-panel/index.vue';
import RightPanel from './components/right-panel/index.vue';

const aircityObj = inject('aircityObj');
// 头部累计数据
const pageNumData = ref(pageNumFun());
// const chargingTypesTabs = ref(chargingTypesTabsFun());

// 总览上面4个指标
const getOverTotalCount = async () => {
  const res = await overTotalCount();
  pageNumData.value = pageNumFun(res.data);
};

onMounted(() => {
  getOverTotalCount();
});
</script>
