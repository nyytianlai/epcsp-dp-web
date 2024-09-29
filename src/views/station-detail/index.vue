<template>
  <page-num :data="pageNumData" v-if="pageNumData?.length !== 0" :class="{ isSuper }" />
  <panel v-if="isShowBoth" style="z-index: 22">
    <div class="station-info">
      <!-- cdzdxx: '充电站点信息',  -->
      <title-column :title="t(`${tHead}.cdzdxx`)" />
      <station-info :data="stationInfoData" :isVirture="isVirtual" />
    </div>
    <div class="device-info">
      <!-- sbssxx: '设备设施信息' -->
      <title-column :title="t(`${tHead}.sbssxx`)" />
      <div class="pile-charger-header">
        <tabs
          :data="curBtn === 'cdzlx' ? chargingStationTabs : chargingStationGunTabs"
          @changeTab="handleChargeChange"
        />
        <div class="right-tab-btn">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            class="tab-btn"
            :class="{ active: curBtn === item.value }"
            @click="handleTabBtn(item)"
          >
            {{ item.displayName || item.name }}
          </div>
        </div>
      </div>
      <!-- cdzzs: '充电桩总数',  cdqzs: '充电枪总数' -->
      <pie-chart
        class="device-total-pie"
        :data="chargingStationPieData"
        :totalName="
          curBtn === 'cdzlx'
            ? t(`${tHead}.cdzzs`) || '充电桩总数'
            : t(`${tHead}.cdqzs`) || '充电枪总数'
        "
        :colors="chargingColors"
      />
    </div>
    <div class="warning-message">
      <!-- gjxx: '告警信息' -->
      <title-column title="告警列表" :showBtn="true" @handleClick="handleShowWarning" />
      <!-- <warning-tabs
        :data="warningTabsData"
        @changeTab="(data) => handleChangeTab(data, 'warning-message')"
        v-if="isShowList"
      />
      <div class="wran-year-list-box" v-if="isShowList">
        <div class="wran-year-list" v-for="(item, index) in warningListYearData" :key="index">
          <div class="year-name">{{ index }}</div>
          <warning-list @handleClick="clickWarningList" :data="item" height="fit-content" />
        </div>
      </div> -->
      <scroll-table :scrollTableData="scrollTableData" :columnKeyList="columnKeyList" />
      <!-- <line-time-chart
        v-if="!isShowList"
        :data="realtimeTrend"
        :chartStyle="{ height: '2.55rem' }"
        :colors="warnColor"
        mode="haveTab"
      /> -->
      <!-- <EcResize v-if="!isShowList" class="warning-ec-wrap" :option="state.realtimeTrend" /> -->
    </div>
  </panel>
  <panel type="right" v-if="isShowBoth">
    <div class="charging-bar-state">
      <!-- zdcdzzt: '站点充电桩状态' -->
      <title-column :title="showGunInfo ? '充电枪状态' : t(`${tHead}.zdcdzzt`)" />
      <charging-state
        :isGun="showGunInfo"
        :data="chargingStateData"
        @handleClickState="focusToPile"
      />
    </div>
    <div class="device-use-info">
      <!-- cdssrsyxx: '充电设施日使用信息', 充电设施日使用信息 -->
      <title-column title="充电设施实时使用信息" />
      <tabs
        :data="chargingTypesTabs"
        @changeTab="(data) => handleChangeTab(data, 'device-use-info')"
      />
      <div class="num-wrap">
        <template v-for="(item, index) in chargingTypesData" :key="index">
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
    </div>
    <div class="station-power">
      <!-- zdssgl: '站点实时功率' -->
      <title-column :title="t(`${tHead}.zdssgl`)" />
      <line-time-chart
        :data="lineTimeData"
        unit="kW"
        :colors="lineTimeColors"
        :customOption="{ animation: false }"
        :chartStyle="{
          width: '100%',
          flex: '1',
          minHeight: 0
        }"
      />
      <!-- <line-time-chart
        unit="kW"
        :data="linePowerData"
        :colors="['#F9E900', 'blue']"
        :chartStyle="{ height: '2.22rem' }"
      /> -->
    </div>
  </panel>
  <lianhuaxi v-if="isLianhuaxi" />
  <!-- <div class="backBox">
    <img src="./images/back.png" alt="" @click="backSz" />
  </div> -->
  <Goback @click="backSz" />
  <bottom-tabs :tabData="tabData" v-if="!isHr && tabHasData" />
  <!-- isHr是0 是高渲染站点 -->
  <pile-dialog
    :visible="pileVisible"
    :type="pileType"
    :pileVideoData="pileVideoData"
    :pileParams="pileParams"
    @close="hanldeCloseCameraDialog"
    @click-warn="handleWarn"
  />
  <warningBox
    v-model:visible="warnVisible"
    :pileParams="pileParams"
    @close="handleClose"
    @click-detail="handleDetail"
  />
  <map-layer v-if="aircityObj" />
  <!-- gjlb: '告警列表', 告警列表 -->
  <custom-dialog v-model:visible="dialogTableVisible" :title="t(`${tHead}.gjlb`)">
    <el-table
      :data="scrollTableData"
      height="6.19rem"
      style="width: 100%"
      class="custom-dialog-table"
    >
      <el-table-column
        v-for="(item, index) in columnData"
        :key="index"
        v-bind="item"
        :show-overflow-tooltip="true"
        :formatter="tableColumnFun"
      >
        <!-- <template #default="scope"></template> -->
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageObj.pageSize"
      layout="prev, pager, next"
      :total="pageObj.total"
      :background="true"
      :current-page="pageObj.currentPage"
      @current-change="handPageChange"
    />
  </custom-dialog>
  <BaoqingDialog
    :mode="tileLayerDialogMode"
    :headerData="state.headerData"
    :visible="showBqDialog"
    v-if="showBqDialog"
    @handleClose="handleCloseBqDialog"
  ></BaoqingDialog>
