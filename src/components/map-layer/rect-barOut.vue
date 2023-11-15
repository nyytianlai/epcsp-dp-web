<template></template>
<script setup lang="ts">
import { inject, onBeforeUnmount } from 'vue';
import { requestGeojsonData } from './api.js';
import { getHtmlUrl } from '@/global/config/map';

const aircityObj = inject('aircityObj');

const { useEmitt } = aircityObj.value;
let barPositionBak = [];
let currentBar = '';

useEmitt('AIRCITY_EVENT', async (e) => {
  // 编写自己的业务
  // console.log('事件监听', e);
  if (e.eventtype === 'MarkerCallBack') {
    let arearName = e.ID?.split('-')[1];
    let type = arearName.includes('区') ? 'qu' : 'jd';
    // if (e.Data === 'mouseover') {
    //   //鼠标悬浮事件
    //   changeXzqhColor(type + '-' + arearName, [75 / 255, 222 / 255, 255 / 255, 0.6]);
    // }
    //  else if (e.Data === 'mouseout') {
    //   changeXzqhColor(type + '-' + arearName, [75 / 255, 222 / 255, 255 / 255, 0.0]);
    // }
  }
});

const getBarPositionByQuName = (quName: string) => {
  let quItem = barPositionBak.filter((item) => {
    return item.properties.QUNAME === quName;
  });
  return quItem[0].geometry.coordinates;
};

const addBar = async (
  type: 'qu' | 'jd',
  moudleName: '储能站' | '光伏站' | '充换电柜',
  res: [],
  streetId?: string
) => {
  let barArr = [];
  const fileName = type === 'qu' ? 'barPosition4547' : 'jdBarPosition4547';
  let countNumber = res.map((item) => {
    return item.countNumber;
  });

  let yMax = Math.max(...countNumber);

  const res1 = await requestGeojsonData(fileName);

  barPositionBak = res1.features;
  if (type === 'jd') {
    res1.features = res1.features.filter((item) => {
      return item.properties.QUCODE === streetId;
    });
  }
  res1.features.forEach((item, index) => {
    let countObj = res.filter((i) => {
      return type === 'qu'
        ? i.areaCode == item.properties.QUCODE
        : i.streetId == item.properties.JDCODE;
    });
    if (!countObj.length) {
      return;
    }
    let contentHeight = 160;

    let idEnd = type === 'qu' ? item.properties.QUNAME : item.properties.JDNAME;
    let areaCode = type === 'qu' ? item.properties.QUCODE : item.properties.JDCODE + '';
    let o = {
      id: 'rectBar1-' + idEnd,
      groupId: `rectBar`,
      userData: areaCode,
      coordinate: item.geometry.coordinates,
      anchors: [-41, 19], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [82, 38], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: `${getHtmlUrl()}/static/images/barEllipse.png`, //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: `${getHtmlUrl()}/static/html/rectBarOut.html?value=${
        countObj[0].countNumber
      }&yMax=${yMax}&contentHeight=${contentHeight}&quName=${idEnd}&areaCode=${areaCode}&moudleName=${moudleName}`, //弹窗HTML链接
      autoHidePopupWindow: false,
      popupSize: [60, contentHeight + 10],
      popupOffset: [-60, -80], //弹窗偏移
      autoHeight: false, // 自动判断下方是否有物体
      displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
    };
    barArr.push(o);
  });
  await aircityObj.value.acApi.marker.add(barArr);
  await aircityObj.value.acApi.marker.showAllPopupWindow();
};
const changeXzqhColor = (polygonId: string, newVal: [number, number, number, number]) => {
  aircityObj.value.acApi.polygon.setColor(polygonId, newVal);
};
defineExpose({ addBar });

onBeforeUnmount(() => {});
</script>
<style lang="less" scoped></style>
