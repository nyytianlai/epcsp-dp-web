<template></template>

<script setup lang="ts">
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import { useMapStore } from '@/stores/map';
import {
  getImageByCloud,
  getHtmlUrl,
  focusToHihtLightPop,
  getTreeLayerIdByName,
  playCamera,
  infoObj
} from '@/global/config/map';
import { getPopupHtml } from '@/utils/index';
import { scale } from '@sutpc/config';
import { transformCoordsByType } from '@/utils/map-coord-tools';

import bus from '@/utils/bus';

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
const store = useMapStore();

useEmitt('AIRCITY_EVENT', async (e) => {
  console.log(e, 'AIRCITY_EVENT');
  // 点击站点图标
  if (e.eventtype === 'LeftMouseButtonClick') {
  }

  if (e.eventtype === 'MarkerCallBack') {
  }
});

const handleTabSelect = async (tab) => {
  switch (tab.viewInfoType) {
    case 'BAOAN_1': // 站内设施
      showAllPos();
      break;
    case 'BAOAN_2': // 光伏信息
      break;
    case 'BAOAN_3': // 视角漫游
  }
};
const resetTab3dt = async () => {};

const enterStation = async () => {
  const id = getTreeLayerIdByName('南网_莲花山充电站', store.treeInfo);
  await __g.infoTree.show(id);
};

const exitStation = async () => {
  const id = getTreeLayerIdByName('南网_莲花山充电站', store.treeInfo);
  await __g.infoTree.hide(id);
};

const showAllPos = async () => {};

const hideAllPos = async () => {};

bus.on('handleTabSelect', handleTabSelect);
console.log('11111111111111111111111111111111');
bus.on('resetTab3dt', resetTab3dt);
onMounted(() => {
  enterStation();
});

onBeforeUnmount(async () => {
  exitStation();
});
</script>

<style scoped></style>
