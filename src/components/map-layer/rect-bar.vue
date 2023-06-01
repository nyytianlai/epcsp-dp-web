<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import { getRectBar, getRectBarByStreet } from './api.js';
import bus from '@/utils/bus';
import { getHtmlUrl } from '@/global/config/map';

const aircityObj = inject('aircityObj');

const { useEmitt } = aircityObj.value;
let barPositionBak = [];
let currentBar = '';

useEmitt('AIRCITY_EVENT', async (e) => {
  // 编写自己的业务
  console.log('事件监听', e);
  if (e.eventtype === 'MarkerCallBack') {
    let quName = e.ID?.split('-')[1];
    if (e.Data === 'mouseover') {
      //鼠标悬浮事件
      // await aircityObj.value.acApi.marker.setPopupSize(e.ID,[200,290])
      changeXzqhColor('qu-'+quName, [75/255, 222/255, 255/255, 0.6]);
    } else if (e.Data === 'mouseout') {
      // await aircityObj.value.acApi.marker.setPopupSize(e.ID,[80,190])
      changeXzqhColor('qu-'+quName, [75/255, 222/255, 255/255, 0.0]);
    }
  }
});

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

  const res1 = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/${fileName}.geojson`
  });
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
    let contentHeight = 190;

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
      imagePath: `${import.meta.env.VITE_FD_URL}` + '/data/images/barEllipse.png', //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: `${getHtmlUrl()}/static/html/rectBar.html?value=${countObj[0].gunCount},${
        countObj[0].stationCount
      },${countObj[0].equipmentCount}&yMax=${yMax}&contentHeight=${contentHeight}&quName=${idEnd}&areaCode=${areaCode}`, //弹窗HTML链接
      autoHidePopupWindow: false,
      // popupSize: [80, contentHeight], //弹窗大小
      // popupOffset: [-80, -contentHeight / 2.5], //弹窗偏移
      popupSize: [200, contentHeight + 100],
      popupOffset: [-125, -140], //弹窗偏移
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
