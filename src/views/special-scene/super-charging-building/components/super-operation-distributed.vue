<template>
  <div class="super-operation-distributed">
    <!-- ccyyfbqk: '超充营运分布情况' -->
    <title-column :title="t(`${tHead}.ccyyfbqk`)" />
    <tabs v-model="selectType" :data="superOperationTabType" />
    <div
      class="super-operation-distributed-content card-wrapper"
      v-show="!isAreaDistributed"
      ref="chartWrapper"
      v-loading="isLoading"
    >
      <!-- <ec-resize :option="ecOption" v-show="!isEmpty" />
      <div class="chart-center" v-show="!isEmpty">
        <img :src="pieCenter" />
      </div> -->
      <div class="card-item" v-for="item in powerConfig" :key="item.name">
        <img :src="power" class="icon" />
        <div class="card-name">{{ item.name }}</div>
        <div class="card-value">
          {{ formatWithToLocalString(item.value) }}
          <span class="unit">个</span>
        </div>
      </div>
      <no-data v-show="isEmpty" />
    </div>
    <div
      class="super-operation-distributed-content"
      v-show="isAreaDistributed"
      v-loading="isLoading"
    >
      <scroll-table
        :scrollTableData="scrollTableData"
        :columnKeyList="superDistribuetedColumns"
        style="height: 100%"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { superOperationTabType, chartColorList, superDistribuetedColumns } from '../config.js';
import { scale } from '@sutpc/config';
import EcResize, { getEcharts } from '@sutpc/vue3-ec-resize';
import ScrollTable from '@/views/safety-supervision/components/scroll-table.vue';
import pieCenter from '../images/pie-chart-center-icon.png';
import power from '../images/power.png';
import Api from '../api.js';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { formatWithToLocalString } from '@/global/commonFun.js';
const tHead = `special-scene.super-charging-building.components`;

const ecOption = ref();
const selectType = ref(superOperationTabType[0].code);
const chartWrapper = ref();
const isLoading = ref(false);
const scrollTableData = ref([]);
const powerConfig = ref([]);
const isEmpty = ref(true);

const isAreaDistributed = computed(() => selectType.value === 'getConstructionStationDistribute');

const getData = async () => {
  isLoading.value = true;
  try {
    const method = Api[selectType.value];
    if (!method) return;
    const res = await method();
    if (isAreaDistributed.value) {
      scrollTableData.value = res?.data;
    } else {
      // drawChart(res?.data);
      powerConfig.value = res?.data.map((item) => {
        return {
          name: item.levelName,
          value: item.equipmentNum,
          unit: '个'
        };
      });
      isEmpty.value = !res?.data?.length;
    }
  } catch (error) {
    isEmpty.value = true;
  }
  isLoading.value = false;
};

const drawChart = async (data = []) => {
  await getEcharts();
  if (!chartWrapper.value) return;
  const style = chartWrapper.value.getBoundingClientRect();
  const option = {
    tooltip: {
      show: true,
      confine: true,
      borderColor: 'transparent',
      backgroundColor: 'rgba(9, 41, 75, 0.8)',
      borderWidth: 0,
      formatter: (param) => {
        return `
              <div class="tooltip-wrapper">
                <div class="circle" style="background-color: ${param.color}"></div>
                <div class="tip-name">${param.name}</div>
                <div class="tip-data">${param.value ?? '--'}个（${param.percent ?? '--'}%）</div>
              </div>
            `;
      }
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['40%', '60%'],
        data: data.map((item, i) => ({
          name: item.levelName,
          color: chartColorList[i],
          itemStyle: {
            color: chartColorList[i]
          },
          value: item.equipmentNum
        })),
        label: {
          formatter: (param) => {
            return `{value|${param.data.value}}
{hc| }  {top|${param.data.name}}`;
          },
          minMargin: 10,
          alignTo: 'edge',
          edgeDistance: scale(40),
          rich: {
            hc: {
              width: 8,
              height: 8,
              borderRadius: 8,
              backgroundColor: 'inherit'
            },
            top: {
              fontSize: scale(14),
              color: '#C6D1DB',
              fontWeight: 400
            },
            value: {
              color: '#CBE9FF',
              fontWeight: 700,
              fontSize: scale(22),
              fontFamily: 'DINAlternate-Bold',
              padding: [0, 0, 14, 0]
            }
          }
        },
        labelLine: {
          length: scale(8),
          length2: 10,
          showAbove: true,
          minTurnAngle: 120
        },
        labelLayout: function (params) {
          const isLeft = params.labelRect.x < style.width / 2;
          const points = params.labelLinePoints || [];
          points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width;
          return {
            labelLinePoints: points
          };
        }
      }
    ]
  };
  ecOption.value = option;
};

watch(
  () => selectType.value,
  () => {
    getData();
  },
  {
    immediate: true
  }
);
</script>

<style scoped lang="less">
.super-operation-distributed {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .super-operation-distributed-content {
    flex: 1;
    min-height: 0;

    border-radius: 4px;
    position: relative;

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );

    &.card-wrapper {
      display: grid;
      grid-template-rows: repeat(2, minmax(80px, 1fr));
      row-gap: 12px;
      border-radius: 0;

      box-shadow: none;
      background: none;
    }

    .chart-center {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 160px;
      height: 160px;
      border-radius: 50%;
      background-color: rgba(#fff, 0.05);
      pointer-events: none;

      img {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        border-radius: 50%;
      }

      &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 88px;
        height: 88px;
        border-radius: 50%;
        background: url('../images/pie-cahrt-center-bg.png') no-repeat center center;
        background-size: 100% 100%;
      }

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-image: radial-gradient(
          circle at 50% 50%,
          rgba(#0d2959, 1) 0%,
          rgba(#398fd7, 1) 100%
        );
      }
    }

    .card-item {
      min-width: 0;
      min-height: 0;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: 0 20px;
      border-radius: 2px;
      box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04),
        inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
      background: linear-gradient(
        224.13deg,
        rgba(37, 177, 255, 0.1) 2.853%,
        rgba(37, 177, 255, 0) 100%
      );

      .icon {
        flex: 0 0 70px;
        width: 70px;
        margin-right: 18px;
      }

      .card-name {
        flex: 1;
        min-width: 0;
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
      }

      .card-value {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        background: linear-gradient(180deg, rgb(0, 247, 255), rgb(213, 254, 255), rgb(0, 247, 255));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        line-height: 32px;
        font-size: 30px;
        font-weight: 700;
        font-family: 'DIN Condensed';
        .unit {
          font-size: 16px;
          font-weight: 400;
        }
      }
    }
  }
}
:deep(.tooltip-wrapper) {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  .circle {
    width: 10px;
    height: 10px;
    flex: 0 0 10px;
    border-radius: 50%;
    margin-right: 4px;
  }

  .tip-name {
    font-size: 16px;
    color: #fff;
    font-weight: 400;
    margin-left: 2px;
  }

  .tip-data {
    margin-left: 20px;
    font-size: 16px;
    color: #fff;
    font-weight: 900;
  }
}
</style>
