<template>
  <panel>
    <div class="station-info">
      <title-column title="站点基本信息" icon="car" />
      <div class="info">
        <div class="name-wrap">
          <div class="icon"></div>
          <div class="name">
            <span class="station-name">红荔西5G示范站</span>
            <span class="company-name">中国铁塔股份有限公司深圳市分公司</span>
          </div>
        </div>
        <ul class="info-list">
          <li v-for="(item, index) in msgPopList" :key="index">
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
    <div class="battery-msg">
      <title-column title="储能电池信息" icon="car" />
      <div class="num-wrap">
        <template v-for="(item, index) in batteryMsg" :key="index">
          <num-card :data="item" />
        </template>
      </div>
    </div>
    <div class="realtime">
      <title-column title="实时充放情况" icon="car" />
      <EcResize :option="popRealtimeOption()" class="chart" :style="{ height: '2.3rem' }" />
    </div>
  </panel>
</template>
<script lang="ts" setup>
import { ref, inject } from 'vue';
import EcResize from '@sutpc/vue3-ec-resize';
import { msgPopList, batteryMsgFun, popRealtimeOption } from '../config.js';
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
// 储能电池信息
const batteryMsg = ref(batteryMsgFun());
</script>
<style lang="less" scoped>
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
.battery-msg {
  margin-top: 29px;
  container-type: inline-size;
  container-name: batteryMsg;
  @container batteryMsg (min-width: 500px) {
    @{deep} {
      .num-card.top-down {
        flex-direction: row;
      }
    }
  }
  .num-wrap {
    display: flex;
    justify-content: space-between;
    padding: 20px 9px;
    margin-top: 16px;
    background: linear-gradient(
      258.38deg,
      rgba(37, 177, 255, 0.1) 2.46%,
      rgba(37, 177, 255, 0) 100%
    );
    mix-blend-mode: normal;
    box-shadow: inset 0px 0px 35px rgba(41, 76, 179, 0.2);
    filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.04));
    border-radius: 2px;
  }
}
.realtime {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .chart {
    flex: 1;
    height: 0;
    margin-top: 16px;
  }
}
</style>
