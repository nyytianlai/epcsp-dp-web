<template>
  <div class="pop-wrapper">
    <div class="card-row">
      <div class="card-name route-name">{{ paramsValue.lineName || '推荐线路' }}</div>
    </div>
    <div class="card-row" v-for="item in cardConfig" :key="item.code">
      <div class="card-name">{{ item.name }}</div>
      <div class="card-value" :title="item.value">{{ item.value }}{{ item.unit }}</div>
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
      name: 'V2G场站名称',
      code: 'name',
      value: null
    },
    {
      name: '距离',
      code: 'distance',
      value: null
    },
    {
      name: '前往时长',
      code: 'wasteTime',
      value: null,
      unit: 'h'
    },
    {
      name: 'V2G桩数量',
      code: 'poleNumber',
      value: null,
      unit: '个'
    },
    // {
    //   name: 'V2G桩空闲状态',
    //   code: 'statuses',
    //   value: null,
    //   unit: ''
    // },
    {
      name: 'V2G桩最大放电功率',
      code: 'maxPower',
      value: null,
      unit: 'KW'
    }
  ].map((item) => {
    if (item.code === 'statuses') {
      const status = {
        0: '离网',
        1: '空闲',
        2: '占用（未充放电）',
        3: '占用（充放电中）',
        4: '占用（预约锁定）',
        5: '占用（充电完成）',
        255: '故障'
      };
      const statusNum = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 255: 0 };
      paramsValue.statuses.forEach((el: any) => {
        statusNum[el.status] += 1;
      });
      let str = '';
      Object.keys(statusNum)
        .filter((item) => !!statusNum[item])
        .forEach((el) => {
          console.log(el);
          str += `${status[el]}${statusNum[el]}个/`;
        });
      item.value = str.slice(0, str.length - 1);
    } else {
      item.value = paramsValue[item.code];
    }
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
  row-gap: 8px;
}

.card-row {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  .card-name {
    flex: 0 0 120px;
    text-align: right;
    font-size: 14px;
    color: #fff;
    font-weight: 400;
    white-space: nowrap;
  }

  .route-name {
    color: #00fff9;
  }

  .card-value {
    margin-left: 12px;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #00fff9;
    font-size: 14px;
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    line-height: 16px;
    font-family: 'DIN Condensed';
    white-space: nowrap;
    justify-content: flex-end;

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
