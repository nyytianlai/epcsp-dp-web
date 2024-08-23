<template>
  <div class="pop-wrapper">
    <div class="title">{{ paramsValue.stationName }}</div>
    <div class="card-row">
      <div class="card-name">{{ 'V2G桩数' }}</div>
      <div class="card-value">
        {{ paramsValue.pileNum ?? '--' }}
        <span>{{ '个' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getUrlParam } from '@sutpc/zebra';
const paramsValue = JSON.parse(getUrlParam('value') || '{}');
</script>

<style scoped lang="less">
.pop-wrapper {
  // width: 100%;
  background: url('./images/pop-bg.png') no-repeat left top/100% 100%;
  padding: 8px 12px;
  display: flex;
  flex-flow: column;
}
.title {
  white-space: nowrap;
  font-size: 12px;
  color: #fff;
  font-weight: 400;
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
