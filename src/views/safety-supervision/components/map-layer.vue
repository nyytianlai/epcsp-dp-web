<template>
  <qu></qu>
  <cir-bar3></cir-bar3>
  <div class="backBox" v-show="currentPosition !== '深圳市'">
    <img src="@/assets/images/map/back.png" alt="" @click="backSz" />
    <div class="quName">{{ currentPosition }}</div>
  </div>
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import cirBar3 from '@/components/map-layer/cir-bar3.vue';
import { inject, onMounted, onBeforeUnmount, ref } from 'vue';
import request from '@sutpc/axios';
import { getImageUrl } from '@/utils/index';
import { layerNameQuNameArr, infoObj } from '@/global/config/map';
import { getQuStation } from '@/api/deviceManage';

const aircityObj = inject('aircityObj');
aircityObj.acApi.reset();

const { useEmitt } = inject('aircityObj');
const currentPosition = ref('深圳市');

useEmitt('AIRCITY_EVENT', (e) => {
  // 编写自己的业务
  console.log('鼠标左键单击', e);
  if (e.Id?.includes('区')) {
    currentPosition.value = e.Id.split('-')[1];
    aircityObj.acApi.polygon.focus('qu-' + currentPosition.value, 13000);
    setQuVisibility(false);
    addQuStation(e.UserData);
  }
});

const setQuVisibility = async (value: boolean) => {
  // value
  //   ? aircityObj.acApi.polygon.show(layerNameQuNameArr('qu-'))
  //   : aircityObj.acApi.polygon.hide(layerNameQuNameArr('qu-'));
  value
    ? await aircityObj.acApi.customTag.show(layerNameQuNameArr('rectBar'))
    : await aircityObj.acApi.customTag.hide(layerNameQuNameArr('rectBar'));
  value
    ? await aircityObj.acApi.marker.show(layerNameQuNameArr('quName-'))
    : await aircityObj.acApi.marker.hide(layerNameQuNameArr('quName-'));
};

const backSz = async () => {
  currentPosition.value = '深圳市';
  await aircityObj.acApi.marker.deleteByGroupId('quStation');
  setQuVisibility(true);
  await aircityObj.acApi.camera.set(infoObj.szView, 0.2);
};

//添加区的点
const addQuStation = async (quCode: string) => {
  await aircityObj.acApi.marker.deleteByGroupId('quStation');
  const { data: res } = await getQuStation(quCode);
  let pointArr = [];
  res.forEach((item, index) => {
    let o1 = {
      id: 'station-' + index,
      groupId: 'quStation',
      // userData: item.properties.QUCODE,
      coordinateType: 2,
      coordinate: [item.lng, item.lat], //坐标位置
      anchors: [-16, 87], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [32, 87], //图片的尺寸
      range: [1, 150000], //可视范围
      imagePath: getImageUrl('chargeStationS'),
      text: item.stationName, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 50], //文本可视范围[近裁距离, 远裁距离]
      textOffset: [-72, -55], // 文本偏移
      textBackgroundColor: [0 / 255, 46 / 255, 66 / 255, 0.8], //文本背景颜色
      fontSize: 16, //字体大小
      fontOutlineSize: 1, //字体轮廓线大小
      fontColor: '#FFFFFF', //字体颜色
      // fontOutlineColor: '#1b4863', //字体轮廓线颜色
      displayMode: 2
    };
    pointArr.push(o1);
  });
  //批量添加polygon
  aircityObj.acApi.marker.add(pointArr, null);
};

onMounted(async () => {
  await aircityObj.acApi.tileLayer.setCollision(infoObj.terrainId, false, true, false, true);
});

onBeforeUnmount(() => {
  // aircityObj.acApi.polygon.delete(["polygon1"]);
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
