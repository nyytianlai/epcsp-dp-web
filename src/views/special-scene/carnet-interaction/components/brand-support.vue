<template>
  <div class="brand-support">
    <title-column title="品牌支持" />
    <div class="brand-support-content" v-loading="loading"></div>
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
.brand-support {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .brand-support-content {
    position: relative;
    flex: 1;
    min-height: 0;
    border-radius: 4px;
    background: url('../images/brand-support-bg.png') no-repeat;
  }
}
</style>
