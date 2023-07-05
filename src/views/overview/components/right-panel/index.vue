<template>
  <panel type="right">
    <div class="box station">
      <title-column title="充储设施历年规模统计" />
      <tabs :data="stationTabType" @changeTab="handleStation" />
      <div class="ec-box">
        <ec-resize :option="ecOption" />
      </div>
    </div>
    <div class="box carbon-sort">
      <title-column title="分类碳减排量" />
      <!-- <ec-resize :option="lineCarbonOption" /> -->
      <line-time-chart
        :data="lineCarbonData"
        :colors="co2Color"
        yaxisName="吨"
        mode="onlyLine"
        unit=""
        :chartStyle="{ height: '2.3rem', width: '4.3rem' }"
        :customOption="{ legend: { itemGap: getRemvalue(10), left: 0 } }"
      />
    </div>
    <div class="box ele">
      <title-column title="充储放电数据" />
      <line-time-chart
        :data="lineElectricData"
        :colors="ElectricColor"
        yaxisName="万kwh"
        mode="onlyLine"
        unit=""
        :chartStyle="{ height: '2.3rem', width: '4.3rem' }"
        :customOption="{ legend: { itemGap: getRemvalue(0), left: 0 } }"
      />
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { getRemvalue } from '@/utils/index';
import { onMounted, ref } from 'vue';
import {
  stationTabType,
  ecOptionFun,
  lineCarbonDataFun,
  lineElectricDataFun
} from '../../config.js';
import { yearChargingStation } from '../../api.js';
import EcResize from '@sutpc/vue3-ec-resize';
const co2Color = ['green', 'blue', '#F9E900', '#9A4AFF', '#FF7723'];
const ElectricColor = ['green', 'blue', '#F9E900', '#9A4AFF', '#FF7723'];
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
      ecOption.value = ecOptionFun(chongdianzhan.value, ['2020年', '2021年', '2022年', '2023年']);
      break;
    case 3:
      ecOption.value = ecOptionFun([19, 22, 29, 35], ['2020年', '2021年', '2022年', '2023年'], 3);
      break;
  }
};
// 获取历年
const loadYearChargingStation = async () => {
  const res = await yearChargingStation();
  chongdianzhan.value = (res && res.data) || [];
  // const data = res&&res.data || []
  // console.log('chongdianzhan.value',chongdianzhan.value)
  ecOption.value = ecOptionFun(chongdianzhan.value, ['2020年', '2021年', '2022年', '2023年']);
};

onMounted(async () => {
  loadYearChargingStation();
});
</script>

<style lang="less" scoped>
.box {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  .ec-wrap {
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
  height: 230px;
  width: 100%;
  margin-top: 12px;
}
.line-box {
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid;
  border-image: linear-gradient(
      90deg,
      rgba(0, 106, 207, 0.1) 10%,
      rgba(0, 163, 233, 0.9) 50%,
      rgba(0, 106, 207, 0.1) 100%
    )
    2 2 2 2;
  &:nth-last-of-type(1) {
    border: none;
  }
}
</style>
