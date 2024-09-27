<template>
  <qu ref="quRef"></qu>
  <legend-list :legendList="legendListData" :legendName="legendNameData" />
  <MapLeftBtn>
    <div class="tbn-list">
      <div class="remain-power" @click="handleDraw">
        <img draggable="false" :src="isDrawing ? remainPowerIconA : remainPowerIcon" />
        <div class="name">响应通知</div>
      </div>
      <div class="remain-power" v-show="showFIlter" @click="handleFilter">
        <img draggable="false" :src="isFilter ? filterIconA : filterIcon" />
        <div class="name">参与运营商</div>
      </div>
    </div>
  </MapLeftBtn>
  <!-- <div class="time-slider-wrapper" v-show="!showVirture" v-if="range.length">
    <TimeSlide v-model="currentDt" :data="range" disabled />
  </div> -->
  <CustomerDialog
    class="virture-dialog"
    title="资源信息"
    :visible="showDialog"
    :width="'5.2rem'"
    :modal="false"
    @close="showDialog = false"
  >
    <searchDialog :data="distributedResource" @handleDetail="handleDetail" />
  </CustomerDialog>
</template>

<script setup lang="ts">
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import Qu from '@/components/map-layer/qu.vue';
import { getPopupHtml, getStrLength } from '@/utils/index';
import { scale } from '@sutpc/config';
import { circle, bbox, getCoord, polygon } from '@turf/turf';
// import TimeSlide from '@/components/time-slider/index.vue';
import { Message } from 'element-plus';
import bus from '@/utils/bus';
import searchDialog from '../components/search-dialog.vue';
import {
  getImageByCloud,
  addCommon3dt,
  delete3dt,
  getTreeLayerIdByName,
  playCamera,
  returnStationPointConfig,
  getHtmlUrl,
  focusToHihtLightPop
} from '@/global/config/map';
import { useRoute } from 'vue-router';
import { virtureTileIds, virtureView, virturePoint, allHeatIdsList, showIds } from './layer-config';
import remainPowerIconA from '@/views/special-scene/super-charging-building/images/super-charge-switch-active.png';
import remainPowerIcon from '@/views/special-scene/super-charging-building/images/super-charge-switch.png';
import filterIconA from '@/views/special-scene/super-charging-building/images/filter-active.png';
import filterIcon from '@/views/special-scene/super-charging-building/images/filter.png';
import Api from '../api';
import { requestGeojsonData } from '@/components/map-layer/api.js';
import { useMapStore } from '@/stores/map';
import MapLeftBtn from '@/components/map-left-btn.vue';
import {
  transformCoords,
  transformCoordsArrByType,
  transformCoordsByType,
  transformCoordsArr
} from '@/utils/map-coord-tools';
import CustomerDialog from '@/components/custom-dialog/index.vue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';

const props = defineProps({
  adjustDate: {
    type: String,
    default: ''
  },
  activeIndex: {
    type: Number
  }
});
const storeVisible = useVisibleComponentStore();
let currtentStation: any = {};
const currentPosition = computed(() => store.currentPosition);
const showDialog = ref(false);
const distributedResource = ref([]);
const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
// const range = ref(
//   Array.from({ length: 3 }, (_, i) =>
//     dayjs()
//       .subtract(3 - i, 'days')
//       .format('YYYY-MM-DD')
//   )
// );
const range = ref([]);
const rangeData = ref([]);
const currentDt = ref(0);
const store = useMapStore();
const route = useRoute();
const quRef = ref();
let isInit;
const isDrawing = ref(false);

const showVirture = ref(false);

let distributedPoint;

let timer;

let startTimer;

let legendNameData = '负荷热力(kw)';
let legendListData = ref([
  {
    color: 'rgb(0, 185, 255)',
    name: '≤500',
    type: false
  },
  {
    color: 'rgb(97, 255, 0)',
    name: '500～1000',
    type: false
  },
  {
    color: 'rgb(255, 255, 0)',
    name: '1000～3000',
    type: false
  },
  {
    color: 'rgb(255, 132, 0)',
    name: '3000～5000',
    type: false
  },
  {
    color: 'rgb(255, 0, 6)',
    name: '≥5000',
    type: false
  }
]);

const showFIlter = ref(false);
const isFilter = ref(false);

