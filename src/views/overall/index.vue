<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 12:55:20
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-05 09:45:33
 * @FilePath: \epcsp-dp-web\src\views\overall\overview\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <page-num :data="pageNumData" />
  <panel>
    <div class="total-charging-facilities">
      <title-column title="充电设施总量" />
      <div class="num-wrap">
        <template v-for="(item, index) in cardData" :key="index">
          <num-card :data="item" classStyleType="bottomDown" />
        </template>
      </div>
    </div>
    <div class="pile-charger">
      <div class="pile-charger-header">
        <tabs
          :data="curBtn === 1 ? chargingStationTabs : chargingStationGunTabs"
          @changeTab="(data) => handleChangeTab(data, 'charger')"
        />
        <div class="right-tab-btn">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            class="tab-btn"
            :class="{ active: curBtn === item.value }"
            @click="handleTabBtn(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="num-wrap">
        <template v-for="(item, index) in pileChargerData" :key="index">
          <num-card :data="item" type="left-right" classStyleType="leftRightStyle1" />
        </template>
      </div>
    </div>
    <div class="operating-company">
      <title-column title="运营企业排名" :showBtn="true" @handleClick="handleDetailClick" />
      <tabs :data="operatingTabsData" @changeTab="(data) => handleChangeTab(data, 'operating')" />
      <rank-list :data="projectList" :totalNum="projectTotalNum" height="2.76rem" />
    </div>
  </panel>
  <panel type="right">
    <div class="today-num-info">
      <title-column title="今日充电设施数据信息" />
      <tabs :data="todayTabs" @changeTab="(data) => handleChangeTab(data, 'today')" />
      <div class="num-wrap">
        <template v-for="(item, index) in todayInfoNumData" :key="index">
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
    </div>
    <div class="today-power-info">
      <title-column title="今日充电功率信息" />
      <div class="num-wrap">
        <template v-for="(item, index) in powerInfoNumData" :key="index">
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
      <line-time-chart :data="lineTimeData" unit="KW" :colors="['green', 'blue']" />
    </div>
    <div class="today-warning-message">
      <title-column title="今日告警信息" :showBtn="true" @handleClick="handleClick" />
      <warning-tabs
        :data="warningTabsData"
        @changeTab="(data) => handleChangeTab(data, 'warning')"
      />
      <warning-list :data="warningListData" />
    </div>
  </panel>
  <bottom-menu-tabs :data="bottomTabsData" @changeTab="changeButtomTab" />
  <map-layer :ref="(el) => (mapLayerRef = el)" v-if="aircityObj"></map-layer>
  <custom-dialog v-model:visible="dialogTableVisible" title="告警列表">
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
        <template #default="scope"></template>
      </el-table-column>
      <el-table-column label="操作" key="operation" minWidth="2">
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
  <custom-dialog v-model:visible="dialogRankVisible" title="运营企业排名列表">
    <template #titleSearch>
      <el-input
        v-model="inputRank"
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
      :data="rankTableData"
      height="6.34rem"
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
      >
        <template #default="scope"></template>
      </el-table-column>
      <el-table-column label="操作" key="operation" minWidth="1">
        <template #default="scope">
          <a href="javascript:;" class="detail" @click="handleDetail(scope)">详情</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageObjRank.pageSize"
      layout="prev, pager, next"
      :total="pageObjRank.total"
      :background="true"
      :current-page="pageObjRank.currentPage"
      @current-change="handPageChangeRank"
    />
  </custom-dialog>
  <RankDetail v-model="rankDetailVisible" ref="rankDetail" @goDetail="handleGoDetail"></RankDetail>
</template>
<script setup>
import Icon from '@sutpc/vue3-svg-icon';

