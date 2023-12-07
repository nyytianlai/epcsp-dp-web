<template>
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
import { ref, onMounted } from 'vue';
import { chargingStationTabsFun, ecOptionFun } from '../../config.js';
import { hotCharging, personFeedback } from '../../api.js';
import EcResize from '@sutpc/vue3-ec-resize';
import HotStationRankDialog from '../hot-station-rank-dialog.vue';
import CitizensFeedbackDialog from '../citizens-feedback-dialog.vue';
// 市民弹窗
const dialogVisibleCitizens = ref(false);
// 热门弹窗
const dialogTableVisibleHot = ref(false);
const ecOption = ref(ecOptionFun());
const feedBackData = ref([]);
// 充电tab
const chargingStationTabs = ref(chargingStationTabsFun());
// 充电功率
const chargePower = ref([]);
// 充电次数
const chargeTimes = ref([]);
// 充电功率总量
const chargePowerTotal = ref(0);
// 充电次数总量
const chargeTimesTotal = ref(0);
// 年月日
const timeType = ref('day');
// 充电tab
const codeCharge = ref(1);

// 热门充电站TOP10
const getHotCharging = async () => {
  const res = await hotCharging({
    timeType: timeType.value,
    sortBy: 'desc',
    sortField: codeCharge.value === 1 ? 'power' : 'amount'
  });
  if (res?.data && res.data.length) {
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
// 打开/关闭市民反馈问题详情
const handleOpenCityzensDialog = () => {
  dialogVisibleCitizens.value = true;
};
const handleCloseCitizensDialog = () => {
  dialogVisibleCitizens.value = false;
};
//热门充电站详情
const handleDetailClick = () => {
  dialogTableVisibleHot.value = true;
};

const handleCloseHotDialog = () => {
  dialogTableVisibleHot.value = false;
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

const getPersonFeedback = async () => {
  const res = await personFeedback();
  feedBackData.value = res?.data || [];
  const data = feedBackData.value.map((i) => i.amount);
  const axis = feedBackData.value.map((i) => i.name);
  ecOption.value = ecOptionFun(data, axis);
};
onMounted(() => {
  getHotCharging();
  getPersonFeedback();
});
</script>

<style lang="less" scoped>
.hot-charging {
  flex: 1;
  height: 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  .rank-list-wrap {
    margin-top: 16px;
    flex: 1;
    height: 0;
  }
  .tabs {
    margin-top: 10px;
  }
}
.citizens-feedback {
  flex: 1;
  height: 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  .el-table {
    margin-top: 10px;
  }
}
.ec-box {
  width: 100%;
  flex: 1;
  height: 0;
  margin-top: 12px;
}
</style>
