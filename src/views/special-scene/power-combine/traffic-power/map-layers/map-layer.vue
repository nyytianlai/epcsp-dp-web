<template>
  <qu ref="quRef"></qu>
  <legend-list v-show="showRemainPower" :legendList="legendListData" :legendName="legendNameData" />
  <MapLeftBtn v-show="!isPlaying">
    <div class="remain-power" @click="handleRemainPoweLayer">
      <img draggable="false" :src="showRemainPower ? remainPowerIconA : remainPowerIcon" />
      <div class="name">巴士储能</div>
    </div>
  </MapLeftBtn>
</template>

<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import MapLeftBtn from '@/components/map-left-btn.vue';
import { requestGeojsonData } from '@/components/map-layer/api.js';
import { getHtmlUrl, getTreeLayerIdByName } from '@/global/config/map';
import { getPopupHtml } from '@/utils/index';
import { getImageByCloud, layerNameQuNameArr } from '@/global/config/map';
import { scale } from '@sutpc/config';
import { busLineList } from './map-config';
import Api from '../api';
import remainPowerIcon from '../images/remain-power.png';
import remainPowerIconA from '../images/remain-power-active.png';
import bus from '@/utils/bus';
import { useMapStore } from '@/stores/map';

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
const emits = defineEmits(['playTwin']);
const bus_idList = busLineList.map((item) => item.id);

const showRemainPower = ref(false);

const isPlaying = ref(false);

let timer;

const mapStore = useMapStore();

onMounted(async () => {
  await __g.reset();
  await getData();

  addPoint();
  await addBusLine();
  addBusObj();
});

onBeforeUnmount(async () => {
  clearTimeout(timer);
  await __g.misc.callBPFunction({
    functionName: '停止',
    objectName: '动画播放_3'
  });
  const id = mapStore.treeInfo.find((el) => el.name === '营运巴士' && el.type === 'EPT_Scene')?.iD;
  id && (await __g.tileLayer.hide(id));
  await __g.customObject.delete(bus_idList);
  await __g.polyline.delete(bus_idList);
  await __g.marker.deleteByGroupId('busObjGroup');
});

let legendNameData = '巴士储能电量(kw)';
let legendListData = ref([
  {
    color: 'rgb(253, 255, 223)',
    pColor: [253 / 255, 255 / 255, 223 / 255, 0.7],
    name: '≤1000',
    type: false
  },
  {
    color: 'rgb(245, 249, 180)',
    pColor: [245 / 255, 249 / 255, 180 / 255, 0.7],
    name: '1000～2000',
    type: false
  },
  {
    color: 'rgb(200, 231, 98)',
    pColor: [200 / 255, 231 / 255, 98 / 255, 0.8],
    name: '2000～4000',
    type: false
  },
  {
    color: 'rgb(138, 201, 86)',
    pColor: [138 / 255, 201 / 255, 86 / 255, 0.8],
    name: '4000～7000',
    type: false
  },
  {
    color: 'rgb(91, 165, 57)',
    pColor: [91 / 255, 165 / 255, 57 / 255, 0.8],
    name: '≥7000',
    type: false
  }
]);
let quData = [];
const getData = async () => {
  if (quData?.length) return;
  try {
    const params = {
      areaCode: '',
      streetCode: ''
    };
    const { data } = await Api.busCanDistribution(params);
    quData = data?.map((el) => {
      if (el.areaName === '大鹏区') {
        el.areaName = '大鹏新区';
      }
      return el;
    });
  } catch (error) {}
};
const handleQuHeatMap = async (showHeatmap) => {
  await getData();
  __g.polygon.updateBegin();
  quData.forEach((v) => {
    const color = getIntervalCategory(v.busRemainPower);
    const endColor = showHeatmap ? color : [0, 0, 0.4, 0];
    __g.polygon.setColor('qu-' + v.areaName, endColor, null);
  });
  __g.polygon.updateEnd();
};

const handleRemainPoweLayer = () => {
  showRemainPower.value = !showRemainPower.value;
  handleQuHeatMap(showRemainPower.value);
};

