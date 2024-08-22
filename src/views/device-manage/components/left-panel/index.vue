<template>
  <panel>
    <div class="charging-station-num">
      <!-- cdsszl: '充电设施总量'  -->
      <title-column :title="t(`${tHead}.cdsszl`)" :showBtn="true" @handleClick="handleDetailClick" />
      <tabs
        :data="bottomBtnCur === 1 ? chargingStationTabs : chargingStationGunTabs"
        @changeTab="(data) => handleChangeTab(data, 'charging-station')"
      />
      <!-- cdzzs: '充电桩总数',  cdqzs: '充电枪总数' -->
      <pie-chart
        class="device-total-pie"
        :data="chargingStationPieData"
        :totalName="bottomBtnCur === 1 ? t(`${tHead}.cdzzs`) || '充电桩总数' : t(`${tHead}.cdqzs`) || '充电枪总数'"
        :mode="isCanChoose ? 'canChoose' : 'default'"
        @choose="handleChoose"
        :colors="totalCurCode === 1 ? chargingStationColors : chargingGunColors"
      />
    </div>
    <div class="charging-peak-area">
      <!-- xzqcdcsqk: '行政区充电次数情况' -->
      <title-column
        :title="t(`${tHead}.xzqcdcsqk`)"
        :showTabBtn="true"
        :tabList="[
          { value: 1, name: '日', displayName: t(`${tHead}.tabList.day`) },
          { value: 2, name: '月', displayName: t(`${tHead}.tabList.month`) },
          { value: 3, name: '年', displayName: t(`${tHead}.tabList.year`) }
        ]"
        @handleTabBtn="handleYearBtn"
      />
      <area-rank-list :data="areaRankData" :totalNum="areaTotalNum" height="2.2rem" />
    </div>
    <div class="charging-num-images">
      <!-- cdzszls: '充电站数字孪生'  -->
      <title-column :title="t(`${tHead}.cdzszls`)" />
      <charging-num-images :data="chargingNum" />
    </div>
  </panel>
  <charging-station-list-dialog
    v-if="dialogTotalVisible"
    :visible="dialogTotalVisible"
    @close="handleClose"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, toRefs, watch, computed } from 'vue';
import { selectChargeCount, selectChargeCountByArea, selectHrStationInfo } from '../../api.js';
import {
  chargingStationTabsFun,
  chargingStationGunTabsFun,
  chargingStationPieDataFun
} from '../../config.js';
import ChargingNumImages from '../charging-num-images.vue';
import ChargingStationListDialog from '../charging-station-list-dialog.vue';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `device-manage.left-panel`;

const props = defineProps({
  bottomBtnCur: {
    type: Number,
    default: 1
  },
  totalCurCode: {
    type: Number,
    default: 1
  }
});

const { bottomBtnCur, totalCurCode } = toRefs(props);
const emit = defineEmits([
  'handleBottomBtnCurChange',
  'handleTotalCurCodeChange',
  'handleChargeTypeChange'
]);
const chargingStationColors = ['#E5CC48', '#3254DD', '#4BDEFF', '#BEE5FB', '#ED8ECA'];
const chargingGunColors = ['#E5CC48', '#3254DD', '#4BDEFF', '#ED8ECA', '#BEE5FB'];
// 行政区充电次数情况时间
const dayType = ref(1);
// 充电设施总量详情弹框
const dialogTotalVisible = ref(false);

const chargingStationData = ref(null);
// 充电设施总览 - 充电桩/枪数量信息
const chargingStationTabs = ref(chargingStationTabsFun());
const chargingStationGunTabs = ref(chargingStationGunTabsFun());
const chargingStationPieData = ref([]);
const chargeTab = ref('cdzlx');
// 设备管理/充电站数字孪生
const chargingNum = ref([]);
//充电高峰区域情况
const areaRankData = ref([]);
const areaTotalNum = ref(0);
// 充电设施总量
const handleChoose = (item) => {
  console.log('充电设施总量', item);
  if (chargeTab.value === 'cdzlx' || chargeTab.value === 'cdqlx') {
    emit('handleChargeTypeChange', item);
  }
};
// 充电设施总量详情
const handleDetailClick = () => {
  dialogTotalVisible.value = true;
};
const handleChangeTab = (data, type) => {
  chargeTab.value = data.code;
  if (type === 'charging-station') {
    //切换充电桩数量信息
    if (data.code === 'cdzlx') {
      emit('handleTotalCurCodeChange', data.index);
    }
    getSelectChargeCount(data.code);
  }
};
// 设备管理/充电桩数量
const getSelectChargeCount = async (code) => {
  // if (!chargingStationData.value) {
  const res = await selectChargeCount({ type: bottomBtnCur.value });
  chargingStationData.value = res.data;
  // }
  chargingStationPieData.value = chargingStationPieDataFun(code, chargingStationData.value);
};
//设备管理/行政区充电次数情况
const getSelectChargeCountByArea = async () => {
  const res = await selectChargeCountByArea({ dayType: dayType.value });
  if (res?.data) {
    areaRankData.value = res.data.map((item) => {
      return {
        num: item.chargeCount,
        unit: t(`${tHead}.unitCi`) || '次',
        name: item.areaName
      };
    });
    areaTotalNum.value = res.data[0].chargeCount;
  } else {
    areaRankData.value = [];
    areaTotalNum.value = 0;
  }
};
//设备管理/充电站数字孪生
const getSelectHrStationInfo = async () => {
  const res = await selectHrStationInfo();
  if (res?.data?.length) {
    chargingNum.value = res.data.sort((a, b) => a.sort - b.sort);
  } else {
    chargingNum.value = [];
  }
};
const handleClose = () => {
  dialogTotalVisible.value = false;
};
// 行政区充电次数情况tab点击
const handleYearBtn = (item) => {
  console.log('item', item);
  dayType.value = item.value;
  getSelectChargeCountByArea();
};
watch(
  () => bottomBtnCur.value,
  (newVal) => {
    // 重新获取充电设施总量
    console.log(newVal);
    if (newVal === 1) {
      chargeTab.value = 'cdzlx';
    } else {
      chargeTab.value = 'cdqlx';
    }
    getSelectChargeCount(chargeTab.value);
  }
);
const isCanChoose = computed(() => ['cdzlx', 'cdqlx'].includes(chargeTab.value));
onMounted(() => {
  getSelectChargeCount(chargeTab.value);
  getSelectChargeCountByArea();
  getSelectHrStationInfo();
});
</script>

<style lang="less" scoped>
.charging-station-num {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  .tabs {
    margin-top: 16px;
  }

  .pie-wrap {
    margin-top: 20px;
    flex: 1;
    height: 0;
  }
}

.charging-peak-area {
  flex: 1;
  height: 0;
  .area-rank-wrap {
    margin-top: 16px;
  }
}

.charging-num-images {
  margin-top: 22px;

  .images-wrap {
    margin-top: 16px;
  }
}
.device-total-pie {
  :deep(.legend-wrap) {
    height: 164px;
  }
}
</style>
