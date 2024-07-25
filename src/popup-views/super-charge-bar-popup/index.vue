<template>
  <div id="pop-panel">
    <div class="name">
      <template v-for="item in config" :key="item.name">
        {{ item.name }}{{ item.seprate || '' }}
      </template>
    </div>
    <div class="value">
      <template v-for="item in config" :key="item.name">
        <span :style="{ color: item.color }">{{ paramsValue[item.code] ?? '--' }}</span>
        {{ item.seprate || '' }}
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUrlParam } from '@sutpc/zebra';
const paramsValue = JSON.parse(getUrlParam('value') || '{}');
const config = [
  {
    code: '',
    name: '规划',
    color: '#05A0FF',
    seprate: '/'
  },
  {
    code: '',
    name: '建设',
    color: '#6182FF',
    seprate: '/'
  },
  {
    code: '',
    name: '营运',
    color: '#2EFFFF'
  }
];
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
  row-gap: 4px;
  background: rgba(#226fc2, 0.8);

  .name {
    display: flex;
    flex-flow: row nowrap;
    font-size: 12px;
    color: #fff;
  }

  .value {
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    line-height: 21px;
    font-size: 14px;
    color: #ffffff;

    span {
      font-size: 18px;
    }
  }
}
</style>
