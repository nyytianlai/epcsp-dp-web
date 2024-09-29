<template>
  <div class="operation-bus-overview">
    <!-- yybsyxzl: '营运巴士运行总览' -->
    <title-column title="新能源公交情况总览" />
    <div class="distributed-content">
      <div class="top-card-item" v-for="(item, index) in bottomCardConfig" :key="item.name">
        <img :src="item.icon" class="icon" />
        <div class="card-data">
          <div class="card-value">
            <span class="value fontSize30DIN">
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

import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `special-scene.power-combine.components.operation-bus-overview`;

const loading = ref(true);

const bottomCardConfig = ref([
  {
    name: '公交场站数量',
    code: 'busStationNum',
    value: '',
    unit: '个',
    icon: new URL('../images/total-demand.png', import.meta.url).href
  },
  {
    name: '新能源公交数量',
    code: 'busNum',
    value: '3850',
    unit: '辆',
    icon: new URL('../images/bus-nums.png', import.meta.url).href
  },
  {
    name: '支持V2G公交数量',
    code: 'v2gNum',
    // value: '1074',
    unit: '辆',
    icon: new URL('../images/bus-nums.png', import.meta.url).href
  },
  {
    name: '公交储能总电量',
    code: 'busRemainPower',
    value: '23566',
    unit: 'kWh',
    icon: new URL('../images/surplus-power.png', import.meta.url).href
  }
]);
const getData = async () => {
  loading.value = true;
  try {
    const params = {
      areaCode: '',
      streetCode: ''
    };
    const { data } = await Api.busCanRunOverview(params);
    bottomCardConfig.value.forEach((el) => {
      el.value = data[el.code] ?? el.value;
    });
  } catch (error) {}
  loading.value = false;
};

// const getV2Gdata = async () => {
//   const { data } = await V2GApi.getVehicleNetInterOverview();
//   bottomCardConfig.value.forEach((el) => {
//     el.value = data[el.code] ?? el.value;
//   });
// };
// getV2Gdata();
getData();
</script>

<style scoped lang="less">
.operation-bus-overview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

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
  .one-row {
    flex-basis: 100% !important;
    justify-content: space-between;
    .card-data {
      flex-flow: row-reverse !important;
      align-items: center;
      justify-content: space-evenly;
      flex: calc(80% - 10px);
    }
  }

  .top-card-item {
    flex: calc(50% - 3px);
    min-width: 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    column-gap: 6px;

    .icon {
      width: 68px;
      flex: 0 0 68px;
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
