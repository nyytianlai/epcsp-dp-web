<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-18 20:40:18
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-09 19:58:42
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
  getImageUrl,
  getImageByCloud,
  quNameCodeInterTrans,
  getMapCenterCoord,
  add3dt,
  delete3dt,
  control3dts
} from '@/global/config/map';
import { pointIsInPolygon, Cartesian2D } from '@/utils/index';
import { useStore } from 'vuex';
import bus from '@/utils/bus';
import { getJdStation } from './api.js';
import { getQuStationWithAlarm } from './api.js';
import { setMoveCarSpeed } from '@/views/station-detail/mapOperate';
interface Props {
  buttomTabCode?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  buttomTabCode: ''
});

const aircityObj = inject('aircityObj');
const __g = aircityObj.value.acApi;
const { useEmitt, player: aircityPlay } = aircityObj.value;
const store = useStore();
const currentPosition = computed(() => store.getters.currentPosition); //所在位置 深圳市 xx区 xx街道 xx站(取值'')
const currentJd = computed(() => store.getters.currentJd);
const currentQu = computed(() => store.getters.currentQu);

const lastJd = computed(() => store.getters.lastJd);
const lastQu = computed(() => store.getters.lastQu);

const currentPositionBak = computed(() => store.getters.currentPositionBak);
const currentHrStationID = computed(() => store.getters.currentHrStationID); //当前点击的高渲染站点id

useEmitt('AIRCITY_EVENT', async (e) => {
  // 编写自己的业务
  console.log('事件监听', e);
  if (e.Id?.includes('区')) {
    let quName = e.Id.split('-')[1];
    if (quName === currentQu.value) {
      return;
    }
    store.commit('CHANGE_LASTQU', currentQu.value);
    store.commit('CHANGE_CURRENTQU', quName);
    store.commit('CHANGE_CURRENTPOSITION', quName);
    __g.polygon.focus('qu-' + currentQu.value, 11000);
    setQuVisibility(false);
    addJdData(quName);
    setTimeout(async () => {
      await __g.settings.setEnableCameraMovingEvent(true);
    }, 2000);
  }
  if (e.Id?.includes('街道')) {
    let jdName = e.Id.split('-')[1];
    // if (jdName === currentPosition.value) {
    //   return;
    // }
    store.commit('CHANGE_LASTJD', currentJd.value);
    store.commit('CHANGE_CURRENTJD', jdName);
    store.commit('CHANGE_CURRENTPOSITION', jdName);
    __g.polygon.focus('jd-' + currentJd.value, 1500);
    // setQuVisibility(false);
    deleteSingleJdData();
    // deleteJdData();
    addStationPoint(e.UserData);
  }
  if (e.Id?.includes('station')) {
    let stationInfo = JSON.parse(e.UserData);
    console.log('stationInfo', stationInfo);

    if (stationInfo.isHr !== 0) {
      __g.marker.focus(e.Id, 100);
      enterStationInfo(stationInfo);
      return;
    }
    //是高渲染站点
    changeStationStyle(e.Id, 'hr', [287, 451], [-143, 451]);

    if (currentHrStationID.value === e.Id) {
      //连续两次点击相同站点 进入高渲染站点
      enterStationInfo(stationInfo);
      __g.marker.hideByGroupId('jdStation');
      addHrStation(stationInfo.stationName, true);
    } else {
      currentHrStationID.value !== ''
        ? changeStationStyle(currentHrStationID.value, 'chargeStation50', [55, 150], [-22.5, 150])
        : '';
    }
    store.commit('CHANGE_CURRENTHRSTATIONID', e.Id);
  }
  if (e.eventtype === 'CameraStopMove' && currentPosition.value !== '') {
    //当前不处于站点内
    const { worldLocation: centerCoord } = await getMapCenterCoord(aircityObj.value);
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
        store.commit('CHANGE_CURRENTPOSITIONBAK', currentPosition.value);
        store.commit('CHANGE_CURRENTJD', cameraJdInfo.JDNAME);
        store.commit('CHANGE_CURRENTPOSITION', cameraJdInfo.JDNAME);
      }
    }
  }
});
const handleQuChange = (quName: string, cameraJdInfo: {}) => {
  store.commit('CHANGE_CURRENTPOSITIONBAK', currentPosition.value);
  if (currentPosition.value.includes('区')) {
    addJdData(quName);
    store.commit('CHANGE_CURRENTPOSITION', quName);
  } else if (currentPosition.value.includes('街道')) {
    addJdData(quName, 'noBar');
    addStationPoint(cameraJdInfo.JDCODE);
    store.commit('CHANGE_CURRENTPOSITION', cameraJdInfo.JDNAME);
    store.commit('CHANGE_CURRENTJD', cameraJdInfo.JDNAME);
  }
  store.commit('CHANGE_CURRENTQU', quName);
};

const enterStationInfo = (stationInfo) => {
  store.commit('CHANGE_CURRENTPOSITIONBAK', currentPosition.value);
  store.commit('CHANGE_CURRENTPOSITION', '');

  store.commit('CHANGE_SHOW_COMPONENT', false);
  store.commit('CHANGE_SHOW_DETAIL', {
    show: true,
    params: {
      operatorId: stationInfo.operatorId,
      stationId: stationInfo.stationId
    }
  });
};

const changeStationStyle = async (id, picName, size, anchors) => {
  await __g.marker.setAnchors(id, anchors);
  await __g.marker.setImagePath(id, getImageByCloud(picName));
  await __g.marker.setImageSize(id, size);
};

