<template>
  <div class="dialog-content">
    <div class="num-wrap">
      <div class="card-item" v-for="(item, index) in chargingStations" :key="index">
        <img :src="item.img" />
        <div class="info">
          <div class="name">
            <template v-for="(child, i) in item.children" :key="child.name">
              {{ child.name
              }}{{ item.children.length > 1 && i < item.children.length - 1 ? '/' : '' }}
            </template>
          </div>
          <div class="num fontSize18DIN">
            <template v-for="(child, i) in item.children" :key="child.name">
              {{ child.num ?? '--' }}
              <span class="pingfangsc">{{ child.unit }}</span>
              {{ item.children.length > 1 && i < item.children.length - 1 ? ' /' : '' }}
            </template>
          </div>
        </div>
      </div>
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

  .card-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 8px 8px 0;

    .name {
      font-size: 14px;
      margin-top: -8px;
    }

    .num {
      display: flex;
      flex-flow: row nowrap;
      font-weight: 700;
      color: #00f7ff;
      line-height: 16px;
      align-items: baseline;
      margin-top: 4px;

      span {
        font-weight: 400;
        font-size: 14px;
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
