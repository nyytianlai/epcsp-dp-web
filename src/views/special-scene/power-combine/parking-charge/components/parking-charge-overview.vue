<template>
  <div class="parking-charge-overview">
    <title-column title="停充接入总览" />
    <div class="parking-charge-rate">
      <div class="top-card-list">
        <div class="top-card-item" v-for="item in topCardConfig" :key="item.name">
          <img :src="item.icon" class="icon" />
          <div class="card-data">
            <div class="card-value">
              <span class="value fontSize32DIN">{{ item.value ?? '--' }}</span>
              <span class="unit">{{ item.unit || '' }}</span>
            </div>
            <div class="card-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="rate-wrapper">
        <div class="left-line"></div>
        <div class="rate-data">
          {{ rate.name }}
          <span class="fontSize28DIN">{{ rate.value ?? '--' }}</span>
        </div>
        <div class="right-line"></div>
      </div>
    </div>
    <div class="parking-charge-count">
      <div class="top-card-item" v-for="item in bottomCardConfig" :key="item.name">
        <img :src="item.icon" class="icon" />
        <div class="card-data">
          <div class="card-value">
            <span class="value fontSize32DIN">{{ item.value ?? '--' }}</span>
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
const loading = ref(true);

const topCardConfig = [
  {
    name: '总车位数',
    code: '',
    value: '1163',
    unit: '个',
    icon: new URL('../images/parking.png', import.meta.url).href
  },
  {
    name: '充电枪数',
    code: '',
    value: '1020',
    unit: '个',
    icon: new URL('../images/charge.png', import.meta.url).href
  }
];

const rate = {
  name: '停充配比',
  code: '',
  value: '3.5:1'
};

const bottomCardConfig = [
  {
    name: '停车场数量',
    code: '',
    value: '1020',
    unit: '个',
    icon: new URL('../images/parking-num.png', import.meta.url).href
  },
  {
    name: '充电站数量',
    code: '',
    value: '1020',
    unit: '个',
    icon: new URL('../images/station-num.png', import.meta.url).href
  }
];

const getData = async () => {
  loading.value = true;
  try {
  } catch (error) {}
  loading.value = false;
};
getData();
</script>

<style scoped lang="less">
.parking-charge-overview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .parking-charge-rate,
  .parking-charge-count {
    padding: 16px 22px;
    border-radius: 4px;

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );

    .top-card-item {
      flex: 1;
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
          color: #00f7ff;
          -webkit-background-clip: text;
          background-clip: text;
          background: linear-gradient(
              rgb(0, 128, 255) 0%,
              rgb(255, 255, 255) 52.08%,
              rgb(0, 124, 248) 100%
            )
            text;
          -webkit-text-fill-color: transparent;
        }

        .unit {
          font-size: 14px;
          color: #f3f6fa;
        }
      }
    }
  }

  .parking-charge-rate {
    display: flex;
    flex-flow: column nowrap;
    row-gap: 12px;

    .top-card-list {
      display: flex;
      flex-flow: row nowrap;
      column-gap: 12px;
    }

    .rate-wrapper {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;

      .left-line,
      .right-line {
        flex: 0 0 56px;
        height: 33px;
        border-bottom: solid 2px rgba(#0f7be9, 0.2);
        position: relative;
        transform: translateY(-6px);

        &::before {
          content: '';
          position: absolute;
          top: 0;
          height: 2px;
          width: 8px;
          background-color: rgba(#0f7be9, 0.2);
        }
      }

      .left-line {
        border-left: solid 2px rgba(#0f7be9, 0.2);
        &::before {
          left: -5px;
        }
      }

      .right-line {
        border-right: solid 2px rgba(#0f7be9, 0.2);
        &::before {
          right: -5px;
        }
      }

      .rate-data {
        padding: 12px;
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        white-space: nowrap;
        column-gap: 8px;
        background-color: rgba(#5793ed, 0.4);
        border: solid 1.5px rgba(#0f7be9, 0.4);
        line-height: 22px;
        font-size: 16px;
        color: #c6d1db;
        min-width: 150px;
      }
    }
  }

  .parking-charge-count {
    display: flex;
    flex-flow: row nowrap;
    column-gap: 12px;

    .top-card-item {
      .card-value {
        .value {
          color: rgb(0, 247, 255) !important;
          background: initial !important;
          -webkit-background-clip: initial !important;
          background-clip: initial !important;
          background: initial !important;
          -webkit-text-fill-color: initial !important;
        }
        .unit {
          color: rgb(0, 247, 255);
        }
      }
    }
  }
}
</style>
