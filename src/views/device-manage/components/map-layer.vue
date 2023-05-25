<template>
  <qu ref="quRef" :buttomTabCode="buttomTabCode" :module="2"></qu>
  <cir-bar4 ref="cirBar4Ref"></cir-bar4>
  <legend-list
    :legendList="legendListData"
    :legendName="legendNameData"
    v-show="currentPosition == '深圳市'"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import CirBar4 from '@/components/map-layer/cir-bar4.vue';
import { inject, onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { useMapStore } from '@/stores/map';
import { layerNameQuNameArr, infoObj, getImageUrl, getImageByCloud } from '@/global/config/map';
import bus from '@/utils/bus';

const aircityObj = inject('aircityObj');
const __g = aircityObj.value.acApi;
__g.reset();

const store = useMapStore();
//所在位置 深圳市 xx区 xx站(取值'')
const currentPosition = computed(() => store.currentPosition);

let quRef = ref(null);
let cirBar4Ref = ref(null);
const buttomTabCode = ref(1);

const legendNameData = buttomTabCode.value == 1 ? '充电桩数/个' : '充电枪数/个';
let legendListData = [
  {
    color: 'linear-gradient(178.17deg, #FBFF2C 4.74%, #4E6200 95.4%)',
    name: '快充桩',
    type: false
  },
  {
    color: 'linear-gradient(178.21deg, #5678F9 6.05%, #003077 94.76%)',
    name: '慢充桩',
    type: false
  },
  {
    color: 'linear-gradient(178.1deg, #4AD9FC 3.02%, #003077 97.03%)',
    name: '超充桩',
    type: false
  },
  {
    color: 'linear-gradient(178.17deg, #B9FFFF 4.74%, #214D4B 95.4%)',
    name: 'V2G桩',
    type: false
  }
];

const setObjVisibility = async (type: string, idPre: string, value: boolean) => {
  value
    ? await __g[type].show(layerNameQuNameArr(idPre))
    : await __g[type].hide(layerNameQuNameArr(idPre));
};
const buttomTabChange = async (code: 1 | 2) => {
  await quRef.value.deleteJdData();
  buttomTabCode.value = code;
  let value = code === 1 ? true : false;
  await setObjVisibility('customTag', 'rectBar1', value);
  let info = await __g.customTag.get('rectBar2-南山区');
  if (info.result === 0) {
    await setObjVisibility('customTag', 'rectBar2', !value);
  } else {
    await cirBar4Ref.value.addBar(buttomTabCode.value, 'qu');
  }
  await quRef.value.resetSz();
};
defineExpose({ buttomTabChange });
onMounted(async () => {
  cirBar4Ref.value.addBar(buttomTabCode.value, 'qu');
  bus.on('addBar', (e) => {
    cirBar4Ref.value.addBar(buttomTabCode.value, e.type, e.quCode);
  });
});

onBeforeUnmount(() => {
  // __g.polygon.delete(["polygon1"]);
  bus.off('addBar');
});
</script>
<style lang="less" scoped></style>
