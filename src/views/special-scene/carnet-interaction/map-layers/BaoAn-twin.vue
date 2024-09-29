<template></template>

<script setup lang="ts">
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import { useMapStore } from '@/stores/map';
import {
  getImageByCloud,
  getHtmlUrl,
  focusToHihtLightPop,
  getTreeLayerIdByName,
  playCamera,
  infoObj
} from '@/global/config/map';
import { getPopupHtml } from '@/utils/index';
import { scale } from '@sutpc/config';
import { transformCoordsByType } from '@/utils/map-coord-tools';
import { connectorStatusInfo } from '@/views/station-detail/api.js';
import { useVisibleComponentStore } from '@/stores/visibleComponent';

import bus from '@/utils/bus';
import Api from '../api';

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
const store = useMapStore();
const visibleStore = useVisibleComponentStore();

let v2gTimer;
let nyxnTimer;
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
  await __g.cameraTour.stop();
  tab.viewInfo && (await __g.camera.set(...JSON.parse(tab.viewInfo)));
  const id = getTreeLayerIdByName('V2G放电', store.treeInfo);
  const id2 = getTreeLayerIdByName('能源消纳', store.treeInfo);
  const id3 = getTreeLayerIdByName('宝安区政府站点_植被', store.treeInfo);
  const id5 = getTreeLayerIdByName('场内设施Icon_微观', store.treeInfo);
  await Promise.allSettled([__g.tileLayer.hide(id3), __g.tileLayer.show(id5)]);
  switch (tab.viewInfoType) {
    case 'BAOAN_1': // V2G放电
      clearTimeout(nyxnTimer);
      await Promise.allSettled([
        __g.tileLayer.hide(id2),
        __g.tileLayer.show(id),
        __g.misc.callBPFunction({
          functionName: '停止',
          objectName: '动画播放_2'
        })
      ]);
      await __g.misc.callBPFunction({
        functionName: '播放',
        objectName: '播放动画_1'
      });
      __g.camera.set(487377.53125, 2495514.25, 8.84, -21.831873, 186.256775, 0);
      v2gTimer = setTimeout(() => {
        __g.camera.set(487377.53125, 2495514.25, 8.84, -21.831873, 186.256775, 0);
        __g.tileLayer.show(id);
      }, 20000);
      break;
    case 'BAOAN_2': // 能源消纳
      clearTimeout(v2gTimer);
      await Promise.allSettled([
        __g.tileLayer.hide(id),
        __g.tileLayer.show(id2),
        __g.misc.callBPFunction({
          functionName: '停止',
          objectName: '播放动画_1'
        })
      ]);
      await __g.misc.callBPFunction({
        functionName: '播放',
        objectName: '动画播放_2'
      });
      __g.camera.set(487382.25375, 2495466.4575, 21.042456, -18.110382, -80.231377, 0);
      nyxnTimer = setTimeout(async () => {
        __g.camera.set(487382.25375, 2495466.4575, 21.042456, -18.110382, -80.231377, 0);
      }, 17000);
      break;
    case 'BAOAN_3': // 视角漫游
      clearTimeout(v2gTimer);
      clearTimeout(nyxnTimer);
      await Promise.allSettled([
        __g.misc.callBPFunction({
          functionName: '停止',
          objectName: '动画播放_2'
        }),
        __g.misc.callBPFunction({
          functionName: '停止',
          objectName: '播放动画_1'
        }),
        __g.tileLayer.hide([id, id2])
      ]);
      playCamera(__g, '宝安区政府_1');
      break;
    default:
      clearTimeout(v2gTimer);
      clearTimeout(nyxnTimer);
      await __g.camera.stopAnimation();
      await __g.tileLayer.hide([id, id2]);
      await __g.tileLayer.show(id3);
      resetTab3dt();
  }
};
const resetTab3dt = async () => {
  clearTimeout(v2gTimer);
  clearTimeout(nyxnTimer);
  const id2 = getTreeLayerIdByName('V2G放电', store.treeInfo);
  const id3 = getTreeLayerIdByName('能源消纳', store.treeInfo);
  const id4 = getTreeLayerIdByName('场内设施Icon_微观', store.treeInfo);
  await Promise.allSettled([
    __g.cameraTour.stop(),
    __g.camera.stopAnimation(),
    __g.misc.callBPFunction({
      functionName: '停止',
      objectName: '动画播放_2'
    }),
    __g.misc.callBPFunction({
      functionName: '停止',
      objectName: '播放动画_1'
    })
  ]),
    __g.tileLayer.hide([id2, id3, id4]);
};

