<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-14 09:19:38
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-17 17:21:33
 * @FilePath: \epcsp-dp-web\src\components\pie-chart.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="pie-wrap">
    <div class="pie-chart-wrap">
      <ec-resize :option="ecOption" @instanceReady="watchInstanceReady" />
      <div class="total-content" v-if="!selectIndex && selectIndex !== 0">
        <span class="value" style="fontsize: 40px; lineheight: 32px">{{ totalNum }}</span>
        <span class="name" style="fontsize: 14px; lineheight: 20px">{{ totalName }}</span>
      </div>
    </div>
    <div class="legend-wrap" v-if="mode === 'default'">
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
          <span class="value">{{ formatWithToLocalString(item.value) }}</span>
          <span class="unit">{{ item.unit }}</span>
        </span>
      </div>
    </div>
    <div class="legend-wrap" v-if="mode === 'canChoose'">
      <div
        class="legend can-choose"
        :class="{ 'can-choose-active': item.isChoose }"
        :style="{
          borderColor: item.isChoose ? colors[index] : 'transparent'
        }"
        v-for="(item, index) in data"
        :key="index"
        @click="handleCanChoose(item)"
      >
        <div
          class="right-top"
          :style="{
            borderTopColor: item.isChoose ? colors[index] : 'rgba(255, 255, 255, 0.18)'
          }"
        ></div>
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
          <span class="value">{{ formatWithToLocalString(item.value) }}</span>
          <span class="unit">{{ item.unit }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import { formatWithToLocalString } from '@/global/commonFun.js';
import EcResize from '@sutpc/vue3-ec-resize';
interface Idata {
  name: string;
  value: number;
  extraName?: string;
  unit: string;
  isChoose?: boolean;
}
interface Props {
  data: Idata[];
  colors?: string[];
  totalName?: string;
  mode?: string;
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [
    { value: 1048, name: '一级人身安全', extraName: '人身安全', unit: '个' },
    { value: 735, name: '二级设备安全', extraName: '设备安全', unit: '个' },
    { value: 580, name: '三级告警提示', extraName: '告警提示', unit: '个' }
  ],
  colors: () => ['#E5CC48', '#3254DD', '#4BDEFF', '#ED8ECA', '#BEE5FB'],
  totalName: '合计',
  mode: 'default'
});
const { data, colors, totalName } = toRefs(props);
const emits = defineEmits(['choose']);
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
              const name = params.data?.extraName || params.data?.name;
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
const totalNum = computed(() => {
  let total = 0;
  data.value?.map((item) => {
    if (item.value) {
      total += item.value;
    }
  });
  return total || 0;
});
const watchInstanceReady = (myChart) => {
  myChart.on('mouseover', function (params) {
    selectIndex.value = params.dataIndex;
  });
  myChart.on('mouseout', function (params) {
    selectIndex.value = null;
  });
};
// 选中
const handleCanChoose = (item) => {
  item.isChoose = !item.isChoose;
  emits('choose', item);
};
</script>

<style lang="less" scoped>
.pie-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pie-chart-wrap {
  width: 188px;
  height: 188px;
  background: url(./images/circle-bgc.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  .total-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .value {
      font-family: 'DIN Alternate';
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
    }
    .name {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}
.legend-wrap {
  margin-left: 10px;
  width: 208px;
  display: flex;
  flex-direction: column;
  .legend {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    width: 100%;
    padding-right: 29px;
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
    text-align: right;

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
.can-choose {
  background: rgba(108, 128, 151, 0.1);
  width: 186px;
  height: 32px;
  padding: 11px;
  position: relative;
  padding-right: 20px;
  border: 1px solid;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 5px;
    background: transparent;
    top: 4px;
    right: 1px;
    border: 2px solid grey;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-55deg);
    -ms-transform: rotate(-55deg);
    transform: rotate(-55deg);
    z-index: 9;
  }
  .right-top {
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-top: 25px solid rgba(255, 255, 255, 0.18);
    content: '';
    color: rgba(255, 255, 255, 0.5);
    display: block;
    position: absolute;
    right: 0;
    top: 0;
  }
}
.can-choose-active {
  &::before {
    border-color: white;
    // color: greenyellow;
  }
}
</style>
