<template>
  <div class="backBox" v-show="currentPosition !== '深圳市'">
    <img src="@/assets/images/map/back.png" alt="" @click="back" />
    <div class="quName" v-show="currentPosition !== ''">{{ currentPosition }}</div>
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
  getMapCenterCoord
} from '@/global/config/map';
import { pointIsInPolygon, Cartesian2D } from '@/utils/index';
import { useStore } from 'vuex';
import bus from '@/utils/bus';
import { getQuStation } from '@/api/deviceManage';
import { getQuStationWithAlarm } from '@/api/supervision';

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
const currentPosition = computed(() => store.getters.currentPosition); //所在位置 深圳市 xx区 xx站(取值'')
const currentPositionBak = computed(() => store.getters.currentPositionBak);
const currentHrStationID = computed(() => store.getters.currentHrStationID); //当前点击的高渲染站点id

useEmitt('AIRCITY_EVENT', async (e) => {
  // 编写自己的业务
  console.log('事件监听', e);
  if (e.Id?.includes('区')) {
    if (e.Id.split('-')[1] === currentPosition.value) {
      return;
    }

    store.commit('CHANGE_CURRENTPOSITION', e.Id.split('-')[1]);
    __g.polygon.focus('qu-' + currentPosition.value, 13000);
    setQuVisibility(false);
    addStationPoint(e.UserData);
    addQuStationWithAlarmInfo;
    setTimeout(async () => {
      await __g.settings.setEnableCameraMovingEvent(true);
    }, 2000);
  }
  if (e.Id?.includes('station')) {
    let stationInfo = JSON.parse(e.UserData);
    console.log('stationInfo', stationInfo);

    if (stationInfo.isHr !== 0) {
      return;
    }
    //是高渲染站点
    changeStationStyle(e.Id, 'hr', [287, 451], [-143, 451]);

    if (currentHrStationID.value === e.Id) {
      //连续两次点击相同站点 进入高渲染站点
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
      __g.marker.hideByGroupId('quStation');
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
    console.log('cameraQuName', cameraQuName);
    if (cameraQuName && currentPosition.value !== cameraQuName) {
      //当前相机位置所在区和当前区不一致
      console.log('重新请求数据');
      store.commit('CHANGE_CURRENTPOSITION', cameraQuName);
      let cameraQuCode = quNameCodeInterTrans('name', cameraQuName);
      cameraQuCode && addStationPoint(cameraQuCode);
    }
  }
});

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
  value
    ? await __g.marker.show(layerNameQuNameArr('quName'))
    : await __g.marker.hide(layerNameQuNameArr('quName'));
};

const back = async () => {
  console.log(
    'currentPosition.value',
    currentPosition.value,
    'currentPositionBak',
    currentPositionBak.value
  );
  // __g.tileLayer.delete('1');
  addHrStation('比亚迪民乐P+R电动汽车充电站', false);
  if (currentPosition.value.includes('区') || currentPosition.value.includes('市')) {
    //返回市
    resetSz();
  } else if (currentPosition.value === '') {
    //返回区
    __g.marker.showByGroupId('quStation');
    store.commit('CHANGE_CURRENTPOSITION', currentPositionBak.value);
    __g.marker.focus(currentHrStationID.value, 200, 0.2);
  }
};

//重置到深圳
const resetSz = async (value) => {
  store.commit('CHANGE_CURRENTPOSITION', '深圳市');
  store.commit('CHANGE_CURRENTPOSITIONBAK', '');
  store.commit('CHANGE_CURRENTHRSTATIONID', '');
  await __g.marker.deleteByGroupId('quStation');
  value ? '' : setQuVisibility(true);
  await __g.camera.set(infoObj.szView, 0.2);
  await __g.settings.setEnableCameraMovingEvent(false);
};

const addStationPoint = (quCode: string) => {
  props.buttomTabCode == '' ? addQuStation(quCode) : addQuStationWithAlarmInfo(quCode);
};

