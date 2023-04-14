<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-12 10:47:31
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-14 11:33:12
 * @FilePath: \epcsp-dp-web\src\views\default-demo\components-show\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="components-wrap">
    <el-space wrap>
      <div class="num-wrap">
        <template v-for="(item, index) in cardData" :key="index">
          <num-card :data="item" />
        </template>
      </div>
      <div class="num-wrap1">
        <template v-for="(item, index) in cardData" :key="index">
          <num-card :data="item" type="left-right" />
        </template>
      </div>
      <rank-list :data="projectList" :totalNum="totalNum" />
      <title-column title="充电设施总量" />
      <tabs :data="tabsData" />
      <button-base>查看更多</button-base>
      <warning-list :data="warningListData" />
      <bottom-menu-tabs :data="tabsData"/>
      <warning-tabs :data="warningTabsData" />
      <area-rank-list :data="areaRankData" :totalNum="totalNum" />
      <pie-chart/>
      <line-time-chart/>
    </el-space>
  </div>
</template>
<script setup>
import NumCard from '@/components/num-card.vue';
import RankList from '@/components/rank-list.vue';
import TitleColumn from '@/components/title-column/index.vue';
import Tabs from '@/components/tabs/index.vue';
import ButtonBase from '@/components/button-base.vue';
import { cdsszlFun, projectListFun, tabDataFun,warningListFun,warningTabsDataFun,areaRankDataFun } from './config.js';
const cardData = ref(cdsszlFun());
const projectList = ref(projectListFun());
const totalNum = ref(6399);
const tabsData = ref(tabDataFun());
const warningListData = ref(warningListFun())
const select = ref('Option2')
const warningTabsData = ref(warningTabsDataFun())
const areaRankData = ref(areaRankDataFun())
</script>
<style lang="less" scoped>
.components-wrap {
  padding: 50px;
}
.num-wrap {
  display: flex;
  justify-content: space-between;
  width: 426px;
  height: 160px;
  padding: 0 22px;
  background: linear-gradient(
    255.75deg,
    rgba(37, 177, 255, 0.02) 23.33%,
    rgba(37, 177, 255, 0.2) 100%
  );
  mix-blend-mode: normal;
  box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(41, 76, 179, 0.2);
  border-radius: 4px;
}
</style>
