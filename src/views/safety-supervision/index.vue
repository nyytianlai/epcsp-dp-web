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
      <title-column title="行政区告警数据"  :showTabBtn="true" :tabList="[{value:1,name:'日'},{value:2,name:'月'},{value:3,name:'年'}]"   @handleTabBtn="handleWarmYearBtn"/>
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
      <pie-chart :data="warningMonitorPieData" :mode="totalCurCode === 1 ? 'canChoose' : 'default'" @choose="handleChoose"/>
    </div>
    <div class="realtime-state">
      <title-column title="实时状态情况" />
      <tabs
        :data="realtimeStateTabs"
        @changeTab="(data) => handleChangeTab(data, 'realtime-state')"
      />
      <div class="num-wrap">
        <template v-for="(item, index) in realtimeStateData" :key="index">
          <num-card :data="item" @click="handleBall(item)" :class="{'ball-active':nowStatus === 3&&item.isChoose, cursor:nowStatus === 3 }"/>
        </template>
      </div>
    </div>
    <div class="realtime-trend">
      <title-column title="实时告警趋势情况" :showTabBtn="true" :tabList="[{value:1,name:'日'},{value:2,name:'周'},{value:3,name:'月'}]"  @handleTabBtn="handleYearBtn"/>
      <line-time-chart
        :data="realtimeTrend"
        :chartStyle="{ height: '2.55rem' }"
        :colors="['#FF6B4B']"
        :mode="true"
      />
    </div>
  </panel>
  <bottom-menu-tabs :data="bottomTabsData" @changeTab="changeButtomTab" />
  <map-layer :ref="(el) => (mapLayerRef = el)" v-if="aircityObj"></map-layer>
  <custom-dialog v-model:visible="dialogTableVisible" title="告警列表" @closed="handleDialogClosed">
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
        <template #default="scope">
          <span v-if="item.prop === 'alarmLevelName'">
            {{ scope.row[scope.column.property] }}
          </span>
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
    @closed="handleDialogClosed"
  >
    <el-table
      :data="messageTableData"
      height="6.34rem"
      style="width: 100%"
      class="custom-dialog-table"
    >
      <el-table-column
        v-for="(item, index) in messageColumnData"
        :key="index"
        v-bind="item"
        :show-overflow-tooltip="true"
        :formatter="tableColumnFun"
      >
        <template #default="scope">
          <span v-if="item.prop === 'alarmLevelName'">
            {{ scope.row[scope.column.property] }}
          </span>
        </template>
      </el-table-column>
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
  messageColumnKeyListFun
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
// 告警级别tab高亮
const totalCurCode = ref(1)
// 累计告警数据信息弹窗显隐
const dialogTableMessageVisible = ref(false);
const messageDialogTitle = ref('运营商告警列表');
const messageColumnData = ref(messageColumnKeyListFun());
const messageTableData = ref([]);
const messageWarningType = ref(1);
// 告警趋势
const dayTypeAlarm = ref(1)
//地图底部tab切换
const changeButtomTab = (item) => {
  console.log('底部切换', item);
  mapLayerRef.value.buttomTabChange(item.code);
};
// 充电桩实时按钮
const nowStatus  = ref(3)
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
const getSafetySupervisionAccumulated = async (type, pageOffset = 1, pageSize = 10000) => {
  const params = {
    type,
    pageOffset,
    pageSize
  };
  let { data } = await safetySupervisionAccumulated(params);
  return data;
};
// 左二的时间类型
const dayTypeWarn = ref(1)
const handleClickMessageBtn = async () => {
  pageObj.currentPage = 1;
  messageDialogTitle.value = messageWarningType.value === 1 ? '运营商告警列表' : '充电站告警列表';
  dialogTableMessageVisible.value = true;
  messageColumnData.value = messageColumnKeyListFun(messageWarningType.value);
  const data = await getSafetySupervisionAccumulated(
    messageWarningType.value,
    pageObj.currentPage,
    pageObj.pageSize
  );
  messageTableData.value = data?.list || [];
  pageObj.total = data?.total || 0;
};

