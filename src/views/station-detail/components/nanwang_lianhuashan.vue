<template></template>

<script setup lang="ts">
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import { useMapStore } from '@/stores/map';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import {
  getImageByCloud,
  getHtmlUrl,
  focusToHihtLightPop,
  getTreeLayerIdByName,
  playCamera,
  infoObj
} from '@/global/config/map';
import { getPopupHtml, getStrLength } from '@/utils/index';
import { scale } from '@sutpc/config';
import { transformCoordsByType } from '@/utils/map-coord-tools';
import { facilities, timeRandom, getGuangFuData } from './nanwang_lianhuashan_config';
import { connectorStatusInfo } from '../api.js';
import bus from '@/utils/bus';
import dayjs from 'dayjs';

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
const store = useMapStore();
const visibleStore = useVisibleComponentStore();
let timer;

useEmitt('AIRCITY_EVENT', async (e) => {
  console.log(e, 'AIRCITY_EVENT');
  // 点击站点图标
  if (e.eventtype === 'LeftMouseButtonClick') {
  }

  if (e.eventtype === 'MarkerCallBack') {
  }
});

const handleTabSelect = async (tab) => {
  const viewInfo = tab.viewInfo && JSON.parse(tab.viewInfo);
  viewInfo && __g.camera.set(viewInfo, 2);
  switch (tab.viewInfoType) {
    case 'LHS_CCZ1': // 站内设施
      addFacilitiesLabels(facilities);
      break;
    case 'LHS_CCZ2': // 光伏信息
      addFacilitiesLabels(facilities);
      break;
    case 'LHS_CCZ3': // 视角漫游
  }
};
const resetTab3dt = async () => {};

const enterStation = async () => {
  const id = getTreeLayerIdByName('南网_莲花山充电站', store.treeInfo);
  const actorId = getTreeLayerIdByName('莲花山充电站_静态车辆', store.treeInfo);
  await Promise.allSettled([__g.infoTree.show(id), __g.tileLayer.showAllActors(actorId)]);
};

const exitStation = async () => {
  const id = getTreeLayerIdByName('南网_莲花山充电站', store.treeInfo);
  await __g.infoTree.hide(id);
};

// 查询所有充电桩状态
const queryAllPileStatus = async () => {
  const res = await connectorStatusInfo({
    operatorId: visibleStore.detailParams?.operatorId,
    stationId: visibleStore.detailParams?.stationId
  });
  console.log(res, 'res');
  hideCarByStatus(res.data);
};

// 根据桩状态隐藏车辆
/**
 * @param status
 * 设备状态 0-离网；1-空闲；2-占用(未充放电)；3-占用(充放电中)；4-占用(预约锁定)；5-占用(充放电完成)；255-故障；
 * 状态码[2,3,4,5] // 展示车辆,其他隐藏
 */
const hideCarByStatus = async (data = []) => {
  const id = getTreeLayerIdByName('莲花山充电站_静态车辆', store.treeInfo);
  const actors = await __g.tileLayer.getObjectIDs(id);
  __g.tileLayer.updateBegin();
  actors.data.forEach((el) => {
    el.objectIds.forEach((actorId) => {
      const fd = data.find((o) => o.connectorId === actorId);
      if ([2, 3, 4, 5].includes(+fd?.status)) {
        __g.tileLayer.showActor(id, actorId, null);
      } else {
        __g.tileLayer.hideActor(id, actorId, null);
      }
    });
  });
  __g.tileLayer.updateEnd(null);
};

const showAllPos = async () => {};

const hideAllPos = async () => {};
// 场内设施
const addFacilitiesLabels = async (data = []) => {
  const pointArr = [];
  await __g.marker.deleteByGroupId(facilities[0]?.groupId, null);
  data?.forEach((item, index) => {
    let xoffset = (getStrLength(item.value) * 12) / 2;
    let o1 = {
      id: 'facilitiesLabel-' + item.id,
      groupId: item.groupId,
      userData: JSON.stringify(item),
      coordinate: item.position, //坐标位置
      anchors: [-24, 52], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [48, 52], //图片的尺寸
      range: [1, 1500], //可视范围
      imagePath: getImageByCloud(item.img),
      text: item.value, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 300], //文本可视范围[近裁距离, 远裁距离]
      textOffset: [-xoffset - 24, -35], // 文本偏移
      textBackgroundColor: [11 / 255, 67 / 255, 92 / 255, 1], //文本背景颜色
      fontSize: 14, //字体大小
      fontColor: '#FFFFFF', //字体颜色
      displayMode: 2
    };
    pointArr.push(o1);
  });
  //批量添加点位
  await __g.marker.add(pointArr, null);
};
// 计算光伏板功率
const calcData = () => {
  if (timer) {
    clearInterval(timer);
  }
  const guangFudata = getGuangFuData(0);
  timer = setInterval(() => {
    let percent = 0;
    const hours = dayjs().hour();
    const minutes = dayjs().minute();
    if (hours <= 5 || hours >= 20) {
      percent = 0;
    } else {
      let h = dayjs().format('HH');
      let m = minutes >= 30 ? '30' : '00';
      percent = timeRandom[`${h}:${m}`] / 100;
    }
    state.list = guangFudata.map((item) => {
      const random = Math.random() * 0.05 - 0.05;
      item.calcVal = ((item.value + item.value * random) * percent).toFixed(2);
      return item;
    });
    const data = state.list.find((item) => item.id === state.selectedCurID);
    if (data) {
      bus.emit('calcVal', data.calcVal);
    }
  }, 3000);
};
// 添加光伏板点位

// 定位到充电桩
const focusToPile = async (pile) => {
  console.log(pile, 'pile');
};

bus.on('handleTabSelect', handleTabSelect);
bus.on('resetTab3dt', resetTab3dt);
bus.on('focusToPile', focusToPile);
onMounted(async () => {
  await enterStation();
  // queryAllPileStatus();
});

onBeforeUnmount(async () => {
  bus.off('handleTabSelect');
  bus.off('resetTab3dt');
  bus.off('focusToPile');
  exitStation();
});
</script>

<style scoped></style>
