<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import { getHtmlUrl } from '@/global/config/map';
import {requestGeojsonData} from './api.js'
const aircityObj = inject('aircityObj');
const { useEmitt } = aircityObj.value;
useEmitt('AIRCITY_EVENT', async (e) => {
  // 编写自己的业务
  // console.log('事件监听', e);
  if (e.eventtype === 'MarkerCallBack') {
    let arearName = e.ID?.split('-')[1];
    if (e.Data === 'mouseover') {
      //鼠标悬浮事件
      changeXzqhColor('qu-' + arearName, [75 / 255, 222 / 255, 255 / 255, 0.6]);
    }
     else if (e.Data === 'mouseout') {
      changeXzqhColor('qu-' + arearName, [75 / 255, 222 / 255, 255 / 255, 0.0]);
    }
  }
});
const changeXzqhColor = (polygonId: string, newVal: [number, number, number, number]) => {
  aircityObj.value.acApi.polygon.setColor(polygonId, newVal);
};

const addBar = async (
  res: [{ areaCode: string; enrollment: number; visits: number }],
  type: 'qu' | 'jd',
  quCode?: string
) => {
  let barArr = [];
  const fileName = type === 'qu' ? 'barPosition4547' : 'jdBarPosition4547';
  let stationCount = res.map((item) => {
    return item.enrollment;
  });

  let yMax = Math.max(...stationCount);
  const res1 = await requestGeojsonData(fileName);

  if (type === 'jd') {
    res1.features = res1.features.filter((item) => {
      return item.properties.QUCODE === quCode;
    });
  }
  res1.features.forEach((item, index) => {
    let countObj = res.filter((i) => {
      return type === 'qu'
        ? i.areaCode == item.properties.QUCODE
        : i.areaCode == item.properties.JDCODE;
    });
    let contentHeight = 160;
    let idEnd = type === 'qu' ? item.properties.QUNAME : item.properties.JDNAME;
    let areaCode = type === 'qu' ? item.properties.QUCODE : item.properties.JDCODE + '';
    let o = {
      id: `rectBar1-${idEnd}`,
      groupId: `rectBar-${type}`,
      userData: areaCode,
      coordinate: item.geometry.coordinates,
      anchors: [-41, 19], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [82, 38], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: `${getHtmlUrl()}/static/images/barEllipse.png`, //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: `${getHtmlUrl()}/static/html/rectBar2.html?value=${JSON.stringify(
        countObj[0]
      )}&areaCode=${areaCode}&yMax=${yMax}&contentHeight=${contentHeight}&quName=${idEnd}`, //弹窗HTML链接
      autoHidePopupWindow: false,
      popupSize: [185, contentHeight + 80],
      popupOffset: [-110, -100], //弹窗偏移
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
