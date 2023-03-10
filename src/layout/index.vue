<template>
  <div class="layout-wrap">
    <Sheader />
    <div class="router-wrap" ref="routerWrapRef" :class="routerWrapClass">
      <router-view v-if="isLoadingGlobalContextReady"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Loading from '@sutpc/vue3-loading';
import Sheader from './header/index.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const routerWrapRef = ref(null);

const isLoadingGlobalContextReady = ref(false);

const routerWrapClass = computed(() => {
  let classList = [];

  if (route.meta.full) {
    classList.push('full');
  }

  return classList;
})

onMounted(() => {
  Loading.setGlobalContext(routerWrapRef.value);

  isLoadingGlobalContextReady.value = true;
});

</script>

<style lang="less" scoped>
.layout-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--el-bg-color-page);
}
.router-wrap {
  flex: 1;
  height: 0;
  &.full {
    flex: none;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 100%;
  }
}
</style>
