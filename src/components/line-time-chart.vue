<template>
  <div class="ec-wrap">
    <!-- 根据时间戳自动补全的组件 -->
    <ec-autofill
      :option="echartsOption"
      :optionHandler="optionHandler"
      @instanceReady="instanceReady"
      :lineBarMinSize="0"
      :showFullHour="true"
    ></ec-autofill>
  </div>
</template>

<script setup>
import { EcAutofill } from '@sutpc/vue3-ec-timeprecision';
import { merge } from 'lodash';
import dayjs from 'dayjs'

let data = [];
for (let i = 0; i < 255; i++) {
  data.push({
    x: i,
    y: Math.floor(Math.random() * 2) + 1,
    name: 'test1'
  });
}
const echartsOption = computed(() => {
  return {
    // 数据源
    data: [{ x: 1, y: 4, name: 'test' }, { x: 2, y: 3, name: 'test' }, ...data],
    // 时间片
    timeprecision: '60',
    // 横坐标间隔
    xGap: 4
  };
});
const optionHandler = (ecOption) => {
    const xData = ecOption?.xAxis?.data.map(item => {
        return getTimeStringByPeriod(item)
    })
    console.log('ecOption', ecOption?.xAxis?.data);
  // 在把Echarts option赋值给echarts之前，允许外部做一次修改
  ecOption = merge(ecOption, {
    grid: {
      right: 20,
      top: 30,
      bottom: 24
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
          return getTimeStringByPeriod(value);
        },
          interval: 0
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
    }
  });
  return ecOption;
};
const getTimeStringByPeriod = (vPeriod) => {
  var result = '';
  var hourStr = '';
  var minStr = '';
  var hour;
  var min;
    var minTemp;
  hour = parseInt(vPeriod / 1);
  min = vPeriod % 1;
  minTemp = min * 60;

  hourStr = hour + '';
  if (minTemp < 10) {
    minStr = '0' + minTemp;
  } else {
    minStr = minTemp + '';
  }
  if (min == 0) {
    result = `${hourStr}:00`;
  } else {
    result = hourStr + ':' + minStr;
    }
    console.log('vPeriod',vPeriod,result);
  
  return result;
};
</script>

<style lang="less" scoped>
.ec-wrap {
  width: 429px;
  height: 189px;
}
</style>
