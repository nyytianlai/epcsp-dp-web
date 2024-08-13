<template>
  <qu></qu>
</template>

<script setup lang="ts">
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import Qu from '@/components/map-layer/qu.vue';
import { getPopupHtml } from '@/utils/index';
import { scale } from '@sutpc/config';
import { getImageByCloud } from '@/global/config/map';
import { useRoute } from 'vue-router';
import Api from '../api';
const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;

const route = useRoute();

const getData = async () => {
  const res = await Promise.all([
    Api.adjustableCapacityDistribution(),
    Api.requestGeojsonData('barPosition4547')
  ]);
  drawAreaLayer(res[0]?.data, res[1]?.features);
};

const drawAreaLayer = async (data = [], areaPosition = []) => {
  await __g.marker.deleteByGroupId('area-point-layer');
  const pointList = [];
  const idList = [];
  areaPosition.forEach((item) => {
    const dataObj = data.find((el) => `${el.areaCode}` === `${item.properties.QUCODE}`) || {};
    const oPopUpUrl = getPopupHtml({
      usePopupHtml: true,
      com: 'virtual-electric',
      params: {
        value: JSON.stringify({ ...dataObj })
      }
    });
    const maxLen = Math.max(
      `${dataObj?.adjustableCapacity || 0}`.length,
      `${dataObj?.adjustableResource || 0}`.length,
      `${dataObj?.installedCapacity || 0}`.length,
      `${dataObj?.virtualPowerPlantNum || 0}`.length
    );
    const marker = {
      id: `${item.properties.QUCODE}`,
      groupId: 'area-point-layer',
      userData: { ...dataObj },
      coordinate: item.geometry.coordinates,
      anchors: [-5, 5], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [10, 10], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: getImageByCloud('circle'), //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: oPopUpUrl,
      popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
      autoHidePopupWindow: false,
      popupSize: [scale(100 + maxLen * 8), scale(110)],
      popupOffset: [-scale(100 + maxLen * 8) / 2 - 5, -scale(55) - 5], //弹窗偏移
      autoHeight: true, // 自动判断下方是否有物体
      displayMode: 2
    };
    pointList.push(marker);
    idList.push(marker.id);
  });
  await __g.marker.add(pointList, null);
  if (route.name !== 'virtualElectric') {
    __g?.marker?.deleteByGroupId('area-point-layer');
    return;
  }
  __g.marker.showPopupWindow(idList);
};

onMounted(async () => {
  await __g.reset();
  getData();
});

onBeforeUnmount(async () => {
  await __g?.marker?.deleteByGroupId('area-point-layer');
});
</script>

<style scoped></style>
