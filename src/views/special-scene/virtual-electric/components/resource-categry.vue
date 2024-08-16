<template>
  <div class="resource-categry">
    <title-column title="资源分布占比" />
    <div class="distributed-content" v-loading="loading">
      <div class="chart-wrapper" v-show="!isEmpty">
        <ec-resize :option="ecOption" />
        <div class="chart-center">
          <div class="data fontSize28DIN">{{ formatWithToLocalString(total) }}</div>
          <div class="unit">MVA</div>
        </div>
      </div>
      <div class="legend-wrapper" v-show="!isEmpty">
        <div class="legend-item" v-for="(item, index) in pieConfig" :key="item.name">
          <div class="legend-name" :style="`--color: ${item.color}`">
            <el-tooltip placement="top" :content="item.name" v-if="item.name.length > 5">
              {{ item.name.slice(0, 5) }}...
            </el-tooltip>
            <span v-else>{{ item.name }}</span>
          </div>
          <div class="legend-value fontSize16DIN">{{ item.percentVl ?? '--' }}%</div>
        </div>
      </div>
      <no-data v-show="isEmpty" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { scale } from '@sutpc/config';
import { pieColorList } from '../config';
import EcResize, { getEcharts } from '@sutpc/vue3-ec-resize';
import { formatWithToLocalString } from '@/global/commonFun.js';
import Api from '../api';
const loading = ref(true);
const ecOption = ref();
const pieConfig = ref([]);
const isEmpty = computed(() => {
  return !pieConfig.value.length;
});
const total = ref(0);
const getData = async () => {
  loading.value = true;
  try {
    const res = await Api.resourceDistribution();

    pieConfig.value =
      res?.data?.map((item, i) => {
        total.value += Number(item.number || 0);
        return {
          name: item.resourceType?.replaceAll(' ', ''),
          value: item.number,
          percentVl: item.proportion,
          color: pieColorList[i] ? pieColorList[i] : pieColorList[i % pieColorList.length]
        };
      }) || [];
    drawChart(pieConfig.value);
  } catch (error) {}
  loading.value = false;
};

const drawChart = async (data = []) => {
  await getEcharts();
  const option = {
    tooltip: {
      show: true,
      confine: true,
      borderColor: 'transparent',
      backgroundColor: 'rgba(9, 41, 75, 0.8)',
      borderWidth: 0,
      formatter: (param) => {
        return `
              <div class="tooltip-wrapper">
                <div class="circle" style="background-color: ${param.color}"></div>
                <div class="tip-name">${param.name}</div>
                <div class="tip-data">${formatWithToLocalString(param.value) ?? '--'}个（${
          param?.data?.percentVl ?? '--'
        }%）</div>
              </div>
            `;
      }
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['55%', '80%'],
        data: data.map((item, i) => ({
          name: item.name,
          color: pieColorList[i],
          itemStyle: {
            color: pieColorList[i]
          },
          value: item.value,
          percentVl: item.percentVl
        })),
        label: {
          show: false
        }
      }
    ]
  };
  ecOption.value = option;
};
onMounted(() => {
  getData();
});
</script>

<style scoped lang="less">
.resource-categry {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .distributed-content {
    flex: 1;
    min-height: 0;
    border-radius: 4px;
    display: flex;
    flex-flow: row nowrap;

    .chart-wrapper {
      flex: 0 0 180px;
      position: relative;

      .chart-center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        row-gap: 4px;
        pointer-events: none;

        .data {
          color: #fff;
        }

        .unit {
          font-size: 14px;
          color: #fff;
        }
      }
    }

    .legend-wrapper {
      padding: 18px 0;
      flex: 1;
      min-width: 0;
      display: flex;
      flex-flow: column wrap;
      row-gap: 10px;
      overflow-y: auto;

      .legend-item {
        display: flex;
        flex-flow: column nowrap;
        row-gap: 2px;
      }

      .legend-name {
        padding-left: 12px;
        font-size: 12px;
        color: #fff;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color);
        }
      }

      .legend-value {
        padding-left: 12px;
        color: #fff;
      }
    }

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );
  }
  :deep(.tooltip-wrapper) {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    .circle {
      width: 10px;
      height: 10px;
      flex: 0 0 10px;
      border-radius: 50%;
      margin-right: 4px;
    }

    .tip-name {
      font-size: 16px;
      color: #fff;
      font-weight: 400;
      margin-left: 2px;
    }

    .tip-data {
      margin-left: 20px;
      font-size: 16px;
      color: #fff;
      font-weight: 900;
    }
  }
}
</style>
