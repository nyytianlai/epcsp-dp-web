<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 15:04:38
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-12 15:24:44
 * @FilePath: \epcsp-dp-web\src\views\station-detail\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="panel-box"
    v-if="showPop"
    :style="{ top: `${screenPosition[1]}px`, left: `${screenPosition[0]}px` }"
  >
    <div class="close" @click="handleClose">x</div>
    <icon icon="svg-icon:sun-panel" class="pop-icon" />
    <div class="num">
      19.44
      <span class="unit">/kw</span>
    </div>
    <div class="label">实时发电功率</div>
  </div>
</template>
<script setup>
import { ref, onMounted, inject, watch, computed, reactive } from 'vue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { useMapStore } from '@/stores/map';
import { getTreeLayerIdByName } from '@/global/config/map';
import Icon from '@sutpc/vue3-svg-icon';
const screenPosition = ref(['20%', '50%']);
const store = useVisibleComponentStore();
const mapStore = useMapStore();
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const useEmitt = aircityObj.value?.useEmitt;
const params = ref({
  operatorId: store.detailParams?.operatorId,
  stationId: store.detailParams?.stationId
});
const showPop = ref(false);

useEmitt &&
  useEmitt('AIRCITY_EVENT', async (e) => {
    //正常桩
    if (e.PropertyName === '-2Station' && e.ObjectID?.includes('singleCrystalSilicon')) {
      console.log('点击单晶板', e);
      __g.tileLayer.stopHighlightAllActors();
      let ids = getTreeLayerIdByName('-2Station', mapStore.treeInfo);
      __g.settings.highlightColor(Color.Yellow);
      __g.tileLayer.highlightActor(ids, e.ObjectID);
      let screenCoord = await __g.coord.world2Screen(...e.MouseClickPoint);
      console.log('screenCoord', screenCoord);
      screenPosition.value = screenCoord.screenPosition;
      showPop.value = true;
    }
  });
// 定位到单晶版
const focusToPile = (ObjectID) => {
  __g.tileLayer.stopHighlightAllActors();
  let layerId = getTreeLayerIdByName('-2Station', mapStore.treeInfo);
  __g.settings.highlightColor(Color.Yellow);
  __g.tileLayer.highlightActor(layerId, ObjectID);
};
const handleClose = () => {
  //清除绿色高亮
  __g.tileLayer.stopHighlightAllActors();
  showPop.value = false;
};
</script>
<style lang="less" scoped>
.panel-box {
  position: absolute;
  z-index: 99;
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: rgba(18, 40, 73, 0.85);
  box-shadow: inset 0px 0px 16px rgba(10, 167, 255, 0.8);

  .pop-icon {
    margin-top: 22px;
    font-size: 54px;
  }

  .num {
    background: linear-gradient(180deg, #00f7ff -71.43%, #d5feff 16%, #00f7ff 96.43%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-weight: 700;
    font-size: 30px;
    font-family: 'DIN Alternate';

    .unit {
      font-size: 14px;
    }
  }

  .label {
    margin-top: 4px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;

    color: #c0e5ff;
  }

  .close {
    position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;
    font-size: 32px;
    color: #c0e5ff;
  }
}
</style>
