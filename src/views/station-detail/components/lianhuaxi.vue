<template>
  <page-num :data="pageNumData" class="page" />
  <panel>
    <div class="station-info">
      <!-- zdjbxx: '站点基本信息',  -->
      <title-column :title="t(`${tHead}.zdjbxx`)" />
      <div class="info">
        <div class="name-wrap">
          <div class="icon"></div>
          <div class="name">
            <!-- stationName: '莲花村地铁站分布式光伏站', -->
            <!-- <span class="station-name">{{ t(`${tHead}.stationName`) }}</span> -->
            <tooltip-over
              :is-inline="true"
              :className="['station-name-tooltip']"
              :content="t(`${tHead}.stationName`)"
              :ref-name="t(`${tHead}.stationName`)"
            />
            <!-- companyName: '深圳市深燃新能源科技有限公司', -->
            <span class="company-name">{{t(`${tHead}.companyName`)}}</span>
          </div>
        </div>
        <ul class="info-list">
          <li v-for="(item, index) in state.infoListData" :key="index">
            <label for="">{{ item.displayLabel || item.label }}</label>
            <span class="value text-ellipsis-1" v-if="item.label !== '具体地址：'">
              {{ item.displayValue || item.value }}
            </span>
            <span class="value text-ellipsis-1" v-else>
              <el-tooltip :content="item.displayValue || item.value || ''" placement="top">
                {{ item.displayValue || item.value }}
              </el-tooltip>
            </span>
          </li>
        </ul>
        <!-- normal: '正常', 正常 -->
        <div class="status blue">{{t(`${tHead}.normal`)}}</div>
      </div>
    </div>
    <div class="device-info">
      <!-- sssbxx: '设施设备信息', -->
      <title-column :title="t(`${tHead}.sssbxx`)" />
      <div class="num-wrap">
        <template v-for="(item, index) in state.deviceInfoData" :key="index">
          <num-tile-card :data="item" />
        </template>
      </div>
    </div>
    <div class="station-warning-message">
      <!-- zdgjxx: '站点告警信息', 站点告警信息 -->
      <title-column :title="t(`${tHead}.zdgjxx`)" />
      <EcResize class="warning-message-ec" :option="state.lianhuaWarnOptions" />
    </div>
  </panel>
  <panel type="right">
    <div class="guijing-com-status">
      <!-- djgzjzt: '单晶硅组件状态', 单晶硅组件状态 -->
      <title-column :title="t(`${tHead}.djgzjzt`)" />
      <lianhuajinggui :data="lianhuajingguiData" />
    </div>
    <div class="today-power-info">
      <!-- jrdlxx: '今日电量信息', -->
      <title-column :title="t(`${tHead}.jrdlxx`)" />
      <div class="num-wrap">
        <template v-for="(item, index) in state.lianhuaPower" :key="index">
          <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
        </template>
      </div>
    </div>
    <div class="station-realtime-power">
      <!-- zdssgl: '站点实时功率', -->
      <title-column :title="t(`${tHead}.zdssgl`)" />
      <EcResize class="realtime-ec" :option="state.lianhuaRealtimeOptions" />
      <!-- <EcResize :option="state.lianhuaRealtimeOptions" :style="{ height: '2.3rem' }" /> -->
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue';
import {
  lianhuaPowerFun,
  lianhuaWarnFun,
  deviceInfoFun,
  lianhuaWarnOption,
  lianhuaRealtimeOption,
  lianhuajingguiData,
  pageNumLianhuaxiFun
} from '../config.js';
import EcResize from '@sutpc/vue3-ec-resize';
import Lianhuajinggui from './lianhuajinggui.vue';
import { useI18n } from 'vue-i18n';
import TooltipOver from '@/components/tooltip-over.vue';
const { t } = useI18n();
const tHead = `station-detail.components.lianhuaxi`;
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
const pageNumData = ref(pageNumLianhuaxiFun());

const lianhuaWarnColor = ['#FF6B4B'];

