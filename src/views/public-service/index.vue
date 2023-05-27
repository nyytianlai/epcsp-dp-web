<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 11:33:28
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-23 10:03:27
 * @FilePath: \epcsp-dp-web\src\views\public-service\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <page-num :data="pageNumData" />
  <panel>
    <div class="citizens-feedback">
      <title-column title="市民反馈情况" :showBtn="true" @handleClick="handleDetailClickDetail" />
      <div class="ec-box">
        <ec-resize :option="ecOption" />
      </div>

      <!-- <scroll-table :styleWrap="{ height: '3.88rem' }" :data="feedBackData" /> -->
    </div>
    <div class="hot-charging">
      <title-column
        title="热门充电站排名"
        :showBtn="true"
        @handleClick="handleDetailClick"
        :showTabBtn="true"
        :tabList="[
          { value: 'day', name: '日' },
          { value: 'month', name: '月' },
          { value: 'year', name: '年' }
        ]"
        @handleTabBtn="handleYearBtn"
      />
      <tabs :data="chargingStationTabs" @changeTab="(data) => handleChangeTabCharge(data)" />
      <rank-list
        :data="codeCharge === 1 ? chargePower : chargeTimes"
        :totalNum="codeCharge === 1 ? chargePowerTotal : chargeTimesTotal"
        height="3.88rem"
      />
    </div>
  </panel>
  <panel type="right">
    <div class="realtime-info">
      <title-column title="实时设备信息" />
      <div class="num-wrap">
        <template v-for="(item, index) in deviceData" :key="index">
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
      <tabs
        :data="chargingTypesTabs"
        @changeTab="(data) => handleChangeTab(data, 'charging-types')"
      />
      <pie-chart :data="chargingTypePieData" />
    </div>
    <div class="month-rate">
      <title-column title="行政区设备利用率情况" />
      <area-rank-list :data="monthRateData" :totalNum="totalMonthRateNum" height="3.74rem" />
    </div>
  </panel>
  <map-layer :ref="(el) => (mapLayerRef = el)" v-if="aircityObj"></map-layer>
  <custom-dialog v-model:visible="dialogTableVisibleHot" title="热门充电站排名">
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
        <template #default="scope"></template>
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
    <custom-dialog v-model:visible="dialogTableVisibleDetail" title="市民反馈情况列表">
    <template #titleSearch>
      <el-input
        v-model="inputDetail"
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
      height="6.34rem"
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
        <template #default="scope"></template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageObjDetail.pageSize"
      layout="prev, pager, next"
      :total="pageObjDetail.total"
      :background="true"
      :current-page="pageObjDetail.currentPage"
      @current-change="handPageChangeDetail"
    />
  </custom-dialog>
</template>
<script setup>
import Icon from '@sutpc/vue3-svg-icon';
import { ref, onMounted,reactive,inject,watch,nextTick } from 'vue';
import ScrollTable from './components/scroll-table.vue'
import MapLayer from './components/map-layer.vue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import EcResize from '@sutpc/vue3-ec-resize';
import { tableColumnFun } from '@/global/commonFun.js';
import {
  hotCharging,
  monthRate,
  personFeedback,
  selectChargeEquipmentStatistics,
  overTotalCount,
  getChargeStatus,
  stationRankingDetail,
  feedbackDetail
} from './api.js'
import {
  pageNumFun,
  chargingStationTabsFun,
  hotChargingDataFun,
  deviceDataFun,
  chargingTypesTabsFun,
  chargingTypePieDataFun,
  monthRateDataFun,
  columnDataHotFun,
  filters,
  ecOptionFun,
  filtersDetail,
  columnDataDetailFun
} from './config.js'
const storeVisible = useVisibleComponentStore();
const aircityObj = inject('aircityObj')
let mapLayerRef = ref(null);
const mapData = ref([])
// 热门弹窗
const dialogTableVisibleHot = ref(false)
const  inputHot = ref()
const hotTableData = ref([])
const columnDataHot = ref(columnDataHotFun());
const ecOption = ref(ecOptionFun())
// 默认区
const defaultDetail = ref(['有车站位', '桩位不放开', '无法充电', '找不到电桩', '其他']);
// 默认区
const defaultArea = ref([
  440303, 440304, 440305, 440306, 440307, 440308, 440309, 440310, 440311, 440343, 441521
]);
// 充电设施列表分页
const pageObj = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
// 年月日
const timeType = ref('day')
// 市民弹窗
const dialogTableVisibleDetail = ref(false)
const inputDetail = ref()
const detailTableData = ref([])
const columnDataDetail = ref(columnDataDetailFun())
const detailList = ref([]);
// 市民分页
const pageObjDetail = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
// 充电tab
const chargingStationTabs = ref(chargingStationTabsFun())
// 排序
const sort = ref('power');
// 排序类型
const sortType = ref('desc');
// 头部累计数据
const pageNumData = ref(pageNumFun());
// 实时设备信息
const deviceData = ref(deviceDataFun())
const chargingTypesTabs = ref(chargingTypesTabsFun())
const chargingTypePieData = ref(chargingTypePieDataFun());
// 本月利用率情况
const monthRateData = ref([])
const totalMonthRateNum = ref(0)

