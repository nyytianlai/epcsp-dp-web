<template>
  <qu ref="quRef" @changeCurrentPosition="changeCurrentPosition"></qu>
  <rect-bar></rect-bar>
  <legend-list v-show="currentPosition == '深圳市'" />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import RectBar from '@/components/map-layer/rect-bar.vue';
import { inject, onMounted, onBeforeUnmount, ref } from 'vue';

const aircityObj = inject('aircityObj');
const __g = aircityObj.acApi;
__g.reset();

const currentPosition = ref('深圳市'); //所在位置 深圳市 xx区 xx站(取值'')
let currentPositionBak = '';
let currentHrStationID = ''; //当前点击的高渲染站点id
let quRef = ref(null);

const changeCurrentPosition = (position: string) => {
  currentPosition.value = position;
};

const test = async () => {
  __g.misc.callBPFunction({
    objectName: 'BP_PlaySequence_2',
    functionName: 'PlaySequence'
  });
};

onMounted(async () => {
  await __g.tileLayer.delete('1');
  // await __g.tileLayer.setCollision(infoObj.terrainId, true, true, true, true);
  // test();
});

onBeforeUnmount(() => {
  // __g.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped></style>
