<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 12:55:20
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-12 19:06:15
 * @FilePath: \epcsp-dp-web\src\views\overall\overview\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <page-num :data="pageNumData" />
  <panel>
    <div class="total-charging-facilities">
      <title-column title="充电设施总量" />
      <div class="num-wrap">
        <template v-for="(item, index) in cardData" :key="index">
          <num-card :data="item" />
        </template>
      </div>
    </div>
    <div class="pile-charger">
      <tabs :data="tabsData" @changeTab="(data) => handleChangeTab(data, 'charger')" />
      <div class="num-wrap">
        <template v-for="(item, index) in pileChargerData" :key="index">
          <num-card :data="item" type="left-right" />
        </template>
      </div>
    </div>
    <div class="operating-company">
      <title-column title="运营企业全年TOP5" />
      <tabs :data="operatingTabsData" @changeTab="(data) => handleChangeTab(data, 'operating')" />
      <rank-list :data="projectList" :totalNum="projectTotalNum" />
    </div>
  </panel>
  <panel type="right">
    <div class="today-num-info">
      <title-column title="今日充电设施数据信息" />
      <tabs :data="todayTabs" @changeTab="(data) => handleChangeTab(data, 'today')" />
      <div class="num-wrap">
        <template v-for="(item, index) in todayInfoNumData" :key="index">
          <num-card :data="item" type="left-right" />
        </template>
      </div>
    </div>
  </panel>
</template>
<script setup>
import PageNum from '@/components/page-num/index.vue';
import Panel from '@/components//panel/index.vue';
import {
  pageNumFun,
  cdsszlFun,
  tabDataFun,
  pileChargerFun,
  operatingTabsFun,
  projectListFun,
  todayTabsFun,
  todayInfoNumDataFun
} from './config.js';
// 头部累计数据
const pageNumData = ref(pageNumFun());
//充电设施总量数据
const cardData = ref(cdsszlFun());
//充电桩总量和充电枪总量切换
const tabsData = ref(tabDataFun());
// 切换充电桩总量和充电枪总量数据
const pileChargerData = ref(pileChargerFun());
// 运营企业全年TOP5类型切换tab
const operatingTabsData = ref(operatingTabsFun());
// 运营企业全年TOP5类型运营企业数据
const projectList = ref(projectListFun());
const projectTotalNum = ref(6400);
// 今日充电设施数据信息tab
const todayTabs = ref(todayTabsFun());
const todayInfoNumData = ref(todayInfoNumDataFun());

const handleChangeTab = (data, type) => {
  console.log(data, type);
  if (type === 'charger') {
    //切换充电桩总量和充电枪总量
    pileChargerData.value = pileChargerFun(data.code);
  } else if (type === 'operating') {
    // 切换运营企业全年TOP5类型
    projectList.value = projectListFun();
  } else if (type === 'today') {
    // 今日充电设施数据信息tab切换
  }
};
</script>
<style lang="less" scoped>
.total-charging-facilities {
  .num-wrap {
    display: flex;
    justify-content: space-between;
    height: 160px;
    padding: 0 22px;
    margin-top: 8px;
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
.pile-charger {
  margin-top: 20px;
  .num-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-top: 30px;
    .num-card {
      margin-bottom: 20px;
      &:nth-last-of-type(1),
      &:nth-last-of-type(2) {
        margin-bottom: 0;
      }
    }
  }
}
.operating-company {
  margin-top: 30px;
  .tabs {
    margin-top: 10px;
  }
  .rank-list-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 28px;
  }
}
.today-num-info {
  .tabs {
    margin-top: 8px;
  }
}
</style>
