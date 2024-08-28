<template>
  <el-slider
    class="time-slider"
    v-model="sliderValue"
    :step="1"
    show-stops
    :marks="marks"
    :max="data?.length - 1"
    :format-tooltip="formatTooltip"
  />
</template>

<script lang="ts" setup>
import { reactive, onMounted, watch, ref, computed } from 'vue';
const emit = defineEmits(['change', 'update:modelValue']);
const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  modelValue: {
    type: Number,
    default: 0
  }
});
onMounted(() => {});
const sliderValue = computed({
  get() {
    return props.modelValue;
  },
  set(v) {
    emit('update:modelValue', v);
  }
});
const marks = reactive({});
const formatTooltip = (v) => {
  return marks[v].label;
};
watch(
  () => props.data,
  (val) => {
    const key = 100 / (val.length - 1);
    val.forEach((v, i) => {
      marks[i] = {
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
</script>

<style lang="less" scoped>
.time-slider {
  width: 100%;
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
