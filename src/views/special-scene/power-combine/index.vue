<template>
  <div class="special-scene">
    <TrafficPower v-if="selectBtmTab === bottomTabsData[0].code" />
    <ParkingCharge v-else />
    <bottom-menu-tabs
      :activeValue="selectBtmTab"
      :data="bottomTabsData"
      @changeTab="changeButtomTab"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TrafficPower from './traffic-power/index.vue';
import ParkingCharge from './parking-charge/index.vue';
import { bottomTabDataFun } from './config';
const bottomTabsData = ref(bottomTabDataFun());
const selectBtmTab = ref(bottomTabsData.value[0].code);
const changeButtomTab = (item) => {
  selectBtmTab.value = item.code;
};
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
