<template>
  <div class="chart-wrap">
    <ec-resize :option="ecOption" />
    <div class="road-bg"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import EcResize, { getEcharts } from '@sutpc/vue3-ec-resize';
import { scale } from '@sutpc/config';

const props = defineProps({
  speed: {
    type: Number,
    default: 0
  },
  coord: {
    type: String,
    default: ''
  }
});
const myChart = ref();

const ecOption = ref();

const chartDataChange = (value) => {
  let colorInit = {};
  if (value > 100) {
    colorInit = {
      type: 'radial',
      x: 0.5,
      y: 0.5,
      r: 1,
      colorStops: [
        {
          offset: 0.2,
          color: 'rgba(134,1,3,1)'
        },
        {
          offset: 0.5,
          color: 'rgba(134,1,3,0.5)'
        },
        {
          offset: 1,
          color: 'rgba(134,1,3,0.1)'
        }
      ]
    };
  } else {
    colorInit = {
      type: 'radial',
      x: 0.5,
      y: 0.5,
      r: 1,
      colorStops: [
        {
          offset: 0.2,
          color: '#2A71C9'
        },
        {
          offset: 0.5,
          color: 'rgba(42,113,201,0.5)'
        },
        {
          offset: 1,
          color: 'rgba(42,113,201,0.1)'
        }
      ]
    };
  }
  myChart.value?.setOption({
    series: [
      {
        progress: {
          show: true,
          width: scale(30),
          itemStyle: {
            color: colorInit
          }
        },
        data: [
          {
            value: value
          }
        ]
      }
    ]
  });
};

const initChart = async (data) => {
  await getEcharts();
  let colorInit = {
    type: 'radial',
    x: 0.5,
    y: 0.5,
    r: 1,
    colorStops: [
      {
        offset: 0.2,
        color: '#2A71C9'
      },
      {
        offset: 0.5,
        color: 'rgba(42,113,201,0.5)'
      },
      {
        offset: 1,
        color: 'rgba(42,113,201,0.1)'
      }
    ]
  };
  let option = {
    title: {
      text: '完成率(%)',
      bottom: '30%',
      left: 'center',
      textStyle: {
        color: '#D4D4D4',
        fontSize: scale(20)
      },
      triggerEvent: true
    },
    series: [
      {
        type: 'gauge',
        center: ['50%', '50%'],
        radius: '100%',
        startAngle: 215,
        endAngle: -30,
        progress: {
          show: true,
          width: scale(30),
          itemStyle: {
            color: colorInit
          }
        },
        axisLine: {
          lineStyle: {
            width: scale(30),
            color: [
              [
                1,
                {
                  type: 'radial',
                  x: 0.5,
                  y: 0.59,
                  r: 0.6,
                  colorStops: [
                    {
                      offset: 0.72,
                      color: '#000A1E'
                    },
                    {
                      offset: 0.98,
                      color: '#000A1E'
                    }
                  ]
                }
              ]
            ]
          }
        },
        pointer: {
          offsetCenter: [0, scale(-45)],
          width: scale(2),
          length: scale(35),
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#65b5ff'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ],
              globalCoord: false
            }
          }
        },
        itemStyle: {
          color: '#f00'
        },
        axisTick: {
          show: false,
          distance: scale(-30),
          length: scale(8),
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitNumber: 10,
        splitLine: {
          length: scale(8),
          distance: scale(-30),
          lineStyle: {
            width: 2,
            color: '#fff'
          }
        },
        axisLabel: {
          distance: scale(38),
          color: '#fff',
          fontSize: scale(12)
        },
        min: 0,
        max: 100,
        detail: {
          valueAnimation: true,
          fontSize: scale(42),
          offsetCenter: [0, '-16%'],
          formatter: '{value}',
          fontFamily: 'suptcDin',
          color: '#fff'
        },
        data: data
      }
    ]
  };
  ecOption.value = option;
};
watch(
  () => props.speed,
  async () => {
    await nextTick();
    initChart([{ value: props.speed || 0 }]);
  }
);
</script>

<style lang="less" scoped>
.chart-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.chart {
  width: 100%;
  height: 100%;
}

.road-bg {
  width: 207px;
  height: 44px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url('./guage-btm-bg.png');
  position: absolute;
  bottom: 44px;
  left: 50%;
  transform: translateX(-50%);
}

.coord {
  width: 196px;
  height: 25px;
  font-size: 12px;
  line-height: 25px;
  border-radius: 20px;
  border: 1px solid rgb(85, 149, 212);
  background: rgb(9, 23, 47);
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 25px;
}
</style>
