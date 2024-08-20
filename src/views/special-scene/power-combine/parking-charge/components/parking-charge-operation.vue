<template>
  <div class="parking-charge-operation">
    <title-column title="停充日均运行总览" />
    <div class="distributed-content" v-loading="loading">
      <div class="top-card-item" v-for="item in bottomCardConfig" :key="item.name">
        <img :src="item.icon" class="icon" />
        <div class="card-data">
          <div class="card-value">
            <span class="value fontSize30DIN">
              {{ formatWithToLocalString(totalData[item.code]) ?? '--' }}
            </span>
            <span class="unit">{{ item.unit || '' }}</span>
          </div>
          <div class="card-name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { formatWithToLocalString } from '@/global/commonFun.js';
import Api from '../api';
const totalData = ref({});
const bottomCardConfig = [
  {
    name: '车位利用率',
    code: 'dailyParkingSpaceUtilizationRate',
    value: '',
    unit: '%',
    icon: new URL('../images/parking-car.png', import.meta.url).href
  },
  {
    name: '充电枪利用率',
    code: 'dailyGunUtilizationRate',
    value: '',
    unit: '%',
    icon: new URL('../images/gun.png', import.meta.url).href
  },
  {
    name: '充电量',
    code: 'dailyChargingVolume',
    value: '',
    unit: 'kWh',
    icon: new URL('../images/power.png', import.meta.url).href
  },
  {
    name: '充电时长',
    code: 'dailyChargingDuration',
    value: '',
    unit: '小时',
    icon: new URL('../images/charge-time.png', import.meta.url).href
  },
  {
    name: '停车量',
    code: 'dailyParkingVolume',
    value: '',
    unit: '辆',
    icon: new URL('../images/parking-num.png', import.meta.url).href
  },
  {
    name: '停车时长',
    code: 'dailyParkingDuration',
    value: '',
    unit: '小时',
    icon: new URL('../images/parking-time.png', import.meta.url).href
  }
];
const loading = ref(true);

const getData = async () => {
  loading.value = true;
  try {
    const res = await Api.parkChargingRunOverview();
    totalData.value = res?.data || {};
  } catch (error) {}
  loading.value = false;
};
getData();
</script>

<style scoped lang="less">
.parking-charge-operation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .distributed-content {
    flex: 1;
    min-height: 0;
    padding: 12px;
    border-radius: 4px;

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );
    display: flex;
    flex-flow: row wrap;
    gap: 6px;
  }

  .top-card-item {
    flex: calc(50% - 3px);
    min-width: 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    column-gap: 6px;

    .icon {
      width: 86px;
      flex: 0 0 86px;
    }

    .card-data {
      display: flex;
      flex-flow: column nowrap;
    }

    .card-name {
      font-size: 16px;
      color: #c6d1db;
    }

    .card-value {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      line-height: 30px;
      .value {
        font-weight: 700;
        color: rgb(0, 247, 255);
      }

      .unit {
        font-size: 14px;
        color: rgb(0, 247, 255);
        white-space: nowrap;
      }
    }
  }
}
</style>
