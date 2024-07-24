<!--
 * @Author: niyayong@sutpc.com
 * @Date: 2024-07-22 15:19:08
 * @LastEditors: niyayong@sutpc.com
 * @LastEditTime: 2024-07-23 14:29:28
 * @Description: 
 * @FilePath: /epcsp-dp-web/src/views/special-scene/super-charging-building/index.vue
-->
<template>
  <div class="special-scene">
    <page-num :data="pageNumData" />
    <panel>
      <div class="special-scene-panel left">
        <SuperStation />
        <AreaDistributed />
      </div>
    </panel>
    <panel type="right">
      <div class="special-scene-panel right">
        <OperationTrend />
        <OperationRank />
        <SuperOperationDistributed />
      </div>
    </panel>
    <map-layer v-if="aircityObj" />
    <bottom-menu-tabs :data="bottomTabsData" @changeTab="changeButtomTab" />
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue';
// import MapLayer from './components/map-layer.vue';
import { bottomTabDataFun, pageNumFun } from './config.js';
import PageNum from '@/components/page-num/index.vue';
import SuperStation from './components/super-station.vue';
import AreaDistributed from './components/area-distributed.vue';
import OperationTrend from './components/operation-trend.vue';
import OperationRank from './components/operation-rank.vue';
import SuperOperationDistributed from './components/super-operation-distributed.vue';
// 底部button
const bottomTabsData = ref(bottomTabDataFun());
// 头部累计数据
const pageNumData = ref(pageNumFun());
const aircityObj = inject('aircityObj');
const changeButtomTab = (item) => {
  console.log('底部切换', item);
  const value = item.code === 1 ? true : false;
};
</script>

<style lang="less" scoped>
.special-scene-panel {
  width: 100%;
  height: 100%;
  display: grid;
  row-gap: 16px;

  > div {
    min-width: 0;
    min-height: 0;
  }

  &.left {
    grid-template-rows: 468px 1fr;
  }

  &.right {
    grid-template-rows: 244px 1fr 302px;
  }
}
</style>
