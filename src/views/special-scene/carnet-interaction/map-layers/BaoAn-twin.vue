<template></template>

<script setup lang="ts">
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import { useMapStore } from '@/stores/map';
import {
  getImageByCloud,
  getHtmlUrl,
  focusToHihtLightPop,
  getTreeLayerIdByName
} from '@/global/config/map';
import { getPopupHtml } from '@/utils/index';
import { scale } from '@sutpc/config';
import { transformCoordsByType } from '@/utils/map-coord-tools';

import bus from '@/utils/bus';
import Api from '../api';

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
const store = useMapStore();
onBeforeUnmount(() => {
  bus.off('handleTabSelect');
  bus.off('resetTab3dt');
});

useEmitt('AIRCITY_EVENT', async (e) => {
  console.log(e, 'AIRCITY_EVENT');
  // 点击站点图标
  if (e.eventtype === 'LeftMouseButtonClick') {
  }

  if (e.eventtype === 'MarkerCallBack') {
  }
});

const handleTabSelect = async (tab) => {
  await __g.cameraTour.stop();
  await __g.camera.set(...JSON.parse(tab.viewInfo));
  const id = getTreeLayerIdByName('V2G放电', store.treeInfo);
  const id2 = getTreeLayerIdByName('能源消纳', store.treeInfo);
  switch (tab.viewInfoType) {
    case 'BAOAN_1': // V2G放电
      await __g.tileLayer.hide(id2);
      __g.tileLayer.show(id);
      break;
    case 'BAOAN_2': // 能源消纳
      await __g.tileLayer.hide(id);
      __g.tileLayer.show(id2);
      break;
    case 'BAOAN_3': // 视角漫游
      await __g.tileLayer.hide([...id, ...id2]);
      break;
    default:
      resetTab3dt();
  }
};
const resetTab3dt = async () => {
  await __g.cameraTour.stop();
  const id = getTreeLayerIdByName('V2G放电', store.treeInfo);
  const id2 = getTreeLayerIdByName('能源消纳', store.treeInfo);
  await __g.tileLayer.hide([id, id2]);
};

const showAllPos = async () => {
  const id = getTreeLayerIdByName('变电箱', store.treeInfo);
  const id2 = getTreeLayerIdByName('场内设施Icon', store.treeInfo);
  await __g.tileLayer.show([id, id2]);
};

const hideAllPos = async () => {
  const id = getTreeLayerIdByName('变电箱', store.treeInfo);
  const id2 = getTreeLayerIdByName('场内设施Icon', store.treeInfo);
  await __g.tileLayer.hide([id, id2]);
};

onBeforeUnmount(async () => {
  await resetTab3dt();
  await hideAllPos();
});

onMounted(showAllPos);
bus.on('handleTabSelect', handleTabSelect);

bus.on('resetTab3dt', resetTab3dt);
</script>

<style scoped></style>
