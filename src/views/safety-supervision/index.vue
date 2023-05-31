<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 09:12:44
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-11 15:34:52
 * @FilePath: \epcsp-dp-web\src\views\safety-supervision\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <page-num :data="pageNumData" bgcType="red-bgc" />
  <panel>
    <div class="total-warning-num">
      <title-column title="累计告警数据信息" />
      <tabs
        :data="totalWarningTabs"
        @changeTab="(data) => handleChangeTab(data, 'total-warning')"
        v-model="messageWarningType"
      >
        <button-base @handleClick="handleClickMessageBtn">查看更多</button-base>
      </tabs>
      <scroll-table :scrollTableData="scrollTableData" :columnKeyList="columnKeyList" />
    </div>
    <div class="area-warning-num">
      <title-column
        title="行政区告警数据情况"
        :showTabBtn="true"
        :tabList="[
          { value: 1, name: '日' },
          { value: 2, name: '月' },
          { value: 3, name: '年' }
        ]"
        @handleTabBtn="handleWarmYearBtn"
      />
      <area-rank-list :data="areaRankData" :totalNum="areaTotalNum" height="3.7rem" />
    </div>
  </panel>
  <panel type="right">
    <div class="warning-monitor">
      <title-column
        title="今日设备告警监控"
        :showBtn="true"
        btnText="告警列表"
        @handleClick="handleClick"
      />
      <tabs
        :data="warningMonitorTabs"
        @changeTab="(data) => handleChangeTab(data, 'warning-monitor')"
      />
      <pie-chart
        :data="warningMonitorPieData"
        :mode="totalCurCode === 1 ? 'canChoose' : 'default'"
        @choose="handleChoose"
        :colors="['#E10105', '#DD6701', '#FAF102']"
      />
    </div>
    <div class="realtime-state">
      <title-column title="实时状态情况" />
      <tabs
        :data="realtimeStateTabs"
        @changeTab="(data) => handleChangeTab(data, 'realtime-state')"
      />
      <div class="num-wrap">
        <template v-for="(item, index) in realtimeStateData" :key="index">
          <num-card
            :data="item"
            @click="handleBall(item)"
            :class="{ 'ball-active': nowStatus === 3 && item.isChoose, cursor: nowStatus === 3 }"
          />
        </template>
      </div>
    </div>
    <div class="realtime-trend">
      <title-column
        title="实时告警趋势情况"
        :showTabBtn="true"
        :tabList="[
          { value: 1, name: '日' },
          { value: 2, name: '周' },
          { value: 3, name: '月' }
        ]"
        @handleTabBtn="handleYearBtn"
      />
      <line-time-chart
        :data="realtimeTrend"
        :chartStyle="{ height: '2.55rem' }"
        :colors="['#FF6B4B']"
        :mode="true"
      />
    </div>
  </panel>
  <bottom-menu-tabs :data="bottomTabsData" @changeTab="changeButtomTab" :activeValue="bottomCode" />
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
  <custom-dialog
    v-model:visible="dialogTableMessageVisible"
    :title="messageDialogTitle"
    @closed="
      () => {
        inputWarnLeft = null;
      }
    "
  >
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
      height="6.34rem"
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
      @current-change="(value) => handPageChange(value, 'total-message')"
    />
  </custom-dialog>
</template>
<script setup>
import Icon from '@sutpc/vue3-svg-icon';
import { ref, onMounted, reactive, inject } from 'vue';
import ScrollTable from './components/scroll-table.vue';
import MapLayer from './components/map-layer.vue';
import dayjs from 'dayjs';
import { tableColumnFun } from '@/global/commonFun.js';
import {
  pageNumFun,
  totalWarningTabsFun,
  areaRankDataFun,
  warningMonitorTabsFun,
  warningMonitorPieDataFun,
  realtimeStateTabsFun,
  realtimeStateDataFun,
  realtimeTrendFun,
  bottomTabDataFun,
  columnDataFun,
  columnKeyListFun,
  messageColumnKeyListFun,
  filtersAlarmLevelName,
  filtersAlarmTypeName
} from './config.js';
import {
  getAlarmUpStatics,
  safetySupervisionAccumulated,
  districtAlarmStatics,
  alarmLevelAndTypeByTime,
  alarmLevelAndTypeByTIme,
  getOnlineStatus,
  alarmInfo
} from './api.js';
import { dataType } from 'element-plus/es/components/table-v2/src/common';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { toSingleStation } from '@/global/config/map';

const storeVisible = useVisibleComponentStore();

