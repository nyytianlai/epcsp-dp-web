<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-26 16:35:27
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-26 17:42:02
 * @FilePath: \epcsp-dp-web\src\views\station-detail\components\map-layer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { getImageByCloud } from '@/global/config/map';
import { selectCameraByStationId } from '@/api/stationDetail.js';
import bus from '@/utils/bus';

const store = useStore();
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const params = {
  operatorId: '398461164' || store.getters.detailParams?.operatorId,
  stationId: '118' || store.getters.detailParams?.stationId
};
const getCameraData = async () => {
  const res = await selectCameraByStationId(params);
  if (res?.data?.length) {
    addCameraPoint(res.data);
  }
};
//添加区的点 isHr 0-是高渲染站点；1-否
const addCameraPoint = async (data) => {
  const pointArr = [];
  data.forEach((item, index) => {
    let o1 = {
      id: 'camera-' + item.cameraId,
      groupId: 'stationCameras',
      userData: JSON.stringify(item),
      coordinateType: 2,
      coordinate: [item.cameraLng, item.cameraLat], //坐标位置
      anchors: [-13, 150], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [26, 41], //图片的尺寸
      range: [1, 150000], //可视范围
      imagePath: getImageByCloud('camera'),
      //   text: item.stationName, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      // textRange: [1, 1500], //文本可视范围[近裁距离, 远裁距离]
      // textOffset: [-20 - xoffset, -85], // 文本偏移
      // textBackgroundColor: [0 / 255, 46 / 255, 66 / 255, 0.8], //文本背景颜色
      fontSize: 16, //字体大小
      fontOutlineSize: 1, //字体轮廓线大小
      fontColor: '#FFFFFF', //字体颜色
      // fontOutlineColor: '#1b4863', //字体轮廓线颜色
      displayMode: 2,
      autoDisplayModeSwitchFirstRatio: 0.5,
      autoDisplayModeSwitchSecondRatio: 0.5,
      // displayMode: 4,
      // autoDisplayModeSwitchFirstRatio: 0.5,
      // autoDisplayModeSwitchSecondRatio: 0.5,
      autoHeight: true
    };
    pointArr.push(o1);
  });
  //批量添加polygon
  await __g.marker.add(pointArr, null);
};
//车辆充电动画
const carChargingAnimation = () => {
  setTimeout(() => {
    __g.misc.callBPFunction({
      objectName: 'BP_PlaySequence_2',
      functionName: 'PlaySequence'
    },()=>{
      __g.camera.playAnimation(3);
    });
  }, 5000);
};
onMounted(() => {
  getCameraData();
  bus.on('handleTabSelect', (e) => {
    // 传参由回调函数中的形参接受
    console.log('菜单栏切换', e);
    if (e.value === '2') {
      //站内设施
    } else if (e.value === '3') {
      //车辆充电
      carChargingAnimation();
    } else if (e.value === '4') {
    } else if (e.value === '5') {
    }
  });
});
onBeforeUnmount(() => {
  __g.marker.deleteByGroupId('stationCameras');
  bus.off('handleTabSelect');
});
</script>
<style lang="less" scoped></style>
