<template>
  <div class="charging-realtime-power">
    <icon icon="svg-icon:power" />
    <div class="num-info">
      <div class="num num-realtime" id="number" ref="number">
        <div v-if="!isResize">{{ formatWithToLocalString(data) }}</div>
        <numberFlipping
          v-else
          v-for="(item, index) in formatWithToLocalString(data)"
          :key="index"
          :num="item === '.' || item === ',' ? item : Number(item)"
          :id="index"
          @resize="hanldeResize"
        ></numberFlipping>
      </div>
      <span class="unit-info">实时功率/kW</span>
    </div>
  </div>
</template>
<script setup>
import { toRefs, onMounted, reactive, watch, ref, nextTick } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import { formatWithToLocalString } from '@/global/commonFun.js';
import gsap from 'gsap';

const props = defineProps({
  data: {
    type: Number,
    default: 0.0
  }
});
const { data } = toRefs(props);
const d = reactive({
  num: 0
});
const isResize = ref(true);
const number = ref();
const isAnimation = ref(true);
const temp = ref([]);
const animation = (newVal = 0, oldVal = 0) => {
  // gsap.to(d, {
  //   duration: 1,
  //   ease: 'power1.out',
  //   num: Number(data.value).toFixed(2)
  // })
};
onMounted(() => {
  // const dataNumber = Number(data.value.toFixed(2))
  // console.log('data', data.value)
});
// resize
const hanldeResize = () => {
  isResize.value = false;
  setTimeout(() => {
    isResize.value = true;
  }, 500);
};
watch(
  () => data.value,
  (newVal, oldVal) => {
    console.log('data', newVal);
    // temp.value = formatWithToLocalString(data).split('')
  },
  {
    // immediate:true
  }
);
</script>
<style lang="less" scoped>
.charging-realtime-power {
  display: flex;
  justify-content: center;
  height: 100px;
  background: linear-gradient(
    255.75deg,
    rgba(37, 177, 255, 0.02) 23.33%,
    rgba(37, 177, 255, 0.2) 100%
  );
  mix-blend-mode: normal;
  box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(41, 76, 179, 0.2);
  border-radius: 4px;
  padding: 12px 0 0 24px;

  .el-icon {
    font-size: 82px;
  }

  .num-info {
    margin-left: 22px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .num {
      font-family: 'DIN Condensed';
      font-style: normal;
      font-weight: 700;
      font-size: 42px;
      background: linear-gradient(180deg, #0080ff 0%, #ffffff 50%, #007cf8 100%), #59ffff;
      -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      letter-spacing: 0.1em;
      display: flex;
      overflow-y: hidden;
      height: 45px;
    }

    .unit-info {
      width: 237px;
      height: 41px;
      background: url(./images/power-bgc.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      padding-top: 9px;
      font-weight: 500;
      line-height: 20px;
      color: #c6d1db;
    }
  }
}
</style>
