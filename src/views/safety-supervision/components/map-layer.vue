<template>
  <qu></qu>
  <cir-bar3 ref="cirBar3Ref"></cir-bar3>
  <div class="backBox" v-show="currentPosition !== '深圳市'">
    <img src="@/assets/images/map/back.png" alt="" @click="backSz" />
    <div class="quName">{{ currentPosition }}</div>
  </div>
  <legend-list :legendList="legendListData" legendName="告警级别（个）" />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import cirBar3 from '@/components/map-layer/cir-bar3.vue';
import { inject, onMounted, onBeforeUnmount, ref } from 'vue';
import request from '@sutpc/axios';
import { getImageUrl, getImageByCloud } from '@/utils/index';
import { layerNameQuNameArr, infoObj } from '@/global/config/map';
import { getQuStation } from '@/api/deviceManage';
const legendListData = [
  {
      color: 'linear-gradient(178.17deg, #FF0005 4.74%, #590303 95.4%)',
      name:'一级 人身安全'
  },
  {
      color: 'linear-gradient(178.1deg, #FF7A00 3.02%, #772B00 97.03%)',
      name:'二级 设备安全'
  },
  {
      color: 'linear-gradient(178.21deg, #FFF501 6.05%, #7E8E19 94.76%)',
      name:'三级 告警提示'
  }
]
let cirBar3Ref = ref(null);
let buttomTabCode = 1;
const aircityObj = inject('aircityObj');
const __g = aircityObj.acApi;
__g.reset();

const { useEmitt } = inject('aircityObj');
const currentPosition = ref('深圳市');
let currentPositionBak = '';
let currentHrStationID = ''; //当前点击的高渲染站点id

useEmitt('AIRCITY_EVENT', (e) => {
  // 编写自己的业务
  console.log('鼠标左键单击', e);
  if (e.Id?.includes('区')) {
    if (e.Id.split('-')[1] === currentPosition.value) {
      return;
    }
    currentPosition.value = e.Id.split('-')[1];
    __g.polygon.focus('qu-' + currentPosition.value, 13000);
    setQuVisibility(false);
    addQuStation(e.UserData);
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
});

const changeStationStyle = (id, picName, size, anchors) => {
  __g.marker.setImagePath(id, getImageByCloud(picName));
  __g.marker.setImageSize(id, size);
  __g.marker.setAnchors(id, anchors);
};

const setQuVisibility = async (value: boolean) => {
  if (buttomTabCode == 1) {
    setObjVisibility('customTag', 'rectBar1', value);
  } else {
    setObjVisibility('customTag', 'rectBar2', value);
  }
  setObjVisibility('marker', 'quName', value);
};

const setObjVisibility = (type: string, idPre: string, value: boolean) => {
  value ? __g[type].show(layerNameQuNameArr(idPre)) : __g[type].hide(layerNameQuNameArr(idPre));
};

const buttomTabChange = async (code: 1 | 2) => {
  buttomTabCode = code;
  let value = code === 1 ? true : false;
  setObjVisibility('customTag', 'rectBar1', value);
  let info = await __g.customTag.get('rectBar2-南山区');
  console.log('获取rectBar2-南山区info', info);
  if (info.result === 0) {
    setObjVisibility('customTag', 'rectBar2', !value);
  } else {
    cirBar3Ref.value.addBar(buttomTabCode);
  }
};

const backSz = async () => {
  if (currentPosition.value.includes('区')) {
    //返回市
    currentPosition.value = '深圳市';
    await __g.marker.deleteByGroupId('quStation');
    setQuVisibility(true);
    await __g.camera.set(infoObj.szView, 0.2);
  } else if (currentPosition.value === '') {
    //返回区
    currentPosition.value = currentPositionBak;
    __g.tileLayer.delete('1');
    __g.marker.focus(currentHrStationID, 200, 0.2);
  }
};
//添加区的点 isHr 0-是高渲染站点；1-否
const addQuStation = async (quCode: string) => {
  console.time('test');
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
  console.timeEnd('test');
  console.log(pointArr, 'pointArr');
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

defineExpose({ buttomTabChange });

onMounted(async () => {
  await __g.tileLayer.delete('1');
  // await __g.tileLayer.setCollision(infoObj.terrainId, false, true, false, true);
  await __g.tileLayer.setCollision(infoObj.terrainId, true, true, true, true);
  cirBar3Ref.value.addBar(buttomTabCode);
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
