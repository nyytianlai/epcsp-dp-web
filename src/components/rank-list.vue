<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 17:39:05
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-11 19:24:51
 * @FilePath: \epcsp-dp-web\src\components\rank-list.vue
 * @Description: 排名列表 有项目名称
-->
<template>
  <div class="rank-list-wrap">
    <ul class="content">
      <li class="list-item" v-for="(item, index) in data" :key="index">
        <div class="top-info">
          <span class="rank-name">
            <span class="rank-num">{{ index + 1 }}</span>
            <span class="name">{{ item.name }}</span>
          </span>
          <span class="num">
            <span>{{ item.num }}</span>
            <span class="unit">/{{ item.unit }}</span>
          </span>
        </div>
        <div class="bottom-bar">
          <div class="progress" :style="{ width: `${(item.num / totalNum) * 100}%` }"></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
interface Idata {
  name: string;
  num: number;
  unit: string;
}
type Itype = 'top-down' | 'left-right';
interface Props {
  data: Idata[];
  totalNum: number;
}
const props = withDefaults(defineProps<Props>(), {});
const { data, totalNum } = toRefs(props);
</script>
<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  width: 411px;
}
.list-item {
  margin-bottom: 12px;
  .top-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    .rank-name {
      display: flex;
      align-items: center;
      .rank-num {
        width: 24px;
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
      .unit {
        color: rgba(230, 247, 255, 0.5);
      }
    }
  }
  &:last-of-type {
    margin-bottom: 0;
  }
  &:nth-of-type(1),
  &:nth-of-type(2),
  &:nth-of-type(3) {
    .top-info .rank-name .rank-num {
      border: 1px solid;
      border-image: linear-gradient(to right, #1890ff, #1ee7e7) 1;
    }
  }
  &:nth-of-type(n + 4) {
    .top-info .rank-name .rank-num {
      background: rgba(75, 222, 255, 0.3);
    }
  }
}

.bottom-bar {
  background: rgba(255, 255, 255, 0.1);
  height: 6px;
  .progress {
    height: 100%;
    background: linear-gradient(270deg, #13adc4 0%, #0b2f55 100%);
  }
}
</style>