</template>
<script lang="ts" setup>
import { ref, inject, watch, computed, reactive, onUnmounted } from 'vue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { useMapStore } from '@/stores/map';
import stationInfo from './components/station-info.vue';
import Lianhuaxi from './components/lianhuaxi.vue';
import chargingState from './components/charging-state.vue';
import warningBox from './components/pile-dialog/warning-box.vue';
import BottomTabs from './components/bottom-tabs.vue';
import PileDialog from './components/pile-dialog/pile-dialog.vue';
import MapLayer from './components/map-layer.vue';
import EcResize from '@sutpc/vue3-ec-resize';
import { tableColumnFun } from '@/global/commonFun.js';
import Goback from '@/components/goback/index.vue';
import { useI18n } from 'vue-i18n';
import ScrollTable from '@/views/safety-supervision/components/scroll-table.vue';
import { timePowerGraph } from '@/views/charging-station/api.js';
import { lineTimeDataFun } from '@/views/charging-station/config.js';
const { t } = useI18n();
const tHead = `station-detail`;

// import WarnList from './components/warn-list.vue';
import {
  selectStationStatistics,
  selectEquipmentCountByStationId,
  selectStationInfoByStationId,
  selectWarningInfoByStationId,
  selectEquipmentStatusByStationId,
  selectConnectorStatusByStationId,
  selectEquipmentUseRateByStationId,
  selectStationRealTimePowerByStationId,
  selectWarningStatisticByStationId,
  viewMenuData,
  alarmLevelAndTypeByTIme,
  selectDetailChargeCount,
  getAlarmList
} from './api.js';
import {
  getSuperHeaderData,
  pageNumFun,
  deviceInfoDataFun,
  warningTabsDataFun,
  chargingTypesTabsFun,
  chargingTypesFun,
  linePowerDataFun,
  columnDataFun,
  stationWarnFun,
  stationWarnOption,
  chargingStationTabsFun,
  chargingStationGunTabsFun,
  chargingStationPieDataFun,
  columnKeyList
} from './config.js';
import bus from '@/utils/bus';
import { handleClickFocus } from './mapOperate';
import { getTreeLayerIdByName } from '@/global/config/map';
import BaoqingDialog from './components/baoqing-dialog.vue';
// import { BaoAnMenu } from './bottom-menu';

