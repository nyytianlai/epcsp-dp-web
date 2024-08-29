<template>
  <div class="v2g-model">
    <title-column title="规模化V2G示范活动" />
    <div class="distributed-content">
      <div class="top-card-item" v-for="(item, index) in bottomCardConfig" :key="item.name">
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

const loading = ref(true);
const bottomCardConfig = ref([
  {
    name: '活动时间',
    code: '',
    value: '2024/5/15',
    unit: '',
    icon: new URL('../images/active-time.png', import.meta.url).href
  },
  {
    name: '参与削峰填谷车辆',
    code: '',
    value: '1473',
    unit: '辆',
    icon: new URL('../images/car.png', import.meta.url).href
  },
  {
    name: '响应充电站',
    code: '',
    value: '500',
    unit: '座',
    icon: new URL('../images/charging-station.png', import.meta.url).href
  },
  {
    name: '响应充电桩',
    code: '',
    value: '1.5',
    unit: '万个',
    icon: new URL('../images/pile.png', import.meta.url).href
  },
  {
    name: '削峰规模',
    code: '',
    value: '4389',
    unit: '度',
    icon: new URL('../images/scale.png', import.meta.url).href
  },
  {
    name: '等效家庭用电量',
    code: '',
    value: '548',
    unit: '户',
    icon: new URL('../images/e-power.png', import.meta.url).href
  }
]);
const getData = async () => {
  loading.value = true;
  try {
  } catch (error) {}
  loading.value = false;
};
getData();
</script>

<style scoped lang="less">
.v2g-model {
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
      }
    }
  }
}
</style>
