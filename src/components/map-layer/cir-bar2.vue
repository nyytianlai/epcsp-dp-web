<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import { monthRate } from '@/api/publicService.js';

const aircityObj = inject('aircityObj');

const addBar = async (res: [{ area_code: string; useRatio: string }]) => {
  // const addBar = async () => {
  await aircityObj.value?.acApi.customTag.clear();
  let barArr = [];
  // const { data: res } = await monthRate();

  const res1 = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/barPosition4547.geojson`
  });
  res1.features.forEach((item, index) => {
    let countObj = res.filter((i) => {
      return i.area_code == item.properties.QUCODE;
    });
    let value = countObj.length ? countObj[0].useRatio : 0;
    console.log('value', countObj);
    let o = {
      id: 'rectBar-' + item.properties.QUNAME,
      groupId: 'rectBar',
      userData: item.properties.QUCODE,
      coordinate: item.geometry.coordinates,
      contentURL: `${import.meta.env.VITE_FD_URL}/data/html/cirBar2.html?value=${value}`,
      contentSize: [108, 160], //网页窗口宽高 [width, height]
      pivot: [0.5, 1], // 中心点
      range: [1, 150000] //显示范围：[min, max]
      // autoHidePopupWindow: true //失去焦点后是否自动关闭弹出窗口
    };
    barArr.push(o);
  });
  aircityObj.value?.acApi.customTag.add(barArr);
};
defineExpose({addBar})
onMounted(async () => {
  // addBar();
});

onBeforeUnmount(() => {
  // aircityObj.acApi.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped></style>
