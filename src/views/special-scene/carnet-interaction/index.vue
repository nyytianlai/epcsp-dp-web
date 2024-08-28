<template>
  <div class="special-scene">
    <panel class="special-scene-panel left">
      <CarNetworkOverview />
      <V2G />
      <V2gBuildStatus />
    </panel>
    <panel class="special-scene-panel right" type="right">
      <V2gModel />
      <V2gOperationRank />
      <BrandSupport />
    </panel>
    <map-layer v-if="aircityObj" />
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue';
import MapLayer from './map-layers/map-layer.vue';
import CarNetworkOverview from './components/car-network-overview.vue';
import V2G from './components/v2g-regional-distributed.vue';
import V2gBuildStatus from './components/v2g-build-status.vue';
import V2gModel from './components/v2g-model.vue';
import V2gOperationRank from './components/v2g-operation-rank.vue';
import BrandSupport from './components/brand-support.vue';

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
// :deep(.panel) {
//   display: grid;
//   > div {
//     min-width: 0;
//     min-height: 0;
//   }

//   &.left {
//     grid-template-rows: auto 240px 1fr;
//   }

//   &.right {
//     grid-template-rows: auto 1fr 1fr;
//   }
// }
</style>
