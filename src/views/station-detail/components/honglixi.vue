<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 15:04:38
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-12 15:24:44
 * @FilePath: \epcsp-dp-web\src\views\station-detail\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PopBox v-if="showPop" @close="()=>{showPop = false}" :style="{'top': `${screenPosition[1]}px`,'left': `${screenPosition[0]}px`}"></PopBox>
</template>
<script setup>
import { ref, onMounted, inject, watch, computed, reactive } from 'vue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { useMapStore } from '@/stores/map';
import { getTreeLayerIdByName } from '@/global/config/map';
import {debounce} from '@/utils'
import PopBox from './pop-box.vue'

const showPop = ref(false)
const store = useVisibleComponentStore();
const mapStore = useMapStore();
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const useEmitt = aircityObj.value?.useEmitt;
const params = ref({
  operatorId: store.detailParams?.operatorId,
  stationId: store.detailParams?.stationId
});
const screenPosition = ref(['20%','50%'])

useEmitt &&
  useEmitt('AIRCITY_EVENT', (e)=>debounce(async (e) => {
    //正常桩
    console.log('e',e)
    if (e.GroupID === 'stationFacilitiesLabel' && e.eventtype=='LeftMouseButtonClick') {
      console.log('点击icon', e);
      let screenCoord=await __g.coord.world2Screen(...e.MouseClickPoint);
      screenPosition.value = screenCoord.screenPosition
      console.log("screenCoord",screenCoord);
      showPop.value = true
    }
  },1000)(e));
// 定位到桩弹窗
const focusToPile = (eid, status) => {
  console.log('pileVisiblepileVisible', pileVisible.value);
  let layerId = getTreeLayerIdByName('-2Station', mapStore.treeInfo);
};
const handleClose = () => {
  //清除绿色高亮
  __g.tileLayer.stopHighlightAllActors();
};
</script>
<style lang="less" scoped></style>
