<template>
  <qu ref="quRef" :module="200"></qu>
  <BaoAnTwin v-if="showTwin" />
</template>

<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import { requestGeojsonData } from '@/components/map-layer/api.js';
import { getHtmlUrl } from '@/global/config/map';
import {
  getImageByCloud,
  layerNameQuNameArr,
  getTreeLayerIdByName,
  playCamera,
  returnStationPointConfig,
  resetSzView
} from '@/global/config/map';
import { getPopupHtml } from '@/utils/index';
import { scale } from '@sutpc/config';
import { transformCoordsByType } from '@/utils/map-coord-tools';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { useRoute } from 'vue-router';
import { baoQingInfo, toBaoQingCameraList } from './baoQing';
import { useMapStore } from '@/stores/map';

import BaoAnTwin from './BaoAn-twin.vue';

import bus from '@/utils/bus';
import Api from '../api';

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
const mapStore = useMapStore();

const showTwin = ref(false);

const store = useVisibleComponentStore();
const route = useRoute();
onMounted(async () => {
  mapStore.changeCurrentQu('');
  mapStore.changeCurrentPosition('深圳市');
  await __g.reset();
  await getData();
  await addBaoAnPoint();
  // handleToBaoAnTwin(true);
});

onBeforeUnmount(async () => {
  __g?.marker?.deleteByGroupId('jdStation');
  __g?.marker?.deleteByGroupId('carnet-interaction-baoAn-group');
  mapStore.changeCurrentQu('');
  mapStore.changeCurrentPosition('深圳市');
  bus.off('map-back');
  showTwin.value = false;
  await __g.cameraTour.stop();
  await __g.cameraTour.delete('1');
});

let BaoAnTwinIds = [];
let positionData = [];
const getData = async () => {
  try {
    const { data } = await Api.getV2GStationDistributionRealData();
    positionData = data?.filter((item) => item.lng && item.lat);
    addPoint();
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
  resetSzView(__g);
  // __g.marker.showByGroupId('jdStation', null),
  addPoint();
  __g.marker.showByGroupId('carnet-interaction-baoAn-group', null),
    __g.marker.showByGroupId('quName'),
    setBaoAnTwinVisible(false);
  beforeAddOrExitHrStation(false);
  showTwin.value = false;
});

const playCameraTortur = async () => {
  await __g.cameraTour.stop();
  await __g.cameraTour.delete('1');
  //通过接口添加导览并播放
  let frames = [];
  let duration = 0;
  toBaoQingCameraList.forEach((element, i) => {
    duration += element.duration;
    // @ts-nocheck
    frames.push(
      //@ts-ignore
      new CameraTourKeyFrame(i, duration, element.camera.slice(0, 3), element.camera.slice(3))
    );
  });
  //@ts-ignore
  let o = new CameraTourData('1', 'test', frames);
  await __g.cameraTour.add(o);
  await __g.cameraTour.play('1');
};

const setBaoAnTwinVisible = async (visible) => {
  const id1 = getTreeLayerIdByName('宝安区政府', mapStore.treeInfo);
  if (!BaoAnTwinIds?.length) {
    // const id1 = getTreeLayerIdByName('宝安区政府', mapStore.treeInfo);
    // const id2 = getTreeLayerIdByName('宝安区政府站点_植被', mapStore.treeInfo);
    // const id2 = getTreeLayerIdByName('宝安区政府站点_植被', mapStore.treeInfo);
    // id1 && BaoAnTwinIds.push(id1);
    // id2 && BaoAnTwinIds.push(id2);
  }
  if (visible) {
    // await __g.tileLayer.show(BaoAnTwinIds);
    await __g.infoTree.show(id1);
  } else {
    // await __g.tileLayer.hide(BaoAnTwinIds);
    await __g.infoTree.hide(id1);
  }
};

const beforeAddOrExitHrStation = (isShow: boolean) => {
  !isShow ? __g.polygon.show(layerNameQuNameArr('qu')) : __g.polygon.hide(layerNameQuNameArr('qu'));
  !isShow ? __g.polygon3d.show('wall') : __g.polygon3d.hide('wall');
};

