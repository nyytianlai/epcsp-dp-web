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
      transform: translateX(100%);
    }
  }
  &.right {
    left: unset;
    right: 30px;
    .circle-bg {
      top: -111px;
      left: 0;
      -moz-transform: scaleX(-1) translateX(100%);
      -webkit-transform: scaleX(-1) translateX(100%);
      -o-transform: scaleX(-1) translateX(100%);
      transform: scaleX(-1) translateX(100%);
      transform-origin: center;
      /*兼容IE*/
      filter: FlipV;
    }
  }
}
</style>