const infoListFun = (data?: Data) => {
  return [
    {
      label: '业主单位：',
      value: '深圳市地铁集团有限公司' || '--',
      displayLabel: t(`${tHead}.infoListFun.yzdw`),
      displayValue: t(`${tHead}.infoListFun.yzdwValue`)
    },
    {
      label: '具体地址：',
      value: '广东省深圳市福田区轨道交通10号线工程-主…' || '--',
      displayLabel: t(`${tHead}.infoListFun.jtdz`),
      displayValue: t(`${tHead}.infoListFun.jtdzValue`)
    },
    {
      label: '站点区域：',
      value: '福田区' || '--',
      displayLabel: t(`${tHead}.infoListFun.zdqy`),
      displayValue: t(`${tHead}.infoListFun.zdqyValue`)
    },
    {
      label: '并网情况：',
      value: '已并网' || '--',
      displayLabel: t(`${tHead}.infoListFun.bwqk`),
      displayValue: t(`${tHead}.infoListFun.bwqkValue`)
    },
    {
      label: '联系方式：',
      value: '13682341234' || '--',
      displayLabel: t(`${tHead}.infoListFun.lxfs`),
      displayValue: t(`${tHead}.infoListFun.lxfsValue`)
    }
  ];
};
// lianhuaWarnFun();
const state = reactive({
  infoListData: infoListFun(),
  lianhuaPower: lianhuaPowerFun(),
  lianhuaWarn: lianhuaWarnFun(),
  lianhuaWarnOptions: lianhuaWarnOption,
  lianhuaRealtimeOptions: lianhuaRealtimeOption(),
  deviceInfoData: deviceInfoFun()
});
onMounted(() => {
  const warnChartData = lianhuaWarnFun();
  state.lianhuaWarnOptions.xAxis.data = warnChartData.xAxis;
  state.lianhuaWarnOptions.series = warnChartData.seriesData;
});
</script>

<style lang="less" scoped>
.station-info {
  margin-top: 12px;
}

.info {
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
        font-weight: 500;
        font-size: 20px;
        line-height: 32px;
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

      &:nth-last-of-type(1) {
        margin-bottom: 0;
      }
    }

    label {
      color: rgba(238, 253, 255, 0.6);
      min-width: 70px;
      white-space: nowrap; /* 禁止文字换行 */
      overflow: hidden; /* 超出容器宽度时隐藏内容 */
      text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
      display: inline-block;
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

.today-power-info {
  .num-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;

    :deep(.num-card) {
      width: 49%;
      padding: 24px 0 18px;
      background: linear-gradient(
        258.38deg,
        rgba(37, 177, 255, 0.1) 2.46%,
        rgba(37, 177, 255, 0) 100%
      );
      mix-blend-mode: normal;
      box-shadow: inset 0px 0px 35px rgba(41, 76, 179, 0.2);
      filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.04));
      border-radius: 2px;
      justify-content: center;

      .info {
        flex-direction: column;

        .name {
          margin-bottom: 0;
        }
      }
    }
  }
}

.guijing-com-status {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  @{deep} {
    .charging-wrap {
      flex: 1;
      height: 0;
    }
  }
}

.station-realtime-power {
  height: 260px;
  display: flex;
  flex-direction: column;
  .realtime-ec {
    flex: 1;
    height: 0;
  }
}
.device-info {
  container-name: deviceInfo;
  container-type: inline-size;
  .num-wrap {
    margin-top: 16px;

    :deep(.num-tile-card) {
      &:nth-of-type(n + 1) {
        margin-top: 12px;
      }
    }
  }
  @container deviceInfo (min-width: 500px) {
    .num-wrap {
      display: flex;
    }
  }
}

:deep(.title-column) {
  margin: 12px 0;
}
.page.page-num-wrap {
  justify-content: space-evenly;
}
.station-warning-message {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  .warning-message-ec {
    flex: 1;
    height: 0;
  }
}
</style>
