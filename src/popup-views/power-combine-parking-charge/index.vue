<template>
  <div class="pop-wrapper" @click="handleClick">
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
      name: '停车位',
      code: 'totalParkingSpace',
      value: null,
      unit: '个'
    },
    {
      name: '充电枪',
      code: 'totalGun',
      value: null,
      unit: '个'
    }
  ].map((item) => {
    item.value = paramsValue[item.code];
    return item;
  });
});

const handleClick = () => {
  window.ue && window.ue.dtspoi.postevent(`click-${paramsValue?.areaCode}`);
};
</script>

<style scoped lang="less">
.pop-wrapper {
  width: 100%;
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
