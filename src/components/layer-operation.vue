<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import MapConfigObj from '@/global/config/map';
import { getImageUrl } from '@/utils/index';
import { addAbortSignal } from 'stream';

const aircityObj = inject('aircityObj');
const addQu = async () => {
  await aircityObj.acApi.polyline.clear();
  request
    .get({
      url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/qu2000Line.geojson`
    })
    .then((res) => {
      let polylineArr = [];
      res.features.forEach((item, index) => {
        let oPolyline = {
          id: 'polyline' + index, //polygon唯一标识id
          groupId: 'quLine',
          coordinateType: 1,
          coordinates: item.geometry.coordinates[0], //构成polygon的坐标点数组
          range: [1, 100000], //可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
          color: '#8ae0fa', //折线颜色
          thickness: 100, //折线宽度
          intensity: 1, //亮度
          shape: 0, //折线类型 0：直线， 1：曲线
          depthTest: false, //是否做深度检测 开启后会被地形高度遮挡
          style: 5 //折线样式 参考样式枚举：PolylineStyle
        };
        polylineArr.push(oPolyline);
      });
      //批量添加polygon
      aircityObj.acApi.polyline.add(polylineArr, null);
    });
};
const addQuName = async () => {
  await aircityObj.acApi.marker.clear();
  let pointArr = [];
  for (let key in MapConfigObj.districtCenter) {
    let o1 = {
      id: key,
      groupId: 'markerAdd',
      coordinate: MapConfigObj.districtCenter[key], //坐标位置
      coordinateType: 1, //默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
      anchors: [-11, 19], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [22, 19], //图片的尺寸
      range: [1, 100000], //可视范围
      imagePath: getImageUrl('regionName'),
      text: key, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 100000], //文本可视范围[近裁距离, 远裁距离]
      textOffset: [-35, -15], // 文本偏移
      textBackgroundColor: [1, 1, 1, 0], //文本背景颜色
      fontSize: 10, //字体大小
      fontOutlineSize: 1, //字体轮廓线大小
      fontColor: '#FFFFFF', //字体颜色
      fontOutlineColor: '#1b4863', //字体轮廓线颜色
      displayMode: 2
    };
    pointArr.push(o1);
    aircityObj.acApi.marker.add(pointArr, null);
  }
};
const addBar = async () => {
  await aircityObj.acApi.customTag.clear();
  let barArr = [];
  for (let key in MapConfigObj.districtCenter) {
    let o = {
      id: key,
      coordinate: MapConfigObj.districtCenter[key],
      coordinateType: 1, //坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0
      contentURL: `${import.meta.env.VITE_FD_URL}/data/html/rectBar.html`,
      contentSize: [169, 110], //网页窗口宽高 [width, height]
      pivot: [0.5, 1], // 中心点
      range: [1, 100000], //显示范围：[min, max]
      // autoHidePopupWindow: true //失去焦点后是否自动关闭弹出窗口
    };
    barArr.push(o);
  }
  aircityObj.acApi.customTag.add(barArr);
};
onMounted(() => {
  addQu();
  addQuName();
  addBar();
  aircityObj.acApi.weather.setDarkMode(true);
});

onBeforeUnmount(() => {
  // aircityObj.acApi.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped></style>
