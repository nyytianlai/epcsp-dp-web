<template>
  <div class="dialog-content">
    <div class="num-wrap">
      <template v-for="(item, index) in chargingStations" :key="index">
        <num-card :data="item" type="left-right" :classStyleType="item.classStyleType" />
      </template>
    </div>
    <div class="bottom-btns">
      <div class="detail" @click="handleDetail"><div class="content">详情</div></div>
      <div class="detail"><div class="content">通知响应</div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { chargingStationsFun } from '../config';
const emits = defineEmits(['handleDetail']);
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});
const chargingStations = ref(chargingStationsFun());
const handleDetail = () => {
  emits('handleDetail');
};

watch(
  () => props.data,
  (val) => {
    const obj = {};
    val?.forEach((item: any) => {
      obj[item.type] = item.cnt;
    });
    chargingStations.value = chargingStationsFun(obj);
  },
  {
    immediate: true,
    deep: true
  }
);
</script>

<style scoped lang="less">
.dialog-content {
  width: 100%;
  height: 100%;
}

.num-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 50px;
  gap: 12px;
  > div {
    min-width: 0;
    min-height: 0;
    background: #375374;
  }

  :deep(.num-card) {
    .info {
      justify-content: center;
    }

    .num {
      line-height: 14px !important;
    }

    .icon {
      width: 54px !important;
      height: auto !important;
    }

    .name {
      line-height: 12px !important;
      margin-bottom: 0;
      font-size: 14px !important;
    }

    .value {
      font-size: 16px !important;
      line-height: 16px !important;
    }
  }
}

.bottom-btns {
  margin-top: 20px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  column-gap: 12px;

  .detail {
    width: 103px;
    height: 38px;
    padding: 3px;
    border-radius: 4px;
    background: url(../images/blue-btn-bgc.png) no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    .content {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(270deg, #0a4174 0%, #3483df 100%);
      border: 1.5px solid #99ceff;
      font-size: 14px;
    }
  }
}
</style>
