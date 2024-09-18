<template>
  <qu ref="quRef"></qu>
  <legend-list v-show="showRemainPower" :legendList="legendListData" :legendName="legendNameData" />
  <MapLeftBtn v-show="!isPlaying">
    <div class="remain-power" @click="handleRemainPoweLayer">
      <img draggable="false" :src="showRemainPower ? remainPowerIconA : remainPowerIcon" />
      <div class="name">巴士储能</div>
    </div>
  </MapLeftBtn>
</template>

<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import MapLeftBtn from '@/components/map-left-btn.vue';
import { requestGeojsonData } from '@/components/map-layer/api.js';
import { getHtmlUrl, getTreeLayerIdByName } from '@/global/config/map';
import { getPopupHtml } from '@/utils/index';
import { getImageByCloud, layerNameQuNameArr } from '@/global/config/map';
import { scale } from '@sutpc/config';
import Api from '../api';
import remainPowerIcon from '../images/remain-power.png';
import remainPowerIconA from '../images/remain-power-active.png';
import bus from '@/utils/bus';
import { useMapStore } from '@/stores/map';
import { useRoute } from 'vue-router';
import {
  transformCoords,
  transformCoordsArrByType,
  transformCoordsByType
} from '@/utils/map-coord-tools';
import { bearing, point } from '@turf/turf';
import dayjs from 'dayjs';

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
const emits = defineEmits(['playTwin']);
let bus_idList = [];

const showRemainPower = ref(false);

const isPlaying = ref(false);

let timer;

const mapStore = useMapStore();

const route = useRoute();

let clickCoord = [];

onMounted(async () => {
  await __g.reset();
  await getData();
  await __g.settings.setEnableCameraMovingEvent(true);

  // addPoint();
  // await addBusLine();
  getBusLineData();
  // addBusObj();
});

onBeforeUnmount(async () => {
  await __g.settings.setEnableCameraMovingEvent(false);
  timerMap.forEach((el) => {
    clearTimeout(el);
  });
  clearTimeout(timer);
  await __g.misc.callBPFunction({
    functionName: '停止',
    objectName: '动画播放_3'
  });
  const id = mapStore.treeInfo.find((el) => el.name === '营运巴士' && el.type === 'EPT_Scene')?.iD;
  id && (await __g.tileLayer.hide(id));
  await __g.customObject.delete(bus_idList);
  await __g.polyline.delete(bus_idList);
  await __g.marker.deleteByGroupId('busObjGroup');
});

let legendNameData = '巴士储能电量(kw)';
let legendListData = ref([
  {
    color: 'rgb(253, 255, 223)',
    pColor: [253 / 255, 255 / 255, 223 / 255, 0.7],
    name: '≤1000',
    type: false
  },
  {
    color: 'rgb(245, 249, 180)',
    pColor: [245 / 255, 249 / 255, 180 / 255, 0.7],
    name: '1000～2000',
    type: false
  },
  {
    color: 'rgb(200, 231, 98)',
    pColor: [200 / 255, 231 / 255, 98 / 255, 0.8],
    name: '2000～4000',
    type: false
  },
  {
    color: 'rgb(138, 201, 86)',
    pColor: [138 / 255, 201 / 255, 86 / 255, 0.8],
    name: '4000～7000',
    type: false
  },
  {
    color: 'rgb(91, 165, 57)',
    pColor: [91 / 255, 165 / 255, 57 / 255, 0.8],
    name: '≥7000',
    type: false
  }
]);
let quData = [];
let timerMap = [];
let busLineList = [];
let currentIndex = 0;
const getData = async () => {
  if (quData?.length) return;
  try {
    const params = {
      areaCode: '',
      streetCode: ''
    };
    const { data } = await Api.busCanDistribution(params);
    quData = data?.map((el) => {
      if (el.areaName === '大鹏区') {
        el.areaName = '大鹏新区';
      }
      return el;
    });
  } catch (error) {}
};
const handleQuHeatMap = async (showHeatmap) => {
  await getData();
  __g.polygon.updateBegin();
  quData.forEach((v) => {
    const color = getIntervalCategory(v.busRemainPower);
    const endColor = showHeatmap ? color : [0, 0, 0.4, 0];
    __g.polygon.setColor('qu-' + v.areaName, endColor, null);
  });
  __g.polygon.updateEnd();
};

