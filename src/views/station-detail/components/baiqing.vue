<template>
  <div class="floor" v-if="tabName === '站点监测'">
    <icon :icon="`svg-icon:all-floor`" />
    <div
      class="floor-item"
      :class="{ selected: selectFloor === f.value }"
      v-for="f in floors"
      :key="f.value"
      @click="handleClickFloor(f)"
    >
      <span class="text">{{ f.text }}</span>
    </div>
  </div>
  <div class="menu" v-if="isShowMenu">
    <div
      class="menu-item"
      v-for="m in floorMenu"
      :key="m.id"
      :class="{ active: selectMenu === m.id }"
      @click="handleClickMenu(m)"
    >
      <icon :icon="`svg-icon:${m.icon}`" />
      <span class="text">{{ m.name }}</span>
    </div>
  </div>
  <div class="plan" v-if="tabName === '站点规划'">
    <div class="plan-img"></div>
  </div>
  <baoqingchuneng v-if="isShowPanel" />
</template>

<script lang="ts" setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue';
import { useMapStore } from '@/stores/map';
import { getImageByCloud } from '@/global/config/map';
import {
  floor1SpaceMarker,
  floor2SpaceMarker,
  floor1DeviceMarker,
  floor2DeviceMarker
} from '../config';
import bus from '@/utils/bus';
import Icon from '@sutpc/vue3-svg-icon';
import Baoqingchuneng from './baoqingchuneng.vue';
interface Tab {
  viewCode: string;
  viewName: string;
  viewInfo?: string;
}
const selectFloor = ref(0);
const selectMenu = ref();
const floors = [
  {
    value: 0,
    text: '全部'
  },
  {
    value: 1,
    text: 'F1'
  },
  {
    value: 2,
    text: 'F2'
  },
  {
    value: 3,
    text: 'F3'
  }
];

