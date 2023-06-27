<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import { getEquipmentBar, getEquipmentBarByStreet,requestGeojsonData } from './api.js';
import { getHtmlUrl } from '@/global/config/map';

const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;

const addBar = async (obj: { code: 1 | 2; type: 'qu' | 'jd'; chargeType: []; quCode?: string }) => {
  let res;
  console.log('chargeTypeCollet', obj.chargeType);
  if (obj.type === 'qu') {
    res = await getEquipmentBar({
      chargeType: obj.chargeType,
      equipmentType: obj.code //1桩 2枪
    });
  } else {
    res = await getEquipmentBarByStreet({
      areaCode: obj.quCode,
      chargeType: obj.chargeType,
      equipmentType: obj.code //1桩 2枪
    });
  }
  console.log('柱状图接口', res.data);
  let count = [];
  let countIsZero = []; //存储值都是0的区域 都是0的话 不在图上展示柱状图
  res.data.forEach((element) => {
    let countItem = 0;
    element.v2GCount = element.v2GCount ? element.v2GCount * 300 : 0;
    ['noQuickCount', 'quickCount', 'superCount', 'v2GCount'].forEach((i) => {
      if (element[i]) {
        countItem = countItem + element[i];
      }
    });
    if(obj.type === 'jd'){
      countItem ? '' : countIsZero.push(element.streetId);
    }else{
      countItem ? '' : countIsZero.push(element.areaCode+'');
    }
    count.push(countItem);
  });

  // console.log('count', count);

  let yMax = Math.max(...count);
  const fileName = obj.type === 'qu' ? 'barPosition4547' : 'jdBarPosition4547';
  const res1 =await requestGeojsonData(fileName);
  if (obj.type === 'jd') {
    res1.features = res1.features.filter((item) => {
      return item.properties.QUCODE === obj.quCode;
    });
  }
  let barArr = [];
  res1.features.forEach((item, index) => {
    let countObj;
    if (obj.type == 'qu') {
      countObj = res.data.filter((i) => {
        return i.areaCode == item.properties.QUCODE;
      });
    } else {
      countObj = res.data.filter((i) => {
        return i.streetId == item.properties.JDCODE;
      });
    }
    console.log('countObj',countIsZero,item.properties.JDCODE, JSON.stringify(countObj[0]));
    if (countIsZero.includes(item.properties.QUCODE) || countIsZero.includes(item.properties.JDCODE)) {
      return;
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
      imagePath: `${getHtmlUrl()}/static/images/barEllipse.png`, //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: `${getHtmlUrl()}/static/html/cirBar4.html?value=${JSON.stringify(
        countObj[0]
      )}&yMax=${yMax}&contentHeight=${contentHeight}&areaCode=${areaCode}`, //弹窗HTML链接
      autoHidePopupWindow: false,
      popupSize: [88, contentHeight],
      popupOffset: [-88, -80], //弹窗偏移
      autoHeight: false, // 自动判断下方是否有物体
      displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
    };
    barArr.push(o);
  });
  await __g.marker.deleteByGroupId(`rectBar-jd`);
  await __g.marker.deleteByGroupId(`rectBar-qu`);
  await __g.marker.add(barArr);
  await __g.marker.showAllPopupWindow();
};
defineExpose({ addBar });
onMounted(async () => {});

onBeforeUnmount(() => {});
</script>
<style lang="less" scoped></style>