const feedBackData = ref([])
// 区域数据
const areaList = ref([]);
// 总览上面4个指标
const getOverTotalCount = async () => {
  const res = await overTotalCount();
  pageNumData.value = pageNumFun(res.data);
};
// 充电功率
const chargePower= ref([])
// 充电次数
const chargeTimes = ref([])
// 充电功率总量
const chargePowerTotal= ref(0)
// 充电次数总量
const chargeTimesTotal = ref(0)
// 充电tab
const codeCharge = ref(1)

// 获取热门列表
const loadStationRankingDetail =async()=>{
  const res = await stationRankingDetail({
    area:areaList.value,
    pageNum: pageObj.currentPage,
    pageSize: pageObj.pageSize,
    sortField: sort.value,
    sort: sortType.value,
    timeType:timeType.value,
    searchContent: inputHot.value
  })
  hotTableData.value = res.data.list
  pageObj.total = res.data.total
  console.log('res',res)
}
// 获取市民列表
const loadFeedbackDetail = async()=>{
  const res = await feedbackDetail({
    pageNum: pageObjDetail.currentPage,
    pageSize: pageObjDetail.pageSize,
    problemType: detailList.value,
    searchContent: inputDetail.value
  })
  detailTableData.value = res.data?.list
  pageObjDetail.total = res.data?.total
  console.log('rrrrrr',res)
}
// 热门充电站TOP10
const getHotCharging = async () => {
  const res = await hotCharging({timeType:timeType.value,
    sort: 'desc',
  sortField: codeCharge.value===1?'power':'amount',})
  if (res?.data) {
    chargePower.value = res?.data.map(item => {
      return {
        num: item.power,
        unit: 'KW',
        name: item.name
      }
    })
    chargePowerTotal.value = chargePower.value[0].num
    chargeTimes.value = res?.data.map(item => {
      return {
        num: item.amount,
        unit: '次',
        name: item.name
      }
    })
    chargeTimesTotal.value = chargeTimes.value[0].num

  } else {
    chargePower.value = []
    chargeTimes.value = []
  }
}
// 右下-本月日均利用率
const getMonthRate = async () => {
  const res = await monthRate()
  if (res?.data && res?.data?.data) {
    mapData.value = res?.data?.data
    monthRateData.value = res?.data?.data.map(item => {
      return {
        num: item.useRatio,
        unit: '%',
        name: item.area_name
      }
    })
    totalMonthRateNum.value = res?.data?.data[0].useRatio
  } else {
    monthRateData.value = []
    totalMonthRateNum.value = 0
  }
}
const getChargeEquipmentStatistics = async () => {
  const res = await selectChargeEquipmentStatistics()
  deviceData.value = deviceDataFun(res.data)
}
// 实时设备信息饼图
const getChargeStatusData = async(type) => {
  const res = await getChargeStatus(type)
  chargingTypePieData.value = chargingTypePieDataFun(type,res?.data?.data)
  
}
const handleChangeTab = (data, type) => {
  if (type === 'charging-types') {
    //实时设备信息
    getChargeStatusData(data.code)
  } 
};
const getPersonFeedback = async() => {
  const res = await personFeedback()
  feedBackData.value = res?.data || []
  const data = feedBackData.value.map(i=>i.amount)
   const axis = feedBackData.value.map(i=>i.name)
  ecOption.value = ecOptionFun(data,axis)
}
// 左一tab切换
const handleChangeTabCharge = (data)=>{
  codeCharge.value = data.code
  getHotCharging()
}
// 左一年月日切换
const handleYearBtn =(item)=>{
  console.log('item',item)
  timeType.value = item.value
  getHotCharging()

}
// 热门搜索
const handleSearchHot = ()=>{
  loadStationRankingDetail()
}


