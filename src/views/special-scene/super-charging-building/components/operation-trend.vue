<template>
  <div class="area-distributed">
    <!-- yxqs: '运行趋势' -->
    <title-column :title="t(`${tHead}.yxqs`)" />
    <tabs v-model="selectType" :data="operationTabType" />
    <div class="distributed-content" v-loading="isLoading">
      <ec-resize :option="ecOption" v-show="!isEmpty" />
      <no-data v-show="isEmpty" />
      <div class="unit" v-show="!isEmpty">
        <!-- unitCi: '单位：次',  unitDu: '单位：度' 单位：度 -->
        <div>{{ t(`${tHead}.unitCi`) }}</div>
        <div>{{ t(`${tHead}.unitDu`) }}</div>
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
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `special-scene.super-charging-building.components`;

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
      barWidth: item.type === 'bar' && scale(10),
      yAxisIndex: i,
      data: data.map((obj) => {
        return {
          value: [
            operationTabType[0].code
              ? obj.time + t(`${tHead}.hour`) || '时'
              : dayjs(obj.time).format(`DD${t(`${tHead}.unitDay`) || '日'}`),
            Number(obj[item.code]).toFixed(0)
          ],
          unit: item.unit
        };
      })
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
      ? params + t(`${tHead}.hour`) || '时'
      : dayjs(params).format(`DD${t(`${tHead}.unitDay`) || '日'}`);
  };
  option.tooltip.formatter = (params) => {
    const dataTime = params[0].axisValueLabel;
    let str = `<div class="time-tooltip">`;
    // str += `<div class="time">${dataTime}</div>`;
    params.map((item) => {
      str += `<div class="item-data">
            <span class="left-data">
              ${item?.marker}
              <span class="name">${item?.seriesName}</span>
            </span>
            <span class="right-data">
              <span class="value">${
                item?.value[1] || item?.value[1] === 0 ? item?.value[1] : '--'
              }</span>
              <span class="unit">${item.data.unit}</span>
            </span>
          </div>`;
    });
    str += '</div>';
    return str;
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
