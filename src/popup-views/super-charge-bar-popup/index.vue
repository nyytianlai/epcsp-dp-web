<template>
  <div id="pop-panel">
    <!-- <div class="name">
      <template v-for="item in config" :key="item.name">
        {{ item.name }}{{ item.seprate || '' }}
      </template>
    </div>
    <div class="value">
      <template v-for="item in config" :key="item.name">
        <span :style="{ color: item.color }">{{ paramsValue[item.code] ?? '--' }}</span>
        <p class="seperate" v-if="item.seprate">{{ item.seprate || '' }}</p>
      </template>
    </div> -->
    <div class="value-row" v-for="item in config" :key="item.name">
      <div class="name">{{ item.name }}</div>
      <div class="value" :style="{ color: item.color }">{{ paramsValue[item.code] ?? '--' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUrlParam } from '@sutpc/zebra';
const paramsValue = JSON.parse(getUrlParam('value') || '{}');
const dataCode = paramsValue?.dataCode || [];
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
    name: '已建成',
    color: '#2EFFFF'
  },
  {
    code: '',
    name: '已接入',
    color: '#2EFFFF'
  }
].map((item, i) => {
  return {
    ...item,
    code: dataCode[i]
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
      font-family: 'DIN Condensed';
    }

    .seperate {
      margin: 0 2px;
    }
  }

  .value-row {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    row-gap: 6px;

    .name {
      flex: 0 0 56px;
      text-align: right;
    }
  }
}
</style>
