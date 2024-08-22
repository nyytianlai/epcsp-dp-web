<template>
  <div class="parking-charge-distributed">
    <!-- tcqyfb: '停充区域分布' -->
    <title-column :title="t(`${tHead}.tcqyfb`)" />
    <div class="distributed-content" v-loading="loading">
      <scroll-table
        :scrollTableData="scrollTableData"
        :columnKeyList="parkingChargeAreaColumn"
        style="height: 100%"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { parkingChargeAreaColumn } from '../config';
import ScrollTable from '@/views/safety-supervision/components/scroll-table.vue';
import Api from '../api';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `special-scene.power-combine.components.parking-charge-distributed`;

const loading = ref(true);
const scrollTableData = ref([]);
const getData = async () => {
  loading.value = true;
  try {
    const res = await Api.parkChargingAreaDistribution()
    scrollTableData.value = res?.data || []
  } catch (error) {}
  loading.value = false;
};
getData();
</script>

<style scoped lang="less">
.parking-charge-distributed {
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
