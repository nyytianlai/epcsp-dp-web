<template>
  <div class="area-distributed">
    <title-column title="可调容量区域分布" />
    <div class="distributed-content" v-loading="loading">
      <area-rank-list
        :data="areaRankData"
        :totalNum="areaTotalNum"
        height="100%"
        v-show="areaRankData?.length"
      />
      <no-data v-show="!areaRankData?.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Api from '../api';

const loading = ref(true);

const areaRankData = ref([]);
const areaTotalNum = computed(() => Math.max(...areaRankData.value.map((item) => +item.num)));

const getData = async () => {
  loading.value = true;
  try {
    const res = await Api.adjustableCapacityDistribution();
    areaRankData.value = res?.data?.map((item) => {
      return {
        name: item.areaName,
        num: item.adjustableCapacity,
        unit: 'MW'
      };
    });
  } catch (error) {}
  loading.value = false;
};
getData();
</script>

<style scoped lang="less">
.area-distributed {
  width: 100%;
  height: 100%;
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
