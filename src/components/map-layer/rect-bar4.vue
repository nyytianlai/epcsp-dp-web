<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import { getHtmlUrl } from '@/global/config/map';
import { requestGeojsonData } from './api.js';
import { getPopupHtml } from '@/utils/index';
import { scale } from '@sutpc/config';

const aircityObj = inject('aircityObj');

const { useEmitt } = aircityObj.value;
let barPositionBak = [];

let chartHover;

// let hightLightPosition = '';

useEmitt('AIRCITY_EVENT', async (e) => {
  // 编写自己的业务
  if (e.eventtype === 'MarkerCallBack') {
    // console.log('事件监听', e);
    let quName = e.ID?.split('-')[1];
    if (e.Data === 'mouseover') {
      //鼠标悬浮事件
      // if (hightLightPosition !== quName) {
      changeXzqhColor('qu-' + quName, [75 / 255, 222 / 255, 255 / 255, 0.6]);
      // hightLightPosition = quName;
      // console.log('11111111','rectBar1-' + quName);

      // await aircityObj.value.acApi.marker.setPriority('rectBar1-' + quName, 9);
      // await aircityObj.value.acApi.marker.hidePopupWindow('rectBar1-' + quName);
      // await aircityObj.value.acApi.marker.showPopupWindow('rectBar1-' + quName);
      // }
    } else if (e.Data === 'mouseout') {
      // if (hightLightPosition !== '') {
      changeXzqhColor('qu-' + quName, [75 / 255, 222 / 255, 255 / 255, 0.0]);

      // setTimeout(async () => {
      //   // await aircityObj.value.acApi.marker.setPriority('rectBar1-' + quName, 1);
      //   await aircityObj.value.acApi.marker.showPopupWindow('rectBar1-' + quName);
      // }, 100);
      // hightLightPosition = '';
      // }
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
    com: 'bar-hover-pop',
    params: {
      value: JSON.stringify(data)
    }
  });
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
    popupSize: [180, 160],
    popupOffset: [-125, -contentHeight / 7 - 140], //弹窗偏移
    autoHeight: false, // 自动判断下方是否有物体
    displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
  };
  await aircityObj.value.acApi.marker.add(marker);
  if (chartHover && show) {
    aircityObj.value.acApi.marker.showPopupWindow(marker.id, async () => {
      if (!chartHover) {
        aircityObj.value.acApi.marker.hidePopupWindow(marker.id);
        aircityObj.value.acApi.marker.deleteByGroupId('bar-hover-pop');
      }
    });
  }
};

const getBarPositionByQuName = (quName: string) => {
  let quItem = barPositionBak.filter((item) => {
    return item.properties.QUNAME === quName;
  });
  return quItem[0].geometry.coordinates;
};

const addBar = async (type: 'qu' | 'jd', res: [], streetId?: string) => {
  chartHover = false;
  let barArr = [];
  const fileName = type === 'qu' ? 'barPosition4547' : 'jdBarPosition4547';
  let stationCount = res.map((item) => {
    return item.cabinet > item.chargingStation ? item.cabinet : item.chargingStation;
  });
  console.log(res, '11111111');
  let yMax = Math.max(...stationCount);
  const res1 = await requestGeojsonData(fileName);

  barPositionBak = res1.features;
  if (type === 'jd') {
    res1.features = res1.features.filter((item) => {
      return item.properties.QUCODE === streetId;
    });
  }
  res1.features.forEach((item, index) => {
    let countObj: any = res.filter((i) => {
      return type === 'qu'
        ? i.areaCode == item.properties.QUCODE
        : i.streetId == item.properties.JDCODE;
    });

    let idEnd = type === 'qu' ? item.properties.QUNAME : item.properties.JDNAME;
    let areaCode = type === 'qu' ? item.properties.QUCODE : item.properties.JDCODE + '';

    const itemMax = Math.max(
      countObj[0]?.cabinet || 0,
      countObj[0]?.chargingStation || 0,
      countObj[0]?.energyStorageStation || 0,
      countObj[0]?.photovoltaic || 0,
      countObj[0]?.powerStation || 0
    );
    let contentHeight = Math.max((160 * itemMax) / yMax, 60);
    const oPopUpUrl = getPopupHtml({
      usePopupHtml: true,
      com: 'rect-bar4',
      params: {
        value: JSON.stringify({ ...countObj[0], coordinates: item.geometry.coordinates }),
        yMax: yMax * 1.5,
        contentHeight: contentHeight + 80,
        quName: idEnd,
        areaCode,
        hideToolTip: 1
      }
    });
    console.log(oPopUpUrl, 'oPopUpUrl');
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
      // popupURL: `${getHtmlUrl()}/popup.html?com=rect-bar4&value=${JSON.stringify(
      //   countObj[0]
      // )}&yMax=${yMax}&contentHeight=${contentHeight}&quName=${idEnd}&areaCode=${areaCode}`, //弹窗HTML链接
      popupURL: oPopUpUrl,
      popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
      autoHidePopupWindow: false,
      popupSize: [180, contentHeight],
      popupOffset: [-125, -(contentHeight + 80) / 5], //弹窗偏移
      autoHeight: false, // 自动判断下方是否有物体
      displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
      // priority: item.properties.PRIORITY
    };
    // if(idEnd=='光明区'){
    //   o['priority']=9
    // }
    barArr.push(o);
  });
  await aircityObj.value.acApi.marker.add(barArr);
  await aircityObj.value.acApi.marker.showAllPopupWindow();
};
const changeXzqhColor = (polygonId: string, newVal: [number, number, number, number]) => {
  aircityObj.value.acApi.polygon.setColor(polygonId, newVal);
};
defineExpose({ addBar });

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>
<style lang="less" scoped></style>
