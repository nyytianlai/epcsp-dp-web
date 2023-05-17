<template>
  <div class="ec-wrap">
    <ec-resize :option="ecOption"/>
  </div>
</template>

<script setup>

import { computed, ref } from 'vue';
import EcResize from '@sutpc/vue3-ec-resize';

const ecData = ref(null);

const ecOption = computed(() => {
  return {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: ecData.value,
        type: 'line',
        smooth: true
      }
    ]
  };
})

const makeEcData = () => {
  let randomData = new Array(7).fill(0);
  for(let i = 0, length = randomData.length; i<length; i++) {
    randomData[i] = Math.floor(Math.random() * 100);
  }
  ecData.value = randomData;
}

makeEcData();

</script>

<style lang="less" scoped>
.ec-wrap {
  width: 400px;
  height: 400px;
}
</style>