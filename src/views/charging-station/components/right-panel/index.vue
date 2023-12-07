<template>
  <panel type="right">
    <div class="right-panel-wrap">
      <div class="today-power-info">
        <title-column title="今日充电实时功率信息" />
        <charging-realtime-power :data="powerInfoNumData" />
        <line-time-chart
          :data="lineTimeData"
          unit="kW"
          :colors="lineTimeColors"
          :customOption="{ animation: false }"
          :chartStyle="{
            width: '100%',
            height: '1.89rem'
          }"
        />
      </div>
      <div class="today-num-info">
        <title-column title="今日充电设施数据信息" />
        <tabs :data="todayTabs" @changeTab="(data) => handleChangeTab(data, 'today')" />
        <div class="num-wrap">
          <template v-for="(item, index) in todayInfoNumData" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
      </div>
      <div class="today-warning-message">
        <title-column title="今日告警信息" :showBtn="true" @handleClick="handleClick" />
        <div ref="warningDom" class="flex-v-1 flex-v warnin-container-box">
          <warning-tabs
            :data="warningTabsData"
            @changeTab="(data) => handleChangeTab(data, 'warning')"
          />
          <warning-list class="flex-v-1" :data="warningListData" @handleClick="handleWarnClick" />
        </div>
      </div>
    </div>
  </panel>
  <today-warn-dialog
    v-if="dialogTableVisible"
    :visible="dialogTableVisible"
    @closed="handleCloseTodayWarnDialog"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, inject } from 'vue';
import {
  todayTabsFun,
  todayInfoNumDataFun,
  lineTimeDataFun,
  warningTabsDataFun
} from '../../config.js';
import { dayEquInfo, alarmInfo, timePowerGraph, alarmCount } from '../../api.js';
import { toSingleStation, showStationDetailPanel } from '@/global/config/map';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import Loading from '@sutpc/vue3-loading';
import TodayWarnDialog from '../today-warn-dialog.vue';
import ChargingRealtimePower from '../charging-realtime-power.vue';
interface Aircity {
  value: object;
}
const storeVisible = useVisibleComponentStore();
const aircityObj: Aircity = inject('aircityObj');
const warningDom = ref(null);
// 今日充电设施数据信息code
const realtimeCode = ref('pile');
const dialogTableVisible = ref(false);
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
// 实时功率图表
const getTimePowerGraph = async () => {
  const res = await timePowerGraph();
  lineTimeData.value = lineTimeDataFun(res.data);
  if (res.data.length) {
    const data = res.data || [];
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
  const data = { ...station };
  data.isWarning = true;
  data.warnId = station.id;
  // 告警详情
  data['isFly'] = false;
  console.log('11111');
  if (aircityObj.value) {
    await toSingleStation(aircityObj.value?.acApi, data);
  }

  // setTimeout(() => {
  console.log('9999');
  showStationDetailPanel(storeVisible, data);
  // }, 15000);
};

const handleChangeTab = (data, type) => {
  if (type === 'today') {
    // 今日充电设施数据信息tab切换
    realtimeCode.value = data.code;
    getDayEquInfo(data.code);
  } else if (type === 'warning') {
    getAlarmInfo([data.code]);
  }
};
//今日-充电桩/充电枪信息
const getDayEquInfo = async (type) => {
  const res = await dayEquInfo(type);
  todayInfoNumData.value = todayInfoNumDataFun(res?.data);
};
//今日告警信息
const getAlarmInfo = async (level) => {
  const params = {
    alarmLevel: level,
    pageNum: 1,
    pageSize: 1000
  };
  Loading.add(warningDom.value);
  const res = await alarmInfo(params);
  Loading.remove(warningDom.value);
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
const handleClick = () => {
  console.log('handleClick');
  dialogTableVisible.value = true;
};
const handleCloseTodayWarnDialog = () => {
  dialogTableVisible.value = false;
};

let timer = null;
let timer2 = null;
onMounted(() => {
  // getDayPower();
  getAlarmInfo(['1']);
  getTimePowerGraph();
  getAlarmCount();
  getDayEquInfo(realtimeCode.value);
  timer = setInterval(() => {
    getDayEquInfo(realtimeCode.value);
    // getDayPower();
    getAlarmCount();
  }, 1000 * 60);
  timer2 = setInterval(() => {
    getTimePowerGraph();
  }, 5000);
});
onUnmounted(() => {
  clearInterval(timer);
  timer = null;
  clearInterval(timer2);
  timer2 = null;
});
</script>

<style lang="less" scoped>
.right-panel-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.today-num-info {
  margin-top: 20px;

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

.today-warning-message {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 0;
  margin-top: 21px;

  .warning-tabs {
    margin-top: 12px;
  }

  .warning-list {
    margin-top: 18px;

    // :deep(.warning-info) {
    //   .message {
    //     min-width: 2rem;
    //     max-width: 2rem;
    //   }

    //   .area {
    //     min-width: 0.8rem;
    //     max-width: 0.8rem;
    //   }
    // }
  }
}

.today-power-info {
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
      background: linear-gradient(
        258.38deg,
        rgba(37, 177, 255, 0.1) 2.46%,
        rgba(37, 177, 255, 0) 100%
      );
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
</style>
