<template>
  <div class="bus-power-distributed">
    <!-- bssydlfb: '巴士剩余电量分布' -->
    <title-column title="区域公交储能与V2G统计" />
    <div class="distributed-content" v-loading="loading">
      <scroll-table
        :scrollTableData="scrollTableData"
        :columnKeyList="powerDistributedColumn"
        :row-class-name="handleRowClassName"
        class="custom-dialog-table"
        style="height: 100%"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ScrollTable from '@/views/safety-supervision/components/scroll-table.vue';
import { powerDistributedColumn } from '../config';
import Api from '../api';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `special-scene.power-combine.components.bus-power-distributed`;

const scrollTableData = ref([]);
const loading = ref(true);

const getData = async () => {
  loading.value = true;
  try {
    const params = {
      areaCode: '',
      streetCode: ''
    };
    const arr = [];
    const res = await Promise.allSettled([
      Api.busCanDistribution(params),
      Api.getV2GDistribution()
    ]);
    res.forEach((item: any) => {
      item.value?.data?.forEach((v: any) => {
        const fd = arr.find((fd: any) => fd.areaCode === v.areaCode);
        if (fd) {
          Object.assign(fd, v);
        } else {
          arr.push(v);
        }
      });
    });
    scrollTableData.value = arr;
  } catch (error) {}
  loading.value = false;
};

const handleRowClassName = ({ row, rowIndex }) => {
  if (row.areaCode === '4403') {
    return 'high-light-row';
  }
  return '';
};
getData();
</script>

<style scoped lang="less">
.bus-power-distributed {
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
:deep(.high-light-row) {
  .cell {
    color: rgb(1, 245, 190) !important;
  }
}
</style>
