<template>
  <div class="baoqing-child">
    
    <el-select v-model="systemValue" placeholder="请选择" class="select">
      <el-option v-for="item in baoqingSytemStatusData" :key="item.value" :label="item.value" :value="item.value" />
    </el-select>
    <Back name="宝清储能站" class="back-btn" @click="handleBack" />
    <video :src="curBtn === 0?get:put" loop class="video" autoplay></video>
    <div class="btn-box">
      <div class="btn-item" v-for="(item, index) in btnList" @click="hanldeTab(item)">
        <img :src="index === curBtn ? item.imgH : item.img" alt="">
        <div class="text" :class="{ active: index === curBtn }">{{ item.name }}</div>
      </div>
    </div>
    <rightSlide>
      <title-column title=" #1储能分系统" icon="" />
      <div class="basic-msg">
        <div class="title">分系统基础信息</div>
        <div class="msg-box">
          <div class="msg" v-for="(item, index) in msgList" :key="index">
            <span class="label">{{ item.label }}：</span><span class="value">{{ item.value }}</span>
          </div>
        </div>
      </div>
      <div class="warn-msg">
        <div class="title">PCS告警信息</div>
        <EcResize :option="baoqingWarnOption" :style="{ height: '2.3rem' }" />

      </div>
    </rightSlide>
    
  </div>
</template>
<script setup lang="ts">
import { baoqingSytemStatusData } from '../config'
import { ref } from 'vue'
import Back from './back.vue'
import baoqingChild1l from './images/baoqing-child1-l.png'
import baoqingChild1h from './images/baoqing-child1-h.png'
import baoqingChild2l from './images/baoqing-child2-l.png'
import baoqingChild2h from './images/baoqing-child2-h.png'
import EcResize from '@sutpc/vue3-ec-resize';
import get from './video/get.mp4'
import put from './video/put.mp4'
import {
  baoqingWarnOption,
  msgList
} from '../config'
const emits = defineEmits(['back'])
//选择器
const systemValue = ref('#1储能分系统')
// 按钮
const curBtn = ref(0)
const btnList = ref([
  {
    name: '充电演示',
    value: 0,
    img: baoqingChild1l,
    imgH: baoqingChild1h
  },
  {
    name: '放电演示',
    value: 1,
    img: baoqingChild2l,
    imgH: baoqingChild2h
  }
])
const tab1 = ref(0)
const handleBack = () => {
  emits('back')
}
const hanldeTab = (item) => {
  curBtn.value = item.value
}
</script>
<style lang="less" scoped>
.baoqing-child {
  position: fixed;
  z-index: 999;
  background: #000;
  width: 100%;
  height: 975px;
  top: 105px;
  left: 0px;
  padding: 32px 20px;


  .select {
    background: rgba(0, 23, 45, 0.9);
    border: 1px solid rgba(84, 181, 255, 0.8);
    color: #FFFFFF;
    z-index: 10;
  }

  .back-btn {
    position: absolute;
    left: 253px;
    top: 30px;
    z-index: 10;

  }
}

.btn-box {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);

  .btn-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
    color: #B4E4FF;

    &:nth-last-of-type(1) {
      margin-top: 23px;
    }

    .text {
      padding: 12px 29px;
      margin-left: -25px;
    }

    .active {
      background: linear-gradient(270deg, rgba(75, 169, 255, 0) 2.08%, rgba(75, 158, 255, 0.639) 49.01%, rgba(10, 167, 255, 0) 98.96%);
      color: #FFFFFF;
      font-size: 20px;
    }
  }
}

.title {
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 16px;
  color: #FFFFFF;
  padding: 5px 16px;
  background: linear-gradient(96.34deg, rgba(84, 181, 255, 0.56) 5%, rgba(84, 181, 255, 0) 95%);
}

.basic-msg {
  margin-top: 25px;
  font-weight: 400;
  font-size: 16px;
  .msg {
    margin-top: 16px;
  }
  .label {
    color: rgba(255, 255, 255, 0.7);
  }

  .value {
    color: #fff;
  }
}

.warn-msg {
  margin-top: 25px;

}
.video {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  height: 100%;
  
}
</style>