<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-18 20:40:18
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-10 11:55:16
 * @FilePath: \epcsp-dp-web\src\components\map-layer\qu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="backBox" v-show="currentPosition !== '深圳市'">
    <img src="./images/back.png" alt="" @click="back" />
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, reactive, computed } from 'vue';
import request from '@sutpc/axios';
import {
  layerNameQuNameArr,
  infoObj,
  quView,
  getImageByCloud,
  quNameCodeInterTrans,
  getMapCenterCoord,
  getTreeLayerIdByName,
  hideAllStation3dt,
  returnStationPointConfig,
  mapRequestCancelId
} from '@/global/config/map';
import { pointIsInPolygon, Cartesian2D } from '@/utils/index';
import bus from '@/utils/bus';
import { getJdStation } from './api.js';
import { getQuStationWithAlarm } from './api.js';
import { setMoveCarSpeed } from '@/views/station-detail/mapOperate';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { useMapStore } from '@/stores/map';

const storeVisible = useVisibleComponentStore();
const store = useMapStore();

const stationType = computed(() => new Set(store.stationType));
// store.changeStationType([1,2,3]);
const buttomTabCode = computed(() => store.buttomTabCode);

interface Props {
  module: number;
}

const props = withDefaults(defineProps<Props>(), {
  module: 0
});

const aircityObj = inject('aircityObj');
const __g = aircityObj.value.acApi;
const { useEmitt, player: aircityPlay } = aircityObj.value;
const currentPosition = computed(() => store.currentPosition); //所在位置 深圳市 xx区 xx街道 xx站(取值'')
const currentJd = computed(() => store.currentJd);
const currentJdCode = computed(() => store.currentJdCode);
const currentQu = computed(() => store.currentQu);
const emits = defineEmits(['addQuBar', 'addOutStation']);
const state = reactive({
  currentSelectStation: {
    stationId: ''
  }
});

const currentPositionBak = computed(() => store.currentPositionBak);
const currentHrStationID = computed(() => store.currentHrStationID); //当前点击的高渲染站点id

useEmitt('AIRCITY_EVENT', async (e) => {
  // 编写自己的业务
  // console.log('事件监听', e);
  if (e.eventtype === 'MarkerCallBack') {
    if (e.Data == 'closeStationHighLight') {
      //关闭 点击非高渲染站点添加的动态圈圈
      __g.radiationPoint.clear();
    }
    if (e.Data.includes('click')) {
      let areaCode = e.Data.split('-')[1];
      if (e.ID?.includes('区')) {
        let quName = e.ID.split('-')[1];
        if (quName === currentQu.value) {
          return;
        }
        __g.polygon.setColor('qu-' + quName, [75 / 255, 222 / 255, 255 / 255, 0.0]);
        store.changeCurrentQu(quName);
        store.changeCurrentPosition(quName);
        __g.camera.set(...quView[currentQu.value]);
        setQuVisibility(false);
        addJdData(quName);
        setTimeout(async () => {
          await __g.settings.setEnableCameraMovingEvent(true);
        }, 2000);
      }
      if (e.ID?.includes('街道')) {
        let jdName = e.ID.split('-')[1];
        store.changeCurrentJd(jdName);
        store.changeCurrentJdCode(areaCode);
        store.changeCurrentPosition(jdName);
        __g.polygon.focus('jd-' + currentJd.value, 1500);
        deleteSingleJdData();
        addStationPoint(areaCode);
      }
    }
  }
  if (e.eventtype === 'LeftMouseButtonClick') {
    if (e.Id?.includes('station-')) {
      let stationInfo = JSON.parse(e.UserData);
      console.log('stationInfo', stationInfo);
      if (stationInfo.stationId === state.currentSelectStation.stationId) {
        return;
      }
      state.currentSelectStation = stationInfo;
      if (stationInfo.isHr !== 0) {
        //普通站点
        highLightNormalStation(stationInfo);
        enterStationInfo(stationInfo);
        return;
      }
      //是高渲染站点
      changeStationStyle(e.Id, 'hr', [311, 499], [-156, 499]);

      if (currentHrStationID.value === e.Id) {
        //连续两次点击相同站点 进入高渲染站点
        enterStationInfo(stationInfo);
        __g.marker.hideByGroupId('jdStation');
        addHrStation(stationInfo.stationId, true);
      } else {
        currentHrStationID.value !== ''
          ? changeStationStyle(currentHrStationID.value, 'chargeStation50', [55, 150], [-22.5, 150])
          : '';
      }
      store.changeCurrentHrStationId(e.Id);
    }
  }

  if (e.eventtype === 'CameraStopMove' && currentPosition.value !== '') {
    //当前不处于站点内
    const { worldLocation: centerCoord } = await getMapCenterCoord(aircityObj.value);
    // addCenterPoint([centerCoord[0], centerCoord[1]])
    let cameraQuName = pointInWhichDistrict([centerCoord[0], centerCoord[1]]);
    // console.log('cameraQuName', cameraQuName);
    let cameraJdInfo = pointInWhichStreet([centerCoord[0], centerCoord[1]], cameraQuName);
    // console.log('cameraJdInfo', cameraJdInfo);
    // console.log('重新请求数据');
    if (cameraQuName && currentQu.value !== cameraQuName) {
      //当前相机位置所在区和当前区不一致
      handleQuChange(cameraQuName, cameraJdInfo);
    } else if (cameraQuName) {
      //当前相机位置所在区和当前区一致
      if (currentPosition.value.includes('街道') && cameraJdInfo.JDNAME !== currentJd.value) {
        addStationPoint(cameraJdInfo.JDCODE);
        store.changeCurrentPositionBak(currentPosition.value);
        store.changeCurrentJd(cameraJdInfo.JDNAME);
        store.changeCurrentJdCode(cameraJdInfo.JDCODE);
        store.changeCurrentPosition(cameraJdInfo.JDNAME);
      }
    }
  }
});

