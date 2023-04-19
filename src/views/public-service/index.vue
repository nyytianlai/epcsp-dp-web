<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 11:33:28
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-17 14:33:08
 * @FilePath: \epcsp-dp-web\src\views\public-service\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <page-num :data="pageNumData" />
    <panel>
        <div class="hot-charging">
            <title-column title="热门充电站TOP10" />
            <rank-list :data="hotChargingData" :totalNum="totalChargingNum" />
        </div>
        <div class="citizens-feedback">
          <title-column title="市民反馈情况" />
          <scroll-table :styleWrap="{height:'4.8rem'}" />
        </div>
    </panel>
    <panel type="right">
      <div class="realtime-info">
        <title-column title="实时设备信息" />
        <div class="num-wrap">
          <template v-for="(item, index) in deviceData" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
        <tabs :data="chargingTypesTabs" @changeTab="(data)=>handleChangeTab(data,'charging-types')" />
          <pie-chart :data="chargingTypePieData"/>
        </div>
        <div class="month-rate">
          <title-column title="本月利用率情况" />
          <area-rank-list :data="monthRateData" :totalNum="totalMonthRateNum" height="3.74rem" />
        </div>
    </panel>
    <map-layer ref="mapLayerRef"></map-layer>
  </template>
<script setup>
  import { ref, onMounted,reactive } from 'vue';
import ScrollTable from './components/scroll-table.vue'
import MapLayer from './components/map-layer.vue';
import {
  pageNumFun,
  hotChargingDataFun,
  deviceDataFun,
  chargingTypesTabsFun,
  chargingTypePieDataFun,
  monthRateDataFun
} from './config.js'
let mapLayerRef = ref(null);
// 头部累计数据
const pageNumData = ref(pageNumFun());
// 热门充电站TOP10
const hotChargingData = ref(hotChargingDataFun());
const totalChargingNum = ref(10000)
// 实时设备信息
const deviceData = ref(deviceDataFun())
const chargingTypesTabs = ref(chargingTypesTabsFun())
const chargingTypePieData = ref(chargingTypePieDataFun());
// 本月利用率情况
const monthRateData = ref(monthRateDataFun())
const totalMonthRateNum = ref(10000)
const handleChangeTab = (data, type) => {
  console.log(data, type);
  if (type === 'charging-types') {
    //实时设备信息
    chargingTypePieData.value = chargingTypePieDataFun(data.code)
  } 
};
</script>

<style lang="less" scoped>
.hot-charging {
  .rank-list-wrap {
    margin-top: 20px;
  }
}
.citizens-feedback {
  margin-top: 48px;
  .el-table {
    margin-top: 8px;
  }
}
.realtime-info {
  .num-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
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
    margin-top: 10px;
  }
  :deep(.pie-wrap) {
    margin-top: 24px;
    .pie-chart-wrap {
      width: 218px;
      height: 218px;
    }
  }
}
.month-rate {
  margin-top: 18px;
  .area-rank-wrap {
    margin-top: 16px;
  }
}
</style>