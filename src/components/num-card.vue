<template>
  <div class="num-card" :class="type">
    <img class="icon" :src="data.img" alt="" />
    <div class="info">
      <span class="num">
        <span class="value">{{ data.num }}</span>
        <span class="unit">{{ data.unit }}</span>
      </span>
      <span class="name">{{ data.name }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Idata {
  img: string;
  name: string;
  num: string | number;
  unit: string;
}
type Itype = 'top-down' | 'left-right';
interface Props {
  data: Idata;
  type: Itype;
}
const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {
      img: '',
      name: '',
      num: '',
      unit: ''
    };
  },
  type: 'top-down'
});
const { data, type } = toRefs(props);
</script>
<style lang="less" scoped>
@import '@/global/style/fontStyle.less';
.num-card {
  display: flex;
  &.top-down {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      width: 82px;
      height: 72px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .num {
        .value {
          .fontSize30DIN;
          font-family: 'PingFang SC';
          line-height: 30px;
          background: linear-gradient(180deg, #0080ff 0%, #ffffff 52.08%, #007cf8 100%), #59ffff;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        .unit {
          font-size: 14px;
        }
      }
      .name {
        font-size: 14px;
        white-space: nowrap;
        color: #c6d1db;
      }
    }
  }
  &.left-right {
    align-items: center;
    .icon {
      width: 61px;
      height: 64px;
      margin-right: 16px;
    }
    .info {
      display: flex;
      flex-direction: column-reverse;
      .name {
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        margin-bottom: 4px;
      }
      .num {
        .fontSize28DIN;
        line-height: 32px;
        color: #00f7ff;
        .unit {
          font-size: 12px;
          line-height: 17px;
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }
}
</style>
