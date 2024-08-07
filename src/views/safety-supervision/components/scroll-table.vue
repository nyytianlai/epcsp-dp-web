<template>
  <el-table
    style="width: 100%; height: 3.44rem"
    :autoScroll="false"
    :interval="5000"
    :data="scrollTableData"
    :highlight-current-row="false"
    v-model="currentIndex"
    @current-change="currentChange"
    class="custom-table"
  >
    <el-table-column
      v-for="(item, index) in columnKeyList"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :min-width="item.width"
      :align="item.align"
      :show-overflow-tooltip="true"
      :formatter="tableColumnFun"
    ></el-table-column>
    <template #empty>
      <no-data />
    </template>
  </el-table>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue';
import { tableColumnFun } from '@/global/commonFun.js';
const props = defineProps({
  scrollTableData: {
    type: Array,
    default: () => {
      return [];
    }
  },
  columnKeyList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});
let currentIndex = ref(0);
let currentChange = (row) => {
  // 这里是选中的那一行数据
};
</script>

<style lang="less" scoped>
:deep(.el-scrollbar__view) {
  height: 100%;
}
</style>
