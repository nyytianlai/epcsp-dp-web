<template>
  <div class="today-adjust-demand">
    <title-column title="今日调节需求" />
    <div class="distributed-content" v-loading="loading">
      <ec-resize :option="ecOption" v-show="!isEmpty" />
      <no-data v-show="isEmpty" />
      <div class="unit" v-show="!isEmpty">
        <div>单位:MW</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import EcResize, { getEcharts } from '@sutpc/vue3-ec-resize';
import { scale } from '@sutpc/config';
import { getBaseChartOption } from '../config';
import dayjs from 'dayjs';
import Api from '../api';

const isEmpty = ref(false);
const loading = ref(false);

const chartConfig = [
  {
    name: '调节需求',
    code: 'adjustmentTimes',
    color: '0, 83, 255',
    unit: 'MW'
  }
];
// const data = Array.from({ length: 7 }, (_, i) => ({
//   time: dayjs()
//     .subtract(7 - i, 'days')
//     .format('MM-DD'),
//   cdqlyl: (Math.random() * 100).toFixed(1),
//   cwlyl: (Math.random() * 100).toFixed(1)
// }));
const chartData = ref([]);
const ecOption = ref(getBaseChartOption());

const getData = async () => {
  loading.value = true;
  try {
    const params = {
      areaCode: '',
      streetCode: ''
    };
    const { data } = await Api.busCanAdjustmentDemand(params);
    // console.log('busCanAdjustmentDemand data :>> ', data);
    chartData.value = data;
  } catch (error) {}
  loading.value = false;
};

const drawChart = async (data = []) => {
  await getEcharts();
  const option = getBaseChartOption();
  const series = [];

  chartConfig.forEach((item, i) => {
    series.push({
      name: item.name,
      color: `rgb(${item.color})`,
      type: 'line',
      yAxisIndex: 0,
      data: data.map((obj) => [obj.time, obj[item.code]]),
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: `rgba(${item.color},0.1)`
            },
            {
              offset: 1,
              color: `rgba(${item.color},0.5)`
            }
          ]
        }
      }
    });
  });

  ecOption.value = {
    ...option,
    legend: {
      ...option.legend,
      left: 'auto',
      right: '0'
    },
    series
  };
};
onMounted(async () => {
  await getData();
  drawChart(chartData.value);
});
</script>

<style scoped lang="less">
.today-adjust-demand {
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

    // box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    // background: linear-gradient(
    //   219.05deg,
    //   rgba(37, 177, 255, 0.02) 16.882%,
    //   rgba(37, 177, 255, 0.2) 100%
    // );

    .unit {
      position: absolute;
      left: 8px;
      top: 4px;
      pointer-events: none;
      font-size: 12px;
      font-weight: 400;
      color: #b4c0cc;
    }
  }
}
</style>
