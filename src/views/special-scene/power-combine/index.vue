<!--
 * @Author: niyayong@sutpc.com
 * @Date: 2024-07-22 15:19:08
 * @LastEditors: niyayong@sutpc.com
 * @LastEditTime: 2024-07-22 15:22:01
 * @Description: 
 * @FilePath: /epcsp-dp-web/src/views/special-scene/powerCombine/index.vue
-->
<template>
  <div class="special-scene">
    <panel class="special-scene-panel left"></panel>
    <panel class="special-scene-panel right" type="right"></panel>
    <map-layer v-if="aircityObj" />
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
// import MapLayer from './components/map-layer.vue';
const aircityObj = inject('aircityObj');
</script>

<style lang="less" scoped>
.special-scene-panel {
  width: 100%;
  height: 100%;
  display: grid;
}
</style>
