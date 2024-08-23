<template>
  <qu ref="quRef"></qu>
</template>

<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import { requestGeojsonData } from '@/components/map-layer/api.js';
import { getHtmlUrl } from '@/global/config/map';
import { getImageByCloud } from '@/global/config/map';
import { getPopupHtml } from '@/utils/index';
import { scale } from '@sutpc/config';
import { transformCoordsByType } from '@/utils/map-coord-tools';
import Api from '../api';

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;

onMounted(async () => {
  await __g.reset();
  await getData();
  addPoint();
});

let positionData = [];
const getData = async () => {
  try {
    const { data } = await Api.getV2GStationDistribution();
    positionData = data;
  } catch (error) {}
};

const addPoint = async () => {
  let markers = [];
  positionData.forEach((item, index) => {
    // const data = positionData.filter((v) => v.areaName == item.properties.QUNAME);
    const oPopUpUrl = getPopupHtml({
      usePopupHtml: true,
      com: 'carnet-interaction',
      params: {
        value: JSON.stringify({ ...item })
      }
    });
    const maxLen = `${item?.pileNum || 0}`.length;
    console.log(transformCoordsByType([item.stationLat, item.stationLng], 2)); //辐射圈坐标位置

    let o = {
      id: 'carnet-interaction-' + item.stationId,
      groupId: `carnet-interaction-group`,
      coordinate: transformCoordsByType([item.stationLng, item.stationLat], 2), //坐标位置
      anchors: [-20, 48], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [43, 48], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: getImageByCloud('chargingStation1'), //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: oPopUpUrl,
      autoHidePopupWindow: true,
      popupSize: [scale(100 + maxLen * 8), scale(110)],
      popupOffset: [-scale(150 + maxLen * 8) / 2, -scale(29)], //弹窗偏移
      autoHeight: true, // 自动判断下方是否有物体
      displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
    };
    markers.push(o);
  });
  console.log('markers :>> ', markers);
  await aircityObj.value.acApi.marker.add(markers);
};
</script>

<style scoped></style>
