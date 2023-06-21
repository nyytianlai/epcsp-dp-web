<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 15:04:38
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-12 15:24:44
 * @FilePath: \epcsp-dp-web\src\views\station-detail\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="panel-box" v-if="showPop">
    <div class="close" @click="handleClose"></div>
    <div class="arrow left-top"></div>
    <div class="arrow right-top"></div>
    <div class="arrow left-bottom"></div>
    <div class="arrow right-bottom"></div>
    <icon :icon="`svg-icon:machine-room`" class="pop-icon" />
    <div class="num-box">
      <div class="num">
        {{ state.currentPower.value }}
        <span class="unit">/kW</span>
      </div>
      <div class="label">实时功率</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, inject, reactive } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import bus from '@/utils/bus';
import dayjs from 'dayjs';

const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const useEmitt = aircityObj.value?.useEmitt;
const showPop = ref(false);
const state = reactive({
  currentPower: {
    value: null
  }
});
const timeRange = [
  { min: 10, max: 11, value: -3.77 },
  { min: 11, max: 12, value: -3.66 },
  { min: 12, max: 13, value: 4.96 },
  { min: 13, max: 14, value: 3.18 },
  { min: 14, max: 15, value: -3.36 },
  { min: 15, max: 16, value: -3.78 },
  { min: 16, max: 17, value: -3.7 },
  { min: 17, max: 18, value: 5.01 }
];
let timer = null;
useEmitt &&
  useEmitt('AIRCITY_EVENT', async (e) => {
    if (e.ObjectID === 'SM_BDF_002_16') {
      // const hours = dayjs().hour();
      // let data = 0;
      // for (var i = 0; i < timeRange.length; i++) {
      //   if (hours >= timeRange[i].min && hours < timeRange[i].max) {
      //     data = timeRange[i].value;
      //   } else {
      //     data = 0;
      //   }
      // }
      let data = getDefaultValue();
      if (timer) {
        clearInterval(timer);
      }
      timer = setInterval(() => {
        const random = Math.random() * 0.05 - 0.05;
        state.currentPower.value = (data + data * random).toFixed(2);
      }, 3000);
      showPop.value = true;
    } else if (
      e.eventtype === 'LeftMouseButtonClick' &&
      e.PropertyName !== '-3Station' &&
      e.ObjectID !== '-SM_BDF_002_16'
    ) {
      showPop.value = false;
    }
  });
// 定位到机房
const focusToMachineRoom = (data) => {
  console.log(data);
  state.currentPower.value = data.value || 0;
  if (timer) {
    clearInterval(timer);
  }
  showPop.value = true;
  timer = setInterval(() => {
    const random = Math.random() * 0.05 - 0.05;
    state.currentPower.value = (data.value + data.value * random).toFixed(2);
  }, 3000);
};
const handleClose = () => {
  //清除绿色高亮
  __g.tileLayer.stopHighlightAllActors();
  showPop.value = false;
};
const getDefaultValue = () => {
  const hours = dayjs().hour();
  let data = 0;
  for (var i = 0; i < timeRange.length; i++) {
    if (hours >= timeRange[i].min && hours < timeRange[i].max) {
      data = timeRange[i].value;
      break;
    } else {
      data = 0;
    }
  }
  return data;
};
onMounted(async () => {
  bus.on('focusToMachineRoom', (e) => {
    focusToMachineRoom({ value: getDefaultValue() });
  });
});

onBeforeUnmount(() => {
  bus.off('focusToMachineRoom');
  if (timer) {
    clearInterval(timer);
  }
});
</script>
<style lang="less" scoped>
.arrow {
  width: 12px;
  height: 12px;
  background-image: url('../../user/images/arrow.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;

  &.left-top {
    left: 0;
    top: 0;
  }
  &.right-top {
    right: 0;
    top: 0;
    transform: rotate(90deg);
  }
  &.left-bottom {
    left: 0;
    bottom: 0;
    transform: rotate(-90deg);
  }
  &.right-bottom {
    right: 0;
    bottom: 0;
    transform: rotate(180deg);
  }
}
.panel-box {
  min-width: 220px;
  display: flex;
  padding: 16px;
  align-items: center;
  background: rgba(18, 40, 73, 0.85);
  box-shadow: inset 0px 0px 16px rgba(10, 167, 255, 0.8);
  position: absolute;
  top: 525px;
  left: 650px;
  z-index: 99;

  .pop-icon {
    font-size: 54px;
  }
  // top: 300px;
  //   left: 650px;

  .num {
    background: linear-gradient(180deg, #00f7ff -71.43%, #d5feff 16%, #00f7ff 96.43%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-weight: 700;
    font-size: 30px;
    font-family: 'DIN Alternate';

    .unit {
      font-size: 14px;
    }
  }

  .label {
    margin-top: 4px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #c0e5ff;
  }

  .close {
    font-size: 16px;
    color: #c0e5ff;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
    &::after {
      content: '\2716';
    }
  }
}
.num-box {
  margin-left: 16px;
}
</style>
