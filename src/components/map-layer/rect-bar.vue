<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import { getRectBar, getRectBarByStreet } from '@/api/overall.js';
import bus from '@/utils/bus';

const aircityObj = inject('aircityObj');

const addBar = async (type: 'qu' | 'jd', streetId?: string) => {
  // await aircityObj.acApi.customTag.clear();
  let barArr = [];
  const { data: res } = type === 'qu' ? await getRectBar() : await getRectBarByStreet(streetId);
  const fileName = type === 'qu' ? 'barPosition4547' : 'jdBarPosition4547';
  console.log('柱状图接口', res);
  let gunCount = res.map((item) => {
    return item.gunCount;
  });

  let yMax = Math.max(...gunCount);
  console.log('gunCount', gunCount);

  const res1 = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/${fileName}.geojson`
  });
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
    // console.log('countObj', countObj);

    let idEnd = type === 'qu' ? item.properties.QUNAME : item.properties.JDNAME;
    let userData = type === 'qu' ? item.properties.QUCODE : item.properties.JDCODE + '';
    let o = {
      id: 'rectBar-' + idEnd,
      groupId: 'rectBar',
      userData: userData,
      coordinate: item.geometry.coordinates,
      contentURL: `${import.meta.env.VITE_FD_URL}/data/html/rectBar.html?value=${
        countObj[0].gunCount
      },${countObj[0].stationCount},${countObj[0].equipmentCount}&yMax=${yMax}`,
      contentSize: [169, 250], //网页窗口宽高 [width, height]
      pivot: [0.5, 1], // 中心点
      range: [1, 150000] //显示范围：[min, max]
      // autoHidePopupWindow: true //失去焦点后是否自动关闭弹出窗口
    };
    barArr.push(o);
  });
  aircityObj.value.acApi.customTag.add(barArr);
};
onMounted(async () => {
  addBar('qu');
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
