<template>
  <div class="parking-charge-trend">
    <!-- tcyxqsfx: '停充运行趋势分析' -->
    <title-column :title="t(`${tHead}.tcyxqsfx`)" />
    <div class="distributed-content" v-loading="loading">
      <ec-resize :option="ecOption" v-show="!isEmpty" />
      <no-data v-show="isEmpty" />
      <div class="unit" v-show="!isEmpty">
        <!-- dw: '单位' -->
        <div>{{t(`${tHead.dw}`)}}:%</div>
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
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `special-scene.power-combine.components.parking-charge-trend`;

const isEmpty = ref(false);
const loading = ref(false);
const chartConfig = [
  {
    name: '充电枪利用率',
    code: 'dailyGunUtilizationRate',
    color: '0, 255, 249',
    unit: '%',
    displayName: t(`${tHead}.chartConfig.dailyGunUtilizationRate`)
  },
  {
    name: '车位利用率',
    code: 'dailyParkingSpaceUtilizationRate',
    color: '0, 83, 255',
    unit: '%',
    displayName: t(`${tHead}.chartConfig.dailyParkingSpaceUtilizationRate`)
  }
];
const ecOption = ref(getBaseChartOption());

const drawChart = async (data = []) => {
  await getEcharts();
  const option = getBaseChartOption();
  const series = [];

  chartConfig.forEach((item, i) => {
    series.push({
      name: item.displayName || item.name,
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
      ...option.legend
    },
    series
  };
};
const getData = async () => {
  loading.value = true;
  try {
    const res = await Api.parkChargingRunTrend();
    drawChart(res.data);
    isEmpty.value = !res.data.length;
  } catch (error) {
    isEmpty.value = true;
  }
  loading.value = false;
};
onMounted(getData);
</script>

<style scoped lang="less">
.parking-charge-trend {
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
