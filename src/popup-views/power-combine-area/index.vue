<template>
  <div id="pop-panel">
    <div class="data-row" v-for="item in config" :key="item.code">
      <div class="name">{{ item.name }}</div>
      <div class="value" :style="{ color: item.color }">
        {{ paramsValue[item.code] ?? '--' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUrlParam } from '@sutpc/zebra';
const paramsValue = JSON.parse(getUrlParam('value') || '{}');
const config = [
  {
    code: 'totalParkingSpace',
    name: '停车位数',
    color: 'rgb(5, 160, 255)'
  },
  {
    code: 'totalGun',
    name: '充电枪数',
    color: 'rgb(54, 248, 255)'
  },
  {
    code: 'stopChargeRatio',
    name: '停充配比',
    color: '#fff'
  }
].map((item, i) => {
  return {
    ...item
  };
});
</script>

<style scoped lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#pop-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 0 8px;
  background: rgba(#09294b, 0.8);

  .data-row {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    column-gap: 12px;

    .name {
      font-size: 12px;
      color: rgb(255, 255, 255);
    }

    .value {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
