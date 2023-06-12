<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-18 20:40:18
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-09 19:45:18
 * @FilePath: \epcsp-dp-web\src\views\overall\components\map-layer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <qu ref="quRef" :module="200" @addQuBar="addQuBar" @addOutStation="addOutStation"></qu>
  <rect-bar-out ref="rectBarOutRef"></rect-bar-out>
  <legend-list
    :legendList="legendListData"
    :legendName="legendNameData"
    v-show="currentPosition == '深圳市' || currentPosition.includes('区')"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import RectBarOut from '@/components/map-layer/rect-barOut.vue';
import { inject, onMounted, onBeforeUnmount, ref, computed, reactive } from 'vue';
import request from '@sutpc/axios';
import { useMapStore } from '@/stores/map';
import bus from '@/utils/bus';
import { mapJdStationPoint, mapQuBar, mapJdBar } from '../config';
import { returnStationPointConfig } from '@/global/config/map';
const store = useMapStore();
const currentPosition = computed(() => store.currentPosition);
store.changeStationType([1, 2, 3, 4]);

const aircityObj = inject('aircityObj');
aircityObj.value?.acApi.reset();

let quRef = ref(null);
let rectBarOutRef = ref(null);
let legendNameData = ref('站点数/个');
let legendListData = reactive([
  {
    color:
      'linear-gradient(360deg, #86881A -0.06%, #A6A92C 24.54%, #E9ED34 50.1%, #EAE110 100.22%)',
    name: '储能站',
    type: false
  }
]);

// const setRectBarVisibility = (value: boolean) => {
//   value ? store.changeButtomTabCode(1) : store.changeButtomTabCode(2);
//   quRef.value.resetSz(false);
//   legendType.value = value ? 'normal' : 'hot';
//   legendName.value = value ? '充电数量(个)' : '充电功率(KW)';
//   value ? addQuBar() : aircityObj.value?.acApi.marker.deleteByGroupId('rectBar');
// };

const addQuBar = async () => {
  let data = mapQuBar();
  await rectBarOutRef.value.addBar('qu', '储能站', data);
};

const addOutStation = async (module: number) => {
  await aircityObj.value?.acApi.marker.deleteByGroupId('jdStation');
  // const { data: res } =
  const res = mapJdStationPoint();
  let pointArr = [];

  res.forEach((item, index) => {
    let xoffset = item.stationName.length * 12;
    item['xoffset'] = xoffset;
    item['stationType'] = module;
    let o1 = returnStationPointConfig(item);
    pointArr.push(o1);
  });
  await aircityObj.value?.acApi.marker.add(pointArr, null);
};

onMounted(async () => {
  addQuBar();
  bus.on('addBar', (e) => {
    let data = mapJdBar();
    rectBarOutRef.value.addBar(e.type, '储能站', data, e.quCode);
  });
});

onBeforeUnmount(() => {
  bus.off('addBar');
});
</script>
<style lang="less" scoped></style>