//添加区的点 isHr 0-是高渲染站点；1-否
const addQuStation = async (quCode: string) => {
  await __g.marker.deleteByGroupId('quStation');
  const { data: res } = await getQuStation(quCode);
  let pointArr = [];
  res.forEach((item, index) => {
    let xoffset = item.stationName.length * 12;
    let o1 = {
      id: 'station-' + item.stationId,
      groupId: 'quStation',
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
        groupId: 'quStation',
        userData: item.isHr + '',
        coordinateType: 2,
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
const addQuStationWithAlarmInfo = async (quCode: string) => {
  await __g.marker.deleteByGroupId('quStation');
  const { data: res } = await getQuStationWithAlarm(quCode);
  let pointArr = [];
  res.forEach((item, index) => {
    let xoffset = item.stationName.length * 12;
    let o1 = {
      id: 'station-' + item.stationId,
      groupId: 'quStation',
      userData: JSON.stringify(item),
      coordinateType: 2,
      coordinate: [item.lng, item.lat], //坐标位置
      anchors: [-22.5, 150], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [55, 150], //图片的尺寸
      range: [1, 150000], //可视范围
      imagePath: getImageByCloud('chargeStation' + item.status),
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
        groupId: 'quStation',
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

//添加站点
const addHrStation = async (stationName: string, isShow: boolean) => {
  if (stationName === '比亚迪民乐P+R电动汽车充电站') {
    let ids = [
      '7CED6A4A4F00FFA1B7273C9511B55B85',
      'E4933C614755E6F56D8C209A5B28B8C4',
      '6EA525CA4FB949D9850E5A933AA5FFCA'
    ];
    ids.forEach((element) => {
      isShow ? __g.tileLayer.show(element) : __g.tileLayer.hide(element);
    });
    // await __g.tileLayer.add({
    //   id: '1',
    //   fileName: `${import.meta.env.VITE_FD_FileURL}/data/3dt/民乐/station.3dt`, //3dt文件路径
    //   location: [0, 0, 92.5], //坐标位置
    //   rotation: [0, 0, 0], //旋转角度
    //   scale: [1, 1, 1] //缩放大小
    // });
    isShow ? __g.tileLayer.focus('7CED6A4A4F00FFA1B7273C9511B55B85', 500) : '';
  }
};

let quFeatures = [];

const addQu = async () => {
  // await __g.polyline.clear();
  const res = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/qu4547.geojson`
  });
  quFeatures = res.features;
  let polygonArr = [];
  quFeatures.forEach((item, index) => {
    let oPolygon = {
      id: 'qu-' + item.properties.QUNAME, //polygon唯一标识id
      groupId: 'quPolygon',
      coordinates: item.geometry.coordinates[0], //构成polygon的坐标点数组
      range: [1, 100000], //可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
      userData: item.properties.QUCODE,
      color: [0, 0, 0.4, 0], //多边形的填充颜色
      frameColor: '#8ae0fa', //边框颜色
      frameThickness: 100, //边框厚度
      intensity: 1, //亮度
      style: 0, //单色 请参照API开发文档选取枚举
      depthTest: false //是否做深度检测 开启后会被地形高度遮挡
    };
    polygonArr.push(oPolygon);
  });
  //批量添加polygon
  // __g.polyline.add(polylineArr, null);
  __g.polygon.add(polygonArr, null);
};
const addQuName = async () => {
  // await __g.marker.clear();
  let pointArr = [];
  const res = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/quName4547.geojson`
  });

  res.features.forEach((item, index) => {
    let o1 = {
      id: 'quName-' + item.properties.QUNAME,
      groupId: 'markerAdd',
      userData: item.properties.QUCODE,
      coordinate: item.geometry.coordinates, //坐标位置
      anchors: [-11, 19], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [22, 19], //图片的尺寸
      range: [1, 150000], //可视范围
      imagePath: getImageUrl('regionName'),
      text: item.properties.QUNAME, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 150000], //文本可视范围[近裁距离, 远裁距离]
      textOffset: [-42, -15], // 文本偏移
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

defineExpose({ pointInWhichDistrict, resetSz });
onMounted(async () => {
  await __g.reset();
  // await __g.camera.set(infoObj.szView, 0);
  addHrStation('比亚迪民乐P+R电动汽车充电站', false);
  await __g.settings.setEnableCameraMovingEvent(false);
  addQu();
  addQuName();
  bus.on('toHr', (e) => {
    // 传参由回调函数中的形参接受
    console.log('高渲染站点信息2', e);
    store.commit('CHANGE_CURRENTHRSTATIONID', 'station-' + e.stationId);
    store.commit('CHANGE_CURRENTPOSITIONBAK', currentPosition.value);
    store.commit('CHANGE_CURRENTPOSITION', '');
    __g.marker.hideByGroupId('quStation');
    addHrStation(e.stationName, true);
  });
  bus.on('hrBackSz', async () => {
    // 传参由回调函数中的形参接受
    if (currentPositionBak.value === '深圳市') {
      store.commit('CHANGE_CURRENTPOSITION', currentPositionBak.value);
    }
    back();
  });
});

onBeforeUnmount(() => {
  // __g.polygon.delete(["polygon1"]);
  bus.off('toHr');
  bus.off('hrBackSz');
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
