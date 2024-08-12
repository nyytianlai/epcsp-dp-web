<template>
  <LocalProvider><router-view /></LocalProvider>
</template>
<script setup>
import LocalProvider from '@/locales/locale-provider.vue';
// import { ref, onMounted } from 'vue';
// import { useSystemStore } from '@/stores/system';
// const store = useSystemStore();
// const timer = ref();
// const setRem = () => {
//   const baseSize = 100;
//   let fontSize = 0;
//   fontSize = (baseSize * window.innerHeight) / 1080;
//   document.documentElement.style.fontSize = `${fontSize}px`;
//   store.changeRootFontSize({
//     fontSize,
//     height: window.innerHeight
//   });
// };
// onMounted(() => {
//   // 初始化
//   setRem();
//   // 改变窗口大小时重新设置 rem
//   window.onresize = () => {
//     clearTimeout(timer.value);
//     timer.value = setTimeout(setRem, 200);
//   };
// });
</script>
