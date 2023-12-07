<template>
  <el-dialog
    width="8.45rem"
    class="pile-dialog"
    @close="emit('handleClose')"
    v-model="visible"
    destroy-on-close
    align-center
  >
    <template #header>
      <div class="my-header">
        <icon :icon="`svg-icon:${headerData?.icon}`" class="top-icon" />
        <div class="info">
          <span class="top">
            <span class="name-pile">{{ headerData?.name }}</span>
            <span class="status" v-if="headerData?.status" :class="headerData?.class">
              {{ headerData?.status }}
            </span>
          </span>
          <span class="pile-code">
            {{ headerData?.code }}
          </span>
        </div>
      </div>
    </template>
    <DialogMsg v-if="mode === 'pcsCabinet'"></DialogMsg>
    <DdialogBattery v-if="mode === 'batteryCluste' || mode === 'batteryCluster'"></DdialogBattery>
  </el-dialog>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import DialogMsg from './dialog-msg.vue';
import DdialogBattery from './dialog-battery.vue';
const emit = defineEmits(['handleClose']);
const props = defineProps({
  headerData: {
    type: Object,
    default: () => {}
  },
  mode: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  }
});

const { visible } = toRefs(props);
</script>
<style lang="less" >
.pile-dialog.el-dialog {
  width: 845px;
  background: rgba(18, 40, 73, 0.85);
  box-shadow: inset 0px 0px 16px rgba(10, 167, 255, 0.8);
  height: 582px;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 20px),
    calc(100% - 20px) 100%,
    20px 100%,
    0 calc(100% - 20px),
    0 0
  );
  &.monitor {
    height: 482px;
  }
  &.warning-pile {
    height: 482px;
    background: radial-gradient(
        58.3% 58.3% at 50% 50%,
        rgba(73, 18, 18, 0.85) 0%,
        rgba(18, 40, 73, 0.7565) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    box-shadow: inset 0px 0px 42px rgba(255, 54, 10, 0.51);
    .my-header {
      .info .top .status {
        background: rgba(170, 5, 5, 0.3);
        border: 1px solid #aa0505;
        color: #ff6b4b;
      }
    }
  }
  .el-dialog__header {
    border-bottom: 2px solid rgba(26, 172, 255, 0.15);
    margin-left: 24px;
    margin-right: 34px;
    padding-left: 0;
  }
  .my-header {
    display: flex;

    .el-icon {
      font-size: 55px;
    }
    .info {
      display: flex;
      flex-direction: column;
      margin-left: 16px;
      .top {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
        .name-pile {
          font-weight: 500;
          font-size: 20px;
          line-height: 28px;
        }
        .power {
          background: rgba(6, 138, 147, 0.2);
          border: 1px solid #068a93;
          border-radius: 4px;
          padding: 0 6px;
          line-height: 20px;
          margin-left: 12px;
          font-size: 12px;
        }
        .status {
          background: rgba(0, 255, 143, 0.3);
          border: 1px solid #00ff8f;
          border-radius: 4px;
          padding: 0 6px;
          line-height: 20px;
          margin-left: 6px;
          font-size: 12px;
          &.offline {
            background: rgba(159, 159, 159, 0.3);
            border-color: #e8e8e8;
            color: #ffffff;
          }
          &.warning {
            background: rgba(170, 5, 5, 0.3);
            border-color: #aa0505;
            color: #ff6b4b;
          }
        }
      }
      .pile-code {
        font-size: 16px;
        line-height: 22px;
        color: rgba(166, 214, 249, 0.7);
      }
    }
  }
  .el-dialog__body {
    padding-top: 16px;
    padding-left: 24px;
    padding-right: 34px;
  }
}
</style>
