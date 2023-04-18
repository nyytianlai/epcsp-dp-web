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
const { useEmitt } = inject('aircityObj');

useEmitt('AIRCITY_EVENT', (e) => {
  // 编写自己的业务
  console.log('鼠标左键单击', e);
  aircityObj.acApi.polygon.focus(e.Id, 13000);
  setQuVisibility(false)
});

const setQuVisibility = async (value: boolean) => {
  // value
  //   ? aircityObj.acApi.polygon.show(layerNameQuNameArr('qu-'))
  //   : aircityObj.acApi.polygon.hide(layerNameQuNameArr('qu-'));
  value
    ? await aircityObj.acApi.customTag.show(layerNameQuNameArr('rectBar'))
    : await aircityObj.acApi.customTag.hide(layerNameQuNameArr('rectBar'));
  value
    ? await aircityObj.acApi.marker.show(layerNameQuNameArr('quName-'))
    : await aircityObj.acApi.marker.hide(layerNameQuNameArr('quName-'));
};

// onMounted(async() => {
//   await aircityObj.acApi.reset();
// });

onBeforeUnmount(() => {
  // aircityObj.acApi.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped></style>
