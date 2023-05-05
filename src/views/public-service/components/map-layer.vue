<template>
  <qu></qu>
  <cir-bar2 ref="cirBar2Ref"></cir-bar2>
  <legend-list
    legendName="图例"
    :legendList="legendListData"
    v-show="currentPosition == '深圳市'"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import cirBar2 from '@/components/map-layer/cir-bar2.vue';
import { inject, onMounted, onBeforeUnmount, ref,computed } from 'vue';
import { layerNameQuNameArr, infoObj, getImageUrl, getImageByCloud } from '@/global/config/map';
import { useStore } from 'vuex';
const store = useStore();
const currentPosition = computed(() => store.getters.currentPosition);
const legendListData = [
  {
    color: 'linear-gradient(178.17deg, #59FFFF 4.74%, #067471 95.4%)',
    name: '利用率'
  }
];
let cirBar2Ref = ref(null);
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
__g.reset();

const sendBarData = (data) => {
  cirBar2Ref.value.addBar(data);
};
defineExpose({ sendBarData });
onMounted(async () => {
  // await __g.tileLayer.setCollision(infoObj.terrainId, false, true, false, true);
  await __g.tileLayer.setCollision(infoObj.terrainId, true, true, true, true);
});

onBeforeUnmount(() => {
  // __g.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped>
</style>
