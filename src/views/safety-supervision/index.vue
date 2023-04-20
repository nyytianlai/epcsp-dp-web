<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 09:12:44
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-20 16:44:41
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
      />
      <scroll-table :scrollTableData="scrollTableData" />
    </div>
    <div class="area-warning-num">
      <title-column title="行政区告警数据" />
      <area-rank-list :data="areaRankData" :totalNum="areaTotalNum" height="3.7rem" />
    </div>
  </panel>
  <panel type="right">
    <div class="warning-monitor">
      <title-column title="今日设备告警监控" :showBtn="true" btnText="告警列表" @handleClick="handleClick" />
      <tabs
        :data="warningMonitorTabs"
        @changeTab="(data) => handleChangeTab(data, 'warning-monitor')"
      />
      <pie-chart :data="warningMonitorPieData" />
    </div>
    <div class="realtime-state">
      <title-column title="实时状态情况" />
      <tabs
        :data="realtimeStateTabs"
        @changeTab="(data) => handleChangeTab(data, 'realtime-state')"
      />
      <div class="num-wrap">
        <template v-for="(item, index) in realtimeStateData" :key="index">
          <num-card :data="item" />
        </template>
      </div>
    </div>
    <div class="realtime-trend">
      <title-column title="实时告警趋势情况" />
      <line-time-chart
        :data="realtimeTrend"
        :chartStyle="{ height: '2.55rem' }"
        :colors="['#FF6B4B']"
      />
    </div>
  </panel>
  <bottom-menu-tabs :data="bottomTabsData" @changeTab="changeButtomTab" />
  <map-layer ref="mapLayerRef"></map-layer>
  <custom-dialog v-model:visible="dialogTableVisible" title="告警列表" @closed="handleDialogClosed">
    <el-table
      :data="alarmTableData"
      height="6.34rem"
      style="width: 100%"
      class="custom-dialog-table"
    >
    <el-table-column v-for="(item, index) in columnData" :key="index" v-bind="item" >
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
</template>
<script setup>
import { ref, onMounted,reactive  } from 'vue';
import ScrollTable from './components/scroll-table.vue';
import MapLayer from './components/map-layer.vue';
import dayjs from 'dayjs';
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
  columnDataFun 
} from './config.js';
import {
  getAlarmUpStatics,
  safetySupervisionAccumulated,
  districtAlarmStatics,
  alarmLevelAndTypeByTime,
  alarmLevelAndTypeByTIme,
  getOnlineStatus,
  alarmInfo
} from '@/api/supervision.js';
let mapLayerRef = ref(null);
const dialogTableVisible = ref(false);
const columnData = ref(columnDataFun());
const alarmTableData = ref([]);
const pageObj = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
//地图底部tab切换
const changeButtomTab = (item) => {
  console.log('底部切换', item);
  mapLayerRef.value.buttomTabChange(item.code);
};

// 头部累计数据
const pageNumData = ref(pageNumFun());
const getAlarmUpStaticsData = async()=> {
  let { data } = await getAlarmUpStatics()
  pageNumData.value = pageNumFun(data || {})
}
// 累计告警数据信息
const totalWarningTabs = ref(totalWarningTabsFun());
const scrollTableData = ref([]);
const getSafetySupervisionAccumulated = async (type) => {
  let { data } = await safetySupervisionAccumulated(type);
  let newData = data?.map(item => {
    return {
      ...item,
      pro: type === 1 ? item.operatorName : item.stationName,
      pro1: item.cnt || 0,
      pro2: item.affirmCnt,
      pro3: item.recCnt || 0
    };
  });
  scrollTableData.value = newData || [];
};

//行政区告警数据
// const areaRankData = ref(areaRankDataFun())
const areaRankData = ref();
// const areaTotalNum = ref(6399);
const areaTotalNum = ref();
const getDistrictAlarmStatics = async () => {
  let { data } = await districtAlarmStatics();
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
  if(data?.length !== 0) {
  newData = data?.map(item => {
    if(param.type === 1) {
      return {
      value: item.cnt || 0,
      name: type1[item.alarmLevel],
      extraName: extraName[item.alarmLevel],
      unit: '个'
    }
    }else {
      return {
        value: item.cnt || 0,
        name: type2[item.alarmType],
        unit: '个'
      }
    });
  } else {
    newData = warningMonitorPieDataFun(param.type);
  }

  warningMonitorPieData.value = newData;
};
//实时状态情况
const realtimeStateTabs = ref(realtimeStateTabsFun());
const realtimeStateData = ref(realtimeStateDataFun());
// 实时告警趋势情况
const realtimeTrend = ref(realtimeTrendFun());
const getAlarmLevelAndTypeByTIme = async(param)=> {
  let {data} = await alarmLevelAndTypeByTIme(param)
  realtimeTrend.value = realtimeTrendFun(data || [])
}
//底部button
const bottomTabsData = ref(bottomTabDataFun());
const handleChangeTab = (data, type) => {
  if (type === 'total-warning') {
    //累计告警数据信息
    getSafetySupervisionAccumulated(data.code);
  } else if (type === 'warning-monitor') {
    // 今日设备告警监控
    // warningMonitorPieData.value = warningMonitorPieDataFun(data.code);
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
    getOnlineStatusData(data.code)
  }
};

const getOnlineStatusData = async(type) => {
  const res = await getOnlineStatus(type)
  console.log(res, '------online');
  realtimeStateData.value = realtimeStateDataFun(type,res.data);
}

const handleClick = () => {
  dialogTableVisible.value = true;
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
const handPageChange = (value) => {
  pageObj.currentPage = value;
  getTableAlarm();
};

onMounted(() => {
  let obj = {
    type:1,
    // startTime:'2023-04-03 14:22:34',
    // endTime: '2023-04-06 14:22:34' 
    startTime:dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  }
  getAlarmUpStaticsData()
  getSafetySupervisionAccumulated(1);
  getDistrictAlarmStatics();
  getAlarmLevelAndTypeByTime(obj)
  getAlarmLevelAndTypeByTIme({
    // startTime:'2023-04-03 14:22:34',
    // endTime: '2023-04-06 14:22:34'
    startTime:dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  })
  getOnlineStatusData(3)
  getTableAlarm();
});
</script>

<style lang="less" scoped>
.total-warning-num {
  .tabs {
    margin-top: 10px;
  }
  .el-table {
    margin-top: 25px;
  }
}
.area-warning-num {
  margin-top: 18px;
  .area-rank-wrap {
    margin-top: 12px;
  }
}
.warning-monitor {
  .tabs {
    margin-top: 7px;
  }
  .pie-wrap {
    margin-top: 20px;
  }
}
.realtime-state {
  margin-top: 18px;
  .tabs {
    margin-top: 12px;
  }
  :deep(.num-wrap) {
    height: 157px;
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
  }
}
.realtime-trend {
  margin-top: 23px;
}
</style>
