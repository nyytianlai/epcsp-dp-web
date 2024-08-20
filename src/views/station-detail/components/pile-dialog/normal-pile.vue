<template>
    <div class="normal-pile">
        <el-tabs v-model="activeName" class="pile-tabs">
            <!-- jbxx: '基本信息' -->
            <el-tab-pane :label="t(`${tHead}.jbxx`)" name="first">
              <BaseInfo/>
            </el-tab-pane>
            <!-- dtxx: '动态信息', 动态信息 -->
            <el-tab-pane :label="t(`${tHead}.dtxx`)" name="second">
              <active-message/>
            </el-tab-pane>
            <!-- gjxx: '告警信息', 告警信息 -->
            <el-tab-pane :label="t(`${tHead}.gjxx`)" name="third">
              <warning-message/>
            </el-tab-pane>
            <!-- <el-tab-pane label="充电记录" name="fourth">充电记录</el-tab-pane> -->
        </el-tabs>
    </div>
</template>
<script  setup>
import { ref } from 'vue'
import BaseInfo from './base-info.vue'
import WarningMessage from './warning-message.vue'
import ActiveMessage from './active-message.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `station-detail.components.pile-dialog.normal-pile`;
const activeName = ref('first')
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
  .el-tabs__content {
  }
}
</style>