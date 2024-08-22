<template>
  <div class="parking-charge-area">
    <!-- qytcyxqk: '区域停充运行情况' -->
    <title-column :title="t(`${tHead}.qytcyxqk`)" />
    <div class="distributed-content" v-loading="loading">
      <scroll-table
        :scrollTableData="scrollTableData"
        :columnKeyList="parkingChargeOperationColumn"
        style="height: 100%"
      >
        <template #rate="{ row }">
          {{ row.dailyParkingSpaceUtilizationRate ?? '--' }}/{{
            row.dailyGunUtilizationRate ?? '--'
          }}
        </template>
      </scroll-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { parkingChargeOperationColumn } from '../config';
import ScrollTable from '@/views/safety-supervision/components/scroll-table.vue';
import Api from '../api';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `special-scene.power-combine.components.parking-charge-area`;

const scrollTableData = ref([]);
const loading = ref(true);

const getData = async () => {
  loading.value = true;
  try {
    const res = await Api.parkChargingAreaRunOverview();
    scrollTableData.value = res.data || [];
  } catch (error) {}
  loading.value = false;
};
getData();
</script>

<style scoped lang="less">
.parking-charge-area {
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
