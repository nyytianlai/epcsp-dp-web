<template>
  <div class="adjust-overview">
    <title-column title="虚拟电厂调节总览" />
    <div class="distributed-content">
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
const bottomCardConfig = [
  {
    name: '今日调节总需求',
    code: '',
    value: '2203',
    unit: 'MW',
    icon: new URL('../images/total-demand.png', import.meta.url).href
  },
  {
    name: '今日调节次数',
    code: '',
    value: '126',
    unit: '次',
    icon: new URL('../images/today-count.png', import.meta.url).href
  },
  {
    name: '日均调节需求',
    code: '',
    value: '2203',
    unit: 'MW',
    icon: new URL('../images/avarage-demand.png', import.meta.url).href
  },
  {
    name: '日均调节次数',
    code: '',
    value: '126',
    unit: '次',
    icon: new URL('../images/avarage-count.png', import.meta.url).href
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
.adjust-overview {
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
