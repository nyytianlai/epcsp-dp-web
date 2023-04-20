<template>
    <div class="station-info">
        <div class="name-wrap">
            <div class="icon"></div>
            <div class="name">
                <span class="station-name">
                    {{ data?.stationName || '--' }}
                </span>
                <span class="company-name">
                    {{ data?.propertyUnit || '--' }}
                </span>
            </div>
        </div>
        <ul class="info-list">
            <li v-for="(item,index) in infoListData" :key="index">
                <label for="">{{item.label}}</label>
                <span class="value"> {{item.value}}</span>
            </li>    
        </ul>
    </div>
</template>
<script setup>
import { ref, onMounted,toRefs,watch } from 'vue';
const props = defineProps({
  data: {
    type: Object,
    default:{}
  }
})
const {data} = toRefs(props)
const infoListFun = (data={}) => {
    return [
        {
            label: '具体地址：',
            value:data?.address || '--'
        },
        {
            label: '站点区域：',
            value:data?.areaName || '--'
        },
        {
            label: '负责人：',
            value:data?.stationPrincipal || '--'
        },
        {
            label: '联系方式：',
            value:data?.telephone || '--'
        },
    ]
}
const infoListData = ref(infoListFun())
watch(data, () => {
  infoListData.value = infoListFun(data.value)
})
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
  padding: 18px 20px 20px;
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
    }
    label {
      color: rgba(238, 253, 255, 0.6);
      min-width: 70px;
    }
  }
}
</style>