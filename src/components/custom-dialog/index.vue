<template>
  <el-dialog
    v-model="visible"
    class="custom-dialog"
    :width="width"
    @close="emit('update:visible', false)"
    @closed="emit('closed')"
    align-center
    :modal="modal"
  >
    <template #header>
      <div class="title-box">
        <div class="rectangle"></div>
        <div class="title">{{ title }}</div>
        <div class="line"></div>
      </div>
      <slot name="titleSearch" />
    </template>
    <icon icon="svg-icon:corner-top" class="top-left corner" />
    <icon icon="svg-icon:corner-bottom" class="bottom-left corner" />
    <icon icon="svg-icon:corner-top" class="top-right corner" />
    <icon icon="svg-icon:corner-bottom" class="bottom-right corner" />
    <slot />
  </el-dialog>
</template>
<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '15.58rem'
  },
  modal: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['update:visible', 'closed']);
const { visible } = toRefs(props);
</script>
<style lang="less">
.el-overlay {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
}
.virture-dialog.custom-dialog.el-dialog {
  height: 350px;
}
.custom-dialog.el-dialog {
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
    margin-left: 20px;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
    padding-right: 65px;
  }
  .el-dialog__title {
    font-size: 20px;
    font-weight: 600px;
  }
  .el-dialog__body {
    padding-top: 18px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 0;
  }
  .el-pagination {
    margin-top: 20px;
    float: right;
  }
  .title-box {
    display: flex;
    align-items: center;
  }
  .rectangle {
    width: 16.97px;
    height: 16.97px;
    background: #00fff9;
    transform: rotate(45deg);
    border: 6px solid rgba(0, 255, 249, 0.1);
    margin-right: 8px;
    background-clip: content-box;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-right: 8px;
  }
  .line {
    height: 2px;
    width: 164px;
    background: linear-gradient(90deg, #54b5ff -0.6%, rgba(84, 181, 255, 0) 100.14%);
  }
}
</style>
