<template>
  <div class="pop-wrapper">
    <div class="card-row" v-for="item in cardConfig" :key="item.code">
      <div class="card-name">{{ item.name }}</div>
      <div class="card-value">
        {{ item.value ?? '--' }}
        <span>{{ item.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getUrlParam } from '@sutpc/zebra';
const paramsValue = JSON.parse(getUrlParam('value') || '{}');
const cardConfig = computed(() => {
  return [
    {
      name: '虚拟电厂',
      code: 'virtualPowerPlantNum',
      value: null,
      unit: '家'
    },
    {
      name: '可调资源',
      code: 'adjustableResource',
      value: null,
      unit: '个'
    },
    {
      name: '可调容量',
      code: 'adjustableCapacity',
      value: null,
      unit: 'MW'
    },
    {
      name: '报装容量',
      code: 'installedCapacity',
      value: null,
      unit: 'MA'
    }
  ].map((item) => {
    item.value = paramsValue[item.code];
    return item;
  });
});
</script>

<style scoped lang="less">
.pop-wrapper {
  width: 100%;
  height: 100%;
  background: url('./images/pop-bg.png') no-repeat left top/100% 100%;
  padding: 8px 12px;
  display: flex;
  flex-flow: column nowrap;
}

.card-row {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  .card-name {
    font-size: 12px;
    color: #fff;
    font-weight: 400;
  }

  .card-value {
    color: #00fff9;
    font-size: 18px;
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    line-height: 20px;
    font-family: 'DIN Condensed';

    span {
      font-size: 12px;
      font-weight: 400;
    }
  }
}
</style>
