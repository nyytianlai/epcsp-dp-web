<template>
  <div class="brand-support">
    <title-column title="品牌支持" />
    <div class="brand-support-content" v-loading="loading">
      <img src="" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Api from '../api';

const loading = ref(true);

const getData = async () => {
  loading.value = true;
  try {
  } catch (error) {}
  loading.value = false;
};

onMounted(async () => {
  await getData();
});
</script>

<style scoped lang="less">
.brand-support {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .brand-support-content {
    position: relative;
    flex: 1;
    min-height: 0;
    border-radius: 4px;
    background: url('../images/brand-support-bg.png') no-repeat center center/100% auto;
  }
}
</style>
