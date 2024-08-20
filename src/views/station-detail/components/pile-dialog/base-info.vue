<template>
  <div class="custom-collapse">
    <el-collapse border="0" v-model="activeNames" @change="handleChange">
      <!-- cdz: '充电桩' -->
      <el-collapse-item :title="t(`${tHead}.cdz`)" name="1">
        <ul class="device-info">
          <li class="list-item" v-for="(item, index) in listData" :key="index">
          <label for="">{{ item.displayLabel || item.label }}</label>
            <span class="value">
              {{ item.value }}
              <span v-if="item.unit">{{ item.unit }}</span>
            </span>
          </li>
        </ul>
      </el-collapse-item>
      <!-- cdq: '充电枪' -->
      <el-collapse-item :title="t(`${tHead}.cdq`)" name="2">
        <ScrollTable
          style="width: 100%; height: 1.3rem"
          :autoScroll="false"
          :interval="5000"
          :data="scrollTableData"
          :highlight-current-row="false"
          class="custom-table"
        >
          <el-table-column
            v-for="(item, index) in columnKeyList"
            :key="index"
            :prop="item.prop"
            align="left"
            :label="item.displayLabel || item.label"
            :min-width="item.width"
            :type="item.type"
          ></el-table-column>
        </ScrollTable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue';
import ScrollTable from '@sutpc/vue3-scroll-table';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `station-detail.components.pile-dialog.base-info`;

const activeNames = ref(['1', '2']);
const pileData = inject('pileData');

const stateFormate = (state) => {
  return {
    0: {
      code: 'offline',
      name: '离线',
      type: 'warning-pile',
      displayName: t(`${tHead}.state.offline`)
    },
    1: {
      code: 'online',
      name: '正常',
      type: 'normal-pile',
      displayName: t(`${tHead}.state.online`)
    },
    2: {
      code: 'online',
      name: '正常',
      type: 'normal-pile',
      displayName: t(`${tHead}.state.online`)
    },
    3: {
      code: 'online',
      name: '正常',
      type: 'normal-pile',
      displayName: t(`${tHead}.state.online`)
    },
    4: {
      code: 'online',
      name: '正常',
      type: 'normal-pile',
      displayName: t(`${tHead}.state.online`)
    },
    5: {
      code: 'online',
      name: '正常',
      type: 'normal-pile',
      displayName: t(`${tHead}.state.online`)
    },
    255: {
      code: 'warning',
      name: '故障',
      type: 'warning-pile',
      displayName: t(`${tHead}.state.warning`)
    }
  }[state];
};

const equipmentTypeFun = (type) => {
  return {
    1: t(`${tHead}.equipmentTypeFun.zlsb`) || '直流设备',
    2: t(`${tHead}.equipmentTypeFun.jlsb`) || '交流设备',
    3: t(`${tHead}.equipmentTypeFun.jzlytsb`) || '交直流一体设备',
    4: t(`${tHead}.equipmentTypeFun.wxsb`) || '无线充电',
    5: t(`${tHead}.equipmentTypeFun.cfdsb`) || '充放电设备',
    255: t(`${tHead}.equipmentTypeFun.qt`) || '其他'
  }[type];
};

const listDataFun = (data) => {
  return [
    {
      label: '设备名称：',
      value: data?.equipmentName || '--',
      displayLabel: t(`${tHead}.listDataFun.equipmentName`)
    },
    {
      label: '设备类型：',
      value: equipmentTypeFun(data?.equipmentType) || '--',
      displayLabel: t(`${tHead}.listDataFun.equipmentType`)
    },
    {
      label: '设备编号：',
      value: data?.equipmentId || '--',
      displayLabel: t(`${tHead}.listDataFun.equipmentId`)
    },
    {
      label: '设备状态：',
      value: stateFormate(data?.equipmentStatus)?.displayName || stateFormate(data?.equipmentStatus)?.name || '--',
      displayLabel: t(`${tHead}.listDataFun.equipmentStatus`)
    },
    {
      label: '设备型号：',
      value: data?.equipmentModel || '--',
      displayLabel: t(`${tHead}.listDataFun.equipmentModel`)
    },
    {
      label: '设备总功率：',
      value: data?.power || '--',
      unit: 'kW',
      displayLabel: t(`${tHead}.listDataFun.equipmentPower`)
    },
    {
      label: '总枪数：',
      value: data?.gunSum || '--',
      displayLabel: t(`${tHead}.listDataFun.gunSum`)
    },
    {
      label: '额定功率：',
      value: data?.equipmentPower || '--',
      unit: 'kW',
      displayLabel: t(`${tHead}.listDataFun.ratedPower`)
    }
  ];
};

const messageColumnKeyListFun = () => {
  return [
    { prop: 'index', label: '序号', width: 30, type: 'index', displayLabel: t(`${tHead}.messageColumnKeyListFun.index`) },
    { prop: 'connectorName', label: '设备接口名称', width: 150, displayLabel: t(`${tHead}.messageColumnKeyListFun.connectorName`) },
    { prop: 'connectorId', label: '设备接口编码', width: 150, displayLabel: t(`${tHead}.messageColumnKeyListFun.connectorId`) }
  ];
};
const columnKeyList = ref(messageColumnKeyListFun());
const scrollTableData = ref(pileData.value?.gunInfoVoList || []);
const listData = ref(listDataFun(pileData.value));
const handleChange = (val) => {
  console.log(val);
};
watch(pileData, (newVal) => {
  scrollTableData.value = newVal?.gunInfoVoList || [];
  listData.value = listDataFun(newVal);
});
</script>
<style lang="less" scoped>
.custom-collapse {
  :deep(.el-collapse) {
    border: 0;
    .el-collapse-item {
      margin-bottom: 16px;
    }
    .el-collapse-item__header {
      flex-direction: row-reverse;
      justify-content: flex-end;
      border: 0;
      width: 293px;
      line-height: 32px;
      height: 32px;
      background: linear-gradient(96.34deg, rgba(84, 181, 255, 0.56) 5%, rgba(84, 181, 255, 0) 95%);
      font-size: 16px;
      color: #fff !important;
      .el-collapse-item__arrow {
        margin: 0 10px;
      }
    }
    .el-collapse-item__wrap {
      border-bottom: 0;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }
  .device-info {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .list-item {
      width: 355px;
      font-size: 16px;
      line-height: 22px;
      color: rgba(255, 255, 255, 0.7);
      &:nth-last-of-type(n + 3) {
        margin-bottom: 20px;
      }
      .value {
        color: #fff;
        white-space: nowrap;
      }
    }
  }
  :deep(.custom-table) {
    margin-top: 16px;
    .el-table__header {
      background: linear-gradient(0deg, #61789a -24.83%, rgba(114, 131, 156, 0.0884779) 100%);
    }
  }
}
</style>
