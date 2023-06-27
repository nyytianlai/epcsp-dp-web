<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-20 15:25:12
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-09 19:53:43
 * @FilePath: \epcsp-dp-web\src\views\public-service\components\map-layer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <qu :module="4" @addQuPoint="addQuPoint"></qu>
  <rect-bar2 ref="rectBar2Ref"></rect-bar2>
  <legend-list
    :legendList="legendListData"
    :legendName="legendNameData"
    v-show="currentPosition == '深圳市' || currentPosition.includes('区')"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import rectBar2 from '@/components/map-layer/rect-bar2.vue';
import { inject, onMounted, onBeforeUnmount, ref, computed,reactive } from 'vue';
import { layerNameQuNameArr, infoObj, getImageUrl, returnStationPointConfig,getImageByCloud } from '@/global/config/map';
import { useMapStore } from '@/stores/map';
import bus from '@/utils/bus';
// import { getQuPoint } from '../api.js';
import { mapQuBar } from '../config.js';
const store = useMapStore();
const currentPosition = computed(() => store.currentPosition);
store.changeStationType([1, 2, 3, 4]);
let legendNameData = ref('人数/人');
let legendListData = reactive([
  {
    color: 'linear-gradient(178.17deg, #FFEE59 4.74%, #746F06 95.4%)',
    name: '注册人数',
    type: false
  },
  {
    color: 'linear-gradient(178.17deg, #59FFFF 4.74%, #067471 95.4%)',
    name: '今日访问量',
    type: false
  }
]);
let rectBar2Ref = ref(null);
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
__g.reset();

const getBarData = () => {
  const data = mapQuBar();
  rectBar2Ref.value.addBar(data, 'qu');
};

const addQuPoint=async (quCode: string)=>{
  await __g.marker.deleteByGroupId('jdStation');
  const { data: res } = await getQuPoint(quCode)
  let pointArr = [];
  console.log('station接口', res);

  res.forEach((item, index) => {
    let xoffset = item.stationName.length * 12;
    item['xoffset'] = xoffset;
    item['stationType'] = 50;
    let o1 = returnStationPointConfig(item);
    // allStationID.push('station-' + item.stationId);
    if (item.isHr == 0) {
      let o = {
        id: 'station-' + index + '-' + item.isHr,
        groupId: 'jdStation',
        userData: item.isHr + '',
        coordinateType: 2,
        coordinate: [item.lng, item.lat],
        anchors: [-11.5, 200],
        imageSize: [33, 36],
        range: [1, 150000],
        imagePath: getImageByCloud('1'),
        displayMode: 2,
        autoHeight: true
      };
      pointArr.push(o);
    }
    pointArr.push(o1);
  });
  await __g.marker.add(pointArr, null);
}
const sendJdBarData = async (value: { type: string; quCode: string }) => {
  // const { data: res } = await jdMonthRate(value.quCode);
  // rectBar2Ref.value.addBar(res.data, value.type, value.quCode);
};
onMounted(async () => {
  // await __g.tileLayer.setCollision(infoObj.terrainId, true, true, true, true);
  getBarData();
  bus.on('addBar', async (e) => {
    // 传参由回调函数中的形参接受
    sendJdBarData(e);
  });
});

onBeforeUnmount(() => {
  bus.off('addBar');
});
</script>
<style lang="less" scoped></style>
