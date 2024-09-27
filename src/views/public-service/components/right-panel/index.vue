<template>
  <panel type="right">
    <div class="public-service-wrap">
      <div class="today-runing">
        <!-- kmdsyqk: '客户端使用情况' -->
        <title-column :title="t(`${tHead}.kmdsyqk`)" icon="energy-station" />
        <client-usage :data="clientUsageCount" />
      </div>
      <div class="realtime-info">
        <tabs :data="clientInfo" />
        <div class="num-wrap">
          <template v-for="(item, index) in deviceData" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>

        <tabs :data="clientRealtimeTrend" />
        <line-time-chart
          :data="lineStateData"
          :colors="lineStateColor"
          :chartStyle="{
            width: '100%',
            height: '2.2rem'
          }"
        />
        <!-- <tabs
        :data="chargingTypesTabs"
        @changeTab="(data) => handleChangeTab(data, 'charging-types')"
      />
      <pie-chart :data="chargingTypePieData" /> -->
      </div>
      <div class="month-rate">
        <!-- xzqsblylqk: '行政区设备利用率情况' -->
        <title-column :title="t(`${tHead}.xzqsblylqk`)" />
        <area-rank-list :data="monthRateData" :totalNum="totalMonthRateNum" />
      </div>
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {
  clientInfo,
  clientRealtimeTrend,
  lineStateDataFun,
  deviceDataFun,
  chargingTypePieDataFun
} from '../../config.js';
import { monthRate, selectChargeEquipmentStatistics, getChargeStatus } from '../../api.js';
import ClientUsage from '../client-usage.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `public-service.right-panel`;
//客户端使用情况
const clientUsageCount = ref(318878);
const lineStateColor = ['#F9E900'];
const lineStateData = lineStateDataFun();
const mapData = ref([]);
// 本月利用率情况
const monthRateData = ref([]);
const totalMonthRateNum = ref(0);
// 实时设备信息
const deviceData = ref(deviceDataFun());
const chargingTypePieData = ref(chargingTypePieDataFun());
// 右下-本月日均利用率
const getMonthRate = async () => {
  const res = await monthRate();
  if (res?.data && res?.data?.data && res?.data?.data.length) {
    mapData.value = res?.data?.data;
    monthRateData.value = res?.data?.data.map((item) => {
      return {
        num: item.useRatio,
        unit: '%',
        name: item.area_name
      };
    });
    totalMonthRateNum.value = Number(res?.data?.data[0].useRatio);
  } else {
    monthRateData.value = [];
    totalMonthRateNum.value = 0;
  }
};
const getChargeEquipmentStatistics = async () => {
  const res = await selectChargeEquipmentStatistics();
  deviceData.value = deviceDataFun(res.data);
};
// 实时设备信息饼图
const getChargeStatusData = async (type) => {
  const res = await getChargeStatus(type);
  chargingTypePieData.value = chargingTypePieDataFun(type, res?.data?.data);
};
const handleChangeTab = (data, type) => {
  if (type === 'charging-types') {
    //实时设备信息
    getChargeStatusData(data.code);
  }
};
onMounted(() => {
  getMonthRate();
  getChargeEquipmentStatistics();
  // getChargeStatusData('pile');
});
</script>

<style lang="less" scoped>
.public-service-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
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
  flex: 1;
  height: 0;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  .area-rank-wrap {
    height: 100% !important;
    overflow: auto;
    margin-top: 23px;
  }
}
</style>
