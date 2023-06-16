<template>
  <page-num :data="pageNumData" class="page" />
  <panel>
    <div class="station-info">
      <title-column title="站点基本信息" icon="car" />
      <div class="info">
        <div class="name-wrap">
          <div class="icon"></div>
          <div class="name">
            <span class="station-name">南方电网深圳宝清储能电站</span>
            <span class="company-name">ID:1928479400029287</span>
          </div>
        </div>
        <ul class="info-list">
          <li v-for="(item, index) in infoListData()" :key="index">
            <label for="">{{ item.label }}</label>
            <span class="value text-ellipsis-1" v-if="item.label !== '具体地址：'">
              {{ item.value }}
            </span>
            <span class="value text-ellipsis-1" v-else>
              <el-tooltip :content="item.value || ''" placement="top">
                {{ item.value }}
              </el-tooltip>
            </span>
          </li>
        </ul>
        <div class="status blue">正常</div>
      </div>
    </div>
    <div class="station-data">
      <title-column title="站点数据信息" icon="car" />
      <div class="num-wrap">
        <template v-for="(item, index) in runingData" :key="index">
          <num-card :data="item" type="left-right" classStyleType="leftRightStyle1" />
        </template>
      </div>
    </div>
    <div class="warn-data">
      <title-column title="告警信息" icon="car" />
      <div class="warn-list-box" v-for="(item, index) in warnList" :key="index">
        <div class="warn-date">{{ dayjs(item.date).format('MM/DD/YYYY') }}</div>
        <warning-list :data="item.data" class="warn-child-list" height="2.48rem" />
      </div>
    </div>
  </panel>
  <panel type="right">
    <div class="system-status-box">
      <title-column title="储能分系统状态" icon="car" />
      <BaoqingSystemStatus
        :data="baoqingSytemStatusData"
        class="system-status"
        @card-click="handleCardClick"
      />
    </div>
    <div class="realTime">
      <title-column title="实时充放情况" icon="car" />
      <EcResize :option="baoqingRealtimeOption" class="chart" :style="{ height: '2.3rem' }" />
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
const pageNumData = ref(pageNumBaoqingFun());
const showChild = ref(false);
// 站点基本信息
const infoListData = (data = {}) => {
  return [
    {
      label: '站点设计容量：',
      value: '10MW/22MWh' || '--'
    },
    {
      label: '站点占地面积：',
      value: '12000平方米' || '--'
    },
    {
      label: '具体地址：',
      value: '深圳市龙岗区清风大道27号' || '--'
    },
    {
      label: '运营商：',
      value: '深圳市南方电网有限公司' || '--'
    },
    {
      label: '负责人：',
      value: '张小辉' || '--'
    },
    {
      label: '联系方式：',
      value: '010-2891029839' || '--'
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
  .warn-list-box {
    margin-top: 16px;

    .warn-date {
      font-family: 'DIN Condensed';
      font-weight: bold;
      font-size: 20px;
    }
  }
  .warn-child-list {
    margin-top: 8px;
  }
}
.system-status {
  height: 550px;
}
.realTime {
  margin-top: 20px;
  .chart {
    margin-top: 14px;
  }
}
</style>
