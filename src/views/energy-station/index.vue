<template>
  <div class="energy-station">
    <!-- <page-num :data="pageNumData" /> -->
    <left-panel />
    <right-panel />

    <map-layer v-if="aircityObj" :ref="(el) => (mapLayerRef = el)" />
  </div>
</template>
<script lang="ts" setup>
import { ref, inject } from 'vue';
// import { pageNumFun } from './config.js';
import MapLayer from './components/map-layer.vue';
import LeftPanel from './components/left-panel/index.vue';
import RightPanel from './components/right-panel/index.vue';

interface Aircity {
  value: object;
}
const aircityObj: Aircity = inject('aircityObj');
const mapLayerRef = ref(null);
// 顶部数据
// const pageNumData = ref(pageNumFun());
</script>
