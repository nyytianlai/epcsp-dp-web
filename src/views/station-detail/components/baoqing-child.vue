<template>
  <div class="baoqing-child">
    <!-- <el-select v-model="systemValue" placeholder="请选择" class="select">
      <el-option
        v-for="item in baoqingSytemStatusData"
        :key="item.value"
        :label="item.value"
        :value="item.value"
      />
    </el-select> -->
    <!-- bqcnz: '宝清储能站'  -->
    <Back :name="t(`${tHead}.bqcnz`)" class="back-btn" @click="handleBack" />
    <div class="video-box">
      <video
        :src="curBtn === 0 ? get : put"
        loop
        class="video"
        ref="video"
        height="100%"
        width="100%"
        muted
        autoplay
      ></video>
    </div>
    <div class="btn-box">
      <div class="btn-item" v-for="(item, index) in btnList" @click="hanldeTab(item)">
        <img :src="index === curBtn ? item.imgH : item.img" alt="" />
        <div class="text" :class="{ active: index === curBtn }">{{ item.displayName || item.name }}</div>
      </div>
    </div>
    <rightSlide>
      <!--  cnfxt1: ' #1储能分系统' -->
      <title-column :title="t(`${tHead}.cnfxt1`)" icon="" />
      <div class="basic-msg">
        <!-- fxtjcxx: '分系统基础信息' -->
        <div class="title">{{ t(`${tHead}.fxtjcxx`) }}</div>
        <div class="msg-box">
          <div class="msg" v-for="(item, index) in msgList" :key="index">
            <!-- <span class="label">{{ item.displayLabel || item.label }}：</span> -->
            <tooltip-over
              :className="['baoqing-child-label-tooltip']"
              :content="(item.displayLabel || item.label)+ ':'"
              :ref-name="item.displayLabel || item.label"
            />
            <span class="value">{{ item.displayValue || item.value }}</span>
          </div>
        </div>
      </div>
      <div class="warn-msg">
        <!-- pcsgjxx: 'PCS告警信息' -->
        <div class="title">{{t(`${tHead}.pcsgjxx`)}}</div>
        <EcResize :option="baoqingWarnOption" :style="{ height: '2.3rem' }" />
      </div>
    </rightSlide>
  </div>
</template>
<script setup lang="ts">
import { baoqingSytemStatusData } from '../config';
import { ref, onMounted } from 'vue';
import Back from './back.vue';
import baoqingChild1l from './images/baoqing-child1-l.png';
import baoqingChild1h from './images/baoqing-child1-h.png';
import baoqingChild2l from './images/baoqing-child2-l.png';
import baoqingChild2h from './images/baoqing-child2-h.png';
import EcResize from '@sutpc/vue3-ec-resize';
import get from './video/get.mp4';
import put from './video/put.mp4';
import { baoqingWarnOption, msgList } from '../config';
import TooltipOver from '@/components/tooltip-over.vue';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `station-detail.components.baoqing-child`;

const emits = defineEmits(['back']);
//选择器
const systemValue = ref('#1储能分系统');
// 视频
const video = ref();
// 按钮
const curBtn = ref(0);

const btnList = ref([
  {
    name: '充电演示',
    value: 0,
    img: baoqingChild1l,
    imgH: baoqingChild1h,
    displayName: t(`${tHead}.btnList.cdys`)
  },
  {
    name: '放电演示',
    value: 1,
    img: baoqingChild2l,
    imgH: baoqingChild2h,
    displayName: t(`${tHead}.btnList.fdys`)
  }
]);
const tab1 = ref(0);
const handleBack = () => {
  emits('back');
};
const hanldeTab = (item) => {
  curBtn.value = item.value;
};
</script>
<style lang="less" scoped>
.baoqing-child {
  position: fixed;
  z-index: 999;
  background: url('./images/baoqing-bg.png');
  width: 100%;
  height: 975px;
  top: 105px;
  left: 0px;
  padding: 32px 20px;

  .select {
    background: rgba(0, 23, 45, 0.9);
    border: 1px solid rgba(84, 181, 255, 0.8);
    color: #ffffff;
    z-index: 10;
  }

  .back-btn {
    position: relative;
    // right: 1790px;
    // top: 30px;
    z-index: 20;
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
    color: #b4e4ff;

    &:nth-last-of-type(1) {
      margin-top: 23px;
    }

    .text {
      padding: 12px 29px;
      margin-left: -25px;
    }

    .active {
      background: linear-gradient(
        270deg,
        rgba(75, 169, 255, 0) 2.08%,
        rgba(75, 158, 255, 0.639) 49.01%,
        rgba(10, 167, 255, 0) 98.96%
      );
      color: #ffffff;
      font-size: 20px;
    }
  }
}

.title {
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
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
.video-box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  width: 100%;
  height: 100%;
}
.video {
  width: 100%;
  height: 100%;
}
</style>