import dayjs from 'dayjs';
const chargingColors = ['#E5CC48', '#3254DD', '#4BDEFF', '#ED8ECA', '#BEE5FB'];
const realtimePowerColors = ['green'];
const showBqDialog = ref(false);

const tileLayerDialogMode = ref('');
// 站点充电桩状态-展示充电枪信息的站点
const gunListStations = ['4401040161', '4403040422'];
const showGunInfo = computed(() => gunListStations.includes(store.detailParams?.stationId));

const headerDataMsg = {
  pcsCabinet: {
    icon: 'pcs',
    name: '#1PCS',
    status: '正常',
    code: '1466444643AD64612'
  },
  batteryCluste: {
    icon: 'batteryCluster',
    name: '#1电池簇',
    status: '开路',
    code: '12837479W900Q00D0'
  },
  batteryCluster: {
    icon: 'batteryCluster',
    name: '#1电池簇',
    status: '开路',
    code: '12837479W900Q00D0'
  },
  bmsConversionCabinet: {
    icon: 'pcs',
    name: 'BMS规约转换柜',
    status: '正常',
    code: '15648779W900Q04153'
  },
  photovoltaicPanels: {}
};

// 是否展示告警
const warnVisible = ref(false);
// 左二图的tab
const curBtn = ref('cdzlx');
const chargeTab = ref('cdzlx');
const chargingStationPieData = ref([]);
// 充电类型
const chargingStationTabs = ref(chargingStationTabsFun());
const chargingStationGunTabs = ref(chargingStationGunTabsFun());

const tabList = ref([
  { value: 'cdzlx', name: '桩', index: 1, displayName: t(`${tHead}.tabList.pile`) },
  { value: 'cdqlx', name: '枪', index: 2, displayName: t(`${tHead}.tabList.gun`) }
]);
const chargeData = ref();
// 设备类型
const equipmentType = ref(1);
const store = useVisibleComponentStore();
const mapStore = useMapStore();
const aircityObj = inject<any>('aircityObj');
const __g = aircityObj.value?.acApi;
const useEmitt = aircityObj.value?.useEmitt;
const params = ref({
  operatorId: store.detailParams?.operatorId,
  stationId: store.detailParams?.stationId
});
// const pageNumData = ref(pageNumFun());
const stationInfoData = ref<any>({});
const deviceInfoData = ref(deviceInfoDataFun());
// const warnColor = ['#FF6B4B'];
const isHr = computed(() => store.detailParams?.isHr);
// 是否为超充站
const isSuper = computed(
  () => store.detailParams?.isSuper || store.detailParams?.stationLogo === '3'
);
// 是否为虚拟电厂进入
const isVirtual = computed(() => store.detailParams?.fromVirture);
const isLianhuaxi = computed(() => store.detailParams?.stationId === '-2');
const pageNumData = ref(
  isSuper.value ? getSuperHeaderData({}, store.detailParams?.equipType) : pageNumFun()
);
const tabHasData = ref(false);
const tabData = ref([]);
// 实时告警趋势情况
const state = reactive({
  realtimeTrend: stationWarnOption,
  headerData: {
    icon: '',
    name: '',
    status: '',
    code: ''
  }
});
// 是否展示两边
const isShowBoth = ref(true);
// 是否展示趋势图
const isShowList = ref(true);
//告警弹窗分页
const columnData = ref(columnDataFun());
const alarmTableData = ref([]);
const pageObj = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
const dialogTableVisible = ref(false);
// 弹窗
const pileVisible = ref(false);
const pileType = ref();
const pileVideoData = ref();
const pileParams = ref();
//告警信息
const warningTabsData = ref(warningTabsDataFun());
const warningListData = ref([]);
const warningListYearData = ref({});
//站点充电桩状态
const chargingStateData = ref([]);
const chargingStateDataObj = ref({});
//充电设施日使用信息
const chargingTypesTabs = ref(chargingTypesTabsFun());
const chargingTypesData = ref(chargingTypesFun());

