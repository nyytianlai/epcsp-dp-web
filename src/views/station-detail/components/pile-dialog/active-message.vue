<template>
  <div class="active-message">
    <el-tabs v-model="activeName" class="beveled-tabs" @tab-click="handleClick">
      <el-tab-pane :name="item.name" v-for="(item, index) in tabList" :key="index">
        <template #label>
          <span class="custom-tabs-label">
            <span>{{ item.name }}</span>
            <span v-if="item.status" class="status" :class="item?.status?.code">
              {{ item?.status?.name }}
            </span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <ul class="info-content">
      <li
        class="info-item"
        v-for="(item, index) in infoList"
        :key="index"
        :class="[{ active: item.dynamicType === dynamicActive.dynamicType }]"
        @click="handleClickDynamic(item)"
      >
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
      :chartStyle="{ height: '1.8rem' }"
      :customOption="customOption"
    />
  </div>
</template>
<script setup>
import { ref, inject, onMounted } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import dayjs from 'dayjs';
import {
  selectEquipmentDynamicInfo,
  selectEquipmentDynamicInfoGroupByTime
} from '@/api/stationDetail.js';
const pileData = inject('pileData');
const activeName = ref('充电桩');
const customOption = {
  grid: {
    left: '6%',
    right: 20
  }
};
const selectTabData = ref()
const infoListFun = (data = {}) => {
  return [
    {
      icon: 'cdl',
      name: '充电量',
      value: data?.chargeElectricity || '--',
      dynamicType: 1,
      unit: 'kw/h'
    },
    {
      icon: 'fdl',
      name: '放电量',
      value: data?.disChargeElectricity || '--',
      dynamicType: 2,
      unit: 'kw/h'
    },
    {
      icon: 'cdsc',
      name: '充电时长',
      value: data?.chargeLastTime || '--',
      dynamicType: 3,
      unit: 'h'
    },
    {
      icon: 'cdcs',
      name: '充电次数',
      value: data?.chargeCount || '--',
      dynamicType: 4,
      unit: '次'
    },
    {
      icon: 'ssgl',
      name: '实时功率',
      value: data?.power || '--',
      dynamicType: 5,
      unit: 'kw'
    },
    {
      icon: 'gzl',
      name: '故障率',
      value: data?.troubleRate || '--',
      dynamicType: 6,
      unit: '%'
    },
    {
      icon: 'lyl',
      name: '利用率',
      value: data?.useRate || '--',
      dynamicType: 7,
      unit: '%'
    },
    {
      icon: 'nbwd',
      name: '内部温度',
      value: data?.equipmentTemp || '--',
      dynamicType: 8,
      unit: 'C⁰'
    }
  ];
};
const infoList = ref(infoListFun());
const dynamicActive = ref(infoList.value[0]);

const stateFormate = (state) => {
  return {
    0: {
      code: 'warning',
      name: '故障'
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
  const arr = [
    {
      name: '充电桩',
      equipmentId: pileData.value?.equipmentId,
      equipmentType: 1
    }
  ];
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
const linePowerDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  return [
    {
      data: data.map((item) => [yearMonthDay + `${item.time}:00`, item.count]),
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
  selectTabData.value = params
  const res = await selectEquipmentDynamicInfo(params);
  if (res?.data) {
    infoList.value = infoListFun(res?.data);
    dynamicActive.value = infoList.value[0]
    getEquipmentDynamicInfoGroupByTime()
  }
};
// 设备详情/桩枪动态信息分时列表
const getEquipmentDynamicInfoGroupByTime = async () => {
  const params = {
    "dynamicType": dynamicActive.value?.dynamicType,
    ...selectTabData.value
  }
  const res = await selectEquipmentDynamicInfoGroupByTime(params)
  if (res?.data) {
    linePowerData.value = linePowerDataFun(res?.data)
  } else {
    linePowerData.value = linePowerDataFun([])
  }
}
const handleClickDynamic = (item) => {
  dynamicActive.value = item
  getEquipmentDynamicInfoGroupByTime()
}
onMounted(() => {
  getEquipmentDynamicInfo();
});
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
    .el-tabs__item {
      flex: 1;
      background: rgba(84, 181, 255, 0.12);
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
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
          border-radius: 4px;
          color: #ff6b4b;
        }
      }
    }
  }
  .info-content {
    display: flex;
    flex-wrap: wrap;
    .info-item {
      background: #375374;
      display: flex;
      width: 186px;
      padding: 12px 0 12px 12px;
      margin-right: 12px;
      margin-bottom: 12px;
      align-items: center;
      border: 1px solid transparent;
      cursor: pointer;
      &.active{
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
