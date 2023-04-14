<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-12 16:10:29
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-13 14:40:16
 * @FilePath: \epcsp-dp-web\src\components\panel\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="panel" :class="type">
    <slot />
    <div class="circle-bg"></div>
  </div>
</template>
<script setup lang="ts">
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
.panel {
  position: absolute;
  top: 126px;
  left: 30px;
  width: 426px;
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
