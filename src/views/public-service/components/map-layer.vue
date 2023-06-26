<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-20 15:25:12
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-09 19:53:43
 * @FilePath: \epcsp-dp-web\src\views\public-service\components\map-layer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <qu :module="4" @addQuBar="addQuBar"></qu>
  <rect-bar2 ref="rectBar2Ref"></rect-bar2>
  <legend-list
    legendName="图例"
    :legendList="legendListData"
    v-show="currentPosition == '深圳市' || currentPosition.includes('区')"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import rectBar2 from '@/components/map-layer/rect-bar2.vue';
import { inject, onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { layerNameQuNameArr, infoObj, getImageUrl, getImageByCloud } from '@/global/config/map';
import { useMapStore } from '@/stores/map';
import bus from '@/utils/bus';
import { jdMonthRate } from '../api.js';
import { mapQuBar } from '../config.js';
const store = useMapStore();
const currentPosition = computed(() => store.currentPosition);
store.changeStationType([1, 2, 3, 4]);
const legendListData = [
  {
    color: 'linear-gradient(178.17deg, #59FFFF 4.74%, #067471 95.4%)',
    name: '利用率'
  }
];
let rectBar2Ref = ref(null);
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
__g.reset();

const getBarData = () => {
  const data = mapQuBar();
  rectBar2Ref.value.addBar(data, 'qu');
};
const sendJdBarData = async (value: { type: string; quCode: string }) => {
  const { data: res } = await jdMonthRate(value.quCode);
  rectBar2Ref.value.addBar(res.data, value.type, value.quCode);
};
onMounted(async () => {
  // await __g.tileLayer.setCollision(infoObj.terrainId, true, true, true, true);
  getBarData()
  bus.on('addBar', async (e) => {
    // 传参由回调函数中的形参接受
    sendJdBarData(e);
  });
});

onBeforeUnmount(() => {
  bus.off('addBar');
});
</script>
<style lang="less" scoped></style>
