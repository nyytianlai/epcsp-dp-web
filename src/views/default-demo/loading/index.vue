<template>
  <div class="loading-wrap">
    <el-button @click="addLoadingHandler">点击添加loading</el-button>
    <div class="loading-area" ref="loadingRef"></div>
    <div>loading的数量：{{ loadingCount }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Loading from '@sutpc/vue3-loading';

const loadingRef = ref();

const loadingCount = ref(0);

const addLoadingHandler = () => {

  Loading.add(loadingRef.value);
  
  loadingCount.value++;

  setTimeout(() => {
    Loading.remove(loadingRef.value);
    
    loadingCount.value--;
  }, 1500);

};
</script>

<style lang="less" scoped>
.loading-area {
  width: 300px;
  height: 300px;
  background: gray;
}
</style>
