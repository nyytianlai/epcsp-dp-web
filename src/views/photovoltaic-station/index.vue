<template>
  <div class="photovoltaic-station">
    <!-- <page-num :data="pageNumData" /> -->
    <!-- 左侧 -->
    <panel>
      <div class="photovoltaic-station-overview">
        <title-column title="光伏站整体信息" icon="photovoltaic" />
        <div class="num-wrap">
          <template v-for="(item, index) in cardData" :key="index">
            <num-card :data="item" classStyleType="bottomDown" />
          </template>
        </div>
      </div>
      <!-- <div class="surf-sort">
        <num-tile-card :data="unitTotal" />
      </div> -->
      <div class="company-rank">
        <title-column title="光伏站排名" icon="photovoltaic" />
        <tabs :data="companyRank" @changeTab="handleCompany" />
        <!-- <area-rank-list :data="companyRankData" :totalNum="companyRankTotal" height="2.54rem" /> -->
        <rank-list :data="companyRankData" :totalNum="companyRankTotal" height="5.8rem" />
      </div>
    </panel>
    <!-- 右侧 -->
    <panel type="right">
      <div class="photovoltaic-station-overview-today">
        <title-column title="今日光伏站数据信息" icon="photovoltaic" />
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
  companyRank,
  jrgfdzFun,
  powerTodayTitle,
  powerTodayCardFun,
  linePowerDataFun,
  socialBenefitFun
} from './config';
import { capacityRanking, projectRanking } from './api.js';
import { electricData } from './data';
import dayjs from 'dayjs';
import MapLayer from './components/map-layer.vue';
interface Aircity {
  value: object;
}
const aircityObj: Aircity = inject('aircityObj');
let mapLayerRef = ref(null);

const lineStateColor = ['blue'];
// 顶部数据
const pageNumData = ref(pageNumFun());
//光伏电站总览数据
const cardData = ref(cdzzlFun());
// 企业排名
const companyRankData = ref([]);
// 企业排名总量
const companyRankTotal = ref<number>(0);
// 今日光伏电站数据
const cardTodayData = ref([]);
const todayElec = ref(0);
// 今日功率信息卡片
const powerTodayCard = ref(powerTodayCardFun());
// 折线图
const lineStateData = ref(linePowerDataFun());
// 社会效益信息
const socialBenefit = ref(socialBenefitFun());
// 站点排名信息
const stationRnk = ref([]);
// 光伏排名信息
const lightRank = ref([]);

// 获取站点容量排名
const loadCapacityRanking = async () => {
  const res = await capacityRanking();
  console.log('获取站点容量排名', res);
  stationRnk.value = res.data.map((i) => {
    return {
      num: i.doubleAmount,
      unit: 'kW',
      name: i.rankingName
    };
  });
  companyRankData.value = stationRnk.value;
  companyRankTotal.value = companyRankData.value[0].num;
};
// 获取光伏站数量排名
const loadProjectRanking = async () => {
  const res = await projectRanking();
  console.log('获取光伏站数量排名', res);
  lightRank.value = res.data.map((i) => {
    return {
      num: i.integerAmount,
      unit: '个',
      name: i.rankingName
    };
  });
};
// 企业排名tab点击
const handleCompany = (item) => {
  // console.log('item', item);
  companyRankData.value = item.code === 1 ? stationRnk.value : lightRank.value;
  companyRankTotal.value = companyRankData.value[0].num;
};

// 获取今日光伏发电站数据信息
const handleTodayElecData = () => {
  const hours = dayjs().hour();
  const minutes = dayjs().minute();
  // console.log(hours, minutes);
  let count = 0;
  for (let i = 0; i < electricData.length; i++) {
    const date = electricData[i].time.split(':');
    // 判断小时和分钟是否小于当前时刻
    if (hours > Number(date[0]) || (Number(date[0]) <= hours && Number(date[1]) <= minutes)) {
      count += electricData[i].power;
      console.log('electricData[i]', electricData[i]);
      powerTodayCard.value = powerTodayCardFun({ realtime: electricData[i].power });
    }
    // console.log(dayjs(    ).format('YYYY-MM-DD HH:mm'));
    // xAxis.push(dayjs().set('hour', i).set('minute', '00').format('YYYY-MM-DD HH:mm'));
  }
  todayElec.value = count;
  cardTodayData.value = jrgfdzFun({
    radiation: 892,
    total: (todayElec.value * 0.05).toFixed(2),
    onlineElec: (todayElec.value * 0.05 * 0.4).toFixed(2)
  });
};

onMounted(() => {
  loadCapacityRanking();
  loadProjectRanking();
  handleTodayElecData();
});
</script>
<style lang="less" scoped>
.photovoltaic-station-overview {
  .num-wrap {
    display: flex;
    justify-content: space-around;
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

  :deep(.num-card) {
    .unit {
      display: block;
      text-align: center;
      color: #00f7ff;
    }
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
