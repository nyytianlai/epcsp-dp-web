<template>
  <panel>
    <div class="box">
      <title-column title="换电站整体信息" icon="battery" />
      <div class="num-wrap">
        <template v-for="(item, index) in cardData" :key="index">
          <num-card :data="item" classStyleType="bottomDown" />
        </template>
      </div>
    </div>
    <div class="box">
      <tabs :data="deviceInfoTabs" />
      <div class="num-wrap">
        <template v-for="(item, index) in deviceInfoData" :key="index">
          <num-card :data="item" />
        </template>
      </div>
    </div>
    <div class="company-rank">
      <title-column title="今日站点换电次数排名" icon="battery" />
      <!-- <area-rank-list :data="companyRankData" :totalNum="companyRankTotal" height="2.54rem" /> -->
      <rank-list :data="rankData" :totalNum="rankTotal" height="4.2rem" />
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import {
  powerExchangeAllInfoFun,
  rankDataFun,
  deviceInfoDataFun,
  deviceInfoTabs
} from '../../config';
const state = reactive({
  cardData: powerExchangeAllInfoFun(),
  rankData: rankDataFun(),
  rankTotal: rankDataFun()[0].num,
  deviceInfoData: deviceInfoDataFun()
});
const { cardData, rankData, rankTotal, deviceInfoData } = toRefs(state);
</script>

<style lang="less" scoped>
.box {
  margin-bottom: 22px;
  &:last-child {
    margin-bottom: 0;
  }
  .num-wrap {
    display: flex;
    justify-content: space-between;
    height: 160px;
    padding: 0 22px;
    margin-top: 16px;
    background: linear-gradient(
      255.75deg,
      rgba(37, 177, 255, 0.02) 23.33%,
      rgba(37, 177, 255, 0.2) 100%
    );
    mix-blend-mode: normal;
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(41, 76, 179, 0.2);
    border-radius: 4px;
  }
}

.company-rank {
  margin-top: 22px;
}
</style>
