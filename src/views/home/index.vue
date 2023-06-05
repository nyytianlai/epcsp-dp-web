<template>
  <div class="home">
    <page-num :data="state.pageNumData" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import PageNum from '@/components/page-num/index.vue';
import { pageNumFun } from './config.js';
const state = reactive({
  activeBottomMenu: 'overview',
  pageNumData: []
});
// 头部累计数据
// 头部累计数据4个指标
const getOverTotalCount = async () => {
  // const res = await overTotalCount();
  // pageNumData.value = pageNumFun(res.data);
};
onMounted(() => {
  state.pageNumData = pageNumFun()[state.activeBottomMenu];
});
</script>
