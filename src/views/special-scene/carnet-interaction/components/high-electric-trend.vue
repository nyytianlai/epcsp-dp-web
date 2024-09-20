<template>
  <div class="v2g-build-status">
    <title-column title="用电高峰统计" />
    <div class="distributed-content" v-loading="loading">
      <ec-resize :option="ecOption" v-show="!isEmpty" />
      <no-data v-show="isEmpty" />
      <div class="unit" v-show="!isEmpty">
        <div>单位:个</div>
        <div>单位:%</div>
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
    name: '用电量',
    code: 'stationNum',
    color: '136, 198, 255, 1',
    unit: '个',
    type: 'bar'
  },
  {
    name: '占比',
    code: 'pileNum',
    color: '0, 255, 249, 1',
    unit: '个',
    type: 'line'
  }
];
const chartData = ref([]);
const ecOption = ref();

const getData = async () => {
  loading.value = true;
  try {
    const { data } = await Api.getV2GChargeCapacityHour();
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
      type: item.type,
      data: data.map((obj) => obj[item.code]),
      barWidth: scale(22),
      yAxisIndex: i,
      itemStyle: item.type === 'bar' && {
        color: () => {
          return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 1,
              color: 'rgba(0, 58, 255, 0.0001)'
            },
            {
              offset: 0,
              color: '#88C6FF'
            }
          ]);
        }
      }
    });
    legendData.push({
      name: item.name,
      itemStyle: {
        color: `rgb(${item.color})`
      }
    });
  });
  ecOption.value = {
    ...option,
    yAxis: [option.yAxis, option.yAxis],
    legend: {
      ...option.legend,
      left: 'center',
      right: 'center',
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
      width: 100%;
      position: absolute;
      left: 8px;
      top: 4px;
      pointer-events: none;
      font-size: 12px;
      font-weight: 400;
      color: #b4c0cc;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
