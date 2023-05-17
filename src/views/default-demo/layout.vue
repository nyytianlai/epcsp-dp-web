<template>
  <div class="layout-wrap">
    <div class="router-wrap">
      <router-view v-if="isRouterViewReady"/>
    </div>
  </div>
</template>

<script setup>

import { ref, nextTick } from 'vue';
import themeLib from '@sutpc/theme-lib';

const isRouterViewReady = ref(true);

const changeTheme = async () => {

  let newTheme = 'normal';
  if (themeLib.currentTheme === 'normal') {
    newTheme = 'dark';
  }

  await themeLib.changeTheme({
    theme: newTheme
  });

  isRouterViewReady.value = false;
  await nextTick();
  isRouterViewReady.value = true;
};
</script>

<style lang="less" scoped>
.layout-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header-wrap {
  padding-left: 20px;
  line-height: 60px;
  font-size: 20px;
}
.router-wrap {
  flex: 1;
  height: 0;
}
</style>