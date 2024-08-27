<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import { getRectBar, getRectBarByStreet, requestGeojsonData } from './api.js';
import bus from '@/utils/bus';
import { getHtmlUrl } from '@/global/config/map';
import { getPopupHtml } from '@/utils/index';

const aircityObj = inject<any>('aircityObj');

const { useEmitt } = aircityObj.value;
let barPositionBak = [];
let chartHover;

useEmitt('AIRCITY_EVENT', async (e) => {
  // 编写自己的业务
  // console.log('事件监听', e);
  if (e.eventtype === 'MarkerCallBack') {
    let quName = e.ID?.split('-')[1];

    if (e.Data.includes('mouseover-')) {
      const data = JSON.parse(e.Data.split('mouseover-')[1]);
      changeXzqhColor('qu-' + quName, [75 / 255, 222 / 255, 255 / 255, 0.6]);
      chartHover = true;
      drawHoverBarMarker(data, true);
    }

    if (e.Data.includes('mouseout-')) {
      const data = JSON.parse(e.Data.split('mouseout-')[1]);
      changeXzqhColor('qu-' + quName, [75 / 255, 222 / 255, 255 / 255, 0.0]);
      chartHover = false;
      drawHoverBarMarker(data, false);
    }
  }
});
const drawHoverBarMarker = async (data, show = false) => {
  await aircityObj.value.acApi.marker.deleteByGroupId('bar-hover-pop');
  if (!show || !data || !chartHover) return;
  const contentHeight = +data.contentHeight;
  const yMax = +data.yMax;
  const mPopUpUrl = getPopupHtml({
    usePopupHtml: true,
    com: 'rect-bar-hover-pop',
    params: {
      value: JSON.stringify(data)
    }
  });
  const marker = {
    id: 'bar-hover-pop',
    groupId: 'bar-hover-pop',
    userData: JSON.stringify(data),
    coordinate: data.coordinates,
    anchors: [-0.5, 1], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [1, 1], //图片的尺寸
    range: [1, 1000000], //可视范围
    imagePath: `${getHtmlUrl()}/static/images/barEllipse.png`, //显示图片路径
    useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
    popupURL: mPopUpUrl,
    popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
    autoHidePopupWindow: false,
    popupSize: [180, 160],
    popupOffset: [-90, -contentHeight / 2 - 80], //弹窗偏移
    autoHeight: true, // 自动判断下方是否有物体
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

const addBar = async (type: 'qu' | 'jd', streetId?: string) => {
  let barArr = [];
  const { data: res } = type === 'qu' ? await getRectBar() : await getRectBarByStreet(streetId);
  const fileName = type === 'qu' ? 'barPosition4547' : 'jdBarPosition4547';
  let stationCount = res.map((item) => {
    return item.stationCount;
  });

  let yMax = Math.max(...stationCount);

  const res1 = await requestGeojsonData(fileName);

  barPositionBak = res1.features;
  if (type === 'jd') {
    res1.features = res1.features.filter((item) => {
      return item.properties.QUCODE === streetId;
    });
  }
  res1.features.forEach((item, index) => {
    let countObj =
      res.find((i) => {
        return type === 'qu'
          ? i.areaCode == item.properties.QUCODE
          : i.streetId == item.properties.JDCODE;
      }) || {};
    // let contentHeight = 160;
    const itemMax = countObj?.stationCount;
    let contentHeight = Math.max((160 * itemMax) / yMax, 60);
    let idEnd = type === 'qu' ? item.properties.QUNAME : item.properties.JDNAME;
    let areaCode = type === 'qu' ? item.properties.QUCODE : item.properties.JDCODE + '';

    const getCountStr = (count) => {
      return count || '--';
    };
    const oPopUpUrl = getPopupHtml({
      usePopupHtml: true,
      com: 'rect-bar',
      params: {
        value: JSON.stringify({ ...countObj, coordinates: item.geometry.coordinates }),
        yMax,
        contentHeight,
        quName: idEnd,
        areaCode
      }
    });
    let o = {
      id: 'rectBar1-' + idEnd,
      groupId: `rectBar`,
      userData: areaCode,
      coordinate: item.geometry.coordinates,
      anchors: [-41, 19], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [82, 19], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: `${getHtmlUrl()}/static/images/barEllipse.png`, //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      // popupURL: `${getHtmlUrl()}/static/html/rectBar.html?value=${getCountStr(
      //   countObj.gunCount
      // )},${getCountStr(countObj.stationCount)},${getCountStr(
      //   countObj.equipmentCount
      // )},${getCountStr(countObj.esCount)},${getCountStr(countObj.v2gCount)},${getCountStr(
      //   countObj.superCount
      // )}&yMax=${yMax}&contentHeight=${contentHeight}&quName=${idEnd}&areaCode=${areaCode}`, //弹窗HTML链接
      popupURL: oPopUpUrl,
      autoHidePopupWindow: false,
      popupSize: [60, contentHeight],
      popupOffset: [-30 - 41, -contentHeight / 2 + 19], //弹窗偏移
      autoHeight: true, // 自动判断下方是否有物体
      displayMode: 2, //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
      priority: item.properties.PRIORITY
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

onMounted(async () => {
  bus.on('addBar', (e) => {
    addBar(e.type, e.quCode);
  });
});

onBeforeUnmount(() => {
  // aircityObj.acApi.polygon.delete(["polygon1"]);
  bus.off('addBar');
});
</script>
<style lang="less" scoped></style>
