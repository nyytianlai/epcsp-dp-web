<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import { monthRate } from '@/api/publicService.js';

const aircityObj = inject('aircityObj');

const addBar = async (
  res: [{ area_code: string; useRatio: string }],
  type: 'qu' | 'jd',
  quCode?: string
) => {
  let barArr = [];
  const fileName = type === 'qu' ? 'barPosition4547' : 'jdBarPosition4547';

  const res1 = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/${fileName}.geojson`
  });
  if (type === 'jd') {
    res1.features = res1.features.filter((item) => {
      return item.properties.QUCODE === quCode;
    });
  }
  res1.features.forEach((item, index) => {
    let countObj = res.filter((i) => {
      return type === 'qu'
        ? i.area_code == item.properties.QUCODE
        : i.area_code == item.properties.JDCODE;
    });
    let value = countObj.length ? countObj[0].useRatio : 0;
    let idEnd = type === 'qu' ? item.properties.QUNAME : item.properties.JDNAME;
    let userData = type === 'qu' ? item.properties.QUCODE : item.properties.JDCODE + '';
    console.log('value', countObj);
    let o = {
      id: 'rectBar-' + idEnd,
      groupId: 'rectBar',
      userData: userData,
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
defineExpose({ addBar });
onMounted(async () => {
  // addBar();
});

onBeforeUnmount(() => {
  // aircityObj.acApi.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped></style>
