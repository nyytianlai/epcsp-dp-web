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
      name: '基线',
      code: 'baseline',
      value: null,
      unit: 'MW'
    },
    {
      name: '计划',
      code: 'planNum',
      value: null,
      unit: 'MW'
    },
    {
      name: '实际',
      code: 'actualNum',
      value: null,
      unit: 'MW'
    },
    {
      name: '实际调节',
      code: 'actualAdjust',
      value: null,
      unit: 'MW'
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
    white-space: nowrap;
  }

  .card-value {
    color: #00fff9;
    font-size: 18px;
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    line-height: 20px;
    font-family: 'DIN Condensed';
    white-space: nowrap;

    span {
      font-size: 12px;
      font-weight: 400;
      margin-left: 4px;
    }
  }
}
</style>
