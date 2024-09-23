<template>
  <div class="dialog-content">
    <div class="num-wrap">
      <!-- <div class="card-item" v-for="(item, index) in (data as any)?.v2gBusList" :key="index">
        <img :src="ztsyl" />
        <div class="info">
          <div class="name">
            {{ item.plateNum }}
          </div>
          <div class="row">
            <label>剩余电量</label>
            <div class="value fontSize18DIN">{{ item.soc }}%</div>
          </div>
        </div>
      </div> -->
      <div class="card-item">
        <img :src="ztsyl" />
        <div class="info">
          <div class="row">
            <label>停靠巴士数量</label>
            <div class="value fontSize18DIN">{{ Math.ceil(Math.random() * 60) + 40 }}</div>
          </div>
          <!-- <div class="row">
            <label>V2G巴士剩余电量</label>
            <div class="value fontSize18DIN">{{ item.soc }}%</div>
          </div> -->
        </div>
      </div>
      <div class="card-item">
        <img :src="ztsyl" />
        <div class="info">
          <div class="row">
            <label>停靠V2G巴士数量</label>
            <div class="value fontSize18DIN">{{ Math.ceil(Math.random() * 40) }}</div>
          </div>
          <div class="row">
            <label>V2G巴士剩余电量</label>
            <div class="value fontSize18DIN">{{ Math.ceil(Math.random() * 70) }}%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-btns">
      <div class="detail" @click="handleDetail"><div class="content">放电路线推荐</div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { chargingStationsFun } from '../config';
import ztsyl from '@/views/charging-station/images/ztsyl.png';
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
    // chargingStations.value = chargingStationsFun(props.data);
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
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 60px;
  gap: 12px;
  > div {
    min-width: 0;
    min-height: 0;
    background: #375374;
  }

  .card-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 8px;
    row-gap: 4px;

    .name {
      font-size: 14px;
      margin-top: -8px;
    }

    .row {
      display: flex;
      flex-flow: row nowrap;
      white-space: nowrap;

      span {
        font-weight: 400;
        font-size: 14px;
      }

      label {
        margin-right: 4px;
      }

      .value {
        display: flex;
        flex-flow: row nowrap;
        font-weight: 700;
        color: #00f7ff;
        line-height: 16px;
        align-items: baseline;
      }
    }

    img {
      width: 52px;
      margin-right: 4px;
    }
  }
}

.bottom-btns {
  margin-top: 20px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  // justify-content: flex-end;
  justify-content: center;
  column-gap: 12px;
  margin-bottom: 12px;

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