// 站点实时功率
const linePowerData = ref(linePowerDataFun());
// 获取底图菜单栏数据
const getButtomMenuData = async () => {
  const res = await viewMenuData({ stationId: store.detailParams?.stationId });
  if (res) {
    // console.log('底部菜单栏数据', res);
    tabData.value.length = 0;
    if (res.data && res.data.length) {
      tabHasData.value = true;
      tabData.value.push(...res.data);
    }
  }
};
// 获取设备信息
const loadSelectDetailChargeCount = async () => {
  const res = await selectDetailChargeCount({
    equipmentType: equipmentType.value,
    operatorId: store.detailParams.operatorId,
    stationId: store.detailParams.stationId
  });
  chargeData.value = res.data;
  chargingStationPieData.value = chargingStationPieDataFun(chargeTab.value, chargeData.value);
};
const getAlarmLevelAndTypeByTIme = async () => {
  if (!store.detailParams.stationId) {
    return;
  }
  let { data } = await alarmLevelAndTypeByTIme({
    operatorId: store.detailParams.operatorId,
    stationId: store.detailParams.stationId
  });
  if (data && data.length) {
    const optionData = stationWarnFun(data);
    state.realtimeTrend.xAxis.data = optionData.xAxis;
    state.realtimeTrend.series = optionData.seriesData;
  }
  // state.realtimeTrend = realtimeTrendFun(data || []);
};
// 统计数据
const getStationStatistics = async () => {
  const res = await selectStationStatistics(params.value);
  // pageNumData.value = pageNumFun(res?.data);
  pageNumData.value = isSuper.value
    ? getSuperHeaderData(res?.data, store.detailParams?.equipType)
    : pageNumFun(res?.data);
};
//设备详情/站点信息
const getStationInfoByStationId = async () => {
  const res = await selectStationInfoByStationId(params.value);
  if (res) {
    stationInfoData.value = res.data;
  }
};
// 设备详情/设备设施信息
const getEquipmentCountByStationId = async () => {
  const res = await selectEquipmentCountByStationId(params.value);
  if (res) {
    deviceInfoData.value = deviceInfoDataFun(res.data);
  }
};
//设备详情/告警信息列表
const getWarningInfoByStationId = async (alarmLevel, pageNum = 1, pageSize = 999, type?) => {
  const res = await selectWarningInfoByStationId({
    ...params.value,
    alarmLevel,
    pageNum,
    pageSize
  });
  if (type === 'table') {
    pageObj.total = res?.data?.totalData || 0;
    alarmTableData.value = res?.data?.dataList || [];
  } else {
    if (res?.data && res?.data?.dataList && res?.data?.dataList?.length) {
      // 更改数据格式
      warningListData.value = res.data.dataList.map((item) => {
        return {
          date: item.alarmTime,
          message: item.alarmDesc,
          area: item.equipmentName,
          isClick: true,
          ...item
        };
      });
      // 遍历信息
      warningListData.value.forEach((i) => {
        // 转换日期格式
        const date = dayjs(i.alarmTime).format('DD/MM/YYYY');
        // 利用对象属性的唯一性进行数据过滤
        if (!warningListYearData.value[date]) {
          warningListYearData.value[date] = [];
        }

        warningListYearData.value[date].push(i);
      });
      console.log('temp', warningListYearData.value);
    } else {
      warningListYearData.value = {};
    }
  }
};
//设备详情/站点充电桩状态
const getEquipmentStatusByStationId = async () => {
  const res = await (gunListStations.includes(params.value.stationId)
    ? selectConnectorStatusByStationId
    : selectEquipmentStatusByStationId)(params.value);
  const eidObj = {};
  chargingStateData.value = (res?.data || []).map((item) => {
    eidObj[item.eid] = item;
    return item;
  });
  chargingStateDataObj.value = eidObj;
};
//设备详情/充电设施日使用信息
const getEquipmentUseRateByStationId = async (equipmentType) => {
  const res = await selectEquipmentUseRateByStationId({
    ...params.value,
    equipmentType
  });
  chargingTypesData.value = chargingTypesFun(res?.data);
};
// 设备详情/站点实时功率
const getStationRealTimePowerByStationId = async () => {
  const res = await selectStationRealTimePowerByStationId(params.value);
  linePowerData.value = linePowerDataFun(res?.data);
};
//设备详情/告警信息统计
const getWarningStatisticByStationId = async () => {
  const res = await selectWarningStatisticByStationId(params.value);
  warningTabsData.value = warningTabsDataFun(res?.data);
};
const handleChangeTab = (data: any, type) => {
  if (type === 'device-use-info') {
    getEquipmentUseRateByStationId(data.code);
  } else if (type === 'warning-message') {
    warningListYearData.value = {};
    getWarningInfoByStationId(data.code, 1, 10);
  }
};
const handleCloseBqDialog = async () => {
  showBqDialog.value = false;
  await __g.tileLayer.stopHighlightAllActors();
};
const backSz = () => {
  store.changeShowComponent(true);
  store.changeShowDetail({
    show: false
  });
  bus.emit('hrBackSz');
};
useEmitt &&
  useEmitt('AIRCITY_EVENT', async (e) => {
    if (e.eventtype === 'LeftMouseButtonClick') {
      console.log(e);
      await __g.tileLayer.stopHighlightAllActors();
      if (e.Type === 'TileLayer') {
        if (
          e.ObjectID &&
          (e.ObjectID?.indexOf('pcsCabinet') !== -1 ||
            e.ObjectID?.indexOf('batteryCluste') !== -1 ||
            e.ObjectID?.indexOf('batteryCluster') !== -1)
          // e.ObjectID?.indexOf('bmsConversionCabinet') !== -1
          // e.ObjectID?.indexOf('photovoltaicPanels') !== -1
        ) {
          const mode = e.ObjectID.split('-');
          if (mode.length) {
            tileLayerDialogMode.value = mode[0];
            state.headerData = headerDataMsg[mode[0]];
          }
          showBqDialog.value = true;
          await __g.tileLayer.highlightActor(e.Id, e.ObjectID);
        }
      }

      //告警桩
      if (e.Id?.includes('warning-bottom')) {
        const eid = e.UserData;
        if (!chargingStateDataObj.value[eid]) return;
        focusToPile(eid, 255);
        return;
      }
      //正常桩
      if (e.PropertyName === '118Station') {
        if (!chargingStateDataObj.value[e.ObjectID]) return;
        focusToPile(e.ObjectID, +chargingStateDataObj.value[e.ObjectID].status, { isAlarm: 1 });
      }
      if (e.Type === 'marker') {
        //设施点
        if (e.Id?.includes('facilitiesLabel')) {
          await __g?.marker?.focus(e.Id, 20, 2);
          return;
        }
        //摄像头
        if (e.Id?.includes('camera')) {
          __g?.marker?.focus(e.Id);
          pileType.value = 'monitor';
          const data = JSON.parse(e.UserData);
          pileVideoData.value = data;
          pileVisible.value = true;
          return;
        }
        if (e.UserData) {
          const userData = JSON.parse(e.UserData);
          console.log(userData);
          // 自定义视角marker
          if (userData.type === 'customAngleMarker') {
            await __g.camera.set(userData.camera);
          }
          // 是否是红荔西机房marker
          if (userData.type === 'hongli') {
            await __g?.marker?.focus(e.Id, 5, 2);
          }
          if (e.Id && e.Id?.indexOf('machineRoom') !== -1) {
            bus.emit('focusToMachineRoom');

            // setTimeout(() => {
            // }, 2000);
          }
          return;
        }
      }
    }
  });
