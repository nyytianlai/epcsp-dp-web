<template>
  <custom-dialog v-model:visible="visible" :title="messageDialogTitle" @closed="$emit('close')">
    <template #titleSearch>
      <el-input
        v-model="inputWarnLeft"
        placeholder="请输入"
        class="search-input"
        @change="handleSearchWarnLeft"
      >
        <template #suffix>
          <icon :size="12" icon="svg-icon:search" />
        </template>
      </el-input>
    </template>
    <el-table
      :data="messageTableData"
      height="6.19rem"
      style="width: 100%"
      class="custom-dialog-table"
      @sort-change="handleSort"
      :default-sort="{ prop: 'cnt', order: 'descending' }"
    >
      <el-table-column
        v-for="(item, index) in messageColumnData"
        :key="index"
        v-bind="item"
        :show-overflow-tooltip="true"
        :formatter="tableColumnFun"
        :sortable="item.sortable"
        :sort-orders="item.sortOrders"
      ></el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageObj.pageSize"
      layout="prev, pager, next"
      :total="pageObj.total"
      :background="true"
      :current-page="pageObj.currentPage"
      @current-change="(value) => handPageChange(value)"
    />
  </custom-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, toRefs } from 'vue';
import { tableColumnFun } from '@/global/commonFun.js';
import { messageColumnKeyListFun } from '../config.js';
import { safetySupervisionAccumulated } from '../api.js';
import Icon from '@sutpc/vue3-svg-icon';
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  messageWarningType: {
    type: Number,
    default: 1
  }
});
const { visible, messageWarningType } = toRefs(props);
const messageDialogTitle = ref('运营商告警列表');
const inputWarnLeft = ref();
const messageTableData = ref([]);
const messageColumnData = ref(messageColumnKeyListFun());
// 排序
const sort = ref(0);
// 排序类型
const sortType = ref(2);
const pageObj = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
// table数据
const handPageChange = async (value) => {
  pageObj.currentPage = value;
  loadGetSafetySupervisionAccumulated();
};

// 左一详情搜索
const handleSearchWarnLeft = () => {
  loadGetSafetySupervisionAccumulated();
};
// 获取左一警告信息
const loadGetSafetySupervisionAccumulated = async () => {
  const data = await getSafetySupervisionAccumulated(
    messageWarningType.value,
    pageObj.currentPage,
    pageObj.pageSize,
    inputWarnLeft.value,
    sort.value,
    sortType.value
  );
  messageTableData.value = data?.dataList || [];
  pageObj.total = data?.totalData || 0;
};
const getSafetySupervisionAccumulated = async (
  type,
  pageOffset = 1,
  pageSize = 10000,
  input = null,
  sort = 0,
  sortType = 2
) => {
  const params = {
    type,
    pageOffset,
    pageSize,
    name: input,
    sort,
    sortType
  };
  let { data } = await safetySupervisionAccumulated(params);
  return data;
};
const init = () => {
  pageObj.currentPage = 1;
  messageDialogTitle.value = messageWarningType.value === 1 ? '运营商告警列表' : '充电站告警列表';
  messageColumnData.value = messageColumnKeyListFun(messageWarningType.value);
  loadGetSafetySupervisionAccumulated();
};
// 左一排序
const handleSort = (item) => {
  console.log('item', item);
  if (item.order) {
    // 存在排序
    const sortTypeNum = {
      ascending: 1,
      descending: 2
    };
    const sortIndex = {
      cnt: 0,
      unAffirmCnt: 1,
      affirmCnt: 2,
      recCnt: 3
    };
    sort.value = sortIndex[item.prop];
    sortType.value = sortTypeNum[item.order];
  } else {
    //不存在排序
    sort.value = 0;
    sortType.value = 2;
  }

  loadGetSafetySupervisionAccumulated();
};

onMounted(() => {
  init();
});
</script>
