<template>
  <div class="power-exchange-station"></div>
  <map-layer :ref="(el) => (mapLayerRef = el)" v-if="aircityObj"></map-layer>
</template>
<script lang="ts" setup>
import { ref, onMounted, inject } from 'vue';
import MapLayer from './components/map-layer.vue';

interface Aircity {
  value: object;
}
const aircityObj: Aircity = inject('aircityObj');
let mapLayerRef = ref(null);




</script>