// 定位到桩弹窗
const focusToPile = async (eid, status, item: any = {}) => {
  bus.emit('focusToPile', item);
  console.log('item', item);
  let layerId = getTreeLayerIdByName('118Station', mapStore.treeInfo);
  if (item.isAlarm === 1) {
    // 正常

    pileParams.value = {
      eid: eid
    };
    pileType.value = 'pile';
    pileVisible.value = true;
    handleClickFocus(__g, layerId, eid, status);
  } else {
    const modelData = chargingStateData.value.find((model) => model.eid === eid);
    console.log('modelData', modelData);
    if (modelData) {
      // 告警
      pileParams.value = {
        eid: modelData.eid,
        warnId: modelData.alarmId
      };
    }
    warnVisible.value = true;
    handleClickFocus(__g, layerId, eid, status);
    // handleClickFocus(__g, layerId, store.detailParams.equipmentId, 255);
  }
};
const hanldeCloseCameraDialog = () => {
  pileVisible.value = false;
  handleClose();
};
const handleClose = () => {
  //清除绿色高亮
  __g.tileLayer.stopHighlightAllActors();
};
const clickWarningList = (item) => {
  console.log('item,', item);
  // 展示告警框
  pileParams.value = {
    eid: item.eid,
    warnId: item.id
  };
  warnVisible.value = true;
  if (!chargingStateDataObj.value[item.eid]) return;
  let layerId = getTreeLayerIdByName('118Station', mapStore.treeInfo);
  handleClickFocus(__g, layerId, item.eid, +chargingStateDataObj.value[item.eid].status);
};
const handleShowWarning = () => {
  dialogTableVisible.value = true;
  getWarningInfoByStationId(undefined, pageObj.currentPage, pageObj.pageSize, 'table');
};
// warning table数据
const handPageChange = (value) => {
  pageObj.currentPage = value;
  getWarningInfoByStationId(undefined, pageObj.currentPage, pageObj.pageSize, 'table');
};
// 判断展示趋势图还是告警图
const initWarn = async () => {
  const res = await selectWarningInfoByStationId({
    ...params.value,
    pageNum: 1,
    pageSize: 999
  });
  // console.log('res', res);
  if (res?.data?.dataList?.length) {
    isShowList.value = true;
  } else {
    isShowList.value = false;
    await getAlarmLevelAndTypeByTIme();
  }
};
// 类型和电流类型 切换
const handleChargeChange = (item) => {
  // console.log('item', item);
  chargeTab.value = item.code;
  chargingStationPieData.value = chargingStationPieDataFun(
    chargeTab.value,
    chargeData.value,
    curBtn.value
  );
};
// 桩枪切换
const handleTabBtn = (data) => {
  curBtn.value = data.value;
  chargeTab.value = data.value;
  equipmentType.value = data.index;

  loadSelectDetailChargeCount();
};

