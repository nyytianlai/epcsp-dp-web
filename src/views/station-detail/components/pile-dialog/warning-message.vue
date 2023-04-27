<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-26 14:09:49
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-27 18:45:40
 * @FilePath: \epcsp-dp-web\src\views\station-detail\components\pile-dialog\warning-message.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
            :label="item.label"
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
import { ref,reactive,inject,onMounted } from 'vue';
import ScrollTable from '@sutpc/vue3-scroll-table';
import { selectEquipmentAlarmByPage } from '@/api/stationDetail.js'
const pileData = inject('pileData');
const messageColumnKeyListFun = () => {
  return [
    { prop: 'index', label: '序号', width: 30, type: 'index' },
    { prop: 'alarmTime', label: '告警时间', width: 150 },
    { prop: 'alarmType', label: '告警类型', width: 120 },
    { prop: 'alarmDesc', label: '告警描述', width: 150 }
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
  getEquipmentAlarmByPage()
};
const getEquipmentAlarmByPage = async () => {
  const params = {
    "equipmentId": pileData.value?.equipmentId,
    "operatorId": pileData.value?.operatorId,
    "pageNum": pageObj.currentPage,
    "pageSize": pageObj.pageSize
  }
  const res = await selectEquipmentAlarmByPage(params)
  if (res?.data?.dataList) {
    scrollTableData.value = res?.data?.dataList
    pageObj.total = res?.data?.totalData
  } else {
    scrollTableData.value = []
    pageObj.total = 0
  }
}
onMounted(() => {
  getEquipmentAlarmByPage()
})
</script>
<style lang="less" scoped>
.warning-message{

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
