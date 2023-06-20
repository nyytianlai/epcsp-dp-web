<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-18 20:40:18
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-09 19:45:18
 * @FilePath: \epcsp-dp-web\src\views\overall\components\map-layer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <qu ref="quRef" :module="300" @addQuBar="addQuBar" @addOutStation="addOutStation"></qu>
  <rect-bar-out ref="rectBarOutRef"></rect-bar-out>
  <legend-list
    :legendList="legendListData"
    :legendName="legendNameData"
    v-show="currentPosition == '深圳市' || currentPosition.includes('区')"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import RectBarOut from '@/components/map-layer/rect-barOut.vue';
import { inject, onMounted, onBeforeUnmount, ref, computed, reactive } from 'vue';
import { useMapStore } from '@/stores/map';
import bus from '@/utils/bus';
import { mapJdStationPoint, mapQuBar, mapJdBar } from '../config';
import { getDistrict, getStreet, getPoint } from '../api';
import { getImageByCloud, getHtmlUrl,focusToHihtLightPop } from '@/global/config/map';
import { getStrLength } from '@/utils/index';
const store = useMapStore();
const currentPosition = computed(() => store.currentPosition);

const aircityObj = inject('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
__g.reset();

let quRef = ref(null);
let rectBarOutRef = ref(null);
const areaCode = ref();
let legendNameData = ref('站点数量/个');
let legendListData = reactive([
  {
    color: 'linear-gradient(178.21deg, #5678F9 6.05%, #003077 94.76%)',
    name: '光伏站',
    type: false
  }
]);

let currtentStation = {};

useEmitt('AIRCITY_EVENT', async (e) => {
  // 点击站点图标高亮
  console.log('点击外面的点数据', e);
  if (e.eventtype === 'LeftMouseButtonClick') {
    if (e.Id?.includes('stationOut-')) {
      currtentStation.stationId ? await __g.marker.show(currtentStation.stationId) : '';
      __g.marker.delete('stationOut-hight');
      currtentStation = JSON.parse(e.UserData);
      currtentStation['stationId'] = e.Id;
      __g.marker.hide(e.Id);
      addHighLightStation(currtentStation);
    }
  }
  //关闭弹窗
  if (e.eventtype === 'MarkerCallBack' && e.Data == 'closeStationHighLight') {
    if (e.ID?.includes('stationOut-')) {
      __g.marker.delete('stationOut-hight');
      __g.marker.show(currtentStation.stationId);
    }
  }
});

const addQuBar = async () => {
  // let data = mapQuBar();
  getDistrict().then(async (res) => {
    await rectBarOutRef.value.addBar('qu', '光伏站', res.data);
  });
};

const getStreets = (e) => {
  const query = {
    areaCode: e.quCode
  };
  getStreet(query).then((res) => {
    rectBarOutRef.value.addBar(e.type, '光伏站', res.data, e.quCode);
  });
};

const getPoints = async (module, jdcode) => {
  const { data: res } = await getPoint({ streetId: jdcode });
  let pointArr = [];

  res.forEach((item, index) => {
    let xoffset = getStrLength(item.photovoltaicName) * 6;
    let o1 = {
      id: 'stationOut-' + index,
      groupId: 'jdStation',
      userData: JSON.stringify(item),
      coordinateType: 2,
      coordinate: [item.longitude, item.latitude], //坐标位置
      anchors: [-22.5, 150], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [55, 150], //图片的尺寸
      range: [1, 150000], //可视范围
      imagePath: getImageByCloud('station' + module),
      autoHidePopupWindow: false,
      text: item.photovoltaicName, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 1500], //文本可视范围[近裁距离, 远裁距离]
      textOffset: [-20 - xoffset, -85], // 文本偏移
      textBackgroundColor: [0 / 255, 46 / 255, 66 / 255, 0.8], //文本背景颜色
      fontSize: 16, //字体大小
      fontOutlineSize: 1, //字体轮廓线大小
      fontColor: '#FFFFFF', //字体颜色
      displayMode: 2,
      autoHeight: true
    };
    pointArr.push(o1);
  });
  await __g.marker.add(pointArr, null);
};

const addOutStation = async (module: number, jdcode: string) => {
  await __g.marker.deleteByGroupId('jdStation');
  getPoints(module, jdcode);
};

const addHighLightStation = async (item) => {
  let o1 = {
    id: 'stationOut-hight',
    groupId: 'jdStation',
    userData: JSON.stringify(item),
    coordinateType: 2,
    coordinate: [item.longitude, item.latitude], //坐标位置
    anchors: [-35, 200], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [70, 209], //图片的尺寸
    range: [1, 150000], //可视范围
    imagePath: getImageByCloud('hlSta300'),
    popupURL: `${getHtmlUrl()}/static/html/photovoltaicStationPop.html?value=${JSON.stringify(
      item
    )}`, //弹窗HTML链接
    popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
    popupSize: [400, 245], //弹窗大小
    popupOffset: [-224, -223], //弹窗偏移
    autoHidePopupWindow: false,
    useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
    displayMode: 2,
    autoHeight: true
  };
  await __g.marker.add(o1, null);
  __g.marker.showPopupWindow('stationOut-hight');
  await __g.marker.focus('stationOut-hight', 100, 1);
  await focusToHihtLightPop(item.longitude, item.latitude,__g)
};

onMounted(async () => {
  addQuBar();
  bus.on('addBar', (e) => {
    console.log(e);
    getStreets(e);
  });
});

onBeforeUnmount(() => {
  bus.off('addBar');
});
</script>
<style lang="less" scoped></style>
