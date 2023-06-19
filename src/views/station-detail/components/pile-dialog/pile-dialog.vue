<template>
  <el-dialog
    v-model="visible"
    class="pile-dialog"
    :class="[
      type,
      headerData?.type,
      isShow ? '' : 'hide',
      isAlarm ? '' : 'warning-pile-alarm-basic'
    ]"
    :width="headerData?.type === 'normal-pile' ? '8.45rem' : '6.75rem'"
    @close="emit('update:visible', false)"
    @closed="emit('closed')"
    :modal="false"
    destroy-on-close
  >
    <template #header>
      <div class="my-header">
        <icon :icon="`svg-icon:${type}`" v-if="type === 'monitor'" />
        <icon :icon="`svg-icon:${headerData?.type}`" v-if="type === 'pile'" />
        <div class="info">
          <span class="top">
            <span class="name-pile">{{ headerData?.name }}</span>
            <span class="power" v-if="headerData?.power">{{ headerData?.power }}kW</span>
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
    <normal-pile v-if="headerData?.type === 'normal-pile'" />
    <!-- <warning-pile v-if="headerData?.type === 'warning-pile'" @close="close" /> -->
    <video-player v-if="type === 'monitor'" :videoUrl="pileVideoData.cameraUrl" />
  </el-dialog>
</template>
<script setup>
import { toRefs, ref, computed, onMounted, watch, provide } from 'vue';
import NormalPile from './normal-pile.vue';
import WarningPile from './warning-pile.vue';
import VideoPlayer from './video-palyer.vue';
import Icon from '@sutpc/vue3-svg-icon';
import { selectEquipmentInfoByEquipmentId } from './api.js';
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  type: {
    type: String
  },
  pileParams: {
    type: Object
  },
  pileVideoData: {
    type: Object
  }
});
const { visible, title, type, pileVideoData, pileParams } = toRefs(props);
const emit = defineEmits(['update:visible', 'closed']);
const headerData = ref({});
const pileData = ref({});
provide('pileData', pileData);
const isShow = ref(false);
const isAlarm = ref(1);
const close = () => {
  emit('update:visible', false);
};
const videoStatus = {
  0: {
    statusName: '离线',
    class: 'offline'
  },
  1: {
    statusName: '在线',
    class: 'online'
  },
  255: {
    statusName: '故障',
    class: 'warning'
  }
};
const stateFormate = (state) => {
  return {
    0: {
      code: 'offline',
      name: '离线',
      type: 'normal-pile'
    },
    1: {
      code: 'online',
      name: '正常',
      type: 'normal-pile'
    },
    2: {
      code: 'online',
      name: '正常',
      type: 'normal-pile'
    },
    3: {
      code: 'online',
      name: '正常',
      type: 'normal-pile'
    },
    4: {
      code: 'online',
      name: '正常',
      type: 'normal-pile'
    },
    5: {
      code: 'online',
      name: '正常',
      type: 'normal-pile'
    },
    255: {
      code: 'warning',
      name: '故障',
      type: 'normal-pile'
    }
  }[state];
};
const getEquipmentInfoByEquipmentIdData = async () => {
  const res = await selectEquipmentInfoByEquipmentId(pileParams.value);
  console.log(res);
  if (res?.data) {
    headerData.value = {
      name: res?.data?.equipmentName,
      status: stateFormate([res?.data?.equipmentStatus])?.name,
      code: res?.data?.equipmentId,
      class: stateFormate([res?.data?.equipmentStatus])?.code,
      power: res?.data?.equipmentPower,
      type: stateFormate([res?.data?.equipmentStatus])?.type
    };
    pileData.value = res?.data;
    isAlarm.value = res.data.isAlarm;
    isShow.value = true;
  }
};
watch(
  () => visible.value,
  (newVal) => {
    console.log('newValnewVal', newVal);
    isShow.value = false;
    if (newVal) {
      console.log('monitor', type.value);
      if (type.value !== 'monitor') {
        getEquipmentInfoByEquipmentIdData();
      } else {
        if (!pileVideoData.value) return;
        headerData.value = {
          name: pileVideoData.value?.location,
          status: videoStatus[pileVideoData.value?.status]?.statusName,
          code: pileVideoData.value?.ip,
          class: videoStatus[pileVideoData.value?.status]?.class,
          power: ''
        };
      }
    }
  },
  {
    immediate: true
  }
);
</script>
<style lang="less">
.pile-dialog {
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

.warning-pile {
  height: 482px;

  :deep(.el-dialog__headerbtn) {
    color: #c0e5ff;
    font-size: 21px;
    font-weight: bold;
  }
}
.warning-pile-alarm-basic {
  background: radial-gradient(
      58.3% 58.3% at 50% 50%,
      rgba(73, 18, 18, 0.85) 0%,
      rgba(18, 40, 73, 0.7565) 100%
    )
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  box-shadow: inset 0px 0px 42px rgba(255, 54, 10, 0.51);
}
.hide {
  display: none;
}
</style>
