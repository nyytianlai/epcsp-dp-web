<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 09:12:44
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-17 14:46:35
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
      <scroll-table :scrollTableData="scrollTableData"/>
    </div>
    <div class="area-warning-num">
      <title-column title="行政区告警数据" />
      <area-rank-list :data="areaRankData" :totalNum="areaTotalNum" height="3.7rem" />
    </div>
  </panel>
  <panel type="right">
    <div class="warning-monitor">
      <title-column title="今日设备告警监控" />
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
  <bottom-menu-tabs :data="bottomTabsData" />
</template>
<script setup>
import { ref, onMounted } from 'vue';
import ScrollTable from './components/scroll-table.vue';
import {
  pageNumFun,
  totalWarningTabsFun,
  areaRankDataFun,
  warningMonitorTabsFun,
  warningMonitorPieDataFun,
  realtimeStateTabsFun,
  realtimeStateDataFun,
  realtimeTrendFun,
  bottomTabDataFun
} from './config.js';
import {
  districtAlarmLevelStatics,
  safetySupervisionAccumulated,
  districtAlarmStatics
} from '@/api/supervision.js';

// 头部累计数据
const getDistrictAlarmLevelStatics = async () => {
  let { data } = await districtAlarmLevelStatics();
  console.log(data.data, 'getDistrictAlarmLevelStatics');
};
const pageNumData = ref(pageNumFun());
// 累计告警数据信息
const totalWarningTabs = ref(totalWarningTabsFun());
const scrollTableData = ref([])
const getSafetySupervisionAccumulated = async (type) => {
  let { data } = await safetySupervisionAccumulated(type);
  let newData = data?.data.map(item => {
    return {
      ...item,
      pro: type === 1 ? item.operatorName :  item.stationName,
      pro1: item.cnt,
      pro2: item.affirmCnt,
      pro3: item.recCnt
    }
  })
  scrollTableData.value = newData || []
};

//行政区告警数据
// const areaRankData = ref(areaRankDataFun())
const areaRankData = ref();
const areaTotalNum = ref(6399);
const getDistrictAlarmStatics = async () => {
  let { data } = await districtAlarmStatics();
  let newData = data?.data?.map((item) => {
    return {
      ...item,
      unit: '次',
      num: item.cnt,
      name: item.areaName
    };
  });
  areaRankData.value = newData || [];
};
//今日设备告警监控
const warningMonitorTabs = ref(warningMonitorTabsFun());
const warningMonitorPieData = ref(warningMonitorPieDataFun());
//实时状态情况
const realtimeStateTabs = ref(realtimeStateTabsFun());
const realtimeStateData = ref(realtimeStateDataFun());
// 实时告警趋势情况
const realtimeTrend = ref(realtimeTrendFun());
//底部button
const bottomTabsData = ref(bottomTabDataFun());
const handleChangeTab = (data, type) => {
  console.log(data, type);
  if (type === 'total-warning') {
    //累计告警数据信息
    getSafetySupervisionAccumulated(data.code)
  } else if (type === 'warning-monitor') {
    // 今日设备告警监控
    warningMonitorPieData.value = warningMonitorPieDataFun(data.code);
  } else if (type === 'realtime-state') {
    // 实时状态情况
    realtimeStateData.value = realtimeStateDataFun(data.code);
  }
};

onMounted(() => {
  // getDistrictAlarmLevelStatics()
  getSafetySupervisionAccumulated(1);
  getDistrictAlarmStatics();
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
