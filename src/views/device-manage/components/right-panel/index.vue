<template>
  <panel type="right">
    <title-column title="在线运行状态情况" />
    <charging-realtime-power :data="chargingRealPower" />
    <div class="charging-types">
      <tabs
        :data="chargingTypesTabs"
        @changeTab="(data) => handleChangeTab(data, 'charging-types')"
      />
      <div class="num-wrap">
        <template v-for="(item, index) in chargingTypesData" :key="index">
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
      <line-time-chart-both
        :data="lineStateData"
        :colors="lineStateColor"
        unit="个"
        yAxisMode1="auto"
        :yAxisMode2="40000"
        :customOption="{ yAxis: [{ min: 40000 }] }"
      />
    </div>
    <div class="charging-runing">
      <tabs
        :data="chargingRunTabs"
        @changeTab="(data) => handleChangeTab(data, 'charging-runing')"
      />
      <div class="num-wrap">
        <template v-for="(item, index) in chargingRunData" :key="index">
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
      <line-time-chart-both
        :data="lineRunData"
        unit="%"
        :colors="lineRunColor"
        yAxisMode1="auto"
        :yAxisMode2="2"
      />
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import {
  selectPowerSumByDayTime,
  selectChargeEquipmentStatus,
  selectChargeEquipmentStatusByTime,
  selectChargeEquipmentUseRate,
  selectChargeEquipmentUseRateByTime
} from '../../api.js';
import {
  chargingTypesTabsFun,
  chargingTypesFun,
  lineStateDataFun,
  chargingRunTabsFun,
  chargingRunDataFun,
  lineRunDataFun
} from '../../config.js';
import ChargingRealtimePower from '../charging-realtime-power.vue';
import config from '@sutpc/config';

const lineStateColor = ['green', 'blue'];
const lineRunColor = ['green', '#FF7723'];
//设备管理/在线运行状态情况
const chargingRealPower = ref(0);
// 运行情况tab
const runing = ref(1);
//充电状态
const chargingTypesTabs = ref(chargingTypesTabsFun());
const chargingTypesData = ref(chargingTypesFun());
const lineStateData = ref(lineStateDataFun());
// 充电运行情况
const chargingRunTabs = ref(chargingRunTabsFun());
const chargingRunData = ref(chargingRunDataFun());
const lineRunData = ref(lineRunDataFun());

const bottomChartStyle = computed(() => {
  return {
    height: 140 * config.sizeScale + 'px'
  }
})

const handleChangeTab = (data, type) => {
  if (type === 'charging-types') {
    // 设备管理/充电桩-枪状态
    getSelectChargeEquipmentStatus(data.code);
    getChargeEquipmentStatusByTime(data.code);
  } else if (type === 'charging-runing') {
    // 运行情况
    runing.value = data.code;
    getChargeEquipmentUseRate(data.code);
    getChargeEquipmentUseRateByTime(data.code);
  }
};

// 设备管理/在线运行状态情况
const getSelectPowerSumByDayTime = async () => {
  const res = await selectPowerSumByDayTime();
  chargingRealPower.value = res?.data;
};
// 设备管理/充电桩-枪状态
const getSelectChargeEquipmentStatus = async (type) => {
  const res = await selectChargeEquipmentStatus(type);
  chargingTypesData.value = chargingTypesFun(res.data);
};
//设备管理/充电桩-枪状态分时列表
const getChargeEquipmentStatusByTime = async (type) => {
  const res = await selectChargeEquipmentStatusByTime(type);
  lineStateData.value = lineStateDataFun(res.data);
};

const getChargeEquipmentUseRate = async (type) => {
  const res = await selectChargeEquipmentUseRate(type);
  chargingRunData.value = chargingRunDataFun(res.data);
};
//设备管理/充电桩-枪运行情况分时列表
const getChargeEquipmentUseRateByTime = async (type) => {
  const res = await selectChargeEquipmentUseRateByTime(type);
  lineRunData.value = lineRunDataFun(res.data, runing.value);
};
let timer = null;
onMounted(() => {
  getSelectPowerSumByDayTime();
  getSelectChargeEquipmentStatus(1);
  getChargeEquipmentStatusByTime(1);
  getChargeEquipmentUseRate(1);
  getChargeEquipmentUseRateByTime(1);
  timer = setInterval(() => {
    getSelectPowerSumByDayTime();
  }, 1000 * 60);
});

onUnmounted(() => {
  clearInterval(timer);
  timer = null;
});
</script>

<style lang="less" scoped>
.charging-types,
.charging-runing {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  .tabs {
    margin-top: 10px;
  }

  .num-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    :deep(.num-card) {
      width: 49%;
      padding: 10px 0 10px;
      // padding: 24px 0 18px;
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

  .ec-wrap {
    margin-top: 20px;
  }
}

.charging-runing {
  .tabs {
    margin-top: 10px;
  }

  .num-wrap {
    margin-top: 10px;
  }

  .ec-wrap {
    margin-top: 10px;
  }
}

.charging-realtime-power {
  margin-top: 16px;
}
</style>
