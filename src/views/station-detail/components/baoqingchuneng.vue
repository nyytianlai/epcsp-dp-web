<template>
  <page-num :data="pageNumData" class="page" />
  <panel>
    <div class="station-info">
      <!-- 站点基本信息 zdjbxx: '站点基本信息' -->
      <title-column :title="t(`${tHead}.zdjbxx`)" icon="car" />
      <div class="info">
        <div class="name-wrap">
          <div class="icon"></div>
          <div class="name">
            <!-- stationName: '南方电网深圳宝清储能电站' -->
            <span class="station-name">{{t(`${tHead}.stationName`)}}</span>
            <!-- companyName: 'ID:1928479400029287' -->
            <span class="company-name">{{t(`${tHead}.companyName`)}}</span>
          </div>
        </div>
        <ul class="info-list">
          <li v-for="(item, index) in infoListData()" :key="index">
            <label for="">{{ item.displayLabel || item.label }}</label>
            <span class="value text-ellipsis-1" v-if="item.label !== '具体地址：'">
              {{ item.displayValue || item.value }}
            </span>
            <span class="value text-ellipsis-1" v-else>
              <el-tooltip :content="item.displayValue ||item.value || ''" placement="top">
                {{ item.displayValue || item.value }}
              </el-tooltip>
            </span>
          </li>
        </ul>
        <!-- normal: '正常' -->
        <div class="status blue">{{t(`${tHead}.normal`)}}</div>
      </div>
    </div>
    <div class="station-data">
      <!-- zdsjxx: '站点数据信息' -->
      <title-column :title="t(`${tHead}.zdsjxx`)" icon="car" />
      <div class="num-wrap">
        <template v-for="(item, index) in runingData" :key="index">
          <num-card :data="item" type="left-right" classStyleType="leftRightStyle1" />
        </template>
      </div>
    </div>
    <div class="warn-data">
      <!-- gjxx: '告警信息' -->
      <title-column :title="t(`${tHead}.gjxx`)" icon="car" />
      <div class="warn-list-box" v-for="(item, index) in warnList" :key="index">
        <div class="warn-date">{{ dayjs(item.date).format('MM/DD/YYYY') }}</div>
        <warning-list :data="item.data" class="warn-child-list" />
      </div>
    </div>
  </panel>
  <panel type="right">
    <div class="system-status-box">
      <!-- cnfxtzt: '储能分系统状态' -->
      <title-column :title="t(`${tHead}.cnfxtzt`)" icon="car" />
      <BaoqingSystemStatus
        :data="baoqingSytemStatusData"
        class="system-status"
        @card-click="handleCardClick"
      />
    </div>
    <div class="realTime">
      <!-- sscfqk: '实时充放情况' -->
      <title-column :title="t(`${tHead}.sscfqk`)" icon="car" />
      <EcResize :option="baoqingRealtimeOption()" class="chart" />
    </div>
  </panel>
  <BaoqingChild
    v-if="showChild"
    @back="
      () => {
        showChild = false;
      }
    "
  />
</template>
<script lang="ts" setup>
import EcResize from '@sutpc/vue3-ec-resize';
import { reactive, onMounted, ref } from 'vue';
import BaoqingSystemStatus from './baoqing-system-status.vue';
import {
  pageNumBaoqingFun,
  runingFun,
  warnList,
  baoqingSytemStatusData,
  baoqingRealtimeOption
} from '../config';
import dayjs from 'dayjs';
import BaoqingChild from './baoqing-child.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `station-detail.components.baoqingchuneng`;
const pageNumData = ref(pageNumBaoqingFun());
const showChild = ref(false);
// 站点基本信息

const infoListData = (data = {}) => {
  return [
    {
      label: '站点设计容量：',
      value: '10MW/22MWh' || '--',
      displayLabel: t(`${tHead}.infoListData.zdsjrl`),
    },
    {
      label: '站点占地面积：',
      value: '12000平方米' || '--',
      displayLabel: t(`${tHead}.infoListData.zdzdmj`),
      displayValue: t(`${tHead}.infoListData.zdzdmjValue`),
    },
    {
      label: '具体地址：',
      value: '深圳市龙岗区清风大道27号' || '--',
      displayLabel: t(`${tHead}.infoListData.jtdz`),
      displayValue: t(`${tHead}.infoListData.jtdzValue`),
    },
    {
      label: '运营商：',
      value: '深圳市南方电网有限公司' || '--',
      displayLabel: t(`${tHead}.infoListData.yys`),
      displayValue: t(`${tHead}.infoListData.yysValue`),
    },
    {
      label: '负责人：',
      value: '张小辉' || '--',
      displayLabel: t(`${tHead}.infoListData.fzr`),
      displayValue: t(`${tHead}.infoListData.fzrValue`),
    },
    {
      label: '联系方式：',
      value: '010-2891029839' || '--',
      displayLabel: t(`${tHead}.infoListData.lxfs`),
      displayValue: t(`${tHead}.infoListData.lxfsValue`),
    }
  ];
};
// 数据站点信息
const runingData = ref(runingFun());

//卡片点击
const handleCardClick = (item) => {
  showChild.value = true;
};
</script>
<style lang="less" scoped>
.page {
  :deep(.num-wrap) {
    &:nth-last-of-type(1) {
      .name {
        color: #f9e900;
      }
    }
  }
}

.station-info {
  .info {
    margin-top: 16px;
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
}

.station-data {
  margin-top: 20px;

  .num-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;

    :deep(.num-card.left-right) {
      .icon {
        margin-right: 5px;
      }

      .num {
        flex-direction: column;

        .value {
          font-size: 36px;
          font-weight: bold;
          padding-left: 3px;
        }
      }
    }

    .num-card {
      width: 50%;
      margin-bottom: 20px;

      &:nth-last-of-type(1),
      &:nth-last-of-type(2) {
        margin-bottom: 0;
      }
    }
  }
}

.warn-data {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  .warn-list-box {
    flex: 1;
    height: 0;
    display: flex;
    flex-direction: column;
    margin-top: 16px;

    .warn-date {
      font-family: 'DIN Condensed';
      font-weight: bold;
      font-size: 20px;
    }
  }
  .warn-child-list {
    margin-top: 8px;
    flex: 1;
    height: 0;
  }
}
.system-status {
  flex: 1;
  height: 0;
  // height: 550px;
}
.realTime {
  height: 260px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .chart {
    flex: 1;
    height: 0;
    margin-top: 14px;
  }
}
.system-status-box {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
}
</style>
