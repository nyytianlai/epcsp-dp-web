<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 09:55:35
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-10 10:51:43
 * @FilePath: \template-bigscreen-vue3\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <router-view />
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useSystemStore } from '@/stores/system'
const store = useSystemStore()
const timer = ref();
const setRem = () => {
  const baseSize = 100;
  let fontSize = 0;
  fontSize = baseSize * window.innerHeight / 1080;
  document.documentElement.style.fontSize = `${fontSize}px`;
  store.changeRootFontSize({
    fontSize,
    height: window.innerHeight
  });
};
onMounted(() => {
  // 初始化
  setRem();
  // 改变窗口大小时重新设置 rem
  window.onresize = () => {
    clearTimeout(timer.value);
    timer.value = setTimeout(setRem, 200);
  };
});
</script>
