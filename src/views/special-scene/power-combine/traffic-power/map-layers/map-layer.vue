<template>
  <qu ref="quRef"></qu>
  <legend-list v-show="showRemainPower" :legendList="legendListData" :legendName="legendNameData" />
  <MapLeftBtn>
    <div class="remain-power" @click="handleRemainPoweLayer">
      <img draggable="false" :src="showRemainPower ? remainPowerIconA : remainPowerIcon" />
      <div class="name">剩余电量</div>
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
import Api from '../api';
import remainPowerIcon from '../images/remain-power.png';
import remainPowerIconA from '../images/remain-power-active.png';
import bus from '@/utils/bus';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { useMapStore } from '@/stores/map';

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;

const showRemainPower = ref(false);

const store = useVisibleComponentStore();
const mapStore = useMapStore();

onMounted(async () => {
  await __g.reset();
  await getData();

  addPoint();
  addBusObj();
});

onBeforeUnmount(async () => {
  await __g.misc.callBPFunction({
    functionName: '停止',
    objectName: '动画播放_3'
  });
  const id = mapStore.treeInfo.find((el) => el.name === '营运巴士' && el.type === 'EPT_Scene')?.iD;
  id&&(await __g.tileLayer.hide(id));
});

let legendNameData = '巴士剩余电量(kw)';
let legendListData = ref([
  {
    color: '#E3E899',
    pColor: [227 / 255, 232 / 255, 153 / 255, 0.7],
    name: '≤1000',
    type: false
  },
  {
    color: '#B8D45D',
    pColor: [184 / 255, 212 / 255, 93 / 255, 0.7],
    name: '1000～2000',
    type: false
  },
  {
    color: '#7CAE53',
    pColor: [124 / 255, 174 / 255, 83 / 255, 0.9],
    name: '2000～4000',
    type: false
  },
  {
    color: '#45802A',
    pColor: [69 / 255, 128 / 255, 42 / 255, 0.85],
    name: '4000～7000',
    type: false
  },
  {
    color: '#316528',
    pColor: [49 / 255, 101 / 255, 40 / 255, 0.98],
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
      popupSize: [scale(100 + maxLen * 8), scale(110)],
      popupOffset: [-scale(100 + maxLen * 8) / 2 - 5, -scale(15)], //弹窗偏移
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
  await __g.customObject.delete('busObj');
  const cusObj = {
    id: 'busObj',
    groupId: 'busObjGroup',
    pakFilePath: '@path:DTS_Library_V5.4.pak',
    assetPath: '/JC_CustomAssets/VehicleLibrary/Exhibition/公交车_03',
    range: [1, 10000000],
    autoHeight: true,
    location: [491850.03500000003, 2508888],
    coordinateType: 0,
    colorType: 4,
    scale: [500, 500, 500]
  };
  __g.customObject.add(cusObj, null);
};

const handleToBusTwin = async () => {
  await Promise.allSettled([
    __g.customObject.hide('busObj'),
    __g.marker.hideByGroupId('quName'),
    beforeAddOrExitHrStation(true)
  ]);
  store.changeShowDetail({
    show: false,
    params: {
      isBaoAn: true,
      isHr: 0
    }
  });
  __g.customObject.hide('busObj');
  // await __g.camera.set(487515.321875, 2495233.355625, 145.108057, -19.415611, -82.359184, 2);
  const id = mapStore.treeInfo.find((el) => el.name === '营运巴士' && el.type === 'EPT_Scene')?.iD;
  id&&(await __g.tileLayer.show(id));
  __g.misc.callBPFunction({
    functionName: '播放',
    objectName: '动画播放_3'
  });

  setTimeout(() => {
    __g.customObject.show('busObj'),
      __g.marker.showByGroupId('quName'),
      beforeAddOrExitHrStation(false);
  }, 26);
};

bus.on('map-back', async () => {
  __g.misc.callBPFunction({
    functionName: '停止',
    objectName: '动画播放_3'
  });
  __g.customObject.show('busObj'),
    __g.marker.showByGroupId('quName'),
    beforeAddOrExitHrStation(false);
  const id = mapStore.treeInfo.find((el) => el.name === '营运巴士' && el.type === 'EPT_Scene')?.iD;
  id&&(await __g.tileLayer.hide(id));
});

const beforeAddOrExitHrStation = (isShow: boolean) => {
  !isShow ? __g.polygon.show(layerNameQuNameArr('qu')) : __g.polygon.hide(layerNameQuNameArr('qu'));
  !isShow ? __g.polygon3d.show('wall') : __g.polygon3d.hide('wall');
};

useEmitt('AIRCITY_EVENT', async (e) => {
  console.log(e, 'AIRCITY_EVENT');
  // 点击站点图标
  if (e.eventtype === 'LeftMouseButtonClick') {
    if (e.Type === 'CustomObj') {
      handleToBusTwin();
    }
  }

  if (e.eventtype === 'MarkerCallBack') {
  }
});
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
