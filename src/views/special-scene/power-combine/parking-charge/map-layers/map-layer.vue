<!--
 * @Author: niyayong@sutpc.com
 * @Date: 2024-08-06 10:02:57
 * @LastEditors: niyayong@sutpc.com
 * @LastEditTime: 2024-08-27 16:20:37
 * @Description: 
 * @FilePath: /epcsp-dp-web/src/views/special-scene/power-combine/parking-charge/map-layers/map-layer.vue
-->
<template>
  <qu ref="quRef" :module="200" @addQuBar="addQuBar"></qu>
  <legend-list
    :legendList="legendListData"
    :legendName="legendName || '数量'"
    v-show="currentPosition == '深圳市' || currentPosition.includes('区')"
  />
</template>

<script setup lang="ts">
import { inject, watch, onBeforeUnmount, ref, computed, reactive, onMounted, nextTick } from 'vue';
import { getImageByCloud, getHtmlUrl, focusToHihtLightPop } from '@/global/config/map';
import { getPopupHtml } from '@/utils/index';
import Qu from '@/components/map-layer/qu.vue';
import { useMapStore } from '@/stores/map';
import bus from '@/utils/bus';
import Api from '../api';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `special-scene.power-combine.map-layer`;

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
const store = useMapStore();
const currentPosition = computed(() => store.currentPosition);
let currtentStation: any = {};
let chartHover;
let barPositionBak;
let barData;
let timer;
const quRef = ref();
let legendName = t(`${tHead}.sl`);
// sl: '数量'
const legendListData = reactive([
  {
    color: 'rgb(5, 160, 255)',
    name: '停车位',
    type: false,
    displayName: t(`${tHead}.legendListData.tcw`)
  },
  {
    color: 'rgb(46, 255, 255)',
    name: '充电枪',
    type: false,
    displayName: t(`${tHead}.legendListData.cdq`)
  }
]);

useEmitt('AIRCITY_EVENT', async (e) => {
  // 点击站点图标高亮
  if (e.eventtype === 'LeftMouseButtonClick') {
    console.log('点击外面的点数据', e);
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
  }
});

const addQuBar = async () => {
  if (!barData?.length) {
    const { data: res } = await Api.parkChargingDistribution({});
    barData = res;
  }
  addBar('qu', barData);
};

const addBar = async (type: 'qu' | 'jd', res, streetCode?) => {
  await __g.marker.deleteByGroupId('rectBar');
  chartHover = false;
  let barArr = [];
  const fileName = type === 'qu' ? 'barPosition4547' : 'jdBarPosition4547';
  let stationCount = res.map((item) => {
    return Math.max(item.totalParkingSpace || 0, item.totalGun || 0);
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

    // let idEnd = type === 'qu' ? item.properties.QUNAME : item.properties.JDNAME;
    let idEnd = type === 'qu' ? item.properties.QUNAME : item.properties.JDCODE;
    let areaCode = type === 'qu' ? item.properties.QUCODE : item.properties.JDCODE + '';

    const itemMax = Math.max(countObj.totalParkingSpace || 0, countObj.totalGun || 0);
    let contentHeight = Math.max((180 * itemMax) / yMax, 60);
    const oPopUpUrl = getPopupHtml({
      usePopupHtml: true,
      com: 'rect-bar2',
      params: {
        value: JSON.stringify({ ...countObj, coordinates: item.geometry.coordinates }),
        yMax: yMax,
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
      imagePath: `${getHtmlUrl()}static/images/barEllipse.png`, //显示图片路径
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      popupURL: oPopUpUrl,
      popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
      autoHidePopupWindow: false,
      popupSize: [100, contentHeight],
      popupOffset: [-50, -contentHeight / 2], //弹窗偏移
      autoHeight: true, // 自动判断下方是否有物体
      displayMode: 2 //智能显示模式  开发过程中请根据业务需求判断使用四种显示模式,
      // priority: item.properties.PRIORITY
    };
    barArr.push(o);
  });
  console.log(barArr);
  await __g.marker.add(barArr, null);
  __g.marker.showAllPopupWindow((res) => {
    console.log(res);
  });
};

const addOutStation = async (module: number, jdcode: string) => {
  await __g.marker.deleteByGroupId('jdStation');
};
bus.on('addBar', async (e: any) => {
  try {
    barData = [];
    console.log('99999999999999');
    const { data: res } = await Api.parkChargingDistribution({ areaCode: e.quCode });
    addBar(e.type, res, e.quCode);
  } catch (err) {
    console.log('请求中断错误', err);
    return;
  }
});

const changeXzqhColor = (polygonId: string, newVal: [number, number, number, number]) => {
  __g.polygon.setColor(polygonId, newVal);
};
const drawHoverBarMarker = async (data, show = false) => {
  await __g.marker.deleteByGroupId('bar-hover-pop');
  if (!show || !data || !chartHover) return;
  const contentHeight = +data.contentHeight;
  const mPopUpUrl = getPopupHtml({
    usePopupHtml: true,
    com: 'power-combine-area',
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
    popupSize: [150, 80],
    popupOffset: [-75, -contentHeight / 2 - 52], //弹窗偏移
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
onMounted(async () => {
  await __g.reset();
  addQuBar();
});
onBeforeUnmount(async () => {
  clearTimeout(timer);
  await __g.marker.deleteByGroupId('bar-hover-pop');
  await __g.marker.deleteByGroupId('rectBar');
  await __g.marker.deleteByGroupId('jdStation');
  bus.off('addBar');
});
</script>

<style scoped></style>
