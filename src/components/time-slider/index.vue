<template>
  <el-slider
    class="time-slider"
    v-model="sliderValue"
    :step="step"
    show-stops
    :marks="marks"
    :format-tooltip="formatTooltip"
  />
</template>

<script lang="ts" setup>
import { reactive, onMounted, watch, ref } from 'vue';
const emit = defineEmits([]);
const props = defineProps({
  data: {
    type: Array,
    default: []
  }
});
onMounted(() => {});
const sliderValue = defineModel({ default: 0 });
const step = ref(0);
const marks = reactive({});
const formatTooltip = (v) => {
  return marks[v].label;
};
watch(
  () => props.data,
  (val) => {
    const key = 100 / (val.length - 1);
    step.value = key;
    val.forEach((v, i) => {
      marks[key * i] = {
        style: {
          color: '#ffffff'
        },
        label: v
      };
    });
  },
  {
    deep: true,
    immediate: true
  }
);
watch(
  () => sliderValue.value,
  (v) => {
    emit('change', marks[v].label);
  },
  {
    immediate: true
  }
);
</script>

<style lang="less" scoped>
.time-slider {
  width: 600px;
  position: absolute;
  bottom: 200px;
  left: 50%;
  transform: translateX(-50%);
  :deep(.el-slider__runway) {
    .el-slider__stop {
      display: none;
    }
    .el-slider__bar {
      background: linear-gradient(
        270deg,
        rgb(0, 255, 146) 0%,
        rgba(6, 244, 137, 0.86) 1%,
        rgba(43, 180, 255, 0.98) 100%
      );
    }
    .el-slider__button {
      width: 13px !important;
      height: 13px !important;
      border: solid 3px #fff;
      background-color: rgb(0, 255, 146);
    }
  }
}
</style>
