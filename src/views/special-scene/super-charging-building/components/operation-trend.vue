<template>
  <div class="area-distributed">
    <title-column title="行政区分布情况" />
    <tabs :data="operationTabType" @changeTab="handleStation" />
    <div class="distributed-content"></div>
  </div>
</template>

<script setup lang="ts">
import { operationTabType } from '../config.js';
const handleStation = (item) => {
  console.log('item', item);
  switch (item.code) {
    case 1:
      break;
    case 3:
      break;
  }
};
</script>

<style scoped lang="less">
.area-distributed {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .distributed-content {
    flex: 1;
    min-height: 0;
    border-radius: 4px;

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );
  }
}
</style>
