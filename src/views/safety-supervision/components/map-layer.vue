<template>
  <qu ref="quRef" :buttomTabCode="buttomTabCode"></qu>
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

import { useStore } from 'vuex';
const store = useStore();
const currentPosition = computed(() => store.getters.currentPosition);
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

const setObjVisibility = (type: string, idPre: string, value: boolean) => {
  value ? __g[type].show(layerNameQuNameArr(idPre)) : __g[type].hide(layerNameQuNameArr(idPre));
};

const buttomTabChange = async (code: 1 | 2) => {
  buttomTabCode.value = code;
  let value = code === 1 ? true : false;
  setObjVisibility('customTag', 'rectBar1', value);
  let info = await __g.customTag.get('rectBar2-南山区');
  console.log('获取rectBar2-南山区info', info);
  if (info.result === 0) {
    setObjVisibility('customTag', 'rectBar2', !value);
  } else {
    cirBar3Ref.value.addBar(buttomTabCode.value);
  }
  quRef.value.resetSz();
};

defineExpose({ buttomTabChange });

onMounted(async () => {
  await __g.tileLayer.delete('1');
  // await __g.tileLayer.setCollision(infoObj.terrainId, false, true, false, true);
  await __g.tileLayer.setCollision(infoObj.terrainId, true, true, true, true);
  cirBar3Ref.value.addBar(buttomTabCode.value);
});

onBeforeUnmount(() => {
  // __g.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped>
.backBox {
  position: absolute;
  height: 36px;
  left: 86px;
  top: 68px;
  display: flex;
  background: rgba(4, 22, 43, 0.4);
  border: 1px solid rgba(148, 148, 148, 0.3);
  color: #ffffff;
  z-index: 10;

  img {
    width: 36px;
    height: 36px;
    border-radius: 1px;
  }

  .quName {
    font-size: 16px;
    line-height: 22px;
    // background: rgba(4, 22, 43, 0.5);
    // border: 1px solid rgba(148, 148, 148, 0.3);
    padding: 7px 16px;
  }
}
</style>
