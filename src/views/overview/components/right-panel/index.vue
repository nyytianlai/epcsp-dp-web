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
        <title-column :title="t(`${tHead}.ccsslngmtj`)" />
        <tabs :data="stationTabType" @changeTab="handleStation" />
        <div class="ec-box">
          <ec-resize :option="ecOption" />
        </div>
      </div>
      <div class="box carbon-sort">
        <!-- 分类碳减排量 fltjpl: '分类碳减排量' -->
        <title-column :title="t(`${tHead}.fltjpl`)" />
        <!-- <ec-resize :option="lineCarbonOption" /> -->
        <!-- 吨 ton: '吨' -->
        <line-time-chart
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
  console.log('item', item);
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
        [16.24, 20.45, 28.04, 51.85, 82.73],
        ['2020年', '2021年', '2022年', '2023年', '2024年'],
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
const powerInfoNumData = ref(0);
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
    powerInfoNumData.value = info.realTimePower;
  }
};

onMounted(async () => {
  loadYearChargingStation();
  getTimePowerGraph();
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
</style>
