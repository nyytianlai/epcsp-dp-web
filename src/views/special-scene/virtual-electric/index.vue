<template>
  <div class="special-scene">
    <!-- <page-num :data="pageNumData" /> -->
    <panel class="special-scene-panel left">
      <ResourceOverview />
      <ResourceCategry />
      <AreaDistributed />
    </panel>
    <panel class="special-scene-panel right" type="right">
      <VirtualPowerPlantAnnouncement @active-change="handleActiveChange" />
      <DispatcherOperation :adjustDate="active" />
      <ActureClusterOperation :adjustDate="active" />
    </panel>
    <map-layer v-if="aircityObj" :adjustDate="active" :activeIndex="activeIndex" />
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, onBeforeUnmount } from 'vue';
import { pageNumFun } from './config.js';
import MapLayer from './map-layers/map-layer.vue';
import PageNum from '@/components/page-num/index.vue';
import ResourceOverview from './components/resource-overview.vue';
import ResourceCategry from './components/resource-categry.vue';
import AreaDistributed from './components/area-distributed.vue';
import DispatcherOperation from './components/dispatcher-operation.vue';
import VirtualPowerPlantAnnouncement from './components/virtual-power-plant-announcement.vue';
import ActureClusterOperation from './components/acture-cluster-operation.vue';

import V2G from '@/views/special-scene/carnet-interaction/components/v2g-regional-distributed.vue';
import bus from '@/utils/bus';

const aircityObj = inject('aircityObj');
// 头部累计数据
const pageNumData = ref(pageNumFun());

const active = ref('active');
const activeIndex = ref();
const handleActiveChange = ({ value, index }) => {
  active.value = value;
  activeIndex.value = index;
};
bus.on('virtual-electric-top-data', (data) => {
  pageNumData.value = pageNumFun(data);
});

onBeforeUnmount(async () => {
  bus.off('virtual-electric-top-data');
});
</script>

<style lang="less" scoped>
:deep(.left) {
  display: grid;
  > div {
    min-width: 0;
    min-height: 0;
  }

  &.left {
    grid-template-rows: auto 270px 1fr;
  }

  &.right {
    grid-template-rows: auto 300px 1fr;
  }
}
</style>
