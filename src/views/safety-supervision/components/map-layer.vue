<template>
  <qu ref="quRef" :module="3" @addQuBar="addQuBar"></qu>
  <cir-bar3 ref="cirBar3Ref"></cir-bar3>
  <legend-list
    :legendList="legendListData1"
    :legendName="legendNameData1"
    v-show="(currentPosition == '深圳市' || currentPosition.includes('区')) && buttomTabCode == 1"
  />
  <legend-list
    :legendList="legendListData2"
    :legendName="legendNameData2"
    v-show="(currentPosition == '深圳市' || currentPosition.includes('区')) && buttomTabCode == 2"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import cirBar3 from '@/components/map-layer/cir-bar3.vue';
import { inject, onMounted, onBeforeUnmount, ref, reactive, computed } from 'vue';
import request from '@sutpc/axios';
// import {  } from '@/utils/index';
import {
  layerNameQuNameArr,
  quNameCodeInterTrans,
  infoObj,
  getImageUrl,
  getImageByCloud,
  resetSzView
} from '@/global/config/map';
import bus from '@/utils/bus';

import { useMapStore } from '@/stores/map';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `safety-supervision.map-layer`;

const store = useMapStore();
const currentPosition = computed(() => store.currentPosition);
const currentJdCode = computed(() => store.currentJdCode);
const stationType = computed(() => new Set(store.stationType));
store.changeStationType([1, 2, 3]);
const buttomTabCode = computed(() => store.buttomTabCode);
const requestTimer = computed(() => store.requestTimer);
const legendNameData1 = t(`${tHead}.gjjbg`) || '告警级别（个）';

const legendListData1 = reactive([
  {
    color: 'linear-gradient(178.17deg, #FF0005 4.74%, #590303 95.4%)',
    name: '一级 人身安全',
    type: false,
    displayName: t(`${tHead}.legendListData1.yjrsaq`)
  },
  {
    color: 'linear-gradient(178.1deg, #FF7A00 3.02%, #772B00 97.03%)',
    name: '二级 设备安全',
    type: false,
    displayName: t(`${tHead}.legendListData1.ejsbaq`)
  },
  {
    color: 'linear-gradient(178.21deg, #FFF501 6.05%, #7E8E19 94.76%)',
    name: '三级 告警提示',
    type: false,
    displayName: t(`${tHead}.legendListData1.sjgjts`)
  }
]);

const legendNameData2 = t(`${tHead}.cdzzt`) || '充电站状态';
const legendListData2 = reactive([
  {
    color: ' #2AD7FD',
    name: '正常',
    type: false,
    displayName: t(`${tHead}.legendListData2.zc`)
  },
  {
    color: '#FFB800',
    name: '预警',
    type: false,
    displayName: t(`${tHead}.legendListData2.yj`)
  },
  {
    color: '#A3A3A3',
    name: '未上线',
    type: false,
    displayName: t(`${tHead}.legendListData2.wsx`)
  }
]);
let cirBar3Ref = ref(null);
let quRef = ref(null);
const aircityObj = inject<any>('aircityObj');
const __g = aircityObj.value?.acApi;
__g.reset();
// __g.reset(4);
resetSzView(__g);
const setLegendData = (code: 1 | 2) => {
  let legendListData = code == 1 ? legendListData1 : legendListData2;
  legendListData.forEach((item) => {
    item.type = false;
  });
};

const buttomTabChange = async (code: 1 | 2, type = [1, 2, 3]) => {
  console.log('底部按钮切换');
  await quRef.value.deleteJdData();
  store.changeButtomTabCode(code);
  store.changeStationType(type);
  setLegendData(code);
  await __g.marker.deleteByGroupId('rectBar-qu');
  await __g.marker.deleteByGroupId('rectBar-jd');
  await quRef.value.resetSz(); //此函数调用了addQuBar
};

type AlarmType = {
  name: string;
  isChoose: boolean;
  extraName: string;
  typeCode: number;
  positionCode?: 1 | 2;
};
const alarmTypeChange = async (item: AlarmType) => {
  console.log('类型改变参数', item);
  if (item.positionCode !== buttomTabCode.value) {
    // buttomTabChange(item.positionCode, [item.typeCode]);
    return;
  }
  let legendListData = buttomTabCode.value == 1 ? legendListData1 : legendListData2;
  legendListData.forEach((ele) => {
    if (ele.name.includes(item.extraName)) {
      ele.type = !item.isChoose;
      item.isChoose
        ? stationType.value.add(item.typeCode)
        : stationType.value.delete(item.typeCode);
      store.changeStationType(Array.from(stationType.value));
    }
  });
  await __g.marker.deleteByGroupId('rectBar-qu');
  await __g.marker.deleteByGroupId('rectBar-jd');
  if (currentPosition.value.includes('市') && stationType.value.size) {
    debounce(addQuBar);
  } else if (currentPosition.value.includes('区') && stationType.value.size) {
    debounce(addJdBar);
  } else if (currentPosition.value.includes('街道')) {
    debounce(addJdPoint);
  }
};

const addQuBar = async () => {
  await cirBar3Ref.value.addBar({
    code: buttomTabCode.value,
    stationType: Array.from(stationType.value),
    type: 'qu'
  });
};

const addJdBar = async () => {
  await cirBar3Ref.value.addBar({
    code: buttomTabCode.value,
    type: 'jd',
    quCode: quNameCodeInterTrans('name', currentPosition.value),
    stationType: Array.from(stationType.value)
  });
};

const addJdPoint = async () => {
  quRef.value.addStationPoint(currentJdCode.value);
};

const debounce = (fn) => {
  if (requestTimer.value !== null) {
    clearTimeout(requestTimer.value);
  }
  store.changeRequestTimer(
    setTimeout(() => {
      fn();
    }, 1000)
  );
};

defineExpose({ buttomTabChange, alarmTypeChange });

onMounted(async () => {
  // await __g.tileLayer.setCollision(infoObj.terrainId, false, true, false, true);
  // await __g.tileLayer.setCollision(infoObj.terrainId, true, true, true, true);
  addQuBar();
  bus.on('addBar', (e) => {
    cirBar3Ref.value.addBar({
      code: buttomTabCode.value,
      stationType: Array.from(stationType.value),
      type: e.type,
      quCode: e.quCode
    });
  });
});

onBeforeUnmount(() => {
  // __g.polygon.delete(["polygon1"]);
  bus.off('addBar');
});
</script>
<style lang="less" scoped></style>
