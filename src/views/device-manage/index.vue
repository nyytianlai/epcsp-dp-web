<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 12:55:20
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-20 17:36:12
 * @FilePath: \epcsp-dp-web\src\views\overall\overview\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <page-num :data="pageNumData" />
    <panel>
      <div class="charging-station-num "> 
        <title-column title="充电桩数量信息" />
        <tabs :data="chargingStationTabs" 
        @changeTab="(data)=>handleChangeTab(data,'charging-station')" />
        <pie-chart :data="chargingStationPieData"/>
      </div>
      <div class="charging-peak-area">
        <title-column title="充电高峰区域情况" />
        <area-rank-list :data="areaRankData" :totalNum="areaTotalNum" />
      </div>
      <div class="charging-num-images">
        <title-column title="充电站数字孪生" />
        <charging-num-images :data="chargingNum"  />
      </div>
    </panel>
    <panel type="right">
      <title-column title="在线运行状态情况" />
      <charging-realtime-power :data="chargingRealPower"/>
      <div class="charging-types">
        <tabs :data="chargingTypesTabs" 
        @changeTab="(data)=>handleChangeTab(data,'charging-types')" />
        <div class="num-wrap">
          <template v-for="(item, index) in chargingTypesData" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
        <line-time-chart :data="lineStateData" :colors="['green','blue']"/>
      </div>
      <div class="charging-runing">
        <tabs :data="chargingRunTabs" @changeTab="(data)=>handleChangeTab(data,'charging-runing')" />
        <div class="num-wrap">
          <template v-for="(item, index) in chargingRunData" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
        <line-time-chart :data="lineRunData" unit="%" :colors="['green','#FF7723']"/>
      </div>
    </panel>
  <map-layer></map-layer>
</template>
<script setup>
  import { ref, onMounted,reactive } from 'vue';
import MapLayer from './components/map-layer.vue'
import ChargingNumImages from './components/charging-num-images.vue'
import ChargingRealtimePower from './components/charging-realtime-power.vue'
import {
  selectChargeCount,
  selectChargeCountByArea,
  selectChargeEquipmentStatistics,
  selectHrStationInfo,
  selectPowerSumByDayTime,
  selectChargeEquipmentStatus,
  selectChargeEquipmentStatusByTime,
  selectChargeEquipmentUseRate,
  selectChargeEquipmentUseRateByTime
} from '@/api/deviceManage.js'
import {
  pageNumFun,
  chargingStationTabsFun,
  chargingStationPieDataFun,
  areaRankDataFun,
  chargingTypesTabsFun,
  chargingTypesFun,
  lineStateDataFun,
  chargingRunTabsFun,
  chargingRunDataFun,
  lineRunDataFun
} from './config.js';
// 头部累计数据
const pageNumData = ref(pageNumFun());
// 充电桩数量信息
const chargingStationTabs = ref(chargingStationTabsFun())
const chargingStationPieData = ref(chargingStationPieDataFun())
//充电高峰区域情况
const areaRankData = ref([])
const areaTotalNum = ref(0)
// 设备管理/充电站数字孪生
const chargingNum = ref([])
//设备管理/在线运行状态情况
const chargingRealPower = ref(0)
//充电状态
const chargingTypesTabs = ref(chargingTypesTabsFun())
const chargingTypesData = ref(chargingTypesFun());
const lineStateData = ref(lineStateDataFun())
// 充电运行情况
const chargingRunTabs = ref(chargingRunTabsFun())
const chargingRunData = ref(chargingRunDataFun())
const lineRunData = ref(lineRunDataFun())
//设备管理/标题下四个统计数
const getSelectChargeEquipmentStatistics = async () => {
  const res = await selectChargeEquipmentStatistics()
  pageNumData.value = pageNumFun(res.data)
}
// 设备管理/充电桩数量
const getSelectChargeCount = async(type) => {
  const res = await selectChargeCount()
  chargingStationPieData.value = chargingStationPieDataFun(type,res.data)
}
//设备管理/充电高峰区域情况
const getSelectChargeCountByArea = async () => {
  const res = await selectChargeCountByArea()
  if (res?.data) {
    areaRankData.value = res.data.map(item => {
      return {
        num:item.chargeCount,
        unit:'次',
        name:item.areaName
      }
    })
    areaTotalNum.value = res.data[0].chargeCount
  } else {
    areaRankData.value = []
    areaTotalNum.value = 0
  }
}
//设备管理/充电站数字孪生
const getSelectHrStationInfo = async () => {
  const res = await selectHrStationInfo()
  chargingNum.value = res.data || []
}
// 设备管理/在线运行状态情况
const getSelectPowerSumByDayTime = async () => {
  const res = await selectPowerSumByDayTime()
  chargingRealPower.value = res?.data
}
// 设备管理/充电桩-枪状态
const getSelectChargeEquipmentStatus = async (type) => {
  const res = await selectChargeEquipmentStatus(type)
  chargingTypesData.value = chargingTypesFun(res.data)
}
//设备管理/充电桩-枪状态分时列表
const getChargeEquipmentStatusByTime = async (type) => {
  const res = await selectChargeEquipmentStatusByTime(type)
  lineStateData.value = lineStateDataFun(res.data)
}

const getChargeEquipmentUseRate = async (type) => {
  const res = await selectChargeEquipmentUseRate(type)
  chargingRunData.value = chargingRunDataFun(res.data)
}
//设备管理/充电桩-枪运行情况分时列表
const getChargeEquipmentUseRateByTime = async (type) => {
  const res = await selectChargeEquipmentUseRateByTime(type)
  lineRunData.value = lineRunDataFun(res.data)
}
onMounted(() => {
  getSelectChargeCount(1)
  getSelectChargeCountByArea()
  getSelectChargeEquipmentStatistics()
  getSelectHrStationInfo()
  getSelectPowerSumByDayTime()
  getSelectChargeEquipmentStatus(1)
  getChargeEquipmentStatusByTime(1)
  getChargeEquipmentUseRate(1)
  getChargeEquipmentUseRateByTime(1)
})
const handleChangeTab = (data, type) => {
  if (type === 'charging-station') {
    //切换充电桩数量信息
    getSelectChargeCount(data.code)
  } else if (type === 'charging-types') {
    // 设备管理/充电桩-枪状态
    getSelectChargeEquipmentStatus(data.code)
    getChargeEquipmentStatusByTime(data.code)
  } else if (type === 'charging-runing') {
    // 运行情况
    getChargeEquipmentUseRate(data.code)
    getChargeEquipmentUseRateByTime(data.code)
  }
};
</script>
<style lang="less" scoped>
.charging-station-num {
  .tabs {
    margin-top: 4px;
  }
  .pie-wrap {
    margin-top: 21px;
  }
}
.charging-peak-area {
  margin-top: 22px;
  .area-rank-wrap {
    margin-top: 16px;
  }
}
.charging-num-images {
  margin-top: 26px;
}
.charging-types,
.charging-runing {
  .tabs {
    margin-top: 13px;
  }
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
  .ec-wrap {
    margin-top: 18px;
  }
}
.charging-runing {
  .tabs {
    margin-top: 28px;
  }
  .num-wrap {
    margin-top: 20px;
  }
  .ec-wrap {
    margin-top: 22px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
