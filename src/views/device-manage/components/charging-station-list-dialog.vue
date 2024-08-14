<template>
  <custom-dialog v-model:visible="visible" title="充电站设施列表" @close="handleClose">
    <template #titleSearch>
      <el-input
        v-model.trim="inputTotal"
        placeholder="请输入"
        class="search-input"
        @change="handleSearch"
      >
        <template #suffix>
          <icon :size="12" icon="svg-icon:search" />
        </template>
      </el-input>
    </template>
    <el-table
      :data="totalTableData"
      :height="tableHeight"
      style="width: 100%"
      class="custom-dialog-table"
      @sort-change="handleSort"
      :default-sort="{ prop: 'equipmentPower', order: 'descending' }"
    >
      <el-table-column
        v-for="(item, index) in columnData"
        :key="index"
        v-bind="item"
        :show-overflow-tooltip="true"
        :formatter="tableColumnFun"
        :sortable="item.sortable"
        :sort-orders="item.sortOrders"
      >
        <template #header v-if="item.prop === 'areaName'">
          <div class="areaName">
            {{ item.label }}
            <el-popover placement="bottom" trigger="click">
              <template #reference>
                <icon :size="12" icon="svg-icon:filter" class="filter" />
              </template>
              <div class="checkbox">
                <el-tree
                  :data="filters"
                  show-checkbox
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                  @check="handleFilter"
                  class="table-filter"
                  :indent="0.00001"
                  :default-checked-keys="defaultArea"
                />
              </div>
            </el-popover>
          </div>
        </template>
        <template #default="scope"></template>
      </el-table-column>
      <el-table-column label="操作" key="operation" minWidth="2">
        <template #default="scope">
          <a href="javascript:;" class="detail" @click="handleDetail(scope)">详情</a>
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
import { ref, reactive, inject, onMounted, toRefs, computed } from 'vue';
import { selectStationInfoByPage } from '../api.js';
import { columnDataFun, filters } from '../config.js';
import { tableColumnFun } from '@/global/commonFun.js';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { toSingleStation } from '@/global/config/map';
import Icon from '@sutpc/vue3-svg-icon';
import config from '@sutpc/config';

const emit = defineEmits(['close']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const tableHeight = computed(() => {
  return 600 * config.sizeScale + 'px';
});

const { visible } = toRefs(props);
const aircityObj = inject('aircityObj');
const storeVisible = useVisibleComponentStore();
// 默认区
const defaultArea = ref([
  440303, 440304, 440305, 440306, 440307, 440308, 440309, 440310, 440311, 440343, 441521
]);
// 充电设施总量搜索
const inputTotal = ref();
// 排序
const sort = ref(0);
// 排序类型
const sortType = ref(2);
// 区域数据
const areaList = ref([]);
// 弹窗列名
const columnData = ref(columnDataFun());
// 表格数据
const totalTableData = ref([]);
// 充电设施列表分页
const pageObj = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
// 获取充电站设施列表
const getSelectStationInfoByPage = async () => {
  // 在第一次请求的时候，生成序号
  if (columnData.value.findIndex((i) => i.type === 'index') === -1) {
    const temp = {
      type: 'index',
      label: '序号',
      index: (index) => (pageObj.currentPage - 1) * pageObj.pageSize + index + 1,
      minWidth: 1
    };
    columnData.value.unshift(temp);
  }

  const obj = {
    name: inputTotal.value,
    pageNum: pageObj.currentPage,
    pageSize: pageObj.pageSize,
    sort: sort.value,
    sortType: sortType.value,
    areaCodeList: areaList.value
  };
  const res = await selectStationInfoByPage(obj);
  totalTableData.value = res.data.dataList;
  pageObj.total = res.data.totalData;
};
// table数据
const handPageChange = (value) => {
  pageObj.currentPage = value;
  getSelectStationInfoByPage();
};
// 搜索
const handleSearch = () => {
  getSelectStationInfoByPage();
};

// 排序
const handleSort = (item) => {
  console.log('item', item);
  if (item.order) {
    // 存在排序
    const sortTypeNum = {
      ascending: 1,
      descending: 2
    };
    const sortIndex = {
      equipmentPower: 0,
      equipmentCount: 1,
      gunCount: 2
    };
    sort.value = sortIndex[item.prop];
    sortType.value = sortTypeNum[item.order];
  } else {
    //不存在排序
    sort.value = null;
    sortType.value = null;
  }

  getSelectStationInfoByPage();
};

// 筛选
const handleFilter = (value, data) => {
  const temp = data.checkedKeys;
  // 全部
  if (temp.includes(1)) {
    areaList.value = [];
    getSelectStationInfoByPage();
  } else {
    // 存在筛选
    areaList.value = temp;
    getSelectStationInfoByPage();
  }
};
const handleClose = () => {
  emit('close');
};
// 点击详情
const handleDetail = (item) => {
  console.log('item', item);
  handleClose();
  // 关闭弹窗
  // dialogTotalVisible.value = false;
  // 展示站点
  storeVisible.changeShowComponent(false);
  storeVisible.changeShowDetail({
    show: true,
    params: {
      operatorId: item.row.operatorId,
      stationId: item.row.stationId,
      isHr: item.row.isHr
    }
  });
  aircityObj.value && toSingleStation(aircityObj.value?.acApi, item.row);
};
onMounted(() => {
  getSelectStationInfoByPage();
});
</script>

<style lang="less" scoped>
.detail {
  color: #4bdeff;
  text-decoration: none;
}

.filter {
  cursor: pointer;
}
</style>
