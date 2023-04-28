<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-23 10:55:27
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-28 14:10:39
 * @FilePath: \epcsp-dp-web\src\components\layout\components\expand-btn\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="expand-btn" @click="handleClick" :class="[{ collapse: isCollapsed }]">
    <div class="down-wrap"></div>
    <div class="up-wrap"></div>
    <icon :icon="`svg-icon:${isCollapsed ? 'expand' : 'collapse'}`" />
    <span class="text">{{ isCollapsed ? '一键展开' : '一键收起' }}</span>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import { useStore } from 'vuex';
import { getImageUrl, infoObj } from '@/global/config/map';

const store = useStore();
const isCollapsed = ref(false);
const aircityObj = inject('aircityObj');

const handleClick = () => {
  const __g = aircityObj.value?.acApi;
  isCollapsed.value = !isCollapsed.value;
  store.commit('CHANGE_SHOW_PANEL', !isCollapsed.value);
  if(store.getters.showDetail)return
  isCollapsed.value ? __g.camera.set(infoObj.szViewFull, 0.2) : __g.camera.set(infoObj.szView, 0.2);
};
</script>
<style lang="less">
.expand-btn {
  width: 63px;
  height: auto;
  position: absolute;
  top: 67px;
  left: 0;
  z-index: 999;
  overflow-x: hidden;
  overflow-y: visible;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    width: 122px;
    .text {
      opacity: 1;
    }
  }
  .el-icon {
    font-size: 16px;
    position: absolute;
    top: 11px;
    left: 16px;
  }
  .text {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    position: absolute;
    top: 9px;
    left: 40px;
    white-space: nowrap;
    opacity: 0;
  }
  .down-wrap {
    width: 100%;
    height: 32px;
    background: url(./images/down-bgc.png);
    background-size: 122px 32px;
    background-position: bottom right;
  }
  .up-wrap {
    width: 100%;
    height: 32px;
    background: url(./images/up-bgc.png);
    background-size: 119px 32px;
    background-position: bottom right;
    transform: translate(-3px, -29px);
  }
}
</style>