const getIntervalCategory = (value) => {
  if (value <= 1000) {
    return legendListData.value[0].pColor;
  } else if (value <= 2000) {
    return legendListData.value[1].pColor;
  } else if (value <= 4000) {
    return legendListData.value[2].pColor;
  } else if (value <= 7000) {
    return legendListData.value[3].pColor;
  } else {
    return legendListData.value[4].pColor;
  }
};

const addPoint = async () => {
  const res1 = await requestGeojsonData('barPosition4547');
  const quCenterPositions = res1.features;

  const idList = [];
  let markers = [];
  quCenterPositions.forEach((item, index) => {
    const dataObj = quData.find((el) => `${el.areaCode}` === `${item.properties.QUCODE}`) || {};
    const oPopUpUrl = getPopupHtml({
      usePopupHtml: true,
      com: 'power-combine-traffic-power',
      params: {
        value: JSON.stringify({ ...dataObj })
      }
    });
    const maxLen = Math.max(`${dataObj?.busNum || 0}`.length, `${dataObj?.v2gNum || 0}`.length);

    let o = {
      id: 'traffic-power-marker-' + item.properties.QUCODE,
      groupId: `traffic-power-marker-group`,
      coordinate: item.geometry.coordinates,
      anchors: [-10, 10], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [10, 10], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: getImageByCloud('circle'), //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: oPopUpUrl,
      autoHidePopupWindow: false,
      popupSize: [scale(100 + maxLen * 8), scale(60)],
      popupOffset: [-scale(100 + maxLen * 8) / 2 - 5, -scale(40)], //弹窗偏移
      autoHeight: false, // 自动判断下方是否有物体
      displayMode: 2, //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
      priority: item.properties.PRIORITY
    };
    markers.push(o);
    idList.push(o.id);
  });
  await aircityObj.value.acApi.marker.add(markers);
  __g.marker.showPopupWindow(idList);
};

const addBusObj = async () => {
  await __g.customObject.delete(bus_idList);
  await __g.marker.deleteByGroupId('busObjGroup');
  const arr = [];
  const markerList = [];
  const moveMap = {};
  busLineList.forEach((item) => {
    const cusObj = {
      id: item.id,
      groupId: 'busObjGroup',
      userData: JSON.stringify({ isHighLight: item.isHighLight }),
      pakFilePath: '@path:能源_公交车.pak',
      assetPath: item.assetPath,
      range: [1, 10000000],
      autoHeight: true,
      location: item.path[0],
      localRotation: item.rotation,
      coordinateType: 0,
      isEffectRotation: true,
      scale: [300, 300, 300],
      supportAttach: false
    };
    arr.push(cusObj);
    moveMap[item.id] = item.path.map((el, i) => {
      return {
        id: item.id,
        // smoothTime: i * 60 * 10,
        time: i * 30,
        coordinate: el
        // @ts-ignore
        // rotation: item.rotation
      };
    });

    if (item.isHighLight) {
      // const marker = {
      //   id: item.id,
      //   groupId: 'busObjGroup',
      //   userData: JSON.stringify({ isHighLight: item.isHighLight }),
      //   coordinate: item.path[0],
      //   anchors: [-23, 14.5], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      //   imageSize: [46, 29], //图片的尺寸
      //   range: [1, 1000000], //可视范围
      //   imagePath: getImageByCloud('bus-icon'), //显示图片路径
      //   displayMode: 2,
      //   autoHeight: true,
      //   priority: 1,
      //   occlusionCull: false
      // };
      // markerList.push(marker);
    }
  });
  // await __g.marker.add(markerList);
  await __g.customObject.add(arr);

  __g.marker.setAttachCustomObject(
    markerList.map((item) => {
      return {
        markerId: item.id,
        objectId: item.id,
        offset: [0, 0, 0.5]
      };
    })
  );
  __g.customObject.updateBegin();
  Object.keys(moveMap).forEach((key) => {
    __g.customObject.startMove(key, 0, moveMap[key]);
    // moveMap[key].forEach((el) => {
    //   console.log(el, 'moveTo');
    //   __g.customObject.moveTo(el);
    // });
  });
  // __g.customObject.glow(
  //   busLineList
  //     .filter((item) => item.isHighLight)
  //     .map((item) => ({
  //       id: item.id,
  //       color: [243 / 255, 218 / 255, 32 / 255, 1],
  //       colors: [243 / 255, 218 / 255, 32 / 255, 1],
  //       duration: 3600,
  //       interval: 1
  //     }))
  // );
  // await __g.settings.highlightColor([0, 1, 1, 1]);
  // __g.customObject.highlight(busLineList.filter((item) => item.isHighLight).map((item) => item.id));
  __g.customObject.updateEnd();
};