const highLightNormalStation = async (obj) => {
  await hideHighLightNormalStation();
  let o = {
    id: '1',
    userData: obj.stationId,
    coordinate: [obj.lng, obj.lat], //辐射圈坐标位置
    coordinateType: 2, //坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0
    radius: 60, //辐射半径
    rippleNumber: 3, //波纹数量
    color: [255 / 255, 191 / 255, 0 / 255, 1], //颜色
    intensity: 0.5, //亮度
    autoHeight: true //自动判断下方是否有物体
  };
  await __g.radiationPoint.add(o);
  __g.radiationPoint.focus(o.id, 100, 1, [-71.991409, -90.380768, 0]);
};

//隐藏辐射圈以及橙色popup
const hideHighLightNormalStation = async () => {
  const res = await __g.radiationPoint.get('1');
  if (res.resultMessage == 'OK') {
    const id = 'station-' + res.data[0].userData;
    await __g.marker.hidePopupWindow(id);
  }
  await __g.radiationPoint.clear();
};
const handleQuChange = (quName: string, cameraJdInfo: {}) => {
  store.changeCurrentPositionBak(currentPosition.value);
  if (currentPosition.value.includes('区')) {
    addJdData(quName);
    store.changeCurrentPosition(quName);
  } else if (currentPosition.value.includes('街道')) {
    addJdData(quName, 'noBar');
    addStationPoint(cameraJdInfo.JDCODE);
    store.changeCurrentPosition(cameraJdInfo.JDNAME);
    store.changeCurrentJd(cameraJdInfo.JDNAME);
    store.changeCurrentJdCode(cameraJdInfo.JDCODE);
  }
  store.changeCurrentQu(quName);
};

const enterStationInfo = (stationInfo) => {
  if (currentPosition.value !== '') {
    store.changeCurrentPositionBak(currentPosition.value);
    store.changeCurrentPosition('');
  }
  storeVisible.changeShowComponent(false);
  storeVisible.changeShowDetail({
    show: true,
    params: {
      operatorId: stationInfo.operatorId,
      stationId: stationInfo.stationId,
      isHr: stationInfo.isHr,
      equipmentId: stationInfo.eid
    }
  });
};

const changeStationStyle = async (id, picName, size, anchors) => {
  await __g.marker.setAnchors(id, anchors);
  await __g.marker.setImagePath(id, getImageByCloud(picName));
  await __g.marker.setImageSize(id, size);
};

