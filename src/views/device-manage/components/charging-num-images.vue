<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 09:12:43
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-23 09:45:22
 * @FilePath: \epcsp-dp-web\src\views\device-manage\components\charging-num-images.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="images-wrap">
        <div class="img-content" v-for="(item,index) in data" :key="index" @click="handleClick(item)">
            <img :src="item.stationPic" alt="">
            <span class="type">{{ item.stationType }}</span>
            <span class="name text-ellipsis-1">{{ item.stationName }}</span>
        </div>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import gmdPng from './images/gmd.png'
import fwqPng from './images/fwq.png'
import gccPng from './images/gcc.png'
import v2gPng from './images/v2g.png'
import lsgfPng from './images/lsgf.png'
const store = useStore()
const props = defineProps({
    data:{
        type:Array,
        default:()=>[]
    }
})
const handleClick = (item) => {
  store.commit('CHANGE_SHOW_COMPONENT', false);
  store.commit('CHANGE_SHOW_DETAIL', {
    show: true,
    params: item
  });
}
</script>
<style lang="less" scoped>
.images-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 434px;
  .img-content {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-right: 8px;
    align-items: center;
    margin-bottom: 12px;
    width: 128px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:nth-child(n + 4) {
      margin-bottom: 0;
    }
    img {
      width: 100%;
      height: 80px;
    }
    .type {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      line-height: 20px;
      font-weight: 500;
      font-size: 12px;
      background: linear-gradient(90deg, #11467b 0%, rgba(17, 70, 123, 0) 100%);
      padding-left: 8px;
    }
    .name {
      font-weight: 600;
      font-size: 12px;
      line-height: 20px;
      /* identical to box height, or 167% */
      color: #4bdeff;
      margin-top: 4px;
      max-width: 100%;
    }
  }
}
</style>