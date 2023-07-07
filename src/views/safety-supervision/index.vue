<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 09:12:44
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-11 15:34:52
 * @FilePath: \epcsp-dp-web\src\views\safety-supervision\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <page-num :data="pageNumData" bgcType="red-bgc" />
  <left-panel :bottomCode="bottomCode" />
  <right-panel
    :bottomCode="bottomCode"
    :totalCurCode="totalCurCode"
    @handleTotalCurCodeChange="handleTotalCurCodeChange"
    @handleChargeTypeChange="handleChargeTypeChange"
  />

  <bottom-menu-tabs :data="bottomTabsData" @changeTab="changeButtomTab" :activeValue="bottomCode" />
  <map-layer v-if="aircityObj" :ref="(el) => (mapLayerRef = el)" />
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, inject } from 'vue';
import { pageNumFun, bottomTabDataFun } from './config.js';
import { getAlarmUpStatics } from './api.js';
import MapLayer from './components/map-layer.vue';
import LeftPanel from './components/left-panel/index.vue';
import RightPanel from './components/right-panel/index.vue';

const aircityObj = inject('aircityObj');
let mapLayerRef = ref(null);
// 底部icon的code
const bottomCode = ref(1);
// 告警级别tab高亮
const totalCurCode = ref(1);
//地图底部tab切换
const changeButtomTab = (item) => {
  bottomCode.value = item.code;
  console.log('底部切换', item);
  mapLayerRef.value.buttomTabChange(item.code);
};
// 头部累计数据
const pageNumData = ref(pageNumFun());
const getAlarmUpStaticsData = async () => {
  let { data } = await getAlarmUpStatics();
  pageNumData.value = pageNumFun(data || {});
};

//底部button
const bottomTabsData = ref(bottomTabDataFun());
const handleTotalCurCodeChange = (code) => {
  totalCurCode.value = code;
  if (code === 1 && bottomCode.value === 1) {
    mapLayerRef.value.buttomTabChange(bottomCode.value);
  }
  if (code === 3 && bottomCode.value === 2) {
    mapLayerRef.value.buttomTabChange(bottomCode.value);
  }
};
const handleChargeTypeChange = (item) => {
  mapLayerRef.value.alarmTypeChange(item);
};
onMounted(async () => {
  getAlarmUpStaticsData();
});
</script>

<style lang="less" scoped>
.filter {
  cursor: pointer;
}
.detail {
  color: #4bdeff;
  text-decoration: none;
}
</style>
