<template>
  <panel type="right">
    <div class="today-facilities">
      <title-column title="今日充换电柜数据信息" icon="chargings-replacement" />
      <tabs :data="todayFacilities" @changeTab="handleFacilities" />
      <div class="num-wrap">
        <template v-for="(item, index) in todayFacilitiesCard" :key="index">
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
    </div>
    <div class="power-msg-today">
      <title-column title="今日换电次数信息" icon="chargings-replacement" />
      <div class="num-wrap">
        <template v-for="(item, index) in powerTodayCard" :key="index">
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
      <line-time-chart
        :data="lineStateData"
        :colors="stateColor"
        unit="次"
      />
    </div>
    <div class="today-warning-message">
      <title-column title="今日告警信息" icon="chargings-replacement" />
      <warning-list :data="warningListData" @handleClick="handleWarnClick" height="2.3rem" />
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {
  todayFacilities,
  todayFacilitiesCardFun,
  powerTodayCardFun,
  linePowerDataFun,
  warnData
} from '../../config';
const stateColor = ['green', '#FF7723'];

// 今日设施数据信息卡片
const todayFacilitiesCard = ref(todayFacilitiesCardFun());
// 今日功率信息卡片
const powerTodayCard = ref(powerTodayCardFun());
// 折线图
const lineStateData = ref(linePowerDataFun());
// 今日告警信息
const warningListData = ref([] as any[]);

// 今日设施数据信息点击
const handleFacilities = (item) => {
  console.log('item', item);
  todayFacilitiesCard.value = todayFacilitiesCardFun({}, item.code);
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
onMounted(() => {
  init();
});
</script>

<style lang="less" scoped>
.today-facilities {
  :deep(.tabs) {
    margin-top: 10px;
  }
}
.today-facilities {
  .num-wrap {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    gap: 20px;
    @{deep} {
      .num-card {
        flex: 1;
        width: 0;
        padding: 15px 0 18px;
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
}
.power-msg-today {
  flex: 1;
  height: 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  .num-wrap {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    @{deep} {
      .num-card {
        flex: 1;
        width: 0;
        padding: 15px 0;
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
  @{deep} {
    .ec-wrap {
      flex: 1;
      height: 0;
    }
  }
}
.today-warning-message {
  height: 30%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  @{deep} {
    .warning-list {
      flex: 1;
      height: 0;
      margin-top: 10px;
    }
  }
  
}
</style>
