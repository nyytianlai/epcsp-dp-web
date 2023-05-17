<template>
  <qu ref="quRef"></qu>
  <rect-bar></rect-bar>
  <legend-list v-show="currentPosition == '深圳市'" />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import RectBar from '@/components/map-layer/rect-bar.vue';
import { inject, onMounted, onBeforeUnmount, ref,computed } from 'vue';
import { useMapStore } from '@/stores/map'

const aircityObj = inject('aircityObj');
const __g = aircityObj.value.acApi;
__g.reset();

const store = useMapStore()
// const currentPosition = ref('深圳市'); //所在位置 深圳市 xx区 xx站(取值'')
const currentPosition = computed(() => store.currentPosition);

let quRef = ref(null);

onMounted(async () => {
  // await __g.tileLayer.setCollision(infoObj.terrainId, true, true, true, true);
});

onBeforeUnmount(() => {
  // __g.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped></style>
