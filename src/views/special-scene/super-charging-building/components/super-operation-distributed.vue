<template>
  <div class="super-operation-distributed">
    <title-column title="超充营运分布情况" />
    <tabs :data="superOperationTabType" @changeTab="handleStation" />
    <div class="super-operation-distributed-content" ref="chartWrapper">
      <ec-resize :option="ecOption" />
      <div class="chart-center">
        <img :src="pieCenter" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { superOperationTabType, chartColorList, piewChartConfig } from '../config.js';
import { scale } from '@sutpc/config';
import EcResize, { getEcharts } from '@sutpc/vue3-ec-resize';
import pieCenter from '../images/pie-chart-center-icon.png';
const ecOption = ref();
const chartWrapper = ref();
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
  if (!chartWrapper.value) return;
  const style = chartWrapper.value.getBoundingClientRect();
  const option = {
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['40%', '60%'],
        data: piewChartConfig.map((item, i) => ({
          name: item.name,
          color: chartColorList[i],
          value: item.value
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
          length: 5,
          length2: 10,
          showAbove: true
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
  console.log(option);
  ecOption.value = option;
};

onMounted(drawChart);
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
        width: 60px;
        height: 60px;
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
        width: 90px;
        height: 90px;
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
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-image: radial-gradient(
          circle at 50% 50%,
          rgba(#0d2959, 1) 0%,
          rgba(#398fd7, 1) 100%
        );
      }
    }
  }
}
</style>
