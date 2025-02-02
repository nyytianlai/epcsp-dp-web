<!--
 * @Author: niyayong@sutpc.com
 * @Date: 2024-07-25 15:18:27
 * @LastEditors: niyayong@sutpc.com
 * @LastEditTime: 2024-07-30 14:47:40
 * @Description: 超充站、桩柱状图图层
 * @FilePath: /epcsp-dp-web/src/components/map-layer/super-charge-bar.vue
-->

<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import { getHtmlUrl } from '@/global/config/map';
import { requestGeojsonData } from './api.js';
import { getPopupHtml } from '@/utils/index';
import { scale } from '@sutpc/config';

const aircityObj = inject<any>('aircityObj');

const { useEmitt } = aircityObj.value;
let barPositionBak = [];

let chartHover;

useEmitt('AIRCITY_EVENT', async (e) => {
  if (e.eventtype === 'MarkerCallBack') {
    let quName = e.ID?.split('-')[1];
    if (e.Data === 'mouseover') {
      changeXzqhColor('qu-' + quName, [75 / 255, 222 / 255, 255 / 255, 0.6]);
    } else if (e.Data === 'mouseout') {
      changeXzqhColor('qu-' + quName, [75 / 255, 222 / 255, 255 / 255, 0.0]);
    }

    if (e.Data.includes('click-')) {
      aircityObj.value.acApi.marker.deleteByGroupId('bar-hover-pop');
      chartHover = false;
    }

    if (e.Data.includes('mouseover-')) {
      const data = JSON.parse(e.Data.split('mouseover-')[1]);
      chartHover = true;
      drawHoverBarMarker(data, true);
    }

    if (e.Data.includes('mouseout-')) {
      const data = JSON.parse(e.Data.split('mouseout-')[1]);
      chartHover = false;
      drawHoverBarMarker(data, false);
    }
  }
});

const drawHoverBarMarker = async (data, show = false) => {
  await aircityObj.value.acApi.marker.deleteByGroupId('bar-hover-pop');
  if (!show || !data || !chartHover) return;
  const contentHeight = +data.contentHeight;
  const mPopUpUrl = getPopupHtml({
    usePopupHtml: true,
    com: 'super-charge-bar-popup',
    params: {
      value: JSON.stringify(data)
    }
  });
  console.log(data);
  const marker = {
    id: data.areaCode + 'bar-hover-pop',
    groupId: 'bar-hover-pop',
    userData: JSON.stringify(data),
    coordinate: data.coordinates,
    anchors: [-0.5, -1], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [1, 1], //图片的尺寸
    range: [1, 1000000], //可视范围
    imagePath: `${getHtmlUrl()}/static/images/barEllipse.png`, //显示图片路径
    useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
    popupURL: mPopUpUrl,
    popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
    autoHidePopupWindow: false,
    popupSize: [150, 52],
    popupOffset: [-75, -contentHeight / 5 - 52], //弹窗偏移
    autoHeight: false, // 自动判断下方是否有物体
    displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
  };
  await aircityObj.value.acApi.marker.add(marker);
  aircityObj.value.acApi.marker.showPopupWindow(marker.id, async () => {
    if (!chartHover) {
      aircityObj.value.acApi.marker.hidePopupWindow(marker.id);
      aircityObj.value.acApi.marker.deleteByGroupId('bar-hover-pop');
    }
  });
};

const getBarPositionByQuName = (quName: string) => {
  let quItem = barPositionBak.filter((item) => {
    return item.properties.QUNAME === quName;
  });
  return quItem[0].geometry.coordinates;
};

const addBar = async (type: 'qu' | 'jd', res: [], streetCode?: string, equipType = 0) => {
  await aircityObj.value.acApi.marker.deleteByGroupId('rectBar');
  const dataCode = equipType
    ? ['stationPlanNum', 'stationBuildNum', 'stationOperateNum']
    : ['equipmentPlanNum', 'equipmentBuildNum', 'equipmentOperateNum'];
  chartHover = false;
  let barArr = [];
  const fileName = type === 'qu' ? 'barPosition4547' : 'jdBarPosition4547';
  let stationCount = res.map((item) => {
    return Math.max(...dataCode.map((o) => +item[o] || 0));
  });
  let yMax = Math.max(...stationCount);
  const res1 = await requestGeojsonData(fileName);

  barPositionBak = res1.features;
  if (type === 'jd') {
    res1.features = res1.features.filter((item) => {
      return item.properties.QUCODE === streetCode;
    });
  }
  res1.features.forEach((item, index) => {
    const countObj: any =
      res.find((i: any) => {
        return type === 'qu'
          ? `${i.areaCode}` == `${item.properties.QUCODE}`
          : `${i.streetId}` == `${item.properties.JDCODE}`;
      }) || {};

    let idEnd = type === 'qu' ? item.properties.QUNAME : item.properties.JDNAME;
    let areaCode = type === 'qu' ? item.properties.QUCODE : item.properties.JDCODE + '';

    const itemMax = Math.max(...dataCode.map((o) => +countObj[o] || 0));
    let contentHeight = Math.max((180 * itemMax) / yMax, 60);
    const oPopUpUrl = getPopupHtml({
      usePopupHtml: true,
      com: 'rect-bar3',
      params: {
        value: JSON.stringify({ ...countObj, coordinates: item.geometry.coordinates, dataCode }),
        yMax: yMax * 1.3,
        contentHeight: contentHeight,
        quName: idEnd,
        areaCode,
        hideToolTip: 1
      }
    });
    let o = {
      id: 'rectBar1-' + idEnd,
      groupId: `rectBar`,
      userData: areaCode,
      coordinate: item.geometry.coordinates,
      anchors: [-0.5, -1], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [1, 1], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: `${getHtmlUrl()}/static/images/barEllipse.png`, //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: oPopUpUrl,
      popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
      autoHidePopupWindow: false,
      popupSize: [100, contentHeight],
      popupOffset: [-50, -(contentHeight + 80) / 5], //弹窗偏移
      autoHeight: false, // 自动判断下方是否有物体
      displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
      // priority: item.properties.PRIORITY
    };
    barArr.push(o);
  });
  await aircityObj.value.acApi.marker.add(barArr, null);
  aircityObj.value.acApi.marker.showAllPopupWindow(null);
};
const changeXzqhColor = (polygonId: string, newVal: [number, number, number, number]) => {
  aircityObj.value.acApi.polygon.setColor(polygonId, newVal);
};
defineExpose({ addBar });

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>
<style lang="less" scoped></style>
