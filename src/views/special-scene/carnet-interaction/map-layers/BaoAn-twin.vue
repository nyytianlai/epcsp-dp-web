<template></template>

<script setup lang="ts">
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import { getHtmlUrl } from '@/global/config/map';
import { getImageByCloud, layerNameQuNameArr } from '@/global/config/map';
import { getPopupHtml } from '@/utils/index';
import { scale } from '@sutpc/config';
import { transformCoordsByType } from '@/utils/map-coord-tools';
import { useVisibleComponentStore } from '@/stores/visibleComponent';

import bus from '@/utils/bus';
import Api from '../api';

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;

const store = useVisibleComponentStore();
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

bus.on('handleTabSelect', (tab) => {
  console.log(tab, 'handleTabSelect');
});

bus.on('resetTab3dt', (tab) => {
  console.log(tab, 'resetTab3dt');
});
</script>

<style scoped></style>
