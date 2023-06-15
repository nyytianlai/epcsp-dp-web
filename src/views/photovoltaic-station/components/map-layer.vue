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
import { returnStationPointConfig } from '@/global/config/map';
const store = useMapStore();
const currentPosition = computed(() => store.currentPosition);
store.changeStationType([1, 2, 3, 4]);

const aircityObj = inject('aircityObj');
aircityObj.value?.acApi.reset();

let quRef = ref(null);
let rectBarOutRef = ref(null);
const areaCode = ref();
let legendNameData = ref('站点数/个');
let legendListData = reactive([
  {
    color: 'linear-gradient(178.21deg, #5678F9 6.05%, #003077 94.76%)',
    name: '光伏站',
    type: false
  }
]);

// const setRectBarVisibility = (value: boolean) => {
//   value ? store.changeButtomTabCode(1) : store.changeButtomTabCode(2);
//   quRef.value.resetSz(false);
//   legendType.value = value ? 'normal' : 'hot';
//   legendName.value = value ? '充电数量(个)' : '充电功率(KW)';
//   value ? addQuBar() : aircityObj.value?.acApi.marker.deleteByGroupId('rectBar');
// };

const addQuBar = async () => {
  // let data = mapQuBar();
  getDistrict().then(async (res) => {
    const data = (res.data || []).map((item) => {
      item.stationCount = item.countNumber;
      return item;
    });
    await rectBarOutRef.value.addBar('qu', '光伏站', data);
  });
};

const getStreets = (e) => {
  const query = {
    areaCode: e.quCode
  };
  getStreet(query).then((res) => {
    const data = (res.data || []).map((item) => {
      item.stationCount = item.countNumber;
      return item;
    });
    rectBarOutRef.value.addBar(e.type, '光伏站', data, e.quCode);
  });
};

const getPoints = (module, jdcode) => {
  getPoint({ streetId: jdcode }).then(async (res) => {
    const data = (res.data || []).map((item, index) => {
      item.stationId = index;
      item.stationName = item.photovoltaicName;
      item.status = index;
      item.lng = item.longitude;
      item.lat = item.latitude;
      return item;
    });
    let pointArr = [];

    data.forEach((item) => {
      let xoffset = item.stationName.length * 12;
      item['xoffset'] = xoffset;
      item['stationType'] = module;
      let o1 = returnStationPointConfig(item);
      pointArr.push(o1);
    });
    await aircityObj.value?.acApi.marker.add(pointArr, null);
  });
};

const addOutStation = async (module: number, jdcode) => {
  await aircityObj.value?.acApi.marker.deleteByGroupId('jdStation');
  // const { data: res } =
  // const res = mapJdStationPoint();
  getPoints(module, jdcode);
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
