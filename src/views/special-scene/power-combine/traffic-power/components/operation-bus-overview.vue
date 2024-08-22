<template>
  <div class="operation-bus-overview">
    <!-- yybsyxzl: '营运巴士运行总览' -->
    <title-column :title="t(`${tHead}.yybsyxzl`)" />
    <div class="distributed-content">
      <div class="top-card-item" v-for="item in bottomCardConfig" :key="item.name">
        <img :src="item.icon" class="icon" />
        <div class="card-data">
          <div class="card-value">
            <span class="value fontSize32DIN">
              {{ formatWithToLocalString(item.value) ?? '--' }}
            </span>
            <span class="unit">{{ item.unit || '' }}</span>
          </div>
          <div class="card-name">{{ item.displayName || item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { formatWithToLocalString } from '@/global/commonFun.js';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `special-scene.power-combine.components.operation-bus-overview`;

const loading = ref(true);

const bottomCardConfig = [
  {
    name: '今日总耗能',
    code: '',
    value: '56.3',
    unit: 'kWh',
    icon: new URL('../images/total-power.png', import.meta.url).href,
    displayName: t(`${tHead}.bottomCardConfig.jzznh`)
  },
  {
    name: '今日行驶里程',
    code: '',
    value: '56.3',
    unit: 'km',
    icon: new URL('../images/total-mileage.png', import.meta.url).href,
    displayName: t(`${tHead}.bottomCardConfig.rjxslc`)
  },
  {
    name: '日均能耗',
    code: '',
    value: '2203',
    unit: 'kWh',
    icon: new URL('../images/avarage-power.png', import.meta.url).href,
    displayName: t(`${tHead}.bottomCardConfig.rjnh`)
  },
  {
    name: '日均里程',
    code: '',
    value: '126',
    unit: 'km',
    icon: new URL('../images/avarage-mileage.png', import.meta.url).href,
    displayName: t(`${tHead}.bottomCardConfig.rjlc`)
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
