<template>
  <div class="ec-wrap" :style="chartStyle">
    <div class="unit" v-if="unit">单位: {{unit}}</div>
    <ec-resize :option="ecOption" ref="ec" @instanceReady="watchInstanceReady" />
  </div>
</template>

<script setup lang="ts">
import EcResize from '@sutpc/vue3-ec-resize';
import dayjs from 'dayjs';
import { merge } from 'lodash';
interface Idata {
  x: number;
  y: number;
  name: string;
}
interface IChartStyle {
  width: string;
  height: string;
}
interface Props {
  data: Idata[];
  chartStyle: IChartStyle;
  unit?: string;
  colors?:string[]
}
const props = withDefaults(defineProps<Props>(), {
  chartStyle: () => ({
    width: '4.29rem',
    height: '1.89rem'
  }),
  unit: '个',
  colors:()=>['green','blue']
});

const { data, chartStyle, unit,colors } = toRefs(props);
const colorMap = {
  'green': {
    areaStyle: {
          color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
              offset: 0, color: 'rgba(0, 255, 249)' // 0% 处的颜色
          }, {
              offset: 1, color: 'rgba(217, 217, 217, 0)' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
    },
    itemStyle: {
      color: 'rgba(0, 255, 249, 1)'
    }
  },
  'blue': {
    areaStyle: {
          color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
              offset: 0, color: 'rgba(98, 177, 255)' // 0% 处的颜色
          }, {
              offset: 1, color: 'rgba(52, 89, 155, 0)' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
    },
    itemStyle: {
      color: '#0053FF'
    }
  },
  "#FF7723":{
    areaStyle: {
          color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
              offset: 0, color: 'rgba(255, 119, 35)' // 0% 处的颜色
          }, {
              offset: 1, color: 'rgba(52, 89, 155, 0)' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
    },
    itemStyle: {
      color: '#FF7723'
    }
  },
  '#FF6B4B':{
    areaStyle: {
          color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
              offset: 0, color: '#FF6B4B' // 0% 处的颜色
          }, {
              offset: 1, color: 'rgba(217, 217, 217, 0)' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
    },
    itemStyle: {
      color: '#FF6B4B'
    }
  }
}
// const times = (new Array(25).fill(0)).map((item,index)=>dayjs().hour(index).format('YYYY-MM-DD HH:00'))
// console.log(times);
// const transformData = ()=>{
//   data
// }
const ecOption = computed(() => {
  console.log(JSON.stringify(data.value));
  
  let option = {
    grid: {
      top: 30,
      bottom: 24,
      width:'100%'
    },
    legend: {
      itemWidth: 16,
      itemHeight: 10,
      right: 0,
      top: 0,
      textStyle: {
        fontFamily: 'Source Han Sans CN',
        fontSize: 14,
        color: '#C6D1DB'
      }
    },
    xAxis: {
      name: '',
      type:'time',
      boundaryGap: ['2%', '20%'],
      axisLine: {
        lineStyle: {
          color: '#BAE7FF'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#BAE7FF'
        }
      },
      axisLabel: {
        fontFamily: 'Source Han Sans CN',
        fontSize: 12,
        lineHeight: 18,
        color: '#B4C0CC',
        formatter: (value, index) => {
          return dayjs(value).format('HH:00')
          
        },
        interval:4
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      name: '',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        lineHeight: 16,
        color: '#B4C0CC'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(230, 247, 255, 0.2)',
          type: 'dashed'
        }
      }
    },
    tooltip: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding:0,
      trigger:'axis',
      formatter: (params) => {
        console.log(params);
        const dataTime = '00:00';
        let str = `<div class="time-tooltip">`;
        str += `<div class="time">${dayjs().format('YYYY-MM-DD')} ${dataTime}</div>`;
        params.map((item) => {
          str += `<div class="item-data">
            <span class="left-data">
              ${item?.marker}
              <span class="name">${item?.seriesName}</span>
            </span>
            <span class="right-data">
              <span class="value">${item?.value[1] || '--'}</span>
              <span class="unit">${unit.value}</span>
            </span>
          </div>`;
        });
        str += '</div>';
        return str;
      }
    },
    series: data.value
  };
  option = merge(option, {series: colors.value.map(item=>colorMap[item])})
  return option;
});
</script>

<style lang="less" scoped>
.ec-wrap {
  width: 429px;
  height: 189px;
  position: relative;
  .unit {
    position: absolute;
    top: 6px;
    left: 2px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #b4c0cc;
  }
}
:deep(.time-tooltip) {
  background: rgba(179, 183, 185, 0.6);
  mix-blend-mode: normal;
  opacity: 0.9;
  backdrop-filter: blur(5px);
  border-radius: 4px;
  padding: 8px;
  color: #ffffff;
  min-width: 160px;
  .time {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 4px;
  }
  .item-data {
    background: rgba(0, 83, 130, 0.26);
    mix-blend-mode: normal;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 8px;
    white-space: nowrap;
    margin-bottom: 2px;
    &:last-of-type {
      margin-bottom: 0;
    }
    .left-data {
      .name {
        margin-left: 8px;
      }
    }
    .right-data {
      margin-left: 21px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      /* identical to box height, or 143% */

      .value {
      }
      .unit {
      }
    }
  }
}
</style>
