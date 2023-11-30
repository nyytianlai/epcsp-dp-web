<template>
  <div class="ec-wrap" :style="chartStyle">
    <div class="unit-box">
      <div class="unit" v-if="unit">
        <icon :icon="`svg-icon:${colors[0]}`" class="filter" />
        单位: {{ unit }}
      </div>
      <div class="unit-right" v-if="unit">
        <icon :icon="`svg-icon:${colors[1]}`" class="filter" />
        单位: {{ unit }}
      </div>
    </div>

    <ec-resize :option="ecOption" />
  </div>
</template>

<script setup lang="ts">
import Icon from '@sutpc/vue3-svg-icon';
import { toRefs, ref, watch } from 'vue';
import EcResize from '@sutpc/vue3-ec-resize';
import dayjs from 'dayjs';
import { merge } from 'lodash';
import { deepClone } from '@/utils';
import { scale } from '@sutpc/config';

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
  chartStyle?: IChartStyle;
  unit?: string;
  colors?: string[];
  customOption?: object;
  mode?: string;
  yAxisMode1?: string|number
  yAxisMode2?: string|number
  yaxisName?: string;
}
const props = withDefaults(defineProps<Props>(), {
  chartStyle: () => ({
    width: '100%',
    height: '1.89rem'
  }),
  unit: '个',
  colors: () => ['green', 'blue'],
  data: () => [],
  customOption: () => ({}),
  mode: '',
  yaxisName: ''
});

const { data, chartStyle, unit, colors, customOption } = toRefs(props);

const ecOption = ref();
const colorMap = {
  green: {
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
            color: 'rgba(0, 255, 249)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(217, 217, 217, 0)' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    },
    itemStyle: {
      color: 'rgba(0, 255, 249, 1)'
    }
  },
  blue: {
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
            color: 'rgba(98, 177, 255)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(52, 89, 155, 0)' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    },
    itemStyle: {
      color: '#0053FF'
    }
  },
  '#FF7723': {
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
            color: 'rgba(255, 119, 35)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(52, 89, 155, 0)' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    },
    itemStyle: {
      color: '#FF7723'
    }
  },
  '#FF6B4B': {
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
            color: '#FF6B4B' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(217, 217, 217, 0)' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    },
    itemStyle: {
      color: '#FF6B4B'
    }
  },
  '#00FFF9': {
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
            color: '#00FFF9' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(217, 217, 217, 0)' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    },
    itemStyle: {
      color: '#00FFF9'
    }
  }
};
const timeData = (max = 100) =>
  new Array(25)
    .fill(0)
    .map((item, index) => [
      dayjs().hour(index).format('YYYY-MM-DD HH:00'),
      Math.ceil(Math.random() * max)
    ]);
function simplifyNum(number) {
  if (!number && number != 0) return number;
  var str_num;
  if (number >= 1e3 && number < 1e4) {
    str_num = number / 1e3;
    return str_num + '千';
  } else if (number >= 1e4 && number < 1e7) {
    str_num = number / 1e4;
    return str_num + '万';
  } else if (number >= 1e7 && number < 1e10) {
    str_num = number / 1e8;
    return str_num + '亿';
  } else if (number >= 1e10 && number < 1e11) {
    str_num = number / 1e10;
    return str_num + '百亿';
  } else if (number >= 1e11 && number < 1e12) {
    str_num = number / 1e11;
    return str_num + '千亿';
  } else if (number >= 1e12) {
    str_num = number / 1e12;
    return str_num + '万亿';
  } else {
    //一千以下
    return number;
  }
}

