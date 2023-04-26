<template>
    <el-dialog
        v-model="visible"
        :title="title"
        class="pile-dialog"
        :class="type"
        width="6.75rem"
        @close="emit('update:visible', false)"
        @closed="emit('closed')"
    >
    <template #header>
      <div class="my-header">
        <icon :icon="`svg-icon:${type}`" />
        <div class="info">
            <span class="top">
                <span class="name-pile">#103直流桩</span>
                <span class="power">240KW</span>
                <span class="status">正常</span>
            </span>
            <span class="pile-code">
                12837479W900Q00Q0
            </span>
        </div>
      </div>
    </template>
      <normal-pile v-if="type === 'normal-pile'" />
      <warning-pile @close="close" v-else  />
    </el-dialog>
</template>
<script setup>
import { toRefs, ref } from 'vue';
import NormalPile from './normal-pile.vue'
import WarningPile from './warning-pile.vue'
import Icon from '@sutpc/vue3-svg-icon';
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default:''
  },
  type:{
    type:String,
    default:'normal-pile'
  }
});
const {visible,title,type} = toRefs(props)
const emit = defineEmits(['update:visible','closed']);
const close = ()=>{
  emit('update:visible', false)
}
</script>
<style lang="less">
.pile-dialog {
  background: rgba(18, 40, 73, 0.85);
  box-shadow: inset 0px 0px 16px rgba(10, 167, 255, 0.8);
  &.warning-pile {
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