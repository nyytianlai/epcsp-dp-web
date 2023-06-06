<template>
  <div class="home">
    <page-num :data="state.pageNumData" />
    <panel>
      <div class="">
        <title-column title="新能源汽车充电站" />
        <div class="num-wrap">
          <template v-for="(item, index) in state.chargingStations" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
      </div>
    </panel>
    <map-layer :ref="(el) => (mapLayerRef = el)" v-if="aircityObj"></map-layer>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted,inject,ref} from 'vue';
import { pageNumFun, chargingStationsFun } from './config.js';
import PageNum from '@/components/page-num/index.vue';
import Panel from '@/components//panel/index.vue';
import MapLayer from './components/map-layer.vue';

const aircityObj = inject('aircityObj');
let mapLayerRef = ref(null);

const state = reactive({
  activeBottomMenu: 'overview',
  pageNumData: [],
  chargingStations: []
});
// 头部累计数据
// 头部累计数据4个指标
const getOverTotalCount = async () => {
  // const res = await overTotalCount();
  // pageNumData.value = pageNumFun(res.data);
};
onMounted(() => {
  state.pageNumData = pageNumFun();
  state.chargingStations = chargingStationsFun();
});
</script>

<style lang="less" scoped>
.num-wrap {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  :deep(.num-card) {
    width: 49%;
    padding: 24px 0 11px;
    background: linear-gradient(
      258.38deg,
      rgba(37, 177, 255, 0.1) 2.46%,
      rgba(37, 177, 255, 0) 100%
    );
    mix-blend-mode: normal;
    box-shadow: inset 0px 0px 35px rgba(41, 76, 179, 0.2);
    filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.04));
    border-radius: 2px;
    justify-content: center;
    .info {
      flex-direction: column;
      .name {
        margin-bottom: 0;
      }
    }
  }
}
</style>
