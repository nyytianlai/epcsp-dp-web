<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import MapConfigObj from '@/global/config/map';
import { getImageUrl } from '@/utils/index';
import { addAbortSignal } from 'stream';

const aircityObj = inject('aircityObj');
const { useEmitt } = inject('aircityObj');

useEmitt('AIRCITY_EVENT', (e) => {
  // 编写自己的业务
  console.log('鼠标左键单击', e);
  aircityObj.acApi.polygon.focus(e.Id,13000)
});
const addQu = async () => {
  // await aircityObj.acApi.polyline.clear();
  const res = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/qu4547.geojson`
  });

  let polylineArr = [];
  res.features.forEach((item, index) => {
    let oPolyline = {
      id: item.properties.QUNAME, //polygon唯一标识id
      groupId: 'quLine',
      coordinates: item.geometry.coordinates[0], //构成polygon的坐标点数组
      range: [1, 100000], //可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
      userData:item.properties.QUNAME,
      // color: '#8ae0fa', //折线颜色
      // thickness: 100, //折线宽度
      // intensity: 1, //亮度
      // shape: 0, //折线类型 0：直线， 1：曲线
      // depthTest: false, //是否做深度检测 开启后会被地形高度遮挡
      // style: 5 //折线样式 参考样式枚举：PolylineStyle
      color: [0, 0, 0.4, 0], //多边形的填充颜色
      frameColor: '#8ae0fa', //边框颜色
      frameThickness: 100, //边框厚度
      intensity: 1, //亮度
      style: 0, //单色 请参照API开发文档选取枚举
      depthTest: false //是否做深度检测 开启后会被地形高度遮挡
    };
    polylineArr.push(oPolyline);
  });
  //批量添加polygon
  // aircityObj.acApi.polyline.add(polylineArr, null); 
  aircityObj.acApi.polygon.add(polylineArr, null);
};
const addQuName = async () => {
  // await aircityObj.acApi.marker.clear();
  let pointArr = [];
  const res = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/quName4547.geojson`
  });

  res.features.forEach((item, index) => {
    let o1 = {
      id: item.properties.QUNAME,
      groupId: 'markerAdd',
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
  aircityObj.acApi.marker.add(pointArr, null);
};
const addBar = async () => {
  // await aircityObj.acApi.customTag.clear();
  let barArr = [];
  const res = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/barPosition4547.geojson`
  });
  res.features.forEach((item, index) => {
    let o = {
      id: item.properties.QUNAME,
      coordinate: item.geometry.coordinates,
      contentURL: `${import.meta.env.VITE_FD_URL}/data/html/rectBar.html`,
      contentSize: [169, 112], //网页窗口宽高 [width, height]
      pivot: [0.5, 1], // 中心点
      range: [1, 150000] //显示范围：[min, max]
      // autoHidePopupWindow: true //失去焦点后是否自动关闭弹出窗口
    };
    barArr.push(o);
  });
  aircityObj.acApi.customTag.add(barArr);
};
onMounted(async () => {
  await aircityObj.acApi.reset();
  addQu();
  addQuName();
  addBar();
});

onBeforeUnmount(() => {
  // aircityObj.acApi.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped></style>
