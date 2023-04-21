<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-12 16:10:29
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-18 10:12:44
 * @FilePath: \epcsp-dp-web\src\components\panel\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="mask-bgc" :class="type"></div>
  <div class="panel" :class="type">
    <slot />
    <!-- <div class="circle-bg"></div> -->
  </div>
</template>
<script setup lang="ts">
import {onMounted,ref,onBeforeUnmount,toRefs } from 'vue'
type Itype = 'left' | 'right';
interface Props {
  type: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'left'
});
const { type } = toRefs(props);
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
  z-index: 5;
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
</style>
