<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import request from '@sutpc/axios';
import { districtAlarmLevelStatics, getMapStationStatistic } from './api.js';
import { getHtmlUrl } from '@/global/config/map';

const aircityObj = inject('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;

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

const changeXzqhColor = (polygonId: string, newVal: [number, number, number, number]) => {
  __g.polygon.setColor(polygonId, newVal);
};

const addBar = async (obj: {
  code: 1 | 2;
  type: 'qu' | 'jd';
  stationType: [];
  quCode?: string;
}) => {
  let res;
  let count = [];
  let countIsZero = []; //存储值都是0的区域 都是0的话 不在图上展示柱状图
  if (obj.code === 1) {
    res = await districtAlarmLevelStatics(obj.quCode, obj.stationType);
    for (const key in res.data) {
      const element = res.data[key];
      let countItem = element
        .map((item) => {
          return item.cnt;
        })
        .reduce(function (prev, cur) {
          return prev + cur;
        }, 0);
      count.push(countItem);
      if (obj.type === 'jd') {
        countItem ? '' : countIsZero.push(element[0].streetCode);
      } else {
        countItem ? '' : countIsZero.push(element[0].areaCode + '');
      }
    }
    console.log('11--districtAlarmLevelStatics');
  } else {
    res = await getMapStationStatistic(obj.quCode, obj.stationType);
    res.data.forEach((element) => {
      let countItem = 0;
      ['normalCount', 'warningCount', 'offlineCount'].forEach((i) => {
        if (element[i]) {
          countItem = countItem + element[i];
        }
      });
      if (obj.type === 'jd') {
        countItem ? '' : countIsZero.push(element.streetCode);
      } else {
        countItem ? '' : countIsZero.push(element.areaCode + '');
      }
      count.push(countItem);
    });
    console.log('22--getMapAreaStationByPower');
  }
  let barArr = [];
  console.log('柱状图接口', res.data);
  let yMax = Math.max(...count);
  const fileName = obj.type === 'qu' ? 'barPosition4547' : 'jdBarPosition4547';
  const res1 = await request.get({
    url: `http://${import.meta.env.VITE_FD_URL}/data/geojson/${fileName}.geojson`
  });
  if (obj.type === 'jd') {
    res1.features = res1.features.filter((item) => {
      return item.properties.QUCODE === obj.quCode;
    });
  }
  res1.features.forEach((item, index) => {
    let countObj;
    let field = obj.type == 'qu' ? 'QUCODE' : 'JDCODE';
    let value;
    // console.log('gggggggg', countIsZero, item.properties.QUCODE);
    if (
      countIsZero.includes(item.properties.QUCODE) ||
      countIsZero.includes(item.properties.JDCODE+'')
    ) {
      return;
    }
    if (obj.code == 1) {
      countObj = res.data[item.properties[field]];
      // console.log(countObj);

      if (!countObj) {
        return;
      }
      let a = countObj.filter((ele) => {
        return ele.alarmLevel === '1';
      });
      let b = countObj.filter((ele) => {
        return ele.alarmLevel === '2';
      });
      let c = countObj.filter((ele) => {
        return ele.alarmLevel === '3';
      });
      let data1 = a.length ? a[0].cnt : 0; //1级
      let data2 = b.length ? b[0].cnt : 0; //2级
      let data3 = c.length ? c[0].cnt : 0; //3级
      value = `${data1},${data2},${data3},`;
    } else {
      countObj = res.data.filter((i) => {
        return i.areaCode == item.properties[field] || i.streetCode == item.properties[field];
      });
      if (!countObj) {
        return;
      }
      let data1 = countObj[0].normalCount ? countObj[0].normalCount : 0;
      let data2 = countObj[0].warningCount ? countObj[0].warningCount : 0;
      let data3 = countObj[0].offlineCount ? countObj[0].offlineCount : 0;
      value = `${data1},${data2},${data3},`;
    }

    let contentHeight = 190;
    let idEnd = obj.type === 'qu' ? item.properties.QUNAME : item.properties.JDNAME;
    let areaCode = obj.type === 'qu' ? item.properties.QUCODE : item.properties.JDCODE + '';

    let o = {
      id: `rectBar${obj.code}-${idEnd}`,
      groupId: `rectBar-${obj.type}`,
      userData: areaCode,
      coordinate: item.geometry.coordinates,
      anchors: [-41, 19], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [82, 38], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: `${import.meta.env.VITE_FD_URL}` + '/data/images/barEllipse.png', //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: `${getHtmlUrl()}/static/html/cirBar3.html?value=${value}&yMax=${yMax}&colorType=${
        obj.code
      }&areaCode=${areaCode}&quName=${idEnd}&contentHeight=${contentHeight}`, //弹窗HTML链接
      autoHidePopupWindow: false,
      popupSize: [200, contentHeight + 100],
      popupOffset: [-88, -80], //弹窗偏移
      autoHeight: false, // 自动判断下方是否有物体
      displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
    };
    barArr.push(o);
  });
  await __g.marker.add(barArr);
  await __g.marker.showAllPopupWindow();
};
defineExpose({ addBar });
onMounted(async () => {});

onBeforeUnmount(() => {});
</script>
<style lang="less" scoped></style>
