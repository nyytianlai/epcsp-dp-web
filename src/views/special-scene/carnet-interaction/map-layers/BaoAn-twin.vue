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
import Api from '../api';

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
const store = useMapStore();

let v2gTimer;
let nyxnTimer;
let timer;

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
  const id5 = getTreeLayerIdByName('场内设施Icon_微观', store.treeInfo);
  await Promise.allSettled([__g.tileLayer.hide(id3), __g.tileLayer.show(id5)]);
  switch (tab.viewInfoType) {
    case 'BAOAN_1': // V2G放电
      clearTimeout(nyxnTimer);
      await Promise.allSettled([
        __g.tileLayer.hide(id2),
        __g.tileLayer.show(id),
        __g.misc.callBPFunction({
          functionName: '停止',
          objectName: '动画播放_2'
        })
      ]);
      await __g.misc.callBPFunction({
        functionName: '播放',
        objectName: '播放动画_1'
      });
      __g.camera.set(487377.53125, 2495514.25, 8.84, -21.831873, 186.256775, 0);
      v2gTimer = setTimeout(() => {
        __g.camera.set(487377.53125, 2495514.25, 8.84, -21.831873, 186.256775, 0);
        __g.tileLayer.show(id);
      }, 20000);
      break;
    case 'BAOAN_2': // 能源消纳
      clearTimeout(v2gTimer);
      await Promise.allSettled([
        __g.tileLayer.hide(id),
        __g.tileLayer.show(id2),
        __g.misc.callBPFunction({
          functionName: '停止',
          objectName: '播放动画_1'
        })
      ]);
      await __g.misc.callBPFunction({
        functionName: '播放',
        objectName: '动画播放_2'
      });
      __g.camera.set(487382.25375, 2495466.4575, 21.042456, -18.110382, -80.231377, 0);
      nyxnTimer = setTimeout(async () => {
        __g.camera.set(487382.25375, 2495466.4575, 21.042456, -18.110382, -80.231377, 0);
      }, 17000);
      break;
    case 'BAOAN_3': // 视角漫游
      clearTimeout(v2gTimer);
      clearTimeout(nyxnTimer);
      await Promise.allSettled([
        __g.misc.callBPFunction({
          functionName: '停止',
          objectName: '动画播放_2'
        }),
        __g.misc.callBPFunction({
          functionName: '停止',
          objectName: '播放动画_1'
        }),
        __g.tileLayer.hide([id, id2])
      ]);
      playCamera(__g, '宝安区政府_1');
      break;
    default:
      clearTimeout(v2gTimer);
      clearTimeout(nyxnTimer);
      await __g.camera.stopAnimation();
      await __g.tileLayer.hide([id, id2]);
      await __g.tileLayer.show(id3);
      resetTab3dt();
  }
};
const resetTab3dt = async () => {
  clearTimeout(v2gTimer);
  clearTimeout(nyxnTimer);
  const id2 = getTreeLayerIdByName('V2G放电', store.treeInfo);
  const id3 = getTreeLayerIdByName('能源消纳', store.treeInfo);
  const id4 = getTreeLayerIdByName('场内设施Icon_微观', store.treeInfo);
  await Promise.allSettled([
    __g.cameraTour.stop(),
    __g.camera.stopAnimation(),
    __g.misc.callBPFunction({
      functionName: '停止',
      objectName: '动画播放_2'
    }),
    __g.misc.callBPFunction({
      functionName: '停止',
      objectName: '播放动画_1'
    })
  ]),
    __g.tileLayer.hide([id2, id3, id4]);
};

const showAllPos = async () => {
  const id2 = getTreeLayerIdByName('场内设施Icon_宏观', store.treeInfo);
  const id3 = getTreeLayerIdByName('场内设施Icon_微观', store.treeInfo);
  const id5 = getTreeLayerIdByName('变电箱', store.treeInfo);

  await Promise.allSettled([
    __g.tileLayer.show(id2),
    __g.tileLayer.show(id5),
    __g.tileLayer.hide(id3)
  ]);
};

const hideAllPos = async () => {
  const id = getTreeLayerIdByName('场内设施Icon_宏观', store.treeInfo);
  const id4 = getTreeLayerIdByName('场内设施Icon_微观', store.treeInfo);
  const id2 = getTreeLayerIdByName('V2G放电', store.treeInfo);
  const id3 = getTreeLayerIdByName('能源消纳', store.treeInfo);
  const id5 = getTreeLayerIdByName('变电箱', store.treeInfo);
  // await __g.tileLayer.hide(id);
  // await __g.tileLayer.hide(id2);
  // await __g.tileLayer.hide(id3);
  // await __g.tileLayer.hide(id5);
  await __g.tileLayer.hide([id, id2, id3, id4, id5]);
};

onBeforeUnmount(async () => {
  clearTimeout(timer);
  bus.off('handleTabSelect');
  bus.off('resetTab3dt');
  const id2 = getTreeLayerIdByName('场内设施Icon', store.treeInfo);
  await __g.camera.stopAnimation(),
    await __g.cameraTour.stop(),
    await Promise.allSettled([
      __g.camera.set(infoObj.szView, 0),
      resetTab3dt(),
      hideAllPos(),
      __g.tileLayer.hide(id2)
    ]);
});

bus.on('handleTabSelect', handleTabSelect);

bus.on('resetTab3dt', resetTab3dt);
onMounted(() => {
  timer = setTimeout(showAllPos, 2000);
});
</script>

<style scoped></style>
