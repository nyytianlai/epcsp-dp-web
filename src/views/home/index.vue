<template>
  <div class="home">
    <page-num :data="state.pageNumData" />
    <PhotovoltaicStation v-if="homeTab === 'photovoltaic-station'"></PhotovoltaicStation>
    <ChargingsReplacementCabinet v-if="homeTab === 'chargings-replacement-cabinet'"></ChargingsReplacementCabinet>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted,watch } from 'vue';
import PageNum from '@/components/page-num/index.vue';
import { pageNumFun } from './config.js';
import { useSystemStore } from '@/stores/system';
import { storeToRefs } from 'pinia';
import PhotovoltaicStation from '@/views/photovoltaic-station/index.vue'
import ChargingsReplacementCabinet from '@/views/chargings-replacement-cabinet/index.vue'
const state = reactive({
  activeBottomMenu: 'overview',
  pageNumData: []
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
});
</script>
