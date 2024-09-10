<template>
  <div class="v2g-build-status">
    <title-column title="V2G建设情况" />
    <div class="distributed-content" v-loading="loading">
      <ec-resize :option="ecOption" v-show="!isEmpty" />
      <no-data v-show="isEmpty" />
      <div class="unit" v-show="!isEmpty">
        <div>单位:个</div>
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
    name: 'V2G站',
    code: 'stationNum',
    color: '255, 207, 95',
    unit: '个'
  },
  {
    name: 'V2G桩',
    code: 'pileNum',
    color: '34, 118, 252',
    unit: '个'
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
const ecOption = ref();

const getData = async () => {
  loading.value = true;
  try {
    const { data } = await Api.getV2GResourceDistribution();
    // console.log('getV2GResourceDistribution data :>> ', data);
    chartData.value = data;
  } catch (error) {}
  loading.value = false;
};

const drawChart = async (data = []) => {
  await getEcharts();
  const option: any = getBaseChartOption();
  const legendData = [];
  const series = [];
  chartConfig.forEach((item, i) => {
    series.push({
      name: item.name,
      color: `rgb(${item.color})`,
      type: 'bar',
      data: data.map((obj) => obj[item.code]),
      barWidth: scale(22)
    });
    legendData.push({
      name: item.name,
      itemStyle: {
        color: `rgb(${item.color})`
      }
    });
  });
  console.log('series :>> ', series);
  ecOption.value = {
    ...option,
    xAxis: {
      type: 'category',
      data: ['2023\n第三季度', '20203\n第四季度', '2024\n第一季度', '2024\n第二季度']
    },
    legend: {
      ...option.legend,
      left: 'auto',
      right: '0',
      data: legendData
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
.v2g-build-status {
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
