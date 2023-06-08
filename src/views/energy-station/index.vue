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
        <pie-chart
          :data="tabTypeData"
          :totalName="tabPie === 1 ? '电网位置总量' : '能源类型总量'"
          :colors="['#E5CC48', '#3254DD', '#4BDEFF']"
        />
      </div>
      <div class="company-rank">
        <title-column title="运营企业排名" icon="energy-station" />
        <tabs :data="rankTabType" @changeTab="handleRank" />
        <area-rank-list
          :data="companyRankData"
          :totalNum="companyRankTotal"
          height="2.54rem"
          :showPer="false"
        />
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
        <line-time-chart-both :data="lineStateData" :colors="['blue', '#FF7723']" unit="MW" />
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
  </div>
</template>
<script lang="ts" setup>
import ChargingRealtimePower from './components/charging-realtime-power.vue';
import { ref, onMounted } from 'vue';
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
    num: 85,
    unit: '%',
    name: '运营商名称名称名称名称'
  },
  {
    num: 80,
    unit: '%',
    name: '运营商名称名称名称名称'
  },
  {
    num: 77,
    unit: '%',
    name: '运营商名称名称名'
  },
  {
    num: 72,
    unit: '%',
    name: '运营商名称名称名'
  },
    {
    num: 50,
    unit: '%',
    name: '运营商名称名称名'
  },
    {
    num: 40,
    unit: '%',
    name: '运营商名称名称名'
  }
]);
// 企业排名总量
const companyRankTotal = ref<number>(85);
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
