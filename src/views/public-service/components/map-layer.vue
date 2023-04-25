<template>
  <qu @changeCurrentPosition="changeCurrentPosition"></qu>
  <cir-bar2 ref="cirBar2Ref"></cir-bar2>
  <!-- <legend-list legendName="充电站状态" :legendList="legendListData" /> -->
  <legend-list
    legendName="图例"
    :legendList="legendListData"
    v-show="currentPosition == '深圳市'"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import cirBar2 from '@/components/map-layer/cir-bar2.vue';
import { inject, onMounted, onBeforeUnmount, ref } from 'vue';
import { layerNameQuNameArr, infoObj, getImageUrl, getImageByCloud } from '@/global/config/map';
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

const currentPosition = ref('深圳市');

const changeCurrentPosition = (position: string) => {
  currentPosition.value = position;
};

const sendBarData = (data) => {
  cirBar2Ref.value.addBar(data);
};
defineExpose({ sendBarData });
onMounted(async () => {
  await __g.tileLayer.delete('1');
  // await __g.tileLayer.setCollision(infoObj.terrainId, false, true, false, true);
  await __g.tileLayer.setCollision(infoObj.terrainId, true, true, true, true);
});

onBeforeUnmount(() => {
  // __g.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped>
.backBox {
  position: absolute;
  height: 36px;
  left: 86px;
  top: 68px;
  display: flex;
  background: rgba(4, 22, 43, 0.4);
  border: 1px solid rgba(148, 148, 148, 0.3);
  color: #ffffff;
  z-index: 10;

  img {
    width: 36px;
    height: 36px;
    border-radius: 1px;
  }

  .quName {
    font-size: 16px;
    line-height: 22px;
    // background: rgba(4, 22, 43, 0.5);
    // border: 1px solid rgba(148, 148, 148, 0.3);
    padding: 7px 16px;
  }
}
</style>
