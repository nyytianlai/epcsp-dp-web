<template>
  <div class="acture-cluster-operation">
    <!-- ssjhyxqk: "实时聚合运行情况" -->
    <title-column :title="t(`${tHead}.ssjhyxqk`)" />
    <div class="distributed-content" v-loading="loading">
      <ec-resize :option="ecOption" v-show="!isEmpty" />
      <no-data v-show="isEmpty" />
      <div class="unit" v-show="!isEmpty">
        <!-- unitMW: '单位:MW' -->
        <div>{{t(`${tHead}.unitMW`)}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import EcResize, { getEcharts } from '@sutpc/vue3-ec-resize';
import { scale } from '@sutpc/config';
import { getBaseChartOption } from '../config';
import Api from '../api';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `special-scene.virtual-electric.components`;

const isEmpty = ref(false);
const loading = ref(false);

const chartConfig = [
  {
    name: '基线',
    code: 'baseline',
    color: '255, 119, 35',
    unit: 'MW',
    displayName: t(`${tHead}.baseline`)
  },
  {
    name: '计划',
    code: 'planNum',
    color: '0, 255, 249',
    unit: 'MW',
    displayName: t(`${tHead}.planNum`)
  },
  {
    name: '实际',
    code: 'actualNum',
    color: '0, 83, 255',
    unit: 'MW',
    displayName: t(`${tHead}.actualNum`)
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
      data: data.map((obj) => [obj.time, obj[item.code]])
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

const getData = async () => {
  loading.value = true;
  try {
    const res = await Api.adjustDemandHourInfo();
    isEmpty.value = !res?.data?.length;
    drawChart(res?.data || []);
  } catch (error) {
    isEmpty.value = true;
  }
  loading.value = false;
};
onMounted(getData);
</script>

<style scoped lang="less">
.acture-cluster-operation {
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
