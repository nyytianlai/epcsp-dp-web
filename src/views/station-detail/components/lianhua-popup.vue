<template>
  <div class="panel-box" v-if="showPop">
    <div class="close" @click="handleClose"></div>
    <div class="arrow left-top"></div>
    <div class="arrow right-top"></div>
    <div class="arrow left-bottom"></div>
    <div class="arrow right-bottom"></div>
    <icon :icon="`svg-icon:${state.weatherIcon}`" class="pop-icon" />
    <div class="num-box">
      <div class="num">
        {{ state.currentPower.value }}
        <span class="unit">/W</span>
      </div>
      <div class="label">实时发电功率</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, inject, watch, computed, reactive } from 'vue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { useMapStore } from '@/stores/map';
import { getTreeLayerIdByName } from '@/global/config/map';
import Icon from '@sutpc/vue3-svg-icon';
import bus from '@/utils/bus';
import { lianhuajingguiData } from '../config.js';

const screenPosition = ref(['20%', '50%']);
const store = useVisibleComponentStore();
const mapStore = useMapStore();
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const useEmitt = aircityObj.value?.useEmitt;
const params = ref({
  operatorId: store.detailParams?.operatorId,
  stationId: store.detailParams?.stationId
});
const showPop = ref(false);
const state = reactive({
  weather: 0,
  weatherIcon: '',
  currentPower: {
    value: '0'
  }
});
useEmitt &&
  useEmitt('AIRCITY_EVENT', async (e) => {
    //正常桩
    if (e.PropertyName === '-2Station' && e.ObjectID?.includes('singleCrystalSilicon')) {
      console.log('点击单晶板', e);
      __g.tileLayer.stopHighlightAllActors();
      let ids = getTreeLayerIdByName('-2Station', mapStore.treeInfo);
      // __g.settings.highlightColor(Color.Yellow);
      __g.settings.highlightColor('#FF6B4B');
      __g.tileLayer.highlightActor(ids, e.ObjectID);
      let screenCoord = await __g.coord.world2Screen(...e.MouseClickPoint);
      // console.log('screenCoord', screenCoord);
      screenPosition.value = screenCoord.screenPosition;
      showPop.value = true;
    } else if (
      e.eventtype === 'LeftMouseButtonClick' &&
      e.PropertyName !== '-2Station' &&
      !e.ObjectID?.includes('singleCrystalSilicon')
    ) {
      showPop.value = false;
    }
  });
// 定位到单晶版
const focusToPile = (data) => {
  __g.tileLayer.stopHighlightAllActors();
  let layerId = getTreeLayerIdByName('-2Station', mapStore.treeInfo);
  __g.settings.highlightColor('#FF6B4B');
  __g.tileLayer.highlightActor(layerId, data.id);
  state.currentPower.value = data.value;
  showPop.value = true;
};
const handleClose = () => {
  //清除绿色高亮
  __g.tileLayer.stopHighlightAllActors();
  showPop.value = false;
};
onMounted(async () => {
  if (state.weather) {
    state.weatherIcon = 'cloudy-day';
  } else {
    state.weatherIcon = 'sun-day';
  }
  bus.on('calcVal', (val: string) => {
    state.currentPower.value = val;
  });
  bus.on('focusToPile', (e) => {
    focusToPile(e);
  });
  bus.on('closePowerPopup', (e) => {
    handleClose();
  });
});

onBeforeUnmount(() => {
  bus.off('focusToPile');
  bus.off('closePowerPopup');
});
</script>
<style lang="less" scoped>
.arrow {
  width: 12px;
  height: 12px;
  background-image: url('../../user/images/arrow.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;

  &.left-top {
    left: 0;
    top: 0;
  }
  &.right-top {
    right: 0;
    top: 0;
    transform: rotate(90deg);
  }
  &.left-bottom {
    left: 0;
    bottom: 0;
    transform: rotate(-90deg);
  }
  &.right-bottom {
    right: 0;
    bottom: 0;
    transform: rotate(180deg);
  }
}
.panel-box {
  min-width: 220px;
  display: flex;
  padding: 16px;
  align-items: center;
  background: rgba(18, 40, 73, 0.85);
  box-shadow: inset 0px 0px 16px rgba(10, 167, 255, 0.8);
  position: absolute;
  top: 350px;
  left: 650px;
  z-index: 99;

  .pop-icon {
    font-size: 54px;
  }
  // top: 300px;
  //   left: 650px;

  .num {
    background: linear-gradient(180deg, #00f7ff -71.43%, #d5feff 16%, #00f7ff 96.43%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-weight: 700;
    font-size: 30px;
    font-family: 'DIN Alternate';

    .unit {
      font-size: 14px;
    }
  }

  .label {
    margin-top: 4px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #c0e5ff;
  }

  .close {
    font-size: 16px;
    color: #c0e5ff;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
    &::after {
      content: '\2716';
    }
  }
}
.num-box {
  margin-left: 16px;
}
</style>
