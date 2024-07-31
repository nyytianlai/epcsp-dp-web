<template>
  <div class="rank-list-wrap">
    <ul class="content" v-if="data && data.length">
      <li class="list-item" v-for="(item, index) in data" :key="index">
        <div class="top-info">
          <span class="rank-name">
            <span class="rank-num">{{ index + 1 }}</span>
            <span class="name">{{ item.name }}</span>
          </span>
          <span class="num">
            <span>{{ formatWithToLocalString(item.num) }}</span>
            <span class="unit">{{ item.unit || '' }}</span>
          </span>
        </div>
        <div class="bottom-bar">
          <div class="progress" :style="{ width: `${(item.num / totalNum) * 100 || 0}%` }">
            <icon icon="svg-icon:circle-point" />
          </div>
        </div>
      </li>
    </ul>
    <no-data v-else />
  </div>
</template>
<script setup lang="ts">
import { toRefs, ref } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import { formatWithToLocalString } from '@/global/commonFun.js';
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
.rank-list-wrap {
  overflow: hidden auto;
  padding: 8px;
  padding-left: 0;
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
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
      border-image: linear-gradient(94.35deg, #1890ff, #1ee7e7) 1;
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
    position: relative;
    transition: width 0.3s linear;
    .el-icon {
      position: absolute;
      font-size: 12px;
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
    }
  }
}
</style>
