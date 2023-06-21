<template>
  <div class="active-message">
    <ul class="info-content">
      <li class="info-item" v-for="(item, index) in infoList" :key="index">
        <icon :icon="`svg-icon:${item.icon}`" />
        <div class="right">
          <span class="name">{{ item.name }}</span>
          <span class="num">
            <span class="value" v-if="item.name === '簇总电压'">{{ state.voltage }}</span>
            <span class="value" v-else>{{ item.value }}</span>
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
import { ref, onMounted, reactive, onUnmounted } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import dayjs from 'dayjs';
import { baoqingDevice } from './baoqing-device.js';
// import EcResize from '@sutpc/vue3-ec-resize';
// import { batteryTempOption } from '../config';
// const pileData = inject('pileData');
// console.log('pileData',pileData.value)
const infoListFun = (data = {}) => {
  return [
    {
      icon: 'batteryCluster2',
      name: '簇总电压',
      value: 0,
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
const state = reactive({
  voltage: 0
});
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
const handleCurData = () => {
  const hours = dayjs().hour();
  const minutes = dayjs().minute();
  for (let i = 0; i < baoqingDevice.length; i++) {
    const date = baoqingDevice[i].time.split(':');
    // 判断小时和分钟是否小于当前时刻
    if (hours > Number(date[0]) || (Number(date[0]) <= hours && Number(date[1]) <= minutes)) {
      state.voltage = baoqingDevice[i].voltage;
      break;
    }
  }
};
let timer = null;
onMounted(() => {
  handleCurData();
  timer = setInterval(() => {
    handleCurData();
  }, 1000);
});
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>
<style lang="less" scoped>
.active-message {
  height: 173px;
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
</style>
