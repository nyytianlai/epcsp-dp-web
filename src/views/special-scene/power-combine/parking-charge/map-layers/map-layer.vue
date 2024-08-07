<!--
 * @Author: niyayong@sutpc.com
 * @Date: 2024-08-06 10:02:57
 * @LastEditors: niyayong@sutpc.com
 * @LastEditTime: 2024-08-06 10:02:58
 * @Description: 
 * @FilePath: /epcsp-dp-web/src/views/special-scene/virtual-electric/map-layers/map-layer.vue
-->
<template></template>

<script setup lang="ts">
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
</script>

<style scoped></style>
