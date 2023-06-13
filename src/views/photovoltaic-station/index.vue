<template>
  <div class="photovoltaic-station">
    <page-num :data="pageNumData" />
    <!-- 左侧 -->
    <panel>
      <div class="photovoltaic-station-overview">
        <title-column title="光伏电站总览" icon="photovoltaic" />
        <div class="num-wrap">
          <template v-for="(item, index) in cardData" :key="index">
            <num-card :data="item" classStyleType="bottomDown" />
          </template>
        </div>
      </div>
      <div class="surf-sort">
        <tabs :data="surfTitle" />
        <pie-chart :data="surfSortPieData" totalName="上网总量" :colors="surfSortColor" />
      </div>
      <div class="company-rank">
        <title-column title="企业排名" icon="photovoltaic" />
        <tabs :data="companyRank" @changeTab="handleCompany" />
        <!-- <area-rank-list :data="companyRankData" :totalNum="companyRankTotal" height="2.54rem" /> -->
        <rank-list :data="companyRankData" :totalNum="companyRankTotal" height="3.54rem" />
      </div>
    </panel>
    <!-- 右侧 -->
    <panel type="right">
      <div class="photovoltaic-station-overview-today">
        <title-column title="今日光伏电站数据信息" icon="photovoltaic" />
        <div class="num-wrap">
          <template v-for="(item, index) in cardTodayData" :key="index">
            <num-card :data="item" />
          </template>
        </div>
      </div>
      <div class="power-msg-today">
        <tabs :data="powerTodayTitle" />
        <div class="num-wrap">
          <template v-for="(item, index) in powerTodayCard" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
        <line-time-chart :data="lineStateData" :colors="lineStateColor" unit="MW" />
      </div>
      <div class="social-benefit">
        <title-column title="社会效益信息" icon="photovoltaic" />
        <div class="num-wrap">
          <template v-for="(item, index) in socialBenefit" :key="index">
            <num-tile-card :data="item" />
          </template>
        </div>
      </div>
    </panel>
    <map-layer :ref="(el) => (mapLayerRef = el)" v-if="aircityObj"></map-layer>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, inject } from 'vue';
import {
  pageNumFun,
  cdzzlFun,
  surfSortPieDataFun,
  surfTitle,
  companyRank,
  jrgfdzFun,
  powerTodayTitle,
  powerTodayCardFun,
  linePowerDataFun,
  socialBenefitFun
} from './config';
import MapLayer from './components/map-layer.vue';

interface Aircity {
  value: object;
}
const aircityObj: Aircity = inject('aircityObj');
let mapLayerRef = ref(null);

const lineStateColor = ['blue'];
const surfSortColor = ['#E5CC48', '#3254DD', '#4BDEFF'];
// 顶部数据
const pageNumData = ref(pageNumFun());
//光伏电站总览数据
const cardData = ref(cdzzlFun());
// 上网方式分类
const surfSortPieData = ref(surfSortPieDataFun());
// 企业排名
const companyRankData = ref([
  {
    num: 10,
    unit: 'MW',
    name: '中广核深圳机场一期屋顶光伏电站'
  },
  {
    num: 8,
    unit: 'MW',
    name: '开沃新能源汽车深圳生产基地分布式光伏电站'
  },
  {
    num: 5.99,
    unit: 'MW',
    name: '深圳艾杰旭分布式光伏电站'
  },
  {
    num: 4.6,
    unit: 'MW',
    name: '中广核深圳机场二期屋顶光伏电站'
  },
  {
    num: 4.25,
    unit: 'MW',
    name: '深汕盛腾科技有限公司屋顶光伏'
  },
  {
    num: 3.7,
    unit: 'MW',
    name: '盐田港分布式光伏发电项目'
  },
  {
    num: 3.5,
    unit: 'MW',
    name: '前海保税物流园区二期分布式光伏'
  }
]);
// 企业排名总量
const companyRankTotal = ref<number>(companyRankData.value[0].num);
// 今日光伏电站数据
const cardTodayData = ref(jrgfdzFun());
// 今日功率信息卡片
const powerTodayCard = ref(powerTodayCardFun());
// 折线图
const lineStateData = ref(linePowerDataFun());
// 社会效益信息
const socialBenefit = ref(socialBenefitFun());
// 企业排名tab点击
const handleCompany = (item) => {
  console.log('item', item);
  switch (item.code) {
    case 1:
      companyRankData.value = [
        {
          num: 10,
          unit: 'MW',
          name: '中广核深圳机场一期屋顶光伏电站'
        },
        {
          num: 8,
          unit: 'MW',
          name: '开沃新能源汽车深圳生产基地分布式光伏电站'
        },
        {
          num: 5.99,
          unit: 'MW',
          name: '深圳艾杰旭分布式光伏电站'
        },
        {
          num: 4.6,
          unit: 'MW',
          name: '中广核深圳机场二期屋顶光伏电站'
        },
        {
          num: 4.25,
          unit: 'MW',
          name: '深汕盛腾科技有限公司屋顶光伏'
        },
        {
          num: 3.7,
          unit: 'MW',
          name: '盐田港分布式光伏发电项目'
        },
        {
          num: 3.5,
          unit: 'MW',
          name: '前海保税物流园区二期分布式光伏'
        }
      ];
      break;
    case 2:
      companyRankData.value = [
        {
          num: 11,
          unit: '个',
          name: '深圳市燃气集团股份有限公司'
        },
        {
          num: 7,
          unit: '个',
          name: '广东粤电电力销售有限公司'
        },
        {
          num: 5,
          unit: '个',
          name: '国家能源投资集团有限责任公司'
        },
        {
          num: 5,
          unit: '个',
          name: '国电电力广东新能源开发有限公司'
        },
        {
          num: 3,
          unit: '个',
          name: '深电能科技集团有限公司'
        },
        {
          num: 2,
          unit: '个',
          name: '中广核太阳能公司深圳项目公司'
        }
      ];
      break;
  }
  companyRankTotal.value = companyRankData.value[0].num;
};
</script>
<style lang="less" scoped>
.photovoltaic-station-overview {
  .num-wrap {
    display: flex;
    justify-content: space-between;
    height: 160px;
    padding: 0 22px;
    margin-top: 16px;
    background: linear-gradient(
      255.75deg,
      rgba(37, 177, 255, 0.02) 23.33%,
      rgba(37, 177, 255, 0.2) 100%
    );
    mix-blend-mode: normal;
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(41, 76, 179, 0.2);
    border-radius: 4px;
  }
}

.surf-sort {
  margin-top: 26px;

  :deep(.pie-wrap) {
    margin-top: 22px;
  }
}

.company-rank {
  margin-top: 20px;

  :deep(.tabs) {
    margin-top: 16px;
  }

  :deep(.area-rank-wrap) {
    margin-top: 20px;
    width: 430px;
    .unit {
      color: #fff;
    }
  }
}

.photovoltaic-station-overview-today {
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

.power-msg-today {
  margin-top: 26px;
}

.power-msg-today {
  .num-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    margin-bottom: 20px;

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

.social-benefit {
  margin-top: 24px;

  .num-wrap {
    margin-top: 16px;

    :deep(.num-tile-card) {
      &:nth-of-type(n + 1) {
        margin-top: 12px;
      }
    }
  }
}
</style>
