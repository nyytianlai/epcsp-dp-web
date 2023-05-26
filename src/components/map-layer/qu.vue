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
    <div class="quName" v-show="currentPosition !== ''">{{ currentQu + ' - ' + currentJd }}</div>
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, ref, computed } from 'vue';
import request from '@sutpc/axios';
import {
  layerNameQuNameArr,
  infoObj,
  quView,
  getImageUrl,
  getImageByCloud,
  quNameCodeInterTrans,
  getMapCenterCoord,
  add3dt,
  delete3dt,
  control3dts,
  getTreeLayerIdByName,
  hideAllStation3dt
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
interface Props {
  buttomTabCode?: number | string;
  module: number;
}

const props = withDefaults(defineProps<Props>(), {
  buttomTabCode: '',
  module: 0
});

const aircityObj = inject('aircityObj');
const __g = aircityObj.value.acApi;
const { useEmitt, player: aircityPlay } = aircityObj.value;
const currentPosition = computed(() => store.currentPosition); //所在位置 深圳市 xx区 xx街道 xx站(取值'')
const currentJd = computed(() => store.currentJd);
const currentQu = computed(() => store.currentQu);

const lastJd = computed(() => store.lastJd);
const lastQu = computed(() => store.lastQu);

const currentPositionBak = computed(() => store.currentPositionBak);
const currentHrStationID = computed(() => store.currentHrStationID); //当前点击的高渲染站点id

useEmitt('AIRCITY_EVENT', async (e) => {
  // 编写自己的业务
  console.log('事件监听', e);
  if (e.eventtype === 'MarkerCallBack' && e.Data.includes('click')) {
    let areaCode = e.Data.split('-')[1];
    if (e.ID?.includes('区')) {
      let quName = e.ID.split('-')[1];
      if (quName === currentQu.value) {
        return;
      }
      store.changeLastQu(currentQu.value);
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
      store.changeLastJd(currentJd.value);
      store.changeCurrentJd(jdName);
      store.changeCurrentPosition(jdName);
      __g.polygon.focus('jd-' + currentJd.value, 1500);
      deleteSingleJdData();
      addStationPoint(areaCode);
    }
  }
  if (e.eventtype === 'LeftMouseButtonClick') {
    if (e.Id?.includes('station')) {
      let stationInfo = JSON.parse(e.UserData);
      console.log('stationInfo', stationInfo);

      if (stationInfo.isHr !== 0) {
        //普通站点
        __g.marker.focus(e.Id, 100);
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
        store.changeCurrentPosition(cameraJdInfo.JDNAME);
      }
    }
  }
  if (e.eventtype === 'MouseHovered' && (e.Id?.includes('区') || e.Id?.includes('街道'))) {
  }
});

const addCenterPoint = async (point) => {
  __g.marker.clear();
  //支持经纬度坐标和普通投影坐标两种类型
  let o1 = {
    id: 'm1',
    groupId: 'markerAdd',
    coordinate: point, //坐标位置
    coordinateType: 0, //默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
    anchors: [-25, 50], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [50, 50], //图片的尺寸
    hoverImageSize: [50, 50], //鼠标悬停时显示的图片尺寸
    range: [1, 100000], //可视范围
    imagePath: `${import.meta.env.VITE_FD_URL}` + '/samples/images/tag.png', //显示图片路径
    hoverImagePath: `${import.meta.env.VITE_FD_URL}` + '/samples/images/hilightarea.png', // 鼠标悬停时显示的图片路径
    fixedSize: true, //图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false

    text: '北京银行', //显示的文字
    useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
    textRange: [1, 1000], //文本可视范围[近裁距离, 远裁距离]
    textOffset: [0, 0], // 文本偏移
    textBackgroundColor: '#389a4c', //文本背景颜色
    fontSize: 24, //字体大小
    fontOutlineSize: 1, //字体轮廓线大小
    fontColor: '#ffffff', //字体颜色
    fontOutlineColor: '#1f1f1f', //字体轮廓线颜色

    showLine: true, //标注点下方是否显示垂直牵引线
    lineSize: [2, 100], //垂直牵引线宽度和高度[width, height]
    lineColor: '#dc2123', //垂直牵引线颜色
    lineOffset: [0, 0], //垂直牵引线偏移

    autoHidePopupWindow: true, //失去焦点后是否自动关闭弹出窗口
    autoHeight: false, // 自动判断下方是否有物体
    displayMode: 2, //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式
    clusterByImage: true, // 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
    priority: 0, //避让优先级
    occlusionCull: false //是否参与遮挡剔除
  };

  let markerArr = [];
  markerArr.push(o1);
  //海量poi添加请使用批量添加 提供效率
  await __g.marker.add(markerArr);
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
      isHr: stationInfo.isHr
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
    await __g.marker.show(layerNameQuNameArr('rectBar' + props.buttomTabCode));
    await __g.marker.showAllPopupWindow();
  } else {
    await __g.marker.hide(layerNameQuNameArr('rectBar' + props.buttomTabCode));
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
      return `rectBar${props.buttomTabCode}-` + i;
    })
  );
  console.log(`rectBar${props.buttomTabCode}-`, ids);
};
const deleteSingleJdData = async () => {
  let ids = filterJdNameArrByQuName(currentQu.value);
  await __g.marker.delete(
    ids.map((i) => {
      return `rectBar${props.buttomTabCode}-` + i;
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
  if (currentPosition.value.includes('区') || currentPosition.value.includes('市')) {
    //返回市
    await resetSz();
  } else if (currentPosition.value.includes('街道')) {
    //返回区
    await resetQu();
  } else if (currentPosition.value === '') {
    //此种情况返回哪一级需根据上一个位置
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
  __g.marker.showByGroupId('jdStation');
  store.changeCurrentPositionBak(currentPosition.value);
  store.changeCurrentPosition(currentJd.value);
  console.log('currentHrStationID.value', currentHrStationID.value);
  // if (currentHrStationID.value !== '') {
  //   __g.marker.focus(currentHrStationID.value, 200, 0.2);
  // } else {
  __g.polygon.focus('jd-' + currentJd.value, 1500);
  // }
};
//重置到区
const resetQu = async () => {
  await __g.marker.deleteByGroupId('jdStation');
  await addJdData(currentQu.value);
  store.changeCurrentPositionBak(currentPosition.value);
  store.changeCurrentPosition(currentQu.value);
  __g.camera.set(...quView[currentQu.value]);
  store.changeLastJd(currentJd.value);
  store.changeCurrentJd('');
};
//重置到深圳
const resetSz = async (value = true) => {
  await __g.settings.setEnableCameraMovingEvent(false);
  await deleteJdData();
  await __g.marker.deleteByGroupId('jdStation');
  value ? await setQuVisibility(true) : '';
  await __g.camera.set(infoObj.szView, 0.2);
  store.changeCurrentPosition('深圳市');
  store.changeCurrentPositionBak('');
  store.changeCurrentHrStationId('');
  store.changeCurrentQu('');
  store.changeCurrentJd('');
};

const addStationPoint = (jdCode: string) => {
  props.module !== 3 ? addJdStation(jdCode) : addQuStationWithAlarmInfo(jdCode);
};

//添加区的点 isHr 0-是高渲染站点；1-否
const addJdStation = async (jdCode: string) => {
  await __g.marker.deleteByGroupId('jdStation');
  const { data: res } = await getJdStation(jdCode);
  let pointArr = [];
  console.log('station接口', res);

  res.forEach((item, index) => {
    let xoffset = item.stationName.length * 12;
    let o1 = {
      id: 'station-' + item.stationId,
      groupId: 'jdStation',
      userData: JSON.stringify(item),
      coordinateType: 2,
      coordinate: [item.lng, item.lat], //坐标位置
      anchors: [-22.5, 150], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [55, 150], //图片的尺寸
      range: [1, 150000], //可视范围
      imagePath: getImageByCloud('chargeStation50'),
      text: item.stationName, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 1500], //文本可视范围[近裁距离, 远裁距离]
      textOffset: [-20 - xoffset, -85], // 文本偏移
      textBackgroundColor: [0 / 255, 46 / 255, 66 / 255, 0.8], //文本背景颜色
      fontSize: 16, //字体大小
      fontOutlineSize: 1, //字体轮廓线大小
      fontColor: '#FFFFFF', //字体颜色
      // fontOutlineColor: '#1b4863', //字体轮廓线颜色
      displayMode: 2,
      autoDisplayModeSwitchFirstRatio: 0.5,
      autoDisplayModeSwitchSecondRatio: 0.5,
      // displayMode: 4,
      // autoDisplayModeSwitchFirstRatio: 0.5,
      // autoDisplayModeSwitchSecondRatio: 0.5,
      autoHeight: true
    };
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
  //批量添加polygon
  await __g.marker.add(pointArr, null);
};

//安全监管模块撒点
const addQuStationWithAlarmInfo = async (jdCode: string) => {
  await __g.marker.deleteByGroupId('jdStation');
  const { data: res } = await getQuStationWithAlarm(
    quNameCodeInterTrans('name', currentQu.value),
    jdCode
  );
  let pointArr = [];
  res.forEach((item, index) => {
    let xoffset = item.stationName.length * 12;
    let text = item.stationName + '(' + item.warningCount + ')';
    let o1 = {
      id: 'station-' + item.stationId,
      groupId: 'jdStation',
      userData: JSON.stringify(item),
      coordinateType: 2,
      coordinate: [item.lng, item.lat], //坐标位置
      anchors: [-22.5, 150], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [55, 150], //图片的尺寸
      range: [1, 150000], //可视范围
      imagePath: getImageByCloud('chargeStation' + item.status),
      text: text, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 1500], //文本可视范围[近裁距离, 远裁距离]
      textOffset: [-20 - xoffset, -85], // 文本偏移
      textBackgroundColor: [0 / 255, 46 / 255, 66 / 255, 0.8], //文本背景颜色
      fontSize: 16, //字体大小
      fontOutlineSize: 1, //字体轮廓线大小
      fontColor: '#FFFFFF', //字体颜色
      // fontOutlineColor: '#1b4863', //字体轮廓线颜色
      displayMode: 2,
      autoDisplayModeSwitchFirstRatio: 0.5,
      autoDisplayModeSwitchSecondRatio: 0.5,
      // displayMode: 4,
      // autoDisplayModeSwitchFirstRatio: 0.5,
      // autoDisplayModeSwitchSecondRatio: 0.5,
      autoHeight: true
    };
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
const addHrStation = async (stationId: string, isShow: boolean) => {
  console.log(1111111, stationId, isShow);

  await beforeAddOrExitHrStation(isShow);
  let ids = getTreeLayerIdByName(stationId + '默认展示', store.treeInfo);
  isShow ? __g.infoTree.show(ids) : __g.infoTree.hide(ids);
  if (stationId === '118') {
    //比亚迪民乐P+R电动汽车充电站
    isShow ? add3dt(__g, 'ML_VehicleSpline') : delete3dt(__g, ['ML_VehicleSpline']);
    setMoveCarSpeed(__g, 0.2); //默认全程显示但是关不掉的3dt
    isShow
      ? __g.camera.set(
          504944.50832031254,
          2499761.401875,
          388.7284765625,
          -39.981967,
          147.698425,
          3
        )
      : '';
    isShow ? '' : __g.marker.deleteByGroupId('stationFacilitiesLabel');
    isShow ? '' : __g.marker.deleteByGroupId('stationChargeIcon');
  } else if (stationId === '440202003') {
    //奥特迅电力大厦后广场充电站
    isShow
      ? __g.camera.set(494480.218672, 2495531.893906, 29.262388, -10.561944, -147.549225, 3)
      : '';
  } else if (stationId === '20') {
    //红荔西5G示范站
    __g.infoTree.focus('FF75D7BF4BBD3C2CC3C30BA362A7A6DA');
  } else if (stationId === '4403070124') {
    //深圳国际低碳城光储充放一体化示范站
    __g.infoTree.focus('506123D84C2F3ED94B67EFB36FB794D1');
  } else if (stationId === '144') {
    //充电有道欢乐谷快充站
    __g.infoTree.focus('AFCEFF9249C56F2CB113B5A6A9FCFFE3');
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

defineExpose({ pointInWhichDistrict, resetSz, deleteJdData });
onMounted(async () => {
  await __g.reset();
  hideAllStation3dt(__g, store.treeInfo);
  await __g.settings.setEnableCameraMovingEvent(false); //取消相机监听事件
  // await __g.settings.setMousePickMask(0);
  let res = await requestGeojsonData('qu4547');
  quFeatures = res.features;
  addXzqh(quFeatures, 'qu', 'QUNAME', 'QUCODE');
  let res1 = await requestGeojsonData('quName4547');
  addXzqhName(res1.features, 'quName', 'QUNAME', 'QUCODE');
  addWall();
  bus.on('toHr', async (e) => {
    // 传参由回调函数中的形参接受
    console.log('高渲染站点信息2', e);
    store.changeCurrentHrStationId('station-' + e.stationId);
    store.changeCurrentPositionBak(currentPosition.value);
    store.changeCurrentPosition('');
    setQuVisibility(false);
    __g.marker.hideByGroupId('jdStation');
    addHrStation(e.stationId, true);
  });
  bus.on('hrBackSz', async () => {
    // 传参由回调函数中的形参接受
    back();
    // bus.emit('resetTab3dt');
  });
});

onBeforeUnmount(async () => {
  bus.off('toHr');
  bus.off('hrBackSz');
  await __g.reset();
});
</script>
<style lang="less" scoped>
.backBox {
  position: absolute;
  height: 36px;
  left: 86px;
  top: 68px;
  display: flex;
  background: rgba(4, 22, 43, 0.4);
  border: 1px solid rgba(148, 148, 148, 0.3);
  color: #ffffff;
  z-index: 20;
  cursor: pointer;

  img {
    width: 36px;
    height: 36px;
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
