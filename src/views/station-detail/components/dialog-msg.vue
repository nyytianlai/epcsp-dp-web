<template>
  <div class="dialog-msg">
    <div class="left">
      <div class="left-item" v-for="(item, index) in leftList" :key="index">
        <span class="label">{{ item.displayLabel || item.label }}：</span><span class="value">{{ item.value }}</span>
      </div>
    </div>
    <div class="right">
      <div class="right-item" v-for="(item, index) in rightList" :key="index">
      <span class="label">{{ item.displayLabel || item.label }}：</span><div class="light" :class="[item.status]"></div><span class="value">{{ item.displayValue || item.value }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `station-detail.components.dialog-msg`;

const leftList = ref([
  {
    label: 'PCS AB母线电压',
    value: '395.30V',
    displayLabel: t(`${tHead}.leftList.pcsabmxdy`),
  },
  {
    label: 'PCS BC母线电压',
    value: '395.30V',
    displayLabel: t(`${tHead}.leftList.pcsbcmxdy`),
  }, {
    label: 'PCS CA母线电压',
    value: '395.30V',
    displayLabel: t(`${tHead}.leftList.pcscamxdy`),
  }, {
    label: 'PCS A相电流',
    value: '0.00A',
    displayLabel: t(`${tHead}.leftList.pcsaxdl`),
  }, {
    label: 'PCS B相电流',
    value: '0.00A',
    displayLabel: t(`${tHead}.leftList.pcsbxdl`),
  }, {
    label: 'PCS C相电流',
    value: '0.00A',
    displayLabel: t(`${tHead}.leftList.pcscxdl`),
  },
  {
    label: 'PCS 频率',
    value: '49.90Hz',
    displayLabel: t(`${tHead}.leftList.pcspl`),
  }
]);

const rightList = ref([
{
    label: 'PCS 通讯状态',
    status: 'green',
    value: '正常',
    displayLabel: t(`${tHead}.rightList.pcstxzt`),
    displayValue: t(`${tHead}.rightList.zc`)
  },
  {
    label: 'PCS 远方控制',
    status: 'green',
    value: '正常',
    displayLabel: t(`${tHead}.rightList.pcsyfkz`),
    displayValue: t(`${tHead}.rightList.zc`)
  },
  {
    label: 'PCS 运行状态',
    status: 'green',
    value: '正常',
    displayLabel: t(`${tHead}.rightList.pcsyxzt`),
    displayValue: t(`${tHead}.rightList.zc`)
  },
  {
    label: 'PCS 故障状态',
    status: 'green',
    value: '正常',
    displayLabel: t(`${tHead}.rightList.pcsgzzt`),
    displayValue: t(`${tHead}.rightList.zc`)
  },
  {
    label: 'PCS 告警状态',
    status: 'green',
    value: '正常',
    displayLabel: t(`${tHead}.rightList.pcsgjzt`),
    displayValue: t(`${tHead}.rightList.zc`)
  }
])
</script>
<style lang="less" scoped>
.dialog-msg {
  display: flex;
}
.left-item {
  margin-top: 20px;

}
.right-item {
  margin-left: 200px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  .value {
    margin-left: 5px;
  }
}
.label {
  font-weight: 400;
font-size: 16px;
color: rgba(255, 255, 255, 0.7);

} 
.value {
  color: #fff;
  font-size: 16px;
  font-weight: 400;
}
.light {
  background: #72C93F;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>