const allHeatIds = computed(() => showIds[props.activeIndex] || []);

const formatTooltip = (vl) => {
  return range[vl];
};

const handleFilter = () => {
  isFilter.value = !isFilter.value;
  handleDetail();
};

const getData = async () => {
  const res = await Promise.all([
    Api.getAdjustOverViewByDate({
      dataTime: dayjs(props.adjustDate).format('YYYY-MM-DD')
    }),
    Api.requestGeojsonData('barPosition4547')
  ]);
  updateLayer(res[0]?.data, res[1]?.features);
};

const updateLayer = async (data = [], areaPosition = []) => {
  const ids = areaPosition.map((item) => `${item.properties.QUCODE}`);
  const makerRes = await __g.marker.get(ids);
  if (makerRes?.data?.length) {
    __g.marker.updateBegin();
    ids.forEach((id) => {
      const dataObj = data.find((el) => `${el.areaCode}` === `${id}`) || {};
      const oPopUpUrl = getPopupHtml({
        usePopupHtml: true,
        com: 'virtual-electric',
        params: {
          value: JSON.stringify({ ...dataObj })
        }
      });
      __g.marker.setPopupURL(id, oPopUpUrl);
    });
    __g.marker.updateEnd();
  } else {
    drawAreaLayer(data, areaPosition);
  }
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
    // console.log(oPopUpUrl);
    const maxLen = Math.max(
      `${dataObj?.planNum || 0}`.length,
      `${dataObj?.actualNum || 0}`.length,
      `${dataObj?.actualAdjust || 0}`.length,
      `${dataObj?.baseline || 0}`.length
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

  if (isDrawing.value) {
    __g.marker.hideByGroupId('area-point-layer');
  }
  __g.marker.showPopupWindow(idList);
};

const addHeatLayer = async () => {
  // const filterIds = allHeatIds.value.filter((el, i) => i > currentDt.value);
  // const showIds = allHeatIds.value.filter((el, i) => i <= currentDt.value);
  await delete3dt(__g, showIds.flat(3));
  addCommon3dt(__g, showIds[props.activeIndex][0]);
};

const handleTopData = async () => {
  const date = rangeData.value.find(
    (v) => v.adjustTime === rangeData.value[currentDt.value].adjustTime
  );
  if (!date) return;
  const param = {
    adjustTime: date?.adjustTime,
    dataTime: dayjs(date.adjustTime).format('YYYY-MM-DD'),
    districtCode: ''
  };
  const { data } = await Api.getAdjustOverViewByTime(param);
  bus.emit('virtual-electric-top-data', data);
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
  clearInterval(timer);
  timer = setInterval(() => {
    if (currentDt.value < range.value.length - 1) {
      currentDt.value = currentDt.value + 1;
    } else {
      currentDt.value = 0;
    }
  }, 2000);
};

const setWeather = async () => {
  await Promise.allSettled([
    __g.weather.setCloudDensity(0),
    __g.weather.setCloudHeight(0),
    __g.weather.setCloudThickness(0),
    __g.weather.setFogParam(0, 0, 0, 0)
  ]);
};

// 设置飞渡开启黑暗模式
const openDarkMode = async () => {
  // await setWeather();
  // await __g.weather.setDarkMode(false, () => {
  //   __g.weather.setDateTime(2023, 10, 13, 18, 30, false, () => {
  //     __g.weather.setDarkMode(true, () => {
  //       Promise.resolve(1);
  //     });
  //   });
  // });
};

// 设置飞渡关闭黑暗模式
const closeDarkMode = async () => {
  // await setWeather();
  await __g.weather.simulateTime([9, 10], [9, 30], 1);
  // await __g.weather.setDarkMode(false, () => {
  //   __g.weather.setDateTime(2023, 10, 13, 9, 30, false, () => {
  //     __g.weather.setDarkMode(true, () => {
  //       Promise.resolve(1);
  //     });
  //   });
  // });
};

const cameraList = [
  {
    camera: [504325.743677, 2480839.845799, 24138.2675, -57.410416, -95.114723, 0.000013],
    duration: 1
  },
  {
    camera: [504709.319766, 2484384.665938, 17244.20875, -57.410416, -95.114723, 0.000013],
    duration: 2
  },
  {
    camera: [504993.713125, 2487022.868125, 12327.4025, -57.410416, -95.114723, 0.000013],
    duration: 2
  },
  {
    camera: [504813.355078, 2489086.646875, 8820.76, -57.410416, -95.114723, 0.000013],
    duration: 2
  },
  {
    camera: [504790.477695, 2483499.580938, 3368.43625, -15.498402, -91.806519, 0.000004],
    duration: 6
  }
];

const playCameraTortur = async () => {
  await __g.cameraTour.stop();
  await __g.cameraTour.delete('xndc');
  // await __g.camera.set(cameraList[0].camera);
  //通过接口添加导览并播放
  let frames = [];
  //注意：rocation属可选参数，若不传入则相机朝向会根据相机的连续位置自动计算
  let duration = 0;
  cameraList.forEach((element, i) => {
    duration += element.duration;
    // @ts-nocheck
    frames.push(
      //@ts-ignore
      new CameraTourKeyFrame(i, duration, element.camera.slice(0, 3), element.camera.slice(3))
    );
  });
  //@ts-ignore
  let o = new CameraTourData('xndc', 'xndc', frames);
  await __g.cameraTour.add(o);
  await __g.cameraTour.play('xndc');
};

const handleToVirture = async () => {
  clearTimeout(timer);
  await __g.camera.stopAnimation();
  await openDarkMode();
  showVirture.value = true;
  store.changeCurrentQu('福田区');
  store.changeCurrentPosition('福田区');
  __g.polygon.hide(quRef.value?.allQUIds);
  __g.polygon3d.hide('wall');
  delete3dt(__g, allHeatIdsList.flat(3));
  __g.marker.hideByGroupId('virtual-point');
  __g.marker.hideByGroupId('quName');
  __g.marker.hideByGroupId('qu');
  await __g.camera.set(virtureView);
  const ids = getTreeLayerIdByName('行政地图_虚拟电厂_福田', store.treeInfo);
  __g.infoTree.show(ids);
  await __g.weather.simulateTime([12, 0], [17, 30], 5);
  playCameraTortur();
  // await playCamera(__g, '虚拟电厂');
};

const addPoint = async () => {
  const res1 = await requestGeojsonData('barPosition4547');
  const date = rangeData.value.filter(
    (v) => v.adjustTime === rangeData.value[currentDt.value].adjustTime
  )[0];
  const res = await Api.getVppAdjustData(date?.adjustTime);
  const quData = res?.data || [];
  const quCenterPositions = res1.features;

  const idList = [];
  let markers = [];
  quCenterPositions.forEach((item, index) => {
    const dataObj = quData.find((el) => `${el.areaCode}` === `${item.properties.QUCODE}`) || {};
    const oPopUpUrl = getPopupHtml({
      usePopupHtml: true,
      com: 'virtual-electric',
      params: {
        value: JSON.stringify({ ...dataObj })
      }
    });
    const maxLen = Math.max(
      `${dataObj?.virtualPowerPlantNum || 0}`.length,
      `${dataObj?.adjustableResource || 0}`.length,
      `${dataObj?.adjustableCapacity || 0}`.length,
      `${dataObj?.installedCapacity || 0}`.length
    );

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
      popupSize: [scale(100 + maxLen * 14), scale(110)],
      popupOffset: [-scale(100 + maxLen * 14) / 2 - 5, -scale(15)], //弹窗偏移
      autoHeight: false, // 自动判断下方是否有物体
      displayMode: 2, //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
      priority: item.properties.PRIORITY
    };
    markers.push(o);
    idList.push(o.id);
  });
  await aircityObj.value.acApi.marker.add(markers);
  __g.marker.showPopupWindow(idList);
};

