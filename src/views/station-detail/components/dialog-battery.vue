<template>
  <div class="dialog-battery">
    <el-tabs v-model="activeName" class="pile-tabs">
      <el-tab-pane label="簇信息" name="first">
        <BatteryMsg />
      </el-tab-pane>
      <el-tab-pane label="簇电压/温度" name="second">
        <TemperatureMsg />
      </el-tab-pane>
    </el-tabs>

    <div class="ec-box">
      <ec-resize :option="batterySOHOption" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { batterySOHOption } from '../config';
import EcResize from '@sutpc/vue3-ec-resize';
import BatteryMsg from './battery-msg.vue';
import TemperatureMsg from './temperature-msg.vue';
const activeName = ref('first');
</script>
<style lang="less" scoped>
:deep(.pile-tabs) {
  .el-tabs__item.is-active {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #ffffff;
  }
  .el-tabs__item {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: rgba(166, 214, 249, 0.5);
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
}
.ec-box {
  height: 228px;
}
</style>
