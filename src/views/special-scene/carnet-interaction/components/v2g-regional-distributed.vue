<template>
  <div class="v2g-regional-distributed">
    <title-column title="V2G区域分布" />
    <div class="distributed-content" v-loading="loading">
      <scroll-table
        :scrollTableData="scrollTableData"
        :columnKeyList="v2gRegionalDistributedColumn"
        style="height: 100%"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ScrollTable from '@/views/safety-supervision/components/scroll-table.vue';
import { v2gRegionalDistributedColumn } from '../config';
import Api from '../api';

const scrollTableData = ref([]);
const loading = ref(true);

const getData = async () => {
  loading.value = true;
  try {
    const { data } = await Api.getV2GDistribution();
    scrollTableData.value = data;
  } catch (error) {}
  loading.value = false;
};
getData();
</script>

<style scoped lang="less">
.v2g-regional-distributed {
  width: 100%;
  height: 100%;
  // height: 300px;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .distributed-content {
    flex: 1;
    min-height: 0;
    border-radius: 4px;

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );
  }
}
</style>
