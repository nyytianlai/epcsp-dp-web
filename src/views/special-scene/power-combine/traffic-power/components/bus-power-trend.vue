<template>
  <div class="bus-power-trend">
    <title-column title="巴士可用能量态势" />
    <div class="distributed-content" v-loading="loading">
      <ec-resize :option="ecOption" v-show="!isEmpty" />
      <no-data v-show="isEmpty" />
      <div class="unit" v-show="!isEmpty">
        <div>单位:辆</div>
        <div>单位:kwh</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { scale } from '@sutpc/config';
import { getBaseChartOption, operationTrendConfig } from '../config';
import EcResize, { getEcharts } from '@sutpc/vue3-ec-resize';
import dayjs from 'dayjs';
import Api from '../api';

const loading = ref(true);
const isEmpty = ref(false);
const ecOption = ref();
const chartData = ref([]);
// const data = Array.from({ length: 24 }).map((_, i) => ({
//   time: dayjs().startOf('day').add(i, 'hour').format('YYYY-MM-DD HH:mm:ss'),
//   busNum: (Math.random() * 100).toFixed(0),
//   busCapacity: (Math.random() * 300).toFixed(0)
// }));

const getData = async () => {
  loading.value = true;
  try {
    const params = {
      areaCode: '',
      streetCode: ''
    };
    const { data } = await Api.busCanEnergy(params);
    // console.log('busCanEnergy data :>> ', data);
    chartData.value = data;
  } catch (error) {}
  loading.value = false;
};
const drawChart = async (data = []) => {
  await getEcharts();
  const option: any = getBaseChartOption();
  const legendData = [];
  const series = [];

  operationTrendConfig().forEach((item, i) => {
    series.push({
      name: item.name,
      color: item.color,
      type: item.type,
      symbol: 'none',
      barWidth: item.type === 'bar' && scale(10),
      yAxisIndex: i,
      data: data.map((obj) => [obj.time, obj[item.code]])
    });

    legendData.push({
      name: item.name,
      icon: 'circle',
      color: item.color,
      itemStyle: {
        color: item.color
      }
    });
  });
  option.xAxis.axisLabel.formatter = (params) => {
    return params;
    // return dayjs(params).format('HH:mm');
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

onMounted(async () => {
  await getData();
  drawChart(chartData.value);
});
</script>

<style scoped lang="less">
.bus-power-trend {
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
