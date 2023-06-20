<template>
  <div class="energy-station">
    <!-- <page-num :data="pageNumData" /> -->
    <!-- 左侧 -->
    <panel>
      <div class="energy-station-overview">
        <title-column title="储能站整体信息" icon="energy-station" />
        <div class="num-wrap">
          <template v-for="(item, index) in cardData" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
        <tabs :data="tabType" />
        <pie-chart :data="tabTypeData" totalName="储能站/个" :colors="tabTypeColor" />
      </div>
      <div class="company-rank">
        <title-column title="储能站排名" icon="energy-station" />
        <tabs :data="rankTabType" @changeTab="handleRank" />
        <!-- <area-rank-list :data="companyRankData" :totalNum="companyRankTotal" height="2.54rem" :showPer="false" /> -->
        <rank-list :data="companyRankData" :totalNum="companyRankTotal" height="2.9rem" />
      </div>
    </panel>
    <panel type="right">
      <div class="today-runing">
        <title-column title="今日储能站运行信息" icon="energy-station" />
        <charging-realtime-power :data="chargingRealPower" />
        <div class="num-wrap">
          <template v-for="(item, index) in runingData" :key="index">
            <num-card :data="item" type="left-right" classStyleType="leftRightStyle1" />
          </template>
        </div>
        <tabs :data="todayLine" />
        <line-time-chart-both :data="lineStateData" :colors="lineStateColor" unit="MW" mode="noneArea"
          :chartStyle="{ height: '2.3rem' }" />
      </div>
      <div class="social-benefit">
        <title-column title="社会效益信息" icon="energy-station" />
        <div class="num-wrap">
          <template v-for="(item, index) in socialBenefit" :key="index">
            <num-card :data="item" />
          </template>
        </div>
      </div>
    </panel>
    <map-layer :ref="(el) => (mapLayerRef = el)" v-if="aircityObj"></map-layer>
  </div>
</template>
<script lang="ts" setup>
import ChargingRealtimePower from './components/charging-realtime-power.vue';
import { ref, inject, onMounted } from 'vue';
import {
  runingFun,
  pageNumFun,
  cndzyxzlFun,
  tabType,
  tabTypeDataFun,
  rankTabType,
  todayLine,
  linePowerDataFun,
  socialBenefitFun
} from './config.js';
import { capacityRanking } from './api.js'
import MapLayer from './components/map-layer.vue';

interface Aircity {
  value: object;
}
const aircityObj: Aircity = inject('aircityObj');
let mapLayerRef = ref(null);
const lineStateColor = ['green', '#FF7723'];
const tabTypeColor = ['#E5CC48', '#3254DD', '#4BDEFF'];
// 顶部数据
const pageNumData = ref(pageNumFun());
// 储能电站运行总览
const cardData = ref(cndzyxzlFun());
// 左二tab饼图
const tabTypeData = ref(tabTypeDataFun());
const tabPie = ref(1);
// 企业排名
const companyRankData = ref([]);
// 企业排名总量
const companyRankTotal = ref<number>(0);
//今日最大顶峰能力
const chargingRealPower = ref(69.02);
// 储能电站运行信息
const runingData = ref(runingFun());
// 折线图
const lineStateData = ref(linePowerDataFun());
// 社会效益信息
const socialBenefit = ref(socialBenefitFun());
// 站点装机容量排名
const stationRank = ref([])


// 左二tab点击
const handleRuning = (item) => {
  console.log('item', item);
  tabPie.value = item.code;
  tabTypeData.value = tabTypeDataFun({}, tabPie.value);
};
// 左三排名点击
const handleRank = (item) => {
  console.log('item', item);
  switch (item.code) {
    case 1:
      companyRankData.value = stationRank.value
      break;
    case 2:
      companyRankData.value = [
        {
          num: 97.85,
          unit: '%',
          name: '南山热电厂储能项目'
        },
        {
          num: 95.22,
          unit: '%',
          name: '南网电动正本公明充电站'
        },
        {
          num: 92.57,
          unit: '%',
          name: '瑞华泰储能'
        },
        {
          num: 92.46,
          unit: '%',
          name: '深圳宝清储能站'
        },
        {
          num: 91.96,
          unit: '%',
          name: '广东天劲充电站'
        },
        {
          num: 91.55,
          unit: '%',
          name: '华润电力30MW储能辅助调频电站'
        }
      ];
      break;
  }
  companyRankTotal.value = companyRankData.value[0].num;
};


// 获取站点排名
const loadCapacityRanking = async () => {
  const res = await capacityRanking()
  console.log('loadCapacityRanking', res)
  stationRank.value = res.data.map(i => {
    return {
      num: i.doubleAmount,
      unit: 'MW',
      name: i.rankingName
    }
  })
  companyRankData.value = stationRank.value
  companyRankTotal.value = companyRankData.value[0].num;
}
onMounted(() => {
  loadCapacityRanking()
})
</script>
<style lang="less" scoped>
.energy-station-overview {
  .num-wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 16px;
    margin-bottom: 20px;
    height: 173px;
    align-content: space-between;

    :deep(.num-card) {
      width: 196px;
      padding: 14px 12px;
      background: linear-gradient(258.38deg,
          rgba(37, 177, 255, 0.1) 2.46%,
          rgba(37, 177, 255, 0) 100%);
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

      .icon {
        width: 54px !important;
        height: 54px !important;
      }
    }
  }

  :deep(.pie-wrap) {
    margin-top: 22px;
  }
}

.company-rank {
  margin-top: 20px;

  :deep(.tabs) {
    margin-top: 22px;
  }

  :deep(.area-rank-wrap) {
    margin-top: 20px;

    .unit {
      color: #fff;
    }
  }
}

.today-runing {
  .charging-realtime-power {
    margin-top: 16px;
  }

  .num-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;

    .num-card {
      margin-bottom: 20px;

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
    margin-top: 18px;
  }
}

.social-benefit {
  margin-top: 29px;

  .num-wrap {
    display: flex;
    justify-content: space-between;
    height: 160px;
    padding: 0 9px;
    margin-top: 16px;
    background: linear-gradient(258.38deg,
        rgba(37, 177, 255, 0.1) 2.46%,
        rgba(37, 177, 255, 0) 100%);
    mix-blend-mode: normal;
    box-shadow: inset 0px 0px 35px rgba(41, 76, 179, 0.2);
    filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.04));
    border-radius: 2px;
  }
}
</style>
