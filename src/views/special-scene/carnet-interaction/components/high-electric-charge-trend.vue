<template>
  <div class="v2g-build-status">
    <title-column title="今年充电高峰统计" />
    <tabs v-model="selectType" :data="tabTypeList" />
    <div class="chart-card">
      <div class="card-content">
        <div class="card-item" v-for="item in Object.keys(highlightData)" :key="item">
          <div class="item-row">
            <label>{{ highlightData[item].typeName }}:</label>
            <span class="value fontSize16DIN">
              {{
                highlightData[item].timeRange
                  .split('-')
                  .map((el) => el + '点')
                  .join('-')
              }}
            </span>
          </div>

          <div class="item-row">
            <label class="">充电量:</label>
            <span class="value fontSize16DIN">
              {{ highlightData[item].chargeCapacity }}
              <span class="unit">KWh</span>
            </span>
          </div>
          <div class="item-row">
            <label>占比:</label>
            <span class="value fontSize16DIN">
              {{ highlightData[item].chargeCapacityRatio?.toFixed(2) ?? '--' }}
              <span class="unit">%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="distributed-content" v-loading="loading">
      <ec-resize :option="ecOption" v-show="!isEmpty" />
      <no-data v-show="isEmpty" />
      <div class="unit" v-show="!isEmpty">
        <div>单位:KWh</div>
        <div>单位:%</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import EcResize, { getEcharts } from '@sutpc/vue3-ec-resize';
import { scale } from '@sutpc/config';
import { getBaseChartOption, tabTypeList } from '../config';
import dayjs from 'dayjs';
import Api from '../api';
import { deepClone } from '@/utils';

const isEmpty = ref(false);
const loading = ref(false);

const highlightData = ref<any>({});

const chartConfig = [
  {
    name: '充电量',
    code: 'chargeCapacity',
    color: '34, 118, 252',
    unit: 'KWh',
    type: 'bar'
  },
  {
    name: '占比',
    code: 'chargeCapacityRatio',
    color: '255, 207, 95, 1',
    unit: '%',
    type: 'line'
  }
];
const chartData = ref([]);
const ecOption = ref();
const selectType = ref(tabTypeList[0].code);

const getData = async () => {
  loading.value = true;
  try {
    const { data } = await Api.getV2GChargeCapacityHourByTime();
    chartData.value = data;
  } catch (error) {}
  loading.value = false;
};

const getHighlightData = async () => {
  const obj = {};
  const res = await Api.getV2GChargeCapacityStat(0);
  console.log(res?.data);
  res.data.forEach((item) => {
    obj[item.timeProperty] = {
      ...item,
      typeName: item.timeProperty === 'bottom' ? '低谷时段' : '尖峰时段'
    };
  });
  highlightData.value = obj;
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
      data: data.map((obj) => {
        return {
          value: [
            obj.time + '时',
            item.unit === '%'
              ? obj[item.code] && (obj[item.code] * 100)?.toFixed(2)
              : obj[item.code]
          ],
          unit: item.unit
        };
      }),
      barWidth: scale(10),
      yAxisIndex: i,
      symbol: 'none'
    });
    legendData.push({
      name: item.name,
      itemStyle: {
        color: `rgb(${item.color})`
      }
    });
  });
  option.tooltip.formatter = (params) => {
    const dataTime = params[0].axisValueLabel;
    let str = `<div class="time-tooltip">`;
    str += `<div class="time">${dataTime}</div>`;
    params.map((item) => {
      console.log(item);
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
  option.xAxis.axisLabel.interval = 1;
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
  getHighlightData();
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

  .chart-card {
    width: 100%;
    padding: 8px;
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );

    .card-title {
      margin-bottom: 4px;
    }

    .card-content {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      row-gap: 4px;

      .card-item {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-flow: column nowrap;
        row-gap: 4px;
      }

      .item-row {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      }

      .value {
        font-weight: 700;
        color: #00f7ff;
        display: flex;
        line-height: 14px;
        align-items: baseline;
        margin-left: 4px;

        .unit {
          font-size: 12px;
          font-weight: 500;
        }
      }

      .card-title {
        color: #c6d1db;
      }
    }
  }
}
</style>