const setQuVisibility = async (value: boolean) => {
  if (value) {
    if (props.module == 1 && buttomTabCode.value == 2) {
      //热力图
      __g.heatmap.show('heatmap1');
      return;
    }
    if (props.module !== 4) {
      //模块四是安全监管 柱状图因为接口问题 未删除 只是隐藏了
      emits('addQuBar');
    } else {
      await __g.marker.show(layerNameQuNameArr('rectBar' + buttomTabCode.value));
      await __g.marker.showAllPopupWindow();
    }
  } else {
    if (props.module == 1 && buttomTabCode.value == 2) {
      __g.heatmap.hide('heatmap1');
      return;
    }
    props.module !== 4
      ? await __g.marker.delete(layerNameQuNameArr('rectBar' + buttomTabCode.value))
      : await __g.marker.hide(layerNameQuNameArr('rectBar' + buttomTabCode.value));
  }
};
const deleteJdData = async () => {
  let ids = filterJdNameArrByQuName(currentQu.value);
  await __g.polygon.delete(
    ids.map((i) => {
      return 'jd-' + i;
    })
  );
  await __g.marker.delete(
    ids.map((i) => {
      return 'jdName-' + i;
    })
  );
  await __g.marker.delete(
    ids.map((i) => {
      return `rectBar${buttomTabCode.value}-` + i;
    })
  );
  console.log(`rectBar${buttomTabCode.value}-`, ids);
};
const deleteSingleJdData = async () => {
  let ids = filterJdNameArrByQuName(currentQu.value);
  await __g.marker.delete(
    ids.map((i) => {
      return `rectBar${buttomTabCode.value}-` + i;
    })
  );
  await __g.marker.deleteByGroupId('jdStation');
};
const isShowJdPolygon = async (isShow: Boolean) => {
  let ids = filterJdNameArrByQuName(currentQu.value);
  let o = isShow ? 'show' : 'hide';
  await __g.polygon[o](
    ids.map((i) => {
      return 'jd-' + i;
    })
  );
};

const back = async () => {
  console.log('当前位置', currentPosition.value, '当前位置备份', currentPositionBak.value);
  console.log('currentJd.value', currentJd.value);
  state.currentSelectStation = {
    stationId: ''
  };
  if (currentPosition.value.includes('区') || currentPosition.value.includes('市')) {
    //返回市
    await resetSz();
  } else if (currentPosition.value.includes('街道')) {
    //返回区
    await resetQu();
  } else if (currentPosition.value === '') {
    //此种情况返回哪一级需根据上一个位置
    hideHighLightNormalStation();
    hideAllStation3dt(__g, store.treeInfo);
    beforeAddOrExitHrStation(false);
    if (currentPositionBak.value.includes('街道')) {
      await resetJd();
    } else if (currentPositionBak.value.includes('区')) {
      await resetQu();
    } else if (currentPositionBak.value.includes('市')) {
      await resetSz();
    }
  }
};

//重置到街道
const resetJd = async () => {
  __g.polygon.focus('jd-' + currentJd.value, 1500);
  __g.marker.showByGroupId('jdStation');
  store.changeCurrentPositionBak(currentPosition.value);
  store.changeCurrentPosition(currentJd.value);
  console.log('currentHrStationID.value', currentHrStationID.value);
  // if (currentHrStationID.value !== '') {
  //   __g.marker.focus(currentHrStationID.value, 200, 0.2);
  // } else {
  // }
};
//重置到区
const resetQu = async () => {
  await __g.marker.deleteByGroupId('jdStation');
  await __g.camera.set(...quView[currentQu.value]);
  await addJdData(currentQu.value);
  store.changeCurrentPositionBak(currentPosition.value);
  store.changeCurrentPosition(currentQu.value);
  store.changeCurrentJd('');
  store.changeCurrentJdCode('');
};
//重置到深圳
const resetSz = async (value = true) => {
  await __g.settings.setEnableCameraMovingEvent(false);
  await __g.camera.set(infoObj.szView, 0.2);
  await deleteJdData();
  await __g.marker.deleteByGroupId('jdStation');
  value ? await setQuVisibility(true) : '';
  store.changeCurrentPosition('深圳市');
  store.changeCurrentPositionBak('');
  store.changeCurrentHrStationId('');
  store.changeCurrentQu('');
  store.changeCurrentJd('');
  store.changeCurrentJdCode('');
};

const addStationPoint = (jdCode: string) => {
  if (props.module > 10) {
    emits('addOutStation', props.module, jdCode);
  } else {
    props.module !== 3 ? addJdStation(jdCode) : addQuStationWithAlarmInfo(jdCode);
  }
};

