<!--
 * @Author: niyayong@sutpc.com
 * @Date: 2024-08-06 10:02:57
 * @LastEditors: niyayong@sutpc.com
 * @LastEditTime: 2024-08-07 16:22:18
 * @Description: 
 * @FilePath: /epcsp-dp-web/src/views/special-scene/power-combine/parking-charge/map-layers/map-layer.vue
-->
<template></template>

<script setup lang="ts">
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
onMounted(async () => {
  await __g.reset();
});
</script>

<style scoped></style>
