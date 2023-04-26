<template>
  <div class="active-message">
    <el-tabs v-model="activeName" class="beveled-tabs" @tab-click="handleClick">
      <el-tab-pane name="first">
        <template #label>
          <span class="custom-tabs-label">
            <span>充电桩</span>
          </span>
        </template>
      </el-tab-pane>
      <el-tab-pane label="Config" name="second">
        <template #label>
          <span class="custom-tabs-label">
            <span>#01充电枪</span>
            <span class="status normal">正常</span>
          </span>
        </template>
      </el-tab-pane>
      <el-tab-pane label="Role" name="third">
        <template #label>
          <span class="custom-tabs-label">
            <span>#02充电枪</span>
            <span class="status warning">故障</span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <ul class="info-content">
        <li class="info-item" v-for="(item,index) in infoList" :key="index">
            <icon :icon="`svg-icon:${item.icon}`" />
            <div class="right">
                <span class="name">{{item.name}}</span>
                <span class="num">
                    <span class="value">{{item.value}}</span>&nbsp;
                    <span class="unit">{{item.unit}}</span>
                </span>
            </div>
        </li>
    </ul>
    <line-time-chart
        unit="KW"
        :data="linePowerData"
        :colors="['#00FFF9']"
        :chartStyle="{ height: '1.8rem' }"
        :customOption="customOption"
      />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import type { TabsPaneContext } from 'element-plus';
import dayjs from 'dayjs'
const activeName = ref('first');
const customOption = {
    grid: {
        left: '6%',
        right: 10
    }
}
const infoListFun = () => {
    return [
        {
            icon: 'cdl',
            name: '充电量',
            value: '924',
            unit:'kw/h'
        },
        {
            icon: 'fdl',
            name: '放电量',
            value: '924',
            unit:'kw/h'
        },
        {
            icon: 'cdsc',
            name: '充电时长',
            value: '924',
            unit:'h'
        },
        {
            icon: 'cdcs',
            name: '充电次数',
            value: '924',
            unit:'次'
        },
        {
            icon: 'ssgl',
            name: '实时功率',
            value: '924',
            unit:'kw'
        },
        {
            icon: 'gzl',
            name: '故障率',
            value: '924',
            unit:'%'
        },
        {
            icon: 'lyl',
            name: '利用率',
            value: '924',
            unit:'%'
        },
        {
            icon: 'nbwd',
            name: '内部温度',
            value: '924',
            unit:'C⁰'
        }
    ]
}
const infoList = ref(infoListFun())
const linePowerDataFun = (data=[]) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ')
    return [{
        data:data.map(item=>[ yearMonthDay + item.time,item.power]),
        type: 'line',
        smooth: true,
        name:'实时功率'
      }]
}
const linePowerData = ref(linePowerDataFun())
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style lang="less" scoped>
.active-message {
  :deep(.beveled-tabs) {
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__nav {
      width: 100%;
    }
    .el-tabs__item {
      flex: 1;
      background: rgba(84, 181, 255, 0.12);
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      color: #d6f8ff;
      &:nth-child(2){
          clip-path: polygon( 0% 0%, 100% 0%, calc(100% - 20px) 100%,0 100%,0 0);
      }
      &:nth-child(3){
            clip-path: polygon( 20px 0%, 100% 0%, calc(100% - 20px) 100%,0 100%,20px 0);
            flex: 1.05;
            margin-left: -15px;
        }
        &:nth-child(4){
            clip-path: polygon( 20px 0%, 100% 0%, 100% 100%,0 100%,20px 0);
            margin-left: -15px;
            }
    }
    .el-tabs__item.is-active {
      font-size: 18px;
      color: #fff;
      background: rgba(84, 181, 255, 0.4);
    }
    .custom-tabs-label{
        .status{
            background: rgba(0, 255, 143, 0.3);
            border: 1px solid #00FF8F;
            border-radius: 4px;
            padding: 0 6px;
            color: #01FB90;
            font-size: 12px;
            line-height: 20px;
            margin-left: 6px;
            &.warning{
                background: rgba(170, 5, 5, 0.3);
                border: 1px solid #AA0505;
                border-radius: 4px;
                color: #FF6B4B;
            }
        }
    }
  }
  .info-content{
    display: flex;
    flex-wrap: wrap;
    .info-item{
        background: #375374;
        display: flex;
        width: 186px;
        padding: 12px 0 12px 12px;
        margin-right: 12px;
        margin-bottom: 12px;
        align-items: center;
        &:nth-child(4n){
            margin-right: 0;
        }
        .el-icon{
            font-size: 36px;
            margin-right: 12px;
        }
        .right{
            display: flex;
            flex-direction: column;
            .name{
                font-size: 14px;
                line-height: 20px;
            }
            .value{
                font-family: 'DIN Alternate';
                font-style: normal;
                font-weight: 700;
                font-size: 24px;
                line-height: 28px;
                color: #00FFF9;
                text-shadow: 0px 2px 10px rgba(75, 222, 255, 0.5);
            }
            .unit{
                font-size: 14px;
                line-height: 20px;
                color: #00FFF9;
            }
        }
    }
  }
}
</style>
