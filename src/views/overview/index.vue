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
            @click="handlePlayUeVideo(item)"
          >
            <div class="card-type">{{ item.stationType }}</div>
            <img :src="item.stationPic" alt="" />

            <el-tooltip :content="item.stationName || ''" placement="top">
              <div class="card-name">{{ item.stationName }}</div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </panel>
    <map-layer :ref="(el) => (mapLayerRef = el)" v-if="aircityObj"></map-layer>
    <panel type="right">
      <div class="box station">
        <title-column title="充电站/设施数量统计" />
        <tabs :data="stationTabType" @changeTab="handleStation" />
        <div class="ec-box">
          <ec-resize :option="ecOption" />
        </div>
      </div>
      <div class="box carbon-sort">
        <title-column title="本月分类碳减排量" />
        <line-time-chart
          :data="lineCarbonData"
          :colors="co2Color"
          yaxisName="万吨"
          mode="onlyLine"
          unit=""
          :chartStyle="{height: '2.3rem'}"
        />
      </div>
      <div class="box">
        <title-column title="本月发用电量数据" />
        <line-time-chart
          :data="lineElectricData"
          :colors="ElectricColor"
          yaxisName="万kwh"
          mode="onlyLine"
          unit=""
          :chartStyle="{height: '2.3rem'}"
        />
      </div>
    </panel>
    <div class="play-btn" @click="handlePlayVideo"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, inject, ref } from 'vue';
import {
  pageNumFun,
  chargingStationsFun,
  energyStationFun,
  photovoltaicStationFun,
  chargingsReplacementCabinetFun,
  digitalTwinSiteFun,
  stationTabType,
  ecOptionFun,
  lineCarbonDataFun,
  lineElectricDataFun
} from './config.js';
import { useUeStore } from '@/stores/ue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import bus from '@/utils/bus';
import PageNum from '@/components/page-num/index.vue';
import Panel from '@/components//panel/index.vue';
import MapLayer from './components/map-layer.vue';
import EcResize from '@sutpc/vue3-ec-resize';
import {selectHrStationInfoForOverview} from './api.js'
const aircityObj = inject('aircityObj');
let mapLayerRef = ref(null);
const co2Color = ['#FF7723', '#00FFF9', '#979797', '#F9E900', 'blue']
const ElectricColor = ['#FF7723', '#979797', '#F9E900', 'blue']
const state = reactive({
  activeBottomMenu: 'overview',
  pageNumData: [],
  chargingStations: [],
  energyStations: [],
  photovoltaicStations: [],
  chargingsReplacementCabinetStations: [],
  digitalTwinSites: []
});
// 左一柱状图
const ecOption = ref(
  ecOptionFun([2001, 2811, 4011, 5910, 6399], ['2019年', '2020年', '2021年', '2022年', '2023年'])
);
// 左二折线图
const lineCarbonData = ref(lineCarbonDataFun());
// 左三折线图
const lineElectricData = ref(lineElectricDataFun());
const store = useVisibleComponentStore();
const uestore = useUeStore();
// 头部累计数据
// 头部累计数据4个指标
const getOverTotalCount = async () => {
  // const res = await overTotalCount();
  // pageNumData.value = pageNumFun(res.data);
};
// 获取数字孪生站点信息
const loadSelectHrStationInfoForOverview = async()=>{
  const res = await selectHrStationInfoForOverview()
  console.log('res',res)
  state.digitalTwinSites = res.data;
}
const handlePlayUeVideo = (item) => {
  
  item['isHr'] = 0;
  store.changeShowComponent(false);
  store.changeShowDetail({
    show: true,
    params: item
  });
  bus.emit('toHr', item);
};
const handlePlayVideo = () => {
  store.changeShowPromitionVideo(true);
};

// 充电站tab点击
const handleStation = (item) => {
  console.log('item', item);
};
onMounted(async() => {
  state.pageNumData = pageNumFun();
  state.chargingStations = chargingStationsFun();
  state.energyStations = energyStationFun();
  state.photovoltaicStations = photovoltaicStationFun();
  state.chargingsReplacementCabinetStations = chargingsReplacementCabinetFun();
  await loadSelectHrStationInfoForOverview()
  
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
  .ec-wrap {
    margin-top: 16px;
  }
}
.ue-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 16px;
}
.ue-item {
  width: 128px;
  height: 104px;
  margin-right: 8px;
  margin-bottom: 12px;
  position: relative;
  cursor: pointer;
  &:nth-child(3n) {
    margin-right: 0;
  }
  img {
    width: 128px;
    height: 80px;
  }
  .card-type {
    position: absolute;
    background: linear-gradient(90deg, #11467b 0%, rgba(17, 70, 123, 0) 100%);
    font-family: 'PingFang SC';
    font-size: 12px;
    font-weight: 500;
    padding: 3px 8px;
    color: #ffffff;
    width: 100%;
  }
  .card-name {
    width: 100%;
    text-align: center;
    color: #4bdeff;
    font-size: 12px;
    font-family: 'PingFang SC';
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  z-index: 999;
}
.station {
  :deep(.tabs) {
    margin-top: 16px;
  }
}
.ec-box {
  height: 230px;
  width: 100%;
  margin-top: 12px;
}
</style>
