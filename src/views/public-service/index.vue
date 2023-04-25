<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 11:33:28
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-23 10:03:27
 * @FilePath: \epcsp-dp-web\src\views\public-service\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <page-num :data="pageNumData" />
    <panel>
        <div class="hot-charging">
            <title-column title="热门充电站TOP10" />
            <rank-list :data="hotChargingData" :totalNum="totalChargingNum" height="3.88rem" />
        </div>
        <div class="citizens-feedback">
          <title-column title="市民反馈情况" />
          <scroll-table :styleWrap="{height:'3.88rem'}" :data="feedBackData" />
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
    <map-layer :ref="(el) => mapLayerRef = el" v-if="aircityObj"></map-layer>
  </template>
<script setup>
  import { ref, onMounted,reactive,inject } from 'vue';
import ScrollTable from './components/scroll-table.vue'
import MapLayer from './components/map-layer.vue';
import {
  hotCharging,
  monthRate,
  personFeedback,
  selectChargeEquipmentStatistics,
  overTotalCount,
  getChargeStatus
} from '@/api/publicService.js'
import {
  pageNumFun,
  hotChargingDataFun,
  deviceDataFun,
  chargingTypesTabsFun,
  chargingTypePieDataFun,
  monthRateDataFun
} from './config.js'
const aircityObj = inject()
let mapLayerRef = ref(null);
// 头部累计数据
const pageNumData = ref(pageNumFun());
// 热门充电站TOP10
const hotChargingData = ref([]);
const totalChargingNum = ref(0)
// 实时设备信息
const deviceData = ref(deviceDataFun())
const chargingTypesTabs = ref(chargingTypesTabsFun())
const chargingTypePieData = ref(chargingTypePieDataFun());
// 本月利用率情况
const monthRateData = ref([])
const totalMonthRateNum = ref(0)

const feedBackData = ref([])
// 总览上面4个指标
const getOverTotalCount = async () => {
  const res = await overTotalCount();
  pageNumData.value = pageNumFun(res.data);
};
// 热门充电站TOP10
const getHotCharging = async () => {
  const res = await hotCharging()
  if (res?.data && res?.data?.data) {
    hotChargingData.value = res?.data?.data.map(item => {
      return {
        num: item.chargingSum,
        unit: 'KW',
        name: item.operator_name
      }
    })
    totalChargingNum.value = res?.data?.data[0].chargingSum
  } else {
    hotChargingData.value = []
    totalChargingNum.value = 0
  }
}
// 右下-本月日均利用率
const getMonthRate = async () => {
  const res = await monthRate()
  if (res?.data && res?.data?.data) {
    mapLayerRef.value.sendBarData(res?.data?.data) //给地图传柱状图数据
    monthRateData.value = res?.data?.data.map(item => {
      return {
        num: item.useRatio,
        unit: '%',
        name: item.area_name
      }
    })
    totalMonthRateNum.value = res?.data?.data[0].useRatio
  } else {
    monthRateData.value = []
    totalMonthRateNum.value = 0
  }
}
const getChargeEquipmentStatistics = async () => {
  const res = await selectChargeEquipmentStatistics()
  deviceData.value = deviceDataFun(res.data)
}
// 实时设备信息饼图
const getChargeStatusData = async(type) => {
  const res = await getChargeStatus(type)
  chargingTypePieData.value = chargingTypePieDataFun(type,res?.data?.data)
  
}
const handleChangeTab = (data, type) => {
  if (type === 'charging-types') {
    //实时设备信息
    getChargeStatusData(data.code)
  } 
};
const getPersonFeedback = async() => {
  const res = await personFeedback()
  feedBackData.value = res?.data || []
}
onMounted(() => {
  getOverTotalCount()
  getHotCharging()
  getMonthRate()
  getPersonFeedback()
  getChargeEquipmentStatistics()
  getChargeStatusData('pile')
})
</script>

<style lang="less" scoped>
.hot-charging {
  .rank-list-wrap {
    margin-top: 16px;
  }
}
.citizens-feedback {
  margin-top: 20px;
  .el-table {
    margin-top: 11px;
  }
}
.realtime-info {
  .num-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
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
    margin-top: 14px;
  }
  :deep(.pie-wrap) {
    margin-top: 18px;
    .pie-chart-wrap {
      min-width: 218px;
      max-width: 218px;
      height: 218px;
    }
  }
}
.month-rate {
  margin-top: 20px;
  .area-rank-wrap {
    margin-top: 23px;
  }
}
</style>