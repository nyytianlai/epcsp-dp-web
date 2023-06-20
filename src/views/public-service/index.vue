<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 11:33:28
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-23 10:03:27
 * @FilePath: \epcsp-dp-web\src\views\public-service\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <page-num :data="pageNumData" />
  <panel>
    <div class="citizens-feedback">
      <title-column title="市民反馈情况" :showBtn="true" @handleClick="handleOpenCityzensDialog" />
      <div class="ec-box">
        <ec-resize :option="ecOption" />
      </div>

      <!-- <scroll-table :styleWrap="{ height: '3.88rem' }" :data="feedBackData" /> -->
    </div>
    <div class="hot-charging">
      <title-column
        title="热门充电站排名"
        :showBtn="true"
        @handleClick="handleDetailClick"
        :showTabBtn="true"
        :tabList="[
          { value: 'day', name: '日' },
          { value: 'month', name: '月' },
          { value: 'year', name: '年' }
        ]"
        @handleTabBtn="handleYearBtn"
      />
      <tabs :data="chargingStationTabs" @changeTab="(data) => handleChangeTabCharge(data)" />
      <rank-list
        :data="codeCharge === 1 ? chargePower : chargeTimes"
        :totalNum="codeCharge === 1 ? chargePowerTotal : chargeTimesTotal"
        height="4.5rem"
      />
    </div>
  </panel>
  <panel type="right">
    <div class="today-runing">
      <title-column title="今日储能电站运行信息" icon="energy-station" />
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
        :chartStyle="{ height: '2.2rem' }"
      />
      <!-- <tabs
        :data="chargingTypesTabs"
        @changeTab="(data) => handleChangeTab(data, 'charging-types')"
      />
      <pie-chart :data="chargingTypePieData" /> -->
    </div>
    <div class="month-rate">
      <title-column title="行政区设备利用率情况" />
      <area-rank-list :data="monthRateData" :totalNum="totalMonthRateNum" height="3rem" />
    </div>
  </panel>
  <map-layer :ref="(el) => (mapLayerRef = el)" v-if="aircityObj"></map-layer>
  <hot-station-rank-dialog
    v-if="dialogTableVisibleHot"
    :visible="dialogTableVisibleHot"
    :timeType="timeType"
    @closed="handleCloseHotDialog"
  />
  <citizens-feedback-dialog
    v-if="dialogVisibleCitizens"
    :visible="dialogVisibleCitizens"
    @closed="handleCloseCitizensDialog"
  />
</template>
<script lang="ts" setup>
import { ref, onMounted, inject, watch, nextTick } from 'vue';
import {
  hotCharging,
  monthRate,
  personFeedback,
  selectChargeEquipmentStatistics,
  overTotalCount,
  getChargeStatus
} from './api.js';
import {
  clientInfo,
  clientRealtimeTrend,
  lineStateDataFun,
  pageNumFun,
  chargingStationTabsFun,
  deviceDataFun,
  chargingTypesTabsFun,
  chargingTypePieDataFun,
  ecOptionFun
} from './config.js';
// import ScrollTable from './components/scroll-table.vue';
import MapLayer from './components/map-layer.vue';
import HotStationRankDialog from './components/hot-station-rank-dialog.vue';
import CitizensFeedbackDialog from './components/citizens-feedback-dialog.vue';
import ClientUsage from './components/client-usage.vue';
import EcResize from '@sutpc/vue3-ec-resize';

const aircityObj = inject('aircityObj');
let mapLayerRef = ref(null);
const mapData = ref([]);
const lineStateColor = ['#F9E900'];
const lineStateData = lineStateDataFun();
//客户端使用情况
const clientUsageCount = ref(318878);
// 热门弹窗
const dialogTableVisibleHot = ref(false);
const ecOption = ref(ecOptionFun());
// 年月日
const timeType = ref('day');
// 市民弹窗
const dialogVisibleCitizens = ref(false);
// 充电tab
const chargingStationTabs = ref(chargingStationTabsFun());
// 头部累计数据
const pageNumData = ref(pageNumFun());
// 实时设备信息
const deviceData = ref(deviceDataFun());
const chargingTypesTabs = ref(chargingTypesTabsFun());
const chargingTypePieData = ref(chargingTypePieDataFun());
// 本月利用率情况
const monthRateData = ref([]);
const totalMonthRateNum = ref(0);

const feedBackData = ref([]);
// 总览上面4个指标
const getOverTotalCount = async () => {
  const res = await overTotalCount();
  pageNumData.value = pageNumFun(res.data);
};
// 充电功率
const chargePower = ref([]);
// 充电次数
const chargeTimes = ref([]);
// 充电功率总量
const chargePowerTotal = ref(0);
// 充电次数总量
const chargeTimesTotal = ref(0);
// 充电tab
const codeCharge = ref(1);

// 热门充电站TOP10
const getHotCharging = async () => {
  const res = await hotCharging({
    timeType: timeType.value,
    sortBy: 'desc',
    sortField: codeCharge.value === 1 ? 'power' : 'amount'
  });
  if (res?.data) {
    chargePower.value = res?.data.map((item) => {
      return {
        num: Number(item.power),
        unit: 'kW',
        name: item.name
      };
    });
    chargePowerTotal.value = Number(chargePower.value[0].num);
    chargeTimes.value = res?.data.map((item) => {
      return {
        num: item.amount,
        unit: '次',
        name: item.name
      };
    });
    chargeTimesTotal.value = chargeTimes.value[0].num;
  } else {
    chargePower.value = [];
    chargeTimes.value = [];
  }
};
// 右下-本月日均利用率
const getMonthRate = async () => {
  const res = await monthRate();
  if (res?.data && res?.data?.data) {
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
const getPersonFeedback = async () => {
  const res = await personFeedback();
  feedBackData.value = res?.data || [];
  const data = feedBackData.value.map((i) => i.amount);
  const axis = feedBackData.value.map((i) => i.name);
  ecOption.value = ecOptionFun(data, axis);
};
// 左一tab切换
const handleChangeTabCharge = (data) => {
  codeCharge.value = data.code;
  getHotCharging();
};
// 左一年月日切换
const handleYearBtn = (item) => {
  timeType.value = item.value;
  getHotCharging();
};
//热门充电站详情
const handleDetailClick = () => {
  dialogTableVisibleHot.value = true;
};

const handleCloseHotDialog = () => {
  dialogTableVisibleHot.value = false;
};

// 打开/关闭市民反馈问题详情
const handleOpenCityzensDialog = () => {
  dialogVisibleCitizens.value = true;
};
const handleCloseCitizensDialog = () => {
  dialogVisibleCitizens.value = false;
};

onMounted(() => {
  getOverTotalCount();
  getHotCharging();
  getMonthRate();
  getPersonFeedback();
  getChargeEquipmentStatistics();
  getChargeStatusData('pile');
});

watch([aircityObj, mapData], async () => {
  await nextTick();
  mapLayerRef.value?.sendBarData(mapData.value);
});
</script>

<style lang="less" scoped>
.hot-charging {
  margin-top: 24px;
  .rank-list-wrap {
    margin-top: 16px;
  }
  .tabs {
    margin-top: 10px;
  }
}
.citizens-feedback {
  margin-top: 20px;
  .el-table {
    margin-top: 11px;
  }
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
  margin-top: 20px;
  .area-rank-wrap {
    margin-top: 23px;
  }
}
.filter {
  cursor: pointer;
}
.detail {
  color: #4bdeff;
  text-decoration: none;
}
.ec-box {
  height: 288px;
  width: 100%;
  margin-top: 12px;
}
</style>
