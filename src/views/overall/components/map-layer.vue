<template>
  <qu></qu>
  <rect-bar></rect-bar>
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import RectBar from '@/components/map-layer/rect-bar.vue';
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import { getImageUrl } from '@/utils/index';
import {layerNameQuNameArr} from '@/global/config/map';

const aircityObj = inject('aircityObj');
aircityObj.acApi.reset();
// const { useEmitt } = inject('aircityObj');

// useEmitt('AIRCITY_EVENT', (e) => {
//   // 编写自己的业务
//   console.log('鼠标左键单击', e);
//   aircityObj.acApi.polygon.focus(e.Id, 13000);

// });

const setRectBarVisibility = (value: boolean) => {
  value
    ? aircityObj.acApi.customTag.show(layerNameQuNameArr('rectBar'))
    : aircityObj.acApi.customTag.hide(layerNameQuNameArr('rectBar'));
};
const setHeatMapVisibility = async (value: boolean) => {
  let info = await aircityObj.acApi.heatmap.get('heatmap1');
  console.log('获取热力图info', info);
  if (info.result === 0) {
    value ? aircityObj.acApi.heatmap.hide('heatmap1') : aircityObj.acApi.heatmap.show('heatmap1');
  } else {
    addHeatMap();
  }
};
const addHeatMap = async () => {
  // await __g.heatmap.clear();
  let bbox = [488670.75, 2488165, 5.7, 491659.59375, 2490987.5, 344.58];
  let range = [0, 100];
  let data = [];
  for (let i = 0; i < 100; i++) {
    let x = getRandNumBetween(bbox[0], bbox[3]); //minX ~ maxX
    let y = getRandNumBetween(bbox[1], bbox[4]); //minY ~ maxY
    data.push({
      id: i.toString(),
      coordinate: [x, y, 0], //热力点的坐标
      radius: Math.random() * 200, //热力点影像半径范围
      heatValue: Math.random() * 100 //热力值
    });
  }
  await aircityObj.acApi.heatmap.add('heatmap1', bbox, range, data);
};
const getRandNumBetween = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
};

defineExpose({
  setRectBarVisibility,
  setHeatMapVisibility
});

onBeforeUnmount(() => {
  // aircityObj.acApi.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped></style>
