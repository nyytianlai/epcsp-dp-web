<template>
  <qu ref="quRef"></qu>
  <rect-bar></rect-bar>
  <div class="backBox" v-show="currentPosition !== '深圳市'">
    <img src="@/assets/images/map/back.png" alt="" @click="backSz" />
    <div class="quName" v-show="currentPosition !== ''">{{ currentPosition }}</div>
  </div>
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import RectBar from '@/components/map-layer/rect-bar.vue';
import { inject, onMounted, onBeforeUnmount, ref } from 'vue';
import request from '@sutpc/axios';
// import {  } from '@/utils/index';
import {
  layerNameQuNameArr,
  infoObj,
  getImageUrl,
  getImageByCloud,
  quNameCodeInterTrans
} from '@/global/config/map';
import { getQuStation } from '@/api/deviceManage';

const aircityObj = inject('aircityObj');
const __g = aircityObj.acApi;
__g.reset();
const { useEmitt } = inject('aircityObj');
const currentPosition = ref('深圳市'); //所在位置 深圳市 xx区 xx站(取值'')
let currentPositionBak = '';
let currentHrStationID = ''; //当前点击的高渲染站点id
let quRef = ref(null);

useEmitt('AIRCITY_EVENT', async (e) => {
  // 编写自己的业务
  console.log('事件监听', e);
  if (e.Id?.includes('区')) {
    if (e.Id.split('-')[1] === currentPosition.value) {
      return;
    }
    currentPosition.value = e.Id.split('-')[1];
    __g.polygon.focus('qu-' + currentPosition.value, 13000);
    setQuVisibility(false);
    addQuStation(e.UserData);
    await __g.settings.setEnableCameraMovingEvent(true);
  }
  if (e.Id?.includes('station') && e.UserData === '0') {
    //是高渲染站点
    changeStationStyle(e.Id, 'hr', [287, 451], [-143, 451]);

    if (currentHrStationID === e.Id) {
      //连续两次点击相同站点 进入高渲染站点
      currentPositionBak = currentPosition.value;
      currentPosition.value = '';
      addHrStation();
    } else {
      currentHrStationID !== ''
        ? changeStationStyle(currentHrStationID, 'chargeStationB', [77, 176], [-38.5, 176])
        : '';
    }
    currentHrStationID = e.Id;
  }
  if (e.eventtype === 'CameraStopMove' && currentPosition.value !== '') {
    //当前不处于站点内
    let cameraQuName = quRef.value.pointInWhichDistrict([e.Position[0], e.Position[1]]);
    console.log('cameraQuName', cameraQuName);
    if (cameraQuName && currentPosition.value !== cameraQuName) {
      //当前相机位置所在区和当前区不一致
      console.log('重新请求数据');
      currentPosition.value = cameraQuName;
      let cameraQuCode = quNameCodeInterTrans('name', cameraQuName);
      cameraQuCode && addQuStation(cameraQuCode);
    }
  }
});

const changeStationStyle = (id, picName, size, anchors) => {
  __g.marker.setImagePath(id, getImageByCloud(picName));
  __g.marker.setImageSize(id, size);
  __g.marker.setAnchors(id, anchors);
};

const setQuVisibility = async (value: boolean) => {
  // value
  //   ? __g.polygon.show(layerNameQuNameArr('qu'))
  //   : __g.polygon.hide(layerNameQuNameArr('qu'));
  value
    ? await __g.customTag.show(layerNameQuNameArr('rectBar'))
    : await __g.customTag.hide(layerNameQuNameArr('rectBar'));
  value
    ? await __g.marker.show(layerNameQuNameArr('quName'))
    : await __g.marker.hide(layerNameQuNameArr('quName'));
};

const backSz = async () => {
  if (currentPosition.value.includes('区')) {
    //返回市
    currentPosition.value = '深圳市';
    await __g.marker.deleteByGroupId('quStation');
    setQuVisibility(true);
    await __g.camera.set(infoObj.szView, 0.2);
    await __g.settings.setEnableCameraMovingEvent(false);
  } else if (currentPosition.value === '') {
    //返回区
    currentPosition.value = currentPositionBak;
    __g.tileLayer.delete('1');
    __g.marker.focus(currentHrStationID, 200, 0.2);
  }
};

//添加区的点 isHr 0-是高渲染站点；1-否
const addQuStation = async (quCode: string) => {
  await __g.marker.deleteByGroupId('quStation');
  const { data: res } = await getQuStation(quCode);
  let pointArr = [];
  res.forEach((item, index) => {
    let o1 = {
      id: 'station-' + index,
      groupId: 'quStation',
      userData: item.isHr + '',
      coordinateType: 2,
      coordinate: [item.lng, item.lat], //坐标位置
      anchors: item.isHr ? [-16, 87] : [-38.5, 176], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: item.isHr ? [32, 87] : [77, 176], //图片的尺寸
      range: [1, 150000], //可视范围
      // imagePath: item.isHr ? getImageUrl('chargeStationS') : getImageUrl('chargeStationB'),
      imagePath: item.isHr ? getImageByCloud('chargeStationS') : getImageByCloud('chargeStationB'),
      text: item.stationName, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 50], //文本可视范围[近裁距离, 远裁距离]
      textOffset: [-72, -55], // 文本偏移
      textBackgroundColor: [0 / 255, 46 / 255, 66 / 255, 0.8], //文本背景颜色
      fontSize: 16, //字体大小
      fontOutlineSize: 1, //字体轮廓线大小
      fontColor: '#FFFFFF', //字体颜色
      // fontOutlineColor: '#1b4863', //字体轮廓线颜色
      displayMode: 2,
      autoHeight: true
    };
    pointArr.push(o1);
  });
  //批量添加polygon
  await __g.marker.add(pointArr.slice(0, 300), null);
};

//添加站点
const addHrStation = async () => {
  await __g.tileLayer.add({
    id: '1',
    fileName: `${import.meta.env.VITE_FD_FileURL}/data/3dt/民乐/station.3dt`, //3dt文件路径
    location: [0, 0, 92.5], //坐标位置
    rotation: [0, 0, 0], //旋转角度
    scale: [1, 1, 1] //缩放大小
  });
  __g.tileLayer.focus('1', 500);
};

const test = async () => {
  // await __g.tileLayer.add({
  //   id: '2',
  //   fileName: `${import.meta.env.VITE_FD_FileURL}/data/3dt/民乐/NKZ_SplineTest.3dt`, //3dt文件路径
  //   location: [0, 0, 92.5], //坐标位置
  //   rotation: [0, 0, 0], //旋转角度
  //   scale: [1, 1, 1] //缩放大小
  // });
  // __g.tileLayer.focus('2', 150);
  __g.tileLayer.delete('2');
  __g.misc.callBPFunction({
    objectName: 'BP_SplineMain_0',
    functionName: 'SetSplineVisible',
    paramType: 5,
    paramValue: 'Zero'
  });
  // __g.customObject.callBPFunction('BP_SplineMain_0','SetSplineVisible',5,'Zero')
};

onMounted(async () => {
  await __g.tileLayer.delete('1');
  // await __g.tileLayer.setCollision(infoObj.terrainId, true, true, true, true);
  test();
});

onBeforeUnmount(() => {
  // __g.polygon.delete(["polygon1"]);
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
  z-index: 10;

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