import { onMounted, ref, reactive, inject, watch, provide, nextTick } from 'vue';
import MapLayer from './components/map-layer.vue';
import PageNum from '@/components/page-num/index.vue';
import Panel from '@/components//panel/index.vue';
import { tableColumnFun } from '@/global/commonFun.js';
import RankDetail from './components/rank-detail.vue';
import {
  overTotalCount,
  totalFacilities,
  totalEquipment,
  stationOpeTop10,
  dayEquInfo,
  dayPower,
  alarmInfo,
  timePowerGraph,
  alarmCount,
  operatorInfoList
} from './api.js';
import {
  pageNumFun,
  cdsszlFun,
  pileChargerFun,
  operatingTabsFun,
  projectListFun,
  todayTabsFun,
  todayInfoNumDataFun,
  powerInfoNumDataFun,
  lineTimeDataFun,
  warningTabsDataFun,
  warningListFun,
  bottomTabDataFun,
  columnDataFun,
  columnDataRankFun,
  chargingStationTabsFun,
  chargingStationGunTabsFun,
  filtersAlarmLevelName,
  filtersAlarmTypeName
} from './config.js';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { toSingleStation } from '@/global/config/map';

// 左二图的tab
const curBtn = ref(1);
const storeVisible = useVisibleComponentStore();
const tabList = ref([
  { value: 1, name: '桩', index: 'pile' },
  { value: 2, name: '枪', index: 'gun' }
]);
const aircityObj = inject('aircityObj');
let mapLayerRef = ref(null);
const rankDetail = ref();
// 充电类型
const chargingStationTabs = ref(chargingStationTabsFun());
const chargingStationGunTabs = ref(chargingStationGunTabsFun());
const totalChargerIndex = ref(1);
const chargingType = ref('speed');
const typeCharge = ref('pile');
// 头部累计数据
const pageNumData = ref(pageNumFun());
//充电设施总量数据
const cardData = ref(cdsszlFun());
// 切换充电桩总量和充电枪总量数据
const pileChargerData = ref(pileChargerFun());
// 运营企业全年TOP10类型切换tab
const operatingTabsData = ref(operatingTabsFun());
// 运营企业全年TOP10类型运营企业数据
const projectList = ref([]);
const projectTotalNum = ref(0);
// 今日充电设施数据信息tab
const todayTabs = ref(todayTabsFun());
const todayInfoNumData = ref(todayInfoNumDataFun());
// 充电功率
const powerInfoNumData = ref(powerInfoNumDataFun());
// 充电功率折线
const lineTimeData = ref(lineTimeDataFun());
// 今日告警信息tabData
const warningTabsData = ref(warningTabsDataFun());
const warningListData = ref([]);
//底部button
const bottomTabsData = ref(bottomTabDataFun());
const dialogTableVisible = ref(false);
// 弹窗列名
const columnData = ref(columnDataFun());
const alarmTableData = ref([]);
const pageObj = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
// 警告默认筛选
const defaultAreaWarm = ref(['1', '2', '3']);
const defaultAreaWarmType = ref(['1', '2', '3']);
// 运营商数据
const rankTableData = ref([]);
// 运营企业排名弹窗显示标识
const dialogRankVisible = ref(false);
// 运营企业排名搜索
const inputRank = ref();
// 运营商分页
const pageObjRank = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
// 运营商排序
const sortRank = ref('station');
// 排序类型
const sortTypeRank = ref('desc');
// 详情弹窗
const rankDetailVisible = ref(false);
// 告警搜索
const inputWarn = ref();
// 运营商id和name
const operatorId = ref();
const operatorName = ref();
provide('operatorId', operatorId);
provide('operatorName', operatorName);
// 警告筛选
const alarmLevel = ref();
const alarmType = ref();
// 弹窗列名
const columnDataRank = ref(columnDataRankFun());
const handleChangeTab = (data, type) => {
  if (type === 'charger') {
    //切换充电桩总量和充电枪总量
    console.log('data', data);
    totalChargerIndex.value = data.code;
    chargingType.value = data.chargingType;
    typeCharge.value = data.typeCharge;
    getTotalEquipment();
  } else if (type === 'operating') {
    // 切换运营企业全年TOP10类型
    getStationOpeTop10(data.code);
  } else if (type === 'today') {
    // 今日充电设施数据信息tab切换
    getDayEquInfo(data.code);
  } else if (type === 'warning') {
    getAlarmInfo([data.code]);
  }
};

