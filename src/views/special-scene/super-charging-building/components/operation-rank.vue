<template>
  <div class="area-distributed">
    <title-column title="今日运行排名" />
    <tabs :data="operationRankTabType" @changeTab="handleStation" />
    <div class="distributed-content">
      <rank-list
        class="operating-rank__list"
        :data="projectList"
        :totalNum="projectTotalNum"
        height="100%"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { operationRankTabType } from '../config.js';
const projectTotalNum = ref(140);
const projectList = ref([
  { name: '北京', value: 100 },
  { name: '上海', value: 90 },
  { name: '广州', value: 80 },
  { name: '深圳', value: 70 },
  { name: '杭州', value: 60 },
  { name: '南京', value: 50 },
  { name: '成都', value: 40 },
  { name: '重庆', value: 30 },
  { name: '武汉', value: 20 },
  { name: '西安', value: 10 }
]);
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

    .operating-rank__list {
      width: 100%;
      height: 100%;
      padding-left: 12px;
    }
  }
}
</style>
