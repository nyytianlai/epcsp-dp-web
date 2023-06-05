<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 12:55:20
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-11 17:43:19
 * @FilePath: \epcsp-dp-web\src\views\overall\overview\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <page-num :data="pageNumData" />
  <panel>
    <div class="charging-station-num">
      <title-column title="充电设施总量" :showBtn="true" @handleClick="handleDetailClick" />
      <tabs
        :data="bottomBtnCur === 1 ? chargingStationTabs : chargingStationGunTabs"
        @changeTab="(data) => handleChangeTab(data, 'charging-station')"
      />
      <pie-chart
        :data="chargingStationPieData"
        :totalName="bottomBtnCur === 1 ? '充电桩总数' : '充电枪总数'"
        :mode="totalCurCode === 1 ? 'canChoose' : 'default'"
        @choose="handleChoose"
        :colors="
          totalCurCode === 1
            ? ['#E5CC48', '#3254DD', '#4BDEFF', '#BEE5FB']
            : ['#E5CC48', '#3254DD', '#4BDEFF', '#ED8ECA', '#BEE5FB']
        "
      />
    </div>
    <div class="charging-peak-area">
      <title-column
        title="行政区充电次数情况"
        :showTabBtn="true"
        :tabList="[
          { value: 1, name: '日' },
          { value: 2, name: '月' },
          { value: 3, name: '年' }
        ]"
        @handleTabBtn="handleYearBtn"
      />
      <area-rank-list :data="areaRankData" :totalNum="areaTotalNum" height="2.54rem" />
    </div>
    <div class="charging-num-images">
      <title-column title="充电站数字孪生" />
      <charging-num-images :data="chargingNum" />
    </div>
  </panel>
  <panel type="right">
    <title-column title="在线运行状态情况" />
    <charging-realtime-power :data="chargingRealPower" />
    <div class="charging-types">
      <tabs
        :data="chargingTypesTabs"
        @changeTab="(data) => handleChangeTab(data, 'charging-types')"
      />
      <div class="num-wrap">
        <template v-for="(item, index) in chargingTypesData" :key="index">
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
      <line-time-chart :data="lineStateData" :colors="['green', 'blue']" />
    </div>
    <div class="charging-runing">
      <tabs
        :data="chargingRunTabs"
        @changeTab="(data) => handleChangeTab(data, 'charging-runing')"
      />
      <div class="num-wrap">
        <template v-for="(item, index) in chargingRunData" :key="index">
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
      <line-time-chart :data="lineRunData" unit="%" :colors="['green', '#FF7723']" />
    </div>
  </panel>
  <map-layer v-if="aircityObj" ref="mapLayerRef"></map-layer>
  <bottom-menu-tabs :data="bottomTabsData" @changeTab="changeButtomTab" />
  <custom-dialog v-model:visible="dialogTotalVisible" title="充电站设施列表">
    <template #titleSearch>
      <el-input
        v-model="inputTotal"
        placeholder="请输入"
        class="search-input"
        @change="handleSearch"
      >
        <template #suffix>
          <icon :size="12" icon="svg-icon:search" />
        </template>
      </el-input>
    </template>
    <el-table
      :data="totalTableData"
      height="6.34rem"
      style="width: 100%"
      class="custom-dialog-table"
      @sort-change="handleSort"
      :default-sort="{ prop: 'equipmentPower', order: 'descending' }"
    >
      <el-table-column
        v-for="(item, index) in columnData"
        :key="index"
        v-bind="item"
        :show-overflow-tooltip="true"
        :formatter="tableColumnFun"
        :sortable="item.sortable"
        :sort-orders="item.sortOrders"
      >
        <template #header v-if="item.prop === 'areaName'">
          <div class="areaName">
            {{ item.label }}
            <el-popover placement="bottom" trigger="click">
              <template #reference>
                <icon :size="12" icon="svg-icon:filter" class="filter" />
              </template>
              <div class="checkbox">
                <el-tree
                  :data="filters"
                  show-checkbox
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                  @check="handleFilter"
                  class="table-filter"
                  :indent="0.00001"
                  :default-checked-keys="defaultArea"
                />
              </div>
            </el-popover>
          </div>
        </template>
        <template #default="scope"></template>
      </el-table-column>
      <el-table-column label="操作" key="operation" minWidth="2">
        <template #default="scope">
          <a href="javascript:;" class="detail" @click="handleDetail(scope)">详情</a>
        </template>
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
import { ref, onMounted, onUnmounted, reactive, inject } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import MapLayer from './components/map-layer.vue';
import ChargingNumImages from './components/charging-num-images.vue';
import ChargingRealtimePower from './components/charging-realtime-power.vue';
import { deepClone } from '@/utils';
import {
  selectChargeCount,
  selectChargeCountByArea,
  selectChargeEquipmentStatistics,
  selectHrStationInfo,
  selectPowerSumByDayTime,
  selectChargeEquipmentStatus,
  selectChargeEquipmentStatusByTime,
  selectChargeEquipmentUseRate,
  selectChargeEquipmentUseRateByTime,
  selectStationInfoByPage
} from './api.js';
import {
  pageNumFun,
  chargingStationTabsFun,
  chargingStationGunTabsFun,
  chargingStationPieDataFun,
  areaRankDataFun,
  chargingTypesTabsFun,
  chargingTypesFun,
  lineStateDataFun,
  chargingRunTabsFun,
  chargingRunDataFun,
  lineRunDataFun,
  bottomTabDataFun,
  columnDataFun,
  filters
} from './config.js';
import { useVisibleComponentStore } from '@/stores/visibleComponent';

