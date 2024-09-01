<template>
  <div class="pop-wrapper" @click="handleClick">
    <div class="title">{{ paramsValue.stationName }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getUrlParam } from '@sutpc/zebra';
const paramsValue = JSON.parse(getUrlParam('value') || '{}');
const handleClick = () => {
  // @ts-ignore
  window.ue && window.ue.dtspoi.postevent(`click-minle`);
};
</script>

<style scoped lang="less">
.pop-wrapper {
  width: 100%;
  height: 100%;
  background: url('./images/pop-bg.png') no-repeat left top/100% 100%;
  padding: 8px 15px 22px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
.title {
  white-space: nowrap;
  font-size: 24px;
  color: #fff;
  font-weight: 580;
  text-align: center;
}
</style>
