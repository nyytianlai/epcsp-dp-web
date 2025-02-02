<template>
  <!-- yyqypmlb: '运营企业排名列表'  -->
  <custom-dialog :title="t(`${tHead}.yyqypmlb`)" v-model:visible="props.visible" @closed="handleClosed">
    <template #titleSearch>
      <!-- qsr: '请输入' -->
      <el-input
        v-model.trim="inputRank"
        :placeholder="t(`${tHead}.qsr`)"
        class="search-input"
        @change="handleSearch"
      >
        <template #suffix>
          <icon :size="12" icon="svg-icon:search" />
        </template>
      </el-input>
    </template>
    <el-table
      :data="rankTableData"
      :height="tableHeight"
      style="width: 100%"
      class="custom-dialog-table"
      @sort-change="handleSort"
      :default-sort="{ prop: 'stationNumber', order: 'descending' }"
    >
      <el-table-column
        v-for="(item, index) in columnDataRank"
        :key="index"
        v-bind="item"
        :show-overflow-tooltip="true"
        :formatter="tableColumnFun"
        :sortable="item.sortable"
        :sort-orders="item.sortOrders"
      ></el-table-column>
      <!-- cz: '操作' -->
      <el-table-column :label="t(`${tHead}.cz`)" key="operation" minWidth="1">
        <template #default="scope">
          <!-- xq: '详情' -->
          <a href="javascript:;" class="detail" @click="handleDetail(scope)">{{t(`${tHead}.xq`)}}</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageObj.pageSize"
      layout="prev, pager, next"
      :total="pageObj.total"
      :background="true"
      :current-page="pageObj.currentPage"
      @current-change="handPageChangeRank"
    />
    <rank-detail v-model="rankDetailVisible" ref="rankDetail" @goDetail="handleGoDetail" />
  </custom-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted, provide, nextTick, inject } from 'vue';
import { operatorInfoList } from '../api.js';
import { columnDataRankFun } from '../config.js';
import { tableColumnFun } from '@/global/commonFun.js';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import Icon from '@sutpc/vue3-svg-icon';
import RankDetail from './rank-detail.vue';
import { toSingleStation } from '@/global/config/map';
import config from '@sutpc/config';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `charging-station.enterprise-rank-list-dialog`;

interface Props {
  visible: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false
});
const emit = defineEmits(['close']);
const aircityObj = inject('aircityObj');

// 详情弹窗
const rankDetailVisible = ref(false);
const rankDetail = ref();
// 运营企业排名搜索
const inputRank = ref('');
// 运营商数据
const rankTableData = ref([]);
// 弹窗列名
const columnDataRank = ref(columnDataRankFun());
// 运营商排序
const sortRank = ref('station');
// 排序类型
const sortTypeRank = ref('desc');
// 运营商id和name
const operatorId = ref();
const operatorName = ref();
const storeVisible = useVisibleComponentStore();
provide('operatorId', operatorId);
provide('operatorName', operatorName);
// 运营商分页
const pageObj = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
// 获取运营企业信息

const tableHeight = computed(() => {
  return 600 * config.sizeScale + 'px';
});

const loadOperatorInfoList = async () => {
  if (columnDataRank.value.findIndex((i) => i.type === 'index') === -1) {
    const temp = {
      type: 'index',
      label: t(`${tHead}.xh`) || '序号',
      index: (index) => (pageObj.currentPage - 1) * pageObj.pageSize + index + 1,
      minWidth: 1
    };
    columnDataRank.value.unshift(temp);
  }
  const obj = {
    operatorName: inputRank.value,
    pageNum: pageObj.currentPage,
    pageSize: pageObj.pageSize,
    sortField: sortRank.value,
    sortBy: sortTypeRank.value
  };
  const res = await operatorInfoList(obj);
  rankTableData.value = res.data.list;
  pageObj.total = res.data.total;
  // console.log('res', res);
};
// 运营商排序
const handleSort = (item) => {
  console.log('item', item);
  if (item.order) {
    // 存在排序
    const sortTypeNum = {
      ascending: 'asc',
      descending: 'desc'
    };
    const sortIndex = {
      pileNumber: 'pile',
      gunNumber: 'gun',
      stationNumber: 'station'
    };
    sortRank.value = sortIndex[item.prop];
    sortTypeRank.value = sortTypeNum[item.order];
  } else {
    sortRank.value = null;
    sortTypeRank.value = null;
  }
  loadOperatorInfoList();
};
// 点击详情
const handleDetail = (item) => {
  console.log('item', item);
  operatorId.value = item.row.operatorId;
  operatorName.value = item.row.operatorName;
  nextTick(() => {
    rankDetail.value.init();
    rankDetailVisible.value = true;
  });
};
// 运营商排名搜索
const handleSearch = () => {
  loadOperatorInfoList();
};
// 运营商分页
const handPageChangeRank = (value) => {
  pageObj.currentPage = value;
  loadOperatorInfoList();
};
// 充电设施跳转详情
const handleGoDetail = (item) => {
  // 关闭弹窗
  handleClosed();
  rankDetailVisible.value = false;
  // 展示站点
  storeVisible.changeShowComponent(false);
  storeVisible.changeShowDetail({
    show: true,
    params: {
      operatorId: operatorId.value,
      stationId: item.stationId,
      isHr: item.isHr
    }
  });
  aircityObj.value && toSingleStation(aircityObj.value?.acApi, item);
};
const handleClosed = () => {
  emit('close');
};
onMounted(() => {
  loadOperatorInfoList();
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
