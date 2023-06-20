<template>
  <div class="active-message">
    <ul class="info-content">
      <li class="info-item" v-for="(item, index) in infoList" :key="index">
        <icon :icon="`svg-icon:${item.icon}`" />
        <div class="right">
          <span class="name">{{ item.name }}</span>
          <span class="num">
            <span class="value">{{ item.value }}</span>
            &nbsp;
            <span class="unit">{{ item.unit }}</span>
          </span>
        </div>
      </li>
    </ul>
    <!-- <div class="ec-box">
      <ec-resize :option="batteryTempOption" />
    </div> -->
    <!-- <line-time-chart :unit="dynamicActive.unit" :data="linePowerData" :colors="['#00FFF9']"
      :chartStyle="{ height: '1.8rem' }" :customOption="customOption" /> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import dayjs from 'dayjs';
// import EcResize from '@sutpc/vue3-ec-resize';
// import { batteryTempOption } from '../config';
// const pileData = inject('pileData');
// console.log('pileData',pileData.value)
const infoListFun = (data = {}) => {
  return [
    {
      icon: 'batteryCluster2',
      name: '簇总电压',
      value: 220,
      // value: data?.chargeElectricity === 0 ? data.chargeElectricity : data?.chargeElectricity || '--',
      unit: 'V'
    },
    {
      icon: 'batteryCluster2',
      name: '簇预充电压',
      value: 220,
      // value: data?.disChargeElectricity === 0 ? data.disChargeElectricity : data.disChargeElectricity || '--',
      unit: 'V'
    },
    {
      icon: 'batteryCluster2',
      name: '簇平均电压',
      value: 110,
      // value: data?.chargeLastTime === 0 ? data.chargeLastTime : data.chargeLastTime || '--',
      unit: 'V'
    },
    {
      icon: 'batteryCluster2',
      name: '簇平均温度',
      value: 36,
      unit: '℃'
    }
    // {
    //   icon: 'batteryCluster2',
    //   name: '簇最高电压序号',
    //   value: 67,
    //   unit: ''
    // },
    // {
    //   icon: 'batteryCluster2',
    //   name: '簇最高电压',
    //   value: 50,
    //   unit: 'V'
    // },
    // {
    //   icon: 'batteryCluster2',
    //   name: '簇最低电压序号',
    //   value: 46,
    //   unit: ''
    // },
    // {
    //   icon: 'batteryCluster2',
    //   name: '簇最低电压',
    //   value: 36,
    //   unit: 'V'
    // },
    // {
    //   icon: 'batteryCluster2',
    //   name: '簇最高温度序号',
    //   value: 74,
    //   unit: ''
    // },
    // {
    //   icon: 'batteryCluster2',
    //   name: '簇最高温度',
    //   value: 66,
    //   unit: '℃'
    // },
    // {
    //   icon: 'batteryCluster2',
    //   name: '簇最低温度序号',
    //   value: 36,
    //   unit: 'MWh'
    // },
    // {
    //   icon: 'batteryCluster2',
    //   name: '簇最低温度',
    //   value: 28,
    //   unit: '℃'
    // }
  ];
};
const infoList = ref(infoListFun());
const dynamicActive = ref(infoList.value[4]);

const linePowerDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  return [
    {
      data: data?.map((item) => [yearMonthDay + `${item.time}:00`, item.count]),
      type: 'line',
      smooth: true,
      name: dynamicActive.value?.name
    }
  ];
};
const linePowerData = ref(linePowerDataFun());
onMounted(() => {});
</script>
<style lang="less" scoped>
.active-message {
  height: 172px;
  .info-content {
    display: flex;
    flex-wrap: wrap;
    .info-item {
      background: #375374;
      display: flex;
      width: 186px;
      padding: 12px 0 12px 12px;
      margin-right: 12px;
      margin-bottom: 12px;
      align-items: center;
      border: 1px solid transparent;
      cursor: pointer;

      &.active {
        background: #255886;
        border: 1px solid rgba(75, 222, 255, 0.7);
      }

      &:nth-child(4n) {
        margin-right: 0;
      }

      .el-icon {
        font-size: 36px;
        margin-right: 12px;
      }

      .right {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 14px;
          line-height: 20px;
        }

        .value {
          font-family: 'DIN Alternate';
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 28px;
          color: #00fff9;
          text-shadow: 0px 2px 10px rgba(75, 222, 255, 0.5);
        }

        .unit {
          font-size: 14px;
          line-height: 20px;
          color: #00fff9;
        }
      }
    }
  }
}
.ec-box {
  height: 180px;
}
</style>
