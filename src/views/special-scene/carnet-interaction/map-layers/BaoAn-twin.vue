<template></template>

<script setup lang="ts">
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import { useMapStore } from '@/stores/map';
import {
  getImageByCloud,
  getHtmlUrl,
  focusToHihtLightPop,
  getTreeLayerIdByName,
  playCamera
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

let v2gTimer;
let nyxnTimer;

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
  tab.viewInfo && (await __g.camera.set(...JSON.parse(tab.viewInfo)));
  const id = getTreeLayerIdByName('V2G放电', store.treeInfo);
  const id2 = getTreeLayerIdByName('能源消纳', store.treeInfo);
  const id3 = getTreeLayerIdByName('宝安区政府站点_植被', store.treeInfo);
  await __g.tileLayer.hide(id3);
  switch (tab.viewInfoType) {
    case 'BAOAN_1': // V2G放电
      clearTimeout(nyxnTimer);
      await __g.tileLayer.hide(id2);
      await __g.tileLayer.show(id);
      await __g.misc.callBPFunction({
        functionName: '停止',
        objectName: '动画播放_2'
      });
      __g.misc.callBPFunction({
        functionName: '播放',
        objectName: '播放动画_1'
      });
      v2gTimer = setTimeout(() => {
        __g.camera.set(487378.9825, 2495522.527188, 12.540851, -26.378933, 143.160629, 0);
        __g.tileLayer.show(id);
      }, 20000);
      break;
    case 'BAOAN_2': // 能源消纳
      clearTimeout(v2gTimer);
      await __g.tileLayer.hide(id);
      await __g.tileLayer.show(id2);
      await __g.misc.callBPFunction({
        functionName: '停止',
        objectName: '播放动画_1'
      });
      __g.misc.callBPFunction({
        functionName: '播放',
        objectName: '动画播放_2'
      });
      break;
    case 'BAOAN_3': // 视角漫游
      await __g.misc.callBPFunction({
        functionName: '停止',
        objectName: '动画播放_2'
      });
      await __g.misc.callBPFunction({
        functionName: '停止',
        objectName: '播放动画_1'
      });
      await __g.tileLayer.hide([id, id2]);
      playCamera(__g, '宝安区政府2');
      break;
    default:
      await __g.camera.stopAnimation();
      await __g.tileLayer.hide([id, id2]);
      await __g.tileLayer.show(id3);
      resetTab3dt();
  }
};
const resetTab3dt = async () => {
  clearTimeout(v2gTimer);
  clearTimeout(nyxnTimer);
  await __g.cameraTour.stop();
  await __g.misc.callBPFunction({
    functionName: '停止',
    objectName: '动画播放_2'
  });
  await __g.misc.callBPFunction({
    functionName: '停止',
    objectName: '播放动画_1'
  });
  const id2 = getTreeLayerIdByName('V2G放电', store.treeInfo);
  const id3 = getTreeLayerIdByName('能源消纳', store.treeInfo);
  const id4 = getTreeLayerIdByName('场内设施Icon', store.treeInfo);
  await __g.tileLayer.hide(id2);
  await __g.tileLayer.hide(id3);
  await __g.tileLayer.show(id4);
};

const showAllPos = async () => {
  const id2 = getTreeLayerIdByName('场内设施Icon', store.treeInfo);
  const id5 = getTreeLayerIdByName('变电箱', store.treeInfo);
  await __g.tileLayer.show(id2);
  await __g.tileLayer.show(id5);
};

const hideAllPos = async () => {
  const id = getTreeLayerIdByName('场内设施Icon', store.treeInfo);
  const id2 = getTreeLayerIdByName('V2G放电', store.treeInfo);
  const id3 = getTreeLayerIdByName('能源消纳', store.treeInfo);
  const id5 = getTreeLayerIdByName('变电箱', store.treeInfo);
  await __g.tileLayer.hide(id);
  await __g.tileLayer.hide(id2);
  await __g.tileLayer.hide(id3);
  await __g.tileLayer.hide(id5);
};

onBeforeUnmount(async () => {
  __g.camera.stopAnimation();
  bus.off('handleTabSelect');
  bus.off('resetTab3dt');
  const id2 = getTreeLayerIdByName('场内设施Icon', store.treeInfo);
  await resetTab3dt();
  await hideAllPos();
  await __g.tileLayer.hide(id2);
});

bus.on('handleTabSelect', handleTabSelect);

bus.on('resetTab3dt', resetTab3dt);
onMounted(showAllPos);
</script>

<style scoped></style>
