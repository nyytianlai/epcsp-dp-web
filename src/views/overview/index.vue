<template>
  <div class="home">
    <!-- <page-num :data="state.pageNumData" /> -->
    <panel>
      <div class="left-container">
        <div class="box">
          <div class="box-title">新能源汽车充电站</div>
          <div class="num-wrap">
            <template v-for="(item, index) in state.chargingStations" :key="index">
              <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
            </template>
          </div>
        </div>
        <div class="box">
          <div class="box-title">储能站</div>
          <div class="num-wrap">
            <template v-for="(item, index) in state.energyStations" :key="index">
              <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
            </template>
          </div>
        </div>
        <div class="box">
          <div class="box-title">光伏站</div>
          <div class="num-wrap">
            <template v-for="(item, index) in state.photovoltaicStations" :key="index">
              <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
            </template>
          </div>
        </div>
        <div class="box">
          <div class="box-title">电动自行车充换电柜</div>
          <div class="num-wrap">
            <template
              v-for="(item, index) in state.chargingsReplacementCabinetStations"
              :key="index"
            >
              <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
            </template>
          </div>
        </div>
        <div class="box">
          <div class="box-title">换电站</div>
          <div class="num-wrap">
            <template v-for="(item, index) in state.changeElectric" :key="index">
              <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
            </template>
          </div>
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
        <title-column title="充储放设施数量统计" />
        <tabs :data="stationTabType" @changeTab="handleStation" />
        <div class="ec-box">
          <ec-resize :option="ecOption" />
        </div>
      </div>
      <div class="box carbon-sort">
        <title-column title="分类碳减排量" />
        <!-- <ec-resize :option="lineCarbonOption" /> -->
        <line-time-chart
          :data="lineCarbonData"
          :colors="co2Color"
          yaxisName="吨"
          mode="onlyLine"
          unit=""
          :chartStyle="{ height: '2.3rem', width: '4.8rem' }"
          :customOption="{ legend: { left: 0 } }"
        />
      </div>
      <div class="box ele">
        <title-column title="充储放电数据" />
        <line-time-chart
          :data="lineElectricData"
          :colors="ElectricColor"
          yaxisName="万kwh"
          mode="onlyLine"
          unit=""
          :chartStyle="{ height: '2.3rem', width: '4.8rem' }"
          :customOption="{ legend: { left: 0 } }"
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
  stationTabType,
  ecOptionFun,
  lineCarbonDataFun,
  lineCarbonOptionFun,
  lineElectricDataFun,
  changeElectricFun
} from './config.js';
import { useUeStore } from '@/stores/ue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import bus from '@/utils/bus';
import PageNum from '@/components/page-num/index.vue';
import Panel from '@/components//panel/index.vue';
import MapLayer from './components/map-layer.vue';
import EcResize from '@sutpc/vue3-ec-resize';
import { selectHrStationInfoForOverview, chargingStation } from './api.js';
const aircityObj = inject('aircityObj');
let mapLayerRef = ref(null);
const co2Color = ['green', 'blue', '#F9E900', '#9A4AFF', '#FF7723'];
const ElectricColor = ['green', 'blue', '#F9E900', '#9A4AFF', '#FF7723'];
const state = reactive({
  activeBottomMenu: 'overview',
  pageNumData: [],
  chargingStations: [],
  energyStations: [],
  photovoltaicStations: [],
  chargingsReplacementCabinetStations: [],
  digitalTwinSites: [],
  changeElectric: []
});
// 左一柱状图
const ecOption = ref(
  ecOptionFun([2001, 2811, 4011, 5910, 7302], ['2019年', '2020年', '2021年', '2022年', '2023年'])
);
// 左二折线图
const lineCarbonData = ref(lineCarbonDataFun());
const lineCarbonOption = {};
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
const loadSelectHrStationInfoForOverview = async () => {
  const res = await selectHrStationInfoForOverview();
  state.digitalTwinSites = res.data;
};
// 获取新能源充电站
const loadChargingStation = async () => {
  const res = await chargingStation();
  state.chargingStations = chargingStationsFun(res.data);
};
const handlePlayUeVideo = (item) => {
  item['isHr'] = 0;
  store.changeShowComponent(false);
  // if (!item.trueStation) {
  store.changeShowDetail({
    show: true,
    params: item
  });
  // }
  bus.emit('toHr', item);
};
const handlePlayVideo = () => {
  store.changeShowPromitionVideo(true);
};

// 充电站tab点击
const handleStation = (item) => {
  console.log('item', item);
  switch (item.code) {
    case 1:
      ecOption.value = ecOptionFun(
        [2001, 2811, 4011, 5910, 7302],
        ['2019年', '2020年', '2021年', '2022年', '2023年']
      );
      break;
    case 2:
      ecOption.value = ecOptionFun(
        [1, 5, 7, 10, 16],
        ['2019年', '2020年', '2021年', '2022年', '2023年']
      );
      break;
    case 3:
      ecOption.value = ecOptionFun(
        [128, 378, 553, 824, 1190],
        ['2019年', '2020年', '2021年', '2022年', '2023年']
      );
      break;
    case 4:
      ecOption.value = ecOptionFun(
        [932, 1823, 2734, 3289, 3488],
        ['2019年', '2020年', '2021年', '2022年', '2023年']
      );
      break;
    case 5:
      ecOption.value = ecOptionFun(
        [4, 23, 31, 39, 42],
        ['2019年', '2020年', '2021年', '2022年', '2023年']
      );
      break;
  }
};
onMounted(async () => {
  state.pageNumData = pageNumFun();
  state.energyStations = energyStationFun();
  state.photovoltaicStations = photovoltaicStationFun();
  state.chargingsReplacementCabinetStations = chargingsReplacementCabinetFun();
  state.changeElectric = changeElectricFun();
  await loadSelectHrStationInfoForOverview();
  await loadChargingStation();
});
</script>

<style lang="less" scoped>
.left-container {
  margin-bottom: 20px;
  background: linear-gradient(
    90.1deg,
    rgba(37, 177, 255, 0.02) 0.08%,
    rgba(37, 177, 255, 0.09) 99.9%
  );
  mix-blend-mode: normal;
  border-radius: 2px;
  padding-top: 12px;
  padding-bottom: 12px;

  .box-title {
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 20px;

    &::before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 5px;
      border: 5px solid rgba(249, 233, 0, 0.1);
      background: #f9e900;
      transform: rotate(45deg);
      background-clip: padding-box;
      margin-right: 8px;
    }
  }
}

.num-wrap {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;

  :deep(.num-card) {
    width: 49%;
    // padding: 24px 0 11px;
    // background: linear-gradient(
    //   258.38deg,
    //   rgba(37, 177, 255, 0.1) 2.46%,
    //   rgba(37, 177, 255, 0) 100%
    // );
    mix-blend-mode: normal;
    // box-shadow: inset 0px 0px 35px rgba(41, 76, 179, 0.2);
    // filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.04));
    border-radius: 2px;

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
    margin-left: -60px;
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

    .tab {
      margin-right: 26px;
    }
  }
}

.ec-box {
  height: 230px;
  width: 100%;
  margin-top: 12px;
}
</style>