const aircityObj = inject('aircityObj');
let mapLayerRef = ref(null);
const dialogTableVisible = ref(false);
const columnData = ref(columnDataFun());
const alarmTableData = ref([]);
const pageObj = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
// 左一搜索
const inputWarnLeft = ref();
// 警告筛选
const alarmLevel = ref();
const alarmType = ref();
// 告警级别tab高亮
const totalCurCode = ref(1);
// 累计告警数据信息弹窗显隐
const dialogTableMessageVisible = ref(false);
const messageDialogTitle = ref('运营商告警列表');
const messageColumnData = ref(messageColumnKeyListFun());
const messageTableData = ref([]);
const messageWarningType = ref(1);
// 告警趋势
const dayTypeAlarm = ref(1);
// 警告默认筛选
const defaultAreaWarm = ref(['1', '2', '3']);
const defaultAreaWarmType = ref(['1', '2', '3']);
// 左侧球的数据
const realtimeState = ref([]);
// 底部icon的code
const bottomCode = ref(1);
//地图底部tab切换
const changeButtomTab = (item) => {
  bottomCode.value = item.code;
  console.log('底部切换', item);
  mapLayerRef.value.buttomTabChange(item.code);
  warningMonitorPieData.value.forEach((i) => {
    // 切换底部icon饼图全部高亮
    i.isChoose = item.code === 1;
  });
  // 切换为充电站状态则全部高亮
  realtimeStateData.value.forEach((i) => {
    i.isChoose = item.code === 2;
  });
};
// 排序
const sort = ref(0);
// 排序类型
const sortType = ref(2);
// 充电桩实时按钮
const nowStatus = ref(3);
// 告警搜索
const inputWarn = ref();
// 头部累计数据
const pageNumData = ref(pageNumFun());
const getAlarmUpStaticsData = async () => {
  let { data } = await getAlarmUpStatics();
  pageNumData.value = pageNumFun(data || {});
};
// 累计告警数据信息
const totalWarningTabs = ref(totalWarningTabsFun());
const scrollTableData = ref([]);
const columnKeyList = ref(columnKeyListFun());
const getSafetySupervisionAccumulated = async (
  type,
  pageOffset = 1,
  pageSize = 10000,
  input = null,
  sort = null,
  sortType = null
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
// 左二的时间类型
const dayTypeWarn = ref(1);
const handleClickMessageBtn = async () => {
  pageObj.currentPage = 1;
  messageDialogTitle.value = messageWarningType.value === 1 ? '运营商告警列表' : '充电站告警列表';
  dialogTableMessageVisible.value = true;
  messageColumnData.value = messageColumnKeyListFun(messageWarningType.value);
  loadGetSafetySupervisionAccumulated();
};

//行政区告警数据
// const areaRankData = ref(areaRankDataFun())
const areaRankData = ref([]);
// const areaTotalNum = ref(6399);
const areaTotalNum = ref(0);
const getDistrictAlarmStatics = async () => {
  let { data } = await districtAlarmStatics({ dayType: dayTypeWarn.value });
  let newData = data?.map((item) => {
    return {
      ...item,
      unit: '次',
      num: item.cnt,
      name: item.areaName
    };
  });
  areaRankData.value = newData || [];
  areaTotalNum.value = newData[0]?.cnt || 0;
  console.log(areaTotalNum);
};
//今日设备告警监控
const warningMonitorTabs = ref(warningMonitorTabsFun());
const warningMonitorPieData = ref([]);
const getAlarmLevelAndTypeByTime = async (param) => {
  let { data } = await alarmLevelAndTypeByTime(param);
  let type1 = {
    1: '一级人身安全',
    2: '二级设备安全',
    3: '三级告警提示'
  };
  let extraName = {
    1: '人身安全',
    2: '设备安全',
    3: '告警提示'
  };
  let type2 = {
    1: '充电系统',
    2: '电池系统',
    3: '配电系统'
  };

  let newData = null;
  const dataObj = {};
  data?.map((item) => {
    if (param.type === 1) {
      dataObj[item.alarmLevel] = item.cnt;
    } else {
      dataObj[item.alarmType] = item.cnt;
    }
  });
  newData = warningMonitorPieDataFun(param.type, dataObj);

  warningMonitorPieData.value = newData;
};
//实时状态情况
const realtimeStateTabs = ref(realtimeStateTabsFun());
const realtimeStateData = ref(realtimeStateDataFun());
// 实时告警趋势情况
const realtimeTrend = ref(realtimeTrendFun());
const getAlarmLevelAndTypeByTIme = async () => {
  let { data } = await alarmLevelAndTypeByTIme({ dayType: dayTypeAlarm.value });
  console.log('data', data);
  console.log('dayTypeAlarm', dayTypeAlarm.value);
  realtimeTrend.value = realtimeTrendFun(data || [], dayTypeAlarm.value);
};
//底部button
const bottomTabsData = ref(bottomTabDataFun());
const handleChangeTab = async (data, type) => {
  if (type === 'total-warning') {
    columnKeyList.value = columnKeyListFun(data.code);
    scrollTableData.value = [];
    //累计告警数据信息
    scrollTableData.value = (await getSafetySupervisionAccumulated(data.code))?.dataList || [];
  } else if (type === 'warning-monitor') {
    // 今日设备告警监控
    // warningMonitorPieData.value = warningMonitorPieDataFun(data.code);
    totalCurCode.value = data.code;
    let obj = {
      type: data.code,
      // startTime:'2023-04-03 14:22:34',
      // endTime: '2023-04-06 14:22:34'
      startTime: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      endTime: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    };
    getAlarmLevelAndTypeByTime(obj);
  } else if (type === 'realtime-state') {
    // 实时状态情况
    nowStatus.value = data.code;
    getOnlineStatusData(data.code);
  }
};

const getOnlineStatusData = async (type) => {
  const res = await getOnlineStatus(type);
  console.log(res, '------online');
  realtimeState.value = res.data;
  realtimeStateData.value = realtimeStateDataFun(type, res.data);
};

const handleClick = () => {
  pageObj.currentPage = 1;
  dialogTableVisible.value = true;
  getTableAlarm();
};

const getTableAlarm = async (level) => {
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
  pageObj.total = data?.total || 0;
};
// table数据
const handPageChange = async (value, type) => {
  if (type === 'total-message') {
    pageObj.currentPage = value;
    loadGetSafetySupervisionAccumulated();
  } else {
    pageObj.currentPage = value;
    getTableAlarm();
  }
};
// 右三日周年点击
const handleYearBtn = (value) => {
  console.log(value);
  dayTypeAlarm.value = value.value;
  getAlarmLevelAndTypeByTIme();
};
// 左二行政区
const handleWarmYearBtn = (value) => {
  console.log(value);
  dayTypeWarn.value = value.value;
  console.log('dataType.value', dayTypeWarn.value);
  getDistrictAlarmStatics();
};

// 告警选中
const handleChoose = (item) => {
  console.log('告警选中', item);
  bottomCode.value = 1;
  // 今日设备告警交互，实时状态变false
  realtimeStateData.value.forEach((i) => {
    i.isChoose = false;
  });
  //todo
  mapLayerRef.value.alarmTypeChange(item);
};
// 实时状态球选中
const handleBall = (item) => {
  if (nowStatus.value !== 3) return;
  item.isChoose = !item.isChoose;
  bottomCode.value = 2;
  // 实时状态情况交互，今日设备告警监控变false
  warningMonitorPieData.value.forEach((i) => {
    i.isChoose = false;
  });
  console.log('ball', item);
  // todo
  mapLayerRef.value.alarmTypeChange(item);
};
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
  dialogTableVisible.value = false;
  // 展示站点
  toSingleStation(aircityObj.value?.acApi, item.row);
};

