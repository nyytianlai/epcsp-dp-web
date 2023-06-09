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
      <li v-for="(item, index) in infoListData" :key="index">
        <label for="">{{ item.label }}</label>
        <span class="value text-ellipsis-1">
          <el-tooltip :content="item.value || ''" placement="top">
            {{ item.value }}
          </el-tooltip>
        </span>
      </li>
    </ul>
    <div class="status" :class="stationStatusClass[props.data.stationStatus]">
      {{ stationStatus[props.data.stationStatus] }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
interface Data {
  stationName: string;
  propertyUnit: string;
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
  }
});

const stationProperty = {
  1: '公用',
  2: '专用'
};
const stationStatus = {
  0: '未知',
  1: '建设中',
  5: '关闭下线',
  6: '维护中',
  50: '正常使用'
};
const stationStatusClass = {
  0: 'gray',
  1: 'yellow',
  5: 'gray',
  6: 'yellow',
  50: 'blue'
};
const stationType = {
  1: '公共',
  50: '个人',
  100: '公交（专用）',
  101: '环卫（专用）',
  102: '物流（专用）',
  103: '出租车（专用）',
  255: '其他'
};
const { data } = toRefs(props);
const infoListFun = (data: Data) => {
  return [
    {
      label: '站点区域：',
      value: data?.areaName || '--'
    },
    {
      label: '具体地址：',
      value: data?.address || '--'
    },
    {
      label: '站点性质：',
      value: stationProperty[data?.stationProperty] || '--'
    },
    {
      label: '站点类型：',
      value: stationType[data?.stationType] || '--'
    },
    {
      label: '负责人：',
      value: data?.stationPrincipal || '--'
    },
    {
      label: '联系方式：',
      value: data?.telephone || '--'
    }
  ];
};
const infoListData = ref();
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
      &:nth-last-of-type(1){
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
</style>
