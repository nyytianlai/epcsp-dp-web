<template>
  <div class="home">
    <page-num :data="state.pageNumData" />
    <panel>
      <div class="box">
        <title-column title="新能源汽车充电站" />
        <div class="num-wrap">
          <template v-for="(item, index) in state.chargingStations" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
      </div>
      <div class="box">
        <title-column title="储能站数据" />
        <div class="num-wrap">
          <template v-for="(item, index) in state.energyStations" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
      </div>
      <div class="box">
        <title-column title="光伏站数据" />
        <div class="num-wrap">
          <template v-for="(item, index) in state.photovoltaicStations" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
      </div>
      <div class="box">
        <title-column title="电动车充换电设施" />
        <div class="num-wrap">
          <template v-for="(item, index) in state.chargingsReplacementCabinetStations" :key="index">
            <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
          </template>
        </div>
      </div>
      <div class="box">
        <title-column title="数字孪生站点" />
        <div class="ue-list">
          <div
            class="ue-item"
            v-for="item in state.digitalTwinSites"
            :key="item.id"
            @click="handlePlayUeVideo(item.name)"
          ></div>
        </div>
      </div>
    </panel>
    <panel type="right">
      <div class="box">
        <title-column title="充电站/设施数量统计" />
      </div>
      <div class="box">
        <title-column title="本月分类碳减排量" />
      </div>
      <div class="box">
        <title-column title="本月发用电量数据" />
      </div>
    </panel>
    <div class="play-btn" @click="handlePlayVideo"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import {
  pageNumFun,
  chargingStationsFun,
  energyStationFun,
  photovoltaicStationFun,
  chargingsReplacementCabinetFun,
  digitalTwinSiteFun
} from './config.js';
import { useUeStore } from '@/stores/ue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import bus from '@/utils/bus';
import PageNum from '@/components/page-num/index.vue';
import Panel from '@/components//panel/index.vue';
const state = reactive({
  activeBottomMenu: 'overview',
  pageNumData: [],
  chargingStations: [],
  energyStations: [],
  photovoltaicStations: [],
  chargingsReplacementCabinetStations: [],
  digitalTwinSites: []
});
const store = useVisibleComponentStore();
const uestore = useUeStore();
// 头部累计数据
// 头部累计数据4个指标
const getOverTotalCount = async () => {
  // const res = await overTotalCount();
  // pageNumData.value = pageNumFun(res.data);
};
const handlePlayUeVideo = (station: string) => {
  uestore.changeShowUeVideo(true);
  bus.emit('changeStation', station);
};
const handlePlayVideo = () => {
  store.changeShowPromitionVideo(true);
};
onMounted(() => {
  state.pageNumData = pageNumFun();
  state.chargingStations = chargingStationsFun();
  state.energyStations = energyStationFun();
  state.photovoltaicStations = photovoltaicStationFun();
  state.chargingsReplacementCabinetStations = chargingsReplacementCabinetFun();
  state.digitalTwinSites = digitalTwinSiteFun();
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
.box {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.ue-list {
  display: flex;
  flex-wrap: wrap;
}
.ue-item {
  width: 128px;
  height: 104px;
  margin-right: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  &:nth-child(3n) {
    margin-right: 0;
  }
}

.play-btn {
  width: 36px;
  height: 36px;
  cursor: pointer;
  background-image: url('./images/icon-video.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  top: 148px;
  right: 452px;
  z-index: 10;
}
</style>
