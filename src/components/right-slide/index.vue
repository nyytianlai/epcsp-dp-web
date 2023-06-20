<template>
  <div class="right-slide-box" :class="{'hide-panel':!isOpen}">
    <img :src="isOpen?hide:open" alt=""  @click="()=>isOpen = !isOpen" class="icon">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import hide from './images/hide.png'
import open from './images/open.png'
// 是否打开
const isOpen = ref(true) 
</script>
<style lang="less" scoped>
.right-slide-box{
  width: 432px;
  height: 857px;
  background: linear-gradient(270deg, rgba(25, 59, 103, 0) 0%, rgba(55, 94, 139, 0.19) 23.82%, rgba(41, 85, 136, 0.8) 100%);
  filter: drop-shadow(6px 0px 10px rgba(0, 0, 0, 0.3));
  padding: 20px 16px;
  position: absolute;
  right: 0;
  transition: all 0.3s ease;
  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -49px;
    cursor: pointer;
  }
}
.hide-panel {
  right: -432px;
  .icon {
    left: -30px;
  }
}
</style>