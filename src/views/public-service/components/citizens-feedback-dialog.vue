<template>
  <custom-dialog title="市民反馈情况列表" v-model:visible="props.visible" @closed="handleClosed">
    <template #titleSearch>
      <el-input
        v-model.trim="inputDetail"
        placeholder="请输入"
        class="search-input"
        @change="handleSearchDetail"
      >
        <template #suffix>
          <icon :size="12" icon="svg-icon:search" />
        </template>
      </el-input>
    </template>
    <el-table
      :data="detailTableData"
      :height="tableHeight"
      style="width: 100%"
      class="custom-dialog-table"
    >
      <el-table-column
        v-for="(item, index) in columnDataDetail"
        :key="index"
        v-bind="item"
        :show-overflow-tooltip="true"
        :formatter="tableColumnFun"
      >
        <template #header v-if="item.prop === 'problemType'">
          <div class="problemType">
            {{ item.label }}
            <el-popover placement="bottom" trigger="click">
              <template #reference>
                <icon :size="12" icon="svg-icon:filter" class="filter" />
              </template>
              <div class="checkbox">
                <el-tree
                  :data="filtersDetail"
                  show-checkbox
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                  @check="handleFilterDetail"
                  class="table-filter"
                  :indent="0.00001"
                  :default-checked-keys="defaultDetail"
                />
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageObj.pageSize"
      layout="prev, pager, next"
      :total="pageObj.total"
      :background="true"
      :current-page="pageObj.currentPage"
      @current-change="handPageChangeDetail"
    />
  </custom-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from 'vue';
import { filtersDetail, columnDataDetailFun } from '../config.js';
import { feedbackDetail } from '../api.js';
import { tableColumnFun } from '@/global/commonFun.js';
import Icon from '@sutpc/vue3-svg-icon';
import config from '@sutpc/config';

interface Props {
  visible: boolean;
  timeType: string;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  timeType: 'day'
});
const emit = defineEmits(['close']);

const inputDetail = ref();
const detailTableData = ref([]);
const columnDataDetail = ref(columnDataDetailFun());
const detailList = ref([]);
const defaultDetail = ref(['有车站位', '桩位不放开', '无法充电', '找不到电桩', '其他']);
// 市民分页
const pageObj = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});

const tableHeight = computed(() => {
  return 600 * config.sizeScale + 'px';
});
// 获取市民列表
const loadFeedbackDetail = async () => {
  // 在第一次请求的时候，生成序号
  if (columnDataDetail.value.findIndex((i) => i.type === 'index') === -1) {
    const temp = {
      type: 'index',
      label: '序号',
      index: (index) => (pageObj.currentPage - 1) * pageObj.pageSize + index + 1,
      minWidth: 1
    };
    columnDataDetail.value.unshift(temp);
  }
  const res = await feedbackDetail({
    pageNum: pageObj.currentPage,
    pageSize: pageObj.pageSize,
    problemType: detailList.value,
    searchContent: inputDetail.value
  });
  detailTableData.value = res.data?.list;
  pageObj.total = res.data?.total;
  console.log('rrrrrr', res);
};
// 市民搜索
const handleSearchDetail = () => {
  // 接口
  loadFeedbackDetail();
};
// 市民筛选
const handleFilterDetail = (value, data) => {
  const temp = data.checkedKeys;
  // 全部
  if (temp.includes('all')) {
    detailList.value = [];
    loadFeedbackDetail();
  } else {
    // 存在筛选
    detailList.value = temp;
    loadFeedbackDetail();
  }
};
// 市民分页
const handPageChangeDetail = (value) => {
  pageObj.currentPage = value;
  loadFeedbackDetail();
};
const handleClosed = () => {
  emit('close');
};

onMounted(() => {
  loadFeedbackDetail();
});
</script>

<style scoped>
.filter {
  cursor: pointer;
}
</style>
