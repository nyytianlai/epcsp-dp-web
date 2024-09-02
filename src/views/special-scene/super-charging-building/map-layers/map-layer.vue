<template>
  <qu ref="quRef" :module="200" @addOutStation="addOutStation" @addQuBar="addQuBar"></qu>
  <!-- <SuperChargeBar ref="rectBar4Ref"></SuperChargeBar> -->
  <legend-list
    :legendList="legendListData"
    :legendName="legendNameData"
    v-show="(currentPosition == '深圳市' || currentPosition.includes('区')) && !showRemainPower"
  />
  <MapLeftBtn>
    <div class="remain-power" @click="handleRemainPoweLayer">
      <img draggable="false" :src="showRemainPower ? remainPowerIconA : remainPowerIcon" />
      <!-- <div class="name">发展趋势</div> -->
    </div>
  </MapLeftBtn>
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import MapLeftBtn from '@/components/map-left-btn.vue';
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import { useMapStore } from '@/stores/map';
import {
  getImageByCloud,
  getHtmlUrl,
  focusToHihtLightPop,
  addCommon3dt,
  getTreeLayerIdByName
} from '@/global/config/map';
import { useRoute } from 'vue-router';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import Api from '../api.js';
import { getStrLength, GCJ02_2_4547 } from '@/utils/index';
import bus from '@/utils/bus';
import { transformCoordsByType } from '@/utils/map-coord-tools';
import { getPopupHtml } from '@/utils/index';
import { scale } from '@sutpc/config';
import { useI18n } from 'vue-i18n';
import remainPowerIconA from '../images/super-charge-switch-active.png';
import remainPowerIcon from '../images/super-charge-switch.png';
import { MinLeInfo } from './map-config';

const { t } = useI18n();
const tHead = `special-scene.super-charging-building.map-layers`;
const commonHead = `special-scene.super-charging-building.config.common`;
const emits = defineEmits(['playTwin']);
const props = defineProps({
  selectBtmTab: {
    type: Object,
    default: () => ({})
  }
});

const store = useMapStore();
const visibleStore = useVisibleComponentStore();
const currentPosition = computed(() => store.currentPosition);
let timer;
let torturTimer;
const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
let currtentStation: any = {};
let chartHover;
let barData;

const quRef = ref(null);
const showRemainPower = ref(true);
// const rectBar4Ref = ref(null);
let ds = t(`${tHead}.ds`); // ds: '点数',
const legendNameData = computed(() => `${props.selectBtmTab.label}${ds || '点数'}`);
const legendListData = reactive([
  {
    color: 'rgb(5, 160, 255)',
    name: '规划',
    type: false,
    displayName: t(`${commonHead}.guihua`)
  },
  {
    color: 'rgb(97, 130, 255)',
    name: '建设',
    type: false,
    displayName: t(`${commonHead}.jianshe`)
  },
  {
    color: 'rgb(46, 255, 255)',
    name: '营运',
    type: false,
    displayName: t(`${commonHead}.yingyun`)
  }
]);

useEmitt('AIRCITY_EVENT', async (e) => {
  // 点击站点图标高亮
  if (e.eventtype === 'LeftMouseButtonClick') {
    console.log('点击外面的点数据', e);
    if (e.Id?.includes('stationOut-')) {
      //关闭上一个高亮其他站点
      if (currtentStation.stationId1 === e.Id) return;
      currtentStation.stationId1 && (await __g.marker.show(currtentStation.stationId1));
      __g.marker.delete('stationOut-hight');
      //关闭上一个高亮充电站
      currtentStation.stationId1 && (await __g.marker.hidePopupWindow(currtentStation.stationId1));
      quRef.value.hideHighLightNormalStation();

      currtentStation = JSON.parse(e.UserData);
      currtentStation['stationId1'] = e.Id;

      currtentStation.isSuper = true;
      currtentStation.equipType = props.selectBtmTab.code;

      if (currtentStation?.isHr == 0 && currtentStation?.hrId) {
        bus.emit('toHr', currtentStation);
        quRef.value.enterStationInfo(currtentStation);
      } else {
        await __g.marker.hide(e.Id);
        quRef.value.enterStationInfo(currtentStation);
        addHighLightStation(currtentStation);
        quRef.value.highLightNormalStation(currtentStation);
      }
    }
    if (e.GroupID === 'super-charge-minle-group') {
      hanleToMinLe({ ...MinLeInfo });
    }
  }
  //关闭弹窗
  if (e.eventtype === 'MarkerCallBack' && e.Data == 'closeStationHighLight') {
    if (e.ID?.includes('stationOut-')) {
      __g.marker.delete('stationOut-hight');
      __g.marker.show(currtentStation.stationId1);
      currtentStation = {};
    }
  }

  if (e.eventtype === 'MarkerCallBack') {
    let quName = e.ID?.split('-')[1];
    if (e.Data === 'mouseover') {
      changeXzqhColor('qu-' + quName, [75 / 255, 222 / 255, 255 / 255, 0.6]);
    } else if (e.Data === 'mouseout') {
      changeXzqhColor('qu-' + quName, [75 / 255, 222 / 255, 255 / 255, 0.0]);
    }

    if (e.Data.includes('click-')) {
      __g.marker.deleteByGroupId('bar-hover-pop');
      chartHover = false;
    }

    if (e.Data.includes('mouseover-')) {
      const data = JSON.parse(e.Data.split('mouseover-')[1]);
      chartHover = true;
      drawHoverBarMarker(data, true);
    }

    if (e.Data.includes('mouseout-')) {
      const data = JSON.parse(e.Data.split('mouseout-')[1]);
      chartHover = false;
      drawHoverBarMarker(data, false);
    }

    if (e.Data === 'click-minle') {
      hanleToMinLe({ ...MinLeInfo });
    }
  }
});

