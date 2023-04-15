<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 12:55:20
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-14 17:54:14
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
          <num-card
            :data="item"
            type="left-right"
            classStyleType="leftRightStyle1"
          />
        </template>
      </div>
    </div>
    <div class="operating-company">
      <title-column title="运营企业年度TOP10" />
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
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
    </div>
    <div class="today-power-info">
      <title-column title="今日充电功率信息" />
      <div class="num-wrap">
        <template v-for="(item, index) in powerInfoNumData" :key="index">
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
      <line-time-chart :data="lineTimeData" :colors="['green','blue']"/>
    </div>
    <div class="today-warning-message">
      <title-column title="今日告警信息" />
      <warning-tabs :data="warningTabsData" />
      <warning-list :data="warningListData" />
    </div>
  </panel>
  <bottom-menu-tabs :data="bottomTabsData"/>
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
  todayInfoNumDataFun,
  powerInfoNumDataFun,
  lineTimeDataFun,
  warningTabsDataFun,
  warningListFun,
  bottomTabDataFun
} from './config.js';
// 头部累计数据
const pageNumData = ref(pageNumFun());
//充电设施总量数据
const cardData = ref(cdsszlFun());
//充电桩总量和充电枪总量切换
const tabsData = ref(tabDataFun());
// 切换充电桩总量和充电枪总量数据
const pileChargerData = ref(pileChargerFun());
// 运营企业全年TOP10类型切换tab
const operatingTabsData = ref(operatingTabsFun());
// 运营企业全年TOP10类型运营企业数据
const projectList = ref(projectListFun());
const projectTotalNum = ref(6400);
// 今日充电设施数据信息tab
const todayTabs = ref(todayTabsFun());
const todayInfoNumData = ref(todayInfoNumDataFun());
// 充电功率
const powerInfoNumData = ref(powerInfoNumDataFun())
// 充电功率折线
const lineTimeData = ref(lineTimeDataFun())
console.log(lineTimeData.value);
// 今日告警信息tabData
const warningTabsData = ref(warningTabsDataFun())
const warningListData = ref(warningListFun())
//底部button
const bottomTabsData = ref(bottomTabDataFun());

const handleChangeTab = (data, type) => {
  console.log(data, type);
  if (type === 'charger') {
    //切换充电桩总量和充电枪总量
    pileChargerData.value = pileChargerFun(data.code);
  } else if (type === 'operating') {
    // 切换运营企业全年TOP10类型
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
    margin-top: 20px;
  }
}
.today-num-info {
  .tabs {
    margin-top: 8px;
  }
  .num-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    :deep(.num-card) {
      width: 49%;
      padding: 24px 0 11px;
      background: linear-gradient(
        258.38deg,
        rgba(37, 177, 255, 0.1) 2.46%,
        rgba(37, 177, 255, 0) 100%
      );
      mix-blend-mode: normal;
      box-shadow: inset 0px 0px 35px rgba(41, 76, 179, 0.2);
      filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.04));
      border-radius: 2px;
      justify-content: center;
      .info {
        flex-direction: column;
        .name {
          margin-bottom: 0;
        }
      }
    }
  }
}
.today-power-info {
  margin-top: 24px;
  .num-wrap {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    :deep(.num-card) {
      padding: 20px 0;
      width: 49%;
      background: linear-gradient(
        258.38deg,
        rgba(37, 177, 255, 0.1) 2.46%,
        rgba(37, 177, 255, 0) 100%
      );
      mix-blend-mode: normal;
      box-shadow: inset 0px 0px 35px rgba(41, 76, 179, 0.2);
      filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.04));
      border-radius: 2px;
      justify-content: center;
      .info {
        flex-direction: column;
        .name {
          margin-bottom: 0;
        }
      }
      .icon {
        width: 60px !important;
        height: 60px !important;
      }
    }
  }
  .ec-wrap {
    margin-top: 22px;
  }
}
.today-warning-message {
  margin-top: 21px;
  .warning-tabs {
    margin-top: 6px;
  }
  .warning-list {
    margin-top: 18px;
  }
}
</style>