const init = async () => {
  await __g.reset();
  await __g.infoTree.hide(virtureTileIds);
  startTimer = setTimeout(() => {
    addHeatLayer();
    isInit = true;
  }, 2000);
  // addVirturePoint();
};

const getBBox = (center, radius) => {
  const bboxs = bbox(
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: getCoord(center)
      }
    },
    radius
  );
  console.log(bboxs);
};

const getDistributerResource = async (data) => {
  distributedPoint = data;
  const res = await Api.getDistributedResource({
    lng: distributedPoint[0],
    lat: distributedPoint[1],
    distance: 2.5
  });
  distributedResource.value = res?.data;
};

const drawCircle = async (radius, centerPoint) => {
  // getBBox(centerPoint, radius);
  await __g.polygon3d.delete('search-circle');
  const options = { steps: 100, units: 'kilometers' };
  const polygon = circle(centerPoint, radius / 1000, options);
  const coord = transformCoordsArrByType(polygon.geometry.coordinates[0], 1, 3000);
  const p = {
    id: 'search-circle',
    coordinates: coord,
    range: [1, 200000],
    height: 1,
    color: [75 / 255, 222 / 255, 255 / 255, 0.1],
    frameColor: 'RGB(255,255,255)',
    frameThickness: 100, //边框厚度
    intensity: 1, //亮度
    // style: 0, //单色 请参照API开发文档选取枚举
    depthTest: false, //是否做深度检测 开启后会被地形高度遮挡
    // intensity: 1.0,
    style: 10,
    tillingX: 0,
    tillingY: 0,
    generateTop: false,
    generateSide: false,
    generateBottom: false
  };

  let pArr = [];
  pArr.push(p);
  __g.polygon3d.add(pArr).then(async () => {
    __g.polygon3d.focus('search-circle', 15500, 0);
    showDialog.value = true;
  });
  getDistributerResource(centerPoint);
};

