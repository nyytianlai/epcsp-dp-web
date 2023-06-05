<template>
  <div class="home">
    <page-num :data="state.pageNumData" />
    <panel>
      <div class="">
        <title-column title="新能源汽车充电站" />
        <div class="num-wrap">
          <template v-for="(item, index) in state.chargingStations" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
      </div>
    </panel>
    <PhotovoltaicStation v-if="homeTab === 'photovoltaic-station'"></PhotovoltaicStation>
    <ChargingsReplacementCabinet v-if="homeTab === 'chargings-replacement-cabinet'"></ChargingsReplacementCabinet>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted,watch } from 'vue';
import { pageNumFun, chargingStationsFun } from './config.js';
import PageNum from '@/components/page-num/index.vue';
import Panel from '@/components//panel/index.vue';
import { useSystemStore } from '@/stores/system';
import { storeToRefs } from 'pinia';
import PhotovoltaicStation from '@/views/photovoltaic-station/index.vue'
import ChargingsReplacementCabinet from '@/views/chargings-replacement-cabinet/index.vue'
const state = reactive({
  activeBottomMenu: 'overview',
  pageNumData: [],
  chargingStations: []
});
const { homeTab } = storeToRefs(useSystemStore())
// 头部累计数据
// 头部累计数据4个指标
const getOverTotalCount = async () => {
  // const res = await overTotalCount();
  // pageNumData.value = pageNumFun(res.data);
};
// 监听底下tab切换
watch(()=>homeTab.value,(newVal)=>{
  console.log(newVal)
  // 切换模块
  state.activeBottomMenu = newVal
  // 切换顶部数据
  state.pageNumData = pageNumFun()[state.activeBottomMenu];
},{immediate:true})
onMounted(() => {
  state.pageNumData = pageNumFun()[state.activeBottomMenu];
  state.chargingStations = chargingStationsFun();
});
</script>

<style lang="less" scoped>
.num-wrap {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  :deep(.num-card) {
    width: 49%;
    padding: 24px 0 11px;
    background: linear-gradient(
      258.38deg,
      rgba(37, 177, 255, 0.1) 2.46%,
      rgba(37, 177, 255, 0) 100%
    );
    mix-blend-mode: normal;
    box-shadow: inset 0px 0px 35px rgba(41, 76, 179, 0.2);
    filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.04));
    border-radius: 2px;
    justify-content: center;
    .info {
      flex-direction: column;
      .name {
        margin-bottom: 0;
      }
    }
  }
}
</style>
