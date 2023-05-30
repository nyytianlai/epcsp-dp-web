<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 15:04:38
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-12 15:24:44
 * @FilePath: \epcsp-dp-web\src\views\station-detail\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <page-num :data="pageNumData" />
  <panel>
    <div class="station-info">
      <title-column title="充电站点信息" />
      <station-info :data="stationInfoData" />
    </div>
    <div class="device-info">
      <title-column title="设备设施信息" />
      <div class="num-wrap">
        <template v-for="(item, index) in deviceInfoData" :key="index">
          <num-card :data="item" type="left-right" classStyleType="leftRightStyle1" />
        </template>
      </div>
    </div>
    <div class="warning-message">
      <title-column title="告警信息" :showBtn="true" @handleClick="handleShowWarning" />
      <warning-tabs
        :data="warningTabsData"
        @changeTab="(data) => handleChangeTab(data, 'warning-message')"
      />
      <warning-list @handleClick="clickWarningList" :data="warningListData" height="2.15rem" />
    </div>
  </panel>
  <panel type="right">
    <div class="charging-bar-state">
      <title-column title="站点充电桩状态" />
      <charging-state :data="chargingStateData" @handleClickState="focusToPile" />
    </div>
    <div class="device-use-info">
      <title-column title="充电设施日使用信息" />
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
      <title-column title="站点实时功率" />
      <line-time-chart
        unit="KW"
        :data="linePowerData"
        :colors="['#00FFF9']"
        :chartStyle="{ height: '2.22rem' }"
      />
    </div>
  </panel>
  <div class="backBox">
    <img src="./images/back.png" alt="" @click="backSz" />
  </div>
  <bottom-tabs :tabData="tabData" v-if="!isHr" />
  <!-- isHr是0 是高渲染站点 -->
  <pile-dialog
    v-model:visible="pileVisible"
    :type="pileType"
    :pileVideoData="pileVideoData"
    :pileParams="pileParams"
    @close="handleClose"
  />
  <map-layer v-if="aircityObj" />
  <custom-dialog v-model:visible="dialogTableVisible" title="告警列表">
    <el-table
      :data="alarmTableData"
      height="6.34rem"
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
</template>
<script setup>
import { ref, onMounted, inject, watch, computed, reactive } from 'vue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import stationInfo from './components/station-info.vue';
import chargingState from './components/charging-state.vue';
import BottomTabs from './components/bottom-tabs.vue';
import PileDialog from './components/pile-dialog/pile-dialog.vue';
import MapLayer from './components/map-layer.vue';
import { tableColumnFun } from '@/global/commonFun.js';
import {
  selectStationStatistics,
  selectEquipmentCountByStationId,
  selectStationInfoByStationId,
  selectWarningInfoByStationId,
  selectEquipmentStatusByStationId,
  selectEquipmentUseRateByStationId,
  selectStationRealTimePowerByStationId,
  selectWarningStatisticByStationId,
  viewMenuData
} from './api.js';
import {
  pageNumFun,
  deviceInfoDataFun,
  warningTabsDataFun,
  warningListFun,
  chargingTypesTabsFun,
  chargingTypesFun,
  linePowerDataFun,
  columnDataFun
} from './config.js';
import bus from '@/utils/bus';
import { handleClickFocus } from './mapOperate.ts';

const store = useVisibleComponentStore();
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const useEmitt = aircityObj.value?.useEmitt;
const params = ref({
  operatorId: store.detailParams?.operatorId,
  stationId: store.detailParams?.stationId
});
const pageNumData = ref(pageNumFun());
const stationInfoData = ref({});
const deviceInfoData = ref(deviceInfoDataFun());

