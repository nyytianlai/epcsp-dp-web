<template>
  <div class="ec-wrap">
    <ec-resize :option="ecOption" gl />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import EcResize from '@sutpc/vue3-ec-resize';

var data = [];
// Parametric curve
for (var t = 0; t < 25; t += 0.001) {
  var x = (1 + 0.25 * Math.cos(75 * t)) * Math.cos(t);
  var y = (1 + 0.25 * Math.cos(75 * t)) * Math.sin(t);
  var z = t + 2.0 * Math.sin(75 * t);
  data.push([x, y, z]);
}

const ecOption = computed(() => {
  return {
    tooltip: {},
    visualMap: {
      show: false,
      dimension: 2,
      min: 0,
      max: 30,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      }
    },
    xAxis3D: {
      type: 'value'
    },
    yAxis3D: {
      type: 'value'
    },
    zAxis3D: {
      type: 'value'
    },
    grid3D: {
      viewControl: {
        projection: 'orthographic'
      }
    },
    series: [
      {
        type: 'line3D',
        data: data,
        lineStyle: {
          width: 4
        }
      }
    ]
  };
});
</script>

<style lang="less" scoped>
.ec-wrap {
  width: 600px;
  height: 500px;
}
</style>