const addBusLine = async () => {
  await __g.polyline.delete(bus_idList);
  const arr = [];
  busLineList.forEach((item) => {
    const line = {
      id: item.id,
      groupId: 'buslineGroup',
      color: [0 / 255, 255 / 255, 148 / 255, 0.9],
      coordinates: item.path,
      range: [1, 10000000],
      thickness: 300,
      intensity: 0.2,
      depthTest: false,
      shape: 0,
      style: 4
    };
    arr.push(line);
  });
  await __g.polyline.add(arr, null);
};

const handleToBusTwin = async () => {
  clearTimeout(timer);
  isPlaying.value = true;
  await Promise.allSettled([
    __g.customObject.hide(bus_idList),
    __g.polyline.hide(bus_idList),
    __g.marker.hideByGroupId('busObjGroup'),
    __g.marker.hideByGroupId('quName'),
    beforeAddOrExitHrStation(true)
  ]);
  mapStore.changeCurrentQu('福田区');
  mapStore.changeCurrentPosition('福田区');
  // await __g.camera.set(487515.321875, 2495233.355625, 145.108057, -19.415611, -82.359184, 2);
  const id = mapStore.treeInfo.find((el) => el.name === '营运巴士' && el.type === 'EPT_Scene')?.iD;
  id && (await __g.tileLayer.show(id));
  await __g.misc.callBPFunction({
    functionName: '播放',
    objectName: '动画播放_3'
  });
  __g.camera.set(505295.399707, 2492716.725, 1553.664844, -57.992973, -90.920784, 0);
  timer = setTimeout(async () => {
    // isPlaying.value = false;
    // __g.customObject.show(bus_idList),
    //   __g.polyline.show(bus_idList),
    //   __g.marker.showByGroupId('quName'),
    //   __g.marker.showByGroupId('busObjGroup'),
    //   beforeAddOrExitHrStation(false);
    __g.camera.set(505295.399707, 2492716.725, 1553.664844, -57.992973, -90.920784, 0);
    id && (await __g.tileLayer.hide(id));
    id && (await __g.tileLayer.show(id));
  }, 22.44 * 1000);
};

bus.on('map-back', async () => {
  clearTimeout(timer);
  isPlaying.value = false;
  __g.misc.callBPFunction({
    functionName: '停止',
    objectName: '动画播放_3'
  });
  __g.customObject.show(bus_idList),
    __g.polyline.show(bus_idList),
    __g.marker.showByGroupId('busObjGroup'),
    __g.marker.showByGroupId('quName'),
    beforeAddOrExitHrStation(false);
  const id = mapStore.treeInfo.find((el) => el.name === '营运巴士' && el.type === 'EPT_Scene')?.iD;
  id && (await __g.tileLayer.hide(id));
});

const beforeAddOrExitHrStation = (isShow: boolean) => {
  !isShow ? __g.polygon.show(layerNameQuNameArr('qu')) : __g.polygon.hide(layerNameQuNameArr('qu'));
  !isShow ? __g.polygon3d.show('wall') : __g.polygon3d.hide('wall');
};

useEmitt('AIRCITY_EVENT', async (e) => {
  console.log(e, 'AIRCITY_EVENT');
  // 点击站点图标
  if (e.eventtype === 'LeftMouseButtonClick') {
    if (e.Type === 'CustomObj' || e.GroupID === 'busObjGroup') {
      const data = JSON.parse(e.UserData ?? '{}');
      data?.isHighLight && handleToBusTwin();
    }
  }

  if (e.eventtype === 'MarkerCallBack') {
  }
});

watch(
  () => isPlaying.value,
  (val) => {
    emits('playTwin', val);
  },
  {
    deep: true
  }
);
</script>

<style scoped lang="less">
.remain-power {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    height: 51px;
  }
  .name {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>
