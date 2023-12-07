<template>
  <img :src="imgPath" alt="" @click="changePosition" />
</template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';
import { infoObj, getImageUrl } from '@/global/config/map';
import { useMapStore } from '@/stores/map';

const store = useMapStore();
const position = computed(() => store.szOrSs); //所在位置 sz ss

const aircityObj = inject('aircityObj');
const __g = aircityObj.acApi;

const imgPath = ref(getImageUrl('ss'));
const changePosition = () => {
  if (position.value == 'sz') {
    store.changeSzOrSs('ss');
  } else {
    store.changeSzOrSs('sz');
  }
};

watch(
  () => store.szOrSs,
  (value) => {
    if (value == 'sz') {
      //当前深圳
      imgPath.value = getImageUrl('ss');
      __g.camera.set(infoObj.szView, 2);
    } else {
      imgPath.value = getImageUrl('sz');
      __g.camera.set(infoObj.ssView, 2);
    }
  }
);

defineExpose({});
onMounted(() => {});
onBeforeUnmount(() => {});
</script>
<style lang="less" scoped>
img {
  position: absolute;
  top: 303px;
  right: calc(21% + 40px);
  height: 162px;
  width: 162px;
  border: 2.00713px dashed #4bdeff;
}
</style>
