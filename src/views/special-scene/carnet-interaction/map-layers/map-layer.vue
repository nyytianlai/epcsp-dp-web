<template>
  <qu ref="quRef"></qu>
  <BaoAnTwin v-if="showTwin" />
</template>

<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import { requestGeojsonData } from '@/components/map-layer/api.js';
import { getHtmlUrl } from '@/global/config/map';
import { getImageByCloud, layerNameQuNameArr } from '@/global/config/map';
import { getPopupHtml } from '@/utils/index';
import { scale } from '@sutpc/config';
import { transformCoordsByType } from '@/utils/map-coord-tools';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { useRoute } from 'vue-router';
import { baoQingInfo } from './baoQing';

import BaoAnTwin from './BaoAn-twin.vue';

import bus from '@/utils/bus';
import Api from '../api';

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;

const showTwin = ref(false);

const store = useVisibleComponentStore();
const route = useRoute();
onMounted(async () => {
  await __g.reset();
  await getData();
  addPoint();
  addBaoAnPoint();
});

onBeforeUnmount(() => {
  bus.off('map-back');
});

let BaoAnTwinIds = [];
let positionData = [];
const getData = async () => {
  try {
    const { data } = await Api.getV2GStationDistribution();
    positionData = data;
  } catch (error) {}
};

useEmitt('AIRCITY_EVENT', async (e) => {
  console.log(e, 'AIRCITY_EVENT');
  // 点击站点图标
  if (e.eventtype === 'LeftMouseButtonClick') {
    if (e.GroupID === 'carnet-interaction-baoAn-group') {
      handleToBaoAnTwin();
    }
  }

  if (e.eventtype === 'MarkerCallBack') {
  }
});

bus.on('map-back', () => {
  __g.marker.showByGroupId('carnet-interaction-group', null),
    __g.marker.showByGroupId('carnet-interaction-baoAn-group', null),
    __g.marker.showByGroupId('quName'),
    setBaoAnTwinVisible(false);
  beforeAddOrExitHrStation(false);
});

const setBaoAnTwinVisible = async (visible) => {
  if (!BaoAnTwinIds?.length) {
    const data = await __g.infoTree.get();
    const layers = data?.infotree.filter((o) => o.name.includes('宝安区政府'));
    BaoAnTwinIds = layers.map((layer) => layer.iD);
  }

  if (visible) {
    await __g.infoTree.show(BaoAnTwinIds);
  } else {
    await __g.infoTree.hide(BaoAnTwinIds);
  }
};

const beforeAddOrExitHrStation = (isShow: boolean) => {
  !isShow ? __g.polygon.show(layerNameQuNameArr('qu')) : __g.polygon.hide(layerNameQuNameArr('qu'));
  !isShow ? __g.polygon3d.show('wall') : __g.polygon3d.hide('wall');
};

const handleToBaoAnTwin = async () => {
  showTwin.value = true;
  await Promise.allSettled([
    __g.marker.hideByGroupId('carnet-interaction-group', null),
    __g.marker.hideByGroupId('carnet-interaction-baoAn-group', null),
    __g.marker.hideByGroupId('quName'),
    setBaoAnTwinVisible(true),
    beforeAddOrExitHrStation(true)
  ]);
  store.changeShowComponent(false);
  store.changeShowDetail({
    show: true,
    params: {
      ...baoQingInfo,
      isBaoAn: true,
      isHr: 0
    }
  });
  await __g.camera.set(487515.321875, 2495233.355625, 145.108057, -19.415611, -82.359184, 2);
};

const addPoint = async () => {
  let markers = [];
  positionData.forEach((item, index) => {
    // const data = positionData.filter((v) => v.areaName == item.properties.QUNAME);
    const oPopUpUrl = getPopupHtml({
      usePopupHtml: true,
      com: 'carnet-interaction',
      params: {
        value: JSON.stringify({ ...item })
      }
    });
    const maxLen = `${item?.pileNum || 0}`.length;

    let o = {
      id: 'carnet-interaction-' + item.stationId + '_' + index,
      groupId: `carnet-interaction-group`,
      coordinate: transformCoordsByType([item.stationLng, item.stationLat], 2), //坐标位置
      anchors: [-20, 48], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [43, 48], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: getImageByCloud('chargingStation1'), //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: oPopUpUrl,
      autoHidePopupWindow: true,
      popupSize: [scale(100 + maxLen * 8), scale(110)],
      popupOffset: [-scale(150 + maxLen * 8) / 2, -scale(29)], //弹窗偏移
      autoHeight: true, // 自动判断下方是否有物体
      displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
    };
    markers.push(o);
  });
  await aircityObj.value.acApi.marker.add(markers, null);

  if (route.name !== 'carnet-interaction') {
    __g?.marker?.deleteByGroupId('carnet-interaction-group');
    __g?.marker?.deleteByGroupId('carnet-interaction-baoAn-group');
    return;
  }
};

const addBaoAnPoint = () => {
  const point = {
    type: 'Feature',
    properties: { OBJECTID: 6, QUNAME: '宝安区', QUCODE: '440306' },
    geometry: { type: 'Point', coordinates: [485959.808009100612253, 2502076.76284110173583] }
  };
  let o = {
    id: 'carnet-interaction-baoAn-1',
    groupId: `carnet-interaction-baoAn-group`,
    coordinate: point.geometry.coordinates, //坐标位置
    anchors: [-39, 80], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [78, 80], //图片的尺寸
    range: [1, 1000000], //可视范围
    imagePath: getImageByCloud('qu-point'), //显示图片路径
    useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
    autoHidePopupWindow: true,
    autoHeight: true, // 自动判断下方是否有物体
    displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
  };
  aircityObj.value.acApi.marker.add(o);
};
</script>

<style scoped></style>