const getBusLineData = async () => {
  const res = await Api.getAllBus();
  const busPlateList = res.data.slice(0, 31).map((el) => el.plateNumber);
  // const plateNumber = 'BS01984D';
  const locats = await Promise.allSettled(
    busPlateList.map((plateNumber) =>
      Api.getGpsByPlateNumber({
        plateNumber: plateNumber,
        startTime: '2024-08-15 12:00:00',
        endTime: '2024-08-15 13:30:00'
      })
    )
  );
  const list = locats
    .filter((el: any) => el.value?.data.every((item) => item.lng && item.lat))
    .map((el: any) => el.value?.data || []);
  busLineList = list;
  addBusLine();
};

const handleRemainPoweLayer = () => {
  showRemainPower.value = !showRemainPower.value;
  handleQuHeatMap(showRemainPower.value);
};

const getIntervalCategory = (value) => {
  if (value <= 1000) {
    return legendListData.value[0].pColor;
  } else if (value <= 2000) {
    return legendListData.value[1].pColor;
  } else if (value <= 4000) {
    return legendListData.value[2].pColor;
  } else if (value <= 7000) {
    return legendListData.value[3].pColor;
  } else {
    return legendListData.value[4].pColor;
  }
};

const addPoint = async () => {
  const res1 = await requestGeojsonData('barPosition4547');
  const quCenterPositions = res1.features;

  const idList = [];
  let markers = [];
  quCenterPositions.forEach((item, index) => {
    const dataObj = quData.find((el) => `${el.areaCode}` === `${item.properties.QUCODE}`) || {};
    const oPopUpUrl = getPopupHtml({
      usePopupHtml: true,
      com: 'power-combine-traffic-power',
      params: {
        value: JSON.stringify({ ...dataObj })
      }
    });
    const maxLen = Math.max(`${dataObj?.busNum || 0}`.length, `${dataObj?.v2gNum || 0}`.length);

    let o = {
      id: 'traffic-power-marker-' + item.properties.QUCODE,
      groupId: `traffic-power-marker-group`,
      coordinate: item.geometry.coordinates,
      anchors: [-10, 10], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [10, 10], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: getImageByCloud('circle'), //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: oPopUpUrl,
      autoHidePopupWindow: false,
      popupSize: [scale(100 + maxLen * 8), scale(60)],
      popupOffset: [-scale(100 + maxLen * 8) / 2 - 5, -scale(40)], //弹窗偏移
      autoHeight: false, // 自动判断下方是否有物体
      displayMode: 2, //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
      priority: item.properties.PRIORITY
    };
    markers.push(o);
    idList.push(o.id);
  });
  await aircityObj.value.acApi.marker.add(markers);
  if (route.name !== 'powerCombine') {
    __g.customObject.delete(bus_idList);
    return;
  }
  __g.marker.showPopupWindow(idList);
};

const addBusObj = async () => {
  await __g.customObject.delete(bus_idList);
  await __g.marker.deleteByGroupId('busObjGroup');
  const arr = [];
  const markerList = [];
  const moveMap = {};
  busLineList.forEach((item) => {
    const cusObj = {
      id: item.id,
      groupId: 'busObjGroup',
      userData: JSON.stringify({ isHighLight: item.isHighLight }),
      pakFilePath: '@path:能源_公交车.pak',
      assetPath: item.assetPath,
      range: [1, 10000000],
      autoHeight: true,
      location: item.path[0],
      localRotation: item.rotation,
      coordinateType: 0,
      isEffectRotation: true,
      scale: [300, 300, 300],
      supportAttach: false
    };
    arr.push(cusObj);
    moveMap[item.id] = item.path.map((el, i) => {
      return {
        id: item.id,
        // smoothTime: i * 60 * 10,
        time: i * 30,
        coordinate: el
        // @ts-ignore
        // rotation: item.rotation
      };
    });

    if (item.isHighLight) {
      // const marker = {
      //   id: item.id,
      //   groupId: 'busObjGroup',
      //   userData: JSON.stringify({ isHighLight: item.isHighLight }),
      //   coordinate: item.path[0],
      //   anchors: [-23, 14.5], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      //   imageSize: [46, 29], //图片的尺寸
      //   range: [1, 1000000], //可视范围
      //   imagePath: getImageByCloud('bus-icon'), //显示图片路径
      //   displayMode: 2,
      //   autoHeight: true,
      //   priority: 1,
      //   occlusionCull: false
      // };
      // markerList.push(marker);
    }
  });
  // await __g.marker.add(markerList);
  await __g.customObject.add(arr);
  if (route.name !== 'powerCombine') {
    __g.customObject.delete(bus_idList);
    return;
  }

  // __g.marker.setAttachCustomObject(
  //   markerList.map((item) => {
  //     return {
  //       markerId: item.id,
  //       objectId: item.id,
  //       offset: [0, 0, 0.5]
  //     };
  //   })
  // );
  __g.customObject.updateBegin();
  Object.keys(moveMap).forEach((key) => {
    __g.customObject.startMove(key, 0, moveMap[key]);
    // moveMap[key].forEach((el) => {
    //   console.log(el, 'moveTo');
    //   __g.customObject.moveTo(el);
    // });
  });
  __g.customObject.updateEnd();
};