let fieldTrans = {
  cabinet: { iconType: 400, name: 'cabinetName', popName: 'chargingsCabinetStationPop' },
  chargingStation: { iconType: 50, name: 'stationName' },
  energyStorageStation: { iconType: 200, name: 'energyStorageName', popName: 'energyStationPop' },
  photovoltaic: { iconType: 300, name: 'photovoltaicName', popName: 'photovoltaicStationPop' },
  powerStation: { iconType: 500, name: 'powerStationName', popName: 'powerExchangeStationPop' }
};

const drawPoint = async (res = {}) => {
  await __g.marker.deleteByGroupId('jdStation');
  let pointArr = [];
  for (const key in res) {
    if (Object.prototype.hasOwnProperty.call(res, key)) {
      const element = res[key];
      element.forEach((item, index) => {
        const imgName = {
          1: 'station50',
          2: 'station50',
          3: 'stationpoint-ccz',
          4: 'stationpoint-v2g',
          5: 'stationpoint-ccz-oubiao'
        };
        let stationName = fieldTrans[key]['name'];
        let module = fieldTrans[key]['iconType'];
        let xoffset = getStrLength(item[stationName]) * 6;
        let img = 'station' + module;
        if (key == 'chargingStation') {
          item['longitude'] = item.lng;
          item['latitude'] = item.lat;
          img = imgName[item.stationLogo];
        }
        let o1 = {
          id: `stationOut-${key}-${index}`,
          groupId: 'jdStation',
          userData: JSON.stringify({ ...item, fromVirture: true }),
          // coordinateType: 2,
          coordinate: transformCoordsByType([item.longitude, item.latitude], 2), //坐标位置
          anchors: [-22.5, 150], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
          imageSize: [55, 150], //图片的尺寸
          range: [1, 150000], //可视范围
          imagePath: getImageByCloud(img),
          autoHidePopupWindow: false,
          text: item[stationName], //显示的文字
          useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
          textRange: [1, 1500], //文本可视范围[近裁距离, 远裁距离]
          textOffset: [-20 - xoffset, -85], // 文本偏移
          textBackgroundColor: [0 / 255, 46 / 255, 66 / 255, 0.8], //文本背景颜色
          fontSize: 16, //字体大小
          fontOutlineSize: 1, //字体轮廓线大小
          fontColor: '#FFFFFF', //字体颜色
          displayMode: 2,
          autoHeight: true
        };
        if (key == 'chargingStation') {
          const popupWidth = 146; // 弹框默认宽度
          const fontSize = 24; // 弹框字体大小
          const popupSizeX = item.stationName.length * fontSize + popupWidth; // 弹框宽度
          o1['popupURL'] = `${getHtmlUrl()}/static/html/stationPop.html?value=${
            item.stationName
          }&stationId='station-'+${item.stationId}`; //弹窗HTML链接
          o1['popupBackgroundColor'] = [1.0, 1.0, 1.0, 1]; //弹窗背景颜色
          o1['popupSize'] = [popupSizeX, 60]; //弹窗大小
          o1['popupOffset'] = [-popupSizeX / 2, -100]; //弹窗偏移
          o1['autoHidePopupWindow'] = false;
          o1.id = `stationOut-${key}-${item.stationId}`;
        }
        pointArr.push(o1);
      });
    }
  }
  // await __g.marker.add(pointArr, null);
  setTimeout(() => {
    __g.marker.add(pointArr, () => {
      __g.marker.focus(
        pointArr.map((el) => el.id),
        3000
      );
    });
  }, 1000);
};

