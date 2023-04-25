<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-18 20:40:18
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-21 11:18:53
 * @FilePath: \epcsp-dp-web\src\views\overall\components\map-layer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <qu ref="quRef"></qu>
  <rect-bar></rect-bar>
  <legend-list
    :legendType="legendType"
    :legendName="legendName"
    v-show="currentPosition == '深圳市'"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import RectBar from '@/components/map-layer/rect-bar.vue';
import { inject, onMounted, onBeforeUnmount, ref, computed } from 'vue';
import request from '@sutpc/axios';
import { projectCGCS2000_2_GK114 } from '@/utils/index';
import { layerNameQuNameArr, getImageUrl } from '@/global/config/map';
import { getHeatMap } from '@/api/overall';
import { gcj02ToWgs84 } from '@sutpc/zebra';
import { useStore } from 'vuex';
const store = useStore();
const currentPosition = computed(() => store.getters.currentPosition);

let updateHeatMapInterval = null; //定时更新热力图的定时器
const aircityObj = inject('aircityObj');
aircityObj.value?.acApi.reset();

let quRef = ref(null);
const legendType = ref('normal');
const legendName = ref('充电数量(个)');

const setRectBarVisibility = (value: boolean) => {
  // quRef.value.resetSz();
  legendType.value = value ? 'normal' : 'hot';
  legendName.value = value ? '充电数量(个)' : '图例-充电功率(KW)';
  value
    ? aircityObj.value?.acApi.customTag.show(layerNameQuNameArr('rectBar'))
    : aircityObj.value?.acApi.customTag.hide(layerNameQuNameArr('rectBar'));
};
const setHeatMapVisibility = async (value: boolean) => {
  let info = await aircityObj.value?.acApi.heatmap.get('heatmap1');
  console.log('获取热力图info', info);
  if (info.result === 0) {
    value
      ? aircityObj.value?.acApi.heatmap.show('heatmap1')
      : aircityObj.value?.acApi.heatmap.hide('heatmap1');
  } else {
    addHeatMap();
  }
  value ? updateHeatMap() : clearInterval(updateHeatMapInterval);
};
const updateHeatMap = () => {
  updateHeatMapInterval = setInterval(async () => {
    let data = [];
    const { data: res } = await getHeatMap();
    res.forEach((element) => {
      const coord84 = gcj02ToWgs84(Number(element.longitude), Number(element.latitude));
      const coord4547 = projectCGCS2000_2_GK114(coord84);
      data.push({
        id: element.stationId,
        heatValue: element.realTimePower //热力值
      });
    });
    aircityObj.value?.acApi.heatmap.update('heatmap1', null, null, data);
  }, 1 * 60 * 60 * 1000);
};
const addHeatMap = async () => {
  // await __g.heatmap.clear();
  const { data: res } = await getHeatMap();
  let bbox = [470754, 2472106, 5.7, 629306, 2550338, 344.58];
  let range = [0, 1000];
  let data = [];
  res.forEach((element) => {
    const coord84 = gcj02ToWgs84(Number(element.longitude), Number(element.latitude));
    const coord4547 = projectCGCS2000_2_GK114(coord84);
    data.push({
      id: element.stationId,
      coordinate: [...coord4547, 0], //热力点的坐标
      radius: 660, //热力点影像半径范围
      heatValue: element.realTimePower //热力值
    });
  });
  await aircityObj.value?.acApi.heatmap.add('heatmap1', bbox, range, data);
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
