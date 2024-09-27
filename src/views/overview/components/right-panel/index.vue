<template>
  <panel type="right">
    <div class="right-panel-wrap">
      <div class="box ele">
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
      <div class="box station">
        <!-- 充储设施历年规模统计 ccsslngmtj: '充储设施历年规模统计' -->
        <title-column title="充电设施历年规模统计" />
        <tabs :data="stationTabType" @changeTab="handleStation" />
        <div class="ec-box">
          <ec-resize :option="ecOption" />
        </div>
      </div>
      <div class="carbon-sort">
        <!-- 分类碳减排量 fltjpl: '分类碳减排量' -->
        <title-column title="运营商企业充电桩排名top5" />
        <!-- <ec-resize :option="lineCarbonOption" /> -->
        <!-- 吨 ton: '吨' -->
        <!-- <line-time-chart
          :data="lineCarbonData"
          :colors="co2Color"
          :yaxisName="t(`${tHead}.ton`)"
          mode="onlyLine"
          unit=""
          :chartStyle="{
            width: '100%',
            height: '1.89rem'
          }"
          :customOption="{ legend: { itemGap: scale(10), left: 0 } }"
        /> -->
        <rank-list
          class="operating-company__list"
          :data="projectList"
          :totalNum="projectTotalNum"
        />
      </div>
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {
  stationTabType,
  ecOptionFun,
  lineCarbonDataFun,
  lineElectricDataFun
} from '../../config.js';
import { yearChargingStation } from '../../api.js';
import EcResize from '@sutpc/vue3-ec-resize';
import { scale } from '@sutpc/config';
import { lineTimeDataFun } from '@/views/charging-station/config.js';
import { timePowerGraph } from '@/views/charging-station/api.js';
import ChargingRealtimePower from '@/views/charging-station/components/charging-realtime-power.vue';
import { useI18n } from 'vue-i18n';
import { stationOpeTop10 } from '@/views/charging-station/api.js';
const { t } = useI18n();
const tHead = `overview.right-panel`;

const co2Color = ['green', 'blue', '#F9E900', '#9A4AFF', '#FF7723'];
const ElectricColor = ['green', 'blue', '#F9E900', '#9A4AFF', '#FF7723'];
const lineTimeColors = ['blue'];
// 左一柱状图
const chongdianzhan = ref([]);
const ecOption = ref({});
// 左二折线图
const lineCarbonData = ref(lineCarbonDataFun());
// 左三折线图
const lineElectricData = ref(lineElectricDataFun());
// 充电站tab点击
const handleStation = (item) => {
  switch (item.code) {
    case 1:
      ecOption.value = ecOptionFun(chongdianzhan.value, [
        '2020年',
        '2021年',
        '2022年',
        '2023年',
        '2024年'
      ]);
      break;
    case 3:
      ecOption.value = ecOptionFun(
        // [4100, 18270, 29036, 40622, 60953, 84229, 93000, 97000, 126432, 287503, 375669],
        [93000, 97000, 126432, 287503, 375669],
        [
          // '2014年',
          // '2015年',
          // '2016年',
          // '2017年',
          // '2018年',
          // '2019年',
          '2020年',
          '2021年',
          '2022年',
          '2023年',
          '2024年'
        ],
        3
      );
      break;
  }
};
// 获取历年
const loadYearChargingStation = async () => {
  const res = await yearChargingStation();
  chongdianzhan.value = (res && res.data) || [];
  // const data = res&&res.data || []
  // console.log('chongdianzhan.value',chongdianzhan.value)
  ecOption.value = ecOptionFun(chongdianzhan.value, [
    '2020年',
    '2021年',
    '2022年',
    '2023年',
    '2024年'
  ]);
};
// 充电功率
const powerInfoNumData = ref<number | string>(0);
// 充电功率折线
const lineTimeData = ref(lineTimeDataFun());
const getTimePowerGraph = async () => {
  const res = await timePowerGraph();
  lineTimeData.value = lineTimeDataFun(res.data);
  if (res.data.length) {
    const data = res.data || [];
    const info = {
      totalPower: data[data.length - 1].ratedPower,
      realTimePower: data[data.length - 1].realTimePower
    };
    powerInfoNumData.value = Number(info.realTimePower).toFixed(0);
  }
};

const projectTotalNum = ref(0);
const projectList = ref([]);

const getStationOpeTop10 = async () => {
  const res = await stationOpeTop10('pile');
  // console.log(res);
  if (res?.data) {
    const data = res.data.map((item) => {
      return {
        num: item.amount,
        unit: '个', //'个',
        name: item.operatorName
      };
    });
    projectList.value = data?.slice(0, 5);
    projectTotalNum.value = data[0].num || 0;
  } else {
    projectList.value = [];
    projectTotalNum.value = 0;
  }
};

onMounted(async () => {
  loadYearChargingStation();
  getTimePowerGraph();
  getStationOpeTop10();
});
</script>

<style lang="less" scoped>
.right-panel-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.box {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  &.ele {
    flex-grow: 1.2;
  }
  + .box {
    margin-top: 20px;
  }

  .ec-wrap {
    flex: 1;
    height: 0;
    margin-top: 16px;
  }
}

.station {
  :deep(.tabs) {
    margin-top: 16px;

    .tab {
      margin-right: 26px;
    }
  }
}

.ec-box {
  flex: 1;
  min-height: 0;
  width: 100%;
  margin-top: 12px;
}

.operating-company__list {
  // flex: 1;
  // min-height: 0;
  height: 250px;
}
</style>
