<template>
  <panel type="right">
    <div class="photovoltaic-station-overview-today">
      <title-column :title="$t('photovoltaic-station.panelTitle.jrgfzsjxx')" icon="photovoltaic" />
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
      <title-column :title="$t('photovoltaic-station.panelTitle.shxyxx')" icon="photovoltaic" />
      <div class="num-wrap">
        <template v-for="(item, index) in socialBenefit" :key="index">
          <num-tile-card :data="item" />
        </template>
      </div>
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {
  jrgfdzFun,
  powerTodayTitle,
  powerTodayCardFun,
  linePowerDataFun,
  socialBenefitFun
} from '../../config';
import { electricData } from '../../data';
import dayjs from 'dayjs';
const lineStateColor = ['blue'];
// 今日光伏电站数据
const cardTodayData = ref([] as any[]);
const todayElec = ref(0);
// 今日功率信息卡片
const powerTodayCard = ref(powerTodayCardFun());
// 折线图
const lineStateData = ref(linePowerDataFun());
// 社会效益信息
const socialBenefit = ref(socialBenefitFun());

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
  handleTodayElecData();
});
</script>

<style lang="less" scoped>
.photovoltaic-station-overview-today {
  .num-wrap {
    display: flex;
    justify-content: space-between;
    // height: 160px;
    padding: 10px 9px;
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
    resize: horizontal;
    container-name: numWrap;
    container-type: inline-size;
  }

  @container numWrap (min-width: 500px) {
    .num-card.top-down {
      flex-direction: row;
    }
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
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  @{deep} {
    .ec-wrap {
      flex: 1;
      height: 0;
    }
  }
}

.power-msg-today {
  .num-wrap {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 16px;
    margin-bottom: 20px;

    :deep(.num-card) {
      flex: 1;
      width: 0;
      padding: 10px 0 18px;
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
  margin-top: 20px;
  resize: horizontal;
  container-name: benefit;
  container-type: inline-size;
  .num-wrap {
    margin-top: 16px;

    :deep(.num-tile-card) {
      &:nth-of-type(n + 1) {
        margin-top: 12px;
      }
    }
  }
}
@container benefit (min-width: 500px) {
  .num-wrap {
    display: flex;
    gap: 20px;
  }
}
</style>
