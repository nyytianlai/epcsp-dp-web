<template>
  <transition>
    <div class="page-num-wrap" :class="bgcType" v-if="panelShow">
      <div class="num-wrap" v-for="(item, index) in data" :key="index">
        <span class="name" :style="{ color: item.nameColor }">{{ item.name }}</span>
        <span class="num-unit">
          <span class="num">
            {{
              item.digits
                ? formatWithToLocalString(item.num, item.digits)
                : formatWithToLocalString(item.num)
            }}
          </span>
          <span class="unit">{{ item.unit }}</span>
        </span>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { formatWithToLocalString } from '@/global/commonFun.js';
import { useVisibleComponentStore } from '@/stores/visibleComponent';

const store = useVisibleComponentStore();
interface Idata {
  num: string | number;
  name: string;
  unit: string;
  nameColor?: string;
  digits?: string | number;
}
interface Props {
  data: Idata[];
  bgcType?: string;
}
const props = withDefaults(defineProps<Props>(), {});
const { data } = toRefs(props);
const panelShow = computed(() => {
  return store.panelShow;
});
</script>
<style lang="less">
.layout-no-header {
  .page-num-wrap {
    top: 30px !important;
  }
}
</style>
<style lang="less" scoped>
.page-num-wrap {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 19;
  width: 746px;
  height: 79px;
  background: url(./images/bottom-bgc.png) no-repeat;
  background-size: 100% 70px;
  background-position: bottom left;
  padding: 0 64px 30px 76px;
  display: flex;
  justify-content: space-between;
  &.red-bgc {
    background-image: url(./images/bottom-red-bgc.png);
  }
  .num-wrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .name {
      font-family: 'Inter';
      font-weight: 400;
      font-size: 18px;
      line-height: 21px;
      color: #64def6;
      transform: matrix(1, 0, -0.25, 0.97, 0, 0);
    }
    .num-unit {
      font-family: 'PangMenZhengDao';
      transform: matrix(1, 0, -0.06, 1, 0, 0);
      .num {
        font-weight: 400;
        font-size: 25px;
        line-height: 28px;
        margin-right: 7px;
      }
      .unit {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
      }
    }
  }
}
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
