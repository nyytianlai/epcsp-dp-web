<template>
  <div class="special-scene">
    <panel class="special-scene-panel left">
      <OperationBusOverview />
      <BusPowerTrend />
      <BusPowerDistributed />
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
:deep(.panel) {
  display: grid;
  > div {
    min-width: 0;
    min-height: 0;
  }

  &.left {
    grid-template-rows: auto 240px 1fr;
  }

  &.right {
    grid-template-rows: auto 1fr 1fr;
  }
}
</style>
