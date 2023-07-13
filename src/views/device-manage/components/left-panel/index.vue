<template>
  <panel>
    <div class="charging-station-num">
      <title-column title="充电设施总量" :showBtn="true" @handleClick="handleDetailClick" />
      <tabs
        :data="bottomBtnCur === 1 ? chargingStationTabs : chargingStationGunTabs"
        @changeTab="(data) => handleChangeTab(data, 'charging-station')"
      />
      <pie-chart
        class="device-total-pie"
        :data="chargingStationPieData"
        :totalName="bottomBtnCur === 1 ? '充电桩总数' : '充电枪总数'"
        :mode="totalCurCode === 1 ? 'canChoose' : 'default'"
        @choose="handleChoose"
        :colors="totalCurCode === 1 ? chargingStationColors : chargingGunColors"
      />
    </div>
    <div class="charging-peak-area">
      <title-column
        title="行政区充电次数情况"
        :showTabBtn="true"
        :tabList="[
          { value: 1, name: '日' },
          { value: 2, name: '月' },
          { value: 3, name: '年' }
        ]"
        @handleTabBtn="handleYearBtn"
      />
      <area-rank-list :data="areaRankData" :totalNum="areaTotalNum" height="2.2rem" />
    </div>
    <div class="charging-num-images">
      <title-column title="充电站数字孪生" />
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
import { ref, onMounted, toRefs, watch } from 'vue';
import { selectChargeCount, selectChargeCountByArea, selectHrStationInfo } from '../../api.js';
import {
  chargingStationTabsFun,
  chargingStationGunTabsFun,
  chargingStationPieDataFun
} from '../../config.js';
import ChargingNumImages from '../charging-num-images.vue';
import ChargingStationListDialog from '../charging-station-list-dialog.vue';
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
const chargingStationColors = ['#E5CC48', '#3254DD', '#4BDEFF', '#BEE5FB'];
const chargingGunColors = ['#E5CC48', '#3254DD', '#4BDEFF', '#ED8ECA', '#BEE5FB'];
// 行政区充电次数情况时间
const dayType = ref(1);
// 充电设施总量详情弹框
const dialogTotalVisible = ref(false);

const chargingStationData = ref(null);
// 充电桩数量信息
const chargingStationTabs = ref(chargingStationTabsFun());
const chargingStationGunTabs = ref(chargingStationGunTabsFun());
const chargingStationPieData = ref(chargingStationPieDataFun());
// 设备管理/充电站数字孪生
const chargingNum = ref([]);
//充电高峰区域情况
const areaRankData = ref([]);
const areaTotalNum = ref(0);
// 充电设施总量
const handleChoose = (item) => {
  console.log('充电设施总量', item);
  emit('handleChargeTypeChange', item);
};
// 充电设施总量详情
const handleDetailClick = () => {
  dialogTotalVisible.value = true;
};
const handleChangeTab = (data, type) => {
  if (type === 'charging-station') {
    //切换充电桩数量信息
    if (data.code === 1) {
      emit('handleTotalCurCodeChange', data.code);
    }
    getSelectChargeCount(data.code, bottomBtnCur.value);
  }
};
// 设备管理/充电桩数量
const getSelectChargeCount = async (type, maintab) => {
  if (!chargingStationData.value) {
    const res = await selectChargeCount({ type: bottomBtnCur.value });
    console.log('res', res);
    chargingStationData.value = res.data;
  }
  chargingStationPieData.value = chargingStationPieDataFun(
    type,
    chargingStationData.value,
    maintab
  );
};
//设备管理/行政区充电次数情况
const getSelectChargeCountByArea = async () => {
  const res = await selectChargeCountByArea({ dayType: dayType.value });
  if (res?.data) {
    areaRankData.value = res.data.map((item) => {
      return {
        num: item.chargeCount,
        unit: '次',
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
watch(
  () => bottomBtnCur.value,
  (newVal) => {
    // 重新获取充电设施总量
    console.log(newVal);
    getSelectChargeCount(totalCurCode.value, bottomBtnCur.value);
  }
);
const handleClose = () => {
  dialogTotalVisible.value = false;
};
// 行政区充电次数情况tab点击
const handleYearBtn = (item) => {
  console.log('item', item);
  dayType.value = item.value;
  getSelectChargeCountByArea();
};
onMounted(() => {
  getSelectChargeCount(1, 1);
  getSelectChargeCountByArea();
  getSelectHrStationInfo();
});
</script>

<style lang="less" scoped>
.charging-station-num {
  .tabs {
    margin-top: 16px;
  }

  .pie-wrap {
    margin-top: 20px;
  }
}

.charging-peak-area {
  margin-top: 17px;

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