const storeVisible = useVisibleComponentStore();
const aircityObj = inject('aircityObj');
let mapLayerRef = ref(null);
// 头部累计数据
const pageNumData = ref(pageNumFun());
// 充电桩数量信息
const chargingStationTabs = ref(chargingStationTabsFun());
const chargingStationGunTabs = ref(chargingStationGunTabsFun());
const chargingStationPieData = ref(chargingStationPieDataFun());
//充电高峰区域情况
const areaRankData = ref([]);
const areaTotalNum = ref(0);
// 设备管理/充电站数字孪生
const chargingNum = ref([]);
//设备管理/在线运行状态情况
const chargingRealPower = ref(0);
//充电状态
const chargingTypesTabs = ref(chargingTypesTabsFun());
const chargingTypesData = ref(chargingTypesFun());
const lineStateData = ref(lineStateDataFun());
// 充电运行情况
const chargingRunTabs = ref(chargingRunTabsFun());
const chargingRunData = ref(chargingRunDataFun());
const lineRunData = ref(lineRunDataFun());
//底部button
const bottomTabsData = ref(bottomTabDataFun());
// 默认区
const defaultArea = ref([
  440303, 440304, 440305, 440306, 440307, 440308, 440309, 440310, 440311, 440343, 441521
]);
// 当前底部button高亮的对象
const bottomBtnCur = ref(1);
// 充电设施总量tab高亮
const totalCurCode = ref(1);
// 充电设施总量详情标识
const dialogTotalVisible = ref(false);
// 充电设施总量搜索
const inputTotal = ref();
// 充电设施列表分页
const pageObj = reactive({
  pageSize: 8,
  total: 0,
  currentPage: 1
});
// 运行情况tab
const runing = ref(1)
// 行政区充电次数情况时间
const dayType = ref(1);
// 排序
const sort = ref(0);
// 排序类型
const sortType = ref(2);
// 区域数据
const areaList = ref([]);
// 弹窗列名
const columnData = ref(columnDataFun());
// 表格数据
const totalTableData = ref([]);
//设备管理/标题下四个统计数
const getSelectChargeEquipmentStatistics = async () => {
  const res = await selectChargeEquipmentStatistics();
  pageNumData.value = pageNumFun(res.data);
};
// 设备管理/充电桩数量
const getSelectChargeCount = async (type, maintab) => {
  const res = await selectChargeCount({ type: bottomBtnCur.value });
  chargingStationPieData.value = chargingStationPieDataFun(type, res.data, maintab);
};
//设备管理/行政区充电次数情况
const getSelectChargeCountByArea = async () => {
  const res = await selectChargeCountByArea({ dayType: dayType.value });
  if (res?.data) {
    areaRankData.value = res.data.map((item) => {
      return {
        num: item.chargeCount,
        unit: '次',
        name: item.areaName
      };
    });
    areaTotalNum.value = res.data[0].chargeCount;
  } else {
    areaRankData.value = [];
    areaTotalNum.value = 0;
  }
};
//设备管理/充电站数字孪生
const getSelectHrStationInfo = async () => {
  const res = await selectHrStationInfo();
  if (res?.data?.length) {
    chargingNum.value = res.data.sort((a, b) => a.sort - b.sort);
  } else {
    chargingNum.value = [];
  }
};
// 设备管理/在线运行状态情况
const getSelectPowerSumByDayTime = async () => {
  const res = await selectPowerSumByDayTime();
  chargingRealPower.value = res?.data;
};
// 设备管理/充电桩-枪状态
const getSelectChargeEquipmentStatus = async (type) => {
  const res = await selectChargeEquipmentStatus(type);
  chargingTypesData.value = chargingTypesFun(res.data);
};
//设备管理/充电桩-枪状态分时列表
const getChargeEquipmentStatusByTime = async (type) => {
  const res = await selectChargeEquipmentStatusByTime(type);
  lineStateData.value = lineStateDataFun(res.data);
};

