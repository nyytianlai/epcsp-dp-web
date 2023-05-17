<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 19:32:11
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-09 09:50:55
 * @FilePath: \epcsp-dp-web\src\components\title-column\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- <div class="title-column">
    <span class="title">{{ title }}</span>
    <button-base v-if="showBtn" @handleClick="handleClick">{{btnText}}</button-base>
  </div> -->
  <div class="title-column">
    <div class="left-bgc">
      <div class="bgc"></div>
      <icon icon="svg-icon:arrow" class="arrow" />
      <span class="title">{{ title }}</span>
      <icon icon="svg-icon:car" class="car" />
    </div>
    <div class="right-bgc">
      <div class="bevel-edge"></div>
      <div class="line"></div>
      <span class="detail-btn" v-if="showBtn" @click="handleClick">详情</span>
    </div>
    <!-- <button-base v-if="showBtn" @handleClick="handleClick">{{btnText}}</button-base> -->
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, toRefs } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
interface Props {
  title: string;
  btnText?: string;
  showBtn?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  title: '我是标题',
  btnText: '查看更多',
  showBtn: false
});
const emit = defineEmits(['handleClick']);
const { title, btnText } = toRefs(props);
const handleClick = () => {
  emit('handleClick');
};
</script>
<style lang="less" scoped>
.title-column {
  position: relative;
  color: #ffffff;
  display: flex;
  align-items: flex-end;
}
.left-bgc {
  display: flex;
  align-items: center;
  width: fit-content;
  padding-bottom: 3px;
  border-bottom: 1.5px solid;
  border-image: linear-gradient(to right, rgba(0, 106, 207, 0) 0, rgba(0, 163, 233, 1) 100%) 1.5;
  position: relative;
  .bgc {
    position: absolute;
    height: 13px;
    top: 15px;
    left: 0;
    width: calc(100% - 30px);
    z-index: 0;
    background-image: linear-gradient(270deg, #00b2ff, rgba(0, 133, 255, 0.0001));
    clip-path: polygon(
      0 0,
      100% 0,
      calc(100% - 3px) 1px,
      calc(100% - 4px) 2px,
      calc(100% - 4px) 11px,
      calc(100% - 3px) 12px,
      100% 100%,
      0 100%
    );
  }
  .arrow {
    position: relative;
    z-index: 10;
    font-size: 12px;
  }
  .car {
    position: relative;
    z-index: 10;
    font-size: 30px;
    margin-left: 30px;
    padding-top: 8px;
  }
}
.right-bgc {
  flex: 1;
  height: 21px;
  display: flex;
  position: relative;
  .bevel-edge {
    width: 21px;
    height: 21px;
    background-image: linear-gradient(
      135deg,
      transparent 0,
      transparent 46%,
      rgba(0, 163, 233, 1) 46%,
      rgba(0, 163, 233, 1) 52%,
      transparent 52%,
      transparent 100%
    );
  }
  .line {
    flex: 1;
    border-top: 1.5px solid;
    border-image: linear-gradient(to left, rgba(0, 106, 207, 0) 0, rgba(0, 163, 233, 1) 100%) 1.5;
  }
}
.border-out {
  position: absolute;
  top: 2px;
  right: 12px;
}
.title {
  font-weight: 600px;
  font-size: 20px;
  line-height: 28px;
  margin-left: 8px;
  position: relative;
  z-index: 10;
}
.detail-btn {
  font-size: 14px;
  line-height: 22px;
  color: #54b5ff;
  display: flex;
  align-items: center;
  position: absolute;
  top: 2px;
  right: 0px;
  cursor: pointer;
  &::after {
    content: '';
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    border: 7px solid transparent;
    border-left-color: #54b5ff;
    margin-left: 8px;
  }
}
</style>