const ecOptionBothSideFun = () => {
  console.log('data', data.value);
  let option = {
    grid: {
      top: scale(43),
      bottom: scale(24),
      right: scale(50),
      left: scale(42)
    },
    legend: {
      itemWidth: scale(16),
      itemHeight: scale(10),
      right: 0,
      top: scale(-5),
      textStyle: {
        fontFamily: 'Source Han Sans CN',
        fontSize: scale(14),
        color: '#C6D1DB'
      }
    },
    xAxis: {
      name: '',
      type: 'time',
      boundaryGap: ['2%', '2%'],
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
        fontSize: scale(14),
        lineHeight: scale(20),
        color: '#B4C0CC',
        formatter: (value, index) => {
          return dayjs(value).format('HH:00');
        },
        interval: 4
      },
      splitLine: {
        show: false
      },
      max: function (value) {
        return value.max + 1;
      }
    },
    yAxis: [
      {
        name: '',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          fontFamily: 'Helvetica',
          fontSize: scale(14),
          lineHeight: scale(18),
          color: '#B4C0CC',
          formatter: (value) => {
            return value ? simplifyNum(value) : '';
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(230, 247, 255, 0.2)',
            type: 'dashed'
          }
        }
      },
      {
        name: '',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          fontFamily: 'Helvetica',
          fontSize: scale(14),
          lineHeight: scale(18),
          color: '#B4C0CC',
          formatter: (value) => {
            return value ? simplifyNum(value) : '';
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    tooltip: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
      trigger: 'axis',
      formatter: (params) => {
        const dataTime = params[0].axisValueLabel;
        let str = `<div class="time-tooltip">`;
        str += `<div class="time">${dataTime}</div>`;
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
              <span class="unit">${unit.value}</span>
            </span>
          </div>`;
        });
        str += '</div>';
        return str;
      }
    },
    series: [
      ...data.value,
      {
        type: 'line',
        data: props.yAxisMode1 === 'auto'?[]:timeData(),
        symbolSize: 0,
        showSymbol: false,
        lineStyle: {
          color: 'transparent'
        },
        tooltip: {
          show: false
        }
      },
      {
        yAxisIndex: 1,
        type: 'line',
        data: props.yAxisMode2 === 'auto'?[]:timeData(props.yAxisMode2 as number),
        symbolSize: 0,
        showSymbol: false,
        lineStyle: {
          color: 'transparent'
        },
        tooltip: {
          show: false
        }
      }
    ]
  };
  option = merge(option, {
    series: colors.value.map((item) => {
      const color = deepClone(colorMap[item]);
      if (props.mode === 'noneArea') {
        color.areaStyle = null;
      }
      return color;
    }),
    ...customOption.value
  });

  return option;
};
const ecOptionBothSideYaxisFun= () => {
  let option = {
    grid: {
      top: scale(54),
      bottom: scale(28),
      right: scale(41),
      left: scale(42)
    },
    legend: {
      itemWidth: scale(16),
      itemHeight: scale(12),
      right: 0,
      top: 0,
      textStyle: {
        fontFamily: 'Source Han Sans CN',
        fontSize: scale(14),
        color: '#C6D1DB'
      }
    },
    xAxis: {
      name: '',
      type: 'category',
      data: data.value[0].data?.map((i) => i[0]),
      boundaryGap: ['2%', '2%'],
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
        fontSize: scale(14),
        lineHeight: scale(20),
        color: '#B4C0CC'
      },
      splitLine: {
        show: false
      }
    },
    yAxis: [
      {
        name: `单位：${props.yaxisName}`,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          fontFamily: 'Helvetica',
          fontSize: scale(14),
          lineHeight: scale(18),
          color: '#B4C0CC',
          formatter: (value) => {
            return value ? simplifyNum(value) : '';
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(230, 247, 255, 0.2)',
            type: 'dashed'
          }
        }
      },
      {
        name: `单位：${props.yaxisName}`,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          fontFamily: 'Helvetica',
          fontSize: scale(14),
          lineHeight: scale(18),
          color: '#B4C0CC',
          formatter: (value) => {
            return value ? simplifyNum(value) : '';
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    tooltip: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
      trigger: 'axis',
      formatter: (params) => {
        const dataTime = params[0].axisValueLabel;
        let str = `<div class="time-tooltip">`;
        str += `<div class="time">${dataTime}</div>`;
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
              <span class="unit">${unit.value ? unit.value : props.yaxisName}</span>
            </span>
          </div>`;
        });
        str += '</div>';
        return str;
      }
    },
    series: [
      ...data.value,
      // {
      //   type: 'line',
      //   data: timeData(),
      //   symbolSize: 0,
      //   showSymbol: false,
      //   lineStyle: {
      //     color: 'transparent'
      //   },
      //   tooltip: {
      //     show: false
      //   }
      // }
    ]
  };
  option = merge(option, {
    series: colors.value.map((item) => {
      const color = deepClone(colorMap[item]);
      if(color?.areaStyle){
        color.areaStyle = null
      }
      // color.areaStyle = null;
      return color;
    }),
    ...customOption.value
  });

  return option;
}
watch(
  data,
  () => {
    // console.log('data111', data.value);
    if(props.mode === 'temp'){
      ecOption.value=ecOptionBothSideYaxisFun()
    }else {
      ecOption.value = ecOptionBothSideFun();
    }
    
  },
  {
    immediate: true
  }
);
</script>

<style lang="less" scoped>
.ec-wrap {
  width: 100%;
  min-width: 200px;
  height: 189px;
  position: relative;
  .unit {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #b4c0cc;
  }
  .unit-right {
    .unit();
    left: unset;
    right: 0;
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

.unit-box {
  display: flex;
  position: absolute;
  top: 14px;
  width: 100%;
  justify-content: space-between;
}
</style>
