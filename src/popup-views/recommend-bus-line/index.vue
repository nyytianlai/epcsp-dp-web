<template>
  <div class="pop-wrapper">
    <div class="card-row" v-for="item in cardConfig" :key="item.code">
      <div class="card-name">{{ item.name }}</div>
      <div class="card-value">
        {{ item.value ?? '--' }}
        <!-- <span v-show="item.unit">{{ item.unit }}</span> -->
      </div>
    </div>
    <!-- <div class="bottom-btn">
      <div class="detail"><div class="content" @click="handleToRecommend">放电推荐路线</div></div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getUrlParam } from '@sutpc/zebra';
const paramsValue = JSON.parse(getUrlParam('value') || '{}');
const cardConfig = computed(() => {
  return [
    {
      name: '站点名称',
      code: 'name',
      value: null
    }
    // {
    //   name: '线路编码',
    //   code: 'line',
    //   value: null
    // }
    // {
    //   name: '可调容量',
    //   code: 'adjustableCapacity',
    //   value: null,
    //   unit: 'MW'
    // },
    // {
    //   name: '报装容量',
    //   code: 'installedCapacity',
    //   value: null,
    //   unit: 'MA'
    // }
  ].map((item) => {
    item.value = paramsValue[item.code];
    return item;
  });
});

const handleToRecommend = () => {
  // @ts-ignore
  window.ue && window.ue.dtspoi.postevent(`click-recommend-line`);
};
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
  align-items: center;

  .card-name {
    font-size: 18px;
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
    }
  }
}
.bottom-btn {
  display: flex;
  justify-content: flex-end;
}
.detail {
  width: 103px;
  height: 28px;
  padding: 3px;
  border-radius: 4px;
  background: url(./images/blue-btn-bgc.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 4px;
  cursor: pointer;
  .content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(270deg, #0a4174 0%, #3483df 100%);
    border: 1.5px solid #99ceff;
    font-size: 14px;
    color: #fff;
  }
}
</style>
