<template>
  <img :src="imgPath" alt="" @click="changePosition" />
</template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { infoObj, getImageUrl } from '@/global/config/map';
const aircityObj = inject('aircityObj');
const __g = aircityObj.acApi;

const position = ref('sz');
const imgPath = ref(getImageUrl('ss'));
const changePosition = () => {
  if (position.value == 'sz') {
    position.value = 'ss';
    imgPath.value = getImageUrl('sz');
    __g.camera.set(infoObj.ssView, 2);
  } else {
    position.value = 'sz';
    imgPath.value = getImageUrl('ss');
    __g.camera.set(infoObj.szView, 2);
  }
};

defineExpose({});
onMounted(() => {});
onBeforeUnmount(() => {});
</script>
<style lang="less" scoped>
img {
  position: absolute;
  top: 303px;
  right: 482px;
  height: 162px;
  width: 162px;
  border: 2.00713px dashed #4bdeff;
}
</style>
