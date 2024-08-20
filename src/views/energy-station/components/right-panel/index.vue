<template>
  <panel type="right">
    <div class="today-runing">
      <title-column :title="$t('energy-station.panelTitle.jrcnzyxxx')" icon="energy-station" />
      <charging-realtime-power :data="chargingRealPower" />
      <div class="num-wrap">
        <template v-for="(item, index) in runingData" :key="index">
          <num-card :data="item" type="left-right" classStyleType="leftRightStyle1" />
        </template>
      </div>
      <tabs :data="todayLine" />
      <line-time-chart-both
        :data="lineStateData"
        :colors="lineStateColor"
        unit="MW"
        mode="noneArea"
        :chartStyle="{ height: '2.3rem' }"
        :customOption="{ grid: { top: scale(48), right: scale(32) } }"
      />
    </div>
    <div class="social-benefit">
      <title-column :title="$t('energy-station.panelTitle.shxyxx')" icon="energy-station" />
      <div class="num-wrap">
        <template v-for="(item, index) in socialBenefit" :key="index">
          <num-card :data="item" />
        </template>
      </div>
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { runingFun, todayLine, linePowerDataFun, socialBenefitFun } from '../../config.js';
import ChargingRealtimePower from '../charging-realtime-power.vue';
import { scale } from '@sutpc/config';

const lineStateColor = ['green', '#FF7723'];
// 今日最大顶峰能力
const chargingRealPower = ref(69.02);
// 储能电站运行信息
const runingData = ref(runingFun());
// 折线图
const lineStateData = ref(linePowerDataFun());
// 社会效益信息
const socialBenefit = ref(socialBenefitFun());
</script>

<style lang="less" scoped>
.today-runing {
  flex: 2;
  height: 0;
  display: flex;
  flex-direction: column;
  :deep(.unit-box) {
    margin-top: 4px;
  }
  .charging-realtime-power {
    margin-top: 10px;
  }

  .num-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;

    .num-card {
      margin-bottom: 10px;

      &:nth-last-of-type(1),
      &:nth-last-of-type(2) {
        margin-bottom: 0;
      }
    }
  }

  :deep(.tabs) {
    margin-top: 22px;
  }

  :deep(.ec-wrap) {
    flex: 1;
    height: 0;
    margin-top: 10px;
  }
}

.social-benefit {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  container-type: inline-size;
  resize: horizontal;
  container-name: benefit;
  .num-wrap {
    display: flex;
    justify-content: space-between;
    flex: 1;
    height: 0;
    padding: 20px 20px;
    margin-top: 16px;
    background: linear-gradient(
      258.38deg,
      rgba(37, 177, 255, 0.1) 2.46%,
      rgba(37, 177, 255, 0) 100%
    );
    mix-blend-mode: normal;
    box-shadow: inset 0px 0px 35px rgba(41, 76, 179, 0.2);
    filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.04));
    border-radius: 2px;
    :deep(.unit) {
      text-align: center;
      color: #64def6;
      font-size: 12px;
      display: block;
    }
    > div {
      flex: 1;
      min-width: 0;
    }
  }
}
@container benefit (min-width: 600px) {
  .num-wrap {
    @{deep} {
      .num-card {
        display: flex;
        flex-direction: row;
        .icon {
          width: 100px;
        }
      }
    }
  }
}
</style>