const handleToBaoAnTwin = async (init = false) => {
  await Promise.allSettled([
    __g.marker.hideByGroupId('jdStation', null),
    __g.marker.hideByGroupId('carnet-interaction-baoAn-group', null),
    __g.marker.hideByGroupId('quName'),
    setBaoAnTwinVisible(true),
    beforeAddOrExitHrStation(true)
  ]);
  store.changeShowComponent(false);
  mapStore.changeCurrentQu('宝安区');
  mapStore.changeCurrentPosition('宝安区');
  store.changeShowDetail({
    show: true,
    params: {
      ...baoQingInfo,
      isBaoAn: true,
      isHr: 0
    }
  });
  showTwin.value = true;
  if (init) {
    __g.camera.set(487526.749609, 2495341.483125, 230.779473, -42.134712, -87.412994, 0);
  } else {
    playCameraTortur();
  }

  // playCameraTortur();
  // __g.camera.set(487526.749609, 2495341.483125, 230.779473, -42.134712, -87.412994, 0);
  // playCamera(__g, '宝安区政府');
  // await __g.camera.set(487515.321875, 2495233.355625, 145.108057, -19.415611, -82.359184, 2);
};

const addPoint = async () => {
  await __g.marker.deleteByGroupId('jdStation');
  await aircityObj.value.acApi.marker.deleteByGroupId('bar-hover-pop');
  const pointArr = [];
  const imgName = {
    1: 'station50',
    2: 'station50',
    3: 'stationpoint-ccz',
    4: 'stationpoint-v2g',
    5: 'stationpoint-ccz-oubiao'
  };
  positionData.forEach((item, index) => {
    let xoffset = item.stationName.length * 12;
    item['xoffset'] = xoffset;
    item['stationType'] = imgName[item.stationLogo] || 'station50';
    let o1 = returnStationPointConfig(item);
    o1.imagePath = getImageByCloud('stationpoint-v2g');

    pointArr.push(o1);
  });
  setTimeout(() => {
    __g.marker.add(pointArr, () => {
      if (route.name !== 'carnet-interaction') {
        __g?.marker?.deleteByGroupId('jdStation');
        __g?.marker?.deleteByGroupId('carnet-interaction-baoAn-group');
      }
    });
  }, 1000);
};

const addBaoAnPoint = async () => {
  const point = {
    type: 'Feature',
    properties: { OBJECTID: 6, QUNAME: '宝安区', QUCODE: '440306' },
    geometry: { type: 'Point', coordinates: [485959.808009100612253, 2502076.76284110173583] }
  };
  const data = {
    stationName: '宝安区政府车网互动示范站'
  };
  const oPopUpUrl = getPopupHtml({
    usePopupHtml: true,
    com: 'carnet-interaction-baoan',
    params: {
      value: JSON.stringify({ ...data })
    }
  });

  const maxLen = `${data?.stationName || 0}`.length + 1;
  let o = {
    id: 'carnet-interaction-baoAn-1',
    groupId: `carnet-interaction-baoAn-group`,
    coordinate: point.geometry.coordinates, //坐标位置
    anchors: [-39, 80], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [78, 80], //图片的尺寸
    range: [1, 1000000], //可视范围
    imagePath: getImageByCloud('qu-point'), //显示图片路径
    useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
    autoHidePopupWindow: false,
    popupURL: oPopUpUrl,
    popupSize: [scale(100 + maxLen * 8), scale(50)],
    popupOffset: [-scale(180 + maxLen * 8) / 2, -scale(35)], //弹窗偏移
    autoHeight: true, // 自动判断下方是否有物体
    displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
  };
  await aircityObj.value.acApi.marker.add(o, () => {
    // __g.marker.hideByGroupId('carnet-interaction-baoAn-group', null);
  });
  aircityObj.value.acApi.marker.showPopupWindow(o.id);
};
</script>

<style scoped></style>
