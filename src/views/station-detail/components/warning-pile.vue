<template>
    <div class="warning-pile">
        <div class="safe-level">
            <icon icon="svg-icon:warning" />
            <span>二级设备安全</span>
        </div>
        <ul class="device-info">
            <li class="list-item" v-for="(item,index) in listData" :key="index">
                <label for="">{{ item.label }}</label>
                <span class="value">{{ item.value }}</span>
            </li>
        </ul>
        <div class="btns-wrap">
            <div class='border-bg red'>
                <div class='content'>
                    一键断电
                </div>
            </div>
            <div class='border-bg blue'>
                <div class='content'>
                    一键断电
                </div>
            </div>
            <div class='border-bg blue'>
                <div class='content'>
                    一键断电
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import Icon from '@sutpc/vue3-svg-icon';
const listDataFun = ()=>{
    return [
        {
            label:'设备名称：',
            value:'#103直流桩'
        },
        {
            label:'设备类型：',
            value:'直流桩'
        },
        {
            label:'设备编号：',
            value:'12938749490001938'
        },
        {
            label:'设备接口编码：',
            value:'29102093819'
        },
        {
            label:'告警类型：',
            value:'充电系统故障'
        },
        {
            label:'告警描述：',
            value:'急停'
        },
        {
            label:'告警时间：',
            value:'2013-03-14 09:09:56'
        },
        {
            label:'上报时间：',
            value:'2013-03-14 09:09:58'
        },
        {
            label:'确认结果：',
            value:'未确认'
        },
        {
            label:'负责人电话：',
            value:'181838806'
        },
    ]
}
const listData = ref(listDataFun())
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
  justify-content: space-between;
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
      background: url(./images/red-btn-bgc.png) no-repeat;
      background-size: 100% 100%;
    }
    &.blue {
      background: url(./images/blue-btn-bgc.png) no-repeat;
      background-size: 100% 100%;
      .content {
        background: linear-gradient(270deg, #0a4174 0%, #3483df 100%);
        border: 1.5px solid #99ceff;
      }
    }
  }
}
</style>