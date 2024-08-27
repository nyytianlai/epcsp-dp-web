<template>
  <div class="map-left-btn" :class="[{ panelShow: !panelShow }]">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';

const store = useVisibleComponentStore();

const panelShow = computed(() => store.panelShow);
</script>
<style lang="less" scoped>
.map-left-btn {
  position: absolute;
  top: 146px;
  left: 23%;
  z-index: 999;
  transition: all 0.3s;
  &.panelShow {
    left: 96px;
  }
}
</style>
