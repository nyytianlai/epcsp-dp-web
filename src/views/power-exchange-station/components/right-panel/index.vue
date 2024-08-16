<template>
  <panel type="right">
    <div class="right-box-wrap">
      <div class="box box1">
        <title-column
          :title="$t('power-exchange-station.panelTitle.cnzztxx')"
          icon="energy-station"
        />
        <pie-chart
          :data="powerExchangeStatusData"
          :totalName="`${$t('power-exchange-station.panelTitle.cnz')}/${$t(
            'power-exchange-station.unit.unitGe'
          )}`"
          :colors="powerExchangeChartColor"
        />
        <!-- 储能站/个 -->
      </div>
      <div class="box power-msg-today">
        <title-column
          :title="$t('power-exchange-station.panelTitle.jrhdcsxx')"
          icon="chargings-replacement"
        />
        <div class="num-wrap">
          <template v-for="(item, index) in powerTodayCard" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
        <div class="ec-box">
          <ec-resize :option="powerTodayCardOption" />
        </div>
      </div>
      <div class="box today-warning-message">
        <title-column
          :title="$t('power-exchange-station.panelTitle.jrgjxx')"
          icon="chargings-replacement"
        />
        <warning-list height="2.9rem" :data="warningListData" @handleClick="handleWarnClick" />
      </div>
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';
import {
  powerExchangeStatusDataFun,
  powerTodayCardFun,
  powerTodayCardOption,
  handlePowerTodayLineData,
  warnData
} from '../../config';
import EcResize from '@sutpc/vue3-ec-resize';
const powerExchangeChartColor = ['#E5CC48', '#3254DD', '#4BDEFF'];
const state = reactive({
  powerExchangeStatusData: powerExchangeStatusDataFun(),
  powerTodayCard: powerTodayCardFun(),
  warningListData: []
});
const { powerExchangeStatusData, powerTodayCard, warningListData } = toRefs(state);
// 告警信息初始化
const init = () => {
  state.warningListData = warnData;
};
const handleWarnClick = () => {};
onMounted(() => {
  init();
});
</script>

<style lang="less" scoped>
.right-box-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  .box {
    flex: 1;
    height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .box1 {
    flex: 0;
    height: 220px;
  }
}
.power-msg-today {
  .num-wrap {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    :deep(.num-card) {
      padding: 20px 0;
      width: 49%;
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
}
.today-warning-message {
  margin-top: 20px;
  :deep(.warning-list) {
    margin-top: 16px;
  }
}

.ec-box {
  height: 194px;
}
</style>