const changeXzqhColor = (polygonId: string, newVal: [number, number, number, number]) => {
  __g.polygon.setColor(polygonId, newVal);
};

const addQuBar = async () => {
  if (!barData?.length) {
    const { data: res } = await Api.getDistrictBar();
    barData = res;
  }

  addBar('qu', barData);
};

const addBar = async (type: 'qu' | 'jd', res, streetCode?) => {
  await __g.marker.deleteByGroupId('rectBar');
  const dataCode = props.selectBtmTab.code
    ? ['stationPlanNum', 'stationBuildNum', 'stationOperateNum']
    : ['equipmentPlanNum', 'equipmentBuildNum', 'equipmentOperateNum'];
  chartHover = false;
  let barArr = [];
  const fileName = type === 'qu' ? 'barPosition4547' : 'jdBarPosition4547';
  let stationCount = res.map((item) => {
    return Math.max(...dataCode.map((o) => +item[o] || 0));
  });
  let yMax = Math.max(...stationCount);
  const res1 = await Api.requestGeojsonData(fileName);

  if (type === 'jd') {
    res1.features = res1.features.filter((item) => {
      return item.properties.QUCODE === streetCode;
    });
  }
  res1.features.forEach((item) => {
    const countObj: any =
      res.find((i: any) => {
        return type === 'qu'
          ? `${i.areaCode}` == `${item.properties.QUCODE}`
          : `${i.streetId}` == `${item.properties.JDCODE}`;
      }) || {};

    let idEnd = type === 'qu' ? item.properties.QUNAME : item.properties.JDNAME;
    let areaCode = type === 'qu' ? item.properties.QUCODE : item.properties.JDCODE + '';

    const itemMax = Math.max(...dataCode.map((o) => +countObj[o] || 0));
    let contentHeight = Math.max((180 * itemMax) / yMax, 60);
    const oPopUpUrl = getPopupHtml({
      usePopupHtml: true,
      com: 'rect-bar3',
      params: {
        value: JSON.stringify({ ...countObj, coordinates: item.geometry.coordinates, dataCode }),
        yMax: yMax * 1.3,
        contentHeight: contentHeight,
        quName: idEnd,
        areaCode,
        hideToolTip: 1
      }
    });
    const o = {
      id: 'rectBar1-' + idEnd,
      groupId: `rectBar`,
      userData: areaCode,
      coordinate: item.geometry.coordinates,
      anchors: [-0.5, -1], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [1, 1], //图片的尺寸
      range: [1, 1000000], //可视范围
      imagePath: `${getHtmlUrl()}/static/images/barEllipse.png`, //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: oPopUpUrl,
      popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
      autoHidePopupWindow: false,
      popupSize: [100, contentHeight],
      popupOffset: [-50, -(contentHeight + 80) / 5], //弹窗偏移
      autoHeight: true, // 自动判断下方是否有物体
      displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
      // priority: item.properties.PRIORITY
    };
    barArr.push(o);
  });
  await __g.marker.add(barArr, null);
  __g.marker.showAllPopupWindow(null);
};

