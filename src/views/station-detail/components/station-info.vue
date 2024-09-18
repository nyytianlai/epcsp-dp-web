<template>
  <div class="station-info">
    <div class="name-wrap">
      <div class="icon"></div>
      <div class="name">
        <el-tooltip
          :content="data?.stationName"
          placement="top"
          v-if="data?.stationName?.length > 13"
        >
          <div class="station-name">
            {{ data?.stationName || '--' }}
          </div>
        </el-tooltip>
        <div class="station-name" v-else>
          {{ data?.stationName || '--' }}
        </div>
        <span class="company-name">
          {{ data?.operatorName || '--' }}
        </span>
      </div>
    </div>
    <ul class="info-list">
      <li v-for="(item, index) in infoListData" :key="index">
        <label for="">{{ item.displayLabel || item.label }}</label>
        <span class="value text-ellipsis-1" v-if="item.label !== '具体地址：'">
          {{ item.value }}
        </span>
        <span class="value text-ellipsis-1" v-else>
          <el-tooltip :content="item.value || ''" placement="top">
            {{ item.value }}
          </el-tooltip>
        </span>
        <div v-if="isVirture && index === infoListData.length - 1" class="detail">
          <div class="content" @click="handleVoice">通知下发</div>
        </div>
      </li>
    </ul>
    <div class="status" :class="stationStatusClass[props.data.stationStatus]">
      {{ stationStatus[props.data.stationStatus] }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox } from 'element-plus';
const { t } = useI18n();
const tHead = `station-detail.components.station-info`;
interface Data {
  stationName: string;
  operatorName: string;
  areaName: string;
  address: string;
  stationProperty?: string | number;
  stationType?: string | number;
  stationStatus?: string | number;
  stationPrincipal: string;
  telephone: string;
}
const props = defineProps({
  data: {
    type: Object as PropType<Data>,
    default() {
      return {};
    }
  },
  isVirture: {
    // 是否为虚拟电厂进入
    type: Boolean,
    default: false
  }
});

const stationProperty = {
  1: t(`${tHead}.stationProperty.gy`) || '公用',
  2: t(`${tHead}.stationProperty.zy`) || '专用'
};

const stationStatus = {
  0: t(`${tHead}.stationStatus.wz`) || '未知',
  1: t(`${tHead}.stationStatus.jsz`) || '建设中',
  5: t(`${tHead}.stationStatus.gbxx`) || '关闭下线',
  6: t(`${tHead}.stationStatus.whz`) || '维护中',
  50: t(`${tHead}.stationStatus.zcsy`) || '正常使用'
};
const stationStatusClass = {
  0: 'gray',
  1: 'yellow',
  5: 'gray',
  6: 'yellow',
  50: 'blue'
};

const stationType = {
  1: t(`${tHead}.stationType.gg`) || '公共',
  50: t(`${tHead}.stationType.gr`) || '个人',
  100: t(`${tHead}.stationType.gjzy`) || '公交（专用）',
  101: t(`${tHead}.stationType.hwzy`) || '环卫（专用）',
  102: t(`${tHead}.stationType.wlzy`) || '物流（专用）',
  103: t(`${tHead}.stationType.czczy`) || '出租车（专用）',
  255: t(`${tHead}.stationType.qt`) || '其他'
};

const { data } = toRefs(props);
const infoListFun = (data: Data) => {
  return [
    {
      label: '站点区域：',
      value: data?.areaName || '--',
      displayLabel: t(`${tHead}.infoListFun.zdqy`)
    },
    {
      label: '具体地址：',
      value: data?.address || '--',
      displayLabel: t(`${tHead}.infoListFun.jtdz`)
    },
    {
      label: '站点性质：',
      value: stationProperty[data?.stationProperty] || '--',
      displayLabel: t(`${tHead}.infoListFun.zdxz`)
    },
    {
      label: '站点类型：',
      value: stationType[data?.stationType] || '--',
      displayLabel: t(`${tHead}.infoListFun.zdlx`)
    },
    {
      label: '负责人：',
      value: data?.stationPrincipal || '--',
      displayLabel: t(`${tHead}.infoListFun.fzr`)
    },
    {
      label: '联系方式：',
      value: data?.telephone || '--',
      displayLabel: t(`${tHead}.infoListFun.lxfs`)
    }
  ];
};
const infoListData = ref();

const handleVoice = () => {
  ElMessageBox.confirm('确认下发通知?');
};

watch(data, () => {
  infoListData.value = infoListFun(data.value);
});
</script>
<style lang="less" scoped>
.station-info {
  background: linear-gradient(
    255.75deg,
    rgba(37, 177, 255, 0.04) 23.33%,
    rgba(19, 83, 119, 0.4) 100%
  );
  mix-blend-mode: normal;
  box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(41, 76, 179, 0.2);
  backdrop-filter: blur(2px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 4px;
  padding-top: 18px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 16px;

  .name-wrap {
    display: flex;
    align-items: flex-start;

    .icon {
      width: 82px;
      height: 68px;
      background: url(./images/company.png) no-repeat;
      background-size: 100% 100%;
    }

    .name {
      margin-left: 17px;
      display: flex;
      flex-direction: column;

      .station-name {
        width: 260px;
        font-weight: 500;
        font-size: 20px;
        line-height: 32px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .company-name {
        margin-top: 4px;
        line-height: 16px;
        color: rgba(238, 253, 255, 0.6);
      }
    }
  }

  .info-list {
    line-height: 20px;
    margin-top: 8px;

    li {
      margin-bottom: 6px;
      display: flex;
      white-space: nowrap;
      position: relative;

      &:nth-last-of-type(1) {
        margin-bottom: 0;
      }
    }

    label {
      color: rgba(238, 253, 255, 0.6);
      min-width: 70px;
    }

    .detail {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 103px;
      height: 38px;
      padding: 3px;
      border-radius: 4px;
      background: url(../images/blue-btn-bgc.png) no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      .content {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(270deg, #0a4174 0%, #3483df 100%);
        border: 1.5px solid #99ceff;
        font-size: 14px;
      }
    }
  }
}

.status {
  font-size: 14px;
  padding: 4px 17px;
  border-radius: 4px 0;
  position: absolute;
  left: 0;
  top: 0;

  &.blue {
    background: linear-gradient(
      93.04deg,
      #04a1cf 0.63%,
      #bae7ff 184.61%,
      rgba(255, 255, 255, 0) 510.76%
    );
  }

  &.gray {
    background: linear-gradient(
      93.04deg,
      #a8a7a5 0.63%,
      #dddddd 184.61%,
      rgba(255, 255, 255, 0) 510.76%
    );
  }

  &.yellow {
    background: linear-gradient(
      93.04deg,
      #cfa204 0.63%,
      #fffcba 184.61%,
      rgba(255, 255, 255, 0) 510.76%
    );
  }
}
</style>
<style lang="less">
.el-message-box {
  background: rgba(4, 19, 43, 0.65) !important;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(10, 167, 255, 0.5) !important;
  border-radius: 2px !important;
}
</style>
