<template>
  <panel>
    <div class="chargings-replacement-cabinet-overview">
      <title-column title="充换电柜整体信息" icon="chargings-replacement" />
      <div class="num-wrap">
        <template v-for="(item, index) in cardData" :key="index">
          <num-tile-card :data="item" />
        </template>
      </div>
    </div>
    <div class="charging-type">
      <tabs :data="chargingType" />
      <pie-chart :data="chargingTypeData" totalName="类型总量" :colors="chargingColor" />
    </div>
    <div class="company-facilities-rank">
      <title-column title="今日站点换电次数排名" icon="chargings-replacement" />
      <!-- <area-rank-list
          :data="facilitiesRankData"
          :totalNum="facilitiesRankTotal"
          height="2.54rem"
          :showPer="false"
        /> -->

      <rank-list :data="facilitiesRankData" :totalNum="facilitiesRankTotal" height="3.34rem" />
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { chdsszlFun, chargingType, chargingTypeDataFun } from '../../config';
import { totalStatistics, typeAndNumber } from '../../api.js';
const chargingColor = ['#E5CC48', '#3254DD', '#4BDEFF', '#CEF6FF'];
//充换电设施总量统计数据
const cardData = ref(chdsszlFun());
// 充换电设施类型
const chargingTypeData = ref(chargingTypeDataFun());
// 排名
const facilitiesRankData = ref([
  {
    num: 145,
    unit: '个',
    name: '猛犸出行-三角楼3号'
  },
  {
    num: 123,
    unit: '个',
    name: '猛犸出行-罗丰路五巷5号'
  },
  {
    num: 121,
    unit: '个',
    name: '猛犸出行-机电市场4'
  },
  {
    num: 95,
    unit: '个',
    name: '猛犸出行-井水龙新一巷10号'
  },
  {
    num: 87,
    unit: '个',
    name: '猛犸出行-盘古石村1-4号'
  },
  {
    num: 63,
    unit: '个 ',
    name: '猛犸出行-松子坑路二巷17号'
  },
  {
    num: 55,
    unit: '个 ',
    name: '猛犸出行-东坑路7-1号'
  },
  {
    num: 51,
    unit: '个 ',
    name: '猛犸出行-深圳均衡精密五金制品有限公司'
  },
  {
    num: 50,
    unit: '个 ',
    name: '猛犸出行-西坑村22号'
  },
  {
    num: 49,
    unit: '个 ',
    name: '猛犸出行-东坑路8号'
  }
]);
// 获取企业总量
const loadTotalStatistics = async () => {
  const res = await totalStatistics();
  cardData.value = chdsszlFun(res.data);
};
// 获取充换电柜类型
const loadTypeAndNumber = async () => {
  const res = await typeAndNumber();
  console.log('获取充换电柜类型', res.data);
  chargingTypeData.value = chargingTypeDataFun(res.data);
};
// 企业排名总量
const facilitiesRankTotal = ref<number>(facilitiesRankData.value[0].num);
onMounted(() => {
  loadTotalStatistics();
  loadTypeAndNumber();
});
</script>

<style lang="less" scoped>
.chargings-replacement-cabinet-overview {
  .num-wrap {
    margin-top: 16px;

    :deep(.num-tile-card) {
      img {
        width: 74px;
      }
      .name {
        margin-left: 28px;
      }
      .num-box {
        width: 110px;
        margin-left: 41px;
        text-align: right;
      }
      &:nth-of-type(n + 1) {
        margin-top: 12px;
      }
    }
  }
}
.charging-type {
  margin-top: 12px;
  :deep(.pie-wrap) {
    margin-top: 22px;
  }
}
.company-facilities-rank {
  margin-top: 20px;
  :deep(.area-rank-wrap) {
    margin-top: 20px;
    .unit {
      color: #fff;
    }
  }
}
</style>
