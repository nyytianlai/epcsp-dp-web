<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-26 16:35:27
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-09 09:56:11
 * @FilePath: \epcsp-dp-web\src\views\station-detail\components\map-layer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BaoQing v-if="currentHrStationID === '-1'" />
  <LianHuaPopup v-if="currentHrStationID === '-2'" />
  <HongLiXi v-if="currentHrStationID === '-3'" />
  <HonglixiPopup v-if="currentHrStationID === '-3'" />
</template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import {
  getImageByCloud,
  control3dts,
  add3dt,
  delete3dt,
  isShowActors,
  getTreeLayerIdByName
} from '@/global/config/map';
import { selectCameraByStationId } from '../api.js';
import bus from '@/utils/bus';
import { ceilingId, currentLabel, facilitiesLabel, chargeIcon } from '../config.js';
import { useMapStore } from '@/stores/map';
import BaoQing from './baiqing.vue';
import HongLiXi from './honglixi.vue';
import LianHuaPopup from './lianhua-popup.vue';
import HonglixiPopup from './honglixi-popup.vue';
import { getStrLength } from '@/utils/index';
const store = useVisibleComponentStore();
const mapStore = useMapStore();
const requestTimer = computed(() => mapStore.requestTimer);
const currentHrStationID = computed(() => {
  if (mapStore.currentHrStationID.split('-').length === 3) {
    return '-' + mapStore.currentHrStationID.split('-')[2];
  } else {
    return mapStore.currentHrStationID.split('-')[1];
  }
}); //当前点击的高渲染站点id
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const params = {
  operatorId: '398461164' || store.detailParams?.operatorId,
  stationId: '118' || store.detailParams?.stationId
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
      anchors: [-24, 52], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [48, 52], //图片的尺寸
      range: [1, 1500], //可视范围
      imagePath: getImageByCloud('camera'),
      fixedSize: true,
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
    await resetCarChargingAnimation();
    await __g.misc.callBPFunction({
      //车辆移动
      objectName: 'BP_Taxi_backUp_2',
      functionName: 'Event_Move_Car'
    });
  }, 4000);
  mapStore.changeRequestTimer(
    setTimeout(async () => {
      // await __g.misc.callBPFunction({
      //   //桩充电插上车
      //   objectName: 'BP_GroupActor2',
      //   functionName: 'SetMeshHidden',
      //   paramType: 0,
      //   paramValue: false
      // });
      __g.marker.show('chargeIcon');
      carChargingCameraTour();
    }, 18000)
  );
};
const resetCarChargingAnimation = async () => {
  await __g.misc.callBPFunction({
    objectName: 'BP_GroupActor2',
    functionName: 'SetMeshHidden',
    paramType: 0,
    paramValue: true
  });
  __g.marker.hide('chargeIcon');
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
      [504725.026719, 2499660.45375, 114.91292],
      [-57.085739, 55.926083, 0]
    )
  );
  frames.push(
    new CameraTourKeyFrame(
      1,
      3.0,
      [504738.923594, 2499643.70875, 98.432363],
      [-14.819693, -176.014069, 0.000002]
    )
  );

  let o = new CameraTourData('1', 'carChargingCameraTour', frames);
  await __g.cameraTour.add(o);
  __g.cameraTour.play('1');
};
const addChageingIcon = async (data, id?: string) => {
  const pointArr = [];
  data.forEach((element) => {
    let o1 = {
      id: element.id,
      groupId: 'stationChargeIcon',
      coordinate: element.coord, //坐标位置
      anchors: [-22, 93.6], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [44, 93.6], //图片的尺寸
      range: [1, 100], //可视范围
      imagePath: `${import.meta.env.VITE_FD_FileURL}/data/images/charge.gif`,
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      displayMode: 0,
      occlusionCull: true
    };
    pointArr.push(o1);
  });
  await __g.marker.add(pointArr, null);
};
//电流流转
const currentPath = async (isShow: boolean) => {
  let id = getTreeLayerIdByName('118电流流转', mapStore.treeInfo);
  await control3dts(__g, [id], isShow);
  addCurrentLabel();
  isShowActors(__g, getTreeLayerIdByName('118Station', mapStore.treeInfo), ceilingId(), false); //设置棚顶的样式
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
const addFacilitiesLabel = async (id) => {
  const pointArr = [];
  facilitiesLabel(id).forEach((item, index) => {
    // console.log(item.value,getStrLength(item.value));

    let xoffset = (getStrLength(item.value) * 12 + 30) / 2;
    let o1 = {
      id: item.type && item.type === 'hongli' ? item.id : 'facilitiesLabel-' + item.id,
      groupId: 'stationFacilitiesLabel',
      userData: JSON.stringify(item),
      coordinate: item.position, //坐标位置
      anchors: [-24, 52], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [48, 52], //图片的尺寸
      range: [1, 1500], //可视范围
      imagePath: getImageByCloud(item.img),
      text: item.value, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 300], //文本可视范围[近裁距离, 远裁距离]
      textOffset: [-xoffset, -35], // 文本偏移
      textBackgroundColor: [11 / 255, 67 / 255, 92 / 255, 1], //文本背景颜色
      fontSize: 14, //字体大小
      fontColor: '#FFFFFF', //字体颜色
      displayMode: 2
    };
    pointArr.push(o1);
  });
  //批量添加polygon
  await __g.marker.add(pointArr, null);
  const isShowLabelId = ['-2', '-3'];
  if (!isShowLabelId.includes(currentHrStationID.value)) {
    await __g.marker.hideByGroupId('stationFacilitiesLabel');
  }
};
const resetTab3dt = async () => {
  if (requestTimer.value !== null) {
    clearTimeout(requestTimer.value);
  }
  let id = getTreeLayerIdByName('118电流流转', mapStore.treeInfo);
  control3dts(__g, [id], false);
  delete3dt(__g, ['NewYYSFB']);
  isShowActors(__g, getTreeLayerIdByName('118Station', mapStore.treeInfo), ceilingId(), true); //设置棚顶的样式
  await __g.marker.deleteByGroupId('stationCurrentLabel');
  await __g.marker.deleteByGroupId('stationCameras');
};
onMounted(() => {
  if (mapStore.currentHrStationID !== '') {
    addFacilitiesLabel(currentHrStationID.value);
    addChageingIcon(chargeIcon());
  }
  bus.on('handleTabSelect', async (e) => {
    if (currentHrStationID.value === '-1') {
    } else {
      //一级菜单栏切换
      await resetTab3dt();
      if (e?.viewCode === 'v2') {
        //站内设施
        currentHrStationID.value == '118' ? getCameraData() : '';
        __g.marker.showByGroupId('stationFacilitiesLabel');
      } else if (e?.viewCode === 'v3') {
        //车辆充电
        carChargingAnimation();
      } else if (e?.viewCode === 'v4') {
        currentPath(true);
      } else if (e?.viewCode === 'v5') {
        operatorDistribution(true);
      }
    }
  });
  bus.on('resetTab3dt', () => {
    resetTab3dt();
  });
});
onBeforeUnmount(() => {
  __g.marker.deleteByGroupId('stationFacilitiesLabel');
  __g.marker.deleteByGroupId('warningPointGroup');
  bus.off('handleTabSelect');
  resetTab3dt();
});
</script>
<style lang="less" scoped></style>
