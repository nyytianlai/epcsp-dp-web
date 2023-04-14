<template>
  <div class="ec-wrap">
    <ec-resize :option="ecOption" liquidfill />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import EcResize from '@sutpc/vue3-ec-resize';

const ecOption = computed(() => {
  return {
    series: [
      {
        // 更多liquidfill文档：https://github.com/ecomfe/echarts-liquidfill
        type: 'liquidFill',
        data: [0.6],
        label: {
          fontSize: 20
        }
      }
    ]
  };
});

</script>

<style lang="less" scoped>
.ec-wrap {
  width: 400px;
  height: 400px;
}
</style>
