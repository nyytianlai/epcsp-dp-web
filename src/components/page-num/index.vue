<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-12 15:03:31
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-20 16:54:20
 * @FilePath: \epcsp-dp-web\src\components\page-num.vue\index.vue.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-num-wrap" :class="bgcType">
    <div class="num-wrap" v-for="(item, index) in data">
      <span class="name" :style="{color:item.nameColor}">{{ item.name }}</span>
      <span class="num-unit">
        <span class="num">{{ formatWithToLocalString(item.num) }}</span>
        <span class="unit">{{ item.unit }}</span>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted,ref,onBeforeUnmount,toRefs } from 'vue'
import { formatWithToLocalString } from '@/global/commonFun.js'

interface Idata {
  num: string | number;
  name: string;
  unit: string;
  nameColor?: string;
}
interface Props {
  data: Idata[];
  bgcType:string
}
const props = withDefaults(defineProps<Props>(), {});
const { data } = toRefs(props);
</script>
<style lang="less" scoped>
.page-num-wrap {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 819px;
  height: 79px;
  background: url(./images/bottom-bgc.png) no-repeat;
  background-size: 100% 63px;
  background-position: bottom left;
  padding: 0 80px 30px;
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
</style>
