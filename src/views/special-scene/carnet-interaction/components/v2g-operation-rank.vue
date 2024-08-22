<template>
  <div class="area-distributed">
    <title-column title="V2G桩数运营商排名" />
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
import Api from '../api.js';
import dayjs from 'dayjs';
const isLoading = ref(false);
const projectTotalNum = ref(0);
const projectList = ref([]);
const getProjectList = async () => {
  isLoading.value = true;
  try {
  } catch (error) {
    projectList.value = [];
  }
  isLoading.value = false;
};
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
