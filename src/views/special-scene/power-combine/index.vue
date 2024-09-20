<template>
  <div class="special-scene-index">
    <TrafficPower v-if="selectBtmTab === bottomTabsData[0].code" @playTwin="playTwin" />
    <!-- <ParkingCharge v-else /> -->
    <!-- <bottom-menu-tabs
      v-show="!hideBottom"
      :activeValue="selectBtmTab"
      :data="bottomTabsData"
      @changeTab="changeButtomTab"
    /> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TrafficPower from './traffic-power/index.vue';
// import ParkingCharge from './parking-charge/index.vue';
import { bottomTabDataFun } from './config';
const bottomTabsData = ref(bottomTabDataFun());
const selectBtmTab = ref(bottomTabsData.value[0].code);
const hideBottom = ref(false);
const changeButtomTab = (item) => {
  selectBtmTab.value = item.code;
};
const playTwin = (vl) => {
  hideBottom.value = vl;
};
</script>

<style lang="less" scoped>
.special-scene-index {
  width: 100%;
  height: 100%;
}
</style>
