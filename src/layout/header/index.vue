<template>
  <div class="layout-header">
    <div class="layout-header__title">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const title = computed(() => {
  return import.meta.env.VITE_APP_TITLE;
});

</script>

<style lang="less" scoped>
.layout-header {
  position: relative;
  z-index: 1;
  height: 80px;
  background: url(./images/header-bg.png) no-repeat, linear-gradient(to bottom, black, rgba(0, 0, 0, 0));
  background-size: auto 100%;
  background-position: center center;
}
.layout-header__title {
  position: absolute;
  left: 50%;
  top: 0;
  height: 100%;
  transform: translateX(-50%) translateY(-5px);
  display: flex;
  align-items: center;
  font-size: 32px;
  letter-spacing: 5px;
  color: transparent;
  font-weight: bold;
  background: transparent linear-gradient(to bottom, #fff,40%,#fff,55%,#87cdeb);
  background-clip: text;
}
</style>