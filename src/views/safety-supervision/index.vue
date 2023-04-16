<template>
    <page-num :data="pageNumData" />
    <panel>
        <div class="total-warning-num">
            <title-column title="累计告警数据信息" />
            <tabs 
            :data="totalWarningTabs" 
            @changeTab="(data)=>handleChangeTab(data,'total-warning')" />
            <scroll-table/>

        </div>
        <div class="area-warning-num">
            <title-column title="行政区告警数据" />
            <area-rank-list 
                :data="areaRankData" 
                :totalNum="areaTotalNum" 
                height="3.7rem"
            />
        </div>
    </panel>
    <panel type="right">
        <div class="warning-monitor">
            <title-column title="今日设备告警监控" />
            <tabs :data="warningMonitorTabs" @changeTab="(data)=>handleChangeTab(data,'warning-monitor')" />
            <pie-chart :data="warningMonitorPieData"/>
        </div>
        <div class="realtime-state">
            <title-column title="实时状态情况" />
            <tabs :data="realtimeStateTabs" @changeTab="(data)=>handleChangeTab(data,'realtime-state')" />
                <div class="num-wrap">
                    <template v-for="(item, index) in realtimeStateData" :key="index">
                        <num-card :data="item" />
                    </template>
                </div>
            </div>
            <div class="realtime-trend">
                <title-column title="实时告警趋势情况" />
                <line-time-chart :data="realtimeTrend" :colors="['#FF6B4B']"/>
            </div>
    </panel>
  </template>
<script setup>
import ScrollTable from './components/scroll-table.vue'
import {
    pageNumFun,
    totalWarningTabsFun,
    areaRankDataFun,
    warningMonitorTabsFun,
    warningMonitorPieDataFun,
    realtimeStateTabsFun,
    realtimeStateDataFun,
    realtimeTrendFun
} from './config.js'
// 头部累计数据
const pageNumData = ref(pageNumFun());
// 累计告警数据信息
const totalWarningTabs = ref(totalWarningTabsFun())

//行政区告警数据
const areaRankData = ref(areaRankDataFun())
const areaTotalNum = ref(6399)
//今日设备告警监控
const warningMonitorTabs = ref(warningMonitorTabsFun())
const warningMonitorPieData = ref(warningMonitorPieDataFun())
//实时状态情况
const realtimeStateTabs = ref(realtimeStateTabsFun())
const realtimeStateData = ref(realtimeStateDataFun())
// 实时告警趋势情况
const realtimeTrend = ref(realtimeTrendFun())
const handleChangeTab = (data, type) => {
  console.log(data, type);
  if (type === 'total-warning') {
    //累计告警数据信息

  } else if (type === 'warning-monitor') {
    // 今日设备告警监控
    warningMonitorPieData.value = warningMonitorPieDataFun(data.code);
  } else if (type === 'today') {
    // 实时状态情况
  }
};
</script>

<style lang="less" scoped>
.realtime-state {
  .num-wrap {
    display: flex;
    justify-content: space-between;
  }
}
</style>