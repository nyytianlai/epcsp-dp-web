<template>
  <div class="area-distributed">
    <title-column title="可调容量区域分布" />
    <div class="distributed-content">
      <area-rank-list :data="areaRankData" :totalNum="areaTotalNum" height="100%" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const loading = ref(true);
const areaTotalNum = ref(100);

const areaRankData = computed(() => {
  return [
    { name: '区域1', num: 10, unit: '%' },
    { name: '区域2', num: 20 },
    { name: '区域3', num: 30 },
    { name: '区域4', num: 40 },
    { name: '区域5', num: 50 },
    { name: '区域6', num: 60 },
    { name: '区域7', num: 70 },
    { name: '区域8', num: 80 },
    { name: '区域9', num: 90 },
    { name: '区域10', num: 100 }
  ];
});

const getData = async () => {
  loading.value = true;
  try {
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
