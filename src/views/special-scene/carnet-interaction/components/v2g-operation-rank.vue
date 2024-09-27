<template>
  <div class="v2g-operation-rank">
    <title-column title="V2G桩数运营商排名" />
    <div class="distributed-content" v-loading="isLoading">
      <rank-list
        class="operating-rank__list"
        :data="rankData"
        :totalNum="projectTotalNum"
        height="100%"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import Api from '../api.js';
import dayjs from 'dayjs';

const isLoading = ref(false);
const projectTotalNum = ref(0);
const rankData = ref([]);
const getrankData = async () => {
  isLoading.value = true;
  try {
    const { data } = await Api.getV2GRankByOperator();
    projectTotalNum.value = Math.max(...data.map((item) => +item.pileNum));
    rankData.value = data?.map((item) => {
      return {
        name: item.operatorName,
        unit: '个',
        num: item.pileNum
      };
    });
  } catch (error) {
    rankData.value = [];
  }
  isLoading.value = false;
};

onMounted(() => {
  getrankData();
});
</script>

<style scoped lang="less">
.v2g-operation-rank {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .distributed-content {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
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
