<template>
  <div class="energy-station">
    <page-num :data="pageNumData" />
    <!-- 左侧 -->
    <panel>
      <div class="energy-station-overview">
        <title-column title="储能电站运行总览" icon="energy-station" />
        <div class="num-wrap">
          <template v-for="(item, index) in cardData" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
        <tabs :data="tabType" @changeTab="handleRuning" />
        <pie-chart :data="tabTypeData" totalName="储能站/个" :colors="tabTypeColor" />
      </div>
      <div class="company-rank">
        <title-column title="储能站排名" icon="energy-station" />
        <tabs :data="rankTabType" @changeTab="handleRank" />
        <!-- <area-rank-list :data="companyRankData" :totalNum="companyRankTotal" height="2.54rem" :showPer="false" /> -->
        <rank-list :data="companyRankData" :totalNum="companyRankTotal" height="3.54rem" />
      </div>
    </panel>
    <panel type="right">
      <div class="today-runing">
        <title-column title="今日储能电站运行信息" icon="energy-station" />
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
        />
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
import { ref, onMounted, inject } from 'vue';
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
const companyRankData = ref([
  {
    num: 95.72,
    unit: '%',
    name: '110kV潭头变电站电化学储能电站'
  },
  {
    num: 94.26,
    unit: '%',
    name: '永泰数能光储充城市驿站'
  },
  {
    num: 93.85,
    unit: '%',
    name: '福田区委大院光储充柔一体化停车场项目'
  },
  {
    num: 93.1,
    unit: '%',
    name: '泰豪深圳工业园光储充一体化电站'
  },
  {
    num: 92.87,
    unit: '%',
    name: '深圳公明南“光储充检”一体化电站概况'
  },
  {
    num: 92.72,
    unit: '%',
    name: '欧姆龙电子部件（深圳）有限公司储能电站'
  }
]);
// 企业排名总量
const companyRankTotal = ref<number>(companyRankData.value[0].num);
//今日最大顶峰能力
const chargingRealPower = ref(1246);
// 储能电站运行信息
const runingData = ref(runingFun());
// 折线图
const lineStateData = ref(linePowerDataFun());
// 社会效益信息
const socialBenefit = ref(socialBenefitFun());

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
      companyRankData.value = [
        {
          num: 1200,
          unit: 'MW',
          name: '深圳抽水蓄能电站'
        },
        {
          num: 50,
          unit: 'MW',
          name: '深南电南山热电厂退役设备技改升级独立储能示范项目一期'
        },
        {
          num: 20,
          unit: 'MW',
          name: '坪山新区比亚迪厂区用户侧储能'
        },
        {
          num: 12,
          unit: 'MW',
          name: '中国铁塔深圳5G基站储能'
        },
        {
          num: 10,
          unit: 'MW',
          name: '深圳宝清电池储能站'
        },
        {
          num: 5,
          unit: 'MW',
          name: '110kV潭头变电站电化学储能电站'
        }
      ];

      break;
    case 2:
      companyRankData.value = [
        {
          num: 95.72,
          unit: '%',
          name: '110kV潭头变电站电化学储能电站'
        },
        {
          num: 94.26,
          unit: '%',
          name: '永泰数能光储充城市驿站'
        },
        {
          num: 93.85,
          unit: '%',
          name: '福田区委大院光储充柔一体化停车场项目'
        },
        {
          num: 93.1,
          unit: '%',
          name: '泰豪深圳工业园光储充一体化电站'
        },
        {
          num: 92.87,
          unit: '%',
          name: '深圳公明南“光储充检”一体化电站概况'
        },
        {
          num: 92.72,
          unit: '%',
          name: '欧姆龙电子部件（深圳）有限公司储能电站'
        }
      ];
      break;
  }
  companyRankTotal.value = companyRankData.value[0].num;
};
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
    background: linear-gradient(
      258.38deg,
      rgba(37, 177, 255, 0.1) 2.46%,
      rgba(37, 177, 255, 0) 100%
    );
    mix-blend-mode: normal;
    box-shadow: inset 0px 0px 35px rgba(41, 76, 179, 0.2);
    filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.04));
    border-radius: 2px;
  }
}
</style>
