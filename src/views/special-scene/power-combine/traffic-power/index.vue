<template>
  <div class="special-scene">
    <panel class="special-scene-panel left">
      <OperationBusOverview />
      <BusPowerDistributed />
    </panel>
    <panel class="special-scene-panel right" type="right">
      <!-- <AdjustOverview />
      <TodayAdjustDemand /> -->
      <V2G />
      <!-- <AdjustTrendAnalysis /> -->
      <BusPowerTrend />
    </panel>
    <map-layer v-if="aircityObj" @playTwin="playTwin" />
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue';
import MapLayer from './map-layers/map-layer.vue';
import OperationBusOverview from './components/operation-bus-overview.vue';
import BusPowerDistributed from './components/bus-power-distributed.vue';
import BusPowerTrend from './components/bus-power-trend.vue';
// import AdjustOverview from './components/adjust-overview.vue';
// import TodayAdjustDemand from './components/today-adjust-demand.vue';
import AdjustTrendAnalysis from './components/adjust-trend-analysis.vue';
import V2G from '@/views/special-scene/carnet-interaction/components/v2g-regional-distributed.vue';
const emits = defineEmits(['playTwin']);
const aircityObj = inject('aircityObj');
const playTwin = (vl) => {
  emits('playTwin', vl);
};
</script>

<style lang="less" scoped>
:deep(.panel) {
  display: grid;
  > div {
    min-width: 0;
    min-height: 0;
  }

  &.left {
    grid-template-rows: auto 1fr;
  }

  &.right {
    grid-template-rows: 576px 1fr;
  }
}
</style>