// 左一详情搜索
const handleSearchWarnLeft = () => {
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
    sort.value = null;
    sortType.value = null;
  }

  loadGetSafetySupervisionAccumulated();
};
onMounted(async () => {
  let obj = {
    type: 1,
    // startTime:'2023-04-03 14:22:34',
    // endTime: '2023-04-06 14:22:34'
    startTime: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  };
  getAlarmUpStaticsData();
  getDistrictAlarmStatics();
  getAlarmLevelAndTypeByTime(obj);
  getAlarmLevelAndTypeByTIme();
  getOnlineStatusData(3);
  scrollTableData.value = (await getSafetySupervisionAccumulated(1))?.dataList || [];
});
</script>

<style lang="less" scoped>
.total-warning-num {
  .tabs {
    margin-top: 16px;
    position: relative;
    .button-base {
      position: absolute;
      bottom: 7px;
      right: 0;
    }
  }
  .el-table {
    margin-top: 12px;
  }
}
.area-warning-num {
  margin-top: 20px;
  .area-rank-wrap {
    margin-top: 16px;
  }
}
.warning-monitor {
  .tabs {
    margin-top: 16px;
  }
  .pie-wrap {
    margin-top: 18px;
    :deep(.legend-wrap) {
      margin-left: 24px;
      .right-info {
        width: 45px;
      }
    }
  }
}
.realtime-state {
  margin-top: 16px;
  .tabs {
    margin-top: 16px;
  }
  :deep(.num-wrap) {
    height: 157px;
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
  }
  :deep(.num-wrap > .ball-active) {
    img {
      transform: scale(1.2);
    }
  }
  :deep(.num-wrap > .cursor) {
    cursor: pointer;
  }
}
.realtime-trend {
  margin-top: 23px;
  .ec-wrap {
    margin-top: 14px;
  }
}
.filter {
  cursor: pointer;
}
.detail {
  color: #4bdeff;
  text-decoration: none;
}
</style>
