<template>
  <qu ref="quRef" :module="2"></qu>
  <!-- :buttomTabCode="buttomTabCode" -->
  <cir-bar4 ref="cirBar4Ref"></cir-bar4>
  <legend-list
    :legendList="legendListData"
    :legendName="legendNameData"
    v-show="currentPosition == '深圳市' || currentPosition.includes('区')"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import CirBar4 from '@/components/map-layer/cir-bar4.vue';
import { inject, onMounted, onBeforeUnmount, ref, computed, reactive } from 'vue';
import { useMapStore } from '@/stores/map';
import {
  layerNameQuNameArr,
  quNameCodeInterTrans,
  infoObj,
  getImageUrl,
  getImageByCloud
} from '@/global/config/map';
import bus from '@/utils/bus';

const aircityObj = inject('aircityObj');
const __g = aircityObj.value.acApi;
__g.reset();

const store = useMapStore();
//所在位置 深圳市 xx区 xx站(取值'')
const currentPosition = computed(() => store.currentPosition);
const currentJdCode = computed(() => store.currentJdCode);
const buttomTabCode = computed(() => store.buttomTabCode);
const stationType = computed(() => new Set(store.stationType));
store.changeStationType([1, 2, 3, 4]);

let quRef = ref(null);
let cirBar4Ref = ref(null);

let legendNameData = ref('充电桩数/个');
let legendListData = reactive([
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
]);

const setLegendData = (code: 1 | 2) => {
  let type = code == 1 ? '桩' : '枪';
  (legendNameData.value = `充电${type}数/个`),
    legendListData.forEach((item) => {
      item.name = item.name.slice(0, -1) + type;
      item.type = false;
    });
};

const setObjVisibility = async (type: string, idPre: string, value: boolean) => {
  value
    ? await __g[type].show(layerNameQuNameArr(idPre))
    : await __g[type].hide(layerNameQuNameArr(idPre));
};
const buttomTabChange = async (code: 1 | 2) => {
  await quRef.value.deleteJdData();
  store.changeButtomTabCode(code);
  store.changeStationType([1, 2, 3, 4]);
  setLegendData(code);
  await __g.marker.deleteByGroupId('rectBar-qu');
  await __g.marker.deleteByGroupId('rectBar-jd');
  await cirBar4Ref.value.addBar({
    code: buttomTabCode.value,
    type: 'qu',
    chargeType: Array.from(stationType.value)
  });

  await quRef.value.resetSz();
};

type ChargeType = { name: string; isChoose: boolean; code: number };
const handleChargeTypeChange = async (item: ChargeType) => {
  legendListData.forEach((ele) => {
    if (ele.name === item.name) {
      ele.type = !item.isChoose;
      item.isChoose ? stationType.value.add(item.code) : stationType.value.delete(item.code);
      store.changeStationType(Array.from(stationType.value));
    }
  });
  await __g.marker.deleteByGroupId('rectBar-qu');
  await __g.marker.deleteByGroupId('rectBar-jd');
  if (currentPosition.value.includes('市') && stationType.value.size) {
    cirBar4Ref.value.addBar({
      code: buttomTabCode.value,
      type: 'qu',
      chargeType: Array.from(stationType.value)
    });
  } else if (currentPosition.value.includes('区') && stationType.value.size) {
    cirBar4Ref.value.addBar({
      code: buttomTabCode.value,
      type: 'jd',
      quCode: quNameCodeInterTrans('name', currentPosition.value),
      chargeType: Array.from(stationType.value)
    });
  } else if (currentPosition.value.includes('街道')) {
    quRef.value.addStationPoint(currentJdCode.value);
  }
};
defineExpose({ buttomTabChange, handleChargeTypeChange });
onMounted(async () => {
  cirBar4Ref.value.addBar({
    code: buttomTabCode.value,
    type: 'qu',
    chargeType: Array.from(stationType.value)
  });
  bus.on('addBar', (e) => {
    //加载街道的柱状图
    cirBar4Ref.value.addBar({
      code: buttomTabCode.value,
      type: e.type,
      quCode: e.quCode,
      chargeType: Array.from(stationType.value)
    });
  });
});

onBeforeUnmount(() => {
  // __g.polygon.delete(["polygon1"]);
  bus.off('addBar');
});
</script>
<style lang="less" scoped></style>