const pushData = () => {};

const addAttachBus = async (data) => {
  const res = await Api.getBusRunningInfo({
    plateNumber: data.plateNumber
  });
  await __g.marker.deleteByGroupId('attach-marker');
  const oPopUpUrl = getPopupHtml({
    usePopupHtml: true,
    com: 'attach-bus',
    params: {
      value: JSON.stringify({ ...data, stationName: data.name, ...(res?.data || {}) })
    }
  });
  const marker = {
    id: data.plateNumber,
    groupId: 'attach-marker',
    userData: JSON.stringify({ ...data }),
    coordinate: [+data.lng, +data.lat],
    anchors: [-0.5, -0.5], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [1, 1], //图片的尺寸
    range: [1, 1000000], //可视范围
    imagePath: getImageByCloud('bus-icon'), //显示图片路径
    popupURL: oPopUpUrl,
    popupSize: [scale(200), scale(170)],
    popupOffset: [-scale(200) / 2, -scale(100)], //弹窗偏移
    displayMode: 2,
    autoHeight: true,
    priority: 1,
    occlusionCull: false,
    autoHidePopupWindow: false
  };
  await __g.marker.add(marker);
  await __g.marker.setAttachCustomObject([
    {
      markerId: marker.id,
      objectId: marker.id,
      offset: [0, 0, 0.5]
    }
  ]);
  __g.marker.showPopupWindow(marker.id);
};

const setModelLocation = async (nextIndex) => {
  // 更新车辆位置
  __g.customObject.updateBegin();
  busLineList.forEach((item, i) => {
    // const timeGap = dayjs(item[1].gpsTime).diff(dayjs(item[0].gpsTime), 'second');
    currentIndex = 1;
    __g.customObject.setLocation(
      item[1].plateNumber,
      transformCoordsByType([item[nextIndex].lng, item[nextIndex].lat], 2),
      5
    );
  });
  await __g.customObject.updateEnd();
  busLineList.forEach((item, i) => {
    const timeGap = dayjs(item[1].gpsTime).diff(dayjs(item[0].gpsTime), 'second');
    pushBusData(item, nextIndex + 1, i, 5);
  });
};

const addBusLine = async () => {
  await __g.polyline.delete(bus_idList);
  const arr = [];
  const arr2 = [];
  busLineList.forEach((item) => {
    const path = transformCoordsArrByType(
      item.map((el) => [el.lng, el.lat]),
      2
    );
    const line = {
      id: item[0].plateNumber,
      userData: JSON.stringify(item[0]),
      groupId: 'buslineGroup',
      color: [0 / 255, 255 / 255, 148 / 255, 0.5],
      coordinates: path,
      range: [1, 10000000],
      thickness: 120,
      intensity: 0.2,
      depthTest: false,
      shape: 0,
      style: 4
    };
    const cusObj = {
      id: item[0].plateNumber,
      groupId: 'busObjGroup',
      userData: JSON.stringify(item[0]),
      pakFilePath: '@path:能源_公交车.pak',
      assetPath: '/JC_CustomAssets/VehicleLibrary/Exhibition/能源_公交车_0',
      range: [1, 10000000],
      autoHeight: true,
      location: path[0],
      // localRotation: item.rotation,
      isEffectRotation: true,
      scale: [300, 300, 300],
      localRotation: [0, 74, 0],
      supportAttach: false
    };
    arr2.push(cusObj);
    arr.push(line);
  });

  bus_idList = arr.map((el) => el.id);

  await __g.polyline.add(arr, null);
  await __g.customObject.add(arr2);
  __g.customObject.updateBegin();

  __g.customObject.updateEnd();

  if (route.name !== 'powerCombine') {
    __g.customObject.delete(bus_idList);
    return;
  }

  setModelLocation(1);
};

