<template>
  <div class="special-scene">
    <panel class="special-scene-panel left">
      <OperationBusOverview />
      <BusPowerDistributed />
      <BusPowerTrend />
    </panel>
    <panel class="special-scene-panel right" type="right">
      <AdjustOverview />
      <TodayAdjustDemand />
      <AdjustTrendAnalysis />
    </panel>
    <map-layer v-if="aircityObj" />
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue';
import MapLayer from './map-layers/map-layer.vue';
import OperationBusOverview from './components/operation-bus-overview.vue';
import BusPowerDistributed from './components/bus-power-distributed.vue';
import BusPowerTrend from './components/bus-power-trend.vue';
import AdjustOverview from './components/adjust-overview.vue';
import TodayAdjustDemand from './components/today-adjust-demand.vue';
import AdjustTrendAnalysis from './components/adjust-trend-analysis.vue';
const aircityObj = inject('aircityObj');
</script>

<style lang="less" scoped>
.special-scene-panel {
  width: 100%;
  height: 100%;
  display: grid;
  > div {
    min-width: 0;
    min-height: 0;
  }
}
</style>
