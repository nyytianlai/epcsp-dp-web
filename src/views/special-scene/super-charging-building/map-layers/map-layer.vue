<template>
  <qu ref="quRef" :module="200" @addQuBar="addQuBar" @addOutStation="addOutStation"></qu>
  <!-- <SuperChargeBar ref="rectBar4Ref"></SuperChargeBar> -->
  <legend-list
    :legendList="legendListData"
    :legendName="legendNameData"
    v-show="currentPosition == '深圳市' || currentPosition.includes('区')"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
// import SuperChargeBar from '@/components/map-layer/super-charge-bar.vue';
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import { useMapStore } from '@/stores/map';
// import { mapJdStationPoint, mapQuBar, mapJdBar } from '../config';
import { getImageByCloud, getHtmlUrl, focusToHihtLightPop } from '@/global/config/map';
import Api from '../api.js';
import { getStrLength, GCJ02_2_4547 } from '@/utils/index';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import bus from '@/utils/bus';
import { transformCoordsByType } from '@/utils/map-coord-tools';
import { getPopupHtml } from '@/utils/index';
import { scale } from '@sutpc/config';

const props = defineProps({
  selectBtmTab: {
    type: Object,
    default: () => ({})
  }
});

const store = useMapStore();
const storeVisible = useVisibleComponentStore();
const currentPosition = computed(() => store.currentPosition);
const currentHrStationID = computed(() => store.currentHrStationID); //当前点击的高渲染站点id

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
let currtentStation: any = {};
let chartHover;
let barPositionBak;
let barData;
let isInit;

const quRef = ref(null);
// const rectBar4Ref = ref(null);
const legendNameData = computed(() => `${props.selectBtmTab.label}点数`);
const legendListData = reactive([
  {
    color: 'rgb(5, 160, 255)',
    name: '规划',
    type: false
  },
  {
    color: 'rgb(97, 130, 255)',
    name: '建设',
    type: false
  },
  {
    color: 'rgb(46, 255, 255)',
    name: '营运',
    type: false
  }
]);

useEmitt('AIRCITY_EVENT', async (e) => {
  // 点击站点图标高亮
  if (e.eventtype === 'LeftMouseButtonClick') {
    console.log('点击外面的点数据', e);

    if (e.Id?.includes('stationOut-')) {
      if (currentPosition.value !== '') {
        store.changeCurrentPositionBak(currentPosition.value);
        store.changeCurrentPosition('');
      }
      //关闭上一个高亮其他站点
      currtentStation.stationId1 ? await __g.marker.show(currtentStation.stationId1) : '';
      __g.marker.delete('stationOut-hight');
      //关闭上一个高亮充电站
      currtentStation.stationId1
        ? await __g.marker.hidePopupWindow(currtentStation.stationId1)
        : '';
      quRef.value.hideHighLightNormalStation();
      storeVisible.changeShowComponent(true);
      storeVisible.changeShowDetail({
        show: false,
        params: {}
      });
      currtentStation = JSON.parse(e.UserData);
      currtentStation['stationId1'] = e.Id;

      await __g.marker.hide(e.Id);
      currtentStation.isSuper = true;
      currtentStation.equipType = props.selectBtmTab.code;
      addHighLightStation(currtentStation);
      quRef.value.highLightNormalStation(currtentStation);
      quRef.value.enterStationInfo(currtentStation);
    }
  }
  //关闭弹窗
  if (e.eventtype === 'MarkerCallBack' && e.Data == 'closeStationHighLight') {
    if (e.ID?.includes('stationOut-')) {
      __g.marker.delete('stationOut-hight');
      __g.marker.show(currtentStation.stationId1);
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

  barPositionBak = res1.features;
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
      userData: JSON.stringify(item),
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
  setTimeout(() => {
    __g.marker.add(pointArr, null);
  }, 1000);
};

const addHighLightStation = async (item) => {
  let width = item.stationName?.length * 38 + 60;
  let o1 = {
    id: 'stationOut-hight',
    groupId: 'jdStation',
    userData: JSON.stringify(item),
    // coordinateType: 2,
    coordinate: transformCoordsByType([item.lng, item.lat], 2), //坐标位置
    anchors: [-35, 209], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [70, 209], //图片的尺寸
    range: [1, 150000], //可视范围
    imagePath: getImageByCloud('superSta'),
    popupURL: `${getHtmlUrl()}/static/html/stationPop.html?value=${item.stationName}`, //弹窗HTML链接
    popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
    popupSize: [scale(width), scale(80)], //弹窗大小
    popupOffset: [-scale(width / 2), -209 / 2], //弹窗偏移
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

onBeforeUnmount(() => {
  bus.off('addBar');
});

watch(
  () => props.selectBtmTab,
  async (newVal, oldVal) => {
    nextTick();
    if (!isInit) {
      await __g.reset();
      isInit = true;
    }
    await quRef.value.deleteJdData();
    await __g.marker.deleteByGroupId('rectBar');
    await quRef.value.resetSz();
    if (oldVal !== undefined) {
      addQuBar();
    }
  },
  {
    deep: true,
    immediate: true
  }
);
</script>
<style lang="less" scoped></style>
