<template>
  <div class="num-tile-card">
    <img :src="data.img" alt="" class="icon" />
    <!-- <div class="name">{{ data.displayName || data.name }}</div> -->
    <tooltip-over
      :is-inline="true"
      :className="['num-title-card-name-tooltip']"
      :content="data.displayName || data.name"
      :ref-name="data.displayName || data.name"
    />
    <div class="num-box">
      <span class="num" :style="numStlyle">{{ formatWithToLocalString(data.num) }}</span>
      <span class="unit" :style="numStlyle">&nbsp;{{ data.displayUnit || data.unit }}</span>
      <!-- <tooltip-over
        :is-inline="true"
        :style="numStlyle"
        :className="['num-title-card-unit-tooltip']"
        :content="data.displayUnit || data.unit"
        :ref-name="data.displayUnit || data.unit"
      /> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { formatWithToLocalString } from '@/global/commonFun.js';
import { computed } from 'vue';
import TooltipOver from '@/components/tooltip-over.vue';
interface Idata {
  img: string;
  name: string;
  num: string | number;
  unit?: string;
  displayName?: string;
  displayUnit?: string;
}
interface Props {
  data: Idata;
  fontBackground?: string;
}
const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {
      img: '',
      name: '',
      num: '',
      unit: ''
    };
  },
  fontBackground: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)'
});
const numStlyle = computed(() => {
  return {
    background: props.fontBackground,
    textFillColor: 'transparent',
    '-webkit-background-clip': 'text'
  };
});
</script>
<style lang="less" scoped>
.num-tile-card {
  width: 100%;
  height: fit-content;
  background: linear-gradient(258.38deg, rgba(37, 177, 255, 0.1) 2.46%, rgba(37, 177, 255, 0) 100%);
  mix-blend-mode: normal;
  box-shadow: inset 0px 0px 35px rgba(41, 76, 179, 0.2);
  filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.04));
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  padding-top: 16px;
  .name {
    font-weight: bold;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
  }
  .num-box {
    font-family: 'DIN Alternate';
    .num {
      font-size: 30px;
      font-weight: bold;
    }
    .unit {
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>