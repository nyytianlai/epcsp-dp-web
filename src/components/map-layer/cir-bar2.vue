<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import { districtAlarmLevelStatics } from '@/api/supervision.js';

const aircityObj = inject('aircityObj');

const addBar = async () => {
  await aircityObj.acApi.customTag.clear();
  let barArr = [];
  const { data: res } = await districtAlarmLevelStatics();
  console.log('柱状图接口', res);
  // let gunCount = res.map((item) => {
  //   return item.gunCount;
  // });

  let yMax = 21000; //Math.max(...gunCount);
  // console.log('gunCount', gunCount);

  const res1 = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/barPosition4547.geojson`
  });
  res1.features.forEach((item, index) => {
    // let countObj = res.filter((i) => {
    //   return i.areaCode == item.properties.QUCODE;
    // });
    let countObj = [{ one: 19856, two: 393, three: 147 }];
    let o = {
      id: 'rectBar-' + item.properties.QUNAME,
      groupId: 'rectBar',
      userData: item.properties.QUCODE,
      coordinate: item.geometry.coordinates,
      contentURL: `${import.meta.env.VITE_FD_URL}/data/html/cirBar2.html`,
      contentSize: [108, 200], //网页窗口宽高 [width, height]
      pivot: [0.5, 1], // 中心点
      range: [1, 150000] //显示范围：[min, max]
      // autoHidePopupWindow: true //失去焦点后是否自动关闭弹出窗口
    };
    barArr.push(o);
  });
  aircityObj.acApi.customTag.add(barArr);
};
onMounted(async () => {
  addBar();
});

onBeforeUnmount(() => {
  // aircityObj.acApi.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped></style>
