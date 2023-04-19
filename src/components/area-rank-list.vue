<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 17:39:05
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-19 18:33:48
 * @FilePath: \epcsp-dp-web\src\components\rank-list.vue
 * @Description: 排名列表 有项目名称
-->
<template>
  <div class="area-rank-wrap" :style="{ height: height }">
    <ul class="content">
      <li class="list-item" v-for="(item, index) in data" :key="index">
        <span class="rank-name">
          <span class="rank-num">{{ index + 1 }}</span>
          <span class="name text-ellipsis-1">{{ item.name }}</span>
        </span>
        <div class="bottom-bar">
            

          <div class="line" v-for="(item,i) in new Array(5)" :key="i"></div>
          <div class="progress" :style="{ width: `${(item.num / totalNum) * 100}%` }"></div>
        </div>
        <span class="num">
          <span>{{ item.num }}</span>
          <span class="unit">/{{ item.unit }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
interface Idata {
  name: string;
  num: number;
  unit: string;
}
type Itype = 'top-down' | 'left-right';
interface Props {
  data: Idata[];
  totalNum: number;
  height: string;
}
const props = withDefaults(defineProps<Props>(), {
  height: '2.12rem'
});
const { data, totalNum } = toRefs(props);
</script>
<style lang="less" scoped>
.area-rank-wrap {
  overflow: hidden auto;
  padding-right: 8px;
  padding-left: 11px;
}
.content {
  display: flex;
  flex-direction: column;
  width: 411px;
  position: relative;
}
.list-item {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  .rank-name {
    display: flex;
    align-items: center;
    margin-right: 12px;
    min-width: 84px;
    max-width: 84px;
    .rank-num {
      width: 24px;
      min-width: 24px;

      height: 22px;
      border-radius: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 4px;
    }
    .name {

    }
  }
  .num {
    margin-left: 16px;
    min-width: 59px;
    white-space: nowrap;
    .unit {
      color: rgba(230, 247, 255, 0.5);
    }
  }

  &:last-of-type {
    margin-bottom: 0;
  }
  &:nth-of-type(1),
  &:nth-of-type(2),
  &:nth-of-type(3) {
    .rank-name .rank-num {
      border: 1px solid;
      border-image: linear-gradient(94.35deg, #1890ff, #1ee7e7) 1;
    }
  }
  &:nth-of-type(n + 4) {
    .rank-name .rank-num {
      background: rgba(75, 222, 255, 0.3);
    }
  }
}

.bottom-bar {
  background: rgba(255, 255, 255, 0.1);
  height: 8px;
  flex: 1;
  position: relative;
  .progress {
    height: 100%;
    background: linear-gradient(270deg, #13adc4 0%, #0b2f55 100%);
  }
}
.line {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 40px;
  width: 1px;
  border-left: 1px solid #bae7ff;
  &:nth-of-type(2) {
    left: 25%;
    border-left: 1px dashed rgba(230, 247, 255, 0.2);
  }
  &:nth-of-type(3) {
    left: 50%;
    border-left: 1px dashed rgba(230, 247, 255, 0.2);
  }
  &:nth-of-type(4) {
    left: 75%;
    border-left: 1px dashed rgba(230, 247, 255, 0.2);
  }
  &:nth-of-type(5) {
    left: 100%;
    border-left: 1px dashed rgba(230, 247, 255, 0.2);
  }
}
</style>
