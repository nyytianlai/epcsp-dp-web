<template>
  <div class="resource-overview">
    <title-column title="资源接入总览" />
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
const bottomCardConfig = [
  {
    name: '虚拟电厂数量',
    code: '',
    value: '2838',
    unit: '家',
    icon: new URL('../images/xndcsl.png', import.meta.url).href
  },
  {
    name: '可调资源',
    code: '',
    value: '5633',
    unit: '个',
    icon: new URL('../images/ktzy.png', import.meta.url).href
  },
  {
    name: '报装容量',
    code: '',
    value: '2203',
    unit: 'MVA',
    icon: new URL('../images/bzrl.png', import.meta.url).href
  },
  {
    name: '可调节容量',
    code: '',
    value: '126',
    unit: 'MW',
    icon: new URL('../images/ktjrl.png', import.meta.url).href
  },
  {
    name: '实时接入功率',
    code: '',
    value: '2203',
    unit: 'MW',
    icon: new URL('../images/ssjrgl.png', import.meta.url).href
  }
];
const loading = ref(true);

const getData = async () => {
  loading.value = true;
  try {
  } catch (error) {}
  loading.value = false;
};
getData();
</script>

<style scoped lang="less">
.resource-overview {
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
      width: 60px;
      flex: 0 0 60px;
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
