<template>
  <base-ac :cloudHost="cloudHost" @map-ready="handleMapReady">
    <hawk-eye v-if="ifHawkEye"></hawk-eye>
  </base-ac>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseAc from '@sutpc/vue3-aircity';
import HawkEye from '@/components/map-layer/hawk-eye.vue';
import { useMapStore } from '@/stores/map';
import { storeToRefs } from 'pinia';
import { getTreeLayerIdByName, delete3dt } from '@/global/config/map';
const emit = defineEmits(['aircityObjReady']);
const { treeInfo } = storeToRefs(useMapStore());
const aircityObj = ref(null);
const mapStore = useMapStore();
const currentPosition = computed(() => mapStore.currentPosition); //所在位置 深圳市 xx区 xx街道 xx站(取值'')
const ifHawkEye = computed(() => currentPosition.value.includes('市'));

// 原来是通过nginx配置转发的飞渡流
// const cloudHost = `${location.host}/freedo`;
// 20231128在证数局调试时，要用本地临时的飞渡服务地址
const cloudHost = `http://${import.meta.env.VITE_FD_URL}/freedo`

const handleMapReady = async (obj) => {
  aircityObj.value = obj;
  emit('aircityObjReady', obj);
  const acApi = aircityObj?.value?.acApi;
  // window.aircityObj = obj;
  const ref = await acApi.infoTree.get();
  treeInfo.value = ref.infotree;
  // console.log('图层树数据', treeInfo.value);
  //规避民乐站在expolrer里面关闭无法点击的bug
  let ids = getTreeLayerIdByName('118默认展示', ref.infotree);
  await acApi.infoTree.hide(ids);
  delete3dt(acApi, ['NewYYSFB']);
};
</script>
