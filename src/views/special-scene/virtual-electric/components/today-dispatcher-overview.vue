<template>
  <div class="today-dispatcher">
    <title-column title="今日调度总览" />
    <div class="distributed-content">
      <div class="left-data">
        <div class="left-card-item" v-for="item in leftConfig" :key="item.name">
          <img class="icon" :src="item.icon" />
          <div class="card-data">
            <div class="value fontSize24DIN">
              {{ formatWithToLocalString(allData[item.code]) ?? '--' }}
              <span class="fontSize16DIN">{{ item.unit }}</span>
            </div>
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="right-guage">
        <GaugeChart :speed="allData.finishRate" :coord="'完成率(%)'" v-show="!isEmpty" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { scale } from '@sutpc/config';
import GaugeChart from '@/components/gauge-chart/index.vue';
import { formatWithToLocalString } from '@/global/commonFun.js';
import Api from '../api';

const loading = ref(true);
const isEmpty = ref(false);
const allData = ref<any>({});

const leftConfig = [
  {
    name: '计划总量',
    code: 'plan',
    unit: 'MW',
    icon: new URL('../images/jhzl.png', import.meta.url).href
  },
  {
    name: '执行总量',
    code: 'actual',
    unit: 'MW',
    icon: new URL('../images/zxzl.png', import.meta.url).href
  },
  {
    name: '偏差总量',
    code: 'deviation',
    unit: 'MW',
    icon: new URL('../images/pczl.png', import.meta.url).href
  }
];

const getData = async () => {
  loading.value = true;
  try {
    const res = await Api.adjustOverview();
    allData.value = res?.data || {};
  } catch (error) {}
  loading.value = false;
};
getData();
</script>

<style scoped lang="less">
.today-dispatcher {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .distributed-content {
    flex: 1;
    min-height: 0;
    border-radius: 4px;
    display: flex;
    flex-flow: row nowrap;
    padding: 20px;

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );
  }

  .left-data {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    row-gap: 14px;
    flex: 0 0 164px;

    .left-card-item {
      flex: 0 0 56px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: 0 6px;
      column-gap: 8px;
      border-radius: 28px;
      // background: linear-gradient(to left, rgba(40, 105, 119, 0), rgba(75, 169, 255, 0.6));
      background: url('../images/card-bg.png') no-repeat left top/100% 100%;
      position: relative;

      .icon {
        flex: 0 0 45px;
        width: 45px;
      }

      .card-data {
        display: flex;
        flex-flow: column nowrap;
        white-space: nowrap;
      }

      .value {
        background-image: linear-gradient(to bottom, rgb(255, 255, 255), rgb(0, 163, 255));
        background-clip: text;
        text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
      }

      .name {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  .right-guage {
    flex: 1;
    min-width: 0;
  }
}
</style>