//行政区告警数据
// const areaRankData = ref(areaRankDataFun())
const areaRankData = ref();
// const areaTotalNum = ref(6399);
const areaTotalNum = ref();
const getDistrictAlarmStatics = async () => {
  let { data } = await districtAlarmStatics({dayType:dayTypeWarn.value});
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
  const dataObj = {}
  data?.map(item => {
    if (param.type === 1) { 
      dataObj[item.alarmLevel] = item.cnt
    } else {
      dataObj[item.alarmType] = item.cnt
    }
  })
  newData = warningMonitorPieDataFun(param.type,dataObj);
  // if (data?.length !== 0) {
  //   newData = data?.map((item) => {
  //     if (param.type === 1) {
  //       return {
  //         value: item.cnt || 0,
  //         name: type1[item.alarmLevel],
  //         extraName: extraName[item.alarmLevel],
  //         unit: '个'
  //       };
  //     } else {
  //       return {
  //         value: item.cnt || 0,
  //         name: type2[item.alarmType],
  //         unit: '个'
  //       };
  //     }
  //   });
  // } else {
  //   newData = warningMonitorPieDataFun(param.type);
  // }

  warningMonitorPieData.value = newData;
};
//实时状态情况
const realtimeStateTabs = ref(realtimeStateTabsFun());
const realtimeStateData = ref(realtimeStateDataFun());
// 实时告警趋势情况
const realtimeTrend = ref(realtimeTrendFun());
const getAlarmLevelAndTypeByTIme = async () => {
  let { data } = await alarmLevelAndTypeByTIme({dayType:dayTypeAlarm.value});
  console.log('data',data)
  console.log('dayTypeAlarm',dayTypeAlarm.value)
  realtimeTrend.value = realtimeTrendFun(data || [],dayTypeAlarm.value);
};
//底部button
const bottomTabsData = ref(bottomTabDataFun());
const handleChangeTab = async (data, type) => {
  if (type === 'total-warning') {
    columnKeyList.value = columnKeyListFun(data.code);
    scrollTableData.value = [];
    //累计告警数据信息
    scrollTableData.value = (await getSafetySupervisionAccumulated(data.code))?.list || [];
  } else if (type === 'warning-monitor') {
    // 今日设备告警监控
    // warningMonitorPieData.value = warningMonitorPieDataFun(data.code);
    totalCurCode.value = data.code
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
    nowStatus.value = data.code
    getOnlineStatusData(data.code);
  }
};

const getOnlineStatusData = async (type) => {
  const res = await getOnlineStatus(type);
  console.log(res, '------online');
  realtimeStateData.value = realtimeStateDataFun(type, res.data);
};

const handleClick = () => {
  pageObj.currentPage = 1;
  dialogTableVisible.value = true;
  getTableAlarm();
};

const getTableAlarm = async (level) => {
  const params = {
    alarmLevel: level,
    pageNum: pageObj.currentPage,
    pageSize: pageObj.pageSize
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
const handPageChange = async (value, type) => {
  if (type === 'total-message') {
    pageObj.currentPage = value;
    const data = await getSafetySupervisionAccumulated(
      messageWarningType.value,
      pageObj.currentPage,
      pageObj.pageSize
    );
    messageTableData.value = data?.list || [];
  } else {
    pageObj.currentPage = value;
    getTableAlarm();
  }
};
// 右三日周年点击
const handleYearBtn = (value)=>{
  console.log(value)
  dayTypeAlarm.value = value.value
  getAlarmLevelAndTypeByTIme();

}
// 左二行政区
const handleWarmYearBtn = (value) =>{
  console.log(value)
  dayTypeWarn.value = value.value
  console.log('dataType.value',dayTypeWarn.value)
  getDistrictAlarmStatics()
}

// 告警选中
const handleChoose = (item)=>{
  console.log('告警选中',item)
  // todo
}
// 实时状态球选中
const handleBall = (item)=>{
  
  if(nowStatus.value !==3) return
  item.isChoose = !item.isChoose
  console.log('ball',item)
  // todo
}
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
  scrollTableData.value = (await getSafetySupervisionAccumulated(1))?.list || [];
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
    :deep(.legend-wrap){
      margin-left: 24px;
      .right-info{
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
  :deep(.num-wrap>.ball-active){
    img {
      transform: scale(1.2);
    }
  }
  :deep(.num-wrap>.cursor){
    cursor: pointer;
  }

}
.realtime-trend {
  margin-top: 23px;
  .ec-wrap {
    margin-top: 14px;
  }
}
</style>
