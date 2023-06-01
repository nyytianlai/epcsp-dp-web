<template>
  <custom-dialog v-model:visible="props.visible" title="告警信息列表" @closed="handleClosed">
    <template #titleSearch>
      <el-input
        v-model="inputWarn"
        placeholder="请输入"
        class="search-input"
        @change="handleSearchWarn"
      >
        <template #suffix>
          <icon :size="12" icon="svg-icon:search" />
        </template>
      </el-input>
    </template>
    <el-table
      :data="alarmTableData"
      height="6.34rem"
      style="width: 100%"
      class="custom-dialog-table"
    >
      <el-table-column
        v-for="(item, index) in columnData"
        :key="index"
        v-bind="item"
        :show-overflow-tooltip="true"
        :formatter="tableColumnFun"
      >
        <template #header v-if="item.prop === 'alarmLevelName'">
          <div class="alarmLevelName">
            {{ item.label }}
            <el-popover placement="bottom" trigger="click">
              <template #reference>
                <icon :size="12" icon="svg-icon:filter" class="filter" />
              </template>
              <div class="checkbox">
                <el-tree
                  :data="filtersAlarmLevelName"
                  show-checkbox
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                  @check="handleFilter"
                  class="table-filter"
                  :indent="0.00001"
                  :default-checked-keys="defaultAreaWarm"
                />
              </div>
            </el-popover>
          </div>
        </template>
        <template #header v-if="item.prop === 'alarmTypeName'">
          <div class="alarmTypeName">
            {{ item.label }}
            <el-popover placement="bottom" trigger="click">
              <template #reference>
                <icon :size="12" icon="svg-icon:filter" class="filter" />
              </template>
              <div class="checkbox">
                <el-tree
                  :data="filtersAlarmTypeName"
                  show-checkbox
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                  @check="handleFilterType"
                  class="table-filter"
                  :indent="0.00001"
                  :default-checked-keys="defaultAreaWarmType"
                />
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" key="operation" minWidth="1">
        <template #default="scope">
          <a href="javascript:;" class="detail" @click="handleDetailWarn(scope)">详情</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageObj.pageSize"
      layout="prev, pager, next"
      :total="pageObj.total"
      :background="true"
      :current-page="pageObj.currentPage"
      @current-change="handPageChange"
    />
  </custom-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, inject, onMounted } from 'vue';
import { alarmInfo } from '../api.js';
import { columnDataFun, filtersAlarmLevelName, filtersAlarmTypeName } from '../config.js';
import { tableColumnFun } from '@/global/commonFun.js';
import { toSingleStation } from '@/global/config/map';
import Icon from '@sutpc/vue3-svg-icon';
interface Props {
  visible: boolean;
  timeType: string;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false
});
const emit = defineEmits(['close']);
// 列表分页
const pageObj = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
// 告警搜索
const inputWarn = ref();
const alarmTableData = ref([]);
const columnData = ref(columnDataFun());
// 警告默认筛选
const defaultAreaWarm = ref(['1', '2', '3']);
const defaultAreaWarmType = ref(['1', '2', '3']);
// 警告筛选
const alarmLevel = ref();
const alarmType = ref();
const aircityObj = inject('aircityObj');
// 告警搜索
const handleSearchWarn = () => {
  getTableAlarm();
};
// 警告级别筛选
const handleFilter = (value, data) => {
  const temp = data.checkedKeys;
  // 全部
  if (temp.includes('all')) {
    alarmLevel.value = [];
    getTableAlarm();
  } else {
    // 存在筛选
    alarmLevel.value = temp;
    getTableAlarm();
  }
};
// 警告类型筛选
const handleFilterType = (value, data) => {
  const temp = data.checkedKeys;
  // 全部
  if (temp.includes('all')) {
    alarmType.value = [];
    getTableAlarm();
  } else {
    // 存在筛选
    alarmType.value = temp;
    getTableAlarm();
  }
};
// 告警详情
const handleDetailWarn = (item) => {
  console.log('item', item);
  emit('close');
  // dialogTableVisible.value = false;
  // 展示站点
  toSingleStation(aircityObj?.value?.acApi, item.row);
};

const getTableAlarm = async () => {
  const params = {
    alarmLevel: alarmLevel.value,
    alarmType: alarmType.value,
    pageNum: pageObj.currentPage,
    pageSize: pageObj.pageSize,
    searchContent: inputWarn.value
  };
  const res = await alarmInfo(params);
  if (res.data && res.data.list) {
    alarmTableData.value = res.data.list;
    pageObj.total = res?.data?.total;
  } else {
    alarmTableData.value = [];
    pageObj.total = 0;
  }
};
const handPageChange = async (value, type) => {
  pageObj.currentPage = value;
  getTableAlarm();
};
const handleClosed = () => {
  emit('close');
};

onMounted(() => {
  getTableAlarm();
});
</script>
<style scoped>
.filter {
  cursor: pointer;
}
.detail {
  color: #4bdeff;
  text-decoration: none;
}
</style>
