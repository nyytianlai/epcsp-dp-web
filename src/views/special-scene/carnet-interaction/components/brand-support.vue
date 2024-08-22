<template>
  <div class="adjust-trend-analysis">
    <title-column title="品牌支持" />
    <div class="distributed-content" v-loading="loading"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { scale } from '@sutpc/config';
import { getBaseChartOption, adjustTrendConfig } from '../config';
import EcResize, { getEcharts } from '@sutpc/vue3-ec-resize';
import dayjs from 'dayjs';
import Api from '../api';

const loading = ref(true);
const isEmpty = ref(false);
const ecOption = ref();
// const data = Array.from({ length: 24 }).map((_, i) => ({
//   time: dayjs().startOf('day').add(i, 'hour').format('YYYY-MM-DD HH:mm:ss'),
//   busNum: (Math.random() * 100).toFixed(0),
//   busCapacity: (Math.random() * 300).toFixed(0)
// }));
const chartData = ref([]);

const getData = async () => {
  loading.value = true;
  try {
    const params = {
      areaCode: '',
      streetCode: ''
    };
    const { data } = await Api.busCanAdjustmentTrend(params);
    console.log('busCanAdjustmentTrend data :>> ', data);
    chartData.value = data;
  } catch (error) {}
  loading.value = false;
};

onMounted(async () => {
  await getData();
});
</script>

<style scoped lang="less">
.adjust-trend-analysis {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .distributed-content {
    position: relative;
    flex: 1;
    min-height: 0;
    border-radius: 4px;
    background: url('../images/brand-support-bg.png') no-repeat;
    background-size: 100% 100%;
    // box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    // background: linear-gradient(
    //   219.05deg,
    //   rgba(37, 177, 255, 0.02) 16.882%,
    //   rgba(37, 177, 255, 0.2) 100%
    // );

    .unit {
      position: absolute;
      left: 8px;
      right: 4px;
      top: 4px;
      display: flex;
      justify-content: space-between;
      pointer-events: none;
      font-size: 12px;
      font-weight: 400;
      color: #b4c0cc;
    }
  }
}
</style>
