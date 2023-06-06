<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-26 11:35:17
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-27 15:53:49
 * @FilePath: \epcsp-dp-web\src\views\station-detail\components\pile-dialog\base-info.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="custom-collapse">
    <el-collapse border="0" v-model="activeNames" @change="handleChange">
      <el-collapse-item title="充电桩" name="1">
        <ul class="device-info">
          <li class="list-item" v-for="(item, index) in listData" :key="index">
            <label for="">{{ item.label }}</label>
            <span class="value">
              {{ item.value }}
              <span v-if="item.unit">{{ item.unit }}</span>
            </span>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="充电枪" name="2">
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
            :label="item.label"
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
const activeNames = ref(['1', '2']);
const pileData = inject('pileData');
const stateFormate = (state) => {
  return {
    0: {
      code: 'offline',
      name: '故障',
      type: 'warning-pile'
    },
    1: {
      code: 'online',
      name: '正常',
      type: 'normal-pile'
    },
    2: {
      code: 'online',
      name: '正常',
      type: 'normal-pile'
    },
    3: {
      code: 'online',
      name: '正常',
      type: 'normal-pile'
    },
    4: {
      code: 'online',
      name: '正常',
      type: 'normal-pile'
    },
    5: {
      code: 'online',
      name: '正常',
      type: 'normal-pile'
    },
    255: {
      code: 'warning',
      name: '故障',
      type: 'warning-pile'
    }
  }[state];
};
const equipmentTypeFun = (type) => {
  return {
    1: '直流设备',
    2: '交流设备',
    3: '交直流一体设备',
    4: '无线充电',
    5: '充放电设备',
    255: '其他'
  }[type];
};
const listDataFun = (data) => {
  return [
    {
      label: '设备名称：',
      value: data?.equipmentName || '--'
    },
    {
      label: '设备类型：',
      value: equipmentTypeFun(data?.equipmentType) || '--'
    },
    {
      label: '设备编号：',
      value: data?.equipmentId || '--'
    },
    {
      label: '设备状态：',
      value: stateFormate(data?.equipmentStatus)?.name || '--'
    },
    {
      label: '设备型号：',
      value: data?.equipmentModel || '--'
    },
    {
      label: '设备总功率：',
      value: data?.power || '--',
      unit: 'kW'
    },
    {
      label: '总枪数：',
      value: data?.gunSum || '--'
    },
    {
      label: '额定功率：',
      value: data?.equipmentPower || '--',
      unit: 'kW'
    }
  ];
};
const messageColumnKeyListFun = () => {
  return [
    { prop: 'index', label: '序号', width: 30, type: 'index' },
    { prop: 'connectorName', label: '设备接口名称', width: 150 },
    { prop: 'connectorId', label: '设备接口编码', width: 150 }
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
