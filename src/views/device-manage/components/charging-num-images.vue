<template>
    <div class="images-wrap">
        <div class="img-content" v-for="(item,index) in data" :key="index">
            <img :src="item.image" alt="">
            <span class="type">{{ item.type }}</span>
            <span class="name">{{ item.name }}</span>
        </div>
    </div>
</template>
<script setup>
import gmdPng from './images/gmd.png'
import fwqPng from './images/fwq.png'
import gccPng from './images/gcc.png'
import v2gPng from './images/v2g.png'
import lsgfPng from './images/lsgf.png'
const props = defineProps({
    data:{
        type:Array,
        default:()=>[
            {
                type:'规模大',
                image:gmdPng,
                name:'民乐充电站'
            },
            {
                type:'服务区',
                image:fwqPng,
                name:'长圳服务区充电站'
            },
            {
                type:'光储充',
                image:gccPng,
                name:'公明南充电站'
            },
            {
                type:'V2G',
                image:v2gPng,
                name:'民兴院充电站'
            },
            {
                type:'光储充放',
                image:lsgfPng,
                name:'奥特迅电力大厦充电站'
            },
            {
                type:'绿色光伏',
                image:lsgfPng,
                name:'欢乐谷比亚迪充电站'
            },
        ]
    }
})
</script>
<style lang="less" scoped>
.images-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 434px;
  padding-left: 9px;
  .img-content {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-right: 8px;
    align-items: center;
    margin-bottom: 12px;
    width: 136px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:nth-child(n + 4) {
      margin-bottom: 0;
    }
    img {
      width: 100%;
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
    }
  }
}
</style>