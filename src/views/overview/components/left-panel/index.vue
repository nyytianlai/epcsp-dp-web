<template>
  <panel>
    <div class="left-wrap">
      <!-- zdlxtj: '站点类型统计' -->
      <title-column :title="t(`${tHead}.zdlxtj`)" />
      <div class="left-title-container">
        <div class="left-title__panel line-box">
          <!-- 新能源汽车充电站 -->
          <div class="box-title">{{ t(`${tHead}.xnyqccdz`) }}</div>
          <div class="num-wrap">
            <template v-for="(item, index) in state.chargingStations" :key="index">
              <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
            </template>
          </div>
        </div>
        <div class="left-title__panel line-box">
          <!-- 储能站 cnz: '储能站'-->
          <div class="box-title">{{ t(`${tHead}.cnz`) }}</div>
          <div class="num-wrap">
            <template v-for="(item, index) in state.energyStations" :key="index">
              <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
            </template>
          </div>
        </div>
        <div class="left-title__panel line-box">
          <!-- 光伏站 gfz: '光伏站' -->
          <div class="box-title">{{ t(`${tHead}.gfz`) }}</div>
          <div class="num-wrap">
            <template v-for="(item, index) in state.photovoltaicStations" :key="index">
              <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
            </template>
          </div>
        </div>
        <div class="left-title__panel line-box">
          <!-- 电动自行车充换电柜 ddzxcchdg: '电动自行车充换电柜'-->
          <div class="box-title">{{ t(`${tHead}.ddzxcchdg`) }}</div>
          <div class="num-wrap">
            <template
              v-for="(item, index) in state.chargingsReplacementCabinetStations"
              :key="index"
            >
              <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
            </template>
          </div>
        </div>
        <div class="left-title__panel line-box">
          <!-- 换电站 hdz: '换电站'-->
          <div class="box-title">{{ t(`${tHead}.hdz`) }}</div>
          <div class="num-wrap">
            <template v-for="(item, index) in state.changeElectric" :key="index">
              <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
            </template>
          </div>
        </div>
      </div>

      <div class="box">
        <!-- sznszd: '数字孪生站点' 数字孪生站点  -->
        <title-column :title="t(`${tHead}.sznszd`)" />
        <div class="use-list-container">
          <div class="ue-list">
            <div
              class="ue-item"
              v-for="item in state.digitalTwinSites"
              :key="item.id"
              @click="handlePlayUeVideo(item)"
            >
              <div class="card-type">{{ item.stationType }}</div>
              <img :src="item.stationPic" alt="" />
              <div class="card-name" v-if="item.stationName.length < 9">{{ item.stationName }}</div>
              <el-tooltip :content="item.stationName || ''" placement="top" v-else>
                <div class="card-name">{{ item.stationName }}</div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { reactive, onMounted, inject, ref } from 'vue';
import {
  chargingStationsFun,
  changeElectricFun,
  chargingsReplacementCabinetFun,
  energyStationFun,
  photovoltaicStationFun
} from '../../config.js';
import { selectHrStationInfoForOverview, chargingStation, totalStatistics } from '../../api.js';

import { useVisibleComponentStore } from '@/stores/visibleComponent';
import bus from '@/utils/bus';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `overview.left-panel`;

const state = reactive({
  activeBottomMenu: 'overview',
  pageNumData: [],
  chargingStations: [] as any[],
  energyStations: [] as any[],
  photovoltaicStations: [] as any[],
  chargingsReplacementCabinetStations: [] as any[],
  digitalTwinSites: [] as any[],
  changeElectric: [] as any[]
});
const store = useVisibleComponentStore();
// 获取数字孪生站点信息
const loadSelectHrStationInfoForOverview = async () => {
  const res = await selectHrStationInfoForOverview();
  state.digitalTwinSites = (res && res.data) || [];
};
// 获取新能源充电站
const loadChargingStation = async () => {
  const res = await chargingStation();
  state.chargingStations = chargingStationsFun(res.data);
  state.photovoltaicStations = photovoltaicStationFun(res.data);
};
// 获取电动自行车
const loadTotalStatistics = async () => {
  const res = await totalStatistics();
  state.chargingsReplacementCabinetStations = chargingsReplacementCabinetFun(res.data);
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

onMounted(async () => {
  state.energyStations = energyStationFun();
  state.photovoltaicStations = photovoltaicStationFun();

  state.changeElectric = changeElectricFun();
  loadSelectHrStationInfoForOverview();
  loadChargingStation();
  loadTotalStatistics();
});
</script>

<style lang="less" scoped>
.left-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.left-title-container {
  margin-top: 10px;
  flex: 1;
  // height: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  background: linear-gradient(
    90.1deg,
    rgba(37, 177, 255, 0.02) 0.08%,
    rgba(37, 177, 255, 0.09) 99.9%
  );
  mix-blend-mode: normal;
  border-radius: 2px;
  // padding-top: 12px;

  .box-title {
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 12px;

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
.left-title__panel {
  flex: 1;
  // height: 0;
  display: flex;
  flex-direction: column;
}
.num-wrap {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-top: 16px;

  :deep(.num-card) {
    // width: 49%;
    flex: 1;
    width: 0;
    display: flex;
    justify-content: center;
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
  }
}

.ue-list {
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  // justify-content: center;
  // gap: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  justify-content: space-between;
  place-content: pace-evenly;
  margin-top: 16px;
}
.use-list-container {
  resize: horizontal;
  container-name: ueList;
  container-type: inline-size;
}
@container ueList (min-width: 500px) {
  .ue-list {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
  }
}

.ue-item {
  display: grid;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
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
</style>
