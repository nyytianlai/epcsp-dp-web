<template>
  <div class="area-distributed">
    <title-column title="运行趋势" />
    <tabs :data="operationTabType" @changeTab="handleStation" />
    <div class="distributed-content">
      <ec-resize :option="ecOption" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  operationTabType,
  operationTrendConfig,
  chartColorList,
  getBaseChartOption
} from '../config.js';
import { scale } from '@sutpc/config';
import EcResize, { getEcharts } from '@sutpc/vue3-ec-resize';
import dayjs from 'dayjs';

const ecOption = ref(getBaseChartOption());

const handleStation = (item) => {
  console.log('item', item);
  switch (item.code) {
    case 1:
      break;
    case 3:
      break;
  }
};

const drawChart = async () => {
  await getEcharts();
  const option = getBaseChartOption();
  const legendData = [];
  const series = [];
  const generateData = () => {
    return Array.from(new Array(7), (i, n) => [
      dayjs()
        .subtract(6 - n, 'days')
        .format('DD日'),
      (Math.random() * 500).toFixed(0)
    ]);
  };
  operationTrendConfig().forEach((item, i) => {
    series.push({
      name: item.name,
      color: chartColorList[i],
      type: item.type,
      symbol: 'none',
      barWidth: item.type === 'bar' && scale(14),
      yAxisIndex: i,
      data: generateData()
    });

    legendData.push({
      name: item.name,
      icon: 'circle',
      color: chartColorList[i],
      itemStyle: {
        color: chartColorList[i]
      }
    });
  });
  ecOption.value = {
    ...option,
    yAxis: [option.yAxis, option.yAxis],
    legend: {
      ...option.legend,
      data: legendData
    },
    series
  };
  console.log(ecOption.value);
};

onMounted(drawChart);
</script>

<style scoped lang="less">
.area-distributed {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .distributed-content {
    flex: 1;
    min-height: 0;
    border-radius: 4px;

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );
  }
}
</style>
