<template>
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
</template>
<script setup>
import NumCard from '@/components/num-card.vue';
import RankList from '@/components/rank-list.vue';
import TitleColumn from '@/components/title-column/index.vue';
import { cdsszlFun, projectListFun } from './config.js';
const cardData = ref(cdsszlFun());
const projectList = ref(projectListFun());
const totalNum = ref(6399);
</script>
<style lang="less" scoped>
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
