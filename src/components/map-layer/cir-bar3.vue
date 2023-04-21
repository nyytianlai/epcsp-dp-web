<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import { districtAlarmLevelStatics, getMapAreaStationByPower } from '@/api/supervision.js';

const aircityObj = inject('aircityObj');
const __g = aircityObj.acApi;
const addBar = async (code: 1 | 2) => {
  // await __g.customTag.clear();
  let res;
  let valueField: string; //从哪个字段取值
  if (code === 1) {
    res = await districtAlarmLevelStatics();
    valueField = 'cnt';
    console.log('11--districtAlarmLevelStatics');
  } else {
    res = await getMapAreaStationByPower();
    valueField = 'alarmStatusSize';
    console.log('22--getMapAreaStationByPower');
  }
  let barArr = [];
  console.log('柱状图接口', res.data);
  let count = [];
  for (const key in res.data) {
    const element = res.data[key];
    let countItem = element.map((item) => {
      return item[valueField];
    });
    count.push(...countItem);
  }
  // console.log('count', count);

  let yMax = Math.max(...count);

  const res1 = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/barPosition4547.geojson`
  });
  res1.features.forEach((item, index) => {
    let countObj =
      code == 1 ? res.data[item.properties.QUCODE].reverse() : res.data[item.properties.QUCODE];
    let o = {
      id: `rectBar${code}-${item.properties.QUNAME}`,
      groupId: 'rectBar',
      userData: item.properties.QUCODE,
      coordinate: item.geometry.coordinates,
      contentURL: `${import.meta.env.VITE_FD_URL}/data/html/cirBar3.html?value=${
        countObj[0][valueField]
      },${countObj[1][valueField]},${countObj[2][valueField]}&yMax=${yMax}`,
      contentSize: [108, 263], //网页窗口宽高 [width, height]
      pivot: [0.5, 1], // 中心点
      range: [1, 150000] //显示范围：[min, max]
      // autoHidePopupWindow: true //失去焦点后是否自动关闭弹出窗口
    };
    barArr.push(o);
  });
  __g.customTag.add(barArr);
};
defineExpose({ addBar });
onMounted(async () => {
  // addBar();
});

onBeforeUnmount(() => {
  // __g.polygon.delete(["polygon1"]);
});
</script>
<style lang="less" scoped></style>