//添加区的点 isHr 0-是高渲染站点；1-否
const addJdStation = async (jdCode: string) => {
  await __g.marker.deleteByGroupId('jdStation');
  const { data: res } = await getJdStation({
    chargeType: Array.from(stationType.value),
    equipmentType: buttomTabCode.value,
    streetId: jdCode
  });
  let pointArr = [];
  console.log('station接口', res);

  res.forEach((item, index) => {
    let xoffset = item.stationName.length * 12;
    item['xoffset'] = xoffset;
    item['stationType'] = 50;
    let o1 = returnStationPointConfig(item);
    if (item.isHr == 0) {
      let o = {
        id: 'station-' + index + '-' + item.isHr,
        groupId: 'jdStation',
        userData: item.isHr + '',
        coordinateType: 2,
        coordinate: [item.lng, item.lat],
        anchors: [-11.5, 200],
        imageSize: [33, 36],
        range: [1, 150000],
        imagePath: getImageByCloud('1'),
        displayMode: 2,
        autoHeight: true
      };
      pointArr.push(o);
    }
    pointArr.push(o1);
  });
  await __g.marker.add(pointArr, null);
};

//安全监管模块撒点
let trans = {
  1: 50,
  2: 255,
  3: 5
};
const addQuStationWithAlarmInfo = async (jdCode: string) => {
  await __g.marker.deleteByGroupId('jdStation');
  let params = {
    apiType: buttomTabCode.value,
    areaCode: quNameCodeInterTrans('name', currentQu.value),
    stationStreet: jdCode
  };
  if (buttomTabCode.value == 1) {
    params['alarmLevel'] = Array.from(stationType.value);
  } else {
    params['statusType'] = Array.from(stationType.value).map((item: Number) => {
      return trans[item + ''];
    });
  }
  console.log('params', Array.from(stationType.value), params);

  const { data: res } = await getQuStationWithAlarm(params);
  let pointArr = [];
  res.forEach((item, index) => {
    let xoffset = item.stationName.length * 12;
    item['xoffset'] = xoffset;
    item['stationType'] = item.status;
    item.stationName = item.stationName + '(' + item.warningCount + ')';
    let o1 = returnStationPointConfig(item);
    if (item.isHr == 0) {
      let o = {
        id: 'station-' + index + '-' + item.isHr,
        groupId: 'jdStation',
        userData: item.isHr + '',
        coordinateType: 2,
        coordinate: [item.lng, item.lat],
        anchors: [-11.5, 210],
        imageSize: [33, 36],
        range: [1, 150000],
        imagePath: getImageByCloud('1'),
        displayMode: 2,
        autoHeight: true
      };
      pointArr.push(o);
    }
    pointArr.push(o1);
  });
  //批量添加polygon
  await __g.marker.add(pointArr, null);
};

const beforeAddOrExitHrStation = async (isShow: boolean) => {
  !isShow ? __g.polygon.show(layerNameQuNameArr('qu')) : __g.polygon.hide(layerNameQuNameArr('qu'));
  isShowJdPolygon(!isShow);
  !isShow ? __g.polygon3d.show('wall') : __g.polygon3d.hide('wall');
  if (currentPositionBak.value === '深圳市') {
  } else if (currentPositionBak.value.includes('区')) {
    isShow ? deleteJdData() : '';
  } else if (currentPositionBak.value.includes('街道')) {
    isShow ? __g.marker.hideByGroupId('jdStation') : '';
  }
};
//添加站点
const addHrStation = async (stationId: string, isShow: boolean, fly = true) => {
  await beforeAddOrExitHrStation(isShow);
  let ids = getTreeLayerIdByName(stationId + '默认展示', store.treeInfo);
  isShow ? await __g.infoTree.show(ids) : __g.infoTree.hide(ids);
  if (stationId === '118') {
    //比亚迪民乐P+R电动汽车充电站
    //站内移动的车
    // isShow ? add3dt(__g, 'ML_VehicleSpline') : delete3dt(__g, ['ML_VehicleSpline']);
    // setMoveCarSpeed(__g, 0.2); //默认全程显示但是关不掉的3dt
    isShow && fly
      ? __g.camera.set(504820.001094, 2499705.067188, 213.286289, -44.205788, 146.805252, 3)
      : '';
    isShow ? '' : __g.marker.deleteByGroupId('stationFacilitiesLabel');
    isShow ? '' : __g.marker.deleteByGroupId('stationChargeIcon');
  } else if (stationId === '440202003') {
    //奥特迅电力大厦后广场充电站
    isShow
      ? __g.camera.set(494480.218672, 2495531.893906, 29.262388, -10.561944, -147.549225, 3)
      : '';
  } else if (stationId === '-3') {
    //红荔西5G示范站
    isShow
      ? __g.camera.set(502294.813438, 2494164.55125, 22.133049, -10.760314, -68.628166, 3)
      : '';
  } else if (stationId === '4403070124') {
    //深圳国际低碳城光储充放一体化示范站
    // isShow ? __g.camera.set(529405.624, 2520340.663, 79.013, -19.599998, -18.199905, 3) : '';
    isShow ? __g.camera.set(529469.266797, 2520288.9175, 58.586924, -24.291014, -77.653168, 3) : '';
  } else if (stationId === '144') {
    //充电有道欢乐谷快充站
    isShow ? __g.camera.set(497235.795, 2494003.925, 63.319, -30.799998, -123.799998, 3) : '';
  } else if (stationId === '-2') {
    //莲花村
    isShow ? __g.camera.set(506434.815625, 2494959.59, 74.281172, -65.807327, 179.735031, 3) : '';
  } else if (stationId === '-1') {
    //宝清储能站
    isShow
      ? await __g.camera.set(529799.333953, 2510087.387759, 148.986729, -33.399971, 89.799957, 3)
      : '';
  }
};

