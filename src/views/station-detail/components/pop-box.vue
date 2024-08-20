<template>
  <div class="pop-box">
    <header>
      <div class="header-left">
        <icon icon="svg-icon:5g" class="pop-icon" />
        <!-- hlx5gsfz: '红荔西5G示范站', -->
        <div class="left-name">{{t(`${tHead}.hlx5gsfz`)}}</div>
      </div>
      <div class="header-right" @click="handleClose">x</div>
    </header>
    <div class="msg">
      <div class="msg-list" v-for="(item, index) in msgPopList" :key="index">
        <span class="label">{{ item.displayLabel || item.label }}：</span>
        <span class="value">{{ item.displayValue || item.value }}</span>
      </div>
    </div>
    <div class="battery-msg">
      <!-- cndcxx: '储能电池信息', -->
      <div class="title">{{t(`${tHead}.cndcxx`)}}</div>
      <div class="warn-top">
        <icon icon="svg-icon:pop-warn" class="pop-icon" />
        <!-- zdzdfdl: '站点最大放电量', -->
        <span class="text">{{t(`${tHead}.zdzdfdl`)}}</span>
        <span class="num">9.6 <span class="unit">kWh</span></span>
      </div>
      <div class="warn-bottom">
        <div class="warn-item" v-for="(item, index) in warnBottomList" :key="index">
          <icon icon="svg-icon:pop-warn" class="pop-icon" />
          <div class="right">
            <div class="text">{{ item.displayName || item.name }}</div>
            <div class="num">{{ item.num }} <span class="unit">{{ item.unit }}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="realtime">
      <!-- zdsscfqk: '站点实时充放情况', -->
      <div class="title">{{t(`${tHead}.zdsscfqk`)}}</div>
      <EcResize :option="popRealtimeOption" class="chart" :style="{ height: '1.7rem' }" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import EcResize from '@sutpc/vue3-ec-resize';

import Icon from '@sutpc/vue3-svg-icon'
import { msgPopList, popRealtimeOption } from '../config'
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `station-detail.components.pop-box`;

const emit = defineEmits(['close']);
const warnBottomList = ref([
  {
    name: '放电电压',
    num: '48/57',
    unit: 'v',
    displayName: t(`${tHead}.warnBottomList.fddy`)
  },
  {
    name: '充电电压',
    num: '56.4',
    unit: 'v',
    displayName: t(`${tHead}.warnBottomList.cddy`)
  }
])
const handleClose = ()=>{
  emit('close')
}
</script>
<style lang="less" scoped>
.pop-box {
  background: rgba(18, 40, 73, 0.9);
  box-shadow: inset 0px 0px 16px rgba(10, 167, 255, 0.8);
  width: 400px;
  height: 670px;
  position: absolute;
  transform: translateY(-50%);
  z-index: 99;
}

header {
  margin: 12px;
  display: flex;
  justify-content: space-between;

  border-bottom: 2px solid rgba(26, 172, 255, 0.15);

  .header-left {
    display: flex;
    align-items: center;
    font-family: 'PingFang SC';
    font-weight: 500;
    font-size: 16px;
    color: #C0E5FF;

    .pop-icon {
      margin-right: 9px;

    }
  }

  .header-right {
    color: #C0E5FF;
    font-size: 24px;
    cursor: pointer;
  }

}

.msg {
  padding: 0 12px;

  .msg-list {
    margin-top: 14px;
    font-weight: 400;
    font-size: 14px;

    .label {
      color: rgba(238, 253, 255, 0.6);
    }

    .value {
      color: #FFFFFF;
    }
  }
}

.battery-msg {
  margin-top: 24px;

  .warn-top {
    margin-left: 16px;
    margin-right: 16px;
    width: 368px;
    height: 71px;
    background: rgba(55, 83, 116, 0.5);
    padding: 18px 12px;
    margin-top: 16px;
    display: flex;
    align-items: center;
    .text {
      margin-left: 25px;
    }
    .num {
      margin-left: 60px;
    }
  }
  .warn-bottom {
    margin-top: 10px;
    display: flex;
    margin-left: 6px;
    .warn-item {
      width: 181px;
      margin-left: 6px;
      display: flex;
      background: rgba(55, 83, 116, 0.5);
      padding: 18px 12px;
    }
  }
}

.realtime {
  margin-top: 20px;
  .chart {
    margin-top: 16px;
  }
}
.pop-icon {
  font-size: 48px;
}

.title {

  padding-left: 16px;
  font-weight: 600;
  font-family: 'PingFang SC';
  font-size: 16px;
  color: #FFFFFF;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  background: linear-gradient(90deg, #2CB6D6 0%, rgba(44, 182, 214, 0) 96.32%);
}

.text {
  color: #FFFFFF;
  font-weight: 400;
  font-size: 14px;
}

.num {
  color: #00FFF9;

  font-family: 'DIN Alternate';
  font-weight: 700;
  font-size: 24px;
  text-shadow: 0px 2px 10px rgba(75, 222, 255, 0.5);
}

.unit {
  color: #00FFF9;
  font-weight: 400;
  font-size: 14px;
}</style>