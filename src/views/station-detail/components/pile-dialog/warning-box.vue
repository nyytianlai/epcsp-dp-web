<template>
  <el-dialog
    v-model="visible"
    class="warning-pile-alarm"
    :class="{ hide: !isShow }"
    width="6.75rem"
    :modal="false"
    destroy-on-close
    align-center
    @close="emit('update:visible', false)"
    @closed="emit('closed')"
  >
    <template #header>
      <div class="my-header">
        <icon icon="svg-icon:warning-pile" />
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
      <div class="warn-btn" @click="handleBasic(pileParams)">查看基本信息</div>
    </template>
    <warning-pile />
  </el-dialog>
</template>
<script setup lang="ts">
import Icon from '@sutpc/vue3-svg-icon';

import WarningPile from './warning-pile.vue';
import { reactive, ref, toRefs, watch, provide } from 'vue';
import { selectEquipmentWarningInfoByEquipmentId } from './api.js';
const emit = defineEmits(['update:visible', 'closed', 'click-detail']);
const headerData = ref({});
const pileData = ref({});
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  pileParams: {
    type: Object
  }
});

const isShow = ref(false);
const { visible, pileParams } = toRefs(props);
console.log('pileParams', pileParams.value);
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
// 获取告警数据
const getEquipmentInfoByEquipmentIdData = async () => {
  const res = await selectEquipmentWarningInfoByEquipmentId({
    eid: pileParams.value.eid,
    id: pileParams.value.warnId
  });
  console.log('rrrrr', res);
  if (res?.data) {
    headerData.value = {
      name: res?.data?.equipmentName,
      status: stateFormate([res?.data?.equipmentStatus])?.name,
      code: res?.data?.equipmentId,
      class: stateFormate([res?.data?.equipmentStatus])?.code,
      power: res?.data?.power,
      type: stateFormate([res?.data?.equipmentStatus])?.equipmentType
    };
    pileData.value = res?.data;
    isShow.value = true;
  }
};
watch(
  () => visible.value,
  (newVal) => {
    console.log('newValnewVal', newVal);
    isShow.value = false;
    if (newVal) {
      getEquipmentInfoByEquipmentIdData();
    }
  },
  {
    immediate: true
  }
);

// 点击查看基本信息
const handleBasic = (data) => {
  emit('click-detail', data);
};
watch(
  () => visible.value,
  (newVal) => {
    console.log('newValnewVal', newVal);
    isShow.value = false;
    if (newVal) {
      getEquipmentInfoByEquipmentIdData();
    }
  },
  {
    immediate: true
  }
);
provide('pileData', pileData);
</script>
<style lang="less">
.warning-pile-alarm {
  height: 582px;
  width: 845px;
  background: radial-gradient(
      58.3% 58.3% at 50% 50%,
      rgba(73, 18, 18, 0.85) 0%,
      rgba(18, 40, 73, 0.7565) 100%
    )
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 20px),
    calc(100% - 20px) 100%,
    20px 100%,
    0 calc(100% - 20px),
    0 0
  );
  box-shadow: inset 0px 0px 42px rgba(255, 54, 10, 0.51);
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

  .my-header {
    .info .top .status {
      background: rgba(170, 5, 5, 0.3);
      border: 1px solid #aa0505;
      color: #ff6b4b;
    }
  }
}
</style>