const handleDetail = async () => {
  showDialog.value = false;
  isDrawing.value = false;
  __g.polygon3d.delete('search-circle');
  __g.polygon3d.delete('drawing-polygon');
  __g.tileLayer.hide(showIds[props.activeIndex]);
  if (!drawingData?.length) return;
  // const data = await Api.getDistributedResourceDetails({
  //   lng: distributedPoint[0],
  //   lat: distributedPoint[1],
  //   distance: 2.5,
  //   filter: isFilter.value ? true : undefined
  // });
  const pdata = transformCoordsArr(
    drawingData.map((el) => [el[0], el[1]]),
    'EPSG:4547',
    'EPSG:4326'
  );
  const data = await Api.getDistributedResourceDetailsByGeojson({
    geojson: JSON.stringify({
      type: 'FeatureCollection',
      features: [polygon([pdata])]
    }),
    filter: isFilter.value ? true : undefined
  });
  store.changeCurrentQu('circleSearch区');
  store.changeCurrentPosition('circleSearch区');
  showFIlter.value = true;
  drawPoint(data?.data);
};

let drawingData = [];
const handleDraw = async () => {
  if (drawingData?.length) {
    drawingData = [];
  }

  __g.polygon3d.delete('search-circle'), __g.polygon3d.delete('drawing-polygon');
  isDrawing.value = !isDrawing.value;
  if (isDrawing.value) {
    await Promise.allSettled([
      __g.marker.hideByGroupId('area-point-layer')
      // __g.tileLayer.hide(showIds[props.activeIndex])
    ]);
    // startDrawPolygon();
    await __g.settings.setEnableCameraMovingEvent(true);
  } else {
    await Promise.allSettled([
      __g.marker.showByGroupId('area-point-layer'),
      // __g.tileLayer.show(showIds[props.activeIndex]),
      __g.polygon3d.delete('search-circle'),
      __g.polygon3d.delete('drawing-polygon')
    ]);
  }
};

const addHighLightStation = async (item, stationType: string) => {
  let popName = fieldTrans[stationType].popName;
  let iconType = fieldTrans[stationType].iconType;
  let o1 = {
    id: 'stationOut-hight',
    groupId: 'jdStation',
    userData: JSON.stringify(item),
    // coordinateType: 2,
    coordinate: transformCoordsByType([item.longitude, item.latitude], 2), //坐标位置
    anchors: [-35, 200], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [70, 209], //图片的尺寸
    range: [1, 150000], //可视范围
    imagePath: getImageByCloud('hlSta' + iconType),
    popupURL: `${getHtmlUrl()}/static/html/${popName}.html?value=${JSON.stringify(item)}`, //弹窗HTML链接
    popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
    popupSize: [400, 245.6], //弹窗大小
    popupOffset: [-224, -223], //弹窗偏移
    autoHidePopupWindow: false,
    useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
    displayMode: 2,
    autoHeight: true
  };
  await __g.marker.add(o1, null);
  __g.marker.showPopupWindow('stationOut-hight');
  await __g.marker.focus('stationOut-hight', 100, 1, [-90.991409, -90.380768, 0]);
  await focusToHihtLightPop(item.longitude, item.latitude, __g);
};

const startDrawPolygon = async () => {
  await __g.settings.setEnableCameraMovingEvent(true);
  await __g.tools.setMeasurement(6, {
    pointSize: 8,
    // textSize: 0,
    // textColor: [1, 1, 1, 0.01],
    pointColor: [0, 0, 1, 0.3],
    lineColor: [0, 0, 1, 1],
    areaColor: [0, 1, 0, 0.3],
    showCoordinateText: false
  });
  __g.tools.startMeasurement(() => {
    showDialog.value = true;
  });
};