const showAllPos = async () => {
  const id2 = getTreeLayerIdByName('场内设施Icon_宏观', store.treeInfo);
  const id3 = getTreeLayerIdByName('场内设施Icon_微观', store.treeInfo);
  const id5 = getTreeLayerIdByName('变电箱', store.treeInfo);

  await Promise.allSettled([
    __g.tileLayer.show(id2),
    __g.tileLayer.show(id5),
    __g.tileLayer.hide(id3)
  ]);
};

const hideAllPos = async () => {
  const id = getTreeLayerIdByName('场内设施Icon_宏观', store.treeInfo);
  const id4 = getTreeLayerIdByName('场内设施Icon_微观', store.treeInfo);
  const id2 = getTreeLayerIdByName('V2G放电', store.treeInfo);
  const id3 = getTreeLayerIdByName('能源消纳', store.treeInfo);
  const id5 = getTreeLayerIdByName('变电箱', store.treeInfo);
  // await __g.tileLayer.hide(id);
  // await __g.tileLayer.hide(id2);
  // await __g.tileLayer.hide(id3);
  // await __g.tileLayer.hide(id5);
  await __g.tileLayer.hide([id, id2, id3, id4, id5]);
};

// 查询所有充电桩状态
const queryAllPileStatus = async () => {
  const res = await connectorStatusInfo({
    operatorId: visibleStore.detailParams?.operatorId,
    stationId: visibleStore.detailParams?.stationId
  });
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
      const fd = data.find((o) => actorId.includes(o.connectorId));
      if ([2, 3, 4, 5].includes(+fd?.connectorStatus)) {
        __g.tileLayer.showActor(id, actorId, null);
      } else {
        __g.tileLayer.hideActor(id, actorId, null);
      }
    });
  });
  __g.tileLayer.updateEnd(null);
};

const focusToPile = async (pile) => {
  console.log(pile, 'pile');
  clickToFocus(pile);
};

const clickToFocus = async (pile) => {
  const layerId = getTreeLayerIdByName('宝安区政府站点', store.treeInfo);
  const objId = 'lianhuashancar_' + pile.connectorId;
  const res = await __g.tileLayer.getActorInfo({
    id: layerId,
    objectIds: [objId]
  });
  const rotation = res?.data[0].rotation;

  //定位过去
  await __g?.tileLayer?.focusActor(
    layerId,
    objId,
    1.6,
    2,
    [rotation[0] - 12, setYaw(rotation[1]), 0],
    null
  );
  if (+pile.status === 255) {
  } else {
    //设置高亮颜色（全局生效）
    __g.settings.highlightColor('RGB(0,128,0)');
    __g.tileLayer.highlightActor(layerId, pile.connectorId);
  }
};
const setYaw = (Yaw) => {
  if (Yaw < -90) {
    return 360 + Yaw;
  } else if (Yaw > -90 && Yaw < 0) {
    return Yaw + 90;
  } else if (Yaw > 0 && Yaw < 90) {
    return Yaw;
  } else if (Yaw > 90) {
    return Yaw + 90;
  }
};

onBeforeUnmount(async () => {
  clearTimeout(timer);
  bus.off('handleTabSelect');
  bus.off('resetTab3dt');
  bus.off('focusToPile');
  const id2 = getTreeLayerIdByName('场内设施Icon', store.treeInfo);
  await __g.camera.stopAnimation(),
    await __g.cameraTour.stop(),
    await Promise.allSettled([
      __g.camera.set(infoObj.szView, 0),
      resetTab3dt(),
      hideAllPos(),
      __g.tileLayer.hide(id2)
    ]);
});

bus.on('handleTabSelect', handleTabSelect);

bus.on('resetTab3dt', resetTab3dt);

bus.on('focusToPile', focusToPile);
onMounted(() => {
  timer = setTimeout(showAllPos, 2000);
  // queryAllPileStatus()
});
</script>

<style scoped></style>
