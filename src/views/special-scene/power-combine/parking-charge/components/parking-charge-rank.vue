<template>
  <div class="parking-charge-rank">
    <!-- tcythtccpm: '停充一体化停车场排名' -->
    <title-column :title="t(`${tHead}.tcythtccpm`)" />
    <div class="legend">
      <div
        class="legend-item"
        v-for="item in legend"
        :key="item.name"
        :style="`--color:${item.color}`"
      >
        {{ item.displayName || item.name }}
      </div>
    </div>
    <div class="distributed-content" v-loading="loading">
      <div
        class="rank-list-item"
        ref="refList"
        v-for="(item, i) in rankData"
        :key="item.stationName"
        @mouseover="handleOver(i, item)"
        @mouseleave="handleLeave"
      >
        <div class="rank-info">
          <div class="rank-index">{{ i + 1 }}</div>
          <div class="rank-name">{{ item.stationName }}</div>
          <div class="rank-data">
            {{ item.stopChargeRatio ?? '--' }}
          </div>
        </div>
        <div class="rank-bar">
          <div
            class="bar-item"
            v-for="legendItem in legend"
            :key="legendItem.name"
            :style="{ flex: item[legendItem.code] ?? 0, backgroundColor: legendItem.color }"
          ></div>
        </div>
      </div>
      <no-data v-if="!rankData.length" />
    </div>
    <el-popover
      v-if="triggerRef"
      placement="top"
      effect="dark"
      ref="popoverRef"
      :virtual-ref="triggerRef"
      trigger="hover"
      virtual-triggering
      :teleported="false"
      popper-class="rank-popover"
    >
      <div class="data-tip">
        <!-- tcws: '停车位数' -->
        {{t(`${tHead}.tcws`)}}
        <span :style="{ color: legend[0].color }">{{ popoverData[legend[0].code] }}</span>
      </div>
      <div class="data-tip">
        <!-- cdqs: '充电枪数' -->
        {{t(`${tHead}.cdqs`)}}
        <span :style="{ color: legend[1].color }">{{ popoverData[legend[1].code] }}</span>
      </div>
      <div class="data-tip">
        <!-- tcpb: '停充配比' -->
        {{t(`${tHead}.tcpb`)}}
        <span>{{ popoverData.stopChargeRatio ?? '--' }}</span>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Api from '../api';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `special-scene.power-combine.components.parking-charge-rank`;

const loading = ref(true);
const triggerRef = ref();
const popoverData = ref<any>({});
const refList = ref([]);
const rankData = ref<any>([]);

const legend = [
  {
    name: '车位',
    code: 'totalParkingSpace',
    color: 'rgb(34, 118, 252)',
    displayName: t(`${tHead}.legend.totalParkingSpace`)
  },
  {
    name: '充电枪',
    code: 'totalGun',
    color: 'rgb(0, 212, 212)',
    displayName: t(`${tHead}.legend.totalGun`)
  }
];

const handleOver = (i, item) => {
  triggerRef.value = refList.value[i];
  popoverData.value = item;
};

const handleLeave = () => {
  triggerRef.value = null;
};

const getData = async () => {
  loading.value = true;
  try {
    const res = await Api.parkChargingRank();
    rankData.value = res.data || [];
  } catch (error) {}
  loading.value = false;
};
getData();
</script>

<style scoped lang="less">
.parking-charge-rank {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;
  position: relative;

  .legend {
    position: absolute;
    right: 0;
    top: 16px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: fit-content;
    column-gap: 12px;
    .legend-item {
      padding-left: 12px;
      position: relative;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.85);
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: var(--color);
      }
    }
  }

  .distributed-content {
    flex: 1;
    min-height: 0;
    border-radius: 4px;
    display: flex;
    flex-flow: column nowrap;
    row-gap: 12px;
    overflow-y: auto;

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    // background: linear-gradient(
    //   219.05deg,
    //   rgba(37, 177, 255, 0.02) 16.882%,
    //   rgba(37, 177, 255, 0.2) 100%
    // );
  }

  .rank-list-item {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    row-gap: 4px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .rank-info {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      column-gap: 4px;
    }

    .rank-index {
      width: 24px;
      height: 22px;
      background-color: rgba(75, 222, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
    }

    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(3) {
      .rank-index {
        border: solid 1px;
        border-image: linear-gradient(to right, rgb(30, 231, 231), rgb(24, 144, 255)) 1 1;
        background-color: transparent;
      }
    }

    .rank-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      color: rgb(255, 255, 255);
    }

    .rank-data {
      font-size: 14px;
      font-weight: 400;
      color: #fff;
    }

    .rank-bar {
      width: 100%;
      height: 10px;
      display: flex;
      flex-flow: row nowrap;
      > div {
        height: 100%;
      }
    }
  }

  :deep(.rank-popover) {
    padding: 10px 12px;
    .data-tip {
      display: flex;
      flex-flow: row nowrap;
      column-gap: 10px;
      font-size: 12px;
      color: rgb(255, 255, 255);
      align-items: center;
      span {
        font-size: 18px;
      }
    }
  }
}
</style>