const drawPolygon = async (point) => {
  drawingData.push(point);
  const marker = {
    id: JSON.stringify(drawingData[drawingData.length - 1]),
    groupId: 'drawing-polygon',
    coordinate: drawingData[drawingData.length - 1],
    anchors: [-10, 10], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [20, 20], //图片的尺寸
    range: [1, 1000000], //可视范围
    imagePath: getImageByCloud('point-icon'), //显示图片路径
    useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
    popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
    autoHidePopupWindow: false,
    autoHeight: false, // 自动判断下方是否有物体
    displayMode: 2
  };
  __g.marker.add(marker, null);
  if (drawingData.length > 1) {
    const polyline = {
      id: JSON.stringify(drawingData[drawingData.length - 2]),
      groupId: 'drawing-polygon',
      userData: JSON.stringify(drawingData[drawingData.length - 2]),
      coordinates: [drawingData[drawingData.length - 2], drawingData[drawingData.length - 1]],
      thickness: 100,
      intensity: 1000,
      flowRate: 0,
      depthTest: false,
      shape: 0,
      style: 4,
      color: 'RGB(255,255,0)'
    };
    __g.polyline.add(polyline, null);
  }
};

const closeDrawing = async () => {
  if (drawingData.length > 2) {
    drawingData.push(drawingData[0]);
    const polyline = {
      id: JSON.stringify(drawingData[drawingData.length - 1]),
      groupId: 'drawing-polygon',
      coordinates: [drawingData[drawingData.length - 1], drawingData[0]],
      thickness: 100,
      intensity: 10,
      flowRate: 0,
      depthTest: false,
      shape: 1,
      style: 4,
      color: 'RGB(0,0,0)'
    };
    const polygonItem = {
      id: 'drawing-polygon',
      coordinates: drawingData.map((el) => [el[0], el[1], 3000]),
      range: [1, 200000],
      height: 1,
      color: [75 / 255, 222 / 255, 255 / 255, 0.1],
      frameColor: 'RGB(255,255,255)',
      frameThickness: 100, //边框厚度
      intensity: 1, //亮度
      // style: 0, //单色 请参照API开发文档选取枚举
      depthTest: false, //是否做深度检测 开启后会被地形高度遮挡
      // intensity: 1.0,
      style: 10,
      tillingX: 0,
      tillingY: 0,
      generateTop: true,
      generateSide: false,
      generateBottom: true
    };
    __g.polyline.add(polyline, null);
    __g.polygon3d.add(polygonItem, async () => {
      __g.marker.deleteByGroupId('drawing-polygon');
      __g.polyline.delete(drawingData.map((el) => JSON.stringify(el)));
      isDrawing.value = false;
      const pdata = transformCoordsArr(
        drawingData.map((el) => [el[0], el[1]]),
        'EPSG:4547',
        'EPSG:4326'
      );
      try {
        const res = await Api.getDistributedResourceByGeojson({
          geojson: JSON.stringify({
            type: 'FeatureCollection',
            features: [polygon([pdata])]
          })
        });
        distributedResource.value = res.data;
      } catch (error) {}
      showDialog.value = true;
    });
  } else {
    ElMessage.warning('请绘制至少三个点');
  }
};

useEmitt('AIRCITY_EVENT', async (e) => {
  console.log(e);
  if (e.eventtype === 'LeftMouseButtonClick') {
    // 进入虚拟电厂
    if (e.Id === 'virtual-point') {
      handleToVirture();
    }

    if (isDrawing.value && e.GroupID !== 'drawing-polygon') {
      drawPolygon(e.MouseClickPoint);
    } else if (
      isDrawing.value &&
      e.GroupID === 'drawing-polygon' &&
      e.Id === JSON.stringify(drawingData[0])
    ) {
      closeDrawing();
    }

    if (isDrawing.value && !e.GroupID) {
      const coord = transformCoords('EPSG:4547', 'EPSG:4326', [
        e.MouseClickPoint[0],
        e.MouseClickPoint[1]
      ]);
      // drawCircle(3000, [coord[0], coord[1]]);
    }

    if (e.Id?.includes('stationOut-')) {
      if (currentPosition.value !== '') {
        store.changeCurrentPositionBak(currentPosition.value);
        store.changeCurrentPosition('');
      }
      //关闭上一个高亮其他站点
      currtentStation.stationId1 ? await __g.marker.show(currtentStation.stationId1) : '';
      __g.marker.delete('stationOut-hight');
      //关闭上一个高亮充电站
      currtentStation.stationId1
        ? await __g.marker.hidePopupWindow(currtentStation.stationId1)
        : '';
      quRef.value.hideHighLightNormalStation();
      storeVisible.changeShowComponent(true);
      storeVisible.changeShowDetail({
        show: false,
        params: {}
      });
      currtentStation = JSON.parse(e.UserData);
      currtentStation['stationId1'] = e.Id;

      if (e.Id?.includes('chargingStation-')) {
        if (currtentStation?.isHr == 0 && currtentStation?.hrId) {
          quRef.value.enterStationInfo(currtentStation);
          quRef.value.addHrStation(
            currtentStation.stationId,
            true,
            currtentStation.stationId === '118'
          );
        } else {
          //充电站
          quRef.value.highLightNormalStation(currtentStation);
          quRef.value.enterStationInfo(currtentStation);
        }
      } else {
        let stationType = e.Id.split('-')[1];
        __g.marker.hide(e.Id);
        addHighLightStation(currtentStation, stationType);
      }
    }
  }
});

