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
      <title-column title="整体接入信息" />
      <div class="num-wrap">
        <template v-for="(item, index) in cardData" :key="index">
          <num-card :data="item" classStyleType="bottomDown" />
        </template>
      </div>
    </div>
    <div class="pile-charger">
      <div class="pile-charger-header">
        <tabs :data="curBtn === 1 ? chargingStationTabs : chargingStationGunTabs"
          @changeTab="(data) => handleChangeTab(data, 'charger')" />
        <div class="right-tab-btn">
          <div v-for="(item, index) in tabList" :key="index" class="tab-btn" :class="{ active: curBtn === item.value }"
            @click="handleTabBtn(item)">
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
      <rank-list :data="projectList" :totalNum="projectTotalNum"
        :height="totalChargerIndex === 1 ? '3.4rem' : '2.4rem'" />
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
      <title-column title="今日充电实时功率信息" />
      <charging-realtime-power :data="{num:powerInfoNumData}" />
      <line-time-chart :data="lineTimeData" unit="kW" :colors="lineTimeColors" />
    </div>
    <div class="today-warning-message">
      <title-column title="今日告警信息" :showBtn="true" @handleClick="handleClick" />
      <warning-tabs :data="warningTabsData" @changeTab="(data) => handleChangeTab(data, 'warning')" />
      <warning-list :data="warningListData" @handleClick="handleWarnClick" />
    </div>
  </panel>
  <bottom-menu-tabs :data="bottomTabsData" @changeTab="changeButtomTab" />
  <map-layer :ref="(el) => (mapLayerRef = el)" v-if="aircityObj"></map-layer>
  <today-warn-dialog v-if="dialogTableVisible" :visible="dialogTableVisible" @closed="handleCloseTodayWarnDialog" />
  <enterprise-rank-list-dialog v-if="dialogRankVisible" :visible="dialogRankVisible" @closed="handleCloseRankDialog" />
</template>
<script lang="ts" setup>
import ChargingRealtimePower from './components/charging-realtime-power.vue';
import { onMounted, onUnmounted, ref, inject } from 'vue';
import {
  overTotalCount,
  totalFacilities,
  totalEquipment,
  stationOpeTop10,
  dayEquInfo,
  dayPower,
  alarmInfo,
  timePowerGraph,
  alarmCount
} from './api.js';
import {
  pageNumFun,
  cdsszlFun,
  pileChargerFun,
  operatingTabsFun,
  todayTabsFun,
  todayInfoNumDataFun,
  lineTimeDataFun,
  warningTabsDataFun,
  bottomTabDataFun,
  chargingStationTabsFun,
  chargingStationGunTabsFun
} from './config.js';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { toSingleStation, showStationDetailPanel } from '@/global/config/map';
import MapLayer from './components/map-layer.vue';
import PageNum from '@/components/page-num/index.vue';
import Panel from '@/components//panel/index.vue';
import TodayWarnDialog from './components/today-warn-dialog.vue';
import EnterpriseRankListDialog from './components/enterprise-rank-list-dialog.vue';
interface Aircity {
  value: object;

}
// 今日充电设施数据信息code
const realtimeCode = ref('pile');
// 左二图的tab
const curBtn = ref(1);
const storeVisible = useVisibleComponentStore();
const tabList = ref([
  { value: 1, name: '桩', index: 'pile' },
  { value: 2, name: '枪', index: 'gun' }
]);
const aircityObj: Aircity = inject('aircityObj');
let mapLayerRef = ref(null);
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
const powerInfoNumData = ref(0);
// 充电功率折线
const lineTimeData = ref(lineTimeDataFun());
const lineTimeColors = ['blue'];
// 今日告警信息tabData
const warningTabsData = ref(warningTabsDataFun());
const warningListData = ref([]);
//底部button
const bottomTabsData = ref(bottomTabDataFun());
const dialogTableVisible = ref(false);
// 运营企业排名弹窗显示标识
const dialogRankVisible = ref(false);
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
    realtimeCode.value = data.code;
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
const handleCloseTodayWarnDialog = () => {
  dialogTableVisible.value = false;
};
// 总览上面4个指标
const getOverTotalCount = async () => {
  const res = await overTotalCount();
  pageNumData.value = pageNumFun(res.data);
};
//充电设施总量
const getTotalFacilities = async () => {
  const res = await totalFacilities();
  const data = {
    totalChargingStations: res.data.totalChargingStations,
    totalOperating: res.data.totalOperating,
    totalNewEnergyVehicles: res.data.totalNewEnergyVehicles
  };
  cardData.value = cdsszlFun(data);
};
//充电桩总量：pile，充电枪总量：gun
const getTotalEquipment = async () => {
  const res = await totalEquipment({ chargingType: chargingType.value, type: typeCharge.value });

  pileChargerData.value = pileChargerFun(totalChargerIndex.value, res?.data, curBtn.value);
};

