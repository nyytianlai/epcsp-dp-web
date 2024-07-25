<template>
  <div class="active-message">
    <el-tabs
      v-model="activeName"
      class="beveled-tabs"
      @tab-click="handleClick"
      :class="`tabs-length${tabList.length}`"
    >
      <el-tab-pane :name="item.name" v-for="(item, index) in tabList" :key="index">
        <template #label>
          <span class="custom-tabs-label">
            <span class="label">{{ item.name }}</span>
            <span v-if="item.status" class="status" :class="item?.status?.code">
              {{ item?.status?.name }}
            </span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <ul class="info-content">
      <li class="info-item" v-for="(item, index) in infoList" :key="index">
        <icon :icon="`svg-icon:${item.icon}`" />
        <div class="right">
          <span class="name">{{ item.name }}</span>
          <span class="num">
            <span class="value">{{ item.value }}</span>
            &nbsp;
            <span class="unit">{{ item.unit }}</span>
          </span>
        </div>
      </li>
    </ul>
    <line-time-chart
      :unit="dynamicActive.unit"
      :data="linePowerData"
      :colors="['#00FFF9']"
      :chartStyle="{
        width: '100%',
        height: '1.8rem'
      }"
      :customOption="customOption"
      mode="haveTab"
    />
  </div>
</template>
<script setup>
import { ref, inject, onMounted, watch, onUnmounted } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import dayjs from 'dayjs';
import { selectEquipmentDynamicInfo, selectEquipmentDynamicInfoGroupByTime } from './api.js';
const pileData = inject('pileData');
const customOption = {
  grid: {
    left: '6%',
    right: 20
  }
};
const selectTabData = ref();
const infoListFun = (data = {}) => {
  return [
    {
      icon: 'cdl',
      name: '累计充电量',
      value:
        data?.chargeElectricity === 0 ? data.chargeElectricity : data?.chargeElectricity || '--',
      dynamicType: 1,
      unit: 'kWh'
    },
    {
      icon: 'fdl',
      name: '累计放电量',
      value:
        data?.disChargeElectricity === 0
          ? data.disChargeElectricity
          : data.disChargeElectricity || '--',
      dynamicType: 2,
      unit: 'kWh'
    },
    {
      icon: 'cdsc',
      name: '累计充电时长',
      value: data?.chargeLastTime === 0 ? data.chargeLastTime : data.chargeLastTime || '--',
      dynamicType: 3,
      unit: 'h'
    },
    {
      icon: 'cdsc',
      name: '累计充电次数',
      value: data?.chargeCount === 0 ? data.chargeCount : data.chargeCount || '--',
      dynamicType: 4,
      unit: '次'
    },
    {
      icon: 'ssgl',
      name: '实时功率',
      value: data?.power === 0 ? data.power : data.power || '--',
      dynamicType: 5,
      unit: 'kW'
    },
    {
      icon: 'gzl',
      name: '故障率',
      value: data?.troubleRate === 0 ? data.troubleRate : data.troubleRate || '--',
      dynamicType: 6,
      unit: '%'
    },
    {
      icon: 'lyl',
      name: '利用率',
      value: data?.useRate === 0 ? data.useRate : data.useRate || '--',
      dynamicType: 7,
      unit: '%'
    },
    {
      icon: 'nbwd',
      name: '内部温度',
      value: data?.equipmentTemp === 0 ? data.equipmentTemp : data.equipmentTemp || '--',
      dynamicType: 8,
      unit: 'C⁰'
    }
  ];
};
const infoList = ref(infoListFun());
const dynamicActive = ref(infoList.value[4]);

const stateFormate = (state) => {
  return {
    0: {
      code: 'offline',
      name: '离线'
    },
    1: {
      code: 'normal',
      name: '正常'
    },
    2: {
      code: 'normal',
      name: '正常'
    },
    3: {
      code: 'normal',
      name: '正常'
    },
    4: {
      code: 'normal',
      name: '正常'
    },
    5: {
      code: 'normal',
      name: '正常'
    },
    255: {
      code: 'warning',
      name: '故障'
    }
  }[state];
};
const tabsFun = () => {
  const arr = [];
  if (pileData.value?.gunInfoVoList?.length) {
    pileData.value?.gunInfoVoList.slice(0, 2).map((item) => {
      arr.push({
        ...item,
        name: item.connectorName,
        status: stateFormate(item.connectorStatus),
        equipmentType: 2
      });
    });
  }
  return arr;
};
const tabList = ref(tabsFun());
const activeName = ref(tabList.value[0].name);

const linePowerDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  return [
    {
      data: data?.map((item) => [item.time, item.count]),
      type: 'line',
      smooth: true,
      name: dynamicActive.value?.name
    }
  ];
};
const linePowerData = ref(linePowerDataFun());
const handleClick = (tab, event) => {
  getEquipmentDynamicInfo(tab.index);
};
const getParams = (data) => {
  return {
    connectorId: data?.connectorId,
    equipmentId: data?.equipmentId,
    equipmentType: data?.equipmentType,
    operatorId: pileData.value?.operatorId
  };
};
const getEquipmentDynamicInfo = async (index = 0) => {
  const params = getParams(tabList.value[index]);
  selectTabData.value = params;
  const res = await selectEquipmentDynamicInfo(params);
  console.log('params', params);
  if (res?.data) {
    infoList.value = infoListFun(res?.data);
    dynamicActive.value = infoList.value[4];
    getEquipmentDynamicInfoGroupByTime();
  }
};
// 设备详情/桩枪动态信息分时列表
const getEquipmentDynamicInfoGroupByTime = async () => {
  const params = {
    dynamicType: dynamicActive.value?.dynamicType,
    ...selectTabData.value
  };
  const res = await selectEquipmentDynamicInfoGroupByTime(params);
  if (res?.data) {
    linePowerData.value = linePowerDataFun(res?.data);
  } else {
    linePowerData.value = linePowerDataFun([]);
  }
};
const handleClickDynamic = (item) => {
  dynamicActive.value = item;
  console.log('dynamicActive.value', dynamicActive.value);
  getEquipmentDynamicInfoGroupByTime();
};
let timer = null;
onMounted(() => {});
onUnmounted(() => {
  console.log('timer', timer);
  clearInterval(timer);
  timer = null;
});

watch(
  () => pileData.value.equipmentId,
  async (newVal) => {
    console.log('pileData.value', newVal);
    tabList.value = tabsFun();
    await getEquipmentDynamicInfo();
    timer = setInterval(() => {
      getEquipmentDynamicInfo();
    }, 900000);
  },
  {
    immediate: true
  }
);
</script>
<style lang="less" scoped>
.active-message {
  :deep(.beveled-tabs) {
    .el-tabs__active-bar {
      display: none;
    }

    .el-tabs__nav {
      width: 100%;
    }

    &.tabs-length1 {
      .el-tabs__item:nth-child(2) {
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0 100%, 0 0);
      }
    }

    &.tabs-length2 {
      .el-tabs__item:nth-child(3) {
        clip-path: polygon(20px 0%, 100% 0%, 100% 100%, 0 100%, 20px 0);
        margin-left: -15px;
      }
    }

    .el-tabs__item {
      flex: 1;
      background: rgba(84, 181, 255, 0.12);
      font-weight: 400;
      font-size: 18px;
      line-height: 40px;
      color: #d6f8ff;

      &:nth-child(2) {
        clip-path: polygon(0% 0%, 100% 0%, calc(100% - 20px) 100%, 0 100%, 0 0);
      }

      &:nth-child(3) {
        clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0 100%, 20px 0);
        flex: 1.05;
        margin-left: -15px;
      }

      &:nth-child(4) {
        clip-path: polygon(20px 0%, 100% 0%, 100% 100%, 0 100%, 20px 0);
        margin-left: -15px;
      }
    }

    .el-tabs__item.is-active {
      font-size: 18px;
      line-height: 40px;
      color: #fff;
      background: rgba(84, 181, 255, 0.4);
    }

    .custom-tabs-label {
      .status {
        background: rgba(0, 255, 143, 0.3);
        border: 1px solid #00ff8f;
        border-radius: 4px;
        padding: 0 6px;
        color: #01fb90;
        font-size: 12px;
        line-height: 20px;
        margin-left: 6px;

        &.warning {
          background: rgba(170, 5, 5, 0.3);
          border: 1px solid #aa0505;
          color: #ff6b4b;
        }

        &.offline {
          background: rgba(159, 159, 159, 0.3);
          border-color: #e8e8e8;
          color: #ffffff;
        }
      }
    }
  }

  .info-content {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    .info-item {
      background: #375374;
      display: flex;
      flex: 0 0 calc(25% - 9px);
      padding: 12px 0 12px 12px;
      // margin-right: 12px;
      // margin-bottom: 12px;
      align-items: center;
      border: 1px solid transparent;
      cursor: pointer;

      &.active {
        background: #255886;
        border: 1px solid rgba(75, 222, 255, 0.7);
      }

      &:nth-child(4n) {
        margin-right: 0;
      }

      .el-icon {
        font-size: 36px;
        margin-right: 12px;
      }

      .right {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 14px;
          line-height: 20px;
        }

        .value {
          font-family: 'DIN Alternate';
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 28px;
          color: #00fff9;
          text-shadow: 0px 2px 10px rgba(75, 222, 255, 0.5);
        }

        .unit {
          font-size: 14px;
          line-height: 20px;
          color: #00fff9;
        }
      }
    }
  }
}
</style>
