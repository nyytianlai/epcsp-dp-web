<template>
  <custom-dialog title="热门充电站排名" v-model:visible="props.visible" @closed="handleClosed">
    <template #titleSearch>
      <el-input
        v-model="inputHot"
        placeholder="请输入"
        class="search-input"
        @change="handleSearchHot"
      >
        <template #suffix>
          <icon :size="12" icon="svg-icon:search" />
        </template>
      </el-input>
    </template>
    <el-table
      :data="hotTableData"
      height="6.34rem"
      style="width: 100%"
      class="custom-dialog-table"
      @sort-change="handleSort"
      :default-sort="{ prop: 'power', order: 'descending' }"
    >
      <el-table-column
        v-for="(item, index) in columnDataHot"
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
      </el-table-column>
      <el-table-column label="操作" key="operation" minWidth="2">
        <template #default="scope">
          <a href="javascript:;" class="detail" @click="handleDetailHot(scope)">详情</a>
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
import { ref, reactive, onMounted } from 'vue';
import { stationRankingDetail } from '../api.js';
import { columnDataHotFun, filters } from '../config.js';
import { tableColumnFun } from '@/global/commonFun.js';
import { useVisibleComponentStore } from '@/stores/visibleComponent';

import Icon from '@sutpc/vue3-svg-icon';
interface Props {
  visible: boolean;
  timeType: string;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  timeType: 'day'
});
const emit = defineEmits(['close']);
// 默认区
const defaultArea = ref([
  440303, 440304, 440305, 440306, 440307, 440308, 440309, 440310, 440311, 440343, 441521
]);
// 列表分页
const pageObj = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
// 排序
const sort = ref('power');
// 排序类型
const sortType = ref('desc');
const inputHot = ref('');
const hotTableData = ref([]);
const columnDataHot = ref(columnDataHotFun());
// 区域数据
const areaList = ref([]);
const storeVisible = useVisibleComponentStore();
// 热门搜索
const handleSearchHot = () => {
  loadStationRankingDetail();
};
// 获取热门列表
const loadStationRankingDetail = async () => {
  const res = await stationRankingDetail({
    area: areaList.value,
    pageNum: pageObj.currentPage,
    pageSize: pageObj.pageSize,
    sortField: sort.value,
    sort: sortType.value,
    timeType: props.timeType,
    searchContent: inputHot.value
  });
  hotTableData.value = res.data.list;
  pageObj.total = res.data.total;
  console.log('res', res);
};
// 排序
const handleSort = (item) => {
  console.log('item', item);
  if (item.order) {
    // 存在排序
    const sortTypeNum = {
      ascending: 'asc',
      descending: 'desc'
    };
    const sortIndex = {
      power: 'power',
      amount: 'amount'
    };
    sort.value = sortIndex[item.prop];
    sortType.value = sortTypeNum[item.order];
  } else {
    //不存在排序
    sort.value = null;
    sortType.value = null;
  }

  loadStationRankingDetail();
};

// 点击详情
const handleDetailHot = (item) => {
  console.log('item', item);
  // 关闭弹窗
  // dialogTableVisibleHot.value = false;
  emit('close');
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
};
// 热门筛选
const handleFilter = (value, data) => {
  const temp = data.checkedKeys;
  // 全部
  if (temp.includes(1)) {
    areaList.value = [];
    loadStationRankingDetail();
  } else {
    // 存在筛选
    areaList.value = temp;
    loadStationRankingDetail();
  }
};
// 热门table数据
const handPageChange = (value) => {
  pageObj.currentPage = value;
  loadStationRankingDetail();
};

const handleClosed = () => {
  emit('close');
};

onMounted(() => {
  loadStationRankingDetail();
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
