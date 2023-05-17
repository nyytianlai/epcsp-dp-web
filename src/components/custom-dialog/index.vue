<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-18 10:47:38
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-19 16:56:59
 * @FilePath: \epcsp-dp-web\src\components\dialog-table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-dialog
    v-model="visible"
    :title="title"
    class="custom-dialog"
    width="15.58rem"
    @close="emit('update:visible', false)"
    @closed="emit('closed')"
  >
    <icon icon="svg-icon:corner-top" class="top-left corner" />
    <icon icon="svg-icon:corner-bottom" class="bottom-left corner" />
    <icon icon="svg-icon:corner-top" class="top-right corner" />
    <icon icon="svg-icon:corner-bottom" class="bottom-right corner" />
    <slot/>
  </el-dialog>
</template>
<script setup>
import { toRefs, ref } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default:''
  }
});
const emit = defineEmits(['update:visible']);
const { visible, columnData, data } = toRefs(props);
</script>
<style lang="less">
.el-overlay {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
}
.custom-dialog {
  background: rgba(4, 19, 43, 0.65);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(10, 167, 255, 0.5);
  border-radius: 2px;
  position: relative;
  height: 790px;
  .corner {
    font-size: 40px;
    position: absolute;
    pointer-events: none;
    &.top-left {
      top: -1px;
      left: -1px;
    }
    &.bottom-left {
      bottom: -1px;
      left: -1px;
    }
    &.top-right {
      top: -1px;
      right: -1px;
      transform: rotateY(180deg);
    }
    &.bottom-right {
      bottom: -1px;
      right: -1px;
      transform: rotateY(180deg);
    }
  }
  .el-dialog__header {
    border-bottom: 1px solid rgba(84, 181, 255, 0.4);
    margin-left: 20px;
    padding-left: 0;
  }
  .el-dialog__title {
    font-size: 20px;
    font-weight: 600px;
  }
  .el-dialog__body {
    padding: 18px 20px 28px;
  }
  .el-pagination {
    margin-top: 20px;
    float: right;
  }
}
</style>