let quFeatures = [];
let jdFeatures = [];
let jdNamePositions = [];

const requestGeojsonData = async (fileName: string) => {
  const res = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/${fileName}.geojson`
  });
  return res;
};

const addXzqh = async (res, type: string, idName: string, userDataName: string) => {
  let polygonArr = [];
  res.forEach((item, index) => {
    let oPolygon = {
      id: type + '-' + item.properties[idName], //polygon唯一标识id
      groupId: type == 'qu' ? type : item.properties.QUNAME,
      coordinates: item.geometry.coordinates[0], //构成polygon的坐标点数组
      range: [1, 100000], //可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
      userData: item.properties[userDataName],
      color: [0, 0, 0.4, 0], //多边形的填充颜色
      frameColor: '#8ae0fa', //边框颜色
      frameThickness: type == 'qu' ? 100 : 50, //边框厚度
      intensity: 1, //亮度
      style: 0, //单色 请参照API开发文档选取枚举
      depthTest: false //是否做深度检测 开启后会被地形高度遮挡
    };
    polygonArr.push(oPolygon);
  });
  //批量添加polygon
  __g.polygon.add(polygonArr, null);
};
const addXzqhName = async (res, type: string, idName: string, userDataName: string) => {
  let pointArr = [];
  res.forEach((item, index) => {
    let o1 = {
      id: type + '-' + item.properties[idName],
      groupId: type == 'quName' ? type : item.properties.QUNAME,
      userData: item.properties[userDataName],
      coordinate: item.geometry.coordinates, //坐标位置
      anchors: [-11, 19], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [22, 19], //图片的尺寸
      range: [1, 150000], //可视范围
      imagePath: getImageByCloud('regionName'),
      text: item.properties[idName], //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 150000], //文本可视范围[近裁距离, 远裁距离]
      textOffset: type == 'qu' ? [-42, -15] : [-52, -15], // 文本偏移
      textBackgroundColor: [1, 1, 1, 0], //文本背景颜色
      fontSize: 14, //字体大小
      fontOutlineSize: 1, //字体轮廓线大小
      fontColor: '#FFFFFF', //字体颜色
      fontOutlineColor: '#1b4863', //字体轮廓线颜色
      displayMode: 2
    };
    pointArr.push(o1);
  });
  //批量添加polygon
  __g.marker.add(pointArr, null);
};
const addWall = async () => {
  let res = await requestGeojsonData('outline4547');
  let opolygon = {
    id: 'wall', //3DPolygon唯一标识id
    coordinates: res.features[0].geometry.coordinates, //构成3DPolygon的坐标点数组
    color: '#5bb7d2', //3DPolygon颜色
    height: -800, //3D多边形的高度
    intensity: 1.0, //亮度
    style: 1, //3DPolygon的样式 请参照API开发文档选取枚举
    generateTop: false, //是否生成顶面
    generateSide: true, //是否生成侧面
    generateBottom: false //是否生成底面
  };

  //批量添加3DPolygon
  __g.polygon3d.add(opolygon, null);
};

const pointInWhichDistrict = (point: Cartesian2D) => {
  let quName: string;
  for (let index = 0; index < quFeatures.length; index++) {
    const element = quFeatures[index];
    if (pointIsInPolygon(point, element.geometry.coordinates[0])) {
      quName = element.properties.QUNAME;
    }
  }
  return quName;
};
const pointInWhichStreet = (point: Cartesian2D, quName: string) => {
  let jdInfo;
  let jdCollects = jdFeatures.filter((item) => {
    return item.properties.QUNAME === quName;
  });
  for (let index = 0; index < jdCollects.length; index++) {
    const element = jdCollects[index];
    if (pointIsInPolygon(point, element.geometry.coordinates)) {
      jdInfo = element.properties;
    }
  }
  return jdInfo;
};

const addJdData = async (quName: string, isAddBar?: '' | 'noBar') => {
  await deleteJdData();
  let res = await filterJdFeaturesByQuName(quName);
  addXzqh(res, 'jd', 'JDNAME', 'JDCODE');
  let res1 = await filterJdNameByQuName(quName);
  addXzqhName(res1, 'jdName', 'JDNAME', 'JDCODE');
  let quCode = quNameCodeInterTrans('name', quName);
  if (isAddBar !== 'noBar') {
    bus.emit('addBar', {
      type: 'jd',
      quCode: quCode
    });
  }
};

//根据区的名称过滤出下面的街道
const filterJdFeaturesByQuName = async (quName: string) => {
  if (!jdFeatures.length) {
    let res = await requestGeojsonData('jd4547');
    jdFeatures = res.features;
  }
  return jdFeatures.filter((item) => {
    return item.properties.QUNAME === quName;
  });
};

//根据区的名称过滤出下面的街道名称点位
const filterJdNameByQuName = async (quName: string) => {
  if (!jdNamePositions.length) {
    let res = await requestGeojsonData('jdName4547');
    jdNamePositions = res.features;
  }
  return jdNamePositions.filter((item) => {
    return item.properties.QUNAME === quName;
  });
};
//过滤出所有的街道名称
const filterJdNameArrByQuName = (quName: string) => {
  return jdFeatures
    ?.filter((item) => {
      return item.properties.QUNAME === quName;
    })
    .map((i) => {
      return i.properties.JDNAME;
    });
};

defineExpose({ pointInWhichDistrict, resetSz, deleteJdData, addStationPoint,highLightNormalStation,enterStationInfo });
onMounted(async () => {
  __g.reset();
  bus.on('toHr', async (e) => {
    // 传参由回调函数中的形参接受
    request.cancel(mapRequestCancelId);
    console.log('高渲染站点信息2', e);
    store.changeCurrentHrStationId('station-' + e.stationId);
    store.changeCurrentPositionBak(currentPosition.value);
    store.changeCurrentPosition('');
    setQuVisibility(false);
    __g.marker.hideByGroupId('jdStation');
    addHrStation(e.stationId, true, e.isFly);
  });
  hideAllStation3dt(__g, store.treeInfo);
  await __g.settings.setEnableCameraMovingEvent(false); //取消相机监听事件
  let res = await requestGeojsonData('qu4547');
  quFeatures = res.features;
  addXzqh(quFeatures, 'qu', 'QUNAME', 'QUCODE');
  let res1 = await requestGeojsonData('quName4547');
  addXzqhName(res1.features, 'quName', 'QUNAME', 'QUCODE');
  addWall();
  // debugger
  bus.on('hrBackSz', async () => {
    // 传参由回调函数中的形参接受
    back();
  });
  bus.on(
    'searchEnterStation',
    async (e: {
      isHr: 0 | 1;
      operatorId: string;
      stationId: string;
      lng: number;
      lat: number;
      isFly: boolean;
      [key: string]: any;
    }) => {
      if (e.isHr) {
        console.log('showPopupWindow', e);
        setQuVisibility(false);
        enterStationInfo(e);
        __g.marker.showPopupWindow('station-' + e.stationId);
        highLightNormalStation({ lng: e.lng, lat: e.lat });
      } else {
        bus.emit('toHr', e);
      }
    }
  );
});

onBeforeUnmount(async () => {
  bus.off('toHr');
  bus.off('hrBackSz');
  bus.off('searchEnterStation');
  await __g.reset();
});
</script>
<style lang="less" scoped>
.backBox {
  position: absolute;
  height: 19.5px;
  left: 86px;
  top: 75px;
  display: flex;
  background: rgba(4, 22, 43, 0.4);
  color: #ffffff;
  z-index: 20;
  cursor: pointer;

  img {
    height: 19.5px;
    border-radius: 1px;
    cursor: pointer;
  }

  .quName {
    font-size: 16px;
    line-height: 22px;
    // background: rgba(4, 22, 43, 0.5);
    // border: 1px solid rgba(148, 148, 148, 0.3);
    padding: 7px 16px;
  }
}
</style>
