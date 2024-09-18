<template>
  <qu ref="quRef" :module="100" @addQuBar="addQuBar" @addOutStation="addOutStation"></qu>
  <rect-bar4 ref="rectBar4Ref"></rect-bar4>
  <legend-list
    :legendList="legendListData"
    :legendName="legendNameData"
    v-show="currentHrStationID == ''"
  />
  <MapLeftBtn>
    <div class="remain-power" @click="handleRemainPoweLayer">
      <img draggable="false" :src="isPlaying ? remainPowerIconA : remainPowerIcon" />
      <!-- <div class="name">APP</div> -->
    </div>
  </MapLeftBtn>
  <CustomerDialog
    class="app-video-dialog"
    title=""
    :visible="isPlaying"
    :width="'4rem'"
    :modal="false"
    @close="isPlaying = false"
  >
    <video :src="video" controls autoplay muted loop width="100%" height="100%">
      <source :src="video" type="video/mp4" />
    </video>
  </CustomerDialog>
  <!-- v-show="currentPosition == '深圳市' || currentPosition.includes('区')" -->
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import RectBar4 from '@/components/map-layer/rect-bar4.vue';
import { inject, reactive, onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { useMapStore } from '@/stores/map';
import MapLeftBtn from '@/components/map-left-btn.vue';
// import { mapJdStationPoint, mapQuBar, mapJdBar } from '../config';
import { getImageByCloud, getHtmlUrl, focusToHihtLightPop } from '@/global/config/map';
import { getDistrictBar, getStreetBar, getStreetPoint } from '../api.js';
import { getStrLength, GCJ02_2_4547 } from '@/utils/index';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import bus from '@/utils/bus';
import { transformCoordsByType } from '@/utils/map-coord-tools';
import { useI18n } from 'vue-i18n';
import remainPowerIcon from '../images/special-secene.png';
import remainPowerIconA from '../images/special-secene.png';
import CustomerDialog from '@/components/custom-dialog/index.vue';
import video from '../APP.mp4';
const { t } = useI18n();
const tHead = `overview.map-layer`;

const store = useMapStore();
const storeVisible = useVisibleComponentStore();
const currentPosition = computed(() => store.currentPosition);
const currentHrStationID = computed(() => store.currentHrStationID); //当前点击的高渲染站点id

const aircityObj = inject<any>('aircityObj');
const { useEmitt } = aircityObj.value;
const __g = aircityObj.value?.acApi;
let currtentStation: any = {};
let timer;

const isPlaying = ref(false);

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

      if (e.Id?.includes('chargingStation-')) {
        if (currtentStation?.isHr == 0 && currtentStation?.hrId) {
          quRef.value.enterStationInfo(currtentStation);
          quRef.value.addHrStation(
            currtentStation.stationId,
            true,
            currtentStation.stationId === '118'
          );
        } else {
          //充电站
          quRef.value.highLightNormalStation(currtentStation);
          quRef.value.enterStationInfo(currtentStation);
        }
      } else {
        let stationType = e.Id.split('-')[1];
        __g.marker.hide(e.Id);
        addHighLightStation(currtentStation, stationType);
      }
    }
  }
  //关闭弹窗
  if (e.eventtype === 'MarkerCallBack' && e.Data == 'closeStationHighLight') {
    if (e.ID?.includes('stationOut-')) {
      __g.marker.delete('stationOut-hight');
      __g.marker.show(currtentStation.stationId1);
    }
  }
});

let quRef = ref(null);
let rectBar4Ref = ref(null);
let legendNameData = ref(t(`${tHead}.legendName`) || '站点数/个');
let legendListData = reactive([
  {
    color: 'linear-gradient(178.1deg, #4AD9FC 3.02%, #003077 97.03%)',
    name: '充电站',
    type: false,
    displayName: t(`${tHead}.legendListData.cdz`)
  },
  {
    color: 'linear-gradient(178.17deg, #FBFF2C 4.74%, #4E6200 95.4%)',
    name: '储能站',
    type: false,
    displayName: t(`${tHead}.legendListData.cnz`)
  },
  {
    color: 'linear-gradient(178.21deg, #6182FF 6.05%, #063273 94.76%)',
    name: '光伏站',
    type: false,
    displayName: t(`${tHead}.legendListData.gfz`)
  },
  {
    color: 'linear-gradient(178.17deg, #2EFFFF 4.74%, #0F6765 95.4%)',
    name: '充换电柜',
    type: false,
    displayName: t(`${tHead}.legendListData.chdg`)
  },
  {
    color: 'linear-gradient(178.22deg, #FF9900 6.41%, #774700 94.78%)',
    name: '换电站',
    type: false,
    displayName: t(`${tHead}.legendListData.hdz`)
  }
]);

const handleRemainPoweLayer = () => {
  isPlaying.value = !isPlaying.value;
};