// 从详情跳转到告警
const handleWarn = (data, pileParamsC) => {
  console.log('handleWarn', data, pileParamsC);
  pileVisible.value = false;
  if (pileParamsC.warnId) {
    pileParams.value = {
      eid: pileParamsC.eid,
      warnId: pileParamsC.warnId
    };
  } else {
    pileParams.value = {
      eid: data.eid,
      warnId: data.alarmId
    };
  }
  warnVisible.value = true;
};
// 告警跳到详情
const handleDetail = (data) => {
  console.log('handleDetail', data);
  // 关闭警告框
  warnVisible.value = false;
  //打开详情框
  pileParams.value = {
    eid: data.eid
  };
  pileType.value = 'pile';
  pileVisible.value = true;
};

const scrollTableData = ref([]);
const getScrollTableData = async () => {
  const res = await getAlarmList({
    operatorId: store.detailParams?.operatorId,
    stationId: store.detailParams?.stationId
  });
  scrollTableData.value = res?.data;
};
// 实时功率图表
const lineTimeColors = ['blue'];
const lineTimeData = ref([]);
let timer2;
const getTimePowerGraph = async () => {
  const res = await timePowerGraph();
  lineTimeData.value = lineTimeDataFun(res.data);
  if (res.data.length) {
    const data = res.data || [];
    const info = {
      totalPower: data[data.length - 1].ratedPower,
      realTimePower: data[data.length - 1].realTimePower
    };
    // powerInfoNumData.value = info.realTimePower;
  }
};
let timer = null;

