<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import { districtAlarmLevelStatics, getMapAreaStationByPower } from './api.js';

const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const addBar = async (code: 1 | 2, type: 'qu' | 'jd', quCode?: string) => {
  let res;
  let valueField: string; //从哪个字段取值
  if (code === 1) {
    res = await districtAlarmLevelStatics(quCode);
    valueField = 'cnt';
    console.log('11--districtAlarmLevelStatics');
  } else {
    res = await getMapAreaStationByPower(quCode);
    valueField = 'alarmStatusSize';
    console.log('22--getMapAreaStationByPower');
  }
  let barArr = [];
  console.log('柱状图接口', res.data);
  let count = [];
  for (const key in res.data) {
    const element = res.data[key];
    let countItem = element
      .map((item) => {
        return item[valueField];
      })
      .reduce(function (prev, cur) {
        return prev + cur;
      }, 0);
    count.push(countItem);
  }
  console.log('count', count);

  let yMax = Math.max(...count);
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
    let countObj;
    if (type == 'qu') {
      countObj =
        code == 1 ? res.data[item.properties.QUCODE] : res.data[item.properties.QUCODE].reverse();
    } else {
      countObj =
        code == 1 ? res.data[item.properties.JDCODE] : res.data[item.properties.JDCODE].reverse();
    }
    let sum = countObj
      .map((item) => {
        return item[valueField];
      })
      .reduce(function (prev, cur) {
        return prev + cur;
      }, 0);
    // console.log('sum', sum);

    let contentHeight = (sum / yMax) * 180 + 83;
    // let contentHeight = 263;
    // console.log('countObj', countObj);
    let idEnd = type === 'qu' ? item.properties.QUNAME : item.properties.JDNAME;
    let userData = type === 'qu' ? item.properties.QUCODE : item.properties.JDCODE + '';
    let o = {
      id: `rectBar${code}-${idEnd}`,
      groupId: 'rectBar',
      userData: userData,
      coordinate: item.geometry.coordinates,
      contentURL: `${import.meta.env.VITE_FD_URL}/data/html/cirBar3.html?value=${
        countObj[0][valueField]
      },${countObj[1][valueField]},${countObj[2][valueField]}&yMax=${yMax}&colorType=${code}`,
      contentSize: [88, contentHeight], //网页窗口宽高 [width, height] 263
      pivot: [0.5, 1], // 中心点
      range: [1, 150000] //显示范围：[min, max]
      // autoHidePopupWindow: true //失去焦点后是否自动关闭弹出窗口
    };
    barArr.push(o);
  });
  __g.customTag.add(barArr);
};
defineExpose({ addBar });
onMounted(async () => {});

onBeforeUnmount(() => {});
</script>
<style lang="less" scoped></style>
