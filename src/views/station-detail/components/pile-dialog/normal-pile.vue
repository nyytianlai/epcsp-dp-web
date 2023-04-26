<template>
    <div class="normal-pile">
        <el-tabs v-model="activeName" class="pile-tabs" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
              <BaseInfo/>
            </el-tab-pane>
            <el-tab-pane label="动态信息" name="second">动态信息</el-tab-pane>
            <el-tab-pane label="告警信息" name="third">告警信息</el-tab-pane>
            <el-tab-pane label="充电记录" name="fourth">充电记录</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script  setup>
import { ref } from 'vue'
import BaseInfo from './base-info.vue'

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
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