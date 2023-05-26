<template>
  <qu ref="quRef" :buttomTabCode="buttomTabCode" :module="3"></qu>
  <cir-bar3 ref="cirBar3Ref"></cir-bar3>
  <legend-list
    :legendList="legendListData1"
    :legendName="legendNameData1"
    v-show="currentPosition == '深圳市' && buttomTabCode == 1"
  />
  <legend-list
    :legendList="legendListData2"
    :legendName="legendNameData2"
    v-show="currentPosition == '深圳市' && buttomTabCode == 2"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import cirBar3 from '@/components/map-layer/cir-bar3.vue';
import { inject, onMounted, onBeforeUnmount, ref, reactive, computed } from 'vue';
import request from '@sutpc/axios';
// import {  } from '@/utils/index';
import { layerNameQuNameArr, infoObj, getImageUrl, getImageByCloud } from '@/global/config/map';
import bus from '@/utils/bus';

import { useMapStore } from '@/stores/map'
const store = useMapStore()
const currentPosition = computed(() => store.currentPosition);
const legendNameData1 = '告警级别（个）';
const legendListData1 = [
  {
    color: 'linear-gradient(178.17deg, #FF0005 4.74%, #590303 95.4%)',
    name: '一级 人身安全'
  },
  {
    color: 'linear-gradient(178.1deg, #FF7A00 3.02%, #772B00 97.03%)',
    name: '二级 设备安全'
  },
  {
    color: 'linear-gradient(178.21deg, #FFF501 6.05%, #7E8E19 94.76%)',
    name: '三级 告警提示'
  }
];

const legendNameData2 = '充电站状态';
const legendListData2 = [
  {
    color: ' #2AD7FD',
    name: '正常'
  },
  {
    color: '#FFB800',
    name: '预警'
  },
  {
    color: '#A3A3A3',
    name: '未上线'
  }
];
let cirBar3Ref = ref(null);
let quRef = ref(null);
const buttomTabCode = ref(1);
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
__g.reset();

const setObjVisibility = async (type: string, idPre: string, value: boolean) => {
  value
    ? await __g[type].show(layerNameQuNameArr(idPre))
    : await __g[type].hide(layerNameQuNameArr(idPre));
};

const buttomTabChange = async (code: 1 | 2) => {
  await quRef.value.deleteJdData();
  buttomTabCode.value = code;
  let value = code === 1 ? true : false;
  await setObjVisibility('marker', 'rectBar1', value);
  let info = await __g.customTag.get('rectBar2-南山区');
  if (info.result === 0) {
    await setObjVisibility('marker', 'rectBar2', !value);
  } else {
    await cirBar3Ref.value.addBar(buttomTabCode.value, 'qu');
  }
  await quRef.value.resetSz();
};

defineExpose({ buttomTabChange });

onMounted(async () => {
  // await __g.tileLayer.setCollision(infoObj.terrainId, false, true, false, true);
  // await __g.tileLayer.setCollision(infoObj.terrainId, true, true, true, true);
  cirBar3Ref.value.addBar(buttomTabCode.value, 'qu');
  bus.on('addBar', (e) => {
    cirBar3Ref.value.addBar(buttomTabCode.value, e.type, e.quCode);
  });
});

onBeforeUnmount(() => {
  // __g.polygon.delete(["polygon1"]);
  bus.off('addBar');
});
</script>
<style lang="less" scoped></style>