const addQuBar = async () => {
  const { data: res } = await getDistrictBar();
  await rectBar4Ref.value.addBar('qu', res);
};
let fieldTrans = {
  cabinet: { iconType: 400, name: 'cabinetName', popName: 'chargingsCabinetStationPop' },
  chargingStation: { iconType: 50, name: 'stationName' },
  energyStorageStation: { iconType: 200, name: 'energyStorageName', popName: 'energyStationPop' },
  photovoltaic: { iconType: 300, name: 'photovoltaicName', popName: 'photovoltaicStationPop' },
  powerStation: { iconType: 500, name: 'powerStationName', popName: 'powerExchangeStationPop' }
};

const addOutStation = async (module: number, jdcode: string) => {
  await __g.marker.deleteByGroupId('jdStation');
  await __g.marker.deleteByGroupId('bar-hover-pop');
  const { data: res } = await getStreetPoint({ streetId: jdcode });
  let pointArr = [];
  for (const key in res) {
    if (Object.prototype.hasOwnProperty.call(res, key)) {
      const element = res[key];
      element.forEach((item, index) => {
        const imgName = {
          1: 'station50',
          2: 'station50',
          3: 'stationpoint-ccz',
          4: 'stationpoint-v2g',
          5: 'stationpoint-ccz-oubiao'
        };
        let stationName = fieldTrans[key]['name'];
        let module = fieldTrans[key]['iconType'];
        let xoffset = getStrLength(item[stationName]) * 6;
        let img = 'station' + module;
        if (key == 'chargingStation') {
          item['longitude'] = item.lng;
          item['latitude'] = item.lat;
          img = imgName[item.stationLogo];
        }
        let o1 = {
          id: `stationOut-${key}-${index}`,
          groupId: 'jdStation',
          userData: JSON.stringify(item),
          // coordinateType: 2,
          coordinate: transformCoordsByType([item.longitude, item.latitude], 2), //坐标位置
          anchors: [-22.5, 150], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
          imageSize: [55, 150], //图片的尺寸
          range: [1, 150000], //可视范围
          imagePath: getImageByCloud(img),
          autoHidePopupWindow: false,
          text: item[stationName], //显示的文字
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
        if (key == 'chargingStation') {
          const popupWidth = 146; // 弹框默认宽度
          const fontSize = 24; // 弹框字体大小
          const popupSizeX = item.stationName.length * fontSize + popupWidth; // 弹框宽度
          o1['popupURL'] = `${getHtmlUrl()}/static/html/stationPop.html?value=${
            item.stationName
          }&stationId='station-'+${item.stationId}`; //弹窗HTML链接
          o1['popupBackgroundColor'] = [1.0, 1.0, 1.0, 1]; //弹窗背景颜色
          o1['popupSize'] = [popupSizeX, 60]; //弹窗大小
          o1['popupOffset'] = [-popupSizeX / 2, -100]; //弹窗偏移
          o1['autoHidePopupWindow'] = false;
          o1.id = `stationOut-${key}-${item.stationId}`;
        }
        pointArr.push(o1);
      });
    }
  }
  // await __g.marker.add(pointArr, null);
  setTimeout(() => {
    __g.marker.add(pointArr, null);
  }, 1000);
};

const addHighLightStation = async (item, stationType: string) => {
  let popName = fieldTrans[stationType].popName;
  let iconType = fieldTrans[stationType].iconType;
  let o1 = {
    id: 'stationOut-hight',
    groupId: 'jdStation',
    userData: JSON.stringify(item),
    // coordinateType: 2,
    coordinate: transformCoordsByType([item.longitude, item.latitude], 2), //坐标位置
    anchors: [-35, 200], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [70, 209], //图片的尺寸
    range: [1, 150000], //可视范围
    imagePath: getImageByCloud('hlSta' + iconType),
    popupURL: `${getHtmlUrl()}/static/html/${popName}.html?value=${JSON.stringify(item)}`, //弹窗HTML链接
    popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
    popupSize: [400, 245.6], //弹窗大小
    popupOffset: [-224, -223], //弹窗偏移
    autoHidePopupWindow: false,
    useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
    displayMode: 2,
    autoHeight: true
  };
  await __g.marker.add(o1, null);
  __g.marker.showPopupWindow('stationOut-hight');
  await __g.marker.focus('stationOut-hight', 100, 1, [-90.991409, -90.380768, 0]);
  await focusToHihtLightPop(item.longitude, item.latitude, __g);
};

defineExpose({});

onMounted(async () => {
  await __g.reset();
  await __g.reset(4);
  timer = setTimeout(() => {
    addQuBar();
  }, 200);
  bus.on('addBar', async (e: any) => {
    // const { data: res } = await getStreetBar({ areaCode: e.quCode });
    // rectBar4Ref.value.addBar(e.type, res, e.quCode);
    try {
      const { data: res } = await getStreetBar({ areaCode: e.quCode });
      rectBar4Ref.value.addBar(e.type, res, e.quCode);
    } catch (err) {
      console.log('请求中断错误', err);
      return;
    }
  });
});

onBeforeUnmount(() => {
  bus.off('addBar');
  clearTimeout(timer);
});
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
<style lang="less">
.app-video-dialog.custom-dialog.el-dialog {
  .el-dialog__body {
    height: 6.5rem;

    video {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
