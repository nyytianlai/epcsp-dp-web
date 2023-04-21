<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 19:32:11
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-21 14:51:31
 * @FilePath: \epcsp-dp-web\src\components\title-column\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="title-column">
    <span class="title">{{ title }}</span>
    <button-base v-if="showBtn" @handleClick="handleClick">{{btnText}}</button-base>
  </div>
</template>
<script setup lang="ts">
import {onMounted,ref,onBeforeUnmount,toRefs } from 'vue'
interface Props {
  title: string;
  btnText?: string;
  showBtn?:boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: '我是标题',
  btnText: '查看更多',
  showBtn:false
});
const emit = defineEmits(['handleClick'])
const { title, btnText } = toRefs(props);
const handleClick = () => {
  emit('handleClick')
}
</script>
<style lang="less" scoped>
.title-column {
  position: relative;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  height: 49px;
  color: #ffffff;
  background: url(./images/title-column-bgc.png) no-repeat;
  background-size: 100% 38px;
  background-position: bottom left;
}
.border-out {
  position: absolute;
  top: 2px;
  right: 12px;
}
.title {
  position: absolute;
  left: 44px;
  bottom: 24px;
  transform: matrix(1, 0, -0.34, 0.94, 0, 0);
}
</style>
