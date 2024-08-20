<template>
  <div class="warning-message">
    <ScrollTable
      style="width: 100%; height: 3.3rem"
      :autoScroll="false"
      :interval="5000"
      :data="scrollTableData"
      :highlight-current-row="false"
      class="custom-table"
    >
      <el-table-column
        v-for="(item, index) in columnKeyList"
        :key="index"
        :prop="item.prop"
        align="left"
        :label="item.displayLabel || item.label"
        :min-width="item.width"
        :type="item.type"
      ></el-table-column>
    </ScrollTable>
    <el-pagination
      :page-size="pageObj.pageSize"
      layout="prev, pager, next"
      :total="pageObj.total"
      :background="true"
      :current-page="pageObj.currentPage"
      @current-change="handPageChange"
    />
  </div>
</template>
<script setup>
import { ref, reactive, inject, onMounted, watch } from 'vue';
import ScrollTable from '@sutpc/vue3-scroll-table';
import { selectEquipmentAlarmByPage } from './api.js';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `station-detail.components.pile-dialog.warning-message`;

const pileData = inject('pileData');

const messageColumnKeyListFun = () => {
  return [
    { prop: 'index', label: '序号', width: 30, type: 'index', displayLabel: t(`${tHead}.messageColumnKeyListFun.index`) },
    { prop: 'alarmTime', label: '告警时间', width: 150, displayLabel: t(`${tHead}.messageColumnKeyListFun.alarmTime`) },
    { prop: 'alarmType', label: '告警类型', width: 120, displayLabel: t(`${tHead}.messageColumnKeyListFun.alarmType`) },
    { prop: 'alarmDesc', label: '告警描述', width: 150, displayLabel: t(`${tHead}.messageColumnKeyListFun.alarmDesc`) }
  ];
};
const pageObj = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
const columnKeyList = ref(messageColumnKeyListFun());
const scrollTableData = ref([]);
// table数据
const handPageChange = (value) => {
  pageObj.currentPage = value;
  getEquipmentAlarmByPage();
};
const getEquipmentAlarmByPage = async () => {
  const params = {
    equipmentId: pileData.value?.equipmentId,
    operatorId: pileData.value?.operatorId,
    pageNum: pageObj.currentPage,
    pageSize: pageObj.pageSize
  };
  const res = await selectEquipmentAlarmByPage(params);
  if (res?.data?.dataList) {
    scrollTableData.value = res?.data?.dataList;
    pageObj.total = res?.data?.totalData;
  } else {
    scrollTableData.value = [];
    pageObj.total = 0;
  }
};
onMounted(() => {});
watch(
  () => pileData.value.equipmentId,
  async (newVal) => {
    await getEquipmentAlarmByPage();
  },
  {
    immediate: true
  }
);
</script>
<style lang="less" scoped>
.warning-message {
  :deep(.custom-table) {
    .el-table__header {
      background: linear-gradient(0deg, #61789a -24.83%, rgba(114, 131, 156, 0.0884779) 100%);
    }
  }
  .el-pagination {
    margin-top: 0.26rem;
    float: right;
  }
}
</style>