const isHr = computed(() => store.detailParams?.isHr);
const tabData = ref([]);

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
  const { data: res } = await viewMenuData({ stationId: store.detailParams?.stationId });
  console.log('底部菜单栏数据', res);
  tabData.value.length = 0;
  if (res && res.length) {
    tabData.value.push(...res);
  }
};
// 统计数据
const getStationStatistics = async () => {
  const res = await selectStationStatistics(params.value);
  pageNumData.value = pageNumFun(res?.data);
};
//设备详情/站点信息
const getStationInfoByStationId = async () => {
  const res = await selectStationInfoByStationId(params.value);
  stationInfoData.value = res.data;
};
// 设备详情/设备设施信息
const getEquipmentCountByStationId = async () => {
  const res = await selectEquipmentCountByStationId(params.value);
  deviceInfoData.value = deviceInfoDataFun(res.data);
};
//设备详情/告警信息列表
const getWarningInfoByStationId = async (alarmLevel, pageNum = 1, pageSize = 99999, type) => {
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
      warningListData.value = res.data.dataList.map((item) => {
        return {
          date: item.alarmTime,
          message: item.alarmDesc,
          area: item.equipmentName,
          ...item
        };
      });
    } else {
      warningListData.value = [];
    }
  }
};
//设备详情/站点充电桩状态
const getEquipmentStatusByStationId = async () => {
  const res = await selectEquipmentStatusByStationId(params.value);
  chargingStateData.value = res?.data || [];
  const eidObj = {};
  chargingStateData.value.map((item) => {
    eidObj[item.eid] = item;
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
const handleChangeTab = (data, type) => {
  if (type === 'device-use-info') {
    getEquipmentUseRateByStationId(data.code);
  } else if (type === 'warning-message') {
    getWarningInfoByStationId(data.code);
  }
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
    //设施点
    if (e.Id?.includes('facilitiesLabel')) {
      __g?.marker?.focus(e.Id, 20, 2);
    }
    //摄像头
    if (e.Id?.includes('camera')) {
      __g?.marker?.focus(e.Id);
      pileType.value = 'monitor';
      const data = JSON.parse(e.UserData);
      pileVideoData.value = data;
      pileVisible.value = true;
    }
    //告警桩
    if (e.Id?.includes('warning-bottom')) {
      const eid = e.UserData;
      if (!chargingStateDataObj.value[eid]) return;
      focusToPile(eid, 255);
    }
    //正常桩
    if (e.PropertyName === 'station') {
      if (!chargingStateDataObj.value[e.ObjectID]) return;
      focusToPile(e.ObjectID, +chargingStateDataObj.value[e.ObjectID].status);
    }
  });
// 定位到桩弹窗
const focusToPile = (eid, status) => {
  console.log('pileVisiblepileVisible', pileVisible.value);
  handleClickFocus(__g, eid, status);
  pileParams.value = {
    eid: eid
  };
  pileType.value = 'pile';
  pileVisible.value = true;
};
const handleClose = () => {
  //清除绿色高亮
  //  __g.tileLayer.stopHighlightAllActors()
};
const clickWarningList = (item) => {
  if (!chargingStateDataObj.value[item.eid]) return;
  handleClickFocus(__g, item.eid, +chargingStateDataObj.value[item.eid].status);
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
watch(
  () => store.detailParams,
  () => {
    const paramsDefault = {
      operatorId: store.detailParams?.operatorId,
      stationId: store.detailParams?.stationId
    };
    params.value = paramsDefault;
    getStationStatistics();
    getStationInfoByStationId();
    getEquipmentCountByStationId();
    getWarningInfoByStationId(1);
    getEquipmentStatusByStationId();
    getEquipmentUseRateByStationId(1);
    getStationRealTimePowerByStationId();
    getWarningStatisticByStationId();
    getButtomMenuData();
    console.log('store.detailParams?.equipmentId', store.detailParams?.equipmentId);
    if (store.detailParams?.equipmentId) {
      console.log('pileVisible', pileVisible.value);
      focusToPile(store.detailParams.equipmentId, 255);
    }
  },
  {
    deep: true,
    immediate: true
  }
);
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
.backBox {
  position: absolute;
  height: 36px;
  left: 86px;
  top: 68px;
  display: flex;
  background: rgba(4, 22, 43, 0.4);
  border: 1px solid rgba(148, 148, 148, 0.3);
  color: #ffffff;
  z-index: 20;
  cursor: pointer;

  img {
    width: 36px;
    height: 36px;
    border-radius: 1px;
  }
}
.station-info {
  margin-top: 12px;
}
.device-info {
  margin-top: 20px;
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
.warning-message {
  margin-top: 16px;
  .warning-tabs {
    margin-top: 14px;
  }
  .warning-list {
    margin-top: 14px;
  }
}
.device-use-info {
  margin-top: 20px;
  .tabs {
    margin-top: 16px;
  }
  .num-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    :deep(.num-card) {
      width: 49%;
      padding: 24px 0 18px;
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
.station-power {
  margin-top: 16px;
  .ec-wrap {
    margin-top: 16px;
  }
}
</style>
