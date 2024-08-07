<template>
  <div class="special-scene">
    <panel class="special-scene-panel left">
      <ResourceOverview />
      <ResourceCategry />
      <AreaDistributed />
    </panel>
    <panel class="special-scene-panel right" type="right">
      <DispatcherOperation />
      <TodayDispatcherOverview />
      <ActureClusterOperation />
    </panel>
    <map-layer v-if="aircityObj" />
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import MapLayer from './map-layers/map-layer.vue';
import ResourceOverview from './components/resource-overview.vue';
import ResourceCategry from './components/resource-categry.vue';
import AreaDistributed from './components/area-distributed.vue';
import DispatcherOperation from './components/dispatcher-operation.vue';
import TodayDispatcherOverview from './components/today-dispatcher-overview.vue';
import ActureClusterOperation from './components/acture-cluster-operation.vue';
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
