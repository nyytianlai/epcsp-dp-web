<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 15:04:38
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-12 15:24:44
 * @FilePath: \epcsp-dp-web\src\views\station-detail\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template></template>
<script setup>
import { ref, onMounted, inject, watch, computed, reactive } from 'vue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { useMapStore } from '@/stores/map';
import { getTreeLayerIdByName } from '@/global/config/map';

const store = useVisibleComponentStore();
const mapStore = useMapStore();
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const useEmitt = aircityObj.value?.useEmitt;
const params = ref({
  operatorId: store.detailParams?.operatorId,
  stationId: store.detailParams?.stationId
});

useEmitt &&
  useEmitt('AIRCITY_EVENT', async (e) => {
    //正常桩
    if (e.PropertyName === '-2Station' && e.ObjectID?.includes('singleCrystalSilicon')) {
      console.log('点击单晶板', e);
      __g.tileLayer.stopHighlightAllActors();
      let ids = getTreeLayerIdByName('-2Station', mapStore.treeInfo);
    //   __g.settings.highlightColor(Color.Green);
      __g.tileLayer.highlightActor(ids, e.ObjectID);
      let screenCoord=await __g.coord.world2Screen(...e.MouseClickPoint);
      console.log("screenCoord",screenCoord);
    }
  });
// 定位到桩弹窗
const focusToPile = (eid, status) => {
  console.log('pileVisiblepileVisible', pileVisible.value);
  let layerId = getTreeLayerIdByName('118Station', mapStore.treeInfo);
  pileParams.value = {
    eid: eid
  };
  pileType.value = 'pile';
  pileVisible.value = true;
  handleClickFocus(__g, layerId, eid, status);
};
const handleClose = () => {
  //清除绿色高亮
  __g.tileLayer.stopHighlightAllActors();
};
</script>
<style lang="less" scoped></style>
