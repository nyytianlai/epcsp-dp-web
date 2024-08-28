<template>
  <qu ref="quRef"></qu>
  <div class="time-slider-wrapper" v-show="!showVirture">
    <TimeSlide v-model="currentDt" :data="range" />
  </div>
</template>

<script setup lang="ts">
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import Qu from '@/components/map-layer/qu.vue';
import { getPopupHtml } from '@/utils/index';
import { scale } from '@sutpc/config';
import TimeSlide from '@/components/time-slider/index.vue';
import bus from '@/utils/bus';
import {
  getImageByCloud,
  addCommon3dt,
  delete3dt,
  getTreeLayerIdByName
} from '@/global/config/map';
import { useRoute } from 'vue-router';
import { allHeatIds, virtureTileIds, virtureView, virturePoint, timeline } from './layer-config';
import Api from '../api';
import { useMapStore } from '@/stores/map';
const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
const range = ['2024-03', '2024-06', '2024-09'];
const currentDt = ref(0);
const store = useMapStore();
const route = useRoute();
const quRef = ref();

const showVirture = ref(false);

let timer;

const formatTooltip = (vl) => {
  return range[vl];
};

const getData = async () => {
  const res = await Promise.all([
    Api.adjustableCapacityDistribution(),
    Api.requestGeojsonData('barPosition4547')
  ]);
  drawAreaLayer(res[0]?.data, res[1]?.features);
};

const drawAreaLayer = async (data = [], areaPosition = []) => {
  await __g.marker.deleteByGroupId('area-point-layer');
  await __g.marker.deleteByGroupId('rectBar');
  const pointList = [];
  const idList = [];
  areaPosition.forEach((item) => {
    const dataObj = data.find((el) => `${el.areaCode}` === `${item.properties.QUCODE}`) || {};
    const oPopUpUrl = getPopupHtml({
      usePopupHtml: true,
      com: 'virtual-electric',
      params: {
        value: JSON.stringify({ ...dataObj })
      }
    });
    const maxLen = Math.max(
      `${dataObj?.adjustableCapacity || 0}`.length,
      `${dataObj?.adjustableResource || 0}`.length,
      `${dataObj?.installedCapacity || 0}`.length,
      `${dataObj?.virtualPowerPlantNum || 0}`.length
    );
    const marker = {
      id: `${item.properties.QUCODE}`,
      groupId: 'area-point-layer',
      userData: { ...dataObj },
      coordinate: item.geometry.coordinates,
      anchors: [-5, 5], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [10, 10], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: getImageByCloud('circle'), //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: oPopUpUrl,
      popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
      autoHidePopupWindow: false,
      popupSize: [scale(100 + maxLen * 8), scale(110)],
      popupOffset: [-scale(100 + maxLen * 8) / 2 - 5, -scale(55) - 5], //弹窗偏移
      autoHeight: true, // 自动判断下方是否有物体
      displayMode: 2
    };
    pointList.push(marker);
    idList.push(marker.id);
  });
  await __g.marker.add(pointList, null);
  if (route.name !== 'virtualElectric') {
    __g?.marker?.deleteByGroupId('area-point-layer');
    return;
  }
  __g.marker.showPopupWindow(idList);
};

const addHeatLayer = async () => {
  const filterIds = allHeatIds.filter((el, i) => i > currentDt.value);
  const showIds = allHeatIds.filter((el, i) => i <= currentDt.value);
  __g.tileLayer.updateBegin();
  filterIds.length && delete3dt(__g, filterIds);
  showIds.forEach((el) => {
    addCommon3dt(__g, el);
  });
  __g.tileLayer.updateEnd();
};

const addVirturePoint = async () => {
  await __g.marker.delete('virtual-point');
  const marker = {
    id: 'virtual-point',
    groupId: 'virtual-point',
    userData: 'virtual-point',
    coordinate: virturePoint,
    anchors: [-101.5, 193], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [203, 193], //图片的尺寸
    range: [1, 1000000], //可视范围
    imagePath: getImageByCloud('virtual-electric'), //显示图片路径
    useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
    popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
    autoHidePopupWindow: false,
    autoHeight: true, // 自动判断下方是否有物体
    displayMode: 2
  };
  __g.marker.add(marker, null);
};

const setCurrent = async () => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    if (currentDt.value < 2) {
      currentDt.value = currentDt.value + 1;
      setCurrent();
    }
  }, 2000);
};

const handleToVirture = async () => {
  clearTimeout(timer);
  showVirture.value = true;
  store.changeCurrentQu('福田区');
  store.changeCurrentPosition('福田区');
  __g.polygon.hide(quRef.value.allQUIds);
  __g.polygon3d.hide('wall');
  __g.weather.simulateTime([12, 0], [17, 30], 5);
  delete3dt(__g, allHeatIds);
  __g.marker.hideByGroupId('virtual-point');
  __g.marker.hideByGroupId('quName');
  __g.marker.hideByGroupId('qu');
  await __g.camera.set(virtureView);
  const ids = getTreeLayerIdByName('行政地图_虚拟电厂_福田', store.treeInfo);
  __g.infoTree.show(ids);
};

useEmitt('AIRCITY_EVENT', (e) => {
  if (e.eventtype === 'LeftMouseButtonClick') {
    // 进入虚拟电厂
    if (e.Id === 'virtual-point') {
      handleToVirture();
    }
  }
});

bus.on('map-back', async () => {
  __g.polygon.show(quRef.value.allQUIds);
  __g.polygon3d.show('wall');
  const ids = getTreeLayerIdByName('行政地图_虚拟电厂_福田', store.treeInfo);
  await __g.infoTree.hide(ids);
  __g.weather.setDateTime(2024, 11, 1, 12, 0, 0, false);
  showVirture.value = false;
  __g.marker.showByGroupId('virtual-point');
  __g.marker.showByGroupId('quName');
  __g.marker.showByGroupId('qu');
  addHeatLayer();
});

watch(
  () => currentDt.value,
  () => {
    addHeatLayer();
  }
);

onMounted(async () => {
  await __g.reset();
  await __g.weather.setDateTime(2024, 11, 1, 12, 0, 0, false);
  await delete3dt(__g, allHeatIds);
  await __g.infoTree.hide(virtureTileIds);
  // getData();
  addHeatLayer();
  addVirturePoint();
  setTimeout(setCurrent, 2000);
});

onBeforeUnmount(async () => {
  clearTimeout(timer);
  await __g.weather.setDateTime(2024, 11, 1, 12, 0, 0, false);
  await __g?.marker?.deleteByGroupId('area-point-layer');
  await delete3dt(__g, allHeatIds);
  await __g.infoTree.hide(virtureTileIds);
});
</script>

<style scoped>
.time-slider-wrapper {
  position: absolute;
  left: 50%;
  bottom: 100px;
  width: 45%;
  transform: translateX(-50%);
}
</style>
