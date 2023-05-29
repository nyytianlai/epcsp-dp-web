<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import { monthRate } from './api.js';
import { getHtmlUrl } from '@/global/config/map';
const aircityObj = inject('aircityObj');

const addBar = async (
  res: [{ area_code: string; useRatio: string }],
  type: 'qu' | 'jd',
  quCode?: string
) => {
  let barArr = [];
  const fileName = type === 'qu' ? 'barPosition4547' : 'jdBarPosition4547';

  const res1 = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/${fileName}.geojson`
  });
  if (type === 'jd') {
    res1.features = res1.features.filter((item) => {
      return item.properties.QUCODE === quCode;
    });
  }
  res1.features.forEach((item, index) => {
    let countObj = res.filter((i) => {
      return type === 'qu'
        ? i.area_code == item.properties.QUCODE
        : i.area_code == item.properties.JDCODE;
    });
    let value = countObj.length ? countObj[0].useRatio : 0;
    let idEnd = type === 'qu' ? item.properties.QUNAME : item.properties.JDNAME;
    let areaCode = type === 'qu' ? item.properties.QUCODE : item.properties.JDCODE + '';
    console.log('value', countObj, idEnd);
    let o = {
      id: `rectBar1-${idEnd}`,
      groupId: `rectBar-${type}`,
      userData: areaCode,
      coordinate: item.geometry.coordinates,
      anchors: [-41, 19], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [82, 38], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: `${import.meta.env.VITE_FD_URL}` + '/data/images/barEllipse.png', //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: `${getHtmlUrl()}/static/html/cirBar2.html?value=${value}&areaCode=${areaCode}`, //弹窗HTML链接
      autoHidePopupWindow: false,
      popupSize: [108, 170],
      popupOffset: [-108, -70], //弹窗偏移
      autoHeight: false, // 自动判断下方是否有物体
      displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
    };
    barArr.push(o);
  });
  await aircityObj.value?.acApi.marker.add(barArr);
  await aircityObj.value?.acApi.marker.showAllPopupWindow();
};
defineExpose({ addBar });
onMounted(async () => {
  // addBar();
});

onBeforeUnmount(() => {
  // aircityObj.acApi.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped></style>