//运营企业年度TOP10-充电桩:pile,充电枪:gun,充电站:station
const getStationOpeTop10 = async (type) => {
  const res = await stationOpeTop10(type);
  // console.log(res);
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
//今日-充电桩/充电枪信息
const getDayEquInfo = async (type) => {
  const res = await dayEquInfo(type);
  todayInfoNumData.value = todayInfoNumDataFun(res?.data);
};
//今日充电功率信息
const getDayPower = async () => {
  const res = await dayPower();
  powerInfoNumData.value = res.data;
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
        area: item.stationName,
        isClick: true,
        ...item
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
  if (res.data.length) {
    const data = res.data;
    const info = {
      totalPower: data[data.length - 1].ratedPower,
      realTimePower: data[data.length - 1].realTimePower
    };
    powerInfoNumData.value = info.realTimePower;
  }
};

// 今日告警信息点击
const handleWarnClick = async (station) => {
  console.log('ssss', station);
  station.isWarning = true
  station.warnId = station.id
  // 告警详情
  station['isFly'] = false;
  console.log('11111')
  if (aircityObj.value) {
    await toSingleStation(aircityObj.value?.acApi, station);
  }

  // setTimeout(() => {
  console.log('9999')
  showStationDetailPanel(storeVisible, station);
  // }, 1500);
};
// 运营企业排名详情点击
const handleDetailClick = (item) => {
  dialogRankVisible.value = true;
};
const handleCloseRankDialog = () => {
  dialogRankVisible.value = false;
};

// 左二的右侧tab切换
const handleTabBtn = (item) => {
  console.log('item');
  curBtn.value = item.value;
  typeCharge.value = item.index;
  getTotalEquipment();
};

let timer = null;
let timer2 = null
onMounted(() => {
  getOverTotalCount();
  getTotalFacilities();
  getTotalEquipment();
  getStationOpeTop10('station');
  getDayEquInfo(realtimeCode.value);
  // getDayPower();
  getAlarmInfo(['1']);
  getTimePowerGraph();
  getAlarmCount();
  timer = setInterval(() => {
    getDayEquInfo(realtimeCode.value);
    // getDayPower();
    getAlarmCount();
  }, 1000 * 60);
  timer2 = setInterval(() => {
    getTimePowerGraph();
  }, 5000)
});
onUnmounted(() => {
  clearInterval(timer);
  timer = null;
  clearInterval(timer2);
  timer2 = null;
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
    background: linear-gradient(255.75deg,
        rgba(37, 177, 255, 0.02) 23.33%,
        rgba(37, 177, 255, 0.2) 100%);
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
      background: linear-gradient(258.38deg,
          rgba(37, 177, 255, 0.1) 2.46%,
          rgba(37, 177, 255, 0) 100%);
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

  :deep(.charging-realtime-power) {
    margin-top: 12px;
  }

  .num-wrap {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;

    :deep(.num-card) {

      padding: 20px;
      width: 100%;
      background: linear-gradient(258.38deg,
          rgba(37, 177, 255, 0.1) 2.46%,
          rgba(37, 177, 255, 0) 100%);
      mix-blend-mode: normal;
      box-shadow: inset 0px 0px 35px rgba(41, 76, 179, 0.2);
      filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.04));
      border-radius: 2px;
      justify-content: flex-start;

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
}</style>
