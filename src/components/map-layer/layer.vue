<template>
  <base-ac
    :cloudHost="cloudHost"
    :option="fdOption"
    :cloudMangerInfo="{ command: 'GetOneFreeInstance' }"
    @map-ready="handleMapReady"
  >
    <hawk-eye v-if="ifHawkEye"></hawk-eye>
  </base-ac>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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
let cloudHost = import.meta.env.VITE_FD_URL;
if (!cloudHost) {
  cloudHost = `${location.host}/freedo`;
}

const fdOption = {
  useHttps: import.meta.env.VITE_FD_HTTPS === 'true' ? true : false
};

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
  let ids2 = getTreeLayerIdByName('超充之城', ref.infotree);
  let ids3 = getTreeLayerIdByName('车网互动', ref.infotree);
  let ids4 = getTreeLayerIdByName('营运巴士', ref.infotree);
  let ids5 = getTreeLayerIdByName('行政地图_虚拟电厂_福田', ref.infotree);
  await acApi.infoTree.hide([ids, ids2, ids3, ids4, ids5]);
  acApi.misc.callBPFunction({
    functionName: '停止',
    objectName: '动画播放_0'
  });
  await acApi.misc.callBPFunction({
    functionName: '停止',
    objectName: '动画播放_2'
  });
  await acApi.misc.callBPFunction({
    functionName: '停止',
    objectName: '播放动画_1'
  });
  await acApi.misc.callBPFunction({
    functionName: '停止',
    objectName: '动画播放_3'
  });
  delete3dt(acApi, [
    'NewYYSFB',
    `虚拟电厂/热力图1.3dt`,
    `虚拟电厂/热力图2.3dt`,
    `虚拟电厂/热力图3.3dt`,
    '场内设施Icon'
  ]);
};

onMounted(() => {
  window.addEventListener('beforeunload', async (event) => {
    const acApi = aircityObj?.value?.acApi;
    let ids = getTreeLayerIdByName('118默认展示', treeInfo.value || []);
    let ids2 = getTreeLayerIdByName('超充之城', treeInfo.value || []);
    let ids3 = getTreeLayerIdByName('车网互动', treeInfo.value || []);
    let ids4 = getTreeLayerIdByName('营运巴士', treeInfo.value || []);
    let ids5 = getTreeLayerIdByName('行政地图_虚拟电厂_福田', treeInfo.value || []);
    await acApi.infoTree.hide([ids, ids2, ids3, ids4, ids5]);
    acApi.misc.callBPFunction({
      functionName: '停止',
      objectName: '动画播放_0'
    });
    await acApi.misc.callBPFunction({
      functionName: '停止',
      objectName: '动画播放_2'
    });
    await acApi.misc.callBPFunction({
      functionName: '停止',
      objectName: '播放动画_1'
    });
    await acApi.misc.callBPFunction({
      functionName: '停止',
      objectName: '动画播放_3'
    });
    delete3dt(acApi, [
      'NewYYSFB',
      `虚拟电厂/热力图1.3dt`,
      `虚拟电厂/热力图2.3dt`,
      `虚拟电厂/热力图3.3dt`,
      '场内设施Icon'
    ]);
  });
});
</script>