const getChargeEquipmentUseRate = async (type) => {
  const res = await selectChargeEquipmentUseRate(type);
  chargingRunData.value = chargingRunDataFun(res.data);
};
//设备管理/充电桩-枪运行情况分时列表
const getChargeEquipmentUseRateByTime = async (type) => {
  const res = await selectChargeEquipmentUseRateByTime(type);
  lineRunData.value = lineRunDataFun(res.data,runing.value);
};
// 获取充电站设施列表
const getSelectStationInfoByPage = async () => {
  // 在第一次请求的时候，生成序号
  if (columnData.value.findIndex((i) => i.type === 'index') === -1) {
    const temp = {
      type: 'index',
      label: '序号',
      index: (index) => (pageObj.currentPage - 1) * pageObj.pageSize + index + 1,
      minWidth: 1
    };
    columnData.value.unshift(temp);
  }

  const obj = {
    name: inputTotal.value,
    pageNum: pageObj.currentPage,
    pageSize: pageObj.pageSize,
    sort: sort.value,
    sortType: sortType.value,
    areaCodeList: areaList.value
  };
  const res = await selectStationInfoByPage(obj);
  totalTableData.value = res.data.dataList;
  pageObj.total = res.data.total;
  console.log('res', res);
};
// 底部按钮点击
const changeButtomTab = (item) => {
  console.log('底部切换', item);
  bottomBtnCur.value = item.code;
  // 重新获取充电设施总量
  getSelectChargeCount(totalCurCode.value, bottomBtnCur.value);
  mapLayerRef.value.buttomTabChange(item.code);
};
// 充电设施总量
const handleChoose = (item) => {
  console.log('充电设施总量', item);
  // todo
  mapLayerRef.value.handleChargeTypeChange(item);
};
// 充电设施总量详情
const handleDetailClick = () => {
  dialogTotalVisible.value = true;
};
// table数据
const handPageChange = (value) => {
  pageObj.currentPage = value;
  getSelectStationInfoByPage();
};
// 搜索
const handleSearch = () => {
  getSelectStationInfoByPage();
};

// 排序
const handleSort = (item) => {
  console.log('item', item);
  if (item.order) {
    // 存在排序
    const sortTypeNum = {
      ascending: 1,
      descending: 2
    };
    const sortIndex = {
      equipmentPower: 0,
      equipmentCount: 1,
      gunCount: 2
    };
    sort.value = sortIndex[item.prop];
    sortType.value = sortTypeNum[item.order];
  } else {
    //不存在排序
    sort.value = null;
    sortType.value = null;
  }

  getSelectStationInfoByPage();
};

// 筛选
const handleFilter = (value, data) => {
  const temp = data.checkedKeys;
  // 全部
  if (temp.includes(1)) {
    areaList.value = [];
    getSelectStationInfoByPage();
  } else {
    // 存在筛选
    areaList.value = temp;
    getSelectStationInfoByPage();
  }
};

// 点击详情
const handleDetail = (item) => {
  console.log('item', item);
  // 关闭弹窗
  dialogTotalVisible.value = false;
  // 展示站点
  storeVisible.changeShowComponent(false);
  storeVisible.changeShowDetail({
    show: true,
    params: {
      operatorId: item.row.operatorId,
      stationId: item.row.stationId,
      isHr: item.row.isHr
    }
  });
};

// 行政区充电次数情况tab点击
const handleYearBtn = (item) => {
  console.log('item', item);
  dayType.value = item.value;
  getSelectChargeCountByArea();
};
const handleChangeTab = (data, type) => {
  if (type === 'charging-station') {
    //切换充电桩数量信息
    totalCurCode.value = data.code;
    getSelectChargeCount(data.code, bottomBtnCur.value);
  } else if (type === 'charging-types') {
    // 设备管理/充电桩-枪状态
    getSelectChargeEquipmentStatus(data.code);
    getChargeEquipmentStatusByTime(data.code);
  } else if (type === 'charging-runing') {
    // 运行情况
    runing.value = data.code
    getChargeEquipmentUseRate(data.code);
    getChargeEquipmentUseRateByTime(data.code);
  }
};

let timer = null;
onMounted(() => {
  getSelectChargeCount(1);
  getSelectChargeCountByArea();
  getSelectChargeEquipmentStatistics();
  getSelectHrStationInfo();
  getSelectPowerSumByDayTime();
  getSelectChargeEquipmentStatus(1);
  getChargeEquipmentStatusByTime(1);
  getChargeEquipmentUseRate(1);
  getChargeEquipmentUseRateByTime(1);
  getSelectStationInfoByPage();
  timer = setInterval(() => {
    getSelectPowerSumByDayTime();
  }, 1000 * 60);
});

onUnmounted(() => {
  clearInterval(timer);
  timer = null;
});
</script>
<style lang="less" scoped>
.charging-station-num {
  .tabs {
    margin-top: 16px;
  }
  .pie-wrap {
    margin-top: 25px;
  }
}
.charging-peak-area {
  margin-top: 17px;
  .area-rank-wrap {
    margin-top: 16px;
  }
}
.charging-num-images {
  margin-top: 22px;
  .images-wrap {
    margin-top: 16px;
  }
}
.charging-types,
.charging-runing {
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
  .ec-wrap {
    margin-top: 20px;
  }
}
.charging-runing {
  .tabs {
    margin-top: 20px;
  }
  .num-wrap {
    margin-top: 20px;
  }
  .ec-wrap {
    margin-top: 22px;
  }
}
.charging-realtime-power {
  margin-top: 16px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.detail {
  color: #4bdeff;
  text-decoration: none;
}
.filter {
  cursor: pointer;
}
</style>
