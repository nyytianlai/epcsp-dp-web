<template>
  <div class="operation-bus-overview">
    <title-column title="车网互动总览" />
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
      <div class="card-item" v-for="(item, index) in bottomCardConfig" :key="item.name">
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

      <div class="mid-card">
        <img src="../images/mid-icon.png" class="icon" />
        <span class="text">本年度累计放电量</span>
        <div class="card-value">
          <span class="value fontSize32DIN">
            {{ formatWithToLocalString(4389) ?? '--' }}
          </span>
          <span class="unit">KWh</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { formatWithToLocalString } from '@/global/commonFun.js';
import Api from '../api';

const loading = ref(true);
const topCardConfig = ref([
  {
    name: 'V2G站数',
    code: 'stationNum',
    value: '',
    unit: '个',
    icon: new URL('../images/v2g.png', import.meta.url).href
  },
  {
    name: 'V2G站装机功率',
    code: 'stationPower',
    value: '',
    unit: 'KW',
    icon: new URL('../images/total-power.png', import.meta.url).href
  }
]);

const bottomCardConfig = ref([
  // {
  //   name: 'V2G服务参与车辆',
  //   code: '',
  //   value: '126',
  //   unit: '辆',
  //   icon: new URL('../images/car.png', import.meta.url).href
  // },
  // {
  //   name: '调节次数',
  //   code: '',
  //   value: '2203',
  //   unit: '次',
  //   icon: new URL('../images/adjust.png', import.meta.url).href
  // },
  // {
  //   name: '累计调节量',
  //   code: '',
  //   value: '126',
  //   unit: '万kwh',
  //   icon: new URL('../images/total-adjust.png', import.meta.url).href
  // },
  // {
  //   name: '累计放电量',
  //   code: '',
  //   value: '2203',
  //   unit: 'kWh',
  //   icon: new URL('../images/total-power.png', import.meta.url).href
  // },
  {
    name: 'V2G桩数',
    code: 'pileNum',
    value: '31',
    unit: '座',
    icon: new URL('../images/v2g.png', import.meta.url).href
  },
  {
    name: 'V2G桩放电功率',
    code: 'pilePower',
    value: '',
    unit: 'KW',
    icon: new URL('../images/total-power.png', import.meta.url).href
  }
]);
const getData = async () => {
  loading.value = true;
  try {
    const { data } = await Api.getVehicleNetInterOverview();
    [...topCardConfig.value, ...bottomCardConfig.value].forEach((el) => {
      el.value = data[el.code];
    });
  } catch (error) {}
  loading.value = false;
};
getData();
</script>

<style scoped lang="less">
.operation-bus-overview {
  width: 100%;
  height: 100%;
  // height: 330px;
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

  .mid-card {
    width: 100%;
    display: flex;
    align-items: center;
    img {
      width: 86px;
    }
    .text {
      display: inline-block;
      width: 208px;
      height: 18px;
      color: #c6d1db;
      font-family: PingFang SC;
      font-size: 16px;
      font-weight: 500;
      line-height: 18px;
      letter-spacing: 0px;
      margin-left: 15px;
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
  .card-item {
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
      }
    }
  }
}
</style>
