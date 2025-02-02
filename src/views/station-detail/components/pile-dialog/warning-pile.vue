<template>
  <div class="warning-pile">
    <div class="safe-level">
      <icon icon="svg-icon:warning" />
      <span>{{ alarmLevelData[pileData.alarmLevel] || '--' }}</span>
    </div>
    <div class="device-info">
      <ul class="device-left">
        <li class="list-item" v-for="(item, index) in listDataLeft" :key="index">
          <label for="">{{ item.displayLabel ||item.label }}</label>
          <span class="value">{{ item.value }}</span>
        </li>
      </ul>
      <ul class="device-right">
        <li class="list-item" v-for="(item, index) in listDataRight" :key="index">
          <label for="">{{ item.displayLabel || item.label }}</label>
          <span class="value">{{ item.value }}</span>
        </li>
      </ul>
    </div>

    <div class="btns-wrap">
      <div class="border-bg red" @click="emit('close')">
        <!-- yjdd: '一键断电' -->
        <div class="content">{{t(`${tHead}.yjdd`)}}</div>
      </div>
      <div class="border-bg blue" @click="innerVisible = true">
        <!-- yjhj: '一键呼叫' -->
        <div class="content">{{t(`${tHead}.yjhj`)}}</div>
      </div>
      <div class="border-bg blue" @click="emit('close')">
        <!-- qrxf: '确认修复' -->
        <div class="content">{{t(`${tHead}.qrxf`)}}</div>
      </div>
    </div>
    <el-dialog
      v-model="innerVisible"
      class="phone-dialog"
      width="10.45rem"
      title="Inner Dialog"
      append-to-body
      align-center
    >
      <template #header>
        <div class="my-header">
          <icon icon="svg-icon:people" />
          <div class="info">
            <span class="top">
              <!-- name-pile: '李强-比亚迪民乐充电站-安全负责人' -->
              <span class="name-pile">{{t(`${tHead}.name-pile`)}}</span>
            </span>
            <span class="pile-code">18283993910</span>
          </div>
        </div>
      </template>
      <div class="user-info">
        <icon icon="svg-icon:people-big" :style="{ fontSize: '2.94rem' }" />
        <!-- userName: '李强' -->
        <span class="user-name">{{ t(`${tHead}.userName`) }}</span>
        <span class="time">00:00:00</span>
        <div class="btn-wrap">
          <span
            class="btn-item"
            @click="handleClick(item)"
            v-for="item in btnList"
            :key="item.icon"
          >
            <icon :icon="`svg-icon:${item.icon}`" :style="{ fontSize: '0.6rem' }" />
            <span class="text">{{ item.displayLabel || item.text }}</span>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, inject, watch } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `station-detail.components.pile-dialog.warning-pile`;
const emit = defineEmits(['close']);
const pileData = inject('pileData');

const alarmLevelData = {
  1: t(`${tHead}.alarmLevelData.yjrsaq`) || '一级人身安全',
  2: t(`${tHead}.alarmLevelData.ejsbaq`) || '二级设备安全',
  3: t(`${tHead}.alarmLevelData.sjgjts`) || '三级告警提示'
};

const equipmentTypes = {
  1: t(`${tHead}.equipmentTypes.zlsb`) || '直流设备',
  2: t(`${tHead}.equipmentTypes.jlsb`) || '交流设备',
  3: t(`${tHead}.equipmentTypes.jzlytsb`) || '交直流一体设备',
  4: t(`${tHead}.equipmentTypes.wxcd`) || '无线充电',
  5: t(`${tHead}.equipmentTypes.cfdsb`) || '充放电设备',
  255: t(`${tHead}.equipmentTypes.qt`) || '其他'
};

const alarmTypes = {
  1: t(`${tHead}.alarmTypes.cdxtgz`) || '充电系统故障',
  2: t(`${tHead}.alarmTypes.dcxtgz`) || '电池系统故障',
  3: t(`${tHead}.alarmTypes.pdxtgz`) || '配电系统故障'
};

const affirms = {
  1: t(`${tHead}.affirms.unaffirms`) || '未确认',
  2: t(`${tHead}.affirms.affirms`) || '已确认'
};

const listDataLeftFun = (data = {}) => {
  return [
    {
      label: '设备名称：',
      value: data?.equipmentName || '--',
      displayLabel: t(`${tHead}.listDataLeftFun.equipmentName`)
    },

    {
      label: '设备编号：',
      value: data?.equipmentId || '--',
      displayLabel: t(`${tHead}.listDataLeftFun.equipmentId`)
    },

    {
      label: '告警类型：',
      value: alarmTypes[data?.alarmType] || '--',
      displayLabel: t(`${tHead}.listDataLeftFun.alarmType`)
    },

    {
      label: '告警时间：',
      value: data?.alarmTime || '--',
      displayLabel: t(`${tHead}.listDataLeftFun.alarmTime`)
    },

    {
      label: '确认结果：',
      value: affirms[data?.affirm] || '--',
      displayLabel: t(`${tHead}.listDataLeftFun.affirm`)
    }
  ];
};

