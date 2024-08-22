<template>
  <div class="area-distributed">
    <!-- jryxpm: '今日运行排名' -->
    <title-column :title="t(`${tHead}.jryxpm`)" />
    <tabs v-model="selectType" :data="operationRankTabType" />
    <div class="distributed-content" v-loading="isLoading">
      <rank-list
        class="operating-rank__list"
        :data="projectList"
        :totalNum="projectTotalNum"
        height="100%"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { operationRankTabType } from '../config.js';
import Api from '../api.js';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `special-scene.super-charging-building.components`;

const isLoading = ref(false);
const projectTotalNum = ref(0);
const selectType = ref(operationRankTabType[0].code);
const projectList = ref([]);
const getProjectList = async () => {
  isLoading.value = true;
  try {
    const method = Api[selectType.value];
    const nameCode = selectType.value === 'getStationChargeStat' ? 'stationName' : 'operatorName';
    if (!method) return;
    const res = await method({
      startTime: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      endTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      limitSize: 10
    });
    projectTotalNum.value = Math.max(...res.data.map((item) => +item.chargeCapacity));
    projectList.value = res?.data?.map((item) => {
      return {
        name: item[nameCode],
        unit: 'kWh',
        num: item.chargeCapacity
      };
    });
  } catch (error) {
    projectList.value = [];
  }
  isLoading.value = false;
};
watch(() => selectType.value, getProjectList, {
  immediate: true,
  deep: true
});
</script>

<style scoped lang="less">
.area-distributed {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .distributed-content {
    flex: 1;
    min-height: 0;
    border-radius: 4px;

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );

    .operating-rank__list {
      width: 100%;
      height: 100%;
      padding-left: 12px;
    }
  }
}
</style>
