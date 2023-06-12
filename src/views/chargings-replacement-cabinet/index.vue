<template>
  <div class="chargings-replacement-cabinet">
    <page-num :data="pageNumData" />
    <!-- 左侧 -->
    <panel>
      <div class="chargings-replacement-cabinet-overview">
        <title-column title="充换电设施总量统计" icon="chargings-replacement" />
        <div class="num-wrap">
          <template v-for="(item, index) in cardData" :key="index">
            <num-card :data="item" classStyleType="bottomDown" />
          </template>
        </div>
      </div>
      <div class="charging-type">
        <tabs :data="chargingType" />
        <pie-chart
          :data="chargingTypeData"
          totalName="设施类型总量"
          :colors="chargingColor"
        />
      </div>
      <div class="company-facilities-rank">
        <title-column title="企业充换柜数量排名" icon="chargings-replacement" />
        <area-rank-list
          :data="facilitiesRankData"
          :totalNum="facilitiesRankTotal"
          height="2.54rem"
          :showPer="false"
        />
      </div>
    </panel>
    <!-- 右侧 -->
    <panel type="right">
      <div class="today-facilities">
        <title-column title="今日设施数据信息" icon="chargings-replacement" />
        <tabs :data="todayFacilities" @changeTab="handleFacilities" />
        <div class="num-wrap">
          <template v-for="(item, index) in todayFacilitiesCard" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
      </div>
      <div class="power-msg-today">
        <title-column title="今日充电功率信息" icon="chargings-replacement" />
        <div class="num-wrap">
          <template v-for="(item, index) in powerTodayCard" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
        <line-time-chart :data="lineStateData" :colors="stateColor" unit="kW" />
      </div>
      <div class="today-warning-message">
        <title-column title="今日告警信息" icon="chargings-replacement" />
        <warning-list :data="warningListData" @handleClick="handleWarnClick" />
      </div>
    </panel>
    <map-layer :ref="(el) => (mapLayerRef = el)" v-if="aircityObj"></map-layer>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted,inject} from 'vue';
import { toSingleStation } from '@/global/config/map';
import {
  pageNumFun,
  chdsszlFun,
  chargingType,
  chargingTypeDataFun,
  todayFacilities,
  todayFacilitiesCardFun,
  powerTodayCardFun,
  linePowerDataFun,
  warnData
} from './config';
import MapLayer from './components/map-layer.vue';

interface Aircity {
  value: object;
}
const aircityObj: Aircity = inject('aircityObj');
let mapLayerRef = ref(null);
const chargingColor = ['#E5CC48', '#3254DD', '#4BDEFF', '#CEF6FF']
const stateColor =  ['green', '#FF7723']
// 顶部数据
const pageNumData = ref(pageNumFun());
//充换电设施总量统计数据
const cardData = ref(chdsszlFun());
// 充换电设施类型
const chargingTypeData = ref(chargingTypeDataFun());
// 企业排名
const facilitiesRankData = ref([
  {
    num: 3612,
    unit: '',
    name: '51换电'
  },
  {
    num: 2989,
    unit: '',
    name: '中国铁塔换电'
  },
  {
    num: 1886,
    unit: '',
    name: '骑士换电'
  },
  {
    num: 1415,
    unit: '',
    name: '智租换电'
  },
  {
    num: 942,
    unit: '',
    name: '春藤物联'
  },
  {
    num: 782,
    unit: '',
    name: '小哈换电'
  }
]);
// 企业排名总量
const facilitiesRankTotal = ref<number>(facilitiesRankData.value[0].num);
// 今日设施数据信息卡片
const todayFacilitiesCard = ref(todayFacilitiesCardFun());
// 今日功率信息卡片
const powerTodayCard = ref(powerTodayCardFun());
// 折线图
const lineStateData = ref(linePowerDataFun());
// 今日告警信息
const warningListData = ref([]);
// 今日设施数据信息点击
const handleFacilities = (item) => {
  console.log('item', item);
};
// 今日告警信息点击
const handleWarnClick = (station: object) => {
  console.log(station);
};

// 告警信息初始化
const init = () => {
  warningListData.value = warnData.map((item) => {
    return {
      date: item.alarmTime,
      message: item.alarmDesc,
      area: item.stationName,
      isClick: true,
      ...item
    };
  });
};
onMounted(()=>{
  init()
})
</script>
<style lang="less" scoped>
.chargings-replacement-cabinet-overview {
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
.charging-type {
  margin-top: 26px;
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
.today-facilities {
  :deep(.tabs) {
    margin-top: 16px;
  }
}
.today-facilities {
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
.power-msg-today {
  margin-top: 26px;
}
.power-msg-today {
  .num-wrap {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    :deep(.num-card) {
      padding: 20px 0;
      width: 49%;
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
        .value {
          font-size: 28px !important;
        }
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
}
.today-warning-message {
  margin-top: 26px;
  :deep(.warning-list){
    margin-top: 16px;
  }

}
</style>