const drawHoverBarMarker = async (data, show = false) => {
  await __g.marker.deleteByGroupId('bar-hover-pop');
  if (!show || !data || !chartHover) return;
  const contentHeight = +data.contentHeight;
  const mPopUpUrl = getPopupHtml({
    usePopupHtml: true,
    com: 'super-charge-bar-popup',
    params: {
      value: JSON.stringify(data)
    }
  });
  const marker = {
    id: data.areaCode + 'bar-hover-pop',
    groupId: 'bar-hover-pop',
    userData: JSON.stringify(data),
    coordinate: data.coordinates,
    anchors: [-0.5, -1], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [1, 1], //图片的尺寸
    range: [1, 1000000], //可视范围
    imagePath: `${getHtmlUrl()}/static/images/barEllipse.png`, //显示图片路径
    useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
    popupURL: mPopUpUrl,
    popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
    autoHidePopupWindow: false,
    popupSize: [150, 52],
    popupOffset: [-75, -contentHeight / 5 - 52], //弹窗偏移
    autoHeight: false, // 自动判断下方是否有物体
    displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
  };
  await __g.marker.add(marker, null);
  __g.marker.showPopupWindow(marker.id, async () => {
    if (!chartHover) {
      __g.marker.deleteByGroupId('bar-hover-pop');
    }
  });
};

const addOutStation = async (module: number, jdcode: string) => {
  await __g.marker.deleteByGroupId('jdStation');
  const { data: res } = await Api.getScStationDistribute({
    streetId: jdcode
  });
  let pointArr = [];
  res?.forEach((item, index) => {
    let xoffset = getStrLength(item.stationName) * 6;
    let o1 = {
      id: `stationOut-super-chargingStation-${item.stationId}-${index}`,
      groupId: 'jdStation',
      userData: JSON.stringify({ ...item }),
      coordinate: transformCoordsByType([item.lng, item.lat], 2), //坐标位置
      anchors: [-21.5, 141.5], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [43, 141.5], //图片的尺寸
      range: [1, 150000], //可视范围
      imagePath: getImageByCloud('stationSuper'),
      autoHidePopupWindow: false,
      text: item.stationName, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 1500], //文本可视范围[近裁距离, 远裁距离]
      textOffset: [-20 - xoffset, -85], // 文本偏移
      textBackgroundColor: [132 / 255, 30 / 255, 114 / 255, 0.8], //文本背景颜色
      fontSize: 16, //字体大小
      fontOutlineSize: 1, //字体轮廓线大小
      fontColor: '#FFFFFF', //字体颜色
      displayMode: 2,
      autoHeight: true
    };
    pointArr.push(o1);
  });
  // __g.marker.add(pointArr, null);
  clearTimeout(timer);
  timer = setTimeout(() => {
    __g.marker.add(pointArr, null);
  }, 1000);
};

const addHighLightStation = async (item) => {
  let width = item.stationName?.length * 36 + 120;
  let o1 = {
    id: 'stationOut-hight',
    groupId: 'jdStation',
    userData: JSON.stringify(item),
    // coordinateType: 2,
    coordinate: transformCoordsByType([item.lng, item.lat], 2), //坐标位置
    anchors: [-35, 209], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [70, 209], //图片的尺寸
    range: [1, 150000], //可视范围
    imagePath: getImageByCloud('stationSuper'),
    popupURL: `${getHtmlUrl()}/static/html/stationPop.html?value=${item.stationName}`, //弹窗HTML链接
    popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
    popupSize: [scale(width), scale(80)], //弹窗大小
    popupOffset: [-scale(width) / 2, -209 / 2], //弹窗偏移
    autoHidePopupWindow: false,
    useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
    displayMode: 2,
    autoHeight: true
  };
  await __g.marker.add(o1, null);
  __g.marker.showPopupWindow('stationOut-hight');
  await __g.marker.focus('stationOut-hight', 100, 1, [-90.991409, -90.380768, 0]);
  await focusToHihtLightPop(item.lng, item.lat, __g);
};

const addMinLeStation = async () => {
  await __g.marker.delete('super-charge-minle');
  const maxLen = `${MinLeInfo?.stationName || 0}`.length + 1;
  const oPopUpUrl = getPopupHtml({
    usePopupHtml: true,
    com: 'super-charge-minLe',
    params: {
      value: JSON.stringify({ ...MinLeInfo })
    }
  });
  let o = {
    id: 'super-charge-minle',
    groupId: `super-charge-minle-group`,
    coordinate: MinLeInfo.coord, //坐标位置
    anchors: [-42 * 1.4, 60 * 1.4], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [84 * 1.4, 60 * 1.4], //图片的尺寸
    range: [1, 1000000], //可视范围
    imagePath: getImageByCloud('minle-point'), //显示图片路径
    useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
    autoHidePopupWindow: false,
    popupURL: oPopUpUrl,
    popupSize: [scale(100 + maxLen * 20), scale(70)],
    popupOffset: [-scale(100 + maxLen * 20) / 2 - 42 * 1.4, -scale(50)], //弹窗偏移
    autoHeight: true, // 自动判断下方是否有物体
    displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
  };
  await aircityObj.value.acApi.marker.add(o);
  aircityObj.value.acApi.marker.showPopupWindow(o.id);
};

