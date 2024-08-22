<template>
  <qu ref="quRef"></qu>
</template>

<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import { requestGeojsonData } from '@/components/map-layer/api.js';
import { getHtmlUrl } from '@/global/config/map';
import Api from '../api';

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;

onMounted(async () => {
  await __g.reset();
  await getData();
  // handleQuHeatMap();
  // addPoint();
});

let quData = [];
const getData = async () => {
  try {
    const params = {
      areaCode: '',
      streetCode: ''
    };
    const { data } = await Api.busCanDistribution(params);
    quData = data;
  } catch (error) {}
};
const handleQuHeatMap = async () => {
  quData.forEach((v) => {
    const color = getIntervalCategory(v.busRemainPower);
    console.log('color :>> ', color, __g);
    __g.polygon.setColor('qu-' + v.areaName, color);
  });
};

const getIntervalCategory = (value) => {
  if (value <= 300) {
    return '#E3E899';
  } else if (value <= 400) {
    return '#B8D45D';
  } else if (value <= 500) {
    return '#7CAE53';
  } else if (value <= 700) {
    return '#45802A';
  } else {
    return '#316528';
  }
};

const addPoint = async () => {
  const res1 = await requestGeojsonData('barPosition4547');
  const quCenterPositions = res1.features;
  let markers = [];
  quCenterPositions.forEach((item, index) => {
    const data = quData.filter((v) => v.areaName == item.properties.QUNAME);
    let o = {
      id: 'traffic-power-marker-' + item.properties.QUCODE,
      groupId: `traffic-power-marker-group`,
      coordinate: item.geometry.coordinates,
      anchors: [-10, 10], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [10, 10], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: `${getHtmlUrl()}/static/images/circle.png`, //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: `${getHtmlUrl()}/static/html/rectBar.html?value=${JSON.stringify(data)}`, //弹窗HTML链接
      autoHidePopupWindow: false,
      popupSize: [200, 300],
      popupOffset: [-125, -140], //弹窗偏移
      autoHeight: false, // 自动判断下方是否有物体
      displayMode: 2, //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
      priority: item.properties.PRIORITY
    };
    markers.push(o);
  });
  await aircityObj.value.acApi.marker.add(markers);
  await aircityObj.value.acApi.marker.showAllPopupWindow();
};
</script>

<style scoped></style>
