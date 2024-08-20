<template>
  <div class="dialog-battery">
    <el-tabs v-model="activeName" class="pile-tabs">
      <!-- cxx: '簇信息' -->
      <el-tab-pane :label="t(`${tHead}.cxx`)" name="first">
        <BatteryMsg />
      </el-tab-pane>
      <!-- cdywd: '簇电压/温度' -->
      <el-tab-pane :label="t(`${tHead}.cdywd`)" name="second">
        <TemperatureMsg />
      </el-tab-pane>
    </el-tabs>

    <div class="ec-box">
      <ec-resize :option="option" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { batterySOHOption } from '../config';
import EcResize from '@sutpc/vue3-ec-resize';
import BatteryMsg from './battery-msg.vue';
import TemperatureMsg from './temperature-msg.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `station-detail.components.dialog-battery`;
const activeName = ref('first');
const option = ref(batterySOHOption());
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
