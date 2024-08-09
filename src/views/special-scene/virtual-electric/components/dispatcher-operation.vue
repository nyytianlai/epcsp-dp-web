<template>
  <div class="dispatcher-operation">
    <title-column title="调度运行情况" />
    <div class="card-row" v-for="o in type" :key="o.code">
      <div class="static-type">{{ o.name }}</div>
      <div class="top-card-item" v-for="item in cardConfig" :key="item.name">
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
const type = [
  { name: '今日', code: '1' },
  { name: '累计', code: '2' }
];
const cardConfig = [
  {
    name: '削峰调节次数',
    code: '',
    value: '2838',
    unit: '次',
    icon: new URL('../images/xftjcs.png', import.meta.url).href
  },
  {
    name: '削峰调节量',
    code: '',
    value: '2838',
    unit: 'MW',
    icon: new URL('../images/xftjl.png', import.meta.url).href
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
.dispatcher-operation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .card-row {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    padding: 12px;
    border-radius: 4px;
    overflow: hidden;

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );
    gap: 6px;
    &:first-of-type {
      margin-bottom: 10px;
    }

    .static-type {
      position: absolute;
      left: 0;
      top: 0;
      width: 116px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(5, 160, 255);
      font-size: 14px;
      color: #fff;
      transform: translate(-30%, 40%) rotate(-30deg);
    }
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
</style>
