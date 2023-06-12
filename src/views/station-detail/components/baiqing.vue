<template>
  <div class="floor">
    <icon :icon="`svg-icon:all-floor`" />
    <div
      class="floor-item"
      :class="{ selected: selectFloor === f.value }"
      v-for="f in floors"
      :key="f.value"
      @click="handleFloorClick(f)"
    >
      <span class="text">{{ f.text }}</span>
    </div>
  </div>
  <div class="plan" v-if="tabName === '站点规划'">
    <div class="plan-img"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject, onMounted } from 'vue';
import { useMapStore } from '@/stores/map';
import bus from '@/utils/bus';
import Icon from '@sutpc/vue3-svg-icon';
interface Tab {
  viewCode: string;
  viewName: string;
  viewInfo?: string;
}
const selectFloor = ref(0);
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
const mapStore = useMapStore();
const tabName = ref('');
const currentHrStationID = computed(() => mapStore.currentHrStationID.split('station-')[1]);
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const handleStationMonitor = async (height: number) => {
  await __g.misc.callBPFunction({
    functionName: 'GoUp',
    objectName: 'BP_DrawerActor_2',
    paramType: 3,
    paramValue: height
  });
};
const handleStationFloor = async (floor: number) => {
  switch (floor) {
    case 0:
      await __g.camera.set(
        529798.801353,
        2510062.688584,
        131.746738,
        -38.302208,
        93.702721,
        0.000007
      );
      break;
    case 1:
      await __g.camera.set(
        529790.102871,
        2510018.366211,
        114.9771,
        -63.408031,
        91.262276,
        -0.000008
      );
      break;
    case 2:
      await __g.camera.set(
        529793.637988,
        2510026.627129,
        129.55167,
        -63.407997,
        91.26226,
        0.000008
      );
      break;
    case 3:
      await __g.camera.set(529791.592427, 2510041.846445, 135.445664, -44.652344, 89.328076, 0);
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
const handleFloorClick = (item) => {
  handleStationFloor(item.value);
  selectFloor.value = item.value;
};
onMounted(() => {
  bus.on('handleTabSelect', async (e: Tab) => {
    console.log(e);
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
      switch (e.viewCode) {
        case 'v1':
          // 站点总览
          __g.camera.set(...viewInfo, 0);
          break;
        case 'v2':
          // 漫游视角
          __g.camera.set(...viewInfo, 0);
          break;
        case 'v19':
          // 站内设施
          __g.camera.set(...viewInfo, 0);
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
  background: radial-gradient(
      48.84% 50.6% at 50% 48.19%,
      rgba(0, 144, 225, 0.35) 0%,
      rgba(5, 118, 223, 0.03) 100%
    ),
    #000000;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  .plan-img {
    width: 100%;
    height: 100%;
    background-image: url('./images/plan.png');
    background-repeat: no-repeat;
    background-repeat: no-repeat;
    background-size: 70% 70%;
    background-position: center 230px;
    margin: auto;
  }
}
</style>
