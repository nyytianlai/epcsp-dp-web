<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-12 16:10:29
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-23 16:25:20
 * @FilePath: \epcsp-dp-web\src\components\panel\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="mask-bgc" :class="type" v-if="panelShow"></div>
  <transition>
      <div class="panel" :class="type" v-if="panelShow">
        <slot />
        <!-- <div class="circle-bg"></div> -->
      </div>
    </transition>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, toRefs } from 'vue'
import { useVisibleComponentStore } from '@/stores/visibleComponent'
const store = useVisibleComponentStore()
type Itype = 'left' | 'right';
interface Props {
  type: Itype;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'left'
});
const { type } = toRefs(props);
const panelShow = computed(() => {
  return store.panelShow
})
</script>
<style lang="less" scoped>
.mask-bgc {
  background: linear-gradient(
    270deg,
    rgba(0, 65, 129, 0) 0%,
    rgba(0, 20, 40, 0.81) 36.31%,
    #00101f 95.21%
  );
  opacity: 0.8;
  border-radius: 4px;
  width: 739px;
  height: 1080px;
  position: absolute;
  top: 0;
  z-index: 1;
  pointer-events: none;
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
    background: linear-gradient(
      270deg,
      #00101f 0%,
      rgba(0, 20, 40, 0.81) 59.5%,
      rgba(0, 65, 129, 0) 95.21%
    );
  }
}
.panel {
  position: absolute;
  top: 126px;
  left: 30px;
  width: 400px;
  z-index: 20;
  .circle-bg {
    position: absolute;
    width: 622px;
    height: 1049px;
    background: url(./images/circle-bgc.png) no-repeat;
    background-size: 100% 100%;
    pointer-events: none;
  }
  &.left {
    .circle-bg {
      right: 0;
      top: -111px;
      transform: translateX(634px);
    }
  }
  &.right {
    left: unset;
    right: 30px;
    .circle-bg {
      top: -111px;
      left: 0;
      -moz-transform: scaleX(-1) translateX(634px);
      -webkit-transform: scaleX(-1) translateX(634px);
      -o-transform: scaleX(-1) translateX(634px);
      transform: scaleX(-1) translateX(634px);
      transform-origin: center;
      /*兼容IE*/
      filter: FlipV;
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