const listDataRightFun = (data = {}) => {
  return [
    {
      label: '设备类型：',
      value: equipmentTypes[data?.equipmentType] || '--',
      displayLabel: t(`${tHead}.listDataRightFun.equipmentType`)
    },

    {
      label: '设备接口编码：',
      value: data?.connectorId || '--',
      displayLabel: t(`${tHead}.listDataRightFun.connectorId`)
    },

    {
      label: '告警描述：',
      value: data?.alarmDesc || '--',
      displayLabel: t(`${tHead}.listDataRightFun.alarmDesc`)
    },

    {
      label: '上报时间：',
      value: data?.reportingTime || '--',
      displayLabel: t(`${tHead}.listDataRightFun.reportingTime`)
    },

    {
      label: '负责人电话：',
      value: data?.contactTel || '--',
      displayLabel: t(`${tHead}.listDataRightFun.contactTel`)
    }
  ];
};

const listDataLeft = ref(listDataLeftFun(pileData.value));
const listDataRight = ref(listDataRightFun(pileData.value));
const innerVisible = ref(false);

const btnList = ref([
  {
    icon: 'video',
    text: '视频',
    displayLabel: t(`${tHead}.btnList.video`)
  },
  {
    icon: 'voice',
    text: '麦克风',
    displayLabel: t(`${tHead}.btnList.voice`)
  },
  {
    icon: 'hangup',
    text: '挂断',
    displayLabel: t(`${tHead}.btnList.hangup`)
  }
]);

const handleClick = (item) => {
  if (item.icon === 'hangup') {
    innerVisible.value = false;
  }
};
watch(
  () => pileData.value,
  (newVal) => {
    listDataLeft.value = listDataLeftFun(newVal);
    listDataRight.value = listDataRightFun(newVal);
  },
  {
    deep: true,
    immediate: true
  }
);
</script>
<style lang="less" scoped>
.warning-pile {
  .safe-level {
    background: linear-gradient(96.34deg, rgba(203, 67, 67, 0.768) 5%, rgba(255, 84, 84, 0) 95%);
    line-height: 32px;
    padding-left: 10px;
    font-size: 16px;
    .el-icon {
      font-size: 14px;
      margin-right: 10px;
    }
  }
}
.device-info {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  .device-right {
    margin-left: 198px;
  }
  .list-item {
    width: 260px;
    font-size: 16px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 20px;
    .value {
      color: #fff;
    }
  }
}
.btns-wrap {
  display: flex;
  justify-content: flex-end;

  position: absolute;
  bottom: 35px;
  right: 35px;
  .border-bg {
    width: 103px;
    height: 39px;
    padding: 3px;
    margin-right: 24px;
    cursor: pointer;
    &:last-of-type {
      margin-right: 0;
    }
    .content {
      height: 100%;
      background: linear-gradient(270deg, #740a0a 0%, #df3434 100%);
      border: 1.5px solid #ff9999;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.red {
      background: url(../images/red-btn-bgc.png) no-repeat;
      background-size: 100% 100%;
    }
    &.blue {
      background: url(../images/blue-btn-bgc.png) no-repeat;
      background-size: 100% 100%;
      .content {
        background: linear-gradient(270deg, #0a4174 0%, #3483df 100%);
        border: 1.5px solid #99ceff;
      }
    }
  }
}
</style>
<style lang="less">
.phone-dialog.el-dialog {
  background: rgba(18, 40, 73, 0.85);
  box-shadow: inset 0px 0px 16px rgba(10, 167, 255, 0.8);
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
    padding-top: 53px;
    padding-bottom: 32px;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    .name {
      margin-top: 27px;
      font-size: 22px;
      line-height: 31px;
      /* identical to box height */
      color: #c0e5ff;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    .time {
      font-size: 20px;
      line-height: 28px;
      /* identical to box height */
      color: rgba(166, 214, 249, 0.7);
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    .btn-wrap {
      margin-top: 62px;
      display: flex;
      .btn-item {
        display: flex;
        flex-direction: column;
        margin-right: 42px;
        align-items: center;
        cursor: pointer;
        &:last-of-type {
          margin-right: 0;
        }
      }
      .text {
        font-size: 18px;
        line-height: 25px;
        margin-top: 12px;
        color: rgba(166, 214, 249, 0.7);

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }
    }
  }
}
</style>