// 热门筛选
const handleFilter = (value, data) => {
  const temp = data.checkedKeys;
  // 全部
  if (temp.includes(1)) {
    areaList.value = [];
    loadStationRankingDetail()
  } else {
    // 存在筛选
    areaList.value = temp;
    loadStationRankingDetail()
  }
};
// 热门table数据
const handPageChange = (value) => {
  pageObj.currentPage = value;
  loadStationRankingDetail()
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
      amount: 'amount',
    };
    sort.value = sortIndex[item.prop];
    sortType.value = sortTypeNum[item.order];
  } else {
    //不存在排序
    sort.value = null;
    sortType.value = null;
  }

  loadStationRankingDetail()
};
//热门详情
const handleDetailClick = ()=>{
  dialogTableVisibleHot.value = true
}
// 点击详情
const handleDetailHot = (item) => {
  console.log('item', item);
  // 关闭弹窗
  dialogTableVisibleHot.value = false;
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
// 打开市民反馈问题详情
const handleDetailClickDetail = ()=>{
  dialogTableVisibleDetail.value = true
}
// 市民搜索
const handleSearchDetail = ()=>{
  // 接口
  loadFeedbackDetail()
}
// 市民筛选
const handleFilterDetail = (value, data)=>{
  const temp = data.checkedKeys;
  // 全部
  if (temp.includes('all')) {
    detailList.value = [];
    loadFeedbackDetail()
  } else {
    // 存在筛选
    detailList.value = temp;
   loadFeedbackDetail()
  }
}
// 市民分页
const handPageChangeDetail = (value)=>{
  pageObjDetail.currentPage = value;
  loadFeedbackDetail()
}
onMounted(() => {
  getOverTotalCount()
  getHotCharging()
  getMonthRate()
  getPersonFeedback()
  getChargeEquipmentStatistics()
  getChargeStatusData('pile')
  loadStationRankingDetail()
  loadFeedbackDetail()
})

watch([aircityObj,mapData],async()=>{
  await nextTick()
  mapLayerRef.value?.sendBarData(mapData.value)
})

</script>

<style lang="less" scoped>
.hot-charging {
  .rank-list-wrap {
    margin-top: 16px;
  }
  .tabs {
    margin-top: 10px;
  }
}
.citizens-feedback {
  margin-top: 20px;
  .el-table {
    margin-top: 11px;
  }
}
.realtime-info {
  .num-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
    :deep(.num-card) {
      width: 49%;
      padding: 24px 0 11px;
      background: linear-gradient(
        258.38deg,
        rgba(37, 177, 255, 0.1) 2.46%,
        rgba(37, 177, 255, 0) 100%
      );
      mix-blend-mode: normal;
      box-shadow: inset 0px 0px 35px rgba(41, 76, 179, 0.2);
      filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.04));
      border-radius: 2px;
      justify-content: center;
      .info {
        flex-direction: column;
        .name {
          margin-bottom: 0;
        }
      }
    }
  }
  .tabs {
    margin-top: 14px;
  }
  :deep(.pie-wrap) {
    margin-top: 18px;
    .pie-chart-wrap {
      min-width: 218px;
      max-width: 218px;
      height: 218px;
    }
  }
}
.month-rate {
  margin-top: 20px;
  .area-rank-wrap {
    margin-top: 23px;
  }
}
.filter {
  cursor: pointer;
}
.detail {
  color: #4bdeff;
  text-decoration: none;
}
.ec-box {
  height: 288px;
  width: 100%;
}
</style>