const handleToBusTwin = async () => {
  clearTimeout(timer);
  isPlaying.value = true;
  await Promise.allSettled([
    __g.customObject.hide(bus_idList),
    __g.polyline.hide(bus_idList),
    __g.marker.hideByGroupId('busObjGroup'),
    __g.marker.hideByGroupId('quName'),
    beforeAddOrExitHrStation(true)
  ]);
  mapStore.changeCurrentQu('福田区');
  mapStore.changeCurrentPosition('福田区');
  const id = mapStore.treeInfo.find((el) => el.name === '营运巴士' && el.type === 'EPT_Scene')?.iD;
  id && (await __g.tileLayer.show(id));
  await __g.misc.callBPFunction({
    functionName: '播放',
    objectName: '动画播放_3'
  });
  __g.camera.set(505295.399707, 2492716.725, 1553.664844, -57.992973, -90.920784, 0);
  timer = setTimeout(async () => {
    __g.camera.set(505295.399707, 2492716.725, 1553.664844, -57.992973, -90.920784, 0);
    id && (await __g.tileLayer.hide(id));
    id && (await __g.tileLayer.show(id));
  }, 22.44 * 1000);
};

const pushBusData = async (dataList, nextIndex, listIndex, timeout) => {
  if (nextIndex < dataList.length - 1) {
    // const timeGap = dayjs(dataList[nextIndex].gpsTime).diff(
    //   dayjs(dataList[nextIndex - 1].gpsTime),
    //   'second'
    // );
    const item = dataList[nextIndex];
    timerMap[listIndex] = setTimeout(async () => {
      currentIndex = nextIndex;
      await __g.customObject.setLocation(
        item.plateNumber,
        transformCoordsByType([item.lng, item.lat], 2),
        5
      );
      clearTimeout(timerMap[listIndex]);
      pushBusData(dataList, nextIndex + 1, listIndex, 2);
    }, 5 * 1000);
  }
};

const addBusV2g = async (pos) => {
  const res = await Api.getNearestV2GStations({
    lng: pos[0],
    lat: pos[1]
  });

  await __g.marker.deleteByGroupId('bus-v2g');
  const arr = [];
  const odLines = [];
  res?.data?.forEach((el) => {
    const oPopUpUrl = getPopupHtml({
      usePopupHtml: true,
      com: 'recommend-bus-line',
      params: {
        value: JSON.stringify({ ...el, stationName: el.name })
      }
    });
    console.log(oPopUpUrl);
    const maxLen = `${el?.name || 0}`.length + 1;
    const marker = {
      id: el.name,
      groupId: `bus-v2g`,
      coordinate: transformCoordsByType([el.longitude, el.latitude], 2), //坐标位置
      anchors: [-39 * 1.2, 80 * 1.2], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [78 * 1.2, 80 * 1.2], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: getImageByCloud('qu-point'), //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      autoHidePopupWindow: false,
      popupURL: oPopUpUrl,
      popupSize: [scale(100 + maxLen * 20), scale(50)],
      popupOffset: [-scale(100 + maxLen * 20) / 2 - 78 * 1.2 * 0.75, -scale(55)], //弹窗偏移
      autoHeight: true, // 自动判断下方是否有物体
      displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
    };
    arr.push(marker);

    const odLine = {
      id: el.name,
      color: [251 / 255, 217 / 255, 31 / 255, 0.8],
      lineThickness: 100,
      coordinates: [
        transformCoordsByType(clickCoord, 2),
        transformCoordsByType([el.longitude, el.latitude], 2)
      ],
      flowPointSizeScale: 120,
      flowRate: 0.5,
      intensity: 10,
      lineShape: 2,
      flowShape: 0,
      lineStyle: 2, //  0:纯色 1:箭头，2:流动点
      startPointShape: 0,
      endPointShape: 0,
      startLabelShape: 0,
      endLabelShape: 0,
      tiling: 1
    };
    const odLine2 = {
      id: el.name + '_2',
      color: [251 / 255, 217 / 255, 31 / 255, 0],
      lineThickness: 80,
      coordinates: [
        transformCoordsByType(clickCoord, 2),
        transformCoordsByType([el.longitude, el.latitude], 2)
      ],
      flowPointSizeScale: 120,
      flowRate: 1,
      intensity: 10,
      lineShape: 2,
      flowShape: 0,
      lineStyle: 2, //  0:纯色 1:箭头，2:流动点
      startPointShape: 0,
      endPointShape: 0,
      startLabelShape: 0,
      endLabelShape: 0,
      tiling: 100
    };
    odLines.push(odLine2);
    odLines.push(odLine);
  });
  __g.marker.add(arr, () => {
    __g.marker.focus(
      arr.map((el) => el.id),
      2000
    );
    __g.marker.showPopupWindow(arr.map((el) => el.id));
  });
  __g.odline.add(odLines);
};

