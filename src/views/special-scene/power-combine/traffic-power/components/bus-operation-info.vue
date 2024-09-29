<template>
  <div class="operation-bus-overview">
    <title-column title="公交运行情况" />
    <div class="distributed-content">
      <div class="card-item" v-for="(item, index) in topCardConfig" :key="item.name">
        <img :src="item.icon" class="icon" />
        <div class="card-data">
          <div class="card-value">
            <span class="value fontSize32DIN">
              {{ formatWithToLocalString(item.value) ?? '--' }}
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
import V2GApi from '@/views/special-scene/carnet-interaction/api';

const loading = ref(true);
const topCardConfig = ref([
  {
    name: '正在运行公交数量',
    code: 'runningBusNumber',
    value: '',
    unit: '辆',
    icon: new URL('../images/bus-nums.png', import.meta.url).href
  },
  {
    name: '正在运行V2G公交数量',
    code: 'runningV2GBusNumber',
    value: '',
    unit: '辆',
    icon: new URL('../images/bus-nums.png', import.meta.url).href
  },
  {
    name: 'V2G公交储能电量',
    code: 'v2gBusPower',
    value: '',
    unit: 'KWh',
    icon: new URL('../images/total-power.png', import.meta.url).href
  }
]);

const getData = async () => {
  loading.value = true;
  try {
    const { data } = await Api.busCanRunOverview({});
    topCardConfig.value.forEach((el) => {
      el.value = el.code ? data[el.code] : el.value;
    });
  } catch (error) {}
  loading.value = false;
};
// const getV2Gdata = async () => {
//   const { data } = await V2GApi.getVehicleNetInterOverview();
//   topCardConfig.value.forEach((el) => {
//     el.value = (el.code && data[el.code as string]) ?? el.value;
//   });
// };
// getV2Gdata();
getData();
</script>

<style scoped lang="less">
.operation-bus-overview {
  width: 100%;
  height: 100%;
  // height: 330px;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 8px;

  .distributed-content {
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

  .card-item {
    flex: calc(50% - 3px);
    min-width: 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    column-gap: 6px;

    .icon {
      width: 76px;
      flex: 0 0 76px;
    }

    .card-data {
      display: flex;
      flex-flow: column nowrap;
    }

    .card-name {
      font-size: 14px;
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
      }
    }
  }
}
</style>
