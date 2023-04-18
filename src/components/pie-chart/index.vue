<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-14 09:19:38
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-14 15:35:04
 * @FilePath: \epcsp-dp-web\src\components\pie-chart.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="pie-wrap">
    <div class="pie-chart-wrap">
      <ec-resize :option="ecOption" ref="ec" @instanceReady="watchInstanceReady" />
    </div>
    <div class="legend-wrap">
      <div class="legend" v-for="(item, index) in data" :key="index">
        <span class="left-info">
          <span
            class="icon"
            :class="[{ active: index === selectIndex }]"
            :style="{
              backgroundColor: colors[index],
              padding: '2px',
              borderColor: index === selectIndex ? colors[index] : 'transparent'
            }"
          ></span>
          <span class="name">{{ item.name }}</span>
        </span>
        <span class="right-info">
          <span class="value">{{ item.value }}</span>
          <span class="unit">{{ item.unit }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import EcResize from '@sutpc/vue3-ec-resize';
interface Idata {
  name: string;
  value: number;
  extraName?: string;
  unit: string;
}
interface Props {
  data: Idata[];
  colors: string[];
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [
    { value: 1048, name: '一级人身安全', extraName: '人身安全', unit: '个' },
    { value: 735, name: '二级设备安全', extraName: '设备安全', unit: '个' },
    { value: 580, name: '三级告警提示', extraName: '告警提示', unit: '个' }
  ],
  colors:()=>['#E5CC48', '#3254DD', '#4BDEFF', '#BEE5FB']
});
const { data,colors } = toRefs(props);
const ec = ref();
const selectIndex = ref();
const ecOption = computed(() => {
  return {
    color: colors.value,
    tooltip: {
      show: false
    },
    legend: {
      show: false
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['55%', '81%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
            formatter: (params) => {
              const name = params.data?.extraName || params.data?.name
              return [`{a|${params.percent}%}`, `{b|${name}}`].join('\n');
            },
            rich: {
              a: {
                fontFamily: 'DIN Alternate',
                fontSize: 28,
                textAlign: 'center',
                color: '#fff'
              },
              b: {
                fontFamily: 'PingFang SC',
                fontWeight: 400,
                fontSize: 14,
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.7)'
              }
            }
          }
        },
        labelLine: {
          show: false
        },
        data: data.value
      }
    ]
  };
});
const watchInstanceReady = (myChart) => {
  myChart.on('mouseover', function (params) {
    selectIndex.value = params.dataIndex;
  });
  myChart.on('mouseout', function (params) {
    selectIndex.value = null;
  });
};
</script>

<style lang="less" scoped>
.pie-wrap {
  display: flex;
  align-items: center;
  width: 425px;
}
.pie-chart-wrap {
  width: 188px;
  height: 188px;
  background: url(./images/circle-bgc.png) no-repeat;
  background-size: 100% 100%;
}
.legend-wrap {
  margin-left: 30px;
  width: 188px;
  display: flex;
  flex-direction: column;
  .legend {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .left-info {
    display: flex;
    align-items: center;
    .icon {
      width: 16px;
      height: 16px;
      padding: 3px;
      background-clip: content-box;
      border: 1px solid transparent;
    }
    .name {
      margin-left: 9px;
      white-space: nowrap;
    }
  }
  .right-info {
    width: 65px;
    white-space: nowrap;
    .value {
      font-family: 'DIN Alternate';
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 20px;
      color: #cbe9ff;
    }
    .unit {
      color: rgba(230, 247, 255, 0.5);
    }
  }
}
</style>
