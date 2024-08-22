<template>
  <div class="area-distributed">
    <!-- xzqfbqk: '行政区分布情况' -->
    <title-column :title="t(`${tHead}.xzqfbqk`)" />
    <tabs v-model="selectType" :data="areaDistributedTabType" />
    <div class="distributed-content" v-loading="loading">
      <scroll-table
        :scrollTableData="scrollTableData"
        :columnKeyList="columnKeyList"
        style="height: 100%"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { areaDistributedTabType, columnKeyListFun } from '../config.js';
import ScrollTable from '@/views/safety-supervision/components/scroll-table.vue';
import Api from '../api.js';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `special-scene.super-charging-building.components`;

const selectType = ref(areaDistributedTabType[0].code);
const loading = ref(true);
const columnKeyList = computed(() => {
  return columnKeyListFun(selectType.value);
});

const scrollTableData = ref([]);

const getData = async () => {
  loading.value = true;
  try {
    const res = await Api.getAreaDistribute();
    scrollTableData.value = res?.data;
  } catch (error) {
    scrollTableData.value = [];
  }
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