watch(
  () => [props.adjustDate, props.activeIndex],
  async () => {
    nextTick(async () => {
      if (props.adjustDate) {
        await __g.marker.deleteByGroupId('jdStation');

        await __g.polygon3d.delete('search-circle');
        __g.polygon3d.delete('drawing-polygon');
        isDrawing.value = false;

        const param = {
          adjustTime: '',
          dataTime: props.adjustDate,
          districtCode: ''
        };
        const { data } = await Api.getVppAdjustTime(param);
        rangeData.value = data;
        range.value = data.map((v) => v.adjustTimeText);
        currentDt.value = 0;
        handleTopData();
        getData();
        if (isInit) {
          addHeatLayer();
        }
        // setCurrent();
      }
    });
  },
  {
    deep: true,
    immediate: true
  }
);

bus.on('map-back', async () => {
  // closeDarkMode();
  // await __g.camera.stopAnimation();
  // __g.polygon.show(quRef.value?.allQUIds);
  // __g.polygon3d.show('wall');
  // const ids = getTreeLayerIdByName('行政地图_虚拟电厂_福田', store.treeInfo);
  // await __g.infoTree.hide(ids);
  // await __g.cameraTour.stop();
  // await __g.cameraTour.delete('xndc');
  // showVirture.value = false;
  // __g.marker.showByGroupId('virtual-point');
  // __g.marker.showByGroupId('quName');
  // __g.marker.showByGroupId('qu');
  // addHeatLayer();
  showFIlter.value = false;
  if (currentPosition.value === '深圳市') {
    __g.tileLayer.show(showIds[props.activeIndex]);
    __g.marker.showByGroupId('area-point-layer');
    isDrawing.value = false;
  } else if (currentPosition.value.includes('区')) {
    handleDetail();
  }
});

// watch(
//   () => currentDt.value,
//   async () => {
//     if (showVirture.value) return;

//     addHeatLayer();
//   },
//   {
//     deep: true,
//     immediate: true
//   }
// );

onMounted(async () => {
  await init();
});

onBeforeUnmount(async () => {
  clearTimeout(startTimer);
  // closeDarkMode();
  bus.off('map-back');
  bus.off('getVppAdjustTime');
  isInit = false;
  await __g.camera.stopAnimation();
  clearTimeout(timer);
  await __g.cameraTour.stop();
  await __g.cameraTour.delete('xndc');
  await __g?.marker?.deleteByGroupId('area-point-layer');
  await __g.marker.showByGroupId('virtual-point');
  await delete3dt(__g, allHeatIdsList.flat(3));
  await __g.infoTree.hide(virtureTileIds);
});
</script>

<style scoped>
.virture-dialog {
  height: 500px !important;
}
.time-slider-wrapper {
  position: absolute;
  left: 50%;
  bottom: 100px;
  width: 45%;
  transform: translateX(-50%);
}
.tbn-list {
  display: flex;
  flex-flow: row nowrap;
  column-gap: 20px;
}
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
<style lang="less">
.virture-dialog.custom-dialog.el-dialog {
  height: 300px;
  margin-right: 400px;
  background: rgba(4, 19, 43, 0.9);
}
</style>
