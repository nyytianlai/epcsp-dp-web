<template>
  <page-num :data="pageNumData" />
  <left-panel
    :bottomBtnCur="bottomBtnCur"
    :totalCurCode="totalCurCode"
    @handleBottomBtnCurChange="handleBottomBtnCurChange"
    @handleTotalCurCodeChange="handleTotalCurCodeChange"
    @handleChargeTypeChange="handleChargeTypeChange"
  />
  <right-panel />
  <map-layer v-if="aircityObj" ref="mapLayerRef" />
  <bottom-menu-tabs :data="bottomTabsData" @changeTab="changeButtomTab" />
</template>
<script lang="ts" setup>
import { ref, onMounted, inject } from 'vue';
import { selectChargeEquipmentStatistics } from './api.js';
import { pageNumFun, bottomTabDataFun } from './config.js';
import MapLayer from './components/map-layer.vue';
import LeftPanel from './components/left-panel/index.vue';
import RightPanel from './components/right-panel/index.vue';

const aircityObj = inject('aircityObj');
const mapLayerRef = ref(null);
// 当前底部button高亮的对象
const bottomBtnCur = ref(1);
// 充电设施总量tab高亮
const totalCurCode = ref(1);
// 头部累计数据
const pageNumData = ref(pageNumFun());
//底部button
const bottomTabsData = ref(bottomTabDataFun());

//设备管理/标题下四个统计数
const getSelectChargeEquipmentStatistics = async () => {
  const res = await selectChargeEquipmentStatistics();
  pageNumData.value = pageNumFun(res.data);
};

// 底部按钮点击
const changeButtomTab = (item) => {
  console.log('底部切换', item);
  bottomBtnCur.value = item.code;
  mapLayerRef.value.buttomTabChange(item.code);
};
const handleBottomBtnCurChange = () => {};
const handleTotalCurCodeChange = (code) => {
  totalCurCode.value = code;
  mapLayerRef.value.buttomTabChange(bottomBtnCur.value);
};
const handleChargeTypeChange = (item) => {
  mapLayerRef.value.handleChargeTypeChange(item);
};
onMounted(() => {
  getSelectChargeEquipmentStatistics();
});
</script>
<style lang="less" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
