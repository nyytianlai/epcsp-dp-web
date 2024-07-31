<template>
  <div class="area-distributed">
    <title-column title="运行趋势" />
    <tabs v-model="selectType" :data="operationTabType" />
    <div class="distributed-content" v-loading="isLoading">
      <ec-resize :option="ecOption" v-show="!isEmpty" />
      <no-data v-show="isEmpty" />
      <div class="unit" v-show="!isEmpty">
        <div>单位：次</div>
        <div>单位：度</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  operationTabType,
  operationTrendConfig,
  chartColorList,
  getBaseChartOption
} from '../config.js';
import { scale } from '@sutpc/config';
import EcResize, { getEcharts } from '@sutpc/vue3-ec-resize';
import dayjs from 'dayjs';
import Api from '../api.js';

const selectType = ref(operationTabType[0].code);
const isEmpty = ref(false);
const isLoading = ref(false);

const ecOption = ref(getBaseChartOption());

const getData = async () => {
  isLoading.value = true;
  try {
    const fd = operationTabType.find((item) => item.code === selectType.value);
    const timeRange = fd?.timeRange || [];
    const res = await Api.getChargeTrend({
      startTime: timeRange[0],
      endTime: timeRange[1],
      timeDimension: selectType.value, // 时间统计维度|hour-小时;date-日期
      stationType: 3 // 充电站类型|1、慢充； 2、快充 ；3、超充
    });
    isEmpty.value = !res?.data?.length;
    drawChart(res?.data);
  } catch (error) {
    isEmpty.value = true;
  }
  isLoading.value = false;
};

const drawChart = async (data = []) => {
  await getEcharts();
  const option = getBaseChartOption();
  const legendData = [];
  const series = [];

  operationTrendConfig().forEach((item, i) => {
    series.push({
      name: item.name,
      color: chartColorList[i],
      type: item.type,
      symbol: 'none',
      barWidth: item.type === 'bar' && scale(14),
      yAxisIndex: i,
      data: data.map((obj) => [obj.time, obj[item.code]])
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
  option.xAxis.axisLabel.formatter = (params) => {
    return selectType.value === operationTabType[0].code
      ? params + '时'
      : dayjs(params).format('DD日');
  };
  ecOption.value = {
    ...option,
    yAxis: [option.yAxis, option.yAxis],
    legend: {
      ...option.legend,
      right: scale(60),
      data: legendData
    },
    series
  };
};

watch(
  () => selectType.value,
  () => {
    getData();
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang="less">
.area-distributed {
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

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );

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
