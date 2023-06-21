<template>
  <div class="active-message">
    <ul class="info-content">
      <li class="info-item" v-for="(item, index) in infoList" :key="index">
        <icon :icon="`svg-icon:${item.icon}`" />
        <div class="right">
          <span class="name">{{ item.name }}</span>
          <span class="num">
            <span class="value" v-if="item.name === '簇实时功率'">
              {{ (state.currentData.voltage * state.currentData.current).toFixed(2) }}
            </span>
            <span class="value" v-else>{{ item.value }}</span>
            &nbsp;
            <span class="unit">{{ item.unit }}</span>
          </span>
        </div>
      </li>
    </ul>
    <!-- <line-time-chart :unit="dynamicActive.unit" :data="linePowerData" :colors="['#00FFF9']"
      :chartStyle="{ height: '1.8rem' }" :customOption="customOption" /> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, onUnmounted } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import dayjs from 'dayjs';
import { baoqingDevice } from './baoqing-device.js';
// const pileData = inject('pileData');
// console.log('pileData',pileData.value)
const state = reactive({
  currentData: {
    voltage: 0,
    current: 0
  }
});
const infoListFun = (data = {}) => {
  return [
    {
      icon: 'batteryCluster2',
      name: '簇SOH',
      value: 99,
      // value: data?.power === 0 ? data.power : data.power || '--',
      unit: '%'
    },
    {
      icon: 'batteryCluster2',
      name: '簇SOC',
      value: 55,
      // value: data?.chargeCount === 0 ? data.chargeCount : data.chargeCount || '--',
      unit: '%'
    },
    {
      icon: 'batteryCluster2',
      name: '绝缘电阻+',
      value: 65535,
      // value: data?.disChargeElectricity === 0 ? data.disChargeElectricity : data.disChargeElectricity || '--',
      unit: 'kW/h'
    },
    {
      icon: 'batteryCluster2',
      name: '绝缘电阻-',
      value: 65535,
      // value: data?.chargeLastTime === 0 ? data.chargeLastTime : data.chargeLastTime || '--',
      unit: 'kW/h'
    },
    {
      icon: 'batteryCluster2',
      name: '簇实时功率',
      value: 0,
      // value: data?.chargeElectricity === 0 ? data.chargeElectricity : data?.chargeElectricity || '--',
      unit: 'kW'
    },
    {
      icon: 'batteryCluster2',
      name: '簇电流',
      value: 0,
      // value: data?.chargeElectricity === 0 ? data.chargeElectricity : data?.chargeElectricity || '--',
      unit: 'A'
    },
    {
      icon: 'batteryCluster2',
      name: '簇累计充电量',
      value: 20184,
      // value: data?.troubleRate === 0 ? data.troubleRate : data.troubleRate || '--',
      unit: 'MWh'
    },
    {
      icon: 'batteryCluster2',
      name: '簇累计放电量',
      value: 18826,
      // value: data?.useRate === 0 ? data.useRate : data.useRate || '--',
      unit: 'MWh'
    }
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
const handleCurData = () => {
  const hours = dayjs().hour();
  const minutes = dayjs().minute();
  for (let i = 0; i < baoqingDevice.length; i++) {
    const date = baoqingDevice[i].time.split(':');
    // 判断小时和分钟是否小于当前时刻
    if (hours > Number(date[0]) || (Number(date[0]) <= hours && Number(date[1]) <= minutes)) {
      state.currentData.voltage = baoqingDevice[i].voltage;
      state.currentData.current = baoqingDevice[i].current;
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