watch(
  () => store.detailParams,
  async () => {
    if (store.detailParams.stationId) {
      getButtomMenuData();

      if (store.detailParams.trueStation) {
        // 非真实站点
        isShowBoth.value = false;
        pageNumData.value = [];
      } else {
        // 真实站点
        isShowBoth.value = true;
        const paramsDefault = {
          operatorId: store.detailParams?.operatorId,
          stationId: store.detailParams?.stationId
        };
        params.value = paramsDefault;
        initWarn();
        getStationStatistics();
        getStationInfoByStationId();
        getEquipmentCountByStationId();
        getWarningInfoByStationId(1, 1, 10);
        getEquipmentStatusByStationId();
        getEquipmentUseRateByStationId(1);
        getStationRealTimePowerByStationId();
        getWarningStatisticByStationId();
        loadSelectDetailChargeCount();
        getScrollTableData();
        getTimePowerGraph();
        console.log('store.detailParams', store.detailParams);
        if (store.detailParams?.isWarning && __g) {
          //防止地图没有
          let layerId = getTreeLayerIdByName('118Station', mapStore.treeInfo);
          await handleClickFocus(__g, layerId, store.detailParams.equipmentId, 255, () => {
            // 飞行时间2s
            setTimeout(() => {
              warnVisible.value = true;
              pileParams.value = {
                eid: store.detailParams.equipmentId,
                warnId: store.detailParams.warnId
              };
            }, 2500);
          });

          console.log('store.detailParams', store.detailParams);
        }
        clearInterval(timer);
        clearInterval(timer2);
        timer = setInterval(() => {
          getEquipmentStatusByStationId();
          getStationRealTimePowerByStationId();
        }, 900000);

        timer2 = setInterval(() => {
          getTimePowerGraph();
        }, 1000 * 30);
      }
    }
  },
  {
    deep: true,
    immediate: true
  }
);
onUnmounted(() => {
  clearInterval(timer);
  clearInterval(timer2);
  timer = null;
  timer2 = null;
});
// onMounted(() => {
//   getStationStatistics();
//   getStationInfoByStationId();
//   getEquipmentCountByStationId();
//   getWarningInfoByStationId(1);
//   getEquipmentStatusByStationId();
//   getEquipmentUseRateByStationId(1);
//   getStationRealTimePowerByStationId();
//   getWarningStatisticByStationId();
// });
</script>
<style lang="less" scoped>
// .backBox {
//   position: absolute;
//   height: 19.5px;
//   left: 86px;
//   top: 75px;
//   display: flex;
//   background: rgba(4, 22, 43, 0.4);

//   color: #ffffff;
//   z-index: 20;
//   cursor: pointer;

//   img {
//     width: 24px;
//     height: 24px;
//     border-radius: 1px;
//   }
// }

.isSuper {
  width: 900px !important;
}

.station-info {
  margin-top: 12px;
}

.device-info {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  // margin-top: 20px;

  :deep(.num-wrap) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-top: 14px;

    .num-card {
      margin-bottom: 10px;

      &:nth-last-child(1),
      &:nth-last-of-type(2) {
        margin-bottom: 0;
      }

      .icon {
        width: 90px;
        height: 94px;
      }

      .info {
        flex-direction: column;

        .num .value {
          font-size: 36px;
        }

        .name {
          margin-bottom: 0;
        }
      }
    }
  }
}

.device-total-pie.pie-wrap {
  margin-top: 10px;
  flex: 1;
  height: 0;
}

.warning-message {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  // margin-top: 16px;

  .warning-tabs {
    margin-top: 10px;
  }

  .warning-list {
    flex: 1;
    height: 0;
    margin-top: 10px;
  }
  .warning-ec-wrap {
    flex: 1;
    height: 0;
  }
}

.device-use-info {
  margin-top: 10px;

  .tabs {
    margin-top: 10px;
  }

  .num-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    :deep(.num-card) {
      width: 49%;
      padding: 20px 0 20px;
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
}

.charging-bar-state {
  flex: 1.5;
  height: 0;
  display: flex;
  flex-direction: column;
}

.station-power {
  margin-top: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  .ec-wrap {
    margin-top: 10px;
  }
}
.station-power__chart {
  flex: 1;
  height: 0;
}

.right-tab-btn {
  display: flex;
  background: rgba(21, 69, 105, 0.5);
  border: 1px solid #486785;

  .tab-btn {
    width: 28px;
    height: 28px;
    font-size: 14px;
    line-height: 28px;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    border-left: 1px solid #486785;

    &:nth-of-type(1) {
      border: none;
    }
  }
}

.active {
  background: rgba(84, 181, 255, 0.8);
  color: #ffffff;
}

.pile-charger-header {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.wran-year-list-box {
  height: 180px;
  overflow-y: auto;

  .wran-year-list {
    margin-top: 12px;
  }

  .year-name {
    margin-left: 6px;
    color: #fff;
    font-size: 20px;
    font-family: DIN Condensed;
    font-weight: 700;
  }
}
</style>
