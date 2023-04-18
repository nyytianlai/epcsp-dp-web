<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';

const aircityObj = inject('aircityObj');

const addBar = async () => {
  // await aircityObj.acApi.customTag.clear();
  let barArr = [];
  const res = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/barPosition4547.geojson`
  });
  res.features.forEach((item, index) => {
    let o = {
      id: 'rectBar-' + item.properties.QUNAME,
      groupId: 'rectBar',
      coordinate: item.geometry.coordinates,
      contentURL: `${import.meta.env.VITE_FD_URL}/data/html/rectBar.html`,
      contentSize: [169, 112], //网页窗口宽高 [width, height]
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
