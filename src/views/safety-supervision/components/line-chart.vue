<template>
  <EcResize :option="state.option" />
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
import EcResize, { getEcharts } from '@sutpc/vue3-ec-resize';
interface Option {
  grid?: object;
  xAxis: object;
  yAxis: object;
  series: [];
}
const props = defineProps({
  option: {
    type: Object as PropType<Option>,
    default() {
      return {
        xAxis: {},
        yAxis: {},
        series: []
      };
    }
  }
});
const state = reactive({
  option: {}
});
const handleChartData = async () => {
  await getEcharts();
  state.option = props.option;
};
watch(
  () => props.option,
  (newVal) => {
    handleChartData();
  },
  {
    deep: true
  }
);
</script>
