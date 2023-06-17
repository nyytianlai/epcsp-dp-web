<template>
  <div class="dialog-msg">
    <div class="left">
      <div class="left-item" v-for="(item, index) in leftList" :key="index">
        <span class="label">{{ item.label }}：</span><span class="value">{{ item.value }}</span>
      </div>
    </div>
    <div class="right">
      <div class="right-item" v-for="(item, index) in rightList" :key="index">
        <span class="label">{{ item.label }}：</span><div class="light" :class="[item.status]"></div><span class="value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const leftList = ref([
  {
    label: 'PCS AB母线电压',
    value: '395.30V'
  },
  {
    label: 'PCS BC母线电压',
    value: '395.30V'
  }, {
    label: 'PCS CA母线电压',
    value: '395.30V'
  }, {
    label: 'PCS A相电流',
    value: '0.00A'
  }, {
    label: 'PCS B相电流',
    value: '0.00A'
  }, {
    label: 'PCS C相电流',
    value: '0.00A'
  },
  {
    label: 'PCS 频率',
    value: '49.90Hz'
  }
])
const rightList = ref([
{
    label: 'PCS 通讯状态',
    status: 'green',
    value: '正常'
  },
  {
    label: 'PCS 远方控制',
    status: 'green',
    value: '正常'
  },
  {
    label: 'PCS 运行状态',
    status: 'green',
    value: '正常'
  },
  {
    label: 'PCS 故障状态',
    status: 'green',
    value: '正常'
  },
  {
    label: 'PCS 告警状态',
    status: 'green',
    value: '正常'
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