let preViewCode = '';
const floorMenu = [
  {
    id: 1,
    icon: 'space-distribution',
    name: '空间分布'
  },
  {
    id: 2,
    icon: 'device-functions',
    name: '设备功能'
  }
];
const mapStore = useMapStore();
const tabName = ref('站点总览');
const currentHrStationID = computed(() => mapStore.currentHrStationID.split('station-')[1]);
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const isShowMenu = computed(
  () => tabName.value === '站点监测' && (selectFloor.value === 1 || selectFloor.value === 2)
);
const bottomTabs = ['站点总览', '视角漫游', '站内设施'];
const isShowPanel = computed(() => bottomTabs.includes(tabName.value));
const floor3Marker = [
  {
    value: '光伏电池板',
    id: 'photovoltaic',
    groupId: 'stationFacilitiesLabel',
    position: [529775.6925, 2510002.88, 101.244228515625],
    img: 'photovoltaic'
  }
];
// 拆封楼栋
const handleStationMonitor = async (height: number) => {
  await __g.misc.callBPFunction({
    functionName: 'GoUp',
    objectName: 'BP_DrawerActor_2',
    paramType: 3,
    paramValue: height
  });
};
// 添加设施marker
const addMarker = async (data) => {
  const markerArr = [];
  data.forEach((item) => {
    const marker = {
      id: item.id,
      userData: JSON.stringify(item),
      groupId: item.groupId,
      coordinate: item.position, //坐标位置
      anchors: [-24, 52], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [48, 52], //图片的尺寸
      range: [1, 1500], //可视范围
      imagePath: getImageByCloud(item.img),
      text: item.value, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 300], //文本可视范围[近裁距离, 远裁距离]
      textOffset: [-60, -35], // 文本偏移
      textBackgroundColor: [11 / 255, 67 / 255, 92 / 255, 1], //文本背景颜色
      fontSize: 14, //字体大小
      fontColor: '#FFFFFF', //字体颜色
      displayMode: 2
    };
    markerArr.push(marker);
  });

  // //批量添加polygon
  await __g.marker.add(markerArr);
};
// 添加空间分布marker
const addFloorMarker = async (data) => {
  const markerArr = [];
  data.forEach((item) => {
    const marker = {
      id: item.id,
      groupId: item.groupId,
      coordinate: item.position, //坐标位置
      anchors: [-73, 36], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
      imageSize: [146, 36], //图片的尺寸
      range: [1, 1500], //可视范围
      // imagePath: getImageByCloud(item.img),
      text: item.value, //显示的文字
      useTextAnimation: false, //关闭文字展开动画效果 打开会影响效率
      textRange: [1, 300], //文本可视范围[近裁距离, 远裁距离]
      // textOffset: [-120, 0], // 文本偏移
      textBackgroundColor: '#00305C', //文本背景颜色
      fontSize: 16, //字体大小
      fontColor: '#FFFFFF', //字体颜色
      displayMode: 2
    };
    markerArr.push(marker);
  });

  // //批量添加polygon
  await __g.marker.add(markerArr);
};
// 点击楼层处理
const handleClickFloor = (item) => {
  selectFloor.value = item.value;
  selectMenu.value = '';
  handleStationFloor(item.value);
};
const handleStationFloor = async (floor: number) => {
  __g.marker.clear();
  switch (floor) {
    case 0:
      // await __g.camera.set(529798.801353, 2510062.688584, 131.746738, -38.302208, 93.702721, 2);
      await __g.camera.set(529794.542891, 2510059.552969, 131.746738, -38.302212, 90.678322, 2);
      break;
    case 1:
      await __g.camera.set(529790.102871, 2510018.366211, 114.9771, -63.408031, 91.262276, 2);
      break;
    case 2:
      // await __g.camera.set(529793.637988, 2510026.627129, 129.55167, -63.407997, 91.26226, 2);
      await __g.camera.set(529789.625625, 2510026.108125, 126.340615, -56.865108, 91.392326, 2);
      break;
    case 3:
      await __g.camera.set(529791.592427, 2510041.846445, 135.445664, -44.652344, 89.328076, 2);
      addMarker(floor3Marker);
      break;
    default:
      break;
  }
  await __g.misc.callBPFunction({
    functionName: 'SetHidden',
    objectName: 'BP_DrawerActor_2',
    paramType: 2,
    paramValue: floor
  });
};
const handleClickMenu = async (menu) => {
  // if (selectMenu.value === menu.id) {
  handleStationFloor(selectFloor.value);
  // return;
  // }
  selectMenu.value = menu.id;
  await __g.marker.clear();
  switch (selectFloor.value) {
    case 1:
      if (menu.id === 1) {
        addFloorMarker(floor1SpaceMarker);
      } else {
        addMarker(floor1DeviceMarker);
      }
      break;
    case 2:
      if (menu.id === 1) {
        addFloorMarker(floor2SpaceMarker);
      } else {
        addMarker(floor2DeviceMarker);
      }
      break;
    default:
      break;
  }
};
onMounted(() => {
  bus.on('handleTabSelect', async (e: Tab) => {
    __g.marker.delete('photovoltaic');
    selectMenu.value = '';
    if (currentHrStationID.value === '-1') {
      tabName.value = e.viewName;
      if (selectFloor.value !== 0) {
        await __g.misc.callBPFunction({
          functionName: 'SetHidden',
          objectName: 'BP_DrawerActor_2',
          paramType: 2,
          paramValue: 0
        });
      }
      const viewInfo = JSON.parse(e.viewInfo);
      if (!preViewCode) {
        preViewCode = e.viewCode;
      } else {
        if (preViewCode === 'v20') {
          handleStationMonitor(-800);
        }
      }
      preViewCode = e.viewCode;
      selectFloor.value = 0;
      switch (e.viewCode) {
        case 'v1':
          // 漫游视角
          console.log(viewInfo);
          // __g.camera.set(...viewInfo, 0);
          __g.marker.hideByGroupId('stationFacilitiesLabel');
          break;
        case 'v2':
          // 站内设施
          __g.camera.set(...viewInfo, 1);
          __g.marker.showByGroupId('stationFacilitiesLabel');
          break;
        case 'v19':
          // 站点总览
          __g.camera.set(...viewInfo, 1);
          break;
        case 'v20':
          // 站点监测
          await __g.camera.set(...viewInfo, 0);
          await handleStationMonitor(800);
          break;
        case 'v21':
          // 站点规划
          break;
        default:
          break;
      }
    }
  });
});
onUnmounted(() => {
  // __g.marker.delete()
});
</script>

<style lang="less" scoped>
.floor {
  font-size: 16px;
  text-align: center;
  // width: 42px;
  border-radius: 60px;
  background: rgba(4, 22, 43, 0.9);
  border: 1.5px solid rgba(10, 167, 255, 0.37);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 200px;
  right: 200px;
  padding: 18px 7px 10px;
  z-index: 10;
  .el-icon {
    font-size: 30px;
  }
  .floor-item {
    font-size: 16px;
    padding: 10px 0;
    color: #ffffff;
    border-top: 1px solid rgba(78, 89, 106, 0.35);
    text-align: center;
    cursor: pointer;
    &.selected {
      color: #0aa7ff;
    }
    &:hover {
      color: #0aa7ff;
    }
  }
}

.plan {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url('./images/baoqing-plan-bg.png');
  position: absolute;
  left: 0;
  right: 0;
  top: 105px;
  bottom: 0;
  z-index: 1000;
  .plan-img {
    width: 1669px;
    height: 827px;
    background-image: url('./images/plan.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: auto;
    margin-top: 69px;
  }
}

.menu {
  position: absolute;
  top: 300px;
  left: 100px;
  padding: 10px;
  background-color: rgba(35, 38, 45, 0.43);
  .menu-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    &.active {
      background-image: url('./images/menu-active.png');
    }
    &:hover {
      background-image: url('./images/menu-active.png');
    }
  }
  .el-icon {
    font-size: 50px;
  }
  .text {
    color: #b4e4ff;
    margin-left: 6px;
    font-size: 18px;
  }
}
</style>