bus.on('addBar', async (e: any) => {
  try {
    barData = [];
    const { data: res } = await Api.getStreetBar({ areaCode: e.quCode });
    addBar(e.type, res, e.quCode);
  } catch (err) {
    console.log('请求中断错误', err);
    return;
  }
});

bus.on('map-back', () => {
  if (showRemainPower.value) {
    __g.marker.show('super-charge-minle');
    __g.camera.set(505540.657969, 2499453.488125, 502.166211, -22.178129, -161.735657, 0);
  }
});

const hanleToMinLe = (item) => {
  __g.marker.hide('super-charge-minle');
  __g.camera.lookAt(504715.7940625, 2499630.88, 93.90845703125, 75, -44.205788, 146.805252, 3);
  visibleStore.changeShowComponent(false);
  visibleStore.changeShowDetail({
    show: true,
    params: item
  });
};

onBeforeUnmount(async () => {
  clearTimeout(timer);
  clearTimeout(torturTimer);
  bus.off('addBar');
  bus.off('map-back');
  await deletTutor();
  await __g.marker.deleteByGroupId('bar-hover-pop');
  await __g.marker.deleteByGroupId('rectBar');
  await __g.marker.deleteByGroupId('jdStation');
  await setTwinVisible(false);
});

onMounted(async () => {
  await __g.reset();
  setTimeout(async () => {
    await setTwinVisible(true);
    await addEnterTutor();
  }, 2000);
});

watch(
  () => props.selectBtmTab,
  async (newVal, oldVal) => {
    await quRef.value?.deleteJdData();
    await __g.marker.deleteByGroupId('rectBar');
    await quRef.value?.resetSz();
    if (showRemainPower.value) {
      addEnterTutor();
    } else {
      await deletTutor();
      addQuBar();
    }
  },
  {
    deep: true
  }
);

watch(
  () => currentPosition.value,
  () => {
    if (currentPosition.value) {
      currtentStation = {};
    }
  },
  {
    deep: true
  }
);

watch(
  () => showRemainPower.value,
  async () => {
    await quRef.value?.deleteJdData();
    await __g.marker.deleteByGroupId('rectBar');
    await quRef.value?.resetSz();
    if (showRemainPower.value) {
      addEnterTutor();
    } else {
      await deletTutor();
      addQuBar();
    }
  },
  {
    deep: true
  }
);

const handleRemainPoweLayer = async () => {
  showRemainPower.value = !showRemainPower.value;
};

const setTwinVisible = async (visible) => {
  const twinId1 = getTreeLayerIdByName('会展中心', store.treeInfo);
  const twinId2 = getTreeLayerIdByName('科技公园', store.treeInfo);
  const twinId3 = getTreeLayerIdByName('118默认展示', store.treeInfo);

  if (visible) {
    await __g.infoTree.show([twinId1, twinId2, twinId3]);
  } else {
    await __g.infoTree.hide([twinId1, twinId2, twinId3]);
  }
};

const addEnterTutor = async () => {
  const id = store.treeInfo.find((el) => el.name === '超充之城' && el.type === 'EPT_Scene')?.iD;
  await __g.tileLayer.show(id);
  store.changeCurrentPosition('动画播放_0');
  __g.misc.callBPFunction({
    functionName: '播放',
    objectName: '动画播放_0'
  });
  torturTimer = setTimeout(() => {
    // showRemainPower.value = false;
    addMinLeStation();
    __g.camera.set(505540.657969, 2499453.488125, 502.166211, -22.178129, -161.735657, 0);
  }, 54.4 * 1000);
};

const deletTutor = async () => {
  store.changeCurrentPosition('深圳市');
  clearTimeout(torturTimer);
  __g.misc.callBPFunction({
    functionName: '停止',
    objectName: '动画播放_0'
  });
  const id = store.treeInfo.find((el) => el.name === '超充之城' && el.type === 'EPT_Scene')?.iD;
  await __g.tileLayer.hide(id);
  await __g.marker.delete('super-charge-minle');
};

watch(
  () => showRemainPower.value,
  () => {
    emits('playTwin', showRemainPower.value);
  },
  {
    deep: true,
    immediate: true
  }
);
</script>
<style lang="less" scoped>
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
