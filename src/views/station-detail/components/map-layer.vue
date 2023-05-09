<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-26 16:35:27
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-09 09:44:10
 * @FilePath: \epcsp-dp-web\src\views\station-detail\components\map-layer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { getImageByCloud, control3dts, add3dt, delete3dt, isShowActors } from '@/global/config/map';
import { selectCameraByStationId } from '@/api/stationDetail.js';
import bus from '@/utils/bus';
import { ceilingId, currentLabel, facilitiesLabel } from '../config.js';

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
      coordinateType: 1,
      coordinate: [item.cameraLng, item.cameraLat], //坐标位置
      anchors: [-12, 26], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [24, 26], //图片的尺寸
      range: [1, 1500], //可视范围
      imagePath: getImageByCloud('camera'),
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      displayMode: 2,
      autoHeight: true
    };
    pointArr.push(o1);
  });
  //批量添加polygon
  await __g.marker.add(pointArr, null);
};
//车辆充电动画
const carChargingAnimation = async () => {
  setTimeout(async () => {
    await __g.misc.callBPFunction({
      objectName: 'BP_PlaySequence_2',
      functionName: 'PlaySequence'
    });
    // await __g.misc.callBPFunction({
    //   objectName: 'BP_Move2_5',
    //   functionName: 'BeginMove'
    // });
    await control3dts(
      __g,
      ['106461804A48EF11238C788590C41BA0', 'CDBA07094FEF9E795D850591ADB5D497'],
      true
    );
    setTimeout(async () => {
      //   await __g.misc.callBPFunction({
      //   objectName: '052697',
      //   functionName: 'SetMeshHidden ',
      //   paramType: 0,
      //   paramValue: true
      // });
      carChargingCameraTour();
    }, 10000);
  }, 4000);
};
const carChargingCameraTour = async () => {
  await __g.cameraTour.delete('1');
  //通过接口添加导览并播放
  let frames = [];
  //注意：rocation属可选参数，若不传入则相机朝向会根据相机的连续位置自动计算
  frames.push(
    new CameraTourKeyFrame(
      0,
      0,
      [504704.88390625, 2499655.3351562503, 114.912919921875],
      [-57.08574295043945, 55.92612838745117, 0]
    )
  );
  frames.push(
    new CameraTourKeyFrame(
      1,
      3.0,
      [504709.416875, 2499646.40921875, 96.09150390625],
      [-28.3896789, 90.26435852050781, 0]
    )
  );

  let o = new CameraTourData('1', 'carChargingCameraTour', frames);
  await __g.cameraTour.add(o);
  __g.cameraTour.play('1');
};
const currentPathCameraTour = async () => {
  await __g.cameraTour.delete('2');
  //通过接口添加导览并播放
  let frames = [];
  //注意：rocation属可选参数，若不传入则相机朝向会根据相机的连续位置自动计算
  frames.push(
    new CameraTourKeyFrame(
      0,
      0,
      [504794.62703125, 2499537.379472656, 107.731845703125],
      [-42.052947998046875, -88.0236587524414, 0]
    )
  );
  frames.push(
    new CameraTourKeyFrame(
      1,
      4.0,
      [504784.727265625, 2499566.4553125002, 123.267548828125],
      [-44.999977111816406, -91.69781494140625, 0]
    )
  );
  frames.push(
    new CameraTourKeyFrame(
      2,
      6.0,
      [504608.0959375, 2499591.229140625, 182.93339843750002],
      [-33.08489990234375, -31.16402816772461, 0]
    )
  );

  let o = new CameraTourData('2', 'currentPathCameraTour', frames);
  await __g.cameraTour.add(o);
  __g.cameraTour.play('2');
};
//电流流转
const currentPath = async (isShow: boolean) => {
  await control3dts(__g, ['7FE772F144B492908689359AF808E6F1'], isShow);
  currentPathCameraTour();
  isShowActors(__g, '7CED6A4A4F00FFA1B7273C9511B55B85', ceilingId(), false); //设置棚顶的样式
  addCurrentLabel();
};

const addCurrentLabel = async () => {
  const pointArr = [];
  currentLabel().forEach((item, index) => {
    let o1 = {
      id: 'currentLabel-' + index,
      groupId: 'stationCurrentLabel',
      coordinate: item.position, //坐标位置
      anchors: [0, 0], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [0, 0], //图片的尺寸
      range: [1, 1500], //可视范围
      imagePath: getImageByCloud('camera'),
      text: item.value, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 1500], //文本可视范围[近裁距离, 远裁距离]
      textBackgroundColor: [84 / 255, 169 / 255, 51 / 255, 0.64], //文本背景颜色
      fontSize: 16, //字体大小
      fontColor: '#FFFFFF', //字体颜色
      displayMode: 2
    };
    pointArr.push(o1);
  });
  //批量添加polygon
  await __g.marker.add(pointArr, null);
};

//运营商分布
const operatorDistribution = async (isShow: boolean) => {
  add3dt(__g, 'NewYYSFB');
};
//站内设施加点
const addFacilitiesLabel = async () => {
  const pointArr = [];
  facilitiesLabel().forEach((item, index) => {
    let o1 = {
      id: 'facilitiesLabel-' + index,
      groupId: 'stationFacilitiesLabel',
      coordinate: item.position, //坐标位置
      anchors: [-24, 52], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [48, 52], //图片的尺寸
      range: [1, 1500], //可视范围
      imagePath: getImageByCloud(item.img),
      text: item.value, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 300], //文本可视范围[近裁距离, 远裁距离]
      textOffset: [-60, -35], // 文本偏移
      textBackgroundColor: [11 / 255, 67 / 255, 92 / 255, 1], //文本背景颜色
      fontSize: 14, //字体大小
      fontColor: '#FFFFFF', //字体颜色
      displayMode: 2
    };
    pointArr.push(o1);
  });
  //批量添加polygon
  await __g.marker.add(pointArr, null);
};
const resetTab3dt = async () => {
  control3dts(__g, ['7FE772F144B492908689359AF808E6F1', '106461804A48EF11238C788590C41BA0'], false);
  delete3dt(__g, ['NewYYSFB']);
  isShowActors(__g, '7CED6A4A4F00FFA1B7273C9511B55B85', ceilingId(), true); //设置棚顶的样式
  await __g.marker.deleteByGroupId('stationCurrentLabel');
  // __g.marker.deleteByGroupId('stationFacilitiesLabel');
};
onMounted(() => {
  getCameraData();
  addFacilitiesLabel();
  bus.on('handleTabSelect', async (e) => {
    //一级菜单栏切换
    await resetTab3dt();
    if (e?.value === '2') {
      //站内设施
    } else if (e?.value === '3') {
      //车辆充电
      carChargingAnimation();
    } else if (e?.value === '4') {
      currentPath(true);
    } else if (e?.value === '5') {
      operatorDistribution(true);
    }
  });
  bus.on('resetTab3dt', () => {
    resetTab3dt();
  });
});
onBeforeUnmount(() => {
  __g.marker.deleteByGroupId('stationCameras');
  __g.marker.deleteByGroupId('warningPointGroup');
  bus.off('handleTabSelect');
  resetTab3dt();
});
</script>
<style lang="less" scoped></style>