bus.on('map-back', async () => {
  clearTimeout(timer);
  isPlaying.value = false;
  __g.misc.callBPFunction({
    functionName: '停止',
    objectName: '动画播放_3'
  });
  __g.customObject.show(bus_idList),
    __g.polyline.show(bus_idList),
    __g.marker.showByGroupId('busObjGroup'),
    __g.marker.showByGroupId('quName'),
    beforeAddOrExitHrStation(false);
  const id = mapStore.treeInfo.find((el) => el.name === '营运巴士' && el.type === 'EPT_Scene')?.iD;
  id && (await __g.tileLayer.hide(id));
  timerMap.forEach((el) => {
    clearTimeout(el);
  });
  __g.marker.deleteByGroupId('attach-marker');
  __g.customObject.show(bus_idList);
  __g.polyline.show(bus_idList);
  __g.marker.deleteByGroupId('bus-v2g');
  __g.odline.clear();
  setModelLocation(currentIndex);
});

const beforeAddOrExitHrStation = (isShow: boolean) => {
  !isShow ? __g.polygon.show(layerNameQuNameArr('qu')) : __g.polygon.hide(layerNameQuNameArr('qu'));
  !isShow ? __g.polygon3d.show('wall') : __g.polygon3d.hide('wall');
};

const setScaleByHeight = (height) => {
  let scale = 300;
  if (height > 18000) {
    scale = 300;
  } else {
    scale = Math.max((height / 18000) * 300, 100);
  }
  __g.customObject.updateBegin();
  bus_idList.forEach((el) => {
    __g.customObject.setScale(el, [scale, scale, scale]);
  });
  __g.customObject.updateEnd();
};

useEmitt('AIRCITY_EVENT', async (e) => {
  console.log(e, 'AIRCITY_EVENT');
  // 点击站点图标
  if (e.eventtype === 'LeftMouseButtonClick') {
    if (e.Type === 'CustomObj' || e.GroupID === 'busObjGroup') {
      const data = JSON.parse(e.UserData ?? '{}');
      // data?.isHighLight && handleToBusTwin();
      const coord = transformCoords('EPSG:4547', 'EPSG:4326', [
        e.MouseClickPoint[0],
        e.MouseClickPoint[1]
      ]);
      clickCoord = coord;
      await Promise.allSettled([
        __g.customObject.hide(bus_idList.filter((el) => el !== data?.plateNumber)),
        __g.polyline.hide(bus_idList.filter((el) => el !== data?.plateNumber))
      ]);

      timerMap.forEach((el) => {
        clearTimeout(el);
      });
      timerMap = [];
      mapStore.changeCurrentQu('福田区');
      mapStore.changeCurrentPosition('福田区');
      addAttachBus(data);
      // addBusV2g(coord);
    }
  }

  if (e.eventtype === 'MarkerCallBack') {
    if (e.Data === 'click-recommend-line') {
      await __g.marker.hideByGroupId('attach-marker');
      // addBusV2g(clickCoord);
      handleToBusTwin();
    }
  }

  if (e.eventtype === 'CameraStartMove') {
  }

  if (e.eventtype === 'CameraStopMove') {
    const data = await __g.camera.get();
    const height = data?.camera[2];
    setScaleByHeight(height);
  }
});

watch(
  () => isPlaying.value,
  (val) => {
    emits('playTwin', val);
  },
  {
    deep: true
  }
);
</script>

<style scoped lang="less">
.remain-power {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    height: 51px;
  }
  .name {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>
