<template>
  <qu ref="quRef" :module="1" @addQuBar="addQuBar"></qu>
  <rect-bar ref="rectBarRef"></rect-bar>
  <!-- <rect-bar4 ref="rectBarRef"></rect-bar4> -->
  <!-- <heat-map v-if="isHeatMap"></heat-map> -->
  <legend-list
    :legendType="legendType"
    :legendName="legendName"
    v-show="currentPosition == '深圳市' || currentPosition.includes('区')"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import RectBar from '@/components/map-layer/rect-bar.vue';
import { inject, onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { projectCGCS2000_2_GK114 } from '@/utils/index';
import { getHeatMap } from '../api.js';
import { gcj02ToWgs84 } from '@sutpc/zebra';
import { useMapStore } from '@/stores/map';
const store = useMapStore();
const currentPosition = computed(() => store.currentPosition);
store.changeStationType([1, 2, 3]);

let updateHeatMapInterval = null; //定时更新热力图的定时器
const aircityObj = inject('aircityObj');
aircityObj.value?.acApi.reset();
aircityObj.value?.acApi.reset(4);
let quRef = ref(null);
let rectBarRef = ref(null);
const legendType = ref('normal');
const legendName = ref('充电数量(个)');
const isHeatMap = ref(false);

const setRectBarVisibility = (value: boolean) => {
  value ? store.changeButtomTabCode(1) : store.changeButtomTabCode(2);
  quRef.value.resetSz(false);
  legendType.value = value ? 'normal' : 'hot';
  legendName.value = value ? '充电数量(个)' : '充电功率(kW)';
  value ? addQuBar() : aircityObj.value?.acApi.marker.deleteByGroupId('rectBar');
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
  // isHeatMap.value = value;
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
  const { data: res } = await getHeatMap();
  let realTimePower = res.map((item) => {
    return item.realTimePower;
  });

  let heightStart = Math.min(...realTimePower);
  let heightEnd = Math.max(...realTimePower);
  // let bbox = [474756.13,2477776.28, -20, 622300.98,2546813.48, 344.58];
  let bbox = [474756.13, 2477776.28, -200, 622300.98, 2546813.48, 344.58];
  let range = [0, 100000];
  let data = [];
  res.forEach((element) => {
    const coord84 = gcj02ToWgs84(Number(element.longitude), Number(element.latitude));
    const coord4547 = projectCGCS2000_2_GK114(coord84);
    data.push({
      id: element.stationId,
      coordinate: [...coord4547, 0], //热力点的坐标
      radius: 4000, //热力点影像半径范围
      heatValue: element.realTimePower //热力值
    });
  });
  await aircityObj.value?.acApi.heatmap.add('heatmap1', bbox, range, data);
};

const addQuBar = async () => {
  await rectBarRef.value.addBar('qu');
};

defineExpose({
  setRectBarVisibility,
  setHeatMapVisibility
});

onMounted(async () => {
  addQuBar();
});

onBeforeUnmount(() => {});
</script>
<style lang="less" scoped></style>
