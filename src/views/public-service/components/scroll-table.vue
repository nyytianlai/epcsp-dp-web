<template>
  <ScrollTable
    :style="styleWrap"
    :autoScroll="false"
    :interval="5000"
    :data="data"
    :highlight-current-row="false"
    v-model="currentIndex"
    class="custom-table"
  >
    <el-table-column
      v-for="(item, index) in columnKeyList"
      :key="index"
      :prop="item.prop"
      align="left"
      :label="item.label"
      :min-width="item.width"
      :type="item.type"
      :show-overflow-tooltip="true"
      :formatter="tableColumnFun"
    ></el-table-column>
  </ScrollTable>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue';
import type { CSSProperties } from 'vue';
import ScrollTable from '@sutpc/vue3-scroll-table';
import { tableColumnFun } from '@/global/commonFun.js';
interface Props {
  styleWrap: CSSProperties;
  columnKeyList: any[];
  data: [];
}
const props = withDefaults(defineProps<Props>(), {
  styleWrap: () => ({
    width: '100%',
    height: '3.44rem'
  }),
  columnKeyList: () => [
    { prop: 'index', label: '序号', width: 2, type: 'index' },
    { prop: 'typeName', label: '问题类型', width: 3 },
    { prop: 'desc', label: '相关描述', width: 5 },
    { prop: 'cnt', label: '数量（个）', width: 3 }
  ],
  data: () => []
});
const { styleWrap, columnKeyList, data } = toRefs(props);
let currentIndex = ref(0);
// let currentChange = (row) => {
//   // 这里是选中的那一行数据
// };
</script>

<style lang="less"></style>
