<template>
  <div class="special-scene">
    <panel>
      <ParkingChargeOverview />
      <ParkingChargeDistributed />
      <ParkingChargeRank />
    </panel>
    <panel type="right">
      <ParkingChargeOperation />
      <ParkingChargeArea />
      <ParkingChargeTrend />
    </panel>
    <map-layer v-if="aircityObj" />
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue';
import MapLayer from './map-layers/map-layer.vue';
import ParkingChargeOverview from './components/parking-charge-overview.vue';
import ParkingChargeDistributed from './components/parking-charge-distributed.vue';
import ParkingChargeRank from './components/parking-charge-rank.vue';
import ParkingChargeOperation from './components/parking-charge-operation.vue';
import ParkingChargeArea from './components/parking-charge-area.vue';
import ParkingChargeTrend from './components/parking-charge-trend.vue';
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
    grid-template-rows: auto 1fr 1fr;
  }

  &.right {
    grid-template-rows: auto 1fr 1fr;
  }
}
</style>
