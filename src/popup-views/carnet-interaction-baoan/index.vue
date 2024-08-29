<template>
  <div class="pop-wrapper">
    <div class="title">{{ paramsValue.stationName }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getUrlParam } from '@sutpc/zebra';
const paramsValue = JSON.parse(getUrlParam('value') || '{}');
</script>

<style scoped lang="less">
.pop-wrapper {
  width: 100%;
  background: url('./images/pop-bg.png') no-repeat left top/100% 100%;
  padding: 8px 15px 15px;
  display: flex;
  flex-flow: column;
}
.title {
  white-space: nowrap;
  font-size: 12px;
  color: #fff;
  font-weight: 400;
}
</style>
