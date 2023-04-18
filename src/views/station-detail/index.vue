<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 15:04:38
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-17 17:31:56
 * @FilePath: \epcsp-dp-web\src\views\station-detail\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <page-num :data="pageNumData" />
  <panel>
    <div class="station-info">
      <title-column title="充电站点信息" />
      <station-info/>
    </div>
    <div class="device-info">
      <title-column title="设备设施信息" />
      <div class="num-wrap">
        <template v-for="(item, index) in deviceInfoData" :key="index">
          <num-card :data="item" type="left-right" classStyleType="leftRightStyle1" />
        </template>
      </div>
    </div>
    <div class="warning-message">
      <title-column title="告警信息" />
      <warning-tabs :data="warningTabsData" />
      <warning-list :data="warningListData" height="2.15rem" />
    </div>
  </panel>
  <panel type="right">
    <div class="charging-bar-state">
      <title-column title="站点充电桩状态" />
        <charging-state/>
    </div>
    <div class="device-use-info">
      <title-column title="充电设施日使用信息" />
      <tabs
        :data="chargingTypesTabs"
        @changeTab="(data) => handleChangeTab(data, 'charging-types')"
      />
      <div class="num-wrap">
        <template v-for="(item, index) in chargingTypesData" :key="index">
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
    </div>
    <div class="station-power">
        <title-column title="站点实时功率" />
        <line-time-chart :data="linePowerData" :colors="['#00FFF9']" :chartStyle="{height:'2.05rem'}" />
    </div>
  </panel>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import stationInfo from './components/station-info.vue'
import chargingState from './components/charging-state.vue'
import {
    pageNumFun,
    deviceInfoDataFun,
    warningTabsDataFun,
    warningListFun,
    chargingTypesTabsFun,
    chargingTypesFun,
    linePowerDataFun
} from './config.js';
const pageNumData = ref(pageNumFun());
const deviceInfoData = ref(deviceInfoDataFun());
//告警信息
const warningTabsData = ref(warningTabsDataFun());
const warningListData = ref(warningListFun());
//充电设施日使用信息
const chargingTypesTabs = ref(chargingTypesTabsFun())
const chargingTypesData = ref(chargingTypesFun());

// 站点实时功率
const linePowerData = ref(linePowerDataFun())
</script>
<style lang="less" scoped>
.device-info {
  margin-top: 20px;
  :deep(.num-wrap) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-top: 14px;
    .num-card {
      margin-bottom: 10px;
      &:nth-last-child(1),
      &:nth-last-of-type(2) {
        margin-bottom: 0;
      }
      .icon {
        width: 90px;
        height: 94px;
      }
      .info {
        flex-direction: column;
        .num .value {
          font-size: 40px;
        }
        .name {
          margin-bottom: 0;
        }
      }
    }
  }
}
.warning-message {
  margin-top: 16px;
  .warning-tabs {
    margin-top: 10px;
  }
  .warning-list {
    margin-top: 15px;
  }
}
.device-use-info {
  margin-top: 30px;
  .num-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    :deep(.num-card) {
      width: 49%;
      padding: 24px 0 18px;
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
}
.station-power {
  margin-top: 15px;
  .ec-wrap {
    margin-top: 12px;
  }
}
</style>