const changeButtomTab = (item) => {
  console.log('底部切换', item);
  let value = item.code === 1 ? true : false;
  mapLayerRef.value.setRectBarVisibility(value);
  mapLayerRef.value.setHeatMapVisibility(!value);
};
const handleClick = () => {
  console.log('handleClick');
  dialogTableVisible.value = true;
};
// 总览上面4个指标
const getOverTotalCount = async () => {
  const res = await overTotalCount();
  pageNumData.value = pageNumFun(res.data);
};
//充电设施总量
const getTotalFacilities = async () => {
  const res = await totalFacilities();
  cardData.value = cdsszlFun(res.data);
};
//充电桩总量：pile，充电枪总量：gun
const getTotalEquipment = async () => {
  const res = await totalEquipment({ chargingType: chargingType.value, type: typeCharge.value });
  pileChargerData.value = pileChargerFun(totalChargerIndex.value, res?.data, curBtn.value);
};

//运营企业年度TOP10-充电桩:pile,充电枪:gun,充电站:station
const getStationOpeTop10 = async (type) => {
  const res = await stationOpeTop10(type);
  if (res?.data) {
    const data = res.data.map((item) => {
      return {
        num: item.amount,
        unit: '个',
        name: item.operatorName
      };
    });
    projectList.value = data;
    projectTotalNum.value = data[0].num || 0;
  } else {
    projectList.value = [];
    projectTotalNum.value = 0;
  }
};
// 获取运营企业信息
const loadOperatorInfoList = async () => {
  if (columnDataRank.value.findIndex((i) => i.type === 'index') === -1) {
    const temp = {
      type: 'index',
      label: '序号',
      index: (index) => (pageObjRank.currentPage - 1) * pageObjRank.pageSize + index + 1,
      minWidth: 1
    };
    columnDataRank.value.unshift(temp);
  }
  const obj = {
    operatorName: inputRank.value,
    pageNum: pageObjRank.currentPage,
    pageSize: pageObjRank.pageSize,
    sortField: sortRank.value,
    sort: sortTypeRank.value
  };
  const res = await operatorInfoList(obj);
  rankTableData.value = res.data.list;
  pageObjRank.total = res.data.total;
  console.log('res', res);
};
//今日-充电桩/充电枪信息
const getDayEquInfo = async (type) => {
  const res = await dayEquInfo(type);
  todayInfoNumData.value = todayInfoNumDataFun(res?.data);
};
//今日充电功率信息
const getDayPower = async () => {
  const res = await dayPower();
  powerInfoNumData.value = powerInfoNumDataFun(res.data);
};
//今日告警信息
const getAlarmInfo = async (level) => {
  const params = {
    alarmLevel: level,
    pageNum: 1,
    pageSize: 1000
  };
  const res = await alarmInfo(params);
  if (res.data && res.data.list) {
    warningListData.value = res.data.list.map((item) => {
      return {
        date: item.alarmTime,
        message: item.alarmDesc,
        area: item.stationName
      };
    });
  } else {
    warningListData.value = [];
  }
};
const getAlarmCount = async () => {
  const res = await alarmCount();
  warningTabsData.value = warningTabsDataFun(res.data);
};
//实时功率图表
const getTimePowerGraph = async () => {
  const res = await timePowerGraph();
  lineTimeData.value = lineTimeDataFun(res.data);
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
// table数据
const handPageChange = (value) => {
  pageObj.currentPage = value;
  getTableAlarm();
};
// 运营企业排名详情点击
const handleDetailClick = (item) => {
  dialogRankVisible.value = true;
};
// 运营商分页
const handPageChangeRank = (value) => {
  pageObjRank.currentPage = value;
  loadOperatorInfoList();
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
// 充电设施跳转详情
const handleGoDetail = (item) => {
  // 关闭弹窗
  dialogRankVisible.value = false;
  rankDetailVisible.value = false;
  // 展示站点
  storeVisible.changeShowComponent(false);
  storeVisible.changeShowDetail({
    show: true,
    params: {
      operatorId: operatorId.value,
      stationId: item.row.stationId,
      isHr: item.row.isHr
    }
  });
};

// 左二的右侧tab切换
const handleTabBtn = (item) => {
  console.log('item');
  curBtn.value = item.value;
  typeCharge.value = item.index;
  getTotalEquipment();
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

// 告警搜索
const handleSearchWarn = () => {
  getTableAlarm();
};
// 告警详情
const handleDetailWarn = (item) => {
  console.log('item', item);
  dialogTableVisible.value = false;
  // 展示站点
  toSingleStation(aircityObj.value?.acApi, item.row);
};
// 运营商排名搜索
const handleSearch = () => {
  loadOperatorInfoList();
};
onMounted(() => {
  getOverTotalCount();
  getTotalFacilities();
  getTotalEquipment('pile');
  getStationOpeTop10('station');
  getDayEquInfo('pile');
  getDayPower();
  getAlarmInfo(['1']);
  getTimePowerGraph();
  getAlarmCount();
  getTableAlarm();
  loadOperatorInfoList();
});
</script>
<style lang="less" scoped>
.total-charging-facilities {
  .num-wrap {
    display: flex;
    justify-content: space-between;
    height: 160px;
    padding: 0 22px;
    margin-top: 16px;
    background: linear-gradient(
      255.75deg,
      rgba(37, 177, 255, 0.02) 23.33%,
      rgba(37, 177, 255, 0.2) 100%
    );
    mix-blend-mode: normal;
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(41, 76, 179, 0.2);
    border-radius: 4px;
  }
}
.pile-charger {
  margin-top: 16px;
  .num-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;
    .num-card {
      margin-bottom: 20px;
      &:nth-last-of-type(1),
      &:nth-last-of-type(2) {
        margin-bottom: 0;
      }
    }
  }
}
.operating-company {
  margin-top: 23px;
  .tabs {
    margin-top: 16px;
  }
  .rank-list-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
.today-num-info {
  .tabs {
    margin-top: 8px;
  }
  .num-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
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
}
.today-power-info {
  margin-top: 24px;
  .num-wrap {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    :deep(.num-card) {
      padding: 20px 0;
      width: 49%;
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
        .value {
          font-size: 28px !important;
        }
        .name {
          margin-bottom: 0;
        }
      }
      .icon {
        width: 54px !important;
        height: 54px !important;
      }
    }
  }
  .ec-wrap {
    margin-top: 22px;
  }
}
.today-warning-message {
  margin-top: 21px;
  .warning-tabs {
    margin-top: 12px;
  }
  .warning-list {
    margin-top: 18px;
    :deep(.warning-info) {
      .message {
        min-width: 2rem;
        max-width: 2rem;
      }
      .area {
        min-width: 0.8rem;
        max-width: 0.8rem;
      }
    }
  }
}
.detail {
  color: #4bdeff;
  text-decoration: none;
}
.right-tab-btn {
  display: flex;
  background: rgba(21, 69, 105, 0.5);
  border: 1px solid #486785;
  .tab-btn {
    width: 28px;
    height: 28px;
    font-size: 14px;
    line-height: 28px;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    border-left: 1px solid #486785;
    &:nth-of-type(1) {
      border: none;
    }
  }
}
.active {
  background: rgba(84, 181, 255, 0.8);
  color: #ffffff;
}
.pile-charger-header {
  display: flex;
  justify-content: space-between;
}
.filter {
  cursor: pointer;
}
</style>
