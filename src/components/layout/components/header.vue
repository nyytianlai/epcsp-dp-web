<!--
 * @Author: niyayong
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @Date: 2022-04-18 17:27:54
 * @LastEditTime: 2023-05-09 18:46:01
 * @FilePath: \zndd-web\src\components\layout\components\header.vue
 * @Description: FilePath
-->
<template>
  <div class="header-bgc"></div>
  <div class="subject-header">
    <img
      src="../images//header-line-move.png"
      class="header_line_move"
      :style="{ top: `${step * -0.91}rem` }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const step = ref(0);
const moveImg = () => {
  if (step.value >= 19) {
    step.value = 0;
  } else {
    step.value = step.value + 1;
  }
};
onMounted(() => {
  setInterval(() => {
    moveImg();
  }, 100);
});
</script>

<style lang="less" scoped>
.header-bgc {
  background: linear-gradient(
    180deg,
    #000f2b 0%,
    #001428 22.32%,
    rgba(0, 20, 41, 0.5) 44.46%,
    rgba(0, 15, 43, 0) 95.21%
  );
  border-radius: 4px;
  position: absolute;
  width: 100%;
  height: 240px;
  top: 0;
  left: 0;
  z-index: 19;
}
.subject-header {
  height: 80px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  background-image: url(../images/header.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .header_line_move {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 1820px;
  }
}
</style>
