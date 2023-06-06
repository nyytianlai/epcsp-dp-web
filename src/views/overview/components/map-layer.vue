<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-18 20:40:18
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-09 19:45:18
 * @FilePath: \epcsp-dp-web\src\views\overall\components\map-layer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <qu ref="quRef" :module="1" @addQuBar="addQuBar"></qu>
  <rect-bar4 ref="rectBar4Ref"></rect-bar4>
  <legend-list
    :legendList="legendListData"
    :legendName="legendNameData"
    v-show="currentPosition == '深圳市' || currentPosition.includes('区')"
  />
</template>
<script setup lang="ts">
import Qu from '@/components/map-layer/qu.vue';
import RectBar4 from '@/components/map-layer/rect-bar4.vue';
import { inject, reactive, onMounted, onBeforeUnmount, ref, computed } from 'vue';
import request from '@sutpc/axios';
import { projectCGCS2000_2_GK114 } from '@/utils/index';
import { layerNameQuNameArr, getImageUrl } from '@/global/config/map';
import { gcj02ToWgs84 } from '@sutpc/zebra';
import { useMapStore } from '@/stores/map';
const store = useMapStore();
const currentPosition = computed(() => store.currentPosition);
store.changeStationType([1, 2, 3, 4]);

const aircityObj = inject('aircityObj');
aircityObj.value?.acApi.reset();

let quRef = ref(null);
let rectBar4Ref = ref(null);
let legendNameData = ref('站点数/个');
let legendListData = reactive([
  {
    color: 'linear-gradient(178.17deg, #FBFF2C 4.74%, #4E6200 95.4%)',
    name: '储能站',
    type: false
  },
  {
    color: 'linear-gradient(178.21deg, #6182FF 6.05%, #063273 94.76%)',
    name: '光伏站',
    type: false
  },
  {
    color: 'linear-gradient(178.1deg, #4AD9FC 3.02%, #003077 97.03%)',
    name: '充电站',
    type: false
  },
  {
    color: 'linear-gradient(178.17deg, #2EFFFF 4.74%, #0F6765 95.4%)',
    name: '充换电柜',
    type: false
  }
]);

const addQuBar = async () => {
  await rectBar4Ref.value.addBar('qu');
};

defineExpose({});

onMounted(async () => {
  addQuBar();
});

onBeforeUnmount(() => {});
</script>
<style lang="less" scoped></style>
