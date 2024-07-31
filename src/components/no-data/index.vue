<template>
  <div class="no-data-wrap">
    <div class="content">
      <icon icon="svg-icon:no-data" />
      <span class="desc">暂无数据</span>
    </div>
  </div>
</template>
<script setup>
import Icon from '@sutpc/vue3-svg-icon';
</script>
<style lang="less">
.no-data-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-icon {
      font-size: 100px;
    }
    .desc {
      font-weight: 500;
      font-size: 18px;
      line-height: 25px;
      color: #54b5ff;
    }
  }
}
</style>