const setQuVisibility = async (value: boolean) => {
  // value
  //   ? __g.polygon.show(layerNameQuNameArr('qu'))
  //   : __g.polygon.hide(layerNameQuNameArr('qu'));
  value
    ? await __g.customTag.show(layerNameQuNameArr('rectBar' + props.buttomTabCode))
    : await __g.customTag.hide(layerNameQuNameArr('rectBar' + props.buttomTabCode));
  // value
  //   ? await __g.marker.show(layerNameQuNameArr('quName'))
  //   : await __g.marker.hide(layerNameQuNameArr('quName'));
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
  await __g.customTag.delete(
    ids.map((i) => {
      return `rectBar${props.buttomTabCode}-` + i;
    })
  );
  console.log(`rectBar${props.buttomTabCode}-`, ids);
};
const deleteSingleJdData = async () => {
  let ids = filterJdNameArrByQuName(currentQu.value);
  await __g.customTag.delete(
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
  addHrStation('比亚迪民乐P+R电动汽车充电站', false);
  if (currentPosition.value.includes('区') || currentPosition.value.includes('市')) {
    //返回市
    await resetSz();
  } else if (currentPosition.value.includes('街道')) {
    //返回区
    await resetQu();
  } else if (currentPosition.value === '') {
    //此种情况返回哪一级需根据上一个位置
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
  store.commit('CHANGE_CURRENTPOSITIONBAK', currentPosition.value);
  store.commit('CHANGE_CURRENTPOSITION', currentJd.value);
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
  store.commit('CHANGE_CURRENTPOSITIONBAK', currentPosition.value);
  store.commit('CHANGE_CURRENTPOSITION', currentQu.value);
  __g.polygon.focus('qu-' + currentQu.value, 13000);
  store.commit('CHANGE_LASTJD', currentJd.value);
  store.commit('CHANGE_CURRENTJD', '');
};
//重置到深圳
const resetSz = async (value = true) => {
  await __g.settings.setEnableCameraMovingEvent(false);
  await deleteJdData();
  await __g.marker.deleteByGroupId('jdStation');
  value ? setQuVisibility(true) : '';
  await __g.camera.set(infoObj.szView, 0.2);
  store.commit('CHANGE_CURRENTPOSITION', '深圳市');
  store.commit('CHANGE_CURRENTPOSITIONBAK', '');
  store.commit('CHANGE_CURRENTHRSTATIONID', '');
  store.commit('CHANGE_CURRENTQU', '');
  store.commit('CHANGE_CURRENTJD', '');
};

const addStationPoint = (jdCode: string) => {
  props.buttomTabCode == '' ? addJdStation(jdCode) : addQuStationWithAlarmInfo(jdCode);
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
        coordinateType: 1,
        coordinate: [item.lng, item.lat],
        anchors: [-11.5, 150],
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
const addHrStation = async (stationName: string, isShow: boolean) => {
  await beforeAddOrExitHrStation(isShow);
  if (stationName === '比亚迪民乐P+R电动汽车充电站') {
    let ids = [
      // '7CED6A4A4F00FFA1B7273C9511B55B85', //station
      // 'E4933C614755E6F56D8C209A5B28B8C4',
      // '6EA525CA4FB949D9850E5A933AA5FFCA',
      // 'D398F2D8482A2FCC5BA60F9DE52C6DB9', //车辆充电动画
      // '21BD0867470C8FF5295AED9D635E10A1', //充电中的车
      // 'E7203AA94D657F717982D2A7DC51709D' //车辆充电动画桩
      'D3A3D73B41E03DC60DAFC38D1C1B051F'
    ];
    isShow ? __g.infoTree.show(ids) : __g.tileLayer.hide(ids);
    // await control3dts(__g, ['D3A3D73B41E03DC60DAFC38D1C1B051F'], isShow);
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
  } else if (stationName === '奥特迅电力大厦后广场充电站') {
    let ids = ['D56023684855E6E91E9F0CB4F6D00D59'];
    isShow ? __g.infoTree.show(ids) : __g.tileLayer.hide(ids);
    isShow
      ? __g.camera.set(494480.218672, 2495531.893906, 29.262388, -10.561944, -147.549225, 3)
      : '';
  } else if (stationName === '比亚迪民乐P+R电动汽车充电站') {
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
    height: 800, //3D多边形的高度
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
  addHrStation('比亚迪民乐P+R电动汽车充电站', false);
  addHrStation('奥特迅电力大厦后广场充电站', false);
  await __g.settings.setEnableCameraMovingEvent(false); //取消相机监听事件
  let res = await requestGeojsonData('qu4547');
  quFeatures = res.features;
  addXzqh(quFeatures, 'qu', 'QUNAME', 'QUCODE');
  let res1 = await requestGeojsonData('quName4547');
  addXzqhName(res1.features, 'quName', 'QUNAME', 'QUCODE');
  addWall();
  bus.on('toHr', async (e) => {
    // 传参由回调函数中的形参接受
    console.log('高渲染站点信息2', e);
    store.commit('CHANGE_CURRENTHRSTATIONID', 'station-' + e.stationId);
    store.commit('CHANGE_CURRENTPOSITIONBAK', currentPosition.value);
    store.commit('CHANGE_CURRENTPOSITION', '');
    setQuVisibility(false);
    __g.marker.hideByGroupId('jdStation');
    addHrStation(e.stationName, true);
    // await deleteJdData();
  });
  bus.on('hrBackSz', async () => {
    // 传参由回调函数中的形参接受
    if (currentPositionBak.value === '深圳市') {
      store.commit('CHANGE_CURRENTPOSITION', currentPositionBak.value);
    }
    back();
    bus.emit('resetTab3dt');
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
